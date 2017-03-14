/****************************
 * 未完成详情
 ****************************/

define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-supervision-detail");
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
        VR.post("file.download", {id:attachId}, function (err, ret) {
            if (err)
                alert("下载失败");
            else
                alert("下载成功")
        });
    });
    $(".downloadTask").on("click", function (e) {
        var attachId = e.currentTarget.id;
        VR.post("file.upload", attachId, function (err, ret) {
            if (err)
                alert("下载失败");
            else
                alert("下载成功")
        });
    });

    $(".optBtn .edit").on("click", function (e) {
        var id = e.currentTarget.id;
        showEditView(id);
    });
    $(".optBtn .recall").on("click", function (e) {
        var id = e.currentTarget.id;
        VR.post("sup.recall", {id: id}, function (err, ret) {
            if (err)
                alert("撤回失败");
            else
                alert("成功撤回");
        })
    });
    $(".optBtn .delete").on("click", function (e) {
        var id = e.currentTarget.id;
        VR.post("sup.delete", {id: id}, function (err, ret) {
            if (err)
                alert("删除失败");
            else
                alert("成功删除");
        })
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/unfinished/edit";
        if (data)
            moduleUrl += "?id=" + data.id;

        console.log('<moduleUrl>', moduleUrl);
        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 编辑",
            module: moduleUrl,
            buttons: [{name: "save", label: "保存"}, {name: "submit", label: "确定"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };
});