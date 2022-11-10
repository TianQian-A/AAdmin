import { ElMessage } from "element-plus";
import { AxiosError, AxiosResponse } from "axios";
import { handleStatus } from "@/http/helpers/handleStatus";
import { HttpType } from "../type/httpType";
import router from "@/router";
import { has } from "lodash-es";
// 响应成功的拦截函数
export function handleResponseResolve(res: AxiosResponse<HttpType.ResultData>) {
	const { data } = res;
	// 登录失效
	if (data.code === HttpType.ResultCodeEnum.OVERDUE) {
		router.replace({
			name: "login",
		});
	}
	if (has(data, "code") && data.code !== HttpType.ResultCodeEnum.SUCCESS) {
		ElMessage.error(data.msg);
		return Promise.reject(data);
	}
	return Promise.resolve(data);
}
// 响应错误的拦截函数
export function handleResponseReject(error: AxiosError) {
	const { response } = error;
	let errorInfo: HttpType.ErrorInfo = { msg: error.message };
	if (response) errorInfo = handleStatus(response);
	ElMessage.error(errorInfo.msg);
	return Promise.reject(errorInfo);
}
