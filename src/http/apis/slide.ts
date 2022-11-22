import { httpInstance } from "..";
import { HttpType } from "../type/httpType";

export namespace ApiSlide {
	export interface ResSlideItem {
		id: number;
		pic: string;
		pointId: number;
	}
	export const list: HttpType.ApiRequest<number, ResSlideItem[]> = (pointId) => {
		return httpInstance.post("/img/selectByPointId", {}, { params: { pointId } });
	};
	export const del: HttpType.ApiRequest<number, any> = (imgId) => {
		return httpInstance.post("/img/delete", {}, { params: { imgId } });
	};
	export const upload: HttpType.ApiRequest<any, any> = (data) => {
		return httpInstance.post("/img/upload", data);
	};
}
