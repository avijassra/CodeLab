var jewel = {
	screens: {}
};
// wait until main document is loaded
window.addEventListener("load", function()
{
	// start dynamic loading
	Modernizr.load([
	{ 
		// these files are always loaded
		load : [
		"resources/sizzle.js",
		"resources/sizzle-dom-ext.js",
		"resources/jewelWarrior-game.js",
		"resources/jewelWarrior-screen.splash.js",
		"resources/jewelWarrior-screen.main-menu.js"
		],
		// called when all files have finished	loading and executing
		complete : function() {
			jewel.game.showScreen('splash-screen');
		}
	},
 ]);
}, false);