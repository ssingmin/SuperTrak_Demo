/*global define*/
define(["brease/core/designer/BaseWidget/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.PDFViewer", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.PDFViewer","brease.core.BaseWidget"],
			actions: {"GoToPage":{"method":"goToPage","parameter":{"value":{"name":"value","index":0,"type":"UInteger"}}},"setDocumentZoom":{"method":"setDocumentZoom","parameter":{"documentZoom":{"name":"documentZoom","index":0,"type":"String"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setShowToolbar":{"method":"setShowToolbar","parameter":{"showToolbar":{"name":"showToolbar","index":0,"type":"Boolean"}}},"SetSrc":{"method":"setSrc","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"setStartPage":{"method":"setStartPage","parameter":{"startPage":{"name":"startPage","index":0,"type":"UNumber"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"setUsePlugin":{"method":"setUsePlugin","parameter":{"usePlugin":{"name":"usePlugin","index":0,"type":"Boolean"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}}}
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