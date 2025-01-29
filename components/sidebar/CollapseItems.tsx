"use client";
import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { PressEvent } from "@react-types/shared";

import SidebarButtonType from "@/types/sidebar/SidebarButtonType";

import { ChevronDownIcon } from "../icons/sidebar/ChevronDownIcon";
import SliderButton from "../layouts/sliderComponents/SliderButton";

interface Props {
  title: string;
  items: SidebarButtonType[];
  icon?: React.ReactNode;
  onButtonPress?: (e: PressEvent) => void;
}

export const CollapseItems = ({ items, title, icon, onButtonPress }: Props) => {
  return (
    <div className="flex gap-4  items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          aria-label="Accordion 1"
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger: [
              "py-0",
              "min-h-[44px]",
              "rounded-xl",
              "active:scale-[0.98]",
              "transition-transform px-3.5",
              "hover:bg-default-200/50 " +
                "dark:hover:bg-default-100/50 " +
                "active:bg-default-100/50 " +
                "dark:active:bg-default-200/50",
            ],

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer text-white",
          }}
          indicator={<ChevronDownIcon />}
          title={
            <div className="flex flex-row gap-2">
              {icon}
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12 flex flex-col gap-3">
            {items.map((item) => (
              <SliderButton
                key={item.url}
                content={item}
                onPress={onButtonPress}
              />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
