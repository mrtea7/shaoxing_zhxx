
var VRender = require("v-render");


var ModuleBase = VRender.Fragment.extend(module, {
    readyCode: "module.view.ready",

    doInit: function () {
        ModuleBase.__super__.doInit.call(this);

        this.moduleName = "";
        this.actionName = "";
        this.params = {};

        this.moduleView = this.initView();
    },

    initView: function () {
        var view = this.getView(this.moduleName, this.actionName, this.params);
        if (view instanceof VRender.UIView) {
            var self = this;
            view.ready(function () {
                self.ready("module.view.ready");
            });
        }
        else {
            this.ready("module.view.ready");
        }
        return view;
    },

    getView: function (module, action, params) {
        //
    },

    render: function (output) {
        ModuleBase.__super__.render.call(this, output);

        if (this.moduleView) {
            if (this.moduleView instanceof VRender.UIView)
                this.moduleView.render(this.$el);
            else
                this.$el.append(this.moduleView);
        }
    }
});
