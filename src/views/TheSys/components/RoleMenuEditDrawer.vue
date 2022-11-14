<script setup lang="ts">
import { useApiConfirm, useBasicForm } from "@/hooks";
import { ApiRole } from "@/http/apis/role";
import type { ElTree } from "element-plus";
import { TreeKey } from "element-plus/es/components/tree/src/tree.type";
import { computed, Ref, ref } from "vue";

const emits = defineEmits(["save"]);
// 树的实例
const elTreeRef: Ref<null | InstanceType<typeof ElTree>> = ref(null);
// 全部菜单
const menus: Ref<ApiRole.ResRoleMenu[]> = ref([]);
ApiRole.listMenu().then((res) => {
	menus.value = res.data;
});

// 角色权限表单数据
const { dataForm, showDialog, dialogVisible } = useBasicForm<ApiRole.ReqRoleMenu>({
	roleId: {
		value: 0,
	},
	menuIds: {
		value: "",
	},
});

// 是否正在请求已拥有的菜单
const loading = ref(false);
// 清除已选择的菜单
const clearMenuIds = () => {
	dataForm.menuIds = "";
	elTreeRef.value?.setCheckedKeys([]);
};
// 获取角色已拥有的菜单
const getRoleMenus = () => {
	clearMenuIds();
	loading.value = true;
	ApiRole.detailRoleMenu(dataForm.roleId)
		.then((res) => {
			dataForm.menuIds = res.data.menuIds;
		})
		.finally(() => {
			loading.value = false;
		});
};
// 已选择的菜单数组
const checkedMenuList = computed<TreeKey[]>(() => dataForm.menuIds.split(",").filter((item) => !!item));
// 点击选中菜单
const onCheckMenu = (data: ApiRole.ResRoleMenu[], { checkedKeys }: { checkedKeys: number[] }) => {
	dataForm.menuIds = checkedKeys.join(",");
};
// 编辑角色菜单请求
const { apiConfirm, apiLoading } = useApiConfirm(ApiRole.modifyMenu);
// 确认修改
const confirmSave = () => {
	const checkedKeys = elTreeRef.value?.getCheckedKeys() ?? [];
	const halfCheckedKeys = elTreeRef.value?.getHalfCheckedKeys() ?? [];
	const menuIds = checkedKeys.concat(halfCheckedKeys).join(",");
	const data: ApiRole.ReqRoleMenu = Object.assign({}, dataForm, {
		menuIds,
	});
	apiConfirm(data).then(() => {
		emits("save");
		dialogVisible.value = false;
	});
};
// 展示编辑抽屉
const show = (roleId: number) => {
	showDialog({ roleId });
	getRoleMenus();
};
defineExpose({
	show,
});
</script>
<template>
	<el-drawer v-model="dialogVisible">
		<template #header>
			<span class="flex-1">分配角色权限</span>
		</template>
		<el-tree
			ref="elTreeRef"
			v-loading="loading"
			:data="menus"
			node-key="menuId"
			:props="{ label: 'menuName', children: 'children' }"
			show-checkbox
			default-expand-all
			:default-checked-keys="checkedMenuList"
			@check="onCheckMenu"
		></el-tree>
		<template #footer>
			<DialogFootButton
				@cancel="dialogVisible = false"
				:loading="apiLoading || loading"
				@confirm="confirmSave"
			></DialogFootButton>
		</template>
	</el-drawer>
</template>
<style scoped lang="scss"></style>
