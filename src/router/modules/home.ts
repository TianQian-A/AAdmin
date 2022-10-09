import { RouteRecordRaw } from "vue-router";
import TheHome from "@/views/TheHome/TheHome.vue";

const homeRoute: RouteRecordRaw[] = [
	{
		path: "/home",
		name: "home",
		component: TheHome,
		meta: {
			requiredAuth: true,
			menuName: "首页",
			icon: "HomeFilled",
			disableTab: true,
		},
	},
];
export const layout = homeRoute;
