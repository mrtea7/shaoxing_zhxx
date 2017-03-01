/**********************************************************
 * 督查督办服务类
 *
 *      sup.create                  添加
 *      sup.send                    派发
 *      sup.recall                  撤回
 *      sup.delete                  删除主任务
 *      sup.feedback                回复任务
 *
 *      分页查询
 *      sup.page.send               派发人主任务分页查询
 *      sup.page.receive            接收人子任务分页查询
 *
 *      督察督办列表详情
 *      sup.detail.send             派发人查询详情
 *      sup.detail.receive          接收人查询详情
 *
 *********************************************************/
"use strict";

var VRender = require("v-render");


var Utils = VRender.Utils;

var SupervisionService = module.exports;

SupervisionService.do = function (session, name, data, callback) {
    if (name === "sup.create")
        SupervisionService.create(session, data, callback);
    else if (name === "sup.send")
        SupervisionService.send(session, data, callback);
    else if (name === "sup.recall")
        SupervisionService.recall(session, data, callback);
    else if (name === "sup.delete")
        SupervisionService.delete(session, data, callback);
    else if (name === "sup.feedback")
        SupervisionService.feedback(session, data, callback);
    else if (name === "sup.page.send")
        SupervisionService.pageSend(session, data, callback);
    else if (name === "sup.page.receive")
        SupervisionService.pageReceive(session, data, callback);
    else if (name === "sup.detail.send")
        SupervisionService.detailSend(session, data, callback);
    else if (name === "sup.detail.receive")
        SupervisionService.detailReceive(session, data, callback);
    else
        callback("类[DeptService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
SupervisionService.create = function (session, data, callback) {
    var postData = {"jsonStr":data};
    session.fetch("/dcdbWorkorder/createDcdbWorkOrder", postData, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.send = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/sendDcdbWorkOrder", data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.recall = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/recall?dcdbId=" + data.dcdbId, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.delete = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/delWorkOrder?dcdbId=" + data.dcdbId, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.feedback = function (session, data, callback) {
    session.fetch("/dcdbWorkorderTask/feedback", data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.pageSend = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/querySendPage?taskStatus="+ data.taskStatus+"&isOverdue="+ data.isOverdue, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.pageReceive = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/querySendPage?taskStatus=" + data.taskStatus, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.detailSend = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/querySendPage?taskStatus=" + data.taskStatus, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.detailReceive = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/querySendPage?taskStatus="+ data.taskStatus+"&isOverdue="+ data.isOverdue, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};


