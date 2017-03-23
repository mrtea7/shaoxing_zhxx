/**********************************************************
 * 工单编辑页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");
var DeptService = require(__basedir + "/service/deptService");
var SupervisionService = require(__basedir + "/service/supervisionService");
var DictionaryService = require(__basedir + "/service/dictionaryService");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UIButton = VRender.UIButton;
var UIHGroup = VRender.UIHGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;
var UIDateInput = VRender.UIDateInput;

/*var officeLists = [[
 {
 bean: {
 officeName: "审批科",
 tenantName: 2,
 id: 12,
 }
 },
 {
 bean: {
 officeName: "投诉服务中心",
 tenantName: 2,
 id: 13,
 }
 },
 {
 bean: {
 officeName: "稽查支队",

 tenantName: 2,
 id: 14,

 }
 }
 ], [
 {
 bean: {
 officeName: "市铁办",
 tenantName: 1,
 id: 27,
 }
 },
 {
 bean: {
 officeName: "综合交通指挥中心",

 tenantName: 1,
 id: 28,

 }
 }
 ], [], []];
 var officeList = [
 {
 bean: {
 officeName: "审批科",
 tenantName: 2,
 id: 12,
 }
 },
 {
 bean: {
 officeName: "投诉服务中心",
 tenantName: 2,
 id: 13,
 }
 },
 {
 bean: {
 officeName: "稽查支队",

 tenantName: 2,
 id: 14,

 }
 }
 ];*/

var unfinishedEditView = BaseView.extend(module, {
    className: "view-supervision-edit",
    readyCode: "supervision.edit",

    doInit: function () {
        unfinishedEditView.__super__.doInit.call(this);
        var self = this;
        var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
        self.orderId = params.orderId;
        var callbacks = [this.getOrderInfo, this.getOrderType, this.getCompany, this.getOffice];//前一个方法的callback就是后一个方法的参数
        Utils.exec(this, callbacks, params, function (err, ret) {
            this.ready("supervision.edit");
        });
    },
    getOrderInfo: function (params, callback) {
        var self = this;
        self.orderInfo = {};
        if (!isNaN(params.orderId)) {
            SupervisionService.detailSend(params.session, params.orderId, function (err, ret) {
                if (err)
                    console.log("getOrderInfo出错了" + err);
                else {
                    self.orderInfo.base = ret.info;
                    self.orderInfo.taskList = ret.task;
                    self.selectedOffice = [];
                    Utils.each(self.orderInfo.taskList, function (_selected) {
                        self.selectedOffice.push(_selected.tenantName + "-" + _selected.officeId)
                    });
                    self.orderInfo.attach = ret.attach;
                    callback(false, params);
                }
            });
        }
        else callback(false, params);
    },

    getOrderType: function (params, callback) {
        var self = this;
        DictionaryService.orderType(params.session, null, function (err, ret) {
            var types = [];
            Utils.each(ret.options, function (_type) {
                types.push(_type.value);
            });
            self.orderType = types;
            callback(false, params);
        });
    },
    getCompany: function (params, callback) {
        var self = this;
        DeptService.companyList(params.session, null, function (err, ret) {
            self.companyList = ret.rows;
            self.companyIdList = [];
            Utils.map(self.companyList, function (_item) {
                self.companyIdList.push(_item.bean.id);
                return self.companyIdList;
            });
            callback(false, params);
        });
    },
    getOffice: function (params, callback) {
        var self = this;
        self.officeLists = [];
        DeptService.officeList(params.session, this.companyIdList, function (err, ret) {
            self.officeLists = ret.rows;
            callback(false, params);
        });
    },
    getViewData: function () {
        var orderType = (this.orderInfo.base == undefined) ? null : this.orderInfo.base.orderType;
        return {id: this.orderId, orderType: orderType,attach:this.orderInfo.attach};
    },
    renderView: function () {
        unfinishedEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo.base || {};

        this.renderItem(form, "title", "标题", new UITextView(this, {
            required: true, empty: "请输入标题，标题不能为空",
            maxSize: 50, width: 500, value: order.title
        }));

        this.renderItem(form, "content", "内容", new UITextView(this, {
            required: true, empty: "请输入内容，内容不能为空",
            maxSize: 400, multi: true, width: 500, value: order.content
        }));

        this.renderItem(form, "type", "类型", new UICombobox(this, {
            prompt: "请选择任务类型", data: this.orderType, selectedId: order.orderType, idField: 'orderType'
        }));

        this.renderItem(form, "deadline", "截止日期", new UIDateInput(this, {date: order.deadline, min: Date()}));

        // this.renderItem(form, "attach", "附件", new UIButton(this, {
        //     cls: "attachbtn", label: '点击上传', style: 'ui-btn-success'
        // }));
        this.renderItem(form, "attach", "附件", this.getAttachView());

        this.renderItem(form, "office", "科室", this.getOfficeView());

        // this.renderItem(form, "sms", "短信通知", new UIRadioGroup(this, {
        //     data: [{name:"发送",value:7},{name:"不发送",value:8}], width: 400, selectedIndex: 4}));
    },
    getAttachView: function () {
        var attach = this.orderInfo.attach;
        var attachView = new UIHGroup(this, {gap: 10});
        var attachBtn = new UIButton(this, {cls: "attachbtn", label: '点击上传', style: 'ui-btn-success'});
        attachView.append(attachBtn);
        Utils.each(attach, function (_attach) {
            attachView.append("<div class='fileinfos' id='" + _attach.id + "'>" + _attach.originalFilename + "</div>");
        });

        return attachView;
    },
    getOfficeView: function () {
        var officeView = new UIGroup(this, {gap: 10});
        var officeLists = this.officeLists;
        var selectedOffice = this.selectedOffice;
        var i = 0;
        Utils.each(this.companyList, function (_company) {
            var item = officeView.addChild(new UIGroup(this, {gap: 10, align: "left"}));
            item.append("<p><strong>" + _company.bean.name + " -&gt;</strong></p>");
            var officeList = (officeLists[i] == undefined) ? null : officeLists[i].officeList;
            i++;
            Utils.each(officeList, function (_office) {
                var value = _office.tenantName + "-" + _office.id;
                Utils.find(selectedOffice, function (_value) {
                    return (value == _value) ? _office.checked = true : _office.checked = false;
                });
                item.append(new UICheckbox(this, {
                    label: _office.officeName,
                    value: value,
                    checked: _office.checked
                }));
            });
        });
        return officeView;
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

var FileUploader = unfinishedEditView.use(__basedir, "framework/components/form/FileUploader");

// unfinishedEditView.import("/framework/components/form/FileUploader.js");
