/**********************************************************
 * 列表视图
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../BaseView");


var Utils = VRender.Utils;
var UIDatagrid = VRender.UIDatagrid;
var UIPaginator = VRender.UIPaginator;

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

	getListApiName: function () {
		// 返回列表数据接口名称
	},

	getListApiParams: function () {
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

	// ====================================================
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
				for (var i = 0; i < 2 & i < buttons.length; i++) {
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

	// ====================================================
	renderSearchView: function (target) {

	},

	getSearchView: function () {

	},

	// ====================================================
	renderListView: function (target) {
		var listView = target.appendAndGet("<div class='listview'></div>");
		var pageView = target.appendAndGet("<div class='pageview'></div>");

		var datas = Utils.toArray(this.getListData());

		var list = this.getListView(datas);
		var pager = this.getPageView(datas);

		if (pager) {
			if (list && Utils.isFunction(list.setPaginator))
				list.setPaginator(pager);

			if (pager instanceof VRender.UIView)
				pager.render(pageView);
			else
				pageView.append(pager);
		}

		if (list) {
			if (this.searchView && UIView.isFunction(list.setSearcher))
				list.setSearcher(this.searchView);

			if (list instanceof VRender.UIView)
				list.render(listView);
			else
				listView.append(list);
		}
	},

	getListView: function (datas) {
		var grid = new UIDatagrid(this, {/*chkbox: true, multi: true,*/empty: '暂无数据'});

		grid.setColumns(Utils.toArray(this.getColumns()));
		grid.setApiName(this.getListApiName());
		grid.setApiParams(this.getListApiParams());

		if (datas.length > 0) {
			grid.setViewData(datas);
			grid.setAutoLoad(false);
		}

		return grid;
	},

	getPageView: function (datas) {
		var pager = new UIPaginator(this, {status: true});
		pager.setPageNo(parseInt(this.options.page) || 1);
		pager.setPageSize(parseInt(this.options.rows) || 20);
		pager.setTotalCount(datas ? datas.length : 0);
		return pager;
	},

	// ====================================================
	getFrontComponentName: function () {
		return "tmpl.listview";
	}

});
