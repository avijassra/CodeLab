jewel.display = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		canvas, ctx,
		cols, rows,
		jewelSize,
		firstRun = true;

	function createBackground() {
		var background = document.createElement('canvas'),
		bgctx = background.getContext('2d');
		dom.addClass(background, 'background');
		background.width = cols * jewelSize;
		background.height = rows * jewelSize;
		bgctx.fillStyle = 'rgba(225,235,255,0.15)';
		for (var x=0;x<cols;x++) {
			for (var y=0;y<cols;y++) {
				if ((x+y) % 2) {
					bgctx.fillRect(x * jewelSize, y * jewelSize, jewelSize, jewelSize);
				}
			}
		} 
		return background
	}
	
	function setup() {
		var boardElement = $('#game-screen .gameboard')[0];
		cols = jewel.settings.cols;
		rows = jewel.settings.rows;
		jewelSize = jewel.settings.jewelSize;
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		dom.addClass(canvas, 'board');
		dom.addClass(canvas, 'board');
		canvas.width = cols * jewelSize;
		canvas.height = rows * jewelSize;
		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas);
	} 
	
	function initialize(callback) {
		if (firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	} 
	
	return {
		initialize : initialize
	} 
})();