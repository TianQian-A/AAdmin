import type { ElTable, ElTableColumn } from "element-plus";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { CamelCase } from "@/types/custom";
import {AImage} from "@/types/aImage";
export namespace ATableType {
	/**
	 * ElTable 实例类型
	 */
	type ElTableType = InstanceType<typeof ElTable>;

	/**
	 * ElTable 的 Props，去除 data
	 */
	type TableAttrs = Omit<ElTableType["$props"], "data">;

	/**
	 * ElTable 的事件类型
	 */
	type ElTableEventName =
		"select"
		| "select-all"
		| "expand-change"
		| "current-change"
		| "selection-change"
		| "cell-mouse-enter"
		| "cell-mouse-leave"
		| "cell-contextmenu"
		| "cell-click"
		| "cell-dblclick"
		| "row-click"
		| "row-contextmenu"
		| "row-dblclick"
		| "header-click"
		| "header-contextmenu"
		| "sort-change"
		| "filter-change"
		| "header-dragend";
	export type TableEvent = {
		[key in ElTableEventName as CamelCase<key>]?: (...args: any[]) => any | undefined;
	};

	/**
	 * ElTableColumn 实例类型
	 */
	type ElColumnType = InstanceType<typeof ElTableColumn>;

	/**
	 * ElTableColumn 的 Props
	 */
	export type ColumnAttrs = ElColumnType["$props"];

	/**
	 * 字典值对象
	 */
	export type EnumItem = {
		label: string
		value: string | number
		tagType?: 'danger' | 'success' | 'primary' | 'warning' | 'info'
	}
	type ColumnType = 'tag' | 'image';
	type ColumnSearchType = 'input' | 'select';

	/**
	 * 自定义渲染列的参数
	 */
	export interface ColumnRenderArg<T> {
		aColumn: Column
		elColumn: TableColumnCtx<any>
		row: T
		$index?: number
	}

	/**
	 * 基础列
	 */
	interface ColumnBase {
		/**
		 * ElTableColumn 的 Props
		 */
		columnAttrs: ColumnAttrs
		/**
		 * 列的类型
		 */
		type?: ColumnType
		/**
		 * 列的字典
		 */
		enums?: EnumItem[]
		/**
		 * 可搜索列
		 */
		search?: {
			type: ColumnSearchType
			/**
			 * 搜索组件的穿透属性
			 */
			attrs?: Record<string, any>
			/**
			 * 搜索属性改变时的钩子函数
			 */
			changeHook?: (params: any) => any
		}
		/**
		 * 自定义列渲染函数
		 */
		renderColumn?: (scope: ColumnRenderArg) => any
		/**
		 * 自定义列表头渲染函数
		 */
		renderHeader?: (scope: Omit<ColumnRenderArg, "row">) => any // 自定义列表头渲染函数
		/**
		 * 当列的 type 是 image 时，图片配置选项
		 */
		imageConfig?: Omit<AImage.Props, "url">
	}

	/**
	 * 标签类型的列
	 */
	interface ColumnTag extends ColumnBase {
		type: 'tag'
		enums: EnumItem[]
	}

	/**
	 * ATable 的 column 对象
	 */
	export type Column =  ColumnBase | ColumnTag;

	export type Props = {
		tableData: any[]
		tableAttrs?: TableAttrs
		tableEvent?: TableEvent
		columns: Column[]
	}
}
