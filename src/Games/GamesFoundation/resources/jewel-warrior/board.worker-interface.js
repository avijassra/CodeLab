jewel.board = (function () {
	var dom = jewel.dom,
		settings,
		worker,
		msgCount,
		callbacks;
		
	function initialize(callback) {
		settings = jewel.settings;
		rows = settings.rows;
		cols = settings.cols;
		msgCount = 0;
		callbacks = [];
		
		worker = new Worker("resources/jewel-warrior/board.worker.js");
		
		dom.bind(worker, "message", messageHandler);
		post("initialize", settings, callback);
	}
	
	function post(command, data, callback) {
		callbacks[msgCount] = callback;
		worker.postMessage({
			id: msgCount,
			command: command,
			data: data
		});
		
		msgCount++;
	}
	
	function swap(x1, y1, x2, y2, callback) {
		post("swap", {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2
			}, callback);
	}
	
	function getBoard() {
		post("getBoard");
	}
	
	function print() {
		post("print");
	}
	
	function messageHandler(e) {
		var msg = e.data,
			jewels = msg.jewels;
			
		if (callbacks[msg.id]) {
			callbacks[msg.id](msg.data, jewels);
			delete callbacks[msg.id];
		}
	}
	
	return {
		initialize: initialize,
		swap: swap,
		getBoard: getBoard,
		print: print
	};
})();