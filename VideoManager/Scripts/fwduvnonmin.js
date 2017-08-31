﻿(function(e) {
    function n() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        var r;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                t.dumy.style.position = "absolute";
                r = t.dumy.getBoundingClientRect().left;
                t.dumy.style[n] = "translate3d(500px, 0px, 0px)";
                r = Math.abs(t.dumy.getBoundingClientRect().left - r);
                if (r > 100 && r < 900) {
                    try {
                        document.documentElement.removeChild(t.dumy)
                    } catch (i) {}
                    return true
                }
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (i) {}
        return false
    }

    function r() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                return true
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (r) {}
        return false
    }
    var t = function() {};
    t.dumy = document.createElement("div");
    t.trim = function(e) {
        return e.replace(/\s/gi, "")
    };
    t.trimAndFormatUrl = function(e) {
        e = e.toLocaleLowerCase();
        e = e.replace(/ /g, "-");
        return e
    };
    t.splitAndTrim = function(e, n) {
        var r = e.split(",");
        var i = r.length;
        for (var s = 0; s < i; s++) {
            if (n) r[s] = t.trim(r[s])
        }
        return r
    };
    t.indexOfArray = function(e, t) {
        var n = e.length;
        for (var r = 0; r < n; r++) {
            if (e[r] === t) return r
        }
        return -1
    };
    t.randomizeArray = function(e) {
        var t = [];
        var n = e.concat();
        var r = n.length;
        for (var i = 0; i < r; i++) {
            var s = Math.floor(Math.random() * n.length);
            t.push(n[s]);
            n.splice(s, 1)
        }
        return t
    };
    t.parent = function(e, t) {
        if (t === undefined) t = 1;
        while (t-- && e) e = e.parentNode;
        if (!e || e.nodeType !== 1) return null;
        return e
    };
    t.sibling = function(e, t) {
        while (e && t !== 0) {
            if (t > 0) {
                if (e.nextElementSibling) {
                    e = e.nextElementSibling
                } else {
                    for (var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
                }
                t--
            } else {
                if (e.previousElementSibling) {
                    e = e.previousElementSibling
                } else {
                    for (var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
                }
                t++
            }
        }
        return e
    };
    t.getChildAt = function(e, n) {
        var r = t.getChildren(e);
        if (n < 0) n += r.length;
        if (n < 0) return null;
        return r[n]
    };
    t.getChildById = function(e) {
        return document.getElementById(e) || undefined
    };
    t.getChildren = function(e, t) {
        var n = [];
        for (var r = e.firstChild; r != null; r = r.nextSibling) {
            if (t) {
                n.push(r)
            } else if (r.nodeType === 1) {
                n.push(r)
            }
        }
        return n
    };
    t.getChildrenFromAttribute = function(e, n, r) {
        var i = [];
        for (var s = e.firstChild; s != null; s = s.nextSibling) {
            if (r && t.hasAttribute(s, n)) {
                i.push(s)
            } else if (s.nodeType === 1 && t.hasAttribute(s, n)) {
                i.push(s)
            }
        }
        return i.length == 0 ? undefined : i
    };
    t.getChildFromNodeListFromAttribute = function(e, n, r) {
        for (var i = e.firstChild; i != null; i = i.nextSibling) {
            if (r && t.hasAttribute(i, n)) {
                return i
            } else if (i.nodeType === 1 && t.hasAttribute(i, n)) {
                return i
            }
        }
        return undefined
    };
    t.getAttributeValue = function(e, n) {
        if (!t.hasAttribute(e, n)) return undefined;
        return e.getAttribute(n)
    };
    t.hasAttribute = function(e, t) {
        if (e.hasAttribute) {
            return e.hasAttribute(t)
        } else {
            var n = e.attributes[t];
            return n ? true : false
        }
    };
    t.insertNodeAt = function(e, n, r) {
        var i = t.children(e);
        if (r < 0 || r > i.length) {
            throw new Error("invalid index!")
        } else {
            e.insertBefore(n, i[r])
        }
    };
    t.hasCanvas = function() {
        return Boolean(document.createElement("canvas"))
    };
    t.hitTest = function(e, n, r) {
        var i = false;
        if (!e) throw Error("Hit test target is null!");
        var s = e.getBoundingClientRect();
        if (parseInt(s.width) != s.width && !t.isIEAndLessThen9) {
            if (n >= s.left * 100 && n <= s.left * 100 + (s.right * 100 - s.left * 100) && r >= s.top * 100 && r <= s.top * 100 + (s.bottom * 100 - s.top * 100)) return true
        } else {
            if (n >= parseInt(s.left) && n <= parseInt(s.left + (s.right - s.left)) && r >= parseInt(s.top) && r <= parseInt(s.top + (s.bottom - s.top))) return true
        }
        return false
    };
    t.hitBuggyTest = function(e, t, n) {
        var r = false;
        if (!e) throw Error("Hit test target is null!");
        var i = e.getBoundingClientRect();
        return false
    };
    t.getScrollOffsets = function() {
        if (e.pageXOffset != null) return {
            x: e.pageXOffset,
            y: e.pageYOffset
        };
        if (document.compatMode == "CSS1Compat") {
            return {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            }
        }
    };
    t.getViewportSize = function() {
        if (t.hasPointerEvent && navigator.msMaxTouchPoints > 1) {
            return {
                w: document.documentElement.clientWidth || e.innerWidth,
                h: document.documentElement.clientHeight || e.innerHeight
            }
        }
        if (t.isMobile) return {
            w: e.innerWidth,
            h: e.innerHeight
        };
        return {
            w: document.documentElement.clientWidth || e.innerWidth,
            h: document.documentElement.clientHeight || e.innerHeight
        }
    };
    t.getViewportMouseCoordinates = function(e) {
        var n = t.getScrollOffsets();
        if (e.touches) {
            return {
                screenX: e.touches[0] == undefined ? e.touches.pageX - n.x : e.touches[0].pageX - n.x,
                screenY: e.touches[0] == undefined ? e.touches.pageY - n.y : e.touches[0].pageY - n.y
            }
        }
        return {
            screenX: e.clientX == undefined ? e.pageX - n.x : e.clientX,
            screenY: e.clientY == undefined ? e.pageY - n.y : e.clientY
        }
    };
    t.hasPointerEvent = function() {
        return Boolean(e.navigator.msPointerEnabled)
    }();
    t.isMobile = function() {
        if (t.hasPointerEvent && navigator.msMaxTouchPoints > 1) return true;
        var e = ["android", "webos", "iphone", "ipad", "blackberry", "kfsowi"];
        for (i in e) {
            if (navigator.userAgent.toLowerCase().indexOf(String(e[i]).toLowerCase()) != -1) {
                return true
            }
        }
        return false
    }();
    t.isAndroid = function() {
        return navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1
    }();
    t.isChrome = function() {
        return navigator.userAgent.toLowerCase().indexOf("chrome") != -1
    }();
    t.isSafari = function() {
        return navigator.userAgent.toLowerCase().indexOf("safari") != -1 && navigator.userAgent.toLowerCase().indexOf("chrome") == -1
    }();
    t.isOpera = function() {
        return navigator.userAgent.toLowerCase().indexOf("opr") != -1
    }();
    t.isFirefox = function() {
        return navigator.userAgent.toLowerCase().indexOf("firefox") != -1
    }();
    t.isIEWebKit = function() {
        return Boolean(document.documentElement.msRequestFullscreen)
    }();
    t.isIE = function() {
        var e = Boolean(navigator.userAgent.toLowerCase().indexOf("msie") != -1);
        return e || Boolean(document.documentElement.msRequestFullscreen)
    }();
    t.isIEAndLessThen9 = function() {
        return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1)
    }();
    t.isIEAnd9OrLess = function() {
        return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 9") != -1)
    }();
    t.isIE7 = function() {
        return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1)
    }();
    t.isMac = function() {
        return Boolean(navigator.appVersion.toLowerCase().indexOf("mac") != -1)
    }();
    t.isWin = function() {
        return Boolean(navigator.appVersion.toLowerCase().indexOf("win") != -1)
    }();
    t.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
    }();
    t.isIphone = function() {
        return navigator.userAgent.match(/(iPhone|iPod)/g)
    }();
    t.hasFullScreen = function() {
        return t.dumy.requestFullScreen || t.dumy.mozRequestFullScreen || t.dumy.webkitRequestFullScreen || t.dumy.msieRequestFullScreen
    }();
    t.volumeCanBeSet = function() {
        var e = document.createElement("audio");
        if (!e) return;
        e.volume = 0;
        return e.volume == 0 ? true : false
    }();
    t.getVideoFormat = function() {
        var e = document.createElement("video");
        if (!e.canPlayType) return;
        var t;
        if (e.canPlayType("video/mp4") == "probably" || e.canPlayType("video/mp4") == "maybe") {
            t = ".mp4"
        } else if (e.canPlayType("video/ogg") == "probably" || e.canPlayType("video/ogg") == "maybe") {
            t = ".ogg"
        } else if (e.canPlayType("video/webm") == "probably" || e.canPlayType("video/webm") == "maybe") {
            t = ".webm"
        }
        e = null;
        return t
    }();
    t.onReady = function(n) {
        if (document.addEventListener) {
            e.addEventListener("DOMContentLoaded", function() {
                t.checkIfHasTransofrms();
                t.hasFullScreen = t.checkIfHasFullscreen();
                setTimeout(n, 100)
            })
        } else {
            document.onreadystatechange = function() {
                t.checkIfHasTransofrms();
                t.hasFullScreen = t.checkIfHasFullscreen();
                if (document.readyState == "complete") setTimeout(n, 100)
            }
        }
    };
    t.checkIfHasTransofrms = function() {
        document.documentElement.appendChild(t.dumy);
        t.hasTransform3d = n();
        t.hasTransform2d = r();
        t.isReadyMethodCalled_bl = true
    };
    t.checkIfHasFullscreen = function() {
        return Boolean(document.documentElement.requestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.msRequestFullscreen)
    };
    t.disableElementSelection = function(e) {
        try {
            e.style.userSelect = "none"
        } catch (e) {}
        try {
            e.style.MozUserSelect = "none"
        } catch (e) {}
        try {
            e.style.webkitUserSelect = "none"
        } catch (e) {}
        try {
            e.style.khtmlUserSelect = "none"
        } catch (e) {}
        try {
            e.style.oUserSelect = "none"
        } catch (e) {}
        try {
            e.style.msUserSelect = "none"
        } catch (e) {}
        try {
            e.msUserSelect = "none"
        } catch (e) {}
        e.onselectstart = function() {
            return false
        }
    };
    t.getUrlArgs = function(t) {
        var n = {};
        var r = t.substr(t.indexOf("?") + 1) || location.search.substring(1);
        r = r.replace(/(\?*)(\/*)/g, "");
        var i = r.split("&");
        for (var s = 0; s < i.length; s++) {
            var o = i[s].indexOf("=");
            var u = i[s].substring(0, o);
            var a = i[s].substring(o + 1);
            a = decodeURIComponent(a);
            n[u] = a
        }
        return n
    };
    t.getHashUrlArgs = function(t) {
        var n = {};
        var r = t.substr(t.indexOf("#") + 1) || location.search.substring(1);
        r = r.replace(/(\?*)(\/*)/g, "");
        var i = r.split("&");
        for (var s = 0; s < i.length; s++) {
            var o = i[s].indexOf("=");
            var u = i[s].substring(0, o);
            var a = i[s].substring(o + 1);
            a = decodeURIComponent(a);
            n[u] = a
        }
        return n
    };
    t.validateEmail = function(e) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
            return true
        }
        return false
    };
    t.isReadyMethodCalled_bl = false;
    e.FWDUVPUtils = t
})(window);
(function(e) {
    var t = function() {
        var n = this;
        var r = t.prototype;
        this.main_do = null;
        this.init = function() {
            this.setupScreen();
            e.onerror = this.showError;
            this.screen.style.zIndex = 1e20;
            setTimeout(this.addConsoleToDom, 100);
            setInterval(this.position, 100)
        };
        this.position = function() {
            var e = FWDUVPUtils.getScrollOffsets();
            n.setX(e.x + 100);
            n.setY(e.y)
        };
        this.addConsoleToDom = function() {
            if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                document.getElementsByTagName("body")[0].appendChild(n.screen)
            } else {
                document.documentElement.appendChild(n.screen)
            }
        };
        this.setupScreen = function() {
            this.main_do = new FWDUVPDisplayObject("div", "absolute");
            this.main_do.setOverflow("auto");
            this.main_do.setWidth(300);
            this.main_do.setHeight(200);
            this.setWidth(300);
            this.setHeight(200);
            this.main_do.setBkColor("#FFFFFF");
            this.addChild(this.main_do)
        };
        this.showError = function(e, t, r) {
            var i = n.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + e + " on line " + r + " for " + t;
            n.main_do.setInnerHTML(i);
            n.main_do.screen.scrollTop = n.main_do.screen.scrollHeight
        };
        this.log = function(e) {
            var t = n.main_do.getInnerHTML() + "<br>" + e;
            n.main_do.setInnerHTML(t);
            n.main_do.getScreen().scrollTop = 1e4
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div", "absolute")
    };
    t.prototype = null;
    e.FWDConsole = t
})(window);
(function(e) {
    function c(t, n, r) {
        function u() {
            if (s) {
                s.apply(e, arguments);
                if (!o) {
                    delete n[i];
                    s = null
                }
            }
        }
        var i, s = r[0],
            o = t === a;
        r[0] = u;
        i = t.apply(e, r);
        n[i] = {
            args: r,
            created: Date.now(),
            cb: s,
            id: i
        };
        return i
    }

    function h(t, n, r, i, s) {
        function c() {
            if (o.cb) {
                o.cb.apply(e, arguments);
                if (!u) {
                    delete r[i];
                    o.cb = null
                }
            }
        }
        var o = r[i];
        if (!o) {
            return
        }
        var u = t === a;
        n(o.id);
        if (!u) {
            var f = o.args[1];
            var l = Date.now() - o.created;
            if (l < 0) {
                l = 0
            }
            f -= l;
            if (f < 0) {
                f = 0
            }
            o.args[1] = f
        }
        o.args[0] = c;
        o.created = Date.now();
        o.id = t.apply(e, o.args)
    }
    var t = navigator.platform;
    var n = false;
    if (t == "iPad" || t == "iPhone") n = true;
    if (!n) return;
    var r = navigator.userAgent;
    var i = false;
    if (r.indexOf("6") != -1) i = true;
    if (!i) return;
    var s = {};
    var o = {};
    var u = e.setTimeout;
    var a = e.setInterval;
    var f = e.clearTimeout;
    var l = e.clearInterval;
    e.setTimeout = function() {
        return c(u, s, arguments)
    };
    e.setInterval = function() {
        return c(a, o, arguments)
    };
    e.clearTimeout = function(e) {
        var t = s[e];
        if (t) {
            delete s[e];
            f(t.id)
        }
    };
    e.clearInterval = function(e) {
        var t = o[e];
        if (t) {
            delete o[e];
            l(t.id)
        }
    };
    e.addEventListener("scroll", function() {
        var e;
        for (e in s) {
            h(u, f, s, e)
        }
        for (e in o) {
            h(a, l, o, e)
        }
    })
})(window);
(function(e) {
    var t = function(e, n, r, i, s, o, u, a, f) {
        var l = this;
        var c = t.prototype;
        this.main_do = null;
        this.icon_do = null;
        this.iconS_do = null;
        this.bk_do = null;
        this.text_do = null;
        this.border_do = null;
        this.thumbHolder_do = null;
        this.icon_img = e;
        this.borderNColor_str = s;
        this.borderSColor_str = o;
        this.adsBackgroundPath_str = u;
        this.position_str = i;
        this.textNormalColor_str = a;
        this.textSelectedColor_str = f;
        this.text_str = r;
        this.iconOverPath_str = n;
        this.totalWidth = 215;
        this.totalHeight = 64;
        this.fontSize = 12;
        this.hasThumbanil_bl = false;
        this.isShowed_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        l.init = function() {
            l.setOverflow("visible");
            l.setupMainContainers();
            l.hide(false, true)
        };
        l.setupMainContainers = function() {
            this.main_do = new FWDUVPDisplayObject("div");
            this.main_do.hasTransform3d_bl = false;
            this.main_do.hasTransform2d_bl = false;
            this.main_do.setBackfaceVisibility();
            this.bk_do = new FWDUVPDisplayObject("div");
            this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')";
            this.text_do = new FWDUVPDisplayObject("div");
            this.text_do.hasTransform3d_bl = false;
            this.text_do.hasTransform2d_bl = false;
            this.text_do.setBackfaceVisibility();
            this.text_do.setOverflow("visible");
            this.text_do.getStyle().display = "inline";
            this.text_do.getStyle().fontFamily = "Arial";
            this.text_do.getStyle().fontSize = "22px";
            this.text_do.getStyle().whiteSpace = "nowrap";
            this.text_do.getStyle().color = this.textNormalColor_str;
            this.text_do.getStyle().fontSmoothing = "antialiased";
            this.text_do.getStyle().webkitFontSmoothing = "antialiased";
            this.text_do.getStyle().textRendering = "optimizeLegibility";
            this.thumbHolder_do = new FWDUVPDisplayObject("div");
            this.thumbHolder_do.setWidth(this.totalHeight - 8);
            this.thumbHolder_do.setHeight(this.totalHeight - 8);
            this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4);
            this.thumbHolder_do.setY(4);
            this.border_do = new FWDUVPDisplayObject("div");
            this.border_do.getStyle().border = "1px solid " + this.borderNColor_str + "";
            this.border_do.setButtonMode(true);
            this.main_do.setWidth(this.totalWidth);
            this.main_do.setHeight(this.totalHeight);
            this.bk_do.setWidth(this.totalWidth);
            this.bk_do.setHeight(this.totalHeight);
            if (this.position_str == "left") {
                this.border_do.setX(-1);
                this.border_do.setWidth(this.totalWidth - 1);
                this.border_do.setHeight(this.totalHeight - 2)
            } else {
                this.border_do.setWidth(this.totalWidth);
                this.border_do.setHeight(this.totalHeight - 2)
            }
            this.setWidth(this.totalWidth);
            this.setHeight(this.totalHeight);
            this.icon_do = new FWDUVPDisplayObject("img");
            if (this.icon_img) {
                this.icon_do.setScreen(this.icon_img);
                this.icon_do.setWidth(this.icon_img.width);
                this.icon_do.setHeight(this.icon_img.height)
            }
            var e = new Image;
            e.src = this.iconOverPath_str;
            this.iconS_do = new FWDUVPDisplayObject("img");
            this.iconS_do.setScreen(e);
            this.iconS_do.setWidth(this.icon_do.w);
            this.iconS_do.setHeight(this.icon_do.h);
            this.iconS_do.setAlpha(0);
            this.main_do.addChild(this.bk_do);
            this.main_do.addChild(this.text_do);
            this.main_do.addChild(this.thumbHolder_do);
            this.main_do.addChild(this.icon_do);
            this.main_do.addChild(this.iconS_do);
            this.main_do.addChild(this.border_do);
            if (FWDUVPUtils.isIEAndLessThen9) {
                this.dumy_do = new FWDUVPDisplayObject("div");
                this.dumy_do.setBkColor("#00FF00");
                this.dumy_do.setAlpha(1e-4);
                this.dumy_do.setWidth(this.totalWidth);
                this.dumy_do.setHeight(this.totalHeight);
                this.dumy_do.setButtonMode(true);
                this.main_do.addChild(this.dumy_do)
            }
            this.addChild(this.main_do);
            this.updateText(l.text_str);
            if (FWDUVPUtils.isIEAndLessThen9) {
                if (l.isMobile_bl) {
                    if (l.hasPointerEvent_bl) {
                        l.dumy_do.screen.addEventListener("MSPointerUp", l.onMouseUp);
                        l.dumy_do.screen.addEventListener("MSPointerOver", l.onMouseOver);
                        l.dumy_do.screen.addEventListener("MSPointerOut", l.onMouseOut)
                    } else {
                        l.dumy_do.screen.addEventListener("touchend", l.onMouseUp)
                    }
                } else if (l.dumy_do.screen.addEventListener) {
                    l.dumy_do.screen.addEventListener("mouseover", l.onMouseOver);
                    l.dumy_do.screen.addEventListener("mouseout", l.onMouseOut);
                    l.dumy_do.screen.addEventListener("mouseup", l.onMouseUp)
                } else if (l.dumy_do.screen.attachEvent) {
                    l.dumy_do.screen.attachEvent("onmouseover", l.onMouseOver);
                    l.dumy_do.screen.attachEvent("onmouseout", l.onMouseOut);
                    l.dumy_do.screen.attachEvent("onmouseup", l.onMouseUp)
                }
            } else {
                if (l.isMobile_bl) {
                    if (l.hasPointerEvent_bl) {
                        l.border_do.screen.addEventListener("MSPointerUp", l.onMouseUp);
                        l.border_do.screen.addEventListener("MSPointerOver", l.onMouseOver);
                        l.border_do.screen.addEventListener("MSPointerOut", l.onMouseOut)
                    } else {
                        l.border_do.screen.addEventListener("touchend", l.onMouseUp)
                    }
                } else if (l.border_do.screen.addEventListener) {
                    l.border_do.screen.addEventListener("mouseover", l.onMouseOver);
                    l.border_do.screen.addEventListener("mouseout", l.onMouseOut);
                    l.border_do.screen.addEventListener("mouseup", l.onMouseUp)
                } else if (l.border_do.screen.attachEvent) {
                    l.border_do.screen.attachEvent("onmouseover", l.onMouseOver);
                    l.border_do.screen.attachEvent("onmouseout", l.onMouseOut);
                    l.border_do.screen.attachEvent("onmouseup", l.onMouseUp)
                }
            }
        };
        l.onMouseOver = function(e) {
            if (!e.pointerType || e.pointerType == "mouse") {
                l.setSelectedState()
            }
        };
        l.onMouseOut = function(e) {
            if (!e.pointerType || e.pointerType == "mouse") {
                l.setNormalState()
            }
        };
        l.onMouseUp = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (e.button == 2 || !l.isShowed_bl) return;
            l.dispatchEvent(t.MOUSE_UP)
        };
        this.updateText = function(e) {
            var t;
            this.text_do.setInnerHTML(e);
            setTimeout(function() {
                t = l.text_do.getWidth() + 8 + l.iconS_do.w;
                l.text_do.setX(parseInt(l.totalWidth - t) / 2);
                l.text_do.setY(parseInt((l.totalHeight - l.text_do.getHeight()) / 2) + 2);
                l.icon_do.setX(l.text_do.x + t - l.iconS_do.w);
                l.icon_do.setY(parseInt((l.totalHeight - l.iconS_do.h) / 2) + 2);
                l.iconS_do.setX(l.text_do.x + t - l.iconS_do.w);
                l.iconS_do.setY(parseInt((l.totalHeight - l.iconS_do.h) / 2) + 2)
            }, 50)
        };
        this.setNormalState = function() {
            FWDUVPTweenMax.to(l.iconS_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(l.text_do.screen, .5, {
                css: {
                    color: l.textNormalColor_str
                },
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(l.border_do.screen, .5, {
                css: {
                    borderColor: l.borderNColor_str
                },
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function() {
            FWDUVPTweenMax.to(l.iconS_do, .5, {
                alpha: 1,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(l.text_do.screen, .5, {
                css: {
                    color: l.textSelectedColor_str
                },
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(l.border_do.screen, .5, {
                css: {
                    borderColor: l.borderSColor_str
                },
                ease: Expo.easeOut
            })
        };
        this.show = function(e) {
            if (this.isShowed_bl) return;
            this.isShowed_bl = true;
            this.setVisible(true);
            FWDUVPTweenMax.killTweensOf(this.main_do);
            if (e && !l.isMobile_bl) {
                if (this.position_str == "left") {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: 0,
                        delay: .8,
                        ease: Expo.easeInOut
                    })
                } else {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: -this.totalWidth + 1,
                        delay: .8,
                        ease: Expo.easeInOut
                    })
                }
            } else {
                if (this.position_str == "left") {
                    this.main_do.setX(0)
                } else {
                    this.main_do.setX(-this.totalWidth)
                }
            }
        };
        this.hide = function(e, t) {
            if (!this.isShowed_bl && !t) return;
            this.isShowed_bl = false;
            this.hasThumbanil_bl = false;
            FWDUVPTweenMax.killTweensOf(this.main_do);
            if (e && !l.isMobile_bl) {
                if (this.position_str == "left") {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: -this.totalWidth,
                        ease: Expo.easeInOut,
                        onComplete: this.hideCompleteHandler
                    })
                } else {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: 0,
                        ease: Expo.easeInOut,
                        onComplete: this.hideCompleteHandler
                    })
                }
            } else {
                if (this.position_str == "left") {
                    this.main_do.setX(-this.totalWidth)
                } else {
                    this.main_do.setX(0)
                }
                this.hideCompleteHandler()
            }
        };
        this.hideCompleteHandler = function() {
            if (l.smallImage_img) {
                l.smallImage_img.onload = null;
                l.smallImage_img.src = "";
                FWDUVPTweenMax.killTweensOf(l.icon_do)
            }
            if (l.main_do.alpha != 1) l.main_do.setAlpha(1);
            l.thumbHolder_do.setVisible(false);
            l.setVisible(false)
        };
        this.hideWithOpacity = function() {
            if (!FWDUVPUtils.isIEAndLessThen9) {
                FWDUVPTweenMax.to(this.main_do, .8, {
                    alpha: .5
                })
            }
        };
        this.showWithOpacity = function() {
            if (!FWDUVPUtils.isIEAndLessThen9) {
                FWDUVPTweenMax.to(this.main_do, .8, {
                    alpha: 1
                })
            }
        };
        l.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPTransformDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.SHOW_TOOLTIP = "showTooltip";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDUVPAdsButton = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.main_do = null;
        this.bk_do = null;
        this.text_do = null;
        this.border_do = null;
        this.thumbHolder_do = null;
        this.borderNColor_str = n;
        this.borderSColor_str = r;
        this.adsBackgroundPath_str = i;
        this.position_str = e;
        this.timeColor_str = s;
        this.totalWidth = 215;
        this.totalHeight = 64;
        this.fontSize = 12;
        this.hasThumbanil_bl = false;
        this.isShowed_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        o.init = function() {
            o.setOverflow("visible");
            o.setupMainContainers();
            o.hide(false, true)
        };
        o.setupMainContainers = function() {
            this.main_do = new FWDUVPDisplayObject("div");
            this.main_do.hasTransform3d_bl = false;
            this.main_do.hasTransform2d_bl = false;
            this.main_do.setBackfaceVisibility();
            this.bk_do = new FWDUVPDisplayObject("div");
            this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')";
            this.text_do = new FWDUVPDisplayObject("div");
            this.text_do.hasTransform3d_bl = false;
            this.text_do.hasTransform2d_bl = false;
            this.text_do.setBackfaceVisibility();
            this.text_do.getStyle().fontFamily = "Arial";
            this.text_do.getStyle().fontSize = "12px";
            this.text_do.getStyle().lineHeight = "18px";
            this.text_do.getStyle().textAlign = "center";
            this.text_do.getStyle().color = this.timeColor_str;
            this.text_do.getStyle().fontSmoothing = "antialiased";
            this.text_do.getStyle().webkitFontSmoothing = "antialiased";
            this.text_do.getStyle().textRendering = "optimizeLegibility";
            this.text_do.setInnerHTML("...");
            this.thumbHolder_do = new FWDUVPDisplayObject("div");
            this.thumbHolder_do.setWidth(this.totalHeight - 8);
            this.thumbHolder_do.setHeight(this.totalHeight - 8);
            this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4);
            this.thumbHolder_do.setY(4);
            this.border_do = new FWDUVPDisplayObject("div");
            this.border_do.getStyle().border = "1px solid " + this.borderNColor_str + "";
            this.main_do.setWidth(this.totalWidth);
            this.main_do.setHeight(this.totalHeight);
            this.bk_do.setWidth(this.totalWidth);
            this.bk_do.setHeight(this.totalHeight);
            if (this.position_str == "left") {
                this.border_do.setX(-1);
                this.border_do.setWidth(this.totalWidth - 1);
                this.border_do.setHeight(this.totalHeight - 2)
            } else {
                this.border_do.setWidth(this.totalWidth);
                this.border_do.setHeight(this.totalHeight - 2)
            }
            this.setWidth(this.totalWidth);
            this.setHeight(this.totalHeight);
            this.main_do.addChild(this.bk_do);
            this.main_do.addChild(this.text_do);
            this.main_do.addChild(this.thumbHolder_do);
            this.main_do.addChild(this.border_do);
            this.addChild(this.main_do)
        };
        this.loadThumbnail = function(e) {
            this.hasThumbanil_bl = true;
            if (this.smallImage_img) {
                this.smallImage_img.removeAttribute("width");
                this.smallImage_img.removeAttribute("height");
                this.smallImage_img.onload = null;
                this.smallImage_img.src = "";
                try {
                    if (!FWDUVPUtils.isIE) this.thumbHolder_do.removeChild(o.thumbnail_do)
                } catch (t) {}
            }
            if (!this.thumbnail_do) {
                this.thumbnail_do = new FWDUVPDisplayObject("img");
                this.smallImage_img = new Image
            }
            this.thumbHolder_do.setVisible(true);
            this.smallImage_img.onload = this.onSmallImageLoad;
            this.smallImage_img.src = e
        };
        this.onSmallImageLoad = function() {
            o.smallImageOriginalW = o.smallImage_img.width;
            o.smallImageOriginalH = o.smallImage_img.height;
            o.thumbnail_do.setScreen(o.smallImage_img);
            o.thumbHolder_do.addChild(o.thumbnail_do);
            var e = o.thumbHolder_do.w / o.smallImageOriginalW;
            var t = o.thumbHolder_do.h / o.smallImageOriginalH;
            var n = 0;
            if (e >= t) {
                n = e
            } else if (e <= t) {
                n = t
            }
            o.thumbnail_do.setWidth(Math.round(o.smallImageOriginalW * n));
            o.thumbnail_do.setHeight(Math.round(o.smallImageOriginalH * n));
            o.thumbnail_do.setX(Math.round((o.thumbHolder_do.w - o.thumbnail_do.w) / 2));
            o.thumbnail_do.setY(Math.round((o.thumbHolder_do.h - o.thumbnail_do.h) / 2));
            o.thumbnail_do.setAlpha(0);
            FWDUVPTweenMax.to(o.thumbnail_do, .8, {
                alpha: 1
            });
            o.updateText()
        };
        this.updateText = function(e) {
            if (e) this.text_do.setInnerHTML(e);
            if (this.hasThumbanil_bl) {
                this.text_do.setX(16);
                this.text_do.setWidth(this.totalWidth - this.totalHeight - 26)
            } else {
                this.text_do.setX(8);
                this.text_do.setWidth(this.totalWidth - 16)
            }
            this.text_do.setY(parseInt((o.totalHeight - o.text_do.getHeight()) / 2))
        };
        this.show = function(e) {
            if (this.isShowed_bl) return;
            this.isShowed_bl = true;
            this.setVisible(true);
            FWDUVPTweenMax.killTweensOf(this.main_do);
            if (e && !o.isMobile_bl) {
                if (this.position_str == "left") {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: 0,
                        delay: .2,
                        ease: Expo.easeInOut
                    })
                } else {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: -this.totalWidth + 1,
                        delay: .2,
                        ease: Expo.easeInOut
                    })
                }
            } else {
                if (this.position_str == "left") {
                    this.main_do.setX(0)
                } else {
                    this.main_do.setX(-this.totalWidth)
                }
            }
        };
        this.hide = function(e, t) {
            if (!this.isShowed_bl && !t) return;
            this.isShowed_bl = false;
            this.hasThumbanil_bl = false;
            FWDUVPTweenMax.killTweensOf(this.main_do);
            if (e && !o.isMobile_bl) {
                if (this.position_str == "left") {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: -this.totalWidth,
                        ease: Expo.easeInOut,
                        onComplete: this.hideCompleteHandler
                    })
                } else {
                    FWDUVPTweenMax.to(this.main_do, .8, {
                        x: 0,
                        ease: Expo.easeInOut,
                        onComplete: this.hideCompleteHandler
                    })
                }
            } else {
                if (this.position_str == "left") {
                    this.main_do.setX(-this.totalWidth)
                } else {
                    this.main_do.setX(0)
                }
                this.hideCompleteHandler()
            }
        };
        this.hideCompleteHandler = function() {
            if (o.smallImage_img) {
                o.smallImage_img.onload = null;
                o.smallImage_img.src = "";
                FWDUVPTweenMax.killTweensOf(o.thumbnail_do)
            }
            if (o.main_do.alpha != 1) o.main_do.setAlpha(1);
            o.thumbHolder_do.setVisible(false);
            o.setVisible(false)
        };
        this.hideWithOpacity = function() {
            if (!FWDUVPUtils.isIEAndLessThen9) {
                FWDUVPTweenMax.to(this.main_do, .8, {
                    alpha: .5
                })
            }
        };
        this.showWithOpacity = function() {
            if (!FWDUVPUtils.isIEAndLessThen9) {
                FWDUVPTweenMax.to(this.main_do, .8, {
                    alpha: 1
                })
            }
        };
        o.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPTransformDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.SHOW_TOOLTIP = "showTooltip";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDUVPAdsStart = t
})(window);
(function() {
    var e = function(t, n) {
        var r = this;
        var i = e.prototype;
        this.image_img;
        this.catThumbBk_img = t.catThumbBk_img;
        this.catNextN_img = t.catNextN_img;
        this.catPrevN_img = t.catPrevN_img;
        this.catCloseN_img = t.catCloseN_img;
        this.mainHolder_do = null;
        this.closeButton_do = null;
        this.nextButton_do = null;
        this.prevButton_do = null;
        this.thumbs_ar = [];
        this.categories_ar = t.cats_ar;
        this.catBkPath_str = t.catBkPath_str;
        this.id = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.dif = 0;
        this.tempId = r.id;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.thumbW = 0;
        this.thumbH = 0;
        this.buttonsMargins = t.buttonsMargins;
        this.thumbnailMaxWidth = t.thumbnailMaxWidth;
        this.thumbnailMaxHeight = t.thumbnailMaxHeight;
        this.spacerH = t.horizontalSpaceBetweenThumbnails;
        this.spacerV = t.verticalSpaceBetweenThumbnails;
        this.dl;
        this.howManyThumbsToDisplayH = 0;
        this.howManyThumbsToDisplayV = 0;
        this.categoriesOffsetTotalWidth = r.catNextN_img.width * 2 + 30;
        this.categoriesOffsetTotalHeight = r.catNextN_img.height + 30;
        this.totalThumbnails = r.categories_ar.length;
        this.delayRate = .06;
        this.countLoadedThumbs = 0;
        this.hideCompleteId_to;
        this.showCompleteId_to;
        this.loadThumbnailsId_to;
        this.preventMouseWheelNavigId_to;
        this.preventMouseWheelNavig_bl = false;
        this.areThumbnailsCreated_bl = false;
        this.areThumbnailsLoaded_bl = false;
        this.isShowed_bl = false;
        this.isOnDOM_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        r.init = function() {
            if (r.isMobile_bl && r.hasPointerEvent_bl) r.getStyle().msTouchAction = "none";
            r.getStyle().zIndex = 16777271;
            r.getStyle().msTouchAction = "none";
            r.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
            r.getStyle().width = "100%";
            r.mainHolder_do = new FWDUVPDisplayObject("div");
            r.mainHolder_do.getStyle().background = "url('" + r.catBkPath_str + "')";
            r.mainHolder_do.setY(-3e3);
            r.addChild(r.mainHolder_do);
            r.setupButtons();
            r.setupDisable();
            if (r.isMobile_bl) {
                r.setupMobileMove();
                if (FWDUVPUtils.isChrome) {
                    if (FWDUVPUtils.isIEAndLessThen9) {
                        document.getElementsByTagName("body")[0].appendChild(r.screen)
                    } else {
                        document.documentElement.appendChild(r.screen)
                    }
                }
            }
            if (!r.isMobile_bl || r.isMobile_bl && r.hasPointerEvent_bl) r.setSelectable(false);
            if (window.addEventListener) {
                r.screen.addEventListener("mousewheel", r.mouseWheelDumyHandler);
                r.screen.addEventListener("DOMMouseScroll", r.mouseWheelDumyHandler)
            } else if (document.attachEvent) {
                r.screen.attachEvent("onmousewheel", r.mouseWheelDumyHandler)
            }
        };
        this.mouseWheelDumyHandler = function(e) {
            var t;
            if (FWDUVPTweenMax.isTweening(r.mainHolder_do)) {
                if (e.preventDefault) {
                    e.preventDefault()
                }
                return false
            }
            for (var n = 0; n < r.totalThumbnails; n++) {
                t = r.thumbs_ar[n];
                if (FWDUVPTweenMax.isTweening(t)) {
                    if (e.preventDefault) {
                        e.preventDefault()
                    }
                    return false
                }
            }
            var i = e.detail || e.wheelDelta;
            if (e.wheelDelta) i *= -1;
            if (FWDUVPUtils.isOpera) i *= -1;
            if (i > 0) {
                r.nextButtonOnMouseUpHandler()
            } else if (i < 0) {
                if (r.leftId <= 0) return;
                r.prevButtonOnMouseUpHandler()
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        r.resizeAndPosition = function(e) {
            if (!r.isShowed_bl && !e) return;
            var t = FWDUVPUtils.getScrollOffsets();
            var i = FWDUVPUtils.getViewportSize();
            r.stageWidth = i.w;
            r.stageHeight = i.h;
            FWDUVPTweenMax.killTweensOf(r.mainHolder_do);
            r.mainHolder_do.setX(0);
            r.mainHolder_do.setWidth(r.stageWidth);
            r.mainHolder_do.setHeight(r.stageHeight);
            r.setX(t.x);
            r.setY(t.y);
            r.setHeight(r.stageHeight);
            if (r.isMobile_bl || n.isEmbedded_bl) r.setWidth(r.stageWidth);
            r.positionButtons();
            r.tempId = r.id;
            r.resizeAndPositionThumbnails();
            r.disableEnableNextAndPrevButtons()
        };
        r.onScrollHandler = function() {
            var e = FWDUVPUtils.getScrollOffsets();
            r.setX(e.x);
            r.setY(e.y)
        };
        this.setupDisable = function() {
            r.disable_do = new FWDUVPDisplayObject("div");
            if (FWDUVPUtils.isIE) {
                r.disable_do.setBkColor("#FFFFFF");
                r.disable_do.setAlpha(.01)
            }
            r.addChild(r.disable_do)
        };
        this.showDisable = function() {
            if (r.disable_do.w == r.stageWidth) return;
            r.disable_do.setWidth(r.stageWidth);
            r.disable_do.setHeight(r.stageHeight)
        };
        this.hideDisable = function() {
            if (r.disable_do.w == 0) return;
            r.disable_do.setWidth(0);
            r.disable_do.setHeight(0)
        };
        this.setupButtons = function() {
            FWDUVPSimpleButton.setPrototype();
            r.closeButton_do = new FWDUVPSimpleButton(r.catCloseN_img, t.catCloseSPath_str);
            r.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.closeButtonOnMouseUpHandler);
            FWDUVPSimpleButton.setPrototype();
            r.nextButton_do = new FWDUVPSimpleButton(r.catNextN_img, t.catNextSPath_str, undefined, true);
            r.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.nextButtonOnMouseUpHandler);
            FWDUVPSimpleButton.setPrototype();
            r.prevButton_do = new FWDUVPSimpleButton(r.catPrevN_img, t.catPrevSPath_str, undefined, true);
            r.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.prevButtonOnMouseUpHandler)
        };
        this.closeButtonOnMouseUpHandler = function() {
            r.hide()
        };
        this.nextButtonOnMouseUpHandler = function() {
            var e = r.howManyThumbsToDisplayH * r.howManyThumbsToDisplayV;
            r.tempId += e;
            if (r.tempId > r.totalThumbnails - 1) r.tempId = r.totalThumbnails - 1;
            var t = Math.floor(r.tempId / e);
            r.tempId = t * e;
            r.resizeAndPositionThumbnails(true, "next");
            r.disableEnableNextAndPrevButtons(false, true)
        };
        this.prevButtonOnMouseUpHandler = function() {
            var e = r.howManyThumbsToDisplayH * r.howManyThumbsToDisplayV;
            r.tempId -= e;
            if (r.tempId < 0) r.tempId = 0;
            var t = Math.floor(r.tempId / e);
            r.tempId = t * e;
            r.resizeAndPositionThumbnails(true, "prev");
            r.disableEnableNextAndPrevButtons(true, false)
        };
        this.positionButtons = function() {
            r.closeButton_do.setX(r.stageWidth - r.closeButton_do.w - r.buttonsMargins);
            r.closeButton_do.setY(r.buttonsMargins);
            r.nextButton_do.setX(r.stageWidth - r.nextButton_do.w - r.buttonsMargins);
            r.nextButton_do.setY(parseInt((r.stageHeight - r.nextButton_do.h) / 2));
            r.prevButton_do.setX(r.buttonsMargins);
            r.prevButton_do.setY(parseInt((r.stageHeight - r.prevButton_do.h) / 2))
        };
        this.disableEnableNextAndPrevButtons = function(e, t) {
            var n = r.howManyThumbsToDisplayH * r.howManyThumbsToDisplayV;
            var i = Math.floor(r.tempId / n);
            var s = Math.ceil(r.totalThumbnails / n) - 1;
            var o = r.howManyThumbsToDisplayH * i;
            var u = s * r.howManyThumbsToDisplayH;
            if (n >= r.totalThumbnails) {
                r.nextButton_do.disable();
                r.prevButton_do.disable();
                r.nextButton_do.setDisabledState();
                r.prevButton_do.setDisabledState()
            } else if (i == 0) {
                r.nextButton_do.enable();
                r.prevButton_do.disable();
                r.nextButton_do.setEnabledState();
                r.prevButton_do.setDisabledState()
            } else if (i == s) {
                r.nextButton_do.disable();
                r.prevButton_do.enable();
                r.nextButton_do.setDisabledState();
                r.prevButton_do.setEnabledState()
            } else {
                r.nextButton_do.enable();
                r.prevButton_do.enable();
                r.nextButton_do.setEnabledState();
                r.prevButton_do.setEnabledState()
            }
            if (!e) {
                r.prevButton_do.setNormalState()
            }
            if (!t) {
                r.nextButton_do.setNormalState()
            }
        };
        this.setupMobileMove = function() {
            if (r.hasPointerEvent_bl) {
                r.screen.addEventListener("MSPointerDown", r.mobileDownHandler)
            } else {
                r.screen.addEventListener("touchstart", r.mobileDownHandler)
            }
        };
        this.mobileDownHandler = function(e) {
            if (e.touches)
                if (e.touches.length != 1) return;
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            r.mouseX = t.screenX;
            r.mouseY = t.screenY;
            if (r.hasPointerEvent_bl) {
                window.addEventListener("MSPointerUp", r.mobileUpHandler);
                window.addEventListener("MSPointerMove", r.mobileMoveHandler)
            } else {
                window.addEventListener("touchend", r.mobileUpHandler);
                window.addEventListener("touchmove", r.mobileMoveHandler)
            }
        };
        this.mobileMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (e.touches)
                if (e.touches.length != 1) return;
            r.showDisable();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            r.dif = r.mouseX - t.screenX;
            r.mouseX = t.screenX;
            r.mouseY = t.screenY
        };
        this.mobileUpHandler = function(e) {
            r.hideDisable();
            if (r.dif > 10) {
                r.nextButtonOnMouseUpHandler()
            } else if (r.dif < -10) {
                r.prevButtonOnMouseUpHandler()
            }
            r.dif = 0;
            if (r.hasPointerEvent_bl) {
                window.removeEventListener("MSPointerUp", r.mobileUpHandler, false);
                window.removeEventListener("MSPointerMove", r.mobileMoveHandler)
            } else {
                window.removeEventListener("touchend", r.mobileUpHandler);
                window.removeEventListener("touchmove", r.mobileMoveHandler)
            }
        };
        this.setupThumbnails = function() {
            if (r.areThumbnailsCreated_bl) return;
            r.areThumbnailsCreated_bl = true;
            var e;
            for (var n = 0; n < r.totalThumbnails; n++) {
                FWDUVPCategoriesThumb.setPrototype();
                e = new FWDUVPCategoriesThumb(r, n, t.catThumbBkPath_str, t.catThumbBkTextPath_str, t.thumbnailSelectedType_str, r.categories_ar[n].htmlContent);
                e.addListener(FWDUVPCategoriesThumb.MOUSE_UP, r.thumbnailOnMouseUpHandler);
                r.thumbs_ar[n] = e;
                r.mainHolder_do.addChild(e)
            }
            r.mainHolder_do.addChild(r.closeButton_do);
            r.mainHolder_do.addChild(r.nextButton_do);
            r.mainHolder_do.addChild(r.prevButton_do)
        };
        this.thumbnailOnMouseUpHandler = function(e) {
            r.id = e.id;
            r.disableOrEnableThumbnails();
            r.hide()
        };
        this.resizeAndPositionThumbnails = function(e, t) {
            if (!r.areThumbnailsCreated_bl) return;
            var n;
            var i;
            var s;
            var o;
            var u;
            var a;
            var i;
            var f;
            var l;
            var c;
            var h;
            var p;
            var d;
            var v;
            this.remainWidthSpace = this.stageWidth - i;
            var m = r.stageWidth - r.categoriesOffsetTotalWidth;
            var g = r.stageHeight - r.categoriesOffsetTotalHeight;
            r.howManyThumbsToDisplayH = Math.ceil((m - r.spacerH) / (r.thumbnailMaxWidth + r.spacerH));
            r.thumbW = Math.floor((m - r.spacerH * (r.howManyThumbsToDisplayH - 1)) / r.howManyThumbsToDisplayH);
            if (r.thumbW > r.thumbnailMaxWidth) {
                r.howManyThumbsToDisplayH += 1;
                r.thumbW = Math.floor((m - r.spacerH * (r.howManyThumbsToDisplayH - 1)) / r.howManyThumbsToDisplayH)
            }
            r.thumbH = Math.floor(r.thumbW / r.thumbnailMaxWidth * r.thumbnailMaxHeight);
            r.howManyThumbsToDisplayV = Math.floor(g / (r.thumbH + r.spacerV));
            if (r.howManyThumbsToDisplayV < 1) r.howManyThumbsToDisplayV = 1;
            i = Math.min(r.howManyThumbsToDisplayH, r.totalThumbnails) * (r.thumbW + r.spacerH) - r.spacerH;
            f = Math.min(Math.ceil(r.totalThumbnails / r.howManyThumbsToDisplayH), r.howManyThumbsToDisplayV) * (r.thumbH + r.spacerV) - r.spacerV;
            if (r.howManyThumbsToDisplayH > r.totalThumbnails) {
                l = 0
            } else {
                l = m - i
            }
            if (r.howManyThumbsToDisplayH > r.totalThumbnails) r.howManyThumbsToDisplayH = r.totalThumbnails;
            v = r.howManyThumbsToDisplayH * r.howManyThumbsToDisplayV;
            s = Math.floor(r.tempId / v);
            d = r.howManyThumbsToDisplayH * s;
            firstId = s * v;
            h = firstId + v;
            if (h > r.totalThumbnails) h = r.totalThumbnails;
            for (var y = 0; y < r.totalThumbnails; y++) {
                n = r.thumbs_ar[y];
                n.finalW = r.thumbW;
                if (y % r.howManyThumbsToDisplayH == r.howManyThumbsToDisplayH - 1) n.finalW += l;
                n.finalH = r.thumbH;
                n.finalX = y % r.howManyThumbsToDisplayH * (r.thumbW + r.spacerH);
                n.finalX += Math.floor(y / v) * r.howManyThumbsToDisplayH * (r.thumbW + r.spacerH);
                n.finalX += (r.stageWidth - i) / 2;
                n.finalX = Math.floor(n.finalX - d * (r.thumbW + r.spacerH));
                n.finalY = y % v;
                n.finalY = Math.floor(n.finalY / r.howManyThumbsToDisplayH) * (r.thumbH + r.spacerV);
                n.finalY += (g - f) / 2;
                n.finalY += r.categoriesOffsetTotalHeight / 2;
                n.finalY = Math.floor(n.finalY);
                o = Math.floor(y / v);
                if (o > s) {
                    n.finalX += 150
                } else if (o < s) {
                    n.finalX -= 150
                }
                if (e) {
                    if (y >= firstId && y < h) {
                        if (t == "next") {
                            dl = y % v * r.delayRate + .1
                        } else {
                            dl = (v - y % v) * r.delayRate + .1
                        }
                        n.resizeAndPosition(true, dl)
                    } else {
                        n.resizeAndPosition(true, 0)
                    }
                } else {
                    n.resizeAndPosition()
                }
            }
        };
        this.loadImages = function() {
            if (r.countLoadedThumbs > r.totalThumbnails - 1) return;
            if (r.image_img) {
                r.image_img.onload = null;
                r.image_img.onerror = null
            }
            r.image_img = new Image;
            r.image_img.onerror = r.onImageLoadError;
            r.image_img.onload = r.onImageLoadComplete;
            r.image_img.src = r.categories_ar[r.countLoadedThumbs].thumbnailPath
        };
        this.onImageLoadError = function(e) {};
        this.onImageLoadComplete = function(e) {
            var t = r.thumbs_ar[r.countLoadedThumbs];
            t.setImage(r.image_img);
            r.countLoadedThumbs++;
            r.loadWithDelayId_to = setTimeout(r.loadImages, 40)
        };
        this.disableOrEnableThumbnails = function() {
            var e;
            for (var t = 0; t < r.totalThumbnails; t++) {
                e = r.thumbs_ar[t];
                if (t == r.id) {
                    e.disable()
                } else {
                    e.enable()
                }
            }
        };
        this.show = function(e) {
            if (r.isShowed_bl) return;
            r.isShowed_bl = true;
            r.isOnDOM_bl = true;
            r.id = e;
            if (FWDUVPUtils.isChrome && r.isMobile_bl) {
                r.setVisible(true)
            } else {
                if (FWDUVPUtils.isIEAndLessThen9) {
                    document.getElementsByTagName("body")[0].appendChild(r.screen)
                } else {
                    document.documentElement.appendChild(r.screen)
                }
            }
            if (window.addEventListener) {
                window.addEventListener("scroll", r.onScrollHandler)
            } else if (window.attachEvent) {
                window.attachEvent("onscroll", r.onScrollHandler)
            }
            r.setupThumbnails();
            r.resizeAndPosition(true);
            r.showDisable();
            r.disableOrEnableThumbnails();
            clearTimeout(r.hideCompleteId_to);
            clearTimeout(r.showCompleteId_to);
            r.mainHolder_do.setY(-r.stageHeight);
            if (r.isMobile_bl) {
                r.showCompleteId_to = setTimeout(r.showCompleteHandler, 1200);
                FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                    y: 0,
                    delay: .4,
                    ease: Expo.easeInOut
                })
            } else {
                r.showCompleteId_to = setTimeout(r.showCompleteHandler, 800);
                FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })
            }
        };
        this.showCompleteHandler = function() {
            r.mainHolder_do.setY(0);
            r.hideDisable();
            if (FWDUVPUtils.isIphone) {
                if (n.videoScreen_do) n.videoScreen_do.setY(-5e3);
                if (n.ytb_do) n.ytb_do.setY(-5e3)
            }
            r.resizeAndPosition(true);
            if (!r.areThumbnailsLoaded_bl) {
                r.loadImages();
                r.areThumbnailsLoaded_bl = true
            }
        };
        this.hide = function() {
            if (!r.isShowed_bl) return;
            r.isShowed_bl = false;
            if (FWDUVPUtils.isIphone) {
                if (n.videoScreen_do) n.videoScreen_do.setY(0);
                if (n.ytb_do) n.ytb_do.setY(0)
            }
            clearTimeout(r.hideCompleteId_to);
            clearTimeout(r.showCompleteId_to);
            r.showDisable();
            r.hideCompleteId_to = setTimeout(r.hideCompleteHandler, 800);
            FWDUVPTweenMax.killTweensOf(r.mainHolder_do);
            FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                y: -r.stageHeight,
                ease: Expo.easeInOut
            });
            if (window.addEventListener) {
                window.removeEventListener("scroll", r.onScrollHandler)
            } else if (window.detachEvent) {
                window.detachEvent("onscroll", r.onScrollHandler)
            }
            r.resizeAndPosition()
        };
        this.hideCompleteHandler = function() {
            if (FWDUVPUtils.isChrome && r.isMobile_bl) {
                r.setVisible(false)
            } else {
                if (FWDUVPUtils.isIEAndLessThen9) {
                    document.getElementsByTagName("body")[0].removeChild(r.screen)
                } else {
                    document.documentElement.removeChild(r.screen)
                }
            }
            r.isOnDOM_bl = false;
            r.dispatchEvent(e.HIDE_COMPLETE)
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDUVPDisplayObject("div")
    };
    e.HIDE_COMPLETE = "hideComplete";
    e.prototype = null;
    window.FWDUVPCategories = e
})();
(function(e) {
    var t = function(e, n, r, i, s, o) {
        var u = this;
        var a = t.prototype;
        this.backgroundImagePath_str = r;
        this.catThumbTextBkPath_str = i;
        this.canvas_el = null;
        this.htmlContent = o;
        this.simpleText_do = null;
        this.effectImage_do = null;
        this.imageHolder_do = null;
        this.normalImage_do = null;
        this.effectImage_do = null;
        this.dumy_do = null;
        this.thumbnailSelectedType_str = s;
        this.id = n;
        this.imageOriginalW;
        this.imageOriginalH;
        this.finalX;
        this.finalY;
        this.finalW;
        this.finalH;
        this.imageFinalX;
        this.imageFinalY;
        this.imageFinalW;
        this.imageFinalH;
        this.dispatchShowWithDelayId_to;
        this.isShowed_bl = false;
        this.hasImage_bl = false;
        this.isSelected_bl = false;
        this.isDisabled_bl = false;
        this.hasCanvas_bl = FWDUVPlayer.hasCanvas;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.init = function() {
            u.getStyle().background = "url('" + u.backgroundImagePath_str + "')";
            u.setupMainContainers();
            u.setupDescription();
            u.setupDumy()
        };
        this.setupMainContainers = function() {
            u.imageHolder_do = new FWDUVPDisplayObject("div");
            u.addChild(u.imageHolder_do)
        };
        this.setupDumy = function() {
            u.dumy_do = new FWDUVPDisplayObject("div");
            if (FWDUVPUtils.isIE) {
                u.dumy_do.setBkColor("#FFFFFF");
                u.dumy_do.setAlpha(0)
            }
            u.addChild(u.dumy_do)
        };
        this.setupDescription = function() {
            u.simpleText_do = new FWDUVPDisplayObject("div");
            u.simpleText_do.getStyle().background = "url('" + u.catThumbTextBkPath_str + "')";
            if (FWDUVPUtils.isFirefox) {
                u.simpleText_do.hasTransform3d_bl = false;
                u.simpleText_do.hasTransform2d_bl = false
            }
            u.simpleText_do.setBackfaceVisibility();
            u.simpleText_do.getStyle().width = "100%";
            u.simpleText_do.getStyle().fontFamily = "Arial";
            u.simpleText_do.getStyle().fontSize = "12px";
            u.simpleText_do.getStyle().textAlign = "left";
            u.simpleText_do.getStyle().color = "#FFFFFF";
            u.simpleText_do.getStyle().fontSmoothing = "antialiased";
            u.simpleText_do.getStyle().webkitFontSmoothing = "antialiased";
            u.simpleText_do.getStyle().textRendering = "optimizeLegibility";
            u.simpleText_do.setInnerHTML(u.htmlContent);
            u.addChild(u.simpleText_do)
        };
        this.positionDescription = function() {
            u.simpleText_do.setY(parseInt(u.finalH - u.simpleText_do.getHeight()))
        };
        this.setupBlackAndWhiteImage = function(e) {
            if (!u.hasCanvas_bl || u.thumbnailSelectedType_str == "opacity") return;
            var t = document.createElement("canvas");
            var n = t.getContext("2d");
            t.width = u.imageOriginalW;
            t.height = u.imageOriginalH;
            n.drawImage(e, 0, 0);
            var r = n.getImageData(0, 0, t.width, t.height);
            var i = r.data;
            if (u.thumbnailSelectedType_str == "threshold") {
                for (var s = 0; s < i.length; s += 4) {
                    var o = i[s];
                    var a = i[s + 1];
                    var f = i[s + 2];
                    var l = .2126 * o + .7152 * a + .0722 * f >= 150 ? 255 : 0;
                    i[s] = i[s + 1] = i[s + 2] = l
                }
            } else if (u.thumbnailSelectedType_str == "blackAndWhite") {
                for (var s = 0; s < i.length; s += 4) {
                    var o = i[s];
                    var a = i[s + 1];
                    var f = i[s + 2];
                    var l = .2126 * o + .7152 * a + .0722 * f;
                    i[s] = i[s + 1] = i[s + 2] = l
                }
            }
            n.putImageData(r, 0, 0, 0, 0, r.width, r.height);
            u.effectImage_do = new FWDUVPDisplayObject("canvas");
            u.effectImage_do.screen = t;
            u.effectImage_do.setAlpha(.9);
            u.effectImage_do.setMainProperties()
        };
        this.setImage = function(t) {
            u.normalImage_do = new FWDUVPDisplayObject("img");
            u.normalImage_do.setScreen(t);
            u.imageOriginalW = u.normalImage_do.w;
            u.imageOriginalH = u.normalImage_do.h;
            u.setButtonMode(true);
            u.setupBlackAndWhiteImage(t);
            u.resizeImage();
            u.imageHolder_do.setX(parseInt(u.finalW / 2));
            u.imageHolder_do.setY(parseInt(u.finalH / 2));
            u.imageHolder_do.setWidth(0);
            u.imageHolder_do.setHeight(0);
            u.normalImage_do.setX(-parseInt(u.normalImage_do.w / 2));
            u.normalImage_do.setY(-parseInt(u.normalImage_do.h / 2));
            u.normalImage_do.setAlpha(0);
            if (u.effectImage_do) {
                u.effectImage_do.setX(-parseInt(u.normalImage_do.w / 2));
                u.effectImage_do.setY(-parseInt(u.normalImage_do.h / 2));
                u.effectImage_do.setAlpha(.01)
            }
            FWDUVPTweenMax.to(u.imageHolder_do, .8, {
                x: 0,
                y: 0,
                w: u.finalW,
                h: u.finalH,
                ease: Expo.easeInOut
            });
            FWDUVPTweenMax.to(u.normalImage_do, .8, {
                alpha: 1,
                x: u.imageFinalX,
                y: u.imageFinalY,
                ease: Expo.easeInOut
            });
            if (u.effectImage_do) {
                FWDUVPTweenMax.to(u.effectImage_do, .8, {
                    x: u.imageFinalX,
                    y: u.imageFinalY,
                    ease: Expo.easeInOut
                })
            }
            if (u.isMobile_bl) {
                if (u.hasPointerEvent_bl) {
                    u.screen.addEventListener("MSPointerUp", u.onMouseUp);
                    u.screen.addEventListener("MSPointerOver", u.onMouseOver);
                    u.screen.addEventListener("MSPointerOut", u.onMouseOut)
                } else {
                    u.screen.addEventListener("mouseup", u.onMouseUp)
                }
            } else if (u.screen.addEventListener) {
                u.screen.addEventListener("mouseover", u.onMouseOver);
                u.screen.addEventListener("mouseout", u.onMouseOut);
                u.screen.addEventListener("mouseup", u.onMouseUp)
            } else if (u.screen.attachEvent) {
                u.screen.attachEvent("onmouseover", u.onMouseOver);
                u.screen.attachEvent("onmouseout", u.onMouseOut);
                u.screen.attachEvent("onmouseup", u.onMouseUp)
            }
            this.imageHolder_do.addChild(u.normalImage_do);
            if (u.effectImage_do) u.imageHolder_do.addChild(u.effectImage_do);
            this.hasImage_bl = true;
            if (u.id == e.id) {
                u.disable()
            }
        };
        u.onMouseOver = function(e, t) {
            if (u.isDisabled_bl) return;
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                u.setSelectedState(true)
            }
        };
        u.onMouseOut = function(e) {
            if (u.isDisabled_bl) return;
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                u.setNormalState(true)
            }
        };
        u.onMouseUp = function(e) {
            if (u.isDisabled_bl || e.button == 2) return;
            if (e.preventDefault) e.preventDefault();
            u.dispatchEvent(t.MOUSE_UP, {
                id: u.id
            })
        };
        this.resizeAndPosition = function(e, t) {
            FWDUVPTweenMax.killTweensOf(u);
            FWDUVPTweenMax.killTweensOf(u.imageHolder_do);
            if (e) {
                FWDUVPTweenMax.to(u, .8, {
                    x: u.finalX,
                    y: u.finalY,
                    delay: t,
                    ease: Expo.easeInOut
                })
            } else {
                u.setX(u.finalX);
                u.setY(u.finalY)
            }
            u.setWidth(u.finalW);
            u.setHeight(u.finalH);
            u.imageHolder_do.setX(0);
            u.imageHolder_do.setY(0);
            u.imageHolder_do.setWidth(u.finalW);
            u.imageHolder_do.setHeight(u.finalH);
            u.dumy_do.setWidth(u.finalW);
            u.dumy_do.setHeight(u.finalH);
            u.resizeImage();
            u.positionDescription()
        };
        this.resizeImage = function(e) {
            if (!u.normalImage_do) return;
            FWDUVPTweenMax.killTweensOf(u.normalImage_do);
            var t = u.finalW / u.imageOriginalW;
            var n = u.finalH / u.imageOriginalH;
            var r;
            if (t >= n) {
                r = t
            } else {
                r = n
            }
            u.imageFinalW = Math.ceil(r * u.imageOriginalW);
            u.imageFinalH = Math.ceil(r * u.imageOriginalH);
            u.imageFinalX = Math.round((u.finalW - u.imageFinalW) / 2);
            u.imageFinalY = Math.round((u.finalH - u.imageFinalH) / 2);
            if (u.effectImage_do) {
                FWDUVPTweenMax.killTweensOf(u.effectImage_do);
                u.effectImage_do.setX(u.imageFinalX);
                u.effectImage_do.setY(u.imageFinalY);
                u.effectImage_do.setWidth(u.imageFinalW);
                u.effectImage_do.setHeight(u.imageFinalH);
                if (u.isDisabled_bl) u.setSelectedState(false, true)
            }
            u.normalImage_do.setX(u.imageFinalX);
            u.normalImage_do.setY(u.imageFinalY);
            u.normalImage_do.setWidth(u.imageFinalW);
            u.normalImage_do.setHeight(u.imageFinalH);
            if (u.isDisabled_bl) {
                u.normalImage_do.setAlpha(.3)
            } else {
                u.normalImage_do.setAlpha(1)
            }
        };
        this.setNormalState = function(e) {
            if (!u.isSelected_bl) return;
            u.isSelected_bl = false;
            if (u.thumbnailSelectedType_str == "threshold" || u.thumbnailSelectedType_str == "blackAndWhite") {
                if (e) {
                    FWDUVPTweenMax.to(u.effectImage_do, 1, {
                        alpha: .01,
                        ease: Quart.easeOut
                    })
                } else {
                    u.effectImage_do.setAlpha(.01)
                }
            } else if (u.thumbnailSelectedType_str == "opacity") {
                if (e) {
                    FWDUVPTweenMax.to(u.normalImage_do, 1, {
                        alpha: 1,
                        ease: Quart.easeOut
                    })
                } else {
                    u.normalImage_do.setAlpha(1)
                }
            }
        };
        this.setSelectedState = function(e, t) {
            if (u.isSelected_bl && !t) return;
            u.isSelected_bl = true;
            if (u.thumbnailSelectedType_str == "threshold" || u.thumbnailSelectedType_str == "blackAndWhite") {
                if (e) {
                    FWDUVPTweenMax.to(u.effectImage_do, 1, {
                        alpha: 1,
                        ease: Expo.easeOut
                    })
                } else {
                    u.effectImage_do.setAlpha(1)
                }
            } else if (u.thumbnailSelectedType_str == "opacity") {
                if (e) {
                    FWDUVPTweenMax.to(u.normalImage_do, 1, {
                        alpha: .3,
                        ease: Expo.easeOut
                    })
                } else {
                    u.normalImage_do.setAlpha(.3)
                }
            }
        };
        this.enable = function() {
            if (!u.hasImage_bl) return;
            u.isDisabled_bl = false;
            u.setButtonMode(true);
            u.setNormalState(true)
        };
        this.disable = function() {
            if (!u.hasImage_bl) return;
            u.isDisabled_bl = true;
            u.setButtonMode(false);
            u.setSelectedState(true)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.MOUSE_UP = "onMouseUp";
    t.prototype = null;
    e.FWDUVPCategoriesThumb = t
})(window);
(function() {
    var e = function(t, n, r, i, s) {
        var o = this;
        var u = e.prototype;
        this.n1Img = t;
        this.s1Path_str = n;
        this.n2Img = r;
        this.s2Path_str = i;
        this.firstButton_do;
        this.n1_do;
        this.s1_do;
        this.secondButton_do;
        this.n2_do;
        this.s2_do;
        this.buttonWidth = o.n1Img.width;
        this.buttonHeight = o.n1Img.height;
        this.isSelectedState_bl = false;
        this.currentState = 1;
        this.isDisabled_bl = false;
        this.isMaximized_bl = false;
        this.disptachMainEvent_bl = s;
        this.isDisabled_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.allowToCreateSecondButton_bl = !o.isMobile_bl || o.hasPointerEvent_bl;
        o.init = function() {
            o.setButtonMode(true);
            o.setWidth(o.buttonWidth);
            o.setHeight(o.buttonHeight);
            o.setupMainContainers();
            o.secondButton_do.setVisible(false)
        };
        o.setupMainContainers = function() {
            o.firstButton_do = new FWDUVPDisplayObject("div");
            o.firstButton_do.setBackfaceVisibility();
            o.firstButton_do.hasTransform2d_bl = false;
            o.firstButton_do.hasTransform3d_bl = false;
            o.addChild(o.firstButton_do);
            o.n1_do = new FWDUVPDisplayObject("img");
            o.n1_do.setScreen(o.n1Img);
            o.n1_do.setBackfaceVisibility();
            o.n1_do.hasTransform2d_bl = false;
            o.n1_do.hasTransform3d_bl = false;
            o.firstButton_do.addChild(o.n1_do);
            if (o.allowToCreateSecondButton_bl) {
                o.s1_do = new FWDUVPDisplayObject("img");
                var e = new Image;
                e.src = o.s1Path_str;
                o.s1_do.setScreen(e);
                o.s1_do.setWidth(o.buttonWidth);
                o.s1_do.setHeight(o.buttonHeight);
                o.s1_do.setAlpha(0);
                o.s1_do.setBackfaceVisibility();
                o.s1_do.hasTransform2d_bl = false;
                o.s1_do.hasTransform3d_bl = false;
                o.firstButton_do.addChild(o.s1_do)
            }
            o.firstButton_do.setWidth(o.buttonWidth);
            o.firstButton_do.setHeight(o.buttonHeight);
            o.secondButton_do = new FWDUVPDisplayObject("div");
            o.secondButton_do.setBackfaceVisibility();
            o.secondButton_do.hasTransform2d_bl = false;
            o.secondButton_do.hasTransform3d_bl = false;
            o.addChild(o.secondButton_do);
            o.n2_do = new FWDUVPDisplayObject("img");
            o.n2_do.setScreen(o.n2Img);
            o.n2_do.setBackfaceVisibility();
            o.n2_do.hasTransform2d_bl = false;
            o.n2_do.hasTransform3d_bl = false;
            o.secondButton_do.addChild(o.n2_do);
            if (o.allowToCreateSecondButton_bl) {
                o.s2_do = new FWDUVPDisplayObject("img");
                var t = new Image;
                t.src = o.s2Path_str;
                o.s2_do.setScreen(t);
                o.s2_do.setBackfaceVisibility();
                o.s2_do.hasTransform2d_bl = false;
                o.s2_do.hasTransform3d_bl = false;
                o.s2_do.setWidth(o.buttonWidth);
                o.s2_do.setHeight(o.buttonHeight);
                o.s2_do.setAlpha(0);
                o.secondButton_do.addChild(o.s2_do)
            }
            o.secondButton_do.setWidth(o.buttonWidth);
            o.secondButton_do.setHeight(o.buttonHeight);
            o.addChild(o.secondButton_do);
            o.addChild(o.firstButton_do);
            if (o.isMobile_bl) {
                if (o.hasPointerEvent_bl) {
                    o.screen.addEventListener("MSPointerDown", o.onMouseUp);
                    o.screen.addEventListener("MSPointerOver", o.onMouseOver);
                    o.screen.addEventListener("MSPointerOut", o.onMouseOut)
                } else {
                    o.screen.addEventListener("toustart", o.onDown);
                    o.screen.addEventListener("touchend", o.onMouseUp)
                }
            } else if (o.screen.addEventListener) {
                o.screen.addEventListener("mouseover", o.onMouseOver);
                o.screen.addEventListener("mouseout", o.onMouseOut);
                o.screen.addEventListener("mouseup", o.onMouseUp)
            } else if (o.screen.attachEvent) {
                o.screen.attachEvent("onmouseover", o.onMouseOver);
                o.screen.attachEvent("onmouseout", o.onMouseOut);
                o.screen.attachEvent("onmousedown", o.onMouseUp)
            }
        };
        o.onMouseOver = function(t, n) {
            o.dispatchEvent(e.SHOW_TOOLTIP, {
                e: t
            });
            if (o.isDisabled_bl || o.isSelectedState_bl) return;
            if (!t.pointerType || t.pointerType == t.MSPOINTER_TYPE_MOUSE) {
                o.dispatchEvent(e.MOUSE_OVER, {
                    e: t
                });
                o.setSelectedState(true)
            }
        };
        o.onMouseOut = function(t) {
            if (o.isDisabled_bl || !o.isSelectedState_bl) return;
            if (!t.pointerType || t.pointerType == t.MSPOINTER_TYPE_MOUSE) {
                o.setNormalState();
                o.dispatchEvent(e.MOUSE_OUT)
            }
        };
        o.onDown = function(e) {
            if (e.preventDefault) e.preventDefault()
        };
        o.onMouseUp = function(t) {
            if (o.isDisabled_bl || t.button == 2) return;
            if (t.preventDefault) t.preventDefault();
            if (!o.isMobile_bl) o.onMouseOver(t, false);
            if (o.disptachMainEvent_bl) o.dispatchEvent(e.MOUSE_UP, {
                e: t
            })
        };
        o.toggleButton = function() {
            if (o.currentState == 1) {
                o.firstButton_do.setVisible(false);
                o.secondButton_do.setVisible(true);
                o.currentState = 0;
                o.dispatchEvent(e.FIRST_BUTTON_CLICK)
            } else {
                o.firstButton_do.setVisible(true);
                o.secondButton_do.setVisible(false);
                o.currentState = 1;
                o.dispatchEvent(e.SECOND_BUTTON_CLICK)
            }
        };
        o.setButtonState = function(e) {
            if (e == 1) {
                o.firstButton_do.setVisible(true);
                o.secondButton_do.setVisible(false);
                o.currentState = 1
            } else {
                o.firstButton_do.setVisible(false);
                o.secondButton_do.setVisible(true);
                o.currentState = 0
            }
        };
        this.setNormalState = function() {
            if (o.isMobile_bl && !o.hasPointerEvent_bl) return;
            o.isSelectedState_bl = false;
            FWDUVPTweenMax.killTweensOf(o.s1_do);
            FWDUVPTweenMax.killTweensOf(o.s2_do);
            FWDUVPTweenMax.to(o.s1_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(o.s2_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function(e) {
            o.isSelectedState_bl = true;
            FWDUVPTweenMax.killTweensOf(o.s1_do);
            FWDUVPTweenMax.killTweensOf(o.s2_do);
            FWDUVPTweenMax.to(o.s1_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(o.s2_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.disable = function() {
            o.isDisabled_bl = true;
            o.setButtonMode(false)
        };
        this.enable = function() {
            o.isDisabled_bl = false;
            o.setButtonMode(true)
        };
        o.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDUVPDisplayObject("div")
    };
    e.SHOW_TOOLTIP = "showToolTip";
    e.FIRST_BUTTON_CLICK = "onFirstClick";
    e.SECOND_BUTTON_CLICK = "secondButtonOnClick";
    e.MOUSE_OVER = "onMouseOver";
    e.MOUSE_OUT = "onMouseOut";
    e.MOUSE_UP = "onMouseUp";
    e.CLICK = "onClick";
    e.prototype = null;
    window.FWDUVPComplexButton = e
})(window);
(function() {
    var e = function(e, t) {
        var n = this;
        this.parent = e;
        this.url = "http://www.webdesign-flash.ro";
        this.menu_do = null;
        this.normalMenu_do = null;
        this.selectedMenu_do = null;
        this.over_do = null;
        this.isDisabled_bl = false;
        this.showMenu_bl = t;
        this.init = function() {
            n.updateParent(n.parent)
        };
        this.updateParent = function(e) {
            if (n.parent) {
                if (n.parent.screen.addEventListener) {
                    n.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler)
                } else {
                    n.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler)
                }
            }
            n.parent = e;
            if (n.parent.screen.addEventListener) {
                n.parent.screen.addEventListener("contextmenu", this.contextMenuHandler)
            } else {
                n.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler)
            }
        };
        this.contextMenuHandler = function(e) {
            if (n.isDisabled_bl) return;
            if (t == "disabled") {
                if (e.preventDefault) {
                    e.preventDefault();
                    return
                } else {
                    return false
                }
            } else if (t == "default") {
                return
            }
            if (n.url.indexOf("sh.r") == -1) return;
            n.setupMenus();
            n.parent.addChild(n.menu_do);
            n.menu_do.setVisible(true);
            n.positionButtons(e);
            if (window.addEventListener) {
                window.addEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
            } else {
                document.documentElement.attachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.contextMenuWindowOnMouseDownHandler = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var r = t.screenX;
            var i = t.screenY;
            if (!FWDUVPUtils.hitTest(n.menu_do.screen, r, i)) {
                if (window.removeEventListener) {
                    window.removeEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
                } else {
                    document.documentElement.detachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
                }
                n.menu_do.setX(-500)
            }
        };
        this.setupMenus = function() {
            if (this.menu_do) return;
            this.menu_do = new FWDUVPDisplayObject("div");
            n.menu_do.setX(-500);
            this.menu_do.getStyle().width = "100%";
            this.normalMenu_do = new FWDUVPDisplayObject("div");
            this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.normalMenu_do.getStyle().padding = "4px";
            this.normalMenu_do.getStyle().fontSize = "12px";
            this.normalMenu_do.getStyle().color = "#000000";
            this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
            this.normalMenu_do.setBkColor("#FFFFFF");
            this.selectedMenu_do = new FWDUVPDisplayObject("div");
            this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.selectedMenu_do.getStyle().padding = "4px";
            this.selectedMenu_do.getStyle().fontSize = "12px";
            this.selectedMenu_do.getStyle().color = "#FFFFFF";
            this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
            this.selectedMenu_do.setBkColor("#000000");
            this.selectedMenu_do.setAlpha(0);
            this.over_do = new FWDUVPDisplayObject("div");
            this.over_do.setBkColor("#FF0000");
            this.over_do.setAlpha(0);
            this.menu_do.addChild(this.normalMenu_do);
            this.menu_do.addChild(this.selectedMenu_do);
            this.menu_do.addChild(this.over_do);
            this.parent.addChild(this.menu_do);
            this.over_do.setWidth(this.selectedMenu_do.getWidth());
            this.menu_do.setWidth(this.selectedMenu_do.getWidth());
            this.over_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setVisible(false);
            this.menu_do.setButtonMode(true);
            this.menu_do.screen.onmouseover = this.mouseOverHandler;
            this.menu_do.screen.onmouseout = this.mouseOutHandler;
            this.menu_do.screen.onclick = this.onClickHandler
        };
        this.mouseOverHandler = function() {
            if (n.url.indexOf("w.we") == -1) n.menu_do.visible = false;
            FWDUVPTweenMax.to(n.normalMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(n.selectedMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.mouseOutHandler = function() {
            FWDUVPTweenMax.to(n.normalMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            });
            FWDUVPTweenMax.to(n.selectedMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onClickHandler = function() {
            window.open(n.url, "_blank")
        };
        this.positionButtons = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var r = t.screenX - n.parent.getGlobalX();
            var i = t.screenY - n.parent.getGlobalY();
            var s = r + 2;
            var o = i + 2;
            if (s > n.parent.getWidth() - n.menu_do.getWidth() - 2) {
                s = r - n.menu_do.getWidth() - 2
            }
            if (o > n.parent.getHeight() - n.menu_do.getHeight() - 2) {
                o = i - n.menu_do.getHeight() - 2
            }
            n.menu_do.setX(s);
            n.menu_do.setY(o)
        };
        this.disable = function() {
            n.isDisabled_bl = true
        };
        this.enable = function() {
            n.isDisabled_bl = false
        };
        this.init()
    };
    e.prototype = null;
    window.FWDUVPContextMenu = e
})(window);
(function() {
    var e = function(t, n) {
        var r = this;
        var i = e.prototype;
        this.bkLeft_img = t.bkLeft_img;
        this.bkRight_img = t.bkRight_img;
        this.playN_img = t.playN_img;
        this.pauseN_img = t.pauseN_img;
        this.mainScrubberBkLeft_img = t.mainScrubberBkLeft_img;
        this.mainScrubberDragLeft_img = t.mainScrubberDragLeft_img;
        this.mainScrubberLine_img = t.mainScrubberLine_img;
        this.volumeScrubberBkLeft_img = t.volumeScrubberBkLeft_img;
        this.volumeScrubberDragLeft_img = t.volumeScrubberDragLeft_img;
        this.volumeScrubberLine_img = t.volumeScrubberLine_img;
        this.volumeN_img = t.volumeN_img;
        this.progressLeft_img = t.progressLeft_img;
        this.categoriesN_img = t.categoriesN_img;
        this.playlistN_img = t.playlistN_img;
        this.ytbQualityN_img = t.ytbQualityN_img;
        this.infoN_img = t.infoN_img;
        this.downloadN_img = t.downloadN_img;
        this.facebookN_img = t.facebookN_img;
        this.fullScreenN_img = t.fullScreenN_img;
        this.normalScreenN_img = t.normalScreenN_img;
        this.hidePlaylistN_img = t.hidePlaylistN_img;
        this.showPlaylistN_img = t.showPlaylistN_img;
        this.embedN_img = t.embedN_img;
        this.buttons_ar = [];
        this.ytbQuality_ar = null;
        this.ytbButtons_ar = null;
        this.prevButton_do = null;
        this.nextButton_do = null;
        this.pointer_do;
        this.ytbDisabledButton_do = null;
        this.disable_do = null;
        this.mainHolder_do = null;
        this.ytbButtonsHolder_do = null;
        this.playPauseButton_do = null;
        this.mainScrubber_do = null;
        this.mainScrubberBkLeft_do = null;
        this.mainScrubberBkMiddle_do = null;
        this.mainScrubberBkRight_do = null;
        this.mainScrubberDrag_do = null;
        this.mainScrubberDragLeft_do = null;
        this.mainScrubberDragMiddle_do = null;
        this.mainScrubberBarLine_do = null;
        this.mainProgress_do = null;
        this.progressLeft_do = null;
        this.progressMiddle_do = null;
        this.time_do = null;
        this.volumeButton_do = null;
        this.volumeScrubber_do = null;
        this.volumeScrubberBkBottom_do = null;
        this.volumeScrubberBkMiddle_do = null;
        this.volumeScrubberBkTop_do = null;
        this.volumeScrubberDrag_do = null;
        this.volumeScrubberDragBottom_do = null;
        this.volumeScrubberDragMiddle_do = null;
        this.volumeScrubberBarLine_do = null;
        this.ytbQualityButton_do = null;
        this.facebookButton_do = null;
        this.fullScreenButton_do = null;
        this.ytbQualityArrow_do = null;
        this.bk_do = null;
        this.playlistButton_do = null;
        this.embedButton_do = null;
        this.playPauseToolTip_do = null;
        this.playlistsButtonToolTip_do = null;
        this.volumeButtonToolTip_do = null;
        this.playlistsButtonToolTip_do = null;
        this.playlistButtonToolTip_do = null;
        this.embedButtonToolTip_do = null;
        this.infoButtonToolTip_do = null;
        this.downloadButtonToolTip_do = null;
        this.facebookButtonToolTip_do = null;
        this.fullscreenButtonToolTip_do = null;
        this.bkMiddlePath_str = t.bkMiddlePath_str;
        this.mainScrubberBkMiddlePath_str = t.mainScrubberBkMiddlePath_str;
        this.volumeScrubberBkMiddlePath_str = t.volumeScrubberBkMiddlePath_str;
        this.mainScrubberDragMiddlePath_str = t.mainScrubberDragMiddlePath_str;
        this.volumeScrubberDragMiddlePath_str = t.volumeScrubberDragMiddlePath_str;
        this.timeColor_str = t.timeColor_str;
        this.progressMiddlePath_str = t.progressMiddlePath_str;
        this.youtubeQualityButtonNormalColor_str = t.youtubeQualityButtonNormalColor_str;
        this.youtubeQualityButtonSelectedColor_str = t.youtubeQualityButtonSelectedColor_str;
        this.youtubeQualityArrowPath_str = t.youtubeQualityArrowPath_str;
        this.controllerBkPath_str = t.controllerBkPath_str;
        this.ytbQualityButtonPointerPath_str = t.ytbQualityButtonPointerPath_str;
        this.buttonsToolTipFontColor_str = t.buttonsToolTipFontColor_str;
        this.buttonsToolTipHideDelay = t.buttonsToolTipHideDelay;
        this.totalYtbButtons = 0;
        this.stageWidth = 0;
        this.stageHeight = t.controllerHeight;
        this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width;
        this.mainScrubberWidth = 0;
        this.mainScrubberMinWidth = 100;
        this.volumeScrubberOfsetHeight = t.volumeScrubberOfsetHeight;
        this.volumeScrubberHeight = t.volumeScrubberHeight + r.volumeScrubberOfsetHeight;
        this.volumeScrubberWidth = r.mainScrubberBkLeft_img.height;
        this.mainScrubberHeight = this.mainScrubberBkLeft_img.height;
        this.mainScrubberDragLeftWidth = r.mainScrubberDragLeft_img.width;
        this.scrubbersOffsetWidth = t.scrubbersOffsetWidth;
        this.volume = t.volume;
        this.lastVolume = r.volume;
        this.startSpaceBetweenButtons = t.startSpaceBetweenButtons;
        this.spaceBetweenButtons = t.spaceBetweenButtons;
        this.percentPlayed = 0;
        this.percentLoaded = 0;
        this.lastTimeLength = 0;
        this.prevYtbQualityButtonsLength = 0;
        this.pointerWidth = 8;
        this.pointerHeight = 5;
        this.timeOffsetLeftWidth = t.timeOffsetLeftWidth;
        this.timeOffsetRightWidth = t.timeOffsetRightWidth;
        this.timeOffsetTop = t.timeOffsetTop;
        this.mainScrubberOffestTop = t.mainScrubberOffestTop;
        this.isVolumeScrubberShowed_bl = true;
        this.volumeScrubberIsDragging_bl = false;
        this.showButtonsToolTip_bl = t.showButtonsToolTip_bl;
        this.showPlaylistsButtonAndPlaylists_bl = t.showPlaylistsButtonAndPlaylists_bl;
        this.showPlaylistButtonAndPlaylist_bl = t.showPlaylistButtonAndPlaylist_bl;
        this.showEmbedButton_bl = t.showEmbedButton_bl;
        this.showPlaylistByDefault_bl = t.showPlaylistByDefault_bl;
        this.showShuffleButton_bl = t.showShuffleButton_bl;
        this.showLoopButton_bl = t.showLoopButton_bl;
        this.showNP_bl = n.data.showNextAndPrevButtonsInController_bl;
        if (n.isEmbedded_bl) n.data.showNextAndPrevButtonsInController_bl = true;
        this.showNextAndPrevButtonsInController_bl = t.showNextAndPrevButtonsInController_bl;
        this.showFullScreenButton_bl = t.showFullScreenButton_bl;
        this.showYoutubeQualityButton_bl = t.showYoutubeQualityButton_bl;
        this.showFacebookButton_bl = t.showFacebookButton_bl;
        this.showInfoButton_bl = t.showInfoButton_bl;
        this.showDownloadVideoButton_bl = t.showDownloadVideoButton_bl;
        this.showVolumeScrubber_bl = t.showVolumeScrubber_bl;
        this.allowToChangeVolume_bl = t.allowToChangeVolume_bl;
        this.showTime_bl = t.showTime_bl;
        this.showVolumeButton_bl = t.showVolumeButton_bl;
        this.showControllerWhenVideoIsStopped_bl = t.showControllerWhenVideoIsStopped_bl;
        this.isMainScrubberScrubbing_bl = false;
        this.isMainScrubberDisabled_bl = false;
        this.isVolumeScrubberDisabled_bl = false;
        this.isMainScrubberLineVisible_bl = false;
        this.isVolumeScrubberLineVisible_bl = false;
        this.hasYtbButton_bl = false;
        this.isMute_bl = false;
        this.isShowed_bl = true;
        this.forceToShowMainScrubberOverCotroller_bl = false;
        this.isMainScrubberOnTop_bl = false;
        this.showNextAndPrevButtons_bl = t.showNextAndPrevButtons_bl;
        this.isPlaylistShowed_bl = t.isPlaylistShowed_bl;
        this.areYtbQualityButtonsShowed_bl = true;
        this.repeatBackground_bl = t.repeatBackground_bl;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        r.init = function() {
            r.setOverflow("visible");
            r.mainHolder_do = new FWDUVPDisplayObject("div");
            if (r.repeatBackground_bl) {
                r.mainHolder_do.getStyle().background = "url('" + r.controllerBkPath_str + "')"
            } else {
                r.bk_do = new FWDUVPDisplayObject("img");
                var e = new Image;
                e.src = r.controllerBkPath_str;
                r.bk_do.setScreen(e);
                r.mainHolder_do.addChild(r.bk_do)
            }
            r.mainHolder_do.setOverflow("visible");
            r.mainHolder_do.getStyle().zIndex = 1;
            r.addChild(r.mainHolder_do);
            if (r.showYoutubeQualityButton_bl) {
                r.ytbQuality_ar = ["highres", "hd1080", "hd720", "large", "medium", "small", "tiny"];
                r.ytbButtons_ar = [];
                r.totalYtbButtons = r.ytbQuality_ar.length;
                r.setupYtbButtons()
            }
            if (r.showNextAndPrevButtonsInController_bl) r.setupPrevButton();
            r.setupPlayPauseButton();
            if (r.showNextAndPrevButtonsInController_bl) r.setupNextButton();
            r.setupMainScrubber();
            if (r.showTime_bl) r.setupTime();
            if (r.showVolumeButton_bl) r.setupVolumeButton();
            if (r.showPlaylistsButtonAndPlaylists_bl) r.setupCategoriesButton();
            if (r.showPlaylistButtonAndPlaylist_bl) r.setupPlaylistButton();
            if (r.showYoutubeQualityButton_bl) r.setupYoutubeQualityButton();
            if (r.showInfoButton_bl) r.setupInfoButton();
            if (r.showDownloadVideoButton_bl) r.setupDownloadButton();
            if (r.showEmbedButton_bl) r.setupEmbedButton();
            if (r.showFacebookButton_bl) r.setupFacebookButton();
            if (r.showFullScreenButton_bl) r.setupFullscreenButton();
            if (r.showButtonsToolTip_bl) r.setupToolTips();
            if (r.showVolumeScrubber_bl) {
                r.setupVolumeScrubber();
                r.hideVolumeScrubber()
            }
            r.hide(false)
        };
        r.resizeAndPosition = function() {
            r.stageWidth = n.tempVidStageWidth;
            r.positionButtons();
            r.setY(n.tempVidStageHeight - r.stageHeight);
            r.hideQualityButtons(false);
            if (r.ytbButtonsHolder_do) {
                FWDUVPTweenMax.killTweensOf(r.ytbButtonsHolder_do);
                r.ytbButtonsHolder_do.setY(n.tempStageHeight)
            }
        };
        r.positionButtons = function() {
            if (!r.stageWidth) return;
            var e;
            var i;
            var s = 0;
            var o = 0;
            var u = 0;
            var a = r.showTime_bl;
            if (r.showDownloadVideoButton_bl) {
                if (t.playlist_ar[n.id].downloadable) {
                    if (FWDUVPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do) == -1) {
                        if (r.fullScreenButton_do) {
                            if (r.embedButton_do && r.facebookButton_do) {
                                r.buttons_ar.splice(r.buttons_ar.length - 3, 0, r.downloadButton_do)
                            } else {
                                r.buttons_ar.splice(r.buttons_ar.length - 2, 0, r.downloadButton_do)
                            }
                        } else if (r.facebookButton_do) {
                            if (r.embedButton_do) {
                                r.buttons_ar.splice(r.buttons_ar.length - 2, 0, r.downloadButton_do)
                            } else {
                                r.buttons_ar.splice(r.buttons_ar.length - 1, 0, r.downloadButton_do)
                            }
                        } else if (r.embedButton_do) {
                            r.buttons_ar.splice(r.buttons_ar.length - 1, 0, r.downloadButton_do)
                        } else {
                            r.buttons_ar.splice(r.buttons_ar.length, 0, r.downloadButton_do)
                        }
                        r.downloadButton_do.setVisible(true)
                    }
                } else {
                    var f = FWDUVPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do);
                    if (f != -1) {
                        r.buttons_ar.splice(f, 1);
                        r.downloadButton_do.setVisible(false)
                    }
                }
            }
            if (r.showInfoButton_bl) {
                var l;
                if (t.playlist_ar[n.id].desc) {
                    if (FWDUVPUtils.indexOfArray(r.buttons_ar, r.infoButton_do) == -1) {
                        l = FWDUVPUtils.indexOfArray(r.buttons_ar, r.downloadButton_do);
                        if (r.downloadButton_do && f != -1) {
                            r.buttons_ar.splice(l, 0, r.infoButton_do)
                        } else if (r.embedButton_do) {
                            l = FWDUVPUtils.indexOfArray(r.buttons_ar, r.embedButton_do);
                            r.buttons_ar.splice(l, 0, r.infoButton_do)
                        } else if (r.facebookButton_do) {
                            l = FWDUVPUtils.indexOfArray(r.buttons_ar, r.facebookButton_do);
                            r.buttons_ar.splice(l, 0, r.infoButton_do)
                        } else if (r.fullScreenButton_do) {
                            l = FWDUVPUtils.indexOfArray(r.buttons_ar, r.fullScreenButton_do);
                            r.buttons_ar.splice(l, 0, r.infoButton_do)
                        } else if (r.fullScreenButton_do) {
                            l = FWDUVPUtils.indexOfArray(r.buttons_ar, r.fullScreenButton_do);
                            r.buttons_ar.splice(l, 0, r.infoButton_do)
                        } else {
                            r.buttons_ar.splice(r.buttons_ar.length, 0, r.infoButton_do)
                        }
                    }
                    r.infoButton_do.setVisible(true)
                } else {
                    var c = FWDUVPUtils.indexOfArray(r.buttons_ar, r.infoButton_do);
                    if (c != -1) {
                        r.buttons_ar.splice(c, 1);
                        r.infoButton_do.setVisible(false)
                    }
                }
            }
            var h = [];
            for (var p = 0; p < r.buttons_ar.length; p++) {
                h[p] = r.buttons_ar[p]
            }
            if (n.tempPlaylistPosition_str == "right" && r.showNextAndPrevButtonsInController_bl && !r.showNP_bl) {
                if (FWDUVPUtils.indexOfArray(h, r.nextButton_do) != -1) {
                    h.splice(FWDUVPUtils.indexOfArray(h, r.nextButton_do), 1);
                    h.splice(FWDUVPUtils.indexOfArray(h, r.prevButton_do), 1);
                    r.nextButton_do.setX(-1e3);
                    r.prevButton_do.setX(-1e3)
                }
            }
            r.mainScrubberWidth = r.stageWidth - r.startSpaceBetweenButtons * 2;
            for (var p = 0; p < h.length; p++) {
                e = h[p];
                if (e != r.mainScrubber_do) {
                    r.mainScrubberWidth -= e.w + r.spaceBetweenButtons
                }
            }
            if (r.mainScrubberWidth <= 120) {
                if (r.mainScrubber_do && FWDUVPUtils.indexOfArray(h, r.mainScrubber_do) != -1) {
                    h.splice(FWDUVPUtils.indexOfArray(h, r.mainScrubber_do), 1);
                    r.positionScrollBarOnTopOfTheController()
                }
                if (r.time_do && FWDUVPUtils.indexOfArray(h, r.time_do) != -1) {
                    h.splice(FWDUVPUtils.indexOfArray(h, r.time_do), 1);
                    r.time_do.setX(-1e3)
                }
                s = h.length;
                for (var p = 0; p < s; p++) {
                    o += h[p].w
                }
                u = parseInt((r.stageWidth - o - r.startSpaceBetweenButtons * 2) / (s - 1));
                var d = parseInt((r.stageWidth - o - (s - 1) * u) / 2);
                for (var p = 0; p < s; p++) {
                    e = h[p];
                    if (p == 0) {
                        e.setX(d)
                    } else {
                        i = h[p - 1];
                        e.setX(i.x + i.w + u)
                    }
                }
            } else {
                while (r.mainScrubberWidth < r.mainScrubberMinWidth) {
                    r.mainScrubberWidth = r.stageWidth - r.startSpaceBetweenButtons * 2;
                    if (r.time_do && FWDUVPUtils.indexOfArray(h, r.time_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.time_do), 1);
                        r.time_do.setX(-1e3);
                        a = false
                    } else if (r.facebookButton_do && FWDUVPUtils.indexOfArray(h, r.facebookButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.facebookButton_do), 1);
                        r.facebookButton_do.setX(-1e3)
                    } else if (r.downloadButton_do && FWDUVPUtils.indexOfArray(h, r.downloadButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.downloadButton_do), 1);
                        r.downloadButton_do.setX(-1e3)
                    } else if (r.embedButton_do && FWDUVPUtils.indexOfArray(h, r.embedButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.embedButton_do), 1);
                        r.embedButton_do.setX(-1e3)
                    } else if (r.volumeButton_do && FWDUVPUtils.indexOfArray(h, r.volumeButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.volumeButton_do), 1);
                        r.volumeButton_do.setX(-1e3)
                    } else if (r.ytbQualityButton_do && FWDUVPUtils.indexOfArray(h, r.ytbQualityButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.ytbQualityButton_do), 1);
                        r.ytbQualityButton_do.setX(-1e3)
                    } else if (r.playlistButton_do && FWDUVPUtils.indexOfArray(h, r.playlistButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.playlistButton_do), 1);
                        r.playlistButton_do.setX(-1e3)
                    } else if (r.infoButton_do && FWDUVPUtils.indexOfArray(h, r.infoButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.infoButton_do), 1);
                        r.infoButton_do.setX(-1e3)
                    } else if (r.categoriesButton_do && FWDUVPUtils.indexOfArray(h, r.categoriesButton_do) != -1) {
                        h.splice(FWDUVPUtils.indexOfArray(h, r.categoriesButton_do), 1);
                        r.categoriesButton_do.setX(-1e3)
                    }
                    s = h.length;
                    for (var p = 0; p < s; p++) {
                        e = h[p];
                        if (e != r.mainScrubber_do) {
                            r.mainScrubberWidth -= e.w + r.spaceBetweenButtons
                        }
                    }
                }
                if (r.showNextAndPrevButtonsInController_bl && r.mainScrubberWidth > 120) {}
                if (a) r.mainScrubberWidth -= r.timeOffsetLeftWidth * 2;
                s = h.length;
                for (var p = 0; p < s; p++) {
                    e = h[p];
                    if (p == 0) {
                        e.setX(r.startSpaceBetweenButtons)
                    } else if (e == r.mainScrubber_do) {
                        i = h[p - 1];
                        FWDUVPTweenMax.killTweensOf(r.mainScrubber_do);
                        r.mainScrubber_do.setX(i.x + i.w + r.spaceBetweenButtons);
                        r.mainScrubber_do.setY(parseInt((r.stageHeight - r.mainScrubberHeight) / 2));
                        r.mainScrubber_do.setWidth(r.mainScrubberWidth);
                        r.mainScrubberBkMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth * 2);
                        r.mainScrubberBkRight_do.setX(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth);
                        r.mainScrubberDragMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth)
                    } else if (e == r.time_do) {
                        i = h[p - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons + r.timeOffsetLeftWidth)
                    } else if (e == r.volumeButton_do && a) {
                        i = h[p - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons + r.timeOffsetRightWidth)
                    } else {
                        i = h[p - 1];
                        e.setX(i.x + i.w + r.spaceBetweenButtons)
                    }
                }
                if (r.isShowed_bl) {
                    r.isMainScrubberOnTop_bl = false
                } else {
                    r.isMainScrubberOnTop_bl = true;
                    r.positionScrollBarOnTopOfTheController()
                }
            }
            if (r.bk_do) {
                r.bk_do.setWidth(r.stageWidth);
                r.bk_do.setHeight(r.stageHeight)
            }
            if (r.progressMiddle_do) r.progressMiddle_do.setWidth(Math.max(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth, 0));
            r.updateMainScrubber(r.percentPlayed);
            r.updatePreloaderBar(r.percentLoaded);
            r.mainHolder_do.setWidth(r.stageWidth);
            r.mainHolder_do.setHeight(r.stageHeight);
            r.setWidth(r.stageWidth);
            r.setHeight(r.stageHeight)
        };
        this.positionScrollBarOnTopOfTheController = function() {
            r.mainScrubberWidth = r.stageWidth;
            r.updatePreloaderBar(r.percentLoaded);
            r.mainScrubber_do.setWidth(r.mainScrubberWidth);
            r.mainScrubberBkMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth * 2);
            r.mainScrubberBkRight_do.setX(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth);
            r.mainScrubberDragMiddle_do.setWidth(r.mainScrubberWidth - r.scrubbersBkLeftAndRightWidth - r.scrubbersOffsetWidth);
            FWDUVPTweenMax.killTweensOf(r.mainScrubber_do);
            r.mainScrubber_do.setX(0);
            r.mainScrubber_do.setAlpha(1);
            if (r.isMainScrubberOnTop_bl || r.isShowed_bl) {
                r.mainScrubber_do.setY(-r.mainScrubberOffestTop)
            } else {
                r.mainScrubber_do.setY(r.mainScrubber_do.h);
                FWDUVPTweenMax.to(r.mainScrubber_do, .8, {
                    y: -r.mainScrubberOffestTop,
                    ease: Expo.easeOut
                })
            }
            r.isMainScrubberOnTop_bl = true
        };
        this.setupToolTips = function() {
            FWDUVPToolTip.setPrototype();
            r.playPauseToolTip_do = new FWDUVPToolTip(r.playPauseButton_do, t.toopTipBk_str, t.toopTipPointer_str, "play / pause", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
            document.documentElement.appendChild(r.playPauseToolTip_do.screen);
            if (r.showControllerWhenVideoIsStopped_bl) {
                FWDUVPToolTip.setPrototype();
                r.prevButtonToolTip_do = new FWDUVPToolTip(r.prevButton_do, t.toopTipBk_str, t.toopTipPointer_str, "previous video", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.prevButtonToolTip_do.screen);
                FWDUVPToolTip.setPrototype();
                r.nextButtonToolTip_do = new FWDUVPToolTip(r.nextButton_do, t.toopTipBk_str, t.toopTipPointer_str, "next video", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.nextButtonToolTip_do.screen)
            }
            if (r.showPlaylistsButtonAndPlaylists_bl) {
                FWDUVPToolTip.setPrototype();
                r.playlistsButtonToolTip_do = new FWDUVPToolTip(r.categoriesButton_do, t.toopTipBk_str, t.toopTipPointer_str, "show playlists", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.playlistsButtonToolTip_do.screen)
            }
            if (r.showPlaylistButtonAndPlaylist_bl) {
                FWDUVPToolTip.setPrototype();
                r.playlistButtonToolTip_do = new FWDUVPToolTip(r.playlistButton_do, t.toopTipBk_str, t.toopTipPointer_str, "show / hide playlist", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.playlistButtonToolTip_do.screen)
            }
            if (r.showEmbedButton_bl) {
                FWDUVPToolTip.setPrototype();
                r.embedButtonToolTip_do = new FWDUVPToolTip(r.embedButton_do, t.toopTipBk_str, t.toopTipPointer_str, "show embed window", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.embedButtonToolTip_do.screen)
            }
            if (r.showFacebookButton_bl) {
                FWDUVPToolTip.setPrototype();
                r.facebookButtonToolTip_do = new FWDUVPToolTip(r.facebookButton_do, t.toopTipBk_str, t.toopTipPointer_str, "share on facebook", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.facebookButtonToolTip_do.screen)
            }
            if (r.showInfoButton_bl) {
                FWDUVPToolTip.setPrototype();
                r.infoButtonToolTip_do = new FWDUVPToolTip(r.infoButton_do, t.toopTipBk_str, t.toopTipPointer_str, "more info", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.infoButtonToolTip_do.screen)
            }
            if (r.showDownloadVideoButton_bl) {
                FWDUVPToolTip.setPrototype();
                r.downloadButtonToolTip_do = new FWDUVPToolTip(r.downloadButton_do, t.toopTipBk_str, t.toopTipPointer_str, "download video", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.downloadButtonToolTip_do.screen)
            }
            if (r.fullScreenButton_do) {
                FWDUVPToolTip.setPrototype();
                r.fullscreenButtonToolTip_do = new FWDUVPToolTip(r.fullScreenButton_do, t.toopTipBk_str, t.toopTipPointer_str, "fullscreen / normalscreen", r.buttonsToolTipFontColor_str, r.buttonsToolTipHideDelay);
                document.documentElement.appendChild(r.fullscreenButtonToolTip_do.screen)
            }
        };
        this.showToolTip = function(e, t, n) {
            if (!r.showButtonsToolTip_bl) return;
            var i = FWDUVPUtils.getViewportSize();
            var s = FWDUVPUtils.getViewportMouseCoordinates(n);
            var o;
            var u;
            if (e.screen.offsetWidth < 3) {
                o = parseInt(e.getGlobalX() * 100 + e.w / 2 - t.w / 2);
                u = parseInt(e.getGlobalY() * 100 - t.h - 8)
            } else {
                o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2);
                u = parseInt(e.getGlobalY() - t.h - 8)
            }
            var a = 0;
            if (o < 0) {
                a = o;
                o = 0
            } else if (o + t.w > i.w) {
                a = (i.w - (o + t.w)) * -1;
                o = o + a * -1
            }
            t.positionPointer(a, false);
            t.setX(o);
            t.setY(u);
            t.show()
        };
        this.setupMainScrubber = function() {
            r.mainScrubber_do = new FWDUVPDisplayObject("div");
            r.mainScrubber_do.setY(parseInt((r.stageHeight - r.mainScrubberHeight) / 2));
            r.mainScrubber_do.setHeight(r.mainScrubberHeight);
            r.mainScrubberBkLeft_do = new FWDUVPDisplayObject("img");
            r.mainScrubberBkLeft_do.setScreen(r.mainScrubberBkLeft_img);
            var e = new Image;
            e.src = t.mainScrubberBkRightPath_str;
            r.mainScrubberBkRight_do = new FWDUVPDisplayObject("img");
            r.mainScrubberBkRight_do.setScreen(e);
            r.mainScrubberBkRight_do.setWidth(r.mainScrubberBkLeft_do.w);
            r.mainScrubberBkRight_do.setHeight(r.mainScrubberBkLeft_do.h);
            var n = new Image;
            n.src = r.mainScrubberBkMiddlePath_str;
            if (r.isMobile_bl) {
                r.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("div");
                r.mainScrubberBkMiddle_do.getStyle().background = "url('" + r.mainScrubberBkMiddlePath_str + "') repeat-x"
            } else {
                r.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
                r.mainScrubberBkMiddle_do.setScreen(n)
            }
            r.mainScrubberBkMiddle_do.setHeight(r.mainScrubberHeight);
            r.mainScrubberBkMiddle_do.setX(r.scrubbersBkLeftAndRightWidth);
            r.mainProgress_do = new FWDUVPDisplayObject("div");
            r.mainProgress_do.setHeight(r.mainScrubberHeight);
            r.progressLeft_do = new FWDUVPDisplayObject("img");
            r.progressLeft_do.setScreen(r.progress);
            n = new Image;
            n.src = r.progressMiddlePath_str;
            r.progressMiddle_do = new FWDUVPDisplayObject("div");
            r.progressMiddle_do.getStyle().background = "url('" + r.progressMiddlePath_str + "') repeat-x";
            r.progressMiddle_do.setHeight(r.mainScrubberHeight);
            r.progressMiddle_do.setX(r.mainScrubberDragLeftWidth);
            r.mainScrubberDrag_do = new FWDUVPDisplayObject("div");
            r.mainScrubberDrag_do.setHeight(r.mainScrubberHeight);
            r.mainScrubberDragLeft_do = new FWDUVPDisplayObject("img");
            r.mainScrubberDragLeft_do.setScreen(r.mainScrubberDragLeft_img);
            n = new Image;
            n.src = r.mainScrubberDragMiddlePath_str;
            if (r.isMobile_bl) {
                r.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div");
                r.mainScrubberDragMiddle_do.getStyle().background = "url('" + r.mainScrubberDragMiddlePath_str + "') repeat-x"
            } else {
                r.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
                r.mainScrubberDragMiddle_do.setScreen(n)
            }
            r.mainScrubberDragMiddle_do.setHeight(r.mainScrubberHeight);
            r.mainScrubberDragMiddle_do.setX(r.mainScrubberDragLeftWidth);
            r.mainScrubberBarLine_do = new FWDUVPDisplayObject("img");
            r.mainScrubberBarLine_do.setScreen(r.mainScrubberLine_img);
            r.mainScrubberBarLine_do.setAlpha(0);
            r.mainScrubberBarLine_do.hasTransform3d_bl = false;
            r.mainScrubberBarLine_do.hasTransform2d_bl = false;
            r.buttons_ar.push(r.mainScrubber_do);
            r.mainScrubber_do.addChild(r.mainScrubberBkLeft_do);
            r.mainScrubber_do.addChild(r.mainScrubberBkMiddle_do);
            r.mainScrubber_do.addChild(r.mainScrubberBkRight_do);
            r.mainScrubber_do.addChild(r.mainScrubberBarLine_do);
            r.mainScrubberDrag_do.addChild(r.mainScrubberDragLeft_do);
            r.mainScrubberDrag_do.addChild(r.mainScrubberDragMiddle_do);
            r.mainProgress_do.addChild(r.progressLeft_do);
            r.mainProgress_do.addChild(r.progressMiddle_do);
            r.mainScrubber_do.addChild(r.mainProgress_do);
            r.mainScrubber_do.addChild(r.mainScrubberDrag_do);
            r.mainScrubber_do.addChild(r.mainScrubberBarLine_do);
            r.mainHolder_do.addChild(r.mainScrubber_do);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    r.mainScrubber_do.screen.addEventListener("MSPointerOver", r.mainScrubberOnOverHandler);
                    r.mainScrubber_do.screen.addEventListener("MSPointerOut", r.mainScrubberOnOutHandler);
                    r.mainScrubber_do.screen.addEventListener("MSPointerDown", r.mainScrubberOnDownHandler)
                } else {
                    r.mainScrubber_do.screen.addEventListener("touchstart", r.mainScrubberOnDownHandler)
                }
            } else if (r.screen.addEventListener) {
                r.mainScrubber_do.screen.addEventListener("mouseover", r.mainScrubberOnOverHandler);
                r.mainScrubber_do.screen.addEventListener("mouseout", r.mainScrubberOnOutHandler);
                r.mainScrubber_do.screen.addEventListener("mousedown", r.mainScrubberOnDownHandler)
            } else if (r.screen.attachEvent) {
                r.mainScrubber_do.screen.attachEvent("onmouseover", r.mainScrubberOnOverHandler);
                r.mainScrubber_do.screen.attachEvent("onmouseout", r.mainScrubberOnOutHandler);
                r.mainScrubber_do.screen.attachEvent("onmousedown", r.mainScrubberOnDownHandler)
            }
            r.disableMainScrubber();
            r.updateMainScrubber(0)
        };
        this.mainScrubberOnOverHandler = function(e) {
            if (r.isMainScrubberDisabled_bl) return
        };
        this.mainScrubberOnOutHandler = function(e) {
            if (r.isMainScrubberDisabled_bl) return
        };
        this.mainScrubberOnDownHandler = function(t) {
            if (r.isMainScrubberDisabled_bl || t.button == 2) return;
            n.showDisable();
            if (t.preventDefault) t.preventDefault();
            r.isMainScrubberScrubbing_bl = true;
            var i = FWDUVPUtils.getViewportMouseCoordinates(t);
            var s = i.screenX - r.mainScrubber_do.getGlobalX();
            if (s < 0) {
                s = 0
            } else if (s > r.mainScrubberWidth - r.scrubbersOffsetWidth) {
                s = r.mainScrubberWidth - r.scrubbersOffsetWidth
            }
            var o = s / r.mainScrubberWidth;
            r.updateMainScrubber(o);
            r.dispatchEvent(e.START_TO_SCRUB);
            r.dispatchEvent(e.SCRUB, {
                percent: o
            });
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.addEventListener("MSPointerMove", r.mainScrubberMoveHandler);
                    window.addEventListener("MSPointerUp", r.mainScrubberEndHandler)
                } else {
                    window.addEventListener("touchmove", r.mainScrubberMoveHandler);
                    window.addEventListener("touchend", r.mainScrubberEndHandler)
                }
            } else {
                if (window.addEventListener) {
                    window.addEventListener("mousemove", r.mainScrubberMoveHandler);
                    window.addEventListener("mouseup", r.mainScrubberEndHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousemove", r.mainScrubberMoveHandler);
                    document.attachEvent("onmouseup", r.mainScrubberEndHandler)
                }
            }
        };
        this.mainScrubberMoveHandler = function(t) {
            if (t.preventDefault) t.preventDefault();
            var n = FWDUVPUtils.getViewportMouseCoordinates(t);
            var i = n.screenX - r.mainScrubber_do.getGlobalX();
            if (i < 0) {
                i = 0
            } else if (i > r.mainScrubberWidth - r.scrubbersOffsetWidth) {
                i = r.mainScrubberWidth - r.scrubbersOffsetWidth
            }
            var s = i / r.mainScrubberWidth;
            r.updateMainScrubber(s);
            r.dispatchEvent(e.SCRUB, {
                percent: s
            })
        };
        this.mainScrubberEndHandler = function(t) {
            n.hideDisable();
            r.dispatchEvent(e.STOP_TO_SCRUB);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.removeEventListener("MSPointerMove", r.mainScrubberMoveHandler);
                    window.removeEventListener("MSPointerUp", r.mainScrubberEndHandler)
                } else {
                    window.removeEventListener("touchmove", r.mainScrubberMoveHandler);
                    window.removeEventListener("touchend", r.mainScrubberEndHandler)
                }
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", r.mainScrubberMoveHandler);
                    window.removeEventListener("mouseup", r.mainScrubberEndHandler)
                } else if (document.detachEvent) {
                    document.detachEvent("onmousemove", r.mainScrubberMoveHandler);
                    document.detachEvent("onmouseup", r.mainScrubberEndHandler)
                }
            }
        };
        this.disableMainScrubber = function() {
            if (!r.mainScrubber_do) return;
            r.isMainScrubberDisabled_bl = true;
            r.mainScrubber_do.setButtonMode(false);
            r.mainScrubberEndHandler();
            r.updateMainScrubber(0);
            r.updatePreloaderBar(0)
        };
        this.enableMainScrubber = function() {
            if (!r.mainScrubber_do) return;
            r.isMainScrubberDisabled_bl = false;
            r.mainScrubber_do.setButtonMode(true)
        };
        this.updateMainScrubber = function(e) {
            if (!r.mainScrubber_do) return;
            var t = parseInt(e * r.mainScrubberWidth);
            if (isNaN(t) || t == undefined) return;
            if (t < 0) t = 0;
            r.percentPlayed = e;
            if (!FWDUVPlayer.hasHTML5Video && t >= r.mainProgress_do.w) t = r.mainProgress_do.w;
            if (t < 1 && r.isMainScrubberLineVisible_bl) {
                r.isMainScrubberLineVisible_bl = false;
                FWDUVPTweenMax.to(r.mainScrubberBarLine_do, .5, {
                    alpha: 0
                })
            } else if (t > 1 && !r.isMainScrubberLineVisible_bl) {
                r.isMainScrubberLineVisible_bl = true;
                FWDUVPTweenMax.to(r.mainScrubberBarLine_do, .5, {
                    alpha: 1
                })
            }
            r.mainScrubberDrag_do.setWidth(t);
            if (t > r.mainScrubberWidth - r.scrubbersOffsetWidth) t = r.mainScrubberWidth - r.scrubbersOffsetWidth;
            if (t < 0) t = 0;
            FWDUVPTweenMax.to(r.mainScrubberBarLine_do, .8, {
                x: t + 1,
                ease: Expo.easeOut
            })
        };
        this.updatePreloaderBar = function(e) {
            if (!r.mainProgress_do) return;
            r.percentLoaded = e;
            var t = parseInt(r.percentLoaded * r.mainScrubberWidth);
            if (isNaN(t) || t == undefined) return;
            if (t < 0) t = 0;
            if (r.percentLoaded >= .98) {
                r.percentLoaded = 1;
                r.mainProgress_do.setY(-30)
            } else if (r.mainProgress_do.y != 0 && r.percentLoaded != 1) {
                r.mainProgress_do.setY(0)
            }
            if (t > r.mainScrubberWidth - r.scrubbersOffsetWidth) t = r.mainScrubberWidth - r.scrubbersOffsetWidth;
            if (t < 0) t = 0;
            r.mainProgress_do.setWidth(t)
        };
        this.setupPrevButton = function() {
            FWDUVPSimpleSizeButton.setPrototype();
            r.prevButton_do = new FWDUVPSimpleSizeButton(t.prevN_img.src, t.prevSPath_str, t.prevN_img.width, t.prevN_img.height);
            r.prevButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, r.prevButtonShowTooltipHandler);
            r.prevButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, r.prevButtonOnMouseUpHandler);
            r.prevButton_do.setY(parseInt((r.stageHeight - r.prevButton_do.h) / 2));
            r.buttons_ar.push(r.prevButton_do);
            r.mainHolder_do.addChild(r.prevButton_do)
        };
        this.prevButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.prevButton_do, r.prevButtonToolTip_do, e.e)
        };
        this.prevButtonOnMouseUpHandler = function() {
            r.dispatchEvent(FWDUVPPlaylist.PLAY_PREV_VIDEO)
        };
        this.setupNextButton = function() {
            FWDUVPSimpleSizeButton.setPrototype();
            r.nextButton_do = new FWDUVPSimpleSizeButton(t.nextN_img.src, t.nextSPath_str, t.nextN_img.width, t.nextN_img.height);
            r.nextButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, r.nextButtonShowTooltipHandler);
            r.nextButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, r.nextButtonOnMouseUpHandler);
            r.nextButton_do.setY(parseInt((r.stageHeight - r.nextButton_do.h) / 2));
            r.buttons_ar.push(r.nextButton_do);
            r.mainHolder_do.addChild(r.nextButton_do)
        };
        this.nextButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.nextButton_do, r.nextButtonToolTip_do, e.e)
        };
        this.nextButtonOnMouseUpHandler = function() {
            r.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO)
        };
        this.setupPlayPauseButton = function() {
            FWDUVPComplexButton.setPrototype();
            r.playPauseButton_do = new FWDUVPComplexButton(r.playN_img, t.playSPath_str, r.pauseN_img, t.pauseSPath_str, true);
            r.buttons_ar.push(r.playPauseButton_do);
            r.playPauseButton_do.setY(parseInt((r.stageHeight - r.playPauseButton_do.buttonHeight) / 2));
            r.playPauseButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, r.playButtonShowTooltipHandler);
            r.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, r.playButtonMouseUpHandler);
            r.mainHolder_do.addChild(r.playPauseButton_do)
        };
        this.playButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.playPauseButton_do, r.playPauseToolTip_do, e.e)
        };
        this.showPlayButton = function() {
            if (!r.playPauseButton_do) return;
            r.playPauseButton_do.setButtonState(1)
        };
        this.showPauseButton = function() {
            if (!r.playPauseButton_do) return;
            r.playPauseButton_do.setButtonState(0)
        };
        this.playButtonMouseUpHandler = function() {
            if (r.playPauseButton_do.currentState == 0) {
                r.dispatchEvent(e.PAUSE)
            } else {
                r.dispatchEvent(e.PLAY)
            }
        };
        this.disablePlayButton = function() {
            r.playPauseButton_do.disable();
            r.playPauseButton_do.setNormalState();
            r.showPlayButton()
        };
        this.enablePlayButton = function() {
            r.playPauseButton_do.enable()
        };
        this.setupCategoriesButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.categoriesButton_do = new FWDUVPSimpleButton(r.categoriesN_img, t.categoriesSPath_str);
            r.categoriesButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.categoriesButtonShowTooltipHandler);
            r.categoriesButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.categoriesButtonOnMouseUpHandler);
            r.categoriesButton_do.setY(parseInt((r.stageHeight - r.categoriesButton_do.h) / 2));
            r.buttons_ar.push(r.categoriesButton_do);
            r.mainHolder_do.addChild(r.categoriesButton_do)
        };
        this.categoriesButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.categoriesButton_do, r.playlistsButtonToolTip_do, e.e)
        };
        this.categoriesButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.SHOW_CATEGORIES)
        };
        this.setCategoriesButtonState = function(e) {
            if (!r.categoriesButton_do) return;
            if (e == "selected") {
                r.categoriesButton_do.setSelected()
            } else if (e == "unselected") {
                r.categoriesButton_do.setUnselected()
            }
        };
        this.setupPlaylistButton = function() {
            FWDUVPComplexButton.setPrototype();
            r.playlistButton_do = new FWDUVPComplexButton(r.hidePlaylistN_img, t.hidePlaylistSPath_str, r.showPlaylistN_img, t.showPlaylistSPath_str, true);
            r.buttons_ar.push(r.playlistButton_do);
            r.playlistButton_do.setY(parseInt((r.stageHeight - r.playlistButton_do.buttonHeight) / 2));
            r.playlistButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, r.playlistButtonShowToolTipHandler);
            r.playlistButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, r.playlistButtonMouseUpHandler);
            if (!r.showPlaylistByDefault_bl) r.playlistButton_do.setButtonState(0);
            r.mainHolder_do.addChild(r.playlistButton_do)
        };
        this.playlistButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.playlistButton_do, r.playlistButtonToolTip_do, e.e)
        };
        this.showShowPlaylistButton = function() {
            if (!r.playlistButton_do) return;
            r.playlistButton_do.setButtonState(1)
        };
        this.showHidePlaylistButton = function() {
            if (!r.playlistButton_do) return;
            r.playlistButton_do.setButtonState(0)
        };
        this.playlistButtonMouseUpHandler = function() {
            if (r.playlistButton_do.currentState == 1) {
                r.dispatchEvent(e.SHOW_PLAYLIST)
            } else {
                r.dispatchEvent(e.HIDE_PLAYLIST)
            }
            r.playlistButton_do.setNormalState();
            if (r.playlistButtonToolTip_do) r.playlistButtonToolTip_do.hide()
        };
        this.disablePlaylistButton = function() {
            if (r.playlistButton_do) {
                r.playlistButton_do.disable();
                r.playlistButton_do.setAlpha(.4)
            }
        };
        this.enablePlaylistButton = function() {
            if (r.playlistButton_do) {
                r.playlistButton_do.enable();
                r.playlistButton_do.setAlpha(1)
            }
        };
        this.setupEmbedButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.embedButton_do = new FWDUVPSimpleButton(r.embedN_img, t.embedPathS_str, undefined, true);
            r.embedButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.embedButtonShowToolTipHandler);
            r.embedButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.embedButtonOnMouseUpHandler);
            r.embedButton_do.setY(parseInt((r.stageHeight - r.embedButton_do.h) / 2));
            r.buttons_ar.push(r.embedButton_do);
            r.mainHolder_do.addChild(r.embedButton_do)
        };
        this.embedButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.embedButton_do, r.embedButtonToolTip_do, e.e)
        };
        this.embedButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.SHOW_EMBED_WINDOW);
            if (r.embedButtonToolTip_do) r.embedButtonToolTip_do.hide()
        };
        this.setupYtbButtons = function() {
            r.ytbButtonsHolder_do = new FWDUVPDisplayObject("div");
            r.ytbButtonsHolder_do.setOverflow("visible");
            if (r.repeatBackground_bl) {
                r.ytbButtonsHolder_do.getStyle().background = "url('" + r.controllerBkPath_str + "')"
            } else {
                r.ytbButtonBackground_do = new FWDUVPDisplayObject("img");
                var e = new Image;
                e.src = r.controllerBkPath_str;
                r.ytbButtonBackground_do.setScreen(e);
                r.ytbButtonsHolder_do.addChild(r.ytbButtonBackground_do)
            }
            r.ytbButtonsHolder_do.setX(300);
            r.ytbButtonsHolder_do.setY(-300);
            n.videoHolder_do.addChild(r.ytbButtonsHolder_do, 0);
            var e = new Image;
            e.src = r.ytbQualityButtonPointerPath_str;
            r.pointer_do = new FWDUVPDisplayObject("img");
            r.pointer_do.setScreen(e);
            r.pointer_do.setWidth(r.pointerWidth);
            r.pointer_do.setHeight(r.pointerHeight);
            r.ytbButtonsHolder_do.addChild(r.pointer_do);
            var e = new Image;
            e.src = r.youtubeQualityArrowPath_str;
            r.ytbQualityArrow_do = new FWDUVPDisplayObject("img");
            r.ytbQualityArrow_do.setScreen(e);
            r.ytbQualityArrow_do.setX(7);
            r.ytbQualityArrow_do.setWidth(5);
            r.ytbQualityArrow_do.setHeight(7);
            r.ytbButtonsHolder_do.addChild(r.ytbQualityArrow_do);
            var i;
            for (var s = 0; s < r.totalYtbButtons; s++) {
                FWDUVPYTBQButton.setPrototype();
                i = new FWDUVPYTBQButton(r.ytbQuality_ar[s], r.youtubeQualityButtonNormalColor_str, r.youtubeQualityButtonSelectedColor_str, t.hdPath_str);
                i.addListener(FWDUVPYTBQButton.MOUSE_OVER, r.ytbQualityOver);
                i.addListener(FWDUVPYTBQButton.MOUSE_OUT, r.ytbQualityOut);
                i.addListener(FWDUVPYTBQButton.CLICK, r.ytbQualityClick);
                r.ytbButtons_ar[s] = i;
                r.ytbButtonsHolder_do.addChild(i)
            }
            r.hideQualityButtons(false)
        };
        this.ytbQualityOver = function(e) {
            r.setYtbQualityArrowPosition(e.target)
        };
        this.ytbQualityOut = function(e) {
            r.setYtbQualityArrowPosition(undefined)
        };
        this.ytbQualityClick = function(t) {
            r.hideQualityButtons(true);
            if (r.isMainScrubberOnTop_bl) {
                r.mainScrubber_do.setX(0);
                FWDUVPTweenMax.to(r.mainScrubber_do, .6, {
                    alpha: 1
                })
            }
            r.dispatchEvent(e.CHANGE_YOUTUBE_QUALITY, {
                quality: t.target.label_str
            })
        };
        this.positionAndResizeYtbQualityButtons = function(e) {
            if (!e) return;
            var t = e.length + 1;
            if (r.prevYtbQualityButtonsLength == t) return;
            this.prevYtbQualityButtonsLength = t;
            var n;
            var i = 5;
            var s = 0;
            var o = 0;
            for (var u = 0; u < r.totalYtbButtons; u++) {
                n = r.ytbButtons_ar[u];
                n.setFinalSize();
                for (var a = 0; a < t; a++) {
                    if (n.label_str == e[a]) {
                        if (n.x != 0) n.setX(0);
                        if (n.w > s) s = n.w;
                        n.setY(i);
                        i += n.h;
                        break
                    } else {
                        if (n.x != -3e3) n.setX(-3e3)
                    }
                }
            }
            for (var u = 0; u < r.totalYtbButtons; u++) {
                n = r.ytbButtons_ar[u];
                if (n.dumy_do.w < s) {
                    n.setWidth(s);
                    n.dumy_do.setWidth(s)
                }
            }
            o = i + 5;
            r.pointer_do.setX(parseInt((s - r.pointer_do.w) / 2));
            r.pointer_do.setY(o);
            if (r.ytbButtonBackground_do) {
                r.ytbButtonBackground_do.setWidth(s);
                r.ytbButtonBackground_do.setHeight(o)
            }
            r.ytbButtonsHolder_do.setWidth(s);
            r.ytbButtonsHolder_do.setHeight(o)
        };
        this.disableQualityButtons = function(e) {
            for (var t = 0; t < r.totalYtbButtons; t++) {
                btn = r.ytbButtons_ar[t];
                if (btn.label_str == e) {
                    FWDUVPTweenMax.killTweensOf(r.ytbQualityArrow_do);
                    r.ytbQualityArrow_do.setY(btn.y + parseInt((btn.h - r.ytbQualityArrow_do.h) / 2) + 1);
                    btn.disable();
                    r.ytbDisabledButton_do = btn
                } else {
                    btn.enable()
                }
            }
            if (e == "highres" || e == "hd1080" || e == "hd720") {
                r.ytbQualityButton_do.showDisabledState()
            } else {
                r.ytbQualityButton_do.hideDisabledState()
            }
        };
        this.setYtbQualityArrowPosition = function(e) {
            var t = 0;
            if (!e) {
                t = r.ytbDisabledButton_do.y + parseInt((r.ytbDisabledButton_do.h - r.ytbQualityArrow_do.h) / 2)
            } else {
                t = e.y + parseInt((e.h - r.ytbQualityArrow_do.h) / 2)
            }
            FWDUVPTweenMax.killTweensOf(r.ytbQualityArrow_do);
            FWDUVPTweenMax.to(r.ytbQualityArrow_do, .6, {
                y: t,
                delay: .1,
                ease: Expo.easeInOut
            })
        };
        this.showQualityButtons = function(e) {
            if (r.areYtbQualityButtonsShowed_bl || !r.showYoutubeQualityButton_bl) return;
            r.areYtbQualityButtonsShowed_bl = true;
            var t = parseInt(r.ytbQualityButton_do.x + parseInt(r.ytbQualityButton_do.w - r.ytbButtonsHolder_do.w) / 2);
            var i = parseInt(n.tempVidStageHeight - r.stageHeight - r.ytbButtonsHolder_do.h - 6);
            if (window.addEventListener) {
                window.addEventListener("mousedown", r.hideQualityButtonsHandler)
            } else if (document.attachEvent) {
                document.detachEvent("onmousedown", r.hideQualityButtonsHandler);
                document.attachEvent("onmousedown", r.hideQualityButtonsHandler)
            }
            r.ytbButtonsHolder_do.setX(t);
            if (r.isMainScrubberOnTop_bl) {
                FWDUVPTweenMax.to(r.mainScrubber_do, .4, {
                    alpha: 0,
                    onComplete: function() {
                        r.mainScrubber_do.setX(-5e3)
                    }
                })
            }
            if (e) {
                FWDUVPTweenMax.to(r.ytbButtonsHolder_do, .6, {
                    y: i,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.ytbButtonsHolder_do);
                r.ytbButtonsHolder_do.setY(i)
            }
        };
        this.hideQualityButtons = function(e) {
            if (!r.areYtbQualityButtonsShowed_bl || !r.showYoutubeQualityButton_bl) return;
            r.areYtbQualityButtonsShowed_bl = false;
            if (e) {
                FWDUVPTweenMax.to(r.ytbButtonsHolder_do, .6, {
                    y: n.tempVidStageHeight,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.ytbButtonsHolder_do);
                r.ytbButtonsHolder_do.setY(n.tempVidStageHeight)
            }
            if (window.removeEventListener) {
                window.removeEventListener("mousedown", r.hideQualityButtonsHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousedown", r.hideQualityButtonsHandler)
            }
        };
        this.setupYoutubeQualityButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.ytbQualityButton_do = new FWDUVPSimpleButton(r.ytbQualityN_img, t.ytbQualitySPath_str, t.ytbQualityDPath_str);
            r.ytbQualityButton_do.setX(-300);
            r.ytbQualityButton_do.setY(parseInt((r.stageHeight - r.ytbQualityButton_do.h) / 2));
            r.ytbQualityButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.ytbQualityMouseUpHandler);
            r.mainHolder_do.addChild(r.ytbQualityButton_do)
        };
        this.ytbQualityMouseUpHandler = function() {
            if (r.areYtbQualityButtonsShowed_bl) {
                r.hideQualityButtons(true);
                if (r.isMainScrubberOnTop_bl) {
                    r.mainScrubber_do.setX(0);
                    FWDUVPTweenMax.to(r.mainScrubber_do, .6, {
                        alpha: 1
                    })
                }
            } else {
                r.showQualityButtons(true)
            }
        };
        this.hideQualityButtonsHandler = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            if (FWDUVPUtils.hitTest(r.ytbQualityButton_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(r.ytbButtonsHolder_do.screen, t.screenX, t.screenY)) {
                return
            }
            r.hideQualityButtons(true);
            if (r.isMainScrubberOnTop_bl) {
                r.mainScrubber_do.setX(0);
                FWDUVPTweenMax.to(r.mainScrubber_do, .6, {
                    alpha: 1
                })
            }
        };
        this.addYtbQualityButton = function() {
            if (r.hasYtbButton_bl || !r.showYoutubeQualityButton_bl) return;
            r.hasYtbButton_bl = true;
            if (r.embedButton_do && FWDUVPUtils.indexOfArray(r.buttons_ar, r.embedButton_do) != -1) {
                r.buttons_ar.splice(FWDUVPUtils.indexOfArray(r.buttons_ar, r.embedButton_do), 0, r.ytbQualityButton_do)
            } else if (r.facebookButton_do && FWDUVPUtils.indexOfArray(r.buttons_ar, r.facebookButton_do) != -1) {
                r.buttons_ar.splice(FWDUVPUtils.indexOfArray(r.buttons_ar, r.facebookButton_do), 0, r.ytbQualityButton_do)
            } else if (r.fullScreenButton_do && FWDUVPUtils.indexOfArray(r.buttons_ar, r.fullScreenButton_do) != -1) {
                r.buttons_ar.splice(FWDUVPUtils.indexOfArray(r.buttons_ar, r.fullScreenButton_do), 0, r.ytbQualityButton_do)
            } else {
                r.buttons_ar.splice(r.buttons_ar.length, 0, r.ytbQualityButton_do)
            }
            r.ytbQualityButton_do.disable();
            r.ytbQualityButton_do.rotation = 0;
            r.ytbQualityButton_do.setRotation(r.ytbQualityButton_do.rotation);
            r.ytbQualityButton_do.hideDisabledState();
            r.hideQualityButtons(false);
            r.positionButtons()
        };
        this.removeYtbQualityButton = function() {
            if (!r.hasYtbButton_bl || !r.showYoutubeQualityButton_bl) return;
            r.hasYtbButton_bl = false;
            r.buttons_ar.splice(FWDUVPUtils.indexOfArray(r.buttons_ar, r.ytbQualityButton_do), 1);
            r.ytbQualityButton_do.setX(-300);
            r.ytbQualityButton_do.hideDisabledState();
            r.hideQualityButtons(false);
            r.positionButtons()
        };
        this.updateQuality = function(e, t) {
            if (!r.hasYtbButton_bl || !r.showYoutubeQualityButton_bl) return;
            r.ytbQualityButton_do.enable();
            r.positionAndResizeYtbQualityButtons(e);
            r.disableQualityButtons(t)
        };
        this.setupInfoButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.infoButton_do = new FWDUVPSimpleButton(r.infoN_img, t.infoSPath_str);
            r.infoButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.infoButtonShowToolTipHandler);
            r.infoButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.infoButtonOnMouseUpHandler);
            r.infoButton_do.setX(-300);
            r.infoButton_do.setY(parseInt((r.stageHeight - r.infoButton_do.h) / 2));
            r.mainHolder_do.addChild(r.infoButton_do)
        };
        this.infoButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.infoButton_do, r.infoButtonToolTip_do, e.e)
        };
        this.infoButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.SHOW_INFO_WINDOW)
        };
        this.setupDownloadButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.downloadButton_do = new FWDUVPSimpleButton(r.downloadN_img, t.downloadSPath_str);
            r.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.downloadButtonShowToolTipHandler);
            r.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.downloadButtonOnMouseUpHandler);
            r.downloadButton_do.setX(-300);
            r.downloadButton_do.setY(parseInt((r.stageHeight - r.downloadButton_do.h) / 2));
            r.mainHolder_do.addChild(r.downloadButton_do)
        };
        this.downloadButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.downloadButton_do, r.downloadButtonToolTip_do, e.e)
        };
        this.downloadButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.DOWNLOAD_VIDEO)
        };
        this.setupDownloadButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.downloadButton_do = new FWDUVPSimpleButton(r.downloadN_img, t.downloadSPath_str);
            r.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.downloadButtonShowToolTipHandler);
            r.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.downloadButtonOnMouseUpHandler);
            r.downloadButton_do.setX(-300);
            r.downloadButton_do.setY(parseInt((r.stageHeight - r.downloadButton_do.h) / 2));
            r.mainHolder_do.addChild(r.downloadButton_do)
        };
        this.downloadButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.downloadButton_do, r.downloadButtonToolTip_do, e.e)
        };
        this.downloadButtonOnMouseUpHandler = function() {
            r.dispatchEvent(e.DOWNLOAD_VIDEO)
        };
        this.setupFacebookButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.facebookButton_do = new FWDUVPSimpleButton(r.facebookN_img, t.facebookSPath_str);
            r.buttons_ar.push(r.facebookButton_do);
            r.facebookButton_do.setY(parseInt((r.stageHeight - r.facebookButton_do.h) / 2));
            r.facebookButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, r.facebookButtonShowTooltipHandler);
            r.facebookButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.facebookButtonMouseUpHandler);
            r.mainHolder_do.addChild(r.facebookButton_do)
        };
        this.facebookButtonShowTooltipHandler = function(e) {
            r.showToolTip(r.facebookButton_do, r.facebookButtonToolTip_do, e.e)
        };
        this.facebookButtonMouseUpHandler = function() {
            r.dispatchEvent(e.FACEBOOK_SHARE)
        };
        this.setupFullscreenButton = function() {
            FWDUVPComplexButton.setPrototype();
            r.fullScreenButton_do = new FWDUVPComplexButton(r.fullScreenN_img, t.fullScreenSPath_str, r.normalScreenN_img, t.normalScreenSPath_str, true);
            r.buttons_ar.push(r.fullScreenButton_do);
            r.fullScreenButton_do.setY(parseInt((r.stageHeight - r.fullScreenButton_do.buttonHeight) / 2));
            r.fullScreenButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, r.fullscreenButtonShowToolTipHandler);
            r.fullScreenButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, r.fullScreenButtonMouseUpHandler);
            r.mainHolder_do.addChild(r.fullScreenButton_do)
        };
        this.fullscreenButtonShowToolTipHandler = function(e) {
            r.showToolTip(r.fullScreenButton_do, r.fullscreenButtonToolTip_do, e.e)
        };
        this.showFullScreenButton = function() {
            if (!r.fullScreenButton_do) return;
            r.fullScreenButton_do.setButtonState(1)
        };
        this.showNormalScreenButton = function() {
            if (!r.fullScreenButton_do) return;
            r.fullScreenButton_do.setButtonState(0)
        };
        this.setNormalStateToFullScreenButton = function() {
            if (!r.fullScreenButton_do) return;
            r.fullScreenButton_do.setNormalState();
            r.hideQualityButtons(false)
        };
        this.fullScreenButtonMouseUpHandler = function() {
            if (r.fullscreenButtonToolTip_do) r.fullscreenButtonToolTip_do.hide();
            if (r.fullScreenButton_do.currentState == 1) {
                r.dispatchEvent(e.FULL_SCREEN)
            } else {
                r.dispatchEvent(e.NORMAL_SCREEN)
            }
        };
        this.setupTime = function() {
            r.time_do = new FWDUVPDisplayObject("div");
            r.time_do.hasTransform3d_bl = false;
            r.time_do.hasTransform2d_bl = false;
            r.time_do.setBackfaceVisibility();
            r.time_do.getStyle().fontFamily = "Arial";
            r.time_do.getStyle().fontSize = "12px";
            r.time_do.getStyle().whiteSpace = "nowrap";
            r.time_do.getStyle().textAlign = "center";
            r.time_do.getStyle().color = r.timeColor_str;
            r.time_do.getStyle().fontSmoothing = "antialiased";
            r.time_do.getStyle().webkitFontSmoothing = "antialiased";
            r.time_do.getStyle().textRendering = "optimizeLegibility";
            r.mainHolder_do.addChild(r.time_do);
            r.updateTime("00:00/00:00");
            r.buttons_ar.push(r.time_do)
        };
        this.updateTime = function(e) {
            if (!r.time_do) return;
            r.time_do.setInnerHTML(e);
            if (r.lastTimeLength != e.length) {
                r.time_do.w = r.time_do.getWidth();
                r.positionButtons();
                setTimeout(function() {
                    r.time_do.w = r.time_do.getWidth();
                    r.time_do.h = r.time_do.getHeight();
                    r.time_do.setY(parseInt((r.stageHeight - r.time_do.h) / 2) + 1 + r.timeOffsetTop);
                    r.positionButtons()
                }, 50);
                r.lastTimeLength = e.length
            }
        };
        this.setupVolumeButton = function() {
            FWDUVPVolumeButton.setPrototype();
            r.volumeButton_do = new FWDUVPVolumeButton(r.volumeN_img, t.volumeSPath_str, t.volumeDPath_str);
            r.volumeButton_do.addListener(FWDUVPVolumeButton.SHOW_TOOLTIP, r.volumeButtonShowTooltipHandler);
            r.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_OVER, r.volumeOnMouseOverHandler);
            r.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_UP, r.volumeOnMouseUpHandler);
            r.volumeButton_do.setY(parseInt((r.stageHeight - r.volumeButton_do.h) / 2));
            r.buttons_ar.push(r.volumeButton_do);
            r.mainHolder_do.addChild(r.volumeButton_do);
            if (!r.allowToChangeVolume_bl) r.volumeButton_do.disable()
        };
        this.volumeButtonShowTooltipHandler = function(e) {};
        this.volumeOnMouseOverHandler = function() {
            r.showVolumeScrubber(true);
            r.hideQualityButtons(true);
            if (r.isMainScrubberOnTop_bl) {
                FWDUVPTweenMax.to(r.mainScrubber_do, .4, {
                    alpha: 0,
                    onComplete: function() {
                        r.mainScrubber_do.setX(-5e3)
                    }
                })
            }
        };
        this.volumeOnMouseUpHandler = function() {
            var e = r.lastVolume;
            if (r.isMute_bl) {
                e = r.lastVolume;
                r.isMute_bl = false
            } else {
                e = 1e-6;
                r.isMute_bl = true
            }
            r.updateVolume(e)
        };
        this.setupVolumeScrubber = function() {
            r.volumeScrubberHolder_do = new FWDUVPDisplayObject("div");
            if (r.repeatBackground_bl) {
                r.volumeBk_do = new FWDUVPDisplayObject("div");
                r.volumeBk_do.getStyle().background = "url('" + r.controllerBkPath_str + "')"
            } else {
                r.volumeBk_do = new FWDUVPDisplayObject("img");
                var e = new Image;
                e.src = r.controllerBkPath_str;
                r.volumeBk_do.setScreen(e)
            }
            r.volumeScrubberHolder_do.addChild(r.volumeBk_do);
            r.volumeScrubber_do = new FWDUVPDisplayObject("div");
            r.volumeScrubber_do.setHeight(r.mainScrubberHeight);
            r.volumeScrubber_do.setY(parseInt(r.volumeScrubberOfsetHeight / 2));
            var n = new Image;
            n.src = t.volumeScrubberBkBottomPath_str;
            r.volumeScrubberBkBottom_do = new FWDUVPDisplayObject("img");
            r.volumeScrubberBkBottom_do.setScreen(n);
            r.volumeScrubberBkBottom_do.setWidth(r.mainScrubberBkLeft_img.height);
            r.volumeScrubberBkBottom_do.setHeight(r.mainScrubberBkLeft_img.width);
            r.volumeScrubberBkBottom_do.setY(r.volumeScrubberHeight - r.volumeScrubberOfsetHeight - r.volumeScrubberBkBottom_do.h);
            var i = new Image;
            i.src = t.volumeScrubberBkTopPath_str;
            r.volumeScrubberBkTop_do = new FWDUVPDisplayObject("img");
            r.volumeScrubberBkTop_do.setScreen(i);
            r.volumeScrubberBkTop_do.setWidth(r.volumeScrubberBkBottom_do.w);
            r.volumeScrubberBkTop_do.setHeight(r.volumeScrubberBkBottom_do.h);
            var s = new Image;
            s.src = t.volumeScrubberBkMiddlePath_str;
            if (r.isMobile_bl) {
                r.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("div");
                r.volumeScrubberBkMiddle_do.getStyle().background = "url('" + r.volumeScrubberBkMiddlePath_str + "') repeat-x"
            } else {
                r.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
                r.volumeScrubberBkMiddle_do.setScreen(s)
            }
            r.volumeScrubberBkMiddle_do.setWidth(r.volumeScrubberBkBottom_do.w);
            r.volumeScrubberBkMiddle_do.setHeight(r.volumeScrubberHeight - r.volumeScrubberOfsetHeight - r.volumeScrubberBkTop_do.h * 2);
            r.volumeScrubberBkMiddle_do.setY(r.volumeScrubberBkTop_do.h);
            r.volumeScrubberDrag_do = new FWDUVPDisplayObject("div");
            r.volumeScrubberDrag_do.setWidth(r.volumeScrubberBkBottom_do.w);
            var o = new Image;
            o.src = t.volumeScrubberDragBottomPath_str;
            r.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("img");
            r.volumeScrubberDragBottom_do.setScreen(o);
            r.volumeScrubberDragBottom_do.setWidth(r.mainScrubberDragLeft_img.height);
            r.volumeScrubberDragBottom_do.setHeight(r.mainScrubberDragLeft_img.width);
            r.volumeScrubberDragBottom_do.setY(r.volumeScrubberHeight - r.volumeScrubberOfsetHeight - r.volumeScrubberDragBottom_do.h);
            s = new Image;
            s.src = r.volumeScrubberDragMiddlePath_str;
            if (r.isMobile_bl) {
                r.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div");
                r.volumeScrubberDragMiddle_do.getStyle().background = "url('" + r.volumeScrubberDragMiddlePath_str + "') repeat-x"
            } else {
                r.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
                r.volumeScrubberDragMiddle_do.setScreen(s)
            }
            r.volumeScrubberDragMiddle_do.setWidth(r.volumeScrubberDragBottom_do.w);
            r.volumeScrubberDragMiddle_do.setHeight(r.volumeScrubberHeight);
            var u = new Image;
            u.src = t.volumeScrubberLinePath_str;
            r.volumeScrubberBarLine_do = new FWDUVPDisplayObject("img");
            r.volumeScrubberBarLine_do.setScreen(u);
            r.volumeScrubberBarLine_do.setWidth(r.mainScrubberLine_img.height);
            r.volumeScrubberBarLine_do.setHeight(r.mainScrubberLine_img.width);
            r.volumeScrubberBarLine_do.setAlpha(0);
            r.volumeScrubberBarLine_do.hasTransform3d_bl = false;
            r.volumeScrubberBarLine_do.hasTransform2d_bl = false;
            r.volumeScrubberHolder_do.setWidth(r.volumeScrubberWidth);
            r.volumeScrubberHolder_do.setHeight(r.volumeScrubberHeight + r.stageHeight);
            r.volumeBk_do.setWidth(r.volumeScrubberWidth);
            r.volumeBk_do.setHeight(r.volumeScrubberHeight + r.stageHeight);
            r.volumeScrubber_do.setWidth(r.volumeScrubberWidth);
            r.volumeScrubber_do.setHeight(r.volumeScrubberHeight - r.volumeScrubberOfsetHeight);
            r.volumeScrubber_do.addChild(r.volumeScrubberBkBottom_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBkMiddle_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBkTop_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBarLine_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberDragBottom_do);
            r.volumeScrubberDrag_do.addChild(r.volumeScrubberDragMiddle_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberDrag_do);
            r.volumeScrubber_do.addChild(r.volumeScrubberBarLine_do);
            r.volumeScrubberHolder_do.addChild(r.volumeScrubber_do);
            r.addChild(r.volumeScrubberHolder_do);
            if (r.allowToChangeVolume_bl) {
                if (r.isMobile_bl) {
                    if (r.hasPointerEvent_bl) {
                        r.volumeScrubber_do.screen.addEventListener("MSPointerOver", r.volumeScrubberOnOverHandler);
                        r.volumeScrubber_do.screen.addEventListener("MSPointerOut", r.volumeScrubberOnOutHandler);
                        r.volumeScrubber_do.screen.addEventListener("MSPointerDown", r.volumeScrubberOnDownHandler)
                    } else {
                        r.volumeScrubber_do.screen.addEventListener("touchstart", r.volumeScrubberOnDownHandler)
                    }
                } else if (r.screen.addEventListener) {
                    r.volumeScrubber_do.screen.addEventListener("mouseover", r.volumeScrubberOnOverHandler);
                    r.volumeScrubber_do.screen.addEventListener("mouseout", r.volumeScrubberOnOutHandler);
                    r.volumeScrubber_do.screen.addEventListener("mousedown", r.volumeScrubberOnDownHandler)
                } else if (r.screen.attachEvent) {
                    r.volumeScrubber_do.screen.attachEvent("onmouseover", r.volumeScrubberOnOverHandler);
                    r.volumeScrubber_do.screen.attachEvent("onmouseout", r.volumeScrubberOnOutHandler);
                    r.volumeScrubber_do.screen.attachEvent("onmousedown", r.volumeScrubberOnDownHandler)
                }
            }
            r.enableVolumeScrubber();
            r.updateVolumeScrubber(r.volume)
        };
        this.volumeScrubberOnOverHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return
        };
        this.volumeScrubberOnOutHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return
        };
        this.volumeScrubberOnDownHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl || e.button == 2) return;
            if (e.preventDefault) e.preventDefault();
            r.volumeScrubberIsDragging_bl = true;
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var i = t.screenY - r.volumeScrubber_do.getGlobalY();
            n.showDisable();
            if (i < 0) {
                i = 0
            } else if (i > r.volumeScrubber_do.h - r.scrubbersOffsetWidth) {
                i = r.volumeScrubber_do.h - r.scrubbersOffsetWidth
            }
            var s = 1 - i / r.volumeScrubber_do.h;
            r.lastVolume = s;
            r.updateVolume(s);
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.addEventListener("MSPointerMove", r.volumeScrubberMoveHandler);
                    window.addEventListener("MSPointerUp", r.volumeScrubberEndHandler)
                } else {
                    window.addEventListener("touchmove", r.volumeScrubberMoveHandler);
                    window.addEventListener("touchend", r.volumeScrubberEndHandler)
                }
            } else {
                if (window.addEventListener) {
                    window.addEventListener("mousemove", r.volumeScrubberMoveHandler);
                    window.addEventListener("mouseup", r.volumeScrubberEndHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousemove", r.volumeScrubberMoveHandler);
                    document.attachEvent("onmouseup", r.volumeScrubberEndHandler)
                }
            }
        };
        this.volumeScrubberMoveHandler = function(e) {
            if (r.isVolumeScrubberDisabled_bl) return;
            if (e.preventDefault) e.preventDefault();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var n = t.screenY - r.volumeScrubber_do.getGlobalY();
            if (n < r.scrubbersOffsetWidth) {
                n = r.scrubbersOffsetWidth
            } else if (n > r.volumeScrubber_do.h) {
                n = r.volumeScrubber_do.h
            }
            var i = 1 - n / r.volumeScrubber_do.h;
            r.lastVolume = i;
            r.updateVolume(i)
        };
        this.volumeScrubberEndHandler = function() {
            n.hideDisable();
            r.volumeScrubberIsDragging_bl = false;
            if (r.isMobile_bl) {
                if (r.hasPointerEvent_bl) {
                    window.removeEventListener("MSPointerMove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("MSPointerUp", r.volumeScrubberEndHandler)
                } else {
                    window.removeEventListener("touchmove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("touchend", r.volumeScrubberEndHandler)
                }
            } else {
                if (window.removeEventListener) {
                    window.removeEventListener("mousemove", r.volumeScrubberMoveHandler);
                    window.removeEventListener("mouseup", r.volumeScrubberEndHandler)
                } else if (document.detachEvent) {
                    document.detachEvent("onmousemove", r.volumeScrubberMoveHandler);
                    document.detachEvent("onmouseup", r.volumeScrubberEndHandler)
                }
            }
        };
        this.disableVolumeScrubber = function() {
            r.isVolumeScrubberDisabled_bl = true;
            r.volumeScrubber_do.setButtonMode(false);
            r.volumeScrubberEndHandler()
        };
        this.enableVolumeScrubber = function() {
            r.isVolumeScrubberDisabled_bl = false;
            r.volumeScrubber_do.setButtonMode(true)
        };
        this.updateVolumeScrubber = function(e) {
            var t = r.volumeScrubberHeight - r.volumeScrubberOfsetHeight;
            var n = Math.round(e * t);
            r.volumeScrubberDrag_do.setHeight(Math.max(0, n - r.volumeScrubberDragBottom_do.h));
            r.volumeScrubberDrag_do.setY(t - n);
            if (n < 1 && r.isVolumeScrubberLineVisible_bl) {
                r.isVolumeScrubberLineVisible_bl = false;
                FWDUVPTweenMax.to(r.volumeScrubberBarLine_do, .5, {
                    alpha: 0
                });
                FWDUVPTweenMax.to(r.volumeScrubberDragBottom_do, .5, {
                    alpha: 0
                })
            } else if (n > 1 && !r.isVolumeScrubberLineVisible_bl) {
                r.isVolumeScrubberLineVisible_bl = true;
                FWDUVPTweenMax.to(r.volumeScrubberBarLine_do, .5, {
                    alpha: 1
                });
                FWDUVPTweenMax.to(r.volumeScrubberDragBottom_do, .5, {
                    alpha: 1
                })
            }
            if (n > t) n = t;
            FWDUVPTweenMax.to(r.volumeScrubberBarLine_do, .8, {
                y: t - n - 2,
                ease: Expo.easeOut
            })
        };
        this.updateVolume = function(t, n) {
            if (!r.showVolumeScrubber_bl) return;
            r.volume = t;
            if (r.volume <= 1e-6) {
                r.isMute_bl = true;
                r.volume = 1e-6
            } else if (r.voume >= 1) {
                r.isMute_bl = false;
                r.volume = 1
            } else {
                r.isMute_bl = false
            }
            if (r.volume == 1e-6) {
                if (r.volumeButton_do) r.volumeButton_do.setDisabledState()
            } else {
                if (r.volumeButton_do) r.volumeButton_do.setEnabledState()
            }
            if (r.volumeScrubberBarLine_do) r.updateVolumeScrubber(r.volume);
            if (!n) r.dispatchEvent(e.CHANGE_VOLUME, {
                percent: r.volume
            })
        };
        this.showVolumeScrubber = function(e) {
            if (r.isVolumeScrubberShowed_bl) return;
            r.isVolumeScrubberShowed_bl = true;
            var t = -r.volumeScrubberHolder_do.h + r.h;
            r.volumeScrubberHolder_do.setVisible(true);
            if (window.addEventListener) {
                window.addEventListener("mousemove", r.hideVolumeSchubberOnMoveHandler)
            } else if (document.attachEvent) {
                document.detachEvent("onmousemove", r.hideVolumeSchubberOnMoveHandler);
                document.attachEvent("onmousemove", r.hideVolumeSchubberOnMoveHandler)
            }
            r.volumeScrubberHolder_do.setX(parseInt(r.volumeButton_do.x + (r.volumeButton_do.w - r.volumeScrubberHolder_do.w) / 2));
            if (e) {
                FWDUVPTweenMax.to(r.volumeScrubberHolder_do, .6, {
                    y: t,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.volumeScrubberHolder_do);
                r.volumeScrubberHolder_do.setY(t)
            }
        };
        this.hideVolumeSchubberOnMoveHandler = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            if (FWDUVPUtils.hitTest(r.volumeScrubberHolder_do.screen, t.screenX, t.screenY) || FWDUVPUtils.hitTest(r.volumeButton_do.screen, t.screenX, t.screenY) || r.volumeScrubberIsDragging_bl) {
                return
            }
            r.hideVolumeScrubber(true);
            if (r.isMainScrubberOnTop_bl) {
                r.mainScrubber_do.setX(0);
                FWDUVPTweenMax.to(r.mainScrubber_do, .6, {
                    alpha: 1
                })
            }
        };
        this.hideVolumeScrubber = function(e) {
            if (!r.isVolumeScrubberShowed_bl) return;
            r.isVolumeScrubberShowed_bl = false;
            r.volumeButton_do.setNormalState(true);
            if (e) {
                FWDUVPTweenMax.to(r.volumeScrubberHolder_do, .6, {
                    y: n.stageHeight,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        r.volumeScrubberHolder_do.setVisible(false)
                    }
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.ytbButtonsHolder_do);
                r.volumeScrubberHolder_do.setY(n.stageHeight);
                r.volumeScrubberHolder_do.setVisible(false)
            }
            if (window.removeEventListener) {
                window.removeEventListener("mousemove", r.hideVolumeSchubberOnMoveHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", r.hideVolumeSchubberOnMoveHandler)
            }
        };
        this.show = function(e) {
            if (r.isShowed_bl) return;
            r.isShowed_bl = true;
            r.setX(0);
            if (e) {
                FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.mainHolder_do);
                r.mainHolder_do.setY(0)
            }
            setTimeout(r.positionButtons, 200)
        };
        this.hide = function(e, t) {
            if (!r.isShowed_bl) return;
            if (!t) t = 0;
            r.isShowed_bl = false;
            if (e) {
                FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                    y: r.stageHeight + t,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        if (t) r.setX(-5e3)
                    }
                })
            } else {
                FWDUVPTweenMax.killTweensOf(r.mainHolder_do);
                if (t) r.setX(-5e3);
                r.mainHolder_do.setY(r.stageHeight + t)
            }
            r.hideQualityButtons(true)
        };
        this.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDUVPDisplayObject("div")
    };
    e.SHOW_PLAYLIST = "showPlaylist";
    e.HIDE_PLAYLIST = "hidePlaylist";
    e.SHOW_CATEGORIES = "showCategories";
    e.DOWNLOAD_VIDEO = "downloadVideo";
    e.FACEBOOK_SHARE = "share";
    e.FULL_SCREEN = "fullScreen";
    e.NORMAL_SCREEN = "normalScreen";
    e.PLAY = "play";
    e.PAUSE = "pause";
    e.START_TO_SCRUB = "startToScrub";
    e.SCRUB = "scrub";
    e.STOP_TO_SCRUB = "stopToScrub";
    e.CHANGE_VOLUME = "changeVolume";
    e.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality";
    e.SHOW_EMBED_WINDOW = "showEmbedWindow";
    e.SHOW_INFO_WINDOW = "showInfoWindow";
    e.prototype = null;
    window.FWDUVPController = e
})();
(function(window) {
    var FWDUVPData = function(props, playListElement, parent) {
        var self = this;
        var prototype = FWDUVPData.prototype;
        this.xhr = null;
        this.ytb = null;
        this.scs_el = null;
        this.dumy_img = null;
        this.mainPreloader_img = null;
        this.bkLeft_img = null;
        this.bkMiddle_img = null;
        this.bkRight_img = null;
        this.nextN_img = null;
        this.prevN_img = null;
        this.playN_img = null;
        this.pauseN_img = null;
        this.mainScrubberBkLeft_img = null;
        this.mainScrubberDragLeft_img = null;
        this.mainScrubberLine_img = null;
        this.volumeScrubberBkLeft_img = null;
        this.volumeScrubberDragLeft_img = null;
        this.volumeScrubberLine_img = null;
        this.volumeN_img = null;
        this.progressLeft_img = null;
        this.largePlayN_img = null;
        this.categoriesN_img = null;
        this.replayN_img = null;
        this.shuffleN_img = null;
        this.fullScreenN_img = null;
        this.ytbQualityN_img = null;
        this.ytbQualityD_img = null;
        this.facebookN_img = null;
        this.infoN_img = null;
        this.downloadN_img = null;
        this.normalScreenN_img = null;
        this.catNextN_img = null;
        this.catPrevN_img = null;
        this.catPrevD_img = null;
        this.hidePlaylistN_img = null;
        this.showPlaylistN_img = null;
        this.prevThumbsSetN_img = null;
        this.nextThumbsSetN_img = null;
        this.embedN_img = null;
        this.embedColoseN_img = null;
        this.scrLinesN_img = null;
        this.scrDragTop_img = null;
        this.scrLinesN_img = null;
        this.prevSPath_str = null;
        this.nextSPath_str = null;
        this.props_obj = props;
        this.skinPaths_ar = [];
        this.images_ar = [];
        this.cats_ar = [];
        this.catsRef_ar = [];
        this.youtubeObject_ar = null;
        this.skinPath_str = null;
        this.flashPath_str = null;
        this.flashCopyToCBPath_str = null;
        this.proxyPath_str = null;
        this.proxyFolderPath_str = null;
        this.mailPath_str = null;
        this.sendToAFriendPath_str = null;
        this.videoDownloaderPath_str = null;
        this.mainFolderPath_str = null;
        this.bkMiddlePath_str = null;
        this.hdPath_str = null;
        this.youtubeQualityArrowPath_str = null;
        this.mainScrubberBkMiddlePath_str = null;
        this.volumeScrubberBkMiddlePath_str = null;
        this.mainScrubberDragMiddlePath_str = null;
        this.volumeScrubberDragMiddlePath_str = null;
        this.timeColor_str = null;
        this.playlistPosition_str = null;
        this.progressMiddlePath_str = null;
        this.facebookAppId_str = null;
        this.ytbQualityButtonPointerPath_str = null;
        this.youtubeQualityButtonNormalColor_str = null;
        this.youtubeQualityButtonSelectedColor_str = null;
        this.controllerBkPath_str = null;
        this.logoPosition_str = null;
        this.logoPath_str = null;
        this.pauseSPath_str = null;
        this.playSPath_str = null;
        this.volumeSPath_str = null;
        this.volumeDPath_str = null;
        this.categoriesSPath_str = null;
        this.replaySPath_str = null;
        this.toopTipBk_str = null;
        this.toolTipsButtonFontColor_str = null;
        this.toopTipPointer_str = null;
        this.hidePlaylistSPath_str = null;
        this.showPlaylistSPath_str = null;
        this.prevThumbsSetSPath_str = null;
        this.nextThumbsSetSPath_str = null;
        this.playlistThumbnailsBackgroundPath_str = null;
        this.playlistToolTipPointerPath_str = null;
        this.playlistToolTipBackgroundPath_str = null;
        this.folderVideoLabel_str = null;
        this.embedPathS_str = null;
        this.embedCopyButtonNPath_str = null;
        this.embedWindowPathS_str = null;
        this.embedCopyButtonSPath_str = null;
        this.embedWindowBackground_str = null;
        this.sendButtonNPath_str = null;
        this.sendButtonSPath_str = null;
        this.shareAndEmbedTextColor_str = null;
        this.searchInputBackgroundColor_str = null;
        this.borderColor_str = null;
        this.searchInputColor_str = null;
        this.secondaryLabelsColor_str = null;
        this.mainLabelsColor_str = null;
        this.controllerHeight = 0;
        this.countLoadedSkinImages = 0;
        this.volume = 1;
        this.controllerHideDelay = 0;
        this.startSpaceBetweenButtons = 0;
        this.spaceBetweenButtons = 0;
        this.scrubbersOffsetWidth = 0;
        this.volumeScrubberOffsetTopWidth = 0;
        this.timeOffsetLeftWidth = 0;
        this.timeOffsetTop = 0;
        this.logoMargins = 0;
        this.startAtPlaylist = 0;
        this.startAtVideo = 0;
        this.playlistBottomHeight = 0;
        this.maxPlaylistItems = 0;
        this.totalPlaylists = 0;
        this.thumbnailMaxWidth = 0;
        this.buttonsMargins = 0;
        this.nextAndPrevSetButtonsMargins = 0;
        this.thumbnailMaxHeight = 0;
        this.horizontalSpaceBetweenThumbnails = 0;
        this.verticalSpaceBetweenThumbnails = 0;
        this.buttonsToolTipHideDelay = 0;
        this.thumbnailWidth = 0;
        this.thumbnailHeight = 0;
        this.timeOffsetTop = 0;
        this.embedWindowCloseButtonMargins = 0;
        this.loadImageId_to;
        this.dispatchLoadSkinCompleteWithDelayId_to;
        this.dispatchPlaylistLoadCompleteWidthDelayId_to;
        this.JSONPRequestTimeoutId_to;
        this.isYoutbe_bl = false;
        this.showPlaylistsButtonAndPlaylists_bl = false;
        this.showEmbedButton_bl = false;
        this.showPlaylistButtonAndPlaylist_bl = false;
        this.showPlaylistByDefault_bl = false;
        this.showSearchInput_bl = false;
        this.forceDisableDownloadButtonForFolder_bl = false;
        this.allowToChangeVolume_bl = true;
        this.showContextMenu_bl = false;
        this.showButtonsToolTip_bl = false;
        this.addMouseWheelSupport_bl = false;
        this.addKeyboardSupport_bl = false;
        this.autoPlay_bl = false;
        this.showPoster_bl = false;
        this.loop_bl = false;
        this.shuffle_bl = false;
        this.showLoopButton_bl = false;
        this.showDownloadVideoButton_bl = false;
        this.showInfoButton_bl = false;
        this.showVolumeScrubber_bl = false;
        this.showVolumeButton_bl = false;
        this.showControllerWhenVideoIsStopped_bl = false;
        this.showNextAndPrevButtonsInController_bl = false;
        this.showLogo_bl = false;
        this.hideLogoWithController_bl = false;
        this.isPlaylistDispatchingError_bl = false;
        this.useYoutube_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        self.init = function() {
            self.parseProperties()
        };
        self.parseProperties = function(e) {
            self.categoriesId_str = self.props_obj.playlistsId;
            if (!self.categoriesId_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>playlistsId</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            self.mainFolderPath_str = self.props_obj.mainFolderPath;
            if (!self.mainFolderPath_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>mainFolderPath</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            if (self.mainFolderPath_str.lastIndexOf("/") + 1 != self.mainFolderPath_str.length) {
                self.mainFolderPath_str += "/"
            }
            self.skinPath_str = self.props_obj.skinPath;
            if (!self.skinPath_str) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            if (self.skinPath_str.lastIndexOf("/") + 1 != self.skinPath_str.length) {
                self.skinPath_str += "/"
            }
            self.skinPath_str = self.mainFolderPath_str + self.skinPath_str;
            self.flashPath_str = self.mainFolderPath_str + "swf.swf";
            self.flashCopyToCBPath_str = self.mainFolderPath_str + "cb.swf";
            self.proxyPath_str = self.mainFolderPath_str + "proxy.php";
            self.proxyFolderPath_str = self.mainFolderPath_str + "proxyFolder.php";
            self.mailPath_str = self.mainFolderPath_str + "sendMail.php";
            self.sendToAFriendPath_str = self.mainFolderPath_str + "sendMailToAFriend.php";
            self.videoDownloaderPath_str = self.mainFolderPath_str + "downloader.php";
            self.categories_el = document.getElementById(self.categoriesId_str);
            if (!self.categories_el) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "The playlist with the id <font color='#FFFFFF'>" + self.categoriesId_str + "</font> is not found!";
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            var t = FWDUVPUtils.getChildren(self.categories_el);
            self.totalCats = t.length;
            if (self.totalCats == 0) {
                setTimeout(function() {
                    if (self == null) return;
                    errorMessage_str = "At least one playlist is required!";
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    })
                }, 50);
                return
            }
            for (var n = 0; n < self.totalCats; n++) {
                var r = {};
                var i = null;
                child = t[n];
                if (!FWDUVPUtils.hasAttribute(child, "data-source")) {
                    setTimeout(function() {
                        if (self == null) return;
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-source</font> is required in the plalists html element at position <font color='#FFFFFF'>" + (n + 1)
                        })
                    }, 50);
                    return
                }
                if (!FWDUVPUtils.hasAttribute(child, "data-thumbnail-path")) {
                    setTimeout(function() {
                        if (self == null) return;
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-thumbnail-path</font> is required in the playlists html element at position <font color='#FFFFFF'>" + (n + 1)
                        })
                    }, 50);
                    return
                }
                r.source = FWDUVPUtils.getAttributeValue(child, "data-source");
                if (r.source.indexOf("=") == -1 && r.source.indexOf(".xml") == -1) {
                    i = document.getElementById(r.source)
                } else {
                    i = r.source
                }
                self.catsRef_ar.push(i);
                r.thumbnailPath = FWDUVPUtils.getAttributeValue(child, "data-thumbnail-path");
                r.htmlContent = child.innerHTML;
                if (FWDUVPUtils.hasAttribute(child, "data-playlist-name")) {
                    r.playlistName = FWDUVPUtils.getAttributeValue(child, "data-playlist-name")
                } else {
                    r.playlistName = "not defined!"
                }
                self.cats_ar[n] = r
            }
            for (var n = 0; n < self.totalCats; n++) {
                var r = {};
                var i = null;
                child = t[n];
                i = document.getElementById(FWDUVPUtils.getAttributeValue(child, "data-source"));
                try {
                    i.parentNode.removeChild(i)
                } catch (s) {}
            }
            try {
                self.categories_el.parentNode.removeChild(self.categories_el)
            } catch (s) {}
            self.startAtPlaylist = self.props_obj.startAtPlaylist || 0;
            if (isNaN(self.startAtPlaylist)) self.startAtPlaylist = 0;
            if (self.startAtPlaylist < 0) {
                self.startAtPlaylist = 0
            } else if (self.startAtPlaylist > self.totalCats - 1) {
                self.startAtPlaylist = self.totalCats - 1
            }
            self.startAtVideo = self.props_obj.startAtVideo || 0;
            self.playlistBottomHeight = self.props_obj.playlistBottomHeight || 0;
            self.playlistBottomHeight = Math.min(800, self.playlistBottomHeight);
            self.videoSourcePath_str = self.props_obj.videoSourcePath || undefined;
            self.timeColor_str = self.props_obj.timeColor || "#FF0000";
            self.youtubeQualityButtonNormalColor_str = self.props_obj.youtubeQualityButtonNormalColor || "#FF0000";
            self.youtubeQualityButtonSelectedColor_str = self.props_obj.youtubeQualityButtonSelectedColor || "#FF0000";
            self.posterBackgroundColor_str = self.props_obj.posterBackgroundColor || "transparent";
            self.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist;
            self.showPlaylistButtonAndPlaylist_bl = self.showPlaylistButtonAndPlaylist_bl == "no" ? false : true;
            self.showPlaylistByDefault_bl = self.props_obj.showPlaylistByDefault;
            self.showPlaylistByDefault_bl = self.showPlaylistByDefault_bl == "no" ? false : true;
            self.showPlaylistName_bl = self.props_obj.showPlaylistName;
            self.showPlaylistName_bl = self.showPlaylistName_bl == "no" ? false : true;
            self.showSearchInput_bl = self.props_obj.showSearchInput;
            self.showSearchInput_bl = self.showSearchInput_bl == "no" ? false : true;
            self.forceDisableDownloadButtonForFolder_bl = self.props_obj.forceDisableDownloadButtonForFolder;
            self.forceDisableDownloadButtonForFolder_bl = self.forceDisableDownloadButtonForFolder_bl == "yes" ? true : false;
            self.playlistPosition_str = self.props_obj.playlistPosition || "bottom";
            test = self.playlistPosition_str == "bottom" || self.playlistPosition_str == "right";
            if (!test) self.playlistPosition_str = "right";
            self.folderVideoLabel_str = self.props_obj.folderVideoLabel || "Video ";
            self.logoPosition_str = self.props_obj.logoPosition || "topleft";
            self.logoPosition_str = String(self.logoPosition_str).toLowerCase();
            test = self.logoPosition_str == "topleft" || self.logoPosition_str == "topright" || self.logoPosition_str == "bottomleft" || self.logoPosition_str == "bottomright";
            if (!test) self.logoPosition_str = "topleft";
            self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity";
            if (self.thumbnailSelectedType_str != "blackAndWhite" && self.thumbnailSelectedType_str != "threshold" && self.thumbnailSelectedType_str != "opacity") {
                self.thumbnailSelectedType_str = "opacity"
            }
            if (self.isMobile_bl || FWDUVPUtils.isIEAndLessThen9) self.thumbnailSelectedType_str = "opacity";
            if (document.location.protocol == "file:") self.thumbnailSelectedType_str = "opacity";
            self.adsButtonsPosition_str = self.props_obj.adsButtonsPosition || "left";
            self.adsButtonsPosition_str = String(self.adsButtonsPosition_str).toLowerCase();
            test = self.adsButtonsPosition_str == "left" || self.adsButtonsPosition_str == "right";
            if (!test) self.adsButtonsPosition_str = "left";
            self.skipToVideoButtonText_str = self.props_obj.skipToVideoButtonText || "not defined";
            self.skipToVideoText_str = self.props_obj.skipToVideoText;
            self.adsTextNormalColor = self.props_obj.adsTextNormalColor || "#FF0000";
            self.adsTextSelectedColor = self.props_obj.adsTextSelectedColor || "#FF0000";
            self.adsBorderNormalColor_str = self.props_obj.adsBorderNormalColor || "#FF0000";
            self.adsBorderSelectedColor_str = self.props_obj.adsBorderSelectedColor || "#FF0000";
            self.volume = self.props_obj.volume;
            if (!self.volume) self.volume = 1;
            if (isNaN(self.volume)) volume = 1;
            if (self.volume > 1 || self.isMobile_bl) {
                self.volume = 1
            } else if (self.volume < 0) {
                self.volume = 0
            }
            self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
            test = self.rightClickContextMenu_str == "developer" || self.rightClickContextMenu_str == "disabled" || self.rightClickContextMenu_str == "default";
            if (!test) self.rightClickContextMenu_str = "developer";
            self.buttonsToolTipFontColor_str = self.props_obj.buttonsToolTipFontColor || "#FF0000";
            self.toolTipsButtonFontColor_str = self.props_obj.toolTipsButtonFontColor || "#FF0000";
            self.shareAndEmbedTextColor_str = self.props_obj.shareAndEmbedTextColor || "#FF0000";
            self.inputBackgroundColor_str = self.props_obj.inputBackgroundColor || "#FF0000";
            self.inputColor_str = self.props_obj.inputColor || "#FF0000";
            self.searchInputBackgroundColor_str = self.props_obj.searchInputBackgroundColor || "#FF0000";
            self.borderColor_str = self.props_obj.borderColor || "#FF0000";
            self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000";
            self.youtubeAndFolderVideoTitleColor_str = self.props_obj.youtubeAndFolderVideoTitleColor || "#FF0000";
            self.youtubeDescriptionColor_str = self.props_obj.youtubeDescriptionColor || "#FF0000";
            self.youtubeOwnerColor_str = self.props_obj.youtubeOwnerColor || "#FF0000";
            self.secondaryLabelsColor_str = self.props_obj.secondaryLabelsColor || "#FF0000";
            self.mainLabelsColor_str = self.props_obj.mainLabelsColor || "#FF0000";
            self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "#FF0000";
            self.thumbnailNormalBackgroundColor_str = self.props_obj.thumbnailNormalBackgroundColor || "#FF0000";
            self.playlistNameColor_str = self.props_obj.playlistNameColor || "#FF0000";
            self.thumbnailHoverBackgroundColor_str = self.props_obj.thumbnailHoverBackgroundColor || "#FF0000";
            self.thumbnailDisabledBackgroundColor_str = self.props_obj.thumbnailDisabledBackgroundColor || "#FF0000";
            self.logoLink_str = self.props_obj.logoLink || "none";
            self.nextAndPrevSetButtonsMargins = self.props_obj.nextAndPrevSetButtonsMargins || 0;
            self.buttonsMargins = self.props_obj.buttonsMargins || 0;
            self.thumbnailMaxWidth = self.props_obj.thumbnailMaxWidth || 330;
            self.thumbnailMaxHeight = self.props_obj.thumbnailMaxHeight || 330;
            self.horizontalSpaceBetweenThumbnails = self.props_obj.horizontalSpaceBetweenThumbnails;
            self.verticalSpaceBetweenThumbnails = self.props_obj.verticalSpaceBetweenThumbnails;
            self.totalPlaylists = self.cats_ar.length;
            self.controllerHeight = self.props_obj.controllerHeight || 50;
            self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
            self.controllerHideDelay = self.props_obj.controllerHideDelay || 2;
            self.controllerHideDelay *= 1e3;
            self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0;
            self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0;
            self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0;
            self.volumeScrubberOffsetTopWidth = self.props_obj.volumeScrubberOffsetTopWidth || 0;
            self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0;
            self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0;
            self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
            self.embedWindowCloseButtonMargins = self.props_obj.embedAndInfoWindowCloseButtonMargins || 0;
            self.logoMargins = self.props_obj.logoMargins || 0;
            self.maxPlaylistItems = self.props_obj.maxPlaylistItems || 50;
            self.volumeScrubberHeight = self.props_obj.volumeScrubberHeight || 10;
            self.volumeScrubberOfsetHeight = self.props_obj.volumeScrubberOfsetHeight || 0;
            if (self.volumeScrubberHeight > 200) self.volumeScrubberHeight = 200;
            self.buttonsToolTipHideDelay = self.props_obj.buttonsToolTipHideDelay || 1.5;
            self.thumbnailWidth = self.props_obj.thumbnailWidth || 80;
            self.thumbnailWidth = Math.min(150, self.thumbnailWidth);
            self.thumbnailHeight = self.props_obj.thumbnailHeight || 80;
            self.spaceBetweenThumbnails = self.props_obj.spaceBetweenThumbnails || 0;
            self.thumbnailHeight = Math.min(150, self.thumbnailHeight);
            self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
            self.scrollbarOffestWidth = self.props_obj.scrollbarOffestWidth || 0;
            self.scollbarSpeedSensitivity = self.props_obj.scollbarSpeedSensitivity || .5;
            self.facebookAppId_str = self.props_obj.facebookAppId;
            if (self.isMobile_bl) self.allowToChangeVolume_bl = false;
            self.showContextMenu_bl = self.props_obj.showContextMenu;
            self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
            self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTips;
            self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
            if (self.isMobile_bl) self.showButtonsToolTip_bl = false;
            self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTip;
            self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
            if (self.isMobile_bl) self.showButtonsToolTip_bl = false;
            self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport;
            self.addKeyboardSupport_bl = self.addKeyboardSupport_bl == "no" ? false : true;
            self.addMouseWheelSupport_bl = self.props_obj.addMouseWheelSupport;
            self.addMouseWheelSupport_bl = self.addMouseWheelSupport_bl == "no" ? false : true;
            self.autoPlay_bl = self.props_obj.autoPlay;
            self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
            if (FWDUVPUtils.isMobile) self.autoPlay_bl = false;
            self.showNextAndPrevButtons_bl = self.props_obj.showNextAndPrevButtons;
            self.showNextAndPrevButtons_bl = self.showNextAndPrevButtons_bl == "no" ? false : true;
            self.showPlaylistsButtonAndPlaylists_bl = self.props_obj.showPlaylistsButtonAndPlaylists;
            self.showPlaylistsButtonAndPlaylists_bl = self.showPlaylistsButtonAndPlaylists_bl == "no" ? false : true;
            self.showEmbedButton_bl = self.props_obj.showEmbedButton;
            self.showEmbedButton_bl = self.showEmbedButton_bl == "no" ? false : true;
            self.showPlaylistsByDefault_bl = self.props_obj.showPlaylistsByDefault;
            self.showPlaylistsByDefault_bl = self.showPlaylistsByDefault_bl == "yes" ? true : false;
            self.loop_bl = self.props_obj.loop;
            self.loop_bl = self.loop_bl == "yes" ? true : false;
            self.shuffle_bl = self.props_obj.shuffle;
            self.shuffle_bl = self.shuffle_bl == "yes" ? true : false;
            self.showLoopButton_bl = self.props_obj.showLoopButton;
            self.showLoopButton_bl = self.props_obj.showLoopButton == "no" ? false : true;
            self.showShuffleButton_bl = self.props_obj.showShuffleButton;
            self.showShuffleButton_bl = self.props_obj.showShuffleButton == "no" ? false : true;
            self.showDownloadVideoButton_bl = self.props_obj.showDownloadButton;
            self.showDownloadVideoButton_bl = self.showDownloadVideoButton_bl == "no" ? false : true;
            self.showInfoButton_bl = self.props_obj.showInfoButton;
            self.showInfoButton_bl = self.showInfoButton_bl == "no" ? false : true;
            self.showLogo_bl = self.props_obj.showLogo;
            self.showLogo_bl = self.showLogo_bl == "yes" ? true : false;
            self.hideLogoWithController_bl = self.props_obj.hideLogoWithController;
            self.hideLogoWithController_bl = self.hideLogoWithController_bl == "yes" ? true : false;
            self.showPoster_bl = self.props_obj.showPoster;
            self.showPoster_bl = self.showPoster_bl == "yes" ? true : false;
            self.showVolumeButton_bl = self.props_obj.showVolumeButton;
            self.showVolumeButton_bl = self.showVolumeButton_bl == "no" ? false : true;
            if (self.isMobile_bl) self.showVolumeButton_bl = false;
            self.showVolumeScrubber_bl = self.showVolumeButton_bl;
            self.showControllerWhenVideoIsStopped_bl = self.props_obj.showControllerWhenVideoIsStopped;
            self.showControllerWhenVideoIsStopped_bl = self.showControllerWhenVideoIsStopped_bl == "yes" ? true : false;
            self.showNextAndPrevButtonsInController_bl = self.props_obj.showNextAndPrevButtonsInController;
            self.showNextAndPrevButtonsInController_bl = self.showNextAndPrevButtonsInController_bl == "yes" ? true : false;
            self.showTime_bl = self.props_obj.showTime;
            self.showTime_bl = self.showTime_bl == "no" ? false : true;
            self.showFullScreenButton_bl = self.props_obj.showFullScreenButton;
            self.showFullScreenButton_bl = self.showFullScreenButton_bl == "no" ? false : true;
            self.showFullScreenButton_bl = self.props_obj.showFullScreenButton;
            self.showFullScreenButton_bl = self.showFullScreenButton_bl == "no" ? false : true;
            self.repeatBackground_bl = self.props_obj.repeatBackground;
            self.repeatBackground_bl = self.repeatBackground_bl == "no" ? false : true;
            self.showFacebookButton_bl = self.props_obj.showFacebookButton;
            self.showFacebookButton_bl = self.showFacebookButton_bl == "no" ? false : true;
            self.openNewPageAtTheEndOfTheAds_bl = self.props_obj.openNewPageAtTheEndOfTheAds;
            self.openNewPageAtTheEndOfTheAds_bl = self.openNewPageAtTheEndOfTheAds_bl == "yes" ? true : false;
            self.playAdsOnlyOnce_bl = self.props_obj.playAdsOnlyOnce;
            self.playAdsOnlyOnce_bl = self.playAdsOnlyOnce_bl == "yes" ? true : false;
            self.startAtRandomVideo_bl = self.props_obj.startAtRandomVideo;
            self.startAtRandomVideo_bl = self.startAtRandomVideo_bl == "yes" ? true : false;
            self.stopVideoWhenPlayComplete_bl = self.props_obj.stopVideoWhenPlayComplete;
            self.stopVideoWhenPlayComplete_bl = self.stopVideoWhenPlayComplete_bl == "yes" ? true : false;
            if (self.showFacebookButton_bl && !self.facebookAppId_str) {
                setTimeout(function() {
                    if (self == null) return;
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Parameter <font color='#FFFFFF'>facebookAppId</font> is required in the constructor, this represents the facebook app id, for more info read the documetation"
                    })
                }, 50);
                return
            }
            self.showYoutubeQualityButton_bl = self.props_obj.showYoutubeQualityButton;
            self.showYoutubeQualityButton_bl = self.showYoutubeQualityButton_bl == "no" ? false : true;
            if (FWDUVPlayer.useYoutube == "no" || self.isMobile_bl) self.showYoutubeQualityButton_bl = false;
            self.logoPath_str = self.skinPath_str + "logo.png";
            if (self.props_obj.logoPath) self.logoPath_str = self.props_obj.logoPath;
            self.mainPreloader_img = new Image;
            self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler;
            self.mainPreloader_img.onload = self.onPreloaderLoadHandler;
            self.mainPreloader_img.src = self.skinPath_str + "preloader.jpg";
            self.skinPaths_ar = [{
                img: self.prevN_img = new Image,
                src: self.skinPath_str + "prev-video.png"
            }, {
                img: self.nextN_img = new Image,
                src: self.skinPath_str + "next-video.png"
            }, {
                img: self.playN_img = new Image,
                src: self.skinPath_str + "play.png"
            }, {
                img: self.pauseN_img = new Image,
                src: self.skinPath_str + "pause.png"
            }, {
                img: self.mainScrubberBkLeft_img = new Image,
                src: self.skinPath_str + "scrubber-left-background.png"
            }, {
                img: self.mainScrubberDragLeft_img = new Image,
                src: self.skinPath_str + "scrubber-left-drag.png"
            }, {
                img: self.mainScrubberLine_img = new Image,
                src: self.skinPath_str + "scrubber-line.png"
            }, {
                img: self.volumeN_img = new Image,
                src: self.skinPath_str + "volume.png"
            }, {
                img: self.progressLeft_img = new Image,
                src: self.skinPath_str + "progress-left.png"
            }, {
                img: self.largePlayN_img = new Image,
                src: self.skinPath_str + "large-play.png"
            }, {
                img: self.categoriesN_img = new Image,
                src: self.skinPath_str + "categories-button.png"
            }, {
                img: self.replayN_img = new Image,
                src: self.skinPath_str + "replay-button.png"
            }, {
                img: self.shuffleN_img = new Image,
                src: self.skinPath_str + "shuffle-button.png"
            }, {
                img: self.fullScreenN_img = new Image,
                src: self.skinPath_str + "full-screen.png"
            }, {
                img: self.ytbQualityN_img = new Image,
                src: self.skinPath_str + "youtube-quality.png"
            }, {
                img: self.facebookN_img = new Image,
                src: self.skinPath_str + "facebook.png"
            }, {
                img: self.infoN_img = new Image,
                src: self.skinPath_str + "info-button.png"
            }, {
                img: self.downloadN_img = new Image,
                src: self.skinPath_str + "download-button.png"
            }, {
                img: self.normalScreenN_img = new Image,
                src: self.skinPath_str + "normal-screen.png"
            }, {
                img: self.embedN_img = new Image,
                src: self.skinPath_str + "embed.png"
            }, {
                img: self.embedColoseN_img = new Image,
                src: self.skinPath_str + "embed-close-button.png"
            }, {
                img: self.skipIconPath_img = new Image,
                src: self.skinPath_str + "skip-icon.png"
            }];
            self.prevSPath_str = self.skinPath_str + "prev-video-over.png";
            self.nextSPath_str = self.skinPath_str + "next-video-over.png";
            self.playSPath_str = self.skinPath_str + "play-over.png";
            self.pauseSPath_str = self.skinPath_str + "pause-over.png";
            self.bkMiddlePath_str = self.skinPath_str + "controller-middle.png";
            self.hdPath_str = self.skinPath_str + "hd.png";
            self.youtubeQualityArrowPath_str = self.skinPath_str + "youtube-quality-arrow.png";
            self.ytbQualityButtonPointerPath_str = self.skinPath_str + "youtube-quality-pointer.png";
            self.controllerBkPath_str = self.skinPath_str + "controller-background.png";
            self.skipIconSPath_str = self.skinPath_str + "skip-icon-over.png";
            self.adsBackgroundPath_str = self.skinPath_str + "ads-background.png";
            self.mainScrubberBkRightPath_str = self.skinPath_str + "scrubber-right-background.png";
            self.mainScrubberBkMiddlePath_str = self.skinPath_str + "scrubber-middle-background.png";
            self.mainScrubberDragMiddlePath_str = self.skinPath_str + "scrubber-middle-drag.png";
            self.volumeScrubberBkBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-background.png";
            self.volumeScrubberBkMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-background.png";
            self.volumeScrubberBkTopPath_str = self.skinPath_str + "volume-scrubber-top-background.png";
            self.volumeScrubberDragBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-drag.png";
            self.volumeScrubberLinePath_str = self.skinPath_str + "volume-scrubber-line.png";
            self.volumeScrubberDragMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-drag.png";
            self.volumeSPath_str = self.skinPath_str + "volume-over.png";
            self.volumeDPath_str = self.skinPath_str + "volume-disabled.png";
            self.categoriesSPath_str = self.skinPath_str + "categories-button-over.png";
            self.replaySPath_str = self.skinPath_str + "replay-button-over.png";
            self.toopTipBk_str = self.skinPath_str + "tooltip-background.png";
            self.toopTipPointer_str = self.skinPath_str + "tooltip-pointer.png";
            self.shufflePathS_str = self.skinPath_str + "shuffle-button-over.png";
            self.largePlayS_str = self.skinPath_str + "large-play-over.png";
            self.fullScreenSPath_str = self.skinPath_str + "full-screen-over.png";
            self.ytbQualitySPath_str = self.skinPath_str + "youtube-quality-over.png";
            self.ytbQualityDPath_str = self.skinPath_str + "youtube-quality-hd.png";
            self.facebookSPath_str = self.skinPath_str + "facebook-over.png";
            self.infoSPath_str = self.skinPath_str + "info-button-over.png";
            self.downloadSPath_str = self.skinPath_str + "download-button-over.png";
            self.normalScreenSPath_str = self.skinPath_str + "normal-screen-over.png";
            self.progressMiddlePath_str = self.skinPath_str + "progress-middle.png";
            self.embedPathS_str = self.skinPath_str + "embed-over.png";
            self.embedWindowClosePathS_str = self.skinPath_str + "embed-close-button-over.png";
            self.embedWindowInputBackgroundPath_str = self.skinPath_str + "embed-window-input-background.png";
            self.embedCopyButtonNPath_str = self.skinPath_str + "embed-copy-button.png";
            self.embedCopyButtonSPath_str = self.skinPath_str + "embed-copy-button-over.png";
            self.sendButtonNPath_str = self.skinPath_str + "send-button.png";
            self.sendButtonSPath_str = self.skinPath_str + "send-button-over.png";
            self.embedWindowBackground_str = self.skinPath_str + "embed-window-background.png";
            if (self.showPlaylistsButtonAndPlaylists_bl) {
                self.skinPaths_ar.push({
                    img: self.catNextN_img = new Image,
                    src: self.skinPath_str + "categories-next-button.png"
                }, {
                    img: self.catPrevN_img = new Image,
                    src: self.skinPath_str + "categories-prev-button.png"
                }, {
                    img: self.catCloseN_img = new Image,
                    src: self.skinPath_str + "categories-close-button.png"
                }, {
                    img: new Image,
                    src: self.skinPath_str + "categories-background.png"
                });
                self.catBkPath_str = self.skinPath_str + "categories-background.png";
                self.catThumbBkPath_str = self.skinPath_str + "categories-thumbnail-background.png";
                self.catThumbBkTextPath_str = self.skinPath_str + "categories-thumbnail-text-backgorund.png";
                self.catNextSPath_str = self.skinPath_str + "categories-next-button-over.png";
                self.catPrevSPath_str = self.skinPath_str + "categories-prev-button-over.png";
                self.catCloseSPath_str = self.skinPath_str + "categories-close-button-over.png"
            }
            if (self.showPlaylistButtonAndPlaylist_bl) {
                var o;
                self.playlistThumbnailsBkPath_str = self.skinPath_str + "playlist-thumbnail-background.png";
                self.playlistBkPath_str = self.skinPath_str + "playlist-background.png";
                if (self.playlistPosition_str == "bottom") {
                    self.skinPaths_ar.push({
                        img: self.hidePlaylistN_img = new Image,
                        src: self.skinPath_str + "hide-horizontal-playlist.png"
                    }, {
                        img: self.showPlaylistN_img = new Image,
                        src: self.skinPath_str + "show-horizontal-playlist.png"
                    });
                    self.hidePlaylistSPath_str = self.skinPath_str + "hide-horizontal-playlist-over.png";
                    self.showPlaylistSPath_str = self.skinPath_str + "show-horizontal-playlist-over.png"
                } else {
                    self.skinPaths_ar.push({
                        img: self.hidePlaylistN_img = new Image,
                        src: self.skinPath_str + "hide-vertical-playlist.png"
                    }, {
                        img: self.showPlaylistN_img = new Image,
                        src: self.skinPath_str + "show-vertical-playlist.png"
                    });
                    self.hidePlaylistSPath_str = self.skinPath_str + "hide-vertical-playlist-over.png";
                    self.showPlaylistSPath_str = self.skinPath_str + "show-vertical-playlist-over.png"
                }
                self.skinPaths_ar.push({
                    img: self.scrBkTop_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-background-top.png"
                }, {
                    img: self.scrDragTop_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-drag-top.png"
                }, {
                    img: self.scrLinesN_img = new Image,
                    src: self.skinPath_str + "playlist-scrollbar-lines.png"
                });
                self.scrBkMiddlePath_str = self.skinPath_str + "playlist-scrollbar-background-middle.png";
                self.scrBkBottomPath_str = self.skinPath_str + "playlist-scrollbar-background-bottom.png";
                self.scrDragMiddlePath_str = self.skinPath_str + "playlist-scrollbar-drag-middle.png";
                self.scrDragBottomPath_str = self.skinPath_str + "playlist-scrollbar-drag-bottom.png";
                self.scrLinesSPath_str = self.skinPath_str + "playlist-scrollbar-lines-over.png";
                self.inputArrowPath_str = self.skinPath_str + "input-arrow.png"
            }
            self.totalGraphics = self.skinPaths_ar.length;
            self.loadSkin()
        };
        this.onPreloaderLoadHandler = function() {
            setTimeout(function() {
                self.dispatchEvent(FWDUVPData.PRELOADER_LOAD_DONE)
            }, 50)
        };
        self.loadSkin = function() {
            var e;
            var t;
            for (var n = 0; n < self.totalGraphics; n++) {
                e = self.skinPaths_ar[n].img;
                t = self.skinPaths_ar[n].src;
                e.onload = self.onSkinLoadHandler;
                e.onerror = self.onSkinLoadErrorHandler;
                e.src = t
            }
        };
        this.onSkinLoadHandler = function(e) {
            self.countLoadedSkinImages++;
            if (self.countLoadedSkinImages == self.totalGraphics) {
                setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.SKIN_LOAD_COMPLETE)
                }, 50)
            }
        };
        self.onSkinLoadErrorHandler = function(e) {
            if (FWDUVPUtils.isIEAndLessThen9) {
                message = "Graphics image not found!"
            } else {
                message = "The skin icon with label <font color='#FFFFFF'>" + e.target.src + "</font> can't be loaded, check path!"
            }
            if (window.console) console.log(e);
            var t = {
                text: message
            };
            setTimeout(function() {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, t)
            }, 50)
        };
        this.downloadVideo = function(e, t) {
            if (document.location.protocol == "file:") {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Downloading video files local is not allowed or possible! To function properly please test online."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (!e) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Not allowed to download this video!"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (String(e.indexOf(".mp4")) == -1) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Only mp4 video files hosted on your server can be downloaded."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            t = t.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
            if (t.length > 40) t = t.substr(0, 40) + "...";
            if (!/\.(video)$/i.test(t)) t += ".mp4";
            if (e.indexOf("http:") == -1) {
                var n = e.split(",");
                e = n[0];
                e = e.substr(e.indexOf("/") + 1);
                e = encodeURIComponent(e)
            }
            var r = self.videoDownloaderPath_str;
            if (!self.dlIframe) {
                self.dlIframe = document.createElement("IFRAME");
                self.dlIframe.style.display = "none";
                document.documentElement.appendChild(self.dlIframe)
            }
            if (self.isMobile_bl) {
                var i = self.getValidEmail();
                if (!i) return;
                if (self.emailXHR != null) {
                    try {
                        self.emailXHR.abort()
                    } catch (s) {}
                    self.emailXHR.onreadystatechange = null;
                    self.emailXHR.onerror = null;
                    self.emailXHR = null
                }
                self.emailXHR = new XMLHttpRequest;
                self.emailXHR.onreadystatechange = function(e) {
                    if (self.emailXHR.readyState == 4) {
                        if (self.emailXHR.status == 200) {
                            if (self.emailXHR.responseText == "sent") {
                                alert("Email sent.")
                            } else {
                                alert("Error sending email, this is a server side error, the php file can't send the email!")
                            }
                        } else {
                            alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText)
                        }
                    }
                };
                self.emailXHR.onerror = function(e) {
                    try {
                        if (window.console) console.log(e);
                        if (window.console) console.log(e.message)
                    } catch (e) {}
                    alert("Error sending email: " + e.message)
                };
                self.emailXHR.open("get", self.mailPath_str + "?mail=" + i + "&name=" + t + "&path=" + e, true);
                self.emailXHR.send();
                return
            }
            self.dlIframe.src = r + "?path=" + e + "&name=" + t
        };
        this.getValidEmail = function() {
            var e = prompt("Please enter your email address where the video download link will be sent:");
            var t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            while (!t.test(e) || e == "") {
                if (e === null) return;
                e = prompt("Please enter a valid email address:")
            }
            return e
        };
        this.loadPlaylist = function(e) {
            self.stopToLoadPlaylist();
            if (self.isPlaylistDispatchingError_bl) return;
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            var t = self.catsRef_ar[e];
            if (t === undefined) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "<font color='#FFFFFF'>loadPlaylist()</font> - Please specify a DOM playlist id or youtube playlist id!"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (t === null) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "The playlist with id <font color='#FFFFFF'>" + self.cats_ar[e].source + "</font> is not found in the DOM."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            if (!isNaN(t)) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "<font color='#FFFFFF'>loadPlaylist()</font> - The parameter must be of type string!"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            self.resetYoutubePlaylistLoader();
            self.isYoutbe_bl = false;
            if (!t.length) {
                self.parseDOMPlaylist(t, self.cats_ar[e].source)
            } else if (t.indexOf("list=") != -1 && self.useYoutube_bl) {
                self.isYoutbe_bl = true;
                self.loadYoutubePlaylist(t)
            } else if (t.indexOf("list=") != -1 && !self.useYoutube_bl) {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Loading youtube playlist is only possible if <font color='#FFFFFF'>FWDUVPlayer.useYoutube=\"yes\"</font>."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            } else if (t.indexOf("folder=") != -1) {
                self.loadFolderPlaylist(t)
            } else if (t.indexOf(".xml") != -1 || t.indexOf("http:") != -1 || t.indexOf("https:") != -1 || t.indexOf("www.") != -1) {
                self.loadXMLPlaylist(t)
            }
        };
        this.loadXMLPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            if (document.location.protocol == "file:") {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Loading XML files local is not allowed or possible!. To function properly please test online."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            self.loadFromFolder_bl = false;
            self.sourceURL_str = e;
            self.xhr = new XMLHttpRequest;
            self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
            self.xhr.onerror = self.ajaxOnErrorHandler;
            try {
                self.xhr.open("get", self.proxyPath_str + "?url=" + self.sourceURL_str + "&rand=" + parseInt(Math.random() * 99999999), true);
                self.xhr.send()
            } catch (t) {
                var n = t;
                if (t) {
                    if (t.message) n = t.message
                }
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "XML file can't be loaded! <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. " + n
                })
            }
        };
        this.loadFolderPlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl) return;
            if (document.location.protocol == "file:") {
                self.isPlaylistDispatchingError_bl = true;
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Creating a video playlist from a folder is not allowed or possible local! To function properly please test online."
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            self.loadFromFolder_bl = true;
            self.sourceURL_str = e.substr(e.indexOf("=") + 1);
            self.xhr = new XMLHttpRequest;
            self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
            self.xhr.onerror = self.ajaxOnErrorHandler;
            try {
                self.xhr.open("get", self.proxyFolderPath_str + "?dir=" + encodeURIComponent(self.sourceURL_str) + "&videoLabel=" + self.folderVideoLabel_str + "&rand=" + parseInt(Math.random() * 9999999), true);
                self.xhr.send()
            } catch (t) {
                var n = t;
                if (t) {
                    if (t.message) n = t.message
                }
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"
                })
            }
        };
        this.loadYoutubePlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl && !self.isYoutbe_bl) return;
            if (!self.youtubeUrl_str) {
                e = e.substr(e.indexOf("=") + 1);
                self.youtubeUrl_str = e
            }
            self.loadFromFolder_bl = true;
            if (self.nextPageToken_str) {
                self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist"
            } else {
                self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist"
            }
            if (self.scs_el == null) {
                try {
                    self.scs_el = document.createElement("script");
                    self.scs_el.src = self.sourceURL_str;
                    self.scs_el.id = parent.instanceName_str + ".data.parseYoutubePlaylist";
                    document.documentElement.appendChild(self.scs_el)
                } catch (t) {}
            }
            self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 6e3)
        };
        this.JSONPRequestTimeoutError = function() {
            self.stopToLoadPlaylist();
            self.isPlaylistDispatchingError_bl = true;
            showLoadPlaylistErrorId_to = setTimeout(function() {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading youtube playlist!<font color='#FFFFFF'>" + self.youtubeUrl_str + "</font>"
                });
                self.isPlaylistDispatchingError_bl = false
            }, 50);
            return
        };
        this.resetYoutubePlaylistLoader = function() {
            self.isYoutbe_bl = false;
            self.youtubeObject_ar = null;
            self.nextPageToken_str = null;
            self.youtubeUrl_str = null
        };
        this.ajaxOnErrorHandler = function(e) {
            try {
                if (window.console) console.log(e);
                if (window.console) console.log(e.message)
            } catch (e) {}
            if (self.loadFromFolder_bl) {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"
                })
            } else {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#FFFFFF'>" + self.proxyPath_str + "</font>. Make sure the path is correct"
                })
            }
        };
        this.ajaxOnLoadHandler = function(e) {
            var response;
            var isXML = false;
            if (self.xhr.readyState == 4) {
                if (self.xhr.status == 404) {
                    if (self.loadFromFolder_bl) {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"
                        })
                    } else {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Proxy file path is not found: <font color='#FFFFFF'>" + self.proxyPath_str + "</font>"
                        })
                    }
                } else if (self.xhr.status == 408) {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Proxy file request load timeout!"
                    })
                } else if (self.xhr.status == 200) {
                    if (self.xhr.responseText.indexOf("<b>Warning</b>:") != -1) {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Error loading folder: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"
                        });
                        return
                    }
                    if (window.JSON) {
                        response = JSON.parse(self.xhr.responseText)
                    } else {
                        response = eval("(" + self.xhr.responseText + ")")
                    }
                    if (response.folder) {
                        self.parseFolderJSON(response)
                    } else if (response.li) {
                        self.parseXML(response)
                    } else if (response.error) {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Error loading file: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"
                        })
                    }
                }
            }
        };
        this.parseYoutubePlaylist = function(e) {
            if (self.isPlaylistDispatchingError_bl || !self.isYoutbe_bl) return;
            if (e.error) {
                self.JSONPRequestTimeoutError();
                if (console) console.dir(e);
                return
            }
            self.playlist_ar = [];
            var t;
            var n;
            var r;
            if (!self.youtubeObject_ar) {
                self.youtubeObject_ar = []
            }
            for (var i = 0; i < e.items.length; i++) {
                self.youtubeObject_ar.push(e.items[i])
            }
            t = self.youtubeObject_ar.length;
            self.stopToLoadPlaylist();
            if (e.nextPageToken && t < self.maxPlaylistItems) {
                self.nextPageToken_str = e.nextPageToken;
                self.loadYoutubePlaylist();
                return
            }
            for (var i = 0; i < t; i++) {
                if (i > self.maxPlaylistItems - 1) break;
                var s = {};
                n = self.youtubeObject_ar[i];
                s.videoSource = n.snippet.resourceId.videoId;
                s.owner = n.snippet.channelTitle;
                s.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + n.snippet.title + "</p>";
                s.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + s.owner + "</p>";
                s.titleText = n.snippet.title;
                s.desc = undefined;
                s.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + n.snippet.title + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + n.snippet.description + "</p>";
                s.downloadable = false;
                try {
                    s.thumbSource = n.snippet.thumbnails["default"].url
                } catch (o) {}
                s.posterSource = "none";
                if (n.snippet.title.indexOf("eleted video") == -1 && n.snippet.title.indexOf("his video is unavailable") == -1) {
                    self.playlist_ar.push(s)
                }
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.closeJsonPLoader = function() {
            clearTimeout(self.JSONPRequestTimeoutId_to)
        };
        this.parseDOMPlaylist = function(e, t) {
            if (self.isPlaylistDispatchingError_bl) return;
            var n = FWDUVPUtils.getChildren(e);
            var r = n.length;
            var i;
            self.playlist_ar = [];
            if (r == 0) {
                showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "At least one video is required in the playlist with id: <font color='#FFFFFF'>" + t + "</font>"
                    });
                    self.isPlaylistDispatchingError_bl = false
                }, 50);
                return
            }
            for (var s = 0; s < r; s++) {
                var o = {};
                var u;
                i = n[s];
                if (!FWDUVPUtils.hasAttribute(i, "data-thumb-source")) {
                    self.isPlaylistDispatchingError_bl = true;
                    showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-thumb-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (s + 1)
                        })
                    }, 50);
                    return
                }
                if (!FWDUVPUtils.hasAttribute(i, "data-video-source")) {
                    self.isPlaylistDispatchingError_bl = true;
                    showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#FFFFFF'>data-video-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (s + 1)
                        })
                    }, 50);
                    return
                }
                if (s > self.maxPlaylistItems - 1) break;
                o.thumbSource = encodeURI(FWDUVPUtils.getAttributeValue(i, "data-thumb-source"));
                o.videoSource = encodeURI(FWDUVPUtils.getAttributeValue(i, "data-video-source"));
                if (FWDUVPUtils.hasAttribute(i, "data-poster-source")) {
                    o.posterSource = encodeURI(FWDUVPUtils.getAttributeValue(i, "data-poster-source"))
                } else {
                    o.posterSource = "none"
                }
                o.downloadPath = o.videoSource;
                if (FWDUVPUtils.hasAttribute(i, "data-downloadable") && self.showDownloadVideoButton_bl) {
                    o.downloadable = FWDUVPUtils.getAttributeValue(i, "data-downloadable") == "yes" ? true : false;
                    if (o.videoSource.indexOf(".") == -1) o.downloadable = false
                } else {
                    o.downloadable = false
                }
                var a = FWDUVPUtils.getChildren(i);
                var f;
                o.title = "not defined!";
                o.titleText = "not defined!";
                for (var l = 0; l < a.length; l++) {
                    f = a[l];
                    if (FWDUVPUtils.hasAttribute(f, "data-video-short-description")) {
                        o.title = f.innerHTML;
                        if (FWDUVPUtils.isIEAndLessThen9) {
                            o.titleText = f.innerText
                        } else {
                            o.titleText = f.textContent
                        }
                    } else if (FWDUVPUtils.hasAttribute(f, "data-video-long-description")) {
                        o.desc = f.innerHTML
                    }
                }
                if (FWDUVPUtils.hasAttribute(i, "data-ads-source")) {
                    u = {};
                    u.source = FWDUVPUtils.getAttributeValue(i, "data-ads-source");
                    u.pageToOpen = FWDUVPUtils.getAttributeValue(i, "data-ads-page-to-open-url");
                    u.pageTarget = FWDUVPUtils.getAttributeValue(i, "data-ads-page-target") || "_blank";
                    u.timeToHoldAds = parseInt(FWDUVPUtils.getAttributeValue(i, "data-time-to-hold-ads")) || 0;
                    o.ads = u
                }
                self.playlist_ar[s] = o
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseFolderJSON = function(e) {
            self.playlist_ar = [];
            var t;
            var n = e.folder;
            var r = 0;
            for (var i = 0; i < n.length; i++) {
                t = {};
                t.videoSource = encodeURI(n[i]["@attributes"]["data-video-path"]);
                t.thumbSource = encodeURI(n[i]["@attributes"]["data-thumb-path"]);
                t.posterSource = encodeURI(n[i]["@attributes"]["data-poster-path"]);
                t.downloadPath = encodeURIComponent(n[i]["@attributes"]["download-path"]);
                t.downloadable = self.showDownloadVideoButton_bl;
                if (self.forceDisableDownloadButtonForFolder_bl) t.downloadable = false;
                t.titleText = n[i]["@attributes"]["data-title"];
                t.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + n[i]["@attributes"]["data-title"] + "</p>";
                t.desc = undefined;
                self.playlist_ar[i] = t;
                if (i > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.parseXML = function(e) {
            self.playlist_ar = [];
            var t;
            var n = e.li;
            if (!n.length) n = [n];
            for (var r = 0; r < n.length; r++) {
                t = {};
                t.videoSource = encodeURI(n[r]["@attributes"]["data-video-source"]);
                t.downloadPath = t.videoSource;
                t.downloadable = n[r]["@attributes"]["data-downloadable"] == "yes" ? true : false;
                if (t.videoSource.indexOf(".") == -1) t.downloadable = false;
                t.posterSource = encodeURI(n[r]["@attributes"]["data-poster-source"]);
                t.thumbSource = n[r]["@attributes"]["data-thumb-source"];
                t.title = n[r]["@attributes"]["data-title"];
                t.titleText = n[r]["@attributes"]["data-title"];
                t.desc = n[r]["@attributes"]["data-desc"];
                if (n[r]["@attributes"]["data-ads-source"]) {
                    adsObj = {};
                    adsObj.source = n[r]["@attributes"]["data-ads-source"];
                    adsObj.pageToOpen = n[r]["@attributes"]["data-ads-page-to-open-url"];
                    adsObj.pageTarget = n[r]["@attributes"]["data-ads-page-target"] || "_blank";
                    adsObj.timeToHoldAds = n[r]["@attributes"]["data-time-to-hold-ads"] || 0;
                    t.ads = adsObj
                }
                self.playlist_ar[r] = t;
                if (r > self.maxPlaylistItems - 1) break
            }
            clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
            self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
            }, 50);
            self.isDataLoaded_bl = true
        };
        this.stopToLoadPlaylist = function() {
            self.closeJsonPLoader();
            try {
                self.scs_el.src = null;
                document.documentElement.removeChild(self.scs_el);
                self.scs_el = null
            } catch (e) {}
            if (self.xhr != null) {
                try {
                    self.xhr.abort()
                } catch (e) {}
                self.xhr.onreadystatechange = null;
                self.xhr.onerror = null;
                self.xhr = null
            }
        };
        self.showPropertyError = function(e) {
            self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                text: "The property called <font color='#FFFFFF'>" + e + "</font> is not defined."
            })
        };
        self.init()
    };
    FWDUVPData.setPrototype = function() {
        FWDUVPData.prototype = new FWDUVPEventDispatcher
    };
    FWDUVPData.prototype = null;
    FWDUVPData.PLAYLIST_LOAD_COMPLETE = "playlistLoadComplete";
    FWDUVPData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
    FWDUVPData.LOAD_DONE = "onLoadDone";
    FWDUVPData.LOAD_ERROR = "onLoadError";
    FWDUVPData.IMAGE_LOADED = "onImageLoaded";
    FWDUVPData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
    FWDUVPData.SKIN_PROGRESS = "onSkinProgress";
    FWDUVPData.IMAGES_PROGRESS = "onImagesPogress";
    window.FWDUVPData = FWDUVPData
})(window);
(function(e) {
    var t = function(e, t, n, r) {
        var i = this;
        i.listeners = {
            events_ar: []
        };
        if (e == "div" || e == "img" || e == "canvas" || "input") {
            i.type = e
        } else {
            throw Error("Type is not valid! " + e)
        }
        this.children_ar = [];
        this.style;
        this.screen;
        this.transform;
        this.position = t || "absolute";
        this.overflow = n || "hidden";
        this.display = r || "inline-block";
        this.visible = true;
        this.buttonMode;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.rect;
        this.alpha = 1;
        this.innerHTML = "";
        this.opacityType = "";
        this.isHtml5_bl = false;
        this.hasTransform3d_bl = FWDUVPUtils.hasTransform3d;
        this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d;
        if (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) i.hasTransform3d_bl = false;
        if (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) i.hasTransform2d_bl = false;
        this.hasBeenSetSelectable_bl = false;
        i.init = function() {
            i.setScreen()
        };
        i.getTransform = function() {
            var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"];
            var t;
            while (t = e.shift()) {
                if (typeof i.screen.style[t] !== "undefined") {
                    return t
                }
            }
            return false
        };
        i.getOpacityType = function() {
            var e;
            if (typeof i.screen.style.opacity != "undefined") {
                e = "opacity"
            } else {
                e = "filter"
            }
            return e
        };
        i.setScreen = function(e) {
            if (i.type == "img" && e) {
                i.screen = null;
                i.screen = e;
                i.setMainProperties()
            } else {
                i.screen = document.createElement(i.type);
                i.setMainProperties()
            }
        };
        i.setMainProperties = function() {
            i.transform = i.getTransform();
            i.setPosition(i.position);
            i.setOverflow(i.overflow);
            i.opacityType = i.getOpacityType();
            if (i.opacityType == "opacity") i.isHtml5_bl = true;
            if (i.opacityType == "filter") i.screen.style.filter = "inherit";
            i.screen.style.left = "0px";
            i.screen.style.top = "0px";
            i.screen.style.margin = "0px";
            i.screen.style.padding = "0px";
            i.screen.style.maxWidth = "none";
            i.screen.style.maxHeight = "none";
            i.screen.style.border = "none";
            i.screen.style.lineHeight = "1";
            i.screen.style.backgroundColor = "transparent";
            i.screen.style.backfaceVisibility = "hidden";
            i.screen.style.webkitBackfaceVisibility = "hidden";
            i.screen.style.MozBackfaceVisibility = "hidden";
            i.screen.style.MozImageRendering = "optimizeSpeed";
            i.screen.style.WebkitImageRendering = "optimizeSpeed";
            if (e == "img") {
                i.setWidth(i.screen.width);
                i.setHeight(i.screen.height)
            }
        };
        i.setBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "visible";
            i.screen.style.webkitBackfaceVisibility = "visible";
            i.screen.style.MozBackfaceVisibility = "visible"
        };
        i.setSelectable = function(e) {
            if (!e) {
                i.screen.style.userSelect = "none";
                i.screen.style.MozUserSelect = "none";
                i.screen.style.webkitUserSelect = "none";
                i.screen.style.khtmlUserSelect = "none";
                i.screen.style.oUserSelect = "none";
                i.screen.style.msUserSelect = "none";
                i.screen.msUserSelect = "none";
                i.screen.ondragstart = function(e) {
                    return false
                };
                i.screen.onselectstart = function() {
                    return false
                };
                i.screen.ontouchstart = function() {
                    return false
                };
                i.screen.style.webkitTouchCallout = "none";
                i.hasBeenSetSelectable_bl = true
            } else {
                if (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) {
                    i.screen.style.userSelect = "element";
                    i.screen.style.MozUserSelect = "element";
                    i.screen.style.msUserSelect = "element"
                } else if (FWDUVPUtils.isSafari) {
                    i.screen.style.userSelect = "text";
                    i.screen.style.webkitUserSelect = "text"
                } else {
                    i.screen.style.userSelect = "all";
                    i.screen.style.webkitUserSelect = "all"
                }
                i.screen.style.khtmlUserSelect = "all";
                i.screen.style.oUserSelect = "all";
                if (FWDUVPUtils.isIEAndLessThen9) {
                    i.screen.ondragstart = null;
                    i.screen.onselectstart = null;
                    i.screen.ontouchstart = null
                } else {
                    i.screen.ondragstart = undefined;
                    i.screen.onselectstart = undefined;
                    i.screen.ontouchstart = undefined
                }
                i.screen.style.webkitTouchCallout = "default";
                i.hasBeenSetSelectable_bl = false
            }
        };
        i.getScreen = function() {
            return i.screen
        };
        i.setVisible = function(e) {
            i.visible = e;
            if (i.visible == true) {
                i.screen.style.visibility = "visible"
            } else {
                i.screen.style.visibility = "hidden"
            }
        };
        i.getVisible = function() {
            return i.visible
        };
        i.setResizableSizeAfterParent = function() {
            i.screen.style.width = "100%";
            i.screen.style.height = "100%"
        };
        i.getStyle = function() {
            return i.screen.style
        };
        i.setOverflow = function(e) {
            i.overflow = e;
            i.screen.style.overflow = i.overflow
        };
        i.setPosition = function(e) {
            i.position = e;
            i.screen.style.position = i.position
        };
        i.setDisplay = function(e) {
            i.display = e;
            i.screen.style.display = i.display
        };
        i.setButtonMode = function(e) {
            i.buttonMode = e;
            if (i.buttonMode == true) {
                i.screen.style.cursor = "pointer"
            } else {
                i.screen.style.cursor = "default"
            }
        };
        i.setBkColor = function(e) {
            i.screen.style.backgroundColor = e
        };
        i.setInnerHTML = function(e) {
            i.innerHTML = e;
            i.screen.innerHTML = i.innerHTML
        };
        i.getInnerHTML = function() {
            return i.innerHTML
        };
        i.getRect = function() {
            return i.screen.getBoundingClientRect()
        };
        i.setAlpha = function(e) {
            i.alpha = e;
            if (i.opacityType == "opacity") {
                i.screen.style.opacity = i.alpha
            } else if (i.opacityType == "filter") {
                i.screen.style.filter = "alpha(opacity=" + i.alpha * 100 + ")";
                i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(i.alpha * 100) + ")"
            }
        };
        i.getAlpha = function() {
            return i.alpha
        };
        i.getRect = function() {
            return i.screen.getBoundingClientRect()
        };
        i.getGlobalX = function() {
            return i.getRect().left
        };
        i.getGlobalY = function() {
            return i.getRect().top
        };
        i.setX = function(e) {
            i.x = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.left = i.x + "px"
            }
        };
        i.getX = function() {
            return i.x
        };
        i.setY = function(e) {
            i.y = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.top = i.y + "px"
            }
        };
        i.getY = function() {
            return i.y
        };
        i.setWidth = function(e) {
            i.w = e;
            if (i.type == "img") {
                i.screen.width = i.w;
                i.screen.style.width = i.w + "px"
            } else {
                i.screen.style.width = i.w + "px"
            }
        };
        i.getWidth = function() {
            if (i.type == "div" || i.type == "input") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            } else if (i.type == "img") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                if (i.screen.width != 0) return i.screen.width;
                return i._w
            } else if (i.type == "canvas") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            }
        };
        i.setHeight = function(e) {
            i.h = e;
            if (i.type == "img") {
                i.screen.height = i.h;
                i.screen.style.height = i.h + "px"
            } else {
                i.screen.style.height = i.h + "px"
            }
        };
        i.getHeight = function() {
            if (i.type == "div" || i.type == "input") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            } else if (i.type == "img") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                if (i.screen.height != 0) return i.screen.height;
                return i.h
            } else if (i.type == "canvas") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            }
        };
        i.addChild = function(e) {
            if (i.contains(e)) {
                i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1);
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            } else {
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            }
        };
        i.removeChild = function(e) {
            if (i.contains(e)) {
                i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1);
                i.screen.removeChild(e.screen)
            } else {
                throw Error("##removeChild()## Child dose't exist, it can't be removed!")
            }
        };
        i.contains = function(e) {
            if (FWDUVPUtils.indexOfArray(i.children_ar, e) == -1) {
                return false
            } else {
                return true
            }
        };
        i.addChildAt = function(e, t) {
            if (i.getNumChildren() == 0) {
                i.children_ar.push(e);
                i.screen.appendChild(e.screen)
            } else if (t == 1) {
                i.screen.insertBefore(e.screen, i.children_ar[0].screen);
                i.screen.insertBefore(i.children_ar[0].screen, e.screen);
                if (i.contains(e)) {
                    i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1, e)
                } else {
                    i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 0, e)
                }
            } else {
                if (t < 0 || t > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                i.screen.insertBefore(e.screen, i.children_ar[t].screen);
                if (i.contains(e)) {
                    i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 1, e)
                } else {
                    i.children_ar.splice(FWDUVPUtils.indexOfArray(i.children_ar, e), 0, e)
                }
            }
        };
        i.getChildAt = function(e) {
            if (e < 0 || e > i.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (i.getNumChildren() == 0) throw Error("##getChildAt## Child dose not exist!");
            return i.children_ar[e]
        };
        i.removeChildAtZero = function() {
            i.screen.removeChild(i.children_ar[0].screen);
            i.children_ar.shift()
        };
        i.getNumChildren = function() {
            return i.children_ar.length
        };
        i.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        i.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        i.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        i.disposeImage = function() {
            if (i.type == "img") i.screen.src = null
        };
        i.destroy = function() {
            if (i.hasBeenSetSelectable_bl) {
                i.screen.ondragstart = null;
                i.screen.onselectstart = null;
                i.screen.ontouchstart = null
            }
            i.screen.removeAttribute("style");
            i.listeners = [];
            i.listeners = null;
            i.children_ar = [];
            i.children_ar = null;
            i.style = null;
            i.screen = null;
            i.transform = null;
            i.position = null;
            i.overflow = null;
            i.display = null;
            i.visible = null;
            i.buttonMode = null;
            i.x = null;
            i.y = null;
            i.w = null;
            i.h = null;
            i.rect = null;
            i.alpha = null;
            i.innerHTML = null;
            i.opacityType = null;
            i.isHtml5_bl = null;
            i.hasTransform3d_bl = null;
            i.hasTransform2d_bl = null;
            i = null
        };
        i.init()
    };
    e.FWDUVPDisplayObject = t
})(window);
if (typeof asual == "undefined") {
    var asual = {}
}
if (typeof asual.util == "undefined") {
    asual.util = {}
}
asual.util.Browser = new function() {
    var e = navigator.userAgent.toLowerCase(),
        t = /webkit/.test(e),
        n = /opera/.test(e),
        r = /msie/.test(e) && !/opera/.test(e),
        i = /mozilla/.test(e) && !/(compatible|webkit)/.test(e),
        s = parseFloat(r ? e.substr(e.indexOf("msie") + 4) : (e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function() {
        return "[class Browser]"
    };
    this.getVersion = function() {
        return s
    };
    this.isMSIE = function() {
        return r
    };
    this.isSafari = function() {
        return t
    };
    this.isOpera = function() {
        return n
    };
    this.isMozilla = function() {
        return i
    }
};
asual.util.Events = new function() {
    var e = "DOMContentLoaded",
        t = "onstop",
        n = window,
        r = document,
        i = [],
        s = asual.util,
        o = s.Browser,
        u = o.isMSIE(),
        a = o.isSafari();
    this.toString = function() {
        return "[class Events]"
    };
    this.addListener = function(t, n, r) {
        i.push({
            o: t,
            t: n,
            l: r
        });
        if (!(n == e && (u || a))) {
            if (t.addEventListener) {
                t.addEventListener(n, r, false)
            } else {
                if (t.attachEvent) {
                    t.attachEvent("on" + n, r)
                }
            }
        }
    };
    this.removeListener = function(t, n, r) {
        for (var s = 0, o; o = i[s]; s++) {
            if (o.o == t && o.t == n && o.l == r) {
                i.splice(s, 1);
                break
            }
        }
        if (!(n == e && (u || a))) {
            if (t.removeEventListener) {
                t.removeEventListener(n, r, false)
            } else {
                if (t.detachEvent) {
                    t.detachEvent("on" + n, r)
                }
            }
        }
    };
    var f = function() {
        for (var t = 0, n; n = i[t]; t++) {
            if (n.t != e) {
                s.Events.removeListener(n.o, n.t, n.l)
            }
        }
    };
    var l = function() {
        if (r.readyState == "interactive") {
            function e() {
                r.detachEvent(t, e);
                f()
            }
            r.attachEvent(t, e);
            n.setTimeout(function() {
                r.detachEvent(t, e)
            }, 0)
        }
    };
    if (u || a) {
        (function() {
            try {
                if (u && r.body || !/loaded|complete/.test(r.readyState)) {
                    r.documentElement.doScroll("left")
                }
            } catch (t) {
                return setTimeout(arguments.callee, 0)
            }
            for (var n = 0, t; t = i[n]; n++) {
                if (t.t == e) {
                    t.l.call(null)
                }
            }
        })()
    }
    if (u) {
        n.attachEvent("onbeforeunload", l)
    }
    this.addListener(n, "unload", f)
};
asual.util.Functions = new function() {
    this.toString = function() {
        return "[class Functions]"
    };
    this.bind = function(e, t, n) {
        for (var r = 2, i, s = []; i = arguments[r]; r++) {
            s.push(i)
        }
        return function() {
            return e.apply(t, s)
        }
    }
};
var FWDAddressEvent = function(e) {
    this.toString = function() {
        return "[object FWDAddressEvent]"
    };
    this.type = e;
    this.target = [FWDAddress][0];
    this.value = FWDAddress.getValue();
    this.path = FWDAddress.getPath();
    this.pathNames = FWDAddress.getPathNames();
    this.parameters = {};
    var t = FWDAddress.getParameterNames();
    for (var n = 0, r = t.length; n < r; n++) {
        this.parameters[t[n]] = FWDAddress.getParameter(t[n])
    }
    this.parameterNames = t
};
FWDAddressEvent.INIT = "init";
FWDAddressEvent.CHANGE = "change";
FWDAddressEvent.INTERNAL_CHANGE = "internalChange";
FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function() {
    var _getHash = function() {
        var e = _l.href.indexOf("#");
        return e != -1 ? _ec(_dc(_l.href.substr(e + 1))) : ""
    };
    var _getWindow = function () {
     
        try {
            
            top.document;
            return top
        } catch (e) {
     
            return window
        }
    };
    var _strictCheck = function(e, t) {
        if (_opts.strict) {
            e = t ? e.substr(0, 1) != "/" ? "/" + e : e : e == "" ? "/" : e
        }
        return e
    };
    var _ieLocal = function(e, t) {
        return _msie && _l.protocol == "file:" ? t ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?") : e
    };
    var _searchScript = function(e) {
        if (e.childNodes) {
            for (var t = 0, n = e.childNodes.length, r; t < n; t++) {
                if (e.childNodes[t].src) {
                    _url = String(e.childNodes[t].src)
                }
                if (r = _searchScript(e.childNodes[t])) {
                    return r
                }
            }
        }
    };
    var _titleCheck = function() {
        if (_d.title != _title && _d.title.indexOf("#") != -1) {
            _d.title = _title
        }
    };
    var _listen = function() {
        if (!_silent) {
            var e = _getHash();
            var t = !(_value == e);
            if (_safari && _version < 523) {
                if (_length != _h.length) {
                    _length = _h.length;
                    if (typeof _stack[_length - 1] != UNDEFINED) {
                        _value = _stack[_length - 1]
                    }
                    _update.call(this, false)
                }
            } else {
                if (_msie && t) {
                    if (_version < 7) {
                        _l.reload()
                    } else {
                        this.setValue(e)
                    }
                } else {
                    if (t) {
                        _value = e;
                        _update.call(this, false)
                    }
                }
            }
            if (_msie) {
                _titleCheck.call(this)
            }
        }
    };
    var _bodyClick = function(e) {
        if (_popup.length > 0) {
            var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
            if (typeof _popup[3] != UNDEFINED) {
                eval(_popup[3])
            }
        }
        _popup = []
    };
    var _swfChange = function() {
        for (var e = 0, t, n, r = FWDAddress.getValue(), i = "setFWDAddressValue"; t = _ids[e]; e++) {
            n = document.getElementById(t);
            if (n) {
                if (n.parentNode && typeof n.parentNode.so != UNDEFINED) {
                    n.parentNode.so.call(i, r)
                } else {
                    if (!(n && typeof n[i] != UNDEFINED)) {
                        var s = n.getElementsByTagName("object");
                        var o = n.getElementsByTagName("embed");
                        n = s[0] && typeof s[0][i] != UNDEFINED ? s[0] : o[0] && typeof o[0][i] != UNDEFINED ? o[0] : null
                    }
                    if (n) {
                        n[i](r)
                    }
                }
            } else {
                if (n = document[t]) {
                    if (typeof n[i] != UNDEFINED) {
                        n[i](r)
                    }
                }
            }
        }
    };
    var _jsDispatch = function(e) {
        this.dispatchEvent(new FWDAddressEvent(e));
        e = e.substr(0, 1).toUpperCase() + e.substr(1);
        if (typeof this["on" + e] == FUNCTION) {
            this["on" + e]()
        }
    };
    var _jsInit = function() {
        if (_util.Browser.isSafari()) {
            _d.body.addEventListener("click", _bodyClick)
        }
        _jsDispatch.call(this, "init")
    };
    var _jsChange = function() {
        _swfChange();
        _jsDispatch.call(this, "change")
    };
    var _update = function(e) {
        _jsChange.call(this);
        if (e) {
            _jsDispatch.call(this, "internalChange")
        } else {
            _jsDispatch.call(this, "externalChange")
        }
        _st(_functions.bind(_track, this), 10)
    };
    var _track = function() {
        var e = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, "");
        var t = _t[_opts.tracker];
        if (typeof t == FUNCTION) {
            t(e)
        } else {
            if (typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION) {
                _t.pageTracker._trackPageview(e)
            } else {
                if (typeof _t.urchinTracker == FUNCTION) {
                    _t.urchinTracker(e)
                }
            }
        }
    };
    var _htmlWrite = function() {
        var e = _frame.contentWindow.document;
        e.open();
        e.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";</script></head></html>');
        e.close()
    };
    var _htmlLoad = function() {
        var e = _frame.contentWindow;
        var t = e.location.href;
        _value = typeof e[ID] != UNDEFINED ? e[ID] : "";
        if (_value != _getHash()) {
            _update.call(FWDAddress, false);
            _l.hash = _ieLocal(_value, TRUE)
        }
    };
    var _load = function() {
        if (!_loaded) {
            _loaded = TRUE;
            if (_msie && _version < 8) {
                var e = _d.getElementsByTagName("frameset")[0];
                _frame = _d.createElement((e ? "" : "i") + "frame");
                if (e) {
                    e.insertAdjacentElement("beforeEnd", _frame);
                    e[e.cols ? "cols" : "rows"] += ",0";
                    _frame.src = "javascript:false";
                    _frame.noResize = true;
                    _frame.frameBorder = _frame.frameSpacing = 0
                } else {
                    _frame.src = "javascript:false";
                    _frame.style.display = "none";
                    _d.body.insertAdjacentElement("afterBegin", _frame)
                }
                _st(function() {
                    _events.addListener(_frame, "load", _htmlLoad);
                    if (typeof _frame.contentWindow[ID] == UNDEFINED) {
                        _htmlWrite()
                    }
                }, 50)
            } else {
                if (_safari) {
                    if (_version < 418) {
                        _d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>';
                        _form = _d.getElementById(ID)
                    }
                    if (typeof _l[ID] == UNDEFINED) {
                        _l[ID] = {}
                    }
                    if (typeof _l[ID][_l.pathname] != UNDEFINED) {
                        _stack = _l[ID][_l.pathname].split(",")
                    }
                }
            }
            _st(_functions.bind(function() {
                _jsInit.call(this);
                _jsChange.call(this);
                _track.call(this)
            }, this), 1);
            if (_msie && _version >= 8) {
                _d.body.onhashchange = _functions.bind(_listen, this);
                _si(_functions.bind(_titleCheck, this), 50)
            } else {
                _si(_functions.bind(_listen, this), 50)
            }
        }
    };
    var ID = "swfaddress",
        FUNCTION = "function",
        UNDEFINED = "undefined",
        TRUE = true,
        FALSE = false,
        _util = asual.util,
        _browser = _util.Browser,
        _events = _util.Events,
        _functions = _util.Functions,
        _version = _browser.getVersion(),
        _msie = _browser.isMSIE(),
        _mozilla = _browser.isMozilla(),
        _opera = _browser.isOpera(),
        _safari = _browser.isSafari(),
        _supported = FALSE,
        _t = _getWindow(),
        _d = _t.document,
        _h = _t.history,
        _l = _t.location,
        _si = setInterval,
        _st = setTimeout,
        _dc = decodeURI,
        _ec = encodeURI,
        _frame, _form, _url, _title = _d.title,
        _length = _h.length,
        _silent = FALSE,
        _loaded = FALSE,
        _justset = TRUE,
        _juststart = TRUE,
        _ref = this,
        _stack = [],
        _ids = [],
        _popup = [],
        _listeners = {},
        _value = _getHash(),
        _opts = {
            history: TRUE,
            strict: TRUE
        };
    if (_msie && _d.documentMode && _d.documentMode != _version) {
        _version = _d.documentMode != 8 ? 7 : 8
    }
    _supported = _mozilla && _version >= 1 || _msie && _version >= 6 || _opera && _version >= 9.5 || _safari && _version >= 312;
    if (_supported) {
        if (_opera) {
            history.navigationMode = "compatible"
        }
        for (var i = 1; i < _length; i++) {
            _stack.push("")
        }
        _stack.push(_getHash());
        if (_msie && _l.hash != _getHash()) {
            _l.hash = "#" + _ieLocal(_getHash(), TRUE)
        }
        _searchScript(document);
        var _qi = _url ? _url.indexOf("?") : -1;
        if (_qi != -1) {
            var param, params = _url.substr(_qi + 1).split("&");
            for (var i = 0, p; p = params[i]; i++) {
                param = p.split("=");
                if (/^(history|strict)$/.test(param[0])) {
                    _opts[param[0]] = isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : parseInt(param[1]) != 0
                }
                if (/^tracker$/.test(param[0])) {
                    _opts[param[0]] = param[1]
                }
            }
        }
        if (_msie) {
            _titleCheck.call(this)
        }
        if (window == _t) {
            _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this))
        }
        _events.addListener(_t, "load", _functions.bind(_load, this))
    } else {
        if (!_supported && _l.href.indexOf("#") != -1 || _safari && _version < 418 && _l.href.indexOf("#") != -1 && _l.search != "") {
            _d.open();
            _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>');
            _d.close()
        } else {
            _track()
        }
    }
    this.toString = function() {
        return "[class FWDAddress]"
    };
    this.back = function() {
        _h.back()
    };
    this.forward = function() {
        _h.forward()
    };
    this.up = function() {
        var e = this.getPath();
        this.setValue(e.substr(0, e.lastIndexOf("/", e.length - 2) + (e.substr(e.length - 1) == "/" ? 1 : 0)))
    };
    this.go = function(e) {
        _h.go(e)
    };
    this.href = function(e, t) {
        t = typeof t != UNDEFINED ? t : "_self";
        if (t == "_self") {
            self.location.href = e
        } else {
            if (t == "_top") {
                _l.href = e
            } else {
                if (t == "_blank") {
                    window.open(e)
                } else {
                    _t.frames[t].location.href = e
                }
            }
        }
    };
    this.popup = function(url, name, options, handler) {
        try {
            var popup = window.open(url, name, eval(options));
            if (typeof handler != UNDEFINED) {
                eval(handler)
            }
        } catch (ex) {}
        _popup = arguments
    };
    this.getIds = function() {
        return _ids
    };
    this.getId = function(e) {
        return _ids[0]
    };
    this.setId = function(e) {
        _ids[0] = e
    };
    this.addId = function(e) {
        this.removeId(e);
        _ids.push(e)
    };
    this.removeId = function(e) {
        for (var t = 0; t < _ids.length; t++) {
            if (e == _ids[t]) {
                _ids.splice(t, 1);
                break
            }
        }
    };
    this.addEventListener = function(e, t) {
        if (typeof _listeners[e] == UNDEFINED) {
            _listeners[e] = []
        }
        _listeners[e].push(t)
    };
    this.removeEventListener = function(e, t) {
        if (typeof _listeners[e] != UNDEFINED) {
            for (var n = 0, r; r = _listeners[e][n]; n++) {
                if (r == t) {
                    break
                }
            }
            _listeners[e].splice(n, 1)
        }
    };
    this.dispatchEvent = function(e) {
        if (this.hasEventListener(e.type)) {
            e.target = this;
            for (var t = 0, n; n = _listeners[e.type][t]; t++) {
                n(e)
            }
            return TRUE
        }
        return FALSE
    };
    this.hasEventListener = function(e) {
        return typeof _listeners[e] != UNDEFINED && _listeners[e].length > 0
    };
    this.getBaseURL = function() {
        var e = _l.href;
        if (e.indexOf("#") != -1) {
            e = e.substr(0, e.indexOf("#"))
        }
        if (e.substr(e.length - 1) == "/") {
            e = e.substr(0, e.length - 1)
        }
        return e
    };
    this.getStrict = function() {
        return _opts.strict
    };
    this.setStrict = function(e) {
        _opts.strict = e
    };
    this.getHistory = function() {
        return _opts.history
    };
    this.setHistory = function(e) {
        _opts.history = e
    };
    this.getTracker = function() {
        return _opts.tracker
    };
    this.setTracker = function(e) {
        _opts.tracker = e
    };
    this.getTitle = function() {
        return _d.title
    };
    this.setTitle = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _dc(e);
        _st(function() {
            _title = _d.title = e;
            if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                _frame.contentWindow.document.title = e;
                _juststart = FALSE
            }
            if (!_justset && _mozilla) {
                _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#")
            }
            _justset = FALSE
        }, 10)
    };
    this.getStatus = function() {
        return _t.status
    };
    this.setStatus = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _dc(e);
        if (!_safari) {
            e = _strictCheck(e != "null" ? e : "", TRUE);
            if (e == "/") {
                e = ""
            }
            if (!/http(s)?:\/\//.test(e)) {
                var t = _l.href.indexOf("#");
                e = (t == -1 ? _l.href : _l.href.substr(0, t)) + "#" + e
            }
            _t.status = e
        }
    };
    this.resetStatus = function() {
        _t.status = ""
    };
    this.getValue = function() {
        if (!_supported) {
            return null
        }
        return _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE))
    };
    this.setValue = function(e) {
        if (!_supported) {
            return null
        }
        if (typeof e == UNDEFINED) {
            return
        }
        if (e == "null") {
            e = ""
        }
        e = _ec(_dc(_strictCheck(e, TRUE)));
        if (e == "/") {
            e = ""
        }
        if (_value == e) {
            return
        }
        _justset = TRUE;
        _value = e;
        _silent = TRUE;
        _update.call(FWDAddress, true);
        _stack[_h.length] = _value;
        if (_safari) {
            if (_opts.history) {
                _l[ID][_l.pathname] = _stack.toString();
                _length = _h.length + 1;
                if (_version < 418) {
                    if (_l.search == "") {
                        _form.action = "#" + _value;
                        _form.submit()
                    }
                } else {
                    if (_version < 523 || _value == "") {
                        var t = _d.createEvent("MouseEvents");
                        t.initEvent("click", TRUE, TRUE);
                        var n = _d.createElement("a");
                        n.href = "#" + _value;
                        n.dispatchEvent(t)
                    } else {
                        _l.hash = "#" + _value
                    }
                }
            } else {
                _l.replace("#" + _value)
            }
        } else {
            if (_value != _getHash()) {
                if (_opts.history) {
                    _l.hash = "#" + _dc(_ieLocal(_value, TRUE))
                } else {
                    _l.replace("#" + _dc(_value))
                }
            }
        }
        if (_msie && _version < 8 && _opts.history) {
            _st(_htmlWrite, 50)
        }
        if (_safari) {
            _st(function() {
                _silent = FALSE
            }, 1)
        } else {
            _silent = FALSE
        }
    };
    this.getPath = function() {
        var e = this.getValue();
        if (e.indexOf("?") != -1) {
            return e.split("?")[0]
        } else {
            if (e.indexOf("#") != -1) {
                return e.split("#")[0]
            } else {
                return e
            }
        }
    };
    this.getPathNames = function() {
        var e = this.getPath(),
            t = e.split("/");
        if (e.substr(0, 1) == "/" || e.length == 0) {
            t.splice(0, 1)
        }
        if (e.substr(e.length - 1, 1) == "/") {
            t.splice(t.length - 1, 1)
        }
        return t
    };
    this.getQueryString = function() {
        var e = this.getValue(),
            t = e.indexOf("?");
        if (t != -1 && t < e.length) {
            return e.substr(t + 1)
        }
    };
    this.getParameter = function(e) {
        var t = this.getValue();
        var n = t.indexOf("?");
        if (n != -1) {
            t = t.substr(n + 1);
            var r, i = t.split("&"),
                s = i.length,
                o = [];
            while (s--) {
                r = i[s].split("=");
                if (r[0] == e) {
                    o.push(r[1])
                }
            }
            if (o.length != 0) {
                return o.length != 1 ? o : o[0]
            }
        }
    };
    this.getParameterNames = function() {
        var e = this.getValue();
        var t = e.indexOf("?");
        var n = [];
        if (t != -1) {
            e = e.substr(t + 1);
            if (e != "" && e.indexOf("=") != -1) {
                var r = e.split("&"),
                    i = 0;
                while (i < r.length) {
                    n.push(r[i].split("=")[0]);
                    i++
                }
            }
        }
        return n
    };
    this.onInit = null;
    this.onChange = null;
    this.onInternalChange = null;
    this.onExternalChange = null;
    (function() {
        var e;
        if (typeof FlashObject != UNDEFINED) {
            SWFObject = FlashObject
        }
        if (typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
            var t = SWFObject.prototype.write;
            SWFObject.prototype.write = function() {
                e = arguments;
                if (this.getAttribute("version").major < 8) {
                    this.addVariable("$swfaddress", FWDAddress.getValue());
                    (typeof e[0] == "string" ? document.getElementById(e[0]) : e[0]).so = this
                }
                var n;
                if (n = t.apply(this, e)) {
                    _ref.addId(this.getAttribute("id"))
                }
                return n
            }
        }
        if (typeof swfobject != UNDEFINED) {
            var n = swfobject.registerObject;
            swfobject.registerObject = function() {
                e = arguments;
                n.apply(this, e);
                _ref.addId(e[0])
            };
            var r = swfobject.createSWF;
            swfobject.createSWF = function() {
                e = arguments;
                var t = r.apply(this, e);
                if (t) {
                    _ref.addId(e[0].id)
                }
                return t
            };
            var i = swfobject.embedSWF;
            swfobject.embedSWF = function() {
                e = arguments;
                if (typeof e[8] == UNDEFINED) {
                    e[8] = {}
                }
                if (typeof e[8].id == UNDEFINED) {
                    e[8].id = e[1]
                }
                i.apply(this, e);
                _ref.addId(e[8].id)
            }
        }
        if (typeof UFO != UNDEFINED) {
            var s = UFO.create;
            UFO.create = function() {
                e = arguments;
                s.apply(this, e);
                _ref.addId(e[0].id)
            }
        }
        if (typeof AC_FL_RunContent != UNDEFINED) {
            var o = AC_FL_RunContent;
            AC_FL_RunContent = function() {
                e = arguments;
                o.apply(this, e);
                for (var t = 0, n = e.length; t < n; t++) {
                    if (e[t] == "id") {
                        _ref.addId(e[t + 1])
                    }
                }
            }
        }
    })()
};
(function(e) {
    var t = function(n, r) {
        function o() {
            if (e.top != e && FWDUVPUtils.isIE) return;
            var t, n;
            if (document.body.createTextRange) {
                t = document.body.createTextRange();
                t.moveToElementText(this);
                t.select()
            } else if (e.getSelection && document.createRange) {
                n = e.getSelection();
                t = document.createRange();
                t.selectNodeContents(this);
                n.removeAllRanges();
                n.addRange(t)
            }
        }
        var i = this;
        var s = t.prototype;
        this.xhr = null;
        this.embedColoseN_img = n.embedColoseN_img;
        this.bk_do = null;
        this.mainHolder_do = null;
        this.embedAndLinkMainLabel_do = null;
        this.linkAndEmbedHolderBk_do = null;
        this.linkText_do = null;
        this.linkLabel_do = null;
        this.embedText_do = null;
        this.embedLabel_do = null;
        this.linkAndEmbedHolder_do = null;
        this.copyLinkButton_do = null;
        this.copyEmbedButton_do = null;
        this.infoText_do = null;
        this.sendMainHolder_do = null;
        this.sendMainHolderBk_do = null;
        this.sendMainLabel_do = null;
        this.yourEmailLabel_do = null;
        this.yourEmailInput_do = null;
        this.friendEmailLabel_do = null;
        this.friendEmailInput_do = null;
        this.closeButton_do = null;
        this.videoLink_str = null;
        this.embedWindowBackground_str = n.embedWindowBackground_str;
        this.embedWindowInputBackgroundPath_str = n.embedWindowInputBackgroundPath_str;
        this.secondaryLabelsColor_str = n.secondaryLabelsColor_str;
        this.inputColor_str = n.inputColor_str;
        this.mainLabelsColor_str = n.mainLabelsColor_str;
        this.sendButtonNPath_str = n.sendButtonNPath_str;
        this.sendButtonSPath_str = n.sendButtonSPath_str;
        this.inputBackgroundColor_str = n.inputBackgroundColor_str;
        this.borderColor_str = n.borderColor_str;
        this.sendToAFriendPath_str = n.sendToAFriendPath_str;
        this.maxTextWidth = 0;
        this.totalWidth = 0;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.buttonWidth = 44;
        this.buttonHeight = 19;
        this.embedWindowCloseButtonMargins = n.embedWindowCloseButtonMargins;
        this.finalEmbedPath_str = null;
        this.finalEmbedCode_str = null;
        this.linkToVideo_str = null;
        this.shareAndEmbedTextColor_str = n.shareAndEmbedTextColor_str;
        this.isSending_bl = false;
        this.isShowed_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.init = function() {
            i.setBackfaceVisibility();
            i.mainHolder_do = new FWDUVPDisplayObject("div");
            i.bk_do = new FWDUVPDisplayObject("div");
            i.bk_do.getStyle().width = "100%";
            i.bk_do.getStyle().height = "100%";
            i.bk_do.setAlpha(.9);
            i.bk_do.getStyle().background = "url('" + i.embedWindowBackground_str + "')";
            i.linkAndEmbedHolder_do = new FWDUVPDisplayObject("div");
            i.linkAndEmbedHolderBk_do = new FWDUVPDisplayObject("div");
            i.linkAndEmbedHolderBk_do.getStyle().background = "url('" + i.embedWindowBackground_str + "')";
            i.linkAndEmbedHolderBk_do.getStyle().borderStyle = "solid";
            i.linkAndEmbedHolderBk_do.getStyle().borderWidth = "1px";
            i.linkAndEmbedHolderBk_do.getStyle().borderColor = i.borderColor_str;
            i.embedAndLinkMainLabel_do = new FWDUVPDisplayObject("div");
            i.embedAndLinkMainLabel_do.setBackfaceVisibility();
            i.embedAndLinkMainLabel_do.getStyle().fontFamily = "Arial";
            i.embedAndLinkMainLabel_do.getStyle().fontSize = "12px";
            i.embedAndLinkMainLabel_do.getStyle().color = i.mainLabelsColor_str;
            i.embedAndLinkMainLabel_do.getStyle().whiteSpace = "nowrap";
            i.embedAndLinkMainLabel_do.getStyle().fontSmoothing = "antialiased";
            i.embedAndLinkMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.embedAndLinkMainLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.embedAndLinkMainLabel_do.getStyle().padding = "0px";
            i.embedAndLinkMainLabel_do.setInnerHTML("SHARE & EMBED");
            i.linkLabel_do = new FWDUVPDisplayObject("div");
            i.linkLabel_do.setBackfaceVisibility();
            i.linkLabel_do.getStyle().fontFamily = "Arial";
            i.linkLabel_do.getStyle().fontSize = "12px";
            i.linkLabel_do.getStyle().color = i.secondaryLabelsColor_str;
            i.linkLabel_do.getStyle().whiteSpace = "nowrap";
            i.linkLabel_do.getStyle().fontSmoothing = "antialiased";
            i.linkLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.linkLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.linkLabel_do.getStyle().padding = "0px";
            i.linkLabel_do.setInnerHTML("Link to this video:");
            i.linkText_do = new FWDUVPDisplayObject("div");
            i.linkText_do.setBackfaceVisibility();
            i.linkText_do.getStyle().fontFamily = "Arial";
            i.linkText_do.getStyle().fontSize = "12px";
            i.linkText_do.getStyle().color = i.shareAndEmbedTextColor_str;
            if (!FWDUVPUtils.isIEAndLessThen9) i.linkText_do.getStyle().wordBreak = "break-all";
            i.linkText_do.getStyle().fontSmoothing = "antialiased";
            i.linkText_do.getStyle().webkitFontSmoothing = "antialiased";
            i.linkText_do.getStyle().textRendering = "optimizeLegibility";
            i.linkText_do.getStyle().padding = "6px";
            i.linkText_do.getStyle().paddingTop = "4px";
            i.linkText_do.getStyle().paddingBottom = "4px";
            i.linkText_do.getStyle().backgroundColor = i.inputBackgroundColor_str;
            i.linkText_do.screen.onclick = o;
            i.embedLabel_do = new FWDUVPDisplayObject("div");
            i.embedLabel_do.setBackfaceVisibility();
            i.embedLabel_do.getStyle().fontFamily = "Arial";
            i.embedLabel_do.getStyle().fontSize = "12px";
            i.embedLabel_do.getStyle().color = i.secondaryLabelsColor_str;
            i.embedLabel_do.getStyle().whiteSpace = "nowrap";
            i.embedLabel_do.getStyle().fontSmoothing = "antialiased";
            i.embedLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.embedLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.embedLabel_do.getStyle().padding = "0px";
            i.embedLabel_do.setInnerHTML("Embed this video:");
            i.embedText_do = new FWDUVPDisplayObject("div");
            i.embedText_do.setBackfaceVisibility();
            if (!FWDUVPUtils.isIEAndLessThen9) i.embedText_do.getStyle().wordBreak = "break-all";
            i.embedText_do.getStyle().fontFamily = "Arial";
            i.embedText_do.getStyle().fontSize = "12px";
            i.embedText_do.getStyle().lineHeight = "16px";
            i.embedText_do.getStyle().color = i.shareAndEmbedTextColor_str;
            i.embedText_do.getStyle().fontSmoothing = "antialiased";
            i.embedText_do.getStyle().webkitFontSmoothing = "antialiased";
            i.embedText_do.getStyle().textRendering = "optimizeLegibility";
            i.embedText_do.getStyle().backgroundColor = i.inputBackgroundColor_str;
            i.embedText_do.getStyle().padding = "6px";
            i.embedText_do.getStyle().paddingTop = "4px";
            i.embedText_do.getStyle().paddingBottom = "4px";
            i.embedText_do.screen.onclick = o;
            FWDUVPFlashButton.setPrototype();
            i.copyLinkButton_do = new FWDUVPFlashButton(n.embedCopyButtonNPath_str, n.embedCopyButtonSPath_str, n.flashCopyToCBPath_str, r.instanceName_str + "copyLink", r.instanceName_str + ".copyLinkButtonOnMouseOver", r.instanceName_str + ".copyLinkButtonOnMouseOut", r.instanceName_str + ".copyLinkButtonOnMouseClick", r.instanceName_str + ".getLinkCopyPath", i.buttonWidth, i.buttonHeight);
            i.copyLinkButton_do.addListener(FWDUVPFlashButton.CLICK, i.showFlashButtonInstallError);
            FWDUVPFlashButton.setPrototype();
            i.copyEmbedButton_do = new FWDUVPFlashButton(n.embedCopyButtonNPath_str, n.embedCopyButtonSPath_str, n.flashCopyToCBPath_str, r.instanceName_str + "embedCode", r.instanceName_str + ".embedkButtonOnMouseOver", r.instanceName_str + ".embedButtonOnMouseOut", r.instanceName_str + ".embedButtonOnMouseClick", r.instanceName_str + ".getEmbedCopyPath", i.buttonWidth, i.buttonHeight);
            i.copyEmbedButton_do.addListener(FWDUVPFlashButton.CLICK, i.showFlashButtonInstallError);
            i.sendMainHolder_do = new FWDUVPDisplayObject("div");
            i.sendMainHolderBk_do = new FWDUVPDisplayObject("div");
            i.sendMainHolderBk_do.getStyle().background = "url('" + i.embedWindowBackground_str + "')";
            i.sendMainHolderBk_do.getStyle().borderStyle = "solid";
            i.sendMainHolderBk_do.getStyle().borderWidth = "1px";
            i.sendMainHolderBk_do.getStyle().borderColor = i.borderColor_str;
            i.sendMainLabel_do = new FWDUVPDisplayObject("div");
            i.sendMainLabel_do.setBackfaceVisibility();
            i.sendMainLabel_do.getStyle().fontFamily = "Arial";
            i.sendMainLabel_do.getStyle().fontSize = "12px";
            i.sendMainLabel_do.getStyle().color = i.mainLabelsColor_str;
            i.sendMainLabel_do.getStyle().whiteSpace = "nowrap";
            i.sendMainLabel_do.getStyle().fontSmoothing = "antialiased";
            i.sendMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.sendMainLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.sendMainLabel_do.getStyle().padding = "0px";
            i.sendMainLabel_do.setInnerHTML("SEND TO A FRIEND");
            i.yourEmailLabel_do = new FWDUVPDisplayObject("div");
            i.yourEmailLabel_do.setBackfaceVisibility();
            i.yourEmailLabel_do.getStyle().fontFamily = "Arial";
            i.yourEmailLabel_do.getStyle().fontSize = "12px";
            i.yourEmailLabel_do.getStyle().color = i.secondaryLabelsColor_str;
            i.yourEmailLabel_do.getStyle().whiteSpace = "nowrap";
            i.yourEmailLabel_do.getStyle().fontSmoothing = "antialiased";
            i.yourEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.yourEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.yourEmailLabel_do.getStyle().padding = "0px";
            i.yourEmailLabel_do.setInnerHTML("Your email:");
            i.yourEmailInput_do = new FWDUVPDisplayObject("input");
            i.yourEmailInput_do.setBackfaceVisibility();
            i.yourEmailInput_do.getStyle().fontFamily = "Arial";
            i.yourEmailInput_do.getStyle().fontSize = "12px";
            i.yourEmailInput_do.getStyle().backgroundColor = i.inputBackgroundColor_str;
            i.yourEmailInput_do.getStyle().color = i.inputColor_str;
            i.yourEmailInput_do.getStyle().outline = 0;
            i.yourEmailInput_do.getStyle().whiteSpace = "nowrap";
            i.yourEmailInput_do.getStyle().fontSmoothing = "antialiased";
            i.yourEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
            i.yourEmailInput_do.getStyle().textRendering = "optimizeLegibility";
            i.yourEmailInput_do.getStyle().padding = "6px";
            i.yourEmailInput_do.getStyle().paddingTop = "4px";
            i.yourEmailInput_do.getStyle().paddingBottom = "4px";
            i.friendEmailLabel_do = new FWDUVPDisplayObject("div");
            i.friendEmailLabel_do.setBackfaceVisibility();
            i.friendEmailLabel_do.getStyle().fontFamily = "Arial";
            i.friendEmailLabel_do.getStyle().fontSize = "12px";
            i.friendEmailLabel_do.getStyle().color = i.secondaryLabelsColor_str;
            i.friendEmailLabel_do.getStyle().whiteSpace = "nowrap";
            i.friendEmailLabel_do.getStyle().fontSmoothing = "antialiased";
            i.friendEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
            i.friendEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
            i.friendEmailLabel_do.getStyle().padding = "0px";
            i.friendEmailLabel_do.setInnerHTML("Your friend's email:");
            i.friendEmailInput_do = new FWDUVPDisplayObject("input");
            i.friendEmailInput_do.setBackfaceVisibility();
            i.friendEmailInput_do.getStyle().fontFamily = "Arial";
            i.friendEmailInput_do.getStyle().fontSize = "12px";
            i.friendEmailInput_do.getStyle().backgroundColor = i.inputBackgroundColor_str;
            i.friendEmailInput_do.getStyle().color = i.inputColor_str;
            i.friendEmailInput_do.getStyle().outline = 0;
            i.friendEmailInput_do.getStyle().whiteSpace = "nowrap";
            i.friendEmailInput_do.getStyle().fontSmoothing = "antialiased";
            i.friendEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
            i.friendEmailInput_do.getStyle().textRendering = "optimizeLegibility";
            i.friendEmailInput_do.getStyle().padding = "6px";
            i.friendEmailInput_do.getStyle().paddingTop = "4px";
            i.friendEmailInput_do.getStyle().paddingBottom = "4px";
            FWDUVPSimpleSizeButton.setPrototype();
            i.sendButton_do = new FWDUVPSimpleSizeButton(i.sendButtonNPath_str, i.sendButtonSPath_str, i.buttonWidth, i.buttonHeight);
            i.sendButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, i.sendClickHandler);
            i.infoText_do = new FWDUVPDisplayObject("div");
            i.infoText_do.setBackfaceVisibility();
            i.infoText_do.getStyle().fontFamily = "Arial";
            i.infoText_do.getStyle().fontSize = "12px";
            i.infoText_do.getStyle().color = i.secondaryLabelsColor_str;
            i.infoText_do.getStyle().whiteSpace = "nowrap";
            i.infoText_do.getStyle().fontSmoothing = "antialiased";
            i.infoText_do.getStyle().webkitFontSmoothing = "antialiased";
            i.infoText_do.getStyle().textRendering = "optimizeLegibility";
            i.infoText_do.getStyle().padding = "0px";
            i.infoText_do.getStyle().paddingTop = "4px";
            i.infoText_do.getStyle().textAlign = "center";
            i.infoText_do.getStyle().color = i.mainLabelsColor_str;
            FWDUVPSimpleButton.setPrototype();
            i.closeButton_do = new FWDUVPSimpleButton(i.embedColoseN_img, n.embedWindowClosePathS_str);
            i.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, i.closeButtonOnMouseUpHandler);
            i.addChild(i.mainHolder_do);
            i.mainHolder_do.addChild(i.bk_do);
            i.linkAndEmbedHolder_do.addChild(i.linkAndEmbedHolderBk_do);
            i.linkAndEmbedHolder_do.addChild(i.embedAndLinkMainLabel_do);
            i.linkAndEmbedHolder_do.addChild(i.linkLabel_do);
            i.linkAndEmbedHolder_do.addChild(i.linkText_do);
            i.linkAndEmbedHolder_do.addChild(i.embedLabel_do);
            i.linkAndEmbedHolder_do.addChild(i.embedText_do);
            i.linkAndEmbedHolder_do.addChild(i.copyLinkButton_do);
            i.linkAndEmbedHolder_do.addChild(i.copyEmbedButton_do);
            i.sendMainHolder_do.addChild(i.sendMainHolderBk_do);
            i.sendMainHolder_do.addChild(i.sendMainLabel_do);
            i.sendMainHolder_do.addChild(i.yourEmailLabel_do);
            i.sendMainHolder_do.addChild(i.yourEmailInput_do);
            i.sendMainHolder_do.addChild(i.friendEmailLabel_do);
            i.sendMainHolder_do.addChild(i.friendEmailInput_do);
            i.sendMainHolder_do.addChild(i.sendButton_do);
            i.mainHolder_do.addChild(i.linkAndEmbedHolder_do);
            i.mainHolder_do.addChild(i.sendMainHolder_do);
            i.mainHolder_do.addChild(i.closeButton_do)
        };
        this.closeButtonOnMouseUpHandler = function() {
            if (!i.isShowed_bl) return;
            i.hide()
        };
        this.showFlashButtonInstallError = function() {
            var e = "Please install Adobe Flash Player in order to use this feature! To copy text in the clipboard currently flash is the only safe option. <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Click here to install</a>. <br><br>The video link or embed code can be copyed by selecting the text, right click and copy.";
            i.dispatchEvent(t.ERROR, {
                error: e
            })
        };
        this.positionAndResize = function() {
            i.stageWidth = r.stageWidth;
            if (r.displayType == FWDUVPlayer.FULL_SCREEN) {
                i.stageHeight = r.tempVidStageHeight
            } else {
                i.stageHeight = r.tempVidStageHeight
            }
            i.maxTextWidth = Math.min(i.stageWidth - 150, 500);
            i.totalWidth = i.maxTextWidth + i.buttonWidth + 40;
            if (i.isMobile_bl) {
                i.linkText_do.setWidth(i.maxTextWidth + 52);
                i.embedText_do.setWidth(i.maxTextWidth + 52)
            } else {
                i.linkText_do.setWidth(i.maxTextWidth);
                i.embedText_do.setWidth(i.maxTextWidth)
            }
            i.positionFinal();
            i.closeButton_do.setX(i.stageWidth - i.closeButton_do.w - i.embedWindowCloseButtonMargins);
            i.closeButton_do.setY(i.embedWindowCloseButtonMargins);
            i.setWidth(i.stageWidth);
            i.setHeight(i.stageHeight);
            i.mainHolder_do.setWidth(i.stageWidth);
            i.mainHolder_do.setHeight(i.stageHeight)
        };
        this.positionFinal = function() {
            var e;
            var t = false;
            if (i.stageHeight < 360 || i.stageWidth < 350) {
                i.linkText_do.getStyle().whiteSpace = "nowrap";
                i.embedText_do.getStyle().whiteSpace = "nowrap"
            } else {
                i.linkText_do.getStyle().whiteSpace = "normal";
                i.embedText_do.getStyle().whiteSpace = "normal"
            }
            if (i.linkLabel_do.screen.offsetHeight < 6) t = true;
            var n;
            if (t) {
                n = Math.round(i.embedAndLinkMainLabel_do.screen.getBoundingClientRect().height * 100)
            } else {
                n = i.embedAndLinkMainLabel_do.getHeight()
            }
            i.embedAndLinkMainLabel_do.setX(16);
            i.linkLabel_do.setX(16);
            i.linkLabel_do.setY(n + 14);
            var r;
            var s;
            if (t) {
                r = Math.round(i.linkLabel_do.screen.getBoundingClientRect().height * 100);
                s = Math.round(i.linkText_do.screen.getBoundingClientRect().height * 100)
            } else {
                r = i.linkLabel_do.getHeight();
                s = i.linkText_do.getHeight()
            }
            i.linkText_do.setX(10);
            i.linkText_do.setY(i.linkLabel_do.y + r + 5);
            if (i.isMobile_bl) {
                i.copyLinkButton_do.setX(-100)
            } else {
                i.copyLinkButton_do.setX(i.maxTextWidth + 30)
            }
            i.copyLinkButton_do.setY(i.linkText_do.y + s - i.buttonHeight);
            i.embedLabel_do.setX(16);
            i.embedLabel_do.setY(i.copyLinkButton_do.y + i.copyLinkButton_do.h + 14);
            var o;
            if (t) {
                o = Math.round(i.embedText_do.screen.getBoundingClientRect().height * 100)
            } else {
                o = i.embedText_do.getHeight()
            }
            i.embedText_do.setX(10);
            i.embedText_do.setY(i.embedLabel_do.y + r + 5);
            if (i.isMobile_bl) {
                i.copyEmbedButton_do.setX(-100)
            } else {
                i.copyEmbedButton_do.setX(i.maxTextWidth + 30)
            }
            i.copyEmbedButton_do.setY(i.embedText_do.y + o - i.buttonHeight);
            i.linkAndEmbedHolderBk_do.setY(i.linkLabel_do.y - 9);
            i.linkAndEmbedHolderBk_do.setWidth(i.totalWidth - 2);
            i.linkAndEmbedHolderBk_do.setHeight(i.embedText_do.y + o - 9);
            i.linkAndEmbedHolder_do.setWidth(i.totalWidth);
            i.linkAndEmbedHolder_do.setHeight(i.embedText_do.y + o + 14);
            var u;
            var a;
            if (t) {
                u = Math.round(i.sendMainLabel_do.screen.getBoundingClientRect().height * 100);
                a = Math.round(i.yourEmailInput_do.screen.getBoundingClientRect().height * 100)
            } else {
                u = i.sendMainLabel_do.getHeight();
                a = i.yourEmailInput_do.getHeight()
            }
            i.sendMainLabel_do.setX(16);
            i.yourEmailLabel_do.setX(16);
            i.yourEmailLabel_do.setY(u + 14);
            if (i.stageWidth > 400) {
                i.yourEmailInput_do.setX(10);
                i.yourEmailInput_do.setWidth(parseInt(i.totalWidth - 52 - i.buttonWidth) / 2);
                i.yourEmailInput_do.setY(i.yourEmailLabel_do.y + r + 5);
                i.friendEmailLabel_do.setX(i.yourEmailInput_do.x + i.yourEmailInput_do.w + 26);
                i.friendEmailLabel_do.setY(i.yourEmailLabel_do.y);
                i.friendEmailInput_do.setX(i.yourEmailInput_do.x + i.yourEmailInput_do.w + 20);
                i.friendEmailInput_do.setWidth(parseInt((i.maxTextWidth - 30) / 2));
                i.friendEmailInput_do.setY(i.yourEmailLabel_do.y + r + 5);
                i.sendButton_do.setX(i.friendEmailInput_do.x + i.yourEmailInput_do.w + 10);
                i.sendButton_do.setY(i.friendEmailInput_do.y + a - i.buttonHeight)
            } else {
                i.yourEmailInput_do.setX(10);
                i.yourEmailInput_do.setWidth(i.totalWidth - 32);
                i.yourEmailInput_do.setY(i.yourEmailLabel_do.y + r + 5);
                i.friendEmailLabel_do.setX(16);
                i.friendEmailLabel_do.setY(i.yourEmailInput_do.y + a + 14);
                i.friendEmailInput_do.setX(10);
                i.friendEmailInput_do.setY(i.friendEmailLabel_do.y + r + 5);
                i.friendEmailInput_do.setWidth(i.totalWidth - 32);
                i.sendButton_do.setX(i.totalWidth - i.buttonWidth - 10);
                i.sendButton_do.setY(i.friendEmailInput_do.y + a + 10)
            }
            i.sendMainHolderBk_do.setY(i.yourEmailLabel_do.y - 9);
            i.sendMainHolderBk_do.setWidth(i.totalWidth - 2);
            i.sendMainHolderBk_do.setHeight(i.sendButton_do.y + i.sendButton_do.h - 9);
            i.sendMainHolder_do.setWidth(i.totalWidth);
            i.sendMainHolder_do.setHeight(i.sendButton_do.y + i.sendButton_do.h + 14);
            if (t) {
                e = Math.round(i.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + i.sendMainHolder_do.screen.getBoundingClientRect().height * 100)
            } else {
                e = i.linkAndEmbedHolder_do.getHeight() + i.sendMainHolder_do.getHeight()
            }
            i.linkAndEmbedHolder_do.setX(parseInt((i.stageWidth - i.totalWidth) / 2));
            i.linkAndEmbedHolder_do.setY(parseInt((i.stageHeight - e) / 2) - 8);
            i.sendMainHolder_do.setX(parseInt((i.stageWidth - i.totalWidth) / 2));
            if (t) {
                i.sendMainHolder_do.setY(Math.round(i.linkAndEmbedHolder_do.y + i.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + 20))
            } else {
                i.sendMainHolder_do.setY(i.linkAndEmbedHolder_do.y + i.linkAndEmbedHolder_do.getHeight() + 20)
            }
        };
        this.sendClickHandler = function() {
            var e = false;
            if (!i.getValidEmail(i.yourEmailInput_do.screen.value)) {
                if (FWDUVPTweenMax.isTweening(i.yourEmailInput_do.screen)) return;
                FWDUVPTweenMax.to(i.yourEmailInput_do.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: true,
                    repeat: 3
                });
                e = true
            }
            if (!i.getValidEmail(i.friendEmailInput_do.screen.value)) {
                if (FWDUVPTweenMax.isTweening(i.friendEmailInput_do.screen)) return;
                FWDUVPTweenMax.to(i.friendEmailInput_do.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: true,
                    repeat: 3
                });
                e = true
            }
            if (e) return;
            i.sendEmail()
        };
        this.sendEmail = function() {
            if (i.isSending_bl) return;
            i.isSending_bl = true;
            i.xhr = new XMLHttpRequest;
            i.xhr.onreadystatechange = i.onChange;
            i.xhr.onerror = i.ajaxOnErrorHandler;
            try {
                i.xhr.open("get", i.sendToAFriendPath_str + "?friendMail=" + i.friendEmailInput_do.screen.value + "&yourMail=" + i.yourEmailInput_do.screen.value + "&link=" + encodeURIComponent(i.linkToVideo_str), true);
                i.xhr.send()
            } catch (t) {
                i.showInfo("ERROR", true);
                if (console) console.log(t);
                if (t.message && e.console) console.log(t.message)
            }
            i.resetInputs()
        };
        this.ajaxOnErrorHandler = function(t) {
            i.showInfo("ERROR", true);
            try {
                if (e.console) console.log(t);
                if (e.console) console.log(t.message)
            } catch (t) {}
            i.isSending_bl = false
        };
        this.onChange = function(t) {
            if (i.xhr.readyState == 4 && i.xhr.status == 200) {
                if (i.xhr.responseText == "sent") {
                    i.showInfo("SENT")
                } else {
                    i.showInfo("ERROR", true);
                    if (e.console) console.log("Error The server can't send the email!")
                }
                i.isSending_bl = false
            }
        };
        this.resetInputs = function() {
            i.yourEmailInput_do.screen.value = "";
            i.friendEmailInput_do.screen.value = ""
        };
        this.getValidEmail = function(e) {
            var t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!t.test(e) || e == "") return false;
            return true
        };
        this.setEmbedData = function() {
            var e = location.href;
            var t = location.protocol + "//" + location.host;
            var n = location.pathname;
            var s = location.hash;
            var o = location.search;
            var u = t + n;
            o = o.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, "");
            e = e.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, "");
            if (o) {
                if (s) {
                    i.finalEmbedPath_str = u + o + "&RVPInstanceName=" + r.instanceName_str + "&RVPPlaylistId=" + r.catId + "&RVPVideoId=" + r.id + s
                } else {
                    i.finalEmbedPath_str = u + o + "&RVPInstanceName=" + r.instanceName_str + "&RVPPlaylistId=" + r.catId + "&RVPVideoId=" + r.id
                }
            } else {
                if (s) {
                    i.finalEmbedPath_str = u + "?RVPInstanceName=" + r.instanceName_str + "&RVPPlaylistId=" + r.catId + "&RVPVideoId=" + r.id + s
                } else {
                    i.finalEmbedPath_str = u + "?RVPInstanceName=" + r.instanceName_str + "&RVPPlaylistId=" + r.catId + "&RVPVideoId=" + r.id
                }
            }
            if (s) {
                if (s.indexOf("playlistId=") == -1) {
                    i.linkToVideo_str = u + o + s + "&playlistId=" + r.catId + "&videoId=" + r.id
                } else {
                    i.linkToVideo_str = e
                }
            } else {
                i.linkToVideo_str = e + "#/?playlistId=" + r.catId + "&videoId=" + r.id;
            }
            i.finalEmbedPath_str = encodeURI(i.finalEmbedPath_str);
            i.linkToVideo_str = encodeURI(i.linkToVideo_str);
            i.finalEmbedCode_str = "<iframe src='" + i.finalEmbedPath_str + "' width='" + r.stageWidth + "' height='" + r.stageHeight + "' frameborder='0' scrolling='no' allowfullscreen></iframe>";
            if (FWDUVPUtils.isIE) {
                i.linkText_do.screen.innerText = i.linkToVideo_str;
                i.embedText_do.screen.innerText = i.finalEmbedCode_str
            } else {
                i.linkText_do.screen.textContent = i.linkToVideo_str;
                i.embedText_do.screen.textContent = i.finalEmbedCode_str
            }
        };
        this.showInfo = function(e, t) {
            i.infoText_do.setInnerHTML(e);
            i.sendMainHolder_do.addChild(i.infoText_do);
            i.infoText_do.setWidth(i.buttonWidth);
            i.infoText_do.setHeight(i.buttonHeight - 4);
            i.infoText_do.setX(i.sendButton_do.x);
            i.infoText_do.setY(i.sendButton_do.y - 23);
            i.infoText_do.setAlpha(0);
            if (t) {
                i.infoText_do.getStyle().color = "#FF0000"
            } else {
                i.infoText_do.getStyle().color = i.mainLabelsColor_str
            }
            FWDUVPTweenMax.killTweensOf(i.infoText_do);
            FWDUVPTweenMax.to(i.infoText_do, .16, {
                alpha: 1,
                yoyo: true,
                repeat: 7
            })
        };
        this.show = function(e) {
            if (i.isShowed_bl) return;
            i.isShowed_bl = true;
            r.main_do.addChild(i);
            i.resetInputs();
            i.setEmbedData();
            if (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) r.main_do.setSelectable(true);
            i.positionAndResize();
            clearTimeout(i.hideCompleteId_to);
            clearTimeout(i.showCompleteId_to);
            i.mainHolder_do.setY(-i.stageHeight);
            i.showCompleteId_to = setTimeout(i.showCompleteHandler, 900);
            setTimeout(function() {
                FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100)
        };
        this.showCompleteHandler = function() {};
        this.hide = function() {
            if (!i.isShowed_bl) return;
            i.isShowed_bl = false;
            if (r.customContextMenu_do) r.customContextMenu_do.enable();
            i.positionAndResize();
            clearTimeout(i.hideCompleteId_to);
            clearTimeout(i.showCompleteId_to);
            if (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) r.main_do.setSelectable(false);
            i.hideCompleteId_to = setTimeout(i.hideCompleteHandler, 800);
            FWDUVPTweenMax.killTweensOf(i.mainHolder_do);
            FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                y: -i.stageHeight,
                ease: Expo.easeInOut
            })
        };
        this.hideCompleteHandler = function() {
            r.main_do.removeChild(i);
            i.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.ERROR = "error";
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDUVPEmbedWindow = t
})(window);
(function() {
    var e = function() {
        this.listeners = {
            events_ar: []
        };
        this.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        this.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        this.destroy = function() {
            this.listeners = null;
            this.addListener = null;
            this.dispatchEvent = null;
            this.removeListener = null
        }
    };
    window.FWDUVPEventDispatcher = e
})(window);
(function(e) {
    var t = function(n) {
        var r = this;
        var i = t.prototype;
        this.appId = parseInt(n);
        var s = false;
        r.init = function() {
            r.checkFBRoot();
            if (!e.fbAsyncInit) r.connect()
        };
        this.checkFBRoot = function() {
            var e = Boolean(document.getElementById("fb-root"));
            if (!e) {
                e = document.createElement("div");
                e.id = "fb-root";
                document.getElementsByTagName("body")[0].appendChild(e)
            }
        };
        this.connect = function() {
            if (r.hasStartedToConnect_bl) return;
            r.hasStartedToConnect_bl = true;
            e.fbAsyncInit = function() {
                FB.init({
                    appId: r.appId,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true
                });
                FB.Event.subscribe("auth.authResponseChange", function(e) {
                    if (e.status === "connected") {} else {
                        FB.login()
                    }
                })
            };
            (function(e) {
                var t, n = "facebook-jssdk";
                if (e.getElementById(n)) {
                    return
                }
                t = e.createElement("script");
                t.id = n;
                t.async = true;
                t.src = "//connect.facebook.net/en_US/all.js";
                e.getElementsByTagName("body")[0].appendChild(t)
            })(document)
        };
        this.share = function(e, t, n) {
            FB.ui({
                method: "feed",
                link: e,
                caption: t,
                picture: n
            }, function(e) {})
        };
        r.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPEventDispatcher
    };
    t.prototype = null;
    e.FWDUVPFacebookShare = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s, o, u, a, f, l) {
        var c = this;
        var h = t.prototype;
        this.nImg_img = null;
        this.sImg_img = null;
        this.n_do;
        this.s_do;
        this.nImgPath_str = e;
        this.sImgPath_str = n;
        this.flashPath_str = r;
        this.flashButtonName_str = i;
        this.overPath_str = s;
        this.outPath_str = o;
        this.clickPath_str = u;
        this.copyPath_str = a;
        this.linkFlashObject = null;
        this.buttonWidth = f;
        this.buttonHeight = l;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.isDisabled_bl = false;
        this.init = function() {
            c.setWidth(c.buttonWidth);
            c.setHeight(c.buttonHeight);
            if (c.isMobile_bl) return;
            c.setupMainContainers();
            c.setupFalshButton();
            c.setButtonMode(true)
        };
        this.setupMainContainers = function() {
            c.n_do = new FWDUVPDisplayObject("img");
            var e = new Image;
            e.src = c.nImgPath_str;
            c.n_do.setScreen(e);
            c.n_do.setWidth(c.buttonWidth);
            c.n_do.setHeight(c.buttonHeight);
            c.addChild(c.n_do);
            c.s_do = new FWDUVPDisplayObject("img");
            var t = new Image;
            t.src = c.sImgPath_str;
            c.s_do.setScreen(t);
            c.s_do.setWidth(c.buttonWidth);
            c.s_do.setHeight(c.buttonHeight);
            c.s_do.setAlpha(0);
            c.addChild(c.s_do);
            if (c.screen.addEventListener) {
                c.screen.addEventListener("mouseover", c.onMouseOver);
                c.screen.addEventListener("mouseout", c.onMouseOut);
                c.screen.addEventListener("mouseup", c.onMouseUp)
            } else if (c.screen.attachEvent) {
                c.screen.attachEvent("onmouseover", c.onMouseOver);
                c.screen.attachEvent("onmouseout", c.onMouseOut);
                c.screen.attachEvent("onmouseup", c.onMouseUp)
            }
        };
        this.onMouseOver = function(e) {
            if (!e.pointerType || e.pointerType == "mouse") {
                if (c.isDisabled_bl || c.isSelectedFinal_bl) return;
                c.setSelectedState()
            }
        };
        this.onMouseOut = function(e) {
            if (!e.pointerType || e.pointerType == "mouse") {
                c.setNormalState()
            }
        };
        this.onMouseUp = function(e) {
            if (FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) return;
            if (e.preventDefault) e.preventDefault();
            if (c.isDisabled_bl || e.button == 2) return;
            c.dispatchEvent(t.CLICK)
        };
        this.setupFalshButton = function() {
            if (!FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) return;
            var e = '<object id="' + c.flashButtonName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + c.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + c.clickPath_str + "&overPath_str=" + c.overPath_str + "&outPath_str=" + c.outPath_str + "&copyPath_str=" + c.copyPath_str + '"/><object type="application/x-shockwave-flash" data="' + c.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + c.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + c.clickPath_str + "&overPath_str=" + c.overPath_str + "&outPath_str=" + c.outPath_str + "&copyPath_str=" + c.copyPath_str + '"/></object></object>';
            var t = new FWDUVPDisplayObject("div");
            t.setBackfaceVisibility();
            t.setResizableSizeAfterParent();
            t.screen.innerHTML = e;
            c.addChild(t);
            c.linkFlashObject = t.screen.firstChild;
            if (!FWDUVPUtils.isIE) c.linkFlashObject = c.linkFlashObject.getElementsByTagName("object")[0]
        };
        this.setNormalState = function() {
            FWDUVPTweenMax.killTweensOf(c.s_do);
            FWDUVPTweenMax.to(c.s_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function() {
            FWDUVPTweenMax.killTweensOf(c.s_do);
            FWDUVPTweenMax.to(c.s_do, .5, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        c.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDUVPFlashButton = t
})(window);
var FWDUVPFlashTest = function() {
    function c() {
        var n = o.getElementsByTagName("body")[0];
        var r = createElement(t);
        r.setAttribute("type", i);
        var s = n.appendChild(r);
        if (s) {
            var u = 0;
            (function() {
                if (typeof s.GetVariable != e) {
                    var t = s.GetVariable("$version");
                    if (t) {
                        t = t.split(" ")[1].split(",");
                        l.pv = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)]
                    }
                } else if (u < 10) {
                    u++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                n.removeChild(r);
                s = null;
                h()
            })()
        } else {
            h()
        }
    }

    function h() {
        var t = f.length;
        if (t > 0) {
            for (var n = 0; n < t; n++) {
                var r = f[n].id;
                var i = f[n].callbackFn;
                var s = {
                    success: false,
                    id: r
                };
                if (l.pv[0] > 0) {
                    var o = getElementById(r);
                    if (o) {
                        if (p(f[n].swfVersion) && !(l.wk && l.wk < 312)) {
                            setVisibility(r, true);
                            if (i) {
                                s.success = true;
                                s.ref = getObjectById(r);
                                i(s)
                            }
                        } else if (f[n].expressInstall && canExpressInstall()) {
                            var u = {};
                            u.data = f[n].expressInstall;
                            u.width = o.getAttribute("width") || "0";
                            u.height = o.getAttribute("height") || "0";
                            if (o.getAttribute("class")) {
                                u.styleclass = o.getAttribute("class")
                            }
                            if (o.getAttribute("align")) {
                                u.align = o.getAttribute("align")
                            }
                            var a = {};
                            var c = o.getElementsByTagName("param");
                            var h = c.length;
                            for (var d = 0; d < h; d++) {
                                if (c[d].getAttribute("name").toLowerCase() != "movie") {
                                    a[c[d].getAttribute("name")] = c[d].getAttribute("value")
                                }
                            }
                            showExpressInstall(u, a, r, i)
                        } else {
                            displayAltContent(o);
                            if (i) {
                                i(s)
                            }
                        }
                    }
                } else {
                    setVisibility(r, true);
                    if (i) {
                        var v = getObjectById(r);
                        if (v && typeof v.SetVariable != e) {
                            s.success = true;
                            s.ref = v
                        }
                        i(s)
                    }
                }
            }
        }
    }

    function p(e) {
        var t = l.pv,
            n = e.split(".");
        n[0] = parseInt(n[0], 10);
        n[1] = parseInt(n[1], 10) || 0;
        n[2] = parseInt(n[2], 10) || 0;
        return t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? true : false
    }

    function d(t) {
        var n = /[\\\"<>\.;]/;
        var r = n.exec(t) != null;
        return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t
    }
    var e = "undefined",
        t = "object",
        n = "Shockwave Flash",
        r = "ShockwaveFlash.ShockwaveFlash",
        i = "application/x-shockwave-flash",
        s = window,
        o = document,
        u = navigator,
        a = false,
        f = [],
        l = function() {
            var f = typeof o.getElementById != e && typeof o.getElementsByTagName != e && typeof o.createElement != e,
                l = u.userAgent.toLowerCase(),
                c = u.platform.toLowerCase(),
                h = c ? /win/.test(c) : /win/.test(l),
                p = c ? /mac/.test(c) : /mac/.test(l),
                d = /webkit/.test(l) ? parseFloat(l.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                v = !+"1",
                m = [0, 0, 0],
                g = null;
            if (typeof u.plugins != e && typeof u.plugins[n] == t) {
                g = u.plugins[n].description;
                if (g && !(typeof u.mimeTypes != e && u.mimeTypes[i] && !u.mimeTypes[i].enabledPlugin)) {
                    a = true;
                    v = false;
                    g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10);
                    m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else if (typeof s.ActiveXObject != e) {
                try {
                    var y = new ActiveXObject(r);
                    if (y) {
                        g = y.GetVariable("$version");
                        if (g) {
                            v = true;
                            g = g.split(" ")[1].split(",");
                            m = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]
                        }
                    }
                } catch (b) {}
            }
            return {
                w3: f,
                pv: m,
                wk: d,
                ie: v,
                win: h,
                mac: p
            }
        }();
    return {
        hasFlashPlayerVersion: p
    }
}();
(function(e) {
    var t = function(n, r, i) {
        var s = this;
        var o = t.prototype;
        this.screenToTest = n;
        this.screenToTest2 = r;
        this.hideDelay = i;
        this.globalX = 0;
        this.globalY = 0;
        this.currentTime;
        this.checkIntervalId_int;
        this.hideCompleteId_to;
        this.hasInitialTestEvents_bl = false;
        this.addSecondTestEvents_bl = false;
        this.dispatchOnceShow_bl = true;
        this.dispatchOnceHide_bl = false;
        this.isStopped_bl = true;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        s.init = function() {};
        s.start = function() {
            s.currentTime = (new Date).getTime();
            clearInterval(s.checkIntervalId_int);
            s.checkIntervalId_int = setInterval(s.update, 100);
            s.addMouseOrTouchCheck();
            s.isStopped_bl = false
        };
        s.stop = function() {
            clearInterval(s.checkIntervalId_int);
            s.isStopped_bl = true;
            s.removeMouseOrTouchCheck();
            s.removeMouseOrTouchCheck2()
        };
        s.addMouseOrTouchCheck = function() {
            if (s.hasInitialTestEvents_bl) return;
            s.hasInitialTestEvents_bl = true;
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.screenToTest.screen.addEventListener("MSPointerDown", s.onMouseOrTouchUpdate);
                    s.screenToTest.screen.addEventListener("MSPointerMove", s.onMouseOrTouchUpdate)
                } else {
                    s.screenToTest.screen.addEventListener("touchstart", s.onMouseOrTouchUpdate)
                }
            } else if (e.addEventListener) {
                e.addEventListener("mousemove", s.onMouseOrTouchUpdate)
            } else if (document.attachEvent) {
                document.attachEvent("onmousemove", s.onMouseOrTouchUpdate)
            }
        };
        s.removeMouseOrTouchCheck = function() {
            if (!s.hasInitialTestEvents_bl) return;
            s.hasInitialTestEvents_bl = false;
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.screenToTest.screen.removeEventListener("MSPointerDown", s.onMouseOrTouchUpdate);
                    s.screenToTest.screen.removeEventListener("MSPointerMove", s.onMouseOrTouchUpdate)
                } else {
                    s.screenToTest.screen.removeEventListener("touchstart", s.onMouseOrTouchUpdate)
                }
            } else if (e.removeEventListener) {
                e.removeEventListener("mousemove", s.onMouseOrTouchUpdate)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", s.onMouseOrTouchUpdate)
            }
        };
        s.addMouseOrTouchCheck2 = function() {
            if (s.addSecondTestEvents_bl) return;
            s.addSecondTestEvents_bl = true;
            if (s.screenToTest.screen.addEventListener) {
                s.screenToTest.screen.addEventListener("mousemove", s.secondTestMoveDummy)
            } else if (s.screenToTest.screen.attachEvent) {
                s.screenToTest.screen.attachEvent("onmousemove", s.secondTestMoveDummy)
            }
        };
        s.removeMouseOrTouchCheck2 = function() {
            if (!s.addSecondTestEvents_bl) return;
            s.addSecondTestEvents_bl = false;
            if (s.screenToTest.screen.removeEventListener) {
                s.screenToTest.screen.removeEventListener("mousemove", s.secondTestMoveDummy)
            } else if (s.screenToTest.screen.detachEvent) {
                s.screenToTest.screen.detachEvent("onmousemove", s.secondTestMoveDummy)
            }
        };
        this.secondTestMoveDummy = function() {
            s.removeMouseOrTouchCheck2();
            s.addMouseOrTouchCheck()
        };
        s.onMouseOrTouchUpdate = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            if (s.globalX != t.screenX && s.globalY != t.screenY) {
                s.currentTime = (new Date).getTime()
            }
            s.globalX = t.screenX;
            s.globalY = t.screenY;
            if (!s.isMobile_bl) {
                if (!FWDUVPUtils.hitTest(s.screenToTest.screen, s.globalX, s.globalY)) {
                    s.removeMouseOrTouchCheck();
                    s.addMouseOrTouchCheck2()
                }
            }
        };
        s.update = function(e) {
            if ((new Date).getTime() > s.currentTime + s.hideDelay) {
                if (s.dispatchOnceShow_bl) {
                    s.dispatchOnceHide_bl = true;
                    s.dispatchOnceShow_bl = false;
                    s.dispatchEvent(t.HIDE);
                    clearTimeout(s.hideCompleteId_to);
                    s.hideCompleteId_to = setTimeout(function() {
                        s.dispatchEvent(t.HIDE_COMPLETE)
                    }, 1e3)
                }
            } else {
                if (s.dispatchOnceHide_bl) {
                    clearTimeout(s.hideCompleteId_to);
                    s.dispatchOnceHide_bl = false;
                    s.dispatchOnceShow_bl = true;
                    s.dispatchEvent(t.SHOW)
                }
            }
        };
        s.reset = function() {
            clearTimeout(s.hideCompleteId_to);
            s.currentTime = (new Date).getTime();
            s.dispatchEvent(t.SHOW)
        };
        s.destroy = function() {
            s.removeMouseOrTouchCheck();
            clearInterval(s.checkIntervalId_int);
            s.screenToTest = null;
            n = null;
            s.init = null;
            s.start = null;
            s.stop = null;
            s.addMouseOrTouchCheck = null;
            s.removeMouseOrTouchCheck = null;
            s.onMouseOrTouchUpdate = null;
            s.update = null;
            s.reset = null;
            s.destroy = null;
            o.destroy();
            o = null;
            s = null;
            t.prototype = null
        };
        s.init()
    };
    t.HIDE = "hide";
    t.SHOW = "show";
    t.HIDE_COMPLETE = "hideComplete";
    t.setPrototype = function() {
        t.prototype = new FWDUVPEventDispatcher
    };
    e.FWDUVPHider = t
})(window);
(function(e) {
    var t = function(e) {
        var n = this;
        var r = t.prototype;
        this.bk_do = null;
        this.textHolder_do = null;
        this.show_to = null;
        this.isShowed_bl = false;
        this.isShowedOnce_bl = false;
        this.allowToRemove_bl = true;
        this.init = function() {
            n.setResizableSizeAfterParent();
            n.bk_do = new FWDUVPDisplayObject("div");
            n.bk_do.setAlpha(.3);
            n.bk_do.setBkColor("#FF0000");
            n.addChild(n.bk_do);
            n.textHolder_do = new FWDUVPDisplayObject("div");
            n.textHolder_do.getStyle().display = "inline-block";
            n.textHolder_do.getStyle().padding = "10px";
            n.textHolder_do.getStyle().paddingBottom = "0px";
            n.textHolder_do.getStyle().lineHeight = "18px";
            n.textHolder_do.setBkColor("#FF0000");
            n.textHolder_do.getStyle().color = "#000000";
            n.addChild(n.textHolder_do)
        };
        this.showText = function(e) {
            if (!n.isShowedOnce_bl) {
                if (n.screen.addEventListener) {
                    n.screen.addEventListener("click", n.closeWindow)
                } else if (n.screen.attachEvent) {
                    n.screen.attachEvent("onclick", n.closeWindow)
                }
                n.isShowedOnce_bl = true
            }
            n.setVisible(false);
            if (n.allowToRemove_bl) {
                n.textHolder_do.setInnerHTML(e + "<p><font color='#FFFFFF'>Click or tap to close this window.</font>")
            } else {
                n.textHolder_do.getStyle().paddingBottom = "10px";
                n.textHolder_do.setInnerHTML(e)
            }
            clearTimeout(n.show_to);
            n.show_to = setTimeout(n.show, 60);
            setTimeout(function() {
                n.positionAndResize()
            }, 10)
        };
        this.show = function() {
            n.isShowed_bl = true;
            n.setVisible(true);
            n.positionAndResize()
        };
        this.positionAndResize = function() {
            var t = Math.min(520, e.stageWidth - 40);
            var r = n.textHolder_do.screen.offsetHeight;
            var i = parseInt((e.stageWidth - t) / 2) - 10;
            var s = parseInt((e.stageHeight - r) / 2);
            n.bk_do.setWidth(e.stageWidth);
            n.bk_do.setHeight(e.stageHeight);
            n.textHolder_do.setX(i);
            n.textHolder_do.setY(s);
            n.textHolder_do.setWidth(t)
        };
        this.closeWindow = function() {
            if (!n.allowToRemove_bl) return;
            n.isShowed_bl = false;
            clearTimeout(n.show_to);
            try {
                e.main_do.removeChild(n)
            } catch (t) {}
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div", "relative")
    };
    t.prototype = null;
    e.FWDUVPInfo = t
})(window);
(function(e) {
    var t = function(e, n) {
        var r = this;
        var i = t.prototype;
        this.xhr = null;
        this.embedColoseN_img = n.embedColoseN_img;
        this.mainBk_do = null;
        this.mainHolder_do = null;
        this.mainTextHolder_do = null;
        this.text_do = null;
        this.bk_do = null;
        this.closeButton_do = null;
        this.embedWindowBackground_str = n.embedWindowBackground_str;
        this.embedWindowInputBackgroundPath_str = n.embedWindowInputBackgroundPath_str;
        this.secondaryLabelsColor_str = n.secondaryLabelsColor_str;
        this.inputColor_str = n.inputColor_str;
        this.sendButtonNPath_str = n.sendButtonNPath_str;
        this.sendButtonSPath_str = n.sendButtonSPath_str;
        this.inputBackgroundColor_str = n.inputBackgroundColor_str;
        this.borderColor_str = n.borderColor_str;
        this.sendToAFriendPath_str = n.sendToAFriendPath_str;
        this.maxTextWidth = 0;
        this.totalWidth = 0;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.buttonWidth = 44;
        this.buttonHeight = 19;
        this.embedWindowCloseButtonMargins = n.embedWindowCloseButtonMargins;
        this.finalEmbedPath_str = null;
        this.finalEmbedCode_str = null;
        this.linkToVideo_str = null;
        this.shareAndEmbedTextColor_str = n.shareAndEmbedTextColor_str;
        this.isYTB_bl = false;
        this.isShowed_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.init = function() {
            r.setBackfaceVisibility();
            r.mainHolder_do = new FWDUVPDisplayObject("div");
            r.mainBk_do = new FWDUVPDisplayObject("div");
            r.mainBk_do.getStyle().width = "100%";
            r.mainBk_do.getStyle().height = "100%";
            r.mainBk_do.setAlpha(.9);
            r.mainBk_do.getStyle().background = "url('" + r.embedWindowBackground_str + "')";
            r.mainTextHolder_do = new FWDUVPDisplayObject("div", "absolute");
            r.bk_do = new FWDUVPDisplayObject("div");
            r.bk_do.getStyle().background = "url('" + r.embedWindowBackground_str + "')";
            r.bk_do.getStyle().borderStyle = "solid";
            r.bk_do.getStyle().borderWidth = "1px";
            r.bk_do.getStyle().borderColor = r.borderColor_str;
            r.text_do = new FWDUVPDisplayObject("div", "relative");
            r.text_do.hasTransform3d_bl = false;
            r.text_do.hasTransform2d_bl = false;
            r.text_do.getStyle().fontFamily = "Arial";
            r.text_do.getStyle().fontSize = "12px";
            r.text_do.getStyle().fontSmoothing = "antialiased";
            r.text_do.getStyle().webkitFontSmoothing = "antialiased";
            r.text_do.getStyle().textRendering = "optimizeLegibility";
            FWDUVPSimpleSizeButton.setPrototype();
            r.closeButton_do = new FWDUVPSimpleSizeButton(r.embedColoseN_img.src, n.embedWindowClosePathS_str, r.embedColoseN_img.width, r.embedColoseN_img.height);
            r.closeButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, r.closeButtonOnMouseUpHandler);
            r.mainHolder_do.addChild(r.mainBk_do);
            r.mainTextHolder_do.addChild(r.bk_do);
            r.mainTextHolder_do.addChild(r.text_do);
            r.mainHolder_do.addChild(r.mainTextHolder_do);
            r.addChild(r.mainHolder_do);
            r.mainHolder_do.addChild(r.closeButton_do)
        };
        this.closeButtonOnMouseUpHandler = function() {
            if (!r.isShowed_bl) return;
            r.hide()
        };
        this.positionAndResize = function() {
            r.stageWidth = e.stageWidth;
            if (e.displayType == FWDUVPlayer.FULL_SCREEN) {
                r.stageHeight = e.tempVidStageHeight
            } else {
                r.stageHeight = e.tempVidStageHeight
            }
            r.maxTextWidth = Math.min(r.stageWidth - 150, 500);
            r.totalWidth = r.maxTextWidth + r.buttonWidth + 40;
            r.positionFinal();
            r.closeButton_do.setX(r.stageWidth - r.closeButton_do.w - r.embedWindowCloseButtonMargins);
            r.closeButton_do.setY(r.embedWindowCloseButtonMargins);
            r.setWidth(r.stageWidth);
            r.setHeight(r.stageHeight);
            r.mainHolder_do.setWidth(r.stageWidth);
            r.mainHolder_do.setHeight(r.stageHeight)
        };
        this.positionFinal = function() {
            var e;
            var t = false;
            r.mainTextHolder_do.setWidth(r.totalWidth);
            if (t) {
                e = Math.round(r.mainTextHolder_do.screen.getBoundingClientRect().height * 100)
            } else {
                e = r.mainTextHolder_do.getHeight()
            }
            r.bk_do.setWidth(r.totalWidth - 2);
            r.bk_do.setHeight(e - 2);
            r.mainTextHolder_do.setX(parseInt((r.stageWidth - r.totalWidth) / 2));
            r.mainTextHolder_do.setY(parseInt((r.stageHeight - e) / 2) - 8)
        };
        this.show = function(t) {
            if (r.isShowed_bl) return;
            r.isShowed_bl = true;
            e.main_do.addChild(r);
            r.text_do.setInnerHTML(t);
            r.positionAndResize();
            clearTimeout(r.hideCompleteId_to);
            clearTimeout(r.showCompleteId_to);
            r.mainHolder_do.setY(-r.stageHeight);
            r.showCompleteId_to = setTimeout(r.showCompleteHandler, 900);
            setTimeout(function() {
                FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100)
        };
        this.showCompleteHandler = function() {};
        this.hide = function() {
            if (!r.isShowed_bl) return;
            r.isShowed_bl = false;
            if (e.customContextMenu_do) e.customContextMenu_do.enable();
            r.positionAndResize();
            clearTimeout(r.hideCompleteId_to);
            clearTimeout(r.showCompleteId_to);
            r.hideCompleteId_to = setTimeout(r.hideCompleteHandler, 800);
            FWDUVPTweenMax.killTweensOf(r.mainHolder_do);
            FWDUVPTweenMax.to(r.mainHolder_do, .8, {
                y: -r.stageHeight,
                ease: Expo.easeInOut
            })
        };
        this.hideCompleteHandler = function() {
            e.main_do.removeChild(r);
            r.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.ERROR = "error";
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDUVPInfoWindow = t
})(window);
(function(e) {
    var t = function(n) {
        var r = this;
        t.instaces_ar.push(this);
        this.isInstantiate_bl = false;
        this.displayType = n.displayType || t.RESPONSIVE;
        if (r.displayType.toLowerCase() != t.RESPONSIVE && r.displayType.toLowerCase() != t.FULL_SCREEN) {
            r.displayType = t.RESPONSIVE
        }
        this.maxWidth = n.maxWidth || 640;
        this.maxHeight = n.maxHeight || 380;
        this.embeddedPlaylistId;
        this.embeddedVideoId;
        this.isEmbedded_bl = false;
        r.init = function() {
            if (r.isInstantiate_bl) return;
            TweenLite.ticker.useRAF(false);
            this.props_obj = n;
            this.mustHaveHolderDiv_bl = false;
            this.instanceName_str = this.props_obj.instanceName;
            if (!this.instanceName_str) {
                alert("FWDUVPlayer instance name is required please make sure that the instanceName parameter exsists and it's value is uinique.");
                return
            }
            if (e[this.instanceName_str]) {
                alert("FWDUVPlayer instance name " + this.instanceName_str + " is already defined and contains a different instance reference, set a different instance name.");
                return
            } else {
                e[this.instanceName_str] = this
            }
            if (!this.props_obj) {
                alert("FWDUVPlayer constructor properties object is not defined!");
                return
            }
            if (!this.props_obj.parentId) {
                alert("Property parentId is not defined in the FWDUVPlayer constructor, self property represents the div id into which the megazoom is added as a child!");
                return
            }
            if (r.displayType == t.RESPONSIVE) r.mustHaveHolderDiv_bl = true;
            if (r.mustHaveHolderDiv_bl && !FWDUVPUtils.getChildById(r.props_obj.parentId)) {
                alert("FWDUVPlayer holder div is not found, please make sure that the div exsists and the id is correct! " + r.props_obj.parentId);
                return
            }
            this.body = document.getElementsByTagName("body")[0];
            this.stageContainer = null;
            if (this.isEmbedded_bl) this.displayType = t.FULL_SCREEN;
            if (r.displayType == t.FULL_SCREEN) {
                e.scrollTo(0, 0);
                if (FWDUVPUtils.isIEAndLessThen9) {
                    r.stageContainer = r.body
                } else {
                    r.stageContainer = document.documentElement
                }
            } else {
                this.stageContainer = FWDUVPUtils.getChildById(r.props_obj.parentId)
            }
            this.listeners = {
                events_ar: []
            };
            this.customContextMenu_do = null;
            this.info_do = null;
            this.categories_do = null;
            this.playlist_do = null;
            this.main_do = null;
            this.ytb_do = null;
            this.preloader_do = null;
            this.controller_do = null;
            this.videoScreen_do = null;
            this.flash_do = null;
            this.flashObject = null;
            this.videoPoster_do = null;
            this.largePlayButton_do = null;
            this.hider = null;
            this.facebookShare = null;
            this.videoHolder_do = null;
            this.videoHider_do = null;
            this.disableClick_do = null;
            this.embedWindow_do = null;
            this.spaceBetweenControllerAndPlaylist = r.props_obj.spaceBetweenControllerAndPlaylist || 1;
            this.autoScale_bl = r.props_obj.autoScale;
            this.autoScale_bl = r.autoScale_bl == "yes" ? true : false;
            this.backgroundColor_str = r.props_obj.backgroundColor || "transparent";
            this.videoBackgroundColor_str = r.props_obj.videoBackgroundColor || "transparent";
            this.flashObjectMarkup_str = null;
            this.lastX = 0;
            this.lastY = 0;
            this.tempStageWidth = 0;
            this.tempStageHeight = 0;
            this.tempVidStageWidth = 0;
            this.tempVidStageHeight = 0;
            this.stageWidth = 0;
            this.stageHeight = 0;
            this.vidStageWidth = 0;
            this.vidStageHeight = 0;
            this.firstTapX;
            this.firstTapY;
            this.curTime;
            this.totalTime;
            this.catId = -1;
            this.id = -1;
            this.totalVideos = 0;
            this.prevCatId = -1;
            this.videoSourcePath_str = r.props_obj.videoSourcePath;
            this.prevVideoSourcePath_str;
            this.posterPath_str = r.props_obj.posterPath;
            this.videoType_str;
            this.videoStartBehaviour_str;
            this.prevVideoSource_str;
            this.prevPosterSource_str;
            this.finalVideoPath_str;
            this.playListThumbnailWidth = r.props_obj.thumbnailWidth || 80;
            this.playListThumbnailHeight = r.props_obj.thumbnailHeight || 80;
            this.playlistWidth = r.props_obj.playlistRightWidth || 250;
            this.playlistHeight = 0;
            this.resizeHandlerId_to;
            this.resizeHandler2Id_to;
            this.hidePreloaderId_to;
            this.orientationChangeId_to;
            this.disableClickId_to;
            this.clickDelayId_to;
            this.secondTapId_to;
            this.videoHiderId_to;
            this.showPlaylistButtonAndPlaylist_bl = r.props_obj.showPlaylistButtonAndPlaylist;
            this.showPlaylistButtonAndPlaylist_bl = r.showPlaylistButtonAndPlaylist_bl == "no" ? false : true;
            this.isPlaylistShowed_bl = r.props_obj.showPlaylistByDefault;
            this.isPlaylistShowed_bl = r.isPlaylistShowed_bl == "no" ? false : true;
            this.isVideoPlayingWhenOpenWindows_bl = false;
            this.isFirstPlaylistLoaded_bl = false;
            this.isVideoHiderShowed_bl = false;
            this.isSpaceDown_bl = false;
            this.isPlaying_bl = false;
            this.firstTapPlaying_bl = false;
            this.stickOnCurrentInstanceKey_bl = false;
            this.isFullScreen_bl = false;
            this.isFlashScreenReady_bl = false;
            this.orintationChangeComplete_bl = true;
            this.disableClick_bl = false;
            this.useYoutube_bl = t.useYoutube;
            this.useYoutube_bl = r.useYoutube_bl == "yes" ? true : false;
            this.isAPIReady_bl = false;
            this.isInstantiate_bl = true;
            this.isPlaylistLoaded_bl = false;
            this.isPlaylistLoadedFirstTime_bl = false;
            this.useDeepLinking_bl = r.props_obj.useDeepLinking;
            this.useDeepLinking_bl = r.useDeepLinking_bl == "yes" ? true : false;
            this.isAdd_bl = false;
            this.isMobile_bl = FWDUVPUtils.isMobile;
            this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
            this.setupMainDo();
            this.startResizeHandler();
            this.setupInfo();
            this.setupData()
        };
        r.setupMainDo = function() {
            r.main_do = new FWDUVPDisplayObject("div", "relative");
            r.main_do.getStyle().msTouchAction = "none";
            r.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
            r.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)";
            r.main_do.getStyle().width = "100%";
            r.main_do.getStyle().height = "100%";
            r.main_do.setBackfaceVisibility();
            r.main_do.setBkColor(r.backgroundColor_str);
            if (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) r.main_do.setSelectable(false);
            r.videoHolder_do = new FWDUVPDisplayObject("div");
            r.main_do.addChild(r.videoHolder_do);
            r.stageContainer.style.overflow = "hidden";
            if (r.displayType == t.FULL_SCREEN) {
                r.main_do.getStyle().position = "absolute";
                document.documentElement.appendChild(r.main_do.screen);
                r.main_do.getStyle().zIndex = 9999999999998
            } else {
                r.stageContainer.appendChild(r.main_do.screen)
            }
        };
        r.setupInfo = function() {
            FWDUVPInfo.setPrototype();
            r.info_do = new FWDUVPInfo(r)
        };
        r.startResizeHandler = function() {
            if (e.addEventListener) {
                e.addEventListener("resize", r.onResizeHandler)
            } else if (e.attachEvent) {
                e.attachEvent("onresize", r.onResizeHandler)
            }
            r.onResizeHandler(true);
            r.resizeHandlerId_to = setTimeout(function() {
                r.resizeHandler()
            }, 500)
        };
        r.stopResizeHandler = function() {
            if (e.removeEventListener) {
                e.removeEventListener("resize", r.onResizeHandler)
            } else if (e.detachEvent) {
                e.detachEvent("onresize", r.onResizeHandler)
            }
            clearTimeout(r.resizeHandlerId_to)
        };
        r.onResizeHandler = function(e) {
            r.resizeHandler();
            clearTimeout(r.resizeHandler2Id_to);
            r.resizeHandler2Id_to = setTimeout(function() {
                r.resizeHandler()
            }, 300)
        };
        r.resizeHandler = function(e, n) {
            r.tempPlaylistPosition_str;
            var i = FWDUVPUtils.getViewportSize();
            if (r.isFullScreen_bl || r.displayType == t.FULL_SCREEN) {
                r.main_do.setX(0);
                r.main_do.setY(0);
                r.stageWidth = i.w;
                r.stageHeight = i.h
            } else {
                r.stageContainer.style.width = "100%";
                if (r.stageContainer.offsetWidth > r.maxWidth) {
                    r.stageContainer.style.width = r.maxWidth + "px"
                }
                r.stageWidth = r.stageContainer.offsetWidth;
                if (r.autoScale_bl) {
                    r.stageHeight = parseInt(r.maxHeight * (r.stageWidth / r.maxWidth))
                } else {
                    r.stageHeight = r.maxHeight
                }
            }
            if (FWDUVPUtils.isIEAndLessThen9 && r.stageWidth < 400) r.stageWidth = 400;
            if (r.stageHeight < 320) r.stageHeight = 320;
            if (r.stageHeight > i.h && r.isFullScreen_bl) r.stageHeight = i.h;
            if (r.data && r.playlist_do) {
                r.playlistHeight = parseInt(r.data.playlistBottomHeight * (r.stageWidth / r.maxWidth));
                if (r.playlistHeight < 300) r.playlistHeight = 300
            }
            if (r.data) {
                r.tempPlaylistPosition_str = r.data.playlistPosition_str;
                if (r.stageWidth < 600) {
                    r.tempPlaylistPosition_str = "bottom"
                }
                r.playlistPosition_str = r.tempPlaylistPosition_str;
                if (r.playlist_do) r.playlist_do.position_str = r.tempPlaylistPosition_str
            }
            if (r.playlist_do && r.isPlaylistShowed_bl) {
                if (r.playlistPosition_str == "bottom") {
                    r.vidStageWidth = r.stageWidth;
                    r.stageHeight += r.playlistHeight + r.spaceBetweenControllerAndPlaylist;
                    r.vidStageHeight = r.stageHeight - r.playlistHeight - r.spaceBetweenControllerAndPlaylist;
                    if (r.displayType == t.FULL_SCREEN) r.controller_do.disablePlaylistButton()
                } else if (r.playlistPosition_str == "right") {
                    if (r.isFullScreen_bl) {
                        r.vidStageWidth = r.stageWidth
                    } else {
                        r.vidStageWidth = r.stageWidth - r.playlistWidth - r.spaceBetweenControllerAndPlaylist
                    }
                    r.controller_do.enablePlaylistButton();
                    r.vidStageHeight = r.stageHeight
                }
            } else {
                r.vidStageWidth = r.stageWidth;
                r.vidStageHeight = r.stageHeight
            }
            if (r.playlist_do) {
                if (r.playlistPosition_str == "right") {
                    if (r.isFullScreen_bl) {
                        r.controller_do.disablePlaylistButton()
                    } else {
                        r.controller_do.enablePlaylistButton()
                    }
                } else if (r.isEmbedded_bl) {
                    r.controller_do.disablePlaylistButton()
                }
            }
            if (!e || r.isMobile_bl) {
                FWDUVPTweenMax.killTweensOf(r);
                r.tempStageWidth = r.stageWidth;
                r.tempStageHeight = r.stageHeight;
                r.tempVidStageWidth = r.vidStageWidth;
                r.tempVidStageHeight = Math.max(0, r.vidStageHeight);
                r.resizeFinal(n)
            }
        };
        this.resizeFinal = function(e) {
            r.stageContainer.style.height = r.tempStageHeight + "px";
            r.main_do.setWidth(r.tempStageWidth);
            if (r.showPlaylistButtonAndPlaylist_bl && r.isPlaylistShowed_bl && r.playlistPosition_str == "bottom") {
                r.main_do.setHeight(r.tempStageHeight)
            } else {
                r.main_do.setHeight(r.tempStageHeight)
            }
            r.videoHolder_do.setWidth(r.tempVidStageWidth);
            r.videoHolder_do.setHeight(r.tempVidStageHeight);
            if (r.isFlashScreenReady_bl && r.videoType_str == t.VIDEO) {
                r.flash_do.setWidth(r.tempVidStageWidth);
                r.flash_do.setHeight(r.tempVidStageHeight)
            }
            if (r.ytb_do && r.videoType_str == t.YOUTUBE) {
                r.ytb_do.setWidth(r.tempVidStageWidth);
                r.ytb_do.setHeight(r.tempVidStageHeight)
            }
            if (r.logo_do) r.logo_do.positionAndResize();
            if (r.playlist_do && !FWDUVPTweenMax.isTweening(r)) {
                if (r.isMobile_bl) {
                    r.playlist_do.resizeAndPosition(false)
                } else {
                    r.playlist_do.resizeAndPosition(e)
                }
            }
            if (r.controller_do) r.controller_do.resizeAndPosition();
            if (r.categories_do) r.categories_do.resizeAndPosition();
            if (r.videoScreen_do && r.videoType_str == t.VIDEO) {
                r.videoScreen_do.resizeAndPosition(r.tempVidStageWidth, r.tempVidStageHeight)
            }
            if (r.ytb_do && r.ytb_do.ytb && r.videoType_str == t.YOUTUBE) {
                r.ytb_do.resizeAndPosition()
            }
            if (r.preloader_do) r.positionPreloader();
            if (r.dumyClick_do) {
                r.dumyClick_do.setWidth(r.tempVidStageWidth);
                if (r.isMobile_bl) {
                    r.dumyClick_do.setHeight(r.tempVidStageHeight)
                } else {
                    if (r.videoType_str == t.YOUTUBE) {
                        r.dumyClick_do.setHeight(r.tempVidStageHeight - 93)
                    } else {
                        r.dumyClick_do.setHeight(r.tempVidStageHeight)
                    }
                }
            }
            if (r.videoHider_do) r.resizeVideoHider();
            if (r.largePlayButton_do) r.positionLargePlayButton();
            if (r.videoPoster_do && r.videoPoster_do.allowToShow_bl) r.videoPoster_do.positionAndResize();
            if (r.embedWindow_do && r.embedWindow_do.isShowed_bl) r.embedWindow_do.positionAndResize();
            if (r.infoWindow_do && r.infoWindow_do.isShowed_bl) r.infoWindow_do.positionAndResize();
            if (r.info_do && r.info_do.isShowed_bl) r.info_do.positionAndResize();
            if (r.adsStart_do) r.positionAds()
        };
        this.setupClickScreen = function() {
            r.dumyClick_do = new FWDUVPDisplayObject("div");
            if (FWDUVPUtils.isIE) {
                r.dumyClick_do.setBkColor("#00FF00");
                r.dumyClick_do.setAlpha(1e-4)
            }
            if (r.dumyClick_do.screen.addEventListener) {
                r.dumyClick_do.screen.addEventListener("click", r.playPauseClickHandler)
            } else if (r.dumyClick_do.screen.attachEvent) {
                r.dumyClick_do.screen.attachEvent("onclick", r.playPauseClickHandler)
            }
            r.hideClickScreen();
            r.videoHolder_do.addChild(r.dumyClick_do)
        };
        this.playPauseClickHandler = function(n) {
            if (n.button == 2) return;
            if (r.isAdd_bl) {
                if (r.data.playlist_ar[r.id].ads.pageToOpen && r.data.playlist_ar[r.id].ads.pageToOpen != "none") {
                    e.open(r.data.playlist_ar[r.id].ads.pageToOpen, r.data.playlist_ar[r.id].ads.pageTarget);
                    r.pause()
                }
                return
            }
            if (r.disableClick_bl) return;
            r.firstTapPlaying_bl = r.isPlaying_bl;
            t.keyboardCurInstance = r;
            if (r.controller_do.mainHolder_do.y != 0 && r.isMobile_bl) return;
            if (r.videoType_str == t.YOUTUBE) {
                r.ytb_do.togglePlayPause()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.togglePlayPause()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.togglePlayPause()
            }
        };
        this.showClickScreen = function() {
            r.dumyClick_do.setVisible(true);
            if (r.isAdd_bl && r.data.playlist_ar[r.id].ads.pageToOpen != "none") {
                r.dumyClick_do.setButtonMode(true)
            } else {
                r.dumyClick_do.setButtonMode(false)
            }
        };
        this.hideClickScreen = function() {
            r.dumyClick_do.setVisible(false)
        };
        this.setupDisableClick = function() {
            r.disableClick_do = new FWDUVPDisplayObject("div");
            if (FWDUVPUtils.isIE) {
                r.disableClick_do.setBkColor("#FFFFFF");
                r.disableClick_do.setAlpha(.001)
            }
            r.main_do.addChild(r.disableClick_do)
        };
        this.disableClick = function() {
            r.disableClick_bl = true;
            clearTimeout(r.disableClickId_to);
            if (r.disableClick_do) {
                r.disableClick_do.setWidth(r.stageWidth);
                r.disableClick_do.setHeight(r.stageHeight)
            }
            r.disableClickId_to = setTimeout(function() {
                if (r.disableClick_do) {
                    r.disableClick_do.setWidth(0);
                    r.disableClick_do.setHeight(0)
                }
                r.disableClick_bl = false
            }, 500)
        };
        this.showDisable = function() {
            if (r.disableClick_do.w == r.stageWidth) return;
            r.disableClick_do.setWidth(r.stageWidth);
            r.disableClick_do.setHeight(r.stageHeight)
        };
        this.hideDisable = function() {
            if (!r.disableClick_do) return;
            if (r.disableClick_do.w == 0) return;
            r.disableClick_do.setWidth(0);
            r.disableClick_do.setHeight(0)
        };
        this.addDoubleClickSupport = function() {
            if (!r.isMobile_bl && r.dumyClick_do.screen.addEventListener) {
                r.dumyClick_do.screen.addEventListener("mousedown", r.onFirstDown);
                if (FWDUVPUtils.isIEWebKit) r.dumyClick_do.screen.addEventListener("dblclick", r.onSecondDown)
            } else if (r.isMobile_bl) {
                r.dumyClick_do.screen.addEventListener("touchstart", r.onFirstDown)
            } else if (r.dumyClick_do.screen.addEventListener) {
                r.dumyClick_do.screen.addEventListener("mousedown", r.onFirstDown)
            }
        };
        this.onFirstDown = function(e) {
            if (e.button == 2) return;
            if (r.isFullscreen_bl && e.preventDefault) e.preventDefault();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            r.firstTapX = t.screenX;
            r.firstTapY = t.screenY;
            r.firstTapPlaying_bl = r.isPlaying_bl;
            if (FWDUVPUtils.isIEWebKit) return;
            if (r.isMobile_bl) {
                r.dumyClick_do.screen.addEventListener("touchstart", r.onSecondDown);
                r.dumyClick_do.screen.removeEventListener("touchstart", r.onFirstDown)
            } else {
                if (r.dumyClick_do.screen.addEventListener) {
                    r.dumyClick_do.screen.addEventListener("mousedown", r.onSecondDown);
                    r.dumyClick_do.screen.removeEventListener("mousedown", r.onFirstDown)
                }
            }
            clearTimeout(r.secondTapId_to);
            r.secondTapId_to = setTimeout(r.doubleTapExpired, 250)
        };
        this.doubleTapExpired = function() {
            clearTimeout(r.secondTapId_to);
            if (r.isMobile_bl) {
                r.dumyClick_do.screen.removeEventListener("touchstart", r.onSecondDown);
                r.dumyClick_do.screen.addEventListener("touchstart", r.onFirstDown)
            } else {
                if (r.dumyClick_do.screen.addEventListener) {
                    r.dumyClick_do.screen.removeEventListener("mousedown", r.onSecondDown);
                    r.dumyClick_do.screen.addEventListener("mousedown", r.onFirstDown)
                }
            }
        };
        this.onSecondDown = function(e) {
            if (e.preventDefault) e.preventDefault();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var n;
            var i;
            if (FWDUVPUtils.isIEWebKit) r.firstTapPlaying_bl = r.isPlaying_bl;
            if (e.touches && e.touches.length != 1) return;
            n = Math.abs(t.screenX - r.firstTapX);
            i = Math.abs(t.screenY - r.firstTapY);
            if (r.isMobile_bl && (n > 10 || i > 10)) {
                return
            } else if (!r.isMobile_bl && (n > 2 || i > 2)) {
                return
            }
            r.switchFullScreenOnDoubleClick();
            if (!FWDUVPUtils.isIEWebKit) {
                if (r.firstTapPlaying_bl) {
                    r.play()
                } else {
                    r.pause()
                }
            }
        };
        this.switchFullScreenOnDoubleClick = function() {
            r.disableClick();
            if (!r.isFullScreen_bl) {
                r.goFullScreen()
            } else {
                r.goNormalScreen()
            }
        };
        this.setupFacebook = function() {
            if (document.location.protocol == "file:") return;
            r.facebookShare = new FWDUVPFacebookShare(r.data.facebookAppId_str)
        };
        this.setupVideoHider = function() {
            r.videoHider_do = new FWDUVPDisplayObject("div");
            r.videoHider_do.setBkColor(r.backgroundColor_str);
            r.videoHolder_do.addChild(r.videoHider_do)
        };
        this.showVideoHider = function() {
            if (r.isVideoHiderShowed_bl || !r.videoHider_do) return;
            r.isVideoHiderShowed_bl = true;
            r.videoHider_do.setVisible(true);
            r.resizeVideoHider()
        };
        this.hideVideoHider = function() {
            if (!r.isVideoHiderShowed_bl) return;
            r.isVideoHiderShowed_bl = false;
            clearTimeout(r.videoHilderId_to);
            r.videoHilderId_to = setTimeout(function() {
                r.videoHider_do.setVisible(false)
            }, 300)
        };
        this.resizeVideoHider = function() {
            if (r.isVideoHiderShowed_bl) {
                r.videoHider_do.setWidth(r.tempStageWidth);
                r.videoHider_do.setHeight(r.tempStageHeight)
            }
        };
        this.setupYoutubePlayer = function() {
            if (location.protocol.indexOf("file:") != -1 && (FWDUVPUtils.isOpera || FWDUVPUtils.isIE)) return;
            FWDUVPYoutubeScreen.setPrototype();
            r.ytb_do = new FWDUVPYoutubeScreen(r, r.data.volume);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.READY, r.youtubeReadyHandler);
            r.ytb_do.addListener(FWDUVPVideoScreen.ERROR, r.videoScreenErrorHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB, r.videoScreenSafeToScrubbHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.STOP, r.videoScreenStopHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY, r.videoScreenPlayHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.PAUSE, r.videoScreenPauseHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE, r.videoScreenUpdateHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE_TIME, r.videoScreenUpdateTimeHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.LOAD_PROGRESS, r.videoScreenLoadProgressHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY_COMPLETE, r.videoScreenPlayCompleteHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.CUED, r.youtubeScreenCuedHandler);
            r.ytb_do.addListener(FWDUVPYoutubeScreen.QUALITY_CHANGE, r.youtubeScreenQualityChangeHandler);
            clearTimeout(r.ytb_do)
        };
        this.youtubeReadyHandler = function(e) {
            r.isAPIReady_bl = true;
            if (r.ytb_do.hasBeenCreatedOnce_bl) {
                if (r.videoSourcePath_str.indexOf(".") != -1) return;
                if (!r.isMobile_bl) {
                    r.setPosterSource(r.posterPath_str);
                    r.videoPoster_do.show()
                } else {
                    r.setPosterSource(undefined);
                    r.videoPoster_do.hide();
                    r.largePlayButton_do.hide()
                }
                if (r.videoSourcePath_str.indexOf(".") == -1) r.setSource(undefined, true);
                return
            }
            clearInterval(r.hidePreloaderId_to);
            r.hidePreloaderId_to = setTimeout(function() {
                if (r.preloader_do) r.preloader_do.hide(true)
            }, 500);
            r.setupNormalVideoPlayers();
            if (!r.isPlaylistLoadedFirstTime_bl && r.controller_do) r.updatePlaylist();
            r.isPlaylistLoadedFirstTime_bl = true
        };
        this.youtubeScreenCuedHandler = function() {
            if (r.main_do)
                if (r.main_do.contains(r.info_do)) r.main_do.removeChild(r.info_do)
        };
        this.youtubeScreenQualityChangeHandler = function(e) {
            r.controller_do.updateQuality(e.levels, e.qualityLevel)
        };
        r.setupContextMenu = function() {
            r.customContextMenu_do = new FWDUVPContextMenu(r.main_do, r.data.rightClickContextMenu_str)
        };
        r.setupData = function() {
            FWDUVPData.setPrototype();
            r.data = new FWDUVPData(r.props_obj, r.rootElement_el, r);
            r.data.useYoutube_bl = r.useYoutube_bl;
            r.data.addListener(FWDUVPData.PRELOADER_LOAD_DONE, r.onPreloaderLoadDone);
            r.data.addListener(FWDUVPData.LOAD_ERROR, r.dataLoadError);
            r.data.addListener(FWDUVPData.SKIN_PROGRESS, r.dataSkinProgressHandler);
            r.data.addListener(FWDUVPData.SKIN_LOAD_COMPLETE, r.dataSkinLoadComplete);
            r.data.addListener(FWDUVPData.PLAYLIST_LOAD_COMPLETE, r.dataPlayListLoadComplete)
        };
        r.onPreloaderLoadDone = function() {
            r.setupPreloader();
            if (!r.isMobile_bl) r.setupContextMenu();
            r.resizeHandler()
        };
        r.dataLoadError = function(e) {
            r.main_do.addChild(r.info_do);
            r.info_do.showText(e.text);
            if (r.preloader_do) r.preloader_do.hide(false);
            r.resizeHandler();
            r.dispatchEvent(t.ERROR, {
                error: e.text
            })
        };
        r.dataSkinProgressHandler = function(e) {};
        r.dataSkinLoadComplete = function() {
            if (location.protocol.indexOf("file:") != -1) {
                if (FWDUVPUtils.isOpera || FWDUVPUtils.isIEAndLessThen9) {
                    r.main_do.addChild(r.info_do);
                    r.info_do.allowToRemove_bl = false;
                    r.info_do.showText("This browser can't play video local, please test online or use a browser like Firefox of Chrome.");
                    r.preloader_do.hide();
                    return
                }
            }
            r.playlistHeight = r.data.playlistBottomHeight;
            if (r.displayType == t.FULL_SCREEN && !FWDUVPUtils.hasFullScreen) {
                r.data.showFullScreenButton_bl = false
            }
            r.setupFacebook();
            if (r.isEmbedded_bl) {
                r.useDeepLinking_bl = false;
                r.data.playlistPosition_str = "right"
            }
            if (t.atLeastOnePlayerHasDeeplinking_bl) r.useDeepLinking_bl = false;
            if (r.useDeepLinking_bl) t.atLeastOnePlayerHasDeeplinking_bl = true;
            if (r.useDeepLinking_bl) {
                setTimeout(function() {
                    r.setupDL()
                }, 200)
            } else {
                if (r.isEmbedded_bl) {
                    r.catId = r.embeddedPlaylistId;
                    r.id = r.embeddedVideoId
                } else {
                    var n = FWDUVPUtils.getHashUrlArgs(e.location.hash);
                    if (r.useDeepLinking_bl && n.playlistId !== undefined && n.videoId !== undefined) {
                        r.catId = n.playlistId;
                        r.id = n.videoId
                    } else {
                        r.catId = r.data.startAtPlaylist;
                        r.id = r.data.startAtVideo
                    }
                }
                r.loadInternalPlaylist()
            }
        };
        this.dataPlayListLoadComplete = function() {
            if (!r.isPlaylistLoadedFirstTime_bl) {
                if (r.useYoutube_bl) {
                    r.setupYoutubePlayer()
                } else {
                    r.setupNormalVideoPlayers();
                    if (!FWDUVPUtils.isIEAndLessThen9) r.updatePlaylist()
                }
            }
            if (r.isPlaylistLoadedFirstTime_bl) r.updatePlaylist();
            r.isPlaylistLoaded_bl = true;
            if (r.preloader_do) r.positionPreloader()
        };
        this.updatePlaylist = function() {
            if (r.main_do)
                if (r.main_do.contains(r.info_do)) r.main_do.removeChild(r.info_do);
            r.preloader_do.hide(true);
            r.totalVideos = r.data.playlist_ar.length;
            if (r.id < 0) {
                r.id = 0
            } else if (r.id > r.totalVideos - 1) {
                r.id = r.totalVideos - 1
            }
            if (r.playlist_do) r.playlist_do.updatePlaylist(r.data.playlist_ar, r.id, r.data.cats_ar[r.catId].playlistName);
            r.hideVideoHider();
            if (r.data.startAtRandomVideo_bl) {
                r.id = parseInt(Math.random() * r.data.playlist_ar.length);
                if (r.useDeepLinking_bl) {
                    FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id);
                    return
                }
            }
            r.posterPath_str = r.data.playlist_ar[r.id].posterSource;
            r.setSource(undefined, true);
            if (r.isFirstPlaylistLoaded_bl && !r.isMobile_bl && !r.data.startAtRandomVideo_bl) r.play();
            r.data.startAtRandomVideo_bl = false;
            r.isFirstPlaylistLoaded_bl = true;
            r.dispatchEvent(t.LOAD_PLAYLIST_COMPLETE)
        };
        this.loadInternalPlaylist = function() {
            r.isPlaylistLoaded_bl = false;
            r.isAdd_bl = false;
            if (r.prevCatId == r.catId) return;
            r.prevCatId = r.catId;
            r.stop();
            if (r.hider) r.hider.stop();
            r.setPosterSource("none");
            if (r.videoPoster_do) r.videoPoster_do.hide(true);
            r.preloader_do.show(true);
            if (r.largePlayButton_do) r.largePlayButton_do.hide();
            if (r.controller_do) r.controller_do.hide(false, 10);
            r.showVideoHider();
            r.data.loadPlaylist(r.catId);
            if (r.logo_do) r.logo_do.hide(false, true);
            if (r.isAdd_bl) {
                r.adsSkip_do.hide(false);
                r.adsStart_do.hide(false)
            }
            if (r.playlist_do) r.playlist_do.destroyPlaylist();
            r.positionPreloader();
            if (r.isAPIReady_bl) r.dispatchEvent(t.START_TO_LOAD_PLAYLIST)
        };
        this.setupDL = function() {
            FWDAddress.onChange = r.dlChangeHandler;
            if (r.isEmbedded_bl) {
                FWDAddress.setValue("?playlistId=" + r.embeddedPlaylistId + "&videoId=" + r.embeddedVideoId)
            }
            r.dlChangeHandler()
        };
        this.dlChangeHandler = function() {
            if (r.hasOpenedInPopup_bl) return;
            var e = false;
            if (r.categories_do && r.categories_do.isOnDOM_bl) {
                r.categories_do.hide();
                return
            }
            r.catId = parseInt(FWDAddress.getParameter("playlistId"));
            r.id = parseInt(FWDAddress.getParameter("videoId"));
            if (r.catId == undefined || r.id == undefined || isNaN(r.catId) || isNaN(r.id)) {
                r.catId = r.data.startAtPlaylist;
                r.id = r.data.startAtVideo;
                e = true
            }
            if (r.catId < 0 || r.catId > r.data.totalCategories - 1 && !e) {
                r.catId = r.data.startAtPlaylist;
                r.id = r.data.startAtVideo;
                e = true
            }
            if (r.data.playlist_ar) {
                if (r.id < 0 && !e) {
                    r.id = r.data.startAtVideo;
                    e = true
                } else if (r.prevCatId == r.catId && r.id > r.data.playlist_ar.length - 1 && !e) {
                    r.id = r.data.playlist_ar.length - 1;
                    e = true
                }
            }
            if (e) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id);
                return
            }
            if (r.prevCatId != r.catId) {
                r.loadInternalPlaylist();
                r.prevCatId = r.catId
            } else {
                r.setSource(false);
                if (!r.data.startAtRandomVideo_bl) r.play();
                r.data.startAtRandomVideo_bl = false
            }
        };
        this.setupNormalVideoPlayers = function() {
            if (t.hasHTML5Video) {
                r.isAPIReady_bl = true;
                r.setupVideoScreen();
                r.setupVideoPoster();
                r.main_do.addChild(r.preloader_do);
                r.setupClickScreen();
                if (r.data.showLogo_bl) r.setupLogo();
                r.addDoubleClickSupport();
                r.setupVideoHider();
                r.setupController();
                r.setupAdsStart();
                if (r.data.showPlaylistButtonAndPlaylist_bl) r.setupPlaylist();
                r.setupLargePlayPauseButton();
                r.setupHider();
                if (r.data.showPlaylistsButtonAndPlaylists_bl) r.setupCategories();
                r.setupDisableClick();
                if (r.data.showEmbedButton_bl) r.setupEmbedWindow();
                r.setupInfoWindow();
                if (t.useYoutube == "no") r.isPlaylistLoadedFirstTime_bl = true;
                r.isAPIReady_bl = true;
                r.dispatchEvent(t.READY)
            } else {
                r.setupFlashScreen()
            }
            if (r.data.addKeyboardSupport_bl) r.addKeyboardSupport();
            r.resizeHandler()
        };
        this.setupPreloader = function() {
            FWDUVPPreloader.setPrototype();
            r.preloader_do = new FWDUVPPreloader(r.data.mainPreloader_img, 38, 30, 36, 80);
            r.preloader_do.show(true);
            r.main_do.addChild(r.preloader_do)
        };
        this.positionPreloader = function() {
            if (r.isAPIReady_bl && r.isPlaylistLoaded_bl) {
                r.preloader_do.setX(parseInt((r.tempVidStageWidth - r.preloader_do.w) / 2));
                r.preloader_do.setY(parseInt((r.tempVidStageHeight - r.preloader_do.h) / 2))
            } else {
                r.preloader_do.setX(parseInt((r.tempStageWidth - r.preloader_do.w) / 2));
                r.preloader_do.setY(parseInt((r.tempStageHeight - r.preloader_do.h) / 2))
            }
        };
        this.setupCategories = function() {
            FWDUVPCategories.setPrototype();
            r.categories_do = new FWDUVPCategories(r.data, r);
            r.categories_do.getStyle().zIndex = "2147483647";
            r.categories_do.addListener(FWDUVPCategories.HIDE_COMPLETE, r.categoriesHideCompleteHandler);
            if (r.data.showPlaylistsByDefault_bl) {
                r.showCatWidthDelayId_to = setTimeout(function() {
                    r.showCategories()
                }, 1400)
            }
        };
        this.categoriesHideCompleteHandler = function(e) {
            r.controller_do.setCategoriesButtonState("unselected");
            if (r.customContextMenu_do) r.customContextMenu_do.updateParent(r.main_do);
            if (r.useDeepLinking_bl) {
                if (r.categories_do.id != r.catId) {
                    r.catId = r.categories_do.id;
                    r.id = 0;
                    FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id);
                    return
                }
            } else {
                if (r.catId == r.categories_do.id) return;
                r.catId = r.categories_do.id;
                r.id = 0;
                r.loadInternalPlaylist(r.catId)
            }
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do && !r.videoScreen_do.isStopped_bl) r.videoScreen_do.setX(0);
                if (r.ytb_do && !r.ytb_do.isStopped_bl) r.ytb_do.setX(0)
            } else {
                if (r.isVideoPlayingWhenOpenWindows_bl) r.resume()
            }
        };
        this.setupVideoPoster = function() {
            FWDUVPPoster.setPrototype();
            r.videoPoster_do = new FWDUVPPoster(r, r.data.posterBackgroundColor_str, r.data.show);
            r.videoHolder_do.addChild(r.videoPoster_do)
        };
        this.setupInfoWindow = function() {
            FWDUVPInfoWindow.setPrototype();
            r.infoWindow_do = new FWDUVPInfoWindow(r, r.data);
            r.infoWindow_do.addListener(FWDUVPInfoWindow.HIDE_COMPLETE, r.infoWindowHideCompleteHandler);
            r.main_do.addChild(r.infoWindow_do)
        };
        this.infoWindowHideCompleteHandler = function() {
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do && !r.videoScreen_do.isStopped_bl) r.videoScreen_do.setX(0);
                if (r.ytb_do && !r.ytb_do.isStopped_bl) r.ytb_do.setX(0)
            } else {
                if (r.isVideoPlayingWhenOpenWindows_bl) r.resume()
            }
        };
        this.setupLargePlayPauseButton = function() {
            FWDUVPSimpleButton.setPrototype();
            r.largePlayButton_do = new FWDUVPSimpleButton(r.data.largePlayN_img, r.data.largePlayS_str);
            r.largePlayButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, r.largePlayButtonUpHandler);
            r.largePlayButton_do.setOverflow("visible");
            r.largePlayButton_do.hide(false);
            r.main_do.addChild(r.largePlayButton_do)
        };
        this.largePlayButtonUpHandler = function() {
            r.disableClick();
            r.largePlayButton_do.hide();
            r.play()
        };
        this.positionLargePlayButton = function() {
            r.largePlayButton_do.setX(parseInt((r.tempVidStageWidth - r.largePlayButton_do.w) / 2));
            r.largePlayButton_do.setY(parseInt((r.tempVidStageHeight - r.largePlayButton_do.h) / 2))
        };
        this.setupLogo = function() {
            FWDUVPLogo.setPrototype();
            r.logo_do = new FWDUVPLogo(r, r.data.logoPath_str, r.data.logoPosition_str, r.data.logoMargins);
            r.main_do.addChild(r.logo_do)
        };
        this.setupPlaylist = function() {
            FWDUVPPlaylist.setPrototype();
            r.playlist_do = new FWDUVPPlaylist(r, r.data);
            r.playlist_do.addListener(FWDUVPPlaylist.THUMB_MOUSE_UP, r.playlistThumbMouseUpHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, r.playPrevVideoHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, r.playNextVideoHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.ENABLE_SHUFFLE, r.enableShuffleHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.DISABLE_SHUFFLE, r.disableShuffleHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.ENABLE_LOOP, r.enableLoopHandler);
            r.playlist_do.addListener(FWDUVPPlaylist.DISABLE_LOOP, r.disableLoopHandler);
            r.main_do.addChildAt(r.playlist_do, 0)
        };
        this.playlistThumbMouseUpHandler = function(e) {
            if (r.disableClick_bl) return;
            if (r.useDeepLinking_bl && r.id != e.id) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + e.id);
                r.id = e.id
            } else {
                r.id = e.id;
                r.setSource();
                r.play()
            }
        };
        this.playPrevVideoHandler = function() {
            if (r.data.shuffle_bl) {
                r.playShuffle()
            } else {
                r.playPrev()
            }
        };
        this.playNextVideoHandler = function() {
            if (r.data.shuffle_bl) {
                r.playShuffle()
            } else {
                r.playNext()
            }
        };
        this.enableShuffleHandler = function(e) {
            r.data.shuffle_bl = true;
            r.data.loop_bl = false;
            r.playlist_do.setShuffleButtonState("selected");
            r.playlist_do.setLoopStateButton("unselected")
        };
        this.disableShuffleHandler = function(e) {
            r.data.shuffle_bl = false;
            r.playlist_do.setShuffleButtonState("unselected")
        };
        this.enableLoopHandler = function(e) {
            r.data.loop_bl = true;
            r.data.shuffle_bl = false;
            r.playlist_do.setLoopStateButton("selected");
            r.playlist_do.setShuffleButtonState("unselected")
        };
        this.disableLoopHandler = function(e) {
            r.data.loop_bl = false;
            r.playlist_do.setLoopStateButton("unselected")
        };
        this.setupController = function() {
            FWDUVPController.setPrototype();
            r.controller_do = new FWDUVPController(r.data, r);
            r.controller_do.addListener(FWDUVPController.SHOW_CATEGORIES, r.showCategoriesHandler);
            r.controller_do.addListener(FWDUVPController.SHOW_PLAYLIST, r.showPlaylistHandler);
            r.controller_do.addListener(FWDUVPController.HIDE_PLAYLIST, r.hidePlaylistHandler);
            r.controller_do.addListener(FWDUVPController.PLAY, r.controllerOnPlayHandler);
            r.controller_do.addListener(FWDUVPController.PAUSE, r.controllerOnPauseHandler);
            r.controller_do.addListener(FWDUVPController.START_TO_SCRUB, r.controllerStartToScrubbHandler);
            r.controller_do.addListener(FWDUVPController.SCRUB, r.controllerScrubbHandler);
            r.controller_do.addListener(FWDUVPController.STOP_TO_SCRUB, r.controllerStopToScrubbHandler);
            r.controller_do.addListener(FWDUVPController.CHANGE_VOLUME, r.controllerChangeVolumeHandler);
            r.controller_do.addListener(FWDUVPController.DOWNLOAD_VIDEO, r.controllerDownloadVideoHandler);
            r.controller_do.addListener(FWDUVPController.FACEBOOK_SHARE, r.controllerFacebookShareHandler);
            r.controller_do.addListener(FWDUVPController.CHANGE_YOUTUBE_QUALITY, r.controllerChangeYoutubeQualityHandler);
            r.controller_do.addListener(FWDUVPController.FULL_SCREEN, r.controllerFullScreenHandler);
            r.controller_do.addListener(FWDUVPController.NORMAL_SCREEN, r.controllerNormalScreenHandler);
            r.controller_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, r.playPrevVideoHandler);
            r.controller_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, r.playNextVideoHandler);
            r.controller_do.addListener(FWDUVPController.SHOW_EMBED_WINDOW, r.showEmbedWindowHandler);
            r.controller_do.addListener(FWDUVPController.SHOW_INFO_WINDOW, r.showInfoWindowHandler);
            r.videoHolder_do.addChild(r.controller_do)
        };
        this.showCategoriesHandler = function(e) {
            r.showCategories();
            r.controller_do.setCategoriesButtonState("selected")
        };
        this.showPlaylistHandler = function(e) {
            r.disableClick();
            r.showPlaylist()
        };
        this.hidePlaylistHandler = function(e) {
            r.disableClick();
            r.hidePlaylist()
        };
        this.controllerOnPlayHandler = function(e) {
            r.play()
        };
        this.controllerOnPauseHandler = function(e) {
            r.pause()
        };
        this.controllerStartToScrubbHandler = function(e) {
            r.startToScrub()
        };
        this.controllerScrubbHandler = function(e) {
            r.scrub(e.percent)
        };
        this.controllerStopToScrubbHandler = function(e) {
            r.stopToScrub()
        };
        this.controllerChangeVolumeHandler = function(e) {
            r.setVolume(e.percent)
        };
        this.controllerDownloadVideoHandler = function() {
            r.downloadVideo()
        };
        this.controllerFacebookShareHandler = function(e) {
            if (document.location.protocol == "file:") {
                var n = "Facebook is not allowing sharing local, please test online.";
                r.main_do.addChild(r.info_do);
                r.info_do.showText(n);
                r.dispatchEvent(t.ERROR, {
                    error: n
                });
                return
            }
            if (r.useDeepLinking_bl) {
                var i = r.data.playlist_ar[r.id];
                var s;
                if (i.thumbSource && i.thumbSource.indexOf("//") != -1) {
                    s = i.thumbSource
                } else {
                    var o = location.pathname;
                    o = location.protocol + "//" + location.host + o.substring(0, o.lastIndexOf("/") + 1);
                    s = o + i.thumbSource
                }
                r.facebookShare.share(location.href, i.titleText, s)
            } else {
                r.facebookShare.share(location.href)
            }
        };
        this.controllerChangeYoutubeQualityHandler = function(e) {
            r.ytb_do.setQuality(e.quality)
        };
        this.controllerFullScreenHandler = function() {
            r.goFullScreen()
        };
        this.controllerNormalScreenHandler = function() {
            r.goNormalScreen()
        };
        this.showEmbedWindowHandler = function() {
            if (location.protocol.indexOf("file:") != -1) {
                r.main_do.addChild(r.info_do);
                r.info_do.showText("Embedding video files local is not allowed or possible! To function properly please test online");
                return
            }
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.isVideoPlayingWhenOpenWindows_bl = r.ytb_do.isPlaying_bl
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.isVideoPlayingWhenOpenWindows_bl = r.videoScreen_do.isPlaying_bl
            }
            r.pause();
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do) r.videoScreen_do.setX(-5e3);
                if (r.ytb_do) r.ytb_do.setX(-5e3)
            }
            if (r.customContextMenu_do) r.customContextMenu_do.disable();
            r.embedWindow_do.show()
        };
        this.showInfoWindowHandler = function() {
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.isVideoPlayingWhenOpenWindows_bl = r.ytb_do.isPlaying_bl
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.isVideoPlayingWhenOpenWindows_bl = r.videoScreen_do.isPlaying_bl
            }
            r.pause();
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do) r.videoScreen_do.setX(-5e3);
                if (r.ytb_do) r.ytb_do.setX(-5e3)
            }
            r.infoWindow_do.show(r.data.playlist_ar[r.id].desc)
        };
        this.setupVideoScreen = function() {
            FWDUVPVideoScreen.setPrototype();
            r.videoScreen_do = new FWDUVPVideoScreen(r, r.data.volume);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.ERROR, r.videoScreenErrorHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.SAFE_TO_SCRUBB, r.videoScreenSafeToScrubbHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.STOP, r.videoScreenStopHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY, r.videoScreenPlayHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.PAUSE, r.videoScreenPauseHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE, r.videoScreenUpdateHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE_TIME, r.videoScreenUpdateTimeHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.LOAD_PROGRESS, r.videoScreenLoadProgressHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.START_TO_BUFFER, r.videoScreenStartToBuferHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.STOP_TO_BUFFER, r.videoScreenStopToBuferHandler);
            r.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY_COMPLETE, r.videoScreenPlayCompleteHandler);
            r.videoHolder_do.addChild(r.videoScreen_do)
        };
        this.videoScreenErrorHandler = function(n) {
            var i;
            r.isPlaying_bl = false;
            if (t.hasHTML5Video || r.videoType_str == t.YOUTUBE) {
                i = n.text;
                if (e.console) console.log(n.text);
                if (r.main_do) r.main_do.addChild(r.info_do);
                if (r.info_do) r.info_do.showText(i);
                if (r.controller_do) {
                    r.controller_do.disableMainScrubber();
                    r.controller_do.disablePlayButton();
                    if (!r.data.showControllerWhenVideoIsStopped_bl) r.controller_do.hide(!r.isMobile_bl);
                    r.largePlayButton_do.hide();
                    r.hideClickScreen();
                    r.hider.stop()
                }
            } else {
                i = n;
                if (r.main_do) r.main_do.addChild(r.info_do);
                if (r.info_do) r.info_do.showText(i)
            }
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do) r.videoScreen_do.setX(-5e3);
                if (r.ytb_do) r.ytb_do.setX(-5e3)
            }
            if (r.logo_do) r.logo_do.hide(false);
            r.preloader_do.hide(false);
            r.showCursor();
            r.dispatchEvent(t.ERROR, {
                error: i
            })
        };
        this.videoScreenSafeToScrubbHandler = function() {
            if (r.controller_do) {
                if (r.isAdd_bl) {
                    r.controller_do.disableMainScrubber();
                    if (r.data.playlist_ar[r.id].ads.timeToHoldAds != 0) r.adsStart_do.show(true);
                    if (r.data.playlist_ar[r.id].thumbSource) r.adsStart_do.loadThumbnail(r.data.playlist_ar[r.id].thumbSource);
                    r.positionAds()
                } else {
                    r.controller_do.enableMainScrubber()
                }
                r.controller_do.enablePlayButton();
                r.controller_do.show(true);
                r.hider.start()
            }
            if (r.isMobile_bl) {
                r.adsSkip_do.hide(false)
            }
            r.showClickScreen()
        };
        this.videoScreenStopHandler = function(e) {
            if (r.main_do)
                if (r.main_do.contains(r.info_do)) r.main_do.removeChild(r.info_do);
            r.videoPoster_do.allowToShow_bl = true;
            r.isPlaying_bl = false;
            if (r.controller_do) {
                r.controller_do.disableMainScrubber();
                r.controller_do.showPlayButton();
                if (!r.data.showControllerWhenVideoIsStopped_bl) {
                    r.controller_do.hide(!r.isMobile_bl)
                } else {
                    r.controller_do.show(!r.isMobile_bl)
                }
                r.hider.stop()
            }
            if (r.useYoutube_bl) {
                if (r.isMobile_bl) {
                    r.ytb_do.destroyYoutube()
                } else {
                    r.ytb_do.stopVideo()
                }
            }
            if (r.logo_do) r.logo_do.hide(true);
            r.hideClickScreen();
            if (r.isMobile_bl && r.videoType_str == t.YOUTUBE) {
                r.videoPoster_do.hide();
                r.largePlayButton_do.hide()
            }
            if (r.isMobile_bl) {
                r.adsSkip_do.hide(false);
                r.adsStart_do.hide(false)
            }
            r.showCursor();
            r.dispatchEvent(t.STOP)
        };
        this.videoScreenPlayHandler = function() {
            t.keyboardCurInstance = r;
            if (r.videoType_str == t.YOUTUBE && r.ytb_do && r.ytb_do.isStopped_bl) return;
            t.stopAllVideos(r);
            r.isPlaying_bl = true;
            if (r.logo_do) r.logo_do.show(true);
            if (r.controller_do) {
                r.controller_do.showPauseButton();
                r.controller_do.show(true)
            }
            r.largePlayButton_do.hide();
            r.hider.start();
            r.showCursor();
            r.dispatchEvent(t.PLAY)
        };
        this.videoScreenPauseHandler = function() {
            if (r.videoType_str == t.YOUTUBE && r.ytb_do && r.ytb_do.isStopped_bl) return;
            r.isPlaying_bl = false;
            if (r.controller_do) r.controller_do.showPlayButton();
            if (!FWDUVPUtils.isIphone && !r.isAdd_bl) r.largePlayButton_do.show();
            r.controller_do.show(true);
            r.hider.stop();
            r.showClickScreen();
            r.hider.reset();
            r.showCursor();
            r.dispatchEvent(t.PAUSE)
        };
        this.videoScreenUpdateHandler = function(e) {
            var n;
            if (t.hasHTML5Video || r.videoType_str == t.YOUTUBE) {
                n = e.percent;
                if (r.controller_do) r.controller_do.updateMainScrubber(n)
            } else {
                n = e;
                if (r.controller_do) r.controller_do.updateMainScrubber(n)
            }
            r.dispatchEvent(t.UPDATE, {
                percent: n
            })
        };
        this.videoScreenUpdateTimeHandler = function(e, n, i) {
            var s;
            var o;
            if (t.hasHTML5Video || r.videoType_str == t.YOUTUBE) {
                r.curTime = e.curTime;
                r.totalTime = e.totalTime;
                s = r.curTime + "/" + r.totalTime;
                o = e.seconds;
                if (r.controller_do) r.controller_do.updateTime(s)
            } else {
                r.curTime = e;
                r.totalTime = n;
                s = r.curTime + "/" + r.totalTime;
                if (e == undefined || n == undefined) s = "00:00/00:00";
                o = i;
                if (r.controller_do) r.controller_do.updateTime(s)
            }
            if (r.isAdd_bl) {
                if (r.data.playlist_ar[r.id].ads.timeToHoldAds > o) {
                    r.adsStart_do.updateText(r.data.skipToVideoText_str + Math.abs(r.data.playlist_ar[r.id].ads.timeToHoldAds - o));
                    if (r.isMobile_bl) r.adsSkip_do.hide(false)
                } else if (r.isPlaying_bl) {
                    r.adsStart_do.hide(true);
                    r.adsSkip_do.show(true)
                }
            }
            r.dispatchEvent(t.UPDATE_TIME, {
                currentTime: r.curTime,
                totalTime: r.totalTime
            })
        };
        this.videoScreenLoadProgressHandler = function(e) {
            if (t.hasHTML5Video || r.videoType_str == t.YOUTUBE) {
                if (r.controller_do) r.controller_do.updatePreloaderBar(e.percent)
            } else {
                if (r.controller_do) r.controller_do.updatePreloaderBar(e)
            }
        };
        this.videoScreenStartToBuferHandler = function() {
            r.preloader_do.show()
        };
        this.videoScreenStopToBuferHandler = function() {
            r.preloader_do.hide(true)
        };
        this.videoScreenPlayCompleteHandler = function(n, i) {
            if (r.isAdd_bl) {
                if (r.data.openNewPageAtTheEndOfTheAds_bl && r.data.playlist_ar[r.id].ads.pageToOpen != "none" && !i) {
                    if (r.data.playlist_ar[r.id].ads.pageTarget == "_self") {
                        location.href = r.data.playlist_ar[r.id].ads.pageToOpen
                    } else {
                        e.open(r.data.playlist_ar[r.id].ads.pageToOpen, "_blank")
                    }
                }
                r.setSource();
                if (i && r.isMobile_bl && r.videoType_str != t.YOUTUBE) r.play();
                if (!r.isMobile_bl) setTimeout(r.play, 100);
                return
            }
            if (r.data.stopVideoWhenPlayComplete_bl || r.data.playlist_ar.length == 1) {
                r.stop()
            } else if (r.data.loop_bl) {
                r.scrub(0);
                r.play()
            } else if (r.data.shuffle_bl) {
                r.playShuffle();
                if (r.isMobile_bl) r.stop()
            } else {
                r.playNext();
                if (r.isMobile_bl) r.stop()
            }
            r.hider.reset();
            r.dispatchEvent(t.PLAY_COMPLETE)
        };
        this.setupAdsStart = function() {
            FWDUVPAdsStart.setPrototype();
            r.adsStart_do = new FWDUVPAdsStart(r.data.adsButtonsPosition_str, r.data.adsBorderNormalColor_str, "", r.data.adsBackgroundPath_str, r.data.adsTextNormalColor);
            FWDUVPAdsButton.setPrototype();
            r.adsSkip_do = new FWDUVPAdsButton(r.data.skipIconPath_img, r.data.skipIconSPath_str, r.data.skipToVideoButtonText_str, r.data.adsButtonsPosition_str, r.data.adsBorderNormalColor_str, r.data.adsBorderSelectedColor_str, r.data.adsBackgroundPath_str, r.data.adsTextNormalColor, r.data.adsTextSelectedColor);
            r.adsSkip_do.addListener(FWDUVPAdsButton.MOUSE_UP, r.skipAdsMouseUpHandler);
            r.videoHolder_do.addChild(r.adsSkip_do);
            r.videoHolder_do.addChild(r.adsStart_do)
        };
        this.skipAdsMouseUpHandler = function() {
            r.videoScreenPlayCompleteHandler(null, true)
        };
        this.positionAds = function(e) {
            var t;
            var n;
            if (r.data.adsButtonsPosition_str == "left") {
                t = 0
            } else {
                t = r.tempVidStageWidth
            }
            if (r.controller_do.isShowed_bl) {
                n = r.tempVidStageHeight - r.adsStart_do.h - r.data.controllerHeight - 30
            } else {
                n = r.tempVidStageHeight - r.adsStart_do.h - r.data.controllerHeight
            }
            FWDUVPTweenMax.killTweensOf(this.adsStart_do);
            if (e) {
                FWDUVPTweenMax.to(this.adsStart_do, .8, {
                    y: n,
                    ease: Expo.easeInOut
                })
            } else {
                this.adsStart_do.setY(n)
            }
            r.adsStart_do.setX(t);
            if (r.data.adsButtonsPosition_str == "left") {
                t = 0
            } else {
                t = r.tempVidStageWidth
            }
            if (r.controller_do.isShowed_bl) {
                n = r.tempVidStageHeight - r.adsSkip_do.h - r.data.controllerHeight - 30
            } else {
                n = r.tempVidStageHeight - r.adsSkip_do.h - r.data.controllerHeight
            }
            FWDUVPTweenMax.killTweensOf(this.adsSkip_do);
            if (e) {
                FWDUVPTweenMax.to(this.adsSkip_do, .8, {
                    y: n,
                    ease: Expo.easeInOut
                })
            } else {
                this.adsSkip_do.setY(n)
            }
            r.adsSkip_do.setX(t)
        };
        this.setupEmbedWindow = function() {
            FWDUVPEmbedWindow.setPrototype();
            r.embedWindow_do = new FWDUVPEmbedWindow(r.data, r);
            r.embedWindow_do.addListener(FWDUVPEmbedWindow.ERROR, r.embedWindowErrorHandler);
            r.embedWindow_do.addListener(FWDUVPEmbedWindow.HIDE_COMPLETE, r.embedWindowHideCompleteHandler)
        };
        this.embedWindowErrorHandler = function(e) {
            r.main_do.addChild(r.info_do);
            r.info_do.showText(e.error)
        };
        this.embedWindowHideCompleteHandler = function() {
            if (FWDUVPUtils.isIphone) {
                if (r.videoScreen_do && !r.videoScreen_do.isStopped_bl) r.videoScreen_do.setX(0);
                if (r.ytb_do && !r.ytb_do.isStopped_bl) r.ytb_do.setX(0)
            } else {
                if (r.isVideoPlayingWhenOpenWindows_bl) r.resume()
            }
        };
        this.copyLinkButtonOnMouseOver = function() {
            r.embedWindow_do.copyLinkButton_do.setSelectedState()
        };
        this.copyLinkButtonOnMouseOut = function() {
            r.embedWindow_do.copyLinkButton_do.setNormalState()
        };
        this.getLinkCopyPath = function() {
            return r.embedWindow_do.linkToVideo_str
        };
        this.embedkButtonOnMouseOver = function() {
            r.embedWindow_do.copyEmbedButton_do.setSelectedState()
        };
        this.embedButtonOnMouseOut = function() {
            r.embedWindow_do.copyEmbedButton_do.setNormalState()
        };
        this.getEmbedCopyPath = function() {
            return r.embedWindow_do.finalEmbedCode_str
        };
        this.setupFlashScreen = function() {
            if (r.flash_do) return;
            if (!FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) {
                r.main_do.addChild(r.info_do);
                r.info_do.showText("Please install Adobe Flash Player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>");
                if (r.preloader_do) r.preloader_do.hide(false);
                return
            }
            r.flash_do = new FWDUVPDisplayObject("div");
            r.flash_do.setBackfaceVisibility();
            r.flash_do.setResizableSizeAfterParent();
            r.videoHolder_do.addChild(r.flash_do);
            var e = "opaque";
            r.flashObjectMarkup_str = '<object id="' + r.instanceName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + r.data.flashPath_str + '"/><param name="wmode" value="' + e + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + r.instanceName_str + "&volume=" + r.data.volume + "&bkColor_str=" + r.videoBackgroundColor_str + '"/><object type="application/x-shockwave-flash" data="' + r.data.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + r.data.flashPath_str + '"/><param name="wmode" value="' + e + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + r.instanceName_str + "&volume=" + r.data.volume + "&bkColor_str=" + r.videoBackgroundColor_str + '"/></object></object>';
            r.flash_do.screen.innerHTML = r.flashObjectMarkup_str;
            r.flashObject = r.flash_do.screen.firstChild;
            if (!FWDUVPUtils.isIE) r.flashObject = r.flashObject.getElementsByTagName("object")[0]
        };
        this.flashScreenIsReady = function() {
            if (console) console.log("flash is ready " + r.instanceName_str);
            r.isFlashScreenReady_bl = true;
            r.isAPIReady_bl = true;
            r.dispatchEvent(t.READY);
            r.setupVideoPoster();
            r.main_do.addChild(r.preloader_do);
            r.setupClickScreen();
            if (r.data.showLogo_bl) r.setupLogo();
            r.addDoubleClickSupport();
            r.setupVideoHider();
            r.setupController();
            r.setupAdsStart();
            if (r.data.showPlaylistButtonAndPlaylist_bl) r.setupPlaylist();
            r.setupLargePlayPauseButton();
            r.setupHider();
            if (r.data.showPlaylistsButtonAndPlaylists_bl) r.setupCategories();
            r.setupDisableClick();
            if (r.data.showEmbedButton_bl) r.setupEmbedWindow();
            r.setupInfoWindow();
            r.updatePlaylist();
            r.isPlaylistLoadedFirstTime_bl = true
        };
        this.flashScreenFail = function() {
            r.main_do.addChild(r.info_do);
            r.info_do.showText("External interface error!");
            r.resizeHandler()
        };
        this.addKeyboardSupport = function() {
            if (document.addEventListener) {
                document.addEventListener("keydown", this.onKeyDownHandler);
                document.addEventListener("keyup", this.onKeyUpHandler)
            } else if (document.attachEvent) {
                document.attachEvent("onkeydown", this.onKeyDownHandler);
                document.attachEvent("onkeyup", this.onKeyUpHandler)
            }
        };
        this.onKeyDownHandler = function(e) {
            if (r.isSpaceDown_bl) return;
            r.isSpaceDown_bl = true;
            if (e.keyCode == 32) {
                if (r.videoType_str == t.YOUTUBE) {
                    if (!r.ytb_do.isSafeToBeControlled_bl) return;
                    r.ytb_do.togglePlayPause()
                } else if (t.hasHTML5Video) {
                    if (!r.videoScreen_do.isSafeToBeControlled_bl) return;
                    r.videoScreen_do.togglePlayPause()
                } else if (r.isFlashScreenReady_bl) {
                    r.flashObject.togglePlayPause()
                }
                if (e.preventDefault) e.preventDefault();
                return false
            }
        };
        this.onKeyUpHandler = function(e) {
            r.isSpaceDown_bl = false
        };
        this.setupHider = function() {
            FWDUVPHider.setPrototype();
            r.hider = new FWDUVPHider(r.main_do, r.controller_do, r.data.controllerHideDelay);
            r.hider.addListener(FWDUVPHider.SHOW, r.hiderShowHandler);
            r.hider.addListener(FWDUVPHider.HIDE, r.hiderHideHandler);
            r.hider.addListener(FWDUVPHider.HIDE_COMPLETE, r.hiderHideCompleteHandler)
        };
        this.hiderShowHandler = function() {
            r.controller_do.show(true);
            if (r.logo_do && r.data.hideLogoWithController_bl && r.isPlaying_bl) r.logo_do.show(true);
            r.showCursor();
            if (r.isAdd_bl) {
                r.positionAds(true);
                r.adsStart_do.showWithOpacity();
                r.adsSkip_do.showWithOpacity()
            }
        };
        this.hiderHideHandler = function() {
            if (FWDUVPUtils.isIphone) return;
            if (r.controller_do.volumeScrubber_do && r.controller_do.isVolumeScrubberShowed_bl) {
                r.hider.reset();
                return
            }
            if (r.data.showYoutubeQualityButton_bl && FWDUVPUtils.hitTest(r.controller_do.ytbButtonsHolder_do.screen, r.hider.globalX, r.hider.globalY)) {
                r.hider.reset();
                return
            }
            if (FWDUVPUtils.hitTest(r.controller_do.screen, r.hider.globalX, r.hider.globalY)) {
                r.hider.reset();
                return
            }
            if (FWDUVPUtils.hitTest(r.controller_do.mainScrubber_do.screen, r.hider.globalX, r.hider.globalY)) {
                r.hider.reset();
                return
            }
            r.controller_do.hide(true);
            if (r.logo_do && r.data.hideLogoWithController_bl) r.logo_do.hide(true);
            if (r.isFullScreen_bl) r.hideCursor();
            if (r.isAdd_bl) {
                r.positionAds(true);
                r.adsStart_do.hideWithOpacity();
                r.adsSkip_do.hideWithOpacity()
            }
        };
        this.hiderHideCompleteHandler = function() {
            r.controller_do.positionScrollBarOnTopOfTheController()
        };
        this.play = function() {
            if (!r.isAPIReady_bl) return;
            if (r.isMobile_bl && r.videoType_str == t.YOUTUBE && r.ytb_do && !r.ytb_do.isSafeToBeControlled_bl) return;
            if (FWDUVPUtils.isIphone) r.videoScreen_do.setX(0);
            t.stopAllVideos(r);
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.ytb_do.play()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.play()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.playVideo();
                r.scrub(0)
            }
            t.keyboardCurInstance = r;
            r.videoPoster_do.allowToShow_bl = false;
            r.largePlayButton_do.hide();
            r.videoPoster_do.hide()
        };
        this.pause = function() {
            if (!r.isAPIReady_bl) return;
            if (FWDUVPUtils.isIphone) r.videoScreen_do.setX(0);
            if (r.videoType_str == t.YOUTUBE) {
                r.ytb_do.pause()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.pause()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.pauseVideo()
            }
        };
        this.resume = function() {
            if (!r.isAPIReady_bl) return;
            if (FWDUVPUtils.isIphone) r.videoScreen_do.setX(0);
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.ytb_do.resume()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.resume()
            }
        };
        this.stop = function(e) {
            if (!r.isAPIReady_bl) return;
            if (FWDUVPUtils.isIphone) r.videoScreen_do.setX(-5e3);
            if (r.videoType_str == t.YOUTUBE) {
                if (r.controller_do.ytbQualityButton_do) r.controller_do.ytbQualityButton_do.disable();
                r.controller_do.hideQualityButtons(false);
                r.ytb_do.stop()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.stop()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.stopVideo()
            }
            if (r.isMobile_bl) {
                if (r.data.showControllerWhenVideoIsStopped_bl) r.controller_do.show(true);
                if (!e && r.videoType_str != t.YOUTUBE) {
                    r.videoPoster_do.show();
                    r.largePlayButton_do.show()
                } else if (r.useYoutube_bl) {
                    if (!r.ytb_do.ytb) {
                        r.ytb_do.setupVideo()
                    }
                }
            } else {
                if (r.data.showControllerWhenVideoIsStopped_bl) r.controller_do.show(true);
                r.videoPoster_do.show();
                r.largePlayButton_do.show()
            }
            r.hider.reset();
            r.showCursor();
            r.adsStart_do.hide(true);
            r.adsSkip_do.hide(true)
        };
        this.startToScrub = function() {
            if (!r.isAPIReady_bl) return;
            if (r.videoType_str == t.YOUTUBE && r.ytb_do && r.ytb_do.isSafeToBeControlled_bl) {
                r.ytb_do.startToScrub()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.startToScrub()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.startToScrub()
            }
        };
        this.stopToScrub = function() {
            if (!r.isAPIReady_bl) return;
            if (r.videoType_str == t.YOUTUBE && r.ytb_do && r.ytb_do.isSafeToBeControlled_bl) {
                r.ytb_do.stopToScrub()
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.stopToScrub()
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.stopToScrub()
            }
        };
        this.scrub = function(e) {
            if (!r.isAPIReady_bl) return;
            if (isNaN(e)) return;
            if (e < 0) {
                e = 0
            } else if (e > 1) {
                e = 1
            }
            if (r.videoType_str == t.YOUTUBE && r.ytb_do && r.ytb_do.isSafeToBeControlled_bl) {
                r.ytb_do.scrub(e)
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.scrub(e)
            } else if (r.isFlashScreenReady_bl) {
                r.flashObject.scrub(e)
            }
        };
        this.setVolume = function(e) {
            if (!r.isAPIReady_bl || r.isMobile_bl) return;
            r.controller_do.updateVolume(e, true);
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.ytb_do.setVolume(e)
            }
            if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.videoScreen_do.setVolume(e)
            }
            if (r.isFlashScreenReady_bl) {
                r.flashObject.setVolume(e)
            }
            r.dispatchEvent(t.VOLUME_SET, {
                volume: e
            })
        };
        this.showCategories = function() {
            if (!r.isAPIReady_bl) return;
            if (r.videoType_str == t.YOUTUBE && r.ytb_do) {
                r.isVideoPlayingWhenOpenWindows_bl = r.ytb_do.isPlaying_bl
            } else if (t.hasHTML5Video) {
                if (r.videoScreen_do) r.isVideoPlayingWhenOpenWindows_bl = r.videoScreen_do.isPlaying_bl
            }
            if (r.categories_do) {
                r.categories_do.show(r.catId);
                if (r.customContextMenu_do) r.customContextMenu_do.updateParent(r.categories_do);
                r.controller_do.setCategoriesButtonState("selected");
                if (!FWDUVPUtils.isIphone) r.pause()
            }
        };
        this.hideCategories = function() {
            if (!r.isAPIReady_bl) return;
            if (r.categories_do) {
                r.categories_do.hide();
                r.controller_do.setCategoriesButtonState("unselected")
            }
        };
        this.showPlaylist = function() {
            if (!r.isAPIReady_bl || !r.showPlaylistButtonAndPlaylist_bl) return;
            r.isPlaylistShowed_bl = false;
            r.controller_do.showHidePlaylistButton();
            r.playlist_do.hide(!r.isMobile_bl);
            r.resizeHandler(!r.isMobile_bl);
            if (FWDUVPUtils.isSafari && FWDUVPUtils.isWin) {
                r.playlist_do.hide(false);
                r.resizeHandler(false)
            } else {
                if (!r.isMobile_bl) {
                    FWDUVPTweenMax.to(r, .8, {
                        tempStageWidth: r.stageWidth,
                        tempStageHeight: r.stageHeight,
                        tempVidStageWidth: r.vidStageWidth,
                        tempVidStageHeight: r.vidStageHeight,
                        ease: Expo.easeInOut,
                        onUpdate: r.resizeFinal
                    })
                }
            }
        };
        this.hidePlaylist = function() {
            if (!r.isAPIReady_bl || !r.showPlaylistButtonAndPlaylist_bl) return;
            r.isPlaylistShowed_bl = true;
            r.controller_do.showShowPlaylistButton();
            r.playlist_do.show(!r.isMobile_bl);
            r.resizeHandler(!r.isMobile_bl);
            if (FWDUVPUtils.isSafari && FWDUVPUtils.isWin) {
                r.playlist_do.show(false);
                r.resizeHandler(false)
            } else {
                if (!r.isMobile_bl) {
                    FWDUVPTweenMax.to(r, .8, {
                        tempStageWidth: r.stageWidth,
                        tempStageHeight: r.stageHeight,
                        tempVidStageWidth: r.vidStageWidth,
                        tempVidStageHeight: r.vidStageHeight,
                        ease: Expo.easeInOut,
                        onUpdate: r.resizeFinal
                    })
                }
            }
        };
        this.setPosterSource = function(e) {
            if (!r.isAPIReady_bl || !e) return;
            var n = e.split(",");
            if (r.isMobile_bl && n[1] != undefined) {
                e = n[1]
            } else {
                e = n[0]
            }
            r.posterPath_str = e;
            if (r.videoSourcePath_str.indexOf(".") == -1 && r.useYoutube_bl && r.isMobile_bl) {
                r.videoPoster_do.setPoster("youtubemobile")
            } else {
                r.videoPoster_do.setPoster(r.posterPath_str);
                if (r.prevPosterSource_str != e) r.dispatchEvent(t.UPDATE_POSTER_SOURCE)
            }
            r.prevPosterSource_str = e
        };
        this.setSource = function(e, n) {
            if (!r.isAPIReady_bl) return;
            if (r.id < 0) {
                r.id = 0
            } else if (r.id > r.totalVideos - 1) {
                r.id = r.totalVideos - 1
            }
            var e;
            if (r.data.playlist_ar[r.id].ads && !r.data.playlist_ar[r.id].isAdsPlayed_bl) {
                e = r.data.playlist_ar[r.id].ads.source;
                r.isAdd_bl = true;
                r.data.playlist_ar[r.id].isAdsPlayed_bl = true
            } else {
                e = e || r.data.playlist_ar[r.id].videoSource;
                r.isAdd_bl = false
            }
            for (var i = 0; i < r.data.playlist_ar.length; i++) {
                if (r.id != i && !r.data.playAdsOnlyOnce_bl) r.data.playlist_ar[i].isAdsPlayed_bl = false
            }
            if (e == r.prevVideoSource_str && !r.isAdd_bl && !n) return;
            r.controller_do.enablePlayButton();
            r.prevVideoSource_str = e;
            if (!e) {
                r.main_do.addChild(r.info_do);
                r.info_do.showText("Video source is not defined!");
                return
            }
            if (r.playlist_do) {
                r.playlist_do.curId = r.id;
                r.playlist_do.checkThumbsState()
            }
            r.stop(e);
            r.videoSourcePath_str = e;
            r.finalVideoPath_str = e;
            if (r.videoSourcePath_str.indexOf(".") == -1 && r.useYoutube_bl) {
                r.videoType_str = t.YOUTUBE
            } else {
                r.videoType_str = t.VIDEO
            }
            r.posterPath_str = r.data.playlist_ar[r.id].posterSource;
            if (r.isAdd_bl && e.indexOf(".") == -1) {
                setTimeout(function() {
                    r.main_do.addChild(r.info_do);
                    r.info_do.showText("Advertisment youtube videos are not supported, please make sure you are using a mp4 video file.")
                }, 200);
                return
            }
            if (r.videoType_str == t.YOUTUBE) {
                r.setPosterSource(r.posterPath_str);
                if (!r.ytb_do.ytb) {
                    r.ytb_do.setupVideo()
                }
                if (r.ytb_do.ytb && !r.ytb_do.ytb.cueVideoById) return;
                if (r.ytb_do) {
                    r.ytb_do.setX(0)
                }
                if (r.flash_do) {
                    r.flash_do.setWidth(0);
                    r.flash_do.setHeight(0)
                } else {
                    r.videoScreen_do.setVisible(false)
                }
                r.ytb_do.setSource(e);
                if (r.isMobile_bl) {
                    r.videoPoster_do.hide();
                    r.largePlayButton_do.hide()
                } else {
                    r.videoPoster_do.show();
                    r.largePlayButton_do.show();
                    if (r.data.autoPlay_bl) r.play()
                }
                r.controller_do.addYtbQualityButton();
                r.resizeHandler(false, true);
                if (r.getVideoSource()) r.dispatchEvent(t.UPDATE_VIDEO_SOURCE);
                return
            }
            var s = e.split(",");
            if (r.isMobile_bl && s[1] != undefined) {
                e = s[1]
            } else {
                e = s[0]
            }
            r.finalVideoPath_str = e;
            if (t.hasHTML5Video && r.videoType_str == t.VIDEO) {
                if (r.ytb_do) {
                    r.ytb_do.setX(-5e3)
                }
                r.setPosterSource(r.posterPath_str);
                r.videoPoster_do.show();
                r.largePlayButton_do.show();
                if (FWDUVPUtils.isIphone) r.videoScreen_do.setX(-5e3);
                r.videoScreen_do.setVisible(true);
                r.controller_do.hideQualityButtons(false);
                r.controller_do.removeYtbQualityButton();
                if (r.videoScreen_do) {
                    r.videoScreen_do.setSource(e);
                    if (r.data.autoPlay_bl) r.play()
                }
            } else if (r.isFlashScreenReady_bl && r.videoType_str == t.VIDEO) {
                if (r.ytb_do) {
                    r.ytb_do.setX(-5e3)
                }
                r.controller_do.removeYtbQualityButton();
                r.controller_do.hideQualityButtons(false);
                if (e.indexOf("://") == -1 && e.indexOf("/") != 1) {
                    e = e.substr(e.indexOf("/") + 1)
                }
                r.setPosterSource(r.posterPath_str);
                r.videoPoster_do.show();
                r.largePlayButton_do.show();
                r.flashObject.setSource(e);
                if (r.data.autoPlay_bl) r.play()
            }
            r.prevVideoSourcePath_str = r.videoSourcePath_str;
            r.resizeHandler(false, true);
            if (r.getVideoSource()) r.dispatchEvent(t.UPDATE_VIDEO_SOURCE)
        };
        this.goFullScreen = function() {
            if (!r.isAPIReady_bl) return;
            r.isFullScreen_bl = true;
            if (document.addEventListener) {
                document.addEventListener("fullscreenchange", r.onFullScreenChange);
                document.addEventListener("mozfullscreenchange", r.onFullScreenChange);
                document.addEventListener("webkitfullscreenchange", r.onFullScreenChange);
                document.addEventListener("MSFullscreenChange", r.onFullScreenChange)
            }
            if (FWDUVPUtils.isSafari && FWDUVPUtils.isWin) {} else {
                if (document.documentElement.requestFullScreen) {
                    r.main_do.screen.requestFullScreen()
                } else if (document.documentElement.mozRequestFullScreen) {
                    r.main_do.screen.mozRequestFullScreen()
                } else if (document.documentElement.webkitRequestFullScreen) {
                    r.main_do.screen.webkitRequestFullScreen()
                } else if (document.documentElement.msRequestFullscreen) {
                    r.main_do.screen.msRequestFullscreen()
                }
            }
            r.disableClick();
            if (!r.isEmbedded_bl) {
                r.main_do.getStyle().position = "fixed";
                document.documentElement.style.overflow = "hidden";
                r.main_do.getStyle().zIndex = 9999999999998
            }
            r.controller_do.showNormalScreenButton();
            r.controller_do.setNormalStateToFullScreenButton();
            var n = FWDUVPUtils.getScrollOffsets();
            r.lastX = n.x;
            r.lastY = n.y;
            e.scrollTo(0, 0);
            if (r.isMobile_bl) e.addEventListener("touchmove", r.disableFullScreenOnMobileHandler);
            r.dispatchEvent(t.GO_FULLSCREEN);
            r.resizeHandler()
        };
        this.disableFullScreenOnMobileHandler = function(e) {
            if (e.preventDefault) e.preventDefault()
        };
        this.goNormalScreen = function() {
            if (!r.isAPIReady_bl) return;
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
            r.disableClick();
            r.addMainDoToTheOriginalParent();
            r.isFullScreen_bl = false
        };
        this.addMainDoToTheOriginalParent = function() {
            if (!r.isFullScreen_bl) return;
            if (document.removeEventListener) {
                document.removeEventListener("fullscreenchange", r.onFullScreenChange);
                document.removeEventListener("mozfullscreenchange", r.onFullScreenChange);
                document.removeEventListener("webkitfullscreenchange", r.onFullScreenChange);
                document.removeEventListener("MSFullscreenChange", r.onFullScreenChange)
            }
            r.controller_do.setNormalStateToFullScreenButton();
            if (!r.isEmbedded_bl) {
                if (r.displayType == t.RESPONSIVE) {
                    if (FWDUVPUtils.isIEAndLessThen9) {
                        document.documentElement.style.overflow = "auto"
                    } else {
                        document.documentElement.style.overflow = "visible"
                    }
                    r.main_do.getStyle().position = "relative";
                    r.main_do.getStyle().zIndex = 0
                } else {
                    r.main_do.getStyle().position = "absolute";
                    r.main_do.getStyle().zIndex = 9999999999998
                }
            }
            if (r.displayType != t.FULL_SCREEN) r.controller_do.enablePlaylistButton();
            r.controller_do.showFullScreenButton();
            e.scrollTo(r.lastX, r.lastY);
            r.showCursor();
            r.resizeHandler();
            setTimeout(r.resizeHandler, 500);
            e.scrollTo(r.lastX, r.lastY);
            if (!FWDUVPUtils.isIE) {
                setTimeout(function() {
                    e.scrollTo(r.lastX, r.lastY)
                }, 150)
            }
            if (r.isMobile_bl) e.removeEventListener("touchmove", r.disableFullScreenOnMobileHandler);
            r.dispatchEvent(t.GO_NORMALSCREEN)
        };
        this.onFullScreenChange = function(e) {
            if (!(document.fullScreen || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)) {
                r.controller_do.showNormalScreenButton();
                r.addMainDoToTheOriginalParent();
                r.isFullScreen_bl = false
            }
        };
        this.loadPlaylist = function(e) {
            if (!r.isAPIReady_bl || !r.isPlaylistLoaded_bl) return;
            if (r.data.prevId == e) return;
            r.catId = e;
            r.id = 0;
            if (r.catId < 0) {
                r.catId = 0
            } else if (r.catId > r.data.totalPlaylists - 1) {
                r.catId = r.data.totalPlaylists - 1
            }
            if (r.useDeepLinking_bl) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id)
            } else {
                r.loadInternalPlaylist()
            }
        };
        this.playNext = function() {
            if (!r.isAPIReady_bl || !r.isPlaylistLoaded_bl) return;
            r.id++;
            if (r.id < 0) {
                r.id = r.totalVideos - 1
            } else if (r.id > r.totalVideos - 1) {
                r.id = 0
            }
            if (r.useDeepLinking_bl) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id)
            } else {
                r.setSource();
                if (r.isMobile_bl && r.videoType_str == t.VIDEO) r.play();
                if (!r.isMobile_bl) r.play()
            }
        };
        this.playPrev = function() {
            if (!r.isAPIReady_bl || !r.isPlaylistLoaded_bl) return;
            r.id--;
            if (r.id < 0) {
                r.id = r.totalVideos - 1
            } else if (r.id > r.totalVideos - 1) {
                r.id = 0
            }
            if (r.useDeepLinking_bl) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id)
            } else {
                r.setSource();
                if (r.isMobile_bl && r.videoType_str == t.VIDEO) r.play();
                if (!r.isMobile_bl) r.play()
            }
        };
        this.playShuffle = function() {
            if (!r.isAPIReady_bl || !r.isPlaylistLoaded_bl) return;
            var e = parseInt(Math.random() * r.totalVideos);
            while (e == r.id) e = parseInt(Math.random() * r.totalVideos);
            r.id = e;
            if (r.id < 0) {
                r.id = r.totalVideos - 1
            } else if (r.id > r.totalVideos - 1) {
                r.id = 0
            }
            if (r.useDeepLinking_bl) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id)
            } else {
                r.setSource();
                if (r.isMobile_bl && r.videoType_str == t.VIDEO) r.play();
                if (!r.isMobile_bl) r.play()
            }
        };
        this.playVideo = function(e) {
            if (!r.isAPIReady_bl || !r.isPlaylistLoaded_bl) return;
            r.id = e;
            if (r.id < 0) {
                r.id = r.totalVideos - 1
            } else if (r.id > r.totalVideos - 1) {
                r.id = 0
            }
            if (r.useDeepLinking_bl) {
                FWDAddress.setValue("?playlistId=" + r.catId + "&videoId=" + r.id)
            } else {
                r.setSource();
                if (r.isMobile_bl && r.videoType_str == t.VIDEO) r.play();
                if (!r.isMobile_bl) r.play()
            }
        };
        this.setVideoSource = function(e) {
            r.isAdd_bl = false;
            r.setSource(e)
        };
        this.downloadVideo = function(e) {
            if (e == undefined) e = r.id;
            var t = r.data.playlist_ar[e].downloadPath;
            var n = r.data.playlist_ar[e].titleText;
            r.data.downloadVideo(t, n)
        };
        this.share = function() {
            if (!r.isAPIReady_bl) return;
            r.controllerFacebookShareHandler()
        };
        this.getVideoSource = function() {
            if (!r.isAPIReady_bl) return;
            return r.finalVideoPath_str
        };
        this.getPosterSource = function() {
            if (!r.isAPIReady_bl) return;
            return r.posterPath_str
        };
        this.getPlaylistId = function() {
            return r.catId
        };
        this.getVideoId = function() {
            return r.id
        };
        this.getCurrentTime = function() {
            var e;
            if (!r.curTime) {
                e = "00:00"
            } else {
                e = r.curTime
            }
            return e
        };
        this.getTotalTime = function() {
            var e;
            if (!r.totalTime) {
                e = "00:00"
            } else {
                e = r.totalTime
            }
            return e
        };
        this.hideCursor = function() {
            document.documentElement.style.cursor = "none";
            document.getElementsByTagName("body")[0].style.cursor = "none";
            if (!r.isAdd_bl) r.dumyClick_do.getStyle().cursor = "none"
        };
        this.showCursor = function() {
            document.documentElement.style.cursor = "auto";
            document.getElementsByTagName("body")[0].style.cursor = "auto";
            if (r.isAdd_bl) {
                r.dumyClick_do.setButtonMode(true)
            } else {
                r.dumyClick_do.getStyle().cursor = "auto"
            }
        };
        this.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function(e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        this.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        r.cleanMainEvents = function() {
            if (e.removeEventListener) {
                e.removeEventListener("resize", r.onResizeHandler)
            } else if (e.detachEvent) {
                e.detachEvent("onresize", r.onResizeHandler)
            }
            clearTimeout(r.resizeHandlerId_to);
            clearTimeout(r.resizeHandler2Id_to);
            clearTimeout(r.hidePreloaderId_to);
            clearTimeout(r.orientationChangeId_to)
        };
        if (t.useYoutube == "yes") {
            if (location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isIE || location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isOpera) {
                r.stageContainer = FWDUVPUtils.getChildById(n.parentId);
                r.setupMainDo();
                r.setupInfo();
                r.main_do.addChild(r.info_do);
                r.info_do.allowToRemove_bl = false;
                r.info_do.showText('This browser dosen\'t allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome! <br><br> If you don\'t want to use Youtube set <font color="#FFFFFF">FWDUVPlayer.useYoutube:"no"</font> this way it will work local in this browser.');
                r.resizeHandler();
                return
            }
            setTimeout(t.setupYoutubeAPI, 500)
        } else {
            setTimeout(t.setupMainInstance, 500)
        }
        var i = FWDUVPUtils.getUrlArgs(e.location.search);
        var s = i.RVPInstanceName;
        var o = i.RVPInstanceName;
        if (s) {
            r.isEmbedded_bl = n.instanceName == o
        }
        if (r.isEmbedded_bl) {
            var u = FWDUVPUtils.getViewportSize();
            r.embeddedPlaylistId = parseInt(i.RVPPlaylistId);
            r.embeddedVideoId = parseInt(i.RVPVideoId);
            var a = new FWDUVPDisplayObject("div");
            a.setBkColor(n.backgroundColor);
            a.setWidth(u.w);
            a.setHeight(u.h);
            document.documentElement.style.overflow = "hidden";
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            if (FWDUVPUtils.isIEAndLessThen9) {
                document.getElementsByTagName("body")[0].appendChild(a.screen)
            } else {
                document.documentElement.appendChild(a.screen)
            }
        }
    };
    t.setupYoutubeAPI = function() {
        if (t.isYoutubeAPICreated_bl) return;
        t.isYoutubeAPICreated_bl = true;
        if (!e.onYouTubeIframeAPIReady) {
            e.onYouTubeIframeAPIReady = function() {
                t.setupMainInstance()
            }
        }
        var n = document.createElement("script");
        n.src = "https://www.youtube.com/iframe_api";
        var r = document.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(n, r)
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPEventDispatcher
    };
    self.countInstances = 1;
    t.setupMainInstance = function(e) {
        setTimeout(function() {
            t.instaces_ar[self.countInstances - 1].init();
            if (self.countInstances < t.instaces_ar.length) t.setupMainInstance();
            self.countInstances++
        }, self.countInstances * 100)
    };
    t.stopAllVideos = function(e) {
        var n = t.instaces_ar.length;
        var r;
        for (var i = 0; i < n; i++) {
            r = t.instaces_ar[i];
            if (r != e) {
                r.stop()
            }
        }
    };
    t.hasHTML5VideoTestIsDone = false;
    if (!t.hasHTML5VideoTestIsDone) {
        t.hasHTML5Video = function() {
            var e = document.createElement("video");
            var n = false;
            if (e.canPlayType) {
                n = Boolean(e.canPlayType("video/mp4") == "probably" || e.canPlayType("video/mp4") == "maybe");
                t.canPlayMp4 = Boolean(e.canPlayType("video/mp4") == "probably" || e.canPlayType("video/mp4") == "maybe");
                t.canPlayOgg = Boolean(e.canPlayType("video/ogg") == "probably" || e.canPlayType("video/ogg") == "maybe");
                t.canPlayWebm = Boolean(e.canPlayType("video/webm") == "probably" || e.canPlayType("video/webm") == "maybe")
            }
            if (self.isMobile_bl) return true;
            t.hasHTML5VideoTestIsDone = true;
            return n
        }()
    }
    t.hasCanvas = function() {
        return Boolean(document.createElement("canvas"))
    }();
    t.instaces_ar = [];
    t.curInstance = null;
    t.keyboardCurInstance = null;
    t.isYoutubeAPICreated_bl = false;
    t.PAUSE_ALL_VIDEOS = "pause";
    t.STOP_ALL_VIDEOS = "stop";
    t.DO_NOTHING = "none";
    t.YOUTUBE = "youtube";
    t.VIDEO = "video";
    t.atLeastOnePlayerHasDeeplinking_bl = false;
    t.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist";
    t.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete";
    t.READY = "ready";
    t.STOP = "stop";
    t.PLAY = "play";
    t.PAUSE = "pause";
    t.UPDATE = "update";
    t.UPDATE_TIME = "updateTime";
    t.UPDATE_VIDEO_SOURCE = "updateVideoSource";
    t.UPDATE_POSTER_SOURCE = "udpatePosterSource";
    t.ERROR = "error";
    t.PLAY_COMPLETE = "playComplete";
    t.VOLUME_SET = "volumeSet";
    t.GO_FULLSCREEN = "goFullScreen";
    t.GO_NORMALSCREEN = "goNormalScreen";
    t.RESPONSIVE = "responsive";
    t.FULL_SCREEN = "fullscreen";
    e.FWDUVPlayer = t
})(window);
(function(e) {
    var t = function(n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.img_img = null;
        this.logoImage_do = null;
        this.position_str = i;
        this.source_str = r;
        this.logoLink_str = n.data.logoLink_str;
        this.margins = s;
        this.isShowed_bl = true;
        this.allowToShow_bl = true;
        this.init = function() {
            if (o.logoLink_str == "none") {
                o.getStyle().pointerEvents = "none"
            } else {
                o.setButtonMode(true);
                o.screen.onclick = function() {
                    e.open(o.logoLink_str, "_blank")
                }
            }
            o.logoImage_do = new FWDUVPDisplayObject("img");
            o.img_img = new Image;
            o.img_img.onerror = null;
            o.img_img.onload = o.loadDone;
            o.img_img.src = o.source_str;
            o.hide()
        };
        this.loadDone = function() {
            o.setWidth(o.img_img.width);
            o.setHeight(o.img_img.height);
            o.logoImage_do.setScreen(o.img_img);
            o.addChild(o.logoImage_do);
            o.logoImage_do.setWidth(o.img_img.width);
            o.logoImage_do.setHeight(o.img_img.height);
            o.positionAndResize()
        };
        this.positionAndResize = function() {
            if (!n.tempVidStageWidth) return;
            if (o.position_str == "topleft") {
                o.finalX = o.margins;
                o.finalY = o.margins
            } else if (o.position_str == "topright") {
                o.finalX = n.tempVidStageWidth - o.w - o.margins;
                o.finalY = o.margins
            } else if (o.position_str == "bottomright") {
                o.finalX = n.tempVidStageWidth - o.w - o.margins;
                o.finalY = n.tempVidStageHeight - o.h - o.margins
            } else if (o.position_str == "bottomleft") {
                o.finalX = o.margins;
                o.finalY = n.tempVidStageHeight - o.h - o.margins
            }
            o.setX(o.finalX);
            o.setY(o.finalY)
        };
        this.show = function(e) {
            if (o.isShowed_bl) return;
            o.isShowed_bl = true;
            o.setVisible(true);
            FWDUVPTweenMax.killTweensOf(o);
            if (e) {
                FWDUVPTweenMax.to(o, .8, {
                    alpha: 1,
                    ease: Expo.easeInOut
                })
            } else {
                o.setAlpha(1)
            }
        };
        this.hide = function(e, t) {
            if (!o.isShowed_bl && !t) return;
            o.isShowed_bl = false;
            FWDUVPTweenMax.killTweensOf(o);
            if (e) {
                FWDUVPTweenMax.to(o, .8, {
                    alpha: 0,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        o.setVisible(false)
                    }
                })
            } else {
                o.setAlpha(0);
                o.setVisible(false)
            }
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.prototype = null;
    e.FWDUVPLogo = t
})(window);
(function(e) {
    var t = function(n, r) {
        var i = this;
        var s = t.prototype;
        this.moveEvent = null;
        this.image_img = null;
        this.prevN_img = r.prevN_img;
        this.nextN_img = r.nextN_img;
        this.replayN_img = r.replayN_img;
        this.shuffleN_img = r.shuffleN_img;
        this.scrBkTop_img = r.scrBkTop_img;
        this.scrDragTop_img = r.scrDragTop_img;
        this.scrLinesN_img = r.scrLinesN_img;
        this.playlist_ar = null;
        this.buttons_ar = [];
        this.thumbs_ar = null;
        this.playlistNameHolder_do = null;
        this.playlistName_do = null;
        this.scrMainHolder_do = null;
        this.scrTrack_do = null;
        this.scrTrackTop_do = null;
        this.scrTrackMiddle_do = null;
        this.scrTrackBottom_do = null;
        this.scrHandler_do = null;
        this.scrHandlerTop_do = null;
        this.scrHandlerMiddle_do = null;
        this.scrHandlerBottom_do = null;
        this.scrHandlerLines_do = null;
        this.scrHandlerLinesN_do = null;
        this.scrHandlerLinesS_do = null;
        this.mainHolder_do = null;
        this.mainThumbsHolder_do = null;
        this.controllBar_do = null;
        this.input_do = null;
        this.inputArrow_do = null;
        this.bk_do = null;
        this.thumbsHolder_do = null;
        this.nextButton_do = null;
        this.prevButton_do = null;
        this.toolTip_do = null;
        this.shuffleButton_do = null;
        this.loopButton_do = null;
        this.prevButtonToolTip_do = null;
        this.loopButtonToolTip_do = null;
        this.shuffleButtonToolTip_do = null;
        this.nextButtonToolTip_do = null;
        this.noSearchFound_do = null;
        this.bkPath_str = r.controllerBkPath_str;
        this.position_str = n.playlistPosition_str;
        this.playlistBackgroundColor_str = r.playlistBackgroundColor_str;
        this.inputBackgroundColor_str = r.searchInputBackgroundColor_str;
        this.inputColor_str = r.searchInputColor_str;
        this.prevInputValue_str = "none";
        this.scrWidth = i.scrBkTop_img.width;
        this.mouseX = 0;
        this.mouseY = 0;
        this.dif = 0;
        this.countLoadedThumbs = 0;
        this.curId = 0;
        this.finalX = 0;
        this.finalY = 0;
        this.controlBarHeight = r.controllerHeight;
        this.totalThumbs = 0;
        this.totalWidth = n.playlistWidth;
        this.totalHeight = n.playlistHeight;
        this.thumbImageW = r.thumbnailWidth;
        this.thumbImageH = r.thumbnailHeight;
        this.thumbInPadding = 2;
        this.spaceBetweenThumbnails = r.spaceBetweenThumbnails;
        this.startSpaceBetweenButtons = r.startSpaceBetweenButtons;
        this.spaceBetweenButtons = r.spaceBetweenButtons;
        this.totalButtons = 0;
        this.buttonsToolTipHideDelay = r.buttonsToolTipHideDelay;
        this.removeFromThumbsHolderHeight = 0;
        this.totalThumbsHeight = 0;
        this.scrollBarHandlerFinalY = 0;
        this.stageWidth = i.totalWidth;
        this.stageHeight = i.totalHeight;
        this.scrollbarOffestWidth = r.scrollbarOffestWidth;
        this.lastThumbnailFinalY = -1;
        this.thumbnailsFinalY = 0;
        this.scollbarSpeedSensitivity = r.scollbarSpeedSensitivity;
        this.vy = 0;
        this.vy2 = 0;
        this.friction = .9;
        this.loadWithDelayId_to;
        this.showToolTipId_to;
        this.disableThumbsId_to;
        this.disableMouseWheelId_to;
        this.thumbnailsAnimDoneId_to;
        this.disableForAWhileAfterThumbClickId_to;
        this.updateMobileScrollBarId_int;
        this.disableForAWhileAfterThumbClick_bl = false;
        this.showPlaylistName_bl = r.showPlaylistName_bl;
        this.isShowNothingFound_bl = false;
        this.hasInputFocus_bl = false;
        this.showController_bl = r.showSearchInput_bl || r.showNextAndPrevButtons_bl || r.showLoopButton_bl || r.showShuffleButton_bl;
        this.loop_bl = r.loop_bl;
        this.shuffle_bl = r.shuffle_bl;
        this.showSearchInput_bl = r.showSearchInput_bl;
        this.allowToScrollAndScrollBarIsActive_bl = true;
        this.showPlaylistToolTips_bl = r.showPlaylistToolTips_bl;
        this.hasPlaylist_bl = false;
        this.showPlaylistByDefault_bl = r.showPlaylistByDefault_bl;
        this.repeatBackground_bl = r.repeatBackground_bl;
        this.addMouseWheelSupport_bl = r.addMouseWheelSupport_bl;
        this.showNextAndPrevButtons_bl = r.showNextAndPrevButtons_bl;
        this.showShuffleButton_bl = r.showShuffleButton_bl;
        this.showLoopButton_bl = r.showLoopButton_bl;
        this.showButtonsToolTip_bl = r.showButtonsToolTip_bl;
        this.isShowed_bl = true;
        this.allowToSwipe_bl = false;
        this.disableThumbs_bl = false;
        this.disableMouseWheel_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.isDragging_bl = false;
        this.isSearched_bl = false;
        this.init = function() {
            i.mainHolder_do = new FWDUVPDisplayObject("div");
            i.mainHolder_do.setBkColor(i.playlistBackgroundColor_str);
            i.mainThumbsHolder_do = new FWDUVPDisplayObject("div");
            i.thumbsHolder_do = new FWDUVPDisplayObject("div");
            i.thumbsHolder_do.setOverflow("visible");
            i.mainThumbsHolder_do.addChild(i.thumbsHolder_do);
            i.mainHolder_do.addChild(i.mainThumbsHolder_do);
            i.addChild(i.mainHolder_do);
            if (i.showController_bl) {
                i.controllBar_do = new FWDUVPDisplayObject("div");
                if (i.repeatBackground_bl) {
                    i.controllerBk_do = new FWDUVPDisplayObject("div");
                    i.controllerBk_do.getStyle().background = "url('" + i.bkPath_str + "')"
                } else {
                    i.controllerBk_do = new FWDUVPDisplayObject("img");
                    var e = new Image;
                    e.src = i.bkPath_str;
                    i.controllerBk_do.setScreen(e)
                }
                i.controllerBk_do.setHeight(i.controlBarHeight);
                i.controllerBk_do.getStyle().width = "100%";
                i.controllBar_do.addChild(i.controllerBk_do);
                i.controllBar_do.setHeight(i.controlBarHeight);
                i.mainHolder_do.addChild(i.controllBar_do)
            }
            if (i.showShuffleButton_bl) i.setupShuffleButton();
            if (i.showLoopButton_bl) i.setupLoopButton();
            if (i.showNextAndPrevButtons_bl) {
                i.setupPrevButton();
                i.setupNextButton()
            }
            if (i.showButtonsToolTip_bl) i.setupToolTips();
            i.totalButtons = i.buttons_ar.length;
            if (i.showSearchInput_bl && i.showController_bl) i.setupInput();
            if (i.showController_bl) {
                i.removeFromThumbsHolderHeight = i.controllBar_do.h + i.spaceBetweenThumbnails
            }
            if (i.isMobile_bl) {
                i.setupMobileScrollbar()
            } else {
                i.setupScrollbar();
                if (i.addMouseWheelSupport_bl) i.addMouseWheelSupport()
            }
            if (i.showPlaylistName_bl) {
                i.setupPlaylistName();
                i.removeFromThumbsHolderHeight += i.controlBarHeight + i.spaceBetweenThumbnails;
                i.mainThumbsHolder_do.setY(i.controlBarHeight + i.spaceBetweenThumbnails);
                if (i.scrMainHolder_do) i.scrMainHolder_do.setY(i.mainThumbsHolder_do.y)
            }
            if (i.showPlaylistByDefault_bl) {
                i.hideAndShow()
            } else {
                i.hide()
            }
        };
        this.resizeAndPosition = function(e) {
            if (!n.stageWidth) return;
            if (i.position_str == "bottom") {
                i.stageWidth = n.stageWidth;
                i.stageHeight = n.playlistHeight;
                i.finalX = 0;
                i.finalY = n.tempVidStageHeight + n.spaceBetweenControllerAndPlaylist
            } else {
                i.stageWidth = i.totalWidth;
                i.stageHeight = n.stageHeight;
                i.finalX = n.stageWidth - i.totalWidth;
                i.finalY = 0
            }
            if (i.bk_do) {
                i.bk_do.setWidth(i.stageWidth);
                i.bk_do.setHeight(i.stageHeight)
            }
            i.positionThumbs(e);
            if (i.allowToScrollAndScrollBarIsActive_bl && i.scrMainHolder_do) {
                i.mainThumbsHolder_do.setWidth(i.stageWidth - i.scrollbarOffestWidth)
            } else {
                i.mainThumbsHolder_do.setWidth(i.stageWidth)
            }
            i.mainThumbsHolder_do.setHeight(i.stageHeight - i.removeFromThumbsHolderHeight);
            if (i.scrHandler_do) i.updateScrollBarSizeActiveAndDeactivate();
            if (i.controllBar_do) i.positionControllBar();
            i.updateScrollBarHandlerAndContent(e);
            i.setX(i.finalX);
            i.setY(i.finalY);
            i.mainHolder_do.setWidth(i.stageWidth);
            i.mainHolder_do.setHeight(i.stageHeight)
        };
        this.updatePlaylist = function(e, t, n) {
            i.hasPlaylist_bl = true;
            i.curId = t;
            i.playlist_ar = e;
            i.countLoadedThumbs = 0;
            i.allowToScrollAndScrollBarIsActive_bl = false;
            if (i.input_do) {
                i.hasInputFocus_bl = false;
                i.input_do.screen.value = "search for video"
            }
            i.setupThumbnails();
            i.updatePlaylistName(n);
            i.loadImages();
            FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                x: 0,
                y: 0,
                ease: Expo.easeInOut
            });
            i.resizeAndPosition();
            if (i.scrHandler_do) {
                i.updateScrollBarSizeActiveAndDeactivate();
                i.updateScrollBarHandlerAndContent(false, true)
            }
        };
        this.destroyPlaylist = function() {
            if (!i.thumbs_ar) return;
            var e;
            i.hasPlaylist_bl = false;
            i.image_img.onerror = null;
            i.image_img.onload = null;
            FWDUVPTweenMax.killTweensOf(i.mainHolder_do);
            if (i.position_str == "bottom") {
                i.mainHolder_do.setY(-i.stageHeight - 5)
            } else {
                i.mainHolder_do.setX(-i.stageWidth - 5)
            }
            clearTimeout(i.loadWithDelayId_to);
            for (var t = 0; t < i.totalThumbs; t++) {
                e = i.thumbs_ar[t];
                i.thumbsHolder_do.removeChild(e);
                e.destroy()
            }
            i.thumbs_ar = null
        };
        this.setupPlaylistName = function() {
            i.playlistNameHolder_do = new FWDUVPDisplayObject("div");
            i.playlistNameHolder_do.setHeight(i.controlBarHeight);
            i.playlistNameHolder_do.getStyle().width = "100%";
            if (i.repeatBackground_bl) {
                i.playlistNameBk_do = new FWDUVPDisplayObject("div");
                i.playlistNameBk_do.getStyle().background = "url('" + i.bkPath_str + "')"
            } else {
                i.playlistNameBk_do = new FWDUVPDisplayObject("img");
                var e = new Image;
                e.src = i.bkPath_str;
                i.playlistNameBk_do.setScreen(e)
            }
            i.playlistNameBk_do.setHeight(i.controlBarHeight);
            i.playlistNameBk_do.getStyle().width = "100%";
            i.playlistName_do = new FWDUVPDisplayObject("div");
            i.playlistName_do.getStyle().width = "100%";
            i.playlistName_do.getStyle().textAlign = "center";
            i.playlistName_do.getStyle().fontSmoothing = "antialiased";
            i.playlistName_do.getStyle().webkitFontSmoothing = "antialiased";
            i.playlistName_do.getStyle().textRendering = "optimizeLegibility";
            i.playlistName_do.getStyle().fontFamily = "Arial";
            i.playlistName_do.getStyle().fontSize = "14px";
            i.playlistName_do.getStyle().color = r.playlistNameColor_str;
            i.playlistNameHolder_do.addChild(i.playlistNameBk_do);
            i.playlistNameHolder_do.addChild(i.playlistName_do);
            i.mainHolder_do.addChild(i.playlistNameHolder_do)
        };
        this.updatePlaylistName = function(e) {
            if (!i.playlistName_do) return;
            i.playlistName_do.setInnerHTML(e);
            setTimeout(function() {
                i.playlistName_do.setY(parseInt((i.playlistNameHolder_do.h - i.playlistName_do.getHeight()) / 2) + 1)
            }, 50)
        };
        this.setupInput = function() {
            i.input_do = new FWDUVPDisplayObject("input");
            i.input_do.screen.maxLength = 20;
            i.input_do.getStyle().textAlign = "left";
            i.input_do.getStyle().outline = "none";
            i.input_do.getStyle().boxShadow = "none";
            i.input_do.getStyle().fontSmoothing = "antialiased";
            i.input_do.getStyle().webkitFontSmoothing = "antialiased";
            i.input_do.getStyle().textRendering = "optimizeLegibility";
            i.input_do.getStyle().fontFamily = "Arial";
            i.input_do.getStyle().fontSize = "12px";
            i.input_do.getStyle().padding = "6px";
            if (!FWDUVPUtils.isIEAndLessThen9) i.input_do.getStyle().paddingRight = "-6px";
            i.input_do.getStyle().paddingTop = "2px";
            i.input_do.getStyle().paddingBottom = "3px";
            i.input_do.getStyle().backgroundColor = i.inputBackgroundColor_str;
            i.input_do.getStyle().color = i.inputColor_str;
            i.input_do.screen.value = "search for video";
            i.noSearchFound_do = new FWDUVPDisplayObject("div");
            i.noSearchFound_do.setX(0);
            i.noSearchFound_do.getStyle().textAlign = "center";
            i.noSearchFound_do.getStyle().width = "100%";
            i.noSearchFound_do.getStyle().fontSmoothing = "antialiased";
            i.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased";
            i.noSearchFound_do.getStyle().textRendering = "optimizeLegibility";
            i.noSearchFound_do.getStyle().fontFamily = "Arial";
            i.noSearchFound_do.getStyle().fontSize = "12px";
            i.noSearchFound_do.getStyle().color = i.inputColor_str;
            i.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
            i.noSearchFound_do.setVisible(false);
            i.mainHolder_do.addChild(i.noSearchFound_do);
            if (i.input_do.screen.addEventListener) {
                i.input_do.screen.addEventListener("mousedown", i.inputFocusInHandler);
                i.input_do.screen.addEventListener("keyup", i.keyUpHandler)
            } else if (i.input_do.screen.attachEvent) {
                i.input_do.screen.attachEvent("onmousedown", i.inputFocusInHandler);
                i.input_do.screen.attachEvent("onkeyup", i.keyUpHandler)
            }
            var e = new Image;
            e.src = r.inputArrowPath_str;
            i.inputArrow_do = new FWDUVPDisplayObject("img");
            i.inputArrow_do.setScreen(e);
            i.inputArrow_do.setWidth(9);
            i.inputArrow_do.setHeight(10);
            i.controllBar_do.addChild(i.inputArrow_do);
            i.controllBar_do.addChild(i.input_do)
        };
        this.inputFocusInHandler = function() {
            if (i.hasInputFocus_bl) return;
            i.hasInputFocus_bl = true;
            if (i.input_do.screen.value == "search for video") {
                i.input_do.screen.value = ""
            }
            setTimeout(function() {
                if (e.addEventListener) {
                    e.addEventListener("mousedown", i.inputFocusOutHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousedown", i.inputFocusOutHandler)
                }
            }, 50)
        };
        this.inputFocusOutHandler = function(t) {
            if (!i.hasInputFocus_bl) return;
            var n = FWDUVPUtils.getViewportMouseCoordinates(t);
            if (!FWDUVPUtils.hitTest(i.input_do.screen, n.screenX, n.screenY)) {
                i.hasInputFocus_bl = false;
                if (i.input_do.screen.value == "") {
                    i.input_do.screen.value = "search for video";
                    if (e.removeEventListener) {
                        e.removeEventListener("mousedown", i.inputFocusOutHandler)
                    } else if (document.detachEvent) {
                        document.detachEvent("onmousedown", i.inputFocusOutHandler)
                    }
                }
                return
            }
        };
        this.keyUpHandler = function(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (i.prevInputValue_str != i.input_do.screen.value) {
                if (i.isMobile_bl) {
                    i.positionThumbs(false);
                    i.thumbnailsFinalY = Math.round(i.curId / (i.totalThumbs - 1) * (i.totalThumbsHeight - i.mainThumbsHolder_do.h)) * -1
                } else {
                    i.positionThumbs(true)
                }
            }
            i.prevInputValue_str = i.input_do.screen.value;
            if (i.scrHandler_do) {
                i.updateScrollBarSizeActiveAndDeactivate();
                i.updateScrollBarHandlerAndContent(true, true)
            }
        };
        this.showNothingFound = function() {
            if (i.isShowNothingFound_bl) return;
            i.isShowNothingFound_bl = true;
            i.noSearchFound_do.setVisible(true);
            i.noSearchFound_do.setY(parseInt((i.stageHeight - i.noSearchFound_do.getHeight()) / 2));
            i.noSearchFound_do.setAlpha(0);
            FWDUVPTweenMax.to(i.noSearchFound_do, .1, {
                alpha: 1,
                yoyo: true,
                repeat: 4
            })
        };
        this.hideNothingFound = function() {
            if (!i.isShowNothingFound_bl) return;
            i.isShowNothingFound_bl = false;
            FWDUVPTweenMax.killTweensOf(i.noSearchFound_do);
            i.noSearchFound_do.setVisible(false)
        };
        this.positionControllBar = function() {
            var e;
            var t;
            var n;
            if (i.input_do && i.stageWidth <= 340) {
                e = i.stageWidth - i.startSpaceBetweenButtons * 2 - i.inputArrow_do.w - i.spaceBetweenButtons;
                if (i.nextButton_do) e -= i.nextButton_do.w + i.spaceBetweenButtons;
                if (i.prevButton_do) e -= i.prevButton_do.w + i.spaceBetweenButtons;
                if (i.shuffleButton_do) e -= i.shuffleButton_do.w + i.spaceBetweenButtons;
                if (i.loopButton_do) e -= i.loopButton_do.w + i.spaceBetweenButtons;
                for (var r = 0; r < i.totalButtons; r++) {
                    t = i.buttons_ar[i.totalButtons - 1 - r];
                    n = i.buttons_ar[i.totalButtons - r];
                    if (r == 0) {
                        t.setX(i.stageWidth - t.w - i.startSpaceBetweenButtons)
                    } else {
                        t.setX(n.x - n.w - i.spaceBetweenButtons)
                    }
                    t.setY(parseInt((i.controllBar_do.h - t.h) / 2))
                }
            } else if (i.input_do && i.stageWidth > 340) {
                e = i.stageWidth - i.startSpaceBetweenButtons * 2 - i.inputArrow_do.w - 12;
                if (e > 350) e = 350;
                if (i.nextButton_do) e -= i.nextButton_do.w + i.spaceBetweenButtons;
                if (i.prevButton_do) e -= i.prevButton_do.w + i.spaceBetweenButtons;
                if (i.shuffleButton_do) e -= i.shuffleButton_do.w + i.spaceBetweenButtons;
                if (i.loopButton_do) e -= i.loopButton_do.w + i.spaceBetweenButtons;
                for (var r = 0; r < i.totalButtons; r++) {
                    t = i.buttons_ar[i.totalButtons - 1 - r];
                    n = i.buttons_ar[i.totalButtons - r];
                    if (r == 0) {
                        t.setX(i.stageWidth - t.w - i.startSpaceBetweenButtons)
                    } else {
                        t.setX(n.x - n.w - i.spaceBetweenButtons)
                    }
                    t.setY(parseInt((i.controllBar_do.h - t.h) / 2))
                }
            } else {
                if (i.shuffleButton_do) {
                    i.shuffleButton_do.setX(i.spaceBetweenButtons);
                    i.shuffleButton_do.setY(parseInt((i.controllBar_do.h - i.shuffleButton_do.h) / 2));
                    if (i.loopButton_do) {
                        i.loopButton_do.setX(i.shuffleButton_do.x + i.shuffleButton_do.w + i.spaceBetweenButtons);
                        i.loopButton_do.setY(parseInt((i.controllBar_do.h - i.shuffleButton_do.h) / 2))
                    }
                } else if (i.loopButton_do) {
                    i.loopButton_do.setX(i.spaceBetweenButtons);
                    i.loopButton_do.setY(parseInt((i.controllBar_do.h - i.loopButton_do.h) / 2))
                }
                if (i.nextButton_do) {
                    i.nextButton_do.setX(i.stageWidth - i.nextButton_do.w - i.startSpaceBetweenButtons);
                    i.nextButton_do.setY(parseInt((i.controllBar_do.h - i.nextButton_do.h) / 2));
                    i.prevButton_do.setX(i.nextButton_do.x - i.nextButton_do.w - i.spaceBetweenButtons);
                    i.prevButton_do.setY(parseInt((i.controllBar_do.h - i.prevButton_do.h) / 2))
                }
            }
            if (i.input_do) {
                i.input_do.setWidth(e);
                i.input_do.setX(i.startSpaceBetweenButtons);
                i.input_do.setY(parseInt((i.controllBar_do.h - i.input_do.getHeight()) / 2) + 1);
                i.inputArrow_do.setX(parseInt(i.input_do.x + i.input_do.getWidth()) + 1);
                i.inputArrow_do.setY(parseInt((i.controllBar_do.h - i.inputArrow_do.h) / 2) + 1)
            }
            i.controllBar_do.setWidth(i.stageWidth);
            i.controllBar_do.setY(i.stageHeight - i.controllBar_do.h)
        };
        this.setupPrevButton = function() {
            FWDUVPSimpleButton.setPrototype();
            i.prevButton_do = new FWDUVPSimpleButton(i.prevN_img, r.prevSPath_str);
            i.prevButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, i.prevButtonShowTooltipHandler);
            i.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, i.prevButtonOnMouseUpHandler);
            i.buttons_ar.push(i.prevButton_do);
            i.controllBar_do.addChild(i.prevButton_do)
        };
        this.prevButtonShowTooltipHandler = function(e) {
            i.showToolTip(i.prevButton_do, i.prevButtonToolTip_do, e.e)
        };
        this.prevButtonOnMouseUpHandler = function() {
            i.dispatchEvent(t.PLAY_PREV_VIDEO)
        };
        this.setupNextButton = function() {
            FWDUVPSimpleButton.setPrototype();
            i.nextButton_do = new FWDUVPSimpleButton(i.nextN_img, r.nextSPath_str);
            i.nextButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, i.nextButtonShowTooltipHandler);
            i.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, i.nextButtonOnMouseUpHandler);
            i.buttons_ar.push(i.nextButton_do);
            i.controllBar_do.addChild(i.nextButton_do)
        };
        this.nextButtonShowTooltipHandler = function(e) {
            i.showToolTip(i.nextButton_do, i.nextButtonToolTip_do, e.e)
        };
        this.nextButtonOnMouseUpHandler = function() {
            i.dispatchEvent(t.PLAY_NEXT_VIDEO)
        };
        this.setupShuffleButton = function() {
            FWDUVPSimpleButton.setPrototype();
            i.shuffleButton_do = new FWDUVPSimpleButton(i.shuffleN_img, r.shufflePathS_str, undefined, true);
            i.shuffleButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, i.shuffleButtonShowToolTipHandler);
            i.shuffleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, i.shuffleButtonOnMouseUpHandler);
            i.buttons_ar.push(i.shuffleButton_do);
            i.controllBar_do.addChild(i.shuffleButton_do);
            if (!i.loop_bl && i.shuffle_bl) i.setShuffleButtonState("selected")
        };
        this.shuffleButtonShowToolTipHandler = function(e) {
            i.showToolTip(i.shuffleButton_do, i.shuffleButtonToolTip_do, e.e)
        };
        this.shuffleButtonOnMouseUpHandler = function() {
            if (i.shuffleButton_do.isSelectedFinal_bl) {
                i.dispatchEvent(t.DISABLE_SHUFFLE)
            } else {
                i.dispatchEvent(t.ENABLE_SHUFFLE)
            }
        };
        this.setShuffleButtonState = function(e) {
            if (!i.shuffleButton_do) return;
            if (e == "selected") {
                i.shuffleButton_do.setSelected()
            } else if (e == "unselected") {
                i.shuffleButton_do.setUnselected()
            }
        };
        this.setupLoopButton = function() {
            FWDUVPSimpleButton.setPrototype();
            i.loopButton_do = new FWDUVPSimpleButton(i.replayN_img, r.replaySPath_str, undefined, true);
            i.loopButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, i.loopButtonShowTooltipHandler);
            i.loopButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, i.loopButtonOnMouseUpHandler);
            i.buttons_ar.push(i.loopButton_do);
            i.controllBar_do.addChild(i.loopButton_do);
            if (i.loop_bl) i.setLoopStateButton("selected")
        };
        this.loopButtonShowTooltipHandler = function(e) {
            i.showToolTip(i.loopButton_do, i.loopButtonToolTip_do, e.e)
        };
        this.loopButtonOnMouseUpHandler = function() {
            if (i.loopButton_do.isSelectedFinal_bl) {
                i.dispatchEvent(t.DISABLE_LOOP)
            } else {
                i.dispatchEvent(t.ENABLE_LOOP)
            }
        };
        this.setLoopStateButton = function(e) {
            if (!i.loopButton_do) return;
            if (e == "selected") {
                i.loopButton_do.setSelected()
            } else if (e == "unselected") {
                i.loopButton_do.setUnselected()
            }
        };
        this.setupToolTips = function() {
            if (i.showNextAndPrevButtons_bl) {
                FWDUVPToolTip.setPrototype();
                i.prevButtonToolTip_do = new FWDUVPToolTip(i.prevButton_do, r.toopTipBk_str, r.toopTipPointer_str, "previous video", i.buttonsToolTipFontColor_str, i.buttonsToolTipHideDelay);
                document.documentElement.appendChild(i.prevButtonToolTip_do.screen);
                FWDUVPToolTip.setPrototype();
                i.nextButtonToolTip_do = new FWDUVPToolTip(i.nextButton_do, r.toopTipBk_str, r.toopTipPointer_str, "next video", i.buttonsToolTipFontColor_str, i.buttonsToolTipHideDelay);
                document.documentElement.appendChild(i.nextButtonToolTip_do.screen)
            }
            if (i.showShuffleButton_bl) {
                FWDUVPToolTip.setPrototype();
                i.shuffleButtonToolTip_do = new FWDUVPToolTip(i.shuffleButton_do, r.toopTipBk_str, r.toopTipPointer_str, "shuffle", i.buttonsToolTipFontColor_str, i.buttonsToolTipHideDelay);
                document.documentElement.appendChild(i.shuffleButtonToolTip_do.screen)
            }
            if (i.showLoopButton_bl) {
                FWDUVPToolTip.setPrototype();
                i.loopButtonToolTip_do = new FWDUVPToolTip(i.loopButton_do, r.toopTipBk_str, r.toopTipPointer_str, "loop", i.buttonsToolTipFontColor_str, i.buttonsToolTipHideDelay);
                document.documentElement.appendChild(i.loopButtonToolTip_do.screen)
            }
        };
        this.showToolTip = function(e, t, n) {
            if (!i.showButtonsToolTip_bl) return;
            var r = FWDUVPUtils.getViewportSize();
            var s = FWDUVPUtils.getViewportMouseCoordinates(n);
            var o;
            var u;
            if (e.screen.offsetWidth < 3) {
                o = parseInt(e.getGlobalX() * 100 + e.w / 2 - t.w / 2);
                u = parseInt(e.getGlobalY() * 100 - t.h - 8)
            } else {
                o = parseInt(e.getGlobalX() + e.w / 2 - t.w / 2);
                u = parseInt(e.getGlobalY() - t.h - 8)
            }
            var a = 0;
            if (o < 0) {
                a = o;
                o = 0
            } else if (o + t.w > r.w) {
                a = (r.w - (o + t.w)) * -1;
                o = o + a * -1
            }
            t.positionPointer(a, false);
            t.setX(o);
            t.setY(u);
            t.show()
        };
        this.setupThumbnails = function() {
            i.totalThumbs = i.playlist_ar.length;
            i.thumbs_ar = [];
            var e;
            for (var t = 0; t < i.totalThumbs; t++) {
                FWDUVPPlaylistThumb.setPrototype();
                e = new FWDUVPPlaylistThumb(i, t, r.playlistThumbnailsBkPath_str, r.thumbnailNormalBackgroundColor_str, r.thumbnailHoverBackgroundColor_str, r.thumbnailDisabledBackgroundColor_str, i.thumbImageW, i.thumbImageH, i.thumbInPadding, i.playlist_ar[t].title, i.playlist_ar[t].titleText);
                i.thumbs_ar[t] = e;
                e.addListener(FWDUVPPlaylistThumb.MOUSE_UP, i.thumbMouseUpHandler);
                i.thumbsHolder_do.addChild(e)
            }
        };
        this.thumbMouseUpHandler = function(e) {
            if (i.disableThumbs_bl) return;
            i.disableForAWhileAfterThumbClick_bl = true;
            clearTimeout(i.disableForAWhileAfterThumbClickId_to);
            i.disableForAWhileAfterThumbClickId_to = setTimeout(function() {
                i.disableForAWhileAfterThumbClick_bl = false
            }, 50);
            i.dispatchEvent(t.THUMB_MOUSE_UP, {
                id: e.id
            })
        };
        this.loadImages = function() {
            if (!i.playlist_ar[i.countLoadedThumbs]) return;
            if (i.image_img) {
                i.image_img.onload = null;
                i.image_img.onerror = null
            }
            i.image_img = new Image;
            i.image_img.onerror = i.onImageLoadError;
            i.image_img.onload = i.onImageLoadComplete;
            i.image_img.src = i.playlist_ar[i.countLoadedThumbs].thumbSource
        };
        this.onImageLoadError = function(e) {};
        this.onImageLoadComplete = function(e) {
            var t = i.thumbs_ar[i.countLoadedThumbs];
            t.setImage(i.image_img);
            i.countLoadedThumbs++;
            i.loadWithDelayId_to = setTimeout(i.loadImages, 40)
        };
        this.checkThumbsState = function() {
            if (!i.thumbs_ar) return;
            var e;
            for (var t = 0; t < i.totalThumbs; t++) {
                e = i.thumbs_ar[t];
                if (t == i.curId) {
                    e.disable()
                } else {
                    e.enable()
                }
            }
        };
        this.positionThumbs = function(e) {
            if (!i.thumbs_ar) return;
            var t;
            var n;
            var r;
            var s = i.stageWidth;
            var o;
            var u = [].concat(i.thumbs_ar);
            i.isSearched_bl = false;
            if (i.input_do) {
                o = i.input_do.screen.value.toLowerCase();
                if (o != "search for video") {
                    for (var a = 0; a < u.length; a++) {
                        t = u[a];
                        if (t.htmlText_str.indexOf(o) == -1) {
                            FWDUVPTweenMax.killTweensOf(t);
                            t.setX(-t.w - 20);
                            u.splice(a, 1);
                            a--
                        }
                    }
                }
            }
            var f = u.length;
            if (i.totalThumbs != f) i.isSearched_bl = true;
            for (var a = 0; a < f; a++) {
                t = u[a];
                t.finalW = i.stageWidth;
                t.finalX = 0;
                t.finalY = a * (t.finalH + i.spaceBetweenThumbnails);
                t.resizeAndPosition(e)
            }
            if (f == 0) {
                i.showNothingFound()
            } else {
                i.hideNothingFound()
            }
            i.totalThumbsHeight = Math.max(0, f * (t.h + i.spaceBetweenThumbnails) - i.spaceBetweenThumbnails);
            if (i.totalThumbsHeight > i.stageHeight - i.removeFromThumbsHolderHeight) {
                i.allowToScrollAndScrollBarIsActive_bl = true
            } else {
                i.allowToScrollAndScrollBarIsActive_bl = false
            }
        };
        this.setupMobileScrollbar = function() {
            if (i.hasPointerEvent_bl) {
                i.mainThumbsHolder_do.screen.addEventListener("MSPointerDown", i.scrollBarTouchStartHandler)
            } else {
                i.mainThumbsHolder_do.screen.addEventListener("touchstart", i.scrollBarTouchStartHandler)
            }
            i.updateMobileScrollBarId_int = setInterval(i.updateMobileScrollBar, 16)
        };
        this.scrollBarTouchStartHandler = function(t) {
            FWDUVPTweenMax.killTweensOf(i.thumbsHolder_do);
            var n = FWDUVPUtils.getViewportMouseCoordinates(t);
            i.isDragging_bl = true;
            i.lastPresedY = n.screenY;
            if (i.hasPointerEvent_bl) {
                e.addEventListener("MSPointerUp", i.scrollBarTouchEndHandler);
                e.addEventListener("MSPointerMove", i.scrollBarTouchMoveHandler)
            } else {
                e.addEventListener("touchend", i.scrollBarTouchEndHandler);
                e.addEventListener("touchmove", i.scrollBarTouchMoveHandler)
            }
            clearInterval(i.updateMoveMobileScrollbarId_int);
            i.updateMoveMobileScrollbarId_int = setInterval(i.updateMoveMobileScrollbar, 20)
        };
        this.scrollBarTouchMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (i.totalThumbsHeight < i.mainThumbsHolder_do.h) return;
            n.showDisable();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var r = t.screenY - i.lastPresedY;
            i.thumbnailsFinalY += r;
            i.thumbnailsFinalY = Math.round(i.thumbnailsFinalY);
            i.lastPresedY = t.screenY;
            i.vy = r * 2
        };
        this.scrollBarTouchEndHandler = function(t) {
            i.isDragging_bl = false;
            clearInterval(i.updateMoveMobileScrollbarId_int);
            clearTimeout(i.disableOnMoveId_to);
            i.disableOnMoveId_to = setTimeout(function() {
                n.hideDisable()
            }, 100);
            if (i.hasPointerEvent_bl) {
                e.removeEventListener("MSPointerUp", i.scrollBarTouchEndHandler);
                e.removeEventListener("MSPointerMove", i.scrollBarTouchMoveHandler)
            } else {
                e.removeEventListener("touchend", i.scrollBarTouchEndHandler);
                e.removeEventListener("touchmove", i.scrollBarTouchMoveHandler)
            }
        };
        this.updateMoveMobileScrollbar = function() {
            i.thumbsHolder_do.setY(i.thumbnailsFinalY)
        };
        this.updateMobileScrollBar = function(e) {
            if (!i.isDragging_bl) {
                if (i.totalThumbsHeight < i.mainThumbsHolder_do.h) i.thumbnailsFinalY = .01;
                i.vy *= i.friction;
                i.thumbnailsFinalY += i.vy;
                if (i.thumbnailsFinalY > 0) {
                    i.vy2 = (0 - i.thumbnailsFinalY) * .3;
                    i.vy *= i.friction;
                    i.thumbnailsFinalY += i.vy2
                } else if (i.thumbnailsFinalY < i.mainThumbsHolder_do.h - i.totalThumbsHeight) {
                    i.vy2 = (i.mainThumbsHolder_do.h - i.totalThumbsHeight - i.thumbnailsFinalY) * .3;
                    i.vy *= i.friction;
                    i.thumbnailsFinalY += i.vy2
                }
                i.thumbsHolder_do.setY(Math.round(i.thumbnailsFinalY))
            }
        };
        this.setupScrollbar = function() {
            i.scrMainHolder_do = new FWDUVPDisplayObject("div");
            i.scrMainHolder_do.setWidth(i.scrWidth);
            i.scrTrack_do = new FWDUVPDisplayObject("div");
            i.scrTrack_do.setWidth(i.scrWidth);
            i.scrTrackTop_do = new FWDUVPDisplayObject("img");
            i.scrTrackTop_do.setScreen(i.scrBkTop_img);
            i.scrTrackMiddle_do = new FWDUVPDisplayObject("div");
            i.scrTrackMiddle_do.getStyle().background = "url('" + r.scrBkMiddlePath_str + "')";
            i.scrTrackMiddle_do.setWidth(i.scrWidth);
            i.scrTrackMiddle_do.setY(i.scrTrackTop_do.h);
            var e = new Image;
            e.src = r.scrBkBottomPath_str;
            i.scrTrackBottom_do = new FWDUVPDisplayObject("img");
            i.scrTrackBottom_do.setScreen(e);
            i.scrTrackBottom_do.setWidth(i.scrTrackTop_do.w);
            i.scrTrackBottom_do.setHeight(i.scrTrackTop_do.h);
            i.scrHandler_do = new FWDUVPDisplayObject("div");
            i.scrHandler_do.setWidth(i.scrWidth);
            i.scrHandlerTop_do = new FWDUVPDisplayObject("img");
            i.scrHandlerTop_do.setScreen(i.scrDragTop_img);
            i.scrHandlerMiddle_do = new FWDUVPDisplayObject("div");
            i.scrHandlerMiddle_do.getStyle().background = "url('" + r.scrDragMiddlePath_str + "')";
            i.scrHandlerMiddle_do.setWidth(i.scrWidth);
            i.scrHandlerMiddle_do.setY(i.scrHandlerTop_do.h);
            var t = new Image;
            t.src = r.scrDragBottomPath_str;
            i.scrHandlerBottom_do = new FWDUVPDisplayObject("img");
            i.scrHandlerBottom_do.setScreen(t);
            i.scrHandlerBottom_do.setWidth(i.scrHandlerTop_do.w);
            i.scrHandlerBottom_do.setHeight(i.scrHandlerTop_do.h);
            i.scrHandler_do.setButtonMode(true);
            i.scrHandlerLinesN_do = new FWDUVPDisplayObject("img");
            i.scrHandlerLinesN_do.setScreen(i.scrLinesN_img);
            var n = new Image;
            n.src = r.scrLinesSPath_str;
            i.scrHandlerLinesS_do = new FWDUVPDisplayObject("img");
            i.scrHandlerLinesS_do.setScreen(n);
            i.scrHandlerLinesS_do.setWidth(i.scrHandlerLinesN_do.w);
            i.scrHandlerLinesS_do.setHeight(i.scrHandlerLinesN_do.h);
            i.scrHandlerLinesS_do.setAlpha(0);
            i.scrHandlerLines_do = new FWDUVPDisplayObject("div");
            i.scrHandlerLines_do.hasTransform3d_bl = false;
            i.scrHandlerLines_do.hasTransform2d_bl = false;
            i.scrHandlerLines_do.setBackfaceVisibility();
            i.scrHandlerLines_do.setWidth(i.scrHandlerLinesN_do.w);
            i.scrHandlerLines_do.setHeight(i.scrHandlerLinesN_do.h);
            i.scrHandlerLines_do.setButtonMode(true);
            i.scrTrack_do.addChild(i.scrTrackTop_do);
            i.scrTrack_do.addChild(i.scrTrackMiddle_do);
            i.scrTrack_do.addChild(i.scrTrackBottom_do);
            i.scrHandler_do.addChild(i.scrHandlerTop_do);
            i.scrHandler_do.addChild(i.scrHandlerMiddle_do);
            i.scrHandler_do.addChild(i.scrHandlerBottom_do);
            i.scrHandlerLines_do.addChild(i.scrHandlerLinesN_do);
            i.scrHandlerLines_do.addChild(i.scrHandlerLinesS_do);
            i.scrMainHolder_do.addChild(i.scrTrack_do);
            i.scrMainHolder_do.addChild(i.scrHandler_do);
            i.scrMainHolder_do.addChild(i.scrHandlerLines_do);
            i.mainHolder_do.addChild(i.scrMainHolder_do);
            if (i.scrHandler_do.screen.addEventListener) {
                i.scrHandler_do.screen.addEventListener("mouseover", i.scrollBarHandlerOnMouseOver);
                i.scrHandler_do.screen.addEventListener("mouseout", i.scrollBarHandlerOnMouseOut);
                i.scrHandler_do.screen.addEventListener("mousedown", i.scrollBarHandlerOnMouseDown);
                i.scrHandlerLines_do.screen.addEventListener("mouseover", i.scrollBarHandlerOnMouseOver);
                i.scrHandlerLines_do.screen.addEventListener("mouseout", i.scrollBarHandlerOnMouseOut);
                i.scrHandlerLines_do.screen.addEventListener("mousedown", i.scrollBarHandlerOnMouseDown)
            } else if (i.scrHandler_do.screen.attachEvent) {
                i.scrHandler_do.screen.attachEvent("onmouseover", i.scrollBarHandlerOnMouseOver);
                i.scrHandler_do.screen.attachEvent("onmouseout", i.scrollBarHandlerOnMouseOut);
                i.scrHandler_do.screen.attachEvent("onmousedown", i.scrollBarHandlerOnMouseDown);
                i.scrHandlerLines_do.screen.attachEvent("onmouseover", i.scrollBarHandlerOnMouseOver);
                i.scrHandlerLines_do.screen.attachEvent("onmouseout", i.scrollBarHandlerOnMouseOut);
                i.scrHandlerLines_do.screen.attachEvent("onmousedown", i.scrollBarHandlerOnMouseDown)
            }
        };
        this.scrollBarHandlerOnMouseOver = function(e) {
            if (!i.allowToScrollAndScrollBarIsActive_bl) return;
            FWDUVPTweenMax.to(i.scrHandlerLinesS_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.scrollBarHandlerOnMouseOut = function(e) {
            if (i.isDragging_bl || !i.allowToScrollAndScrollBarIsActive_bl) return;
            FWDUVPTweenMax.to(i.scrHandlerLinesS_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.scrollBarHandlerOnMouseDown = function(t) {
            if (!i.allowToScrollAndScrollBarIsActive_bl) return;
            var r = FWDUVPUtils.getViewportMouseCoordinates(t);
            i.isDragging_bl = true;
            i.yPositionOnPress = i.scrHandler_do.y;
            i.lastPresedY = r.screenY;
            FWDUVPTweenMax.killTweensOf(i.scrHandler_do);
            n.showDisable();
            if (e.addEventListener) {
                e.addEventListener("mousemove", i.scrollBarHandlerMoveHandler);
                e.addEventListener("mouseup", i.scrollBarHandlerEndHandler)
            } else if (document.attachEvent) {
                document.attachEvent("onmousemove", i.scrollBarHandlerMoveHandler);
                document.attachEvent("onmouseup", i.scrollBarHandlerEndHandler)
            }
        };
        this.scrollBarHandlerMoveHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            var n = i.scrollBarHandlerFinalY + parseInt((i.scrHandler_do.h - i.scrHandlerLines_do.h) / 2);
            i.scrollBarHandlerFinalY = Math.round(i.yPositionOnPress + t.screenY - i.lastPresedY);
            if (i.scrollBarHandlerFinalY >= i.scrTrack_do.h - i.scrHandler_do.h) {
                i.scrollBarHandlerFinalY = i.scrTrack_do.h - i.scrHandler_do.h
            } else if (i.scrollBarHandlerFinalY <= 0) {
                i.scrollBarHandlerFinalY = 0
            }
            i.scrHandler_do.setY(i.scrollBarHandlerFinalY);
            FWDUVPTweenMax.killTweensOf(i.scrHandler_do);
            FWDUVPTweenMax.to(i.scrHandlerLines_do, .8, {
                y: n,
                ease: Quart.easeOut
            });
            i.updateScrollBarHandlerAndContent(true)
        };
        i.scrollBarHandlerEndHandler = function(t) {
            var r = FWDUVPUtils.getViewportMouseCoordinates(t);
            i.isDragging_bl = false;
            if (!FWDUVPUtils.hitTest(i.scrHandler_do.screen, r.screenX, r.screenY)) {
                FWDUVPTweenMax.to(i.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })
            }
            n.hideDisable();
            FWDUVPTweenMax.killTweensOf(i.scrHandler_do);
            FWDUVPTweenMax.to(i.scrHandler_do, .4, {
                y: i.scrollBarHandlerFinalY,
                ease: Quart.easeOut
            });
            if (e.removeEventListener) {
                e.removeEventListener("mousemove", i.scrollBarHandlerMoveHandler);
                e.removeEventListener("mouseup", i.scrollBarHandlerEndHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", i.scrollBarHandlerMoveHandler);
                document.detachEvent("onmouseup", i.scrollBarHandlerEndHandler)
            }
        };
        this.updateScrollBarSizeActiveAndDeactivate = function() {
            if (i.disableForAWhileAfterThumbClick_bl) return;
            if (i.allowToScrollAndScrollBarIsActive_bl) {
                i.allowToScrollAndScrollBarIsActive_bl = true;
                i.scrMainHolder_do.setX(i.stageWidth - i.scrMainHolder_do.w);
                i.scrMainHolder_do.setHeight(i.stageHeight - i.removeFromThumbsHolderHeight);
                i.scrTrack_do.setHeight(i.scrMainHolder_do.h);
                i.scrTrackMiddle_do.setHeight(i.scrTrack_do.h - i.scrTrackTop_do.h * 2);
                i.scrTrackBottom_do.setY(i.scrTrackMiddle_do.y + i.scrTrackMiddle_do.h);
                i.scrMainHolder_do.setAlpha(1);
                i.scrHandler_do.setButtonMode(true);
                i.scrHandlerLines_do.setButtonMode(true)
            } else {
                i.allowToScrollAndScrollBarIsActive_bl = false;
                i.scrMainHolder_do.setX(i.stageWidth - i.scrMainHolder_do.w);
                i.scrMainHolder_do.setHeight(i.stageHeight - i.removeFromThumbsHolderHeight);
                i.scrTrack_do.setHeight(i.scrMainHolder_do.h);
                i.scrTrackMiddle_do.setHeight(i.scrTrack_do.h - i.scrTrackTop_do.h * 2);
                i.scrTrackBottom_do.setY(i.scrTrackMiddle_do.y + i.scrTrackMiddle_do.h);
                i.scrMainHolder_do.setAlpha(.5);
                i.scrHandler_do.setY(0);
                i.scrHandler_do.setButtonMode(false);
                i.scrHandlerLines_do.setButtonMode(false)
            }
            i.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1, i.scrMainHolder_do.h / i.totalThumbsHeight) * i.scrMainHolder_do.h)));
            i.scrHandlerMiddle_do.setHeight(i.scrHandler_do.h - i.scrHandlerTop_do.h * 2);
            i.scrHandlerBottom_do.setY(i.scrHandlerMiddle_do.y + i.scrHandlerMiddle_do.h);
            FWDUVPTweenMax.killTweensOf(i.scrHandlerLines_do);
            i.scrHandlerLines_do.setY(i.scrollBarHandlerFinalY + parseInt((i.scrHandler_do.h - i.scrHandlerLines_do.h) / 2));
            i.scrHandlerBottom_do.setY(i.scrHandler_do.h - i.scrHandlerBottom_do.h)
        };
        this.updateScrollBarHandlerAndContent = function(e, t) {
            if (i.disableForAWhileAfterThumbClick_bl) return;
            if (!i.allowToScrollAndScrollBarIsActive_bl && !t) return;
            var n = 0;
            var r;
            if (i.isDragging_bl && !i.isMobile_bl) {
                n = i.scrollBarHandlerFinalY / (i.scrMainHolder_do.h - i.scrHandler_do.h);
                if (n == "Infinity") {
                    n = 0
                } else if (n >= 1) {
                    scrollPercent = 1
                }
                i.thumbnailsFinalY = Math.round(n * (i.totalThumbsHeight - i.mainThumbsHolder_do.h)) * -1
            } else {
                if (i.isSearched_bl) {
                    i.percentScrolled = 0
                } else {
                    n = i.curId / (i.totalThumbs - 1)
                }
                i.thumbnailsFinalY = Math.min(0, Math.round(n * (i.totalThumbsHeight - i.mainThumbsHolder_do.h)) * -1);
                if (i.scrMainHolder_do) {
                    i.scrollBarHandlerFinalY = Math.round((i.scrMainHolder_do.h - i.scrHandler_do.h) * n);
                    if (i.scrollBarHandlerFinalY < 0) {
                        i.scrollBarHandlerFinalY = 0
                    } else if (i.scrollBarHandlerFinalY > i.scrMainHolder_do.h - i.scrHandler_do.h - 1) {
                        i.scrollBarHandlerFinalY = i.scrMainHolder_do.h - i.scrHandler_do.h - 1
                    }
                    FWDUVPTweenMax.killTweensOf(i.scrHandler_do);
                    FWDUVPTweenMax.killTweensOf(i.scrHandlerLines_do);
                    if (e) {
                        FWDUVPTweenMax.to(i.scrHandler_do, .4, {
                            y: i.scrollBarHandlerFinalY,
                            ease: Quart.easeOut
                        });
                        FWDUVPTweenMax.to(i.scrHandlerLines_do, .8, {
                            y: i.scrollBarHandlerFinalY + parseInt((i.scrHandler_do.h - i.scrHandlerLinesN_do.h) / 2),
                            ease: Quart.easeOut
                        })
                    } else {
                        i.scrHandler_do.setY(i.scrollBarHandlerFinalY);
                        i.scrHandlerLines_do.setY(i.scrollBarHandlerFinalY + parseInt((i.scrHandler_do.h - i.scrHandlerLinesN_do.h) / 2))
                    }
                }
            }
            if (i.lastThumbnailFinalY != i.thumbnailsFinalY) {
                FWDUVPTweenMax.killTweensOf(i.thumbsHolder_do);
                if (e) {
                    FWDUVPTweenMax.to(i.thumbsHolder_do, .5, {
                        y: i.thumbnailsFinalY,
                        ease: Quart.easeOut
                    })
                } else {
                    i.thumbsHolder_do.setY(i.thumbnailsFinalY)
                }
            }
            i.lastThumbnailFinalY = i.thumbnailsFinalY
        };
        this.addMouseWheelSupport = function() {
            if (i.screen.addEventListener) {
                i.screen.addEventListener("DOMMouseScroll", i.mouseWheelHandler);
                i.screen.addEventListener("mousewheel", i.mouseWheelHandler)
            } else if (i.screen.attachEvent) {
                i.screen.attachEvent("onmousewheel", i.mouseWheelHandler)
            }
        };
        i.mouseWheelHandler = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (i.disableMouseWheel_bl || i.isDragging_bl) return false;
            var t = e.detail || e.wheelDelta;
            if (e.wheelDelta) t *= -1;
            if (t > 0) {
                i.scrollBarHandlerFinalY += Math.round(160 * i.scollbarSpeedSensitivity * (i.mainThumbsHolder_do.h / i.totalThumbsHeight))
            } else if (t < 0) {
                i.scrollBarHandlerFinalY -= Math.round(160 * i.scollbarSpeedSensitivity * (i.mainThumbsHolder_do.h / i.totalThumbsHeight))
            }
            if (i.scrollBarHandlerFinalY >= i.scrTrack_do.h - i.scrHandler_do.h) {
                i.scrollBarHandlerFinalY = i.scrTrack_do.h - i.scrHandler_do.h
            } else if (i.scrollBarHandlerFinalY <= 0) {
                i.scrollBarHandlerFinalY = 0
            }
            var n = i.scrollBarHandlerFinalY + parseInt((i.scrHandler_do.h - i.scrHandlerLines_do.h) / 2);
            FWDUVPTweenMax.killTweensOf(i.scrHandler_do);
            FWDUVPTweenMax.killTweensOf(i.scrHandlerLines_do);
            FWDUVPTweenMax.to(i.scrHandlerLines_do, .8, {
                y: n,
                ease: Quart.easeOut
            });
            FWDUVPTweenMax.to(i.scrHandler_do, .5, {
                y: i.scrollBarHandlerFinalY,
                ease: Quart.easeOut
            });
            i.isDragging_bl = true;
            i.updateScrollBarHandlerAndContent(true);
            i.isDragging_bl = false;
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.hideAndShow = function(e) {
            if (i.position_str == "bottom") {
                i.mainHolder_do.setY(-i.stageHeight);
                FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })
            } else {
                i.mainHolder_do.setX(-i.stageWidth);
                FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut
                })
            }
        };
        this.hide = function(e) {
            i.isShowed_bl = false;
            if (e) {
                if (i.position_str == "bottom") {
                    FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                        y: -i.stageHeight,
                        ease: Expo.easeInOut
                    })
                }
            } else {
                FWDUVPTweenMax.killTweensOf(i.mainHolder_do);
                if (i.position_str == "bottom") {
                    i.mainHolder_do.setY(-i.stageHeight)
                }
            }
        };
        this.show = function(e) {
            i.isShowed_bl = true;
            if (!FWDUVPTweenMax.isTweening(i.mainHolder_do)) i.hide(false);
            if (e) {
                if (i.position_str == "bottom") {
                    FWDUVPTweenMax.to(i.mainHolder_do, .8, {
                        y: 0,
                        ease: Expo.easeInOut
                    })
                } else {
                    i.mainHolder_do.setY(0)
                }
            } else {
                FWDUVPTweenMax.killTweensOf(i.mainHolder_do);
                i.mainHolder_do.setX(0);
                i.mainHolder_do.setY(0);
                clearTimeout(i.disableThumbsId_to);
                i.disableThumbsId_to = setTimeout(function() {
                    i.disableThumbs_bl = false
                }, 200);
                i.disableThumbs_bl = true
            }
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div", "absolute", "visible")
    };
    t.THUMB_MOUSE_UP = "thumbMouseOut";
    t.PLAY_PREV_VIDEO = "playPrevVideo";
    t.PLAY_NEXT_VIDEO = "playNextVideo";
    t.DISABLE_LOOP = "disableLoop";
    t.ENABLE_LOOP = "enableLoop";
    t.DISABLE_SHUFFLE = "disableShuffle";
    t.ENABLE_SHUFFLE = "enableShuffle";
    t.prototype = null;
    e.FWDUVPPlaylist = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s, o, u, a, f, l, c) {
        var h = this;
        var p = t.prototype;
        this.mainImageHolder_do = null;
        this.imageHolder_do = null;
        this.normalImage_do = null;
        this.dumy_do = null;
        this.text_do = null;
        this.backgroundImagePath_str = r;
        this.thumbnailNormalBackgroundColor_str = i;
        this.thumbnailHoverBackgroundColor_str = s;
        this.thumbnailDisabledBackgroundColor_str = o;
        this.htmlContent_str = l;
        this.htmlText_str = c.toLowerCase();
        this.curState_str = "none";
        this.id = n;
        this.padding = f;
        this.imageOriginalW;
        this.imageOriginalH;
        this.finalX;
        this.finalY;
        this.thumbImageWidth = u;
        this.thumbImageHeight = a;
        this.finalW;
        this.finalH = h.padding * 2 + h.thumbImageHeight;
        this.imageFinalX;
        this.imageFinalY;
        this.imageFinalW;
        this.imageFinalH;
        this.mouseX;
        this.mouseY;
        this.showId_to;
        this.disableForAWhileId_to;
        this.hasImage_bl = false;
        this.isSelected_bl = false;
        this.isDisabled_bl = false;
        this.disableForAWhile_bl = false;
        this.hasToolTipShowed_bl = false;
        this.hasCanvas_bl = FWDUVPlayer.hasCanvas;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.hasDispatchedOverEvent_bl = false;
        this.init = function() {
            h.setupMainContainers();
            h.setButtonMode(true);
            h.setNormalState();
            if (h.isMobile_bl) {
                if (h.hasPointerEvent_bl) {
                    h.dumy_do.screen.addEventListener("MSPointerUp", h.onMouseUp);
                    h.dumy_do.screen.addEventListener("MSPointerOver", h.onMouseOver);
                    h.dumy_do.screen.addEventListener("MSPointerOut", h.onMouseOut)
                } else {
                    h.dumy_do.screen.addEventListener("click", h.onMouseUp)
                }
            } else if (h.dumy_do.screen.addEventListener) {
                h.dumy_do.screen.addEventListener("mouseover", h.onMouseOver);
                h.dumy_do.screen.addEventListener("mouseout", h.onMouseOut);
                h.dumy_do.screen.addEventListener("click", h.onMouseUp)
            } else if (h.dumy_do.screen.attachEvent) {
                h.dumy_do.screen.attachEvent("onmouseover", h.onMouseOver);
                h.dumy_do.screen.attachEvent("onmouseout", h.onMouseOut);
                h.dumy_do.screen.attachEvent("onclick", h.onMouseUp)
            }
        };
        this.onMouseUp = function(e) {
            if (h.isDisabled_bl || e.button == 2) return;
            if (e.preventDefault) e.preventDefault();
            h.dispatchEvent(t.MOUSE_UP, {
                id: h.id
            })
        };
        this.onMouseOver = function(e) {
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                if (h.isDisabled_bl) return;
                h.setSelectedState(true)
            }
        };
        this.onMouseOut = function(e) {
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                if (h.isDisabled_bl) return;
                h.setNormalState(true)
            }
        };
        this.setupMainContainers = function() {
            h.mainImageHolder_do = new FWDUVPDisplayObject("div");
            h.mainImageHolder_do.getStyle().background = "url('" + h.backgroundImagePath_str + "')";
            h.mainImageHolder_do.setX(h.padding);
            h.mainImageHolder_do.setY(h.padding);
            h.mainImageHolder_do.setWidth(h.thumbImageWidth);
            h.mainImageHolder_do.setHeight(h.thumbImageHeight);
            h.imageHolder_do = new FWDUVPDisplayObject("div");
            h.text_do = new FWDUVPDisplayObject("div");
            h.text_do.hasTransform3d_bl = false;
            h.text_do.hasTransform2d_bl = false;
            h.text_do.setHeight(h.finalH - 6);
            h.text_do.setBackfaceVisibility();
            h.text_do.getStyle().fontFamily = "Arial";
            h.text_do.getStyle().fontSize = "12px";
            h.text_do.getStyle().color = h.fontColor_str;
            h.text_do.getStyle().fontSmoothing = "antialiased";
            h.text_do.getStyle().webkitFontSmoothing = "antialiased";
            h.text_do.getStyle().textRendering = "optimizeLegibility";
            h.text_do.setX(h.padding * 2 + h.thumbImageWidth + 4);
            h.text_do.setInnerHTML(h.htmlContent_str);
            h.addChild(h.text_do);
            h.dumy_do = new FWDUVPDisplayObject("div");
            h.dumy_do.getStyle().width = "100%";
            h.dumy_do.getStyle().height = "100%";
            if (FWDUVPUtils.isIE) {
                h.dumy_do.setBkColor("#FF0000");
                h.dumy_do.setAlpha(.01)
            }
            h.addChild(h.mainImageHolder_do);
            h.mainImageHolder_do.addChild(h.imageHolder_do);
            h.addChild(h.dumy_do)
        };
        this.setImage = function(t) {
            h.normalImage_do = new FWDUVPDisplayObject("img");
            h.normalImage_do.setScreen(t);
            h.imageOriginalW = h.normalImage_do.w;
            h.imageOriginalH = h.normalImage_do.h;
            h.resizeImage();
            h.imageHolder_do.setX(parseInt(h.thumbImageWidth / 2));
            h.imageHolder_do.setY(parseInt(h.thumbImageHeight / 2));
            h.imageHolder_do.setWidth(0);
            h.imageHolder_do.setHeight(0);
            h.normalImage_do.setX(-parseInt(h.normalImage_do.w / 2));
            h.normalImage_do.setY(-parseInt(h.normalImage_do.h / 2));
            FWDUVPTweenMax.to(h.imageHolder_do, .8, {
                x: 0,
                y: 0,
                w: h.thumbImageWidth,
                h: h.thumbImageHeight,
                ease: Expo.easeInOut
            });
            h.normalImage_do.setAlpha(0);
            if (h.isMobile_bl) {
                var n;
                if (h.id == e.curId) {
                    n = .3
                } else {
                    n = 1
                }
                FWDUVPTweenMax.to(h.normalImage_do, .8, {
                    alpha: n,
                    x: h.imageFinalX,
                    y: h.imageFinalY,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.to(h.normalImage_do, .8, {
                    alpha: 1,
                    x: h.imageFinalX,
                    y: h.imageFinalY,
                    ease: Expo.easeInOut
                })
            }
            h.imageHolder_do.addChild(h.normalImage_do);
            this.hasImage_bl = true
        };
        this.resizeAndPosition = function(e) {
            h.text_do.setWidth(h.finalW - (h.padding * 2 + h.thumbImageWidth) - 16);
            h.setWidth(h.finalW);
            h.setHeight(h.finalH);
            if (e) {
                FWDUVPTweenMax.to(h, .6, {
                    x: h.finalX,
                    y: h.finalY,
                    ease: Expo.easeInOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(h);
                h.setX(h.finalX);
                h.setY(h.finalY)
            }
            h.resizeImage()
        };
        this.resizeImage = function(e) {
            if (!h.normalImage_do) return;
            if (h.isMobile_bl) {
                if (h.normalImage_do.alpha != 1 && !h.isDisabled_bl) h.normalImage_do.setAlpha(1)
            } else {
                if (h.imageHolder_do.alpha != 1 && !h.isDisabled_bl) h.imageHolder_do.setAlpha(1)
            }
            var t = h.thumbImageWidth / h.imageOriginalW;
            var n = h.thumbImageHeight / h.imageOriginalH;
            var r;
            if (t <= n) {
                r = t
            } else {
                r = n
            }
            h.imageFinalW = Math.ceil(r * h.imageOriginalW);
            h.imageFinalH = Math.ceil(r * h.imageOriginalH);
            h.imageFinalX = Math.round((h.thumbImageWidth - h.imageFinalW) / 2);
            h.imageFinalY = Math.round((h.thumbImageHeight - h.imageFinalH) / 2);
            h.normalImage_do.setX(h.imageFinalX);
            h.normalImage_do.setY(h.imageFinalY);
            h.normalImage_do.setWidth(h.imageFinalW);
            h.normalImage_do.setHeight(h.imageFinalH)
        };
        this.setNormalState = function(e) {
            if (h.curState_str == "normal") return;
            h.curState_str = "normal";
            if (e) {
                FWDUVPTweenMax.to(h.screen, .8, {
                    css: {
                        backgroundColor: h.thumbnailNormalBackgroundColor_str
                    },
                    ease: Expo.easeOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(h.screen);
                h.getStyle().backgroundColor = h.thumbnailNormalBackgroundColor_str
            }
        };
        this.setSelectedState = function(e) {
            if (h.curState_str == "selected") return;
            h.curState_str = "selected";
            if (e) {
                FWDUVPTweenMax.to(h.screen, .8, {
                    css: {
                        backgroundColor: h.thumbnailHoverBackgroundColor_str
                    },
                    ease: Expo.easeOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(h.screen);
                h.getStyle().backgroundColor = h.thumbnailNormalBackgroundColor_str
            }
        };
        this.setDisabledState = function(e) {
            if (h.curState_str == "disabled") return;
            h.curState_str = "disabled";
            if (e) {
                FWDUVPTweenMax.to(h.screen, .8, {
                    css: {
                        backgroundColor: h.thumbnailDisabledBackgroundColor_str
                    },
                    ease: Expo.easeOut
                })
            } else {
                FWDUVPTweenMax.killTweensOf(h.screen);
                h.getStyle().backgroundColor = h.thumbnailNormalBackgroundColor_str
            }
        };
        this.enable = function() {
            if (!h.isDisabled_bl) return;
            h.isDisabled_bl = false;
            h.setButtonMode(true);
            h.setNormalState(true);
            if (h.isMobile_bl) {
                if (h.normalImage_do) h.normalImage_do.setAlpha(1)
            } else {
                FWDUVPTweenMax.to(h.imageHolder_do, .6, {
                    alpha: 1
                })
            }
        };
        this.disable = function() {
            if (h.isDisabled_bl) return;
            h.disableForAWhile_bl = true;
            clearTimeout(h.disableForAWhileId_to);
            h.disableForAWhileId_to = setTimeout(function() {
                h.disableForAWhile_bl = false
            }, 200);
            h.isDisabled_bl = true;
            h.setButtonMode(false);
            h.setDisabledState(true);
            if (h.isMobile_bl) {
                if (h.normalImage_do) h.normalImage_do.setAlpha(.3)
            } else {
                FWDUVPTweenMax.to(h.imageHolder_do, .6, {
                    alpha: .3
                })
            }
        };
        this.destroy = function() {
            FWDUVPTweenMax.killTweensOf(h);
            if (h.normalImage_do) {
                FWDUVPTweenMax.killTweensOf(h.normalImage_do);
                h.normalImage_do.destroy()
            }
            FWDUVPTweenMax.killTweensOf(h.imageHolder_do);
            h.imageHolder_do.destroy();
            h.dumy_do.destroy();
            h.text_do.destroy();
            h.backgroundImagePath_str = r;
            h.imageHolder_do = null;
            h.normalImage_do = null;
            h.dumy_do = null;
            h.text_do = null;
            h.htmlContent_str = null;
            h.htmlText_str = null;
            h.curState_str = null
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.SHOW_TOOL_TIP = "showToolTip";
    t.HIDE_TOOL_TIP = "hideToolTip";
    t.MOUSE_UP = "onMouseUp";
    t.prototype = null;
    e.FWDUVPPlaylistThumb = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.buttonRef_do = null;
        this.bkPath_str = e;
        this.pointerPath_str = n;
        this.text_do = null;
        this.pointer_do = null;
        this.fontColor_str = r;
        this.position_str = i;
        this.id = -1;
        if (this.position_str == "bottom") {
            this.pointerWidth = 7;
            this.pointerHeight = 4
        } else {
            this.pointerWidth = 4;
            this.pointerHeight = 7
        }
        this.maxWidth = s;
        this.showWithDelayId_to;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.isShowed_bl = true;
        this.init = function() {
            o.setOverflow("visible");
            o.setupMainContainers();
            o.hide();
            o.getStyle().background = "url('" + o.bkPath_str + "')";
            o.getStyle().zIndex = 9999999999999
        };
        this.setupMainContainers = function() {
            o.text_do = new FWDUVPDisplayObject("div");
            o.text_do.hasTransform3d_bl = false;
            o.text_do.hasTransform2d_bl = false;
            o.text_do.setBackfaceVisibility();
            o.text_do.setDisplay("inline-block");
            o.text_do.getStyle().fontFamily = "Arial";
            o.text_do.getStyle().fontSize = "12px";
            o.text_do.getStyle().color = o.fontColor_str;
            o.text_do.getStyle().fontSmoothing = "antialiased";
            o.text_do.getStyle().webkitFontSmoothing = "antialiased";
            o.text_do.getStyle().textRendering = "optimizeLegibility";
            o.text_do.getStyle().lineHeight = "16px";
            o.text_do.getStyle().padding = "6px";
            o.text_do.getStyle().paddingTop = "4px";
            o.text_do.getStyle().paddingBottom = "4px";
            o.text_do.getStyle().textAlign = "center";
            o.addChild(o.text_do);
            var e = new Image;
            e.src = o.pointerPath_str;
            o.pointer_do = new FWDUVPDisplayObject("img");
            o.pointer_do.setScreen(e);
            o.pointer_do.setWidth(o.pointerWidth);
            o.pointer_do.setHeight(o.pointerHeight);
            o.addChild(o.pointer_do)
        };
        this.setLabel = function(e, t) {
            if (o.id != t) {
                o.setVisible(false);
                o.text_do.getStyle().whiteSpace = "normal";
                o.setWidth(o.maxWidth);
                o.text_do.setInnerHTML(e)
            }
            setTimeout(function() {
                if (o == null) return;
                var e = o.text_do.screen.getBoundingClientRect().width;
                if (e < 8 && e != undefined) {
                    o.setHeight(Math.round(o.text_do.screen.getBoundingClientRect().height * 100));
                    e = Math.round(e * 100)
                } else {
                    o.setHeight(o.text_do.screen.offsetHeight);
                    e = Math.round(o.text_do.screen.offsetWidth)
                }
                if (e < o.w - 15) o.setWidth(e);
                if (e < o.maxWidth) {
                    o.text_do.getStyle().whiteSpace = "nowrap"
                }
                o.positionPointer();
                o.id = t
            }, 60)
        };
        this.positionPointer = function(e) {
            var t;
            var n;
            if (!e) e = 0;
            if (o.position_str == "bottom") {
                t = parseInt((o.w - o.pointerWidth) / 2) + e;
                n = o.h
            } else {
                t = o.w;
                n = parseInt((o.h - o.pointerHeight) / 2)
            }
            o.pointer_do.setX(t);
            o.pointer_do.setY(n)
        };
        this.show = function() {
            if (o.isShowed_bl) return;
            o.isShowed_bl = true;
            FWDUVPTweenMax.killTweensOf(o);
            clearTimeout(o.showWithDelayId_to);
            o.showWithDelayId_to = setTimeout(o.showFinal, 100)
        };
        this.showFinal = function() {
            o.setVisible(true);
            o.setAlpha(0);
            FWDUVPTweenMax.to(o, .4, {
                alpha: 1,
                onComplete: function() {
                    o.setVisible(true)
                },
                ease: Quart.easeOut
            })
        };
        this.hide = function() {
            if (!o.isShowed_bl) return;
            clearTimeout(o.showWithDelayId_to);
            FWDUVPTweenMax.killTweensOf(o);
            o.setVisible(false);
            o.isShowed_bl = false
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPDisplayObject("div", "fixed")
    };
    t.CLICK = "onClick";
    t.MOUSE_DOWN = "onMouseDown";
    t.prototype = null;
    e.FWDUVPPlaylistToolTip = t
})(window);
(function(e) {
    var t = function(e, n) {
        var r = this;
        var i = t.prototype;
        this.img_img = new Image;
        this.img_do = null;
        this.imgW = 0;
        this.imgH = 0;
        this.finalW = 0;
        this.finalH = 0;
        this.finalX = 0;
        this.finalY = 0;
        this.curPath_str;
        this.isTransparent_bl = false;
        this.showPoster_bl = n;
        this.showOrLoadOnMobile_bl = false;
        this.isShowed_bl = true;
        this.allowToShow_bl = true;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.init = function() {
            r.img_img = new Image;
            r.img_do = new FWDUVPDisplayObject("img");
            r.hide();
            r.screen.className = "RVPPosterBackgroundColor"
        };
        this.positionAndResize = function() {
            if (!e.vidStageWidth) return;
            r.setWidth(e.tempVidStageWidth);
            r.setHeight(e.tempVidStageHeight);
            if (!r.imgW) return;
            var t = e.tempVidStageWidth / r.imgW;
            var n = e.tempVidStageHeight / r.imgH;
            var i;
            if (t <= n) {
                i = t
            } else {
                i = n
            }
            r.finalW = Math.round(i * r.imgW);
            r.finalH = Math.round(i * r.imgH);
            r.finalX = parseInt((e.tempVidStageWidth - r.finalW) / 2);
            r.finalY = parseInt((e.tempVidStageHeight - r.finalH) / 2);
            r.img_do.setX(r.finalX);
            r.img_do.setY(r.finalY);
            r.img_do.setWidth(r.finalW);
            r.img_do.setHeight(r.finalH)
        };
        this.setPoster = function(e) {
            if (e && FWDUVPUtils.trim(e) == "" || e == "none") {
                r.showOrLoadOnMobile_bl = true;
                r.isTransparent_bl = true;
                r.show();
                return
            } else if (e == "youtubemobile") {
                r.isTransparent_bl = false;
                r.showOrLoadOnMobile_bl = false;
                r.img_img.src = null;
                r.imgW = 0;
                return
            } else if (e == r.curPath_str) {
                r.isTransparent_bl = false;
                r.showOrLoadOnMobile_bl = true
            }
            r.isTransparent_bl = false;
            r.showOrLoadOnMobile_bl = true;
            r.curPath_str = e;
            if (r.allowToShow_bl) r.isShowed_bl = false;
            if (!e) return;
            if (r.img_do) r.img_do.src = "";
            r.img_img.onload = r.posterLoadHandler;
            r.img_img.src = r.curPath_str
        };
        this.posterLoadHandler = function(e) {
            r.imgW = r.img_img.width;
            r.imgH = r.img_img.height;
            r.img_do.setScreen(r.img_img);
            r.addChild(r.img_do);
            r.show();
            r.positionAndResize()
        };
        this.show = function(e) {
            if (!r.allowToShow_bl || r.isShowed_bl || !r.showOrLoadOnMobile_bl) return;
            r.isShowed_bl = true;
            if (r.isTransparent_bl) {
                if (r.alpha != 0) r.setAlpha(0)
            } else {
                if (r.alpha != 1) r.setAlpha(1)
            }
            r.setVisible(true);
            if (!r.isMobile_bl && !r.isTransparent_bl) {
                FWDUVPTweenMax.killTweensOf(r);
                r.setAlpha(0);
                FWDUVPTweenMax.to(r, .6, {
                    alpha: 1,
                    delay: .4
                })
            }
            r.positionAndResize()
        };
        this.hide = function(e) {
            if (!r.isShowed_bl && !e) return;
            FWDUVPTweenMax.killTweensOf(r);
            r.isShowed_bl = false;
            r.setVisible(false)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.prototype = null;
    e.FWDUVPPoster = t
})(window);
(function(e) {
    var t = function(e, n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.imageSource_img = e;
        this.image_sdo = null;
        this.segmentWidth = n;
        this.segmentHeight = r;
        this.totalSegments = i;
        this.animDelay = s || 300;
        this.count = 0;
        this.delayTimerId_int;
        this.isShowed_bl = false;
        this.init = function() {
            o.setWidth(o.segmentWidth);
            o.setHeight(o.segmentHeight);
            o.image_sdo = new FWDUVPDisplayObject("img");
            o.image_sdo.setScreen(o.imageSource_img);
            o.addChild(o.image_sdo);
            o.hide(false)
        };
        this.start = function() {
            if (o == null) return;
            clearInterval(o.delayTimerId_int);
            o.delayTimerId_int = setInterval(o.updatePreloader, o.animDelay)
        };
        this.stop = function() {
            clearInterval(o.delayTimerId_int)
        };
        this.updatePreloader = function() {
            if (o == null) return;
            o.count++;
            if (o.count > o.totalSegments - 1) o.count = 0;
            var e = o.count * o.segmentWidth;
            o.image_sdo.setX(-e)
        };
        this.show = function() {
            if (o.isShowed_bl) return;
            o.setVisible(true);
            o.start();
            FWDUVPTweenMax.killTweensOf(o);
            FWDUVPTweenMax.to(o, 1, {
                alpha: 1,
                delay: .2
            });
            o.isShowed_bl = true
        };
        this.hide = function(e) {
            if (!o.isShowed_bl) return;
            FWDUVPTweenMax.killTweensOf(this);
            if (e) {
                FWDUVPTweenMax.to(this, 1, {
                    alpha: 0,
                    onComplete: o.onHideComplete
                })
            } else {
                o.setVisible(false);
                o.setAlpha(0)
            }
            o.isShowed_bl = false
        };
        this.onHideComplete = function() {
            o.setVisible(false);
            o.stop();
            o.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDUVPPreloader = t
})(window);
(function(e) {
    var t = function(e, n, r, i) {
        var s = this;
        var o = t.prototype;
        this.nImg = e;
        this.sPath_str = n;
        this.dPath_str = r;
        this.n_sdo;
        this.s_sdo;
        this.d_sdo;
        this.toolTipLabel_str;
        this.totalWidth = this.nImg.width;
        this.totalHeight = this.nImg.height;
        this.isShowed_bl = true;
        this.isSetToDisabledState_bl = false;
        this.isDisabled_bl = false;
        this.isDisabledForGood_bl = false;
        this.isSelectedFinal_bl = false;
        this.isActive_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.allowToCreateSecondButton_bl = !s.isMobile_bl || s.hasPointerEvent_bl || i;
        s.init = function() {
            s.setupMainContainers()
        };
        s.setupMainContainers = function() {
            s.n_sdo = new FWDUVPTransformDisplayObject("img");
            s.n_sdo.setScreen(s.nImg);
            s.addChild(s.n_sdo);
            if (s.allowToCreateSecondButton_bl) {
                var e = new Image;
                e.src = s.sPath_str;
                s.s_sdo = new FWDUVPDisplayObject("img");
                s.s_sdo.setScreen(e);
                s.s_sdo.setWidth(s.totalWidth);
                s.s_sdo.setHeight(s.totalHeight);
                s.s_sdo.setAlpha(0);
                s.addChild(s.s_sdo);
                if (s.dPath_str) {
                    var t = new Image;
                    t.src = s.dPath_str;
                    s.d_sdo = new FWDUVPDisplayObject("img");
                    s.d_sdo.setScreen(t);
                    s.d_sdo.setWidth(s.totalWidth);
                    s.d_sdo.setHeight(s.totalHeight);
                    s.d_sdo.setX(-100);
                    s.addChild(s.d_sdo)
                }
            }
            s.setWidth(s.totalWidth);
            s.setHeight(s.totalHeight);
            s.setButtonMode(true);
            s.screen.style.yellowOverlayPointerEvents = "none";
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.screen.addEventListener("MSPointerUp", s.onMouseUp);
                    s.screen.addEventListener("MSPointerOver", s.onMouseOver);
                    s.screen.addEventListener("MSPointerOut", s.onMouseOut)
                } else {
                    s.screen.addEventListener("touchend", s.onMouseUp)
                }
            } else if (s.screen.addEventListener) {
                s.screen.addEventListener("mouseover", s.onMouseOver);
                s.screen.addEventListener("mouseout", s.onMouseOut);
                s.screen.addEventListener("mouseup", s.onMouseUp)
            } else if (s.screen.attachEvent) {
                s.screen.attachEvent("onmouseover", s.onMouseOver);
                s.screen.attachEvent("onmouseout", s.onMouseOut);
                s.screen.attachEvent("onmouseup", s.onMouseUp)
            }
        };
        s.onMouseOver = function(e) {
            s.dispatchEvent(t.SHOW_TOOLTIP, {
                e: e
            });
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OVER, {
                    e: e
                });
                s.setSelectedState()
            }
        };
        s.onMouseOut = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OUT, {
                    e: e
                });
                s.setNormalState()
            }
        };
        s.onMouseUp = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (e.preventDefault) e.preventDefault();
            if (s.isDisabled_bl || e.button == 2) return;
            s.dispatchEvent(t.MOUSE_UP, {
                e: e
            })
        };
        s.setSelected = function() {
            s.isSelectedFinal_bl = true;
            if (!s.s_sdo) return;
            FWDUVPTweenMax.killTweensOf(s.s_sdo);
            FWDUVPTweenMax.to(s.s_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        s.setUnselected = function() {
            s.isSelectedFinal_bl = false;
            if (!s.s_sdo) return;
            FWDUVPTweenMax.to(s.s_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.setNormalState = function() {
            FWDUVPTweenMax.killTweensOf(s.s_sdo);
            FWDUVPTweenMax.to(s.s_sdo, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function() {
            FWDUVPTweenMax.killTweensOf(s.s_sdo);
            FWDUVPTweenMax.to(s.s_sdo, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.setDisabledState = function() {
            if (s.isSetToDisabledState_bl) return;
            s.isSetToDisabledState_bl = true;
            if (s.d_sdo) s.d_sdo.setX(0)
        };
        this.setEnabledState = function() {
            if (!s.isSetToDisabledState_bl) return;
            s.isSetToDisabledState_bl = false;
            if (s.d_sdo) s.d_sdo.setX(-100)
        };
        this.disable = function() {
            if (s.isDisabledForGood_bl || s.isDisabled_bl) return;
            s.isDisabled_bl = true;
            s.setButtonMode(false);
            FWDUVPTweenMax.to(s, .6, {
                alpha: .4
            });
            s.setNormalState()
        };
        this.enable = function() {
            if (s.isDisabledForGood_bl || !s.isDisabled_bl) return;
            s.isDisabled_bl = false;
            s.setButtonMode(true);
            FWDUVPTweenMax.to(s, .6, {
                alpha: 1
            })
        };
        this.disableForGood = function() {
            s.isDisabledForGood_bl = true;
            s.setButtonMode(false)
        };
        this.showDisabledState = function() {
            if (s.d_sdo.x != 0) s.d_sdo.setX(0)
        };
        this.hideDisabledState = function() {
            if (s.d_sdo.x != -100) s.d_sdo.setX(-100)
        };
        this.show = function() {
            if (s.isShowed_bl) return;
            s.isShowed_bl = true;
            FWDUVPTweenMax.killTweensOf(s);
            if (!FWDUVPUtils.isIEAndLessThen9) {
                if (FWDUVPUtils.isIEWebKit) {
                    FWDUVPTweenMax.killTweensOf(s.n_sdo);
                    s.n_sdo.setScale2(0);
                    FWDUVPTweenMax.to(s.n_sdo, .8, {
                        scale: 1,
                        delay: .4,
                        onStart: function() {
                            s.setVisible(true)
                        },
                        ease: Elastic.easeOut
                    })
                } else {
                    s.setScale2(0);
                    FWDUVPTweenMax.to(s, .8, {
                        scale: 1,
                        delay: .4,
                        onStart: function() {
                            s.setVisible(true)
                        },
                        ease: Elastic.easeOut
                    })
                }
            } else if (FWDUVPUtils.isIEAndLessThen9) {
                s.setVisible(true)
            } else {
                s.setAlpha(0);
                FWDUVPTweenMax.to(s, .4, {
                    alpha: 1,
                    delay: .4
                });
                s.setVisible(true)
            }
        };
        this.hide = function(e) {
            if (!s.isShowed_bl) return;
            s.isShowed_bl = false;
            FWDUVPTweenMax.killTweensOf(s);
            FWDUVPTweenMax.killTweensOf(s.n_sdo);
            s.setVisible(false)
        };
        s.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPTransformDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.SHOW_TOOLTIP = "showTooltip";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDUVPSimpleButton = t
})(window);
(function(e) {
    var t = function(e, n, r, i) {
        var s = this;
        var o = t.prototype;
        this.nImg_img = null;
        this.sImg_img = null;
        this.n_do;
        this.s_do;
        this.nImgPath_str = e;
        this.sImgPath_str = n;
        this.buttonWidth = r;
        this.buttonHeight = i;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.isDisabled_bl = false;
        this.init = function() {
            s.setupMainContainers();
            s.setWidth(s.buttonWidth);
            s.setHeight(s.buttonHeight);
            s.setButtonMode(true)
        };
        this.setupMainContainers = function() {
            s.n_do = new FWDUVPDisplayObject("img");
            s.nImg_img = new Image;
            s.nImg_img.src = s.nImgPath_str;
            s.nImg_img.width = s.buttonWidth;
            s.nImg_img.height = s.buttonHeight;
            s.n_do.setScreen(s.nImg_img);
            s.s_do = new FWDUVPDisplayObject("img");
            s.sImg_img = new Image;
            s.sImg_img.src = s.sImgPath_str;
            s.sImg_img.width = s.buttonWidth;
            s.sImg_img.height = s.buttonHeight;
            s.s_do.setScreen(s.sImg_img);
            s.s_do.setAlpha(0);
            s.addChild(s.n_do);
            s.addChild(s.s_do);
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.screen.addEventListener("MSPointerUp", s.onMouseUp);
                    s.screen.addEventListener("MSPointerOver", s.onMouseOver);
                    s.screen.addEventListener("MSPointerOut", s.onMouseOut)
                } else {
                    s.screen.addEventListener("touchend", s.onMouseUp)
                }
            } else if (s.screen.addEventListener) {
                s.screen.addEventListener("mouseover", s.onMouseOver);
                s.screen.addEventListener("mouseout", s.onMouseOut);
                s.screen.addEventListener("mouseup", s.onMouseUp)
            } else if (s.screen.attachEvent) {
                s.screen.attachEvent("onmouseover", s.onMouseOver);
                s.screen.attachEvent("onmouseout", s.onMouseOut);
                s.screen.attachEvent("onmouseup", s.onMouseUp)
            }
        };
        s.onMouseOver = function(e) {
            s.dispatchEvent(t.SHOW_TOOLTIP, {
                e: e
            });
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OVER, {
                    e: e
                });
                s.setSelectedState()
            }
        };
        s.onMouseOut = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (!e.pointerType || e.pointerType == "mouse") {
                if (s.isDisabled_bl || s.isSelectedFinal_bl) return;
                s.dispatchEvent(t.MOUSE_OUT, {
                    e: e
                });
                s.setNormalState()
            }
        };
        s.onMouseUp = function(e) {
            if (s.isDisabledForGood_bl) return;
            if (e.preventDefault) e.preventDefault();
            if (s.isDisabled_bl || e.button == 2) return;
            s.dispatchEvent(t.MOUSE_UP, {
                e: e
            })
        };
        this.setNormalState = function() {
            FWDUVPTweenMax.killTweensOf(s.s_do);
            FWDUVPTweenMax.to(s.s_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.setSelectedState = function() {
            FWDUVPTweenMax.killTweensOf(s.s_do);
            FWDUVPTweenMax.to(s.s_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        };
        this.destroy = function() {
            FWDUVPTweenMax.killTweensOf(s.n_do);
            s.n_do.destroy();
            this.s_do.destroy();
            s.screen.onmouseover = null;
            s.screen.onmouseout = null;
            s.screen.onclick = null;
            s.nImg_img = null;
            s.sImg_img = null;
            s = null;
            o = null;
            t.prototype = null
        };
        s.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.SHOW_TOOLTIP = "showTooltip";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDUVPSimpleSizeButton = t
})(window);
(function(e) {
    var t = function(n, r, i, s, o, u) {
        var a = this;
        var f = t.prototype;
        this.buttonRef_do = n;
        this.bkPath_str = r;
        this.pointerPath_str = i;
        this.text_do = null;
        this.pointer_do = null;
        this.fontColor_str = o;
        this.toolTipLabel_str = s;
        this.toolTipsButtonsHideDelay = u * 1e3;
        this.pointerWidth = 7;
        this.pointerHeight = 4;
        this.showWithDelayId_to;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.isShowed_bl = true;
        this.init = function() {
            a.setOverflow("visible");
            a.setupMainContainers();
            a.setLabel(a.toolTipLabel_str);
            a.hide();
            a.getStyle().background = "url('" + a.bkPath_str + "')";
            a.getStyle().zIndex = 9999999999999
        };
        this.setupMainContainers = function() {
            a.text_do = new FWDUVPDisplayObject("div");
            a.text_do.hasTransform3d_bl = false;
            a.text_do.hasTransform2d_bl = false;
            a.text_do.setBackfaceVisibility();
            a.text_do.setDisplay("inline");
            a.text_do.getStyle().fontFamily = "Arial";
            a.text_do.getStyle().fontSize = "12px";
            a.text_do.getStyle().color = a.fontColor_str;
            a.text_do.getStyle().whiteSpace = "nowrap";
            a.text_do.getStyle().fontSmoothing = "antialiased";
            a.text_do.getStyle().webkitFontSmoothing = "antialiased";
            a.text_do.getStyle().textRendering = "optimizeLegibility";
            a.text_do.getStyle().padding = "6px";
            a.text_do.getStyle().paddingTop = "4px";
            a.text_do.getStyle().paddingBottom = "4px";
            a.setLabel();
            a.addChild(a.text_do);
            var e = new Image;
            e.src = a.pointerPath_str;
            a.pointer_do = new FWDUVPDisplayObject("img");
            a.pointer_do.setScreen(e);
            a.pointer_do.setWidth(a.pointerWidth);
            a.pointer_do.setHeight(a.pointerHeight);
            a.addChild(a.pointer_do)
        };
        this.setLabel = function(e) {
            a.text_do.setInnerHTML(s);
            setTimeout(function() {
                if (a == null) return;
                a.setWidth(a.text_do.getWidth());
                a.setHeight(a.text_do.getHeight());
                a.positionPointer()
            }, 50)
        };
        this.positionPointer = function(e) {
            var t;
            var n;
            if (!e) e = 0;
            t = parseInt((a.w - a.pointerWidth) / 2) + e;
            n = a.h;
            a.pointer_do.setX(t);
            a.pointer_do.setY(n)
        };
        this.show = function() {
            if (a.isShowed_bl) return;
            a.isShowed_bl = true;
            FWDUVPTweenMax.killTweensOf(a);
            clearTimeout(a.showWithDelayId_to);
            a.showWithDelayId_to = setTimeout(a.showFinal, a.toolTipsButtonsHideDelay);
            if (e.addEventListener) {
                e.addEventListener("mousemove", a.moveHandler)
            } else if (document.attachEvent) {
                document.detachEvent("onmousemove", a.moveHandler);
                document.attachEvent("onmousemove", a.moveHandler)
            }
        };
        this.showFinal = function() {
            a.setVisible(true);
            a.setAlpha(0);
            FWDUVPTweenMax.to(a, .4, {
                alpha: 1,
                onComplete: function() {
                    a.setVisible(true)
                },
                ease: Quart.easeOut
            })
        };
        this.moveHandler = function(e) {
            var t = FWDUVPUtils.getViewportMouseCoordinates(e);
            if (!FWDUVPUtils.hitTest(a.buttonRef_do.screen, t.screenX, t.screenY)) a.hide()
        };
        this.hide = function() {
            if (!a.isShowed_bl) return;
            clearTimeout(a.showWithDelayId_to);
            if (e.removeEventListener) {
                e.removeEventListener("mousemove", a.moveHandler)
            } else if (document.detachEvent) {
                document.detachEvent("onmousemove", a.moveHandler)
            }
            FWDUVPTweenMax.killTweensOf(a);
            a.setVisible(false);
            a.isShowed_bl = false
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPDisplayObject("div", "fixed")
    };
    t.CLICK = "onClick";
    t.MOUSE_DOWN = "onMouseDown";
    t.prototype = null;
    e.FWDUVPToolTip = t
})(window);
(function(e) {
    var t = function(e, t, n, r) {
        this.listeners = {
            events_ar: []
        };
        var i = this;
        if (e == "div" || e == "img" || e == "canvas") {
            this.type = e
        } else {
            throw Error("Type is not valid! " + e)
        }
        this.children_ar = [];
        this.style;
        this.screen;
        this.numChildren;
        this.transform;
        this.position = t || "absolute";
        this.overflow = n || "hidden";
        this.display = r || "block";
        this.visible = true;
        this.buttonMode;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.rotation = 0;
        this.w = 0;
        this.h = 0;
        this.rect;
        this.alpha = 1;
        this.innerHTML = "";
        this.opacityType = "";
        this.isHtml5_bl = false;
        this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d;
        this.init = function() {
            this.setScreen()
        };
        this.getTransform = function() {
            var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"];
            var t;
            while (t = e.shift()) {
                if (typeof this.screen.style[t] !== "undefined") {
                    return t
                }
            }
            return false
        };
        this.getOpacityType = function() {
            var e;
            if (typeof this.screen.style.opacity != "undefined") {
                e = "opacity"
            } else {
                e = "filter"
            }
            return e
        };
        this.setScreen = function(e) {
            if (this.type == "img" && e) {
                this.screen = e;
                this.setMainProperties()
            } else {
                this.screen = document.createElement(this.type);
                this.setMainProperties()
            }
        };
        this.setMainProperties = function() {
            this.transform = this.getTransform();
            this.setPosition(this.position);
            this.setOverflow(this.overflow);
            this.opacityType = this.getOpacityType();
            if (this.opacityType == "opacity") this.isHtml5_bl = true;
            if (i.opacityType == "filter") i.screen.style.filter = "inherit";
            this.screen.style.left = "0px";
            this.screen.style.top = "0px";
            this.screen.style.margin = "0px";
            this.screen.style.padding = "0px";
            this.screen.style.maxWidth = "none";
            this.screen.style.maxHeight = "none";
            this.screen.style.border = "none";
            this.screen.style.lineHeight = "1";
            this.screen.style.backgroundColor = "transparent";
            this.screen.style.backfaceVisibility = "hidden";
            this.screen.style.webkitBackfaceVisibility = "hidden";
            this.screen.style.MozBackfaceVisibility = "hidden";
            this.screen.style.MozImageRendering = "optimizeSpeed";
            this.screen.style.WebkitImageRendering = "optimizeSpeed";
            if (e == "img") {
                this.setWidth(this.screen.width);
                this.setHeight(this.screen.height);
                this.screen.onmousedown = function(e) {
                    return false
                }
            }
        };
        i.setBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "visible";
            i.screen.style.webkitBackfaceVisibility = "visible";
            i.screen.style.MozBackfaceVisibility = "visible"
        };
        i.removeBackfaceVisibility = function() {
            i.screen.style.backfaceVisibility = "hidden";
            i.screen.style.webkitBackfaceVisibility = "hidden";
            i.screen.style.MozBackfaceVisibility = "hidden"
        };
        this.setSelectable = function(e) {
            if (!e) {
                try {
                    this.screen.style.userSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.MozUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.webkitUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.khtmlUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.oUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.msUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.msUserSelect = "none"
                } catch (t) {}
                this.screen.ondragstart = function(e) {
                    return false
                };
                this.screen.onselectstart = function() {
                    return false
                };
                this.screen.style.webkitTouchCallout = "none"
            }
        };
        this.getScreen = function() {
            return i.screen
        };
        this.setVisible = function(e) {
            this.visible = e;
            if (this.visible == true) {
                this.screen.style.visibility = "visible"
            } else {
                this.screen.style.visibility = "hidden"
            }
        };
        this.getVisible = function() {
            return this.visible
        };
        this.setResizableSizeAfterParent = function() {
            this.screen.style.width = "100%";
            this.screen.style.height = "100%"
        };
        this.getStyle = function() {
            return this.screen.style
        };
        this.setOverflow = function(e) {
            i.overflow = e;
            i.screen.style.overflow = i.overflow
        };
        this.setPosition = function(e) {
            i.position = e;
            i.screen.style.position = i.position
        };
        this.setDisplay = function(e) {
            this.display = e;
            this.screen.style.display = this.display
        };
        this.setButtonMode = function(e) {
            this.buttonMode = e;
            if (this.buttonMode == true) {
                this.screen.style.cursor = "pointer"
            } else {
                this.screen.style.cursor = "default"
            }
        };
        this.setBkColor = function(e) {
            i.screen.style.backgroundColor = e
        };
        this.setInnerHTML = function(e) {
            i.innerHTML = e;
            i.screen.innerHTML = i.innerHTML
        };
        this.getInnerHTML = function() {
            return i.innerHTML
        };
        this.getRect = function() {
            return i.screen.getBoundingClientRect()
        };
        this.setAlpha = function(e) {
            i.alpha = e;
            if (i.opacityType == "opacity") {
                i.screen.style.opacity = i.alpha
            } else if (i.opacityType == "filter") {
                i.screen.style.filter = "alpha(opacity=" + i.alpha * 100 + ")";
                i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(i.alpha * 100) + ")"
            }
        };
        this.getAlpha = function() {
            return i.alpha
        };
        this.getRect = function() {
            return this.screen.getBoundingClientRect()
        };
        this.getGlobalX = function() {
            return this.getRect().left
        };
        this.getGlobalY = function() {
            return this.getRect().top
        };
        this.setX = function(e) {
            i.x = e;
            if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)"
            } else {
                i.screen.style.left = i.x + "px"
            }
        };
        this.getX = function() {
            return i.x
        };
        this.setY = function(e) {
            i.y = e;
            if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)"
            } else {
                i.screen.style.top = i.y + "px"
            }
        };
        this.getY = function() {
            return i.y
        };
        this.setScale2 = function(e) {
            i.scale = e;
            if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)"
            }
        };
        this.getScale = function() {
            return i.scale
        };
        this.setRotation = function(e) {
            i.rotation = e;
            if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + " , " + i.scale + ") rotate(" + i.rotation + "deg)"
            }
        };
        i.setWidth = function(e) {
            i.w = e;
            if (i.type == "img") {
                i.screen.width = i.w;
                i.screen.style.width = i.w + "px"
            } else {
                i.screen.style.width = i.w + "px"
            }
        };
        this.getWidth = function() {
            if (i.type == "div") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            } else if (i.type == "img") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                if (i.screen.width != 0) return i.screen.width;
                return i._w
            } else if (i.type == "canvas") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            }
        };
        i.setHeight = function(e) {
            i.h = e;
            if (i.type == "img") {
                i.screen.height = i.h;
                i.screen.style.height = i.h + "px"
            } else {
                i.screen.style.height = i.h + "px"
            }
        };
        this.getHeight = function() {
            if (i.type == "div") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            } else if (i.type == "img") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                if (i.screen.height != 0) return i.screen.height;
                return i.h
            } else if (i.type == "canvas") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            }
        };
        this.getNumChildren = function() {
            return i.children_ar.length
        };
        this.addChild = function(e) {
            if (this.contains(e)) {
                this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1);
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            } else {
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            }
        };
        this.removeChild = function(e) {
            if (this.contains(e)) {
                this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1);
                this.screen.removeChild(e.screen)
            } else {
                throw Error("##removeChild()## Child doesn't exist, it can't be removed!")
            }
        };
        this.contains = function(e) {
            if (FWDUVPUtils.indexOfArray(this.children_ar, e) == -1) {
                return false
            } else {
                return true
            }
        };
        this.addChildAtZero = function(e) {
            if (this.numChildren == 0) {
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            } else {
                this.screen.insertBefore(e.screen, this.children_ar[0].screen);
                if (this.contains(e)) {
                    this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1)
                }
                this.children_ar.unshift(e)
            }
        };
        this.getChildAt = function(e) {
            if (e < 0 || e > this.numChildren - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
            return this.children_ar[e]
        };
        this.removeChildAtZero = function() {
            this.screen.removeChild(this.children_ar[0].screen);
            this.children_ar.shift()
        };
        this.addListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n]);
                    break
                }
            }
        };
        this.removeListener = function(e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        this.disposeImage = function() {
            if (this.type == "img") this.screen.src = null
        };
        this.destroy = function() {
            try {
                this.screen.parentNode.removeChild(this.screen)
            } catch (e) {}
            this.screen.onselectstart = null;
            this.screen.ondragstart = null;
            this.screen.ontouchstart = null;
            this.screen.ontouchmove = null;
            this.screen.ontouchend = null;
            this.screen.onmouseover = null;
            this.screen.onmouseout = null;
            this.screen.onmouseup = null;
            this.screen.onmousedown = null;
            this.screen.onmousemove = null;
            this.screen.onclick = null;
            delete this.screen;
            delete this.style;
            delete this.rect;
            delete this.selectable;
            delete this.buttonMode;
            delete this.position;
            delete this.overflow;
            delete this.visible;
            delete this.innerHTML;
            delete this.numChildren;
            delete this.x;
            delete this.y;
            delete this.w;
            delete this.h;
            delete this.opacityType;
            delete this.isHtml5_bl;
            delete this.hasTransform2d_bl;
            this.children_ar = null;
            this.style = null;
            this.screen = null;
            this.numChildren = null;
            this.transform = null;
            this.position = null;
            this.overflow = null;
            this.display = null;
            this.visible = null;
            this.buttonMode = null;
            this.globalX = null;
            this.globalY = null;
            this.x = null;
            this.y = null;
            this.w = null;
            this.h = null;
            this.rect = null;
            this.alpha = null;
            this.innerHTML = null;
            this.opacityType = null;
            this.isHtml5_bl = null;
            this.hasTransform3d_bl = null;
            this.hasTransform2d_bl = null;
            i = null
        };
        this.init()
    };
    e.FWDUVPTransformDisplayObject = t
})(window);
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("FWDUVPTweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = [].slice,
            i = function(e, t, r) {
                n.call(this, e, t, r);
                this._cycle = 0;
                this._yoyo = this.vars.yoyo === true;
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._dirty = true
            },
            s = function(e) {
                return e.jquery || e.length && e[0] && e[0].nodeType && e[0].style
            },
            o = i.prototype = n.to({}, .1, {}),
            u = [];
        i.version = "1.9.7";
        o.constructor = i;
        o.kill()._gc = false;
        i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf;
        i.getTweensOf = n.getTweensOf;
        i.ticker = n.ticker;
        o.invalidate = function() {
            this._yoyo = this.vars.yoyo === true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return n.prototype.invalidate.call(this)
        };
        o.updateTo = function(e, t) {
            var r = this.ratio,
                i;
            if (t && this.timeline && this._startTime < this._timeline._time) {
                this._startTime = this._timeline._time;
                this._uncache(false);
                if (this._gc) {
                    this._enabled(true, false)
                } else {
                    this._timeline.insert(this, this._startTime - this._delay)
                }
            }
            for (i in e) {
                this.vars[i] = e[i]
            }
            if (this._initted) {
                if (t) {
                    this._initted = false
                } else {
                    if (this._notifyPluginsOfEnabled && this._firstPT) {
                        n._onPluginEvent("_onDisable", this)
                    }
                    if (this._time / this._duration > .998) {
                        var s = this._time;
                        this.render(0, true, false);
                        this._initted = false;
                        this.render(s, true, false)
                    } else if (this._time > 0) {
                        this._initted = false;
                        this._init();
                        var o = 1 / (1 - r),
                            u = this._firstPT,
                            a;
                        while (u) {
                            a = u.s + u.c;
                            u.c *= o;
                            u.s = a - u.c;
                            u = u._next
                        }
                    }
                }
            }
            return this
        };
        o.render = function(e, t, n) {
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                s = this._totalTime,
                o = this._cycle,
                a, f, l, c, h, p, d;
            if (e >= r) {
                this._totalTime = r;
                this._cycle = this._repeat;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0
                } else {
                    this._time = this._duration;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1
                }
                if (!this._reversed) {
                    a = true;
                    f = "onComplete"
                }
                if (this._duration === 0) {
                    if (e === 0 || this._rawPrevTime < 0)
                        if (this._rawPrevTime !== e) {
                            n = true;
                            if (this._rawPrevTime > 0) {
                                f = "onReverseComplete";
                                if (t) {
                                    e = -1
                                }
                            }
                        }
                    this._rawPrevTime = e
                }
            } else if (e < 1e-7) {
                this._totalTime = this._time = this._cycle = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (s !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    f = "onReverseComplete";
                    a = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0) {
                        if (this._rawPrevTime >= 0) {
                            n = true
                        }
                        this._rawPrevTime = e
                    }
                } else if (!this._initted) {
                    n = true
                }
            } else {
                this._totalTime = this._time = e;
                if (this._repeat !== 0) {
                    c = this._duration + this._repeatDelay;
                    this._cycle = this._totalTime / c >> 0;
                    if (this._cycle !== 0)
                        if (this._cycle === this._totalTime / c) {
                            this._cycle--
                        }
                    this._time = this._totalTime - this._cycle * c;
                    if (this._yoyo)
                        if ((this._cycle & 1) !== 0) {
                            this._time = this._duration - this._time
                        }
                    if (this._time > this._duration) {
                        this._time = this._duration
                    } else if (this._time < 0) {
                        this._time = 0
                    }
                }
                if (this._easeType) {
                    h = this._time / this._duration;
                    p = this._easeType;
                    d = this._easePower;
                    if (p === 1 || p === 3 && h >= .5) {
                        h = 1 - h
                    }
                    if (p === 3) {
                        h *= 2
                    }
                    if (d === 1) {
                        h *= h
                    } else if (d === 2) {
                        h *= h * h
                    } else if (d === 3) {
                        h *= h * h * h
                    } else if (d === 4) {
                        h *= h * h * h * h
                    }
                    if (p === 1) {
                        this.ratio = 1 - h
                    } else if (p === 2) {
                        this.ratio = h
                    } else if (this._time / this._duration < .5) {
                        this.ratio = h / 2
                    } else {
                        this.ratio = 1 - h / 2
                    }
                } else {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                }
            }
            if (i === this._time && !n) {
                if (s !== this._totalTime)
                    if (this._onUpdate)
                        if (!t) {
                            this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)
                        }
                return
            } else if (!this._initted) {
                this._init();
                if (!this._initted) {
                    return
                }
                if (this._time && !a) {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                } else if (a && this._ease._calcEnd) {
                    this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1)
                }
            }
            if (!this._active)
                if (!this._paused) {
                    this._active = true
                }
            if (s === 0) {
                if (this._startAt) {
                    if (e >= 0) {
                        this._startAt.render(e, t, n)
                    } else if (!f) {
                        f = "_dummyGS"
                    }
                }
                if (this.vars.onStart)
                    if (this._totalTime !== 0 || this._duration === 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u)
                        }
            }
            l = this._firstPT;
            while (l) {
                if (l.f) {
                    l.t[l.p](l.c * this.ratio + l.s)
                } else {
                    var v = l.c * this.ratio + l.s;
                    if (l.p == "x") {
                        l.t.setX(v)
                    } else if (l.p == "y") {
                        l.t.setY(v)
                    } else if (l.p == "z") {
                        l.t.setZ(v)
                    } else if (l.p == "w") {
                        l.t.setWidth(v)
                    } else if (l.p == "h") {
                        l.t.setHeight(v)
                    } else if (l.p == "alpha") {
                        l.t.setAlpha(v)
                    } else if (l.p == "scale") {
                        l.t.setScale2(v)
                    } else {
                        l.t[l.p] = v
                    }
                }
                l = l._next
            }
            if (this._onUpdate) {
                if (e < 0)
                    if (this._startAt) {
                        this._startAt.render(e, t, n)
                    }
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)
                }
            }
            if (this._cycle !== o)
                if (!t)
                    if (!this._gc)
                        if (this.vars.onRepeat) {
                            this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || u)
                        }
            if (f)
                if (!this._gc) {
                    if (e < 0 && this._startAt && !this._onUpdate) {
                        this._startAt.render(e, t, n)
                    }
                    if (a) {
                        if (this._timeline.autoRemoveChildren) {
                            this._enabled(false, false)
                        }
                        this._active = false
                    }
                    if (!t && this.vars[f]) {
                        this.vars[f].apply(this.vars[f + "Scope"] || this, this.vars[f + "Params"] || u)
                    }
                }
        };
        i.to = function(e, t, n) {
            return new i(e, t, n)
        };
        i.from = function(e, t, n) {
            n.runBackwards = true;
            n.immediateRender = n.immediateRender != false;
            return new i(e, t, n)
        };
        i.fromTo = function(e, t, n, r) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return new i(e, t, r)
        };
        i.staggerTo = i.allTo = function(e, t, o, a, f, l, c) {
            a = a || 0;
            var h = o.delay || 0,
                p = [],
                d = function() {
                    if (o.onComplete) {
                        o.onComplete.apply(o.onCompleteScope || this, o.onCompleteParams || u)
                    }
                    f.apply(c || this, l || u)
                },
                v, m, g, y;
            if (!(e instanceof Array)) {
                if (typeof e === "string") {
                    e = n.selector(e) || e
                }
                if (s(e)) {
                    e = r.call(e, 0)
                }
            }
            v = e.length;
            for (g = 0; g < v; g++) {
                m = {};
                for (y in o) {
                    m[y] = o[y]
                }
                m.delay = h;
                if (g === v - 1 && f) {
                    m.onComplete = d
                }
                p[g] = new i(e[g], t, m);
                h += a
            }
            return p
        };
        i.staggerFrom = i.allFrom = function(e, t, n, r, s, o, u) {
            n.runBackwards = true;
            n.immediateRender = n.immediateRender != false;
            return i.staggerTo(e, t, n, r, s, o, u)
        };
        i.staggerFromTo = i.allFromTo = function(e, t, n, r, s, o, u, a) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return i.staggerTo(e, t, r, s, o, u, a)
        };
        i.delayedCall = function(e, t, n, r, s) {
            return new i(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                onCompleteScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                onReverseCompleteScope: r,
                immediateRender: false,
                useFrames: s,
                overwrite: 0
            })
        };
        i.set = function(e, t) {
            return new i(e, 0, t)
        };
        i.isTweening = function(e) {
            var t = n.getTweensOf(e),
                r = t.length,
                i;
            while (--r > -1) {
                i = t[r];
                if (i._active || i._startTime === i._timeline._time && i._timeline._active) {
                    return true
                }
            }
            return false
        };
        var a = function(e, t) {
                var r = [],
                    i = 0,
                    s = e._first;
                while (s) {
                    if (s instanceof n) {
                        r[i++] = s
                    } else {
                        if (t) {
                            r[i++] = s
                        }
                        r = r.concat(a(s, t));
                        i = r.length
                    }
                    s = s._next
                }
                return r
            },
            f = i.getAllTweens = function(t) {
                return a(e._rootTimeline, t).concat(a(e._rootFramesTimeline, t))
            };
        i.killAll = function(e, n, r, i) {
            if (n == null) {
                n = true
            }
            if (r == null) {
                r = true
            }
            var s = f(i != false),
                o = s.length,
                u = n && r && i,
                a, l, c;
            for (c = 0; c < o; c++) {
                l = s[c];
                if (u || l instanceof t || (a = l.target === l.vars.onComplete) && r || n && !a) {
                    if (e) {
                        l.totalTime(l.totalDuration())
                    } else {
                        l._enabled(false, false)
                    }
                }
            }
        };
        i.killChildTweensOf = function(e, t) {
            if (e == null) {
                return
            }
            var o = n._tweenLookup,
                u, a, f, l, c;
            if (typeof e === "string") {
                e = n.selector(e) || e
            }
            if (s(e)) {
                e = r(e, 0)
            }
            if (e instanceof Array) {
                l = e.length;
                while (--l > -1) {
                    i.killChildTweensOf(e[l], t)
                }
                return
            }
            u = [];
            for (f in o) {
                a = o[f].target.parentNode;
                while (a) {
                    if (a === e) {
                        u = u.concat(o[f].tweens)
                    }
                    a = a.parentNode
                }
            }
            c = u.length;
            for (l = 0; l < c; l++) {
                if (t) {
                    u[l].totalTime(u[l].totalDuration())
                }
                u[l]._enabled(false, false)
            }
        };
        var l = function(e, n, r, i) {
            if (n === undefined) {
                n = true
            }
            if (r === undefined) {
                r = true
            }
            var s = f(i),
                o = n && r && i,
                u = s.length,
                a, l;
            while (--u > -1) {
                l = s[u];
                if (o || l instanceof t || (a = l.target === l.vars.onComplete) && r || n && !a) {
                    l.paused(e)
                }
            }
        };
        i.pauseAll = function(e, t, n) {
            l(true, e, t, n)
        };
        i.resumeAll = function(e, t, n) {
            l(false, e, t, n)
        };
        o.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), false)
        };
        o.totalProgress = function(e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        o.time = function(e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat !== 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        o.duration = function(t) {
            if (!arguments.length) {
                return this._duration
            }
            return e.prototype.duration.call(this, t)
        };
        o.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
                    this._dirty = false
                }
                return this._totalDuration
            }
            return this._repeat === -1 ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        o.repeat = function(e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        o.repeatDelay = function(e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        o.yoyo = function(e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        return i
    }, true);
    window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = function(e) {
                t.call(this, e);
                this._labels = {};
                this.autoRemoveChildren = this.vars.autoRemoveChildren === true;
                this.smoothChildTiming = this.vars.smoothChildTiming === true;
                this._sortChildren = true;
                this._onUpdate = this.vars.onUpdate;
                var n = this.vars,
                    r = i.length,
                    s, o;
                while (--r > -1) {
                    o = n[i[r]];
                    if (o) {
                        s = o.length;
                        while (--s > -1) {
                            if (o[s] === "{self}") {
                                o = n[i[r]] = o.concat();
                                o[s] = this
                            }
                        }
                    }
                }
                if (n.tweens instanceof Array) {
                    this.add(n.tweens, 0, n.align, n.stagger)
                }
            },
            i = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
            s = [],
            o = function(e) {
                var t = {},
                    n;
                for (n in e) {
                    t[n] = e[n]
                }
                return t
            },
            u = s.slice,
            a = r.prototype = new t;
        r.version = "1.9.7";
        a.constructor = r;
        a.kill()._gc = false;
        a.to = function(e, t, r, i) {
            return t ? this.add(new n(e, t, r), i) : this.set(e, r, i)
        };
        a.from = function(e, t, r, i) {
            return this.add(n.from(e, t, r), i)
        };
        a.fromTo = function(e, t, r, i, s) {
            return t ? this.add(n.fromTo(e, t, r, i), s) : this.set(e, i, s)
        };
        a.staggerTo = function(e, t, i, s, a, f, l, c) {
            var h = new r({
                    onComplete: f,
                    onCompleteParams: l,
                    onCompleteScope: c
                }),
                p;
            if (typeof e === "string") {
                e = n.selector(e) || e
            }
            if (!(e instanceof Array) && e.length && e[0] && e[0].nodeType && e[0].style) {
                e = u.call(e, 0)
            }
            s = s || 0;
            for (p = 0; p < e.length; p++) {
                if (i.startAt) {
                    i.startAt = o(i.startAt)
                }
                h.to(e[p], t, o(i), p * s)
            }
            return this.add(h, a)
        };
        a.staggerFrom = function(e, t, n, r, i, s, o, u) {
            n.immediateRender = n.immediateRender != false;
            n.runBackwards = true;
            return this.staggerTo(e, t, n, r, i, s, o, u)
        };
        a.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
            r.startAt = n;
            r.immediateRender = r.immediateRender != false && n.immediateRender != false;
            return this.staggerTo(e, t, r, i, s, o, u, a)
        };
        a.call = function(e, t, r, i) {
            return this.add(n.delayedCall(0, e, t, r), i)
        };
        a.set = function(e, t, r) {
            r = this._parseTimeOrLabel(r, 0, true);
            if (t.immediateRender == null) {
                t.immediateRender = r === this._time && !this._paused
            }
            return this.add(new n(e, 0, t), r)
        };
        r.exportRoot = function(e, t) {
            e = e || {};
            if (e.smoothChildTiming == null) {
                e.smoothChildTiming = true
            }
            var i = new r(e),
                s = i._timeline,
                o, u;
            if (t == null) {
                t = true
            }
            s._remove(i, true);
            i._startTime = 0;
            i._rawPrevTime = i._time = i._totalTime = s._time;
            o = s._first;
            while (o) {
                u = o._next;
                if (!t || !(o instanceof n && o.target === o.vars.onComplete)) {
                    i.add(o, o._startTime - o._delay)
                }
                o = u
            }
            s.add(i, 0);
            return i
        };
        a.add = function(i, s, o, u) {
            var a, f, l, c, h;
            if (typeof s !== "number") {
                s = this._parseTimeOrLabel(s, 0, true, i)
            }
            if (!(i instanceof e)) {
                if (i instanceof Array) {
                    o = o || "normal";
                    u = u || 0;
                    a = s;
                    f = i.length;
                    for (l = 0; l < f; l++) {
                        if ((c = i[l]) instanceof Array) {
                            c = new r({
                                tweens: c
                            })
                        }
                        this.add(c, a);
                        if (typeof c !== "string" && typeof c !== "function") {
                            if (o === "sequence") {
                                a = c._startTime + c.totalDuration() / c._timeScale
                            } else if (o === "start") {
                                c._startTime -= c.delay()
                            }
                        }
                        a += u
                    }
                    return this._uncache(true)
                } else if (typeof i === "string") {
                    return this.addLabel(i, s)
                } else if (typeof i === "function") {
                    i = n.delayedCall(0, i)
                } else {
                    throw "Cannot add " + i + " into the timeline; it is neither a tween, timeline, function, nor a string."
                }
            }
            t.prototype.add.call(this, i, s);
            if (this._gc)
                if (!this._paused)
                    if (this._time === this._duration)
                        if (this._time < this.duration()) {
                            h = this;
                            while (h._gc && h._timeline) {
                                if (h._timeline.smoothChildTiming) {
                                    h.totalTime(h._totalTime, true)
                                } else {
                                    h._enabled(true, false)
                                }
                                h = h._timeline
                            }
                        }
            return this
        };
        a.remove = function(t) {
            if (t instanceof e) {
                return this._remove(t, false)
            } else if (t instanceof Array) {
                var n = t.length;
                while (--n > -1) {
                    this.remove(t[n])
                }
                return this
            } else if (typeof t === "string") {
                return this.removeLabel(t)
            }
            return this.kill(null, t)
        };
        a.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, true, e))
        };
        a.insert = a.insertMultiple = function(e, t, n, r) {
            return this.add(e, t || 0, n, r)
        };
        a.appendMultiple = function(e, t, n, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, true, e), n, r)
        };
        a.addLabel = function(e, t) {
            this._labels[e] = this._parseTimeOrLabel(t);
            return this
        };
        a.removeLabel = function(e) {
            delete this._labels[e];
            return this
        };
        a.getLabelTime = function(e) {
            return this._labels[e] != null ? this._labels[e] : -1
        };
        a._parseTimeOrLabel = function(t, n, r, i) {
            var s;
            if (i instanceof e && i.timeline === this) {
                this.remove(i)
            } else if (i instanceof Array) {
                s = i.length;
                while (--s > -1) {
                    if (i[s] instanceof e && i[s].timeline === this) {
                        this.remove(i[s])
                    }
                }
            }
            if (typeof n === "string") {
                return this._parseTimeOrLabel(n, r && typeof t === "number" && this._labels[n] == null ? t - this.duration() : 0, r)
            }
            n = n || 0;
            if (typeof t === "string" && (isNaN(t) || this._labels[t] != null)) {
                s = t.indexOf("=");
                if (s === -1) {
                    if (this._labels[t] == null) {
                        return r ? this._labels[t] = this.duration() + n : n
                    }
                    return this._labels[t] + n
                }
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1));
                t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
            } else if (t == null) {
                t = this.duration()
            }
            return Number(t) + n
        };
        a.seek = function(e, t) {
            return this.totalTime(typeof e === "number" ? e : this._parseTimeOrLabel(e), t !== false)
        };
        a.stop = function() {
            return this.paused(true)
        };
        a.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        };
        a.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        };
        a.render = function(e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                o = this._startTime,
                u = this._timeScale,
                a = this._paused,
                f, l, c, h, p;
            if (e >= r) {
                this._totalTime = this._time = r;
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        l = true;
                        h = "onComplete";
                        if (this._duration === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e && this._first) {
                                    p = true;
                                    if (this._rawPrevTime > 0) {
                                        h = "onReverseComplete"
                                    }
                                }
                    }
                this._rawPrevTime = e;
                e = r + 1e-6
            } else if (e < 1e-7) {
                this._totalTime = this._time = 0;
                if (i !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    h = "onReverseComplete";
                    l = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0 && this._first) {
                            p = true
                        }
                } else if (!this._initted) {
                    p = true
                }
                this._rawPrevTime = e;
                e = 0
            } else {
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if ((this._time === i || !this._first) && !n && !p) {
                return
            } else if (!this._initted) {
                this._initted = true
            }
            if (i === 0)
                if (this.vars.onStart)
                    if (this._time !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)
                        }
            if (this._time >= i) {
                f = this._first;
                while (f) {
                    c = f._next;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= this._time && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, n)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, n)
                        }
                    }
                    f = c
                }
            } else {
                f = this._last;
                while (f) {
                    c = f._prev;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= i && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, n)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, n)
                        }
                    }
                    f = c
                }
            }
            if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)
                }
            if (h)
                if (!this._gc)
                    if (o === this._startTime || u !== this._timeScale)
                        if (this._time === 0 || r >= this.totalDuration()) {
                            if (l) {
                                if (this._timeline.autoRemoveChildren) {
                                    this._enabled(false, false)
                                }
                                this._active = false
                            }
                            if (!t && this.vars[h]) {
                                this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || s)
                            }
                        }
        };
        a._hasPausedChild = function() {
            var e = this._first;
            while (e) {
                if (e._paused || e instanceof r && e._hasPausedChild()) {
                    return true
                }
                e = e._next
            }
            return false
        };
        a.getChildren = function(e, t, r, i) {
            i = i || -9999999999;
            var s = [],
                o = this._first,
                u = 0;
            while (o) {
                if (o._startTime < i) {} else if (o instanceof n) {
                    if (t !== false) {
                        s[u++] = o
                    }
                } else {
                    if (r !== false) {
                        s[u++] = o
                    }
                    if (e !== false) {
                        s = s.concat(o.getChildren(true, t, r));
                        u = s.length
                    }
                }
                o = o._next
            }
            return s
        };
        a.getTweensOf = function(e, t) {
            var r = n.getTweensOf(e),
                i = r.length,
                s = [],
                o = 0;
            while (--i > -1) {
                if (r[i].timeline === this || t && this._contains(r[i])) {
                    s[o++] = r[i]
                }
            }
            return s
        };
        a._contains = function(e) {
            var t = e.timeline;
            while (t) {
                if (t === this) {
                    return true
                }
                t = t.timeline
            }
            return false
        };
        a.shiftChildren = function(e, t, n) {
            n = n || 0;
            var r = this._first,
                i = this._labels,
                s;
            while (r) {
                if (r._startTime >= n) {
                    r._startTime += e
                }
                r = r._next
            }
            if (t) {
                for (s in i) {
                    if (i[s] >= n) {
                        i[s] += e
                    }
                }
            }
            return this._uncache(true)
        };
        a._kill = function(e, t) {
            if (!e && !t) {
                return this._enabled(false, false)
            }
            var n = !t ? this.getChildren(true, true, false) : this.getTweensOf(t),
                r = n.length,
                i = false;
            while (--r > -1) {
                if (n[r]._kill(e, t)) {
                    i = true
                }
            }
            return i
        };
        a.clear = function(e) {
            var t = this.getChildren(false, true, true),
                n = t.length;
            this._time = this._totalTime = 0;
            while (--n > -1) {
                t[n]._enabled(false, false)
            }
            if (e !== false) {
                this._labels = {}
            }
            return this._uncache(true)
        };
        a.invalidate = function() {
            var e = this._first;
            while (e) {
                e.invalidate();
                e = e._next
            }
            return this
        };
        a._enabled = function(e, n) {
            if (e === this._gc) {
                var r = this._first;
                while (r) {
                    r._enabled(e, true);
                    r = r._next
                }
            }
            return t.prototype._enabled.call(this, e, n)
        };
        a.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * e, false)
        };
        a.duration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this.totalDuration()
                }
                return this._duration
            }
            if (this.duration() !== 0 && e !== 0) {
                this.timeScale(this._duration / e)
            }
            return this
        };
        a.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    var t = 0,
                        n = this._last,
                        r = 999999999999,
                        i, s;
                    while (n) {
                        i = n._prev;
                        if (n._dirty) {
                            n.totalDuration()
                        }
                        if (n._startTime > r && this._sortChildren && !n._paused) {
                            this.add(n, n._startTime - n._delay)
                        } else {
                            r = n._startTime
                        }
                        if (n._startTime < 0 && !n._paused) {
                            t -= n._startTime;
                            if (this._timeline.smoothChildTiming) {
                                this._startTime += n._startTime / this._timeScale
                            }
                            this.shiftChildren(-n._startTime, false, -9999999999);
                            r = 0
                        }
                        s = n._startTime + n._totalDuration / n._timeScale;
                        if (s > t) {
                            t = s
                        }
                        n = i
                    }
                    this._duration = this._totalDuration = t;
                    this._dirty = false
                }
                return this._totalDuration
            }
            if (this.totalDuration() !== 0)
                if (e !== 0) {
                    this.timeScale(this._totalDuration / e)
                }
            return this
        };
        a.usesFrames = function() {
            var t = this._timeline;
            while (t._timeline) {
                t = t._timeline
            }
            return t === e._rootFramesTimeline
        };
        a.rawTime = function() {
            return this._paused || this._totalTime !== 0 && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        };
        return r
    }, true);
    window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
        var r = function(t) {
                e.call(this, t);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._cycle = 0;
                this._yoyo = this.vars.yoyo === true;
                this._dirty = true
            },
            i = [],
            s = new n(null, null, 1, 0),
            o = function(e) {
                while (e) {
                    if (e._paused) {
                        return true
                    }
                    e = e._timeline
                }
                return false
            },
            u = r.prototype = new e;
        u.constructor = r;
        u.kill()._gc = false;
        r.version = "1.9.7";
        u.invalidate = function() {
            this._yoyo = this.vars.yoyo === true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return e.prototype.invalidate.call(this)
        };
        u.addCallback = function(e, n, r, i) {
            return this.add(t.delayedCall(0, e, r, i), n)
        };
        u.removeCallback = function(e, t) {
            if (t == null) {
                this._kill(null, e)
            } else {
                var n = this.getTweensOf(e, false),
                    r = n.length,
                    i = this._parseTimeOrLabel(t);
                while (--r > -1) {
                    if (n[r]._startTime === i) {
                        n[r]._enabled(false, false)
                    }
                }
            }
            return this
        };
        u.tweenTo = function(e, n) {
            n = n || {};
            var r = {
                    ease: s,
                    overwrite: 2,
                    useFrames: this.usesFrames(),
                    immediateRender: false
                },
                o, u;
            for (o in n) {
                r[o] = n[o]
            }
            r.time = this._parseTimeOrLabel(e);
            u = new t(this, Math.abs(Number(r.time) - this._time) / this._timeScale || .001, r);
            r.onStart = function() {
                u.target.paused(true);
                if (u.vars.time !== u.target.time()) {
                    u.duration(Math.abs(u.vars.time - u.target.time()) / u.target._timeScale)
                }
                if (n.onStart) {
                    n.onStart.apply(n.onStartScope || u, n.onStartParams || i)
                }
            };
            return u
        };
        u.tweenFromTo = function(e, t, n) {
            n = n || {};
            e = this._parseTimeOrLabel(e);
            n.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                onCompleteScope: this
            };
            n.immediateRender = n.immediateRender !== false;
            var r = this.tweenTo(t, n);
            return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
        };
        u.render = function(e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                s = this._duration,
                o = this._time,
                u = this._totalTime,
                a = this._startTime,
                f = this._timeScale,
                l = this._rawPrevTime,
                c = this._paused,
                h = this._cycle,
                p, d, v, m, g, y;
            if (e >= r) {
                if (!this._locked) {
                    this._totalTime = r;
                    this._cycle = this._repeat
                }
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        d = true;
                        m = "onComplete";
                        if (s === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e && this._first) {
                                    g = true;
                                    if (this._rawPrevTime > 0) {
                                        m = "onReverseComplete"
                                    }
                                }
                    }
                this._rawPrevTime = e;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = e = 0
                } else {
                    this._time = s;
                    e = s + 1e-6
                }
            } else if (e < 1e-7) {
                if (!this._locked) {
                    this._totalTime = this._cycle = 0
                }
                this._time = 0;
                if (o !== 0 || s === 0 && this._rawPrevTime > 0 && !this._locked) {
                    m = "onReverseComplete";
                    d = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (s === 0)
                        if (this._rawPrevTime >= 0 && this._first) {
                            g = true
                        }
                } else if (!this._initted) {
                    g = true
                }
                this._rawPrevTime = e;
                e = 0
            } else {
                this._time = this._rawPrevTime = e;
                if (!this._locked) {
                    this._totalTime = e;
                    if (this._repeat !== 0) {
                        y = s + this._repeatDelay;
                        this._cycle = this._totalTime / y >> 0;
                        if (this._cycle !== 0)
                            if (this._cycle === this._totalTime / y) {
                                this._cycle--
                            }
                        this._time = this._totalTime - this._cycle * y;
                        if (this._yoyo)
                            if ((this._cycle & 1) !== 0) {
                                this._time = s - this._time
                            }
                        if (this._time > s) {
                            this._time = s;
                            e = s + 1e-6
                        } else if (this._time < 0) {
                            this._time = e = 0
                        } else {
                            e = this._time
                        }
                    }
                }
            }
            if (this._cycle !== h)
                if (!this._locked) {
                    var b = this._yoyo && (h & 1) !== 0,
                        w = b === (this._yoyo && (this._cycle & 1) !== 0),
                        E = this._totalTime,
                        S = this._cycle,
                        x = this._rawPrevTime,
                        T = this._time;
                    this._totalTime = h * s;
                    if (this._cycle < h) {
                        b = !b
                    } else {
                        this._totalTime += s
                    }
                    this._time = o;
                    this._rawPrevTime = s === 0 ? l - 1e-5 : l;
                    this._cycle = h;
                    this._locked = true;
                    o = b ? 0 : s;
                    this.render(o, t, s === 0);
                    if (!t)
                        if (!this._gc) {
                            if (this.vars.onRepeat) {
                                this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || i)
                            }
                        }
                    if (w) {
                        o = b ? s + 1e-6 : -1e-6;
                        this.render(o, true, false)
                    }
                    this._time = T;
                    this._totalTime = E;
                    this._cycle = S;
                    this._rawPrevTime = x;
                    this._locked = false
                }
            if ((this._time === o || !this._first) && !n && !g) {
                if (u !== this._totalTime)
                    if (this._onUpdate)
                        if (!t) {
                            this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)
                        }
                return
            } else if (!this._initted) {
                this._initted = true
            }
            if (u === 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || i)
                        }
            if (this._time >= o) {
                p = this._first;
                while (p) {
                    v = p._next;
                    if (this._paused && !c) {
                        break
                    } else if (p._active || p._startTime <= this._time && !p._paused && !p._gc) {
                        if (!p._reversed) {
                            p.render((e - p._startTime) * p._timeScale, t, n)
                        } else {
                            p.render((!p._dirty ? p._totalDuration : p.totalDuration()) - (e - p._startTime) * p._timeScale, t, n)
                        }
                    }
                    p = v
                }
            } else {
                p = this._last;
                while (p) {
                    v = p._prev;
                    if (this._paused && !c) {
                        break
                    } else if (p._active || p._startTime <= o && !p._paused && !p._gc) {
                        if (!p._reversed) {
                            p.render((e - p._startTime) * p._timeScale, t, n)
                        } else {
                            p.render((!p._dirty ? p._totalDuration : p.totalDuration()) - (e - p._startTime) * p._timeScale, t, n)
                        }
                    }
                    p = v
                }
            }
            if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)
                }
            if (m)
                if (!this._locked)
                    if (!this._gc)
                        if (a === this._startTime || f !== this._timeScale)
                            if (this._time === 0 || r >= this.totalDuration()) {
                                if (d) {
                                    if (this._timeline.autoRemoveChildren) {
                                        this._enabled(false, false)
                                    }
                                    this._active = false
                                }
                                if (!t && this.vars[m]) {
                                    this.vars[m].apply(this.vars[m + "Scope"] || this, this.vars[m + "Params"] || i)
                                }
                            }
        };
        u.getActive = function(e, t, n) {
            if (e == null) {
                e = true
            }
            if (t == null) {
                t = true
            }
            if (n == null) {
                n = false
            }
            var r = [],
                i = this.getChildren(e, t, n),
                s = 0,
                u = i.length,
                a, f;
            for (a = 0; a < u; a++) {
                f = i[a];
                if (!f._paused)
                    if (f._timeline._time >= f._startTime)
                        if (f._timeline._time < f._startTime + f._totalDuration / f._timeScale)
                            if (!o(f._timeline)) {
                                r[s++] = f
                            }
            }
            return r
        };
        u.getLabelAfter = function(e) {
            if (!e)
                if (e !== 0) {
                    e = this._time
                }
            var t = this.getLabelsArray(),
                n = t.length,
                r;
            for (r = 0; r < n; r++) {
                if (t[r].time > e) {
                    return t[r].name
                }
            }
            return null
        };
        u.getLabelBefore = function(e) {
            if (e == null) {
                e = this._time
            }
            var t = this.getLabelsArray(),
                n = t.length;
            while (--n > -1) {
                if (t[n].time < e) {
                    return t[n].name
                }
            }
            return null
        };
        u.getLabelsArray = function() {
            var e = [],
                t = 0,
                n;
            for (n in this._labels) {
                e[t++] = {
                    time: this._labels[n],
                    name: n
                }
            }
            e.sort(function(e, t) {
                return e.time - t.time
            });
            return e
        };
        u.progress = function(e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), false)
        };
        u.totalProgress = function(e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        u.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    e.prototype.totalDuration.call(this);
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat
                }
                return this._totalDuration
            }
            return this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        u.time = function(e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat !== 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        u.repeat = function(e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        u.repeatDelay = function(e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        u.yoyo = function(e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        u.currentLabel = function(e) {
            if (!arguments.length) {
                return this.getLabelBefore(this._time + 1e-8)
            }
            return this.seek(e, true)
        };
        return r
    }, true);
    (function() {
        var e = 180 / Math.PI,
            t = Math.PI / 180,
            n = [],
            r = [],
            i = [],
            s = {},
            o = function(e, t, n, r) {
                this.a = e;
                this.b = t;
                this.c = n;
                this.d = r;
                this.da = r - e;
                this.ca = n - e;
                this.ba = t - e
            },
            u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            a = function(e, t, n, r) {
                var i = {
                        a: e
                    },
                    s = {},
                    o = {},
                    u = {
                        c: r
                    },
                    a = (e + t) / 2,
                    f = (t + n) / 2,
                    l = (n + r) / 2,
                    c = (a + f) / 2,
                    h = (f + l) / 2,
                    p = (h - c) / 8;
                i.b = a + (e - a) / 4;
                s.b = c + p;
                i.c = s.a = (i.b + s.b) / 2;
                s.c = o.a = (c + h) / 2;
                o.b = h - p;
                u.b = l + (r - l) / 4;
                o.c = u.a = (o.b + u.b) / 2;
                return [i, s, o, u]
            },
            f = function(e, t, s, o, u) {
                var f = e.length - 1,
                    l = 0,
                    c = e[0].a,
                    h, p, d, v, m, g, y, b, w, E, S, x, T;
                for (h = 0; h < f; h++) {
                    m = e[l];
                    p = m.a;
                    d = m.d;
                    v = e[l + 1].d;
                    if (u) {
                        S = n[h];
                        x = r[h];
                        T = (x + S) * t * .25 / (o ? .5 : i[h] || .5);
                        g = d - (d - p) * (o ? t * .5 : S !== 0 ? T / S : 0);
                        y = d + (v - d) * (o ? t * .5 : x !== 0 ? T / x : 0);
                        b = d - (g + ((y - g) * (S * 3 / (S + x) + .5) / 4 || 0))
                    } else {
                        g = d - (d - p) * t * .5;
                        y = d + (v - d) * t * .5;
                        b = d - (g + y) / 2
                    }
                    g += b;
                    y += b;
                    m.c = w = g;
                    if (h !== 0) {
                        m.b = c
                    } else {
                        m.b = c = m.a + (m.c - m.a) * .6
                    }
                    m.da = d - p;
                    m.ca = w - p;
                    m.ba = c - p;
                    if (s) {
                        E = a(p, c, w, d);
                        e.splice(l, 1, E[0], E[1], E[2], E[3]);
                        l += 4
                    } else {
                        l++
                    }
                    c = y
                }
                m = e[l];
                m.b = c;
                m.c = c + (m.d - c) * .4;
                m.da = m.d - m.a;
                m.ca = m.c - m.a;
                m.ba = c - m.a;
                if (s) {
                    E = a(m.a, c, m.c, m.d);
                    e.splice(l, 1, E[0], E[1], E[2], E[3])
                }
            },
            l = function(e, t, i, s) {
                var u = [],
                    a, f, l, c, h, p;
                if (s) {
                    e = [s].concat(e);
                    f = e.length;
                    while (--f > -1) {
                        if (typeof(p = e[f][t]) === "string")
                            if (p.charAt(1) === "=") {
                                e[f][t] = s[t] + Number(p.charAt(0) + p.substr(2))
                            }
                    }
                }
                a = e.length - 2;
                if (a < 0) {
                    u[0] = new o(e[0][t], 0, 0, e[a < -1 ? 0 : 1][t]);
                    return u
                }
                for (f = 0; f < a; f++) {
                    l = e[f][t];
                    c = e[f + 1][t];
                    u[f] = new o(l, 0, 0, c);
                    if (i) {
                        h = e[f + 2][t];
                        n[f] = (n[f] || 0) + (c - l) * (c - l);
                        r[f] = (r[f] || 0) + (h - c) * (h - c)
                    }
                }
                u[f] = new o(e[f][t], 0, 0, e[f + 1][t]);
                return u
            },
            c = function(e, t, o, a, c, h) {
                var p = {},
                    d = [],
                    v = h || e[0],
                    m, g, y, b, w, E, S, x;
                c = typeof c === "string" ? "," + c + "," : u;
                if (t == null) {
                    t = 1
                }
                for (g in e[0]) {
                    d.push(g)
                }
                if (e.length > 1) {
                    x = e[e.length - 1];
                    S = true;
                    m = d.length;
                    while (--m > -1) {
                        g = d[m];
                        if (Math.abs(v[g] - x[g]) > .05) {
                            S = false;
                            break
                        }
                    }
                    if (S) {
                        e = e.concat();
                        if (h) {
                            e.unshift(h)
                        }
                        e.push(e[1]);
                        h = e[e.length - 3]
                    }
                }
                n.length = r.length = i.length = 0;
                m = d.length;
                while (--m > -1) {
                    g = d[m];
                    s[g] = c.indexOf("," + g + ",") !== -1;
                    p[g] = l(e, g, s[g], h)
                }
                m = n.length;
                while (--m > -1) {
                    n[m] = Math.sqrt(n[m]);
                    r[m] = Math.sqrt(r[m])
                }
                if (!a) {
                    m = d.length;
                    while (--m > -1) {
                        if (s[g]) {
                            y = p[d[m]];
                            E = y.length - 1;
                            for (b = 0; b < E; b++) {
                                w = y[b + 1].da / r[b] + y[b].da / n[b];
                                i[b] = (i[b] || 0) + w * w
                            }
                        }
                    }
                    m = i.length;
                    while (--m > -1) {
                        i[m] = Math.sqrt(i[m])
                    }
                }
                m = d.length;
                b = o ? 4 : 1;
                while (--m > -1) {
                    g = d[m];
                    y = p[g];
                    f(y, t, o, a, s[g]);
                    if (S) {
                        y.splice(0, b);
                        y.splice(y.length - b, b)
                    }
                }
                return p
            },
            h = function(e, t, n) {
                t = t || "soft";
                var r = {},
                    i = t === "cubic" ? 3 : 2,
                    s = t === "soft",
                    u = [],
                    a, f, l, c, h, p, d, v, m, g, y;
                if (s && n) {
                    e = [n].concat(e)
                }
                if (e == null || e.length < i + 1) {
                    throw "invalid Bezier data"
                }
                for (m in e[0]) {
                    u.push(m)
                }
                p = u.length;
                while (--p > -1) {
                    m = u[p];
                    r[m] = h = [];
                    g = 0;
                    v = e.length;
                    for (d = 0; d < v; d++) {
                        a = n == null ? e[d][m] : typeof(y = e[d][m]) === "string" && y.charAt(1) === "=" ? n[m] + Number(y.charAt(0) + y.substr(2)) : Number(y);
                        if (s)
                            if (d > 1)
                                if (d < v - 1) {
                                    h[g++] = (a + h[g - 2]) / 2
                                }
                        h[g++] = a
                    }
                    v = g - i + 1;
                    g = 0;
                    for (d = 0; d < v; d += i) {
                        a = h[d];
                        f = h[d + 1];
                        l = h[d + 2];
                        c = i === 2 ? 0 : h[d + 3];
                        h[g++] = y = i === 3 ? new o(a, f, l, c) : new o(a, (2 * f + a) / 3, (2 * f + l) / 3, l)
                    }
                    h.length = g
                }
                return r
            },
            p = function(e, t, n) {
                var r = 1 / n,
                    i = e.length,
                    s, o, u, a, f, l, c, h, p, d, v;
                while (--i > -1) {
                    d = e[i];
                    u = d.a;
                    a = d.d - u;
                    f = d.c - u;
                    l = d.b - u;
                    s = o = 0;
                    for (h = 1; h <= n; h++) {
                        c = r * h;
                        p = 1 - c;
                        s = o - (o = (c * c * a + 3 * p * (c * f + p * l)) * c);
                        v = i * n + h - 1;
                        t[v] = (t[v] || 0) + s * s
                    }
                }
            },
            d = function(e, t) {
                t = t >> 0 || 6;
                var n = [],
                    r = [],
                    i = 0,
                    s = 0,
                    o = t - 1,
                    u = [],
                    a = [],
                    f, l, c, h;
                for (f in e) {
                    p(e[f], n, t)
                }
                c = n.length;
                for (l = 0; l < c; l++) {
                    i += Math.sqrt(n[l]);
                    h = l % t;
                    a[h] = i;
                    if (h === o) {
                        s += i;
                        h = l / t >> 0;
                        u[h] = a;
                        r[h] = s;
                        i = 0;
                        a = []
                    }
                }
                return {
                    length: s,
                    lengths: r,
                    segments: u
                }
            },
            v = window._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                API: 2,
                global: true,
                init: function(e, t, n) {
                    this._target = e;
                    if (t instanceof Array) {
                        t = {
                            values: t
                        }
                    }
                    this._func = {};
                    this._round = {};
                    this._props = [];
                    this._timeRes = t.timeResolution == null ? 6 : parseInt(t.timeResolution, 10);
                    var r = t.values || [],
                        i = {},
                        s = r[0],
                        o = t.autoRotate || n.vars.orientToBezier,
                        u, a, f, l, p;
                    this._autoRotate = o ? o instanceof Array ? o : [
                        ["x", "y", "rotation", o === true ? 0 : Number(o) || 0]
                    ] : null;
                    for (u in s) {
                        this._props.push(u)
                    }
                    f = this._props.length;
                    while (--f > -1) {
                        u = this._props[f];
                        this._overwriteProps.push(u);
                        a = this._func[u] = typeof e[u] === "function";
                        i[u] = !a ? parseFloat(e[u]) : e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)]();
                        if (!p)
                            if (i[u] !== r[0][u]) {
                                p = i
                            }
                    }
                    this._beziers = t.type !== "cubic" && t.type !== "quadratic" && t.type !== "soft" ? c(r, isNaN(t.curviness) ? 1 : t.curviness, false, t.type === "thruBasic", t.correlate, p) : h(r, t.type, i);
                    this._segCount = this._beziers[u].length;
                    if (this._timeRes) {
                        var v = d(this._beziers, this._timeRes);
                        this._length = v.length;
                        this._lengths = v.lengths;
                        this._segments = v.segments;
                        this._l1 = this._li = this._s1 = this._si = 0;
                        this._l2 = this._lengths[0];
                        this._curSeg = this._segments[0];
                        this._s2 = this._curSeg[0];
                        this._prec = 1 / this._curSeg.length
                    }
                    if (o = this._autoRotate) {
                        if (!(o[0] instanceof Array)) {
                            this._autoRotate = o = [o]
                        }
                        f = o.length;
                        while (--f > -1) {
                            for (l = 0; l < 3; l++) {
                                u = o[f][l];
                                this._func[u] = typeof e[u] === "function" ? e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)] : false
                            }
                        }
                    }
                    return true
                },
                set: function(t) {
                    var n = this._segCount,
                        r = this._func,
                        i = this._target,
                        s, o, u, a, f, l, c, h, p, d;
                    if (!this._timeRes) {
                        s = t < 0 ? 0 : t >= 1 ? n - 1 : n * t >> 0;
                        l = (t - s * (1 / n)) * n
                    } else {
                        p = this._lengths;
                        d = this._curSeg;
                        t *= this._length;
                        u = this._li;
                        if (t > this._l2 && u < n - 1) {
                            h = n - 1;
                            while (u < h && (this._l2 = p[++u]) <= t) {}
                            this._l1 = p[u - 1];
                            this._li = u;
                            this._curSeg = d = this._segments[u];
                            this._s2 = d[this._s1 = this._si = 0]
                        } else if (t < this._l1 && u > 0) {
                            while (u > 0 && (this._l1 = p[--u]) >= t) {}
                            if (u === 0 && t < this._l1) {
                                this._l1 = 0
                            } else {
                                u++
                            }
                            this._l2 = p[u];
                            this._li = u;
                            this._curSeg = d = this._segments[u];
                            this._s1 = d[(this._si = d.length - 1) - 1] || 0;
                            this._s2 = d[this._si]
                        }
                        s = u;
                        t -= this._l1;
                        u = this._si;
                        if (t > this._s2 && u < d.length - 1) {
                            h = d.length - 1;
                            while (u < h && (this._s2 = d[++u]) <= t) {}
                            this._s1 = d[u - 1];
                            this._si = u
                        } else if (t < this._s1 && u > 0) {
                            while (u > 0 && (this._s1 = d[--u]) >= t) {}
                            if (u === 0 && t < this._s1) {
                                this._s1 = 0
                            } else {
                                u++
                            }
                            this._s2 = d[u];
                            this._si = u
                        }
                        l = (u + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                    }
                    o = 1 - l;
                    u = this._props.length;
                    while (--u > -1) {
                        a = this._props[u];
                        f = this._beziers[a][s];
                        c = (l * l * f.da + 3 * o * (l * f.ca + o * f.ba)) * l + f.a;
                        if (this._round[a]) {
                            c = c + (c > 0 ? .5 : -.5) >> 0
                        }
                        if (r[a]) {
                            i[a](c)
                        } else {
                            if (a == "x") {
                                i.setX(c)
                            } else if (a == "y") {
                                i.setY(c)
                            } else if (a == "z") {
                                i.setZ(c)
                            } else if (a == "angleX") {
                                i.setAngleX(c)
                            } else if (a == "angleY") {
                                i.setAngleY(c)
                            } else if (a == "angleZ") {
                                i.setAngleZ(c)
                            } else if (a == "w") {
                                i.setWidth(c)
                            } else if (a == "h") {
                                i.setHeight(c)
                            } else if (a == "alpha") {
                                i.setAlpha(c)
                            } else if (a == "scale") {
                                i.setScale2(c)
                            } else {
                                i[a] = c
                            }
                        }
                    }
                    if (this._autoRotate) {
                        var v = this._autoRotate,
                            m, g, y, b, w, E, S;
                        u = v.length;
                        while (--u > -1) {
                            a = v[u][2];
                            E = v[u][3] || 0;
                            S = v[u][4] === true ? 1 : e;
                            f = this._beziers[v[u][0]];
                            m = this._beziers[v[u][1]];
                            if (f && m) {
                                f = f[s];
                                m = m[s];
                                g = f.a + (f.b - f.a) * l;
                                b = f.b + (f.c - f.b) * l;
                                g += (b - g) * l;
                                b += (f.c + (f.d - f.c) * l - b) * l;
                                y = m.a + (m.b - m.a) * l;
                                w = m.b + (m.c - m.b) * l;
                                y += (w - y) * l;
                                w += (m.c + (m.d - m.c) * l - w) * l;
                                c = Math.atan2(w - y, b - g) * S + E;
                                if (r[a]) {
                                    i[a](c)
                                } else {
                                    i[a] = c
                                }
                            }
                        }
                    }
                }
            }),
            m = v.prototype;
        v.bezierThrough = c;
        v.cubicToQuadratic = a;
        v._autoCSS = true;
        v.quadraticToCubic = function(e, t, n) {
            return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
        };
        v._cssRegister = function() {
            var e = window._gsDefine.globals.CSSPlugin;
            if (!e) {
                return
            }
            var n = e._internals,
                r = n._parseToProxy,
                i = n._setPluginRatio,
                s = n.CSSPropTween;
            n._registerComplexSpecialProp("bezier", {
                parser: function(e, n, o, u, a, f) {
                    if (n instanceof Array) {
                        n = {
                            values: n
                        }
                    }
                    f = new v;
                    var l = n.values,
                        c = l.length - 1,
                        h = [],
                        p = {},
                        d, m, g;
                    if (c < 0) {
                        return a
                    }
                    for (d = 0; d <= c; d++) {
                        g = r(e, l[d], u, a, f, c !== d);
                        h[d] = g.end
                    }
                    for (m in n) {
                        p[m] = n[m]
                    }
                    p.values = h;
                    a = new s(e, "bezier", 0, 0, g.pt, 2);
                    a.data = g;
                    a.plugin = f;
                    a.setRatio = i;
                    if (p.autoRotate === 0) {
                        p.autoRotate = true
                    }
                    if (p.autoRotate && !(p.autoRotate instanceof Array)) {
                        d = p.autoRotate === true ? 0 : Number(p.autoRotate) * t;
                        p.autoRotate = g.end.left != null ? [
                            ["left", "top", "rotation", d, true]
                        ] : g.end.x != null ? [
                            ["x", "y", "rotation", d, true]
                        ] : false
                    }
                    if (p.autoRotate) {
                        if (!u._transform) {
                            u._enableTransforms(false)
                        }
                        g.autoRotate = u._target._gsTransform
                    }
                    f._onInitTween(g.proxy, p, u._tween);
                    return a
                }
            })
        };
        m._roundProps = function(e, t) {
            var n = this._overwriteProps,
                r = n.length;
            while (--r > -1) {
                if (e[n[r]] || e.bezier || e.bezierThrough) {
                    this._round[n[r]] = t
                }
            }
        };
        m._kill = function(e) {
            var t = this._props,
                n, r;
            for (n in this._beziers) {
                if (n in e) {
                    delete this._beziers[n];
                    delete this._func[n];
                    r = t.length;
                    while (--r > -1) {
                        if (t[r] === n) {
                            t.splice(r, 1)
                        }
                    }
                }
            }
            return this._super._kill.call(this, e)
        }
    })();
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
        var n = function() {
                e.call(this, "css");
                this._overwriteProps.length = 0
            },
            r, i, s, o, u = {},
            a = n.prototype = new e("css");
        a.constructor = n;
        n.version = "1.9.7";
        n.API = 2;
        n.defaultTransformPerspective = 0;
        a = "px";
        n.suffixMap = {
            top: a,
            right: a,
            bottom: a,
            left: a,
            width: a,
            height: a,
            fontSize: a,
            padding: a,
            margin: a,
            perspective: a
        };
        var f = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            l = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            c = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            h = /[^\d\-\.]/g,
            p = /(?:\d|\-|\+|=|#|\.)*/g,
            d = /opacity *= *([^)]*)/,
            v = /opacity:([^;]*)/,
            m = /alpha\(opacity *=.+?\)/i,
            g = /^(rgb|hsl)/,
            y = /([A-Z])/g,
            b = /-([a-z])/gi,
            w = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            E = function(e, t) {
                return t.toUpperCase()
            },
            S = /(?:Left|Right|Width)/i,
            x = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            T = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            N = /,(?=[^\)]*(?:\(|$))/gi,
            C = Math.PI / 180,
            k = 180 / Math.PI,
            L = {},
            A = document,
            O = A.createElement("div"),
            M = A.createElement("img"),
            _ = n._internals = {
                _specialProps: u
            },
            D = navigator.userAgent,
            P, H, B, j, F, I, q = function() {
                var e = D.indexOf("Android"),
                    t = A.createElement("div"),
                    n;
                B = D.indexOf("Safari") !== -1 && D.indexOf("Chrome") === -1 && (e === -1 || Number(D.substr(e + 8, 1)) > 3);
                F = B && Number(D.substr(D.indexOf("Version/") + 8, 1)) < 6;
                j = D.indexOf("Firefox") !== -1;
                /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(D);
                I = parseFloat(RegExp.$1);
                t.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
                n = t.getElementsByTagName("a")[0];
                return n ? /^0.55/.test(n.style.opacity) : false
            }(),
            R = function(e) {
                return d.test(typeof e === "string" ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            U = function(e) {
                if (window.console) {
                    console.log(e)
                }
            },
            z = "",
            W = "",
            X = function(e, t) {
                t = t || O;
                var n = t.style,
                    r, i;
                if (n[e] !== undefined) {
                    return e
                }
                e = e.charAt(0).toUpperCase() + e.substr(1);
                r = ["O", "Moz", "ms", "Ms", "Webkit"];
                i = 5;
                while (--i > -1 && n[r[i] + e] === undefined) {}
                if (i >= 0) {
                    W = i === 3 ? "ms" : r[i];
                    z = "-" + W.toLowerCase() + "-";
                    return W + e
                }
                return null
            },
            V = A.defaultView ? A.defaultView.getComputedStyle : function() {},
            $ = n.getStyle = function(e, t, n, r, i) {
                var s;
                if (!q)
                    if (t === "opacity") {
                        return R(e)
                    }
                if (!r && e.style[t]) {
                    s = e.style[t]
                } else if (n = n || V(e, null)) {
                    e = n.getPropertyValue(t.replace(y, "-$1").toLowerCase());
                    s = e || n.length ? e : n[t]
                } else if (e.currentStyle) {
                    n = e.currentStyle;
                    s = n[t]
                }
                return i != null && (!s || s === "none" || s === "auto" || s === "auto auto") ? i : s
            },
            J = function(e, t, n, r, i) {
                if (r === "px" || !r) {
                    return n
                }
                if (r === "auto" || !n) {
                    return 0
                }
                var s = S.test(t),
                    o = e,
                    u = O.style,
                    a = n < 0,
                    f;
                if (a) {
                    n = -n
                }
                if (r === "%" && t.indexOf("border") !== -1) {
                    f = n / 100 * (s ? e.clientWidth : e.clientHeight)
                } else {
                    u.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
                    if (r === "%" || !o.appendChild) {
                        o = e.parentNode || A.body;
                        u[s ? "width" : "height"] = n + r
                    } else {
                        u[s ? "borderLeftWidth" : "borderTopWidth"] = n + r
                    }
                    o.appendChild(O);
                    f = parseFloat(O[s ? "offsetWidth" : "offsetHeight"]);
                    o.removeChild(O);
                    if (f === 0 && !i) {
                        f = J(e, t, n, r, true)
                    }
                }
                return a ? -f : f
            },
            K = function(e, t, n) {
                if ($(e, "position", n) !== "absolute") {
                    return 0
                }
                var r = t === "left" ? "Left" : "Top",
                    i = $(e, "margin" + r, n);
                return e["offset" + r] - (J(e, t, parseFloat(i), i.replace(p, "")) || 0)
            },
            Q = function(e, t) {
                var n = {},
                    r, i;
                if (t = t || V(e, null)) {
                    if (r = t.length) {
                        while (--r > -1) {
                            n[t[r].replace(b, E)] = t.getPropertyValue(t[r])
                        }
                    } else {
                        for (r in t) {
                            n[r] = t[r]
                        }
                    }
                } else if (t = e.currentStyle || e.style) {
                    for (r in t) {
                        n[r.replace(b, E)] = t[r]
                    }
                }
                if (!q) {
                    n.opacity = R(e)
                }
                i = Nt(e, t, false);
                n.rotation = i.rotation * k;
                n.skewX = i.skewX * k;
                n.scaleX = i.scaleX;
                n.scaleY = i.scaleY;
                n.x = i.x;
                n.y = i.y;
                if (Tt) {
                    n.z = i.z;
                    n.rotationX = i.rotationX * k;
                    n.rotationY = i.rotationY * k;
                    n.scaleZ = i.scaleZ
                }
                if (n.filters) {
                    delete n.filters
                }
                return n
            },
            G = function(e, t, n, r, i) {
                var s = {},
                    o = e.style,
                    u, a, f;
                for (a in n) {
                    if (a !== "cssText")
                        if (a !== "length")
                            if (isNaN(a))
                                if (t[a] !== (u = n[a]) || i && i[a])
                                    if (a.indexOf("Origin") === -1)
                                        if (typeof u === "number" || typeof u === "string") {
                                            s[a] = u === "auto" && (a === "left" || a === "top") ? K(e, a) : (u === "" || u === "auto" || u === "none") && typeof t[a] === "string" && t[a].replace(h, "") !== "" ? 0 : u;
                                            if (o[a] !== undefined) {
                                                f = new ht(o, a, o[a], f)
                                            }
                                        }
                }
                if (r) {
                    for (a in r) {
                        if (a !== "className") {
                            s[a] = r[a]
                        }
                    }
                }
                return {
                    difs: s,
                    firstMPT: f
                }
            },
            Y = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            Z = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            et = function(e, t, n) {
                var r = parseFloat(t === "width" ? e.offsetWidth : e.offsetHeight),
                    i = Y[t],
                    s = i.length;
                n = n || V(e, null);
                while (--s > -1) {
                    r -= parseFloat($(e, "padding" + i[s], n, true)) || 0;
                    r -= parseFloat($(e, "border" + i[s] + "Width", n, true)) || 0
                }
                return r
            },
            tt = function(e, t) {
                if (e == null || e === "" || e === "auto" || e === "auto auto") {
                    e = "0 0"
                }
                var n = e.split(" "),
                    r = e.indexOf("left") !== -1 ? "0%" : e.indexOf("right") !== -1 ? "100%" : n[0],
                    i = e.indexOf("top") !== -1 ? "0%" : e.indexOf("bottom") !== -1 ? "100%" : n[1];
                if (i == null) {
                    i = "0"
                } else if (i === "center") {
                    i = "50%"
                }
                if (r === "center" || isNaN(parseFloat(r))) {
                    r = "50%"
                }
                if (t) {
                    t.oxp = r.indexOf("%") !== -1;
                    t.oyp = i.indexOf("%") !== -1;
                    t.oxr = r.charAt(1) === "=";
                    t.oyr = i.charAt(1) === "=";
                    t.ox = parseFloat(r.replace(h, ""));
                    t.oy = parseFloat(i.replace(h, ""))
                }
                return r + " " + i + (n.length > 2 ? " " + n[2] : "")
            },
            nt = function(e, t) {
                return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
            },
            rt = function(e, t) {
                return e == null ? t : typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
            },
            it = function(e, t, n, r) {
                var i = 1e-6,
                    s, o, u, a;
                if (e == null) {
                    a = t
                } else if (typeof e === "number") {
                    a = e * C
                } else {
                    s = Math.PI * 2;
                    o = e.split("_");
                    u = Number(o[0].replace(h, "")) * (e.indexOf("rad") === -1 ? C : 1) - (e.charAt(1) === "=" ? 0 : t);
                    if (o.length) {
                        if (r) {
                            r[n] = t + u
                        }
                        if (e.indexOf("short") !== -1) {
                            u = u % s;
                            if (u !== u % (s / 2)) {
                                u = u < 0 ? u + s : u - s
                            }
                        }
                        if (e.indexOf("_cw") !== -1 && u < 0) {
                            u = (u + s * 9999999999) % s - (u / s | 0) * s
                        } else if (e.indexOf("ccw") !== -1 && u > 0) {
                            u = (u - s * 9999999999) % s - (u / s | 0) * s
                        }
                    }
                    a = t + u
                }
                if (a < i && a > -i) {
                    a = 0
                }
                return a
            },
            st = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ot = function(e, t, n) {
                e = e < 0 ? e + 1 : e > 1 ? e - 1 : e;
                return (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * 255 + .5 | 0
            },
            ut = function(e) {
                var t, n, r, i, s, o;
                if (!e || e === "") {
                    return st.black
                }
                if (typeof e === "number") {
                    return [e >> 16, e >> 8 & 255, e & 255]
                }
                if (e.charAt(e.length - 1) === ",") {
                    e = e.substr(0, e.length - 1)
                }
                if (st[e]) {
                    return st[e]
                }
                if (e.charAt(0) === "#") {
                    if (e.length === 4) {
                        t = e.charAt(1), n = e.charAt(2), r = e.charAt(3);
                        e = "#" + t + t + n + n + r + r
                    }
                    e = parseInt(e.substr(1), 16);
                    return [e >> 16, e >> 8 & 255, e & 255]
                }
                if (e.substr(0, 3) === "hsl") {
                    e = e.match(f);
                    i = Number(e[0]) % 360 / 360;
                    s = Number(e[1]) / 100;
                    o = Number(e[2]) / 100;
                    n = o <= .5 ? o * (s + 1) : o + s - o * s;
                    t = o * 2 - n;
                    if (e.length > 3) {
                        e[3] = Number(e[3])
                    }
                    e[0] = ot(i + 1 / 3, t, n);
                    e[1] = ot(i, t, n);
                    e[2] = ot(i - 1 / 3, t, n);
                    return e
                }
                e = e.match(f) || st.transparent;
                e[0] = Number(e[0]);
                e[1] = Number(e[1]);
                e[2] = Number(e[2]);
                if (e.length > 3) {
                    e[3] = Number(e[3])
                }
                return e
            },
            at = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (a in st) {
            at += "|" + a + "\\b"
        }
        at = new RegExp(at + ")", "gi");
        var ft = function(e, t, n, r) {
                if (e == null) {
                    return function(e) {
                        return e
                    }
                }
                var i = t ? (e.match(at) || [""])[0] : "",
                    s = e.split(i).join("").match(c) || [],
                    o = e.substr(0, e.indexOf(s[0])),
                    u = e.charAt(e.length - 1) === ")" ? ")" : "",
                    a = e.indexOf(" ") !== -1 ? " " : ",",
                    l = s.length,
                    h = l > 0 ? s[0].replace(f, "") : "",
                    p;
                if (!l) {
                    return function(e) {
                        return e
                    }
                }
                if (t) {
                    p = function(e) {
                        var t, f, d, v;
                        if (typeof e === "number") {
                            e += h
                        } else if (r && N.test(e)) {
                            v = e.replace(N, "|").split("|");
                            for (d = 0; d < v.length; d++) {
                                v[d] = p(v[d])
                            }
                            return v.join(",")
                        }
                        t = (e.match(at) || [i])[0];
                        f = e.split(t).join("").match(c) || [];
                        d = f.length;
                        if (l > d--) {
                            while (++d < l) {
                                f[d] = n ? f[(d - 1) / 2 | 0] : s[d]
                            }
                        }
                        return o + f.join(a) + a + t + u + (e.indexOf("inset") !== -1 ? " inset" : "")
                    };
                    return p
                }
                p = function(e) {
                    var t, i, f;
                    if (typeof e === "number") {
                        e += h
                    } else if (r && N.test(e)) {
                        i = e.replace(N, "|").split("|");
                        for (f = 0; f < i.length; f++) {
                            i[f] = p(i[f])
                        }
                        return i.join(",")
                    }
                    t = e.match(c) || [];
                    f = t.length;
                    if (l > f--) {
                        while (++f < l) {
                            t[f] = n ? t[(f - 1) / 2 | 0] : s[f]
                        }
                    }
                    return o + t.join(a) + u
                };
                return p
            },
            lt = function(e) {
                e = e.split(",");
                return function(t, n, r, i, s, o, u) {
                    var a = (n + "").split(" "),
                        f;
                    u = {};
                    for (f = 0; f < 4; f++) {
                        u[e[f]] = a[f] = a[f] || a[(f - 1) / 2 >> 0]
                    }
                    return i.parse(t, u, s, o)
                }
            },
            ct = _._setPluginRatio = function(e) {
                this.plugin.setRatio(e);
                var t = this.data,
                    n = t.proxy,
                    r = t.firstMPT,
                    i = 1e-6,
                    s, o, u, a;
                while (r) {
                    s = n[r.v];
                    if (r.r) {
                        s = s > 0 ? s + .5 | 0 : s - .5 | 0
                    } else if (s < i && s > -i) {
                        s = 0
                    }
                    r.t[r.p] = s;
                    r = r._next
                }
                if (t.autoRotate) {
                    t.autoRotate.rotation = n.rotation
                }
                if (e === 1) {
                    r = t.firstMPT;
                    while (r) {
                        o = r.t;
                        if (!o.type) {
                            o.e = o.s + o.xs0
                        } else if (o.type === 1) {
                            a = o.xs0 + o.s + o.xs1;
                            for (u = 1; u < o.l; u++) {
                                a += o["xn" + u] + o["xs" + (u + 1)]
                            }
                            o.e = a
                        }
                        r = r._next
                    }
                }
            },
            ht = function(e, t, n, r, i) {
                this.t = e;
                this.p = t;
                this.v = n;
                this.r = i;
                if (r) {
                    r._prev = this;
                    this._next = r
                }
            },
            pt = _._parseToProxy = function(e, t, n, r, i, s) {
                var o = r,
                    u = {},
                    a = {},
                    f = n._transform,
                    l = L,
                    c, h, p, d, v;
                n._transform = null;
                L = t;
                r = v = n.parse(e, t, r, i);
                L = l;
                if (s) {
                    n._transform = f;
                    if (o) {
                        o._prev = null;
                        if (o._prev) {
                            o._prev._next = null
                        }
                    }
                }
                while (r && r !== o) {
                    if (r.type <= 1) {
                        h = r.p;
                        a[h] = r.s + r.c;
                        u[h] = r.s;
                        if (!s) {
                            d = new ht(r, "s", h, d, r.r);
                            r.c = 0
                        }
                        if (r.type === 1) {
                            c = r.l;
                            while (--c > 0) {
                                p = "xn" + c;
                                h = r.p + "_" + p;
                                a[h] = r.data[p];
                                u[h] = r[p];
                                if (!s) {
                                    d = new ht(r, p, h, d, r.rxp[p])
                                }
                            }
                        }
                    }
                    r = r._next
                }
                return {
                    proxy: u,
                    end: a,
                    firstMPT: d,
                    pt: v
                }
            },
            dt = _.CSSPropTween = function(e, t, n, i, s, u, a, f, l, c, h) {
                this.t = e;
                this.p = t;
                this.s = n;
                this.c = i;
                this.n = a || "css_" + t;
                if (!(e instanceof dt)) {
                    o.push(this.n)
                }
                this.r = f;
                this.type = u || 0;
                if (l) {
                    this.pr = l;
                    r = true
                }
                this.b = c === undefined ? n : c;
                this.e = h === undefined ? n + i : h;
                if (s) {
                    this._next = s;
                    s._prev = this
                }
            },
            vt = n.parseComplex = function(e, t, n, r, i, s, o, u, a, c) {
                n = n || s || "";
                o = new dt(e, t, 0, 0, o, c ? 2 : 1, null, false, u, n, r);
                r += "";
                var h = n.split(", ").join(",").split(" "),
                    p = r.split(", ").join(",").split(" "),
                    d = h.length,
                    v = P !== false,
                    m, y, b, w, E, S, x, T, C, k, L, A;
                if (r.indexOf(",") !== -1 || n.indexOf(",") !== -1) {
                    h = h.join(" ").replace(N, ", ").split(" ");
                    p = p.join(" ").replace(N, ", ").split(" ");
                    d = h.length
                }
                if (d !== p.length) {
                    h = (s || "").split(" ");
                    d = h.length
                }
                o.plugin = a;
                o.setRatio = c;
                for (m = 0; m < d; m++) {
                    w = h[m];
                    E = p[m];
                    T = parseFloat(w);
                    if (T || T === 0) {
                        o.appendXtra("", T, nt(E, T), E.replace(l, ""), v && E.indexOf("px") !== -1, true)
                    } else if (i && (w.charAt(0) === "#" || st[w] || g.test(w))) {
                        A = E.charAt(E.length - 1) === "," ? ")," : ")";
                        w = ut(w);
                        E = ut(E);
                        C = w.length + E.length > 6;
                        if (C && !q && E[3] === 0) {
                            o["xs" + o.l] += o.l ? " transparent" : "transparent";
                            o.e = o.e.split(p[m]).join("transparent")
                        } else {
                            if (!q) {
                                C = false
                            }
                            o.appendXtra(C ? "rgba(" : "rgb(", w[0], E[0] - w[0], ",", true, true).appendXtra("", w[1], E[1] - w[1], ",", true).appendXtra("", w[2], E[2] - w[2], C ? "," : A, true);
                            if (C) {
                                w = w.length < 4 ? 1 : w[3];
                                o.appendXtra("", w, (E.length < 4 ? 1 : E[3]) - w, A, false)
                            }
                        }
                    } else {
                        S = w.match(f);
                        if (!S) {
                            o["xs" + o.l] += o.l ? " " + w : w
                        } else {
                            x = E.match(l);
                            if (!x || x.length !== S.length) {
                                return o
                            }
                            b = 0;
                            for (y = 0; y < S.length; y++) {
                                L = S[y];
                                k = w.indexOf(L, b);
                                o.appendXtra(w.substr(b, k - b), Number(L), nt(x[y], L), "", v && w.substr(k + L.length, 2) === "px", y === 0);
                                b = k + L.length
                            }
                            o["xs" + o.l] += w.substr(b)
                        }
                    }
                }
                if (r.indexOf("=") !== -1)
                    if (o.data) {
                        A = o.xs0 + o.data.s;
                        for (m = 1; m < o.l; m++) {
                            A += o["xs" + m] + o.data["xn" + m]
                        }
                        o.e = A + o["xs" + m]
                    }
                if (!o.l) {
                    o.type = -1;
                    o.xs0 = o.e
                }
                return o.xfirst || o
            },
            mt = 9;
        a = dt.prototype;
        a.l = a.pr = 0;
        while (--mt > 0) {
            a["xn" + mt] = 0;
            a["xs" + mt] = ""
        }
        a.xs0 = "";
        a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null;
        a.appendXtra = function(e, t, n, r, i, s) {
            var o = this,
                u = o.l;
            o["xs" + u] += s && u ? " " + e : e || "";
            if (!n)
                if (u !== 0 && !o.plugin) {
                    o["xs" + u] += t + (r || "");
                    return o
                }
            o.l++;
            o.type = o.setRatio ? 2 : 1;
            o["xs" + o.l] = r || "";
            if (u > 0) {
                o.data["xn" + u] = t + n;
                o.rxp["xn" + u] = i;
                o["xn" + u] = t;
                if (!o.plugin) {
                    o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr);
                    o.xfirst.xs0 = 0
                }
                return o
            }
            o.data = {
                s: t + n
            };
            o.rxp = {};
            o.s = t;
            o.c = n;
            o.r = i;
            return o
        };
        var gt = function(e, t) {
                t = t || {};
                this.p = t.prefix ? X(e) || e : e;
                u[e] = u[this.p] = this;
                this.format = t.formatter || ft(t.defaultValue, t.color, t.collapsible, t.multi);
                if (t.parser) {
                    this.parse = t.parser
                }
                this.clrs = t.color;
                this.multi = t.multi;
                this.keyword = t.keyword;
                this.dflt = t.defaultValue;
                this.pr = t.priority || 0
            },
            yt = _._registerComplexSpecialProp = function(e, t, n) {
                if (typeof t !== "object") {
                    t = {
                        parser: n
                    }
                }
                var r = e.split(","),
                    i = t.defaultValue,
                    s, o;
                n = n || [i];
                for (s = 0; s < r.length; s++) {
                    t.prefix = s === 0 && t.prefix;
                    t.defaultValue = n[s] || i;
                    o = new gt(r[s], t)
                }
            },
            bt = function(e) {
                if (!u[e]) {
                    var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                    yt(e, {
                        parser: function(e, n, r, i, s, o, a) {
                            var f = (window.GreenSockGlobals || window).com.greensock.plugins[t];
                            if (!f) {
                                U("Error: " + t + " js file not loaded.");
                                return s
                            }
                            f._cssRegister();
                            return u[r].parse(e, n, r, i, s, o, a)
                        }
                    })
                }
            };
        a = gt.prototype;
        a.parseComplex = function(e, t, n, r, i, s) {
            var o = this.keyword,
                u, a, f, l, c, h;
            if (this.multi)
                if (N.test(n) || N.test(t)) {
                    a = t.replace(N, "|").split("|");
                    f = n.replace(N, "|").split("|")
                } else if (o) {
                a = [t];
                f = [n]
            }
            if (f) {
                l = f.length > a.length ? f.length : a.length;
                for (u = 0; u < l; u++) {
                    t = a[u] = a[u] || this.dflt;
                    n = f[u] = f[u] || this.dflt;
                    if (o) {
                        c = t.indexOf(o);
                        h = n.indexOf(o);
                        if (c !== h) {
                            n = h === -1 ? f : a;
                            n[u] += " " + o
                        }
                    }
                }
                t = a.join(", ");
                n = f.join(", ")
            }
            return vt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
        };
        a.parse = function(e, t, n, r, i, o, u) {
            return this.parseComplex(e.style, this.format($(e, this.p, s, false, this.dflt)), this.format(t), i, o)
        };
        n.registerSpecialProp = function(e, t, n) {
            yt(e, {
                parser: function(e, r, i, s, o, u, a) {
                    var f = new dt(e, i, 0, 0, o, 2, i, false, n);
                    f.plugin = u;
                    f.setRatio = t(e, r, s._tween, i);
                    return f
                },
                priority: n
            })
        };
        var wt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
            Et = X("transform"),
            St = z + "transform",
            xt = X("transformOrigin"),
            Tt = X("perspective") !== null,
            Nt = function(e, t, r) {
                var i = r ? e._gsTransform || {
                        skewY: 0
                    } : {
                        skewY: 0
                    },
                    s = i.scaleX < 0,
                    o = 2e-5,
                    u = 1e5,
                    a = -Math.PI + 1e-4,
                    f = Math.PI - 1e-4,
                    l = Tt ? parseFloat($(e, xt, t, false, "0 0 0").split(" ")[2]) || i.zOrigin || 0 : 0,
                    c, h, p, d, v, m, g, y, b, w, E, S, T;
                if (Et) {
                    c = $(e, St, t, true)
                } else if (e.currentStyle) {
                    c = e.currentStyle.filter.match(x);
                    if (c && c.length === 4) {
                        c = [c[0].substr(4), Number(c[2].substr(4)), Number(c[1].substr(4)), c[3].substr(4), i.x || 0, i.y || 0].join(",")
                    } else if (i.x != null) {
                        return i
                    } else {
                        c = ""
                    }
                }
                h = (c || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
                p = h.length;
                while (--p > -1) {
                    d = Number(h[p]);
                    h[p] = (v = d - (d |= 0)) ? (v * u + (v < 0 ? -.5 : .5) | 0) / u + d : d
                }
                if (h.length === 16) {
                    var N = h[8],
                        C = h[9],
                        k = h[10],
                        L = h[12],
                        A = h[13],
                        O = h[14];
                    if (i.zOrigin) {
                        O = -i.zOrigin;
                        L = N * O - h[12];
                        A = C * O - h[13];
                        O = k * O + i.zOrigin - h[14]
                    }
                    if (!r || i.rotationX == null) {
                        var M = h[0],
                            _ = h[1],
                            D = h[2],
                            P = h[3],
                            H = h[4],
                            B = h[5],
                            j = h[6],
                            F = h[7],
                            I = h[11],
                            q = i.rotationX = Math.atan2(j, k),
                            R = q < a || q > f,
                            U, z, W, X, V, J, K;
                        if (q) {
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            U = H * X + N * V;
                            z = B * X + C * V;
                            W = j * X + k * V;
                            N = H * -V + N * X;
                            C = B * -V + C * X;
                            k = j * -V + k * X;
                            I = F * -V + I * X;
                            H = U;
                            B = z;
                            j = W
                        }
                        q = i.rotationY = Math.atan2(N, M);
                        if (q) {
                            J = q < a || q > f;
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            U = M * X - N * V;
                            z = _ * X - C * V;
                            W = D * X - k * V;
                            C = _ * V + C * X;
                            k = D * V + k * X;
                            I = P * V + I * X;
                            M = U;
                            _ = z;
                            D = W
                        }
                        q = i.rotation = Math.atan2(_, B);
                        if (q) {
                            K = q < a || q > f;
                            X = Math.cos(-q);
                            V = Math.sin(-q);
                            M = M * X + H * V;
                            z = _ * X + B * V;
                            B = _ * -V + B * X;
                            j = D * -V + j * X;
                            _ = z
                        }
                        if (K && R) {
                            i.rotation = i.rotationX = 0
                        } else if (K && J) {
                            i.rotation = i.rotationY = 0
                        } else if (J && R) {
                            i.rotationY = i.rotationX = 0
                        }
                        i.scaleX = (Math.sqrt(M * M + _ * _) * u + .5 | 0) / u;
                        i.scaleY = (Math.sqrt(B * B + C * C) * u + .5 | 0) / u;
                        i.scaleZ = (Math.sqrt(j * j + k * k) * u + .5 | 0) / u;
                        i.skewX = 0;
                        i.perspective = I ? 1 / (I < 0 ? -I : I) : 0;
                        i.x = L;
                        i.y = A;
                        i.z = O
                    }
                } else if ((!Tt || h.length === 0 || i.x !== h[4] || i.y !== h[5] || !i.rotationX && !i.rotationY) && !(i.x !== undefined && $(e, "display", t) === "none")) {
                    var Q = h.length >= 6,
                        G = Q ? h[0] : 1,
                        Y = h[1] || 0,
                        Z = h[2] || 0,
                        et = Q ? h[3] : 1;
                    i.x = h[4] || 0;
                    i.y = h[5] || 0;
                    m = Math.sqrt(G * G + Y * Y);
                    g = Math.sqrt(et * et + Z * Z);
                    y = G || Y ? Math.atan2(Y, G) : i.rotation || 0;
                    b = Z || et ? Math.atan2(Z, et) + y : i.skewX || 0;
                    w = m - Math.abs(i.scaleX || 0);
                    E = g - Math.abs(i.scaleY || 0);
                    if (Math.abs(b) > Math.PI / 2 && Math.abs(b) < Math.PI * 1.5) {
                        if (s) {
                            m *= -1;
                            b += y <= 0 ? Math.PI : -Math.PI;
                            y += y <= 0 ? Math.PI : -Math.PI
                        } else {
                            g *= -1;
                            b += b <= 0 ? Math.PI : -Math.PI
                        }
                    }
                    S = (y - i.rotation) % Math.PI;
                    T = (b - i.skewX) % Math.PI;
                    if (i.skewX === undefined || w > o || w < -o || E > o || E < -o || S > a && S < f && S * u | 0 !== 0 || T > a && T < f && T * u | 0 !== 0) {
                        i.scaleX = m;
                        i.scaleY = g;
                        i.rotation = y;
                        i.skewX = b
                    }
                    if (Tt) {
                        i.rotationX = i.rotationY = i.z = 0;
                        i.perspective = parseFloat(n.defaultTransformPerspective) || 0;
                        i.scaleZ = 1
                    }
                }
                i.zOrigin = l;
                for (p in i) {
                    if (i[p] < o)
                        if (i[p] > -o) {
                            i[p] = 0
                        }
                }
                if (r) {
                    e._gsTransform = i
                }
                return i
            },
            Ct = function(e) {
                var t = this.data,
                    n = -t.rotation,
                    r = n + t.skewX,
                    i = 1e5,
                    s = (Math.cos(n) * t.scaleX * i | 0) / i,
                    o = (Math.sin(n) * t.scaleX * i | 0) / i,
                    u = (Math.sin(r) * -t.scaleY * i | 0) / i,
                    a = (Math.cos(r) * t.scaleY * i | 0) / i,
                    f = this.t.style,
                    l = this.t.currentStyle,
                    c, h;
                if (!l) {
                    return
                }
                h = o;
                o = -u;
                u = -h;
                c = l.filter;
                f.filter = "";
                var v = this.t.offsetWidth,
                    m = this.t.offsetHeight,
                    g = l.position !== "absolute",
                    y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + s + ", M12=" + o + ", M21=" + u + ", M22=" + a,
                    b = t.x,
                    w = t.y,
                    E, S;
                if (t.ox != null) {
                    E = (t.oxp ? v * t.ox * .01 : t.ox) - v / 2;
                    S = (t.oyp ? m * t.oy * .01 : t.oy) - m / 2;
                    b += E - (E * s + S * o);
                    w += S - (E * u + S * a)
                }
                if (!g) {
                    var x = I < 8 ? 1 : -1,
                        N, C, k;
                    E = t.ieOffsetX || 0;
                    S = t.ieOffsetY || 0;
                    t.ieOffsetX = Math.round((v - ((s < 0 ? -s : s) * v + (o < 0 ? -o : o) * m)) / 2 + b);
                    t.ieOffsetY = Math.round((m - ((a < 0 ? -a : a) * m + (u < 0 ? -u : u) * v)) / 2 + w);
                    for (mt = 0; mt < 4; mt++) {
                        C = Z[mt];
                        N = l[C];
                        h = N.indexOf("px") !== -1 ? parseFloat(N) : J(this.t, C, parseFloat(N), N.replace(p, "")) || 0;
                        if (h !== t[C]) {
                            k = mt < 2 ? -t.ieOffsetX : -t.ieOffsetY
                        } else {
                            k = mt < 2 ? E - t.ieOffsetX : S - t.ieOffsetY
                        }
                        f[C] = (t[C] = Math.round(h - k * (mt === 0 || mt === 2 ? 1 : x))) + "px"
                    }
                    y += ", sizingMethod='auto expand')"
                } else {
                    E = v / 2;
                    S = m / 2;
                    y += ", Dx=" + (E - (E * s + S * o) + b) + ", Dy=" + (S - (E * u + S * a) + w) + ")"
                }
                if (c.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                    f.filter = c.replace(T, y)
                } else {
                    f.filter = y + " " + c
                }
                if (e === 0 || e === 1)
                    if (s === 1)
                        if (o === 0)
                            if (u === 0)
                                if (a === 1)
                                    if (!g || y.indexOf("Dx=0, Dy=0") !== -1)
                                        if (!d.test(c) || parseFloat(RegExp.$1) === 100)
                                            if (c.indexOf("gradient(") === -1) {
                                                f.removeAttribute("filter")
                                            }
            },
            kt = function(e) {
                var t = this.data,
                    n = this.t.style,
                    r = t.perspective,
                    i = t.scaleX,
                    s = 0,
                    o = 0,
                    u = 0,
                    a = 0,
                    f = t.scaleY,
                    l = 0,
                    c = 0,
                    h = 0,
                    p = 0,
                    d = t.scaleZ,
                    v = 0,
                    m = 0,
                    g = 0,
                    y = r ? -1 / r : 0,
                    b = t.rotation,
                    w = t.zOrigin,
                    E = 1e5,
                    S, x, T, N, C, k, L, A, O;
                if (j) {
                    L = n.top ? "top" : n.bottom ? "bottom" : parseFloat($(this.t, "top", null, false)) ? "bottom" : "top";
                    T = $(this.t, L, null, false);
                    A = parseFloat(T) || 0;
                    O = T.substr((A + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    n[L] = (t._ffFix ? A + .05 : A - .05) + O
                }
                if (b || t.skewX) {
                    T = i * Math.cos(b);
                    N = f * Math.sin(b);
                    b -= t.skewX;
                    s = i * -Math.sin(b);
                    f = f * Math.cos(b);
                    i = T;
                    a = N
                }
                b = t.rotationY;
                if (b) {
                    S = Math.cos(b);
                    x = Math.sin(b);
                    T = i * S;
                    N = a * S;
                    C = d * -x;
                    k = y * -x;
                    o = i * x;
                    l = a * x;
                    d = d * S;
                    y *= S;
                    i = T;
                    a = N;
                    h = C;
                    m = k
                }
                b = t.rotationX;
                if (b) {
                    S = Math.cos(b);
                    x = Math.sin(b);
                    T = s * S + o * x;
                    N = f * S + l * x;
                    C = p * S + d * x;
                    k = g * S + y * x;
                    o = s * -x + o * S;
                    l = f * -x + l * S;
                    d = p * -x + d * S;
                    y = g * -x + y * S;
                    s = T;
                    f = N;
                    p = C;
                    g = k
                }
                if (w) {
                    v -= w;
                    u = o * v;
                    c = l * v;
                    v = d * v + w
                }
                u = (T = (u += t.x) - (u |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + u : u;
                c = (T = (c += t.y) - (c |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + c : c;
                v = (T = (v += t.z) - (v |= 0)) ? (T * E + (T < 0 ? -.5 : .5) | 0) / E + v : v;
                n[Et] = "matrix3d(" + [(i * E | 0) / E, (a * E | 0) / E, (h * E | 0) / E, (m * E | 0) / E, (s * E | 0) / E, (f * E | 0) / E, (p * E | 0) / E, (g * E | 0) / E, (o * E | 0) / E, (l * E | 0) / E, (d * E | 0) / E, (y * E | 0) / E, u, c, v, r ? 1 + -v / r : 1].join(",") + ")"
            },
            Lt = function(e) {
                var t = this.data,
                    n = this.t,
                    r = n.style,
                    i, s, o, u, a, f, l, c, h;
                if (j) {
                    i = r.top ? "top" : r.bottom ? "bottom" : parseFloat($(n, "top", null, false)) ? "bottom" : "top";
                    s = $(n, i, null, false);
                    o = parseFloat(s) || 0;
                    u = s.substr((o + "").length) || "px";
                    t._ffFix = !t._ffFix;
                    r[i] = (t._ffFix ? o + .05 : o - .05) + u
                }
                if (!t.rotation && !t.skewX) {
                    r[Et] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")"
                } else {
                    a = t.rotation;
                    f = a - t.skewX;
                    l = 1e5;
                    c = t.scaleX * l;
                    h = t.scaleY * l;
                    r[Et] = "matrix(" + (Math.cos(a) * c | 0) / l + "," + (Math.sin(a) * c | 0) / l + "," + (Math.sin(f) * -h | 0) / l + "," + (Math.cos(f) * h | 0) / l + "," + t.x + "," + t.y + ")"
                }
            };
        yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {
            parser: function(e, t, n, r, i, o, u) {
                if (r._transform) {
                    return i
                }
                var a = r._transform = Nt(e, s, true),
                    f = e.style,
                    l = 1e-6,
                    c = wt.length,
                    h = u,
                    p = {},
                    d, v, m, g, y, b, w;
                if (typeof h.transform === "string" && Et) {
                    m = f.cssText;
                    f[Et] = h.transform;
                    f.display = "block";
                    d = Nt(e, null, false);
                    f.cssText = m
                } else if (typeof h === "object") {
                    d = {
                        scaleX: rt(h.scaleX != null ? h.scaleX : h.scale, a.scaleX),
                        scaleY: rt(h.scaleY != null ? h.scaleY : h.scale, a.scaleY),
                        scaleZ: rt(h.scaleZ != null ? h.scaleZ : h.scale, a.scaleZ),
                        x: rt(h.x, a.x),
                        y: rt(h.y, a.y),
                        z: rt(h.z, a.z),
                        perspective: rt(h.transformPerspective, a.perspective)
                    };
                    w = h.directionalRotation;
                    if (w != null) {
                        if (typeof w === "object") {
                            for (m in w) {
                                h[m] = w[m]
                            }
                        } else {
                            h.rotation = w
                        }
                    }
                    d.rotation = it("rotation" in h ? h.rotation : "shortRotation" in h ? h.shortRotation + "_short" : "rotationZ" in h ? h.rotationZ : a.rotation * k, a.rotation, "rotation", p);
                    if (Tt) {
                        d.rotationX = it("rotationX" in h ? h.rotationX : "shortRotationX" in h ? h.shortRotationX + "_short" : a.rotationX * k || 0, a.rotationX, "rotationX", p);
                        d.rotationY = it("rotationY" in h ? h.rotationY : "shortRotationY" in h ? h.shortRotationY + "_short" : a.rotationY * k || 0, a.rotationY, "rotationY", p)
                    }
                    d.skewX = h.skewX == null ? a.skewX : it(h.skewX, a.skewX);
                    d.skewY = h.skewY == null ? a.skewY : it(h.skewY, a.skewY);
                    if (v = d.skewY - a.skewY) {
                        d.skewX += v;
                        d.rotation += v
                    }
                }
                y = a.z || a.rotationX || a.rotationY || d.z || d.rotationX || d.rotationY || d.perspective;
                if (!y && h.scale != null) {
                    d.scaleZ = 1
                }
                while (--c > -1) {
                    n = wt[c];
                    g = d[n] - a[n];
                    if (g > l || g < -l || L[n] != null) {
                        b = true;
                        i = new dt(a, n, a[n], g, i);
                        if (n in p) {
                            i.e = p[n]
                        }
                        i.xs0 = 0;
                        i.plugin = o;
                        r._overwriteProps.push(i.n)
                    }
                }
                g = h.transformOrigin;
                if (g || Tt && y && a.zOrigin) {
                    if (Et) {
                        b = true;
                        g = (g || $(e, n, s, false, "50% 50%")) + "";
                        n = xt;
                        i = new dt(f, n, 0, 0, i, -1, "css_transformOrigin");
                        i.b = f[n];
                        i.plugin = o;
                        if (Tt) {
                            m = a.zOrigin;
                            g = g.split(" ");
                            a.zOrigin = (g.length > 2 ? parseFloat(g[2]) : m) || 0;
                            i.xs0 = i.e = f[n] = g[0] + " " + (g[1] || "50%") + " 0px";
                            i = new dt(a, "zOrigin", 0, 0, i, -1, i.n);
                            i.b = m;
                            i.xs0 = i.e = a.zOrigin
                        } else {
                            i.xs0 = i.e = f[n] = g
                        }
                    } else {
                        tt(g + "", a)
                    }
                }
                if (b) {
                    r._transformType = y || this._transformType === 3 ? 3 : 2
                }
                return i
            },
            prefix: true
        });
        yt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: true,
            color: true,
            multi: true,
            keyword: "inset"
        });
        yt("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, n, r, o, u) {
                t = this.format(t);
                var a = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    f = e.style,
                    l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
                y = parseFloat(e.offsetWidth);
                b = parseFloat(e.offsetHeight);
                l = t.split(" ");
                for (c = 0; c < a.length; c++) {
                    if (this.p.indexOf("border")) {
                        a[c] = X(a[c])
                    }
                    d = p = $(e, a[c], s, false, "0px");
                    if (d.indexOf(" ") !== -1) {
                        p = d.split(" ");
                        d = p[0];
                        p = p[1]
                    }
                    v = h = l[c];
                    m = parseFloat(d);
                    E = d.substr((m + "").length);
                    S = v.charAt(1) === "=";
                    if (S) {
                        g = parseInt(v.charAt(0) + "1", 10);
                        v = v.substr(2);
                        g *= parseFloat(v);
                        w = v.substr((g + "").length - (g < 0 ? 1 : 0)) || ""
                    } else {
                        g = parseFloat(v);
                        w = v.substr((g + "").length)
                    }
                    if (w === "") {
                        w = i[n] || E
                    }
                    if (w !== E) {
                        x = J(e, "borderLeft", m, E);
                        T = J(e, "borderTop", m, E);
                        if (w === "%") {
                            d = x / y * 100 + "%";
                            p = T / b * 100 + "%"
                        } else if (w === "em") {
                            N = J(e, "borderLeft", 1, "em");
                            d = x / N + "em";
                            p = T / N + "em"
                        } else {
                            d = x + "px";
                            p = T + "px"
                        }
                        if (S) {
                            v = parseFloat(d) + g + w;
                            h = parseFloat(p) + g + w
                        }
                    }
                    o = vt(f, a[c], d + " " + p, v + " " + h, false, "0px", o)
                }
                return o
            },
            prefix: true,
            formatter: ft("0px 0px 0px 0px", false, true)
        });
        yt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, n, r, i, o) {
                var u = "background-position",
                    a = s || V(e, null),
                    f = this.format((a ? I ? a.getPropertyValue(u + "-x") + " " + a.getPropertyValue(u + "-y") : a.getPropertyValue(u) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                    l = this.format(t),
                    c, h, p, d, v, m;
                if (f.indexOf("%") !== -1 !== (l.indexOf("%") !== -1)) {
                    m = $(e, "backgroundImage").replace(w, "");
                    if (m && m !== "none") {
                        c = f.split(" ");
                        h = l.split(" ");
                        M.setAttribute("src", m);
                        p = 2;
                        while (--p > -1) {
                            f = c[p];
                            d = f.indexOf("%") !== -1;
                            if (d !== (h[p].indexOf("%") !== -1)) {
                                v = p === 0 ? e.offsetWidth - M.width : e.offsetHeight - M.height;
                                c[p] = d ? parseFloat(f) / 100 * v + "px" : parseFloat(f) / v * 100 + "%"
                            }
                        }
                        f = c.join(" ")
                    }
                }
                return this.parseComplex(e.style, f, l, i, o)
            },
            formatter: tt
        });
        yt("backgroundSize", {
            defaultValue: "0 0",
            formatter: tt
        });
        yt("perspective", {
            defaultValue: "0px",
            prefix: true
        });
        yt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: true
        });
        yt("transformStyle", {
            prefix: true
        });
        yt("backfaceVisibility", {
            prefix: true
        });
        yt("margin", {
            parser: lt("marginTop,marginRight,marginBottom,marginLeft")
        });
        yt("padding", {
            parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        });
        yt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, n, r, i, o) {
                var u, a, f;
                if (I < 9) {
                    a = e.currentStyle;
                    f = I < 8 ? " " : ",";
                    u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")";
                    t = this.format(t).split(",").join(f)
                } else {
                    u = this.format($(e, this.p, s, false, this.dflt));
                    t = this.format(t)
                }
                return this.parseComplex(e.style, u, t, i, o)
            }
        });
        yt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: true,
            multi: true
        });
        yt("autoRound,strictUnits", {
            parser: function(e, t, n, r, i) {
                return i
            }
        });
        yt("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, n, r, i, o) {
                return this.parseComplex(e.style, this.format($(e, "borderTopWidth", s, false, "0px") + " " + $(e, "borderTopStyle", s, false, "solid") + " " + $(e, "borderTopColor", s, false, "#000")), this.format(t), i, o)
            },
            color: true,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(at) || ["#000"])[0]
            }
        });
        yt("float,cssFloat,styleFloat", {
            parser: function(e, t, n, r, i, s) {
                var o = e.style,
                    u = "cssFloat" in o ? "cssFloat" : "styleFloat";
                return new dt(o, u, 0, 0, i, -1, n, false, 0, o[u], t)
            }
        });
        var At = function(e) {
            var t = this.t,
                n = t.filter,
                r = this.s + this.c * e | 0,
                i;
            if (r === 100) {
                if (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1) {
                    t.removeAttribute("filter");
                    i = !$(this.data, "filter")
                } else {
                    t.filter = n.replace(m, "");
                    i = true
                }
            }
            if (!i) {
                if (this.xn1) {
                    t.filter = n = n || "alpha(opacity=100)"
                }
                if (n.indexOf("opacity") === -1) {
                    t.filter += " alpha(opacity=" + r + ")"
                } else {
                    t.filter = n.replace(d, "opacity=" + r)
                }
            }
        };
        yt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, n, r, i, o) {
                var u = parseFloat($(e, "opacity", s, false, "1")),
                    a = e.style,
                    f;
                t = parseFloat(t);
                if (n === "autoAlpha") {
                    f = $(e, "visibility", s);
                    if (u === 1 && f === "hidden" && t !== 0) {
                        u = 0
                    }
                    i = new dt(a, "visibility", 0, 0, i, -1, null, false, 0, u !== 0 ? "visible" : "hidden", t === 0 ? "hidden" : "visible");
                    i.xs0 = "visible";
                    r._overwriteProps.push(i.n)
                }
                if (q) {
                    i = new dt(a, "opacity", u, t - u, i)
                } else {
                    i = new dt(a, "opacity", u * 100, (t - u) * 100, i);
                    i.xn1 = n === "autoAlpha" ? 1 : 0;
                    a.zoom = 1;
                    i.type = 2;
                    i.b = "alpha(opacity=" + i.s + ")";
                    i.e = "alpha(opacity=" + (i.s + i.c) + ")";
                    i.data = e;
                    i.plugin = o;
                    i.setRatio = At
                }
                return i
            }
        });
        var Ot = function(e, t) {
                if (t) {
                    if (e.removeProperty) {
                        e.removeProperty(t.replace(y, "-$1").toLowerCase())
                    } else {
                        e.removeAttribute(t)
                    }
                }
            },
            Mt = function(e) {
                this.t._gsClassPT = this;
                if (e === 1 || e === 0) {
                    this.t.className = e === 0 ? this.b : this.e;
                    var t = this.data,
                        n = this.t.style;
                    while (t) {
                        if (!t.v) {
                            Ot(n, t.p)
                        } else {
                            n[t.p] = t.v
                        }
                        t = t._next
                    }
                    if (e === 1 && this.t._gsClassPT === this) {
                        this.t._gsClassPT = null
                    }
                } else if (this.t.className !== this.e) {
                    this.t.className = this.e
                }
            };
        yt("className", {
            parser: function(e, t, n, i, o, u, a) {
                var f = e.className,
                    l = e.style.cssText,
                    c, h, p, d, v;
                o = i._classNamePT = new dt(e, n, 0, 0, o, 2);
                o.setRatio = Mt;
                o.pr = -11;
                r = true;
                o.b = f;
                h = Q(e, s);
                p = e._gsClassPT;
                if (p) {
                    d = {};
                    v = p.data;
                    while (v) {
                        d[v.p] = 1;
                        v = v._next
                    }
                    p.setRatio(1)
                }
                e._gsClassPT = o;
                o.e = t.charAt(1) !== "=" ? t : f.replace(new RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + (t.charAt(0) === "+" ? " " + t.substr(2) : "");
                if (i._tween._duration) {
                    e.className = o.e;
                    c = G(e, h, Q(e), a, d);
                    e.className = f;
                    o.data = c.firstMPT;
                    e.style.cssText = l;
                    o = o.xfirst = i.parse(e, c.difs, o, u)
                }
                return o
            }
        });
        var _t = function(e) {
            if (e === 1 || e === 0)
                if (this.data._totalTime === this.data._totalDuration) {
                    var t = this.e === "all",
                        n = this.t.style,
                        r = t ? n.cssText.split(";") : this.e.split(","),
                        i = r.length,
                        s = u.transform.parse,
                        o;
                    while (--i > -1) {
                        o = r[i];
                        if (t) {
                            o = o.substr(0, o.indexOf(":")).split(" ").join("")
                        }
                        if (u[o]) {
                            o = u[o].parse === s ? Et : u[o].p
                        }
                        Ot(n, o)
                    }
                }
        };
        yt("clearProps", {
            parser: function(e, t, n, i, s) {
                s = new dt(e, n, 0, 0, s, 2);
                s.setRatio = _t;
                s.e = t;
                s.pr = -10;
                s.data = i._tween;
                r = true;
                return s
            }
        });
        a = "bezier,throwProps,physicsProps,physics2D".split(",");
        mt = a.length;
        while (mt--) {
            bt(a[mt])
        }
        a = n.prototype;
        a._firstPT = null;
        a._onInitTween = function(e, t, u) {
            if (!e.nodeType) {
                return false
            }
            this._target = e;
            this._tween = u;
            this._vars = t;
            P = t.autoRound;
            r = false;
            i = t.suffixMap || n.suffixMap;
            s = V(e, "");
            o = this._overwriteProps;
            var a = e.style,
                f, l, c, h, p, d, m, g, y;
            if (H)
                if (a.zIndex === "") {
                    f = $(e, "zIndex", s);
                    if (f === "auto" || f === "") {
                        a.zIndex = 0
                    }
                }
            if (typeof t === "string") {
                h = a.cssText;
                f = Q(e, s);
                a.cssText = h + ";" + t;
                f = G(e, f, Q(e)).difs;
                if (!q && v.test(t)) {
                    f.opacity = parseFloat(RegExp.$1)
                }
                t = f;
                a.cssText = h
            }
            this._firstPT = l = this.parse(e, t, null);
            if (this._transformType) {
                y = this._transformType === 3;
                if (!Et) {
                    a.zoom = 1
                } else if (B) {
                    H = true;
                    if (a.zIndex === "") {
                        m = $(e, "zIndex", s);
                        if (m === "auto" || m === "") {
                            a.zIndex = 0
                        }
                    }
                    if (F) {
                        a.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (y ? "visible" : "hidden")
                    }
                }
                c = l;
                while (c && c._next) {
                    c = c._next
                }
                g = new dt(e, "transform", 0, 0, null, 2);
                this._linkCSSP(g, null, c);
                g.setRatio = y && Tt ? kt : Et ? Lt : Ct;
                g.data = this._transform || Nt(e, s, true);
                o.pop()
            }
            if (r) {
                while (l) {
                    d = l._next;
                    c = h;
                    while (c && c.pr > l.pr) {
                        c = c._next
                    }
                    if (l._prev = c ? c._prev : p) {
                        l._prev._next = l
                    } else {
                        h = l
                    }
                    if (l._next = c) {
                        c._prev = l
                    } else {
                        p = l
                    }
                    l = d
                }
                this._firstPT = h
            }
            return true
        };
        a.parse = function(e, t, n, r) {
            var o = e.style,
                a, f, l, c, h, d, v, m, y, b;
            for (a in t) {
                d = t[a];
                f = u[a];
                if (f) {
                    n = f.parse(e, d, a, this, n, r, t)
                } else {
                    h = $(e, a, s) + "";
                    y = typeof d === "string";
                    if (a === "color" || a === "fill" || a === "stroke" || a.indexOf("Color") !== -1 || y && g.test(d)) {
                        if (!y) {
                            d = ut(d);
                            d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"
                        }
                        n = vt(o, a, h, d, true, "transparent", n, 0, r)
                    } else if (y && (d.indexOf(" ") !== -1 || d.indexOf(",") !== -1)) {
                        n = vt(o, a, h, d, true, null, n, 0, r)
                    } else {
                        l = parseFloat(h);
                        v = l || l === 0 ? h.substr((l + "").length) : "";
                        if (h === "" || h === "auto") {
                            if (a === "width" || a === "height") {
                                l = et(e, a, s);
                                v = "px"
                            } else if (a === "left" || a === "top") {
                                l = K(e, a, s);
                                v = "px"
                            } else {
                                l = a !== "opacity" ? 0 : 1;
                                v = ""
                            }
                        }
                        b = y && d.charAt(1) === "=";
                        if (b) {
                            c = parseInt(d.charAt(0) + "1", 10);
                            d = d.substr(2);
                            c *= parseFloat(d);
                            m = d.replace(p, "")
                        } else {
                            c = parseFloat(d);
                            m = y ? d.substr((c + "").length) || "" : ""
                        }
                        if (m === "") {
                            m = i[a] || v
                        }
                        d = c || c === 0 ? (b ? c + l : c) + m : t[a];
                        if (v !== m)
                            if (m !== "")
                                if (c || c === 0)
                                    if (l || l === 0) {
                                        l = J(e, a, l, v);
                                        if (m === "%") {
                                            l /= J(e, a, 100, "%") / 100;
                                            if (l > 100) {
                                                l = 100
                                            }
                                            if (t.strictUnits !== true) {
                                                h = l + "%"
                                            }
                                        } else if (m === "em") {
                                            l /= J(e, a, 1, "em")
                                        } else {
                                            c = J(e, a, c, m);
                                            m = "px"
                                        }
                                        if (b)
                                            if (c || c === 0) {
                                                d = c + l + m
                                            }
                                    }
                        if (b) {
                            c += l
                        }
                        if ((l || l === 0) && (c || c === 0)) {
                            n = new dt(o, a, l, c - l, n, 0, "css_" + a, P !== false && (m === "px" || a === "zIndex"), 0, h, d);
                            n.xs0 = m
                        } else if (o[a] === undefined || !d && (d + "" === "NaN" || d == null)) {
                            U("invalid " + a + " tween value: " + t[a])
                        } else {
                            n = new dt(o, a, c || l || 0, 0, n, -1, "css_" + a, false, 0, h, d);
                            n.xs0 = d === "none" && (a === "display" || a.indexOf("Style") !== -1) ? h : d
                        }
                    }
                }
                if (r)
                    if (n && !n.plugin) {
                        n.plugin = r
                    }
            }
            return n
        };
        a.setRatio = function(e) {
            var t = this._firstPT,
                n = 1e-6,
                r, i, s;
            if (e === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (t) {
                    if (t.type !== 2) {
                        t.t[t.p] = t.e
                    } else {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            } else if (e || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -1e-6) {
                while (t) {
                    r = t.c * e + t.s;
                    if (t.r) {
                        r = r > 0 ? r + .5 | 0 : r - .5 | 0
                    } else if (r < n)
                        if (r > -n) {
                            r = 0
                        }
                    if (!t.type) {
                        t.t[t.p] = r + t.xs0
                    } else if (t.type === 1) {
                        s = t.l;
                        if (s === 2) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2
                        } else if (s === 3) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3
                        } else if (s === 4) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4
                        } else if (s === 5) {
                            t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4 + t.xn4 + t.xs5
                        } else {
                            i = t.xs0 + r + t.xs1;
                            for (s = 1; s < t.l; s++) {
                                i += t["xn" + s] + t["xs" + (s + 1)]
                            }
                            t.t[t.p] = i
                        }
                    } else if (t.type === -1) {
                        t.t[t.p] = t.xs0
                    } else if (t.setRatio) {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            } else {
                while (t) {
                    if (t.type !== 2) {
                        t.t[t.p] = t.b
                    } else {
                        t.setRatio(e)
                    }
                    t = t._next
                }
            }
        };
        a._enableTransforms = function(e) {
            this._transformType = e || this._transformType === 3 ? 3 : 2
        };
        a._linkCSSP = function(e, t, n, r) {
            if (e) {
                if (t) {
                    t._prev = e
                }
                if (e._next) {
                    e._next._prev = e._prev
                }
                if (n) {
                    n._next = e
                } else if (!r && this._firstPT === null) {
                    this._firstPT = e
                }
                if (e._prev) {
                    e._prev._next = e._next
                } else if (this._firstPT === e) {
                    this._firstPT = e._next
                }
                e._next = t;
                e._prev = n
            }
            return e
        };
        a._kill = function(t) {
            var n = t,
                r, i, s;
            if (t.css_autoAlpha || t.css_alpha) {
                n = {};
                for (i in t) {
                    n[i] = t[i]
                }
                n.css_opacity = 1;
                if (n.css_autoAlpha) {
                    n.css_visibility = 1
                }
            }
            if (t.css_className && (r = this._classNamePT)) {
                s = r.xfirst;
                if (s && s._prev) {
                    this._linkCSSP(s._prev, r._next, s._prev._prev)
                } else if (s === this._firstPT) {
                    this._firstPT = r._next
                }
                if (r._next) {
                    this._linkCSSP(r._next, r._next._next, s._prev)
                }
                this._classNamePT = null
            }
            return e.prototype._kill.call(this, n)
        };
        var Dt = function(e, t, n) {
            var r, i, s, o;
            if (e.slice) {
                i = e.length;
                while (--i > -1) {
                    Dt(e[i], t, n)
                }
                return
            }
            r = e.childNodes;
            i = r.length;
            while (--i > -1) {
                s = r[i];
                o = s.type;
                if (s.style) {
                    t.push(Q(s));
                    if (n) {
                        n.push(s)
                    }
                }
                if ((o === 1 || o === 9 || o === 11) && s.childNodes.length) {
                    Dt(s, t, n)
                }
            }
        };
        n.cascadeTo = function(e, n, r) {
            var i = t.to(e, n, r),
                s = [i],
                o = [],
                u = [],
                a = [],
                f = t._internals.reservedProps,
                l, c, h;
            e = i._targets || i.target;
            Dt(e, o, a);
            i.render(n, true);
            Dt(e, u);
            i.render(0, true);
            i._enabled(true);
            l = a.length;
            while (--l > -1) {
                c = G(a[l], o[l], u[l]);
                if (c.firstMPT) {
                    c = c.difs;
                    for (h in r) {
                        if (f[h]) {
                            c[h] = r[h]
                        }
                    }
                    s.push(t.to(a[l], n, c))
                }
            }
            return s
        };
        e.activate([n]);
        return n
    }, true);
    (function() {
        var e = window._gsDefine.plugin({
                propName: "roundProps",
                priority: -1,
                API: 2,
                init: function(e, t, n) {
                    this._tween = n;
                    return true
                }
            }),
            t = e.prototype;
        t._onInitAllProps = function() {
            var e = this._tween,
                t = e.vars.roundProps instanceof Array ? e.vars.roundProps : e.vars.roundProps.split(","),
                n = t.length,
                r = {},
                i = e._propLookup.roundProps,
                s, o, u;
            while (--n > -1) {
                r[t[n]] = 1
            }
            n = t.length;
            while (--n > -1) {
                s = t[n];
                o = e._firstPT;
                while (o) {
                    u = o._next;
                    if (o.pg) {
                        o.t._roundProps(r, true)
                    } else if (o.n === s) {
                        this._add(o.t, s, o.s, o.c);
                        if (u) {
                            u._prev = o._prev
                        }
                        if (o._prev) {
                            o._prev._next = u
                        } else if (e._firstPT === o) {
                            e._firstPT = u
                        }
                        o._next = o._prev = null;
                        e._propLookup[s] = i
                    }
                    o = u
                }
            }
            return false
        };
        t._add = function(e, t, n, r) {
            this._addTween(e, t, n, n + r, t, true);
            this._overwriteProps.push(t)
        }
    })();
    window._gsDefine.plugin({
        propName: "attr",
        API: 2,
        init: function(e, t, n) {
            var r;
            if (typeof e.setAttribute !== "function") {
                return false
            }
            this._target = e;
            this._proxy = {};
            for (r in t) {
                this._addTween(this._proxy, r, parseFloat(e.getAttribute(r)), t[r], r);
                this._overwriteProps.push(r)
            }
            return true
        },
        set: function(e) {
            this._super.setRatio.call(this, e);
            var t = this._overwriteProps,
                n = t.length,
                r;
            while (--n > -1) {
                r = t[n];
                this._target.setAttribute(r, this._proxy[r] + "")
            }
        }
    });
    window._gsDefine.plugin({
        propName: "directionalRotation",
        API: 2,
        init: function(e, t, n) {
            if (typeof t !== "object") {
                t = {
                    rotation: t
                }
            }
            this.finals = {};
            var r = t.useRadians === true ? Math.PI * 2 : 360,
                i = 1e-6,
                s, o, u, a, f, l;
            for (s in t) {
                if (s !== "useRadians") {
                    l = (t[s] + "").split("_");
                    o = l[0];
                    u = parseFloat(typeof e[s] !== "function" ? e[s] : e[s.indexOf("set") || typeof e["get" + s.substr(3)] !== "function" ? s : "get" + s.substr(3)]());
                    a = this.finals[s] = typeof o === "string" && o.charAt(1) === "=" ? u + parseInt(o.charAt(0) + "1", 10) * Number(o.substr(2)) : Number(o) || 0;
                    f = a - u;
                    if (l.length) {
                        o = l.join("_");
                        if (o.indexOf("short") !== -1) {
                            f = f % r;
                            if (f !== f % (r / 2)) {
                                f = f < 0 ? f + r : f - r
                            }
                        }
                        if (o.indexOf("_cw") !== -1 && f < 0) {
                            f = (f + r * 9999999999) % r - (f / r | 0) * r
                        } else if (o.indexOf("ccw") !== -1 && f > 0) {
                            f = (f - r * 9999999999) % r - (f / r | 0) * r
                        }
                    }
                    if (f > i || f < -i) {
                        this._addTween(e, s, u, u + f, s);
                        this._overwriteProps.push(s)
                    }
                }
            }
            return true
        },
        set: function(e) {
            var t;
            if (e !== 1) {
                this._super.setRatio.call(this, e)
            } else {
                t = this._firstPT;
                while (t) {
                    if (t.f) {
                        t.t[t.p](this.finals[t.p])
                    } else {
                        t.t[t.p] = this.finals[t.p]
                    }
                    t = t._next
                }
            }
        }
    })._autoCSS = true;
    window._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t = window.GreenSockGlobals || window,
            n = t.com.greensock,
            r = Math.PI * 2,
            i = Math.PI / 2,
            s = n._class,
            o = function(t, n) {
                var r = s("easing." + t, function() {}, true),
                    i = r.prototype = new e;
                i.constructor = r;
                i.getRatio = n;
                return r
            },
            u = e.register || function() {},
            a = function(e, t, n, r, i) {
                var o = s("easing." + e, {
                    easeOut: new t,
                    easeIn: new n,
                    easeInOut: new r
                }, true);
                u(o, e);
                return o
            },
            f = function(e, t, n) {
                this.t = e;
                this.v = t;
                if (n) {
                    this.next = n;
                    n.prev = this;
                    this.c = n.v - t;
                    this.gap = n.t - e
                }
            },
            l = function(t, n) {
                var r = s("easing." + t, function(e) {
                        this._p1 = e || e === 0 ? e : 1.70158;
                        this._p2 = this._p1 * 1.525
                    }, true),
                    i = r.prototype = new e;
                i.constructor = r;
                i.getRatio = n;
                i.config = function(e) {
                    return new r(e)
                };
                return r
            },
            c = a("Back", l("BackOut", function(e) {
                return (e = e - 1) * e * ((this._p1 + 1) * e + this._p1) + 1
            }), l("BackIn", function(e) {
                return e * e * ((this._p1 + 1) * e - this._p1)
            }), l("BackInOut", function(e) {
                return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
            })),
            h = s("easing.SlowMo", function(e, t, n) {
                t = t || t === 0 ? t : .7;
                if (e == null) {
                    e = .7
                } else if (e > 1) {
                    e = 1
                }
                this._p = e !== 1 ? t : 0;
                this._p1 = (1 - e) / 2;
                this._p2 = e;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = n === true
            }, true),
            p = h.prototype = new e,
            d, v, m;
        p.constructor = h;
        p.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            if (e < this._p1) {
                return this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t
            } else if (e > this._p3) {
                return this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e
            }
            return this._calcEnd ? 1 : t
        };
        h.ease = new h(.7, .7);
        p.config = h.config = function(e, t, n) {
            return new h(e, t, n)
        };
        d = s("easing.SteppedEase", function(e) {
            e = e || 1;
            this._p1 = 1 / e;
            this._p2 = e + 1
        }, true);
        p = d.prototype = new e;
        p.constructor = d;
        p.getRatio = function(e) {
            if (e < 0) {
                e = 0
            } else if (e >= 1) {
                e = .999999999
            }
            return (this._p2 * e >> 0) * this._p1
        };
        p.config = d.config = function(e) {
            return new d(e)
        };
        v = s("easing.RoughEase", function(t) {
            t = t || {};
            var n = t.taper || "none",
                r = [],
                i = 0,
                s = (t.points || 20) | 0,
                o = s,
                u = t.randomize !== false,
                a = t.clamp === true,
                l = t.template instanceof e ? t.template : null,
                c = typeof t.strength === "number" ? t.strength * .4 : .4,
                h, p, d, v, m, g;
            while (--o > -1) {
                h = u ? Math.random() : 1 / s * o;
                p = l ? l.getRatio(h) : h;
                if (n === "none") {
                    d = c
                } else if (n === "out") {
                    v = 1 - h;
                    d = v * v * c
                } else if (n === "in") {
                    d = h * h * c
                } else if (h < .5) {
                    v = h * 2;
                    d = v * v * .5 * c
                } else {
                    v = (1 - h) * 2;
                    d = v * v * .5 * c
                }
                if (u) {
                    p += Math.random() * d - d * .5
                } else if (o % 2) {
                    p += d * .5
                } else {
                    p -= d * .5
                }
                if (a) {
                    if (p > 1) {
                        p = 1
                    } else if (p < 0) {
                        p = 0
                    }
                }
                r[i++] = {
                    x: h,
                    y: p
                }
            }
            r.sort(function(e, t) {
                return e.x - t.x
            });
            g = new f(1, 1, null);
            o = s;
            while (--o > -1) {
                m = r[o];
                g = new f(m.x, m.y, g)
            }
            this._prev = new f(0, 0, g.t !== 0 ? g : g.next)
        }, true);
        p = v.prototype = new e;
        p.constructor = v;
        p.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                while (t.next && e >= t.t) {
                    t = t.next
                }
                t = t.prev
            } else {
                while (t.prev && e <= t.t) {
                    t = t.prev
                }
            }
            this._prev = t;
            return t.v + (e - t.t) / t.gap * t.c
        };
        p.config = function(e) {
            return new v(e)
        };
        v.ease = new v;
        a("Bounce", o("BounceOut", function(e) {
            if (e < 1 / 2.75) {
                return 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                return 7.5625 * (e -= 1.5 / 2.75) * e + .75
            } else if (e < 2.5 / 2.75) {
                return 7.5625 * (e -= 2.25 / 2.75) * e + .9375
            }
            return 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), o("BounceIn", function(e) {
            if ((e = 1 - e) < 1 / 2.75) {
                return 1 - 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                return 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75)
            } else if (e < 2.5 / 2.75) {
                return 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375)
            }
            return 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), o("BounceInOut", function(e) {
            var t = e < .5;
            if (t) {
                e = 1 - e * 2
            } else {
                e = e * 2 - 1
            }
            if (e < 1 / 2.75) {
                e = 7.5625 * e * e
            } else if (e < 2 / 2.75) {
                e = 7.5625 * (e -= 1.5 / 2.75) * e + .75
            } else if (e < 2.5 / 2.75) {
                e = 7.5625 * (e -= 2.25 / 2.75) * e + .9375
            } else {
                e = 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            }
            return t ? (1 - e) * .5 : e * .5 + .5
        }));
        a("Circ", o("CircOut", function(e) {
            return Math.sqrt(1 - (e = e - 1) * e)
        }), o("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), o("CircInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }));
        m = function(t, n, i) {
            var o = s("easing." + t, function(e, t) {
                    this._p1 = e || 1;
                    this._p2 = t || i;
                    this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
                }, true),
                u = o.prototype = new e;
            u.constructor = o;
            u.getRatio = n;
            u.config = function(e, t) {
                return new o(e, t)
            };
            return o
        };
        a("Elastic", m("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * r / this._p2) + 1
        }, .3), m("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2))
        }, .3), m("ElasticInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) * .5 + 1
        }, .45));
        a("Expo", o("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), o("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), o("ExpoInOut", function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        }));
        a("Sine", o("SineOut", function(e) {
            return Math.sin(e * i)
        }), o("SineIn", function(e) {
            return -Math.cos(e * i) + 1
        }), o("SineInOut", function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }));
        s("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, true);
        u(t.SlowMo, "SlowMo", "ease,");
        u(v, "RoughEase", "ease,");
        u(d, "SteppedEase", "ease,");
        return c
    }, true)
});
(function(e) {
    "use strict";
    var t = e.GreenSockGlobals || e,
        n = function(e) {
            var n = e.split("."),
                r = t,
                i;
            for (i = 0; i < n.length; i++) {
                r[n[i]] = r = r[n[i]] || {}
            }
            return r
        },
        r = n("com.greensock"),
        i = [].slice,
        s = function() {},
        o, u, a, f, l, c = {},
        h = function(r, i, s, o) {
            this.sc = c[r] ? c[r].sc : [];
            c[r] = this;
            this.gsClass = null;
            this.func = s;
            var u = [];
            this.check = function(a) {
                var f = i.length,
                    l = f,
                    p, d, v, m;
                while (--f > -1) {
                    if ((p = c[i[f]] || new h(i[f], [])).gsClass) {
                        u[f] = p.gsClass;
                        l--
                    } else if (a) {
                        p.sc.push(this)
                    }
                }
                if (l === 0 && s) {
                    d = ("com.greensock." + r).split(".");
                    v = d.pop();
                    m = n(d.join("."))[v] = this.gsClass = s.apply(s, u);
                    if (o) {
                        t[v] = m;
                        if (typeof define === "function" && define.amd) {
                            define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").join("/"), [], function() {
                                return m
                            })
                        } else if (typeof module !== "undefined" && module.exports) {
                            module.exports = m
                        }
                    }
                    for (f = 0; f < this.sc.length; f++) {
                        this.sc[f].check()
                    }
                }
            };
            this.check(true)
        },
        p = e._gsDefine = function(e, t, n, r) {
            return new h(e, t, n, r)
        },
        d = r._class = function(e, t, n) {
            t = t || function() {};
            p(e, [], function() {
                return t
            }, n);
            return t
        };
    p.globals = t;
    var v = [0, 0, 1, 1],
        m = [],
        g = d("easing.Ease", function(e, t, n, r) {
            this._func = e;
            this._type = n || 0;
            this._power = r || 0;
            this._params = t ? v.concat(t) : v
        }, true),
        y = g.map = {},
        b = g.register = function(e, t, n, i) {
            var s = t.split(","),
                o = s.length,
                u = (n || "easeIn,easeOut,easeInOut").split(","),
                a, f, l, c;
            while (--o > -1) {
                f = s[o];
                a = i ? d("easing." + f, null, true) : r.easing[f] || {};
                l = u.length;
                while (--l > -1) {
                    c = u[l];
                    y[f + "." + c] = y[c + f] = a[c] = e.getRatio ? e : e[c] || new e
                }
            }
        };
    a = g.prototype;
    a._calcEnd = false;
    a.getRatio = function(e) {
        if (this._func) {
            this._params[0] = e;
            return this._func.apply(null, this._params)
        }
        var t = this._type,
            n = this._power,
            r = t === 1 ? 1 - e : t === 2 ? e : e < .5 ? e * 2 : (1 - e) * 2;
        if (n === 1) {
            r *= r
        } else if (n === 2) {
            r *= r * r
        } else if (n === 3) {
            r *= r * r * r
        } else if (n === 4) {
            r *= r * r * r * r
        }
        return t === 1 ? 1 - r : t === 2 ? r : e < .5 ? r / 2 : 1 - r / 2
    };
    o = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
    u = o.length;
    while (--u > -1) {
        a = o[u] + ",Power" + u;
        b(new g(null, null, 1, u), a, "easeOut", true);
        b(new g(null, null, 2, u), a, "easeIn" + (u === 0 ? ",easeNone" : ""));
        b(new g(null, null, 3, u), a, "easeInOut")
    }
    y.linear = r.easing.Linear.easeIn;
    y.swing = r.easing.Quad.easeInOut;
    var w = d("events.EventDispatcher", function(e) {
        this._listeners = {};
        this._eventTarget = e || this
    });
    a = w.prototype;
    a.addEventListener = function(e, t, n, r, i) {
        i = i || 0;
        var s = this._listeners[e],
            o = 0,
            u, a;
        if (s == null) {
            this._listeners[e] = s = []
        }
        a = s.length;
        while (--a > -1) {
            u = s[a];
            if (u.c === t && u.s === n) {
                s.splice(a, 1)
            } else if (o === 0 && u.pr < i) {
                o = a + 1
            }
        }
        s.splice(o, 0, {
            c: t,
            s: n,
            up: r,
            pr: i
        });
        if (this === f && !l) {
            f.wake()
        }
    };
    a.removeEventListener = function(e, t) {
        var n = this._listeners[e],
            r;
        if (n) {
            r = n.length;
            while (--r > -1) {
                if (n[r].c === t) {
                    n.splice(r, 1);
                    return
                }
            }
        }
    };
    a.dispatchEvent = function(e) {
        var t = this._listeners[e],
            n, r, i;
        if (t) {
            n = t.length;
            r = this._eventTarget;
            while (--n > -1) {
                i = t[n];
                if (i.up) {
                    i.c.call(i.s || r, {
                        type: e,
                        target: r
                    })
                } else {
                    i.c.call(i.s || r)
                }
            }
        }
    };
    var E = e.requestAnimationFrame,
        S = e.cancelAnimationFrame,
        x = Date.now || function() {
            return (new Date).getTime()
        };
    o = ["ms", "moz", "webkit", "o"];
    u = o.length;
    while (--u > -1 && !E) {
        E = e[o[u] + "RequestAnimationFrame"];
        S = e[o[u] + "CancelAnimationFrame"] || e[o[u] + "CancelRequestAnimationFrame"]
    }
    d("Ticker", function(e, t) {
        var n = this,
            r = x(),
            i = t !== false && E,
            o, u, a, c, h, p = function(e) {
                n.time = (x() - r) / 1e3;
                var t = a,
                    i = n.time - h;
                if (!o || i > 0 || e === true) {
                    n.frame++;
                    h += i + (i >= c ? .004 : c - i);
                    n.dispatchEvent("tick")
                }
                if (e !== true && t === a) {
                    a = u(p)
                }
            };
        w.call(n);
        this.time = this.frame = 0;
        this.tick = function() {
            p(true)
        };
        this.sleep = function() {
            if (a == null) {
                return
            }
            if (!i || !S) {
                clearTimeout(a)
            } else {
                S(a)
            }
            u = s;
            a = null;
            if (n === f) {
                l = false
            }
        };
        this.wake = function() {
            if (a !== null) {
                n.sleep()
            }
            u = o === 0 ? s : !i || !E ? function(e) {
                return setTimeout(e, (h - n.time) * 1e3 + 1 | 0)
            } : E;
            if (n === f) {
                l = true
            }
            p(2)
        };
        this.fps = function(e) {
            if (!arguments.length) {
                return o
            }
            o = e;
            c = 1 / (o || 60);
            h = this.time + c;
            n.wake()
        };
        this.useRAF = function(e) {
            if (!arguments.length) {
                return i
            }
            n.sleep();
            i = e;
            n.fps(o)
        };
        n.fps(e);
        setTimeout(function() {
            if (i && (!a || n.frame < 5)) {
                n.useRAF(false)
            }
        }, 1500)
    });
    a = r.Ticker.prototype = new r.events.EventDispatcher;
    a.constructor = r.Ticker;
    var T = d("core.Animation", function(e, t) {
        this.vars = t || {};
        this._duration = this._totalDuration = e || 0;
        this._delay = Number(this.vars.delay) || 0;
        this._timeScale = 1;
        this._active = this.vars.immediateRender === true;
        this.data = this.vars.data;
        this._reversed = this.vars.reversed === true;
        if (!B) {
            return
        }
        if (!l) {
            f.wake()
        }
        var n = this.vars.useFrames ? H : B;
        n.add(this, n._time);
        if (this.vars.paused) {
            this.paused(true)
        }
    });
    f = T.ticker = new r.Ticker;
    a = T.prototype;
    a._dirty = a._gc = a._initted = a._paused = false;
    a._totalTime = a._time = 0;
    a._rawPrevTime = -1;
    a._next = a._last = a._onUpdate = a._timeline = a.timeline = null;
    a._paused = false;
    a.play = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.reversed(false).paused(false)
    };
    a.pause = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(true)
    };
    a.resume = function(e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(false)
    };
    a.seek = function(e, t) {
        return this.totalTime(Number(e), t !== false)
    };
    a.restart = function(e, t) {
        return this.reversed(false).paused(false).totalTime(e ? -this._delay : 0, t !== false, true)
    };
    a.reverse = function(e, t) {
        if (arguments.length) {
            this.seek(e || this.totalDuration(), t)
        }
        return this.reversed(true).paused(false)
    };
    a.render = function() {};
    a.invalidate = function() {
        return this
    };
    a._enabled = function(e, t) {
        if (!l) {
            f.wake()
        }
        this._gc = !e;
        this._active = e && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration;
        if (t !== true) {
            if (e && !this.timeline) {
                this._timeline.add(this, this._startTime - this._delay)
            } else if (!e && this.timeline) {
                this._timeline._remove(this, true)
            }
        }
        return false
    };
    a._kill = function(e, t) {
        return this._enabled(false, false)
    };
    a.kill = function(e, t) {
        this._kill(e, t);
        return this
    };
    a._uncache = function(e) {
        var t = e ? this : this.timeline;
        while (t) {
            t._dirty = true;
            t = t.timeline
        }
        return this
    };
    a.eventCallback = function(e, t, n, r) {
        if (e == null) {
            return null
        } else if (e.substr(0, 2) === "on") {
            var i = this.vars,
                s;
            if (arguments.length === 1) {
                return i[e]
            }
            if (t == null) {
                delete i[e]
            } else {
                i[e] = t;
                i[e + "Params"] = n;
                i[e + "Scope"] = r;
                if (n) {
                    s = n.length;
                    while (--s > -1) {
                        if (n[s] === "{self}") {
                            n = i[e + "Params"] = n.concat();
                            n[s] = this
                        }
                    }
                }
            }
            if (e === "onUpdate") {
                this._onUpdate = t
            }
        }
        return this
    };
    a.delay = function(e) {
        if (!arguments.length) {
            return this._delay
        }
        if (this._timeline.smoothChildTiming) {
            this.startTime(this._startTime + e - this._delay)
        }
        this._delay = e;
        return this
    };
    a.duration = function(e) {
        if (!arguments.length) {
            this._dirty = false;
            return this._duration
        }
        this._duration = this._totalDuration = e;
        this._uncache(true);
        if (this._timeline.smoothChildTiming)
            if (this._time > 0)
                if (this._time < this._duration)
                    if (e !== 0) {
                        this.totalTime(this._totalTime * (e / this._duration), true)
                    }
        return this
    };
    a.totalDuration = function(e) {
        this._dirty = false;
        return !arguments.length ? this._totalDuration : this.duration(e)
    };
    a.time = function(e, t) {
        if (!arguments.length) {
            return this._time
        }
        if (this._dirty) {
            this.totalDuration()
        }
        return this.totalTime(e > this._duration ? this._duration : e, t)
    };
    a.totalTime = function(e, t, n) {
        if (!l) {
            f.wake()
        }
        if (!arguments.length) {
            return this._totalTime
        }
        if (this._timeline) {
            if (e < 0 && !n) {
                e += this.totalDuration()
            }
            if (this._timeline.smoothChildTiming) {
                if (this._dirty) {
                    this.totalDuration()
                }
                var r = this._totalDuration,
                    i = this._timeline;
                if (e > r && !n) {
                    e = r
                }
                this._startTime = (this._paused ? this._pauseTime : i._time) - (!this._reversed ? e : r - e) / this._timeScale;
                if (!i._dirty) {
                    this._uncache(false)
                }
                if (!i._active) {
                    while (i._timeline) {
                        i.totalTime(i._totalTime, true);
                        i = i._timeline
                    }
                }
            }
            if (this._gc) {
                this._enabled(true, false)
            }
            if (this._totalTime !== e) {
                this.render(e, t, false)
            }
        }
        return this
    };
    a.startTime = function(e) {
        if (!arguments.length) {
            return this._startTime
        }
        if (e !== this._startTime) {
            this._startTime = e;
            if (this.timeline)
                if (this.timeline._sortChildren) {
                    this.timeline.add(this, e - this._delay)
                }
        }
        return this
    };
    a.timeScale = function(e) {
        if (!arguments.length) {
            return this._timeScale
        }
        e = e || 1e-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var t = this._pauseTime,
                n = t || t === 0 ? t : this._timeline.totalTime();
            this._startTime = n - (n - this._startTime) * this._timeScale / e
        }
        this._timeScale = e;
        return this._uncache(false)
    };
    a.reversed = function(e) {
        if (!arguments.length) {
            return this._reversed
        }
        if (e != this._reversed) {
            this._reversed = e;
            this.totalTime(this._totalTime, true)
        }
        return this
    };
    a.paused = function(e) {
        if (!arguments.length) {
            return this._paused
        }
        if (e != this._paused)
            if (this._timeline) {
                if (!l && !e) {
                    f.wake()
                }
                var t = this._timeline.rawTime(),
                    n = t - this._pauseTime;
                if (!e && this._timeline.smoothChildTiming) {
                    this._startTime += n;
                    this._uncache(false)
                }
                this._pauseTime = e ? t : null;
                this._paused = e;
                this._active = !e && this._totalTime > 0 && this._totalTime < this._totalDuration;
                if (!e && n !== 0 && this._duration !== 0) {
                    this.render(this._totalTime, true, true)
                }
            }
        if (this._gc && !e) {
            this._enabled(true, false)
        }
        return this
    };
    var N = d("core.SimpleTimeline", function(e) {
        T.call(this, 0, e);
        this.autoRemoveChildren = this.smoothChildTiming = true
    });
    a = N.prototype = new T;
    a.constructor = N;
    a.kill()._gc = false;
    a._first = a._last = null;
    a._sortChildren = false;
    a.add = a.insert = function(e, t, n, r) {
        var i, s;
        e._startTime = Number(t || 0) + e._delay;
        if (e._paused)
            if (this !== e._timeline) {
                e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale
            }
        if (e.timeline) {
            e.timeline._remove(e, true)
        }
        e.timeline = e._timeline = this;
        if (e._gc) {
            e._enabled(true, true)
        }
        i = this._last;
        if (this._sortChildren) {
            s = e._startTime;
            while (i && i._startTime > s) {
                i = i._prev
            }
        }
        if (i) {
            e._next = i._next;
            i._next = e
        } else {
            e._next = this._first;
            this._first = e
        }
        if (e._next) {
            e._next._prev = e
        } else {
            this._last = e
        }
        e._prev = i;
        if (this._timeline) {
            this._uncache(true)
        }
        return this
    };
    a._remove = function(e, t) {
        if (e.timeline === this) {
            if (!t) {
                e._enabled(false, true)
            }
            e.timeline = null;
            if (e._prev) {
                e._prev._next = e._next
            } else if (this._first === e) {
                this._first = e._next
            }
            if (e._next) {
                e._next._prev = e._prev
            } else if (this._last === e) {
                this._last = e._prev
            }
            if (this._timeline) {
                this._uncache(true)
            }
        }
        return this
    };
    a.render = function(e, t, n) {
        var r = this._first,
            i;
        this._totalTime = this._time = this._rawPrevTime = e;
        while (r) {
            i = r._next;
            if (r._active || e >= r._startTime && !r._paused) {
                if (!r._reversed) {
                    r.render((e - r._startTime) * r._timeScale, t, n)
                } else {
                    r.render((!r._dirty ? r._totalDuration : r.totalDuration()) - (e - r._startTime) * r._timeScale, t, n)
                }
            }
            r = i
        }
    };
    a.rawTime = function() {
        if (!l) {
            f.wake()
        }
        return this._totalTime
    };
    var C = d("TweenLite", function(e, t, n) {
            T.call(this, t, n);
            if (e == null) {
                throw "Cannot tween a null target."
            }
            this.target = e = typeof e !== "string" ? e : C.selector(e) || e;
            var r = e.jquery || e.length && e[0] && e[0].nodeType && e[0].style,
                s = this.vars.overwrite,
                o, u, a;
            this._overwrite = s = s == null ? P[C.defaultOverwrite] : typeof s === "number" ? s >> 0 : P[s];
            if ((r || e instanceof Array) && typeof e[0] !== "number") {
                this._targets = a = i.call(e, 0);
                this._propLookup = [];
                this._siblings = [];
                for (o = 0; o < a.length; o++) {
                    u = a[o];
                    if (!u) {
                        a.splice(o--, 1);
                        continue
                    } else if (typeof u === "string") {
                        u = a[o--] = C.selector(u);
                        if (typeof u === "string") {
                            a.splice(o + 1, 1)
                        }
                        continue
                    } else if (u.length && u[0] && u[0].nodeType && u[0].style) {
                        a.splice(o--, 1);
                        this._targets = a = a.concat(i.call(u, 0));
                        continue
                    }
                    this._siblings[o] = j(u, this, false);
                    if (s === 1)
                        if (this._siblings[o].length > 1) {
                            F(u, this, null, 1, this._siblings[o])
                        }
                }
            } else {
                this._propLookup = {};
                this._siblings = j(e, this, false);
                if (s === 1)
                    if (this._siblings.length > 1) {
                        F(e, this, null, 1, this._siblings)
                    }
            }
            if (this.vars.immediateRender || t === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
                this.render(-this._delay, false, true)
            }
        }, true),
        k = function(e) {
            return e.length && e[0] && e[0].nodeType && e[0].style
        },
        L = function(e, t) {
            var n = {},
                r;
            for (r in e) {
                if (!D[r] && (!(r in t) || r === "x" || r === "y" || r === "width" || r === "height" || r === "className") && (!O[r] || O[r] && O[r]._autoCSS)) {
                    n[r] = e[r];
                    delete e[r]
                }
            }
            e.css = n
        };
    a = C.prototype = new T;
    a.constructor = C;
    a.kill()._gc = false;
    a.ratio = 0;
    a._firstPT = a._targets = a._overwrittenProps = a._startAt = null;
    a._notifyPluginsOfEnabled = false;
    C.version = "1.9.7";
    C.defaultEase = a._ease = new g(null, null, 1, 1);
    C.defaultOverwrite = "auto";
    C.ticker = f;
    C.autoSleep = true;
    C.selector = e.$ || e.jQuery || function(t) {
        if (e.$) {
            C.selector = e.$;
            return e.$(t)
        }
        return e.document ? e.document.getElementById(t.charAt(0) === "#" ? t.substr(1) : t) : t
    };
    var A = C._internals = {},
        O = C._plugins = {},
        M = C._tweenLookup = {},
        _ = 0,
        D = A.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        },
        P = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        H = T._rootFramesTimeline = new N,
        B = T._rootTimeline = new N;
    B._startTime = f.time;
    H._startTime = f.frame;
    B._active = H._active = true;
    T._updateRoot = function() {
        B.render((f.time - B._startTime) * B._timeScale, false, false);
        H.render((f.frame - H._startTime) * H._timeScale, false, false);
        if (!(f.frame % 120)) {
            var e, t, n;
            for (n in M) {
                t = M[n].tweens;
                e = t.length;
                while (--e > -1) {
                    if (t[e]._gc) {
                        t.splice(e, 1)
                    }
                }
                if (t.length === 0) {
                    delete M[n]
                }
            }
            n = B._first;
            if (!n || n._paused)
                if (C.autoSleep && !H._first && f._listeners.tick.length === 1) {
                    while (n && n._paused) {
                        n = n._next
                    }
                    if (!n) {
                        f.sleep()
                    }
                }
        }
    };
    f.addEventListener("tick", T._updateRoot);
    var j = function(e, t, n) {
            var r = e._gsTweenID,
                i, s;
            if (!M[r || (e._gsTweenID = r = "t" + _++)]) {
                M[r] = {
                    target: e,
                    tweens: []
                }
            }
            if (t) {
                i = M[r].tweens;
                i[s = i.length] = t;
                if (n) {
                    while (--s > -1) {
                        if (i[s] === t) {
                            i.splice(s, 1)
                        }
                    }
                }
            }
            return M[r].tweens
        },
        F = function(e, t, n, r, i) {
            var s, o, u, a;
            if (r === 1 || r >= 4) {
                a = i.length;
                for (s = 0; s < a; s++) {
                    if ((u = i[s]) !== t) {
                        if (!u._gc)
                            if (u._enabled(false, false)) {
                                o = true
                            }
                    } else if (r === 5) {
                        break
                    }
                }
                return o
            }
            var f = t._startTime + 1e-10,
                l = [],
                c = 0,
                h = t._duration === 0,
                p;
            s = i.length;
            while (--s > -1) {
                if ((u = i[s]) === t || u._gc || u._paused) {} else if (u._timeline !== t._timeline) {
                    p = p || I(t, 0, h);
                    if (I(u, p, h) === 0) {
                        l[c++] = u
                    }
                } else if (u._startTime <= f)
                    if (u._startTime + u.totalDuration() / u._timeScale + 1e-10 > f)
                        if (!((h || !u._initted) && f - u._startTime <= 2e-10)) {
                            l[c++] = u
                        }
            }
            s = c;
            while (--s > -1) {
                u = l[s];
                if (r === 2)
                    if (u._kill(n, e)) {
                        o = true
                    }
                if (r !== 2 || !u._firstPT && u._initted) {
                    if (u._enabled(false, false)) {
                        o = true
                    }
                }
            }
            return o
        },
        I = function(e, t, n) {
            var r = e._timeline,
                i = r._timeScale,
                s = e._startTime,
                o = 1e-10;
            while (r._timeline) {
                s += r._startTime;
                i *= r._timeScale;
                if (r._paused) {
                    return -100
                }
                r = r._timeline
            }
            s /= i;
            return s > t ? s - t : n && s === t || !e._initted && s - t < 2 * o ? o : (s += e.totalDuration() / e._timeScale / i) > t + o ? 0 : s - t - o
        };
    a._init = function() {
        var e = this.vars,
            t = this._overwrittenProps,
            n = this._duration,
            r = e.ease,
            i, s, o, u;
        if (e.startAt) {
            e.startAt.overwrite = 0;
            e.startAt.immediateRender = true;
            this._startAt = C.to(this.target, 0, e.startAt);
            if (e.immediateRender) {
                this._startAt = null;
                if (this._time === 0 && n !== 0) {
                    return
                }
            }
        } else if (e.runBackwards && e.immediateRender && n !== 0) {
            if (this._startAt) {
                this._startAt.render(-1, true);
                this._startAt = null
            } else if (this._time === 0) {
                o = {};
                for (u in e) {
                    if (!D[u] || u === "autoCSS") {
                        o[u] = e[u]
                    }
                }
                o.overwrite = 0;
                this._startAt = C.to(this.target, 0, o);
                return
            }
        }
        if (!r) {
            this._ease = C.defaultEase
        } else if (r instanceof g) {
            this._ease = e.easeParams instanceof Array ? r.config.apply(r, e.easeParams) : r
        } else {
            this._ease = typeof r === "function" ? new g(r, e.easeParams) : y[r] || C.defaultEase
        }
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets) {
            i = this._targets.length;
            while (--i > -1) {
                if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], t ? t[i] : null)) {
                    s = true
                }
            }
        } else {
            s = this._initProps(this.target, this._propLookup, this._siblings, t)
        }
        if (s) {
            C._onPluginEvent("_onInitAllProps", this)
        }
        if (t)
            if (!this._firstPT)
                if (typeof this.target !== "function") {
                    this._enabled(false, false)
                }
        if (e.runBackwards) {
            o = this._firstPT;
            while (o) {
                o.s += o.c;
                o.c = -o.c;
                o = o._next
            }
        }
        this._onUpdate = e.onUpdate;
        this._initted = true
    };
    a._initProps = function(e, t, n, r) {
        var i, s, o, u, a, f, l;
        if (e == null) {
            return false
        }
        if (!this.vars.css)
            if (e.style)
                if (e.nodeType)
                    if (O.css)
                        if (this.vars.autoCSS !== false) {
                            L(this.vars, e)
                        }
        for (i in this.vars) {
            if (D[i]) {
                if (i === "onStartParams" || i === "onUpdateParams" || i === "onCompleteParams" || i === "onReverseCompleteParams" || i === "onRepeatParams")
                    if (a = this.vars[i]) {
                        s = a.length;
                        while (--s > -1) {
                            if (a[s] === "{self}") {
                                a = this.vars[i] = a.concat();
                                a[s] = this
                            }
                        }
                    }
            } else if (O[i] && (u = new O[i])._onInitTween(e, this.vars[i], this)) {
                this._firstPT = f = {
                    _next: this._firstPT,
                    t: u,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: true,
                    n: i,
                    pg: true,
                    pr: u._priority
                };
                s = u._overwriteProps.length;
                while (--s > -1) {
                    t[u._overwriteProps[s]] = this._firstPT
                }
                if (u._priority || u._onInitAllProps) {
                    o = true
                }
                if (u._onDisable || u._onEnable) {
                    this._notifyPluginsOfEnabled = true
                }
            } else {
                this._firstPT = t[i] = f = {
                    _next: this._firstPT,
                    t: e,
                    p: i,
                    f: typeof e[i] === "function",
                    n: i,
                    pg: false,
                    pr: 0
                };
                f.s = !f.f ? parseFloat(e[i]) : e[i.indexOf("set") || typeof e["get" + i.substr(3)] !== "function" ? i : "get" + i.substr(3)]();
                l = this.vars[i];
                f.c = typeof l === "string" && l.charAt(1) === "=" ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0
            }
            if (f)
                if (f._next) {
                    f._next._prev = f
                }
        }
        if (r)
            if (this._kill(r, e)) {
                return this._initProps(e, t, n, r)
            }
        if (this._overwrite > 1)
            if (this._firstPT)
                if (n.length > 1)
                    if (F(e, this, t, this._overwrite, n)) {
                        this._kill(t, e);
                        return this._initProps(e, t, n, r)
                    }
        return o
    };
    a.render = function(e, t, n) {
        var r = this._time,
            i, s, o;
        if (e >= this._duration) {
            this._totalTime = this._time = this._duration;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
            if (!this._reversed) {
                i = true;
                s = "onComplete"
            }
            if (this._duration === 0) {
                if (e === 0 || this._rawPrevTime < 0)
                    if (this._rawPrevTime !== e) {
                        n = true;
                        if (this._rawPrevTime > 0) {
                            s = "onReverseComplete";
                            if (t) {
                                e = -1
                            }
                        }
                    }
                this._rawPrevTime = e
            }
        } else if (e < 1e-7) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (r !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                s = "onReverseComplete";
                i = this._reversed
            }
            if (e < 0) {
                this._active = false;
                if (this._duration === 0) {
                    if (this._rawPrevTime >= 0) {
                        n = true
                    }
                    this._rawPrevTime = e
                }
            } else if (!this._initted) {
                n = true
            }
        } else {
            this._totalTime = this._time = e;
            if (this._easeType) {
                var u = e / this._duration,
                    a = this._easeType,
                    f = this._easePower;
                if (a === 1 || a === 3 && u >= .5) {
                    u = 1 - u
                }
                if (a === 3) {
                    u *= 2
                }
                if (f === 1) {
                    u *= u
                } else if (f === 2) {
                    u *= u * u
                } else if (f === 3) {
                    u *= u * u * u
                } else if (f === 4) {
                    u *= u * u * u * u
                }
                if (a === 1) {
                    this.ratio = 1 - u
                } else if (a === 2) {
                    this.ratio = u
                } else if (e / this._duration < .5) {
                    this.ratio = u / 2
                } else {
                    this.ratio = 1 - u / 2
                }
            } else {
                this.ratio = this._ease.getRatio(e / this._duration)
            }
        }
        if (this._time === r && !n) {
            return
        } else if (!this._initted) {
            this._init();
            if (!this._initted) {
                return
            }
            if (this._time && !i) {
                this.ratio = this._ease.getRatio(this._time / this._duration)
            } else if (i && this._ease._calcEnd) {
                this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1)
            }
        }
        if (!this._active)
            if (!this._paused) {
                this._active = true
            }
        if (r === 0) {
            if (this._startAt) {
                if (e >= 0) {
                    this._startAt.render(e, t, n)
                } else if (!s) {
                    s = "_dummyGS"
                }
            }
            if (this.vars.onStart)
                if (this._time !== 0 || this._duration === 0)
                    if (!t) {
                        this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || m)
                    }
        }
        o = this._firstPT;
        while (o) {
            if (o.f) {
                o.t[o.p](o.c * this.ratio + o.s)
            } else {
                o.t[o.p] = o.c * this.ratio + o.s
            }
            o = o._next
        }
        if (this._onUpdate) {
            if (e < 0)
                if (this._startAt) {
                    this._startAt.render(e, t, n)
                }
            if (!t) {
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || m)
            }
        }
        if (s)
            if (!this._gc) {
                if (e < 0 && this._startAt && !this._onUpdate) {
                    this._startAt.render(e, t, n)
                }
                if (i) {
                    if (this._timeline.autoRemoveChildren) {
                        this._enabled(false, false)
                    }
                    this._active = false
                }
                if (!t && this.vars[s]) {
                    this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || m)
                }
            }
    };
    a._kill = function(e, t) {
        if (e === "all") {
            e = null
        }
        if (e == null)
            if (t == null || t === this.target) {
                return this._enabled(false, false)
            }
        t = typeof t !== "string" ? t || this._targets || this.target : C.selector(t) || t;
        var n, r, i, s, o, u, a, f;
        if ((t instanceof Array || k(t)) && typeof t[0] !== "number") {
            n = t.length;
            while (--n > -1) {
                if (this._kill(e, t[n])) {
                    u = true
                }
            }
        } else {
            if (this._targets) {
                n = this._targets.length;
                while (--n > -1) {
                    if (t === this._targets[n]) {
                        o = this._propLookup[n] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
                }
            } else if (t !== this.target) {
                return false
            } else {
                o = this._propLookup;
                r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
            }
            if (o) {
                a = e || o;
                f = e !== r && r !== "all" && e !== o && (e == null || e._tempKill !== true);
                for (i in a) {
                    if (s = o[i]) {
                        if (s.pg && s.t._kill(a)) {
                            u = true
                        }
                        if (!s.pg || s.t._overwriteProps.length === 0) {
                            if (s._prev) {
                                s._prev._next = s._next
                            } else if (s === this._firstPT) {
                                this._firstPT = s._next
                            }
                            if (s._next) {
                                s._next._prev = s._prev
                            }
                            s._next = s._prev = null
                        }
                        delete o[i]
                    }
                    if (f) {
                        r[i] = 1
                    }
                }
                if (!this._firstPT && this._initted) {
                    this._enabled(false, false)
                }
            }
        }
        return u
    };
    a.invalidate = function() {
        if (this._notifyPluginsOfEnabled) {
            C._onPluginEvent("_onDisable", this)
        }
        this._firstPT = null;
        this._overwrittenProps = null;
        this._onUpdate = null;
        this._startAt = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = this._targets ? {} : [];
        return this
    };
    a._enabled = function(e, t) {
        if (!l) {
            f.wake()
        }
        if (e && this._gc) {
            var n = this._targets,
                r;
            if (n) {
                r = n.length;
                while (--r > -1) {
                    this._siblings[r] = j(n[r], this, true)
                }
            } else {
                this._siblings = j(this.target, this, true)
            }
        }
        T.prototype._enabled.call(this, e, t);
        if (this._notifyPluginsOfEnabled)
            if (this._firstPT) {
                return C._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            }
        return false
    };
    C.to = function(e, t, n) {
        return new C(e, t, n)
    };
    C.from = function(e, t, n) {
        n.runBackwards = true;
        n.immediateRender = n.immediateRender != false;
        return new C(e, t, n)
    };
    C.fromTo = function(e, t, n, r) {
        r.startAt = n;
        r.immediateRender = r.immediateRender != false && n.immediateRender != false;
        return new C(e, t, r)
    };
    C.delayedCall = function(e, t, n, r, i) {
        return new C(t, 0, {
            delay: e,
            onComplete: t,
            onCompleteParams: n,
            onCompleteScope: r,
            onReverseComplete: t,
            onReverseCompleteParams: n,
            onReverseCompleteScope: r,
            immediateRender: false,
            useFrames: i,
            overwrite: 0
        })
    };
    C.set = function(e, t) {
        return new C(e, 0, t)
    };
    C.killTweensOf = C.killDelayedCallsTo = function(e, t) {
        var n = C.getTweensOf(e),
            r = n.length;
        while (--r > -1) {
            n[r]._kill(t, e)
        }
    };
    C.getTweensOf = function(e) {
        if (e == null) {
            return []
        }
        e = typeof e !== "string" ? e : C.selector(e) || e;
        var t, n, r, i;
        if ((e instanceof Array || k(e)) && typeof e[0] !== "number") {
            t = e.length;
            n = [];
            while (--t > -1) {
                n = n.concat(C.getTweensOf(e[t]))
            }
            t = n.length;
            while (--t > -1) {
                i = n[t];
                r = t;
                while (--r > -1) {
                    if (i === n[r]) {
                        n.splice(t, 1)
                    }
                }
            }
        } else {
            n = j(e).concat();
            t = n.length;
            while (--t > -1) {
                if (n[t]._gc) {
                    n.splice(t, 1)
                }
            }
        }
        return n
    };
    var q = d("plugins.TweenPlugin", function(e, t) {
        this._overwriteProps = (e || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = t || 0;
        this._super = q.prototype
    }, true);
    a = q.prototype;
    q.version = "1.9.1";
    q.API = 2;
    a._firstPT = null;
    a._addTween = function(e, t, n, r, i, s) {
        var o, u;
        if (r != null && (o = typeof r === "number" || r.charAt(1) !== "=" ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)))) {
            this._firstPT = u = {
                _next: this._firstPT,
                t: e,
                p: t,
                s: n,
                c: o,
                f: typeof e[t] === "function",
                n: i || t,
                r: s
            };
            if (u._next) {
                u._next._prev = u
            }
        }
    };
    a.setRatio = function(e) {
        var t = this._firstPT,
            n = 1e-6,
            r;
        while (t) {
            r = t.c * e + t.s;
            if (t.r) {
                r = r + (r > 0 ? .5 : -.5) >> 0
            } else if (r < n)
                if (r > -n) {
                    r = 0
                }
            if (t.f) {
                t.t[t.p](r)
            } else {
                t.t[t.p] = r
            }
            t = t._next
        }
    };
    a._kill = function(e) {
        var t = this._overwriteProps,
            n = this._firstPT,
            r;
        if (e[this._propName] != null) {
            this._overwriteProps = []
        } else {
            r = t.length;
            while (--r > -1) {
                if (e[t[r]] != null) {
                    t.splice(r, 1)
                }
            }
        }
        while (n) {
            if (e[n.n] != null) {
                if (n._next) {
                    n._next._prev = n._prev
                }
                if (n._prev) {
                    n._prev._next = n._next;
                    n._prev = null
                } else if (this._firstPT === n) {
                    this._firstPT = n._next
                }
            }
            n = n._next
        }
        return false
    };
    a._roundProps = function(e, t) {
        var n = this._firstPT;
        while (n) {
            if (e[this._propName] || n.n != null && e[n.n.split(this._propName + "_").join("")]) {
                n.r = t
            }
            n = n._next
        }
    };
    C._onPluginEvent = function(e, t) {
        var n = t._firstPT,
            r, i, s, o, u;
        if (e === "_onInitAllProps") {
            while (n) {
                u = n._next;
                i = s;
                while (i && i.pr > n.pr) {
                    i = i._next
                }
                if (n._prev = i ? i._prev : o) {
                    n._prev._next = n
                } else {
                    s = n
                }
                if (n._next = i) {
                    i._prev = n
                } else {
                    o = n
                }
                n = u
            }
            n = t._firstPT = s
        }
        while (n) {
            if (n.pg)
                if (typeof n.t[e] === "function")
                    if (n.t[e]()) {
                        r = true
                    }
            n = n._next
        }
        return r
    };
    q.activate = function(e) {
        var t = e.length;
        while (--t > -1) {
            if (e[t].API === q.API) {
                O[(new e[t])._propName] = e[t]
            }
        }
        return true
    };
    p.plugin = function(e) {
        if (!e || !e.propName || !e.init || !e.API) {
            throw "illegal plugin definition."
        }
        var t = e.propName,
            n = e.priority || 0,
            r = e.overwriteProps,
            i = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            },
            s = d("plugins." + t.charAt(0).toUpperCase() + t.substr(1) + "Plugin", function() {
                q.call(this, t, n);
                this._overwriteProps = r || []
            }, e.global === true),
            o = s.prototype = new q(t),
            u;
        o.constructor = s;
        s.API = e.API;
        for (u in i) {
            if (typeof e[u] === "function") {
                o[i[u]] = e[u]
            }
        }
        s.version = e.version;
        q.activate([s]);
        return s
    };
    o = e._gsQueue;
    if (o) {
        for (u = 0; u < o.length; u++) {
            o[u]()
        }
        for (a in c) {
            if (!c[a].func) {
                e.console.log("GSAP encountered missing dependency: com.greensock." + a)
            }
        }
    }
    l = false
})(window);
(function(e) {
    var t = function(n, r) {
        var i = this;
        var s = t.prototype;
        this.video_el = null;
        this.sourcePath_str = null;
        this.bk_do = null;
        this.controllerHeight = n.data.controllerHeight;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this.lastPercentPlayed = 0;
        this.volume = r;
        this.curDuration = 0;
        this.countNormalMp3Errors = 0;
        this.countShoutCastErrors = 0;
        this.maxShoutCastCountErrors = 5;
        this.maxNormalCountErrors = 1;
        this.disableClickForAWhileId_to;
        this.showErrorWithDelayId_to;
        this.disableClick_bl = false;
        this.allowScrubing_bl = false;
        this.hasError_bl = true;
        this.isPlaying_bl = false;
        this.isStopped_bl = true;
        this.hasPlayedOnce_bl = false;
        this.isStartEventDispatched_bl = false;
        this.isSafeToBeControlled_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.init = function() {
            i.setBkColor(n.videoBackgroundColor_str);
            i.setupVideo()
        };
        this.setupVideo = function() {
            if (i.video_el == null) {
                i.video_el = document.createElement("video");
                i.screen.appendChild(i.video_el);
                i.video_el.controls = false;
                i.video_el.volume = i.volume;
                i.video_el.style.position = "absolute";
                i.video_el.style.pointerEvent = "none";
                i.video_el.style.left = "0px";
                i.video_el.style.top = "0px";
                i.video_el.style.backfaceVisibility = "hidden";
                i.video_el.style.width = "100%";
                i.video_el.style.height = "100%";
                i.video_el.style.margin = "0px";
                i.video_el.style.padding = "0px";
                i.video_el.style.maxWidth = "none";
                i.video_el.style.maxHeight = "none";
                i.video_el.style.border = "none";
                i.video_el.style.lineHeight = "0";
                i.video_el.style.msTouchAction = "none";
                i.screen.appendChild(i.video_el)
            }
            i.video_el.addEventListener("error", i.errorHandler);
            i.video_el.addEventListener("canplay", i.safeToBeControlled);
            i.video_el.addEventListener("canplaythrough", i.safeToBeControlled);
            i.video_el.addEventListener("progress", i.updateProgress);
            i.video_el.addEventListener("timeupdate", i.updateVideo);
            i.video_el.addEventListener("pause", i.pauseHandler);
            i.video_el.addEventListener("play", i.playHandler);
            if (!FWDUVPUtils.isIE) {
                i.video_el.addEventListener("waiting", i.startToBuffer)
            }
            i.video_el.addEventListener("playing", i.stopToBuffer);
            i.video_el.addEventListener("ended", i.endedHandler);
            i.resizeAndPosition()
        };
        this.destroyVideo = function() {
            clearTimeout(i.showErrorWithDelayId_to);
            if (i.video_el) {
                i.video_el.removeEventListener("error", i.errorHandler);
                i.video_el.removeEventListener("canplay", i.safeToBeControlled);
                i.video_el.removeEventListener("canplaythrough", i.safeToBeControlled);
                i.video_el.removeEventListener("progress", i.updateProgress);
                i.video_el.removeEventListener("timeupdate", i.updateVideo);
                i.video_el.removeEventListener("pause", i.pauseHandler);
                i.video_el.removeEventListener("play", i.playHandler);
                if (!FWDUVPUtils.isIE) {
                    i.video_el.removeEventListener("waiting", i.startToBuffer)
                }
                i.video_el.removeEventListener("playing", i.stopToBuffer);
                i.video_el.removeEventListener("ended", i.endedHandler);
                if (i.isMobile_bl) {
                    i.screen.removeChild(i.video_el);
                    i.video_el = null
                } else {
                    i.video_el.style.visibility = "hidden";
                    i.video_el.src = "";
                    i.video_el.load()
                }
            }
        };
        this.startToBuffer = function(e) {
            i.dispatchEvent(t.START_TO_BUFFER)
        };
        this.stopToBuffer = function() {
            i.dispatchEvent(t.STOP_TO_BUFFER)
        };
        this.errorHandler = function(n) {
            var r;
            i.hasError_bl = true;
            if (i.video_el.networkState == 0) {
                r = "error 'self.video_el.networkState = 0'"
            } else if (i.video_el.networkState == 1) {
                r = "error 'self.video_el.networkState = 1'"
            } else if (i.video_el.networkState == 2) {
                r = "'self.video_el.networkState = 2'"
            } else if (i.video_el.networkState == 3) {
                r = "source not found <font color='#FFFFFF'>" + i.sourcePath_str + "</font>"
            } else {
                r = n
            }
            if (e.console) e.console.log(i.video_el.networkState);
            clearTimeout(i.showErrorWithDelayId_to);
            i.showErrorWithDelayId_to = setTimeout(function() {
                i.dispatchEvent(t.ERROR, {
                    text: r
                })
            }, 200)
        };
        this.resizeAndPosition = function(e, t) {
            if (e) {
                i.stageWidth = e;
                i.stageHeight = t
            }
            i.setWidth(i.stageWidth);
            if (FWDUVPUtils.isIphone) {
                i.setHeight(i.stageHeight - i.controllerHeight)
            } else {
                i.setHeight(i.stageHeight)
            }
        };
        this.setSource = function(e) {
            i.sourcePath_str = e;
            if (i.video_el) i.stop()
        };
        this.play = function(e) {
            FWDUVPlayer.curInstance = n;
            if (i.isStopped_bl) {
                i.isPlaying_bl = false;
                i.hasError_bl = false;
                i.allowScrubing_bl = false;
                i.isStopped_bl = false;
                i.setupVideo();
                i.setVolume();
                i.video_el.src = i.sourcePath_str;
                i.play();
                i.startToBuffer(true);
                i.isPlaying_bl = true
            } else if (!i.video_el.ended || e) {
                try {
                    i.isPlaying_bl = true;
                    i.hasPlayedOnce_bl = true;
                    i.video_el.play();
                    if (FWDUVPUtils.isIE) i.dispatchEvent(t.PLAY)
                } catch (r) {}
            }
        };
        this.pause = function() {
            if (i == null || i.isStopped_bl || i.hasError_bl) return;
            if (!i.video_el.ended) {
                try {
                    i.video_el.pause();
                    i.isPlaying_bl = false;
                    if (FWDUVPUtils.isIE) i.dispatchEvent(t.PAUSE)
                } catch (e) {}
            }
        };
        this.togglePlayPause = function() {
            if (i == null) return;
            if (!i.isSafeToBeControlled_bl) return;
            if (i.isPlaying_bl) {
                i.pause()
            } else {
                i.play()
            }
        };
        this.resume = function() {
            if (i.isStopped_bl) return;
            i.play()
        };
        this.pauseHandler = function() {
            if (i.allowScrubing_bl) return;
            i.dispatchEvent(t.PAUSE)
        };
        this.playHandler = function() {
            if (i.allowScrubing_bl) return;
            if (!i.isStartEventDispatched_bl) {
                i.dispatchEvent(t.START);
                i.isStartEventDispatched_bl = true
            }
            i.dispatchEvent(t.PLAY)
        };
        this.endedHandler = function() {
            i.dispatchEvent(t.PLAY_COMPLETE)
        };
        this.stop = function(e) {
            if ((i == null || i.video_el == null || i.isStopped_bl) && !e) return;
            i.isPlaying_bl = false;
            i.isStopped_bl = true;
            i.hasPlayedOnce_bl = true;
            i.isSafeToBeControlled_bl = false;
            i.isStartEventDispatched_bl = false;
            i.destroyVideo();
            i.dispatchEvent(t.LOAD_PROGRESS, {
                percent: 0
            });
            i.dispatchEvent(t.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            });
            i.dispatchEvent(t.STOP);
            i.stopToBuffer()
        };
        this.safeToBeControlled = function() {
            i.stopToScrub();
            if (!i.isSafeToBeControlled_bl) {
                i.hasHours_bl = Math.floor(i.video_el.duration / (60 * 60)) > 0;
                i.isPlaying_bl = true;
                i.isSafeToBeControlled_bl = true;
                i.video_el.style.visibility = "visible";
                i.dispatchEvent(t.SAFE_TO_SCRUBB)
            }
        };
        this.updateProgress = function() {
            var e;
            var n = 0;
            if (i.video_el.buffered.length > 0) {
                e = i.video_el.buffered.end(i.video_el.buffered.length - 1);
                n = e.toFixed(1) / i.video_el.duration.toFixed(1);
                if (isNaN(n) || !n) n = 0
            }
            if (n == 1) i.video_el.removeEventListener("progress", i.updateProgress);
            i.dispatchEvent(t.LOAD_PROGRESS, {
                percent: n
            })
        };
        this.updateVideo = function() {
            var e;
            if (!i.allowScrubing_bl) {
                e = i.video_el.currentTime / i.video_el.duration;
                i.dispatchEvent(t.UPDATE, {
                    percent: e
                })
            }
            var n = i.formatTime(i.video_el.duration);
            var r = i.formatTime(i.video_el.currentTime);
            if (!isNaN(i.video_el.duration)) {
                i.dispatchEvent(t.UPDATE_TIME, {
                    curTime: r,
                    totalTime: n,
                    seconds: parseInt(i.video_el.currentTime)
                })
            } else {
                i.dispatchEvent(t.UPDATE_TIME, {
                    curTime: "00:00",
                    totalTime: "00:00",
                    seconds: 0
                })
            }
            i.lastPercentPlayed = e;
            i.curDuration = r
        };
        this.startToScrub = function() {
            i.allowScrubing_bl = true
        };
        this.stopToScrub = function() {
            i.allowScrubing_bl = false
        };
        this.scrub = function(e, n) {
            if (n) i.startToScrub();
            try {
                i.video_el.currentTime = i.video_el.duration * e;
                var r = i.formatTime(i.video_el.duration);
                var s = i.formatTime(i.video_el.currentTime);
                i.dispatchEvent(t.UPDATE_TIME, {
                    curTime: s,
                    totalTime: r
                })
            } catch (n) {}
        };
        this.replay = function() {
            i.scrub(0);
            i.play()
        };
        this.setVolume = function(e) {
            if (e) i.volume = e;
            if (i.video_el) i.video_el.volume = i.volume
        };
        this.formatTime = function(e) {
            var t = Math.floor(e / (60 * 60));
            var n = e % (60 * 60);
            var r = Math.floor(n / 60);
            var s = n % 60;
            var o = Math.ceil(s);
            r = r >= 10 ? r : "0" + r;
            o = o >= 10 ? o : "0" + o;
            if (isNaN(o)) return "00:00";
            if (i.hasHours_bl) {
                return t + ":" + r + ":" + o
            } else {
                return r + ":" + o
            }
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.ERROR = "error";
    t.UPDATE = "update";
    t.UPDATE_TIME = "updateTime";
    t.SAFE_TO_SCRUBB = "safeToControll";
    t.LOAD_PROGRESS = "loadProgress";
    t.START = "start";
    t.PLAY = "play";
    t.PAUSE = "pause";
    t.STOP = "stop";
    t.PLAY_COMPLETE = "playComplete";
    t.START_TO_BUFFER = "startToBuffer";
    t.STOP_TO_BUFFER = "stopToBuffer";
    e.FWDUVPVideoScreen = t
})(window);
(function(e) {
    var t = function(e, n, r) {
        var i = this;
        var s = t.prototype;
        this.nImg = e;
        this.sPath_str = n;
        this.dPath_str = r;
        this.n_sdo;
        this.s_sdo;
        this.d_sdo;
        this.toolTipLabel_str;
        this.totalWidth = this.nImg.width;
        this.totalHeight = this.nImg.height;
        this.isSetToDisabledState_bl = false;
        this.isDisabled_bl = false;
        this.isSelectedFinal_bl = false;
        this.isSelected_bl = false;
        this.isActive_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
        this.allowToCreateSecondButton_bl = !i.isMobile_bl || i.hasPointerEvent_bl;
        i.init = function() {
            i.setupMainContainers()
        };
        i.setupMainContainers = function() {
            i.n_sdo = new FWDUVPDisplayObject("img");
            i.n_sdo.setScreen(i.nImg);
            i.addChild(i.n_sdo);
            if (i.allowToCreateSecondButton_bl) {
                var e = new Image;
                e.src = i.sPath_str;
                i.s_sdo = new FWDUVPDisplayObject("img");
                i.s_sdo.setScreen(e);
                i.s_sdo.setWidth(i.totalWidth);
                i.s_sdo.setHeight(i.totalHeight);
                i.s_sdo.setAlpha(0);
                i.addChild(i.s_sdo);
                if (i.dPath_str) {
                    var t = new Image;
                    t.src = i.dPath_str;
                    i.d_sdo = new FWDUVPDisplayObject("img");
                    i.d_sdo.setScreen(t);
                    i.d_sdo.setWidth(i.totalWidth);
                    i.d_sdo.setHeight(i.totalHeight);
                    if (i.isMobile_bl) {
                        i.d_sdo.setX(-100)
                    } else {
                        i.d_sdo.setAlpha(0)
                    }
                    i.addChild(i.d_sdo)
                }
            }
            i.setWidth(i.totalWidth);
            i.setHeight(i.totalHeight);
            i.setButtonMode(true);
            if (i.isMobile_bl) {
                if (i.hasPointerEvent_bl) {
                    i.screen.addEventListener("MSPointerDown", i.onMouseUp);
                    i.screen.addEventListener("MSPointerOver", i.onMouseOver);
                    i.screen.addEventListener("MSPointerOut", i.onMouseOut)
                } else {
                    i.screen.addEventListener("touchend", i.onMouseUp)
                }
            } else if (i.screen.addEventListener) {
                i.screen.addEventListener("mouseover", i.onMouseOver);
                i.screen.addEventListener("mouseout", i.onMouseOut);
                i.screen.addEventListener("mousedown", i.onMouseUp)
            } else if (i.screen.attachEvent) {
                i.screen.attachEvent("onmouseover", i.onMouseOver);
                i.screen.attachEvent("onmouseout", i.onMouseOut);
                i.screen.attachEvent("onmousedown", i.onMouseUp)
            }
        };
        i.onMouseOver = function(e) {
            i.dispatchEvent(t.SHOW_TOOLTIP, {
                e: e
            });
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                if (i.isDisabled_bl || i.isSelectedFinal_bl) return;
                i.dispatchEvent(t.MOUSE_OVER, {
                    e: e
                });
                i.setSelectedState(true)
            }
        };
        i.onMouseOut = function(e) {
            if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE) {
                if (i.isDisabled_bl || i.isSelectedFinal_bl) return;
                i.dispatchEvent(t.MOUSE_OUT, {
                    e: e
                })
            }
        };
        i.onMouseUp = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (i.isDisabled_bl || e.button == 2 || i.isSelectedFinal_bl) return;
            i.dispatchEvent(t.MOUSE_UP, {
                e: e
            })
        };
        this.setNormalState = function(e) {
            if (!i.isSelected_bl) return;
            i.isSelected_bl = false;
            FWDUVPTweenMax.killTweensOf(i.s_sdo);
            if (e) {
                FWDUVPTweenMax.to(i.s_sdo, .5, {
                    alpha: 0,
                    delay: .1,
                    ease: Expo.easeOut
                })
            } else {
                i.s_sdo.setAlpha(0)
            }
        };
        this.setSelectedState = function(e) {
            if (i.isSelected_bl) return;
            i.isSelected_bl = true;
            FWDUVPTweenMax.killTweensOf(i.s_sdo);
            if (e) {
                FWDUVPTweenMax.to(i.s_sdo, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                })
            } else {
                i.s_sdo.setAlpha(1)
            }
        };
        i.setSelctedFinal = function() {
            i.isSelectedFinal_bl = true;
            FWDUVPTweenMax.killTweensOf(i.s_sdo);
            FWDUVPTweenMax.to(i.s_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            });
            i.setButtonMode(false)
        };
        i.setUnselctedFinal = function() {
            i.isSelectedFinal_bl = false;
            FWDUVPTweenMax.to(i.s_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            });
            i.setButtonMode(true)
        };
        this.setDisabledState = function() {
            if (i.isSetToDisabledState_bl) return;
            i.isSetToDisabledState_bl = true;
            if (i.isMobile_bl) {
                i.d_sdo.setX(0)
            } else {
                FWDUVPTweenMax.killTweensOf(i.d_sdo);
                FWDUVPTweenMax.to(i.d_sdo, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            }
        };
        this.setEnabledState = function() {
            if (!i.isSetToDisabledState_bl) return;
            i.isSetToDisabledState_bl = false;
            if (i.isMobile_bl) {
                i.d_sdo.setX(-100)
            } else {
                FWDUVPTweenMax.killTweensOf(i.d_sdo);
                FWDUVPTweenMax.to(i.d_sdo, .8, {
                    alpha: 0,
                    delay: .1,
                    ease: Expo.easeOut
                })
            }
        };
        this.disable = function() {
            i.isDisabled_bl = true;
            i.setButtonMode(false)
        };
        this.enable = function() {
            i.isDisabled_bl = false;
            i.setButtonMode(true)
        };
        i.destroy = function() {
            if (i.isMobile_bl) {
                if (i.hasPointerEvent_bl) {
                    i.screen.removeEventListener("MSPointerDown", i.onMouseUp);
                    i.screen.removeEventListener("MSPointerOver", i.onMouseOver);
                    i.screen.removeEventListener("MSPointerOut", i.onMouseOut)
                } else {
                    i.screen.removeEventListener("touchend", i.onMouseUp)
                }
            } else if (i.screen.removeEventListener) {
                i.screen.removeEventListener("mouseover", i.onMouseOver);
                i.screen.removeEventListener("mouseout", i.onMouseOut);
                i.screen.removeEventListener("mousedown", i.onMouseUp)
            } else if (i.screen.detachEvent) {
                i.screen.detachEvent("onmouseover", i.onMouseOver);
                i.screen.detachEvent("onmouseout", i.onMouseOut);
                i.screen.detachEvent("onmousedown", i.onMouseUp)
            }
            FWDUVPTweenMax.killTweensOf(i.s_sdo);
            i.n_sdo.destroy();
            i.s_sdo.destroy();
            if (i.d_sdo) {
                FWDUVPTweenMax.killTweensOf(i.d_sdo);
                i.d_sdo.destroy()
            }
            i.nImg = null;
            i.sImg = null;
            i.dImg = null;
            i.n_sdo = null;
            i.s_sdo = null;
            i.d_sdo = null;
            e = null;
            sImg = null;
            dImg = null;
            i.toolTipLabel_str = null;
            i.init = null;
            i.setupMainContainers = null;
            i.onMouseOver = null;
            i.onMouseOut = null;
            i.onClick = null;
            i.onMouseDown = null;
            i.setSelctedFinal = null;
            i.setUnselctedFinal = null;
            i.setInnerHTML("");
            s.destroy();
            i = null;
            s = null;
            t.prototype = null
        };
        i.init()
    };
    t.setPrototype = function() {
        t.prototype = null;
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.SHOW_TOOLTIP = "showToolTip";
    t.CLICK = "onClick";
    t.MOUSE_OVER = "onMouseOver";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_UP = "onMouseDown";
    t.prototype = null;
    e.FWDUVPVolumeButton = t
})(window);
(function(e) {
    var t = function(e, n) {
        var r = this;
        var i = t.prototype;
        this.videoHolder_do = null;
        this.ytb = null;
        this.lastQuality_str = "auto";
        this.volume = n;
        this.updateVideoId_int;
        this.updatePreloadId_int;
        this.controllerHeight = e.data.controllerHeight;
        this.hasHours_bl = false;
        this.hasBeenCreatedOnce_bl = false;
        this.allowScrubing_bl = false;
        this.hasError_bl = false;
        this.isPlaying_bl = false;
        this.isStopped_bl = true;
        this.isStartEventDispatched_bl = false;
        this.isSafeToBeControlled_bl = false;
        this.isPausedInEvent_bl = true;
        this.isShowed_bl = true;
        this.isQualityArrayDisapatched_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.init = function() {
            r.hasTransform3d_bl = false;
            r.hasTransform2d_bl = false;
            r.setBackfaceVisibility();
            e.videoHolder_do.addChild(r);
            r.resizeAndPosition();
            r.setupVideo()
        };
        this.setupVideo = function() {
            if (r.ytb) return;
            r.videoHolder_do = new FWDUVPDisplayObject("div");
            r.videoHolder_do.hasTransform3d_bl = false;
            r.videoHolder_do.hasTransform2d_bl = false;
            r.videoHolder_do.screen.setAttribute("id", e.instanceName_str + "youtube");
            r.videoHolder_do.getStyle().width = "100%";
            r.videoHolder_do.getStyle().height = "100%";
            r.videoHolder_do.setBackfaceVisibility();
            r.addChild(r.videoHolder_do);
            r.ytb = new YT.Player(e.instanceName_str + "youtube", {
                width: "100%",
                height: "100%",
                playerVars: {
                    controls: 0,
                    disablekb: 0,
                    loop: 0,
                    autoplay: 0,
                    wmode: "opaque",
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    cc_load_policy: 0,
                    fs: 0,
                    html5: 0
                },
                events: {
                    onReady: r.playerReadyHandler,
                    onError: r.playerErrorHandler,
                    onStateChange: r.stateChangeHandler,
                    onPlaybackQualityChange: r.qualityChangeHandler
                }
            })
        };
        this.playerReadyHandler = function() {
            r.resizeAndPosition();
            r.dispatchEvent(t.READY);
            r.hasBeenCreatedOnce_bl = true
        };
        this.stateChangeHandler = function(n) {
            if (n.data == -1 && r.isCued_bl && r.isMobile_bl) {
                r.isStopped_bl = false;
                FWDUVPlayer.stopAllVideos(e)
            }
            if (n.data == YT.PlayerState.PLAYING) {
                if (!r.isSafeToBeControlled_bl) {
                    r.isStopped_bl = false;
                    r.isSafeToBeControlled_bl = true;
                    r.isPlaying_bl = true;
                    r.hasHours_bl = Math.floor(r.ytb.getDuration() / (60 * 60)) > 0;
                    r.setVolume(r.volume);
                    r.startToUpdate();
                    r.startToPreload();
                    r.scrub(1e-5);
                    if (!r.isMobile_bl) r.setQuality(r.lastQuality_str);
                    if (r.ytb.getAvailableQualityLevels() && r.ytb.getAvailableQualityLevels().length != 0) {
                        r.dispatchEvent(t.QUALITY_CHANGE, {
                            qualityLevel: r.ytb.getPlaybackQuality(),
                            levels: r.ytb.getAvailableQualityLevels()
                        })
                    }
                    r.dispatchEvent(t.SAFE_TO_SCRUBB)
                }
                if (r.isPausedInEvent_bl) r.dispatchEvent(t.PLAY);
                r.isPausedInEvent_bl = false;
                r.hasError_bl = false
            } else if (n.data == YT.PlayerState.PAUSED) {
                if (!r.isSafeToBeControlled_bl) return;
                r.isStopped_bl = false;
                if (!r.isPausedInEvent_bl) r.dispatchEvent(t.PAUSE);
                r.isPausedInEvent_bl = true
            } else if (n.data == YT.PlayerState.ENDED) {
                if (r.ytb.getCurrentTime() && r.ytb.getCurrentTime() > 0) {
                    r.isStopped_bl = false;
                    setTimeout(function() {
                        r.dispatchEvent(t.PLAY_COMPLETE)
                    }, 100)
                }
            } else if (n.data == YT.PlayerState.CUED) {
                if (!r.isStopped_bl) {
                    r.dispatchEvent(t.CUED)
                }
                r.isCued_bl = true
            }
        };
        this.qualityChangeHandler = function(e) {
            if (r.ytb.getAvailableQualityLevels() && r.ytb.getAvailableQualityLevels().length != 0) {
                r.dispatchEvent(t.QUALITY_CHANGE, {
                    qualityLevel: r.ytb.getPlaybackQuality()
                })
            }
        };
        this.playerErrorHandler = function(e) {
            r.isPausedInEvent_bl = true;
            if (r.isStopped_bl || r.hasError_bl) return;
            var n = "";
            r.hasError_bl = true;
            if (e.data == 2) {
                n = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks."
            } else if (e.data == 5) {
                n = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred."
            } else if (e.data == 100) {
                n = "The youtube video request was not found, probably the video ID is incorrect."
            } else if (e.data == 101 || e.data == 150) {
                n = "The owner of the requested video does not allow it to be played in embedded players."
            }
            r.dispatchEvent(t.ERROR, {
                text: n
            })
        };
        this.resizeAndPosition = function() {
            r.setWidth(e.tempVidStageWidth);
            if (FWDUVPUtils.isIphone) {
                r.setHeight(e.tempVidStageHeight - r.controllerHeight)
            } else {
                r.setHeight(e.tempVidStageHeight)
            }
        };
        this.setSource = function(e) {
            if (e) r.sourcePath_str = e;
            r.ytb.cueVideoById(r.sourcePath_str)
        };
        this.play = function(t) {
            FWDUVPlayer.curInstance = e;
            r.isPlaying_bl = true;
            r.hasError_bl = false;
            try {
                r.ytb.playVideo();
                r.startToUpdate()
            } catch (n) {}
            r.isStopped_bl = false
        };
        this.pause = function() {
            if (r.isStopped_bl || r.hasError_bl) return;
            r.isPlaying_bl = false;
            try {
                r.ytb.pauseVideo()
            } catch (e) {}
            r.stopToUpdate()
        };
        this.togglePlayPause = function() {
            if (r.isPlaying_bl) {
                r.pause()
            } else {
                r.play()
            }
        };
        this.resume = function() {
            if (r.isStopped_bl) return;
            r.play()
        };
        this.startToUpdate = function() {
            clearInterval(r.updateVideoId_int);
            r.updateVideoId_int = setInterval(r.updateVideo, 500)
        };
        this.stopToUpdate = function() {
            clearInterval(r.updateVideoId_int)
        };
        this.updateVideo = function() {
            var e;
            if (!r.ytb) {
                stopToUpdate();
                return
            }
            if (!r.allowScrubing_bl) {
                e = r.ytb.getCurrentTime() / r.ytb.getDuration();
                r.dispatchEvent(t.UPDATE, {
                    percent: e
                })
            }
            var n = r.formatTime(r.ytb.getDuration());
            var i = r.formatTime(r.ytb.getCurrentTime());
            r.dispatchEvent(t.UPDATE_TIME, {
                curTime: i,
                totalTime: n,
                seconds: parseInt(r.ytb.getCurrentTime())
            })
        };
        this.startToPreload = function() {
            clearInterval(r.preloadVideoId_int);
            r.updatePreloadId_int = setInterval(r.updateProgress, 500)
        };
        this.stopToPreload = function() {
            clearInterval(r.updatePreloadId_int)
        };
        this.updateProgress = function() {
            if (!r.ytb) {
                stopToPreload();
                return
            }
            var e;
            var n = r.ytb.getVideoLoadedFraction();
            r.dispatchEvent(t.LOAD_PROGRESS, {
                percent: n
            })
        };
        this.stop = function() {
            if (r.isStopped_bl) return;
            r.isPlaying_bl = false;
            r.isStopped_bl = true;
            r.isCued_bl = false;
            r.allowScrubing_bl = false;
            r.isSafeToBeControlled_bl = false;
            r.isQualityArrayDisapatched_bl = false;
            r.isPausedInEvent_bl = true;
            r.stopToUpdate();
            r.stopToPreload();
            r.stopVideo();
            r.dispatchEvent(t.STOP);
            r.dispatchEvent(t.LOAD_PROGRESS, {
                percent: 0
            });
            r.dispatchEvent(t.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            })
        };
        this.destroyYoutube = function() {
            if (r.videoHolder_do) {
                r.videoHolder_do.screen.removeAttribute("id", e.instanceName_str + "youtube");
                r.videoHolder_do.destroy();
                r.videoHolder_do = null
            }
            if (r.ytb) r.ytb.destroy();
            r.ytb = null
        };
        this.stopVideo = function() {
            if (!r.isMobile_bl) r.ytb.cueVideoById(r.sourcePath_str)
        };
        this.startToScrub = function() {
            if (!r.isSafeToBeControlled_bl) return;
            r.allowScrubing_bl = true
        };
        this.stopToScrub = function() {
            if (!r.isSafeToBeControlled_bl) return;
            r.allowScrubing_bl = false
        };
        this.scrub = function(e) {
            if (!r.isSafeToBeControlled_bl) return;
            r.ytb.seekTo(e * r.ytb.getDuration())
        };
        this.setVolume = function(e) {
            if (e) r.volume = e;
            if (r.ytb) r.ytb.setVolume(e * 100)
        };
        this.setQuality = function(e) {
            r.lastQuality_str = e;
            r.ytb.setPlaybackQuality(e)
        };
        this.formatTime = function(e) {
            var t = Math.floor(e / (60 * 60));
            var n = e % (60 * 60);
            var i = Math.floor(n / 60);
            var s = n % 60;
            var o = Math.ceil(s);
            i = i >= 10 ? i : "0" + i;
            o = o >= 10 ? o : "0" + o;
            if (isNaN(o)) return "00:00";
            if (r.hasHours_bl) {
                return t + ":" + i + ":" + o
            } else {
                return i + ":" + o
            }
        };
        this.init()
    };
    t.setPrototype = function() {
        t.prototype = new FWDUVPDisplayObject("div")
    };
    t.READY = "ready";
    t.ERROR = "error";
    t.UPDATE = "update";
    t.UPDATE_TIME = "updateTime";
    t.SAFE_TO_SCRUBB = "safeToControll";
    t.LOAD_PROGRESS = "loadProgress";
    t.PLAY = "play";
    t.PAUSE = "pause";
    t.STOP = "stop";
    t.PLAY_COMPLETE = "playComplete";
    t.CUED = "cued";
    t.QUALITY_CHANGE = "qualityChange";
    e.FWDUVPYoutubeScreen = t
})(window);
(function() {
    var e = function(t, n, r, i) {
        var s = this;
        var o = e.prototype;
        this.text_do = null;
        this.hd_do = null;
        this.dumy_do = null;
        this.label_str = t;
        this.normalColor_str = n;
        this.selectedColor_str = r;
        this.hdPath_str = i;
        this.totalWidth = 0;
        this.totalHeight = 23;
        this.hdWidth = 7;
        this.hdHeight = 5;
        this.hasHd_bl = false;
        this.isMobile_bl = FWDUVPUtils.isMobile;
        this.isDisabled_bl = false;
        this.init = function() {
            if (s.label_str == "highres" || s.label_str == "hd1080" || s.label_str == "hd720") {
                s.hasHd_bl = true
            }
            s.setBackfaceVisibility();
            s.setupMainContainers();
            s.setHeight(s.totalHeight)
        };
        this.setupMainContainers = function() {
            s.text_do = new FWDUVPDisplayObject("div");
            s.text_do.setBackfaceVisibility();
            s.text_do.hasTransform3d_bl = false;
            s.text_do.hasTransform2d_bl = false;
            s.text_do.getStyle.whiteSpace = "nowrap";
            s.text_do.getStyle().fontFamily = "Arial";
            s.text_do.getStyle().fontSize = "12px";
            s.text_do.getStyle().color = s.normalColor_str;
            s.text_do.getStyle().fontSmoothing = "antialiased";
            s.text_do.getStyle().webkitFontSmoothing = "antialiased";
            s.text_do.getStyle().textRendering = "optimizeLegibility";
            s.text_do.setInnerHTML(s.label_str);
            s.addChild(s.text_do);
            if (s.hasHd_bl) {
                var e = new Image;
                e.src = s.hdPath_str;
                s.hd_do = new FWDUVPDisplayObject("img");
                s.hd_do.setScreen(e);
                s.hd_do.setWidth(s.hdWidth);
                s.hd_do.setHeight(s.hdHeight);
                s.addChild(s.hd_do)
            }
            s.dumy_do = new FWDUVPDisplayObject("div");
            if (FWDUVPUtils.isIE) {
                s.dumy_do.setBkColor("#FF0000");
                s.dumy_do.setAlpha(1e-4)
            }
            s.dumy_do.setButtonMode(true);
            s.dumy_do.setHeight(s.totalHeight);
            s.addChild(s.dumy_do);
            if (s.isMobile_bl) {
                if (s.hasPointerEvent_bl) {
                    s.dumy_do.screen.addEventListener("MSPointerUp", s.onMouseUp);
                    s.dumy_do.screen.addEventListener("MSPointerOver", s.onMouseOver);
                    s.dumy_do.screen.addEventListener("MSPointerOut", s.onMouseOut)
                } else {
                    s.dumy_do.screen.addEventListener("touchend", s.onMouseUp)
                }
            } else if (s.dumy_do.screen.addEventListener) {
                s.dumy_do.screen.addEventListener("mouseover", s.onMouseOver);
                s.dumy_do.screen.addEventListener("mouseout", s.onMouseOut);
                s.dumy_do.screen.addEventListener("mouseup", s.onMouseUp)
            } else if (s.dumy_do.screen.attachEvent) {
                s.dumy_do.screen.attachEvent("onmouseover", s.onMouseOver);
                s.dumy_do.screen.attachEvent("onmouseout", s.onMouseOut);
                s.dumy_do.screen.attachEvent("onmouseup", s.onMouseUp)
            }
        };
        this.onMouseOver = function(t) {
            if (s.isDisabled_bl) return;
            s.setSelectedState(true);
            s.dispatchEvent(e.MOUSE_OVER, {
                e: t
            })
        };
        this.onMouseOut = function(t) {
            if (s.isDisabled_bl) return;
            s.seNormalState(true);
            s.dispatchEvent(e.MOUSE_OUT, {
                e: t
            })
        };
        this.onMouseUp = function(t) {
            if (s.isDisabled_bl || t.button == 2) return;
            if (t.preventDefault) t.preventDefault();
            s.dispatchEvent(e.CLICK, {
                e: t
            })
        };
        this.setFinalSize = function() {
            if (s.text_do.x != 0) return;
            var e = s.text_do.screen.getBoundingClientRect().width;
            if (e < 4 && e != undefined) {
                e = parseInt(e * 100) + 34
            } else {
                e = s.text_do.screen.offsetWidth + 34
            }
            var t = s.text_do.getHeight();
            s.text_do.setX(18);
            s.text_do.setY(parseInt((s.totalHeight - t) / 2));
            if (s.hd_do) {
                s.hd_do.setX(e - 12);
                s.hd_do.setY(s.text_do.y + 1)
            }
            s.dumy_do.setWidth(e);
            s.setWidth(e)
        };
        this.setSelectedState = function(e) {
            FWDUVPTweenMax.killTweensOf(s.text_do);
            if (e) {
                FWDUVPTweenMax.to(s.text_do.screen, .5, {
                    css: {
                        color: s.selectedColor_str
                    },
                    ease: Expo.easeOut
                })
            } else {
                s.text_do.getStyle().color = s.selectedColor_str
            }
        };
        this.seNormalState = function(e) {
            FWDUVPTweenMax.killTweensOf(s.text_do);
            if (e) {
                FWDUVPTweenMax.to(s.text_do.screen, .5, {
                    css: {
                        color: s.normalColor_str
                    },
                    ease: Expo.easeOut
                })
            } else {
                s.text_do.getStyle().color = s.normalColor_str
            }
        };
        this.disable = function() {
            s.isDisabled_bl = true;
            FWDUVPTweenMax.killTweensOf(s.text_do);
            s.setSelectedState(true);
            s.dumy_do.setButtonMode(false)
        };
        this.enable = function() {
            s.isDisabled_bl = false;
            FWDUVPTweenMax.killTweensOf(s.text_do);
            s.seNormalState(true);
            s.dumy_do.setButtonMode(true)
        };
        s.init()
    };
    e.setPrototype = function() {
        e.prototype = new FWDUVPDisplayObject("div")
    };
    e.MOUSE_OVER = "onMouseOver";
    e.MOUSE_OUT = "onMouseOut";
    e.CLICK = "onClick";
    e.prototype = null;
    window.FWDUVPYTBQButton = e
})(window)