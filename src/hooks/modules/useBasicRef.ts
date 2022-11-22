import type { ElForm } from "element-plus";
import type MapSelectPoint from "@/components/TheMap/components/MapSelectPoint.vue";
import type ATablePro from "@/components/ATablePro/ATablePro.vue";
import type { defineComponent } from "vue";
import { Ref, ref } from "vue";

type RefValue<T extends ReturnType<typeof defineComponent>> = Ref<null | T>;
type BasicRefKey = "mapRef" | "tableRef" | "formRef";

const BasicRefValMap = {
	mapRef: ref(null) as RefValue<InstanceType<typeof MapSelectPoint>>,
	tableRef: ref(null) as RefValue<InstanceType<typeof ATablePro>>,
	formRef: ref(null) as RefValue<InstanceType<typeof ElForm>>,
};
export const useBasicRef = <T extends BasicRefKey[]>(refList?: T) => {
	if (!refList || !refList.length) refList = ["formRef", "mapRef", "tableRef"] as T;
	const obj = {} as Pick<typeof BasicRefValMap, T[number]>;
	refList.forEach((item) => (obj[item as T[number]] = BasicRefValMap[item]));
	return obj;
};
