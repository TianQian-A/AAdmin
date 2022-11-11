<script setup lang="ts">
import { withDefaults } from "vue";

const emits = defineEmits(["cancel", "confirm"]);
interface Props {
	cancelText?: string;
	confirmText?: string;
}
const props = withDefaults(defineProps<Props>(), {
	cancelText: "取 消",
	confirmText: "提 交",
});
</script>
<template>
	<el-button @click="emits('cancel')">{{ props.cancelText }}</el-button>
	<el-button type="primary" @click="emits('confirm')">{{ props.confirmText }}</el-button>
</template>
<style scoped lang="scss"></style>
