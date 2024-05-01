"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCustomer } from "@/store/features/auth/authSlice";

const CustomerLoginPage = () => {
  const [error, setError] = useState(null);
  const customer = useAppSelector((state) => state.auth.customer);
  const dispatch = useAppDispatch();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // User successfully logged in with Google, redirect or update state
      dispatch(
        setCustomer({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(customer);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User successfully logged out, update state or redirect
      dispatch(setCustomer(null)); // Clear user from Redux store
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center break-words">
          {customer ? `Welcome ${customer.email}` : "Customer Login"}
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {customer ? (
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLoginPage;
