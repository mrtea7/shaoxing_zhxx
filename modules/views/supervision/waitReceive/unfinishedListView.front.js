/**********************************************************
 * 工单列表视图，查询工单信息
 *********************************************************/

define(function ($, VR, Utils) {
	var view = $(".view-supervision-unfinished");

	var listView = VR.Component.Datagrid.find(view)[0];


	///////////////////////////////////////////////////////
	// 点击行，显示详情页面
	listView && listView.on("itemclick", function (e, data) {
		frame.showDetails("/module/supervision/waitReceive/detail", {id: data.id});
	});


	view.on("click", "header > .btnbar .btn", function (e) {
		var btnName = $(e.currentTarget).attr("name");
		if (btnName === "create")
			showEditView();
	});

	///////////////////////////////////////////////////////
	var showEditView = function (data) {
		var moduleUrl = "/module/supervision/unfinished/edit";
		if (data)
			moduleUrl += "?id=" + data.id;

		var dialog = VR.Component.Dialog.create({title: "督查督办", module: moduleUrl});

		dialog.on("view_submit", function (e) {
			listView.reload();
		});
	}

});
