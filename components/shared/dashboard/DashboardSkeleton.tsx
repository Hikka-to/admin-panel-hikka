import { Skeleton } from "@nextui-org/react";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function DashboardSkeleton() {
	return (
		<div className={"flex h-screen bg-background overflow-hidden "}>
			<Card isBlurred
						className={
							"h-[72px] " +
							"md:h-[calc(100%-40px)] " +
							"!transition-all !duration-500 " +
							"fixed " +
							"text-white " +
							"m-5 " +
							"bg-background/60 " +
							"dark:bg-default-100/50 " +
							"w-[calc(100%-40px)] " +
							"md:w-64"}>
				<CardHeader className="flex gap-3 justify-center">
					<Skeleton className="rounded-large w-12 h-12" />
					<Skeleton className="rounded-large w-12 h-12" />
					<Skeleton className="rounded-large w-12 h-12" />
				</CardHeader>
				<CardBody className="flex flex-col gap-3 overflow-hidden">
					<Skeleton className="rounded-large h-[44px]" />
					<Skeleton className="rounded-large h-[44px]" />
					<Skeleton className="rounded-md h-[44px] ml-12" />
					<Skeleton className="rounded-md h-[44px] ml-12" />
					<Skeleton className="rounded-md h-[44px] ml-12" />
					<Skeleton className="rounded-md h-[44px] ml-12" />
					<Skeleton className="rounded-md h-[44px]" />
					<Skeleton className="rounded-md h-[44px]" />
				</CardBody>
			</Card>
			<main className={"w-full"}>

			</main>
		</div>
	);
}