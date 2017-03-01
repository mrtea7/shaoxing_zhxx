/**********************************************************
 * 工单编辑页面
 *********************************************************/

define(function ($, VR, Utils) {

	var view = $(".view-workorder-edit");
	var moduleView = view.parent().parent();

	var orderInfo = view.data("viewData"); console.log(orderInfo);

	///////////////////////////////////////////////////////
	moduleView.on("dialog_submit", function (e) {
		var data = {};
		data.id = orderInfo && orderInfo.id;

		data.name = view.find("dl.name input").val();
		if (Utils.isBlank(data.name))
			return alert("请输入歌曲名称");

		var singer = VR.Component.Combobox.find(view.find("dl.singer"))[0];
		singer = singer && singer.getSelectedData();
		if (!singer)
			return alert("请选择歌手");
		data.singerId = singer.id;
		data.singer = singer.name;

		data.album = view.find("dl.album input").val();
		
		VR.post("test.data.save", data, function (err, ret) {
			moduleView.trigger("submit_to_dialog");
		});
	});

});
