
var VRender = require("v-render");
var SysConfig = require("./config/sys_config");

var Application = module.exports;

Application.setup = function (options) {
    var params = VRender.Utils.extend({}, SysConfig, options);
    VRender.create().initialize(params).run();
};
