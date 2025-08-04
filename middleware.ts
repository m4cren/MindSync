import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
   const protectedRoutes = [
      "/expenses",
      "/expenses/account",
      "/expenses/income",
      "/expenses/expenses",
      "/expenses/transfer",
   ];
   const token = request.cookies.get("authToken")?.value;

   if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/expenses/security", request.url));
   } else if (token && request.nextUrl.pathname === "/expenses/security") {
      return NextResponse.redirect(new URL("/expenses", request.url));
   }

   return NextResponse.next();
}
