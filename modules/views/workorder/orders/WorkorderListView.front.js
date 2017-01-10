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

});
