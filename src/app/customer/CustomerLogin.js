"use client";
import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { setCustomer } from "@/store/features/auth/authSlice";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "customers", user.uid), {
        email: user.email,
      });
      dispatch(setCustomer({ uid: user.uid, email: user.email }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(setCustomer({ uid: user.uid, email: user.email }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "customers", user.uid), {
        email: user.email,
      });
      dispatch(setCustomer({ uid: user.uid, email: user.email }));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>
        {!isSignUp && (
          <>
            <p className="text-gray-400 mb-8 text-center">
              Choose your preferred sign-in method
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={handleGoogleLogin}
                className="bg-white text-black px-6 py-3 rounded-md flex items-center space-x-2 hover:bg-gray-200 transition-all duration-300"
              >
                <FaGoogle />
                <span>Google</span>
              </button>
              <button
                onClick={() => {}}
                className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300"
              >
                <FaFacebook />
                <span>Facebook</span>
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex-grow bg-gray-400 h-px"></div>
              <span className="text-gray-400 uppercase text-sm">
                or continue with
              </span>
              <div className="flex-grow bg-gray-400 h-px"></div>
            </div>
          </>
        )}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-400 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline ml-1"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
