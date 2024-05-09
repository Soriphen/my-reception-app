"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/store/features/auth/authSlice";
import { setStudios } from "@/store/features/studios/studiosSlice";
import {
  setReservations,
  setUpcomingReservation,
} from "@/store/features/reservations/reservationsSlice";
import { ROLE_CUSTOMER, ROLE_STAFF } from "@/constants/constants";

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userRole = useAppSelector((state) => state.auth.user.role);

  useEffect(() => {
    const checkAuth = async () => {
      if (userRole & ROLE_CUSTOMER && !pathname.startsWith("/customer")) {
        console.log("Logging out customer");
        try {
          await signOut(auth);
          dispatch(setStudios([]));
          dispatch(
            setUser({
              uid: null,
              email: null,
              role: 0,
            })
          );
          dispatch(setReservations([]));
          dispatch(setUpcomingReservation([]));
        } catch (error) {
          console.error("Error logging out customer:", error);
        }
      }

      if (userRole & ROLE_STAFF && !pathname.startsWith("/staff")) {
        console.log("Logging out staff");
        try {
          await auth.signOut();
          dispatch(
            setUser({
              uid: null,
              email: null,
              role: 0,
            })
          );
        } catch (error) {
          console.error("Error logging out staff:", error);
        }
      }
    };

    checkAuth();
  }, [pathname, dispatch, userRole]);

  return children;
};

export default AuthGuard;
