/**********************************************************
 * 未完成新建
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

        var selectedOffice = Utils.map(view.find(".ui-chkbox input:checked"), function (input) {
            return input.val()
        });
        // data.dcdbWorkorderTaskList =


        // data.sendSMS = Utils.map(view.find(".ui-radbox input:checked"), function (input) {
        //     return input.val()
        // });


        // var deadline = VR.Component.DateInput.find(view);
        // console.log('<deadline>',deadline);
        // data.deadline = deadline.getDate("yyyy-MM-dd HH:mm:ss");
        data.deadline = "2017-04-20 00:00:00";


        var testData = {
            "dcdbWorkorderTaskList": [
                {
                    "tenantName": "2",
                    "officeId": "1"
                },
                {
                    "tenantName": "2",
                    "officeId": "2"
                },
                {
                    "tenantName": "2",
                    "officeId": "3"
                }
            ],
            "title": "督察督办标题",
            "content": "督察督办任务描述",
            "deadline": "2017-03-20 00:00:00"
        }
        console.log('<data>',selectedOffice);
        // console.log('<testData>', typeof  testData.dcdbWorkorderTaskList);
        // console.log('<?>', testData.dcdbWorkorderTaskList == data.dcdbWorkorderTaskList);

        // VR.post("sup.create", testData, function (err, ret) {
        //     moduleView.trigger("save_to_dialog");
        // });
    });


    var uploader = null;
    var FileUploader = requirejs("mfh.fileuploader");
    view.on("click", ".attach", function () {
        if (!uploader) {
            uploader = FileUploader.create({target: view});
            // uploader.on("change", importFileChangeHandler);
        }
        uploader.browser();
    });

});
