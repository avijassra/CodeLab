jewel.screens["game-screen"] = (function() {
	var board = jewel.board,
		display = jewel.display,
		settings = jewel.settings,
		input = jewel.input,
		cursor,
		firstRun = true;
	
	function run() {
		if (firstRun) {
			setup();
			firstRun = false;
		}
		
		board.initialize(function(data, jewels) {
			display.initialize(function() {
					cursor = {
						x: 0,
						y: 0,
						selected: false
					};
					
				display.redraw(jewels, function() {
					// do something
				});
			});
		});
	}
	
	function setup() {
		input.initialize();
		input.bind('selectJewel', selectJewel);
		input.bind('moveUp', moveUp);
		input.bind('moveDown', moveDown);
		input.bind('moveLeft', moveLeft);
		input.bind('moveRight', moveRight);
	}
	
	function setCursor(x, y, select) {
		cursor.x = x;
		cursor.y = y;
		cursor.selected = select;
	}
	
	function selectJewel(x, y) {
		if (arguments.length == 0) {
			selectJewel(cursor.x, cursor.y);
			return;
		} 
		
		if (cursor.selected) {
			var dx = Math.abs(x - cursor.x),
			dy = Math.abs(y - cursor.y),
			dist = dx + dy;
			
			if (dist == 0) {
				// deselected the selected jewel
				setCursor(x, y, false);
			} else if (dist == 1) {
				// selected an adjacent jewel
				board.swap(cursor.x, cursor.y,
				x, y, playBoardEvents);
				setCursor(x, y, false);
			} else {
				// selected a different jewel
				setCursor(x, y, true);
			}
		} else {
			setCursor(x, y, true);
		}
	}
	
	function playBoardEvents(e) {
		if (e.length > 0) {
			var boardEvent = e.shift(),
				next = function() {
					playBoardEvents(e);
				};
				
			switch (boardEvent.type) {
				case 'move': 
					display.removeJewels(boardEvent.data, next);
					break;
					
				case 'remove':
					display.refill(boardEvent.data, next);
					break;
					
				case 'refill':
					display.refill(boardEvent.data, next);
					break;
					
				default:
					next();
					break;
			}
		} else {
			board.getBoard(function(data, jewels) {
				display.redraw(jewels, function() {
					// do something
				});
			});
			
		}
	}
	
	function moveCursor(x, y) {
		if (cursor.selected) {
			x += cursor.x;
			y += cursor.y;
			
			if (x >= 0 && x < settings.cols && y >=0 && y < settings.rows) {
				selectJewel(x, y);
			}
		} else {
			x = (cursor.x + x + settings.cols) % settings.cols;
			y = (cursor.y + y + settings.rows) % settings.rows;
		}
	}
	
	function moveUp() {
		moveCursor(0, -1);
	}
	
	function moveDown() {
		moveCursor(0, 1);
	}
	
	function moveLeft() {
		moveCursor(-1, 0);
	}
	
	function moveRight() {
		moveCursor(1, 0);
	}
	
	function setCursor(x, y, select) {
		cursor.x = x;
		cursor.y = y;
		cursor.selected = select;
		display.setCursor(x, y, select);
	}
	
	return {
		run : run
	};
})();