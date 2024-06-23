"use client";
import { useSession } from 'next-auth/react';
import { RedirectType, redirect, usePathname } from 'next/navigation';
import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const session = useSession();
    const path = usePathname();


    if (session.data?.user ===  null  || path.startsWith('/auth/')) {
        return (
            children
        );
    }
    else {
        redirect(
            '/auth/login',
            RedirectType.replace
        );

    }

};

export default ProtectedLayout;
