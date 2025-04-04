/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('widgets/brease/Button/Button'),

    /**
    * @class widgets.brease.PushButton
    * @extends widgets.brease.Button
    * #Description
    * A button, which can be bound to a PV.  
    * A click on the Button, will send the value=1 to the bound PV.
    
    * @iatMeta category:Category
    * Buttons
    * @iatMeta description:short
    * Setzen eines Wertes auf 1
    * @iatMeta description:de
    * Setzt einen Wert auf 1 wenn der Benutzer darauf klickt
    * @iatMeta description:en
    * Sets a value to 1 when the user clicks it
    */

    /**
    * @htmltag examples
    * ##Configuration examples:
    *
    *		<div id="widgetId" data-brease-widget="widgets/brease/PushButton"></div>;
    */

    /**
    * @cfg {Integer} value=0 
    * Property is for binding purposes only and can not be used in page definition.
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * @not_projectable
    * @editableBinding
    */
    defaultSettings = {},

    WidgetClass = SuperClass.extend(function PushButton() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    WidgetClass.sendValue = 1;

    p.init = function () {
        if (this.settings.omitClass !== true) {
            this.addInitialClass('breasePushButton');
        }
        SuperClass.prototype.init.call(this);
    };

    p.setEditable = function (editable, metaData) {
        //console.log('%c' + this.constructor.name + '[' + this.elem.id + '].setEditable:' + JSON.stringify(metaData), 'color:#cc00cc;');
        if (metaData !== undefined && metaData.refAttribute !== undefined) {
            var refAttribute = metaData.refAttribute;
            if (refAttribute === 'value') {
                this.settings.editable = editable;
                this._internalEnable();
            }
        }
    };

    p._clickHandler = function (e) {
        if (this.isDisabled) { return; }
        SuperClass.prototype._clickHandler.call(this, e);
        this.sendValueChange({ value: WidgetClass.sendValue });
    };

    return WidgetClass;

});