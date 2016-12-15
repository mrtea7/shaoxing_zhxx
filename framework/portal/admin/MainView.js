var VRender = require("v-render");
var HeaderView = require("./HeaderView");
var SideMenuView = require("./SideMenuView");
var ModuleView = require("./ModuleView");
var ContainerView = require("./ContainerView");
var DetailView = require("./DetailView");
var CustomerView = require("../../../modules/customer/CustomerView");


var MainView = VRender.SinglePageView.extend(module, {
    readyCode: "mainView",

    doInit: function () {
        MainView.__super__.doInit.call(this);

        var self = this;


        var paths = this.options.pathname.substr(1).split("/");

        this.moduleName = this.options.moduleName = paths[2];

        this.moduleView = new ModuleView(this, this.options);

        this.sideMenu = new SideMenuView(this, {active: this.moduleName});
        // this.sideMenu.ready(function () {
        //     self.ready("mainView");
        // });

        this.allReady([this.moduleView, this.sideMenu], function () {
            self.ready("mainView");
        });
    },

    renderBody: function (body) {
        MainView.__super__.renderBody.call(this, body);

        var mainBody = VRender.$("<div class='main-body'></div>").appendTo(body);

        new HeaderView(this).render(mainBody);

        this.sideMenu.render(mainBody);

        this.moduleView.render(mainBody);

        new ContainerView(this).render(mainBody);

        var mainDetail = VRender.$("<div class='main-detail'></div>").appendTo(body);


        new DetailView(this).render(mainDetail);

        // var mainContainer = VRender.$("<div id='main-conatiner'>container</div>").appendTo(mainBody);

        // body.append("<div id='main-detail'>detail</div>");

        // new CustomerView(this).render(ContainerView);
    },

    getSinglePageContainer: function () {
        return ".main-container";
    }
});

MainView.import(["/theme/css/style.css", "/theme/css/main.css", "/iconfont/iconfont.css"]);
MainView.import(["../../frame.js", "/js/main.js", "/iconfont/iconfont.js"]);
