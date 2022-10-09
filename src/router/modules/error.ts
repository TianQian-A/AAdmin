import { RouteRecordRaw } from "vue-router";
const errorRoute: RouteRecordRaw[] = [
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/StaticPages/ThePage404.vue"),
		meta: {
			disableTab: true,
		},
	},
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/StaticPages/ThePage403.vue"),
		meta: {
			disableTab: true,
		},
	},
];
export default errorRoute;
