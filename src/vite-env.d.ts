/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_IMAGE_URL: string;
	readonly VITE_A_MAP_KEY: string;
	readonly VITE_A_MAP_SECRET: string;
	readonly VITE_A_MAP_VERSION: string
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}
