$(function () {
    $('#clockTime').clock({ width: '100px' });
    $('div.jqStopwatch').stopwatch({ width: '140px' });
    $('#timer').timer({ countdown: '10', callback: function () { console.log('i am triggered'); } });
});