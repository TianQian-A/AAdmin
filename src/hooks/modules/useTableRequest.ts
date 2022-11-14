import { computed, onMounted, reactive, toRefs } from "vue";
import { objectPick } from "@vueuse/core";
import { ATableType } from "@/types/aTable";
const DEFAULT_PAGINATION = {
	pageNo: 1,
	pageSize: 20,
	total: 0,
};
export const useTableRequest = (config: ATableType.TableRequestConfig) => {
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
			.then((res: any) => {
				config.dataHook && (res = config.dataHook(res));
				data.tableData = res.data;
				if (config.isPage) setPaginationTotal(res.totalCount);
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
