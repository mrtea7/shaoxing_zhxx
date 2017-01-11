/**********************************************************
 * 工单编辑页面
 *********************************************************/

define(function ($, VR, Utils) {

	var view = $(".view-workorder-edit");

	///////////////////////////////////////////////////////
	view.parent().parent().on("dialog_submit", function (e) {
		alert('点击确认按钮，在这里处理。别忘了关闭对话框：VR.Component.Dialog.close(view)');
		// VR.Component.Dialog.close(view);

		alert("比如拿到输入框内容：" + view.find(".form > .name input").val());
	});
});
