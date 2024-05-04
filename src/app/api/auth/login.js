import { NextResponse } from "next/server";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import jwt from "jsonwebtoken";
import { setCustomer } from "@/store/features/auth/authSlice";
import { store } from "@/store";

export async function POST(request) {
  try {
    const { provider } = await request.json();

    if (provider === "google") {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Generate a JWT token
      const token = jwt.sign(
        { uid: user.uid, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Set the JWT token as a secure HTTP-only cookie
      const response = NextResponse.json({
        user: { uid: user.uid, email: user.email },
      });
      response.cookies.set({
        name: "authToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      });

      // Dispatch the setCustomer action
      store.dispatch(setCustomer({ uid: user.uid, email: user.email }));

      return response;
    }

    return NextResponse.json({ success: false, error: "Invalid provider" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
