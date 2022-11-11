import { httpInstance } from "@/http";
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
	export function login(data: ReqLoginPassword) {
		return httpInstance.post<ResLogin>("/login", data);
	}
	/**
	 * 修改密码
	 */
	export function changePassword(data: ReqChangePassword) {
		return httpInstance.post("/user/update/password", data);
	}
}
