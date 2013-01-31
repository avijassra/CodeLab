var jewel = {
	screens: {},
	setting: {
		rows: 6,
		cols: 6,
		baseScore: 100,
		numJewelTypes: 5
	}
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
		"resources/jewelWarrior-screen.main-menu.js",
		"resources/jewelWarrior-board.js"
		],
		// called when all files have finished	loading and executing
		complete : function() {
			jewel.game.showScreen('splash-screen');
		}
	},
 ]);
}, false);