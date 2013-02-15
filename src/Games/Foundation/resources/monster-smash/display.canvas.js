monster.display = (function() {
	var isFirstRun = true,
		settings = monster.settings;
	
	function run() {
		if (isFirstRun) {
			createBoard();
			isFirstRun = false;
		}
		drawInitialImages();
	}
	
	function createBoard() {
		var boardDiv = $('#game-screen .game-board')[0],
			canvas = document.createElement('canvas'),
			bgctx = canvas.getContext('2d');
		
		bgctx.scale(canvas.width, canvas.height);
		bgctx.fillStyle = 'rgba(0,0,0,0.05)';
		for (var x=0; x<settings.rows; x++) {
			for (var y=0; y<settings.cols; y++) {
				if ((x+y) % 2) {
					bgctx.fillRect(x * 0.125, y * 0.125, 0.125, 0.125);
				}
			}
		} 
		boardDiv.appendChild(canvas);
	}
	
	function drawInitialImages() {
		
	}
	
	function redraw() {
	}
	
	return {
		run: run,
		redraw: redraw
	};
})();