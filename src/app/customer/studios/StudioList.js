"use client";
import React from "react";
import StudioCard from "./StudioCard";

const StudioList = ({ studios }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-white">Music Studios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
      </div>
    </div>
  );
};

export default StudioList;
