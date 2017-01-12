/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
	var view = $(".view-workorder-orders");

	var listView = VR.Component.Datagrid.find(view)[0];

	///////////////////////////////////////////////////////
	listView && listView.setColumnRenderer(function (name, data) {
		if (name === "op")
			return "<a name='edit'>编辑</a>";
	});

	listView && listView.setRowStyleFunction(function (data) {
		if (data.singer === "王菲")
			return "row-primary";
		if (data.singer === "贝多芬")
			return "row-warn";
		if (data.singer === "崔子格")
			return "row-error";
	});

	///////////////////////////////////////////////////////
	// 点击行，显示详情页面
	listView && listView.on("itemclick", function (e, data) {
		frame.showDetails("/module/workorder/orders/detail", {id: data.id});
	});

	listView && listView.on("oper", function (e, name, data) {
		if (name === "edit")
			showEditView(data);
		return false;
	});

	// 点击操作按钮
	view.on("click", "header > .btnbar .btn", function (e) {
		var btnName = $(e.currentTarget).attr("name");
		if (btnName === "create")
			showEditView();
	});

	///////////////////////////////////////////////////////
	var showEditView = function (data) {
		var moduleUrl = "/module/workorder/orders/edit";
		if (data)
			moduleUrl += "?id=" + data.id;

		var dialog = VR.Component.Dialog.create({title: "工单编辑", module: moduleUrl});

		dialog.on("view_submit", function (e) {
			listView.reload();
		});
	}

});
