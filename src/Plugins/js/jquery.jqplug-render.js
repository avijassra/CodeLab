// ******************************************************
// Date: Nov 06, 2012
// Author: Avi Jassra
// Description: This is custom plugin to render string template.
// Version: 1.0.00
// Full source at https://github.com/avijassra/jqPlug
// ******************************************************

// check if jquery core is loaded
if(!$.isFunction($._jqPlugCore)) {
	throw "jquery.jqplug-core.js is required for jqplug plugins";
}

(function ($) { 
	$.fn.extend({
		/*
		string template for json or array of json
		*/
		renderWith: function (src, strTmpl) {
			var $elem = $(this);
			var arrStr = [];
			var genStr = '';
			// if src is json object, push it into array
			if (!$.isArray(src)) {
				var jsonSrc = src;
				src = [];
				src.push(jsonSrc);
			}
			// split format string into array
			var ind, formateStr, condEval, hasCond = false;
			while (strTmpl) {
				if (!hasCond) {
					ind = strTmpl.indexOf('{[if ');
					
					if(ind >=0 ) {
						formateStr = strTmpl.substring(0, ind);
						strTmpl = strTmpl.substring(ind);
						hasCond = true;
					} else {
						formateStr = strTmpl;
						strTmpl = null;
					}
					condEval = true;
				} else {
					ind = strTmpl.indexOf('{[/if]}');
					if(ind >= 0) {
						formateStr = strTmpl.substring(0, ind + 7);
						strTmpl = strTmpl.substring(ind + 7);
						formateStr = formateStr.replace('{[if ', '').replace('{[/if]}', '');
						ind = formateStr.indexOf(']}');
						condEval = formateStr.substring(0, ind);
						formateStr = formateStr.substring(ind + 2)
						// check for else condition
						ind = formateStr.indexOf('{[else]}');
						if(ind >= 0 ) {
							// add to array of string used to generate output using data
							arrStr.push({
								condEval: condEval,
								expectedEval: false,
								strTmpl: formateStr.substring(ind + 8)
							});
							// get the string for if condition only excluding else part
							formateStr = formateStr.substring(0, ind);
						} 
						hasCond = false;
					} else {
						throw "String to format has got in complete if condition";
					}
				}

				// add to array of string used to generate output using data
				arrStr.push({
					condEval: condEval,
					expectedEval: true,
					strTmpl: formateStr
				});
			}

			for (var i in src) {
				for(var j in arrStr) {
					var strObj = arrStr[j];
					if(strObj.condEval === true || (strObj.expectedEval && src[i][strObj.condEval]) || (!strObj.expectedEval && !src[i][strObj.condEval]) ) {
						strTmpl = strObj.strTmpl;
						for (var p in src[i]) {
							while (strTmpl.indexOf('{{' + p + '}}') >= 0) {
								strTmpl = strTmpl.replace('{{' + p + '}}', src[i][p]);
							}
						}
						genStr += strTmpl;					
					}
				}
			}
			$elem.html(genStr);

			return $elem;
		}
	});
})(jQuery);