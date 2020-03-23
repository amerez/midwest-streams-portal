if (function(a) {
        function c() {
            for (var c, d, a = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"]; c = a.shift();)
                if ("undefined" != typeof b.dumy.style[c] && (b.dumy.style.position = "absolute", d = b.dumy.getBoundingClientRect().left, b.dumy.style[c] = "translate3d(500px, 0px, 0px)", d = Math.abs(b.dumy.getBoundingClientRect().left - d), d > 100 && d < 900)) {
                    try {
                        document.documentElement.removeChild(b.dumy)
                    } catch (a) {}
                    return !0
                }
            try {
                document.documentElement.removeChild(b.dumy)
            } catch (a) {}
            return !1
        }

        function d() {
            for (var c, a = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"]; c = a.shift();)
                if ("undefined" != typeof b.dumy.style[c]) return !0;
            try {
                document.documentElement.removeChild(b.dumy)
            } catch (a) {}
            return !1
        }
        var b = function() {};
        b.dumy = document.createElement("div"), b.trim = function(a) {
            return a.replace(/\s/gi, "")
        }, b.trimAndFormatUrl = function(a) {
            return a = a.toLocaleLowerCase(), a = a.replace(/ /g, "-")
        }, b.splitAndTrim = function(a, c) {
            for (var d = a.split(","), e = d.length, f = 0; f < e; f++) c && (d[f] = b.trim(d[f]));
            return d
        }, b.getSecondsFromString = function(a) {
            var b = 0,
                c = 0,
                e = 0;
            return a = a.split(":"), b = a[0], "0" == b[0] && "0" != b[1] && (b = parseInt(b[1])), "00" == b && (b = 0), c = a[1], "0" == c[0] && "0" != c[1] && (c = parseInt(c[1])), "00" == c && (c = 0), secs = parseInt(a[2].replace(/,.*/gi, "")), "0" == secs[0] && "0" != secs[1] && (secs = parseInt(secs[1])), "00" == secs && (secs = 0), 0 != b && (e += 60 * b * 60), 0 != c && (e += 60 * c), e += secs
        }, b.indexOfArray = function(a, b) {
            for (var c = a.length, d = 0; d < c; d++)
                if (a[d] === b) return d;
            return -1
        }, b.randomizeArray = function(a) {
            for (var b = [], c = a.concat(), d = c.length, e = 0; e < d; e++) {
                var f = Math.floor(Math.random() * c.length);
                b.push(c[f]), c.splice(f, 1)
            }
            return b
        }, b.parent = function(a, b) {
            for (void 0 === b && (b = 1); b-- && a;) a = a.parentNode;
            return a && 1 === a.nodeType ? a : null
        }, b.sibling = function(a, b) {
            for (; a && 0 !== b;)
                if (b > 0) {
                    if (a.nextElementSibling) a = a.nextElementSibling;
                    else
                        for (var a = a.nextSibling; a && 1 !== a.nodeType; a = a.nextSibling);
                    b--
                } else {
                    if (a.previousElementSibling) a = a.previousElementSibling;
                    else
                        for (var a = a.previousSibling; a && 1 !== a.nodeType; a = a.previousSibling);
                    b++
                }
            return a
        }, b.getChildAt = function(a, c) {
            var d = b.getChildren(a);
            return c < 0 && (c += d.length), c < 0 ? null : d[c]
        }, b.getChildById = function(a) {
            return document.getElementById(a) || void 0
        }, b.getChildren = function(a, b) {
            for (var c = [], d = a.firstChild; null != d; d = d.nextSibling) b ? c.push(d) : 1 === d.nodeType && c.push(d);
            return c
        }, b.getChildrenFromAttribute = function(a, c, d) {
            for (var e = [], f = a.firstChild; null != f; f = f.nextSibling) d && b.hasAttribute(f, c) ? e.push(f) : 1 === f.nodeType && b.hasAttribute(f, c) && e.push(f);
            return 0 == e.length ? void 0 : e
        }, b.getChildFromNodeListFromAttribute = function(a, c, d) {
            for (var e = a.firstChild; null != e; e = e.nextSibling) {
                if (d && b.hasAttribute(e, c)) return e;
                if (1 === e.nodeType && b.hasAttribute(e, c)) return e
            }
        }, b.getAttributeValue = function(a, c) {
            if (b.hasAttribute(a, c)) return a.getAttribute(c)
        }, b.hasAttribute = function(a, b) {
            if (a.hasAttribute) return a.hasAttribute(b);
            var c = a.attributes[b];
            return !!c
        }, b.insertNodeAt = function(a, c, d) {
            var e = b.children(a);
            if (d < 0 || d > e.length) throw new Error("invalid index!");
            a.insertBefore(c, e[d])
        }, b.hasCanvas = function() {
            return Boolean(document.createElement("canvas"))
        }, b.hitTest = function(a, c, d) {
            if (!a) throw Error("Hit test target is null!");
            var f = a.getBoundingClientRect();
            if (parseInt(f.width) == f.width || b.isIEAndLessThen9) {
                if (c >= parseInt(f.left) && c <= parseInt(f.left + (f.right - f.left)) && d >= parseInt(f.top) && d <= parseInt(f.top + (f.bottom - f.top))) return !0
            } else if (c >= 100 * f.left && c <= 100 * f.left + (100 * f.right - 100 * f.left) && d >= 100 * f.top && d <= 100 * f.top + (100 * f.bottom - 100 * f.top)) return !0;
            return !1
        }, b.hitBuggyTest = function(a, b, c) {
            if (!a) throw Error("Hit test target is null!");
            a.getBoundingClientRect();
            return !1
        }, b.getScrollOffsets = function() {
            return null != a.pageXOffset ? {
                x: a.pageXOffset,
                y: a.pageYOffset
            } : "CSS1Compat" == document.compatMode ? {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            } : void 0
        }, b.getViewportSize = function() {
            return b.hasPointerEvent && navigator.msMaxTouchPoints > 1 ? {
                w: document.documentElement.clientWidth || a.innerWidth,
                h: document.documentElement.clientHeight || a.innerHeight
            } : b.isMobile ? {
                w: a.innerWidth,
                h: a.innerHeight
            } : {
                w: document.documentElement.clientWidth || a.innerWidth,
                h: document.documentElement.clientHeight || a.innerHeight
            }
        }, b.getViewportMouseCoordinates = function(a) {
            var c = b.getScrollOffsets();
            return a.touches ? {
                screenX: void 0 == a.touches[0] ? a.touches.pageX - c.x : a.touches[0].pageX - c.x,
                screenY: void 0 == a.touches[0] ? a.touches.pageY - c.y : a.touches[0].pageY - c.y
            } : {
                screenX: void 0 == a.clientX ? a.pageX - c.x : a.clientX,
                screenY: void 0 == a.clientY ? a.pageY - c.y : a.clientY
            }
        }, b.hasPointerEvent = function() {
            return Boolean(a.navigator.msPointerEnabled) || Boolean(a.navigator.pointerEnabled)
        }(), b.isMobile = function() {
            if (b.hasPointerEvent && navigator.msMaxTouchPoints > 1 || b.hasPointerEvent && navigator.maxTouchPoints > 1) return !0;
            var a = ["android", "webos", "iphone", "ipad", "blackberry", "kfsowi"];
            for (i in a)
                if (navigator.userAgent.toLowerCase().indexOf(String(a[i]).toLowerCase()) != -1) return !0;
            return !1
        }(), b.isAndroid = function() {
            return navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1
        }(), b.isChrome = function() {
            return navigator.userAgent.toLowerCase().indexOf("chrome") != -1
        }(), b.isSafari = function() {
            return navigator.userAgent.toLowerCase().indexOf("safari") != -1 && navigator.userAgent.toLowerCase().indexOf("chrome") == -1
        }(), b.isOpera = function() {
            return navigator.userAgent.toLowerCase().indexOf("opr") != -1
        }(), b.isFirefox = function() {
            return navigator.userAgent.toLowerCase().indexOf("firefox") != -1
        }(), b.isIEWebKit = function() {
            return Boolean(document.documentElement.msRequestFullscreen)
        }(), b.isIE = function() {
            var a = Boolean(navigator.userAgent.toLowerCase().indexOf("msie") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("edge") != -1);
            return a || Boolean(document.documentElement.msRequestFullscreen)
        }(), b.isIEAndLessThen9 = function() {
            return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1)
        }(), b.isIEAnd9OrLess = function() {
            return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 9") != -1)
        }(), b.isIE7 = function() {
            return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1)
        }(), b.isMac = function() {
            return Boolean(navigator.appVersion.toLowerCase().indexOf("mac") != -1)
        }(), b.isWin = function() {
            return Boolean(navigator.appVersion.toLowerCase().indexOf("win") != -1)
        }(), b.isIOS = function() {
            return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
        }(), b.isIphone = function() {
            return navigator.userAgent.match(/(iPhone|iPod)/g)
        }(), b.hasFullScreen = function() {
            return b.dumy.requestFullScreen || b.dumy.mozRequestFullScreen || b.dumy.webkitRequestFullScreen || b.dumy.msieRequestFullScreen
        }(), b.volumeCanBeSet = function() {
            var a = document.createElement("audio");
            if (a) return a.volume = 0, 0 == a.volume
        }(), b.getVideoFormat = function() {
            var a = document.createElement("video");
            if (a.canPlayType) {
                var b;
                return "probably" == a.canPlayType("video/mp4") || "maybe" == a.canPlayType("video/mp4") ? b = ".mp4" : "probably" == a.canPlayType("video/ogg") || "maybe" == a.canPlayType("video/ogg") ? b = ".ogg" : "probably" != a.canPlayType("video/webm") && "maybe" != a.canPlayType("video/webm") || (b = ".webm"), a = null, b
            }
        }(), b.onReady = function(c) {
            document.addEventListener ? a.addEventListener("DOMContentLoaded", function() {
                b.checkIfHasTransofrms(), b.hasFullScreen = b.checkIfHasFullscreen(), setTimeout(c, 100)
            }) : document.onreadystatechange = function() {
                b.checkIfHasTransofrms(), b.hasFullScreen = b.checkIfHasFullscreen(), "complete" == document.readyState && setTimeout(c, 100)
            }
        }, b.checkIfHasTransofrms = function() {
            document.documentElement.appendChild(b.dumy), b.hasTransform3d = c(), b.hasTransform2d = d(), b.isReadyMethodCalled_bl = !0
        }, b.checkIfHasFullscreen = function() {
            return Boolean(document.documentElement.requestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.msRequestFullscreen)
        }, b.disableElementSelection = function(a) {
            try {
                a.style.userSelect = "none"
            } catch (a) {}
            try {
                a.style.MozUserSelect = "none"
            } catch (a) {}
            try {
                a.style.webkitUserSelect = "none"
            } catch (a) {}
            try {
                a.style.khtmlUserSelect = "none"
            } catch (a) {}
            try {
                a.style.oUserSelect = "none"
            } catch (a) {}
            try {
                a.style.msUserSelect = "none"
            } catch (a) {}
            try {
                a.msUserSelect = "none"
            } catch (a) {}
            a.onselectstart = function() {
                return !1
            }
        }, b.getUrlArgs = function(b) {
            var c = {},
                d = b.substr(b.indexOf("?") + 1) || location.search.substring(1);
            d = d.replace(/(\?*)(\/*)/g, "");
            for (var e = d.split("&"), f = 0; f < e.length; f++) {
                var g = e[f].indexOf("="),
                    h = e[f].substring(0, g),
                    i = e[f].substring(g + 1);
                i = decodeURIComponent(i), c[h] = i
            }
            return c
        }, b.getHashUrlArgs = function(b) {
            var c = {},
                d = b.substr(b.indexOf("#") + 1) || location.search.substring(1);
            d = d.replace(/(\?*)(\/*)/g, "");
            for (var e = d.split("&"), f = 0; f < e.length; f++) {
                var g = e[f].indexOf("="),
                    h = e[f].substring(0, g),
                    i = e[f].substring(g + 1);
                i = decodeURIComponent(i), c[h] = i
            }
            return c
        }, b.validateEmail = function(a) {
            return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a)
        }, b.isReadyMethodCalled_bl = !1, a.FWDUVPUtils = b
    }(window), !window.FWDAnimation) {
    var _fwd_gsScope = "undefined" != typeof fwd_module && fwd_module.exports && "undefined" != typeof fwd_global ? fwd_global : this || window;
    (_fwd_gsScope._fwd_gsQueue || (_fwd_gsScope._fwd_gsQueue = [])).push(function() {
            "use strict";
            _fwd_gsScope._gsDefine("FWDAnimation", ["core.Animation", "core.SimpleTimeline", "FWDTweenLite"], function(a, b, c) {
                    var d = function(a) {
                            var d, b = [],
                                c = a.length;
                            for (d = 0; d !== c; b.push(a[d++]));
                            return b
                        },
                        e = function(a, b, c) {
                            var e, f, d = a.cycle;
                            for (e in d) f = d[e], a[e] = "function" == typeof f ? f(c, b[c]) : f[c % f.length];
                            delete a.cycle
                        },
                        f = function(a, b, d) {
                            c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
                        },
                        g = 1e-10,
                        h = c._internals,
                        i = h.isSelector,
                        j = h.isArray,
                        k = f.prototype = c.to({}, .1, {}),
                        l = [];
                    f.version = "1.19.0", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function() {
                        return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
                    }, k.updateTo = function(a, b) {
                        var f, d = this.ratio,
                            e = this.vars.immediateRender || a.immediateRender;
                        b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                        for (f in a) this.vars[f] = a[f];
                        if (this._initted || e)
                            if (b) this._initted = !1, e && this.render(0, !0, !0);
                            else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                            var g = this._totalTime;
                            this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
                        } else if (this._initted = !1, this._init(), this._time > 0 || e)
                            for (var j, h = 1 / (1 - d), i = this._firstPT; i;) j = i.s + i.c, i.c *= h, i.s = j - i.c, i = i._next;
                        return this
                    }, k.render = function(a, b, c) {
                        this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                        var l, m, n, o, p, q, r, s, d = this._dirty ? this.totalDuration() : this._totalDuration,
                            e = this._time,
                            f = this._totalTime,
                            i = this._cycle,
                            j = this._duration,
                            k = this._rawPrevTime;
                        if (a >= d - 1e-7 ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = j, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (l = !0, m = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === j && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (k < 0 || a <= 0 && a >= -1e-7 || k === g && "isPause" !== this.data) && k !== a && (c = !0, k > g && (m = "onReverseComplete")), this._rawPrevTime = s = !b || a || k === a ? a : g)) : a < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== f || 0 === j && k > 0) && (m = "onReverseComplete", l = this._reversed), a < 0 && (this._active = !1, 0 === j && (this._initted || !this.vars.lazy || c) && (k >= 0 && (c = !0), this._rawPrevTime = s = !b || a || k === a ? a : g)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (o = j + this._repeatDelay, this._cycle = this._totalTime / o >> 0, 0 !== this._cycle && this._cycle === this._totalTime / o && f <= a && this._cycle--, this._time = this._totalTime - this._cycle * o, this._yoyo && 0 !== (1 & this._cycle) && (this._time = j - this._time), this._time > j ? this._time = j : this._time < 0 && (this._time = 0)), this._easeType ? (p = this._time / j, q = this._easeType, r = this._easePower, (1 === q || 3 === q && p >= .5) && (p = 1 - p), 3 === q && (p *= 2), 1 === r ? p *= p : 2 === r ? p *= p * p : 3 === r ? p *= p * p * p : 4 === r && (p *= p * p * p * p), 1 === q ? this.ratio = 1 - p : 2 === q ? this.ratio = p : this._time / j < .5 ? this.ratio = p / 2 : this.ratio = 1 - p / 2) : this.ratio = this._ease.getRatio(this._time / j)), e === this._time && !c && i === this._cycle) return void(f !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = e, this._totalTime = f, this._rawPrevTime = k, this._cycle = i, h.lazyTweens.push(this), void(this._lazy = [a, b]);
                            this._time && !l ? this.ratio = this._ease.getRatio(this._time / j) : l && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== e && a >= 0 && (this._active = !0), 0 === f && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : m || (m = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== j || b || this._callback("onStart"))), n = this._firstPT; n;) {
                            if (n.f) n.t[n.p](n.c * this.ratio + n.s);
                            else {
                                var t = n.c * this.ratio + n.s;
                                "x" == n.p ? n.t.setX(t) : "y" == n.p ? n.t.setY(t) : "z" == n.p ? n.t.setZ(t) : "angleX" == n.p ? n.t.setAngleX(t) : "angleY" == n.p ? n.t.setAngleY(t) : "angleZ" == n.p ? n.t.setAngleZ(t) : "w" == n.p ? n.t.setWidth(t) : "h" == n.p ? n.t.setHeight(t) : "alpha" == n.p ? n.t.setAlpha(t) : "scale" == n.p ? n.t.setScale2(t) : n.t[n.p] = t
                            }
                            n = n._next
                        }
                        this._onUpdate && (a < 0 && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== f || m) && this._callback("onUpdate")), this._cycle !== i && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), m && (this._gc && !c || (a < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), l && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[m] && this._callback(m), 0 === j && this._rawPrevTime === g && s !== g && (this._rawPrevTime = 0)))
                    }, f.to = function(a, b, c) {
                        return new f(a, b, c)
                    }, f.from = function(a, b, c) {
                        return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
                    }, f.fromTo = function(a, b, c, d) {
                        return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d)
                    }, f.staggerTo = f.allTo = function(a, b, g, h, k, m, n) {
                        h = h || 0;
                        var t, u, v, w, o = 0,
                            p = [],
                            q = function() {
                                g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l)
                            },
                            r = g.cycle,
                            s = g.startAt && g.startAt.cycle;
                        for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], h < 0 && (a = d(a), a.reverse(), h *= -1), t = a.length - 1, v = 0; v <= t; v++) {
                            u = {};
                            for (w in g) u[w] = g[w];
                            if (r && (e(u, a, v), null != u.duration && (b = u.duration, delete u.duration)), s) {
                                s = u.startAt = {};
                                for (w in g.startAt) s[w] = g.startAt[w];
                                e(u.startAt, a, v)
                            }
                            u.delay = o + (u.delay || 0), v === t && k && (u.onComplete = q), p[v] = new f(a[v], b, u), o += h
                        }
                        return p
                    }, f.staggerFrom = f.allFrom = function(a, b, c, d, e, g, h) {
                        return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h)
                    }, f.staggerFromTo = f.allFromTo = function(a, b, c, d, e, g, h, i) {
                        return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
                    }, f.delayedCall = function(a, b, c, d, e) {
                        return new f(b, 0, {
                            delay: a,
                            onComplete: b,
                            onCompleteParams: c,
                            callbackScope: d,
                            onReverseComplete: b,
                            onReverseCompleteParams: c,
                            immediateRender: !1,
                            useFrames: e,
                            overwrite: 0
                        })
                    }, f.set = function(a, b) {
                        return new f(a, 0, b)
                    }, f.isTweening = function(a) {
                        return c.getTweensOf(a, !0).length > 0
                    };
                    var m = function(a, b) {
                            for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
                            return d
                        },
                        n = f.getAllTweens = function(b) {
                            return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
                        };
                    f.killAll = function(a, c, d, e) {
                        null == c && (c = !0), null == d && (d = !0);
                        var i, j, k, f = n(0 != e),
                            g = f.length,
                            h = c && d && e;
                        for (k = 0; k < g; k++) j = f[k], (h || j instanceof b || (i = j.target === j.vars.onComplete) && d || c && !i) && (a ? j.totalTime(j._reversed ? 0 : j.totalDuration()) : j._enabled(!1, !1))
                    }, f.killChildTweensOf = function(a, b) {
                        if (null != a) {
                            var g, k, l, m, n, e = h.tweenLookup;
                            if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
                                for (m = a.length; --m > -1;) f.killChildTweensOf(a[m], b);
                            else {
                                g = [];
                                for (l in e)
                                    for (k = e[l].target.parentNode; k;) k === a && (g = g.concat(e[l].tweens)), k = k.parentNode;
                                for (n = g.length, m = 0; m < n; m++) b && g[m].totalTime(g[m].totalDuration()), g[m]._enabled(!1, !1)
                            }
                        }
                    };
                    var o = function(a, c, d, e) {
                        c = c !== !1, d = d !== !1, e = e !== !1;
                        for (var i, j, f = n(e), g = c && d && e, h = f.length; --h > -1;) j = f[h], (g || j instanceof b || (i = j.target === j.vars.onComplete) && d || c && !i) && j.paused(a)
                    };
                    return f.pauseAll = function(a, b, c) {
                        o(!0, a, b, c)
                    }, f.resumeAll = function(a, b, c) {
                        o(!1, a, b, c)
                    }, f.globalTimeScale = function(b) {
                        var d = a._rootTimeline,
                            e = c.ticker.time;
                        return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
                    }, k.progress = function(a, b) {
                        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
                    }, k.totalProgress = function(a, b) {
                        return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
                    }, k.time = function(a, b) {
                        return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                    }, k.duration = function(b) {
                        return arguments.length ? a.prototype.duration.call(this, b) : this._duration
                    }, k.totalDuration = function(a) {
                        return arguments.length ? this._repeat === -1 ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                    }, k.repeat = function(a) {
                        return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                    }, k.repeatDelay = function(a) {
                        return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                    }, k.yoyo = function(a) {
                        return arguments.length ? (this._yoyo = a, this) : this._yoyo
                    }, f
                }, !0), _fwd_gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "FWDTweenLite"], function(a, b, c) {
                    var d = function(a) {
                            b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                            var d, e, c = this.vars;
                            for (e in c) d = c[e], i(d) && d.join("").indexOf("{self}") !== -1 && (c[e] = this._swapSelfInParams(d));
                            i(c.tweens) && this.add(c.tweens, 0, c.align, c.stagger)
                        },
                        e = 1e-10,
                        f = c._internals,
                        g = d._internals = {},
                        h = f.isSelector,
                        i = f.isArray,
                        j = f.lazyTweens,
                        k = f.lazyRender,
                        l = _fwd_gsScope._gsDefine.globals,
                        m = function(a) {
                            var c, b = {};
                            for (c in a) b[c] = a[c];
                            return b
                        },
                        n = function(a, b, c) {
                            var e, f, d = a.cycle;
                            for (e in d) f = d[e], a[e] = "function" == typeof f ? f.call(b[c], c) : f[c % f.length];
                            delete a.cycle
                        },
                        o = g.pauseCallback = function() {},
                        p = function(a) {
                            var d, b = [],
                                c = a.length;
                            for (d = 0; d !== c; b.push(a[d++]));
                            return b
                        },
                        q = d.prototype = new b;
                    return d.version = "1.19.0", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function(a, b, d, e) {
                        var f = d.repeat && l.FWDAnimation || c;
                        return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
                    }, q.from = function(a, b, d, e) {
                        return this.add((d.repeat && l.FWDAnimation || c).from(a, b, d), e)
                    }, q.fromTo = function(a, b, d, e, f) {
                        var g = e.repeat && l.FWDAnimation || c;
                        return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
                    }, q.staggerTo = function(a, b, e, f, g, i, j, k) {
                        var q, r, l = new d({
                                onComplete: i,
                                onCompleteParams: j,
                                callbackScope: k,
                                smoothChildTiming: this.smoothChildTiming
                            }),
                            o = e.cycle;
                        for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, f < 0 && (a = p(a), a.reverse(), f *= -1), r = 0; r < a.length; r++) q = m(e), q.startAt && (q.startAt = m(q.startAt), q.startAt.cycle && n(q.startAt, a, r)), o && (n(q, a, r), null != q.duration && (b = q.duration, delete q.duration)), l.to(a[r], b, q, r * f);
                        return this.add(l, g)
                    }, q.staggerFrom = function(a, b, c, d, e, f, g, h) {
                        return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
                    }, q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
                        return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
                    }, q.call = function(a, b, d, e) {
                        return this.add(c.delayedCall(0, a, b, d), e)
                    }, q.set = function(a, b, d) {
                        return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
                    }, d.exportRoot = function(a, b) {
                        a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
                        var g, h, e = new d(a),
                            f = e._timeline;
                        for (null == b && (b = !0), f._remove(e, !0), e._startTime = 0, e._rawPrevTime = e._time = e._totalTime = f._time, g = f._first; g;) h = g._next, b && g instanceof c && g.target === g.vars.onComplete || e.add(g, g._startTime - g._delay), g = h;
                        return f.add(e, 0), e
                    }, q.add = function(e, f, g, h) {
                        var j, k, l, m, n, o;
                        if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                            if (e instanceof Array || e && e.push && i(e)) {
                                for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; l < k; l++) i(m = e[l]) && (m = new d({
                                    tweens: m
                                })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                                return this._uncache(!0)
                            }
                            if ("string" == typeof e) return this.addLabel(e, f);
                            if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                            e = c.delayedCall(0, e)
                        }
                        if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                            for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
                        return this
                    }, q.remove = function(b) {
                        if (b instanceof a) {
                            this._remove(b, !1);
                            var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                            return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
                        }
                        if (b instanceof Array || b && b.push && i(b)) {
                            for (var d = b.length; --d > -1;) this.remove(b[d]);
                            return this
                        }
                        return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
                    }, q._remove = function(a, c) {
                        b.prototype._remove.call(this, a, c);
                        var d = this._last;
                        return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                    }, q.append = function(a, b) {
                        return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
                    }, q.insert = q.insertMultiple = function(a, b, c, d) {
                        return this.add(a, b || 0, c, d)
                    }, q.appendMultiple = function(a, b, c, d) {
                        return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
                    }, q.addLabel = function(a, b) {
                        return this._labels[a] = this._parseTimeOrLabel(b), this
                    }, q.addPause = function(a, b, d, e) {
                        var f = c.delayedCall(0, o, d, e || this);
                        return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
                    }, q.removeLabel = function(a) {
                        return delete this._labels[a], this
                    }, q.getLabelTime = function(a) {
                        return null != this._labels[a] ? this._labels[a] : -1
                    }, q._parseTimeOrLabel = function(b, c, d, e) {
                        var f;
                        if (e instanceof a && e.timeline === this) this.remove(e);
                        else if (e && (e instanceof Array || e.push && i(e)))
                            for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
                        if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
                        if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
                        else {
                            if (f = b.indexOf("="), f === -1) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                            c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
                        }
                        return Number(b) + c
                    }, q.seek = function(a, b) {
                        return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
                    }, q.stop = function() {
                        return this.paused(!0)
                    }, q.gotoAndPlay = function(a, b) {
                        return this.play(a, b)
                    }, q.gotoAndStop = function(a, b) {
                        return this.pause(a, b)
                    }, q.render = function(a, b, c) {
                        this._gc && this._enabled(!0, !1);
                        var l, m, n, o, p, q, r, d = this._dirty ? this.totalDuration() : this._totalDuration,
                            f = this._time,
                            g = this._startTime,
                            h = this._timeScale,
                            i = this._paused;
                        if (a >= d - 1e-7) this._totalTime = this._time = d, this._reversed || this._hasPausedChild() || (m = !0, o = "onComplete", p = !!this._timeline.autoRemoveChildren, 0 === this._duration && (a <= 0 && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (p = !0, this._rawPrevTime > e && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = d + 1e-4;
                        else if (a < 1e-7)
                            if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || a < 0 && this._rawPrevTime >= 0)) && (o = "onReverseComplete", m = this._reversed), a < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (p = m = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (p = !0), this._rawPrevTime = a;
                            else {
                                if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && m)
                                    for (l = this._first; l && 0 === l._startTime;) l._duration || (m = !1), l = l._next;
                                a = 0, this._initted || (p = !0)
                            } else {
                            if (this._hasPause && !this._forcingPlayhead && !b) {
                                if (a >= f)
                                    for (l = this._first; l && l._startTime <= a && !q;) l._duration || "isPause" !== l.data || l.ratio || 0 === l._startTime && 0 === this._rawPrevTime || (q = l), l = l._next;
                                else
                                    for (l = this._last; l && l._startTime >= a && !q;) l._duration || "isPause" === l.data && l._rawPrevTime > 0 && (q = l), l = l._prev;
                                q && (this._time = a = q._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                            }
                            this._totalTime = this._time = this._rawPrevTime = a
                        }
                        if (this._time !== f && this._first || c || p || q) {
                            if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && a > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), r = this._time, r >= f)
                                for (l = this._first; l && (n = l._next, r === this._time && (!this._paused || i));)(l._active || l._startTime <= r && !l._paused && !l._gc) && (q === l && this.pause(), l._reversed ? l.render((l._dirty ? l.totalDuration() : l._totalDuration) - (a - l._startTime) * l._timeScale, b, c) : l.render((a - l._startTime) * l._timeScale, b, c)), l = n;
                            else
                                for (l = this._last; l && (n = l._prev, r === this._time && (!this._paused || i));) {
                                    if (l._active || l._startTime <= f && !l._paused && !l._gc) {
                                        if (q === l) {
                                            for (q = l._prev; q && q.endTime() > this._time;) q.render(q._reversed ? q.totalDuration() - (a - q._startTime) * q._timeScale : (a - q._startTime) * q._timeScale, b, c), q = q._prev;
                                            q = null, this.pause()
                                        }
                                        l._reversed ? l.render((l._dirty ? l.totalDuration() : l._totalDuration) - (a - l._startTime) * l._timeScale, b, c) : l.render((a - l._startTime) * l._timeScale, b, c)
                                    }
                                    l = n
                                }
                            this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), o && (this._gc || g !== this._startTime && h === this._timeScale || (0 === this._time || d >= this.totalDuration()) && (m && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[o] && this._callback(o)))
                        }
                    }, q._hasPausedChild = function() {
                        for (var a = this._first; a;) {
                            if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                            a = a._next
                        }
                        return !1
                    }, q.getChildren = function(a, b, d, e) {
                        e = e || -9999999999;
                        for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
                        return f
                    }, q.getTweensOf = function(a, b) {
                        var g, h, d = this._gc,
                            e = [],
                            f = 0;
                        for (d && this._enabled(!0, !0), g = c.getTweensOf(a), h = g.length; --h > -1;)(g[h].timeline === this || b && this._contains(g[h])) && (e[f++] = g[h]);
                        return d && this._enabled(!1, !0), e
                    }, q.recent = function() {
                        return this._recent
                    }, q._contains = function(a) {
                        for (var b = a.timeline; b;) {
                            if (b === this) return !0;
                            b = b.timeline
                        }
                        return !1
                    }, q.shiftChildren = function(a, b, c) {
                        c = c || 0;
                        for (var f, d = this._first, e = this._labels; d;) d._startTime >= c && (d._startTime += a), d = d._next;
                        if (b)
                            for (f in e) e[f] >= c && (e[f] += a);
                        return this._uncache(!0)
                    }, q._kill = function(a, b) {
                        if (!a && !b) return this._enabled(!1, !1);
                        for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
                        return e
                    }, q.clear = function(a) {
                        var b = this.getChildren(!1, !0, !0),
                            c = b.length;
                        for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
                        return a !== !1 && (this._labels = {}), this._uncache(!0)
                    }, q.invalidate = function() {
                        for (var b = this._first; b;) b.invalidate(), b = b._next;
                        return a.prototype.invalidate.call(this)
                    }, q._enabled = function(a, c) {
                        if (a === this._gc)
                            for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
                        return b.prototype._enabled.call(this, a, c)
                    }, q.totalTime = function(b, c, d) {
                        this._forcingPlayhead = !0;
                        var e = a.prototype.totalTime.apply(this, arguments);
                        return this._forcingPlayhead = !1, e
                    }, q.duration = function(a) {
                        return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
                    }, q.totalDuration = function(a) {
                        if (!arguments.length) {
                            if (this._dirty) {
                                for (var e, f, b = 0, c = this._last, d = 999999999999; c;) e = c._prev, c._dirty && c.totalDuration(), c._startTime > d && this._sortChildren && !c._paused ? this.add(c, c._startTime - c._delay) : d = c._startTime, c._startTime < 0 && !c._paused && (b -= c._startTime, this._timeline.smoothChildTiming && (this._startTime += c._startTime / this._timeScale), this.shiftChildren(-c._startTime, !1, -9999999999), d = 0), f = c._startTime + c._totalDuration / c._timeScale, f > b && (b = f), c = e;
                                this._duration = this._totalDuration = b, this._dirty = !1
                            }
                            return this._totalDuration
                        }
                        return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
                    }, q.paused = function(b) {
                        if (!b)
                            for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
                        return a.prototype.paused.apply(this, arguments)
                    }, q.usesFrames = function() {
                        for (var b = this._timeline; b._timeline;) b = b._timeline;
                        return b === a._rootFramesTimeline
                    }, q.rawTime = function() {
                        return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                    }, d
                }, !0), _fwd_gsScope._gsDefine("TimelineMax", ["TimelineLite", "FWDTweenLite", "easing.Ease"], function(a, b, c) {
                    var d = function(b) {
                            a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                        },
                        e = 1e-10,
                        f = b._internals,
                        g = f.lazyTweens,
                        h = f.lazyRender,
                        i = _fwd_gsScope._gsDefine.globals,
                        j = new c(null, null, 1, 0),
                        k = d.prototype = new a;
                    return k.constructor = d, k.kill()._gc = !1, d.version = "1.19.0", k.invalidate = function() {
                        return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
                    }, k.addCallback = function(a, c, d, e) {
                        return this.add(b.delayedCall(0, a, d, e), c)
                    }, k.removeCallback = function(a, b) {
                        if (a)
                            if (null == b) this._kill(null, a);
                            else
                                for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
                        return this
                    }, k.removePause = function(b) {
                        return this.removeCallback(a._internals.pauseCallback, b)
                    }, k.tweenTo = function(a, c) {
                        c = c || {};
                        var f, g, h, d = {
                                ease: j,
                                useFrames: this.usesFrames(),
                                immediateRender: !1
                            },
                            e = c.repeat && i.FWDAnimation || b;
                        for (g in c) d[g] = c[g];
                        return d.time = this._parseTimeOrLabel(a), f = Math.abs(Number(d.time) - this._time) / this._timeScale || .001, h = new e(this, f, d), d.onStart = function() {
                            h.target.paused(!0), h.vars.time !== h.target.time() && f === h.duration() && h.duration(Math.abs(h.vars.time - h.target.time()) / h.target._timeScale), c.onStart && h._callback("onStart")
                        }, h
                    }, k.tweenFromTo = function(a, b, c) {
                        c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
                            onComplete: this.seek,
                            onCompleteParams: [a],
                            callbackScope: this
                        }, c.immediateRender = c.immediateRender !== !1;
                        var d = this.tweenTo(b, c);
                        return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001);
                    }, k.render = function(a, b, c) {
                        this._gc && this._enabled(!0, !1);
                        var p, q, r, s, t, u, v, w, d = this._dirty ? this.totalDuration() : this._totalDuration,
                            f = this._duration,
                            i = this._time,
                            j = this._totalTime,
                            k = this._startTime,
                            l = this._timeScale,
                            m = this._rawPrevTime,
                            n = this._paused,
                            o = this._cycle;
                        if (a >= d - 1e-7) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (q = !0, s = "onComplete", t = !!this._timeline.autoRemoveChildren, 0 === this._duration && (a <= 0 && a >= -1e-7 || m < 0 || m === e) && m !== a && this._first && (t = !0, m > e && (s = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = f, a = f + 1e-4);
                        else if (a < 1e-7)
                            if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== i || 0 === f && m !== e && (m > 0 || a < 0 && m >= 0) && !this._locked) && (s = "onReverseComplete", q = this._reversed), a < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (t = q = !0, s = "onReverseComplete") : m >= 0 && this._first && (t = !0), this._rawPrevTime = a;
                            else {
                                if (this._rawPrevTime = f || !b || a || this._rawPrevTime === a ? a : e, 0 === a && q)
                                    for (p = this._first; p && 0 === p._startTime;) p._duration || (q = !1), p = p._next;
                                a = 0, this._initted || (t = !0)
                            } else if (0 === f && m < 0 && (t = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (u = f + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && j <= a && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, a = f + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
                            if (a = this._time, a >= i)
                                for (p = this._first; p && p._startTime <= a && !v;) p._duration || "isPause" !== p.data || p.ratio || 0 === p._startTime && 0 === this._rawPrevTime || (v = p), p = p._next;
                            else
                                for (p = this._last; p && p._startTime >= a && !v;) p._duration || "isPause" === p.data && p._rawPrevTime > 0 && (v = p), p = p._prev;
                            v && (this._time = a = v._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        if (this._cycle !== o && !this._locked) {
                            var x = this._yoyo && 0 !== (1 & o),
                                y = x === (this._yoyo && 0 !== (1 & this._cycle)),
                                z = this._totalTime,
                                A = this._cycle,
                                B = this._rawPrevTime,
                                C = this._time;
                            if (this._totalTime = o * f, this._cycle < o ? x = !x : this._totalTime += f, this._time = i, this._rawPrevTime = 0 === f ? m - 1e-4 : m, this._cycle = o, this._locked = !0, i = x ? 0 : f, this.render(i, b, 0 === f), b || this._gc || this.vars.onRepeat && this._callback("onRepeat"), i !== this._time) return;
                            if (y && (i = x ? f + 1e-4 : -1e-4, this.render(i, !0, !1)), this._locked = !1, this._paused && !n) return;
                            this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
                        }
                        if (!(this._time !== i && this._first || c || t || v)) return void(j !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== j && a > 0 && (this._active = !0), 0 === j && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), w = this._time, w >= i)
                            for (p = this._first; p && (r = p._next, w === this._time && (!this._paused || n));)(p._active || p._startTime <= this._time && !p._paused && !p._gc) && (v === p && this.pause(), p._reversed ? p.render((p._dirty ? p.totalDuration() : p._totalDuration) - (a - p._startTime) * p._timeScale, b, c) : p.render((a - p._startTime) * p._timeScale, b, c)), p = r;
                        else
                            for (p = this._last; p && (r = p._prev, w === this._time && (!this._paused || n));) {
                                if (p._active || p._startTime <= i && !p._paused && !p._gc) {
                                    if (v === p) {
                                        for (v = p._prev; v && v.endTime() > this._time;) v.render(v._reversed ? v.totalDuration() - (a - v._startTime) * v._timeScale : (a - v._startTime) * v._timeScale, b, c), v = v._prev;
                                        v = null, this.pause()
                                    }
                                    p._reversed ? p.render((p._dirty ? p.totalDuration() : p._totalDuration) - (a - p._startTime) * p._timeScale, b, c) : p.render((a - p._startTime) * p._timeScale, b, c)
                                }
                                p = r
                            }
                        this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), s && (this._locked || this._gc || k !== this._startTime && l === this._timeScale || (0 === this._time || d >= this.totalDuration()) && (q && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[s] && this._callback(s)))
                    }, k.getActive = function(a, b, c) {
                        null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
                        var h, i, d = [],
                            e = this.getChildren(a, b, c),
                            f = 0,
                            g = e.length;
                        for (h = 0; h < g; h++) i = e[h], i.isActive() && (d[f++] = i);
                        return d
                    }, k.getLabelAfter = function(a) {
                        a || 0 !== a && (a = this._time);
                        var d, b = this.getLabelsArray(),
                            c = b.length;
                        for (d = 0; d < c; d++)
                            if (b[d].time > a) return b[d].name;
                        return null
                    }, k.getLabelBefore = function(a) {
                        null == a && (a = this._time);
                        for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                            if (b[c].time < a) return b[c].name;
                        return null
                    }, k.getLabelsArray = function() {
                        var c, a = [],
                            b = 0;
                        for (c in this._labels) a[b++] = {
                            time: this._labels[c],
                            name: c
                        };
                        return a.sort(function(a, b) {
                            return a.time - b.time
                        }), a
                    }, k.progress = function(a, b) {
                        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
                    }, k.totalProgress = function(a, b) {
                        return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
                    }, k.totalDuration = function(b) {
                        return arguments.length ? this._repeat !== -1 && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                    }, k.time = function(a, b) {
                        return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                    }, k.repeat = function(a) {
                        return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                    }, k.repeatDelay = function(a) {
                        return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                    }, k.yoyo = function(a) {
                        return arguments.length ? (this._yoyo = a, this) : this._yoyo
                    }, k.currentLabel = function(a) {
                        return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
                    }, d
                }, !0),
                function() {
                    var a = 180 / Math.PI,
                        b = [],
                        c = [],
                        d = [],
                        e = {},
                        f = _fwd_gsScope._gsDefine.globals,
                        g = function(a, b, c, d) {
                            c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
                        },
                        h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                        i = function(a, b, c, d) {
                            var e = {
                                    a: a
                                },
                                f = {},
                                g = {},
                                h = {
                                    c: d
                                },
                                i = (a + b) / 2,
                                j = (b + c) / 2,
                                k = (c + d) / 2,
                                l = (i + j) / 2,
                                m = (j + k) / 2,
                                n = (m - l) / 8;
                            return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
                        },
                        j = function(a, e, f, g, h) {
                            var m, n, o, p, q, r, s, t, u, v, w, x, y, j = a.length - 1,
                                k = 0,
                                l = a[0].a;
                            for (m = 0; m < j; m++) q = a[k], n = q.a, o = q.d, p = a[k + 1].d, h ? (w = b[m], x = c[m], y = (x + w) * e * .25 / (g ? .5 : d[m] || .5), r = o - (o - n) * (g ? .5 * e : 0 !== w ? y / w : 0), s = o + (p - o) * (g ? .5 * e : 0 !== x ? y / x : 0), t = o - (r + ((s - r) * (3 * w / (w + x) + .5) / 4 || 0))) : (r = o - (o - n) * e * .5, s = o + (p - o) * e * .5, t = o - (r + s) / 2), r += t, s += t, q.c = u = r, 0 !== m ? q.b = l : q.b = l = q.a + .6 * (q.c - q.a), q.da = o - n, q.ca = u - n, q.ba = l - n, f ? (v = i(n, l, u, o), a.splice(k, 1, v[0], v[1], v[2], v[3]), k += 4) : k++, l = s;
                            q = a[k], q.b = l, q.c = l + .4 * (q.d - l), q.da = q.d - q.a, q.ca = q.c - q.a, q.ba = l - q.a, f && (v = i(q.a, l, q.c, q.d), a.splice(k, 1, v[0], v[1], v[2], v[3]))
                        },
                        k = function(a, d, e, f) {
                            var i, j, k, l, m, n, h = [];
                            if (f)
                                for (a = [f].concat(a), j = a.length; --j > -1;) "string" == typeof(n = a[j][d]) && "=" === n.charAt(1) && (a[j][d] = f[d] + Number(n.charAt(0) + n.substr(2)));
                            if (i = a.length - 2, i < 0) return h[0] = new g(a[0][d], 0, 0, a[i < -1 ? 0 : 1][d]), h;
                            for (j = 0; j < i; j++) k = a[j][d], l = a[j + 1][d], h[j] = new g(k, 0, 0, l), e && (m = a[j + 2][d], b[j] = (b[j] || 0) + (l - k) * (l - k), c[j] = (c[j] || 0) + (m - l) * (m - l));
                            return h[j] = new g(a[j][d], 0, 0, a[j + 1][d]), h
                        },
                        l = function(a, f, g, i, l, m) {
                            var q, r, s, t, u, v, w, x, n = {},
                                o = [],
                                p = m || a[0];
                            l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
                            for (r in a[0]) o.push(r);
                            if (a.length > 1) {
                                for (x = a[a.length - 1], w = !0, q = o.length; --q > -1;)
                                    if (r = o[q], Math.abs(p[r] - x[r]) > .05) {
                                        w = !1;
                                        break
                                    }
                                w && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                            }
                            for (b.length = c.length = d.length = 0, q = o.length; --q > -1;) r = o[q], e[r] = l.indexOf("," + r + ",") !== -1, n[r] = k(a, r, e[r], m);
                            for (q = b.length; --q > -1;) b[q] = Math.sqrt(b[q]), c[q] = Math.sqrt(c[q]);
                            if (!i) {
                                for (q = o.length; --q > -1;)
                                    if (e[r])
                                        for (s = n[o[q]], v = s.length - 1, t = 0; t < v; t++) u = s[t + 1].da / c[t] + s[t].da / b[t] || 0, d[t] = (d[t] || 0) + u * u;
                                for (q = d.length; --q > -1;) d[q] = Math.sqrt(d[q])
                            }
                            for (q = o.length, t = g ? 4 : 1; --q > -1;) r = o[q], s = n[r], j(s, f, g, i, e[r]), w && (s.splice(0, t), s.splice(s.length - t, t));
                            return n
                        },
                        m = function(a, b, c) {
                            b = b || "soft";
                            var i, j, k, l, m, n, o, p, q, r, s, d = {},
                                e = "cubic" === b ? 3 : 2,
                                f = "soft" === b,
                                h = [];
                            if (f && c && (a = [c].concat(a)), null == a || a.length < e + 1) throw "invalid Bezier data";
                            for (q in a[0]) h.push(q);
                            for (n = h.length; --n > -1;) {
                                for (q = h[n], d[q] = m = [], r = 0, p = a.length, o = 0; o < p; o++) i = null == c ? a[o][q] : "string" == typeof(s = a[o][q]) && "=" === s.charAt(1) ? c[q] + Number(s.charAt(0) + s.substr(2)) : Number(s), f && o > 1 && o < p - 1 && (m[r++] = (i + m[r - 2]) / 2), m[r++] = i;
                                for (p = r - e + 1, r = 0, o = 0; o < p; o += e) i = m[o], j = m[o + 1], k = m[o + 2], l = 2 === e ? 0 : m[o + 3], m[r++] = s = 3 === e ? new g(i, j, k, l) : new g(i, (2 * j + i) / 3, (2 * j + k) / 3, k);
                                m.length = r
                            }
                            return d
                        },
                        n = function(a, b, c) {
                            for (var f, g, h, i, j, k, l, m, n, o, p, d = 1 / c, e = a.length; --e > -1;)
                                for (o = a[e], h = o.a, i = o.d - h, j = o.c - h, k = o.b - h, f = g = 0, m = 1; m <= c; m++) l = d * m, n = 1 - l, f = g - (g = (l * l * i + 3 * n * (l * j + n * k)) * l), p = e * c + m - 1, b[p] = (b[p] || 0) + f * f
                        },
                        o = function(a, b) {
                            b = b >> 0 || 6;
                            var j, k, l, m, c = [],
                                d = [],
                                e = 0,
                                f = 0,
                                g = b - 1,
                                h = [],
                                i = [];
                            for (j in a) n(a[j], c, b);
                            for (l = c.length, k = 0; k < l; k++) e += Math.sqrt(c[k]), m = k % b, i[m] = e, m === g && (f += e, m = k / b >> 0, h[m] = i, d[m] = f, e = 0, i = []);
                            return {
                                length: f,
                                lengths: d,
                                segments: h
                            }
                        },
                        p = _fwd_gsScope._gsDefine.plugin({
                            propName: "bezier",
                            priority: -1,
                            version: "1.3.7",
                            API: 2,
                            fwd_global: !0,
                            init: function(a, b, c) {
                                this._target = a, b instanceof Array && (b = {
                                    values: b
                                }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                                var h, i, j, k, n, d = b.values || [],
                                    e = {},
                                    f = d[0],
                                    g = b.autoRotate || c.vars.orientToBezier;
                                this._autoRotate = g ? g instanceof Array ? g : [
                                    ["x", "y", "rotation", g === !0 ? 0 : Number(g) || 0]
                                ] : null;
                                for (h in f) this._props.push(h);
                                for (j = this._props.length; --j > -1;) h = this._props[j], this._overwriteProps.push(h), i = this._func[h] = "function" == typeof a[h], e[h] = i ? a[h.indexOf("set") || "function" != typeof a["get" + h.substr(3)] ? h : "get" + h.substr(3)]() : parseFloat(a[h]), n || e[h] !== d[0][h] && (n = e);
                                if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(d, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, n) : m(d, b.type, e), this._segCount = this._beziers[h].length, this._timeRes) {
                                    var p = o(this._beziers, this._timeRes);
                                    this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                                }
                                if (g = this._autoRotate)
                                    for (this._initialRotations = [], g[0] instanceof Array || (this._autoRotate = g = [g]), j = g.length; --j > -1;) {
                                        for (k = 0; k < 3; k++) h = g[j][k], this._func[h] = "function" == typeof a[h] && a[h.indexOf("set") || "function" != typeof a["get" + h.substr(3)] ? h : "get" + h.substr(3)];
                                        h = g[j][2], this._initialRotations[j] = (this._func[h] ? this._func[h].call(this._target) : this._target[h]) || 0, this._overwriteProps.push(h)
                                    }
                                return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                            },
                            set: function(b) {
                                var g, h, i, j, k, l, m, n, o, p, c = this._segCount,
                                    d = this._func,
                                    e = this._target,
                                    f = b !== this._startRatio;
                                if (this._timeRes) {
                                    if (o = this._lengths, p = this._curSeg, b *= this._length, i = this._li, b > this._l2 && i < c - 1) {
                                        for (n = c - 1; i < n && (this._l2 = o[++i]) <= b;);
                                        this._l1 = o[i - 1], this._li = i, this._curSeg = p = this._segments[i], this._s2 = p[this._s1 = this._si = 0]
                                    } else if (b < this._l1 && i > 0) {
                                        for (; i > 0 && (this._l1 = o[--i]) >= b;);
                                        0 === i && b < this._l1 ? this._l1 = 0 : i++, this._l2 = o[i], this._li = i, this._curSeg = p = this._segments[i], this._s1 = p[(this._si = p.length - 1) - 1] || 0, this._s2 = p[this._si]
                                    }
                                    if (g = i, b -= this._l1, i = this._si, b > this._s2 && i < p.length - 1) {
                                        for (n = p.length - 1; i < n && (this._s2 = p[++i]) <= b;);
                                        this._s1 = p[i - 1], this._si = i
                                    } else if (b < this._s1 && i > 0) {
                                        for (; i > 0 && (this._s1 = p[--i]) >= b;);
                                        0 === i && b < this._s1 ? this._s1 = 0 : i++, this._s2 = p[i], this._si = i
                                    }
                                    l = (i + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                                } else g = b < 0 ? 0 : b >= 1 ? c - 1 : c * b >> 0, l = (b - g * (1 / c)) * c;
                                for (h = 1 - l, i = this._props.length; --i > -1;) j = this._props[i], k = this._beziers[j][g], m = (l * l * k.da + 3 * h * (l * k.ca + h * k.ba)) * l + k.a, this._mod[j] && (m = this._mod[j](m, e)), d[j] ? e[j](m) : "x" == j ? e.setX(m) : "y" == j ? e.setY(m) : "z" == j ? e.setZ(m) : "angleX" == j ? e.setAngleX(m) : "angleY" == j ? e.setAngleY(m) : "angleZ" == j ? e.setAngleZ(m) : "w" == j ? e.setWidth(m) : "h" == j ? e.setHeight(m) : "alpha" == j ? e.setAlpha(m) : "scale" == j ? e.setScale2(m) : e[j] = m;
                                if (this._autoRotate) {
                                    var r, s, t, u, v, w, x, q = this._autoRotate;
                                    for (i = q.length; --i > -1;) j = q[i][2], w = q[i][3] || 0, x = q[i][4] === !0 ? 1 : a, k = this._beziers[q[i][0]], r = this._beziers[q[i][1]], k && r && (k = k[g], r = r[g], s = k.a + (k.b - k.a) * l, u = k.b + (k.c - k.b) * l, s += (u - s) * l, u += (k.c + (k.d - k.c) * l - u) * l, t = r.a + (r.b - r.a) * l, v = r.b + (r.c - r.b) * l, t += (v - t) * l, v += (r.c + (r.d - r.c) * l - v) * l, m = f ? Math.atan2(v - t, u - s) * x + w : this._initialRotations[i], this._mod[j] && (m = this._mod[j](m, e)), d[j] ? e[j](m) : e[j] = m)
                                }
                            }
                        }),
                        q = p.prototype;
                    p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function(a, b, c) {
                        return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                    }, p._cssRegister = function() {
                        var a = f.CSSPlugin;
                        if (a) {
                            var b = a._internals,
                                c = b._parseToProxy,
                                d = b._setPluginRatio,
                                e = b.CSSPropTween;
                            b._registerComplexSpecialProp("bezier", {
                                parser: function(a, b, f, g, h, i) {
                                    b instanceof Array && (b = {
                                        values: b
                                    }), i = new p;
                                    var n, o, q, j = b.values,
                                        k = j.length - 1,
                                        l = [],
                                        m = {};
                                    if (k < 0) return h;
                                    for (n = 0; n <= k; n++) q = c(a, j[n], g, h, i, k !== n), l[n] = q.end;
                                    for (o in b) m[o] = b[o];
                                    return m.values = l, h = new e(a, "bezier", 0, 0, q.pt, 2), h.data = q, h.plugin = i, h.setRatio = d, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (n = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != q.end.left ? [
                                        ["left", "top", "rotation", n, !1]
                                    ] : null != q.end.x && [
                                        ["x", "y", "rotation", n, !1]
                                    ]), m.autoRotate && (g._transform || g._enableTransforms(!1), q.autoRotate = g._target._gsTransform, q.proxy.rotation = q.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(q.proxy, m, g._tween), h
                                }
                            })
                        }
                    }, q._mod = function(a) {
                        for (var d, b = this._overwriteProps, c = b.length; --c > -1;) d = a[b[c]], d && "function" == typeof d && (this._mod[b[c]] = d)
                    }, q._kill = function(a) {
                        var c, d, b = this._props;
                        for (c in this._beziers)
                            if (c in a)
                                for (delete this._beziers[c], delete this._func[c], d = b.length; --d > -1;) b[d] === c && b.splice(d, 1);
                        if (b = this._autoRotate)
                            for (d = b.length; --d > -1;) a[b[d][2]] && b.splice(d, 1);
                        return this._super._kill.call(this, a)
                    }
                }(), _fwd_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "FWDTweenLite"], function(a, b) {
                    var e, f, g, h, c = function() {
                            a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = c.prototype.setRatio
                        },
                        d = _fwd_gsScope._gsDefine.globals,
                        i = {},
                        j = c.prototype = new a("css");
                    j.constructor = c, c.version = "1.19.0", c.API = 2, c.defaultTransformPerspective = 0, c.defaultSkewType = "compensated", c.defaultSmoothOrigin = !0, j = "px", c.suffixMap = {
                        top: j,
                        right: j,
                        bottom: j,
                        left: j,
                        width: j,
                        height: j,
                        fontSize: j,
                        padding: j,
                        margin: j,
                        perspective: j,
                        lineHeight: ""
                    };
                    var L, M, N, O, P, Q, U, V, k = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                        l = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                        m = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                        n = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                        o = /(?:\d|\-|\+|=|#|\.)*/g,
                        p = /opacity *= *([^)]*)/i,
                        q = /opacity:([^;]*)/i,
                        r = /alpha\(opacity *=.+?\)/i,
                        s = /^(rgb|hsl)/,
                        t = /([A-Z])/g,
                        u = /-([a-z])/gi,
                        v = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                        w = function(a, b) {
                            return b.toUpperCase()
                        },
                        x = /(?:Left|Right|Width)/i,
                        y = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                        z = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                        A = /,(?=[^\)]*(?:\(|$))/gi,
                        B = /[\s,\(]/i,
                        C = Math.PI / 180,
                        D = 180 / Math.PI,
                        E = {},
                        F = document,
                        G = function(a) {
                            return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", a) : F.createElement(a)
                        },
                        H = G("div"),
                        I = G("img"),
                        J = c._internals = {
                            _specialProps: i
                        },
                        K = navigator.userAgent,
                        R = function() {
                            var a = K.indexOf("Android"),
                                b = G("a");
                            return N = K.indexOf("Safari") !== -1 && K.indexOf("Chrome") === -1 && (a === -1 || Number(K.substr(a + 8, 1)) > 3), P = N && Number(K.substr(K.indexOf("Version/") + 8, 1)) < 6, O = K.indexOf("Firefox") !== -1, (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(K) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(K)) && (Q = parseFloat(RegExp.$1)), !!b && (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity))
                        }(),
                        S = function(a) {
                            return p.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                        },
                        T = function(a) {
                            window.console && console.log(a)
                        },
                        W = "",
                        X = "",
                        Y = function(a, b) {
                            b = b || H;
                            var d, e, c = b.style;
                            if (void 0 !== c[a]) return a;
                            for (a = a.charAt(0).toUpperCase() + a.substr(1), d = ["O", "Moz", "ms", "Ms", "Webkit"], e = 5; --e > -1 && void 0 === c[d[e] + a];);
                            return e >= 0 ? (X = 3 === e ? "ms" : d[e], W = "-" + X.toLowerCase() + "-", X + a) : null
                        },
                        Z = F.defaultView ? F.defaultView.getComputedStyle : function() {},
                        $ = c.getStyle = function(a, b, c, d, e) {
                            var f;
                            return R || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || Z(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(t, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : S(a)
                        },
                        _ = J.convertToPixels = function(a, d, e, f, g) {
                            if ("px" === f || !f) return e;
                            if ("auto" === f || !e) return 0;
                            var m, n, o, h = x.test(d),
                                i = a,
                                j = H.style,
                                k = e < 0,
                                l = 1 === e;
                            if (k && (e = -e), l && (e *= 100), "%" === f && d.indexOf("border") !== -1) m = e / 100 * (h ? a.clientWidth : a.clientHeight);
                            else {
                                if (j.cssText = "border:0 solid red;position:" + $(a, "position") + ";line-height:0;", "%" !== f && i.appendChild && "v" !== f.charAt(0) && "rem" !== f) j[h ? "borderLeftWidth" : "borderTopWidth"] = e + f;
                                else {
                                    if (i = a.parentNode || F.body, n = i._gsCache, o = b.ticker.frame, n && h && n.time === o) return n.width * e / 100;
                                    j[h ? "width" : "height"] = e + f
                                }
                                i.appendChild(H), m = parseFloat(H[h ? "offsetWidth" : "offsetHeight"]), i.removeChild(H), h && "%" === f && c.cacheWidths !== !1 && (n = i._gsCache = i._gsCache || {}, n.time = o, n.width = m / e * 100), 0 !== m || g || (m = _(a, d, e, f, !0))
                            }
                            return l && (m /= 100), k ? -m : m
                        },
                        aa = J.calculateOffset = function(a, b, c) {
                            if ("absolute" !== $(a, "position", c)) return 0;
                            var d = "left" === b ? "Left" : "Top",
                                e = $(a, "margin" + d, c);
                            return a["offset" + d] - (_(a, b, parseFloat(e), e.replace(o, "")) || 0)
                        },
                        ba = function(a, b) {
                            var d, e, f, c = {};
                            if (b = b || Z(a, null))
                                if (d = b.length)
                                    for (; --d > -1;) f = b[d], f.indexOf("-transform") !== -1 && Da !== f || (c[f.replace(u, w)] = b.getPropertyValue(f));
                                else
                                    for (d in b) d.indexOf("Transform") !== -1 && Ca !== d || (c[d] = b[d]);
                            else if (b = a.currentStyle || a.style)
                                for (d in b) "string" == typeof d && void 0 === c[d] && (c[d.replace(u, w)] = b[d]);
                            return R || (c.opacity = S(a)), e = Ra(a, b, !1), c.rotation = e.rotation, c.skewX = e.skewX, c.scaleX = e.scaleX, c.scaleY = e.scaleY, c.x = e.x, c.y = e.y, Fa && (c.z = e.z, c.rotationX = e.rotationX, c.rotationY = e.rotationY, c.scaleZ = e.scaleZ), c.filters && delete c.filters, c
                        },
                        ca = function(a, b, c, d, e) {
                            var h, i, j, f = {},
                                g = a.style;
                            for (i in c) "cssText" !== i && "length" !== i && isNaN(i) && (b[i] !== (h = c[i]) || e && e[i]) && i.indexOf("Origin") === -1 && ("number" != typeof h && "string" != typeof h || (f[i] = "auto" !== h || "left" !== i && "top" !== i ? "" !== h && "auto" !== h && "none" !== h || "string" != typeof b[i] || "" === b[i].replace(n, "") ? h : 0 : aa(a, i), void 0 !== g[i] && (j = new sa(g, i, g[i], j))));
                            if (d)
                                for (i in d) "className" !== i && (f[i] = d[i]);
                            return {
                                difs: f,
                                firstMPT: j
                            }
                        },
                        da = {
                            width: ["Left", "Right"],
                            height: ["Top", "Bottom"]
                        },
                        ea = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                        fa = function(a, b, c) {
                            if ("svg" === (a.nodeName + "").toLowerCase()) return (c || Z(a))[b] || 0;
                            if (a.getBBox && Oa(a)) return a.getBBox()[b] || 0;
                            var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                                e = da[b],
                                f = e.length;
                            for (c = c || Z(a, null); --f > -1;) d -= parseFloat($(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat($(a, "border" + e[f] + "Width", c, !0)) || 0;
                            return d
                        },
                        ga = function(a, b) {
                            if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
                            null != a && "" !== a || (a = "0 0");
                            var f, c = a.split(" "),
                                d = a.indexOf("left") !== -1 ? "0%" : a.indexOf("right") !== -1 ? "100%" : c[0],
                                e = a.indexOf("top") !== -1 ? "0%" : a.indexOf("bottom") !== -1 ? "100%" : c[1];
                            if (c.length > 3 && !b) {
                                for (c = a.split(", ").join(",").split(","), a = [], f = 0; f < c.length; f++) a.push(ga(c[f]));
                                return a.join(",")
                            }
                            return null == e ? e = "center" === d ? "50%" : "0" : "center" === e && (e = "50%"), ("center" === d || isNaN(parseFloat(d)) && (d + "").indexOf("=") === -1) && (d = "50%"), a = d + " " + e + (c.length > 2 ? " " + c[2] : ""), b && (b.oxp = d.indexOf("%") !== -1, b.oyp = e.indexOf("%") !== -1, b.oxr = "=" === d.charAt(1), b.oyr = "=" === e.charAt(1), b.ox = parseFloat(d.replace(n, "")), b.oy = parseFloat(e.replace(n, "")), b.v = a), b || a
                        },
                        ha = function(a, b) {
                            return "function" == typeof a && (a = a(V, U)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
                        },
                        ia = function(a, b) {
                            return "function" == typeof a && (a = a(V, U)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
                        },
                        ja = function(a, b, c, d) {
                            var f, g, h, i, j, e = 1e-6;
                            return "function" == typeof a && (a = a(V, U)), null == a ? i = b : "number" == typeof a ? i = a : (f = 360, g = a.split("_"), j = "=" === a.charAt(1), h = (j ? parseInt(a.charAt(0) + "1", 10) * parseFloat(g[0].substr(2)) : parseFloat(g[0])) * (a.indexOf("rad") === -1 ? 1 : D) - (j ? 0 : b), g.length && (d && (d[c] = b + h), a.indexOf("short") !== -1 && (h %= f, h !== h % (f / 2) && (h = h < 0 ? h + f : h - f)), a.indexOf("_cw") !== -1 && h < 0 ? h = (h + 9999999999 * f) % f - (h / f | 0) * f : a.indexOf("ccw") !== -1 && h > 0 && (h = (h - 9999999999 * f) % f - (h / f | 0) * f)), i = b + h), i < e && i > -e && (i = 0), i
                        },
                        ka = {
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
                        la = function(a, b, c) {
                            return a = a < 0 ? a + 1 : a > 1 ? a - 1 : a, 255 * (6 * a < 1 ? b + (c - b) * a * 6 : a < .5 ? c : 3 * a < 2 ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
                        },
                        ma = c.parseColor = function(a, b) {
                            var c, d, e, f, g, h, i, j, m, n, o;
                            if (a)
                                if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
                                else {
                                    if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ka[a]) c = ka[a];
                                    else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
                                    else if ("hsl" === a.substr(0, 3))
                                        if (c = o = a.match(k), b) {
                                            if (a.indexOf("=") !== -1) return a.match(l)
                                        } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = i <= .5 ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = la(g + 1 / 3, d, e), c[1] = la(g, d, e), c[2] = la(g - 1 / 3, d, e);
                                    else c = a.match(k) || ka.transparent;
                                    c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
                                } else c = ka.black;
                            return b && !o && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), m = Math.min(d, e, f), i = (j + m) / 2, j === m ? g = h = 0 : (n = j - m, h = i > .5 ? n / (2 - j - m) : n / (j + m), g = j === d ? (e - f) / n + (e < f ? 6 : 0) : j === e ? (f - d) / n + 2 : (d - e) / n + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
                        },
                        na = function(a, b) {
                            var f, g, h, c = a.match(oa) || [],
                                d = 0,
                                e = c.length ? "" : a;
                            for (f = 0; f < c.length; f++) g = c[f], h = a.substr(d, a.indexOf(g, d) - d), d += h.length + g.length, g = ma(g, b), 3 === g.length && g.push(1), e += h + (b ? "hsla(" + g[0] + "," + g[1] + "%," + g[2] + "%," + g[3] : "rgba(" + g.join(",")) + ")";
                            return e + a.substr(d)
                        },
                        oa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                    for (j in ka) oa += "|" + j + "\\b";
                    oa = new RegExp(oa + ")", "gi"), c.colorStringFilter = function(a) {
                        var c, b = a[0] + a[1];
                        oa.test(b) && (c = b.indexOf("hsl(") !== -1 || b.indexOf("hsla(") !== -1, a[0] = na(a[0], c), a[1] = na(a[1], c)), oa.lastIndex = 0
                    }, b.defaultStringFilter || (b.defaultStringFilter = c.colorStringFilter);
                    var pa = function(a, b, c, d) {
                            if (null == a) return function(a) {
                                return a
                            };
                            var n, e = b ? (a.match(oa) || [""])[0] : "",
                                f = a.split(e).join("").match(m) || [],
                                g = a.substr(0, a.indexOf(f[0])),
                                h = ")" === a.charAt(a.length - 1) ? ")" : "",
                                i = a.indexOf(" ") !== -1 ? " " : ",",
                                j = f.length,
                                l = j > 0 ? f[0].replace(k, "") : "";
                            return j ? n = b ? function(a) {
                                var b, k, o, p;
                                if ("number" == typeof a) a += l;
                                else if (d && A.test(a)) {
                                    for (p = a.replace(A, "|").split("|"), o = 0; o < p.length; o++) p[o] = n(p[o]);
                                    return p.join(",")
                                }
                                if (b = (a.match(oa) || [e])[0], k = a.split(b).join("").match(m) || [], o = k.length, j > o--)
                                    for (; ++o < j;) k[o] = c ? k[(o - 1) / 2 | 0] : f[o];
                                return g + k.join(i) + i + b + h + (a.indexOf("inset") !== -1 ? " inset" : "")
                            } : function(a) {
                                var b, e, k;
                                if ("number" == typeof a) a += l;
                                else if (d && A.test(a)) {
                                    for (e = a.replace(A, "|").split("|"), k = 0; k < e.length; k++) e[k] = n(e[k]);
                                    return e.join(",")
                                }
                                if (b = a.match(m) || [], k = b.length, j > k--)
                                    for (; ++k < j;) b[k] = c ? b[(k - 1) / 2 | 0] : f[k];
                                return g + b.join(i) + h
                            } : function(a) {
                                return a
                            }
                        },
                        qa = function(a) {
                            return a = a.split(","),
                                function(b, c, d, e, f, g, h) {
                                    var j, i = (c + "").split(" ");
                                    for (h = {}, j = 0; j < 4; j++) h[a[j]] = i[j] = i[j] || i[(j - 1) / 2 >> 0];
                                    return e.parse(b, h, f, g)
                                }
                        },
                        sa = (J._setPluginRatio = function(a) {
                            this.plugin.setRatio(a);
                            for (var f, g, h, i, j, b = this.data, c = b.proxy, d = b.firstMPT, e = 1e-6; d;) f = c[d.v], d.r ? f = Math.round(f) : f < e && f > -e && (f = 0), d.t[d.p] = f, d = d._next;
                            if (b.autoRotate && (b.autoRotate.rotation = b.mod ? b.mod(c.rotation, this.t) : c.rotation), 1 === a || 0 === a)
                                for (d = b.firstMPT, j = 1 === a ? "e" : "b"; d;) {
                                    if (g = d.t, g.type) {
                                        if (1 === g.type) {
                                            for (i = g.xs0 + g.s + g.xs1, h = 1; h < g.l; h++) i += g["xn" + h] + g["xs" + (h + 1)];
                                            g[j] = i
                                        }
                                    } else g[j] = g.s + g.xs0;
                                    d = d._next
                                }
                        }, function(a, b, c, d, e) {
                            this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
                        }),
                        ua = (J._parseToProxy = function(a, b, c, d, e, f) {
                            var l, m, n, o, p, g = d,
                                h = {},
                                i = {},
                                j = c._transform,
                                k = E;
                            for (c._transform = null, E = b, d = p = c.parse(a, b, d, e), E = k, f && (c._transform = j, g && (g._prev = null, g._prev && (g._prev._next = null))); d && d !== g;) {
                                if (d.type <= 1 && (m = d.p, i[m] = d.s + d.c, h[m] = d.s, f || (o = new sa(d, "s", m, o, d.r), d.c = 0), 1 === d.type))
                                    for (l = d.l; --l > 0;) n = "xn" + l, m = d.p + "_" + n, i[m] = d.data[n], h[m] = d[n], f || (o = new sa(d, n, m, o, d.rxp[n]));
                                d = d._next
                            }
                            return {
                                proxy: h,
                                end: i,
                                firstMPT: o,
                                pt: p
                            }
                        }, J.CSSPropTween = function(a, b, c, d, f, g, i, j, k, l, m) {
                            this.t = a, this.p = b, this.s = c, this.c = d, this.n = i || b, a instanceof ua || h.push(this.n), this.r = j, this.type = g || 0, k && (this.pr = k, e = !0), this.b = void 0 === l ? c : l, this.e = void 0 === m ? c + d : m, f && (this._next = f, f._prev = this)
                        }),
                        va = function(a, b, c, d, e, f) {
                            var g = new ua(a, b, c, d - c, e, -1, f);
                            return g.b = c, g.e = g.xs0 = d, g
                        },
                        wa = c.parseComplex = function(a, b, d, e, f, g, h, i, j, m) {
                            d = d || g || "", "function" == typeof e && (e = e(V, U)), h = new ua(a, b, 0, 0, h, m ? 2 : 1, null, !1, i, d, e), e += "", f && oa.test(e + d) && (e = [d, e], c.colorStringFilter(e), d = e[0], e = e[1]);
                            var r, s, t, u, v, w, x, y, z, B, C, D, E, n = d.split(", ").join(",").split(" "),
                                o = e.split(", ").join(",").split(" "),
                                p = n.length,
                                q = L !== !1;
                            for (e.indexOf(",") === -1 && d.indexOf(",") === -1 || (n = n.join(" ").replace(A, ", ").split(" "), o = o.join(" ").replace(A, ", ").split(" "), p = n.length), p !== o.length && (n = (g || "").split(" "), p = n.length), h.plugin = j, h.setRatio = m, oa.lastIndex = 0, r = 0; r < p; r++)
                                if (u = n[r], v = o[r], y = parseFloat(u), y || 0 === y) h.appendXtra("", y, ha(v, y), v.replace(l, ""), q && v.indexOf("px") !== -1, !0);
                                else if (f && oa.test(u)) D = v.indexOf(")") + 1, D = ")" + (D ? v.substr(D) : ""), E = v.indexOf("hsl") !== -1 && R, u = ma(u, E), v = ma(v, E), z = u.length + v.length > 6, z && !R && 0 === v[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(o[r]).join("transparent")) : (R || (z = !1), E ? h.appendXtra(z ? "hsla(" : "hsl(", u[0], ha(v[0], u[0]), ",", !1, !0).appendXtra("", u[1], ha(v[1], u[1]), "%,", !1).appendXtra("", u[2], ha(v[2], u[2]), z ? "%," : "%" + D, !1) : h.appendXtra(z ? "rgba(" : "rgb(", u[0], v[0] - u[0], ",", !0, !0).appendXtra("", u[1], v[1] - u[1], ",", !0).appendXtra("", u[2], v[2] - u[2], z ? "," : D, !0), z && (u = u.length < 4 ? 1 : u[3], h.appendXtra("", u, (v.length < 4 ? 1 : v[3]) - u, D, !1))), oa.lastIndex = 0;
                            else if (w = u.match(k)) {
                                if (x = v.match(l), !x || x.length !== w.length) return h;
                                for (t = 0, s = 0; s < w.length; s++) C = w[s], B = u.indexOf(C, t), h.appendXtra(u.substr(t, B - t), Number(C), ha(x[s], C), "", q && "px" === u.substr(B + C.length, 2), 0 === s), t = B + C.length;
                                h["xs" + h.l] += u.substr(t)
                            } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + v : v;
                            if (e.indexOf("=") !== -1 && h.data) {
                                for (D = h.xs0 + h.data.s, r = 1; r < h.l; r++) D += h["xs" + r] + h.data["xn" + r];
                                h.e = D + h["xs" + r]
                            }
                            return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
                        },
                        xa = 9;
                    for (j = ua.prototype, j.l = j.pr = 0; --xa > 0;) j["xn" + xa] = 0, j["xs" + xa] = "";
                    j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function(a, b, c, d, e, f) {
                        var g = this,
                            h = g.l;
                        return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ua(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                            s: b + c
                        }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
                    };
                    var ya = function(a, b) {
                            b = b || {}, this.p = b.prefix ? Y(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || pa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
                        },
                        za = J._registerComplexSpecialProp = function(a, b, c) {
                            "object" != typeof b && (b = {
                                parser: c
                            });
                            var f, g, d = a.split(","),
                                e = b.defaultValue;
                            for (c = c || [e], f = 0; f < d.length; f++) b.prefix = 0 === f && b.prefix, b.defaultValue = c[f] || e, g = new ya(d[f], b)
                        },
                        Aa = J._registerPluginProp = function(a) {
                            if (!i[a]) {
                                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                                za(a, {
                                    parser: function(a, c, e, f, g, h, j) {
                                        var k = d.com.greensock.plugins[b];
                                        return k ? (k._cssRegister(), i[e].parse(a, c, e, f, g, h, j)) : (T("Error: " + b + " js file not loaded."), g)
                                    }
                                })
                            }
                        };
                    j = ya.prototype, j.parseComplex = function(a, b, c, d, e, f) {
                        var h, i, j, k, l, m, g = this.keyword;
                        if (this.multi && (A.test(c) || A.test(b) ? (i = b.replace(A, "|").split("|"), j = c.replace(A, "|").split("|")) : g && (i = [b], j = [c])), j) {
                            for (k = j.length > i.length ? j.length : i.length, h = 0; h < k; h++) b = i[h] = i[h] || this.dflt, c = j[h] = j[h] || this.dflt, g && (l = b.indexOf(g), m = c.indexOf(g), l !== m && (m === -1 ? i[h] = i[h].split(g).join("") : l === -1 && (i[h] += " " + g)));
                            b = i.join(", "), c = j.join(", ")
                        }
                        return wa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
                    }, j.parse = function(a, b, c, d, e, f, h) {
                        return this.parseComplex(a.style, this.format($(a, this.p, g, !1, this.dflt)), this.format(b), e, f)
                    }, c.registerSpecialProp = function(a, b, c) {
                        za(a, {
                            parser: function(a, d, e, f, g, h, i) {
                                var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
                                return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                            },
                            priority: c
                        })
                    }, c.useSVGTransformAttr = N || O;
                    var Ia, Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                        Ca = Y("transform"),
                        Da = W + "transform",
                        Ea = Y("transformOrigin"),
                        Fa = null !== Y("perspective"),
                        Ga = J.Transform = function() {
                            this.perspective = parseFloat(c.defaultTransformPerspective) || 0, this.force3D = !(c.defaultForce3D === !1 || !Fa) && (c.defaultForce3D || "auto")
                        },
                        Ha = window.SVGElement,
                        Ja = function(a, b, c) {
                            var f, d = F.createElementNS("http://www.w3.org/2000/svg", a),
                                e = /([a-z])([A-Z])/g;
                            for (f in c) d.setAttributeNS(null, f.replace(e, "$1-$2").toLowerCase(), c[f]);
                            return b.appendChild(d), d
                        },
                        Ka = F.documentElement,
                        La = function() {
                            var b, c, d, a = Q || /Android/i.test(K) && !window.chrome;
                            return F.createElementNS && !a && (b = Ja("svg", Ka), c = Ja("rect", b, {
                                width: 100,
                                height: 50,
                                x: 100
                            }), d = c.getBoundingClientRect().width, c.style[Ea] = "50% 50%", c.style[Ca] = "scaleX(0.5)", a = d === c.getBoundingClientRect().width && !(O && Fa), Ka.removeChild(b)), a
                        }(),
                        Ma = function(a, b, d, e, f, g) {
                            var j, k, l, m, n, o, p, q, r, s, t, u, v, w, h = a._gsTransform,
                                i = Qa(a, !0);
                            h && (v = h.xOrigin, w = h.yOrigin), (!e || (j = e.split(" ")).length < 2) && (p = a.getBBox(), b = ga(b).split(" "), j = [(b[0].indexOf("%") !== -1 ? parseFloat(b[0]) / 100 * p.width : parseFloat(b[0])) + p.x, (b[1].indexOf("%") !== -1 ? parseFloat(b[1]) / 100 * p.height : parseFloat(b[1])) + p.y]), d.xOrigin = m = parseFloat(j[0]), d.yOrigin = n = parseFloat(j[1]), e && i !== Pa && (o = i[0], p = i[1], q = i[2], r = i[3], s = i[4], t = i[5], u = o * r - p * q, k = m * (r / u) + n * (-q / u) + (q * t - r * s) / u, l = m * (-p / u) + n * (o / u) - (o * t - p * s) / u, m = d.xOrigin = j[0] = k, n = d.yOrigin = j[1] = l), h && (g && (d.xOffset = h.xOffset, d.yOffset = h.yOffset, h = d), f || f !== !1 && c.defaultSmoothOrigin !== !1 ? (k = m - v, l = n - w, h.xOffset += k * i[0] + l * i[2] - k, h.yOffset += k * i[1] + l * i[3] - l) : h.xOffset = h.yOffset = 0), g || a.setAttribute("data-svg-origin", j.join(" "))
                        },
                        Na = function(a) {
                            try {
                                return a.getBBox()
                            } catch (a) {}
                        },
                        Oa = function(a) {
                            return !!(Ha && a.getBBox && a.getCTM && Na(a) && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM))
                        },
                        Pa = [1, 0, 0, 1, 0, 0],
                        Qa = function(a, b) {
                            var f, g, h, i, j, l, c = a._gsTransform || new Ga,
                                d = 1e5,
                                e = a.style;
                            if (Ca ? g = $(a, Da, null, !0) : a.currentStyle && (g = a.currentStyle.filter.match(y), g = g && 4 === g.length ? [g[0].substr(4), Number(g[2].substr(4)), Number(g[1].substr(4)), g[3].substr(4), c.x || 0, c.y || 0].join(",") : ""), f = !g || "none" === g || "matrix(1, 0, 0, 1, 0, 0)" === g, f && Ca && ((l = "none" === Z(a).display) || !a.parentNode) && (l && (i = e.display, e.display = "block"), a.parentNode || (j = 1, Ka.appendChild(a)), g = $(a, Da, null, !0), f = !g || "none" === g || "matrix(1, 0, 0, 1, 0, 0)" === g, i ? e.display = i : l && Va(e, "display"), j && Ka.removeChild(a)), (c.svg || a.getBBox && Oa(a)) && (f && (e[Ca] + "").indexOf("matrix") !== -1 && (g = e[Ca], f = 0), h = a.getAttribute("transform"), f && h && (h.indexOf("matrix") !== -1 ? (g = h, f = 0) : h.indexOf("translate") !== -1 && (g = "matrix(1,0,0,1," + h.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", f = 0))), f) return Pa;
                            for (h = (g || "").match(k) || [], xa = h.length; --xa > -1;) i = Number(h[xa]), h[xa] = (j = i - (i |= 0)) ? (j * d + (j < 0 ? -.5 : .5) | 0) / d + i : i;
                            return b && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h
                        },
                        Ra = J.getTransform = function(a, d, e, f) {
                            if (a._gsTransform && e && !f) return a._gsTransform;
                            var m, n, o, p, q, r, g = e ? a._gsTransform || new Ga : new Ga,
                                h = g.scaleX < 0,
                                i = 2e-5,
                                j = 1e5,
                                k = Fa ? parseFloat($(a, Ea, d, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0,
                                l = parseFloat(c.defaultTransformPerspective) || 0;
                            if (g.svg = !(!a.getBBox || !Oa(a)), g.svg && (Ma(a, $(a, Ea, d, !1, "50% 50%") + "", g, a.getAttribute("data-svg-origin")), Ia = c.useSVGTransformAttr || La), m = Qa(a), m !== Pa) {
                                if (16 === m.length) {
                                    var J, K, L, N, O, s = m[0],
                                        t = m[1],
                                        u = m[2],
                                        v = m[3],
                                        w = m[4],
                                        x = m[5],
                                        y = m[6],
                                        z = m[7],
                                        A = m[8],
                                        B = m[9],
                                        C = m[10],
                                        E = m[12],
                                        F = m[13],
                                        G = m[14],
                                        H = m[11],
                                        I = Math.atan2(y, C);
                                    g.zOrigin && (G = -g.zOrigin, E = A * G - m[12], F = B * G - m[13], G = C * G + g.zOrigin - m[14]), g.rotationX = I * D, I && (N = Math.cos(-I), O = Math.sin(-I), J = w * N + A * O, K = x * N + B * O, L = y * N + C * O, A = w * -O + A * N, B = x * -O + B * N, C = y * -O + C * N, H = z * -O + H * N, w = J, x = K, y = L), I = Math.atan2(-u, C), g.rotationY = I * D, I && (N = Math.cos(-I), O = Math.sin(-I), J = s * N - A * O, K = t * N - B * O, L = u * N - C * O, B = t * O + B * N, C = u * O + C * N, H = v * O + H * N, s = J, t = K, u = L), I = Math.atan2(t, s), g.rotation = I * D, I && (N = Math.cos(-I), O = Math.sin(-I), s = s * N + w * O, K = t * N + x * O, x = t * -O + x * N, y = u * -O + y * N, t = K), g.rotationX && Math.abs(g.rotationX) + Math.abs(g.rotation) > 359.9 && (g.rotationX = g.rotation = 0, g.rotationY = 180 - g.rotationY), g.scaleX = (Math.sqrt(s * s + t * t) * j + .5 | 0) / j, g.scaleY = (Math.sqrt(x * x + B * B) * j + .5 | 0) / j, g.scaleZ = (Math.sqrt(y * y + C * C) * j + .5 | 0) / j, g.rotationX || g.rotationY ? g.skewX = 0 : (g.skewX = w || x ? Math.atan2(w, x) * D + g.rotation : g.skewX || 0, Math.abs(g.skewX) > 90 && Math.abs(g.skewX) < 270 && (h ? (g.scaleX *= -1, g.skewX += g.rotation <= 0 ? 180 : -180, g.rotation += g.rotation <= 0 ? 180 : -180) : (g.scaleY *= -1, g.skewX += g.skewX <= 0 ? 180 : -180))), g.perspective = H ? 1 / (H < 0 ? -H : H) : 0, g.x = E, g.y = F, g.z = G, g.svg && (g.x -= g.xOrigin - (g.xOrigin * s - g.yOrigin * w), g.y -= g.yOrigin - (g.yOrigin * t - g.xOrigin * x))
                                } else if (!Fa || f || !m.length || g.x !== m[4] || g.y !== m[5] || !g.rotationX && !g.rotationY) {
                                    var P = m.length >= 6,
                                        Q = P ? m[0] : 1,
                                        R = m[1] || 0,
                                        S = m[2] || 0,
                                        T = P ? m[3] : 1;
                                    g.x = m[4] || 0, g.y = m[5] || 0, o = Math.sqrt(Q * Q + R * R), p = Math.sqrt(T * T + S * S), q = Q || R ? Math.atan2(R, Q) * D : g.rotation || 0, r = S || T ? Math.atan2(S, T) * D + q : g.skewX || 0, Math.abs(r) > 90 && Math.abs(r) < 270 && (h ? (o *= -1, r += q <= 0 ? 180 : -180, q += q <= 0 ? 180 : -180) : (p *= -1, r += r <= 0 ? 180 : -180)), g.scaleX = o, g.scaleY = p, g.rotation = q, g.skewX = r, Fa && (g.rotationX = g.rotationY = g.z = 0, g.perspective = l, g.scaleZ = 1), g.svg && (g.x -= g.xOrigin - (g.xOrigin * Q + g.yOrigin * S), g.y -= g.yOrigin - (g.xOrigin * R + g.yOrigin * T))
                                }
                                g.zOrigin = k;
                                for (n in g) g[n] < i && g[n] > -i && (g[n] = 0)
                            }
                            return e && (a._gsTransform = g, g.svg && (Ia && a.style[Ca] ? b.delayedCall(.001, function() {
                                Va(a.style, Ca)
                            }) : !Ia && a.getAttribute("transform") && b.delayedCall(.001, function() {
                                a.removeAttribute("transform")
                            }))), g
                        },
                        Sa = function(a) {
                            var l, m, b = this.data,
                                c = -b.rotation * C,
                                d = c + b.skewX * C,
                                e = 1e5,
                                f = (Math.cos(c) * b.scaleX * e | 0) / e,
                                g = (Math.sin(c) * b.scaleX * e | 0) / e,
                                h = (Math.sin(d) * -b.scaleY * e | 0) / e,
                                i = (Math.cos(d) * b.scaleY * e | 0) / e,
                                j = this.t.style,
                                k = this.t.currentStyle;
                            if (k) {
                                m = g, g = -h, h = -m, l = k.filter, j.filter = "";
                                var v, w, n = this.t.offsetWidth,
                                    q = this.t.offsetHeight,
                                    r = "absolute" !== k.position,
                                    s = "progid:DXImageTransform.Microsoft.Matrix(M11=" + f + ", M12=" + g + ", M21=" + h + ", M22=" + i,
                                    t = b.x + n * b.xPercent / 100,
                                    u = b.y + q * b.yPercent / 100;
                                if (null != b.ox && (v = (b.oxp ? n * b.ox * .01 : b.ox) - n / 2, w = (b.oyp ? q * b.oy * .01 : b.oy) - q / 2, t += v - (v * f + w * g), u += w - (v * h + w * i)), r ? (v = n / 2, w = q / 2, s += ", Dx=" + (v - (v * f + w * g) + t) + ", Dy=" + (w - (v * h + w * i) + u) + ")") : s += ", sizingMethod='auto expand')", l.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? j.filter = l.replace(z, s) : j.filter = s + " " + l, 0 !== a && 1 !== a || 1 === f && 0 === g && 0 === h && 1 === i && (r && s.indexOf("Dx=0, Dy=0") === -1 || p.test(l) && 100 !== parseFloat(RegExp.$1) || l.indexOf(l.indexOf("Alpha")) === -1 && j.removeAttribute("filter")), !r) {
                                    var y, A, B, x = Q < 8 ? 1 : -1;
                                    for (v = b.ieOffsetX || 0, w = b.ieOffsetY || 0, b.ieOffsetX = Math.round((n - ((f < 0 ? -f : f) * n + (g < 0 ? -g : g) * q)) / 2 + t), b.ieOffsetY = Math.round((q - ((i < 0 ? -i : i) * q + (h < 0 ? -h : h) * n)) / 2 + u), xa = 0; xa < 4; xa++) A = ea[xa], y = k[A], m = y.indexOf("px") !== -1 ? parseFloat(y) : _(this.t, A, parseFloat(y), y.replace(o, "")) || 0, B = m !== b[A] ? xa < 2 ? -b.ieOffsetX : -b.ieOffsetY : xa < 2 ? v - b.ieOffsetX : w - b.ieOffsetY, j[A] = (b[A] = Math.round(m - B * (0 === xa || 2 === xa ? 1 : x))) + "px"
                                }
                            }
                        },
                        Ta = J.set3DTransformRatio = J.setTransformRatio = function(a) {
                            var p, q, r, s, t, u, v, w, x, y, z, A, B, D, E, F, G, H, I, J, K, L, M, b = this.data,
                                c = this.t.style,
                                d = b.rotation,
                                e = b.rotationX,
                                f = b.rotationY,
                                g = b.scaleX,
                                h = b.scaleY,
                                i = b.scaleZ,
                                j = b.x,
                                k = b.y,
                                l = b.z,
                                m = b.svg,
                                n = b.perspective,
                                o = b.force3D;
                            if (((1 === a || 0 === a) && "auto" === o && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !o) && !l && !n && !f && !e && 1 === i || Ia && m || !Fa) return void(d || b.skewX || m ? (d *= C, L = b.skewX * C, M = 1e5, p = Math.cos(d) * g, s = Math.sin(d) * g, q = Math.sin(d - L) * -h, t = Math.cos(d - L) * h, L && "simple" === b.skewType && (G = Math.tan(L - b.skewY * C), G = Math.sqrt(1 + G * G), q *= G, t *= G, b.skewY && (G = Math.tan(b.skewY * C), G = Math.sqrt(1 + G * G), p *= G, s *= G)), m && (j += b.xOrigin - (b.xOrigin * p + b.yOrigin * q) + b.xOffset, k += b.yOrigin - (b.xOrigin * s + b.yOrigin * t) + b.yOffset, Ia && (b.xPercent || b.yPercent) && (D = this.t.getBBox(), j += .01 * b.xPercent * D.width, k += .01 * b.yPercent * D.height), D = 1e-6, j < D && j > -D && (j = 0), k < D && k > -D && (k = 0)), I = (p * M | 0) / M + "," + (s * M | 0) / M + "," + (q * M | 0) / M + "," + (t * M | 0) / M + "," + j + "," + k + ")", m && Ia ? this.t.setAttribute("transform", "matrix(" + I) : c[Ca] = (b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix(" : "matrix(") + I) : c[Ca] = (b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix(" : "matrix(") + g + ",0,0," + h + "," + j + "," + k + ")");
                            if (O && (D = 1e-4, g < D && g > -D && (g = i = 2e-5), h < D && h > -D && (h = i = 2e-5), !n || b.z || b.rotationX || b.rotationY || (n = 0)), d || b.skewX) d *= C, E = p = Math.cos(d), F = s = Math.sin(d), b.skewX && (d -= b.skewX * C, E = Math.cos(d), F = Math.sin(d), "simple" === b.skewType && (G = Math.tan((b.skewX - b.skewY) * C), G = Math.sqrt(1 + G * G), E *= G, F *= G, b.skewY && (G = Math.tan(b.skewY * C), G = Math.sqrt(1 + G * G), p *= G, s *= G))), q = -F, t = E;
                            else {
                                if (!(f || e || 1 !== i || n || m)) return void(c[Ca] = (b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) translate3d(" : "translate3d(") + j + "px," + k + "px," + l + "px)" + (1 !== g || 1 !== h ? " scale(" + g + "," + h + ")" : ""));
                                p = t = 1, q = s = 0
                            }
                            x = 1, r = u = v = w = y = z = 0, A = n ? -1 / n : 0, B = b.zOrigin, D = 1e-6, J = ",", K = "0", d = f * C, d && (E = Math.cos(d), F = Math.sin(d), v = -F, y = A * -F, r = p * F, u = s * F, x = E, A *= E, p *= E, s *= E), d = e * C, d && (E = Math.cos(d), F = Math.sin(d), G = q * E + r * F, H = t * E + u * F, w = x * F, z = A * F, r = q * -F + r * E, u = t * -F + u * E, x *= E, A *= E, q = G, t = H), 1 !== i && (r *= i, u *= i, x *= i, A *= i), 1 !== h && (q *= h, t *= h, w *= h, z *= h), 1 !== g && (p *= g, s *= g, v *= g, y *= g), (B || m) && (B && (j += r * -B, k += u * -B, l += x * -B + B), m && (j += b.xOrigin - (b.xOrigin * p + b.yOrigin * q) + b.xOffset, k += b.yOrigin - (b.xOrigin * s + b.yOrigin * t) + b.yOffset), j < D && j > -D && (j = K), k < D && k > -D && (k = K), l < D && l > -D && (l = 0)), I = b.xPercent || b.yPercent ? "translate(" + b.xPercent + "%," + b.yPercent + "%) matrix3d(" : "matrix3d(", I += (p < D && p > -D ? K : p) + J + (s < D && s > -D ? K : s) + J + (v < D && v > -D ? K : v), I += J + (y < D && y > -D ? K : y) + J + (q < D && q > -D ? K : q) + J + (t < D && t > -D ? K : t), e || f || 1 !== i ? (I += J + (w < D && w > -D ? K : w) + J + (z < D && z > -D ? K : z) + J + (r < D && r > -D ? K : r), I += J + (u < D && u > -D ? K : u) + J + (x < D && x > -D ? K : x) + J + (A < D && A > -D ? K : A) + J) : I += ",0,0,0,0,1,0,", I += j + J + k + J + l + J + (n ? 1 + -l / n : 1) + ")", c[Ca] = I
                        };
                    j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, za("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                        parser: function(a, b, d, e, f, h, i) {
                            if (e._lastParsedTransform === i) return f;
                            e._lastParsedTransform = i;
                            var j;
                            "function" == typeof i[d] && (j = i[d], i[d] = b);
                            var t, u, v, w, x, y, z, A, B, k = a._gsTransform,
                                l = a.style,
                                m = 1e-6,
                                n = Ba.length,
                                o = i,
                                p = {},
                                q = "transformOrigin",
                                r = Ra(a, g, !0, o.parseTransform),
                                s = o.transform && ("function" == typeof o.transform ? o.transform(V, U) : o.transform);
                            if (e._transform = r, s && "string" == typeof s && Ca) u = H.style, u[Ca] = s, u.display = "block", u.position = "absolute", F.body.appendChild(H), t = Ra(H, null, !1), r.svg && (y = r.xOrigin, z = r.yOrigin, t.x -= r.xOffset, t.y -= r.yOffset, (o.transformOrigin || o.svgOrigin) && (s = {}, Ma(a, ga(o.transformOrigin), s, o.svgOrigin, o.smoothOrigin, !0), y = s.xOrigin, z = s.yOrigin, t.x -= s.xOffset - r.xOffset, t.y -= s.yOffset - r.yOffset), (y || z) && (A = Qa(H, !0), t.x -= y - (y * A[0] + z * A[2]), t.y -= z - (y * A[1] + z * A[3]))), F.body.removeChild(H), t.perspective || (t.perspective = r.perspective), null != o.xPercent && (t.xPercent = ia(o.xPercent, r.xPercent)), null != o.yPercent && (t.yPercent = ia(o.yPercent, r.yPercent));
                            else if ("object" == typeof o) {
                                if (t = {
                                        scaleX: ia(null != o.scaleX ? o.scaleX : o.scale, r.scaleX),
                                        scaleY: ia(null != o.scaleY ? o.scaleY : o.scale, r.scaleY),
                                        scaleZ: ia(o.scaleZ, r.scaleZ),
                                        x: ia(o.x, r.x),
                                        y: ia(o.y, r.y),
                                        z: ia(o.z, r.z),
                                        xPercent: ia(o.xPercent, r.xPercent),
                                        yPercent: ia(o.yPercent, r.yPercent),
                                        perspective: ia(o.transformPerspective, r.perspective)
                                    }, x = o.directionalRotation, null != x)
                                    if ("object" == typeof x)
                                        for (u in x) o[u] = x[u];
                                    else o.rotation = x;
                                    "string" == typeof o.x && o.x.indexOf("%") !== -1 && (t.x = 0, t.xPercent = ia(o.x, r.xPercent)), "string" == typeof o.y && o.y.indexOf("%") !== -1 && (t.y = 0, t.yPercent = ia(o.y, r.yPercent)), t.rotation = ja("rotation" in o ? o.rotation : "shortRotation" in o ? o.shortRotation + "_short" : "rotationZ" in o ? o.rotationZ : r.rotation - r.skewY, r.rotation - r.skewY, "rotation", p), Fa && (t.rotationX = ja("rotationX" in o ? o.rotationX : "shortRotationX" in o ? o.shortRotationX + "_short" : r.rotationX || 0, r.rotationX, "rotationX", p), t.rotationY = ja("rotationY" in o ? o.rotationY : "shortRotationY" in o ? o.shortRotationY + "_short" : r.rotationY || 0, r.rotationY, "rotationY", p)), t.skewX = ja(o.skewX, r.skewX - r.skewY), (t.skewY = ja(o.skewY, r.skewY)) && (t.skewX += t.skewY, t.rotation += t.skewY)
                            }
                            for (Fa && null != o.force3D && (r.force3D = o.force3D, w = !0), r.skewType = o.skewType || r.skewType || c.defaultSkewType, v = r.force3D || r.z || r.rotationX || r.rotationY || t.z || t.rotationX || t.rotationY || t.perspective, v || null == o.scale || (t.scaleZ = 1); --n > -1;) B = Ba[n], s = t[B] - r[B], (s > m || s < -m || null != o[B] || null != E[B]) && (w = !0, f = new ua(r, B, r[B], s, f), B in p && (f.e = p[B]), f.xs0 = 0, f.plugin = h, e._overwriteProps.push(f.n));
                            return s = o.transformOrigin, r.svg && (s || o.svgOrigin) && (y = r.xOffset, z = r.yOffset, Ma(a, ga(s), t, o.svgOrigin, o.smoothOrigin), f = va(r, "xOrigin", (k ? r : t).xOrigin, t.xOrigin, f, q), f = va(r, "yOrigin", (k ? r : t).yOrigin, t.yOrigin, f, q), y === r.xOffset && z === r.yOffset || (f = va(r, "xOffset", k ? y : r.xOffset, r.xOffset, f, q), f = va(r, "yOffset", k ? z : r.yOffset, r.yOffset, f, q)), s = Ia ? null : "0px 0px"), (s || Fa && v && r.zOrigin) && (Ca ? (w = !0, B = Ea, s = (s || $(a, B, g, !1, "50% 50%")) + "", f = new ua(l, B, 0, 0, f, -1, q), f.b = l[B], f.plugin = h, Fa ? (u = r.zOrigin, s = s.split(" "), r.zOrigin = (s.length > 2 && (0 === u || "0px" !== s[2]) ? parseFloat(s[2]) : u) || 0, f.xs0 = f.e = s[0] + " " + (s[1] || "50%") + " 0px", f = new ua(r, "zOrigin", 0, 0, f, -1, f.n), f.b = u, f.xs0 = f.e = r.zOrigin) : f.xs0 = f.e = s) : ga(s + "", r)), w && (e._transformType = r.svg && Ia || !v && 3 !== this._transformType ? 2 : 3), j && (i[d] = j), f
                        },
                        prefix: !0
                    }), za("boxShadow", {
                        defaultValue: "0px 0px 0px 0px #999",
                        prefix: !0,
                        color: !0,
                        multi: !0,
                        keyword: "inset"
                    }), za("borderRadius", {
                        defaultValue: "0px",
                        parser: function(a, b, c, d, e, h) {
                            b = this.format(b);
                            var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, i = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                                j = a.style;
                            for (s = parseFloat(a.offsetWidth), t = parseFloat(a.offsetHeight), k = b.split(" "), l = 0; l < i.length; l++) this.p.indexOf("border") && (i[l] = Y(i[l])), o = n = $(a, i[l], g, !1, "0px"), o.indexOf(" ") !== -1 && (n = o.split(" "), o = n[0], n = n[1]), p = m = k[l], q = parseFloat(o), v = o.substr((q + "").length), w = "=" === p.charAt(1), w ? (r = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), r *= parseFloat(p), u = p.substr((r + "").length - (r < 0 ? 1 : 0)) || "") : (r = parseFloat(p), u = p.substr((r + "").length)), "" === u && (u = f[c] || v), u !== v && (x = _(a, "borderLeft", q, v), y = _(a, "borderTop", q, v), "%" === u ? (o = x / s * 100 + "%", n = y / t * 100 + "%") : "em" === u ? (z = _(a, "borderLeft", 1, "em"), o = x / z + "em", n = y / z + "em") : (o = x + "px", n = y + "px"), w && (p = parseFloat(o) + r + u, m = parseFloat(n) + r + u)), e = wa(j, i[l], o + " " + n, p + " " + m, !1, "0px", e);
                            return e
                        },
                        prefix: !0,
                        formatter: pa("0px 0px 0px 0px", !1, !0)
                    }), za("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                        defaultValue: "0px",
                        parser: function(a, b, c, d, e, f) {
                            return wa(a.style, c, this.format($(a, c, g, !1, "0px 0px")), this.format(b), !1, "0px", e)
                        },
                        prefix: !0,
                        formatter: pa("0px 0px", !1, !0)
                    }), za("backgroundPosition", {
                        defaultValue: "0 0",
                        parser: function(a, b, c, d, e, f) {
                            var l, m, n, o, p, q, h = "background-position",
                                i = g || Z(a, null),
                                j = this.format((i ? Q ? i.getPropertyValue(h + "-x") + " " + i.getPropertyValue(h + "-y") : i.getPropertyValue(h) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                                k = this.format(b);
                            if (j.indexOf("%") !== -1 != (k.indexOf("%") !== -1) && k.split(",").length < 2 && (q = $(a, "backgroundImage").replace(v, ""), q && "none" !== q)) {
                                for (l = j.split(" "), m = k.split(" "), I.setAttribute("src", q), n = 2; --n > -1;) j = l[n], o = j.indexOf("%") !== -1, o !== (m[n].indexOf("%") !== -1) && (p = 0 === n ? a.offsetWidth - I.width : a.offsetHeight - I.height, l[n] = o ? parseFloat(j) / 100 * p + "px" : parseFloat(j) / p * 100 + "%");
                                j = l.join(" ")
                            }
                            return this.parseComplex(a.style, j, k, e, f)
                        },
                        formatter: ga
                    }), za("backgroundSize", {
                        defaultValue: "0 0",
                        formatter: function(a) {
                            return a += "", ga(a.indexOf(" ") === -1 ? a + " " + a : a)
                        }
                    }), za("perspective", {
                        defaultValue: "0px",
                        prefix: !0
                    }), za("perspectiveOrigin", {
                        defaultValue: "50% 50%",
                        prefix: !0
                    }), za("transformStyle", {
                        prefix: !0
                    }), za("backfaceVisibility", {
                        prefix: !0
                    }), za("userSelect", {
                        prefix: !0
                    }), za("margin", {
                        parser: qa("marginTop,marginRight,marginBottom,marginLeft")
                    }), za("padding", {
                        parser: qa("paddingTop,paddingRight,paddingBottom,paddingLeft")
                    }), za("clip", {
                        defaultValue: "rect(0px,0px,0px,0px)",
                        parser: function(a, b, c, d, e, f) {
                            var h, i, j;
                            return Q < 9 ? (i = a.currentStyle, j = Q < 8 ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format($(a, this.p, g, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, e, f)
                        }
                    }), za("textShadow", {
                        defaultValue: "0px 0px 0px #999",
                        color: !0,
                        multi: !0
                    }), za("autoRound,strictUnits", {
                        parser: function(a, b, c, d, e) {
                            return e
                        }
                    }), za("border", {
                        defaultValue: "0px solid #000",
                        parser: function(a, b, c, d, e, f) {
                            var h = $(a, "borderTopWidth", g, !1, "0px"),
                                i = this.format(b).split(" "),
                                j = i[0].replace(o, "");
                            return "px" !== j && (h = parseFloat(h) / _(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + $(a, "borderTopStyle", g, !1, "solid") + " " + $(a, "borderTopColor", g, !1, "#000")), i.join(" "), e, f)
                        },
                        color: !0,
                        formatter: function(a) {
                            var b = a.split(" ");
                            return b[0] + " " + (b[1] || "solid") + " " + (a.match(oa) || ["#000"])[0]
                        }
                    }), za("borderWidth", {
                        parser: qa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                    }), za("float,cssFloat,styleFloat", {
                        parser: function(a, b, c, d, e, f) {
                            var g = a.style,
                                h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                            return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
                        }
                    });
                    var Ua = function(a) {
                        var e, b = this.t,
                            c = b.filter || $(this.data, "filter") || "",
                            d = this.s + this.c * a | 0;
                        100 === d && (c.indexOf("atrix(") === -1 && c.indexOf("radient(") === -1 && c.indexOf("oader(") === -1 ? (b.removeAttribute("filter"), e = !$(this.data, "filter")) : (b.filter = c.replace(r, ""), e = !0)), e || (this.xn1 && (b.filter = c = c || "alpha(opacity=" + d + ")"), c.indexOf("pacity") === -1 ? 0 === d && this.xn1 || (b.filter = c + " alpha(opacity=" + d + ")") : b.filter = c.replace(p, "opacity=" + d))
                    };
                    za("opacity,alpha,autoAlpha", {
                        defaultValue: "1",
                        parser: function(a, b, c, d, e, f) {
                            var h = parseFloat($(a, "opacity", g, !1, "1")),
                                i = a.style,
                                j = "autoAlpha" === c;
                            return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === $(a, "visibility", g) && 0 !== b && (h = 0), R ? e = new ua(i, "opacity", h, b - h, e) : (e = new ua(i, "opacity", 100 * h, 100 * (b - h), e), e.xn1 = j ? 1 : 0, i.zoom = 1, e.type = 2, e.b = "alpha(opacity=" + e.s + ")", e.e = "alpha(opacity=" + (e.s + e.c) + ")", e.data = a, e.plugin = f, e.setRatio = Ua), j && (e = new ua(i, "visibility", 0, 0, e, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), e.xs0 = "inherit", d._overwriteProps.push(e.n), d._overwriteProps.push(c)), e
                        }
                    });
                    var Va = function(a, b) {
                            b && (a.removeProperty ? ("ms" !== b.substr(0, 2) && "webkit" !== b.substr(0, 6) || (b = "-" + b), a.removeProperty(b.replace(t, "-$1").toLowerCase())) : a.removeAttribute(b))
                        },
                        Wa = function(a) {
                            if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                                this.t.setAttribute("class", 0 === a ? this.b : this.e);
                                for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
                                1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                        };
                    za("className", {
                        parser: function(a, b, c, d, f, h, i) {
                            var l, m, n, o, p, j = a.getAttribute("class") || "",
                                k = a.style.cssText;
                            if (f = d._classNamePT = new ua(a, c, 0, 0, f, 2), f.setRatio = Wa, f.pr = -11, e = !0, f.b = j, m = ba(a, g), n = a._gsClassPT) {
                                for (o = {}, p = n.data; p;) o[p.p] = 1, p = p._next;
                                n.setRatio(1)
                            }
                            return a._gsClassPT = f, f.e = "=" !== b.charAt(1) ? b : j.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", f.e), l = ca(a, m, ba(a), i, o), a.setAttribute("class", j), f.data = l.firstMPT, a.style.cssText = k, f = f.xfirst = d.parse(a, l.difs, f, h)
                        }
                    });
                    var Xa = function(a) {
                        if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                            var d, e, f, g, h, b = this.t.style,
                                c = i.transform.parse;
                            if ("all" === this.e) b.cssText = "", g = !0;
                            else
                                for (d = this.e.split(" ").join("").split(","), f = d.length; --f > -1;) e = d[f], i[e] && (i[e].parse === c ? g = !0 : e = "transformOrigin" === e ? Ea : i[e].p), Va(b, e);
                            g && (Va(b, Ca), h = this.t._gsTransform, h && (h.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                        }
                    };
                    for (za("clearProps", {
                            parser: function(a, b, c, d, f) {
                                return f = new ua(a, c, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = d._tween, e = !0, f
                            }
                        }), j = "bezier,throwProps,physicsProps,physics2D".split(","), xa = j.length; xa--;) Aa(j[xa]);
                    j = c.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function(a, b, d, j) {
                        if (!a.nodeType) return !1;
                        this._target = U = a, this._tween = d, this._vars = b, V = j, L = b.autoRound, e = !1, f = b.suffixMap || c.suffixMap, g = Z(a, ""), h = this._overwriteProps;
                        var l, m, n, o, p, r, s, t, u, k = a.style;
                        if (M && "" === k.zIndex && (l = $(a, "zIndex", g), "auto" !== l && "" !== l || this._addLazySet(k, "zIndex", 0)), "string" == typeof b && (o = k.cssText, l = ba(a, g), k.cssText = o + ";" + b, l = ca(a, l, ba(a)).difs, !R && q.test(b) && (l.opacity = parseFloat(RegExp.$1)), b = l, k.cssText = o), b.className ? this._firstPT = m = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = m = this.parse(a, b, null), this._transformType) {
                            for (u = 3 === this._transformType, Ca ? N && (M = !0, "" === k.zIndex && (s = $(a, "zIndex", g), "auto" !== s && "" !== s || this._addLazySet(k, "zIndex", 0)), P && this._addLazySet(k, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (u ? "visible" : "hidden"))) : k.zoom = 1, n = m; n && n._next;) n = n._next;
                            t = new ua(a, "transform", 0, 0, null, 2), this._linkCSSP(t, null, n), t.setRatio = Ca ? Ta : Sa, t.data = this._transform || Ra(a, g, !0), t.tween = d, t.pr = -1, h.pop()
                        }
                        if (e) {
                            for (; m;) {
                                for (r = m._next, n = o; n && n.pr > m.pr;) n = n._next;
                                (m._prev = n ? n._prev : p) ? m._prev._next = m: o = m, (m._next = n) ? n._prev = m : p = m, m = r
                            }
                            this._firstPT = o
                        }
                        return !0
                    }, j.parse = function(a, b, c, d) {
                        var h, j, k, l, m, n, p, q, r, t, e = a.style;
                        for (h in b) n = b[h], "function" == typeof n && (n = n(V, U)), j = i[h], j ? c = j.parse(a, n, h, this, c, d, b) : (m = $(a, h, g) + "", r = "string" == typeof n, "color" === h || "fill" === h || "stroke" === h || h.indexOf("Color") !== -1 || r && s.test(n) ? (r || (n = ma(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = wa(e, h, m, n, !0, "transparent", c, 0, d)) : r && B.test(n) ? c = wa(e, h, m, n, !0, null, c, 0, d) : (k = parseFloat(m), p = k || 0 === k ? m.substr((k + "").length) : "", "" !== m && "auto" !== m || ("width" === h || "height" === h ? (k = fa(a, h, g), p = "px") : "left" === h || "top" === h ? (k = aa(a, h, g), p = "px") : (k = "opacity" !== h ? 0 : 1, p = "")), t = r && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), q = n.replace(o, "")) : (l = parseFloat(n), q = r ? n.replace(o, "") : ""), "" === q && (q = h in f ? f[h] : p), n = l || 0 === l ? (t ? l + k : l) + q : b[h], p !== q && "" !== q && (l || 0 === l) && k && (k = _(a, h, k, p), "%" === q ? (k /= _(a, h, 100, "%") / 100, b.strictUnits !== !0 && (m = k + "%")) : "em" === q || "rem" === q || "vw" === q || "vh" === q ? k /= _(a, h, 1, q) : "px" !== q && (l = _(a, h, l, q), q = "px"), t && (l || 0 === l) && (n = l + k + q)), t && (l += k), !k && 0 !== k || !l && 0 !== l ? void 0 !== e[h] && (n || n + "" != "NaN" && null != n) ? (c = new ua(e, h, l || k || 0, 0, c, -1, h, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== h && h.indexOf("Style") === -1 ? n : m) : T("invalid " + h + " tween value: " + b[h]) : (c = new ua(e, h, k, l - k, c, 0, h, L !== !1 && ("px" === q || "zIndex" === h), 0, m, n), c.xs0 = q))), d && c && !c.plugin && (c.plugin = d);
                        return c
                    }, j.setRatio = function(a) {
                        var d, e, f, b = this._firstPT,
                            c = 1e-6;
                        if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                            if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                                for (; b;) {
                                    if (d = b.c * a + b.s, b.r ? d = Math.round(d) : d < c && d > -c && (d = 0), b.type)
                                        if (1 === b.type)
                                            if (f = b.l, 2 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2;
                                            else if (3 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3;
                                    else if (4 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4;
                                    else if (5 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4 + b.xn4 + b.xs5;
                                    else {
                                        for (e = b.xs0 + d + b.xs1, f = 1; f < b.l; f++) e += b["xn" + f] + b["xs" + (f + 1)];
                                        b.t[b.p] = e
                                    } else b.type === -1 ? b.t[b.p] = b.xs0 : b.setRatio && b.setRatio(a);
                                    else b.t[b.p] = d + b.xs0;
                                    b = b._next
                                } else
                                    for (; b;) 2 !== b.type ? b.t[b.p] = b.b : b.setRatio(a), b = b._next;
                            else
                                for (; b;) {
                                    if (2 !== b.type)
                                        if (b.r && b.type !== -1)
                                            if (d = Math.round(b.s + b.c), b.type) {
                                                if (1 === b.type) {
                                                    for (f = b.l, e = b.xs0 + d + b.xs1, f = 1; f < b.l; f++) e += b["xn" + f] + b["xs" + (f + 1)];
                                                    b.t[b.p] = e
                                                }
                                            } else b.t[b.p] = d + b.xs0;
                                    else b.t[b.p] = b.e;
                                    else b.setRatio(a);
                                    b = b._next
                                }
                    }, j._enableTransforms = function(a) {
                        this._transform = this._transform || Ra(this._target, g, !0), this._transformType = this._transform.svg && Ia || !a && 3 !== this._transformType ? 2 : 3
                    };
                    var Ya = function(a) {
                        this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                    };
                    j._addLazySet = function(a, b, c) {
                        var d = this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2);
                        d.e = c, d.setRatio = Ya, d.data = this
                    }, j._linkCSSP = function(a, b, c, d) {
                        return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
                    }, j._mod = function(a) {
                        for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next
                    }, j._kill = function(b) {
                        var d, e, f, c = b;
                        if (b.autoAlpha || b.alpha) {
                            c = {};
                            for (e in b) c[e] = b[e];
                            c.opacity = 1, c.autoAlpha && (c.visibility = 1)
                        }
                        for (b.className && (d = this._classNamePT) && (f = d.xfirst, f && f._prev ? this._linkCSSP(f._prev, d._next, f._prev._prev) : f === this._firstPT && (this._firstPT = d._next), d._next && this._linkCSSP(d._next, d._next._next, f._prev), this._classNamePT = null), d = this._firstPT; d;) d.plugin && d.plugin !== e && d.plugin._kill && (d.plugin._kill(b), e = d.plugin), d = d._next;
                        return a.prototype._kill.call(this, c)
                    };
                    var Za = function(a, b, c) {
                        var d, e, f, g;
                        if (a.slice)
                            for (e = a.length; --e > -1;) Za(a[e], b, c);
                        else
                            for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(ba(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c)
                    };
                    return c.cascadeTo = function(a, c, d) {
                        var k, l, m, n, e = b.to(a, c, d),
                            f = [e],
                            g = [],
                            h = [],
                            i = [],
                            j = b._internals.reservedProps;
                        for (a = e._targets || e.target, Za(a, g, i), e.render(c, !0, !0), Za(a, h), e.render(0, !0, !0), e._enabled(!0), k = i.length; --k > -1;)
                            if (l = ca(i[k], g[k], h[k]), l.firstMPT) {
                                l = l.difs;
                                for (m in d) j[m] && (l[m] = d[m]);
                                n = {};
                                for (m in l) n[m] = g[k][m];
                                f.push(b.fromTo(i[k], c, n, l))
                            }
                        return f
                    }, a.activate([c]), c
                }, !0),
                function() {
                    var a = _fwd_gsScope._gsDefine.plugin({
                            propName: "roundProps",
                            version: "1.6.0",
                            priority: -1,
                            API: 2,
                            init: function(a, b, c) {
                                return this._tween = c, !0
                            }
                        }),
                        b = function(a) {
                            for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
                        },
                        c = a.prototype;
                    c._onInitAllProps = function() {
                        for (var g, h, i, a = this._tween, c = a.vars.roundProps.join ? a.vars.roundProps : a.vars.roundProps.split(","), d = c.length, e = {}, f = a._propLookup.roundProps; --d > -1;) e[c[d]] = Math.round;
                        for (d = c.length; --d > -1;)
                            for (g = c[d], h = a._firstPT; h;) i = h._next, h.pg ? h.t._mod(e) : h.n === g && (2 === h.f && h.t ? b(h.t._firstPT) : (this._add(h.t, g, h.s, h.c), i && (i._prev = h._prev), h._prev ? h._prev._next = i : a._firstPT === h && (a._firstPT = i), h._next = h._prev = null, a._propLookup[g] = f)), h = i;
                        return !1
                    }, c._add = function(a, b, c, d) {
                        this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
                    }
                }(),
                function() {
                    _fwd_gsScope._gsDefine.plugin({
                        propName: "attr",
                        API: 2,
                        version: "0.6.0",
                        init: function(a, b, c, d) {
                            var e, f;
                            if ("function" != typeof a.setAttribute) return !1;
                            for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
                            return !0
                        }
                    })
                }(), _fwd_gsScope._gsDefine.plugin({
                    propName: "directionalRotation",
                    version: "0.3.0",
                    API: 2,
                    init: function(a, b, c, d) {
                        "object" != typeof b && (b = {
                            rotation: b
                        }), this.finals = {};
                        var g, h, i, j, k, l, e = b.useRadians === !0 ? 2 * Math.PI : 360,
                            f = 1e-6;
                        for (g in b) "useRadians" !== g && (j = b[g], "function" == typeof j && (j = j(d, a)), l = (j + "").split("_"), h = l[0], i = parseFloat("function" != typeof a[g] ? a[g] : a[g.indexOf("set") || "function" != typeof a["get" + g.substr(3)] ? g : "get" + g.substr(3)]()), j = this.finals[g] = "string" == typeof h && "=" === h.charAt(1) ? i + parseInt(h.charAt(0) + "1", 10) * Number(h.substr(2)) : Number(h) || 0, k = j - i, l.length && (h = l.join("_"), h.indexOf("short") !== -1 && (k %= e, k !== k % (e / 2) && (k = k < 0 ? k + e : k - e)), h.indexOf("_cw") !== -1 && k < 0 ? k = (k + 9999999999 * e) % e - (k / e | 0) * e : h.indexOf("ccw") !== -1 && k > 0 && (k = (k - 9999999999 * e) % e - (k / e | 0) * e)), (k > f || k < -f) && (this._addTween(a, g, i, i + k, g), this._overwriteProps.push(g)));
                        return !0
                    },
                    set: function(a) {
                        var b;
                        if (1 !== a) this._super.setRatio.call(this, a);
                        else
                            for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
                    }
                })._autoCSS = !0, _fwd_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
                    var o, p, q, b = _fwd_gsScope.GreenSockGlobals || _fwd_gsScope,
                        c = b.com.greensock,
                        d = 2 * Math.PI,
                        e = Math.PI / 2,
                        f = c._class,
                        g = function(b, c) {
                            var d = f("easing." + b, function() {}, !0),
                                e = d.prototype = new a;
                            return e.constructor = d, e.getRatio = c, d
                        },
                        h = a.register || function() {},
                        i = function(a, b, c, d, e) {
                            var g = f("easing." + a, {
                                easeOut: new b,
                                easeIn: new c,
                                easeInOut: new d
                            }, !0);
                            return h(g, a), g
                        },
                        j = function(a, b, c) {
                            this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
                        },
                        k = function(b, c) {
                            var d = f("easing." + b, function(a) {
                                    this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                                }, !0),
                                e = d.prototype = new a;
                            return e.constructor = d, e.getRatio = c, e.config = function(a) {
                                return new d(a)
                            }, d
                        },
                        l = i("Back", k("BackOut", function(a) {
                            return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                        }), k("BackIn", function(a) {
                            return a * a * ((this._p1 + 1) * a - this._p1)
                        }), k("BackInOut", function(a) {
                            return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                        })),
                        m = f("easing.SlowMo", function(a, b, c) {
                            b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
                        }, !0),
                        n = m.prototype = new a;
                    return n.constructor = m, n.getRatio = function(a) {
                        var b = a + (.5 - a) * this._p;
                        return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
                    }, m.ease = new m(.7, .7), n.config = m.config = function(a, b, c) {
                        return new m(a, b, c)
                    }, o = f("easing.SteppedEase", function(a) {
                        a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
                    }, !0), n = o.prototype = new a, n.constructor = o, n.getRatio = function(a) {
                        return a < 0 ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
                    }, n.config = o.config = function(a) {
                        return new o(a)
                    }, p = f("easing.RoughEase", function(b) {
                        b = b || {};
                        for (var m, n, o, p, q, r, c = b.taper || "none", d = [], e = 0, f = 0 | (b.points || 20), g = f, h = b.randomize !== !1, i = b.clamp === !0, k = b.template instanceof a ? b.template : null, l = "number" == typeof b.strength ? .4 * b.strength : .4; --g > -1;) m = h ? Math.random() : 1 / f * g, n = k ? k.getRatio(m) : m, "none" === c ? o = l : "out" === c ? (p = 1 - m, o = p * p * l) : "in" === c ? o = m * m * l : m < .5 ? (p = 2 * m, o = p * p * .5 * l) : (p = 2 * (1 - m), o = p * p * .5 * l), h ? n += Math.random() * o - .5 * o : g % 2 ? n += .5 * o : n -= .5 * o, i && (n > 1 ? n = 1 : n < 0 && (n = 0)), d[e++] = {
                            x: m,
                            y: n
                        };
                        for (d.sort(function(a, b) {
                                return a.x - b.x
                            }), r = new j(1, 1, null), g = f; --g > -1;) q = d[g], r = new j(q.x, q.y, r);
                        this._prev = new j(0, 0, 0 !== r.t ? r : r.next)
                    }, !0), n = p.prototype = new a, n.constructor = p, n.getRatio = function(a) {
                        var b = this._prev;
                        if (a > b.t) {
                            for (; b.next && a >= b.t;) b = b.next;
                            b = b.prev
                        } else
                            for (; b.prev && a <= b.t;) b = b.prev;
                        return this._prev = b, b.v + (a - b.t) / b.gap * b.c
                    }, n.config = function(a) {
                        return new p(a)
                    }, p.ease = new p, i("Bounce", g("BounceOut", function(a) {
                        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                    }), g("BounceIn", function(a) {
                        return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : a < 2 / 2.75 ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : a < 2.5 / 2.75 ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                    }), g("BounceInOut", function(a) {
                        var b = a < .5;
                        return a = b ? 1 - 2 * a : 2 * a - 1, a < 1 / 2.75 ? a *= 7.5625 * a : a = a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
                    })), i("Circ", g("CircOut", function(a) {
                        return Math.sqrt(1 - (a -= 1) * a)
                    }), g("CircIn", function(a) {
                        return -(Math.sqrt(1 - a * a) - 1)
                    }), g("CircInOut", function(a) {
                        return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                    })), q = function(b, c, e) {
                        var g = f("easing." + b, function(a, b) {
                                this._p1 = a >= 1 ? a : 1, this._p2 = (b || e) / (a < 1 ? a : 1), this._p3 = this._p2 / d * (Math.asin(1 / this._p1) || 0), this._p2 = d / this._p2
                            }, !0),
                            h = g.prototype = new a;
                        return h.constructor = g, h.getRatio = c, h.config = function(a, b) {
                            return new g(a, b)
                        }, g
                    }, i("Elastic", q("ElasticOut", function(a) {
                        return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
                    }, .3), q("ElasticIn", function(a) {
                        return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
                    }, .3), q("ElasticInOut", function(a) {
                        return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
                    }, .45)), i("Expo", g("ExpoOut", function(a) {
                        return 1 - Math.pow(2, -10 * a)
                    }), g("ExpoIn", function(a) {
                        return Math.pow(2, 10 * (a - 1)) - .001
                    }), g("ExpoInOut", function(a) {
                        return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
                    })), i("Sine", g("SineOut", function(a) {
                        return Math.sin(a * e)
                    }), g("SineIn", function(a) {
                        return -Math.cos(a * e) + 1
                    }), g("SineInOut", function(a) {
                        return -.5 * (Math.cos(Math.PI * a) - 1)
                    })), f("easing.EaseLookup", {
                        find: function(b) {
                            return a.map[b]
                        }
                    }, !0), h(b.SlowMo, "SlowMo", "ease,"), h(p, "RoughEase", "ease,"), h(o, "SteppedEase", "ease,"), l
                }, !0)
        }), _fwd_gsScope._gsDefine && _fwd_gsScope._fwd_gsQueue.pop()(),
        function(a, b) {
            "use strict";
            var c = {},
                d = a.GreenSockGlobals = a.GreenSockGlobals || a;
            if (!d.FWDTweenLite) {
                var k, l, m, n, o, e = function(a) {
                        var e, b = a.split("."),
                            c = d;
                        for (e = 0; e < b.length; e++) c[b[e]] = c = c[b[e]] || {};
                        return c
                    },
                    f = e("com.greensock"),
                    g = 1e-10,
                    h = function(a) {
                        var d, b = [],
                            c = a.length;
                        for (d = 0; d !== c; b.push(a[d++]));
                        return b
                    },
                    i = function() {},
                    j = function() {
                        var a = Object.prototype.toString,
                            b = a.call([]);
                        return function(c) {
                            return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                        }
                    }(),
                    p = {},
                    q = function(f, g, h, i) {
                        this.sc = p[f] ? p[f].sc : [], p[f] = this, this.gsClass = null, this.func = h;
                        var j = [];
                        this.check = function(k) {
                            for (var n, o, r, s, t, l = g.length, m = l; --l > -1;)(n = p[g[l]] || new q(g[l], [])).gsClass ? (j[l] = n.gsClass, m--) : k && n.sc.push(this);
                            if (0 === m && h) {
                                if (o = ("com.greensock." + f).split("."), r = o.pop(), s = e(o.join("."))[r] = this.gsClass = h.apply(h, j), i)
                                    if (d[r] = c[r] = s, t = "undefined" != typeof fwd_module && fwd_module.exports, !t && "function" == typeof define && define.amd) define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + f.split(".").pop(), [], function() {
                                        return s
                                    });
                                    else if (t)
                                    if (f === b) {
                                        fwd_module.exports = c[b] = s;
                                        for (l in c) s[l] = c[l]
                                    } else c[b] && (c[b][r] = s);
                                for (l = 0; l < this.sc.length; l++) this.sc[l].check()
                            }
                        }, this.check(!0)
                    },
                    r = a._gsDefine = function(a, b, c, d) {
                        return new q(a, b, c, d)
                    },
                    s = f._class = function(a, b, c) {
                        return b = b || function() {}, r(a, [], function() {
                            return b
                        }, c), b
                    };
                r.globals = d;
                var t = [0, 0, 1, 1],
                    v = s("easing.Ease", function(a, b, c, d) {
                        this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? t.concat(b) : t
                    }, !0),
                    w = v.map = {},
                    x = v.register = function(a, b, c, d) {
                        for (var i, j, k, l, e = b.split(","), g = e.length, h = (c || "easeIn,easeOut,easeInOut").split(","); --g > -1;)
                            for (j = e[g], i = d ? s("easing." + j, null, !0) : f.easing[j] || {}, k = h.length; --k > -1;) l = h[k], w[j + "." + l] = w[l + j] = i[l] = a.getRatio ? a : a[l] || new a
                    };
                for (m = v.prototype, m._calcEnd = !1, m.getRatio = function(a) {
                        if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                        var b = this._type,
                            c = this._power,
                            d = 1 === b ? 1 - a : 2 === b ? a : a < .5 ? 2 * a : 2 * (1 - a);
                        return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : a < .5 ? d / 2 : 1 - d / 2
                    }, k = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], l = k.length; --l > -1;) m = k[l] + ",Power" + l, x(new v(null, null, 1, l), m, "easeOut", !0), x(new v(null, null, 2, l), m, "easeIn" + (0 === l ? ",easeNone" : "")), x(new v(null, null, 3, l), m, "easeInOut");
                w.linear = f.easing.Linear.easeIn, w.swing = f.easing.Quad.easeInOut;
                var y = s("events.EventDispatcher", function(a) {
                    this._listeners = {}, this._eventTarget = a || this
                });
                m = y.prototype, m.addEventListener = function(a, b, c, d, e) {
                    e = e || 0;
                    var h, i, f = this._listeners[a],
                        g = 0;
                    for (this !== n || o || n.wake(), null == f && (this._listeners[a] = f = []), i = f.length; --i > -1;) h = f[i], h.c === b && h.s === c ? f.splice(i, 1) : 0 === g && h.pr < e && (g = i + 1);
                    f.splice(g, 0, {
                        c: b,
                        s: c,
                        up: d,
                        pr: e
                    })
                }, m.removeEventListener = function(a, b) {
                    var d, c = this._listeners[a];
                    if (c)
                        for (d = c.length; --d > -1;)
                            if (c[d].c === b) return void c.splice(d, 1)
                }, m.dispatchEvent = function(a) {
                    var c, d, e, b = this._listeners[a];
                    if (b)
                        for (c = b.length, c > 1 && (b = b.slice(0)), d = this._eventTarget; --c > -1;) e = b[c], e && (e.up ? e.c.call(e.s || d, {
                            type: a,
                            target: d
                        }) : e.c.call(e.s || d))
                };
                var z = a.requestAnimationFrame,
                    A = a.cancelAnimationFrame,
                    B = Date.now || function() {
                        return (new Date).getTime()
                    },
                    C = B();
                for (k = ["ms", "moz", "webkit", "o"], l = k.length; --l > -1 && !z;) z = a[k[l] + "RequestAnimationFrame"], A = a[k[l] + "CancelAnimationFrame"] || a[k[l] + "CancelRequestAnimationFrame"];
                s("Ticker", function(a, b) {
                    var k, l, m, p, q, c = this,
                        d = B(),
                        e = !(b === !1 || !z) && "auto",
                        f = 500,
                        h = 33,
                        j = "tick",
                        r = function(a) {
                            var e, g, b = B() - C;
                            b > f && (d += b - h), C += b, c.time = (C - d) / 1e3, e = c.time - q, (!k || e > 0 || a === !0) && (c.frame++, q += e + (e >= p ? .004 : p - e), g = !0), a !== !0 && (m = l(r)), g && c.dispatchEvent(j)
                        };
                    y.call(c), c.time = c.frame = 0, c.tick = function() {
                        r(!0)
                    }, c.lagSmoothing = function(a, b) {
                        f = a || 1 / g, h = Math.min(b, f, 0)
                    }, c.sleep = function() {
                        null != m && (e && A ? A(m) : clearTimeout(m), l = i, m = null, c === n && (o = !1))
                    }, c.wake = function(a) {
                        null !== m ? c.sleep() : a ? d += -C + (C = B()) : c.frame > 10 && (C = B() - f + 5), l = 0 === k ? i : e && z ? z : function(a) {
                            return setTimeout(a, 1e3 * (q - c.time) + 1 | 0)
                        }, c === n && (o = !0), r(2)
                    }, c.fps = function(a) {
                        return arguments.length ? (k = a, p = 1 / (k || 60), q = this.time + p, void c.wake()) : k
                    }, c.useRAF = function(a) {
                        return arguments.length ? (c.sleep(), e = a, void c.fps(k)) : e
                    }, c.fps(a), setTimeout(function() {
                        "auto" === e && c.frame < 5 && "hidden" !== document.visibilityState && c.useRAF(!1)
                    }, 1500)
                }), m = f.Ticker.prototype = new f.events.EventDispatcher, m.constructor = f.Ticker;
                var D = s("core.Animation", function(a, b) {
                    if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, W) {
                        o || n.wake();
                        var c = this.vars.useFrames ? V : W;
                        c.add(this, c._time), this.vars.paused && this.paused(!0)
                    }
                });
                n = D.ticker = new f.Ticker, m = D.prototype, m._dirty = m._gc = m._initted = m._paused = !1, m._totalTime = m._time = 0, m._rawPrevTime = -1, m._next = m._last = m._onUpdate = m._timeline = m.timeline = null, m._paused = !1;
                var E = function() {
                    o && B() - C > 2e3 && n.wake(), setTimeout(E, 2e3)
                };
                E(), m.play = function(a, b) {
                    return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
                }, m.pause = function(a, b) {
                    return null != a && this.seek(a, b), this.paused(!0)
                }, m.resume = function(a, b) {
                    return null != a && this.seek(a, b), this.paused(!1)
                }, m.seek = function(a, b) {
                    return this.totalTime(Number(a), b !== !1)
                }, m.restart = function(a, b) {
                    return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
                }, m.reverse = function(a, b) {
                    return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
                }, m.render = function(a, b, c) {}, m.invalidate = function() {
                    return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
                }, m.isActive = function() {
                    var c, a = this._timeline,
                        b = this._startTime;
                    return !a || !this._gc && !this._paused && a.isActive() && (c = a.rawTime()) >= b && c < b + this.totalDuration() / this._timeScale
                }, m._enabled = function(a, b) {
                    return o || n.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
                }, m._kill = function(a, b) {
                    return this._enabled(!1, !1)
                }, m.kill = function(a, b) {
                    return this._kill(a, b), this
                }, m._uncache = function(a) {
                    for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
                    return this
                }, m._swapSelfInParams = function(a) {
                    for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
                    return c
                }, m._callback = function(a) {
                    var b = this.vars,
                        c = b[a],
                        d = b[a + "Params"],
                        e = b[a + "Scope"] || b.callbackScope || this,
                        f = d ? d.length : 0;
                    switch (f) {
                        case 0:
                            c.call(e);
                            break;
                        case 1:
                            c.call(e, d[0]);
                            break;
                        case 2:
                            c.call(e, d[0], d[1]);
                            break;
                        default:
                            c.apply(e, d)
                    }
                }, m.eventCallback = function(a, b, c, d) {
                    if ("on" === (a || "").substr(0, 2)) {
                        var e = this.vars;
                        if (1 === arguments.length) return e[a];
                        null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = j(c) && c.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
                    }
                    return this
                }, m.delay = function(a) {
                    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
                }, m.duration = function(a) {
                    return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
                }, m.totalDuration = function(a) {
                    return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
                }, m.time = function(a, b) {
                    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
                }, m.totalTime = function(a, b, c) {
                    if (o || n.wake(), !arguments.length) return this._totalTime;
                    if (this._timeline) {
                        if (a < 0 && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                            this._dirty && this.totalDuration();
                            var d = this._totalDuration,
                                e = this._timeline;
                            if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                                for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                        }
                        this._gc && this._enabled(!0, !1), this._totalTime === a && 0 !== this._duration || (J.length && Y(), this.render(a, b, !1), J.length && Y())
                    }
                    return this
                }, m.progress = m.totalProgress = function(a, b) {
                    var c = this.duration();
                    return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
                }, m.startTime = function(a) {
                    return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
                }, m.endTime = function(a) {
                    return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
                }, m.timeScale = function(a) {
                    if (!arguments.length) return this._timeScale;
                    if (a = a || g, this._timeline && this._timeline.smoothChildTiming) {
                        var b = this._pauseTime,
                            c = b || 0 === b ? b : this._timeline.totalTime();
                        this._startTime = c - (c - this._startTime) * this._timeScale / a
                    }
                    return this._timeScale = a, this._uncache(!1)
                }, m.reversed = function(a) {
                    return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                }, m.paused = function(a) {
                    if (!arguments.length) return this._paused;
                    var c, d, b = this._timeline;
                    return a != this._paused && b && (o || a || n.wake(), c = b.rawTime(), d = c - this._pauseTime, !a && b.smoothChildTiming && (this._startTime += d, this._uncache(!1)), this._pauseTime = a ? c : null, this._paused = a, this._active = this.isActive(), !a && 0 !== d && this._initted && this.duration() && (c = b.smoothChildTiming ? this._totalTime : (c - this._startTime) / this._timeScale, this.render(c, c === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
                };
                var F = s("core.SimpleTimeline", function(a) {
                    D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
                });
                m = F.prototype = new D, m.constructor = F, m.kill()._gc = !1, m._first = m._last = m._recent = null, m._sortChildren = !1, m.add = m.insert = function(a, b, c, d) {
                    var e, f;
                    if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
                        for (f = a._startTime; e && e._startTime > f;) e = e._prev;
                    return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
                }, m._remove = function(a, b) {
                    return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                }, m.render = function(a, b, c) {
                    var e, d = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = a; d;) e = d._next, (d._active || a >= d._startTime && !d._paused) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = e
                }, m.rawTime = function() {
                    return o || n.wake(), this._totalTime
                };
                var G = s("FWDTweenLite", function(b, c, d) {
                        if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target.";
                        this.target = b = "string" != typeof b ? b : G.selector(b) || b;
                        var i, k, l, e = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                            f = this.vars.overwrite;
                        if (this._overwrite = f = null == f ? U[G.defaultOverwrite] : "number" == typeof f ? f >> 0 : U[f], (e || b instanceof Array || b.push && j(b)) && "number" != typeof b[0])
                            for (this._targets = l = h(b), this._propLookup = [], this._siblings = [], i = 0; i < l.length; i++) k = l[i], k ? "string" != typeof k ? k.length && k !== a && k[0] && (k[0] === a || k[0].nodeType && k[0].style && !k.nodeType) ? (l.splice(i--, 1), this._targets = l = l.concat(h(k))) : (this._siblings[i] = Z(k, this, !1), 1 === f && this._siblings[i].length > 1 && _(k, this, null, 1, this._siblings[i])) : (k = l[i--] = G.selector(k), "string" == typeof k && l.splice(i + 1, 1)) : l.splice(i--, 1);
                        else this._propLookup = {}, this._siblings = Z(b, this, !1), 1 === f && this._siblings.length > 1 && _(b, this, null, 1, this._siblings);
                        (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -g, this.render(Math.min(0, -this._delay)))
                    }, !0),
                    H = function(b) {
                        return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                    },
                    I = function(a, b) {
                        var d, c = {};
                        for (d in a) T[d] || d in b && "transform" !== d && "x" !== d && "y" !== d && "width" !== d && "height" !== d && "className" !== d && "border" !== d || !(!Q[d] || Q[d] && Q[d]._autoCSS) || (c[d] = a[d], delete a[d]);
                        a.css = c
                    };
                m = G.prototype = new D, m.constructor = G, m.kill()._gc = !1, m.ratio = 0, m._firstPT = m._targets = m._overwrittenProps = m._startAt = null, m._notifyPluginsOfEnabled = m._lazy = !1, G.version = "1.19.0", G.defaultEase = m._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = n, G.autoSleep = 120, G.lagSmoothing = function(a, b) {
                    n.lagSmoothing(a, b)
                }, G.selector = a.$ || a.jQuery || function(b) {
                    var c = a.$ || a.jQuery;
                    return c ? (G.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
                };
                var J = [],
                    K = {},
                    L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                    M = function(a) {
                        for (var d, b = this._firstPT, c = 1e-6; b;) d = b.blob ? a ? this.join("") : this.start : b.c * a + b.s, b.m ? d = b.m(d, this._target || b.t) : d < c && d > -c && (d = 0), b.f ? b.fp ? b.t[b.p](b.fp, d) : b.t[b.p](d) : b.t[b.p] = d, b = b._next
                    },
                    N = function(a, b, c, d) {
                        var i, j, k, l, m, n, o, e = [a, b],
                            f = 0,
                            g = "",
                            h = 0;
                        for (e.start = a, c && (c(e), a = e[0], b = e[1]), e.length = 0, i = a.match(L) || [], j = b.match(L) || [], d && (d._next = null, d.blob = 1, e._firstPT = e._applyPT = d), m = j.length, l = 0; l < m; l++) o = j[l], n = b.substr(f, b.indexOf(o, f) - f), g += n || !l ? n : ",", f += n.length, h ? h = (h + 1) % 5 : "rgba(" === n.substr(-5) && (h = 1), o === i[l] || i.length <= l ? g += o : (g && (e.push(g), g = ""), k = parseFloat(i[l]), e.push(k), e._firstPT = {
                            _next: e._firstPT,
                            t: e,
                            p: e.length - 1,
                            s: k,
                            c: ("=" === o.charAt(1) ? parseInt(o.charAt(0) + "1", 10) * parseFloat(o.substr(2)) : parseFloat(o) - k) || 0,
                            f: 0,
                            m: h && h < 4 ? Math.round : 0
                        }), f += o.length;
                        return g += b.substr(f), g && e.push(g), e.setRatio = M, e
                    },
                    O = function(a, b, c, d, e, f, g, h, i) {
                        "function" == typeof d && (d = d(i || 0, a));
                        var n, o, j = "get" === c ? a[b] : c,
                            k = typeof a[b],
                            l = "string" == typeof d && "=" === d.charAt(1),
                            m = {
                                t: a,
                                p: b,
                                s: j,
                                f: "function" === k,
                                pg: 0,
                                n: e || b,
                                m: f ? "function" == typeof f ? f : Math.round : 0,
                                pr: 0,
                                c: l ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - j || 0
                            };
                        if ("number" !== k && ("function" === k && "get" === c && (o = b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), m.s = j = g ? a[o](g) : a[o]()), "string" == typeof j && (g || isNaN(j)) ? (m.fp = g, n = N(j, d, h || G.defaultStringFilter, m), m = {
                                t: n,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: 2,
                                pg: 0,
                                n: e || b,
                                pr: 0,
                                m: 0
                            }) : l || (m.s = parseFloat(j), m.c = parseFloat(d) - m.s || 0)), m.c) return (m._next = this._firstPT) && (m._next._prev = m), this._firstPT = m, m
                    },
                    P = G._internals = {
                        isArray: j,
                        isSelector: H,
                        lazyTweens: J,
                        blobDif: N
                    },
                    Q = G._plugins = {},
                    R = P.tweenLookup = {},
                    S = 0,
                    T = P.reservedProps = {
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
                        autoCSS: 1,
                        lazy: 1,
                        onOverwrite: 1,
                        callbackScope: 1,
                        stringFilter: 1,
                        id: 1
                    },
                    U = {
                        none: 0,
                        all: 1,
                        auto: 2,
                        concurrent: 3,
                        allOnStart: 4,
                        preexisting: 5,
                        true: 1,
                        false: 0
                    },
                    V = D._rootFramesTimeline = new F,
                    W = D._rootTimeline = new F,
                    X = 30,
                    Y = P.lazyRender = function() {
                        var b, a = J.length;
                        for (K = {}; --a > -1;) b = J[a], b && b._lazy !== !1 && (b.render(b._lazy[0], b._lazy[1], !0), b._lazy = !1);
                        J.length = 0
                    };
                W._startTime = n.time, V._startTime = n.frame, W._active = V._active = !0, setTimeout(Y, 1), D._updateRoot = G.render = function() {
                    var a, b, c;
                    if (J.length && Y(), W.render((n.time - W._startTime) * W._timeScale, !1, !1), V.render((n.frame - V._startTime) * V._timeScale, !1, !1), J.length && Y(), n.frame >= X) {
                        X = n.frame + (parseInt(G.autoSleep, 10) || 120);
                        for (c in R) {
                            for (b = R[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                            0 === b.length && delete R[c]
                        }
                        if (c = W._first, (!c || c._paused) && G.autoSleep && !V._first && 1 === n._listeners.tick.length) {
                            for (; c && c._paused;) c = c._next;
                            c || n.sleep()
                        }
                    }
                }, n.addEventListener("tick", D._updateRoot);
                var Z = function(a, b, c) {
                        var e, f, d = a._gsTweenID;
                        if (R[d || (a._gsTweenID = d = "t" + S++)] || (R[d] = {
                                target: a,
                                tweens: []
                            }), b && (e = R[d].tweens, e[f = e.length] = b, c))
                            for (; --f > -1;) e[f] === b && e.splice(f, 1);
                        return R[d].tweens
                    },
                    $ = function(a, b, c, d) {
                        var f, g, e = a.vars.onOverwrite;
                        return e && (f = e(a, b, c, d)), e = G.onOverwrite, e && (g = e(a, b, c, d)), f !== !1 && g !== !1
                    },
                    _ = function(a, b, c, d, e) {
                        var f, h, i, j;
                        if (1 === d || d >= 4) {
                            for (j = e.length, f = 0; f < j; f++)
                                if ((i = e[f]) !== b) i._gc || i._kill(null, a, b) && (h = !0);
                                else if (5 === d) break;
                            return h
                        }
                        var o, k = b._startTime + g,
                            l = [],
                            m = 0,
                            n = 0 === b._duration;
                        for (f = e.length; --f > -1;)(i = e[f]) === b || i._gc || i._paused || (i._timeline !== b._timeline ? (o = o || aa(b, 0, n), 0 === aa(i, o, n) && (l[m++] = i)) : i._startTime <= k && i._startTime + i.totalDuration() / i._timeScale > k && ((n || !i._initted) && k - i._startTime <= 2e-10 || (l[m++] = i)));
                        for (f = m; --f > -1;)
                            if (i = l[f], 2 === d && i._kill(c, a, b) && (h = !0), 2 !== d || !i._firstPT && i._initted) {
                                if (2 !== d && !$(i, b)) continue;
                                i._enabled(!1, !1) && (h = !0)
                            }
                        return h
                    },
                    aa = function(a, b, c) {
                        for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                            if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                            d = d._timeline
                        }
                        return f /= e, f > b ? f - b : c && f === b || !a._initted && f - b < 2 * g ? g : (f += a.totalDuration() / a._timeScale / e) > b + g ? 0 : f - b - g
                    };
                m._init = function() {
                    var f, g, h, i, j, k, a = this.vars,
                        b = this._overwrittenProps,
                        c = this._duration,
                        d = !!a.immediateRender,
                        e = a.ease;
                    if (a.startAt) {
                        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), j = {};
                        for (i in a.startAt) j[i] = a.startAt[i];
                        if (j.overwrite = !1, j.immediateRender = !0, j.lazy = d && a.lazy !== !1, j.startAt = j.delay = null, this._startAt = G.to(this.target, 0, j), d)
                            if (this._time > 0) this._startAt = null;
                            else if (0 !== c) return
                    } else if (a.runBackwards && 0 !== c)
                        if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                        else {
                            0 !== this._time && (d = !1), h = {};
                            for (i in a) T[i] && "autoCSS" !== i || (h[i] = a[i]);
                            if (h.overwrite = 0, h.data = "isFromStart", h.lazy = d && a.lazy !== !1, h.immediateRender = d, this._startAt = G.to(this.target, 0, h), d) {
                                if (0 === this._time) return
                            } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                        }
                    if (this._ease = e = e ? e instanceof v ? e : "function" == typeof e ? new v(e, a.easeParams) : w[e] || G.defaultEase : G.defaultEase, a.easeParams instanceof Array && e.config && (this._ease = e.config.apply(e, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                        for (k = this._targets.length, f = 0; f < k; f++) this._initProps(this._targets[f], this._propLookup[f] = {}, this._siblings[f], b ? b[f] : null, f) && (g = !0);
                    else g = this._initProps(this.target, this._propLookup, this._siblings, b, 0);
                    if (g && G._onPluginEvent("_onInitAllProps", this), b && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards)
                        for (h = this._firstPT; h;) h.s += h.c, h.c = -h.c, h = h._next;
                    this._onUpdate = a.onUpdate, this._initted = !0
                }, m._initProps = function(b, c, d, e, f) {
                    var g, h, i, k, l, m;
                    if (null == b) return !1;
                    K[b._gsTweenID] && Y(), this.vars.css || b.style && b !== a && b.nodeType && Q.css && this.vars.autoCSS !== !1 && I(this.vars, b);
                    for (g in this.vars)
                        if (m = this.vars[g], T[g]) m && (m instanceof Array || m.push && j(m)) && m.join("").indexOf("{self}") !== -1 && (this.vars[g] = m = this._swapSelfInParams(m, this));
                        else if (Q[g] && (k = new Q[g])._onInitTween(b, this.vars[g], this, f)) {
                        for (this._firstPT = l = {
                                _next: this._firstPT,
                                t: k,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: 1,
                                n: g,
                                pg: 1,
                                pr: k._priority,
                                m: 0
                            }, h = k._overwriteProps.length; --h > -1;) c[k._overwriteProps[h]] = this._firstPT;
                        (k._priority || k._onInitAllProps) && (i = !0), (k._onDisable || k._onEnable) && (this._notifyPluginsOfEnabled = !0), l._next && (l._next._prev = l)
                    } else c[g] = O.call(this, b, g, "get", m, g, 0, null, this.vars.stringFilter, f);
                    return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && _(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i)
                }, m.render = function(a, b, c) {
                    var h, i, j, k, d = this._time,
                        e = this._duration,
                        f = this._rawPrevTime;
                    if (a >= e - 1e-7) this._totalTime = this._time = e, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (h = !0, i = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === e && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (f < 0 || a <= 0 && a >= -1e-7 || f === g && "isPause" !== this.data) && f !== a && (c = !0, f > g && (i = "onReverseComplete")), this._rawPrevTime = k = !b || a || f === a ? a : g);
                    else if (a < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === e && f > 0) && (i = "onReverseComplete", h = this._reversed), a < 0 && (this._active = !1, 0 === e && (this._initted || !this.vars.lazy || c) && (f >= 0 && (f !== g || "isPause" !== this.data) && (c = !0), this._rawPrevTime = k = !b || a || f === a ? a : g)), this._initted || (c = !0);
                    else if (this._totalTime = this._time = a, this._easeType) {
                        var l = a / e,
                            m = this._easeType,
                            n = this._easePower;
                        (1 === m || 3 === m && l >= .5) && (l = 1 - l), 3 === m && (l *= 2), 1 === n ? l *= l : 2 === n ? l *= l * l : 3 === n ? l *= l * l * l : 4 === n && (l *= l * l * l * l), 1 === m ? this.ratio = 1 - l : 2 === m ? this.ratio = l : a / e < .5 ? this.ratio = l / 2 : this.ratio = 1 - l / 2
                    } else this.ratio = this._ease.getRatio(a / e);
                    if (this._time !== d || c) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = d, this._rawPrevTime = f, J.push(this), void(this._lazy = [a, b]);
                            this._time && !h ? this.ratio = this._ease.getRatio(this._time / e) : h && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && a >= 0 && (this._active = !0), 0 === d && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : i || (i = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== e || b || this._callback("onStart"))), j = this._firstPT; j;) j.f ? j.t[j.p](j.c * this.ratio + j.s) : j.t[j.p] = j.c * this.ratio + j.s, j = j._next;
                        this._onUpdate && (a < 0 && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== d || h || c) && this._callback("onUpdate")), i && (this._gc && !c || (a < 0 && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), h && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[i] && this._callback(i), 0 === e && this._rawPrevTime === g && k !== g && (this._rawPrevTime = 0)))
                    }
                }, m._kill = function(a, b, c) {
                    if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                    b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
                    var e, f, g, h, i, k, l, m, n, d = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
                    if ((j(b) || H(b)) && "number" != typeof b[0])
                        for (e = b.length; --e > -1;) this._kill(a, b[e], c) && (k = !0);
                    else {
                        if (this._targets) {
                            for (e = this._targets.length; --e > -1;)
                                if (b === this._targets[e]) {
                                    i = this._propLookup[e] || {}, this._overwrittenProps = this._overwrittenProps || [], f = this._overwrittenProps[e] = a ? this._overwrittenProps[e] || {} : "all";
                                    break
                                }
                        } else {
                            if (b !== this.target) return !1;
                            i = this._propLookup, f = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                        }
                        if (i) {
                            if (l = a || i, m = a !== f && "all" !== f && a !== i && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
                                for (g in l) i[g] && (n || (n = []), n.push(g));
                                if ((n || !a) && !$(this, c, b, n)) return !1
                            }
                            for (g in l)(h = i[g]) && (d && (h.f ? h.t[h.p](h.s) : h.t[h.p] = h.s, k = !0), h.pg && h.t._kill(l) && (k = !0), h.pg && 0 !== h.t._overwriteProps.length || (h._prev ? h._prev._next = h._next : h === this._firstPT && (this._firstPT = h._next), h._next && (h._next._prev = h._prev), h._next = h._prev = null), delete i[g]), m && (f[g] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return k
                }, m.invalidate = function() {
                    return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -g, this.render(Math.min(0, -this._delay))), this
                }, m._enabled = function(a, b) {
                    if (o || n.wake(), a && this._gc) {
                        var d, c = this._targets;
                        if (c)
                            for (d = c.length; --d > -1;) this._siblings[d] = Z(c[d], this, !0);
                        else this._siblings = Z(this.target, this, !0)
                    }
                    return D.prototype._enabled.call(this, a, b), !(!this._notifyPluginsOfEnabled || !this._firstPT) && G._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
                }, G.to = function(a, b, c) {
                    return new G(a, b, c)
                }, G.from = function(a, b, c) {
                    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
                }, G.fromTo = function(a, b, c, d) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d)
                }, G.delayedCall = function(a, b, c, d, e) {
                    return new G(b, 0, {
                        delay: a,
                        onComplete: b,
                        onCompleteParams: c,
                        callbackScope: d,
                        onReverseComplete: b,
                        onReverseCompleteParams: c,
                        immediateRender: !1,
                        lazy: !1,
                        useFrames: e,
                        overwrite: 0
                    })
                }, G.set = function(a, b) {
                    return new G(a, 0, b)
                }, G.getTweensOf = function(a, b) {
                    if (null == a) return [];
                    a = "string" != typeof a ? a : G.selector(a) || a;
                    var c, d, e, f;
                    if ((j(a) || H(a)) && "number" != typeof a[0]) {
                        for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
                        for (c = d.length; --c > -1;)
                            for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                    } else
                        for (d = Z(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                    return d
                }, G.killTweensOf = G.killDelayedCallsTo = function(a, b, c) {
                    "object" == typeof b && (c = b, b = !1);
                    for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
                };
                var ba = s("plugins.TweenPlugin", function(a, b) {
                    this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ba.prototype
                }, !0);
                if (m = ba.prototype, ba.version = "1.19.0", ba.API = 2, m._firstPT = null, m._addTween = O, m.setRatio = M, m._kill = function(a) {
                        var d, b = this._overwriteProps,
                            c = this._firstPT;
                        if (null != a[this._propName]) this._overwriteProps = [];
                        else
                            for (d = b.length; --d > -1;) null != a[b[d]] && b.splice(d, 1);
                        for (; c;) null != a[c.n] && (c._next && (c._next._prev = c._prev), c._prev ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next)), c = c._next;
                        return !1
                    }, m._mod = m._roundProps = function(a) {
                        for (var c, b = this._firstPT; b;) c = a[this._propName] || null != b.n && a[b.n.split(this._propName + "_").join("")], c && "function" == typeof c && (2 === b.f ? b.t._applyPT.m = c : b.m = c), b = b._next
                    }, G._onPluginEvent = function(a, b) {
                        var d, e, f, g, h, c = b._firstPT;
                        if ("_onInitAllProps" === a) {
                            for (; c;) {
                                for (h = c._next, e = f; e && e.pr > c.pr;) e = e._next;
                                (c._prev = e ? e._prev : g) ? c._prev._next = c: f = c, (c._next = e) ? e._prev = c : g = c, c = h
                            }
                            c = b._firstPT = f
                        }
                        for (; c;) c.pg && "function" == typeof c.t[a] && c.t[a]() && (d = !0), c = c._next;
                        return d
                    }, ba.activate = function(a) {
                        for (var b = a.length; --b > -1;) a[b].API === ba.API && (Q[(new a[b])._propName] = a[b]);
                        return !0
                    }, r.plugin = function(a) {
                        if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                        var h, b = a.propName,
                            c = a.priority || 0,
                            d = a.overwriteProps,
                            e = {
                                init: "_onInitTween",
                                set: "setRatio",
                                kill: "_kill",
                                round: "_mod",
                                mod: "_mod",
                                initAll: "_onInitAllProps"
                            },
                            f = s("plugins." + b.charAt(0).toUpperCase() + b.substr(1) + "Plugin", function() {
                                ba.call(this, b, c), this._overwriteProps = d || []
                            }, a.fwd_global === !0),
                            g = f.prototype = new ba(b);
                        g.constructor = f, f.API = a.API;
                        for (h in e) "function" == typeof a[h] && (g[e[h]] = a[h]);
                        return f.version = a.version, ba.activate([f]), f
                    }, k = a._fwd_gsQueue) {
                    for (l = 0; l < k.length; l++) k[l]();
                    for (m in p) p[m].func || a.console.log("GSAP encountered missing dependency: " + m)
                }
                o = !1
            }
        }("undefined" != typeof fwd_module && fwd_module.exports && "undefined" != typeof fwd_global ? fwd_global : this || window, "FWDAnimation")
}! function(a) {
    var b = function() {
        var c = this;
        b.prototype;
        this.main_do = null, this.init = function() {
            this.setupScreen(), a.onerror = this.showError, this.screen.style.zIndex = 1e20, setTimeout(this.addConsoleToDom, 100), setInterval(this.position, 100)
        }, this.position = function() {
            var a = FWDUVPUtils.getScrollOffsets();
            c.setX(a.x + 100), c.setY(a.y)
        }, this.addConsoleToDom = function() {
            navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 ? document.getElementsByTagName("body")[0].appendChild(c.screen) : document.documentElement.appendChild(c.screen)
        }, this.setupScreen = function() {
            this.main_do = new FWDUVPDisplayObject("div", "absolute"), this.main_do.setOverflow("auto"), this.main_do.setWidth(300), this.main_do.setHeight(200), this.setWidth(300), this.setHeight(200), this.main_do.setBkColor("#FFFFFF"), this.addChild(this.main_do)
        }, this.showError = function(a, b, d) {
            var e = c.main_do.getInnerHTML() + "<br>JavaScript error: " + a + " on line " + d + " for " + b;
            c.main_do.setInnerHTML(e), c.main_do.screen.scrollTop = c.main_do.screen.scrollHeight
        }, this.log = function(a) {
            var b = c.main_do.getInnerHTML() + "<br>" + a;
            c.main_do.setInnerHTML(b), c.main_do.getScreen().scrollTop = 1e4
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div", "absolute")
    }, b.prototype = null, a.FWDConsole = b
}(window);
var Froogaloop = function() {
    function a(b) {
        return new a.fn.init(b)
    }

    function b(a, b, c) {
        return !!c.contentWindow.postMessage && (a = JSON.stringify({
            method: a,
            value: b
        }), void c.contentWindow.postMessage(a, g))
    }

    function c(a) {
        var b, c;
        try {
            b = JSON.parse(a.data), c = b.event || b.method
        } catch (a) {}
        if ("ready" != c || f || (f = !0), !/^https?:\/\/player.vimeo.com/.test(a.origin)) return !1;
        "*" === g && (g = a.origin), a = b.value;
        var d = b.data,
            h = "" === h ? null : b.player_id;
        return b = h ? e[h][c] : e[c], c = [], !!b && (void 0 !== a && c.push(a), d && c.push(d), h && c.push(h), 0 < c.length ? b.apply(null, c) : b.call())
    }

    function d(a, b, c) {
        c ? (e[c] || (e[c] = {}), e[c][a] = b) : e[a] = b
    }
    var e = {},
        f = !1,
        g = "*";
    return a.fn = a.prototype = {
        element: null,
        init: function(a) {
            return "string" == typeof a && (a = document.getElementById(a)), this.element = a, this
        },
        api: function(a, c) {
            if (!this.element || !a) return !1;
            var e = this.element,
                f = "" !== e.id ? e.id : null,
                g = c && c.constructor && c.call && c.apply ? null : c,
                h = c && c.constructor && c.call && c.apply ? c : null;
            return h && d(a, h, f), b(a, g, e), this
        },
        addEvent: function(a, c) {
            if (!this.element) return !1;
            var e = this.element,
                g = "" !== e.id ? e.id : null;
            return d(a, c, g), "ready" != a ? b("addEventListener", a, e) : "ready" == a && f && c.call(null, g), this
        },
        removeEvent: function(a) {
            if (!this.element) return !1;
            var c = this.element,
                d = "" !== c.id ? c.id : null;
            a: {
                if (d && e[d]) {
                    if (!e[d][a]) {
                        d = !1;
                        break a
                    }
                    e[d][a] = null
                } else {
                    if (!e[a]) {
                        d = !1;
                        break a
                    }
                    e[a] = null
                }
                d = !0
            }
            "ready" != a && d && b("removeEventListener", a, c)
        }
    }, a.fn.init.prototype = a.fn, window.addEventListener ? window.addEventListener("message", c, !1) : window.attachEvent("onmessage", c), window.Froogaloop = window.$f = a
}();
if (function(a) {
        function l(b, c, d) {
            function h() {
                f && (f.apply(a, arguments), g || (delete c[e], f = null))
            }
            var e, f = d[0],
                g = b === i;
            return d[0] = h, e = b.apply(a, d), c[e] = {
                args: d,
                created: Date.now(),
                cb: f,
                id: e
            }, e
        }

        function m(b, c, d, e, f) {
            function l() {
                g.cb && (g.cb.apply(a, arguments), h || (delete d[e], g.cb = null))
            }
            var g = d[e];
            if (g) {
                var h = b === i;
                if (c(g.id), !h) {
                    var j = g.args[1],
                        k = Date.now() - g.created;
                    k < 0 && (k = 0), j -= k, j < 0 && (j = 0), g.args[1] = j
                }
                g.args[0] = l, g.created = Date.now(), g.id = b.apply(a, g.args)
            }
        }
        var b = navigator.platform,
            c = !1;
        if ("iPad" != b && "iPhone" != b || (c = !0), c) {
            var d = navigator.userAgent,
                e = !1;
            if (d.indexOf("6") != -1 && (e = !0), e) {
                var f = {},
                    g = {},
                    h = a.setTimeout,
                    i = a.setInterval,
                    j = a.clearTimeout,
                    k = a.clearInterval;
                a.setTimeout = function() {
                    return l(h, f, arguments)
                }, a.setInterval = function() {
                    return l(i, g, arguments)
                }, a.clearTimeout = function(a) {
                    var b = f[a];
                    b && (delete f[a], j(b.id))
                }, a.clearInterval = function(a) {
                    var b = g[a];
                    b && (delete g[a], k(b.id))
                }, a.addEventListener("scroll", function() {
                    var a;
                    for (a in f) m(h, j, f, a);
                    for (a in g) m(i, k, g, a)
                })
            }
        }
    }(window), function(a) {
        var b = function(a, c, d, e, f, g, h, i, j) {
            var k = this;
            b.prototype;
            this.main_do = null, this.icon_do = null, this.iconS_do = null, this.bk_do = null, this.text_do = null, this.border_do = null, this.thumbHolder_do = null, this.icon_img = a, this.borderNColor_str = f, this.borderSColor_str = g, this.adsBackgroundPath_str = h, this.position_str = e, this.textNormalColor_str = i, this.textSelectedColor_str = j, this.text_str = d, this.iconOverPath_str = c, this.totalWidth = 215, this.totalHeight = 64, this.fontSize = 12, this.hasThumbanil_bl = !1, this.isShowed_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, k.init = function() {
                k.setOverflow("visible"), k.setupMainContainers(), k.hide(!1, !0)
            }, k.setupMainContainers = function() {
                this.main_do = new FWDUVPDisplayObject("div"), this.main_do.hasTransform3d_bl = !1, this.main_do.hasTransform2d_bl = !1, this.main_do.setBackfaceVisibility(), this.bk_do = new FWDUVPDisplayObject("div"), this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')", this.text_do = new FWDUVPDisplayObject("div"), this.text_do.hasTransform3d_bl = !1, this.text_do.hasTransform2d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.setOverflow("visible"), this.text_do.getStyle().display = "inline", this.text_do.getStyle().fontFamily = "Arial", this.text_do.getStyle().fontSize = "22px", this.text_do.getStyle().whiteSpace = "nowrap", this.text_do.getStyle().color = this.textNormalColor_str, this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.thumbHolder_do = new FWDUVPDisplayObject("div"), this.thumbHolder_do.setWidth(this.totalHeight - 8), this.thumbHolder_do.setHeight(this.totalHeight - 8), this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4), this.thumbHolder_do.setY(4), this.border_do = new FWDUVPDisplayObject("div"), this.border_do.getStyle().border = "1px solid " + this.borderNColor_str, this.border_do.setButtonMode(!0), this.main_do.setWidth(this.totalWidth), this.main_do.setHeight(this.totalHeight), this.bk_do.setWidth(this.totalWidth), this.bk_do.setHeight(this.totalHeight), "left" == this.position_str ? (this.border_do.setX(-1), this.border_do.setWidth(this.totalWidth - 1), this.border_do.setHeight(this.totalHeight - 2)) : (this.border_do.setWidth(this.totalWidth), this.border_do.setHeight(this.totalHeight - 2)), this.setWidth(this.totalWidth), this.setHeight(this.totalHeight), this.icon_do = new FWDUVPDisplayObject("img"), this.icon_img && (this.icon_do.setScreen(this.icon_img), this.icon_do.setWidth(this.icon_img.width), this.icon_do.setHeight(this.icon_img.height));
                var a = new Image;
                a.src = this.iconOverPath_str, this.iconS_do = new FWDUVPDisplayObject("img"), this.iconS_do.setScreen(a), this.iconS_do.setWidth(this.icon_do.w), this.iconS_do.setHeight(this.icon_do.h), this.iconS_do.setAlpha(0), this.main_do.addChild(this.bk_do), this.main_do.addChild(this.text_do), this.main_do.addChild(this.thumbHolder_do), this.main_do.addChild(this.icon_do), this.main_do.addChild(this.iconS_do), this.main_do.addChild(this.border_do), FWDUVPUtils.isIEAndLessThen9 && (this.dumy_do = new FWDUVPDisplayObject("div"), this.dumy_do.setBkColor("#00FF00"), this.dumy_do.setAlpha(1e-4), this.dumy_do.setWidth(this.totalWidth), this.dumy_do.setHeight(this.totalHeight), this.dumy_do.setButtonMode(!0), this.main_do.addChild(this.dumy_do)), this.addChild(this.main_do), this.updateText(k.text_str), FWDUVPUtils.isIEAndLessThen9 ? k.isMobile_bl ? k.hasPointerEvent_bl ? (k.dumy_do.screen.addEventListener("pointerup", k.onMouseUp), k.dumy_do.screen.addEventListener("pointerover", k.onMouseOver),
                    k.dumy_do.screen.addEventListener("pointerout", k.onMouseOut)) : k.dumy_do.screen.addEventListener("touchend", k.onMouseUp) : k.dumy_do.screen.addEventListener ? (k.dumy_do.screen.addEventListener("mouseover", k.onMouseOver), k.dumy_do.screen.addEventListener("mouseout", k.onMouseOut), k.dumy_do.screen.addEventListener("mouseup", k.onMouseUp)) : k.dumy_do.screen.attachEvent && (k.dumy_do.screen.attachEvent("onmouseover", k.onMouseOver), k.dumy_do.screen.attachEvent("onmouseout", k.onMouseOut), k.dumy_do.screen.attachEvent("onmouseup", k.onMouseUp)) : k.isMobile_bl ? k.hasPointerEvent_bl ? (k.border_do.screen.addEventListener("pointerup", k.onMouseUp), k.border_do.screen.addEventListener("pointerover", k.onMouseOver), k.border_do.screen.addEventListener("pointerout", k.onMouseOut)) : k.border_do.screen.addEventListener("touchend", k.onMouseUp) : k.border_do.screen.addEventListener ? (k.border_do.screen.addEventListener("mouseover", k.onMouseOver), k.border_do.screen.addEventListener("mouseout", k.onMouseOut), k.border_do.screen.addEventListener("mouseup", k.onMouseUp)) : k.border_do.screen.attachEvent && (k.border_do.screen.attachEvent("onmouseover", k.onMouseOver), k.border_do.screen.attachEvent("onmouseout", k.onMouseOut), k.border_do.screen.attachEvent("onmouseup", k.onMouseUp))
            }, k.onMouseOver = function(a) {
                a.pointerType && "mouse" != a.pointerType || k.setSelectedState()
            }, k.onMouseOut = function(a) {
                a.pointerType && "mouse" != a.pointerType || k.setNormalState()
            }, k.onMouseUp = function(a) {
                a.preventDefault && a.preventDefault(), 2 != a.button && k.isShowed_bl && k.dispatchEvent(b.MOUSE_UP)
            }, this.updateText = function(a) {
                var b;
                this.text_do.setInnerHTML(a), setTimeout(function() {
                    b = k.text_do.getWidth() + 8 + k.iconS_do.w, k.text_do.setX(parseInt(k.totalWidth - b) / 2), k.text_do.setY(parseInt((k.totalHeight - k.text_do.getHeight()) / 2) + 2), k.icon_do.setX(k.text_do.x + b - k.iconS_do.w), k.icon_do.setY(parseInt((k.totalHeight - k.iconS_do.h) / 2) + 2), k.iconS_do.setX(k.text_do.x + b - k.iconS_do.w), k.iconS_do.setY(parseInt((k.totalHeight - k.iconS_do.h) / 2) + 2)
                }, 50)
            }, this.setNormalState = function() {
                FWDAnimation.to(k.iconS_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(k.text_do.screen, .5, {
                    css: {
                        color: k.textNormalColor_str
                    },
                    ease: Expo.easeOut
                }), FWDAnimation.to(k.border_do.screen, .5, {
                    css: {
                        borderColor: k.borderNColor_str
                    },
                    ease: Expo.easeOut
                })
            }, this.setSelectedState = function() {
                FWDAnimation.to(k.iconS_do, .5, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(k.text_do.screen, .5, {
                    css: {
                        color: k.textSelectedColor_str
                    },
                    ease: Expo.easeOut
                }), FWDAnimation.to(k.border_do.screen, .5, {
                    css: {
                        borderColor: k.borderSColor_str
                    },
                    ease: Expo.easeOut
                })
            }, this.show = function(a) {
                this.isShowed_bl || (this.isShowed_bl = !0, this.setVisible(!0), FWDAnimation.killTweensOf(this.main_do), a && !k.isMobile_bl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    delay: .8,
                    ease: Expo.easeInOut
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth + 1,
                    delay: .8,
                    ease: Expo.easeInOut
                }) : "left" == this.position_str ? this.main_do.setX(0) : this.main_do.setX(-this.totalWidth))
            }, this.hide = function(a, b) {
                (this.isShowed_bl || b) && (this.isShowed_bl = !1, this.hasThumbanil_bl = !1, FWDAnimation.killTweensOf(this.main_do), a && !k.isMobile_bl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : ("left" == this.position_str ? this.main_do.setX(-this.totalWidth) : this.main_do.setX(0), this.hideCompleteHandler()))
            }, this.hideCompleteHandler = function() {
                k.smallImage_img && (k.smallImage_img.onload = null, k.smallImage_img.src = "", FWDAnimation.killTweensOf(k.icon_do)), 1 != k.main_do.alpha && k.main_do.setAlpha(1), k.thumbHolder_do.setVisible(!1), k.setVisible(!1)
            }, this.hideWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: .5
                })
            }, this.showWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: 1
                })
            }, k.init()
        };
        b.setPrototype = function() {
            b.prototype = null, b.prototype = new FWDUVPTransformDisplayObject("div")
        }, b.CLICK = "onClick", b.MOUSE_OVER = "onMouseOver", b.SHOW_TOOLTIP = "showTooltip", b.MOUSE_OUT = "onMouseOut", b.MOUSE_UP = "onMouseDown", b.prototype = null, a.FWDUVPAdsButton = b
    }(window), function(a) {
        var b = function(a, c, d, e, f) {
            var g = this;
            b.prototype;
            this.main_do = null, this.bk_do = null, this.text_do = null, this.border_do = null, this.thumbHolder_do = null, this.borderNColor_str = c, this.borderSColor_str = d, this.adsBackgroundPath_str = e, this.position_str = a, this.timeColor_str = f, this.totalWidth = 215, this.totalHeight = 64, this.fontSize = 12, this.hasThumbanil_bl = !1, this.isShowed_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, g.init = function() {
                g.setOverflow("visible"), g.setupMainContainers(), g.hide(!1, !0)
            }, g.setupMainContainers = function() {
                this.main_do = new FWDUVPDisplayObject("div"), this.main_do.hasTransform3d_bl = !1, this.main_do.hasTransform2d_bl = !1, this.main_do.setBackfaceVisibility(), this.bk_do = new FWDUVPDisplayObject("div"), this.bk_do.getStyle().background = "url('" + this.adsBackgroundPath_str + "')", this.text_do = new FWDUVPDisplayObject("div"), this.text_do.hasTransform3d_bl = !1, this.text_do.hasTransform2d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.getStyle().fontFamily = "Arial", this.text_do.getStyle().fontSize = "12px", this.text_do.getStyle().lineHeight = "18px", this.text_do.getStyle().textAlign = "center", this.text_do.getStyle().color = this.timeColor_str, this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.text_do.setInnerHTML("..."), this.thumbHolder_do = new FWDUVPDisplayObject("div"), this.thumbHolder_do.setWidth(this.totalHeight - 8), this.thumbHolder_do.setHeight(this.totalHeight - 8), this.thumbHolder_do.setX(this.totalWidth - this.thumbHolder_do.w - 4), this.thumbHolder_do.setY(4), this.border_do = new FWDUVPDisplayObject("div"), this.border_do.getStyle().border = "1px solid " + this.borderNColor_str, this.main_do.setWidth(this.totalWidth), this.main_do.setHeight(this.totalHeight), this.bk_do.setWidth(this.totalWidth), this.bk_do.setHeight(this.totalHeight), "left" == this.position_str ? (this.border_do.setX(-1), this.border_do.setWidth(this.totalWidth - 1), this.border_do.setHeight(this.totalHeight - 2)) : (this.border_do.setWidth(this.totalWidth), this.border_do.setHeight(this.totalHeight - 2)), this.setWidth(this.totalWidth), this.setHeight(this.totalHeight), this.main_do.addChild(this.bk_do), this.main_do.addChild(this.text_do), this.main_do.addChild(this.thumbHolder_do), this.main_do.addChild(this.border_do), this.addChild(this.main_do)
            }, this.loadThumbnail = function(a) {
                if (this.hasThumbanil_bl = !0, this.smallImage_img) {
                    this.smallImage_img.removeAttribute("width"), this.smallImage_img.removeAttribute("height"), this.smallImage_img.onload = null, this.smallImage_img.src = "";
                    try {
                        FWDUVPUtils.isIE || this.thumbHolder_do.removeChild(g.thumbnail_do)
                    } catch (a) {}
                }
                this.thumbnail_do || (this.thumbnail_do = new FWDUVPDisplayObject("img"), this.smallImage_img = new Image), this.thumbHolder_do.setVisible(!0), this.smallImage_img.onload = this.onSmallImageLoad, this.smallImage_img.src = a
            }, this.onSmallImageLoad = function() {
                g.smallImageOriginalW = g.smallImage_img.width, g.smallImageOriginalH = g.smallImage_img.height, g.thumbnail_do.setScreen(g.smallImage_img), g.thumbHolder_do.addChild(g.thumbnail_do);
                var a = g.thumbHolder_do.w / g.smallImageOriginalW,
                    b = g.thumbHolder_do.h / g.smallImageOriginalH,
                    c = 0;
                a >= b ? c = a : a <= b && (c = b), g.thumbnail_do.setWidth(Math.round(g.smallImageOriginalW * c)), g.thumbnail_do.setHeight(Math.round(g.smallImageOriginalH * c)), g.thumbnail_do.setX(Math.round((g.thumbHolder_do.w - g.thumbnail_do.w) / 2)), g.thumbnail_do.setY(Math.round((g.thumbHolder_do.h - g.thumbnail_do.h) / 2)), g.thumbnail_do.setAlpha(0), FWDAnimation.to(g.thumbnail_do, .8, {
                    alpha: 1
                }), g.updateText()
            }, this.updateText = function(a) {
                a && this.text_do.setInnerHTML(a), this.hasThumbanil_bl ? (this.text_do.setX(16), this.text_do.setWidth(this.totalWidth - this.totalHeight - 26)) : (this.text_do.setX(8), this.text_do.setWidth(this.totalWidth - 16)), this.text_do.setY(parseInt((g.totalHeight - g.text_do.getHeight()) / 2))
            }, this.show = function(a) {
                this.isShowed_bl || (this.isShowed_bl = !0, this.setVisible(!0), FWDAnimation.killTweensOf(this.main_do), a && !g.isMobile_bl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    delay: .2,
                    ease: Expo.easeInOut
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth + 1,
                    delay: .2,
                    ease: Expo.easeInOut
                }) : "left" == this.position_str ? this.main_do.setX(0) : this.main_do.setX(-this.totalWidth))
            }, this.hide = function(a, b) {
                (this.isShowed_bl || b) && (this.isShowed_bl = !1, this.hasThumbanil_bl = !1, FWDAnimation.killTweensOf(this.main_do), a && !g.isMobile_bl ? "left" == this.position_str ? FWDAnimation.to(this.main_do, .8, {
                    x: -this.totalWidth,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : FWDAnimation.to(this.main_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut,
                    onComplete: this.hideCompleteHandler
                }) : ("left" == this.position_str ? this.main_do.setX(-this.totalWidth) : this.main_do.setX(0), this.hideCompleteHandler()))
            }, this.hideCompleteHandler = function() {
                g.smallImage_img && (g.smallImage_img.onload = null, g.smallImage_img.src = "", FWDAnimation.killTweensOf(g.thumbnail_do)), 1 != g.main_do.alpha && g.main_do.setAlpha(1), g.thumbHolder_do.setVisible(!1), g.setVisible(!1)
            }, this.hideWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: .5
                })
            }, this.showWithOpacity = function() {
                FWDUVPUtils.isIEAndLessThen9 || FWDAnimation.to(this.main_do, .8, {
                    alpha: 1
                })
            }, g.init()
        };
        b.setPrototype = function() {
            b.prototype = null, b.prototype = new FWDUVPTransformDisplayObject("div")
        }, b.CLICK = "onClick", b.MOUSE_OVER = "onMouseOver", b.SHOW_TOOLTIP = "showTooltip", b.MOUSE_OUT = "onMouseOut", b.MOUSE_UP = "onMouseDown", b.prototype = null, a.FWDUVPAdsStart = b
    }(window), function() {
        var a = function(b, c) {
            var d = this;
            a.prototype;
            this.image_img, this.catThumbBk_img = b.catThumbBk_img, this.catNextN_img = b.catNextN_img, this.catPrevN_img = b.catPrevN_img, this.catCloseN_img = b.catCloseN_img, this.mainHolder_do = null, this.closeButton_do = null, this.nextButton_do = null, this.prevButton_do = null, this.thumbs_ar = [], this.categories_ar = b.cats_ar, this.catBkPath_str = b.catBkPath_str, this.id = 0, this.mouseX = 0, this.mouseY = 0, this.dif = 0, this.tempId = d.id, this.stageWidth = 0, this.stageHeight = 0, this.thumbW = 0, this.thumbH = 0, this.buttonsMargins = b.buttonsMargins, this.thumbnailMaxWidth = b.thumbnailMaxWidth, this.thumbnailMaxHeight = b.thumbnailMaxHeight, this.spacerH = b.horizontalSpaceBetweenThumbnails, this.spacerV = b.verticalSpaceBetweenThumbnails, this.dl, this.howManyThumbsToDisplayH = 0, this.howManyThumbsToDisplayV = 0, this.categoriesOffsetTotalWidth = 2 * d.catNextN_img.width + 30, this.categoriesOffsetTotalHeight = d.catNextN_img.height + 30, this.totalThumbnails = d.categories_ar.length, this.delayRate = .06, this.countLoadedThumbs = 0, this.hideCompleteId_to, this.showCompleteId_to, this.loadThumbnailsId_to, this.preventMouseWheelNavigId_to, this.preventMouseWheelNavig_bl = !1, this.areThumbnailsCreated_bl = !1, this.areThumbnailsLoaded_bl = !1, this.isShowed_bl = !1, this.isOnDOM_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, d.init = function() {
                d.getStyle().zIndex = 16777271, d.getStyle().msTouchAction = "none", d.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)", d.getStyle().width = "100%", d.mainHolder_do = new FWDUVPDisplayObject("div"), d.mainHolder_do.getStyle().background = "url('" + d.catBkPath_str + "')", d.mainHolder_do.setY(-3e3), d.addChild(d.mainHolder_do), d.setupButtons(), d.setupDisable(), d.isMobile_bl && (d.setupMobileMove(), FWDUVPUtils.isChrome && (FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(d.screen) : document.documentElement.appendChild(d.screen))), (!d.isMobile_bl || d.isMobile_bl && d.hasPointerEvent_bl) && d.setSelectable(!1), window.addEventListener ? (d.screen.addEventListener("mousewheel", d.mouseWheelDumyHandler), d.screen.addEventListener("DOMMouseScroll", d.mouseWheelDumyHandler)) : document.attachEvent && d.screen.attachEvent("onmousewheel", d.mouseWheelDumyHandler)
            }, this.mouseWheelDumyHandler = function(a) {
                var b;
                if (FWDAnimation.isTweening(d.mainHolder_do)) return a.preventDefault && a.preventDefault(), !1;
                for (var c = 0; c < d.totalThumbnails; c++)
                    if (b = d.thumbs_ar[c], FWDAnimation.isTweening(b)) return a.preventDefault && a.preventDefault(), !1;
                var e = a.detail || a.wheelDelta;
                if (a.wheelDelta && (e *= -1), FWDUVPUtils.isOpera && (e *= -1), e > 0) d.nextButtonOnMouseUpHandler();
                else if (e < 0) {
                    if (d.leftId <= 0) return;
                    d.prevButtonOnMouseUpHandler()
                }
                return !!a.preventDefault && void a.preventDefault()
            }, d.resizeAndPosition = function(a) {
                if (d.isShowed_bl || a) {
                    var b = FWDUVPUtils.getScrollOffsets(),
                        e = FWDUVPUtils.getViewportSize();
                    d.stageWidth = e.w, d.stageHeight = e.h, FWDAnimation.killTweensOf(d.mainHolder_do), d.mainHolder_do.setX(0), d.mainHolder_do.setWidth(d.stageWidth), d.mainHolder_do.setHeight(d.stageHeight), d.setX(b.x), d.setY(b.y), d.setHeight(d.stageHeight), (d.isMobile_bl || c.isEmbedded_bl) && d.setWidth(d.stageWidth), d.positionButtons(), d.tempId = d.id, d.resizeAndPositionThumbnails(), d.disableEnableNextAndPrevButtons()
                }
            }, d.onScrollHandler = function() {
                var a = FWDUVPUtils.getScrollOffsets();
                d.setX(a.x), d.setY(a.y)
            }, this.setupDisable = function() {
                d.disable_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (d.disable_do.setBkColor("#FFFFFF"), d.disable_do.setAlpha(.01)), d.addChild(d.disable_do)
            }, this.showDisable = function() {
                d.disable_do.w != d.stageWidth && (d.disable_do.setWidth(d.stageWidth), d.disable_do.setHeight(d.stageHeight))
            }, this.hideDisable = function() {
                0 != d.disable_do.w && (d.disable_do.setWidth(0), d.disable_do.setHeight(0))
            }, this.setupButtons = function() {
                FWDUVPSimpleButton.setPrototype(), d.closeButton_do = new FWDUVPSimpleButton(d.catCloseN_img, b.catCloseSPath_str), d.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.closeButtonOnMouseUpHandler), FWDUVPSimpleButton.setPrototype(), d.nextButton_do = new FWDUVPSimpleButton(d.catNextN_img, b.catNextSPath_str, void 0, !0), d.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.nextButtonOnMouseUpHandler), FWDUVPSimpleButton.setPrototype(), d.prevButton_do = new FWDUVPSimpleButton(d.catPrevN_img, b.catPrevSPath_str, void 0, !0), d.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.prevButtonOnMouseUpHandler)
            }, this.closeButtonOnMouseUpHandler = function() {
                d.hide()
            }, this.nextButtonOnMouseUpHandler = function() {
                var a = d.howManyThumbsToDisplayH * d.howManyThumbsToDisplayV;
                d.tempId += a, d.tempId > d.totalThumbnails - 1 && (d.tempId = d.totalThumbnails - 1);
                var b = Math.floor(d.tempId / a);
                d.tempId = b * a, d.resizeAndPositionThumbnails(!0, "next"), d.disableEnableNextAndPrevButtons(!1, !0)
            }, this.prevButtonOnMouseUpHandler = function() {
                var a = d.howManyThumbsToDisplayH * d.howManyThumbsToDisplayV;
                d.tempId -= a, d.tempId < 0 && (d.tempId = 0);
                var b = Math.floor(d.tempId / a);
                d.tempId = b * a, d.resizeAndPositionThumbnails(!0, "prev"), d.disableEnableNextAndPrevButtons(!0, !1)
            }, this.positionButtons = function() {
                d.closeButton_do.setX(d.stageWidth - d.closeButton_do.w - d.buttonsMargins), d.closeButton_do.setY(d.buttonsMargins), d.nextButton_do.setX(d.stageWidth - d.nextButton_do.w - d.buttonsMargins), d.nextButton_do.setY(parseInt((d.stageHeight - d.nextButton_do.h) / 2)), d.prevButton_do.setX(d.buttonsMargins), d.prevButton_do.setY(parseInt((d.stageHeight - d.prevButton_do.h) / 2))
            }, this.disableEnableNextAndPrevButtons = function(a, b) {
                var c = d.howManyThumbsToDisplayH * d.howManyThumbsToDisplayV,
                    e = Math.floor(d.tempId / c),
                    f = Math.ceil(d.totalThumbnails / c) - 1;
                d.howManyThumbsToDisplayH * e, f * d.howManyThumbsToDisplayH;
                c >= d.totalThumbnails ? (d.nextButton_do.disable(), d.prevButton_do.disable(), d.nextButton_do.setDisabledState(), d.prevButton_do.setDisabledState()) : 0 == e ? (d.nextButton_do.enable(), d.prevButton_do.disable(), d.nextButton_do.setEnabledState(), d.prevButton_do.setDisabledState()) : e == f ? (d.nextButton_do.disable(), d.prevButton_do.enable(), d.nextButton_do.setDisabledState(), d.prevButton_do.setEnabledState()) : (d.nextButton_do.enable(), d.prevButton_do.enable(), d.nextButton_do.setEnabledState(), d.prevButton_do.setEnabledState()), a || d.prevButton_do.setNormalState(), b || d.nextButton_do.setNormalState()
            }, this.setupMobileMove = function() {
                d.hasPointerEvent_bl ? d.screen.addEventListener("pointerdown", d.mobileDownHandler) : d.screen.addEventListener("touchstart", d.mobileDownHandler)
            }, this.mobileDownHandler = function(a) {
                if (!a.touches || 1 == a.touches.length) {
                    var b = FWDUVPUtils.getViewportMouseCoordinates(a);
                    d.mouseX = b.screenX, d.mouseY = b.screenY, d.hasPointerEvent_bl ? (window.addEventListener("pointerup", d.mobileUpHandler), window.addEventListener("pointermove", d.mobileMoveHandler)) : (window.addEventListener("touchend", d.mobileUpHandler), window.addEventListener("touchmove", d.mobileMoveHandler))
                }
            }, this.mobileMoveHandler = function(a) {
                if (a.preventDefault && a.preventDefault(), !a.touches || 1 == a.touches.length) {
                    d.showDisable();
                    var b = FWDUVPUtils.getViewportMouseCoordinates(a);
                    d.dif = d.mouseX - b.screenX, d.mouseX = b.screenX, d.mouseY = b.screenY
                }
            }, this.mobileUpHandler = function(a) {
                d.hideDisable(), d.dif > 10 ? d.nextButtonOnMouseUpHandler() : d.dif < -10 && d.prevButtonOnMouseUpHandler(), d.dif = 0, d.hasPointerEvent_bl ? (window.removeEventListener("pointerup", d.mobileUpHandler), window.removeEventListener("pointermove", d.mobileMoveHandler)) : (window.removeEventListener("touchend", d.mobileUpHandler), window.removeEventListener("touchmove", d.mobileMoveHandler))
            }, this.setupThumbnails = function() {
                if (!d.areThumbnailsCreated_bl) {
                    d.areThumbnailsCreated_bl = !0;
                    for (var a, c = 0; c < d.totalThumbnails; c++) FWDUVPCategoriesThumb.setPrototype(), a = new FWDUVPCategoriesThumb(d, c, b.catThumbBkPath_str, b.catThumbBkTextPath_str, b.thumbnailSelectedType_str, d.categories_ar[c].htmlContent), a.addListener(FWDUVPCategoriesThumb.MOUSE_UP, d.thumbnailOnMouseUpHandler), d.thumbs_ar[c] = a, d.mainHolder_do.addChild(a);
                    d.mainHolder_do.addChild(d.closeButton_do), d.mainHolder_do.addChild(d.nextButton_do), d.mainHolder_do.addChild(d.prevButton_do)
                }
            }, this.thumbnailOnMouseUpHandler = function(a) {
                d.id = a.id, d.disableOrEnableThumbnails(), d.hide()
            }, this.resizeAndPositionThumbnails = function(a, b) {
                if (d.areThumbnailsCreated_bl) {
                    var c, e, f, g, e, j, k, m, o, p;
                    this.remainWidthSpace = this.stageWidth - e;
                    var q = d.stageWidth - d.categoriesOffsetTotalWidth,
                        r = d.stageHeight - d.categoriesOffsetTotalHeight;
                    d.howManyThumbsToDisplayH = Math.ceil((q - d.spacerH) / (d.thumbnailMaxWidth + d.spacerH)), d.thumbW = Math.floor((q - d.spacerH * (d.howManyThumbsToDisplayH - 1)) / d.howManyThumbsToDisplayH), d.thumbW > d.thumbnailMaxWidth && (d.howManyThumbsToDisplayH += 1, d.thumbW = Math.floor((q - d.spacerH * (d.howManyThumbsToDisplayH - 1)) / d.howManyThumbsToDisplayH)), d.thumbH = Math.floor(d.thumbW / d.thumbnailMaxWidth * d.thumbnailMaxHeight), d.howManyThumbsToDisplayV = Math.floor(r / (d.thumbH + d.spacerV)), d.howManyThumbsToDisplayV < 1 && (d.howManyThumbsToDisplayV = 1), e = Math.min(d.howManyThumbsToDisplayH, d.totalThumbnails) * (d.thumbW + d.spacerH) - d.spacerH, j = Math.min(Math.ceil(d.totalThumbnails / d.howManyThumbsToDisplayH), d.howManyThumbsToDisplayV) * (d.thumbH + d.spacerV) - d.spacerV, k = d.howManyThumbsToDisplayH > d.totalThumbnails ? 0 : q - e, d.howManyThumbsToDisplayH > d.totalThumbnails && (d.howManyThumbsToDisplayH = d.totalThumbnails), p = d.howManyThumbsToDisplayH * d.howManyThumbsToDisplayV, f = Math.floor(d.tempId / p), o = d.howManyThumbsToDisplayH * f, firstId = f * p, m = firstId + p, m > d.totalThumbnails && (m = d.totalThumbnails);
                    for (var s = 0; s < d.totalThumbnails; s++) c = d.thumbs_ar[s], c.finalW = d.thumbW, s % d.howManyThumbsToDisplayH == d.howManyThumbsToDisplayH - 1 && (c.finalW += k), c.finalH = d.thumbH, c.finalX = s % d.howManyThumbsToDisplayH * (d.thumbW + d.spacerH), c.finalX += Math.floor(s / p) * d.howManyThumbsToDisplayH * (d.thumbW + d.spacerH), c.finalX += (d.stageWidth - e) / 2, c.finalX = Math.floor(c.finalX - o * (d.thumbW + d.spacerH)), c.finalY = s % p, c.finalY = Math.floor(c.finalY / d.howManyThumbsToDisplayH) * (d.thumbH + d.spacerV), c.finalY += (r - j) / 2, c.finalY += d.categoriesOffsetTotalHeight / 2, c.finalY = Math.floor(c.finalY), g = Math.floor(s / p), g > f ? c.finalX += 150 : g < f && (c.finalX -= 150), a ? s >= firstId && s < m ? ("next" == b ? dl = s % p * d.delayRate + .1 : dl = (p - s % p) * d.delayRate + .1, c.resizeAndPosition(!0, dl)) : c.resizeAndPosition(!0, 0) : c.resizeAndPosition()
                }
            }, this.loadImages = function() {
                d.countLoadedThumbs > d.totalThumbnails - 1 || (d.image_img && (d.image_img.onload = null, d.image_img.onerror = null), d.image_img = new Image, d.image_img.onerror = d.onImageLoadError, d.image_img.onload = d.onImageLoadComplete, d.image_img.src = d.categories_ar[d.countLoadedThumbs].thumbnailPath)
            }, this.onImageLoadError = function(a) {}, this.onImageLoadComplete = function(a) {
                var b = d.thumbs_ar[d.countLoadedThumbs];
                b.setImage(d.image_img), d.countLoadedThumbs++, d.loadWithDelayId_to = setTimeout(d.loadImages, 40)
            }, this.disableOrEnableThumbnails = function() {
                for (var a, b = 0; b < d.totalThumbnails; b++) a = d.thumbs_ar[b], b == d.id ? a.disable() : a.enable()
            }, this.show = function(a) {
                d.isShowed_bl || (d.isShowed_bl = !0, d.isOnDOM_bl = !0, d.id = a, FWDUVPUtils.isChrome && d.isMobile_bl ? d.setVisible(!0) : FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(d.screen) : document.documentElement.appendChild(d.screen), window.addEventListener ? window.addEventListener("scroll", d.onScrollHandler) : window.attachEvent && window.attachEvent("onscroll", d.onScrollHandler), d.setupThumbnails(), d.resizeAndPosition(!0), d.showDisable(), d.disableOrEnableThumbnails(), clearTimeout(d.hideCompleteId_to), clearTimeout(d.showCompleteId_to), d.mainHolder_do.setY(-d.stageHeight), d.isMobile_bl ? (d.showCompleteId_to = setTimeout(d.showCompleteHandler, 1200), FWDAnimation.to(d.mainHolder_do, .8, {
                    y: 0,
                    delay: .4,
                    ease: Expo.easeInOut
                })) : (d.showCompleteId_to = setTimeout(d.showCompleteHandler, 800), FWDAnimation.to(d.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })))
            }, this.showCompleteHandler = function() {
                d.mainHolder_do.setY(0), d.hideDisable(), FWDUVPUtils.isIphone && (c.videoScreen_do && c.videoScreen_do.setY(-5e3), c.ytb_do && c.ytb_do.setY(-5e3)), d.resizeAndPosition(!0), d.areThumbnailsLoaded_bl || (d.loadImages(), d.areThumbnailsLoaded_bl = !0)
            }, this.hide = function() {
                d.isShowed_bl && (d.isShowed_bl = !1, FWDUVPUtils.isIphone && (c.videoScreen_do && c.videoScreen_do.setY(0), c.ytb_do && c.ytb_do.setY(0)), clearTimeout(d.hideCompleteId_to), clearTimeout(d.showCompleteId_to), d.showDisable(), d.hideCompleteId_to = setTimeout(d.hideCompleteHandler, 800), FWDAnimation.killTweensOf(d.mainHolder_do), FWDAnimation.to(d.mainHolder_do, .8, {
                    y: -d.stageHeight,
                    ease: Expo.easeInOut
                }), window.addEventListener ? window.removeEventListener("scroll", d.onScrollHandler) : window.detachEvent && window.detachEvent("onscroll", d.onScrollHandler), d.resizeAndPosition())
            }, this.hideCompleteHandler = function() {
                FWDUVPUtils.isChrome && d.isMobile_bl ? d.setVisible(!1) : FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].removeChild(d.screen) : document.documentElement.removeChild(d.screen), d.isOnDOM_bl = !1, d.dispatchEvent(a.HIDE_COMPLETE)
            }, this.init()
        };
        a.setPrototype = function() {
            a.prototype = new FWDUVPDisplayObject("div")
        }, a.HIDE_COMPLETE = "hideComplete", a.prototype = null, window.FWDUVPCategories = a
    }(), function(a) {
        var b = function(a, c, d, e, f, g) {
            var h = this;
            b.prototype;
            this.backgroundImagePath_str = d, this.catThumbTextBkPath_str = e, this.canvas_el = null, this.htmlContent = g, this.simpleText_do = null, this.effectImage_do = null, this.imageHolder_do = null, this.normalImage_do = null, this.effectImage_do = null, this.dumy_do = null, this.thumbnailSelectedType_str = f, this.id = c, this.imageOriginalW, this.imageOriginalH, this.finalX, this.finalY, this.finalW, this.finalH, this.imageFinalX, this.imageFinalY, this.imageFinalW, this.imageFinalH, this.dispatchShowWithDelayId_to, this.isShowed_bl = !1, this.hasImage_bl = !1, this.isSelected_bl = !1, this.isDisabled_bl = !1, this.hasCanvas_bl = FWDUVPlayer.hasCanvas, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.init = function() {
                h.getStyle().background = "url('" + h.backgroundImagePath_str + "')", h.setupMainContainers(), h.setupDescription(), h.setupDumy()
            }, this.setupMainContainers = function() {
                h.imageHolder_do = new FWDUVPDisplayObject("div"), h.addChild(h.imageHolder_do)
            }, this.setupDumy = function() {
                h.dumy_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (h.dumy_do.setBkColor("#FFFFFF"), h.dumy_do.setAlpha(0)), h.addChild(h.dumy_do)
            }, this.setupDescription = function() {
                h.simpleText_do = new FWDUVPDisplayObject("div"), h.simpleText_do.getStyle().background = "url('" + h.catThumbTextBkPath_str + "')", FWDUVPUtils.isFirefox && (h.simpleText_do.hasTransform3d_bl = !1, h.simpleText_do.hasTransform2d_bl = !1), h.simpleText_do.setBackfaceVisibility(), h.simpleText_do.getStyle().width = "100%", h.simpleText_do.getStyle().fontFamily = "Arial", h.simpleText_do.getStyle().fontSize = "12px", h.simpleText_do.getStyle().textAlign = "left", h.simpleText_do.getStyle().color = "#FFFFFF", h.simpleText_do.getStyle().fontSmoothing = "antialiased", h.simpleText_do.getStyle().webkitFontSmoothing = "antialiased", h.simpleText_do.getStyle().textRendering = "optimizeLegibility", h.simpleText_do.setInnerHTML(h.htmlContent), h.addChild(h.simpleText_do)
            }, this.positionDescription = function() {
                h.simpleText_do.setY(parseInt(h.finalH - h.simpleText_do.getHeight()))
            }, this.setupBlackAndWhiteImage = function(a) {
                if (h.hasCanvas_bl && "opacity" != h.thumbnailSelectedType_str) {
                    var b = document.createElement("canvas"),
                        c = b.getContext("2d");
                    b.width = h.imageOriginalW, b.height = h.imageOriginalH, c.drawImage(a, 0, 0);
                    var d = c.getImageData(0, 0, b.width, b.height),
                        e = d.data;
                    if ("threshold" == h.thumbnailSelectedType_str)
                        for (var f = 0; f < e.length; f += 4) {
                            var g = e[f],
                                i = e[f + 1],
                                j = e[f + 2],
                                k = .2126 * g + .7152 * i + .0722 * j >= 150 ? 255 : 0;
                            e[f] = e[f + 1] = e[f + 2] = k
                        } else if ("blackAndWhite" == h.thumbnailSelectedType_str)
                            for (var f = 0; f < e.length; f += 4) {
                                var g = e[f],
                                    i = e[f + 1],
                                    j = e[f + 2],
                                    k = .2126 * g + .7152 * i + .0722 * j;
                                e[f] = e[f + 1] = e[f + 2] = k
                            }
                        c.putImageData(d, 0, 0, 0, 0, d.width, d.height), h.effectImage_do = new FWDUVPDisplayObject("canvas"), h.effectImage_do.screen = b, h.effectImage_do.setAlpha(.9), h.effectImage_do.setMainProperties()
                }
            }, this.setImage = function(b) {
                h.normalImage_do = new FWDUVPDisplayObject("img"), h.normalImage_do.setScreen(b), h.imageOriginalW = h.normalImage_do.w, h.imageOriginalH = h.normalImage_do.h, h.setButtonMode(!0), h.setupBlackAndWhiteImage(b), h.resizeImage(), h.imageHolder_do.setX(parseInt(h.finalW / 2)), h.imageHolder_do.setY(parseInt(h.finalH / 2)), h.imageHolder_do.setWidth(0), h.imageHolder_do.setHeight(0), h.normalImage_do.setX(-parseInt(h.normalImage_do.w / 2)), h.normalImage_do.setY(-parseInt(h.normalImage_do.h / 2)), h.normalImage_do.setAlpha(0), h.effectImage_do && (h.effectImage_do.setX(-parseInt(h.normalImage_do.w / 2)), h.effectImage_do.setY(-parseInt(h.normalImage_do.h / 2)), h.effectImage_do.setAlpha(.01)), FWDAnimation.to(h.imageHolder_do, .8, {
                    x: 0,
                    y: 0,
                    w: h.finalW,
                    h: h.finalH,
                    ease: Expo.easeInOut
                }), FWDAnimation.to(h.normalImage_do, .8, {
                    alpha: 1,
                    x: h.imageFinalX,
                    y: h.imageFinalY,
                    ease: Expo.easeInOut
                }), h.effectImage_do && FWDAnimation.to(h.effectImage_do, .8, {
                    x: h.imageFinalX,
                    y: h.imageFinalY,
                    ease: Expo.easeInOut
                }), h.isMobile_bl ? h.hasPointerEvent_bl ? (h.screen.addEventListener("pointerover", h.onMouseOver), h.screen.addEventListener("pinterout", h.onMouseOut), h.screen.addEventListener("pointerdown", h.onMouseUp)) : h.screen.addEventListener("mouseup", h.onMouseUp) : h.screen.addEventListener ? (h.screen.addEventListener("mouseover", h.onMouseOver), h.screen.addEventListener("mouseout", h.onMouseOut), h.screen.addEventListener("mouseup", h.onMouseUp)) : h.screen.attachEvent && (h.screen.attachEvent("onmouseover", h.onMouseOver), h.screen.attachEvent("onmouseout", h.onMouseOut), h.screen.attachEvent("onmouseup", h.onMouseUp)), this.imageHolder_do.addChild(h.normalImage_do), h.effectImage_do && h.imageHolder_do.addChild(h.effectImage_do), this.hasImage_bl = !0, h.id == a.id && h.disable()
            }, h.onMouseOver = function(a, b) {
                h.isDisabled_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE || h.setSelectedState(!0)
            }, h.onMouseOut = function(a) {
                h.isDisabled_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE || h.setNormalState(!0)
            }, h.onMouseUp = function(a) {
                h.isDisabled_bl || 2 == a.button || (a.preventDefault && a.preventDefault(), h.dispatchEvent(b.MOUSE_UP, {
                    id: h.id
                }))
            }, this.resizeAndPosition = function(a, b) {
                FWDAnimation.killTweensOf(h), FWDAnimation.killTweensOf(h.imageHolder_do), a ? FWDAnimation.to(h, .8, {
                    x: h.finalX,
                    y: h.finalY,
                    delay: b,
                    ease: Expo.easeInOut
                }) : (h.setX(h.finalX), h.setY(h.finalY)), h.setWidth(h.finalW), h.setHeight(h.finalH), h.imageHolder_do.setX(0), h.imageHolder_do.setY(0), h.imageHolder_do.setWidth(h.finalW), h.imageHolder_do.setHeight(h.finalH), h.dumy_do.setWidth(h.finalW), h.dumy_do.setHeight(h.finalH), h.resizeImage(), h.positionDescription()
            }, this.resizeImage = function(a) {
                if (h.normalImage_do) {
                    FWDAnimation.killTweensOf(h.normalImage_do);
                    var d, b = h.finalW / h.imageOriginalW,
                        c = h.finalH / h.imageOriginalH;
                    d = b >= c ? b : c, h.imageFinalW = Math.ceil(d * h.imageOriginalW), h.imageFinalH = Math.ceil(d * h.imageOriginalH), h.imageFinalX = Math.round((h.finalW - h.imageFinalW) / 2), h.imageFinalY = Math.round((h.finalH - h.imageFinalH) / 2), h.effectImage_do && (FWDAnimation.killTweensOf(h.effectImage_do), h.effectImage_do.setX(h.imageFinalX), h.effectImage_do.setY(h.imageFinalY), h.effectImage_do.setWidth(h.imageFinalW), h.effectImage_do.setHeight(h.imageFinalH), h.isDisabled_bl && h.setSelectedState(!1, !0)), h.normalImage_do.setX(h.imageFinalX), h.normalImage_do.setY(h.imageFinalY), h.normalImage_do.setWidth(h.imageFinalW), h.normalImage_do.setHeight(h.imageFinalH), h.isDisabled_bl ? h.normalImage_do.setAlpha(.3) : h.normalImage_do.setAlpha(1)
                }
            }, this.setNormalState = function(a) {
                h.isSelected_bl && (h.isSelected_bl = !1, "threshold" == h.thumbnailSelectedType_str || "blackAndWhite" == h.thumbnailSelectedType_str ? a ? FWDAnimation.to(h.effectImage_do, 1, {
                    alpha: .01,
                    ease: Quart.easeOut
                }) : h.effectImage_do.setAlpha(.01) : "opacity" == h.thumbnailSelectedType_str && (a ? FWDAnimation.to(h.normalImage_do, 1, {
                    alpha: 1,
                    ease: Quart.easeOut
                }) : h.normalImage_do.setAlpha(1)))
            }, this.setSelectedState = function(a, b) {
                h.isSelected_bl && !b || (h.isSelected_bl = !0, "threshold" == h.thumbnailSelectedType_str || "blackAndWhite" == h.thumbnailSelectedType_str ? a ? FWDAnimation.to(h.effectImage_do, 1, {
                    alpha: 1,
                    ease: Expo.easeOut
                }) : h.effectImage_do.setAlpha(1) : "opacity" == h.thumbnailSelectedType_str && (a ? FWDAnimation.to(h.normalImage_do, 1, {
                    alpha: .3,
                    ease: Expo.easeOut
                }) : h.normalImage_do.setAlpha(.3)))
            }, this.enable = function() {
                h.hasImage_bl && (h.isDisabled_bl = !1, h.setButtonMode(!0), h.setNormalState(!0))
            }, this.disable = function() {
                h.hasImage_bl && (h.isDisabled_bl = !0, h.setButtonMode(!1), h.setSelectedState(!0))
            }, this.init()
        };
        b.setPrototype = function() {
            b.prototype = new FWDUVPDisplayObject("div")
        }, b.MOUSE_UP = "onMouseUp", b.prototype = null, a.FWDUVPCategoriesThumb = b
    }(window), function() {
        var a = function(b, c, d, e, f) {
            var g = this;
            a.prototype;
            this.n1Img = b, this.s1Path_str = c, this.n2Img = d, this.s2Path_str = e, this.firstButton_do, this.n1_do, this.s1_do, this.secondButton_do, this.n2_do, this.s2_do, this.buttonWidth = g.n1Img.width, this.buttonHeight = g.n1Img.height, this.isSelectedState_bl = !1, this.currentState = 1, this.isDisabled_bl = !1, this.isMaximized_bl = !1, this.disptachMainEvent_bl = f, this.isDisabled_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !g.isMobile_bl || g.hasPointerEvent_bl, g.init = function() {
                g.setButtonMode(!0), g.setWidth(g.buttonWidth), g.setHeight(g.buttonHeight), g.setupMainContainers(), g.secondButton_do.setVisible(!1)
            }, g.setupMainContainers = function() {
                if (g.firstButton_do = new FWDUVPDisplayObject("div"), g.firstButton_do.setBackfaceVisibility(), g.firstButton_do.hasTransform2d_bl = !1, g.firstButton_do.hasTransform3d_bl = !1, g.addChild(g.firstButton_do), g.n1_do = new FWDUVPDisplayObject("img"), g.n1_do.setScreen(g.n1Img), g.n1_do.setBackfaceVisibility(), g.n1_do.hasTransform2d_bl = !1, g.n1_do.hasTransform3d_bl = !1, g.firstButton_do.addChild(g.n1_do), g.allowToCreateSecondButton_bl) {
                    g.s1_do = new FWDUVPDisplayObject("img");
                    var a = new Image;
                    a.src = g.s1Path_str, g.s1_do.setScreen(a), g.s1_do.setWidth(g.buttonWidth), g.s1_do.setHeight(g.buttonHeight), g.s1_do.setAlpha(0), g.s1_do.setBackfaceVisibility(), g.s1_do.hasTransform2d_bl = !1, g.s1_do.hasTransform3d_bl = !1, g.firstButton_do.addChild(g.s1_do)
                }
                if (g.firstButton_do.setWidth(g.buttonWidth), g.firstButton_do.setHeight(g.buttonHeight), g.secondButton_do = new FWDUVPDisplayObject("div"), g.secondButton_do.setBackfaceVisibility(), g.secondButton_do.hasTransform2d_bl = !1, g.secondButton_do.hasTransform3d_bl = !1, g.addChild(g.secondButton_do), g.n2_do = new FWDUVPDisplayObject("img"), g.n2_do.setScreen(g.n2Img), g.n2_do.setBackfaceVisibility(), g.n2_do.hasTransform2d_bl = !1, g.n2_do.hasTransform3d_bl = !1,
                    g.secondButton_do.addChild(g.n2_do), g.allowToCreateSecondButton_bl) {
                    g.s2_do = new FWDUVPDisplayObject("img");
                    var b = new Image;
                    b.src = g.s2Path_str, g.s2_do.setScreen(b), g.s2_do.setBackfaceVisibility(), g.s2_do.hasTransform2d_bl = !1, g.s2_do.hasTransform3d_bl = !1, g.s2_do.setWidth(g.buttonWidth), g.s2_do.setHeight(g.buttonHeight), g.s2_do.setAlpha(0), g.secondButton_do.addChild(g.s2_do)
                }
                g.secondButton_do.setWidth(g.buttonWidth), g.secondButton_do.setHeight(g.buttonHeight), g.addChild(g.secondButton_do), g.addChild(g.firstButton_do), g.isMobile_bl ? g.hasPointerEvent_bl ? (g.screen.addEventListener("mouseup", g.onMouseUp), g.screen.addEventListener("mouseover", g.onMouseOver), g.screen.addEventListener("mouseout", g.onMouseOut)) : (g.screen.addEventListener("toustart", g.onDown), g.screen.addEventListener("touchend", g.onMouseUp)) : g.screen.addEventListener ? (g.screen.addEventListener("mouseover", g.onMouseOver), g.screen.addEventListener("mouseout", g.onMouseOut), g.screen.addEventListener("mouseup", g.onMouseUp)) : g.screen.attachEvent && (g.screen.attachEvent("onmouseover", g.onMouseOver), g.screen.attachEvent("onmouseout", g.onMouseOut), g.screen.attachEvent("onmousedown", g.onMouseUp))
            }, g.onMouseOver = function(b, c) {
                g.dispatchEvent(a.SHOW_TOOLTIP, {
                    e: b
                }), g.isDisabled_bl || g.isSelectedState_bl || b.pointerType && b.pointerType != b.MSPOINTER_TYPE_MOUSE && "mouse" != b.pointerType || (g.dispatchEvent(a.MOUSE_OVER, {
                    e: b
                }), g.setSelectedState(!0))
            }, g.onMouseOut = function(b) {
                !g.isDisabled_bl && g.isSelectedState_bl && (b.pointerType && b.pointerType != b.MSPOINTER_TYPE_MOUSE && "mouse" != b.pointerType || (g.setNormalState(), g.dispatchEvent(a.MOUSE_OUT)))
            }, g.onDown = function(a) {
                a.preventDefault && a.preventDefault()
            }, g.onMouseUp = function(b) {
                g.isDisabled_bl || 2 == b.button || (b.preventDefault && b.preventDefault(), g.isMobile_bl || g.onMouseOver(b, !1), g.disptachMainEvent_bl && g.dispatchEvent(a.MOUSE_UP, {
                    e: b
                }))
            }, g.toggleButton = function() {
                1 == g.currentState ? (g.firstButton_do.setVisible(!1), g.secondButton_do.setVisible(!0), g.currentState = 0, g.dispatchEvent(a.FIRST_BUTTON_CLICK)) : (g.firstButton_do.setVisible(!0), g.secondButton_do.setVisible(!1), g.currentState = 1, g.dispatchEvent(a.SECOND_BUTTON_CLICK))
            }, g.setButtonState = function(a) {
                1 == a ? (g.firstButton_do.setVisible(!0), g.secondButton_do.setVisible(!1), g.currentState = 1) : (g.firstButton_do.setVisible(!1), g.secondButton_do.setVisible(!0), g.currentState = 0)
            }, this.setNormalState = function() {
                g.isMobile_bl && !g.hasPointerEvent_bl || (g.isSelectedState_bl = !1, FWDAnimation.killTweensOf(g.s1_do), FWDAnimation.killTweensOf(g.s2_do), FWDAnimation.to(g.s1_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(g.s2_do, .5, {
                    alpha: 0,
                    ease: Expo.easeOut
                }))
            }, this.setSelectedState = function(a) {
                g.isSelectedState_bl = !0, FWDAnimation.killTweensOf(g.s1_do), FWDAnimation.killTweensOf(g.s2_do), FWDAnimation.to(g.s1_do, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(g.s2_do, .5, {
                    alpha: 1,
                    delay: .1,
                    ease: Expo.easeOut
                })
            }, this.disable = function() {
                g.isDisabled_bl = !0, g.setButtonMode(!1)
            }, this.enable = function() {
                g.isDisabled_bl = !1, g.setButtonMode(!0)
            }, g.init()
        };
        a.setPrototype = function() {
            a.prototype = new FWDUVPDisplayObject("div")
        }, a.SHOW_TOOLTIP = "showToolTip", a.FIRST_BUTTON_CLICK = "onFirstClick", a.SECOND_BUTTON_CLICK = "secondButtonOnClick", a.MOUSE_OVER = "onMouseOver", a.MOUSE_OUT = "onMouseOut", a.MOUSE_UP = "onMouseUp", a.CLICK = "onClick", a.prototype = null, window.FWDUVPComplexButton = a
    }(window), function() {
        var a = function(a, b) {
            var c = this;
            this.parent = a, this.url = "http://www.webdesign-flash.ro", this.menu_do = null, this.normalMenu_do = null, this.selectedMenu_do = null, this.over_do = null, this.isDisabled_bl = !1, this.showMenu_bl = b, this.init = function() {
                c.updateParent(c.parent)
            }, this.updateParent = function(a) {
                c.parent && (c.parent.screen.addEventListener ? c.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler) : c.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler)), c.parent = a, c.parent.screen.addEventListener ? c.parent.screen.addEventListener("contextmenu", this.contextMenuHandler) : c.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler)
            }, this.contextMenuHandler = function(a) {
                if (!c.isDisabled_bl) {
                    if ("disabled" == b) return !!a.preventDefault && void a.preventDefault();
                    if ("default" != b && c.url.indexOf("sh.r") != -1) return c.setupMenus(), c.parent.addChild(c.menu_do), c.menu_do.setVisible(!0), c.positionButtons(a), window.addEventListener ? window.addEventListener("mousedown", c.contextMenuWindowOnMouseDownHandler) : document.documentElement.attachEvent("onclick", c.contextMenuWindowOnMouseDownHandler), !!a.preventDefault && void a.preventDefault()
                }
            }, this.contextMenuWindowOnMouseDownHandler = function(a) {
                var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                    d = b.screenX,
                    e = b.screenY;
                FWDUVPUtils.hitTest(c.menu_do.screen, d, e) || (window.removeEventListener ? window.removeEventListener("mousedown", c.contextMenuWindowOnMouseDownHandler) : document.documentElement.detachEvent("onclick", c.contextMenuWindowOnMouseDownHandler), c.menu_do.setX(-500))
            }, this.setupMenus = function() {
                this.menu_do || (this.menu_do = new FWDUVPDisplayObject("div"), c.menu_do.setX(-500), this.menu_do.getStyle().width = "100%", this.normalMenu_do = new FWDUVPDisplayObject("div"), this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif", this.normalMenu_do.getStyle().padding = "4px", this.normalMenu_do.getStyle().fontSize = "12px", this.normalMenu_do.getStyle().color = "#000000", this.normalMenu_do.setInnerHTML("&#0169; made by FWD"), this.normalMenu_do.setBkColor("#FFFFFF"), this.selectedMenu_do = new FWDUVPDisplayObject("div"), this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif", this.selectedMenu_do.getStyle().padding = "4px", this.selectedMenu_do.getStyle().fontSize = "12px", this.selectedMenu_do.getStyle().color = "#FFFFFF", this.selectedMenu_do.setInnerHTML("&#0169; made by FWD"), this.selectedMenu_do.setBkColor("#000000"), this.selectedMenu_do.setAlpha(0), this.over_do = new FWDUVPDisplayObject("div"), this.over_do.setBkColor("#FF0000"), this.over_do.setAlpha(0), this.menu_do.addChild(this.normalMenu_do), this.menu_do.addChild(this.selectedMenu_do), this.menu_do.addChild(this.over_do), this.parent.addChild(this.menu_do), this.over_do.setWidth(this.selectedMenu_do.getWidth()), this.menu_do.setWidth(this.selectedMenu_do.getWidth()), this.over_do.setHeight(this.selectedMenu_do.getHeight()), this.menu_do.setHeight(this.selectedMenu_do.getHeight()), this.menu_do.setVisible(!1), this.menu_do.setButtonMode(!0), this.menu_do.screen.onmouseover = this.mouseOverHandler, this.menu_do.screen.onmouseout = this.mouseOutHandler, this.menu_do.screen.onclick = this.onClickHandler)
            }, this.mouseOverHandler = function() {
                c.url.indexOf("w.we") == -1 && (c.menu_do.visible = !1), FWDAnimation.to(c.normalMenu_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.selectedMenu_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            }, this.mouseOutHandler = function() {
                FWDAnimation.to(c.normalMenu_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                }), FWDAnimation.to(c.selectedMenu_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })
            }, this.onClickHandler = function() {
                window.open(c.url, "_blank")
            }, this.positionButtons = function(a) {
                var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                    d = b.screenX - c.parent.getGlobalX(),
                    e = b.screenY - c.parent.getGlobalY(),
                    f = d + 2,
                    g = e + 2;
                f > c.parent.getWidth() - c.menu_do.getWidth() - 2 && (f = d - c.menu_do.getWidth() - 2), g > c.parent.getHeight() - c.menu_do.getHeight() - 2 && (g = e - c.menu_do.getHeight() - 2), c.menu_do.setX(f), c.menu_do.setY(g)
            }, this.disable = function() {
                c.isDisabled_bl = !0
            }, this.enable = function() {
                c.isDisabled_bl = !1
            }, this.init()
        };
        a.prototype = null, window.FWDUVPContextMenu = a
    }(window), function() {
        var a = function(b, c) {
            var d = this;
            a.prototype;
            this.bkLeft_img = b.bkLeft_img, this.bkRight_img = b.bkRight_img, this.playN_img = b.playN_img, this.pauseN_img = b.pauseN_img, this.mainScrubberBkLeft_img = b.mainScrubberBkLeft_img, this.mainScrubberDragLeft_img = b.mainScrubberDragLeft_img, this.mainScrubberLine_img = b.mainScrubberLine_img, this.volumeScrubberBkLeft_img = b.volumeScrubberBkLeft_img, this.volumeScrubberDragLeft_img = b.volumeScrubberDragLeft_img, this.volumeScrubberLine_img = b.volumeScrubberLine_img, this.volumeN_img = b.volumeN_img, this.progressLeft_img = b.progressLeft_img, this.categoriesN_img = b.categoriesN_img, this.playlistN_img = b.playlistN_img, this.ytbQualityN_img = b.ytbQualityN_img, this.infoN_img = b.infoN_img, this.downloadN_img = b.downloadN_img, this.facebookN_img = b.facebookN_img, this.fullScreenN_img = b.fullScreenN_img, this.normalScreenN_img = b.normalScreenN_img, this.hidePlaylistN_img = b.hidePlaylistN_img, this.showPlaylistN_img = b.showPlaylistN_img, this.embedN_img = b.embedN_img, this.buttons_ar = [], this.ytbQuality_ar = null, this.ytbButtons_ar = null, this.prevButton_do = null, this.nextButton_do = null, this.pointer_do, this.ytbDisabledButton_do = null, this.disable_do = null, this.mainHolder_do = null, this.ytbButtonsHolder_do = null, this.playPauseButton_do = null, this.mainScrubber_do = null, this.mainScrubberBkLeft_do = null, this.mainScrubberBkMiddle_do = null, this.mainScrubberBkRight_do = null, this.mainScrubberDrag_do = null, this.mainScrubberDragLeft_do = null, this.mainScrubberDragMiddle_do = null, this.mainScrubberBarLine_do = null, this.mainProgress_do = null, this.progressLeft_do = null, this.progressMiddle_do = null, this.time_do = null, this.volumeButton_do = null, this.volumeScrubber_do = null, this.volumeScrubberBkBottom_do = null, this.volumeScrubberBkMiddle_do = null, this.volumeScrubberBkTop_do = null, this.volumeScrubberDrag_do = null, this.volumeScrubberDragBottom_do = null, this.volumeScrubberDragMiddle_do = null, this.volumeScrubberBarLine_do = null, this.ytbQualityButton_do = null, this.shareButton_do = null, this.fullScreenButton_do = null, this.ytbQualityArrow_do = null, this.bk_do = null, this.playlistButton_do = null, this.embedButton_do = null, this.playPauseToolTip_do = null, this.playlistsButtonToolTip_do = null, this.volumeButtonToolTip_do = null, this.playlistsButtonToolTip_do = null, this.playlistButtonToolTip_do = null, this.embedButtonToolTip_do = null, this.infoButtonToolTip_do = null, this.downloadButtonToolTip_do = null, this.facebookButtonToolTip_do = null, this.fullscreenButtonToolTip_do = null, this.bkMiddlePath_str = b.bkMiddlePath_str, this.mainScrubberBkMiddlePath_str = b.mainScrubberBkMiddlePath_str, this.volumeScrubberBkMiddlePath_str = b.volumeScrubberBkMiddlePath_str, this.mainScrubberDragMiddlePath_str = b.mainScrubberDragMiddlePath_str, this.volumeScrubberDragMiddlePath_str = b.volumeScrubberDragMiddlePath_str, this.timeColor_str = b.timeColor_str, this.progressMiddlePath_str = b.progressMiddlePath_str, this.youtubeQualityButtonNormalColor_str = b.youtubeQualityButtonNormalColor_str, this.youtubeQualityButtonSelectedColor_str = b.youtubeQualityButtonSelectedColor_str, this.youtubeQualityArrowPath_str = b.youtubeQualityArrowPath_str, this.controllerBkPath_str = b.controllerBkPath_str, this.ytbQualityButtonPointerPath_str = b.ytbQualityButtonPointerPath_str, this.buttonsToolTipFontColor_str = b.buttonsToolTipFontColor_str, this.buttonsToolTipHideDelay = b.buttonsToolTipHideDelay, this.totalYtbButtons = 0, this.stageWidth = 0, this.stageHeight = b.controllerHeight, this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width, this.mainScrubberWidth = 0, this.mainScrubberMinWidth = 100, this.volumeScrubberOfsetHeight = b.volumeScrubberOfsetHeight, this.volumeScrubberHeight = b.volumeScrubberHeight + d.volumeScrubberOfsetHeight, this.volumeScrubberWidth = d.mainScrubberBkLeft_img.height, this.mainScrubberHeight = this.mainScrubberBkLeft_img.height, this.mainScrubberDragLeftWidth = d.mainScrubberDragLeft_img.width, this.scrubbersOffsetWidth = b.scrubbersOffsetWidth, this.volume = b.volume, this.lastVolume = d.volume, this.startSpaceBetweenButtons = b.startSpaceBetweenButtons, this.spaceBetweenButtons = b.spaceBetweenButtons, this.percentPlayed = 0, this.percentLoaded = 0, this.lastTimeLength = 0, this.prevYtbQualityButtonsLength = 0, this.pointerWidth = 8, this.pointerHeight = 5, this.timeOffsetLeftWidth = b.timeOffsetLeftWidth, this.timeOffsetRightWidth = b.timeOffsetRightWidth, this.timeOffsetTop = b.timeOffsetTop, this.mainScrubberOffestTop = b.mainScrubberOffestTop, this.isVolumeScrubberShowed_bl = !0, this.volumeScrubberIsDragging_bl = !1, this.showButtonsToolTip_bl = b.showButtonsToolTip_bl, this.showPlaylistsButtonAndPlaylists_bl = b.showPlaylistsButtonAndPlaylists_bl, this.showPlaylistButtonAndPlaylist_bl = b.showPlaylistButtonAndPlaylist_bl, this.showEmbedButton_bl = b.showEmbedButton_bl, this.showPlaylistByDefault_bl = b.showPlaylistByDefault_bl, this.showShuffleButton_bl = b.showShuffleButton_bl, this.showLoopButton_bl = b.showLoopButton_bl, this.showNP_bl = c.data.showNextAndPrevButtonsInController_bl, c.isEmbedded_bl && (c.data.showNextAndPrevButtonsInController_bl = !0), this.showNextAndPrevButtonsInController_bl = b.showNextAndPrevButtonsInController_bl, this.showFullScreenButton_bl = b.showFullScreenButton_bl, this.disableVideoScrubber_bl = b.disableVideoScrubber_bl, this.showYoutubeQualityButton_bl = b.showYoutubeQualityButton_bl, this.showShareButton_bl = b.showShareButton_bl, this.showInfoButton_bl = b.showInfoButton_bl, this.showDownloadVideoButton_bl = b.showDownloadVideoButton_bl, this.showVolumeScrubber_bl = b.showVolumeScrubber_bl, this.allowToChangeVolume_bl = b.allowToChangeVolume_bl, this.showTime_bl = b.showTime_bl, this.showVolumeButton_bl = b.showVolumeButton_bl, this.showControllerWhenVideoIsStopped_bl = b.showControllerWhenVideoIsStopped_bl, this.isMainScrubberScrubbing_bl = !1, this.isMainScrubberDisabled_bl = !1, this.isVolumeScrubberDisabled_bl = !1, this.isMainScrubberLineVisible_bl = !1, this.isVolumeScrubberLineVisible_bl = !1, this.showSubtitleButton_bl = b.showSubtitleButton_bl, this.hasYtbButton_bl = !1, this.isMute_bl = !1, this.isShowed_bl = !0, this.forceToShowMainScrubberOverCotroller_bl = !1, this.isMainScrubberOnTop_bl = !1, this.showNextAndPrevButtons_bl = b.showNextAndPrevButtons_bl, this.isPlaylistShowed_bl = b.isPlaylistShowed_bl, this.areYtbQualityButtonsShowed_bl = !0, this.repeatBackground_bl = b.repeatBackground_bl, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, d.init = function() {
                if (d.setOverflow("visible"), d.mainHolder_do = new FWDUVPDisplayObject("div"), d.repeatBackground_bl) d.mainHolder_do.getStyle().background = "url('" + d.controllerBkPath_str + "')";
                else {
                    d.bk_do = new FWDUVPDisplayObject("img");
                    var a = new Image;
                    a.src = d.controllerBkPath_str, d.bk_do.setScreen(a), d.bk_do.getStyle().backgroundColor = "#000000", d.mainHolder_do.addChild(d.bk_do)
                }
                d.mainHolder_do.setOverflow("visible"), d.mainHolder_do.getStyle().zIndex = 1, d.addChild(d.mainHolder_do), d.showYoutubeQualityButton_bl && (d.ytbQuality_ar = ["hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny"], d.ytbButtons_ar = [], d.totalYtbButtons = d.ytbQuality_ar.length, d.setupYtbButtons()), d.showNextAndPrevButtonsInController_bl && d.setupPrevButton(), d.setupPlayPauseButton(), d.showNextAndPrevButtonsInController_bl && d.setupNextButton(), d.setupMainScrubber(), d.showTime_bl && d.setupTime(), d.showVolumeButton_bl && d.setupVolumeButton(), d.showPlaylistsButtonAndPlaylists_bl && d.setupCategoriesButton(), d.showPlaylistButtonAndPlaylist_bl && d.setupPlaylistButton(), d.showYoutubeQualityButton_bl && d.setupYoutubeQualityButton(), d.showShareButton_bl && d.setupShareButton(), d.showEmbedButton_bl && d.setupEmbedButton(), d.showInfoButton_bl && d.setupInfoButton(), d.showDownloadVideoButton_bl && d.setupDownloadButton(), d.showSubtitleButton_bl && d.setupSubtitleButton(), d.showFullScreenButton_bl && d.setupFullscreenButton(), d.showButtonsToolTip_bl && d.setupToolTips(), d.showVolumeScrubber_bl && (d.setupVolumeScrubber(), d.hideVolumeScrubber()), d.hide(!1)
            }, d.resizeAndPosition = function() {
                d.stageWidth = c.tempVidStageWidth, d.positionButtons(), d.setY(c.tempVidStageHeight - d.stageHeight), d.hideQualityButtons(!1), d.ytbButtonsHolder_do && (FWDAnimation.killTweensOf(d.ytbButtonsHolder_do), d.ytbButtonsHolder_do.setY(c.tempStageHeight))
            }, d.positionButtons = function() {
                if (d.stageWidth) {
                    var a, e, f = 0,
                        g = 0,
                        h = 0,
                        i = 0,
                        j = d.showTime_bl;
                    if (d.showDownloadVideoButton_bl)
                        if (b.playlist_ar[c.id].downloadable) FWDUVPUtils.indexOfArray(d.buttons_ar, d.downloadButton_do) == -1 && (d.fullScreenButton_do ? d.embedButton_do && d.facebookButton_do ? d.buttons_ar.splice(d.buttons_ar.length - 3, 0, d.downloadButton_do) : d.buttons_ar.splice(d.buttons_ar.length - 2, 0, d.downloadButton_do) : d.facebookButton_do ? d.embedButton_do ? d.buttons_ar.splice(d.buttons_ar.length - 2, 0, d.downloadButton_do) : d.buttons_ar.splice(d.buttons_ar.length - 1, 0, d.downloadButton_do) : d.embedButton_do ? d.buttons_ar.splice(d.buttons_ar.length - 1, 0, d.downloadButton_do) : d.buttons_ar.splice(d.buttons_ar.length, 0, d.downloadButton_do), d.downloadButton_do.setVisible(!0));
                        else {
                            var k = FWDUVPUtils.indexOfArray(d.buttons_ar, d.downloadButton_do);
                            k != -1 && (d.buttons_ar.splice(k, 1), d.downloadButton_do.setVisible(!1))
                        }
                    if (d.showInfoButton_bl) {
                        var l;
                        if (b.playlist_ar[c.id].desc) FWDUVPUtils.indexOfArray(d.buttons_ar, d.infoButton_do) == -1 && (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.downloadButton_do), d.downloadButton_do && k != -1 ? d.buttons_ar.splice(l, 0, d.infoButton_do) : d.embedButton_do ? (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.embedButton_do), d.buttons_ar.splice(l, 0, d.infoButton_do)) : d.facebookButton_do ? (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.facebookButton_do), d.buttons_ar.splice(l, 0, d.infoButton_do)) : d.fullScreenButton_do ? (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.fullScreenButton_do), d.buttons_ar.splice(l, 0, d.infoButton_do)) : d.fullScreenButton_do ? (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.fullScreenButton_do), d.buttons_ar.splice(l, 0, d.infoButton_do)) : d.buttons_ar.splice(d.buttons_ar.length, 0, d.infoButton_do)), d.infoButton_do.setVisible(!0);
                        else {
                            var m = FWDUVPUtils.indexOfArray(d.buttons_ar, d.infoButton_do);
                            m != -1 && (d.buttons_ar.splice(m, 1), d.infoButton_do.setVisible(!1))
                        }
                    }
                    if (d.showSubtitleButton_bl)
                        if (b.playlist_ar[c.id].subtitleSource) FWDUVPUtils.indexOfArray(d.buttons_ar, d.subtitleButton_do) == -1 && d.fullScreenButton_do && (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.fullScreenButton_do), d.buttons_ar.splice(l, 0, d.subtitleButton_do));
                        else {
                            var n = FWDUVPUtils.indexOfArray(d.buttons_ar, d.subtitleButton_do);
                            n != -1 && (d.buttons_ar.splice(n, 1), d.subtitleButton_do.setVisible(!1), d.subtitleButton_do.setX(-5e3))
                        }
                    if (c.videoType_str == FWDUVPlayer.VIMEO) {
                        var o = FWDUVPUtils.indexOfArray(d.buttons_ar, d.playPauseButton_do);
                        if (o != -1 && (d.buttons_ar.splice(o, 1), d.playPauseButton_do.setVisible(!1), d.playPauseButton_do.setX(-500)), d.showVolumeButton_bl) {
                            var p = FWDUVPUtils.indexOfArray(d.buttons_ar, d.volumeButton_do);
                            p != -1 && (d.buttons_ar.splice(p, 1), d.volumeButton_do.setVisible(!1), d.volumeButton_do.setX(-500))
                        }
                        d.mainScrubber_do.setVisible(!1)
                    } else FWDUVPUtils.indexOfArray(d.buttons_ar, d.playPauseButton_do) == -1 && d.playPauseButton_do && (l = 0, d.buttons_ar.splice(l, 0, d.playPauseButton_do), d.playPauseButton_do.setVisible(!0)), d.showVolumeButton_bl && (d.showTime_bl ? FWDUVPUtils.indexOfArray(d.buttons_ar, d.volumeButton_do) == -1 && (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.time_do) + 1, d.buttons_ar.splice(l, 0, d.volumeButton_do), d.volumeButton_do.setVisible(!0)) : FWDUVPUtils.indexOfArray(d.buttons_ar, d.volumeButton_do) == -1 && (l = FWDUVPUtils.indexOfArray(d.buttons_ar, d.mainScrubber_do) + 1, d.buttons_ar.splice(l, 0, d.volumeButton_do), d.volumeButton_do.setVisible(!0))), d.mainScrubber_do.setVisible(!0);
                    for (var q = [], r = 0; r < d.buttons_ar.length; r++) q[r] = d.buttons_ar[r];
                    "right" == c.tempPlaylistPosition_str && d.showNextAndPrevButtonsInController_bl && !d.showNP_bl && FWDUVPUtils.indexOfArray(q, d.nextButton_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.nextButton_do), 1), q.splice(FWDUVPUtils.indexOfArray(q, d.prevButton_do), 1), d.nextButton_do.setX(-1e3), d.prevButton_do.setX(-1e3)), d.mainScrubberWidth = d.stageWidth - 2 * d.startSpaceBetweenButtons;
                    for (var r = 0; r < q.length; r++) a = q[r], a != d.mainScrubber_do && (d.mainScrubberWidth -= a.w + d.spaceBetweenButtons);
                    if (c.videoType_str == FWDUVPlayer.VIMEO && d.mainScrubberWidth >= 120) {
                        d.mainScrubber_do && FWDUVPUtils.indexOfArray(q, d.mainScrubber_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.mainScrubber_do), 1), d.positionScrollBarOnTopOfTheController()), d.time_do && FWDUVPUtils.indexOfArray(q, d.time_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.time_do), 1), d.time_do.setX(-1e3)), f = q.length;
                        for (var r = 0; r < f; r++) g += q[r].w;
                        h = d.spaceBetweenButtons, i = d.stageWidth - q[f - 1].w - d.startSpaceBetweenButtons - 2;
                        for (var r = f - 1; r >= 0; r--) a = q[r], r == f - 1 ? a.setX(i) : (e = q[r + 1], a.setX(e.x - a.w - h))
                    } else if (d.mainScrubberWidth <= 120 || c.videoType_str == FWDUVPlayer.VIMEO) {
                        d.mainScrubber_do && FWDUVPUtils.indexOfArray(q, d.mainScrubber_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.mainScrubber_do), 1), d.positionScrollBarOnTopOfTheController()), d.time_do && FWDUVPUtils.indexOfArray(q, d.time_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.time_do), 1), d.time_do.setX(-1e3)), f = q.length;
                        for (var r = 0; r < f; r++) g += q[r].w;
                        h = parseInt((d.stageWidth - g - 2 * d.startSpaceBetweenButtons) / (f - 1)), i = parseInt((d.stageWidth - g - (f - 1) * h) / 2);
                        for (var r = 0; r < f; r++) a = q[r], 0 == r ? a.setX(i) : (e = q[r - 1], a.setX(e.x + e.w + h))
                    } else {
                        for (; d.mainScrubberWidth < d.mainScrubberMinWidth;) {
                            d.mainScrubberWidth = d.stageWidth - 2 * d.startSpaceBetweenButtons, d.time_do && FWDUVPUtils.indexOfArray(q, d.time_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.time_do), 1), d.time_do.setX(-1e3), j = !1) : d.shareButton_do && FWDUVPUtils.indexOfArray(q, d.shareButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.shareButton_do), 1), d.shareButton_do.setX(-1e3)) : d.downloadButton_do && FWDUVPUtils.indexOfArray(q, d.downloadButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.downloadButton_do), 1), d.downloadButton_do.setX(-1e3)) : d.embedButton_do && FWDUVPUtils.indexOfArray(q, d.embedButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.embedButton_do), 1), d.embedButton_do.setX(-1e3)) : d.volumeButton_do && FWDUVPUtils.indexOfArray(q, d.volumeButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.volumeButton_do), 1), d.volumeButton_do.setX(-1e3)) : d.ytbQualityButton_do && FWDUVPUtils.indexOfArray(q, d.ytbQualityButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.ytbQualityButton_do), 1), d.ytbQualityButton_do.setX(-1e3)) : d.playlistButton_do && FWDUVPUtils.indexOfArray(q, d.playlistButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.playlistButton_do), 1), d.playlistButton_do.setX(-1e3)) : d.infoButton_do && FWDUVPUtils.indexOfArray(q, d.infoButton_do) != -1 ? (q.splice(FWDUVPUtils.indexOfArray(q, d.infoButton_do), 1), d.infoButton_do.setX(-1e3)) : d.categoriesButton_do && FWDUVPUtils.indexOfArray(q, d.categoriesButton_do) != -1 && (q.splice(FWDUVPUtils.indexOfArray(q, d.categoriesButton_do), 1), d.categoriesButton_do.setX(-1e3)), f = q.length;
                            for (var r = 0; r < f; r++) a = q[r], a != d.mainScrubber_do && (d.mainScrubberWidth -= a.w + d.spaceBetweenButtons)
                        }
                        d.showNextAndPrevButtonsInController_bl && d.mainScrubberWidth > 120, j && (d.mainScrubberWidth -= 2 * d.timeOffsetLeftWidth), f = q.length;
                        for (var r = 0; r < f; r++) a = q[r], 0 == r ? a.setX(d.startSpaceBetweenButtons) : a == d.mainScrubber_do ? (e = q[r - 1], FWDAnimation.killTweensOf(d.mainScrubber_do), d.mainScrubber_do.setX(e.x + e.w + d.spaceBetweenButtons), d.mainScrubber_do.setY(parseInt((d.stageHeight - d.mainScrubberHeight) / 2)), d.mainScrubber_do.setWidth(d.mainScrubberWidth), d.mainScrubberBkMiddle_do.setWidth(d.mainScrubberWidth - 2 * d.scrubbersBkLeftAndRightWidth), d.mainScrubberBkRight_do.setX(d.mainScrubberWidth - d.scrubbersBkLeftAndRightWidth), d.mainScrubberDragMiddle_do.setWidth(d.mainScrubberWidth - d.scrubbersBkLeftAndRightWidth - d.scrubbersOffsetWidth)) : a == d.time_do ? (e = q[r - 1], a.setX(e.x + e.w + d.spaceBetweenButtons + d.timeOffsetLeftWidth)) : a == d.volumeButton_do && j ? (e = q[r - 1], a.setX(e.x + e.w + d.spaceBetweenButtons + d.timeOffsetRightWidth)) : (e = q[r - 1], a.setX(e.x + e.w + d.spaceBetweenButtons));
                        d.isShowed_bl ? d.isMainScrubberOnTop_bl = !1 : (d.isMainScrubberOnTop_bl = !0, d.positionScrollBarOnTopOfTheController())
                    }
                    d.bk_do && (d.bk_do.setWidth(d.stageWidth), d.bk_do.setHeight(d.stageHeight)), d.progressMiddle_do && d.progressMiddle_do.setWidth(Math.max(d.mainScrubberWidth - d.scrubbersBkLeftAndRightWidth - d.scrubbersOffsetWidth, 0)), d.updateMainScrubber(d.percentPlayed), d.updatePreloaderBar(d.percentLoaded), d.mainHolder_do.setWidth(d.stageWidth), d.mainHolder_do.setHeight(d.stageHeight), d.setWidth(d.stageWidth), d.setHeight(d.stageHeight)
                }
            }, this.positionScrollBarOnTopOfTheController = function() {
                d.mainScrubberWidth = d.stageWidth, d.updatePreloaderBar(d.percentLoaded), d.mainScrubber_do.setWidth(d.mainScrubberWidth), d.mainScrubberBkMiddle_do.setWidth(d.mainScrubberWidth - 2 * d.scrubbersBkLeftAndRightWidth), d.mainScrubberBkRight_do.setX(d.mainScrubberWidth - d.scrubbersBkLeftAndRightWidth), d.mainScrubberDragMiddle_do.setWidth(d.mainScrubberWidth - d.scrubbersBkLeftAndRightWidth - d.scrubbersOffsetWidth), FWDAnimation.killTweensOf(d.mainScrubber_do), d.mainScrubber_do.setX(0), d.mainScrubber_do.setAlpha(1), d.isMainScrubberOnTop_bl || d.isShowed_bl ? d.mainScrubber_do.setY(-d.mainScrubberOffestTop) : (d.mainScrubber_do.setY(d.mainScrubber_do.h), FWDAnimation.to(d.mainScrubber_do, .8, {
                    y: -d.mainScrubberOffestTop,
                    ease: Expo.easeOut
                })), d.isMainScrubberOnTop_bl = !0
            }, this.setupToolTips = function() {
                FWDUVPToolTip.setPrototype(), d.playPauseToolTip_do = new FWDUVPToolTip(d.playPauseButton_do, b.toopTipBk_str, b.toopTipPointer_str, "play / pause", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.playPauseToolTip_do.screen), d.showControllerWhenVideoIsStopped_bl && (FWDUVPToolTip.setPrototype(), d.prevButtonToolTip_do = new FWDUVPToolTip(d.prevButton_do, b.toopTipBk_str, b.toopTipPointer_str, "previous video", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.prevButtonToolTip_do.screen), FWDUVPToolTip.setPrototype(), d.nextButtonToolTip_do = new FWDUVPToolTip(d.nextButton_do, b.toopTipBk_str, b.toopTipPointer_str, "next video", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.nextButtonToolTip_do.screen)), d.showPlaylistsButtonAndPlaylists_bl && (FWDUVPToolTip.setPrototype(), d.playlistsButtonToolTip_do = new FWDUVPToolTip(d.categoriesButton_do, b.toopTipBk_str, b.toopTipPointer_str, "show playlists", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.playlistsButtonToolTip_do.screen)), d.showPlaylistButtonAndPlaylist_bl && (FWDUVPToolTip.setPrototype(), d.playlistButtonToolTip_do = new FWDUVPToolTip(d.playlistButton_do, b.toopTipBk_str, b.toopTipPointer_str, "show / hide playlist", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.playlistButtonToolTip_do.screen)), d.showEmbedButton_bl && (FWDUVPToolTip.setPrototype(), d.embedButtonToolTip_do = new FWDUVPToolTip(d.embedButton_do, b.toopTipBk_str, b.toopTipPointer_str, "show embed window", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.embedButtonToolTip_do.screen)), d.showShareButton_bl && (FWDUVPToolTip.setPrototype(), d.facebookButtonToolTip_do = new FWDUVPToolTip(d.shareButton_do, b.toopTipBk_str, b.toopTipPointer_str, "share", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.facebookButtonToolTip_do.screen)), d.showSubtitleButton_bl && (FWDUVPToolTip.setPrototype(), d.subtitleButtonToolTip_do = new FWDUVPToolTip(d.subtitleButton_do, b.toopTipBk_str, b.toopTipPointer_str, "show / hide subtitle", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.subtitleButtonToolTip_do.screen)), d.showInfoButton_bl && (FWDUVPToolTip.setPrototype(), d.infoButtonToolTip_do = new FWDUVPToolTip(d.infoButton_do, b.toopTipBk_str, b.toopTipPointer_str, "more info", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.infoButtonToolTip_do.screen)), d.showDownloadVideoButton_bl && (FWDUVPToolTip.setPrototype(), d.downloadButtonToolTip_do = new FWDUVPToolTip(d.downloadButton_do, b.toopTipBk_str, b.toopTipPointer_str, "download video", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.downloadButtonToolTip_do.screen)), d.fullScreenButton_do && (FWDUVPToolTip.setPrototype(), d.fullscreenButtonToolTip_do = new FWDUVPToolTip(d.fullScreenButton_do, b.toopTipBk_str, b.toopTipPointer_str, "fullscreen / normalscreen", d.buttonsToolTipFontColor_str, d.buttonsToolTipHideDelay), document.documentElement.appendChild(d.fullscreenButtonToolTip_do.screen))
            }, this.showToolTip = function(a, b, c) {
                if (d.showButtonsToolTip_bl) {
                    var g, h, e = FWDUVPUtils.getViewportSize();
                    FWDUVPUtils.getViewportMouseCoordinates(c);
                    a.screen.offsetWidth < 3 ? (g = parseInt(100 * a.getGlobalX() + a.w / 2 - b.w / 2), h = parseInt(100 * a.getGlobalY() - b.h - 8)) : (g = parseInt(a.getGlobalX() + a.w / 2 - b.w / 2), h = parseInt(a.getGlobalY() - b.h - 8));
                    var i = 0;
                    g < 0 ? (i = g, g = 0) : g + b.w > e.w && (i = (e.w - (g + b.w)) * -1, g += i * -1), b.positionPointer(i, !1), b.setX(g), b.setY(h), b.show()
                }
            }, this.setupMainScrubber = function() {
                d.mainScrubber_do = new FWDUVPDisplayObject("div"), d.mainScrubber_do.setY(parseInt((d.stageHeight - d.mainScrubberHeight) / 2)), d.mainScrubber_do.setHeight(d.mainScrubberHeight), d.mainScrubberBkLeft_do = new FWDUVPDisplayObject("img"), d.mainScrubberBkLeft_do.setScreen(d.mainScrubberBkLeft_img);
                var a = new Image;
                a.src = b.mainScrubberBkRightPath_str, d.mainScrubberBkRight_do = new FWDUVPDisplayObject("img"), d.mainScrubberBkRight_do.setScreen(a), d.mainScrubberBkRight_do.setWidth(d.mainScrubberBkLeft_do.w), d.mainScrubberBkRight_do.setHeight(d.mainScrubberBkLeft_do.h);
                var c = new Image;
                c.src = d.mainScrubberBkMiddlePath_str, d.isMobile_bl ? (d.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("div"), d.mainScrubberBkMiddle_do.getStyle().background = "url('" + d.mainScrubberBkMiddlePath_str + "') repeat-x") : (d.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("img"), d.mainScrubberBkMiddle_do.setScreen(c)), d.mainScrubberBkMiddle_do.setHeight(d.mainScrubberHeight), d.mainScrubberBkMiddle_do.setX(d.scrubbersBkLeftAndRightWidth), d.mainProgress_do = new FWDUVPDisplayObject("div"), d.mainProgress_do.setHeight(d.mainScrubberHeight), d.progressLeft_do = new FWDUVPDisplayObject("img"), d.progressLeft_do.setScreen(d.progress), c = new Image, c.src = d.progressMiddlePath_str, d.progressMiddle_do = new FWDUVPDisplayObject("div"), d.progressMiddle_do.getStyle().background = "url('" + d.progressMiddlePath_str + "') repeat-x", d.progressMiddle_do.setHeight(d.mainScrubberHeight), d.progressMiddle_do.setX(d.mainScrubberDragLeftWidth), d.mainScrubberDrag_do = new FWDUVPDisplayObject("div"), d.mainScrubberDrag_do.setHeight(d.mainScrubberHeight), d.mainScrubberDragLeft_do = new FWDUVPDisplayObject("img"), d.mainScrubberDragLeft_do.setScreen(d.mainScrubberDragLeft_img), c = new Image, c.src = d.mainScrubberDragMiddlePath_str, d.isMobile_bl ? (d.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), d.mainScrubberDragMiddle_do.getStyle().background = "url('" + d.mainScrubberDragMiddlePath_str + "') repeat-x") : (d.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("img"), d.mainScrubberDragMiddle_do.setScreen(c)), d.mainScrubberDragMiddle_do.setHeight(d.mainScrubberHeight), d.mainScrubberDragMiddle_do.setX(d.mainScrubberDragLeftWidth), d.mainScrubberBarLine_do = new FWDUVPDisplayObject("img"), d.mainScrubberBarLine_do.setScreen(d.mainScrubberLine_img), d.mainScrubberBarLine_do.setAlpha(0), d.mainScrubberBarLine_do.hasTransform3d_bl = !1, d.mainScrubberBarLine_do.hasTransform2d_bl = !1, d.buttons_ar.push(d.mainScrubber_do), d.mainScrubber_do.addChild(d.mainScrubberBkLeft_do), d.mainScrubber_do.addChild(d.mainScrubberBkMiddle_do), d.mainScrubber_do.addChild(d.mainScrubberBkRight_do), d.mainScrubber_do.addChild(d.mainScrubberBarLine_do), d.mainScrubberDrag_do.addChild(d.mainScrubberDragLeft_do), d.mainScrubberDrag_do.addChild(d.mainScrubberDragMiddle_do), d.mainProgress_do.addChild(d.progressLeft_do), d.mainProgress_do.addChild(d.progressMiddle_do), d.mainScrubber_do.addChild(d.mainProgress_do), d.mainScrubber_do.addChild(d.mainScrubberDrag_do), d.mainScrubber_do.addChild(d.mainScrubberBarLine_do), d.mainHolder_do.addChild(d.mainScrubber_do), d.disableVideoScrubber_bl || (d.isMobile_bl ? d.hasPointerEvent_bl ? (d.mainScrubber_do.screen.addEventListener("pointerover", d.mainScrubberOnOverHandler), d.mainScrubber_do.screen.addEventListener("pointerout", d.mainScrubberOnOutHandler), d.mainScrubber_do.screen.addEventListener("pointerdown", d.mainScrubberOnDownHandler)) : d.mainScrubber_do.screen.addEventListener("touchstart", d.mainScrubberOnDownHandler) : d.screen.addEventListener ? (d.mainScrubber_do.screen.addEventListener("mouseover", d.mainScrubberOnOverHandler), d.mainScrubber_do.screen.addEventListener("mouseout", d.mainScrubberOnOutHandler), d.mainScrubber_do.screen.addEventListener("mousedown", d.mainScrubberOnDownHandler)) : d.screen.attachEvent && (d.mainScrubber_do.screen.attachEvent("onmouseover", d.mainScrubberOnOverHandler),
                    d.mainScrubber_do.screen.attachEvent("onmouseout", d.mainScrubberOnOutHandler), d.mainScrubber_do.screen.attachEvent("onmousedown", d.mainScrubberOnDownHandler))), d.disableMainScrubber(), d.updateMainScrubber(0)
            }, this.mainScrubberOnOverHandler = function(a) {
                d.isMainScrubberDisabled_bl
            }, this.mainScrubberOnOutHandler = function(a) {
                d.isMainScrubberDisabled_bl
            }, this.mainScrubberOnDownHandler = function(b) {
                if (!d.isMainScrubberDisabled_bl && 2 != b.button) {
                    c.showDisable(), b.preventDefault && b.preventDefault(), d.isMainScrubberScrubbing_bl = !0;
                    var e = FWDUVPUtils.getViewportMouseCoordinates(b),
                        f = e.screenX - d.mainScrubber_do.getGlobalX();
                    f < 0 ? f = 0 : f > d.mainScrubberWidth - d.scrubbersOffsetWidth && (f = d.mainScrubberWidth - d.scrubbersOffsetWidth);
                    var g = f / d.mainScrubberWidth;
                    d.updateMainScrubber(g), d.dispatchEvent(a.START_TO_SCRUB), d.dispatchEvent(a.SCRUB, {
                        percent: g
                    }), d.isMobile_bl ? d.hasPointerEvent_bl ? (window.addEventListener("MSPointerMove", d.mainScrubberMoveHandler), window.addEventListener("pointerup", d.mainScrubberEndHandler)) : (window.addEventListener("touchmove", d.mainScrubberMoveHandler), window.addEventListener("touchend", d.mainScrubberEndHandler)) : window.addEventListener ? (window.addEventListener("mousemove", d.mainScrubberMoveHandler), window.addEventListener("mouseup", d.mainScrubberEndHandler)) : document.attachEvent && (document.attachEvent("onmousemove", d.mainScrubberMoveHandler), document.attachEvent("onmouseup", d.mainScrubberEndHandler))
                }
            }, this.mainScrubberMoveHandler = function(b) {
                b.preventDefault && b.preventDefault();
                var c = FWDUVPUtils.getViewportMouseCoordinates(b),
                    e = c.screenX - d.mainScrubber_do.getGlobalX();
                e < 0 ? e = 0 : e > d.mainScrubberWidth - d.scrubbersOffsetWidth && (e = d.mainScrubberWidth - d.scrubbersOffsetWidth);
                var f = e / d.mainScrubberWidth;
                d.updateMainScrubber(f), d.dispatchEvent(a.SCRUB, {
                    percent: f
                })
            }, this.mainScrubberEndHandler = function(b) {
                c.hideDisable(), d.dispatchEvent(a.STOP_TO_SCRUB), d.isMobile_bl ? d.hasPointerEvent_bl ? (window.removeEventListener("MSPointerMove", d.mainScrubberMoveHandler), window.removeEventListener("pointerup", d.mainScrubberEndHandler)) : (window.removeEventListener("touchmove", d.mainScrubberMoveHandler), window.removeEventListener("touchend", d.mainScrubberEndHandler)) : window.removeEventListener ? (window.removeEventListener("mousemove", d.mainScrubberMoveHandler), window.removeEventListener("mouseup", d.mainScrubberEndHandler)) : document.detachEvent && (document.detachEvent("onmousemove", d.mainScrubberMoveHandler), document.detachEvent("onmouseup", d.mainScrubberEndHandler))
            }, this.disableMainScrubber = function() {
                d.mainScrubber_do && (d.isMainScrubberDisabled_bl = !0, d.mainScrubber_do.setButtonMode(!1), d.mainScrubberEndHandler(), d.updateMainScrubber(0), d.updatePreloaderBar(0))
            }, this.enableMainScrubber = function() {
                d.mainScrubber_do && (d.isMainScrubberDisabled_bl = !1, d.disableVideoScrubber_bl || d.mainScrubber_do.setButtonMode(!0))
            }, this.updateMainScrubber = function(a) {
                if (d.mainScrubber_do) {
                    var b = parseInt(a * d.mainScrubberWidth);
                    isNaN(b) || void 0 == b || (b < 0 && (b = 0), d.percentPlayed = a, !FWDUVPlayer.hasHTML5Video && b >= d.mainProgress_do.w && (b = d.mainProgress_do.w), b < 1 && d.isMainScrubberLineVisible_bl ? (d.isMainScrubberLineVisible_bl = !1, FWDAnimation.to(d.mainScrubberBarLine_do, .5, {
                        alpha: 0
                    })) : b > 1 && !d.isMainScrubberLineVisible_bl && (d.isMainScrubberLineVisible_bl = !0, FWDAnimation.to(d.mainScrubberBarLine_do, .5, {
                        alpha: 1
                    })), d.mainScrubberDrag_do.setWidth(b), b > d.mainScrubberWidth - d.scrubbersOffsetWidth && (b = d.mainScrubberWidth - d.scrubbersOffsetWidth), b < 0 && (b = 0), FWDAnimation.to(d.mainScrubberBarLine_do, .8, {
                        x: b + 1,
                        ease: Expo.easeOut
                    }))
                }
            }, this.updatePreloaderBar = function(a) {
                if (d.mainProgress_do) {
                    d.percentLoaded = a;
                    var b = parseInt(d.percentLoaded * d.mainScrubberWidth);
                    isNaN(b) || void 0 == b || (b < 0 && (b = 0), d.percentLoaded >= .98 ? (d.percentLoaded = 1, d.mainProgress_do.setY(-30)) : 0 != d.mainProgress_do.y && 1 != d.percentLoaded && d.mainProgress_do.setY(0), b > d.mainScrubberWidth - d.scrubbersOffsetWidth && (b = d.mainScrubberWidth - d.scrubbersOffsetWidth), b < 0 && (b = 0), d.mainProgress_do.setWidth(b))
                }
            }, this.setupPrevButton = function() {
                FWDUVPSimpleSizeButton.setPrototype(), d.prevButton_do = new FWDUVPSimpleSizeButton(b.prevN_img.src, b.prevSPath_str, b.prevN_img.width, b.prevN_img.height), d.prevButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, d.prevButtonShowTooltipHandler), d.prevButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, d.prevButtonOnMouseUpHandler), d.prevButton_do.setY(parseInt((d.stageHeight - d.prevButton_do.h) / 2)), d.buttons_ar.push(d.prevButton_do), d.mainHolder_do.addChild(d.prevButton_do)
            }, this.prevButtonShowTooltipHandler = function(a) {
                d.showToolTip(d.prevButton_do, d.prevButtonToolTip_do, a.e)
            }, this.prevButtonOnMouseUpHandler = function() {
                d.dispatchEvent(FWDUVPPlaylist.PLAY_PREV_VIDEO)
            }, this.setupNextButton = function() {
                FWDUVPSimpleSizeButton.setPrototype(), d.nextButton_do = new FWDUVPSimpleSizeButton(b.nextN_img.src, b.nextSPath_str, b.nextN_img.width, b.nextN_img.height), d.nextButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, d.nextButtonShowTooltipHandler), d.nextButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, d.nextButtonOnMouseUpHandler), d.nextButton_do.setY(parseInt((d.stageHeight - d.nextButton_do.h) / 2)), d.buttons_ar.push(d.nextButton_do), d.mainHolder_do.addChild(d.nextButton_do)
            }, this.nextButtonShowTooltipHandler = function(a) {
                d.showToolTip(d.nextButton_do, d.nextButtonToolTip_do, a.e)
            }, this.nextButtonOnMouseUpHandler = function() {
                d.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO)
            }, this.setupPlayPauseButton = function() {
                FWDUVPComplexButton.setPrototype(), d.playPauseButton_do = new FWDUVPComplexButton(d.playN_img, b.playSPath_str, d.pauseN_img, b.pauseSPath_str, !0), d.buttons_ar.push(d.playPauseButton_do), d.playPauseButton_do.setY(parseInt((d.stageHeight - d.playPauseButton_do.buttonHeight) / 2)), d.playPauseButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, d.playButtonShowTooltipHandler), d.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, d.playButtonMouseUpHandler), d.mainHolder_do.addChild(d.playPauseButton_do)
            }, this.playButtonShowTooltipHandler = function(a) {
                d.showToolTip(d.playPauseButton_do, d.playPauseToolTip_do, a.e)
            }, this.showPlayButton = function() {
                d.playPauseButton_do && d.playPauseButton_do.setButtonState(1)
            }, this.showPauseButton = function() {
                d.playPauseButton_do && d.playPauseButton_do.setButtonState(0)
            }, this.playButtonMouseUpHandler = function() {
                0 == d.playPauseButton_do.currentState ? d.dispatchEvent(a.PAUSE) : d.dispatchEvent(a.PLAY)
            }, this.disablePlayButton = function() {
                d.playPauseButton_do.disable(), d.playPauseButton_do.setNormalState(), d.showPlayButton()
            }, this.enablePlayButton = function() {
                d.playPauseButton_do.enable()
            }, this.setupCategoriesButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.categoriesButton_do = new FWDUVPSimpleButton(d.categoriesN_img, b.categoriesSPath_str), d.categoriesButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, d.categoriesButtonShowTooltipHandler), d.categoriesButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.categoriesButtonOnMouseUpHandler), d.categoriesButton_do.setY(parseInt((d.stageHeight - d.categoriesButton_do.h) / 2)), d.buttons_ar.push(d.categoriesButton_do), d.mainHolder_do.addChild(d.categoriesButton_do)
            }, this.categoriesButtonShowTooltipHandler = function(a) {
                d.showToolTip(d.categoriesButton_do, d.playlistsButtonToolTip_do, a.e)
            }, this.categoriesButtonOnMouseUpHandler = function() {
                d.dispatchEvent(a.SHOW_CATEGORIES)
            }, this.setCategoriesButtonState = function(a) {
                d.categoriesButton_do && ("selected" == a ? d.categoriesButton_do.setSelected() : "unselected" == a && d.categoriesButton_do.setUnselected())
            }, this.setupPlaylistButton = function() {
                FWDUVPComplexButton.setPrototype(), d.playlistButton_do = new FWDUVPComplexButton(d.hidePlaylistN_img, b.hidePlaylistSPath_str, d.showPlaylistN_img, b.showPlaylistSPath_str, !0), d.buttons_ar.push(d.playlistButton_do), d.playlistButton_do.setY(parseInt((d.stageHeight - d.playlistButton_do.buttonHeight) / 2)), d.playlistButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, d.playlistButtonShowToolTipHandler), d.playlistButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, d.playlistButtonMouseUpHandler), d.showPlaylistByDefault_bl || d.playlistButton_do.setButtonState(0), d.mainHolder_do.addChild(d.playlistButton_do)
            }, this.playlistButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.playlistButton_do, d.playlistButtonToolTip_do, a.e)
            }, this.showShowPlaylistButton = function() {
                d.playlistButton_do && d.playlistButton_do.setButtonState(1)
            }, this.showHidePlaylistButton = function() {
                d.playlistButton_do && d.playlistButton_do.setButtonState(0)
            }, this.playlistButtonMouseUpHandler = function() {
                1 == d.playlistButton_do.currentState ? d.dispatchEvent(a.SHOW_PLAYLIST) : d.dispatchEvent(a.HIDE_PLAYLIST), d.playlistButton_do.setNormalState(), d.playlistButtonToolTip_do && d.playlistButtonToolTip_do.hide()
            }, this.disablePlaylistButton = function() {
                d.playlistButton_do && (d.playlistButton_do.disable(), d.playlistButton_do.setAlpha(.4))
            }, this.enablePlaylistButton = function() {
                d.playlistButton_do && (d.playlistButton_do.enable(), d.playlistButton_do.setAlpha(1))
            }, this.setupEmbedButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.embedButton_do = new FWDUVPSimpleButton(d.embedN_img, b.embedPathS_str, void 0, !0), d.embedButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, d.embedButtonShowToolTipHandler), d.embedButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.embedButtonOnMouseUpHandler), d.embedButton_do.setY(parseInt((d.stageHeight - d.embedButton_do.h) / 2)), d.buttons_ar.push(d.embedButton_do), d.mainHolder_do.addChild(d.embedButton_do)
            }, this.embedButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.embedButton_do, d.embedButtonToolTip_do, a.e)
            }, this.embedButtonOnMouseUpHandler = function() {
                d.dispatchEvent(a.SHOW_EMBED_WINDOW), d.embedButtonToolTip_do && d.embedButtonToolTip_do.hide()
            }, this.setupYtbButtons = function() {
                if (d.ytbButtonsHolder_do = new FWDUVPDisplayObject("div"), d.ytbButtonsHolder_do.setOverflow("visible"), d.repeatBackground_bl) d.ytbButtonsHolder_do.getStyle().background = "url('" + d.controllerBkPath_str + "')";
                else {
                    d.ytbButtonBackground_do = new FWDUVPDisplayObject("img");
                    var a = new Image;
                    a.src = d.controllerBkPath_str, d.ytbButtonBackground_do.setScreen(a), d.ytbButtonsHolder_do.addChild(d.ytbButtonBackground_do)
                }
                d.ytbButtonsHolder_do.setX(300), d.ytbButtonsHolder_do.setY(-300), c.videoHolder_do.addChild(d.ytbButtonsHolder_do, 0);
                var a = new Image;
                a.src = d.ytbQualityButtonPointerPath_str, d.pointer_do = new FWDUVPDisplayObject("img"), d.pointer_do.setScreen(a), d.pointer_do.setWidth(d.pointerWidth), d.pointer_do.setHeight(d.pointerHeight), d.ytbButtonsHolder_do.addChild(d.pointer_do);
                var a = new Image;
                a.src = d.youtubeQualityArrowPath_str, d.ytbQualityArrow_do = new FWDUVPDisplayObject("img"), d.ytbQualityArrow_do.setScreen(a), d.ytbQualityArrow_do.setX(7), d.ytbQualityArrow_do.setWidth(5), d.ytbQualityArrow_do.setHeight(7), d.ytbButtonsHolder_do.addChild(d.ytbQualityArrow_do);
                for (var e, f = 0; f < d.totalYtbButtons; f++) FWDUVPYTBQButton.setPrototype(), e = new FWDUVPYTBQButton(d.ytbQuality_ar[f], d.youtubeQualityButtonNormalColor_str, d.youtubeQualityButtonSelectedColor_str, b.hdPath_str), e.addListener(FWDUVPYTBQButton.MOUSE_OVER, d.ytbQualityOver), e.addListener(FWDUVPYTBQButton.MOUSE_OUT, d.ytbQualityOut), e.addListener(FWDUVPYTBQButton.CLICK, d.ytbQualityClick), d.ytbButtons_ar[f] = e, d.ytbButtonsHolder_do.addChild(e);
                d.hideQualityButtons(!1)
            }, this.ytbQualityOver = function(a) {
                d.setYtbQualityArrowPosition(a.target)
            }, this.ytbQualityOut = function(a) {
                d.setYtbQualityArrowPosition(void 0)
            }, this.ytbQualityClick = function(b) {
                d.hideQualityButtons(!0), d.isMainScrubberOnTop_bl && (d.mainScrubber_do.setX(0), FWDAnimation.to(d.mainScrubber_do, .6, {
                    alpha: 1
                })), d.dispatchEvent(a.CHANGE_YOUTUBE_QUALITY, {
                    quality: b.target.label_str
                })
            }, this.positionAndResizeYtbQualityButtons = function(a) {
                if (a) {
                    var b = a.length + 1;
                    if (d.prevYtbQualityButtonsLength != b) {
                        this.prevYtbQualityButtonsLength = b;
                        for (var c, e = 5, f = 0, g = 0, h = 0; h < d.totalYtbButtons; h++) {
                            c = d.ytbButtons_ar[h], c.setFinalSize();
                            for (var i = 0; i < b; i++) {
                                if (c.label_str == a[i]) {
                                    0 != c.x && c.setX(0), c.w > f && (f = c.w), c.setY(e), e += c.h;
                                    break
                                }
                                c.x != -3e3 && c.setX(-3e3)
                            }
                        }
                        for (var h = 0; h < d.totalYtbButtons; h++) c = d.ytbButtons_ar[h], c.dumy_do.w < f && (c.setWidth(f), c.dumy_do.setWidth(f));
                        g = e + 5, d.pointer_do.setX(parseInt((f - d.pointer_do.w) / 2)), d.pointer_do.setY(g), d.ytbButtonBackground_do && (d.ytbButtonBackground_do.setWidth(f), d.ytbButtonBackground_do.setHeight(g)), d.ytbButtonsHolder_do.setWidth(f), d.ytbButtonsHolder_do.setHeight(g)
                    }
                }
            };
            this.disableQualityButtons = function(a) {
                for (var b = 0; b < d.totalYtbButtons; b++) btn = d.ytbButtons_ar[b], btn.label_str == a ? (FWDAnimation.killTweensOf(d.ytbQualityArrow_do), d.ytbQualityArrow_do.setY(btn.y + parseInt((btn.h - d.ytbQualityArrow_do.h) / 2) + 1), btn.disable(), d.ytbDisabledButton_do = btn) : btn.enable();
                "highres" == a || "hd1080" == a || "hd720" == a ? d.ytbQualityButton_do.showDisabledState() : d.ytbQualityButton_do.hideDisabledState()
            };
            this.setYtbQualityArrowPosition = function(a) {
                var b = 0;
                b = a ? a.y + parseInt((a.h - d.ytbQualityArrow_do.h) / 2) : d.ytbDisabledButton_do.y + parseInt((d.ytbDisabledButton_do.h - d.ytbQualityArrow_do.h) / 2), FWDAnimation.killTweensOf(d.ytbQualityArrow_do), FWDAnimation.to(d.ytbQualityArrow_do, .6, {
                    y: b,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, this.showQualityButtons = function(a) {
                if (!d.areYtbQualityButtonsShowed_bl && d.showYoutubeQualityButton_bl) {
                    d.areYtbQualityButtonsShowed_bl = !0;
                    var b = parseInt(d.ytbQualityButton_do.x + parseInt(d.ytbQualityButton_do.w - d.ytbButtonsHolder_do.w) / 2),
                        e = parseInt(c.tempVidStageHeight - d.stageHeight - d.ytbButtonsHolder_do.h - 6);
                    window.addEventListener ? window.addEventListener("mousedown", d.hideQualityButtonsHandler) : document.attachEvent && (document.detachEvent("onmousedown", d.hideQualityButtonsHandler), document.attachEvent("onmousedown", d.hideQualityButtonsHandler)), d.ytbButtonsHolder_do.setX(b), d.isMainScrubberOnTop_bl && FWDAnimation.to(d.mainScrubber_do, .4, {
                        alpha: 0,
                        onComplete: function() {
                            d.mainScrubber_do.setX(-5e3)
                        }
                    }), a ? FWDAnimation.to(d.ytbButtonsHolder_do, .6, {
                        y: e,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(d.ytbButtonsHolder_do), d.ytbButtonsHolder_do.setY(e))
                }
            }, this.hideQualityButtons = function(a) {
                d.areYtbQualityButtonsShowed_bl && d.showYoutubeQualityButton_bl && (d.areYtbQualityButtonsShowed_bl = !1, a ? FWDAnimation.to(d.ytbButtonsHolder_do, .6, {
                    y: c.tempVidStageHeight,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(d.ytbButtonsHolder_do), d.ytbButtonsHolder_do.setY(c.tempVidStageHeight)), window.removeEventListener ? window.removeEventListener("mousedown", d.hideQualityButtonsHandler) : document.detachEvent && document.detachEvent("onmousedown", d.hideQualityButtonsHandler))
            }, this.setupSubtitleButton = function() {
                FWDUVPComplexButton.setPrototype(), d.subtitleButton_do = new FWDUVPComplexButton(b.showSubtitleNPath_img, b.showSubtitleSPath_str, b.hideSubtitleNPath_img, b.hideSubtitleSPath_str, !0), d.buttons_ar.push(d.subtitleButton_do), d.subtitleButton_do.setY(parseInt((d.stageHeight - d.subtitleButton_do.h) / 2)), d.subtitleButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, d.subtitleButtonMouseUpHandler), d.subtitleButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, d.subtitleButtonShowToolTipHandler), d.mainHolder_do.addChild(d.subtitleButton_do), setTimeout(function() {
                    c.subtitle_do.showSubtitleByDefault_bl && d.subtitleButton_do.setButtonState(0)
                }, 100), this.disableSubtitleButton()
            }, this.subtitleButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.subtitleButton_do, d.subtitleButtonToolTip_do, a.e)
            }, this.subtitleButtonMouseUpHandler = function() {
                1 == d.subtitleButton_do.currentState ? (d.dispatchEvent(a.SHOW_SUBTITLE), d.subtitleButton_do.setButtonState(0)) : (d.dispatchEvent(a.HIDE_SUBTITLE), d.subtitleButton_do.setButtonState(1))
            }, this.disableSubtitleButton = function() {
                this.subtitleButton_do && this.subtitleButton_do.disable()
            }, this.enableSubtitleButton = function() {
                this.subtitleButton_do && this.subtitleButton_do.enable()
            }, this.setupYoutubeQualityButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.ytbQualityButton_do = new FWDUVPSimpleButton(d.ytbQualityN_img, b.ytbQualitySPath_str, b.ytbQualityDPath_str), d.ytbQualityButton_do.setX(-300), d.ytbQualityButton_do.setY(parseInt((d.stageHeight - d.ytbQualityButton_do.h) / 2)), d.ytbQualityButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.ytbQualityMouseUpHandler), d.mainHolder_do.addChild(d.ytbQualityButton_do)
            }, this.ytbQualityMouseUpHandler = function() {
                d.areYtbQualityButtonsShowed_bl ? (d.hideQualityButtons(!0), d.isMainScrubberOnTop_bl && (d.mainScrubber_do.setX(0), FWDAnimation.to(d.mainScrubber_do, .6, {
                    alpha: 1
                }))) : d.showQualityButtons(!0)
            }, this.hideQualityButtonsHandler = function(a) {
                var b = FWDUVPUtils.getViewportMouseCoordinates(a);
                FWDUVPUtils.hitTest(d.ytbQualityButton_do.screen, b.screenX, b.screenY) || FWDUVPUtils.hitTest(d.ytbButtonsHolder_do.screen, b.screenX, b.screenY) || (d.hideQualityButtons(!0), d.isMainScrubberOnTop_bl && (d.mainScrubber_do.setX(0), FWDAnimation.to(d.mainScrubber_do, .6, {
                    alpha: 1
                })))
            }, this.addYtbQualityButton = function() {
                !d.hasYtbButton_bl && d.showYoutubeQualityButton_bl && (d.hasYtbButton_bl = !0, d.embedButton_do && FWDUVPUtils.indexOfArray(d.buttons_ar, d.embedButton_do) != -1 ? d.buttons_ar.splice(FWDUVPUtils.indexOfArray(d.buttons_ar, d.embedButton_do), 0, d.ytbQualityButton_do) : d.shareButton_do && FWDUVPUtils.indexOfArray(d.buttons_ar, d.shareButton_do) != -1 ? d.buttons_ar.splice(FWDUVPUtils.indexOfArray(d.buttons_ar, d.shareButton_do), 0, d.ytbQualityButton_do) : d.fullScreenButton_do && FWDUVPUtils.indexOfArray(d.buttons_ar, d.fullScreenButton_do) != -1 ? d.buttons_ar.splice(FWDUVPUtils.indexOfArray(d.buttons_ar, d.fullScreenButton_do), 0, d.ytbQualityButton_do) : d.buttons_ar.splice(d.buttons_ar.length, 0, d.ytbQualityButton_do), d.ytbQualityButton_do.disable(), d.ytbQualityButton_do.rotation = 0, d.ytbQualityButton_do.setRotation(d.ytbQualityButton_do.rotation), d.ytbQualityButton_do.hideDisabledState(), d.hideQualityButtons(!1), d.positionButtons())
            }, this.removeYtbQualityButton = function() {
                d.hasYtbButton_bl && d.showYoutubeQualityButton_bl && (d.hasYtbButton_bl = !1, d.buttons_ar.splice(FWDUVPUtils.indexOfArray(d.buttons_ar, d.ytbQualityButton_do), 1), d.ytbQualityButton_do.setX(-300), d.ytbQualityButton_do.hideDisabledState(), d.hideQualityButtons(!1), d.positionButtons())
            }, this.updateQuality = function(a, b) {
                d.hasYtbButton_bl && d.showYoutubeQualityButton_bl && (d.ytbQualityButton_do.enable(), d.positionAndResizeYtbQualityButtons(a), d.disableQualityButtons(b))
            }, this.setupInfoButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.infoButton_do = new FWDUVPSimpleButton(d.infoN_img, b.infoSPath_str), d.infoButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, d.infoButtonShowToolTipHandler), d.infoButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.infoButtonOnMouseUpHandler), d.infoButton_do.setX(-300), d.infoButton_do.setY(parseInt((d.stageHeight - d.infoButton_do.h) / 2)), d.mainHolder_do.addChild(d.infoButton_do)
            }, this.infoButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.infoButton_do, d.infoButtonToolTip_do, a.e)
            }, this.infoButtonOnMouseUpHandler = function() {
                d.dispatchEvent(a.SHOW_INFO_WINDOW)
            }, this.setupDownloadButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.downloadButton_do = new FWDUVPSimpleButton(d.downloadN_img, b.downloadSPath_str), d.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, d.downloadButtonShowToolTipHandler), d.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.downloadButtonOnMouseUpHandler), d.downloadButton_do.setX(-300), d.downloadButton_do.setY(parseInt((d.stageHeight - d.downloadButton_do.h) / 2)), d.mainHolder_do.addChild(d.downloadButton_do)
            }, this.downloadButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.downloadButton_do, d.downloadButtonToolTip_do, a.e)
            }, this.downloadButtonOnMouseUpHandler = function() {
                d.dispatchEvent(a.DOWNLOAD_VIDEO)
            }, this.setupShareButton = function() {
                FWDUVPSimpleButton.setPrototype(), d.shareButton_do = new FWDUVPSimpleButton(b.shareN_img, b.shareSPath_str), d.buttons_ar.push(d.shareButton_do), d.shareButton_do.setY(parseInt((d.stageHeight - d.shareButton_do.h) / 2)), d.shareButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, d.facebookButtonShowTooltipHandler), d.shareButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.facebookButtonMouseUpHandler), d.mainHolder_do.addChild(d.shareButton_do)
            }, this.facebookButtonShowTooltipHandler = function(a) {
                d.showToolTip(d.shareButton_do, d.facebookButtonToolTip_do, a.e)
            }, this.facebookButtonMouseUpHandler = function() {
                d.dispatchEvent(a.SHOW_SHARE_WINDOW)
            }, this.setupFullscreenButton = function() {
                FWDUVPComplexButton.setPrototype(), d.fullScreenButton_do = new FWDUVPComplexButton(d.fullScreenN_img, b.fullScreenSPath_str, d.normalScreenN_img, b.normalScreenSPath_str, !0), d.buttons_ar.push(d.fullScreenButton_do), d.fullScreenButton_do.setY(parseInt((d.stageHeight - d.fullScreenButton_do.buttonHeight) / 2)), d.fullScreenButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, d.fullscreenButtonShowToolTipHandler), d.fullScreenButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, d.fullScreenButtonMouseUpHandler), d.mainHolder_do.addChild(d.fullScreenButton_do)
            }, this.fullscreenButtonShowToolTipHandler = function(a) {
                d.showToolTip(d.fullScreenButton_do, d.fullscreenButtonToolTip_do, a.e)
            }, this.showFullScreenButton = function() {
                d.fullScreenButton_do && d.fullScreenButton_do.setButtonState(1)
            }, this.showNormalScreenButton = function() {
                d.fullScreenButton_do && d.fullScreenButton_do.setButtonState(0)
            }, this.setNormalStateToFullScreenButton = function() {
                d.fullScreenButton_do && (d.fullScreenButton_do.setNormalState(), d.hideQualityButtons(!1))
            }, this.fullScreenButtonMouseUpHandler = function() {
                d.fullscreenButtonToolTip_do && d.fullscreenButtonToolTip_do.hide(), 1 == d.fullScreenButton_do.currentState ? d.dispatchEvent(a.FULL_SCREEN) : d.dispatchEvent(a.NORMAL_SCREEN)
            }, this.setupTime = function() {
                d.time_do = new FWDUVPDisplayObject("div"), d.time_do.hasTransform3d_bl = !1, d.time_do.hasTransform2d_bl = !1, d.time_do.setBackfaceVisibility(), d.time_do.getStyle().fontFamily = "Arial", d.time_do.getStyle().fontSize = "12px", d.time_do.getStyle().whiteSpace = "nowrap", d.time_do.getStyle().textAlign = "center", d.time_do.getStyle().color = d.timeColor_str, d.time_do.getStyle().fontSmoothing = "antialiased", d.time_do.getStyle().webkitFontSmoothing = "antialiased", d.time_do.getStyle().textRendering = "optimizeLegibility", d.mainHolder_do.addChild(d.time_do), d.updateTime("00:00/00:00"), d.buttons_ar.push(d.time_do)
            }, this.updateTime = function(a) {
                d.time_do && (d.time_do.setInnerHTML(a), d.lastTimeLength != a.length && (d.time_do.w = d.time_do.getWidth(), d.positionButtons(), setTimeout(function() {
                    d.time_do.w = d.time_do.getWidth(), d.time_do.h = d.time_do.getHeight(), d.time_do.setY(parseInt((d.stageHeight - d.time_do.h) / 2) + 1 + d.timeOffsetTop), d.positionButtons()
                }, 50), d.lastTimeLength = a.length))
            }, this.setupVolumeButton = function() {
                FWDUVPVolumeButton.setPrototype(), d.volumeButton_do = new FWDUVPVolumeButton(d.volumeN_img, b.volumeSPath_str, b.volumeDPath_str), d.volumeButton_do.addListener(FWDUVPVolumeButton.SHOW_TOOLTIP, d.volumeButtonShowTooltipHandler), d.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_OVER, d.volumeOnMouseOverHandler), d.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_UP, d.volumeOnMouseUpHandler), d.volumeButton_do.setY(parseInt((d.stageHeight - d.volumeButton_do.h) / 2)), d.buttons_ar.push(d.volumeButton_do), d.mainHolder_do.addChild(d.volumeButton_do), d.allowToChangeVolume_bl || d.volumeButton_do.disable()
            }, this.volumeButtonShowTooltipHandler = function(a) {}, this.volumeOnMouseOverHandler = function() {
                d.showVolumeScrubber(!0), d.hideQualityButtons(!0), d.isMainScrubberOnTop_bl && FWDAnimation.to(d.mainScrubber_do, .4, {
                    alpha: 0,
                    onComplete: function() {
                        d.mainScrubber_do.setX(-5e3)
                    }
                })
            }, this.volumeOnMouseUpHandler = function() {
                var a = d.lastVolume;
                d.isMute_bl ? (a = d.lastVolume, d.isMute_bl = !1) : (a = 1e-6, d.isMute_bl = !0), d.updateVolume(a)
            }, this.setupVolumeScrubber = function() {
                if (d.volumeScrubberHolder_do = new FWDUVPDisplayObject("div"), d.repeatBackground_bl) d.volumeBk_do = new FWDUVPDisplayObject("div"), d.volumeBk_do.getStyle().background = "url('" + d.controllerBkPath_str + "')";
                else {
                    d.volumeBk_do = new FWDUVPDisplayObject("img");
                    var a = new Image;
                    a.src = d.controllerBkPath_str, d.volumeBk_do.setScreen(a)
                }
                d.volumeScrubberHolder_do.addChild(d.volumeBk_do), d.volumeScrubber_do = new FWDUVPDisplayObject("div"), d.volumeScrubber_do.setHeight(d.mainScrubberHeight), d.volumeScrubber_do.setY(parseInt(d.volumeScrubberOfsetHeight / 2));
                var c = new Image;
                c.src = b.volumeScrubberBkBottomPath_str, d.volumeScrubberBkBottom_do = new FWDUVPDisplayObject("img"), d.volumeScrubberBkBottom_do.setScreen(c), d.volumeScrubberBkBottom_do.setWidth(d.mainScrubberBkLeft_img.height), d.volumeScrubberBkBottom_do.setHeight(d.mainScrubberBkLeft_img.width), d.volumeScrubberBkBottom_do.setY(d.volumeScrubberHeight - d.volumeScrubberOfsetHeight - d.volumeScrubberBkBottom_do.h);
                var e = new Image;
                e.src = b.volumeScrubberBkTopPath_str, d.volumeScrubberBkTop_do = new FWDUVPDisplayObject("img"), d.volumeScrubberBkTop_do.setScreen(e), d.volumeScrubberBkTop_do.setWidth(d.volumeScrubberBkBottom_do.w), d.volumeScrubberBkTop_do.setHeight(d.volumeScrubberBkBottom_do.h);
                var f = new Image;
                f.src = b.volumeScrubberBkMiddlePath_str, d.isMobile_bl ? (d.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("div"), d.volumeScrubberBkMiddle_do.getStyle().background = "url('" + d.volumeScrubberBkMiddlePath_str + "') repeat-x") : (d.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("img"), d.volumeScrubberBkMiddle_do.setScreen(f)), d.volumeScrubberBkMiddle_do.setWidth(d.volumeScrubberBkBottom_do.w), d.volumeScrubberBkMiddle_do.setHeight(d.volumeScrubberHeight - d.volumeScrubberOfsetHeight - 2 * d.volumeScrubberBkTop_do.h), d.volumeScrubberBkMiddle_do.setY(d.volumeScrubberBkTop_do.h), d.volumeScrubberDrag_do = new FWDUVPDisplayObject("div"), d.volumeScrubberDrag_do.setWidth(d.volumeScrubberBkBottom_do.w);
                var g = new Image;
                g.src = b.volumeScrubberDragBottomPath_str, d.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("img"), d.volumeScrubberDragBottom_do.setScreen(g), d.volumeScrubberDragBottom_do.setWidth(d.mainScrubberDragLeft_img.height), d.volumeScrubberDragBottom_do.setHeight(d.mainScrubberDragLeft_img.width), d.volumeScrubberDragBottom_do.setY(d.volumeScrubberHeight - d.volumeScrubberOfsetHeight - d.volumeScrubberDragBottom_do.h), f = new Image, f.src = d.volumeScrubberDragMiddlePath_str, d.isMobile_bl ? (d.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div"), d.volumeScrubberDragMiddle_do.getStyle().background = "url('" + d.volumeScrubberDragMiddlePath_str + "') repeat-x") : (d.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("img"), d.volumeScrubberDragMiddle_do.setScreen(f)), d.volumeScrubberDragMiddle_do.setWidth(d.volumeScrubberDragBottom_do.w), d.volumeScrubberDragMiddle_do.setHeight(d.volumeScrubberHeight);
                var h = new Image;
                h.src = b.volumeScrubberLinePath_str, d.volumeScrubberBarLine_do = new FWDUVPDisplayObject("img"), d.volumeScrubberBarLine_do.setScreen(h), d.volumeScrubberBarLine_do.setWidth(d.mainScrubberLine_img.height), d.volumeScrubberBarLine_do.setHeight(d.mainScrubberLine_img.width), d.volumeScrubberBarLine_do.setAlpha(0), d.volumeScrubberBarLine_do.hasTransform3d_bl = !1, d.volumeScrubberBarLine_do.hasTransform2d_bl = !1, d.volumeScrubberHolder_do.setWidth(d.volumeScrubberWidth), d.volumeScrubberHolder_do.setHeight(d.volumeScrubberHeight + d.stageHeight), d.volumeBk_do.setWidth(d.volumeScrubberWidth), d.volumeBk_do.setHeight(d.volumeScrubberHeight + d.stageHeight), d.volumeScrubber_do.setWidth(d.volumeScrubberWidth), d.volumeScrubber_do.setHeight(d.volumeScrubberHeight - d.volumeScrubberOfsetHeight), d.volumeScrubber_do.addChild(d.volumeScrubberBkBottom_do), d.volumeScrubber_do.addChild(d.volumeScrubberBkMiddle_do), d.volumeScrubber_do.addChild(d.volumeScrubberBkTop_do), d.volumeScrubber_do.addChild(d.volumeScrubberBarLine_do), d.volumeScrubber_do.addChild(d.volumeScrubberDragBottom_do), d.volumeScrubberDrag_do.addChild(d.volumeScrubberDragMiddle_do), d.volumeScrubber_do.addChild(d.volumeScrubberDrag_do), d.volumeScrubber_do.addChild(d.volumeScrubberBarLine_do), d.volumeScrubberHolder_do.addChild(d.volumeScrubber_do), d.addChild(d.volumeScrubberHolder_do), d.allowToChangeVolume_bl && (d.isMobile_bl ? d.hasPointerEvent_bl ? (d.volumeScrubber_do.screen.addEventListener("pointerover", d.volumeScrubberOnOverHandler), d.volumeScrubber_do.screen.addEventListener("pointerout", d.volumeScrubberOnOutHandler), d.volumeScrubber_do.screen.addEventListener("pointerdown", d.volumeScrubberOnDownHandler)) : d.volumeScrubber_do.screen.addEventListener("touchstart", d.volumeScrubberOnDownHandler) : d.screen.addEventListener ? (d.volumeScrubber_do.screen.addEventListener("mouseover", d.volumeScrubberOnOverHandler), d.volumeScrubber_do.screen.addEventListener("mouseout", d.volumeScrubberOnOutHandler), d.volumeScrubber_do.screen.addEventListener("mousedown", d.volumeScrubberOnDownHandler)) : d.screen.attachEvent && (d.volumeScrubber_do.screen.attachEvent("onmouseover", d.volumeScrubberOnOverHandler), d.volumeScrubber_do.screen.attachEvent("onmouseout", d.volumeScrubberOnOutHandler), d.volumeScrubber_do.screen.attachEvent("onmousedown", d.volumeScrubberOnDownHandler))), d.enableVolumeScrubber(), d.updateVolumeScrubber(d.volume)
            }, this.volumeScrubberOnOverHandler = function(a) {
                d.isVolumeScrubberDisabled_bl
            }, this.volumeScrubberOnOutHandler = function(a) {
                d.isVolumeScrubberDisabled_bl
            }, this.volumeScrubberOnDownHandler = function(a) {
                if (!d.isVolumeScrubberDisabled_bl && 2 != a.button) {
                    a.preventDefault && a.preventDefault(), d.volumeScrubberIsDragging_bl = !0;
                    var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                        e = b.screenY - d.volumeScrubber_do.getGlobalY();
                    c.showDisable(), e < 0 ? e = 0 : e > d.volumeScrubber_do.h - d.scrubbersOffsetWidth && (e = d.volumeScrubber_do.h - d.scrubbersOffsetWidth);
                    var f = 1 - e / d.volumeScrubber_do.h;
                    d.lastVolume = f, d.updateVolume(f), d.isMobile_bl ? d.hasPointerEvent_bl ? (window.addEventListener("MSPointerMove", d.volumeScrubberMoveHandler), window.addEventListener("pointerup", d.volumeScrubberEndHandler)) : (window.addEventListener("touchmove", d.volumeScrubberMoveHandler), window.addEventListener("touchend", d.volumeScrubberEndHandler)) : window.addEventListener ? (window.addEventListener("mousemove", d.volumeScrubberMoveHandler), window.addEventListener("mouseup", d.volumeScrubberEndHandler)) : document.attachEvent && (document.attachEvent("onmousemove", d.volumeScrubberMoveHandler), document.attachEvent("onmouseup", d.volumeScrubberEndHandler))
                }
            }, this.volumeScrubberMoveHandler = function(a) {
                if (!d.isVolumeScrubberDisabled_bl) {
                    a.preventDefault && a.preventDefault();
                    var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                        c = b.screenY - d.volumeScrubber_do.getGlobalY();
                    c < d.scrubbersOffsetWidth ? c = d.scrubbersOffsetWidth : c > d.volumeScrubber_do.h && (c = d.volumeScrubber_do.h);
                    var e = 1 - c / d.volumeScrubber_do.h;
                    d.lastVolume = e, d.updateVolume(e)
                }
            }, this.volumeScrubberEndHandler = function() {
                c.hideDisable(), d.volumeScrubberIsDragging_bl = !1, d.isMobile_bl ? d.hasPointerEvent_bl ? (window.removeEventListener("MSPointerMove", d.volumeScrubberMoveHandler), window.removeEventListener("pointerup", d.volumeScrubberEndHandler)) : (window.removeEventListener("touchmove", d.volumeScrubberMoveHandler), window.removeEventListener("touchend", d.volumeScrubberEndHandler)) : window.removeEventListener ? (window.removeEventListener("mousemove", d.volumeScrubberMoveHandler), window.removeEventListener("mouseup", d.volumeScrubberEndHandler)) : document.detachEvent && (document.detachEvent("onmousemove", d.volumeScrubberMoveHandler), document.detachEvent("onmouseup", d.volumeScrubberEndHandler))
            }, this.disableVolumeScrubber = function() {
                d.isVolumeScrubberDisabled_bl = !0, d.volumeScrubber_do.setButtonMode(!1), d.volumeScrubberEndHandler()
            }, this.enableVolumeScrubber = function() {
                d.isVolumeScrubberDisabled_bl = !1, d.volumeScrubber_do.setButtonMode(!0)
            }, this.updateVolumeScrubber = function(a) {
                var b = d.volumeScrubberHeight - d.volumeScrubberOfsetHeight,
                    c = Math.round(a * b);
                d.volumeScrubberDrag_do.setHeight(Math.max(0, c - d.volumeScrubberDragBottom_do.h)), d.volumeScrubberDrag_do.setY(b - c), c < 1 && d.isVolumeScrubberLineVisible_bl ? (d.isVolumeScrubberLineVisible_bl = !1, FWDAnimation.to(d.volumeScrubberBarLine_do, .5, {
                    alpha: 0
                }), FWDAnimation.to(d.volumeScrubberDragBottom_do, .5, {
                    alpha: 0
                })) : c > 1 && !d.isVolumeScrubberLineVisible_bl && (d.isVolumeScrubberLineVisible_bl = !0, FWDAnimation.to(d.volumeScrubberBarLine_do, .5, {
                    alpha: 1
                }), FWDAnimation.to(d.volumeScrubberDragBottom_do, .5, {
                    alpha: 1
                })), c > b && (c = b), FWDAnimation.to(d.volumeScrubberBarLine_do, .8, {
                    y: b - c - 2,
                    ease: Expo.easeOut
                })
            }, this.updateVolume = function(b, c) {
                d.showVolumeScrubber_bl && (d.volume = b, d.volume <= 1e-6 ? (d.isMute_bl = !0,
                    d.volume = 1e-6) : d.voume >= 1 ? (d.isMute_bl = !1, d.volume = 1) : d.isMute_bl = !1, 1e-6 == d.volume ? d.volumeButton_do && d.volumeButton_do.setDisabledState() : d.volumeButton_do && d.volumeButton_do.setEnabledState(), d.volumeScrubberBarLine_do && d.updateVolumeScrubber(d.volume), c || d.dispatchEvent(a.CHANGE_VOLUME, {
                    percent: d.volume
                }))
            }, this.showVolumeScrubber = function(a) {
                if (!d.isVolumeScrubberShowed_bl) {
                    d.isVolumeScrubberShowed_bl = !0;
                    var b = -d.volumeScrubberHolder_do.h + d.h;
                    d.volumeScrubberHolder_do.setVisible(!0), window.addEventListener ? window.addEventListener("mousemove", d.hideVolumeSchubberOnMoveHandler) : document.attachEvent && (document.detachEvent("onmousemove", d.hideVolumeSchubberOnMoveHandler), document.attachEvent("onmousemove", d.hideVolumeSchubberOnMoveHandler)), d.volumeScrubberHolder_do.setX(parseInt(d.volumeButton_do.x + (d.volumeButton_do.w - d.volumeScrubberHolder_do.w) / 2)), a ? FWDAnimation.to(d.volumeScrubberHolder_do, .6, {
                        y: b,
                        ease: Expo.easeInOut
                    }) : (FWDAnimation.killTweensOf(d.volumeScrubberHolder_do), d.volumeScrubberHolder_do.setY(b))
                }
            }, this.hideVolumeSchubberOnMoveHandler = function(a) {
                var b = FWDUVPUtils.getViewportMouseCoordinates(a);
                FWDUVPUtils.hitTest(d.volumeScrubberHolder_do.screen, b.screenX, b.screenY) || FWDUVPUtils.hitTest(d.volumeButton_do.screen, b.screenX, b.screenY) || d.volumeScrubberIsDragging_bl || (d.hideVolumeScrubber(!0), d.isMainScrubberOnTop_bl && (d.mainScrubber_do.setX(0), FWDAnimation.to(d.mainScrubber_do, .6, {
                    alpha: 1
                })))
            }, this.hideVolumeScrubber = function(a) {
                d.isVolumeScrubberShowed_bl && (d.isVolumeScrubberShowed_bl = !1, d.volumeButton_do.setNormalState(!0), a ? FWDAnimation.to(d.volumeScrubberHolder_do, .6, {
                    y: c.stageHeight,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        d.volumeScrubberHolder_do.setVisible(!1)
                    }
                }) : (FWDAnimation.killTweensOf(d.ytbButtonsHolder_do), d.volumeScrubberHolder_do.setY(c.stageHeight), d.volumeScrubberHolder_do.setVisible(!1)), window.removeEventListener ? window.removeEventListener("mousemove", d.hideVolumeSchubberOnMoveHandler) : document.detachEvent && document.detachEvent("onmousemove", d.hideVolumeSchubberOnMoveHandler))
            }, this.show = function(a) {
                d.isShowed_bl || (d.isShowed_bl = !0, d.setX(0), a ? FWDAnimation.to(d.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(d.mainHolder_do), d.mainHolder_do.setY(0)), setTimeout(d.positionButtons, 200))
            }, this.hide = function(a, b) {
                d.isShowed_bl && (b || (b = 0), d.isShowed_bl = !1, a ? FWDAnimation.to(d.mainHolder_do, .8, {
                    y: d.stageHeight + b,
                    ease: Expo.easeInOut,
                    onComplete: function() {
                        b && d.setX(-5e3)
                    }
                }) : (FWDAnimation.killTweensOf(d.mainHolder_do), b && d.setX(-5e3), d.mainHolder_do.setY(d.stageHeight + b)), d.hideQualityButtons(!0))
            }, this.init()
        };
        a.setPrototype = function() {
            a.prototype = new FWDUVPDisplayObject("div")
        }, a.SHOW_SHARE_WINDOW = "showShareWindow", a.SHOW_SUBTITLE = "showSubtitle", a.HIDE_SUBTITLE = "hideSubtitle", a.SHOW_PLAYLIST = "showPlaylist", a.HIDE_PLAYLIST = "hidePlaylist", a.SHOW_CATEGORIES = "showCategories", a.DOWNLOAD_VIDEO = "downloadVideo", a.FULL_SCREEN = "fullScreen", a.NORMAL_SCREEN = "normalScreen", a.PLAY = "play", a.PAUSE = "pause", a.START_TO_SCRUB = "startToScrub", a.SCRUB = "scrub", a.STOP_TO_SCRUB = "stopToScrub", a.CHANGE_VOLUME = "changeVolume", a.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality", a.SHOW_EMBED_WINDOW = "showEmbedWindow", a.SHOW_INFO_WINDOW = "showInfoWindow", a.prototype = null, window.FWDUVPController = a
    }(), function(window) {
        var FWDUVPData = function(props, playListElement, parent) {
            var self = this,
                prototype = FWDUVPData.prototype;
            this.xhr = null, this.ytb = null, this.scs_el = null, this.dumy_img = null, this.mainPreloader_img = null, this.bkLeft_img = null, this.bkMiddle_img = null, this.bkRight_img = null, this.nextN_img = null, this.prevN_img = null, this.playN_img = null, this.pauseN_img = null, this.mainScrubberBkLeft_img = null, this.mainScrubberDragLeft_img = null, this.mainScrubberLine_img = null, this.volumeScrubberBkLeft_img = null, this.volumeScrubberDragLeft_img = null, this.volumeScrubberLine_img = null, this.volumeN_img = null, this.progressLeft_img = null, this.largePlayN_img = null, this.categoriesN_img = null, this.replayN_img = null, this.shuffleN_img = null, this.fullScreenN_img = null, this.ytbQualityN_img = null, this.ytbQualityD_img = null, this.facebookN_img = null, this.infoN_img = null, this.downloadN_img = null, this.normalScreenN_img = null, this.catNextN_img = null, this.catPrevN_img = null, this.catPrevD_img = null, this.hidePlaylistN_img = null, this.showPlaylistN_img = null, this.prevThumbsSetN_img = null, this.nextThumbsSetN_img = null, this.embedN_img = null, this.embedColoseN_img = null, this.scrLinesN_img = null, this.scrDragTop_img = null, this.scrLinesN_img = null, this.prevSPath_str = null, this.nextSPath_str = null, this.props_obj = props, this.skinPaths_ar = [], this.images_ar = [], this.cats_ar = [], this.catsRef_ar = [], this.youtubeObject_ar = null, this.skinPath_str = null, this.flashPath_str = null, this.flashCopyToCBPath_str = null, this.proxyPath_str = null, this.proxyFolderPath_str = null, this.mailPath_str = null, this.sendToAFriendPath_str = null, this.videoDownloaderPath_str = null, this.mainFolderPath_str = null, this.bkMiddlePath_str = null, this.hdPath_str = null, this.youtubeQualityArrowPath_str = null, this.mainScrubberBkMiddlePath_str = null, this.volumeScrubberBkMiddlePath_str = null, this.mainScrubberDragMiddlePath_str = null, this.volumeScrubberDragMiddlePath_str = null, this.timeColor_str = null, this.playlistPosition_str = null, this.progressMiddlePath_str = null, this.facebookAppId_str = null, this.ytbQualityButtonPointerPath_str = null, this.youtubeQualityButtonNormalColor_str = null, this.youtubeQualityButtonSelectedColor_str = null, this.controllerBkPath_str = null, this.logoPosition_str = null, this.logoPath_str = null, this.pauseSPath_str = null, this.playSPath_str = null, this.volumeSPath_str = null, this.volumeDPath_str = null, this.categoriesSPath_str = null, this.replaySPath_str = null, this.toopTipBk_str = null, this.toolTipsButtonFontColor_str = null, this.toopTipPointer_str = null, this.hidePlaylistSPath_str = null, this.showPlaylistSPath_str = null, this.prevThumbsSetSPath_str = null, this.nextThumbsSetSPath_str = null, this.playlistThumbnailsBackgroundPath_str = null, this.playlistToolTipPointerPath_str = null, this.playlistToolTipBackgroundPath_str = null, this.folderVideoLabel_str = null, this.embedPathS_str = null, this.embedCopyButtonNPath_str = null, this.embedWindowPathS_str = null, this.embedCopyButtonSPath_str = null, this.embedWindowBackground_str = null, this.sendButtonNPath_str = null, this.sendButtonSPath_str = null, this.shareAndEmbedTextColor_str = null, this.searchInputBackgroundColor_str = null, this.borderColor_str = null, this.searchInputColor_str = null, this.secondaryLabelsColor_str = null, this.mainLabelsColor_str = null, this.controllerHeight = 0, this.countLoadedSkinImages = 0, this.volume = 1, this.controllerHideDelay = 0, this.startSpaceBetweenButtons = 0, this.spaceBetweenButtons = 0, this.scrubbersOffsetWidth = 0, this.volumeScrubberOffsetTopWidth = 0, this.timeOffsetLeftWidth = 0, this.timeOffsetTop = 0, this.logoMargins = 0, this.startAtPlaylist = 0, this.startAtVideo = 0, this.playlistBottomHeight = 0, this.maxPlaylistItems = 0, this.totalPlaylists = 0, this.thumbnailMaxWidth = 0, this.buttonsMargins = 0, this.nextAndPrevSetButtonsMargins = 0, this.thumbnailMaxHeight = 0, this.horizontalSpaceBetweenThumbnails = 0, this.verticalSpaceBetweenThumbnails = 0, this.buttonsToolTipHideDelay = 0, this.thumbnailWidth = 0, this.thumbnailHeight = 0, this.timeOffsetTop = 0, this.embedWindowCloseButtonMargins = 0, this.loadImageId_to, this.dispatchLoadSkinCompleteWithDelayId_to, this.dispatchPlaylistLoadCompleteWidthDelayId_to, this.JSONPRequestTimeoutId_to, this.isYoutbe_bl = !1, this.showPlaylistsButtonAndPlaylists_bl = !1, this.showEmbedButton_bl = !1, this.showPlaylistButtonAndPlaylist_bl = !1, this.showPlaylistByDefault_bl = !1, this.showSearchInput_bl = !1, this.forceDisableDownloadButtonForFolder_bl = !1, this.allowToChangeVolume_bl = !0, this.showContextMenu_bl = !1, this.showButtonsToolTip_bl = !1, this.addMouseWheelSupport_bl = !1, this.addKeyboardSupport_bl = !1, this.autoPlay_bl = !1, this.showPoster_bl = !1, this.loop_bl = !1, this.shuffle_bl = !1, this.showLoopButton_bl = !1, this.showDownloadVideoButton_bl = !1, this.showInfoButton_bl = !1, this.showVolumeScrubber_bl = !1, this.showVolumeButton_bl = !1, this.showControllerWhenVideoIsStopped_bl = !1, this.showNextAndPrevButtonsInController_bl = !1, this.showLogo_bl = !1, this.hideLogoWithController_bl = !1, this.isPlaylistDispatchingError_bl = !1, this.useYoutube_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, self.init = function() {
                self.parseProperties()
            }, self.parseProperties = function(a) {
                if (self.categoriesId_str = self.props_obj.playlistsId, !self.categoriesId_str) return void setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>playlistsId</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                if (self.mainFolderPath_str = self.props_obj.mainFolderPath, !self.mainFolderPath_str) return void setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>mainFolderPath</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                if (self.mainFolderPath_str.lastIndexOf("/") + 1 != self.mainFolderPath_str.length && (self.mainFolderPath_str += "/"), self.skinPath_str = self.props_obj.skinPath, !self.skinPath_str) return void setTimeout(function() {
                    null != self && (errorMessage_str = "The <font color='#ff0000'>skinPath</font> property is not defined in the constructor function!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                if (self.skinPath_str.lastIndexOf("/") + 1 != self.skinPath_str.length && (self.skinPath_str += "/"), self.skinPath_str = self.mainFolderPath_str + self.skinPath_str, self.flashPath_str = self.mainFolderPath_str + "swf.swf", self.flashCopyToCBPath_str = self.mainFolderPath_str + "cb.swf", self.proxyPath_str = self.mainFolderPath_str + "proxy.php", self.proxyFolderPath_str = self.mainFolderPath_str + "proxyFolder.php", self.mailPath_str = self.mainFolderPath_str + "sendMail.php", self.sendToAFriendPath_str = self.mainFolderPath_str + "sendMailToAFriend.php", self.videoDownloaderPath_str = self.mainFolderPath_str + "downloader.php", self.categories_el = document.getElementById(self.categoriesId_str), !self.categories_el) return void setTimeout(function() {
                    null != self && (errorMessage_str = "The playlist with the id <font color='#ff0000'>" + self.categoriesId_str + "</font> is not found!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                var b = FWDUVPUtils.getChildren(self.categories_el);
                if (self.totalCats = b.length, 0 == self.totalCats) return void setTimeout(function() {
                    null != self && (errorMessage_str = "At least one playlist is required!", self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: errorMessage_str
                    }))
                }, 50);
                for (var c = 0; c < self.totalCats; c++) {
                    var d = {},
                        e = null;
                    if (child = b[c], !FWDUVPUtils.hasAttribute(child, "data-source")) return void setTimeout(function() {
                        null != self && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#ff0000'>data-source</font> is required in the plalists html element at position <font color='#ff0000'>" + (c + 1)
                        })
                    }, 50);
                    if (!FWDUVPUtils.hasAttribute(child, "data-thumbnail-path")) return void setTimeout(function() {
                        null != self && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Attribute <font color='#ff0000'>data-thumbnail-path</font> is required in the playlists html element at position <font color='#ff0000'>" + (c + 1)
                        })
                    }, 50);
                    d.source = FWDUVPUtils.getAttributeValue(child, "data-source"), e = d.source.indexOf("=") == -1 && d.source.indexOf(".xml") == -1 ? document.getElementById(d.source) : d.source, self.catsRef_ar.push(e), d.thumbnailPath = FWDUVPUtils.getAttributeValue(child, "data-thumbnail-path"), d.htmlContent = child.innerHTML, FWDUVPUtils.hasAttribute(child, "data-playlist-name") ? d.playlistName = FWDUVPUtils.getAttributeValue(child, "data-playlist-name") : d.playlistName = "not defined!", self.cats_ar[c] = d
                }
                for (var c = 0; c < self.totalCats; c++) {
                    var d = {},
                        e = null;
                    child = b[c], e = document.getElementById(FWDUVPUtils.getAttributeValue(child, "data-source"));
                    try {
                        e.parentNode.removeChild(e)
                    } catch (a) {}
                }
                try {
                    self.categories_el.parentNode.removeChild(self.categories_el)
                } catch (a) {}
                if (self.startAtPlaylist = self.props_obj.startAtPlaylist || 0, isNaN(self.startAtPlaylist) && (self.startAtPlaylist = 0), self.startAtPlaylist < 0 ? self.startAtPlaylist = 0 : self.startAtPlaylist > self.totalCats - 1 && (self.startAtPlaylist = self.totalCats - 1), self.startAtVideo = self.props_obj.startAtVideo || 0, self.playlistBottomHeight = self.props_obj.playlistBottomHeight || 0, self.playlistBottomHeight = Math.min(800, self.playlistBottomHeight), self.videoSourcePath_str = self.props_obj.videoSourcePath || void 0, self.timeColor_str = self.props_obj.timeColor || "#FF0000", self.youtubeQualityButtonNormalColor_str = self.props_obj.youtubeQualityButtonNormalColor || "#FF0000", self.youtubeQualityButtonSelectedColor_str = self.props_obj.youtubeQualityButtonSelectedColor || "#FF0000", self.posterBackgroundColor_str = self.props_obj.posterBackgroundColor || "transparent", self.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist, self.showPlaylistButtonAndPlaylist_bl = "no" != self.showPlaylistButtonAndPlaylist_bl, self.showPlaylistByDefault_bl = self.props_obj.showPlaylistByDefault, self.showPlaylistByDefault_bl = "no" != self.showPlaylistByDefault_bl, self.showPlaylistName_bl = self.props_obj.showPlaylistName, self.showPlaylistName_bl = "no" != self.showPlaylistName_bl, self.showSearchInput_bl = self.props_obj.showSearchInput, self.showSearchInput_bl = "no" != self.showSearchInput_bl, self.showSubtitleByDefault_bl = self.props_obj.showSubtitleByDefault, self.showSubtitleByDefault_bl = "no" != self.showSubtitleByDefault_bl, self.showSubtitleButton_bl = self.props_obj.showSubtitleButton, self.showSubtitleButton_bl = "no" != self.showSubtitleButton_bl, self.forceDisableDownloadButtonForFolder_bl = self.props_obj.forceDisableDownloadButtonForFolder, self.forceDisableDownloadButtonForFolder_bl = "yes" == self.forceDisableDownloadButtonForFolder_bl, self.playlistPosition_str = self.props_obj.playlistPosition || "bottom", test = "bottom" == self.playlistPosition_str || "right" == self.playlistPosition_str, test || (self.playlistPosition_str = "right"), self.folderVideoLabel_str = self.props_obj.folderVideoLabel || "Video ", self.logoPosition_str = self.props_obj.logoPosition || "topleft", self.logoPosition_str = String(self.logoPosition_str).toLowerCase(), test = "topleft" == self.logoPosition_str || "topright" == self.logoPosition_str || "bottomleft" == self.logoPosition_str || "bottomright" == self.logoPosition_str, test || (self.logoPosition_str = "topleft"), self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity", "blackAndWhite" != self.thumbnailSelectedType_str && "threshold" != self.thumbnailSelectedType_str && "opacity" != self.thumbnailSelectedType_str && (self.thumbnailSelectedType_str = "opacity"), (self.isMobile_bl || FWDUVPUtils.isIEAndLessThen9) && (self.thumbnailSelectedType_str = "opacity"), "file:" == document.location.protocol && (self.thumbnailSelectedType_str = "opacity"), self.adsButtonsPosition_str = self.props_obj.adsButtonsPosition || "left", self.adsButtonsPosition_str = String(self.adsButtonsPosition_str).toLowerCase(), test = "left" == self.adsButtonsPosition_str || "right" == self.adsButtonsPosition_str, test || (self.adsButtonsPosition_str = "left"), self.skipToVideoButtonText_str = self.props_obj.skipToVideoButtonText || "not defined", self.skipToVideoText_str = self.props_obj.skipToVideoText, self.adsTextNormalColor = self.props_obj.adsTextNormalColor || "#FF0000", self.adsTextSelectedColor = self.props_obj.adsTextSelectedColor || "#FF0000", self.adsBorderNormalColor_str = self.props_obj.adsBorderNormalColor || "#FF0000", self.adsBorderSelectedColor_str = self.props_obj.adsBorderSelectedColor || "#FF0000", self.volume = self.props_obj.volume, void 0 == self.volume && (self.volume = 1), isNaN(self.volume) && (volume = 1), self.volume > 1 || self.isMobile_bl ? self.volume = 1 : self.volume < 0 && (self.volume = 0), self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer", test = "developer" == self.rightClickContextMenu_str || "disabled" == self.rightClickContextMenu_str || "default" == self.rightClickContextMenu_str, test || (self.rightClickContextMenu_str = "developer"), self.buttonsToolTipFontColor_str = self.props_obj.buttonsToolTipFontColor || "#FF0000", self.toolTipsButtonFontColor_str = self.props_obj.toolTipsButtonFontColor || "#FF0000", self.shareAndEmbedTextColor_str = self.props_obj.shareAndEmbedTextColor || "#FF0000", self.inputBackgroundColor_str = self.props_obj.inputBackgroundColor || "#FF0000", self.inputColor_str = self.props_obj.inputColor || "#FF0000", self.searchInputBackgroundColor_str = self.props_obj.searchInputBackgroundColor || "#FF0000", self.borderColor_str = self.props_obj.borderColor || "#FF0000", self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000", self.youtubeAndFolderVideoTitleColor_str = self.props_obj.youtubeAndFolderVideoTitleColor || "#FF0000", self.youtubeDescriptionColor_str = self.props_obj.youtubeDescriptionColor || "#FF0000", self.youtubeOwnerColor_str = self.props_obj.youtubeOwnerColor || "#FF0000", self.secondaryLabelsColor_str = self.props_obj.secondaryLabelsColor || "#FF0000", self.mainLabelsColor_str = self.props_obj.mainLabelsColor || "#FF0000", self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "#FF0000", self.thumbnailNormalBackgroundColor_str = self.props_obj.thumbnailNormalBackgroundColor || "#FF0000", self.playlistNameColor_str = self.props_obj.playlistNameColor || "#FF0000", self.thumbnailHoverBackgroundColor_str = self.props_obj.thumbnailHoverBackgroundColor || "#FF0000", self.thumbnailDisabledBackgroundColor_str = self.props_obj.thumbnailDisabledBackgroundColor || "#FF0000", self.logoLink_str = self.props_obj.logoLink || "none", self.nextAndPrevSetButtonsMargins = self.props_obj.nextAndPrevSetButtonsMargins || 0, self.buttonsMargins = self.props_obj.buttonsMargins || 0, self.thumbnailMaxWidth = self.props_obj.thumbnailMaxWidth || 330, self.thumbnailMaxHeight = self.props_obj.thumbnailMaxHeight || 330, self.horizontalSpaceBetweenThumbnails = self.props_obj.horizontalSpaceBetweenThumbnails, self.verticalSpaceBetweenThumbnails = self.props_obj.verticalSpaceBetweenThumbnails, self.totalPlaylists = self.cats_ar.length, self.controllerHeight = self.props_obj.controllerHeight || 50, self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0, self.controllerHideDelay = self.props_obj.controllerHideDelay || 2, self.controllerHideDelay *= 1e3, self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0, self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0, self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0, self.volumeScrubberOffsetTopWidth = self.props_obj.volumeScrubberOffsetTopWidth || 0, self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0, self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0, self.timeOffsetTop = self.props_obj.timeOffsetTop || 0, self.embedWindowCloseButtonMargins = self.props_obj.embedAndInfoWindowCloseButtonMargins || 0, self.logoMargins = self.props_obj.logoMargins || 0, self.maxPlaylistItems = self.props_obj.maxPlaylistItems || 50, self.volumeScrubberHeight = self.props_obj.volumeScrubberHeight || 10, self.volumeScrubberOfsetHeight = self.props_obj.volumeScrubberOfsetHeight || 0, self.volumeScrubberHeight > 200 && (self.volumeScrubberHeight = 200), self.buttonsToolTipHideDelay = self.props_obj.buttonsToolTipHideDelay || 1.5, self.thumbnailWidth = self.props_obj.thumbnailWidth || 80, self.thumbnailWidth = Math.min(150, self.thumbnailWidth), self.thumbnailHeight = self.props_obj.thumbnailHeight || 80, self.spaceBetweenThumbnails = self.props_obj.spaceBetweenThumbnails || 0, self.thumbnailHeight = Math.min(150, self.thumbnailHeight), self.timeOffsetTop = self.props_obj.timeOffsetTop || 0, self.scrollbarOffestWidth = self.props_obj.scrollbarOffestWidth || 0, self.scollbarSpeedSensitivity = self.props_obj.scollbarSpeedSensitivity || .5, self.facebookAppId_str = self.props_obj.facebookAppId, self.isMobile_bl && (self.allowToChangeVolume_bl = !1), self.showContextMenu_bl = self.props_obj.showContextMenu, self.showContextMenu_bl = "no" != self.showContextMenu_bl, self.showController_bl = self.props_obj.showController, self.showController_bl = "no" != self.showController_bl, self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTips, self.showButtonsToolTip_bl = "no" != self.showButtonsToolTip_bl, self.isMobile_bl && (self.showButtonsToolTip_bl = !1), self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTip, self.showButtonsToolTip_bl = "no" != self.showButtonsToolTip_bl, self.isMobile_bl && (self.showButtonsToolTip_bl = !1), self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport, self.addKeyboardSupport_bl = "no" != self.addKeyboardSupport_bl, self.addMouseWheelSupport_bl = self.props_obj.addMouseWheelSupport, self.addMouseWheelSupport_bl = "no" != self.addMouseWheelSupport_bl, self.autoPlay_bl = self.props_obj.autoPlay, self.autoPlay_bl = "yes" == self.autoPlay_bl, FWDUVPUtils.isMobile && (self.autoPlay_bl = !1), self.showNextAndPrevButtons_bl = self.props_obj.showNextAndPrevButtons, self.showNextAndPrevButtons_bl = "no" != self.showNextAndPrevButtons_bl, self.showPlaylistsButtonAndPlaylists_bl = self.props_obj.showPlaylistsButtonAndPlaylists, self.showPlaylistsButtonAndPlaylists_bl = "no" != self.showPlaylistsButtonAndPlaylists_bl, self.showEmbedButton_bl = self.props_obj.showEmbedButton, self.showEmbedButton_bl = "no" != self.showEmbedButton_bl, self.showPlaylistsByDefault_bl = self.props_obj.showPlaylistsByDefault, self.showPlaylistsByDefault_bl = "yes" == self.showPlaylistsByDefault_bl, self.loop_bl = self.props_obj.loop, self.loop_bl = "yes" == self.loop_bl, self.shuffle_bl = self.props_obj.shuffle, self.shuffle_bl = "yes" == self.shuffle_bl, self.showLoopButton_bl = self.props_obj.showLoopButton, self.showLoopButton_bl = "no" != self.props_obj.showLoopButton, self.showShuffleButton_bl = self.props_obj.showShuffleButton, self.showShuffleButton_bl = "no" != self.props_obj.showShuffleButton, self.showDownloadVideoButton_bl = self.props_obj.showDownloadButton, self.showDownloadVideoButton_bl = "no" != self.showDownloadVideoButton_bl, self.showInfoButton_bl = self.props_obj.showInfoButton, self.showInfoButton_bl = "no" != self.showInfoButton_bl, self.showLogo_bl = self.props_obj.showLogo, self.showLogo_bl = "yes" == self.showLogo_bl, self.hideLogoWithController_bl = self.props_obj.hideLogoWithController, self.hideLogoWithController_bl = "yes" == self.hideLogoWithController_bl, self.showPoster_bl = self.props_obj.showPoster, self.showPoster_bl = "yes" == self.showPoster_bl, self.showVolumeButton_bl = self.props_obj.showVolumeButton, self.showVolumeButton_bl = "no" != self.showVolumeButton_bl, self.isMobile_bl && (self.showVolumeButton_bl = !1), self.showVolumeScrubber_bl = self.showVolumeButton_bl, self.showControllerWhenVideoIsStopped_bl = self.props_obj.showControllerWhenVideoIsStopped, self.showControllerWhenVideoIsStopped_bl = "yes" == self.showControllerWhenVideoIsStopped_bl, self.showNextAndPrevButtonsInController_bl = self.props_obj.showNextAndPrevButtonsInController, self.showNextAndPrevButtonsInController_bl = "yes" == self.showNextAndPrevButtonsInController_bl, self.showTime_bl = self.props_obj.showTime, self.showTime_bl = "no" != self.showTime_bl, self.showPopupAdsCloseButton_bl = self.props_obj.showPopupAdsCloseButton, self.showPopupAdsCloseButton_bl = "no" != self.showPopupAdsCloseButton_bl, self.showFullScreenButton_bl = self.props_obj.showFullScreenButton, self.showFullScreenButton_bl = "no" != self.showFullScreenButton_bl, self.disableVideoScrubber_bl = self.props_obj.disableVideoScrubber, self.disableVideoScrubber_bl = "yes" == self.disableVideoScrubber_bl, self.showFullScreenButton_bl = self.props_obj.showFullScreenButton, self.showFullScreenButton_bl = "no" != self.showFullScreenButton_bl, self.repeatBackground_bl = self.props_obj.repeatBackground, self.repeatBackground_bl = "no" != self.repeatBackground_bl, self.showShareButton_bl = self.props_obj.showShareButton, self.showShareButton_bl = "no" != self.showShareButton_bl, self.openNewPageAtTheEndOfTheAds_bl = self.props_obj.openNewPageAtTheEndOfTheAds, self.openNewPageAtTheEndOfTheAds_bl = "yes" == self.openNewPageAtTheEndOfTheAds_bl, self.playAdsOnlyOnce_bl = self.props_obj.playAdsOnlyOnce, self.playAdsOnlyOnce_bl = "yes" == self.playAdsOnlyOnce_bl, self.startAtRandomVideo_bl = self.props_obj.startAtRandomVideo, self.startAtRandomVideo_bl = "yes" == self.startAtRandomVideo_bl, self.stopVideoWhenPlayComplete_bl = self.props_obj.stopVideoWhenPlayComplete, self.stopVideoWhenPlayComplete_bl = "yes" == self.stopVideoWhenPlayComplete_bl, self.showYoutubeQualityButton_bl = self.props_obj.showYoutubeQualityButton, self.showYoutubeQualityButton_bl = "no" != self.showYoutubeQualityButton_bl, ("no" == FWDUVPlayer.useYoutube || self.isMobile_bl) && (self.showYoutubeQualityButton_bl = !1), self.logoPath_str = self.skinPath_str + "logo.png", self.props_obj.logoPath && (self.logoPath_str = self.props_obj.logoPath), self.mainPreloader_img = new Image, self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler, self.mainPreloader_img.onload = self.onPreloaderLoadHandler, self.mainPreloader_img.src = self.skinPath_str + "preloader.png", self.skinPaths_ar = [{
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
                        img: self.shareN_img = new Image,
                        src: self.skinPath_str + "share.png"
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
                    }, {
                        img: self.showSubtitleNPath_img = new Image,
                        src: self.skinPath_str + "show-subtitle-icon.png"
                    }, {
                        img: self.hideSubtitleNPath_img = new Image,
                        src: self.skinPath_str + "hide-subtitle-icon.png"
                    }], self.showShareButton_bl && (self.skinPaths_ar.push({
                        img: self.shareClooseN_img = new Image,
                        src: self.skinPath_str + "embed-close-button.png"
                    }, {
                        img: self.facebookN_img = new Image,
                        src: self.skinPath_str + "facebook.png"
                    }, {
                        img: self.googleN_img = new Image,
                        src: self.skinPath_str + "google-plus.png"
                    }, {
                        img: self.twitterN_img = new Image,
                        src: self.skinPath_str + "twitter.png"
                    }, {
                        img: self.likedInkN_img = new Image,
                        src: self.skinPath_str + "likedin.png"
                    }, {
                        img: self.bufferkN_img = new Image,
                        src: self.skinPath_str + "buffer.png"
                    }, {
                        img: self.diggN_img = new Image,
                        src: self.skinPath_str + "digg.png"
                    }, {
                        img: self.redditN_img = new Image,
                        src: self.skinPath_str + "reddit.png"
                    }, {
                        img: self.thumbrlN_img = new Image,
                        src: self.skinPath_str + "thumbrl.png"
                    }), self.facebookSPath_str = self.skinPath_str + "facebook-over.png", self.googleSPath_str = self.skinPath_str + "google-plus-over.png", self.twitterSPath_str = self.skinPath_str + "twitter-over.png", self.likedInSPath_str = self.skinPath_str + "likedin-over.png", self.bufferSPath_str = self.skinPath_str + "buffer-over.png", self.diggSPath_str = self.skinPath_str + "digg-over.png", self.redditSPath_str = self.skinPath_str + "reddit-over.png", self.thumbrlSPath_str = self.skinPath_str + "thumbrl-over.png"), self.prevSPath_str = self.skinPath_str + "prev-video-over.png", self.nextSPath_str = self.skinPath_str + "next-video-over.png", self.playSPath_str = self.skinPath_str + "play-over.png", self.pauseSPath_str = self.skinPath_str + "pause-over.png", self.bkMiddlePath_str = self.skinPath_str + "controller-middle.png", self.hdPath_str = self.skinPath_str + "hd.png", self.youtubeQualityArrowPath_str = self.skinPath_str + "youtube-quality-arrow.png", self.ytbQualityButtonPointerPath_str = self.skinPath_str + "youtube-quality-pointer.png", self.controllerBkPath_str = self.skinPath_str + "controller-background.png", self.skipIconSPath_str = self.skinPath_str + "skip-icon-over.png", self.adsBackgroundPath_str = self.skinPath_str + "ads-background.png", self.shareSPath_str = self.skinPath_str + "share-over.png", self.mainScrubberBkRightPath_str = self.skinPath_str + "scrubber-right-background.png", self.mainScrubberBkMiddlePath_str = self.skinPath_str + "scrubber-middle-background.png", self.mainScrubberDragMiddlePath_str = self.skinPath_str + "scrubber-middle-drag.png", self.volumeScrubberBkBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-background.png", self.volumeScrubberBkMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-background.png", self.volumeScrubberBkTopPath_str = self.skinPath_str + "volume-scrubber-top-background.png", self.volumeScrubberDragBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-drag.png", self.volumeScrubberLinePath_str = self.skinPath_str + "volume-scrubber-line.png", self.volumeScrubberDragMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-drag.png", self.volumeSPath_str = self.skinPath_str + "volume-over.png", self.volumeDPath_str = self.skinPath_str + "volume-disabled.png", self.categoriesSPath_str = self.skinPath_str + "categories-button-over.png", self.replaySPath_str = self.skinPath_str + "replay-button-over.png", self.toopTipBk_str = self.skinPath_str + "tooltip-background.png", self.toopTipPointer_str = self.skinPath_str + "tooltip-pointer.png", self.shufflePathS_str = self.skinPath_str + "shuffle-button-over.png", self.largePlayS_str = self.skinPath_str + "large-play-over.png", self.fullScreenSPath_str = self.skinPath_str + "full-screen-over.png", self.ytbQualitySPath_str = self.skinPath_str + "youtube-quality-over.png", self.ytbQualityDPath_str = self.skinPath_str + "youtube-quality-hd.png", self.facebookSPath_str = self.skinPath_str + "facebook-over.png", self.infoSPath_str = self.skinPath_str + "info-button-over.png", self.downloadSPath_str = self.skinPath_str + "download-button-over.png", self.normalScreenSPath_str = self.skinPath_str + "normal-screen-over.png", self.progressMiddlePath_str = self.skinPath_str + "progress-middle.png", self.embedPathS_str = self.skinPath_str + "embed-over.png", self.embedWindowClosePathS_str = self.skinPath_str + "embed-close-button-over.png", self.embedWindowInputBackgroundPath_str = self.skinPath_str + "embed-window-input-background.png", self.embedCopyButtonNPath_str = self.skinPath_str + "embed-copy-button.png", self.embedCopyButtonSPath_str = self.skinPath_str + "embed-copy-button-over.png", self.sendButtonNPath_str = self.skinPath_str + "send-button.png", self.sendButtonSPath_str = self.skinPath_str + "send-button-over.png", self.embedWindowBackground_str = self.skinPath_str + "embed-window-background.png", self.showSubtitleSPath_str = self.skinPath_str + "show-subtitle-icon-over.png", self.hideSubtitleSPath_str = self.skinPath_str + "hide-subtitle-icon-over.png", self.showPlaylistsButtonAndPlaylists_bl && (self.skinPaths_ar.push({
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
                    }), self.catBkPath_str = self.skinPath_str + "categories-background.png", self.catThumbBkPath_str = self.skinPath_str + "categories-thumbnail-background.png", self.catThumbBkTextPath_str = self.skinPath_str + "categories-thumbnail-text-backgorund.png", self.catNextSPath_str = self.skinPath_str + "categories-next-button-over.png", self.catPrevSPath_str = self.skinPath_str + "categories-prev-button-over.png", self.catCloseSPath_str = self.skinPath_str + "categories-close-button-over.png"), self.popupAddCloseNPath_str = self.skinPath_str + "close-button-normal.png", self.popupAddCloseSPath_str = self.skinPath_str + "close-button-selected.png", self.showPlaylistButtonAndPlaylist_bl) {
                    self.playlistThumbnailsBkPath_str = self.skinPath_str + "playlist-thumbnail-background.png", self.playlistBkPath_str = self.skinPath_str + "playlist-background.png",
                        "bottom" == self.playlistPosition_str ? (self.skinPaths_ar.push({
                            img: self.hidePlaylistN_img = new Image,
                            src: self.skinPath_str + "hide-horizontal-playlist.png"
                        }, {
                            img: self.showPlaylistN_img = new Image,
                            src: self.skinPath_str + "show-horizontal-playlist.png"
                        }), self.hidePlaylistSPath_str = self.skinPath_str + "hide-horizontal-playlist-over.png", self.showPlaylistSPath_str = self.skinPath_str + "show-horizontal-playlist-over.png") : (self.skinPaths_ar.push({
                            img: self.hidePlaylistN_img = new Image,
                            src: self.skinPath_str + "hide-vertical-playlist.png"
                        }, {
                            img: self.showPlaylistN_img = new Image,
                            src: self.skinPath_str + "show-vertical-playlist.png"
                        }), self.hidePlaylistSPath_str = self.skinPath_str + "hide-vertical-playlist-over.png", self.showPlaylistSPath_str = self.skinPath_str + "show-vertical-playlist-over.png"), self.skinPaths_ar.push({
                            img: self.scrBkTop_img = new Image,
                            src: self.skinPath_str + "playlist-scrollbar-background-top.png"
                        }, {
                            img: self.scrDragTop_img = new Image,
                            src: self.skinPath_str + "playlist-scrollbar-drag-top.png"
                        }, {
                            img: self.scrLinesN_img = new Image,
                            src: self.skinPath_str + "playlist-scrollbar-lines.png"
                        }), self.scrBkMiddlePath_str = self.skinPath_str + "playlist-scrollbar-background-middle.png", self.scrBkBottomPath_str = self.skinPath_str + "playlist-scrollbar-background-bottom.png", self.scrDragMiddlePath_str = self.skinPath_str + "playlist-scrollbar-drag-middle.png", self.scrDragBottomPath_str = self.skinPath_str + "playlist-scrollbar-drag-bottom.png", self.scrLinesSPath_str = self.skinPath_str + "playlist-scrollbar-lines-over.png", self.inputArrowPath_str = self.skinPath_str + "input-arrow.png"
                }
                self.totalGraphics = self.skinPaths_ar.length, self.loadSkin()
            }, this.onPreloaderLoadHandler = function() {
                setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.PRELOADER_LOAD_DONE)
                }, 50)
            }, self.loadSkin = function() {
                for (var a, b, c = 0; c < self.totalGraphics; c++) a = self.skinPaths_ar[c].img, b = self.skinPaths_ar[c].src, a.onload = self.onSkinLoadHandler, a.onerror = self.onSkinLoadErrorHandler, a.src = b
            }, this.onSkinLoadHandler = function(a) {
                self.countLoadedSkinImages++, self.countLoadedSkinImages == self.totalGraphics && setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.SKIN_LOAD_COMPLETE)
                }, 50)
            }, self.onSkinLoadErrorHandler = function(a) {
                FWDUVPUtils.isIEAndLessThen9 ? message = "Graphics image not found!" : message = "The skin icon with label <font color='#ff0000'>" + a.target.src + "</font> can't be loaded, check path!", window.console && console.log(a);
                var b = {
                    text: message
                };
                setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, b)
                }, 50)
            }, this.downloadVideo = function(a, b) {
                if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Downloading video files local is not allowed or possible! To function properly please test online."
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                if (!a) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Not allowed to download this video!"
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                if (String(a.indexOf(".mp4")) == -1) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Only mp4 video files hosted on your server can be downloaded."
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50));
                if (b = b.replace(/[^A-Z0-9\-\_\.]+/gi, "_"), b.length > 40 && (b = b.substr(0, 40) + "..."), /\.(video)$/i.test(b) || (b += ".mp4"), a.indexOf("http:") == -1) {
                    var c = a.split(",");
                    a = c[0], a = a.substr(a.indexOf("/") + 1), a = encodeURIComponent(a)
                }
                var d = self.videoDownloaderPath_str;
                if (self.dlIframe || (self.dlIframe = document.createElement("IFRAME"), self.dlIframe.style.display = "none", document.documentElement.appendChild(self.dlIframe)), self.isMobile_bl) {
                    var e = self.getValidEmail();
                    if (!e) return;
                    if (null != self.emailXHR) {
                        try {
                            self.emailXHR.abort()
                        } catch (a) {}
                        self.emailXHR.onreadystatechange = null, self.emailXHR.onerror = null, self.emailXHR = null
                    }
                    return self.emailXHR = new XMLHttpRequest, self.emailXHR.onreadystatechange = function(a) {
                        4 == self.emailXHR.readyState && (200 == self.emailXHR.status ? "sent" == self.emailXHR.responseText ? alert("Email sent.") : alert("Error sending email, this is a server side error, the php file can't send the email!") : alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText))
                    }, self.emailXHR.onerror = function(a) {
                        try {
                            window.console && console.log(a), window.console && console.log(a.message)
                        } catch (a) {}
                        alert("Error sending email: " + a.message)
                    }, self.emailXHR.open("get", self.mailPath_str + "?mail=" + e + "&name=" + b + "&path=" + a, !0), void self.emailXHR.send()
                }
                self.dlIframe.src = d + "?path=" + a + "&name=" + b
            }, this.getValidEmail = function() {
                for (var a = prompt("Please enter your email address where the video download link will be sent:"), b = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; !b.test(a) || "" == a;) {
                    if (null === a) return;
                    a = prompt("Please enter a valid email address:")
                }
                return a
            }, this.loadPlaylist = function(a) {
                if (self.stopToLoadPlaylist(), !self.isPlaylistDispatchingError_bl) {
                    clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
                    var b = self.catsRef_ar[a];
                    if (void 0 === b) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "<font color='#ff0000'>loadPlaylist()</font> - Please specify a DOM playlist id or youtube playlist id!"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (null === b) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "The playlist with id <font color='#ff0000'>" + self.cats_ar[a].source + "</font> is not found in the DOM."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (!isNaN(b)) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "<font color='#ff0000'>loadPlaylist()</font> - The parameter must be of type string!"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    if (self.resetYoutubePlaylistLoader(), self.isYoutbe_bl = !1, b.length)
                        if (b.indexOf("list=") != -1 && self.useYoutube_bl) self.isYoutbe_bl = !0, self.loadYoutubePlaylist(b);
                        else {
                            if (b.indexOf("list=") != -1 && !self.useYoutube_bl) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                    text: "Loading youtube playlist is only possible by setting <font color='#ff0000'>useYoutube=\"yes\"</font>."
                                }), self.isPlaylistDispatchingError_bl = !1
                            }, 50));
                            b.indexOf("folder=") != -1 ? self.loadFolderPlaylist(b) : b.indexOf(".xml") == -1 && b.indexOf("http:") == -1 && b.indexOf("https:") == -1 && b.indexOf("www.") == -1 || self.loadXMLPlaylist(b)
                        } else self.parseDOMPlaylist(b, self.cats_ar[a].source)
                }
            }, this.loadXMLPlaylist = function(a) {
                if (!self.isPlaylistDispatchingError_bl) {
                    if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Loading XML files local is not allowed or possible!. To function properly please test online."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    self.loadFromFolder_bl = !1, self.sourceURL_str = a, self.xhr = new XMLHttpRequest, self.xhr.onreadystatechange = self.ajaxOnLoadHandler, self.xhr.onerror = self.ajaxOnErrorHandler;
                    try {
                        self.xhr.open("get", self.proxyPath_str + "?url=" + self.sourceURL_str + "&rand=" + parseInt(99999999 * Math.random()), !0), self.xhr.send()
                    } catch (a) {
                        var b = a;
                        a && a.message && (b = a.message), self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "XML file can't be loaded! <font color='#ff0000'>" + self.sourceURL_str + "</font>. " + b
                        })
                    }
                }
            }, this.loadFolderPlaylist = function(a) {
                if (!self.isPlaylistDispatchingError_bl) {
                    if ("file:" == document.location.protocol) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Creating a video playlist from a folder is not allowed or possible local! To function properly please test online."
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    self.loadFromFolder_bl = !0, self.sourceURL_str = a.substr(a.indexOf("=") + 1), self.xhr = new XMLHttpRequest, self.xhr.onreadystatechange = self.ajaxOnLoadHandler, self.xhr.onerror = self.ajaxOnErrorHandler;
                    try {
                        self.xhr.open("get", self.proxyFolderPath_str + "?dir=" + encodeURIComponent(self.sourceURL_str) + "&videoLabel=" + self.folderVideoLabel_str + "&rand=" + parseInt(9999999 * Math.random()), !0), self.xhr.send()
                    } catch (a) {
                        var b = a;
                        a && a.message && (b = a.message), self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "Folder proxy file path is not found: <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>"
                        })
                    }
                }
            }, this.loadYoutubePlaylist = function(a) {
                if (!self.isPlaylistDispatchingError_bl || self.isYoutbe_bl) {
                    if (self.youtubeUrl_str || (a = a.substr(a.indexOf("=") + 1), self.youtubeUrl_str = a), self.loadFromFolder_bl = !0, self.nextPageToken_str ? self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist" : self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist", null == self.scs_el) try {
                        self.scs_el = document.createElement("script"), self.scs_el.src = self.sourceURL_str, self.scs_el.id = parent.instanceName_str + ".data.parseYoutubePlaylist", document.documentElement.appendChild(self.scs_el)
                    } catch (a) {}
                    self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 6e3)
                }
            }, this.JSONPRequestTimeoutError = function() {
                self.stopToLoadPlaylist(), self.isPlaylistDispatchingError_bl = !0, showLoadPlaylistErrorId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading youtube playlist!<font color='#ff0000'>" + self.youtubeUrl_str + "</font>"
                    }), self.isPlaylistDispatchingError_bl = !1
                }, 50)
            }, this.resetYoutubePlaylistLoader = function() {
                self.isYoutbe_bl = !1, self.youtubeObject_ar = null, self.nextPageToken_str = null, self.youtubeUrl_str = null
            }, this.ajaxOnErrorHandler = function(a) {
                try {
                    window.console && console.log(a), window.console && console.log(a.message)
                } catch (a) {}
                self.loadFromFolder_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"
                }) : self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Error loading file : <font color='#ff0000'>" + self.proxyPath_str + "</font>. Make sure the path is correct"
                })
            }, this.ajaxOnLoadHandler = function(e) {
                var response, isXML = !1;
                if (4 == self.xhr.readyState)
                    if (404 == self.xhr.status) self.loadFromFolder_bl ? self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Folder proxy file path is not found: <font color='#ff0000'>" + self.proxyFolderPath_str + "</font>"
                    }) : self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Proxy file path is not found: <font color='#ff0000'>" + self.proxyPath_str + "</font>"
                    });
                    else if (408 == self.xhr.status) self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "Proxy file request load timeout!"
                });
                else if (200 == self.xhr.status) {
                    if (self.xhr.responseText.indexOf("<b>Warning</b>:") != -1) return void self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading folder: <font color='#ff0000'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"
                    });
                    response = window.JSON ? JSON.parse(self.xhr.responseText) : eval("(" + self.xhr.responseText + ")"), response.folder ? self.parseFolderJSON(response) : response.li ? self.parseXML(response) : response.error && self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                        text: "Error loading file: <font color='#ff0000'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"
                    })
                }
            }, this.parseYoutubePlaylist = function(a) {
                if (!self.isPlaylistDispatchingError_bl && self.isYoutbe_bl) {
                    if (a.error) return self.JSONPRequestTimeoutError(), void(console && console.dir(a));
                    self.playlist_ar = [];
                    var b, c;
                    self.youtubeObject_ar || (self.youtubeObject_ar = []);
                    for (var e = 0; e < a.items.length; e++) self.youtubeObject_ar.push(a.items[e]);
                    if (b = self.youtubeObject_ar.length, self.stopToLoadPlaylist(), a.nextPageToken && b < self.maxPlaylistItems) return self.nextPageToken_str = a.nextPageToken, void self.loadYoutubePlaylist();
                    for (var e = 0; e < b && !(e > self.maxPlaylistItems - 1); e++) {
                        var f = {};
                        c = self.youtubeObject_ar[e], f.videoSource = c.snippet.resourceId.videoId, f.owner = c.snippet.channelTitle, f.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + c.snippet.title + "</p>", f.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + f.owner + "</p>", f.titleText = c.snippet.title, f.desc = void 0, f.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + c.snippet.title + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + c.snippet.description + "</p>", f.downloadable = !1;
                        try {
                            f.thumbSource = c.snippet.thumbnails.default.url
                        } catch (a) {}
                        f.posterSource = "none", c.snippet.title.indexOf("eleted video") == -1 && c.snippet.title.indexOf("his video is unavailable") == -1 && self.playlist_ar.push(f)
                    }
                    clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                    }, 50), self.isDataLoaded_bl = !0
                }
            }, this.closeJsonPLoader = function() {
                clearTimeout(self.JSONPRequestTimeoutId_to)
            }, this.parseDOMPlaylist = function(a, b) {
                if (!self.isPlaylistDispatchingError_bl) {
                    var e, c = FWDUVPUtils.getChildren(a),
                        d = c.length;
                    if (self.playlist_ar = [], 0 == d) return void(showLoadPlaylistErrorId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                            text: "At least one video is required in the playlist with id: <font color='#ff0000'>" + b + "</font>"
                        }), self.isPlaylistDispatchingError_bl = !1
                    }, 50));
                    for (var f = 0; f < d; f++) {
                        var h, g = {};
                        if (e = c[f], !FWDUVPUtils.hasAttribute(e, "data-thumb-source")) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                            self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                text: "Attribute <font color='#ff0000'>data-thumb-source</font> is required in the playlist at position <font color='#ff0000'>" + (f + 1)
                            })
                        }, 50));
                        if (!FWDUVPUtils.hasAttribute(e, "data-video-source")) return self.isPlaylistDispatchingError_bl = !0, void(showLoadPlaylistErrorId_to = setTimeout(function() {
                            self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                                text: "Attribute <font color='#ff0000'>data-video-source</font> is required in the playlist at position <font color='#ff0000'>" + (f + 1)
                            })
                        }, 50));
                        if (f > self.maxPlaylistItems - 1) break;
                        g.thumbSource = encodeURI(FWDUVPUtils.getAttributeValue(e, "data-thumb-source")), g.videoSource = encodeURI(FWDUVPUtils.getAttributeValue(e, "data-video-source")), FWDUVPUtils.hasAttribute(e, "data-poster-source") ? g.posterSource = encodeURI(FWDUVPUtils.getAttributeValue(e, "data-poster-source")) : g.posterSource = "none", FWDUVPUtils.hasAttribute(e, "data-subtitle-soruce") && (g.subtitleSource = encodeURI(FWDUVPUtils.getAttributeValue(e, "data-subtitle-soruce"))), g.downloadPath = g.videoSource, FWDUVPUtils.hasAttribute(e, "data-downloadable") && self.showDownloadVideoButton_bl ? (g.downloadable = "yes" == FWDUVPUtils.getAttributeValue(e, "data-downloadable"), g.videoSource.indexOf(".") == -1 && (g.downloadable = !1)) : g.downloadable = !1;
                        for (var j, k, l, m, n, i = FWDUVPUtils.getChildren(e), o = 0; o < i.length; o++)
                            if (l = i[o], FWDUVPUtils.hasAttribute(l, "data-add-popup")) {
                                j = FWDUVPUtils.getChildren(l), k = [];
                                for (var p = 0; p < i.length; p++) m = j[p], m && (n = {}, n.source = encodeURI(FWDUVPUtils.getAttributeValue(m, "image-path")), n.start = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(m, "data-time-start")), n.end = FWDUVPUtils.getSecondsFromString(FWDUVPUtils.getAttributeValue(m, "data-time-end")), n.link = FWDUVPUtils.getAttributeValue(m, "data-link"), n.target = FWDUVPUtils.getAttributeValue(m, "data-target"), k.push(n));
                                g.popupAds_ar = k
                            }
                        var r, q = FWDUVPUtils.getChildren(e);
                        g.title = "not defined!", g.titleText = "not defined!";
                        for (var o = 0; o < q.length; o++) r = q[o], FWDUVPUtils.hasAttribute(r, "data-video-short-description") ? (g.title = r.innerHTML, FWDUVPUtils.isIEAndLessThen9 ? g.titleText = r.innerText : g.titleText = r.textContent) : FWDUVPUtils.hasAttribute(r, "data-video-long-description") && (g.desc = r.innerHTML);
                        FWDUVPUtils.hasAttribute(e, "data-ads-source") && (h = {}, h.source = FWDUVPUtils.getAttributeValue(e, "data-ads-source"), h.pageToOpen = FWDUVPUtils.getAttributeValue(e, "data-ads-page-to-open-url"), h.pageTarget = FWDUVPUtils.getAttributeValue(e, "data-ads-page-target") || "_blank", h.timeToHoldAds = parseInt(FWDUVPUtils.getAttributeValue(e, "data-time-to-hold-ads")) || 0, g.ads = h), self.playlist_ar[f] = g
                    }
                    clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                        self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                    }, 50), self.isDataLoaded_bl = !0
                }
            }, this.parseFolderJSON = function(a) {
                self.playlist_ar = [];
                for (var b, c = a.folder, e = 0; e < c.length && (b = {}, b.videoSource = encodeURI(c[e]["@attributes"]["data-video-path"]), b.thumbSource = encodeURI(c[e]["@attributes"]["data-thumb-path"]), b.posterSource = encodeURI(c[e]["@attributes"]["data-poster-path"]), b.downloadPath = encodeURIComponent(c[e]["@attributes"]["download-path"]), b.downloadable = self.showDownloadVideoButton_bl, self.forceDisableDownloadButtonForFolder_bl && (b.downloadable = !1), b.titleText = c[e]["@attributes"]["data-title"], b.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + c[e]["@attributes"]["data-title"] + "</p>", b.desc = void 0, self.playlist_ar[e] = b, !(e > self.maxPlaylistItems - 1)); e++);
                clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                }, 50), self.isDataLoaded_bl = !0
            }, this.parseXML = function(a) {
                self.playlist_ar = [];
                var b, c = a.li;
                c.length || (c = [c]);
                for (var d = 0; d < c.length && (b = {}, b.videoSource = encodeURI(c[d]["@attributes"]["data-video-source"]), b.downloadPath = b.videoSource, b.downloadable = "yes" == c[d]["@attributes"]["data-downloadable"], b.videoSource.indexOf(".") == -1 && (b.downloadable = !1), b.posterSource = encodeURI(c[d]["@attributes"]["data-poster-source"]), b.thumbSource = c[d]["@attributes"]["data-thumb-source"], b.title = c[d]["@attributes"]["data-title"], b.titleText = c[d]["@attributes"]["data-title"], b.desc = c[d]["@attributes"]["data-desc"], c[d]["@attributes"]["data-ads-source"] && (adsObj = {}, adsObj.source = c[d]["@attributes"]["data-ads-source"], adsObj.pageToOpen = c[d]["@attributes"]["data-ads-page-to-open-url"], adsObj.pageTarget = c[d]["@attributes"]["data-ads-page-target"] || "_blank", adsObj.timeToHoldAds = c[d]["@attributes"]["data-time-to-hold-ads"] || 0, b.ads = adsObj), self.playlist_ar[d] = b, !(d > self.maxPlaylistItems - 1)); d++);
                clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to), self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function() {
                    self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE)
                }, 50), self.isDataLoaded_bl = !0
            }, this.stopToLoadPlaylist = function() {
                self.closeJsonPLoader();
                try {
                    self.scs_el.src = null, document.documentElement.removeChild(self.scs_el), self.scs_el = null
                } catch (a) {}
                if (null != self.xhr) {
                    try {
                        self.xhr.abort()
                    } catch (a) {}
                    self.xhr.onreadystatechange = null, self.xhr.onerror = null, self.xhr = null
                }
            }, self.showPropertyError = function(a) {
                self.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                    text: "The property called <font color='#ff0000'>" + a + "</font> is not defined."
                })
            }, self.init()
        };
        FWDUVPData.setPrototype = function() {
            FWDUVPData.prototype = new FWDUVPEventDispatcher
        }, FWDUVPData.prototype = null, FWDUVPData.PLAYLIST_LOAD_COMPLETE = "playlistLoadComplete", FWDUVPData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone", FWDUVPData.LOAD_DONE = "onLoadDone", FWDUVPData.LOAD_ERROR = "onLoadError", FWDUVPData.IMAGE_LOADED = "onImageLoaded", FWDUVPData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete", FWDUVPData.SKIN_PROGRESS = "onSkinProgress", FWDUVPData.IMAGES_PROGRESS = "onImagesPogress", window.FWDUVPData = FWDUVPData
    }(window), function(a) {
        var b = function(a, b, c, d) {
            var e = this;
            e.listeners = {
                events_ar: []
            }, e.type = a, this.children_ar = [], this.style, this.screen, this.transform, this.position = b || "absolute", this.overflow = c || "hidden", this.display = d || "inline-block", this.visible = !0, this.buttonMode, this.x = 0, this.y = 0, this.w = 0, this.h = 0, this.rect, this.alpha = 1, this.innerHTML = "", this.opacityType = "", this.isHtml5_bl = !1, this.hasTransform3d_bl = FWDUVPUtils.hasTransform3d, this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d, (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) && (e.hasTransform3d_bl = !1), (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) && (e.hasTransform2d_bl = !1), this.hasBeenSetSelectable_bl = !1, e.init = function() {
                e.setScreen()
            }, e.getTransform = function() {
                for (var b, a = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"]; b = a.shift();)
                    if ("undefined" != typeof e.screen.style[b]) return b;
                return !1
            }, e.getOpacityType = function() {
                var a;
                return a = "undefined" != typeof e.screen.style.opacity ? "opacity" : "filter"
            }, e.setScreen = function(a) {
                "img" == e.type && a ? (e.screen = null, e.screen = a, e.setMainProperties()) : (e.screen = document.createElement(e.type), e.setMainProperties())
            }, e.setMainProperties = function() {
                e.transform = e.getTransform(), e.setPosition(e.position), e.setOverflow(e.overflow), e.opacityType = e.getOpacityType(), "opacity" == e.opacityType && (e.isHtml5_bl = !0), "filter" == e.opacityType && (e.screen.style.filter = "inherit"), e.screen.style.left = "0px", e.screen.style.top = "0px", e.screen.style.margin = "0px", e.screen.style.padding = "0px", e.screen.style.maxWidth = "none", e.screen.style.maxHeight = "none", e.screen.style.border = "none", e.screen.style.lineHeight = "1", e.screen.style.backgroundColor = "transparent", e.screen.style.backfaceVisibility = "hidden", e.screen.style.webkitBackfaceVisibility = "hidden", e.screen.style.MozBackfaceVisibility = "hidden", "img" == a && (e.setWidth(e.screen.width), e.setHeight(e.screen.height))
            }, e.setBackfaceVisibility = function() {
                e.screen.style.backfaceVisibility = "visible", e.screen.style.webkitBackfaceVisibility = "visible", e.screen.style.MozBackfaceVisibility = "visible"
            }, e.setSelectable = function(a) {
                a ? (FWDUVPUtils.isFirefox || FWDUVPUtils.isIE ? (e.screen.style.userSelect = "element", e.screen.style.MozUserSelect = "element", e.screen.style.msUserSelect = "element") : FWDUVPUtils.isSafari ? (e.screen.style.userSelect = "text", e.screen.style.webkitUserSelect = "text") : (e.screen.style.userSelect = "all", e.screen.style.webkitUserSelect = "all"), e.screen.style.khtmlUserSelect = "all", e.screen.style.oUserSelect = "all", FWDUVPUtils.isIEAndLessThen9 ? (e.screen.ondragstart = null, e.screen.onselectstart = null, e.screen.ontouchstart = null) : (e.screen.ondragstart = void 0, e.screen.onselectstart = void 0, e.screen.ontouchstart = void 0), e.screen.style.webkitTouchCallout = "default", e.hasBeenSetSelectable_bl = !1) : (e.screen.style.userSelect = "none", e.screen.style.MozUserSelect = "none", e.screen.style.webkitUserSelect = "none", e.screen.style.khtmlUserSelect = "none", e.screen.style.oUserSelect = "none", e.screen.style.msUserSelect = "none", e.screen.msUserSelect = "none", e.screen.ondragstart = function(a) {
                    return !1
                }, e.screen.onselectstart = function() {
                    return !1
                }, e.screen.ontouchstart = function() {
                    return !1
                }, e.screen.style.webkitTouchCallout = "none", e.hasBeenSetSelectable_bl = !0)
            }, e.getScreen = function() {
                return e.screen
            }, e.setVisible = function(a) {
                e.visible = a, 1 == e.visible ? e.screen.style.visibility = "visible" : e.screen.style.visibility = "hidden"
            }, e.getVisible = function() {
                return e.visible
            }, e.setResizableSizeAfterParent = function() {
                e.screen.style.width = "100%", e.screen.style.height = "100%"
            }, e.getStyle = function() {
                return e.screen.style
            }, e.setOverflow = function(a) {
                e.overflow = a, e.screen.style.overflow = e.overflow
            }, e.setPosition = function(a) {
                e.position = a, e.screen.style.position = e.position
            }, e.setDisplay = function(a) {
                e.display = a, e.screen.style.display = e.display
            }, e.setButtonMode = function(a) {
                e.buttonMode = a, 1 == e.buttonMode ? e.screen.style.cursor = "pointer" : e.screen.style.cursor = "default"
            }, e.setBkColor = function(a) {
                e.screen.style.backgroundColor = a
            }, e.setInnerHTML = function(a) {
                e.innerHTML = a, e.screen.innerHTML = e.innerHTML
            }, e.getInnerHTML = function() {
                return e.innerHTML
            }, e.getRect = function() {
                return e.screen.getBoundingClientRect()
            }, e.setAlpha = function(a) {
                e.alpha = a, "opacity" == e.opacityType ? e.screen.style.opacity = e.alpha : "filter" == e.opacityType && (e.screen.style.filter = "alpha(opacity=" + 100 * e.alpha + ")", e.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(100 * e.alpha) + ")")
            }, e.getAlpha = function() {
                return e.alpha
            }, e.getRect = function() {
                return e.screen.getBoundingClientRect()
            }, e.getGlobalX = function() {
                return e.getRect().left
            }, e.getGlobalY = function() {
                return e.getRect().top
            }, e.setX = function(a) {
                e.x = a, e.hasTransform3d_bl ? e.screen.style[e.transform] = "translate3d(" + e.x + "px," + e.y + "px,0)" : e.hasTransform2d_bl ? e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px)" : e.screen.style.left = e.x + "px"
            }, e.getX = function() {
                return e.x
            }, e.setY = function(a) {
                e.y = a, e.hasTransform3d_bl ? e.screen.style[e.transform] = "translate3d(" + e.x + "px," + e.y + "px,0)" : e.hasTransform2d_bl ? e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px)" : e.screen.style.top = e.y + "px"
            }, e.getY = function() {
                return e.y
            }, e.setWidth = function(a) {
                e.w = a, "img" == e.type ? (e.screen.width = e.w, e.screen.style.width = e.w + "px") : e.screen.style.width = e.w + "px"
            }, e.getWidth = function() {
                return "div" == e.type || "input" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : e.w : "img" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : 0 != e.screen.width ? e.screen.width : e._w : "canvas" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : e.w : void 0
            }, e.setHeight = function(a) {
                e.h = a, "img" == e.type ? (e.screen.height = e.h, e.screen.style.height = e.h + "px") : e.screen.style.height = e.h + "px"
            }, e.getHeight = function() {
                return "div" == e.type || "input" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : e.h : "img" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : 0 != e.screen.height ? e.screen.height : e.h : "canvas" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : e.h : void 0
            }, e.addChild = function(a) {
                e.contains(a) ? (e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 1), e.children_ar.push(a), e.screen.appendChild(a.screen)) : (e.children_ar.push(a), e.screen.appendChild(a.screen))
            }, e.removeChild = function(a) {
                if (!e.contains(a)) throw Error("##removeChild()## Child dose't exist, it can't be removed!");
                e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 1), e.screen.removeChild(a.screen)
            }, e.contains = function(a) {
                return FWDUVPUtils.indexOfArray(e.children_ar, a) != -1
            }, e.addChildAt = function(a, b) {
                if (0 == e.getNumChildren()) e.children_ar.push(a), e.screen.appendChild(a.screen);
                else if (1 == b) e.screen.insertBefore(a.screen, e.children_ar[0].screen), e.screen.insertBefore(e.children_ar[0].screen, a.screen), e.contains(a) ? e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 1, a) : e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 0, a);
                else {
                    if (b < 0 || b > e.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                    e.screen.insertBefore(a.screen, e.children_ar[b].screen), e.contains(a) ? e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 1, a) : e.children_ar.splice(FWDUVPUtils.indexOfArray(e.children_ar, a), 0, a)
                }
            }, e.getChildAt = function(a) {
                if (a < 0 || a > e.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                if (0 == e.getNumChildren()) throw Error("##getChildAt## Child dose not exist!");
                return e.children_ar[a]
            }, e.getChildIndex = function(a) {
                return e.contains(a) ? FWDUVPUtils.indexOfArray(e.children_ar, a) : 0
            }, e.removeChildAtZero = function() {
                e.screen.removeChild(e.children_ar[0].screen), e.children_ar.shift()
            }, e.getNumChildren = function() {
                return e.children_ar.length
            }, e.addListener = function(a, b) {
                if (void 0 == a) throw Error("type is required.");
                if ("object" == typeof a) throw Error("type must be of type String.");
                if ("function" != typeof b) throw Error("listener must be of type Function.");
                var c = {};
                c.type = a, c.listener = b, c.target = this, this.listeners.events_ar.push(c)
            }, e.dispatchEvent = function(a, b) {
                if (null != this.listeners) {
                    if (void 0 == a) throw Error("type is required.");
                    if ("object" == typeof a) throw Error("type must be of type String.");
                    for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                        if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a) {
                            if (b)
                                for (var e in b) this.listeners.events_ar[c][e] = b[e];
                            this.listeners.events_ar[c].listener.call(this, this.listeners.events_ar[c])
                        }
                }
            }, e.removeListener = function(a, b) {
                if (void 0 == a) throw Error("type is required.");
                if ("object" == typeof a) throw Error("type must be of type String.");
                if ("function" != typeof b) throw Error("listener must be of type Function." + a);
                for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                    if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a && this.listeners.events_ar[c].listener === b) {
                        this.listeners.events_ar.splice(c, 1);
                        break
                    }
            }, e.disposeImage = function() {
                "img" == e.type && (e.screen.src = null)
            }, e.destroy = function() {
                e.hasBeenSetSelectable_bl && (e.screen.ondragstart = null, e.screen.onselectstart = null, e.screen.ontouchstart = null), e.screen.removeAttribute("style"), e.listeners = [], e.listeners = null, e.children_ar = [], e.children_ar = null, e.style = null, e.screen = null, e.transform = null, e.position = null, e.overflow = null, e.display = null, e.visible = null, e.buttonMode = null, e.x = null, e.y = null, e.w = null, e.h = null, e.rect = null, e.alpha = null, e.innerHTML = null, e.opacityType = null, e.isHtml5_bl = null, e.hasTransform3d_bl = null, e.hasTransform2d_bl = null, e = null
            }, e.init()
        };
        a.FWDUVPDisplayObject = b
    }(window), "undefined" == typeof asual) var asual = {};
"undefined" == typeof asual.util && (asual.util = {}), asual.util.Browser = new function() {
    var a = navigator.userAgent.toLowerCase(),
        b = /webkit/.test(a),
        c = /opera/.test(a),
        d = /msie/.test(a) && !/opera/.test(a),
        e = /mozilla/.test(a) && !/(compatible|webkit)/.test(a),
        f = parseFloat(d ? a.substr(a.indexOf("msie") + 4) : (a.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function() {
        return "[class Browser]"
    }, this.getVersion = function() {
        return f
    }, this.isMSIE = function() {
        return d
    }, this.isSafari = function() {
        return b
    }, this.isOpera = function() {
        return c
    }, this.isMozilla = function() {
        return e
    }
}, asual.util.Events = new function() {
    var a = "DOMContentLoaded",
        b = "onstop",
        c = window,
        d = document,
        e = [],
        f = asual.util,
        g = f.Browser,
        h = g.isMSIE(),
        i = g.isSafari();
    this.toString = function() {
        return "[class Events]"
    }, this.addListener = function(b, c, d) {
        e.push({
            o: b,
            t: c,
            l: d
        }), c == a && (h || i) || (b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent && b.attachEvent("on" + c, d))
    }, this.removeListener = function(b, c, d) {
        for (var g, f = 0; g = e[f]; f++)
            if (g.o == b && g.t == c && g.l == d) {
                e.splice(f, 1);
                break
            }
        c == a && (h || i) || (b.removeEventListener ? b.removeEventListener(c, d, !1) : b.detachEvent && b.detachEvent("on" + c, d))
    };
    var j = function() {
            for (var c, b = 0; c = e[b]; b++) c.t != a && f.Events.removeListener(c.o, c.t, c.l)
        },
        k = function() {
            function a() {
                d.detachEvent(b, a), j()
            }
            "interactive" == d.readyState && (d.attachEvent(b, a), c.setTimeout(function() {
                d.detachEvent(b, a)
            }, 0))
        };
    (h || i) && ! function() {
        try {
            (h && d.body || !/loaded|complete/.test(d.readyState)) && d.documentElement.doScroll("left")
        } catch (a) {
            return setTimeout(arguments.callee, 0)
        }
        for (var c, b = 0; c = e[b]; b++) c.t == a && c.l.call(null)
    }(), h && c.attachEvent && c.attachEvent("onbeforeunload", k), this.addListener(c, "unload", j)
}, asual.util.Functions = new function() {
    this.toString = function() {
        return "[class Functions]"
    }, this.bind = function(a, b, c) {
        for (var e, d = 2, f = []; e = arguments[d]; d++) f.push(e);
        return function() {
            return a.apply(b, f)
        }
    }
};
var FWDAddressEvent = function(a) {
    this.toString = function() {
        return "[object FWDAddressEvent]"
    }, this.type = a, this.target = [FWDAddress][0], this.value = FWDAddress.getValue(), this.path = FWDAddress.getPath(), this.pathNames = FWDAddress.getPathNames(), this.parameters = {};
    for (var b = FWDAddress.getParameterNames(), c = 0, d = b.length; c < d; c++) this.parameters[b[c]] = FWDAddress.getParameter(b[c]);
    this.parameterNames = b
};
FWDAddressEvent.INIT = "init", FWDAddressEvent.CHANGE = "change", FWDAddressEvent.INTERNAL_CHANGE = "internalChange", FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function() {
    var _getHash = function() {
            var a = _l.href.indexOf("#");
            return a != -1 ? _ec(_dc(_l.href.substr(a + 1))) : ""
        },
        _getWindow = function() {
            try {
                return top.document, top
            } catch (a) {
                return window
            }
        },
        _strictCheck = function(a, b) {
            return _opts.strict && (a = b ? "/" != a.substr(0, 1) ? "/" + a : a : "" == a ? "/" : a), a
        },
        _ieLocal = function(a, b) {
            return _msie && "file:" == _l.protocol ? b ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?") : a
        },
        _searchScript = function(a) {
            if (a.childNodes)
                for (var d, b = 0, c = a.childNodes.length; b < c; b++)
                    if (a.childNodes[b].src && (_url = String(a.childNodes[b].src)), d = _searchScript(a.childNodes[b])) return d
        },
        _titleCheck = function() {
            _d.title != _title && _d.title.indexOf("#") != -1 && (_d.title = _title)
        },
        _listen = function() {
            if (!_silent) {
                var a = _getHash(),
                    b = !(_value == a);
                _safari && _version < 523 ? _length != _h.length && (_length = _h.length, typeof _stack[_length - 1] != UNDEFINED && (_value = _stack[_length - 1]), _update.call(this, !1)) : _msie && b ? _version < 7 ? _l.reload() : this.setValue(a) : b && (_value = a, _update.call(this, !1)), _msie && _titleCheck.call(this)
            }
        },
        _bodyClick = function(e) {
            if (_popup.length > 0) {
                var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
                typeof _popup[3] != UNDEFINED && eval(_popup[3])
            }
            _popup = []
        },
        _swfChange = function() {
            for (var b, c, a = 0, d = FWDAddress.getValue(), e = "setFWDAddressValue"; b = _ids[a]; a++)
                if (c = document.getElementById(b))
                    if (c.parentNode && typeof c.parentNode.so != UNDEFINED) c.parentNode.so.call(e, d);
                    else {
                        if (!c || typeof c[e] == UNDEFINED) {
                            var f = c.getElementsByTagName("object"),
                                g = c.getElementsByTagName("embed");
                            c = f[0] && typeof f[0][e] != UNDEFINED ? f[0] : g[0] && typeof g[0][e] != UNDEFINED ? g[0] : null
                        }
                        c && c[e](d)
                    } else(c = document[b]) && typeof c[e] != UNDEFINED && c[e](d)
        },
        _jsDispatch = function(a) {
            this.dispatchEvent(new FWDAddressEvent(a)), a = a.substr(0, 1).toUpperCase() + a.substr(1), typeof this["on" + a] == FUNCTION && this["on" + a]()
        },
        _jsInit = function() {
            _util.Browser.isSafari() && _d.body.addEventListener("click", _bodyClick), _jsDispatch.call(this, "init")
        },
        _jsChange = function() {
            _swfChange(), _jsDispatch.call(this, "change")
        },
        _update = function(a) {
            _jsChange.call(this), a ? _jsDispatch.call(this, "internalChange") : _jsDispatch.call(this, "externalChange"), _st(_functions.bind(_track, this), 10)
        },
        _track = function() {
            var a = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, ""),
                b = _t[_opts.tracker];
            typeof b == FUNCTION ? b(a) : typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION ? _t.pageTracker._trackPageview(a) : typeof _t.urchinTracker == FUNCTION && _t.urchinTracker(a)
        },
        _htmlWrite = function() {
            var a = _frame.contentWindow.document;
            a.open(), a.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";</script></head></html>'), a.close()
        },
        _htmlLoad = function() {
            var a = _frame.contentWindow;
            a.location.href;
            _value = typeof a[ID] != UNDEFINED ? a[ID] : "", _value != _getHash() && (_update.call(FWDAddress, !1), _l.hash = _ieLocal(_value, TRUE))
        },
        _load = function() {
            if (!_loaded) {
                if (_loaded = TRUE, _msie && _version < 8) {
                    var a = _d.getElementsByTagName("frameset")[0];
                    _frame = _d.createElement((a ? "" : "i") + "frame"), a ? (a.insertAdjacentElement("beforeEnd", _frame), a[a.cols ? "cols" : "rows"] += ",0", _frame.src = "javascript:false", _frame.noResize = !0, _frame.frameBorder = _frame.frameSpacing = 0) : (_frame.src = "javascript:false", _frame.style.display = "none", _d.body.insertAdjacentElement("afterBegin", _frame)), _st(function() {
                        _events.addListener(_frame, "load", _htmlLoad), typeof _frame.contentWindow[ID] == UNDEFINED && _htmlWrite()
                    }, 50)
                } else _safari && (_version < 418 && (_d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>', _form = _d.getElementById(ID)), typeof _l[ID] == UNDEFINED && (_l[ID] = {}), typeof _l[ID][_l.pathname] != UNDEFINED && (_stack = _l[ID][_l.pathname].split(",")));
                _st(_functions.bind(function() {
                    _jsInit.call(this), _jsChange.call(this), _track.call(this)
                }, this), 1), _msie && _version >= 8 ? (_d.body.onhashchange = _functions.bind(_listen, this), _si(_functions.bind(_titleCheck, this), 50)) : _si(_functions.bind(_listen, this), 50)
            }
        },
        ID = "swfaddress",
        FUNCTION = "function",
        UNDEFINED = "undefined",
        TRUE = !0,
        FALSE = !1,
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
    if (_msie && _d.documentMode && _d.documentMode != _version && (_version = 8 != _d.documentMode ? 7 : 8), _supported = _mozilla && _version >= 1 || _msie && _version >= 6 || _opera && _version >= 9.5 || _safari && _version >= 312) {
        _opera && (history.navigationMode = "compatible");
        for (var i = 1; i < _length; i++) _stack.push("");
        _stack.push(_getHash()), _msie && _l.hash != _getHash() && (_l.hash = "#" + _ieLocal(_getHash(), TRUE)), _searchScript(document);
        var _qi = _url ? _url.indexOf("?") : -1;
        if (_qi != -1)
            for (var param, params = _url.substr(_qi + 1).split("&"), i = 0, p; p = params[i]; i++) param = p.split("="), /^(history|strict)$/.test(param[0]) && (_opts[param[0]] = isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : 0 != parseInt(param[1])), /^tracker$/.test(param[0]) && (_opts[param[0]] = param[1]);
        _msie && _titleCheck.call(this), window == _t && _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this)), _events.addListener(_t, "load", _functions.bind(_load, this))
    } else !_supported && _l.href.indexOf("#") != -1 || _safari && _version < 418 && _l.href.indexOf("#") != -1 && "" != _l.search ? (_d.open(), _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>'), _d.close()) : _track();
    this.toString = function() {
            return "[class FWDAddress]"
        }, this.back = function() {
            _h.back()
        }, this.forward = function() {
            _h.forward()
        }, this.up = function() {
            var a = this.getPath();
            this.setValue(a.substr(0, a.lastIndexOf("/", a.length - 2) + ("/" == a.substr(a.length - 1) ? 1 : 0)))
        }, this.go = function(a) {
            _h.go(a)
        }, this.href = function(a, b) {
            b = typeof b != UNDEFINED ? b : "_self", "_self" == b ? self.location.href = a : "_top" == b ? _l.href = a : "_blank" == b ? window.open(a) : _t.frames[b].location.href = a
        }, this.popup = function(url, name, options, handler) {
            try {
                var popup = window.open(url, name, eval(options));
                typeof handler != UNDEFINED && eval(handler)
            } catch (a) {}
            _popup = arguments
        }, this.getIds = function() {
            return _ids
        }, this.getId = function(a) {
            return _ids[0]
        }, this.setId = function(a) {
            _ids[0] = a
        }, this.addId = function(a) {
            this.removeId(a), _ids.push(a)
        }, this.removeId = function(a) {
            for (var b = 0; b < _ids.length; b++)
                if (a == _ids[b]) {
                    _ids.splice(b, 1);
                    break
                }
        }, this.addEventListener = function(a, b) {
            typeof _listeners[a] == UNDEFINED && (_listeners[a] = []), _listeners[a].push(b)
        }, this.removeEventListener = function(a, b) {
            if (typeof _listeners[a] != UNDEFINED) {
                for (var d, c = 0;
                    (d = _listeners[a][c]) && d != b; c++);
                _listeners[a].splice(c, 1)
            }
        }, this.dispatchEvent = function(a) {
            if (this.hasEventListener(a.type)) {
                a.target = this;
                for (var c, b = 0; c = _listeners[a.type][b]; b++) c(a);
                return TRUE
            }
            return FALSE
        }, this.hasEventListener = function(a) {
            return typeof _listeners[a] != UNDEFINED && _listeners[a].length > 0
        }, this.getBaseURL = function() {
            var a = _l.href;
            return a.indexOf("#") != -1 && (a = a.substr(0, a.indexOf("#"))), "/" == a.substr(a.length - 1) && (a = a.substr(0, a.length - 1)), a
        }, this.getStrict = function() {
            return _opts.strict
        }, this.setStrict = function(a) {
            _opts.strict = a
        }, this.getHistory = function() {
            return _opts.history
        }, this.setHistory = function(a) {
            _opts.history = a
        }, this.getTracker = function() {
            return _opts.tracker
        }, this.setTracker = function(a) {
            _opts.tracker = a
        }, this.getTitle = function() {
            return _d.title
        }, this.setTitle = function(a) {
            return _supported ? void(typeof a != UNDEFINED && ("null" == a && (a = ""), a = _dc(a), _st(function() {
                _title = _d.title = a, _juststart && _frame && _frame.contentWindow && _frame.contentWindow.document && (_frame.contentWindow.document.title = a, _juststart = FALSE), !_justset && _mozilla && _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#"), _justset = FALSE
            }, 10))) : null
        }, this.getStatus = function() {
            return _t.status
        }, this.setStatus = function(a) {
            if (!_supported) return null;
            if (typeof a != UNDEFINED && ("null" == a && (a = ""), a = _dc(a), !_safari)) {
                if (a = _strictCheck("null" != a ? a : "", TRUE), "/" == a && (a = ""), !/http(s)?:\/\//.test(a)) {
                    var b = _l.href.indexOf("#");
                    a = (b == -1 ? _l.href : _l.href.substr(0, b)) + "#" + a
                }
                _t.status = a
            }
        }, this.resetStatus = function() {
            _t.status = ""
        }, this.getValue = function() {
            return _supported ? _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE)) : null
        }, this.setValue = function(a) {
            if (!_supported) return null;
            if (typeof a != UNDEFINED && ("null" == a && (a = ""), a = _ec(_dc(_strictCheck(a, TRUE))), "/" == a && (a = ""), _value != a)) {
                if (_justset = TRUE, _value = a, _silent = TRUE, _update.call(FWDAddress, !0), _stack[_h.length] = _value, _safari)
                    if (_opts.history)
                        if (_l[ID][_l.pathname] = _stack.toString(), _length = _h.length + 1, _version < 418) "" == _l.search && (_form.action = "#" + _value, _form.submit());
                        else if (_version < 523 || "" == _value) {
                    var b = _d.createEvent("MouseEvents");
                    b.initEvent("click", TRUE, TRUE);
                    var c = _d.createElement("a");
                    c.href = "#" + _value, c.dispatchEvent(b)
                } else _l.hash = "#" + _value;
                else _l.replace("#" + _value);
                else _value != _getHash() && (_opts.history ? _l.hash = "#" + _dc(_ieLocal(_value, TRUE)) : _l.replace("#" + _dc(_value)));
                _msie && _version < 8 && _opts.history && _st(_htmlWrite, 50), _safari ? _st(function() {
                    _silent = FALSE
                }, 1) : _silent = FALSE
            }
        }, this.getPath = function() {
            var a = this.getValue();
            return a.indexOf("?") != -1 ? a.split("?")[0] : a.indexOf("#") != -1 ? a.split("#")[0] : a
        }, this.getPathNames = function() {
            var a = this.getPath(),
                b = a.split("/");
            return "/" != a.substr(0, 1) && 0 != a.length || b.splice(0, 1), "/" == a.substr(a.length - 1, 1) && b.splice(b.length - 1, 1), b
        }, this.getQueryString = function() {
            var a = this.getValue(),
                b = a.indexOf("?");
            if (b != -1 && b < a.length) return a.substr(b + 1)
        }, this.getParameter = function(a) {
            var b = this.getValue(),
                c = b.indexOf("?");
            if (c != -1) {
                b = b.substr(c + 1);
                for (var d, e = b.split("&"), f = e.length, g = []; f--;) d = e[f].split("="), d[0] == a && g.push(d[1]);
                if (0 != g.length) return 1 != g.length ? g : g[0]
            }
        }, this.getParameterNames = function() {
            var a = this.getValue(),
                b = a.indexOf("?"),
                c = [];
            if (b != -1 && (a = a.substr(b + 1), "" != a && a.indexOf("=") != -1))
                for (var d = a.split("&"), e = 0; e < d.length;) c.push(d[e].split("=")[0]), e++;
            return c
        }, this.onInit = null, this.onChange = null, this.onInternalChange = null, this.onExternalChange = null,
        function() {
            var a;
            if (typeof FlashObject != UNDEFINED && (SWFObject = FlashObject), typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
                var b = SWFObject.prototype.write;
                SWFObject.prototype.write = function() {
                    a = arguments, this.getAttribute("version").major < 8 && (this.addVariable("$swfaddress", FWDAddress.getValue()), ("string" == typeof a[0] ? document.getElementById(a[0]) : a[0]).so = this);
                    var c;
                    return (c = b.apply(this, a)) && _ref.addId(this.getAttribute("id")), c
                }
            }
            if (typeof swfobject != UNDEFINED) {
                var c = swfobject.registerObject;
                swfobject.registerObject = function() {
                    a = arguments, c.apply(this, a), _ref.addId(a[0])
                };
                var d = swfobject.createSWF;
                swfobject.createSWF = function() {
                    a = arguments;
                    var b = d.apply(this, a);
                    return b && _ref.addId(a[0].id), b
                };
                var e = swfobject.embedSWF;
                swfobject.embedSWF = function() {
                    a = arguments, typeof a[8] == UNDEFINED && (a[8] = {}), typeof a[8].id == UNDEFINED && (a[8].id = a[1]), e.apply(this, a), _ref.addId(a[8].id)
                }
            }
            if (typeof UFO != UNDEFINED) {
                var f = UFO.create;
                UFO.create = function() {
                    a = arguments, f.apply(this, a), _ref.addId(a[0].id)
                }
            }
            if (typeof AC_FL_RunContent != UNDEFINED) {
                var g = AC_FL_RunContent;
                AC_FL_RunContent = function() {
                    a = arguments, g.apply(this, a);
                    for (var b = 0, c = a.length; b < c; b++) "id" == a[b] && _ref.addId(a[b + 1])
                }
            }
        }()
};
! function(a) {
    var b = function(c, d) {
        function g() {
            if (a.top == a || !FWDUVPUtils.isIE) {
                var b, c;
                document.body.createTextRange ? (b = document.body.createTextRange(), b.moveToElementText(this), b.select()) : a.getSelection && document.createRange && (c = a.getSelection(), b = document.createRange(), b.selectNodeContents(this), c.removeAllRanges(), c.addRange(b))
            }
        }
        var e = this;
        b.prototype;
        this.xhr = null, this.embedColoseN_img = c.embedColoseN_img, this.bk_do = null, this.mainHolder_do = null, this.embedAndLinkMainLabel_do = null, this.linkAndEmbedHolderBk_do = null, this.linkText_do = null, this.linkLabel_do = null, this.embedText_do = null, this.embedLabel_do = null, this.linkAndEmbedHolder_do = null, this.copyLinkButton_do = null, this.copyEmbedButton_do = null, this.infoText_do = null, this.sendMainHolder_do = null, this.sendMainHolderBk_do = null, this.sendMainLabel_do = null, this.yourEmailLabel_do = null, this.yourEmailInput_do = null, this.friendEmailLabel_do = null, this.friendEmailInput_do = null, this.closeButton_do = null, this.videoLink_str = null, this.embedWindowBackground_str = c.embedWindowBackground_str, this.embedWindowInputBackgroundPath_str = c.embedWindowInputBackgroundPath_str, this.secondaryLabelsColor_str = c.secondaryLabelsColor_str, this.inputColor_str = c.inputColor_str, this.mainLabelsColor_str = c.mainLabelsColor_str, this.sendButtonNPath_str = c.sendButtonNPath_str, this.sendButtonSPath_str = c.sendButtonSPath_str, this.inputBackgroundColor_str = c.inputBackgroundColor_str, this.borderColor_str = c.borderColor_str, this.sendToAFriendPath_str = c.sendToAFriendPath_str, this.maxTextWidth = 0, this.totalWidth = 0, this.stageWidth = 0, this.stageHeight = 0, this.buttonWidth = 44, this.buttonHeight = 19, this.embedWindowCloseButtonMargins = c.embedWindowCloseButtonMargins, this.finalEmbedPath_str = null, this.finalEmbedCode_str = null, this.linkToVideo_str = null, this.shareAndEmbedTextColor_str = c.shareAndEmbedTextColor_str, this.isSending_bl = !1, this.isShowed_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            e.setBackfaceVisibility(), e.mainHolder_do = new FWDUVPDisplayObject("div"), e.bk_do = new FWDUVPDisplayObject("div"), e.bk_do.getStyle().width = "100%", e.bk_do.getStyle().height = "100%", e.bk_do.setAlpha(.9), e.bk_do.getStyle().background = "url('" + e.embedWindowBackground_str + "')", e.linkAndEmbedHolder_do = new FWDUVPDisplayObject("div"), e.linkAndEmbedHolderBk_do = new FWDUVPDisplayObject("div"), e.linkAndEmbedHolderBk_do.getStyle().background = "url('" + e.embedWindowBackground_str + "')", e.linkAndEmbedHolderBk_do.getStyle().borderStyle = "solid", e.linkAndEmbedHolderBk_do.getStyle().borderWidth = "1px", e.linkAndEmbedHolderBk_do.getStyle().borderColor = e.borderColor_str, e.embedAndLinkMainLabel_do = new FWDUVPDisplayObject("div"), e.embedAndLinkMainLabel_do.setBackfaceVisibility(), e.embedAndLinkMainLabel_do.getStyle().fontFamily = "Arial", e.embedAndLinkMainLabel_do.getStyle().fontSize = "12px", e.embedAndLinkMainLabel_do.getStyle().color = e.mainLabelsColor_str, e.embedAndLinkMainLabel_do.getStyle().whiteSpace = "nowrap", e.embedAndLinkMainLabel_do.getStyle().fontSmoothing = "antialiased", e.embedAndLinkMainLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.embedAndLinkMainLabel_do.getStyle().textRendering = "optimizeLegibility", e.embedAndLinkMainLabel_do.getStyle().padding = "0px", e.embedAndLinkMainLabel_do.setInnerHTML("SHARE & EMBED"), e.linkLabel_do = new FWDUVPDisplayObject("div"), e.linkLabel_do.setBackfaceVisibility(), e.linkLabel_do.getStyle().fontFamily = "Arial", e.linkLabel_do.getStyle().fontSize = "12px", e.linkLabel_do.getStyle().color = e.secondaryLabelsColor_str, e.linkLabel_do.getStyle().whiteSpace = "nowrap", e.linkLabel_do.getStyle().fontSmoothing = "antialiased", e.linkLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.linkLabel_do.getStyle().textRendering = "optimizeLegibility", e.linkLabel_do.getStyle().padding = "0px", e.linkLabel_do.setInnerHTML("Link to this video:"), e.linkText_do = new FWDUVPDisplayObject("div"), e.linkText_do.setBackfaceVisibility(), e.linkText_do.getStyle().fontFamily = "Arial", e.linkText_do.getStyle().fontSize = "12px", e.linkText_do.getStyle().color = e.shareAndEmbedTextColor_str, FWDUVPUtils.isIEAndLessThen9 || (e.linkText_do.getStyle().wordBreak = "break-all"), e.linkText_do.getStyle().fontSmoothing = "antialiased", e.linkText_do.getStyle().webkitFontSmoothing = "antialiased", e.linkText_do.getStyle().textRendering = "optimizeLegibility", e.linkText_do.getStyle().padding = "6px", e.linkText_do.getStyle().paddingTop = "4px", e.linkText_do.getStyle().paddingBottom = "4px", e.linkText_do.getStyle().backgroundColor = e.inputBackgroundColor_str, e.linkText_do.screen.onclick = g, e.embedLabel_do = new FWDUVPDisplayObject("div"), e.embedLabel_do.setBackfaceVisibility(), e.embedLabel_do.getStyle().fontFamily = "Arial", e.embedLabel_do.getStyle().fontSize = "12px", e.embedLabel_do.getStyle().color = e.secondaryLabelsColor_str, e.embedLabel_do.getStyle().whiteSpace = "nowrap", e.embedLabel_do.getStyle().fontSmoothing = "antialiased", e.embedLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.embedLabel_do.getStyle().textRendering = "optimizeLegibility", e.embedLabel_do.getStyle().padding = "0px", e.embedLabel_do.setInnerHTML("Embed this video:"), e.embedText_do = new FWDUVPDisplayObject("div"), e.embedText_do.setBackfaceVisibility(), FWDUVPUtils.isIEAndLessThen9 || (e.embedText_do.getStyle().wordBreak = "break-all"), e.embedText_do.getStyle().fontFamily = "Arial", e.embedText_do.getStyle().fontSize = "12px", e.embedText_do.getStyle().lineHeight = "16px", e.embedText_do.getStyle().color = e.shareAndEmbedTextColor_str, e.embedText_do.getStyle().fontSmoothing = "antialiased", e.embedText_do.getStyle().webkitFontSmoothing = "antialiased", e.embedText_do.getStyle().textRendering = "optimizeLegibility", e.embedText_do.getStyle().backgroundColor = e.inputBackgroundColor_str, e.embedText_do.getStyle().padding = "6px", e.embedText_do.getStyle().paddingTop = "4px", e.embedText_do.getStyle().paddingBottom = "4px", e.embedText_do.screen.onclick = g, FWDUVPFlashButton.setPrototype(), e.copyLinkButton_do = new FWDUVPFlashButton(c.embedCopyButtonNPath_str, c.embedCopyButtonSPath_str, c.flashCopyToCBPath_str, d.instanceName_str + "copyLink", d.instanceName_str + ".copyLinkButtonOnMouseOver", d.instanceName_str + ".copyLinkButtonOnMouseOut", d.instanceName_str + ".copyLinkButtonOnMouseClick", d.instanceName_str + ".getLinkCopyPath", e.buttonWidth, e.buttonHeight), e.copyLinkButton_do.addListener(FWDUVPFlashButton.CLICK, e.showFlashButtonInstallError), FWDUVPFlashButton.setPrototype(), e.copyEmbedButton_do = new FWDUVPFlashButton(c.embedCopyButtonNPath_str, c.embedCopyButtonSPath_str, c.flashCopyToCBPath_str, d.instanceName_str + "embedCode", d.instanceName_str + ".embedkButtonOnMouseOver", d.instanceName_str + ".embedButtonOnMouseOut", d.instanceName_str + ".embedButtonOnMouseClick", d.instanceName_str + ".getEmbedCopyPath", e.buttonWidth, e.buttonHeight), e.copyEmbedButton_do.addListener(FWDUVPFlashButton.CLICK, e.showFlashButtonInstallError), e.sendMainHolder_do = new FWDUVPDisplayObject("div"), e.sendMainHolderBk_do = new FWDUVPDisplayObject("div"), e.sendMainHolderBk_do.getStyle().background = "url('" + e.embedWindowBackground_str + "')", e.sendMainHolderBk_do.getStyle().borderStyle = "solid", e.sendMainHolderBk_do.getStyle().borderWidth = "1px", e.sendMainHolderBk_do.getStyle().borderColor = e.borderColor_str, e.sendMainLabel_do = new FWDUVPDisplayObject("div"), e.sendMainLabel_do.setBackfaceVisibility(), e.sendMainLabel_do.getStyle().fontFamily = "Arial", e.sendMainLabel_do.getStyle().fontSize = "12px", e.sendMainLabel_do.getStyle().color = e.mainLabelsColor_str, e.sendMainLabel_do.getStyle().whiteSpace = "nowrap", e.sendMainLabel_do.getStyle().fontSmoothing = "antialiased", e.sendMainLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.sendMainLabel_do.getStyle().textRendering = "optimizeLegibility", e.sendMainLabel_do.getStyle().padding = "0px", e.sendMainLabel_do.setInnerHTML("SEND TO A FRIEND"), e.yourEmailLabel_do = new FWDUVPDisplayObject("div"), e.yourEmailLabel_do.setBackfaceVisibility(), e.yourEmailLabel_do.getStyle().fontFamily = "Arial", e.yourEmailLabel_do.getStyle().fontSize = "12px", e.yourEmailLabel_do.getStyle().color = e.secondaryLabelsColor_str, e.yourEmailLabel_do.getStyle().whiteSpace = "nowrap", e.yourEmailLabel_do.getStyle().fontSmoothing = "antialiased", e.yourEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.yourEmailLabel_do.getStyle().textRendering = "optimizeLegibility", e.yourEmailLabel_do.getStyle().padding = "0px", e.yourEmailLabel_do.setInnerHTML("Your email:"), e.yourEmailInput_do = new FWDUVPDisplayObject("input"), e.yourEmailInput_do.setBackfaceVisibility(), e.yourEmailInput_do.getStyle().fontFamily = "Arial", e.yourEmailInput_do.getStyle().fontSize = "12px", e.yourEmailInput_do.getStyle().backgroundColor = e.inputBackgroundColor_str, e.yourEmailInput_do.getStyle().color = e.inputColor_str, e.yourEmailInput_do.getStyle().outline = 0, e.yourEmailInput_do.getStyle().whiteSpace = "nowrap", e.yourEmailInput_do.getStyle().fontSmoothing = "antialiased", e.yourEmailInput_do.getStyle().webkitFontSmoothing = "antialiased", e.yourEmailInput_do.getStyle().textRendering = "optimizeLegibility", e.yourEmailInput_do.getStyle().padding = "6px", e.yourEmailInput_do.getStyle().paddingTop = "4px", e.yourEmailInput_do.getStyle().paddingBottom = "4px", e.friendEmailLabel_do = new FWDUVPDisplayObject("div"), e.friendEmailLabel_do.setBackfaceVisibility(), e.friendEmailLabel_do.getStyle().fontFamily = "Arial", e.friendEmailLabel_do.getStyle().fontSize = "12px", e.friendEmailLabel_do.getStyle().color = e.secondaryLabelsColor_str, e.friendEmailLabel_do.getStyle().whiteSpace = "nowrap", e.friendEmailLabel_do.getStyle().fontSmoothing = "antialiased", e.friendEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased", e.friendEmailLabel_do.getStyle().textRendering = "optimizeLegibility", e.friendEmailLabel_do.getStyle().padding = "0px", e.friendEmailLabel_do.setInnerHTML("Your friend's email:"), e.friendEmailInput_do = new FWDUVPDisplayObject("input"), e.friendEmailInput_do.setBackfaceVisibility(), e.friendEmailInput_do.getStyle().fontFamily = "Arial", e.friendEmailInput_do.getStyle().fontSize = "12px", e.friendEmailInput_do.getStyle().backgroundColor = e.inputBackgroundColor_str, e.friendEmailInput_do.getStyle().color = e.inputColor_str, e.friendEmailInput_do.getStyle().outline = 0, e.friendEmailInput_do.getStyle().whiteSpace = "nowrap", e.friendEmailInput_do.getStyle().fontSmoothing = "antialiased", e.friendEmailInput_do.getStyle().webkitFontSmoothing = "antialiased", e.friendEmailInput_do.getStyle().textRendering = "optimizeLegibility", e.friendEmailInput_do.getStyle().padding = "6px", e.friendEmailInput_do.getStyle().paddingTop = "4px", e.friendEmailInput_do.getStyle().paddingBottom = "4px", FWDUVPSimpleSizeButton.setPrototype(), e.sendButton_do = new FWDUVPSimpleSizeButton(e.sendButtonNPath_str, e.sendButtonSPath_str, e.buttonWidth, e.buttonHeight), e.sendButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, e.sendClickHandler), e.infoText_do = new FWDUVPDisplayObject("div"), e.infoText_do.setBackfaceVisibility(), e.infoText_do.getStyle().fontFamily = "Arial", e.infoText_do.getStyle().fontSize = "12px", e.infoText_do.getStyle().color = e.secondaryLabelsColor_str, e.infoText_do.getStyle().whiteSpace = "nowrap", e.infoText_do.getStyle().fontSmoothing = "antialiased", e.infoText_do.getStyle().webkitFontSmoothing = "antialiased", e.infoText_do.getStyle().textRendering = "optimizeLegibility", e.infoText_do.getStyle().padding = "0px", e.infoText_do.getStyle().paddingTop = "4px", e.infoText_do.getStyle().textAlign = "center", e.infoText_do.getStyle().color = e.mainLabelsColor_str, FWDUVPSimpleButton.setPrototype(), e.closeButton_do = new FWDUVPSimpleButton(e.embedColoseN_img, c.embedWindowClosePathS_str), e.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.closeButtonOnMouseUpHandler), e.addChild(e.mainHolder_do), e.mainHolder_do.addChild(e.bk_do), e.linkAndEmbedHolder_do.addChild(e.linkAndEmbedHolderBk_do), e.linkAndEmbedHolder_do.addChild(e.embedAndLinkMainLabel_do), e.linkAndEmbedHolder_do.addChild(e.linkLabel_do), e.linkAndEmbedHolder_do.addChild(e.linkText_do), e.linkAndEmbedHolder_do.addChild(e.embedLabel_do), e.linkAndEmbedHolder_do.addChild(e.embedText_do), e.linkAndEmbedHolder_do.addChild(e.copyLinkButton_do), e.linkAndEmbedHolder_do.addChild(e.copyEmbedButton_do), e.sendMainHolder_do.addChild(e.sendMainHolderBk_do), e.sendMainHolder_do.addChild(e.sendMainLabel_do), e.sendMainHolder_do.addChild(e.yourEmailLabel_do), e.sendMainHolder_do.addChild(e.yourEmailInput_do), e.sendMainHolder_do.addChild(e.friendEmailLabel_do), e.sendMainHolder_do.addChild(e.friendEmailInput_do), e.sendMainHolder_do.addChild(e.sendButton_do), e.mainHolder_do.addChild(e.linkAndEmbedHolder_do), e.mainHolder_do.addChild(e.sendMainHolder_do), e.mainHolder_do.addChild(e.closeButton_do)
        }, this.closeButtonOnMouseUpHandler = function() {
            e.isShowed_bl && e.hide()
        }, this.showFlashButtonInstallError = function() {
            var a = "Please install Adobe Flash Player in order to use this feature! To copy text in the clipboard currently flash is the only safe option. <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Click here to install</a>. <br><br>The video link or embed code can be copyed by selecting the text, right click and copy.";
            e.dispatchEvent(b.ERROR, {
                error: a
            })
        }, this.positionAndResize = function() {
            e.stageWidth = d.stageWidth, d.displayType == FWDUVPlayer.FULL_SCREEN ? e.stageHeight = d.tempVidStageHeight : e.stageHeight = d.tempVidStageHeight, e.maxTextWidth = Math.min(e.stageWidth - 150, 500), e.totalWidth = e.maxTextWidth + e.buttonWidth + 40, e.isMobile_bl ? (e.linkText_do.setWidth(e.maxTextWidth + 52), e.embedText_do.setWidth(e.maxTextWidth + 52)) : (e.linkText_do.setWidth(e.maxTextWidth), e.embedText_do.setWidth(e.maxTextWidth)), e.positionFinal(), e.closeButton_do.setX(e.stageWidth - e.closeButton_do.w - e.embedWindowCloseButtonMargins), e.closeButton_do.setY(e.embedWindowCloseButtonMargins), e.setWidth(e.stageWidth), e.setHeight(e.stageHeight), e.mainHolder_do.setWidth(e.stageWidth), e.mainHolder_do.setHeight(e.stageHeight)
        }, this.positionFinal = function() {
            var a, b = !1;
            e.stageHeight < 360 || e.stageWidth < 350 ? (e.linkText_do.getStyle().whiteSpace = "nowrap", e.embedText_do.getStyle().whiteSpace = "nowrap") : (e.linkText_do.getStyle().whiteSpace = "normal", e.embedText_do.getStyle().whiteSpace = "normal"), e.linkLabel_do.screen.offsetHeight < 6 && (b = !0);
            var c;
            c = b ? Math.round(100 * e.embedAndLinkMainLabel_do.screen.getBoundingClientRect().height) : e.embedAndLinkMainLabel_do.getHeight(), e.embedAndLinkMainLabel_do.setX(16), e.linkLabel_do.setX(16), e.linkLabel_do.setY(c + 14);
            var d, f;
            b ? (d = Math.round(100 * e.linkLabel_do.screen.getBoundingClientRect().height), f = Math.round(100 * e.linkText_do.screen.getBoundingClientRect().height)) : (d = e.linkLabel_do.getHeight(), f = e.linkText_do.getHeight()), e.linkText_do.setX(10), e.linkText_do.setY(e.linkLabel_do.y + d + 5), e.isMobile_bl ? e.copyLinkButton_do.setX(-100) : e.copyLinkButton_do.setX(e.maxTextWidth + 30), e.copyLinkButton_do.setY(e.linkText_do.y + f - e.buttonHeight), e.embedLabel_do.setX(16), e.embedLabel_do.setY(e.copyLinkButton_do.y + e.copyLinkButton_do.h + 14);
            var g;
            g = b ? Math.round(100 * e.embedText_do.screen.getBoundingClientRect().height) : e.embedText_do.getHeight(), e.embedText_do.setX(10), e.embedText_do.setY(e.embedLabel_do.y + d + 5), e.isMobile_bl ? e.copyEmbedButton_do.setX(-100) : e.copyEmbedButton_do.setX(e.maxTextWidth + 30), e.copyEmbedButton_do.setY(e.embedText_do.y + g - e.buttonHeight), e.linkAndEmbedHolderBk_do.setY(e.linkLabel_do.y - 9), e.linkAndEmbedHolderBk_do.setWidth(e.totalWidth - 2), e.linkAndEmbedHolderBk_do.setHeight(e.embedText_do.y + g - 9), e.linkAndEmbedHolder_do.setWidth(e.totalWidth), e.linkAndEmbedHolder_do.setHeight(e.embedText_do.y + g + 14);
            var h, i;
            b ? (h = Math.round(100 * e.sendMainLabel_do.screen.getBoundingClientRect().height), i = Math.round(100 * e.yourEmailInput_do.screen.getBoundingClientRect().height)) : (h = e.sendMainLabel_do.getHeight(), i = e.yourEmailInput_do.getHeight()), e.sendMainLabel_do.setX(16), e.yourEmailLabel_do.setX(16), e.yourEmailLabel_do.setY(h + 14), e.stageWidth > 400 ? (e.yourEmailInput_do.setX(10), e.yourEmailInput_do.setWidth(parseInt(e.totalWidth - 52 - e.buttonWidth) / 2), e.yourEmailInput_do.setY(e.yourEmailLabel_do.y + d + 5), e.friendEmailLabel_do.setX(e.yourEmailInput_do.x + e.yourEmailInput_do.w + 26), e.friendEmailLabel_do.setY(e.yourEmailLabel_do.y), e.friendEmailInput_do.setX(e.yourEmailInput_do.x + e.yourEmailInput_do.w + 20), e.friendEmailInput_do.setWidth(parseInt((e.maxTextWidth - 30) / 2)), e.friendEmailInput_do.setY(e.yourEmailLabel_do.y + d + 5), e.sendButton_do.setX(e.friendEmailInput_do.x + e.yourEmailInput_do.w + 10), e.sendButton_do.setY(e.friendEmailInput_do.y + i - e.buttonHeight)) : (e.yourEmailInput_do.setX(10), e.yourEmailInput_do.setWidth(e.totalWidth - 32), e.yourEmailInput_do.setY(e.yourEmailLabel_do.y + d + 5), e.friendEmailLabel_do.setX(16), e.friendEmailLabel_do.setY(e.yourEmailInput_do.y + i + 14), e.friendEmailInput_do.setX(10), e.friendEmailInput_do.setY(e.friendEmailLabel_do.y + d + 5), e.friendEmailInput_do.setWidth(e.totalWidth - 32), e.sendButton_do.setX(e.totalWidth - e.buttonWidth - 10), e.sendButton_do.setY(e.friendEmailInput_do.y + i + 10)), e.sendMainHolderBk_do.setY(e.yourEmailLabel_do.y - 9), e.sendMainHolderBk_do.setWidth(e.totalWidth - 2), e.sendMainHolderBk_do.setHeight(e.sendButton_do.y + e.sendButton_do.h - 9), e.sendMainHolder_do.setWidth(e.totalWidth), e.sendMainHolder_do.setHeight(e.sendButton_do.y + e.sendButton_do.h + 14), a = b ? Math.round(100 * e.linkAndEmbedHolder_do.screen.getBoundingClientRect().height + 100 * e.sendMainHolder_do.screen.getBoundingClientRect().height) : e.linkAndEmbedHolder_do.getHeight() + e.sendMainHolder_do.getHeight(), e.linkAndEmbedHolder_do.setX(parseInt((e.stageWidth - e.totalWidth) / 2)), e.linkAndEmbedHolder_do.setY(parseInt((e.stageHeight - a) / 2) - 8), e.sendMainHolder_do.setX(parseInt((e.stageWidth - e.totalWidth) / 2)), b ? e.sendMainHolder_do.setY(Math.round(e.linkAndEmbedHolder_do.y + 100 * e.linkAndEmbedHolder_do.screen.getBoundingClientRect().height + 20)) : e.sendMainHolder_do.setY(e.linkAndEmbedHolder_do.y + e.linkAndEmbedHolder_do.getHeight() + 20)
        }, this.sendClickHandler = function() {
            var a = !1;
            if (!e.getValidEmail(e.yourEmailInput_do.screen.value)) {
                if (FWDAnimation.isTweening(e.yourEmailInput_do.screen)) return;
                FWDAnimation.to(e.yourEmailInput_do.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: !0,
                    repeat: 3
                }), a = !0
            }
            if (!e.getValidEmail(e.friendEmailInput_do.screen.value)) {
                if (FWDAnimation.isTweening(e.friendEmailInput_do.screen)) return;
                FWDAnimation.to(e.friendEmailInput_do.screen, .1, {
                    css: {
                        backgroundColor: "#FF0000"
                    },
                    yoyo: !0,
                    repeat: 3
                }), a = !0
            }
            a || e.sendEmail()
        }, this.sendEmail = function() {
            if (!e.isSending_bl) {
                e.isSending_bl = !0, e.xhr = new XMLHttpRequest, e.xhr.onreadystatechange = e.onChange, e.xhr.onerror = e.ajaxOnErrorHandler;
                try {
                    e.xhr.open("get", e.sendToAFriendPath_str + "?friendMail=" + e.friendEmailInput_do.screen.value + "&yourMail=" + e.yourEmailInput_do.screen.value + "&link=" + encodeURIComponent(e.linkToVideo_str), !0), e.xhr.send()
                } catch (b) {
                    e.showInfo("ERROR", !0), console && console.log(b), b.message && a.console && console.log(b.message)
                }
                e.resetInputs()
            }
        }, this.ajaxOnErrorHandler = function(b) {
            e.showInfo("ERROR", !0);
            try {
                a.console && console.log(b), a.console && console.log(b.message)
            } catch (a) {}
            e.isSending_bl = !1
        }, this.onChange = function(b) {
            4 == e.xhr.readyState && 200 == e.xhr.status && ("sent" == e.xhr.responseText ? e.showInfo("SENT") : (e.showInfo("ERROR", !0), a.console && console.log("Error The server can't send the email!")), e.isSending_bl = !1)
        }, this.resetInputs = function() {
            e.yourEmailInput_do.screen.value = "", e.friendEmailInput_do.screen.value = ""
        }, this.getValidEmail = function(a) {
            var b = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return !(!b.test(a) || "" == a)
        }, this.setEmbedData = function() {
            var a = location.href,
                b = location.protocol + "//" + location.host,
                c = location.pathname,
                f = location.hash,
                g = location.search,
                h = b + c;
            g = g.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, ""), a = a.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, ""), g ? f ? e.finalEmbedPath_str = h + g + "&RVPInstanceName=" + d.instanceName_str + "&RVPPlaylistId=" + d.catId + "&RVPVideoId=" + d.id + f : e.finalEmbedPath_str = h + g + "&RVPInstanceName=" + d.instanceName_str + "&RVPPlaylistId=" + d.catId + "&RVPVideoId=" + d.id : f ? e.finalEmbedPath_str = h + "?RVPInstanceName=" + d.instanceName_str + "&RVPPlaylistId=" + d.catId + "&RVPVideoId=" + d.id + f : e.finalEmbedPath_str = h + "?RVPInstanceName=" + d.instanceName_str + "&RVPPlaylistId=" + d.catId + "&RVPVideoId=" + d.id, f ? f.indexOf("playlistId=") == -1 ? e.linkToVideo_str = h + g + f + "&playlistId=" + d.catId + "&videoId=" + d.id : e.linkToVideo_str = a : e.linkToVideo_str = a + "#/?playlistId=" + d.catId + "&videoId=" + d.id, e.finalEmbedPath_str = encodeURI(e.finalEmbedPath_str), e.linkToVideo_str = encodeURI(e.linkToVideo_str), e.finalEmbedCode_str = "<iframe src='" + e.finalEmbedPath_str + "' width='" + d.stageWidth + "' height='" + d.stageHeight + "' frameborder='0' scrolling='no' allowfullscreen></iframe>", FWDUVPUtils.isIE ? (e.linkText_do.screen.innerText = e.linkToVideo_str, e.embedText_do.screen.innerText = e.finalEmbedCode_str) : (e.linkText_do.screen.textContent = e.linkToVideo_str, e.embedText_do.screen.textContent = e.finalEmbedCode_str)
        }, this.showInfo = function(a, b) {
            e.infoText_do.setInnerHTML(a),
                e.sendMainHolder_do.addChild(e.infoText_do), e.infoText_do.setWidth(e.buttonWidth), e.infoText_do.setHeight(e.buttonHeight - 4), e.infoText_do.setX(e.sendButton_do.x), e.infoText_do.setY(e.sendButton_do.y - 23), e.infoText_do.setAlpha(0), b ? e.infoText_do.getStyle().color = "#FF0000" : e.infoText_do.getStyle().color = e.mainLabelsColor_str, FWDAnimation.killTweensOf(e.infoText_do), FWDAnimation.to(e.infoText_do, .16, {
                    alpha: 1,
                    yoyo: !0,
                    repeat: 7
                })
        }, this.show = function(a) {
            e.isShowed_bl || (e.isShowed_bl = !0, d.main_do.addChild(e), e.resetInputs(), e.setEmbedData(), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && d.main_do.setSelectable(!0), e.positionAndResize(), clearTimeout(e.hideCompleteId_to), clearTimeout(e.showCompleteId_to), e.mainHolder_do.setY(-e.stageHeight), e.showCompleteId_to = setTimeout(e.showCompleteHandler, 900), setTimeout(function() {
                FWDAnimation.to(e.mainHolder_do, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100))
        }, this.showCompleteHandler = function() {}, this.hide = function() {
            e.isShowed_bl && (e.isShowed_bl = !1, d.customContextMenu_do && d.customContextMenu_do.enable(), e.positionAndResize(), clearTimeout(e.hideCompleteId_to), clearTimeout(e.showCompleteId_to), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && d.main_do.setSelectable(!1), e.hideCompleteId_to = setTimeout(e.hideCompleteHandler, 800), FWDAnimation.killTweensOf(e.mainHolder_do), FWDAnimation.to(e.mainHolder_do, .8, {
                y: -e.stageHeight,
                ease: Expo.easeInOut
            }))
        }, this.hideCompleteHandler = function() {
            d.main_do.removeChild(e), e.dispatchEvent(b.HIDE_COMPLETE)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.ERROR = "error", b.HIDE_COMPLETE = "hideComplete", b.prototype = null, a.FWDUVPEmbedWindow = b
}(window),
function() {
    var a = function() {
        this.listeners = {
            events_ar: []
        }, this.addListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function.");
            var c = {};
            c.type = a, c.listener = b, c.target = this, this.listeners.events_ar.push(c)
        }, this.dispatchEvent = function(a, b) {
            if (null != this.listeners) {
                if (void 0 == a) throw Error("type is required.");
                if ("object" == typeof a) throw Error("type must be of type String.");
                for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                    if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a) {
                        if (b)
                            for (var e in b) this.listeners.events_ar[c][e] = b[e];
                        this.listeners.events_ar[c].listener.call(this, this.listeners.events_ar[c])
                    }
            }
        }, this.removeListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function." + a);
            for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a && this.listeners.events_ar[c].listener === b) {
                    this.listeners.events_ar.splice(c, 1);
                    break
                }
        }, this.destroy = function() {
            this.listeners = null, this.addListener = null, this.dispatchEvent = null, this.removeListener = null
        }
    };
    window.FWDUVPEventDispatcher = a
}(window),
function(a) {
    var b = function(a, c, d, e, f, g, h, i, j, k) {
        var l = this;
        b.prototype;
        this.nImg_img = null, this.sImg_img = null, this.n_do, this.s_do, this.nImgPath_str = a, this.sImgPath_str = c, this.flashPath_str = d, this.flashButtonName_str = e, this.overPath_str = f, this.outPath_str = g, this.clickPath_str = h, this.copyPath_str = i, this.linkFlashObject = null, this.buttonWidth = j, this.buttonHeight = k, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.isDisabled_bl = !1, this.init = function() {
            l.setWidth(l.buttonWidth), l.setHeight(l.buttonHeight), l.isMobile_bl || (l.setupMainContainers(), l.setupFalshButton(), l.setButtonMode(!0))
        }, this.setupMainContainers = function() {
            l.n_do = new FWDUVPDisplayObject("img");
            var a = new Image;
            a.src = l.nImgPath_str, l.n_do.setScreen(a), l.n_do.setWidth(l.buttonWidth), l.n_do.setHeight(l.buttonHeight), l.addChild(l.n_do), l.s_do = new FWDUVPDisplayObject("img");
            var b = new Image;
            b.src = l.sImgPath_str, l.s_do.setScreen(b), l.s_do.setWidth(l.buttonWidth), l.s_do.setHeight(l.buttonHeight), l.s_do.setAlpha(0), l.addChild(l.s_do), l.screen.addEventListener ? (l.screen.addEventListener("mouseover", l.onMouseOver), l.screen.addEventListener("mouseout", l.onMouseOut), l.screen.addEventListener("mouseup", l.onMouseUp)) : l.screen.attachEvent && (l.screen.attachEvent("onmouseover", l.onMouseOver), l.screen.attachEvent("onmouseout", l.onMouseOut), l.screen.attachEvent("onmouseup", l.onMouseUp))
        }, this.onMouseOver = function(a) {
            if (!a.pointerType || "mouse" == a.pointerType) {
                if (l.isDisabled_bl || l.isSelectedFinal_bl) return;
                l.setSelectedState()
            }
        }, this.onMouseOut = function(a) {
            a.pointerType && "mouse" != a.pointerType || l.setNormalState()
        }, this.onMouseUp = function(a) {
            FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18") || (a.preventDefault && a.preventDefault(), l.isDisabled_bl || 2 == a.button || l.dispatchEvent(b.CLICK))
        }, this.setupFalshButton = function() {
            if (FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) {
                var a = '<object id="' + l.flashButtonName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + l.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + l.clickPath_str + "&overPath_str=" + l.overPath_str + "&outPath_str=" + l.outPath_str + "&copyPath_str=" + l.copyPath_str + '"/><object type="application/x-shockwave-flash" data="' + l.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + l.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + l.clickPath_str + "&overPath_str=" + l.overPath_str + "&outPath_str=" + l.outPath_str + "&copyPath_str=" + l.copyPath_str + '"/></object></object>',
                    b = new FWDUVPDisplayObject("div");
                b.setBackfaceVisibility(), b.setResizableSizeAfterParent(), b.screen.innerHTML = a, l.addChild(b), l.linkFlashObject = b.screen.firstChild, FWDUVPUtils.isIE || (l.linkFlashObject = l.linkFlashObject.getElementsByTagName("object")[0])
            }
        }, this.setNormalState = function() {
            FWDAnimation.killTweensOf(l.s_do), FWDAnimation.to(l.s_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        }, this.setSelectedState = function() {
            FWDAnimation.killTweensOf(l.s_do), FWDAnimation.to(l.s_do, .5, {
                alpha: 1,
                ease: Expo.easeOut
            })
        }, l.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPDisplayObject("div")
    }, b.CLICK = "onClick", b.prototype = null, a.FWDUVPFlashButton = b
}(window);
var FWDUVPFlashTest = function() {
    function n(a) {
        var b = k.pv,
            c = a.split(".");
        return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2]
    }
    var a = "undefined",
        b = "object",
        c = "Shockwave Flash",
        d = "ShockwaveFlash.ShockwaveFlash",
        e = "application/x-shockwave-flash",
        f = window,
        g = document,
        h = navigator,
        i = !1,
        k = function() {
            var j = typeof g.getElementById != a && typeof g.getElementsByTagName != a && typeof g.createElement != a,
                k = h.userAgent.toLowerCase(),
                l = h.platform.toLowerCase(),
                m = l ? /win/.test(l) : /win/.test(k),
                n = l ? /mac/.test(l) : /mac/.test(k),
                o = !!/webkit/.test(k) && parseFloat(k.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                p = !1,
                q = [0, 0, 0],
                r = null;
            if (typeof h.plugins != a && typeof h.plugins[c] == b) r = h.plugins[c].description, !r || typeof h.mimeTypes != a && h.mimeTypes[e] && !h.mimeTypes[e].enabledPlugin || (i = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
            else if (typeof f.ActiveXObject != a) try {
                var s = new ActiveXObject(d);
                s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
            } catch (a) {}
            return {
                w3: j,
                pv: q,
                wk: o,
                ie: p,
                win: m,
                mac: n
            }
        }();
    return {
        hasFlashPlayerVersion: n
    }
}();
! function(a) {
    var b = function(c, d, e) {
        var f = this,
            g = b.prototype;
        this.screenToTest = c, this.screenToTest2 = d, this.hideDelay = e, this.globalX = 0, this.globalY = 0, this.currentTime, this.checkIntervalId_int, this.hideCompleteId_to, this.hasInitialTestEvents_bl = !1, this.addSecondTestEvents_bl = !1, this.dispatchOnceShow_bl = !0, this.dispatchOnceHide_bl = !1, this.isStopped_bl = !0, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, f.init = function() {}, f.start = function() {
            f.currentTime = (new Date).getTime(), clearInterval(f.checkIntervalId_int), f.checkIntervalId_int = setInterval(f.update, 100), f.addMouseOrTouchCheck(), f.isStopped_bl = !1
        }, f.stop = function() {
            clearInterval(f.checkIntervalId_int), f.isStopped_bl = !0, f.removeMouseOrTouchCheck(), f.removeMouseOrTouchCheck2()
        }, f.addMouseOrTouchCheck = function() {
            f.hasInitialTestEvents_bl || (f.hasInitialTestEvents_bl = !0, f.isMobile_bl ? f.hasPointerEvent_bl ? (f.screenToTest.screen.addEventListener("pointerdown", f.onMouseOrTouchUpdate), f.screenToTest.screen.addEventListener("MSPointerMove", f.onMouseOrTouchUpdate)) : f.screenToTest.screen.addEventListener("touchstart", f.onMouseOrTouchUpdate) : a.addEventListener ? a.addEventListener("mousemove", f.onMouseOrTouchUpdate) : document.attachEvent && document.attachEvent("onmousemove", f.onMouseOrTouchUpdate))
        }, f.removeMouseOrTouchCheck = function() {
            f.hasInitialTestEvents_bl && (f.hasInitialTestEvents_bl = !1, f.isMobile_bl ? f.hasPointerEvent_bl ? (f.screenToTest.screen.removeEventListener("pointerdown", f.onMouseOrTouchUpdate), f.screenToTest.screen.removeEventListener("MSPointerMove", f.onMouseOrTouchUpdate)) : f.screenToTest.screen.removeEventListener("touchstart", f.onMouseOrTouchUpdate) : a.removeEventListener ? a.removeEventListener("mousemove", f.onMouseOrTouchUpdate) : document.detachEvent && document.detachEvent("onmousemove", f.onMouseOrTouchUpdate))
        }, f.addMouseOrTouchCheck2 = function() {
            f.addSecondTestEvents_bl || (f.addSecondTestEvents_bl = !0, f.screenToTest.screen.addEventListener ? f.screenToTest.screen.addEventListener("mousemove", f.secondTestMoveDummy) : f.screenToTest.screen.attachEvent && f.screenToTest.screen.attachEvent("onmousemove", f.secondTestMoveDummy))
        }, f.removeMouseOrTouchCheck2 = function() {
            f.addSecondTestEvents_bl && (f.addSecondTestEvents_bl = !1, f.screenToTest.screen.removeEventListener ? f.screenToTest.screen.removeEventListener("mousemove", f.secondTestMoveDummy) : f.screenToTest.screen.detachEvent && f.screenToTest.screen.detachEvent("onmousemove", f.secondTestMoveDummy))
        }, this.secondTestMoveDummy = function() {
            f.removeMouseOrTouchCheck2(), f.addMouseOrTouchCheck()
        }, f.onMouseOrTouchUpdate = function(a) {
            var b = FWDUVPUtils.getViewportMouseCoordinates(a);
            f.globalX != b.screenX && f.globalY != b.screenY && (f.currentTime = (new Date).getTime()), f.globalX = b.screenX, f.globalY = b.screenY, f.isMobile_bl || FWDUVPUtils.hitTest(f.screenToTest.screen, f.globalX, f.globalY) || (f.removeMouseOrTouchCheck(), f.addMouseOrTouchCheck2())
        }, f.update = function(a) {
            (new Date).getTime() > f.currentTime + f.hideDelay ? f.dispatchOnceShow_bl && (f.dispatchOnceHide_bl = !0, f.dispatchOnceShow_bl = !1, f.dispatchEvent(b.HIDE), clearTimeout(f.hideCompleteId_to), f.hideCompleteId_to = setTimeout(function() {
                f.dispatchEvent(b.HIDE_COMPLETE)
            }, 1e3)) : f.dispatchOnceHide_bl && (clearTimeout(f.hideCompleteId_to), f.dispatchOnceHide_bl = !1, f.dispatchOnceShow_bl = !0, f.dispatchEvent(b.SHOW))
        }, f.reset = function() {
            clearTimeout(f.hideCompleteId_to), f.currentTime = (new Date).getTime(), f.dispatchEvent(b.SHOW)
        }, f.destroy = function() {
            f.removeMouseOrTouchCheck(), clearInterval(f.checkIntervalId_int), f.screenToTest = null, c = null, f.init = null, f.start = null, f.stop = null, f.addMouseOrTouchCheck = null, f.removeMouseOrTouchCheck = null, f.onMouseOrTouchUpdate = null, f.update = null, f.reset = null, f.destroy = null, g.destroy(), g = null, f = null, b.prototype = null
        }, f.init()
    };
    b.HIDE = "hide", b.SHOW = "show", b.HIDE_COMPLETE = "hideComplete", b.setPrototype = function() {
        b.prototype = new FWDUVPEventDispatcher
    }, a.FWDUVPHider = b
}(window),
function(a) {
    var b = function(a, c) {
        var d = this;
        b.prototype;
        this.bk_do = null, this.textHolder_do = null, this.warningIconPath_str = c, this.show_to = null, this.isShowed_bl = !1, this.isShowedOnce_bl = !1, this.allowToRemove_bl = !0, this.init = function() {
            d.setResizableSizeAfterParent(), d.bk_do = new FWDUVPDisplayObject("div"), d.bk_do.setAlpha(.6), d.bk_do.setBkColor("#000000"), d.addChild(d.bk_do), d.textHolder_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIEAndLessThen9 || (d.textHolder_do.getStyle().font = "Arial"), d.textHolder_do.getStyle().wordWrap = "break-word", d.textHolder_do.getStyle().padding = "10px", d.textHolder_do.getStyle().paddingLeft = "42px", d.textHolder_do.getStyle().lineHeight = "18px", d.textHolder_do.getStyle().color = "#000000", d.textHolder_do.setBkColor("#EEEEEE");
            var a = new Image;
            a.src = this.warningIconPath_str, this.img_do = new FWDUVPDisplayObject("img"), this.img_do.setScreen(a), this.img_do.setWidth(28), this.img_do.setHeight(28), d.addChild(d.textHolder_do), d.addChild(d.img_do)
        }, this.showText = function(a) {
            d.isShowedOnce_bl || (d.screen.addEventListener ? d.screen.addEventListener("click", d.closeWindow) : d.screen.attachEvent && d.screen.attachEvent("onclick", d.closeWindow), d.isShowedOnce_bl = !0), d.setVisible(!1), d.textHolder_do.getStyle().paddingBottom = "10px", d.textHolder_do.setInnerHTML(a), clearTimeout(d.show_to), d.show_to = setTimeout(d.show, 60), setTimeout(function() {
                d.positionAndResize()
            }, 10)
        }, this.show = function() {
            var b = Math.min(640, a.stageWidth - 120);
            d.isShowed_bl = !0, d.textHolder_do.setWidth(b), setTimeout(function() {
                d.setVisible(!0), d.positionAndResize()
            }, 100)
        }, this.positionAndResize = function() {
            var b = d.textHolder_do.getWidth(),
                c = d.textHolder_do.getHeight(),
                e = parseInt((a.stageWidth - b) / 2),
                f = parseInt((a.stageHeight - c) / 2);
            d.bk_do.setWidth(a.stageWidth), d.bk_do.setHeight(a.stageHeight), d.textHolder_do.setX(e), d.textHolder_do.setY(f), d.img_do.setX(e + 6), d.img_do.setY(f + parseInt((d.textHolder_do.getHeight() - d.img_do.h) / 2))
        }, this.closeWindow = function() {
            if (d.allowToRemove_bl) {
                d.isShowed_bl = !1, clearTimeout(d.show_to);
                try {
                    a.main_do.removeChild(d)
                } catch (a) {}
            }
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div", "relative")
    }, b.prototype = null, a.FWDUVPInfo = b
}(window),
function(a) {
    var b = function(a, c) {
        var d = this;
        b.prototype;
        this.xhr = null, this.embedColoseN_img = c.embedColoseN_img, this.mainBk_do = null, this.mainHolder_do = null, this.mainTextHolder_do = null, this.text_do = null, this.bk_do = null, this.closeButton_do = null, this.embedWindowBackground_str = c.embedWindowBackground_str, this.embedWindowInputBackgroundPath_str = c.embedWindowInputBackgroundPath_str, this.secondaryLabelsColor_str = c.secondaryLabelsColor_str, this.inputColor_str = c.inputColor_str, this.sendButtonNPath_str = c.sendButtonNPath_str, this.sendButtonSPath_str = c.sendButtonSPath_str, this.inputBackgroundColor_str = c.inputBackgroundColor_str, this.borderColor_str = c.borderColor_str, this.sendToAFriendPath_str = c.sendToAFriendPath_str, this.maxTextWidth = 0, this.totalWidth = 0, this.stageWidth = 0, this.stageHeight = 0, this.buttonWidth = 44, this.buttonHeight = 19, this.embedWindowCloseButtonMargins = c.embedWindowCloseButtonMargins, this.finalEmbedPath_str = null, this.finalEmbedCode_str = null, this.linkToVideo_str = null, this.shareAndEmbedTextColor_str = c.shareAndEmbedTextColor_str, this.isYTB_bl = !1, this.isShowed_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            d.setBackfaceVisibility(), d.mainHolder_do = new FWDUVPDisplayObject("div"), d.mainBk_do = new FWDUVPDisplayObject("div"), d.mainBk_do.getStyle().width = "100%", d.mainBk_do.getStyle().height = "100%", d.mainBk_do.setAlpha(.9), d.mainBk_do.getStyle().background = "url('" + d.embedWindowBackground_str + "')", d.mainTextHolder_do = new FWDUVPDisplayObject("div", "absolute"), d.bk_do = new FWDUVPDisplayObject("div"), d.bk_do.getStyle().background = "url('" + d.embedWindowBackground_str + "')", d.bk_do.getStyle().borderStyle = "solid", d.bk_do.getStyle().borderWidth = "1px", d.bk_do.getStyle().borderColor = d.borderColor_str, d.text_do = new FWDUVPDisplayObject("div", "relative"), d.text_do.hasTransform3d_bl = !1, d.text_do.hasTransform2d_bl = !1, d.text_do.getStyle().fontFamily = "Arial", d.text_do.getStyle().fontSize = "12px", d.text_do.getStyle().fontSmoothing = "antialiased", d.text_do.getStyle().webkitFontSmoothing = "antialiased", d.text_do.getStyle().textRendering = "optimizeLegibility", FWDUVPSimpleSizeButton.setPrototype(), d.closeButton_do = new FWDUVPSimpleSizeButton(d.embedColoseN_img.src, c.embedWindowClosePathS_str, d.embedColoseN_img.width, d.embedColoseN_img.height), d.closeButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, d.closeButtonOnMouseUpHandler), d.mainHolder_do.addChild(d.mainBk_do), d.mainTextHolder_do.addChild(d.bk_do), d.mainTextHolder_do.addChild(d.text_do), d.mainHolder_do.addChild(d.mainTextHolder_do), d.addChild(d.mainHolder_do), d.mainHolder_do.addChild(d.closeButton_do)
        }, this.closeButtonOnMouseUpHandler = function() {
            d.isShowed_bl && d.hide()
        }, this.positionAndResize = function() {
            d.stageWidth = a.stageWidth, a.displayType == FWDUVPlayer.FULL_SCREEN ? d.stageHeight = a.tempVidStageHeight : d.stageHeight = a.tempVidStageHeight, d.maxTextWidth = Math.min(d.stageWidth - 150, 500), d.totalWidth = d.maxTextWidth + d.buttonWidth + 40, d.positionFinal(), d.closeButton_do.setX(d.stageWidth - d.closeButton_do.w - d.embedWindowCloseButtonMargins), d.closeButton_do.setY(d.embedWindowCloseButtonMargins), d.setWidth(d.stageWidth), d.setHeight(d.stageHeight), d.mainHolder_do.setWidth(d.stageWidth), d.mainHolder_do.setHeight(d.stageHeight)
        }, this.positionFinal = function() {
            var a, b = !1;
            d.mainTextHolder_do.setWidth(d.totalWidth), a = b ? Math.round(100 * d.mainTextHolder_do.screen.getBoundingClientRect().height) : d.mainTextHolder_do.getHeight(), d.bk_do.setWidth(d.totalWidth - 2), d.bk_do.setHeight(a - 2), d.mainTextHolder_do.setX(parseInt((d.stageWidth - d.totalWidth) / 2)), d.mainTextHolder_do.setY(parseInt((d.stageHeight - a) / 2) - 8)
        }, this.show = function(b) {
            d.isShowed_bl || (d.isShowed_bl = !0, a.main_do.addChild(d), d.text_do.setInnerHTML(b), d.positionAndResize(), clearTimeout(d.hideCompleteId_to), clearTimeout(d.showCompleteId_to), d.mainHolder_do.setY(-d.stageHeight), d.showCompleteId_to = setTimeout(d.showCompleteHandler, 900), setTimeout(function() {
                FWDAnimation.to(d.mainHolder_do, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100))
        }, this.showCompleteHandler = function() {}, this.hide = function() {
            d.isShowed_bl && (d.isShowed_bl = !1, a.customContextMenu_do && a.customContextMenu_do.enable(), d.positionAndResize(), clearTimeout(d.hideCompleteId_to), clearTimeout(d.showCompleteId_to), d.hideCompleteId_to = setTimeout(d.hideCompleteHandler, 800), FWDAnimation.killTweensOf(d.mainHolder_do), FWDAnimation.to(d.mainHolder_do, .8, {
                y: -d.stageHeight,
                ease: Expo.easeInOut
            }))
        }, this.hideCompleteHandler = function() {
            a.main_do.removeChild(d), d.dispatchEvent(b.HIDE_COMPLETE)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.ERROR = "error", b.HIDE_COMPLETE = "hideComplete", b.prototype = null, a.FWDUVPInfoWindow = b
}(window),
function(a) {
    var b = function(c) {
        var d = this;
        b.instaces_ar.push(this), this.isInstantiate_bl = !1, this.displayType = c.displayType || b.RESPONSIVE, d.displayType.toLowerCase() != b.RESPONSIVE && d.displayType.toLowerCase() != b.FULL_SCREEN && (d.displayType = b.RESPONSIVE), this.maxWidth = c.maxWidth || 640, this.maxHeight = c.maxHeight || 380, this.embeddedPlaylistId, this.embeddedVideoId, this.isEmbedded_bl = !1, this.useYoutube_bl = c.useYoutube || "no", this.useYoutube_bl = "yes" == d.useYoutube_bl, this.useVimeo_bl = c.useVimeo || "no", this.useVimeo_bl = "yes" == d.useVimeo_bl, d.mainFolderPath_str = c.mainFolderPath, d.mainFolderPath_str.lastIndexOf("/") + 1 != d.mainFolderPath_str.length && (d.mainFolderPath_str += "/"), this.skinPath_str = c.skinPath, d.skinPath_str.lastIndexOf("/") + 1 != d.skinPath_str.length && (d.skinPath_str += "/"), this.warningIconPath_str = d.mainFolderPath_str + this.skinPath_str + "warningIcon.png", b.YTAPIReady = !1, d.init = function() {
            if (!d.isInstantiate_bl) {
                if (FWDTweenLite.ticker.useRAF(!1), this.props_obj = c, this.mustHaveHolderDiv_bl = !1, this.instanceName_str = this.props_obj.instanceName, !this.instanceName_str) return void alert("FWDUVPlayer instance name is required please make sure that the instanceName parameter exsists and it's value is uinique.");
                if (a[this.instanceName_str]) return void alert("FWDUVPlayer instance name " + this.instanceName_str + " is already defined and contains a different instance reference, set a different instance name.");
                if (a[this.instanceName_str] = this, !this.props_obj) return void alert("FWDUVPlayer constructor properties object is not defined!");
                if (!this.props_obj.parentId) return void alert("Property parentId is not defined in the FWDUVPlayer constructor, self property represents the div id into which the megazoom is added as a child!");
                if (d.displayType == b.RESPONSIVE && (d.mustHaveHolderDiv_bl = !0), d.mustHaveHolderDiv_bl && !FWDUVPUtils.getChildById(d.props_obj.parentId)) return void alert("FWDUVPlayer holder div is not found, please make sure that the div exsists and the id is correct! " + d.props_obj.parentId);
                this.body = document.getElementsByTagName("body")[0], this.stageContainer = null, this.isEmbedded_bl && (this.displayType = b.FULL_SCREEN), d.displayType == b.FULL_SCREEN ? (a.scrollTo(0, 0), FWDUVPUtils.isIEAndLessThen9 ? d.stageContainer = d.body : d.stageContainer = document.documentElement) : this.stageContainer = FWDUVPUtils.getChildById(d.props_obj.parentId), this.listeners = {
                    events_ar: []
                }, this.customContextMenu_do = null, this.info_do = null, this.categories_do = null, this.playlist_do = null, this.main_do = null, this.ytb_do = null, this.preloader_do = null, this.controller_do = null, this.videoScreen_do = null, this.flash_do = null, this.flashObject = null, this.videoPoster_do = null, this.largePlayButton_do = null, this.hider = null, this.videoHolder_do = null, this.videoHider_do = null, this.disableClick_do = null, this.embedWindow_do = null, this.spaceBetweenControllerAndPlaylist = d.props_obj.spaceBetweenControllerAndPlaylist || 1, this.autoScale_bl = d.props_obj.autoScale, this.autoScale_bl = "yes" == d.autoScale_bl, this.backgroundColor_str = d.props_obj.backgroundColor || "transparent", this.videoBackgroundColor_str = d.props_obj.videoBackgroundColor || "transparent", this.flashObjectMarkup_str = null, this.lastX = 0, this.lastY = 0, this.tempStageWidth = 0, this.tempStageHeight = 0, this.tempVidStageWidth = 0, this.tempVidStageHeight = 0, this.stageWidth = 0, this.stageHeight = 0, this.vidStageWidth = 0, this.vidStageHeight = 0, this.firstTapX, this.firstTapY, this.curTime, this.totalTime, this.catId = -1, this.id = -1, this.totalVideos = 0, this.prevCatId = -1, this.videoSourcePath_str = "", this.prevVideoSourcePath_str, this.posterPath_str = d.props_obj.posterPath, this.videoType_str, this.videoStartBehaviour_str, this.prevVideoSource_str, this.prevPosterSource_str, this.finalVideoPath_str, this.playListThumbnailWidth = d.props_obj.thumbnailWidth || 80, this.playListThumbnailHeight = d.props_obj.thumbnailHeight || 80, this.playlistWidth = d.props_obj.playlistRightWidth || 250, this.playlistHeight = 0, this.resizeHandlerId_to, this.resizeHandler2Id_to, this.hidePreloaderId_to, this.orientationChangeId_to, this.disableClickId_to, this.clickDelayId_to, this.secondTapId_to, this.videoHiderId_to, this.showPlaylistButtonAndPlaylist_bl = d.props_obj.showPlaylistButtonAndPlaylist, this.showPlaylistButtonAndPlaylist_bl = "no" != d.showPlaylistButtonAndPlaylist_bl, this.isPlaylistShowed_bl = d.props_obj.showPlaylistByDefault, this.isPlaylistShowed_bl = "no" != d.isPlaylistShowed_bl, this.isVideoPlayingWhenOpenWindows_bl = !1, this.isFirstPlaylistLoaded_bl = !1, this.isVideoHiderShowed_bl = !1, this.isSpaceDown_bl = !1, this.isPlaying_bl = !1, this.firstTapPlaying_bl = !1, this.stickOnCurrentInstanceKey_bl = !1, this.isFullScreen_bl = !1, this.isFlashScreenReady_bl = !1, this.orintationChangeComplete_bl = !0, this.disableClick_bl = !1, this.isAPIReady_bl = !1, this.isInstantiate_bl = !0, this.isPlaylistLoaded_bl = !1, this.isPlaylistLoadedFirstTime_bl = !1, this.useDeepLinking_bl = d.props_obj.useDeepLinking, this.useDeepLinking_bl = "yes" == d.useDeepLinking_bl, this.isAdd_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.setupMainDo(), this.startResizeHandler(), this.setupInfo(), this.setupData()
            }
        }, d.setupMainDo = function() {
            d.main_do = new FWDUVPDisplayObject("div", "relative"), d.main_do.getStyle().msTouchAction = "none", d.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)", d.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)", d.main_do.getStyle().width = "100%", d.main_do.getStyle().height = "100%", d.main_do.setBackfaceVisibility(), d.main_do.setBkColor(d.backgroundColor_str), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && d.main_do.setSelectable(!1), d.videoHolder_do = new FWDUVPDisplayObject("div"), d.main_do.addChild(d.videoHolder_do), d.stageContainer.style.overflow = "hidden", d.displayType == b.FULL_SCREEN ? (d.main_do.getStyle().position = "absolute", document.documentElement.appendChild(d.main_do.screen), d.main_do.getStyle().zIndex = 9999999999998) : d.stageContainer.appendChild(d.main_do.screen)
        }, d.setupInfo = function() {
            FWDUVPInfo.setPrototype(), d.info_do = new FWDUVPInfo(d, d.warningIconPath_str)
        }, d.startResizeHandler = function() {
            a.addEventListener ? a.addEventListener("resize", d.onResizeHandler) : a.attachEvent && a.attachEvent("onresize", d.onResizeHandler), d.onResizeHandler(!0), d.resizeHandlerId_to = setTimeout(function() {
                d.resizeHandler()
            }, 500)
        }, d.stopResizeHandler = function() {
            a.removeEventListener ? a.removeEventListener("resize", d.onResizeHandler) : a.detachEvent && a.detachEvent("onresize", d.onResizeHandler), clearTimeout(d.resizeHandlerId_to)
        }, d.onResizeHandler = function(a) {
            d.resizeHandler(), clearTimeout(d.resizeHandler2Id_to), d.resizeHandler2Id_to = setTimeout(function() {
                d.resizeHandler()
            }, 300)
        }, d.resizeHandler = function(a, c) {
            d.tempPlaylistPosition_str;
            var e = FWDUVPUtils.getViewportSize();
            d.isFullScreen_bl || d.displayType == b.FULL_SCREEN ? (d.main_do.setX(0), d.main_do.setY(0), d.stageWidth = e.w, d.stageHeight = e.h) : (d.stageContainer.style.width = "100%", d.stageContainer.offsetWidth > d.maxWidth && (d.stageContainer.style.width = d.maxWidth + "px"), d.stageWidth = d.stageContainer.offsetWidth, d.autoScale_bl ? d.stageHeight = parseInt(d.maxHeight * (d.stageWidth / d.maxWidth)) : d.stageHeight = d.maxHeight), FWDUVPUtils.isIEAndLessThen9 && d.stageWidth < 400 && (d.stageWidth = 400), d.stageHeight < 320 && (d.stageHeight = 320), d.stageHeight > e.h && d.isFullScreen_bl && (d.stageHeight = e.h), d.data && d.playlist_do && (d.playlistHeight = parseInt(d.data.playlistBottomHeight * (d.stageWidth / d.maxWidth)), d.playlistHeight < 300 && (d.playlistHeight = 300)), d.data && (d.tempPlaylistPosition_str = d.data.playlistPosition_str, d.stageWidth < 600 && (d.tempPlaylistPosition_str = "bottom"), d.playlistPosition_str = d.tempPlaylistPosition_str, d.playlist_do && (d.playlist_do.position_str = d.tempPlaylistPosition_str)), d.playlist_do && d.isPlaylistShowed_bl ? "bottom" == d.playlistPosition_str ? (d.vidStageWidth = d.stageWidth, d.stageHeight += d.playlistHeight + d.spaceBetweenControllerAndPlaylist, d.vidStageHeight = d.stageHeight - d.playlistHeight - d.spaceBetweenControllerAndPlaylist, d.displayType == b.FULL_SCREEN && d.controller_do.disablePlaylistButton()) : "right" == d.playlistPosition_str && (d.isFullScreen_bl ? d.vidStageWidth = d.stageWidth : d.vidStageWidth = d.stageWidth - d.playlistWidth - d.spaceBetweenControllerAndPlaylist, d.controller_do && d.controller_do.enablePlaylistButton(), d.vidStageHeight = d.stageHeight) : (d.vidStageWidth = d.stageWidth, d.vidStageHeight = d.stageHeight), d.controller_do && d.playlist_do && ("right" == d.playlistPosition_str ? d.isFullScreen_bl ? d.controller_do.disablePlaylistButton() : d.controller_do.enablePlaylistButton() : d.isEmbedded_bl && d.controller_do.disablePlaylistButton()), a && !d.isMobile_bl || (FWDAnimation.killTweensOf(d), d.tempStageWidth = d.stageWidth, d.tempStageHeight = d.stageHeight, d.tempVidStageWidth = d.vidStageWidth, d.tempVidStageHeight = Math.max(0, d.vidStageHeight), d.resizeFinal(c))
        }, this.resizeFinal = function(a) {
            d.stageContainer.style.height = d.tempStageHeight + "px", d.main_do.setWidth(d.tempStageWidth), d.showPlaylistButtonAndPlaylist_bl && d.isPlaylistShowed_bl && "bottom" == d.playlistPosition_str ? d.main_do.setHeight(d.tempStageHeight) : d.main_do.setHeight(d.tempStageHeight), d.videoHolder_do.setWidth(d.tempVidStageWidth), d.videoHolder_do.setHeight(d.tempVidStageHeight), d.isFlashScreenReady_bl && d.videoType_str == b.VIDEO && (d.flash_do.setWidth(d.tempVidStageWidth), d.flash_do.setHeight(d.tempVidStageHeight)), d.ytb_do && d.videoType_str == b.YOUTUBE && (d.ytb_do.setWidth(d.tempVidStageWidth), d.ytb_do.setHeight(d.tempVidStageHeight)), d.logo_do && d.logo_do.positionAndResize(), d.playlist_do && !FWDAnimation.isTweening(d) && (d.isMobile_bl ? d.playlist_do.resizeAndPosition(!1) : d.playlist_do.resizeAndPosition(a)), d.controller_do && d.controller_do.resizeAndPosition(), d.categories_do && d.categories_do.resizeAndPosition(), d.videoScreen_do && d.videoType_str == b.VIDEO && d.videoScreen_do.resizeAndPosition(d.tempVidStageWidth, d.tempVidStageHeight), d.ytb_do && d.ytb_do.ytb && d.videoType_str == b.YOUTUBE && d.ytb_do.resizeAndPosition(), d.vimeo_do && d.videoType_str == b.VIMEO && d.vimeo_do.resizeAndPosition(), d.preloader_do && d.positionPreloader(), d.dumyClick_do && (d.dumyClick_do.setWidth(d.tempVidStageWidth), d.isMobile_bl ? d.dumyClick_do.setHeight(d.tempVidStageHeight) : d.videoType_str == b.YOUTUBE ? d.dumyClick_do.setHeight(d.tempVidStageHeight - 93) : d.dumyClick_do.setHeight(d.tempVidStageHeight)), d.videoHider_do && d.resizeVideoHider(), d.largePlayButton_do && d.positionLargePlayButton(), d.videoPoster_do && d.videoPoster_do.allowToShow_bl && d.videoPoster_do.positionAndResize(), d.embedWindow_do && d.embedWindow_do.isShowed_bl && d.embedWindow_do.positionAndResize(), d.infoWindow_do && d.infoWindow_do.isShowed_bl && d.infoWindow_do.positionAndResize(), d.info_do && d.info_do.isShowed_bl && d.info_do.positionAndResize(), d.shareWindow_do && d.shareWindow_do.isShowed_bl && d.shareWindow_do.positionAndResize(), d.adsStart_do && d.positionAds(), d.subtitle_do && (d.subtitle_do.setSizeOnce(d.tempVidStageWidth), d.subtitle_do.position(a)), d.popupAds_do && d.popupAds_do.position(a)
        }, this.setupClickScreen = function() {
            d.dumyClick_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (d.dumyClick_do.setBkColor("#00FF00"), d.dumyClick_do.setAlpha(1e-6)), d.dumyClick_do.screen.addEventListener ? d.dumyClick_do.screen.addEventListener("click", d.playPauseClickHandler) : d.dumyClick_do.screen.attachEvent && d.dumyClick_do.screen.attachEvent("onclick", d.playPauseClickHandler), d.hideClickScreen(), d.videoHolder_do.addChild(d.dumyClick_do)
        }, this.playPauseClickHandler = function(c) {
            if (2 != c.button) return d.isAdd_bl ? void(d.data.playlist_ar[d.id].ads.pageToOpen && "none" != d.data.playlist_ar[d.id].ads.pageToOpen && (a.open(d.data.playlist_ar[d.id].ads.pageToOpen, d.data.playlist_ar[d.id].ads.pageTarget), d.pause())) : void(d.disableClick_bl || (d.firstTapPlaying_bl = d.isPlaying_bl, b.keyboardCurInstance = d, d.controller_do && 0 != d.controller_do.mainHolder_do.y && d.isMobile_bl || (d.videoType_str == b.YOUTUBE ? d.ytb_do.togglePlayPause() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.togglePlayPause() : d.isFlashScreenReady_bl && d.flashObject.togglePlayPause())))
        }, this.showClickScreen = function() {
            d.dumyClick_do.setVisible(!0), d.isAdd_bl && "none" != d.data.playlist_ar[d.id].ads.pageToOpen ? d.dumyClick_do.setButtonMode(!0) : d.dumyClick_do.setButtonMode(!1)
        }, this.hideClickScreen = function() {
            d.dumyClick_do.setVisible(!1)
        }, this.setupDisableClick = function() {
            d.disableClick_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (d.disableClick_do.setBkColor("#ff0000"), d.disableClick_do.setAlpha(.001)), d.main_do.addChild(d.disableClick_do)
        }, this.disableClick = function() {
            d.disableClick_bl = !0, clearTimeout(d.disableClickId_to), d.disableClick_do && (d.disableClick_do.setWidth(d.stageWidth), d.disableClick_do.setHeight(d.stageHeight)), d.disableClickId_to = setTimeout(function() {
                d.disableClick_do && (d.disableClick_do.setWidth(0), d.disableClick_do.setHeight(0)), d.disableClick_bl = !1
            }, 500)
        }, this.showDisable = function() {
            d.disableClick_do.w != d.stageWidth && (d.disableClick_do.setWidth(d.stageWidth), d.disableClick_do.setHeight(d.stageHeight))
        }, this.hideDisable = function() {
            d.disableClick_do && 0 != d.disableClick_do.w && (d.disableClick_do.setWidth(0), d.disableClick_do.setHeight(0))
        }, this.addDoubleClickSupport = function() {
            !d.isMobile_bl && d.dumyClick_do.screen.addEventListener ? (d.dumyClick_do.screen.addEventListener("mousedown", d.onFirstDown), FWDUVPUtils.isIEWebKit && d.dumyClick_do.screen.addEventListener("dblclick", d.onSecondDown)) : d.isMobile_bl ? d.dumyClick_do.screen.addEventListener("touchstart", d.onFirstDown) : d.dumyClick_do.screen.addEventListener && d.dumyClick_do.screen.addEventListener("mousedown", d.onFirstDown);
        }, this.onFirstDown = function(a) {
            if (2 != a.button) {
                d.isFullscreen_bl && a.preventDefault && a.preventDefault();
                var b = FWDUVPUtils.getViewportMouseCoordinates(a);
                d.firstTapX = b.screenX, d.firstTapY = b.screenY, d.firstTapPlaying_bl = d.isPlaying_bl, FWDUVPUtils.isIEWebKit || (d.isMobile_bl ? (d.dumyClick_do.screen.addEventListener("touchstart", d.onSecondDown), d.dumyClick_do.screen.removeEventListener("touchstart", d.onFirstDown)) : d.dumyClick_do.screen.addEventListener && (d.dumyClick_do.screen.addEventListener("mousedown", d.onSecondDown), d.dumyClick_do.screen.removeEventListener("mousedown", d.onFirstDown)), clearTimeout(d.secondTapId_to), d.secondTapId_to = setTimeout(d.doubleTapExpired, 250))
            }
        }, this.doubleTapExpired = function() {
            clearTimeout(d.secondTapId_to), d.isMobile_bl ? (d.dumyClick_do.screen.removeEventListener("touchstart", d.onSecondDown), d.dumyClick_do.screen.addEventListener("touchstart", d.onFirstDown)) : d.dumyClick_do.screen.addEventListener && (d.dumyClick_do.screen.removeEventListener("mousedown", d.onSecondDown), d.dumyClick_do.screen.addEventListener("mousedown", d.onFirstDown))
        }, this.onSecondDown = function(a) {
            a.preventDefault && a.preventDefault();
            var c, e, b = FWDUVPUtils.getViewportMouseCoordinates(a);
            FWDUVPUtils.isIEWebKit && (d.firstTapPlaying_bl = d.isPlaying_bl), a.touches && 1 != a.touches.length || (c = Math.abs(b.screenX - d.firstTapX), e = Math.abs(b.screenY - d.firstTapY), d.isMobile_bl && (c > 10 || e > 10) || !d.isMobile_bl && (c > 2 || e > 2) || (d.switchFullScreenOnDoubleClick(), FWDUVPUtils.isIEWebKit || (d.firstTapPlaying_bl ? d.play() : d.pause())))
        }, this.switchFullScreenOnDoubleClick = function() {
            d.disableClick(), d.isFullScreen_bl ? d.goNormalScreen() : d.goFullScreen()
        }, this.setupVideoHider = function() {
            d.videoHider_do = new FWDUVPDisplayObject("div"), d.videoHider_do.setBkColor(d.backgroundColor_str), d.videoHolder_do.addChild(d.videoHider_do)
        }, this.showVideoHider = function() {
            !d.isVideoHiderShowed_bl && d.videoHider_do && (d.isVideoHiderShowed_bl = !0, d.videoHider_do.setVisible(!0), d.resizeVideoHider())
        }, this.hideVideoHider = function() {
            d.isVideoHiderShowed_bl && (d.isVideoHiderShowed_bl = !1, clearTimeout(d.videoHilderId_to), d.videoHilderId_to = setTimeout(function() {
                d.videoHider_do.setVisible(!1)
            }, 300))
        }, this.resizeVideoHider = function() {
            d.isVideoHiderShowed_bl && (d.videoHider_do.setWidth(d.tempStageWidth), d.videoHider_do.setHeight(d.tempStageHeight))
        }, this.setupYoutubePlayer = function() {
            location.protocol.indexOf("file:") != -1 && (FWDUVPUtils.isOpera || FWDUVPUtils.isIE) || (FWDUVPYoutubeScreen.setPrototype(), d.ytb_do = new FWDUVPYoutubeScreen(d, d.data.volume), d.ytb_do.addListener(FWDUVPYoutubeScreen.READY, d.youtubeReadyHandler), d.ytb_do.addListener(FWDUVPVideoScreen.ERROR, d.videoScreenErrorHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB, d.videoScreenSafeToScrubbHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.STOP, d.videoScreenStopHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY, d.videoScreenPlayHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.PAUSE, d.videoScreenPauseHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE, d.videoScreenUpdateHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE_TIME, d.videoScreenUpdateTimeHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.LOAD_PROGRESS, d.videoScreenLoadProgressHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY_COMPLETE, d.videoScreenPlayCompleteHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.CUED, d.youtubeScreenCuedHandler), d.ytb_do.addListener(FWDUVPYoutubeScreen.QUALITY_CHANGE, d.youtubeScreenQualityChangeHandler), clearTimeout(d.ytb_do))
        }, this.youtubeReadyHandler = function(a) {
            if (d.isYoutubeReady_bl = !0, d.isAPIReady_bl = !0, d.ytb_do.hasBeenCreatedOnce_bl) {
                if (d.videoSourcePath_str.indexOf(".") != -1) return;
                return d.isMobile_bl ? (d.setPosterSource(void 0), d.videoPoster_do.hide(), d.largePlayButton_do.hide()) : (d.setPosterSource(d.posterPath_str), d.videoPoster_do.show()), void(d.videoSourcePath_str.indexOf(".") == -1 && d.setSource(void 0, !0))
            }
            d.useVimeo_bl && !d.isVimeoReady_bl || (d.useYoutube_bl && d.useVimeo_bl ? d.isYoutubeReady_bl && d.isVimeoReady_bl && d.setupNormalVideoPlayers() : d.useYoutube_bl ? d.isYoutubeReady_bl && d.setupNormalVideoPlayers() : d.useVimeo_bl && d.isVimeoReady_bl && d.setupNormalVideoPlayers(), d.hidePreloaderId_to = setTimeout(function() {
                d.preloader_do && d.preloader_do.hide(!0)
            }, 500), clearTimeout(d.updatePlaylistFirstTime), d.updatePlaylistFirstTime = setTimeout(function() {
                d.isPlaylistLoadedFirstTime_bl || d.updatePlaylist(), d.isPlaylistLoadedFirstTime_bl = !0
            }, 100))
        }, this.youtubeScreenCuedHandler = function() {
            d.main_do && d.main_do.contains(d.info_do) && d.main_do.removeChild(d.info_do)
        }, this.youtubeScreenQualityChangeHandler = function(a) {
            d.controller_do.updateQuality(a.levels, a.qualityLevel)
        }, this.setupVimeoPlayer = function() {
            location.protocol.indexOf("file:") != -1 && (FWDUVPUtils.isOpera || FWDUVPUtils.isIE) || (FWDUVPVimeoScreen.setPrototype(), d.vimeo_do = new FWDUVPVimeoScreen(d, d.data.volume), d.vimeo_do.addListener(FWDUVPVimeoScreen.INIT_ERROR, d.vimeoInitErrorHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.READY, d.vimeoReadyHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.STOP, d.videoScreenStopHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.PLAY, d.videoScreenPlayHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.PAUSE, d.videoScreenPauseHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.UPDATE, d.videoScreenUpdateHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.UPDATE_TIME, d.videoScreenUpdateTimeHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.LOAD_PROGRESS, d.videoScreenLoadProgressHandler), d.vimeo_do.addListener(FWDUVPVimeoScreen.PLAY_COMPLETE, d.videoScreenPlayCompleteHandler))
        }, this.vimeoInitErrorHandler = function(a) {
            d.main_do.addChild(d.info_do), d.info_do.allowToRemove_bl = !1, d.info_do.showText(a.error), d.preloader_do.hide()
        }, this.vimeoReadyHandler = function(a) {
            d.isVimeoReady_bl = !0, d.useYoutube_bl && !d.isYoutubeReady_bl || (d.useYoutube_bl && d.useVimeo_bl ? d.isYoutubeReady_bl && d.isVimeoReady_bl && d.setupNormalVideoPlayers() : d.useYoutube_bl ? d.isYoutubeReady_bl && d.setupNormalVideoPlayers() : d.useVimeo_bl && d.isVimeoReady_bl && d.setupNormalVideoPlayers(), clearInterval(d.hidePreloaderId_to), d.hidePreloaderId_to = setTimeout(function() {
                d.preloader_do && d.preloader_do.hide(!0)
            }, 500), clearTimeout(d.updatePlaylistFirstTime), d.updatePlaylistFirstTime = setTimeout(function() {
                d.isPlaylistLoadedFirstTime_bl || d.updatePlaylist(), d.isPlaylistLoadedFirstTime_bl = !0
            }, 100))
        }, d.setupContextMenu = function() {
            d.customContextMenu_do = new FWDUVPContextMenu(d.main_do, d.data.rightClickContextMenu_str)
        }, d.setupData = function() {
            FWDUVPData.setPrototype(), d.data = new FWDUVPData(d.props_obj, d.rootElement_el, d), d.data.useYoutube_bl = d.useYoutube_bl, d.data.addListener(FWDUVPData.PRELOADER_LOAD_DONE, d.onPreloaderLoadDone), d.data.addListener(FWDUVPData.LOAD_ERROR, d.dataLoadError), d.data.addListener(FWDUVPData.SKIN_PROGRESS, d.dataSkinProgressHandler), d.data.addListener(FWDUVPData.SKIN_LOAD_COMPLETE, d.dataSkinLoadComplete), d.data.addListener(FWDUVPData.PLAYLIST_LOAD_COMPLETE, d.dataPlayListLoadComplete)
        }, d.onPreloaderLoadDone = function() {
            d.setupPreloader(), d.isMobile_bl || d.setupContextMenu(), d.resizeHandler()
        }, d.dataLoadError = function(a) {
            d.main_do.addChild(d.info_do), d.info_do.showText(a.text), d.preloader_do && d.preloader_do.hide(!1), d.resizeHandler(), d.playlist_do && (d.playlist_do.catId = -1), d.dispatchEvent(b.ERROR, {
                error: a.text
            })
        }, d.dataSkinProgressHandler = function(a) {}, d.dataSkinLoadComplete = function() {
            if (location.protocol.indexOf("file:") != -1 && (FWDUVPUtils.isOpera || FWDUVPUtils.isIEAndLessThen9)) return d.main_do.addChild(d.info_do), d.info_do.allowToRemove_bl = !1, d.info_do.showText("This browser can't play video local, please test online or use a browser like Firefox of Chrome."), void d.preloader_do.hide();
            if (d.volume = d.data.volume, d.playlistHeight = d.data.playlistBottomHeight, d.displayType != b.FULL_SCREEN || FWDUVPUtils.hasFullScreen || (d.data.showFullScreenButton_bl = !1), d.isEmbedded_bl && (d.useDeepLinking_bl = !1, d.data.playlistPosition_str = "right"), b.atLeastOnePlayerHasDeeplinking_bl && (d.useDeepLinking_bl = !1), d.useDeepLinking_bl && (b.atLeastOnePlayerHasDeeplinking_bl = !0), d.useDeepLinking_bl) setTimeout(function() {
                d.setupDL()
            }, 200);
            else {
                if (d.isEmbedded_bl) d.catId = d.embeddedPlaylistId, d.id = d.embeddedVideoId;
                else {
                    var c = FWDUVPUtils.getHashUrlArgs(a.location.hash);
                    d.useDeepLinking_bl && void 0 !== c.playlistId && void 0 !== c.videoId ? (d.catId = c.playlistId, d.id = c.videoId) : (d.catId = d.data.startAtPlaylist, d.id = d.data.startAtVideo)
                }
                d.loadInternalPlaylist()
            }
        }, this.dataPlayListLoadComplete = function() {
            d.isPlaylistLoadedFirstTime_bl || (d.useYoutube_bl || d.useVimeo_bl ? (d.useYoutube_bl && d.setupYoutubePlayer(), d.useVimeo_bl && d.setupVimeoPlayer()) : (d.setupNormalVideoPlayers(), FWDUVPUtils.isIEAndLessThen9 || d.updatePlaylist())), d.isPlaylistLoadedFirstTime_bl && d.updatePlaylist(), d.isPlaylistLoaded_bl = !0, d.preloader_do && d.positionPreloader()
        }, this.updatePlaylist = function() {
            return !d.useYoutube_bl || !d.useVimeo_bl || d.isYoutubeReady_bl && d.isVimeoReady_bl ? d.useYoutube_bl && !d.isYoutubeReady_bl ? void setTimeout(d.updatePlaylist, 50) : d.useVimeo_bl && !d.isVimeoReady_bl ? void setTimeout(d.updatePlaylist, 50) : (d.main_do && d.main_do.contains(d.info_do) && d.main_do.removeChild(d.info_do), d.preloader_do.hide(!0), d.totalVideos = d.data.playlist_ar.length, d.id < 0 ? d.id = 0 : d.id > d.totalVideos - 1 && (d.id = d.totalVideos - 1), d.playlist_do && d.playlist_do.updatePlaylist(d.data.playlist_ar, d.catId, d.id, d.data.cats_ar[d.catId].playlistName), d.hideVideoHider(), d.data.startAtRandomVideo_bl && (d.id = parseInt(Math.random() * d.data.playlist_ar.length), d.useDeepLinking_bl) ? void FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : (d.posterPath_str = d.data.playlist_ar[d.id].posterSource, d.setSource(void 0, !0), d.isFirstPlaylistLoaded_bl && !d.isMobile_bl && !d.data.startAtRandomVideo_bl && d.data.autoPlay_bl && d.play(), d.data.startAtRandomVideo_bl = !1, d.isFirstPlaylistLoaded_bl = !0, void d.dispatchEvent(b.LOAD_PLAYLIST_COMPLETE))) : void setTimeout(d.updatePlaylist, 50)
        }, this.loadInternalPlaylist = function() {
            d.isPlaylistLoaded_bl = !1, d.isAdd_bl = !1, d.prevCatId != d.catId && (d.prevCatId = d.catId, d.stop(), d.hider && d.hider.stop(), d.setPosterSource("none"), d.videoPoster_do && d.videoPoster_do.hide(!0), d.preloader_do.show(!0), d.largePlayButton_do && d.largePlayButton_do.hide(), d.controller_do && d.controller_do.hide(!1, 10), d.showVideoHider(), d.data.loadPlaylist(d.catId), d.logo_do && d.logo_do.hide(!1, !0), d.isAdd_bl && (d.adsSkip_do.hide(!1), d.adsStart_do.hide(!1)), d.playlist_do && d.playlist_do.destroyPlaylist(), d.positionPreloader(), d.isAPIReady_bl && d.dispatchEvent(b.START_TO_LOAD_PLAYLIST))
        }, this.setupDL = function() {
            FWDAddress.onChange = d.dlChangeHandler, d.isEmbedded_bl && FWDAddress.setValue("?playlistId=" + d.embeddedPlaylistId + "&videoId=" + d.embeddedVideoId), d.dlChangeHandler()
        }, this.dlChangeHandler = function() {
            if (!d.hasOpenedInPopup_bl) {
                var a = !1;
                return d.categories_do && d.categories_do.isOnDOM_bl ? void d.categories_do.hide() : (d.catId = parseInt(FWDAddress.getParameter("playlistId")), d.id = parseInt(FWDAddress.getParameter("videoId")), (void 0 == d.catId || void 0 == d.id || isNaN(d.catId) || isNaN(d.id)) && (d.catId = d.data.startAtPlaylist, d.id = d.data.startAtVideo, a = !0), (d.catId < 0 || d.catId > d.data.totalCategories - 1 && !a) && (d.catId = d.data.startAtPlaylist, d.id = d.data.startAtVideo, a = !0), d.data.playlist_ar && (d.id < 0 && !a ? (d.id = d.data.startAtVideo, a = !0) : d.prevCatId == d.catId && d.id > d.data.playlist_ar.length - 1 && !a && (d.id = d.data.playlist_ar.length - 1, a = !0)), a ? void FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : void(d.prevCatId != d.catId ? (d.loadInternalPlaylist(), d.prevCatId = d.catId) : (d.setSource(!1), d.data.startAtRandomVideo_bl || (d.videoType_str == b.VIMEO ? d.playVimeoWithDelay() : d.play()), d.data.startAtRandomVideo_bl = !1)))
            }
        }, this.playVimeoWithDelay = function() {
            d.isMobile_bl || (d.vimeo_do.isVideoLoaded_bl ? (d.hasVimeoStarted_bl = !0, d.play(), d.vimeo_do.play(), clearTimeout(d.playVimeoWhenLoadedId_to)) : d.playVimeoWhenLoadedId_to = setTimeout(d.playVimeoWithDelay, 50))
        }, this.setupNormalVideoPlayers = function() {
            b.hasHTML5Video ? (d.isAPIReady_bl = !0, d.setupVideoScreen(), d.setupVideoPoster(), d.main_do.addChild(d.preloader_do), d.setupSubtitle(), d.setupClickScreen(), d.setupPopupAds(), d.data.showLogo_bl && d.setupLogo(), d.addDoubleClickSupport(), d.setupVideoHider(), d.data.showController_bl && d.setupController(), d.setupAdsStart(), d.data.showPlaylistButtonAndPlaylist_bl && d.setupPlaylist(), d.setupLargePlayPauseButton(), d.data.showController_bl && d.setupHider(), d.data.showPlaylistsButtonAndPlaylists_bl && d.setupCategories(), d.setupDisableClick(), d.data.showEmbedButton_bl && d.setupEmbedWindow(), d.data.showShareButton_bl && d.setupShareWindow(), d.setupInfoWindow(), "no" == b.useYoutube && (d.isPlaylistLoadedFirstTime_bl = !0), d.isAPIReady_bl = !0, d.dispatchEvent(b.READY)) : d.setupFlashScreen(), d.data.addKeyboardSupport_bl && d.addKeyboardSupport(), d.resizeHandler()
        }, this.setupPreloader = function() {
            FWDUVPPreloader.setPrototype(), d.preloader_do = new FWDUVPPreloader(d.data.mainPreloader_img, 38, 30, 36, 80), d.preloader_do.show(!0), d.main_do.addChild(d.preloader_do)
        }, this.positionPreloader = function() {
            d.isAPIReady_bl && d.isPlaylistLoaded_bl ? (d.preloader_do.setX(parseInt((d.tempVidStageWidth - d.preloader_do.w) / 2)), d.preloader_do.setY(parseInt((d.tempVidStageHeight - d.preloader_do.h) / 2))) : (d.preloader_do.setX(parseInt((d.tempStageWidth - d.preloader_do.w) / 2)), d.preloader_do.setY(parseInt((d.tempStageHeight - d.preloader_do.h) / 2)))
        }, this.setupCategories = function() {
            FWDUVPCategories.setPrototype(), d.categories_do = new FWDUVPCategories(d.data, d), d.categories_do.getStyle().zIndex = "2147483647", d.categories_do.addListener(FWDUVPCategories.HIDE_COMPLETE, d.categoriesHideCompleteHandler), d.data.showPlaylistsByDefault_bl && (d.showCatWidthDelayId_to = setTimeout(function() {
                d.showCategories()
            }, 1400))
        }, this.categoriesHideCompleteHandler = function(a) {
            if (d.controller_do && d.controller_do.setCategoriesButtonState("unselected"), d.customContextMenu_do && d.customContextMenu_do.updateParent(d.main_do), d.useDeepLinking_bl) {
                if (d.categories_do.id != d.catId) return d.catId = d.categories_do.id, d.id = 0, void FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id)
            } else {
                if (d.catId == d.categories_do.id) return;
                d.catId = d.categories_do.id, d.id = 0, d.loadInternalPlaylist(d.catId)
            }
            FWDUVPUtils.isIphone ? (d.videoScreen_do && !d.videoScreen_do.isStopped_bl && d.videoScreen_do.setX(0), d.ytb_do && !d.ytb_do.isStopped_bl && d.ytb_do.setX(0), d.vimeo_do && !d.vimeo_do.isStopped_bl && d.vimeo_do.setX(0)) : d.isVideoPlayingWhenOpenWindows_bl && d.resume()
        }, this.setupVideoPoster = function() {
            FWDUVPPoster.setPrototype(), d.videoPoster_do = new FWDUVPPoster(d, d.data.show, d.data.posterBackgroundColor_str), d.videoHolder_do.addChild(d.videoPoster_do)
        }, this.setupInfoWindow = function() {
            FWDUVPInfoWindow.setPrototype(), d.infoWindow_do = new FWDUVPInfoWindow(d, d.data), d.infoWindow_do.addListener(FWDUVPInfoWindow.HIDE_COMPLETE, d.infoWindowHideCompleteHandler), d.main_do.addChild(d.infoWindow_do)
        }, this.infoWindowHideCompleteHandler = function() {
            FWDUVPUtils.isIphone ? (d.videoScreen_do && !d.videoScreen_do.isStopped_bl && d.videoScreen_do.setX(0), d.ytb_do && !d.ytb_do.isStopped_bl && d.ytb_do.setX(0), d.vimeo_do && !d.vimeo_do.isStopped_bl && d.vimeo_do.setX(0)) : d.isVideoPlayingWhenOpenWindows_bl && d.resume(), d.controller_do && !d.isMobile_bl && (d.controller_do.infoButton_do.isDisabled_bl = !1, d.controller_do.infoButton_do.setNormalState())
        }, this.setupLargePlayPauseButton = function() {
            FWDUVPSimpleButton.setPrototype(), d.largePlayButton_do = new FWDUVPSimpleButton(d.data.largePlayN_img, d.data.largePlayS_str), d.largePlayButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, d.largePlayButtonUpHandler), d.largePlayButton_do.setOverflow("visible"), d.largePlayButton_do.hide(!1), d.main_do.addChild(d.largePlayButton_do)
        }, this.largePlayButtonUpHandler = function() {
            d.disableClick(), d.largePlayButton_do.hide(), d.play()
        }, this.positionLargePlayButton = function() {
            d.largePlayButton_do.setX(parseInt((d.tempVidStageWidth - d.largePlayButton_do.w) / 2)), d.largePlayButton_do.setY(parseInt((d.tempVidStageHeight - d.largePlayButton_do.h) / 2))
        }, this.setupLogo = function() {
            FWDUVPLogo.setPrototype(), d.logo_do = new FWDUVPLogo(d, d.data.logoPath_str, d.data.logoPosition_str, d.data.logoMargins), d.main_do.addChild(d.logo_do)
        }, this.setupPlaylist = function() {
            FWDUVPPlaylist.setPrototype(), d.playlist_do = new FWDUVPPlaylist(d, d.data), d.playlist_do.addListener(FWDUVPPlaylist.THUMB_MOUSE_UP, d.playlistThumbMouseUpHandler), d.playlist_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, d.playPrevVideoHandler), d.playlist_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, d.playNextVideoHandler), d.playlist_do.addListener(FWDUVPPlaylist.ENABLE_SHUFFLE, d.enableShuffleHandler), d.playlist_do.addListener(FWDUVPPlaylist.DISABLE_SHUFFLE, d.disableShuffleHandler), d.playlist_do.addListener(FWDUVPPlaylist.ENABLE_LOOP, d.enableLoopHandler), d.playlist_do.addListener(FWDUVPPlaylist.DISABLE_LOOP, d.disableLoopHandler), d.main_do.addChildAt(d.playlist_do, 0)
        }, this.playlistThumbMouseUpHandler = function(a) {
            d.disableClick_bl || (d.useDeepLinking_bl && d.id != a.id ? (FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + a.id), d.id = a.id) : (d.id = a.id, d.setSource(), d.play()))
        }, this.playPrevVideoHandler = function() {
            d.data.shuffle_bl ? d.playShuffle() : d.playPrev()
        }, this.playNextVideoHandler = function() {
            d.data.shuffle_bl ? d.playShuffle() : d.playNext()
        }, this.enableShuffleHandler = function(a) {
            d.data.shuffle_bl = !0, d.data.loop_bl = !1, d.playlist_do.setShuffleButtonState("selected"), d.playlist_do.setLoopStateButton("unselected")
        }, this.disableShuffleHandler = function(a) {
            d.data.shuffle_bl = !1, d.playlist_do.setShuffleButtonState("unselected")
        }, this.enableLoopHandler = function(a) {
            d.data.loop_bl = !0, d.data.shuffle_bl = !1, d.playlist_do.setLoopStateButton("selected"), d.playlist_do.setShuffleButtonState("unselected")
        }, this.disableLoopHandler = function(a) {
            d.data.loop_bl = !1, d.playlist_do.setLoopStateButton("unselected")
        }, this.setupPopupAds = function() {
            FWDUVPPupupAds.setPrototype(), d.popupAds_do = new FWDUVPPupupAds(d, d.data), d.videoHolder_do.addChild(d.popupAds_do)
        }, this.setupSubtitle = function() {
            FWDUVPSubtitle.setPrototype(), d.subtitle_do = new FWDUVPSubtitle(d, d.data), d.subtitle_do.addListener(FWDUVPSubtitle.LOAD_COMPLETE, d.subtitleLoadComplete)
        }, this.subtitleLoadComplete = function() {
            d.controller_do && d.controller_do.enableSubtitleButton()
        }, this.loadSubtitle = function(a) {
            d.controller_do && d.controller_do.disableSubtitleButton(), a && (d.subtitle_do.loadSubtitle(a), d.videoHolder_do.addChildAt(d.subtitle_do, d.videoHolder_do.getChildIndex(d.dumyClick_do) - 1))
        }, this.setupController = function() {
            FWDUVPController.setPrototype(), d.controller_do = new FWDUVPController(d.data, d), d.controller_do.addListener(FWDUVPController.SHOW_CATEGORIES, d.showCategoriesHandler), d.controller_do.addListener(FWDUVPController.SHOW_PLAYLIST, d.showPlaylistHandler), d.controller_do.addListener(FWDUVPController.HIDE_PLAYLIST, d.hidePlaylistHandler), d.controller_do.addListener(FWDUVPController.PLAY, d.controllerOnPlayHandler), d.controller_do.addListener(FWDUVPController.PAUSE, d.controllerOnPauseHandler), d.controller_do.addListener(FWDUVPController.START_TO_SCRUB, d.controllerStartToScrubbHandler), d.controller_do.addListener(FWDUVPController.SCRUB, d.controllerScrubbHandler), d.controller_do.addListener(FWDUVPController.STOP_TO_SCRUB, d.controllerStopToScrubbHandler), d.controller_do.addListener(FWDUVPController.CHANGE_VOLUME, d.controllerChangeVolumeHandler), d.controller_do.addListener(FWDUVPController.DOWNLOAD_VIDEO, d.controllerDownloadVideoHandler), d.controller_do.addListener(FWDUVPController.CHANGE_YOUTUBE_QUALITY, d.controllerChangeYoutubeQualityHandler), d.controller_do.addListener(FWDUVPController.FULL_SCREEN, d.controllerFullScreenHandler), d.controller_do.addListener(FWDUVPController.NORMAL_SCREEN, d.controllerNormalScreenHandler), d.controller_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, d.playPrevVideoHandler), d.controller_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, d.playNextVideoHandler), d.controller_do.addListener(FWDUVPController.SHOW_EMBED_WINDOW, d.showEmbedWindowHandler), d.controller_do.addListener(FWDUVPController.SHOW_INFO_WINDOW, d.showInfoWindowHandler), d.controller_do.addListener(FWDUVPController.SHOW_SHARE_WINDOW, d.controllerShareHandler), d.controller_do.addListener(FWDUVPController.SHOW_SUBTITLE, d.showSubtitleHandler), d.controller_do.addListener(FWDUVPController.HIDE_SUBTITLE, d.hideSubtitleHandler), d.videoHolder_do.addChild(d.controller_do)
        }, this.showSubtitleHandler = function() {
            d.subtitle_do.isShowed_bl = !0, d.subtitle_do.show()
        }, this.hideSubtitleHandler = function() {
            d.subtitle_do.isShowed_bl = !1, d.subtitle_do.hide()
        }, this.showCategoriesHandler = function(a) {
            d.showCategories(), d.controller_do && d.controller_do.setCategoriesButtonState("selected")
        }, this.showPlaylistHandler = function(a) {
            d.disableClick(), d.showPlaylist()
        }, this.hidePlaylistHandler = function(a) {
            d.disableClick(), d.hidePlaylist()
        }, this.controllerOnPlayHandler = function(a) {
            d.play()
        }, this.controllerOnPauseHandler = function(a) {
            d.pause()
        }, this.controllerStartToScrubbHandler = function(a) {
            d.startToScrub()
        }, this.controllerScrubbHandler = function(a) {
            d.scrub(a.percent)
        }, this.controllerStopToScrubbHandler = function(a) {
            d.stopToScrub()
        }, this.controllerChangeVolumeHandler = function(a) {
            d.setVolume(a.percent)
        }, this.controllerDownloadVideoHandler = function() {
            d.downloadVideo()
        }, this.controllerShareHandler = function(a) {
            d.videoType_str == b.YOUTUBE && d.ytb_do ? d.isVideoPlayingWhenOpenWindows_bl = d.ytb_do.isPlaying_bl : d.videoType_str == b.VIMEO && d.vimeo_do ? d.isVideoPlayingWhenOpenWindows_bl = d.vimeo_do.isPlaying_bl : b.hasHTML5Video && d.videoScreen_do && (d.isVideoPlayingWhenOpenWindows_bl = d.videoScreen_do.isPlaying_bl), d.pause(), FWDUVPUtils.isIphone && (d.videoScreen_do && d.videoScreen_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.vimeo_do && d.vimeo_do.setX(-5e3)), d.shareWindow_do.show(), d.controller_do && !d.isMobile_bl && (d.controller_do.shareButton_do.setSelectedState(), d.controller_do.shareButton_do.isDisabled_bl = !0)
        }, this.controllerChangeYoutubeQualityHandler = function(a) {
            d.ytb_do.setQuality(a.quality)
        }, this.controllerFullScreenHandler = function() {
            d.goFullScreen()
        }, this.controllerNormalScreenHandler = function() {
            d.goNormalScreen()
        }, this.showEmbedWindowHandler = function() {
            return location.protocol.indexOf("file:") != -1 ? (d.main_do.addChild(d.info_do), void d.info_do.showText("Embedding video files local is not allowed or possible! To function properly please test online")) : (d.videoType_str == b.YOUTUBE && d.ytb_do ? d.isVideoPlayingWhenOpenWindows_bl = d.ytb_do.isPlaying_bl : d.videoType_str == b.VIMEO && d.vimeo_do ? d.isVideoPlayingWhenOpenWindows_bl = d.vimeo_do.isPlaying_bl : b.hasHTML5Video && d.videoScreen_do && (d.isVideoPlayingWhenOpenWindows_bl = d.videoScreen_do.isPlaying_bl), d.pause(), FWDUVPUtils.isIphone && (d.videoScreen_do && d.videoScreen_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.vimeo_do && d.vimeo_do.setX(-5e3)), d.customContextMenu_do && d.customContextMenu_do.disable(), d.embedWindow_do.show(), void(d.controller_do && !d.isMobile_bl && (d.controller_do.embedButton_do.setSelectedState(), d.controller_do.embedButton_do.isDisabled_bl = !0)))
        }, this.showInfoWindowHandler = function() {
            d.videoType_str == b.YOUTUBE && d.ytb_do ? d.isVideoPlayingWhenOpenWindows_bl = d.ytb_do.isPlaying_bl : d.videoType_str == b.VIMEO && d.vimeo_do ? d.isVideoPlayingWhenOpenWindows_bl = d.vimeo_do.isPlaying_bl : b.hasHTML5Video && d.videoScreen_do && (d.isVideoPlayingWhenOpenWindows_bl = d.videoScreen_do.isPlaying_bl), d.pause(), FWDUVPUtils.isIphone && (d.videoScreen_do && d.videoScreen_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.vimeo_do && d.vimeo_do.setX(-5e3)), d.infoWindow_do.show(d.data.playlist_ar[d.id].desc), d.controller_do && !d.isMobile_bl && (d.controller_do.infoButton_do.setSelectedState(), d.controller_do.infoButton_do.isDisabled_bl = !0)
        }, this.setupVideoScreen = function() {
            FWDUVPVideoScreen.setPrototype(), d.videoScreen_do = new FWDUVPVideoScreen(d, d.data.volume), d.videoScreen_do.addListener(FWDUVPVideoScreen.ERROR, d.videoScreenErrorHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.SAFE_TO_SCRUBB, d.videoScreenSafeToScrubbHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.STOP, d.videoScreenStopHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY, d.videoScreenPlayHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.PAUSE, d.videoScreenPauseHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE, d.videoScreenUpdateHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE_TIME, d.videoScreenUpdateTimeHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.LOAD_PROGRESS, d.videoScreenLoadProgressHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.START_TO_BUFFER, d.videoScreenStartToBuferHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.STOP_TO_BUFFER, d.videoScreenStopToBuferHandler), d.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY_COMPLETE, d.videoScreenPlayCompleteHandler), d.videoHolder_do.addChild(d.videoScreen_do)
        }, this.videoScreenErrorHandler = function(c) {
            var e;
            d.isPlaying_bl = !1, b.hasHTML5Video || d.videoType_str == b.YOUTUBE ? (e = c.text, a.console && console.log(c.text), d.main_do && d.main_do.addChild(d.info_do), d.info_do && d.info_do.showText(e), d.controller_do && (d.controller_do.disableMainScrubber(), d.controller_do.disablePlayButton(), d.data.showControllerWhenVideoIsStopped_bl || d.controller_do.hide(!d.isMobile_bl), d.largePlayButton_do.hide(), d.hideClickScreen(), d.hider && d.hider.stop())) : (e = c, d.main_do && d.main_do.addChild(d.info_do), d.info_do && d.info_do.showText(e)), FWDUVPUtils.isIphone && (d.videoScreen_do && d.videoScreen_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.vimeo_do && d.vimeo_do.setX(-5e3)), d.logo_do && d.logo_do.hide(!1), d.preloader_do.hide(!1), d.showCursor(), d.dispatchEvent(b.ERROR, {
                error: e
            })
        }, this.videoScreenSafeToScrubbHandler = function() {
            d.controller_do && (d.isAdd_bl ? (d.controller_do.disableMainScrubber(), 0 != d.data.playlist_ar[d.id].ads.timeToHoldAds && d.adsStart_do.show(!0), d.data.playlist_ar[d.id].thumbSource && d.adsStart_do.loadThumbnail(d.data.playlist_ar[d.id].thumbSource), d.positionAds()) : d.controller_do.enableMainScrubber(), d.controller_do.enablePlayButton(), d.controller_do.show(!0), d.hider && d.hider.start()), d.isAdd_bl || d.loadSubtitle(d.data.playlist_ar[d.id].subtitleSource), d.isMobile_bl && d.adsSkip_do.hide(!1), d.videoType_str != b.VIMEO && d.showClickScreen()
        }, this.videoScreenStopHandler = function(a) {
            d.main_do && d.main_do.contains(d.info_do) && d.main_do.removeChild(d.info_do), d.videoPoster_do.allowToShow_bl = !0, d.isPlaying_bl = !1, d.controller_do && (d.controller_do.disableMainScrubber(), d.controller_do.showPlayButton(), d.data.showControllerWhenVideoIsStopped_bl ? d.controller_do.show(!d.isMobile_bl) : d.controller_do.hide(!d.isMobile_bl), d.hider && d.hider.stop()), d.useYoutube_bl && (d.isMobile_bl ? d.ytb_do.destroyYoutube() : d.ytb_do.stopVideo()), d.logo_do && d.logo_do.hide(!0), d.hideClickScreen(), d.isMobile_bl && d.videoType_str == b.YOUTUBE && (d.videoPoster_do.hide(), d.largePlayButton_do.hide()), d.isMobile_bl && (d.adsSkip_do.hide(!1), d.adsStart_do.hide(!1)), d.showCursor(), d.dispatchEvent(b.STOP)
        }, this.videoScreenPlayHandler = function() {
            b.keyboardCurInstance = d, d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.isStopped_bl || (b.stopAllVideos(d), d.isPlaying_bl = !0, d.logo_do && d.logo_do.show(!0), d.controller_do && (d.controller_do.showPauseButton(), d.controller_do.show(!0)), d.largePlayButton_do.hide(), d.hider && d.hider.start(), d.showCursor(), d.dispatchEvent(b.PLAY))
        }, this.videoScreenPauseHandler = function() {
            d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.isStopped_bl || (d.isPlaying_bl = !1, d.controller_do && (d.controller_do.showPlayButton(), d.controller_do.show(!0)), FWDUVPUtils.isIphone || d.isAdd_bl || d.isMobile_bl && d.videoType_str == b.VIMEO || d.largePlayButton_do.show(), d.hider && (d.hider.reset(), d.hider.stop()), d.videoType_str != b.VIMEO && d.showClickScreen(), d.showCursor(), d.dispatchEvent(b.PAUSE))
        }, this.videoScreenUpdateHandler = function(a) {
            var c;
            b.hasHTML5Video || d.videoType_str == b.YOUTUBE ? (c = a.percent, d.controller_do && d.controller_do.updateMainScrubber(c)) : (c = a, d.controller_do && d.controller_do.updateMainScrubber(c)), d.dispatchEvent(b.UPDATE, {
                percent: c
            })
        }, this.videoScreenUpdateTimeHandler = function(a, c, e) {
            var f, g;
            b.hasHTML5Video || d.videoType_str == b.YOUTUBE ? (d.curTime = a.curTime, d.totalTime = a.totalTime, f = d.curTime + "/" + d.totalTime, g = a.seconds, d.controller_do && d.controller_do.updateTime(f)) : (d.curTime = a, d.totalTime = c, f = d.curTime + "/" + d.totalTime, void 0 != a && void 0 != c || (f = "00:00/00:00"), g = e, d.controller_do && d.controller_do.updateTime(f)), d.subtitle_do && d.subtitle_do.updateSubtitle(parseInt(a.seconds)), d.popupAds_do && d.popupAds_do.update(parseInt(a.seconds)), d.isAdd_bl && (d.data.playlist_ar[d.id].ads.timeToHoldAds > g ? (d.adsStart_do.updateText(d.data.skipToVideoText_str + Math.abs(d.data.playlist_ar[d.id].ads.timeToHoldAds - g)), d.isMobile_bl && d.adsSkip_do.hide(!1)) : d.isPlaying_bl && (d.adsStart_do.hide(!0), d.adsSkip_do.show(!0))), d.dispatchEvent(b.UPDATE_TIME, {
                currentTime: d.curTime,
                totalTime: d.totalTime
            })
        }, this.videoScreenLoadProgressHandler = function(a) {
            b.hasHTML5Video || d.videoType_str == b.YOUTUBE ? d.controller_do && d.controller_do.updatePreloaderBar(a.percent) : d.controller_do && d.controller_do.updatePreloaderBar(a)
        }, this.videoScreenStartToBuferHandler = function() {
            d.preloader_do.show()
        }, this.videoScreenStopToBuferHandler = function() {
            d.preloader_do.hide(!0)
        }, this.videoScreenPlayCompleteHandler = function(c, e) {
            return d.isAdd_bl ? (d.data.openNewPageAtTheEndOfTheAds_bl && "none" != d.data.playlist_ar[d.id].ads.pageToOpen && !e && ("_self" == d.data.playlist_ar[d.id].ads.pageTarget ? location.href = d.data.playlist_ar[d.id].ads.pageToOpen : a.open(d.data.playlist_ar[d.id].ads.pageToOpen, "_blank")), d.setSource(), e && d.isMobile_bl && d.videoType_str != b.YOUTUBE && d.play(), void(d.isMobile_bl || setTimeout(d.play, 100))) : (d.data.stopVideoWhenPlayComplete_bl || 1 == d.data.playlist_ar.length ? d.stop() : d.data.loop_bl ? (d.scrub(0), d.play()) : d.data.shuffle_bl ? (d.playShuffle(), d.isMobile_bl && d.stop()) : (d.playNext(), d.isMobile_bl && d.stop()), d.hider && d.hider.reset(), void d.dispatchEvent(b.PLAY_COMPLETE))
        }, this.setupAdsStart = function() {
            FWDUVPAdsStart.setPrototype(), d.adsStart_do = new FWDUVPAdsStart(d.data.adsButtonsPosition_str, d.data.adsBorderNormalColor_str, "", d.data.adsBackgroundPath_str, d.data.adsTextNormalColor), FWDUVPAdsButton.setPrototype(), d.adsSkip_do = new FWDUVPAdsButton(d.data.skipIconPath_img, d.data.skipIconSPath_str, d.data.skipToVideoButtonText_str, d.data.adsButtonsPosition_str, d.data.adsBorderNormalColor_str, d.data.adsBorderSelectedColor_str, d.data.adsBackgroundPath_str, d.data.adsTextNormalColor, d.data.adsTextSelectedColor), d.adsSkip_do.addListener(FWDUVPAdsButton.MOUSE_UP, d.skipAdsMouseUpHandler), d.videoHolder_do.addChild(d.adsSkip_do), d.videoHolder_do.addChild(d.adsStart_do)
        }, this.skipAdsMouseUpHandler = function() {
            d.videoScreenPlayCompleteHandler(null, !0)
        }, this.positionAds = function(a) {
            var b, c;
            b = "left" == d.data.adsButtonsPosition_str ? 0 : d.tempVidStageWidth, c = d.controller_do ? d.controller_do.isShowed_bl ? d.tempVidStageHeight - d.adsStart_do.h - d.data.controllerHeight - 30 : d.tempVidStageHeight - d.adsStart_do.h - d.data.controllerHeight : d.tempVidStageHeight - d.adsStart_do.h, FWDAnimation.killTweensOf(this.adsStart_do), a ? FWDAnimation.to(this.adsStart_do, .8, {
                y: c,
                ease: Expo.easeInOut
            }) : this.adsStart_do.setY(c), d.adsStart_do.setX(b), b = "left" == d.data.adsButtonsPosition_str ? 0 : d.tempVidStageWidth, c = d.controller_do ? d.controller_do.isShowed_bl ? d.tempVidStageHeight - d.adsSkip_do.h - d.data.controllerHeight - 30 : d.tempVidStageHeight - d.adsSkip_do.h - d.data.controllerHeight : d.tempVidStageHeight - d.adsSkip_do.h, FWDAnimation.killTweensOf(this.adsSkip_do), a ? FWDAnimation.to(this.adsSkip_do, .8, {
                y: c,
                ease: Expo.easeInOut
            }) : this.adsSkip_do.setY(c), d.adsSkip_do.setX(b)
        }, this.setupShareWindow = function() {
            FWDUVPShareWindow.setPrototype(), d.shareWindow_do = new FWDUVPShareWindow(d.data, d), d.shareWindow_do.addListener(FWDUVPShareWindow.HIDE_COMPLETE, d.shareWindowHideCompleteHandler)
        }, this.shareWindowHideCompleteHandler = function() {
            FWDUVPUtils.isIphone ? (d.videoScreen_do && !d.videoScreen_do.isStopped_bl && d.videoScreen_do.setX(0), d.ytb_do && !d.ytb_do.isStopped_bl && d.ytb_do.setX(0), d.vimeo_do && !d.vimeo_do.isStopped_bl && d.vimeo_do.setX(0)) : d.isVideoPlayingWhenOpenWindows_bl && d.resume(), d.controller_do && !d.isMobile_bl && (d.controller_do.shareButton_do.isDisabled_bl = !1, d.controller_do.shareButton_do.setNormalState());
        }, this.setupEmbedWindow = function() {
            FWDUVPEmbedWindow.setPrototype(), d.embedWindow_do = new FWDUVPEmbedWindow(d.data, d), d.embedWindow_do.addListener(FWDUVPEmbedWindow.ERROR, d.embedWindowErrorHandler), d.embedWindow_do.addListener(FWDUVPEmbedWindow.HIDE_COMPLETE, d.embedWindowHideCompleteHandler)
        }, this.embedWindowErrorHandler = function(a) {
            d.main_do.addChild(d.info_do), d.info_do.showText(a.error)
        }, this.embedWindowHideCompleteHandler = function() {
            FWDUVPUtils.isIphone ? (d.videoScreen_do && !d.videoScreen_do.isStopped_bl && d.videoScreen_do.setX(0), d.ytb_do && !d.ytb_do.isStopped_bl && d.ytb_do.setX(0), d.vimeo_do && !d.vimeo_do.isStopped_bl && d.vimeo_do.setX(0)) : d.isVideoPlayingWhenOpenWindows_bl && d.resume(), d.controller_do && !d.isMobile_bl && (d.controller_do.embedButton_do.isDisabled_bl = !1, d.controller_do.embedButton_do.setNormalState())
        }, this.copyLinkButtonOnMouseOver = function() {
            d.embedWindow_do.copyLinkButton_do.setSelectedState()
        }, this.copyLinkButtonOnMouseOut = function() {
            d.embedWindow_do.copyLinkButton_do.setNormalState()
        }, this.getLinkCopyPath = function() {
            return d.embedWindow_do.linkToVideo_str
        }, this.embedkButtonOnMouseOver = function() {
            d.embedWindow_do.copyEmbedButton_do.setSelectedState()
        }, this.embedButtonOnMouseOut = function() {
            d.embedWindow_do.copyEmbedButton_do.setNormalState()
        }, this.getEmbedCopyPath = function() {
            return d.embedWindow_do.finalEmbedCode_str
        }, this.setupFlashScreen = function() {
            if (!d.flash_do) {
                if (!FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) return d.main_do.addChild(d.info_do), d.info_do.showText("Please install Adobe Flash Player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>"), void(d.preloader_do && d.preloader_do.hide(!1));
                d.flash_do = new FWDUVPDisplayObject("div"), d.flash_do.setBackfaceVisibility(), d.flash_do.setResizableSizeAfterParent(), d.videoHolder_do.addChild(d.flash_do);
                var a = "opaque";
                d.flashObjectMarkup_str = '<object id="' + d.instanceName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + d.data.flashPath_str + '"/><param name="wmode" value="' + a + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + d.instanceName_str + "&volume=" + d.data.volume + "&bkColor_str=" + d.videoBackgroundColor_str + '"/><object type="application/x-shockwave-flash" data="' + d.data.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + d.data.flashPath_str + '"/><param name="wmode" value="' + a + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + d.instanceName_str + "&volume=" + d.data.volume + "&bkColor_str=" + d.videoBackgroundColor_str + '"/></object></object>', d.flash_do.screen.innerHTML = d.flashObjectMarkup_str, d.flashObject = d.flash_do.screen.firstChild, FWDUVPUtils.isIE || (d.flashObject = d.flashObject.getElementsByTagName("object")[0])
            }
        }, this.flashScreenIsReady = function() {
            console && console.log("flash is ready " + d.instanceName_str), d.isFlashScreenReady_bl = !0, d.isAPIReady_bl = !0, d.dispatchEvent(b.READY), d.setupVideoPoster(), d.setupSubtitle(), d.main_do.addChild(d.preloader_do), d.setupClickScreen(), d.setupPopupAds(), d.data.showLogo_bl && d.setupLogo(), d.addDoubleClickSupport(), d.setupVideoHider(), d.data.showController_bl && d.setupController(), d.setupAdsStart(), d.data.showPlaylistButtonAndPlaylist_bl && d.setupPlaylist(), d.setupLargePlayPauseButton(), d.data.showController_bl && d.setupHider(), d.data.showPlaylistsButtonAndPlaylists_bl && d.setupCategories(), d.setupDisableClick(), d.data.showEmbedButton_bl && d.setupEmbedWindow(), d.data.showShareButton_bl && d.setupShareWindow(), d.setupInfoWindow(), d.updatePlaylist(), d.isPlaylistLoadedFirstTime_bl = !0
        }, this.flashScreenFail = function() {
            d.main_do.addChild(d.info_do), d.info_do.showText("External interface error!"), d.resizeHandler()
        }, this.addKeyboardSupport = function() {
            document.addEventListener ? (document.addEventListener("keydown", this.onKeyDownHandler), document.addEventListener("keyup", this.onKeyUpHandler)) : document.attachEvent && (document.attachEvent("onkeydown", this.onKeyDownHandler), document.attachEvent("onkeyup", this.onKeyUpHandler))
        }, this.onKeyDownHandler = function(a) {
            if (!d.isSpaceDown_bl && (d.isSpaceDown_bl = !0, 32 == a.keyCode)) {
                if (d.videoType_str == b.YOUTUBE) {
                    if (!d.ytb_do.isSafeToBeControlled_bl) return;
                    d.ytb_do.togglePlayPause()
                } else if (d.videoType_str == b.VIMEO) {
                    if (!d.vimeo_do.isSafeToBeControlled_bl) return;
                    d.vimeo_do.togglePlayPause()
                } else if (b.hasHTML5Video) {
                    if (!d.videoScreen_do.isSafeToBeControlled_bl) return;
                    d.videoScreen_do.togglePlayPause()
                } else d.isFlashScreenReady_bl && d.flashObject.togglePlayPause();
                return a.preventDefault && a.preventDefault(), !1
            }
        }, this.onKeyUpHandler = function(a) {
            d.isSpaceDown_bl = !1
        }, this.setupHider = function() {
            FWDUVPHider.setPrototype(), d.hider = new FWDUVPHider(d.main_do, d.controller_do, d.data.controllerHideDelay), d.hider.addListener(FWDUVPHider.SHOW, d.hiderShowHandler), d.hider.addListener(FWDUVPHider.HIDE, d.hiderHideHandler), d.hider.addListener(FWDUVPHider.HIDE_COMPLETE, d.hiderHideCompleteHandler)
        }, this.hiderShowHandler = function() {
            d.controller_do && d.controller_do.show(!0), d.logo_do && d.data.hideLogoWithController_bl && d.isPlaying_bl && d.logo_do.show(!0), d.showCursor(), d.isAdd_bl && (d.positionAds(!0), d.adsStart_do.showWithOpacity(), d.adsSkip_do.showWithOpacity()), d.subtitle_do && d.subtitle_do.position(!0), d.popupAds_do && d.popupAds_do.position(!0)
        }, this.hiderHideHandler = function() {
            if (!FWDUVPUtils.isIphone) {
                if (d.videoType_str == b.VIMEO) return void d.hider.reset();
                if (d.controller_do.volumeScrubber_do && d.controller_do.isVolumeScrubberShowed_bl) return void d.hider.reset();
                if (d.data.showYoutubeQualityButton_bl && FWDUVPUtils.hitTest(d.controller_do.ytbButtonsHolder_do.screen, d.hider.globalX, d.hider.globalY)) return void d.hider.reset();
                if (FWDUVPUtils.hitTest(d.controller_do.screen, d.hider.globalX, d.hider.globalY)) return void d.hider.reset();
                if (FWDUVPUtils.hitTest(d.controller_do.mainScrubber_do.screen, d.hider.globalX, d.hider.globalY)) return void d.hider.reset();
                d.controller_do.hide(!0), d.logo_do && d.data.hideLogoWithController_bl && d.logo_do.hide(!0), d.isFullScreen_bl && d.hideCursor(), d.isAdd_bl && (d.positionAds(!0), d.adsStart_do.hideWithOpacity(), d.adsSkip_do.hideWithOpacity()), d.subtitle_do.position(!0), d.popupAds_do && d.popupAds_do.position(!0)
            }
        }, this.hiderHideCompleteHandler = function() {
            d.controller_do.positionScrollBarOnTopOfTheController()
        }, this.play = function() {
            d.isAPIReady_bl && (d.isMobile_bl && d.videoType_str == b.YOUTUBE && d.ytb_do && !d.ytb_do.isSafeToBeControlled_bl || (FWDUVPUtils.isIphone && d.videoScreen_do.setX(0), b.stopAllVideos(d), d.videoType_str == b.YOUTUBE && d.ytb_do ? d.ytb_do.play() : d.videoType_str == b.VIMEO && d.vimeo_do ? !d.vimeo_do.isStopped_bl || d.vimeo_do.isVideoLoaded_bl || d.useDeepLinking_bl ? d.vimeo_do.play() : d.playVimeoWithDelay() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.play() : d.isFlashScreenReady_bl && (d.flashObject.playVideo(), d.scrub(0)), b.keyboardCurInstance = d, d.videoPoster_do.allowToShow_bl = !1, d.largePlayButton_do.hide(), d.videoPoster_do.hide()))
        }, this.pause = function() {
            d.isAPIReady_bl && (FWDUVPUtils.isIphone && d.videoScreen_do.setX(0), d.videoType_str == b.YOUTUBE ? d.ytb_do.pause() : d.videoType_str == b.VIMEO ? d.vimeo_do.pause() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.pause() : d.isFlashScreenReady_bl && d.flashObject.pauseVideo())
        }, this.resume = function() {
            d.isAPIReady_bl && (FWDUVPUtils.isIphone && d.videoScreen_do.setX(0), d.videoType_str == b.YOUTUBE && d.ytb_do ? d.ytb_do.resume() : d.videoType_str == b.VIMEO && d.vimeo_do ? d.vimeo_do.resume() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.resume() : d.isFlashScreenReady_bl && d.flashObject.resume())
        }, this.stop = function(a) {
            d.isAPIReady_bl && (FWDUVPUtils.isIphone && d.videoScreen_do.setX(-5e3), d.videoType_str == b.YOUTUBE ? (d.controller_do && (d.controller_do.ytbQualityButton_do && d.controller_do.ytbQualityButton_do.disable(), d.controller_do.hideQualityButtons(!1)), d.ytb_do.stop()) : d.videoType_str == b.VIMEO ? d.vimeo_do.stop() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.stop() : d.isFlashScreenReady_bl && d.flashObject.stopVideo(), clearTimeout(d.playVimeoWhenLoadedId_to), d.isMobile_bl ? (d.data.showControllerWhenVideoIsStopped_bl && d.controller_do && d.controller_do.show(!0), a || d.videoType_str == b.YOUTUBE ? d.useYoutube_bl && (d.ytb_do.ytb || d.ytb_do.setupVideo()) : (d.videoPoster_do.show(), d.largePlayButton_do.show())) : (d.controller_do && d.data.showControllerWhenVideoIsStopped_bl && d.controller_do.show(!0), d.videoPoster_do && d.videoPoster_do.show(), d.largePlayButton_do && d.largePlayButton_do.show()), d.controller_do && d.controller_do.subtitleButton_do && (d.controller_do.disableSubtitleButton(), d.subtitle_do && (d.subtitle_do.showSubtitleByDefault_bl ? d.controller_do.subtitleButton_do.setButtonState(0) : d.controller_do.subtitleButton_do.setButtonState(1))), d.popupAds_do && d.popupAds_do.hideAllPopupButtons(!1), d.subtitle_do && d.subtitle_do.hide(), d.hider && d.hider.reset(), d.showCursor(), d.adsStart_do && d.adsStart_do.hide(!0), d.adsSkip_do && d.adsSkip_do.hide(!0))
        }, this.startToScrub = function() {
            d.isAPIReady_bl && (d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.isSafeToBeControlled_bl ? d.ytb_do.startToScrub() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.startToScrub() : d.isFlashScreenReady_bl && d.flashObject.startToScrub())
        }, this.stopToScrub = function() {
            d.isAPIReady_bl && (d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.isSafeToBeControlled_bl ? d.ytb_do.stopToScrub() : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.stopToScrub() : d.isFlashScreenReady_bl && d.flashObject.stopToScrub())
        }, this.scrub = function(a) {
            d.isAPIReady_bl && (isNaN(a) || (a < 0 ? a = 0 : a > 1 && (a = 1), d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.isSafeToBeControlled_bl ? d.ytb_do.scrub(a) : d.videoType_str == b.VIMEO && d.vimeo_do && d.vimeo_do.isSafeToBeControlled_bl ? d.vimeo_do.scrub(a) : b.hasHTML5Video ? d.videoScreen_do && d.videoScreen_do.scrub(a) : d.isFlashScreenReady_bl && d.flashObject.scrub(a)))
        }, this.setVolume = function(a) {
            d.isAPIReady_bl && !d.isMobile_bl && (d.volume = a, d.controller_do && d.controller_do.updateVolume(a, !0), d.videoType_str == b.YOUTUBE && d.ytb_do && d.ytb_do.setVolume(a), d.videoType_str == b.VIMEO && d.vimeo_do && d.vimeo_do.setVolume(a), b.hasHTML5Video && d.videoScreen_do && d.videoScreen_do.setVolume(a), d.isFlashScreenReady_bl && d.flashObject.setVolume(a), d.dispatchEvent(b.VOLUME_SET, {
                volume: a
            }))
        }, this.showCategories = function() {
            d.isAPIReady_bl && (d.videoType_str == b.YOUTUBE && d.ytb_do ? d.isVideoPlayingWhenOpenWindows_bl = d.ytb_do.isPlaying_bl : b.hasHTML5Video && d.videoScreen_do && (d.isVideoPlayingWhenOpenWindows_bl = d.videoScreen_do.isPlaying_bl), d.categories_do && (d.categories_do.show(d.catId), d.customContextMenu_do && d.customContextMenu_do.updateParent(d.categories_do), d.controller_do && d.controller_do.setCategoriesButtonState("selected"), FWDUVPUtils.isIphone || d.pause()))
        }, this.hideCategories = function() {
            d.isAPIReady_bl && d.categories_do && (d.categories_do.hide(), d.controller_do && d.controller_do.setCategoriesButtonState("unselected"))
        }, this.showPlaylist = function() {
            d.isAPIReady_bl && d.showPlaylistButtonAndPlaylist_bl && (d.isPlaylistShowed_bl = !1, d.controller_do && d.controller_do.showHidePlaylistButton(), d.playlist_do.hide(!d.isMobile_bl), d.resizeHandler(!d.isMobile_bl), FWDUVPUtils.isSafari && FWDUVPUtils.isWin ? (d.playlist_do.hide(!1), d.resizeHandler(!1)) : d.isMobile_bl || FWDAnimation.to(d, .8, {
                tempStageWidth: d.stageWidth,
                tempStageHeight: d.stageHeight,
                tempVidStageWidth: d.vidStageWidth,
                tempVidStageHeight: d.vidStageHeight,
                ease: Expo.easeInOut,
                onUpdate: d.resizeFinal
            }))
        }, this.hidePlaylist = function() {
            d.isAPIReady_bl && d.showPlaylistButtonAndPlaylist_bl && (d.isPlaylistShowed_bl = !0, d.controller_do && d.controller_do.showShowPlaylistButton(), d.playlist_do.show(!d.isMobile_bl), d.resizeHandler(!d.isMobile_bl), FWDUVPUtils.isSafari && FWDUVPUtils.isWin ? (d.playlist_do.show(!1), d.resizeHandler(!1)) : d.isMobile_bl || FWDAnimation.to(d, .8, {
                tempStageWidth: d.stageWidth,
                tempStageHeight: d.stageHeight,
                tempVidStageWidth: d.vidStageWidth,
                tempVidStageHeight: d.vidStageHeight,
                ease: Expo.easeInOut,
                onUpdate: d.resizeFinal
            }))
        }, this.setPosterSource = function(a) {
            if (d.isAPIReady_bl && a) {
                var c = a.split(",");
                a = d.isMobile_bl && void 0 != c[1] ? c[1] : c[0], d.videoPoster_do && (d.posterPath_str = a, d.videoSourcePath_str.indexOf(".") == -1 && d.useYoutube_bl && d.isMobile_bl || d.videoSourcePath_str.indexOf("vimeo.com") == -1 && d.useVimeo_bl && d.isMobile_bl ? d.videoPoster_do.setPoster("youtubemobile") : (d.videoPoster_do.setPoster(d.posterPath_str), d.prevPosterSource_str != a && d.dispatchEvent(b.UPDATE_POSTER_SOURCE)), d.prevPosterSource_str = a)
            }
        }, this.setSource = function(a, c) {
            if (d.isAPIReady_bl) {
                d.id < 0 ? d.id = 0 : d.id > d.totalVideos - 1 && (d.id = d.totalVideos - 1);
                var a;
                d.data.playlist_ar[d.id].ads && !d.data.playlist_ar[d.id].isAdsPlayed_bl ? (a = d.data.playlist_ar[d.id].ads.source, d.isAdd_bl = !0, d.data.playlist_ar[d.id].isAdsPlayed_bl = !0) : (a = a || d.data.playlist_ar[d.id].videoSource, d.isAdd_bl = !1);
                for (var e = 0; e < d.data.playlist_ar.length; e++) d.id == e || d.data.playAdsOnlyOnce_bl || (d.data.playlist_ar[e].isAdsPlayed_bl = !1);
                if (a != d.prevVideoSource_str || d.isAdd_bl || c) {
                    if (d.controller_do && d.controller_do.enablePlayButton(), d.prevVideoSource_str = a, !a) return d.main_do.addChild(d.info_do), void d.info_do.showText("Video source is not defined!");
                    if (d.playlist_do && (d.playlist_do.curId = d.id, d.playlist_do.checkThumbsState()), d.videoSourcePath_str.indexOf("vimeo.com") != -1 && d.useVimeo_bl ? d.prevVideoType_str = b.VIMEO : d.videoSourcePath_str.indexOf(".") == -1 && d.useYoutube_bl ? d.prevVideoType_str = b.YOUTUBE : d.prevVideoType_str = b.VIDEO, d.stop(a), d.videoSourcePath_str = a, d.finalVideoPath_str = a, d.videoSourcePath_str.indexOf("vimeo.com") != -1 && d.useVimeo_bl ? d.videoType_str = b.VIMEO : d.videoSourcePath_str.indexOf(".") == -1 && d.useYoutube_bl ? d.videoType_str = b.YOUTUBE : d.videoType_str = b.VIDEO, d.posterPath_str = d.data.playlist_ar[d.id].posterSource, d.isAdd_bl && a.indexOf(".") == -1) return void setTimeout(function() {
                        d.main_do.addChild(d.info_do), d.info_do.showText("Advertisment youtube videos are not supported, please make sure you are using a mp4 video file.")
                    }, 200);
                    if (d.popupAds_do && (d.data.playlist_ar[d.id].popupAds_ar ? (d.popupAds_do.resetPopups(d.data.playlist_ar[d.id].popupAds_ar), d.popupAds_do.id = d.curId) : d.popupAds_do.hideAllPopupButtons(!0)), d.videoType_str == b.VIMEO) return d.ytb_do && d.ytb_do.setX(-5e3), d.videoScreen_do && d.videoScreen_do.setX(-5e3), 0 != d.vimeo_do.x && d.vimeo_do.setX(0), d.flash_do ? (d.flash_do.setWidth(0), d.flash_do.setHeight(0)) : d.videoScreen_do && d.videoScreen_do.setVisible(!1), d.vimeo_do.setSource(a), d.controller_do && (d.controller_do.hideQualityButtons(!1), d.controller_do.removeYtbQualityButton()), d.isMobile_bl ? (d.videoPoster_do.hide(), d.largePlayButton_do && d.largePlayButton_do.hide()) : (d.setPosterSource(d.posterPath_str), d.videoPoster_do && d.videoPoster_do.show(), d.largePlayButton_do && d.largePlayButton_do.show()), d.getVideoSource() && d.dispatchEvent(b.UPDATE_VIDEO_SOURCE), void this.resizeHandler();
                    if (d.videoType_str == b.YOUTUBE) {
                        if (d.vimeo_do && d.vimeo_do.setX(-5e3), d.videoScreen_do && d.videoScreen_do.setX(-5e3), d.setPosterSource(d.posterPath_str), d.ytb_do.ytb || d.ytb_do.setupVideo(), d.ytb_do.ytb && !d.ytb_do.ytb.cueVideoById) return;
                        return d.ytb_do && d.ytb_do.setX(0), d.flash_do ? (d.flash_do.setWidth(0), d.flash_do.setHeight(0)) : d.videoScreen_do.setVisible(!1), d.ytb_do.setSource(a), d.isMobile_bl ? (d.videoPoster_do.hide(), d.largePlayButton_do.hide()) : (d.videoPoster_do.show(), d.largePlayButton_do.show(), d.data.autoPlay_bl && d.play()), d.controller_do && d.controller_do.addYtbQualityButton(), d.resizeHandler(!1, !0), void(d.getVideoSource() && d.dispatchEvent(b.UPDATE_VIDEO_SOURCE))
                    }
                    var f = a.split(",");
                    a = d.isMobile_bl && void 0 != f[1] ? f[1] : f[0], d.finalVideoPath_str = a, b.hasHTML5Video && d.videoType_str == b.VIDEO ? (d.vimeo_do && d.vimeo_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.setPosterSource(d.posterPath_str), d.videoPoster_do.show(), d.largePlayButton_do.show(), FWDUVPUtils.isIphone ? d.videoScreen_do.setX(-5e3) : d.videoScreen_do.setX(0), d.videoScreen_do.setVisible(!0), d.controller_do && (d.controller_do.hideQualityButtons(!1), d.controller_do.removeYtbQualityButton()), d.videoScreen_do && (d.videoScreen_do.setSource(a), d.data.autoPlay_bl && d.play())) : d.isFlashScreenReady_bl && d.videoType_str == b.VIDEO && (d.vimeo_do && d.vimeo_do.setX(-5e3), d.ytb_do && d.ytb_do.setX(-5e3), d.controller_do && (d.controller_do.removeYtbQualityButton(), d.controller_do.hideQualityButtons(!1)), a.indexOf("://") == -1 && 1 != a.indexOf("/") && (a = a.substr(a.indexOf("/") + 1)), d.setPosterSource(d.posterPath_str), d.videoPoster_do.show(), d.largePlayButton_do.show(), d.flashObject.setSource(a), d.data.autoPlay_bl && d.play()), d.prevVideoSourcePath_str = d.videoSourcePath_str, d.resizeHandler(!1, !0), d.getVideoSource() && d.dispatchEvent(b.UPDATE_VIDEO_SOURCE)
                }
            }
        }, this.goFullScreen = function() {
            if (d.isAPIReady_bl) {
                d.isFullScreen_bl = !0, document.addEventListener && (document.addEventListener("fullscreenchange", d.onFullScreenChange), document.addEventListener("mozfullscreenchange", d.onFullScreenChange), document.addEventListener("webkitfullscreenchange", d.onFullScreenChange), document.addEventListener("MSFullscreenChange", d.onFullScreenChange)), FWDUVPUtils.isSafari && FWDUVPUtils.isWin || (document.documentElement.requestFullScreen ? d.main_do.screen.requestFullScreen() : document.documentElement.mozRequestFullScreen ? d.main_do.screen.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen ? d.main_do.screen.webkitRequestFullScreen() : document.documentElement.msRequestFullscreen && d.main_do.screen.msRequestFullscreen()), d.disableClick(), d.isEmbedded_bl || (d.main_do.getStyle().position = "fixed", document.documentElement.style.overflow = "hidden", d.main_do.getStyle().zIndex = 9999999999998), d.controller_do && (d.controller_do.showNormalScreenButton(), d.controller_do.setNormalStateToFullScreenButton());
                var c = FWDUVPUtils.getScrollOffsets();
                d.lastX = c.x, d.lastY = c.y, a.scrollTo(0, 0), d.isMobile_bl && a.addEventListener("touchmove", d.disableFullScreenOnMobileHandler), d.dispatchEvent(b.GO_FULLSCREEN), d.resizeHandler()
            }
        }, this.disableFullScreenOnMobileHandler = function(a) {
            a.preventDefault && a.preventDefault()
        }, this.goNormalScreen = function() {
            d.isAPIReady_bl && (document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), d.disableClick(), d.addMainDoToTheOriginalParent(), d.isFullScreen_bl = !1)
        }, this.addMainDoToTheOriginalParent = function() {
            d.isFullScreen_bl && (document.removeEventListener && (document.removeEventListener("fullscreenchange", d.onFullScreenChange), document.removeEventListener("mozfullscreenchange", d.onFullScreenChange), document.removeEventListener("webkitfullscreenchange", d.onFullScreenChange), document.removeEventListener("MSFullscreenChange", d.onFullScreenChange)), d.controller_do && d.controller_do.setNormalStateToFullScreenButton(), d.isEmbedded_bl || (d.displayType == b.RESPONSIVE ? (FWDUVPUtils.isIEAndLessThen9 ? document.documentElement.style.overflow = "auto" : document.documentElement.style.overflow = "visible", d.main_do.getStyle().position = "relative", d.main_do.getStyle().zIndex = 0) : (d.main_do.getStyle().position = "absolute", d.main_do.getStyle().zIndex = 9999999999998)), d.displayType != b.FULL_SCREEN && d.controller_do.enablePlaylistButton(), d.controller_do.showFullScreenButton(), a.scrollTo(d.lastX, d.lastY), d.showCursor(), d.resizeHandler(), setTimeout(d.resizeHandler, 500), a.scrollTo(d.lastX, d.lastY), FWDUVPUtils.isIE || setTimeout(function() {
                a.scrollTo(d.lastX, d.lastY)
            }, 150), d.isMobile_bl && a.removeEventListener("touchmove", d.disableFullScreenOnMobileHandler), d.dispatchEvent(b.GO_NORMALSCREEN))
        }, this.onFullScreenChange = function(a) {
            document.fullScreen || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen || (d.controller_do.showNormalScreenButton(), d.addMainDoToTheOriginalParent(), d.isFullScreen_bl = !1)
        }, this.loadPlaylist = function(a) {
            d.isAPIReady_bl && d.isPlaylistLoaded_bl && d.data.prevId != a && (d.catId = a, d.id = 0, d.catId < 0 ? d.catId = 0 : d.catId > d.data.totalPlaylists - 1 && (d.catId = d.data.totalPlaylists - 1), d.useDeepLinking_bl ? FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : d.loadInternalPlaylist())
        }, this.playNext = function() {
            d.isAPIReady_bl && d.isPlaylistLoaded_bl && (d.id++, d.id < 0 ? d.id = d.totalVideos - 1 : d.id > d.totalVideos - 1 && (d.id = 0), d.useDeepLinking_bl ? FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : (d.setSource(), d.isMobile_bl && d.videoType_str == b.VIDEO && d.play(), d.isMobile_bl || (d.videoType_str == b.VIMEO ? d.playVimeoWithDelay() : d.play())))
        }, this.playPrev = function() {
            d.isAPIReady_bl && d.isPlaylistLoaded_bl && (d.id--, d.id < 0 ? d.id = d.totalVideos - 1 : d.id > d.totalVideos - 1 && (d.id = 0), d.useDeepLinking_bl ? FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : (d.setSource(), d.isMobile_bl && d.videoType_str == b.VIDEO && d.play(), d.isMobile_bl || (d.videoType_str == b.VIMEO ? d.playVimeoWithDelay() : d.play())))
        }, this.playShuffle = function() {
            if (d.isAPIReady_bl && d.isPlaylistLoaded_bl) {
                for (var a = parseInt(Math.random() * d.totalVideos); a == d.id;) a = parseInt(Math.random() * d.totalVideos);
                d.id = a, d.id < 0 ? d.id = d.totalVideos - 1 : d.id > d.totalVideos - 1 && (d.id = 0), d.useDeepLinking_bl ? FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : (d.setSource(), d.isMobile_bl && d.videoType_str == b.VIDEO && d.play(), d.isMobile_bl || (d.videoType_str == b.VIMEO ? d.playVimeoWithDelay() : d.play()))
            }
        }, this.playVideo = function(a) {
            d.isAPIReady_bl && d.isPlaylistLoaded_bl && (d.id = a, d.id < 0 ? d.id = d.totalVideos - 1 : d.id > d.totalVideos - 1 && (d.id = 0), d.useDeepLinking_bl ? FWDAddress.setValue("?playlistId=" + d.catId + "&videoId=" + d.id) : (d.setSource(), d.isMobile_bl && d.videoType_str == b.VIDEO && d.play(), d.isMobile_bl || d.videoType_str == b.VIMEO && d.playVimeoWithDelay()))
        }, this.setVideoSource = function(a) {
            d.isAdd_bl = !1, d.setSource(a)
        }, this.downloadVideo = function(a) {
            void 0 == a && (a = d.id);
            var b = d.data.playlist_ar[a].downloadPath,
                c = d.data.playlist_ar[a].titleText;
            d.data.downloadVideo(b, c)
        }, this.share = function() {
            d.isAPIReady_bl && d.controllerShareHandler()
        }, this.getVideoSource = function() {
            if (d.isAPIReady_bl) return d.finalVideoPath_str
        }, this.getPosterSource = function() {
            if (d.isAPIReady_bl) return d.posterPath_str
        }, this.getPlaylistId = function() {
            return d.catId
        }, this.getVideoId = function() {
            return d.id
        }, this.getCurrentTime = function() {
            var a;
            return a = d.curTime ? d.curTime : "00:00"
        }, this.getTotalTime = function() {
            var a;
            return a = d.totalTime ? d.totalTime : "00:00"
        }, this.hideCursor = function() {
            document.documentElement.style.cursor = "none", document.getElementsByTagName("body")[0].style.cursor = "none", d.isAdd_bl || (d.dumyClick_do.getStyle().cursor = "none")
        }, this.showCursor = function() {
            d.dumyClick_do && (document.documentElement.style.cursor = "auto", document.getElementsByTagName("body")[0].style.cursor = "auto", d.isAdd_bl ? d.dumyClick_do.setButtonMode(!0) : d.dumyClick_do.getStyle().cursor = "auto")
        }, this.addListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function.");
            var c = {};
            c.type = a, c.listener = b, c.target = this, this.listeners.events_ar.push(c)
        }, this.dispatchEvent = function(a, b) {
            if (null != this.listeners) {
                if (void 0 == a) throw Error("type is required.");
                if ("object" == typeof a) throw Error("type must be of type String.");
                for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                    if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a) {
                        if (b)
                            for (var e in b) this.listeners.events_ar[c][e] = b[e];
                        this.listeners.events_ar[c].listener.call(this, this.listeners.events_ar[c])
                    }
            }
        }, this.removeListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function." + a);
            for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a && this.listeners.events_ar[c].listener === b) {
                    this.listeners.events_ar.splice(c, 1);
                    break
                }
        }, d.cleanMainEvents = function() {
            a.removeEventListener ? a.removeEventListener("resize", d.onResizeHandler) : a.detachEvent && a.detachEvent("onresize", d.onResizeHandler), clearTimeout(d.resizeHandlerId_to), clearTimeout(d.resizeHandler2Id_to), clearTimeout(d.hidePreloaderId_to), clearTimeout(d.orientationChangeId_to)
        };
        var e = FWDUVPUtils.getUrlArgs(a.location.search),
            f = e.RVPInstanceName,
            g = e.RVPInstanceName;
        if (f && (d.isEmbedded_bl = c.instanceName == g), d.isEmbedded_bl) {
            var h = FWDUVPUtils.getViewportSize();
            d.embeddedPlaylistId = parseInt(e.RVPPlaylistId), d.embeddedVideoId = parseInt(e.RVPVideoId);
            var i = new FWDUVPDisplayObject("div");
            i.setBkColor(c.backgroundColor), i.setWidth(h.w), i.setHeight(h.h), document.documentElement.style.overflow = "hidden", document.getElementsByTagName("body")[0].style.overflow = "hidden", FWDUVPUtils.isIEAndLessThen9 ? document.getElementsByTagName("body")[0].appendChild(i.screen) : document.documentElement.appendChild(i.screen)
        }
        return d.useYoutube_bl && (location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isIE || location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isOpera) ? (d.stageContainer = FWDUVPUtils.getChildById(c.parentId), d.setupMainDo(), d.setupInfo(), d.main_do.addChild(d.info_do), d.info_do.allowToRemove_bl = !1, d.info_do.showText('This browser dosen\'t allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome! If you don\'t want to use Youtube set <font color="#FF000000">useYoutube:"no"</font>.'), void d.resizeHandler()) : d.useVimeo_bl && location.protocol.indexOf("file:") != -1 ? (d.stageContainer = FWDUVPUtils.getChildById(c.parentId), d.setupMainDo(), d.setupInfo(), d.main_do.addChild(d.info_do), d.info_do.allowToRemove_bl = !1, d.info_do.showText('Vimeo videos can\'t be played local, please test it online! If you don\'t want to use Vimeo set <font color="#FF0000">useVimeo:"no"</font>.'), void d.resizeHandler()) : void setTimeout(b.checkIfHasYoutube, 500)
    };
    b.setupAllInstances = function() {
        if (!b.areInstancesCreated_bl) {
            var c = FWDUVPUtils.getUrlArgs(a.location.search),
                d = c.UVPInstanceName;
            "pause" != b.videoStartBehaviour && "stop" != b.videoStartBehaviour && "none" != b.videoStartBehaviour && (b.videoStartBehaviour = "pause"), FWDUVPUtils.isMobile_bl && (b.videoStartBehaviour = "stop"), b.areInstancesCreated_bl = !0;
            var f, h, e = b.instaces_ar.length,
                g = !1;
            if (d)
                for (var i = 0; i < e; i++)
                    if (f = b.instaces_ar[i], f.props.instanceName == d) return void(b.isEmbedded_bl = !0);
            for (var i = 0; i < e; i++) f = b.instaces_ar[i], h = b.instaces_ar[i - 1], f.init(), g && (f.data.autoPlay_bl = !1), 1 == f.data.autoPlay_bl && (g = !0)
        }
    }, b.checkIfHasYoutube = function() {
        if (!b.checkIfHasYoutube_bl) {
            b.checkIfHasYoutube_bl = !0;
            for (var d, a = !1, c = b.instaces_ar.length, e = 0; e < c; e++) d = b.instaces_ar[e], d.useYoutube_bl && (a = !0);
            a ? setTimeout(b.setupYoutubeAPI, 500) : setTimeout(b.setupAllInstances, 500)
        }
    }, b.setupYoutubeAPI = function() {
        if (!b.isYoutubeAPICreated_bl)
            if (b.isYoutubeAPICreated_bl = !0, "undefined" != typeof YT) b.setupAllInstances();
            else {
                a.onYouTubeIframeAPIReady = function() {
                    b.setupAllInstances()
                };
                var c = document.createElement("script");
                c.src = "https://www.youtube.com/iframe_api";
                var d = document.getElementsByTagName("script")[0];
                d.parentNode.insertBefore(c, d)
            }
    }, b.setPrototype = function() {
        b.prototype = new FWDUVPEventDispatcher
    }, b.countInstances = 1, b.setupMainInstance = function() {
        b.areMainInstancesInitialized_bl || (b.areMainInstancesInitialized_bl = !0, setTimeout(function() {
            for (var a = 0; a < b.instaces_ar.length; a++) b.instaces_ar[a].init()
        }, 100 * b.countInstances))
    }, b.stopAllVideos = function(a) {
        for (var d, c = b.instaces_ar.length, e = 0; e < c; e++) d = b.instaces_ar[e], d != a && d.stop()
    }, b.hasHTML5VideoTestIsDone = !1, b.hasHTML5VideoTestIsDone || (b.hasHTML5Video = function() {
        var a = document.createElement("video"),
            c = !1;
        return a.canPlayType && (c = Boolean("probably" == a.canPlayType("video/mp4") || "maybe" == a.canPlayType("video/mp4")), b.canPlayMp4 = Boolean("probably" == a.canPlayType("video/mp4") || "maybe" == a.canPlayType("video/mp4")), b.canPlayOgg = Boolean("probably" == a.canPlayType("video/ogg") || "maybe" == a.canPlayType("video/ogg")), b.canPlayWebm = Boolean("probably" == a.canPlayType("video/webm") || "maybe" == a.canPlayType("video/webm"))), !!self.isMobile_bl || (b.hasHTML5VideoTestIsDone = !0, c)
    }()), b.hasCanvas = function() {
        return Boolean(document.createElement("canvas"))
    }(), b.instaces_ar = [], b.areMainInstancesInitialized_bl = !1, b.curInstance = null, b.keyboardCurInstance = null, b.isYoutubeAPICreated_bl = !1, b.PAUSE_ALL_VIDEOS = "pause", b.STOP_ALL_VIDEOS = "stop", b.DO_NOTHING = "none", b.YOUTUBE = "youtube", b.VIMEO = "vimeo", b.VIDEO = "video", b.atLeastOnePlayerHasDeeplinking_bl = !1, b.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist", b.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete", b.READY = "ready", b.STOP = "stop", b.PLAY = "play", b.PAUSE = "pause", b.UPDATE = "update", b.UPDATE_TIME = "updateTime", b.UPDATE_VIDEO_SOURCE = "updateVideoSource", b.UPDATE_POSTER_SOURCE = "udpatePosterSource", b.ERROR = "error", b.PLAY_COMPLETE = "playComplete", b.VOLUME_SET = "volumeSet", b.GO_FULLSCREEN = "goFullScreen", b.GO_NORMALSCREEN = "goNormalScreen", b.RESPONSIVE = "responsive", b.FULL_SCREEN = "fullscreen", a.FWDUVPlayer = b
}(window),
function(a) {
    var b = function(c, d, e, f) {
        var g = this;
        b.prototype;
        this.img_img = null, this.logoImage_do = null, this.position_str = e, this.source_str = d, this.logoLink_str = c.data.logoLink_str, this.margins = f, this.isShowed_bl = !0, this.allowToShow_bl = !0, this.init = function() {
            "none" == g.logoLink_str ? g.getStyle().pointerEvents = "none" : (g.setButtonMode(!0), g.screen.onclick = function() {
                a.open(g.logoLink_str, "_blank")
            }), g.logoImage_do = new FWDUVPDisplayObject("img"), g.img_img = new Image, g.img_img.onerror = null, g.img_img.onload = g.loadDone, g.img_img.src = g.source_str, g.hide()
        }, this.loadDone = function() {
            g.setWidth(g.img_img.width), g.setHeight(g.img_img.height), g.logoImage_do.setScreen(g.img_img), g.addChild(g.logoImage_do), g.logoImage_do.setWidth(g.img_img.width), g.logoImage_do.setHeight(g.img_img.height), g.positionAndResize()
        }, this.positionAndResize = function() {
            c.tempVidStageWidth && ("topleft" == g.position_str ? (g.finalX = g.margins, g.finalY = g.margins) : "topright" == g.position_str ? (g.finalX = c.tempVidStageWidth - g.w - g.margins, g.finalY = g.margins) : "bottomright" == g.position_str ? (g.finalX = c.tempVidStageWidth - g.w - g.margins, g.finalY = c.tempVidStageHeight - g.h - g.margins) : "bottomleft" == g.position_str && (g.finalX = g.margins, g.finalY = c.tempVidStageHeight - g.h - g.margins), g.setX(g.finalX), g.setY(g.finalY))
        }, this.show = function(a) {
            g.isShowed_bl || (g.isShowed_bl = !0, g.setVisible(!0), FWDAnimation.killTweensOf(g), a ? FWDAnimation.to(g, .8, {
                alpha: 1,
                ease: Expo.easeInOut
            }) : g.setAlpha(1))
        }, this.hide = function(a, b) {
            (g.isShowed_bl || b) && (g.isShowed_bl = !1, FWDAnimation.killTweensOf(g), a ? FWDAnimation.to(g, .8, {
                alpha: 0,
                ease: Expo.easeInOut,
                onComplete: function() {
                    g.setVisible(!1)
                }
            }) : (g.setAlpha(0), g.setVisible(!1)))
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.prototype = null, a.FWDUVPLogo = b
}(window),
function(a) {
    var b = function(c, d) {
        var e = this;
        b.prototype;
        this.moveEvent = null, this.image_img = null, this.prevN_img = d.prevN_img, this.nextN_img = d.nextN_img, this.replayN_img = d.replayN_img, this.shuffleN_img = d.shuffleN_img, this.scrBkTop_img = d.scrBkTop_img, this.scrDragTop_img = d.scrDragTop_img, this.scrLinesN_img = d.scrLinesN_img, this.playlist_ar = null, this.buttons_ar = [], this.thumbs_ar = null, this.playlistNameHolder_do = null, this.playlistName_do = null, this.scrMainHolder_do = null, this.scrTrack_do = null, this.scrTrackTop_do = null, this.scrTrackMiddle_do = null, this.scrTrackBottom_do = null, this.scrHandler_do = null, this.scrHandlerTop_do = null, this.scrHandlerMiddle_do = null, this.scrHandlerBottom_do = null, this.scrHandlerLines_do = null, this.scrHandlerLinesN_do = null, this.scrHandlerLinesS_do = null, this.mainHolder_do = null, this.mainThumbsHolder_do = null, this.controllBar_do = null, this.input_do = null, this.inputArrow_do = null, this.bk_do = null, this.thumbsHolder_do = null, this.nextButton_do = null, this.prevButton_do = null, this.toolTip_do = null, this.shuffleButton_do = null, this.loopButton_do = null, this.prevButtonToolTip_do = null, this.loopButtonToolTip_do = null, this.shuffleButtonToolTip_do = null, this.nextButtonToolTip_do = null, this.noSearchFound_do = null, this.bkPath_str = d.controllerBkPath_str, this.position_str = c.playlistPosition_str, this.playlistBackgroundColor_str = d.playlistBackgroundColor_str, this.inputBackgroundColor_str = d.searchInputBackgroundColor_str, this.inputColor_str = d.searchInputColor_str,
            this.prevInputValue_str = "none", this.scrWidth = e.scrBkTop_img.width, this.mouseX = 0, this.mouseY = 0, this.catId = -1, this.dif = 0, this.countLoadedThumbs = 0, this.curId = -1, this.finalX = 0, this.finalY = 0, this.controlBarHeight = d.controllerHeight, this.totalThumbs = 0, this.totalWidth = c.playlistWidth, this.totalHeight = c.playlistHeight, this.thumbImageW = d.thumbnailWidth, this.thumbImageH = d.thumbnailHeight, this.thumbInPadding = 2, this.spaceBetweenThumbnails = d.spaceBetweenThumbnails, this.startSpaceBetweenButtons = d.startSpaceBetweenButtons, this.spaceBetweenButtons = d.spaceBetweenButtons, this.totalButtons = 0, this.buttonsToolTipHideDelay = d.buttonsToolTipHideDelay, this.removeFromThumbsHolderHeight = 0, this.totalThumbsHeight = 0, this.scrollBarHandlerFinalY = 0, this.stageWidth = e.totalWidth, this.stageHeight = e.totalHeight, this.scrollbarOffestWidth = d.scrollbarOffestWidth, this.lastThumbnailFinalY = -1, this.thumbnailsFinalY = 0, this.scollbarSpeedSensitivity = d.scollbarSpeedSensitivity, this.vy = 0, this.vy2 = 0, this.friction = .9, this.loadWithDelayId_to, this.showToolTipId_to, this.disableThumbsId_to, this.disableMouseWheelId_to, this.thumbnailsAnimDoneId_to, this.disableForAWhileAfterThumbClickId_to, this.updateMobileScrollBarId_int, this.disableForAWhileAfterThumbClick_bl = !1, this.showPlaylistName_bl = d.showPlaylistName_bl, this.isShowNothingFound_bl = !1, this.hasInputFocus_bl = !1, this.showController_bl = d.showSearchInput_bl || d.showNextAndPrevButtons_bl || d.showLoopButton_bl || d.showShuffleButton_bl, this.loop_bl = d.loop_bl, this.shuffle_bl = d.shuffle_bl, this.showSearchInput_bl = d.showSearchInput_bl, this.allowToScrollAndScrollBarIsActive_bl = !0, this.showPlaylistToolTips_bl = d.showPlaylistToolTips_bl, this.hasPlaylist_bl = !1, this.showPlaylistByDefault_bl = d.showPlaylistByDefault_bl, this.repeatBackground_bl = d.repeatBackground_bl, this.addMouseWheelSupport_bl = d.addMouseWheelSupport_bl, this.showNextAndPrevButtons_bl = d.showNextAndPrevButtons_bl, this.showShuffleButton_bl = d.showShuffleButton_bl, this.showLoopButton_bl = d.showLoopButton_bl, this.showButtonsToolTip_bl = d.showButtonsToolTip_bl, this.isShowed_bl = !0, this.allowToSwipe_bl = !1, this.disableThumbs_bl = !1, this.disableMouseWheel_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.isDragging_bl = !1, this.isSearched_bl = !1, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.init = function() {
                if (e.mainHolder_do = new FWDUVPDisplayObject("div"), e.mainHolder_do.setBkColor(e.playlistBackgroundColor_str), e.mainThumbsHolder_do = new FWDUVPDisplayObject("div"), e.thumbsHolder_do = new FWDUVPDisplayObject("div"), e.thumbsHolder_do.setOverflow("visible"), e.mainThumbsHolder_do.addChild(e.thumbsHolder_do), e.mainHolder_do.addChild(e.mainThumbsHolder_do), e.addChild(e.mainHolder_do), e.showController_bl) {
                    if (e.controllBar_do = new FWDUVPDisplayObject("div"), e.repeatBackground_bl) e.controllerBk_do = new FWDUVPDisplayObject("div"), e.controllerBk_do.getStyle().background = "url('" + e.bkPath_str + "')";
                    else {
                        e.controllerBk_do = new FWDUVPDisplayObject("img");
                        var a = new Image;
                        a.src = e.bkPath_str, e.controllerBk_do.setScreen(a)
                    }
                    e.controllerBk_do.setHeight(e.controlBarHeight), e.controllerBk_do.getStyle().width = "100%", e.controllBar_do.addChild(e.controllerBk_do), e.controllBar_do.setHeight(e.controlBarHeight), e.mainHolder_do.addChild(e.controllBar_do)
                }
                e.showShuffleButton_bl && e.setupShuffleButton(), e.showLoopButton_bl && e.setupLoopButton(), e.showNextAndPrevButtons_bl && (e.setupPrevButton(), e.setupNextButton()), e.showButtonsToolTip_bl && e.setupToolTips(), e.totalButtons = e.buttons_ar.length, e.showSearchInput_bl && e.showController_bl && e.setupInput(), e.showController_bl && (e.removeFromThumbsHolderHeight = e.controllBar_do.h + e.spaceBetweenThumbnails), e.isMobile_bl ? e.setupMobileScrollbar() : (e.setupScrollbar(), e.addMouseWheelSupport_bl && e.addMouseWheelSupport()), e.showPlaylistName_bl && (e.setupPlaylistName(), e.removeFromThumbsHolderHeight += e.controlBarHeight + e.spaceBetweenThumbnails, e.mainThumbsHolder_do.setY(e.controlBarHeight + e.spaceBetweenThumbnails), e.scrMainHolder_do && e.scrMainHolder_do.setY(e.mainThumbsHolder_do.y)), e.showPlaylistByDefault_bl ? e.hideAndShow() : e.hide()
            }, this.resizeAndPosition = function(a) {
                c.stageWidth && ("bottom" == e.position_str ? (e.stageWidth = c.stageWidth, e.stageHeight = c.playlistHeight, e.finalX = 0, e.finalY = c.tempVidStageHeight + c.spaceBetweenControllerAndPlaylist) : (e.stageWidth = e.totalWidth, e.stageHeight = c.stageHeight, e.finalX = c.stageWidth - e.totalWidth, e.finalY = 0), e.bk_do && (e.bk_do.setWidth(e.stageWidth), e.bk_do.setHeight(e.stageHeight)), e.positionThumbs(a), e.allowToScrollAndScrollBarIsActive_bl && e.scrMainHolder_do ? e.mainThumbsHolder_do.setWidth(e.stageWidth - e.scrollbarOffestWidth) : e.mainThumbsHolder_do.setWidth(e.stageWidth), e.mainThumbsHolder_do.setHeight(e.stageHeight - e.removeFromThumbsHolderHeight), e.scrHandler_do && e.updateScrollBarSizeActiveAndDeactivate(), e.controllBar_do && e.positionControllBar(), e.updateScrollBarHandlerAndContent(a), e.setX(e.finalX), e.setY(e.finalY), e.mainHolder_do.setWidth(e.stageWidth), e.mainHolder_do.setHeight(e.stageHeight))
            }, this.updatePlaylist = function(a, b, c, d) {
                e.catId != b && (e.hasPlaylist_bl = !0, e.catId = b, e.curId = c, e.playlist_ar = a, e.countLoadedThumbs = 0, e.allowToScrollAndScrollBarIsActive_bl = !1, e.input_do && (e.hasInputFocus_bl = !1, e.input_do.screen.value = "search for video"), e.setupThumbnails(), e.updatePlaylistName(d), e.loadImages(), FWDAnimation.to(e.mainHolder_do, .8, {
                    x: 0,
                    y: 0,
                    ease: Expo.easeInOut
                }), e.resizeAndPosition(), e.scrHandler_do && (e.updateScrollBarSizeActiveAndDeactivate(), e.updateScrollBarHandlerAndContent(!1, !0)))
            }, this.destroyPlaylist = function() {
                if (e.thumbs_ar) {
                    var a;
                    e.hasPlaylist_bl = !1, e.image_img.onerror = null, e.image_img.onload = null, FWDAnimation.killTweensOf(e.mainHolder_do), "bottom" == e.position_str ? e.mainHolder_do.setY(-e.stageHeight - 5) : e.mainHolder_do.setX(-e.stageWidth - 5), clearTimeout(e.loadWithDelayId_to);
                    for (var b = 0; b < e.totalThumbs; b++) a = e.thumbs_ar[b], e.thumbsHolder_do.removeChild(a), a.destroy();
                    e.thumbs_ar = null
                }
            }, this.setupPlaylistName = function() {
                if (e.playlistNameHolder_do = new FWDUVPDisplayObject("div"), e.playlistNameHolder_do.setHeight(e.controlBarHeight), e.playlistNameHolder_do.getStyle().width = "100%", e.repeatBackground_bl) e.playlistNameBk_do = new FWDUVPDisplayObject("div"), e.playlistNameBk_do.getStyle().background = "url('" + e.bkPath_str + "')";
                else {
                    e.playlistNameBk_do = new FWDUVPDisplayObject("img");
                    var a = new Image;
                    a.src = e.bkPath_str, e.playlistNameBk_do.setScreen(a)
                }
                e.playlistNameBk_do.setHeight(e.controlBarHeight), e.playlistNameBk_do.getStyle().width = "100%", e.playlistName_do = new FWDUVPDisplayObject("div"), e.playlistName_do.getStyle().width = "100%", e.playlistName_do.getStyle().textAlign = "center", e.playlistName_do.getStyle().fontSmoothing = "antialiased", e.playlistName_do.getStyle().webkitFontSmoothing = "antialiased", e.playlistName_do.getStyle().textRendering = "optimizeLegibility", e.playlistName_do.getStyle().fontFamily = "Arial", e.playlistName_do.getStyle().fontSize = "14px", e.playlistName_do.getStyle().color = d.playlistNameColor_str, e.playlistNameHolder_do.addChild(e.playlistNameBk_do), e.playlistNameHolder_do.addChild(e.playlistName_do), e.mainHolder_do.addChild(e.playlistNameHolder_do)
            }, this.updatePlaylistName = function(a) {
                e.playlistName_do && (e.playlistName_do.setInnerHTML(a), setTimeout(function() {
                    e.playlistName_do.setY(parseInt((e.playlistNameHolder_do.h - e.playlistName_do.getHeight()) / 2) + 1)
                }, 50))
            }, this.setupInput = function() {
                e.input_do = new FWDUVPDisplayObject("input"), e.input_do.screen.maxLength = 20, e.input_do.getStyle().textAlign = "left", e.input_do.getStyle().outline = "none", e.input_do.getStyle().boxShadow = "none", e.input_do.getStyle().fontSmoothing = "antialiased", e.input_do.getStyle().webkitFontSmoothing = "antialiased", e.input_do.getStyle().textRendering = "optimizeLegibility", e.input_do.getStyle().fontFamily = "Arial", e.input_do.getStyle().fontSize = "12px", e.input_do.getStyle().padding = "6px", FWDUVPUtils.isIEAndLessThen9 || (e.input_do.getStyle().paddingRight = "-6px"), e.input_do.getStyle().paddingTop = "2px", e.input_do.getStyle().paddingBottom = "3px", e.input_do.getStyle().backgroundColor = e.inputBackgroundColor_str, e.input_do.getStyle().color = e.inputColor_str, e.input_do.screen.value = "search for video", e.noSearchFound_do = new FWDUVPDisplayObject("div"), e.noSearchFound_do.setX(0), e.noSearchFound_do.getStyle().textAlign = "center", e.noSearchFound_do.getStyle().width = "100%", e.noSearchFound_do.getStyle().fontSmoothing = "antialiased", e.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased", e.noSearchFound_do.getStyle().textRendering = "optimizeLegibility", e.noSearchFound_do.getStyle().fontFamily = "Arial", e.noSearchFound_do.getStyle().fontSize = "12px", e.noSearchFound_do.getStyle().color = e.inputColor_str, e.noSearchFound_do.setInnerHTML("NOTHING FOUND!"), e.noSearchFound_do.setVisible(!1), e.mainHolder_do.addChild(e.noSearchFound_do), e.input_do.screen.addEventListener ? (e.input_do.screen.addEventListener("mousedown", e.inputFocusInHandler), e.input_do.screen.addEventListener("keyup", e.keyUpHandler)) : e.input_do.screen.attachEvent && (e.input_do.screen.attachEvent("onmousedown", e.inputFocusInHandler), e.input_do.screen.attachEvent("onkeyup", e.keyUpHandler));
                var a = new Image;
                a.src = d.inputArrowPath_str, e.inputArrow_do = new FWDUVPDisplayObject("img"), e.inputArrow_do.setScreen(a), e.inputArrow_do.setWidth(9), e.inputArrow_do.setHeight(10), e.controllBar_do.addChild(e.inputArrow_do), e.controllBar_do.addChild(e.input_do)
            }, this.inputFocusInHandler = function() {
                e.hasInputFocus_bl || (e.hasInputFocus_bl = !0, "search for video" == e.input_do.screen.value && (e.input_do.screen.value = ""), setTimeout(function() {
                    a.addEventListener ? a.addEventListener("mousedown", e.inputFocusOutHandler) : document.attachEvent && document.attachEvent("onmousedown", e.inputFocusOutHandler)
                }, 50))
            }, this.inputFocusOutHandler = function(b) {
                if (e.hasInputFocus_bl) {
                    var c = FWDUVPUtils.getViewportMouseCoordinates(b);
                    return FWDUVPUtils.hitTest(e.input_do.screen, c.screenX, c.screenY) ? void 0 : (e.hasInputFocus_bl = !1, void("" == e.input_do.screen.value && (e.input_do.screen.value = "search for video", a.removeEventListener ? a.removeEventListener("mousedown", e.inputFocusOutHandler) : document.detachEvent && document.detachEvent("onmousedown", e.inputFocusOutHandler))))
                }
            }, this.keyUpHandler = function(a) {
                a.stopPropagation && a.stopPropagation(), e.prevInputValue_str != e.input_do.screen.value && (e.isMobile_bl ? (e.positionThumbs(!1), e.thumbnailsFinalY = Math.round(e.curId / (e.totalThumbs - 1) * (e.totalThumbsHeight - e.mainThumbsHolder_do.h)) * -1) : e.positionThumbs(!0)), e.prevInputValue_str = e.input_do.screen.value, e.scrHandler_do && (e.updateScrollBarSizeActiveAndDeactivate(), e.updateScrollBarHandlerAndContent(!0, !0))
            }, this.showNothingFound = function() {
                e.isShowNothingFound_bl || (e.isShowNothingFound_bl = !0, e.noSearchFound_do.setVisible(!0), e.noSearchFound_do.setY(parseInt((e.stageHeight - e.noSearchFound_do.getHeight()) / 2)), e.noSearchFound_do.setAlpha(0), FWDAnimation.to(e.noSearchFound_do, .1, {
                    alpha: 1,
                    yoyo: !0,
                    repeat: 4
                }))
            }, this.hideNothingFound = function() {
                e.isShowNothingFound_bl && (e.isShowNothingFound_bl = !1, FWDAnimation.killTweensOf(e.noSearchFound_do), e.noSearchFound_do.setVisible(!1))
            }, this.positionControllBar = function() {
                var a, b, c;
                if (e.input_do && e.stageWidth <= 340) {
                    a = e.stageWidth - 2 * e.startSpaceBetweenButtons - e.inputArrow_do.w - e.spaceBetweenButtons, e.nextButton_do && (a -= e.nextButton_do.w + e.spaceBetweenButtons), e.prevButton_do && (a -= e.prevButton_do.w + e.spaceBetweenButtons), e.shuffleButton_do && (a -= e.shuffleButton_do.w + e.spaceBetweenButtons), e.loopButton_do && (a -= e.loopButton_do.w + e.spaceBetweenButtons);
                    for (var d = 0; d < e.totalButtons; d++) b = e.buttons_ar[e.totalButtons - 1 - d], c = e.buttons_ar[e.totalButtons - d], 0 == d ? b.setX(e.stageWidth - b.w - e.startSpaceBetweenButtons) : b.setX(c.x - c.w - e.spaceBetweenButtons), b.setY(parseInt((e.controllBar_do.h - b.h) / 2))
                } else if (e.input_do && e.stageWidth > 340) {
                    a = e.stageWidth - 2 * e.startSpaceBetweenButtons - e.inputArrow_do.w - 12, a > 350 && (a = 350), e.nextButton_do && (a -= e.nextButton_do.w + e.spaceBetweenButtons), e.prevButton_do && (a -= e.prevButton_do.w + e.spaceBetweenButtons), e.shuffleButton_do && (a -= e.shuffleButton_do.w + e.spaceBetweenButtons), e.loopButton_do && (a -= e.loopButton_do.w + e.spaceBetweenButtons);
                    for (var d = 0; d < e.totalButtons; d++) b = e.buttons_ar[e.totalButtons - 1 - d], c = e.buttons_ar[e.totalButtons - d], 0 == d ? b.setX(e.stageWidth - b.w - e.startSpaceBetweenButtons) : b.setX(c.x - c.w - e.spaceBetweenButtons), b.setY(parseInt((e.controllBar_do.h - b.h) / 2))
                } else e.shuffleButton_do ? (e.shuffleButton_do.setX(e.spaceBetweenButtons), e.shuffleButton_do.setY(parseInt((e.controllBar_do.h - e.shuffleButton_do.h) / 2)), e.loopButton_do && (e.loopButton_do.setX(e.shuffleButton_do.x + e.shuffleButton_do.w + e.spaceBetweenButtons), e.loopButton_do.setY(parseInt((e.controllBar_do.h - e.shuffleButton_do.h) / 2)))) : e.loopButton_do && (e.loopButton_do.setX(e.spaceBetweenButtons), e.loopButton_do.setY(parseInt((e.controllBar_do.h - e.loopButton_do.h) / 2))), e.nextButton_do && (e.nextButton_do.setX(e.stageWidth - e.nextButton_do.w - e.startSpaceBetweenButtons), e.nextButton_do.setY(parseInt((e.controllBar_do.h - e.nextButton_do.h) / 2)), e.prevButton_do.setX(e.nextButton_do.x - e.nextButton_do.w - e.spaceBetweenButtons), e.prevButton_do.setY(parseInt((e.controllBar_do.h - e.prevButton_do.h) / 2)));
                e.input_do && (e.input_do.setWidth(a), e.input_do.setX(e.startSpaceBetweenButtons), e.input_do.setY(parseInt((e.controllBar_do.h - e.input_do.getHeight()) / 2) + 1), e.inputArrow_do.setX(parseInt(e.input_do.x + e.input_do.getWidth()) + 1), e.inputArrow_do.setY(parseInt((e.controllBar_do.h - e.inputArrow_do.h) / 2) + 1)), e.controllBar_do.setWidth(e.stageWidth), e.controllBar_do.setY(e.stageHeight - e.controllBar_do.h)
            }, this.setupPrevButton = function() {
                FWDUVPSimpleButton.setPrototype(), e.prevButton_do = new FWDUVPSimpleButton(e.prevN_img, d.prevSPath_str), e.prevButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, e.prevButtonShowTooltipHandler), e.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.prevButtonOnMouseUpHandler), e.buttons_ar.push(e.prevButton_do), e.controllBar_do.addChild(e.prevButton_do)
            }, this.prevButtonShowTooltipHandler = function(a) {
                e.showToolTip(e.prevButton_do, e.prevButtonToolTip_do, a.e)
            }, this.prevButtonOnMouseUpHandler = function() {
                e.dispatchEvent(b.PLAY_PREV_VIDEO)
            }, this.setupNextButton = function() {
                FWDUVPSimpleButton.setPrototype(), e.nextButton_do = new FWDUVPSimpleButton(e.nextN_img, d.nextSPath_str), e.nextButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, e.nextButtonShowTooltipHandler), e.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.nextButtonOnMouseUpHandler), e.buttons_ar.push(e.nextButton_do), e.controllBar_do.addChild(e.nextButton_do)
            }, this.nextButtonShowTooltipHandler = function(a) {
                e.showToolTip(e.nextButton_do, e.nextButtonToolTip_do, a.e)
            }, this.nextButtonOnMouseUpHandler = function() {
                e.dispatchEvent(b.PLAY_NEXT_VIDEO)
            }, this.setupShuffleButton = function() {
                FWDUVPSimpleButton.setPrototype(), e.shuffleButton_do = new FWDUVPSimpleButton(e.shuffleN_img, d.shufflePathS_str, void 0, !0), e.shuffleButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, e.shuffleButtonShowToolTipHandler), e.shuffleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.shuffleButtonOnMouseUpHandler), e.buttons_ar.push(e.shuffleButton_do), e.controllBar_do.addChild(e.shuffleButton_do), !e.loop_bl && e.shuffle_bl && e.setShuffleButtonState("selected")
            }, this.shuffleButtonShowToolTipHandler = function(a) {
                e.showToolTip(e.shuffleButton_do, e.shuffleButtonToolTip_do, a.e)
            }, this.shuffleButtonOnMouseUpHandler = function() {
                e.shuffleButton_do.isSelectedFinal_bl ? e.dispatchEvent(b.DISABLE_SHUFFLE) : e.dispatchEvent(b.ENABLE_SHUFFLE)
            }, this.setShuffleButtonState = function(a) {
                e.shuffleButton_do && ("selected" == a ? e.shuffleButton_do.setSelected() : "unselected" == a && e.shuffleButton_do.setUnselected())
            }, this.setupLoopButton = function() {
                FWDUVPSimpleButton.setPrototype(), e.loopButton_do = new FWDUVPSimpleButton(e.replayN_img, d.replaySPath_str, void 0, !0), e.loopButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, e.loopButtonShowTooltipHandler), e.loopButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.loopButtonOnMouseUpHandler), e.buttons_ar.push(e.loopButton_do), e.controllBar_do.addChild(e.loopButton_do), e.loop_bl && e.setLoopStateButton("selected")
            }, this.loopButtonShowTooltipHandler = function(a) {
                e.showToolTip(e.loopButton_do, e.loopButtonToolTip_do, a.e)
            }, this.loopButtonOnMouseUpHandler = function() {
                e.loopButton_do.isSelectedFinal_bl ? e.dispatchEvent(b.DISABLE_LOOP) : e.dispatchEvent(b.ENABLE_LOOP)
            }, this.setLoopStateButton = function(a) {
                e.loopButton_do && ("selected" == a ? e.loopButton_do.setSelected() : "unselected" == a && e.loopButton_do.setUnselected())
            }, this.setupToolTips = function() {
                e.showNextAndPrevButtons_bl && (FWDUVPToolTip.setPrototype(), e.prevButtonToolTip_do = new FWDUVPToolTip(e.prevButton_do, d.toopTipBk_str, d.toopTipPointer_str, "previous video", e.buttonsToolTipFontColor_str, e.buttonsToolTipHideDelay), document.documentElement.appendChild(e.prevButtonToolTip_do.screen), FWDUVPToolTip.setPrototype(), e.nextButtonToolTip_do = new FWDUVPToolTip(e.nextButton_do, d.toopTipBk_str, d.toopTipPointer_str, "next video", e.buttonsToolTipFontColor_str, e.buttonsToolTipHideDelay), document.documentElement.appendChild(e.nextButtonToolTip_do.screen)), e.showShuffleButton_bl && (FWDUVPToolTip.setPrototype(), e.shuffleButtonToolTip_do = new FWDUVPToolTip(e.shuffleButton_do, d.toopTipBk_str, d.toopTipPointer_str, "shuffle", e.buttonsToolTipFontColor_str, e.buttonsToolTipHideDelay), document.documentElement.appendChild(e.shuffleButtonToolTip_do.screen)), e.showLoopButton_bl && (FWDUVPToolTip.setPrototype(), e.loopButtonToolTip_do = new FWDUVPToolTip(e.loopButton_do, d.toopTipBk_str, d.toopTipPointer_str, "loop", e.buttonsToolTipFontColor_str, e.buttonsToolTipHideDelay), document.documentElement.appendChild(e.loopButtonToolTip_do.screen))
            }, this.showToolTip = function(a, b, c) {
                if (e.showButtonsToolTip_bl) {
                    var g, h, d = FWDUVPUtils.getViewportSize();
                    FWDUVPUtils.getViewportMouseCoordinates(c);
                    a.screen.offsetWidth < 3 ? (g = parseInt(100 * a.getGlobalX() + a.w / 2 - b.w / 2), h = parseInt(100 * a.getGlobalY() - b.h - 8)) : (g = parseInt(a.getGlobalX() + a.w / 2 - b.w / 2), h = parseInt(a.getGlobalY() - b.h - 8));
                    var i = 0;
                    g < 0 ? (i = g, g = 0) : g + b.w > d.w && (i = (d.w - (g + b.w)) * -1, g += i * -1), b.positionPointer(i, !1), b.setX(g), b.setY(h), b.show()
                }
            }, this.setupThumbnails = function() {
                e.totalThumbs = e.playlist_ar.length, e.thumbs_ar = [];
                for (var a, b = 0; b < e.totalThumbs; b++) FWDUVPPlaylistThumb.setPrototype(), a = new FWDUVPPlaylistThumb(e, b, d.playlistThumbnailsBkPath_str, d.thumbnailNormalBackgroundColor_str, d.thumbnailHoverBackgroundColor_str, d.thumbnailDisabledBackgroundColor_str, e.thumbImageW, e.thumbImageH, e.thumbInPadding, e.playlist_ar[b].title, e.playlist_ar[b].titleText), e.thumbs_ar[b] = a, a.addListener(FWDUVPPlaylistThumb.MOUSE_UP, e.thumbMouseUpHandler), e.thumbsHolder_do.addChild(a)
            }, this.thumbMouseUpHandler = function(a) {
                e.disableThumbs_bl || (e.disableForAWhileAfterThumbClick_bl = !0, clearTimeout(e.disableForAWhileAfterThumbClickId_to), e.disableForAWhileAfterThumbClickId_to = setTimeout(function() {
                    e.disableForAWhileAfterThumbClick_bl = !1
                }, 50), e.dispatchEvent(b.THUMB_MOUSE_UP, {
                    id: a.id
                }))
            }, this.loadImages = function() {
                e.playlist_ar[e.countLoadedThumbs] && (e.image_img && (e.image_img.onload = null, e.image_img.onerror = null), e.image_img = new Image, e.image_img.onerror = e.onImageLoadError, e.image_img.onload = e.onImageLoadComplete, e.image_img.src = e.playlist_ar[e.countLoadedThumbs].thumbSource)
            }, this.onImageLoadError = function(a) {}, this.onImageLoadComplete = function(a) {
                var b = e.thumbs_ar[e.countLoadedThumbs];
                b.setImage(e.image_img), e.countLoadedThumbs++, e.loadWithDelayId_to = setTimeout(e.loadImages, 40)
            }, this.checkThumbsState = function() {
                if (e.thumbs_ar)
                    for (var a, b = 0; b < e.totalThumbs; b++) a = e.thumbs_ar[b], b == e.curId ? a.disable() : a.enable()
            }, this.positionThumbs = function(a) {
                if (e.thumbs_ar) {
                    var b, g, h = (e.stageWidth, [].concat(e.thumbs_ar));
                    if (e.isSearched_bl = !1, e.input_do && (g = e.input_do.screen.value.toLowerCase(), "search for video" != g))
                        for (var i = 0; i < h.length; i++) b = h[i], b.htmlText_str.indexOf(g) == -1 && (FWDAnimation.killTweensOf(b), b.setX(-b.w - 20), h.splice(i, 1), i--);
                    var j = h.length;
                    e.totalThumbs != j && (e.isSearched_bl = !0);
                    for (var i = 0; i < j; i++) b = h[i], b.finalW = e.stageWidth, b.finalX = 0, b.finalY = i * (b.finalH + e.spaceBetweenThumbnails), b.resizeAndPosition(a);
                    0 == j ? e.showNothingFound() : e.hideNothingFound(), e.totalThumbsHeight = Math.max(0, j * (b.h + e.spaceBetweenThumbnails) - e.spaceBetweenThumbnails), e.totalThumbsHeight > e.stageHeight - e.removeFromThumbsHolderHeight ? e.allowToScrollAndScrollBarIsActive_bl = !0 : e.allowToScrollAndScrollBarIsActive_bl = !1
                }
            }, this.setupMobileScrollbar = function() {
                e.hasPointerEvent_bl ? e.mainThumbsHolder_do.screen.addEventListener("pointerdown", e.scrollBarTouchStartHandler) : e.mainThumbsHolder_do.screen.addEventListener("touchstart", e.scrollBarTouchStartHandler), e.updateMobileScrollBarId_int = setInterval(e.updateMobileScrollBar, 16)
            }, this.scrollBarTouchStartHandler = function(b) {
                FWDAnimation.killTweensOf(e.thumbsHolder_do);
                var c = FWDUVPUtils.getViewportMouseCoordinates(b);
                e.isDragging_bl = !0, e.lastPresedY = c.screenY, e.hasPointerEvent_bl ? (a.addEventListener("pointerup", e.scrollBarTouchEndHandler), a.addEventListener("pointermove", e.scrollBarTouchMoveHandler)) : (a.addEventListener("touchend", e.scrollBarTouchEndHandler), a.addEventListener("touchmove", e.scrollBarTouchMoveHandler)), clearInterval(e.updateMoveMobileScrollbarId_int), e.updateMoveMobileScrollbarId_int = setInterval(e.updateMoveMobileScrollbar, 20)
            }, this.scrollBarTouchMoveHandler = function(a) {
                if (a.preventDefault && a.preventDefault(), !(e.totalThumbsHeight < e.mainThumbsHolder_do.h)) {
                    c.showDisable();
                    var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                        d = b.screenY - e.lastPresedY;
                    e.thumbnailsFinalY += d, e.thumbnailsFinalY = Math.round(e.thumbnailsFinalY), e.lastPresedY = b.screenY, e.vy = 2 * d
                }
            }, this.scrollBarTouchEndHandler = function(b) {
                e.isDragging_bl = !1, clearInterval(e.updateMoveMobileScrollbarId_int), clearTimeout(e.disableOnMoveId_to), e.disableOnMoveId_to = setTimeout(function() {
                    c.hideDisable()
                }, 100), e.hasPointerEvent_bl ? (a.removeEventListener("pointerup", e.scrollBarTouchEndHandler), a.removeEventListener("pointermove", e.scrollBarTouchMoveHandler)) : (a.removeEventListener("touchend", e.scrollBarTouchEndHandler), a.removeEventListener("touchmove", e.scrollBarTouchMoveHandler))
            }, this.updateMoveMobileScrollbar = function() {
                e.thumbsHolder_do.setY(e.thumbnailsFinalY)
            }, this.updateMobileScrollBar = function(a) {
                e.isDragging_bl || (e.totalThumbsHeight < e.mainThumbsHolder_do.h && (e.thumbnailsFinalY = .01), e.vy *= e.friction, e.thumbnailsFinalY += e.vy, e.thumbnailsFinalY > 0 ? (e.vy2 = .3 * (0 - e.thumbnailsFinalY), e.vy *= e.friction, e.thumbnailsFinalY += e.vy2) : e.thumbnailsFinalY < e.mainThumbsHolder_do.h - e.totalThumbsHeight && (e.vy2 = .3 * (e.mainThumbsHolder_do.h - e.totalThumbsHeight - e.thumbnailsFinalY), e.vy *= e.friction, e.thumbnailsFinalY += e.vy2), e.thumbsHolder_do.setY(Math.round(e.thumbnailsFinalY)))
            }, this.setupScrollbar = function() {
                e.scrMainHolder_do = new FWDUVPDisplayObject("div"), e.scrMainHolder_do.setWidth(e.scrWidth), e.scrTrack_do = new FWDUVPDisplayObject("div"), e.scrTrack_do.setWidth(e.scrWidth), e.scrTrackTop_do = new FWDUVPDisplayObject("img"), e.scrTrackTop_do.setScreen(e.scrBkTop_img), e.scrTrackMiddle_do = new FWDUVPDisplayObject("div"), e.scrTrackMiddle_do.getStyle().background = "url('" + d.scrBkMiddlePath_str + "')", e.scrTrackMiddle_do.setWidth(e.scrWidth), e.scrTrackMiddle_do.setY(e.scrTrackTop_do.h);
                var a = new Image;
                a.src = d.scrBkBottomPath_str, e.scrTrackBottom_do = new FWDUVPDisplayObject("img"), e.scrTrackBottom_do.setScreen(a), e.scrTrackBottom_do.setWidth(e.scrTrackTop_do.w), e.scrTrackBottom_do.setHeight(e.scrTrackTop_do.h), e.scrHandler_do = new FWDUVPDisplayObject("div"), e.scrHandler_do.setWidth(e.scrWidth), e.scrHandlerTop_do = new FWDUVPDisplayObject("img"), e.scrHandlerTop_do.setScreen(e.scrDragTop_img), e.scrHandlerMiddle_do = new FWDUVPDisplayObject("div"), e.scrHandlerMiddle_do.getStyle().background = "url('" + d.scrDragMiddlePath_str + "')", e.scrHandlerMiddle_do.setWidth(e.scrWidth), e.scrHandlerMiddle_do.setY(e.scrHandlerTop_do.h);
                var b = new Image;
                b.src = d.scrDragBottomPath_str, e.scrHandlerBottom_do = new FWDUVPDisplayObject("img"), e.scrHandlerBottom_do.setScreen(b), e.scrHandlerBottom_do.setWidth(e.scrHandlerTop_do.w), e.scrHandlerBottom_do.setHeight(e.scrHandlerTop_do.h), e.scrHandler_do.setButtonMode(!0), e.scrHandlerLinesN_do = new FWDUVPDisplayObject("img"), e.scrHandlerLinesN_do.setScreen(e.scrLinesN_img);
                var c = new Image;
                c.src = d.scrLinesSPath_str, e.scrHandlerLinesS_do = new FWDUVPDisplayObject("img"), e.scrHandlerLinesS_do.setScreen(c), e.scrHandlerLinesS_do.setWidth(e.scrHandlerLinesN_do.w), e.scrHandlerLinesS_do.setHeight(e.scrHandlerLinesN_do.h), e.scrHandlerLinesS_do.setAlpha(0), e.scrHandlerLines_do = new FWDUVPDisplayObject("div"), e.scrHandlerLines_do.hasTransform3d_bl = !1, e.scrHandlerLines_do.hasTransform2d_bl = !1, e.scrHandlerLines_do.setBackfaceVisibility(), e.scrHandlerLines_do.setWidth(e.scrHandlerLinesN_do.w), e.scrHandlerLines_do.setHeight(e.scrHandlerLinesN_do.h), e.scrHandlerLines_do.setButtonMode(!0), e.scrTrack_do.addChild(e.scrTrackTop_do), e.scrTrack_do.addChild(e.scrTrackMiddle_do), e.scrTrack_do.addChild(e.scrTrackBottom_do), e.scrHandler_do.addChild(e.scrHandlerTop_do), e.scrHandler_do.addChild(e.scrHandlerMiddle_do), e.scrHandler_do.addChild(e.scrHandlerBottom_do), e.scrHandlerLines_do.addChild(e.scrHandlerLinesN_do), e.scrHandlerLines_do.addChild(e.scrHandlerLinesS_do), e.scrMainHolder_do.addChild(e.scrTrack_do), e.scrMainHolder_do.addChild(e.scrHandler_do), e.scrMainHolder_do.addChild(e.scrHandlerLines_do), e.mainHolder_do.addChild(e.scrMainHolder_do), e.scrHandler_do.screen.addEventListener ? (e.scrHandler_do.screen.addEventListener("mouseover", e.scrollBarHandlerOnMouseOver), e.scrHandler_do.screen.addEventListener("mouseout", e.scrollBarHandlerOnMouseOut), e.scrHandler_do.screen.addEventListener("mousedown", e.scrollBarHandlerOnMouseDown), e.scrHandlerLines_do.screen.addEventListener("mouseover", e.scrollBarHandlerOnMouseOver), e.scrHandlerLines_do.screen.addEventListener("mouseout", e.scrollBarHandlerOnMouseOut), e.scrHandlerLines_do.screen.addEventListener("mousedown", e.scrollBarHandlerOnMouseDown)) : e.scrHandler_do.screen.attachEvent && (e.scrHandler_do.screen.attachEvent("onmouseover", e.scrollBarHandlerOnMouseOver), e.scrHandler_do.screen.attachEvent("onmouseout", e.scrollBarHandlerOnMouseOut), e.scrHandler_do.screen.attachEvent("onmousedown", e.scrollBarHandlerOnMouseDown), e.scrHandlerLines_do.screen.attachEvent("onmouseover", e.scrollBarHandlerOnMouseOver), e.scrHandlerLines_do.screen.attachEvent("onmouseout", e.scrollBarHandlerOnMouseOut), e.scrHandlerLines_do.screen.attachEvent("onmousedown", e.scrollBarHandlerOnMouseDown))
            }, this.scrollBarHandlerOnMouseOver = function(a) {
                e.allowToScrollAndScrollBarIsActive_bl && FWDAnimation.to(e.scrHandlerLinesS_do, .8, {
                    alpha: 1,
                    ease: Expo.easeOut
                })
            }, this.scrollBarHandlerOnMouseOut = function(a) {
                !e.isDragging_bl && e.allowToScrollAndScrollBarIsActive_bl && FWDAnimation.to(e.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                })
            }, this.scrollBarHandlerOnMouseDown = function(b) {
                if (e.allowToScrollAndScrollBarIsActive_bl) {
                    var d = FWDUVPUtils.getViewportMouseCoordinates(b);
                    e.isDragging_bl = !0, e.yPositionOnPress = e.scrHandler_do.y, e.lastPresedY = d.screenY, FWDAnimation.killTweensOf(e.scrHandler_do), c.showDisable(), a.addEventListener ? (a.addEventListener("mousemove", e.scrollBarHandlerMoveHandler), a.addEventListener("mouseup", e.scrollBarHandlerEndHandler)) : document.attachEvent && (document.attachEvent("onmousemove", e.scrollBarHandlerMoveHandler), document.attachEvent("onmouseup", e.scrollBarHandlerEndHandler))
                }
            }, this.scrollBarHandlerMoveHandler = function(a) {
                a.preventDefault && a.preventDefault();
                var b = FWDUVPUtils.getViewportMouseCoordinates(a),
                    c = e.scrollBarHandlerFinalY + parseInt((e.scrHandler_do.h - e.scrHandlerLines_do.h) / 2);
                e.scrollBarHandlerFinalY = Math.round(e.yPositionOnPress + b.screenY - e.lastPresedY), e.scrollBarHandlerFinalY >= e.scrTrack_do.h - e.scrHandler_do.h ? e.scrollBarHandlerFinalY = e.scrTrack_do.h - e.scrHandler_do.h : e.scrollBarHandlerFinalY <= 0 && (e.scrollBarHandlerFinalY = 0), e.scrHandler_do.setY(e.scrollBarHandlerFinalY), FWDAnimation.killTweensOf(e.scrHandler_do), FWDAnimation.to(e.scrHandlerLines_do, .8, {
                    y: c,
                    ease: Quart.easeOut
                }), e.updateScrollBarHandlerAndContent(!0)
            }, e.scrollBarHandlerEndHandler = function(b) {
                var d = FWDUVPUtils.getViewportMouseCoordinates(b);
                e.isDragging_bl = !1, FWDUVPUtils.hitTest(e.scrHandler_do.screen, d.screenX, d.screenY) || FWDAnimation.to(e.scrHandlerLinesS_do, .8, {
                    alpha: 0,
                    ease: Expo.easeOut
                }), c.hideDisable(), FWDAnimation.killTweensOf(e.scrHandler_do), FWDAnimation.to(e.scrHandler_do, .4, {
                    y: e.scrollBarHandlerFinalY,
                    ease: Quart.easeOut
                }), a.removeEventListener ? (a.removeEventListener("mousemove", e.scrollBarHandlerMoveHandler), a.removeEventListener("mouseup", e.scrollBarHandlerEndHandler)) : document.detachEvent && (document.detachEvent("onmousemove", e.scrollBarHandlerMoveHandler), document.detachEvent("onmouseup", e.scrollBarHandlerEndHandler))
            }, this.updateScrollBarSizeActiveAndDeactivate = function() {
                e.disableForAWhileAfterThumbClick_bl || (e.allowToScrollAndScrollBarIsActive_bl ? (e.allowToScrollAndScrollBarIsActive_bl = !0, e.scrMainHolder_do.setX(e.stageWidth - e.scrMainHolder_do.w), e.scrMainHolder_do.setHeight(e.stageHeight - e.removeFromThumbsHolderHeight), e.scrTrack_do.setHeight(e.scrMainHolder_do.h), e.scrTrackMiddle_do.setHeight(e.scrTrack_do.h - 2 * e.scrTrackTop_do.h), e.scrTrackBottom_do.setY(e.scrTrackMiddle_do.y + e.scrTrackMiddle_do.h), e.scrMainHolder_do.setAlpha(1), e.scrHandler_do.setButtonMode(!0), e.scrHandlerLines_do.setButtonMode(!0)) : (e.allowToScrollAndScrollBarIsActive_bl = !1, e.scrMainHolder_do.setX(e.stageWidth - e.scrMainHolder_do.w), e.scrMainHolder_do.setHeight(e.stageHeight - e.removeFromThumbsHolderHeight), e.scrTrack_do.setHeight(e.scrMainHolder_do.h), e.scrTrackMiddle_do.setHeight(e.scrTrack_do.h - 2 * e.scrTrackTop_do.h), e.scrTrackBottom_do.setY(e.scrTrackMiddle_do.y + e.scrTrackMiddle_do.h), e.scrMainHolder_do.setAlpha(.5), e.scrHandler_do.setY(0), e.scrHandler_do.setButtonMode(!1), e.scrHandlerLines_do.setButtonMode(!1)), e.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1, e.scrMainHolder_do.h / e.totalThumbsHeight) * e.scrMainHolder_do.h))), e.scrHandlerMiddle_do.setHeight(e.scrHandler_do.h - 2 * e.scrHandlerTop_do.h), e.scrHandlerBottom_do.setY(e.scrHandlerMiddle_do.y + e.scrHandlerMiddle_do.h), FWDAnimation.killTweensOf(e.scrHandlerLines_do), e.scrHandlerLines_do.setY(e.scrollBarHandlerFinalY + parseInt((e.scrHandler_do.h - e.scrHandlerLines_do.h) / 2)), e.scrHandlerBottom_do.setY(e.scrHandler_do.h - e.scrHandlerBottom_do.h))
            }, this.updateScrollBarHandlerAndContent = function(a, b) {
                if (!e.disableForAWhileAfterThumbClick_bl && (e.allowToScrollAndScrollBarIsActive_bl || b)) {
                    var c = 0;
                    e.isDragging_bl && !e.isMobile_bl ? (c = e.scrollBarHandlerFinalY / (e.scrMainHolder_do.h - e.scrHandler_do.h), "Infinity" == c ? c = 0 : c >= 1 && (scrollPercent = 1), e.thumbnailsFinalY = Math.round(c * (e.totalThumbsHeight - e.mainThumbsHolder_do.h)) * -1) : (e.isSearched_bl ? e.percentScrolled = 0 : c = e.curId / (e.totalThumbs - 1), e.thumbnailsFinalY = Math.min(0, Math.round(c * (e.totalThumbsHeight - e.mainThumbsHolder_do.h)) * -1), e.scrMainHolder_do && (e.scrollBarHandlerFinalY = Math.round((e.scrMainHolder_do.h - e.scrHandler_do.h) * c), e.scrollBarHandlerFinalY < 0 ? e.scrollBarHandlerFinalY = 0 : e.scrollBarHandlerFinalY > e.scrMainHolder_do.h - e.scrHandler_do.h - 1 && (e.scrollBarHandlerFinalY = e.scrMainHolder_do.h - e.scrHandler_do.h - 1), FWDAnimation.killTweensOf(e.scrHandler_do), FWDAnimation.killTweensOf(e.scrHandlerLines_do), a ? (FWDAnimation.to(e.scrHandler_do, .4, {
                        y: e.scrollBarHandlerFinalY,
                        ease: Quart.easeOut
                    }), FWDAnimation.to(e.scrHandlerLines_do, .8, {
                        y: e.scrollBarHandlerFinalY + parseInt((e.scrHandler_do.h - e.scrHandlerLinesN_do.h) / 2),
                        ease: Quart.easeOut
                    })) : (e.scrHandler_do.setY(e.scrollBarHandlerFinalY), e.scrHandlerLines_do.setY(e.scrollBarHandlerFinalY + parseInt((e.scrHandler_do.h - e.scrHandlerLinesN_do.h) / 2))))), e.lastThumbnailFinalY != e.thumbnailsFinalY && (FWDAnimation.killTweensOf(e.thumbsHolder_do), a ? FWDAnimation.to(e.thumbsHolder_do, .5, {
                        y: e.thumbnailsFinalY,
                        ease: Quart.easeOut
                    }) : e.thumbsHolder_do.setY(e.thumbnailsFinalY)), e.lastThumbnailFinalY = e.thumbnailsFinalY
                }
            }, this.addMouseWheelSupport = function() {
                e.screen.addEventListener ? (e.screen.addEventListener("DOMMouseScroll", e.mouseWheelHandler), e.screen.addEventListener("mousewheel", e.mouseWheelHandler)) : e.screen.attachEvent && e.screen.attachEvent("onmousewheel", e.mouseWheelHandler)
            }, e.mouseWheelHandler = function(a) {
                if (a.preventDefault && a.preventDefault(),
                    e.disableMouseWheel_bl || e.isDragging_bl) return !1;
                var b = a.detail || a.wheelDelta;
                a.wheelDelta && (b *= -1), b > 0 ? e.scrollBarHandlerFinalY += Math.round(160 * e.scollbarSpeedSensitivity * (e.mainThumbsHolder_do.h / e.totalThumbsHeight)) : b < 0 && (e.scrollBarHandlerFinalY -= Math.round(160 * e.scollbarSpeedSensitivity * (e.mainThumbsHolder_do.h / e.totalThumbsHeight))), e.scrollBarHandlerFinalY >= e.scrTrack_do.h - e.scrHandler_do.h ? e.scrollBarHandlerFinalY = e.scrTrack_do.h - e.scrHandler_do.h : e.scrollBarHandlerFinalY <= 0 && (e.scrollBarHandlerFinalY = 0);
                var c = e.scrollBarHandlerFinalY + parseInt((e.scrHandler_do.h - e.scrHandlerLines_do.h) / 2);
                return FWDAnimation.killTweensOf(e.scrHandler_do), FWDAnimation.killTweensOf(e.scrHandlerLines_do), FWDAnimation.to(e.scrHandlerLines_do, .8, {
                    y: c,
                    ease: Quart.easeOut
                }), FWDAnimation.to(e.scrHandler_do, .5, {
                    y: e.scrollBarHandlerFinalY,
                    ease: Quart.easeOut
                }), e.isDragging_bl = !0, e.updateScrollBarHandlerAndContent(!0), e.isDragging_bl = !1, !!a.preventDefault && void a.preventDefault()
            }, this.hideAndShow = function(a) {
                "bottom" == e.position_str ? (e.mainHolder_do.setY(-e.stageHeight), FWDAnimation.to(e.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                })) : (e.mainHolder_do.setX(-e.stageWidth), FWDAnimation.to(e.mainHolder_do, .8, {
                    x: 0,
                    ease: Expo.easeInOut
                }))
            }, this.hide = function(a) {
                e.isShowed_bl = !1, a ? "bottom" == e.position_str && FWDAnimation.to(e.mainHolder_do, .8, {
                    y: -e.stageHeight,
                    ease: Expo.easeInOut
                }) : (FWDAnimation.killTweensOf(e.mainHolder_do), "bottom" == e.position_str && e.mainHolder_do.setY(-e.stageHeight))
            }, this.show = function(a) {
                e.isShowed_bl = !0, FWDAnimation.isTweening(e.mainHolder_do) || e.hide(!1), a ? "bottom" == e.position_str ? FWDAnimation.to(e.mainHolder_do, .8, {
                    y: 0,
                    ease: Expo.easeInOut
                }) : e.mainHolder_do.setY(0) : (FWDAnimation.killTweensOf(e.mainHolder_do), e.mainHolder_do.setX(0), e.mainHolder_do.setY(0), clearTimeout(e.disableThumbsId_to), e.disableThumbsId_to = setTimeout(function() {
                    e.disableThumbs_bl = !1
                }, 200), e.disableThumbs_bl = !0)
            }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div", "absolute", "visible")
    }, b.THUMB_MOUSE_UP = "thumbMouseOut", b.PLAY_PREV_VIDEO = "playPrevVideo", b.PLAY_NEXT_VIDEO = "playNextVideo", b.DISABLE_LOOP = "disableLoop", b.ENABLE_LOOP = "enableLoop", b.DISABLE_SHUFFLE = "disableShuffle", b.ENABLE_SHUFFLE = "enableShuffle", b.prototype = null, a.FWDUVPPlaylist = b
}(window),
function(a) {
    var b = function(a, c, d, e, f, g, h, i, j, k, l) {
        var m = this;
        b.prototype;
        this.mainImageHolder_do = null, this.imageHolder_do = null, this.normalImage_do = null, this.dumy_do = null, this.text_do = null, this.backgroundImagePath_str = d, this.thumbnailNormalBackgroundColor_str = e, this.thumbnailHoverBackgroundColor_str = f, this.thumbnailDisabledBackgroundColor_str = g, this.htmlContent_str = k, this.htmlText_str = l.toLowerCase(), this.curState_str = "none", this.id = c, this.padding = j, this.imageOriginalW, this.imageOriginalH, this.finalX, this.finalY, this.thumbImageWidth = h, this.thumbImageHeight = i, this.finalW, this.finalH = 2 * m.padding + m.thumbImageHeight, this.imageFinalX, this.imageFinalY, this.imageFinalW, this.imageFinalH, this.mouseX, this.mouseY, this.showId_to, this.disableForAWhileId_to, this.hasImage_bl = !1, this.isSelected_bl = !1, this.isDisabled_bl = !1, this.disableForAWhile_bl = !1, this.hasToolTipShowed_bl = !1, this.hasCanvas_bl = FWDUVPlayer.hasCanvas, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.hasDispatchedOverEvent_bl = !1, this.init = function() {
            m.setupMainContainers(), m.setButtonMode(!0), m.setNormalState(), m.isMobile_bl ? m.hasPointerEvent_bl ? (m.dumy_do.screen.addEventListener("pointerup", m.onMouseUp), m.dumy_do.screen.addEventListener("pointerover", m.onMouseOver), m.dumy_do.screen.addEventListener("pointerout", m.onMouseOut)) : m.dumy_do.screen.addEventListener("click", m.onMouseUp) : m.dumy_do.screen.addEventListener ? (m.dumy_do.screen.addEventListener("mouseover", m.onMouseOver), m.dumy_do.screen.addEventListener("mouseout", m.onMouseOut), m.dumy_do.screen.addEventListener("click", m.onMouseUp)) : m.dumy_do.screen.attachEvent && (m.dumy_do.screen.attachEvent("onmouseover", m.onMouseOver), m.dumy_do.screen.attachEvent("onmouseout", m.onMouseOut), m.dumy_do.screen.attachEvent("onclick", m.onMouseUp))
        }, this.onMouseUp = function(a) {
            m.isDisabled_bl || 2 == a.button || (a.preventDefault && a.preventDefault(), m.dispatchEvent(b.MOUSE_UP, {
                id: m.id
            }))
        }, this.onMouseOver = function(a) {
            if (!a.pointerType || a.pointerType == a.MSPOINTER_TYPE_MOUSE) {
                if (m.isDisabled_bl) return;
                m.setSelectedState(!0)
            }
        }, this.onMouseOut = function(a) {
            if (!a.pointerType || a.pointerType == a.MSPOINTER_TYPE_MOUSE) {
                if (m.isDisabled_bl) return;
                m.setNormalState(!0)
            }
        }, this.setupMainContainers = function() {
            m.mainImageHolder_do = new FWDUVPDisplayObject("div"), m.mainImageHolder_do.getStyle().background = "url('" + m.backgroundImagePath_str + "')", m.mainImageHolder_do.setX(m.padding), m.mainImageHolder_do.setY(m.padding), m.mainImageHolder_do.setWidth(m.thumbImageWidth), m.mainImageHolder_do.setHeight(m.thumbImageHeight), m.imageHolder_do = new FWDUVPDisplayObject("div"), m.text_do = new FWDUVPDisplayObject("div"), m.text_do.hasTransform3d_bl = !1, m.text_do.hasTransform2d_bl = !1, m.text_do.setHeight(m.finalH - 6), m.text_do.setBackfaceVisibility(), m.text_do.getStyle().fontFamily = "Arial", m.text_do.getStyle().fontSize = "12px", m.text_do.getStyle().color = m.fontColor_str, m.text_do.getStyle().fontSmoothing = "antialiased", m.text_do.getStyle().webkitFontSmoothing = "antialiased", m.text_do.getStyle().textRendering = "optimizeLegibility", m.text_do.setX(2 * m.padding + m.thumbImageWidth + 4), m.text_do.setInnerHTML(m.htmlContent_str), m.addChild(m.text_do), m.dumy_do = new FWDUVPDisplayObject("div"), m.dumy_do.getStyle().width = "100%", m.dumy_do.getStyle().height = "100%", FWDUVPUtils.isIE && (m.dumy_do.setBkColor("#FF0000"), m.dumy_do.setAlpha(.01)), m.addChild(m.mainImageHolder_do), m.mainImageHolder_do.addChild(m.imageHolder_do), m.addChild(m.dumy_do)
        }, this.setImage = function(b) {
            if (m.normalImage_do = new FWDUVPDisplayObject("img"), m.normalImage_do.setScreen(b), m.imageOriginalW = m.normalImage_do.w, m.imageOriginalH = m.normalImage_do.h, m.resizeImage(), m.imageHolder_do.setX(parseInt(m.thumbImageWidth / 2)), m.imageHolder_do.setY(parseInt(m.thumbImageHeight / 2)), m.imageHolder_do.setWidth(0), m.imageHolder_do.setHeight(0), m.normalImage_do.setX(-parseInt(m.normalImage_do.w / 2)), m.normalImage_do.setY(-parseInt(m.normalImage_do.h / 2)), FWDAnimation.to(m.imageHolder_do, .8, {
                    x: 0,
                    y: 0,
                    w: m.thumbImageWidth,
                    h: m.thumbImageHeight,
                    ease: Expo.easeInOut
                }), m.normalImage_do.setAlpha(0), m.isMobile_bl) {
                var c;
                c = m.id == a.curId ? .3 : 1, FWDAnimation.to(m.normalImage_do, .8, {
                    alpha: c,
                    x: m.imageFinalX,
                    y: m.imageFinalY,
                    ease: Expo.easeInOut
                })
            } else FWDAnimation.to(m.normalImage_do, .8, {
                alpha: 1,
                x: m.imageFinalX,
                y: m.imageFinalY,
                ease: Expo.easeInOut
            });
            m.imageHolder_do.addChild(m.normalImage_do), this.hasImage_bl = !0
        }, this.resizeAndPosition = function(a) {
            m.text_do.setWidth(m.finalW - (2 * m.padding + m.thumbImageWidth) - 16), m.setWidth(m.finalW), m.setHeight(m.finalH), a ? FWDAnimation.to(m, .6, {
                x: m.finalX,
                y: m.finalY,
                ease: Expo.easeInOut
            }) : (FWDAnimation.killTweensOf(m), m.setX(m.finalX), m.setY(m.finalY)), m.resizeImage()
        }, this.resizeImage = function(a) {
            if (m.normalImage_do) {
                m.isMobile_bl ? 1 == m.normalImage_do.alpha || m.isDisabled_bl || m.normalImage_do.setAlpha(1) : 1 == m.imageHolder_do.alpha || m.isDisabled_bl || m.imageHolder_do.setAlpha(1);
                var d, b = m.thumbImageWidth / m.imageOriginalW,
                    c = m.thumbImageHeight / m.imageOriginalH;
                d = b <= c ? b : c, m.imageFinalW = Math.ceil(d * m.imageOriginalW), m.imageFinalH = Math.ceil(d * m.imageOriginalH), m.imageFinalX = Math.round((m.thumbImageWidth - m.imageFinalW) / 2), m.imageFinalY = Math.round((m.thumbImageHeight - m.imageFinalH) / 2), m.normalImage_do.setX(m.imageFinalX), m.normalImage_do.setY(m.imageFinalY), m.normalImage_do.setWidth(m.imageFinalW), m.normalImage_do.setHeight(m.imageFinalH)
            }
        }, this.setNormalState = function(a) {
            "normal" != m.curState_str && (m.curState_str = "normal", a ? FWDAnimation.to(m.screen, .8, {
                css: {
                    backgroundColor: m.thumbnailNormalBackgroundColor_str
                },
                ease: Expo.easeOut
            }) : (FWDAnimation.killTweensOf(m.screen), m.getStyle().backgroundColor = m.thumbnailNormalBackgroundColor_str))
        }, this.setSelectedState = function(a) {
            "selected" != m.curState_str && (m.curState_str = "selected", a ? FWDAnimation.to(m.screen, .8, {
                css: {
                    backgroundColor: m.thumbnailHoverBackgroundColor_str
                },
                ease: Expo.easeOut
            }) : (FWDAnimation.killTweensOf(m.screen), m.getStyle().backgroundColor = m.thumbnailNormalBackgroundColor_str))
        }, this.setDisabledState = function(a) {
            "disabled" != m.curState_str && (m.curState_str = "disabled", a ? FWDAnimation.to(m.screen, .8, {
                css: {
                    backgroundColor: m.thumbnailDisabledBackgroundColor_str
                },
                ease: Expo.easeOut
            }) : (FWDAnimation.killTweensOf(m.screen), m.getStyle().backgroundColor = m.thumbnailNormalBackgroundColor_str))
        }, this.enable = function() {
            m.isDisabled_bl && (m.isDisabled_bl = !1, m.setButtonMode(!0), m.setNormalState(!0), m.isMobile_bl ? m.normalImage_do && m.normalImage_do.setAlpha(1) : FWDAnimation.to(m.imageHolder_do, .6, {
                alpha: 1
            }))
        }, this.disable = function() {
            m.isDisabled_bl || (m.disableForAWhile_bl = !0, clearTimeout(m.disableForAWhileId_to), m.disableForAWhileId_to = setTimeout(function() {
                m.disableForAWhile_bl = !1
            }, 200), m.isDisabled_bl = !0, m.setButtonMode(!1), m.setDisabledState(!0), m.isMobile_bl ? m.normalImage_do && m.normalImage_do.setAlpha(.3) : FWDAnimation.to(m.imageHolder_do, .6, {
                alpha: .3
            }))
        }, this.destroy = function() {
            FWDAnimation.killTweensOf(m), m.normalImage_do && (FWDAnimation.killTweensOf(m.normalImage_do), m.normalImage_do.destroy()), FWDAnimation.killTweensOf(m.imageHolder_do), m.imageHolder_do.destroy(), m.dumy_do.destroy(), m.text_do.destroy(), m.backgroundImagePath_str = d, m.imageHolder_do = null, m.normalImage_do = null, m.dumy_do = null, m.text_do = null, m.htmlContent_str = null, m.htmlText_str = null, m.curState_str = null
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.SHOW_TOOL_TIP = "showToolTip", b.HIDE_TOOL_TIP = "hideToolTip", b.MOUSE_UP = "onMouseUp", b.prototype = null, a.FWDUVPPlaylistThumb = b
}(window),
function(a) {
    var b = function(a, c, d, e, f) {
        var g = this;
        b.prototype;
        this.buttonRef_do = null, this.bkPath_str = a, this.pointerPath_str = c, this.text_do = null, this.pointer_do = null, this.fontColor_str = d, this.position_str = e, this.id = -1, "bottom" == this.position_str ? (this.pointerWidth = 7, this.pointerHeight = 4) : (this.pointerWidth = 4, this.pointerHeight = 7), this.maxWidth = f, this.showWithDelayId_to, this.isMobile_bl = FWDUVPUtils.isMobile, this.isShowed_bl = !0, this.init = function() {
            g.setOverflow("visible"), g.setupMainContainers(), g.hide(), g.getStyle().background = "url('" + g.bkPath_str + "')", g.getStyle().zIndex = 9999999999999
        }, this.setupMainContainers = function() {
            g.text_do = new FWDUVPDisplayObject("div"), g.text_do.hasTransform3d_bl = !1, g.text_do.hasTransform2d_bl = !1, g.text_do.setBackfaceVisibility(), g.text_do.setDisplay("inline-block"), g.text_do.getStyle().fontFamily = "Arial", g.text_do.getStyle().fontSize = "12px", g.text_do.getStyle().color = g.fontColor_str, g.text_do.getStyle().fontSmoothing = "antialiased", g.text_do.getStyle().webkitFontSmoothing = "antialiased", g.text_do.getStyle().textRendering = "optimizeLegibility", g.text_do.getStyle().lineHeight = "16px", g.text_do.getStyle().padding = "6px", g.text_do.getStyle().paddingTop = "4px", g.text_do.getStyle().paddingBottom = "4px", g.text_do.getStyle().textAlign = "center", g.addChild(g.text_do);
            var a = new Image;
            a.src = g.pointerPath_str, g.pointer_do = new FWDUVPDisplayObject("img"), g.pointer_do.setScreen(a), g.pointer_do.setWidth(g.pointerWidth), g.pointer_do.setHeight(g.pointerHeight), g.addChild(g.pointer_do)
        }, this.setLabel = function(a, b) {
            g.id != b && (g.setVisible(!1), g.text_do.getStyle().whiteSpace = "normal", g.setWidth(g.maxWidth), g.text_do.setInnerHTML(a)), setTimeout(function() {
                if (null != g) {
                    var a = g.text_do.screen.getBoundingClientRect().width;
                    a < 8 && void 0 != a ? (g.setHeight(Math.round(100 * g.text_do.screen.getBoundingClientRect().height)), a = Math.round(100 * a)) : (g.setHeight(g.text_do.screen.offsetHeight), a = Math.round(g.text_do.screen.offsetWidth)), a < g.w - 15 && g.setWidth(a), a < g.maxWidth && (g.text_do.getStyle().whiteSpace = "nowrap"), g.positionPointer(), g.id = b
                }
            }, 60)
        }, this.positionPointer = function(a) {
            var b, c;
            a || (a = 0), "bottom" == g.position_str ? (b = parseInt((g.w - g.pointerWidth) / 2) + a, c = g.h) : (b = g.w, c = parseInt((g.h - g.pointerHeight) / 2)), g.pointer_do.setX(b), g.pointer_do.setY(c)
        }, this.show = function() {
            g.isShowed_bl || (g.isShowed_bl = !0, FWDAnimation.killTweensOf(g), clearTimeout(g.showWithDelayId_to), g.showWithDelayId_to = setTimeout(g.showFinal, 100))
        }, this.showFinal = function() {
            g.setVisible(!0), g.setAlpha(0), FWDAnimation.to(g, .4, {
                alpha: 1,
                onComplete: function() {
                    g.setVisible(!0)
                },
                ease: Quart.easeOut
            })
        }, this.hide = function() {
            g.isShowed_bl && (clearTimeout(g.showWithDelayId_to), FWDAnimation.killTweensOf(g), g.setVisible(!1), g.isShowed_bl = !1)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPDisplayObject("div", "fixed")
    }, b.CLICK = "onClick", b.MOUSE_DOWN = "onMouseDown", b.prototype = null, a.FWDUVPPlaylistToolTip = b
}(window),
function() {
    var a = function(b, c, d, e, f, g, h, i, j, k) {
        var l = this;
        a.prototype;
        this.closeButton_do, this.image_do, this.imageSource = c, this.link = f, this.target = g, this.start = d, this.end = e, this.finalW = 0, this.finalH = 0, this.id = h, this.showPopupAdsCloseButton_bl = k, this.popupAddCloseNPath_str = i, this.popupAddCloseSPath_str = j, this.isClosed_bl = !1, this.isLoaded_bl = !1, this.isShowed_bl = !1, this.init = function() {
            this.image = new Image, this.image.src = this.imageSource, this.image.onload = this.onLoadHandler, l.link && l.setButtonMode(!0), l.showPopupAdsCloseButton_bl && (FWDUVPSimpleSizeButton.setPrototype(), l.closeButton_do = new FWDUVPSimpleSizeButton(l.popupAddCloseNPath_str, l.popupAddCloseSPath_str, 21, 21), l.closeButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, l.closeClickButtonCloseHandler))
        }, this.closeClickButtonCloseHandler = function() {
            l.hide(), l.isClosed_bl = !0
        }, this.clickHandler = function() {
            l.link && (b.parent.pause(), window.open(l.link, l.target))
        }, this.onLoadHandler = function() {
            l.originalW = l.image.width, l.originalH = l.image.height, l.image_do = new FWDUVPDisplayObject("img"), l.image_do.setScreen(l.image), l.image_do.setWidth(l.originalW), l.image_do.setHeight(l.originalH), l.addChild(l.image_do), l.isLoaded_bl = !0, l.closeButton_do && l.addChild(l.closeButton_do), l.screen.addEventListener ? l.image_do.screen.addEventListener("click", l.clickHandler) : l.image_do.screen.attachEvent("onclick", l.clickHandler)
        }, this.hide = function(a) {
            if (this.isShowed_bl) {
                this.isShowed_bl = !1;
                var c = Math.min(1, b.parent.tempVidStageWidth / (l.originalW + b.parent.spaceBetweenControllerAndPlaylist)),
                    d = parseInt(c * l.originalH);
                b.parent.controller_do.isShowed_bl ? finalY = parseInt(b.parent.vidStageHeight - b.parent.controller_do.h - d + 2) : finalY = parseInt(b.parent.vidStageHeight - d + 2), b.setY(finalY), FWDAnimation.killTweensOf(b), a ? (b.removeChild(l), b.setWidth(0), b.setHeight(0)) : (l.setWidth(0), l.setHeight(0), b.setVisible(!1), l.setVisible(!1))
            }
        }, this.show = function() {
            this.isShowed_bl || this.isClosed_bl || !l.isLoaded_bl || (this.isShowed_bl = !0, setTimeout(function() {
                FWDAnimation.killTweensOf(b), b.setVisible(!0), l.setVisible(!0);
                var a = Math.min(1, b.parent.tempVidStageWidth / (l.originalW + b.parent.spaceBetweenControllerAndPlaylist)),
                    c = parseInt(a * l.originalH) - 2;
                b.parent.controller_do.isShowed_bl ? finalY = parseInt(b.parent.vidStageHeight - b.parent.controller_do.h - l.originalH * a + 2 + c) : finalY = parseInt(b.parent.vidStageHeight - l.originalH * a + 2 + c), b.setY(finalY), l.resizeAndPosition(!0)
            }, 100))
        }, this.resizeAndPosition = function(a) {
            if (l.isLoaded_bl && !l.isClosed_bl && l.isShowed_bl) {
                var c, e = (!FWDUVPUtils.isIEAndLessThen9, 1);
                e = Math.min(1, b.parent.tempVidStageWidth / (l.originalW + b.parent.spaceBetweenControllerAndPlaylist)), l.finalW = parseInt(e * l.originalW), l.finalH = parseInt(e * l.originalH), l.finalW == l.prevFinalW && l.finalH == l.prevFinalH || (l.setWidth(l.finalW), l.setHeight(l.finalH), l.image_do.setWidth(l.finalW), l.image_do.setHeight(l.finalH), c = b.parent.controller_do ? b.parent.controller_do.isShowed_bl ? parseInt(b.parent.vidStageHeight - b.parent.controller_do.h - l.originalH * e - 10) : parseInt(b.parent.vidStageHeight - l.originalH * e - 10) : parseInt(b.parent.vidStageHeight - l.originalH * e), b.setX(parseInt((b.parent.tempVidStageWidth - l.finalW) / 2)), FWDAnimation.killTweensOf(b), a ? FWDAnimation.to(b, .8, {
                    y: c,
                    ease: Expo.easeInOut
                }) : b.setY(c), l.closeButton_do && (l.closeButton_do.setY(2), l.closeButton_do.setX(parseInt(l.finalW - 21 - 2))), l.prevFinalW = l.finalW, l.prevFinallH = l.finalH, b.setWidth(l.finalW), b.setHeight(l.finalH))
            }
        }, l.init()
    };
    a.setPrototype = function() {
        a.prototype = null, a.prototype = new FWDUVPDisplayObject("div")
    }, a.MOUSE_OVER = "onMouseOver", a.MOUSE_OUT = "onMouseOut", a.CLICK = "onClick", a.prototype = null, window.FWDUVPPopupAddButton = a
}(window),
function(a) {
    var b = function(a, c, d) {
        var e = this;
        b.prototype;
        this.img_img = new Image, this.img_do = null, this.imgW = 0, this.imgH = 0, this.finalW = 0, this.finalH = 0, this.finalX = 0, this.finalY = 0, this.curPath_str, this.posterBackgroundColor_str = d, this.isTransparent_bl = !1, this.showPoster_bl = c, this.showOrLoadOnMobile_bl = !1, this.isShowed_bl = !0, this.allowToShow_bl = !0, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            e.img_img = new Image, e.img_do = new FWDUVPDisplayObject("img"), e.hide()
        }, this.positionAndResize = function() {
            if (a.vidStageWidth && (e.setWidth(a.tempVidStageWidth), e.setHeight(a.tempVidStageHeight), e.imgW)) {
                var d, b = a.tempVidStageWidth / e.imgW,
                    c = a.tempVidStageHeight / e.imgH;
                d = b <= c ? b : c, e.finalW = Math.round(d * e.imgW), e.finalH = Math.round(d * e.imgH), e.finalX = parseInt((a.tempVidStageWidth - e.finalW) / 2), e.finalY = parseInt((a.tempVidStageHeight - e.finalH) / 2), e.img_do.setX(e.finalX), e.img_do.setY(e.finalY), e.img_do.setWidth(e.finalW), e.img_do.setHeight(e.finalH)
            }
        }, this.setPoster = function(a) {
            return a && "" == FWDUVPUtils.trim(a) || "none" == a ? (e.showOrLoadOnMobile_bl = !0, e.isTransparent_bl = !0, void e.show()) : "youtubemobile" == a ? (e.isTransparent_bl = !1, e.showOrLoadOnMobile_bl = !1, e.img_img.src = null, void(e.imgW = 0)) : (a == e.curPath_str ? (e.isTransparent_bl = !1, e.showOrLoadOnMobile_bl = !0) : e.isTransparent_bl = !1, e.isTransparent_bl ? e.getStyle().backgroundColor = "transparent" : e.getStyle().backgroundColor = e.posterBackgroundColor_str, e.isTransparent_bl = !1, e.showOrLoadOnMobile_bl = !0, e.curPath_str = a, e.allowToShow_bl && (e.isShowed_bl = !1), void(a && (e.img_do && (e.img_do.src = ""), e.img_img.onload = e.posterLoadHandler, e.img_img.src = e.curPath_str)))
        }, this.posterLoadHandler = function(a) {
            e.imgW = e.img_img.width, e.imgH = e.img_img.height, e.img_do.setScreen(e.img_img), e.addChild(e.img_do), e.show(), e.positionAndResize()
        }, this.show = function(a) {
            e.allowToShow_bl && !e.isShowed_bl && e.showOrLoadOnMobile_bl && (e.isShowed_bl = !0, e.isTransparent_bl ? 0 != e.alpha && e.setAlpha(0) : 1 != e.alpha && e.setAlpha(1), e.setVisible(!0), e.isMobile_bl || e.isTransparent_bl || (FWDAnimation.killTweensOf(e), e.setAlpha(0), FWDAnimation.to(e, .6, {
                alpha: 1,
                delay: .4
            })), e.positionAndResize())
        }, this.hide = function(a) {
            (e.isShowed_bl || a) && (FWDAnimation.killTweensOf(e), e.isShowed_bl = !1, e.setVisible(!1))
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.prototype = null, a.FWDUVPPoster = b
}(window),
function(a) {
    var b = function(a, c, d, e, f) {
        var g = this;
        b.prototype;
        this.imageSource_img = a, this.image_sdo = null, this.segmentWidth = c, this.segmentHeight = d, this.totalSegments = e, this.animDelay = f || 300, this.count = 0, this.delayTimerId_int, this.isShowed_bl = !1, this.init = function() {
            g.setWidth(g.segmentWidth), g.setHeight(g.segmentHeight), g.image_sdo = new FWDUVPDisplayObject("img"), g.image_sdo.setScreen(g.imageSource_img), g.addChild(g.image_sdo), g.hide(!1)
        }, this.start = function() {
            null != g && (clearInterval(g.delayTimerId_int), g.delayTimerId_int = setInterval(g.updatePreloader, g.animDelay))
        }, this.stop = function() {
            clearInterval(g.delayTimerId_int)
        }, this.updatePreloader = function() {
            if (null != g) {
                g.count++, g.count > g.totalSegments - 1 && (g.count = 0);
                var a = g.count * g.segmentWidth;
                g.image_sdo.setX(-a)
            }
        }, this.show = function() {
            g.isShowed_bl || (g.setVisible(!0), g.start(), FWDAnimation.killTweensOf(g), FWDAnimation.to(g, 1, {
                alpha: 1,
                delay: .2
            }), g.isShowed_bl = !0)
        }, this.hide = function(a) {
            g.isShowed_bl && (FWDAnimation.killTweensOf(this), a ? FWDAnimation.to(this, 1, {
                alpha: 0,
                onComplete: g.onHideComplete
            }) : (g.setVisible(!1), g.setAlpha(0)), g.isShowed_bl = !1)
        }, this.onHideComplete = function() {
            g.setVisible(!1), g.stop(), g.dispatchEvent(b.HIDE_COMPLETE)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.HIDE_COMPLETE = "hideComplete", b.prototype = null, a.FWDUVPPreloader = b
}(window),
function(a) {
    var b = function(a, c) {
        var d = this;
        b.prototype;
        this.parent = a, this.main_do = null, this.reader = null, this.subtitiles_ar = null, this.totalAds = 0, d.popupAds_ar, d.popupAdsButtons_ar, this.hasText_bl = !1, this.isLoaded_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.showSubtitleByDefault_bl = c.showSubtitleByDefault_bl, this.setSizeOnce_bl = !1, d.init = function() {
            d.setOverflow("visible"), d.getStyle().cursor = "default", d.setBkColor("#FF0000"), d.setVisible(!1)
        }, this.resetPopups = function(a) {
            d.hideAllPopupButtons(!0), d.popupAds_ar = a, d.totalAds = d.popupAds_ar.length;
            var b;
            d.popupAdsButtons_ar = [];
            for (var e = 0; e < d.totalAds; e++) FWDUVPPopupAddButton.setPrototype(), b = new FWDUVPPopupAddButton(d, d.popupAds_ar[e].source, d.popupAds_ar[e].start, d.popupAds_ar[e].end, d.popupAds_ar[e].link, d.popupAds_ar[e].trget, e, c.popupAddCloseNPath_str, c.popupAddCloseSPath_str, c.showPopupAdsCloseButton_bl), d.popupAdsButtons_ar[e] = b, d.addChild(b)
        }, this.update = function(a) {
            if (0 != d.totalAds)
                for (var b, c = 0; c < d.totalAds; c++) b = d.popupAdsButtons_ar[c], a >= b.start && a <= b.end ? b.show() : b.hide()
        }, this.position = function(a) {
            if (0 != d.totalAds)
                for (var b, c = 0; c < d.totalAds; c++) b = d.popupAdsButtons_ar[c], b.resizeAndPosition(a)
        }, this.hideAllPopupButtons = function(a) {
            if (0 != d.totalAds) {
                for (var b, c = 0; c < d.totalAds; c++) b = d.popupAdsButtons_ar[c], b.hide(a);
                a && (d.popupAdsButtons_ar = null, d.totalAds = 0)
            }
        }, d.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.LOAD_ERROR = "error", b.LOAD_COMPLETE = "complete", b.prototype = null, a.FWDUVPPupupAds = b
}(window),
function(a) {
    var b = function(c, d) {
        var e = this;
        b.prototype;
        this.embedColoseN_img = c.embedColoseN_img, this.bk_do = null, this.mainHolder_do = null, this.closeButton_do = null, this.buttons_ar = [], this.embedWindowBackground_str = c.embedWindowBackground_str, this.embedWindowCloseButtonMargins = c.embedWindowCloseButtonMargins, this.totalWidth = 0, this.stageWidth = 0, this.stageHeight = 0, this.minMarginXSpace = 20, this.hSpace = 20, this.minHSpace = 10, this.vSpace = 15, this.isShowed_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            e.setBackfaceVisibility(), e.mainHolder_do = new FWDUVPDisplayObject("div"), e.mainHolder_do.hasTransform3d_bl = !1, e.mainHolder_do.hasTransform2d_bl = !1, e.mainHolder_do.setBackfaceVisibility(), e.bk_do = new FWDUVPDisplayObject("div"), e.bk_do.getStyle().width = "100%", e.bk_do.getStyle().height = "100%", e.bk_do.setAlpha(.9), e.bk_do.getStyle().background = "url('" + e.embedWindowBackground_str + "')", FWDUVPSimpleButton.setPrototype(), e.closeButton_do = new FWDUVPSimpleButton(c.shareClooseN_img, c.embedWindowClosePathS_str), e.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.closeButtonOnMouseUpHandler), e.addChild(e.mainHolder_do), e.mainHolder_do.addChild(e.bk_do), e.mainHolder_do.addChild(e.closeButton_do), this.setupButtons()
        }, this.closeButtonOnMouseUpHandler = function() {
            e.isShowed_bl && e.hide()
        }, this.positionAndResize = function() {
            e.stageWidth = d.stageWidth, e.stageHeight = d.stageHeight, e.closeButton_do.setX(e.stageWidth - e.closeButton_do.w - e.embedWindowCloseButtonMargins), e.closeButton_do.setY(e.embedWindowCloseButtonMargins), e.setWidth(e.stageWidth), e.setHeight(e.stageHeight), e.mainHolder_do.setWidth(e.stageWidth), e.mainHolder_do.setHeight(e.stageHeight), e.positionButtons()
        }, this.setupButtons = function() {
            FWDUVPSimpleButton.setPrototype(), e.facebookButton_do = new FWDUVPSimpleButton(c.facebookN_img, c.facebookSPath_str), e.facebookButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.facebookOnMouseUpHandler), this.buttons_ar.push(e.facebookButton_do), FWDUVPSimpleButton.setPrototype(), e.googleButton_do = new FWDUVPSimpleButton(c.googleN_img, c.googleSPath_str), e.googleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.googleOnMouseUpHandler), this.buttons_ar.push(e.googleButton_do), FWDUVPSimpleButton.setPrototype(), e.twitterButton_do = new FWDUVPSimpleButton(c.twitterN_img, c.twitterSPath_str), e.twitterButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.twitterOnMouseUpHandler), this.buttons_ar.push(e.twitterButton_do), FWDUVPSimpleButton.setPrototype(), e.likedinButton_do = new FWDUVPSimpleButton(c.likedInkN_img, c.likedInSPath_str), e.likedinButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.likedinOnMouseUpHandler), this.buttons_ar.push(e.likedinButton_do), FWDUVPSimpleButton.setPrototype(), e.bufferButton_do = new FWDUVPSimpleButton(c.bufferkN_img, c.bufferSPath_str), e.bufferButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.bufferOnMouseUpHandler), this.buttons_ar.push(e.bufferButton_do), FWDUVPSimpleButton.setPrototype(), e.diggButton_do = new FWDUVPSimpleButton(c.diggN_img, c.diggSPath_str), e.diggButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.diggOnMouseUpHandler), this.buttons_ar.push(e.diggButton_do), FWDUVPSimpleButton.setPrototype(), e.redditButton_do = new FWDUVPSimpleButton(c.redditN_img, c.redditSPath_str), e.redditButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.redditOnMouseUpHandler), this.buttons_ar.push(e.redditButton_do), FWDUVPSimpleButton.setPrototype(), e.thumbrlButton_do = new FWDUVPSimpleButton(c.thumbrlN_img, c.thumbrlSPath_str), e.thumbrlButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, e.thumbrlOnMouseUpHandler), this.buttons_ar.push(e.thumbrlButton_do), e.mainHolder_do.addChild(e.facebookButton_do), e.mainHolder_do.addChild(e.googleButton_do), e.mainHolder_do.addChild(e.twitterButton_do), e.mainHolder_do.addChild(e.likedinButton_do), e.mainHolder_do.addChild(e.bufferButton_do), e.mainHolder_do.addChild(e.diggButton_do), e.mainHolder_do.addChild(e.redditButton_do), e.mainHolder_do.addChild(e.thumbrlButton_do)
        }, this.facebookOnMouseUpHandler = function() {
            var b = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.googleOnMouseUpHandler = function() {
            var b = "https://plus.google.com/share?url=" + encodeURIComponent(location.href);
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.twitterOnMouseUpHandler = function() {
            var b = "http://twitter.com/home?status=" + encodeURIComponent(location.href);
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.likedinOnMouseUpHandler = function() {
            var b = "https://www.linkedin.com/cws/share?url=" + location.href;
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.bufferOnMouseUpHandler = function() {
            var b = "https://buffer.com/add?url=" + location.href;
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.diggOnMouseUpHandler = function() {
            var b = "http://digg.com/submit?url=" + location.href;
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.redditOnMouseUpHandler = function() {
            var b = "https://www.reddit.com/?submit=" + location.href;
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.thumbrlOnMouseUpHandler = function() {
            var b = "http://www.tumblr.com/share/link?url=" + location.href;
            a.open(b, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600")
        }, this.positionButtons = function() {
            var a, b, g, c = [],
                d = [],
                f = [],
                h = 0,
                i = 0,
                k = 0;
            c[k] = [0], d[k] = e.buttons_ar[0].totalWidth, f[k] = e.buttons_ar[0].totalWidth, e.totalButtons = e.buttons_ar.length;
            for (var l = 1; l < e.totalButtons; l++) a = e.buttons_ar[l], d[k] + a.totalWidth + e.minHSpace > e.stageWidth - e.minMarginXSpace ? (k++, c[k] = [], c[k].push(l), d[k] = a.totalWidth, f[k] = a.totalWidth) : (c[k].push(l), d[k] += a.totalWidth + e.minHSpace, f[k] += a.totalWidth);
            h = parseInt((e.stageHeight - ((k + 1) * (a.totalHeight + e.vSpace) - e.vSpace)) / 2);
            for (var l = 0; l < k + 1; l++) {
                var n, m = 0;
                if (c[l].length > 1) {
                    n = Math.min((e.stageWidth - e.minMarginXSpace - f[l]) / (c[l].length - 1), e.hSpace);
                    var o = f[l] + n * (c[l].length - 1);
                    m = parseInt((e.stageWidth - o) / 2)
                } else m = parseInt((e.stageWidth - d[l]) / 2);
                l > 0 && (h += a.h + e.vSpace);
                for (var p = 0; p < c[l].length; p++) a = e.buttons_ar[c[l][p]], 0 == p ? g = m : (b = e.buttons_ar[c[l][p] - 1], g = b.finalX + b.totalWidth + n), a.finalX = g, a.finalY = h, i < a.finalY && (i = a.finalY), e.buttonsBarTotalHeight = i + a.totalHeight + e.startY, a.setX(a.finalX), a.setY(a.finalY)
            }
        }, this.show = function(a) {
            e.isShowed_bl || (e.isShowed_bl = !0, d.main_do.addChild(e), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && d.main_do.setSelectable(!0), e.positionAndResize(), clearTimeout(e.hideCompleteId_to), clearTimeout(e.showCompleteId_to), e.mainHolder_do.setY(-e.stageHeight), e.showCompleteId_to = setTimeout(e.showCompleteHandler, 900), setTimeout(function() {
                FWDAnimation.to(e.mainHolder_do, .8, {
                    y: 0,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            }, 100))
        }, this.showCompleteHandler = function() {}, this.hide = function() {
            e.isShowed_bl && (e.isShowed_bl = !1, d.customContextMenu_do && d.customContextMenu_do.enable(), e.positionAndResize(), clearTimeout(e.hideCompleteId_to), clearTimeout(e.showCompleteId_to), (!FWDUVPUtils.isMobile || FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent) && d.main_do.setSelectable(!1), e.hideCompleteId_to = setTimeout(e.hideCompleteHandler, 800), FWDAnimation.killTweensOf(e.mainHolder_do), FWDAnimation.to(e.mainHolder_do, .8, {
                y: -e.stageHeight,
                ease: Expo.easeInOut
            }))
        }, this.hideCompleteHandler = function() {
            d.main_do.removeChild(e), e.dispatchEvent(b.HIDE_COMPLETE)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.HIDE_COMPLETE = "hideComplete", b.prototype = null, a.FWDUVPShareWindow = b
}(window),
function(a) {
    var b = function(a, c, d, e) {
        var f = this;
        b.prototype;
        this.nImg = a, this.sPath_str = c, this.dPath_str = d, this.n_sdo, this.s_sdo, this.d_sdo, this.toolTipLabel_str, this.totalWidth = this.nImg.width, this.totalHeight = this.nImg.height, this.isShowed_bl = !0, this.isSetToDisabledState_bl = !1, this.isDisabled_bl = !1, this.isDisabledForGood_bl = !1, this.isSelectedFinal_bl = !1, this.isActive_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !f.isMobile_bl || f.hasPointerEvent_bl || e, f.init = function() {
            f.setupMainContainers()
        }, f.setupMainContainers = function() {
            if (f.n_sdo = new FWDUVPTransformDisplayObject("img"), f.n_sdo.setScreen(f.nImg), f.addChild(f.n_sdo), f.allowToCreateSecondButton_bl) {
                var a = new Image;
                if (a.src = f.sPath_str, f.s_sdo = new FWDUVPDisplayObject("img"), f.s_sdo.setScreen(a), f.s_sdo.setWidth(f.totalWidth), f.s_sdo.setHeight(f.totalHeight), f.s_sdo.setAlpha(0), f.addChild(f.s_sdo), f.dPath_str) {
                    var b = new Image;
                    b.src = f.dPath_str, f.d_sdo = new FWDUVPDisplayObject("img"), f.d_sdo.setScreen(b), f.d_sdo.setWidth(f.totalWidth), f.d_sdo.setHeight(f.totalHeight), f.d_sdo.setX(-100), f.addChild(f.d_sdo)
                }
            }
            f.setWidth(f.totalWidth), f.setHeight(f.totalHeight), f.setButtonMode(!0), f.screen.style.yellowOverlayPointerEvents = "none", f.isMobile_bl ? f.hasPointerEvent_bl ? (f.screen.addEventListener("pointerover", f.onMouseOver), f.screen.addEventListener("pointerout", f.onMouseOut), f.screen.addEventListener("pointerdown", f.onMouseUp)) : f.screen.addEventListener("touchend", f.onMouseUp) : f.screen.addEventListener ? (f.screen.addEventListener("mouseover", f.onMouseOver), f.screen.addEventListener("mouseout", f.onMouseOut), f.screen.addEventListener("mouseup", f.onMouseUp)) : f.screen.attachEvent && (f.screen.attachEvent("onmouseover", f.onMouseOver), f.screen.attachEvent("onmouseout", f.onMouseOut), f.screen.attachEvent("onmouseup", f.onMouseUp))
        }, f.onMouseOver = function(a) {
            if (f.dispatchEvent(b.SHOW_TOOLTIP, {
                    e: a
                }), !(f.isDisabledForGood_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE && "mouse" != a.pointerType)) {
                if (f.isDisabled_bl || f.isSelectedFinal_bl) return;
                f.dispatchEvent(b.MOUSE_OVER, {
                    e: a
                }), f.setSelectedState()
            }
        }, f.onMouseOut = function(a) {
            if (!(f.isDisabledForGood_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE && "mouse" != a.pointerType)) {
                if (f.isDisabled_bl || f.isSelectedFinal_bl) return;
                f.dispatchEvent(b.MOUSE_OUT, {
                    e: a
                }), f.setNormalState()
            }
        }, f.onMouseUp = function(a) {
            f.isDisabledForGood_bl || (a.preventDefault && a.preventDefault(), f.isDisabled_bl || 2 == a.button || f.dispatchEvent(b.MOUSE_UP, {
                e: a
            }))
        }, f.setSelected = function() {
            f.isSelectedFinal_bl = !0, f.s_sdo && (FWDAnimation.killTweensOf(f.s_sdo), FWDAnimation.to(f.s_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            }))
        }, f.setUnselected = function() {
            f.isSelectedFinal_bl = !1, f.s_sdo && FWDAnimation.to(f.s_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            })
        }, this.setNormalState = function() {
            FWDAnimation.killTweensOf(f.s_sdo), FWDAnimation.to(f.s_sdo, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        }, this.setSelectedState = function() {
            FWDAnimation.killTweensOf(f.s_sdo), FWDAnimation.to(f.s_sdo, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        }, this.setDisabledState = function() {
            f.isSetToDisabledState_bl || (f.isSetToDisabledState_bl = !0, f.d_sdo && f.d_sdo.setX(0))
        }, this.setEnabledState = function() {
            f.isSetToDisabledState_bl && (f.isSetToDisabledState_bl = !1, f.d_sdo && f.d_sdo.setX(-100))
        }, this.disable = function() {
            f.isDisabledForGood_bl || f.isDisabled_bl || (f.isDisabled_bl = !0, f.setButtonMode(!1), FWDAnimation.to(f, .6, {
                alpha: .4
            }), f.setNormalState())
        }, this.enable = function() {
            !f.isDisabledForGood_bl && f.isDisabled_bl && (f.isDisabled_bl = !1, f.setButtonMode(!0), FWDAnimation.to(f, .6, {
                alpha: 1
            }))
        }, this.disableForGood = function() {
            f.isDisabledForGood_bl = !0, f.setButtonMode(!1)
        }, this.showDisabledState = function() {
            0 != f.d_sdo.x && f.d_sdo.setX(0)
        }, this.hideDisabledState = function() {
            f.d_sdo.x != -100 && f.d_sdo.setX(-100)
        }, this.show = function() {
            f.isShowed_bl || (f.isShowed_bl = !0, FWDAnimation.killTweensOf(f), FWDUVPUtils.isIEAndLessThen9 ? FWDUVPUtils.isIEAndLessThen9 ? f.setVisible(!0) : (f.setAlpha(0), FWDAnimation.to(f, .4, {
                alpha: 1,
                delay: .4
            }), f.setVisible(!0)) : FWDUVPUtils.isIEWebKit ? (FWDAnimation.killTweensOf(f.n_sdo), f.n_sdo.setScale2(0), FWDAnimation.to(f.n_sdo, .8, {
                scale: 1,
                delay: .4,
                onStart: function() {
                    f.setVisible(!0)
                },
                ease: Elastic.easeOut
            })) : (f.setScale2(0), FWDAnimation.to(f, .8, {
                scale: 1,
                delay: .4,
                onStart: function() {
                    f.setVisible(!0)
                },
                ease: Elastic.easeOut
            })))
        }, this.hide = function(a) {
            f.isShowed_bl && (f.isShowed_bl = !1, FWDAnimation.killTweensOf(f), FWDAnimation.killTweensOf(f.n_sdo), f.setVisible(!1))
        }, f.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPTransformDisplayObject("div")
    }, b.CLICK = "onClick", b.MOUSE_OVER = "onMouseOver", b.SHOW_TOOLTIP = "showTooltip", b.MOUSE_OUT = "onMouseOut", b.MOUSE_UP = "onMouseDown", b.prototype = null, a.FWDUVPSimpleButton = b
}(window),
function(a) {
    var b = function(a, c, d, e) {
        var f = this,
            g = b.prototype;
        this.nImg_img = null, this.sImg_img = null, this.n_do, this.s_do, this.nImgPath_str = a, this.sImgPath_str = c, this.buttonWidth = d, this.buttonHeight = e, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.isDisabled_bl = !1, this.init = function() {
            f.setupMainContainers(), f.setWidth(f.buttonWidth), f.setHeight(f.buttonHeight), f.setButtonMode(!0)
        }, this.setupMainContainers = function() {
            f.n_do = new FWDUVPDisplayObject("img"), f.nImg_img = new Image, f.nImg_img.src = f.nImgPath_str, f.nImg_img.width = f.buttonWidth, f.nImg_img.height = f.buttonHeight, f.n_do.setScreen(f.nImg_img), f.s_do = new FWDUVPDisplayObject("img"), f.sImg_img = new Image, f.sImg_img.src = f.sImgPath_str, f.sImg_img.width = f.buttonWidth, f.sImg_img.height = f.buttonHeight, f.s_do.setScreen(f.sImg_img), f.s_do.setAlpha(0), f.addChild(f.n_do), f.addChild(f.s_do), f.isMobile_bl ? f.hasPointerEvent_bl ? (f.screen.addEventListener("pointerup", f.onMouseUp), f.screen.addEventListener("pointerover", f.onMouseOver), f.screen.addEventListener("pointerdown", f.onMouseOut)) : f.screen.addEventListener("touchend", f.onMouseUp) : f.screen.addEventListener ? (f.screen.addEventListener("mouseover", f.onMouseOver), f.screen.addEventListener("mouseout", f.onMouseOut), f.screen.addEventListener("mouseup", f.onMouseUp)) : f.screen.attachEvent && (f.screen.attachEvent("onmouseover", f.onMouseOver), f.screen.attachEvent("onmouseout", f.onMouseOut), f.screen.attachEvent("onmouseup", f.onMouseUp))
        }, f.onMouseOver = function(a) {
            if (f.dispatchEvent(b.SHOW_TOOLTIP, {
                    e: a
                }), !(f.isDisabledForGood_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE && "mouse" != a.pointerType)) {
                if (f.isDisabled_bl || f.isSelectedFinal_bl) return;
                f.dispatchEvent(b.MOUSE_OVER, {
                    e: a
                }), f.setSelectedState()
            }
        }, f.onMouseOut = function(a) {
            if (!(f.isDisabledForGood_bl || a.pointerType && a.pointerType != a.MSPOINTER_TYPE_MOUSE && "mouse" != a.pointerType)) {
                if (f.isDisabled_bl || f.isSelectedFinal_bl) return;
                f.dispatchEvent(b.MOUSE_OUT, {
                    e: a
                }), f.setNormalState()
            }
        }, f.onMouseUp = function(a) {
            f.isDisabledForGood_bl || (a.preventDefault && a.preventDefault(), f.isDisabled_bl || 2 == a.button || f.dispatchEvent(b.MOUSE_UP, {
                e: a
            }))
        }, this.setNormalState = function() {
            FWDAnimation.killTweensOf(f.s_do), FWDAnimation.to(f.s_do, .5, {
                alpha: 0,
                ease: Expo.easeOut
            })
        }, this.setSelectedState = function() {
            FWDAnimation.killTweensOf(f.s_do), FWDAnimation.to(f.s_do, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            })
        }, this.destroy = function() {
            FWDAnimation.killTweensOf(f.n_do), f.n_do.destroy(), this.s_do.destroy(), f.screen.onmouseover = null, f.screen.onmouseout = null, f.screen.onclick = null, f.nImg_img = null, f.sImg_img = null, f = null, g = null, b.prototype = null
        }, f.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPDisplayObject("div")
    }, b.CLICK = "onClick", b.MOUSE_OVER = "onMouseOver", b.SHOW_TOOLTIP = "showTooltip", b.MOUSE_OUT = "onMouseOut", b.MOUSE_UP = "onMouseDown", b.prototype = null, a.FWDUVPSimpleSizeButton = b
}(window),
function(a) {
    var b = function(c, d) {
        var e = this;
        b.prototype;
        this.main_do = null, this.reader = null, this.subtitiles_ar = null, this.hasText_bl = !1, this.isLoaded_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.showSubtitleByDefault_bl = d.showSubtitleByDefault_bl, this.setSizeOnce_bl = !1, e.init = function() {
            e.setOverflow("visible"), e.getStyle().cursor = "default", e.setupTextContainer(), e.setWidth(c.maxWidth), e.hide()
        }, e.setupTextContainer = function() {
            this.text_do = new FWDUVPTransformDisplayObject("div"), e.text_do.getStyle().pointerEvents = "none", this.text_do.hasTransform3d_bl = !1, this.text_do.setBackfaceVisibility(), this.text_do.getStyle().transformOrigin = "50% 0%", this.text_do.getStyle().fontSmoothing = "antialiased", this.text_do.getStyle().webkitFontSmoothing = "antialiased", this.text_do.getStyle().textRendering = "optimizeLegibility", this.addChild(this.text_do)
        }, this.setSizeOnce = function(a) {
            !this.setSizeOnce_bl && a && (this.setSizeOnce_bl = !0, this.text_do.setWidth(a))
        }, e.loadSubtitle = function(a) {
            if (e.text_do.setX(-5e3), location.protocol.indexOf("file:") == -1) {
                e.subtitiles_ar = [], e.stopToLoadSubtitle(), e.sourceURL_str = a, e.xhr = new XMLHttpRequest, e.xhr.onreadystatechange = e.onLoad, e.xhr.onerror = e.onError;
                try {
                    e.xhr.open("get", e.sourceURL_str + "?rand=" + parseInt(99999999 * Math.random()), !0), e.xhr.send()
                } catch (a) {
                    var b = a;
                    a && a.message && (b = a.message), e.facebookAPIErrorHandler()
                }
            }
        }, this.onLoad = function(c) {
            4 == e.xhr.readyState && (404 == e.xhr.status ? e.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                text: "Subtitle file path is not found: <font color='#FF0000'>" + e.sourceURL_str + "</font>"
            }) : 408 == e.xhr.status ? e.dispatchEvent(FWDUVPData.LOAD_ERROR, {
                text: "Loadiong subtitle file file request load timeout!"
            }) : 200 == e.xhr.status && (a.JSON ? e.subtitle_txt = e.xhr.responseText : e.subtitle_txt = e.xhr.responseText, e.isShowed_bl && e.show(), e.setX(0), e.parseSubtitle(e.subtitle_txt), e.showSubtitleByDefault_bl && setTimeout(function() {
                e.show(), e.text_do.setX(0), e.setX(0)
            }, 400))), e.dispatchEvent(b.LOAD_COMPLETE)
        }, this.onError = function(c) {
            try {
                a.console && console.log(c), a.console && console.log(c.message)
            } catch (a) {}
            e.dispatchEvent(b.LOAD_ERROR, {
                text: "Error loading subtitle file : <font color='#FF0000'>" + e.sourceURL_str + "</font>."
            })
        }, this.stopToLoadSubtitle = function() {
            if (null != e.xhr) {
                try {
                    e.xhr.abort()
                } catch (a) {}
                e.xhr.onreadystatechange = null, e.xhr.onerror = null, e.xhr = null
            }
            this.isLoaded_bl = !1
        }, e.parseSubtitle = function(a) {
            function b(a) {
                return a.replace(/^\s+|\s+$/g, "")
            }

            function c(a) {
                var b = 0,
                    c = 0,
                    e = 0;
                return a = a.split(":"), b = a[0], "0" == b[0] && "0" != b[1] && (b = parseInt(b[1])), "00" == b && (b = 0), c = a[1], "0" == c[0] && "0" != c[1] && (c = parseInt(c[1])), "00" == c && (c = 0), secs = parseInt(a[2].replace(/,.*/gi, "")), "0" == secs[0] && "0" != secs[1] && (secs = parseInt(secs[1])), "00" == secs && (secs = 0), 0 != b && (e += 60 * b * 60), 0 != c && (e += 60 * c), e += secs
            }
            e.isLoaded_bl = !0, a = a.replace(/\r\n|\r|\n/g, "\n"), a = b(a);
            var d = a.split("\n\n"),
                f = 0;
            for (s in d) {
                var g = d[s].split("\n");
                if (g.length >= 2) {
                    if (n = g[0], i = b(g[1].split(" --> ")[0]), o = b(g[1].split(" --> ")[1]), t = g[2], g.length > 2)
                        for (j = 3; j < g.length; j++) t += "<br>" + g[j];
                    e.subtitiles_ar[f] = {}, e.subtitiles_ar[f].number = n, e.subtitiles_ar[f].start = i, e.subtitiles_ar[f].end = o, e.subtitiles_ar[f].startDuration = c(i), e.subtitiles_ar[f].endDuration = c(o), e.subtitiles_ar[f].text = "<p class='EVPSubtitle'>" + t + "</p>"
                }
                f++
            }
        }, this.updateSubtitle = function(a) {
            if (e.isLoaded_bl) {
                for (var b, c, d = "", f = 0; f < e.subtitiles_ar.length; f++)
                    if (b = e.subtitiles_ar[f].startDuration, c = e.subtitiles_ar[f].endDuration, b <= a + 1 && c > a + 1) {
                        d = e.subtitiles_ar[f].text;
                        break
                    }
                if (e.prevText != d) {
                    e.text_do.setInnerHTML(d), e.text_do.setX(-5e3), setTimeout(function() {
                        e.position()
                    }, 50), e.hasText_bl = !0
                }
                e.prevText = d
            }
        }, this.position = function(a) {
            if (e.isLoaded_bl) {
                var b, d = !FWDUVPUtils.isIEAndLessThen9,
                    f = 1;
                f = "bottom" != c.tempPlaylistPosition_str && c.showPlaylistButtonAndPlaylist_bl ? Math.min(2, c.tempVidStageWidth / (c.maxWidth - c.playlistWidth - c.spaceBetweenControllerAndPlaylist)) : Math.min(2, c.tempVidStageWidth / (c.maxWidth - c.spaceBetweenControllerAndPlaylist)), d || (f = 1), d && e.text_do.setScale2(f);
                var g = e.text_do.getHeight() * f;
                b = c.controller_do ? c.controller_do.isShowed_bl ? parseInt(c.vidStageHeight - c.controller_do.h - g) : parseInt(c.vidStageHeight - g - 10) : parseInt(c.vidStageHeight - g), e.text_do.setX(parseInt((c.tempVidStageWidth - e.text_do.getWidth()) / 2)), FWDAnimation.killTweensOf(e.text_do), a ? FWDAnimation.to(e.text_do, .8, {
                    y: b,
                    ease: Expo.easeInOut
                }) : e.text_do.setY(b)
            }
        }, this.show = function() {
            e.setVisible(!0)
        }, this.hide = function() {
            e.setVisible(!1)
        }, e.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPTransformDisplayObject("div")
    }, b.LOAD_ERROR = "error", b.LOAD_COMPLETE = "complete", b.prototype = null, a.FWDUVPSubtitle = b
}(window),
function(a) {
    var b = function(c, d, e, f, g, h) {
        var i = this;
        b.prototype;
        this.buttonRef_do = c, this.bkPath_str = d, this.pointerPath_str = e, this.text_do = null, this.pointer_do = null, this.fontColor_str = g, this.toolTipLabel_str = f, this.toolTipsButtonsHideDelay = 1e3 * h, this.pointerWidth = 7, this.pointerHeight = 4, this.showWithDelayId_to, this.isMobile_bl = FWDUVPUtils.isMobile, this.isShowed_bl = !0, this.init = function() {
            i.setOverflow("visible"), i.setupMainContainers(), i.setLabel(i.toolTipLabel_str), i.hide(), i.getStyle().background = "url('" + i.bkPath_str + "')", i.getStyle().zIndex = 9999999999999
        }, this.setupMainContainers = function() {
            i.text_do = new FWDUVPDisplayObject("div"), i.text_do.hasTransform3d_bl = !1, i.text_do.hasTransform2d_bl = !1, i.text_do.setBackfaceVisibility(), i.text_do.setDisplay("inline"), i.text_do.getStyle().fontFamily = "Arial", i.text_do.getStyle().fontSize = "12px", i.text_do.getStyle().color = i.fontColor_str, i.text_do.getStyle().whiteSpace = "nowrap", i.text_do.getStyle().fontSmoothing = "antialiased", i.text_do.getStyle().webkitFontSmoothing = "antialiased", i.text_do.getStyle().textRendering = "optimizeLegibility", i.text_do.getStyle().padding = "6px", i.text_do.getStyle().paddingTop = "4px", i.text_do.getStyle().paddingBottom = "4px", i.setLabel(), i.addChild(i.text_do);
            var a = new Image;
            a.src = i.pointerPath_str, i.pointer_do = new FWDUVPDisplayObject("img"), i.pointer_do.setScreen(a), i.pointer_do.setWidth(i.pointerWidth), i.pointer_do.setHeight(i.pointerHeight), i.addChild(i.pointer_do)
        }, this.setLabel = function(a) {
            i.text_do.setInnerHTML(f), setTimeout(function() {
                null != i && (i.setWidth(i.text_do.getWidth()), i.setHeight(i.text_do.getHeight()), i.positionPointer())
            }, 50)
        }, this.positionPointer = function(a) {
            var b, c;
            a || (a = 0), b = parseInt((i.w - i.pointerWidth) / 2) + a, c = i.h, i.pointer_do.setX(b), i.pointer_do.setY(c)
        }, this.show = function() {
            i.isShowed_bl || (i.isShowed_bl = !0, FWDAnimation.killTweensOf(i), clearTimeout(i.showWithDelayId_to), i.showWithDelayId_to = setTimeout(i.showFinal, i.toolTipsButtonsHideDelay), a.addEventListener ? a.addEventListener("mousemove", i.moveHandler) : document.attachEvent && (document.detachEvent("onmousemove", i.moveHandler), document.attachEvent("onmousemove", i.moveHandler)))
        }, this.showFinal = function() {
            i.setVisible(!0), i.setAlpha(0), FWDAnimation.to(i, .4, {
                alpha: 1,
                onComplete: function() {
                    i.setVisible(!0)
                },
                ease: Quart.easeOut
            })
        }, this.moveHandler = function(a) {
            var b = FWDUVPUtils.getViewportMouseCoordinates(a);
            FWDUVPUtils.hitTest(i.buttonRef_do.screen, b.screenX, b.screenY) || i.hide()
        }, this.hide = function() {
            i.isShowed_bl && (clearTimeout(i.showWithDelayId_to), a.removeEventListener ? a.removeEventListener("mousemove", i.moveHandler) : document.detachEvent && document.detachEvent("onmousemove", i.moveHandler), FWDAnimation.killTweensOf(i), i.setVisible(!1), i.isShowed_bl = !1)
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPDisplayObject("div", "fixed")
    }, b.CLICK = "onClick", b.MOUSE_DOWN = "onMouseDown", b.prototype = null, a.FWDUVPToolTip = b
}(window),
function(a) {
    var b = function(a, b, c, d) {
        this.listeners = {
            events_ar: []
        };
        var e = this;
        if ("div" != a && "img" != a && "canvas" != a) throw Error("Type is not valid! " + a);
        this.type = a, this.children_ar = [], this.style, this.screen, this.numChildren, this.transform, this.position = b || "absolute", this.overflow = c || "hidden", this.display = d || "block", this.visible = !0, this.buttonMode, this.x = 0, this.y = 0, this.scale = 1, this.rotation = 0, this.w = 0, this.h = 0, this.rect, this.alpha = 1, this.innerHTML = "", this.opacityType = "", this.isHtml5_bl = !1, this.hasTransform2d_bl = FWDUVPUtils.hasTransform2d, this.init = function() {
            this.setScreen()
        }, this.getTransform = function() {
            for (var b, a = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"]; b = a.shift();)
                if ("undefined" != typeof this.screen.style[b]) return b;
            return !1
        }, this.getOpacityType = function() {
            var a;
            return a = "undefined" != typeof this.screen.style.opacity ? "opacity" : "filter"
        }, this.setScreen = function(a) {
            "img" == this.type && a ? (this.screen = a, this.setMainProperties()) : (this.screen = document.createElement(this.type), this.setMainProperties())
        }, this.setMainProperties = function() {
            this.transform = this.getTransform(), this.setPosition(this.position), this.setOverflow(this.overflow), this.opacityType = this.getOpacityType(), "opacity" == this.opacityType && (this.isHtml5_bl = !0), "filter" == e.opacityType && (e.screen.style.filter = "inherit"), this.screen.style.left = "0px", this.screen.style.top = "0px", this.screen.style.margin = "0px", this.screen.style.padding = "0px", this.screen.style.maxWidth = "none", this.screen.style.maxHeight = "none", this.screen.style.border = "none", this.screen.style.lineHeight = "1", this.screen.style.backgroundColor = "transparent", this.screen.style.backfaceVisibility = "hidden", this.screen.style.webkitBackfaceVisibility = "hidden", this.screen.style.MozBackfaceVisibility = "hidden", this.screen.style.MozImageRendering = "optimizeSpeed", this.screen.style.WebkitImageRendering = "optimizeSpeed", "img" == a && (this.setWidth(this.screen.width), this.setHeight(this.screen.height), this.screen.onmousedown = function(a) {
                return !1
            })
        }, e.setBackfaceVisibility = function() {
            e.screen.style.backfaceVisibility = "visible", e.screen.style.webkitBackfaceVisibility = "visible", e.screen.style.MozBackfaceVisibility = "visible"
        }, e.removeBackfaceVisibility = function() {
            e.screen.style.backfaceVisibility = "hidden", e.screen.style.webkitBackfaceVisibility = "hidden", e.screen.style.MozBackfaceVisibility = "hidden"
        }, this.setSelectable = function(a) {
            if (!a) {
                try {
                    this.screen.style.userSelect = "none"
                } catch (a) {}
                try {
                    this.screen.style.MozUserSelect = "none"
                } catch (a) {}
                try {
                    this.screen.style.webkitUserSelect = "none"
                } catch (a) {}
                try {
                    this.screen.style.khtmlUserSelect = "none"
                } catch (a) {}
                try {
                    this.screen.style.oUserSelect = "none"
                } catch (a) {}
                try {
                    this.screen.style.msUserSelect = "none"
                } catch (a) {}
                try {
                    this.screen.msUserSelect = "none"
                } catch (a) {}
                this.screen.ondragstart = function(a) {
                    return !1
                }, this.screen.onselectstart = function() {
                    return !1
                }, this.screen.style.webkitTouchCallout = "none"
            }
        }, this.getScreen = function() {
            return e.screen
        }, this.setVisible = function(a) {
            this.visible = a, 1 == this.visible ? this.screen.style.visibility = "visible" : this.screen.style.visibility = "hidden"
        }, this.getVisible = function() {
            return this.visible
        }, this.setResizableSizeAfterParent = function() {
            this.screen.style.width = "100%", this.screen.style.height = "100%"
        }, this.getStyle = function() {
            return this.screen.style
        }, this.setOverflow = function(a) {
            e.overflow = a, e.screen.style.overflow = e.overflow
        }, this.setPosition = function(a) {
            e.position = a, e.screen.style.position = e.position
        }, this.setDisplay = function(a) {
            this.display = a, this.screen.style.display = this.display
        }, this.setButtonMode = function(a) {
            this.buttonMode = a, 1 == this.buttonMode ? this.screen.style.cursor = "pointer" : this.screen.style.cursor = "default"
        }, this.setBkColor = function(a) {
            e.screen.style.backgroundColor = a
        }, this.setInnerHTML = function(a) {
            e.innerHTML = a, e.screen.innerHTML = e.innerHTML
        }, this.getInnerHTML = function() {
            return e.innerHTML
        }, this.getRect = function() {
            return e.screen.getBoundingClientRect()
        }, this.setAlpha = function(a) {
            e.alpha = a, "opacity" == e.opacityType ? e.screen.style.opacity = e.alpha : "filter" == e.opacityType && (e.screen.style.filter = "alpha(opacity=" + 100 * e.alpha + ")", e.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(100 * e.alpha) + ")")
        }, this.getAlpha = function() {
            return e.alpha
        }, this.getRect = function() {
            return this.screen.getBoundingClientRect()
        }, this.getGlobalX = function() {
            return this.getRect().left
        }, this.getGlobalY = function() {
            return this.getRect().top
        }, this.setX = function(a) {
            e.x = a, e.hasTransform2d_bl ? e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + " , " + e.scale + ") rotate(" + e.rotation + "deg)" : e.screen.style.left = e.x + "px"
        }, this.getX = function() {
            return e.x
        }, this.setY = function(a) {
            e.y = a, e.hasTransform2d_bl ? e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + " , " + e.scale + ") rotate(" + e.rotation + "deg)" : e.screen.style.top = e.y + "px"
        }, this.getY = function() {
            return e.y
        }, this.setScale2 = function(a) {
            e.scale = a, e.hasTransform2d_bl && (e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + " , " + e.scale + ") rotate(" + e.rotation + "deg)")
        }, this.getScale = function() {
            return e.scale
        }, this.setRotation = function(a) {
            e.rotation = a, e.hasTransform2d_bl && (e.screen.style[e.transform] = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + " , " + e.scale + ") rotate(" + e.rotation + "deg)")
        }, e.setWidth = function(a) {
            e.w = a, "img" == e.type ? (e.screen.width = e.w, e.screen.style.width = e.w + "px") : e.screen.style.width = e.w + "px"
        }, this.getWidth = function() {
            return "div" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : e.w : "img" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : 0 != e.screen.width ? e.screen.width : e._w : "canvas" == e.type ? 0 != e.screen.offsetWidth ? e.screen.offsetWidth : e.w : void 0
        }, e.setHeight = function(a) {
            e.h = a, "img" == e.type ? (e.screen.height = e.h, e.screen.style.height = e.h + "px") : e.screen.style.height = e.h + "px"
        }, this.getHeight = function() {
            return "div" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : e.h : "img" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : 0 != e.screen.height ? e.screen.height : e.h : "canvas" == e.type ? 0 != e.screen.offsetHeight ? e.screen.offsetHeight : e.h : void 0
        }, this.getNumChildren = function() {
            return e.children_ar.length
        }, this.addChild = function(a) {
            this.contains(a) ? (this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, a), 1), this.children_ar.push(a), this.screen.appendChild(a.screen)) : (this.children_ar.push(a), this.screen.appendChild(a.screen))
        }, this.removeChild = function(a) {
            if (!this.contains(a)) throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
            this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, a), 1), this.screen.removeChild(a.screen)
        }, this.contains = function(a) {
            return FWDUVPUtils.indexOfArray(this.children_ar, a) != -1
        }, this.addChildAtZero = function(a) {
            0 == this.numChildren ? (this.children_ar.push(a), this.screen.appendChild(a.screen)) : (this.screen.insertBefore(a.screen, this.children_ar[0].screen), this.contains(a) && this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, a), 1), this.children_ar.unshift(a))
        }, this.getChildAt = function(a) {
            if (a < 0 || a > this.numChildren - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (0 == this.numChildren) throw Errror("##getChildAt## Child dose not exist!");
            return this.children_ar[a]
        }, this.removeChildAtZero = function() {
            this.screen.removeChild(this.children_ar[0].screen), this.children_ar.shift()
        }, this.addListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function.");
            var c = {};
            c.type = a, c.listener = b, c.target = this, this.listeners.events_ar.push(c)
        }, this.dispatchEvent = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a) {
                    if (b)
                        for (var e in b) this.listeners.events_ar[c][e] = b[e];
                    this.listeners.events_ar[c].listener.call(this, this.listeners.events_ar[c]);
                    break
                }
        }, this.removeListener = function(a, b) {
            if (void 0 == a) throw Error("type is required.");
            if ("object" == typeof a) throw Error("type must be of type String.");
            if ("function" != typeof b) throw Error("listener must be of type Function." + a);
            for (var c = 0, d = this.listeners.events_ar.length; c < d; c++)
                if (this.listeners.events_ar[c].target === this && this.listeners.events_ar[c].type === a && this.listeners.events_ar[c].listener === b) {
                    this.listeners.events_ar.splice(c, 1);
                    break
                }
        }, this.disposeImage = function() {
            "img" == this.type && (this.screen.src = null)
        }, this.destroy = function() {
            try {
                this.screen.parentNode.removeChild(this.screen)
            } catch (a) {}
            this.screen.onselectstart = null, this.screen.ondragstart = null, this.screen.ontouchstart = null, this.screen.ontouchmove = null, this.screen.ontouchend = null, this.screen.onmouseover = null, this.screen.onmouseout = null, this.screen.onmouseup = null, this.screen.onmousedown = null, this.screen.onmousemove = null, this.screen.onclick = null, delete this.screen, delete this.style, delete this.rect, delete this.selectable, delete this.buttonMode, delete this.position, delete this.overflow, delete this.visible, delete this.innerHTML, delete this.numChildren, delete this.x, delete this.y, delete this.w, delete this.h, delete this.opacityType, delete this.isHtml5_bl, delete this.hasTransform2d_bl, this.children_ar = null, this.style = null, this.screen = null, this.numChildren = null, this.transform = null, this.position = null, this.overflow = null, this.display = null, this.visible = null, this.buttonMode = null, this.globalX = null, this.globalY = null, this.x = null, this.y = null, this.w = null, this.h = null, this.rect = null, this.alpha = null, this.innerHTML = null, this.opacityType = null, this.isHtml5_bl = null, this.hasTransform3d_bl = null, this.hasTransform2d_bl = null, e = null
        }, this.init()
    };
    a.FWDUVPTransformDisplayObject = b
}(window),
function(a) {
    var b = function(c, d) {
        var e = this;
        b.prototype;
        this.video_el = null, this.sourcePath_str = null, this.bk_do = null, this.controllerHeight = c.data.controllerHeight, this.stageWidth = 0, this.stageHeight = 0, this.lastPercentPlayed = 0, this.volume = d, this.curDuration = 0, this.countNormalMp3Errors = 0, this.countShoutCastErrors = 0, this.maxShoutCastCountErrors = 5, this.maxNormalCountErrors = 1, this.disableClickForAWhileId_to, this.showErrorWithDelayId_to, this.disableClick_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !0, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.hasPlayedOnce_bl = !1, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            e.setBkColor(c.videoBackgroundColor_str), e.setupVideo()
        }, this.setupVideo = function() {
            null == e.video_el && (e.video_el = document.createElement("video"), e.screen.appendChild(e.video_el), e.video_el.controls = !1, e.video_el.volume = e.volume, e.video_el.style.position = "absolute", e.video_el.style.pointerEvent = "none", e.video_el.style.left = "0px", e.video_el.style.top = "0px", e.video_el.style.backfaceVisibility = "hidden", e.video_el.style.width = "100%", e.video_el.style.height = "100%", e.video_el.style.margin = "0px", e.video_el.style.padding = "0px", e.video_el.style.maxWidth = "none", e.video_el.style.maxHeight = "none", e.video_el.style.border = "none", e.video_el.style.lineHeight = "0", e.video_el.style.msTouchAction = "none", e.screen.appendChild(e.video_el)), e.video_el.addEventListener("error", e.errorHandler), e.video_el.addEventListener("canplay", e.safeToBeControlled), e.video_el.addEventListener("canplaythrough", e.safeToBeControlled), e.video_el.addEventListener("progress", e.updateProgress), e.video_el.addEventListener("timeupdate", e.updateVideo), e.video_el.addEventListener("pause", e.pauseHandler), e.video_el.addEventListener("play", e.playHandler), FWDUVPUtils.isIE || e.video_el.addEventListener("waiting", e.startToBuffer), e.video_el.addEventListener("playing", e.stopToBuffer), e.video_el.addEventListener("ended", e.endedHandler), e.resizeAndPosition()
        }, this.destroyVideo = function() {
            clearTimeout(e.showErrorWithDelayId_to), e.video_el && (e.video_el.removeEventListener("error", e.errorHandler), e.video_el.removeEventListener("canplay", e.safeToBeControlled), e.video_el.removeEventListener("canplaythrough", e.safeToBeControlled), e.video_el.removeEventListener("progress", e.updateProgress), e.video_el.removeEventListener("timeupdate", e.updateVideo), e.video_el.removeEventListener("pause", e.pauseHandler), e.video_el.removeEventListener("play", e.playHandler), FWDUVPUtils.isIE || e.video_el.removeEventListener("waiting", e.startToBuffer), e.video_el.removeEventListener("playing", e.stopToBuffer), e.video_el.removeEventListener("ended", e.endedHandler), e.isMobile_bl ? (e.screen.removeChild(e.video_el), e.video_el = null) : (e.video_el.style.visibility = "hidden", e.video_el.src = "", e.video_el.load()))
        }, this.startToBuffer = function(a) {
            e.dispatchEvent(b.START_TO_BUFFER)
        }, this.stopToBuffer = function() {
            e.dispatchEvent(b.STOP_TO_BUFFER)
        }, this.errorHandler = function(c) {
            var d;
            e.hasError_bl = !0, d = 0 == e.video_el.networkState ? "error 'self.video_el.networkState = 0'" : 1 == e.video_el.networkState ? "error 'self.video_el.networkState = 1'" : 2 == e.video_el.networkState ? "'self.video_el.networkState = 2'" : 3 == e.video_el.networkState ? "source not found <font color='#ff0000'>" + e.sourcePath_str + "</font>" : c, a.console && a.console.log(e.video_el.networkState), clearTimeout(e.showErrorWithDelayId_to), e.showErrorWithDelayId_to = setTimeout(function() {
                e.dispatchEvent(b.ERROR, {
                    text: d
                })
            }, 200)
        }, this.resizeAndPosition = function(a, b) {
            a && (e.stageWidth = a, e.stageHeight = b), e.setWidth(e.stageWidth), FWDUVPUtils.isIphone ? e.setHeight(e.stageHeight - e.controllerHeight) : e.setHeight(e.stageHeight)
        }, this.setSource = function(a) {
            e.sourcePath_str = a, e.video_el && e.stop()
        }, this.play = function(a) {
            if (FWDUVPlayer.curInstance = c, e.isStopped_bl) e.isPlaying_bl = !1, e.hasError_bl = !1, e.allowScrubing_bl = !1, e.isStopped_bl = !1, e.setupVideo(), e.setVolume(), e.video_el.src = e.sourcePath_str, e.play(), e.startToBuffer(!0), e.isPlaying_bl = !0;
            else if (!e.video_el.ended || a) try {
                e.isPlaying_bl = !0, e.hasPlayedOnce_bl = !0, e.video_el.play(), FWDUVPUtils.isIE && e.dispatchEvent(b.PLAY)
            } catch (a) {}
        }, this.pause = function() {
            if (null != e && !e.isStopped_bl && !e.hasError_bl && !e.video_el.ended) try {
                e.video_el.pause(), e.isPlaying_bl = !1, FWDUVPUtils.isIE && e.dispatchEvent(b.PAUSE)
            } catch (a) {}
        }, this.togglePlayPause = function() {
            null != e && e.isSafeToBeControlled_bl && (e.isPlaying_bl ? e.pause() : e.play())
        }, this.resume = function() {
            e.isStopped_bl || e.play()
        }, this.pauseHandler = function() {
            e.allowScrubing_bl || e.dispatchEvent(b.PAUSE)
        }, this.playHandler = function() {
            e.allowScrubing_bl || (e.isStartEventDispatched_bl || (e.dispatchEvent(b.START), e.isStartEventDispatched_bl = !0), e.dispatchEvent(b.PLAY))
        }, this.endedHandler = function() {
            e.dispatchEvent(b.PLAY_COMPLETE)
        }, this.stop = function(a) {
            (null != e && null != e.video_el && !e.isStopped_bl || a) && (e.isPlaying_bl = !1, e.isStopped_bl = !0, e.hasPlayedOnce_bl = !0, e.isSafeToBeControlled_bl = !1, e.isStartEventDispatched_bl = !1, e.destroyVideo(), e.dispatchEvent(b.LOAD_PROGRESS, {
                percent: 0
            }), e.dispatchEvent(b.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            }), e.dispatchEvent(b.STOP), e.stopToBuffer())
        }, this.safeToBeControlled = function() {
            e.stopToScrub(), e.isSafeToBeControlled_bl || (e.hasHours_bl = Math.floor(e.video_el.duration / 3600) > 0, e.isPlaying_bl = !0, e.isSafeToBeControlled_bl = !0, e.video_el.style.visibility = "visible", e.dispatchEvent(b.SAFE_TO_SCRUBB))
        }, this.updateProgress = function() {
            var a, c = 0;
            e.video_el.buffered.length > 0 && (a = e.video_el.buffered.end(e.video_el.buffered.length - 1), c = a.toFixed(1) / e.video_el.duration.toFixed(1), !isNaN(c) && c || (c = 0)), 1 == c && e.video_el.removeEventListener("progress", e.updateProgress), e.dispatchEvent(b.LOAD_PROGRESS, {
                percent: c
            })
        }, this.updateVideo = function() {
            var a;
            e.allowScrubing_bl || (a = e.video_el.currentTime / e.video_el.duration, e.dispatchEvent(b.UPDATE, {
                percent: a
            }));
            var c = e.formatTime(e.video_el.duration),
                d = e.formatTime(e.video_el.currentTime);
            isNaN(e.video_el.duration) ? e.dispatchEvent(b.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00",
                seconds: 0
            }) : e.dispatchEvent(b.UPDATE_TIME, {
                curTime: d,
                totalTime: c,
                seconds: parseInt(e.video_el.currentTime)
            }), e.lastPercentPlayed = a, e.curDuration = d
        }, this.startToScrub = function() {
            e.allowScrubing_bl = !0
        }, this.stopToScrub = function() {
            e.allowScrubing_bl = !1
        }, this.scrub = function(a, c) {
            c && e.startToScrub();
            try {
                e.video_el.currentTime = e.video_el.duration * a;
                var d = e.formatTime(e.video_el.duration),
                    f = e.formatTime(e.video_el.currentTime);
                e.dispatchEvent(b.UPDATE_TIME, {
                    curTime: f,
                    totalTime: d
                })
            } catch (a) {}
        }, this.replay = function() {
            e.scrub(0), e.play()
        }, this.setVolume = function(a) {
            a && (e.volume = a), e.video_el && (e.video_el.volume = e.volume)
        }, this.formatTime = function(a) {
            var b = Math.floor(a / 3600),
                c = a % 3600,
                d = Math.floor(c / 60),
                f = c % 60,
                g = Math.ceil(f);
            return d = d >= 10 ? d : "0" + d, g = g >= 10 ? g : "0" + g, isNaN(g) ? "00:00" : e.hasHours_bl ? b + ":" + d + ":" + g : d + ":" + g
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.ERROR = "error", b.UPDATE = "update", b.UPDATE_TIME = "updateTime", b.SAFE_TO_SCRUBB = "safeToControll", b.LOAD_PROGRESS = "loadProgress", b.START = "start", b.PLAY = "play", b.PAUSE = "pause", b.STOP = "stop", b.PLAY_COMPLETE = "playComplete", b.START_TO_BUFFER = "startToBuffer", b.STOP_TO_BUFFER = "stopToBuffer", a.FWDUVPVideoScreen = b
}(window),
function(a) {
    var b = function(a, c) {
        var d = this;
        b.prototype;
        this.iframe_do = null, this.vimeoPlayer = null, this.lastQuality_str = "auto", this.volume = c, this.updateVideoId_int, this.updatePreloadId_int, this.controllerHeight = a.data.controllerHeight, this.hasBeenCreatedOnce_bl = !0, this.hasHours_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !1, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isPausedInEvent_bl = !0, this.isShowed_bl = !0, this.isCued_bl = !1, this.isVideoLoaded_bl = !1, this.isReady_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            d.hasTransform3d_bl = !1, d.hasTransform2d_bl = !1, d.setBackfaceVisibility(), a.videoHolder_do.addChild(d), d.resizeAndPosition(), d.setupVideo(), d.setupDisableClick(), d.intitErrorId_to = setTimeout(d.initError, 8e3)
        }, this.initError = function() {
            d.dispatchEvent(b.INIT_ERROR, {
                error: "Error loading the Vimeo video player!"
            })
        }, this.setupDisableClick = function() {
            d.disableClick_do = new FWDUVPDisplayObject("div"), d.disableClick_do.setBkColor(a.backgroundColor_str), d.disableClick_do.setAlpha(1e-8), d.addChild(d.disableClick_do)
        }, this.showDisable = function() {
            a.tempVidStageWidth && d.disableClick_do.w != d.stageWidth && (d.disableClick_do.setWidth(a.tempVidStageWidth), FWDUVPUtils.isIphone ? d.disableClick_do.setHeight(a.tempVidStageHeight - d.controllerHeight) : d.disableClick_do.setHeight(a.tempVidStageHeight))
        }, this.hideDisable = function() {
            0 != d.disableClick_do.w && (d.disableClick_do.setWidth(0), d.disableClick_do.setHeight(0))
        }, this.setupVideo = function() {
            d.vimeolayer || (d.iframe_do = new FWDUVPDisplayObject("IFRAME"), d.iframe_do.hasTransform3d_bl = !1, d.iframe_do.hasTransform2d_bl = !1, d.iframe_do.screen.setAttribute("id", a.instanceName_str + "vimeo"), d.isMobile_bl && (d.iframe_do.screen.setAttribute("webkitallowfullscreen", "1"), d.iframe_do.screen.setAttribute("mozallowfullscreen", "1"), d.iframe_do.screen.setAttribute("allowfullscreen", "1")), d.setSource("https://player.vimeo.com/video/76979871"), d.iframe_do.getStyle().width = "100%", d.iframe_do.getStyle().height = "100%", d.iframe_do.setBackfaceVisibility(), d.addChild(d.iframe_do), d.vimeoPlayer = $f(d.iframe_do.screen), d.vimeoPlayer.addEvent("ready", d.readyHandler), d.blackOverlay_do = new FWDUVPDisplayObject("div"), d.blackOverlay_do.getStyle().backgroundColor = "#000000", d.blackOverlay_do.getStyle().width = "100%", d.blackOverlay_do.getStyle().height = "100%", d.addChild(d.blackOverlay_do))
        }, this.resizeAndPosition = function() {
            a.tempVidStageWidth && (d.setWidth(a.tempVidStageWidth), d.setHeight(a.tempVidStageHeight - d.controllerHeight))
        }, this.setSource = function(b) {
            b && (d.sourcePath_str = b), d.stop();
            var c = d.sourcePath_str.match(/[^\/]+$/i);
            d.iframe_do.screen.setAttribute("src", "https://player.vimeo.com/video/" + c + "?api=1&player_id=" + a.instanceName_str + "vimeo&autoplay=0")
        }, this.readyHandler = function() {
            if (clearTimeout(d.intitErrorId_to), d.contains(d.blackOverlay_do) && (clearTimeout(d.removeChildWithDelayId_to), d.removeChildWithDelayId_to = setTimeout(function() {
                    d.removeChild(d.blackOverlay_do)
                }, 1500)), d.resizeAndPosition(), d.vimeoPlayer.addEvent("play", d.playHandler), d.vimeoPlayer.addEvent("pause", d.pauseHandler), d.vimeoPlayer.addEvent("loadProgress", d.loadProgressHandler), d.vimeoPlayer.addEvent("finish", d.finishHandler), d.vimeoPlayer.addEvent("loaded", d.loadedHandler), d.isReady_bl) {
                try {
                    d.vimeoPlayer.api("setColor", "#FFFFFF")
                } catch (a) {}
                return a.videoType_str == FWDUVPlayer.VIMEO && d.setX(0), void(a.data.autoPlay_bl && a.play())
            }
            d.isReady_bl = !0, d.dispatchEvent(b.READY)
        }, this.loadedHandler = function() {
            d.isVideoLoaded_bl = !0
        }, this.playHandler = function() {
            d.isStopped_bl = !1, d.isSafeToBeControlled_bl = !0, d.isPlaying_bl = !0, d.hasHours_bl = Math.floor(d.getDuration() / 3600) > 0, d.setVolume(a.volume), d.startToUpdate(), d.dispatchEvent(b.SAFE_TO_SCRUBB), d.dispatchEvent(b.PLAY)
        }, this.loadProgressHandler = function(a) {
            d.isShowed_bl || d.dispatchEvent(b.LOAD_PROGRESS, {
                percent: a.percent
            })
        }, this.pauseHandler = function() {
            d.isPlaying_bl = !1, d.dispatchEvent(b.PAUSE), d.stopToUpdate()
        }, this.finishHandler = function() {
            a.data.loop_bl && (d.stop(), setTimeout(d.play, 200)), d.dispatchEvent(b.PLAY_COMPLETE)
        }, this.play = function(b) {
            FWDUVPlayer.curInstance = a;
            var c = 200;
            d.isPlaying_bl = !0, d.hasError_bl = !1, clearTimeout(d.startToPlayWithDelayId_to), a.prevVideoType_str != FWDUVPlayer.VIMEO && (c = 800);
            try {
                d.startToPlayWithDelayId_to = setTimeout(function() {
                    d.vimeoPlayer.api("play")
                }, c)
            } catch (a) {}
            d.isMobile_bl || (d.isStopped_bl = !1)
        }, this.pause = function() {
            if (!d.isStopped_bl && !d.hasError_bl) {
                d.isPlaying_bl = !1;
                try {
                    d.vimeoPlayer.api("pause")
                } catch (a) {}
                d.stopToUpdate()
            }
        }, this.togglePlayPause = function() {
            d.isPlaying_bl ? d.pause() : d.play()
        }, this.resume = function() {
            d.isStopped_bl || d.play()
        }, this.startToUpdate = function() {
            clearInterval(d.updateVideoId_int), d.updateVideoId_int = setInterval(d.updateVideo, 500)
        }, this.stopToUpdate = function() {
            clearInterval(d.updateVideoId_int)
        }, this.updateVideo = function() {
            var a;
            if (!d.vimeoPlayer) return void stopToUpdate();
            var c = d.formatTime(d.getDuration()),
                e = d.formatTime(d.getCurrentTime());
            a = e / c, d.dispatchEvent(FWDUVPYoutubeScreen.UPDATE, {
                percent: a
            }), d.dispatchEvent(b.UPDATE_TIME, {
                curTime: e,
                totalTime: c,
                seconds: parseInt(d.getCurrentTime())
            })
        }, this.stop = function(a) {
            d.isVideoLoaded_bl = !1, clearTimeout(d.startToPlayWithDelayId_to), d.isStopped_bl || (d.isPlaying_bl = !1, d.isStopped_bl = !0, d.isCued_bl = !1, d.allowScrubing_bl = !1, d.isSafeToBeControlled_bl = !1, d.isPausedInEvent_bl = !0, d.stopToUpdate(), a || (d.stopVideo(), d.dispatchEvent(b.STOP), d.dispatchEvent(b.LOAD_PROGRESS, {
                percent: 0
            }), d.dispatchEvent(b.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            })))
        }, this.destroy = function() {
            d.iframe_do && (d.iframe_do.screen.removeAttribute("id", a.instanceName_str + "vimeo"), d.removeChild(d.iframe_do), d.iframe_do.destroy(), d.iframe_do = null), d.vimeoPlayer = null
        }, this.stopVideo = function() {
            d.setSource(d.sourcePath_str)
        }, this.startToScrub = function() {
            d.isSafeToBeControlled_bl && (d.allowScrubing_bl = !0)
        }, this.stopToScrub = function() {
            d.isSafeToBeControlled_bl && (d.allowScrubing_bl = !1)
        }, this.scrub = function(a) {
            d.isSafeToBeControlled_bl && d.vimeoPlayer.api("seekTo", a * d.getDuration())
        }, this.setVolume = function(a) {
            a && (d.volume = a), d.vimeoPlayer && d.vimeoPlayer.api("setVolume", a)
        }, this.getDuration = function() {
            if (d.isSafeToBeControlled_bl) return d.vimeoPlayer.api("getDuration", function(a, b) {
                d.duration = a
            }), d.duration
        }, this.getCurrentTime = function() {
            if (d.isSafeToBeControlled_bl) return d.vimeoPlayer.api("getCurrentTime", function(a, b) {
                d.currentTime = a
            }), d.currentTime
        }, this.formatTime = function(a) {
            var b = Math.floor(a / 3600),
                c = a % 3600,
                e = Math.floor(c / 60),
                f = c % 60,
                g = Math.ceil(f);
            return e = e >= 10 ? e : "0" + e, g = g >= 10 ? g : "0" + g, isNaN(g) ? "00:00" : d.hasHours_bl ? b + ":" + e + ":" + g : e + ":" + g
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.SAFE_TO_SCRUBB = "safeToScrub", b.READY = "ready", b.INIT_ERROR = "initError", b.UPDATE = "update", b.UPDATE_TIME = "updateTime", b.LOAD_PROGRESS = "loadProgress", b.PLAY = "play", b.PAUSE = "pause", b.STOP = "stop", b.PLAY_COMPLETE = "playComplete", b.CUED = "cued", b.QUALITY_CHANGE = "qualityChange", a.FWDUVPVimeoScreen = b
}(window),
function(a) {
    var b = function(a, c, d) {
        var e = this,
            f = b.prototype;
        this.nImg = a, this.sPath_str = c, this.dPath_str = d, this.n_sdo, this.s_sdo, this.d_sdo, this.toolTipLabel_str, this.totalWidth = this.nImg.width, this.totalHeight = this.nImg.height, this.isSetToDisabledState_bl = !1, this.isDisabled_bl = !1, this.isSelectedFinal_bl = !1, this.isSelected_bl = !1, this.isActive_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent, this.allowToCreateSecondButton_bl = !e.isMobile_bl || e.hasPointerEvent_bl, e.init = function() {
            e.setupMainContainers()
        }, e.setupMainContainers = function() {
            if (e.n_sdo = new FWDUVPDisplayObject("img"), e.n_sdo.setScreen(e.nImg), e.addChild(e.n_sdo), e.allowToCreateSecondButton_bl) {
                var a = new Image;
                if (a.src = e.sPath_str, e.s_sdo = new FWDUVPDisplayObject("img"), e.s_sdo.setScreen(a), e.s_sdo.setWidth(e.totalWidth), e.s_sdo.setHeight(e.totalHeight), e.s_sdo.setAlpha(0), e.addChild(e.s_sdo), e.dPath_str) {
                    var b = new Image;
                    b.src = e.dPath_str, e.d_sdo = new FWDUVPDisplayObject("img"), e.d_sdo.setScreen(b), e.d_sdo.setWidth(e.totalWidth), e.d_sdo.setHeight(e.totalHeight), e.isMobile_bl ? e.d_sdo.setX(-100) : e.d_sdo.setAlpha(0), e.addChild(e.d_sdo)
                }
            }
            e.setWidth(e.totalWidth), e.setHeight(e.totalHeight), e.setButtonMode(!0), e.isMobile_bl ? e.hasPointerEvent_bl ? (e.screen.addEventListener("pointerdown", e.onMouseUp), e.screen.addEventListener("pointerover", e.onMouseOver), e.screen.addEventListener("pointerout", e.onMouseOut)) : e.screen.addEventListener("touchend", e.onMouseUp) : e.screen.addEventListener ? (e.screen.addEventListener("mouseover", e.onMouseOver), e.screen.addEventListener("mouseout", e.onMouseOut), e.screen.addEventListener("mousedown", e.onMouseUp)) : e.screen.attachEvent && (e.screen.attachEvent("onmouseover", e.onMouseOver), e.screen.attachEvent("onmouseout", e.onMouseOut), e.screen.attachEvent("onmousedown", e.onMouseUp))
        }, e.onMouseOver = function(a) {
            if (e.dispatchEvent(b.SHOW_TOOLTIP, {
                    e: a
                }), !a.pointerType || a.pointerType == a.MSPOINTER_TYPE_MOUSE) {
                if (e.isDisabled_bl || e.isSelectedFinal_bl) return;
                e.dispatchEvent(b.MOUSE_OVER, {
                    e: a
                }), e.setSelectedState(!0)
            }
        }, e.onMouseOut = function(a) {
            if (!a.pointerType || a.pointerType == a.MSPOINTER_TYPE_MOUSE) {
                if (e.isDisabled_bl || e.isSelectedFinal_bl) return;
                e.dispatchEvent(b.MOUSE_OUT, {
                    e: a
                })
            }
        }, e.onMouseUp = function(a) {
            a.preventDefault && a.preventDefault(), e.isDisabled_bl || 2 == a.button || e.isSelectedFinal_bl || e.dispatchEvent(b.MOUSE_UP, {
                e: a
            })
        }, this.setNormalState = function(a) {
            e.isSelected_bl && (e.isSelected_bl = !1, FWDAnimation.killTweensOf(e.s_sdo), a ? FWDAnimation.to(e.s_sdo, .5, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            }) : e.s_sdo.setAlpha(0))
        }, this.setSelectedState = function(a) {
            e.isSelected_bl || (e.isSelected_bl = !0, FWDAnimation.killTweensOf(e.s_sdo), a ? FWDAnimation.to(e.s_sdo, .5, {
                alpha: 1,
                delay: .1,
                ease: Expo.easeOut
            }) : e.s_sdo.setAlpha(1))
        }, e.setSelctedFinal = function() {
            e.isSelectedFinal_bl = !0, FWDAnimation.killTweensOf(e.s_sdo), FWDAnimation.to(e.s_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            }), e.setButtonMode(!1)
        }, e.setUnselctedFinal = function() {
            e.isSelectedFinal_bl = !1, FWDAnimation.to(e.s_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            }), e.setButtonMode(!0)
        }, this.setDisabledState = function() {
            e.isSetToDisabledState_bl || (e.isSetToDisabledState_bl = !0, e.isMobile_bl ? e.d_sdo.setX(0) : (FWDAnimation.killTweensOf(e.d_sdo), FWDAnimation.to(e.d_sdo, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })))
        }, this.setEnabledState = function() {
            e.isSetToDisabledState_bl && (e.isSetToDisabledState_bl = !1, e.isMobile_bl ? e.d_sdo.setX(-100) : (FWDAnimation.killTweensOf(e.d_sdo), FWDAnimation.to(e.d_sdo, .8, {
                alpha: 0,
                delay: .1,
                ease: Expo.easeOut
            })))
        }, this.disable = function() {
            e.isDisabled_bl = !0, e.setButtonMode(!1)
        }, this.enable = function() {
            e.isDisabled_bl = !1, e.setButtonMode(!0)
        }, e.destroy = function() {
            e.isMobile_bl ? e.hasPointerEvent_bl ? (e.screen.removeEventListener("pointerdown", e.onMouseUp), e.screen.removeEventListener("pointerover", e.onMouseOver), e.screen.removeEventListener("pointerout", e.onMouseOut)) : e.screen.removeEventListener("touchend", e.onMouseUp) : e.screen.removeEventListener ? (e.screen.removeEventListener("mouseover", e.onMouseOver), e.screen.removeEventListener("mouseout", e.onMouseOut), e.screen.removeEventListener("mousedown", e.onMouseUp)) : e.screen.detachEvent && (e.screen.detachEvent("onmouseover", e.onMouseOver), e.screen.detachEvent("onmouseout", e.onMouseOut), e.screen.detachEvent("onmousedown", e.onMouseUp)), FWDAnimation.killTweensOf(e.s_sdo), e.n_sdo.destroy(), e.s_sdo.destroy(), e.d_sdo && (FWDAnimation.killTweensOf(e.d_sdo), e.d_sdo.destroy()), e.nImg = null, e.sImg = null, e.dImg = null, e.n_sdo = null, e.s_sdo = null, e.d_sdo = null, a = null, sImg = null, dImg = null, e.toolTipLabel_str = null, e.init = null, e.setupMainContainers = null, e.onMouseOver = null, e.onMouseOut = null, e.onClick = null, e.onMouseDown = null, e.setSelctedFinal = null, e.setUnselctedFinal = null, e.setInnerHTML(""), f.destroy(), e = null, f = null, b.prototype = null
        }, e.init()
    };
    b.setPrototype = function() {
        b.prototype = null, b.prototype = new FWDUVPDisplayObject("div")
    }, b.SHOW_TOOLTIP = "showToolTip", b.CLICK = "onClick", b.MOUSE_OVER = "onMouseOver", b.MOUSE_OUT = "onMouseOut", b.MOUSE_UP = "onMouseDown", b.prototype = null, a.FWDUVPVolumeButton = b
}(window),
function(a) {
    var b = function(a, c) {
        var d = this;
        b.prototype;
        this.videoHolder_do = null, this.ytb = null, this.lastQuality_str = "auto", this.volume = c, this.updateVideoId_int, this.updatePreloadId_int, this.controllerHeight = a.data.controllerHeight, this.hasHours_bl = !1, this.hasBeenCreatedOnce_bl = !1, this.allowScrubing_bl = !1, this.hasError_bl = !1, this.isPlaying_bl = !1, this.isStopped_bl = !0, this.isStartEventDispatched_bl = !1, this.isSafeToBeControlled_bl = !1, this.isPausedInEvent_bl = !0, this.isShowed_bl = !0, this.isQualityArrayDisapatched_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.init = function() {
            d.hasTransform3d_bl = !1, d.hasTransform2d_bl = !1, d.setBkColor("#000000"), d.setBackfaceVisibility(), a.videoHolder_do.addChild(d), d.resizeAndPosition(), d.setupVideo()
        }, this.setupVideo = function() {
            d.ytb || (d.videoHolder_do = new FWDUVPDisplayObject("div"), d.videoHolder_do.hasTransform3d_bl = !1, d.videoHolder_do.hasTransform2d_bl = !1, d.videoHolder_do.screen.setAttribute("id", a.instanceName_str + "youtube"), d.videoHolder_do.getStyle().width = "100%", d.videoHolder_do.getStyle().height = "100%", d.videoHolder_do.setBackfaceVisibility(), d.addChild(d.videoHolder_do), d.ytb = new YT.Player(a.instanceName_str + "youtube", {
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
                    onReady: d.playerReadyHandler,
                    onError: d.playerErrorHandler,
                    onStateChange: d.stateChangeHandler,
                    onPlaybackQualityChange: d.qualityChangeHandler
                }
            }))
        }, this.playerReadyHandler = function() {
            d.resizeAndPosition(), d.dispatchEvent(b.READY), d.hasBeenCreatedOnce_bl = !0
        }, this.stateChangeHandler = function(c) {
            if (c.data == -1 && d.isCued_bl && d.isMobile_bl && (d.isStopped_bl = !1, FWDUVPlayer.stopAllVideos(a)), c.data == YT.PlayerState.PLAYING) d.isSafeToBeControlled_bl || (d.isStopped_bl = !1, d.isSafeToBeControlled_bl = !0, d.isPlaying_bl = !0, d.hasHours_bl = Math.floor(d.ytb.getDuration() / 3600) > 0, d.setVolume(d.volume), d.startToUpdate(), d.startToPreload(), d.scrub(1e-5), d.isMobile_bl || d.setQuality(d.lastQuality_str), d.ytb.getAvailableQualityLevels() && 0 != d.ytb.getAvailableQualityLevels().length && d.dispatchEvent(b.QUALITY_CHANGE, {
                qualityLevel: d.ytb.getPlaybackQuality(),
                levels: d.ytb.getAvailableQualityLevels()
            }), d.dispatchEvent(b.SAFE_TO_SCRUBB)), d.isPausedInEvent_bl && d.dispatchEvent(b.PLAY), d.isPausedInEvent_bl = !1, d.hasError_bl = !1;
            else if (c.data == YT.PlayerState.PAUSED) {
                if (!d.isSafeToBeControlled_bl) return;
                d.isStopped_bl = !1, d.isPausedInEvent_bl || d.dispatchEvent(b.PAUSE), d.isPausedInEvent_bl = !0
            } else c.data == YT.PlayerState.ENDED ? d.ytb.getCurrentTime() && d.ytb.getCurrentTime() > 0 && (d.isStopped_bl = !1, setTimeout(function() {
                d.dispatchEvent(b.PLAY_COMPLETE)
            }, 100)) : c.data == YT.PlayerState.CUED && (d.isStopped_bl || d.dispatchEvent(b.CUED), d.isCued_bl = !0)
        }, this.qualityChangeHandler = function(a) {
            d.ytb.getAvailableQualityLevels() && 0 != d.ytb.getAvailableQualityLevels().length && d.dispatchEvent(b.QUALITY_CHANGE, {
                qualityLevel: d.ytb.getPlaybackQuality()
            })
        }, this.playerErrorHandler = function(a) {
            if (d.isPausedInEvent_bl = !0, !d.isStopped_bl && !d.hasError_bl) {
                var c = "";
                d.hasError_bl = !0, 2 == a.data ? c = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks." : 5 == a.data ? c = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred." : 100 == a.data ? c = "The youtube video request was not found, probably the video ID is incorrect." : 101 != a.data && 150 != a.data || (c = "The owner of the requested video does not allow it to be played in embedded players."), d.dispatchEvent(b.ERROR, {
                    text: c
                })
            }
        }, this.resizeAndPosition = function() {
            d.setWidth(a.tempVidStageWidth), FWDUVPUtils.isIphone ? d.setHeight(a.tempVidStageHeight - d.controllerHeight) : d.setHeight(a.tempVidStageHeight)
        }, this.setSource = function(a) {
            a && (d.sourcePath_str = a), d.ytb.cueVideoById(d.sourcePath_str)
        }, this.play = function(b) {
            FWDUVPlayer.curInstance = a, d.isPlaying_bl = !0, d.hasError_bl = !1;
            try {
                d.ytb.playVideo(), d.startToUpdate()
            } catch (a) {}
            d.isStopped_bl = !1
        }, this.pause = function() {
            if (!d.isStopped_bl && !d.hasError_bl) {
                d.isPlaying_bl = !1;
                try {
                    d.ytb.pauseVideo()
                } catch (a) {}
                d.stopToUpdate()
            }
        }, this.togglePlayPause = function() {
            d.isPlaying_bl ? d.pause() : d.play()
        }, this.resume = function() {
            d.isStopped_bl || d.play()
        }, this.startToUpdate = function() {
            clearInterval(d.updateVideoId_int), d.updateVideoId_int = setInterval(d.updateVideo, 500)
        }, this.stopToUpdate = function() {
            clearInterval(d.updateVideoId_int)
        }, this.updateVideo = function() {
            var a;
            if (!d.ytb) return void stopToUpdate();
            d.allowScrubing_bl || (a = d.ytb.getCurrentTime() / d.ytb.getDuration(), d.dispatchEvent(b.UPDATE, {
                percent: a
            }));
            var c = d.formatTime(d.ytb.getDuration()),
                e = d.formatTime(d.ytb.getCurrentTime());
            d.dispatchEvent(b.UPDATE_TIME, {
                curTime: e,
                totalTime: c,
                seconds: parseInt(d.ytb.getCurrentTime())
            })
        }, this.startToPreload = function() {
            clearInterval(d.preloadVideoId_int), d.updatePreloadId_int = setInterval(d.updateProgress, 500)
        }, this.stopToPreload = function() {
            clearInterval(d.updatePreloadId_int)
        }, this.updateProgress = function() {
            if (!d.ytb) return void stopToPreload();
            var c = d.ytb.getVideoLoadedFraction();
            d.dispatchEvent(b.LOAD_PROGRESS, {
                percent: c
            })
        }, this.stop = function() {
            d.isStopped_bl || (logger && logger.log("# YTB stop #" + a.instanceName_str), d.isPlaying_bl = !1, d.isStopped_bl = !0, d.isCued_bl = !1, d.allowScrubing_bl = !1, d.isSafeToBeControlled_bl = !1, d.isQualityArrayDisapatched_bl = !1, d.isPausedInEvent_bl = !0, d.stopToUpdate(), d.stopToPreload(), d.stopVideo(), d.dispatchEvent(b.STOP), d.dispatchEvent(b.LOAD_PROGRESS, {
                percent: 0
            }), d.dispatchEvent(b.UPDATE_TIME, {
                curTime: "00:00",
                totalTime: "00:00"
            }))
        }, this.destroyYoutube = function() {
            d.videoHolder_do && (d.videoHolder_do.screen.removeAttribute("id", a.instanceName_str + "youtube"), d.videoHolder_do.destroy(), d.videoHolder_do = null), d.ytb && d.ytb.destroy(), d.ytb = null
        }, this.stopVideo = function() {
            d.isMobile_bl || d.ytb.cueVideoById(d.sourcePath_str)
        }, this.startToScrub = function() {
            d.isSafeToBeControlled_bl && (d.allowScrubing_bl = !0)
        }, this.stopToScrub = function() {
            d.isSafeToBeControlled_bl && (d.allowScrubing_bl = !1)
        }, this.scrub = function(a) {
            d.isSafeToBeControlled_bl && d.ytb.seekTo(a * d.ytb.getDuration())
        }, this.setVolume = function(a) {
            a && (d.volume = a), d.ytb && d.ytb.setVolume(100 * a)
        }, this.setQuality = function(a) {
            d.lastQuality_str = a, d.ytb.setPlaybackQuality(a)
        }, this.formatTime = function(a) {
            var b = Math.floor(a / 3600),
                c = a % 3600,
                e = Math.floor(c / 60),
                f = c % 60,
                g = Math.ceil(f);
            return e = e >= 10 ? e : "0" + e, g = g >= 10 ? g : "0" + g, isNaN(g) ? "00:00" : d.hasHours_bl ? b + ":" + e + ":" + g : e + ":" + g
        }, this.init()
    };
    b.setPrototype = function() {
        b.prototype = new FWDUVPDisplayObject("div")
    }, b.READY = "ready", b.ERROR = "error", b.UPDATE = "update", b.UPDATE_TIME = "updateTime", b.SAFE_TO_SCRUBB = "safeToControll", b.LOAD_PROGRESS = "loadProgress", b.PLAY = "play", b.PAUSE = "pause", b.STOP = "stop", b.PLAY_COMPLETE = "playComplete", b.CUED = "cued", b.QUALITY_CHANGE = "qualityChange", a.FWDUVPYoutubeScreen = b
}(window),
function() {
    var a = function(b, c, d, e) {
        var f = this;
        a.prototype;
        this.text_do = null, this.hd_do = null, this.dumy_do = null, this.label_str = b, this.normalColor_str = c, this.selectedColor_str = d, this.hdPath_str = e, this.totalWidth = 0, this.totalHeight = 23, this.hdWidth = 7, this.hdHeight = 5, this.hasHd_bl = !1, this.isMobile_bl = FWDUVPUtils.isMobile, this.isDisabled_bl = !1, this.init = function() {
            "highres" != f.label_str && "hd1080" != f.label_str && "hd720" != f.label_str || (f.hasHd_bl = !0), f.setBackfaceVisibility(), f.setupMainContainers(), f.setHeight(f.totalHeight)
        }, this.setupMainContainers = function() {
            if (f.text_do = new FWDUVPDisplayObject("div"), f.text_do.setBackfaceVisibility(), f.text_do.hasTransform3d_bl = !1, f.text_do.hasTransform2d_bl = !1, f.text_do.getStyle.whiteSpace = "nowrap", f.text_do.getStyle().fontFamily = "Arial", f.text_do.getStyle().fontSize = "12px", f.text_do.getStyle().color = f.normalColor_str, f.text_do.getStyle().fontSmoothing = "antialiased", f.text_do.getStyle().webkitFontSmoothing = "antialiased", f.text_do.getStyle().textRendering = "optimizeLegibility", f.text_do.setInnerHTML(f.label_str), f.addChild(f.text_do), f.hasHd_bl) {
                var a = new Image;
                a.src = f.hdPath_str, f.hd_do = new FWDUVPDisplayObject("img"), f.hd_do.setScreen(a), f.hd_do.setWidth(f.hdWidth), f.hd_do.setHeight(f.hdHeight), f.addChild(f.hd_do)
            }
            f.dumy_do = new FWDUVPDisplayObject("div"), FWDUVPUtils.isIE && (f.dumy_do.setBkColor("#FF0000"), f.dumy_do.setAlpha(1e-4)), f.dumy_do.setButtonMode(!0), f.dumy_do.setHeight(f.totalHeight), f.addChild(f.dumy_do), f.isMobile_bl ? f.hasPointerEvent_bl ? (f.dumy_do.screen.addEventListener("pointerup", f.onMouseUp), f.dumy_do.screen.addEventListener("pointerover", f.onMouseOver), f.dumy_do.screen.addEventListener("pointerout", f.onMouseOut)) : f.dumy_do.screen.addEventListener("touchend", f.onMouseUp) : f.dumy_do.screen.addEventListener ? (f.dumy_do.screen.addEventListener("mouseover", f.onMouseOver), f.dumy_do.screen.addEventListener("mouseout", f.onMouseOut), f.dumy_do.screen.addEventListener("mouseup", f.onMouseUp)) : f.dumy_do.screen.attachEvent && (f.dumy_do.screen.attachEvent("onmouseover", f.onMouseOver), f.dumy_do.screen.attachEvent("onmouseout", f.onMouseOut), f.dumy_do.screen.attachEvent("onmouseup", f.onMouseUp))
        }, this.onMouseOver = function(b) {
            f.isDisabled_bl || (f.setSelectedState(!0), f.dispatchEvent(a.MOUSE_OVER, {
                e: b
            }))
        }, this.onMouseOut = function(b) {
            f.isDisabled_bl || (f.seNormalState(!0), f.dispatchEvent(a.MOUSE_OUT, {
                e: b
            }))
        }, this.onMouseUp = function(b) {
            f.isDisabled_bl || 2 == b.button || (b.preventDefault && b.preventDefault(), f.dispatchEvent(a.CLICK, {
                e: b
            }))
        }, this.setFinalSize = function() {
            if (0 == f.text_do.x) {
                var a = f.text_do.screen.getBoundingClientRect().width;
                a = a < 4 && void 0 != a ? parseInt(100 * a) + 34 : f.text_do.screen.offsetWidth + 34;
                var b = f.text_do.getHeight();
                f.text_do.setX(18), f.text_do.setY(parseInt((f.totalHeight - b) / 2)), f.hd_do && (f.hd_do.setX(a - 12), f.hd_do.setY(f.text_do.y + 1)), f.dumy_do.setWidth(a), f.setWidth(a)
            }
        }, this.setSelectedState = function(a) {
            FWDAnimation.killTweensOf(f.text_do), a ? FWDAnimation.to(f.text_do.screen, .5, {
                css: {
                    color: f.selectedColor_str
                },
                ease: Expo.easeOut
            }) : f.text_do.getStyle().color = f.selectedColor_str
        }, this.seNormalState = function(a) {
            FWDAnimation.killTweensOf(f.text_do), a ? FWDAnimation.to(f.text_do.screen, .5, {
                css: {
                    color: f.normalColor_str
                },
                ease: Expo.easeOut
            }) : f.text_do.getStyle().color = f.normalColor_str
        }, this.disable = function() {
            f.isDisabled_bl = !0, FWDAnimation.killTweensOf(f.text_do), f.setSelectedState(!0), f.dumy_do.setButtonMode(!1)
        }, this.enable = function() {
            f.isDisabled_bl = !1, FWDAnimation.killTweensOf(f.text_do), f.seNormalState(!0), f.dumy_do.setButtonMode(!0)
        }, f.init()
    };
    a.setPrototype = function() {
        a.prototype = new FWDUVPDisplayObject("div")
    }, a.MOUSE_OVER = "onMouseOver", a.MOUSE_OUT = "onMouseOut", a.CLICK = "onClick", a.prototype = null, window.FWDUVPYTBQButton = a
}(window);