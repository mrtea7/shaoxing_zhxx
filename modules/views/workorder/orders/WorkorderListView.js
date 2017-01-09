/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");


var Utils = VRender.Utils;

var WorkorderListView = BaseView.extend(module, {
	className: "view-workorder-list",

	renderView: function () {
		WorkorderListView.__super__.renderView.call(this);
		this.$el.write("workorder list");
	}
});
