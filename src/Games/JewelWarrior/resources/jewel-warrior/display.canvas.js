jewel.display = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		canvas, ctx,
		cols, rows,
		jewelSize,
		firstRun = true,
		jewels,
		cursor;
	
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
		renderCursor();
	}
	
	function initialize(callback) {
		if (firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	} 
	
	function clearCursor() {
		if (cursor) {
			var x = cursor.x,
				y = cursor.y;
				
			clearJewel(x, y);
			drawJewel(jewels[x][y], x, y);
		}
	}
	
	function setCursor(x, y, selected) {
		clearCursor();
		if (arguments.length > 0) {
			cursor = {
				x: x,
				y: y,
				selected: selected
			};
		} else {
			cursor = null;
		}
		renderCursor();
	}
	
	function clearJewel(x, y) {
		ctx.clearRect(x * jewelSize, y * jewelSize, jewelSize, jewelSize);
	}
	
	function renderCursor() {
		if (!cursor) {
			return;
		} 
		
		var x = cursor.x,
			y = cursor.y;
		
		clearCursor();
		
		if (cursor.selected) {
			ctx.save();
			ctx.globalCompositeOperation = 'lighter';
			ctx.globalAlpha = 0.8;
			drawJewel(jewels[x][y], x, y);
			ctx.restore();
		} 
		
		ctx.save();
		ctx.lineWidth = 0.05 * jewelSize;
		ctx.strokeStyle = 'rgba(250,250,150,0.8)';
		ctx.strokeRect((x + 0.05) * jewelSize, (y + 0.05) * jewelSize, 0.9 * jewelSize, 0.9 * jewelSize);
		ctx.restore();
	}
	
	function moveJewels(movedJewels, callback)
	{
		var n = movedJewels.length,
			mover, i;
			
		for (i=0;i<n;i++) {
			mover = movedJewels[i];
			clearJewel(mover.fromX, mover.fromY);
		} 
		
		for (i=0;i<n;i++) {
			mover = movedJewels[i];
			drawJewel(mover.type, mover.toX, mover.toY);
		} 
		callback();
	} 
		
	function removeJewels(removedJewels, callback) {
		var n = removedJewels.length;
		
		for (var i=0;i<n;i++) {
			clearJewel(removedJewels[i].x, removedJewels[i].y);
		} 
		callback();
	}
		
	return {
		initialize: initialize,
		redraw: redraw,
		setCursor: setCursor,
		moveJewels : moveJewels,
		removeJewels: removeJewels,
		refill: redraw
	} 
})();