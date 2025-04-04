/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/BaseWidget'),
		BreaseEvent = require('brease/events/BreaseEvent'),
		PDFObject = require('libs/pdfobject'),
        config = require('brease/config'),
        popupManager = require('brease/controller/PopUpManager'),
        languageDependency = require('brease/decorators/LanguageDependency'),
        NumPad = require('widgets/brease/NumPad/NumPad'),
        Utils = require('brease/core/Utils'),

    /**
    * @class widgets.brease.PDFViewer
    * #Description
    * widget allows to embed PDF documents.  
    * @extends brease.core.BaseWidget
    * @aside example pdfviewer
    *
	* @iatMeta category:Category
    * Media
    * @iatMeta category:IO
    * Output
    * @iatMeta category:Appliance
    * Text
    * @iatMeta category:Performance
    * Medium,High
    * @iatMeta description:short
    * PDF Dokument anzeigen
    * @iatMeta description:de
    * Zeigt ein PDF Dokument und erlaubt dem Benutzer eine Bedienung des Dokuments
    * @iatMeta description:en
    * Displays a PDF document and allows an user interaction with the document
    */


	/**
	* @htmltag examples
	* ##Configuration examples:
	*
	* Example:
    *
    *     <div id="pdf1" data-brease-widget="widgets/brease/PDFViewer" data-brease-options="{'width':833, 'height':550, 'src':'files/test.pdf'}"></div>
    *
    *
	* @breaseNote 
	*
	*/

	/**
    * @cfg {Boolean} usePlugin=true
	* @iatStudioExposed
    * @iatCategory Behavior
    * If TRUE (default), a javascript plug-in will be used to display the PDF.  
    * If FALSE, the browser's embedded PDF viewer will be used to display the document. Note: this viewer has faster performance, but does not offer full functionality.
    */

	/**
    * @cfg {String} src=''
	* @iatStudioExposed
    * @iatCategory Data
	* @bindable
    * @localizable
	* Path to the pdf file; a text key may be used.
	*/
       
    /**
     * @cfg {UNumber} startPage='0'
     * Loads the document on the configured page number.
     * @groupRefId pdfOpenParameters
     * @groupOrder 1
     * @iatStudioExposed
     * @iatCategory Behavior
     */

    /** 
     * @cfg {String} documentZoom='auto' 
     * Zoom value/mode for the displayed document (only with plugin viewer). Accepted formats: 'auto','[zoom-value]', 'page-width', 'page-height', 'page-fit'
     * @groupRefId pdfOpenParameters
     * @groupOrder 2
     * @iatStudioExposed
     * @iatCategory Behavior
     */

    /**
     * @cfg {Boolean} showToolbar='false' 
     * Enable the display of the PDF viewer toolbar (limited compatibility).
     * @groupRefId pdfOpenParameters
     * @groupOrder 3
     * @iatStudioExposed
     * @iatCategory Behavior
     */

    defaultSettings = {
        usePlugin: true,
        startPage: 0,
        documentZoom: 'auto',
        showToolbar: false
    },

    WidgetClass = SuperClass.extend(function PDFViewer() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {
        var widget = this;
        
        // Oct-31-16 (DG): Removing namedest/pagemode from Chrome embedded viewer since they're not supported anyhow
        this.pdfOpenParams = {'page':'','nameddest':'','zoom':'','toolbar':''};
        this.inlineOpenParams;
        this.pdfUrlOptions;
        this.url;

        this.numPad = new NumPad();

        this.jsViewerPath = 'widgets/brease/PDFViewer/assets/jsviewer/web/viewer_br.html';
        
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breasePDFViewer');
        }
        SuperClass.prototype.init.call(this);
        
        // Listen to numpad (for page navigation) + full screen request
        _initUserActions(this);

        if (brease.config.editMode) {
            _addEditorSVG(this);
        } else {
            _srcTextInit(this);
            this.isFullscreen = false;
            /*
            this.embedTimout = window.setTimeout(function () {
                _embed(widget);
            }, 0);
            */
        }
    };

    /**
    * @method load
    * Loads a PDF from the source path to pdf document, e.g "Media/Documents/Datasheet.pdf"
    * @param {String} src 
    */
    p.load = function (src) {
        this.settings.src = src;
        _render(this);
    };

    /**
    * @method getSrc
    * Get path of actually loaded pdf.
    * @return {String} Path of loaded PDF document.
    */
    p.getSrc = function () {
        return this.settings.src;
    };

    /**
	* @method setSrc
    * Sets source location of PDF document.
    * @iatStudioExposed
	* @param {String} value Path of the PDF document, e.g. "/Media/HelpPDF.pdf"
	*/
    p.setSrc = function (value, keepKey) {
        if (keepKey !== true) {
            this.settings.srckey = null;
        }
        if( brease.language.isKey(value) === true ){
            this.setSrcKey(brease.language.parseKey(value));
        }
        else{
            this.load(value);
        }
    };

    /**
     * @method setStartPage
     * Sets the page shown initially when document is loaded.
     * @param {UNumber} startPage
     */
    p.setStartPage = function(startPage) {
        this.settings.startPage = startPage;
    };

    /**
     * @method getStartPage
     * Returns the page that is configured to be shown initially.
     * @return {UNumber}
     */
    p.getStartPage = function() {
        return this.settings.startPage;
    };

    /**
     * @method setDocumentZoom
     * Sets the zoom value/style for the PDF document.
     * @param {String} documentZoom
     */
    p.setDocumentZoom = function(documentZoom) {
        this.settings.documentZoom = documentZoom;
    };

    /**
     * @method getDocumentZoom
     * Returns the configured value for the zoom value/style of the PDF document.
     * @return {String}
     */
    p.getDocumentZoom = function() {
        return this.settings.documentZoom;
    };

    /**
     * @method setShowToolbar
     * Sets the named destination shown initially when document is loaded.
     * @param {Boolean} showToolbar
     */
    p.setShowToolbar = function(showToolbar) {
        this.settings.showToolbar = showToolbar;
    };

    /**
     * @method getShowToolbar
     * Returns the name destination that is configured to be shown initially.
     * @return {Boolean}
     */
    p.getShowToolbar = function() {
        return this.settings.showToolbar;
    };

    /**
	* @method setUsePlugin
	* Sets usePlugin
	* @param {Boolean} usePlugin
	*/
    p.setUsePlugin = function (usePlugin) {
        this.settings.usePlugin = usePlugin;
    };

   /**
	* @method getUsePlugin 
	* Returns usePlugin.
	* @return {Boolean}
	*/
    p.getUsePlugin = function () {
        return this.settings.usePlugin;
    };

    /**
    * @method goToPage
    * Navigates to a certain page
    * @iatStudioExposed
    * @param {UInteger} value Navigate to this page.
    */
    p.goToPage = function (value) {
        var newPage = Number(value);
        if (Number.isInteger(newPage)) {
            this.settings.goToPage = newPage;
            _render(this);
        }
    };

    p.setSrcKey = function (key) {
        if (key !== undefined) {
            this.settings.srckey = key;
            this.setLangDependency(true);
            this.langChangeHandler();
        }
    };

    p.langChangeHandler = function (e) {
        if (this.settings.srckey !== undefined) {
            this.load( brease.language.getTextByKey(this.settings.srckey) );
        }
    };

    p._onNumPadSubmit = function (e) {
        this.numPad.removeEventListener(BreaseEvent.SUBMIT, this._bind('_onNumPadSubmit'));
        this.goToPage(e.detail.value);
    };

    p.suspend = function () {
        _disposeUserActions(this);
        // Clear any page "memory" from widget
        this.settings.goToPage = undefined;
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () {
        _initUserActions(this);
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p._numPadHandler = function (e) {
        if (this.el && this.elem) {
            this.numPad.addEventListener(BreaseEvent.SUBMIT, this._bind('_onNumPadSubmit'));
        }

        var npValue = parseInt(e.detail.value),
            minValue = parseInt(e.detail.minValue),
            maxValue = parseInt(e.detail.maxValue),

            numPadSettings = {
                minValue: minValue,
                maxValue: maxValue,
                value: npValue,
                pointOfOrigin: 'element',
                format: { default: { decimalPlaces: 0, minimumIntegerDigits: 1 } },
            };
        this.numPad.show(numPadSettings, this.elem);
    };

    p._fullScreenHandler = function (e) {
        if (this.elem) {
            _toggleFullscreen(this);
        }
    };

    p.dispose = function () {
        window.clearTimeout(this.embedTimout);
        _unbindNumPad(this);
        _disposeUserActions(this);
        //Clear any page "memory" from widget
        this.settings.goToPage = undefined;
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    /**
	 * Private Methods
	 */

    function _unbindNumPad(widget) {
        if (widget.numPad && widget.numPad.elem) {
            widget.numPad.removeEventListener(BreaseEvent.SUBMIT, widget._bind('_onNumPadSubmit'));
        }
    }

    function _initUserActions(widget) {
        // Listen to numpad request for page change + full screen request
        document.addEventListener('openNumPad.PDFViewer', widget._bind('_numPadHandler'));
        document.addEventListener('requestFullscreen.PDFViewer', widget._bind('_fullScreenHandler'));
    }

    function _disposeUserActions(widget) {
        // Remove listeners for numpad and full screen requests
        document.removeEventListener('openNumPad.PDFViewer', widget._bind('_numPadHandler'));
        document.removeEventListener('requestFullscreen.PDFViewer', widget._bind('_fullScreenHandler'));
    }

    function _srcTextInit(widget) {
        if (widget.settings.src !== undefined) {
            if (brease.language.isKey(widget.settings.src) === false) {
                widget.setSrc(widget.settings.src);
            } else {
                widget.setSrcKey(brease.language.parseKey(widget.settings.src));
            }
        }
    }

    function _embed(widget) {

        if (brease.config.editMode !== true) {
            _pdfOpenParamHandler(widget);

            if (widget.settings.src) {
                if (widget.settings.usePlugin === false) {

                    widget.pdfObject = _createPDFObject(widget);
                    if (widget.pdfObject === false) {
                        widget.el.html('<p style="width:80%; padding:2%;text-align:center;font-weight:bold;margin:auto;display:block;border:1px solid red;">no plugin available to display pdf documents</p>').css({ 'background-color': '#ffffff', width: widget.settings.width + 'px', height: widget.settings.height + 'px' });
                    }
                } else {
                    _includeAlternativeViewer(widget);
                }
            } else {
                if (config.warn === true) {
                    console.iatWarn('No PDF source given at widget PDFViewer[id="' + widget.elem.id + '"]');
                }
            }
        }
    }

    function _render(widget) {
        // TEST
        var url;

        if (brease.config.editMode !== true) {

            if(widget.settings.src !== undefined ){

                widget.inlineOpenParams = _extractInlineOpenParams(widget.settings.src);
                
                if( widget.settings.usePlugin === false ){
                    // BROWSER EMBEDDED VIEWER
                    if( widget.inlineOpenParams !== undefined){
                        url = _parseUrl(widget.settings.src, true);
                    }
                    else{
                        url = _parseUrl(widget.settings.src,false);
                    }
                    
                    _pdfOpenParamHandler(widget);
                    if( widget.settings.goToPage !== undefined ){
                        widget.pdfOpenParams.page = widget.settings.goToPage;
                    }
                    widget.pdfObject = _createPDFObject(widget, url);
                    
                    // check whether embedded viewer really exists
                    if (widget.pdfObject === false) {
                        widget.el.html('<p style="width:80%; padding:2%;text-align:center;font-weight:bold;margin:auto;display:block;border:1px solid red;">no plugin available to display pdf documents</p>').css({ 'background-color': '#ffffff', width: widget.settings.width + 'px', height: widget.settings.height + 'px' });
                    }
                }

                else {
                    // PDF.JS VIEWER
                    if (widget.pdfFrame === undefined) {
                        _includeAlternativeViewer(widget); // check on this!
                    }

                    url = _parseUrl(widget.settings.src,false);
                    
                    if( widget.inlineOpenParams !== undefined){

                        if( widget.settings.goToPage !== undefined ){
                            // modify path string, find 'page=', replace by 'page='+goToPage, if not found append after #
                            if( /page=/.test(url) === true ){
                                url = url.replace(/page=\w*/,'page='+widget.settings.goToPage);
                            }
                            else{
                                url = url.replace(/#/,'#page='+widget.settings.goToPage+'&');
                            }
                        }
                        widget.pdfFrame.attr('src', widget.jsViewerPath + '?file=' + url + '&widgetId=' + widget.elem.id);
                    }
                    else{
                        _pdfOpenParamHandlerIFrame(widget);
                        if( widget.settings.goToPage !== undefined ){
                            widget.pdfUrlOptions = widget.pdfUrlOptions.replace(/page=\w*/,'page='+widget.settings.goToPage);
                        }
                        widget.pdfFrame.attr('src', widget.jsViewerPath + '?file=' + url + '&widgetId=' + widget.elem.id + widget.pdfUrlOptions);
                    }
                }
            }
            else{
                if (config.warn === true) {
                    console.iatWarn('No PDF source given at widget PDFViewer[id="' + widget.elem.id + '"]');
                }
            }
        }
    }

    /**
     * -------------------------
     * FUNCTION _pdfOpenParamHandler
     * -------------------------
     * Assembles start option object for PDFObject (embedded viewer, usePlugin=false)
     * -------------------------
     * parameters:  widget
     * returns:     option string, to be concatenated with url
     */ 
    function _pdfOpenParamHandler(widget) {

        var s = widget.settings,
            p = widget.pdfOpenParams,
            i = widget.inlineOpenParams;

        // Assemble pdfOpenParams object that is passed to embedded viewer
        if( i !== undefined ){
            p.page = (i.page === undefined) ? '' : i.page;
            p.zoom = (i.zoom === undefined) ? '' : i.zoom;
            p.nameddest = (i.nameddest === undefined) ? '' : i.nameddest;
            p.toolbar = (i.showToolbar === true) ? 1 : 0;
        }
        else{
            p.page = (s.startPage === undefined || s.startPage === 0) ? '' : s.startPage;
            p.zoom = (s.documentZoom === undefined || s.documentZoom === 'auto') ? '' : s.documentZoom;
            p.nameddest = (s.namedDest === undefined ) ? '' : s.namedDest;
            p.toolbar = (s.showToolbar === true) ? 1 : 0;
        }
    }

    /**
     * -------------------------
     * FUNCTION _pdfOpenParamHandlerIFrame
     * -------------------------
     * Assembles start option string for PDF.JS (usePlugin=true)
     * -------------------------
     * parameters:  widget
     * returns:     option string, to be concatenated with url
     */ 
     function _pdfOpenParamHandlerIFrame(widget) {
        var s = widget.settings,
            opt = '';

        // currently we are embedding PDF.JS manually with a <iframe>; options need to be added to the url path
        opt = ( s.startPage === '' || s.startPage === undefined || s.startPage === 0 ) ? '#page=' : '#page='+s.startPage;
        opt = ( s.namedDest === '' || s.namedDest === undefined ) ? (opt) : (opt + '&nameddest=' + s.namedDest);
        opt = ( s.documentZoom === '' || s.documentZoom === undefined ) ? (opt + '&zoom=') : (opt + '&zoom=' + s.documentZoom);
        opt = ( s.showToolbar === true ) ? (opt + '&toolbar=1') : (opt + '&toolbar=0');

        widget.pdfUrlOptions = opt;
     }


    function _createPDFObject(widget, url) {

        var width = widget.settings.width,
            height = widget.settings.height;

        return new PDFObject({
            url: url,
            width:  width + 'px',
            height: height + 'px',
            pdfOpenParams: widget.pdfOpenParams
        }).embed(widget.elem.id);
    }


    function _includeAlternativeViewer(widget) {
        var jsViewerPath = widget.jsViewerPath;

        widget.pdfFrame = $('<iframe id="PDFViewerFrame_' + widget.elem.id + '" src="' + jsViewerPath + '?file=' + '&widgetId=' + widget.elem.id + widget.pdfUrlOptions + '" style="display: block;border:none; margin:0; padding:0;width:100%;height:100%"></iframe>');
        widget.el.html(widget.pdfFrame);
    }

    /**
     * -------------------------
     * FUNCTION _parseUrl
     * -------------------------
     * parameters:  url --> string path for PDF source
     *              chopParams --> TRUE: remove everything after #, FALSE: leave intact
     * return:      url path
     */ 
    function _parseUrl(url, chopParams) {
        var inlineOpenParams,
            returnObj = {};

        if (url.substring(0, 1) !== '/' && url.substring(0, 4) !== 'http') {
            var base = $('base').attr('href');
            url = base + url;
        }
        if( chopParams ){
            url = url.replace(/#(.*)/,'');
        }

        return url;

        /*
        inlineOpenParams = _extractInlineOpenParams(url);
        url = url.replace(/#(.*)/,'');

        // this should still be returned for compatibility
        returnObj = {'url':url, 'inlineOpenParams':inlineOpenParams};
        return returnObj;
        */
    }

    //TEST
    /**
     * ---------------------------------
     * FUNCTION _extractInlineOpenParams
     * ---------------------------------
     * parameter:   url --> string path for PDF source
     * return:      inline PDF Open Parameters as object
     */
    function _extractInlineOpenParams(url) {
        var parameterStringObj=[],
            urlOpenParams,
            i;

        if( /#/.test(url) === true ){
            urlOpenParams = '';            
            parameterStringObj = url.match(/#(.*)/).pop().split(/\&/);

            for( i=0; i<=parameterStringObj.length-1; i+=1 ) {
              urlOpenParams = urlOpenParams + parameterStringObj[i].replace(/(.*?)=(.*)/,'{"$1":"$2"}');
            }
            urlOpenParams = urlOpenParams.replace(/}{/g,',');
            urlOpenParams = JSON.parse(urlOpenParams);
        }
        return urlOpenParams;
    }


    function _toggleFullscreen(widget) {
        if (widget.isFullscreen === false) {
            var maxZindex = popupManager.getHighestZindex();
            brease.bodyEl.addClass('fullscreenPDFViewer');
            widget.pdfFrame.css({ 'z-index': maxZindex + 1, position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }).appendTo(document.body);
            widget.isFullscreen = true;
        } else {
            brease.bodyEl.removeClass('fullscreenPDFViewer');
            widget.pdfFrame.css({ 'z-index': 0, position: 'relative', top: '0px', left: '0px', width: _parseSize(widget.settings.width), height: _parseSize(widget.settings.height) }).appendTo(widget.el);
            widget.isFullscreen = false;
        }
    }

    function _parseSize(size) {
        size = size + '';
        return (size.indexOf('%') !== -1) ? size : size + 'px';
    }

    function _addEditorSVG(widget) {
        widget.el.addClass('iatd-outline');
        widget.el.css('background-image', 'url("widgets/brease/PDFViewer/assets/PDF.svg")');
    }

    return languageDependency.decorate(WidgetClass, false);

});