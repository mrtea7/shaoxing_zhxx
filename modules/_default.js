/**********************************************************
 * 默认的模块视图，当用户访问的模块不存在时，显示该模块视图
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var DefaultModule = ModuleBase.extend(module, {
	id: "mod-default",

	getView: function (module, action, params) {
		VRender.logger.warn("获取模块信息失败：不存在的模块。module: %s, action: %s, params: %s", 
			module, action, JSON.stringify(params));
		return "<div>没有模块信息</div>";
	}
});
