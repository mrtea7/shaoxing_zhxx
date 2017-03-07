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
        else if (/waitSendWorkOrder/.test(action))//待派发 派发人员
            return this.getSupervisionWaitSendWorkOrderView(module, action, params);
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
                return __dirname + "/views/supervision/waitReceive/unfinishedDetailView";
            if (action === "waitReceive.edit")
                return __dirname + "/views/supervision/waitReceive/unfinishedEditView";
            return __dirname + "/views/supervision/waitReceive/unfinishedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceiveCompletedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "unfinished.detail")
                return __dirname + "/views/supervision/receiveCompleted/unfinishedDetailView";
            if (action === "unfinished.edit")
                return __dirname + "/views/supervision/receiveCompleted/unfinishedEditView";
            return __dirname + "/views/supervision/receiveCompleted/unfinishedListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceivedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "received.detail")
                return __dirname + "/views/supervision/received/unfinishedDetailView";
            if (action === "received.edit")
                return __dirname + "/views/supervision/received/unfinishedEditView";
            return __dirname + "/views/supervision/received/unfinishedListView";
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
            if (action === "unfinished.detail")
                return __dirname + "/views/supervision/sendCompleted/unfinishedDetailView";
            if (action === "unfinished.edit")
                return __dirname + "/views/supervision/sendCompleted/unfinishedEditView";
            return __dirname + "/views/supervision/sendCompleted/unfinishedListView";
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
    },
    ///////////////////////////////////////////////////////
    getSupervisionWaitSendWorkOrderView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "waitSendWorkOrder.edit")
                return __dirname + "/views/supervision/waitSend/waitSendEditView";
            return __dirname + "/views/supervision/waitSend/waitSendListView";
        });
    }
});
