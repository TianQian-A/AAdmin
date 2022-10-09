import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStoreAuth = defineStore(
	"auth",
	() => {
		// 用户信息
		const userInfo = reactive({
			id: 0,
			realName: ""
		});
		function setUserInfo(_UserInfo: typeof userInfo) {
			Object.assign(userInfo, _UserInfo);
		}
		return {
			// User
			userInfo,
			setUserInfo,
		};
	},
	{
		persist: {
			storage: localStorage,
			paths: [ "userInfo", ],
		}
	}
);
