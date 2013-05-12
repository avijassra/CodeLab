shd.Control.SectionController = function(id) {
	debugger;
	this._view = new shd.Control.SectionView(id);
	this._controllers = [];
	
	var options = this._view.controlOptions();
	
	for(var i = 0, opt; opt = options[i++];) {
		this._controllers.push(new shd.Control[opt.type + 'Controller']('mm/dd/yy', opt));
	}
}

shd.Control.SectionController.prototype = {
	getValue: function() {
		return this._controllers.length;
	}
};