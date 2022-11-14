import { httpInstance } from "..";
import { HttpType } from "../type/httpType";
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
	export const initMenu: HttpType.ApiRequest<{ mid: number }, ResMenu> = (data) => {
		return httpInstance.post("/user/menu/all", {}, { params: { mid: data.mid } });
	};
}
