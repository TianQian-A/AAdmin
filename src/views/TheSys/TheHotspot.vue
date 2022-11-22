<script setup lang="tsx">
import ATableBasicButton from "@/components/ATableBasicButton/ATableBasicButton.vue";
import type ATablePro from "@/components/ATablePro/ATablePro.vue";
import type MapSelectPoint from "@/components/TheMap/components/MapSelectPoint.vue";
import { useApiConfirm, useBasicForm } from "@/hooks";
import { ApiScenic } from "@/http/apis/scenic";
import { ATableType } from "@/types/aTable";
import { reactiveOmit } from "@vueuse/core";
import type { ElForm } from "element-plus";
import { Ref, ref } from "vue";

const mapSelectPointRef: Ref<null | InstanceType<typeof MapSelectPoint>> = ref(null);
const aTableRef: Ref<null | InstanceType<typeof ATablePro>> = ref(null);
const editFormRef: Ref<null | InstanceType<typeof ElForm>> = ref(null);

// const { apiConfirm: delApiConfirm } = useApiConfirm(ApiScenic.del);
const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm<ApiScenic.ReqScenicModify>({
	id: {
		value: 0,
	},
	name: {
		value: "",
		rules: {
			required: true,
			message: "请输入名称",
		},
	},
	address: {
		value: "",
		rules: {
			required: true,
			message: "请输入地址",
		},
	},
	latitude: {
		value: "",
		rules: {
			required: true,
			message: "请输入纬度",
		},
	},

	longitude: {
		value: "",
		rules: {
			required: true,
			message: "请输入经度",
		},
	},
	minZoom: {
		value: 11,
		rules: {
			required: true,
			validator(rule, value, cb) {
				if (value > dataForm.maxZoom) return cb("不能大于最大级别");
				cb();
			},
		},
	},
	maxZoom: {
		value: 14,
		rules: {
			required: true,
			validator(rule, value, cb) {
				if (value < dataForm.minZoom) return cb("不能小于最小级别");
				cb();
			},
		},
	},
	showZoom: {
		value: 12,
		rules: {
			required: true,
			validator(rule, value, cb) {
				if (value < dataForm.minZoom) return cb("不能小于最小级别");
				if (value > dataForm.maxZoom) return cb("不能大于最大级别");
				cb();
			},
		},
	},
});
const tableRequestConfig: ATableType.TableRequestConfig = {
	requestApi: ApiScenic.list,
	isPage: true,
};
const columns: ATableType.Column<ApiScenic.ResScenicItem>[] = [
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
			label: "景区名称",
		},
	},
	{
		columnAttrs: {
			prop: "address",
			label: "景区地址",
		},
	},
	{
		columnAttrs: {
			prop: "minZoom",
			label: "显示级别",
		},
		renderColumn({ row }) {
			return (
				<div>
					<el-tag>默认：{row.showZoom}</el-tag>
					<el-tag type="warning" class="mx-1">
						最小：{row.minZoom}
					</el-tag>
					<el-tag type="danger">最大：{row.maxZoom}</el-tag>
				</div>
			);
		},
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
		},
		renderColumn({ row }) {
			return <ATableBasicButton buttonList={["edit"]} onEdit={() => showDialog(row)}></ATableBasicButton>;
		},
	},
];
const onSelectPoint = (data: number[]) => {
	const [lnt, lat] = data;
	dataForm.latitude = lat;
	dataForm.longitude = lnt;
};
const { apiConfirm: modifyApiConfirm, apiLoading: modifyApiLoading } = useApiConfirm(ApiScenic.modify);
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
				<!-- <el-button type="primary" icon="Plus" @click="showDialog(null)">添加景区</el-button> -->
			</template>
		</ATablePro>
		<el-dialog :title="dataForm.id === 0 ? '新增' : '编辑'" v-model="dialogVisible">
			<el-form ref="editFormRef" :model="dataForm" :rules="formRules" label-width="110">
				<el-form-item prop="name" label="景区名称">
					<el-input v-model="dataForm.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item prop="address" label="景区地址">
					<el-input v-model="dataForm.address" placeholder="请输入"></el-input>
				</el-form-item>
				<div class="flex">
					<el-form-item prop="longitude" label="经度">
						<el-input v-model="dataForm.longitude" placeholder="请输入或选择"></el-input>
					</el-form-item>
					<el-form-item prop="latitude" label="纬度">
						<el-input v-model="dataForm.latitude" placeholder="请输入或选择"></el-input>
					</el-form-item>
					<el-button class="ml-4" type="primary" @click="mapSelectPointRef?.show" icon="Position">获取经纬度</el-button>
				</div>
				<el-form-item prop="showZoom" label="默认显示级别">
					<el-input-number v-model="dataForm.showZoom" :min="5" :max="20"></el-input-number>
				</el-form-item>
				<el-form-item prop="minZoom" label="最小显示级别">
					<el-input-number v-model="dataForm.minZoom" :min="5" :max="20"></el-input-number>
				</el-form-item>
				<el-form-item prop="maxZoom" label="最大显示级别">
					<el-input-number v-model="dataForm.maxZoom" :min="5" :max="20"></el-input-number>
				</el-form-item>
			</el-form>
			<template #footer>
				<DialogFootButton
					@cancel="dialogVisible = false"
					:loading="modifyApiLoading"
					@confirm="handleConfirm"
				></DialogFootButton>
			</template>
		</el-dialog>
		<MapSelectPoint ref="mapSelectPointRef" @select="onSelectPoint"></MapSelectPoint>
	</div>
</template>
<style scoped lang="scss"></style>
