//$(function () {
//    $('form').each(function () {
//        $(this).validate({
//            invalidHandler: function (form) {
//            },
//            submitHandler: function (form) {
//                if ($(form).hasClass('jqAjaxForm')) {
//                    $this = $('.jqAjaxForm')
//                    submitJqueryForm($this, $this.metadata());
//                    return false;
//                }
//                else
//                    form.submit();
//            }
//        });
//    });
//});

$(function () {
    $('form').live('submit', function () {
        $this = $(this);

        if ($this.hasClass('jqAjaxForm')) {
            submitJqueryForm($this, $this.metadata());
            return false;
        }
        else {
            form.submit();
        }
    });
});

submitJqueryForm = function ($this, data) {
    if (data.IsAjax) {
        url = $this.attr('action');
        postData = $this.serialize();
        $.AjaxPost(url, postData, data.EventName, data.UpdateId);
    } else {
        $this[0].submit();
    }
};