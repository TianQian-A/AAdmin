<script setup lang="ts">
import { useStoreGlobal } from "@/pinia/modules/global";
import { storeToRefs } from "pinia";
const globalStore = useStoreGlobal();
const { collapsed } = storeToRefs(globalStore);
const { changeCollapsed } = globalStore;
</script>
<template>
	<el-icon class="cursor-pointer select-none hover:text-primary" size="24px" @click="changeCollapsed(!collapsed)">
		<icon-uil-right-indent-alt v-if="collapsed"></icon-uil-right-indent-alt>
		<icon-uil-left-indent-alt v-else></icon-uil-left-indent-alt>
	</el-icon>
</template>
<style lang="scss" scoped></style>
