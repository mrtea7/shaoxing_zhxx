
var VRender = require("v-render");


var CustomerView = VRender.UIView.extend(module, {
    renderView: function () {
        CustomerView.__super__.renderView.call(this);
        this.$el.append("<div></div>");
    }
});

CustomerView.import("./CustomerView2.css");
