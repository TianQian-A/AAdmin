<script setup lang="ts">
import { ATableType } from "@/types/aTable";
import ASearchFormItem from "@/components/ASearch/components/ASearchFormItem.vue";
import { inject } from "vue";

interface SearchProps {
	columns: ATableType.Column[];
}
withDefaults(defineProps<SearchProps>(), {
	columns: () => [],
});
const emit = defineEmits(["search"]);
const resetSearchParams = inject("clearSearchParams");
</script>
<template>
	<ElForm inline>
		<ElFormItem v-for="column in columns" :key="column.columnAttrs.prop" :label="`${column.columnAttrs.label}: `">
			<ASearchFormItem :column-item="column"></ASearchFormItem>
		</ElFormItem>
		<slot name="searchItem"></slot>
		<ElFormItem>
			<slot name="buttonLeft"></slot>
			<ElButton type="primary" icon="Search" @click="emit('search')">搜索</ElButton>
			<ElButton icon="RefreshLeft" @click="resetSearchParams(null)">重置</ElButton>
			<slot name="buttonRight"></slot>
		</ElFormItem>
	</ElForm>
</template>
<style lang="scss" scoped>
.el-form {
	:deep(.el-form-item) {
		@apply mb-2;
	}
}
</style>
