<script setup lang="ts">
import { whenever } from "@vueuse/core";
import { inject, Ref, ref } from "vue";
import { mapInsProvideKey } from "../types";

const emits = defineEmits(["update:modelValue"]);
const mapIns = inject(mapInsProvideKey, ref(null));
interface Props {
	modelValue: number[];
}
withDefaults(defineProps<Props>(), {
	modelValue: () => [0, 0],
});

const selectMarker: Ref<AMap.Marker | null> = ref(null);

// 设置点击的点位
const setMarker = (lng: number, lat: number) => {
	const position: AMap.Vector2 = [lng, lat];
	emits("update:modelValue", [lng, lat]);
	if (selectMarker.value !== null) {
		selectMarker.value.setPosition(position);
		return;
	}
	selectMarker.value = new AMap.Marker({
		position,
	});
	mapIns.value?.add(selectMarker.value);
};

const stop = whenever(
	() => mapIns?.value !== null,
	() => {
		stop();
		mapIns.value!.on("click", (e) => {
			setMarker(e.lnglat.lng, e.lnglat.lat);
		});
	}
);
</script>
<template>
	<div class="flex flex-col">
		<slot name="head"></slot>
		<div class="flex items-center my-2">经度：{{ modelValue[0] }}，纬度：{{ modelValue[1] }}</div>
		<slot name="footer"></slot>
	</div>
</template>
<style scoped lang="scss"></style>
