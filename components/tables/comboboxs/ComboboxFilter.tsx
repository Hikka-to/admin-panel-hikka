"use client";
import { updateSearchParams } from "@/lib/utils";
import { ComboxProps } from "@/types/combobox/ComboxProps";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";

const ComboboxFilter = ({ props }: { props: ComboxProps }) => {
	return (
		<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
			<Select
				label={props.label}
				placeholder={props.placeholder}
				className="max-w-xs"

				onSelectionChange={
					(item) => updateSearchParams(props.label, item.toString())
				}
			>
				{props.listOfValue.map((item) => (
					<SelectItem key={item.value}>
						{item.label}
					</SelectItem>
				))}
			</Select>
		</div>
	);
};

export default ComboboxFilter;