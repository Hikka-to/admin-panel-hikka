import { Button, Tooltip } from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import React, { useEffect } from "react";
import { isMacOs } from "react-device-detect";

const SearchKbd = () => {
  const kbdRef = React.useRef<HTMLButtonElement>(null);

  const showAdvancedSearchHandler = () => {
    console.log("Advanced Search");
  };

  useEffect(() => {
    const shortcutHandler = (e: KeyboardEvent) => {
      if (e.key === "\v") {
        e.preventDefault();
        showAdvancedSearchHandler();
      }
    };
    document.addEventListener("keypress", shortcutHandler);
    return () => document.removeEventListener("keypress", shortcutHandler);
  }, []);

  return (
    <Tooltip content={`Advanced Search (${isMacOs ? "Command" : "Ctrl"} + K)`}>
      <Button keys={[isMacOs ? "command" : "ctrl"]}
              as={Kbd}
              ref={kbdRef}
              onPress={showAdvancedSearchHandler}
              className={
                "rounded-small " +
                "px-1.5 " +
                "py-0.5 " +
                "gap-0 " +
                "w-fit " +
                "h-fit " +
                "min-h-0 " +
                "min-w-0 " +
                "bg-default-300/35 " +
                "dark:bg-default-100/35 " +
                "dark:hover:bg-default-200/50 " +
                "active:bg-default-100/65 " +
                "dark:active:bg-default-300/65"}>
        K
      </Button>
    </Tooltip>
  );
};

export default SearchKbd;