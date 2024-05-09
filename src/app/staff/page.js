"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import StaffLogin from "./StaffLogin";
import AuthGuard from "@/utils/AuthGuard";
import { ROLE_STAFF } from "@/constants/constants";
// import StaffReservationList from "./StaffReservationList";

const StaffLoggedIn = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 break-words">
          Welcome, {user.email}
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Reservation List
          </h2>
          {/* <StaffReservationList /> */}
        </div>
      </div>
    </div>
  );
};

const StaffPage = () => {
  const userRole = useAppSelector((state) => state.auth.user.role);

  return userRole & ROLE_STAFF ? (
    <AuthGuard>
      <StaffLoggedIn />
    </AuthGuard>
  ) : (
    <StaffLogin />
  );
};

export default StaffPage;
