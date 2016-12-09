var VRender = require("v-render");


var ContainerView = VRender.UIView.extend(module, {
    className: "main-container",

    renderView: function () {
        ContainerView.__super__.renderView.call(this);
        this.$el.append("<aside class='platform-container'>" +
            "<div class='a'>这里是内容部分</div>" +
            "</aside>")
    }
});
