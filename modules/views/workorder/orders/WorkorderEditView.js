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
	className: "view-workorder-edit",
	readyCode: "workorder.edit",

	doInit: function () {
		WorkorderEditView.__super__.doInit.call(this);

		var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
		var callbacks = [this.getSingerInfos, this.getOrderInfo];
		Utils.exec(this, callbacks, params, function () {
			this.ready("workorder.edit");
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

		this.renderItem(form, "name", "名称", new UITextView(this, {
			prompt: "请输入歌曲名称", required: true, empty: "请输入歌曲名称，歌曲名称不能为空", 
			maxSize: 30, width: 300, value: order.name}));

		this.renderItem(form, "singer", "歌手", new UICombobox(this, {
			prompt: "请选择歌手", data: this.singers, selectedId: order.singerId}));

		this.renderItem(form, "album", "专辑名称", new UITextView(this, {
			prompt: "请输入专辑", value: order.album, width: 300}));

		this.renderItem(form, "other", "其它", new UIRadioGroup(this, {
			data: this.singers, width: 400, selectedIndex: 4}));

		this.renderItem(form, "other2", "其它", new UIDateInput(this));

		this.renderItem(form, "other3", "其他", new UIHGroup(this, {gap: 10, tag: "p"})
			.append(new UICheckbox(this, {label: "AAA", value: 1}))
			.append(new UICheckbox(this, {label: "BBB", value: 2, checked: true}))
			.append(new UICheckbox(this, {label: "CCC", value: 3})));

		// var addItem = function (name, label, view) {
		// 	var item = form.appendAndGet("<dl></dl>");
		// 	item.addClass(name).attr("name", name);
		// 	item.append("<dt>" + label + "</dt>");
		// 	var container = item.appendAndGet("<dd></dd>");
		// 	if (view) {
		// 		if (view instanceof VRender.UIView)
		// 			view.render(container);
		// 		else
		// 			container.append(view);
		// 	}
		// 	return item;
		// };

		// // 名称
		// var nameIpt = new UITextView(this, {prompt: "请输入工单名称", empty: "工单名称不能为空", size: 30});
		// addItem("name", "工单名称", nameIpt);

		// // 类型
		// var types = [{label: "类型A", value: 1}, {label: "类型B", value: 2}, {label: "类型C", value: 3}];
		// var typeRadioGrp = new UIRadioGroup(this, {data: types});
		// addItem("types", "选择类型", typeRadioGrp);

		// // 下拉
		// var combo = new UICombobox(this, {data: types, selectedIndex: 0});
		// addItem("combo", "下拉选择", combo);
		// // 下拉
		// var combo = new UICombobox(this, {data: types, selectedIndex: 0});
		// addItem("combo", "下拉选择", combo);// 下拉

		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉

		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);// 下拉
		// addItem("combo", "下拉选择", combo);
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
