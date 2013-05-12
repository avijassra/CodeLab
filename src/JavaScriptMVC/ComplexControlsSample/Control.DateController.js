shd.Control.DateController = function(format, options, date) {
	this._model = new shd.Control.DateModel(format, options.from, options.to);;
	this._view = new shd.Control.DateView(this._model, options.cid);
	
	var _this =  this;
	
	this._view.onDateChanged.attach(function(sender, args) {
		_this._model.setValue(args);
	});
	
	this._model.listChanged.attach(function(sender, args) {
		_this._view.rebuild(args);
	});
	
	this.show(date);
}

shd.Control.DateController.prototype = {
	show: function(date) {
		this._view.show(date);
	},
	getValue: function() {
		return this._model.getValue();
	}
};