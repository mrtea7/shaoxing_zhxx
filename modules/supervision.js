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
            if (action === "done.detail")
                return __dirname + "/views/supervision/done/DoneDetailView";
            if (action === "done.edit")
                return __dirname + "/views/supervision/done/DoneEditView";
            return __dirname + "/views/supervision/done/DoneListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceivedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "done.detail")
                return __dirname + "/views/supervision/done/DoneDetailView";
            if (action === "done.edit")
                return __dirname + "/views/supervision/done/DoneEditView";
            return __dirname + "/views/supervision/done/DoneListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionReceiveCompletedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "todo.detail")
                return __dirname + "/views/supervision/todo/TodoDetailView";
            if (action === "todo.edit")
                return __dirname + "/views/supervision/todo/TodoEditView";
            return __dirname + "/views/supervision/todo/TodoListView";
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
