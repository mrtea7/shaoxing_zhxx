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
                    routerUrl: "aaa",
                    children: [
                        {name: "移动设备管理", routerUrl: "aaa/a1a1a1"},
                        {name: "登陆日志", routerUrl: "aaa/a2a2a2"}
                    ]
                }, {
                    grp: "企业设置",
                    icon: "#icon-search",
                    routerUrl: "bbb",
                    children: [
                        {name: "工作设置", routerUrl: "bbb/b1b1b1"},
                        {name: "企业信息", routerUrl: "bbb/b2b2b2"}
                    ]
                }, {
                    grp: "系统设置",
                    icon: "#icon-search",
                    routerUrl: "ccc",
                    children: [
                        {name: "工作设置", routerUrl: "ccc/b1b121b1"},
                        {name: "工作设置", routerUrl: "ccc/b1b132b1"},
                        {name: "工作设置", routerUrl: "ccc/2"},
                        {name: "工作设置", routerUrl: "ccc/b11b1b31"},
                        {name: "工作设置", routerUrl: "ccc/b132b1b1"},
                        {name: "工作设置", routerUrl: "ccc/b1b12b1"},
                        {name: "企业信息", routerUrl: "ccc/b2b22b2"}
                    ]
                }, {
                    grp: "系统设置",
                    icon: "#icon-search",
                    routerUrl: "ddd",
                    children: [
                        {name: "工作设置", routerUrl: "ddd/b11b1"},
                        {name: "工作设置", routerUrl: "ddd/b1b12b1"},
                        {name: "工作设置", routerUrl: "ddd/b123b1b1"},
                        {name: "工作设置", routerUrl: "ddd/beb1"},
                        {name: "工作设置", routerUrl: "ddd/b1bw1b1"},
                        {name: "工作设置", routerUrl: "ddd/b1bw1"},
                        {name: "工作设置", routerUrl: "ddd/b1b14b1"},
                        {name: "工作设置", routerUrl: "ddd/b1sb1b1"},
                        {name: "工作设置", routerUrl: "ddd/b1b1sb1"},
                        {name: "工作设置", routerUrl: "ddd/b1bxx1b1"},
                        {name: "工作设置", routerUrl: "ddd/b1bx1b1"},
                        {name: "企业信息", routerUrl: "ddd/b2bz2b2"}
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
                item.attr("router-url", data.routerUrl).write("<svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-down'></use></svg>")
            }

            var secondMenuList = firstMenuItem.appendAndGet("<ul class='second-menu-list hide'></ul>");
            Utils.each(data.children, function (data) {
                var secondMenuItem = secondMenuList.appendAndGet("<li class='second-menu'></li>");
                var item = secondMenuItem.appendAndGet("<a> " + data.name + "</a>")
                item.attr("router-url", data.routerUrl);
                if (data.name === currentMenu)
                    secondMenuItem.addClass("selected");
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
