"use client";
import { CountryService } from "@/service/crudServices/CountryService";
import React from "react";
import ModelLayout from "@/components/layouts/ModelLayout";
import { Icon } from "@iconify-icon/react";

const page = () => {
  return <ModelLayout icon={<Icon icon="solar:globus-bold-duotone" />} title="Countries"
                      service={new CountryService()} />;
};

export default page;