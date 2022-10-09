<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import { watch } from "vue";
import { useStoreTabs } from "@/pinia/modules/tabs";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const router = useRouter();
const route = useRoute();
const tabStore = useStoreTabs();
const { curTabValue, tabList } = storeToRefs(tabStore);
watch(
	() => route.fullPath,
	() => {
		tabStore.addTab(route);
	},
	{
		immediate: true
	}
);
const handleClick = (tab: TabsPaneContext) => {
	router.push(tab.props.name as string);
};
const handleRemove = (tabPanelName: string) => {
	tabStore.removeTab(tabPanelName);
};
</script>
<template>
	<div class="tab-wrap">
		<ElTabs
			v-model="curTabValue"
			type="card"
			@tab-click="handleClick"
			@tab-remove="handleRemove"
		>
			<ElTabPane
				v-for="tab in tabList"
				:key="tab.fullPath"
				:name="tab.fullPath"
				:closable="tab.fullPath !== '/home'"
			>
				<template #label>
					<ElIcon class="top-0.5 mr-0.5" v-if="tab.meta.icon">
						<component :is="tab.meta.icon"></component>
					</ElIcon>
					<span>{{tab.meta.menuName}}</span>
				</template>
			</ElTabPane>
		</ElTabs>
	</div>
</template>
<style lang="scss" scoped>
.tab-wrap {
	@apply w-full shadow-sm;
	:deep(.el-tabs) {
		.el-tabs__header {
			margin-bottom: 0;
			border: none;
			.el-tabs__nav-wrap {
				border: none;
				.el-tabs__nav {
					border: none;
					.el-tabs__item {
						@apply border-b-transparent border-l-transparent px-5 text-gray-500;
						&.is-active {
							@apply border-b-primary border-b-2 text-primary;
						}
					}
				}
			}
		}
	}
}
</style>
