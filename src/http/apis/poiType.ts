import { httpInstance } from "..";
import { HttpType } from "../type/httpType";

export namespace ApiPoiType {
	/**
	 * poi 数据结构
	 */
	export interface ResPoiTypeItem {
		id: number;
		listIcon: string;
		listSelectIcon: string;
		markIcon: string;
		markSelectIcon: string;
		name: string;
		sort: number;
		hasContent: 0 | 1;
	}
	/**
	 * 请求修改 poi 类型的请求体
	 */
	export type ReqPoiTypeModify = Partial<ResPoiTypeItem>;
	/**
	 * 下拉列表的 poi 类型的数据结构
	 */
	export interface ResPoiTypeInitItem {
		id: number;
		name: string;
	}

	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, ResPoiTypeItem[]> = (data) => {
		return httpInstance.get("/poiType/selectPoiType", data);
	};
	export const listInit: HttpType.ApiRequest<any, ResPoiTypeInitItem[]> = () => {
		return httpInstance.post("/poiType/initPoiType");
	};

	export const modify: HttpType.ApiRequest<ReqPoiTypeModify, any> = (data) => {
		return httpInstance.post("/poiType/add", data);
	};
	export const del: HttpType.ApiRequest<number, any> = (id) => {
		return httpInstance.post("/poiType/delete", {}, { params: { id } });
	};
}
