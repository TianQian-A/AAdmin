import { httpInstance } from "..";
import { HttpType } from "../type/httpType";
export namespace ApiLines {
	export interface ResLineItem {
		id: number;
		name: string;
		scenicId: number | string;
		duration: string;
		sort: number;
		cover: string;
		pointNum: number;
		createDate: Date;
	}
	export type ReqLineModify = Omit<Partial<ResLineItem>, "pointNum" | "createDate">;

	export interface ResLinePointItem {
		id: number;
		latitude: number;
		longitude: number;
		pointId: number;
		pointName: string;
		sort: number;
		lineId: number;
	}
	export type ReqLinePointModifyItem = Omit<ResLinePointItem, "id" | "pointId"> & { id?: number; pointId?: number };

	export const list: HttpType.ApiRequest<HttpType.PageBaseParams, ResLineItem[]> = (data) => {
		return httpInstance.get("/line/selectLine", data);
	};
	export const modify: HttpType.ApiRequest<ReqLineModify, any> = (data) => {
		return httpInstance.post("/line/add", data);
	};
	export const del: HttpType.ApiRequest<number, any> = (LineId) => {
		return httpInstance.post("/line/delete", {}, { params: { LineId } });
	};
	export const listPoint: HttpType.ApiRequest<number, ResLinePointItem[]> = (LineId) => {
		return httpInstance.post("/line/selectLinePoint", {}, { params: { LineId } });
	};
	export const modifyPoint: HttpType.ApiRequest<ReqLinePointModifyItem[], any> = (data) => {
		return httpInstance.post("/line/addPoint", data);
	};
}
