import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCustomer } from "@/store/features/auth/authSlice";
import { store } from "@/store";

export async function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (authToken) {
    try {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      store.dispatch(setCustomer(decodedToken));
      request.user = decodedToken;
    } catch (error) {
      // Invalid token, redirect to login page
      return NextResponse.redirect(new URL("/customer-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*"],
};
