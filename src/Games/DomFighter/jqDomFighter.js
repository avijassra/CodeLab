var df = {
    style: '<style id="dds" type="text/css">.sprite-bullet{ background: url(images.png) no-repeat top left; background-position: 0 0; width: 5px; height: 13px; z-index: 1000;} .sprite-fighter{ background: url(images.png) no-repeat top left; background-position: 0 -63px; width: 43px; height: 46px; z-index: 1000; -webkit-transform:rotate(1deg); } .btR { position: fixed; bottom: 10px; right: 20px;}</style>',
    fighter: '<div id="" class="sprite-fighter" />',
    speedSetting: '<select class="btR" id="fss"><option value="1">1</option><option value="2" selected="selected">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>',
    winDim: {},
    elemDim: {},
    speed: 2
};

(function ($) {
    $.fn.extend({
        
        // this is to initialize the rocket with position
        _init: function ($cont) {
            // variables
            var $this = $(this),
                $window = $(window),
                $elem, topP, leftP;

            if (!$cont) {
                $cont = $('body');
            }
            $cont.prepend($this).prepend(df.speedSetting);
            $('#fss').bind('click', function () {
                df.speed = parseInt($(this).val());
            });

            // windows width & height set in global variable
            df.winDim.height = $window.height();
            df.winDim.width = $window.width();
            df.elemDim.height = $this.height();
            df.elemDim.width = $this.width();
            topP = (df.winDim.height - df.elemDim.height) / 2;
            leftP = (df.winDim.width - df.elemDim.width) / 2;
            
            // set the new top and left position calculate based on window and element height and width
            $this
                .css({ 'position': 'fixed', 'top': topP + 'px', 'left': leftP + 'px' });
        }
    });

    $.loadRocket = function () {
        var $elem = $(df.fighter);
        // check if the style for the dom distructor plugin has been already added
        if ($('#dds').length === 0) {
            // this code is only executed is required plugin style is not present
            $('head').append(df.style);
        }
        // appending fighter plane div to the body
        $elem._init()
        // document event to move fighter plane
        $(document)
            .unbind('.ddp')
            .bind({
                'keydown.ddp': function (e) {
                    var currTopP = $elem.position().top,
                        currLeftP = $elem.position().left,
                        newTopP, newLeftP;
                    // filter action by key code
                    if (e.keyCode === 37) { // left key check
                        if (currLeftP > df.speed) {
                            newLeftP = currLeftP - df.speed;
                            $elem.css({ 'left': newLeftP + 'px' });
                            return;
                        }
                    } else if (e.keyCode === 38) { // up key check
                        if (currTopP > df.speed) {
                            newTopP = currTopP - df.speed;
                            $elem.css({ 'top': newTopP + 'px' });
                            return;
                        }
                    } else if (e.keyCode === 39) { // right key check
                        if (currLeftP < (df.winDim.width - df.elemDim.width)) {
                            newLeftP = currLeftP + df.speed;
                            $elem.css({ 'left': newLeftP + 'px' });
                            return;
                        }
                    } else if (e.keyCode === 40) { // down key check
                        if (currTopP < (df.winDim.height - df.elemDim.height)) {
                            newTopP = currTopP + df.speed;
                            $elem.css({ 'top': newTopP + 'px' });
                            return;
                        }
                    } else if (e.keyCode === 32) { // space key check
                        displayMsg('space bar pressed');
                    }
                    
                },
                'resize.ddp': function () {
                    var $window = $(window);
                    df.winDim.height = $window.height();
                    df.winDim.width = $window.width();
                }
            });
    }
})(jQuery);

$(function () {
    $('#clearMsg').bind('click', function () {
        $('#msg').html('');
    });

    $.loadRocket();
});

function displayMsg(msg) {
    $('#msg').append('<div>' + msg + '</div>');
}
