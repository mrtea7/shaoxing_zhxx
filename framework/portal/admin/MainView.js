/**********************************************************
 * 主视图设计，包含页面头部、脚部、模块菜单、工作区和详情区
 * 该页面为单例应用，功能模块之间的切换不会刷新页面，动态更新工作区内容
 *********************************************************/

var VRender = require("v-render");
var HeaderView = require("./HeaderView");
var SideMenuView = require("./SideMenuView");
var ModuleManager = require("../../main/ModuleManager");


var Utils = VRender.Utils;

var MainView = VRender.SinglePageView.extend(module, {
    readyCode: "view.main",

    doInit: function () {
        MainView.__super__.doInit.call(this);

        // 初始化相关视图，因为可能涉及到视图内部的异步加载，我们在 doInit() 中创建
        this.headerView = new HeaderView(this, this.options);
        this.sideMenuView = new SideMenuView(this, this.options);
        this.moduleView = this.getCurrentModuleView();

        var self = this;
        this.allReady([this.headerView, this.sideMenuView, this.moduleView], function () {
            self.ready("view.main");
        });
    },

    // 根据路由信息获取当前的模块视图
    getCurrentModuleView: function () {
        var routers = this.getSession().currentRouter || "/";
        routers = routers.substr(1).split("/");

        var moduleName = routers[1] || "";
        var actionName = routers.slice(2).join(".");

        var moduleFile = ModuleManager.getModuleFile(moduleName, actionName);
        if (!moduleFile) {
            moduleFile = "./modules/_default";
        }
        moduleFile = this.getContext().getBasedPath(moduleFile);


        try {
            var ModuleView = this.use(moduleFile);
            var options = this.options || {};
            if (!options.requestData)
                options.requestData = {};
            options.requestData.need_title = 1;
            return new ModuleView(this, options);
        }
        catch (e) {
            VRender.logger.error("<MainView.getCurrentModuleView>", e.toString());
            return "<div class='text-error'>" + e.toString() + "</div>";
        }

        return "出错了！！";
    },

    renderBody: function (body) {
        MainView.__super__.renderBody.call(this, body);

        var mainBody = VRender.$("<div id='main-body'></div>").appendTo(body);

        if (this.headerView)
            this.headerView.render(mainBody);

        var mainContainer = VRender.$("<div class='main-container'></div>").appendTo(mainBody);

        if (this.sideMenuView)
            this.sideMenuView.render(mainContainer);

        var container = VRender.$("<div class='container'></div>").appendTo(mainContainer);
        if (this.moduleView) {
            if (Utils.isFunction(this.moduleView.render))
                this.moduleView.render(container);
            else
                container.write(this.moduleView);
        }

        mainBody.write("<div class='main-detail'></div>");
    },

    getSinglePageContainer: function () {
        return "#main-body > .main-container > .container";
    },

    getPageTitle: function () {
        return "综合信息管理系统";
    }
});

MainView.import(["/css/base.css", "/css/main.css", "/css/iconfont.css","/css/frame.css"], {group: "main", index: 0});
MainView.import(["../../frame.js", "/js/main.js"], {group: "main", index: 0});
