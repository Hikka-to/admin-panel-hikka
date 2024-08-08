"use client"
import {useSession} from 'next-auth/react';
import {Input} from '@nextui-org/input';
import {usePathname} from 'next/navigation';
import React from 'react'
import SliderButton from './SliderButton';
import SignOutButton from '@/components/shared/SignOutButton';
import { CollapseItems } from '@/components/sidebar/CollapseItems';
import SidebarButtonType from '@/types/sidebar/SidebarButtonType';

interface DashboardClientProps {
    children: React.ReactNode;
}

const listOfUrls : SidebarButtonType[] = [
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
    },
]

const DashboardClient: React.FC<DashboardClientProps> = ({children}) => {
    const pathname = usePathname();
    const session = useSession();

    if (!pathname.startsWith('/auth/')) {
        return (
            <div className={"flex h-full bg-background overflow-hidden "}>
                <div className={"dark:bg-gray-800 text-white w-64 p-4 "}>
                    <Input
                        className='bg mb-3'

                    >
                    </Input>
                    <CollapseItems
                    title='test'
                    items={listOfUrls}
                    />
                    
                   
                    <SignOutButton/>
                </div>
                <main className={"w-full"}>
                    {children}
                </main>
            </div>
        );
    } else {
        return <main className='w-full h-full'>
            {children}
        </main>;
    }
}

export default DashboardClient