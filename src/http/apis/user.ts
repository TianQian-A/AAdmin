import { httpInstance } from "@/http";
export namespace ApiUser {
	export interface ResLogin {
		access_token: string,
		id: number,
		realName: string,
	}
	/**
	 * 用户登录
	 */
	export function login(data: { account: string, password: string }) {
		return httpInstance.post<ResLogin>("/login", data, );
	}
}
