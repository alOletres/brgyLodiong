import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL(req.url));
}
