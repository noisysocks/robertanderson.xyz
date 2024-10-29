import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAdminAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return NextResponse.next();
}
