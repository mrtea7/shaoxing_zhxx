/**********************************************************
 * 系统模块信息
 *********************************************************/

exports.modules = [
    {
        name: "general", title: "概况", icon: "icon-yunyingguanli",
        desc: "金佛但是佛二维佛何物饭盒哦i我姐夫i偶尔未婚夫i二级我i费用未婚夫i偶尔未婚夫i饿坏我风无痕i复合物"
    },
    {
        name: "workorder", title: "工单汇总", icon: "icon-jiankong",
        viewpath: "./modules/workorder",
        desc: "金佛i上飞机诶哦我姐夫i哦恩",
        children: [{
            name: "summary", title: "概况信息", desc: "奇偶分担接送发动机我i房间饿哦文件"
        }, {
            name: "orders", title: "工单列表", desc: "就分手冻结"
        }]
    },
    {
        name: "organize", title: "部门和员工", icon: "icon-shuju",
        viewpath: "./modules/organize"
        // ,
        // children: [{
        //     name: "user", title: "部门员工", desc: "奇偶分担接送发动机我i房间饿哦文件"
        // }]

    },
    {
        name: "systemManage", title: "系统设置", icon: "icon-dashuju",
        viewpath: "./modules/systemManage",
        children: [{
            name: "userList", title: "用户管理"
        }, {
            name: "groupList", title: "角色管理"
        }, {
            name: "officeList", title: "部门管理"
        }, {
            name: "accreditList", title: "授权管理"
        }]
    },
    {
        name: "supervision", title: "督查督办", icon: "icon-dashuju",
        viewpath: "./modules/supervision",
        children: [{
            name: "waitReceive", title: "待接收",desc:"办理人员"
        }, {
            name: "received", title: "已接收",desc:"办理人员"
        },{
            name: "receiveCompleted", title: "已完成",desc:"办理人员"
        }, {
            name: "unfinished", title: "未完成",desc:"派发人员"
        }, {
            name: "sendCompleted", title: "已完成",desc:"派发人员"
        }, {
            name: "exceedTime", title: "已超期",desc:"派发人员"
        }]
    }
];
