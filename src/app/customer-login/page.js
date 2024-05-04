"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCustomer } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";

const CustomerLoginPage = () => {
  const [error, setError] = useState(null);
  const customer = useAppSelector((state) => state.auth.customer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(setCustomer({ uid: user.uid, email: user.email }));
      router.push("/customer");
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(customer);

  // REMEMBER TO HANDLE THE LOGOUT SO THAT LOCAL STORAGE DATA WON'T PERSIST

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setCustomer(null));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center break-words">
          Customer Login
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Login with Google
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
