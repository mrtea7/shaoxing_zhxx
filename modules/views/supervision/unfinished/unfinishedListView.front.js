/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
    var view = $(".view-supervision-unfinished");

    var listView = VR.Component.Datagrid.find(view)[0];


    ///////////////////////////////////////////////////////
    // 点击行，显示详情页面
    listView && listView.on("itemclick", function (e, data) {
        frame.showDetails("/module/supervision/unfinished/detail", {id: data.id});
    });

    view.on("mousedown", ".download", function (e) {
        showEditView();
        return false;
    });

    view.on("click", "header > .btnbar .btn", function (e) {
        var btnName = $(e.currentTarget).attr("name");
        if (btnName === "create")
            showEditView(btnName);

    });

    ///////////////////////////////////////////////////////
    var showEditView = function () {
        var moduleUrl = "/module/supervision/unfinished/edit";

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 新建",
            module: moduleUrl,
            buttons: [{name: "save", label: "保存"}, {name: "submit", label: "发送"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };


});
