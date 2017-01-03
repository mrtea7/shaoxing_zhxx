
var VRender = require("v-render");


var CustomerView = VRender.UIView.extend(module, {
    renderView: function () {
        CustomerView.__super__.renderView.call(this);
        this.$el.append("<div class='header'>设备设备设备</div>" +
            "<div class='plate'>条件条件</div>" +
            "<div class='list'>列表</div>");
    }
});

CustomerView.import("./CustomerView2.css");
