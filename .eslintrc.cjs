module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"parser": "@typescript-eslint/parser",
		"sourceType": "module",
		"ecmaFeatures": {
			jsx: true
		}
	},
	"plugins": [
		"vue",
		"@typescript-eslint"
	],
	"rules": {
		"no-undef": "off",
		"no-var": "error", // 不允许使用 var
		"indent": "off", // 强制使用 tab 缩进
		"linebreak-style": [ "error", "unix" ], // 强制使用一致的换行风格
		"quotes": [ "error", "double" ], // 强制使用一致的双引号
		"semi": [ "error", "always" ], // 要求使用分号代替 ASI
		"no-trailing-spaces": [ "error" ], // 禁用行尾空格
		"space-before-blocks": [ "warn", "always" ], // 要求止语句块之前有空格
		"spaced-comment": [ "error", "always"], // 要求在注释前有空白
		"object-curly-spacing": ["warn", "always" ], // 强制在花括号中使用一致的空格
		"array-bracket-spacing": ["error", "always"], // 强制在括号内使用空格
		"space-infix-ops": [ "error", { "int32Hint": false } ], // 要求中缀操作符周围有空格
		"arrow-spacing": [ "error" ], // 要求箭头函数的箭头之前或之后有空格
		"arrow-parens": [ "error", "always" ], // 要求箭头函数的参数使用圆括号
		// vue
		// "vue/multi-word-component-names": "off", // 必须使用多单词命名
		// ts
		"@typescript-eslint/indent": ["error", "tab"], // 强制使用 tab 缩进
		// "@typescript-eslint/no-explicit-any": "off", // 不允许使用 any

		"@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
		"@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
		"@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
		"@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
		"@typescript-eslint/ban-ts-ignore": "off", // 禁止使用 @ts-ignore
		"@typescript-eslint/ban-types": "off", // 禁止使用特定类型
		"@typescript-eslint/explicit-function-return-type": "off", // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
		"@typescript-eslint/no-var-requires": "off", // 不允许在 import 语句中使用 require 语句
		"@typescript-eslint/no-empty-function": "off", // 禁止空函数
		"@typescript-eslint/no-use-before-define": "off", // 禁止在变量定义之前使用它们
		"@typescript-eslint/ban-ts-comment": "off", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
		"@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)
		"@typescript-eslint/explicit-module-boundary-types": "off", // 要求导出函数和类的公共类方法的显式返回和参数类型
	}
};
