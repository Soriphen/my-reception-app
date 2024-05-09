"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import DataTable from "@/components/ui/data-table";
import AuthGuard from "@/utils/AuthGuard";
import CustomerLogin from "../CustomerLogin";
import { ROLE_CUSTOMER } from "@/constants/constants";

const ReservationsLoggedIn = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );

  const columns = [
    {
      id: "studioName",
      header: "Studio",
      accessorKey: "studioName",
      cell: (info) => info.getValue(),
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      enableSorting: true,
    },
    {
      id: "time",
      header: "Time",
      accessorKey: "time",
      enableSorting: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
    },
  ];

  const initialSort = [
    { id: "date", desc: false },
    { id: "time", desc: false },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">All Reservations</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by studio name"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded"
          />
        </div>
        <DataTable
          data={reservations}
          columns={columns}
          filter={globalFilter}
          initialSort={initialSort}
        />
      </div>
    </div>
  );
};

const ReservationsPage = () => {
  const userRole = useAppSelector((state) => state.auth.user.role);

  return userRole & ROLE_CUSTOMER ? (
    <AuthGuard>
      <ReservationsLoggedIn />
    </AuthGuard>
  ) : (
    <CustomerLogin />
  );
};

export default ReservationsPage;
