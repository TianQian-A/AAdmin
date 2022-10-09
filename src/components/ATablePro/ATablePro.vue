<!--
	结合 ATable 以及相应 Hooks 封装的表格组件
-->
<script setup lang="ts">
import { ATableType } from "@/types/aTable";
import ATable from "@/components/ATable/ATable.vue";
import { TableRequestConfig, useTableRequest } from "@/hooks/useTableRequest";
import { computed, provide, watch } from "vue";
import { useTableSearch } from "@/hooks/useTableSearch";
import ASearchForm from "@/components/ASearch/ASearchForm.vue";

interface ATableProProps {
	requestConfig: TableRequestConfig;
	columns: ATableType.Column[];
	tableAttrs?: ATableType.TableAttrs;
	tableEvent?: ATableType.TableEvent;
}
const props = withDefaults(defineProps<ATableProProps>(), {
	tableAttrs: () => ({}),
	tableEvent: () => ({}),
	columns: () => [],
});
// 搜索参数
const searchColumns = computed(() => props.columns.filter((item) => !!item.search));
const { clearSearchParams, updateSearchParams, searchParams } = useTableSearch();
provide("searchParams", searchParams);
provide("clearSearchParams", clearSearchParams);
provide("updateSearchParams", updateSearchParams);
const config = computed(() => {
	return Object.assign({}, props.requestConfig, { searchParams });
});
// table 请求对应的 hook
const { tableData, pagination, tableRequesting, fetchTableData, resetTablePagination } = useTableRequest(config.value);
// 分页信息改变时重新请求
watch([() => pagination.value.pageNo, () => pagination.value.pageSize], () => {
	fetchTableData();
});
defineExpose({
	fetchTableData,
	updateSearchParams,
});
</script>
<template>
	<ATable
		v-loading="tableRequesting"
		:table-data="tableData"
		:columns="columns"
		:table-event="tableEvent"
		:table-attrs="tableAttrs"
	>
		<template #head>
			<ASearchForm :columns="searchColumns" @search="fetchTableData">
				<template #searchItem>
					<slot name="searchItem"></slot>
				</template>
				<template #buttonLeft>
					<slot name="searchButtonLeft"></slot>
				</template>
				<template #buttonRight>
					<slot name="searchButtonRight"></slot>
				</template>
			</ASearchForm>
		</template>
		<template #foot>
			<el-pagination
				v-if="requestConfig.isPage"
				v-model:page-size="pagination.pageSize"
				v-model:current-page="pagination.pageNo"
				v-model:total="pagination.total"
			></el-pagination>
		</template>
	</ATable>
</template>
<style lang="scss" scoped></style>
