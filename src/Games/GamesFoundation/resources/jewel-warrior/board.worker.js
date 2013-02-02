// this is initialialize for the worker group thread. 
// Since jewel is initialize in UI thread hence it wont be accessible in the worker thread
var jewel = {}; 
// importing original board.js to all the functions
importScripts("board.js");
// add message event lister for worker
addEventListener("message", function(e) {
	var board = jewel.board,
		msg = e.data,
		d = msg.data;
		
	switch (msg.command) {
		case "initialize":
			jewel.settings = d;
			board.initialize(callback);
			break;
		
		case "swap":
			board.swap(d.x1, d.y1, d.x2, d.y2, callback);
			break;
	}
	
	function callback(data) {
		postMessage({
			id: msg.id,
			data: data,
			jewels: board.getBoard()
		});
	}
}, false);