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

var officeLists = [[
    {
        bean: {
            officeCode: null,
            officeName: "局领导",
            parentId: null,
            rootId: -1,
            leaderId: 0,
            tenantName: 1,
            id: 15,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-13 16:44:33"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "办公室（新闻中心）",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 16,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "政治处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 17,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "纪检组",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 18,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "运输处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 19,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "政策法规与科技处（行政审批服务处）",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 20,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "财审处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 21,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "建管处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 22,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "交战办",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 23,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "规划处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 24,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "安全处",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 25,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "督查服务组",
            parentId: null,
            rootId: 0,
            leaderId: 15,
            tenantName: 1,
            id: 26,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市交通运输局"
        }
    },
    {
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
    },
    {
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
    }
], [
    {
        bean: {
            officeCode: null,
            officeName: "局领导",
            parentId: null,
            rootId: -1,
            leaderId: 0,
            tenantName: 2,
            id: 1,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:59"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "办公室",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 2,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "财务科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 3,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "人事科（监察室）",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 4,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "公交科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 5,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "出租汽车科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 6,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "客管科（安全科）",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 7,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "货管科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 8,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "维管科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 9,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "法规科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 10,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "驾培科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 11,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "审批科",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 12,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "投诉服务中心",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 13,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    },
    {
        bean: {
            officeCode: null,
            officeName: "稽查支队",
            parentId: null,
            rootId: 0,
            leaderId: 1,
            tenantName: 2,
            id: 14,
            createdBy: "",
            createdDate: null,
            updatedBy: "",
            updatedDate: "2017-03-01 12:05:57"
        },
        caption: {
            tenantName: "绍兴市道路运输管理局"
        }
    }
], [], []];

var unfinishedEditView = BaseView.extend(module, {
    className: "view-supervision-edit",
    readyCode: "supervision.edit",

    doInit: function () {
        unfinishedEditView.__super__.doInit.call(this);
        var self =this;
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
                    console.log("getOrderInfo出错了");
                else {
                    self.orderInfo.base = ret.info;
                    self.orderInfo.taskList = ret.task;
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
        Utils.each(this.companyIdList, function (data) {
            DeptService.officeList(params.session, data, function (err, ret) {
                // self.officeLists.push(ret.rows);
                callback(false, params);
            });
        });
    },
    getViewData: function () {
        return this.orderId;
    },
    renderView: function () {
        unfinishedEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo.base || {};
        console.log('<order>', order);

        this.renderItem(form, "title", "标题", new UITextView(this, {
            required: true, empty: "请输入标题，标题不能为空",
            maxSize: 50, width: 500, value: order.title
        }));

        this.renderItem(form, "content", "内容", new UITextView(this, {
            required: true, empty: "请输入内容，内容不能为空",
            maxSize: 400, multi: true, width: 500, value: order.content
        }));

        this.renderItem(form, "type", "类型", new UICombobox(this, {
            prompt: "请选择任务类型", data: this.orderType
        }));

        this.renderItem(form, "deadline", "截止日期", new UIDateInput(this, {date: order.deadline, min: Date()}));

        this.renderItem(form, "attach", "附件", new UIButton(this, {
            cls: "attachbtn", label: '点击上传', style: 'ui-btn-success'
        }));

        this.renderItem(form, "office", "科室", this.getOfficeView());

        // this.renderItem(form, "sms", "短信通知", new UIRadioGroup(this, {
        //     data: [{name:"发送",value:7},{name:"不发送",value:8}], width: 400, selectedIndex: 4}));
    },

    getOfficeView: function () {
        var company = new UIGroup(this, {gap: 10});
        var i = 0;
        Utils.each(this.companyList, function (_company) {
            i++;
            var item = company.addChild(new UIGroup(this));
            item.append("<p>" + _company.bean.name + " -&gt;</p>");
            // Utils.each(this.officeLists, function (officeList) {
            Utils.each(officeLists[i], function (_office) {
                item.append(new UICheckbox(this, {
                    label: _office.bean.officeName,
                    value: _office.bean.tenantName + "-" + _office.bean.id
                }));
            });
            // });
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
