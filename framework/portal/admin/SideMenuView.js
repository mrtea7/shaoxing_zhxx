/**********************************************************
 * 主页面左边菜单视图，显示系统模块菜单，是各模块的入口链接
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var default_menus = require("../../config/sys_modules").modules;

var SideMenuView = VRender.UIView.extend(module, {
    className: "sidemenu",
    readyCode: "view.main.menu",
    
    doInit: function () {
        SideMenuView.__super__.doInit.call(this);

        // TODO 获取当前用户的模块信息
        this.menus = this.getSession().get("user_menus") || default_menus;
        // this.menus = this.getSession().get("user_menus");
        this.ready("view.main.menu");
    },

    renderView: function () {
        SideMenuView.__super__.renderView.call(this);

        var routers = this.getSession().currentRouter || "/";
        routers = routers.substr(1).split("/");

        var self = this;
        var menuList = this.$el.appendAndGet("<ul class='menu-list'></ul>");
        Utils.each(this.menus, function (data) {
            var menu = self.renderMenuItem(menuList, data);

            var isSelected = data.text === routers[1];
            if (isSelected)
                menu.addClass("selected").addClass("open");

            var children = Utils.toArray(data.subMenus);
            if (children.length > 0) {
                menu.addClass("has-child");
                var subMenus = menu.appendAndGet("<ul class='submenu-list'></ul>");
                Utils.each(children, function (temp, i) {
                    var submenu = self.renderSubMenuItem(subMenus, temp);
                    if (isSelected && (!routers[2] || routers[2] === temp.text)) {
                        submenu.addClass("selected");
                    }
                });
            }
        });
    },

    renderMenuItem: function (target, data) {
        var item = target.appendAndGet("<li class='menu'></li>");
        item.attr("name", data.text);

        var title = item.appendAndGet("<div class='title'></div>");
        title.text(data.title || data.text || "未知");

        if (data.text) {
            title.append("<span class='icon'><i class='iconfont " + data.text + "'></i></span>");
        }

        return item;
    },

    renderSubMenuItem: function (target, data) {
        var item = target.appendAndGet("<li class='menu submenu'></li>");
        item.attr("name", data.text);

        var title = item.appendAndGet("<div class='title'></div>");
        title.text(data.title || data.text || "未知");

        return item;
    }
});
