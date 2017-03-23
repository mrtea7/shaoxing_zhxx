/****************************
 * 未完成详情
 ****************************/

define(function ($, VR, Utils) {

    var view = $(".view-supervision-detail");
    var listView = VR.Component.Datagrid.find($(".view-supervision-unfinished"))[0];
    var orderInfo = view.data("viewData");

    var taskview = $(".taskview");
    var listview = $(".listview");

    view.on("click", ".tabsbar > .tab ", function (e) {
        var selectedTab = $(e.currentTarget);
        var selectedTabName = selectedTab.attr("name");
        if (!selectedTab.is(".selected")) {
            selectedTab.addClass("selected").siblings().removeClass("selected");
            $("#" + selectedTabName).addClass("show").siblings().removeClass("show");
            $("#" + selectedTabName).removeClass("hide").siblings().addClass("hide");
        }
    });
    $(".downloadAttach").on("click", function (e) {
        console.log('<e>',e);
        var attachId = e.currentTarget.id;
        window.open("/download/dcdbWorkOrderAttachDown/download?id=" + attachId + "&clientType=1","_blank");
        // VR.post("/download/dcdbWorkOrderAttachDown/download?id=" + attachId + "&clientType=1", function (err, ret) {
        //     if (err)
        //         frame.tooltip("下载失败:" + err);
        //     else
        //         frame.tooltip("下载成功", "success")
        // });
    });
    $(".downloadTask").on("click", function (e) {
        var attachId = e.currentTarget.id;
        VR.post("file.upload", attachId, function (err, ret) {
            if (err)
                frame.tooltip("下载id:" + attachId + "子任务附件失败:" + err);
            else
                frame.tooltip("下载成功", "success")
        });
    });

    $(".optBtn .edit").on("click", function (e) {
        showEditView(orderInfo);
    });

    $(".optBtn .cancel").on("click", function (e) {
        frame.hideDetails();
    });
    $(".optBtn .recall").on("click", function (e) {
        VR.post("sup.recall", {id: orderInfo.base.id}, function (err, ret) {
            if (err)
                frame.tooltip("撤回" + orderInfo.base.id + "失败");
            else {
                listView.reload();
                frame.hideDetails();
                frame.tooltip("成功撤回", "success");
            }
        })
    });
    $(".optBtn .delete").on("click", function (e) {
        VR.post("sup.delete", {id: orderInfo.base.id}, function (err, ret) {
            if (err)
                frame.tooltip("删除失败");
            else {
                listView.reload();
                frame.hideDetails();
                frame.tooltip("成功删除", "success");
            }
        })
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/unfinished/edit";
        if (data)
            moduleUrl += "?id=" + data.base.id;//参数可以从session中拿到

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 编辑",
            module: moduleUrl,
            buttons: [{name: "save", label: "暂存"}, {name: "submit", label: "发送"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };
});