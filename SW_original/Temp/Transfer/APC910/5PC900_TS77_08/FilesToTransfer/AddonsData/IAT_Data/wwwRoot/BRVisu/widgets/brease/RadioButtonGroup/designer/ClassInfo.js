/*global define*/
define(["widgets/brease/ButtonBar/designer/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.RadioButtonGroup", 
			parents: ["*"],
			children: ["widgets.brease.RadioButton"],
			inheritance: ["widgets.brease.RadioButtonGroup","widgets.brease.ButtonBar","brease.core.ContainerWidget","brease.core.BaseWidget"],
			actions: {"setAlignment":{"method":"setAlignment","parameter":{"alignment":{"name":"alignment","index":0,"type":"String"}}},"setAutoScroll":{"method":"setAutoScroll","parameter":{"autoScroll":{"name":"autoScroll","index":0,"type":"Boolean"}}},"setChildPositioning":{"method":"setChildPositioning","parameter":{"childPositioning":{"name":"childPositioning","index":0,"type":"String"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setSelectedId":{"method":"setSelectedId","parameter":{"id":{"name":"id","index":0,"type":"Object"}}},"SetSelectedIndex":{"method":"setSelectedIndex","parameter":{"index":{"name":"index","index":0,"type":"Integer"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}}}
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