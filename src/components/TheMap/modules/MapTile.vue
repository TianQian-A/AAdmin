<script setup lang="ts">
import { whenever } from "@vueuse/core";
import { inject, ref, Ref, watch } from "vue";
import { mapInsProvideKey } from "../types";
const mapIns = inject(mapInsProvideKey, ref(null));

// 瓦片实例
const tileLayer: Ref<null | AMap.TileLayer> = ref(null);
// 瓦片是否展示
const titleLayerVisible = ref(true);
// 瓦片是否降低层级
const titleLayerLower = ref(false);

// 设置瓦片
const setTile = () => {
	if (tileLayer.value !== null) return;
	tileLayer.value = new AMap.TileLayer({
		tileUrl: import.meta.env.VITE_MAP_TILE_PATH,
		zIndex: 100,
		visible: titleLayerVisible.value,
	});
	mapIns?.value?.addLayer(tileLayer.value);
};

watch(titleLayerVisible, (val) => {
	if (val) tileLayer.value?.show();
	else tileLayer.value?.hide();
});

watch(titleLayerLower, (val) => {
	if (val) tileLayer.value?.setzIndex(99);
	else tileLayer.value?.setzIndex(101);
});

const stop = whenever(
	() => mapIns?.value !== null && mapIns?.value !== undefined,
	() => {
		stop();
		setTile();
	}
);
</script>
<template>
	<div>
		<div class="flex items-center">
			<span>是否显示手绘地图：</span>
			<el-switch v-model="titleLayerVisible"></el-switch>
		</div>
		<div v-if="titleLayerVisible" class="flex items-center">
			<span>降低手绘地图层级：</span>
			<el-switch v-model="titleLayerLower"></el-switch>
		</div>
	</div>
</template>
<style scoped lang="scss"></style>
