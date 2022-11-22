<script setup lang="ts">
import { ApiFile } from "@/http/apis/file";
import { ApiSlide } from "@/http/apis/slide";
import { useStoreAuth } from "@/pinia/modules/auth";
import { computed, Ref, ref } from "vue";

const authStore = useStoreAuth();
const fileInputRef: Ref<null | HTMLInputElement> = ref(null);
const pointId = ref(0);
const dialogVisible = ref(false);
const isUploading = ref(false);
const isLoading = ref(false);

const list: Ref<ApiSlide.ResSlideItem[]> = ref([]);
const previewList = computed(() => list.value.map((item) => item.pic));

const getList = () => {
	isLoading.value = true;
	ApiSlide.list(pointId.value)
		.then((res) => {
			list.value = res.data.map((item) => ({ ...item, pic: import.meta.env.VITE_IMAGE_URL + item.pic }));
		})
		.finally(() => {
			isLoading.value = false;
		});
};
const handleSelect = () => {
	const files = fileInputRef.value?.files;
	if (!files) return;
	const data = ApiFile.createFormData([files[0]], "multipartFile");
	data.append("jsonStr", JSON.stringify({ pointId: pointId.value, userId: authStore.userInfo.id }));
	isUploading.value = true;
	ApiSlide.upload(data)
		.then(() => {
			getList();
		})
		.finally(() => {
			isUploading.value = false;
			if (fileInputRef.value) {
				fileInputRef.value.value = "";
			}
		});
};
const handleDel = (picId: number) => {
	ApiSlide.del(picId).then(() => {
		getList();
	});
};
const show = (_pointId: number) => {
	pointId.value = _pointId;
	getList();
	dialogVisible.value = true;
};
defineExpose({
	show,
});
</script>
<template>
	<div>
		<el-dialog v-loading="isLoading" title="编辑图集" v-model="dialogVisible">
			<el-form label-width="100">
				<el-form-item label="添加图片">
					<div v-loading="isUploading" class="a-pic-select empty">
						<el-icon size="40">
							<icon-uil-plus></icon-uil-plus>
						</el-icon>
						<label>
							<i class="absolute w-full h-full left-0 top-0"></i>
							<input
								type="file"
								ref="fileInputRef"
								id="file_input"
								accept="image/*"
								hidden
								:disabled="isUploading"
								@change="handleSelect"
							/>
						</label>
					</div>
				</el-form-item>
				<el-form-item>
					<div v-for="item in list" :key="item.id" class="a-pic-select mr-2 mb-2 overflow-hidden">
						<el-image fit="cover" :src="item.pic" class="w-full h-full" :preview-src-list="previewList"></el-image>
						<div class="a-pic-select-trash" @click="handleDel(item.id)">
							<el-icon size="16" color="white">
								<icon-uil-trash-alt></icon-uil-trash-alt>
							</el-icon>
						</div>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<DialogFootButton :show-cancel="false" confirm-text="确 定" @confirm="dialogVisible = false"></DialogFootButton>
			</template>
		</el-dialog>
	</div>
</template>
<style scoped lang="scss"></style>
