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