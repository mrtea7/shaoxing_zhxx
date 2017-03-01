/**********************************************************
 * 工单管理模块
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var Utils = VRender.Utils;

var WorkOrderModule = ModuleBase.extend(module, {
	id: "app-workorder",

	getView: function (module, action, params) {
        console.log('<action-order>',action);
		if (/orders/.test(action))
			return this.getOrdersView(module, action, params);
		return this.getSummaryView(module, action, params);
	},

	///////////////////////////////////////////////////////
	getSummaryView: function (module, action, params) {
		return this.getCurrentModuleView(function (mview) {
			return __dirname + "/views/workorder/WorkorderSummaryView";
		});
	},

	///////////////////////////////////////////////////////
	getOrdersView: function (module, action, params) {
		return this.getCurrentModuleView(function (mview) {
			if (action === "orders.detail")
				return __dirname + "/views/workorder/orders/WoœrkorderDetailView";
			if (action === "orders.edit")
				return __dirname + "/views/workorder/orders/WorkorderEditView";
			return __dirname + "/views/workorder/orders/WorkorderListView";
		});
	}
});
