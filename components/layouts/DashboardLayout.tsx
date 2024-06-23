import React, { Suspense } from 'react';
import DashboardClient from './sliderComponents/DashboardClient';
import LoadingScreen from '../shared/screens/loadingScreen';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <DashboardClient>
      <Suspense fallback={<LoadingScreen/>}>
        {children}
      </Suspense>
    </DashboardClient>
  );
};

export default DashboardLayout;
