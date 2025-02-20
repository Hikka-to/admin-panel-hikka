﻿import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function LocaleLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  

  const {
    children
  } = props;


  return (
    <html suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-[url('https://raw.githubusercontent.com/tailwindlabs/tailwindcss.com/master/src/img/beams/hero-dark.png')] bg-cover bg-center",
          fontSans.variable,
        )}
      >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            {children}
          </Providers>
      </body>
    </html>
  );
}
