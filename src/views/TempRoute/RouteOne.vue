<script setup lang="tsx">
import ATable from "@/components/ATable/ATable.vue";
import { ATableColumn, ElTableEvent } from "@/types/ATable";
const columns:ATableColumn[] = [
	{
		columnAttrs: {
			prop: "name",
			label: "姓名",
		},
		renderColumn() {

		}
	}
];
const tableEvent:ElTableEvent = {
	rowClick(row) {
		console.log(row);
	},
};

</script>
<template>
	<ATable :table-event="tableEvent" :columns="columns"></ATable>
</template>
<style lang="scss" scoped></style>
