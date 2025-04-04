/*global define,brease,console,CustomEvent,_*/
define(function (require) {

	'use strict';

	var SuperClass = require('widgets/brease/Button/Button'),
		BreaseEvent = require('brease/events/BreaseEvent'),

	/**
	* @class widgets.brease.MomentaryPushButton
	* @extends widgets.brease.Button
	* #Description
	* A button, which can be bound to a PV.  
	* A click on the Button, will send the value=1 to the bound PV, as long as the button is clicked
	
	* @iatMeta category:Category
	* Buttons
	* @iatMeta description:short
	* Setzen eines Wertes auf 1
	* @iatMeta description:de
	* Setzt einen Wert für die Dauer des Klicks auf 1
	* @iatMeta description:en
	* Sets a value to 1, as long as the button is clicked
	*/

	/**
	* @cfg {Integer} value=0  
	* Property is for binding purposes only and can not be used in page definition.
	* @iatStudioExposed
    * @iatCategory Data
	* @bindable
	* @not_projectable
	* @editableBinding
    * @readonly
	*/

	defaultSettings = {
        value: 0,
	},

	WidgetClass = SuperClass.extend(function MomentaryPushButton() {
		SuperClass.apply(this, arguments);
	}, defaultSettings),

	p = WidgetClass.prototype;

	WidgetClass.setValue = 1;
	WidgetClass.resetValue = 0;

	p.init = function () {
		if (this.settings.omitClass !== true) {
			this.addInitialClass('breaseMomentaryPushButton');
		}
		SuperClass.prototype.init.call(this);
	};

    /**
    * @method getValue
    * Returns the actual value of the button (1 pressed, 0 released)
    * @return {Integer}
    */
	p.getValue = function () {
	    return this.settings.value;
	};

	p.setEditable = function (editable, metaData) {
		if (metaData !== undefined && metaData.refAttribute !== undefined) {
			var refAttribute = metaData.refAttribute;
			if (refAttribute === 'value') {
				this.settings.editable = editable;
				this._internalEnable();
			}
		}
	};

	p._downHandler = function (e) {
	    if (this.isDisabled || brease.config.editMode || this.isActive) { return; }
	    this.settings.value = WidgetClass.setValue;
	    this.sendValueChange({ value: WidgetClass.setValue });
	    this.timer = window.setInterval(this._bind('_continuousSend'), 200);
	    SuperClass.prototype._downHandler.apply(this, arguments);
	};

	p._upHandler = function (e) {
	    SuperClass.prototype._upHandler.apply(this, arguments);
	    if (!this.isActive) {
	        window.clearInterval(this.timer);
	        this.settings.value = WidgetClass.resetValue;
	        this.sendValueChange({ value: WidgetClass.resetValue });
	    }
	};

	p._continuousSend = function () {
		this.sendValueChange({ value: WidgetClass.setValue });
	};

	p.dispose = function () {
	    _resetButton(this);
		SuperClass.prototype.dispose.apply(this, arguments);
	};

	p.suspend = function () {
	    _resetButton(this);
	    SuperClass.prototype.suspend.apply(this, arguments);
	};

	p.updateVisibility = function () {
	    SuperClass.prototype.updateVisibility.apply(this, arguments);
	    if (this.isHidden && this.isActive) {
	        _resetButton(this); 
	    }	    
	};

	p._enableHandler = function (enable) {
	    SuperClass.prototype._enableHandler.apply(this, arguments);
	    if (!enable && this.isActive) {
	        _resetButton(this);
	    }
	};

    //Private

	function _resetButton(widget) {
	    window.clearInterval(widget.timer);
	    widget.isActive = false;
	    widget.el.removeClass('active');
	    if (widget.settings.mouseDownImage !== undefined && widget.settings.image !== undefined) {
	        widget.setImage(widget.settings.image, true);
	    }
	    if (widget.settings.mouseDownImage !== undefined && widget.settings.image === undefined) {
	        widget.setImage('', false);
	    }
	    $(document).off(BreaseEvent.MOUSE_UP, widget._bind('_upHandler'));
	    widget.settings.value = WidgetClass.resetValue;
	    widget.sendValueChange({ value: WidgetClass.resetValue });
	}

	return WidgetClass;

});