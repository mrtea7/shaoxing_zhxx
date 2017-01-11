/**********************************************************
 * 应用模块基础类
 *********************************************************/

var VRender = require("v-render");
var ModuleView = require("./ModuleView");
var ModuleManager = require(__basedir + "/framework/main/ModuleManager");


var Utils = VRender.Utils;

var ModuleBase = VRender.Fragment.extend(module, {
    readyCode: "module.base",

    doInit: function () {
        ModuleBase.__super__.doInit.call(this);

        // 当前模块路由信息
        var routers = this.getSession().currentRouter || "";
        routers = routers.substr(1).split("/");

        // 模块名称
        this.moduleName = routers[1] || "index";
        // 功能模块
        this.actionName = routers.slice(2).join(".");
        // 参数信息
        this.params = this.options.requestData;

        this.moduleView = this.initView();
    },

    // 初始化模块视图信息，根据当前模块路由信息获取相应的视图
    initView: function () {
        var view = this.getView(this.moduleName, this.actionName, this.params);
        if (view && Utils.isFunction(view.ready)) {
            var self = this;
            view.ready(function () {
                self.ready("module.base");
            });
        }
        else {
            this.ready("module.base");
        }
        return view;
    },

    // 获取模块视图，由子类去实现
    getView: function (module, action, params) {
        //
    },

    render: function (output) {
        ModuleBase.__super__.render.call(this, output);
        this.$el.addClass("app-module");

        if (this.moduleView) {
            var moduleView = this.moduleView;
            if (Utils.isFunction(moduleView.render)) {
                if (moduleView instanceof ModuleView) {
                    if (this.params && !!this.params.need_title)
                        this.$el.addClass("show-head");
                }
                moduleView.render(this.$el);
            }
            else
                this.$el.append(moduleView);
        }
    },

    // 获取带有标题栏的模块视图
    getModuleView: function (module, action, params, viewHandler) {
        var moduleView = new ModuleView(this);
        moduleView.setHeaderVisible(params && params.need_title);
        var moduleInfo = ModuleManager.getModuleInfos(module, action);
        if (moduleInfo) {
            moduleView.setIcon(moduleInfo.icon);
            moduleView.setTitle(this.getModuleTitle(moduleInfo));
            moduleView.setDescription(moduleInfo.desc);
            if (Utils.isFunction(viewHandler)) {
                var viewpath = viewHandler(moduleView);
                if (Utils.isNotBlank(viewpath)) {
                    if (typeof viewpath === "string") {
                        var PageView = this.use(viewpath);
                        moduleView.setContentView(new PageView(this, {params: params}));
                    }
                    else if (viewpath instanceof VRender.UIView) {
                        moduleView.setContentView(viewpath);
                    }
                    else if (viewpath.hasOwnProperty("html")) {
                        moduleView.setContentView(viewpath.html);
                    }
                    else {
                        moduleView.setContentView(viewpath);
                    }
                }
            }
        }
        return moduleView.end();
    },

    getCurrentModuleView: function (viewHandler) {
        return this.getModuleView(this.moduleName, this.actionName, this.params, viewHandler);
    },

    getModuleTitle: function (moduleInfo) {
        return Utils.map(moduleInfo.items, function (item) {
            return "<span class='item'>" + item.title + "</span>";
        }).join("");
    }
});
