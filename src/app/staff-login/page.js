"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStaff } from "@/store/features/auth/authSlice";

const StaffLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const staff = useAppSelector((state) => state.auth.staff);
  const dispatch = useAppDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const staffUser = userCredential.user;
      // Staff successfully logged in, update state
      dispatch(
        setStaff({
          uid: staffUser.uid,
          email: staffUser.email,
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Staff successfully logged out, update state
      dispatch(setStaff(null));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center break-words">
          {staff ? `Welcome ${staff.email}` : "Staff Login"}
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {staff ? (
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-white font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StaffLoginPage;
