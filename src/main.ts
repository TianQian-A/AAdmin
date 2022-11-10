import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/pinia";
// tailwind 样式，在此文件中定义全局基本样式
import "@/styles/tailwind.scss";
// element-plus 深色主题
import "@/styles/element/vars-dark.scss";
// element-plus 的所有图标组件
import * as Icons from "@element-plus/icons-vue";
import "@amap/amap-jsapi-types";
const app = createApp(App);
// 注册 element-plus 的图标
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(pinia).use(router).mount("#app");
