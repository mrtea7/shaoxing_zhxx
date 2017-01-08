/**********************************************************
 * 主页面左边菜单视图，显示系统模块菜单，是各模块的入口链接
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var default_menus = require("../../config/sys_menus").menus;

var SideMenuView = VRender.UIView.extend(module, {
    className: "sidemenu",
    readyCode: "view.main.menu",
    
    doInit: function () {
        SideMenuView.__super__.doInit.call(this);

        // TODO 获取当前用户的模块信息
        this.menus = default_menus;

        this.ready("view.main.menu");
    },

    renderView: function () {
        SideMenuView.__super__.renderView.call(this);

        var routers = this.getSession().currentRouter || "";
        routers = routers.substr(1).split("/");

        var self = this;
        var menuList = this.$el.appendAndGet("<ul class='menu-list'></ul>");
        Utils.each(this.menus, function (data) {
            var menu = self.renderMenuItem(menuList, data);

            var isSelected = data.name === routers[1];
            if (isSelected)
                menu.addClass("selected").addClass("open");

            var children = Utils.toArray(data.children);
            if (children.length > 0) {
                menu.addClass("has-child");
                var subMenus = menu.appendAndGet("<ul class='submenu-list'></ul>");
                Utils.each(children, function (temp, i) {
                    var submenu = self.renderSubMenuItem(subMenus, temp);
                    if (isSelected && (!routers[2] || routers[2] === temp.name)) {
                        submenu.addClass("selected");
                    }
                });
            }
        });
    },

    renderMenuItem: function (target, data) {
        var item = target.appendAndGet("<li class='menu'></li>");
        item.attr("name", data.name);

        var title = item.appendAndGet("<div class='title'></div>");
        title.text(data.title || data.name || "未知");

        if (data.icon) {
            title.append("<span class='icon'><i class='iconfont icon-" + 
                data.icon + "'></i></span>");
        }

        return item;
    },

    renderSubMenuItem: function (target, data) {
        var item = target.appendAndGet("<li class='menu submenu'></li>");
        item.attr("name", data.name);

        var title = item.appendAndGet("<div class='title'></div>");
        title.text(data.title || data.name || "未知");

        return item;
    }
});
