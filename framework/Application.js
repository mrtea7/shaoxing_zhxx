/**********************************************************
 * 应用程序设计，是系统运行的主体，一个应用实例只能有一个实体。
 * 该类承载的是系统运行时的环境，变量定义及初始化
 *********************************************************/

// 全局定义：系统运行时的根目录，方便系统内使用
global.__basedir = require("path").resolve(__dirname, "../");
// 当前应用程序入口名称
global.__app = __dirname + "/Application";


var VRender = require("v-render");
var SysConfig = require("./config/sys_config");

var Utils = VRender.Utils;


///////////////////////////////////////////////////////////
var Application = module.exports;

// 运行时当前应用的 VRender 框架实例
var vrenderInstance = null;

// 启动应用程序，设置启动时初始化参数
// 默认参数都已经在“/framework/config/sys_config.js”中配置
Application.setup = function (options) {
    var params = Utils.extend({}, SysConfig, options);
    Application.configs = params;
    vrenderInstance = VRender.create().initialize(params).run();
};

// 动态设置或者获取当前应用配置信息
Application.config = function (name, value) {
	if (!Application.configs)
		Application.configs = {};

	// 如果 name 参数无效，返回所有当前配置信息
	if (Utils.isBlank(name))
		return Application.configs;

	// 如果 value 参数有效，将修改当前相应配置
	if (Utils.isNotNull(value))
		Application.configs[name] = value;

	return Application.configs[name];
};

// 判断当前用户是否在测试环境
Application.isTest = function (session) {
	if (session && Utils.isFunction(session.getUserHost))
		return /local|192|dev/.test(session.getUserHost());
	return false;
};

///////////////////////////////////////////////////////////
// 捕获系统未知异常，防止 NodeJS 奔溃挂了
process.on("uncaughtException", function (err) {
	vrenderInstance && vrenderInstance.logger.error(err);
});
