/*!
* jQuery image rotator plugin
* Version 1.5 (09-Feb-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/imageRotator
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

var rotator = function () {
    // caching different instance on the page
    var options = null;
    var cache = [];

    return {
        /*
        set options for rotator
        */
        setOptions: function (opts) {
            if (!options) {
                options = opts;
            }
        },
        /*
        return the cache count
        */
        cacheCount: function () {
            return cache.length;
        },
        /*
        add new cache obj
        */
        newCache: function (obj) {
            cache.push(obj);
        },
        /*
        return the cache obj by index
        */
        cacheByIndex: function (id) {
            return cache[id];
        },
        /*
        save current index in the cache
        */
        saveCurrentIndexInCache: function (id, currInd) {
            cache[id].currImgIndex = currInd;
        },
        /* 
        click event triggered on page navigation
        */
        pagingClick: function (e) {
            //// console logging info for test data
            // console.log(e.data.isNext);
            rotator.setImageDesc(e.data.rotatorId, e.data.isNext);
            if (e.data.callback)
                e.data.cabback();
        },
        /* 
        this function rotates the image based on rotator id
        which is in sync with caching index
        */
        setImageDesc: function (rotatorId, isNext) {
            // loading obj object by rotator id
            obj = rotator.cacheByIndex(rotatorId);
            //// console logging info for test data
            // console.log(obj.currImgIndex);
            // loading options and setting variables
            currentImgIndex = obj.currImgIndex;
            imgs = options.images;
            doImgMerge = options.mergeOnChange;
            rotationSpeed = options.rotationSpeed;
            $text = obj.text;
            $img = obj.img;
            $pImg = obj.pImg;
            $nImg = obj.nImg;
            ncI = 0;
            maxInd = imgs.length - 1;

            // calulating index for the previous, current and next image
            isInit = (isNext == null || isNext == undefined);
            ncI = (isInit ? currentImgIndex : (isNext ? (currentImgIndex == maxInd ? 0 : currentImgIndex + 1) : (currentImgIndex == 0 ? maxInd : currentImgIndex - 1)));
            npI = (isInit ? maxInd : (isNext ? currentImgIndex : (ncI == 0 ? maxInd : ncI - 1)));
            nnI = (isInit ? ncI + 1 : (isNext ? (ncI == maxInd ? 0 : ncI + 1) : currentImgIndex));
            if (!isInit && doImgMerge) { if (isNext) { $nImg.show(); } else { $pImg.show(); } }
            if (maxInd == 1) { if (isNext) { npI = null; } else { nnI = null; } }
            //// console logging info for test data
            // console.log('npI: ' + npI + ' | ncI: ' + ncI + ' | nnI: ' + nnI)

            // displaying images based on the image index
            if (isInit) {
                $text.html(imgs[ncI].desc);
                $img.attr('src', imgs[ncI].src).fadeIn(rotationSpeed);
                $pImg.attr('src', imgs[npI].src).hide();
                $nImg.attr('src', imgs[nnI].src).hide();
            } else {
                $img.fadeOut(rotationSpeed, function () {
                    $img.attr('src', imgs[ncI].src).fadeIn(function () {
                        $text.html(imgs[ncI].desc);
                        if (npI) { $pImg.attr('src', imgs[npI].src).hide(); }
                        if (nnI) { $nImg.attr('src', imgs[nnI].src).hide(); }
                        rotator.saveCurrentIndexInCache(rotatorId, ncI);
                    });
                });
            }
        }
    }
} ();

(function ($) {
    $.fn.extend({
        imageRotator: function (settings) {
            // unique id for this image rotator
            // this is same as rotator caching id
            rotatorId = rotator.cacheCount();

            // default setting for the parameters
            var opts = {
                border: '1px solid black',
                backgroundColor: '#fff',
                barColor: 'black',
                infoBarAtTop: false,
                mergeOnChange: true,
                displayAutoRotate: false,
                autoRotateTimer: 5000,
                rotationSpeed: 1500,
                previousText: ' < ',
                nextText: ' > ',
                images: null,
                onPrevious: null,
                onNext: null
            };

            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            $.extend(opts, settings);

            /* 
            pulign wont work if
            1. images object is null
            2. images count is equal to 0
            3. there is no src property in images first element
            4. there is no desc property in images first element
            */
            if (!opts.images || opts.images.length == 0 || !opts.images[0].src || !opts.images[0].desc)
                return;

            /*
            validation to check auto rotator timer is atleast 500 ms greater then rotation speed.
            this is so that images don't change while previous change is still in process.
            */
            if (opts.displayAutoRotate && opts.autoRotateTimer - 500 <= opts.rotationSpeed )
                return;

            // object on which image rotator will be created
            $selector = $(this);

            // if current object is not null or undefined
            if ($selector.length > 0) {
                rotator.setOptions(opts);
                $selector.each(function() {
                    $this = $(this);
                    $this.html('');
                    containerWidth = $this.width();
                    containerHeight = $this.height();
                    $container = $('<div/>').attr('id', $this.attr('id') + '_container').css({ 'width': containerWidth, 'height': containerHeight }).appendTo($this);
                    containerId = $container.attr('id');

                    // setting required style for this object 
                    $container.css({ 'position': 'relative' }).attr('data-rotatorId', rotatorId);
                    $container.css({ 'border': opts.border, 'background-color': opts.backgroundColor });

                    // styles variables
                    aCss = { 'font-weight': 'bold', 'color': '#fff', 'cursor': 'pointer', 'opacity': '1.0', 'filter': 'alpha(opacity=100)' };

                    // element variables for image, previous image, next image
                    $img = $('<img/>').attr('alt', '').css({ 'height': containerHeight, 'width': containerWidth, 'top': '0px', 'position': 'absolute', 'zIndex': '1' }).appendTo($container);
                    $pImg = $img.clone().css('zIndex', '0').appendTo($container).hide();
                    $nImg = $img.clone().css('zIndex', '0').appendTo($container).hide();
                    $naviBar = $('<div/>')
                                    .css({ 'width': containerWidth, 'background-color': opts.barColor, 'opacity': '0.6', 'filter': 'alpha(opacity=60)', 'position': 'absolute', 'color': '#fff', 'text-align': 'center', 'zIndex': '2' })
                                    .appendTo($container);
                    $text = $('<div/>').attr('id', containerId + '_info').css('font-size', '.8em');
                    $panel = $('<div/>').appendTo($naviBar);

                    // setting the display location for the navigation bar
                    if (opts.infoBarAtTop) {
                        // true if navigation link should come on top
                        $text.insertAfter($panel);
                        $naviBar.css('top', '0px');
                    } else {
                        // default if navigation link should come on top
                        $text.insertBefore($panel);
                        $naviBar.css('bottom', '0px');
                    }

                    // display navigation bar links only if images count is more then 1
                    if (opts.images.length > 1) {
                        // setting up previous link
                        $('<a/>').attr('id', containerId + '_prevLink').addClass('jq' + containerId).css(aCss).text(opts.previousText)
                        .attr('data-rotatorId', rotatorId)
                        .bind('click', { rotatorId: rotatorId, isNext: false, callback: opts.onPrevious }, rotator.pagingClick)
                        .appendTo($panel);

                        // space between links
                        $pSpan = $('<span />').html('&nbsp;').appendTo($panel);

                        // if display auto player is selected
                        if (opts.displayAutoRotate) {
                            // auto play icon for auto image rotator.
                            $('<a/>').css(aCss).css('font-family', 'Webdings').text('4')
                            .attr('data-rotatorId', rotatorId)
                            .bind('click', function () {
                                // binding click event with auto player
                                $autoPlay = $(this);
                                rId = $autoPlay.attr('data-rotatorId')
                                $paginglinks = rotator.cacheByIndex(rId).navLink;
                                if ($autoPlay.hasClass('jqAct')) {
                                    // if auto player is stopped
                                    clearInterval(timer);
                                    $autoPlay.removeClass('jqAct').text('4');
                                    $paginglinks.each(function () {
                                        $pLink = $(this);
                                        isNext = $pLink.hasClass('jqNI');
                                        rotatorId = $pLink.attr('data-rotatorId');
                                        callbackAction = isNext ? opts.onNext : opts.onPrevious;
                                        //// console logging info for test data
                                        // console.log(isNext);
                                        // binding click events from navigation links
                                        $(this).bind('click', { rotatorId: $(this).attr('data-rotatorId'), isNext: isNext, callback: callbackAction }, rotator.pagingClick).css({ 'color': 'white !important', 'cursor': 'pointer' })
                                    });
                                } else {
                                    // if auto player is activated
                                    $autoPlay.addClass('jqAct').text(';')
                                    // unbinding click events from navigation links
                                    $paginglinks.unbind('click').css({ 'color': 'gray !important', 'cursor': 'default' });
                                    timer = setInterval(function () {
                                        rotator.setImageDesc($autoPlay.attr('data-rotatorId'), true);
                                    }, opts.autoRotateTimer);
                                }
                            })
                            .appendTo($panel);

                            // space between links
                            $pSpan.clone().appendTo($panel);
                        }

                        // setting up next link
                        $('<a/>').attr('id', containerId + '_nextLink').addClass('jqNI jq' + containerId).css(aCss).text(opts.nextText)
                        .attr('data-rotatorId', rotatorId)
                        .bind('click', { rotatorId: rotatorId, isNext: true, callback: opts.onNext }, rotator.pagingClick)
                        .appendTo($panel);
                    }

                    // Caching current instance to isolate with different image rotator options
                    rotator.newCache({
                        currImgIndex: 0,
                        text: $text,
                        img: $img,
                        pImg: $pImg,
                        nImg: $nImg,
                        navLink: $('.jq' + containerId),
                    });
                    rotator.setImageDesc($container.attr('data-rotatorId'));
                });
            }
        }
    });
})(jQuery);