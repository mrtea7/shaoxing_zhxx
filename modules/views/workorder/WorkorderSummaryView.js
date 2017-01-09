/**********************************************************
 * 工单概况视图
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../BaseView");


var Utils = VRender.Utils;

var WorkorderSummaryView = BaseView.extend(module, {
	className: "view-workorder-summary",

	renderView: function () {
		WorkorderSummaryView.__super__.renderView.call(this);
		this.$el.write("workorder summary");
	}
});
