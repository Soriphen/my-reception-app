import React from "react";
import Link from "next/link";

const StudioCard = ({ studio }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <img
        src={studio.image}
        alt={studio.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {studio.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {studio.description}
        </p>
        <Link
          href={{
            pathname: `/customer/studios/${studio.id}`,
            query: { studioName: studio.name },
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default StudioCard;
