import { createRouter, createWebHashHistory } from "vue-router";
import staticRoutes from "./staticRoutes";
import { beforeEach } from "./guard";
const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes,
});
router.beforeEach(beforeEach);
export default router;
