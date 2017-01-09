/**********************************************************
 * 应用模块管理类
 *********************************************************/

var VRender = require("v-render");
var SysConfig = require("../config/sys_config");
var ModuleInfos = require("../config/sys_modules").modules;


var Utils = VRender.Utils;

var ModuleManager = module.exports;

// 根据模块名称获取模块视图文件路径
ModuleManager.getModuleFile = function (moduleName, actionName) {
	var moduleInfo = ModuleManager.getModuleInfos(moduleName, actionName);
	return moduleInfo ? moduleInfo.viewpath : null;
};

// 获取模块信息
ModuleManager.getModuleInfos = function (moduleName, actionName) {
	var result = {names: [], viewpath: null};
	var module = Utils.find(ModuleInfos, function (temp) {
		return temp.name === moduleName;
	});
	if (module) {
		result.icon = module.icon;
		result.viewpath = module.viewpath;
		result.names.push(module.title || module.name);
		result.items = [module];

		var actions = actionName.split(".");
		while (module && module.children && actions.length > 0) {
			var module = Utils.find(module.children, function (tmp) {
				return tmp.name === actions[0];
			});
			if (module) {
				result.viewpath = module.viewpath || result.viewpath;
				result.names.push(module.title || module.name);
				result.items.push(module);
			}
		}
	}
	return result;
};
