<script setup lang="ts">
import { useStoreGlobal } from "@/pinia/modules/global";
const globalStore = useStoreGlobal();
const sizeArr: { prop: typeof globalStore.elComponentSize, label: string}[] = [
	{ prop: "default", label: "默认"  },
	{ prop: "large", label: "大型"  },
	{ prop: "small", label: "小型"  },
];
</script>
<template>
	<el-dropdown class="select-none" @command="globalStore.changeElComponentSize($event)" :hide-on-click="false" trigger="click">
		<el-icon class="cursor-pointer" size="24px">
			<icon-uil-window-grid></icon-uil-window-grid>
		</el-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in sizeArr"
					:key="item.prop"
					:disabled="item.prop === globalStore.elComponentSize"
					:command="item.prop"
				>{{ item.label }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<style lang="scss" scoped></style>
