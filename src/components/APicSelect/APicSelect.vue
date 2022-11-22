<script setup lang="ts">
import { ApiFile } from "@/http/apis/file";
import { computed, Ref, ref } from "vue";

const emits = defineEmits(["update:modelValue"]);

interface APicSelectProps {
	modelValue: string;
	size?: string | number;
	accept?: string;
	disabled?: boolean;
}
const props = withDefaults(defineProps<APicSelectProps>(), {
	modelValue: "upload_resource/img/point/20221103141549CXMH7DUGAUFWNXZCRCKW.png",
	size: 140,
	accept: "image/gif,image/jpeg,image/jpg,image/png",
	disabled: false,
});

const isEmpty = computed(() => props.modelValue === "");
const fullUrl = computed(() => import.meta.env.VITE_IMAGE_URL + props.modelValue);
const sizeStyle = computed(() => `width: ${props.size}px; height: ${props.size}px;`);

// 正在上传
const isUploading = ref(false);
const fileInputKey = ref(0);
// input Ref
const fileInputRef: Ref<null | HTMLInputElement> = ref(null);

// 处理上传
const handleSelect = () => {
	const files = fileInputRef.value?.files;
	if (!files) return;
	const file = files[0];
	isUploading.value = true;
	ApiFile.upload(ApiFile.createFormData([file]))
		.then((res) => {
			emits("update:modelValue", res.msg);
			fileInputKey.value++;
		})
		.finally(() => {
			isUploading.value = false;
			if (fileInputRef.value) {
				fileInputRef.value.value = "";
			}
		});
};

// 处理删除
const handleDel = () => {
	emits("update:modelValue", "");
};
</script>
<template>
	<div>
		<div v-loading="isUploading" class="a-pic-select" :class="{ empty: isEmpty }" :style="sizeStyle">
			<template v-if="!isEmpty">
				<el-image fit="cover" :src="fullUrl" class="w-full h-full" :preview-src-list="[fullUrl]"></el-image>
				<div class="a-pic-select-trash" @click="handleDel">
					<el-icon size="16" color="white">
						<icon-uil-trash-alt></icon-uil-trash-alt>
					</el-icon>
				</div>
			</template>
			<template v-else>
				<el-icon size="40">
					<icon-uil-plus></icon-uil-plus>
				</el-icon>
				<label>
					<i class="absolute w-full h-full left-0 top-0"></i>
					<input
						type="file"
						ref="fileInputRef"
						id="file_input"
						:key="fileInputKey"
						:accept="accept"
						hidden
						:disabled="isUploading || disabled"
						@change="handleSelect"
					/>
				</label>
			</template>
		</div>
	</div>
</template>
<style scoped lang="scss"></style>
