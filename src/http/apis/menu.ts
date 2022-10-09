import { httpInstance } from "@/http";
import qs from "qs";
export namespace ApiMenu {
	export interface ResMenuItem {
		menuId: number;
		menuName: string;
		styleCode: string;
		url: string;
		children?: ResMenuItem[];
	}
	/**
	 * 获取用户动态菜单
	 * @param data
	 * @param data.mid 用户 id
	 */
	export function initMenu(data: { mid: number }) {
		return httpInstance.post<{ menu: ResMenuItem[] }>("/user/menu/all", qs.stringify(data), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
	}
}
