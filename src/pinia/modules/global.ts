// 后台全局配置
import { defineStore } from "pinia";
import { ref, Ref, UnwrapRef } from "vue";
export const useStoreGlobal = defineStore(
	"global",
	() => {
		// element 组件大小
		const elComponentSize: Ref<"default"|"small"|"large"> = ref("default");
		const changeElComponentSize = (size: UnwrapRef<typeof elComponentSize>): void => {
			elComponentSize.value = size;
		};
		// 菜单是否折叠
		const collapsed = ref(false);
		const changeCollapsed = (_Collapsed: boolean) => {
			collapsed.value = _Collapsed;
		};
		return {
			elComponentSize,
			changeElComponentSize,
			collapsed,
			changeCollapsed,
		};
	},
	{
		persist: true
	}
);
