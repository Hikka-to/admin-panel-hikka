import React, {Suspense} from 'react';
import DashboardClient from './sliderComponents/DashboardClient';
import LoadingCircle from '../shared/skeletons/LoadingCircle';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {

    return (
        <DashboardClient>
            <Suspense fallback={<LoadingCircle/>}>
                {children}
            </Suspense>
        </DashboardClient>
    );
};

export default DashboardLayout;
