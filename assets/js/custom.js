jQuery(document).ready(function (c) {
    var o = {audio_player: false};
    (function (u) {
        c.fn.addClass = function () {
            u.apply(this, arguments);
            this.trigger("classChanged");
            return this;
        };
    })(c.fn.addClass);
    function q(x, v) {
        var y = c("#header").outerHeight(), w = x.split("#")[1];
        if (w) {
            w = "#" + w;
            if (c(w).length) {
                var u = c(w).offset().top - y;
                c("html, body").animate({scrollTop: u}, v);
            }
        }
    }

    c('a[href="#"]').on("click", function (u) {
        u.preventDefault;
        return false;
    });
    function n() {
        var w = window.navigator.userAgent;
        var v = w.indexOf("MSIE ");
        if (v > 0) {
            return parseInt(w.substring(v + 5, w.indexOf(".", v)), 10);
        }
        var u = w.indexOf("Trident/");
        if (u > 0) {
            var y = w.indexOf("rv:");
            return parseInt(w.substring(y + 3, w.indexOf(".", y)), 10);
        }
        var x = w.indexOf("Edge/");
        if (x > 0) {
            return parseInt(w.substring(x + 5, w.indexOf(".", x)), 10);
        }
        return false;
    }

    var b = n();
    if (b != false) {
        c("html").addClass("ie ie-" + b);
    }
    c(document).on("click", "#header #nav li a, #responsive-nav li a, .smooth-scroll", function (v) {
        var u = c(this).attr("href");
        q(u, 900);
    });
    c(".skew-fx").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function () {
        c(this).removeClass("on");
    });
    c(".skew-fx").hover(function () {
        if (c(window).width() > 750) {
            c(this).addClass("on");
        }
    });
    c(".event-brick").on("hover", function (u) {
        c(this).toggleClass("on");
    });
    c.fn.addClassDelay = function (w, v) {
        var u = c(this);
        setTimeout(function () {
            u.addClass(w);
        }, v);
        return this;
    };
    c.fn.removeClassDelay = function (w, v) {
        var u = c(this);
        setTimeout(function () {
            u.removeClass(w);
        }, v);
        return this;
    };
    // function j(v) {
    //     var u = "plugins/instagram.php";
    //     var w = c("#instagram .instagram-feed");
    //     c.ajax({
    //         url: u, dataType: "html", timeout: 10000, type: "GET", error: function (z, x, y) {
    //             w.html("An error occured: " + y);
    //         }, success: function (y, x, z) {
    //             w.html(y).hide();
    //             w.show();
    //         }
    //     });
    // }

    function l(u) {
        c(".youtube", u).each(function () {
            var v = "http://i.ytimg.com/vi/" + this.id + "/maxresdefault.jpg";
            if (c(this).find("img").length <= 0) {
                c(this).append('<img src="' + v + '">');
            }
            c(this).addClass("thumb thumb-fade");
            var w = '<span class="thumb-icon trans-40"><svg class="circle-svg" width="80" height="80" viewBox="0 0 50 50"><circle class="circle" cx="25" cy="25" r="23" stroke="#fff" stroke-width="1" fill="none"></circle></svg><span class="pe-7s-video"></span></span>';
            c(this).append(w);
            c(document).on("click", "#" + this.id, function () {
                var x = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
                if (c(this).data("params")) {
                    x += "&" + c(this).data("params");
                }
                var y = c("<iframe/>", {frameborder: "0", src: x, width: "1200", height: "675"});
                c(this).replaceWith(y);
                if (c.fn.ResVid) {
                    c(u).ResVid();
                }
                if (typeof o.audio_player != "undefined" && o.audio_player != null) {
                    o.audio_player.playerAction("pause");
                }
            });
        });
    }

    function f(u) {
        c(".imagebox", u).magnificPopup({
            type: "image", zoom: {
                enabled: true, duration: 300, opener: function (v) {
                    return v.find("img");
                }
            }
        });
        c(".mediabox", u).magnificPopup({type: "iframe",});
        c(".gallery", u).magnificPopup({
            delegate: "a.g-item", callbacks: {
                elementParse: function (v) {
                    if (v.el.hasClass("iframe-link")) {
                        v.type = "iframe";
                        if (typeof o.audio_player != "undefined" && o.audio_player != null) {
                            o.audio_player.playerAction("pause");
                        }
                    } else {
                        v.type = "image";
                    }
                }
            }, gallery: {enabled: true},
        });
    }

    function p(u) {
        if (typeof o.audio_player == "undefined" && o.audio_player == null) {
            return false;
        }
        if (c(".sp-tracklist").length) {
            c(".sp-tracklist li").each(function () {
                if (c(this).find(".sp-content-control").length <= 0) {
                    var v = "sp-progress_" + Math.random().toString(36).substr(2, 9),
                        w = '<div id="' + v + '" class="track-row track-row-progress sp-content-control"><span class="sp-content-progress"><span class="sp-content-loading"></span><span class="sp-content-position"></span></span></div>';
                    c(this).find(".track").attr("data-control", v);
                    if (c(this).find(".track-row-lyrics").length) {
                        c(w).insertBefore(c(this).find(".track-row-lyrics"));
                    } else {
                        c(this).append(w);
                    }
                }
            });
        }
        if (c(".track-waveform").length) {
            c(".track-waveform").each(function () {
                var x = c(this), y = x.attr("id"), w = x.attr("data-audio"), v;
                if (Waveform != undefined && y !== "undefined" && w !== "undefined" && w !== "") {
                    v = c("#" + y + " .waveform")[0];
                    c.ajax({
                        url: w,
                        async: false,
                        type: "GET",
                        dataType: "binary",
                        processData: false,
                        success: function (A) {
                            var z = A;
                            Waveform.generate(z, {
                                canvas_width: 1400,
                                canvas_height: 200,
                                bar_width: 4,
                                bar_gap: 0.4,
                                wave_start_color: "#ff7700",
                                wave_end_color: "#ff2400",
                                shadow_height: 70,
                                shadow_start_color: "#ff7700",
                                shadow_end_color: "#ff2400",
                                shadow_opacity: 0.2,
                                shadow_gap: 1,
                                download: false,
                                onComplete: function (D, E) {
                                    var B = v;
                                    var C = B.getContext("2d");
                                    C.putImageData(E, 0, 0);
                                    o.audio_player.update_events(x);
                                }
                            });
                        },
                        error: function (B, z, A) {
                            console.log(z);
                        }
                    });
                }
            });
        }
        o.audio_player.update_content();
        o.audio_player.update_events("body");
    }

    function s(u) {
        if (c(".text-fx", u).length) {
            c(".text-fx", u).each(function () {
                if (!c(this).hasClass("finished")) {
                    c(this).addClass("finished");
                    var z = c(this).html().replace("<br />", "~");
                    var z = z.replace("<br>", "~");
                    var x = z.split("");
                    var v = "";
                    var w;
                    for (var y = 0; y < x.length; y++) {
                        if (x[y] == " ") {
                            v += " ";
                        } else {
                            if (x[y] == "~") {
                                v += "<br />";
                            } else {
                                v += '<p><span class="trans-10" style="-webkit-transition-delay: ' + (y / 32) + "s; transition-delay: " + (y / 32) + 's;">' + x[y] + "</span></p>";
                            }
                        }
                    }
                    c(this).html(v);
                }
            });
        }
        if (c(".text-fx-word", u).length) {
            c(".text-fx-word", u).each(function () {
                if (!c(this).hasClass("finished")) {
                    c(this).addClass("finished");
                    var x = c(this).html().split(" ");
                    var v = "";
                    var w;
                    for (var y = 0; y < x.length; y++) {
                        if (x[y] == " ") {
                            v += " ";
                        } else {
                            if (x[y] == "<br>" || x[y] == "<br />") {
                                v += "<br />";
                            } else {
                                v += '<p><span class="trans-15" style="-webkit-transition-delay: ' + (y / 14) + "s; transition-delay: " + (y / 14) + 's;">' + x[y] + "</span></p>";
                            }
                        }
                    }
                    c(this).html(v);
                }
            });
        }
        if (c(".text-fx-btn", u).length) {
            c(".text-fx-btn .text-fx-btn-x", u).each(function () {
                if (!c(this).hasClass("finished")) {
                    c(this).addClass("finished");
                    var z = c(this).html().replace("<br />", "~");
                    var z = z.replace("<br>", "~");
                    var x = z.split("");
                    var v = "";
                    var w;
                    for (var y = 0; y < x.length; y++) {
                        if (x[y] == " ") {
                            v += " ";
                        } else {
                            if (x[y] == "~") {
                                v += "<br />";
                            } else {
                                v += '<p><span class="trans-12" style="-webkit-transition-delay: ' + (y / 45) + "s; transition-delay: " + (y / 45) + 's;">' + x[y] + "</span></p>";
                            }
                        }
                    }
                    c(this).html(v);
                }
            });
        }
    }

    function d(u) {
        c(".gallery-grid").isotope({itemSelector: ".gallery-grid-item", transitionDuration: 0,});
        setTimeout(function () {
            c(".gallery-grid").isotope("layout");
        }, 3000);
    }

    function g(u) {
        if (c.fn.ResVid) {
            c(u).ResVid();
        }
    }

    function a(u) {
        c(".toggle", u).each(function () {
            c(".active-toggle", this).next().show();
            var v = c(this);
            c("h4.toggle-title", this).on("click", function (w) {
                if (c(this).is(".active-toggle")) {
                    c(this).removeClass("active-toggle");
                    c(".toggle-content", v).slideUp(400);
                } else {
                    c(this).addClass("active-toggle");
                    c(".toggle-content", v).slideDown(400);
                }
                w.preventDefault;
            });
        });
    }

    function h(u) {
        c(".tabs-wrap", u).each(function () {
            var v = c(this);
            c("ul.tabs li a", v).on("click", function (x) {
                if (!c(this).is("on")) {
                    var w = c(this).attr("href");
                    if (c(w).length) {
                        c(".tab-content").removeClass("on");
                        c("ul.tabs li a", v).removeClass("on");
                        c(w).addClass("on");
                        c(this).addClass("on");
                    }
                }
                return false;
                x.preventDefault;
            });
        });
    }

    function k(u) {
        if (c(".layers-slider").length) {
            var v = c(".layers-slider").bxSlider({
                mode: "fade",
                auto: false,
                speed: 1000,
                pager: true,
                controls: true,
                pause: 5000,
                touchEnabled: true,
                onSliderLoad: function (x) {
                    setTimeout(function () {
                        var y = c(".layers-slider li", v).outerHeight();
                        c(".bx-viewport", v).height(y);
                    }, 100);
                    c(".layers-slider li.on .title", v).addClassDelay("on", 1000);
                    c(".layers-slider li.on .sub-title", v).addClassDelay("on", 1200);
                    c(".layers-slider li.on .thumb-icon", v).addClassDelay("on", 1300);
                },
                onSlideBefore: function (x) {
                    x.addClass("start");
                    x.addClassDelay("over", 10);
                    x.parent().children("li").removeClassDelay("on start", 100);
                    x.addClassDelay("on", 500);
                    x.removeClassDelay("over", 800);
                    c(x).find(".title").removeClass("on");
                    c(x).find(".sub-title").removeClass("on");
                    c(x).find(".thumb-icon").removeClass("on");
                },
                onSlideAfter: function (x) {
                    c(x).find(".title").addClassDelay("on", 200);
                    c(x).find(".sub-title").addClassDelay("on", 600);
                    c(x).find(".thumb-icon").addClassDelay("on", 700);
                }
            });
        }
        if (c(".testi-slider").length) {
            var w = c(".testi-slider").bxSlider({
                mode: "fade",
                auto: false,
                speed: 1000,
                pager: true,
                controls: true,
                pause: 5000,
                touchEnabled: true,
                onSliderLoad: function (x) {
                    setTimeout(function () {
                        var y = c(".testi-slider li", w).outerHeight();
                        c(".bx-viewport", w).height(y);
                    }, 100);
                },
                onSlideBefore: function (x) {
                    x.addClass("start");
                    x.addClassDelay("over", 10);
                    x.parent().children("li").removeClassDelay("on start", 100);
                    x.addClassDelay("on", 500);
                    x.removeClassDelay("over", 800);
                },
            });
        }
    }

    function r(u) {
        if (c.fn.countdown) {
            c(".countdown").each(function (w) {
                var v = c(this).data("event-date");
                c(this).countdown(v, function (x) {
                    var y = c(this);
                    switch (x.type) {
                        case"seconds":
                        case"minutes":
                        case"hours":
                        case"days":
                        case"weeks":
                        case"daysLeft":
                            y.find("." + x.type).html(x.value);
                            break;
                        case"finished":
                            break;
                    }
                });
            });
        }
    }

    function t(u) {
        if (c.fn.gmap3) {
            c(".gmap", u).each(function () {
                var y = c(this), w = "images/map-marker.png", v = y.data("address"), A = y.data("zoom"), x, z;
                if (y.data("zoom_control") == "true") {
                    x = true;
                } else {
                    x = false;
                }
                if (y.data("scrollwheel") == "true") {
                    z = true;
                } else {
                    z = false;
                }
                y.gmap3({
                    address: v,
                    zoom: A,
                    zoomControl: x,
                    scrollwheel: z,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControlOptions: {mapTypeIds: [google.maps.MapTypeId.ROADMAP, "style1"]},
                    styles: [{
                        featureType: "all",
                        elementType: "labels",
                        stylers: [{visibility: "on"}]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [{saturation: 36}, {color: "#000000"}, {lightness: 40}]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [{visibility: "on"}, {color: "#000000"}, {lightness: 16}]
                    }, {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{visibility: "off"}]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{color: "#000000"}, {lightness: 20}]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{color: "#000000"}, {lightness: 17}, {weight: 1.2}]
                    }, {
                        featureType: "administrative.locality",
                        elementType: "labels.text.fill",
                        stylers: [{color: "#ffffff"}]
                    }, {
                        featureType: "administrative.neighborhood",
                        elementType: "labels.text.fill",
                        stylers: [{color: "#aaaaaa"}]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 20}]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 21}, {visibility: "on"}]
                    }, {
                        featureType: "poi.business",
                        elementType: "geometry",
                        stylers: [{visibility: "on"}]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{lightness: "0"}, {visibility: "on"}, {color: "#ff7700"}]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{visibility: "off"}]
                    }, {
                        featureType: "road.highway",
                        elementType: "labels.text.fill",
                        stylers: [{visibility: "off"}]
                    }, {
                        featureType: "road.highway",
                        elementType: "labels.text.stroke",
                        stylers: [{visibility: "off"}, {color: "#000000"}]
                    }, {
                        featureType: "road.highway.controlled_access",
                        elementType: "geometry.fill",
                        stylers: [{color: "#e1300e"}]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 18}]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry.fill",
                        stylers: [{color: "#575757"}]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [{color: "#ffffff"}]
                    }, {
                        featureType: "road.arterial",
                        elementType: "labels.text.stroke",
                        stylers: [{color: "#282828"}]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 16}]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [{color: "#999999"}]
                    }, {
                        featureType: "road.local",
                        elementType: "labels.text.stroke",
                        stylers: [{saturation: "-52"}, {color: "#212121"}]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 19}]
                    }, {
                        featureType: "transit.line",
                        elementType: "geometry.fill",
                        stylers: [{color: "#e1300e"}]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{color: "#000000"}, {lightness: 17}, {visibility: "on"}]
                    }, {featureType: "water", elementType: "geometry.fill", stylers: [{color: "#1c1c1c"}]}]
                }).marker({address: v, icon: w});
            });
        }
    }

    function i(u) {
        if (c(".text-slider", u).length <= 0) {
            return;
        }
        c(".text-slider", u).each(function () {
            var A = c(this), y = parseInt(A.attr("data-delay"), 10), z, x = 1,
                w = c(this).find(".text-slide").length - 1, y = y * 1000;
            if (w == 0) {
                return;
            }
            var v = function () {
                A.find(".text-slide:eq( " + x + " )").hide().removeClass("visible").find(".on").removeClass("on");
                x++;
                if (x > w) {
                    x = 0;
                }
                A.find(".text-slide:eq( " + x + " )").show().addClass("visible");
                A.find(".visible h2").addClassDelay("on", 100);
                A.find(".visible h6").addClassDelay("on", 300);
            };
            v();
            z = setInterval(v, y);
            y = y * 1000;
        });
    }

    function m(u) {
        c(".intro-image", u).addClass("on");
        c(".intro-image", u).removeClassDelay("on blur-fx trans-20", 2100);
        // j("html");
        if (c.fn.isotope) {
            c(".items, .gallery-grid").isotope("layout");
        }
    }

    (function () {
        var B = c("#nav").children("ul");
        c("li", B).on("mouseenter", function () {
            var H = c(this), G = H.children("ul");
            if (G.length) {
                H.addClass("active");
            }
            G.hide().stop(true, true).fadeIn(200);
        }).on("mouseleave", function () {
            c(this).removeClass("active").children("ul").stop(true, true).fadeOut(50);
        });
        var D = c(".section"), u = c("#nav"), y = c("#header"), w = 20, F = false, C = y.outerHeight(),
            z = c(".section").eq(0), A = c(".site .section").last();
        if (y.hasClass("hide-navigation")) {
            F = true;
        }
        var v = function () {
            var G = c(this).scrollTop(), H = A.offset().top + A.outerHeight();
            if (F) {
                if (G > 0) {
                    y.removeClass("hide-navigation");
                } else {
                    y.addClass("hide-navigation");
                }
            }
            if (G < z.offset().top - C - w) {
                D.removeClass("active");
                u.find("a").removeClass("active on");
            } else {
                if (G > H - C - w) {
                    D.removeClass("active");
                    u.find("a").removeClass("active on");
                } else {
                    D.each(function (J) {
                        var K = c(this).offset().top - C - w, I = K + c(this).outerHeight();
                        if (G >= K && G <= I) {
                            u.find("a").removeClass("active on");
                            D.removeClass("active");
                            c(this).addClass("active");
                            u.find('a[href*="#' + c(this).attr("id") + '"]').addClass("active on");
                        }
                    });
                }
            }
        };
        c(window).on("scroll", v);
        v();
        c("#nav ul, #nav li").addClass("top-nav-el");
        var E = c("#nav > ul").children().clone();
        if (c("#responsive-nav ul").length <= 0) {
            c("#responsive-nav").append("<ul></ul>");
            c("#responsive-nav ul").append(E);
        } else {
            c(E).insertBefore("#responsive-nav ul > li:first-child:eq(0)");
        }
        c("#responsive-nav li").each(function () {
            if (c(this).children("ul").length) {
                c(this).find("a").first().after('<i class="submenu-trigger icon icon-angle-down"></i>');
            }
            c(this).addClass("text-fx-btn rotate-x-360");
            c(this).find("a").addClass("trans-10 text-fx-btn-x");
        });
        c("#responsive-nav > ul > li").addClass("first-child");
        c('#responsive-nav .submenu-trigger, #responsive-nav .menu-item-has-children > a[href="#"]').on("click", function (I) {
            I.preventDefault();
            var G = c(this).closest("li"), H = c(this).parents(".first-child").index();
            c("#responsive-nav > ul > li:not(:eq( " + H + " )) ul:visible").slideUp();
            c("#responsive-nav > ul > li:not(:eq( " + H + " )) li, #responsive-nav > ul > li:not(:eq( " + H + " ))").removeClass("opened");
            G.toggleClass("opened").find(" > ul").slideToggle(400);
        });
        c(".responsive-trigger").on("click", function (G) {
            G.preventDefault();
            c("body").addClass("responsive-block-on");
        });
        c(".responsive-block-close, .responsive-block-layer").on("click", function (G) {
            G.preventDefault();
            c("body").removeClass("responsive-block-on");
        });
        c(document).on("click", '.responsive-block-content a[href*="#"], .responsive-block-content a.ajax-link', function (G) {
            if (c(this).attr("href") != "#") {
                c("body").removeClass("responsive-block-on");
            }
        });
        if (c("#responsive-social").length) {
            var x = c("#social-block .social-icons").clone();
            c("#responsive-social").append(x).find(".social-icons").addClass("on");
        }
        c("#nav-search").on("click", function (G) {
            c(this).toggleClass("on");
            c("#search-block").slideToggle(400);
            G.preventDefault();
        });
        c("#search-block").on("focusout", function () {
            c("#nav-search").removeClass("on");
            c(this).slideUp(400);
            e.preventDefault();
        });
        c("#nav-social").on("click", function (G) {
            c(this).toggleClass("on");
            c("#social-block").slideToggle(400, function () {
                c("#social-block .show-fx").toggleClass("on");
            });
            G.preventDefault();
        });
        c('a[href="#show-player"]').on("click", function (G) {
            G.preventDefault();
            G.stopPropagation();
            if (c("#scamp_player").hasClass("sp-show-player")) {
                c("#scamp_player").removeClass("sp-show-player").addClass("sp-hidden-player");
                c(this).removeClass("on");
            } else {
                c("#scamp_player").removeClass("sp-hidden-player").addClass("sp-show-player");
                c(this).addClass("on");
            }
        });
    })();
    (function () {
        if (c("#events-scroll").length) {
            var u = window.Scrollbar;
            u.init(document.querySelector("#events-scroll"), {alwaysShowTracks: true});
        }
    })();
    (function () {
        if (c(window).width() < 750) {
            return;
        }
        var u;

        function y() {
            u = [].slice.call(c(".parallax"));
            if (!u.length) {
                return;
            }
            c(window).on("scroll", v);
            c(window).on("resize", v);
            v();
        }

        function x() {
            var A = document.documentElement.clientHeight, z = window.innerHeight;
            return A < z ? z : A;
        }

        function w() {
            if (typeof window.scrollY != "undefined") {
                return window.scrollY;
            }
            if (typeof pageYOffset != "undefined") {
                return pageYOffset;
            }
            var z = document.documentElement;
            z = z.clientHeight ? z : document.body;
            return z.scrollTop;
        }

        function v() {
            var C, E, A, D = w(), z = x();
            for (var B in u) {
                C = u[B];
                if (c(C).css("background-image") != "none") {
                    E = C.offsetTop;
                    A = C.offsetHeight;
                    if ((E > D + z) || (E + A < D)) {
                        continue;
                    }
                    C.style.backgroundPosition = "50% " + Math.round((E - D) * 3 / 12) + "px";
                }
            }
        }

        y();
    })();
    (function () {
        if (c("#scamp_player").length <= 0) {
            return;
        }
        o.audio_player = new c.ScampPlayer(c("#scamp_player"), {
            volume: 70,
            autoplay: false,
            no_track_image: "assets/js/audio-player/img/no-track-image.jpg",
            path: "js/audio-player/",
            loop: false,
            load_first_track: true,
            random: false,
            titlebar: false,
            check_files: false,
            client_id: "23f5c38e0aa354cdd0e1a6b4286f6aa4",
            shoutcast: true,
            shoutcast_interval: 20000,
            labels: {
                play: "Play",
                cover: "Cover",
                title: "Title",
                buy: "Buy",
                remove: "Remove",
                empty_queue: "Empty Queue"
            },
            debug: false
        });
        c("#scamp_player").on("classChanged", function () {
            if (c(this).hasClass("sp-show-player")) {
                c('a[href="#show-player"]').addClass("status-show-player");
            } else {
                c('a[href="#show-player"]').removeClass("status-show-player");
            }
            if (c(this).hasClass("playing")) {
                c('a[href="#show-player"]').addClass("status-playing").removeClass("status-loading status-paused");
                var z = c("#scamp_player .sp-position").width(), w = c(window).width(), v = 144, y, u;
                z = parseFloat(z / w) * 100;
                z = z.toFixed(0);
                y = z / 100;
                u = y * v;
                c(".nav-player-btn.circle-btn .circle").css({"stroke-dasharray": +u + " 144"});
            } else {
                if (c(this).hasClass("loading")) {
                    c('a[href="#show-player"]').addClass("status-loading").removeClass("status-playing status-paused");
                } else {
                    if (c(this).hasClass("paused")) {
                        c('a[href="#show-player"]').addClass("status-paused").removeClass("status-playing status-loading");
                    } else {
                        c('a[href="#show-player"]').removeClass("status-playing status-loading status-paused");
                    }
                }
            }
        });
        c("body").on("click", ".sp-tracklist li .track-lyrics", function () {
            var v = c(this), w = v.parents("li"), u = v.parents(".sp-tracklist");
            u.find("li").not(w).find(".track-row-lyrics").slideUp();
            u.find("li").not(w).find(".track-lyrics.is-active").removeClass("is-active");
            v.toggleClass("is-active");
            w.find(".track-row-lyrics").slideToggle();
        });
    })();
    (function () {
        c("ul.stats").each(function () {
            var u = 6, x = c(this), w = [], A = [], v = x.data("timer"), y;
            c("li", x).each(function (E) {
                w[E] = c(".stat-value", this).text();
                A[E] = c(".stat-name", this).text();
            });
            y = A.length;
            x.html("");
            z();
            var D = setInterval(function () {
                z();
            }, v);

            function B(K, F, E) {
                var I = new Array();
                for (var H = 0; H < E;
                     H++) {
                    var J = Math.floor(Math.random() * F);
                    var G = jQuery.inArray(J, I);
                    if (G >= 0) {
                        H--;
                    } else {
                        I.push(J);
                    }
                }
                return I;
            }

            function z() {
                var G = B(A, y, u);
                var E = 0;
                if (c("li", x).length == 0) {
                    for (var H = 0;
                         H < G.length; H++) {
                        c(x).append('<li class="stat-col"><span class="stat-value"></span><span class="stat-name"></span></li>');
                    }
                }
                var F = setInterval(function () {
                    var I = G[E];
                    var J = c("li", x).eq(E).find(".stat-name");
                    J.animate({bottom: "-40px", opacity: 0}, 400, "easeOutQuart", function () {
                        c(this).text(A[I]);
                        c(this).css({bottom: "-40px", opacity: 1});
                        c(this).animate({bottom: 0}, 400, "easeOutQuart");
                    });
                    var K = c("li", x).eq(E).find(".stat-value");
                    C(K, I);
                    E++;
                    if (E == G.length) {
                        clearInterval(F);
                    }
                }, 600);
            }

            function C(I, G) {
                var L = w[G].length, K = parseInt(w[G], 10), F = 10, J = 10, E;
                if (K <= 50) {
                    J = 1;
                } else {
                    if (K > 50 && K <= 100) {
                        J = 3;
                    } else {
                        if (K > 100 && K <= 1000) {
                            J = 50;
                        } else {
                            if (K > 1000 && K <= 2000) {
                                J = 100;
                            } else {
                                if (K > 2000 && K <= 3000) {
                                    J = 150;
                                } else {
                                    if (K > 3000 && K <= 4000) {
                                        J = 200;
                                    } else {
                                        J = 250;
                                    }
                                }
                            }
                        }
                    }
                }
                var H = setInterval(function () {
                    F = F + J;
                    E = F;
                    I.text(E);
                    if (E >= K) {
                        clearInterval(H);
                        I.text(w[G]);
                    }
                }, 40);
            }
        });
    })();
    (function () {
        if (!c.fn.isotope) {
            return;
        }
        var v = c(".items"), w = c(window);
        if (v.length) {
            c(window).on("resize", function () {
                v.isotope("layout");
            });
            v.isotope({
                itemSelector: ".item", onLayout: function () {
                    w.trigger("scroll");
                }
            });
            var u = function (y, x) {
                y.addClass("item-filter");
                c(".item", v).each(function (z) {
                    var A = c(this);
                    A.addClass(A.attr(x));
                });
                y.on("click", "a", function (B) {
                    var A = c(this), z = A.attr(x);
                    c(".item-filter").removeClass("active-filter");
                    y.addClass("active-filter");
                    c(".item-filter:not(.active-filter) li a").removeClass("is-active");
                    c(".item-filter:not(.active-filter) li:first-child a").addClass("is-active");
                    y.find("a").removeClass("is-active");
                    A.addClass("is-active");
                    if (z) {
                        if (z !== "*") {
                            z = z.replace(z, "." + z);
                        }
                        v.isotope({filter: z});
                    }
                    B.preventDefault();
                });
                y.find("a").first().addClass("is-active");
            };
            if (c(".filter-list").length) {
                u(c(".filter-list"), "data-categories");
            }
        }
    })();
    (function () {
        var u = c(".contact-form");
        u.append('<div id="ajax-message" style="display:none"></div>');
        var v = c("#ajax-message");
        u.on("click", "input[type=submit]", function (x) {
            v.hide();
            NProgress.start();
            c.post("plugins/contact-form.php", u.serialize(), function (y) {
                v.html(y).show();
                NProgress.done();
                if (y.indexOf("success") != -1) {
                    w(u);
                }
            });
            x.preventDefault();
        });
        function w(x) {
            c(x).find(":input").each(function () {
                switch (this.type) {
                    case"password":
                    case"select-multiple":
                    case"select-one":
                    case"text":
                    case"email":
                    case"textarea":
                        c(this).val("");
                        break;
                    case"checkbox":
                    case"radio":
                        this.checked = false;
                }
            });
        }
    })();
    (function () {
        var u = new c.SimplyAjaxLoader(c(".ajax-link"), {
            deeplinking: true, load_start: function () {
            }, load_end: function (v) {
                s(v);
                f(v);
                g(v);
                a(v);
                h(v);
                d(v);
                k(v);
                r(v);
                t(v);
                i(v);
                p(v);
                l(v);
            }, close: function () {
            }
        });
    })();
    s("html");
    f("html");
    g("html");
    a("html");
    h("html");
    d("html");
    k("html");
    r("html");
    t("html");
    p("html");
    l("html");
    (function () {
        if (c(".loading-layer").length <= 0) {
            reload_scripts("html");
            return false;
        }
        c("body").addClass("page-loading");
        c(".loading-layer .show-fx").addClass("on");
        var u = c(".site img").length;
        setTimeout(function () {
            c(".site").imagesLoaded({background: true}).always(function (v) {
                c(".loading-layer").addClass("hide-layer");
                setTimeout(function () {
                    c(".loading-layer").css("visibility", "hidden").removeClass("hide-layer show-layer");
                    c("body").removeClass("page-loading");
                    m("html");
                    i("#intro");
                }, 1400);
            }).progress(function (v, x) {
                if (x.isLoaded) {
                    c(x.img).addClass("loaded");
                    var w = c(".site img.loaded ").length, y = 100 * (w / u) + "%";
                    c("#loading-layer .progress-bar").css({width: y});
                }
            });
        }, 1000);
    })();
});