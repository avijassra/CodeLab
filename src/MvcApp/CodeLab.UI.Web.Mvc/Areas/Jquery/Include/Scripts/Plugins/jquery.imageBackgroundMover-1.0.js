/*!
* jQuery image mover plugin
* Version 0.01 (22-Jan-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/imageMover
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

var mover = function () {
    // caching different instance on the page
    var cache = [];

    return {
        uniqid: function () {
            var newdate = new Date();
            return newdate.getTime();
        }
    }
} ();

(function ($) {
    $.fn.extend({
        imageBackgroundMover: function (settings) {
            // constants
            contExt = '_container';
            divIdExt = '_div_';
            imgIdExt = '_img';

            // default setting for the parameters
            var opts = {
                border: '1px solid black',
                displayWidth: null,
                displayHeight: null,
                imageWidth: null,
                imageHeight: null,
                padding: '5px',
                image: null
            };

            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            $.extend(opts, settings);

            /* 
            pulign wont work if
            1. image object is null
            */
            if (!(opts.image && opts.displayWidth && opts.displayHeight && opts.imageWidth && opts.imageHeight))
                return;

            // object on which image background mover will be created
            $selector = $(this);

            // if current object is not null or undefined
            if ($selector.length > 0) {
                $selector.each(function() {
                    $this = $(this);
                    $this.html('');
                    if(!$this.attr('id')) {
                        $this.attr('id', mover.uniqid());
                    }
                    thisId = $this.attr('id');

                    // setting up container object
                    $cont = $('<div />')
                                    .attr('id', thisId + contExt)
                                    .css({'position':'relative', 'width': opts.displayWidth, 'height': opts.displayHeight,'overflow': 'hidden','border':opts.border})
                                    .bind('mouseenter', imgMover.onMouseEnter)
                                    .bind('mouseleave', imgMover.onMouserLeave)
                                    .appendTo($this);
                    
                });
            }
        }
    });
})(jQuery);