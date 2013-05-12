shd.Control.DateView = function(model, cid) {
	this._cid = cid;
	this._model = model;
	this._elements = {
		container: $('#container_ques_' + this._cid),
		errMsg: $('#errMsg_ques_' + this._cid),
		month: $('#month_ques_' + this._cid),
		day: $('#day_ques_' + this._cid),
		year: $('#year_ques_' + this._cid)
	};
	
	this.onDateChanged = new Event(this);
	
	var _this = this,
		monthElem = this._elements.month,
		dayElem = this._elements.day,
		yearElem = this._elements.year;
		
	monthElem.add(dayElem).add(yearElem)
		.bind('change', function(e) {
			var monthElem = _this._elements.month,
				dayElem = _this._elements.day,
				yearElem = _this._elements.year;
				
			_this.onDateChanged.notify({
				month: monthElem.val(),
				day: dayElem.val(),
				year: yearElem.val()
			});
		});
}

shd.Control.DateView.prototype = {
	show: function(date) {
		this.rebuild(date);
	},
	rebuild: function(date) {
		var model = this._model.getItems(),
			monthElem = this._elements.month,
			dayElem = this._elements.day,
			yearElem = this._elements.year;
		
		this.hideError();
		
		monthElem.html('');
		for(var i = 0, item; item = model.monthList[i++];) {
			monthElem.append('<option value="' + item + '" >' + item + '</option>');
		}
		dayElem.html('');
		for(var i = 0, item; item = model.dayList[i++];) {
			dayElem.append('<option value="' + item + '" >' + item + '</option>');
		}
		yearElem.html('');
		for(var i = 0, item; item = model.yearList[i++];) {
			yearElem.append('<option value="' + item + '" >' + item + '</option>');
		}
		this.setDate(date);		
	},
	setDate: function(date) {
		if(date) {
			this._elements.month.val(date.month);
			this._elements.day.val(date.day);
			this._elements.year.val(date.year);
		}
	},
	hideError: function() {
		var errMsgElem = this._elements.errMsg;
			
		if(errMsgElem.length > 0) {
			errMsgElem.hide();
		}
	},
	showError: function(msg) {
		var containerElem = this._elements.container,
			errMsgElem = this._elements.errMsg;
			
		if(errMsgElem.length === 0) {
			this._elements.errMsg = containerElem.prepend('<div id="errMsg_ques_' + this._cid + '"></div>');
		}
		
		errMsgElem.html(msg);
	}
};
