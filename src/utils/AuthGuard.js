"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCustomer, setStaff } from "@/store/features/auth/authSlice";
import { setStudios } from "@/store/features/studios/studiosSlice";
import {
  setReservations,
  setUpcomingReservation,
} from "@/store/features/reservations/reservationsSlice";

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const customer = useAppSelector((state) => state.auth.customer);
  const staff = useAppSelector((state) => state.auth.staff);

  useEffect(() => {
    const checkAuth = async () => {
      if (customer && !pathname.startsWith("/customer")) {
        console.log("logging out customer");
        try {
          await signOut(auth);
          dispatch(setStudios([]));
          dispatch(setCustomer(null));
          dispatch(setReservations([]));
          dispatch(setUpcomingReservation([]));
        } catch (error) {
          console.error("Error logging out customer:", error);
        }
      }

      if (staff && !pathname.startsWith("/staff")) {
        console.log("logging out staff");
        try {
          await auth.signOut();
          dispatch(setStaff(null));
        } catch (error) {
          console.error("Error logging out staff:", error);
        }
      }
    };

    checkAuth();
  }, [pathname, dispatch, customer, staff]);

  return children;
};

export default AuthGuard;
