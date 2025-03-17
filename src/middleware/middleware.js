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

// Chỉ bảo vệ các route cần xác thực
export const config = {
  matcher: [
    // Các route cần xác thực
    // "/api/comics/favorite/:path*", // API yêu thích truyện
    // "/api/comics/read-history/:path*", // API lịch sử đọc
    // "/api/comics/comment/:path*", // API bình luận
    // "/api/user/profile/:path*", // API thông tin người dùng
    // "/api/user/settings/:path*", // API cài đặt người dùng
    
    // Các trang cần xác thực
    // "/favorite", // Trang yêu thích
    // "/read-history", // Trang lịch sử đọc
    // "/profile", // Trang thông tin cá nhân
    // "/settings", // Trang cài đặt
  ],
};