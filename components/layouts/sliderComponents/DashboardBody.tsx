import SidebarButtonType from "@/types/sidebar/SidebarButtonType";
import { CollapseItems } from "@/components/sidebar/CollapseItems";
import React from "react";
import { Icon } from "@iconify-icon/react";
import { PressEvent } from "@react-types/shared";

interface DashboardBodyProps {
  onButtonPress?: (e: PressEvent) => void;
}

const tables: SidebarButtonType[] = [
  {
    icon: <Icon className="text-2xl" icon="solar:globus-bold-duotone" />,
    text: "Countries",
    url: "/tables/country-table"
  }
];

export default function DashboardBody({ onButtonPress }: Readonly<DashboardBodyProps>) {
  return (
    <CollapseItems
      icon={<Icon className="text-2xl" icon="solar:card-bold-duotone" />}
      title="Tables"
      items={tables}
      onButtonPress={onButtonPress}
    />
  );
}