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

var UnfinishedDetailView = BaseView.extend(module, {
    className: "view-supervision-detail",
    readyCode: "view.supervision.detail",

    doInit: function () {
        UnfinishedDetailView.__super__.doInit.call(this);

        var self = this;
        var params = {session: this.getSession(), unfinishedId: parseInt(this.options.params.id)};
        var callbacks = [ this.getDetail];
        Utils.exec(this, callbacks, params, function () {
            self.ready("view.supervision.detail");
        });
    },
    getDetail: function (params, callback) {
        var self = this;
        SupervisionService.detailSend(params.session, params.unfinishedId, function (err, ret) {
            self.orderInfo = ret.info;
            self.taskList = ret.task;
            self.attach = ret.attach;
            callback(false, params);
        });
    },
    renderView: function (target) {
        UnfinishedDetailView.__super__.renderView.call(this);
        this.$el.addClass("supervision-unfinished-detail");
        this.renderHeaderView(this.$el);
        this.renderBodyView(this.$el);
        this.renderFootView(this.$el);
    },
    renderHeaderView: function (target) {

        var detailHead = target.appendAndGet("<div class='detail-head'></div>");
        detailHead.write("<div class='title'>" + this.orderInfo.title + "</div>");
        detailHead.write("<div class='deadline'><span class='item-key'>截止时间:</span><span class='item-value'>" + this.orderInfo.deadline + "</span></div>");
        this.renderTabsView(detailHead);

    },
    renderBodyView: function (target) {
        var detailContent = target.appendAndGet("<div class='detail-body'></div>");
        this.renderTaskView(detailContent);
        this.renderListView(detailContent);

    },
    renderFootView: function (target) {
        var detailFoot = target.appendAndGet("<div class='detail-foot'></div>");
        var btnGroup = new UIGroup(this, {gap: 10});
        btnGroup.addChild(new UIHGroup(this, {gap: 10}))
            // .append(new UIButton(this, {label: "编辑", style: 'edit ui-btn-primary'}))
            .append(new UIButton(this, {label: "返回", style: 'cancel'}));
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
        taskview.write("<div> 内容：" + this.orderInfo.content + "</div>");
        for (var i = 1; i < this.attach.length + 1; i++) {
            taskview.write("<div> 附件" + i + "：<a class='downloadAttach' id='" + this.attach[i - 1].id + "'>" + this.attach[i - 1].originalFilename + "</a></div>");
        }
    },
    renderListView: function (target) {
        // var listView = target.appendAndGet("<div id='listview' class='hide'></div>");
        var listView = target.appendAndGet("<div id='listview'></div>");

        var list = this.getListView(this.taskList);
    },
    getListView: function (datas) {
        // console.log('<datas>',datas);
        var grid = new UIDatagrid(this, {empty: '列表为空'});
        var columns = [];
        columns.push({name: "dept", title: "科室"});
        columns.push({name: "feedback", title: "回复内容"});
        columns.push({name: "completionTime", title: "提交时间"});
        columns.push({name: "taskAttach", title: "附件"});
        grid.setColumns(Utils.toArray(columns));

        // grid.setApiName('test.send.detail');
        // grid.setApiParams('');

        if (datas.length > 0) {
            grid.setViewData(Utils.map(datas, function (temp) {
                temp.taskAttach = "<a name='download'>下载附件</a>";
                return temp;
            }));
            grid.setAutoLoad(false);
        }

        return grid;
    }

});

// UnfinishedDetailView.import(__basedir + "/framework/components/form/FileUploader.js");
