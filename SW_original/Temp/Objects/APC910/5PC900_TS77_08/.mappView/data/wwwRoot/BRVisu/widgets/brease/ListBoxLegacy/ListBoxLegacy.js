/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/BaseWidget'),
        languageDependency = require('brease/decorators/LanguageDependency'),
        visibilityDependency = require('brease/decorators/VisibilityDependency'),
        Enum = require('brease/enum/Enum'),
        Types = require('brease/core/Types'),
        Scroller = require('brease/helper/Scroller'),
        BreaseEvent = require('brease/events/BreaseEvent'),
        
    /**
    * @class widgets.brease.ListBoxLegacy
    * #Description
    * ListBoxLegacy, e.g. opened by a DropDownBox  
    *   
    * @extends brease.core.BaseWidget
    *
    * @iatMeta studio:visible
    * false
    * @iatMeta category:Category
    * Selector
    * @iatMeta description:short
    * Liste von Texten
    * @iatMeta description:de
    * Zeigt eine Liste, aus welcher der Benutzer Elemente auswählen kann
    * @iatMeta description:en
    * Displays a list from where the user can select items
    */

    /**
    * @cfg {UInteger} selectedIndex=0
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * Index of the selected item. The first item has index=0
    */

    /**
    * @cfg {String} selectedValue=''
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * Value of the selected item
    */

    /**
    * @cfg {Integer} itemHeight=40
    * @iatStudioExposed
    * @iatCategory Appearance
    * Height of every item in the List
    */

    /**
	* @cfg {brease.enum.ImagePosition} imageAlign='left'
	* @iatStudioExposed
    * @iatCategory Appearance
	* Position of images relative to text  
	*/

	/**
	* @cfg {DirectoryPath} imagePath=''
	* @iatStudioExposed
    * @iatCategory Appearance
	* Path to the images location (e.g. 'Media/images/').
    * Names of the images must be given like the index in the dataProvider (e.g. 0.png, 1.png, 2.png)
	*/

    /**
    * @cfg {Boolean} ellipsis=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If true, overflow of text is symbolized with an ellipsis. This option has no effect, if wordWrap = true.
    */

    /**
    * @cfg {Boolean} wordWrap=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If true, text will wrap when necessary.
    */

    /**
    * @cfg {Boolean} multiLine=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If true, more than one line is possible. Text will wrap when necessary (wordWrap=true) or at line breaks (\n).
    * If false, text will never wrap to the next line. The text continues on the same line.
    */

    /**
    * @cfg {Boolean} fitHeight2Items=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If true, the height will fit to the necessary height if the height  oft the list is bigger
    * If false, the list uses the configured height
    */

    /**
    * @cfg {ItemCollection} dataProvider (required)
    * @iatStudioExposed
    * @bindable
    * @iatCategory Data
    * ItemCollection see Datatype
    *    
    */

    defaultSettings = {
        deferedSelection: false,
        itemHeight: 40,
        autoFit: false,
        ellipsis: false,
        wordWrap: false,
        multiLine: false,
        fitHeight2Items: false,
        selectedIndex: 0,
        imageAlign: Enum.ImageAlign.left,
        imagePath: ''
    },

    WidgetClass = SuperClass.extend(function ListBoxLegacy() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {
        _setClasses(this);
        this.list = $('<ul></ul');
        this.el.append(this.list);
        SuperClass.prototype.init.call(this);

        this.setDataProvider(this.settings.dataProvider || []);

        if (this.settings.itemHeight !== undefined) {
            this.setItemHeight(this.settings.itemHeight);
        }

        if (this.settings.imagePath !== undefined && this.settings.imagePath !== '') {
            this.imagePathChange(this.settings.imagePath);
        }

        if (this.settings.selectedIndex !== undefined) {
            this.setSelectedIndex(this.settings.selectedIndex);
        }

        if (this.settings.selectedValue !== undefined) {
            this.setSelectedValue(this.settings.selectedValue);
        }

        if (brease.config.editMode) {
            _initEditorHandles(this);
        }

        this.list.on(BreaseEvent.CLICK, this._bind('_listClickHandler'));
        this.list.on(BreaseEvent.MOUSE_DOWN, this._bind('_listMouseDownHandler'));
        this.list.on('mousewheel', this._bind('_mouseWheelHandler'));

    };

    p.langChangeHandler = function () {

        var textkeys = this.el.find('span[data-textkey]');
        for (var i = 0; i < textkeys.length; i += 1) {
            $(textkeys[i]).text(brease.language.getTextByKey($(textkeys[i]).data('textkey')));
        }
    };


    /**
     * @method setDataProvider
     * Sets dataProvider
     * @iatStudioExposed
     * @param {ItemCollection} provider
     */
    p.setDataProvider = function (provider) {
        var listSize;

        if (Array.isArray(provider)) {
            var data = [];
            provider.map(function (item) {
                if (typeof item === "string") {
                    try {
                        return data.push(JSON.parse(item));
                    } catch (err) {
                        return;
                    }
                } else if (typeof item === "object") {
                    data.push(item);
                }
            });

            this.settings.dataProvider = data;
        }

        this.list.html(_buildList(this.settings.dataProvider, this.settings));

        if (this.settings.selectedIndex !== undefined) {
            this.setSelectedIndex(this.settings.selectedIndex);
        }

        this.langChangeHandler();
        _itemHeightHandling(this);
    };

    /**
     * @method getDataProvider 
     * Returns dataProvider.
     * @return {ItemCollection}
     */
    p.getDataProvider = function () {

        return this.settings.dataProvider;

    };

    /**
     * @method setSelectedValue
     * Sets selectedValue
     * @iatStudioExposed
     * @param {String} value
     */
    p.setSelectedValue = function (value) {
        var dp = this.settings.dataProvider,
            i = 0,
            l = 0,
            index = -1;
        if (dp) {
            for (i = 0, l = dp.length; i < l; i += 1) {
                if (dp[i].value === value) {
                    index = i;
                    break;
                }
            }
        }
        if (index > -1) {
            this.setSelectedIndex(index);
        }
    };

    /**
     * @method getSelectedValue 
     * Returns selectedValue.
     * @return {String}
     */
    p.getSelectedValue = function () {
        if (this.currentSelected) {
            return this.settings.dataProvider[this.settings.selectedIndex].value;
        } else {
            return undefined;
        }
    };


    /**
     * @method setSelectedIndex
     * @iatStudioExposed
     * Sets selectedIndex
     * @param {Integer} index
     */
    p.setSelectedIndex = function (index) {
        this.settings.selectedIndex = index;
        var target = $(this.el.find('li')[index]);
        if (target && target.length > 0) {
            if (this.currentSelected) {
                this.currentSelected.removeClass('selected');
            }
            target.addClass('selected');
            this.currentSelected = target;
            this._refreshScroller();
        }


        if (this.settings.dataProvider !== undefined && this.settings.dataProvider.length > 0 && this.settings.dataProvider[this.settings.selectedIndex].value !== undefined) {
            this.sendValueChange({
                selectedIndex: this.getSelectedIndex(),
                selectedValue: this.getSelectedValue(),
            });
        }

    };

    /**
     * @method getSelectedIndex 
     * Returns selectedIndex.
     * @return {Integer}
     */
    p.getSelectedIndex = function () {
        return this.settings.selectedIndex;
    };

    /**
     * @method setMultiLine
     * Sets multiLine
     * @param {Boolean} multiLine
     */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;
        _setClasses(this);
    };

    /**
     * @method getMultiLine 
     * Returns multiLine.
     * @return {Boolean}
     */
    p.getMultiLine = function () {
        return this.settings.multiLine;
    };

    /**
     * @method setEllipsis
     * Sets ellipsis
     * @param {Boolean} ellipsis
     */
    p.setEllipsis = function (ellipsis) {
        this.settings.ellipsis = ellipsis;
        _setClasses(this);
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
     * @method setWordWrap
     * Sets wordWrap
     * @param {Boolean} wordWrap
     */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;
        _setClasses(this);
    };

    /**
     * @method getWordWrap 
     * Returns wordWrap.
     * @return {Boolean}
     */
    p.getWordWrap = function () {
        return this.settings.wordWrap;
    };


    /**
     * @method setFitHeight2Items
     * Sets fitHeight2Items
     * @param {Boolean} fitHeight2Items
     */
    p.setFitHeight2Items = function (fitHeight2Items) {
        this.settings.fitHeight2Items = fitHeight2Items;
        this.list.html(_buildList(this.settings.dataProvider, this.settings));
        this.setSelectedIndex(this.settings.selectedIndex);
        _itemHeightHandling(this);
    };

    /**
     * @method getFitHeight2Items 
     * Returns fitHeight2Items.
     * @return {Boolean}
     */
    p.getFitHeight2Items = function () {
        return this.settings.fitHeight2Items;
    };


    /**
     * @method setItemHeight
     * Sets itemHeight
     * @param {Integer} itemHeight
     */
    p.setItemHeight = function (itemHeight) {
        this.settings.itemHeight = itemHeight;
        if (this.settings.itemHeight > 0) {
            // To be backward compatible we have to reduce itemheight by one
            this.settings.itemHeight = this.settings.itemHeight - 1;
        }
        _itemHeightHandling(this);
    };

    /**
     * @method getItemHeight 
     * Returns itemHeight.
     * @return {Integer}
     */
    p.getItemHeight = function () {
        return this.settings.itemHeight;
    };

    /**
    * @method setImageAlign
    * Sets imageAlign
    * @param {brease.enum.ImageAlign} imageAlign
    */
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        this.list.html(_buildList(this.settings.dataProvider, this.settings));
        this.setSelectedIndex(this.settings.selectedIndex);
    };

    /**
	* @method getImageAlign 
	* Returns imageAlign.
	* @return {brease.enum.ImageAlign}
	*/
    p.getImageAlign = function () {
        return this.settings.imageAlign;
    };

    /**
    * @method setImagePath
    * Sets imagePath
    * @param {String} imagePath
    */
    p.setImagePath = function (imagePath) {
        this.settings.imagePath = imagePath;
        this.imagePathChange(imagePath);
    };

    /**
	* @method getImagePath 
	* Returns imagePath.
	* @return {String}
	*/
    p.getImagePath = function () {
        return this.settings.imagePath;
    };

    /**
    * @method setVisible
    * @iatStudioExposed
    * Sets the visibility of the widget.
    * @param {Boolean} value State of visibility (false = hide, true = show)
    */
    p.setVisible = function (value) {
        SuperClass.prototype.setVisible.call(this, value);
        _itemHeightHandling(this);
    };

    p._listScrollStartHandler = function (e) {
        this.isScrolling = true;
        this.dispatchEvent(new CustomEvent(BreaseEvent.SCROLL_START));
    };

    p._listScrollEndHandler = function (e) {
        if (this.isWheeling) {
            this.isWheeling = false;
            this.isScrolling = false;
        }
        this.dispatchEvent(new CustomEvent(BreaseEvent.SCROLL_END));
    };

    p._listMouseDownHandler = function (e) {
        brease.bodyEl.on(BreaseEvent.MOUSE_UP, this._bind('_listMouseUpHandler'));
    };

    p._mouseWheelHandler = function (e) {
        this.isWheeling = true;
    };

    p._listMouseUpHandler = function (e) {
        brease.bodyEl.off(BreaseEvent.MOUSE_UP, this._bind('_listMouseUpHandler'));
        if (!$.contains(this.elem, e.target)) {
            this.isScrolling = false;
        }
    };

    p._listClickHandler = function (e) {
        this._handleEvent(e, true);

        var liElements = $("#" + this.elem.id + " ul li");

        if (this.isDisabled) {
            return;
        }
        var target = $(e.target).closest('li');

        if (target.length < 1) {
            return;
        }

        if (this.settings.deferedSelection && !target.is(this.currentSelected)) {
            this.currentSelected.removeClass('selected');
            target.addClass('selected');
            this.currentSelected = target;
            this.settings.selectedIndex = liElements.index(target);
            return;
        }

        else if (!this.settings.deferedSelection && target.is(this.currentSelected)) {
            this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE));
            return;

        }
        if (this.currentSelected) {
            this.currentSelected.removeClass('selected');
        }
        target.addClass('selected');
        this.currentSelected = target;
        if (liElements.index(target) === -1) {
            return;
        }
        this.settings.selectedIndex = liElements.index(target);

        var item = this.settings.dataProvider[liElements.index(target)];

        var detail = {
            value: item.value,
            text: (item.isKey) ? brease.language.getTextByKey(item.key) : item.text,
            image: item.image,
            selectedIndex: this.getSelectedIndex()
        };
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: detail }));
        this.sendValueChange({
            selectedIndex: this.getSelectedIndex(),
            selectedValue: this.getSelectedValue(),
        });

        /**
         * @event SelectedIndexChanged
         * @param {Integer} selectedIndex
         * @param {String} selectedValue 
         * @iatStudioExposed
         * Fired when index changes.
         */
        var ev = this.createEvent('SelectedIndexChanged', {
            selectedIndex: this.getSelectedIndex(),
            selectedValue: this.getSelectedValue(),
        });

        ev.dispatch();
        SuperClass.prototype._clickHandler.call(this, e);
    };

    p._refreshScroller = function () {
        var widget = this,
            selectedItem;

        if (this.el) {
            var target = $(this.el.find('li')[this.settings.selectedIndex]);
            if (target && target.length > 0) {
                if (this.currentSelected) {
                    this.currentSelected.removeClass('selected');
                }
                target.addClass('selected');
                this.currentSelected = target;
            }

            if (widget.scroller) {
                widget.scroller.refresh();
                selectedItem = document.querySelector('#' + widget.elem.id + ' ul li.selected');
                widget.scroller.scrollToElement(selectedItem);
            }
        }
    };

    /**
     * @method imagePathChange
     * changes image path of listbox members
     * @param {DirectoryPath} imagePath
     */
    p.imagePathChange = function (imagePath) {
        var provider = [];
        for (var key in this.settings.dataProvider) {
            if (imagePath === '') {
                provider.push({ value: this.settings.dataProvider[key].value, text: this.settings.dataProvider[key].text, image: "" });
            } else {
                provider.push({ value: this.settings.dataProvider[key].value, text: this.settings.dataProvider[key].text, image: imagePath + key + ".png" });
            }
        }
        this.settings.dataProvider = provider;
        this.setDataProvider(provider);
    };

    p.dispose = function () {
        window.clearTimeout(this.refreshTimeOut);

        if (this.scroller) {
            _destroyScroller(this);
        }
        SuperClass.prototype.dispose.call(this, arguments);
    };

    function _buildList(data, settings) {

        var html = '';
        for (var i = 0; i < data.length; i += 1) {

            var item = data[i];
            item.isKey = brease.language.isKey(item.text);
            if (item.isKey) {
                item.key = brease.language.parseKey(item.text);
            }
            html += '<li ';

            if (settings.itemHeight) {
                html += 'style="height:' + settings.itemHeight + 'px; " ';
            }

            if (settings.displaySettings !== Enum.DropDownDisplaySettings.text && settings.displaySettings !== Enum.DropDownDisplaySettings.image && item.image && settings.imageAlign === Enum.ImageAlign.left) {
                html += 'class="image-left" ';
            }
            if (settings.displaySettings !== Enum.DropDownDisplaySettings.text && settings.displaySettings !== Enum.DropDownDisplaySettings.image && item.image && settings.imageAlign === Enum.ImageAlign.right) {
                html += 'class="image-right" ';
            }
            if (settings.displaySettings === Enum.DropDownDisplaySettings.image) {
                html += 'class="image-only" ';
            }

            html += 'data-brease-value="' + item.value + '">';
            if (settings.displaySettings !== Enum.DropDownDisplaySettings.text && item.image && settings.imageAlign === Enum.ImageAlign.left) {
                html += '<img src="' + item.image + '" />';
            }

            if (settings.displaySettings !== Enum.DropDownDisplaySettings.image) {
                html += '<span';
                if (item.isKey) {
                    html += ' data-textkey="' + item.key + '" ';
                }
                html += '>';
                if (item.text) {
                    html += (item.isKey) ? brease.language.getTextByKey(item.key) : item.text;
                }
                html += '</span>';
            }

            if (settings.displaySettings !== Enum.DropDownDisplaySettings.text && item.image && settings.imageAlign === Enum.ImageAlign.right) {
                html += '<img src="' + item.image + '" />';
            }
            html += '</li>';

            if (i < data.length - 1) {
                html += '<div/>';
            }
        }

        return html;
    }

    function _setClasses(widget) {

        if (widget.settings.omitClass !== true) {
            widget.el.addClass('breaseListBoxLegacy');
        }

        if (widget.settings.ellipsis === true) {
            widget.el.addClass('ellipsis');
        } else {
            widget.el.removeClass('ellipsis');
        }

        if (widget.settings.wordWrap === true) {
            widget.settings.wordWrap = Types.parseValue(widget.settings.wordWrap, 'Boolean');
        } else {
            widget.settings.wordWrap = false;
        }

        if (widget.settings.multiLine === true) {
            if (widget.settings.wordWrap === true) {
                widget.el.addClass('wordWrap');
                widget.el.removeClass('multiLine');
            } else {
                widget.el.addClass('multiLine');
                widget.el.removeClass('wordWrap');
            }

        } else {
            widget.el.removeClass('wordWrap');
            widget.el.removeClass('multiLine');
        }
    }

    function _itemHeightHandling(widget) {
        var numberItems = widget.settings.dataProvider.length,
            borderWidthTop = parseInt(widget.el.css('border-top-width')),
            borderWidthBottom = parseInt(widget.el.css('border-bottom-width')),
            selectedItem,
            separatorHeight = parseInt($('#' + widget.elem.id + ' ul div').css("height"));

        $('#' + widget.elem.id + ' ul li').css("height", widget.settings.itemHeight);

        if (widget.settings.fitHeight2Items === true) { /* + borderWidthBottom + borderWidthTop*/


            // TODO As soon aseparator height can be changed:
            // In next line also add the height of all list divs to the overall height
            widget._cssUpdates.height = ((widget.settings.itemHeight * numberItems) + (separatorHeight * (numberItems - 1))) + 'px';

            if (widget.scroller !== undefined) {
                _destroyScroller(widget);
            }

        } else {
            widget._cssUpdates['max-height'] = '';
            widget._cssUpdates.height = widget.settings.height + 'px';

            if ((widget.scroller === null || widget.scroller === undefined) && widget.elem !== undefined) {
                if (!widget.scrollerInit) {
                    widget.refreshTimeOut = window.setTimeout(function (widget) {
                        widget.scroller = Scroller.addScrollbars('#' + widget.elem.id, { mouseWheel: true });
                        widget.scroller.on(BreaseEvent.SCROLL_START, widget._bind('_listScrollStartHandler'));
                        widget.scroller.on(BreaseEvent.SCROLL_END, widget._bind('_listScrollEndHandler'));
                        widget.scrollerInit = false;
                        widget.setVisibilityDependency(true);
                    }, 500, widget);
                    widget.scrollerInit = true;
                }
            }

            if (widget.scroller) {
                widget.scroller.refresh();
                selectedItem = document.querySelector('#' + widget.elem.id + ' ul li.selected');
                if (selectedItem) {
                    widget.scroller.scrollToElement(selectedItem);
                }

            }
        }
        widget._invalidate();
    }

    function _destroyScroller(widget) {
        widget.scroller.off(BreaseEvent.SCROLL_START, widget._bind('_listScrollStartHandler'));
        widget.scroller.off(BreaseEvent.SCROLL_END, widget._bind('_listScrollEndHandler'));
        widget.scroller.destroy();
        widget.scroller = undefined;
    }

    p._editorResize = function () {
        _itemHeightHandling(this);
    };

    p._setHeight = function (h) {
        this.settings.height = h;
        this.el.css("height", this.settings.height);
        this._editorResize();
    };

    p._setWidth = function (w) {
        this.settings.width = w;
        this.el.css("width", this.settings.width);
        this._editorResize();
    };

    function _initEditorHandles(widget) {
        var EditorHandles = require('widgets/brease/ListBoxLegacy/libs/EditorHandles');
        widget.editorHandles = new EditorHandles(widget);
        widget.getHandles = function () {
            return widget.editorHandles.getHandles();
        };
        widget.designer.getSelectionDecoratables = function () {
            return widget.editorHandles.getSelectionDecoratables();
        };
    }

    return visibilityDependency.decorate(languageDependency.decorate(WidgetClass, true), false);

});