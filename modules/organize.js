/**********************************************************
 * 组织机构模块，部门、员工等
 *********************************************************/

var VRender = require("v-render");
var ModuleBase = require("./base/ModuleBase");


var OrganizeModule = ModuleBase.extend(module, {
    id: "mod-organize",

    getView: function (module, action, params) {
        return this.getSupervisionTodoView(module, action, params);
    },

    ///////////////////////////////////////////////////////
    getSupervisionTodoView: function (module, action, params) {
        return this.getCurrentModuleView(function (mview) {
            if (action === "user.detail")
                return __dirname + "/views/organize/user/UserEditView";
            if (action === "user.edit")
                return __dirname + "/views/organize/user/UserEditView";
            return __dirname + "/views/organize/user/UserListView";
        });
    },


});
