/**********************************************************
 * 应用前端框架脚本设计，对象“frame”将作为全局对象，代表当前系统运行的环境，以及应用级别的功能设计。
 *********************************************************/

define("frame", function ($, VR, Utils) {
    if (window.frame)
        return;
    var body = $("body");
    var tipTitle = {"success": "操作成功！", "error": "对不起，出错啦！", "warn": "警告！！"};

    var frame = window.frame = function () {};

    // 当前主页视图
    var mainView = null;

    ///////////////////////////////////////////////////////
    frame.data = {
        get: function (name, clear) {
            var value = VR.cache(name);
            if (clear)
                VR.cache(name, null);
            return value;
        },
        set: function (name, value) {
            VR.cache(name, value);
        }
    };

    frame.setCurrentUser = function (user) {
        frame.data.set("sys_user_data", user);
        frame.data.set("sys_user_humanid", (user && user.humanid));
        if (user) {
            frame.data.set("sys_last_user_mobile", user.mobile);
        }
    };

    frame.getCurrentUser = function () {
        return frame.data.get("sys_user_data");
    };

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

    // 提示信息，type有success, error, warn，默认是error
    frame.tooltip = function (text, type, delay, closeHandler) {
        if (typeof type !== "string")
            type = Utils.isTrue(type) ? "success" : "error";

        var view = $("<div id='app-tooltip'></div>").appendTo(body).addClass(Utils.isBlank(type) ? "error" : type);
        var content = $("<div class='content'><span class='close'></span></div>").appendTo(view);
        $("<div class='title'></div>").appendTo(content).text(tipTitle[type] || type || "温馨提示！！");
        $("<div class='text'></div>").appendTo(content).html(text);

        var startCloseTimer = function () {
            return setTimeout(function() {
                content.children(".close").trigger("click");
            }, (delay || 3000));
        };

        var timerId = startCloseTimer();

        content.children(".close").on("click", function (e) {
            clearTimeout(timerId);
            view.fadeOut("slow", function () { view.remove(); });
            if (closeHandler && (typeof closeHandler === "function"))
                closeHandler();
        });

        content.children(".text").on("click", function (e) {
            view.toggleClass("fullmsg");
        });

        content.on("mouseenter", function (e) {
            clearTimeout(timerId);
        });

        content.on("mouseleave", function (e) {
            timerId = startCloseTimer();
        });

        return type === "success";
    };
    // 确认对话框
    frame.confirm = function (options) {
        if (typeof options === "string")
            options = {text: options};
        options = options || {};

        var wrapper = $("<div class='mfh-confirm-wrapper'></div>").appendTo("body");
        target = $("<div class='mfh-confirm'></div>").appendTo(wrapper).addClass(options.type || "warn");
        $("<div class='title'></div>").appendTo(target).text(options.title || "请确认！");
        var content = $("<div class='content'></div>").appendTo(target);
        $("<div class='caption'></div>").appendTo(content).append(options.content || options.text);
        $("<div class='desc'></div>").appendTo(content).append(options.remark || options.description || options.desc);
        var buttons = Utils.toArray(options.buttons);
        if (buttons.length === 0)
            buttons = [{name: "yes", label: "是"}, {name: "no", label: "否"}];
        var btns = $("<div class='btns'></div>").appendTo(target).addClass("btns" + buttons.length);
        Utils.each(buttons, function (temp) {
            $("<button></button>").appendTo(btns).text(temp.label).attr("name", temp.name);
        });
        target.append("<span class='close'></span>");

        body.children("#main-body").addClass("blur");

        var handler = {
            done: function (value) {
                if (Utils.isFunction(value))
                    this.doneHandler = value;
                else {
                    if (Utils.isFunction(this.doneHandler))
                        this.doneHandler();
                    this.btnclk(value);
                }
                return this;
            },

            cancel: function (value) {
                if (Utils.isFunction(value))
                    this.cancelHandler = value;
                else {
                    if (Utils.isFunction(this.cancelHandler))
                        this.cancelHandler();
                    this.btnclk(value);
                }
                return this;
            },

            btnclk: function (value) {
                if (Utils.isFunction(value))
                    this.buttonHandler = value;
                else {
                    if (Utils.isFunction(this.buttonHandler))
                        this.buttonHandler(value);
                    wrapper.remove();
                    body.children("#main-body").removeClass("blur");
                }
                return this;
            }
        };

        target.on("click", ".close, .btns > button", function (e) {
            var btn = $(e.currentTarget), name = btn.attr("name");
            if (btn.is(".close"))
                name = "close";
            if (name == "yes" || name == "ok" || name == "submit")
                handler.done(name);
            else if (name == "no" || name == "cancel" || name == "close")
                handler.cancel(name);
            else
                handler.btnclk(name);
        });

        return handler;
    };
    //加载菊花
    frame.waitting = function (target, style) {
        target = $(target || "body");
        target.children(".mfh-loading").remove();

        var wait = $("<div class='mfh-loading'></div>").appendTo(target);
        if (target.is("body")) {
            $("html").addClass("ui-scrollless");
            wait.addClass("mfh-loading-screen");
        }
        else
            wait.addClass(style || "mfh-loading-cover");

        return {
            remove: function () {
                wait.remove();
                if (target.is("body"))
                    $("html").removeClass("ui-scrollless");
            }
        };
    };
    ///////////////////////////////////////////////////////
    frame.showDetails = function (url, params, callback) {
        if (mainView && Utils.isFunction(mainView.showDetails))
            mainView.showDetails(url, params, callback);
    };
    frame.hideDetails = function () {
        if (mainView && Utils.isFunction(mainView.hideDetails))
            mainView.hideDetails();
    };
    VR.Component.dataAdapter = function (data) {
        if (Utils.notNull(data)) {
            var total = parseInt(data.total || 0);
            if (Utils.isArray(data)) {
                total = data.length;
            }
            else {
                data = data.rows || data.options || data.codeValueList || data;
            }
            data = Utils.map(Utils.toArray(data), function (temp) {
                if (temp.caption && temp.bean)
                    return $.extend({origin: temp}, temp.bean, temp.caption);
                return temp.bean || temp;
            });
            return {total: total, results: data};
        }
        return data;
    };

    ///////////////////////////////////////////////////////
    $(function () {
        frame.currentRouter = getRouterByUrl(window.location.href);

        requirejs("mainview", function (View) {
            mainView = View;
        });
    });

});
