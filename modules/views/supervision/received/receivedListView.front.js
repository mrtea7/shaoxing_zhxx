/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
    var view = $(".view-supervision-received");

    var listView = VR.Component.Datagrid.find(view)[0];


    ///////////////////////////////////////////////////////
    // 点击行，显示详情页面
    listView && listView.on("itemclick", function (e, data) {
        frame.showDetails("/module/supervision/received/detail", {taskId: data.workOrderTaskId});
    });

});
