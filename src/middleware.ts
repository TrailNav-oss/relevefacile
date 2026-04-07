import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|banks/|demo/|api/stripe/webhook|.*\\.(?:svg|png|jpg|jpeg|ico|css|js|pdf)$).*)",
  ],
};
