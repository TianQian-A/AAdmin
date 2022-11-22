<script setup lang="tsx">
import { useApiConfirm, useBasicForm, useBasicRef } from "@/hooks";
import { ATableType } from "@/types/aTable";
import { ApiLines } from "@/http/apis/lines";
import dayjs from "dayjs";
import ATableBasicButtonVue from "@/components/ATableBasicButton/ATableBasicButton.vue";
import { Ref, ref } from "vue";
import { ApiScenic } from "@/http/apis/scenic";
import { reactiveOmit } from "@vueuse/core";
import type MapSelectLine from "@/components/TheMap/components/MapSelectLine.vue";

const selectLineRef: Ref<null | InstanceType<typeof MapSelectLine>> = ref(null);
const { tableRef, formRef } = useBasicRef(["tableRef", "formRef"]);
const { apiConfirm: delApiConfirm } = useApiConfirm(ApiLines.del, () => tableRef.value?.fetchTableData());
const { apiConfirm: modifyApiConfirm, apiLoading: modifyApiLoading } = useApiConfirm(ApiLines.modify, () => {
	dialogVisible.value = false;
	tableRef.value?.fetchTableData();
});
const scenicList: Ref<ApiScenic.ResScenicInitItem[]> = ref([]);
ApiScenic.listInit().then((res) => (scenicList.value = res.data));

const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm<ApiLines.ReqLineModify>({
	id: {
		value: 0,
	},
	scenicId: {
		value: "",
		rules: {
			message: "请选择景区",
		},
	},
	name: {
		value: "",
		rules: {
			message: "请输入路线名称",
		},
	},
	sort: {
		value: 50,
	},
	duration: {
		value: "",
		rules: {
			message: "请输入预计游玩时间",
		},
	},
	cover: {
		value: "",
		rules: {
			message: "请上传封面",
		},
	},
});

const tableRequestConfig: ATableType.TableRequestConfig = {
	requestApi: ApiLines.list,
	isPage: true,
};
const columns: ATableType.Column<ApiLines.ResLineItem>[] = [
	{
		columnAttrs: {
			prop: "id",
			label: "ID",
			width: 80,
		},
	},
	{
		columnAttrs: {
			prop: "cover",
			label: "封面图",
			width: 150,
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "name",
			label: "线路名称",
			minWidth: 150,
			showOverflowTooltip: true,
		},
	},
	{
		columnAttrs: {
			prop: "pointNum",
			label: "点位数量",
			width: 100,
		},
		renderColumn({ row }) {
			return row.pointNum ? <span>{row.pointNum}</span> : <el-tag type="warning">暂无点位</el-tag>;
		},
	},
	{
		columnAttrs: {
			prop: "duration",
			label: "预计游玩时间",
			width: 120,
		},
	},
	{
		columnAttrs: {
			prop: "sort",
			label: "排序",
			width: 100,
		},
	},
	{
		columnAttrs: {
			prop: "createDate",
			label: "创建时间",
			width: 200,
		},
		renderColumn(scope) {
			return <span>{dayjs(scope.row.createDate).format("YYYY-MM-DD HH:mm:ss")}</span>;
		},
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
			width: 250,
			fixed: "right",
		},
		renderColumn({ row }) {
			return (
				<ATableBasicButtonVue onDelete={() => delApiConfirm(row.id, "删除")} onEdit={() => showDialog(row)}>
					{{
						before: () => (
							<el-button type="warning" link icon="Place" onClick={() => selectLineRef.value?.show(row.id)}>
								点位
							</el-button>
						),
					}}
				</ATableBasicButtonVue>
			);
		},
	},
];

const handleConfirm = () => {
	formRef.value?.validate((valid) => {
		if (!valid) return;
		const data = dataForm.id === 0 ? reactiveOmit(dataForm, "id") : dataForm;
		modifyApiConfirm(data);
	});
};
</script>
<template>
	<div class="h-full">
		<ATablePro ref="tableRef" :request-config="tableRequestConfig" :columns="columns">
			<template #head>
				<el-button type="primary" icon="Plus" @click="showDialog(null)">添加线路</el-button>
			</template>
		</ATablePro>
		<el-dialog :title="dataForm.id === 0 ? '新增' : '编辑'" v-model="dialogVisible">
			<el-form ref="formRef" :model="dataForm" :rules="formRules" label-width="100">
				<el-form-item label="所属景区" prop="scenicId">
					<el-select v-model="dataForm.scenicId" placeholder="请选择">
						<el-option v-for="item in scenicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="线路名称" prop="name">
					<el-input v-model="dataForm.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="封面图" prop="cover">
					<APicSelect v-model="dataForm.cover"></APicSelect>
				</el-form-item>
				<el-form-item label="建议游玩时间" prop="duration">
					<el-input v-model="dataForm.duration" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="dataForm.sort" placeholder="请输入"></el-input-number>
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
		<MapSelectLine ref="selectLineRef"></MapSelectLine>
	</div>
</template>
<style scoped lang="scss"></style>
