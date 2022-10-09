export namespace HttpType {
	/**
	 * 统一错误信息
	 */
	export type ErrorInfo = {
		msg: string;
		code?: number;
	};
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

	export type PageBaseParams = {
		pageNo?: number;
		pageSize: number;
	};
}
