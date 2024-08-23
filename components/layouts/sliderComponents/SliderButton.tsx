import SidebarButtonType from "@/types/sidebar/SidebarButtonType";
import React from "react";
import {Button, Link} from "@nextui-org/react";
import {PressEvent} from "@react-types/shared";

const SliderButton = ({content, onPress}: { content: SidebarButtonType, onPress?: (e: PressEvent) => void }) => {

    return (
        <Button
            startContent={content.icon}
            href={content.url}
            as={Link}
            onPress={onPress}
            className={
                "rounded-md " +
                "justify-start " +
                "bg-transparent " +
                "hover:bg-default-200/50 " +
                "dark:hover:bg-default-100/50 " +
                "active:bg-default-100/50 " +
                "dark:active:bg-default-200/50"}
        >
            {content.text}
        </Button>
    );
};

export default SliderButton;