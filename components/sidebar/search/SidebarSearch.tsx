import {Input} from "@nextui-org/input";
import React from "react";
import SearchKbd from "@/components/sidebar/search/SearchKbd";
import {SearchIcon} from "@nextui-org/shared-icons";

interface SidebarSearchProps {
    showKbd?: boolean;
}

const SidebarSearch = ({showKbd = true}) => {
    return (
        <Input
            variant="bordered"
            placeholder={"Quick Search"}
            startContent={<SearchIcon/>}
            endContent={showKbd && <SearchKbd/>}
            classNames={{
                inputWrapper: [
                    "!transition-all",
                    "bg-default-300/35",
                    "dark:bg-default-100/35",
                    "hover:bg-default-300/50",
                    "dark:hover:bg-default-100/50",
                    "group-data-[focus=true]:bg-default-300/65",
                    "dark:group-data-[focus=true]:bg-default-100/65"
                ]
            }}/>
    );
};

export default SidebarSearch;