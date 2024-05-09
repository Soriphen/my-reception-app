"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { addReservation } from "@/store/features/reservations/reservationsSlice";

const ReservationForm = ({ customer, studioId }) => {
  const { register, handleSubmit, reset } = useForm();
  const searchParams = useSearchParams();
  const studioName = searchParams.get("studioName");
  const dispatch = useAppDispatch();

  const onSubmit = async (data) => {
    try {
      const reservationData = {
        ...data,
        customerId: customer.uid,
        studioId: studioId,
        studioName: studioName || "",
        status: "pending",
      };

      // Save the reservation data to Firestore
      const reservationRef = await addDoc(
        collection(db, "reservations"),
        reservationData
      );

      // Dispatch the addReservation action to update the Redux store
      dispatch(addReservation({ id: reservationRef.id, ...reservationData }));

      reset();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">Make a Reservation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2 font-bold text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block mb-2 font-bold text-white">
            Time
          </label>
          <input
            type="time"
            id="time"
            {...register("time", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
