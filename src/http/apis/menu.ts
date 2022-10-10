import { httpInstance } from "@/http";
import qs from "qs";
import { HttpType } from "@/http/type/httpType";
export namespace ApiMenu {
	export interface ResMenuItem {
		menuId: number;
		menuName: string;
		styleCode: string;
		url: string;
		children?: ResMenuItem[];
	}

	const adminMenus: ResMenuItem[] = [
		{
			menuId: 1,
			menuName: "用户管理",
			styleCode: "User",
			url: "#",
			children: [
				{
					menuId: 2,
					menuName: "教师管理",
					styleCode: "Avatar",
					url: "/TheUser/TheTeacher",
				},
				{
					menuId: 3,
					menuName: "学生管理",
					styleCode: "UserFilled",
					url: "/TheUser/TheStudent",
				},
				{
					menuId: 4,
					menuName: "班级管理",
					styleCode: "School",
					url: "/TheUser/TheClass",
				},
			],
		},
		{
			menuId: 5,
			menuName: "旅游信息管理",
			styleCode: "Guide",
			url: "#",
			children: [
				{
					menuId: 6,
					menuName: "景区管理",
					styleCode: "WindPower",
					url: "/TravelInfo/TheScenic",
				},
				{
					menuId: 7,
					menuName: "点位类型",
					styleCode: "Location",
					url: "/TravelInfo/TheSpots",
				},
				{
					menuId: 8,
					menuName: "标签管理",
					styleCode: "CollectionTag",
					url: "/TravelInfo/TheTag",
				},
			],
		},
		{
			menuId: 9,
			menuName: "VR 管理",
			styleCode: "View",
			url: "/VRConfig/VRConfig",
		},
		{
			menuId: 10,
			menuName: "优秀案例",
			styleCode: "StarFilled",
			url: "/OutstandingCase/OutstandingCase",
		},
	];
	const teacherMenu: ResMenuItem[] = [
		{
			menuId: 11,
			menuName: "待批改",
			styleCode: "Edit",
			url: "/TaskTeacher/TaskWaited",
		},
		{
			menuId: 12,
			menuName: "已批改",
			styleCode: "Finished",
			url: "/TaskTeacher/TaskFinished",
		},
		{
			menuId: 13,
			menuName: "作业管理",
			styleCode: "List",
			url: "/TaskTeacher/TaskConfig",
		},
	];
	const studentMenu: ResMenuItem[] = [
		{
			menuId: 14,
			menuName: "待批改",
			styleCode: "Edit",
			url: "/TaskStudent/TaskWaited",
		},
		{
			menuId: 15,
			menuName: "已批改",
			styleCode: "Finished",
			url: "/TaskStudent/TaskFinished",
		},
		{
			menuId: 16,
			menuName: "草稿箱",
			styleCode: "MessageBox",
			url: "/TaskStudent/TaskDraft",
		},
	];
	/**
	 * 获取用户动态菜单
	 * @param data
	 * @param data.mid 用户 id
	 */
	export function initMenu(data: { mid: number }): Promise<HttpType.ResultData<ResMenuItem[]>> {
		let menu = adminMenus;
		if (data.mid === 1) {
			menu = studentMenu;
		}
		return new Promise((resolve) => resolve({ code: 0, msg: "ok", data: menu }));
	}
}
