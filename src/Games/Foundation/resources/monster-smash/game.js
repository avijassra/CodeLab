monster.game = (function() {
	var $ = dom.$;
	
	function showScreen(screenId) {
		var activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenId)[0], 
			args;
			
		// remove active class from current active screen
		if (activeScreen) {
			dom.removeClass(activeScreen, 'active');
		}
		// get other parameters that might me provide to function
		args = Array.prototype.slice.call(arguments, 1);
		
		monster.screens[screenId].run.apply(monster.screens[screenId], args);
		// mark current selected screen as active screen
		dom.addClass(screen, 'active');
	}
	
	function setup() {
	}
	
	function createBackground() {
	}

	return {
		setup: setup,
		showScreen: showScreen
	};
})();