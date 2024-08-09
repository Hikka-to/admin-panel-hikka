import SidebarButtonType from "@/types/sidebar/SidebarButtonType";
import React from "react";
import { Button, Link } from "@nextui-org/react";

const SliderButton = ({ content }: { content: SidebarButtonType }) => {

	return (
		<Button
			href={content.url}
			as={Link}
			className={
				"rounded-md " +
				"justify-start " +
				"bg-transparent " +
				"dark:bg-transparent " +
				"hover:bg-background/55 " +
				"dark:hover:bg-default-100/50 " +
				"active:bg-background/40 " +
				"dark:active:bg-default-100/65"}
		>
			{content.text}
		</Button>
	);
};

export default SliderButton;