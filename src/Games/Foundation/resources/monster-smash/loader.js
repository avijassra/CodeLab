var monster = {
		screens: {},
		settings: {
			rows: 8,
			cols: 8,
			maxDelay: 2000,
			duration: 30
		}
	},
	numPreload = 0,
	numLoaded = 0;

Modernizr.addTest("standalone", function() {
	return (window.navigator.standalone != false);
});

// extend yepnope with preloading
yepnope.addPrefix("preload", function(resource) {
	resource.noexec = true;
	return resource;
});

//extend yepnope with preloading
yepnope.addPrefix('loader', function (resource) {
	console.log('Loading: ' + resource.url);
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	numPreload++;
	resource.autoCallback = function(e) {
		console.log('Finished loading: ' + resource.url);
		numLoaded++;
		if(isImage) {
			var image = new Image();
			image.src = resource.url;
			monster.image = image;
		}
	};
	
	return resource;
});

// wait until main document is loaded
window.addEventListener("load", function()
{	
	function getLoadProgress() {
		if (numPreload > 0) {
			return numLoaded / numPreload;
		} else {
			return 0;
		}
	}
	
	// loading stage 1
	Modernizr.load([
		{ 
			// these files are always loaded
			load : [
				"loader!resources/sizzle.js",
				"loader!resources/sizzle-dom-ext.js",
				"loader!resources/monster-smash/game.js",
				"loader!resources/monster-smash/screen.splash.js",
				"loader!resources/monster-smash/screen.menu.js",
				"loader!resources/monster-smash/screen.game.js"
			],
			complete: function() {
				monster.game.setup();
				monster.game.showScreen('splash-screen', getLoadProgress);
			}
		}/*, {
			test: Modernizr.standalone,
			yep: "resources/jewel-warrior/screen.splash.js",
			nope: "resources/jewel-warrior/screen.install.js",
			complete : function() {
				// do something
			}
		}*/]);
	/*	
	// loading stage 2
	if (Modernizr.standalone) { 
		Modernizr.load([
			{
				test: Modernizr.webworkers,
				yep: [
					"loader!resources/jewel-warrior/board.worker-interface.js",
					"preload!resources/jewel-warrior/board.worker.js"
				],
				nope: "loader!resources/jewel-warrior/board.js"
			}, {
				load: [
					"loader!resources/jewel-warrior/input.js",
					"loader!resources/jewel-warrior/display.canvas.js",
					"loader!resources/jewel-warrior/screen.main-menu.js",
					"loader!resources/jewel-warrior/screen.game.js",
					"loader!resources/jewel-warrior/images/jewel" + jewel.settings.jewelSize + ".png",
				]
			}]);
	}
	*/
	 
}, false);