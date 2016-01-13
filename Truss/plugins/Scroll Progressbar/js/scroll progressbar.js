/*
Plugin: Scroll Progressbar
Author: Misty Morreyn
Description: A stylized progressbar that shows your placement on the page.
*/

/*
Primary objective: 
    1. Show user's position in page/article by scroll progressbar.
    2. Make sure scroll progressbar is unobtrusive.
    3. Scroll progressbar is adapted to tablet and mobile screens.
    
Secondary objective: 
    1. When user selects scrollbar, go to where user selected on scrollbar within document.
*/

$(document).ready(function () {
    "use strict";

    var viewWidth = window.innerWidth,
        viewHeight = window.innerHeight,
        bodyHeight = $('body').height(),
        mbh = bodyHeight - viewHeight,
        maxlineheight = 506;

    $(window).scroll(function (e) {

        /*scrollTop finds the number of pixels hidden from view above the scrollable area*/
        var st = $('body').scrollTop();

        // Ratio of % scrolled 
        var y = ((st * maxlineheight) / mbh);
        var percentHidden = ((mbh - st) / mbh);
        percentHidden = Math.round(percentHidden * 10) / 10; /*Not quite working*/
        $('.line').css('height', y);

        console.log(percentHidden);
        if (percentHidden = 0) {
            $('.scroll-area').css("visibility", "hidden");
        } else {
            $('.scroll-area').css("visibility", "visible");
        }
    });
});