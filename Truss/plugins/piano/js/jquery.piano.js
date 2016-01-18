;
(function ($, window, document, undefined) {
    'use strict';

    $.fn.piano = function (userOptions) {
        var pluginOpts = $.extend(true, {}, $.fn.piano.defaultsOptions, userOptions);
        var base = $(this),
            baseObj = this,
            thisTab = false,
            windowWidth = false,
            maxHeight = 60,
            mediaQueryMax = 667,
            pianoWidth = 0,
            tabMarginRight = 0, // number of childnodes * 5px margin on (.tabs) class  
            headingWidth = 0,
            index = 0;
        var firstIndex, lastIndex, nextFirstIndex, nextLastIndex, childNodes, openTabSize, whichHeading, whichMarkup = false;
        var piano = {
            play: function () {
                base.each(function () {
                    var _base = $(this);
                    config.runFunctions();
                });
            }
        };
        var config = {
            runFunctions: function () {
                this.windowWidth();
                this.createContainer();
                this.runDefault();
                this.navigate();
                this.openTab();
            },
            createContainer: function () {
                base.each(function () {
                    var _base = $(this);

                    childNodes = _base.children();
                    _base.addClass('piano').wrap('<div class="pianoCase"></div>');
                    $('.pianoCase').prepend('<span id="prev"><i class="fa fa-chevron-circle-left fa-5x"></i></span>');
                    $('.pianoCase').append('<span id="next"><i class="fa fa-chevron-circle-right fa-5x"></i></span>');


                    childNodes.each(function () {
                        $(this).addClass('tabs hidden deactive');
                        whichHeading = this.children[0].nodeName;
                        whichMarkup = this.children[1].nodeName;

                        // number of childnodes * 5px marginRight on (.tabs) class + 40px paddingright and left
                        // needs some work !!!
                        tabMarginRight = (childNodes.length * 5) + 40;

                        var tempHeight = $(this).find(whichHeading).outerHeight();

                        ((tempHeight > maxHeight) && (windowWidth > mediaQueryMax)) ? maxHeight = tempHeight: maxHeight = maxHeight;
                        if (windowWidth > mediaQueryMax)
                            $(this).find(whichMarkup).css({
                                width: (pluginOpts.openTabSize - tabMarginRight) // pluginOpts.openTabSize - tabMarginRight
                            });


                    });

                    // making the tabs equal height 
                    $(this).find(whichHeading).css('min-height', maxHeight);

                    if (windowWidth > mediaQueryMax) $(this).find(whichMarkup).css('height', maxHeight);
                    

                    // position the left and right arrows
                    $('#prev, #next').css({
                        'top': (maxHeight / 2.5)
                    })

                    headingWidth = ($(this).find(whichHeading).outerWidth());
                    pianoWidth = (headingWidth * (childNodes.length)) + (pluginOpts.openTabSize);

                    if (windowWidth > mediaQueryMax) {
                        $('.piano').css({
                            width: pianoWidth,
                            minHeight: maxHeight
                        });
                    }
                    if (windowWidth > pianoWidth) {
                        $('#prev, #next').css('display', 'none');
                    }
                });
            },
            runDefault: function () {
                base.each(function () {
                    var _base = $(this);
                    childNodes = _base.children();
                    if ((pluginOpts.tabOpenDefault) && (windowWidth > mediaQueryMax)) {
                        childNodes.eq(0).removeClass('hidden deactive').addClass('active');
                        childNodes.eq(0).find(whichHeading).css({
                            minHeight: '40px',
                            width: (pluginOpts.openTabSize - tabMarginRight),
                            paddingTop: '10px',
                            paddingBottom: '5px'
                        });
                        childNodes.eq(0).find(whichMarkup).css({
                            paddingTop: '60px',
                            width: (pluginOpts.openTabSize - tabMarginRight)
                        });
                        openTabSize = pluginOpts.openTabSize;
                        $('#prev').css('display', 'none');

                    } else if (windowWidth <= mediaQueryMax) {

                        openTabSize = pluginOpts.mobileOpenTab;
                        childNodes.each(function () {
                            $(this).addClass('tabs hidden deactive').removeClass('active');
                        });
                    } else {
                        openTabSize = tabMarginRight;
                    }

                });
            },
            openTab: function () {
                
                base.each(function () {
                    var _base = $(this);

                    childNodes = _base.children();
                    childNodes.on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        index = childNodes.index(this);
                        var elem = e.target.nodeName;
                        if (elem === whichHeading) {

                            thisTab = childNodes.eq(index);

                            if (thisTab.hasClass('hidden')) {

                                childNodes.each(function () {
                                    $(this).addClass('hidden deactive').removeClass('active');
                                    $(this).find(whichHeading).css({
                                        background: 'RGBA(0, 0, 0, 0.7)',
                                        color: 'RGBA(255, 255, 255, 0.8)'
                                    });
                                });
                                childNodes.find(whichHeading).hover(function () {
                                    $(this).css("background-color", 'RGBA(255, 255, 255, 1)');
                                    $(this).css("color", "RGBA(0, 0, 0, 1)");
                                }, function () {
                                    $(this).css("background-color", "RGBA(0, 0, 0, 0.7)");
                                    $(this).css("color", 'RGBA(255, 255, 255, 0.8)');
                                });

                                thisTab.removeClass('hidden deactive').addClass('active');

                                if ((thisTab.hasClass('active')) && (windowWidth > mediaQueryMax)) {

                                    childNodes.each(function () {
                                        $(this).find(whichHeading).css({
                                            minHeight: maxHeight,
                                            width: '2.5em',
                                            paddingTop: 0,
                                            paddingBottom: 0

                                        });
                                    });
                                    // thisTab.addClass('deactive');


                                    thisTab.find(whichHeading).css({
                                        minHeight: '40px',
                                        width: (pluginOpts.openTabSize - tabMarginRight) + "px",
                                        paddingTop: '5px',
                                        paddingBottom: '5px'
                                    });
                                    thisTab.find(whichMarkup).css({
                                        paddingTop: '60px'
                                    });


                                    openTabSize = pluginOpts.openTabSize;
                                    pianoWidth = ((headingWidth) * (childNodes.length)) + (openTabSize);


                                    $('.piano').css({
                                        'width': pianoWidth + 'px',
                                        'position': 'relative',
                                        'transition-duration': '500ms'
                                    });
                                    if (windowWidth > pianoWidth) {
                                        $('#prev, #next').css('display', 'none');
                                    } else {
                                        $('#prev, #next').css('display', 'block');

                                    }


                                    if (index === 0) {
                                        $('#prev').css('display', 'none')
                                    } else if (index === childNodes.length - 1) {
                                        $('#next').css('display', 'none');
                                    }

                                    config.transform(index);
                                }

                            } else if ((!thisTab.hasClass('hidden')) && (windowWidth > mediaQueryMax)) {
                                if (thisTab.hasClass('active')) {
                                    thisTab.addClass('deactive');
                                    thisTab.find(whichHeading).css({
                                        minHeight: maxHeight,
                                        width: '2.5em',
                                        paddingTop: 0,
                                        paddingBottom: 0

                                    });
                                    thisTab.find(whichMarkup).css({
                                        paddingTop: '0px',
                                        minHeight: maxHeight
                                    });
                                }

                                thisTab.addClass('hidden deactive').removeClass('active');

                                openTabSize = tabMarginRight;
                                pianoWidth = ((headingWidth) * (childNodes.length)) + (openTabSize);



                                $('.piano').css({
                                    'width': pianoWidth + 'px',
                                    'position': 'relative',
                                    'transition-duration': '500ms'
                                });
                                if (windowWidth > pianoWidth) {
                                    $('#prev, #next').css('display', 'none');
                                } else {
                                    $('#prev, #next').css('display', 'block');

                                }

                                config.transform(index);

                            }

                            $(window).bind('resize.piano', function () {
                                setTimeout(function () {
                                    config.transform(index);
                                }, 200);
                            });
                        }
                    });
                });
            },
            navigate: function () {
                base.each(function () {
                    var _base = $(this);
                    childNodes = _base.children();

                    firstIndex = 0;
                    lastIndex = childNodes.length;

                    nextFirstIndex = 0;
                    nextLastIndex = childNodes.length;
                    // eventlisteners for the previous and next arrows
                    $('body').on('click', '#prev', function () {
                        var tabCount = (windowWidth - tabMarginRight) / (headingWidth);

                        $('#next').css('display', 'block');
                        if (lastIndex >= 0 && firstIndex >= 0) {
                            config.transform(firstIndex - tabCount);
                            //lastIndex = lastIndex - 5;
                            if (firstIndex > 0) {
                                firstIndex -= tabCount;
                            }
                            if (firstIndex <= 0) {
                                firstIndex = 0
                            }
                            if (nextFirstIndex > 0) {
                                nextFirstIndex -= tabCount;
                            }
                            if (nextFirstIndex <= 0) {
                                nextFirstIndex = 0;
                            }
                        }
                    });

                    $('body').on('click', '#next', function () {

                        var tabCount = (windowWidth - tabMarginRight) / (headingWidth);

                        $('#prev').css('display', 'block');
                        if (nextFirstIndex <= nextLastIndex) {
                            config.transform(nextFirstIndex + tabCount);
                            if (nextFirstIndex <= childNodes.length) {
                                nextFirstIndex = nextFirstIndex + tabCount;
                            }
                            if (nextFirstIndex > childNodes.length) {
                                nextFirstIndex = childNodes.length;
                            }
                            if (firstIndex <= childNodes.length) {
                                firstIndex += tabCount;
                            }
                            if (firstIndex > childNodes.length) {
                                firstIndex = childNodes.length;
                            }
                        }
                    });


                });

            },
            supportTransition: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                return support() || false;
            },
            transform: function (index) {
                var bodyW = $('body').width();

                var middlePage = (bodyW / 2) - (headingWidth / 2);
                var left = ((headingWidth) * index - 1) - middlePage + (openTabSize / 2);
                if (left > (pianoWidth - bodyW)) {
                    left = pianoWidth - bodyW;
                }
                if (left < 0) {
                    left = 0;
                }
                if ((this.supportTransition()) && (windowWidth > pluginOpts.mobileOpenTab)) {
                    $('.piano').css('transform', 'translate3d(-' + left + 'px, 0px, 0px)');
                } else {
                    $('.piano').animate({
                        left: -left + "px"
                    }, 500);
                }
            },
            windowWidth: function () {
                var resize = function () {
                    windowWidth = $(window).width();
                };
                $(window).bind('resize.photoApp', resize());

            }

        };

        piano.play();
        return this;
    };

    $.fn.piano.defaultsOptions = {
        tabOpenDefault: true,
        openTabSize: 600,
        mobileOpenTab: 300
    };

})(jQuery, window, document);



function log(stuff) {
    return console.log(stuff);
}
