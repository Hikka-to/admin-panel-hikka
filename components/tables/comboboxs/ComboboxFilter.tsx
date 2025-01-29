"use client";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

import { updateSearchParams } from "@/lib/utils";
import { ComboxProps } from "@/types/combobox/ComboxProps";

const ComboboxFilter = ({ props }: { props: ComboxProps }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
        label={props.label}
        placeholder={props.placeholder}
        onSelectionChange={(item) =>
          updateSearchParams(props.label, item.toString())
        }
      >
        {props.listOfValue.map((item) => (
          <SelectItem key={item.value}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default ComboboxFilter;
