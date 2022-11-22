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
 * 字符串数字回显
 * @param strArr 字符串数组
 * @param separate 分隔符
 * @returns {String[]}
 */
export const strArrReplay = (strArr: string, separate = ",") => {
	return strArr.split(separate).filter((item) => !!item);
};
/**
 * 字符串数组添加
 * @param strArr 字符串数组
 * @param value 添加的字符串
 * @param seperate 分隔符
 * @returns {String}
 */
export const strArrAdd = (strArr: string, value: string, seperate = ",") => {
	console.log("~~~", strArr, value, strArrReplay(strArr, seperate).concat([value]));

	return strArrReplay(strArr, seperate).concat([value]).join(seperate);
};
/**
 * 字符串数组删除
 * @param strArr 字符串数组
 * @param value 删除的字符串
 * @param seperate 分隔符
 * @returns {String}
 */
export const strArrRemove = (strArr: string, value: string, seperate = ",") => {
	return strArrReplay(strArr, seperate)
		.filter((item) => item !== value)
		.join(seperate);
};
