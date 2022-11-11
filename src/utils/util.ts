import { ATableType } from "@/types/aTable";
import { ElMessage, ElMessageBox } from "element-plus";
/**
 * 树结构扁平化
 */
export const treeToArray = <T extends Record<string, any>, U extends string>(
	tree: T[],
	childKey: U,
	hookFunc?: (treeItem: T) => void
): Omit<T, U>[] => {
	return tree.reduce((acc: Omit<T, U>[], item) => {
		if (hookFunc) hookFunc(item);
		const { [childKey]: children, ...rest } = item;
		const nextList = children?.length ? treeToArray<T, U>(children, childKey, hookFunc) : [];
		return acc.concat([rest], nextList);
	}, []);
};

/**
 * 根据字典列表匹配字典值
 */
export const findEnum = (value: any, enums: ATableType.EnumItem[]): ATableType.EnumItem => {
	let res = {
		value,
		label: value,
	};
	if (enums?.length) {
		const item = enums.find((item) => item.value === value);
		if (item) res = item;
	}
	return res;
};

/**
 * 请求操作确认框
 */
export const handleApiConfirm = <T extends (data?: any) => Promise<any>>(
	api: T,
	data: any,
	confirmText = "操作"
): Promise<ReturnType<T>> => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(`确认${confirmText}吗`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
		})
			.then(() => {
				api(data)
					.then((res) => {
						ElMessage.success(`${confirmText}成功`);
						resolve(res);
					})
					.catch((err) => {
						ElMessage.error(err.msg);
						reject(err);
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
};
