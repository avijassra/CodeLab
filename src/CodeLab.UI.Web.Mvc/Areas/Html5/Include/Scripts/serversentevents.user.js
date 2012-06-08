$(function () {
    var userStatusChangeEvent = new EventSource(statusChangeEventUrl);
    userStatusChangeEvent.onmessage = function (event) {
        data = $.parseJSON(event.data);

        for (index = 0; index < data.length; index++) {
            $elem = $('#' + data[index].Id);
            isOnline = data[index].IsOnline;

            if (isOnline) {
                $elem.addClass('is_online');
                $('.loginTimestamp', $elem).html(data[index].Time);
            }
            else {
                $elem.removeClass('is_online');
                $('.loginTimestamp', $elem).html('');
            }
        }
    };
});