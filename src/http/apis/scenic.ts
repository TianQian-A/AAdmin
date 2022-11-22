import { httpInstance } from "@/http";
import { HttpType } from "@/http/type/httpType";

export namespace ApiScenic {
	/**
	 * 景区数据结构
	 */
	export interface ResScenicItem {
		id: number;
		address: string;
		name: string;
		latitude: number | string;
		longitude: number | string;
		maxZoom: number;
		minZoom: number;
		showZoom: number;
	}
	/**
	 * 请求修改 poi 类型的请求体
	 */
	export type ReqScenicModify = Partial<ResScenicItem>;
	/**
	 * 下拉列表的景区的数据结构
	 */
	export interface ResScenicInitItem {
		id: number;
		name: string;
	}
	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, ResScenicItem[]> = (data) => {
		return httpInstance.get("/scenic/selectScenic", data);
	};
	export const listInit: HttpType.ApiRequest<any, ResScenicInitItem[]> = () => {
		return httpInstance.get("/scenic/initScenic");
	};
	export const modify: HttpType.ApiRequest<ReqScenicModify, any> = (data) => {
		return httpInstance.post("/scenic/add", data);
	};
	export const del: HttpType.ApiRequest<number, any> = (id) => {
		return httpInstance.post("/scenic/delete", {}, { params: { id } });
	};
}
