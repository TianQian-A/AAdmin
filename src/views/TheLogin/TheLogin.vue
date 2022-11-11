<script setup lang="ts">
import { ref, toRaw } from "vue";
import { ElConfigProvider, ElNotification } from "element-plus";
import { ApiUser } from "@/http/apis/user";
import { useStoreAuth } from "@/pinia/modules/auth";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import LoginForm from "@/views/TheLogin/components/LoginForm.vue";

const router = useRouter();
const authStore = useStoreAuth();
const onLogin = ref(false);
/**
 * 登录成功的提醒文案
 */
const getSuccessTitle = () => {
	dayjs.extend(isBetween);
	let now = dayjs();
	if (now.isBetween(now.hour(5), now.hour(10), "hour", "[]")) return "早上好 ⛅";
	else if (now.isBetween(now.hour(10), now.hour(14), "hour", "(]")) return "中午好 🌞";
	else if (now.isBetween(now.hour(14), now.hour(18), "hour", "(]")) return "下午好 🌞";
	else return "晚上好 🌛";
};
/**
 * 提交表单
 * @param loginForm 表单数据
 */
const submitLoginForm = (loginForm: ApiUser.RequestLoginPassword) => {
	onLogin.value = true;
	ApiUser.login(toRaw(loginForm)).then((res) => {
		authStore.login(res.data.access_token, res.data);
		ElNotification.success({
			title: getSuccessTitle(),
			message: "欢迎使用智慧导览系统",
		});
		router.replace({
			name: "home",
		});
	});
};
</script>
<template>
	<ElConfigProvider size="large">
		<div class="login-bg">
			<div class="login-form-card">
				<div class="login-form-card__title">
					欢迎使用，<br /><span class="text-right">金华民宿美食智慧导览系统</span>
				</div>
				<LoginForm @submit="submitLoginForm"></LoginForm>
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
		@apply text-3xl font-bold text-sky-700 whitespace-nowrap;
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
