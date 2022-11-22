<script setup lang="ts">
import { useApiConfirm } from "@/hooks";
import { ApiLines } from "@/http/apis/lines";
import { ApiPoi } from "@/http/apis/poi";
import { whenever } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { computed, Ref, ref, watch } from "vue";
import type TheMap from "../TheMap.vue";

const mapRef: Ref<null | InstanceType<typeof TheMap>> = ref(null);
const visible = ref(false);
const isLoading = ref(false);
const lineList: Ref<ApiLines.ReqLinePointModifyItem[]> = ref([]);
const lineId = ref(0);

const isPreview = ref(false);
const previewIns: Ref<null | AMap.Polyline> = ref(null);

const isSelectPoint = ref(false);
const isSelectDefaultPoint = ref(false);
const completeSelectPoint = () => {
	isSelectPoint.value = false;
	isSelectDefaultPoint.value = false;
};

const markerList: Ref<(AMap.Marker | AMap.CircleMarker)[]> = ref([]);

/**
 * 已选择的景点点位信息
 */
const selectPiontIdList = computed(() => {
	return lineList.value
		.filter((item) => Object.hasOwn(item, "pointId"))
		.map((item) => (item as ApiLines.ResLinePointItem).pointId);
});

/**
 * 获取线路点位列表
 */
const getLinePoints = () => {
	isLoading.value = true;
	ApiLines.listPoint(lineId.value)
		.then((res) => {
			lineList.value = res.data;
			if (mapRef.value?.mapIns === null) {
				const stop = whenever(
					() => mapRef.value !== null && mapRef.value.mapIns !== null,
					() => {
						stop();
						initMarkerList();
					}
				);
			} else initMarkerList();
		})
		.finally(() => {
			isLoading.value = false;
		});
};

const initMarkerList = () => {
	markerList.value = lineList.value.map((item) => {
		const marker = createMarkerOrCircle(item);
		mapRef.value?.mapIns?.add(marker);
		return marker;
	});
};

/**
 * 格式化要添加的点位对象
 */
const formatPointItem = (data: ApiPoi.ResPoiItem | { latitude: number; longitude: number }) => {
	let point: ApiLines.ReqLinePointModifyItem = {
		id: Number(Date.now()),
		latitude: data.latitude,
		longitude: data.longitude,
		pointName: `路线点位${lineList.value.length + 1}`,
		lineId: lineId.value,
		sort: lineList.value.length + 1,
	};
	if (Object.hasOwn(data, "id")) {
		point.pointId = (data as ApiPoi.ResPoiItem).id;
		point.pointName = (data as ApiPoi.ResPoiItem).name;
	}
	return point;
};

/**
 * 创建景点 marker 或者 路线点 marker
 * @param data 点位信息
 */
const createMarkerOrCircle = (data: ApiLines.ReqLinePointModifyItem) => {
	const isPoint = Object.hasOwn(data, "pointId");
	if (isPoint) return createMarker(data);
	else return createCircle(data);
};

/**
 * 创建景点 marker
 * @param data 点位信息
 */
const createMarker = (data: ApiLines.ReqLinePointModifyItem) => {
	const defaultIcon = new AMap.Icon({
		size: new AMap.Size(40, 52),
		image: "/marker.png",
		imageSize: new AMap.Size(40, 52),
	});
	const checkIcon = new AMap.Icon({
		size: new AMap.Size(40, 52),
		image: "/markerCheck.png",
		imageSize: new AMap.Size(40, 52),
	});
	const marker = new AMap.Marker({
		position: new AMap.LngLat(data.longitude, data.latitude),
		icon: defaultIcon,
		label: {
			content: `<div>${data.pointName}</div>`,
			offset: new AMap.Pixel(0, 5),
			direction: "bottom",
		},
		offset: new AMap.Pixel(-20, -52),
		extData: {
			...data,
			isPoint: true,
			isFocus: false,
			focus() {
				const extData = marker.getExtData();
				if (extData.isFocus) return;
				markerList.value.forEach((item) => {
					item.getExtData().blur();
				});
				extData.isFocus = true;
				marker.setIcon(checkIcon);
				const position = marker.getPosition();
				if (position !== null) mapRef.value?.mapIns?.setCenter(position);
				marker.setExtData(extData);
			},
			blur() {
				const extData = marker.getExtData();
				if (!extData.isFocus) return;
				extData.isFocus = false;
				marker.setIcon(checkIcon);
				marker.setExtData(extData);
			},
		},
	});
	marker.on("click", () => {
		marker.getExtData().focus();
	});
	return marker;
};

/**
 * 创建路线点 marker
 * @param data 点位信息
 */
const createCircle = (data: ApiLines.ReqLinePointModifyItem) => {
	const defaultColor = "#409EFF";
	const activeColor = "#E6A23C";
	const circle = new AMap.CircleMarker({
		center: new AMap.LngLat(data.longitude, data.latitude),
		radius: 5,
		fillOpacity: 1,
		cursor: "pointer",
		strokeWeight: 0,
		fillColor: defaultColor,
		extData: {
			...data,
			defaultColor,
			activeColor,
			isFocus: false,
			focus() {
				const extData = circle.getExtData();
				if (extData.isFocus) return;
				markerList.value.forEach((item) => {
					item.getExtData().blur();
				});
				extData.isFocus = true;
				circle.setOptions({ fillColor: activeColor });
				mapRef.value?.mapIns?.setCenter(circle.getCenter());
				circle.setExtData(extData);
			},
			blur() {
				const extData = circle.getExtData();
				if (!extData.isFocus) return;
				extData.isFocus = false;
				circle.setOptions({ fillColor: defaultColor });
				circle.setExtData(extData);
			},
		},
	});
	circle.on("click", () => {
		circle.getExtData().focus();
	});
	return circle;
};

/**
 * 点击添加景点点位
 * @param data 景点点位信息
 */
const handleSelectPoint = (data: ApiPoi.ResPoiItem) => {
	const pointData = formatPointItem(data);
	lineList.value.push(pointData);
	const marker = createMarkerOrCircle(pointData);
	mapRef.value?.mapIns?.add(marker);
	markerList.value.push(marker);
	if (isPreview.value) {
		enablePreview();
	}
};

/**
 * 点击添加路线点位
 * @param event 事件回调参数
 */
const handleSelectDefaultPoint = (event: any) => {
	const pointData = formatPointItem({ latitude: event.lnglat.lat, longitude: event.lnglat.lng });
	lineList.value.push(pointData);
	const marker = createMarkerOrCircle(pointData);
	mapRef.value?.mapIns?.add(marker);
	markerList.value.push(marker);
	if (isPreview.value) {
		enablePreview();
	}
};

// 监听是否添加路线点位，添加或移除点击事件
watch(isSelectDefaultPoint, (val) => {
	if (val) mapRef.value?.mapIns?.on("click", handleSelectDefaultPoint);
	else mapRef.value?.mapIns?.off("click", handleSelectDefaultPoint);
});

/**
 * 删除点位
 */
const handleDeletePoint = (data: ApiLines.ReqLinePointModifyItem, index: number) => {
	lineList.value.splice(index, 1);
	const markerIndex = markerList.value.findIndex((item) => item.getExtData().id === data.id);
	if (markerIndex === -1) return;
	const marker = markerList.value[markerIndex];
	mapRef.value?.mapIns?.remove(marker);
	marker.destroy();
	markerList.value.splice(markerIndex, 1);
	if (isPreview.value) {
		enablePreview();
	}
};

/**
 * 处理排序点位
 * @param data 点位对象
 * @param curIndex 操作点位的下标
 * @param toIndex 排序到的下标
 */
const handleSortPoint = (data: ApiLines.ReqLinePointModifyItem, curIndex: number, toIndex: number) => {
	if (toIndex === -1 || toIndex === lineList.value.length) return;
	const targetPoint = lineList.value[curIndex];
	let delIndex = curIndex;
	if (toIndex < curIndex) delIndex = delIndex + 1;
	else toIndex = toIndex + 1;
	lineList.value.splice(toIndex, 0, targetPoint);
	lineList.value.splice(delIndex, 1);
	lineList.value.forEach((item, index) => (item.sort = index + 1));
	//TODO 如果预览中重新渲染路线
	if (isPreview.value) {
		enablePreview();
	}
};

// 拖拽排序
const dragToIndex = ref(-1);
const handleDragEnter = (toIndex: number) => {
	dragToIndex.value = toIndex;
};
const handleDragEnd = (dragIndex: number, dragItem: ApiLines.ReqLinePointModifyItem) => {
	if (dragToIndex.value === -1 || dragIndex === dragToIndex.value) return;
	handleSortPoint(dragItem, dragIndex, dragToIndex.value);
};

/**
 * 点击已选择的点位
 * @param data 点位信息
 */
const handleClickPoint = (data: ApiLines.ReqLinePointModifyItem) => {
	const target = markerList.value.find((item) => item.getExtData().id === data.id);
	if (!target) return;
	target.getExtData().focus();
};

/**
 * 处理预览线路
 */
const enablePreview = () => {
	if (lineList.value.length < 2) return ElMessage.error("至少要有两个点位");
	isPreview.value = true;
	const path = lineList.value.map((item) => new AMap.LngLat(item.longitude, item.latitude));
	previewIns.value = new AMap.Polyline({
		path,
		strokeColor: "#409eff", // 线颜色
		strokeOpacity: 0.8, // 线透明度
		strokeWeight: 3, // 线宽
		strokeStyle: "dashed", // 线样式
		strokeDasharray: [12, 5], // 勾勒形状轮廓的虚线和间隙的样式
		lineJoin: "round",
	});
	mapRef.value?.mapIns?.add(previewIns.value);
};
/**
 * 取消预览
 */
const cancelPreview = () => {
	isPreview.value = false;
	if (previewIns.value === null) return;
	mapRef.value?.mapIns?.remove(previewIns.value);
	previewIns.value?.destroy();
	previewIns.value = null;
};

const { apiConfirm } = useApiConfirm(ApiLines.modifyPoint, () => {
	visible.value = false;
});

const handleConfirm = () => {
	isLoading.value = true;
	apiConfirm(lineList.value).finally(() => (isLoading.value = false));
};

// 显示地图
const show = async (_lineId: number) => {
	lineId.value = _lineId;
	getLinePoints();
	visible.value = true;
};

watch(visible, (val) => {
	if (!val) {
		cancelPreview();
		completeSelectPoint();
		mapRef.value?.mapIns?.clearMap();
		markerList.value = [];
		lineList.value = [];
	}
});

defineExpose({
	show,
});
</script>
<template>
	<div v-loading="isLoading" class="map-box">
		<el-dialog title="线路选点" v-model="visible" fullscreen center>
			<TheMap ref="mapRef">
				<div class="map-operate">
					<div class="map-operate-item">
						<MapTile></MapTile>
					</div>
					<div class="map-operate-item flex-grow map-operate__point">
						<div class="map-operate__point-head">
							<template v-if="!isSelectPoint && !isSelectDefaultPoint">
								<div class="map-operate__point-head__tip">
									<el-alert
										title="提示"
										type="info"
										description="点击按钮添加对应点位，可拖拽排序已添加点位"
										show-icon
										:closable="false"
										class="!mb-1"
									/>
									<div class="flex">
										<el-button type="primary" size="small" @click="isSelectPoint = true">添加景点点位</el-button>
										<el-button type="warning" size="small" @click="isSelectDefaultPoint = true">添加路线点位</el-button>
									</div>
								</div>
							</template>
							<template v-else>
								<div class="map-operate__point-head__tip">
									<el-alert
										title="提示"
										type="warning"
										:description="isSelectDefaultPoint ? '点击地图即可添加线路点位' : '点击左侧添加按钮添加景点点位'"
										show-icon
										:closable="false"
										class="!mb-1"
									/>
									<el-button type="danger" size="small" @click="completeSelectPoint">关闭点位选择</el-button>
								</div>
							</template>
						</div>
						<div class="map-operate__point-content">
							<div
								v-for="(item, index) in lineList"
								:key="item.id"
								class="map-operate__point-content__item"
								draggable="true"
								@dragenter="handleDragEnter(index)"
								@dragend="handleDragEnd(index, item)"
								@click="handleClickPoint(item)"
							>
								<div class="flex items-center">
									<el-icon size="20" class="mr-1" :class="{ 'ml-6': !!!item.pointId }">
										<icon-uil-location-point v-if="!!item.pointId"></icon-uil-location-point>
										<icon-uil-arrows-v-alt v-else></icon-uil-arrows-v-alt>
									</el-icon>
									<span class="flex-shrink">{{ item.pointName }}</span>
								</div>
								<div class="flex items-center">
									<el-icon
										size="20"
										class="map-operate__point-arrow"
										@click.stop="handleSortPoint(item, index, index - 1)"
									>
										<icon-uil-angle-double-up></icon-uil-angle-double-up>
									</el-icon>
									<el-icon
										size="20"
										class="map-operate__point-arrow"
										@click.stop="handleSortPoint(item, index, index + 1)"
									>
										<icon-uil-angle-double-down></icon-uil-angle-double-down>
									</el-icon>
									<el-button type="danger" link @click="handleDeletePoint(item, index)">删除</el-button>
								</div>
							</div>
						</div>
						<div class="map-operate__point-footer">
							<template v-if="isPreview">
								<el-button type="danger" size="small" @click="cancelPreview">取消预览</el-button>
							</template>
							<template v-else>
								<el-button type="primary" size="small" @click="enablePreview">预览线路</el-button>
							</template>
							<el-button type="success" size="small" @click="handleConfirm">保存线路</el-button>
							<el-button type="danger" size="small" @click="visible = false">取消操作</el-button>
						</div>
						<Transition>
							<MapLintPointTree
								v-if="isSelectPoint"
								class="absolute right-full top-0 mr-2"
								:selected-ids="selectPiontIdList"
								@select="handleSelectPoint"
							></MapLintPointTree>
						</Transition>
					</div>
				</div>
			</TheMap>
		</el-dialog>
	</div>
</template>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
	@apply transition-all duration-300;
}
.v-enter-from,
.v-leave-to {
	@apply translate-x-2 opacity-0;
}
.map-operate__point {
	@apply justify-between w-96;
	max-height: calc(100vh - 54px - 160px);
	&-head {
		@apply flex flex-shrink-0 flex-col border-b-2 pb-2;
		&__tip {
			@apply flex flex-col w-full justify-start items-start;
		}
	}
	&-content {
		@apply flex flex-col overflow-auto flex-grow;
		@apply my-2;
		&__item {
			@apply flex-shrink-0;
			@apply flex items-center justify-between h-8 cursor-pointer active:bg-gray-200 dark:active:bg-gray-500;
		}
	}
	&-arrow {
		@apply cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500;
	}
	&-footer {
		@apply flex border-t-2 pt-2;
	}
}
</style>
