<script setup lang="ts">
import { reactive, ref } from "vue";
import DialogFootButton from "@/components/DialogFootButton/DialogFootButton.vue";
import { Rules } from "async-validator";
import { ElForm } from "element-plus";
import { ApiUser } from "@/http/apis/user";
import { reactiveOmit } from "@vueuse/core";
import { useStoreAuth } from "@/pinia/modules/auth";
import { storeToRefs } from "pinia";
import { useApiConfirm } from "@/hooks";

const { userInfo } = storeToRefs(useStoreAuth());
const loading = ref(false);
const passwordDialogVisible = ref(false);
const show = () => {
	passwordDialogVisible.value = true;
};

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
/**
 * 表单数据
 */
const dataForm = reactive({
	oldPassword: "",
	newPassword: "",
	repeatPassword: "",
});
/**
 * 表单规则
 */
const rules: Rules = {
	oldPassword: {
		required: true,
		message: "请输入原密码",
	},
	newPassword: {
		required: true,
		message: "请输入新密码",
	},
	repeatPassword: {
		required: true,
		validator(rule, value, cb) {
			if (value !== dataForm.newPassword) return cb("两次密码输入不一致");
			cb();
		},
	},
};
const { apiLoading, apiConfirm } = useApiConfirm(ApiUser.changePassword);
/**
 * 确认修改密码
 */
const confirm = () => {
	formRef.value?.validate((valid) => {
		if (!valid) return;
		const data: ApiUser.ReqChangePassword = {
			...reactiveOmit(dataForm, "repeatPassword"),
			id: userInfo.value.id,
		};
		apiConfirm(data, "修改").then(() => {
			passwordDialogVisible.value = false;
		});
	});
};
defineExpose({
	show,
});
</script>
<template>
	<div v-loading="loading">
		<el-dialog title="修改密码" v-model="passwordDialogVisible">
			<el-form ref="formRef" :model="dataForm" :rules="rules" label-width="100px">
				<el-form-item prop="oldPassword" label="原密码">
					<el-input type="password" show-password v-model="dataForm.oldPassword" placeholder="原始密码"></el-input>
				</el-form-item>
				<el-form-item prop="newPassword" label="新密码">
					<el-input type="password" show-password v-model="dataForm.newPassword" placeholder="新密码"></el-input>
				</el-form-item>
				<el-form-item prop="repeatPassword" label="重复新密码">
					<el-input type="password" show-password v-model="dataForm.repeatPassword" placeholder="重复新密码"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<DialogFootButton
					@cancel="passwordDialogVisible = false"
					@confirm="confirm"
					:loading="apiLoading"
				></DialogFootButton>
			</template>
		</el-dialog>
	</div>
</template>
<style scoped lang="scss"></style>
