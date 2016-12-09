define(function ($, VR) {
    var body = $("body");

    ///////////////////////////////////////////////////////
    // 路由变更
    VR.on(VR.event_routerchange, function (e, state) {
        var url = state.url.substr(1).split("/");
        console.log('url',url);
        console.log('url.length',url.length);
        if(url.length == 1){
            console.log('1',1);
            var menus = body.find(".menu-list");
            menus.find(".first-menu-selected").removeClass("first-menu-selected");
            menus.find(".second-menu-list").removeClass("hide");
            if (state && state.url)
                menus.find("[router-url='" + state.url + "']").addClass("first-menu-selected");
        }else if(url.length == 2){
            console.log('2',2);
            var secondMenus = body.find(".second-menu-list");
            secondMenus.find(".second-menu-selected").removeClass("second-menu-selected");
            if (state && state.url)
                secondMenus.find("[router-url='" + state.url + "']").addClass("second-menu-selected");
        }

    });
var tol

    ///////////////////////////////////////////////////////
    body.on("click", ".first-menu > a", function (e) {
        var item = $(e.currentTarget);
        if (item.is(".first-menu-selected"))
            return ;
        var data = {url: item.attr("router-url")};
        VR.navigate(("/docs/" + data.url), data);
    });

    body.on("click", ".second-menu > a", function (e) {
        var item = $(e.currentTarget);
        var data = {url: item.attr("router-url")};
        VR.navigate(("/docs/" + data.url), data);
    });

    ///////////////////////////////////////////////////////
    (function () {
        var SinglePage = VR.plugins.singlepage;
        if (SinglePage) {
            SinglePage.setViewHandler(function (state, callback) {
                var url = "/admin/";
                url += (state && state.url) ? state.url : "index";
                VR.require(url, function (err, html) {
                    if (err) {
                        var errmsg = err;
                        callback(false, "<div class='text-error'>" + errmsg + "</div>");
                    }
                    else {
                        callback(false, html);
                    }
                });
            });
        }
    })();

});
