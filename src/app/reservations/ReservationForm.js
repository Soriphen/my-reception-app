"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReservation } from "@/store/features/reservation/reservationSlice";

const ReservationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();
  const reservation = useAppSelector((state) => state.reservation);

  const onSubmit = (data) => {
    dispatch(addReservation(data));
    reset();
  };

  console.log(reservation);

  return (
    <div className="container mx-auto py-8 bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Make a Reservation
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-bold text-gray-800 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-bold text-gray-800 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block mb-2 font-bold text-gray-800 dark:text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block mb-2 font-bold text-gray-800 dark:text-white"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            {...register("time", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Make a Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
