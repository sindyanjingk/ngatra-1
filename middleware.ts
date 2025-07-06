import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/((?!api/|_next/|_vercel|_static|favicon.ico|.*\\..*).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const path = url.pathname + url.search;
  let hostname = host.split(":")[0];

  const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

  if (hostname.includes(".localhost")) {
    hostname = hostname.replace(".localhost", `.${ROOT_DOMAIN}`);
  }

  const ROOT_DOMAINS = [ROOT_DOMAIN, `www.${ROOT_DOMAIN}`, "localhost"];
  const isRootDomain = ROOT_DOMAINS.includes(hostname);

  const token = await getToken({ req });

  const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password"];

  // ⛔ Public path, biarkan lewat
  if (isRootDomain && PUBLIC_PATHS.includes(url.pathname)) {
    // Tapi kalau user login dan mengakses '/', arahkan ke /app
    if (url.pathname === "/" && token) {
      return NextResponse.rewrite(new URL("/app", req.url));
    }
    return NextResponse.next();
  }

  // ✅ Kalau root domain dan bukan path publik, rewrite ke /app/...
  if (isRootDomain) {
    return NextResponse.rewrite(new URL(`/app${path}`, req.url));
  }

  // ✅ Tenant domain rewrite ke /[tenant]/...
  const newPath = `/${hostname}${url.pathname}${url.search}`;
  return NextResponse.rewrite(new URL(newPath, req.url));
}
