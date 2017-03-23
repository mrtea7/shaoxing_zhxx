/**********************************************************
 * 已接收办理
 *********************************************************/
define(function ($, VR, Utils) {
    var FileUploader = requirejs("mfh.FileUploader", function () {});

    var view = $(".view-supervision-edit");
    var taskID = view.data("viewData");
    var moduleView = view.parent().parent();
    var uploader = null;
    var tempFileName = null;
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
            view.find("dl.attach").append("<div class='fileinfos'>" + file.name + "</div>");
            tempFileName = file.name;
        }

    };
    var doFileUploadAndImport = function (id, fileName) {
        if (uploader && uploader.hasFileSelected()) {
            uploader.upload("/upload/dcdbWorkorderTaskAttach/upload", {dcdbTaskId: id, fileToUpload: fileName,fileType:0,fileOrder:0}, function (err, ret) {
                if (err) {
                    frame.tooltip("上传出错:"+err)
                }
                else {
                    frame.tooltip("上传成功","success");
                }
            });
        }
        else {
            return frame.tooltip("请选择导入文件");
        }
    };

    moduleView.on("dialog_submit", function (e) {
        var data = getValidateData();
        VR.post("sup.feedback", data, function (err, ret) {
            if (err)
                return frame.tooltip("保存出错啦:"+err);
            else
                doFileUploadAndImport(taskID, tempFileName);
            moduleView.trigger("submit_to_dialog");
        });
    });

    ///////////////////////////////////////////////////////
    var getValidateData = function () {
        var data = {};
        data.id = taskID;
        data.feedback = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.feedback)) {
            frame.tooltip("请输入内容");
            return false;
        }

        return data;
    };
});
