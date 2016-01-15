/*
Plugin: Scroll Progressbar
Author: Misty Morreyn
Description: A stylized progressbar that shows your placement on the page.
*/

(function ($) {
    $.fn.articleScroller = function (opts) {
        var defaults = {
            backgroundColor: "rgba(207, 199, 150, .5)",
            dividerColor: "black"
        }

        var options = $.extend({}, defaults, opts);

        $(document).ready(function () {
            "use strict";

            $('.bar').css('background-color', options.backgroundColor);
            $('.right-scroll-area .markers li').css('border-top', '1px solid ' + options.dividerColor);
            $('.right-scroll-area .markers li:nth-of-type(5)').css('border-bottom', '1px solid ' + options.dividerColor);

            $('.top-scroll-area .markers li').css('border-left', '1px solid ' + options.dividerColor);
            $('.top-scroll-area .markers li:nth-of-type(5)').css('border-right', '1px solid ' + options.dividerColor);

            function scroller(element) {
                var elementHeight = $('.scroll').height(),
                    elementBegin = $(window).scrollTop() - $('.scroll').offset().top,
                    percent = Math.floor((elementBegin * 100) / elementHeight),
                    windowHeight = Math.ceil($(window).scrollTop() + $(window).height()),
                    docHeight = $(document).height();

                if (percent <= 0) {
                    $('.right-scroll-area .markers').hide();
                    $('.top-scroll-area .markers').hide();
                } else {
                    $('.right-scroll-area .markers').fadeIn();
                    $('.top-scroll-area .markers').fadeIn();
                }

                if (percent <= 100) {
                    $('.right-scroll-area .bar').css('height', percent + '%');
                    $('.top-scroll-area .bar').css('width', percent + '%');
                } else if (percent > 100) {
                    $('.right-scroll-area .bar').css('height', '100%');
                    $('.top-scroll-area .bar').css('width', '100%');
                }
            }

            scroller($('.scroll'));

            $(window).scroll(function (e) {
                scroller($('.scroll'));
            });
        }); // END MAIN PLUGIN FUNCTIONALITY

        // Detect if user is near end of doc and reduce throttling caused by detection:

        // Courtesy of James Padolsey to work on all browsers:
        function getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
        }
        // end courtesy mention.

        // Courtesy of geo1701 on stackoverflow:

        var _throttleTimer = null;
        var _throttleDelay = 100;
        var $window = $(window);
        var $document = $(document);

        $document.ready(function () {

            $window
                .off('scroll', ScrollHandler)
                .on('scroll', ScrollHandler);

        });

        function ScrollHandler(e) {
            //throttle event:
            clearTimeout(_throttleTimer);
            _throttleTimer = setTimeout(function () {

                if ($window.scrollTop() + $window.height() > getDocHeight() - 100) {
                    $('.right-scroll-area .bar').css('height', '100%');
                    $('.top-scroll-area .bar').css('width', '100%');
                }

            }, _throttleDelay);
        }
        // end courtesy mention.
        // end throttle detection.

    };
})(jQuery);