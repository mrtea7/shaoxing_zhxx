/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
    var view = $(".view-supervision-todo");

    var listView = VR.Component.Datagrid.find(view)[0];

    ///////////////////////////////////////////////////////
    listView && listView.setRowStyleFunction(function (data) {
        if (data.status === "未确认")
            return "row-warn";
        if (data.status === "已超期")
            return "row-error";
    });
    listView && listView.setColumnRenderer(function (name, data) {
        if (name === "op")
            return "<a name='edit'>编辑</a>";
    });
    ///////////////////////////////////////////////////////

    view.on("click", "header > .btnbar .btn", function (e) {
        var btnName = $(e.currentTarget).attr("name");
        if (btnName === "create")
            showEditView();
    });

    ///////////////////////////////////////////////////////
    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/waitSendWorkOrder/edit";//在supervision.js里配置
        if (data)
            moduleUrl += "?id=" + data.id;

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 待派发",
            module: moduleUrl,
            buttons: [{name: "save", label: "保存"},{name: "submit", label: "确定"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    }

});
