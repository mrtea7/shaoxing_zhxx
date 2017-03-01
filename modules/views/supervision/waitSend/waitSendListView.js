/**********************************************************
 * 督查督办待派发列表视图，包含新建等上部菜单
 *********************************************************/

var VRender = require("v-render");
var ModuleListView = require("../../templates/ModuleListView");


var Utils = VRender.Utils;

var UnpublishedListView = ModuleListView.extend(module, {
	className: "view-supervision-todo",

	getTitle: function () {
		return "督查督办";
	},

	getTopButtons: function () {
		var buttons = [];
		buttons.push({name: "create", label: "新建任务", icon: "icon-jiankong"});
		buttons.push({name: "delete", label: "删除任务", icon: "icon-jiankong"});
		return buttons;
	},

	getColumns: function () {
		var columns = [];
		columns.push({name: "title", title: "标题"});
		columns.push({name: "deadline", title: "截止时间"});
		columns.push({name: "status", title: "状态"});
		columns.push({name: "op", title: "操作"});
		return columns;
	},

	getListApiName: function () {
		return "sup.page.send";
	},
    getListApiParams: function () {
        var param = {taskStatus: -1, isOverdue: 0};
        return param;
    }
});
