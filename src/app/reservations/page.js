"use client";
import React from "react";
import ReservationForm from "./ReservationForm";

const ReservationPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Reservation Page</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservationPage;
