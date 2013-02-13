monster.screens['menu-screen'] =(function() {
	var isFirstRun = true
		$ = dom.$;
	
	function setup() {
		dom.bind('button', 'click', function(e) {
			monster.game.showScreen(e.target.name);
		});
	}
	
	function run() {
		if (isFirstRun) {
			setup();
			isFirstRun = false;
		}
	}
	
	return {
		run: run
	}
})();