/**********************************************************
 * 督查督办未完成列表视图
 *********************************************************/

var VRender = require("v-render");
var ModuleListView = require("../../templates/ModuleListView");


var Utils = VRender.Utils;

var UnfinishedListView = ModuleListView.extend(module, {
    className: "view-supervision-unfinished",

    getTitle: function () {
        return "已完成";
    },

    getColumns: function () {
        var columns = [];
        columns.push({name: "title", title: "标题"});
        columns.push({name: "deadline", title: "截止时间"});
        return columns;
    },

    getListApiName: function () {
        // return "sup.page.send";
        return "test.data.sup_unfinished_list";
    },
    getListApiParams: function () {
        var param = {taskStatus: 0, isOverdue: 0};
        return param;
    }
});
