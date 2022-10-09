<!--
	配合 popover 封装的图片组件
-->
<script setup lang="ts">
import { computed, ref } from "vue";
import { AImage } from "@/types/aImage";

interface AImageProps extends AImage.Props {
	url: string,
	size?: number;
	enablePopover?: boolean;
	popoverMaxWidth?: number;
	popoverMaxHeight?: number;
}
const props = withDefaults(defineProps<AImageProps>(), {
	size: 50,
	enablePopover: true,
	popoverMaxHeight: 400,
	popoverMaxWidth: 400,
});
const aImage = ref();
const popoverRef = ref();
const oOops = () => {};
const fullUrl = computed(() => import.meta.env.VITE_IMAGE_URL + props.url);
const imageSizeStyle = computed(() => `width: ${props.size}px;height: ${props.size}px;`);
const popImageSizeStyle = computed(() => `max-width: ${props.popoverMaxWidth}px;max-height: ${props.popoverMaxHeight}px;`);
</script>
<template>
	<div>
		<ElPopover
			v-if="props.enablePopover"
			ref="popoverRef"
			:virtual-ref="aImage"
			trigger="hover"
			placement="right"
			width="200"
		>
			<ElImage :src="fullUrl" :style="popImageSizeStyle"></ElImage>
		</ElPopover>
		<ElImage
			ref="aImage"
			:src="fullUrl"
			fit="cover"
			:preview-src-list="[fullUrl]"
			:style="imageSizeStyle"
			:preview-teleported="true"
			@click.stop="oOops"
		></ElImage>
	</div>
</template>
<style lang="scss" scoped></style>
