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
            uploader.on("change", importFileChangeHandler);
        }
        uploader.browser();
    });
    var importFileChangeHandler = function (e, files) {
        var file = (files && files.length > 0) ? files[0] : null;
        if (file) {
            doFileUploadAndImport(file.name);
            view.find("dl.attach").append("<div class='fileinfos'>" + file.name + "</div>");
        }

    };
    var doFileUploadAndImport = function (fileName) {
        if (uploader && uploader.hasFileSelected()) {
            uploader.upload("/upload/dcdbWorkorderAttach/upload", {dcdbId: 69, fileToUpload:fileName}, function (err, ret) {
                console.log("<fileUpload>", err, ret);
                if (err) {
                    alert("上传出错")
                }
                else {
                    alert("上传成功");
                }
            });
        }
        else {
            return frame.tooltip("请选择导入文件");
        }
    };

    moduleView.on("dialog_save", function (e) {
        var data = getValidateData();
        VR.post("sup.create", data, function (err, ret) {
            moduleView.trigger("submit_to_dialog");
        });
    });
    moduleView.on("dialog_submit", function (e) {
        var data = getValidateData();
        VR.post("sup.send", data, function (err, ret) {
            moduleView.trigger("submit_to_dialog");
        });
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

        data.orderType = VR.Component.Combobox.find(view.find("dl.type"))[0].getSelectedData().label;

        data.dcdbWorkorderTaskList = Utils.map(view.find("dl.office input:checked"), function (input) {
            {
                var selectedOffice = input.val().split('-');
                return {tenantName: selectedOffice[0], officeId: selectedOffice[1]};
            }
        });
        data.deadline = VR.Component.DateInput.find(view.find("dl.deadline"))[0];
        data.deadline = data.deadline && data.deadline.getDate(); // 暂不支持格式化参数
        data.deadline = data.deadline && Utils.toDateString(data.deadline, "yyyy-MM-dd HH:mm:ss");

        return data;
    };
});
