import { httpInstance } from "@/http";
import { HttpType } from "../type/httpType";
export namespace ApiUser {
	export interface ReqLoginPassword {
		account: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
		id: number;
		realName: string;
	}
	export interface ReqChangePassword {
		id: number;
		oldPassword: string;
		newPassword: string;
	}
	/**
	 * 用户登录
	 */
	export const login: HttpType.ApiRequest<ReqLoginPassword, ResLogin> = (data) => {
		return httpInstance.post("/login", data);
	};
	/**
	 * 修改密码
	 */
	export const changePassword: HttpType.ApiRequest<ReqChangePassword, any> = (data) => {
		return httpInstance.post("/user/update/password", data);
	};
}
