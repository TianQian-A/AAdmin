// 后台全局配置
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStoreGlobal = defineStore(
	"global",
	() => {
		// element 组件大小相关
		const elComponentSize = ref("default");
		function changeElComponentSize(size: "default" | "small" | "large"): void {
			elComponentSize.value = size;
		}
		return {
			elComponentSize,
			changeElComponentSize,
		};
	},
	{
		persist: true
	}
);
