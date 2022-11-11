import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";
import { useStoreAuth } from "@/pinia/modules/auth";
import { ApiMenu } from "@/http/apis/menu";
import { treeToArray } from "@/utils/util";
import { RouteRecordRaw } from "vue-router";
import router from "@/router";

export const useStoreMenu = defineStore("menu", () => {
	const hasInitDynamicMenu = ref(false);
	const dynamicMenuList: Ref<ApiMenu.ResMenuItem[]> = ref([]);
	/**
	 * 扁平化的动态菜单
	 */
	const dynamicMenuFlatted = computed(() =>
		treeToArray(dynamicMenuList.value, "children", (treeItem) => {
			treeItem.styleCode = "Grid";
			if (treeItem.url === "#") return;
			treeItem.url =
				"/" +
				treeItem.url
					.split("/")
					.filter((item) => !!item)
					.map((item: string) => item.charAt(0).toUpperCase() + item.slice(1))
					.join("/");
		})
	);
	/**
	 * 初始化动态菜单
	 */
	const initDynamicMenus = async () => {
		const authStore = useStoreAuth();
		dynamicMenuList.value = await ApiMenu.initMenu({ mid: authStore.userInfo.id }).then((res) => {
			formatUrl(res.data.menus);
			return res.data.menus;
		});
		addDynamicMenus();
		hasInitDynamicMenu.value = true;
	};
	/**
	 * 格式化菜单的 url
	 */
	const formatUrl = (menus: ApiMenu.ResMenuItem[]) => {
		for (let i = 0; i < menus.length; i++) {
			const menu = menus[i];
			if (menu.url !== "#") {
				menu.url =
					"/" +
					menu.url
						.split("/")
						.filter((item) => !!item)
						.map((item: string) => "The" + item.charAt(0).toUpperCase() + item.slice(1))
						.join("/");
			}
			if (menu?.children?.length) formatUrl(menu.children);
		}
	};
	/**
	 * 添加动态菜单到路由
	 */
	const addDynamicMenus = () => {
		const modules = import.meta.glob("/src/views/**/*.vue");
		dynamicMenuFlatted.value.forEach((menuItem) => {
			if (menuItem.url === "#") return;
			const route: RouteRecordRaw = {
				path: menuItem.url,
				component: modules[`/src/views${menuItem.url}.vue`],
				name: menuItem.menuName,
				meta: {
					icon: menuItem.styleCode,
					menuId: String(menuItem.menuId),
					menuName: menuItem.menuName,
					requiredAuth: true,
				},
			};
			router.addRoute("layout", route);
		});
	};
	/**
	 * 清除所有菜单
	 */
	const clearMenu = () => {
		hasInitDynamicMenu.value = false;
		dynamicMenuList.value = [];
	};
	return {
		hasInitDynamicMenu,
		dynamicMenuList,
		dynamicMenuFlatted,
		initDynamicMenus,
		clearMenu,
	};
});
