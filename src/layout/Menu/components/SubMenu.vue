<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: "SubMenu",
});
</script>
<script setup lang="ts"></script>
<template>
	<el-sub-menu index="1">
		<template #title>
			<el-icon><location /></el-icon>
			<span>Navigator One</span>
		</template>
		<el-menu-item index="1-1">item one</el-menu-item>
		<el-menu-item index="1-2">item one</el-menu-item>
		<el-menu-item index="1-3">item three</el-menu-item>
		<el-sub-menu index="1-4">
			<template #title>item four</template>
			<el-menu-item index="1-4-1">item one</el-menu-item>
		</el-sub-menu>
	</el-sub-menu>
</template>
<style lang="scss" scoped></style>
