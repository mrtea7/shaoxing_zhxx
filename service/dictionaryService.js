/**********************************************************
 * 字典表
 *      dept.company       单位列表
 *      dept.office        科室列表
 *
 *********************************************************/
"use strict";

var VRender = require("v-render");
var Utils = VRender.Utils;
var DictionaryService = module.exports;

DictionaryService.do = function (session, name, data, callback) {
    if (name === "dic.orderType")
        DictionaryService.orderType(session, data, callback);
    else
        callback("类[DeptService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
DictionaryService.orderType = function (session, data, callback) {
    session.fetch("/comn/codeValue/getSimpleCodeHouse?codeTypeId=1", data, function (err, ret) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, ret);
        }
    });

};
