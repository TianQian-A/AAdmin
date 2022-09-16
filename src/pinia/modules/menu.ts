import { defineStore } from "pinia";
import { ref } from "vue";
export const useStoreMenu = defineStore(
	"menu",
	() => {
		// 菜单折叠相关
		const collapsed = ref(false);
		function changeCollapse(_collapsed: boolean): void {
			collapsed.value = _collapsed;
		}
		return {
			collapsed,
			changeCollapse,
		};
	}
);
