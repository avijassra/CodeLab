// ******************************************************
// Date: Oct 04, 2012
// Author: Avi Jassra
// Description: This is custom overlay plugin created for CA4 (commonapp.org).
// Version: 1.0.00
// Full source at https://github.com/avijassra/jqPlug
// ******************************************************

// check if jquery core is loaded
if (!$.isFunction($._jqPlugCore)) {
	throw "jquery.jqplug-core.js is required for jqplug plugins";
}

var ajaxEventsNamespace = "ovrlyEvent";

var ovrly = function () {
	var cache = [],
		// modal container html
		modalCont = '<div id="{0}" class="ovrly-bg" style="background-color:#000; z-index: {1};" ></div>',
		// z-index of the first overlay
		zIndex = 1001,
		// modal overlay properties
		prop = {
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
			return cache.length;
		},
		/*
		return the cache obj by index
		*/
		updateCacheByIndex: function (id, obj) {
			cache[id - 1] = obj;
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
			var styles = '<style id="ovrlyStyle" type="text/css">div.ovrly-bg{position:fixed;left:0;right:0;top:0;bottom:0;background-color:#000;opacity:0.4;filter:alpha(opacity=40);display:none;overflow:hidden;}.ovrly-box{position:fixed;display:none;}html.o-bg-no-scroll, body.o-bg-no-scroll{overflow:hidden !important;}</style>';

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
}();

(function ($) {
	$.fn.extend({
		/* show overlay content */
		showOverlay: function (options) {
			var $elem = this,
				$cont,
				defOpts = {
					data: null,
					onOpen: null,
					closeOnEsc: false,
					removeOnClose: false,
					onBeforeClose: null,
					onClose: null,
					focusOnClose: null,
					isChange: false
				},
				/* final overlay options merged with default and global options */
				opts = ovrly.getUpdateOptions(defOpts, options),
				contId;

			/* element for overlay content exists */
			if ($elem.length === 0) {
				throw 'element not present to be set as overlay';
			}

			/* selected element can only be one element for the div */
			if ($elem.length > 1) {
				throw 'only one element can be set as overlay';
			}

			/* 1. element is appended to body if it does not exists already
			 2. if exists, then they are moved to body level*/
			$elem.appendTo('body');

			var $currCntnt = $('.ovrly-box.jqtoc'),
				$ovrlyBg = $('.ovrly-bg');

			/* checks if its screen change then pre-existing overlay should be present */
			if (opts.isChange) {
				if ($currCntnt.length === 0 && $ovrlyBg.length === 0) {
					opts.isChange = false;
				}
			}

			/* check if the overlay style exists & if not, insert it to body */
			ovrly.styleCheck();
			/* remove jqtoc from current ovrly-box class elements */
			$currCntnt.removeClass('jqtoc');

			/* set up overlay */
			if (opts.isChange) {
				contId = $currCntnt.attr('cont-id');
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
						var $ovrPopup = $('.ovrly-box.jqtoc'),
							opts = ovrly.cacheByIndex($ovrPopup.attr('obj-id'));

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
			var $elem = this,
				id = $elem.attr('cont-id'),
				winWidth = $(window).width(),
				winHeight = $(window).height(),
				computedElemStyle = window.getComputedStyle($elem[0], null),
				pdLft = parseInt(computedElemStyle.getPropertyValue('padding-left')),
				pdRgt = parseInt(computedElemStyle.getPropertyValue('padding-right')),
				pdTop = parseInt(computedElemStyle.getPropertyValue('padding-top')),
				pdBtm = parseInt(computedElemStyle.getPropertyValue('padding-bottom')),
				left,
				top;

			if (!elemWidth) {
				elemWidth = $elem.width();
			}

			if (!elemHeight) {
				elemHeight = $elem.height();
			}

			left = (winWidth - elemWidth - pdLft - pdRgt) / 2;
			top = (winHeight - elemHeight - pdTop - pdBtm) / 2;

			//console.log('win Width: ' + winWidth + ' | win Height: ' + winHeight + ' |  elem Width: ' + elemWidth + ' | elem Height: ' + elemHeight + ' | left: ' + left + ' | top: ' + top);
			$elem.css({ 'top': top, 'left': left });

			return $elem;
		},
		/* set overlay background */
		_setBackground: function () {
			var $elem = this,
				contId = $elem.attr('cont-id'),
				$cont = $('#' + contId);

			if ($cont.length === 0) {
				contId = $.uniqId();
				$cont = $(ovrly.getContStr(contId)).appendTo('body');
				$('body, html').addClass('o-bg-no-scroll');
				$elem.attr('cont-id', contId);
			}

			return $elem;
		},
		/* set overlay content */
		_setContent: function (opts) {
			var $elem = this,
				cacheLen,
				ind;

			if (!$elem.attr('ovrly-box')) {
				$elem.addClass('ovrly-box jqtoc' + (opts.removeOnClose ? ' jqroc' : '')).css({ 'z-index': ovrly.getZIndex() });

				$('a.o-close', $elem)
					.unbind('.overlayEvents')
					.bind('click.overlayEvents', function (e) {
						$(this).closest('.ovrly-box.jqtoc').hideOverlay();
						e.stopPropagation();
						e.preventDefault();
					});

				if (!opts.focusOnClose) {
					opts.focusOnClose = $("*:focus");
				}

				cacheLen = ovrly.newCache({ data: opts.data, closeOnEsc: opts.closeOnEsc, onBeforeClose: opts.onBeforeClose, onClose: opts.onClose, currFocus: opts.focusOnClose });
				$elem.attr('obj-id', cacheLen);
			} else {
				if (!opts.focusOnClose) {
					opts.focusOnClose = $("*:focus");
				}

				ind = $elem.attr('obj-id');
				ovrly.updateCacheByIndex(ind, { data: opts.data, closeOnEsc: opts.closeOnEsc, onBeforeClose: opts.onBeforeClose, onClose: opts.onClose, currFocus: opts.focusOnClose });
				$elem.addClass('jqtoc');
			}

			return $elem;
		},
		/* set overlay content */
		_popup: function (onOpen, isChange, data) {
			var $elem = this;
			if (!isChange) {
				$('#' + $elem.attr('cont-id')).fadeIn(100);
			}
			$elem.popupPosit().delay(150).fadeIn(200, function () {
				$(this)._setFocus();
				if (onOpen) {
					if (typeof (onOpen) === 'function') {
						onOpen(data);
					} else if (ajaxEventsNamespace) {
						eval(ajaxEventsNamespace + '["' + onOpen + '"](' + data + ')');
					}
				}
			});

			return $elem;
		},

		_setFocus: function () {
			var $this = this,
				$focElem = $('.jq-o-focus', $this),
				$focusableElements = $('a[href][tabindex!="-1"], area[href][tabindex!="-1"], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe[tabindex!="-1"], object[tabindex!="-1"], embed[tabindex!="-1"], *[tabindex][tabindex!="-1"], *[contenteditable][tabindex!="-1"]');

			if ($focElem.length > 0) {
				$focElem.first().focus();
			} else {
				$('input:first', $this).focus();
			}

			$focusableElements.addClass('jqNFE').attr('tabindex', -1);
			// avi: this a not very neat way to doing it. The above line is picking up the elements from the active overlay content.
			// This line is a safety net to remove tabindex and jqNFE class from highlighted overlay content box
			$this.find('.jqNFE').removeClass('jqNFE').removeAttr('tabindex');
		},
		/* for the element to check if it can be focused */
		_canFocus: function () {
			return !this.hasClass('jqNFE');
		},
		/* realign's the position of the current overlay */
		realignOverlay: function () {
			if (this.isOverlay()) {
				this.popupPosit();
			} else {
				this.closest('.ovrly-box.jqtoc').popupPosit();
			}
		},
		/* remove all the classes and attritute required for overlay */
		_cleanOverlayContents: function ($elems) {
			this
				.each(function () {
					var $this = $(this);
					if ($this.hasClass('jqroc')) {
						$this.remove();
					} else {
						$this
							.removeAttr('cont-id obj-id')
							.removeClass('ovrly-box jqtoc');
					}
				});
			// remove O-BG-NO-SCROLL from body and html
			if (document.getElementsByClassName('ovrly-bg').length === 0) {
				$('body, html').removeClass('o-bg-no-scroll');
			}
		},
		/* hides the active overlay or goes back to previous content */
		hideOverlay: function (goPrevScrn, onReopen) {
			var $elem = this,
				clearEvents = true,
				$prevContent = [],
				cacheInd,
				opts,
				ret,
				newObjId,
				contId,
				ovrlyCount;

			if ($elem.hasClass('ovrly-box jqtoc')) {
				cacheInd = $elem.attr('obj-id');
				opts = ovrly.cacheByIndex(cacheInd);

				if (!opts) {
					throw "cache index not set at overlay initialization";
				}

				if (opts.onBeforeClose) {
					if (typeof opts.onBeforeClose === 'function') {
						ret = opts.onBeforeClose(opts.data);
					} else if (ajaxEventsNamespace) {
						eval(ajaxEventsNamespace + '["' + opts.onBeforeClose + '"](' + opts.data + ')');
					}
				}

				if (typeof ret == 'undefined') { ret = true; }

				if (ret) {
					contId = $elem.attr('cont-id');
					$elem
						.removeClass('jqtoc')
						.fadeOut(200, function () {
							var elem;
							if (!(opts.currFocus instanceof jQuery)) {
								opts.currFocus = $(opts.currFocus);
							}
							if (opts.currFocus.length > 0) {
								elem = opts.currFocus.get(0);
								// check if the element can be focused
								if (elem.focus() == true && elem.style.visibility != "hidden" && elem.style.display != "none" && elem.disabled != true) {
									opts.currFocus.focus();
								}
							}

							if (opts.onClose) {
								if (typeof opts.onClose === 'function') {
									opts.onClose(opts.data);
								} else if (ajaxEventsNamespace) {
									eval(ajaxEventsNamespace + '["' + opts.onClose + '"](' + opts.data + ')');
								}
							}
						});

					// check if the prev content screen exists
					if (goPrevScrn) {
						newObjId = cacheInd;
						// check if the goPrevScrn contains the screen id of the element to go to
						if (typeof (goPrevScrn) === 'string') {
							$prevContent = $(document.querySelector(goPrevScrn));

							if (!$prevContent) {
								throw 'no overlay element present with selector ' + goPrevScrn;
							}

							if (!$prevContent.hasClass('ovrly-box') || $prevContent.attr('cont-id') !== contId) {
								throw 'provided element is not part of this overlay container';
							}

							newObjId = $prevContent.attr('obj-id');
						} else {
							// loop thru the get prev content box until obj-id exists & element is not found with new obj-id and same cont-id
							while (newObjId && $prevContent.length === 0) {
								newObjId -= 1;
								$prevContent = $('.ovrly-box[cont-id="' + contId + '"][obj-id="' + newObjId + '"]:not(.jqsoc)')
							}

							if (!newObjId) {
								throw "Previous element not found";
							}
						}

						// set goPrevScrn to false to not prev element in the same container is found
						if (!newObjId || $prevContent.length === 0) {
							goPrevScrn = false;
						}
					}

					if (!goPrevScrn) {
						// if not going to previous screen then hide background masking too
						$('#' + contId)
							.fadeOut(300, function () {
								$(this).remove();
								$('.jqNFE').removeClass('jqNFE').removeAttr('tabindex');
								if (onReopen && typeof onReopen === 'function') {
									onReopen(opts.data);
								}

								$('.ovrly-box[cont-id="' + contId + '"]')._cleanOverlayContents();
							});
					}

					if (goPrevScrn) { // enters if user has to go to previous screen
						$prevContent.addClass('jqtoc');
						clearEvents = false; // document and window overlay events not to be cleared and cache not reset
						$prevContent.delay(150).fadeIn(200, function () {
							$(this)._setFocus();
							if (onReopen && typeof onReopen === 'function') {
								onReopen(opts.data);
							}
						});
					} else { // check if no other overlay is present on the screen 
						ovrlyCount = $('.ovrly-box[cont-id!="' + contId + '"]').length;
						if (ovrlyCount) { // check that overlay boxes do exists.
							do {
								$prevContent = $('.ovrly-box[obj-id="' + newObjId + '"][cont-id!="' + contId + '"]');
								if ($prevContent.length > 0) { // check if any elements exists with different contId and 
									clearEvents = false; // document and window overlay events not to be cleared and cache not reset
									$prevContent.addClass('jqtoc')
								} else {
									newObjId -= 1;
								}
							} while ($prevContent.length === 0 && newObjId);
						}
					}

					// if no overlay is present delete all events and reset cache too
					if (clearEvents) {
						$(document).unbind('.overlayEvents');
						$(window).unbind('.overlayEvents');
						ovrly.resetCache();
					}
				}

				/* clean up task to remove all the overlay backgrounds without any corresponding overlay contents*/
				$._removeUnusedOverlay();
			}
		},
		/* hide contain overlay of the current element */
		hideParentOverlay: function (screen, onReopen) {
			// select the parent ovleray box to hide
			this.closest('.ovrly-box.jqtoc').hideOverlay(screen, onReopen);
		},
		/* return true or false based on if selector div is an overlay content box or not */
		isOverlay: function () {
			// for every overlay box, class "ovrly-box" & "jqtoc" is added.
			// if these classes are not present, it means the current box is not been shown as overlay
			return this.is('.ovrly-box,.jqtoc');
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
		var $cntnts = $('.ovrly-box'),
			$filteredCntnts;
		$('.ovrly-bg').each(function (i, v) {
			$filteredCntnts = $cntnts.filter('[cont-id="' + v.getAttribute('id') + '"]');
			if ($filteredCntnts.length === 0 || !($filteredCntnts.hasClass('jqtoc') && $filteredCntnts.is(":visible"))) {
				$filteredCntnts._cleanOverlayContents();
				$(v).remove();
			}
		})
	}
})(jQuery);