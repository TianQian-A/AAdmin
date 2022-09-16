import { AxiosError, AxiosRequestConfig } from "axios";
import { pickBy, isEmpty, isObject } from "lodash-es";
export function handleRequestResolve(config: AxiosRequestConfig) {
	// 过滤请求参数的空值
	if (isObject(config.data)) config.data = pickBy(config.data, isEmpty);
	if (isObject(config.params)) config.params = pickBy(config.params, isEmpty);
	return config;
}
export function handleRequestReject(error: AxiosError) {
	return Promise.reject(error);
}
