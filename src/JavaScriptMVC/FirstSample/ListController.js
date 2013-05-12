/**
* The Controller. Controller responds to user actions and
* invokes changes on the model.
*/
function ListController(model, view) {
	this._model = model;
	this._view = view;
	
	var _this = this;
	
	// list modified event
	this._view.listModified.attach(function (sender, args) {
		_this.updateSelected(args.index);
	});
	// add button click event
	this._view.addButtonClicked.attach(function() {
		_this.addItem();
	});
	// delete button click event
	this._view.delButtonClicked.attach(function() {
		_this.delItem();
	});
}

ListController.prototype = {
	addItem: function() {
		var item = window.prompt('Add Item:', '');
		if(item) {
			this._model.addItem(item);
		}
	},
	delItem: function() {
		var index;
		index = this._model.getSelectedIndex();
		if(index !== -1) {
			this._model.removeItemAt(index);
		}
	},
	updateSelected: function(index) {
		this._model.setSelectedIndex(index);
	}
}