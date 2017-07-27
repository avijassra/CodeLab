/**
* The View. View presents the model and provides
* the UI events. The controller is attached to these
* events to handle the user interraction.
*/
function ListView(model, elements) {
	this._model = model;
	this._elements = elements;
	// Events
	this.listModified = new Event(this);
	this.addButtonClicked = new Event(this);
	this.delButtonClicked = new Event(this);
	
	var _this = this;
	
	// new item added to list
	this._model.itemAdded.attach(function() {
		_this.rebuildList();
	});
	
	// item removed from the list
	this._model.itemRemoved.attach(function() {
		_this.rebuildList();
	});
	
	// html list control change event
	this._elements.list.bind('change', function(e) {
		_this.listModified.notify({ index: e.target.selectedIndex });
	});
	
	// html add button click event
	this._elements.addButton.bind('click', function(e) {
		_this.addButtonClicked.notify();
	});
	
	// html delete button click event
	this._elements.delButton.bind('click', function(e) {
		_this.delButtonClicked.notify();
	});
}

ListView.prototype = {
	show: function() {
		this.rebuildList();
	},
	rebuildList: function() {
		var list, items, key;
		list = this._elements.list;
		list.html('');
		items = this._model.getItems();
		for (key in items) {
			if (items.hasOwnProperty(key)) {
				list.append($('<option>' + items[key] + '</option>'));
			}
		}
		this._model.setSelectedIndex(-1);
	}
};