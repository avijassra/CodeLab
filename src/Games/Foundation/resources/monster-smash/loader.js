var jewel = {
		screens: {},
		settings: {
			rows: 8,
			cols: 8,
			baseScore: 100,
			numJewelTypes: 7,
			controls: {
				KEY_UP: 'moveUp',
				KEY_LEFT: 'moveLeft',
				KEY_DOWN: 'moveDown',
				KEY_RIGHT: 'moveRight',
				KEY_ENTER: 'selectJewel',
				KEY_SPACE: 'selectJewel',
				CLICK: 'selectJewel',
				TOUCH: 'selectJewel'
			}
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
			jewel.image = image;
		}
	};
	
	return resource;
});

// wait until main document is loaded
window.addEventListener("load", function()
{
	// determine jewel size
	var jewelProto = document.getElementById('jewel-proto'),
		rect = jewelProto.getBoundingClientRect();
	
	// save the jewel size in the settings
	jewel.settings.jewelSize = rect.width;
	
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
				"resources/sizzle.js",
				"resources/sizzle-dom-ext.js",
				"resources/jewel-warrior/game.js"
			]
		}, {
			test: Modernizr.standalone,
			yep: "resources/jewel-warrior/screen.splash.js",
			nope: "resources/jewel-warrior/screen.install.js",
			complete : function() {
				jewel.game.setup();
				// called when all files have finished	loading and executing		
				if (Modernizr.standalone) {
					jewel.game.showScreen('splash-screen', getLoadProgress);
				} else {
					jewel.game.showScreen('install-screen');
				}
			}
		}]);
		
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
	 
}, false);