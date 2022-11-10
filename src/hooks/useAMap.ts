import AMapLoader from "@amap/amap-jsapi-loader";
import { Ref, ShallowRef, shallowRef } from "vue";
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
 * 初始化地图，必须要再 mounted 生命周期后调用
 */
export const useAMap: (params: UseAMapParams) => Promise<ShallowRef<AMap.Map | null>> = ({
	mapContainerRef,
	mapConfig = {
		zoom: 12,
		zooms: [2, 22],
		center: [105.602725, 37.076636],
	},
	loadConfig,
}) => {
	const mapIns = shallowRef<AMap.Map | null>(null);
	return new Promise((resolve, reject) => {
		AMapLoader.load({
			key: env.VITE_A_MAP_KEY,
			version: env.VITE_A_MAP_VERSION,
			...loadConfig,
		})
			.then(() => {
				mapIns.value = new AMap.Map(mapContainerRef.value as HTMLDivElement, {
					...mapConfig,
				});
				resolve(mapIns);
			})
			.catch((e) => {
				console.error("高德地图加载错误", e);
				reject(e);
			});
	});
};
