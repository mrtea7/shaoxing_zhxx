/**********************************************************
 * 服务管理类
 *********************************************************/

var ServiceManager = module.exports;


///////////////////////////////////////////////////////////
var TestService = require(__basedir + "/service/TestService");
var UserService = require(__basedir + "/service/userService");
var SupervisonService = require(__basedir + "/service/supervisionService");
var FileService = require(__basedir + "/service/fileService");

///////////////////////////////////////////////////////////
// 根据接口（api）名称获取相应的服务类
ServiceManager.getService = function (name) {
	if (/^(login|exit|user|role\..+)$/.test(name))
		return UserService;
    if (/^sup\./.test(name))
        return SupervisonService;
    if (/^file\./.test(name))
        return FileService;
	if (/^test\./.test(name))
		return TestService;
	return null;
};
