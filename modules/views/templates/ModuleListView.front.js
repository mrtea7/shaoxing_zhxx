/**********************************************************
 * 列表视图前端脚本
 *********************************************************/

define("tmpl.listview", function ($, VR, Utils) {

	var ModuleListView = function (target, options) {
		this.options = options || {};
		this.$el = $(target);
	};
	var _ModuleListView = ModuleListView.prototype = new VR.EventEmitter();

	///////////////////////////////////////////////////////
	return VR.frontComponent(".app-tmpl-listview", ModuleListView, function (target, options) {

	});

});
