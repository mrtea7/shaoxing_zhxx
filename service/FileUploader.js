// ========================================================
// 文件上传组件
// @author shicy <scy@manfenjiayuan.com>
// Create on 2016-04-19
// ========================================================

define("mfh.FileUploader", function ($, E) {
	var Utils = E.Utils;
console.log("mfh.FileUploader");
	var FileUploader = function (target, options) {
		this.options = options || {};
		this.target = $(target);
	};
	FileUploader.prototype = new E.EventEmitter();

	FileUploader.prototype.browser = function () {
		if (this.loadingFlag) 
			return frame.tooltip("正在上传, 请稍候操作!");
		
		// 防止浏览器不能连续2次选择同一张图片
		if (this.input)
			this.input.remove();
		this.input = $("<input type='file'/>").appendTo(this.target).hide();
		if (this.multiple) 
			this.input.attr("multiple", "multiple");
		
		var self = this;
		this.input.on("change", function (e) { return self.inputChangeHandler(e); });

		this.input.trigger("click");
		return this;
	};

	FileUploader.prototype.upload = function (url, params, callback) {
		if (this.uploadFiles.length === 0) {
			if (Utils.isFunction(callback))
				callback(false);
		}
		else {
			if (this.loadingFlag)
				return frame.tooltip("正在上传，请稍候！");
			this.loadingFlag = true;

			var self = this, count = this.uploadFiles.length;
			var results = [];
			var loop = function (index) {
				if (index < count) {
					var file = self.uploadFiles[index];
					self.uploadOneFile(url, file, params, function (err, ret) {
						results.push(ret);
						if (err) {
							console.error("mfh.FileUploader failed: ", err);
							self.loadingFlag = false;
							if (Utils.isFunction(callback))
								callback(err, results);
						}
						else {
							loop(index + 1);
						}
					});
				}
				else {
					self.uploadFiles = [];
					self.loadingFlag = false;
					if (Utils.isFunction(callback))
						callback(false, results);
				}
			};
			loop(0);
		}
	};

	FileUploader.prototype.uploadOneFile = function (url, file, params, callback) {
		var fd = new FormData();
		fd.append("fileToUpload", file);
		if (params) {
			for (var k in params) {
				fd.append(k, params[k]);
			}
		}
		
		var xhr = this.xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function (e) { 
			var ret = {};
			try {
				ret = JSON.parse(e.target.responseText);
			}
			catch (e) {};
			var errorMsg = false;
			if (ret.code && ret.code != 0) {
				if (ret.code == 5)
					errorMsg = "操作未完成，请下载查看错误信息";
				else
					errorMsg = ret.msg || "出错了";
				errorMsg = {code: ret.code, msg: errorMsg};
			}
			callback(errorMsg, (ret.data || ret));
		}, false);
		xhr.addEventListener("error", function (e) {
			console.error("mfh.FileUploader: 文件上传失败", e);
			callback(e.responseText || e);
		}, false);
		xhr.addEventListener("abort", function (e) {
			console.warn("mfh.FileUploader: 已取消文件上传", e);
			callback("取消上传");
		}, false);
		xhr.open("POST", url);
		xhr.send(fd);
	};

	FileUploader.prototype.hasFileSelected = function () {
		return this.uploadFiles && this.uploadFiles.length > 0;
	};

	FileUploader.prototype.inputChangeHandler = function (e) {
		var files = this.input[0].files;
		if (!this.options.multiple)
			this.uploadFiles = [];
		for (var i = 0; i < files.length; i++) {
			this.uploadFiles.push(files[i]);
		}

		this.trigger("change", this.uploadFiles, files);
		e.stopPropagation();
		e.preventDefault();
		return false;
	};

	///////////////////////////////////////////////////////
	return {
		create: function (options) {
			var target = options.target || "body";
			return new FileUploader(target, options);
		}
	};
	// var helper = frame.componenthelper(".mfh-FileUploader", FileUploader);
	// helper.render = function (target, options) {

	// };
	// return helper;
});
