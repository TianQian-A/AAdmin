import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import defaultConfig from "./defaultConfig";
import { handleRequestResolve, handleRequestReject } from "@/http/helpers/handleRequest";
import { handleResponseReject, handleResponseResolve } from "@/http/helpers/handleResponse";
import { ResultData } from "@/http/type/interface";
export class Http {
	service: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);
		// 请求拦截
		this.service.interceptors.request.use(handleRequestResolve, handleRequestReject);
		// 响应拦截
		this.service.interceptors.response.use(handleResponseResolve, handleResponseReject);
	}
	post<T>(url: string, data?: object): Promise<ResultData<T>> {
		return this.service.post(url, data);
	}
	get<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.get(url, { params });
	}
	delete<T>(url: string, params?: object): Promise<ResultData<T>> {
		return this.service.delete(url, params);
	}
}
export const httpInstance = new Http(defaultConfig);
