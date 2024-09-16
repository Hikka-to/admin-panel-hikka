// Import necessary types and services
import { decodeJwtToken, signJwtAccessToken } from "@/lib/jwtTokenUtils";
import UserService from "@/service/UserService";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { UserLoginDto } from "@/models/Dto/Users/user-login-dto";

// Define the POST handler for the login route
export async function POST(body: Request) {
	try {
		const model: UserLoginDto = await body.json();
		const user = await UserService.loginUser(model);

		if (user.status == 200) {
			const accessToken = signJwtAccessToken(user.data);
			const decodeToken = decodeJwtToken(accessToken);

			const result = {
				accessToken,
				...decodeToken
			};

			return new Response(JSON.stringify(result));
		} else return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
	} catch (e) {
		if (e instanceof AxiosError) {
			const axiosError = e as AxiosError;
			return new Response(JSON.stringify(axiosError.response?.data), {
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText
			});
		}
		const error = e as Error;
		return new Response(JSON.stringify(error.message), {
			status: 500,
			statusText: "Internal Server Error"
		});
	}

}