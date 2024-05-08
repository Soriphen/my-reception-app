"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import CustomerLogin from "./CustomerLogin";
import Link from "next/link";
import AuthGuard from "@/utils/AuthGuard";
import { db } from "@/utils/firebase";
import {
  updateDoc,
  deleteDoc,
  doc,
  query,
  collection,
  where,
} from "firebase/firestore";
import {
  setReservations,
  deleteReservation,
  setUpcomingReservation,
} from "@/store/features/reservations/reservationsSlice";
import { useCollection } from "react-firebase-hooks/firestore";

const CustomerLoggedIn = () => {
  const customer = useAppSelector((state) => state.auth.customer);
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const upcomingReservation = useAppSelector(
    (state) => state.reservations.upcomingReservation
  );
  const dispatch = useAppDispatch();

  const [value, loading, error] = useCollection(
    query(
      collection(db, "reservations"),
      where("customerId", "==", customer.uid)
    )
  );

  useEffect(() => {
    if (!loading && !error && value) {
      const data = value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setReservations(data));
    }
  }, [loading, error, value, dispatch]);

  useEffect(() => {
    const currentDate = new Date();

    const latestUpcomingReservation = reservations
      .filter((reservation) => {
        const reservationDate = new Date(reservation.date);
        const [hours, minutes] = reservation.time.split(":");
        reservationDate.setHours(hours);
        reservationDate.setMinutes(minutes);

        const reservationStartTime =
          reservationDate.getTime() - 24 * 60 * 60 * 1000;
        const reservationEndTime = reservationDate.getTime() + 15 * 60 * 1000;

        return (
          currentDate.getTime() >= reservationStartTime &&
          currentDate.getTime() <= reservationEndTime
        );
      })
      .sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        } else {
          return a.date.localeCompare(b.date);
        }
      })[0];

    dispatch(setUpcomingReservation(latestUpcomingReservation));
  }, [reservations, dispatch]);

  useEffect(() => {
    // `expirationCheck`関数は予約の有効期限をチェックし、期限切れの場合に削除します。
    const expirationCheck = () => {
      // 現在の日時を取得します。
      const currentDate = new Date();

      // `reservations`配列に含まれる各予約に対して処理を行います。
      reservations.forEach(async (reservation) => {
        // 予約の日付からDateオブジェクトを作成します。
        const reservationDate = new Date(reservation.date);
        // 予約の時間を時と分に分割します。
        const [hours, minutes] = reservation.time.split(":");
        // 分割した時と分を`reservationDate`に設定します。
        reservationDate.setHours(hours);
        reservationDate.setMinutes(minutes);

        // 予約のステータスが"entered"であり、予約時間+1時間が現在時刻よりも前であれば、
        // 期限切れとみなします。
        if (
          reservation.status === "entered" &&
          reservationDate.getTime() + 60 * 60 * 1000 < currentDate.getTime()
        ) {
          try {
            // Firestoreのデータベースから予約を削除します。
            await deleteDoc(doc(db, "reservations", reservation.id));
            // `deleteReservation`アクションをディスパッチします。
            dispatch(deleteReservation(reservation.id));
          } catch (error) {
            // 削除中にエラーが発生した場合、エラーをコンソールに出力します。
            console.error("Error deleting reservation:", error);
          }
        }
      });
    };

    const interval = setInterval(expirationCheck, 60000); // Check every 1 minute

    return () => {
      clearInterval(interval);
    };
  }, [reservations, dispatch]);

  // この非同期関数 `handleEntryExit` は、予約の入場または退場に応じて予約の状態を更新します。
  // `reservationId` は予約ID、`isEntry` が入場かどうかを示すブール値です。
  // もし入場の場合 (`isEntry` が true)、予約の状態を "entered" に更新し、
  // `setUpcomingReservation` アクションをディスパッチして、今後の予約の状態を更新します。
  // 入場でない場合 (退場)、予約を削除し、予約の削除と今後の予約を null に設定するアクションをディスパッチします。
  // 処理中にエラーが発生した場合は、エラーメッセージをログに出力します。
  const handleEntryExit = async (reservationId, isEntry) => {
    try {
      if (isEntry) {
        await updateDoc(doc(db, "reservations", reservationId), {
          status: "entered",
        });
        dispatch(
          setUpcomingReservation({
            ...upcomingReservation,
            status: "entered",
          })
        );
      } else {
        await deleteDoc(doc(db, "reservations", reservationId));
        dispatch(deleteReservation(reservationId));
        dispatch(setUpcomingReservation(null));
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    console.error("Error fetching reservations:", error);
    return <div className="text-white">Error fetching reservations.</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6 break-words">
          Welcome, {customer.email}
        </h1>
        <div className="mb-8">
          {upcomingReservation ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your upcoming reservation:
              </h2>
              <p className="text-xl text-white mb-4">
                {upcomingReservation.studioName} on {upcomingReservation.date}{" "}
                at {upcomingReservation.time}
              </p>
              {upcomingReservation.status === "pending" ? (
                <button
                  onClick={() => handleEntryExit(upcomingReservation.id, true)}
                  className="bg-green-600 text-white px-8 py-4 rounded-md text-2xl"
                >
                  入場
                </button>
              ) : (
                <button
                  onClick={() => handleEntryExit(upcomingReservation.id, false)}
                  className="bg-red-600 text-white px-8 py-4 rounded-md text-2xl"
                >
                  退場
                </button>
              )}
            </>
          ) : (
            <p className="text-xl text-white mb-4">No upcoming reservations.</p>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href="/customer/studios"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Reserve a Studio
          </Link>
          <Link
            href="/customer/reservations"
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-md hover:from-green-700 hover:to-teal-700 transition-all duration-300"
          >
            View All Reservations
          </Link>
        </div>
      </div>
    </div>
  );
};

const CustomerPage = () => {
  const customer = useAppSelector((state) => state.auth.customer);

  return customer ? (
    <AuthGuard>
      <CustomerLoggedIn />
    </AuthGuard>
  ) : (
    <CustomerLogin />
  );
};

export default CustomerPage;
