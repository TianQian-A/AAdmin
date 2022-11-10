import { httpInstance } from "@/http";
export namespace ApiUser {
	interface RequestLoginPassword {
		username: string;
		password: string;
		code: string;
	}
	interface RequestLoginPhone {
		phone: string;
		code: string;
	}
	export interface ResLogin {
		access_token: string;
		id: number;
		realName: string;
	}
	/**
	 * 用户登录
	 */
	export function login(data: RequestLoginPassword | RequestLoginPhone) {
		return httpInstance.post<ResLogin>("/login", data);
	}
	export function captchaImage() {
		return httpInstance.get(
			"/captchaImage",
			{},
			{
				responseType: "blob",
			}
		);
	}
}
