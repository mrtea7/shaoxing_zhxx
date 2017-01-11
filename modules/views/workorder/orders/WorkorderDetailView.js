/**********************************************************
 * 工单详情页面
 *********************************************************/

var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");


var WorkorderDetailView = BaseView.extend(module, {
	readyCode: "view.workorder.detail",

	doInit: function () {
		WorkorderDetailView.__super__.doInit.call(this);

		var self = this;

		var orderId = parseInt(this.options.params.id) || 0;
		TestService.getById(this.getSession(), orderId, function (err, ret) {
			self.orderInfo = ret;
			self.ready("view.workorder.detail");
		});
	},

	renderView: function () {
		WorkorderDetailView.__super__.renderView.call(this);
		// this.$el.write("<div>极力反对手机哦房间诶我费劲儿哦了</div>");
		this.$el.write(JSON.stringify(this.orderInfo));
	}
});
