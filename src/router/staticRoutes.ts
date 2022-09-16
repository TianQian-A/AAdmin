import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/TheLayout.vue";
import Login from "@/views/LoginPage/LoginPage.vue";
const staticRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		component: Layout,
		meta: {
			notMenu: true,
			requiredAuth: true,
		},
		children: [
			{
				path: "/routeOne",
				name: "RouteOne",
				component: () => import("@/views/TempRoute/RouteOne.vue")
			}
		]
	},
	{
		path: "/LoginPage",
		name: "login",
		component: Login,
		meta: {
			notMenu: true,
		}
	},
	{
		path: "/StoreSelect",
		name: "StoreSelect",
		component: import("@/views/StoreSelect/StoreSelect.vue"),
		meta: {
			requiredAuth: true,
			notMenu: true,
		}
	}
];
export default staticRoutes;
