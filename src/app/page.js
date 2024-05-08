"use client";
import AuthGuard from "@/utils/AuthGuard";
import Link from "next/link";

export default function Frontpage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Welcome
          </h1>
          <p className="text-gray-400 mb-8 text-center">
            Please select the login type that you want to use.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              href="/customer"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Customer Login
            </Link>
            <Link
              href="/staff"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-md text-center hover:from-green-700 hover:to-teal-700 transition-all duration-300"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
