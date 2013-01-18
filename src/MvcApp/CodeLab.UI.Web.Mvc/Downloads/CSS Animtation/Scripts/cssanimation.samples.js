$(function () {
    /***** - Sample 1 - *****/
    $('#transitionTypeExample').hover(function () {
        $('div.transbox').addClass('transboxOnMouseOver');
    }, function () {
        $('div.transbox').removeClass('transboxOnMouseOver');
    });

    /***** - Sample 2 - *****/
    $('#spreadingBallsExample').hover(function () {
        $('div.jqball').addClass('moveBalls');
    }, function () {
        $('div.jqball').removeClass('moveBalls');
    });

    /***** - Sample 3 - *****/
    $('#3dRotationExample').hover(function () {
        $('div.rect').addClass('rotateAnimate');
    }, function () {
        $('div.rect').removeClass('rotateAnimate');
    });


    /***** - Sample 4 - *****/
    $('#startBouncyBallAnimation').bind('click', function () {
        $this = $(this);
        start = 'Start';
        stop = 'Stop';

        if ($this.text() == start) {
            // changing text to stop
            $this.text(stop);
            // start animation
            sample4.startAnimation();
        } else {
            // changing text to start
            $this.text(start);
            // stop time interval
            clearInterval(sample4.timeOut);
            // remove animation css class
            $('div.bouncyBall').removeClass('bouncyBallOnMouseOver');
        }
    });

    /***** - Sample 5 - *****/
    $('#plusifyAlbumImgs').hover(function () {
        $('div.jqIC').addClass('fanOut');
    }, function () {
        $('div.jqIC').removeClass('fanOut');
    });
});

var sample4 = {
    timeOut: null,
    // list of differnt color of the balls we want
    color: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Pink', 'Lime', 'Navy', 'Olive', 'Aqua', 'Purple', 'Teal'],
    // html for the ball. "boouncyBall" css is alread present in the cssanimation.samples.css file.
    ball: '<div class="bouncyBall"></div>',
    // method to generate random numbers for us
    getRandomNum: function (limit) {
        return Math.floor(Math.random() * limit);
    },
    // main animation logic is written in this method
    startAnimation: function () {
        // creating variable of the ball container present in html
        $bouncyBallExample = $('#bouncyBallExample');
        // creating variable of the ball present in html
        $bouncyBall = $('#bouncyBall1');
        // calculating total width of ball
        ballWidth = parseInt($bouncyBall.width());
        // since ball left position is random. finding out the limit till which random number should be generated.
        // total widht of container - width of ball
        leftLimit = parseInt($bouncyBallExample.width()) - ballWidth + 1;
        // random intervals to create balls
        timeInterval = sample4.getRandomNum(2);
        // timer to check if ball can be created or not
        timer = 0;

        sample4.timeOut = setInterval(function () {
            // add new ball to container if timer is greater then time interval set for ball creation 
            if (timer >= timeInterval) {
                // random left position for ball
                left = sample4.getRandomNum(leftLimit);
                // selecting randon color from the list.
                color = sample4.getRandomNum(sample4.color.length);
                // random time interval when next ball should be added
                timeInterval = sample4.getRandomNum(4);

                // adding new ball
                $(sample4.ball)
                    .css({ 'background-color': sample4.color[color], 'left': left })
                    .addClass('bouncyBallOnMouseOver')
                    .appendTo($bouncyBallExample);

                // set timer to 0 to start new timer
                timer = 0;
            } else {
                // increment  timer if time interval limit is not reached.
                timer++;
            }
        }, 1001);
    }
};