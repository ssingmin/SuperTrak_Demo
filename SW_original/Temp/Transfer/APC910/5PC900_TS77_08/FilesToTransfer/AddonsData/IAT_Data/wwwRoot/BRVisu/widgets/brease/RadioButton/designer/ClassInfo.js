/*global define*/
define(["widgets/brease/ToggleButton/designer/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.RadioButton", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.RadioButton","widgets.brease.ToggleButton","widgets.brease.Button","brease.core.BaseWidget"],
			actions: {"RemoveMouseDownText":{"method":"removeMouseDownText"},"RemoveText":{"method":"removeText"},"setBoxSize":{"method":"setBoxSize","parameter":{"boxSize":{"name":"boxSize","index":0,"type":"Integer"}}},"setBreakWord":{"method":"setBreakWord","parameter":{"breakWord":{"name":"breakWord","index":0,"type":"Boolean"}}},"setCheckedBoxImage":{"method":"setCheckedBoxImage","parameter":{"checkedBoxImage":{"name":"checkedBoxImage","index":0,"type":"String"}}},"setDisabledCheckedBoxImage":{"method":"setDisabledCheckedBoxImage","parameter":{"disabledCheckedBoxImage":{"name":"disabledCheckedBoxImage","index":0,"type":"String"}}},"setDisabledUncheckedBoxImage":{"method":"setDisabledUncheckedBoxImage","parameter":{"disabledUncheckedBoxImage":{"name":"disabledUncheckedBoxImage","index":0,"type":"String"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setImage":{"method":"setImage"},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"SetMouseDownImage":{"method":"setMouseDownImage","parameter":{"mouseDownImage":{"name":"mouseDownImage","index":0,"type":"ImagePath"}}},"SetMouseDownText":{"method":"setMouseDownText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setMouseDownTextKey":{"method":"setMouseDownTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"SetText":{"method":"setText","parameter":{"text":{"name":"text","index":0,"type":"String"},"keepKey":{"name":"keepKey","index":1,"type":"Boolean"}}},"setTextKey":{"method":"setTextKey","parameter":{"key":{"name":"key","index":0,"type":"String"}}},"setUncheckedBoxImage":{"method":"setUncheckedBoxImage","parameter":{"uncheckedBoxImage":{"name":"uncheckedBoxImage","index":0,"type":"String"}}},"SetValue":{"method":"setValue","parameter":{"value":{"name":"value","index":0,"type":"Integer"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}}}
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