/**********************************************************
 * 督查督办服务类
 *
 *      sup.create                  添加
 *      sup.send                    派发
 *      sup.recall                  撤回
 *      sup.delete                  删除主任务
 *      sup.accept                  接收任务
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
    else if (name === "sup.accept")
        SupervisionService.accept(session, data, callback);
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
    var postData = {jsonStr: JSON.stringify(data)};
    session.fetch("/dcdbWorkorder/createDcdbWorkOrder", postData, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.send = function (session, data, callback) {
    var postData = {jsonStr: JSON.stringify(data)};
    session.fetch("/dcdbWorkorder/sendDcdbWorkOrder", postData, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.recall = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/recall?dcdbId=" + data.id, null, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.delete = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/delWorkOrder?dcdbId=" + data.id, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.accept = function (session, data, callback) {
    session.fetch("/dcdbWorkorderTask/receive?dcdbTaskId=" + data.id, data, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.feedback = function (session, data, callback) {
    var postData = {jsonStr: JSON.stringify(data)};
    session.fetch("/dcdbWorkorderTask/feedback", postData, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, ret);
        }
    });
};
SupervisionService.pageSend = function (session, data, callback) {
    var url = "/dcdbWorkorder/querySendPage?rows=" + data.rows + "&page=" + data.page;
    if (data.taskStatus)
        url += "&taskStatus=" + data.taskStatus;
    if (data.isOverdue)
        url += "&isOverdue=" + data.isOverdue;
    session.fetch(url, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, _formatPage(ret, "send"));
        }
    });
};
SupervisionService.pageReceive = function (session, data, callback) {
    var url = "/dcdbWorkorder/queryReceivePage?rows=" + data.rows + "&page=" + data.page;
    if (data.taskStatus===0)
        url += "&taskStatus=" + data.taskStatus;
    if (data.taskStatus)
        url += "&taskStatus=" + data.taskStatus;
    if (data.isOverdue)
        url += "&isOverdue=" + data.isOverdue;
    session.fetch(url, function (err, ret) {
        if (err)
            callback(err);
        else {
            callback(false, _formatPage(ret, "receive"));
        }
    });
};
SupervisionService.detailSend = function (session, data, callback) {
    session.fetch("/dcdbWorkorder/queryWorkOrderDetail?dcdbId=" + data, function (err, ret) {
        if (err)
            callback(err);
        else {
            var list = _formatSendDetail(ret);
            callback(false, list);
        }
    });
};
SupervisionService.detailReceive = function (session, data, callback) {
    session.fetch("/dcdbWorkorderTask/queryWorkOrderDetail?dcdbTaskId=" + data, function (err, ret) {
        if (err)
            callback(err);
        else {
            var list = _formatReceiveDetail(ret);
            callback(false, list);
        }
    });
};
//////////////////////////////////////////////////////
var _formatPage = function (data, type) {
    var _list = {total: data.total, rows: []};
    for (var i = 0; i < data.rows.length; i++) {
        var item = {};
        if (type === "send")
            item.id = data.rows[i].bean.id;
        if (type === "receive")
            item.workOrderTaskId = data.rows[i].bean.workOrderTaskId;
        item.title = data.rows[i].bean.title;
        item.content = data.rows[i].bean.content;
        item.deadline = data.rows[i].bean.deadline;
        item.status = data.rows[i].caption.taskStatus;
        _list.rows.push(item)
    }
    return _list;
};
var _formatSendDetail = function (data) {
    var _detail = {info: {}, attach: [], task: []};
    _detail.info = data.bean;
    _detail.info.taskStatus = data.caption.taskStatus;
    var bean = data.bean;
    if (bean.dcdbWorkorderAttach.length > 0)
        for (var i = 0; i < bean.dcdbWorkorderAttach.length; i++) {
            var attachItem = {};
            attachItem.originalFilename = bean.dcdbWorkorderAttach[i].originalFilename;
            attachItem.id = bean.dcdbWorkorderAttach[i].id;
            _detail.attach.push(attachItem)
        }
    for (var j = 0; j < bean.dcdbWorkorderTaskList.length; j++) {
        var taskItem = {};
        taskItem.dept = bean.dcdbWorkorderTaskList[j].officeName;
        taskItem.feedback = bean.dcdbWorkorderTaskList[j].feedback;
        taskItem.taskAttach = "文件";
        taskItem.completionTime = bean.dcdbWorkorderTaskList[j].completionTime;
        _detail.task.push(taskItem)
    }
    return _detail;
};
var _formatReceiveDetail = function (data) {
    var _detail = {info: {}, attach: [], task: []};
    _detail.info = data.bean.dcdbWorkorderInfoBean;
    var bean = data.bean;
    if (bean.dcdbWorkorderAttaches.length > 0)
        for (var i = 0; i < bean.dcdbWorkorderAttaches.length; i++) {
            var attachItem = {};
            attachItem.originalFilename = bean.dcdbWorkorderAttaches[i].originalFilename;
            attachItem.id = bean.dcdbWorkorderAttaches[i].id;
            _detail.attach.push(attachItem)
        }
    // for (var j = 0; j < bean.dcdbWorkorderTaskList.length; j++) {
    //     var taskItem = {};
    //     taskItem.dept = bean.dcdbWorkorderTaskList[j].officeName;
    //     taskItem.feedback = bean.dcdbWorkorderTaskList[j].feedback;
    //     taskItem.taskAttach = "文件";
    //     taskItem.completionTime = bean.dcdbWorkorderTaskList[j].completionTime;
    //     _detail.task.push(taskItem)
    // }
    return _detail;
};