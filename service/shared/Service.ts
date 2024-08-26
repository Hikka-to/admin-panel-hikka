import { axiosAgent } from "@/utils/AxionAgent";
import axios, { AxiosInstance } from "axios";

export default abstract class Service {
  protected axiosInstance: AxiosInstance;
  protected jwtToken?: string;
  private tokenAdded: boolean = false;

  protected constructor(addUrl?: string) {
    this.axiosInstance = axios.create({
      headers: {},
      baseURL: process.env.NEXT_PUBLIC_BASE_URL + (addUrl ?? this.constructor.name.replace(/^(.*?)(Service)?$/, "$1")),
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
        return Promise.reject(error instanceof Error ? error : new Error(error));
      }
    );
  }

  public get addUrl(): string {
    return this.axiosInstance.defaults.baseURL!.replace(new RegExp(`^${process.env.NEXT_PUBLIC_BASE_URL}(.*)$`), "$1");
  }

  protected set addUrl(value: string) {
    this.axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL + value;
  }

  public addJWTtoken(token: string) {
    if (this.tokenAdded) return;
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        this.tokenAdded = true;
        return config;
      },
      (error) => {
        return Promise.reject(error instanceof Error ? error : new Error(error));
      }
    );
  }
}
