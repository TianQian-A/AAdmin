import type { ElTable, ElTableColumn } from "element-plus";
import {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";
import {CamelCase} from "@/types/global";

/**
 * ElTable 实例类型
 */
type ElTableType = InstanceType<typeof ElTable>;

/**
 * ElTable 的 Props，去除 data
 */
type ElTableAttrs = Omit<ElTableType["$props"], "data">

/**
 * ElTable 的事件类型
 */
type ElTableEventName = "select" | "select-all" | "expand-change" | "current-change" | "selection-change" | "cell-mouse-enter" | "cell-mouse-leave" | "cell-contextmenu" | "cell-click" | "cell-dblclick" | "row-click" | "row-contextmenu" | "row-dblclick" | "header-click" | "header-contextmenu" | "sort-change" | "filter-change" | "header-dragend";
type ElTableEvent = {
	[key in ElTableEventName as CamelCase<key>]?: (...args: any[]) => any | undefined;
};

/**
 * ElTableColumn 实例类型
 */
type ElColumnType = InstanceType<typeof ElTableColumn>;

/**
 * ElTableColumn 的 Props
 */
type ElColumnAttrs = ElColumnType["$props"];

/**
 * 自定义渲染列的参数
 */
interface ColumnRenderArg {
	column: any,
	elColumn: TableColumnCtx<any>,
	row: any,
	$index?: number,
}
/**
 * ATable 的 column 对象
 */
interface ATableColumn {
	/**
	 * ElTableColumn 的 Props，用于属性穿透
	 */
	columnAttrs?: ElColumnAttrs,
	/**
	 * 自定义列渲染函数
	 */
	renderColumn?: (scope: ColumnRenderArg) => any,
	/**
	 * 自定义列表头渲染函数
	 */
	renderHeader?: (scope: Omit<ColumnRenderArg, "row">) => any, // 自定义列表头渲染函数
}

export { ElTableAttrs, ElTableEvent, ElColumnAttrs, ATableColumn, }
