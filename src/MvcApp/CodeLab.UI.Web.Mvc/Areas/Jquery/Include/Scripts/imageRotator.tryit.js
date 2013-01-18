var tryMeImgs;

$(function () {
    $.AjaxGet({
        url: imgUrl,
        callback: function (data) {
            tryMeImgs = data.lasVegas;
            loadImageRotator();
        }
    });

    $('#loadImageRotator').click(loadImageRotator);
});

loadImageRotator = function () {
    $('#rotatorPics').html('');
    $('#rotatorPics').imageRotator({
        border: $('#borderVal').html(),
        backgroundColor: $('#backgroundColorVal').html(),
        barColor:$('#barColorVal').html(),
        infoBarAtTop: $('#infoBarAtTopVal').html().toLowerCase() == 'true',
        mergeOnChange: $('#mergeOnChangeVal').html().toLowerCase() == 'true',
        displayAutoRotate: $('#displayAutoRotateVal').html().toLowerCase() == 'true',
        rotationSpeed: $('#rotationSpeedVal').html(),
        previousText: htmlDecode($('#previousTextVal').html()),
        nextText: htmlDecode($('#nextTextVal').html()),
        images: tryMeImgs
    });
}

htmlDecode = function (input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}