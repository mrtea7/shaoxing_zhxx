/**********************************************************
 * 单位部门相关服务类
 *      dept.company       单位列表
 *      dept.office        科室列表
 *
 *********************************************************/
"use strict";

var VRender = require("v-render");


var Utils = VRender.Utils;

var DeptService = module.exports;

DeptService.do = function (session, name, data, callback) {
    if (name === "dept.officeList")
        DeptService.officeList(session, data, callback);
    else if (name === "dept.companyList")
        DeptService.companyList(session, data, callback);
    else
        callback("类[DeptService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
// 所有科室列表
DeptService.officeList = function (session, data, callback) {
    session.fetch("/sysOmOffice/queryOffices?tenantId=" + data, null, function (err, ret) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, ret);
        }
    });
};
DeptService.companyList = function (session, data, callback) {
    session.fetch("/sysCommonCompany/queryCompanies", data, function (err, ret) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, ret);
        }
    });
};