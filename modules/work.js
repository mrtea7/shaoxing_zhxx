
var ModuleBase = require("./base/ModuleBase");


var Work = ModuleBase.extend(module, {
    getView: function (module, action, params) {
        // var CustomlerView = this.use(__dirname + "/customer/CustomerView");
        return "work";
    }
});