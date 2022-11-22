<!--
	配合 popover 封装的图片组件
-->
<script setup lang="ts">
import { computed } from "vue";
import { AImage } from "@/types/aImage";

interface AImageProps extends AImage.Props {
	url: string;
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
const oOops = () => {};
const fullUrl = computed(() => import.meta.env.VITE_IMAGE_URL + props.url);
const imageSizeStyle = computed(() => `width: ${props.size}px;height: ${props.size}px;`);
const popImageSizeStyle = computed(
	() => `max-width: ${props.popoverMaxWidth}px;max-height: ${props.popoverMaxHeight}px;`
);
</script>
<template>
	<div>
		<template v-if="props.enablePopover">
			<ElPopover trigger="hover" width="200">
				<el-image :src="fullUrl" :style="popImageSizeStyle"></el-image>
				<template #reference>
					<el-image
						:src="fullUrl"
						fit="cover"
						:preview-src-list="[fullUrl]"
						:style="imageSizeStyle"
						:preview-teleported="true"
						@click.stop="oOops"
					>
					</el-image>
				</template> </ElPopover
		></template>
		<template v-else>
			<el-image
				ref="aImage"
				:src="fullUrl"
				fit="cover"
				:preview-src-list="[fullUrl]"
				:style="imageSizeStyle"
				:preview-teleported="true"
				@click.stop="oOops"
			>
			</el-image>
		</template>
	</div>
</template>
<style lang="scss" scoped></style>
