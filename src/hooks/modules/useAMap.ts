import AMapLoader from "@amap/amap-jsapi-loader";
import { whenever } from "@vueuse/core";
import { Ref, ShallowRef, shallowRef, watch } from "vue";
const env = import.meta.env;
window._AMapSecurityConfig = {
	securityJsCode: env.VITE_A_MAP_SECRET,
};
interface UseAMapParams {
	/**
	 * 加载地图 api 的配置选项
	 */
	loadConfig?: Record<string, any>;
	/**
	 * 地图容器的 ref 对象
	 */
	mapContainerRef: Ref<HTMLDivElement | null>;
	/**
	 * 生成地图实例的配置选项
	 */
	mapConfig?: AMap.MapOptions;
}
/**
 * 初始化地图，可以在 setup 中调用
 * 使用前必须判断地图实例是否不为 null，推荐使用 whenever 来判断地图实例，并初始化地图相关逻辑
 */
export const useAMap = ({
	mapContainerRef,
	mapConfig = {
		zoom: 10,
		zooms: [8, 20],
		center: [119.696175, 29.119254],
	},
	loadConfig,
}: UseAMapParams) => {
	const mapIns = shallowRef<AMap.Map | null>(null);
	// 监听传入的地图容器是否已挂载
	const stop = whenever(
		() => mapContainerRef.value !== null,
		() => {
			stop();
			AMapLoader.load({
				key: env.VITE_A_MAP_KEY,
				version: env.VITE_A_MAP_VERSION,
				// plugins: ["AMap.Scale", "AMap.ToolBar"],
				...loadConfig,
			})
				.then(() => {
					mapIns.value = new AMap.Map(mapContainerRef.value as HTMLDivElement, {
						doubleClickZoom: false,
						...mapConfig,
					});
					// // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
					// mapIns.value!.addControl(new AMap.ToolBar());
					// // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
					// mapIns.value!.addControl(new AMap.Scale());
				})
				.catch((e) => {
					console.error("高德地图加载错误", e);
				});
		}
	);
	return {
		mapIns,
	};
};
