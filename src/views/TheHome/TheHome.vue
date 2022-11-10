<script lang="tsx">
export default {
	name: "TheHome",
};
</script>
<script setup lang="tsx">
import { ATableType } from "@/types/aTable";
import ATablePro from "@/components/ATablePro/ATablePro.vue";
import { ApiHotspot } from "@/http/apis/hotspot";
import { TableRequestConfig } from "@/hooks/useTableRequest";
import { onMounted, ref } from "vue";

const aTablePro = ref<InstanceType<typeof ATablePro> | null>(null);
const columns: ATableType.Column[] = [
	{
		columnAttrs: {
			prop: "name",
			label: "名称",
		},
		search: {
			type: "input",
		},
	},
	{
		columnAttrs: {
			prop: "address",
			label: "地址",
		},
		search: {
			type: "input",
		},
	},
	{
		columnAttrs: {
			prop: "audio",
			label: "音频",
		},
	},
];
const config: TableRequestConfig = {
	requestApi: ApiHotspot.list,
	isPage: true,
};
</script>
<template>
	<ATablePro ref="aTablePro" :columns="columns" :request-config="config"></ATablePro>
</template>
<style lang="scss" scoped></style>
