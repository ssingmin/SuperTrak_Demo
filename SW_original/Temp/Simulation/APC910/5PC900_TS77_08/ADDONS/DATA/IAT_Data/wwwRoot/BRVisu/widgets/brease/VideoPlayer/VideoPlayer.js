/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/BaseWidget'),
        Types = require('brease/core/Types'),
        languageDependency = require('brease/decorators/LanguageDependency'),

    /**
    * @class widgets.brease.VideoPlayer
    * #Description
    * Widget for displaying a video.    
    * @breaseNote
    * @extends brease.core.BaseWidget
    
	* @iatMeta category:Category
    * Media
    * @iatMeta category:IO
    * Output
    * @iatMeta category:Appliance
    * Graphic
    * @iatMeta category:Performance
    * Medium,High
    * @iatMeta description:short
    * Video/audio player widget
    * @iatMeta description:de
    * Zeigt einen Film und erlaubt dem Benutzer eine Interaktion mit dem Player
    * @iatMeta description:en
    * Plays video files, allowing user interaction with the player
    */

    /**
    * @cfg {String} src=''
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * @localizable
    * Path to a video file (e.g. Media/Video.mp4).
    * There are generally 3 supported video formats: MP4, WebM and Ogg.
    * Notice: iOS devices can only play MP4 files with H.264 video encoding.
    * A text key can be used.
    */

    /**
    * @cfg {Boolean} controls=true
    * @iatStudioExposed
    * @iatCategory Behavior
    * If this attribute is true, VideoPlayer will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback. 
    */

    /**
    * @cfg {Boolean} autoplay=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * Enables the autoplay functionality, that the video starts as soon as the widget is ready. 
    */

    /**
    * @cfg {Boolean} loop=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If this attribute is true, the videoplayer will, upon reaching the end of the video, automatically seek back to the start. 
    */

    /**
    * @cfg {ImagePath} poster=''
    * @iatStudioExposed
    * @iatCategory Appearance
    * Specifies an image to be shown while the video is downloading, or until the user hits the play button
    */

	/**
	* @cfg {Boolean} muted=false
	* @iatStudioExposed
    * @iatCategory Behavior
	* Mute the audio of the video.  
	*/

	/**
	* @cfg {brease.enum.VideoPlayerPreload} preload=none 
	* @iatStudioExposed
    * @iatCategory Behavior
	* Defines if and how the video contents should start loading as the page loads.
    * Possible values: 'none', 'auto', 'metadata'
	*/

    defaultSettings = {
        controls: true,
        autoplay: false,
        loop: false,
        poster: '',
        muted: false,
        preload: 'none'
    },

    WidgetClass = SuperClass.extend(function VideoPlayer() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseVideoPlayer');
        }
        SuperClass.prototype.init.call(this);

        if (brease.config.editMode) {
            _editorImageHandling(this);
        } else {
            _srcTextInit(this);
            _initHandler(this);
            _initSettings(this);
        }
    };

    /**
	* @method setSrc
    * Sets source location of the video file, e.g. "/Media/help_video.mp4"
	* @iatStudioExposed
	* @param {String} value Path of the video file, e.g. "/Media/help_video.mp4"
	*/
    p.setSrc = function (value, keepKey) {

        var attr = {};

        if (keepKey !== true) {
            this.settings.srckey = null;
        }
        if (brease.language.isKey(value) === true) {
            this.setSrcKey(brease.language.parseKey(value));
        }
        else {
            this.settings.src = value;
        }

        if (!brease.config.editMode) {
            attr.src = this.settings.src;
        this.el.attr(attr);
        }
    };

    /**
	* @method getSrc 
	* Returns src.
	* @return {String}
	*/
    p.getSrc = function () {
        return this.settings.src;
    };

    /**
	* @method setControls
	* Sets controls
	* @param {Boolean} controls
	*/
    p.setControls = function (controls) {
        this.settings.controls = controls;
        this.settings.controls = Types.parseValue(this.settings.controls, 'Boolean', { default: this.defaultSettings.controls });

        var attr = {
            controls: this.settings.controls
        };

        this.el.attr(attr);
    };

    /**
	* @method getControls 
	* Returns controls.
	* @return {Boolean}
	*/
    p.getControls = function () {
        return this.settings.controls;
    };

    /**
	* @method setAutoplay
	* Sets autoplay
	* @param {Boolean} autoplay
	*/
    p.setAutoplay = function (autoplay) {
        this.settings.autoplay = autoplay;
        this.settings.autoplay = Types.parseValue(this.settings.autoplay, 'Boolean', { default: this.defaultSettings.autoplay });
        var attr = {
            autoplay: this.settings.autoplay
        };

        this.el.attr(attr);
    };

    /**
	* @method getAutoplay 
	* Returns autoplay.
	* @return {Boolean}
	*/
    p.getAutoplay = function () {
        return this.settings.autoplay;
    };

    /**
	* @method setLoop
	* Sets loop
	* @param {Boolean} loop
	*/
    p.setLoop = function (loop) {
        this.settings.loop = loop;
        this.settings.loop = Types.parseValue(this.settings.loop, 'Boolean', { default: this.defaultSettings.loop });
        var attr = {
            loop: this.settings.loop
        };

        this.el.attr(attr);
    };

    /**
	* @method getLoop 
	* Returns loop.
	* @return {Boolean}
	*/
    p.getLoop = function () {
        return this.settings.loop;
    };

    /**
	* @method setPoster
	* Sets poster
	* @param {String} poster
	*/
    p.setPoster = function (poster) {

        this.settings.poster = poster;

        if (brease.config.editMode) {
            _editorImageHandling(this);
            return;
        }

        var attr = {};
        if (this.settings.poster !== undefined) {
            attr.poster = this.settings.poster;
        }

        this.el.attr(attr);
    };

    /**
	* @method getPoster 
	* Returns poster.
	* @return {String}
	*/
    p.getPoster = function () {

        return this.settings.poster;

    };

    /**
	* @method setMuted
	* Sets muted
	* @param {Boolean} muted
	*/
    p.setMuted = function (muted) {
        this.settings.muted = muted;
    };

    /**
	* @method getMuted 
	* Returns muted.
	* @return {Boolean}
	*/
    p.getMuted = function () {
        return this.settings.muted;
    };

    /**
	* @method setPreload
	* Sets preload
	* @param {brease.enum.VideoPlayerPreload} preload
	*/
    p.setPreload = function (preload) {
        this.settings.preload = preload;
    };

    /**
	* @method getPreload 
	* Returns preload.
	* @return {brease.enum.VideoPlayerPreload}
	*/
    p.getPreload = function () {
        return this.settings.preload;
    };

    /**
    * @method startVideo
    * @iatStudioExposed
    * Starts the video.
    */
    p.startVideo = function () {
        this.elem.play();
    };

    /**
    * @method stopVideo
    * @iatStudioExposed
    * Stops the video.
    */
    p.stopVideo = function () {
            this.elem.pause();
    };

    p.setSrcKey = function (key) {
        if (key !== undefined) {
            this.settings.srckey = key;
            this.setLangDependency(true);
                this.langChangeHandler();
            }
    };

    p.getSrcKey = function () {
        return this.settings.srckey;
    };

    p.langChangeHandler = function (e) {
        if (this.settings.srckey !== undefined) {
            this.setSrc(brease.language.getTextByKey(this.settings.srckey), true);
        }
    };

    p.disable = function () {
        SuperClass.prototype.disable.call(this);

        var attr = {};
        attr.controls = false;

        this.el.attr(attr);
    };

    p.enable = function () {
        SuperClass.prototype.enable.call(this);

        var attr = {};
        if (this.settings.controls) {
            attr.controls = true;
        } else {
            attr.controls = false;
        }

        this.el.attr(attr);

    };

    p._canPlayHandler = function () {
        var attr = {};
        if (this.settings.poster !== undefined) {
            attr.poster = this.settings.poster;
        }
        this.el.attr(attr);
    };

    p._errorHandler = function (e) {
        console.log('[' + WidgetClass.name + ']' + this.elem.id + ':', this.elem.error);
        this.el.attr('poster', 'widgets/brease/VideoPlayer/assets/error.png');
    };

    p._videoPlayingHandler = function () {
        
        /**
        * @event VideoStarted
        * @iatStudioExposed
        * Fired when the video has been started.
        */
        var videoEv = this.createEvent("VideoStarted");
        videoEv.dispatch();

    };

    p._videoPausingHandler = function () {

        /**
        * @event VideoPaused
        * @iatStudioExposed
        * Fired when the video has been paused.
        */
        var videoEv = this.createEvent("VideoPaused");
        videoEv.dispatch();
    };

    p.dispose = function () {
        this.el.off('error', this._bind('_errorHandler'));
        this.el.off('canplay', this._bind('_canPlayHandler'));
        SuperClass.prototype.dispose.apply(this, arguments);
    };


    //Privat functions

    function _srcTextInit(widget) {
        if (widget.settings.src !== undefined) {
            if (brease.language.isKey(widget.settings.src) === false) {
                widget.setSrc(widget.settings.src);
            } else {
                widget.setSrcKey(brease.language.parseKey(widget.settings.src), false);
            }
        }
    }

    function _initHandler(widget) {
        widget.el.on('error', widget._bind('_errorHandler'));
        widget.el.on('canplay', widget._bind('_canPlayHandler'));
        widget.el.on('play', widget._bind('_videoPlayingHandler'));
        widget.el.on('pause', widget._bind('_videoPausingHandler'));
    }

    function _initSettings(widget) {
        var controls;
        if (widget.isDisabled) {
            controls = false;
        } else {
            controls = Types.parseValue(widget.settings.controls, 'Boolean', { default: widget.defaultSettings.controls });
        }

        widget.settings.autoplay = Types.parseValue(widget.settings.autoplay, 'Boolean', { default: widget.defaultSettings.autoplay });
        widget.settings.loop = Types.parseValue(widget.settings.loop, 'Boolean', { default: widget.defaultSettings.loop });
        widget.settings.muted = Types.parseValue(widget.settings.muted, 'Boolean', { default: widget.defaultSettings.muted });
        widget.settings.preload = Types.parseValue(widget.settings.preload, 'brease.enum.VideoPlayerPreload', { default: widget.defaultSettings.preload });
        widget.settings.poster = Types.parseValue(widget.settings.poster, 'String', { default: widget.defaultSettings.poster });

        var attr = {
            src: widget.settings.src,
            controls: controls,
            autoplay: widget.settings.autoplay,
            loop: widget.settings.loop,
            preload: widget.settings.preload,
            poster: widget.settings.poster
        };

        if (widget.settings.muted) {
            attr.muted = widget.settings.muted;
        }

        widget.el.attr(attr);
    }

    function _editorImageHandling(widget) {
        if (widget.settings.poster !== undefined && widget.settings.poster !== '') {
            widget.el.css('background-image', 'url(' + widget.settings.poster + ')')
                .css('background-repeat', 'no-repeat')
                .css('background-position','50% 50%');
        }
        else {
            widget.el.css('background-image', 'url("widgets/brease/VideoPlayer/assets/Video.svg")')
                .css('background-repeat', 'no-repeat')
                .css('background-position', '50% 50%');
        }
    }

    return languageDependency.decorate(WidgetClass, false);

});