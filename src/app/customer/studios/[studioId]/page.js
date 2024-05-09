"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import ReservationForm from "@/app/customer/ReservationForm";
import Image from "next/image";
import AuthGuard from "@/utils/AuthGuard";
import CustomerLogin from "../../CustomerLogin";
import { ROLE_CUSTOMER } from "@/constants/constants";

const StudioReservationLoggedIn = ({ studioId }) => {
  const user = useAppSelector((state) => state.auth.user);
  const studios = useAppSelector((state) => state.studios);
  const studio = studios.find((studio) => studio.id === studioId);

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
            <ReservationForm customer={user} studioId={studioId} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StudioReservationPage = ({ params }) => {
  const userRole = useAppSelector((state) => state.auth.user.role);
  const studioId = params.studioId;

  return userRole & ROLE_CUSTOMER ? (
    <AuthGuard>
      <StudioReservationLoggedIn studioId={studioId} />
    </AuthGuard>
  ) : (
    <CustomerLogin />
  );
};

export default StudioReservationPage;
