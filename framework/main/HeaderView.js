
var VRender = require("v-render");


var HeaderView = VRender.UIView.extend(module, {
    className: "main-head",

    renderView: function () {
        HeaderView.__super__.renderView.call(this);
        this.$el.append("<header class='platform-header'>" +
            "<h1 class='platform-title'>绍兴综合信息管理系统</h1>" +
            "")
    }
});
