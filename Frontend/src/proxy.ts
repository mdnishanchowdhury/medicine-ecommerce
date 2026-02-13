import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const { data } = await userService.getSession();
  const isAuthenticated = !!data;
  const role = data?.user?.role;

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathName);
    return NextResponse.redirect(loginUrl);
  }

  if (pathName === "/dashboard") {
    if (role === Roles.admin) return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    if (role === Roles.seller) return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (pathName.startsWith("/admin-dashboard") && role !== Roles.admin) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (pathName.startsWith("/seller-dashboard") && role !== Roles.seller) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/customer-dashboard/:path*",
    // "/medicine/:path*",
  ],
};