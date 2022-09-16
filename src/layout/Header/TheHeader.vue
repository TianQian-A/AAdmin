<script setup lang="ts">
import CollapseIcon from "@/layout/Header/components/IconCollapse.vue";
import DarkIcon from "@/layout/Header/components/IconDark.vue";
import SizeIcon from "@/layout/Header/components/IconSize.vue";
</script>
<template>
	<div class="flex-center-between h-headerHeight px-4 shadow-sm">
		<collapse-icon></collapse-icon>
		<div class="flex items-center grid-cols-3">
			<size-icon class="mx-2"></size-icon>
			<dark-icon class="mx-2"></dark-icon>
		</div>
	</div>
</template>
<style lang="scss" scoped></style>
