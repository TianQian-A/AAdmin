<script setup lang="ts">
import { useAMap } from "@/hooks";
import { MapContainerRef, mapInsProvideKey } from "./types";
import { ref, provide } from "vue";

const mapContainerRef: MapContainerRef = ref(null);
const { mapIns } = useAMap({ mapContainerRef });
provide(mapInsProvideKey, mapIns);
defineExpose({
	mapIns,
});
</script>
<template>
	<div ref="mapContainerRef" class="w-full h-full relative">
		<slot></slot>
	</div>
</template>
<style scoped lang="scss"></style>
