import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ← Change cette date pour l'ouverture du site
const OPENING_DATE = new Date("2026-08-15T00:00:00Z");

const ALWAYS_ACCESSIBLE = [
  "/coming-soon",
  "/precommande",
  "/login",
  "/register",
  "/api",
  "/dashboard",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const now = new Date();
  const siteIsOpen = now >= OPENING_DATE;

  // Si le site est ouvert
  if (siteIsOpen) {
    if (pathname.startsWith("/coming-soon")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/precommande")) {
      return NextResponse.redirect(new URL("/catalogue", request.url));
    }
    return NextResponse.next();
  }

  // Si le site est fermé
  const isAccessible = ALWAYS_ACCESSIBLE.some((path) =>
    pathname.startsWith(path)
  );

  if (!isAccessible) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico).*)"],
};