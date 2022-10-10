import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";
import { layout as homeRoute } from "@/router/modules/home";
import { objectPick } from "@vueuse/core";
type MenuItem = Pick<RouteLocationNormalizedLoaded, "fullPath" | "meta">;
export const useStoreTabs = defineStore(
	"tabs",
	() => {
		const router = useRouter();
		const homeTab: MenuItem = {
			fullPath: "/home",
			meta: homeRoute[0].meta!,
		};
		const curTabValue: Ref<RouteLocationNormalizedLoaded["fullPath"]> = ref("");
		const tabList: Ref<MenuItem[]> = ref([homeTab]);
		// 添加 tab
		const addTab = (route: RouteLocationNormalizedLoaded) => {
			curTabValue.value = route.path === homeTab.fullPath ? homeTab.fullPath : route.fullPath;
			if (route.meta.disableTab) return;
			if (tabList.value.findIndex((item) => item.fullPath === route.fullPath) === -1) {
				tabList.value.push(objectPick(route, ["fullPath", "meta"]));
			}
		};
		// 设置激活的 tab
		const setTabValue = (fullPath: string) => {
			curTabValue.value = fullPath;
		};
		// 移除 tab
		const removeTab = (fullPath: string) => {
			const index = tabList.value.findIndex((item) => item.fullPath === fullPath);
			const nextIndex = index === tabList.value.length - 1 ? index - 1 : index + 1;
			if (fullPath === curTabValue.value) {
				const nextPath = tabList.value[nextIndex].fullPath;
				setTabValue(nextPath);
				router.push(nextPath);
			}
			tabList.value.splice(index, 1);
		};
		// 清除 tab
		const clearTab = () => {
			curTabValue.value = "";
			tabList.value = [];
		};
		return {
			curTabValue,
			setTabValue,
			tabList,
			addTab,
			removeTab,
			clearTab,
		};
	},
	{
		persist: true,
	}
);
