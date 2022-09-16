<script setup lang="ts">
import Header from "@/layout/Header/TheHeader.vue";
import Menu from "@/layout/Menu/TheMenu.vue";
</script>
<template>
	<el-container>
		<el-aside>
			<Menu></Menu>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
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
