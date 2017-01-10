/**********************************************************
 * 测试用
 *********************************************************/

var VRender = require("v-render");


var Utils = VRender.Utils;

var TestService = module.exports;

TestService.do = function (session, name, data, callback) {
	if (name === "test.data.array")
		TestService.getArrayData(session, data, callback);
	else
		callback("类[TestService]不支持接口（api）：" + name);
};

///////////////////////////////////////////////////////////
TestService.getArrayData = function (session, data, callback) {
	callback(false, data_musics);
};

///////////////////////////////////////////////////////////
var data_musics = [];
data_musics.push({id: 7926593, name: "Song From A Secret Garden", singer: "Secret Garden", 
	album: "Song From A Secret Garden", singerId: 177878});
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
