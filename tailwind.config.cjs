/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	// 需要使用 tailwindcss 的文件路径
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/**/**/*.{vue,js,ts,jsx,tsx}"],
	safelist: [".el-button"],
	theme: {
		extend: {
			colors: {
				primary: "var(--el-color-primary)",
				success: "var(--el-color-success)",
				warning: "var(--el-color-warning)",
				danger: "var(--el-color-danger)",
				error: "var(--el-color-error)",
				info: "var(--el-color-info)",
			},
			spacing: {
				headerHeight: "var(--app-height-header)",
			},
		},
	},
	plugins: [],
};
