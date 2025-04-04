/*global define*/
define(["brease/core/designer/ContainerWidget/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.GroupBox", 
			parents: ["*"],
			children: ["*"],
			inheritance: ["widgets.brease.GroupBox","brease.core.ContainerWidget","brease.core.BaseWidget"],
			actions: {"setAlignment":{"method":"setAlignment","parameter":{"alignment":{"name":"alignment","index":0,"type":"brease.enum.Direction"}}},"setChildPositioning":{"method":"setChildPositioning","parameter":{"childPositioning":{"name":"childPositioning","index":0,"type":"brease.enum.ChildPositioning"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFloat":{"method":"setFloat","parameter":{"float":{"name":"float","index":0,"type":"brease.enum.Floating"}}},"setImage":{"method":"setImage","parameter":{"image":{"name":"image","index":0,"type":"ImagePath"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImagePosition"}}},"setMaxHeight":{"method":"setMaxHeight","parameter":{"maxHeight":{"name":"maxHeight","index":0,"type":"Integer"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setText":{"method":"setText","parameter":{"text":{"name":"text","index":0,"type":"String"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}}}
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