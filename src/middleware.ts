import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // If authenticated and trying to access auth pages, redirect to dashboard
    if (token && (
        url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify") ||
        url.pathname === "/"
    )) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If unauthenticated and trying to access dashboard, redirect to home
    if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Otherwise, allow the request
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
