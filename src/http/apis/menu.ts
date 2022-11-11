import { httpInstance } from "..";
export namespace ApiMenu {
	export interface ResMenuItem {
		menuId: number;
		menuName: string;
		styleCode: string;
		url: string;
		children?: ResMenuItem[];
	}
	export interface ResMenu {
		menus: ResMenuItem[];
	}
	/**
	 * 获取用户动态菜单
	 * @param data
	 * @param data.mid 用户 id
	 */
	export function initMenu(data: { mid: number }) {
		return httpInstance.post<ResMenu>("/user/menu/all", {}, { params: { mid: data.mid } });
	}
}
