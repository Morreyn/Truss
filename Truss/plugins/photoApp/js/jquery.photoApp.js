;
(function ($, window, document, undefined) {
    'use strict';

    $.fn.photoApp = function (userOptions) {
        var pluginOpts = $.extend(true, {}, $.fn.photoApp.defaultsOptions, userOptions),
            base = $(this),
            baseObj = this,
            childNodes = undefined,
            index = 0,
            prevIndex = false,
            appRunning, _appContainer, _photosContainer, _photos, _photoEach, _prevPhoto, _nxtPhoto, _thumbsContainer, _thumbEach, windowWidth, _thisPhotoDate = false;

        var mobileDvice = ('ontouchstart' in window) || navigator.maxTouchPoints; // works on IE10/11 and Surface

        var photoApp = {
            createSortBtn: function () {
                base.each(function () {
                    var elem = $(this);
                    if ((pluginOpts.activateSort)) {
                        $(elem).before('<div id="buttons"><p><button id="dayView">Sort by Day</button></p><p><button id="monthView">Sort by Month</button></p><p><button id="yearView">Sort by Year</button></p></div>').addClass('responsiveContainer');
                    }

                    var buttons = $("#buttons"),
                        height = $('.header').height();

                    $(window).scroll(function () {
                        if ($(this).scrollTop() > height) {
                            buttons.addClass('stickyBtn');
                        } else {
                            buttons.removeClass('stickyBtn');
                        }
                    });


                });
            },
            runApp: function () {
                base.each(function () {
                    var _base = $(this);

                    if ((pluginOpts.sortOnLoad) && (pluginOpts.activateSort)) {
                        config.sortByDay(_base);
                    }

                    if ((pluginOpts.activateSort)) {
                        $('body').on('click', 'button', function (e) {
                            
                            if (e.currentTarget.id === 'yearView') {
                                config.sortByYear(_base);
                            } else if (e.currentTarget.id === 'monthView'){

                                config.sortByMonth(_base);
                            } else {
                                config.sortByDay(_base);
                            }

                            childNodes = _base.children();
                            childNodes.on('click', function (e) {

                                e.preventDefault();
                                e.stopPropagation();

                               

                                var target = e.target.nodeName;
                                // && !(_base.hasClass('monthView')) && !(_base.hasClass('yearView'))
                                if ((target == 'IMG')) {

                                    index = childNodes.index(this);
                                    prevIndex = index;
                                    config.run(index);
                                } 
                                
                            });
                        });
                    }

                    childNodes = _base.children();
                    _base.addClass('responsiveContainer');
                    childNodes.on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var targetElem = e.target.nodeName;
                        // for later use
                        //  && !(_base.hasClass('monthView')) && !(_base.hasClass('yearView'))
                        if ((targetElem == 'IMG')) {
                            index = childNodes.index(this);
                            prevIndex = index;
                            config.run(index);
                        }
                    });
                });
            }
        };
        var config = {
            sortByDay: function (elem) {
                elem.each(function () {
                    var $that = $(this),
                        photoDatesArray = [],
                        photosAlts = [];

                    $that.children().each(function () {
                        var tempContainer = $(this);
                        var dateOfPhoto = new Date(tempContainer.find('time').attr('datetime'));
                        photoDatesArray.push(dateOfPhoto.getTime());
                        var altOfPhoto = tempContainer.find('img').attr('alt');
                        photosAlts.push(altOfPhoto);

                    });
                    photoDatesArray.sort();

                    var _counter = 0,
                        newArray = photoDatesArray.sort(),
                        newHTMLDivs = '',
                        // may use it later
                        photoAltsArraySorted = [],
                        newDate = true;




                    while (_counter < ($that.children().length)) {

                        $that.children().each(function () {
                            var thisContainer = $(this);
                            //                            thisContainer.removeClass('clearFloat');
                            thisContainer.find('span').remove();
                            var thisPhotoDate = new Date(thisContainer.find('time').attr('datetime'));
                            thisPhotoDate = thisPhotoDate.getTime();
                            var thisPhotoAlt = thisContainer.find('img').attr('alt');

                            if ((jQuery.inArray(thisPhotoAlt, photosAlts) !== -1) && (jQuery.inArray(thisPhotoDate, newArray) !== -1) && (thisPhotoDate === newArray[0])) {

                                var thisPhotoDateTemp = (new Date(thisPhotoDate).toUTCString()).slice(0, 17);

                                if (newDate === true) {
                                    var spanExits = thisContainer.find('span').hasClass('dateView');
                                    if (!spanExits) {
                                        thisContainer.prepend('<span class="dateView">' + thisPhotoDateTemp + '</span>');
                                    }
                                    newDate = false;
                                }

                                if ((thisPhotoDate !== newArray[1])) {
                                    newDate = true;

                                }

                                newHTMLDivs += thisContainer.clone().wrap('<div>').parent().html();
                                photoAltsArraySorted.push(thisPhotoAlt);
                                newArray.splice(0, 1);
                                _counter++;

                            }
                        });
                    }

                    $that.html(newHTMLDivs).removeClass('yearView monthView');


                });
            },
            sortByMonth: function (elem) {
                elem.each(function () {
                    var $that = $(this),
                        photoDatesArray = [],
                        photosAlts = [];

                    $that.children().each(function () {
                        var tempContainer = $(this);
                        var dateOfPhoto = new Date(tempContainer.find('time').attr('datetime'));
                        photoDatesArray.push(dateOfPhoto.getTime());
                        var altOfPhoto = tempContainer.find('img').attr('alt');
                        photosAlts.push(altOfPhoto);

                    });
                    photoDatesArray.sort();

                    var today = new Date(),
                        counterForPhotos = 0,
                        newArray = photoDatesArray.sort(),
                        newHTMLDivs = '',
                        photoAltsArraySorted = [],
                        newDate = true;



                    while (counterForPhotos < ($that.children().length)) {

                        $that.children().each(function () {
                            var thisContainer = $(this);
                            //                            thisContainer.removeClass('clearFloat');
                            thisContainer.find('span').remove();
                            var thisPhotoDate = new Date(thisContainer.find('time').attr('datetime'));
                            thisPhotoDate = thisPhotoDate.getTime();
                            var thisPhotoAlt = thisContainer.find('img').attr('alt');

                            if ((jQuery.inArray(thisPhotoAlt, photosAlts) !== -1) && (jQuery.inArray(thisPhotoDate, newArray) !== -1) && (thisPhotoDate === newArray[0])) {

                                var thisPhotoMonth = (new Date(thisPhotoDate).getMonth()) + 1;
                                var nxtPhotoMonth = (new Date(newArray[1]).getMonth()) + 1;

                                var thisPhotoDateTemp = (new Date(thisPhotoDate).toUTCString()).slice(7, 17);

                                if (newDate === true) {
                                    //                                    thisContainer.addClass('clearFloat');
                                    var spanExits = thisContainer.find('span').hasClass('dateView');
                                    if (!spanExits) {

                                        thisContainer.prepend('<span class="dateView">' + thisPhotoDateTemp + '</span>');
                                    }
                                    newDate = false;
                                }

                                if (thisPhotoMonth !== nxtPhotoMonth) {
                                    newDate = true;
                                }

                                newHTMLDivs += thisContainer.clone().wrap('<div>').parent().html();
                                photoAltsArraySorted.push(thisPhotoAlt);
                                newArray.splice(0, 1);
                                counterForPhotos++;
                            }
                        });
                    }

                    $that.removeClass('yearView').addClass('monthView');
                    $that.html(newHTMLDivs);


                });
            },
            sortByYear: function (elem) {
                elem.each(function () {
                    var $that = $(this),
                        photoDatesArray = [],
                        photosAlts = [];

                    $that.children().each(function () {
                        var tempContainer = $(this);
                        var dateOfPhoto = new Date(tempContainer.find('time').attr('datetime'));
                        photoDatesArray.push(dateOfPhoto.getTime());
                        var altOfPhoto = tempContainer.find('img').attr('alt');
                        photosAlts.push(altOfPhoto);

                    });
                    photoDatesArray.sort();

                    var today = new Date(),
                        counterForPhotos = 0,
                        newArray = photoDatesArray.sort(),
                        newHTMLDivs = '',
                        photoAltsArraySorted = [],
                        newDate = true;



                    while (counterForPhotos < ($that.children().length)) {

                        $that.children().each(function () {
                            var thisContainer = $(this);
                            //                            thisContainer.removeClass('clearFloat');
                            thisContainer.find('span').remove();
                            var thisPhotoDate = new Date(thisContainer.find('time').attr('datetime'));
                            thisPhotoDate = thisPhotoDate.getTime();
                            var thisPhotoAlt = thisContainer.find('img').attr('alt');

                            if ((jQuery.inArray(thisPhotoAlt, photosAlts) !== -1) && (jQuery.inArray(thisPhotoDate, newArray) !== -1) && (thisPhotoDate === newArray[0])) {

                                var thisPhotoYear = new Date(thisPhotoDate).getFullYear();
                                var nxtPhotoYear = new Date(newArray[1]).getFullYear();

                                if (newDate === true) {
                                    //                                    thisContainer.addClass('clearFloat');
                                    var spanExits = thisContainer.find('span').hasClass('dateView');
                                    if (!spanExits) {
                                        thisContainer.prepend('<span class="dateView">' + thisPhotoYear + '</span>');
                                    }
                                    newDate = false;
                                }
                                if (thisPhotoYear !== nxtPhotoYear) {
                                    newDate = true;
                                }

                                newHTMLDivs += thisContainer.clone().wrap('<div>').parent().html();
                                photoAltsArraySorted.push(thisPhotoAlt);
                                newArray.splice(0, 1);
                                counterForPhotos++;
                            }
                        });
                    }

                    $that.removeClass('monthView').addClass('yearView');
                    $that.html(newHTMLDivs);


                });
            },
            run: function () {
                this.createContainer();
                this.getWindowWidth();
                this.closeApp();
                this.createThumbContainer();
                this.usingKeyboard();
                this.usingTouch();
                this.openPhoto(index);
                this.transform(index);
                setTimeout(function () {
                    _photosContainer.addClass('opacity');
                }, 50);
            },
            createContainer: function () {
                var appHTML = '<div id="appContainer"><div id="photoContainer"><div id="header"><span id="photoCount"><span id="currentPhotoNum"></span> of <span id="totalPhotoNum">' + childNodes.length + '</span></span><span id="photoDate"></span><span id="closeApp" class="close">Exit</span></div><div id="photos"></div></div></div>';
                $('body').append(appHTML).addClass('photoApp');

                _appContainer = $('#appContainer');
                _photosContainer = $('#photoContainer');
                _photosContainer.addClass('loadED');
                _photos = _photosContainer.find('#photos');
                var photoDivs = '';
                childNodes.each(function () {
                    photoDivs += '<div class="photoEach"></div>';
                });
                _photos.append(photoDivs);
                _photoEach = _photosContainer.find('.photoEach');
            },
            openPhoto: function (index) {
                var _config = this;
                if (appRunning) {
                    setTimeout(function () {
                        _config.getPhoto(index, false);
                    }, 800);
                    if (!_photos.hasClass('appRunning')) {
                        _photos.addClass('appRunning');
                    }
                } else {
                    _config.getPhoto(index, false);
                }
                if (!this.supportTransition() && !appRunning) {
                    _photos.css({
                        left: (-index * 100) + '%'
                    });
                } else if (!this.supportTransition() && appRunning) {
                    _photos.animate({
                        left: (-index * 100) + '%'
                    }, 500, 'ease');
                }

                _photoEach.eq(prevIndex).removeClass('activePhoto');
                _photoEach.eq(index).addClass('activePhoto');
                _photoEach.eq(index).prevAll().removeClass('nxtPhoto').addClass('prevPhoto');
                _photoEach.eq(index).nextAll().removeClass('prevPhoto').addClass('nxtPhoto');
                if (childNodes.length > 1) {
                    _thumbEach.removeClass('activeThumbnail'); //??
                    _thumbEach.eq(index).addClass('activeThumbnail');
                }
                prevIndex = index;
                setTimeout(function () {
                    appRunning = true;
                });
                $("#currentPhotoNum").text(index + 1);



                _thisPhotoDate = new Date(childNodes.eq(index).find('time').attr('datetime')).toUTCString().slice(0, 17);
                _photoEach.eq(index).append('<time datetime="' + _thisPhotoDate + '"></time>');

                $('#photoDate').html(_thisPhotoDate);



                $(window).bind('resize.photoApp', function () {
                    setTimeout(function () {
                        _config.transform(index);
                    }, 200);
                });
            },
            getPhoto: function (index, load) {
                var _config = this;
                var src,
                    loadingTimeout = 0;
                if (load === true) {
                    loadingTimeout = 800;
                }
                if (!src) {
                    if (childNodes.eq(index).attr('data-src') !== 'undefined') {
                        src = childNodes.eq(index).attr('data-src');

                    }
                }

                if (typeof src !== 'undefined' && src !== '') {
                    setTimeout(function () {
                        if (!_photoEach.eq(index).hasClass('loaded')) {
                            _photoEach.eq(index).prepend('<img class="photo" src="' + src + '" />');
                            _photoEach.eq(index).addClass('loaded');
                        }
                        _config.photoLoadComplete(load, index);
                    }, loadingTimeout);

                }




            },
            getWindowWidth: function () {
                var resize = function () {
                    windowWidth = $(window).width();
                };
                $(window).bind('resize.photoApp', resize());
            },
            closeApp: function () {
                $('#closeApp').bind('click touchend', function () {
                    baseObj.closeApp();
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
                if (support()) {
                    return true;
                }
                return false;
            },
            createThumbContainer: function () {
                if (childNodes.length > 1) {
                    var _config = this;
                    _photosContainer.append('<div class="thumbnailsContainer"><div class="thumbnailPhotos"></div></div>');
                    _thumbsContainer = _photosContainer.find('.thumbnailsContainer');
                    var $thumbnailPhotos = _photosContainer.find('.thumbnailPhotos');
                    var _thumbnailPhotosEach = '';
                    var thumbPhoto;

                    childNodes.each(function () {
                        thumbPhoto = $(this).find('img').attr('src');
                        _thumbnailPhotosEach += '<div class="thumbPhoto"><img src="' + thumbPhoto + '" /></div>';
                    });

                    $thumbnailPhotos.append(_thumbnailPhotosEach);


                    _thumbEach = $thumbnailPhotos.find('.thumbPhoto');
                    var childNodesWidth = (childNodes.length * (pluginOpts.thumbWidth)) + (pluginOpts.activeThumbMargin * 2);
                    _photosContainer.find('.thumbnailPhotos').css({
                        'width': childNodesWidth + 'px',
                        'position': 'relative',
                        'transition-duration': '500ms'
                    });
                    _thumbEach.bind('click touchend', function () {
                        var index = $(this).index();
                        _thumbEach.removeClass('activeThumbnail');
                        $(this).addClass('activeThumbnail');
                        _config.openPhoto(index);
                        _config.transform(index);
                    });
                }
            },
            nxtPhoto: function () {
                var _config = this;
                index = _photoEach.index(_photoEach.eq(prevIndex));
                if (index + 1 < childNodes.length) {
                    index++;
                    _config.openPhoto(index);
                } else {
                    _photoEach.eq(index).find('.photo').addClass('lastPhoto');
                    setTimeout(function () {
                        _photoEach.find('.photo').removeClass('lastPhoto');
                    }, 400);
                }
                _config.transform(index);
            },
            prevPhoto: function () {
                var _config = this;
                index = _photoEach.index(_photoEach.eq(prevIndex));
                if (index > 0) {
                    index--;
                    _config.openPhoto(index);
                } else {
                    _photoEach.eq(index).find('.photo').addClass('firstPhoto');
                    setTimeout(function () {
                        _photoEach.find('.photo').removeClass('firstPhoto');
                    }, 400);
                }
                _config.transform(index);
            },
            usingKeyboard: function () {
                var _config = this;
                $(window).bind('keyup.photoApp', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // left arrow
                    if (e.keyCode === 37) {
                        _config.prevPhoto();
                        // right arrow
                    } else if (e.keyCode === 39) {
                        _config.nxtPhoto();
                    }
                    // escp key
                    if (e.keyCode === 27) {
                        baseObj.closeApp(false);
                    }
                });
            },
            transform: function (index) {
                var thumbnailsContainerWidth = _photosContainer.find('.thumbnailsContainer').width();
                var middlePage = (thumbnailsContainerWidth / 2) - (pluginOpts.thumbWidth / 1.5);
                var left = ((pluginOpts.thumbWidth) * index - 1) - middlePage + (pluginOpts.activeThumbMargin * 2);
                var childNodesWidth = (childNodes.length * (pluginOpts.thumbWidth)) + (pluginOpts.activeThumbMargin * 2);
                if (left > (childNodesWidth - thumbnailsContainerWidth)) {
                    left = childNodesWidth - thumbnailsContainerWidth;
                }
                if (left < 0) {
                    left = 0;
                }
                if (this.supportTransition()) {
                    _photosContainer.find('.thumbnailPhotos').css('transform', 'translate3d(-' + left + 'px, 0px, 0px)');
                } else {
                    _photosContainer.find('.thumbnailPhotos').animate({
                        left: -left + "px"
                    }, 500);
                }

            },
            photoLoadComplete: function (load, index) {
                var _config = this;
                _photoEach.eq(index).find('.photo').on('load error', function () {
                    _photoEach.eq(index).addClass('complete');
                });
                if (load === false) {
                    if (!_photoEach.eq(index).hasClass('complete')) {
                        _photoEach.eq(index).find('.photo').on('load error', function () {
                            _config.getPhoto(index + 1, true);
                            _config.getPhoto(index - 1, true);

                        });
                    } else {
                        _config.getPhoto(index + 1, true);
                        _config.getPhoto(index - 1, true);
                    }
                }
            },
            usingTouch: function () {
                var _config = this;
                if (mobileDvice) {
                    var touchstart = {},
                        touchend = {};
                    $('body').on('touchstart.photoApp', function (e) {
                        touchend = e.originalEvent.targetTouches[0];
                        touchstart.pageX = e.originalEvent.targetTouches[0].pageX;
                        touchstart.pageY = e.originalEvent.targetTouches[0].pageY;
                    });
                    $('body').on('touchmove.photoApp', function (e) {
                        var orig = e.originalEvent;
                        touchend = orig.targetTouches[0];
                        e.preventDefault();
                    });
                    $('body').on('touchend.photoApp', function (e) {
                        var swipeDistance = touchend.pageX - touchstart.pageX,
                            limit = 50;
                        if (distance >= limit) {
                            _config.prevPhoto();
                        } else if (swipeDistance <= -limit) {
                            _config.nxtPhoto();
                        }
                    });
                }
            }


        };

        baseObj.closeApp = function () {
            var isAppRunning = appRunning;
            appRunning = false;
            $('.photoApp').off('mousedown mouseup');
            $('body').off('touchstart.photoApp touchmove.photoApp touchend.photoApp');
            $(window).off('resize.photoApp keyup.photoApp');
            if (isAppRunning === true) {
                _photosContainer.addClass('noOpacity');
                setTimeout(function () {
                    _appContainer.remove();
                    $('body').removeClass('photoApp');
                }, 500);
            }
        };
        photoApp.createSortBtn();
        photoApp.runApp();
        return this;
    };

    $.fn.photoApp.defaultsOptions = {
        sortOnLoad: true,
        activateSort: true,
        transitionDuration: 500,
        ease: 'ease',
        thumbWidth: 80,
        activeThumbMargin: 10,
        index: false
    };

})(jQuery, window, document);



function log(stuff) {
    return console.log(stuff);
}
