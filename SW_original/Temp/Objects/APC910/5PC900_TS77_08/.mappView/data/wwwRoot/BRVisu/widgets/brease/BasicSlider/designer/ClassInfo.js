/*global define*/
define(["brease/core/designer/BaseWidget/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.BasicSlider", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.BasicSlider","brease.core.BaseWidget"],
			actions: {"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setFormat":{"method":"setFormat","parameter":{"format":{"name":"format","index":0,"type":"brease.config.MeasurementSystemFormat"}}},"SetImage":{"method":"setImage","parameter":{"image":{"name":"image","index":0,"type":"ImagePath"}}},"setLargeChange":{"method":"setLargeChange","parameter":{"largeChange":{"name":"largeChange","index":0,"type":"UNumber"}}},"setMajorTicks":{"method":"setMajorTicks","parameter":{"majorTicks":{"name":"majorTicks","index":0,"type":"UInteger"}}},"setMaxValue":{"method":"setMaxValue","parameter":{"maxValue":{"name":"maxValue","index":0,"type":"Number"}}},"setMinValue":{"method":"setMinValue","parameter":{"minValue":{"name":"minValue","index":0,"type":"Number"}}},"setNode":{"method":"setNode","parameter":{"node":{"name":"node","index":0,"type":"brease.datatype.Node"}}},"setOrientation":{"method":"setOrientation","parameter":{"orientation":{"name":"orientation","index":0,"type":"brease.enum.Orientation"}}},"setScaleOffset":{"method":"setScaleOffset","parameter":{"scaleOffset":{"name":"scaleOffset","index":0,"type":"PixelVal"}}},"setShowTickNumbers":{"method":"setShowTickNumbers","parameter":{"showTickNumbers":{"name":"showTickNumbers","index":0,"type":"Boolean"}}},"setShowUnit":{"method":"setShowUnit","parameter":{"showUnit":{"name":"showUnit","index":0,"type":"Boolean"}}},"setShowValueDisplay":{"method":"setShowValueDisplay","parameter":{"showValueDisplay":{"name":"showValueDisplay","index":0,"type":"Boolean"}}},"setSmallChange":{"method":"setSmallChange","parameter":{"smallChange":{"name":"smallChange","index":0,"type":"UNumber"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setThumbSize":{"method":"setThumbSize","parameter":{"thumbSize":{"name":"thumbSize","index":0,"type":"PixelVal"}}},"setTickPosition":{"method":"setTickPosition","parameter":{"tickPosition":{"name":"tickPosition","index":0,"type":"brease.enum.TickStyle"}}},"setTrackSize":{"method":"setTrackSize","parameter":{"trackSize":{"name":"trackSize","index":0,"type":"PixelVal"}}},"setUnit":{"method":"setUnit","parameter":{"unit":{"name":"unit","index":0,"type":"brease.config.MeasurementSystemUnit"}}},"SetValue":{"method":"setValue","parameter":{"value":{"name":"value","index":0,"type":"Number"}}},"setValueDisplaySize":{"method":"setValueDisplaySize","parameter":{"valueDisplaySize":{"name":"valueDisplaySize","index":0,"type":"PixelVal"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}}}
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