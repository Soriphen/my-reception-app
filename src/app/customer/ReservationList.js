"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ReservationList = ({ customer }) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const q = query(
      collection(db, "reservations"),
      where("customerId", "==", customer.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(data);
      setIsLoading(false);
      console.log("Fetched reservations:", data);
    });
    return () => unsubscribe();
  }, [customer.uid]);

  const handleEntryExit = async (reservationId, status) => {
    try {
      await updateDoc(doc(db, "reservations", reservationId), { status });
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  const columns = [
    { id: "studioName", header: "Studio", accessorKey: "studioName" },
    { id: "date", header: "Date", accessorKey: "date" },
    { id: "time", header: "Time", accessorKey: "time" },
    { id: "status", header: "Status", accessorKey: "status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <button onClick={() => handleEntryExit(row.original.id, "entered")}>
            Entry
          </button>
          <button onClick={() => handleEntryExit(row.original.id, "exited")}>
            Exit
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationList;
