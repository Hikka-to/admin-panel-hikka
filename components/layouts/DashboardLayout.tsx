import React from "react";
import DashboardClient from "./sliderComponents/DashboardClient";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

	return (
		<DashboardClient>
			{children}
		</DashboardClient>
	);
};

export default DashboardLayout;
