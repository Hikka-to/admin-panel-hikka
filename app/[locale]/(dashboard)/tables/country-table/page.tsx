"use client";
import React from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslations } from "use-intl";

import { CountryService } from "@/service/crudServices/CountryService";
import ModelLayout from "@/components/layouts/ModelLayout";

const CountryTablePage = () => {
  const t = useTranslations("Tables.Countries");

  return (
    <ModelLayout
      icon={<Icon icon="solar:globus-bold-duotone" />}
      service={new CountryService()}
      title={t("Countries")}
    />
  );
};

export default CountryTablePage;
