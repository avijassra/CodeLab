$(function () {
    $('.jqOnlineUser').change(function () {
        $this = $(this);
        myId = $this.attr('id');
        myCheckedStatus = $this.attr('checked') ? true : false;

        $.ajax({
            url: userStatusChangeUrl,
            type: 'post',
            data: { id: myId, isOnline: myCheckedStatus },
            dataType: 'json',
            success: function (response) {
                if (response.IsOnline)
                    $this.parent('div').addClass('is_online');
                else
                    $this.parent('div').removeClass('is_online');
            }
        });
    });

    $('#actionOnAllBtn').click(function () {
        $this = $(this);
        selectAll = true;
        if ($this.hasClass('jqAllSelected')) {
            selectAll = false;
            $this.val("Select All").removeClass('jqAllSelected');
            $('input[type=checkbox]').removeAttr('checked');
        } else {
            $this.val("Unselect All").addClass('jqAllSelected');
            $('input[type=checkbox]').attr('checked', 'checked');
        }

        $.ajax({
            url: actionOnAllUrl,
            type: 'post',
            data: { everyOneOnline: selectAll },
            dataType: 'json',
            success: function (response) {
                if (selectAll)
                    $('.userInfo').addClass('is_online');
                else
                    $('.userInfo').removeClass('is_online');
            }
        });
    });
});