<script setup lang="ts">
import CollapseIcon from "@/layout/Header/components/IconCollapse.vue";
import IconDark from "@/layout/Header/components/IconDark.vue";
import IconSize from "@/layout/Header/components/IconSize.vue";
import IconUser from "./components/IconUser.vue";
</script>
<template>
	<div class="flex-center-between h-headerHeight px-4 shadow-sm">
		<collapse-icon></collapse-icon>
		<div class="flex items-center grid-cols-3">
			<IconSize class="mx-2"></IconSize>
			<IconDark class="mx-2"></IconDark>
			<IconUser class="mx-2"></IconUser>
		</div>
	</div>
</template>
<style lang="scss" scoped></style>
