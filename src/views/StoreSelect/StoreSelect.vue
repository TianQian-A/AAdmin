<script setup lang="ts">
const filesList = [
	{
		name: "img1",
		url: "/vite.svg"
	},
	{
		name: "img2",
		url: "https://cdn.worldmaipu.com/tfk/upload_resource/img/2022/0823/20220823090811OQPRKG4O9JGDTF4TPZC3.jpg"
	}
];
</script>
<template>
	<el-upload
		action="https://tfk.worldmaipu.com/files/upload"
		name="MultipartFile"
		v-model:file-list="filesList"
		list-type="picture-card"
	></el-upload>
</template>
<style lang="scss" scoped></style>
