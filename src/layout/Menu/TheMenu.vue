<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreMenu } from "@/pinia/modules/menu";
import AppIcon from "@/layout/Menu/components/AppIcon.vue";
import SubMenu from "@/layout/Menu/components/SubMenu.vue";
const { collapsed } = storeToRefs(useStoreMenu());
const menuWidth = computed(() => {
	return collapsed.value ? "65px" : "200px";
});
</script>
<template>
	<div class="menu" :style="{ width: menuWidth }">
		<div v-if="false" color-red></div>
		<el-scrollbar>
			<app-icon></app-icon>
			<el-menu
				:collapse="collapsed"
				menu-trigger="click"
			>
				<sub-menu></sub-menu>
			</el-menu>
		</el-scrollbar>
	</div>
</template>
<style lang="scss" scoped>
.menu {
	@apply h-full transition-all;
	background-color: #313640;
	.el-menu {
		border-right: none;
	}
}
</style>
