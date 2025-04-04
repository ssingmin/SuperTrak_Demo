/*global define,brease,console,CustomEvent,_*/
define(function (require) {

    'use strict';

    var SuperClass = require('brease/core/ContainerWidget'),
        ToggleButton = require('widgets/brease/ToggleButton/ToggleButton'),
        BreaseEvent = require('brease/events/BreaseEvent'),
        Scroller = require('brease/helper/Scroller'),
        uiController = brease.uiController,
        Enum = require('brease/enum/Enum'),
        Types = require('brease/core/Types'),

    /**
    * @class widgets.brease.ButtonBar
    * #Description
    * The ButtonBar can contain any number and or combination of Toggle- or RadioButton widgets; only one of them
    * can be active at a time.
    *   
    * @breaseNote  
    * @extends brease.core.ContainerWidget
    * @iatMeta studio:isContainer
    * true
    *
    * @iatMeta category:Category
    * Container,Buttons
    * @iatMeta description:short
    * Liste an mehreren Buttons gleicher Aktion
    * @iatMeta description:de
    * Container, welcher eine konfigurierbare Anzahl von Schaltflächen gleicher Aktion beinhaltet
    * @iatMeta description:en
    * The ButtonBar can contain any number and or combination of Toggle- or RadioButton widgets; only one of them
    * can be active at a time.
    *
    * @aside example buttonbar
    */

    /**
    * @htmltag examples
    * ##Configuration examples:
    *
    *     <div id="ButtonBar01" data-brease-widget="widgets/brease/ButtonBar">
    *         <!-- insert ToggleButton widgets here -->
    *     </div>
    */

    /**
    * @property {WidgetList} [children=["widgets.brease.ToggleButton"]]
    * @inheritdoc
    */

    /**
    * @cfg {Integer} selectedIndex=0
    * @iatStudioExposed
    * @iatCategory Data
    * @bindable
    * Index of the selected button (first button has index 0)
    */

    /**
    * @cfg {brease.enum.Direction} alignment='vertical'
    * @iatStudioExposed
    * @iatCategory Appearance
    * Alignment of the Bar. Possible Values:  
    * horizontal: elements aligned from left to right (no line break).
    * vertical: elements aligned from left to right (with line break).
    * Alignment is only applied if childPositioning is relative.
    */

    /**
    * @cfg {Boolean} autoScroll=false
    * @iatStudioExposed
    * @iatCategory Behavior
    * If childPositioning is relative and existing space is to small a scrollbar is visible to navigate to the hidden elements.
    * The direction of the scrollbar depends on the alignment property.
    * If autoScroll is false the overflow is visible.
    */

    /**
    * @cfg {Boolean} cancelButtonChangeEvents=true
    * If true, change events of inner widgets will not bubble through.   
    */
    /**
    * @cfg {Boolean} submitOnChange=true
    * Determines if changes, triggered by user input, should be sent immediately to the server.  
    */

    /**
    * @cfg {brease.enum.ChildPositioning} childPositioning='absolute'
    * @iatStudioExposed
    * @iatCategory Behavior
    * positioning of child elements (widgets)
    */
    defaultSettings = {
        cancelButtonChangeEvents: true,
        submitOnChange: true,
        alignment: Enum.Direction.vertical,
        childPositioning: Enum.ChildPositioning.absolute,
        autoScroll: false,
        selectedIndex: 0
    },

    WidgetClass = SuperClass.extend(function ButtonBar() {
        SuperClass.apply(this, arguments);
    }, defaultSettings),

    p = WidgetClass.prototype;

    p.init = function () {

        if (this.settings.omitClass !== true) {
            this.addInitialClass('breaseButtonBar');
        }
        if (brease.config.editMode === true) {
            this.addInitialClass('iatd-outline');
        }

        var self = this;
        SuperClass.prototype.init.call(this);

        _getChildrenInformation(this);
        _removeButtonClickHandler(this);
        _childPositioningHandling(this);

        this.el.on(BreaseEvent.CHANGE, this._bind('_buttonChangeHandler'));
        this.el.on(BreaseEvent.WIDGET_READY, this._bind('_widgetReadyHandler'));

        // Save the children IDs
        this.settings.buttonIds = [];
        $('#' + this.elem.id + '_scrollWrapper').children().each(function () {
            self.settings.buttonIds.push($(this).attr('id'));
        });

        this.buttonReady = [];
        for (var i = 0; i < this.settings.buttonIds.length; i += 1) {
            this.buttonReady[i] = new $.Deferred();
        }

        // Refresh scroller after all the buttons are READY

        $.when.apply(this, this.buttonReady).then(function () {
            self._refreshScroller();
        });


        if (this.settings.selectedId !== undefined) {
            this.setSelectedId(this.settings.selectedId);
        } else if (this.settings.selectedIndex !== undefined) {
            this.setSelectedIndex(this.settings.selectedIndex);
        }

        if (brease.config.editMode) {
            var EditorHandles = require('widgets/brease/ButtonBar/libs/EditorHandles');
            var editorHandles = new EditorHandles(this);

            this.getHandles = function () {
                return editorHandles.getHandles();
            };
        }
    };

    /**
    * @method setStyle
    * @hide
    */

    /**
    * @method setAlignment
    * Sets alignment
    * @param {String} alignment
    */
    p.setAlignment = function (alignment) {
        this.settings.alignment = alignment;
        _setAlignmentClass(this);
    };

    /**
    * @method getAlignment 
    * Returns alignment.
    * @return {String}
    */
    p.getAlignment = function () {
        return this.settings.alignment;
    };

    /**
    * @method setChildPositioning
    * Sets childPositioning
    * @param {String} childPositioning
    */
    p.setChildPositioning = function (childPositioning) {
        this.settings.childPositioning = Types.parseValue(childPositioning, 'Enum', { IAT_Enum: Enum.ChildPositioning, default: defaultSettings.childPositioning });
        _childPositioningHandling(this);
    };

    /**
    * @method getChildPositioning 
    * Returns childPositioning.
    * @return {String}
    */
    p.getChildPositioning = function () {
        return this.settings.childPositioning;
    };

    /**
    * @method setSelectedId
    * @param id of Button
    * setter for the selected ButtonBarButton  
    */
    p.setSelectedId = function (id, origin) {
        var widget = this;
        if (this.readyState === 0) {
            _selectButton.call(this, id, origin);
        } else {
            window.setTimeout(function () {
                widget.setSelectedId(id, origin);
            }, 0);
        }
    };

    /**
    * @method getSelectedId
    * getter for the selected ButtonBarButton   
    * @return  id of selectedButton
    */
    p.getSelectedId = function () {
        return this.settings.selectedId;
    };

    /**
    * @method setSelectedIndex
    * sets the selected button
    * @iatStudioExposed
    * @param {Integer} index
    * Index of the button to select (first button has index 0)
    */
    p.setSelectedIndex = function (index) {
        index = parseInt(index, 10);
        if (index > -1) {
            var selectedButton = this.buttons[index];
            if (selectedButton && selectedButton.id) {
                this.setSelectedId(selectedButton.id);
            }
        } else {
            this.reset();
        }
    };

    /**
    * @method getSelectedIndex
    * getter for the index of the selected ButtonBarButton  
    * @return {Number} selectedIndex
    */
    p.getSelectedIndex = function () {
        return this.settings.selectedIndex;
    };

    /**
    * @method setAutoScroll
    * Set autoScroll option.
    * @param {Boolean} autoScroll
    */
    p.setAutoScroll = function (autoScroll) {
        this.settings.autoScroll = autoScroll;
        if (this.settings.childPositioning === Enum.ChildPositioning.relative) {
            if (autoScroll) {
                _setAlignmentClass(this);
            } else {
                _removeScroller(this);
                _setAlignmentClass(this);
            }
        }
    };

    /**
    * @method getAutoScroll
    * Return autoScroll option.
    * @param {Boolean} autoScroll
    */
    p.getAutoScroll = function () {
        return this.settings.autoScroll;
    };

    p.submitChange = function () {
        this.sendValueChange({ selectedIndex: this.getSelectedIndex() });

        /**
        * @event SelectedIndexChanged
        * @param {Integer} value selected index
        * @iatStudioExposed
        * Fired when index changes.
        */
        var ev = this.createEvent('SelectedIndexChanged', { value: this.getSelectedIndex() });
        if (ev) {
            ev.dispatch();
        }
    };

    /**
    * @method enable
    * 
    */
    p.enable = function () {
        SuperClass.prototype.enable.apply(this, arguments);
        $('#' + this.elem.id + ' > [data-brease-widget]').each(function () {
            brease.uiController.callWidget(this.id, 'enable');
        });
    };

    /**
    * @method disable
    * 
    */
    p.disable = function () {
        SuperClass.prototype.disable.apply(this, arguments);
        $('#' + this.elem.id + ' > [data-brease-widget]').each(function () {
            brease.uiController.callWidget(this.id, 'disable');
        });
    };

    p.reset = function () {
        this.settings.selectedIndex = -1;
        _selectButton.call(this, '');
    };

    p._buttonClickHandler = function (e) {
        //this._handleEvent(e, true);
        //TEST-DG
        this._handleEvent(e);

        var widgetTargetId = $(e.target).closest('[data-brease-widget]').attr('id');
        if (!this.isDisabled && this.buttonIds.indexOf(widgetTargetId) !== -1 && widgetTargetId !== this.settings.selectedId && uiController.callWidget(widgetTargetId, 'isEnabled') === true) {
            this.setSelectedId(widgetTargetId, 'user');
        }
    };

    p.removeClickHandler = function (btnId) {
        var btn = uiController.callWidget(btnId, 'widget');
        if (btn && btn.el) {
            btn.el.off(BreaseEvent.CLICK, btn._bind('_clickHandler'));
        }
    };

    p._buttonChangeHandler = function (e) {

        var widgetTargetId = e.target.id,
            selected = false;

        if (this.buttonIds.indexOf(widgetTargetId) !== -1) {
            this.buttons[this.buttonIndex[widgetTargetId]].selected = e.originalEvent.detail.checked;
        }

        for (var i = 0; i < this.buttons.length; i += 1) {
            if (this.buttons[i].selected === true) {
                selected = true;
            }
        }

        if (selected === false) {
            this.settings.selectedIndex = -1;
            this.settings.selectedId = '';
        }
        if (this.settings.cancelButtonChangeEvents === true && e.target !== this.elem) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    };

    p._widgetReadyHandler = function (e) {
        var index = this.settings.buttonIds.indexOf(e.target.id);
        if (index !== -1) {
            this.buttonReady[index].resolve();
        }
    };

    p.widgetAddedHandler = function (e) {
        if (!this.scrollWrapper && this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _setAlignmentClass(this);
        } else if (this.scrollWrapper && this.settings.childPositioning === Enum.ChildPositioning.relative) {
            _addChildAtScroller(this);
        }
    };

    p.widgetRemovedHandler = function (e) {
        _removeChildAtScroller(this);
    };

    p._enableScroll = function (e) {
        if (this.el === null) { return; }
        var widget = this;

        $(window).off('mouseup', widget._bind('_enableScroll'));

        widget.el.parents().find('[data-brease-widget*=ButtonBar]').map(function () {
            var buttonBarScroll = brease.callWidget(this.id, 'widget');
            if (buttonBarScroll.scroller !== undefined) {
                buttonBarScroll.scroller.enable();
            }
        });
    };

    p._disableScroll = function (e) {
        if (this.el === null) { return; }
        var widget = this;

        $(window).on('mouseup', widget._bind('_enableScroll'));

        widget.el.parents('[data-brease-widget*=ButtonBar]').map(function () {
            var buttonBarScroll = brease.callWidget(this.id, 'widget');
            if (buttonBarScroll.scroller !== undefined) {
                buttonBarScroll.scroller.disable();
            }
        });

        if (e.originalEvent.type === 'wheel') {
            setTimeout(function () {
                widget.el.parents('[data-brease-widget*=ButtonBar]').map(function () {
                    var buttonBarScroll = brease.callWidget(this.id, 'widget');
                    if (buttonBarScroll.scroller !== undefined) {
                        buttonBarScroll.scroller.enable();
                    }
                });
            }, 50);
        }
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

        if (widget.settings.autoScroll && brease.config.editMode && widget.el.hasClass('vertical')) {
            widget.scrollWrapper.height(_calculateContentSize(widget));
        }

        if (widget.scroller) {
            widget.scroller.refresh();
        }
    };

    p.wake = function () {
        SuperClass.prototype.wake.apply(this, arguments);
    };

    p.suspend = function () {
        SuperClass.prototype.suspend.apply(this, arguments);
    };

    p.dispose = function () {
        
        if (this.scroller){
            this.scroller.destroy();
            this.scroller = null;
            this.scrollWrapper = null;
        }
        this.el.off();
        this.container.off();

        this.buttons = null;
        this.buttonIds = null;
        SuperClass.prototype.dispose.apply(this, arguments);
    };

    //###############
    //Private Methods
    //###############

    function _updateCss(elem, property, value) {
        $(elem).each(function () {
            $(this).css(function () { return property; }(), value);
        });
    }

    function _setAlignmentClass(widget) {

        if (widget.el.hasClass('vertical') || widget.el.hasClass('horizontal')) {
            widget.el.removeClass('vertical', 'horizontal');
        }
        var scrollerSettings;
        if (widget.settings.alignment === "horizontal") {
            widget.el.removeClass('vertical');
            widget.el.addClass('horizontal');
            scrollerSettings = { mouseWheel: true, tap: true, scrollY: false, scrollX: true };
        }

        else if (widget.settings.alignment === "vertical") {
            widget.el.removeClass('horizontal');
            widget.el.addClass('vertical');
            scrollerSettings = { mouseWheel: true, tap: true, scrollY: true, scrollX: false };
        }

        widget.el.off('tap', widget._bind('_buttonClickHandler'));
        widget.el.off(BreaseEvent.CLICK, widget._bind('_buttonClickHandler'));
        widget.container.off('VisibleChanged', widget._bind('_scrollUpdateHandler'));


        if (widget.settings.childPositioning === Enum.ChildPositioning.relative) {

            if (!widget.scrollWrapper && widget.settings.autoScroll) {
                _addScroller(widget, scrollerSettings);
                widget.el.addClass("autoScroll");
                widget.el.on('tap', widget._bind('_buttonClickHandler'));
                widget.container.on('VisibleChanged', widget._bind('_scrollUpdateHandler'));
            } else if (widget.scrollWrapper && widget.settings.autoScroll) {
                _swapScrollers(widget, scrollerSettings);
                _addChildAtScroller(widget);
                widget.el.on('tap', widget._bind('_buttonClickHandler'));
            } else if (!widget.settings.autoScroll) {
                widget.el.on(BreaseEvent.CLICK, widget._bind('_buttonClickHandler'));
                widget.el.removeClass("autoScroll");
            }


        } else {
            widget.el.on(BreaseEvent.CLICK, widget._bind('_buttonClickHandler'));
            widget.el.removeClass("autoScroll");
        }
    }

    function _getChildrenInformation (widget) {
        widget.buttons = [];
        widget.buttonIds = [];

        widget.el.find('[data-brease-widget]').each(function () {
            var button = this,
                id = button.id,
                info = { el: $(button), elem: button, id: id, state: Enum.WidgetState.IN_QUEUE, selected: false };

            widget.buttons.push(info);
            widget.buttonIds.push(info.id);
        });
    }

    function _removeButtonClickHandler(widget) {
        var index = -1;
        widget.buttonIndex = {};
        widget.readyState = 0;
        widget.el.find('[data-brease-widget]').each(function () {
            var button = this,
                id = button.id,
                info = { el: $(button), elem: button, id: id, state: Enum.WidgetState.IN_QUEUE, selected: false };

            widget.readyState += 1;
            index += 1;
            widget.buttonIndex[id] = index;

            if (uiController.getWidgetState(id) > 0) {
                info.state = Enum.WidgetState.INITIALIZED;
                widget.readyState -= 1;
                widget.removeClickHandler(id);
            } else {
                button.addEventListener(BreaseEvent.WIDGET_INITIALIZED, function (e) {
                    widget.buttons[widget.buttonIndex[e.target.id]].state = Enum.WidgetState.INITIALIZED;
                    widget.readyState -= 1;
                    widget.removeClickHandler(e.target.id);
                });
            }
        });
    }

    function _selectButton(id, origin) {
        var widget = this,
            selectedId = id, button;

        if (this.settings.selectedId !== id) {
            var len = this.buttons.length;
            for (var index = 0; index < len; index += 1) {
                if (this.buttons === null) {
                    return;
                }
                button = this.buttons[index];
                var isToggle = uiController.callWidget(button.id, 'isToggleButton');
                if (isToggle === true) {
                    if (selectedId === button.id) {
                        uiController.callWidget(button.id, 'toggle', ToggleButton.values.checked, undefined, origin);
                        button.el.css('z-index', 100);
                        widget.settings.selectedIndex = index;
                        widget.settings.selectedData = button.el.data('brease-data');
                    } else {
                        uiController.callWidget(button.id, 'toggle', ToggleButton.values.unchecked, undefined, origin);
                        button.el.css('z-index', index);
                    }
                }
            }
            this.settings.selectedId = id;
            /**
            * @event change
            * Fired when selected index has changed   
            * @param {Integer} selectedId id of selected Button
            * @param {Integer} selectedIndex
            * See at {@link brease.events.BreaseEvent#static-property-CHANGE BreaseEvent.CHANGE} for event type  
            * @eventComment
            */

            this.dispatchEvent(new CustomEvent(BreaseEvent.CHANGE, { detail: { selectedId: this.settings.selectedId, selectedData: this.settings.selectedData, selectedIndex: this.settings.selectedIndex, origin: origin } }));

            if (this.settings.submitOnChange === true && origin === 'user') {
                this.submitChange();
            }
        }
    }

    function _childPositioningHandling(widget) {
        var selector = '#' + widget.elem.id + ' > div > [data-brease-widget]';

        if (widget.settings.childPositioning === Enum.ChildPositioning.relative) {

            $(selector).each(function () {

                var widgetState = brease.uiController.getWidgetState(this.id);
                if (widgetState < Enum.WidgetState.INITIALIZED) {
                    brease.uiController.addWidgetOption(this.id, 'position', 'relative');
                } else {
                    var widget = brease.uiController.callWidget(this.id, 'widget');
                    $('#' + this.id).css('position', 'relative');
                }
            });
            _setAlignmentClass(widget);
        }
        else if (widget.settings.childPositioning === Enum.ChildPositioning.absolute) {
            if (widget.settings.autoScroll) {
                _removeScroller(widget);
            }
            _setAlignmentClass(widget);
            $(selector).each(function () {

                var widgetState = brease.uiController.getWidgetState(this.id);
                if (widgetState < Enum.WidgetState.INITIALIZED) {
                    brease.uiController.addWidgetOption(this.id, 'position', 'absolute');
                } else {
                    var widget = brease.uiController.callWidget(this.id, 'widget');
                    $('#' + this.id).css('position', 'absolute');
                }
            });
        }
    }

    function _addScroller(widget, scrollerSettings) {
        var containerChildren;

        containerChildren = widget.container.children().detach();
        widget.scrollWrapper = $('<div/>').addClass('scrollWrapper').attr('id', widget.elem.id + '_scrollWrapper');
        widget.scrollWrapper.append(containerChildren);
        widget.container.height('100%');
        widget.container.width('100%');
        widget.container.append(widget.scrollWrapper);

        widget.scroller = Scroller.addScrollbars(widget.container[0], scrollerSettings);

        widget.el.on('mousedown wheel', widget._bind('_disableScroll'));

        widget._refreshScroller();
    }

    function _removeScroller(widget) {
            var containerChildren = widget.container.children('#' + widget.elem.id + '_scrollWrapper').children().detach();
            widget.container.children().remove();
            widget.container.append(containerChildren);

            widget.scroller = undefined;
            widget.scrollWrapper = undefined;
    }

    function _swapScrollers(widget, scrollerSettings) {
        widget.container.children(".iScrollLoneScrollbar").remove();
        widget.scroller = Scroller.addScrollbars(widget.container[0], scrollerSettings);
    }

    function _addChildAtScroller(widget) {
        var containerChildToBeMoved;
        containerChildToBeMoved = widget.container.children('.breaseWidget').detach();
        widget.scrollWrapper.append(containerChildToBeMoved);
        widget._refreshScroller();
    }

    function _removeChildAtScroller(widget) {
        widget._refreshScroller();

    }

    function _calculateContentSize(widget) {
        var contentSize = 0,
            positionObj,
            selector = '#' + widget.elem.id + '_scrollWrapper',
            maxContentSize = 0;

        if (!brease.config.editMode) {
            $(selector).children().each(function () {
                if ($(this).hasClass('remove') !== true) {
                    positionObj = $(this).position();
                    contentSize = positionObj.top + $(this).outerHeight(true);

                    if (contentSize > maxContentSize) {
                        maxContentSize = contentSize;
                    }
                }
            });
        } else {
            $(selector).children().each(function () {
                positionObj = $(this).position();
                contentSize = positionObj.top + $(this).outerHeight(true);

                if (contentSize > maxContentSize) {
                    maxContentSize = contentSize;
                }
            });
        }
        return maxContentSize;
    }

    return WidgetClass;
});