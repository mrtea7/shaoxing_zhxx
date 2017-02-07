/**********************************************************
 * 用户相关服务类
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var UserService = module.exports;

UserService.do = function (session, name, data, callback) {
	if (name === "login")
		UserService.doLogin(session, data, callback);
	else if (name === "exit")
		UserService.doLogout(session, data, callback);
	else
		callback("类[UserService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
// 登录，返回用户信息
UserService.doLogin = function (session, data, callback) {
	// session.loginDate = new Date();
    //
	// var userInfo = {id: session.loginDate.getTime()};
	// userInfo.name = data.name;
	// session.set("user", userInfo);
    //
	// callback(false, userInfo);
	session.fetch("/login", data, function (err, ret) {
		callback(false, ret);
	});
};

// 退出系统
UserService.doLogout = function (session, data, callback) {
	delete session.loginDate;
	session.set("user", null);
	callback(false);
};
