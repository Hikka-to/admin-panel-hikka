"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Tooltip
} from "@nextui-org/react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Icon } from "@iconify-icon/react";
import SidebarSearch from "@/components/sidebar/search/SidebarSearch";
import DashboardBody from "@/components/layouts/sliderComponents/DashboardBody";

interface DashboardClientProps {
  children: React.ReactNode;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ children }) => {
  const [isOpened, setIsOpened] = React.useState(true);
  const [isMobileOpened, setIsMobileOpened] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const { width, height } = useWindowDimensions();
  const bigWidth = width >= 768;
  const bigHeight = height >= 640;
  const showSidebar =
    isOpened && bigWidth ||
    !bigHeight && bigWidth ||
    isMobileOpened && bigWidth;
  const sidebarOnTheLeft = showSidebar && bigWidth;

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
      elm.querySelectorAll("a").forEach((el) => {
        if (disable) {
          el.setAttribute("tabindex", "-1");
        } else {
          el.removeAttribute("tabindex");
        }
      });

      elm.querySelectorAll("button").forEach((el) => {
        if (disable) {
          el.setAttribute("tabindex", "-1");
        } else {
          el.removeAttribute("tabindex");
        }
      });

      elm.querySelectorAll("input").forEach((el) => {
        if (disable) {
          el.setAttribute("tabindex", "-1");
        } else {
          el.removeAttribute("tabindex");
        }
      });

      elm.querySelectorAll("textarea").forEach((el) => {
        if (disable) {
          el.setAttribute("tabindex", "-1");
        } else {
          el.removeAttribute("tabindex");
        }
      });
    }

    const body = sidebarRef.current!.children[1] as HTMLDivElement;
    if ((!isMobileOpened && width < 768) || (!isOpened && width >= 768 && height >= 640)) {
      changeKeyboardNavigation(body, true);
    } else {
      changeKeyboardNavigation(body, false);
    }
  }, [width, isOpened, isMobileOpened]);

  return (
    <div className="flex flex-col h-screen overflow-hidden box-border">
      <main className={
        "w-screen h-screen overflow-y-scroll box-border transition-all duration-500" +
        (sidebarOnTheLeft ? " pl-[296px]" : " pt-[112px]")
      }>
        <div className={
          "max-w-full m-5 transition-all duration-500" +
          (sidebarOnTheLeft ? " ml-0 md:h-[calc(100vh-2.5rem)]" : " mt-0 h-[calc(100vh-2.5rem-92px)]")
        }>
          {children}
        </div>
      </main>
      <Card isBlurred
            ref={sidebarRef}
            onTransitionEnd={transitionEndHandler}
            className={
              (showSidebar ? "h-[calc(100%-40px)] " : "h-[72px] ") +
              "!transition-all !duration-500 " +
              "fixed " +
              "text-white " +
              "m-5 " +
              "bg-background/60 " +
              "dark:bg-default-100/50 " +
              "w-[calc(100%-40px)] " +
              "md:w-64 " +
              "z-20"}>
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
            {<Icon className="text-2xl" icon="lets-icons:home-duotone" />}
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
                {<Icon className="text-xl" icon="solar:user-bold-duotone" />}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded" aria-label="Account Dropdown">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Icon className="text-2xl"
                                    icon="lets-icons:sign-out-squre-duotone" />}
                onPress={signOutHandler}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {bigHeight && <Tooltip
            content={showSidebar
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
              {showSidebar ?
                <Icon className={"text-2xl"} rotate={90}
                      icon="solar:sidebar-minimalistic-line-duotone" />
                : <Icon className={"text-2xl"} rotate={90}
                        icon="solar:sidebar-minimalistic-bold-duotone" />
              }
            </Button>
          </Tooltip>}
        </CardHeader>
        <CardBody
          className={"flex flex-col gap-3"
            + (showSidebar ? " overflow-auto" : " overflow-hidden")
          }>
          <SidebarSearch />
          <DashboardBody onButtonPress={buttonPressHandler} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardClient;