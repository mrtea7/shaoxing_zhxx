/**********************************************************
 * 列表视图前端脚本
 *********************************************************/

define("tmpl.listview", function ($, VR, Utils) {

	var ModuleListView = function (target, options) {
		this.options = options || {};
		this.$el = $(target);

		var self = this;
		this.$el.on("click", "header > .btnbar .btn", function (e) { return topButtonHandler.call(self, e); });
	};
	var _ModuleListView = ModuleListView.prototype = new VR.EventEmitter();

	///////////////////////////////////////////////////////
	var topButtonHandler = function (e) {
		var btn = $(e.currentTarget);

		var dropdown = btn.children(".dropdown");
		if (dropdown && dropdown.length > 0) {
			dropdown.show();
			btn.off("mouseenter").on("mouseenter", function (e) {
				var timerId = parseInt(btn.attr("timerid"));
				if (timerId)
					clearTimeout(timerId);
			});
			btn.off("mouseleave").on("mouseleave", function (e) {
				var timerId = setTimeout(function () {
					dropdown.hide();
					btn.off("mouseenter").off("mouseleave").removeAttr("timerid");
				}, 500);
				btn.attr("timerid", timerId);
			});
		}

		if (btn.parent().is(".dropdown"))
			btn.parent().hide();

		return false;
	};

	///////////////////////////////////////////////////////
	return VR.frontComponent(".app-tmpl-listview", ModuleListView);

});
