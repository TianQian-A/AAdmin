<script setup lang="ts">
import { ref } from "vue";
import TheMap from "../TheMap.vue";
const emits = defineEmits(["select"]);
interface MapSelectPointProps {
	/**
	 * 是否显示手绘地图
	 */
	withTile?: boolean;
	/**
	 * 手绘地图控件
	 */
	tileControl?: boolean;
}
withDefaults(defineProps<MapSelectPointProps>(), {
	withTile: true,
	tileControl: true,
});

const selectPoint = ref([0, 0]);
const visible = ref(false);

const handleConfirm = () => {
	visible.value = false;
	emits("select", selectPoint.value);
};
const show = async () => {
	selectPoint.value = [0, 0];
	visible.value = true;
};
defineExpose({
	show,
});
</script>
<template>
	<div class="map-box">
		<el-dialog title="地图选点" v-model="visible" fullscreen center>
			<TheMap>
				<div class="map-operate">
					<div v-if="tileControl" class="map-operate-item">
						<MapTile></MapTile>
					</div>
					<div class="map-operate-item">
						<MapPoint v-model="selectPoint">
							<template #head>
								<el-alert title="单击左键拾取坐标" type="info" :closable="false" show-icon
									>拾取后点击确认即可选择</el-alert
								>
							</template>
							<template #footer>
								<div>
									<el-button @click="visible = false">取 消</el-button>
									<el-button type="primary" @click="handleConfirm">确认选择</el-button>
								</div>
							</template>
						</MapPoint>
					</div>
				</div>
			</TheMap>
		</el-dialog>
	</div>
</template>
<style scoped lang="scss"></style>
