import "pinia";
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

