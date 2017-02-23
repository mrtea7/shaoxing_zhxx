/**********************************************************
 * 督查督办模块
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var Utils = VRender.Utils;

var SupervisionModule = ModuleBase.extend(module, {
    id: "app-supervision",

    getView: function (module, action, params) {
        if (/done/.test(action))
            return this.getSupervisionDoneView(module, action, params);
        else if (/overdue/.test(action))
            return this.getSupervisionOverdueView(module, action, params);
        else if (/todo/.test(action))
            return this.getSupervisionTodoView(module, action, params);
        else if (/unpublished/.test(action))
            return this.getSupervisionUnpublishedView(module, action, params);
    },
    ///////////////////////////////////////////////////////
    getSupervisionDoneView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "done.detail")
                return __dirname + "/views/supervision/done/DoneDetailView";
            if (action === "done.edit")
                return __dirname + "/views/supervision/done/DoneEditView";
            return __dirname + "/views/supervision/done/DoneListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionOverdueView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "done.detail")
                return __dirname + "/views/supervision/done/DoneDetailView";
            if (action === "done.edit")
                return __dirname + "/views/supervision/done/DoneEditView";
            return __dirname + "/views/supervision/done/DoneListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionTodoView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "todo.detail")
                return __dirname + "/views/supervision/todo/TodoDetailView";
            if (action === "todo.edit")
                return __dirname + "/views/supervision/todo/TodoEditView";
            return __dirname + "/views/supervision/todo/TodoListView";
        });
    },
    ///////////////////////////////////////////////////////
    getSupervisionUnpublishedView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "unpublished.detail")
                return __dirname + "/views/supervision/unpublished/UnpublishedDetailView";
            if (action === "unpublished.edit")
                return __dirname + "/views/supervision/unpublished/UnpublishedEditView";
            return __dirname + "/views/supervision/unpublished/UnpublishedListView";
        });
    }
});
