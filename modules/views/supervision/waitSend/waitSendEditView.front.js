/**********************************************************
 * 待派发编辑页面
 *********************************************************/
define(function ($, VR, Utils) {

    var view = $(".view-supervision-edit");
    var moduleView = view.parent().parent();

    ///////////////////////////////////////////////////////
    moduleView.on("dialog_save", function (e) {
        var data = {};

        data.title = view.find("dl.title input").val();
        if (Utils.isBlank(data.title))
            return alert("请输入标题");

        data.content = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.content))
            return alert("请输入内容");

        data.dcdbWorkorderTaskList = Utils.map(view.find(".ui-chkbox input:checked"), function (input) {
            return input.val()
        });
        // data.sendSMS = Utils.map(view.find(".ui-radbox input:checked"), function (input) {
        //     return input.val()
        // });


        // var deadline = VR.Component.DateInput.find(view);
        // console.log('<deadline>',deadline);
        // data.deadline = deadline.getDate("yyyy-MM-dd HH:mm:ss");
        data.deadline = "2017-04-20 00:00:00";
        // console.log('<data>',data);


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
            "title": "督察督办标题",
            "content": "督察督办任务描述",
            "deadline": "2017-03-20 00:00:00"
        }
        VR.post("sup.create", testData, function (err, ret) {
            moduleView.trigger("save_to_dialog");
        });
    });

});
