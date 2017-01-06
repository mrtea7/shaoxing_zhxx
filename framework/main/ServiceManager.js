/**********************************************************
 * 服务管理类
 *********************************************************/

var ServiceManager = module.exports;


///////////////////////////////////////////////////////////
var UserService = require(__basedir + "/service/UserService");


///////////////////////////////////////////////////////////
// 根据接口（api）名称获取相应的服务类
ServiceManager.getService = function (name) {
	if (/^(login|exit|user\..+)$/.test(name))
		return UserService;
	return null;
};
