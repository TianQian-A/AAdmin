import { httpInstance } from "..";
import { HttpType } from "../type/httpType";
export namespace ApiSysUser {
	/**
	 * 用户信息
	 */
	export interface ResUserItem {
		account: string;
		email: string;
		id: number;
		realName: string;
		roleIds: string;
		state: 1 | 0;
		tel: string;
	}
	/**
	 * 保存用户角色的请求体
	 */
	export interface ReqUserRoleSave {
		operate_id: number;
		roleId: number | string;
		userId: number;
	}
	/**
	 * 新增或编辑用户的请求体
	 */
	export interface ReqModifyUser extends Omit<ResUserItem, "id" | "email" | "tel" | "roleIds"> {
		id?: number;
		tel?: string;
		password?: string;
	}
	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, ResUserItem[]> = (data) => {
		return httpInstance.post("/user/getAllUser", data);
	};
	export const modify: HttpType.ApiRequest<ReqModifyUser, any> = (data) => {
		return httpInstance.post("/reg", data);
	};

	export const del: HttpType.ApiRequest<number, any> = (id) => {
		return httpInstance.post("/user/delete", {}, { params: { ids: id } });
	};
	export const saveUserRole: HttpType.ApiRequest<ReqUserRoleSave, { showMe: 123 }> = (data) => {
		return httpInstance.post("/user/role/save", data);
	};
}
