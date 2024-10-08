import React from "react";
import { Icon } from "@iconify-icon/react";
import { PressEvent } from "@react-types/shared";
import { useTranslations } from "use-intl";

import { CollapseItems } from "@/components/sidebar/CollapseItems";
import SidebarButtonType from "@/types/sidebar/SidebarButtonType";

interface DashboardBodyProps {
  onButtonPress?: (e: PressEvent) => void;
}

export default function DashboardBody({
  onButtonPress,
}: Readonly<DashboardBodyProps>) {
  const t = useTranslations("Tables");
  const tables: SidebarButtonType[] = [
    {
      icon: <Icon className="text-2xl" icon="solar:globus-bold-duotone" />,
      text: t("Countries.Countries"),
      url: "/tables/country-table",
    },
  ];

  return (
    <CollapseItems
      icon={<Icon className="text-2xl" icon="solar:card-bold-duotone" />}
      items={tables}
      title={t("Tables")}
      onButtonPress={onButtonPress}
    />
  );
}
