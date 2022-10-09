import { RouteRecordRaw } from "vue-router";
import Login from "@/views/TheLogin/TheLogin.vue";
const loginRoute: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			disableTab: true,
		},
	},
];
export default loginRoute;
