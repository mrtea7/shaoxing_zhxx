
var ModuleBase = require("./base/ModuleBase");


var Mobile = ModuleBase.extend(module, {
    getView: function (module, action, params) {
        // var CustomlerView = this.use(__dirname + "/customer/CustomerView");
        // return new CustomlerView(this);
        return "mobile";
    }
});
