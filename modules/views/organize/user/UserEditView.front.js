/**********************************************************
 * 用户编辑页面
 *********************************************************/

define(function ($, VR, Utils) {

	var view = $(".view-user-edit");
	var moduleView = view.parent().parent();

	var userInfo = view.data("viewData"); console.log('<userInfo>',userInfo);

	///////////////////////////////////////////////////////
	moduleView.on("dialog_submit", function (e) {
		var data = {};
		data.id = userInfo && userInfo.id;

		data.name = view.find("dl.userName input").val();
		if (Utils.isBlank(data.name))
			return alert("请输入登录帐号");

		var depart = VR.Component.Combobox.find(view.find("dl.depart"))[0];
        depart = depart && depart.getSelectedData();
		if (!depart)
			return alert("请选择所属科室");
		data.tenantId = singer.id;
		data.tenantName = singer.name;

		data.album = view.find("dl.album input").val();
		
		VR.post("user.register", data, function (err, ret) {
			moduleView.trigger("submit_to_dialog");
		});
	});

});
