/*global define*/
define(["widgets/brease/ToggleButton/designer/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.NavigationButton", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.NavigationButton","widgets.brease.ToggleButton","widgets.brease.Button","brease.core.BaseWidget"],
			actions: {"RemoveImage":{"method":"removeImage"},"RemoveMouseDownText":{"method":"removeMouseDownText"},"RemoveText":{"method":"removeText"},"setBreakWord":{"method":"setBreakWord","parameter":{"breakWord":{"name":"breakWord","index":0,"type":"Boolean"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"SetImage":{"method":"setImage","parameter":{"image":{"name":"image","index":0,"type":"ImagePath"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"setIsToggle":{"method":"setIsToggle","parameter":{"isToggle":{"name":"isToggle","index":0,"type":"Boolean"}}},"SetMouseDownImage":{"method":"setMouseDownImage","parameter":{"mouseDownImage":{"name":"mouseDownImage","index":0,"type":"ImagePath"}}},"SetMouseDownText":{"method":"setMouseDownText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setMouseDownTextKey":{"method":"setMouseDownTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"setPageId":{"method":"setPageId","parameter":{"pageId":{"name":"pageId","index":0,"type":"PageReference"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"SetText":{"method":"setText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setTextKey":{"method":"setTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"SetValue":{"method":"setValue","parameter":{"value":{"name":"value","index":0,"type":"Integer"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}}}
		}
	};
	if (superClassInfo.classExtension) {
		classInfo.classExtension = superClassInfo.classExtension;
	}
	if (classExtension) {
		classInfo.classExtension = classExtension;
	}
	return classInfo;
});