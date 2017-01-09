/**********************************************************
 * 模块视图基类
 *********************************************************/

var VRender = require("v-render");


var ModuleView = VRender.UIView.extend(module, {
	renderView: function () {
		ModuleView.__super__.renderView.call(this);
	}
});
