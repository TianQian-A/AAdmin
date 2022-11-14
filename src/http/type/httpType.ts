import { AxiosRequestConfig } from "axios";

export namespace HttpType {
	/**
	 * 统一错误信息
	 */
	export type ErrorInfo = {
		msg: string;
		code?: number;
	};
	/**
	 * 请求函数
	 */
	// export type ApiRequest<DATA, RESULT> = (data: DATA, config?: AxiosRequestConfig) => Promise<ResultData<RESULT>>;
	export interface ApiRequest<DATA, RESULT> {
		(data?: DATA, config?: AxiosRequestConfig): Promise<ResultData<RESULT>>;
	}
	/**
	 * 请求响应 code 枚举
	 */
	export enum ResultCodeEnum {
		SUCCESS = 0,
		OVERDUE = 5,
	}
	/**
	 * 请求响应结果基本接口
	 */
	interface BaseResult {
		code: number;
		msg: string;
	}

	/**
	 * 请求响应的结果
	 */
	export interface ResultData<T = any> extends BaseResult {
		data: T;
	}

	export interface PageBaseParams extends Record<any, any> {
		pageNo?: number;
		pageSize: number;
	}
}
