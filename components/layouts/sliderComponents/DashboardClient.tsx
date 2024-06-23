"use client"
import { signOut, useSession } from 'next-auth/react';
import { Input } from '@nextui-org/input';
import { usePathname } from 'next/navigation';
import React from 'react'
import SliderButton from './SliderButton';
import SignOutButton from '@/components/shared/SignOutButton';

interface DashboardClientProps {
  children: React.ReactNode;
}

const listOfUrls = [
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

const DashboardClient: React.FC<DashboardClientProps> = ({ children }) => {
  const pathname = usePathname();
  const session = useSession();

  if (!pathname.startsWith('/auth/')) {
    return (
      <div className={"flex h-[100vh] bg-background "}>
        <div className={"dark:bg-gray-800 text-white w-64 p-4"}>
          <Input
            className='bg'
          >
          </Input>
          {
            listOfUrls.map((e, idx) => (
              <SliderButton key={idx}
                text={e.text}
                url={e.url}
              />
            ))
          }
          <SignOutButton/>
        </div>
        <main className={"w-full  h-full"}>
          {children}
        </main>
      </div>
    );
  }
  else {
    return <main className='w-full h-full'>
      {children}
    </main>;
  }
}

export default DashboardClient