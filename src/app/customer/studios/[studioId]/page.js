"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import ReservationForm from "@/app/customer/ReservationForm";

const StudioReservationPage = ({ params }) => {
  const customer = useAppSelector((state) => state.auth.customer);
  const studioId = params.studioId;

  if (!customer) {
    // Redirect to login page if customer is not logged in
    return <div>Please log in to make a reservation.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ReservationForm customer={customer} studioId={studioId} />
    </div>
  );
};

export default StudioReservationPage;
