/*global define*/
define(["widgets/brease/DropDownBoxLegacy/designer/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.LanguageSelector", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.LanguageSelector","widgets.brease.DropDownBoxLegacy","brease.core.BaseWidget"],
			actions: {"Close":{"method":"close"},"Open":{"method":"open"},"setCropToParent":{"method":"setCropToParent","parameter":{"cropToParent":{"name":"cropToParent","index":0,"type":"brease.enum.CropToParent"}}},"setDataProvider":{"method":"setDataProvider","parameter":{"dataProvider":{"name":"dataProvider","index":0,"type":"ItemCollection"},"omitPrompt":{"name":"omitPrompt","index":1,"type":"Boolean"}}},"setDisplaySettings":{"method":"setDisplaySettings","parameter":{"displaySettings":{"name":"displaySettings","index":0,"type":"brease.enum.DropDownDisplaySettings"}}},"setEllipsis":{"method":"setEllipsis","parameter":{"ellipsis":{"name":"ellipsis","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFitHeight2Items":{"method":"setFitHeight2Items","parameter":{"fitHeight2Items":{"name":"fitHeight2Items","index":0,"type":"Boolean"}}},"setImageAlign":{"method":"setImageAlign","parameter":{"imageAlign":{"name":"imageAlign","index":0,"type":"brease.enum.ImageAlign"}}},"SetImagePath":{"method":"setImagePath","parameter":{"imagePath":{"name":"imagePath","index":0,"type":"String"}}},"setItemHeight":{"method":"setItemHeight","parameter":{"itemHeight":{"name":"itemHeight","index":0,"type":"Integer"}}},"setListPosition":{"method":"setListPosition","parameter":{"listPosition":{"name":"listPosition","index":0,"type":"brease.enum.Position"}}},"setListWidth":{"method":"setListWidth","parameter":{"listWidth":{"name":"listWidth","index":0,"type":"Integer"}}},"setMaxVisibleEntries":{"method":"setMaxVisibleEntries","parameter":{"maxVisibleEntries":{"name":"maxVisibleEntries","index":0,"type":"Integer"}}},"setMultiLine":{"method":"setMultiLine","parameter":{"multiLine":{"name":"multiLine","index":0,"type":"Boolean"}}},"SetSelectedIndex":{"method":"setSelectedIndex","parameter":{"index":{"name":"index","index":0,"type":"Number"},"omitPrompt":{"name":"omitPrompt","index":1,"type":"Boolean"}}},"SetSelectedValue":{"method":"setSelectedValue","parameter":{"value":{"name":"value","index":0,"type":"String"},"omitPrompt":{"name":"omitPrompt","index":1,"type":"Boolean"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setWordWrap":{"method":"setWordWrap","parameter":{"wordWrap":{"name":"wordWrap","index":0,"type":"Boolean"}}}}
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