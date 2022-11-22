<script setup lang="ts">
import { ApiPoi } from "@/http/apis/poi";
import { watchThrottled } from "@vueuse/core";
import { onMounted, ref, Ref } from "vue";

const isLoading = ref(false);
const emits = defineEmits<{
	(e: "select", data: ApiPoi.ResPoiInitItem): void;
}>();
interface Props {
	selectedIds: number[];
}
withDefaults(defineProps<Props>(), {
	selectedIds: () => [],
});

const pointList: Ref<ApiPoi.ResPoiItem[]> = ref([]);
const pointListComputed: Ref<ApiPoi.ResPoiItem[]> = ref([]);
const filterText = ref("");

watchThrottled(
	filterText,
	(val) => {
		pointListComputed.value = pointList.value.filter((item) => val === "" || item.name.includes(val));
	},
	{ throttle: 300, immediate: true }
);

onMounted(() => {
	isLoading.value = true;
	ApiPoi.list({ pageSize: 0 })
		.then((res) => {
			pointList.value = res.data;
			pointListComputed.value = res.data;
		})
		.finally(() => {
			isLoading.value = false;
		});
});
</script>
<template>
	<div class="tree-box" v-loading="isLoading">
		<div class="tree-box-filter">
			<el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
		</div>
		<div class="tree">
			<div class="tree-item" v-for="data in pointListComputed" :key="data.id">
				<div class="flex-grow flex justify-between items-center">
					<div class="flex items-center">
						<AImage class="mr-2" :url="data.pic"></AImage>
						<span>{{ data.name }}</span>
					</div>
					<template v-if="selectedIds.includes(data.id)">
						<span class="text-info flex-shrink">已存在</span>
					</template>
					<template v-else>
						<el-button
							class="flex-shrink"
							type="primary"
							size="small"
							circle
							icon="Plus"
							@click="emits('select', data)"
						></el-button>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.tree-box {
	@apply w-96 h-full box-border px-4 pb-2;
	@apply rounded-lg;
	@apply overflow-auto flex flex-col;
	background-color: var(--el-bg-color);
	&-filter {
		@apply sticky top-0 z-[1] py-2;
		background-color: var(--el-bg-color);
	}
	.tree {
		@apply flex flex-col;
		&-item {
			@apply flex justify-between h-[56px];
		}
	}
}
</style>
