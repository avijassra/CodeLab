monster.game = (function() {
	var isFirstRun = true,
		$ = dom.$;
	
	function showScreen(screenId) {
		var activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenId)[0], 
			args;
			
		// remove active class from current active screen
		if (activeScreen) {
			dom.removeClass(activeScreen, 'active');
		}
		// mark current selected screen as active screen
		dom.addClass(screen, 'active');
		// get other parameters that might me provide to function
		args = Array.prototype.slice.call(arguments, 1);
		
		monster.screens[screenId].run.apply(monster.screens[screenId], args);
	}
	
	function setup() {
		if (isFirstRun) {
			createBackground();
			isFirstRun = false;
		}
	}
	
	function createBackground() {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			background = $('.background')[0],
			rect = background.getBoundingClientRect(),
			gradient,
			i;
			
		canvas.width = rect.width;
		canvas.height = rect.height;
		ctx.scale(rect.width, rect.height);
		
		// rect styling
		gradient = ctx.createRadialGradient(0.15, 0.25, 0.35, 0.25, 0.25, 0.90);
		gradient.addColorStop(0.1, 'rgb(255, 255, 255)');
		gradient.addColorStop(0.9, 'rgb(200, 200, 100)');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 1, 1);
		
		// lines
		ctx.strokeStyle = 'rgba(200, 200, 100, 0.2)';
		ctx.lineWidth = 0.008;
		ctx.beginPath();
		
		for (i=0; i<2; i+=0.020) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i - 1, 1);
		} 
		ctx.stroke();
		
		$('.background')[0].appendChild(canvas);
		
	}

	return {
		setup: setup,
		showScreen: showScreen
	};
})();