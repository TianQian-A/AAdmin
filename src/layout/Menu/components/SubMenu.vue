<script lang="ts">
export default {
	name: "SubMenu",
};
</script>
<script setup lang="ts">
import { ApiMenu } from "@/http/apis/menu";
import { useRouter } from "vue-router";
const router = useRouter();
interface SubMenuProp {
	menuList: ApiMenu.ResMenuItem[];
}
const props = withDefaults(defineProps<SubMenuProp>(), {
	menuList: () => [],
});
const handleClickMenuItem = (menuItem: ApiMenu.ResMenuItem) => {
	router.push(menuItem.url);
};
</script>
<template>
	<template v-for="subItem in props.menuList" :key="subItem.menuId">
		<ElSubMenu v-if="subItem.children && subItem.children.length > 0" :index="String(subItem.menuId)">
			<template #title>
				<ElIcon>
					<component v-if="subItem.styleCode" :is="subItem.styleCode"></component>
				</ElIcon>
				<span>{{ subItem.menuName }}</span>
			</template>
			<SubMenu :menuList="subItem.children"></SubMenu>
		</ElSubMenu>
		<ElMenuItem v-else :index="String(subItem.menuId)" @click="handleClickMenuItem(subItem)">
			<ElIcon>
				<component v-if="subItem.styleCode" :is="subItem.styleCode"></component>
			</ElIcon>
			<span>{{ subItem.menuName }}</span>
		</ElMenuItem>
	</template>
</template>
<style lang="scss" scoped></style>
