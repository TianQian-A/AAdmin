<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { User, Lock, Phone, Message, Loading } from "@element-plus/icons-vue";
import { ApiUser } from "@/http/apis/user";

const emit = defineEmits(["submit"]);
const props = withDefaults(defineProps<{ loginType: "password" | "phone" }>(), {
	loginType: "password",
});

// 表单数据
const loginFormPassword = reactive({
	username: "",
	password: "",
	code: "",
});
const loginFormPhone = reactive({
	phone: "",
	code: "",
});
const loginCaptchaImage = ref("");
// 表单验证
const loginRulesBase = {
	code: { required: true, message: "请输入验证码" },
};
const loginRulesPassword = {
	account: { required: true, message: "请输入账号" },
	password: { required: true, message: "请输入密码" },
	...loginRulesBase,
};
const loginRulesPhone = {
	phone: { required: true, message: "请输入手机号" },
	...loginRulesBase,
};
const loginRules = computed(() => {
	if (props.loginType === "password") return loginRulesPassword;
	return loginRulesPhone;
});
// 图形码
const getCaptchaImage = () => {
	ApiUser.captchaImage().then((res) => {
		loginCaptchaImage.value = URL.createObjectURL(res as unknown as Blob);
	});
};
getCaptchaImage();
const submit = () => {
	emit("submit");
};
</script>
<template>
	<ElForm
		ref="loginFormRef"
		:model="loginType === 'password' ? loginFormPassword : loginRulesPhone"
		:rules="loginRules"
	>
		<template v-if="loginType === 'password'">
			<ElFormItem prop="username">
				<ElInput v-model="loginFormPassword.username" placeholder="输入账号" :prefix-icon="User" />
			</ElFormItem>
			<ElFormItem prop="password">
				<ElInput
					v-model="loginFormPassword.password"
					type="password"
					show-password
					placeholder="输入密码"
					:prefix-icon="Lock"
				/>
			</ElFormItem>
			<ElFormItem prop="code">
				<ElInput v-model="loginFormPassword.code" placeholder="请输入验证码" :prefix-icon="Message">
					<template #append>
						<ElImage :src="loginCaptchaImage" class="w-[96px] h-[36px]" @click="getCaptchaImage">
							<template #error>
								<div class="flex-center w-full h-full">
									<ElIcon>
										<Loading />
									</ElIcon>
								</div>
							</template>
						</ElImage>
					</template>
				</ElInput>
			</ElFormItem>
		</template>
		<template v-else>
			<ElFormItem prop="phone">
				<ElInput v-model="loginFormPhone.phone" placeholder="请输入手机号" :prefix-icon="Phone" />
			</ElFormItem>
		</template>
	</ElForm>
</template>
<style lang="scss" scoped></style>
