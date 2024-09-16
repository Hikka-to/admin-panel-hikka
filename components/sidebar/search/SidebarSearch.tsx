import React from "react";
import SearchKbd from "@/components/sidebar/search/SearchKbd";
import { SearchIcon } from "@nextui-org/shared-icons";
import TransparentInput from "@/components/inputs/TransparentInput";
import { isDesktop } from "react-device-detect";

const SidebarSearch = () => {
  return (
    <TransparentInput
      placeholder={"Quick Search"}
      startContent={<SearchIcon />}
      endContent={isDesktop && <SearchKbd />} />
  );
};

export default SidebarSearch;