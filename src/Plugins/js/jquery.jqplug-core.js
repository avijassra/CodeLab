// ******************************************************
// Date: Nov 06, 2012
// Author: Avi Jassra
// Description: This is the core plugin used by jqPlug plugins.
// Version: 1.0.00
// Full source at https://github.com/avijassra/jqPlug
// ******************************************************

(function ($) {
	// to test that jqPlug core is loaded
	$._jqPlugCore = function() {
		return true;
	}
	/* generates unique id */
    $.uniqId = function () {
        var newdate = new Date();
        return newdate.getTime();
    }
	/* string formating like c-sharp
    e.g. string.Format("{0}, hello world", ['avi']); */
    $.stringFormat = function (str, arr) {
        if (str && $.isArray(arr)) {
            for (i in arr) {
                while (str.indexOf('{' + i + '}') >= 0) {
                    str = str.replace('{' + i + '}', arr[i]);
                }
            }
        }
        return str;
    }
	/* creates a script tag string for the given source */
    $.createScriptTag = function (src) {
        var scriptTag = '<script src="{0}" type="text/javascript" ></script>';
        return $.stringFormat(scriptTag, [src]);
    }
	/* debounce the event if occurs again in given time. default time is 200ms */
	$.debouncer = function (func, timeout) {
        var timeoutID, timeout = timeout || 200;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }
})(jQuery);