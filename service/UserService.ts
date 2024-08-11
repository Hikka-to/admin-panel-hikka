import { AxiosError, AxiosResponse } from "axios";
import Service from "./shared/Service";
import { FilterPaginationDto } from "hikka-ts-dtos/Dto/SharedDtos/filter-pagination-dto";
import { ReturnPageDto } from "hikka-ts-dtos/Shared/return-page-dto";
import { GetUserDto } from "hikka-ts-dtos/Dto/Users/get-user-dto";
import { UserLoginDto } from "hikka-ts-dtos/Dto/Users/user-login-dto";
import { LoginResponseUserDto } from "hikka-ts-dtos/ResponseDto/login-response-user-dto";
import { UserRegistrationDto } from "hikka-ts-dtos/Dto/Users/user-registration-dto";


class UserService extends Service {

	public constructor() {
		super("User/");
	}

	async getAllUsers(
		paginationDto: FilterPaginationDto
	): Promise<AxiosResponse<ReturnPageDto<GetUserDto>>> {
		return this.axiosInstance.get("", { params: paginationDto });
	}

	async getUserById(id: number): Promise<AxiosResponse<GetUserDto>> {
		return this.axiosInstance.get(`${id}`);
	}

	async registerUser(model: UserRegistrationDto): Promise<AxiosResponse> {
		try {
			return await this.axiosInstance.post("registration", model);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				// The client was given an error response (5xx, 4xx)
				if (axiosError.response.status === 404) {
					// Handle 404 error specifically
					throw new Error(`Resource not found. Please check the URL "${(axiosError.request as XMLHttpRequest).responseURL}".`);
				}
			} else if (axiosError.request) {
				// The client never received a response, or the request was never left
				console.log("Request was made but no response was received.");
			} else {
				// Anything else
				console.log("An error occurred:", axiosError.message);
			}
			throw axiosError;
		}
	}

	async verifyUser(email: string, token: string): Promise<AxiosResponse> {
		return this.axiosInstance.post("verify", { email, token });
	}

	async forgotPassword(email: string): Promise<AxiosResponse> {
		return this.axiosInstance.post("forgot-password", { email });
	}

	async resetPassword(request: any): Promise<AxiosResponse> {
		return this.axiosInstance.post("reset-password", request);
	}

	async deleteUser(id: number): Promise<AxiosResponse> {
		return this.axiosInstance.delete(`${id}`);
	}


	async loginUser(model: UserLoginDto): Promise<AxiosResponse<LoginResponseUserDto>> {
		return this.axiosInstance.post("loginAdmin", model);
	}

}

export default new UserService();
