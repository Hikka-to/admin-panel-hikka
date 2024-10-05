import React from "react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { isDesktop } from "react-device-detect";
import { useTranslations } from "use-intl";

import SearchKbd from "@/components/sidebar/search/SearchKbd";
import TransparentInput from "@/components/inputs/TransparentInput";

const SidebarSearch = () => {
  const t = useTranslations("Search");

  return (
    <TransparentInput
      endContent={isDesktop && <SearchKbd />}
      placeholder={t("Quick Search")}
      startContent={<SearchIcon />}
    />
  );
};

export default SidebarSearch;
