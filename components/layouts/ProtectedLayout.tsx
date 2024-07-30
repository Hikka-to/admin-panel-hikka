"use client";
import {useSession} from 'next-auth/react';
import {redirect, RedirectType, usePathname} from 'next/navigation';
import React, {useEffect} from 'react';
import LoadingScreen from "@/components/shared/screens/LoadingScreen";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({children}) => {
    const {status} = useSession();
    const path = usePathname();

    useEffect(() => {
        if (status == "unauthenticated" && !path.startsWith("/auth"))
            redirect(
                '/auth/login',
                RedirectType.replace
            );
    }, [status]);

    return (
        <>
            {
                status == "loading" ?
                    <LoadingScreen/> :
                    children
            }
        </>
    );
};

export default ProtectedLayout;
