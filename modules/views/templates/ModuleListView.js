/**********************************************************
 * 列表视图
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../BaseView");


var Utils = VRender.Utils;

var ModuleListView = BaseView.extend(module, {
	getTitle: function () {
		// 返回表头名称
	},

	getTopButtons: function () {
		// 返回列表顶部按钮
	},

	getSearchData: function () {
		// 返回查询表单数据集
	},

	getColumns: function () {
		// 返回列表的列定义信息
	},

	getApiName: function () {
		// 返回列表数据接口名称
	},

	getApiParams: function () {
		// 返回列表的（初始）查询参数
	},

	getListData: function () {
		// 获取列表（初始化）数据集
	},

	///////////////////////////////////////////////////////
	renderView: function () {
		ModuleListView.__super__.renderView.call(this);
		this.$el.addClass("app-tmpl-listview");

		this.renderHeaderView(this.$el);
		this.renderSearchView(this.$el);
		this.renderListView(this.$el);
	},

	renderHeaderView: function (target) {
		var title = this.getTitle();
		var buttons = Utils.toArray(this.getTopButtons());
		if (Utils.isNotBlank(title) || buttons.length > 0) {
			var header = target.appendAndGet("<header></header>");
			if (Utils.isNotBlank(title))
				header.write("<div class='title'>" + title + "</div>");
			if (buttons.length > 0) {
				var renderBtnItem = function (target, data) {
					var item = target.appendAndGet("<div class='btn'></div>");
					if (Utils.isNotBlank(data.icon)) {
						if (data.icon.indexOf(".") > 0)
							item.write("<img src='" + data.icon + "'/>");
						else
							item.write("<i class='iconfont " + data.icon + "'></i>");
					}
					if (Utils.isNotBlank(data.name))
						item.attr("name", data.name);
					item.write("<span>" + (data.label || data.name || "按钮") + "</span>");
					if (Utils.isTrue(data.disabled))
						item.addClass("disabled");
					return item;
				};

				var btnbar = header.appendAndGet("<div class='btnbar'></div>");
				for (var i = 0; i < 2; i++) {
					renderBtnItem(btnbar, buttons[i]);
				}

				if (buttons.length === 3)
					renderBtnItem(btnbar, buttons[2]);
				else if (buttons.length > 3) {
					var more = renderBtnItem(btnbar, {name: "more", label: "…更多设置"});
					var dropdown = more.appendAndGet("<div class='dropdown'></div>");
					for (var i = 2; i < buttons.length; i++) {
						renderBtnItem(dropdown, buttons[i]);
					}
				}
			}
		}
	},

	renderSearchView: function (target) {

	},

	renderListView: function (target) {
		var listView = target.appendAndGet("<div class='listview'></div>");
	},

	getFrontComponentName: function () {
		return "tmpl.listview";
	}
});
