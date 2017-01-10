/**********************************************************
 * 工单详情页面
 *********************************************************/

var BaseView = require("../../BaseView");


var WorkorderDetailView = BaseView.extend(module, {
	renderView: function () {
		WorkorderDetailView.__super__.renderView.call(this);
		this.$el.write("<div>极力反对手机哦房间诶我费劲儿哦了</div>");
	}
});
