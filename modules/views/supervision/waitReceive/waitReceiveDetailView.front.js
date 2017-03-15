/****************************
 * 未完成详情
 ****************************/

define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-supervision-detail");
    var orderInfo = view.data("viewData");
    console.log('<orderInfo>',orderInfo);


    var taskview = $(".taskview");
    var listview = $(".listview");
    var listView = VR.Component.Datagrid.find(view)[0];

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
        VR.post("file.upload", attachId, function (err, ret) {
            if (err)
                alert("下载失败");
            else
                alert("下载成功")
        });
    });

    $(".optBtn .accept").on("click", function (e) {
        VR.post("sup.accept", {id: orderInfo.taskId}, function (err, ret) {
            if (err)
                return  alert("接收失败");
            else
                showEditView(orderInfo);
                alert("成功接收");
        })
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/received/edit";
        if (data)
            moduleUrl += "?id=" + data.taskId;

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 反馈",
            module: moduleUrl,
            buttons: [{name: "submit", label: "回复"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };
});