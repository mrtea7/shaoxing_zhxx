var VRender = require("v-render");


var Utils = VRender.Utils;

var SideMenuView = VRender.Fragment.extend(module, {
    className: "main-sideMenu",
    readyCode: "main.sideMenu",
    doInit: function () {
        SideMenuView.__super__.doInit.call(this);
        var self = this;
        setTimeout(function () {
            self.menus = [
                {
                    grp: "账号安全",
                    icon: "#icon-exit",
                    module: "safe",
                    children: [
                        {name: "移动设备管理", moduleName: "mobile"},
                        {name: "登陆日志", moduleName: "login"}
                    ]
                }, {
                    grp: "企业设置",
                    icon: "#icon-search",
                    module: "company",
                    children: [
                        {name: "工作信息", moduleName: "work"},
                        {name: "企业设置", moduleName: "setting"}
                    ]
                }, {
                    grp: "系统设置",
                    icon: "#icon-search",
                    module: "ccc",
                    children: [
                        {name: "工作设置", moduleName: "ccc/b1b121b1"},
                        {name: "工作设置", moduleName: "ccc/b1b132b1"},
                        {name: "工作设置", moduleName: "ccc/2"},
                        {name: "工作设置", moduleName: "ccc/b11b1b31"},
                        {name: "工作设置", moduleName: "ccc/b132b1b1"},
                        {name: "工作设置", moduleName: "ccc/b1b12b1"},
                        {name: "企业信息", moduleName: "ccc/b2b22b2"}
                    ]
                }, {
                    grp: "系统设置",
                    icon: "#icon-search",
                    module: "ddd",
                    children: [
                        {name: "工作设置", moduleName: "ddd/b11b1"},
                        {name: "工作设置", moduleName: "ddd/b1b12b1"},
                        {name: "工作设置", moduleName: "ddd/b123b1b1"},
                        {name: "工作设置", moduleName: "ddd/beb1"},
                        {name: "工作设置", moduleName: "ddd/b1bw1b1"},
                        {name: "工作设置", moduleName: "ddd/b1bw1"},
                        {name: "工作设置", moduleName: "ddd/b1b14b1"},
                        {name: "工作设置", moduleName: "ddd/b1sb1b1"},
                        {name: "工作设置", moduleName: "ddd/b1b1sb1"},
                        {name: "工作设置", moduleName: "ddd/b1bxx1b1"},
                        {name: "工作设置", moduleName: "ddd/b1bx1b1"},
                        {name: "企业信息", moduleName: "ddd/b2bz2b2"}
                    ]
                }
            ];
            self.ready("main.sideMenu");
        }, 1000);
    },

    renderView: function () {
        SideMenuView.__super__.renderView.call(this);

        var currentMenu = this.options.active;

        var menuList = VRender.$("<ul class='menu-list'></ul>").appendTo(this.$el);
        Utils.each(this.menus, function (data) {
            var firstMenuItem = menuList.appendAndGet("<li class='first-menu'></li>");
            var item = firstMenuItem.appendAndGet("<a><svg class='icon icon-left'><use xlink:href='#icon-search'></use></svg> " + data.grp + "</a>");
            if (data) {
                item.attr("module", data.module).write("<svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-down'></use></svg>")
            }

            var secondMenuList = firstMenuItem.appendAndGet("<ul class='second-menu-list'></ul>");
            Utils.each(data.children, function (data) {
                var secondMenuItem = secondMenuList.appendAndGet("<li class='second-menu'></li>");
                var item = secondMenuItem.appendAndGet("<a> " + data.name + "</a>");
                item.attr("moduleName", data.moduleName);
                if (data.name === currentMenu)
                    secondMenuItem.addClass("second-menu-selected");
            });
        });

        // var menuTag = VRender.$("<ul></ul>").appendTo(this.$el);
        // Utils.each(this.menus, function (menu) {
        //     menuTag.write("<aside>" +
        //         " <ul class='menu-list'>" +
        //         "<li id=''><a class='selected'>" +
        //         "<svg class='icon'><use xlink:href='" + parseInt(menu.icon) + "'></use></svg>" +
        //         menu.menuName +
        //         "</a>" +
        //         "<ul><li><a>子菜单</a></li></ul>" +
        //         "</li>" +
        //         "</ul>" +
        //         "</aside>");
        // });
    }
});
