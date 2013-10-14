$(function () {
    $('.bgMover').imageBackgroundMover({
        displayWidth: '600px',
        displayHeight: '200px',
        imageWidth: '800px',
        imageHeight: '400px',
        padding: '5px',
        image: '/Areas/Jquery/Include/Images/Malibu/DSC_1184_wide.JPG'
    });

    $('#movingPic')
        .bind('mouseenter', imgMover.onMouseEnter)
        .bind('mouseleave', imgMover.onMouserLeave);

    $cont = $('#movingPic');
    imgMover.contDimensions = {
        width: $cont.width(),
        height: $cont.height()
    };
    $('#contDimensions').html(imgMover.contDimensions.width + ', ' + imgMover.contDimensions.height);

    imgMover.contPosit = $cont.offset();
    $('#contPosition').html(imgMover.contPosit.left + ', ' + imgMover.contPosit.top);

    $img = $('#movingPic_img');
    imgMover.imgDimensions = {
        width: $img.width(),
        height: $img.height()
    };
    imgMover.imgPosit = $img.offset();
    $('#imgPosition').html(imgMover.imgPosit.left + ', ' + imgMover.imgPosit.top);

    $(document).mousemove(function (e) {
        $('#mousePosition').html(e.pageX + ', ' + e.pageY);

        isIn = imgMover.isInContainer(e);

        if (isIn) {
            if (!imgMover.enterPosit) {
                imgMover.enterPosit = {
                    left: e.pageX,
                    top: e.pageY
                };
            }

            if (imgMover.lastPosit) {
                contPosit = $cont.offset();
                imgPosit = $img.offset();

                deltaX = e.pageX - imgMover.lastPosit.left;
                deltaY = e.pageY - imgMover.lastPosit.top;

                $('#newimgPosition').html(imgPosit.left + ', ' + imgPosit.top);

                if (deltaX > 0) {
                    diffX = contPosit.left - imgPosit.left;
                    if (diffX > 0) {
                        x = diffX - deltaX > 0 ? deltaX : diffX;
                        $img.css({ left: $img.position().left + x + 'px' });
                    }
                } else if (deltaX < 0) {
                    diffX = (imgPosit.left + imgMover.imgDimensions.width) - (contPosit.left + imgMover.contDimensions.width);
                    if (diffX > 1) {
                        x = diffX + deltaX > 0 ? deltaX : diffX;
                        $img.css({ left: $img.position().left + x + 'px' });
                    }
                }

                if (deltaY > 0) {
                    diffY = contPosit.top - imgPosit.top;
                    if (diffY > 0) {
                        y = diffY - deltaY > 0 ? deltaY : diffY;
                        $img.css({ top: $img.position().top + y + "px" });
                    }
                } else if (deltaY < 0) {
                    diffY = ((imgPosit.top + imgMover.imgDimensions.height) - (contPosit.top + imgMover.contDimensions.height));
                    if (diffY > 1) {
                        y = diffY + deltaY > 0 ? deltaY : diffY;
                        $img.css({ top: $img.position().top + y + "px" });
                    }
                }
            }

            $('#mouseEnterPosition').html('Got in container at ' + imgMover.enterPosit.left + ', ' + imgMover.enterPosit.top);
            $('#widthDetails').html('Img distance from left ' + (imgMover.contPosit.left - imgMover.imgPosit.left) + ' and mouse distance from right ' + ((imgMover.contPosit.left + imgMover.contDimensions.width) - e.pageX));
            $('#heightDetails').html('Img distance from top ' + (imgMover.contPosit.top - imgMover.imgPosit.top) + ' and mouse distance from bottom ' + ((imgMover.contPosit.top + imgMover.contDimensions.height) - e.pageY));

            imgMover.lastPosit = {
                left: e.pageX,
                top: e.pageY
            };
        } else {
            imgMover.enterPosit = null;
            imgMover.lastPosit = null;
            $('#mouseEnterPosition').html('Is out of container');
            $('#slideRatio').html('');
            $('#widthDetails').html('');
            $('#heightDetails').html('');
        }
    });
});

imgMover = {
    enterPosit: null,
    contPosit: null,
    contDimensions: null,
    imgPosit: null,
    imgDimensions: null,
    lastPosit: null,
    isInContainer: function (e) {
        if (e.pageX > imgMover.contPosit.left && e.pageX < imgMover.contPosit.left + imgMover.contDimensions.width &&
            e.pageY > imgMover.contPosit.top && e.pageY < imgMover.contPosit.top + imgMover.contDimensions.height) {
            return true;
        }
        return false;
    },
    onMouseEnter: function (e) {

    },

    onMouserLeave: function (e) {
    }
};