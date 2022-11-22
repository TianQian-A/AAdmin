<script setup lang="tsx">
import ATableBasicButtonVue from "@/components/ATableBasicButton/ATableBasicButton.vue";
import type ATablePro from "@/components/ATablePro/ATablePro.vue";
import { useApiConfirm, useBasicForm } from "@/hooks";
import { ApiPoiType } from "@/http/apis/poiType";
import { ATableType } from "@/types/aTable";
import { reactiveOmit } from "@vueuse/core";
import type { ElForm } from "element-plus";
import { onMounted, Ref, ref } from "vue";
onMounted(() => {
	console.log("~~mounted");
});
const aTableRef: Ref<null | InstanceType<typeof ATablePro>> = ref(null);
// 修改请求
const { apiConfirm: modifyApiConfirm, apiLoading: modifyApiLoading } = useApiConfirm(ApiPoiType.modify);
const { apiConfirm: delApiConfirm } = useApiConfirm(ApiPoiType.del, () => aTableRef.value?.fetchTableData());
// 表单数据
const { dataForm, showDialog, dialogVisible, formRules } = useBasicForm<ApiPoiType.ReqPoiTypeModify>({
	id: {
		value: 0,
	},
	name: {
		value: "",
		rules: {
			required: true,
			message: "请输入点位类型名称",
		},
	},
	listIcon: {
		value: "",
		rules: {
			required: true,
			message: "请上传列表图标",
		},
	},
	listSelectIcon: {
		value: "",
		rules: {
			required: true,
			message: "请上传列表选中图标",
		},
	},
	markIcon: {
		value: "",
		rules: {
			required: true,
			message: "请上传点位图标",
		},
	},
	markSelectIcon: {
		value: "",
		rules: {
			required: true,
			message: "请上传点位选中图标",
		},
	},
});
const tableRequestConfig: ATableType.TableRequestConfig<typeof ApiPoiType.list> = {
	requestApi: ApiPoiType.list,
	isPage: true,
};
const columns: ATableType.Column<ApiPoiType.ResPoiTypeItem>[] = [
	{
		columnAttrs: {
			prop: "id",
			label: "ID",
			width: 80,
		},
	},
	{
		columnAttrs: {
			prop: "name",
			label: "点位类型名称",
		},
	},
	{
		columnAttrs: {
			prop: "listIcon",
			label: "列表图标",
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "listSelectIcon",
			label: "列表选中图标",
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "markIcon",
			label: "点位图标",
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "markSelectIcon",
			label: "点位选中图标",
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "hasContent",
			label: "是否有内容",
		},
		type: "tag",
		enums: [
			{ label: "有", value: 1 },
			{ label: "无", value: 0, tagType: "info" },
		],
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
			width: 200,
			fixed: "right",
		},
		renderColumn({ row }) {
			return (
				<ATableBasicButtonVue
					onEdit={() => showDialog(row)}
					onDelete={() => delApiConfirm(row.id, "删除")}
				></ATableBasicButtonVue>
			);
		},
	},
];

// form 的实例
const editFormRef: Ref<null | InstanceType<typeof ElForm>> = ref(null);
// 确认提交
const handleConfirm = () => {
	editFormRef.value?.validate((valid) => {
		if (!valid) return;
		const data = dataForm.id === 0 ? reactiveOmit(dataForm, "id") : dataForm;
		modifyApiConfirm(data).then(() => {
			dialogVisible.value = false;
			aTableRef.value?.fetchTableData();
		});
	});
};
</script>
<template>
	<div class="h-full">
		<ATablePro ref="aTableRef" :request-config="tableRequestConfig" :columns="columns">
			<template #head>
				<el-button type="primary" icon="Plus" @click="showDialog(null)">添加点位类型</el-button>
			</template>
		</ATablePro>
		<el-dialog :title="dataForm.id === 0 ? '新增' : '编辑'" v-model="dialogVisible">
			<el-form ref="editFormRef" :model="dataForm" :rules="formRules" label-width="130">
				<el-form-item prop="name" label="点位类型名称">
					<el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="10">
						<el-form-item prop="listIcon" label="列表图标">
							<APicSelect v-model="dataForm.listIcon"></APicSelect>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="listSelectIcon" label="列表选中图标">
							<APicSelect v-model="dataForm.listSelectIcon"></APicSelect>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item prop="markIcon" label="点位图标">
							<APicSelect v-model="dataForm.markIcon"></APicSelect>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item prop="markSelectIcon" label="点位选中图标">
							<APicSelect v-model="dataForm.markSelectIcon"></APicSelect>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item prop="hasContent" label="是否有内容">
					<el-switch v-model="dataForm.hasContent" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-form>
			<template #footer>
				<DialogFootButton
					:loading="modifyApiLoading"
					@cancel="dialogVisible = false"
					@confirm="handleConfirm"
				></DialogFootButton>
			</template>
		</el-dialog>
	</div>
</template>
<style scoped lang="scss"></style>
