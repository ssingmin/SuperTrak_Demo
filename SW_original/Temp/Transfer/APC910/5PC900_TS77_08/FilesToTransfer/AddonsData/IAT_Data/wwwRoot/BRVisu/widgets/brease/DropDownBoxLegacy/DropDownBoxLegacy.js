/*global define,brease,console,CustomEvent,_*/
define(function (require) {
    /*jshint white:false */
    'use strict';

    var SuperClass = require('brease/core/BaseWidget'),
		Enum = require('brease/enum/Enum'),
		BreaseEvent = require('brease/events/BreaseEvent'),
		Utils = require('brease/core/Utils'),
		popupManager = require('brease/controller/PopUpManager'),


	/**
	* @class widgets.brease.DropDownBoxLegacy
	* #Description
	* widget provides a ToggleButton which opens a List  
	* Intended for use of language dependent and language independent entries  
	*    
	* @breaseNote 
	* @extends brease.core.BaseWidget
	* @requires widgets.brease.ListBoxLegacy
	* @requires widgets.brease.ToggleButton
	* @aside example dropdownbox
	*
    * @iatMeta studio:visible
    * false
	* @iatMeta category:Category
	* Selector,Buttons
	* @iatMeta description:short
	* Einzeilige Liste von Texten
	* @iatMeta description:de
	* Zeigt eine DropDownliste, aus welcher der Benutzer Elemente auswählen kann
	* @iatMeta description:en
	* Displays a drop-down list where the user can select items
	*/

	/**
	* @htmltag examples
	* Config examples:  
	*   
	* Example for language independent entries:
	*
	*      <div id="DropDownBoxLegacy01" data-brease-widget="widgets/brease/DropDownBoxLegacy" data-brease-options="{
	*           dataProvider: [{ 'value': 1, 'text': 'Eintrag 1' }, { 'value': 2, 'text': 'Eintrag 2' }]
	*       }"></div>
	*      
	* Example for language dependent entries:
	*
	*      <div id="DropDownBoxLegacy01" data-brease-widget="widgets/brease/DropDownBoxLegacy" data-brease-options="{
	*           dataProvider: [{ 'value': 1, 'text': '$testoption1' }, { 'value': 2, 'text': '$testoption2' }]
	*       }"></div>
	*
	* Example for entries with images:
	*
	*      <div id="DropDownBoxLegacy01" data-brease-widget="widgets/brease/DropDownBoxLegacy" data-brease-options="{
	*           promptType:'image', 
	*           imageAlign:'right',
	*           dataProvider: [{ 'value': 1, 'text': 'Eintrag 1', 'image':'projects/DemoProject/assets/img/icons/icon-test1.png' }, { 'value': 2, 'text': 'Eintrag 2', 'image':'projects/DemoProject/assets/img/icons/icon-test2.png' }]
	*      }"></div>
	*
	* In this last example you will see images only in the DropDown-Button and text with image in the List.  
	*/

	/**
	* @cfg {Integer} selectedIndex=0
	* @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * @editableBinding
    * Index of the selected item. The first item has index=0
	*/

	/**
	* @cfg {String} selectedValue=''
	* @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * @editableBinding
    * Value of the selected item
	*/

	/**
	* @cfg {ItemCollection} dataProvider (required)
	* @iatStudioExposed
	* @bindable
    * @iatCategory Data
	* ItemCollection
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
	* @cfg {brease.enum.PromptType} promptType='all'
	* Specifies what to display in the prompt  
	*/
	/**
	* @cfg {String} prompt
	* Text (or key) of text, which will be shown, if no entry is selected and noSelectionPolicy='showPrompt'.  
	*/
	/**
	* @cfg {UInteger} maxVisibleEntries=4
	* @iatStudioExposed
    * @iatCategory Appearance
	* An integer to determine max-height of the list
	*/
	/**
	* @cfg {brease.enum.NoSelectionPolicy} noSelectionPolicy='selectFirst'
	* Config of behavior, if no entry is selected  
	*/
	/**
	* @cfg {brease.enum.Position} listPosition='right'
	* Position of opened list relative to ToggleButton.  
	* @iatStudioExposed
    * @iatCategory Appearance
	*/
	/**
	* @cfg {String} promptImage
	* Path to an image, which will be shown in the prompt area, independent of the selected item of the DropDownBoxLegacy  
	*/
	/**
	* @cfg {String} promptText
	* Text, which will be shown in the prompt area, independent of the selected item of the DropDownBoxLegacy  
	*/
	/**
	* @cfg {Boolean} cancelButtonChangeEvents=true
	* If true, change events of inner widgets will not bubble through.  
	*/

	/**
	* @cfg {Integer} listWidth=150
	* @iatStudioExposed
    * @iatCategory Appearance
	* Width of list and its items when the widget is pressed. 
	*/

	/**
	* @cfg {Integer} itemHeight=40
	* @iatStudioExposed
    * @iatCategory Appearance
	* Height of every item in the List
	*/

	/**
	* @cfg {Boolean} ellipsis=false
	* @iatStudioExposed
    * @iatCategory Behavior
	* If true, overflow of text is symbolized with an ellipsis. This option has no effect, if wordWrap = true.
	*/

	/**
	* @cfg {Boolean} fitHeight2Items=true
	* @iatStudioExposed
    * @iatCategory Behavior
	* If true, the height will fit to the necessary height if the height  oft the list is bigger
	* If false, the list uses the configured height
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
	* @cfg {brease.enum.CropToParent} cropToParent='none'
	* @iatStudioExposed
    * @iatCategory Behavior
    * Crop list to parent element
	*/

	defaultSettings = {
	    width: 100,
	    height: 30,
	    imageAlign: Enum.ImageAlign.left,
	    promptType: Enum.PromptType.all,
	    maxVisibleEntries: 4,
	    noSelectionPolicy: Enum.NoSelectionPolicy.selectFirst,
	    listPosition: Enum.Position.right,
	    cancelButtonChangeEvents: true,
	    ellipsis: false,
	    wordWrap: false,
	    multiLine: false,
	    fitHeight2Items: true,
	    itemHeight: 40,
	    selectedIndex: 0,
	    listWidth: 150,
	    imagePath: '',
	    cropToParent: 'none'
	},

	WidgetClass = SuperClass.extend(function DropDownBoxLegacy() {
	    SuperClass.apply(this, arguments);
	}, defaultSettings),

	p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseDropDownBoxLegacy');
        }
        SuperClass.prototype.init.call(this, true);

        this.setDataProvider(this.settings.dataProvider || []);
        //this.setItemHeight(this.settings.itemHeight);

        this.buttonId = Utils.uniqueID(this.elem.id + '_ddButton');
        this.listId = Utils.uniqueID(this.elem.id + '_ddList');

        var wrapperId = this.elem.id + '_breaseDropDownListWrapper';

        this.listWrapper = $('<div id="' + wrapperId + '" class="breaseDropDownListWrapper"></div>').css({ width: (this.settings.listWidth || this.settings.width) });
        this.arrow = $('<div class="arrow" />');
        this.listWrapper.append(this.arrow);
        _setListPosition(this);

        this._onWidgetsReady = _onWidgetsReady.bind(this);
        _addChildWidgets(this);

        this.setStyle(this.settings.style);
        this.setSelectedIndex(this.settings.selectedIndex);
    };

    p.setStyle = function (style) {

        if (this.listWrapper) {
            this.listWrapper.removeClass(this.settings.stylePrefix + "_style_" + this.settings.style);
        }
        SuperClass.prototype.setStyle.call(this, style);
        if (this.listWrapper) {
            this.listWrapper.addClass(this.settings.stylePrefix + "_style_" + this.settings.style);
        }
    };

    /**
	* @method setSelectedIndex
    * @iatStudioExposed
	* Sets the selected entry based on an index
	* @param {Number} index
	* @param {Boolean} omitPrompt
	*/
    p.setSelectedIndex = function (index, omitPrompt) {
        //console.log('DropDownBoxLegacy[' + this.elem.id + ']setSelectedIndex:', index);
        this.oldSelectedIndex = this.settings.selectedIndex;
        var dataProviderSize = this.settings.dataProvider ? this.settings.dataProvider.length : 0;
        if (dataProviderSize > 0) {
            this.settings.selectedIndex = (Number.isInteger(index) && index < dataProviderSize) ? index : this.settings.selectedIndex;
            this.settings.selectedIndex = this.settings.selectedIndex < dataProviderSize ? this.settings.selectedIndex : 0;
            _alignSelectedValueWithIndex(this, this.settings.selectedIndex, omitPrompt);
        }
    };

    /**
	* @method getSelectedIndex
	* get the index of selected entry
	* @return {Number} index
	*/
    p.getSelectedIndex = function () {
        return this.settings.selectedIndex;
    };

    p.setEditable = function (editable, metaData) {
        //console.log('%c' + this.constructor.name + '[' + this.elem.id + '].setEditable:' + JSON.stringify(metaData), 'color:#cc00cc;');
        if (metaData !== undefined && metaData.refAttribute !== undefined) {
            var refAttribute = metaData.refAttribute;
            if (refAttribute === 'selectedIndex' || refAttribute === 'selectedValue') {
                this.settings.editable = editable;
                this._internalEnable();
            }
        }
    };

    p.enable = function () {
        SuperClass.prototype.enable.call(this);
        if (this.buttonId !== undefined) {
            brease.callWidget(this.buttonId, 'enable');
        }
        if (this.listId !== undefined) {
            brease.callWidget(this.listId, 'enable');
        }
    };

    p.disable = function () {
        SuperClass.prototype.disable.call(this);
        if (this.buttonId !== undefined) {
            brease.callWidget(this.buttonId, 'toggle', false);
            brease.callWidget(this.buttonId, 'disable');
        }
    };

    p.setVisible = function (value) {
        if (value === false && this.buttonId !== undefined) {
            brease.callWidget(this.buttonId, 'toggle', false);
        }
        SuperClass.prototype.setVisible.apply(this, arguments);
    };

    /**
	* @method setSelectedValue
    * @iatStudioExposed
	* sets the selected entry based on a value
	* @param {String} value
	* @param {Boolean} omitPrompt
	*/
    p.setSelectedValue = function (value, omitPrompt) {
        //console.log('DropDownBoxLegacy[' + this.elem.id + '].setSelectedValue:', value);
        if (!this.settings.selectedValue && this.settings.selectedValue !== 0) {
            this.settings.selectedValue = '';
            var currentSelectedIndex = _getSelectedIndexFromValue(this);
            if (this.settings.selectedIndex !== currentSelectedIndex) {
                _alignSelectedIndexWithValue(this, this.settings.selectedValue, omitPrompt);
            }
        }
        else {
            this.settings.selectedValue = value;
            _updateSelectedValueOrResetIndex(this, omitPrompt);
        }
    };

    /**
	* @method getSelectedValue
	* Get the value of selected entry
	* @return {Number} index
	*/
    p.getSelectedValue = function () {

        if (this.list === undefined || this.button === undefined) {
            return _getSelectedIndexFromValue(this) !== -1 ? this.settings.dataProvider[this.settings.selectedIndex].value : "";
        } else {
            return this.list !== undefined ? brease.callWidget(this.listId, 'getSelectedValue') : "";
        }
    };

    p.getSelectedItem = function () {
        var item;
        if (this.settings.dataProvider && this.settings.selectedIndex > -1) {
            item = this.settings.dataProvider[this.settings.selectedIndex];
        }
        return item;
    };

    /**
    * @method setDataProvider
    * @iatStudioExposed
	* method to set the dataProvider
	* @param {ItemCollection} value ItemCollection (=Array) of objects of type brease.objects.ListEntry
	* @param {Boolean} [omitPrompt=false]  (Supported values: true, false)
	*/
    p.setDataProvider = function (value, omitPrompt) {
        //console.log('DropDownBoxLegacy[' + this.elem.id + '].setDataProvider:', dp);
        if (Array.isArray(value)) {
            var data = [];
            value.map(function (item) {
                if (typeof item === "string") {
                    try {
                        return data.push(JSON.parse(item));
                    }
                    catch (err) {
                        return;
                    }
                }
                else if (typeof item === "object") {
                    data.push(item);
                }
            });
            var oldDataLength = this.settings.dataProvider ? this.settings.dataProvider.length : 0;
            this.settings.dataProvider = data;

            if (this.listId) {
                var newListBoxLegacyHeight, heightMultiplier;
                if (this.settings.maxVisibleEntries <= 0) {
                    heightMultiplier = this.settings.dataProvider.length;
                }
                else {
                    heightMultiplier = (this.settings.dataProvider.length < this.settings.maxVisibleEntries) ? this.settings.dataProvider.length : this.settings.maxVisibleEntries;
                }
                newListBoxLegacyHeight = this.settings.itemHeight * heightMultiplier;

                if (oldDataLength < this.settings.dataProvider.length) {
                    brease.callWidget(this.listId, '_setHeight', newListBoxLegacyHeight);
                    brease.callWidget(this.listId, 'setDataProvider', data);

                } else {
                    _updateSelectedValueOrResetIndex(this, omitPrompt);
                    brease.callWidget(this.listId, '_setHeight', newListBoxLegacyHeight);
                    brease.callWidget(this.listId, 'setDataProvider', data);
                }
            }

            if (this.settings.selectedValue) {
                _updateSelectedValueOrResetIndex(this, omitPrompt);
            }
            if (this.settings.selectedIndex !== undefined) {
                this.setSelectedIndex(this.settings.selectedIndex);
            }

            this._updateButtonText();
        }
    };

    /**
	* @method getDataProvider
	*/
    p.getDataProvider = function () {
        return this.settings.dataProvider;
    };

    /**
	* @method setImageAlign
	* Sets imageAlign
	* @param {brease.enum.ImageAlign} imageAlign
	*/
    p.setImageAlign = function (imageAlign) {
        this.settings.imageAlign = imageAlign;
        if (brease.config.editMode) {
            brease.callWidget(this.buttonId, 'setImageAlign', imageAlign);
        }


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
        this.imagePathChange();
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
    * @method setMaxVisibleEntries
    * Sets maxVisibleEntries
    * @param {Integer} maxVisibleEntries
    */
    p.setMaxVisibleEntries = function (maxVisibleEntries) {
        this.settings.maxVisibleEntries = maxVisibleEntries;
    };

    /**
	* @method getMaxVisibleEntries 
	* Returns maxVisibleEntries.
	* @return {Integer}
	*/
    p.getMaxVisibleEntries = function () {
        return this.settings.maxVisibleEntries;
    };

    /**
    * @method setListPosition
    * Sets listPosition
    * @param {brease.enum.Position} listPosition
    */
    p.setListPosition = function (listPosition) {
        this.settings.listPosition = listPosition;

    };

    /**
	* @method getListPosition 
	* Returns listPosition.
	* @return {brease.enum.Position}
	*/
    p.getListPosition = function () {

        return this.settings.listPosition;

    };

    /**
    * @method setListWidth
    * Sets listWidth
    * @param {Integer} listWidth
    */
    p.setListWidth = function (listWidth) {
        this.settings.listWidth = listWidth;

    };

    /**
	* @method getListWidth 
	* Returns listWidth.
	* @return {Integer}
	*/
    p.getListWidth = function () {

        return this.settings.listWidth;

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
        // giving the originally set itemheight to the listbox, since it will do -1 on its own
        brease.callWidget(this.listId, 'setItemHeight', itemHeight);

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
    * @method setEllipsis
    * Sets ellipsis
    * @param {Boolean} ellipsis
    */
    p.setEllipsis = function (ellipsis) {
        var setValue;

        this.settings.ellipsis = ellipsis;

        if (this.settings.ellipsis === true) {
            setValue = true;
        } else {
            setValue = false;
        }

        brease.callWidget(this.listId, 'setEllipsis', setValue);
        brease.callWidget(this.buttonId, 'setEllipsis', setValue);
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
    * @method setFitHeight2Items
    * Sets fitHeight2Items
    * @param {Boolean} fitHeight2Items
    */
    p.setFitHeight2Items = function (fitHeight2Items) {
        var setValue;
        this.settings.fitHeight2Items = fitHeight2Items;

        if (this.settings.fitHeight2Items) {
            setValue = true;
        } else {
            setValue = false;
        }

        brease.callWidget(this.listId, 'setFitHeight2Items', setValue);
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
    * @method setWordWrap
    * Sets wordWrap
    * @param {Boolean} wordWrap
    */
    p.setWordWrap = function (wordWrap) {
        this.settings.wordWrap = wordWrap;

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
    * @method setMultiLine
    * Sets multiLine    
    * @param {Boolean} multiLine
    */
    p.setMultiLine = function (multiLine) {
        this.settings.multiLine = multiLine;

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
    * @method setCropToParent
    * Sets cropToParent
    * @param {brease.enum.CropToParent} cropToParent
    */
    p.setCropToParent = function (cropToParent) {
        this.settings.cropToParent = cropToParent;
    };

    /**
	* @method getCropToParent 
	* Returns cropToParent
	* @return {brease.enum.CropToParent}
	*/
    p.getCropToParent = function () {
        return this.settings.cropToParent;
    };

    p._updateButtonText = function () {
        var widget = this;
        if (this.buttonId) {
            if (widget.settings.selectedIndex !== undefined && widget.settings.dataProvider !== undefined) {
                var selectedItem = widget.settings.dataProvider[widget.settings.selectedIndex];
                if (selectedItem !== undefined) {
                    if (brease.language.isKey(selectedItem.text)) {
                        brease.callWidget(widget.buttonId, 'setTextKey', brease.language.parseKey(selectedItem.text));
                    } else {
                        brease.callWidget(widget.buttonId, 'setText', selectedItem.text);
                    }
                } else {
                    brease.callWidget(widget.buttonId, 'setText', '');
                }
            }
        }
    };

    p._setPrompt = function () {
        var widget = this;
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + ']._setPrompt:', widget.settings);
        if (this.button) {
            if (widget.settings.selectedIndex !== undefined && widget.settings.selectedIndex !== -1 && widget.settings.dataProvider !== undefined) {
                var selectedItem = widget.settings.dataProvider[widget.settings.selectedIndex];
                if (selectedItem !== undefined) {
                    if (widget.settings.promptText === undefined && widget.settings.promptType !== Enum.PromptType.image) {
                        if (brease.language.isKey(selectedItem.text)) {
                            brease.callWidget(widget.buttonId, 'setTextKey', brease.language.parseKey(selectedItem.text));
                        } else {
                            brease.callWidget(widget.buttonId, 'setText', selectedItem.text);
                        }
                    }
                }
            } else {
                if (widget.settings.noSelectionPolicy === Enum.NoSelectionPolicy.showPrompt) {
                    if (widget.settings.promptText === undefined) {
                        if (widget.settings.prompt !== undefined && widget.settings.prompt !== '') {
                            if (brease.language.isKey(widget.settings.prompt)) {
                                brease.callWidget(widget.buttonId, 'setText', brease.language.getTextByKey(brease.language.parseKey(widget.settings.prompt)));
                            } else {
                                brease.callWidget(widget.buttonId, 'setText', widget.settings.prompt);
                            }
                        } else {
                            brease.callWidget(widget.buttonId, 'setText', '');
                        }
                    }
                }
            }
        }
    };

    p._outsideClickHandler = function (e) {
        var widget = this;
        //console.log(widget.listWrapper, e.target);
        //console.log('[' + this.elem.id + ']_outsideClickHandler:', $.contains(widget.elem, e.target) , $.contains(widget.listWrapper[0], e.target));
        if (!$.contains(widget.elem, e.target) && !$.contains(widget.listWrapper[0], e.target) && !widget.isScrolling) {
            widget._handleEvent(e);
            brease.bodyEl.off(BreaseEvent.MOUSE_UP, widget._bind('_outsideClickHandler'));
            brease.callWidget(widget.buttonId, 'toggle');
        }

        widget.isScrolling = false;
    };

    p._onScrollStart = function (e) {
        //console.log('DropDownBoxLegacy._onScrollStart');
        this.isScrolling = true;

    };

    p._onScrollEnd = function (e) {
        //console.log('DropDownBoxLegacy._onScrollStart');
        this.isScrolling = false;

    };

    p._onButtonChange = function (e) {
        //console.log('DropDownBoxLegacy._onButtonChange', this.settings.dataProvider.length);
        var widget = this;
        if (this.settings.dataProvider && this.settings.dataProvider.length > 0) {
            if (this.settings.cancelButtonChangeEvents === true) {
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
            if (e.detail.checked === true) {
                if (this.settings.dataProvider && this.settings.dataProvider.length > 0) {
                    _checkPosition(this);
                    this._positionWrapper(this);
                }
                brease.bodyEl.on(BreaseEvent.MOUSE_UP, widget._bind('_outsideClickHandler'));
            } else {
                this._closeList();
            }
        }
    };

    p._closeList = function () {
        brease.bodyEl.off(BreaseEvent.MOUSE_UP, this._bind('_outsideClickHandler'));
        if (this.position) {
            this.el.append(this.listWrapper.css({ top: this.position.top, right: this.position.right, bottom: this.position.bottom, left: this.position.left, transform: 'initial', 'transform-origin': 'init' }).hide());
        }
    };

    p._onListChange = function (e) {
        if (e.detail !== undefined && e.detail !== null) {
            this.setSelectedIndex(e.detail.selectedIndex);
            if (e.detail.toggle !== false) {
                brease.callWidget(this.buttonId, 'toggle');
            }
        }
        else {
            brease.callWidget(this.buttonId, 'toggle');
        }
    };


    p.submitChange = function () {
        /**
		* @event change
		* Fired when selected index has changed    
		* @param {Integer} selectedIndex
		* @param {Number/String} selectedValue 
		* See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
		* @eventComment
		*/
        this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, {
            detail: {
                selectedIndex: this.settings.selectedIndex,
                selectedValue: this.settings.selectedValue,
                selectedItem: this.settings.dataProvider[this.settings.selectedIndex]
            }
        }));

        var that = this,
        data = {
            selectedIndex: this.settings.selectedIndex,
            selectedValue: this.settings.selectedValue
        };
        setTimeout(function () {
            if (!that || !that.el) { return; }
            that.sendValueChange(data);
        }, 0);

        /**
        * @event SelectedIndexChanged
        * @param {Integer} selectedIndex
        * @param {String} selectedValue 
        * @iatStudioExposed
        * Fired when index changes.
        */
        var ev = this.createEvent('SelectedIndexChanged', {
            selectedIndex: this.settings.selectedIndex,
            selectedValue: this.settings.selectedValue
        });
        ev.dispatch();
    };

    p.suspend = function () {
        if ($('#' + this.listId).is(':visible')) {
            this._closeList();
        }
        brease.bodyEl.off(BreaseEvent.MOUSE_UP, this._bind('_outsideClickHandler'));
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.wake = function () {
        if ($('#' + this.listId).is(':visible') === false && brease.callWidget(this.buttonId, 'getValue') === true) {
            brease.callWidget(this.buttonId, 'toggle');
        }
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.dispose = function () {
        if (this.button) {
            this.button[0].removeEventListener(BreaseEvent.CHANGE, this._bind('_onButtonChange'));
        }
        if (this.list) {
            this.list[0].removeEventListener(BreaseEvent.CHANGE, this._bind('_onListChange'));
            this.list[0].removeEventListener(BreaseEvent.SCROLL_START, this._bind('_onScrollStart'));
            this.list[0].removeEventListener(BreaseEvent.SCROLL_END, this._bind('_onScrollEnd'));
        }
        brease.bodyEl.off(BreaseEvent.MOUSE_UP, this._bind('_outsideClickHandler'));

        if ($('#' + this.listId).is(':visible')) {
            this._closeList();
        }

        this.button = null;
        this.list = null;

        SuperClass.prototype.dispose.apply(this, arguments);
    };

    p._positionWrapper = function (widget) {
        var offset, wrapperCss, scaleFactor;

        widget.position = {
            top: widget.listWrapper.css('top'),
            right: widget.listWrapper.css('right'),
            bottom: widget.listWrapper.css('bottom'),
            left: widget.listWrapper.css('left')
        };
        widget.listWrapper.show();

        widget.listWrapper.css({ 'visibility': 'visible' });
        offset = widget.listWrapper.offset(); // offset liefert nur fuer visible elements richtige werte, darum vorher 'show'

        this.scaleFactor = Utils.getScaleFactor(this.elem);
        wrapperCss = _calcOffset(widget);
        widget.listWrapper.css({ 'transform': 'scale(' + this.scaleFactor + ',' + this.scaleFactor + ')', 'transform-origin': '0px 0px 0px' });

        brease.bodyEl.append(this.listWrapper.css(wrapperCss));
        brease.callWidget(this.listId, '_refreshScroller');
    };

    p.imagePathChange = function () {
        brease.callWidget(this.listId, 'imagePathChange', this.settings.imagePath);
    };

    /**
	* @method close
    * @iatStudioExposed
	* Closes the list
	*/
    p.close = function () {
        var list = this.el.find('#' + this.listId);

        if (list.length < 1) {
            brease.callWidget(this.buttonId, 'toggle');
        }
    };

    /**
	* @method open
    * @iatStudioExposed
	* Opens the list
	*/
    p.open = function () {
        var list = this.el.find('#' + this.listId);

        if (list.length > 0) {
            brease.callWidget(this.buttonId, 'toggle');
        }
    };

    //private

    function _calcOffset(widget) {
        var offset = widget.listWrapper.offset(),
		object = {
		    position: 'absolute',
		    bottom: 'auto',
		    right: 'auto',
		    'z-index': popupManager.getHighestZindex() + 1
		},
		listWidth = widget.listWrapper.width() * widget.scaleFactor,
		listHeight = widget.listWrapper.height() * widget.scaleFactor,
		windowWidth = $(document).innerWidth(),
		windowHeight = $(document).innerHeight(),
		widgetOffset = widget.el.offset(),
		widgetWidth = widget.el.width() * widget.scaleFactor,
		widgetHeight = widget.el.height() * widget.scaleFactor,
        listBox = $('#' + widget.listId),
        listBoxHeight = listBox.height() * widget.scaleFactor,
        listBoxBorderWidth = parseInt(listBox.css('borderWidth')),
        contentHeight = $('#' + widget.elem.id).parent().innerHeight(),
        contentOffset = $('#' + widget.elem.id).parent().offset(),
        appContainerHeight = brease.bodyEl.find('#appContainer').height(),
        //appContainOffset = $('#' + widget.elem.id).offset();

        widgetPos = $('#' + widget.elem.id).offset();

        var flagCropToScreenHeight = false;
        var flagCropToParentHeight = false;


        // bug fix screen height
        if (widget.settings.fitHeight2Items && widget.settings.cropToParent !== 'height') {
            if ((widgetPos.top + (widget.settings.dataProvider.length * widget.settings.itemHeight) + (listBoxBorderWidth * 2)) > (windowHeight)) { // <-- changed "appContainerHeight" to "windowHeight" for A&P 559565
                widget.setFitHeight2Items(false);
                // commented out for A&P 559565
                //contentOffset.top = 0;
                //contentHeight = appContainerHeight;
                flagCropToScreenHeight = true;
            }
        }
        if (widget.settings.cropToParent === 'height') {
            widget.setFitHeight2Items(false);
            flagCropToParentHeight = true;
        }

        if (widget.settings.listPosition === 'right') {
            if (offset.top + listHeight > windowHeight) {
                object.top = widgetOffset.top - listHeight + widgetHeight;
                //widget.listWrapper.addClass("bottom0");
                widget.arrow.css({ bottom: widgetHeight / 2 - (16 * widget.scaleFactor) / 2 + 'px', top: 'auto' });
            }

            else {
                object.top = widgetOffset.top;
                //widget.listWrapper.removeClass("bottom0");
                widget.arrow.css('top', widgetHeight / 2 - (16 * widget.scaleFactor) / 2 + 'px');
            }
            object.left = offset.left - 8;
            // reduce ListBoxLegacy height to content bottom end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                if ((object.top + listBoxHeight + (listBoxBorderWidth * 2)) >= (contentHeight + contentOffset.top)) {
                    listBox.css('height', (contentHeight + contentOffset.top - object.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }

            }
        }

        else if (widget.settings.listPosition === 'left') {
            if (offset.top + listHeight > windowHeight) {
                object.top = widgetOffset.top - listHeight + widgetHeight;
                //widget.listWrapper.addClass("bottom0");
                widget.arrow.css({ bottom: widgetHeight / 2 - (16 * widget.scaleFactor) / 2 + 'px', top: 'auto' });
            }

            else {
                object.top = widgetOffset.top;
                widget.arrow.css('top', widgetHeight / 2 - (16 * widget.scaleFactor) / 2 + 'px');
                //widget.listWrapper.removeClass("bottom0");
            }
            object.left = offset.left;
            listBox.css('right', listBoxBorderWidth * 2 + 'px');
            // reduce ListBoxLegacy height to content bottom end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                if ((object.top + listBoxHeight + (listBoxBorderWidth * 2)) >= (contentHeight + contentOffset.top)) {
                    listBox.css('height', (contentHeight + contentOffset.top - object.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }
            }
        }

        else if (widget.settings.listPosition === 'bottom') {

            if (offset.left < 0 || (listWidth - widgetWidth) / 2 > offset.left) {
                object.left = widgetOffset.left;
                widget.arrow.css('left', widgetWidth / 2 + 'px');
            }

            else if (offset.left + listWidth > windowWidth) {
                object.left = widgetOffset.left + widgetWidth - listWidth;
                widget.arrow.css({ right: widgetWidth / 2 - (8 * widget.scaleFactor) + 'px', left: 'auto' });
            }

            else {
                object.left = offset.left - (listWidth - widgetWidth) / 2;
            }
            object.top = offset.top - 8;
            // reduce ListBoxLegacy height to content bottom end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                if ((offset.top + listBoxHeight + (listBoxBorderWidth * 2)) >= (contentHeight + contentOffset.top)) {
                    listBox.css('height', (contentHeight + contentOffset.top - offset.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }
            }
        }

        else if (widget.settings.listPosition === 'top') {
            if (offset.left < 0 || (listWidth - widgetWidth) / 2 > offset.left) {
                object.left = widgetOffset.left;
                widget.arrow.css('left', widgetWidth / 2 + 'px');
            }

            else if (offset.left + listWidth > windowWidth) {
                object.left = widgetOffset.left + widgetWidth - listWidth;
                widget.arrow.css({ right: widgetWidth / 2 - (8 * widget.scaleFactor) + 'px', left: 'auto' });
            }

            else {
                object.left = offset.left - (listWidth - widgetWidth) / 2;
            }

            object.top = offset.top;
            // reduce ListBoxLegacy height to content top end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                var buttonTop = $('#' + widget.elem.id).offset().top;
                if ((buttonTop - 8 - listBoxHeight - (listBoxBorderWidth * 2)) <= (contentOffset.top)) {
                    listBox.css('height', (buttonTop - 8 - contentOffset.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }
            }
        }

            // center
        else if (widget.settings.listPosition === 'center') {
            if (offset.left < 0 || (listWidth - widgetWidth) / 2 > offset.left) {
                object.left = widgetOffset.left;
                //widget.arrow.css('left', widgetWidth / 2 + 'px');
            }

            else if (offset.left + listWidth > windowWidth) {
                object.left = widgetOffset.left + widgetWidth - listWidth;
                // widget.arrow.css({ right: widgetWidth / 2 - (8 * widget.scaleFactor) + 'px', left: 'auto' });
            }

            else {
                object.left = offset.left - (listWidth - widgetWidth) / 2;
            }

            object.top = offset.top - widgetHeight;
            // reduce ListBoxLegacy height to content bottom end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                if ((object.top + listBoxHeight + (listBoxBorderWidth * 2)) >= (contentHeight + contentOffset.top)) {
                    listBox.css('height', (contentHeight + contentOffset.top - object.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }
            }
        }

            // middle
        else if (widget.settings.listPosition === 'middle') {
            if (offset.left < 0 || (listWidth - widgetWidth) / 2 > offset.left) {
                object.left = widgetOffset.left;
                //widget.arrow.css('left', widgetWidth / 2 + 'px');
            }

            else if (offset.left + listWidth > windowWidth) {
                object.left = widgetOffset.left + widgetWidth - listWidth;
                // widget.arrow.css({ right: widgetWidth / 2 - (8 * widget.scaleFactor) + 'px', left: 'auto' });
            }

            else {
                object.left = offset.left - (listWidth - widgetWidth) / 2;
            }

            object.top = offset.top - widgetHeight / 2 - listBoxHeight / 2;
            // reduce ListBoxLegacy height to content bottom end
            if (flagCropToParentHeight || flagCropToScreenHeight) {
                if ((object.top + listBoxHeight + (listBoxBorderWidth * 2)) >= (contentHeight + contentOffset.top)) {
                    listBox.css('height', (contentHeight + contentOffset.top - object.top - (listBoxBorderWidth * 2)));
                } else {
                    listBox.css('height', listBoxHeight);
                }
            }
        }

        return object;
    }

    function _setListPosition(widget) {
        var position = widget.settings.listPosition;
        switch (position) {

            case Enum.Position.top:

                widget.listWrapper.addClass('list-top');
                break;

            case Enum.Position.right:

                widget.listWrapper.addClass('list-right');
                break;

            case Enum.Position.bottom:

                widget.listWrapper.addClass('list-bottom');
                break;

            case Enum.Position.left:

                widget.listWrapper.addClass('list-left');
                break;

            case Enum.Position.center:

                widget.listWrapper.addClass('list-center');
                break;

            case Enum.Position.middle:

                widget.listWrapper.addClass('list-middle');
                break;
        }

    }

    function _checkPosition(widget) {
        var position = widget.settings.listPosition,
			listWidth = widget.listWrapper.width(),
			listHeight = widget.listWrapper.height(),
			windowWidth = $(document).innerWidth(),
			windowHeight = $(document).innerHeight();


        widget.listWrapper.css('visibility', 'hidden');
        widget.listWrapper.show();
        var offset = widget.listWrapper.offset();


        switch (position) {

            case Enum.Position.right:
                if ((widget.listWrapper.offset().left + listWidth) > windowWidth) {
                    widget.settings.listPosition = Enum.Position.left;
                    widget.listWrapper.removeClass('list-right');
                    widget.listWrapper.addClass('list-left');
                }
                break;

            case Enum.Position.left:
                if ((widget.listWrapper.offset().left - listWidth) < 0) {
                    widget.settings.listPosition = Enum.Position.right;
                    widget.listWrapper.removeClass('list-left');
                    widget.listWrapper.addClass('list-right');
                }
                break;

            case Enum.Position.top:
                if ((widget.listWrapper.offset().top - listHeight) < 0) {
                    widget.settings.listPosition = Enum.Position.bottom;
                    widget.listWrapper.removeClass('list-top');
                    widget.listWrapper.addClass('list-bottom');
                }
                break;

            case Enum.Position.bottom:
                if ((widget.listWrapper.offset().top + listHeight) > windowHeight) {
                    widget.settings.listPosition = Enum.Position.top;
                    widget.listWrapper.removeClass('list-bottom');
                    widget.listWrapper.addClass('list-top');
                }
                break;

            case Enum.Position.middle:
                if ((widget.listWrapper.offset().top - listHeight / 2) < 0) {
                    widget.settings.listPosition = Enum.Position.center;
                    widget.listWrapper.removeClass('list-middle');
                    widget.listWrapper.addClass('list-center');
                }
                break;

            case Enum.Position.center:
                if ((widget.listWrapper.offset().top + listHeight) > windowHeight) {
                    widget.settings.listPosition = Enum.Position.top;
                    widget.listWrapper.removeClass('list-center');
                    widget.listWrapper.addClass('list-top');
                }
                break;
        }

    }

    function _addChildWidgets(widget) {
        widget.elem.addEventListener(BreaseEvent.WIDGET_READY, widget._onWidgetsReady);
        var settings = $.extend(true, {}, widget.settings);
        var heightMultiplier;

        if (settings.fitItems2Height) {
            heightMultiplier = settings.dataProvider.length;
        }
        else {
            //heightMultiplier = settings.maxVisibleEntries;
            heightMultiplier = (settings.dataProvider.length < settings.maxVisibleEntries) ? settings.dataProvider.length : settings.maxVisibleEntries;
        }

        settings.top = 0;
        settings.left = 0;
        brease.uiController.createWidgets(widget.elem, [
			{
			    className: 'ToggleButton',
			    id: widget.buttonId,
			    options: settings,
			    HTMLAttributes: {
			        style: 'width:100%; height:100%;'
			    }
			},
			{
			    className: 'ListBoxLegacy',
			    id: widget.listId,
			    options: {
			        imageAlign: settings.imageAlign,
			        textAlign: settings.textAlign,
			        ellipsis: settings.ellipsis,
			        deferedSelection: settings.deferedSelection,
			        enable: settings.enable,
			        forcedEnabled: settings.forcedEnabled,
			        forcedDisabled: settings.forcedDisabled,
			        dataProvider: settings.dataProvider,
			        itemHeight: settings.itemHeight,
			        wordWrap: settings.wordWrap,
			        multiLine: settings.multiLine,
			        fitHeight2Items: settings.fitHeight2Items,
			        height: settings.itemHeight * heightMultiplier,
			        displaySettings: settings.displaySettings
			        //width: settings.listWidth || settings.width
			    },
			    HTMLAttributes: {
			        style: 'display:none; width:' + ((settings.listWidth !== undefined) ? settings.listWidth : settings.width) + 'px;'
			    }
			}
        ], true, widget.settings.parentContentId);
    }


    function _onWidgetsReady(e) {
        if (e.target.id === this.buttonId) {
            this.button = $(e.target);
        }
        if (e.target.id === this.listId) {
            this.list = $(e.target);
        }

        if (this.button && this.list) {
            this.elem.removeEventListener(BreaseEvent.WIDGET_READY, this._onWidgetsReady);
            this.listWrapper.append(this.list.show());

            if (this.settings.selectedIndex !== undefined) {
                brease.callWidget(this.listId, 'setDataProvider', this.settings.dataProvider);
                brease.callWidget(this.listId, 'setSelectedIndex', this.settings.selectedIndex);
                brease.callWidget(this.elem.id, 'setDataProvider', this.settings.dataProvider);
            } else {
                if (this.settings.noSelectionPolicy === Enum.NoSelectionPolicy.selectFirst) {
                    this.settings.selectedIndex = 0;
                    brease.callWidget(this.listId, 'setSelectedIndex', this.settings.selectedIndex);
                }
            }

            if (this.settings.promptImage !== undefined) {
                brease.callWidget(this.buttonId, 'setImage', this.settings.promptImage);
            }
            if (this.settings.promptText !== undefined) {
                if (brease.language.isKey(this.settings.promptText)) {
                    brease.callWidget(this.buttonId, 'setTextKey', brease.language.parseKey(this.settings.promptText));
                } else if (this.settings.promptText) {
                    brease.callWidget(this.buttonId, 'setText', this.settings.promptText);
                }
            }
            this._setPrompt();
            this.button[0].addEventListener(BreaseEvent.CHANGE, this._bind('_onButtonChange'));
            this.list[0].addEventListener(BreaseEvent.CHANGE, this._bind('_onListChange'));
            this.list[0].addEventListener(BreaseEvent.SCROLL_START, this._bind('_onScrollStart'));
            this.list[0].addEventListener(BreaseEvent.SCROLL_END, this._bind('_onScrollEnd'));

            this.el.append(this.listWrapper);

            this.imagePathChange();

            this._dispatchReady();
        }
    }

    function _alignSelectedIndexWithValue(widget, value, omitPrompt) {
        if (!widget.settings.dataProvider) { return; }

        if (widget.settings.dataProvider.length > 0) {
            for (var i = 0; i < widget.settings.dataProvider.length; i += 1) {
                if (widget.settings.dataProvider[i].value === value) {
                    widget.settings.selectedIndex = i;
                    break;
                }
            }
            if (widget.list !== undefined) {
                brease.callWidget(widget.listId, 'setSelectedIndex', widget.settings.selectedIndex);
            }
            if (omitPrompt !== true) {
                widget._setPrompt();
            }

            if (widget.oldSelectedIndex !== widget.settings.selectedIndex) {
                widget.submitChange();
            }
        }
    }


    function _alignSelectedValueWithIndex(widget, index, omitPrompt) {
        if (!widget.settings.dataProvider) { return; }
        if (widget.settings.dataProvider.length > 0) {
            for (var j = 0; j < widget.settings.dataProvider.length; j += 1) {
                if (j === index) {
                    widget.settings.selectedValue = widget.settings.dataProvider[j].value;
                    break;
                }
            }
            if (widget.list !== undefined) {
                brease.callWidget(widget.listId, 'setSelectedIndex', widget.settings.selectedIndex);
            }
            if (omitPrompt !== true) {
                widget._setPrompt();
            }

            if (widget.oldSelectedIndex !== widget.settings.selectedIndex) {
                widget.submitChange();
            }
        }
    }

    function _updateSelectedValueOrResetIndex(widget, omitPrompt) {
        if (widget.settings.dataProvider.length <= 0) { return; }
        var hasValueFlag;
        for (var i = 0 ; i < widget.settings.dataProvider.length; i += 1) {
            if (widget.settings.dataProvider[i].value === widget.settings.selectedValue) {
                _alignSelectedIndexWithValue(widget, widget.settings.selectedValue, omitPrompt);
                hasValueFlag = true;
                break;
            } else {
                hasValueFlag = false;
            }
        }
        if (!hasValueFlag) {
            widget.settings.selectedIndex = 0;
            _alignSelectedValueWithIndex(widget, widget.settings.selectedIndex, omitPrompt);
        }
    }

    function _getSelectedIndexFromValue(widget) {
        if (widget.settings.dataProvider) {
            for (var i = 0 ; i < widget.settings.dataProvider.length; i += 1) {
                if (widget.settings.dataProvider[i].value === widget.settings.selectedValue) {
                    return i;
                }
            }
        }
        return -1;
    }

    return WidgetClass;

});