/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/ContainerWidget'),
		BreaseEvent = require('brease/events/BreaseEvent'),
        languageDependency = require('brease/decorators/LanguageDependency'),
		Enum = require('brease/enum/Enum'),
        Types = require('brease/core/Types'),
        Utils = require('brease/core/Utils'),
        Scroller = require('brease/helper/Scroller'),
        UtilsImage = require('widgets/brease/common/libs/wfUtils/UtilsImage'),

    /**
    * @class widgets.brease.GroupBox
    * #Description
    * widget to group widgets with Label.   
	* @breaseNote 
    * @extends brease.core.ContainerWidget
    * @iatMeta studio:isContainer
    * true
    *
    * @iatMeta category:Category
    * Container
	* @iatMeta description:short
    * Rahmen mit Label
    * @iatMeta description:de
    * Zeigt einen Rahmen um eine Gruppe von Widgets; optional mit einem Beschriftungstext
    * @iatMeta description:en
    * Displays a frame around a group of widgets with an optional caption
    */

    /**
    * @htmltag examples
    * Config examples:  
    *
    *     <div id="GroupBox1" data-brease-widget="widgets/brease/GroupBox" >
    *         <div id="Button1" data-brease-widget="widgets/brease/Button">Button label</div>
    *         <div id="Button2" data-brease-widget="widgets/brease/Button">Button label</div>
    *     </div>
    *
    */

	/**
    * @cfg {String} text=''
    * @localizable
    * @iatStudioExposed
    * @iatCategory Appearance 
	* text for the Label
    */

	/**
    * @cfg {ImagePath} image=''
    * @iatStudioExposed
    * @iatCategory Appearance 
	* Image path for the Label
    * <br>When svg - graphics are used, be sure that in your *.svg-file height and width attributes are specified on the &lt;svg&gt; element.
    * For more detailed information see https://www.w3.org/TR/SVG/struct.html (chapter 5.1.2)
    */

	/**
    * @cfg {brease.enum.ImagePosition} imageAlign=left
    * @iatStudioExposed
    * @iatCategory Appearance 
	* imageAlign for the Label
    * defines the Position of the image relative to the text
    * possible values: left(left of text)/right(right of text)
    */

	/**
    * @cfg {Boolean} ellipsis=false
    * @iatStudioExposed
    * @iatCategory Behavior 
	* ellipsis for the Label
    */

    /**
    * @cfg {brease.enum.Floating} float='left'
    * @iatStudioExposed
    * @iatCategory Appearance 
	* Floating of the childelements if childPositioning=relative
    */

    /**
    * @cfg {brease.enum.ChildPositioning} childPositioning='absolute'
    * @iatStudioExposed
    * @iatCategory Behavior 
    * positioning of child elements (widgets)
    */

    /**
    * @cfg {brease.enum.Direction} alignment='vertical'
    * @iatStudioExposed
    * @iatCategory Appearance
    * Alignment of the Bar. Possible Values:  
    * horizontal: elements aligned from left to right. no line break
    * vertical: elements aligned from left to right. with line break
    */

    /**
	* @cfg {Integer} maxHeight=0
	* @iatStudioExposed
    * @iatCategory Appearance
	* Maximum height the GroupBox can grow, when childPositioning='relative'
	*/

    defaultSettings = {
        alignment: Enum.Direction.vertical,
        borderTop: true,
        borderBottom: true,
        borderLeft: true,
        borderRight: true,
        childPositioning: Enum.ChildPositioning.absolute,
        imageAlign: Enum.ImagePosition.left,
        float: 'left',
        maxHeight: 0
    },

    WidgetClass = SuperClass.extend(function GroupBox() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    WidgetClass.static.multitouch = true;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseGroupBox');
        }
        SuperClass.prototype.init.call(this);
        if (brease.config.editMode !== true) {
            this.el.on(BreaseEvent.WIDGET_READY, this._bind('_widgetReadyHandler'))
                   .on('VisibleChanged', this._bind('_visibleChangeHandler'))
                   .on('SizeChanged', this._bind('_sizeChangeHandler'))
                   .on(BreaseEvent.MOUSE_DOWN, this._bind('_downHandler'));
        }


        if (this.settings.text !== undefined && brease.language.isKey(this.settings.text) === true) {
            this.settings.textkey = brease.language.parseKey(this.settings.text);
            this.setLangDependency(true);
        }
        if (this.settings.text !== undefined || this.settings.image !== undefined) {
            _addHeader(this);
            _containerOffsetHandling(this);
        }

        if (this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _setAlignmentClass(this);
            this.container.on("VisibleChanged", this._bind('_scrollUpdateHandler'));
        }

        _childPositioningHandling(this);
        _floatHandling(this);
        _headerHandling(this);


        if (brease.config.editMode) {
            this.createEditorHandles();
        }

        this.el.addClass('initialized');
        this._refreshScroller();

    };

    p.createEditorHandles = function () {
        var EditorHandles = require('widgets/brease/GroupBox/libs/EditorHandles');
        var editorHandles = new EditorHandles(this);

        this.getHandles = function () {
            return editorHandles.getHandles();
        };
    };

    p.langChangeHandler = function () {
        if (this.settings.textkey !== undefined) {
            this.setText(brease.language.getTextByKey(this.settings.textkey));
        }
    };

    /**
    * @method setText
    * Sets the text
    * @param {String} text
    */
    p.setText = function (text) {
        this.settings.text = text;
        var header = this.el.children('.header');

        if (header.length) {
            _textHandling(this, text);
        }
        else {
            _addHeader(this);
        }

        _headerHandling(this);
    };

    /**
	* @method getText 
	* Returns the text.
	* @return {String}  text
	*/
    p.getText = function () {
        return this.settings.text;
    };

    /**
	* @method setChildPositioning
	* Sets childPositioning
	* @param {brease.enum.ChildPositioning} childPositioning
	*/
    p.setChildPositioning = function (childPositioning) {
        this.settings.childPositioning = childPositioning;
        _childPositioningHandling(this);
        //_floatHandling(this); no need to call this here => floating is done in "_childPositioningHandling" also
        //can not be testet due to editor issue.
    };

    /**
	* @method getChildPositioning 
	* Returns childPositioning.
	* @return {brease.enum.ChildPositioning}
	*/
    p.getChildPositioning = function () {
        return this.settings.childPositioning;
    };


    /**
	* @method setEllipsis
	* Sets ellipsis
	* @param {Boolean} ellipsis
	*/
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;

        if (ellipsis === true && this.header) {
            this.header.addClass('ellipsis');
        } else if (ellipsis === false && this.header) {
            this.header.removeClass('ellipsis');
        }
    };

    /**
	* @method getEllipsis 
	* Returns ellipsis.
	* @return {Boolean}
	*/
    p.getEllipsis = function () {
        return this.settings.ellipsis;
    };


    /**
	* @method setImage
	* Sets image
	* @param {ImagePath} image
	*/
    p.setImage = function (image) {
        this.settings.image = image;
        _imageHandling(this);
    };

    /**
	* @method getImage 
	* Returns image.
	* @return {ImagePath}
	*/
    p.getImage = function () {
        return this.settings.image;
    };


    /**
	* @method setImageAlign
	* Sets imageAlign
	* @param {brease.enum.ImagePosition} imageAlign
	*/
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        _imageAlignHandling(this);
    };

    /**
	* @method getImageAlign 
	* Returns imageAlign.
	* @return {brease.enum.ImagePosition}
	*/
    p.getImageAlign = function () {
        return this.settings.imageAlign;
    };

    /**
    * @method setAlignment
    * Sets alignment
    * @param {brease.enum.Direction} alignment
    */
    p.setAlignment = function (alignment) {
        this.settings.alignment = alignment;
        _setAlignmentClass(this);
    };

    /**
    * @method getAlignment 
    * Returns alignment.
    * @return {brease.enum.Direction}
    */
    p.getAlignment = function () {
        return this.settings.alignment;
    };

    /**
	* @method setFloat
	* Sets float
	* @param {brease.enum.Floating} float
	*/
    p.setFloat = function (value) {
        this.settings.float = value;
        if (this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _floatHandling(this);
        }
    };

    /**
	* @method getFloat 
	* Returns float.
	* @return {brease.enum.Floating}
	*/
    p.getFloat = function () {
        return this.settings.float;
    };

    p.setTextKey = function (key) {
        if (key !== undefined) {
            this.settings.textkey = key;
            this.setLangDependency(true);
            this.langChangeHandler();
        }
    };

    /**
    * @method setMaxHeight
    * Sets maxHeight
    * @param {Integer} maxHeight
    */
    p.setMaxHeight = function (maxHeight) {
        this.settings.maxHeight = maxHeight;
    };

    /**
	* @method getMaxHeight 
	* Returns maxHeight.
	* @return {Integer}
	*/
    p.getMaxHeight = function () {
        return this.settings.maxHeight;
    };

    p.resize = function () {
        var header = this.el.find('.header'),
            curWidgetSize = this.el.outerHeight(),
            curInnerHeight = this.el.innerHeight(),
            initHeight = Types.parseValue(this.settings.height, 'Integer'),
            deltaSize = curWidgetSize - curInnerHeight,
            groupBoxContentSize;

        if (this.settings.maxHeight > initHeight) {
            if (header.length !== 0) {
                groupBoxContentSize = _calculateContentSize(this) + _getHeaderHeight(this, header);

                if (groupBoxContentSize < curInnerHeight && groupBoxContentSize > initHeight - deltaSize) {
                    this.el.css('height', groupBoxContentSize + deltaSize + 'px');

                } else if (groupBoxContentSize < curInnerHeight && groupBoxContentSize <= initHeight - deltaSize) {
                    this.el.css('height', initHeight + 'px');

                } else if (groupBoxContentSize >= curInnerHeight && groupBoxContentSize < this.settings.maxHeight - deltaSize) {
                    this.el.css('height', groupBoxContentSize + deltaSize + 'px');

                } else if (groupBoxContentSize >= curInnerHeight && groupBoxContentSize >= this.settings.maxHeight - deltaSize) {
                    this.el.css('height', this.settings.maxHeight + 'px');
                }

            } else {
                groupBoxContentSize = _calculateContentSize(this);

                if (groupBoxContentSize < curInnerHeight && groupBoxContentSize > initHeight - deltaSize) {
                    this.el.css('height', groupBoxContentSize + deltaSize + 'px');

                } else if (groupBoxContentSize < curInnerHeight && groupBoxContentSize <= initHeight - deltaSize) {
                    this.el.css('height', initHeight + 'px');

                } else if (groupBoxContentSize >= curInnerHeight && groupBoxContentSize < this.settings.maxHeight - deltaSize) {
                    this.el.css('height', groupBoxContentSize + deltaSize + 'px');

                } else if (groupBoxContentSize >= curInnerHeight && groupBoxContentSize >= this.settings.maxHeight - deltaSize) {
                    this.el.css('height', this.settings.maxHeight + 'px');
                }
            }
            this.sizeChanged();

        }
    };

    p.sizeChanged = function (value) {
        var sizeChangedEv = this.createEvent("SizeChanged");
        /**
        * @event sizeChanged
        * Fired when the size of the widget changes
        */
        sizeChangedEv.dispatch();
    };

    p._downHandler = function (e){
        if (this.isDisabled || brease.config.editMode || this.isActive) { return; }
        this.isActive = true;
        this.pointerId = Utils.getPointerId(e);


        $(document).on(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));

        /**
        * @event MouseDown
        * @iatStudioExposed
        * Fired when widget enters mouseDown state
        */
        var clickEv = this.createEvent("MouseDown");
        clickEv.dispatch();

    };

    p._upHandler = function (e){
        if (this.isDisabled || brease.config.editMode || Utils.getPointerId(e) !== this.pointerId) { return; }
        this.isActive = false;

        $(document).off(BreaseEvent.MOUSE_UP, this._bind('_upHandler'));

        /**
        * @event MouseUp
        * @iatStudioExposed
        * Fired when widget enters mouseUp state
        */
        var clickEv = this.createEvent("MouseUp");
        clickEv.dispatch();
    };

    p._scrollUpdateHandler = function (e) {
        this._handleEvent(e);
        if (this.scroller !== undefined) {
            this._refreshScroller();
        } else {
            _setAlignmentClass(this);
        }

    };

    p._refreshScroller = function () {
        var widget = this;

        if (this.scroller) {
            this.refreshTimeOut = window.setTimeout(function () {
                if (widget.scroller === null || widget.scroller === undefined) {return false;}
                widget.scroller.refresh();
            }, 100);
        }
    };

    p._widgetReadyHandler = function (e) {
        if (e.target.id === this.elem.id) {
            if (this.settings.childPositioning === Enum.ChildPositioning.relative && this.scrollWrapper) {
                this.resize();
            }
        }
    };

    p._sizeChangeHandler = function (e) {
        if (e.target.id !== this.elem.id) {
            this.resize();
        }
    };

    p._visibleChangeHandler = function (e) {
        var self = this,
            selector = '#' + this.elem.id + '> .container > .scrollWrapper';

        //Check if the visible change event was fired by a direct child of the GroupBox
        $(selector).children().each(function () {
            if ($(this).attr('id') === e.target.id) {
                self.resize();
                return false;
            }
        });
    };


    //this method, overshadowed from the container widget will tell us when a new widget is dropped
    p.widgetAddedHandler = function (e) {
        _applyFloatingDirection(document.getElementById(e.detail.widgetId), this.settings.float);

        //If there is no scroller wrapper
        if (!this.scrollWrapper && this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _setAlignmentClass(this);
        } else if (this.scrollWrapper && this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _addChildAtScroller(this);
        }
    };

    //Equivalently this method, just as widgetAddedHandler, will tell us when a widget is removed
    p.widgetRemovedHandler = function (e) {
        _removeChildAtScroller(this);
    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.suspend = function () {
        $(window).off('mouseup', this._bind('_enableScroll'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.dispose = function () {
        $(window).off('mouseup', this._bind('_enableScroll'));

        this.container.off();

        if (this.scroller) {
            this.scroller.destroy();
            this.scroller = null;
            window.clearTimeout(this.refreshTimeOut);
            this.refreshTimeOut = null;
        }

        SuperClass.prototype.dispose.call(this);
    };

    function _addHeader(widget) {

        var elHeader = $('<div class="header"></div>'),
            elText,
            elImg;

        if (widget.settings.ellipsis === true) {
            elHeader.addClass('ellipsis');
        }
        if (widget.settings.text !== undefined && widget.settings.text.length !== 0) {
            var text = ((widget.settings.textkey !== undefined) ? brease.language.getTextByKey(widget.settings.textkey) : widget.settings.text);
            elText = $('<span></span>').text(text);
        }
        if (widget.settings.image !== undefined) {

            if (UtilsImage.isStylable(widget.settings.image)) {
                elImg  = $('<svg />');
                elImg.hide();
                UtilsImage.getInlineSvg(widget.settings.image).then(function(svgElement) {
                    elImg.replaceWith(svgElement);
                    elImg = svgElement;
                    elImg.show();
                    elImg.addClass('imgur');
                });
            } else {
                elImg = $('<img src="' + widget.settings.image + '"/>');
            }
        }
        
        if (widget.settings.imageAlign === Enum.ImagePosition.left) {
            elHeader.addClass('image-left').append(elImg).append(elText);
        } else {
            elHeader.addClass('image-right').append(elText).append(elImg);
        }
        widget.header = $(elHeader).prependTo(widget.el);
        widget.textEl = widget.header.find('span');
    }

    function _imageHandling(widget) {
        var header = widget.el.children('.header');
        widget.el.children('.header').children('svg').remove();
        widget.el.children('.header').children('img').remove();

        if (header.length) {
            var elImg;
            if (UtilsImage.isStylable(widget.settings.image)) {
                elImg  = $('<svg />');
                elImg.hide();
                UtilsImage.getInlineSvg(widget.settings.image).then(function(svgElement) {
                    elImg.replaceWith(svgElement);
                    elImg = svgElement;
                    elImg.show();
                    elImg.addClass('imgur');
                });
            } else {
                elImg = $("<img src='" + widget.settings.image + "'>");
                elImg.addClass('imgur');
            }
            if (widget.settings.imageAlign === Enum.ImagePosition.right) {
                header.append(elImg);
            } else {
                header.prepend(elImg);
            }
        }
        else {
            _addHeader(widget);
        }
        _headerHandling(widget);
    }

    function _imageAlignHandling(widget) {
        var header = widget.el.children('.header'),image;
            if (UtilsImage.isStylable(widget.settings.image)) {
                image = header.children('svg');
            } else {
                image = header.children('img');
            }

        if (widget.settings.imageAlign !== undefined || widget.settings.imageAlign !== '') {
            if (widget.settings.imageAlign === 'right') {
                header.removeClass('image-left');
                header.addClass('image-right');
                image.appendTo(header);
            }
            if (widget.settings.imageAlign === 'left') {
                header.removeClass('image-right');
                header.addClass('image-left');
                image.prependTo(header);
            }
        }
    }

    function _headerHandling(widget) {
        var header = widget.el.children('.header');

        if ((widget.settings.image === '' || widget.settings.image === undefined) &&
            (widget.settings.text === '' || widget.settings.text === undefined)) {
            widget.el.children('.header').remove();
            widget.header = null;
        }
        _containerOffsetHandling(widget);
    }

    function _containerOffsetHandling(widget) {
        if (widget.header) {
            widget.container.css("top", (widget.header.outerHeight()) + "px");
        } else {
            widget.container.css("top", "0px");
        }

    }

    function _textHandling(widget, text) {
        var span = widget.el.children('.header').children('span'),
            header = widget.el.children('.header');

        if (text.length === 0) {
            widget.textEl.remove();
        }
        else if (span.length) {
            widget.textEl.text(text);
        }
        else {
            widget.textEl = $('<span>' + ((widget.settings.textkey !== undefined) ? brease.language.getTextByKey(widget.settings.textkey) : widget.settings.text) + '</span>');
            if (widget.settings.imageAlign === 'left') {
                header.append(widget.textEl);
            } else if (widget.settings.imageAlign === 'right') {
                header.prepend(widget.textEl);
            }
            span.text(text);
        }
    }

    function _setAlignmentClass(widget) {
        widget.el.removeClass('vertical', 'horizontal');

        var scrollerSettings;
        if (widget.settings.alignment === 'horizontal') {
            widget.el.addClass('horizontal');
            scrollerSettings = { mouseWheel: true, tap: true, scrollY: false, scrollX: true };
        }

        else if (widget.settings.alignment === 'vertical') {
            widget.el.addClass('vertical');
            scrollerSettings = { mouseWheel: true, tap: true, scrollY: true, scrollX: false };
        }

        widget.container.off('VisibleChanged', widget._bind('_scrollUpdateHandler'));


        if (widget.settings.childPositioning === Enum.ChildPositioning.relative) {
            widget.container.on('VisibleChanged', widget._bind('_scrollUpdateHandler'));
            if (!widget.scrollWrapper) {
                _addScroller(widget, scrollerSettings);
                widget.el.addClass("autoScroll");
            } else if (widget.scrollWrapper) {
                if (brease.config.editMode){
                    _swapScrollers(widget, scrollerSettings);
                }
                _addChildAtScroller(widget);
            }

        } else {
            widget.el.removeClass("autoScroll");
        }
    }

    function _childPositioningHandling(widget) {
        var self = widget,
            selector = '';

        if (widget.settings.childPositioning === Enum.ChildPositioning.relative) {
            if (!widget.el.children('.container').children().hasClass("scrollWrapper")) {
                _setAlignmentClass(widget);
            }
            selector = '#' + widget.elem.id + ' > div > div > [data-brease-widget]';
            $(selector).each(function () {
                
                $('#' + this.id).css('position', 'relative');

                if (self.settings.float !== undefined) {
                    _applyFloatingDirection(document.getElementById(this.id), self.settings.float);
                }
            });
            _setAlignmentClass(widget);
        }
        else if (widget.settings.childPositioning === Enum.ChildPositioning.absolute) {
            if (widget.el.children('.container').children().hasClass("scrollWrapper")) {
                _removeScroller(widget);
            }
            _setAlignmentClass(widget);
            selector = '#' + widget.elem.id + ' > div > [data-brease-widget]';
            $(selector).each(function () {

                $('#' + this.id).css('position', 'absolute');

                if (self.settings.float !== undefined) {
                    _applyFloatingDirection(document.getElementById(this.id), '');
                }
            });
        }
    }

    function _floatHandling(widget) {
        if (widget.settings.childPositioning === Enum.ChildPositioning.relative) {
            if (widget.settings.float !== undefined) {
                widget.el.children('.container').children('.scrollWrapper').children().each(function () {
                    _applyFloatingDirection(this, widget.settings.float);
                });
            }
        }
    }

    function _applyFloatingDirection(elem, direction) {
        $(elem).css('float', direction);
    }

    function _addScroller(widget, scrollerSettings) {
        var containerChildren;

        containerChildren = widget.container.children().detach();
        widget.scrollWrapper = $('<div/>').addClass('scrollWrapper');
        widget.scrollWrapper.append(containerChildren);
        widget.container.append(widget.scrollWrapper);

        if (widget.scroller === undefined){
            widget.scroller = Scroller.addScrollbars(widget.container[0], scrollerSettings);
        }

        (widget.el).on('mousedown wheel', widget._bind('_disableScroll'));

        widget._refreshScroller();

    }

    function _removeScroller(widget) {
        var containerChildren;

        containerChildren = widget.container.children().children('.breaseWidget').detach();
        widget.el.find('scrollWrapper').removeClass('scrollWrapper');
        widget.container.children().remove();
        widget.container.append(containerChildren);

        widget.scroller = undefined;
        widget.scrollWrapper = undefined;
    }


    // New function to rearrange children in scroll bar
    function _addChildAtScroller(widget) {
        var containerChildToBeMoved;
        containerChildToBeMoved = widget.container.children('.breaseWidget').detach();
        widget.scrollWrapper.append(containerChildToBeMoved);
        widget._refreshScroller();
    }

    function _swapScrollers(widget, scrollerSettings) {
        widget.scroller.destroy();
        widget.scroller = undefined;
        widget.scroller = Scroller.addScrollbars(widget.container[0], scrollerSettings);
    }

    function _removeChildAtScroller(widget) {
        //Check if any children still are present
        widget._refreshScroller();

    }

    p._disableScroll = function (e) {
        var widget = this;

        $(window).on('mouseup', widget._bind('_enableScroll'));

        if (Utils.isFunction(e.target.className.includes)){
            if (e.target.className.includes('header')) {
                widget.el.parents('[data-brease-widget*=GroupBox]').parents('[data-brease-widget*=GroupBox]').map(function () {
                    var groupBoxes = brease.callWidget(this.id, 'widget');
                    if (groupBoxes.scroller !== undefined) {
                        groupBoxes.scroller.disable();
                    }
                });
                return;
            }
        }

        widget.el.parents('[data-brease-widget*=GroupBox]').map(function () {
            var groupBoxes = brease.callWidget(this.id, 'widget');
            if (groupBoxes.scroller !== undefined) {
                groupBoxes.scroller.disable();
            }
        });

        if (e.originalEvent.type === 'wheel') {
            setTimeout(function () {
                widget.el.parents('[data-brease-widget*=GroupBox]').map(function () {
                    var groupBoxes = brease.callWidget(this.id, 'widget');
                    if (groupBoxes.scroller !== undefined) {
                        groupBoxes.scroller.enable();
                    }
                });
            }, 50);
        }
    };

    p._enableScroll = function (e) {
        var widget = this;

        $(window).off('mouseup', widget._bind('_enableScroll'));

        widget.el.parents().find('[data-brease-widget*=GroupBox]').map(function () {
            var groupBoxes = brease.callWidget(this.id, 'widget');
            if (groupBoxes.scroller !== undefined) {
                groupBoxes.scroller.enable();
            }
        });
    };

    function _getHeaderHeight(widget, header) {
        return header.outerHeight();
    }

    function _calculateContentSize(widget) {
        var contentSize,
            positionObj,
            selector = '#' + widget.elem.id + '> .container > .scrollWrapper',
            maxContentSize = 0;

        $(selector).children().each(function () {
            if ($(this).hasClass('remove') !== true) {
                positionObj = $(this).position();
                contentSize = positionObj.top + $(this).outerHeight(true);

                if (contentSize > maxContentSize) {
                    maxContentSize = contentSize;
                }
            }
        });

        return maxContentSize;
    }

    return languageDependency.decorate(WidgetClass, false);

});