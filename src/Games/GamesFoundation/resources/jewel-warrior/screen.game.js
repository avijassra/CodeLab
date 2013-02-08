jewel.screens["game-screen"] = (function() {
	var board = jewel.board,
		display = jewel.display;
	
	function run() {
		board.initialize(function(data, jewels) {
			display.initialize(function() {
				display.redraw(jewels, function() {
					// do something
				});
			});
		});
	}
	
	return {
		run : run
	};
})();