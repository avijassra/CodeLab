jewel.display = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		canvas, ctx,
		cols, rows,
		jewelSize,
		firstRun = true,
		jewels;
	
	function setup() {
		var boardElement = $('#game-screen .game-board')[0];
		cols = jewel.settings.cols;
		rows = jewel.settings.rows;
		jewelSize = jewel.settings.jewelSize;
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		dom.addClass(canvas, 'board');
		canvas.width = cols * jewelSize;
		canvas.height = rows * jewelSize;
		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas);
	} 
	
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
	
	function drawJewel(type, x, y) {
		var image = jewel.image,
			yMultipler = 0;
			
		// hack to fix the y position in image in sprite as its not in sync with height
		switch (jewelSize) {
			case 24:
				xMultipler = 74;
				break;
				
			case 32:
				xMultipler = 82;
				break;
				
			case 40:
				xMultipler = 90;
				break;
				
			case 64:
				xMultipler = 114;
				break;
				
			case 80:
				xMultipler = 130;
				break;
		}
		
		ctx.drawImage(image, 0, type * 90, jewelSize, jewelSize, x * jewelSize, y * jewelSize, jewelSize, jewelSize);
	}
	
	function redraw(newJewels, callback) {
		var x, y;
		jewels = newJewels;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (x = 0; x < cols; x++) {
			for (y = 0; y < rows; y++) {
				drawJewel(jewels[x][y], x, y);
			}
		}
		callback();
	}
	
	function initialize(callback) {
		if (firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	} 
	
	return {
		initialize: initialize,
		redraw: redraw
	} 
})();