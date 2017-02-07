/**********************************************************
 * 模块视图基类
 *********************************************************/

var VRender = require("v-render");

var Utils = VRender.Utils;

var ModuleView = VRender.View.extend(module, {
	readyCode: "module.view",

	// doInit: function () {
	// 	ModuleView.__super__.doInit.call(this);
	// },

	// 设置模块图标，支持字体图标和文件图片
	setIcon: function (value) {
		this._icon = value;
	},

	// 设置模块标题
	setTitle: function (value) {
		this._title = value;
	},

	// 设置模块描述信息
	setDescription: function (value) {
		this._description = value;
	},

	// 设置模块对应的视图
	setContentView: function (view) {
		this.contentView = view;
	},

	// 等待模块内部视图派发“ready”事件
	end: function () {
		if (this.contentView && Utils.isFunction(this.contentView.ready)) {
			var self = this;
			this.contentView.ready(function () {
				self.ready("module.view");
			});
		}
		else {
			this.ready("module.view");
		}
		return this;
	},

	isHeaderVisible: function () {
		return Utils.isTrue(this._showheader);
	},
	setHeaderVisible: function (value) {
		this._showheader = value;
	},

	///////////////////////////////////////////////////////
	render: function (output) {
		ModuleView.__super__.render.call(this, output);
		if (this.isHeaderVisible())
			this.renderHeader(output);
		this.renderContent(output);
	},

	renderHeader: function (target) {
		var header = target.appendAndGet("<div class='app-module-header'></div>");

		if (Utils.isNotBlank(this._icon)) {
			var icon = header.appendAndGet("<span class='icon'></span>");
			if (this._icon.indexOf(".") > 0)
				icon.write("<img src='" + this._icon + "'/>");
			else
				icon.write("<i class='iconfont " + this._icon + "'></i>");
		}

		header.write("<div class='title'>" + (Utils.isBlank(this._title) ? "&nbsp;" : this._title) + "</div>");

		if (Utils.isNotBlank(this._description))
			header.write("<div class='desc'>" + this._description + "</div>");
	},

	renderContent: function (target) {
		var container = target.appendAndGet("<div class='app-module-content'></div>");
		
		if (this.contentView) {
			var contentView = this.contentView;
			if (Utils.isFunction(contentView.render))
				contentView.render(container);
			else
				container.append(contentView);
		}
	}
});
