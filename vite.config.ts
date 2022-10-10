import { resolve } from "path";
import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
// 支持 jsx
import vueJsx from '@vitejs/plugin-vue-jsx'
// 使图标可作为组件来使用
import Icons from "unplugin-icons/vite";
// 自动引入组件的插件
import Components from "unplugin-vue-components/vite";
// 自动引入图标组件的 resolver
import IconsResolver from "unplugin-icons/resolver";
// 自动引入组件库组件的 resolver
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd());
	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			}
		},
		plugins: [
			vue(),
			vueJsx(),
			Components({
				resolvers: [
					ElementPlusResolver({
						importStyle: "sass"
					}),
					IconsResolver({
						prefix: "icon", // 组件名的前缀，以让插件识别，组件名称命名规则: 前缀 + 图标集名称 + 图标名称
						enabledCollections: ["uil"] // 支持的图标集，不设置的话默认支持所有 Iconify 的集合
					})
				]
			}),
			Icons({
				autoInstall: true,
				compiler: "vue3",
			}),
			createHtmlPlugin({
				minify: true,
				inject: {
					data: {
						title: env.VITE_HTML_TITLE
					}
				}
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use "@/styles/element/vars-common.scss" as *;
				`,
				},
			},
		},
	}
});
