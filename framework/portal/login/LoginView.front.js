/**********************************************************
 * 登录页设计
 *********************************************************/

define(function ($, VR, Utils) {

	// 点击登录按钮
	$(".loginbtn").on("click", function (e) {
		if ($(e.currentTarget).is(".disabled"))
			return ;

		var userName = $(".username input").val();
		var password = $(".password input").val();
		if (Utils.isBlank(userName))
			return showErrorMsg("请输入用户名");
		if (Utils.isBlank(password))
			return showErrorMsg("请输入密码");

		doLogin(userName, password);
	});

	// 回车登录
	$(".form input").on("keydown", function (e) {
		if (e.which == 13) { // 回车
			var input = $(e.currentTarget);
			var item = input.parent().parent();
			if (Utils.isBlank($(".username input").val())) {
				showErrorMsg("请输入用户名");
				$(".username input").focus();
			}
			else if (Utils.isBlank($(".password input").val())) {
				if (item.is(".password"))
					showErrorMsg("请输入密码");
				else 
					$(".password input").focus();
			}
			else 
				$(".loginbtn").click();
		}
	});

	///////////////////////////////////////////////////////
	// 登录
	var doLogin = function (userName, password) {
		var loginBtn = $(".loginbtn").addClass("disabled");
		loginBtn.addClass(".disabled").text("正在登录..");

		var params = {username: userName, password: password,needMenu:true};
		VR.post("login", params, function (err, ret) { console.log(ret);
			if (err) { // 登录失败
				showErrorMsg(err);
				loginBtn.removeClass("disabled").text("登录");
			}
			else { // 登录成功
				loginBtn.text("登录成功");
				console.log('<ret>',ret);
				VR.cache("sys_user_data", ret); // 保存用户信息
					window.location.replace("/");
				// if (window.location.pathname === "/login")
				// 	window.location.replace("/");
				// else
				// 	window.location.reload(true);
			}
		}, true);
	};

	// 显示错误
	var showErrorMsg = function (msg) {
		var errtag = $(".errmsg").text(msg || "");
		var timerId = parseInt(errtag.attr("timerid")) || 0;
		if (timerId)
			clearTimeout(timerId);
		timerId = setTimeout(function () {
			errtag.text("");
		}, 3000);
		errtag.attr("timerid", timerId);
	};

});
