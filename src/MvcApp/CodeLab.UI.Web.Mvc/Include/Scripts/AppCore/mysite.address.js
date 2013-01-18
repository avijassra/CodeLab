$(function () {
    $(window).trigger('hashchange');

    //Grab hash off URL (default to first tab) and update
    $(window).bind("hashchange", function (e) {
        //var element = e.target.nodeName;
        console.log(location.hash);
        // check if its ajax call or not
        // for ajax call url should have '#/'
        if (location.hash.indexOf('#') >= 0) {
            newUrl = location.pathname + location.hash.replace('#', '/');
            $.AjaxGet({ url: newUrl });
        }
        else {
            window.location = location.pathname;
        }
    });
});