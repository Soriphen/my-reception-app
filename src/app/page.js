"use client";
import Link from "next/link";

export default function Frontpage() {
  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gray-900 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Welcome
          </h1>
          <p className="text-xl text-gray-300 mb-6 text-center">
            Please select the login type that you want to use.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/customer-login"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Customer Login
            </Link>
            <Link
              href="/staff-login"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-md shadow-md hover:from-green-700 hover:to-teal-700 transition-all duration-300"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
