import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


export const updateSearchParams = (type: string, value: string) => {

	const searchParams = new URLSearchParams(window.location.search);

	searchParams.set(type, value);

	const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
	return newPathName;
};