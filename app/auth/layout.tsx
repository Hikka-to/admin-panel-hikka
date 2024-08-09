import "@/styles/globals.css";
import React from "react";
import { Card } from "@nextui-org/card";

export default function AuthLayout({ children }: {
	children: React.ReactNode;
}) {
	return (
		<main className="h-screen flex justify-center items-center md:p-32">
			<Card className="max-w-3xl flex-1 rounded-none md:h-auto md:rounded-large">
				{children}
			</Card>
		</main>
	);
}
