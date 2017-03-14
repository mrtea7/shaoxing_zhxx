/**********************************************************
 * 未完成新建
 *********************************************************/
define(function ($, VR, Utils) {
    var FileUploader = requirejs("mfh.FileUploader", function () {
    });

    var view = $(".view-supervision-edit");
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
            console.log('<{dcdbId: id, fileToUpload: fileName}>', {dcdbTaskId: id, fileToUpload: fileName});
            uploader.upload("/dcdbWorkorderTaskAttach/upload", {dcdbTaskId: id, fileToUpload: fileName}, function (err, ret) {
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

    moduleView.on("dialog_submit", function (e) {
        var data = getValidateData();
        console.log('<data>',data);
        VR.post("sup.feedback", data, function (err, ret) {
            if (err)
                return alert("保存出错啦");
            else
                // doFileUploadAndImport(ret, tempFileName);
            moduleView.trigger("submit_to_dialog");
        });
    });

    ///////////////////////////////////////////////////////
    var getValidateData = function () {
        var data = {};
        data.id = 218;
        data.feedback = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.feedback)) {
            alert("请输入内容");
            return false;
        }

        return data;
    };
});
