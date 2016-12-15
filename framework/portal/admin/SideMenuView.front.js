define(function ($, VR) {
    var body = $("body");

    ////////////////
    body.on("click", "h1", function (e) {
        var detailView = body.find(".main-detail");
        _toggle(detailView);

    });
    var _toggle = function (ele) {
        var state = ele.hasClass("detail-400");
        if (state)
            ele.removeClass("detail-400");
        else ele.addClass("detail-400");
    };

    ///////////////////////////////////////////////////////
    // 路由变更
    VR.on(VR.event_routerchange, function (e, state) {
        var secondMenus = body.find(".second-menu-list");
        secondMenus.find(".second-menu-selected").removeClass("second-menu-selected");
        secondMenus.find("[moduleName='" + state.name + "']").addClass("second-menu-selected");

    });

///////////////////////////////////////////////////////
//菜单点击分一级菜单和二级菜单
    body.on("click", ".first-menu > a", function (e) {
        var item = $(e.currentTarget);
        if (item.is(".first-menu-selected"))
            return;
        var menus = body.find(".menu-list");
        menus.find(".first-menu-selected").removeClass("first-menu-selected");
        item.addClass("first-menu-selected");
        // var data = {url: item.attr("module")};
        // VR.navigate(("/admin/" + data.url), data);
    });

    body.on("click", ".second-menu > a", function (e) {
        var item = $(e.currentTarget);
        var data = {moduleName: item.attr("moduleName")};
        frame.navigate({moduleName: data.moduleName});
        // VR.navigate(("/docs/" + data.url), data);
    });

///////////////////////////////////////////////////////
// (function () {
//     var SinglePage = VR.plugins.singlepage;
//     if (SinglePage) {
//         SinglePage.setViewHandler(function (state, callback) {
//             var url = "/admin/";
//             url += (state && state.url) ? state.url : "index";
//             VR.require(url, function (err, html) {
//                 if (err) {
//                     var errmsg = err;
//                     callback(false, "<div class='text-error'>" + errmsg + "</div>");
//                 }
//                 else {
//                     callback(false, html);
//                 }
//             });
//         });
//     }
// })();

})
;
