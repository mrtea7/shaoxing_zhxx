/**********************************************************
 * 工单编辑页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UIHGroup = VRender.UIHGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;
var UIDateInput = VRender.UIDateInput;

var WorkorderEditView = BaseView.extend(module, {
	className: "view-supervision-edit",
	readyCode: "supervision.edit",

	doInit: function () {
		WorkorderEditView.__super__.doInit.call(this);

		var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
		var callbacks = [this.getSingerInfos, this.getOrderInfo];
		Utils.exec(this, callbacks, params, function () {
			this.ready("supervision.edit");
		});
	},

	getSingerInfos: function (params, callback) {
		var self = this;
		TestService.getSingers(params.session, null, function (err, ret) {
			self.singers = ret;
			callback(false, params);
		});
	},

	getOrderInfo: function (params, callback) {
		if (params.orderId) {
			var self = this;
			TestService.getById(params.session, params.orderId, function (err, ret) {
				self.orderInfo = !err ? ret : null;
				callback(err, params);
			});
		}
		else {
			callback(false, params);
		}
	},

	getViewData: function () {
		return this.orderInfo;
	},

	renderView: function () {
		WorkorderEditView.__super__.renderView.call(this);

		var form = this.$el.appendAndGet("<div class='form'></div>");

		var order = this.orderInfo || {};

		if (order.id)
			this.renderItem(form, "name", "编号", "<p>" + order.id + "</p>");

		this.renderItem(form, "name", "标题", new UITextView(this, {
			required: true, empty: "请输入标题，标题不能为空",
			maxSize: 400,multi: true, width: 300, value: order.name}));



	},

	renderItem: function (form, name, label, view) {
		var item = form.appendAndGet("<dl></dl>");
		item.addClass(name).attr("name", name);
		item.append("<dt>" + label + "</dt>");
		var container = item.appendAndGet("<dd></dd>");
		if (view) {
			if (view instanceof VRender.UIView)
				view.render(container);
			else
				container.append(view);
		}
		return item;
	}
});
