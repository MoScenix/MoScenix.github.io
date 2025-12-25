import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "MoScenixの小破站",
	subtitle: "",
	lang: "zh_CN", // 站点语言代码，例如：'en'、'zh_CN'、'ja' 等
	themeColor: {
		hue: 70, // 主题色默认色相，范围 0~360，例如：红色 0、青绿色 200、青色 250、粉色 345
		fixed: false, // 是否隐藏主题颜色选择器（对访客）
	},
	banner: {
		enable: true,
		src: "assets/images/banner.jpg",
		// 图片路径：相对于 /src 目录；如果以 '/' 开头，则相对于 /public 目录
		position: "center",
		// 等同于 CSS 的 object-position，仅支持 'top'、'center'、'bottom'，默认 'center'
		credit: {
			enable: false, // 是否显示横幅图片的署名信息
			text: "", // 显示的署名文本
			url: "", //（可选）指向原作品或作者页面的链接
		},
	},
	toc: {
		enable: true, // 是否在文章右侧显示目录（TOC）
		depth: 2, // 目录显示的最大标题层级，范围 1~3
	},
	favicon: [
		// 留空则使用默认 favicon
		// {
		//   src: '/favicon/icon.png', // favicon 路径，相对于 /public 目录
		//   theme: 'light',           //（可选）'light' 或 'dark'，用于浅色/深色模式不同图标
		//   sizes: '32x32',           //（可选）favicon 尺寸
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/MoScenix/MoScenix.github.io",
			// 内部链接不需要包含 base path，会自动添加
			external: true, // 显示外部链接图标，并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg",
	// 图片路径：相对于 /src 目录；如果以 '/' 开头，则相对于 /public 目录
	name: "MoScenix",
	bio: "Life is code , I will debug it",
	links: [
		{
			name: "bilibili",
			icon: "simple-icons:bilibili",
			url: "https://space.bilibili.com/1713026205",
		},
		{
			name: "QQ",
			icon: "simple-icons:tencentqq",
			url: "https://qm.qq.com/q/3kkY2IizVm",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/MoScenix",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：部分样式（例如背景色）已被覆盖，详见 astro.config.mjs
	// 请务必选择深色主题，因为当前博客主题仅支持深色背景
	theme: "github-dark",
};
