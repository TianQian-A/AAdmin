<script setup lang="ts">
import { useStoreAuth } from "@/pinia/modules/auth";
import { useRouter } from "vue-router";
import PasswordModal from "@/components/PasswordModal/PasswordModal.vue";
import { ref } from "vue";
const router = useRouter();
const authStore = useStoreAuth();
type OperateType = "logout" | "changePassword";
const operateArr: { prop: OperateType; label: string }[] = [
	{
		prop: "changePassword",
		label: "修改密码",
	},
	{
		prop: "logout",
		label: "退出登录",
	},
];
const passwordModalRef = ref<InstanceType<typeof PasswordModal> | null>(null);
/**
 * 点击操作
 * @param oeprate 操作类型
 */
const handleOperate = (oeprate: OperateType) => {
	if (oeprate === "logout") logout();
	else if (oeprate === "changePassword") {
		passwordModalRef.value?.show();
	}
};

/**
 * 退出登录
 */
const logout = () => {
	router.replace("/login");
	authStore.logout();
};
</script>
<template>
	<div>
		<el-dropdown class="select-none" :hide-on-click="false" trigger="click" @command="handleOperate">
			<div class="flex-center hover:text-primary">
				<el-icon class="cursor-pointer mr-1" size="24px">
					<icon-uil-user-circle></icon-uil-user-circle>
				</el-icon>
				<span>{{ authStore.userInfo.realName }}</span>
			</div>

			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item
						v-for="item in operateArr"
						:key="item.prop"
						:command="item.prop"
						:class="{ '!text-danger': item.prop === 'logout' }"
						>{{ item.label }}</el-dropdown-item
					>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<PasswordModal ref="passwordModalRef"></PasswordModal>
	</div>
</template>

<style scoped lang="scss"></style>
