import router from "@/router/config/router";
import { guardBeforeEach } from "@/router/config/guard";
router.beforeEach(guardBeforeEach);
export default router;
