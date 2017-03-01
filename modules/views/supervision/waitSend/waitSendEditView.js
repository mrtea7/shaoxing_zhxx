/**********************************************************
 * 工单编辑页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UIHGroup = VRender.UIHGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;
var UIDateInput = VRender.UIDateInput;

var WorkorderEditView = BaseView.extend(module, {
    className: "view-supervision-edit",
    readyCode: "supervision.edit",

    doInit: function () {
        WorkorderEditView.__super__.doInit.call(this);

        var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
        var callbacks = [this.getCompany, this.getOffice, this.getOrderInfo];
        Utils.exec(this, callbacks, params, function () {
            this.ready("supervision.edit");
        });
    },

    getCompany: function (params, callback) {
        var self = this;
        TestService.getSingers(params.session, null, function (err, ret) {
            self.singers = ret;
            callback(false, params);
        });
    },
    getOffice: function (params, callback) {
        var self = this;
        TestService.getSingers(params.session, null, function (err, ret) {
            self.singers = ret;
            callback(false, params);
        });
    },

    getOrderInfo: function (params, callback) {
        if (params.orderId) {
            var self = this;
            TestService.getById(params.session, params.orderId, function (err, ret) {
                self.orderInfo = !err ? ret : null;
                callback(err, params);
            });
        }
        else {
            callback(false, params);
        }
    },

    getViewData: function () {
        return this.orderInfo;
    },

    renderView: function () {
        WorkorderEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo || {};

        if (order.id)
            this.renderItem(form, "name", "编号", "<p>" + order.id + "</p>");

        this.renderItem(form, "title", "标题", new UITextView(this, {
            required: true, empty: "请输入标题，标题不能为空",
            maxSize: 50, width: 500, value: order.name
        }));

        this.renderItem(form, "content", "内容", new UITextView(this, {
            required: true, empty: "请输入内容，内容不能为空",
            maxSize: 400, multi: true, width: 500, value: order.name
        }));

        this.renderItem(form, "deadline", "截止日期", new UIDateInput(this));

        this.renderItem(form, "office", "科室", new UIGroup(this, {gap: 10, tag: "p"})
            .append(this.renderItem(form, "road", "绍兴市交通运输局 ->", new UIHGroup(this, {gap: 10, tag: "p"})
                    .append(new UICheckbox(this, {label: "公路科室1", value: "1"}))
                    .append(new UICheckbox(this, {label: "公路科室2", value: "2"}))
                    .append(new UICheckbox(this, {label: "公路科室3", value: "3"}))

            ))
            .append(this.renderItem(form, "trans", "运管局 ->", new UIHGroup(this, {gap: 10, tag: "p"})
                .append(new UICheckbox(this, {label: "运管科室1", value: "1"}))
                .append(new UICheckbox(this, {label: "运管科室2", value: "2"}))
                .append(new UICheckbox(this, {label: "运管科室3", value: "3"}))
            ))
        );

        this.renderItem(form, "sms", "短信通知", new UIRadioGroup(this, {
            data: [{name:"发送",value:1},{name:"不发送",value:0}], width: 400, selectedIndex: 4}));
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
