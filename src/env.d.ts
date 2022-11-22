declare module "qs" {
	import qs from "qs";
	export default qs;
}
interface Window {
	_AMapSecurityConfig: any;
}
declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}

declare module "@wangeditor/editor" {
	import { SlateDescendant, SlateElement, SlateText } from "@wangeditor/editor";
	// 扩展 Text
	interface SlateText {
		text: string;
	}

	// 扩展 Element
	interface SlateElement {
		type: string;
		children: SlateDescendant[];
	}
}

declare module "nprogress";
