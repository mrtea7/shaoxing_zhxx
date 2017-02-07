/**********************************************************
 * 登录页设计
 *********************************************************/

var VRender = require("v-render");
var Application = require(__app);


var LoginView = VRender.PageView.extend(module, {
	getPageTitle: function () {
		return "绍兴综合信息登录页面";
	},

	renderBody: function (body) {
		LoginView.__super__.renderBody.call(this, body);

		var container = body.appendAndGet("<div class='container'></div>");

		var form = container.appendAndGet("<div class='form'></div>");
		form.append("<div class='title'>综合信息管理系统</div>");
		form.append("<dl class='username'><dt>用户名：</dt><dd><input type='text'/></dd></dl>");
		form.append("<dl class='password'><dt>密码：</dt><dd><input type='password'/></dd></dl>");
		form.append("<div class='errmsg'>&nbsp;</div>");
		form.append("<div class='btns'><button class='loginbtn'>登录</button></div>");

		body.append("<footer>版权所有：绍兴市交通运输局</footer>");

		// 以下测试数据
		if (Application.isTest(this.getSession())) {
			form.find(".username input").val("admin");
			form.find(".password input").val("");
		}
	}
});

LoginView.import("/css/base.css");
