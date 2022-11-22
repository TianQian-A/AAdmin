import { strArrAdd, strArrRemove, strArrReplay } from "@/utils/util";
import { computed, ComputedRef, Ref } from "vue";

interface UseStrArrRes {
	readonly strArrList: ComputedRef<string[]>;
	addStr: (val: string) => void;
	removeStr: (val: string) => void;
}
export const useStrArr = (strArr: Ref<string>, seperate = ","): UseStrArrRes => {
	const strArrList = computed(() => strArrReplay(strArr.value, seperate));
	const addStr = (val: string) => {
		strArr.value = strArrAdd(strArr.value, val, seperate);
	};
	const removeStr = (val: string) => {
		strArr.value = strArrRemove(strArr.value, val, seperate);
	};
	return {
		strArrList,
		addStr,
		removeStr,
	};
};
