<script setup lang="ts">
import { useStoreMenu } from "@/pinia/modules/menu";
const menuStore = useStoreMenu();
</script>
<template>
	<el-icon class="cursor-pointer" size="24px" @click="menuStore.changeCollapse(!menuStore.collapsed)">
		<icon-uil-right-indent-alt v-if="menuStore.collapsed"></icon-uil-right-indent-alt>
		<icon-uil-left-indent-alt v-else></icon-uil-left-indent-alt>
	</el-icon>
</template>
<style lang="scss" scoped></style>
