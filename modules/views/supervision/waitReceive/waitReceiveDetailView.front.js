/****************************
 * 未完成详情
 ****************************/

define(function ($, VR, Utils, FileUploader) {
    // var FileUploader = ;

    var view = $(".view-supervision-detail");
    var taskview = $(".taskview");
    var listview = $(".listview");
    var listView = VR.Component.Datagrid.find(view)[0];
    // listView && listView.setColumnRenderer(function (name, data) { console.log("===", data);
    //  if (name === "taskAttach")
    //     return "<a name='download'>下载附件</a>";
    //  });
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
        var id = e.currentTarget.id;
        VR.post("sup.accept", {id: id}, function (err, ret) {
            if (err)
                return  alert("接收失败");
            else
                alert("成功接收");
        })
    });

    var showEditView = function (data) {
        var moduleUrl = "/module/supervision/waitReceive/edit";
        if (data)
            moduleUrl += "?id=" + data.id;

        console.log('<moduleUrl>', moduleUrl);
        var dialog = VR.Component.Dialog.create({
            title: "督查督办 > 反馈",
            module: moduleUrl,
            buttons: [{name: "submit", label: "确定"}, {name: "cancel", label: "取消"}]
        });

        dialog.on("view_submit", function (e) {
            listView.reload();
        });
    };
});