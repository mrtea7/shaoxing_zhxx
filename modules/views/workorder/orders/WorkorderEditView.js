/**********************************************************
 * 工单编辑页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;

var WorkorderEditView = BaseView.extend(module, {
	className: "view-workorder-edit",

	doInit: function () {
		WorkorderEditView.__super__.doInit.call(this);
	},

	renderView: function () {
		WorkorderEditView.__super__.renderView.call(this);
		// this.$el.write("<div>解放路的说了风刀霜剑了</div>");
		var form = this.$el.appendAndGet("<div class='form'></div>");

		var addItem = function (name, label, view) {
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
		};

		// 名称
		var nameIpt = new UITextView(this, {prompt: "请输入工单名称", empty: "工单名称不能为空", size: 30});
		addItem("name", "工单名称", nameIpt);

		// 类型
		var types = [{label: "类型A", value: 1}, {label: "类型B", value: 2}, {label: "类型C", value: 3}];
		var typeRadioGrp = new UIRadioGroup(this, {data: types});
		addItem("types", "选择类型", typeRadioGrp);

		// 下拉
		var combo = new UICombobox(this, {data: types, selectedIndex: 0});
		addItem("combo", "下拉选择", combo);
		// 下拉
		var combo = new UICombobox(this, {data: types, selectedIndex: 0});
		addItem("combo", "下拉选择", combo);// 下拉

		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉

		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);// 下拉
		addItem("combo", "下拉选择", combo);
	}
});
