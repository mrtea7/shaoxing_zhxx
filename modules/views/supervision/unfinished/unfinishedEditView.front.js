/**********************************************************
 * 未完成新建
 *********************************************************/
define(function ($, VR, Utils) {
    var FileUploader = requirejs("mfh.FileUploader", function () {
    });

    var view = $(".view-supervision-edit");
    var listView = VR.Component.Datagrid.find($(".view-supervision-unfinished"))[0];

    var moduleView = view.parent().parent();
    var orderInfo = view.data("viewData");
    var orderId = orderInfo.id;

    var uploader = null;
    var tempFileName = null;

    ///////////////////////////////////////////////////////
    view.on("click", ".attachbtn", function () {
        if (!uploader) {
            uploader = FileUploader.create({target: view});
            uploader.on("change", importFileChangeHandler);
        }
        uploader.browser("multi");
    });
    var importFileChangeHandler = function (e, files) {
        var file = (files && files.length > 0) ? files[0] : null;
        if (file) {
            var timestamp = Date.now();
            view.find("dl.attach").append("<div class='fileinfos' id='" + timestamp + "'>" + file.name + "</div>");
            tempFileName = file.name;
        }
    };
    view.on("click", ".fileinfos", function (e) {
        var id = e.currentTarget.id;
        var name = e.currentTarget.innerHTML;
        frame.confirm({text: "是否删除？", desc: name}).done(function () {
            $("#" + id).remove();
            $("#" + id).remove();
            if (id.toString().length == 13)
                return;
            else
                VR.post("sup.main.delete", {id: id}, function (err, ret) {
                    if (err)
                        return frame.tooltip("删除失败:" + err);
                    else
                        return frame.tooltip("删除成功:" + name, "success");
                });
        });
    });
    var doFileUploadAndImport = function (id, fileName) {
        if (uploader && uploader.hasFileSelected()) {
            var waitting = frame.waitting();
            uploader.upload("/upload/dcdbWorkorderAttach/upload", {
                dcdbId: id,
                fileToUpload: fileName
            }, function (err, ret) {
                waitting.remove();
                if (err) {
                    return frame.tooltip("上传出错:" + err);
                }
                else {

                    frame.tooltip("上传成功", "success");
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
                    return frame.tooltip("修改失败:" + err);
                else
                    doFileUploadAndImport(orderId, tempFileName);
                listView.reload();
                moduleView.trigger("submit_to_dialog");
            });
        else
            VR.post("sup.create", data, function (err, ret) {
                if (err)
                    return frame.tooltip("创建失败:" + err);
                else
                    doFileUploadAndImport(ret, tempFileName);
                moduleView.trigger("submit_to_dialog");
            });
    });
    moduleView.on("dialog_submit", function (e) {
        var data = getValidateData();
        VR.post("sup.send", data, function (err, ret) {
            if (err)
                return frame.tooltip("发送失败:" + err);
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
            return;
        }

        data.content = view.find("dl.content textarea").val();
        if (Utils.isBlank(data.content)) {
            frame.tooltip("请输入内容");
            return;
        }
        data.orderType = orderInfo.orderType || VR.Component.Combobox.find(view.find("dl.type"))[0].getSelectedData().label;

        data.dcdbWorkorderTaskList = Utils.map(view.find("dl.office input:checked"), function (input) {
            {
                var selectedOffice = input.val().split('-');
                return {tenantName: selectedOffice[0], officeId: selectedOffice[1]};
            }
        });
        if (Utils.isBlank(data.dcdbWorkorderTaskList)) {
            frame.tooltip("请选择发送到的科室");
            return;
        }
        data.deadline = VR.Component.DateInput.find(view.find("dl.deadline"))[0];
        data.deadline = data.deadline && data.deadline.getDate(); // 暂不支持格式化参数
        data.deadline = data.deadline && Utils.toDateString(data.deadline, "yyyy-MM-dd HH:mm:ss");

        return data;
    };
});
