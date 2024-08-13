import UserService from "@/service/UserService";
import { AxiosError } from "axios";
import { UserRegistrationDto } from "@/models/Dto/Users/user-registration-dto";

export async function POST(params: Request) {
	try {
		const model: UserRegistrationDto = await params.json();
		const user = await UserService.registerUser(model);
		return new Response(JSON.stringify(user.data), {
			status: user.status,
			statusText: user.statusText
		});
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