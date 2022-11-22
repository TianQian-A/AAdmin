<script setup lang="ts">
import { withDefaults } from "vue";

const emits = defineEmits(["cancel", "confirm"]);
interface Props {
	cancelText?: string;
	confirmText?: string;
	loading?: boolean;
	showCancel?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	cancelText: "取 消",
	confirmText: "提 交",
	showCancel: true,
});
</script>
<template>
	<el-button v-if="showCancel" @click="emits('cancel')" :loading="loading">{{ props.cancelText }}</el-button>
	<el-button type="primary" @click="emits('confirm')" :loading="loading">{{ props.confirmText }}</el-button>
</template>
<style scoped lang="scss"></style>
