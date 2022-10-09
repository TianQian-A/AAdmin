import { ElMessage } from "element-plus";
import { AxiosError, AxiosResponse } from "axios";
import { handleStatus } from "@/http/helpers/handleStatus";
import { HttpType } from "../type/httpType";
import router from "@/router";
// 响应成功的拦截函数
export function handleResponseResolve(res: AxiosResponse<HttpType.ResultData>) {
	const { data } = res;
	// 响应成功
	if (data.code === HttpType.ResultCodeEnum.SUCCESS) {
		return Promise.resolve(data);
	}
	// 登录失效
	if (data.code === HttpType.ResultCodeEnum.OVERDUE) {
		router.replace({
			name: "login"
		});
	}
	ElMessage.error(data.msg);
	return Promise.reject(data);
}
// 响应错误的拦截函数
export function handleResponseReject(error: AxiosError) {
	const { response } = error;
	let errorInfo: HttpType.ErrorInfo = { msg: error.message };
	if (response) errorInfo = handleStatus(response);
	ElMessage.error(errorInfo.msg);
	return Promise.reject(errorInfo);
}
