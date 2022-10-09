import { RouteRecordRaw } from "vue-router";
const loginRoute: RouteRecordRaw[] = [
	{
		path: "/sys/user",
		name: "user",
		component: import("@/views/Sys/TheUser.vue"),
		meta: {
			requiredAuth: true,
		},
	},
];
export const layout = loginRoute;
