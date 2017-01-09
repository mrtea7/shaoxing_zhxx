/**********************************************************
 * 组织机构模块，部门、员工等
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var OrganizeModule = ModuleBase.extend(module, {
	id: "mod-organize",

	getView: function (module, action, params) {
		return this.getCurrentModuleView(function (mview) {
			return {html: "<div>组织机构管理</div>"};
		});
	}
});
