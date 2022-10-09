import { reactive } from "vue";

export const useTableSearch = (defaultParams = {}) => {
	const searchParams: Record<any, any> = reactive(defaultParams);
	// 清除搜索参数
	const clearSearchParams = (_targetParams?: Record<string, any>) => {
		const targetParams = _targetParams || searchParams;
		for (const searchParamsKey in targetParams) {
			delete searchParams[searchParamsKey];
		}
	};
	// 更新搜索参数
	const updateSearchParams = (params: Record<string, any>) => {
		for (const [key, value] of Object.entries(params)) {
			searchParams[key] = value;
		}
	};
	return {
		clearSearchParams,
		updateSearchParams,
		searchParams,
	};
};
