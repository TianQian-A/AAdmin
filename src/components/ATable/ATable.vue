<script setup lang="ts">
import { ElTableAttrs, ElTableEvent, ATableColumn } from "@/types/ATable";
interface ATableProps {
	tableAttrs?: ElTableAttrs,
	tableEvent?: ElTableEvent,
	columns: ATableColumn[],
}
const props = withDefaults(defineProps<ATableProps>(), {
	tableAttrs: () => ({}),
	tableEvent: () => ({}),
	columns: () => ([]),
});
const tableData = [ { name: 23 } ];
</script>
<template>
	<el-table
		ref="elTable"
		:data="tableData"
		border
		stripe
		v-bind="props.tableAttrs"
		v-on="props.tableEvent"
	>
		<el-table-column
			v-for="(column, index) in props.columns"
			:key="index"
			v-bind="column.columnAttrs"
		>
			<template v-if="column.renderColumn" #default="{ row, column: elColumn }">
				<component :is="column.renderColumn({ row, elColumn, column })"></component>
			</template>
			<template v-if="column.renderHeader" #header="{ column: elColumn }">
				<component :is="column.renderHeader({ column, elColumn })"></component>
			</template>
		</el-table-column>
	</el-table>
</template>
<style lang="scss" scoped></style>
