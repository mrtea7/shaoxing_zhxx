define(function ($, VR, Utils,FileUploader) {
    // var FileUploader = ;

    var view = $(".view-workorder-detail");
    var upbtn = $(".upbtn");
    var uploader = null;

    view.on("click", ".upbtn", function () {
        if (!uploader) {
            uploader = FileUploader.create({target: importView});
            uploader.on("change", importFileChangeHandler);
        }
        uploader.browser();
    });
});