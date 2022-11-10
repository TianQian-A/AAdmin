import { ATableType } from "@/types/aTable";
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
