import "@/styles/globals.css";
import React from "react";
import { Card } from "@nextui-org/card";

export default function AuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex justify-center items-center md:p-32">
      <Card isBlurred
            className="max-w-3xl flex-1 rounded-none md:h-auto md:rounded-large bg-background/60 dark:bg-default-100/50">
        {children}
      </Card>
    </main>
  );
}
