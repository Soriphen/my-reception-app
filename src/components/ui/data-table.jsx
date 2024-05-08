"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const DataTable = ({ data, columns, filter, initialSort }) => {
  const [pagination, setPagination] = useState({ pageSize: 10, pageIndex: 0 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filter,
      pagination: pagination,
    },
    globalFilterFn: (row, columnId, value) => {
      const rowValue = row.original[columnId].toLowerCase();
      const searchTerm = value.toLowerCase();
      return rowValue.includes(searchTerm);
    },
    initialState: {
      sorting: initialSort,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="bg-gray-800 text-white"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.isSorted ? (
                    header.column.isSortedDesc ? (
                      <span className="ml-2">🔽</span>
                    ) : (
                      <span className="ml-2">🔼</span>
                    )
                  ) : null}
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
              className="bg-gray-700 text-white"
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
      <div className="flex items-center justify-between py-4 bg-gray-800 text-white px-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page:</p>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prevState) => ({
                ...prevState,
                pageSize: Number(e.target.value),
                pageIndex: 0, // Reset pageIndex when changing pageSize
              }))
            }
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="bg-gray-800 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-gray-800 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            <FaAngleLeft />
          </button>
          <span className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-gray-800 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            <FaAngleRight />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="bg-gray-800 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
