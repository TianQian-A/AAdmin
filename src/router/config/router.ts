import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import NProgress from "./progress";

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});
/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(() => {
	NProgress.done();
});
export default router;
