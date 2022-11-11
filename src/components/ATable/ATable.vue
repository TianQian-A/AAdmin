<script setup lang="ts">
import { ATableType } from "@/types/aTable";
import { ref } from "vue";
import AImage from "@/components/AImage/AImage.vue";
import { findEnum } from "@/utils/util";
interface ATableProps {
	tableData: any[];
	tableAttrs?: ATableType.TableAttrs;
	tableEvent?: ATableType.TableEvent;
	columns: ATableType.Column[];
}
withDefaults(defineProps<ATableProps>(), {
	tableData: () => [],
	tableAttrs: () => ({}),
	tableEvent: () => ({}),
	columns: () => [],
});
// elTable 组件实例
const elTableRef = ref();
// 匹配字典
const matchEnum = (row: any, aColumn: ATableType.Column) => {
	return findEnum(row[aColumn.columnAttrs.prop!], aColumn.enums || []);
};
</script>
<template>
	<div class="table-wrap">
		<slot name="head"></slot>
		<ElTable ref="elTableRef" :data="tableData" border v-bind="tableAttrs" v-on="tableEvent">
			<ElTableColumn v-for="(aColumn, index) in columns" :key="index" v-bind="aColumn.columnAttrs">
				<template
					v-if="aColumn.columnAttrs.type !== 'index' && aColumn.columnAttrs.type !== 'selection'"
					#default="{ row, column: elColumn }"
				>
					<!-- 自定义渲染单元格 -->
					<template v-if="aColumn.renderColumn">
						<component :is="aColumn.renderColumn({ row, elColumn, aColumn })"></component>
					</template>
					<template v-else>
						<!-- 动态插槽 -->
						<slot :name="aColumn.columnAttrs.prop" :row="row" :column="aColumn" :elColumn="elColumn">
							<!-- 标签样式 -->
							<template v-if="aColumn.type === 'tag'">
								<ElTag :type="matchEnum(row, aColumn).tagType">
									{{ matchEnum(row, aColumn).label }}
								</ElTag>
							</template>
							<!-- 图片样式 -->
							<template v-else-if="aColumn.type === 'image'">
								<AImage :url="aColumn.imageConfig!.url" v-bind="aColumn.imageConfig"></AImage>
							</template>
							<!-- 普通文本，支持 enum -->
							<template v-else>
								<span>{{ matchEnum(row, aColumn).label }}</span>
							</template>
						</slot>
					</template>
				</template>
				<!-- 自定义渲染列表头 -->
				<template v-if="aColumn.renderHeader" #header="{ column: elColumn }">
					<component :is="aColumn.renderHeader!({ aColumn, elColumn })"></component>
				</template>
			</ElTableColumn>
		</ElTable>
		<slot name="foot"></slot>
	</div>
</template>
<style lang="scss" scoped>
.table-wrap {
	@apply flex flex-1 flex-col h-full;
	.el-table {
		height: 100%;
	}
}
</style>
