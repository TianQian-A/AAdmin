import { objectPick } from "@vueuse/core";
import { FormItemRule, FormRules } from "element-plus";
import { has } from "lodash-es";
import { reactive, ref } from "vue";

export type DataFormTemplate<T> = {
	[P in keyof T]: {
		value: T[P];
		rules?: FormItemRule;
	};
};
/**
 * 基本的表单操作 hook
 * @param dataFormTemplate 默认的表单数据
 */
export const useBasicForm = <T extends Record<string, any>>(dataFormTemplate: DataFormTemplate<T>) => {
	// 操作框是否展示
	const dialogVisible = ref(false);
	// 默认的表单数据，可用于重置表单
	const defaultDataForm = {} as T;
	// 表单的规则
	const formRules: FormRules = {};
	// 处理 dataFormTemplate，初始化表单数据以及规则
	for (const key in dataFormTemplate) {
		if (has(dataFormTemplate, key)) {
			const element = dataFormTemplate[key];
			defaultDataForm[key] = element.value;
			if (element.rules) formRules[key] = element.rules;
		}
	}
	// 实时变化的表单数据
	const dataForm = reactive(Object.assign({}, defaultDataForm));
	/**
	 * 展示编辑或新增对话框
	 * @param _DataForm 展示对话框时需要重新覆盖的表单数据，如果为 null 使用默认的表单数据
	 */
	const showDialog = (_DataForm: Partial<T> | null = null) => {
		const mergeData = _DataForm === null ? defaultDataForm : objectPick(_DataForm, Object.keys(defaultDataForm));
		Object.assign(dataForm, mergeData);
		dialogVisible.value = true;
	};
	return {
		dataForm,
		dialogVisible,
		showDialog,
		formRules,
	};
};
