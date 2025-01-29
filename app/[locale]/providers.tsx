"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

import ProtectedLayout from "@/components/layouts/ProtectedLayout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: Readonly<ProvidersProps>) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
          <ProtectedLayout>{children}</ProtectedLayout>
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
