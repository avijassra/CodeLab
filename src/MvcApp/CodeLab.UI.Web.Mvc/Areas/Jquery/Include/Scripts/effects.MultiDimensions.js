$(function () {
    $('#multiDimensions').bind('mouseenter', function () {
        scateredNames.setMouseInContainer(true);
    }).bind('mouseleave', function () {
        scateredNames.clearLastKnownPosition();
        scateredNames.setMouseInContainer(false);
    });

    $(document)
        .mousemove(function (e) {
            if (scateredNames.getMouseInContainer()) {
                if (scateredNames.getLastKnownPosition()) {
                    delta = scateredNames.getDelta(e.pageX, e.pageY);

                    $('.imgContainer').each(function () {
                        $this = $(this);
                        posit = $this.position();
                        direction = Boolean($this.attr('data-direction'));
                        speed = parseFloat($this.attr('data-speed'));

                        if (direction) {
                            x = posit.left + speed * delta.x;
                            y = posit.top + speed * delta.y;
                        } else {
                            x = posit.left - speed * delta.x;
                            y = posit.top - speed * delta.y;
                        }
                        $this.css({ left: x + 'px', top: y + 'px' });
                    });
                }
                scateredNames.setLastKnownPosition(e.pageX, e.pageY);
            }
        });
});

var scateredNames = function () {
    var isInContainer = false;
    var lastKnownPosition;
    var deltaPosition;

    return {
        getMouseInContainer: function () {
            return isInContainer;
        },
        setMouseInContainer: function (isIn) {
            isInContainer = isIn;
        },
        getLastKnownPosition: function () {
            return lastKnownPosition;
        },
        setLastKnownPosition: function (x, y) {
            lastKnownPosition = {
                left: x,
                top: y
            };
        },
        clearLastKnownPosition: function () {
            lastKnownPosition = null;
        },
        getDelta: function (left, top) {
            return deltaPosition = {
                            x: left - lastKnownPosition.left,
                            y: top - lastKnownPosition.top 
                        };
        }
    }
} ();