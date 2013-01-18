$(function () {
    $('#randPics_container')
        .bind('mouseenter', imageDeck.onMouseEnter)
        .bind('mouseleave', imageDeck.onMouserLeave);

    $topImg = $('#randPics_container div:nth-child(1)');
    topPosit = $topImg.position();
    $bottomImg = $('#randPics_container div:nth-child(3)');
    bottomPosit = $bottomImg.position();

    imageDeck.topImg = { elem: $topImg, left: topPosit.left, top: topPosit.top, angle: 0 };
    imageDeck.bottomImg = { elem: $bottomImg, left: bottomPosit.left, top: bottomPosit.top, angle: 0 };
});

var imageDeck = {
    animate: true,
    limit: 50,
    topImg: null,
    bottomImg: null,
    timer: null,
    onMouseEnter: function () {
        imageDeck.animateMotion(true);
        console.log('mouse enter: ' + $(this).attr('id'));
    },
    onMouserLeave: function () {
        imageDeck.animateMotion(false);
        console.log('mouse leave: ' + $(this).attr('id'));
    },
    getTransformProperty: function (element) {
        // Note that in some versions of IE9 it is critical that
        // msTransform appear in this list before MozTransform
        var properties = [
            'transform',
            'WebkitTransform',
            'msTransform',
            'MozTransform',
            'OTransform'
        ];
        var p;
        while (p = properties.shift()) {
            if (typeof element.style[p] != 'undefined') {
                return p;
            }
        }
        return false;
    },
    animateMotion: function (isMouseOver) {
        var property = imageDeck.getTransformProperty($('#randPics')[0]);
        if (property) {
            d = 1;
            topImgTop = imageDeck.topImg.top;
            topImgLeft = imageDeck.topImg.left;
            bottomImgTop = imageDeck.bottomImg.top;
            bottomImgLeft = imageDeck.bottomImg.left;
            console.log('START > top img - left: ' + topImgLeft + '; top: ' + topImgTop + ' | bottom img - left: ' + bottomImgLeft + '; top: ' + bottomImgTop);
            imageDeck.topImg.elem.css('left', topImgLeft);
            imageDeck.bottomImg.elem.css('left', bottomImgLeft);
            if (imageDeck.timer) { clearInterval(imageDeck.timer); }
            imageDeck.timer = setInterval(
            function () {
                imageDeck.topImg.elem.css('left', ((isMouseOver ? -1 : 1) * d) + 'px');
                imageDeck.bottomImg.elem.css('left', ((isMouseOver ? 1 : -1) * d) + 'px');
                //imageDeck.topImg.elem[0].style['top'] = topImgTop + ((isMouseOver ? -1 : 1) * d) + 'px';
                //imageDeck.topImg.elem[0].style['left'] = topImgLeft + ((isMouseOver ? -1 : 1) * d) + 'px';
                //imageDeck.topImg.elem[0].style[property] = 'rotate(-' + (d / 1.5 % 360) + 'deg)';
                //imageDeck.bottomImg.elem[0].style['top'] = bottomImgTop + ((isMouseOver ? -1 : 1) * d) + 'px';
                //imageDeck.bottomImg.elem[0].style['left'] = bottomImgTop + ((isMouseOver ? 1 : -1) * d) + 'px';
                //imageDeck.bottomImg.elem[0].style[property] = 'rotate(' + (d / 1.5 % 360) + 'deg)';
                a = imageDeck.topImg.elem.position();
                b = imageDeck.bottomImg.elem.position();

                console.log(d + ' | ' + isMouseOver + ' | top img - left: ' + a.left + '; top: ' + a.top + ' | bottom img - left: ' + b.left + '; top: ' + b.top);
                d++;
                if (d > imageDeck.limit) {
                    topImg = imageDeck.topImg.elem.position();
                    bottomImg = imageDeck.bottomImg.elem.position();
                    imageDeck.topImg.top = topImg.top;
                    imageDeck.topImg.left = topImg.left;
                    imageDeck.bottomImg.top = bottomImg.top;
                    imageDeck.bottomImg.left = bottomImg.left;
                    console.log('FINAL > top img - left: ' + topImg.left + '; top: ' + topImg.top + ' | bottom img - left: ' + bottomImg.left + '; top: ' + bottomImg.top);
                    clearInterval(imageDeck.timer);
                }
            },
            100);
        }
    }
};