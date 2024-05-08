"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import ReservationForm from "@/app/customer/ReservationForm";
import Image from "next/image";

const StudioReservationPage = ({ params }) => {
  const customer = useAppSelector((state) => state.auth.customer);
  const studios = useAppSelector((state) => state.studios);
  const studioId = params.studioId;
  const studio = studios.find((studio) => studio.id === studioId);

  if (!customer) {
    // Redirect to login page if customer is not logged in
    return (
      <div className="text-white">Please log in to make a reservation.</div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {studio?.name}
            </h2>
            <p className="text-gray-400 mb-4">{studio?.description}</p>
            {studio?.image && (
              <Image
                src={studio.image}
                alt={studio.name}
                width={800}
                height={600}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <ReservationForm customer={customer} studioId={studioId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioReservationPage;
