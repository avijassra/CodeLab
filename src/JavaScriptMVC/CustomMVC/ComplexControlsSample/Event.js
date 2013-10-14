function Event(sender) {
	this._sender = sender;
	this._listeners = [];
}

Event.prototype = {
	attach: function(listener) {
		this._listeners.push(listener);
	},
	notify: function(args) {
		for(var index = 0, listener; listener = this._listeners[index++];) {
			listener(this._sender, args);
		}
	}
};