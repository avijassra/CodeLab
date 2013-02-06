jewel.screens["game-screen"] = (function() {
	var board = jewel.board,
		display = jewel.display;
	
	function run() {
		board.initialize(function() {
			display.initialize(function() {
				// start the game
			});
		});
	}
	
	return {
		run : run
	};
})();