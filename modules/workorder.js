/**********************************************************
 * 工单管理模块
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var Utils = VRender.Utils;

var WorkOrderModule = ModuleBase.extend(module, {
	id: "app-workorder",

	getView: function (module, action, params) {
		if (/orders/.test(action))
			return this.getOrdersView(module, action, params);
		return this.getSummaryView(module, action, params);
	},

	///////////////////////////////////////////////////////
	getSummaryView: function (module, action, params) {
		var WorkorderSummaryView = this.use("./views/workorder/WorkorderSummaryView");
		return new WorkorderSummaryView(this);
	},

	///////////////////////////////////////////////////////
	getOrdersView: function (module, action, params) {

	}
});
