<script setup lang="tsx">
import { ApiSysUser } from "@/http/apis/sysUser";
import { ATableType } from "@/types/aTable";
import { Ref, ref } from "vue";
import type ATablePro from "@/components/ATablePro/ATablePro.vue";
import UserRoleDialog from "./components/UserRoleDialog.vue";
import { useApiConfirm } from "@/hooks";
import { reactiveOmit } from "@vueuse/core";
import UserEditDialog from "./components/UserEditDialog.vue";
import ATableBasicButtonVue from "@/components/ATableBasicButton/ATableBasicButton.vue";

const tableRef = ref<null | InstanceType<typeof ATablePro>>(null);
// 分配角色对话框
const roleRef: Ref<null | InstanceType<typeof UserRoleDialog>> = ref(null);
// 编辑用户对话框
const modifyRef: Ref<null | InstanceType<typeof UserEditDialog>> = ref(null);

const requestConfig: ATableType.TableRequestConfig<typeof ApiSysUser.list> = {
	requestApi: ApiSysUser.list,
	isPage: true,
};
// 删除用户请求 hook
const { apiConfirm: delApiConfirm } = useApiConfirm(ApiSysUser.del, () => tableRef.value?.fetchTableData());
const columns: ATableType.Column<ApiSysUser.ResUserItem>[] = [
	{
		columnAttrs: {
			prop: "id",
			label: "ID",
			width: 100,
		},
	},
	{
		columnAttrs: {
			prop: "realName",
			label: "真实姓名",
		},
	},
	{
		columnAttrs: {
			prop: "roleIds",
			label: "用户角色",
		},
	},
	{
		columnAttrs: {
			prop: "tel",
			label: "手机号",
		},
		renderColumn({ row }) {
			const hasTel = !!row.tel;
			const tagType = hasTel ? "" : "info";
			const text = hasTel ? row.tel : "暂无联系方式";
			return <el-tag type={tagType}>{text}</el-tag>;
		},
	},
	{
		columnAttrs: {
			prop: "state",
			label: "状态",
			width: 100,
		},
		renderColumn({ row }) {
			const stateChange = (state: 0 | 1) => {
				const data = reactiveOmit(row, ["roleIds", "email"]);
				data.state = state;
				ApiSysUser.modify(data).then(() => {
					tableRef.value?.fetchTableData();
				});
			};
			return <el-switch v-model={row.state} active-value={1} inactive-value={0} onChange={stateChange}></el-switch>;
		},
	},
	{
		columnAttrs: {
			prop: "operate",
			label: "操作",
			fixed: "right",
			width: 280,
		},
		renderColumn({ row }) {
			return (
				<ATableBasicButtonVue
					onDelete={() => delApiConfirm(row.id, "删除")}
					onEdit={() => {
						modifyRef.value?.show(row);
					}}
				>
					{{
						after: () => (
							<el-button type="warning" link icon="User" onClick={() => roleRef.value?.show(row)}>
								赋予角色
							</el-button>
						),
					}}
				</ATableBasicButtonVue>
			);
		},
	},
];
</script>
<template>
	<div class="h-full">
		<ATablePro ref="tableRef" :request-config="requestConfig" :columns="columns">
			<template #head>
				<ElButton type="primary" @click="modifyRef?.show(null)">添加用户</ElButton>
			</template>
		</ATablePro>
	</div>
	<UserRoleDialog ref="roleRef" @save-role="tableRef?.fetchTableData"></UserRoleDialog>
	<UserEditDialog ref="modifyRef" @save="tableRef?.fetchTableData"></UserEditDialog>
</template>
<style scoped lang="scss"></style>
