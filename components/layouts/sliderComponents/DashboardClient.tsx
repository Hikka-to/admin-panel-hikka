"use client";
import {signOut} from "next-auth/react";
import React, {useEffect} from "react";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Tooltip} from "@nextui-org/react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {Icon} from "@iconify-icon/react";
import SidebarSearch from "@/components/sidebar/search/SidebarSearch";
import DashboardBody from "@/components/layouts/sliderComponents/DashboardBody";
import {usePathname} from "next/navigation";

interface DashboardClientProps {
    children: React.ReactNode;
}


const DashboardClient: React.FC<DashboardClientProps> = ({children}) => {
    const [isOpened, setIsOpened] = React.useState(true);
    const [isMobileOpened, setIsMobileOpened] = React.useState(false);
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const {width} = useWindowDimensions();
    const path = usePathname();

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

    const buttonPressHandler = () => {
        setIsMobileOpened(false);
    };

    useEffect(() => {
        function changeKeyboardNavigation(elm: HTMLElement, disable: boolean) {
            elm.querySelectorAll('a').forEach((el) => {
                if (disable) {
                    el.setAttribute('tabindex', '-1');
                } else {
                    el.removeAttribute('tabindex');
                }
            });

            elm.querySelectorAll('button').forEach((el) => {
                if (disable) {
                    el.setAttribute('tabindex', '-1');
                } else {
                    el.removeAttribute('tabindex');
                }
            });

            elm.querySelectorAll('input').forEach((el) => {
                if (disable) {
                    el.setAttribute('tabindex', '-1');
                } else {
                    el.removeAttribute('tabindex');
                }
            });

            elm.querySelectorAll('textarea').forEach((el) => {
                if (disable) {
                    el.setAttribute('tabindex', '-1');
                } else {
                    el.removeAttribute('tabindex');
                }
            });
        }

        const body = sidebarRef.current!.children[1] as HTMLDivElement;
        if ((!isMobileOpened && width < 768) || (!isOpened && width >= 768)) {
            changeKeyboardNavigation(body, true);
        } else {
            changeKeyboardNavigation(body, false);
        }
    }, [width, isOpened, isMobileOpened]);

    return (
        <div className="flex flex-col h-screen overflow-hidden box-border">
            <main className={
                "w-screen h-screen pt-[112px] overflow-y-scroll box-border transition-all duration-500 md:pt-0" +
                (!isOpened ? " md:pt-[112px]" : " md:pl-[296px]")
            }>
                <div className={
                    "mr-5 max-w-full h-auto overflow-hidden m-5 mt-0 transition-all duration-500 md:mt-5" +
                    (!isOpened ? " md:!mt-0" : " md:!ml-0")
                }>
                    {children}
                </div>
            </main>
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
                        onPress={buttonPressHandler}
                        className={
                            "min-w-0 " +
                            "w-12 " +
                            "h-12 " +
                            "bg-default-300/35 " +
                            "dark:bg-default-100/35 " +
                            "dark:hover:bg-default-200/50 " +
                            "active:bg-default-100/65 " +
                            "dark:active:bg-default-300/65"}
                    >
                        {<Icon className="text-2xl" icon="lets-icons:home-duotone"/>}
                    </Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                href="/"
                                className={
                                    "min-w-0 " +
                                    "w-12 " +
                                    "h-12 " +
                                    "bg-default-300/35 " +
                                    "dark:bg-default-100/35 " +
                                    "dark:hover:bg-default-200/50 " +
                                    "active:bg-default-100/65 " +
                                    "dark:active:bg-default-300/65"}
                            >
                                {<Icon className="text-xl" icon="solar:user-bold-duotone"/>}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                startContent={<Icon className="text-2xl" icon="lets-icons:sign-out-squre-duotone"/>}
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
                            className={
                                "min-w-0 " +
                                "w-12 " +
                                "h-12 " +
                                "bg-default-300/35 " +
                                "dark:bg-default-100/35 " +
                                "dark:hover:bg-default-200/50 " +
                                "active:bg-default-100/65 " +
                                "dark:active:bg-default-300/65"}
                        >
                            {(isMobileOpened && width < 768) || (isOpened && width >= 768) ?
                                <Icon className={"text-2xl"} rotate={90}
                                      icon="solar:sidebar-minimalistic-line-duotone"/>
                                : <Icon className={"text-2xl"} rotate={90}
                                        icon="solar:sidebar-minimalistic-bold-duotone"/>
                            }
                        </Button>
                    </Tooltip>
                </CardHeader>
                <CardBody
                    className={"flex flex-col gap-3"
                        + (!isMobileOpened ? " overflow-hidden" : " overflow-auto")
                        + (!isOpened ? " md:overflow-hidden" : " md:overflow-auto")
                    }>
                    <SidebarSearch showKbd={width >= 768}/>
                    <DashboardBody onButtonPress={buttonPressHandler}/>
                </CardBody>
            </Card>
        </div>
    );
};

export default DashboardClient;