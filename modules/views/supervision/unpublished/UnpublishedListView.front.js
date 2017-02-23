/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
	var view = $(".view-supervision-todo");

	var listView = VR.Component.Datagrid.find(view)[0];

	///////////////////////////////////////////////////////
	listView && listView.setRowStyleFunction(function (data) {
		if (data.status === "未确认")
			return "row-warn";
		if (data.status === "已超期")
			return "row-error";
	});
	///////////////////////////////////////////////////////
	// 点击行，显示详情页面
	listView && listView.on("itemclick", function (e, data) {
		frame.showDetails("/module/supervision/todo/detail", {id: data.id});
	});

	view.on("click", "header > .btnbar .btn", function (e) {
		var btnName = $(e.currentTarget).attr("name");
		if (btnName === "create")
			showEditView();
	});

	///////////////////////////////////////////////////////
	var showEditView = function (data) {
		var moduleUrl = "/module/supervision/todo/edit";
		if (data)
			moduleUrl += "?id=" + data.id;

		var dialog = VR.Component.Dialog.create({title: "督查督办", module: moduleUrl});

		dialog.on("view_submit", function (e) {
			listView.reload();
		});
	}

});
