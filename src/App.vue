<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStoreGlobal } from "@/pinia/modules/global";
import { reactive } from "vue";
const { elComponentSize } = storeToRefs(useStoreGlobal());
const obj = reactive({
	age: 12
});
</script>
<template>
	<el-config-provider :size="elComponentSize">
		<router-view></router-view>
	</el-config-provider>
</template>
