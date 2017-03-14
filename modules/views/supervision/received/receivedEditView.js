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


var unfinishedEditView = BaseView.extend(module, {
    className: "view-supervision-edit",
    readyCode: "supervision.edit",

    doInit: function () {
        unfinishedEditView.__super__.doInit.call(this);
        this.params = {session: this.getSession(), orderId: parseInt(this.options.params.id)};

        this.ready("supervision.edit");
    },
    renderView: function () {
        unfinishedEditView.__super__.renderView.call(this);

        var form = this.$el.appendAndGet("<div class='form'></div>");

        var order = this.orderInfo || {};

        if (order.id)
            this.renderItem(form, "name", "编号", "<p>" + order.id + "</p>");

        this.renderItem(form, "content", "反馈内容", new UITextView(this, {
            required: true, empty: "请输入内容，内容不能为空",
            maxSize: 400, multi: true, width: 500, value: order.content
        }));

        this.renderItem(form, "attach", "附件", new UIButton(this, {
            cls: "attachbtn", label: '点击上传', style: 'ui-btn-success'
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

var FileUploader = unfinishedEditView.use(__basedir, "framework/components/form/FileUploader");

// unfinishedEditView.import("/framework/components/form/FileUploader.js");
