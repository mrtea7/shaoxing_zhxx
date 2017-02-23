/**********************************************************
 * 主页面头部视图，包含企业信息、登录用户信息以及系统状态信息等
 *********************************************************/

var VRender = require("v-render");


var HeaderView = VRender.UIView.extend(module, {
    className: "main-header",
    readyCode: "view.main.header",

    doInit: function () {
        HeaderView.__super__.doInit.call(this);

        // TODO 获取用户信息
        this.userName = this.getSession().get("user_name") || '你好';

        this.ready("view.main.header");
    },

    renderView: function () {
        HeaderView.__super__.renderView.call(this);

        var logoUrl = "/img/user_default.png";

        var company = VRender.$("<div class='company'></div>").appendTo(this.$el);
        company.write("<img class='logo' src='" + logoUrl + "'/>");
        company.write("<span class='name'>绍兴综合信息管理系统</span>");

        var user = VRender.$("<div class='userinfo'></div>").appendTo(this.$el);

        var status = VRender.$("<ul class='status'></ul>").appendTo(user);
        status.write("<li class='msg'><i class='iconfont icon-shuju'></i></li>");
        status.write("<li class='msgd'><i class='iconfont icon-shuju'></i></li>");
        status.write("<li class='msg4'><i class='iconfont icon-shuju'></i></li>");

        user.write("<span class='head-lnk username'>" + this.userName + "</span>");
        user.write("<span class='head-lnk exit'>退出</span>");
    }
});
