/**********************************************************
 * 督查督办模块
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var Utils = VRender.Utils;

var SupervisionModule = ModuleBase.extend(module, {
    id: "app-supervision",

    getView: function (module, action, params) {
        if (/waitReceive/.test(action))//待接收 办理人员
            return this.getSupervisionWaitReceiveView(module, action, params);
        else if (/received/.test(action))//已接收 办理人员
            return this.getSupervisionReceivedView(module, action, params);
        else if (/receiveCompleted/.test(action))//已完成 办理人员
            return this.getSupervisionReceiveCompletedView(module, action, params);
        else if (/unfinished/.test(action))//未完成 派发人员
            return this.getSupervisionUnfinishedView(module, action, params);
        else if (/sendCompleted/.test(action))//已完成 派发人员
            return this.getSupervisionSendCompletedView(module, action, params);
        else if (/exceedTime/.test(action))//已超期 派发人员
            return this.getSupervisionExceedTimerView(module, action, params);
    },
    ///////////////////////////////////////////////////////
    getSupervisionWaitReceiveView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "waitReceive.detail")
                return __dirname + "/views/supervision/waitReceive/waitReceiveDetailView";
            if (action === "waitReceive.edit")
                return __dirname + "/views/supervision/waitReceive/waitReceiveEditView";
            return __dirname + "/views/supervision/waitReceive/waitReceiveListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceiveCompletedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "receiveCompleted.detail")
                return __dirname + "/views/supervision/receiveCompleted/receiveCompletedDetailView";
            if (action === "receiveCompleted.edit")
                return __dirname + "/views/supervision/receiveCompleted/receiveCompletedEditView";
            return __dirname + "/views/supervision/receiveCompleted/receiveCompletedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceivedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "received.detail")
                return __dirname + "/views/supervision/received/receivedDetailView";
            if (action === "received.edit")
                return __dirname + "/views/supervision/received/receivedEditView";
            return __dirname + "/views/supervision/received/receivedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionUnfinishedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "unfinished.detail")
                return __dirname + "/views/supervision/unfinished/unfinishedDetailView";
            if (action === "unfinished.edit")
                return __dirname + "/views/supervision/unfinished/unfinishedEditView";
            return __dirname + "/views/supervision/unfinished/unfinishedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionSendCompletedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "sendCompleted.detail")
                return __dirname + "/views/supervision/sendCompleted/sendCompletedDetailView";
            if (action === "sendCompleted.edit")
                return __dirname + "/views/supervision/sendCompleted/sendCompletedEditView";
            return __dirname + "/views/supervision/sendCompleted/sendCompletedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionExceedTimerView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "exceedTime.detail")
                return __dirname + "/views/supervision/exceedTime/exceedTimeDetailView";
            if (action === "exceedTime.edit")
                return __dirname + "/views/supervision/exceedTime/exceedTimeEditView";
            return __dirname + "/views/supervision/exceedTime/exceedTimeListView";
        });
    }
});
