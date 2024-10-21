import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAdminAuth } from "./lib/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!checkAdminAuth()) {
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
