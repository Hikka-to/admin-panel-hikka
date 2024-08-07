"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import { ChevronDownIcon } from "../icons/sidebar/ChevronDownIcon";
import SidebarButtonType from "@/types/sidebar/SidebarButtonType";
import SliderButton from "../layouts/sliderComponents/SliderButton";

interface Props {
  title: string;
  items: SidebarButtonType[];
}

export const CollapseItems = ({ items, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4  items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-secondary-500 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer text-white",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item, index) => (
             <SliderButton
             content={item}
             />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};