/*global define*/
define(["brease/core/designer/BaseWidget/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.ListBoxLegacy", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.ListBoxLegacy","brease.core.BaseWidget"],
			actions: {"SetDataProvider":{"method":"setDataProvider","parameter":{"provider":{"name":"provider","index":0,"type":"ItemCollection"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFitHeight2Items":{"method":"setFitHeight2Items","parameter":{"fitHeight2Items":{"name":"fitHeight2Items","index":0,"type":"Boolean"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"setImagePath":{"method":"setImagePath","parameter":{"imagePath":{"name":"imagePath","index":0,"type":"String"}}},"setItemHeight":{"method":"setItemHeight","parameter":{"itemHeight":{"name":"itemHeight","index":0,"type":"Integer"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"SetSelectedIndex":{"method":"setSelectedIndex","parameter":{"index":{"name":"index","index":0,"type":"Integer"}}},"SetSelectedValue":{"method":"setSelectedValue","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}}}
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