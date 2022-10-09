/**
 * 部分属性为必选
 */
export type CustomRequired<T, K extends keyof T> = {
	[P in K]-?: T[P];
} & Omit<T, K>
/**
 * 连字符转驼峰
 */
export type CamelCase<T extends string> = T extends `${infer stringA}-${infer stringB}` ? CamelCase<`${stringA}${Capitalize<stringB>}`> : T;
