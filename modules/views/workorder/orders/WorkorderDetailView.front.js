define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-workorder-detail");
    var taskview = $(".taskview");
    var listview = $(".listview");
    var listView = VR.Component.Datagrid.find(view)[0];
    /* listView && listView.setColumnRenderer(function (name, data) {
     if (name === "op" && data.status === "已完成")
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
});