$(function () {
    $.AjaxGet({
        url: imgUrl,
        callback: function (data) {
            $('#plusifyPics').imagePlusify({
                backgroundColor: 'white',
                source: data,
                displayLabel: true,
                onClick: function (id, name, src) {
                    alert('you have clicked on album with id: [' + id + '] with name "' + name + '" and it has total of ' + src.length +' images !!!');
                }
            });
        }
    });
});