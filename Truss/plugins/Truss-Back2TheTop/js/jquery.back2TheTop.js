/*
 * Plugin: back2TheTop
 * A simple customizable plugin for scrolling BACK 2 THE TOP of the page
 * Author: Joseph McDonald
 * Version: 1.0.0
 * Updated: January 16 2016
 */
(function ($) {
	$.fn.back2TheTop = function (options) {
		// Defaults
		var defaults = {
			shownAt: 150, // px
			fadeSpeed: 2000, // ms
			scrollSpeed: 1000, // ms
			arrowImage: 'round-grey'
		};

		return this.each(function () {
			// extend merges objects of defaults & options
			var settings = $.extend({}, defaults, options), // Merge defaults + user options
				scrollBtn = $(this); // Current element (ex. DIV)
			//  ======================================================= 
			// Arrow Settings from the extend merged object of defaults & options
			if (settings.arrowImage == 'white') {
				scrollBtn.addClass('white');
			} else if (settings.arrowImage == 'red') {
				scrollBtn.addClass('red');
			} else if (settings.arrowImage == 'grey') {
				scrollBtn.addClass('grey');
			} else if (settings.arrowImage == 'green') {
				scrollBtn.addClass('green');
			} else if (settings.arrowImage == 'black') {
				scrollBtn.addClass('black');
			} else if (settings.arrowImage == 'round-blue') {
				scrollBtn.addClass('round-blue');
			} else if (settings.arrowImage == 'round-orange') {
				scrollBtn.addClass('round-orange');
			} else if (settings.arrowImage == 'round-green') {
				scrollBtn.addClass('round-green');
			} else if (settings.arrowImage == 'round-grey') {
				scrollBtn.addClass('round-grey');
			} else if (settings.arrowImage == 'round-corner-grey') {
				scrollBtn.addClass('round-corner-grey');
			} else if (settings.arrowImage == 'round-corner-black') {
				scrollBtn.addClass('round-corner-black');
			} else {
				scrollBtn.addClass('round-broken-line');
			}
			//  ======================================================= 
			// Add Click Event that will animate the scroll up
			scrollBtn.on("click", function (e) {
				e.preventDefault();
				$("html, body").animate({
						scrollTop: 0
					},
					settings.scrollSpeed);
			});
			//  ========================================  
			$(document).scroll(function () {
				// Determines when to show/hide scrollBtn using scrollTop() method
				// scrollTop() method gets current vertical position of scroll bar
				if ($(this).scrollTop() > parseInt(settings.shownAt)) {
					scrollBtn.fadeIn(settings.fadeSpeed);
				} else {
					scrollBtn.fadeOut(settings.fadeSpeed);
				}
			});
		});
	}
})(jQuery);