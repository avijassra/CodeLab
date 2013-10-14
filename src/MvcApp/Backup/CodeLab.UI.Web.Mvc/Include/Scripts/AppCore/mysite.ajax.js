(function ($) {
    ajaxCall = function (url, actionType, actionData, actionDataType, blockOnCall, eventName, callback) {

        if (blockOnCall) {
            $('#main').block({
                message: '<h1>Processing</h1>',
                css: { border: '3px solid #a00', 'border-radius': '10px' }
            });
        }

        $.ajax({
            type: actionType,
            url: url,
            data: actionData,
            dataType: actionDataType,
            success: function (response, status, xhr) {
                mysite.ClearAlertMessage();
                if (response) {
                    if (!response.HasError) {
                        if (eventName)
                            $.event.trigger(eventName, response);

                        if (response.RedirectUrl)
                            window.location = response.RedirectUrl;

                        if (response.DataCaptureView)
                            $('#' + mysite.Constants.LeftView).html(response.DataCaptureView);

                        if (response.ContentView)
                            $('#' + mysite.Constants.RightView).html(response.ContentView);

                        if (callback) callback(response);

                        if (blockOnCall) {
                            $('#main').unblock();
                        }
                    } else {
                        mysite.DisplayAlertMessage(response.Message);
                    }
                }
            },
            error: function (xhr, status, error) {
                if (blockOnCall) {
                    $('#main').unblock();
                }
                mysite.DisplayAlertMessage('Error has occured. Please try again later');
            }
        });
    }

    $.AjaxPost = function (url, postData, eventName, callback) {
        return ajaxCall(url, 'post', postData, 'json', true, eventName, callback);
    }

    $.AjaxGet = function () {
        var args = arguments[0] || {};
        var url = args.url;
        var data = args.data;
        var blockOnCall = args.blockOnCall;
        var eventName = args.eventName;
        var callback = args.callback;

        return ajaxCall(url, 'get', data, 'json', false, eventName, callback);
    }
})(jQuery);