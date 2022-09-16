export interface Result {
	code: number;
	msg: string;
	result: string;
	timestamp: typeof Date;
}
export interface ResultData<T = any> extends Result {
	data?: T;
}
