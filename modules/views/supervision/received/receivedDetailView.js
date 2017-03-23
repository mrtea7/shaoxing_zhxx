/**********************************************************
 * 督查督办待处理详情页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");
var SupervisionService = require(__basedir + "/service/supervisionService");

var Utils = VRender.Utils;
var UIDatagrid = VRender.UIDatagrid;
var UIButton = VRender.UIButton;
var UIGroup = VRender.UIGroup;
var UIHGroup = VRender.UIHGroup;
var UIPaginator = VRender.UIPaginator;

var WaitReceiveDetailView = BaseView.extend(module, {
    className: "view-supervision-detail",
    readyCode: "view.supervision.detail",

    doInit: function () {
        WaitReceiveDetailView.__super__.doInit.call(this);

        var self = this;
        var params = {session: this.getSession(), taskId: parseInt(this.options.params.taskId)};
        var callbacks = [ this.getDetail];
        Utils.exec(this, callbacks, params, function () {
            self.ready("view.supervision.detail");
        });
    },
    getDetail: function (params, callback) {
        var self = this;
        self.orderInfo = {};
        SupervisionService.detailReceive(params.session, params.taskId, function (err, ret) {
            self.orderInfo.base  = ret.base;
            self.orderInfo.taskId  =  params.taskId;
            self.orderInfo.taskList = ret.task;
            self.orderInfo.attach = ret.attach;
            callback(false, params);
        });
    },
    getViewData: function () {
        return this.orderInfo;
    },
    renderView: function (target) {
        WaitReceiveDetailView.__super__.renderView.call(this);
        this.$el.addClass("supervision-unfinished-detail");
        this.renderHeaderView(this.$el);
        this.renderBodyView(this.$el);
        this.renderFootView(this.$el);
    },
    renderHeaderView: function (target) {

        var detailHead = target.appendAndGet("<div class='detail-head'></div>");
        detailHead.write("<div class='title'>" + this.orderInfo.base.title + "</div>");
        detailHead.write("<div class='deadline'><span class='item-key'>截止时间:</span><span class='item-value'>" + this.orderInfo.base.deadline + "</span></div>");
        this.renderTabsView(detailHead);

    },
    renderBodyView: function (target) {
        var detailContent = target.appendAndGet("<div class='detail-body'></div>");
        this.renderTaskView(detailContent);
        // this.renderListView(detailContent);

    },
    renderFootView: function (target) {
        var detailFoot = target.appendAndGet("<div class='detail-foot'></div>");
        var btnGroup = new UIGroup(this, {gap: 10});
        btnGroup.addChild(new UIHGroup(this, {gap: 10}))
            .append(new UIButton(this, {label: "办理", style: 'feedback ui-btn-primary'}));
        var optBtn = VRender.$("<div class='optBtn'></div>").appendTo(detailFoot);
        if (Utils.isNotBlank(btnGroup)) {
            new UIGroup(this, {cls: "preview"}).append(btnGroup).render(optBtn);
        }
    },
    /////////////////////////////////////////
    renderTabsView: function (target) {
        var tabsbar = target.appendAndGet("<div class='tabsbar'></div>");
        //tab都在这里写好，默认选中的加selected，name和下面的View里的id对应
        tabsbar.write("<div class='tab selected' name='taskview'>任务详情</div>");
        // tabsbar.write("<div class='tab' name='listview'>科室进度</div>");
    },
    renderTaskView: function (target) {
        var taskview = target.appendAndGet("<div id='taskview'></div>");
        taskview.write("<div> 内容：" + this.orderInfo.base.content + "</div>");
        for (var i = 1; i < this.orderInfo.attach.length + 1; i++) {
            taskview.write("<div> 附件" + i + "：<a class='downloadAttach' id='" + this.orderInfo.attach[i - 1].id + "'>" + this.orderInfo.attach[i - 1].originalFilename + "</a></div>");
        }
    }
});

// UnfinishedDetailView.import(__basedir + "/framework/components/form/FileUploader.js");
