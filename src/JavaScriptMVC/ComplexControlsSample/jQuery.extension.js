(function($) {
	$.fn.extend({
		date: function() {
			var $selector = this, options, controller;
			
			if($selector.length > 0) {
				for(var i = 0, elem; elem = $selector[i++];) {
					options =  $(elem).data('options');
					(new shd.Control.DateController('mm/dd/yy', options)).show();
				}
			}
		}
	});
})(jQuery);