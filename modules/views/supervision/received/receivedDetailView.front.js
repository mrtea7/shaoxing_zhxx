/****************************
 * 已接收详情
 ****************************/

define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-supervision-detail");
    var orderInfo = view.data("viewData");

    var taskview = $(".taskview");
    var listview = $(".listview");
    var listView = VR.Component.Datagrid.find($(".view-supervision-received"))[0];

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
        var attachId = e.currentTarget.id;
        window.open("/download/dcdbWorkOrderAttachDown/download?id=" + attachId,"_blank");
    });

    $(".optBtn .feedback").on("click", function (e) {
        showEditView(orderInfo);
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/received/edit";
        if (data)
            moduleUrl += "?id=" + data.taskId;

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 反馈回复",
            module: moduleUrl,
            buttons: [{name: "submit", label: "确定",id:data.id}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e,params) {
            listView.reload();
        });
    };
});