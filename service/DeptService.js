/**********************************************************
 * 科室相关服务类
 *      dept.list       科室列表
 *
 *********************************************************/
"use strict";

var VRender = require("v-render");


var Utils = VRender.Utils;

var DeptService = module.exports;

DeptService.do = function (session, name, data, callback) {
    if (name === "dept.list")
        DeptService.list(session, data, callback);
    else
        callback("类[DeptService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
// 科室列表
DeptService.list = function (session, data, callback) {
    session.fetch("/om/office/list?tenantName=1", data, function (err, ret) {  //  服务器端接口地址
        if (err) {
            callback(err);
        }
        else {
            session.set("user_data", ret);
            session.set("user_name", ret.userName);
            var user_menus = _getFormatUser(ret);
            session.set("user_menus", user_menus);
            callback(false, ret);
        }
    });

};


///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
/***********************************************************
 * 数据处理
 *  _getFormatUser  处理登录用户信息及菜单
 *  _getFormatList  处理用户列表,获取基本信息用于展示
 *  _getFormatRole  处理，用于下拉列表
 *
 ***********************************************************/

var _getFormatUser = function (data) {
    var _unFormatMenus = data.menus;
    var menus = [];
    /* for (var i = 0; i < _unFormatMenus.length; i++) {
     let menu = {};
     if (_unFormatMenus[i].text) {
     _unFormatMenus[i].text = JSON.parse(_unFormatMenus[i].text);
     menu.viewpath = _unFormatMenus[i].text.viewpath;
     menu.name = _unFormatMenus[i].text.name;
     menu.icon = _unFormatMenus[i].text.icon;
     }
     menu.title = _unFormatMenus[i].title;
     // menu.desc = _unFormatMenus[i].desc;
     var _unFormatChildren = _unFormatMenus[i].subMenus;
     menu.children = [];
     for (var j = 0; j < _unFormatChildren.length; j++) {
     let child = {};
     if (_unFormatChildren[j].text)
     child.name = _unFormatChildren[j].text.name;
     child.title = _unFormatChildren[j].title;
     menu.children.push(child);
     }
     menus.push(menu);
     }*/
    var _workorder = {
        name: "workorder", title: "工单汇总", icon: "icon-jiankong",
        viewpath: "./modules/workorder",
        desc: "金佛i上飞机诶哦我姐夫i哦恩",
        children: [{
            name: "summary", title: "概况信息", desc: "奇偶分担接送发动机我i房间饿哦文件"
        }, {
            name: "orders", title: "工单列表", desc: "就分手冻结"
        }]
    }
    var _organize = {
        name: "organize", title: "部门和员工", icon: "icon-jiankong"
    }
    var _supervision = {
        name: "supervision", title: "督查督办", icon: "icon-dashuju",
        viewpath: "./modules/supervision",
        children: [{
            name: "todo", title: "待处理"
        }, {
            name: "done", title: "已汇总"
        }]
    }

    menus.push(_workorder);
    menus.push(_organize);
    menus.push(_supervision);
    // console.log('<menus>',menus);
    return menus;
};

var _getFormatList = function (data) {
    let _baseUserList = [];
    for (let i = 0; i < data.length; i++) {
        let item_user = {};
        item_user = data[i].user;
        _baseUserList.push(item_user)
    }
    return _baseUserList;
};

var _getFormatRole = function (data) {
    let _unFormatRole = data.rows;
    var roleList = [];
    for (let i = 0; i < _unFormatRole.length; i++) {
        let role = {};
        role= _unFormatRole[i].user;
        roleList.push(role)
    }
    return roleList;
};