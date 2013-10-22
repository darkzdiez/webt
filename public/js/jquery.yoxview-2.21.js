if (!jQuery.jsonp) {
    // jquery.jsonp 1.0.4 (c) 2009 Julian Aubourg | MIT License
    // http://code.google.com/p/jquery-jsonp/
    (function ($) {
        var x = function (o) {
            return o !== undefined && o !== null;
        }, H = $("head"),
            Z = {}, K = {
                callback: "C",
                url: location.href
            };
        $.jsonp = function (d) {
            d = $.extend({}, K, d);
            if (x(d.beforeSend)) {
                var t = 0;
                d.abort = function () {
                    t = 1;
                };
                if (d.beforeSend(d, d) === false || t) return d;
            }
            var _ = "",
                y = "success",
                n = "error",
                u = x(d.url) ? d.url : _,
                p = x(d.data) ? d.data : _,
                s = (typeof p) == "string",
                k = function (f) {
                    setTimeout(f, 1);
                }, S, P, i, j, U;
            p = s ? p : $.param(p);
            x(d.callbackParameter) && (p += (p == _ ? _ : "&") + escape(d.callbackParameter) + "=?");
            !d.cache && !d.pageCache && (p += [(p == _ ? _ : "&"), "_xx", (new Date()).getTime(), "=", 1].join(_));
            S = u.split("?");
            if (p != _) {
                P = p.split("?");
                j = S.length - 1;
                j && (S[j] += "&" + P.shift());
                S = S.concat(P);
            }
            i = S.length - 2;
            i && (S[i] += d.callback + S.pop());
            U = S.join("?");
            if (d.pageCache && x(Z[U])) {
                k(function () {
                    if (x(Z[U].e)) {
                        x(d.error) && d.error(d, n);
                        x(d.complete) && d.complete(d, n);
                    } else {
                        var v = Z[U].s;
                        x(d.dataFilter) && (v = d.dataFilter(v));
                        x(d.success) && d.success(v, y);
                        x(d.complete) && d.complete(d, y);
                    }
                });
                return d;
            }
            var f = $("<iframe />");
            H.append(f);
            var F = f[0],
                W = F.contentWindow || F.contentDocument,
                D = W.document;
            if (!x(D)) {
                D = W;
                W = D.getParentNode();
            }
            var w, e = function (_, m) {
                    d.pageCache && !x(m) && (Z[U] = {
                        e: 1
                    });
                    w();
                    m = x(m) ? m : n;
                    x(d.error) && d.error(d, m);
                    x(d.complete) && d.complete(d, m);
                }, t = 0,
                C = d.callback,
                E = C == "E" ? "X" : "E";
            D.open();
            W[C] = function (v) {
                t = 1;
                d.pageCache && (Z[U] = {
                    s: v
                });
                k(function () {
                    w();
                    x(d.dataFilter) && (v = d.dataFilter(v));
                    x(d.success) && d.success(v, y);
                    x(d.complete) && d.complete(d, y);
                });
            };
            W[E] = function (s) {
                (!s || s == "complete") && !t++ && k(e);
            };
            w = function () {
                W[E] = undefined;
                W[C] = undefined;
                try {
                    delete W[E];
                } catch (_) {}
                try {
                    delete W[C];
                } catch (_) {}
                D.open()
                D.write(_);
                D.close();
                f.remove();
            }
            k(function () {
                D.write(['<html><head><script src="', U, '" onload="', E, '()" onreadystatechange="', E, '(this.readyState)"></script></head><body onload="', E, '()"></body></html>'].join(_));
                D.close();
            });
            d.timeout > 0 && setTimeout(function () {
                !t && e(_, "timeout");
            }, d.timeout);
            d.abort = w;
            return d;
        }
        $.jsonp.setup = function (o) {
            $.extend(K, o);
        };
    })(jQuery);
}

if (!jQuery().flash) {
    // jQuery SWFObject v1.1.1 MIT/GPL @jon_neal
    // http://jquery.thewikies.com/swfobject
    (function (f, h, i) {
        function k(a, c) {
            var b = (a[0] || 0) - (c[0] || 0);
            return b > 0 || !b && a.length > 0 && k(a.slice(1), c.slice(1))
        }

        function l(a) {
            if (typeof a != g) return a;
            var c = [],
                b = "";
            for (var d in a) {
                b = typeof a[d] == g ? l(a[d]) : [d, m ? encodeURI(a[d]) : a[d]].join("=");
                c.push(b)
            }
            return c.join("&")
        }

        function n(a) {
            var c = [];
            for (var b in a) a[b] && c.push([b, '="', a[b], '"'].join(""));
            return c.join(" ")
        }

        function o(a) {
            var c = [];
            for (var b in a) c.push(['<param name="', b, '" value="', l(a[b]), '" />'].join(""));
            return c.join("")
        }
        var g = "object",
            m = true;
        try {
            var j = i.description || function () {
                    return (new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                }()
        } catch (p) {
            j = "Unavailable"
        }
        var e = j.match(/\d+/g) || [0];
        f[h] = {
            available: e[0] > 0,
            activeX: i && !i.name,
            version: {
                original: j,
                array: e,
                string: e.join("."),
                major: parseInt(e[0], 10) || 0,
                minor: parseInt(e[1], 10) || 0,
                release: parseInt(e[2], 10) || 0
            },
            hasVersion: function (a) {
                a = /string|number/.test(typeof a) ? a.toString().split(".") : /object/.test(typeof a) ? [a.major, a.minor] : a || [0, 0];
                return k(e, a)
            },
            encodeParams: true,
            expressInstall: "expressInstall.swf",
            expressInstallIsActive: false,
            create: function (a) {
                if (!a.swf || this.expressInstallIsActive || !this.available && !a.hasVersionFail) return false;
                if (!this.hasVersion(a.hasVersion || 1)) {
                    this.expressInstallIsActive = true;
                    if (typeof a.hasVersionFail == "function")
                        if (!a.hasVersionFail.apply(a)) return false;
                    a = {
                        swf: a.expressInstall || this.expressInstall,
                        height: 137,
                        width: 214,
                        flashvars: {
                            MMredirectURL: location.href,
                            MMplayerType: this.activeX ? "ActiveX" : "PlugIn",
                            MMdoctitle: document.title.slice(0, 47) + " - Flash Player Installation"
                        }
                    }
                }
                attrs = {
                    data: a.swf,
                    type: "application/x-shockwave-flash",
                    id: a.id || "flash_" + Math.floor(Math.random() * 999999999),
                    width: a.width || 320,
                    height: a.height || 180,
                    style: a.style || ""
                };
                m = typeof a.useEncode !== "undefined" ? a.useEncode : this.encodeParams;
                a.movie = a.swf;
                a.wmode = a.wmode || "opaque";
                delete a.fallback;
                delete a.hasVersion;
                delete a.hasVersionFail;
                delete a.height;
                delete a.id;
                delete a.swf;
                delete a.useEncode;
                delete a.width;
                var c = document.createElement("div");
                c.innerHTML = ["<object ", n(attrs), ">", o(a), "</object>"].join("");
                return c.firstChild
            }
        };
        f.fn[h] = function (a) {
            var c = this.find(g).andSelf().filter(g);
            /string|object/.test(typeof a) && this.each(function () {
                var b = f(this),
                    d;
                a = typeof a == g ? a : {
                    swf: a
                };
                a.fallback = this;
                if (d = f[h].create(a)) {
                    b.children().remove();
                    b.html(d)
                }
            });
            typeof a == "function" && c.each(function () {
                var b = this;
                b.jsInteractionTimeoutMs = b.jsInteractionTimeoutMs || 0;
                if (b.jsInteractionTimeoutMs < 660) b.clientWidth || b.clientHeight ? a.call(b) : setTimeout(function () {
                    f(b)[h](a)
                }, b.jsInteractionTimeoutMs + 66)
            });
            return c
        }
    })(jQuery, "flash", navigator.plugins["Shockwave Flash"] || window.ActiveXObject);
}

if (typeof Yox == "undefined")
    Yox = {
        addStylesheet: function (a, b) {
            var d = a.createElement("link");
            d.setAttribute("rel", "Stylesheet");
            d.setAttribute("type", "text/css");
            d.setAttribute("href", b);
            a.getElementsByTagName("head")[0].appendChild(d)
        },
        compare: function (a, b) {
            function d(g) {
                var h = 0,
                    i;
                for (i in g) i != null && h++;
                return h
            }
            if (typeof a != typeof b) return false;
            else if (typeof a == "function") return a == b;
            if (d(a) != d(b)) return false;
            for (var e in a) {
                var c = a[e],
                    f = b[e];
                if (typeof c != typeof f) return false;
                if (c && c.length && c[0] !== undefined && c[0].tagName) {
                    if (!f ||
                        f.length != c.length || !f[0].tagName || f[0].tagName != c[0].tagName) return false
                } else if (typeof c == "function" || typeof c == "object") {
                    c = Yox.compare(c, f);
                    if (!c) return c
                } else if (c != f) return false
            }
            return true
        },
        hasProperties: function (a) {
            var b = false;
            for (pName in a) {
                b = true;
                break
            }
            return b
        },
        dataSources: [],
        fitImageSize: function (a, b, d, e) {
            var c = {
                width: a.width,
                height: a.height
            };
            if (a.width > b.width || d && a.width < b.width) {
                c.height = Math.round(b.width / a.width * a.height);
                c.width = b.width
            }
            if (!e && c.height > b.height) {
                c.width = Math.round(b.height /
                    c.height * c.width);
                c.height = b.height
            } else if (e && c.height < b.height && (b.height <= a.height || d)) {
                c.height = b.height;
                c.width = Math.round(b.height / a.height * a.width)
            }
            return c
        },
        flashVideoPlayers: {
            jwplayer: function (a, b, d, e, c) {
                a = {
                    swf: a || "/jwplayer/player.swf",
                    flashVars: {
                        file: b,
                        image: d,
                        stretching: "fill",
                        title: e,
                        backcolor: "000000",
                        frontcolor: "FFFFFF"
                    }
                };
                $.extend(a.flashVars, c);
                return a
            }
        },
        getDataSourceName: function (a) {
            for (dataSourceIndex in Yox.Regex.data)
                if (a.match(Yox.Regex.data[dataSourceIndex])) return dataSourceIndex;
            return null
        },
        getPath: function (a) {
            for (var b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) {
                var e = b[d].src.match(a);
                if (e) return e[1]
            }
            return null
        },
        getTopWindow: function () {
            var a = window;
            if (window.top) a = window.top;
            else
                for (; a.parent;) a = a.parent;
            return a
        },
        getUrlData: function (a) {
            a = a.match(Yox.Regex.url);
            if (!a) return null;
            var b = {
                path: a[1],
                anchor: a[3]
            };
            if (a[2]) b.queryFields = this.queryToJson(a[2]);
            return b
        },
        hex2rgba: function (a, b) {
            a = parseInt(a.replace("#", "0x"), 16);
            return "rgba(" + ((a & 16711680) >> 16) +
                ", " + ((a & 65280) >> 8) + ", " + (a & 255) + ", " + (typeof b != "undefined" ? b : "1") + ")"
        },
        queryToJson: function (a) {
            if (!a) return null;
            a = a.split("&");
            for (var b = {}, d = 0; d < a.length; d++) {
                var e = a[d].split("=");
                if (e.length == 2) b[e[0]] = e[1]
            }
            return b
        },
        loadDataSource: function (a, b) {
            var d;
            if (a.dataUrl)(d = Yox.getDataSourceName(a.dataUrl)) && $.extend(a, {
                dataSource: dataSourceIndex
            });
            if (a.dataSource && !Yox.dataSources[d]) $.ajax({
                url: a.dataFolder + a.dataSource + ".js",
                async: false,
                dataType: "script",
                success: function (e) {
                    eval(e);
                    eval("Yox.dataSources['" +
                        a.dataSource + "'] = new yox_" + a.dataSource + "();");
                    b(Yox.dataSources[a.dataSource])
                },
                error: function (e, c, f) {
                    console.log(e, c, f)
                }
            });
            else b && b()
        },
        Regex: {
            data: {
                picasa: /http:\/\/(?:www\.)?picasaweb\.google\..*/i,
                flickr: /http:\/\/(?:www\.)?flickr.com/i,
                smugmug: /http:\/\/.*\.smugmug.com/i,
                youtube: /^http:\/\/(?:www\.)?youtube.com\//
            },
            flash: /^(.*\.(swf))(\?[^\?]+)?/i,
            flashvideo: /^(.*\.(flv|f4v|f4p|f4a|f4b|aac))(\?[^\?]+)?/i,
            image: /^[^\?#]+\.(?:jpg|jpeg|gif|png)$/i,
            url: /^([^#\?]*)?(?:\?([^\?#]*))?(?:#([A-Za-z]{1}[A-Za-z\d-_\:\.]+))?$/,
            video: {
                youtube: /.*youtube.com\/watch.*(?:v=[^&]+).*/i,
                vimeo: /vimeo.com\/\d+/i,
                hulu: /hulu.com\/watch\//i,
                viddler: /viddler.com\//i,
                flickr: /.*flickr.com\/.*/i,
                myspace: /.*vids.myspace.com\/.*/i,
                qik: /qik.com/i,
                revision3: /revision3.com/i,
                dailymotion: /dailymotion.com/i,
                "5min": /.*5min\.com\/Video/i
            }
        },
        Sprites: function (a, b, d) {
            this.spritesImage = (new Image).src = b;
            var e = 0;
            jQuery.each(a, function (c, f) {
                f.top = e;
                e += f.height
            });
            this.getSprite = function (c, f, g) {
                return jQuery("<img/>", {
                    src: d,
                    alt: f,
                    title: g,
                    css: {
                        width: a[c].width,
                        height: a[c].height,
                        "background-image": "url(" + b + ")",
                        "background-repeat": "no-repeat",
                        "background-position": this.getBackgroundPosition(c, f)
                    }
                })
            };
            this.getBackgroundPosition = function (c, f) {
                return "-" + jQuery.inArray(f, a[c].sprites) * (a[c].width || 0) + "px -" + a[c].top + "px"
            }
        },
        Support: {
            rgba: function () {
                if (!("result" in arguments.callee)) {
                    var a = document.createElement("div"),
                        b = false;
                    try {
                        a.style.color = "rgba(0, 0, 0, 0.5)";
                        b = /^rgba/.test(a.style.color)
                    } catch (d) {}
                    arguments.callee.result = b
                }
                return arguments.callee.result
            }
        },
        urlDataToPath: function (a) {
            var b = a.path || "";
            if (a.queryFields && this.hasProperties(a.queryFields)) {
                b += "?";
                for (field in a.queryFields) b += field + "=" + a.queryFields[field] + "&";
                b = b.substring(0, b.length - 1)
            }
            if (a.anchor) b += "#" + a.anchor;
            return b
        }
    };

// yoxthumbs:
(function (h) {
    function n(d, a) {
        function k(b) {
            var c = f("<a>", {
                href: b.link,
                class: a.thumbnailsClass || "yoxthumbs_thumbnail"
            }),
                e = jQuery("<img>", {
                    src: b.thumbnailSrc,
                    alt: b.media.alt,
                    title: b.media.title
                });
            b.data && c.data("yoxthumbs", b.data);
            b.thumbnailDimensions && e.css({
                width: b.thumbnailDimensions.width,
                height: b.thumbnailDimensions.height
            });
            e.appendTo(c);
            if (a.setTitles && b.media.title) f(a.titlesElement || "<span>", {
                html: l.title(b.media.title),
                class: a.titlesClass
            }).appendTo(c);
            if (a.setDescriptions && b.media.description) f(a.descriptionsElement ||
                "<div>", {
                    html: l.description(b.media.description),
                    class: a.descriptionsClass
                }).appendTo(c);
            return c
        }
        var i = this;
        d.data("yoxview") && d.data("yoxview");
        var f = jQuery,
            m = d[0].tagName == "A",
            l = {};
        this.thumbnails = [];
        (function () {
            f.each(["title", "description"], function (b, c) {
                var e = a[c + "MaxLength"];
                l[c] = function (g) {
                    return !e || g.length <= e ? g : g.substr(0, e) + (a.addEllipsis !== false ? "&hellip;" : "")
                }
            })
        })();
        a.images && f.each(a.images, function (b, c) {
            d.append(k(c))
        });
        var o = 0,
            p = m ? d : d.find("a:has(img)");
        f.each(p, function (b, c) {
            var e =
                f(c),
                g = true;
            if (a.enableOnlyMedia)
                if (!c.href.match(Yox.Regex.image)) {
                    var j = false;
                    for (dataProvider in Yox.Regex.data)
                        if (c.href.match(Yox.Regex.data[dataProvider])) {
                            j = true;
                            break
                        }
                    if (!j) {
                        j = false;
                        for (videoProvider in Yox.Regex.video)
                            if (c.href.match(Yox.Regex.video[videoProvider])) {
                                j = true;
                                break
                            }
                        j || (g = false)
                    }
                }
            if (g) {
                e.data("yoxthumbs", f.extend({
                    imageIndex: o++
                }, e.data("yoxthumbs")));
                i.thumbnails.push(e)
            }
        });
        if (a.thumbsOpacity) {
            this.thumbnails.css("opacity", a.thumbsOpacity);
            d.delegate("a:has(img)", "mouseenter.yoxthumbs",
                function (b) {
                    if (i.currentSelectedIndex === undefined || f(b.currentTarget).data("yoxthumbs").imageIndex != i.currentSelectedIndex) f(b.currentTarget).stop().animate({
                        opacity: 1
                    }, a.thumbsOpacityFadeTime)
                }).delegate("a:has(img)", "mouseout.yoxthumbs", function (b) {
                if (i.currentSelectedIndex === undefined || f(b.currentTarget).data("yoxthumbs").imageIndex != i.currentSelectedIndex) f(b.currentTarget).stop().animate({
                    opacity: a.thumbsOpacity
                }, a.thumbsOpacityFadeTime)
            })
        }
        if (a.onClick) m ? d.bind("click.yoxthumbs", function (b) {
            a.onClick(b);
            return false
        }) : d.delegate("a:has(img)", "click.yoxthumbs", function (b) {
            if (!f(b.currentTarget).data("yoxthumbs")) return true;
            a.onClick(b);
            return false
        });
        this.select = function (b) {
            if (this.currentSelectedIndex === undefined || this.currentSelectedIndex != b) {
                var c = this.thumbnails.eq(b),
                    e = d.data("yoxslide");
                e && e.show(c);
                if (this.currentSelectedIndex !== undefined) {
                    e = this.thumbnails.eq(this.currentSelectedIndex);
                    e.removeClass(a.selectedThumbnailclass);
                    a.thumbsOpacity && e.animate({
                        opacity: a.thumbsOpacity
                    }, a.thumbsOpacityFadeTime)
                }
                c.addClass(a.selectedThumbnailclass);
                a.thumbsOpacity && c.animate({
                    opacity: 1
                }, a.thumbsOpacityFadeTime);
                this.currentSelectedIndex = b
            }
        };
        this.unload = function (b) {
            f.each(this.thumbnails, function (c, e) {
                f(e).removeData("yoxthumbs");
                b && f(e).removeData(b)
            });
            d.undelegate("a:has(img)", "click.yoxthumbs");
            d.find(".yoxthumbs_thumbnail").remove();
            m && d.unbind(".yoxthumbs")
        }
    }
    h.fn.yoxthumbs = function (d) {
        if (this.length == 0) return this;
        if (typeof d != "string") {
            var a = h.extend({
                target: null,
                selectedThumbnailclass: "selected",
                thumbsOpacityFadeTime: 300,
                thumbsOpacity: undefined,
                prevBtn: undefined,
                nextBtn: undefined,
                onClick: undefined,
                images: undefined,
                enableOnlyMedia: false
            }, d),
                k = h(this);
            k.data("yoxthumbs", new n(k, a))
        } else if (a = h(this).data("yoxthumbs"))
            if (h.isFunction(a[d])) a[d].apply(a, Array.prototype.slice.call(arguments, 1));
            else return a[d];
        return this
    }
})(jQuery);

/*!
 * jquery.yoxview
 * jQuery media viewer
 * http://yoxigen.com/yoxview
 *
 * Copyright (c) 2010 Yossi Kolesnicov
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 13th November, 2010
 * Version : 2.2
 */
(function (b) {
    function jb() {
        function H(a) {
            for (var c = A.length, e = 0; e < c; e++)
                if (Yox.compare(A[e], a)) return e;
            A.push(a);
            return c
        }

        function za(a) {
            return "a:has(img)" + (a.textLinksSelector !== null ? ",a" + a.textLinksSelector : "")
        }

        function kb(a, c) {
            if (a.skin) {
                var e = a.skin;
                if (b.yoxview.yoxviewSkins[e]) c && c(b.yoxview.yoxviewSkins[e]);
                else {
                    var f = P + "skins/" + e + "/yoxview." + e;
                    b.ajax({
                        url: f + ".js",
                        dataType: "script",
                        success: function () {
                            b.yoxview.yoxviewSkins[e].css !== false && Yox.addStylesheet(top.document, f + ".css");
                            c && c(b.yoxview.yoxviewSkins[e])
                        },
                        error: function () {
                            alert("Error loading skin file " + f + ".js")
                        }
                    })
                }
            } else c && c(b.yoxview.yoxviewSkins[e])
        }

        function lb(a, c) {
            if (W[a]) c && c(W[a]);
            else {
                W[a] = {};
                var e = P + "lang/" + a + ".js";
                b.ajax({
                    url: e,
                    async: false,
                    dataType: "json",
                    success: function (f) {
                        W[a] = f;
                        c && c(f)
                    },
                    error: function () {
                        alert("Error al cargar el archivo de lenguaje " + e)
                    }
                })
            }
        }

        function Aa(a) {
            a = a.data("yoxview");
            if (!w || Ba != a.viewIndex) {
                if (!a.cacheVars) a.cacheVars = {
                    cachedImagesCount: 0,
                    cacheDirectionForward: true,
                    cacheBufferLastIndex: null,
                    currentCacheImg: 0
                };
                w = a.images;
                m = w.length;
                Ba = a.viewIndex;
                var c = false;
                if (!la || la != a.optionsSet) {
                    la = a.optionsSet || 0;
                    d = A[la];
                    c = true
                }
                if (d.onLoadImages) d.onLoadImages({
                    images: w,
                    viewData: a
                });
                else if (Q && m == 1 || k && !Q && m > 0) c = true;
                if (c) {
                    if (k) {
                        t.remove();
                        K = R = X = L = ma = Q = k = undefined;
                        u = 0;
                        b.yoxview.infoButtons = {}
                    }
                    Sa()
                }
                l = a.cacheVars
            }
        }

        function Ta(a, c, e) {
            a = c && (c.width || c.height) ? {
                width: parseInt(c.width),
                height: parseInt(c.height)
            } : e.defaultDimensions[a];
            if (isNaN(a.width)) a.width = null;
            if (isNaN(a.height)) a.height = null;
            return a
        }

        function Ua(a, c, e, f) {
            var h =
                function (g) {
                    var i = b(g.currentTarget).data("yoxview");
                    if (!i || i.imageIndex === null) return true;
                    else {
                        g.preventDefault();
                        b.yoxview.open(b(g.liveFired || g.currentTarget).data("yoxview").viewIndex, i.imageIndex)
                    }
            };
            if (a[0].tagName == "A") a.bind("click.yoxview", h);
            else e ? a.yoxthumbs(b.extend({
                images: e,
                enableOnlyMedia: false,
                onClick: f || function (g) {
                    g.preventDefault();
                    c.thumbnailsOptions && c.thumbnailsOptions.onClick ? c.thumbnailsOptions.onClick(b(g.currentTarget).data("yoxview").imageIndex, b(g.currentTarget), b(g.liveFired).data("yoxview").viewIndex) :
                        b.yoxview.open(b(g.liveFired || g.currentTarget).data("yoxview").viewIndex, b(g.currentTarget).data("yoxview").imageIndex);
                    return false
                }
            }, c.thumbnailsOptions)) : a.delegate(za(c), "click.yoxview", h)
        }

        function Va(a) {
            var c = M[Ba];
            B = c[0].tagName == "A" ? c : w[u].thumbnailImg;
            if (!B || B.length == 0) B = w[0].thumbnailImg;
            if (B) {
                c = B.attr("src");
                a && L && c && L.attr("src", c);
                if (mb && !S && window.name) S = b(top.document).find("[name='" + window.name + "']").offset();
                Ca = B.offset();
                Y = {
                    width: B.width(),
                    height: B.height(),
                    top: Math.round(Ca.top -
                        Z.scrollTop() + (S ? S.top : 0)),
                    left: Math.round(Ca.left + (S ? S.left : 0))
                }
            }
        }

        function na(a) {
            oa.css("background-position", C.getBackgroundPosition("notifications", a));
            oa.stop().fadeIn(d.buttonsFadeTime, function () {
                b(this).delay(500).fadeOut(d.buttonsFadeTime)
            })
        }

        function nb(a) {
            b(a).stop().animate({
                opacity: 0.5
            }, d.buttonsFadeTime)
        }

        function ob(a) {
            if (b.yoxview && b.yoxview.isOpen) {
                var c = b.yoxview[Wa[pb[a.keyCode]]];
                if (c) {
                    a.preventDefault();
                    c.apply(b.yoxview);
                    return false
                }
                return true
            }
            return true
        }

        function Da(a, c, e) {
            var f =
                b("<a>", {
                    href: "#",
                    click: function () {
                        return b.yoxview.clickBtn(b.yoxview[c], e)
                    }
                });
            b("<span>" + a + "</span>").css("opacity", "0").appendTo(f);
            f.append(C.getSprite("icons", c));
            return f
        }

        function Xa(a, c, e) {
            var f = new Image;
            f.src = d.imagesFolder + c + ".png";
            f = b("<a>", {
                css: {
                    background: "url(" + f.src + ") no-repeat " + c + " center",
                    opacity: "0",
                    outline: "0"
                },
                class: "yoxview_ctlBtn",
                href: "#"
            });
            f.css(c, "0");
            if (e) f.css("cursor", "default");
            else {
                f.click(function () {
                    this.blur();
                    return b.yoxview.clickBtn(a, true)
                });
                d.buttonsFadeTime !=
                    0 && f.hover(function () {
                        b.yoxview.isOpen && b(this).stop().animate({
                            opacity: 0.6
                        }, d.buttonsFadeTime)
                    }, function () {
                        b(this).stop().animate({
                            opacity: 0
                        }, d.buttonsFadeTime)
                    })
            }
            return f
        }

        function qb() {
            var a = typeof d.popupMargin == "number" ? [String(d.popupMargin)] : d.popupMargin.split(" ", 4);
            j.top = parseInt(a[0]);
            switch (a.length) {
            case 1:
                j.bottom = j.right = j.left = j.top;
                break;
            case 2:
                j.bottom = j.top;
                j.right = j.left = parseInt(a[1]);
                break;
            case 3:
                j.bottom = parseInt(a[2]);
                j.right = j.left = parseInt(a[1]);
                break;
            default:
                b.extend(j, {
                    right: parseInt(a[1]),
                    bottom: parseInt(a[2]),
                    left: parseInt(a[3])
                })
            }
            j.totalHeight = j.top + j.bottom;
            j.totalWidth = j.left + j.right;
            d.renderInfoExternally && b.extend(Ya, j)
        }

        function Sa() {
            qb();
            D = Ea();
            C = new Yox.Sprites({
                notifications: {
                    width: 59,
                    height: 59,
                    sprites: ["vacío", "reproducirRTL", "reproducir", "pause", "anterior", "primero"]
                },
                icons: {
                    width: 18,
                    height: 18,
                    sprites: ["close", "help", "playpause", "link", "pin", "unpin", "play", "pause", "right", "left"]
                },
                menu: {
                    height: 42,
                    sprites: ["back"]
                }
            }, d.imagesFolder + "sprites.png", d.imagesFolder + "empty.gif");
            Wa = {
                RIGHT: d.isRTL ?
                    "prev" : "next",
                DOWN: "next",
                UP: "prev",
                LEFT: d.isRTL ? "next" : "prev",
                ENTER: "play",
                HOME: "first",
                END: "last",
                SPACE: "next",
                h: "help",
                ESCAPE: "close"
            };
            n = W[d.lang];
            var a = d.skin ? b.yoxview.yoxviewSkins[d.skin] : null;
            k = b("<div>", {
                id: "yoxview",
                click: function (g) {
                    g.stopPropagation()
                }
            });
            t = b("<div>", {
                id: "yoxview_popupWrap",
                click: function (g) {
                    g.preventDefault();
                    b.yoxview.clickBtn(b.yoxview.close, true)
                }
            });
            d.skin && t.attr("class", "yoxview_" + d.skin);
            if (d.backgroundOpacity === 0) t.css("background", "none");
            else Yox.Support.rgba() &&
                t.css("background-color", Yox.hex2rgba(d.backgroundColor, d.backgroundOpacity));
            t.appendTo(b(top.document.getElementsByTagName("body")[0])).append(k);
            R = b("<div>", {
                class: "yoxview_imgPanel",
                css: {
                    "z-index": "2"
                }
            });
            K = b("<div>", {
                class: "yoxview_imgPanel",
                css: {
                    "z-index": "1",
                    display: "none"
                }
            });
            L = b("<img />", {
                class: "yoxview_fadeImg",
                css: {
                    display: "block",
                    width: "100%",
                    height: "100%"
                }
            });
            X = b("<img />", {
                class: "yoxview_fadeImg",
                css: {
                    display: "block",
                    width: "100%",
                    height: "100%"
                }
            });
            R.data("yoxviewPanel", {
                image: L
            }).append(L).appendTo(k);
            K.data("yoxviewPanel", {
                image: X
            });
            K.append(X).appendTo(k);
            var c = m == 1;
            if (c && !w[0].media.title) d.renderInfo = false;
            if (d.renderMenu !== false) {
                var e = b("<div>", {
                    class: "yoxview_popupBarPanel yoxview_top"
                });
                d.autoHideMenu !== false && e.hover(function () {
                    b.yoxview.isOpen && Za()
                }, function () {
                    b.yoxview.isOpen && Fa()
                });
                x = b("<div>", {
                    id: "yoxview_menuPanel"
                });
                if (Yox.Support.rgba() && d.menuBackgroundColor) x.css("background", Yox.hex2rgba(d.menuBackgroundColor, d.menuBackgroundOpacity || 0.8));
                var f = Da(n.Help, "help", false);
                b.yoxview.infoButtons.playBtn = Da(n.Slideshow, "play", false);
                $ = b.yoxview.infoButtons.playBtn.children("span");
                x.append(Da(n.Close, "close", true), f, b.yoxview.infoButtons.playBtn);
                if (c) {
                    b.yoxview.infoButtons.playBtn.css("display", "none");
                    f.css("display", "none");
                    x.css({
                        width: 58
                    })
                }
                x.find("a:last-child").attr("class", "last");
                e.append(x).appendTo(k);
                x.delegate("a", "mouseenter", function () {
                    b(this).stop().animate({
                        top: "8px"
                    }, "fast").find("span").stop().animate({
                        opacity: 1
                    }, "fast")
                }).delegate("a",
                    "mouseleave", function () {
                        b(this).stop().animate({
                            top: "0"
                        }, "fast").find("span").stop().animate({
                            opacity: 0
                        }, "fast")
                    })
            }
            if (d.renderButtons !== false && (!c || !b.support.opacity)) {
                Q = Xa(b.yoxview.prev, d.isRTL ? "right" : "left", c);
                ma = Xa(b.yoxview.next, d.isRTL ? "left" : "right", c);
                k.append(Q, ma);
                N = c && !b.support.opacity ? b() : k.find(".yoxview_ctlBtn")
            } else N = b();
            aa = b("<div>", {
                id: "yoxview_ajaxLoader",
                class: "yoxview_notification",
                css: {
                    display: "none"
                }
            });
            aa.append(b("<img>", {
                src: d.imagesFolder + "popup_ajax_loader.gif",
                alt: n.Loading,
                css: {
                    width: 32,
                    height: 32,
                    "background-image": "url(" + d.imagesFolder + "sprites.png)",
                    "background-position": C.getBackgroundPosition("notifications", "empty")
                }
            })).appendTo(k);
            if (!d.disableNotifications) {
                oa = b("<img>", {
                    class: "yoxview_notification"
                });
                k.append(oa)
            }
            O = b("<div>", {
                id: "yoxview_helpPanel",
                href: "#",
                title: n.CloseHelp,
                css: {
                    background: "url(" + d.imagesFolder + "help_panel.png) no-repeat center top",
                    direction: n.Direction,
                    opacity: "0"
                },
                click: function () {
                    return b.yoxview.clickBtn(b.yoxview.help, false)
                }
            });
            e =
                document.createElement("h1");
            e.innerHTML = n.Help.toUpperCase();
            f = document.createElement("p");
            f.innerHTML = n.HelpText;
            var h = document.createElement("span");
            h.id = "yoxview_closeHelp";
            h.innerHTML = n.CloseHelp;
            O.append(e).append(f).append(h).appendTo(k);
            if (d.renderInfo !== false) {
                o = b("<div>", {
                    id: "yoxview_infoPanel",
                    click: function (g) {
                        g.stopPropagation()
                    }
                });
                if (d.infoBackOpacity === 0) {
                    o.css("background", "none");
                    G = o
                } else if (Yox.Support.rgba()) {
                    G = o;
                    o.css("background-color", Yox.hex2rgba(d.infoBackColor, d.infoBackOpacity))
                } else {
                    o.append(b("<div>", {
                        id: "yoxview_infoPanelBack",
                        css: {
                            background: d.infoBackColor,
                            opacity: d.infoBackOpacity
                        }
                    }));
                    G = b("<div>", {
                        id: "yoxview_infoPanelContent"
                    })
                }
                pa = b("<span>", {
                    id: "yoxview_count"
                });
                T = b("<div>", {
                    id: "yoxview_infoText"
                });
                if (c) {
                    T.css("margin-left", "10px");
                    pa.css("display", "none")
                }
                G.append(pa);
                if (d.renderInfoPin !== false) {
                    Ga = C.getSprite("icons", d.autoHideInfo ? "pin" : "unpin");
                    $a = b("<a>", {
                        class: "yoxviewInfoLink",
                        href: "#",
                        title: d.autoHideInfo ? n.PinInfo : n.UnpinInfo,
                        css: {
                            display: "inline"
                        },
                        click: function (g) {
                            g.preventDefault();
                            d.autoHideInfo = !d.autoHideInfo;
                            Ga.css("background-position", C.getBackgroundPosition("icons", d.autoHideInfo ? "pin" : "unpin"));
                            this.title = d.autoHideInfo ? n.PinInfo : n.UnpinInfo
                        }
                    });
                    $a.append(Ga).appendTo(G)
                }
                if (a && a.infoButtons) {
                    a = a.infoButtons(d, n, C, t, k);
                    if (d.infoButtons) b.extend(d.infoButtons, a);
                    else d.infoButtons = a
                }
                if (d.infoButtons) {
                    b.extend(b.yoxview.infoButtons, d.infoButtons);
                    for (infoButton in d.infoButtons) d.infoButtons[infoButton].attr("class", "yoxviewInfoLink").css("display", "block").appendTo(G)
                }
                if (d.linkToOriginalContext !==
                    false) {
                    ba = b("<a>", {
                        class: "yoxviewInfoLink",
                        target: "_blank",
                        title: n.OriginalContext
                    });
                    ba.append(C.getSprite("icons", "link")).appendTo(G)
                }
                G.append(T);
                Yox.Support.rgba() || o.append(G);
                o.appendTo(d.renderInfoExternally ? t : k);
                if (!d.renderInfoExternally) {
                    I = b("<div>", {
                        class: "yoxview_popupBarPanel yoxview_bottom"
                    });
                    I.hover(function () {
                        b.yoxview.isOpen && !ca && d.autoHideInfo !== false && qa()
                    }, function () {
                        b.yoxview.isOpen && !ca && d.autoHideInfo !== false && da()
                    });
                    o.wrap(I);
                    I = o.parent()
                }
            }
            Yox.Support.rgba() || b("<div>", {
                css: {
                    position: "fixed",
                    height: "100%",
                    width: "100%",
                    top: "0",
                    left: "0",
                    background: d.backgroundColor,
                    "z-index": "1",
                    opacity: d.backgroundOpacity
                }
            }).appendTo(t)
        }

        function Ha() {
            l.cachedImagesCount++;
            if (l.cachedImagesCount == m) l.cacheComplete = true;
            else ab()
        }

        function ab() {
            if (!d.cacheBuffer || l.currentCacheImg != l.cacheBufferLastIndex) ea(l.currentCacheImg + (l.cacheDirectionForward ? 1 : -1))
        }

        function Ia() {
            if (d.cacheBuffer) {
                l.cacheBufferLastIndex = l.cacheDirectionForward ? u + d.cacheBuffer : u - d.cacheBuffer;
                if (l.cacheBufferLastIndex <
                    0) l.cacheBufferLastIndex += m;
                else if (l.cacheBufferLastIndex >= m) l.cacheBufferLastIndex -= m
            }
        }

        function ea(a) {
            if (!l.cacheComplete) {
                if (a == m) a = 0;
                else if (a < 0) a += m;
                var c = w[a].media;
                l.currentCacheImg = a;
                if (c && !c.loaded)
                    if (!c.contentType || c.contentType === "image") bb.src = c.src;
                    else cb(c, function () {
                        Ha()
                    });
                    else ab()
            }
        }

        function rb() {
            Ja = true;
            clearTimeout(Ka);
            aa.stop();
            Ka = setTimeout(function () {
                aa.css("opacity", "0.6").fadeIn(d.buttonsFadeTime)
            }, d.buttonsFadeTime)
        }

        function db() {
            r || rb();
            sb(b.yoxview.currentImage.media)
        }

        function La(a, c) {
            k.stop().animate(a, d.popupResizeTime, c)
        }

        function ra() {
            if (m != 1) {
                r = true;
                if ($) $.text(n.Pause);
                else b.yoxview.infoButtons.playBtn && b.yoxview.infoButtons.playBtn.attr("title", n.Pause);
                b.yoxview.infoButtons.playBtn && b.yoxview.infoButtons.playBtn.find("img").css("background-position", C.getBackgroundPosition("icons", "pause"));
                if (u < m - 1) Ma = setTimeout(function () {
                    b.yoxview.next(true)
                }, d.playDelay);
                else {
                    if (d.loopPlay) Ma = setTimeout(function () {
                        b.yoxview.select(0, null)
                    }, d.playDelay);
                    else E();
                    d.onEnd &&
                        setTimeout(d.onEnd, d.playDelay)
                }
            }
        }

        function E() {
            clearTimeout(Ma);
            r = false;
            if ($) $.text(n.Play);
            else b.yoxview.infoButtons.playBtn && b.yoxview.infoButtons.playBtn.attr("title", n.Play);
            b.yoxview.infoButtons.playBtn && b.yoxview.infoButtons.playBtn.find("img").css("background-position", C.getBackgroundPosition("icons", "play"))
        }

        function Ea() {
            var a = Z.width(),
                c = Z.height();
            return {
                height: c,
                width: a,
                usableArea: {
                    height: c - j.totalHeight,
                    width: a - j.totalWidth
                }
            }
        }

        function eb(a) {
            a = a.width && a.height ? Yox.fitImageSize(a, D.usableArea) : {
                width: a.width ? Math.min(a.width, D.usableArea.width) : D.usableArea.width,
                height: a.height ? Math.min(a.height, D.usableArea.height) : D.usableArea.height
            };
            a.top = j.top + Math.round((D.usableArea.height - a.height) / 2);
            a.left = j.left + Math.round((D.usableArea.width - a.width) / 2);
            return a
        }

        function qa(a) {
            clearTimeout(fa);
            var c = T.outerHeight();
            if (c < fb) c = fb;
            o.height() !== c && o.stop().animate({
                height: c
            }, 500, function () {
                if (d.renderInfoExternally) {
                    var e = o.position();
                    b.extend(j, Ya);
                    if (e.top === 0) j.top += c;
                    else j.bottom += c;
                    j.totalHeight =
                        j.top + j.bottom;
                    D = Ea();
                    b.yoxview.resize(false)
                }
                a && a()
            })
        }

        function da(a) {
            clearTimeout(fa);
            o.stop().animate({
                height: 0
            }, 500, function () {
                a && a()
            })
        }

        function Fa(a) {
            if (x) {
                clearTimeout(Na);
                x.stop().animate({
                    top: tb
                }, 500, function () {
                    a && a()
                })
            }
        }

        function Za(a) {
            if (x) {
                clearTimeout(Na);
                x.stop().animate({
                    top: 0
                }, 500, function () {
                    a && a()
                })
            }
        }

        function gb() {
            ga = s;
            s = sa ? K : R;
            sa = !sa
        }

        function ta(a) {
            var c = a.contentType === "image" || !a.contentType;
            c && ca && I && I.css("display", "block");
            clearTimeout(fa);
            gb();
            var e = s.data("yoxviewPanel");
            y.width =
                a.width;
            y.height = a.height;
            y.padding = a.padding;
            if (o) {
                var f = a.title || "";
                if (d.showDescription && a.description) f += f != "" ? "<div id='yoxview_infoTextDescription'>" + a.description + "</div>" : a.description;
                T.html(f);
                m > 1 && pa.html(u + 1 + "/" + m);
                if (ba) b.yoxview.currentImage.link ? ba.attr("href", b.yoxview.currentImage.link).css("display", "inline") : ba.css("display", "none")
            }
            f = eb(a);
            if (c) {
                currentImageElement = sa ? L : X;
                currentImageElement.attr({
                    src: a.src,
                    title: a.title,
                    alt: a.alt
                });
                e.image = currentImageElement;
                if (!e.isImage && e.element) {
                    e.element.css("display",
                        "none");
                    e.image.css("display", "block");
                    e.isImage = true
                }
                if (!ha) {
                    d.renderButtons && N.css({
                        height: "100%",
                        width: "50%",
                        top: "0"
                    });
                    ca = false;
                    ha = true
                }
            } else {
                if (e.element && e.elementId != a.elementId) {
                    e.element.remove();
                    e.element = undefined
                }
                if (!e.element)
                    if (a.html) {
                        e.element = b("<div>", {
                            class: ub
                        });
                        k.append(e.element)
                    } else {
                        k.append(a.element);
                        e.element = a.element
                    }
                a.html && e.element.html(a.html);
                s = e.element;
                if (ha) {
                    if (I) {
                        d.autoHideInfo !== false && da();
                        I.css("display", "none");
                        ca = true
                    }
                    d.renderButtons && N.css({
                        width: ua.width,
                        height: ua.height
                    });
                    ha = false
                }
                d.renderButtons && N.css({
                    top: (f.height - ua.height) / 2
                });
                if (e.isImage === undefined || e.isImage) {
                    e.element.css("display", "block");
                    e.image.css("display", "none");
                    e.isImage = false
                }
            }
            var h = {
                width: f.width,
                height: f.height
            };
            s.css(ia ? {
                width: "100%",
                height: "100%"
            } : h);
            if (Ja) {
                Ja = false;
                clearTimeout(Ka);
                aa.stop().fadeOut(d.buttonsFadeTime)
            }
            U = true;
            La(f, function () {
                if (ia) {
                    b.yoxview.isOpen = true;
                    s.css(h);
                    if (d.controlsInitialDisplayTime > 0) {
                        d.showButtonsOnOpen && N.animate({
                                opacity: 0.5
                            }, d.controlsInitialFadeTime,
                            function () {
                                d.buttonsFadeTime != 0 && b(this).delay(d.controlsInitialDisplayTime).animate({
                                    opacity: 0
                                }, d.controlsInitialFadeTime)
                            });
                        if (d.showBarsOnOpen) {
                            Za(function () {
                                if (d.autoHideMenu !== false) Na = setTimeout(function () {
                                    Fa()
                                }, d.controlsInitialDisplayTime)
                            });
                            o && qa(function () {
                                if (d.autoHideInfo !== false) fa = setTimeout(function () {
                                    da()
                                }, d.controlsInitialDisplayTime)
                            })
                        }
                    }
                    d.autoPlay && b.yoxview.play();
                    d.onOpen && d.onOpen();
                    if (va) {
                        va();
                        va = undefined
                    }
                    ia = false
                }
                if (y.padding) {
                    var g = k.width(),
                        i = k.height();
                    if (y.padding) {
                        g -=
                            y.padding.horizontal;
                        i -= y.padding.vertical
                    }
                    s.css({
                        width: g + "px",
                        height: i + "px"
                    })
                }
                U = false
            });
            s.css({
                "z-index": "2",
                opacity: 1
            });
            ga && ga.css("z-index", "1");
            ia ? s.css({
                display: "block",
                width: "100%",
                height: "100%"
            }) : s.fadeIn(d.popupResizeTime, function () {
                ga && ga.css("display", "none");
                o && qa(function () {
                    if (d.autoHideInfo !== false) fa = setTimeout(function () {
                        da()
                    }, d.titleDisplayDuration)
                });
                if (m > 1) {
                    if (d.cacheImagesInBackground && !l.cacheComplete) ea(u + (l.cacheDirectionForward ? 1 : -1));
                    r && ra()
                }
            })
        }

        function vb(a, c, e, f, h) {
            jQuery.jsonp({
                url: wb[a] ||
                    "http://oohembed.com/oohembed/",
                data: jQuery.extend({
                    url: c,
                    format: "json"
                }, e),
                dataType: "jsonp",
                callbackParameter: "callback",
                success: function (g) {
                    var i = {
                        title: g.title,
                        width: g.width,
                        height: g.height,
                        type: g.type
                    };
                    if (g.type === "video") i.html = g.html.replace(/<embed /, '<embed wmode="transparent" ').replace(/<param/, '<param name="wmode" value="transparent"><param').replace(/width=\"[\d]+\"/ig, 'width="100%"').replace(/height=\"[\d]+\"/ig, 'height="100%"');
                    else g.type === "photo" && jQuery.extend(i, {
                        src: g.url,
                        alt: g.title,
                        type: "image"
                    });
                    f(i)
                },
                error: function (g, i) {
                    h && h(g, i)
                }
            })
        }

        function sb(a) {
            try {
                if (!a) throw "Error: Media is unavailable.";
                if (a.contentType === "image" || !a.contentType) {
                    if (b.support.opacity) Oa.src = "";
                    Oa.src = a.src
                } else !a.loaded && a.contentType == "ooembed" ? cb(a, function (e) {
                    ta(e)
                }, function (e) {
                    wa("Error getting data from:<br /><span class='errorUrl'>" + e.data.url + "</span>")
                }) : ta(b.yoxview.currentImage.media)
            } catch (c) {
                wa(c)
            }
        }

        function cb(a, c, e) {
            a.contentType == "ooembed" && vb(a.provider, a.url, d.defaultDimensions.video,
                function (f) {
                    b.extend(a, f, {
                        loaded: true
                    });
                    c && c(a)
                }, e)
        }

        function wa(a) {
            ta({
                html: "<span class='yoxview_error'>" + a + "</span>",
                width: 500,
                height: 300,
                type: "error",
                title: ""
            })
        }
        var P = P || Yox.getPath(/(.*\/)jquery\.yoxview/i),
            hb = {
                autoHideInfo: true,
                autoPlay: false,
                backgroundColor: "#000000",
                backgroundOpacity: 0.8,
                buttonsFadeTime: 300,
                cacheBuffer: 5,
                cacheImagesInBackground: true,
                controlsInitialFadeTime: 1500,
                controlsInitialDisplayTime: 1E3,
                dataFolder: P + "data/",
                defaultDimensions: {
                    flash: {
                        width: 720,
                        height: 560
                    },
                    iframe: {
                        width: 1024
                    }
                },
                flashVideoPlayer: "jwplayer",
                imagesFolder: P + "images/",
                infoBackColor: "#000000",
                infoBackOpacity: 0.5,
                isRTL: false,
                lang: "en",
                langFolder: P + "lang/",
                loopPlay: true,
                playDelay: 3E3,
                popupMargin: 20,
                popupResizeTime: 600,
                renderButtons: true,
                renderMenu: true,
                showBarsOnOpen: true,
                showButtonsOnOpen: true,
                showDescription: true,
                textLinksSelector: ".yoxviewLink",
                thumbnailsOptions: {
                    thumbnailsClass: "yoxview_thumbnail"
                },
                titleAttribute: "title",
                titleDisplayDuration: 2E3
            };
        this.infoButtons = {};
        this.isOpen = false;
        this.yoxviewSkins = {};
        var aa,
            l = {}, bb = new Image,
            pa, N, xb = 0,
            u = 0,
            n = {}, y = {}, la, Ba = 0,
            mb = window != window.parent,
            ca = false,
            yb = {
                wmode: "transparent",
                width: "100%",
                height: "100%",
                allowfullscreen: "true",
                allowscriptaccess: "true",
                hasVersion: 9
            }, ia = true,
            S, O, fa, Na, L, X, w, m = 0,
            o, G, ba, fb = 30,
            I, $a, Ga, T, sa = false,
            ha = true,
            r = false,
            U = false,
            M = [],
            Ka, Ja = false,
            ua = {
                width: 100,
                height: 100
            }, ub = "yoxview_mediaPanel",
            wb = {
                vimeo: "http://vimeo.com/api/oembed.json",
                myspace: "http://vids.myspace.com/index.cfm?fuseaction=oembed"
            }, tb = -42,
            x, ma, oa, va, d, A = [],
            R, K, $, k, j = {}, Ya = {}, Ma,
            Z = b(Yox.getTopWindow()),
            t, Q, ja = false,
            C, Oa = new Image,
            B, Ca, Y, D, W = {}, pb = {
                40: "DOWN",
                35: "END",
                13: "ENTER",
                36: "HOME",
                37: "LEFT",
                39: "RIGHT",
                32: "SPACE",
                38: "UP",
                72: "h",
                27: "ESCAPE"
            }, Wa;
        this.init = function (a, c) {
            function e() {
                a.each(function (g, i) {
                    i = b(i);
                    var xa = M.length;
                    i.data("yoxview", {
                        viewIndex: xa,
                        cacheVars: {
                            cachedImagesCount: 0,
                            cacheDirectionForward: true,
                            cacheBufferLastIndex: null,
                            currentCacheImg: 0
                        }
                    });
                    var ka = i.data("yoxview");
                    if (h) ka.optionsSet = h;
                    f.allowedImageUrls = [Yox.Regex.image];
                    if (f.allowedUrls) f.allowedImageUrls =
                        f.allowedImageUrls.concat(f.allowedUrls);
                    var Pa = i[0].tagName == "A",
                        J = [],
                        ya = 0;
                    (Pa ? i : i.find(za(f))).each(function (v, Qa) {
                            var q = b(Qa),
                                p;
                            p = f;
                            var z = {}, F = q.attr("href"),
                                V = q.children("img:first");
                            if (V.length == 0) V = q;
                            z = {};
                            for (supportedType in ib) {
                                var Ra = ib[supportedType](q, F, V, p);
                                if (Ra) {
                                    b.extend(Ra, {
                                        contentType: supportedType,
                                        elementId: xb++
                                    });
                                    z.media = Ra;
                                    break
                                }
                            }
                            if (z.media) {
                                z.thumbnailImg = V;
                                p = z
                            } else p = null; if (p) {
                                J.push(p);
                                if (Pa) q.data("yoxview").imageIndex = ya;
                                else q.data("yoxview", {
                                    imageIndex: ya,
                                    viewIndex: xa
                                });
                                ya++
                            }
                        });
                    if (f.images) J = J.concat(f.images);
                    if (f.dataSource) Yox.dataSources[f.dataSource].getImagesData(f, function (v) {
                        J = J.concat(v.images);
                        ka.images = J;
                        if (v.title && f.thumbnailsOptions && f.thumbnailsOptions.setHeader) b(f.thumbnailsOptions.headerElement || "<h2>", {
                            html: v.title,
                            class: f.thumbnailsOptions.headerClass
                        }).appendTo(i);
                        var Qa = v.isGroup ? [b.extend(v, {
                            media: {
                                title: v.title + " (" + v.images.length + " images)",
                                alt: v.title
                            }
                        })] : v.images;
                        Ua(i, f, Pa ? null : Qa, !v.createGroups ? null : function (q) {
                            var p = b(q.currentTarget).data("yoxview"),
                                z = b(q.currentTarget);
                            q = z.data("yoxthumbs");
                            if (p.imagesAreSet) b.yoxview.open(p.viewIndex);
                            else {
                                z.css("cursor", "wait");
                                var F = b.extend({}, f);
                                if (F.dataSourceOptions) b.extend(F.dataSourceOptions, q);
                                else F.dataSourceOptions = q;
                                Yox.dataSources[f.dataSource].getImagesData(F, function (V) {
                                    p.images = V.images;
                                    p.imagesAreSet = true;
                                    z.css("cursor", "");
                                    b.yoxview.open(p.viewIndex)
                                })
                            }
                        });
                        v.createGroups ? b.each(i.yoxthumbs("thumbnails"), function (q, p) {
                            p.data("yoxview", {
                                viewIndex: ++xa
                            });
                            M.push(b(p))
                        }) : b.each(i.yoxthumbs("thumbnails"),
                            function (q, p) {
                                var z = ya + q,
                                    F = p.children("img");
                                if (F.length == 0) F = p;
                                J[z].thumbnailImg = F;
                                p.data("yoxview", {
                                    imageIndex: q,
                                    viewIndex: xa
                                })
                            });
                        if (!b.yoxview.firstViewWithImages && v.images.length > 0) {
                            b.yoxview.firstViewWithImages = i;
                            f.cacheImagesInBackground && b.yoxview.startCache()
                        }
                    });
                    else {
                        ka.images = J;
                        Ua(i, f)
                    }
                    M.push(i);
                    if (!b.yoxview.firstViewWithImages && ka.images && ka.images != 0) {
                        b.yoxview.firstViewWithImages = i;
                        Aa(i);
                        if (f.cacheImagesInBackground && m != 0) {
                            Ia();
                            ea(0)
                        }
                    }
                })
            }
            var f = b.extend(true, {}, hb, c),
                h;
            if (A.length == 0) {
                A.push(f);
                h = 0
            } else h = c ? H(f) : null;
            lb(f.lang, function () {
                kb(f, function (g) {
                    g && g.options && b.extend(f, g.options);
                    Yox.loadDataSource(f, e)
                })
            })
        };
        var ib = {
            image: function (a, c, e, f) {
                for (var h = null, g = 0; g < f.allowedImageUrls.length && !h; g++)
                    if (c.match(f.allowedImageUrls[g])) h = {
                        src: a.attr("href"),
                        title: e.attr(f.titleAttribute),
                        alt: e.attr("alt")
                    };
                return h
            },
            flash: function (a, c, e, f) {
                var h = null;
                var g = (a = c.match(Yox.Regex.flash)) ? null : c.match(Yox.Regex.flashvideo);
                if (a || g) {
                    h = Yox.getUrlData(c);
                    c = Ta("flash", h.queryFields, f);
                    if (h.queryFields) {
                        delete h.queryFields.width;
                        delete h.queryFields.height
                    }
                    var i = b("<div>", {
                        class: "yoxview_element",
                        html: "<div class='yoxview_error'>Please install the latest version of the <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Flash player</a> to view content</div>"
                    });
                    g = g ? Yox.flashVideoPlayers[f.flashVideoPlayer](f.flashVideoPlayerPath, h.path, h.queryFields && h.queryFields.image ? h.queryFields.image : e[0].nodeName == "IMG" ? e.attr("src") : null, e.attr(f.titleAttribute)) : h.queryFields || {};
                    if (a) g.swf = h.path;
                    b.extend(g, yb);
                    i.flash(g);
                    h = {
                        element: i,
                        title: e.attr(f.titleAttribute)
                    };
                    b.extend(h, c)
                }
                return h
            },
            ooembed: function (a, c) {
                var e = null;
                for (videoProvider in Yox.Regex.video)
                    if (c.match(Yox.Regex.video[videoProvider])) {
                        e = {
                            provider: videoProvider,
                            url: c
                        };
                        break
                    }
                return e
            },
            inline: function (a, c, e, f) {
                if (!f.allowInternalLinks) return null;
                a = null;
                if ((c = Yox.getUrlData(c)) && c.anchor) {
                    c = b("#" + c.anchor);
                    if (c.length != 0) {
                        e = {
                            width: parseInt(c.css("width")),
                            height: parseInt(c.css("height"))
                        };
                        c.css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "block"
                        });
                        a = {
                            type: "inlineElement",
                            element: c,
                            title: c.attr("title")
                        };
                        f = {
                            horizontal: parseInt(c.css("padding-right")) + parseInt(c.css("padding-left")),
                            vertical: parseInt(c.css("padding-top")) + parseInt(c.css("padding-bottom"))
                        };
                        e.width = isNaN(e.width) ? null : e.width + f.horizontal;
                        e.height = isNaN(e.height) ? null : e.height + f.vertical;
                        b.extend(a, e);
                        if (f.horizontal != 0 || f.vertical != 0) a.padding = f;
                        c.remove()
                    }
                }
                return a
            },
            iframe: function (a, c, e, f) {
                var h = null;
                if ((a = a.attr("target")) && a == "yoxview")
                    if ((c =
                        Yox.getUrlData(c)) && c.path) {
                        f = Ta("iframe", c.queryFields, f);
                        if (c.queryFields) {
                            delete c.queryFields.width;
                            delete c.queryFields.height
                        }
                        h = {
                            element: b("<iframe>", {
                                src: Yox.urlDataToPath(c),
                                class: "yoxview_element"
                            }),
                            title: e.attr("title"),
                            frameborder: "0"
                        };
                        b.extend(h, f)
                    }
                return h
            }
        };
        this.open = function (a, c, e) {
            var f = this instanceof jQuery;
            if (f) {
                if (a && typeof a == "function") e = a;
                c = this.data("yoxview");
                a = c.viewIndex;
                c = c.imageIndex
            } else if (typeof a == "function") {
                e = a;
                a = c = 0
            } else if (typeof c == "function") {
                e = c;
                c = 0
            }
            a = a ||
                0;
            c = c || 0;
            b(document).bind("keydown.yoxview", ob);
            Aa(M[a]);
            !k && m != 0 && Sa();
            b.yoxview.selectImage(c);
            t.stop().css({
                opacity: 0,
                display: "block"
            }).animate({
                opacity: 1
            }, "slow", function () {
                t.css("opacity", "")
            });
            d.cacheImagesInBackground && ea(c);
            if (e) va = e;
            return f ? this : false
        };
        this.selectImage = function (a) {
            b.yoxview.currentImage = w[a];
            u = a;
            Va(true);
            B.blur();
            R.css({
                "z-index": "1",
                width: "100%",
                height: "100%"
            });
            K.css({
                display: "none",
                "z-index": "2"
            });
            ia = true;
            k.css(Y);
            this.select(a)
        };
        this.refresh = function () {
            (ja = r) && E();
            db(u);
            ja && ra()
        };
        this.options = function (a, c) {
            if (!a) return this;
            if (c && typeof a === "string") {
                var e = a;
                a = {};
                a[e] = c
            }
            if (this instanceof jQuery) {
                if (e = this.data("yoxview")) {
                    b.extend(A[e.optionsSet || 0], a);
                    this.yoxview("update")
                }
                return this
            } else {
                b.each(A, function (f, h) {
                    b.extend(h, a)
                });
                b.yoxview.update()
            }
        };
        this.select = function (a, c) {
            if (typeof c === "number") c = undefined;
            if (!U) {
                if (a < 0) {
                    a = m - 1;
                    if (d.onEnd) {
                        d.onEnd();
                        return
                    }
                } else if (a == m) {
                    a = 0;
                    if (d.onEnd) {
                        d.onEnd();
                        return
                    }
                }
                if (!r && c) {
                    var e = c;
                    e.css("opacity") == 0 && e.stop().animate({
                            opacity: 0
                        },
                        d.buttonsFadeTime, nb(e))
                }
                b.yoxview.currentImage = w[a];
                u = a;
                db(u);
                Ia();
                d.onSelect && d.onSelect(a, w[a])
            }
        };
        this.prev = function (a) {
            l.cacheDirectionForward = false;
            this.select(u - 1, Q);
            r && a !== true && E()
        };
        this.next = function (a) {
            l.cacheDirectionForward = true;
            this.select(u + 1, ma);
            r && a !== true && E()
        };
        this.first = function () {
            d.disableNotifications || na("first");
            this.select(0);
            r && E()
        };
        this.last = function () {
            d.disableNotifications || na("last");
            this.select(m - 1);
            r && E()
        };
        this.setDefaults = function (a) {
            b.extend(true, hb, a)
        };
        this.play =
            function () {
                if (!(!this.isOpen || m == 1)) {
                    l.cacheDirectionForward = true;
                    if (r) {
                        d.disableNotifications || na("pause");
                        E()
                    } else {
                        d.disableNotifications || na("play");
                        ra()
                    }
                }
        };
        this.close = function () {
            if (this.isOpen) {
                this.closeHelp();
                Va(false);
                La(Y, function () {
                    b.yoxview.isOpen = false
                });
                Fa();
                o && da(function () {
                    T.html("")
                });
                s.animate({
                    width: Y.width,
                    height: Y.height
                }, d.popupResizeTime, function () {
                    s.css("opacity", 1)
                });
                t.stop().fadeOut(1E3);
                r && E();
                gb();
                d.onClose && d.onClose();
                b(document).unbind("keydown.yoxview");
                U = false
            }
        };
        this.help =
            function () {
                if (this.isOpen) O.css("display") == "none" ? O.css("display", "block").stop().animate({
                    opacity: 0.8
                }, d.buttonsFadeTime) : this.closeHelp()
        };
        this.closeHelp = function () {
            O.css("display") != "none" && O.stop().animate({
                opacity: 0
            }, d.buttonsFadeTime, function () {
                O.css("display", "none")
            })
        };
        this.clickBtn = function (a, c) {
            c && r && E();
            a.call(this);
            return false
        };
        Z.bind("resize.yoxview", function () {
            D = Ea();
            b.yoxview.isOpen && b.yoxview.resize()
        });
        b(bb).load(function () {
            b.extend(w[l.currentCacheImg].media, {
                width: this.width,
                height: this.height,
                loaded: true
            });
            Ha()
        }).error(function () {
            Ha()
        });
        this.startCache = function () {
            Aa(this.firstViewWithImages);
            Ia();
            ea(0)
        };
        var s = K,
            ga = R;
        this.resize = function (a) {
            if (r) {
                ja = true;
                E()
            }
            var c = eb(y);
            s.css({
                width: "100%",
                height: "100%"
            });
            U = true;
            ha || N.css({
                top: Math.round((c.height - ua.height) / 2)
            });
            La(c, function () {
                var e = {
                    width: k.width(),
                    height: k.height()
                };
                if (y.padding) {
                    e.width -= y.padding.horizontal;
                    e.height -= y.padding.vertical
                }
                s.css(e);
                U = false;
                o && a !== false && qa();
                if (ja) {
                    ra();
                    ja = false
                }
            })
        };
        b(Oa).load(function () {
            this.width ==
                0 ? wa("Image error") : ta(b.extend({}, b.yoxview.currentImage.media, {
                    width: this.width,
                    height: this.height
                }))
        }).error(function () {
            wa("Image not found:<br /><span class='errorUrl'>" + this.src + "</span>")
        });
        this.update = function () {
            var a;
            if (this instanceof jQuery) {
                a = A[this.data("yoxview").optionsSet || 0];
                this.yoxview("unload", function (c) {
                    c.yoxview(a)
                });
                return this
            } else {
                a = A[0];
                this.unload();
                b.each(M, function (c, e) {
                    e.yoxview(a)
                })
            }
        };
        this.unload = function (a) {
            function c() {
                function f(g) {
                    g.undelegate(h, "click.yoxview").removeData("yoxview").yoxthumbs("unload",
                        "yoxview").find(h).removeData("yoxview")
                }
                var h = za(d);
                if (e instanceof jQuery) e.data("yoxview") && f(e);
                else {
                    jQuery.each(M, function (g, i) {
                        f(i)
                    });
                    Z.unbind(".yoxview");
                    if (k) {
                        t.remove();
                        k = undefined
                    }
                } if (a) a(e);
                else return e
            }
            var e = this;
            if (!d) return this;
            d.onBeforeUnload ? d.onBeforeUnload(c) : c()
        }
    }
    if (!b.yoxview) b.yoxview = new jb;
    b.fn.yoxview = function (H) {
        if (this.length != 0)
            if (b.yoxview[H]) return b.yoxview[H].apply(this, Array.prototype.slice.call(arguments, 1));
            else typeof H === "object" || !H ? b.yoxview.init(this, H) : b.error("Method " +
                H + " does not exist on YoxView.");
        return this
    };
    b(Yox.getTopWindow()).unload(function () {
        if (b.yoxview) {
            b.yoxview.unload();
            delete b.yoxview
        }
    })
})(jQuery);