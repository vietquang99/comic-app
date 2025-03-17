import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // You can add additional logic here, for example:
    // - Custom role-based access control
    // - Redirects based on user properties
    // - API route protection
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Specify which routes should be protected by this middleware
export const config = {
  // Protect dashboard and profile routes
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/my-comics/:path*",
  ],
};