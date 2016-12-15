define("frame", function ($, VR, Utils) {

    if (window.frame)
        return;

    var frame = window.frame = function () {
    };

    frame.getCurrentPortal = function () {

    };

    frame.getCurrentModule = function () {

    };

    frame.getCurrentAction = function () {

    };

    frame.getCurrentParams = function (name) {

    };

    frame.navigate = function (state, replace, trigger) {
        var url = "/admin/" + state.moduleName;
        VR.navigate(url, {name: state.moduleName});
        // var url = state.moduleName;
        // VR.navigate(url, {moduleName: url});
    };

    //
    frame.showMsg = function (msg, type, delay, callback) {

    };

    var initRouter = function () {
        var SinglePage = VR.plugins.singlepage;
        if (SinglePage) {
            SinglePage.setViewHandler(function (state, callback) {
                // state = {name: "aaa"};
                var url = "/module/" + (state.name || "index");
                VR.require(url, function (err, html) {
                    if (err) {
                        var errmsg = err;
                        frame.showMsg(errmsg, "error");
                    }
                    else {
                        callback(false, html);
                    }
                });
                //     var url = "/admin/";
                //     url += (state && state.url) ? state.url : "index";
                //     VR.require(url, function (err, html) {
                //         if (err) {
                //             var errmsg = err;
                //             callback(false, "<div class='text-error'>" + errmsg + "</div>");
                //         }
                //         else {
                //             callback(false, html);
                //         }
                //     });
            });
        }
    };

    $(function () {
        initRouter();
    });
});
