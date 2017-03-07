/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
	var view = $(".view-supervision-unfinished");

	var listView = VR.Component.Datagrid.find(view)[0];

    listView && listView.setColumnRenderer(function (name, data) {
        if (name === "op")
            return "<a name='edit'>办理</a>";
    });
	///////////////////////////////////////////////////////
	// 点击行，显示详情页面
	listView && listView.on("itemclick", function (e, data) {
		frame.showDetails("/module/supervision/received/detail", {id: data.id});
	});

    listView && listView.on("oper", function (e, name, data) {
        if (name === "edit")
            showEditView(data);
        return false;
    });

	///////////////////////////////////////////////////////
	var showEditView = function (data) {
		var moduleUrl = "/module/supervision/received/edit";
		if (data)
			moduleUrl += "?id=" + data.id;

		var dialog = VR.Component.Dialog.create({title: "已接收", module: moduleUrl});

		dialog.on("view_submit", function (e) {
			listView.reload();
		});
	}

});
