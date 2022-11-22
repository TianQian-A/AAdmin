import { AxiosRequestConfig } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
/**
 * 操作请求前的确认 hook，返回内容包括:
 *  1. apiConfirm: 确认操作弹窗，并自动调用 api
 *  2. apiLoading: 是否正在请求
 * @param api 操作的 api
 */
export const useApiConfirm = <T extends (data: any, config?: AxiosRequestConfig) => Promise<any>>(
	api: T,
	suucessCall?: () => void,
	failCall?: () => void
) => {
	const apiLoading = ref(false);
	const apiConfirm = (
		data: Parameters<T>[0],
		confirmText = "操作",
		config?: AxiosRequestConfig
	): Promise<Awaited<ReturnType<T>>> => {
		return ElMessageBox.confirm(`确认${confirmText}吗`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				return api(data, config)
					.then((res) => {
						ElMessage.success(`${confirmText}成功`);
						suucessCall && suucessCall();
						return res;
					})
					.catch((err) => {
						// ElMessage.error(err.msg);
						failCall && failCall();
						throw err;
					});
			})
			.finally(() => {
				apiLoading.value = false;
			});
	};
	return {
		apiLoading,
		apiConfirm,
	};
};
