shd.Control.DateModel = function(format, fromYear, toYear) {
	this._format = format;
	this._dayList = this.completeDayList();
	this._fromYear = fromYear || 1900;
	this._toYear = toYear || ((new Date()).getFullYear() + 10);
	if(this._fromYear > this._toYear) {
		throw 'To year cannot be less than from year';
	}
	this._yearList = [];
	for(var i = this._fromYear; i <= this._toYear; i++) {
		this._yearList.push(i); 
	}
	this._selectedDate = { month: this.monthList()[0], day: this._dayList[0], year: this._yearList[0] };
	
	// Events
	this.listChanged = new Event(this);
}

shd.Control.DateModel.prototype = {
	monthList: function() {
		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	},
	completeDayList: function() {
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	},
	getItems: function() {
		return {
			monthList: this.monthList(),
			dayList: this._dayList,
			yearList: this._yearList
		};
	},
	getValue: function() {
		return this._selectedDate;
	},
	setValue: function(val) {
		this.checkAndUpdateDaysInMonth(this._selectedDate, val);
		this._selectedDate = val;
	},
	checkAndUpdateDaysInMonth: function(prevDate, currDate) {
		var prevMonth = prevDate.month,
			prevYear = prevDate.year,
			currMonth = currDate.month,
			currYear = currDate.year, 
			noOfDays;
			
		if (currMonth !== prevMonth || currMonth === 'Feb' && currYear !== prevYear) {
			if(currMonth === 'Feb') {
				noOfDays = (currYear%4 === 0 ? 29 : 28);
			} else if(currMonth === 'Apr' || currMonth === 'Jun' || currMonth === 'Sep' || currMonth === 'Nov') {
				noOfDays = 30;
			} else {
				noOfDays = 31;
			}
			this._dayList = this.completeDayList().slice(0, noOfDays);
			this.listChanged.notify(currDate);
		}
	}
};