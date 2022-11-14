<script setup lang="ts">
import { useBasicForm, useApiConfirm } from "@/hooks";
import { Ref, ref, onMounted, reactive } from "vue";
import { ApiRole } from "@/http/apis/role";
import { useStoreAuth } from "@/pinia/modules/auth";
import { ApiSysUser } from "@/http/apis/sysUser";

const emits = defineEmits(["saveRole"]);
const authStore = useStoreAuth();

// 角色信息
const roleList: Ref<ApiRole.ResRoleItem[]> = ref([]);
onMounted(() => {
	ApiRole.list({ pageSize: 0 }).then((res) => {
		roleList.value = res.data.roleList;
	});
});

// 表单数据
const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm({
	roleId: {
		value: "",
		rules: {
			required: true,
		},
	},
	userId: {
		value: 0,
	},
	operate_id: {
		value: authStore.userInfo.id,
	},
});
// 用户信息
const userInfo = reactive({
	id: 0,
	roleIds: "",
	realName: "",
	account: "",
});

// 展示对话框
const show = (_UserInfo: typeof userInfo) => {
	Object.assign(userInfo, _UserInfo);
	const roleId = _UserInfo.roleIds.split(":").filter((item) => !!item)[0] ?? "";
	showDialog({ roleId, userId: _UserInfo.id });
};
const { apiLoading, apiConfirm } = useApiConfirm(ApiSysUser.saveUserRole);
// 确认保存
const confirm = () => {
	apiConfirm(dataForm).then(() => {
		emits("saveRole");
		dialogVisible.value = false;
	});
};

defineExpose({
	show,
});
</script>
<template>
	<el-dialog title="分配角色" v-model="dialogVisible" destroy-on-close>
		<el-form :model="dataForm" :rules="formRules">
			<el-form-item label="当前用户姓名：">{{ userInfo.realName }}</el-form-item>
			<el-form-item label="当前用户账号：">{{ userInfo.account }}</el-form-item>
			<el-form-item label="当前用户角色：">{{ userInfo.roleIds }}</el-form-item>
			<el-form-item prop="roleId" label="分配新角色：">
				<el-select v-model="dataForm.roleId" placeholder="选择角色" no-match-text="123">
					<el-option
						v-for="item in roleList"
						:key="item.id"
						:label="item.roleName"
						:value="String(item.id)"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<DialogFootButton @cancel="dialogVisible = false" @confirm="confirm" :loading="apiLoading"></DialogFootButton>
		</template>
	</el-dialog>
</template>
<style scoped lang="scss"></style>
