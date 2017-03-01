/**********************************************************
 * 应用框架主视图前端脚本设计
 *********************************************************/

define("mainview", function ($, VR, Utils) {
    
    var view = $("#main-body");

    ///////////////////////////////////////////////////////

    // 路由变更
    VR.on(VR.event_routerchange, function (e, state) {
    	var sideMenu = view.find(".main-container > .sidemenu");
    	sideMenu.find(".selected").removeClass("selected");
    	sideMenu.find(".open").removeClass("open");
    	if (state && state.module) {
    		var menu = sideMenu.find(".menu-list > .menu[name='" + state.module + "']");
    		menu.addClass("selected").addClass("open");
    		if (state.action) {
    			var action = state.action.split(".")[0];
    			menu.find(".menu[name='" + action + "']").addClass("selected");
    		}
    	}
    });

    // 左边菜单点击事件，进行模块之间的切换
    view.on("click", ".main-container > .sidemenu .menu > .title", function (e) {
    	var menu = $(e.currentTarget).parent();
    	if (menu.parent().is(".menu-list")) {
    		if (menu.is(".open"))
    			menu.removeClass("open");
    		else
    			menu.addClass("open").siblings().removeClass("open");
    		if (!menu.is(".selected")) {
    			var state = {module: menu.attr("name")};
    			if (menu.is(".has-child"))
    				state.action = menu.children(".submenu-list").children(":eq(0)").attr("name");
    			frame.navigate(state);
    		}
    	}
    	else /*if (menu.parent().is(".submenu-list"))*/ {
    		if (!menu.is(".selected")) {
    			var state = {action: menu.attr("name")};
    			state.module = menu.parent().parent().attr("name");
    			frame.navigate(state);
    		}
    	}
    	// return false;
    });

    view.on("click", ".main-detail", function () {
        return false;
    });

    ///////////////////////////////////////////////////////
    (function () {
    	// 初始化单例模式
    	var SinglePage = VR.plugins.singlepage;
    	if (SinglePage) {
    		SinglePage.setViewHandler(function (state, callback) {
    			var pathname = "/module";
    			pathname += "/" + (state.module || "index");
    			if (state.action)
    				pathname += "/" + state.action.replace(/\./g, "/");
    			if (state.params)
    				pathname += "?" + $.param(state.params);
                pathname += (pathname.indexOf("?") < 0 ? "?" : "&") + "need_title=1";
    			VR.require(pathname, function (err, ret) {
    				if (err) {
    					// frame.tooltip(err);
    					callback(false, "<div class='text-error'>" + err + "</div>");
    				}
    				else {
    					callback(false, ret);
    				}
    			});
    		});
    	}
    })();

    ///////////////////////////////////////////////////////
    // 加载并显示详细视图
    var showDetails = function (pathname, params, callback) { //console.log(url, params);
        var target = view.children(".main-detail").empty().addClass("loading");

        var url = pathname;
        if (params)
            url += (url.indexOf("?") < 0 ? "?" : "&") + $.param(params);
        VR.require(url, function (err, ret) {
            target.removeClass("loading");
            target.html(err ? ("<div class='text-error'>" + err + "</div>") : ret);
            if (Utils.isFunction(callback))
                callback(err, ret);
        });

        var body = $("body").off("click.maindetails");
        view.addClass("show-detail");
        setTimeout(function () {
            body.on("click.maindetails", function () {
                body.off("click.maindetails");
                view.removeClass("show-detail");
            });
        }, 0);
    };

    ///////////////////////////////////////////////////////
    return {
        showDetails: showDetails
    };

});