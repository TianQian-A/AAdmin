import { RouteRecordRaw } from "vue-router";
import TheLayout from "@/layout/TheLayout.vue";
// 本地页面路由列表
const staticRoutes: RouteRecordRaw[] = [];
const staticRoutesInLayout: RouteRecordRaw[] = [];
const routeModules = import.meta.glob<any>("../modules/*.ts", { eager: true });
for (const module of Object.entries(routeModules)) {
	if (module[1].default) staticRoutes.push(...module[1].default);
	if (module[1].layout) staticRoutesInLayout.push(...module[1].layout);
}
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: TheLayout,
		name: "layout",
		redirect: "/home",
		children: [...staticRoutesInLayout],
	},
	...staticRoutes,
];
export default routes;
