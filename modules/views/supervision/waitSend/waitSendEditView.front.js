/**********************************************************
 * 待派发编辑页面
 *********************************************************/
define(function ($, VR, Utils) {

	var view = $(".view-supervision-edit");
	var moduleView = view.parent().parent();

	///////////////////////////////////////////////////////
	moduleView.on("dialog_submit", function (e) {
		var data = {};

		var testData = {
            "dcdbWorkorderTaskList": [
                {
                    "tenantName": "2",
                    "officeId": "4"
                },
                {
                    "tenantName": "2",
                    "officeId": "5"
                },
                {
                    "tenantName": "2",
                    "officeId": "6"
                }
            ],
            "title": "测试标题",
            "content": "任务描述",
            "deadline": "2017-02-20 00:00:00"
        };
		
		VR.post("sup.create", testData, function (err, ret) {
			moduleView.trigger("submit_to_dialog");
		});
	});

});
