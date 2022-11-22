<script setup lang="ts">
import { ApiFile } from "@/http/apis/file";
import { resolveRef } from "@vueuse/core";
import { Ref, ref } from "vue";

const emits = defineEmits(["update:modelValue"]);
const inputRef: Ref<null | HTMLInputElement> = ref(null);
interface AAudioSelectProps {
	modelValue: string;
	accept?: string;
}
const props = withDefaults(defineProps<AAudioSelectProps>(), {
	modelValue: "",
	accept: "audio/mp3",
});
const isUploading = ref(false);
const fileInputKey = ref(0);
const audioPath = resolveRef(() => import.meta.env.VITE_IMAGE_URL + props.modelValue);

const handleClickInput = () => {
	inputRef.value?.click();
};
const handleSelect = () => {
	const files = inputRef.value?.files;
	if (!files) return;
	isUploading.value = true;
	ApiFile.upload(ApiFile.createFormData([files[0]]))
		.then((res) => {
			emits("update:modelValue", res.msg);
			fileInputKey.value++;
		})
		.finally(() => {
			isUploading.value = false;
		});
};
</script>
<template>
	<div>
		<template v-if="!modelValue">
			<label>
				<el-button type="primary" icon="Plus" @click="handleClickInput" :loading="isUploading">上传音频</el-button>
				<input ref="inputRef" hidden :key="fileInputKey" type="file" :accept="accept" @change="handleSelect" />
			</label>
		</template>
		<template v-else>
			<div class="flex items-center">
				<audio controls>
					<source :src="audioPath" type="audio/mpeg" />
				</audio>
				<el-button link type="danger" class="ml-2" @click="emits('update:modelValue', '')">移除</el-button>
			</div>
		</template>
	</div>
</template>
<style scoped lang="scss"></style>
