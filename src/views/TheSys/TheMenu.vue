<script setup lang="tsx">
import { ApiMenu } from "@/http/apis/menu";
import { useStoreMenu } from "@/pinia/modules/menu";
import { ATableType } from "@/types/aTable";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const tableAttr: ATableType.TableAttrs = {
	rowKey: "menuId",
};
const { dynamicMenuList } = storeToRefs(useStoreMenu());
interface MenusWithLevel extends ApiMenu.ResMenuItem {
	level: number;
}
const tableData = computed(() => {
	const addLevel = (menus: ApiMenu.ResMenuItem[], level = 1) => {
		return menus.reduce((acc: MenusWithLevel[], cur) => {
			const item = Object.assign({}, cur, { level });
			if (cur?.children?.length) item.children = addLevel(cur.children, level + 1);
			acc.push(item);
			return acc;
		}, []);
	};
	return addLevel(dynamicMenuList.value);
});
const columns: ATableType.Column<MenusWithLevel>[] = [
	{
		columnAttrs: {
			type: "index",
			label: "ID",
			align: "center",
		},
	},
	{
		columnAttrs: {
			prop: "menuName",
			label: "菜单名称",
			align: "left",
		},
	},
	{
		type: "tag",
		columnAttrs: {
			prop: "level",
			label: "级别",
		},
		renderColumn(scope) {
			return <el-tag type={scope.row.level > 1 ? "warning" : ""}>{scope.row.level} 级</el-tag>;
		},
	},
];
</script>
<template>
	<ATable class="a-table" :table-data="tableData" :columns="columns" :table-attrs="tableAttr"></ATable>
</template>
<style scoped lang="scss">
.a-table {
	:deep(.el-table) {
		.el-table_1_column_1 {
			.el-table__placeholder {
				display: none;
			}
		}
	}
}
</style>
