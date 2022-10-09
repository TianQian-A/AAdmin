import { AxiosError, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { HttpType } from "../type/httpType";
import { useCookies } from "@vueuse/integrations/useCookies";
export function handleRequestResolve(config: AxiosRequestConfig) {
	config.headers = { ...config.headers, access_token: useCookies().get("token") };
	return config;
}
export function handleRequestReject(error: AxiosError): Promise<HttpType.ErrorInfo> {
	const errorInfo: HttpType.ErrorInfo = {  msg: error.message };
	ElMessage.error(errorInfo.msg);
	return Promise.reject(errorInfo);
}
