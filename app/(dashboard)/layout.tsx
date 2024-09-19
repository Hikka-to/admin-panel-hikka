"use client";
import "@/styles/globals.css";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import { useAuth } from "@/hooks/auth";
import DashboardSkeleton from "@/components/shared/skeletons/dashboard/DashboardSkeleton";

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useAuth({
    requiredRoles: ["admin"],
    redirect: true
  });

  return (
    <>
      {status === "authorized" ? (
        <DashboardLayout>
          {children}
        </DashboardLayout>
      ) : (
        <DashboardSkeleton />
      )}
    </>
  );
}