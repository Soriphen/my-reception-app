import React from "react";
import Link from "next/link";
import Image from "next/image";

const StudioCard = ({ studio }) => {
  return (
    <Link
      href={{
        pathname: `/customer/studios/${studio.id}`,
        query: { studioName: studio.name },
      }}
      className="block bg-gray-900 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
    >
      <div className="p-4">
        <Image
          src={studio.image}
          alt={studio.name}
          width={800}
          height={600}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold mb-2 text-white">{studio.name}</h3>
        <p className="text-gray-400">{studio.description}</p>
      </div>
    </Link>
  );
};

export default StudioCard;
