/**********************************************************
 * 未完成新建
 *********************************************************/
define(function ($, VR, Utils) {
    var FileUploader = requirejs("mfh.FileUploader", function () {
    });

    var view = $(".view-supervision-edit");
    var moduleView = view.parent().parent();

    var uploader = null;

    ///////////////////////////////////////////////////////
    view.on("click", ".attachbtn", function () {
        if (!uploader) {
            uploader = FileUploader.create({target: view});
        }
        uploader.browser();
    });

    moduleView.on("dialog_save", function (e) {
        var data = getValidateData();
        console.log(data);

        // var testData = {
        //     "dcdbWorkorderTaskList": [
        //         {
        //             "tenantName": "2",
        //             "officeId": "1"
        //         },
        //         {
        //             "tenantName": "2",
        //             "officeId": "2"
        //         },
        //         {
        //             "tenantName": "2",
        //             "officeId": "3"
        //         }
        //     ],
        //     "title": "督察督办标题",
        //     "content": "督察督办任务描述",
        //     "deadline": "2017-03-20 00:00:00"
        // }
        // console.log('<data>',selectedOffice);
        // // console.log('<testData>', typeof  testData.dcdbWorkorderTaskList);
        // // console.log('<?>', testData.dcdbWorkorderTaskList == data.dcdbWorkorderTaskList);

        // // VR.post("sup.create", testData, function (err, ret) {
        // //     moduleView.trigger("save_to_dialog");
        // // });
    });

    ///////////////////////////////////////////////////////
    var getValidateData = function () {
        var data = {};

        data.title = view.find("dl.title input").val();
        if (Utils.isBlank(data.title)) {
            alert("请输入标题");
            return false;
        }

        data.content = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.content)) {
            alert("请输入内容");
            return false;
        }

        data.type = VR.Component.Combobox.find(view.find("dl.type"))[0].getSelectedData();
        console.log('<singer>',data.type);
        
        data.dcdbWorkorderTaskList = Utils.map(view.find("dl.office input:checked"), function (input) {
            {
                var selectedOffice = input.val().split('-');
                return {tenantName: selectedOffice[0], officeId: selectedOffice[1]};
            }
        })
        data.deadline = VR.Component.DateInput.find(view.find("dl.deadline"))[0];
        data.deadline = data.deadline && data.deadline.getDate(); // 暂不支持格式化参数
        data.deadline = data.deadline && Utils.toDateString(data.deadline, "yyyy-MM-dd");
        console.log('<data>', data);

        return data;
    };


    // var uploader = null;
    // var FileUploader = requirejs("mfh.fileuploader");
    // view.on("click", ".attach", function () {
    //     if (!uploader) {
    //         uploader = FileUploader.create({target: view});
    //         // uploader.on("change", importFileChangeHandler);
    //     }
    //     uploader.browser();
    // });

});
