/****************************
 * 未完成详情
 ****************************/

define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-supervision-detail");
    var taskview = $(".taskview");
    var listview = $(".listview");
    var listView = VR.Component.Datagrid.find(view)[0];
    /*listView && listView.setColumnRenderer(function (name, data) {
        if (name === "op")
            return "<a name='download'>下载附件</a>";
    });*/
    /*listView && listView.setRowStyleFunction(function (data) {
        if (data.status === "未确认")
            return "row-warn";
        if (data.status === "已超期")
            return "row-error";
    });*/

    view.on("click", ".tabsbar > .tab ", function (e) {
        var selectedTab = $(e.currentTarget);
        var selectedTabName = selectedTab.attr("name");
        if (!selectedTab.is(".selected")) {
            selectedTab.addClass("selected").siblings().removeClass("selected");
            $("#" + selectedTabName).addClass("show").siblings().removeClass("show");
            $("#" + selectedTabName).removeClass("hide").siblings().addClass("hide");
        }
    });

    $(".optBtn .edit").on("click", function (e) {
        showEditView()
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/unfinished/edit";
        if (data)
            moduleUrl += "?id=" + data.id;

        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 编辑",
            module: moduleUrl,
            buttons: [{name: "save", label: "保存"},{name: "submit", label: "确定"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };
});