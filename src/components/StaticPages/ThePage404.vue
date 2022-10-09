<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
	<div class="flex flex-col items-center w-screen h-screen pt-40">
		<div class="text-4xl font-bold">Not Found</div>
		<div class="text-2xl mt-10">您所访问的页面不存在</div>
		<div class="flex mt-10">
			<ElButton @click="router.back">返回</ElButton>
			<ElButton type="primary" @click="router.replace({ name: 'home' })">回到首页</ElButton>
		</div>
	</div>
</template>
<style scoped lang="scss">
</style>
