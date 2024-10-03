"use client";

import Error from "next/error";
import { useTranslations } from "use-intl";

export default function NotFound() {
  const t = useTranslations("Errors");

  return <Error statusCode={404} title={t("Page not found")} />;
}
