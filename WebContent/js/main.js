/**********************************************************
 * 应用框架主视图前端脚本设计
 *********************************************************/

define(function ($, VR, Utils) {
    
    var view = $("#main-body");

    ///////////////////////////////////////////////////////
    // 模块相关功能

    // 左边菜单点击事件，进行模块之间的切换
    view.on("click", ".main-container > .sidemenu .menu", function (e) {
    	var menu = $(e.currentTarget);
    	if (menu.parent().is(".menu-list")) {
    		if (menu.is(".selected"))
    			menu.toggleClass("open");
    		else {
    			
    		}
    	}
    	else /*if (menu.parent().is(".submenu-list"))*/ {

    	}
    });

});