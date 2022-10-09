<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStoreGlobal } from "@/pinia/modules/global";
const { elComponentSize } = storeToRefs(useStoreGlobal());
</script>
<template>
	<el-config-provider :size="elComponentSize">
		<router-view></router-view>
	</el-config-provider>
</template>
