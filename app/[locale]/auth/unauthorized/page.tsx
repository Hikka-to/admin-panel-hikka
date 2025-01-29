"use client";
import { Button } from "@heroui/react";
import { CardHeader } from "@heroui/card";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";

import { useAuth } from "@/hooks/auth";

export default function UnauthorizedPage() {
  const { status } = useAuth({ redirect: true });
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    setIsLoading(false);
  };

  useEffect(() => {
    if (status == "loading") setIsLoading(true);
    else setIsLoading(false);
  }, []);

  return (
    <CardHeader
      className="
          	flex
          	flex-wrap
          	space-y-2
          	justify-between"
    >
      <h1 className="text-2xl font-bold">{t("Unauthorized Action")}</h1>
      <Button
        className="!mt-0"
        isLoading={isLoading}
        variant="solid"
        onPress={handleLogout}
      >
        {t("Auth.Logout")}
      </Button>
    </CardHeader>
  );
}
