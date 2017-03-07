/**********************************************************
 * 员工列表
 *********************************************************/

define(function ($, VR, Utils) {
	var view = $(".view-organize-list");

	var listView = VR.Component.Datagrid.find(view)[0];

	///////////////////////////////////////////////////////
	listView && listView.setColumnRenderer(function (name, data) {
		if (name === "op")
			return "<a name='edit'>编辑</a>";
	});
	listView && listView.setRowStyleFunction(function (data) {
		// if (data.status === "已超期")
		// 	return "row-error";
	});
	///////////////////////////////////////////////////////
	// 点击行，显示详情页面
	listView && listView.on("itemclick", function (e, data) {
		frame.showDetails("/module/organize/user/detail", {id: data.id});
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
		var moduleUrl = "/module/organize/user/edit";
		if (data)
			moduleUrl += "?id=" + data.id;

		var dialog = VR.Component.Dialog.create({title: "新建用户", module: moduleUrl});

		dialog.on("view_submit", function (e) {
			listView.reload();
		});
	}

});
