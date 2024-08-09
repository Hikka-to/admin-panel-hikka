"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
	const session = useSession();

	return (
		<div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary-600 ">
			<form
				action={async () => {
					await signOut({
						redirect: true,
						callbackUrl: "/auth/login"
					});
				}}
			>
				<button>
					Log Out
				</button>
			</form>
		</div>
	);
};

export default SignOutButton;