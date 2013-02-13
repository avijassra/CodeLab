monster.screens['splash-screen'] = (function() {
	var isFirstRun = true,
		$ = dom.$;
	
	function setup(getLoadProgress) {
		var scr = $('#splash-screnn')[0],
			contBtn = $('#splash-continue')[0],
			red = 255,
			green = 255, 
			blue = 255,
			checkProgressTimeoutId;
		
		function checkProgress() {
			var p = getLoadProgress() * 100,
				indicator = $('#progress-indicator')[0],
				progress = $('.progress', scr)[0];
			
			indicator.style.width = p + '%';
			
			if (p === 100) {
				clearTimeout(checkProgressTimeoutId);
				contBtn.style.display = 'block';
				dom.bind(contBtn, 'click', function() {
					monster.game.showScreen('menu-screen');
				});
			} else {
				red -= 10;
				green -= 10;
				blue -= 10;
				
				indicator.style['background-color'] = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
				progress.style['background-color'] = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
			}
		
			checkProgressTimeoutId = setTimeout(checkProgress, 100);
		}
		
		checkProgress();
	}
	
	function run(getLoadProgress) {
		if (isFirstRun) {
			setup(getLoadProgress);
		}
	}

	return {
		run: run,
	};
})();