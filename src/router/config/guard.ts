import { NavigationGuardWithThis } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useStoreMenu } from "@/pinia/modules/menu";
import NProgress from "./progress";

export const guardBeforeEach: NavigationGuardWithThis<undefined> = async (to, from, next) => {
	NProgress.start();
	const menuStore = useStoreMenu();
	console.log(to);
	// 登录页面不拦截
	if (to.name === "login" || to.name === "404" || to.name === "403") return next();
	// 检查是否登录
	const cookie = useCookies(["token"]);
	if (!cookie.get("token") && to.matched.some((route) => route.meta.requiredAuth)) return next("login");
	// 检查是否已加载动态路由
	if (!menuStore.hasInitDynamicMenu) {
		console.log("DynamicMenu: not load");
		await menuStore.initDynamicMenus();
		return next(to.path);
	}
	console.log("DynamicMenu: loaded");
	// 没有匹配任何路由
	if (to.matched.length <= 0) return next("/404");
	next();
};
