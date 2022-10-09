import { httpInstance } from "@/http";
import { HttpType } from "@/http/type/httpType";

export namespace ApiHotspot {
	interface RequestDataList extends HttpType.PageBaseParams {
		type?: number;
	}
	export interface ResList {
		address: string;
		name: string;
		audio: string;
	}
	export function list(data: RequestDataList) {
		return httpInstance.post<ResList>("/hotspot/findList", data);
	}
}
