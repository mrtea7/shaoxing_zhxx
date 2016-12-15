
var VRender = require("v-render");
var SysConfig = require("../config/sys_config");

var RouterAdapter = module.exports = function (context) {
    this.context = context;
};

// RouterAdapter.prototype.file = function (filepath, params, callback) { console.log("innm")
//     // if (/style/.test(filepath)) {
//     //         callback(VRender.RouterStatus.OK, "<h1>路由适配器 file() 方法受理结果</h1>");
//     //         return true;
//     // }
//     return false;
// };

// 路由转发之前，根据当前路由返回一个新的路由，该方法可以用来改变路由
// @param pathname 当前的路由名称，实际就是 url 地址中的 pathname (host 和 search 之间的部分)
// @param params 当前请求信息，包含用户和 url 参数信息
// @return 返回新路由，返回为空时路由不变
RouterAdapter.prototype.before = function (pathname, params) {
    // console.log(pathname)
    // if (pathname.indexOf("customer") > 0)
    //     return "/admin/manager";
    // 注：返回的是新路由
};

// 路由方法，根据路由名称获取视图文件路径，路径相对于config.cwd
// @param name 当前路由名称，已经过 before() 方法转换
// @param params 参数集，包含session, data等
// @param path 在config.router.map配置中获得的视图路径，该方法可以做进一步处理
// @param callback 回调方法，返回路由状态和新的视图路径，型如：function (state, newpath) {}
// @return 为 true 时表示文件请求被接管，必须执行callback()方法；为 false 时表示请求未受理
RouterAdapter.prototype.router = function (name, params, path, callback) {
    var names = name.substr(1).split("/");
    if (names[0] === "admin") {
        // callback(VRender.RouterStatus.OK, "./framework/main/MainView");
        callback(VRender.RouterStatus.OK, "./framework/portal/admin/MainView");
        return true;
    }
    else if (names[0] === "module") {
        var moduleName = names[1];
        var ModuleView = SysConfig.modules[moduleName];
        if (ModuleView) {
            callback(VRender.RouterStatus.OK, ModuleView);
        }
        else {

        }
        return true;
    }
    return false;
};
