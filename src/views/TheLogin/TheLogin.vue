<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { ElForm as ElFormType } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { ApiUser } from "@/http/apis/user";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useStoreAuth } from "@/pinia/modules/auth";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const router = useRouter();
const cookie = useCookies(["token"]);
const authStore = useStoreAuth();
const onLogin = ref(false);
// 表单验证相关
const loginFormRef = ref<InstanceType<typeof ElFormType> | null>(null);
const loginRules = reactive({
	account: { required: true, message: "请输入账号" },
	password: { required: true, message: "请输入密码" },
});
// 表单数据
const loginForm = reactive({
	account: "",
	password: "",
});
const getSuccessTitle = () => {
	dayjs.extend(isBetween);
	let now = dayjs();
	if (now.isBetween(now.hour(5), now.hour(10), "hour", "[]")) return "早上好 ⛅";
	else if (now.isBetween(now.hour(10), now.hour(14), "hour", "(]")) return "中午好 🌞";
	else if (now.isBetween(now.hour(14), now.hour(18), "hour", "(]")) return "下午好 🌞";
	else return "晚上好 🌛";
};
// 提交表单
const submitLoginForm = () => {
	loginFormRef.value?.validate((valid) => {
		if (!valid) return;
		onLogin.value = true;
		ApiUser.login(toRaw(loginForm)).then((res) => {
			cookie.set("token", res.data.access_token);
			authStore.setUserInfo(res.data);
			ElNotification.success({
				title: getSuccessTitle(),
				message: "欢迎使用实训系统",
			});
			router.replace({
				name: "home",
			});
		});
	});
};
</script>
<template>
	<ElConfigProvider size="large">
		<div class="login-bg">
			<div class="login-form-card">
				<div class="login-form-card__title">欢迎使用，<br /><span class="text-right">旅职院实训系统</span></div>
				<ElForm ref="loginFormRef" :model="loginForm" :rules="loginRules">
					<ElFormItem prop="username">
						<ElInput v-model="loginForm.account" placeholder="输入账号" :prefix-icon="User" />
					</ElFormItem>
					<ElFormItem prop="password">
						<ElInput
							v-model="loginForm.password"
							@keyup.enter="submitLoginForm"
							type="password"
							show-password
							placeholder="输入密码"
							:prefix-icon="Lock"
						/>
					</ElFormItem>
				</ElForm>
				<ElButton type="primary" round :loading="onLogin" @click="submitLoginForm">立即登录</ElButton>
				<!--				<div class="flex-center-between text-sm mt-6">-->
				<!--					<div>没有账号？去<span class="login-form-card__link">注册</span></div>-->
				<!--					<span class="login-form-card__link">忘记密码？</span>-->
				<!--				</div>-->
			</div>
		</div>
	</ElConfigProvider>
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
