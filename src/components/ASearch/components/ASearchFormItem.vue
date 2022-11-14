<script setup lang="ts">
import { ATableType } from "@/types/aTable";
import { computed, inject } from "vue";

interface Props {
	columnItem: ATableType.Column<any>;
}
const props = withDefaults(defineProps<Props>(), {
	columnItem: () => ({
		columnAttrs: {},
		type: "tag",
	}),
});
const searchParams = inject("searchParams") as Record<any, any>;
const updateSearchParams = inject("updateSearchParams") as (params: any) => void;
const paramVal = computed({
	get: () => {
		return searchParams[props.columnItem.columnAttrs.prop as string];
	},
	set: (val) => {
		const prop = props.columnItem.columnAttrs.prop as string;
		if (props.columnItem.search?.changeHook) val = props.columnItem.search.changeHook(val);
		updateSearchParams({ [prop]: val });
	},
});
</script>
<template>
	<template v-if="columnItem.search?.type === 'input'">
		<ElInput v-model="paramVal" clearable placeholder="请输入" v-bind="columnItem.search.attrs"></ElInput>
	</template>
	<template v-else-if="columnItem.search?.type === 'select'">
		<ElSelect v-model="paramVal" clearable placeholder="请选择" v-bind="columnItem.search.attrs">
			<ElOption v-for="item in columnItem.enums" :key="item.value" :label="item.value" :value="item.value"></ElOption>
		</ElSelect>
	</template>
</template>
<style lang="scss" scoped></style>
