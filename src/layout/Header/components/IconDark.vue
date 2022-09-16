<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import UilMoon from "~icons/uil/moon";
import UilSun from "~icons/uil/sun";
const isDark = useDark({
	selector: "html",
	valueDark: "dark",
	valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>
<template>
	<div class="dark-switch cursor-pointer transition-all bg-gray-200 dark:bg-gray-700" @click="toggleDark()">
		<div class="dark-switch-action flex-center bg-white transition-all dark:bg-black dark:translate-x-[18px]">
			<el-icon class="transition-none" size="14px">
				<component :is="isDark ? UilMoon : UilSun"></component>
			</el-icon>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.dark-switch {
	position: relative;
	width: 40px;
	height: 22px;
	border-radius: 11px;
	.dark-switch-action {
		position: absolute;
		top: 2px;
		left: 1px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
	}
}
</style>
