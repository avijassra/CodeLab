/*!
* jquery.clock-0.1.js
* jQuery clock plugin
* Version 0.1 (March-05-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/clock
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

// common methods
var clockHelperUtil = function () {
    // default options
    var defaultOpts = {
        backgroundColor: '#fff',
        border: '1px solid #000',
        color: '#000',
        height: '20px',
        width: '80px',
        displaySeconds: true
    };

    // variables
    var browserCssSupportChecked = false;
    var cssAnimation = null;

    return {
        /*
        return unique id
        */
        uniqid: function () {
            var newdate = new Date();
            return newdate.getTime();
        },
        /*
        return default clock options
        */
        getDefaultOptions: function () {
            return defaultOpts;
        },
        /*
        check if browser supports css animations
        */
        getBrowserAnimationDetails: function () {
            // animationPrefix is null
            if (cssAnimation == null && !browserCssSupportChecked) {
                // set it true so that browser support for css animation is not checked again
                browserCssSupportChecked = true;
                domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),

                // creating test div for browser check
                $textElem = $('<div />').attr('id', clockHelperUtil.uniqid()).appendTo($('body'));

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

            return cssAnimation;
        },
        /*
        to display time in two digits
        */
        timeDigitformat: function (val) {
            return val < 10 ? '0' + val : val;
        },
        /*
        create clock html
        */
        createHtml: function (thisId, elem, optHeight, optWidth, optBorder, optBgColor, optColor) {
            // variable values
            totalHeight = parseInt(optHeight.replace('px', '')) + 6;
            totalWidth = parseInt(optWidth.replace('px', '')) + 6;
            handWidth = (totalWidth - 20) / 3;
            browser = clockHelperUtil.getBrowserAnimationDetails();

            $style = $('#clockstyle');

            if ($style.length == 0) {
                $head = $('head');

                if ($head.length == 0) {
                    $head = $('<head />').prependTo($('html'));
                }

                $head.append('<style type="text/css" id="clockstyle">div.clockCont{position:relative;display:inline-block;padding:3px;}' +
                    'div.handCont{position:relative;overflow:hidden;font-weight:bold;text-align:center;float:left;padding:2px;}' +
                    'div.timeDisplay{position:absolute;padding:3px;' + browser.prefix + 'transition-property: all;' + browser.prefix + 'transition-duration: .5s;}' +
                    'div.current, div.longTick{top:0px;z-index:9999}</style>');

                $style = $('#clockstyle');
            }

            custStyle = 'div#' + thisId + ' div div div.next{top:' + optHeight + ';}div#' + thisId + ' div div div.previous, div#' + thisId + ' div div div.remove{top:-' + optHeight + ';}' +
                'div#' + thisId + ' div div div.timeDisplay{min-height: ' + optHeight + '; min-width: ' + handWidth + 'px; background-color: ' + optBgColor + '; color: ' + optColor + '; }';
            $style.append(custStyle);

            //elements for use
            var $mainContainer = $('<div />').attr('id', thisId + '_cont').addClass('clockCont').css({ 'height': totalHeight + 'px', 'border': optBorder });
            $handCont = $('<div />').addClass('handCont').css({ 'height': optHeight, 'width': handWidth + 'px', 'background-color': optBgColor, 'color': optColor });
            $timeDiv = $('<div />').addClass('timeDisplay');
            $timeSeparator = $handCont.clone().css('max-width', '5px').html(':');
            // adding to the DOM
            $mainContainer.appendTo(elem);
            timeHrsCont = $handCont.clone().addClass('jqH').attr('id', thisId + '_cont_hrs').appendTo($mainContainer);
            $timeSeparator.clone().appendTo($mainContainer);
            timeMinCont = $handCont.clone().addClass('jqM').attr('id', thisId + '_cont_min').appendTo($mainContainer);
            $timeSeparator.clone().appendTo($mainContainer);
            timeSecCont = $handCont.clone().addClass('jqS').attr('id', thisId + '_cont_sec').appendTo($mainContainer);

            $timeDiv.clone().addClass('current').appendTo(timeHrsCont);
            $timeDiv.clone().addClass('next').appendTo(timeHrsCont);
            $timeDiv.clone().addClass('current').appendTo(timeMinCont);
            $timeDiv.clone().addClass('next').appendTo(timeMinCont);
            $timeDiv.clone().addClass('current').appendTo(timeSecCont);
            $timeDiv.clone().addClass('next').appendTo(timeSecCont);
        },
        /*
        create clock ticks
        */
        clockticks: function ($main, $hr, $min, $sec, currHr, currMin, currSec) {
            setInterval(function () {
                $('div.handCont .remove', $main).remove();
                $('div.handCont .previous', $main).addClass('remove').removeClass('previous');
                $('div.handCont .current', $main).addClass('previous').removeClass('current');
                $('div.handCont .next', $main).addClass('current').removeClass('next');

                if (currSec >= 59) {
                    if (currMin >= 59) {
                        currHr = (currHr >= 24 ? 0 : currHr + 1);
                        $('div.handCont.jqH .longTick', $main).addClass('current').removeClass('longTick');
                        $hr.append($('<div />').addClass('timeDisplay next').html(clockHelperUtil.timeDigitformat(currHr)));
                    } else {
                        $('div.handCont.jqH .current', $main).addClass('longTick').removeClass('current');
                    }
                    currMin = (currMin >= 59 ? 0 : currMin + 1);
                    $('div.handCont.jqM .longTick', $main).addClass('current').removeClass('longTick');
                    $min.append($('<div />').addClass('timeDisplay next').html(clockHelperUtil.timeDigitformat(currMin)));
                } else {
                    $('div.handCont.jqH .current', $main).addClass('longTick').removeClass('current');
                    $('div.handCont.jqM .current', $main).addClass('longTick').removeClass('current');
                }

                currSec = (currSec >= 59 ? 0 : currSec + 1);
                $sec.append($('<div />').addClass('timeDisplay next').html(clockHelperUtil.timeDigitformat(currSec)));
            }, 999);
        },
        /*
        create timer ticks
        */
        timerticks: function ($main, $hr, $min, $sec, currHr, currMin, currSec, callback) {
            timerHr = currHr;
            timerMin = currMin;
            timerSec = currSec;

            setInterval(function () {
                $('div.handCont .remove', $main).remove();
                $('div.handCont .next', $main).addClass('remove').removeClass('next');
                $('div.handCont .current', $main).addClass('next').removeClass('current');
                $('div.handCont .previous', $main).addClass('current').removeClass('previous');

                if (currSec <= 0) {
                    if (currMin <= 0) {
                        $('div.handCont.jqH .longTick', $main).addClass('current').removeClass('longTick');
                        $hr.append($('<div />').addClass('timeDisplay previous').html(clockHelperUtil.timeDigitformat(currHr)));
                        currHr -= 1;
                    } else {
                        $('div.handCont.jqH .current', $main).addClass('longTick').removeClass('current');
                    }
                    $('div.handCont.jqM .longTick', $main).addClass('current').removeClass('longTick');
                    $min.append($('<div />').addClass('timeDisplay previous').html(clockHelperUtil.timeDigitformat(currMin)));
                    currMin -= 1;
                } else {
                    $('div.handCont.jqH .current', $main).addClass('longTick').removeClass('current');
                    $('div.handCont.jqM .current', $main).addClass('longTick').removeClass('current');
                }
                
                $sec.append($('<div />').addClass('timeDisplay previous').html(clockHelperUtil.timeDigitformat(currSec)));
                currSec -= 1;

                if (currHr == currMin && currMin == currSec && currSec == 0) {
                    currHr = timerHr;
                    currMin = timerMin;
                    currSec = timerSec;

                    if (callback)
                        callback();
                }
            }, 999);
        }
    };
} ();

// clock object for the display
var Watch = function (elem, opts) {
    // setting variables for later use
    elemId = elem.attr('id');
    // check if the selector has id
    if (!elemId || elemId == '') {
        // generate unique number if id is not set
        elemId = clockHelperUtil.uniqid();
        elem.attr('id', elemId);
    }
    
    this.id = elemId;
    this.elem = elem;

    clockHelperUtil.createHtml(this.id, elem, opts.height, opts.width, opts.border, opts.backgroundColor, opts.color);

    this.$mainCont = $('#' + this.id + '_cont', this.elem);
    this.$hrCont = $('div.jqH', this.$mainCont);
    this.$minCont = $('div.jqM', this.$mainCont);
    this.$secCont = $('div.jqS', this.$mainCont);
}

Watch.prototype.start = function () {
    datetime = new Date();
    currHr = datetime.getHours();
    currMin = datetime.getMinutes();
    currSec = datetime.getSeconds();

    $('div.next', this.$secCont).html(clockHelperUtil.timeDigitformat(currSec));
    $('div.next', this.$minCont).html(clockHelperUtil.timeDigitformat(currMin));
    $('div.next', this.$hrCont).html(clockHelperUtil.timeDigitformat(currHr));

    clockHelperUtil.clockticks(this.$mainCont, this.$hrCont, this.$minCont, this.$secCont, currHr, currMin, currSec);
};

Watch.prototype.timer = function (currHr, currMin, currSec, callback) {
    $('div.previous', this.$secCont).html(clockHelperUtil.timeDigitformat(currSec));
    $('div.previous', this.$minCont).html(clockHelperUtil.timeDigitformat(currMin));
    $('div.previous', this.$hrCont).html(clockHelperUtil.timeDigitformat(currHr));

    clockHelperUtil.timerticks(this.$mainCont, this.$hrCont, this.$minCont, this.$secCont, currHr, currMin, currSec, callback);
};

(function ($) {
    $.fn.extend({
        // to display stopwatch
        clock: function (settings) {
            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            var params = $.extend({}, clockHelperUtil.getDefaultOptions(), settings);
            
            var watch = new Watch($(this), params);
            watch.start();
        },
        // to display timeouts
        stopwatch: function (settings) {
            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            var params = $.extend({}, clockHelperUtil.getDefaultOptions(), settings);

            var watch = new Watch($(this), params);
        },
        // to display timeouts
        timer: function (settings) {
            // $.extend() method takes two or more objects as arguments 
            // and merges the contens of them into the first object.
            var params = $.extend({}, clockHelperUtil.getDefaultOptions(), settings);

            if(!params.countdown || params.countdown == '')
                return;

            split = params.countdown.split(':');

            hr = (split.length == 3 ? parseInt(split[0]) : 0);;
            min = (split.length == 3 ? parseInt(split[1]) : (split.length == 2 ? parseInt(split[0]) : 0));
            sec = (split.length == 3 ? parseInt(split[2]) : (split.length == 2 ? parseInt(split[1]) : parseInt(split[0])));

            if(hr == min && min == sec && sec == 0)
                return;

            var watch = new Watch($(this), params);
            watch.timer(hr, min, sec, params.callback);
        }
    });
})(jQuery);