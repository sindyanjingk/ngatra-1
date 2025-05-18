import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/((?!api/|_next/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host");
  if (!host) return NextResponse.error();

  let hostname = host

  // Handle localhost development
  if (hostname.includes(".localhost")) {
    hostname = hostname.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  }

  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  console.log("📌 Full Request URL:", req.url);
  console.log("🌍 Raw Hostname:", host);
  console.log("🔍 Parsed Hostname:", hostname);
  console.log("📄 Final Path:", path);

  const isRootDomain =
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    hostname === `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    host === "localhost:3000";

  if (isRootDomain) {
    const session = await getToken({ req });

    const redirectToRegister = url.searchParams.get("redirect") === "register";
    const redirectToForgotPassword = url.searchParams.get("redirect") === "forgot-password";
    const publicPaths = ["/login", "/register", "/forgot-password"];

    if (!session) {
      if (redirectToRegister) {
        return NextResponse.redirect(new URL("/register", req.url));
      }
      if (redirectToForgotPassword) {
        return NextResponse.redirect(new URL("/forgot-password", req.url));
      }
      if (!publicPaths.includes(url.pathname) && url.pathname !== "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (session && url.pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
  }

  console.log("REWRITE TO:", `/${hostname}${path === "/" ? "" : path}`)

  // Kalau bukan root domain (subdomain atau custom domain lain)
  return NextResponse.rewrite(new URL(`/${hostname}${path === "/" ? "" : path}`, req.url));
}
