/**********************************************************
 * 文件上传下载服务类
 *      file.upload       单位列表
 *      file.download        科室列表
 *
 *********************************************************/
"use strict";

var VRender = require("v-render");


var Utils = VRender.Utils;

var FileService = module.exports;

FileService.do = function (session, name, data, callback) {
    if (name === "file.upload")
        FileService.upload(session, data, callback);
    else if (name === "file.download")
        FileService.download(session, data, callback);
    else
        callback("类[FileService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
FileService.download = function (session, data, callback) {
    session.fetch("/dcdbWorkOrderAttachDown/download?id=" + data, function (err, ret) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, ret);
        }
    });
};