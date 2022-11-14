<script setup lang="ts">
import DialogFootButton from "@/components/DialogFootButton/DialogFootButton.vue";
import { useApiConfirm, useBasicForm } from "@/hooks";
import { ApiSysUser } from "@/http/apis/sysUser";
import { Ref, ref } from "vue";
import { reactiveOmit, reactivePick } from "@vueuse/core";
import type { ElForm } from "element-plus";

const emits = defineEmits(["save"]);
const { apiLoading, apiConfirm } = useApiConfirm(ApiSysUser.modify);
const { dataForm, dialogVisible, showDialog, formRules } = useBasicForm<
	ApiSysUser.ReqModifyUser & { repeatPassword?: string }
>({
	id: {
		value: 0,
	},
	account: {
		value: "",
		rules: {
			required: true,
			message: "请输入账号",
		},
	},
	tel: {
		value: "",
		rules: {
			len: 11,
			message: "手机号不正确",
		},
	},
	state: {
		value: 0,
	},
	realName: {
		value: "",
		rules: {
			required: true,
			message: "请输入真实姓名",
		},
	},
	password: {
		value: "",
		rules: {
			required: true,
			min: 6,
			max: 13,
			validator(rule, val, cb) {
				if (dataForm.id !== 0) return cb();
				if (val.length < 6) return cb("最小长度为 6");
				if (val.length > 18) return cb("最大长度为 18");
				cb();
			},
		},
	},
	repeatPassword: {
		value: "",
		rules: {
			required: true,
			min: 6,
			max: 13,
			validator(rule, val, cb) {
				if (dataForm.id !== 0) return cb();
				if (val !== dataForm.password) return cb("密码不一致");
				cb();
			},
		},
	},
});
// 显示对话框
const show = (_data: ApiSysUser.ResUserItem | null = null) => {
	editFormRef.value?.resetFields();
	const data = _data === null ? null : reactivePick(_data, ["id", "tel", "account", "realName", "state"]);
	showDialog(data);
};

const editFormRef: Ref<null | InstanceType<typeof ElForm>> = ref(null);
// 确认保存
const confirmSave = () => {
	editFormRef.value?.validate((valid) => {
		if (!valid) return;
		const data =
			dataForm.id === 0
				? reactiveOmit(dataForm, ["id", "repeatPassword"])
				: reactiveOmit(dataForm, ["password", "repeatPassword"]);
		apiConfirm(data).then(() => {
			dialogVisible.value = false;
			emits("save");
		});
	});
};
defineExpose({
	show,
});
</script>
<template>
	<el-dialog title="编辑用户" v-model="dialogVisible">
		<el-form ref="editFormRef" :model="dataForm" :rules="formRules" label-width="100">
			<el-form-item prop="account" label="账号">
				<el-input v-model="dataForm.account"></el-input>
			</el-form-item>
			<template v-if="dataForm.id === 0">
				<el-form-item prop="password" label="密码">
					<el-input show-password v-model="dataForm.password" autocomplete="new-password" maxlength="18"></el-input>
				</el-form-item>
				<el-form-item prop="repeatPassword" label="确认密码">
					<el-input show-password v-model="dataForm.repeatPassword" maxlength="18"></el-input>
				</el-form-item>
			</template>
			<el-form-item prop="realName" label="真实姓名">
				<el-input v-model="dataForm.realName"></el-input>
			</el-form-item>
			<el-form-item prop="tel" label="手机号">
				<el-input v-model="dataForm.tel" minlength="11" maxlength="11"></el-input>
			</el-form-item>
			<el-form-item prop="state" label="用户状态">
				<el-switch v-model="dataForm.state" :active-value="1" :inactive-value="0"></el-switch>
			</el-form-item>
		</el-form>
		<template #footer>
			<DialogFootButton :loading="apiLoading" @cancel="dialogVisible = false" @confirm="confirmSave"></DialogFootButton>
		</template>
	</el-dialog>
</template>
<style scoped lang="scss"></style>
