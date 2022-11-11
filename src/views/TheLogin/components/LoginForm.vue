<script setup lang="ts">
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElForm as ElFormType } from "element-plus/es/components/form";

const emit = defineEmits(["submit"]);
const loginFormRef = ref<InstanceType<typeof ElFormType> | null>(null);
// 表单数据
const loginFormPassword = reactive({
	account: "",
	password: "",
});
// 表单验证
const loginRulesPassword = {
	account: { required: true, message: "请输入账号" },
	password: { required: true, message: "请输入密码" },
};
const submit = () => {
	loginFormRef.value?.validate((valid) => {
		if (!valid) return;
		emit("submit", loginFormPassword);
	});
};
</script>
<template>
	<el-form ref="loginFormRef" :model="loginRulesPassword" :rules="loginRulesPassword">
		<el-form-item prop="username">
			<el-input v-model="loginFormPassword.account" placeholder="输入账号" :prefix-icon="User" />
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model="loginFormPassword.password"
				type="password"
				show-password
				placeholder="输入密码"
				:prefix-icon="Lock"
			/>
		</el-form-item>
		<el-button class="w-full" type="primary" round @click="submit">立即登录</el-button>
	</el-form>
</template>
<style lang="scss" scoped></style>
