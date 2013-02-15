monster.screens['game-screen'] = (function() {
	var isFirstRun = true,
		settings = monster.settings,
		$ = dom.$, cols, rows;
	
	function setup() {
		var menuLink = $('span.link')[0];
		
		monster.display.run();
		
		dom.bind(menuLink, 'click', function() {
			var screenId = this.getAttribute('data-screenId');
			monster.game.showScreen(screenId);
		});
	}
	
	function run(getLoadProgress) {
		if (isFirstRun) {
			setup();
			isFirstRun = false;
		}
	}

	return {
		run: run,
	};
})();