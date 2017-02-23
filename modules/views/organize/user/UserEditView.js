/**********************************************************
 * 新建用户页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var UserService = require(__basedir + "/service/UserService");
var DeptService = require(__basedir + "/service/DeptService");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UIHGroup = VRender.UIHGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;
var UIDateInput = VRender.UIDateInput;

var WorkorderEditView = BaseView.extend(module, {
    className: "view-user-edit",
    readyCode: "user.edit",

    doInit: function () {
        WorkorderEditView.__super__.doInit.call(this);
        var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
        var callbacks = [this.getDeptList];
        Utils.exec(this, callbacks, params, function () {
            this.ready("user.edit");
        });
    },

    getDeptList: function (params, callback) {
        var self = this;
        DeptService.list(params.session, params, function (err, ret) {
            self.role = ret;
            callback(false, params);
        });
    },

    getViewData: function () {
        return this.orderInfo;
    },

    renderView: function () {
        WorkorderEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo || {};

        if (order.id)
            this.renderItem(form, "humanId", "编号", "<p>" + order.id + "</p>");

        this.renderItem(form, "userName", "登录帐号", new UITextView(this, {
            prompt: "请输入登录帐号", required: true, empty: "登录帐号不能为空", maxSize: 30, width: 300, value: order.name
        }));

        this.renderItem(form, "userCaption", "真实姓名", new UITextView(this, {
            prompt: "请输入真实姓名", required: true, empty: "登录名不能为空", value: order.album, width: 300
        }));

        this.renderItem(form, "password", "密码", new UITextView(this, {
            type: 'password', required: true, prompt: "请输入密码", value: order.album, width: 300
        }));

        this.renderItem(form, "confirmPassword", "确认密码", new UITextView(this, {
            type: 'password', required: true, prompt: "请确认密码", value: order.album, width: 300
        }));

        this.renderItem(form, "dept", "所属科室", new UICombobox(this, {
            prompt: "请选择所属科室", required: true, data: this.singers, selectedId: order.singerId
        }));
    },

    renderItem: function (form, name, label, view) {
        var item = form.appendAndGet("<dl></dl>");
        item.addClass(name).attr("name", name);
        item.append("<dt>" + label + "</dt>");
        var container = item.appendAndGet("<dd></dd>");
        if (view) {
            if (view instanceof VRender.UIView)
                view.render(container);
            else
                container.append(view);
        }
        return item;
    }
});
