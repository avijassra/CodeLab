monster.screens['game-screen'] = (function() {
	var isFirstRun = true,
		$ = dom.$;
	
	function setup() {
		
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