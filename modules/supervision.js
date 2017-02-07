/**********************************************************
 * 督查督办模块
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var Utils = VRender.Utils;

var SupervisionModule = ModuleBase.extend(module, {
	id: "app-supervision",

	getView: function (module, action, params) {
		if (/todo/.test(action))
			return this.getSupervisionTodoView(module, action, params);
		return this.getSupervisionDoneView(module, action, params);
	},

	///////////////////////////////////////////////////////
	getSupervisionTodoView: function (module, action, params) {
		return this.getCurrentModuleView(function (mview) {
			if (action === "todo.detail")
				return __dirname + "/views/supervision/todo/TodoDetailView";
			if (action === "todo.edit")
				return __dirname + "/views/supervision/todo/TodoEditView";
			return __dirname + "/views/supervision/todo/TodoListView";
		});
	},

	///////////////////////////////////////////////////////
	getSupervisionDoneView: function (module, action, params) {
		return this.getCurrentModuleView(function (mview) {
			if (action === "done.detail")
				return __dirname + "/views/supervision/done/DoneDetailView";
			if (action === "done.edit")
				return __dirname + "/views/supervision/done/DoneEditView";
			return __dirname + "/views/supervision/done/DoneListView";
		});
	}
});
