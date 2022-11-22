<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, shallowRef, computed, ShallowRef, watchEffect, ComputedRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/core";
import { ApiFile } from "@/http/apis/file";

// 自定义事件
const emits = defineEmits(["update:modelValue"]);
// 编辑器实例，必须用 shallowRef
const editorRef: ShallowRef<null | IDomEditor> = shallowRef(null);

// 接收父组件参数，并设置默认值
interface RichEditorProps {
	modelValue: string; // 富文本值 ==> 必传
	toolbarConfig?: Partial<IToolbarConfig>; // 工具栏配置 ==> 非必传（默认为空）
	editorConfig?: Partial<IEditorConfig>; // 编辑器配置 ==> 非必传（默认为空）
	height?: string; // 富文本高度 ==> 非必传（默认为 500px）
	mode?: "default" | "simple"; // 富文本模式 ==> 非必传（默认为 default）
	hideToolBar?: boolean; // 是否隐藏工具栏 ==> 非必传（默认为false）
	disabled?: boolean; // 是否禁用编辑器 ==> 非必传（默认为false）
}
const props = withDefaults(defineProps<RichEditorProps>(), {
	modelValue: "",
	toolbarConfig: () => ({}),
	editorConfig: () => ({}),
	height: "500px",
	mode: "default",
	hideToolBar: false,
	disabled: false,
});

// 判断当前富文本编辑器是否禁用
watchEffect(() => {
	if (props.disabled) editorRef.value?.disable();
	else editorRef.value?.enable();
});

// 内容 HTML
const valueHtml = computed({
	get() {
		return props.modelValue;
	},
	set(val: string) {
		if (editorRef.value?.isEmpty()) val = "";
		emits("update:modelValue", val);
	},
});

// 自定义插入函数的类型
type InsertFnType = (url: string, alt?: string, href?: string) => void;
// 自定义上传图片
const uploadImg = async (file: File, insertFun: InsertFnType) => {
	ApiFile.upload(ApiFile.createFormData([file])).then((res) => {
		const url = `${import.meta.env.VITE_IMAGE_URL}${res.msg}`;
		insertFun(url, "图片", url);
	});
};
// 自定义上传视频
const uploadVideo = async (file: File, insertFun: InsertFnType) => {
	ApiFile.upload(ApiFile.createFormData([file])).then((res) => {
		const url = `${import.meta.env.VITE_IMAGE_URL}${res.msg}`;
		insertFun(url, "视频", url);
	});
};

// 编辑器配置
const editorConfigComputed: ComputedRef<Partial<IEditorConfig>> = computed(() => ({
	placeholder: "请输入内容...",
	MENU_CONF: {
		uploadImage: {
			customUpload: uploadImg,
		},
		uploadVideo: {
			customUpload: uploadVideo,
		},
	},
	...props.editorConfig,
}));

// 记录 editor 实例
const handleCreated = (editor: IDomEditor) => {
	editorRef.value = editor;
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
	editorRef.value?.destroy();
});
</script>
<template>
	<div class="editor-wrap">
		<Toolbar class="border-b-2" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
		<Editor
			v-model="valueHtml"
			class="overflow-y-hidden"
			:style="{ height }"
			:defaultConfig="editorConfigComputed"
			:mode="mode"
			@onCreated="handleCreated"
		/>
	</div>
</template>
<style src="../../styles/wangEditor/vars.scss" lang="scss"></style>
<style scoped lang="scss">
.editor-wrap {
	@apply rounded-md overflow-hidden border;
	z-index: 2;
	:deep(.w-e-text-container) {
		.w-e-text-placeholder {
			line-height: 1.5;
		}
	}
}
.dark .editor-wrap {
	border-color: var(--w-e-toolbar-bg-color);
}
</style>
