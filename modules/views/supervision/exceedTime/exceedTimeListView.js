/**********************************************************
 * 督查督办未完成列表视图 8=撤回，4=草稿，2=办理中
 *********************************************************/

var VRender = require("v-render");
var ModuleListView = require("../../templates/ModuleListView");


var Utils = VRender.Utils;

var UnfinishedListView = ModuleListView.extend(module, {
    className: "view-supervision-unfinished",

    doInit: function () {
        UnfinishedListView.__super__.doInit.call(this);
        this.options.rows = 10;
    },

    getTitle: function () {
        return "已超期";
    },

    getTopButtons: function () {
        var buttons = [];
        // buttons.push({name: "create", label: "新建任务", icon: "icon-jiankong"});
        // buttons.push({name: "delete", label: "删除任务", icon: "icon-jiankong"});
        return buttons;
    },

    getColumns: function () {
        var columns = [];
        columns.push({name: "title", title: "标题"});
        columns.push({name: "content", title: "内容"});
        columns.push({name: "deadline", title: "截止时间"});
        columns.push({name: "status", title: "状态"});
        // columns.push({name: "taskAttach", title: "状态11"});
        return columns;
    },

    getListApiName: function () {
        return "sup.page.send";
    },
    getListApiParams: function () {
        var param = {isOverdue: -1};
        return param;
    }
});
