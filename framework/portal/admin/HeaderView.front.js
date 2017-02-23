/**
 * 主页面头部功能
 */

define(function ($, VR, Utils) {

    // 点击退出按钮
    $(".exit").on("click", function (e) {
        if ($(e.currentTarget).is(".disabled"))
            return;
        doLogout();
    });

    ///////////////////////////////////////////////////////
    // 退出
    var doLogout = function () {
        var exitBtn = $(".exit").removeClass("head-lnk");
        exitBtn.removeClass("head-lnk").text("正在退出..");

        VR.post("exit", function (err, ret) {  //Node端api名称
            if (err == "退出成功") { // 退出成功
                window.location.replace("/");
                window.location.reload(true);
            }
            else { // 退出失败
                exitBtn.addClass("head-lnk").text("退出");
            }
        }, true);
    };

});