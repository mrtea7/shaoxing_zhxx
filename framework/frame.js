/**********************************************************
 * 应用前端框架脚本设计，对象“frame”将作为全局对象，代表当前系统运行的环境，以及应用级别的功能设计。
 *********************************************************/

define("frame", function ($, VR, Utils) {
    if (window.frame)
        return ;

    var frame = window.frame = function () {};

    // 当前主页视图
    var mainView = null;

    ///////////////////////////////////////////////////////
    // 路由方法，实现模块切换，页面跳转
    // @params state 路由信息，包含：portal, module, action, params，也可以是URL
    // @params replace 是否替换当前路由，用新路由替换当前的路由，即在点击浏览器后退按钮时跳过现在的模块，默认为false
    // @params trigger 是否触发路由变更事件，模块切换通过监听路由变更事件来实现，如果不触发事件模块将不会切换，默认为true
    frame.navigate = function (state, replace, trigger) {
        var url = (typeof state === "string") ? state : null;
        if (url) {
            state = getRouterByUrl(url);
        }
        else {
            state = (typeof state === "object") ? state : {};
            if (!state.portal && (state.module || state.action || state.params))
                state.portal = frame.getCurrentPortal() || "admin";
            if (!state.module && (state.action || state.params))
                state.module = frame.getCurrentModule() || "index";
            if (!state.action && frame.params)
                state.action = frame.getCurrentAction();

            url = "/";
            if (state.portal) {
                url += state.portal;
                if (state.module) {
                    url += "/" + state.module;
                    if (state.action)
                        url += "/" + state.action.replace(/\./g, "/");
                }
            }
            if (state.params) {
                var queryString = $.param(state.params);
                if (queryString)
                    url += "?" + queryString;
            }
            if (state.hash)
                url += "#" + state.hash;
        }

        state.replace = Utils.isTrue(replace);
        state.trigger = Utils.isNull(trigger) ? true : Utils.isTrue(trigger);

        frame.currentRouter = state;
        VR.navigate(url, state);
    };

    // 当前系统门户
    frame.getCurrentPortal = function () {
        return frame.currentRouter && frame.currentRouter.portal;
    };

    // 当前系统模块
    frame.getCurrentModule = function () {
        return frame.currentRouter && frame.currentRouter.module;
    };

    // 当前系统模块内子功能
    frame.getCurrentAction = function () {
        return frame.currentRouter && frame.currentRouter.action;
    };

    // 当前路由参数信息，URL上的参数信息
    frame.getCurrentParams = function (name) {
        var params = frame.currentRouter && frame.currentRouter.params;
        return (Utils.isNotBlank(name) && params) ? params[name] : params;
    };

    // 根据URL初始化路由信息
    var getRouterByUrl = function (url) {
        var URL = Utils.parseUrl(url);
        var routers = URL.pathname.substr(1).split("/");

        var router = {};
        if (routers.length > 0) {
            router.portal = routers[0];
            routers.shift();
            if (routers.length > 0) {
                router.module = routers[0];
                routers.shift();
            }
        }

        if (routers.length > 0)
            router.action = routers.join(".");

        router.params = URL.params;

        return router;
    };

    ///////////////////////////////////////////////////////
    frame.tooltip = function (msg, type, delay, callback) {

    };

    ///////////////////////////////////////////////////////
    frame.showDetails = function (url, params, callback) {
        if (mainView && Utils.isFunction(mainView.showDetails))
            mainView.showDetails(url, params, callback);
    };

    ///////////////////////////////////////////////////////
    $(function () {
        frame.currentRouter = getRouterByUrl(window.location.href);

        requirejs("mainview", function (View) { mainView = View; });
    });

});
