/*!
* jquery.imagePlusify-2.1.js
* jQuery image plusify plugin
* Version 2.1 (26-Feb-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/imageplusify
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

var plusifier = function () {
    // caching different instance on the page
    var options = null;
    var cache = [];
    var animatingItems = [];
    var animatingActiveCount = 0;
    var timer = null;
    var browserCssSupportChecked = false;
    var cssAnimation = null;

    // this method is used for delete (mark inactive) or modify the existing animating items
    var deleteModifyAnimatingItems = function (cacheIndex, isMouseEnter) {
        // can only mark active animating items as inactive or modify mouse enter
        if (animatingActiveCount > 0) {
            // iterate through all the animating items
            $.each(animatingItems, function (index, item) {
                // check if item is not null
                if (item != null) {
                    // check for requested cache index for operation is same as item cache index
                    if (item.cacheIndex == cacheIndex) {
                        // check if there is any mouse event
                        if (isMouseEnter == null || isMouseEnter == 'undefined') {
                            // if no mouse event then means animating item needs to be marked in active
                            item.active = false;
                            animatingActiveCount -= 1
                        } else {
                            // if mouse event is present then update it for the animating item
                            item.mouseEnter = isMouseEnter;
                        }
                        return;
                    }
                }
            });
        }
    };

    // this method is used for adding or updating the existing animating items
    addModifyAnimatingItems = function (prop) {
        addToList = true;
        // check if we have animating items present
        if (animatingItems.length > 0) {
            // iterate through all animating items
            $.each(animatingItems, function (index, item) {
                // check if item is not null
                if (item != null) {
                    // check for requested cache index for operation is same as item cache index
                    if (item.cacheIndex == prop.cacheIndex) {
                        // change mouse enter and active status for the item
                        item.mouseEnter = prop.mouseEnter;
                        item.active = prop.active;
                        // since item is already present, we will not add it again in the animating list
                        addToList = false;
                        // increase the count of active animating items
                        animatingActiveCount += 1;
                        return;
                    }
                }
            });
        }

        // add new item if its not already present in the animating item list
        if (addToList) {
            // push item to animating item array
            animatingItems.push(prop);
            // increase the count of active animating items
            animatingActiveCount += 1;
        }
    };

    // this is main method to give animate motion to albums
    var animateMotion = function () {
        // only process if we have more then 0 active animating items
        if (animatingActiveCount > 0) {
            // should only exec if no timer is in process
            if (timer == null) {
                timer = setInterval(function () {
                    // iterate through all the animating items
                    $.each(animatingItems, function (index, item) {
                        // only active animate items should be processed
                        if (item.active) {
                            // geting obj details from cache by cache index
                            obj = cache[item.cacheIndex];
                            // unbinding mouse click event for avoid multiple binding
                            obj.elem.unbind('click');
                            // binding click event mouse enter is true and on click callback is not null
                            if (item.mouseEnter && options.onClick) {
                                obj.elem.bind('click', { id: obj.album.id, name: obj.album.name, imgs: obj.album.imgs, callback: options.onClick }, clickEvent);
                            }

                            if (obj.topImg != null) {
                                // setting up new positions for top (tx) and bottom (bx) images
                                if (item.mouseEnter) {
                                    // new positions if mouse enter
                                    tx = obj.topImg.position().left - 1;
                                    bx = obj.botImg.position().left + 1;
                                } else {
                                    // new position if mouse leave
                                    tx = obj.topImg.position().left + 1;
                                    bx = obj.botImg.position().left - 1;
                                }

                                // slide by only half given distance if there are only two images
                                slideTo = (obj.midImg ? options.slideBy : options.slideBy / 2);

                                if (obj.topImgOrigPosit.left - slideTo < tx && item.mouseEnter || tx <= obj.topImgOrigPosit.left && !item.mouseEnter) {
                                    /*
                                    keep sliding image until
                                    1. if img containing div has not slided to distination position and mouse is on image 
                                    -> distination position (original position - allowed distance to slide) is less then current position
                                    2. Or if current position is less then equal to original position and mouse in not on image
                                    */
                                    obj.topImg.css({ left: tx + 'px' });
                                    obj.botImg.css({ left: bx + 'px' });
                                } else {
                                    // on reaching to destination position, mark animating item as inactive.
                                    deleteModifyAnimatingItems(item.cacheIndex);
                                    // check for the active animating items
                                    if (animatingActiveCount <= 0) {
                                        // if count is 0 for the animating items, then clear timer and set to null
                                        clearInterval(timer);
                                        timer = null;
                                        // reset animating items to empty array
                                        animatingItems = [];
                                    }
                                }
                            }
                        }
                    });
                }, 10); // 10 milli second interval in recalling the same functionality
            }
        }
    };

    // this method return call back method with id and imgs as parameters
    var clickEvent = function (event) {
        if (event.data.callback) {
            event.data.callback(event.data.id, event.data.name, event.data.imgs);
        }
    };

    return {
        /*
        return unique id
        */
        uniqid: function () {
            var newdate = new Date();
            return newdate.getTime();
        },
        /*
        set common options in private member
        */
        setOptions: function (opts) {
            if (!options)
                options = opts;
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
        check if obj is of array type
        */
        isArray: function (obj) {
            // obj is not null and not undefined
            if (!obj || obj == null || obj == 'undefined')
                return false;

            //returns true is it is an array
            if (obj.constructor.toString().indexOf('Array') == -1) {
                return false;
            } else {
                // if is array then length is greater then 0
                return (obj.length > 0 ? true : false);
            }
        },
        /*
        check if browser supports css animations
        */
        getAnimationDetails: function () {
            // animationPrefix is null
            if (cssAnimation == null && !browserCssSupportChecked) {
                // set it true so that browser support for css animation is not checked again
                browserCssSupportChecked = true;
                // default to js animation is css animation is turned off
                if (options.cssAnimationTurnedOn) {
                    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),

                    // creating test div for browser check
                    $textElem = $('<div />').attr('id', plusifier.uniqid()).appendTo($('body'));

                    // currently no browser supports css animation without prefix
                    if ($textElem[0].style.animationName) {
                        cssAnimation = {
                            support: true,
                            prefix: ''
                        };
                    }

                    // check if cssAnimation has not be set in previous condition
                    if (cssAnimation == null) {
                        // loop through all the major browser prefix and check if property exists
                        for (var i = 0; i < domPrefixes.length; i++) {
                            if ($textElem[0].style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                                cssAnimation = {
                                    support: true,
                                    prefix: '-' + domPrefixes[i].toLowerCase() + '-'
                                };
                                break;
                            }
                        }
                    }

                    // removing test div from body
                    $textElem.remove();
                }
            }

            return cssAnimation;
        },
        /*
        mouse enter event
        */
        onMouseEnter: function (e) {
            $albPics = $('div.jqAP[' + dataPlusifyCacheIndex + '=' + e.data.id + ']');
            // apply border style property setting for on mouse over
            if (options.borderOnMouseOver) {
                $('div.jqIC', $albPics).css('border', options.borderOnMouseOver);
            }

            // js animation if css animation not supported
            if (plusifier.getAnimationDetails() == null) {
                // mark inactive in animating items list
                deleteModifyAnimatingItems(e.data.id);
                // initialize if active animating count is 0
                initializeTimer = animatingActiveCount <= 0;
                // add or update to the animating item list
                addModifyAnimatingItems({ cacheIndex: e.data.id, mouseEnter: true, active: true });
                // initialize animate motion if active count is 0
                if (initializeTimer) {
                    animateMotion(e.data.id, true);
                }
            } else {
                obj = cache[e.data.id];
                $('div.jqIC', $albPics).addClass('fanOut');
                $albPics.bind('click', { id: obj.album.id, name: obj.album.name, imgs: obj.album.imgs, callback: options.onClick }, clickEvent);
            }
        },
        /*
        mouse leave event
        */
        onMouserLeave: function (e) {
            $albPics = $('div.jqAP[' + dataPlusifyCacheIndex + '=' + e.data.id + ']');
            // apply border style property setting for on mouse out
            if (options.border) {
                $('div.jqIC', $albPics).css('border', options.border);
            }

            // js animation if css animation not supported
            if (plusifier.getAnimationDetails() == null) {
                // mark inactive in animating items list
                deleteModifyAnimatingItems(e.data.id);
                // initialize if active animating count is 0
                initializeTimer = animatingActiveCount <= 0;
                // add or update to the animating item list
                addModifyAnimatingItems({ cacheIndex: e.data.id, mouseEnter: false, active: true });
                // initialize animate motion if active count is 0
                if (initializeTimer) {
                    animateMotion(e.data.id, false);
                }
            } else {
                $('div.jqIC', $albPics).removeClass('fanOut');
                $albPics.unbind('click');
            }
        }
    }
} ();

(function ($) {
    $.fn.extend({
        imagePlusify: function (settings) {
             // constants
            albContExt = '_albCont';
            imgContExt = '_imgCont';
            lblExt = '_lbl';
            divIdExt = '_div_';
            imgIdExt = 'img_';
            dataPlusifyCacheIndex = 'data-plusify-cacheIndex';
            albumClass = 'albums';
            plusifyStyle = 'plusifyStyle';
            imgDivClass = 'imgholder';
            labelClass = 'labelText';
            
            // default setting for the parameters
            var opts = {
                border: '1px solid gray',
                borderOnMouseOver: '1px solid black',
                padding: '5px',
                backgroundColor: '#fff',
                displayLabel: false,
                labelColor: '#000',
                randomize: true,
                margin: '30px',
                width: '200px',
                height:'200px',
                slideBy: 30,
                rotateBy: 7,
                cssAnimationTurnedOn: true,
                animateDuration:0.75,
                source: null,
                onClick: null
            };

            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            $.extend(opts, settings);
            
            // object to hold all images
            var src = [];

            /* 
            pulign wont work if source object is null
            */
            if(!opts.source)
                return;
            
            // validate source is valid obj and create src obj out of it
            if (plusifier.isArray(opts.source) && typeof opts.source[0] == 'string') {
                // valid if source is array of string where string is path of images
                src.push({ id: plusifier.uniqid(), imgs: opts.source });
            } else  if (opts.source.Id && plusifier.isArray(opts.source.Images)) {
                // valid if source is obj with id and array of string in images for path 
                src.push({ id: opts.source.Id, imgs: opts.source.Images});
            } else if(plusifier.isArray(opts.source)) {
                // valid if source is array if json obj with id and array of string in images for path 
                for(index = 0; index < opts.source.length; index++) {
                    if(typeof opts.source[index] === 'object' && opts.source[index].Id && plusifier.isArray(opts.source[index].Images)) {
                        albName = opts.source[index].Name;
                        src.push({ id: opts.source[index].Id, name: (albName ? albName : ""), imgs: opts.source[index].Images }); 
                    }
                }
            }

            // src created out obj is valid array and greater then 0 else return
            if(!plusifier.isArray(src))
                return;
            
            // object on which image plusify will be created
            $selector = $(this);

            // if current object is not null or undefined
            if ($selector.length > 0) {
                // saving common options in private member
                plusifier.setOptions({
                    border: opts.border, 
                    borderOnMouseOver: opts.borderOnMouseOver,
                    slideBy: opts.slideBy,
                    onClick: opts.onClick,
                    cssAnimationTurnedOn: opts.cssAnimationTurnedOn});

                // saving dimenions for latter use
                paddingVal = parseInt(opts.padding.replace('px', ''));
                containerWidth = parseInt(opts.width.replace('px', ''));
                containerHeight = parseInt(opts.height.replace('px', ''));
                imgWidth = containerWidth - (2 * paddingVal);
                imgHeight = containerHeight - (2 * paddingVal);

                // css animation check;
                broserAnim = plusifier.getAnimationDetails();

                // insert style to html head
                if($('#' + plusifyStyle).length == 0) {
                    $head = $('head');
                    
                    if($head.length == 0) {
                        $head = $('<head />').prependTo($('html'));
                    }
                    
                    $head.append('<style id="' + plusifyStyle + '"> div.' + albumClass + '{position: relative; float: left;  } ' + 
                        'div.' + albumClass + ' div.' + labelClass + '{ position: absolute; width: ' + containerWidth +'px; bottom: 0px; margin:auto; z-index: 9999; text-align: center; font-weight:bold; color: ' + opts.labelColor + ';} ' + 
                        'div.' + albumClass + ' div.' + imgDivClass + ' {position: relative; background-color: ' + opts.backgroundColor + '; padding: ' + opts.padding + '; border: ' + opts.border + '; ' + (broserAnim && broserAnim.support ?  broserAnim.prefix + 'transition:all ' + opts.animateDuration + 's ease-in-out;' : '') + '} '+
                        '</style>');

                    if(broserAnim && broserAnim.support) {
                        $('#' + plusifyStyle).append('div.topPic.fanOut {' + broserAnim.prefix + 'transform: translateX(-' + opts.slideBy + 'px) translateY(10px) scale(1.1, 1.1) rotate(-' + opts.rotateBy + 'deg); } ' +
                            'div.' + albumClass + ' div.middlePic.fanOut {' + broserAnim.prefix + 'transform: scale(1.1, 1.1); } ' +
                            'div.' + albumClass + ' div.bottomPic.fanOut {' + broserAnim.prefix + 'transform: translateX(' + opts.slideBy + 'px) translateY(10px) scale(1.1, 1.1) rotate(' + opts.rotateBy + 'deg); } ');
                    }
                }

                // iterating thru all selector array
                $selector.each(function() {
                    // setting common css styling
                    $this = $(this).css({'display':'inline-block'});
                    $this.html('');
                    thisId = $this.attr('id');
                    
                    // check that current element has id attr set
                    if(!thisId || thisId == '' ) {
                        // else  give one unique id
                        thisId = plusifier.uniqid();
                        $this.attr('id', thisId);
                    }

                        
                    // iterating thru array of src
                    $.each(src, function(index, album) {
                        // only process if album has got images
                        if(album.imgs.length > 0) {
                            // unique id for this image plusify
                            // this is same as plusifier caching id
                            cacheIndex = plusifier.cacheCount();

                            // container to hold album imgs and info
                            $albcont = $('<div />')
                                                .attr('id', thisId + albContExt + cacheIndex)
                                                .attr(dataPlusifyCacheIndex, cacheIndex)
                                                .addClass('jqAlbum ' + albumClass)
                                                .css({ 'width': containerWidth, 'height': containerHeight, 'backgroundColor': opts.backgroundColor, 'margin': opts.margin })
                                                .appendTo($this);

                            // setting up img container object hold images
                            $container = $('<div/>')
                                                    .attr('id', thisId + imgContExt + cacheIndex)
                                                    .attr(dataPlusifyCacheIndex, cacheIndex)
                                                    .addClass('jqAP')
                                                    .css({ 'position': 'relative', 'width': containerWidth, 'height': containerHeight, 'backgroundColor': opts.backgroundColor, 'float': 'left' })
                                                    .bind('mouseenter', {id: cacheIndex}, plusifier.onMouseEnter)
                                                    .bind('mouseleave', {id: cacheIndex}, plusifier.onMouserLeave)
                                                    .appendTo($albcont);

                            // limit of number of elements to be displayed in album, 3 being max 
                            limit = album.imgs.length > 3 ? 3 : album.imgs.length;
                            
                            // to store random index from imgs array
                            rndIds = [];

                            // looping thru images for set limit times
                            for(count=0; count<limit; count++) {
                                // setting dummy css class for jquery use.
                                if(limit == 3) {
                                    cssClass = (count == 0 ? 'topPic' : (count == 1 ? 'middlePic' : 'bottomPic'));
                                } else if(limit == 2) {
                                    cssClass = (count == 0 ? 'topPic' : 'bottomPic');
                                } else {
                                    cssClass = 'middlePic';
                                }

                                // creating image div container. we need this as images can't slite.
                                $imgCont = $('<div />')
                                                        .attr('id', thisId + imgContExt + cacheIndex + divIdExt + count)
                                                        .attr(dataPlusifyCacheIndex, cacheIndex)
                                                        .addClass('jqIC ' + imgDivClass + ' ' + cssClass)
                                                        .css({'width': imgWidth - (count * 4), 
                                                            'height': imgHeight - (count * 4), 
                                                            'top': -count * (imgHeight - ((count-1) * 2) + 10 ),
                                                            'left': count*6,
                                                            'z-index': limit-count })
                                                        .appendTo($container);

                                    // randomizing the pics so that we get different pic everytime
                                    if(opts.randomize) {
                                        isuniq = false;
                                        while(!isuniq) {
                                            isuniq = true;
                                            at = Math.floor(Math.random()*album.imgs.length)
                                            $.each(rndIds, function(index, id) {
                                                if(at == id) { isuniq = false; } 
                                            });
                                        }
                                        rndIds.push(at);
                                    } else {
                                        at = count;
                                    }

                                    // putting images in the img div container created above
                                    $img = $('<img />')
                                                        .attr('id', thisId + imgContExt + cacheIndex + divIdExt + imgIdExt + count)
                                                        .attr('alt', '')
                                                        .attr('src', album.imgs[at])
                                                        .attr(dataPlusifyCacheIndex, cacheIndex)
                                                        .css({ 'position': 'relative', 'width': imgWidth - (count * 4), 'height': imgHeight - (count * 4)})
                                                        .appendTo($imgCont);
                            }

                            // if label opts is set as true
                            if(opts.displayLabel) {
                                $lblDiv = $('<div />')
                                                            .attr('id', thisId + albContExt + lblExt + cacheIndex)
                                                            .attr(dataPlusifyCacheIndex, cacheIndex)
                                                            .addClass('jqAN ' + labelClass)
                                                            .html(album.name)
                                                            .appendTo($albcont);
                            }

                            // saving different div elements
                            $topImg = $('div.topPic', $container);
                            $midImg = $('div.middlePic', $container);
                            $botImg = $('div.bottomPic', $container);

                            // saving details in the cache for later user
                            plusifier.newCache({
                                elem: $container,
                                topImg: $topImg.length > 0 ? $topImg : null,
                                midImg: $midImg.length > 0 ? $midImg : null,
                                botImg: $botImg.length > 0 ? $botImg : null,
                                topImgOrigPosit: $topImg.length > 0 ? $topImg.position() : null,
                                album: album 
                            });
                        }
                    });
                    // check if label is to be displayed
                    if(opts.displayLabel) {
                        height = 0;
                        $('div.jqAN').each(function() {
                            $albInfo = $(this);
                            height = ($albInfo.height() > height ? $albInfo.height() : height);
                        });

                        $('div.jqAlbum').each(function() {
                            $(this).css('height', containerHeight + height + paddingVal);
                        });
                    }
                });
            }
        }
    });
})(jQuery);