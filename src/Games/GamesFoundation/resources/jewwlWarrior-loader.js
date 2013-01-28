var jewel = {};
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
		"resources/jewwlWarrior-game.js"
		],
		// called when all files have finished	loading and executing
		complete : function() {
			jewel.game.showScreen('splash-screen');
		}
	} ]);
}, false);