/**********************************************************
 * 工单详情页面
 *********************************************************/

var VRender = require("v-render");
var BaseView = require("../../BaseView");
var TestService = require(__basedir + "/service/TestService");

var Utils = VRender.Utils;
var UIDatagrid = VRender.UIDatagrid;
var UIPaginator = VRender.UIPaginator;

var WorkorderDetailView = BaseView.extend(module, {
    className: "view-workorder-detail",
    readyCode: "view.workorder.detail",

    doInit: function () {
        WorkorderDetailView.__super__.doInit.call(this);

        var self = this;

        var orderId = parseInt(this.options.params.id) || 0;
        TestService.getById(this.getSession(), orderId, function (err, ret) {
            self.orderInfo = ret;
            self.ready("view.workorder.detail");
        });
    },
    renderView: function (target) {
        WorkorderDetailView.__super__.renderView.call(this);
        // this.$el.write("<div>极力反对手机哦房间诶我费劲儿哦了</div>");
        // this.$el.write(JSON.stringify(this.orderInfo));
        this.$el.addClass("work-order-detail");
        //
        this.renderHeaderView(this.$el);
        this.renderContentView(this.$el);
        this.renderListView(this.$el);
    },
    renderHeaderView: function (target) {
        var info = this.orderInfo;
        var detailHead = target.appendAndGet("<div class='detail-head'></div>");
        detailHead.write("<a class='upbtn' >" + info.name + "</a>");
        detailHead.write("<div class='title'>" + info.album + "</div>");
        //分发部门
        var detailContent = target.appendAndGet("<div class='detail-content'></div>");
    },
    renderContentView: function () {

    },
    renderListView: function (target) {
        var listView = target.appendAndGet("<div class='listview'></div>");
        var pageView = target.appendAndGet("<div class='pageview'></div>");
        var self = this;
        TestService.getArrayData(this.getSession(), '', function (err, ret) {
            self.datas = ret;
        });
        var list = this.getListView(this.datas);
        var pager = this.getPageView(this.datas);

        if (pager) {
            if (list && Utils.isFunction(list.setPaginator))
                list.setPaginator(pager);

            if (pager instanceof VRender.UIView)
                pager.render(pageView);
            else
                pageView.append(pager);
        }

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
        var grid = new UIDatagrid(this, {chkbox: true, multi: true});
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

    getPageView: function (datas) {
        var pager = new UIPaginator(this, {status: true});
        pager.setPageNo(parseInt(this.options.page) || 1);
        pager.setPageSize(parseInt(this.options.rows) || 20);
        pager.setTotalCount(datas ? datas.length : 0);
        return pager;
    },
});

WorkorderDetailView.import(__basedir + "/framework/components/form/FileUploader");