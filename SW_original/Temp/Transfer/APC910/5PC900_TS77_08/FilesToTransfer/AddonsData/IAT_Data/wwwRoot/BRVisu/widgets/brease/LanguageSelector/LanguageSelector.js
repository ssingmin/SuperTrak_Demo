/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('widgets/brease/DropDownBoxLegacy/DropDownBoxLegacy'),
        Enum = require('brease/enum/Enum'),
        languageDependency = require('brease/decorators/LanguageDependency'),
		BreaseEvent = require('brease/events/BreaseEvent'),

    /**
    * @class widgets.brease.LanguageSelector
    * #Description
    * DropDownBoxLegacy, which opens a List of all languages  
    *  
	* @breaseNote 
    * @extends widgets.brease.DropDownBoxLegacy
	*
	* @iatMeta category:Category
    * System,Selector,Buttons
    * @iatMeta description:short
    * Auswahl der Sprache
    * @iatMeta description:de
    * Widget zur Auswahl der Sprache
    * @iatMeta description:en
    * Widget for language selection
    */

    /**
    * @htmltag examples
    * Configuration example:  
    * Example for display of icons only:
    *
    *      <div id="langSelect" data-brease-widget="widgets/brease/LanguageSelector" data-brease-options="{'promptType': 'icon'}"></div>
    *
    */

    /**
    * @cfg {DirectoryPath} imagePath='widgets/brease/LanguageSelector/assets/img/'
    * path to language icons 
    * @iatCategory Appearance
    * ImagePath has following format: this.settings.imagePath + key + ".png"
    * <br>When svg - graphics are used, be sure that in your *.svg-file height and width attributes are specified on the &lt;svg&gt; element.
    * For more detailed information see https://www.w3.org/TR/SVG/struct.html (chapter 5.1.2)
    * @iatStudioExposed
    */

	/**
	* @cfg {brease.enum.ImagePosition} imageAlign='right'
	* @iatStudioExposed
    * @iatCategory Appearance
	* @inheritdoc
	*/

	/**
	* @cfg {String} promptType='text'
	* @inheritdoc
	*/

	 /**
    * @cfg {ItemCollection} dataProvider (required)
    * @hide
	*/

    /**
	* @cfg {brease.enum.DropDownDisplaySettings} displaySettings='default'
	* @iatStudioExposed
    * @iatCategory Appearance
    * Defines which elements are displayed on the widget
	*/

    defaultSettings = {
        imagePath: 'widgets/brease/LanguageSelector/assets/img/',
        imageAlign: 'right',
        promptType: 'text',
        listWidth: 150,
        displaySettings: 'default'
    },

    WidgetClass = SuperClass.extend(function LanguageSelector() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseLanguageSelector');
        }
        this.languages = brease.language.getLanguages().languages;

        this.setImagePath(this.settings.imagePath);

        SuperClass.prototype.init.call(this);
    };

    /**
    * @method setDataProvider
	* method to set the dataProvider
	* @param {ItemCollection} dataProvider ItemCollection (=Array) of objects of type brease.objects.ListEntry
	* @param {Boolean} omitPrompt
	*/
    p.setDataProvider = function (dp, omitPrompt) {
        SuperClass.prototype.setDataProvider.call(this, dp, omitPrompt);
        this._setPrompt();
    };

    /**
	* @method setImagePath
	* @iatStudioExposed
	* Sets imagePath
	* @param {String} imagePath
	*/
    p.setImagePath = function (imagePath) {
        this.settings.imagePath = imagePath;
        // Make sure that imagePath will end with slash
        if (!/\/$/.test(this.settings.imagePath) && this.settings.imagePath !== "") {
            this.settings.imagePath = this.settings.imagePath + "/";
        }
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

    p.langChangeHandler = function () {
        var actLang = brease.language.getCurrentLanguage();
        if (this.getSelectedValue() !== actLang) {
            this.setSelectedValue(actLang);
        }
    };

    p._onListChange = function (e, value) {
        if (e.detail !== null) {
            if (e.detail !== undefined) {
                SuperClass.prototype._onListChange.call(this, e);
                brease.language.switchLanguage(e.detail.value);
            }
            else {
                brease.language.switchLanguage(value);
            }
        } else {
            brease.callWidget(this.buttonId, 'toggle');
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
        SuperClass.prototype.setSelectedIndex.call(this, index, omitPrompt);

        var e = {};
        if (index <= (this.settings.dataProvider.length - 1) && index >= 0) {
            this._onListChange(e, this.settings.dataProvider[index].value);
        }
    };


    /**
	* @method setSelectedValue
    * @iatStudioExposed
	* Sets the selected entry based on a value
	* @param {String} value
	* @param {Boolean} omitPrompt
	*/
    p.setSelectedValue = function (value, omitPrompt) {
        SuperClass.prototype.setSelectedValue.call(this, value, omitPrompt);

        var e = {};
        this._onListChange(e, value);
    };

    //private 

    p.imagePathChange = function () {
        var provider = [],
        count = -1,
        selectedIndex = -1;

        this.currentLanguage = brease.language.getCurrentLanguage();

        for (var key in this.languages) {
            provider.push({ value: key, text: this.languages[key].description, image: this.settings.imagePath + key + ".png", index: (this.languages[key].index !== undefined) ? this.languages[key].index : 0 });
            count += 1;

            if (this.currentLanguage === key) {
                selectedIndex = count;
                this.settings.selectedValue = key;
            }
        }
        provider.sort(function (a, b) { return a.index - b.index; });
        this.settings.selectedIndex = selectedIndex;
        this.settings.dataProvider = provider;
        this.setDataProvider(provider);
    };

    /**
    * @method setDisplaySettings
    * Sets displaySettings
    * @param {brease.enum.DropDownDisplaySettings} displaySettings
    */
    p.setDisplaySettings = function (displaySettings) {
        this.settings.displaySettings = displaySettings;
        this._setPrompt();
    };

    /**
	* @method getDisplaySettings 
	* Returns displaySettings
	* @return {brease.enum.DropDownDisplaySettings}
	*/
    p.getDisplaySettings = function () {
        return this.settings.displaySettings;
    };



    p._setPrompt = function () {
        var widget = this;
        //console.debug(WidgetClass.name + '[id=' + this.elem.id + ']._setPrompt:', widget.settings);
        if (this.button) {
            if (widget.settings.selectedIndex !== undefined && widget.settings.selectedIndex !== -1 && widget.settings.dataProvider !== undefined) {
                var selectedItem = widget.settings.dataProvider[widget.settings.selectedIndex];
                if (selectedItem !== undefined) {
                    if (widget.settings.displaySettings === Enum.DropDownDisplaySettings.default || widget.settings.displaySettings === Enum.DropDownDisplaySettings.text || widget.settings.displaySettings === Enum.DropDownDisplaySettings.imageAndText) {
                        brease.callWidget(widget.buttonId, 'setImage', "");
                        if (brease.language.isKey(selectedItem.text)) {
                            brease.callWidget(widget.buttonId, 'setTextKey', brease.language.parseKey(selectedItem.text));
                        } else {
                            brease.callWidget(widget.buttonId, 'setText', selectedItem.text);
                        }
                    }

                    if (widget.settings.displaySettings === Enum.DropDownDisplaySettings.imageAndText && widget.getImagePath()) {
                        brease.callWidget(widget.buttonId, 'setImage', widget.getImagePath() + selectedItem.value + ".png");
                    }
                    if (widget.settings.displaySettings === Enum.DropDownDisplaySettings.image && widget.getImagePath()) {
                        brease.callWidget(widget.buttonId, 'setText', "");
                        brease.callWidget(widget.buttonId, 'setImage', widget.getImagePath() + selectedItem.value + ".png");
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

    return languageDependency.decorate(WidgetClass, true);

});