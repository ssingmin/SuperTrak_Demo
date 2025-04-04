/*global define*/
define(["brease/core/designer/BaseWidget/ClassInfo"], function (superClassInfo, classExtension) {
	"use strict";
	var classInfo = {
		meta: {
			className: "widgets.brease.VideoPlayer", 
			parents: ["*"],
			children: [],
			inheritance: ["widgets.brease.VideoPlayer","brease.core.BaseWidget"],
			actions: {"setAutoplay":{"method":"setAutoplay","parameter":{"autoplay":{"name":"autoplay","index":0,"type":"Boolean"}}},"setControls":{"method":"setControls","parameter":{"controls":{"name":"controls","index":0,"type":"Boolean"}}},"SetEnable":{"method":"setEnable","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"setLoop":{"method":"setLoop","parameter":{"loop":{"name":"loop","index":0,"type":"Boolean"}}},"setMuted":{"method":"setMuted","parameter":{"muted":{"name":"muted","index":0,"type":"Boolean"}}},"setPoster":{"method":"setPoster","parameter":{"poster":{"name":"poster","index":0,"type":"String"}}},"setPreload":{"method":"setPreload","parameter":{"preload":{"name":"preload","index":0,"type":"brease.enum.VideoPlayerPreload"}}},"SetSrc":{"method":"setSrc","parameter":{"value":{"name":"value","index":0,"type":"String"}}},"SetStyle":{"method":"setStyle","parameter":{"value":{"name":"value","index":0,"type":"StyleReference"}}},"SetVisible":{"method":"setVisible","parameter":{"value":{"name":"value","index":0,"type":"Boolean"}}},"StartVideo":{"method":"startVideo"},"StopVideo":{"method":"stopVideo"}}
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