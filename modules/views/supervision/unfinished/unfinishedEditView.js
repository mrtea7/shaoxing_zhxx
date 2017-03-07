/**********************************************************
 * 工单编辑页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");


var Utils = VRender.Utils;
var UIGroup = VRender.UIGroup;
var UIButton = VRender.UIButton;
var UIHGroup = VRender.UIHGroup;
var UITextView = VRender.UITextView;
var UIRadioGroup = VRender.UIRadioGroup;
var UICheckbox = VRender.UICheckbox;
var UICombobox = VRender.UICombobox;
var UIDateInput = VRender.UIDateInput;

var companyList = [{
    bean: {
        name: "绍兴市公路局",
        contact: null,
        mobilenumber: null,
        addr: null,
        categoryId: 0,
        organType: null,
        remark: null,
        provinceId: null,
        cityId: null,
        netCode: null,
        qrCodeId: null,
        areaId: null,
        mfhArea: null,
        mfhCity: null,
        longitude: null,
        latitude: null,
        additional: null,
        innerDel: 0,
        ownerId: null,
        gaoId: null,
        status: 1,
        ability: 0,
        tenantId: 1,
        saasId: 134342,
        stockId: null,
        id: 3,
        createdBy: "",
        createdDate: null,
        updatedBy: "",
        updatedDate: "2017-02-25 14:29:00"
    },
    caption: {
        tenantId: "绍兴市交通运输局",
        status: "有效账号"
    }
}, {
    bean: {
        name: "绍兴市港航局222",
        contact: "联系人",
        mobilenumber: "联系人手机号",
        addr: "地址",
        categoryId: null,
        organType: null,
        remark: "备注",
        provinceId: null,
        cityId: null,
        netCode: null,
        qrCodeId: null,
        areaId: null,
        mfhArea: null,
        mfhCity: null,
        longitude: 120.221,
        latitude: 30.232,
        additional: null,
        innerDel: null,
        ownerId: null,
        gaoId: null,
        status: 1,
        ability: null,
        tenantId: 1,
        saasId: 1,
        stockId: null,
        id: 9,
        createdBy: "1",
        createdDate: "2017-02-25 14:47:05",
        updatedBy: "",
        updatedDate: "2017-02-25 14:53:41"
    },
    caption: {
        tenantId: "绍兴市交通运输局",
        status: "有效账号"
    }
}];

var officeList = [{
    bean: {
        officeCode: null,
        officeName: "市铁办",
        parentId: null,
        rootId: 0,
        leaderId: 15,
        tenantName: 1,
        id: 27,
        createdBy: "",
        createdDate: null,
        updatedBy: "",
        updatedDate: "2017-03-01 12:05:57"
    },
    caption: {
        tenantName: "绍兴市交通运输局"
    }
}, {
    bean: {
        officeCode: null,
        officeName: "综合交通指挥中心",
        parentId: null,
        rootId: 0,
        leaderId: 15,
        tenantName: 1,
        id: 28,
        createdBy: "",
        createdDate: null,
        updatedBy: "",
        updatedDate: "2017-03-01 12:05:57"
    },
    caption: {
        tenantName: "绍兴市交通运输局"
    }
}];


var unfinishedEditView = BaseView.extend(module, {
    className: "view-supervision-edit",
    readyCode: "supervision.edit",

    doInit: function () {
        unfinishedEditView.__super__.doInit.call(this);

        var params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};
        var callbacks = [this.getOrderType, this.getOffice, this.getOrderInfo];
        Utils.exec(this, callbacks, params, function () {
            this.ready("supervision.edit");
        });
    },

    getOrderType: function (params, callback) {
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
        unfinishedEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo || {};

        if (order.id)
            this.renderItem(form, "name", "编号", "<p>" + order.id + "</p>");

        this.renderItem(form, "title", "标题", new UITextView(this, {
            required: true, empty: "请输入标题，标题不能为空",
            maxSize: 50, width: 500, value: order.title
        }));

        this.renderItem(form, "content", "内容", new UITextView(this, {
            required: true, empty: "请输入内容，内容不能为空",
            maxSize: 400, multi: true, width: 500, value: order.content
        }));

        this.renderItem(form, "singer", "歌手", new UICombobox(this, {
            prompt: "请选择任务类型", data: this.singers, selectedId: order.singerId
        }));

        this.renderItem(form, "deadline", "截止日期", new UIDateInput(this, {min: Date()}));

        this.renderItem(form, "attach", "附件", new UIButton(this, {
            cls: "attachbtn", label: '点击上传', style: 'ui-btn-success'}));

        this.renderItem(form, "office", "科室", this.getOfficeView());

        // this.renderItem(form, "sms", "短信通知", new UIRadioGroup(this, {
        //     data: [{name:"发送",value:7},{name:"不发送",value:8}], width: 400, selectedIndex: 4}));
    },

    getOfficeView: function () {
        var company = new UIGroup(this, {gap: 10});
        Utils.each(companyList, function (_company) {
            var item = company.addChild(new UIGroup(this));
            item.append("<p>" + _company.bean.name + " -&gt;</p>");
            Utils.each(officeList, function (_office) {
                item.append(new UICheckbox(this, {label: _office.bean.officeName, value: _office.bean.id}));
            });
        });
        return company;
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
