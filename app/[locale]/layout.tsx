import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(
  {
    children,
    params
  }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
    <body
      className={clsx(
        "min-h-screen bg-[url('https://raw.githubusercontent.com/tailwindlabs/tailwindcss.com/master/src/img/beams/hero-dark.png')] bg-cover bg-center",
        fontSans.variable
      )}
    >
    <NextIntlClientProvider messages={messages}>
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        {children}
      </Providers>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
