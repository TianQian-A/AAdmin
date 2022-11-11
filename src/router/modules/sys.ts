import { RouteRecordRaw } from "vue-router";
import TheRole from "@/views/TheSys/TheRole.vue";
import TheMenu from "@/views/TheSys/TheMenu.vue";
import TheUser from "@/views/TheSys/TheUser.vue";

const homeRoute: RouteRecordRaw[] = [
	{
		path: "/sys",
		name: "sys",
		meta: {
			requiredAuth: true,
		},
		children: [
			{
				path: "/role",
				name: "role",
				component: () => TheRole,
			},
			{
				path: "/menu",
				name: "menu",
				component: () => TheMenu,
			},
			{
				path: "/user",
				name: "user",
				component: () => TheUser,
			},
		],
	},
];
export const layout = homeRoute;
