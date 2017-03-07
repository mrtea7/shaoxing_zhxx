/**********************************************************
 * 基础视图类，继承自“UIView”，实现视图的公共部分内容
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var BaseView = VRender.UIView.extend(module, {

	renderView: function () {
		BaseView.__super__.renderView.call(this);
		this.renderViewData(this.$el);
	},

	renderViewData: function (target) {
		var data = this.getViewData();
		if (Utils.isNotBlank(data)) {
			var tagid = VRender.uuid();
			var script = this.$el.appendAndGet("<script vid='" + tagid + "' class='vrender-fragment-script'></script>");
			script.write("$('[vid=" + this.getViewId() + "]').data('viewData'," + JSON.stringify(data) + ");");
			script.write("$('[vid=" + tagid + "]').remove();");
		}
	}
});
