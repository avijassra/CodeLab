$(function () {
    $.AjaxGet({
        url: imgUrl,
        callback: function (data) {
            $('#rotatorPics').imageRotator({
                backgroundColor: 'white',
                displayAutoRotate: true,
                previousText: ' < ',
                nextText: ' > ',
                images: data.malibu
            });
        }
    });
});