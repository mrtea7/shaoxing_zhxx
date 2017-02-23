/**********************************************************
 * 测试用
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var TestService = module.exports;

TestService.do = function (session, name, data, callback) {
    if (name === "test.data.array")
        TestService.getArrayData(session, data, callback);
    else if (name === "test.data.save")
        TestService.save(session, data, callback);
    else if (name === "test.data.sup_todo_list")
        TestService.supTodoList(session, data, callback);
    else if (name === "test.data.dept")
        TestService.dept(session, data, callback);
    else
        callback("类[TestService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
TestService.getById = function (session, id, callback) {
    var ret = Utils.find(data_musics, function (tmp) {
        return tmp.id == id;
    });
    callback(false, ret);
};
TestService.getBySupTodoId = function (session, id, callback) {
    var ret = Utils.find(data_sup_todo_list, function (tmp) {
        return tmp.id == id;
    });
    callback(false, ret);
};

TestService.getArrayData = function (session, data, callback) {
    callback(false, data_musics);
};

TestService.supTodoList = function (session, data, callback) {
    callback(false, data_sup_todo_list);
};

TestService.dept = function (session, data, callback) {
    callback(false, dept_list);
};
TestService.save = function (session, data, callback) {
    if (!data.id)
        data.id = new Date().getTime();
    var index = Utils.index(data_musics, function (tmp) {
        return tmp.id == data.id;
    });
    if (index >= 0)
        data_musics.splice(index, 1, data);
    else
        data_musics.push(data);
    callback(false);
};

TestService.getSingers = function (session, data, callback) {
    callback(false, Utils.map(data_musics, function (temp) {
        return {id: temp.singerId, name: temp.singer};
    }));
};

///////////////////////////////////////////////////////////
var data_musics = [];
data_musics.push({id: 1990280, name: "献给爱丽丝", singer: "贝多芬", album: null});
data_musics.push({id: 1141248, name: "明天我要嫁给你", singer: "王菲", album: "王菲最精采的演唱会", singerId: 45561});
data_musics.push({id: 266322598, name: "告白气球", singer: "周杰伦", album: "周杰伦的床边故事", singerId: 7994});
data_musics.push({id: 242078437, name: "演员", singer: "薛之谦", album: "初学者", singerId: 2517});
data_musics.push({id: 490468, name: "独角戏", singer: "许茹芸", album: "如果云知道", singerId: 1204});
data_musics.push({id: 285100730, name: "远方的远方还是远方", singer: "凤凰传奇", album: "远方的远方还是远方", singerId: 1490});
data_musics.push({id: 291241, name: "甜蜜蜜", singer: "邓丽君", album: "甜蜜蜜", singerId: 1091});
data_musics.push({id: 277580289, name: "你在就好", singer: "崔子格", album: "你在就好", singerId: 1224778});
data_musics.push({id: 7320512, name: "偏偏喜欢你", singer: "陈百强", album: "世纪10星 - 永恒篇", singerId: 2707});
data_musics.push({id: 272952711, name: "下完这场雨", singer: "后弦", album: "下完这场雨", singerId: 1273});

var data_sup_todo_list = [];
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "未确认"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 12321, title: "2016年4月份计划表", deadline: "2016-03-25", status: "处理中"});
data_sup_todo_list.push({id: 3221, title: "2016年2月份计划表", deadline: "2016-03-15", status: "已超期"});
data_sup_todo_list.push({id: 1111, title: "2016年1月份计划表", deadline: "2016-03-22", status: "处理中"});

var dept_list = [];
dept_list.push({id: 12, dept: "办公室", submit_time: "2017-02-13", attachments: "办公室附件文件", status: "已完成"});
dept_list.push({id: 13, dept: "公路局", submit_time: "", attachments: "", status: "未确认"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
