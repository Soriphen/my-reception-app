"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Scheduler, SchedulerHelpers } from "@aldabil/react-scheduler";
import { setSelectedSlot } from "@/store/features/reservation/reservationSlice";

const ReservationPage = () => {
  const dispatch = useAppDispatch();
  const selectedSlot = useAppSelector(
    (state) => state.reservation.selectedSlot
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Make a Reservation</h1>
      <Scheduler
        view="week"
        events={[]}
        selectedDate={new Date()}
        day={{
          startHour: 9,
          endHour: 17,
          step: 60,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 9,
          endHour: 17,
          step: 60,
        }}
      />
    </div>
  );
};

export default ReservationPage;
