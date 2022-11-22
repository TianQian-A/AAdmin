import { httpInstance } from "..";
import { HttpType } from "../type/httpType";

export namespace ApiFile {
	export const upload: HttpType.ApiRequest<FormData, null> = (data) => {
		return httpInstance.post("/file/upload", data);
	};
	export const createFormData = (fileList: File[], fileName: string = "MultipartFile") => {
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append(fileName, file);
		});
		return formData;
	};
}
