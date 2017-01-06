/**********************************************************
 * 系统路由适配器，控制用户请求与视图及服务的关系
 * 即根据用请求，获取相应的视图，或者执行相应的服务接口
 *********************************************************/

var VRender = require("v-render");
var SysConfig = require("../config/sys_config");
var ServiceManager = require("./ServiceManager");


var Utils = VRender.Utils;

var RouterAdapter = module.exports = function (context) {
    this.context = context;
};

// 数据接口相关受理方法
RouterAdapter.prototype.action = function (name, params, callback) {
    var service = ServiceManager.getService(name);
    if (service) {
        service.do(params.session, name, params.data, callback);
        return true;
    }
    return false;
};

// 用户请求预处理
RouterAdapter.prototype.before = function (pathname, params) {
    VRender.logger.debug("<RouterAdapter.before>", "pathname:", pathname);
    if (pathname === "/")
        return "/admin/index"; // 用户访问域名地址，进入首页
};

// 路由方法，获取相应的页面视图
RouterAdapter.prototype.router = function (name, params, path, callback) {
    var routers = name.substr(1).split("/");
    if (routers[0] === "admin")
        return routerAsAdmin(routers, params, callback);
    else if (routers[0] === "module")
        return routerAsModule(routers, params, callback);
    return false;
};

///////////////////////////////////////////////////////////
// 管理系统页面路由方法，返回的是完整页面内容，适用于用户直接从浏览器地址栏访问系统
// 比如用户直接访问“http://www.xxx.com/admin/module_name”，这时候需要的是一个全新的页面
var routerAsAdmin = function (routers, params, callback) {
    if (routers[1] === "login") {
        // 进入登录模块，不需要验证，直接返回登录页面
        callback(VRender.RouterStatus.OK, "./framework/portal/login/LoginView");
    }
    else {
        Utils.exec([isUserValidate, tryUserInfo], params, function (err) {
            if (err === "invalid")
                callback(VRender.RouterStatus.OK, "./framework/portal/login/LoginView");
            else 
                callback(VRender.RouterStatus.OK, "./framework/portal/admin/MainView");
        });
    }
    return true;
};

// 模块路由方法，一般返回的是网页片段，比如单例页面模块之间的切换
var routerAsModule = function (routers, params, callback) {
    // var names = name.substr(1).split("/");
    // var moduleName = names[1];
    //     var ModuleView = SysConfig.modules[moduleName];
    //     if (ModuleView) {
    //         callback(VRender.RouterStatus.OK, ModuleView);
    //     }
    //     else {

    //     }
    // callback(VRender.RouterStatus.OK, {data: "It's a module"});
    return false;
};

///////////////////////////////////////////////////////////
// 判断当前用户是否有效（已登录、未过期）
var isUserValidate = function (params, callback) {
    var session = params.session;
    if (session && session.loginDate) {
        callback(false, params); // 用户已登录
    }
    else {
        callback("invalid", params);
    }
};

// 试图加载用户信息，以防 NodeJS 重启用户信息丢失
var tryUserInfo = function (params, callback) {
    callback(false, params);
};
