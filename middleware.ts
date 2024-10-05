import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import localeCodes from "locale-codes";

import { routing } from "@/i18n/routing";

export default function (req: NextRequest) {
  const locale = req.nextUrl.pathname.split("/")[1];
  const path = req.nextUrl.pathname.substring(locale.length + 1);
  const url = req.nextUrl.clone();

  if (!routing.locales.includes(locale as any)) {
    if (locale?.split("-")[0].match(`(${routing.locales.join("|")})`)) {
      url.pathname = `/${locale.split("-")[0]}${path}`;

      return NextResponse.redirect(url);
    }
    if (localeCodes.getByTag(locale)) {
      url.pathname = path;

      return NextResponse.redirect(url);
    }
  }

  return createMiddleware(routing, { localeDetection: true })(req);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/((?!_next|_vercel|api|.*\\..*).*)"],
};
