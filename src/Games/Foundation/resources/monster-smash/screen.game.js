monster.screens['game-screen'] = (function() {
	var isFirstRun = true,
		settings = monster.settings,
		$ = dom.$, cols, rows;
	
	function setup() {
		var boardElement = $('#game-screen .game-board')[0];
		cols = monster.settings.cols;
		rows = monster.settings.rows;
		// rect = boardElement.getBoundingClientRect(),
		// canvas = document.createElement('canvas');
		// ctx = canvas.getContext('2d');
		// dom.addClass(canvas, 'board');
		// canvas.width = rect.width;
		// canvas.height = rect.height;
		boardElement.appendChild(createBackground());
		// boardElement.appendChild(canvas);
	} 
	
	function createBackground() {
		var background = document.createElement('canvas'),
		bgctx = background.getContext('2d');
		dom.addClass(background, 'background');
		background.width = cols * 64;
		background.height = rows * 64;
		bgctx.fillStyle = 'rgba(0,0,0,0.05)';
		for (var x=0;x<cols;x++) {
			for (var y=0;y<cols;y++) {
				if ((x+y) % 2) {
					bgctx.fillRect(x * 64, y * 64, 64, 64);
				}
			}
		} 
		return background
	}
	
	function run(getLoadProgress) {
		if (isFirstRun) {
			setup();
			isFirstRun = false;
		}
	}
	
	
	function createBoard() {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			rect = $('#game')[0].getBoundingClientRect(),
			image = new Image();
			
		dom.addClass(canvas, 'board');
		canvas.width = rect.width;
		canvas.height = rect.height;
		
		ctx.scale(rect.width, rect.height);
			
		image.src = "resources/monster-smash/images/monster-smash.png";
		
		ctx.beginPath();
		for (var r = 0; r < settings.rows; r++) {
			for (var c = 0; c < settings.cols; c++) {
				ctx.drawImage(image, 0, -114, 64, 64, r * 70, c * 70, 64, 64);
			}
		}
		ctx.closePath();
		
		$('#game-screen')[0].appendChild(canvas);
	}

	return {
		run: run,
	};
})();