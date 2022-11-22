/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_IMAGE_URL: string;
	readonly VITE_A_MAP_KEY: string;
	readonly VITE_A_MAP_SECRET: string;
	readonly VITE_A_MAP_VERSION: string;
	/**
	 * 手绘地图的瓦片地址
	 */
	readonly VITE_MAP_TILE_PATH: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}
