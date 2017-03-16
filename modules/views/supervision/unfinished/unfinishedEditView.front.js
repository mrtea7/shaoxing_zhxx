/**********************************************************
 * 未完成新建
 *********************************************************/
define(function ($, VR, Utils) {
    var FileUploader = requirejs("mfh.FileUploader", function () {
    });

    var view = $(".view-supervision-edit");
    var listView = VR.Component.Datagrid.find($(".view-supervision-unfinished"))[0];

    var moduleView = view.parent().parent();
    var orderId = view.data("viewData");

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
            uploader.upload("/dcdbWorkorderAttach/upload", {dcdbId: id, fileToUpload: fileName}, function (err, ret) {
                if (err) {
                    return frame.tooltip("上传出错:"+err);
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

    moduleView.on("dialog_save", function (e) {
        var data = getValidateData();
        if (data.id)
            VR.post("sup.update", data, function (err, ret) {
                if (err)
                    return frame.tooltip("修改失败:"+err);
                else
                    doFileUploadAndImport(ret, tempFileName);
                listView.reload();
                moduleView.trigger("submit_to_dialog");
            });
        else
            VR.post("sup.create", data, function (err, ret) {
                if (err)
                    return frame.tooltip("创建失败:"+err);
                else
                    doFileUploadAndImport(ret, tempFileName);
                moduleView.trigger("submit_to_dialog");
            });
    });
    moduleView.on("dialog_submit", function (e) {
        var data = getValidateData();
        VR.post("sup.send", data, function (err, ret) {
            if (err)
                return frame.tooltip("发送失败:"+err);
            else
                doFileUploadAndImport(ret, tempFileName);
            listView.reload();
            moduleView.trigger("submit_to_dialog");
        });
    });

    ///////////////////////////////////////////////////////
    var getValidateData = function () {
        var data = {};
        if (orderId)
            data.id = orderId;
        data.title = view.find("dl.title input").val();
        if (Utils.isBlank(data.title)) {
            frame.tooltip("请输入标题");
            return false;
        }

        data.content = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.content)) {
            frame.tooltip("请输入内容");
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
