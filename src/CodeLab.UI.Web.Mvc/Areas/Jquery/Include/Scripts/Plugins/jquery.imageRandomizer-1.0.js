/*!
* jQuery image deck plugin
* Version 0.01 (07-Jan-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/imagedeck
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

var deck = function () {
    // caching different instance on the page
    var cache = [];

    return {
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
        } 
    }
} ();

(function ($) {
    $.fn.extend({
        imageDeck: function (settings) {
            // constants
            contExt = '_container';
            divIdExt = '_div_';
            imgIdExt = '_img_';
            dataDeckId = 'data-deckId';
            // unique id for this image deck
            // this is same as deck caching id
            deckId = deck.cache.length;

            // default setting for the parameters
            var opts = {
                border: '1px solid black',
                padding: '5px',
                backgroundColor: '#fff',
                previousText: ' < ',
                nextText: ' > ',
                images: null,
                onClick: null,
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
            if (!opts.images || opts.images.length == 0)
                return;

            // object on which image deck will be created
            $this = $(this);

            // if current object is not null or undefined
            if ($this.length > 0) {
                $this.html('');
                containerWidth = $this.width();
                containerHeight = $this.height();
                // setting up container object
                $container = $('<div/>')
                                        .attr('id', $this.attr('id') + contExt)
                                        .attr(dataDeckId, deckId)
                                        .css({ 'width': containerWidth, 'height': containerHeight })
                                        .appendTo($this);
                containerId = $container.attr('id');

                limit = opts.images.length > 3 ? 3 : opts.images.length;

                for(i =0; i<limit; i++) {
                    $imgDivCont = $('<div />')
                                                .attr('id', containerId + divIdExt + i)
                                                .css('position', 'relative')
                                                .appendTo($container);

                      imgCont = $('<img />')
                                            .attr('id', containerId + imgIdExt + i)
                                            .attr('alt', '')
                                            .attr('src', opts.images[i])
                                            .appendTo($imgDivCont);
                }


            }
        }
    });
})(jQuery);