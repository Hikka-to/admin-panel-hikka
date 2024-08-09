"use client";
import { signOut } from "next-auth/react";
import { Input } from "@nextui-org/input";
import React, { useEffect } from "react";
import { CollapseItems } from "@/components/sidebar/CollapseItems";
import SidebarButtonType from "@/types/sidebar/SidebarButtonType";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { createIcons } from "@/utils/duoIcons";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface DashboardClientProps {
	children: React.ReactNode;
}

const listOfUrls: SidebarButtonType[] = [
	{
		text: "Categories",
		url: "/tables/CategoryTable"
	},
	{
		text: "Dishes",
		url: "/tables/DishTable"
	},
	{
		text: "Users",
		url: "/tables/UserTable"
	},
	{
		text: "Orders",
		url: "/tables/OrderTable"
	}
];

const DashboardClient: React.FC<DashboardClientProps> = ({ children }) => {
	const [isOpened, setIsOpened] = React.useState(true);
	const [isMobileOpened, setIsMobileOpened] = React.useState(false);
	const sidebarRef = React.useRef<HTMLDivElement>(null);
	const { width } = useWindowDimensions();
	const buttonRef = React.useRef<HTMLButtonElement>(null);

	const signOutHandler = async () => {
		await signOut({
			redirect: true,
			callbackUrl: "/auth/login"
		});
	};

	const toggleSidebar = () => {
		if (window.innerWidth < 768) {
			setIsMobileOpened(!isMobileOpened);
		} else {
			setIsOpened(!isOpened);
		}
		const sidebarBody = sidebarRef.current!.children[1] as HTMLDivElement;
		sidebarBody.style.overflow = "hidden";
	};

	const transitionEndHandler = () => {
		const sidebarBody = sidebarRef.current!.children[1] as HTMLDivElement;
		sidebarBody.style.overflow = "";
	};

	useEffect(() => {
		buttonRef.current!.innerHTML = (isMobileOpened && width < 768) || (isOpened && width >= 768)
			? "<i data-duoicon=\"app\" " +
			"class=\"duoicon-primary:text-transparent " +
			"duoicon-primary:stroke-white/80 " +
			"duoicon-primary:stroke-2 " +
			"duoicon-secondary:text-transparent " +
			"duoicon-secondary:stroke-white/80 " +
			"duoicon-secondary:stroke-2\"></i>"
			: "<i data-duoicon=\"app\" class=\"duoicon-primary:text-white/80 duoicon-secondary:text-white/80\"></i>";
		createIcons();
	}, [isMobileOpened, isOpened, width]);

	return (
		<div className="flex flex-col h-screen bg-background overflow-hidden">
			<Card isBlurred
						ref={sidebarRef}
						onTransitionEnd={transitionEndHandler}
						className={
							(!isMobileOpened ? "h-[72px] " : "h-[calc(100%-40px)] ") +
							(!isOpened ? "md:h-[72px] " : "md:h-[calc(100%-40px)] ") +
							"!transition-all !duration-500 " +
							"fixed " +
							"text-white " +
							"m-5 " +
							"bg-background/60 " +
							"dark:bg-default-100/50 " +
							"w-[calc(100%-40px)] " +
							"md:w-64"}>
				<CardHeader className="flex gap-3 justify-center">
					<Button
						href="/"
						as={Link}
						className={
							"min-w-0 " +
							"w-12 " +
							"h-12 " +
							"bg-background/70 " +
							"dark:bg-default-100/35 " +
							"hover:bg-background/55 " +
							"dark:hover:bg-default-100/50 " +
							"active:bg-background/40 " +
							"dark:active:bg-default-100/65"}
					>
						{<FontAwesomeIcon icon={faHome} />}
					</Button>
					<Dropdown>
						<DropdownTrigger>
							<Button
								href="/"
								className={
									"min-w-0 " +
									"w-12 " +
									"h-12 " +
									"bg-background/70 " +
									"dark:bg-default-100/35 " +
									"hover:bg-background/55 " +
									"dark:hover:bg-default-100/50 " +
									"active:bg-background/40 " +
									"dark:active:bg-default-100/65"}
							>
								{<FontAwesomeIcon icon={faUser} />}
							</Button>
						</DropdownTrigger>
						<DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
							<DropdownItem
								key="delete"
								className="text-danger"
								color="danger"
								startContent={<FontAwesomeIcon icon={faRightToBracket} />}
								onPress={signOutHandler}
							>
								Logout
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Tooltip
						content={(isMobileOpened && width < 768) || (isOpened && width >= 768)
							? "Close sidebar"
							: "Open sidebar"
						}
					>
						<Button
							onPress={toggleSidebar}
							ref={buttonRef}
							className={
								"min-w-0 " +
								"w-12 " +
								"h-12 " +
								"bg-background/70 " +
								"dark:bg-default-100/35 " +
								"hover:bg-background/55 " +
								"dark:hover:bg-default-100/50 " +
								"active:bg-background/40 " +
								"dark:active:bg-default-100/65"}
						></Button>
					</Tooltip>
				</CardHeader>
				<CardBody
					className={"flex flex-col gap-3"
						+ (!isMobileOpened ? " overflow-hidden" : " overflow-auto")
						+ (!isOpened ? " md:overflow-hidden" : " md:overflow-auto")
					}>
					<Input
						variant="bordered"
						classNames={{
							inputWrapper: [
								"!transition-all",
								"bg-background/70",
								"dark:bg-default-100/35",
								"hover:bg-background/55",
								"dark:hover:bg-default-100/50",
								"group-data-[focus=true]:bg-background/40",
								"dark:group-data-[focus=true]:bg-default-100/65"
							]
						}} />
					<CollapseItems
						title="test"
						items={listOfUrls}
					/>
				</CardBody>
			</Card>
			<main className={"w-full mt-[72px] md:mt-0 md:ml-[296px]"}>
				{children}
			</main>
		</div>
	);
};

export default DashboardClient;