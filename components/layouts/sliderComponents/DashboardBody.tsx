import React from "react";
import { Icon } from "@iconify-icon/react";
import { PressEvent } from "@react-types/shared";

import { CollapseItems } from "@/components/sidebar/CollapseItems";
import SidebarButtonType from "@/types/sidebar/SidebarButtonType";

interface DashboardBodyProps {
  onButtonPress?: (e: PressEvent) => void;
}

export default function DashboardBody({
  onButtonPress,
}: Readonly<DashboardBodyProps>) {
  const tables: SidebarButtonType[] = [
    {
      icon: <Icon className="text-2xl" icon="solar:globus-bold-duotone" />,
      text: "Countries",
      url: "/tables/country-table",
    },
  ];

  const anime:SidebarButtonType[] = [
    {
      icon: <Icon className="text-2xl" icon="mynaui:letter-k-solid" />,
      text: "Kinds",
      url: "/tables/kind-table"
    },
    {
      icon: <Icon className="text-2xl" icon="arcticons:studio" />,
      text: "Studios",
      url: "/tables/studio-table"
    },
    {
      icon: <Icon className="text-2xl" icon="majesticons:restricted-line" />,
      text: "RestrictedRatings",
      url: "/tables/restricted-rating-table"
    },
     {
      icon: <Icon className="text-2xl" icon="fluent-mdl2:open-source" />,
      text: "Sources",
      url: "/tables/source-table"
    },
  ];

  return (
    <>
    <CollapseItems
      icon={<Icon className="text-2xl" icon="solar:card-bold-duotone" />}
      items={tables}
      title={"Tables"}
      onButtonPress={onButtonPress}
    />
    <CollapseItems
      icon={<Icon className="text-2xl" icon="arcticons:animeultima" />}
      items={anime}
      title={"Anime"}
      onButtonPress={onButtonPress}
    />
</>
  );
}
