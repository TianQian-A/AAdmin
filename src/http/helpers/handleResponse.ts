import { ElMessage } from "element-plus";
import { AxiosError, AxiosResponse } from "axios";
import { ResultCodeEnum } from "@/http/type/enums";
import { handleStatus } from "@/http/helpers/handleStatus";
import { ResultData } from "@/http/type/interface";
// 响应成功的拦截函数
export function handleResponseResolve(res: AxiosResponse<ResultData>) {
	const { data } = res;
	// 响应成功
	if (data.code === ResultCodeEnum.SUCCESS) {
		return Promise.resolve(data);
	}
	// 登录失效
	if (data.code === ResultCodeEnum.OVERDUE) {
		// TODO: to LoginPage
	}
	ElMessage.error(data.msg);
	return Promise.reject(data);
}
// 响应错误的拦截函数
export function handleResponseReject(error: AxiosError) {
	const { response } = error;
	if (response) return Promise.reject(handleStatus(response));
	return Promise.reject(error);
}
