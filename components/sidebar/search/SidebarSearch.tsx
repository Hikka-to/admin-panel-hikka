import React from "react";
import { SearchIcon } from "@heroui/shared-icons";
import { isDesktop } from "react-device-detect";

import SearchKbd from "@/components/sidebar/search/SearchKbd";
import TransparentInput from "@/components/inputs/TransparentInput";

const SidebarSearch = () => {

  return (
    <TransparentInput
      endContent={isDesktop && <SearchKbd />}
      placeholder={"Quick Search"}
      startContent={<SearchIcon />}
    />
  );
};

export default SidebarSearch;
