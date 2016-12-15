var VRender = require("v-render");


var DetailView = VRender.UIView.extend(module, {
    className: "detail-container",

    renderView: function () {
        DetailView.__super__.renderView.call(this);
        this.$el.append("<aside class='detail-container'>" +
            "<div>这里是详情部分</div>" +
            "</aside>")
    }
});
