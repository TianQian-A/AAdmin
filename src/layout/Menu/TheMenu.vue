<script setup lang="ts">
import AppIcon from "@/layout/Menu/components/AppIcon.vue";
import SubMenu from "@/layout/Menu/components/SubMenu.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreMenu } from "@/pinia/modules/menu";
import { useRoute } from "vue-router";
import { useStoreGlobal } from "@/pinia/modules/global";
const { collapsed } = storeToRefs(useStoreGlobal());
const menuWidth = computed(() => {
	return collapsed.value ? "65px" : "200px";
});
const menuStore = useStoreMenu();
const route = useRoute();
const menuList = computed(() => menuStore.dynamicMenuList);
const activeMenu = computed((): string => route.meta.menuId ?? "");
</script>
<template>
	<div class="menu" :style="{ width: menuWidth }">
		<ElScrollbar>
			<AppIcon></AppIcon>
			<ElMenu
				:collapse="collapsed"
				:default-active="activeMenu"
				menu-trigger="click"
				:collapse-transition="false"
				unique-opened
			>
				<SubMenu :menu-list="menuList"></SubMenu>
			</ElMenu>
		</ElScrollbar>
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
