<script setup lang="tsx">
import ATableBasicButton from "@/components/ATableBasicButton/ATableBasicButton.vue";
import { ApiRole } from "@/http/apis/role";
import { ATableType } from "@/types/aTable";
import { useBasicForm, useApiConfirm } from "@/hooks";
import { Ref, ref } from "vue";
import type ATablePro from "@/components/ATablePro/ATablePro.vue";
import type { ElForm } from "element-plus";
import { reactiveOmit } from "@vueuse/core";
import RoleMenuEditDrawer from "./components/RoleMenuEditDrawer.vue";

// 表格
const tableRef: Ref<null | InstanceType<typeof ATablePro>> = ref(null);
const tableRequestConfig: ATableType.TableRequestConfig<typeof ApiRole.list> = {
	requestApi: ApiRole.list,
	isPage: true,
	dataHook(_res) {
		return Object.assign(_res, { data: _res.data.roleList });
	},
};

// 删除角色请求
const { apiConfirm: delApiConfirm } = useApiConfirm(ApiRole.del, () => tableRef.value?.fetchTableData());
// 增加或编辑角色请求
const { apiConfirm: modifyApiConfirm, apiLoading: modifyApiLoading } = useApiConfirm(ApiRole.modify);
// 角色增删表单数据
const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm<ApiRole.ReqRoleItem>({
	id: {
		value: 0,
	},
	roleCode: {
		value: "",
		rules: {
			required: true,
			message: "请输入角色编码",
		},
	},
	roleName: {
		value: "",
		rules: {
			required: true,
			message: "请输入角色名称",
		},
	},
	des: {
		value: "",
		rules: {
			required: true,
			message: "请输入角色描述",
		},
	},
});
const roleEditForm: Ref<null | InstanceType<typeof ElForm>> = ref(null);
const confirmSave = () => {
	roleEditForm.value?.validate((valid) => {
		if (!valid) return;
		const data = dataForm.id === 0 ? reactiveOmit(dataForm, "id") : dataForm;
		modifyApiConfirm(data)
			.then(() => {
				dialogVisible.value = false;
				tableRef.value?.fetchTableData();
			})
			.finally(() => {
				roleEditForm.value?.resetFields();
			});
	});
};
// 分配角色弹窗
const roleMenuDrawerRef: Ref<null | InstanceType<typeof RoleMenuEditDrawer>> = ref(null);
// 表格列
const columns: ATableType.Column<ApiRole.ResRoleItem>[] = [
	{
		columnAttrs: {
			prop: "id",
			label: "ID",
			width: 80,
		},
	},
	{
		columnAttrs: {
			prop: "roleName",
			label: "角色",
		},
	},
	{
		columnAttrs: {
			prop: "roleCode",
			label: "角色编码",
		},
	},
	{
		columnAttrs: {
			prop: "des",
			label: "角色描述",
		},
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
			fixed: "right",
		},
		renderColumn({ row }) {
			return (
				<ATableBasicButton
					onDelete={() => delApiConfirm(row.id, "删除")}
					onEdit={() => {
						showDialog(row);
					}}
				>
					{{
						after: () => (
							<el-button type="warning" link icon="Setting" onClick={() => roleMenuDrawerRef.value?.show(row.id)}>
								分配权限
							</el-button>
						),
					}}
				</ATableBasicButton>
			);
		},
	},
];
</script>
<template>
	<div class="h-full">
		<ATablePro ref="tableRef" :request-config="tableRequestConfig" :columns="columns">
			<template #head>
				<el-button type="primary" @click="showDialog(null)">增加角色</el-button>
			</template>
		</ATablePro>
		<el-dialog :title="`${dataForm.id === 0 ? '新增' : '编辑'}`" v-model="dialogVisible">
			<el-form ref="roleEditForm" :model="dataForm" :rules="formRules" label-width="100">
				<el-form-item prop="roleName" label="角色名称">
					<el-input v-model="dataForm.roleName" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item prop="roleCode" label="角色编码">
					<el-input v-model="dataForm.roleCode" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item prop="des" label="角色描述">
					<el-input v-model="dataForm.des" placeholder="请输入"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<DialogFootButton
					@cancel="dialogVisible = false"
					@confirm="confirmSave"
					:loading="modifyApiLoading"
				></DialogFootButton>
			</template>
		</el-dialog>
		<RoleMenuEditDrawer ref="roleMenuDrawerRef" @save="tableRef?.fetchTableData"></RoleMenuEditDrawer>
	</div>
</template>
<style scoped lang="scss"></style>
