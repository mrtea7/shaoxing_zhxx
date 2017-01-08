/**********************************************************
 * 系统模块菜单配置信息
 *********************************************************/

module.exports = {
	menus: [{
		name: "general",
		title: "概况",
		icon: "yunyingguanli"
	}, {
		name: "workorder",
		title: "工单汇总",
		icon: "jiankong",
		children: [{
			name: "summary",
			title: "概况信息"
		}, {
			name: "orders",
			title: "工单列表"
		}]
	}, {
		name: "organize",
		title: "部门和员工",
		icon: "shuju"
	}, {
		name: "settings",
		title: "系统设置",
		icon: "dashuju",
		children: [{
			name: "basic",
			title: "基本信息"
		}, {
			name: "auth",
			title: "权限设置"
		}]
	}]
};
