import 'vue-router';
declare module "vue-router" {
	interface RouteMeta {
		/**
		 * 是否需要登录
		 */
		requiredAuth?: boolean;
		/**
		 * 菜单的图标
		 */
		icon?: string;
		/**
		 * 菜单的 id
		 */
		menuId?: string;
		/**
		 * 菜单的名称
		 */
		menuName?: string;
		/**
		 * 禁止添加到 tab
		 */
		disableTab?: boolean,
	}
}
