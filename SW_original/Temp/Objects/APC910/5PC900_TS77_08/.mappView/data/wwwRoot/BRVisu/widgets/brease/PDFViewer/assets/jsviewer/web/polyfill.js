/**********************
    ***** CustomEvent *****
    **********************/

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    if (window.CustomEvent) {
        CustomEvent.prototype = window.CustomEvent.prototype;
    }
    window.CustomEvent = CustomEvent;