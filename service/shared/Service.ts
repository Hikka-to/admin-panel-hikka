import { axiosAgent } from "@/utils/AxionAgent";
import axios, { AxiosInstance } from "axios";

export default abstract class Service {
	protected axiosInstance: AxiosInstance;

	public constructor(addUrl: string) {
		this.axiosInstance = axios.create({
			headers: {},
			baseURL: process.env.BASE_URL + addUrl,
			timeout: 5000,
			httpsAgent: axiosAgent
		});
		this.axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response && error.response.status === 405) {
					console.log("Allowed methods:", error.response.headers["allow"]);
					return Promise.reject(
						new Error(
							"Method not allowed. Allowed methods: " +
							error.response.headers["allow"]
						)
					);
				}
				return Promise.reject(error);
			}
		);
	}

	public addJWTtoken(token: string) {
		this.axiosInstance.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}
}
