/**********************************************************
 * 督查督办待处理详情页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");

var Utils = VRender.Utils;
var UIDatagrid = VRender.UIDatagrid;
var UIButton = VRender.UIButton;
var UIGroup = VRender.UIGroup;
var UIHGroup = VRender.UIHGroup;
var UIPaginator = VRender.UIPaginator;

var TodoDetailView = BaseView.extend(module, {
    className: "view-supervision-detail",
    readyCode: "view.supervision.detail",

    doInit: function () {
        TodoDetailView.__super__.doInit.call(this);

        var self = this;

        var todoId = parseInt(this.options.params.id) || 0;
        TestService.getBySupTodoId(this.getSession(), todoId, function (err, ret) {
            self.todoInfo = ret;
            self.ready("view.supervision.detail");
        });
    },
    renderView: function (target) {
        TodoDetailView.__super__.renderView.call(this);
        this.$el.addClass("supervision-todo-detail");
        this.renderHeaderView(this.$el);
        this.renderBodyView(this.$el);
        this.renderFootView(this.$el);
    },
    renderHeaderView: function (target) {
        var info = this.todoInfo;
        var detailHead = target.appendAndGet("<div class='detail-head'></div>");
        detailHead.write("<div class='title'>" + info.title + "</div>");
        detailHead.write("<div class='deadline'><span class='item-key'>截止时间:</span><span class='item-value'>" + info.deadline + "</span></div>");
        detailHead.write("<div class='status'><span class='item-key'>状态:</span><span class='item-value'>" + info.status + "</span></div>");
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
            .append(new UIButton(this, {label: "确定", type: "primary"}))
            .append(new UIButton(this, {label: "返回", type: "primary"}));
        var optBtn = VRender.$("<div class='optBtn'></div>").appendTo(detailFoot);
        if (Utils.isNotBlank(btnGroup)) {
            new UIGroup(this, {cls: "preview"}).append(btnGroup).render(optBtn);
        }
    },
    /////////////////////////////////////////
    renderTabsView: function (target) {
        var tabsbar = target.appendAndGet("<div class='tabsbar'></div>");
        tabsbar.write("<div class='tab selected' name='taskview'>任务详情</div>");
        tabsbar.write("<div class='tab' name='listview'>科室进度</div>");
    },
    renderTaskView: function (target) {
        var  taskview= target.appendAndGet("<div id='taskview' class='taskview'></div>");
        taskview.write("<div>任务详情sadasdasdas</div>");
    },
    renderListView: function (target) {
        var listView = target.appendAndGet("<div id='listview' class='listview hide'></div>");
        var self = this;
        TestService.getArrayData(this.getSession(), '', function (err, ret) {
            self.datas = ret;
        });
        var list = this.getListView(this.datas);

        if (list) {
            if (this.searchView && UIView.isFunction(list.setSearcher))
                list.setSearcher(this.searchView);

            if (list instanceof VRender.UIView)
                list.render(listView);
            else
                listView.append(list);
        }
    },
    getListView: function (datas) {
        // console.log('data',datas);
        var grid = new UIDatagrid(this);
        var columns = [];
        columns.push({name: "dept", title: "科室"});
        columns.push({name: "submit_time", title: "提交时间"});
        columns.push({name: "attachments", title: "附件"});
        columns.push({name: "op", title: "操作"});
        grid.setColumns(Utils.toArray(columns));

        grid.setApiName('test.data.dept');
        grid.setApiParams('');
        // if (datas.length > 0) {
        //     // grid.setViewData(datas);
        //     grid.setAutoLoad(false);
        // }

        return grid;
    }

});

TodoDetailView.import(__basedir + "/framework/components/form/FileUploader.js");