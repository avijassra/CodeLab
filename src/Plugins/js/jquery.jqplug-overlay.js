// ******************************************************
// Date: Oct 04, 2012
// Author: Avi Jassra
// Description: This is custom overlay plugin created for CA4 (commonapp.org).
// Version: 1.0.00
// Full source at https://github.com/avijassra/jqPlug
// ******************************************************

// check if jquery core is loaded
if(!$.isFunction($._jqPlugCore)) {
	throw "jquery.jqplug-core.js is required for jqplug plugins";
}

// overlay namespace for overlay functions
var ovrly = function () {
	var cache = [];
	// modal container html
	var modalCont = '<div id="{0}" class="ovrly-bg" style="background-color:#000; z-index: {1};" ></div>';
	// z-index of the first overlay
	var zIndex = 1001;

	// modal overlay properties
	var prop = {
		opacity: '0.6',
		top: null,
		left: null,
		border: '1px solid black'
	};

	return {
		/*
		return the cache count
		*/
		cacheCount: function () {
			return cache.length;
		},
		/*
		add new cache obj
		*/
		newCache: function (obj) {
			cache.push(obj);
		},
		/*
		return the cache obj by index
		*/
		cacheByIndex: function (id) {
			return cache[id - 1];
		},
		/*
		set the cache of index as null
		*/
		resetCache: function () {
			cache = [];
		},
		/*
		include overlay style if not present
		*/
		styleCheck: function () {
			// jqPlug overlay style
			var styles = '<style id="ovrlyStyle">div.ovrly-bg{position:fixed;left:0;right:0;top:0;bottom:0;background-color:#000;opacity:0.4;filter:alpha(opacity=40);display:none;overflow:hidden;}.ovrly-box{position:fixed;display:none;}</style>';

			if (!document.getElementById('ovrlyStyle')) {
				$(styles).appendTo($('head'));
			}
		},
		/*
		update the default options
		*/
		updateDefault: function (opts) {
			$.extend(prop, opts);
		},
		/*
		get updated options from curr, default and global
		*/
		getUpdateOptions: function (defOpts, opts) {
			return $.extend(defOpts, prop, opts);
		},
		/*
		get current used z-index
		*/
		getZIndex: function () {
			zIndex += 1;
			return zIndex;
		},
		/*
		get masked container
		*/
		getContStr: function (contId) {
			return $.stringFormat(modalCont, [contId, ovrly.getZIndex()]);
		}
	}
} ();

(function ($) {
	$.fn.extend({
		/* show overlay content */
		showOverlay: function (options) {
			var $elem = $(this);
			var $cont;

			var defOpts = {
				data: null,
				onOpen: null,
				closeOnEsc: false,
				onBeforeClose: null,
				onClose: null,
				isChange: false
			}

			/* final overlay options merged with default and global options */
			var opts = ovrly.getUpdateOptions(defOpts, options);

			/* element for overlay content exists */
			if ($elem.length === 0) {
				throw 'element not present to be set as overlay';
			}

			/* selected element can only be one element for the div */
			if ($elem.length > 1) {
				throw 'only one element can be set as overlay';
			}

			/* check if element is part of body or is new element to be added */
			if ($('body').find(this).length === 0) {
				$elem.appendTo('body');
			}

			var $currCntnt = $('.ovrly-box.jqtoc');
			/* checks if its screen change then pre-existing overlay should be present */
			if (opts.isChange) {
				if ($currCntnt.length === 0) {
					opts.isChange = false;
				}
			}

			/* check if the overlay style exists & if not, insert it to body */
			ovrly.styleCheck();
			/* remove jqtoc from current ovrly-box class elements */
			$currCntnt.removeClass('jqtoc');

			/* set up overlay */
			if (opts.isChange) {
				var contId = $currCntnt.attr('cont-id');
				$currCntnt.removeClass('jqtoc').fadeOut(200);
				$elem.attr('cont-id', contId);
			} else {
				$elem._setBackground();
			}

			$elem
				._setContent(opts)
				._popup(opts.onOpen, opts.isChange, opts.data);

			if (opts.closeOnEsc) {
				$(document)
					.unbind('.overlayEvents')
					.bind('keyup.overlayEvents', function (e) {
						var $ovrPopup = $('.ovrly-box.jqtoc');
						var opts = ovrly.cacheByIndex($ovrPopup.attr('obj-id'));
						if (e.keyCode === 27) {
							if (opts.closeOnEsc) {
								$ovrPopup.hideOverlay();
							}
						}
					});
			}

			$(window)
				.unbind('.overlayEvents')
				.bind('resize.overlayEvents', $.debouncer(function () {
					$('.ovrly-box.jqtoc').popupPosit();
				}));
		},
		/* set position of the overlay content */
		popupPosit: function (elemWidth, elemHeight) {
			var $elem = $(this);
			var id = $elem.attr('cont-id');
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			var computedElemStyle = window.getComputedStyle($elem[0], null);
			var pdLft = parseInt(computedElemStyle.getPropertyValue('padding-left'));
			var pdRgt = parseInt(computedElemStyle.getPropertyValue('padding-right'));
			var pdTop = parseInt(computedElemStyle.getPropertyValue('padding-top'));
			var pdBtm = parseInt(computedElemStyle.getPropertyValue('padding-bottom'));

			if (!elemWidth) {
				elemWidth = $elem.width();
			}

			if (!elemHeight) {
				elemHeight = $elem.height();
			}

			var left = (winWidth - elemWidth - pdLft - pdRgt) / 2;
			var top = (winHeight - elemHeight - pdTop - pdBtm) / 2;

			//console.log('win Width: ' + winWidth + ' | win Height: ' + winHeight + ' |  elem Width: ' + elemWidth + ' | elem Height: ' + elemHeight + ' | left: ' + left + ' | top: ' + top);
			$elem.css({ 'top': top, 'left': left });

			return $elem;
		},
		/* set overlay background */
		_setBackground: function () {
			var $elem = $(this);
			var contId = $elem.attr('cont-id');
			var $cont = $('#' + contId);
			if ($cont.length === 0) {
				contId = $.uniqId();
				$cont = $(ovrly.getContStr(contId)).appendTo('body');
				$elem.attr('cont-id', contId);
			}

			return $elem;
		},
		/* set overlay content */
		_setContent: function (opts) {
			var $elem = $(this);
			if (!$elem.attr('ovrly-box')) {
				$elem.addClass('ovrly-box jqtoc').css({ 'z-index': ovrly.getZIndex() });

				$('a.o-close', $elem)
					.unbind('click')
					.bind('click', function (e) {
						$(this).closest('.ovrly-box.jqtoc').hideOverlay();
						e.stopPropagation();
						e.preventDefault();
					});

				ovrly.newCache({ data: opts.data, closeOnEsc: opts.closeOnEsc, onBeforeClose: opts.onBeforeClose, onClose: opts.onClose, currFocus: $("*:focus") });
			} else {
				$elem.addClass('jqtoc');
			}

			$elem.attr('obj-id', ovrly.cacheCount());

			return $elem;
		},
		/* set overlay content */
		_popup: function (onOpen, isChange, data) {
			var $elem = $(this);
			if (!isChange) {
				$('#' + $elem.attr('cont-id')).fadeIn(100);
			}
			$elem.popupPosit().delay(150).fadeIn(200, function () {
				$(this)._setFocus();
				if (onOpen) {
					onOpen(data);
				}
			});

			return $elem;
		},

		_setFocus: function () {
			var $this = $(this);
			$('.jqNonFocusable').removeClass('jqNonFocusable').removeAttr('tabindex');
			$('input:not(.jqtoc input), textarea:not(.jqtoc input), button:not(.jqtoc button), select:not(.jqtoc select), a:not(.jqtoc a)').addClass('jqNonFocusable').attr('tabindex', -1);
			var $focElem = $('.jq-o-focus', $this);
			if ($focElem.length > 0) {
				$focElem.first().focus();
			} else {
				$('input:first', $this).focus();
			}
		},
		/* remove all the classes and attritute required for overlay */
		_cleanOverlayContents: function ($elems) {
			$(this)
				.removeAttr('cont-id obj-id')
				.removeClass('ovrly-box jqtoc');
		},
		/* hides the active overlay or goes back to previous content */
		hideOverlay: function (goPrevScrn, onReopen) {
			var $elem = $(this);
			if (!$elem.hasClass('ovrly-box jqtoc')) {
				throw "cannot hide non overlay content and non active content overlay";
			}
			var cacheInd = $elem.attr('obj-id');
			var opts = ovrly.cacheByIndex(cacheInd);

			if (!opts) {
				throw "cache index not set at overlay initialization";
			}

			var ret;

			if (opts.onBeforeClose) {
				ret = opts.onBeforeClose(opts.data);
			}

			if (typeof ret == 'undefined') { ret = true; }

			if (ret) {
				var contId = $elem.attr('cont-id');
				$elem
					.removeClass('jqtoc')
					.fadeOut(200, function() {
						opts.currFocus.focus();
						if (opts.onClose) {
							opts.onClose(opts.data);
						}
					});

				if (!goPrevScrn) {
					$('#' + contId)
						.delay(200)
						.fadeOut(100, function () {
							$(this).remove();
							$('.jqNonFocusable').removeClass('jqNonFocusable').removeAttr('tabindex');
							$('.ovrly-box[cont-id="' + contId + '"]')._cleanOverlayContents();
						});
				}

				var newObjId = ovrly.cacheCount() - 1;
				var clearEvents = true;
				if (newObjId) {
					if (goPrevScrn) { // enters if user has to go to previous screen
						var $prevContent = $('.ovrly-box[obj-id="' + newObjId + '"]').addClass('jqtoc');
						if($prevContent.length > 0) { // check element exists
							clearEvents = false; // document and window overlay events not to be cleared and cache not reset
							$prevContent.delay(150).fadeIn(200, function () {
								$(this)._setFocus();
								if (onReopen && typeof onReopen === 'function') {
									onReopen();// we can pass opts.data if needed
								}
							});
						}
					} else { // check if no other overlay is present on the screen 
						var ovrlyCount = $('.ovrly-box[cont-id!="' + contId + '"]').length;
						if(ovrlyCount) { // check that overlay boxes do exists.
							var esc = false;
							do{
								var $prevContent = $('.ovrly-box[obj-id="' + newObjId + '"][cont-id!="' + contId + '"]');
								if($prevContent.length > 0) { // check if any elements exists with different contId and 
									esc = true;
									clearEvents = false; // document and window overlay events not to be cleared and cache not reset
									$prevContent.addClass('jqtoc')
								} else {
									newObjId -= 1;
								}
							} while (!esc && newObjId);
						}
					}
				} 
				
				if(clearEvents) {
					$(document).unbind('.overlayEvents');
					$(window).unbind('.overlayEvents');
					ovrly.resetCache();
				}
			}

			/* clean up task to remove all the overlay backgrounds without any corresponding overlay contents*/
			$._removeUnusedOverlay();
		},
		/* hide contain overlay of the current element */
		hideParentOverlay: function (screen, onReopen) {
			// select the parent ovleray box to hide
			var $elem = $(this).closest('.ovrly-box.jqtoc');
			// check if the element exists
			if ($elem.length === 0) {
				throw "this element is not part of active overlay content";
			}
			// call hideOverlay on the overlay box
			$elem.hideOverlay(screen, onReopen);
		}
	});

	$.overlayDefault = function (options) {
		ovrly.updateDefault(options);
	}

	$.hideOverlay = function () {
		do {
			// loop thru all the active overlay boxes in order
			$('.ovrly-box.jqtoc').hideOverlay();
		} while ($('.ovrly-box.jqtoc').length > 0); // check if active overlay boxes exists
	}

	/* remove all unused overlays from the view */
	$._removeUnusedOverlay = function () {
		var $cntnts = $('.ovrly-box');
		$('.ovrly-bg').each(function (i, v) {
			var $filteredCntnts = $cntnts.filter('[cont-id="' + v.getAttribute('id') + '"]');
			if ($filteredCntnts.length === 0 || !$filteredCntnts.is(':visible')) {
				$(v).remove();
				$filteredCntnts._cleanOverlayContents();
			}
		})
	}
})(jQuery);