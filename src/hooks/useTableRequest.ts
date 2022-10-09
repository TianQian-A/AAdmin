import { computed, onMounted, reactive, toRefs } from "vue";
import { objectPick } from "@vueuse/core";
const DEFAULT_PAGINATION = {
	pageNo: 1,
	pageSize: 20,
	total: 0,
};
export interface TableRequestConfig {
	requestApi: (params: any) => Promise<any>;
	/**
	 * 是否是分页
	 */
	isPage: boolean;
	/**
	 * 是否立即请求
	 */
	immediately?: boolean;
	/**
	 * 请求的默认参数
	 */
	defaultParams?: Record<any, any>;
	/**
	 * 请求的搜索参数
	 */
	searchParams?: Record<any, any>;
	/**
	 * 拦截请求的钩子函数
	 */
	dataHook?: (res: Awaited<ReturnType<TableRequestConfig["requestApi"]>>) => ReturnType<TableRequestConfig["requestApi"]>;
}
export const useTableRequest = (config: TableRequestConfig) => {
	const data = reactive({
		// 表格数据
		tableData: [],
		// 分页信息
		pagination: DEFAULT_PAGINATION,
		// 是否正在请求
		tableRequesting: false,
	});
	// 请求的总参数
	const requestParams = computed(() => {
		const pageParams = config.isPage ? objectPick(data.pagination, ["pageSize", "pageNo"]) : {};
		return Object.assign(pageParams, config.defaultParams, config.searchParams);
	});
	// 设置分页的总条数
	const setPaginationTotal = (total: number) => {
		data.pagination.total = total;
	};
	// 重置分页数据
	const resetPagination = () => {
		data.pagination = DEFAULT_PAGINATION;
	};
	// 请求数据
	const fetchData = () => {
		data.tableRequesting = true;
		config
			.requestApi(requestParams.value)
			.then((res) => {
				config.dataHook && (res = config.dataHook(res));
				data.tableData = res.data.list;
				if (config.isPage) setPaginationTotal(res.data.total);
			})
			.finally(() => {
				data.tableRequesting = false;
			});
	};
	onMounted(() => {
		const { immediately = true } = config;
		if (immediately) {
			fetchData();
		}
	});
	return {
		...toRefs(data),
		fetchTableData: fetchData,
		resetTablePagination: resetPagination,
	};
};
