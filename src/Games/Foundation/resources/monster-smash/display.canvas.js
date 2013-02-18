monster.display = (function() {
	var isFirstRun = true,
		settings = monster.settings, 
		image;
	
	function run() {
		if (isFirstRun) {
			image = new Image();
			image.src = 'resources/monster-smash/images/monster-smash.png';	
			image.addEventListener('load', createBoard, false);
			isFirstRun = false;
		}
		//drawInitialImages();
	}
	
	function createBoard() {
		var boardDiv = $('#game-screen .game-board')[0];
		
		boardDiv.innerHTML = "";
		
		for (var x=0; x<settings.rows; x++) {
			for (var y=0; y<settings.cols; y++) {
				var canvas = document.createElement('canvas'),
					ctx = canvas.getContext('2d');
					
				dom.addClass(canvas, 'monster');
				canvas.style.top = y * 70 + 'px';
				canvas.style.left = x * 70 + 'px';
				ctx.drawImage(image, 0, 74, 64, 64, 0, 0, 64, 64);
				boardDiv.appendChild(canvas);
			}
		} 
	}
	
	function drawInitialImages() {
		var canvas = $('#game-screen .game-board canvas')[0],
			ctx = canvas.getContext('2d'),
			r = 0,
			c = 0;
			
		for (r = 0; r < settings.rows; r++) {
			for (c = 0; c < settings.cols; c++) {
				redraw(r, c, ctx);
			}
		}
	}
	
	function redraw(r, c) {
		var canvasDiv = $('#game-screen .game-board')[0],
			canvas = $('#c-' + r + '-' + c)[0],
			ctx;
		
		if(canvas) {
			canvasDiv.removeChild(canvas);
		}
		
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		
		canvas.setAttribute('id', 'c-' + r + '-' + c);
		dom.addClass(canvas, 'monster');
		
		image = new Image();
		image.src = 'resources/monster-smash/images/monster-smash.png';
		
		
		ctx.drawImage(image, 0, 114, 64, 64, 6 * c + 3, 6 * r + 3, 64, 64);
		canvasDiv.appendChild(canvas);
	}
	
	return {
		run: run,
		redraw: redraw
	};
})();