/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
    var view = $(".view-supervision-unfinished");

    var listView = VR.Component.Datagrid.find(view)[0];


    ///////////////////////////////////////////////////////
    // 点击行，显示详情页面
    listView && listView.on("itemclick", function (e, data) {
        frame.showDetails("/module/supervision/sendCompleted/detail", {id: data.id});
    });
// listView && listView.setColumnRenderer(function (name, data) { console.log("===", data);
//      if (name === "taskAttach")
//         return "<a class='download'>下载附件</a>";
//      });

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
    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/sendCompleted/edit";
        var operation = "新建";
        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > " + operation,
            module: moduleUrl,
            buttons: [{name: "save", label: "保存"}, {name: "submit", label: "确定"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };


});
