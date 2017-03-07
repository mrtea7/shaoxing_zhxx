/**********************************************************
 * 员工列表
 *********************************************************/

var VRender = require("v-render");
var ModuleListView = require("../../templates/ModuleListView");


var Utils = VRender.Utils;

var organizeListView = ModuleListView.extend(module, {
	className: "view-organize-list",

	getTitle: function () {
		return "员工列表";
	},

	getTopButtons: function () {
		var buttons = [];
		buttons.push({name: "create", label: "新建用户", icon: "icon-jiankong"});
		return buttons;
	},

	getColumns: function () {
		var columns = [];
		columns.push({name: "userCaption", title: "姓名"});
		columns.push({name: "userName", title: "帐号"});
		columns.push({name: "tenantId", title: "所属科室"});
		columns.push({name: "phonenumber", title: "手机"});
		columns.push({name: "op", title: "操作"});
		return columns;
	},

	getListApiName: function () {
		return "user.list";
	}
});
