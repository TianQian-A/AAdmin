<script lang="ts">
export default {
	name: "TheLayout",
};
</script>
<script setup lang="ts">
import TheHeader from "@/layout/Header/TheHeader.vue";
import TheMenu from "@/layout/Menu/TheMenu.vue";
import TheTabs from "@/layout/Tabs/TheTabs.vue";
</script>
<template>
	<ElContainer>
		<ElAside>
			<TheMenu />
		</ElAside>
		<ElContainer>
			<ElHeader>
				<TheHeader />
				<TheTabs />
			</ElHeader>
			<ElMain>
				<RouterView></RouterView>
			</ElMain>
		</ElContainer>
	</ElContainer>
</template>
<style lang="scss" scoped>
.el-container {
	width: 100%;
	height: 100%;
	.el-aside {
		width: auto;
	}
	.el-header {
		padding: 0;
		height: auto;
	}
}
</style>
