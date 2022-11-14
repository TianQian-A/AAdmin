<script setup lang="ts">
const BUTTON_NAMES = ["edit", "delete"];
interface Props {
	buttonList?: typeof BUTTON_NAMES[number][];
}
const emits = defineEmits(["edit", "delete"]);
withDefaults(defineProps<Props>(), {
	buttonList: () => ["edit", "delete"],
});
</script>
<template>
	<div>
		<slot name="before"></slot>
		<el-button v-if="buttonList.includes('edit')" type="primary" link icon="Edit" @click="emits('edit')">
			编辑
		</el-button>
		<el-button v-if="buttonList.includes('delete')" type="danger" link icon="Delete" @click="emits('delete')">
			删除
		</el-button>
		<slot name="after"></slot>
	</div>
</template>

<style scoped lang="scss"></style>
