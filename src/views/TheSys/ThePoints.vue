<script setup lang="tsx">
import ATableBasicButtonVue from "@/components/ATableBasicButton/ATableBasicButton.vue";
import { useApiConfirm, useBasicForm, useBasicRef, useStrArr } from "@/hooks";
import { ApiPoi } from "@/http/apis/poi";
import { ApiScenic } from "@/http/apis/scenic";
import { ATableType } from "@/types/aTable";
import { reactiveOmit } from "@vueuse/core";
import { ref, Ref, toRefs } from "vue";
import PointsPicDialog from "./components/PointsPicDialog.vue";

const { mapRef, formRef, tableRef } = useBasicRef();
const slideRef: Ref<null | typeof PointsPicDialog> = ref(null);
const scenicList: Ref<ApiScenic.ResScenicInitItem[]> = ref([]);
ApiScenic.listInit().then((res) => (scenicList.value = res.data));

const { apiConfirm: delApiConfirm } = useApiConfirm(ApiPoi.del, () => tableRef.value?.fetchTableData());
const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm<ApiPoi.ReqPoiModify>({
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
			message: "请输入景点名称",
		},
	},
	pic: {
		value: "",
		rules: {
			message: "请上传封面图",
		},
	},
	address: {
		value: "",
		rules: {
			message: "请输入地址",
		},
	},
	latitude: {
		value: 0,
		rules: {
			message: "请输入纬度",
		},
	},
	longitude: {
		value: 0,
		rules: {
			message: "请输入经度",
		},
	},
	audio: {
		value: "",
	},
	tag: {
		value: "",
	},
	sort: {
		value: 50,
	},
	phone: {
		value: "",
	},
	maxZoom: {
		value: 18,
	},
	minZoom: {
		value: 10,
	},
	showZoom: {
		value: 10,
	},
	pointInfo: {
		value: "",
	},
});
const tableRequestConfig: ATableType.TableRequestConfig = {
	requestApi: ApiPoi.list,
	isPage: true,
};
const columns: ATableType.Column<ApiPoi.ResPoiItem>[] = [
	{
		columnAttrs: {
			prop: "id",
			label: "ID",
			width: 80,
		},
	},
	{
		columnAttrs: {
			prop: "pic",
			label: "封面图",
			width: 150,
		},
		type: "image",
	},
	{
		columnAttrs: {
			prop: "name",
			label: "景点名称",
			minWidth: 200,
			showOverflowTooltip: true,
		},
		search: {
			type: "input",
		},
	},
	{
		columnAttrs: {
			prop: "latitude",
			label: "经纬度",
			minWidth: 144,
		},
		renderColumn({ row }) {
			return (
				<div class="flex flex-col">
					<el-tag>经度：{row.longitude}</el-tag>
					<el-tag type="warning" class="mt-1">
						纬度：{row.latitude}
					</el-tag>
				</div>
			);
		},
	},
	{
		columnAttrs: {
			prop: "minZoom",
			label: "显示级别",
			width: 300,
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
			prop: "phone",
			label: "服务热线",
			width: 130,
		},
		renderColumn({ row }) {
			return <div>{row.phone || <el-tag type="info">暂无服务热线</el-tag>}</div>;
		},
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
			width: 280,
			fixed: "right",
		},
		renderColumn({ row }) {
			return (
				<ATableBasicButtonVue onDelete={() => delApiConfirm(row.id, "删除")} onEdit={() => showDialog(row)}>
					{{
						before: () => (
							<el-button type="warning" link icon="Picture" onClick={() => slideRef.value?.show(row.id)}>
								图集
							</el-button>
						),
					}}
				</ATableBasicButtonVue>
			);
		},
	},
];

// 标签相关操作
const { addStr, removeStr, strArrList } = useStrArr(toRefs(dataForm).tag);
const tagInputValue = ref("");
const tagInputVisible = ref(false);
const handleAddTag = () => {
	if (tagInputValue.value) {
		addStr(tagInputValue.value);
	}
	tagInputVisible.value = false;
	tagInputValue.value = "";
};
const handleRemoveTag = (tag: string) => {
	removeStr(tag);
};
// 选择经纬度
const handlePositionSelect = (position: number[]) => {
	const [lng, lat] = position;
	dataForm.longitude = lng;
	dataForm.latitude = lat;
};
const { apiConfirm: modifyApiConfirm, apiLoading: modifyApiLoading } = useApiConfirm(ApiPoi.modify, () => {
	dialogVisible.value = false;
	tableRef.value?.fetchTableData();
});
// 确认编辑点位
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
				<el-button type="primary" icon="Plus" @click="showDialog(null)">增加景点</el-button>
			</template>
		</ATablePro>
		<el-dialog :title="dataForm.id === 0 ? '新增' : '编辑'" v-model="dialogVisible">
			<el-form ref="formRef" :model="dataForm" :rules="formRules" label-width="100">
				<el-tabs tab-position="left">
					<el-tab-pane label="基本信息"
						><el-form-item label="所属景区" prop="scenicId">
							<el-select v-model="dataForm.scenicId" placeholder="请选择">
								<el-option v-for="item in scenicList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="name" label="景点名称">
							<el-input v-model="dataForm.name" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="标签" prop="label">
							<el-tag
								v-for="tag in strArrList"
								:key="tag"
								class="mx-1"
								closable
								:disable-transitions="false"
								@close="handleRemoveTag(tag)"
							>
								{{ tag }}
							</el-tag>
							<el-input
								v-if="tagInputVisible"
								ref="InputRef"
								v-model="tagInputValue"
								class="ml-1 w-20"
								@keyup.enter="handleAddTag"
								@blur="handleAddTag"
							/>
							<el-button v-else class="button-new-tag ml-1" @click="tagInputVisible = true" icon="Plus">
								添加标签
							</el-button>
						</el-form-item>
						<el-form-item label="封面图" prop="pic">
							<APicSelect v-model="dataForm.pic"></APicSelect>
						</el-form-item>
						<el-form-item label="音频" prop="audio">
							<AAudioSelect v-model="dataForm.audio"></AAudioSelect>
						</el-form-item>
						<el-form-item label="景点地址" prop="address">
							<el-input v-model="dataForm.address" placeholder="请输入"></el-input>
						</el-form-item>
						<div class="flex flex-wrap">
							<el-form-item label="经度" prop="longitude">
								<el-input v-model="dataForm.longitude" placeholder="请输入"></el-input>
							</el-form-item>
							<el-form-item label="纬度" prop="latitude">
								<el-input v-model="dataForm.latitude" placeholder="请输入"></el-input>
							</el-form-item>
							<el-button type="primary" icon="Location" class="ml-3" @click="mapRef?.show">获取经纬度</el-button>
						</div>
						<div class="flex flex-wrap">
							<el-form-item label="最小级别" prop="minZoom">
								<el-input-number v-model="dataForm.minZoom"></el-input-number>
							</el-form-item>
							<el-form-item label="最大级别" prop="maxZoom">
								<el-input-number v-model="dataForm.maxZoom"></el-input-number>
							</el-form-item>
							<el-form-item label="默认级别" prop="showZoom">
								<el-input-number v-model="dataForm.showZoom"></el-input-number>
							</el-form-item>
						</div>
						<el-form-item label="服务热线" prop="phone">
							<el-input v-model="dataForm.phone" placeholder="请输入"></el-input> </el-form-item
					></el-tab-pane>
					<el-tab-pane label="图文详情"
						><el-form-item label-width="0" prop="pointInfo">
							<WangEditor v-model="dataForm.pointInfo"></WangEditor> </el-form-item
					></el-tab-pane>
				</el-tabs>
			</el-form>
			<template #footer>
				<DialogFootButton
					:loading="modifyApiLoading"
					@cancel="dialogVisible = false"
					@confirm="handleConfirm"
				></DialogFootButton>
			</template>
		</el-dialog>
		<MapSelectPoint ref="mapRef" @select="handlePositionSelect"></MapSelectPoint>
		<PointsPicDialog ref="slideRef"></PointsPicDialog>
	</div>
</template>
<style scoped lang="scss"></style>
