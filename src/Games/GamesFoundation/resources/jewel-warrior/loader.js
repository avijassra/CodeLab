var jewel = {
	screens: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7
	}
};

Modernizr.addTest("standalone", function() {
	return (window.navigator.standalone != false);
});

// extend yepnope with preloading
yepnope.addPrefix("preload", function(resource) {
	resource.noexec = true;
	return resource;
});
// loading

// wait until main document is loaded
window.addEventListener("load", function()
{
	// loading stage 1
	Modernizr.load([
		{ 
			// these files are always loaded
			load : [
				"resources/sizzle.js",
				"resources/sizzle-dom-ext.js",
				"resources/jewel-warrior/game.js"
			]
		}, {
			test: Modernizr.standalone,
			yep: "resources/jewel-warrior/screen.splash.js",
			nope: "resources/jewel-warrior/screen.install.js",
			complete : function() {
				// called when all files have finished	loading and executing		
				if (Modernizr.standalone) {
					jewel.game.showScreen('splash-screen');
				} else {
					jewel.game.showScreen('install-screen');
				}
			}
		}]);
		
	if (Modernizr.standalone) { 
		Modernizr.load([
			{
				load: [
					"resources/jewel-warrior/screen.main-menu.js",
				]
			}, {
				test: Modernizr.webworkers,
				yep: [
					"resources/jewel-warrior/board.worker-interface.js",
					"preload!resources/jewel-warrior/board.worker.js"
				],
				nope: "resources/jewel-warrior/board.js"
			}]);
	}
	 
}, false);