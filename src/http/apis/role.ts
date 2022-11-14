import { httpInstance } from "..";
import { HttpType } from "../type/httpType";

export namespace ApiRole {
	/**
	 * 角色响应体
	 */
	export interface ResRoleItem {
		des: string;
		id: number;
		roleCode: string;
		roleName: string;
	}

	/**
	 * 修改角色请求体
	 */
	export interface ReqRoleItem extends Omit<ResRoleItem, "id"> {
		id?: number;
	}

	export interface ReqRoleMenu {
		roleId: number;
		menuIds: string;
	}

	export interface ResRoleMenu {
		children: ResRoleMenu[];
		menuId: number;
		menuName: string;
		parentid: number;
		type: number;
	}

	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, { roleList: ResRoleItem[] }> = (data) => {
		return httpInstance.post("/role/all", data);
	};
	export const modify: HttpType.ApiRequest<ReqRoleItem, any> = (data) => {
		return httpInstance.post("/role/add", data);
	};
	export const del = (id: number) => {
		return httpInstance.post("/role/delete", {}, { params: { ids: id } });
	};
	export const listMenu: HttpType.ApiRequest<any, ResRoleMenu[]> = (data = {}) => {
		return httpInstance.post("/role/menu/input", data);
	};
	export const detailRoleMenu: HttpType.ApiRequest<number, { menuIds: string }> = (roleId) => {
		return httpInstance.post("/role/menu/list", {}, { params: { roleId } });
	};
	export const modifyMenu: HttpType.ApiRequest<ReqRoleMenu, any> = (data) => {
		return httpInstance.post("/role/menu/save", {}, { params: data });
	};
}
