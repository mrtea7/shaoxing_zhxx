
var VRender = require("v-render");


var HeaderView = VRender.UIView.extend(module, {
    className: "main-head",

    renderView: function () {
        HeaderView.__super__.renderView.call(this);
        this.$el.append(
            "<img class='platform-logo' src='https://avatar.tower.im/e365ab89df534b009326194926796498'/>" +
            "<h1 class='platform-title'>绍兴综合信息管理系统</h1>" +
            "<div class='command-bar'>" +
            "<div class='command-button'><svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-reminder'></use></svg></div>" +
            "<div class='command-button'><svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-reminder'></use></svg></div>" +
            "<div class='command-button'><svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-reminder'></use></svg></div>" +
            "<div class='command-button'><svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-reminder'></use></svg></div>" +
            "<div class='command-button'>" +
            // "<img class='user-img' src='https://avatar.tower.im/e365ab89df534b009326194926796498'/>" +
            "<span>黄挺</span><svg class='icon icon-right icon-size-1_5'><use xlink:href='#icon-down'></use></svg>" +
            "</p>")
    }
});
