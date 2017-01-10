/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

var VRender = require("v-render");
var ModuleListView = require("../../templates/ModuleListView");


var Utils = VRender.Utils;

var WorkorderListView = ModuleListView.extend(module, {
	className: "view-workorder-orders",

	getTitle: function () {
		return "标题";
	},

	getTopButtons: function () {
		var buttons = [];
		buttons.push({name: "aa", label: "金佛电视剧", icon: "icon-jiankong"});
		buttons.push({name: "bb", label: "来得及送", icon: "icon-jiankong"});
		buttons.push({name: "cc", label: "奇偶分担说", icon: "icon-jiankong"});
		buttons.push({name: "dd", label: "哦吃少", icon: "icon-jiankong", disabled: true});
		buttons.push({name: "ee", label: "奇偶风刀霜剑藕粉奇偶", icon: "icon-jiankong"});
		buttons.push({name: "ff", label: "就佛教房间饿哦", icon: "icon-jiankong"});
		return buttons;
	}
});
