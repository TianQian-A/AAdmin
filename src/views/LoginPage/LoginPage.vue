<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm as ElFormType } from "element-plus";
import { User,  Lock } from "@element-plus/icons-vue";

// 表单验证相关
const loginFormRef = ref<InstanceType<typeof ElFormType> | null>(null);
const loginRules = reactive({
	username: { required: true, message: "请输入账号" },
	password: { required: true, message: "请输入密码" }
});
// 表单数据
const loginForm = reactive({
	username: "",
	password: "",
});
// 提交表单
const submitLoginForm = () => {
	loginFormRef.value?.validate((valid) => {
		if (!valid) return;
	});
};
</script>
<template>
	<el-config-provider size="large">
		<div class="login-bg">
			<div class="h-[55px] w-[100px] bg-[url(../../assets/images/403.svg)]"></div>
			<div class="login-form-card">
				<div class="login-form-card__title">欢迎使用，<br>商家管理后台</div>
				<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
					<el-form-item prop="username">
						<el-input
							v-model="loginForm.username"
							placeholder="输入账号"
							:prefix-icon="User"
						/>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							@keyup.enter="submitLoginForm"
							type="password" show-password
							placeholder="输入密码"
							:prefix-icon="Lock"
						/>
					</el-form-item>
				</el-form>
				<el-button type="primary" round @click="submitLoginForm">立即登录</el-button>
				<div class="flex-center-between text-sm mt-6">
					<div>没有账号？去<span class="login-form-card__link">注册</span></div>
					<span class="login-form-card__link">忘记密码？</span>
				</div>
			</div>
		</div>
	</el-config-provider>
</template>
<style lang="scss" scoped>
.login-bg {
	@apply w-screen h-screen px-8;
	@apply flex items-center justify-around;
	@apply bg-[url(/src/assets/images/login_bg.png)] bg-cover bg-center;
}
.login-form-card {
	@apply w-[460px] h-[500px] px-14 -mt-8;
	@apply backdrop-blur-md backdrop-filter bg-white bg-opacity-70;
	@apply rounded-lg shadow-2xl;
	@apply flex flex-col justify-center shrink-0;
	.login-form-card__title {
		@apply text-3xl font-bold text-sky-700;
		@apply mb-12;
	}
	.login-form-card__link {
		@apply text-sky-700 hover:opacity-70 cursor-pointer;
	}
}
.el-input :deep(.el-input__wrapper) {
	border-radius: 30px;
}
</style>
