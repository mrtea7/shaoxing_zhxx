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
    else if (name === "test.data.sup_unfinished_list")
        TestService.supUnfinishedList(session, data, callback);
    else if (name === "test.send.detail")
        TestService.getSupUnfinishedDetail(session, data, callback);
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


TestService.getArrayData = function (session, data, callback) {
    callback(false, data_musics);
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
////////////////start///////////////////////
TestService.supUnfinishedList = function (session, data, callback) {
    var list = _formatUnfinished(data_sup_unfinished_list);
    callback(false, list);
};
TestService.getBySupUnfinishedId = function (session, id, callback) {
    var list = _formatUnfinished(data_sup_unfinished_list);
    var ret = Utils.find(list, function (tmp) {
        return tmp.id == id;
    });
    callback(false, ret);
};
TestService.getSupUnfinishedDetail = function (session, id, callback) {
    var list = _formatSendDetail(sendDetail);
    callback(false, list);
};
TestService.dept = function (session, data, callback) {
    callback(false, dept_list);
};
//////////////end/////////////////////

var data_sup_unfinished_list = [
    {
        "bean": {
            "title": "督察督办2号文件",
            "content": 222222,
            "deadline": "2017-02-22 00:00:00",
            "distributionTime": null,
            "completionTime": "2017-02-21 00:00:00",
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 1,
            "tenantName": 1,
            "id": 2,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-25 17:07:32"
        },
        "caption": {
            "isOverdue": "正常",
            "taskStatus": "办理中"
        }
    }
    ,
    {
        "bean": {
            "title": "督察督办3号文件",
            "content": 333333,
            "deadline": "2017-02-22 00:00:00",
            "distributionTime": null,
            "completionTime": "2017-02-21 00:00:00",
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 1,
            "tenantName": 1,
            "id": 3,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-25 17:07:32"
        },
        "caption": {
            "isOverdue": "正常",
            "taskStatus": "撤回"
        }
    }
    ,
    {
        "bean": {
            "title": "督察督办4号文件",
            "content": 44444,
            "deadline": "2017-02-22 00:00:00",
            "distributionTime": null,
            "completionTime": "2017-02-21 00:00:00",
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 1,
            "tenantName": 1,
            "id": 4,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-25 17:07:32"
        },
        "caption": {
            "isOverdue": "正常",
            "taskStatus": "草稿"
        }
    }
];
var _formatUnfinished = function (data) {
    var _list = [];
    for (var i = 0; i < data.length; i++) {
        var item = {};
        item.id = data[i].bean.id;
        item.title = data[i].bean.title;
        item.content = data[i].bean.content;
        item.deadline = data[i].bean.deadline;
        item.status = data[i].caption.taskStatus;
        _list.push(item)
    }
    return _list;
};
// data_sup_unfinished_list.push({id: 123, title: "2016年4月份计划表", deadline: "2016-03-25"});
// data_sup_unfinished_list.push({id: 321, title: "2016年4月份计划表", deadline: "2016-03-25"});


var dept_list = [];
dept_list.push({id: 12, dept: "办公室", submit_time: "2017-02-13", attachments: "办公室附件文件", status: "已完成"});
dept_list.push({id: 13, dept: "公路局", submit_time: "", attachments: "", status: "未确认"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});
dept_list.push({id: 14, dept: "运管局", submit_time: "", attachments: "", status: "处理中"});

var _formatSendDetail = function (data) {
    var _detail = {attach: [], task: []};
    for (var i = 0; i < data.dcdbWorkorderAttach.length; i++) {
        var attachItem = {};
        attachItem.originalFilename = data.dcdbWorkorderAttach[i].originalFilename;
        attachItem.id = data.dcdbWorkorderAttach[i].id;
        _detail.attach.push(attachItem)
    }
    for (var j = 0; j < data.dcdbWorkorderTaskList.length; j++) {
        var taskItem = {};
        taskItem.dept = data.dcdbWorkorderTaskList[j].officeName;
        taskItem.feedback = data.dcdbWorkorderTaskList[j].feedback;
        taskItem.completionTime = data.dcdbWorkorderTaskList[j].completionTime;
        _detail.task.push(taskItem)
    }
    return _detail;
};
var sendDetail = {
    "dcdbWorkorderAttach": [
        {
            "dcdbId": null,
            "originalFilename": "主任务附件一",
            "path": null,
            "thumbnail": null,
            "description": null,
            "fileType": null,
            "fileOrder": null,
            "id": 1,
            "createdBy": null,
            "createdDate": null,
            "updatedBy": null,
            "updatedDate": null
        }, {
            "dcdbId": null,
            "originalFilename": "主任务附件二",
            "path": null,
            "thumbnail": null,
            "description": null,
            "fileType": null,
            "fileOrder": null,
            "id": 1,
            "createdBy": null,
            "createdDate": null,
            "updatedBy": null,
            "updatedDate": null
        }
    ],
    "dcdbWorkorderTaskList": [
        {
            "dcdbId": 23,
            "officeName": "财务科",
            "feedback": "张三回复",
            "receiveTime": null,
            "completionTime": "2017-02-20 19:53:20",
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 0,
            "tenantName": null,
            "officeId": null,
            "id": 1,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-20 19:53:20"
        },
        {
            "dcdbId": 23,
            "officeName": "财务科",
            "feedback": "李四回复",
            "receiveTime": null,
            "completionTime": "2017-02-20 19:53:20",
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 0,
            "tenantName": null,
            "officeId": null,
            "id": 2,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-20 19:53:20"
        },
        {
            "dcdbId": 23,
            "officeName": "财务科",
            "feedback": "王五回复",
            "receiveTime": null,
            "completionTime": null,
            "spendDays": null,
            "isOverdue": 0,
            "taskStatus": 0,
            "tenantName": null,
            "officeId": null,
            "id": 3,
            "createdBy": "",
            "createdDate": null,
            "updatedBy": "",
            "updatedDate": "2017-02-20 19:53:20"
        }
    ],
    "title": "督察督办标题",
    "content": "督察督办任务描述",
    "deadline": "2017-02-20 00:00:00",
    "distributionTime": "2017-02-20 16:23:05",
    "completionTime": null,
    "spendDays": null,
    "isOverdue": 0,
    "taskStatus": -1,
    "tenantName": 1,
    "id": 23,
    "createdBy": "19",
    "createdDate": "2017-02-20 16:20:50",
    "updatedBy": "",
    "updatedDate": "2017-02-20 17:28:46"
}