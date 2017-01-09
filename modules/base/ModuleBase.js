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
        if (view instanceof VRender.UIView) {
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
            if (this.moduleView instanceof VRender.UIView)
                this.moduleView.render(this.$el);
            else
                this.$el.append(this.moduleView);
        }
    },

    // 获取带有标题栏的模块视图
    getModuleView: function (module, action, params, viewHandler) {
        var moduleView = new ModuleView(this);
        var moduleInfo = ModuleManager.getModuleInfos(module, action);
        return moduleView;
    },

    getCurrentModuleView: function (viewHandler) {
        return this.getModuleView(this.moduleName, this.actionName, this.params, viewHandler);
    }
});
