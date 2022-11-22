import { httpInstance } from "..";
import { HttpType } from "../type/httpType";

export namespace ApiPoi {
	/**
	 * 景点数据结构
	 */
	export interface ResPoiItem {
		id: number;
		name: string;
		address: string;
		latitude: number;
		longitude: number;
		maxZoom: number;
		minZoom: number;
		showZoom: number;
		audio: string;
		phone: string;
		pic: string;
		pointInfo: string;
		tag: string;
	}
	/**
	 * 下拉列表景点数据结构
	 */
	export type ResPoiInitItem = Omit<ResPoiItem, "minZoom" | "maxZoom" | "showZoom">;

	export interface ReqPoiModify extends Partial<ResPoiItem> {
		sort?: number;
		scenicId: number | string;
	}

	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, ResPoiItem[]> = (data) => {
		return httpInstance.get("/poi/selectPoi", data);
	};
	export const listInit: HttpType.ApiRequest<any, ResPoiInitItem[]> = () => {
		return httpInstance.post("/poi/getPoiByType");
	};
	export const del: HttpType.ApiRequest<number, any> = (id) => {
		return httpInstance.post("/poi/delete", {}, { params: { id } });
	};
	export const modify: HttpType.ApiRequest<ReqPoiModify, any> = (data) => {
		return httpInstance.post("/poi/add", data);
	};
}
