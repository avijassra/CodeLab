shd.Control.SectionView = function(id) {
	this._id = id;
	this._controls = document.querySelector('#section_' + id).getElementsByClassName('control');
}

shd.Control.SectionView.prototype = {
	controlOptions: function() {
		var options = [];
		
		for(var i = 0, elem; elem = this._controls[i++];) {
			options.push($(elem).data('options'));
		}
		
		return options;
	},
};
