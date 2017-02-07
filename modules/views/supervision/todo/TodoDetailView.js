/**********************************************************
 * 督查督办待处理详情页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");

var Utils = VRender.Utils;
var UIDatagrid = VRender.UIDatagrid;
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
        //
        this.renderHeaderView(this.$el);
        this.renderBodyView(this.$el);
    },
    renderHeaderView: function (target) {
        var info = this.todoInfo;
        var detailHead = target.appendAndGet("<div class='detail-head'></div>");
        detailHead.write("<div class='title'>" + info.title + "</div>");
        detailHead.write("<div class='deadline'><span class='item-key'>截止时间:</span><span class='item-value'>" + info.deadline + "</span></div>");
        detailHead.write("<div class='status'><span class='item-key'>状态:</span><span class='item-value'>" + info.status + "</span></div>");
    },
    renderBodyView: function (target) {
        var detailContent = target.appendAndGet("<div class='detail-body'></div>");
        this.renderListView(detailContent);

    },
    /////////////////////////////////////////
    renderListView: function (target) {
        var listView = target.appendAndGet("<div class='listview'></div>");
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
        columns.push({name: "name", title: "名称"});
        columns.push({name: "singer", title: "歌手"});
        columns.push({name: "album", title: "专辑"});
        columns.push({name: "op", title: "操作"});
        grid.setColumns(Utils.toArray(columns));

        grid.setApiName('test.data.array');
        grid.setApiParams('');
        // if (datas.length > 0) {
        //     // grid.setViewData(datas);
        //     grid.setAutoLoad(false);
        // }

        return grid;
    },

});

TodoDetailView.import(__basedir + "/framework/components/form/FileUploader.js");
