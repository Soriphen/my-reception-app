"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ReservationList from "./ReservationList";
import { useRouter } from "next/navigation";
import { setCustomer } from "@/store/features/auth/authSlice";

const CustomerHomePage = () => {
  const customer = useAppSelector((state) => state.auth.customer);
  const studios = useAppSelector((state) => state.studios);
  console.log(studios);
  const router = useRouter();

  if (!customer) {
    return null;
  }

  const handleBookStudioClick = () => {
    router.push("/customer/studios");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {customer.email}</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
        <ReservationList customer={customer} />
      </div>
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBookStudioClick}
        >
          Book a Studio
        </button>
      </div>
    </div>
  );
};

export default CustomerHomePage;
