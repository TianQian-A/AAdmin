import { useCookies } from "@vueuse/integrations/useCookies";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useStoreMenu } from "./menu";
import { useStoreTabs } from "./tabs";
export const useStoreAuth = defineStore(
	"auth",
	() => {
		const cookie = useCookies();
		const menuStore = useStoreMenu();
		const tabStore = useStoreTabs();
		// 用户信息
		const userInfo = reactive({
			id: 0,
			realName: "",
		});
		// 保存用户信息
		function setUserInfo(_UserInfo: typeof userInfo) {
			userInfo.id = _UserInfo.id;
			userInfo.realName = _UserInfo.realName;
		}
		function login(token: string, _UserInfo: typeof userInfo) {
			setUserInfo(_UserInfo);
			cookie.set("token", token);
		}
		// 退出登录
		function logout() {
			cookie.remove("token");
			tabStore.clearTab();
			menuStore.clearMenu();
			setUserInfo({ id: 0, realName: "" });
		}
		return {
			// User
			userInfo,
			setUserInfo,
			login,
			logout,
		};
	},
	{
		persist: {
			storage: localStorage,
			paths: ["userInfo"],
		},
	}
);
