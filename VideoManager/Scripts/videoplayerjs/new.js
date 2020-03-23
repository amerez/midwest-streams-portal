/* Thumb */
(function (window){
	
	var FWDConsole = function(){
		
		var self  = this;
		var prototype = FWDConsole.prototype;
		
		this.main_do = null;
	
		this.init = function(){
			this.setupScreen();
			window.onerror = this.showError;
			this.screen.style.zIndex = 99999999999999999999;
			setTimeout(this.addConsoleToDom, 100);
			setInterval(this.position, 100);
		};
		
		this.position = function(){
			var scrollOffsets = FWDUVPUtils.getScrollOffsets();
			self.setX(scrollOffsets.x + 100);
			self.setY(scrollOffsets.y);
		};
		
		this.addConsoleToDom  = function(){
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}else{
				document.documentElement.appendChild(self.screen);
			}
		};
		
		/* setup screens */
		this.setupScreen = function(){
			this.main_do = new FWDUVPDisplayObject("div", "absolute");
			this.main_do.setOverflow("auto");
			this.main_do.setWidth(300);
			this.main_do.setHeight(200);
			this.setWidth(300);
			this.setHeight(200);
			this.main_do.setBkColor("#FFFFFF");
			this.addChild(this.main_do);
		};
		
		this.showError = function(message, url, linenumber) {
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + message + " on line " + linenumber + " for " + url;
			self.main_do.setInnerHTML(currentInnerHTML);
			self.main_do.screen.scrollTop = self.main_do.screen.scrollHeight;
		};
		
		this.log = function(message){
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + message;
			self.main_do.setInnerHTML(currentInnerHTML);  
			self.main_do.getScreen().scrollTop = 10000;
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDConsole.setPrototype = function(){
    	FWDConsole.prototype = new FWDUVPDisplayObject("div", "absolute");
    };
    
    FWDConsole.prototype = null;
	window.FWDConsole = FWDConsole;
}(window));(function (window) {

        // This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
        // iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
        // This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
		// This code is free to use by anyone (MIT, blabla).
		// Author: rkorving@wizcorp.jp
		
		var platform = navigator.platform;
		var isIpadOrIphone = false;
		if(platform == 'iPad' ||  platform == 'iPhone') isIpadOrIphone = true;
		if(!isIpadOrIphone) return;
		
		var userAgent = navigator.userAgent;
		var isIosVersion6 = false;
		if(userAgent.indexOf("6") != -1) isIosVersion6 = true;
		if(!isIosVersion6) return;
		
	
        var timeouts = {};
        var intervals = {};
        var orgSetTimeout = window.setTimeout;
        var orgSetInterval = window.setInterval;
        var orgClearTimeout = window.clearTimeout;
        var orgClearInterval = window.clearInterval;


        function createTimer(set, map, args) {
                var id, cb = args[0], repeat = (set === orgSetInterval);

                function callback() {
                        if (cb) {
                                cb.apply(window, arguments);

                                if (!repeat) {
                                        delete map[id];
                                        cb = null;
                                }
                        }
                }

                args[0] = callback;

                id = set.apply(window, args);

                map[id] = { args: args, created: Date.now(), cb: cb, id: id };

                return id;
        }


        function resetTimer(set, clear, map, virtualId, correctInterval) {
                var timer = map[virtualId];

                if (!timer) {
                        return;
                }

                var repeat = (set === orgSetInterval);

                // cleanup

                clear(timer.id);

                // reduce the interval (arg 1 in the args array)

                if (!repeat) {
                        var interval = timer.args[1];

                        var reduction = Date.now() - timer.created;
                        if (reduction < 0) {
                                reduction = 0;
                        }

                        interval -= reduction;
                        if (interval < 0) {
                                interval = 0;
                        }

                        timer.args[1] = interval;
                }

                // recreate

                function callback() {
                        if (timer.cb) {
                                timer.cb.apply(window, arguments);
                                if (!repeat) {
                                        delete map[virtualId];
                                        timer.cb = null;
                                }
                        }
                }

                timer.args[0] = callback;
                timer.created = Date.now();
                timer.id = set.apply(window, timer.args);
        }


        window.setTimeout = function () {
                return createTimer(orgSetTimeout, timeouts, arguments);
        };


        window.setInterval = function () {
                return createTimer(orgSetInterval, intervals, arguments);
        };

        window.clearTimeout = function (id) {
                var timer = timeouts[id];

                if (timer) {
                        delete timeouts[id];
                        orgClearTimeout(timer.id);
                }
        };

        window.clearInterval = function (id) {
                var timer = intervals[id];

                if (timer) {
                        delete intervals[id];
                        orgClearInterval(timer.id);
                }
        };

        window.addEventListener('scroll', function () {
                // recreate the timers using adjusted intervals
                // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
                var virtualId;
             
                for (virtualId in timeouts) {
                        resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
                }

                for (virtualId in intervals) {
                        resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
                }
        });

}(window));﻿/* FWDUVPAdsButton */
(function (window){
var FWDUVPAdsButton = function(
			icon_img,
			iconOverPath_str,
			text_str,
			position_str,
			borderColorN_str,
			borderColorS_str,
			adsBackgroundPath_str,
			textNormalColor,
			textSelectedColor
		){
		
		var self = this;
		var prototype = FWDUVPAdsButton.prototype;
		
		this.main_do = null;
		this.icon_do = null;
		this.iconS_do = null;
		this.bk_do = null;
		this.text_do = null;
		this.border_do = null;
		this.thumbHolder_do = null;
		this.icon_img = icon_img;
		
		this.borderNColor_str = borderColorN_str;
		this.borderSColor_str = borderColorS_str;
		this.adsBackgroundPath_str = adsBackgroundPath_str;
		this.position_str = position_str;
		this.textNormalColor_str = textNormalColor;
		this.textSelectedColor_str = textSelectedColor;
		this.text_str = text_str;
		this.iconOverPath_str = iconOverPath_str;
		this.totalWidth = 215;
		this.totalHeight = 64;
		this.fontSize = 12;
		
		this.hasThumbanil_bl = false;
		this.isShowed_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
			self.hide(false, true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
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
			this.text_do.getStyle().fontSize= "22px";
			//this.text_do.getStyle().lineHeight = "18px";
			this.text_do.getStyle().whiteSpace= "nowrap";
			//this.text_do.getStyle().textAlign = "center";
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
			if(this.position_str == "left"){
				this.border_do.setX(-1);
				this.border_do.setWidth(this.totalWidth - 1);
				this.border_do.setHeight(this.totalHeight -2);
			}else{
				this.border_do.setWidth(this.totalWidth);
				this.border_do.setHeight(this.totalHeight -2);
			}
			this.setWidth(this.totalWidth);
			this.setHeight(this.totalHeight);
			
			
				this.icon_do = new FWDUVPDisplayObject("img");
				if(this.icon_img){
					this.icon_do.setScreen(this.icon_img);
					this.icon_do.setWidth(this.icon_img.width);
					this.icon_do.setHeight(this.icon_img.height);
				}
				
				var iconS_img =  new Image();
				iconS_img.src = this.iconOverPath_str;
				this.iconS_do = new FWDUVPDisplayObject("img");
				this.iconS_do.setScreen(iconS_img);
				this.iconS_do.setWidth(this.icon_do.w);
				this.iconS_do.setHeight(this.icon_do.h);
				this.iconS_do.setAlpha(0);
				
			
				this.main_do.addChild(this.bk_do);
				this.main_do.addChild(this.text_do);
				this.main_do.addChild(this.thumbHolder_do);
				this.main_do.addChild(this.icon_do);
				this.main_do.addChild(this.iconS_do);
				this.main_do.addChild(this.border_do);
			
			
			if(FWDUVPUtils.isIEAndLessThen9){
				this.dumy_do = new FWDUVPDisplayObject("div");
				this.dumy_do.setBkColor("#00FF00");
				this.dumy_do.setAlpha(.0001);
				this.dumy_do.setWidth(this.totalWidth);
				this.dumy_do.setHeight(this.totalHeight);
				this.dumy_do.setButtonMode(true);
				this.main_do.addChild(this.dumy_do);
			}
			
			this.addChild(this.main_do);
			this.updateText(self.text_str);
			
			if(FWDUVPUtils.isIEAndLessThen9){
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.dumy_do.screen.addEventListener("MSPointerUp", self.onMouseUp);
						self.dumy_do.screen.addEventListener("MSPointerOver", self.onMouseOver);
						self.dumy_do.screen.addEventListener("MSPointerOut", self.onMouseOut);
					}else{
						self.dumy_do.screen.addEventListener("touchend", self.onMouseUp);
					}
				}else if(self.dumy_do.screen.addEventListener){	
					self.dumy_do.screen.addEventListener("mouseover", self.onMouseOver);
					self.dumy_do.screen.addEventListener("mouseout", self.onMouseOut);
					self.dumy_do.screen.addEventListener("mouseup", self.onMouseUp);
				}else if(self.dumy_do.screen.attachEvent){
					self.dumy_do.screen.attachEvent("onmouseover", self.onMouseOver);
					self.dumy_do.screen.attachEvent("onmouseout", self.onMouseOut);
					self.dumy_do.screen.attachEvent("onmouseup", self.onMouseUp);
				}
			}else{
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.border_do.screen.addEventListener("MSPointerUp", self.onMouseUp);
						self.border_do.screen.addEventListener("MSPointerOver", self.onMouseOver);
						self.border_do.screen.addEventListener("MSPointerOut", self.onMouseOut);
					}else{
						self.border_do.screen.addEventListener("touchend", self.onMouseUp);
					}
				}else if(self.border_do.screen.addEventListener){	
					self.border_do.screen.addEventListener("mouseover", self.onMouseOver);
					self.border_do.screen.addEventListener("mouseout", self.onMouseOut);
					self.border_do.screen.addEventListener("mouseup", self.onMouseUp);
				}else if(self.border_do.screen.attachEvent){
					self.border_do.screen.attachEvent("onmouseover", self.onMouseOver);
					self.border_do.screen.attachEvent("onmouseout", self.onMouseOut);
					self.border_do.screen.attachEvent("onmouseup", self.onMouseUp);
				}
			}
			
		};
		
		self.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == "mouse"){
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == "mouse"){
				self.setNormalState();
			}
		};
		
		self.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(e.button == 2 || !self.isShowed_bl) return;
			self.dispatchEvent(FWDUVPAdsButton.MOUSE_UP);
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		this.updateText = function(text){
			var totalWidth;
			this.text_do.setInnerHTML(text);
			setTimeout(function(){
				totalWidth = self.text_do.getWidth() + 8 + self.iconS_do.w;
				self.text_do.setX(parseInt(self.totalWidth - totalWidth)/2);
				self.text_do.setY(parseInt((self.totalHeight - self.text_do.getHeight())/2) + 2);
				self.icon_do.setX(self.text_do.x + totalWidth - self.iconS_do.w);
				self.icon_do.setY(parseInt((self.totalHeight - self.iconS_do.h)/2) + 2);
				self.iconS_do.setX(self.text_do.x + totalWidth - self.iconS_do.w);
				self.iconS_do.setY(parseInt((self.totalHeight - self.iconS_do.h)/2) + 2);
			}, 50);
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			FWDUVPTweenMax.to(self.iconS_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDUVPTweenMax.to(self.text_do.screen, .5, {css:{color:self.textNormalColor_str}, ease:Expo.easeOut});	
			FWDUVPTweenMax.to(self.border_do.screen, .5, {css:{borderColor:self.borderNColor_str}, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			FWDUVPTweenMax.to(self.iconS_do, .5, {alpha:1, ease:Expo.easeOut});	
			FWDUVPTweenMax.to(self.text_do.screen, .5, {css:{color:self.textSelectedColor_str}, ease:Expo.easeOut});	
			FWDUVPTweenMax.to(self.border_do.screen, .5, {css:{borderColor:self.borderSColor_str}, ease:Expo.easeOut});	
		};
	
		this.show = function(animate){
			if(this.isShowed_bl) return;
			this.isShowed_bl = true;
			this.setVisible(true);
			
			FWDUVPTweenMax.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDUVPTweenMax.to(this.main_do, .8, {x:0, delay:.8, ease:Expo.easeInOut});
				}else{
					FWDUVPTweenMax.to(this.main_do, .8, {x:-this.totalWidth + 1, delay:.8,  ease:Expo.easeInOut});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(0);
				}else{
					this.main_do.setX(-this.totalWidth);
				}
			}
		};	
			
		this.hide = function(animate, overwrite){
			if(!this.isShowed_bl && !overwrite) return;
			this.isShowed_bl = false;
			this.hasThumbanil_bl = false;
			
			FWDUVPTweenMax.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDUVPTweenMax.to(this.main_do, .8, {x:-this.totalWidth, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}else{
					FWDUVPTweenMax.to(this.main_do, .8, {x:0, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(-this.totalWidth);
				}else{
					this.main_do.setX(0);
				} 
				this.hideCompleteHandler();
			}
		};
		
		this.hideCompleteHandler = function(){
			if(self.smallImage_img){
				self.smallImage_img.onload = null;
				self.smallImage_img.src = "";
				FWDUVPTweenMax.killTweensOf(self.icon_do);
			}
			if(self.main_do.alpha != 1) self.main_do.setAlpha(1);
			self.thumbHolder_do.setVisible(false);
			self.setVisible(false);
		};
		
		//###########################################//
		/* hide / show  opacity */
		//###########################################//
		this.hideWithOpacity = function(){
			if(!FWDUVPUtils.isIEAndLessThen9){
				FWDUVPTweenMax.to(this.main_do, .8, {alpha:.5});
			}
		};
		
		this.showWithOpacity = function(){
			if(!FWDUVPUtils.isIEAndLessThen9){
				FWDUVPTweenMax.to(this.main_do, .8, {alpha:1});
			}
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPAdsButton.setPrototype = function(){
		FWDUVPAdsButton.prototype = null;
		FWDUVPAdsButton.prototype = new FWDUVPTransformDisplayObject("div");
	};
	
	FWDUVPAdsButton.CLICK = "onClick";
	FWDUVPAdsButton.MOUSE_OVER = "onMouseOver";
	FWDUVPAdsButton.SHOW_TOOLTIP = "showTooltip";
	FWDUVPAdsButton.MOUSE_OUT = "onMouseOut";
	FWDUVPAdsButton.MOUSE_UP = "onMouseDown";
	
	FWDUVPAdsButton.prototype = null;
	window.FWDUVPAdsButton = FWDUVPAdsButton;
}(window));﻿/* FWDUVPAdsStart */
(function (window){
var FWDUVPAdsStart = function(
			position_str,
			borderColorN_str,
			borderColorS_str,
			adsBackgroundPath_str,
			timeColor_str
		){
		
		var self = this;
		var prototype = FWDUVPAdsStart.prototype;
		
		this.main_do = null;
		this.bk_do = null;
		this.text_do = null;
		this.border_do = null;
		this.thumbHolder_do = null;
		
		this.borderNColor_str = borderColorN_str;
		this.borderSColor_str = borderColorS_str;
		this.adsBackgroundPath_str = adsBackgroundPath_str;
		this.position_str = position_str;
		this.timeColor_str = timeColor_str;
		
		this.totalWidth = 215;
		this.totalHeight = 64;
		this.fontSize = 12;
		
		this.hasThumbanil_bl = false;
		this.isShowed_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
		
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
			self.hide(false, true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
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
			this.text_do.getStyle().fontSize= "12px";
			this.text_do.getStyle().lineHeight = "18px";
			//this.text_do.getStyle().whiteSpace= "nowrap";
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
			if(this.position_str == "left"){
				this.border_do.setX(-1);
				this.border_do.setWidth(this.totalWidth - 1);
				this.border_do.setHeight(this.totalHeight -2);
			}else{
				this.border_do.setWidth(this.totalWidth);
				this.border_do.setHeight(this.totalHeight -2);
			}
			this.setWidth(this.totalWidth);
			this.setHeight(this.totalHeight);
		
			this.main_do.addChild(this.bk_do);
			this.main_do.addChild(this.text_do);
			this.main_do.addChild(this.thumbHolder_do);
			this.main_do.addChild(this.border_do);
			
			this.addChild(this.main_do);
		};
		
		//#####################################//
		/* load thumbnail */
		//#####################################//
		this.loadThumbnail = function(path){
			this.hasThumbanil_bl = true;
			
			if(this.smallImage_img){
				this.smallImage_img.removeAttribute("width");
				this.smallImage_img.removeAttribute("height");
				this.smallImage_img.onload = null;
				this.smallImage_img.src = "";
				try{
					if(!FWDUVPUtils.isIE) this.thumbHolder_do.removeChild(self.thumbnail_do);
				}catch(e){}
			}
			
			if(!this.thumbnail_do){
				this.thumbnail_do = new FWDUVPDisplayObject("img");
				this.smallImage_img = new Image();
			}
			
			this.thumbHolder_do.setVisible(true);
			this.smallImage_img.onload = this.onSmallImageLoad;
			this.smallImage_img.src = path;
		};
		
		this.onSmallImageLoad = function(){
			
			self.smallImageOriginalW = self.smallImage_img.width;
			self.smallImageOriginalH = self.smallImage_img.height;
			self.thumbnail_do.setScreen(self.smallImage_img);
			self.thumbHolder_do.addChild(self.thumbnail_do);
			
			var scaleX = self.thumbHolder_do.w/self.smallImageOriginalW;
			var scaleY = self.thumbHolder_do.h/self.smallImageOriginalH;
			var totalScale = 0;
			
			if(scaleX >= scaleY){
				totalScale = scaleX;
			}else if(scaleX <= scaleY){
				totalScale = scaleY;
			}
			
			self.thumbnail_do.setWidth(Math.round(self.smallImageOriginalW * totalScale));
			self.thumbnail_do.setHeight(Math.round(self.smallImageOriginalH * totalScale));
			self.thumbnail_do.setX(Math.round((self.thumbHolder_do.w - self.thumbnail_do.w)/2));
			self.thumbnail_do.setY(Math.round((self.thumbHolder_do.h - self.thumbnail_do.h)/2));
			self.thumbnail_do.setAlpha(0);
			FWDUVPTweenMax.to(self.thumbnail_do, .8, {alpha:1});
			self.updateText();
		};
		
		//#####################################//
		/* Update text */
		//#####################################//
		this.updateText = function(text){
			if(text) this.text_do.setInnerHTML(text);
			
			if(this.hasThumbanil_bl){
				this.text_do.setX(16);
				this.text_do.setWidth(this.totalWidth - this.totalHeight - 26);
			}else{
				this.text_do.setX(8);
				this.text_do.setWidth(this.totalWidth - 16);
			}
			
			this.text_do.setY(parseInt((self.totalHeight - self.text_do.getHeight())/2));
		};
	
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(animate){
			if(this.isShowed_bl) return;
			
			this.isShowed_bl = true;
			this.setVisible(true);
			
			FWDUVPTweenMax.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDUVPTweenMax.to(this.main_do, .8, {x:0, delay:.2, ease:Expo.easeInOut});
				}else{
					FWDUVPTweenMax.to(this.main_do, .8, {x:-this.totalWidth + 1, delay:.2,  ease:Expo.easeInOut});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(0);
				}else{
					this.main_do.setX(-this.totalWidth);
				}
			}
		};	
			
		this.hide = function(animate, overwrite){
			if(!this.isShowed_bl && !overwrite) return;
			
			this.isShowed_bl = false;
			this.hasThumbanil_bl = false;
			
			FWDUVPTweenMax.killTweensOf(this.main_do);
			if(animate && !self.isMobile_bl){
				if(this.position_str == "left"){
					FWDUVPTweenMax.to(this.main_do, .8, {x:-this.totalWidth, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}else{
					FWDUVPTweenMax.to(this.main_do, .8, {x:0, ease:Expo.easeInOut, onComplete:this.hideCompleteHandler});
				}
			}else{
				if(this.position_str == "left"){
					this.main_do.setX(-this.totalWidth);
				}else{
					this.main_do.setX(0);
				} 
				this.hideCompleteHandler();
			}
		};
		
		this.hideCompleteHandler = function(){
			if(self.smallImage_img){
				self.smallImage_img.onload = null;
				self.smallImage_img.src = "";
				FWDUVPTweenMax.killTweensOf(self.thumbnail_do);
			}
			
			if(self.main_do.alpha != 1) self.main_do.setAlpha(1);
			self.thumbHolder_do.setVisible(false);
			self.setVisible(false);
		};
		
		//###########################################//
		/* hide / show  opacity */
		//###########################################//
		this.hideWithOpacity = function(){
			if(!FWDUVPUtils.isIEAndLessThen9){
				FWDUVPTweenMax.to(this.main_do, .8, {alpha:.5});
			}
		};
		
		this.showWithOpacity = function(){
			if(!FWDUVPUtils.isIEAndLessThen9){
				FWDUVPTweenMax.to(this.main_do, .8, {alpha:1});
			}
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPAdsStart.setPrototype = function(){
		FWDUVPAdsStart.prototype = null;
		FWDUVPAdsStart.prototype = new FWDUVPTransformDisplayObject("div");
	};
	
	FWDUVPAdsStart.CLICK = "onClick";
	FWDUVPAdsStart.MOUSE_OVER = "onMouseOver";
	FWDUVPAdsStart.SHOW_TOOLTIP = "showTooltip";
	FWDUVPAdsStart.MOUSE_OUT = "onMouseOut";
	FWDUVPAdsStart.MOUSE_UP = "onMouseDown";
	
	FWDUVPAdsStart.prototype = null;
	window.FWDUVPAdsStart = FWDUVPAdsStart;
}(window));/* FWDUVPCategories */
(function(){
var FWDUVPCategories = function(data, parent){
		
		var self = this;
		var prototype = FWDUVPCategories.prototype;
		
		this.image_img;
		this.catThumbBk_img = data.catThumbBk_img;
		this.catNextN_img = data.catNextN_img;
		this.catPrevN_img = data.catPrevN_img;
		this.catCloseN_img = data.catCloseN_img;
	
		this.mainHolder_do = null;
		this.closeButton_do = null;
		this.nextButton_do = null;
		this.prevButton_do = null;
		
		this.thumbs_ar = [];
		this.categories_ar = data.cats_ar;
		
		this.catBkPath_str = data.catBkPath_str;
		
		this.id = 0;
		this.mouseX = 0;
		this.mouseY = 0;
		this.dif = 0;
		this.tempId = self.id;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.thumbW = 0;
		this.thumbH = 0;
		this.buttonsMargins = data.buttonsMargins;
		this.thumbnailMaxWidth = data.thumbnailMaxWidth;
		this.thumbnailMaxHeight = data.thumbnailMaxHeight;
		this.spacerH = data.horizontalSpaceBetweenThumbnails;
		this.spacerV = data.verticalSpaceBetweenThumbnails;
		this.dl;
		this.howManyThumbsToDisplayH = 0;
		this.howManyThumbsToDisplayV = 0;
		this.categoriesOffsetTotalWidth = self.catNextN_img.width * 2 + 30;
		this.categoriesOffsetTotalHeight = self.catNextN_img.height + 30;
		this.totalThumbnails = self.categories_ar.length;
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

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			if(self.isMobile_bl && self.hasPointerEvent_bl) self.getStyle().msTouchAction = "none";
			self.getStyle().zIndex = 16777271;
			self.getStyle().msTouchAction = "none";
			self.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			self.getStyle().width = "100%";
			
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			self.mainHolder_do.getStyle().background = "url('" + self.catBkPath_str + "')";
			self.mainHolder_do.setY(- 3000);
			self.addChild(self.mainHolder_do);
			self.setupButtons();
			self.setupDisable();
			if(self.isMobile_bl){
				self.setupMobileMove();
				if(FWDUVPUtils.isChrome){
					if(FWDUVPUtils.isIEAndLessThen9){
						document.getElementsByTagName("body")[0].appendChild(self.screen);
					}else{
						document.documentElement.appendChild(self.screen);
					}
				}
			}
			
			if(!self.isMobile_bl || (self.isMobile_bl && self.hasPointerEvent_bl)) self.setSelectable(false);
			
			if(window.addEventListener){
				self.screen.addEventListener ("mousewheel", self.mouseWheelDumyHandler);
				self.screen.addEventListener('DOMMouseScroll', self.mouseWheelDumyHandler);
			}else if(document.attachEvent){
				self.screen.attachEvent ("onmousewheel", self.mouseWheelDumyHandler);
			}
			
		};
		
		this.mouseWheelDumyHandler = function(e){	
			var thumb;
			if(FWDUVPTweenMax.isTweening(self.mainHolder_do)){
				if(e.preventDefault){
					e.preventDefault();
				}
				return false;
			}
			
			for (var i = 0; i<self.totalThumbnails; i++) {
				thumb = self.thumbs_ar[i];
				if(FWDUVPTweenMax.isTweening(thumb)){
					if(e.preventDefault){
						e.preventDefault();
					}
					return false;
				}
			}
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			if(FWDUVPUtils.isOpera) dir *= -1;
			
			if(dir > 0){
				self.nextButtonOnMouseUpHandler();
			}else if(dir < 0){
				if(self.leftId <= 0) return;
				self.prevButtonOnMouseUpHandler();
			}
		
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		//###########################################//
		// Resize and position ...
		//###########################################//
		self.resizeAndPosition = function(overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			
			var scrollOffsets = FWDUVPUtils.getScrollOffsets();
			var viewportSize = FWDUVPUtils.getViewportSize();
			
			//if(self.stageWidth == viewportSize.w && self.stageHeight == viewportSize.h && !overwrite) return;
			self.stageWidth = viewportSize.w;
			self.stageHeight = viewportSize.h;
			
			FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
			self.mainHolder_do.setX(0);
			//self.mainHolder_do.setY(0);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
			
			self.setHeight(self.stageHeight);
			if(self.isMobile_bl || parent.isEmbedded_bl) self.setWidth(self.stageWidth);
			self.positionButtons();
			self.tempId = self.id;
			self.resizeAndPositionThumbnails();
			self.disableEnableNextAndPrevButtons();
		};
		
		//##########################################//
		/* resize and scroll handler */
		//##########################################//
		self.onScrollHandler = function(){
			var scrollOffsets = FWDUVPUtils.getScrollOffsets();
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y);
		};
		
		//###############################//
		/* setup disable */
		//##############################//
		this.setupDisable = function(){
			self.disable_do = new FWDUVPDisplayObject("div");
			if(FWDUVPUtils.isIE){
				self.disable_do.setBkColor("#FFFFFF");
				self.disable_do.setAlpha(0.01);
			}
			self.addChild(self.disable_do);
		};
		
		this.showDisable = function(){
			if(self.disable_do.w == self.stageWidth) return;
			self.disable_do.setWidth(self.stageWidth);
			self.disable_do.setHeight(self.stageHeight);
		};
		
		this.hideDisable = function(){
			if(self.disable_do.w == 0) return;
			self.disable_do.setWidth(0);
			self.disable_do.setHeight(0);
		};
		
		//############################################//
		/* setup buttons */
		//############################################//
		this.setupButtons = function(){
			FWDUVPSimpleButton.setPrototype();
			self.closeButton_do = new FWDUVPSimpleButton(self.catCloseN_img, data.catCloseSPath_str);
			self.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			FWDUVPSimpleButton.setPrototype();
			self.nextButton_do = new FWDUVPSimpleButton(self.catNextN_img, data.catNextSPath_str, undefined, true);
			self.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.nextButtonOnMouseUpHandler);
			
			FWDUVPSimpleButton.setPrototype();
			self.prevButton_do = new FWDUVPSimpleButton(self.catPrevN_img, data.catPrevSPath_str, undefined, true);
			self.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.prevButtonOnMouseUpHandler);
		};
		
		this.closeButtonOnMouseUpHandler = function(){
			 self.hide();
		};
		
		this.nextButtonOnMouseUpHandler = function(){
			var availableThumbsPerSection = (self.howManyThumbsToDisplayH * self.howManyThumbsToDisplayV);
			self.tempId += availableThumbsPerSection;
			if(self.tempId > self.totalThumbnails - 1) self.tempId = self.totalThumbnails - 1;
			var curSet = Math.floor(self.tempId / availableThumbsPerSection);
			self.tempId = curSet * availableThumbsPerSection;
			self.resizeAndPositionThumbnails(true, "next");
			self.disableEnableNextAndPrevButtons(false, true);
		};
		
		this.prevButtonOnMouseUpHandler = function(){
			var availableThumbsPerSection = (self.howManyThumbsToDisplayH * self.howManyThumbsToDisplayV);
			self.tempId -= availableThumbsPerSection;
			if(self.tempId < 0) self.tempId = 0;
			var curSet = Math.floor(self.tempId / availableThumbsPerSection);
			self.tempId = curSet * availableThumbsPerSection;
			self.resizeAndPositionThumbnails(true, "prev");
			self.disableEnableNextAndPrevButtons(true, false);
		};
		
		this.positionButtons = function(){
			self.closeButton_do.setX(self.stageWidth - self.closeButton_do.w - self.buttonsMargins);
			self.closeButton_do.setY(self.buttonsMargins);
			self.nextButton_do.setX(self.stageWidth - self.nextButton_do.w - self.buttonsMargins);
			self.nextButton_do.setY(parseInt((self.stageHeight - self.nextButton_do.h)/2));
			self.prevButton_do.setX(self.buttonsMargins);
			self.prevButton_do.setY(parseInt((self.stageHeight - self.prevButton_do.h)/2));
		};
		
		this.disableEnableNextAndPrevButtons = function(hitTestLeft, hitTestRight){
			var availableThumbsPerSection = (self.howManyThumbsToDisplayH * self.howManyThumbsToDisplayV);
			var curSet = Math.floor(self.tempId / availableThumbsPerSection);
			var totalSets = Math.ceil(self.totalThumbnails / availableThumbsPerSection) - 1;
			var currentLeftColId = self.howManyThumbsToDisplayH * curSet;
			var maxId = totalSets * self.howManyThumbsToDisplayH;
		
			if(availableThumbsPerSection >= self.totalThumbnails){
				self.nextButton_do.disable();
				self.prevButton_do.disable();
				self.nextButton_do.setDisabledState();
				self.prevButton_do.setDisabledState();
			}else if(curSet == 0){
				self.nextButton_do.enable();
				self.prevButton_do.disable();
				self.nextButton_do.setEnabledState();
				self.prevButton_do.setDisabledState();
			}else if(curSet == totalSets){
				self.nextButton_do.disable();
				self.prevButton_do.enable();
				self.nextButton_do.setDisabledState();
				self.prevButton_do.setEnabledState();
			}else{
				self.nextButton_do.enable();
				self.prevButton_do.enable();
				self.nextButton_do.setEnabledState();
				self.prevButton_do.setEnabledState();
			}
			
			if(!hitTestLeft){
				self.prevButton_do.setNormalState();
			}
			
			if(!hitTestRight){
				self.nextButton_do.setNormalState();
			}
		};
		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		this.setupMobileMove = function(){	
			if(self.hasPointerEvent_bl){
				self.screen.addEventListener("MSPointerDown", self.mobileDownHandler);
			}else{
				self.screen.addEventListener("touchstart", self.mobileDownHandler);
			}
			//self.screen.addEventListener("mousedown", self.mobileDownHandler);
		};
		
		this.mobileDownHandler = function(e){
			if (e.touches) if(e.touches.length != 1) return;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			self.mouseX = viewportMouseCoordinates.screenX;;
			self.mouseY = viewportMouseCoordinates.screenY;
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerUp", self.mobileUpHandler);
				window.addEventListener("MSPointerMove", self.mobileMoveHandler);
			}else{
				window.addEventListener("touchend", self.mobileUpHandler);
				window.addEventListener("touchmove", self.mobileMoveHandler);
			}
			//window.addEventListener("mouseup", self.mobileUpHandler);
			//window.addEventListener("mousemove", self.mobileMoveHandler);
		};
		
		this.mobileMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if (e.touches) if(e.touches.length != 1) return;
			self.showDisable();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);
			self.dif = self.mouseX - viewportMouseCoordinates.screenX;
			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
		};
		
		this.mobileUpHandler = function(e){
			self.hideDisable();
			if(self.dif > 10){
				self.nextButtonOnMouseUpHandler();
			}else if(self.dif < -10){
				self.prevButtonOnMouseUpHandler();
			}
			self.dif = 0;
			
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerUp", self.mobileUpHandler, false);
				window.removeEventListener("MSPointerMove", self.mobileMoveHandler);
			}else{
				window.removeEventListener("touchend", self.mobileUpHandler);
				window.removeEventListener("touchmove", self.mobileMoveHandler);
			}
			//window.removeEventListener("mouseup", self.mobileUpHandler);
			//window.removeEventListener("mousemove", self.mobileMoveHandler);
		};
		
		//######################################//
		/* setup thumbnails */
		//######################################//
		this.setupThumbnails = function(){
			if(self.areThumbnailsCreated_bl) return;
			self.areThumbnailsCreated_bl = true;
			var thumb;
			for(var i=0; i<self.totalThumbnails; i++){
				FWDUVPCategoriesThumb.setPrototype();
				thumb = new FWDUVPCategoriesThumb(self,
						i,
						data.catThumbBkPath_str,
						data.catThumbBkTextPath_str,
						data.thumbnailSelectedType_str, 
						self.categories_ar[i].htmlContent);
				thumb.addListener(FWDUVPCategoriesThumb.MOUSE_UP, self.thumbnailOnMouseUpHandler);
				self.thumbs_ar[i] = thumb;
				self.mainHolder_do.addChild(thumb);
			}
			self.mainHolder_do.addChild(self.closeButton_do); 
			self.mainHolder_do.addChild(self.nextButton_do); 
			self.mainHolder_do.addChild(self.prevButton_do);
		};
		
		this.thumbnailOnMouseUpHandler = function(e){
			self.id = e.id;
			self.disableOrEnableThumbnails();
			self.hide();
		};
		
		//#############################################//
		/* set data for resize */
		//#############################################//
		this.resizeAndPositionThumbnails = function(animate, direction){
			if(!self.areThumbnailsCreated_bl) return;
			var thumb;
			var totalWidth;
			var curSet;
			var tempSet;
			var newX;
			var newY;
			var totalWidth;
			var totalHeight;
			var remainWidthSpace;
			var firsId;
			var lastId;
			var addToX;
			var currentLeftColId;
			var availableThumbsPerSection;
			
			this.remainWidthSpace = (this.stageWidth - totalWidth);
			
			var widthToResize = self.stageWidth - self.categoriesOffsetTotalWidth;
			var heightToResize = self.stageHeight - self.categoriesOffsetTotalHeight;
			
			self.howManyThumbsToDisplayH = Math.ceil((widthToResize - self.spacerH)/(self.thumbnailMaxWidth + self.spacerH));
			self.thumbW = Math.floor(((widthToResize - self.spacerH * (self.howManyThumbsToDisplayH - 1)))/self.howManyThumbsToDisplayH);
			if(self.thumbW > self.thumbnailMaxWidth){
				self.howManyThumbsToDisplayH += 1;
				self.thumbW = Math.floor(((widthToResize - self.spacerH * (self.howManyThumbsToDisplayH - 1)))/self.howManyThumbsToDisplayH);
			}
			
			self.thumbH = Math.floor((self.thumbW/self.thumbnailMaxWidth) * self.thumbnailMaxHeight);
			
			self.howManyThumbsToDisplayV = Math.floor(heightToResize/(self.thumbH + self.spacerV));
			if(self.howManyThumbsToDisplayV < 1) self.howManyThumbsToDisplayV = 1;
			
			totalWidth = (Math.min(self.howManyThumbsToDisplayH, self.totalThumbnails) * (self.thumbW + self.spacerH)) - self.spacerH;
			totalHeight = Math.min(Math.ceil(self.totalThumbnails/self.howManyThumbsToDisplayH), self.howManyThumbsToDisplayV) * (self.thumbH + self.spacerV) - self.spacerV;
			
			if(self.howManyThumbsToDisplayH > self.totalThumbnails){
				remainWidthSpace = 0;
			}else{
				remainWidthSpace = (widthToResize - totalWidth);
			}
			
			if(self.howManyThumbsToDisplayH > self.totalThumbnails) self.howManyThumbsToDisplayH = self.totalThumbnails;
			availableThumbsPerSection = (self.howManyThumbsToDisplayH * self.howManyThumbsToDisplayV);
		
			curSet = Math.floor(self.tempId / availableThumbsPerSection);
			currentLeftColId = self.howManyThumbsToDisplayH * curSet;
			
			firstId = curSet * availableThumbsPerSection;
			
			lastId = firstId + availableThumbsPerSection;
			if(lastId > self.totalThumbnails)  lastId = self.totalThumbnails;
			
			for (var i = 0; i<self.totalThumbnails; i++) {
				
				thumb = self.thumbs_ar[i];
				
				thumb.finalW = self.thumbW;
				if(i % self.howManyThumbsToDisplayH == self.howManyThumbsToDisplayH - 1) thumb.finalW += remainWidthSpace;
				thumb.finalH = self.thumbH;
				
				thumb.finalX = (i % self.howManyThumbsToDisplayH) * (self.thumbW + self.spacerH);
				thumb.finalX += Math.floor((i / availableThumbsPerSection)) * self.howManyThumbsToDisplayH * (self.thumbW + self.spacerH);
				thumb.finalX += (self.stageWidth - totalWidth)/2;
				thumb.finalX = Math.floor(thumb.finalX - currentLeftColId * (self.thumbW + self.spacerH));
				
				thumb.finalY = i % availableThumbsPerSection;
				thumb.finalY = Math.floor((thumb.finalY / self.howManyThumbsToDisplayH)) * (self.thumbH + self.spacerV);
				thumb.finalY += (heightToResize - totalHeight)/2;
				thumb.finalY += self.categoriesOffsetTotalHeight/2;
				thumb.finalY = Math.floor(thumb.finalY);
				
				tempSet = Math.floor((i / availableThumbsPerSection));
			
			
				if(tempSet > curSet){
					thumb.finalX += 150;
				}else if(tempSet < curSet){
					thumb.finalX -= 150;
				}
				
				if(animate){
					if ((i >= firstId) && (i < lastId)){
						if(direction == "next"){
							dl = (i % availableThumbsPerSection) * self.delayRate + .1;
						}else{
							dl = (availableThumbsPerSection -  (i % availableThumbsPerSection)) * self.delayRate + .1;
						}
						thumb.resizeAndPosition(true, dl);
					}else{
						thumb.resizeAndPosition(true, 0);
					}
					
				}else{
					thumb.resizeAndPosition();
				}	
			}
			
			
		};
		
		//#############################################//
		/* load images */
		//#############################################//
		this.loadImages = function(){
			if(self.countLoadedThumbs > self.totalThumbnails-1) return;
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onerror = self.onImageLoadError;
			self.image_img.onload = self.onImageLoadComplete;
			
			self.image_img.src = self.categories_ar[self.countLoadedThumbs].thumbnailPath;
		};
		
		this.onImageLoadError = function(e){};
		
		this.onImageLoadComplete = function(e){
			var thumb = self.thumbs_ar[self.countLoadedThumbs];
			thumb.setImage(self.image_img);
			self.countLoadedThumbs++;
			self.loadWithDelayId_to = setTimeout(self.loadImages, 40);	
		};
		
		//###########################################//
		/* disable / enable thumbnails */
		//###########################################//
		this.disableOrEnableThumbnails = function(){
			var thumb;
			for(var i = 0; i<self.totalThumbnails; i++) {
				thumb = self.thumbs_ar[i];	
				if(i == self.id){
					thumb.disable();
				}else{
					thumb.enable();
				}
			}
		};
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.isOnDOM_bl = true;
			self.id = id;
			
			if(FWDUVPUtils.isChrome && self.isMobile_bl){
				self.setVisible(true);
			}else{
				if(FWDUVPUtils.isIEAndLessThen9){
					document.getElementsByTagName("body")[0].appendChild(self.screen);
				}else{
					document.documentElement.appendChild(self.screen);
				}
			}
			
			if(window.addEventListener){
				window.addEventListener("scroll", self.onScrollHandler);
			}else if(window.attachEvent){
				window.attachEvent("onscroll", self.onScrollHandler);
			}
			
			self.setupThumbnails();	
			
			self.resizeAndPosition(true);
			self.showDisable();
			self.disableOrEnableThumbnails();
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.mainHolder_do.setY(- self.stageHeight);
			
			if(self.isMobile_bl){
				self.showCompleteId_to = setTimeout(self.showCompleteHandler, 1200);
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, delay:.4, ease:Expo.easeInOut});
			}else{
				self.showCompleteId_to = setTimeout(self.showCompleteHandler, 800);
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}
		};
		
		this.showCompleteHandler = function(){
			self.mainHolder_do.setY(0);
			self.hideDisable();
			if(FWDUVPUtils.isIphone){
				if(parent.videoScreen_do) parent.videoScreen_do.setY(-5000);
				if(parent.ytb_do) parent.ytb_do.setY(-5000);
			}
			self.resizeAndPosition(true);
			if(!self.areThumbnailsLoaded_bl){
				self.loadImages();
				self.areThumbnailsLoaded_bl = true;
			}
		};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			
			if(FWDUVPUtils.isIphone){
				if(parent.videoScreen_do) parent.videoScreen_do.setY(0);
				if(parent.ytb_do) parent.ytb_do.setY(0);
			}
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.showDisable();
			self.hideCompleteId_to = setTimeout(self.hideCompleteHandler, 800);
			FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
			FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
			
			if(window.addEventListener){
				window.removeEventListener("scroll", self.onScrollHandler);
			}else if(window.detachEvent){
				window.detachEvent("onscroll", self.onScrollHandler);
			}
			self.resizeAndPosition();
		};
		
		this.hideCompleteHandler = function(){
			
			if(FWDUVPUtils.isChrome && self.isMobile_bl){
				self.setVisible(false);
			}else{
				if(FWDUVPUtils.isIEAndLessThen9){
					document.getElementsByTagName("body")[0].removeChild(self.screen);
				}else{
					document.documentElement.removeChild(self.screen);
				}
			}
			
			self.isOnDOM_bl = false;
			self.dispatchEvent(FWDUVPCategories.HIDE_COMPLETE);
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPCategories.setPrototype = function(){
		FWDUVPCategories.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPCategories.HIDE_COMPLETE = "hideComplete";

	FWDUVPCategories.prototype = null;
	window.FWDUVPCategories = FWDUVPCategories;
	
}());/* FWDUVPCategoriesThumb */
(function (window){
	var FWDUVPCategoriesThumb = function(
			parent,
			pId, 
			catThumbBkTextPath_str,
			catThumbTextBkPath_str,
			thumbnailSelectedType_str,
			htmlContent
		){
		
		var self = this;
		var prototype = FWDUVPCategoriesThumb.prototype;
	
		this.backgroundImagePath_str = catThumbBkTextPath_str;
		this.catThumbTextBkPath_str = catThumbTextBkPath_str;
		this.canvas_el = null;
		this.htmlContent = htmlContent;
	
		this.simpleText_do = null;
		this.effectImage_do = null;
		this.imageHolder_do = null;
		this.normalImage_do = null;
		this.effectImage_do = null;
		this.dumy_do = null;
		
		this.thumbnailSelectedType_str = thumbnailSelectedType_str;
		
		this.id = pId;
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

		this.init = function(){
			self.getStyle().background = "url('" + self.backgroundImagePath_str + "')";
			self.setupMainContainers();
			self.setupDescription();
			self.setupDumy();
		};
		
		//#################################//
		/* set image */
		//#################################//
		this.setupMainContainers = function(){
			self.imageHolder_do = new FWDUVPDisplayObject("div");
			self.addChild(self.imageHolder_do);
		};
		
		//#################################//
		/* setup dumy */
		//#################################//
		this.setupDumy = function(){
			self.dumy_do = new FWDUVPDisplayObject("div");
			if(FWDUVPUtils.isIE){
				self.dumy_do.setBkColor("#FFFFFF");
				self.dumy_do.setAlpha(0);
			}
			self.addChild(self.dumy_do);
		};
		
		//################################################//
		/* Setup title bar */
		//###############################################//
		this.setupDescription = function(){
			self.simpleText_do = new FWDUVPDisplayObject("div");
			self.simpleText_do.getStyle().background = "url('" + self.catThumbTextBkPath_str + "')";
			if(FWDUVPUtils.isFirefox){
				self.simpleText_do.hasTransform3d_bl = false;
				self.simpleText_do.hasTransform2d_bl = false;
			}
			self.simpleText_do.setBackfaceVisibility();
			self.simpleText_do.getStyle().width = "100%";
			self.simpleText_do.getStyle().fontFamily = "Arial";
			self.simpleText_do.getStyle().fontSize= "12px";
			self.simpleText_do.getStyle().textAlign = "left";
			self.simpleText_do.getStyle().color = "#FFFFFF";
			self.simpleText_do.getStyle().fontSmoothing = "antialiased";
			self.simpleText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.simpleText_do.getStyle().textRendering = "optimizeLegibility";		
			self.simpleText_do.setInnerHTML(self.htmlContent);
			self.addChild(self.simpleText_do);
		};
		
		this.positionDescription = function(){
			self.simpleText_do.setY(parseInt(self.finalH - self.simpleText_do.getHeight()));
		};
		
		//#################################//
		/* setup black an white image */
		//#################################//
		this.setupBlackAndWhiteImage = function(image){
			if(!self.hasCanvas_bl || self.thumbnailSelectedType_str == "opacity") return;
			var canvas = document.createElement("canvas");

			var ctx = canvas.getContext("2d");
			
			canvas.width = self.imageOriginalW;
			canvas.height = self.imageOriginalH; 
			ctx.drawImage(image, 0, 0); 
			
			var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
			
			var d = imgPixels.data;
			
			if(self.thumbnailSelectedType_str == "threshold"){
				//treshhold
				for (var i=0; i<d.length; i+=4) {
				    var r = d[i];
				    var g = d[i+1];
				    var b = d[i+2];
				    var v = (0.2126*r + 0.7152*g + 0.0722*b >= 150) ? 255 : 0;
				    d[i] = d[i+1] = d[i+2] = v;
				}
			}else if(self.thumbnailSelectedType_str == "blackAndWhite"){
				//grayscale
				for (var i=0; i<d.length; i+=4) {
					var r = d[i];
				    var g = d[i+1];
				    var b = d[i+2];
				    // CIE luminance for the RGB
				    // The human eye is bad at seeing red and blue, so we de-emphasize them.
				    var v = 0.2126*r + 0.7152*g + 0.0722*b;
				    d[i] = d[i+1] = d[i+2] = v;
				}
			}
		
			ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
			
			self.effectImage_do = new FWDUVPDisplayObject("canvas");
			self.effectImage_do.screen = canvas;
			self.effectImage_do.setAlpha(.9);
			
			self.effectImage_do.setMainProperties();
		};
	
		//#################################//
		/* set image */
		//#################################//
		this.setImage = function(image){
			self.normalImage_do = new FWDUVPDisplayObject("img");
			self.normalImage_do.setScreen(image);
			
			self.imageOriginalW = self.normalImage_do.w;
			self.imageOriginalH = self.normalImage_do.h;
			
			self.setButtonMode(true);
			self.setupBlackAndWhiteImage(image);
			
			self.resizeImage();
			
			self.imageHolder_do.setX(parseInt(self.finalW/2));
			self.imageHolder_do.setY(parseInt(self.finalH/2));
			self.imageHolder_do.setWidth(0);
			self.imageHolder_do.setHeight(0);
			
			self.normalImage_do.setX(- parseInt(self.normalImage_do.w/2));
			self.normalImage_do.setY(- parseInt(self.normalImage_do.h/2));
			self.normalImage_do.setAlpha(0);
			
			if(self.effectImage_do){
				self.effectImage_do.setX(- parseInt(self.normalImage_do.w/2));
				self.effectImage_do.setY(- parseInt(self.normalImage_do.h/2));
				self.effectImage_do.setAlpha(0.01);
			}
			
			FWDUVPTweenMax.to(self.imageHolder_do, .8, {
				x:0, 
				y:0,
				w:self.finalW,
				h:self.finalH, 
				ease:Expo.easeInOut});
			
			FWDUVPTweenMax.to(self.normalImage_do, .8, {
				alpha:1,
				x:self.imageFinalX, 
				y:self.imageFinalY, 
				ease:Expo.easeInOut});
			
			if(self.effectImage_do){
				FWDUVPTweenMax.to(self.effectImage_do, .8, {
					x:self.imageFinalX, 
					y:self.imageFinalY, 
					ease:Expo.easeInOut});
			}
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerUp", self.onMouseUp);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("mouseup", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
		
			this.imageHolder_do.addChild(self.normalImage_do);
			if(self.effectImage_do) self.imageHolder_do.addChild(self.effectImage_do);
			
			this.hasImage_bl = true;
			
			if(self.id == parent.id){
				self.disable();
			}
			
		};
		
		self.onMouseOver = function(e, animate){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setNormalState(true);
			}
		};
		
		self.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDUVPCategoriesThumb.MOUSE_UP, {id:self.id});
		};
	
		//#################################//
		/* resize thumbnail*/
		//#################################//
		this.resizeAndPosition = function(animate, dl){
			
			FWDUVPTweenMax.killTweensOf(self);
			FWDUVPTweenMax.killTweensOf(self.imageHolder_do);
			
			if(animate){
				FWDUVPTweenMax.to(self, .8, {
					x:self.finalX, 
					y:self.finalY,
					delay:dl,
					ease:Expo.easeInOut});
			}else{
				self.setX(self.finalX);
				self.setY(self.finalY);
			}
			
			self.setWidth(self.finalW);
			self.setHeight(self.finalH);
			self.imageHolder_do.setX(0);
			self.imageHolder_do.setY(0);
			self.imageHolder_do.setWidth(self.finalW);
			self.imageHolder_do.setHeight(self.finalH);
			
			self.dumy_do.setWidth(self.finalW);
			self.dumy_do.setHeight(self.finalH);
			
			self.resizeImage();
			self.positionDescription();
		};
	
		//#################################//
		/* resize image*/
		//#################################//
		this.resizeImage = function(animate){
			
			if(!self.normalImage_do) return;
			FWDUVPTweenMax.killTweensOf(self.normalImage_do);
			var scX = self.finalW/self.imageOriginalW;
			var scY = self.finalH/self.imageOriginalH;
			var ttsc;
			
			if(scX >= scY){
				ttsc = scX;
			}else{
				ttsc = scY;
			}
			
			self.imageFinalW = Math.ceil(ttsc * self.imageOriginalW);
			self.imageFinalH = Math.ceil(ttsc * self.imageOriginalH);
			self.imageFinalX = Math.round((self.finalW - self.imageFinalW)/2);
			self.imageFinalY = Math.round((self.finalH - self.imageFinalH)/2);
			
			if(self.effectImage_do){
				FWDUVPTweenMax.killTweensOf(self.effectImage_do);
				self.effectImage_do.setX(self.imageFinalX);
				self.effectImage_do.setY(self.imageFinalY);
				self.effectImage_do.setWidth(self.imageFinalW);
				self.effectImage_do.setHeight(self.imageFinalH);
				if(self.isDisabled_bl) self.setSelectedState(false, true);
			}
			
			self.normalImage_do.setX(self.imageFinalX);
			self.normalImage_do.setY(self.imageFinalY);
			self.normalImage_do.setWidth(self.imageFinalW);
			self.normalImage_do.setHeight(self.imageFinalH);
			
			if(self.isDisabled_bl){
				self.normalImage_do.setAlpha(.3);
			}else{
				self.normalImage_do.setAlpha(1);
			}
		};
		
		//##############################//
		/* set normal/selected state*/
		//##############################//
		this.setNormalState = function(animate){
			if(!self.isSelected_bl) return;
			self.isSelected_bl = false;
			if(self.thumbnailSelectedType_str == "threshold" || self.thumbnailSelectedType_str == "blackAndWhite"){
				if(animate){
					FWDUVPTweenMax.to(self.effectImage_do, 1, {alpha:.01, ease:Quart.easeOut});
				}else{
					self.effectImage_do.setAlpha(.01);
				}
			}else if(self.thumbnailSelectedType_str == "opacity"){
				if(animate){
					FWDUVPTweenMax.to(self.normalImage_do, 1, {alpha:1, ease:Quart.easeOut});
				}else{
					self.normalImage_do.setAlpha(1);
				}
			}
		};
		
		this.setSelectedState = function(animate, overwrite){
			if(self.isSelected_bl && !overwrite) return;
			self.isSelected_bl = true;
			if(self.thumbnailSelectedType_str == "threshold" || self.thumbnailSelectedType_str == "blackAndWhite"){
				if(animate){
					FWDUVPTweenMax.to(self.effectImage_do, 1, {alpha:1, ease:Expo.easeOut});
				}else{
					self.effectImage_do.setAlpha(1);
				}
			}else if(self.thumbnailSelectedType_str == "opacity"){
				if(animate){
					FWDUVPTweenMax.to(self.normalImage_do, 1, {alpha:.3, ease:Expo.easeOut});
				}else{
					self.normalImage_do.setAlpha(.3);
				}
			}
		};
		
		//###############################//
		/* enable / disable */
		//##############################//
		this.enable = function(){
			if(!self.hasImage_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			self.setNormalState(true);
		};
		
		this.disable = function(){
			if(!self.hasImage_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			self.setSelectedState(true);
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPCategoriesThumb.setPrototype = function(){
		FWDUVPCategoriesThumb.prototype = new FWDUVPDisplayObject("div");
	};
	
	
	FWDUVPCategoriesThumb.MOUSE_UP = "onMouseUp";
	
	FWDUVPCategoriesThumb.prototype = null;
	window.FWDUVPCategoriesThumb = FWDUVPCategoriesThumb;
}(window));/* FWDUVPComplexButton */
(function (){
var FWDUVPComplexButton = function(
			n1Img, 
			s1Path, 
			n2Img, 
			s2Path, 
			disptachMainEvent_bl
		){
		
		var self = this;
		var prototype = FWDUVPComplexButton.prototype;
		
		this.n1Img = n1Img;
		this.s1Path_str = s1Path;
		this.n2Img = n2Img;
		this.s2Path_str = s2Path;
		
		
		this.firstButton_do;
		this.n1_do;
		this.s1_do;
		this.secondButton_do;
		this.n2_do;
		this.s2_do;
		
		this.buttonWidth = self.n1Img.width;
		this.buttonHeight = self.n1Img.height;
		
		this.isSelectedState_bl = false;
		this.currentState = 1;
		this.isDisabled_bl = false;
		this.isMaximized_bl = false;
		this.disptachMainEvent_bl = disptachMainEvent_bl;
		this.isDisabled_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setButtonMode(true);
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setupMainContainers();
			self.secondButton_do.setVisible(false);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.firstButton_do = new FWDUVPDisplayObject("div");
			self.firstButton_do.setBackfaceVisibility();
			self.firstButton_do.hasTransform2d_bl = false;
			self.firstButton_do.hasTransform3d_bl = false;
			self.addChild(self.firstButton_do);
			self.n1_do = new FWDUVPDisplayObject("img");	
			self.n1_do.setScreen(self.n1Img);
			self.n1_do.setBackfaceVisibility();
			self.n1_do.hasTransform2d_bl = false;
			self.n1_do.hasTransform3d_bl = false;
			self.firstButton_do.addChild(self.n1_do);
			if(self.allowToCreateSecondButton_bl){
				self.s1_do = new FWDUVPDisplayObject("img");
				var img1 = new Image();
				img1.src = self.s1Path_str;
				self.s1_do.setScreen(img1);
				self.s1_do.setWidth(self.buttonWidth);
				self.s1_do.setHeight(self.buttonHeight);
				self.s1_do.setAlpha(0);
				self.s1_do.setBackfaceVisibility();
				self.s1_do.hasTransform2d_bl = false;
				self.s1_do.hasTransform3d_bl = false;
				self.firstButton_do.addChild(self.s1_do);
			}
			self.firstButton_do.setWidth(self.buttonWidth);
			self.firstButton_do.setHeight(self.buttonHeight);
			
			self.secondButton_do = new FWDUVPDisplayObject("div");
			self.secondButton_do.setBackfaceVisibility();
			self.secondButton_do.hasTransform2d_bl = false;
			self.secondButton_do.hasTransform3d_bl = false;
			self.addChild(self.secondButton_do);
			self.n2_do = new FWDUVPDisplayObject("img");	
			self.n2_do.setScreen(self.n2Img);
			self.n2_do.setBackfaceVisibility();
			self.n2_do.hasTransform2d_bl = false;
			self.n2_do.hasTransform3d_bl = false;
			self.secondButton_do.addChild(self.n2_do);
			
			if(self.allowToCreateSecondButton_bl){
				self.s2_do = new FWDUVPDisplayObject("img");
				var img2 = new Image();
				img2.src = self.s2Path_str;
				self.s2_do.setScreen(img2);
				self.s2_do.setBackfaceVisibility();
				self.s2_do.hasTransform2d_bl = false;
				self.s2_do.hasTransform3d_bl = false;
				self.s2_do.setWidth(self.buttonWidth);
				self.s2_do.setHeight(self.buttonHeight);
				self.s2_do.setAlpha(0);
				self.secondButton_do.addChild(self.s2_do);
			}
			
			self.secondButton_do.setWidth(self.buttonWidth);
			self.secondButton_do.setHeight(self.buttonHeight);
			
			self.addChild(self.secondButton_do);
			self.addChild(self.firstButton_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerDown", self.onMouseUp);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("toustart", self.onDown);
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e, animate){
			self.dispatchEvent(FWDUVPComplexButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabled_bl || self.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.dispatchEvent(FWDUVPComplexButton.MOUSE_OVER, {e:e});
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl || !self.isSelectedState_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setNormalState();
				self.dispatchEvent(FWDUVPComplexButton.MOUSE_OUT);
			}
		};
		
		self.onDown = function(e){
			if(e.preventDefault) e.preventDefault();
		};
	
		self.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			if(!self.isMobile_bl) self.onMouseOver(e, false);
			//if(self.hasPointerEvent_bl) self.setNormalState();
			if(self.disptachMainEvent_bl) self.dispatchEvent(FWDUVPComplexButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		self.toggleButton = function(){
			if(self.currentState == 1){
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0;
				self.dispatchEvent(FWDUVPComplexButton.FIRST_BUTTON_CLICK);
			}else{
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1;
				self.dispatchEvent(FWDUVPComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		
		//##############################//
		/* set second buttons state */
		//##############################//
		self.setButtonState = function(state){
			if(state == 1){
				self.firstButton_do.setVisible(true);
				self.secondButton_do.setVisible(false);
				self.currentState = 1; 
			}else{
				self.firstButton_do.setVisible(false);
				self.secondButton_do.setVisible(true);
				self.currentState = 0; 
			}
		};
		
		//###############################//
		/* set normal state */
		//################################//
		this.setNormalState = function(){
			if(self.isMobile_bl && !self.hasPointerEvent_bl) return;
			self.isSelectedState_bl = false;
			FWDUVPTweenMax.killTweensOf(self.s1_do);
			FWDUVPTweenMax.killTweensOf(self.s2_do);
			FWDUVPTweenMax.to(self.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDUVPTweenMax.to(self.s2_do, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		this.setSelectedState = function(animate){
			self.isSelectedState_bl = true;
			FWDUVPTweenMax.killTweensOf(self.s1_do);
			FWDUVPTweenMax.killTweensOf(self.s2_do);
			FWDUVPTweenMax.to(self.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			FWDUVPTweenMax.to(self.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		//#######################################//
		/* disable / enable */
		//#######################################//
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setButtonMode(true);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPComplexButton.setPrototype = function(){
		FWDUVPComplexButton.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPComplexButton.SHOW_TOOLTIP = "showToolTip";
	FWDUVPComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDUVPComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDUVPComplexButton.MOUSE_OVER = "onMouseOver";
	FWDUVPComplexButton.MOUSE_OUT = "onMouseOut";
	FWDUVPComplexButton.MOUSE_UP = "onMouseUp";
	FWDUVPComplexButton.CLICK = "onClick";
	
	FWDUVPComplexButton.prototype = null;
	window.FWDUVPComplexButton = FWDUVPComplexButton;
}(window));/* Context menu */
(function (){
	var FWDUVPContextMenu = function(e, showMenu){
		
		var self = this;
		this.parent = e;
		this.url = "http://www.webdesign-flash.ro";
		this.menu_do = null;
		this.normalMenu_do = null;
		this.selectedMenu_do = null;
		this.over_do = null;
		this.isDisabled_bl = false;
		
		this.showMenu_bl = showMenu;
		
		this.init = function(){
			self.updateParent(self.parent);
		};
	
		this.updateParent = function(parent){
			if(self.parent){
				if(self.parent.screen.addEventListener){
					self.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler);
				}else{
					self.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler);
				}
				
			}
			self.parent = parent;
			
			if(self.parent.screen.addEventListener){
				self.parent.screen.addEventListener("contextmenu", this.contextMenuHandler);
			}else{
				self.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler);
			}
		};
		
		this.contextMenuHandler = function(e){
			if(self.isDisabled_bl) return;
			if(showMenu =="disabled"){
				if(e.preventDefault){
					e.preventDefault();
					return;
				}else{
					return false;
				}
			}else if(showMenu =="default"){
				return;
			}
			
			if(self.url.indexOf("sh.r") == -1) return;
			self.setupMenus();
			self.parent.addChild(self.menu_do);
			self.menu_do.setVisible(true);
			self.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		this.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);
			
			var screenX = viewportMouseCoordinates.screenX;
			var screenY = viewportMouseCoordinates.screenY;
			
			if(!FWDUVPUtils.hitTest(self.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				}
				self.menu_do.setX(-500);
			}
		};
		
		/* setup menus */
		this.setupMenus = function(){
			if(this.menu_do) return;
			this.menu_do = new FWDUVPDisplayObject("div");
			self.menu_do.setX(-500);
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
			this.menu_do.screen.onclick = this.onClickHandler;
		};
		
		this.mouseOverHandler = function(){
			if(self.url.indexOf("w.we") == -1) self.menu_do.visible = false;
			FWDUVPTweenMax.to(self.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDUVPTweenMax.to(self.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.mouseOutHandler = function(){
			FWDUVPTweenMax.to(self.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDUVPTweenMax.to(self.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.onClickHandler = function(){
			window.open(self.url, "_blank");
		};
		
		/* position buttons */
		this.positionButtons = function(e){
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > self.parent.getWidth() - self.menu_do.getWidth() - 2){
				finalX = localX - self.menu_do.getWidth() - 2;
			}
			
			if(finalY > self.parent.getHeight() - self.menu_do.getHeight() - 2){
				finalY = localY - self.menu_do.getHeight() - 2;
			}
			self.menu_do.setX(finalX);
			self.menu_do.setY(finalY);
		};
		
		//####################################//
		/* Enable or disable */
		//####################################//
		this.disable = function(){
			self.isDisabled_bl = true;
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
		}
		
		this.init();
	};
	
	
	FWDUVPContextMenu.prototype = null;
	window.FWDUVPContextMenu = FWDUVPContextMenu;
	
}(window));/* FWDUVPController */
(function(){
var FWDUVPController = function(
			data,
			parent
		){
	
		var self = this;
		var prototype = FWDUVPController.prototype;
		
		this.bkLeft_img = data.bkLeft_img;
		this.bkRight_img = data.bkRight_img;
		this.playN_img = data.playN_img;
		this.pauseN_img = data.pauseN_img;
		this.mainScrubberBkLeft_img = data.mainScrubberBkLeft_img;
		this.mainScrubberDragLeft_img = data.mainScrubberDragLeft_img;
		this.mainScrubberLine_img = data.mainScrubberLine_img;
		this.volumeScrubberBkLeft_img = data.volumeScrubberBkLeft_img;
		this.volumeScrubberDragLeft_img = data.volumeScrubberDragLeft_img;
		this.volumeScrubberLine_img = data.volumeScrubberLine_img;
		this.volumeN_img = data.volumeN_img;
		this.progressLeft_img = data.progressLeft_img;
		this.categoriesN_img = data.categoriesN_img;
		
		this.playlistN_img = data.playlistN_img;
		
		this.ytbQualityN_img = data.ytbQualityN_img;
		this.infoN_img = data.infoN_img;
		this.downloadN_img = data.downloadN_img;
		this.facebookN_img = data.facebookN_img;
		this.fullScreenN_img = data.fullScreenN_img;
		this.normalScreenN_img = data.normalScreenN_img;
		this.hidePlaylistN_img = data.hidePlaylistN_img;
		this.showPlaylistN_img = data.showPlaylistN_img;
		this.embedN_img = data.embedN_img;
	
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
		
		this.bkMiddlePath_str = data.bkMiddlePath_str;
		this.mainScrubberBkMiddlePath_str = data.mainScrubberBkMiddlePath_str;
		this.volumeScrubberBkMiddlePath_str = data.volumeScrubberBkMiddlePath_str;
		this.mainScrubberDragMiddlePath_str = data.mainScrubberDragMiddlePath_str;
		this.volumeScrubberDragMiddlePath_str = data.volumeScrubberDragMiddlePath_str;
		this.timeColor_str = data.timeColor_str;
		this.progressMiddlePath_str = data.progressMiddlePath_str;
		this.youtubeQualityButtonNormalColor_str = data.youtubeQualityButtonNormalColor_str;
		this.youtubeQualityButtonSelectedColor_str = data.youtubeQualityButtonSelectedColor_str;
		this.youtubeQualityArrowPath_str = data.youtubeQualityArrowPath_str;
		this.controllerBkPath_str = data.controllerBkPath_str;
		this.ytbQualityButtonPointerPath_str = data.ytbQualityButtonPointerPath_str;
		this.buttonsToolTipFontColor_str = data.buttonsToolTipFontColor_str;
		
		this.buttonsToolTipHideDelay = data.buttonsToolTipHideDelay;
		this.totalYtbButtons = 0;
		this.stageWidth = 0;
		this.stageHeight = data.controllerHeight;
		this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width;
		this.mainScrubberWidth = 0;
		this.mainScrubberMinWidth = 100;
		this.volumeScrubberOfsetHeight = data.volumeScrubberOfsetHeight;
		this.volumeScrubberHeight = data.volumeScrubberHeight + self.volumeScrubberOfsetHeight;
		this.volumeScrubberWidth = self.mainScrubberBkLeft_img.height;
		this.mainScrubberHeight = this.mainScrubberBkLeft_img.height;
		this.mainScrubberDragLeftWidth = self.mainScrubberDragLeft_img.width;
		this.scrubbersOffsetWidth = data.scrubbersOffsetWidth;
		this.volume = data.volume;
		this.lastVolume = self.volume;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.spaceBetweenButtons = data.spaceBetweenButtons;
		this.percentPlayed = 0;
		this.percentLoaded = 0;
		this.lastTimeLength = 0;
		this.prevYtbQualityButtonsLength = 0;
		this.pointerWidth = 8;
		this.pointerHeight = 5;
		this.timeOffsetLeftWidth = data.timeOffsetLeftWidth;
		this.timeOffsetRightWidth = data.timeOffsetRightWidth;
		this.timeOffsetTop = data.timeOffsetTop;
		this.mainScrubberOffestTop = data.mainScrubberOffestTop;
		
		this.isVolumeScrubberShowed_bl = true;
		this.volumeScrubberIsDragging_bl = false;
		this.showButtonsToolTip_bl = data.showButtonsToolTip_bl;
		this.showPlaylistsButtonAndPlaylists_bl = data.showPlaylistsButtonAndPlaylists_bl;
		this.showPlaylistButtonAndPlaylist_bl = data.showPlaylistButtonAndPlaylist_bl;
		this.showEmbedButton_bl = data.showEmbedButton_bl;
		this.showPlaylistByDefault_bl = data.showPlaylistByDefault_bl;
		this.showShuffleButton_bl = data.showShuffleButton_bl;
		this.showLoopButton_bl = data.showLoopButton_bl;
		
		this.showNP_bl = parent.data.showNextAndPrevButtonsInController_bl;
		if(parent.isEmbedded_bl) parent.data.showNextAndPrevButtonsInController_bl = true;
		this.showNextAndPrevButtonsInController_bl = data.showNextAndPrevButtonsInController_bl;
		this.showFullScreenButton_bl = data.showFullScreenButton_bl;
		this.showYoutubeQualityButton_bl = data.showYoutubeQualityButton_bl;
		this.showFacebookButton_bl = data.showFacebookButton_bl;
		this.showInfoButton_bl = data.showInfoButton_bl;
		this.showDownloadVideoButton_bl = data.showDownloadVideoButton_bl;
		this.showVolumeScrubber_bl = data.showVolumeScrubber_bl;
		this.allowToChangeVolume_bl = data.allowToChangeVolume_bl;
		this.showTime_bl = data.showTime_bl;
		this.showVolumeButton_bl = data.showVolumeButton_bl;
		this.showControllerWhenVideoIsStopped_bl = data.showControllerWhenVideoIsStopped_bl;
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
		this.showNextAndPrevButtons_bl = data.showNextAndPrevButtons_bl;
		this.isPlaylistShowed_bl = data.isPlaylistShowed_bl;
		this.areYtbQualityButtonsShowed_bl = true;
		this.repeatBackground_bl = data.repeatBackground_bl;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			if(self.repeatBackground_bl){
				self.mainHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.bk_do = new FWDUVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.bk_do.setScreen(img);
				self.mainHolder_do.addChild(self.bk_do);
			}
			
			self.mainHolder_do.setOverflow("visible");
			self.mainHolder_do.getStyle().zIndex = 1;
		
			self.addChild(self.mainHolder_do);
			
			if(self.showYoutubeQualityButton_bl){
				self.ytbQuality_ar = ["highres", "hd1080", "hd720", "large", "medium", "small", "tiny"];
				self.ytbButtons_ar = [];
				self.totalYtbButtons = self.ytbQuality_ar.length;
				self.setupYtbButtons();
			}
			
			if(self.showNextAndPrevButtonsInController_bl) self.setupPrevButton();
			self.setupPlayPauseButton();
			if(self.showNextAndPrevButtonsInController_bl) self.setupNextButton();
			self.setupMainScrubber();
			if(self.showTime_bl) self.setupTime();
			
			if(self.showVolumeButton_bl) self.setupVolumeButton();
			
			if(self.showPlaylistsButtonAndPlaylists_bl) self.setupCategoriesButton();
			if(self.showPlaylistButtonAndPlaylist_bl) self.setupPlaylistButton();
			if(self.showYoutubeQualityButton_bl) self.setupYoutubeQualityButton();
			if(self.showInfoButton_bl) self.setupInfoButton();
			if(self.showDownloadVideoButton_bl) self.setupDownloadButton();
			if(self.showEmbedButton_bl) self.setupEmbedButton();
			if(self.showFacebookButton_bl) self.setupFacebookButton();
			if(self.showFullScreenButton_bl) self.setupFullscreenButton();
			if(self.showButtonsToolTip_bl) self.setupToolTips();
			
			
			if(self.showVolumeScrubber_bl){
				self.setupVolumeScrubber();
				self.hideVolumeScrubber();
			}
			self.hide(false);
			//if(self.showControllerWhenVideoIsStopped_bl) self.show(true);
		};
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.tempVidStageWidth;
			self.positionButtons();
			self.setY(parent.tempVidStageHeight - self.stageHeight);
			self.hideQualityButtons(false);
			if(self.ytbButtonsHolder_do){
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(parent.tempStageHeight);
			}
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			if(!self.stageWidth) return;
			var button;
			var prevButton;
			var totalButtons = 0;
			var totalButtonsWidth = 0;
			var spaceBetweenButtons = 0;
			var hasTime_bl = self.showTime_bl;
			
			if(self.showDownloadVideoButton_bl){
				if(data.playlist_ar[parent.id].downloadable){
					if(FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do) == -1){
						if(self.fullScreenButton_do){
							if(self.embedButton_do && self.facebookButton_do){
								self.buttons_ar.splice(self.buttons_ar.length - 3,0, self.downloadButton_do);
							}else{
								self.buttons_ar.splice(self.buttons_ar.length - 2,0, self.downloadButton_do);
							}
						}else if(self.facebookButton_do){
							if(self.embedButton_do){
								self.buttons_ar.splice(self.buttons_ar.length - 2,0, self.downloadButton_do);
							}else{
								self.buttons_ar.splice(self.buttons_ar.length - 1,0, self.downloadButton_do);
							}
						}else if(self.embedButton_do){
							self.buttons_ar.splice(self.buttons_ar.length - 1,0, self.downloadButton_do);
						}else{
							self.buttons_ar.splice(self.buttons_ar.length,0, self.downloadButton_do);
						}
						self.downloadButton_do.setVisible(true);
					}
				}else{
					var downloadButtonIndex = FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do);
					if(downloadButtonIndex != -1){
						self.buttons_ar.splice(downloadButtonIndex,1);
						self.downloadButton_do.setVisible(false);
					}
				}
			};
			
			if(self.showInfoButton_bl){
				var indexToAdd;
				if(data.playlist_ar[parent.id].desc){
					if(FWDUVPUtils.indexOfArray(self.buttons_ar, self.infoButton_do) == -1){
						indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do);
						if(self.downloadButton_do && downloadButtonIndex != -1){
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.embedButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.facebookButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.fullScreenButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.fullScreenButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else{
							self.buttons_ar.splice(self.buttons_ar.length,0, self.infoButton_do);
						}
					}
					self.infoButton_do.setVisible(true);
				}else{
					var infoButtonIndex = FWDUVPUtils.indexOfArray(self.buttons_ar, self.infoButton_do);
					if(infoButtonIndex != -1){
						self.buttons_ar.splice(infoButtonIndex,1);
						self.infoButton_do.setVisible(false);
					}
				}
			};
			
			
			var buttonsCopy_ar = [];
			for (var i=0; i < self.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = self.buttons_ar[i];
			}
			
			if(parent.tempPlaylistPosition_str == "right" 
				&& self.showNextAndPrevButtonsInController_bl
				&& !self.showNP_bl){
				if(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.nextButton_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.nextButton_do), 1);
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.prevButton_do), 1);
					self.nextButton_do.setX(-1000);
					self.prevButton_do.setX(-1000);
				}
			}
			
			self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != self.mainScrubber_do){
					self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
				}
			};
		
			if(self.mainScrubberWidth <= 120){
				if(self.mainScrubber_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do), 1);
					self.positionScrollBarOnTopOfTheController();
				}
				
				if(self.time_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
					self.time_do.setX(-1000);
				}
				
				totalButtons = buttonsCopy_ar.length;
				for(var i=0; i<totalButtons; i++){
					totalButtonsWidth += buttonsCopy_ar[i].w;
				}
			
				spaceBetweenButtons = parseInt((self.stageWidth - totalButtonsWidth - self.startSpaceBetweenButtons * 2)/(totalButtons - 1));
				var leftWidth = parseInt((self.stageWidth - totalButtonsWidth - ((totalButtons - 1) * spaceBetweenButtons))/2);
				
				for (var i=0; i < totalButtons; i++) {
					button = buttonsCopy_ar[i];
					if(i == 0){
						button.setX(leftWidth);
					}else{
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + spaceBetweenButtons);	
					}
				}
			}else{
				while(self.mainScrubberWidth < self.mainScrubberMinWidth){
					self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
					if(self.time_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
						self.time_do.setX(-1000);
						hasTime_bl = false;
					}else if(self.facebookButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.facebookButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.facebookButton_do), 1);
						self.facebookButton_do.setX(-1000);
					}else if(self.downloadButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.downloadButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.downloadButton_do), 1);
						self.downloadButton_do.setX(-1000);
					}else if(self.embedButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do), 1);
						self.embedButton_do.setX(-1000);
					}else if(self.volumeButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do), 1);
						self.volumeButton_do.setX(-1000);
					}else if(self.ytbQualityButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.ytbQualityButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.ytbQualityButton_do), 1);
						self.ytbQualityButton_do.setX(-1000);
					}else if(self.playlistButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.playlistButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.playlistButton_do), 1);
						self.playlistButton_do.setX(-1000);
					}else if(self.infoButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.infoButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.infoButton_do), 1);
						self.infoButton_do.setX(-1000);
					}else if(self.categoriesButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.categoriesButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.categoriesButton_do), 1);
						self.categoriesButton_do.setX(-1000);
					}
							
					totalButtons = buttonsCopy_ar.length;
					for (var i=0; i < totalButtons; i++) {
						button = buttonsCopy_ar[i];
						if(button != self.mainScrubber_do){
							self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
						}
					};
				};
				
				if(self.showNextAndPrevButtonsInController_bl
					&& self.mainScrubberWidth > 120){
					//self.mainScrubberWidth += self.nextButton_do.w + self.spaceBetweenButtons;
					//self.mainScrubberWidth += self.prevButton_do.w + self.spaceBetweenButtons;				
				}
				
				if(hasTime_bl) self.mainScrubberWidth -= self.timeOffsetLeftWidth * 2;
				totalButtons = buttonsCopy_ar.length;
				
				for (var i=0; i < totalButtons; i++) {
					button = buttonsCopy_ar[i];
					
					if(i == 0){
						button.setX(self.startSpaceBetweenButtons);
					}else if(button == self.mainScrubber_do){
						prevButton = buttonsCopy_ar[i - 1];
						FWDUVPTweenMax.killTweensOf(self.mainScrubber_do);
						self.mainScrubber_do.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
						self.mainScrubber_do.setY(parseInt((self.stageHeight - self.mainScrubberHeight)/2));
						self.mainScrubber_do.setWidth(self.mainScrubberWidth);
						self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
						self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
						self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
					}else if(button == self.time_do){
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetLeftWidth);
					}else if(button == self.volumeButton_do && hasTime_bl){
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetRightWidth);
					}else{
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
					}
				}
				
				if(self.isShowed_bl){
					self.isMainScrubberOnTop_bl = false;
				}else{
					self.isMainScrubberOnTop_bl = true;
					self.positionScrollBarOnTopOfTheController();
				}
			}
		
			if(self.bk_do){
				self.bk_do.setWidth(self.stageWidth);
				self.bk_do.setHeight(self.stageHeight);
			}
			
			if(self.progressMiddle_do) self.progressMiddle_do.setWidth(Math.max(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth, 0));
			self.updateMainScrubber(self.percentPlayed);
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
		};
		
		this.positionScrollBarOnTopOfTheController = function(){
			//if(self.mainScrubber_do.x == 0) return;
			
			self.mainScrubberWidth = self.stageWidth;
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainScrubber_do.setWidth(self.mainScrubberWidth);
			self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			FWDUVPTweenMax.killTweensOf(self.mainScrubber_do);
			self.mainScrubber_do.setX(0);
			self.mainScrubber_do.setAlpha(1);
			if(self.isMainScrubberOnTop_bl || self.isShowed_bl){
				self.mainScrubber_do.setY(- self.mainScrubberOffestTop);
			}else{
				self.mainScrubber_do.setY(self.mainScrubber_do.h);
				FWDUVPTweenMax.to(self.mainScrubber_do, .8, {y:- self.mainScrubberOffestTop, ease:Expo.easeOut});
			}
			self.isMainScrubberOnTop_bl = true;
		};
	
			
		//################################//
		/* Setup tooltips */
		//################################//		
		this.setupToolTips = function(){
			FWDUVPToolTip.setPrototype();
			self.playPauseToolTip_do = new FWDUVPToolTip(self.playPauseButton_do, data.toopTipBk_str, data.toopTipPointer_str, "play / pause", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
			document.documentElement.appendChild(self.playPauseToolTip_do.screen);
			
			if(self.showControllerWhenVideoIsStopped_bl){
				FWDUVPToolTip.setPrototype();
				self.prevButtonToolTip_do = new FWDUVPToolTip(self.prevButton_do, data.toopTipBk_str, data.toopTipPointer_str, "previous video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.prevButtonToolTip_do.screen);
				
				FWDUVPToolTip.setPrototype();
				self.nextButtonToolTip_do = new FWDUVPToolTip(self.nextButton_do, data.toopTipBk_str, data.toopTipPointer_str, "next video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.nextButtonToolTip_do.screen);
			}
			
			if(self.showPlaylistsButtonAndPlaylists_bl){
				FWDUVPToolTip.setPrototype();
				self.playlistsButtonToolTip_do = new FWDUVPToolTip(self.categoriesButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show playlists", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.playlistsButtonToolTip_do.screen);
			}
			
			if(self.showPlaylistButtonAndPlaylist_bl){
				FWDUVPToolTip.setPrototype();
				self.playlistButtonToolTip_do = new FWDUVPToolTip(self.playlistButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show / hide playlist", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.playlistButtonToolTip_do.screen);
			}
			
			if(self.showEmbedButton_bl){
				FWDUVPToolTip.setPrototype();
				self.embedButtonToolTip_do = new FWDUVPToolTip(self.embedButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show embed window", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.embedButtonToolTip_do.screen);
			}
			
			//FWDUVPToolTip.setPrototype();
			//self.volumeButtonToolTip_do = new FWDUVPToolTip(self.volumeButton_do, data.toopTipBk_str, data.toopTipPointer_str, "mute / unmute", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
			//document.documentElement.appendChild(self.volumeButtonToolTip_do.screen);
			
			if(self.showFacebookButton_bl){
				FWDUVPToolTip.setPrototype();
				self.facebookButtonToolTip_do = new FWDUVPToolTip(self.facebookButton_do, data.toopTipBk_str, data.toopTipPointer_str, "share on facebook", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.facebookButtonToolTip_do.screen);
			}
			
			
			if(self.showInfoButton_bl){
				FWDUVPToolTip.setPrototype();
				self.infoButtonToolTip_do = new FWDUVPToolTip(self.infoButton_do, data.toopTipBk_str, data.toopTipPointer_str, "more info", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.infoButtonToolTip_do.screen);
			}
			
			if(self.showDownloadVideoButton_bl){
				FWDUVPToolTip.setPrototype();
				self.downloadButtonToolTip_do = new FWDUVPToolTip(self.downloadButton_do, data.toopTipBk_str, data.toopTipPointer_str, "download video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.downloadButtonToolTip_do.screen);
			}
			
			if(self.fullScreenButton_do){
				FWDUVPToolTip.setPrototype();
				self.fullscreenButtonToolTip_do = new FWDUVPToolTip(self.fullScreenButton_do, data.toopTipBk_str, data.toopTipPointer_str, "fullscreen / normalscreen", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.fullscreenButtonToolTip_do.screen);
			}
		};
		
		this.showToolTip = function(button, toolTip, e){
			if(!self.showButtonsToolTip_bl) return;
			var ws = FWDUVPUtils.getViewportSize();
			var wc = FWDUVPUtils.getViewportMouseCoordinates(e);
			var localX;
			var localY;
			
			if(button.screen.offsetWidth < 3){
				localX = parseInt(button.getGlobalX() * 100 + button.w/2 - toolTip.w/2);
				localY = parseInt(button.getGlobalY() * 100 - toolTip.h - 8);
			}else{
				localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
				localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			}
			
			
			var offseX = 0;
		
			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			toolTip.positionPointer(offseX, false);
			
			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};
		
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){
			//setup background bar
			self.mainScrubber_do = new FWDUVPDisplayObject("div");
			self.mainScrubber_do.setY(parseInt((self.stageHeight - self.mainScrubberHeight)/2));
			self.mainScrubber_do.setHeight(self.mainScrubberHeight);
			
			self.mainScrubberBkLeft_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBkLeft_do.setScreen(self.mainScrubberBkLeft_img);
			
			var rightImage = new Image();
			rightImage.src = data.mainScrubberBkRightPath_str;
			self.mainScrubberBkRight_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBkRight_do.setScreen(rightImage);
			self.mainScrubberBkRight_do.setWidth(self.mainScrubberBkLeft_do.w);
			self.mainScrubberBkRight_do.setHeight(self.mainScrubberBkLeft_do.h);
		
			var middleImage = new Image();
			middleImage.src = self.mainScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("div");	
				self.mainScrubberBkMiddle_do.getStyle().background = "url('" + self.mainScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
				self.mainScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.mainScrubberBkMiddle_do.setHeight(self.mainScrubberHeight);
			self.mainScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			self.mainProgress_do = new FWDUVPDisplayObject("div");
			self.mainProgress_do.setHeight(self.mainScrubberHeight);
		
			self.progressLeft_do = new FWDUVPDisplayObject("img");
			self.progressLeft_do.setScreen(self.progress);
			
			middleImage = new Image();
			middleImage.src = self.progressMiddlePath_str;
			
			self.progressMiddle_do = new FWDUVPDisplayObject("div");	
			self.progressMiddle_do.getStyle().background = "url('" + self.progressMiddlePath_str + "') repeat-x";
		
			self.progressMiddle_do.setHeight(self.mainScrubberHeight);
			self.progressMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			self.mainScrubberDrag_do = new FWDUVPDisplayObject("div");
			self.mainScrubberDrag_do.setHeight(self.mainScrubberHeight);
		
			self.mainScrubberDragLeft_do = new FWDUVPDisplayObject("img");
			self.mainScrubberDragLeft_do.setScreen(self.mainScrubberDragLeft_img);
			
			middleImage = new Image();
			middleImage.src = self.mainScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div");	
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
				self.mainScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.mainScrubberDragMiddle_do.setHeight(self.mainScrubberHeight);
			self.mainScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			self.mainScrubberBarLine_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBarLine_do.setScreen(self.mainScrubberLine_img);
			self.mainScrubberBarLine_do.setAlpha(0);
			self.mainScrubberBarLine_do.hasTransform3d_bl = false;
			self.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.buttons_ar.push(self.mainScrubber_do);
			
			//add all children
			self.mainScrubber_do.addChild(self.mainScrubberBkLeft_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkMiddle_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkRight_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragLeft_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragMiddle_do);
			self.mainProgress_do.addChild(self.progressLeft_do);
			self.mainProgress_do.addChild(self.progressMiddle_do);
			self.mainScrubber_do.addChild(self.mainProgress_do);
			self.mainScrubber_do.addChild(self.mainScrubberDrag_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainHolder_do.addChild(self.mainScrubber_do);
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.mainScrubber_do.screen.addEventListener("MSPointerOver", self.mainScrubberOnOverHandler);
					self.mainScrubber_do.screen.addEventListener("MSPointerOut", self.mainScrubberOnOutHandler);
					self.mainScrubber_do.screen.addEventListener("MSPointerDown", self.mainScrubberOnDownHandler);
				}else{
					self.mainScrubber_do.screen.addEventListener("touchstart", self.mainScrubberOnDownHandler);
				}
			}else if(self.screen.addEventListener){	
				self.mainScrubber_do.screen.addEventListener("mouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.addEventListener("mouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.addEventListener("mousedown", self.mainScrubberOnDownHandler);
			}else if(self.screen.attachEvent){
				self.mainScrubber_do.screen.attachEvent("onmouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.attachEvent("onmouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.attachEvent("onmousedown", self.mainScrubberOnDownHandler);
			}
			
			self.disableMainScrubber();
			self.updateMainScrubber(0);
		};
		
		this.mainScrubberOnOverHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnOutHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnDownHandler =  function(e){
			if(self.isMainScrubberDisabled_bl || e.button == 2) return;
			parent.showDisable();
			if(e.preventDefault) e.preventDefault();
			self.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
		
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.mainScrubberWidth;
		
			self.updateMainScrubber(percentScrubbed);
			
			self.dispatchEvent(FWDUVPController.START_TO_SCRUB);
			self.dispatchEvent(FWDUVPController.SCRUB, {percent:percentScrubbed});
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.mainScrubberMoveHandler);
					window.addEventListener("MSPointerUp", self.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.mainScrubberMoveHandler);
					window.addEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.mainScrubberMoveHandler);
					window.addEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.attachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/self.mainScrubberWidth;
			self.updateMainScrubber(percentScrubbed);
			self.dispatchEvent(FWDUVPController.SCRUB, {percent:percentScrubbed});
		};
		
		this.mainScrubberEndHandler = function(e){
			parent.hideDisable();
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				self.mainScrubberMoveHandler(e);
			}
			*/
			self.dispatchEvent(FWDUVPController.STOP_TO_SCRUB);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.mainScrubberMoveHandler);
					window.removeEventListener("MSPointerUp", self.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.mainScrubberMoveHandler);
					window.removeEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.disableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = true;
			self.mainScrubber_do.setButtonMode(false);
			self.mainScrubberEndHandler();
			self.updateMainScrubber(0);
			self.updatePreloaderBar(0);
		};
		
		this.enableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = false;
			self.mainScrubber_do.setButtonMode(true);
		};
		
		this.updateMainScrubber = function(percent){
			if(!self.mainScrubber_do) return;
			var finalWidth = parseInt(percent * self.mainScrubberWidth);
			if(isNaN(finalWidth) || finalWidth == undefined) return;
			if(finalWidth < 0) finalWidth = 0;
			
			self.percentPlayed = percent;
			if(!FWDUVPlayer.hasHTML5Video && finalWidth >= self.mainProgress_do.w) finalWidth = self.mainProgress_do.w;
			
			if(finalWidth < 1 && self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = false;
				FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = true;
				FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .5, {alpha:1});
			}
			
			self.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updatePreloaderBar = function(percent){
			if(!self.mainProgress_do) return;
			self.percentLoaded = percent;
			var finalWidth = parseInt(self.percentLoaded * self.mainScrubberWidth); 
			if(isNaN(finalWidth) || finalWidth == undefined) return;
			if(finalWidth < 0) finalWidth = 0;
			
			if(self.percentLoaded >= 0.98){
				self.percentLoaded = 1;
				self.mainProgress_do.setY(-30);
			}else if(self.mainProgress_do.y != 0 && self.percentLoaded!= 1){
				self.mainProgress_do.setY(0);
			}
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			self.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup prev button */
		//################################################//
		this.setupPrevButton = function(){
			FWDUVPSimpleSizeButton.setPrototype();
			self.prevButton_do = new FWDUVPSimpleSizeButton(data.prevN_img.src, data.prevSPath_str, data.prevN_img.width, data.prevN_img.height);
			self.prevButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, self.prevButtonShowTooltipHandler);
			self.prevButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.prevButtonOnMouseUpHandler);
			self.prevButton_do.setY(parseInt((self.stageHeight - self.prevButton_do.h)/2));
			self.buttons_ar.push(self.prevButton_do);
			self.mainHolder_do.addChild(self.prevButton_do); 
		};
		
		this.prevButtonShowTooltipHandler = function(e){
			self.showToolTip(self.prevButton_do, self.prevButtonToolTip_do, e.e);
		};
		
		this.prevButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPPlaylist.PLAY_PREV_VIDEO);
		};
		
		//################################################//
		/* Setup next button */
		//################################################//
		this.setupNextButton = function(){
			FWDUVPSimpleSizeButton.setPrototype();
			self.nextButton_do = new FWDUVPSimpleSizeButton(data.nextN_img.src, data.nextSPath_str, data.nextN_img.width, data.nextN_img.height);
			self.nextButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, self.nextButtonShowTooltipHandler);
			self.nextButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.nextButtonOnMouseUpHandler);
			self.nextButton_do.setY(parseInt((self.stageHeight - self.nextButton_do.h)/2));
			self.buttons_ar.push(self.nextButton_do);
			self.mainHolder_do.addChild(self.nextButton_do);
		};
		
		this.nextButtonShowTooltipHandler = function(e){
			self.showToolTip(self.nextButton_do, self.nextButtonToolTip_do, e.e);
		};
		
		this.nextButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO);
		};
	
		//################################################//
		/* Setup play button */
		//################################################//
		this.setupPlayPauseButton = function(){
			FWDUVPComplexButton.setPrototype();
			self.playPauseButton_do = new FWDUVPComplexButton(
					self.playN_img,
					data.playSPath_str,
					self.pauseN_img,
					data.pauseSPath_str,
					true
			);
			
			self.buttons_ar.push(self.playPauseButton_do);
			self.playPauseButton_do.setY(parseInt((self.stageHeight - self.playPauseButton_do.buttonHeight)/2));
			self.playPauseButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.playButtonShowTooltipHandler);
			self.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.playButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playPauseButton_do);
		};
		
		
		this.playButtonShowTooltipHandler = function(e){
			self.showToolTip(self.playPauseButton_do, self.playPauseToolTip_do, e.e);
		};
		
		this.showPlayButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(1);
		};
		
		this.showPauseButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(0);
		};
		
		this.playButtonMouseUpHandler = function(){
			if(self.playPauseButton_do.currentState == 0){
				self.dispatchEvent(FWDUVPController.PAUSE);
			}else{
				self.dispatchEvent(FWDUVPController.PLAY);
			}
		};
		
		this.disablePlayButton = function(){
			self.playPauseButton_do.disable();
			self.playPauseButton_do.setNormalState();
			self.showPlayButton();
		};
		
		this.enablePlayButton = function(){
			self.playPauseButton_do.enable();
		};
		
		//##########################################//
		/* Setup categories buttons */
		//##########################################//
		this.setupCategoriesButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.categoriesButton_do = new FWDUVPSimpleButton(self.categoriesN_img, data.categoriesSPath_str);
			self.categoriesButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.categoriesButtonShowTooltipHandler);
			self.categoriesButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.categoriesButtonOnMouseUpHandler);
			self.categoriesButton_do.setY(parseInt((self.stageHeight - self.categoriesButton_do.h)/2));
			self.buttons_ar.push(self.categoriesButton_do);
			self.mainHolder_do.addChild(self.categoriesButton_do); 
		};
		
		this.categoriesButtonShowTooltipHandler = function(e){
			self.showToolTip(self.categoriesButton_do, self.playlistsButtonToolTip_do, e.e);
		};
		
		this.categoriesButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_CATEGORIES);
		};
		
		this.setCategoriesButtonState = function(state){	
			if(!self.categoriesButton_do) return;
			if(state == "selected"){
				self.categoriesButton_do.setSelected();
			}else if(state == "unselected"){
				self.categoriesButton_do.setUnselected();
			}
		};
		
		//##########################################//
		/* Setup playlist button */
		//##########################################//
		this.setupPlaylistButton = function(){
			FWDUVPComplexButton.setPrototype();
			self.playlistButton_do = new FWDUVPComplexButton(
					self.hidePlaylistN_img,
					data.hidePlaylistSPath_str,
					self.showPlaylistN_img,
					data.showPlaylistSPath_str,
					true
			);
			
			
			self.buttons_ar.push(self.playlistButton_do);
			self.playlistButton_do.setY(parseInt((self.stageHeight - self.playlistButton_do.buttonHeight)/2));
			self.playlistButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.playlistButtonShowToolTipHandler);
			self.playlistButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.playlistButtonMouseUpHandler);
			if(!self.showPlaylistByDefault_bl) self.playlistButton_do.setButtonState(0);
			self.mainHolder_do.addChild(self.playlistButton_do);
			
		};
		
		this.playlistButtonShowToolTipHandler = function(e){
			self.showToolTip(self.playlistButton_do, self.playlistButtonToolTip_do, e.e);
		};
		
		this.showShowPlaylistButton = function(){
			if(!self.playlistButton_do) return;
			self.playlistButton_do.setButtonState(1);
		};
		
		this.showHidePlaylistButton = function(){
			if(!self.playlistButton_do) return;
			self.playlistButton_do.setButtonState(0);
		};
		
		this.playlistButtonMouseUpHandler = function(){
			if(self.playlistButton_do.currentState == 1){
				self.dispatchEvent(FWDUVPController.SHOW_PLAYLIST);
			}else{
				self.dispatchEvent(FWDUVPController.HIDE_PLAYLIST);
			}
			self.playlistButton_do.setNormalState();
			if(self.playlistButtonToolTip_do) self.playlistButtonToolTip_do.hide();
		};
		
		this.disablePlaylistButton = function(){
			if(self.playlistButton_do){
				self.playlistButton_do.disable();
				self.playlistButton_do.setAlpha(.4);
			}
		};
		
		this.enablePlaylistButton = function(){
			if(self.playlistButton_do){
				self.playlistButton_do.enable();
				self.playlistButton_do.setAlpha(1);
			}
		};
		
		//##########################################//
		/* Setup embed button */
		//#########################################//
		this.setupEmbedButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.embedButton_do = new FWDUVPSimpleButton(self.embedN_img, data.embedPathS_str, undefined, true);
			self.embedButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.embedButtonShowToolTipHandler);
			self.embedButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.embedButtonOnMouseUpHandler);
			self.embedButton_do.setY(parseInt((self.stageHeight - self.embedButton_do.h)/2));
			self.buttons_ar.push(self.embedButton_do);
			self.mainHolder_do.addChild(self.embedButton_do);
		};
		
		this.embedButtonShowToolTipHandler = function(e){
			self.showToolTip(self.embedButton_do, self.embedButtonToolTip_do, e.e);
		};
		
		this.embedButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_EMBED_WINDOW);
			if(self.embedButtonToolTip_do) self.embedButtonToolTip_do.hide();
		};
		
		//###################################################//
		/* Setup youtube quality buttons */
		//###################################################//
		this.setupYtbButtons = function(){
			self.ytbButtonsHolder_do = new FWDUVPDisplayObject("div");
			self.ytbButtonsHolder_do.setOverflow("visible");
			if(self.repeatBackground_bl){
				self.ytbButtonsHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.ytbButtonBackground_do = new FWDUVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.ytbButtonBackground_do.setScreen(img);
				self.ytbButtonsHolder_do.addChild(self.ytbButtonBackground_do);
			}
			
			self.ytbButtonsHolder_do.setX(300);
			self.ytbButtonsHolder_do.setY(-300);
			parent.videoHolder_do.addChild(self.ytbButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = self.ytbQualityButtonPointerPath_str;
			self.pointer_do = new FWDUVPDisplayObject("img");
			self.pointer_do.setScreen(img);
			self.pointer_do.setWidth(self.pointerWidth);
			self.pointer_do.setHeight(self.pointerHeight);
			self.ytbButtonsHolder_do.addChild(self.pointer_do);
	
			
			var img = new Image();
			img.src = self.youtubeQualityArrowPath_str;
			self.ytbQualityArrow_do = new FWDUVPDisplayObject("img");
			self.ytbQualityArrow_do.setScreen(img);
			self.ytbQualityArrow_do.setX(7);
			self.ytbQualityArrow_do.setWidth(5);
			self.ytbQualityArrow_do.setHeight(7);
			self.ytbButtonsHolder_do.addChild(self.ytbQualityArrow_do);
			
			var btn;
			for(var i=0; i<self.totalYtbButtons; i++){
				FWDUVPYTBQButton.setPrototype();
				btn = new FWDUVPYTBQButton(self.ytbQuality_ar[i], 
						self.youtubeQualityButtonNormalColor_str, 
						self.youtubeQualityButtonSelectedColor_str,
						data.hdPath_str);
				btn.addListener(FWDUVPYTBQButton.MOUSE_OVER, self.ytbQualityOver);
				btn.addListener(FWDUVPYTBQButton.MOUSE_OUT, self.ytbQualityOut);
				btn.addListener(FWDUVPYTBQButton.CLICK, self.ytbQualityClick);
				self.ytbButtons_ar[i] = btn;
				self.ytbButtonsHolder_do.addChild(btn);
			}
			self.hideQualityButtons(false);
		};
		
		this.ytbQualityOver = function(e){
			self.setYtbQualityArrowPosition(e.target);
		};
		
		this.ytbQualityOut = function(e){
			self.setYtbQualityArrowPosition(undefined);
		};
		
		this.ytbQualityClick = function(e){
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
			self.dispatchEvent(FWDUVPController.CHANGE_YOUTUBE_QUALITY, {quality:e.target.label_str});
		};
		
		this.positionAndResizeYtbQualityButtons = function(ar){
			if(!ar) return;
			var totalButtons = ar.length + 1;
			if(self.prevYtbQualityButtonsLength == totalButtons) return;
			this.prevYtbQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				btn.setFinalSize();
				for(var k=0; k<totalButtons; k++){
					if(btn.label_str == ar[k]){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
						break;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
			}
			
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				if(btn.dumy_do.w < totalWidth){
					btn.setWidth(totalWidth);
					btn.dumy_do.setWidth(totalWidth);
				}
			}
			
			totalHeight = startY + 5;
			self.pointer_do.setX(parseInt((totalWidth - self.pointer_do.w)/2));
			self.pointer_do.setY(totalHeight);
			if(self.ytbButtonBackground_do){
				self.ytbButtonBackground_do.setWidth(totalWidth);
				self.ytbButtonBackground_do.setHeight(totalHeight);
			}
			self.ytbButtonsHolder_do.setWidth(totalWidth);
			self.ytbButtonsHolder_do.setHeight(totalHeight);
		};
		
		this.disableQualityButtons = function(curQualityLevel){
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				if(btn.label_str == curQualityLevel){
					FWDUVPTweenMax.killTweensOf(self.ytbQualityArrow_do);
					self.ytbQualityArrow_do.setY(btn.y + parseInt((btn.h - self.ytbQualityArrow_do.h)/2) + 1);
					btn.disable();
					self.ytbDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720"){
				self.ytbQualityButton_do.showDisabledState();
			}else{
				self.ytbQualityButton_do.hideDisabledState();
			}
		};
		
		this.setYtbQualityArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = self.ytbDisabledButton_do.y + parseInt((self.ytbDisabledButton_do.h - self.ytbQualityArrow_do.h)/2);
			}else{
				curY = target.y + parseInt((target.h - self.ytbQualityArrow_do.h)/2);
			}
			FWDUVPTweenMax.killTweensOf(self.ytbQualityArrow_do);
			FWDUVPTweenMax.to(self.ytbQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		this.showQualityButtons = function(animate){
			if(self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			
			self.areYtbQualityButtonsShowed_bl = true;
			//var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			//var finalY = parseInt(- self.ytbButtonsHolder_do.h - 6);
			var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			var finalY = parseInt(parent.tempVidStageHeight - self.stageHeight - self.ytbButtonsHolder_do.h - 6);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.hideQualityButtonsHandler);
			}else if(document.attachEvent){
				document.detachEvent("onmousedown", self.hideQualityButtonsHandler);
				document.attachEvent("onmousedown", self.hideQualityButtonsHandler);
			}
			
			self.ytbButtonsHolder_do.setX(finalX);
			
			if(self.isMainScrubberOnTop_bl){
				FWDUVPTweenMax.to(self.mainScrubber_do, .4, {alpha:0, onComplete:function(){self.mainScrubber_do.setX(-5000);}});
			}
		
			if(animate){
				FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(finalY);
			}
		};
	
		this.hideQualityButtons = function(animate){
			if(!self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			self.areYtbQualityButtonsShowed_bl = false;
			if(animate){
				//FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:parent.tempVidStageHeight, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				//self.ytbButtonsHolder_do.setY(self.stageHeight);
				self.ytbButtonsHolder_do.setY(parent.tempVidStageHeight);
			}
			
			if(window.removeEventListener){
				window.removeEventListener("mousedown", self.hideQualityButtonsHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousedown", self.hideQualityButtonsHandler);
			}
		};
		
		//##########################################//
		/* Setup youtube quality button */
		//##########################################//
		this.setupYoutubeQualityButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.ytbQualityButton_do = new FWDUVPSimpleButton(
					self.ytbQualityN_img,
					data.ytbQualitySPath_str,
					data.ytbQualityDPath_str
			);
		
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.setY(parseInt((self.stageHeight - self.ytbQualityButton_do.h)/2));
			self.ytbQualityButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.ytbQualityMouseUpHandler);
			self.mainHolder_do.addChild(self.ytbQualityButton_do);
		};
		
		this.ytbQualityMouseUpHandler = function(){
			if(self.areYtbQualityButtonsShowed_bl){
				self.hideQualityButtons(true);
				if(self.isMainScrubberOnTop_bl){
					self.mainScrubber_do.setX(0);
					FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
				}
			}else{
				self.showQualityButtons(true);
			}
		};
		
		this.hideQualityButtonsHandler = function(e){
			var vc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(FWDUVPUtils.hitTest(self.ytbQualityButton_do.screen, vc.screenX, vc.screenY)
			   || FWDUVPUtils.hitTest(self.ytbButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
		};
		
		this.addYtbQualityButton = function(){
			if(self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = true;
			
			if(self.embedButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do), 0, self.ytbQualityButton_do);
			}else if(self.facebookButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do), 0, self.ytbQualityButton_do);
			}else if(self.fullScreenButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do), 0, self.ytbQualityButton_do);
			}else{
				self.buttons_ar.splice(self.buttons_ar.length, 0, self.ytbQualityButton_do);
			}
			
			self.ytbQualityButton_do.disable();
			self.ytbQualityButton_do.rotation = 0;
			self.ytbQualityButton_do.setRotation(self.ytbQualityButton_do.rotation);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			
			self.positionButtons();
		};
		
		this.removeYtbQualityButton = function(){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = false;
			self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.ytbQualityButton_do), 1);
			
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			self.positionButtons();
		};
		
		this.updateQuality = function(qualityLevels, curQualityLevel){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.ytbQualityButton_do.enable();
			self.positionAndResizeYtbQualityButtons(qualityLevels);
			self.disableQualityButtons(curQualityLevel);
		};	
		
		//##########################################//
		/* Setup info  button */
		//#########################################//
		this.setupInfoButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.infoButton_do = new FWDUVPSimpleButton(self.infoN_img, data.infoSPath_str);
			self.infoButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.infoButtonShowToolTipHandler);
			self.infoButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.infoButtonOnMouseUpHandler);
			self.infoButton_do.setX(-300);
			self.infoButton_do.setY(parseInt((self.stageHeight - self.infoButton_do.h)/2));
			self.mainHolder_do.addChild(self.infoButton_do);
		};
		
		this.infoButtonShowToolTipHandler = function(e){
			self.showToolTip(self.infoButton_do, self.infoButtonToolTip_do, e.e);
		};
		
		this.infoButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_INFO_WINDOW);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		this.setupDownloadButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.downloadButton_do = new FWDUVPSimpleButton(self.downloadN_img, data.downloadSPath_str);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.downloadButtonShowToolTipHandler);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.downloadButtonOnMouseUpHandler);
			self.downloadButton_do.setX(-300);
			self.downloadButton_do.setY(parseInt((self.stageHeight - self.downloadButton_do.h)/2));
			self.mainHolder_do.addChild(self.downloadButton_do);
		};
		
		this.downloadButtonShowToolTipHandler = function(e){
			self.showToolTip(self.downloadButton_do, self.downloadButtonToolTip_do, e.e);
		};
		
		this.downloadButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.DOWNLOAD_VIDEO);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		this.setupDownloadButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.downloadButton_do = new FWDUVPSimpleButton(self.downloadN_img, data.downloadSPath_str);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.downloadButtonShowToolTipHandler);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.downloadButtonOnMouseUpHandler);
			self.downloadButton_do.setX(-300);
			self.downloadButton_do.setY(parseInt((self.stageHeight - self.downloadButton_do.h)/2));
			self.mainHolder_do.addChild(self.downloadButton_do); 
		};
		
		this.downloadButtonShowToolTipHandler = function(e){
			self.showToolTip(self.downloadButton_do, self.downloadButtonToolTip_do, e.e);
		};
		
		this.downloadButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.DOWNLOAD_VIDEO);
		};
		
		//##########################################//
		/* Setup facebook button */
		//##########################################//
		this.setupFacebookButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.facebookButton_do = new FWDUVPSimpleButton(
					self.facebookN_img,
					data.facebookSPath_str
			);
			
			self.buttons_ar.push(self.facebookButton_do);
			self.facebookButton_do.setY(parseInt((self.stageHeight - self.facebookButton_do.h)/2));
			self.facebookButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.facebookButtonShowTooltipHandler);
			self.facebookButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.facebookButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.facebookButton_do);
		};
		
		this.facebookButtonShowTooltipHandler = function(e){
			self.showToolTip(self.facebookButton_do, self.facebookButtonToolTip_do, e.e);
		};
		
	
		this.facebookButtonMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.FACEBOOK_SHARE);
		};

		//##########################################//
		/* Setup fullscreen button */
		//##########################################//
		this.setupFullscreenButton = function(){
			
			FWDUVPComplexButton.setPrototype();
			self.fullScreenButton_do = new FWDUVPComplexButton(
					self.fullScreenN_img,
					data.fullScreenSPath_str,
					self.normalScreenN_img,
					data.normalScreenSPath_str,
					true
			);
			
			self.buttons_ar.push(self.fullScreenButton_do);
			self.fullScreenButton_do.setY(parseInt((self.stageHeight - self.fullScreenButton_do.buttonHeight)/2));
			self.fullScreenButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.fullscreenButtonShowToolTipHandler);
			self.fullScreenButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.fullScreenButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.fullScreenButton_do);
		};
		
		this.fullscreenButtonShowToolTipHandler = function(e){
			self.showToolTip(self.fullScreenButton_do, self.fullscreenButtonToolTip_do, e.e);
		};
		
		this.showFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(1);
		};
		
		this.showNormalScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(0);
		};
		
		this.setNormalStateToFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setNormalState();
			self.hideQualityButtons(false);
		};
		
		this.fullScreenButtonMouseUpHandler = function(){
			if(self.fullscreenButtonToolTip_do) self.fullscreenButtonToolTip_do.hide();
			if(self.fullScreenButton_do.currentState == 1){
				self.dispatchEvent(FWDUVPController.FULL_SCREEN);
			}else{
				self.dispatchEvent(FWDUVPController.NORMAL_SCREEN);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		this.setupTime = function(){
			self.time_do = new FWDUVPDisplayObject("div");
			self.time_do.hasTransform3d_bl = false;
			self.time_do.hasTransform2d_bl = false;
			self.time_do.setBackfaceVisibility();
			self.time_do.getStyle().fontFamily = "Arial";
			self.time_do.getStyle().fontSize= "12px";
			self.time_do.getStyle().whiteSpace= "nowrap";
			self.time_do.getStyle().textAlign = "center";
			self.time_do.getStyle().color = self.timeColor_str;
			self.time_do.getStyle().fontSmoothing = "antialiased";
			self.time_do.getStyle().webkitFontSmoothing = "antialiased";
			self.time_do.getStyle().textRendering = "optimizeLegibility";	
			self.mainHolder_do.addChild(self.time_do);
			self.updateTime("00:00/00:00");
			self.buttons_ar.push(self.time_do);
		};
		
		this.updateTime = function(time){
			if(!self.time_do) return;
			self.time_do.setInnerHTML(time);
			
			if(self.lastTimeLength != time.length){
				self.time_do.w = self.time_do.getWidth();
				self.positionButtons();
				
				setTimeout(function(){
					self.time_do.w = self.time_do.getWidth();
					self.time_do.h = self.time_do.getHeight();
					self.time_do.setY(parseInt((self.stageHeight - self.time_do.h)/2) + 1 + self.timeOffsetTop);
					self.positionButtons();
				}, 50);
				self.lastTimeLength = time.length;
			}
		};
		
		//##########################################//
		/* Setup volume button */
		//#########################################//
		this.setupVolumeButton = function(){
			FWDUVPVolumeButton.setPrototype();
			self.volumeButton_do = new FWDUVPVolumeButton(self.volumeN_img, data.volumeSPath_str, data.volumeDPath_str);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.SHOW_TOOLTIP, self.volumeButtonShowTooltipHandler);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_OVER, self.volumeOnMouseOverHandler);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_UP, self.volumeOnMouseUpHandler);
			self.volumeButton_do.setY(parseInt((self.stageHeight - self.volumeButton_do.h)/2));
			self.buttons_ar.push(self.volumeButton_do);
			self.mainHolder_do.addChild(self.volumeButton_do); 
			if(!self.allowToChangeVolume_bl) self.volumeButton_do.disable();
		};
		
		this.volumeButtonShowTooltipHandler = function(e){
			//self.showToolTip(self.volumeButton_do, self.volumeButtonToolTip_do, e.e);
		};
		
		this.volumeOnMouseOverHandler = function(){
			self.showVolumeScrubber(true);
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				FWDUVPTweenMax.to(self.mainScrubber_do, .4, {alpha:0, onComplete:function(){self.mainScrubber_do.setX(-5000);}});
			}
		};
		
		this.volumeOnMouseUpHandler = function(){
			var vol = self.lastVolume;
			
			if(self.isMute_bl){
				vol = self.lastVolume;
				self.isMute_bl = false;
			}else{
				vol = 0.000001;
				self.isMute_bl = true;
			};
			self.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		this.setupVolumeScrubber = function(){
			
			//setup background bar
			self.volumeScrubberHolder_do = new FWDUVPDisplayObject("div");
			
			if(self.repeatBackground_bl){
				self.volumeBk_do = new FWDUVPDisplayObject("div");
				self.volumeBk_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.volumeBk_do = new FWDUVPDisplayObject("img");
				var volumeBk_img = new Image();
				volumeBk_img.src = self.controllerBkPath_str;
				self.volumeBk_do.setScreen(volumeBk_img);
			}
			self.volumeScrubberHolder_do.addChild(self.volumeBk_do);

			self.volumeScrubber_do = new FWDUVPDisplayObject("div");
			self.volumeScrubber_do.setHeight(self.mainScrubberHeight);
			self.volumeScrubber_do.setY(parseInt(self.volumeScrubberOfsetHeight/2));
			
			var volumeScrubberBkBottom_img = new Image();
			volumeScrubberBkBottom_img.src = data.volumeScrubberBkBottomPath_str;
			self.volumeScrubberBkBottom_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberBkBottom_do.setScreen(volumeScrubberBkBottom_img);
			self.volumeScrubberBkBottom_do.setWidth(self.mainScrubberBkLeft_img.height);
			self.volumeScrubberBkBottom_do.setHeight(self.mainScrubberBkLeft_img.width);
			self.volumeScrubberBkBottom_do.setY(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight - self.volumeScrubberBkBottom_do.h);
		
			var volumeScrubberBkTop_img = new Image();
			volumeScrubberBkTop_img.src = data.volumeScrubberBkTopPath_str;
			self.volumeScrubberBkTop_do = new FWDUVPDisplayObject("img");
			
			self.volumeScrubberBkTop_do.setScreen(volumeScrubberBkTop_img);
			self.volumeScrubberBkTop_do.setWidth(self.volumeScrubberBkBottom_do.w);
			self.volumeScrubberBkTop_do.setHeight(self.volumeScrubberBkBottom_do.h);
			
			var middleImage = new Image();
			middleImage.src = data.volumeScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("div");	
				self.volumeScrubberBkMiddle_do.getStyle().background = "url('" + self.volumeScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
				self.volumeScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.volumeScrubberBkMiddle_do.setWidth(self.volumeScrubberBkBottom_do.w);
			self.volumeScrubberBkMiddle_do.setHeight((self.volumeScrubberHeight - self.volumeScrubberOfsetHeight) - self.volumeScrubberBkTop_do.h * 2);
			self.volumeScrubberBkMiddle_do.setY(self.volumeScrubberBkTop_do.h);
			
			//setup darg bar.
			self.volumeScrubberDrag_do = new FWDUVPDisplayObject("div");
			self.volumeScrubberDrag_do.setWidth(self.volumeScrubberBkBottom_do.w);
		
			var volumeScrubberDragBottom_img = new Image();
			volumeScrubberDragBottom_img.src = data.volumeScrubberDragBottomPath_str;
			self.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberDragBottom_do.setScreen(volumeScrubberDragBottom_img);
			self.volumeScrubberDragBottom_do.setWidth(self.mainScrubberDragLeft_img.height);
			self.volumeScrubberDragBottom_do.setHeight(self.mainScrubberDragLeft_img.width);
			self.volumeScrubberDragBottom_do.setY(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight - self.volumeScrubberDragBottom_do.h);
			
			middleImage = new Image();
			middleImage.src = self.volumeScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div");	
				self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
				self.volumeScrubberDragMiddle_do.setScreen(middleImage);
			}
			
			self.volumeScrubberDragMiddle_do.setWidth(self.volumeScrubberDragBottom_do.w);
			self.volumeScrubberDragMiddle_do.setHeight(self.volumeScrubberHeight);
			
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = data.volumeScrubberLinePath_str;
			self.volumeScrubberBarLine_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			self.volumeScrubberBarLine_do.setWidth(self.mainScrubberLine_img.height);
			self.volumeScrubberBarLine_do.setHeight(self.mainScrubberLine_img.width);
			self.volumeScrubberBarLine_do.setAlpha(0);
			self.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			self.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			self.volumeScrubberHolder_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubberHolder_do.setHeight(self.volumeScrubberHeight + self.stageHeight);
			self.volumeBk_do.setWidth(self.volumeScrubberWidth);
			self.volumeBk_do.setHeight(self.volumeScrubberHeight + self.stageHeight);
			self.volumeScrubber_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubber_do.setHeight(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight);
			
			//add all children
			self.volumeScrubber_do.addChild(self.volumeScrubberBkBottom_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkTop_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDragBottom_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDrag_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubberHolder_do.addChild(self.volumeScrubber_do);
		
			//parent.videoHolder_do.addChild(self.volumeScrubberHolder_do);
			self.addChild(self.volumeScrubberHolder_do);
		
			if(self.allowToChangeVolume_bl){
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.volumeScrubber_do.screen.addEventListener("MSPointerOver", self.volumeScrubberOnOverHandler);
						self.volumeScrubber_do.screen.addEventListener("MSPointerOut", self.volumeScrubberOnOutHandler);
						self.volumeScrubber_do.screen.addEventListener("MSPointerDown", self.volumeScrubberOnDownHandler);
					}else{
						self.volumeScrubber_do.screen.addEventListener("touchstart", self.volumeScrubberOnDownHandler);
					}
				}else if(self.screen.addEventListener){	
					self.volumeScrubber_do.screen.addEventListener("mouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.addEventListener("mouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.addEventListener("mousedown", self.volumeScrubberOnDownHandler);
				}else if(self.screen.attachEvent){
					self.volumeScrubber_do.screen.attachEvent("onmouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.attachEvent("onmouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.attachEvent("onmousedown", self.volumeScrubberOnDownHandler);
				}
			}
			
			self.enableVolumeScrubber();
			self.updateVolumeScrubber(self.volume);
		};
		
		this.volumeScrubberOnOverHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnOutHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnDownHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.volumeScrubberIsDragging_bl = true;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localY = viewportMouseCoordinates.screenY - self.volumeScrubber_do.getGlobalY();
			parent.showDisable();
			if(localY < 0){
				localY = 0;
			}else if(localY > self.volumeScrubber_do.h - self.scrubbersOffsetWidth){
				localY = self.volumeScrubber_do.h - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = 1 - localY/self.volumeScrubber_do.h;

			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.volumeScrubberMoveHandler);
					window.addEventListener("MSPointerUp", self.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.addEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.addEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.attachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.volumeScrubberMoveHandler = function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localY = viewportMouseCoordinates.screenY - self.volumeScrubber_do.getGlobalY();
			
			if(localY < self.scrubbersOffsetWidth){
				localY = self.scrubbersOffsetWidth;
			}else if(localY > self.volumeScrubber_do.h){
				localY = self.volumeScrubber_do.h;
			}
			var percentScrubbed = 1 - localY/self.volumeScrubber_do.h;
		
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
		};
		
		this.volumeScrubberEndHandler = function(){
			parent.hideDisable();
			self.volumeScrubberIsDragging_bl = false;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.volumeScrubberMoveHandler);
					window.removeEventListener("MSPointerUp", self.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.removeEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.detachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.disableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = true;
			self.volumeScrubber_do.setButtonMode(false);
			self.volumeScrubberEndHandler();
		};
		
		this.enableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = false;
			self.volumeScrubber_do.setButtonMode(true);
		};
		
		this.updateVolumeScrubber = function(percent){
			var totalHeight = self.volumeScrubberHeight - self.volumeScrubberOfsetHeight;
			var finalHeight = Math.round(percent * totalHeight); 
			
			self.volumeScrubberDrag_do.setHeight(Math.max(0,finalHeight - self.volumeScrubberDragBottom_do.h));
			self.volumeScrubberDrag_do.setY(totalHeight - finalHeight);
		
			if(finalHeight < 1 && self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = false;
				FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .5, {alpha:0});
				FWDUVPTweenMax.to(self.volumeScrubberDragBottom_do, .5, {alpha:0});
			}else if(finalHeight > 1 && !self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = true;
				FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .5, {alpha:1});
				FWDUVPTweenMax.to(self.volumeScrubberDragBottom_do, .5, {alpha:1});
			}
			
			if(finalHeight > totalHeight) finalHeight = totalHeight;
			
			FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .8, {y:totalHeight - finalHeight - 2, ease:Expo.easeOut});
		};
		
		this.updateVolume = function(volume, preventEvent){
			if(!self.showVolumeScrubber_bl) return;
			self.volume = volume;
			if(self.volume <= 0.000001){
				self.isMute_bl = true;
				self.volume = 0.000001;
			}else if(self.voume >= 1){
				self.isMute_bl = false;
				self.volume = 1;
			}else{
				self.isMute_bl = false;
			}
			
			if(self.volume == 0.000001){
				if(self.volumeButton_do) self.volumeButton_do.setDisabledState();
			}else{
				if(self.volumeButton_do) self.volumeButton_do.setEnabledState();
			}
			
			if(self.volumeScrubberBarLine_do) self.updateVolumeScrubber(self.volume);
			if(!preventEvent) self.dispatchEvent(FWDUVPController.CHANGE_VOLUME, {percent:self.volume});
		};
		
		this.showVolumeScrubber = function(animate){
			if(self.isVolumeScrubberShowed_bl) return;
			self.isVolumeScrubberShowed_bl = true;
			var finalY = - self.volumeScrubberHolder_do.h + self.h;
			self.volumeScrubberHolder_do.setVisible(true);
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.hideVolumeSchubberOnMoveHandler);
			}else if(document.attachEvent){
				document.detachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
				document.attachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
			}
			
			self.volumeScrubberHolder_do.setX(parseInt(self.volumeButton_do.x + (self.volumeButton_do.w - self.volumeScrubberHolder_do.w)/2));
			
			if(animate){
				FWDUVPTweenMax.to(self.volumeScrubberHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.volumeScrubberHolder_do);
				self.volumeScrubberHolder_do.setY(finalY);
			}
		};
		
		this.hideVolumeSchubberOnMoveHandler = function(e){
			var vc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(FWDUVPUtils.hitTest(self.volumeScrubberHolder_do.screen, vc.screenX, vc.screenY)
			   || FWDUVPUtils.hitTest(self.volumeButton_do.screen, vc.screenX, vc.screenY)
			   || self.volumeScrubberIsDragging_bl){
				return;
			}
			self.hideVolumeScrubber(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
		};
	
		this.hideVolumeScrubber = function(animate){
			if(!self.isVolumeScrubberShowed_bl) return;
			self.isVolumeScrubberShowed_bl = false;
			
			self.volumeButton_do.setNormalState(true);
			if(animate){
				FWDUVPTweenMax.to(self.volumeScrubberHolder_do, .6, {y:parent.stageHeight, ease:Expo.easeInOut, onComplete:function(){self.volumeScrubberHolder_do.setVisible(false);}});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.volumeScrubberHolder_do.setY(parent.stageHeight);
				self.volumeScrubberHolder_do.setVisible(false);
			}
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.hideVolumeSchubberOnMoveHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
			}
		};
		
		//###################################//
		/* show / hide */
		//###################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.setX(0);
			if(animate){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			setTimeout(self.positionButtons, 200);
		};
		
		this.hide = function(animate, offset){
			if(!self.isShowed_bl) return;
			if(!offset) offset = 0;
			self.isShowed_bl = false;
			if(animate){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:self.stageHeight + offset, ease:Expo.easeInOut, onComplete:function(){
						if(offset) self.setX(-5000);
					}});
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				if(offset) self.setX(-5000);
				self.mainHolder_do.setY(self.stageHeight + offset);
			}
			self.hideQualityButtons(true);
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPController.setPrototype = function(){
		FWDUVPController.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPController.SHOW_PLAYLIST = "showPlaylist";
	FWDUVPController.HIDE_PLAYLIST = "hidePlaylist";
	FWDUVPController.SHOW_CATEGORIES = "showCategories";
	FWDUVPController.DOWNLOAD_VIDEO = "downloadVideo";
	FWDUVPController.FACEBOOK_SHARE = "share";
	FWDUVPController.FULL_SCREEN = "fullScreen";
	FWDUVPController.NORMAL_SCREEN = "normalScreen";
	FWDUVPController.PLAY = "play";
	FWDUVPController.PAUSE = "pause";
	FWDUVPController.START_TO_SCRUB = "startToScrub";
	FWDUVPController.SCRUB = "scrub";
	FWDUVPController.STOP_TO_SCRUB = "stopToScrub";
	FWDUVPController.CHANGE_VOLUME = "changeVolume";
	FWDUVPController.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality";
	FWDUVPController.SHOW_EMBED_WINDOW = "showEmbedWindow";
	FWDUVPController.SHOW_INFO_WINDOW = "showInfoWindow";
	
	
	FWDUVPController.prototype = null;
	window.FWDUVPController = FWDUVPController;
	
}());/* Data */
(function(window){
	
	var FWDUVPData = function(props, playListElement, parent){
		
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
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.parseProperties();
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(parent){
			
			self.categoriesId_str = self.props_obj.playlistsId;
			if(!self.categoriesId_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>playlistsId</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
				
			
			self.mainFolderPath_str = self.props_obj.mainFolderPath;
			if(!self.mainFolderPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>mainFolderPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
				self.mainFolderPath_str += "/";
			}
			
			self.skinPath_str = self.props_obj.skinPath;
			if(!self.skinPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
				self.skinPath_str += "/";
			}
			
			self.skinPath_str = self.mainFolderPath_str + self.skinPath_str;
			self.flashPath_str = self.mainFolderPath_str + "swf.swf";
			self.flashCopyToCBPath_str = self.mainFolderPath_str + "cb.swf";
			self.proxyPath_str =  self.mainFolderPath_str + "proxy.php";
			self.proxyFolderPath_str = self.mainFolderPath_str  + "proxyFolder.php";
			self.mailPath_str = self.mainFolderPath_str  + "sendMail.php";
			self.sendToAFriendPath_str = self.mainFolderPath_str  + "sendMailToAFriend.php";
			self.videoDownloaderPath_str = self.mainFolderPath_str  + "downloader.php";
			
		
			self.categories_el = document.getElementById(self.categoriesId_str);
			
			if(!self.categories_el){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The playlist with the id <font color='#FFFFFF'>" + self.categoriesId_str + "</font> is not found!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			var catsChildren_ar = FWDUVPUtils.getChildren(self.categories_el);
			self.totalCats = catsChildren_ar.length;	
			
			if(self.totalCats == 0){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "At least one playlist is required!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			
			for(var i=0; i<self.totalCats; i++){
				var obj = {};
				
				var cat_el = null;
				child = catsChildren_ar[i];
				
				if(!FWDUVPUtils.hasAttribute(child, "data-source")){
					setTimeout(function(){
						if(self == null) return;
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-source</font> is required in the plalists html element at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDUVPUtils.hasAttribute(child, "data-thumbnail-path")){
					setTimeout(function(){
						if(self == null) return;
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-thumbnail-path</font> is required in the playlists html element at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				obj.source = FWDUVPUtils.getAttributeValue(child, "data-source");
				
				if(obj.source.indexOf("=") == -1 && obj.source.indexOf(".xml") == -1){
					cat_el = document.getElementById(obj.source);
				}else{
					cat_el = obj.source;
				}
				
				self.catsRef_ar.push(cat_el);
				obj.thumbnailPath = FWDUVPUtils.getAttributeValue(child, "data-thumbnail-path");
			
				obj.htmlContent = child.innerHTML;
				if(FWDUVPUtils.hasAttribute(child, "data-playlist-name")){
					obj.playlistName =  FWDUVPUtils.getAttributeValue(child, "data-playlist-name");
				}else{
					obj.playlistName = "not defined!";
				};
				
				self.cats_ar[i] = obj;
			}
			
			for(var i=0; i<self.totalCats; i++){
				var obj = {};
				var cat_el = null;
				child = catsChildren_ar[i];	
				cat_el = document.getElementById(FWDUVPUtils.getAttributeValue(child, "data-source"));
				
				try{
					cat_el.parentNode.removeChild(cat_el);
				}catch(e){};
			}
			
			try{self.categories_el.parentNode.removeChild(self.categories_el);}catch(e){};
			
			self.startAtPlaylist = self.props_obj.startAtPlaylist || 0;
			if(isNaN(self.startAtPlaylist)) self.startAtPlaylist = 0;
			//if(self.startAtPlaylist != 0) self.startAtPlaylist -= 1;
			if(self.startAtPlaylist < 0){
				self.startAtPlaylist = 0;
			}else if(self.startAtPlaylist > self.totalCats - 1){
				self.startAtPlaylist = self.totalCats - 1;
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
			if(!test) self.playlistPosition_str = "right";		
			
			self.folderVideoLabel_str = self.props_obj.folderVideoLabel || "Video ";
			
			self.logoPosition_str = self.props_obj.logoPosition || "topleft";
			self.logoPosition_str = String(self.logoPosition_str).toLowerCase();
			test = self.logoPosition_str == "topleft" 
					   || self.logoPosition_str == "topright"
					   || self.logoPosition_str == "bottomleft"
					   || self.logoPosition_str == "bottomright"; 
			if(!test) self.logoPosition_str = "topleft";
			
			self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity";
			if(self.thumbnailSelectedType_str != "blackAndWhite"  
				&& self.thumbnailSelectedType_str != "threshold" 
				&& self.thumbnailSelectedType_str != "opacity"){
				self.thumbnailSelectedType_str = "opacity";
			}
			if(self.isMobile_bl || FWDUVPUtils.isIEAndLessThen9)  self.thumbnailSelectedType_str = "opacity";
			if(document.location.protocol == "file:") self.thumbnailSelectedType_str = "opacity";
			
			self.adsButtonsPosition_str = self.props_obj.adsButtonsPosition || "left";
			self.adsButtonsPosition_str = String(self.adsButtonsPosition_str).toLowerCase();
			test = self.adsButtonsPosition_str == "left" 
					   || self.adsButtonsPosition_str == "right";
					 	   
			if(!test) self.adsButtonsPosition_str = "left";
			
			self.skipToVideoButtonText_str = self.props_obj.skipToVideoButtonText || "not defined";
			self.skipToVideoText_str = self.props_obj.skipToVideoText;
			
			self.adsTextNormalColor = self.props_obj.adsTextNormalColor || "#FF0000";
			self.adsTextSelectedColor = self.props_obj.adsTextSelectedColor || "#FF0000";
			self.adsBorderNormalColor_str = self.props_obj.adsBorderNormalColor || "#FF0000";
			self.adsBorderSelectedColor_str = self.props_obj.adsBorderSelectedColor || "#FF0000";
				
			self.volume = self.props_obj.volume;
			if(!self.volume) self.volume = 1;
			if(isNaN(self.volume)) volume = 1;
			if(self.volume > 1 || self.isMobile_bl){
				self.volume = 1;
			}else if(self.volume <0){
				self.volume = 0;
			}
			
			self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
			test = self.rightClickContextMenu_str == "developer" 
				   || self.rightClickContextMenu_str == "disabled"
				   || self.rightClickContextMenu_str == "default";
			if(!test) self.rightClickContextMenu_str = "developer";
			
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
			self.controllerHideDelay *= 1000;
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
			if(self.volumeScrubberHeight > 200) self.volumeScrubberHeight = 200;
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
			
			if(self.isMobile_bl) self.allowToChangeVolume_bl = false;
			
			self.showContextMenu_bl = self.props_obj.showContextMenu; 
			self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
			
			self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTips; 
			self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
			if(self.isMobile_bl) self.showButtonsToolTip_bl = false;
			
			self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTip; 
			self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
			if(self.isMobile_bl) self.showButtonsToolTip_bl = false;
			
			self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport; 
			self.addKeyboardSupport_bl = self.addKeyboardSupport_bl == "no" ? false : true;
			
			self.addMouseWheelSupport_bl = self.props_obj.addMouseWheelSupport; 
			self.addMouseWheelSupport_bl = self.addMouseWheelSupport_bl == "no" ? false : true;
		
			self.autoPlay_bl = self.props_obj.autoPlay; 
			self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
			if(FWDUVPUtils.isMobile) self.autoPlay_bl = false;
			
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
			if(self.isMobile_bl) self.showVolumeButton_bl = false;
			
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
			
			self.openNewPageAtTheEndOfTheAds_bl =  self.props_obj.openNewPageAtTheEndOfTheAds;
			self.openNewPageAtTheEndOfTheAds_bl = self.openNewPageAtTheEndOfTheAds_bl == "yes" ? true : false;
			
			self.playAdsOnlyOnce_bl =  self.props_obj.playAdsOnlyOnce;
			self.playAdsOnlyOnce_bl = self.playAdsOnlyOnce_bl == "yes" ? true : false;
			
			self.startAtRandomVideo_bl =  self.props_obj.startAtRandomVideo;
			self.startAtRandomVideo_bl = self.startAtRandomVideo_bl == "yes" ? true : false;
			
			self.stopVideoWhenPlayComplete_bl =  self.props_obj.stopVideoWhenPlayComplete;
			self.stopVideoWhenPlayComplete_bl = self.stopVideoWhenPlayComplete_bl == "yes" ? true : false;
			
			
			if(self.showFacebookButton_bl && !self.facebookAppId_str){
				setTimeout(function(){
					if(self == null) return;
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Parameter <font color='#FFFFFF'>facebookAppId</font> is required in the constructor, this represents the facebook app id, for more info read the documetation"});
				}, 50);
				return;
			}
			
			self.showYoutubeQualityButton_bl = self.props_obj.showYoutubeQualityButton; 
			self.showYoutubeQualityButton_bl = self.showYoutubeQualityButton_bl == "no" ? false : true;
			if(FWDUVPlayer.useYoutube == "no" || self.isMobile_bl) self.showYoutubeQualityButton_bl = false;
			
			self.logoPath_str = self.skinPath_str + "logo.png";
			if(self.props_obj.logoPath) self.logoPath_str = self.props_obj.logoPath;
			
			self.mainPreloader_img = new Image();
			self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler;
			self.mainPreloader_img.onload = self.onPreloaderLoadHandler;
			self.mainPreloader_img.src = self.skinPath_str + "preloader.png";
			
			self.skinPaths_ar = [
			     {img:self.prevN_img = new Image(), src:self.skinPath_str + "prev-video.png"},
                 {img:self.nextN_img = new Image(), src:self.skinPath_str + "next-video.png"},
                 {img:self.playN_img = new Image(), src:self.skinPath_str + "play.png"},
                 {img:self.pauseN_img = new Image(), src:self.skinPath_str + "pause.png"},
                 {img:self.mainScrubberBkLeft_img = new Image(), src:self.skinPath_str + "scrubber-left-background.png"},
                 {img:self.mainScrubberDragLeft_img = new Image(), src:self.skinPath_str + "scrubber-left-drag.png"},
                 {img:self.mainScrubberLine_img = new Image(), src:self.skinPath_str + "scrubber-line.png"},
                 {img:self.volumeN_img = new Image(), src:self.skinPath_str + "volume.png"},
                 {img:self.progressLeft_img = new Image(), src:self.skinPath_str + "progress-left.png"},
                 {img:self.largePlayN_img = new Image(), src:self.skinPath_str + "large-play.png"},
                 {img:self.categoriesN_img = new Image(), src:self.skinPath_str + "categories-button.png"},
                 {img:self.replayN_img = new Image(), src:self.skinPath_str + "replay-button.png"},
                 {img:self.shuffleN_img = new Image(), src:self.skinPath_str + "shuffle-button.png"},
                 {img:self.fullScreenN_img = new Image(), src:self.skinPath_str + "full-screen.png"},
                 {img:self.ytbQualityN_img = new Image(), src:self.skinPath_str + "youtube-quality.png"},
                 {img:self.facebookN_img = new Image(), src:self.skinPath_str + "facebook.png"},
                 {img:self.infoN_img = new Image(), src:self.skinPath_str + "info-button.png"},
                 {img:self.downloadN_img = new Image(), src:self.skinPath_str + "download-button.png"},
                 {img:self.normalScreenN_img = new Image(), src:self.skinPath_str + "normal-screen.png"},
                 {img:self.embedN_img = new Image(), src:self.skinPath_str + "embed.png"},
                 {img:self.embedColoseN_img = new Image(), src:self.skinPath_str + "embed-close-button.png"},
                 {img:self.skipIconPath_img = new Image(), src:self.skinPath_str + "skip-icon.png"}
			];
			
			//setup skin paths
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
			
			if(self.showPlaylistsButtonAndPlaylists_bl){
				self.skinPaths_ar.push(
				    {img:self.catNextN_img = new Image(), src:self.skinPath_str + "categories-next-button.png"},
				    {img:self.catPrevN_img = new Image(), src:self.skinPath_str + "categories-prev-button.png"},
				    {img:self.catCloseN_img = new Image(), src:self.skinPath_str + "categories-close-button.png"},
				    {img:new Image(), src:self.skinPath_str + "categories-background.png"}
				);
				self.catBkPath_str = self.skinPath_str + "categories-background.png"; 
				self.catThumbBkPath_str = self.skinPath_str + "categories-thumbnail-background.png"; 
				self.catThumbBkTextPath_str = self.skinPath_str + "categories-thumbnail-text-backgorund.png"; 
				self.catNextSPath_str = self.skinPath_str + "categories-next-button-over.png"; 
				self.catPrevSPath_str = self.skinPath_str + "categories-prev-button-over.png"; 
				self.catCloseSPath_str = self.skinPath_str + "categories-close-button-over.png"; 
			}
			
			if(self.showPlaylistButtonAndPlaylist_bl){
				var prevThumbsSetNPath_str;
				
				self.playlistThumbnailsBkPath_str = self.skinPath_str + "playlist-thumbnail-background.png";
				self.playlistBkPath_str = self.skinPath_str + "playlist-background.png";
				
				if(self.playlistPosition_str == "bottom"){
					self.skinPaths_ar.push(
					    {img:self.hidePlaylistN_img = new Image(), src:self.skinPath_str + "hide-horizontal-playlist.png"},
					    {img:self.showPlaylistN_img = new Image(), src:self.skinPath_str + "show-horizontal-playlist.png"}
					);
					self.hidePlaylistSPath_str = self.skinPath_str + "hide-horizontal-playlist-over.png"; 
					self.showPlaylistSPath_str = self.skinPath_str + "show-horizontal-playlist-over.png"; 
				}else{
					self.skinPaths_ar.push(
					    {img:self.hidePlaylistN_img = new Image(), src:self.skinPath_str + "hide-vertical-playlist.png"},
					    {img:self.showPlaylistN_img = new Image(), src:self.skinPath_str + "show-vertical-playlist.png"}
					);
					self.hidePlaylistSPath_str = self.skinPath_str + "hide-vertical-playlist-over.png"; 
					self.showPlaylistSPath_str = self.skinPath_str + "show-vertical-playlist-over.png"; 
				}
				
				self.skinPaths_ar.push(
				    {img:self.scrBkTop_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-background-top.png"},
				    {img:self.scrDragTop_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-drag-top.png"},
				    {img:self.scrLinesN_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-lines.png"}
				);
				
				self.scrBkMiddlePath_str = self.skinPath_str + "playlist-scrollbar-background-middle.png";
				self.scrBkBottomPath_str = self.skinPath_str + "playlist-scrollbar-background-bottom.png";
				self.scrDragMiddlePath_str = self.skinPath_str + "playlist-scrollbar-drag-middle.png";
				self.scrDragBottomPath_str = self.skinPath_str + "playlist-scrollbar-drag-bottom.png";
				self.scrLinesSPath_str = self.skinPath_str + "playlist-scrollbar-lines-over.png";
				self.inputArrowPath_str = self.skinPath_str + "input-arrow.png";
			}
			
			self.totalGraphics = self.skinPaths_ar.length;
			self.loadSkin();
		};
		
		//####################################//
		/* Preloader load done! */
		//###################################//
		this.onPreloaderLoadHandler = function(){
			setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PRELOADER_LOAD_DONE);
			}, 50);
		};
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<self.totalGraphics; i++){
				img = self.skinPaths_ar[i].img;
				src = self.skinPaths_ar[i].src;
				img.onload = self.onSkinLoadHandler;
				img.onerror = self.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		this.onSkinLoadHandler = function(e){
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages == self.totalGraphics){
				setTimeout(function(){
					self.dispatchEvent(FWDUVPData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		self.onSkinLoadErrorHandler = function(e){
			if (FWDUVPUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FFFFFF'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, err);
			}, 50);
		};
		
		//##########################################//
		/* Download video */
		//##########################################//
		this.downloadVideo = function(sourcePath, pName){
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Downloading video files local is not allowed or possible! To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(!sourcePath){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Not allowed to download this video!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(String(sourcePath.indexOf(".mp4")) == -1){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Only mp4 video files hosted on your server can be downloaded."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			pName = pName.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
			if(pName.length > 40) pName = pName.substr(0, 40) + "...";
			if(!(/\.(video)$/i).test(pName)) pName+='.mp4';
		
			if(sourcePath.indexOf("http:") == -1){
				
				var path_ar = sourcePath.split(",");
				sourcePath = path_ar[0];
		
				sourcePath = sourcePath.substr(sourcePath.indexOf("/") + 1);
				sourcePath = encodeURIComponent(sourcePath);
			};
			
			var url = self.videoDownloaderPath_str;
			if(!self.dlIframe){
				self.dlIframe = document.createElement("IFRAME");
				self.dlIframe.style.display = "none";
				document.documentElement.appendChild(self.dlIframe);
			}
			
			if(self.isMobile_bl){
			
				var email = self.getValidEmail();
				if(!email) return;
				
				if(self.emailXHR != null){
					try{self.emailXHR.abort();}catch(e){}
					self.emailXHR.onreadystatechange = null;
					self.emailXHR.onerror = null;
					self.emailXHR = null;
				}
				
				self.emailXHR = new XMLHttpRequest();
				
				self.emailXHR.onreadystatechange = function(e){
					if(self.emailXHR.readyState == 4){
						if(self.emailXHR.status == 200){
							if(self.emailXHR.responseText == "sent"){
								alert("Email sent.");
							}else{
								alert("Error sending email, this is a server side error, the php file can't send the email!");
							}
							
						}else{
							alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText);
						}
					}
				};
				
				self.emailXHR.onerror = function(e){
					try{
						if(window.console) console.log(e);
						if(window.console) console.log(e.message);
					}catch(e){};
					alert("Error sending email: " + e.message);
				};

				self.emailXHR.open("get", self.mailPath_str + "?mail=" + email + "&name=" + pName + "&path=" + sourcePath, true);
				self.emailXHR.send();
				return;
			}
		
			self.dlIframe.src = url + "?path="+ sourcePath +"&name=" + pName;
		};
		
		this.getValidEmail = function(){
			var email = prompt("Please enter your email address where the video download link will be sent:");
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
			while(!emailRegExp.test(email) || email == ""){
				if(email === null) return;
				email = prompt("Please enter a valid email address:");
			}
			return email;
		};
		
		//####################################//
		/* load playlist */
		//####################################//
		this.loadPlaylist = function(id){
			self.stopToLoadPlaylist();
			
			if(self.isPlaylistDispatchingError_bl) return;
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			var source = self.catsRef_ar[id];
		
			if(source === undefined){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"<font color='#FFFFFF'>loadPlaylist()</font> - Please specify a DOM playlist id or youtube playlist id!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(source === null){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"The playlist with id <font color='#FFFFFF'>" + self.cats_ar[id].source + "</font> is not found in the DOM."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
		
			if(!isNaN(source)){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"<font color='#FFFFFF'>loadPlaylist()</font> - The parameter must be of type string!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			self.resetYoutubePlaylistLoader();
			self.isYoutbe_bl = false;
			
			if(!source.length){
				self.parseDOMPlaylist(source, self.cats_ar[id].source);	
			}else if(source.indexOf("list=") != -1 && self.useYoutube_bl){
				self.isYoutbe_bl = true;
				self.loadYoutubePlaylist(source);
			}else if(source.indexOf("list=") != -1 && !self.useYoutube_bl){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Loading youtube playlist is only possible if <font color='#FFFFFF'>FWDUVPlayer.useYoutube=\"yes\"</font>."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}else if(source.indexOf("folder=") != -1){
				self.loadFolderPlaylist(source);
			}else if(source.indexOf(".xml") != -1
			  || source.indexOf("http:") != -1
			  || source.indexOf("https:") != -1
			  || source.indexOf("www.") != -1
			){
				self.loadXMLPlaylist(source);
			}
		};
		
		//#######################################//
		/* load XML playlist (warning this will will work only online on a web server,
		 * it is not working local!) */
		//######################################//
		this.loadXMLPlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Loading XML files local is not allowed or possible!. To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			
			self.loadFromFolder_bl = false;
			self.sourceURL_str = url;
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.proxyPath_str + "?url=" +  self.sourceURL_str + "&rand=" + parseInt(Math.random() * 99999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"XML file can't be loaded! <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. " + message });
			}
		};
		
		//#######################################//
		/* load folder */
		//######################################//
		this.loadFolderPlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Creating a video playlist from a folder is not allowed or possible local! To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}	
			
			
			self.loadFromFolder_bl = true;
			self.sourceURL_str = url.substr(url.indexOf("=") + 1);
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.proxyFolderPath_str + "?dir=" +  encodeURIComponent(self.sourceURL_str) + "&videoLabel=" + self.folderVideoLabel_str  + "&rand=" + parseInt(Math.random() * 9999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"});
			}
		};
		
		//##########################################//
		/* load youtube list */
		//##########################################//
		this.loadYoutubePlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl && !self.isYoutbe_bl) return;
			
			if(!self.youtubeUrl_str){
				url = url.substr(url.indexOf("=") + 1);
				self.youtubeUrl_str = url;
			}
		
			
			self.loadFromFolder_bl = true;
			
			if(self.nextPageToken_str){
				self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist";
			}else{
				self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist";
			}
			
			if(self.scs_el == null){
				try{
					self.scs_el = document.createElement('script');
					self.scs_el.src = self.sourceURL_str;
					self.scs_el.id = parent.instanceName_str + ".data.parseYoutubePlaylist";
					document.documentElement.appendChild(self.scs_el);
				}catch(e){}
			}
			self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 6000);
		
		};
		
		this.JSONPRequestTimeoutError = function(){
			self.stopToLoadPlaylist();
			self.isPlaylistDispatchingError_bl = true;
			showLoadPlaylistErrorId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading youtube playlist!<font color='#FFFFFF'>" + self.youtubeUrl_str + "</font>"});
				self.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		
		this.resetYoutubePlaylistLoader = function(){
			self.isYoutbe_bl = false;
			self.youtubeObject_ar = null;
			self.nextPageToken_str = null;
			self.youtubeUrl_str = null;
		};
		
		//######################################//
		/* Handle ajax response */
		//######################################//
		this.ajaxOnErrorHandler = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			if(self.loadFromFolder_bl){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file : <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"});
			}else{
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file : <font color='#FFFFFF'>" + self.proxyPath_str + "</font>. Make sure the path is correct"});
			}
		};
		
		this.ajaxOnLoadHandler = function(e){
			var response;
			var isXML = false;
			
			if(self.xhr.readyState == 4){
				if(self.xhr.status == 404){
					if(self.loadFromFolder_bl){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"});
					}else{
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Proxy file path is not found: <font color='#FFFFFF'>" + self.proxyPath_str + "</font>"});
					}
					
				}else if(self.xhr.status == 408){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Proxy file request load timeout!"});
				}else if(self.xhr.status == 200){
					if(self.xhr.responseText.indexOf("<b>Warning</b>:") != -1){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading folder: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"});
						return;
					}
					
					if(window.JSON){
						response = JSON.parse(self.xhr.responseText);
					}else{
						response = eval('('+ self.xhr.responseText +')');
					}
					
					if(response.folder){
						self.parseFolderJSON(response);
					}else if(response.li){
						self.parseXML(response);
					}else if(response.error){//this applies only with proxy (xml and poscast)
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"});
					}
				}
			}
		};
		
		this.parseYoutubePlaylist = function(object){
			
			if(self.isPlaylistDispatchingError_bl || !self.isYoutbe_bl) return;
			
			if(object.error){
				self.JSONPRequestTimeoutError();
				if(console) console.dir(object);
				return;
			}
			
			self.playlist_ar = [];
			var tt;
			var item;
			var videoSource;
			
			if(!self.youtubeObject_ar){
				self.youtubeObject_ar = [];
			}
			
			for(var i=0; i<object.items.length; i++){
				self.youtubeObject_ar.push(object.items[i]);
			}
			
			tt = self.youtubeObject_ar.length;
			
			self.stopToLoadPlaylist();
			
			if(object.nextPageToken && tt < self.maxPlaylistItems){
				self.nextPageToken_str = object.nextPageToken;
				self.loadYoutubePlaylist();
				return;
			}
			
			for(var i=0; i< tt; i++){
				if(i > self.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = self.youtubeObject_ar[i];
				obj.videoSource = item.snippet.resourceId.videoId;
				obj.owner = item.snippet.channelTitle;
		
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + item.snippet.title + "</p>";
				obj.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + obj.owner + "</p>";
				
				obj.titleText = item.snippet.title;
				obj.desc = undefined;
				
				obj.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + item.snippet.title + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + item.snippet.description + "</p>";
			
				obj.downloadable = false;
				try{
					obj.thumbSource = item.snippet.thumbnails["default"].url;
				}catch(e){}
				obj.posterSource =  "none";
				
				if(item.snippet.title.indexOf("eleted video") == -1 && item.snippet.title.indexOf("his video is unavailable") == -1){
					self.playlist_ar.push(obj);
				}
			}
			
			/*
			for(var i=0; i< tt; i++){
				if(i > self.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = object[i];
				
				videoSource = item.link[1].href.split("/");
				videoSource = videoSource[videoSource.length - 2];
				obj.videoSource = videoSource;
				try{obj.owner = item.media$group.media$credit[0].yt$display;}catch(e){};
				
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + item.title.$t + "</p>";
				if(obj.owner) obj.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + obj.owner + "</p>";
				
				obj.titleText = item.title.$t;
				obj.desc = undefined;
				
				try{
					obj.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + obj.titleText + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + item.media$group.media$description.$t + "</p>";
				}catch(e){};
				
				
				obj.downloadable = false;
				obj.thumbSource = "http://img.youtube.com/vi/"+ videoSource +"/default.jpg";
				obj.posterSource =  "none";
				
				if(item.link[1].href.indexOf("related") != -1 
				   && item.yt$accessControl[5].permission != "denied"){
					self.playlist_ar.push(obj);
				}
			}
			*/
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		this.closeJsonPLoader = function(){
			clearTimeout(self.JSONPRequestTimeoutId_to);
		};
		
		//##########################################//
		/* parse DOM playlist */
		//##########################################//
		this.parseDOMPlaylist = function(element, id){
			if(self.isPlaylistDispatchingError_bl) return;
		
			var children_ar = FWDUVPUtils.getChildren(element);
			var totalChildren = children_ar.length;
			var child;
			self.playlist_ar = [];
			
			if(totalChildren == 0){
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"At least one video is required in the playlist with id: <font color='#FFFFFF'>" + id + "</font>"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			for(var i=0; i<totalChildren; i++){
				var obj = {};
				var adsObj;
				child = children_ar[i];
				
				if(!FWDUVPUtils.hasAttribute(child, "data-thumb-source")){
					self.isPlaylistDispatchingError_bl = true;
					showLoadPlaylistErrorId_to = setTimeout(function(){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-thumb-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDUVPUtils.hasAttribute(child, "data-video-source")){
					self.isPlaylistDispatchingError_bl = true;
					showLoadPlaylistErrorId_to = setTimeout(function(){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-video-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(i > self.maxPlaylistItems - 1) break;
				
				obj.thumbSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-thumb-source"));
				obj.videoSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-video-source"));
				if(FWDUVPUtils.hasAttribute(child, "data-poster-source")){
					obj.posterSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-poster-source"));
				}else{
					obj.posterSource = "none";
				}

				obj.downloadPath = obj.videoSource;
				
				if(FWDUVPUtils.hasAttribute(child, "data-downloadable") && self.showDownloadVideoButton_bl){
					obj.downloadable = FWDUVPUtils.getAttributeValue(child, "data-downloadable") == "yes" ? true : false;
					if(obj.videoSource.indexOf(".") ==  -1)  obj.downloadable = false;
				}else{
					obj.downloadable = false;
				}
			
				var descChidren_ar = FWDUVPUtils.getChildren(child);
				var descChild;
				obj.title = "not defined!";
				obj.titleText = "not defined!";
				
				for(var k=0; k<descChidren_ar.length; k++){
					descChild = descChidren_ar[k];	
					if(FWDUVPUtils.hasAttribute(descChild, "data-video-short-description")){
						obj.title =  descChild.innerHTML;
						if(FWDUVPUtils.isIEAndLessThen9){
							obj.titleText = descChild.innerText;
						}else{
							obj.titleText = descChild.textContent;
						}
						
					}else if(FWDUVPUtils.hasAttribute(descChild, "data-video-long-description")){
						obj.desc = descChild.innerHTML;
					}
				}
				
				if(FWDUVPUtils.hasAttribute(child, "data-ads-source")){
					adsObj = {};
					adsObj.source = FWDUVPUtils.getAttributeValue(child, "data-ads-source");
					adsObj.pageToOpen = FWDUVPUtils.getAttributeValue(child, "data-ads-page-to-open-url");
					adsObj.pageTarget = FWDUVPUtils.getAttributeValue(child, "data-ads-page-target") || "_blank";
					adsObj.timeToHoldAds = parseInt(FWDUVPUtils.getAttributeValue(child, "data-time-to-hold-ads")) || 0;
					obj.ads = adsObj;
				}
			
				self.playlist_ar[i] = obj;
			}
					
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* parse folder JSON */
		//####################################//
		this.parseFolderJSON = function(response){
			self.playlist_ar = [];
			var obj;
			var obj_ar = response.folder;
			var counter = 0;
		
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.videoSource = encodeURI(obj_ar[i]["@attributes"]["data-video-path"]);
				obj.thumbSource = encodeURI(obj_ar[i]["@attributes"]["data-thumb-path"]);
				obj.posterSource = encodeURI(obj_ar[i]["@attributes"]["data-poster-path"]);
				obj.downloadPath = encodeURIComponent(obj_ar[i]["@attributes"]["download-path"]);
				
				obj.downloadable = self.showDownloadVideoButton_bl;
				if(self.forceDisableDownloadButtonForFolder_bl) obj.downloadable = false;
				
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + obj_ar[i]["@attributes"]["data-title"] + "</p>";
				
				obj.desc = undefined;
				
				self.playlist_ar[i] = obj;
				if(i > self.maxPlaylistItems - 1) break;
			}
			
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* parse xml JSON */
		//####################################//
		this.parseXML = function(response){
			self.playlist_ar = [];
			var obj;
			var obj_ar = response.li;
			
			if(!obj_ar.length) obj_ar = [obj_ar];
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				
				obj.videoSource = encodeURI(obj_ar[i]["@attributes"]["data-video-source"]);
				obj.downloadPath = obj.videoSource;
				obj.downloadable = obj_ar[i]["@attributes"]["data-downloadable"] == "yes" ? true : false;
				if(obj.videoSource.indexOf(".") == -1) obj.downloadable = false;
				obj.posterSource = encodeURI(obj_ar[i]["@attributes"]["data-poster-source"]);
				obj.thumbSource = obj_ar[i]["@attributes"]["data-thumb-source"];
				obj.title = obj_ar[i]["@attributes"]["data-title"];
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.desc = obj_ar[i]["@attributes"]["data-desc"];
				
				if(obj_ar[i]["@attributes"]["data-ads-source"]){
					adsObj = {};
					adsObj.source = obj_ar[i]["@attributes"]["data-ads-source"];
					adsObj.pageToOpen = obj_ar[i]["@attributes"]["data-ads-page-to-open-url"];
					adsObj.pageTarget = obj_ar[i]["@attributes"]["data-ads-page-target"] || "_blank";
					adsObj.timeToHoldAds = obj_ar[i]["@attributes"]["data-time-to-hold-ads"]  || 0;
					obj.ads = adsObj;
				}
			
				self.playlist_ar[i] = obj;
				if(i > self.maxPlaylistItems - 1) break;
			}
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* stop to load current playlist... */
		//####################################//
		this.stopToLoadPlaylist = function(){
			self.closeJsonPLoader();
			try{
				self.scs_el.src = null;
				document.documentElement.removeChild(self.scs_el);
				self.scs_el = null;
			}catch(e){}
			
			if(self.xhr != null){
				try{self.xhr.abort();}catch(e){}
				self.xhr.onreadystatechange = null;
				self.xhr.onerror = null;
				self.xhr = null;
			}
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"The property called <font color='#FFFFFF'>" + error + "</font> is not defined."});
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPData.setPrototype = function(){
		FWDUVPData.prototype = new FWDUVPEventDispatcher();
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
	
	window.FWDUVPData = FWDUVPData;
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDUVPDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas" || "input"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
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
		
		this.hasTransform3d_bl =  FWDUVPUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDUVPUtils.hasTransform2d;
		if(FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) self.hasTransform3d_bl = false;
		if(FWDUVPUtils.isFirefox || FWDUVPUtils.isIE) self.hasTransform2d_bl = false;
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = null;
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";	
			self.screen.style.MozImageRendering = "optimizeSpeed";	
			self.screen.style.WebkitImageRendering = "optimizeSpeed";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}else{
				if(FWDUVPUtils.isFirefox || FWDUVPUtils.isIE){
					self.screen.style.userSelect = "element";
					self.screen.style.MozUserSelect = "element";
					self.screen.style.msUserSelect = "element";
				}else if(FWDUVPUtils.isSafari){
					self.screen.style.userSelect = "text";
					self.screen.style.webkitUserSelect = "text";
				}else{
					self.screen.style.userSelect = "all";
					self.screen.style.webkitUserSelect = "all";
				}
				
				self.screen.style.khtmlUserSelect = "all";
				self.screen.style.oUserSelect = "all";
				
				if(FWDUVPUtils.isIEAndLessThen9){
					self.screen.ondragstart = null;
					self.screen.onselectstart = null;
					self.screen.ontouchstart = null;
				}else{
					self.screen.ondragstart = undefined;
					self.screen.onselectstart = undefined;
					self.screen.ontouchstart = undefined;
				}
				
				self.screen.style.webkitTouchCallout='default';
				self.hasBeenSetSelectable_bl = false;
			}
			
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
				self.screen.style.width = self.w + "px";
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		self.getWidth = function(){
			if(self.type == "div" || self.type == "input"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
				self.screen.style.height = self.h + "px";
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div" || self.type == "input"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDUVPUtils.indexOfArray(self.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		self.addChildAt = function(e, index){
			if(self.getNumChildren() == 0){
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else if(index == 1){
				self.screen.insertBefore(e.screen, self.children_ar[0].screen);
				self.screen.insertBefore(self.children_ar[0].screen, e.screen);	
				if(self.contains(e)){
					self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDUVPUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Error("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.removeChildAtZero = function(){
			self.screen.removeChild(self.children_ar[0].screen);
			self.children_ar.shift();
		};
		
		self.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		self.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    self.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    self.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.listeners = [];
			self.listeners = null;
			self.children_ar = [];
			self.children_ar = null;
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDUVPDisplayObject = FWDUVPDisplayObject;
}(window));if (typeof asual == "undefined") {
    var asual = {}
}
if (typeof asual.util == "undefined") {
    asual.util = {}
}
asual.util.Browser = new function () {
    var b = navigator.userAgent.toLowerCase(),
        a = /webkit/.test(b),
        e = /opera/.test(b),
        c = /msie/.test(b) && !/opera/.test(b),
        d = /mozilla/.test(b) && !/(compatible|webkit)/.test(b),
        f = parseFloat(c ? b.substr(b.indexOf("msie") + 4) : (b.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function () {
        return "[class Browser]"
    };
    this.getVersion = function () {
        return f
    };
    this.isMSIE = function () {
        return c
    };
    this.isSafari = function () {
        return a
    };
    this.isOpera = function () {
        return e
    };
    this.isMozilla = function () {
        return d
    }
};
asual.util.Events = new function () {
    var c = "DOMContentLoaded",
        j = "onstop",
        k = window,
        h = document,
        b = [],
        a = asual.util,
        e = a.Browser,
        d = e.isMSIE(),
        g = e.isSafari();
    this.toString = function () {
        return "[class Events]"
    };
    this.addListener = function (n, l, m) {
        b.push({
            o: n,
            t: l,
            l: m
        });
        if (!(l == c && (d || g))) {
            if (n.addEventListener) {
                n.addEventListener(l, m, false)
            } else {
                if (n.attachEvent) {
                    n.attachEvent("on" + l, m)
                }
            }
        }
    };
    this.removeListener = function (p, m, n) {
        for (var l = 0, o; o = b[l]; l++) {
            if (o.o == p && o.t == m && o.l == n) {
                b.splice(l, 1);
                break
            }
        }
        if (!(m == c && (d || g))) {
            if (p.removeEventListener) {
                p.removeEventListener(m, n, false)
            } else {
                if (p.detachEvent) {
                    p.detachEvent("on" + m, n)
                }
            }
        }
    };
    var i = function () {
        for (var m = 0, l; l = b[m]; m++) {
            if (l.t != c) {
                a.Events.removeListener(l.o, l.t, l.l)
            }
        }
    };
    var f = function () {
        if (h.readyState == "interactive") {
            function l() {
                h.detachEvent(j, l);
                i()
            }
            h.attachEvent(j, l);
            k.setTimeout(function () {
                h.detachEvent(j, l)
            }, 0)
        }
    };
    if (d || g) {
        (function () {
            try {
                if ((d && h.body) || !/loaded|complete/.test(h.readyState)) {
                    h.documentElement.doScroll("left")
                }
            } catch (m) {
                return setTimeout(arguments.callee, 0)
            }
            for (var l = 0, m; m = b[l]; l++) {
                if (m.t == c) {
                    m.l.call(null)
                }
            }
        })()
    }
    if (d) {
        k.attachEvent("onbeforeunload", f)
    }
    this.addListener(k, "unload", i)
};
asual.util.Functions = new function () {
    this.toString = function () {
        return "[class Functions]"
    };
    this.bind = function (f, b, e) {
        for (var c = 2, d, a = []; d = arguments[c]; c++) {
            a.push(d)
        }
        return function () {
            return f.apply(b, a)
        }
    }
};
var FWDAddressEvent = function (d) {
    this.toString = function () {
        return "[object FWDAddressEvent]"
    };
    this.type = d;
    this.target = [FWDAddress][0];
    this.value = FWDAddress.getValue();
    this.path = FWDAddress.getPath();
    this.pathNames = FWDAddress.getPathNames();
    this.parameters = {};
    var c = FWDAddress.getParameterNames();
    for (var b = 0, a = c.length; b < a; b++) {
        this.parameters[c[b]] = FWDAddress.getParameter(c[b])
    }
    this.parameterNames = c
};
FWDAddressEvent.INIT = "init";
FWDAddressEvent.CHANGE = "change";
FWDAddressEvent.INTERNAL_CHANGE = "internalChange";
FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function () {
        var _getHash = function () {
            var index = _l.href.indexOf("#");
            return index != -1 ? _ec(_dc(_l.href.substr(index + 1))) : ""
        };
        var _getWindow = function () {
            try {
                top.document;
                return top
            } catch (e) {
                return window
            }
        };
        var _strictCheck = function (value, force) {
            if (_opts.strict) {
                value = force ? (value.substr(0, 1) != "/" ? "/" + value : value) : (value == "" ? "/" : value)
            }
            return value
        };
        var _ieLocal = function (value, direction) {
            return (_msie && _l.protocol == "file:") ? (direction ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?")) : value
        };
        var _searchScript = function (el) {
            if (el.childNodes) {
                for (var i = 0, l = el.childNodes.length, s; i < l; i++) {
                    if (el.childNodes[i].src) {
                        _url = String(el.childNodes[i].src)
                    }
                    if (s = _searchScript(el.childNodes[i])) {
                        return s
                    }
                }
            }
        };
        var _titleCheck = function () {
            if (_d.title != _title && _d.title.indexOf("#") != -1) {
                _d.title = _title
            }
        };
        var _listen = function () {
            if (!_silent) {
                var hash = _getHash();
                var diff = !(_value == hash);
                if (_safari && _version < 523) {
                    if (_length != _h.length) {
                        _length = _h.length;
                        if (typeof _stack[_length - 1] != UNDEFINED) {
                            _value = _stack[_length - 1]
                        }
                        _update.call(this, false)
                    }
                } else {
                    if (_msie && diff) {
                        if (_version < 7) {
                            _l.reload()
                        } else {
                            this.setValue(hash)
                        }
                    } else {
                        if (diff) {
                            _value = hash;
                            _update.call(this, false)
                        }
                    }
                } if (_msie) {
                    _titleCheck.call(this)
                }
            }
        };
        var _bodyClick = function (e) {
            if (_popup.length > 0) {
                var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
                if (typeof _popup[3] != UNDEFINED) {
                    eval(_popup[3])
                }
            }
            _popup = []
        };
        var _swfChange = function () {
            for (var i = 0, id, obj, value = FWDAddress.getValue(), setter = "setFWDAddressValue"; id = _ids[i]; i++) {
                obj = document.getElementById(id);
                if (obj) {
                    if (obj.parentNode && typeof obj.parentNode.so != UNDEFINED) {
                        obj.parentNode.so.call(setter, value)
                    } else {
                        if (!(obj && typeof obj[setter] != UNDEFINED)) {
                            var objects = obj.getElementsByTagName("object");
                            var embeds = obj.getElementsByTagName("embed");
                            obj = ((objects[0] && typeof objects[0][setter] != UNDEFINED) ? objects[0] : ((embeds[0] && typeof embeds[0][setter] != UNDEFINED) ? embeds[0] : null))
                        }
                        if (obj) {
                            obj[setter](value)
                        }
                    }
                } else {
                    if (obj = document[id]) {
                        if (typeof obj[setter] != UNDEFINED) {
                            obj[setter](value)
                        }
                    }
                }
            }
        };
        var _jsDispatch = function (type) {
            this.dispatchEvent(new FWDAddressEvent(type));
            type = type.substr(0, 1).toUpperCase() + type.substr(1);
            if (typeof this["on" + type] == FUNCTION) {
                this["on" + type]()
            }
        };
        var _jsInit = function () {
            if (_util.Browser.isSafari()) {
                _d.body.addEventListener("click", _bodyClick)
            }
            _jsDispatch.call(this, "init")
        };
        var _jsChange = function () {
            _swfChange();
            _jsDispatch.call(this, "change")
        };
        var _update = function (internal) {
            _jsChange.call(this);
            if (internal) {
                _jsDispatch.call(this, "internalChange")
            } else {
                _jsDispatch.call(this, "externalChange")
            }
            _st(_functions.bind(_track, this), 10)
        };
        var _track = function () {
            var value = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, "");
            var fn = _t[_opts.tracker];
            if (typeof fn == FUNCTION) {
                fn(value)
            } else {
                if (typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION) {
                    _t.pageTracker._trackPageview(value)
                } else {
                    if (typeof _t.urchinTracker == FUNCTION) {
                        _t.urchinTracker(value)
                    }
                }
            }
        };
        var _htmlWrite = function () {
            var doc = _frame.contentWindow.document;
            doc.open();
            doc.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";<\/script></head></html>');
            doc.close()
        };
        var _htmlLoad = function () {
            var win = _frame.contentWindow;
            var src = win.location.href;
            _value = (typeof win[ID] != UNDEFINED ? win[ID] : "");
            if (_value != _getHash()) {
                _update.call(FWDAddress, false);
                _l.hash = _ieLocal(_value, TRUE)
            }
        };
        var _load = function () {
            if (!_loaded) {
                _loaded = TRUE;
                if (_msie && _version < 8) {
                    var frameset = _d.getElementsByTagName("frameset")[0];
                    _frame = _d.createElement((frameset ? "" : "i") + "frame");
                    if (frameset) {
                        frameset.insertAdjacentElement("beforeEnd", _frame);
                        frameset[frameset.cols ? "cols" : "rows"] += ",0";
                        _frame.src = "javascript:false";
                        _frame.noResize = true;
                        _frame.frameBorder = _frame.frameSpacing = 0
                    } else {
                        _frame.src = "javascript:false";
                        _frame.style.display = "none";
                        _d.body.insertAdjacentElement("afterBegin", _frame)
                    }
                    _st(function () {
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
                _st(_functions.bind(function () {
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
            _listeners = {}, _value = _getHash(),
            _opts = {
                history: TRUE,
                strict: TRUE
            };
        if (_msie && _d.documentMode && _d.documentMode != _version) {
            _version = _d.documentMode != 8 ? 7 : 8
        }
        _supported = (_mozilla && _version >= 1) || (_msie && _version >= 6) || (_opera && _version >= 9.5) || (_safari && _version >= 312);
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
                        _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1]) != 0))
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
            if ((!_supported && _l.href.indexOf("#") != -1) || (_safari && _version < 418 && _l.href.indexOf("#") != -1 && _l.search != "")) {
                _d.open();
                _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>');
                _d.close()
            } else {
                _track()
            }
        }
        this.toString = function () {
            return "[class FWDAddress]"
        };
        this.back = function () {
            _h.back()
        };
        this.forward = function () {
            _h.forward()
        };
        this.up = function () {
            var path = this.getPath();
            this.setValue(path.substr(0, path.lastIndexOf("/", path.length - 2) + (path.substr(path.length - 1) == "/" ? 1 : 0)))
        };
        this.go = function (delta) {
            _h.go(delta)
        };
        this.href = function (url, target) {
            target = typeof target != UNDEFINED ? target : "_self";
            if (target == "_self") {
                self.location.href = url
            } else {
                if (target == "_top") {
                    _l.href = url
                } else {
                    if (target == "_blank") {
                        window.open(url)
                    } else {
                        _t.frames[target].location.href = url
                    }
                }
            }
        };
        this.popup = function (url, name, options, handler) {
            try {
                var popup = window.open(url, name, eval(options));
                if (typeof handler != UNDEFINED) {
                    eval(handler)
                }
            } catch (ex) {}
            _popup = arguments
        };
        this.getIds = function () {
            return _ids
        };
        this.getId = function (index) {
            return _ids[0]
        };
        this.setId = function (id) {
            _ids[0] = id
        };
        this.addId = function (id) {
            this.removeId(id);
            _ids.push(id)
        };
        this.removeId = function (id) {
            for (var i = 0; i < _ids.length; i++) {
                if (id == _ids[i]) {
                    _ids.splice(i, 1);
                    break
                }
            }
        };
        this.addEventListener = function (type, listener) {
            if (typeof _listeners[type] == UNDEFINED) {
                _listeners[type] = []
            }
            _listeners[type].push(listener)
        };
        this.removeEventListener = function (type, listener) {
            if (typeof _listeners[type] != UNDEFINED) {
                for (var i = 0, l; l = _listeners[type][i]; i++) {
                    if (l == listener) {
                        break
                    }
                }
                _listeners[type].splice(i, 1)
            }
        };
        this.dispatchEvent = function (event) {
            if (this.hasEventListener(event.type)) {
                event.target = this;
                for (var i = 0, l; l = _listeners[event.type][i]; i++) {
                    l(event)
                }
                return TRUE
            }
            return FALSE
        };
        this.hasEventListener = function (type) {
            return (typeof _listeners[type] != UNDEFINED && _listeners[type].length > 0)
        };
        this.getBaseURL = function () {
            var url = _l.href;
            if (url.indexOf("#") != -1) {
                url = url.substr(0, url.indexOf("#"))
            }
            if (url.substr(url.length - 1) == "/") {
                url = url.substr(0, url.length - 1)
            }
            return url
        };
        this.getStrict = function () {
            return _opts.strict
        };
        this.setStrict = function (strict) {
            _opts.strict = strict
        };
        this.getHistory = function () {
            return _opts.history
        };
        this.setHistory = function (history) {
            _opts.history = history
        };
        this.getTracker = function () {
            return _opts.tracker
        };
        this.setTracker = function (tracker) {
            _opts.tracker = tracker
        };
        this.getTitle = function () {
            return _d.title
        };
        this.setTitle = function (title) {
            if (!_supported) {
                return null
            }
            if (typeof title == UNDEFINED) {
                return
            }
            if (title == "null") {
                title = ""
            }
            title = _dc(title);
            _st(function () {
                _title = _d.title = title;
                if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                    _frame.contentWindow.document.title = title;
                    _juststart = FALSE
                }
                if (!_justset && _mozilla) {
                    _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#")
                }
                _justset = FALSE
            }, 10)
        };
        this.getStatus = function () {
            return _t.status
        };
        this.setStatus = function (status) {
            if (!_supported) {
                return null
            }
            if (typeof status == UNDEFINED) {
                return
            }
            if (status == "null") {
                status = ""
            }
            status = _dc(status);
            if (!_safari) {
                status = _strictCheck((status != "null") ? status : "", TRUE);
                if (status == "/") {
                    status = ""
                }
                if (!(/http(s)?:\/\//.test(status))) {
                    var index = _l.href.indexOf("#");
                    status = (index == -1 ? _l.href : _l.href.substr(0, index)) + "#" + status
                }
                _t.status = status
            }
        };
        this.resetStatus = function () {
            _t.status = ""
        };
        this.getValue = function () {
            if (!_supported) {
                return null
            }
            return _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE))
        };
        this.setValue = function (value) {
            if (!_supported) {
                return null
            }
            if (typeof value == UNDEFINED) {
                return
            }
            if (value == "null") {
                value = ""
            }
            value = _ec(_dc(_strictCheck(value, TRUE)));
            if (value == "/") {
                value = ""
            }
            if (_value == value) {
                return
            }
            _justset = TRUE;
            _value = value;
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
                            var evt = _d.createEvent("MouseEvents");
                            evt.initEvent("click", TRUE, TRUE);
                            var anchor = _d.createElement("a");
                            anchor.href = "#" + _value;
                            anchor.dispatchEvent(evt)
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
            } if ((_msie && _version < 8) && _opts.history) {
                _st(_htmlWrite, 50)
            }
            if (_safari) {
                _st(function () {
                    _silent = FALSE
                }, 1)
            } else {
                _silent = FALSE
            }
        
        };
        this.getPath = function () {
            var value = this.getValue();
            if (value.indexOf("?") != -1) {
                return value.split("?")[0]
            } else {
                if (value.indexOf("#") != -1) {
                    return value.split("#")[0]
                } else {
                    return value
                }
            }
        };
        this.getPathNames = function () {
            var path = this.getPath(),
                names = path.split("/");
            if (path.substr(0, 1) == "/" || path.length == 0) {
                names.splice(0, 1)
            }
            if (path.substr(path.length - 1, 1) == "/") {
                names.splice(names.length - 1, 1)
            }
            return names
        };
        this.getQueryString = function () {
            var value = this.getValue(),
                index = value.indexOf("?");
            if (index != -1 && index < value.length) {
                return value.substr(index + 1)
            }
        };
        this.getParameter = function (param) {
            var value = this.getValue();
            var index = value.indexOf("?");
            if (index != -1) {
                value = value.substr(index + 1);
                var p, params = value.split("&"),
                    i = params.length,
                    r = [];
                while (i--) {
                    p = params[i].split("=");
                    if (p[0] == param) {
                        r.push(p[1])
                    }
                }
                if (r.length != 0) {
                    return r.length != 1 ? r : r[0]
                }
            }
        };
        this.getParameterNames = function () {
            var value = this.getValue();
            var index = value.indexOf("?");
            var names = [];
            if (index != -1) {
                value = value.substr(index + 1);
                if (value != "" && value.indexOf("=") != -1) {
                    var params = value.split("&"),
                        i = 0;
                    while (i < params.length) {
                        names.push(params[i].split("=")[0]);
                        i++
                    }
                }
            }
            return names
        };
        this.onInit = null;
        this.onChange = null;
        this.onInternalChange = null;
        this.onExternalChange = null;
        (function () {
            var _args;
            if (typeof FlashObject != UNDEFINED) {
                SWFObject = FlashObject
            }
            if (typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
                var _s1 = SWFObject.prototype.write;
                SWFObject.prototype.write = function () {
                    _args = arguments;
                    if (this.getAttribute("version").major < 8) {
                        this.addVariable("$swfaddress", FWDAddress.getValue());
                        ((typeof _args[0] == "string") ? document.getElementById(_args[0]) : _args[0]).so = this
                    }
                    var success;
                    if (success = _s1.apply(this, _args)) {
                        _ref.addId(this.getAttribute("id"))
                    }
                    return success
                }
            }
            if (typeof swfobject != UNDEFINED) {
                var _s2r = swfobject.registerObject;
                swfobject.registerObject = function () {
                    _args = arguments;
                    _s2r.apply(this, _args);
                    _ref.addId(_args[0])
                };
                var _s2c = swfobject.createSWF;
                swfobject.createSWF = function () {
                    _args = arguments;
                    var swf = _s2c.apply(this, _args);
                    if (swf) {
                        _ref.addId(_args[0].id)
                    }
                    return swf
                };
                var _s2e = swfobject.embedSWF;
                swfobject.embedSWF = function () {
                    _args = arguments;
                    if (typeof _args[8] == UNDEFINED) {
                        _args[8] = {}
                    }
                    if (typeof _args[8].id == UNDEFINED) {
                        _args[8].id = _args[1]
                    }
                    _s2e.apply(this, _args);
                    _ref.addId(_args[8].id)
                }
            }
            if (typeof UFO != UNDEFINED) {
                var _u = UFO.create;
                UFO.create = function () {
                    _args = arguments;
                    _u.apply(this, _args);
                    _ref.addId(_args[0].id)
                }
            }
            if (typeof AC_FL_RunContent != UNDEFINED) {
                var _a = AC_FL_RunContent;
                AC_FL_RunContent = function () {
                    _args = arguments;
                    _a.apply(this, _args);
                    for (var i = 0, l = _args.length; i < l; i++) {
                        if (_args[i] == "id") {
                            _ref.addId(_args[i + 1])
                        }
                    }
                }
            }
        })()
    };/* Info screen */
(function (window){
	
	var FWDUVPEmbedWindow = function(data, parent){
		
		var self = this;
		var prototype = FWDUVPEmbedWindow.prototype;
		
		this.xhr = null;
		
		this.embedColoseN_img = data.embedColoseN_img;
		
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
		this.embedWindowBackground_str = data.embedWindowBackground_str;
		this.embedWindowInputBackgroundPath_str = data.embedWindowInputBackgroundPath_str;
		this.secondaryLabelsColor_str = data.secondaryLabelsColor_str;
		this.inputColor_str = data.inputColor_str;
		this.mainLabelsColor_str = data.mainLabelsColor_str;
		this.sendButtonNPath_str = data.sendButtonNPath_str;
		this.sendButtonSPath_str = data.sendButtonSPath_str;
		this.inputBackgroundColor_str = data.inputBackgroundColor_str;
		this.borderColor_str = data.borderColor_str;
		this.sendToAFriendPath_str = data.sendToAFriendPath_str;
		
		this.maxTextWidth = 0;
		this.totalWidth = 0;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.buttonWidth = 44;
		this.buttonHeight = 19;
		this.embedWindowCloseButtonMargins = data.embedWindowCloseButtonMargins;
	
		this.finalEmbedPath_str = null;
		this.finalEmbedCode_str = null;
		this.linkToVideo_str = null;
		this.shareAndEmbedTextColor_str = data.shareAndEmbedTextColor_str;
		
		this.isSending_bl = false;
		this.isShowed_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
	
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setBackfaceVisibility();
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			
			self.bk_do = new FWDUVPDisplayObject("div");
			self.bk_do.getStyle().width = "100%";
			self.bk_do.getStyle().height = "100%";
			self.bk_do.setAlpha(.9);
			self.bk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
		
			//setup link and embed text
			self.linkAndEmbedHolder_do =  new FWDUVPDisplayObject("div");
			
			self.linkAndEmbedHolderBk_do = new FWDUVPDisplayObject("div");
			self.linkAndEmbedHolderBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.linkAndEmbedHolderBk_do.getStyle().borderStyle = "solid";
			self.linkAndEmbedHolderBk_do.getStyle().borderWidth = "1px";
			self.linkAndEmbedHolderBk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.embedAndLinkMainLabel_do = new FWDUVPDisplayObject("div");
			self.embedAndLinkMainLabel_do.setBackfaceVisibility();
			self.embedAndLinkMainLabel_do.getStyle().fontFamily = "Arial";
			self.embedAndLinkMainLabel_do.getStyle().fontSize= "12px";
			self.embedAndLinkMainLabel_do.getStyle().color = self.mainLabelsColor_str;
			self.embedAndLinkMainLabel_do.getStyle().whiteSpace= "nowrap";
			self.embedAndLinkMainLabel_do.getStyle().fontSmoothing = "antialiased";
			self.embedAndLinkMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedAndLinkMainLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.embedAndLinkMainLabel_do.getStyle().padding = "0px";
			self.embedAndLinkMainLabel_do.setInnerHTML("SHARE & EMBED");	
			
			self.linkLabel_do = new FWDUVPDisplayObject("div");
			self.linkLabel_do.setBackfaceVisibility();
			self.linkLabel_do.getStyle().fontFamily = "Arial";
			self.linkLabel_do.getStyle().fontSize= "12px";
			self.linkLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.linkLabel_do.getStyle().whiteSpace= "nowrap";
			self.linkLabel_do.getStyle().fontSmoothing = "antialiased";
			self.linkLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.linkLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.linkLabel_do.getStyle().padding = "0px";
			self.linkLabel_do.setInnerHTML("Link to this video:");	
			
			self.linkText_do = new FWDUVPDisplayObject("div");
			self.linkText_do.setBackfaceVisibility();
			self.linkText_do.getStyle().fontFamily = "Arial";
			self.linkText_do.getStyle().fontSize= "12px";
			self.linkText_do.getStyle().color = self.shareAndEmbedTextColor_str;
			if(!FWDUVPUtils.isIEAndLessThen9) self.linkText_do.getStyle().wordBreak = "break-all";
			self.linkText_do.getStyle().fontSmoothing = "antialiased";
			self.linkText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.linkText_do.getStyle().textRendering = "optimizeLegibility";
			self.linkText_do.getStyle().padding = "6px";
			self.linkText_do.getStyle().paddingTop = "4px";
			self.linkText_do.getStyle().paddingBottom = "4px";
			self.linkText_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.linkText_do.screen.onclick = selectText;
			
			self.embedLabel_do = new FWDUVPDisplayObject("div");
			self.embedLabel_do.setBackfaceVisibility();
			self.embedLabel_do.getStyle().fontFamily = "Arial";
			self.embedLabel_do.getStyle().fontSize= "12px";
			self.embedLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.embedLabel_do.getStyle().whiteSpace= "nowrap";
			self.embedLabel_do.getStyle().fontSmoothing = "antialiased";
			self.embedLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.embedLabel_do.getStyle().padding = "0px";
			self.embedLabel_do.setInnerHTML("Embed this video:");
			
			self.embedText_do = new FWDUVPDisplayObject("div");
			self.embedText_do.setBackfaceVisibility();
			if(!FWDUVPUtils.isIEAndLessThen9) self.embedText_do.getStyle().wordBreak = "break-all";
			self.embedText_do.getStyle().fontFamily = "Arial";
			self.embedText_do.getStyle().fontSize= "12px";
			self.embedText_do.getStyle().lineHeight = "16px";
			self.embedText_do.getStyle().color = self.shareAndEmbedTextColor_str;
			self.embedText_do.getStyle().fontSmoothing = "antialiased";
			self.embedText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.embedText_do.getStyle().textRendering = "optimizeLegibility";
			self.embedText_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.embedText_do.getStyle().padding = "6px";
			self.embedText_do.getStyle().paddingTop = "4px";
			self.embedText_do.getStyle().paddingBottom = "4px";
			self.embedText_do.screen.onclick = selectText;
		
			//setup flash buttons
			FWDUVPFlashButton.setPrototype();
			self.copyLinkButton_do = new FWDUVPFlashButton(
					data.embedCopyButtonNPath_str,
					data.embedCopyButtonSPath_str,
					data.flashCopyToCBPath_str,
					parent.instanceName_str + "copyLink",
					parent.instanceName_str + ".copyLinkButtonOnMouseOver",
					parent.instanceName_str + ".copyLinkButtonOnMouseOut",
					parent.instanceName_str + ".copyLinkButtonOnMouseClick",
					parent.instanceName_str + ".getLinkCopyPath",
					self.buttonWidth,
					self.buttonHeight);
			self.copyLinkButton_do.addListener(FWDUVPFlashButton.CLICK, self.showFlashButtonInstallError);
			
			FWDUVPFlashButton.setPrototype();
			self.copyEmbedButton_do = new FWDUVPFlashButton(
					data.embedCopyButtonNPath_str,
					data.embedCopyButtonSPath_str,
					data.flashCopyToCBPath_str,
					parent.instanceName_str + "embedCode",
					parent.instanceName_str + ".embedkButtonOnMouseOver",
					parent.instanceName_str + ".embedButtonOnMouseOut",
					parent.instanceName_str + ".embedButtonOnMouseClick",
					parent.instanceName_str + ".getEmbedCopyPath",
					self.buttonWidth,
					self.buttonHeight);
			self.copyEmbedButton_do.addListener(FWDUVPFlashButton.CLICK, self.showFlashButtonInstallError);
			
			

			//setup send to a friend
			self.sendMainHolder_do =  new FWDUVPDisplayObject("div");
			
			self.sendMainHolderBk_do = new FWDUVPDisplayObject("div");
			self.sendMainHolderBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.sendMainHolderBk_do.getStyle().borderStyle = "solid";
			self.sendMainHolderBk_do.getStyle().borderWidth = "1px";
			self.sendMainHolderBk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.sendMainLabel_do = new FWDUVPDisplayObject("div");
			self.sendMainLabel_do.setBackfaceVisibility();
			self.sendMainLabel_do.getStyle().fontFamily = "Arial";
			self.sendMainLabel_do.getStyle().fontSize= "12px";
			self.sendMainLabel_do.getStyle().color = self.mainLabelsColor_str;
			self.sendMainLabel_do.getStyle().whiteSpace= "nowrap";
			self.sendMainLabel_do.getStyle().fontSmoothing = "antialiased";
			self.sendMainLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.sendMainLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.sendMainLabel_do.getStyle().padding = "0px";
			self.sendMainLabel_do.setInnerHTML("SEND TO A FRIEND");	
			
			self.yourEmailLabel_do = new FWDUVPDisplayObject("div");
			self.yourEmailLabel_do.setBackfaceVisibility();
			self.yourEmailLabel_do.getStyle().fontFamily = "Arial";
			self.yourEmailLabel_do.getStyle().fontSize= "12px";
			self.yourEmailLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.yourEmailLabel_do.getStyle().whiteSpace= "nowrap";
			self.yourEmailLabel_do.getStyle().fontSmoothing = "antialiased";
			self.yourEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.yourEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.yourEmailLabel_do.getStyle().padding = "0px";
			self.yourEmailLabel_do.setInnerHTML("Your email:");
			
			self.yourEmailInput_do = new FWDUVPDisplayObject("input");
			self.yourEmailInput_do.setBackfaceVisibility();
			self.yourEmailInput_do.getStyle().fontFamily = "Arial";
			self.yourEmailInput_do.getStyle().fontSize= "12px";
			self.yourEmailInput_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.yourEmailInput_do.getStyle().color = self.inputColor_str;
			self.yourEmailInput_do.getStyle().outline = 0;
			self.yourEmailInput_do.getStyle().whiteSpace= "nowrap";
			self.yourEmailInput_do.getStyle().fontSmoothing = "antialiased";
			self.yourEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
			self.yourEmailInput_do.getStyle().textRendering = "optimizeLegibility";
			self.yourEmailInput_do.getStyle().padding = "6px";
			self.yourEmailInput_do.getStyle().paddingTop = "4px";
			self.yourEmailInput_do.getStyle().paddingBottom = "4px";
			
			self.friendEmailLabel_do = new FWDUVPDisplayObject("div");
			self.friendEmailLabel_do.setBackfaceVisibility();
			self.friendEmailLabel_do.getStyle().fontFamily = "Arial";
			self.friendEmailLabel_do.getStyle().fontSize= "12px";
			self.friendEmailLabel_do.getStyle().color = self.secondaryLabelsColor_str;
			self.friendEmailLabel_do.getStyle().whiteSpace= "nowrap";
			self.friendEmailLabel_do.getStyle().fontSmoothing = "antialiased";
			self.friendEmailLabel_do.getStyle().webkitFontSmoothing = "antialiased";
			self.friendEmailLabel_do.getStyle().textRendering = "optimizeLegibility";
			self.friendEmailLabel_do.getStyle().padding = "0px";
			self.friendEmailLabel_do.setInnerHTML("Your friend's email:");
			
			self.friendEmailInput_do = new FWDUVPDisplayObject("input");
			self.friendEmailInput_do.setBackfaceVisibility();
			self.friendEmailInput_do.getStyle().fontFamily = "Arial";
			self.friendEmailInput_do.getStyle().fontSize= "12px";
			self.friendEmailInput_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.friendEmailInput_do.getStyle().color = self.inputColor_str;
			self.friendEmailInput_do.getStyle().outline= 0;
			self.friendEmailInput_do.getStyle().whiteSpace= "nowrap";
			self.friendEmailInput_do.getStyle().fontSmoothing = "antialiased";
			self.friendEmailInput_do.getStyle().webkitFontSmoothing = "antialiased";
			self.friendEmailInput_do.getStyle().textRendering = "optimizeLegibility";
			self.friendEmailInput_do.getStyle().padding = "6px";
			self.friendEmailInput_do.getStyle().paddingTop = "4px";
			self.friendEmailInput_do.getStyle().paddingBottom = "4px";	
			
			FWDUVPSimpleSizeButton.setPrototype();
			self.sendButton_do = new FWDUVPSimpleSizeButton(
					self.sendButtonNPath_str, 
					self.sendButtonSPath_str,
					self.buttonWidth,
					self.buttonHeight
					);
			self.sendButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.sendClickHandler);
			
		
			self.infoText_do = new FWDUVPDisplayObject("div");
			self.infoText_do.setBackfaceVisibility();
			self.infoText_do.getStyle().fontFamily = "Arial";
			self.infoText_do.getStyle().fontSize= "12px";
			self.infoText_do.getStyle().color = self.secondaryLabelsColor_str;
			self.infoText_do.getStyle().whiteSpace= "nowrap";
			self.infoText_do.getStyle().fontSmoothing = "antialiased";
			self.infoText_do.getStyle().webkitFontSmoothing = "antialiased";
			self.infoText_do.getStyle().textRendering = "optimizeLegibility";
			self.infoText_do.getStyle().padding = "0px";
			self.infoText_do.getStyle().paddingTop = "4px";
			self.infoText_do.getStyle().textAlign = "center";
			self.infoText_do.getStyle().color = self.mainLabelsColor_str;
			
			//setup close button
			FWDUVPSimpleButton.setPrototype();
			self.closeButton_do = new FWDUVPSimpleButton(self.embedColoseN_img, data.embedWindowClosePathS_str);
			self.closeButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			self.addChild(self.mainHolder_do);
			self.mainHolder_do.addChild(self.bk_do);
			
			self.linkAndEmbedHolder_do.addChild(self.linkAndEmbedHolderBk_do);
			self.linkAndEmbedHolder_do.addChild(self.embedAndLinkMainLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.linkLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.linkText_do);
			self.linkAndEmbedHolder_do.addChild(self.embedLabel_do);
			self.linkAndEmbedHolder_do.addChild(self.embedText_do);
			self.linkAndEmbedHolder_do.addChild(self.copyLinkButton_do);
			self.linkAndEmbedHolder_do.addChild(self.copyEmbedButton_do);
			
			self.sendMainHolder_do.addChild(self.sendMainHolderBk_do);
			self.sendMainHolder_do.addChild(self.sendMainLabel_do);
			self.sendMainHolder_do.addChild(self.yourEmailLabel_do);
			self.sendMainHolder_do.addChild(self.yourEmailInput_do);
			self.sendMainHolder_do.addChild(self.friendEmailLabel_do);
			self.sendMainHolder_do.addChild(self.friendEmailInput_do);
			self.sendMainHolder_do.addChild(self.sendButton_do);
			
			self.mainHolder_do.addChild(self.linkAndEmbedHolder_do);
			self.mainHolder_do.addChild(self.sendMainHolder_do);
			
			self.mainHolder_do.addChild(self.closeButton_do); 
		};
	
		this.closeButtonOnMouseUpHandler = function(){
			if(!self.isShowed_bl) return;
			self.hide();
		};
		
		this.showFlashButtonInstallError = function(){
			var error = "Please install Adobe Flash Player in order to use this feature! To copy text in the clipboard currently flash is the only safe option. <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Click here to install</a>. <br><br>The video link or embed code can be copyed by selecting the text, right click and copy.";
			self.dispatchEvent(FWDUVPEmbedWindow.ERROR, {error:error});
		};
		
		function selectText(){
			if(window.top != window && FWDUVPUtils.isIE) return;
			var range, selection;
			if (document.body.createTextRange) {
				range = document.body.createTextRange();
			    range.moveToElementText(this);
			    range.select();
			}else if(window.getSelection && document.createRange) {
			    selection = window.getSelection();
			    range = document.createRange();
			    range.selectNodeContents(this);
			    selection.removeAllRanges();
			    selection.addRange(range);
			}
		};
		
		this.positionAndResize = function(){
			self.stageWidth = parent.stageWidth;
			if(parent.displayType == FWDUVPlayer.FULL_SCREEN){
				self.stageHeight = parent.tempVidStageHeight;
			}else{
				self.stageHeight = parent.tempVidStageHeight;
			}
			
			
			self.maxTextWidth = Math.min(self.stageWidth - 150, 500);
			self.totalWidth = self.maxTextWidth + self.buttonWidth + 40;
			
			if(self.isMobile_bl){
				self.linkText_do.setWidth(self.maxTextWidth + 52);
				self.embedText_do.setWidth(self.maxTextWidth + 52);
			}else{
				self.linkText_do.setWidth(self.maxTextWidth);
				self.embedText_do.setWidth(self.maxTextWidth);
			}
			
			self.positionFinal();
			
			self.closeButton_do.setX(self.stageWidth - self.closeButton_do.w - self.embedWindowCloseButtonMargins);
			self.closeButton_do.setY(self.embedWindowCloseButtonMargins);
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
		};
		
		this.positionFinal = function(){
			
			var totalHeight;
			var isEmbeddedAndFScreenOnIE11Bug_bl = false;
			
			if(self.stageHeight < 360 || self.stageWidth < 350){
				self.linkText_do.getStyle().whiteSpace= "nowrap";
				self.embedText_do.getStyle().whiteSpace= "nowrap";
			}else{
				self.linkText_do.getStyle().whiteSpace = "normal";
				self.embedText_do.getStyle().whiteSpace= "normal";
			}
			
			if(self.linkLabel_do.screen.offsetHeight < 6) isEmbeddedAndFScreenOnIE11Bug_bl = true;
			
			var embedAndLinkMainLabelHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				embedAndLinkMainLabelHeight = Math.round(self.embedAndLinkMainLabel_do.screen.getBoundingClientRect().height * 100);
			}else{
				embedAndLinkMainLabelHeight = self.embedAndLinkMainLabel_do.getHeight();
			}
			self.embedAndLinkMainLabel_do.setX(16);
			self.linkLabel_do.setX(16);
			self.linkLabel_do.setY(embedAndLinkMainLabelHeight + 14);
			
			
			var linkTextLabelHeight;
			var linkTextHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				linkTextLabelHeight = Math.round(self.linkLabel_do.screen.getBoundingClientRect().height * 100);
				linkTextHeight = Math.round(self.linkText_do.screen.getBoundingClientRect().height * 100);
			}else{
				linkTextLabelHeight = self.linkLabel_do.getHeight();
				linkTextHeight = self.linkText_do.getHeight();
			}
			
			self.linkText_do.setX(10);
			self.linkText_do.setY(self.linkLabel_do.y + linkTextLabelHeight + 5);
			if(self.isMobile_bl){
				self.copyLinkButton_do.setX(-100);
			}else{
				self.copyLinkButton_do.setX(self.maxTextWidth + 30);
			}
			
			self.copyLinkButton_do.setY(self.linkText_do.y + linkTextHeight - self.buttonHeight);
			self.embedLabel_do.setX(16);
			self.embedLabel_do.setY(self.copyLinkButton_do.y + self.copyLinkButton_do.h + 14);
			
			var embedTextHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				embedTextHeight = Math.round(self.embedText_do.screen.getBoundingClientRect().height * 100);
			}else{
				embedTextHeight = self.embedText_do.getHeight();
			}
			self.embedText_do.setX(10);
			self.embedText_do.setY(self.embedLabel_do.y + linkTextLabelHeight + 5);
			if(self.isMobile_bl){
				self.copyEmbedButton_do.setX(-100);
			}else{
				self.copyEmbedButton_do.setX(self.maxTextWidth + 30);
			}
			self.copyEmbedButton_do.setY(self.embedText_do.y + embedTextHeight - self.buttonHeight);
			self.linkAndEmbedHolderBk_do.setY(self.linkLabel_do.y - 9);
			self.linkAndEmbedHolderBk_do.setWidth(self.totalWidth - 2);
			self.linkAndEmbedHolderBk_do.setHeight(self.embedText_do.y + embedTextHeight - 9);
			self.linkAndEmbedHolder_do.setWidth(self.totalWidth);
			self.linkAndEmbedHolder_do.setHeight(self.embedText_do.y + embedTextHeight + 14);
			
			var sendMainLabelHeight;
			var inputHeight;
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				sendMainLabelHeight = Math.round(self.sendMainLabel_do.screen.getBoundingClientRect().height * 100);
				inputHeight = Math.round(self.yourEmailInput_do.screen.getBoundingClientRect().height * 100);
			}else{
				sendMainLabelHeight = self.sendMainLabel_do.getHeight();
				inputHeight = self.yourEmailInput_do.getHeight();
			}
			self.sendMainLabel_do.setX(16);
			self.yourEmailLabel_do.setX(16);
			self.yourEmailLabel_do.setY(sendMainLabelHeight + 14);
			
			if(self.stageWidth > 400){
				self.yourEmailInput_do.setX(10);
				self.yourEmailInput_do.setWidth(parseInt(self.totalWidth - 52 - self.buttonWidth)/2);
				self.yourEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				
				self.friendEmailLabel_do.setX(self.yourEmailInput_do.x + self.yourEmailInput_do.w + 26);
				self.friendEmailLabel_do.setY(self.yourEmailLabel_do.y);
				self.friendEmailInput_do.setX(self.yourEmailInput_do.x + self.yourEmailInput_do.w + 20);
				self.friendEmailInput_do.setWidth(parseInt((self.maxTextWidth - 30)/2));
				self.friendEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				self.sendButton_do.setX(self.friendEmailInput_do.x + self.yourEmailInput_do.w + 10);
				self.sendButton_do.setY(self.friendEmailInput_do.y +inputHeight - self.buttonHeight);
			}else{
				self.yourEmailInput_do.setX(10);
				self.yourEmailInput_do.setWidth(self.totalWidth -32);
				self.yourEmailInput_do.setY(self.yourEmailLabel_do.y + linkTextLabelHeight + 5);
				
				self.friendEmailLabel_do.setX(16);
				self.friendEmailLabel_do.setY(self.yourEmailInput_do.y + inputHeight + 14);
				self.friendEmailInput_do.setX(10);
				self.friendEmailInput_do.setY(self.friendEmailLabel_do.y + linkTextLabelHeight + 5);
				self.friendEmailInput_do.setWidth(self.totalWidth - 32);
				
				self.sendButton_do.setX(self.totalWidth - self.buttonWidth - 10);
				self.sendButton_do.setY(self.friendEmailInput_do.y + inputHeight + 10);
			}
			
			self.sendMainHolderBk_do.setY(self.yourEmailLabel_do.y - 9);
			self.sendMainHolderBk_do.setWidth(self.totalWidth - 2);
			self.sendMainHolderBk_do.setHeight(self.sendButton_do.y + self.sendButton_do.h - 9);
			self.sendMainHolder_do.setWidth(self.totalWidth);
			self.sendMainHolder_do.setHeight(self.sendButton_do.y + self.sendButton_do.h + 14);
			
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				totalHeight = Math.round(self.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + self.sendMainHolder_do.screen.getBoundingClientRect().height * 100);
			}else{
				totalHeight = self.linkAndEmbedHolder_do.getHeight() + self.sendMainHolder_do.getHeight();
			}
			
			
			self.linkAndEmbedHolder_do.setX(parseInt((self.stageWidth - self.totalWidth)/2));
			self.linkAndEmbedHolder_do.setY(parseInt((self.stageHeight - totalHeight)/2) - 8);
			self.sendMainHolder_do.setX(parseInt((self.stageWidth - self.totalWidth)/2));
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				self.sendMainHolder_do.setY(Math.round(self.linkAndEmbedHolder_do.y + self.linkAndEmbedHolder_do.screen.getBoundingClientRect().height * 100 + 20));
			}else{
				self.sendMainHolder_do.setY(self.linkAndEmbedHolder_do.y + self.linkAndEmbedHolder_do.getHeight() + 20);
			}
		};
		
		//##############################################//
		/* Send email */
		//##############################################//
		this.sendClickHandler = function(){
			var hasError_bl = false;
			if(!self.getValidEmail(self.yourEmailInput_do.screen.value)){
				if(FWDUVPTweenMax.isTweening(self.yourEmailInput_do.screen)) return;
				FWDUVPTweenMax.to(self.yourEmailInput_do.screen, .1, {css:{backgroundColor:'#FF0000'}, yoyo:true, repeat:3});
				hasError_bl = true;
			}
			if(!self.getValidEmail(self.friendEmailInput_do.screen.value)){
				if(FWDUVPTweenMax.isTweening(self.friendEmailInput_do.screen)) return;
				FWDUVPTweenMax.to(self.friendEmailInput_do.screen, .1, {css:{backgroundColor:'#FF0000'}, yoyo:true, repeat:3});
				hasError_bl = true;
			}
			if(hasError_bl) return;
			self.sendEmail();
		};
		
		
		//############ send email ####################//
		this.sendEmail = function(){
			if(self.isSending_bl) return;
			self.isSending_bl = true;
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.onChange;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.sendToAFriendPath_str + "?friendMail=" + self.friendEmailInput_do.screen.value + "&yourMail=" + self.yourEmailInput_do.screen.value + "&link=" + encodeURIComponent(self.linkToVideo_str) , true);
				self.xhr.send();
			}catch(e){
				self.showInfo("ERROR", true);
				if(console) console.log(e);
				if(e.message && window.console) console.log(e.message);
			}
			self.resetInputs();
		};
		
		this.ajaxOnErrorHandler = function(e){
			self.showInfo("ERROR", true);
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			self.isSending_bl = false;
		};
		
		this.onChange = function(response){
			if(self.xhr.readyState == 4 && self.xhr.status == 200){
				if(self.xhr.responseText == "sent"){
					self.showInfo("SENT");
				}else{
					self.showInfo("ERROR", true);
					if(window.console) console.log("Error The server can't send the email!");
				}
				self.isSending_bl = false;
			}
		};
		
		this.resetInputs = function(){
			self.yourEmailInput_do.screen.value = "";
			self.friendEmailInput_do.screen.value = "";
		};
	
		this.getValidEmail = function(email){
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!emailRegExp.test(email) || email == "") return false;
			return true;
		};
		
		//#############################################//
		/* Set embed data */
		//#############################################//
		this.setEmbedData = function(){
		
			var allUrl = location.href;
			var host = location.protocol + "//" + location.host;
			var pathName = location.pathname;
			var hash = location.hash;
			var search = location.search;
			var pathWithoutHashOrSearch = host + pathName;
			
		
			search = search.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, "");
			allUrl = allUrl.replace(/&?RVPInstanceName=.+RVPVideoId=[0-9]+/g, "");
		
			if(search){
				if(hash){
					self.finalEmbedPath_str = pathWithoutHashOrSearch + search + "&RVPInstanceName=" + parent.instanceName_str + "&RVPPlaylistId=" + parent.catId + "&RVPVideoId=" + parent.id + hash;
				}else{
					self.finalEmbedPath_str = pathWithoutHashOrSearch + search + "&RVPInstanceName=" + parent.instanceName_str + "&RVPPlaylistId=" + parent.catId + "&RVPVideoId=" + parent.id;
				}
			}else{
				if(hash){
					self.finalEmbedPath_str = pathWithoutHashOrSearch + "?RVPInstanceName=" + parent.instanceName_str + "&RVPPlaylistId=" + parent.catId + "&RVPVideoId=" + parent.id + hash;
				}else{
					self.finalEmbedPath_str = pathWithoutHashOrSearch + "?RVPInstanceName=" + parent.instanceName_str + "&RVPPlaylistId=" + parent.catId + "&RVPVideoId=" + parent.id;
				}
			}
			
			if(hash){
				if(hash.indexOf("playlistId=") == -1){
					self.linkToVideo_str = pathWithoutHashOrSearch + search + hash + "&playlistId=" + parent.catId + "&videoId=" + parent.id;
				}else{
					self.linkToVideo_str = allUrl;
				}
			}else{
				self.linkToVideo_str = allUrl + "#/?playlistId=" + parent.catId + "&videoId=" + parent.id;;
			}
			
			
			self.finalEmbedPath_str = encodeURI(self.finalEmbedPath_str);
			self.linkToVideo_str = encodeURI(self.linkToVideo_str);	
			self.finalEmbedCode_str = "<iframe src='" + self.finalEmbedPath_str + "' width='" + parent.stageWidth + "' height='" + parent.stageHeight + "' frameborder='0' scrolling='no' allowfullscreen></iframe>";
		
			if(FWDUVPUtils.isIE){
				self.linkText_do.screen.innerText = self.linkToVideo_str;
				self.embedText_do.screen.innerText = self.finalEmbedCode_str;
			}else{
				self.linkText_do.screen.textContent = self.linkToVideo_str;
				self.embedText_do.screen.textContent = self.finalEmbedCode_str;
			}
		};	
		
		//#########################################//
		/* show hide info */
		//#########################################//
		this.showInfo = function(text, hasError){
				
			self.infoText_do.setInnerHTML(text);
			self.sendMainHolder_do.addChild(self.infoText_do);
			self.infoText_do.setWidth(self.buttonWidth);
			self.infoText_do.setHeight(self.buttonHeight - 4);
			self.infoText_do.setX(self.sendButton_do.x);
			self.infoText_do.setY(self.sendButton_do.y - 23);

			self.infoText_do.setAlpha(0);
			if(hasError){
				self.infoText_do.getStyle().color = "#FF0000";
			}else{
				self.infoText_do.getStyle().color = self.mainLabelsColor_str;
			}
			FWDUVPTweenMax.killTweensOf(self.infoText_do);
			FWDUVPTweenMax.to(self.infoText_do, .16, {alpha:1, yoyo:true, repeat:7});
		};
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(id){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			parent.main_do.addChild(self);
			
			self.resetInputs();
			self.setEmbedData();
			if(!FWDUVPUtils.isMobile || (FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent)) parent.main_do.setSelectable(true);
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.mainHolder_do.setY(- self.stageHeight);
			
			self.showCompleteId_to = setTimeout(self.showCompleteHandler, 900);
			setTimeout(function(){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, delay:.1, ease:Expo.easeInOut});
			}, 100);
		};
		
		this.showCompleteHandler = function(){};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			
			if(parent.customContextMenu_do) parent.customContextMenu_do.enable();
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			
			if(!FWDUVPUtils.isMobile || (FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent)) parent.main_do.setSelectable(false);
			self.hideCompleteId_to = setTimeout(self.hideCompleteHandler, 800);
			FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
			FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
		};
		
		this.hideCompleteHandler = function(){
			parent.main_do.removeChild(self);
			self.dispatchEvent(FWDUVPEmbedWindow.HIDE_COMPLETE);
		};
	
		this.init();
	};
		
	/* set prototype */
	FWDUVPEmbedWindow.setPrototype = function(){
		FWDUVPEmbedWindow.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPEmbedWindow.ERROR = "error";
	FWDUVPEmbedWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDUVPEmbedWindow.prototype = null;
	window.FWDUVPEmbedWindow = FWDUVPEmbedWindow;
}(window));(function (){
	
	var FWDUVPEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDUVPEventDispatcher = FWDUVPEventDispatcher;
}(window));/* Data */
(function(window){
	
	var FWDUVPFacebookShare = function(appId){
		
		var self = this;
		var prototype = FWDUVPFacebookShare.prototype;
		
		this.appId = parseInt(appId);
	
		var hasStartedToConnect_bl = false;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.checkFBRoot();
			if(!window.fbAsyncInit) self.connect();
		};
		
		//#############################################//
		/* Checking fb_root div */
		//#############################################//
		this.checkFBRoot = function(){
			var fbRoot_el = Boolean(document.getElementById("fb-root"));
			if(!fbRoot_el){
				fbRoot_el = document.createElement("div");
				fbRoot_el.id = "fb-root";
				document.getElementsByTagName("body")[0].appendChild(fbRoot_el);
			}
		};
		
		//#############################################//
		/* Setup facebook */
		//#############################################//
		this.connect = function(){
			if(self.hasStartedToConnect_bl) return;
			self.hasStartedToConnect_bl = true;
		
			
			window.fbAsyncInit = function() {
				FB.init({
					appId: self.appId,
					status: true,
					cookie: true,
					xfbml: true,
					oauth: true
			});
				
			// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
			// for any authentication related change, such as login, logout or session refresh. This means that
			// whenever someone who was previously logged out tries to log in again, the correct case below 
			// will be handled. 
			FB.Event.subscribe('auth.authResponseChange', function(response) {
				// Here we specify what we do with the response anytime this event occurs. 
				if (response.status === 'connected') {
					// The response object is returned with a status field that lets the app know the current
					// login status of the person. In this case, we're handling the situation where they 
					// have logged in to the app.
				}else{
					// In this case, the person is not logged into Facebook, so we call the login() 
					// function to prompt them to do so. Note that at this stage there is no indication
					// of whether they are logged into the app. If they aren't then they'll see the Login
					// dialog right after they log in to Facebook. 
					// The same caveats as above apply to the FB.login() call here.
				    FB.login();
				}
			});
		};
		  		
		(function(d) {
			var js, id = 'facebook-jssdk';
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement('script');
			js.id = id;
			js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			d.getElementsByTagName('body')[0].appendChild(js);
			}(document));
		};
		
		this.share = function(link, caption, picture){
			FB.ui({
				  method: 'feed',
				  link: link,
				  caption: caption,
				  picture:picture
			}, function(response){});
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDUVPFacebookShare.setPrototype = function(){
		FWDUVPFacebookShare.prototype = new FWDUVPEventDispatcher();
	};
	
	FWDUVPFacebookShare.prototype = null;
	
	window.FWDUVPFacebookShare = FWDUVPFacebookShare;
}(window));﻿/* FWDUVPFlashButton */
(function (window){
var FWDUVPFlashButton = function(
			nImgPath, 
			sImgPath,
			flashFPath,
			flashButtonName,
			overPath,
			outPath,
			clickPath,
			copyPath,
			buttonWidth,
			buttonHeight
		){
		
		var self = this;
		var prototype = FWDUVPFlashButton.prototype;
		
		this.nImg_img = null;
		this.sImg_img = null;
	
		this.n_do;
		this.s_do;
		
		this.nImgPath_str = nImgPath;
		this.sImgPath_str = sImgPath;
		this.flashPath_str = flashFPath;
		this.flashButtonName_str = flashButtonName;
		this.overPath_str = overPath;
		this.outPath_str = outPath;
		this.clickPath_str = clickPath;
		this.copyPath_str = copyPath;
	
		this.linkFlashObject = null;
		
		this.buttonWidth = buttonWidth;
		this.buttonHeight = buttonHeight;
		
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
		this.isDisabled_bl = false;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			if(self.isMobile_bl) return;
			self.setupMainContainers();
			self.setupFalshButton();
			self.setButtonMode(true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			
			self.n_do = new FWDUVPDisplayObject("img");	
			var nImg_img = new Image();
			nImg_img.src = self.nImgPath_str;
			self.n_do.setScreen(nImg_img);
			self.n_do.setWidth(self.buttonWidth);
			self.n_do.setHeight(self.buttonHeight);
			self.addChild(self.n_do);
			
			self.s_do = new FWDUVPDisplayObject("img");	
			var sImg_img = new Image();
			sImg_img.src = self.sImgPath_str;
			self.s_do.setScreen(sImg_img);
			self.s_do.setWidth(self.buttonWidth);
			self.s_do.setHeight(self.buttonHeight);
			self.s_do.setAlpha(0);
			self.addChild(self.s_do);
			
			if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
		};
	
		this.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.setSelectedState();
			}
		};

		this.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == "mouse"){
				self.setNormalState();
			}
		};
		
		this.onMouseUp = function(e){
			if(FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
			self.dispatchEvent(FWDUVPFlashButton.CLICK);
		};
	
		//#############################################//
		/* Setup flash button */
		//##############################################//
		this.setupFalshButton = function(){
			if(!FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")) return;
			
			var flashCopyLInkObjectMarkup_str = '<object id="' + self.flashButtonName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + self.clickPath_str + '&overPath_str=' + self.overPath_str + '&outPath_str=' + self.outPath_str + '&copyPath_str=' + self.copyPath_str + '"/><object type="application/x-shockwave-flash" data="' + self.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + self.flashPath_str + '"/><param name="wmode" value="transparent"/><param name="scale" value="noscale"/><param name=FlashVars value="clickPath_str=' + self.clickPath_str + '&overPath_str=' + self.overPath_str + '&outPath_str=' + self.outPath_str + '&copyPath_str=' + self.copyPath_str + '"/></object></object>';
			
			var linkDumy_do = new FWDUVPDisplayObject("div");
			linkDumy_do.setBackfaceVisibility();
			linkDumy_do.setResizableSizeAfterParent();	
			linkDumy_do.screen.innerHTML = flashCopyLInkObjectMarkup_str;
			self.addChild(linkDumy_do);
			
			self.linkFlashObject = linkDumy_do.screen.firstChild;
			if(!FWDUVPUtils.isIE) self.linkFlashObject = self.linkFlashObject.getElementsByTagName("object")[0];
			
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_do);
			FWDUVPTweenMax.to(self.s_do, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_do);
			FWDUVPTweenMax.to(self.s_do, .5, {alpha:1, ease:Expo.easeOut});
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDUVPFlashButton.setPrototype = function(){
		FWDUVPFlashButton.prototype = null;
		FWDUVPFlashButton.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPFlashButton.CLICK = "onClick";
	
	FWDUVPFlashButton.prototype = null;
	window.FWDUVPFlashButton = FWDUVPFlashButton;
}(window));var FWDUVPFlashTest = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,

		regObjArr = [],

	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}();
	
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	return {
		hasFlashPlayerVersion: hasPlayerVersion
	};
}();
/* hider */
(function (window){
	
    var FWDUVPHider = function(screenToTest, screenToTest2, hideDelay){
    	
    	var self = this;
    	var prototype = FWDUVPHider.prototype;
   
    	this.screenToTest = screenToTest;
    	this.screenToTest2 = screenToTest2;
    	this.hideDelay = hideDelay;
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
    	
		self.init = function(){};
	
		self.start = function(){
			self.currentTime = new Date().getTime();
			clearInterval(self.checkIntervalId_int);
			self.checkIntervalId_int = setInterval(self.update, 100);
			self.addMouseOrTouchCheck();
			self.isStopped_bl = false;
		};
		
		self.stop = function(){
			clearInterval(self.checkIntervalId_int);
			self.isStopped_bl = true;
			self.removeMouseOrTouchCheck();
			self.removeMouseOrTouchCheck2();
		};
		
		self.addMouseOrTouchCheck = function(){	
			if(self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = true;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.addEventListener("MSPointerDown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.addEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.addEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.addEventListener){
				window.addEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.removeMouseOrTouchCheck = function(){	
			if(!self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = false;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.removeEventListener("MSPointerDown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.removeEventListener("MSPointerMove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.removeEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.removeEventListener){
				window.removeEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.addMouseOrTouchCheck2 = function(){	
			if(self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = true;
			if(self.screenToTest.screen.addEventListener){
				self.screenToTest.screen.addEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.attachEvent){
				self.screenToTest.screen.attachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		self.removeMouseOrTouchCheck2 = function(){	
			if(!self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = false;
			if(self.screenToTest.screen.removeEventListener){
				self.screenToTest.screen.removeEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.detachEvent){
				self.screenToTest.screen.detachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		this.secondTestMoveDummy = function(){
			self.removeMouseOrTouchCheck2();
			self.addMouseOrTouchCheck();
		};
		
		self.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			
			if(self.globalX != viewportMouseCoordinates.screenX
			   && self.globalY != viewportMouseCoordinates.screenY){
				self.currentTime = new Date().getTime();
			}
			
			self.globalX = viewportMouseCoordinates.screenX;
			self.globalY = viewportMouseCoordinates.screenY;
			
			if(!self.isMobile_bl){
				if(!FWDUVPUtils.hitTest(self.screenToTest.screen, self.globalX, self.globalY)){
					self.removeMouseOrTouchCheck();
					self.addMouseOrTouchCheck2();
				}
			}
		};
	
		self.update = function(e){
			if(new Date().getTime() > self.currentTime + self.hideDelay){
				if(self.dispatchOnceShow_bl){	
					self.dispatchOnceHide_bl = true;
					self.dispatchOnceShow_bl = false;	
					self.dispatchEvent(FWDUVPHider.HIDE);
					clearTimeout(self.hideCompleteId_to);
					self.hideCompleteId_to = setTimeout(function(){
						self.dispatchEvent(FWDUVPHider.HIDE_COMPLETE);
					}, 1000);
				}
			}else{
				if(self.dispatchOnceHide_bl){
					clearTimeout(self.hideCompleteId_to);
					self.dispatchOnceHide_bl = false;
					self.dispatchOnceShow_bl = true;
					self.dispatchEvent(FWDUVPHider.SHOW);
				}
			}
		};

		self.reset = function(){
			clearTimeout(self.hideCompleteId_to);
			self.currentTime = new Date().getTime();
			self.dispatchEvent(FWDUVPHider.SHOW);
		};
		
		/* destroy */
		self.destroy = function(){
		
			self.removeMouseOrTouchCheck();
			clearInterval(self.checkIntervalId_int);
			
			self.screenToTest = null;
			
			screenToTest = null;
			
			self.init = null;
			self.start = null;
			self.stop = null;
			self.addMouseOrTouchCheck = null;
			self.removeMouseOrTouchCheck = null;
			self.onMouseOrTouchUpdate = null;
			self.update = null;
			self.reset = null;
			self.destroy = null;
			
			prototype.destroy();
			prototype = null;
			self = null;
			FWDUVPHider.prototype = null;
		};
		
		self.init();
     };
     
	 FWDUVPHider.HIDE = "hide";
	 FWDUVPHider.SHOW = "show";
	 FWDUVPHider.HIDE_COMPLETE = "hideComplete";
	 
	 FWDUVPHider.setPrototype = function(){
		 FWDUVPHider.prototype = new FWDUVPEventDispatcher();
	 };
	 

	 window.FWDUVPHider = FWDUVPHider;
}(window));/* Info screen */
(function (window){
	
	var FWDUVPInfo = function(parent){
		
		var self = this;
		var prototype = FWDUVPInfo.prototype;
		
		this.bk_do = null;
		this.textHolder_do = null;
		
		this.show_to = null;
		this.isShowed_bl = false;
		this.isShowedOnce_bl = false;
		this.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setResizableSizeAfterParent();
			
			self.bk_do = new FWDUVPDisplayObject("div");
			self.bk_do.setAlpha(.3);
			self.bk_do.setBkColor("#FF0000");
			self.addChild(self.bk_do);
			
			self.textHolder_do = new FWDUVPDisplayObject("div");
			self.textHolder_do.getStyle().display = "inline-block";
			self.textHolder_do.getStyle().padding = "10px";
			self.textHolder_do.getStyle().paddingBottom = "0px";
			self.textHolder_do.getStyle().lineHeight = "18px";
			self.textHolder_do.setBkColor("#FF0000");
			self.textHolder_do.getStyle().color = "#000000";
			self.addChild(self.textHolder_do);
		};
		
		this.showText = function(txt){
			if(!self.isShowedOnce_bl){
				if(self.screen.addEventListener){
					self.screen.addEventListener("click", self.closeWindow);
				}else if(self.screen.attachEvent){
					self.screen.attachEvent("onclick", self.closeWindow);
				}
				self.isShowedOnce_bl = true;
			}
			
			self.setVisible(false);
			if(self.allowToRemove_bl){
				self.textHolder_do.setInnerHTML(txt  + "<p><font color='#FFFFFF'>Click or tap to close this window.</font>");
			}else{
				self.textHolder_do.getStyle().paddingBottom = "10px";
				self.textHolder_do.setInnerHTML(txt);
			}
			
			clearTimeout(self.show_to);
			self.show_to = setTimeout(self.show, 60);
			setTimeout(function(){
				self.positionAndResize();
			}, 10);
		};
		
		this.show = function(){
			self.isShowed_bl = true;
			self.setVisible(true);
			self.positionAndResize();
		};
		
		this.positionAndResize = function(){
		
			var finalW = Math.min(520, parent.stageWidth - 40);
			var finalH = self.textHolder_do.screen.offsetHeight;
			var finalX = parseInt((parent.stageWidth - finalW)/2) - 10;
			var finalY = parseInt((parent.stageHeight - finalH)/2);
			
			self.bk_do.setWidth(parent.stageWidth);
			self.bk_do.setHeight(parent.stageHeight);
			self.textHolder_do.setX(finalX);
			self.textHolder_do.setY(finalY);
			self.textHolder_do.setWidth(finalW);
		};
		
		this.closeWindow = function(){
			if(!self.allowToRemove_bl) return;
			self.isShowed_bl = false;
			clearTimeout(self.show_to);
			try{parent.main_do.removeChild(self);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDUVPInfo.setPrototype = function(){
		FWDUVPInfo.prototype = new FWDUVPDisplayObject("div", "relative");
	};
	
	FWDUVPInfo.prototype = null;
	window.FWDUVPInfo = FWDUVPInfo;
}(window));/* Info screen */
(function (window){
	
	var FWDUVPInfoWindow = function(parent, data){
		
		var self = this;
		var prototype = FWDUVPInfoWindow.prototype;
		
		this.xhr = null;
		
		this.embedColoseN_img = data.embedColoseN_img;
		
		this.mainBk_do = null;
		this.mainHolder_do = null;
		this.mainTextHolder_do = null;
		this.text_do = null;
		this.bk_do = null;
		
		this.closeButton_do = null;
		
		this.embedWindowBackground_str = data.embedWindowBackground_str;
		this.embedWindowInputBackgroundPath_str = data.embedWindowInputBackgroundPath_str;
		this.secondaryLabelsColor_str = data.secondaryLabelsColor_str;
		this.inputColor_str = data.inputColor_str;
		this.sendButtonNPath_str = data.sendButtonNPath_str;
		this.sendButtonSPath_str = data.sendButtonSPath_str;
		this.inputBackgroundColor_str = data.inputBackgroundColor_str;
		this.borderColor_str = data.borderColor_str;
		this.sendToAFriendPath_str = data.sendToAFriendPath_str;
		
		this.maxTextWidth = 0;
		this.totalWidth = 0;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.buttonWidth = 44;
		this.buttonHeight = 19;
		this.embedWindowCloseButtonMargins = data.embedWindowCloseButtonMargins;
	
		this.finalEmbedPath_str = null;
		this.finalEmbedCode_str = null;
		this.linkToVideo_str = null;
		this.shareAndEmbedTextColor_str = data.shareAndEmbedTextColor_str;
	
		this.isYTB_bl = false;
		this.isShowed_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
	
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setBackfaceVisibility();
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			
			self.mainBk_do = new FWDUVPDisplayObject("div");
			self.mainBk_do.getStyle().width = "100%";
			self.mainBk_do.getStyle().height = "100%";
			self.mainBk_do.setAlpha(.9);
			self.mainBk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
		
			//setup link and embed text
			self.mainTextHolder_do =  new FWDUVPDisplayObject("div", "absolute");
			
			self.bk_do = new FWDUVPDisplayObject("div");
			self.bk_do.getStyle().background = "url('" + self.embedWindowBackground_str + "')";
			self.bk_do.getStyle().borderStyle = "solid";
			self.bk_do.getStyle().borderWidth = "1px";
			self.bk_do.getStyle().borderColor =  self.borderColor_str;
			
			self.text_do = new FWDUVPDisplayObject("div", "relative");
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";

			//setup close button
			FWDUVPSimpleSizeButton.setPrototype();
			self.closeButton_do = new FWDUVPSimpleSizeButton(self.embedColoseN_img.src, data.embedWindowClosePathS_str, self.embedColoseN_img.width, self.embedColoseN_img.height);
			self.closeButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			
			self.mainHolder_do.addChild(self.mainBk_do);
			self.mainTextHolder_do.addChild(self.bk_do);
			self.mainTextHolder_do.addChild(self.text_do);	
			self.mainHolder_do.addChild(self.mainTextHolder_do);
			self.addChild(self.mainHolder_do);

			self.mainHolder_do.addChild(self.closeButton_do); 
		};
	
		this.closeButtonOnMouseUpHandler = function(){
			if(!self.isShowed_bl) return;
			self.hide();
		};
		
		this.positionAndResize = function(){
		
			self.stageWidth = parent.stageWidth;
			if(parent.displayType == FWDUVPlayer.FULL_SCREEN){
				self.stageHeight = parent.tempVidStageHeight;
			}else{
				self.stageHeight = parent.tempVidStageHeight;
			}
			
			
			self.maxTextWidth = Math.min(self.stageWidth - 150, 500);
			self.totalWidth = self.maxTextWidth + self.buttonWidth + 40;
			
			self.positionFinal();
			
			self.closeButton_do.setX(self.stageWidth - self.closeButton_do.w - self.embedWindowCloseButtonMargins);
			self.closeButton_do.setY(self.embedWindowCloseButtonMargins);
			
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
		};
		
		this.positionFinal = function(){
			var totalHeight;
			var isEmbeddedAndFScreenOnIE11Bug_bl = false;
			self.mainTextHolder_do.setWidth(self.totalWidth);
			
			if(isEmbeddedAndFScreenOnIE11Bug_bl){
				totalHeight = Math.round(self.mainTextHolder_do.screen.getBoundingClientRect().height * 100);
			}else{
				totalHeight = self.mainTextHolder_do.getHeight();
			}
			
			self.bk_do.setWidth(self.totalWidth - 2);
			self.bk_do.setHeight(totalHeight - 2);
			
			self.mainTextHolder_do.setX(parseInt((self.stageWidth - self.totalWidth)/2));
			self.mainTextHolder_do.setY(parseInt((self.stageHeight - totalHeight)/2) - 8);
		};
		
		//###########################################//
		/* show / hide */
		//###########################################//
		this.show = function(videoDesc){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			parent.main_do.addChild(self);
			self.text_do.setInnerHTML(videoDesc);
		
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			self.mainHolder_do.setY(- self.stageHeight);
			
			self.showCompleteId_to = setTimeout(self.showCompleteHandler, 900);
			setTimeout(function(){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, delay:.1, ease:Expo.easeInOut});
			}, 100);
		};
		
		this.showCompleteHandler = function(){};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			
			if(parent.customContextMenu_do) parent.customContextMenu_do.enable();
			self.positionAndResize();
			
			clearTimeout(self.hideCompleteId_to);
			clearTimeout(self.showCompleteId_to);
			
			self.hideCompleteId_to = setTimeout(self.hideCompleteHandler, 800);
			FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
			FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
		};
		
		this.hideCompleteHandler = function(){
			parent.main_do.removeChild(self);
			self.dispatchEvent(FWDUVPInfoWindow.HIDE_COMPLETE);
		};
	
		this.init();
	};
		
	/* set prototype */
	FWDUVPInfoWindow.setPrototype = function(){
		FWDUVPInfoWindow.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPInfoWindow.ERROR = "error";
	FWDUVPInfoWindow.HIDE_COMPLETE = "hideComplete";
	
	FWDUVPInfoWindow.prototype = null;
	window.FWDUVPInfoWindow = FWDUVPInfoWindow;
}(window));/* Main */
(function (window){
	
	var FWDUVPlayer = function(props){
		
		var self = this;
		FWDUVPlayer.instaces_ar.push(this);
		this.isInstantiate_bl = false;
		this.displayType = props.displayType || FWDUVPlayer.RESPONSIVE;
		
		if(self.displayType.toLowerCase() != FWDUVPlayer.RESPONSIVE 
		   && self.displayType.toLowerCase() != FWDUVPlayer.FULL_SCREEN){
			self.displayType = FWDUVPlayer.RESPONSIVE;
		}
		
		this.maxWidth = props.maxWidth || 640;
		this.maxHeight = props.maxHeight || 380;
		this.embeddedPlaylistId;
		this.embeddedVideoId;
		this.isEmbedded_bl = false;
	
		/* init gallery */
		self.init = function(){
			if(self.isInstantiate_bl) return;
			TweenLite.ticker.useRAF(false);
			this.props_obj = props;
			
			this.mustHaveHolderDiv_bl = false;
			this.instanceName_str = this.props_obj.instanceName;
			
			if(!this.instanceName_str){
				alert("FWDUVPlayer instance name is required please make sure that the instanceName parameter exsists and it's value is uinique.");
				return;
			}
			
			if(window[this.instanceName_str]){
				alert("FWDUVPlayer instance name " + this.instanceName_str +  " is already defined and contains a different instance reference, set a different instance name.");
				return;
			}else{
				window[this.instanceName_str] = this;
			}
		
			if(!this.props_obj){
				alert("FWDUVPlayer constructor properties object is not defined!");
				return;
			}
			
			if(!this.props_obj.parentId){		
				alert("Property parentId is not defined in the FWDUVPlayer constructor, self property represents the div id into which the megazoom is added as a child!");
				return;
			}
			
			if(self.displayType == FWDUVPlayer.RESPONSIVE) self.mustHaveHolderDiv_bl = true;
		
			if(self.mustHaveHolderDiv_bl && !FWDUVPUtils.getChildById(self.props_obj.parentId)){
				alert("FWDUVPlayer holder div is not found, please make sure that the div exsists and the id is correct! " + self.props_obj.parentId);
				return;
			}
			
			this.body = document.getElementsByTagName("body")[0];
			this.stageContainer = null;
			if(this.isEmbedded_bl) this.displayType = FWDUVPlayer.FULL_SCREEN;
			
			if(self.displayType == FWDUVPlayer.FULL_SCREEN){
				window.scrollTo(0,0);
				if(FWDUVPUtils.isIEAndLessThen9){
					self.stageContainer = self.body;
				}else{
					self.stageContainer = document.documentElement;
				}
			}else{
				this.stageContainer = FWDUVPUtils.getChildById(self.props_obj.parentId);
			}
			
			this.listeners = {events_ar:[]};
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
			this.spaceBetweenControllerAndPlaylist = self.props_obj.spaceBetweenControllerAndPlaylist || 1;
			this.autoScale_bl = self.props_obj.autoScale;
			this.autoScale_bl = self.autoScale_bl == "yes" ? true : false;
			
			this.backgroundColor_str = self.props_obj.backgroundColor || "transparent";
			this.videoBackgroundColor_str = self.props_obj.videoBackgroundColor || "transparent";
			this.flashObjectMarkup_str =  null;
			
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
			
			this.videoSourcePath_str = self.props_obj.videoSourcePath;
			this.prevVideoSourcePath_str;
			this.posterPath_str = self.props_obj.posterPath;
			this.videoType_str;
			this.videoStartBehaviour_str;
			this.prevVideoSource_str;
			this.prevPosterSource_str;
			this.finalVideoPath_str;
			this.playListThumbnailWidth = self.props_obj.thumbnailWidth || 80;
			this.playListThumbnailHeight = self.props_obj.thumbnailHeight || 80;
			this.playlistWidth = self.props_obj.playlistRightWidth || 250;
			this.playlistHeight = 0;
		
			this.resizeHandlerId_to;
			this.resizeHandler2Id_to;
			this.hidePreloaderId_to;
			this.orientationChangeId_to;
			this.disableClickId_to;
			this.clickDelayId_to;
			this.secondTapId_to;
			this.videoHiderId_to;
			
			this.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist;
			this.showPlaylistButtonAndPlaylist_bl = self.showPlaylistButtonAndPlaylist_bl == "no" ? false : true;
			
			this.isPlaylistShowed_bl = self.props_obj.showPlaylistByDefault;
			this.isPlaylistShowed_bl = self.isPlaylistShowed_bl == "no" ? false : true;
			
			//this.playlistPosition_str = self.props_obj.playlistPosition || "bottom";
			//var test = self.playlistPosition_str == "bottom" || self.playlistPosition_str == "right";		   
			//if(!test) self.playlistPosition_str = "right";
	
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
			this.useYoutube_bl = FWDUVPlayer.useYoutube; 
			this.useYoutube_bl = self.useYoutube_bl == "yes" ? true : false;
			this.isAPIReady_bl = false;
			this.isInstantiate_bl = true;
			this.isPlaylistLoaded_bl = false;
			this.isPlaylistLoadedFirstTime_bl = false;
			this.useDeepLinking_bl = self.props_obj.useDeepLinking;
			this.useDeepLinking_bl = self.useDeepLinking_bl == "yes" ? true : false;
			this.isAdd_bl = false;
			this.isMobile_bl = FWDUVPUtils.isMobile;
			this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
			
			this.setupMainDo();
			this.startResizeHandler();
			this.setupInfo();
			
			this.setupData();
		};
	
		//#############################################//
		/* setup main do */
		//#############################################//
		self.setupMainDo = function(){
			self.main_do = new FWDUVPDisplayObject("div", "relative");
			self.main_do.getStyle().msTouchAction = "none";
			self.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			self.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)";
			self.main_do.getStyle().width = "100%";
			self.main_do.getStyle().height = "100%";
			self.main_do.setBackfaceVisibility();
			self.main_do.setBkColor(self.backgroundColor_str);
			if(!FWDUVPUtils.isMobile || (FWDUVPUtils.isMobile && FWDUVPUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			
			self.videoHolder_do = new FWDUVPDisplayObject("div");
			self.main_do.addChild(self.videoHolder_do);
			
			self.stageContainer.style.overflow = "hidden";
			if(self.displayType == FWDUVPlayer.FULL_SCREEN){	
				self.main_do.getStyle().position = "absolute";
				document.documentElement.appendChild(self.main_do.screen);
				self.main_do.getStyle().zIndex = 9999999999998;
			}else{
				self.stageContainer.appendChild(self.main_do.screen);
			}	
		};
		
		//#############################################//
		/* setup info_do */
		//#############################################//
		self.setupInfo = function(){
			FWDUVPInfo.setPrototype();
			self.info_do = new FWDUVPInfo(self);
		};	
		
		//#############################################//
		/* resize handler */
		//#############################################//
		self.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
			}else if(window.attachEvent){
				window.attachEvent("onresize", self.onResizeHandler);
			}
			self.onResizeHandler(true);
			self.resizeHandlerId_to = setTimeout(function(){self.resizeHandler();}, 500);
		};
		
		self.stopResizeHandler = function(){
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
			}	
			clearTimeout(self.resizeHandlerId_to);
		};
		
		self.onResizeHandler = function(e){
			self.resizeHandler();
			clearTimeout(self.resizeHandler2Id_to);
			self.resizeHandler2Id_to = setTimeout(function(){self.resizeHandler();}, 300);
		};
	
		self.resizeHandler = function(allowToResizeFinal, resizePlaylistWithAnim){
			
			self.tempPlaylistPosition_str;
			
			var viewportSize = FWDUVPUtils.getViewportSize();
				
			if(self.isFullScreen_bl || self.displayType == FWDUVPlayer.FULL_SCREEN){	
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.stageWidth = viewportSize.w;
				self.stageHeight = viewportSize.h;
			}else{
				self.stageContainer.style.width = "100%";
				if(self.stageContainer.offsetWidth > self.maxWidth){
					self.stageContainer.style.width = self.maxWidth + "px";
				}
				self.stageWidth = self.stageContainer.offsetWidth;
				if(self.autoScale_bl){
					self.stageHeight = parseInt(self.maxHeight * (self.stageWidth/self.maxWidth));
				}else{
					self.stageHeight = self.maxHeight;
				}
			}
			
			if(FWDUVPUtils.isIEAndLessThen9 && self.stageWidth < 400) self.stageWidth = 400;
			if(self.stageHeight < 320) self.stageHeight = 320;
			if(self.stageHeight > viewportSize.h && self.isFullScreen_bl) self.stageHeight = viewportSize.h;
			if(self.data && self.playlist_do){
				self.playlistHeight = parseInt(self.data.playlistBottomHeight * (self.stageWidth/self.maxWidth));
				if(self.playlistHeight < 300) self.playlistHeight = 300;
			}
			
			if(self.data){
				self.tempPlaylistPosition_str = self.data.playlistPosition_str;
				if(self.stageWidth < 600){
					self.tempPlaylistPosition_str = "bottom";
				}
				self.playlistPosition_str = self.tempPlaylistPosition_str;
				if(self.playlist_do) self.playlist_do.position_str = self.tempPlaylistPosition_str;
			}
			
			if(self.playlist_do && self.isPlaylistShowed_bl){
				if(self.playlistPosition_str == "bottom"){
					self.vidStageWidth = self.stageWidth;
					self.stageHeight += self.playlistHeight + self.spaceBetweenControllerAndPlaylist;
					self.vidStageHeight = self.stageHeight - self.playlistHeight - self.spaceBetweenControllerAndPlaylist;
					if(self.displayType == FWDUVPlayer.FULL_SCREEN) self.controller_do.disablePlaylistButton();
				}else if(self.playlistPosition_str == "right"){
					if(self.isFullScreen_bl){
						self.vidStageWidth = self.stageWidth;
					}else{
						self.vidStageWidth = self.stageWidth - self.playlistWidth - self.spaceBetweenControllerAndPlaylist;
					}
					self.controller_do.enablePlaylistButton();
					self.vidStageHeight = self.stageHeight;
				}
			}else{
				self.vidStageWidth = self.stageWidth;
				self.vidStageHeight = self.stageHeight;
			}
			
			if(self.playlist_do){
				if(self.playlistPosition_str == "right"){
					if(self.isFullScreen_bl){
						self.controller_do.disablePlaylistButton();
					}else{
						self.controller_do.enablePlaylistButton();
					}
				}else if(self.isEmbedded_bl){
					self.controller_do.disablePlaylistButton();
				}
			}
			
			if(!allowToResizeFinal || self.isMobile_bl){
				FWDUVPTweenMax.killTweensOf(self);
				self.tempStageWidth = self.stageWidth;
				self.tempStageHeight = self.stageHeight;
				self.tempVidStageWidth = self.vidStageWidth;
				self.tempVidStageHeight = Math.max(0, self.vidStageHeight);
				self.resizeFinal(resizePlaylistWithAnim);
			}
		};
		
		this.resizeFinal = function(resizePlaylistWithAnim){
			
			self.stageContainer.style.height = self.tempStageHeight + "px";
			
			self.main_do.setWidth(self.tempStageWidth);
			
			if(self.showPlaylistButtonAndPlaylist_bl && self.isPlaylistShowed_bl && self.playlistPosition_str == "bottom"){
				self.main_do.setHeight(self.tempStageHeight);
			}else{
				self.main_do.setHeight(self.tempStageHeight);
			}
			
			self.videoHolder_do.setWidth(self.tempVidStageWidth);
			self.videoHolder_do.setHeight(self.tempVidStageHeight);
			
			if(self.isFlashScreenReady_bl && self.videoType_str == FWDUVPlayer.VIDEO){
				self.flash_do.setWidth(self.tempVidStageWidth);
				self.flash_do.setHeight(self.tempVidStageHeight);
			}
			
			if(self.ytb_do && self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.ytb_do.setWidth(self.tempVidStageWidth);
				self.ytb_do.setHeight(self.tempVidStageHeight);
			}
			
			if(self.logo_do) self.logo_do.positionAndResize();
			if(self.playlist_do && !FWDUVPTweenMax.isTweening(self)){
				if(self.isMobile_bl){
					self.playlist_do.resizeAndPosition(false);
				}else{
					self.playlist_do.resizeAndPosition(resizePlaylistWithAnim);
				}
			}
			
			if(self.controller_do) self.controller_do.resizeAndPosition();
			if(self.categories_do) self.categories_do.resizeAndPosition();
			
			if(self.videoScreen_do && self.videoType_str == FWDUVPlayer.VIDEO){
				self.videoScreen_do.resizeAndPosition(self.tempVidStageWidth, self.tempVidStageHeight);
			}
		
			if(self.ytb_do && self.ytb_do.ytb && self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.ytb_do.resizeAndPosition();
			}
			
			if(self.preloader_do) self.positionPreloader();
			if(self.dumyClick_do){
				self.dumyClick_do.setWidth(self.tempVidStageWidth);
				if(self.isMobile_bl){
					self.dumyClick_do.setHeight(self.tempVidStageHeight);
				}else{
					if(self.videoType_str == FWDUVPlayer.YOUTUBE){
						self.dumyClick_do.setHeight(self.tempVidStageHeight - 93);
					}else{
						self.dumyClick_do.setHeight(self.tempVidStageHeight);
					}
				}
			}
			if(self.videoHider_do) self.resizeVideoHider();
			if(self.largePlayButton_do) self.positionLargePlayButton();
			if(self.videoPoster_do && self.videoPoster_do.allowToShow_bl) self.videoPoster_do.positionAndResize();
			if(self.embedWindow_do && self.embedWindow_do.isShowed_bl) self.embedWindow_do.positionAndResize();
			if(self.infoWindow_do && self.infoWindow_do.isShowed_bl) self.infoWindow_do.positionAndResize();
			if(self.info_do && self.info_do.isShowed_bl) self.info_do.positionAndResize();
			if(self.adsStart_do) self.positionAds();
		};
		
		//###############################################//
		/* Setup click screen */
		//###############################################//
		this.setupClickScreen = function(){
			self.dumyClick_do = new FWDUVPDisplayObject("div");
			if(FWDUVPUtils.isIE){
				self.dumyClick_do.setBkColor("#00FF00");
				self.dumyClick_do.setAlpha(.0001);
			}
			if(self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("click", self.playPauseClickHandler);
			}else if(self.dumyClick_do.screen.attachEvent){
				self.dumyClick_do.screen.attachEvent("onclick", self.playPauseClickHandler);
			}
			self.hideClickScreen();
			self.videoHolder_do.addChild(self.dumyClick_do);
		};
		
		this.playPauseClickHandler = function(e){
			if(e.button == 2) return;
			
			if(self.isAdd_bl){
				if(self.data.playlist_ar[self.id].ads.pageToOpen && self.data.playlist_ar[self.id].ads.pageToOpen != "none"){
					window.open(self.data.playlist_ar[self.id].ads.pageToOpen, self.data.playlist_ar[self.id].ads.pageTarget);
					self.pause();
				}
				return;
			}
			
			if(self.disableClick_bl) return;
			self.firstTapPlaying_bl = self.isPlaying_bl;
			
			FWDUVPlayer.keyboardCurInstance = self;
			
			if(self.controller_do.mainHolder_do.y != 0 && self.isMobile_bl) return;
			
			if(self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.ytb_do.togglePlayPause();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.togglePlayPause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.togglePlayPause();
			}
		};
		
		this.showClickScreen = function(){
			self.dumyClick_do.setVisible(true);
			if(self.isAdd_bl && self.data.playlist_ar[self.id].ads.pageToOpen != "none"){
				self.dumyClick_do.setButtonMode(true);
			}else{
				self.dumyClick_do.setButtonMode(false);
			}
		};
		
		this.hideClickScreen = function(){
			self.dumyClick_do.setVisible(false);
		};
		
		//#####################################//
		/* Setup disable click */
		//#####################################//
		this.setupDisableClick = function(){
			self.disableClick_do = new FWDUVPDisplayObject("div");
			if(FWDUVPUtils.isIE){
				self.disableClick_do.setBkColor("#FFFFFF");
				self.disableClick_do.setAlpha(0.001);
			}
			self.main_do.addChild(self.disableClick_do);
			
		};
		
		this.disableClick = function(){
			self.disableClick_bl = true;
			clearTimeout(self.disableClickId_to);
			if(self.disableClick_do){
				self.disableClick_do.setWidth(self.stageWidth);
				self.disableClick_do.setHeight(self.stageHeight);
			}
			self.disableClickId_to =  setTimeout(function(){
				if(self.disableClick_do){
					self.disableClick_do.setWidth(0);
					self.disableClick_do.setHeight(0);
				}
				self.disableClick_bl = false;
			}, 500);
		};
		
		this.showDisable = function(){
			if(self.disableClick_do.w == self.stageWidth) return;
			self.disableClick_do.setWidth(self.stageWidth);
			self.disableClick_do.setHeight(self.stageHeight);
		};
		
		this.hideDisable = function(){
			if(!self.disableClick_do) return;
			if(self.disableClick_do.w == 0) return;
			self.disableClick_do.setWidth(0);
			self.disableClick_do.setHeight(0);
		};
		
		//########################################//
		/* add double click and tap support */
		//########################################//
		this.addDoubleClickSupport = function(){	
			if(!self.isMobile_bl && self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
				if(FWDUVPUtils.isIEWebKit) self.dumyClick_do.screen.addEventListener("dblclick", self.onSecondDown);
			}else if(self.isMobile_bl){
				self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown);
			}else if(self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
			}
		};
		
		this.onFirstDown = function(e){
			if(e.button == 2) return;
			if(self.isFullscreen_bl && e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);
			self.firstTapX = viewportMouseCoordinates.screenX;
			self.firstTapY = viewportMouseCoordinates.screenY;
			
			self.firstTapPlaying_bl = self.isPlaying_bl;
			
			if(FWDUVPUtils.isIEWebKit) return;
			
			if(self.isMobile_bl){
				self.dumyClick_do.screen.addEventListener("touchstart", self.onSecondDown);
				self.dumyClick_do.screen.removeEventListener("touchstart", self.onFirstDown);
			}else{
				if(self.dumyClick_do.screen.addEventListener){
					self.dumyClick_do.screen.addEventListener("mousedown", self.onSecondDown);
					self.dumyClick_do.screen.removeEventListener("mousedown", self.onFirstDown);
				}
			}
			clearTimeout(self.secondTapId_to);
			self.secondTapId_to = setTimeout(self.doubleTapExpired, 250);
		};
		
		this.doubleTapExpired = function(){
			clearTimeout(self.secondTapId_to);
			if(self.isMobile_bl){
				self.dumyClick_do.screen.removeEventListener("touchstart", self.onSecondDown);
				self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown);
			}else{
				if(self.dumyClick_do.screen.addEventListener){
					self.dumyClick_do.screen.removeEventListener("mousedown", self.onSecondDown);
					self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
				}
			}
		};
		
		this.onSecondDown = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);
			var dx;
			var dy;
			
			if(FWDUVPUtils.isIEWebKit) self.firstTapPlaying_bl = self.isPlaying_bl;

			if(e.touches && e.touches.length != 1) return;
			dx = Math.abs(viewportMouseCoordinates.screenX - self.firstTapX);   
			dy = Math.abs(viewportMouseCoordinates.screenY - self.firstTapY); 
		
			if(self.isMobile_bl && (dx > 10 || dy > 10)){
				return;
			}else if(!self.isMobile_bl && (dx > 2 || dy > 2)){
				return
			}
			self.switchFullScreenOnDoubleClick();
			
			if(!FWDUVPUtils.isIEWebKit){
				if(self.firstTapPlaying_bl){
					self.play();
				}else{
					self.pause();
				}
			}
		};
		
		this.switchFullScreenOnDoubleClick = function(){
			self.disableClick();
			if(!self.isFullScreen_bl){
				self.goFullScreen();
			}else{
				self.goNormalScreen();
			}
		};
		
		//##########################################//
		/* Setup facebook */
		//##########################################//
		this.setupFacebook = function(){
			if(document.location.protocol == "file:") return;
			self.facebookShare = new FWDUVPFacebookShare(self.data.facebookAppId_str);
		};
		
		//############################################//
		/* Setup video hider */
		//############################################//
		this.setupVideoHider = function(){
			self.videoHider_do = new FWDUVPDisplayObject("div");
			self.videoHider_do.setBkColor(self.backgroundColor_str);
			self.videoHolder_do.addChild(self.videoHider_do);
		};
		
		this.showVideoHider = function(){
			if(self.isVideoHiderShowed_bl || !self.videoHider_do) return;
			self.isVideoHiderShowed_bl = true;
			self.videoHider_do.setVisible(true);
			self.resizeVideoHider();
		};
		
		this.hideVideoHider = function(){
			if(!self.isVideoHiderShowed_bl) return;
			self.isVideoHiderShowed_bl = false;
			clearTimeout(self.videoHilderId_to);
			self.videoHilderId_to = setTimeout(function(){
				self.videoHider_do.setVisible(false);
			}, 300);
		};
		
		this.resizeVideoHider = function(){
			if(self.isVideoHiderShowed_bl){
				self.videoHider_do.setWidth(self.tempStageWidth);
				self.videoHider_do.setHeight(self.tempStageHeight);
			}
		};
		
		//############################################//
		/* Setup youtube player */
		//############################################//
		this.setupYoutubePlayer = function(){
			if(location.protocol.indexOf("file:") != -1 && (FWDUVPUtils.isOpera || FWDUVPUtils.isIE)) return
			FWDUVPYoutubeScreen.setPrototype();
			self.ytb_do = new FWDUVPYoutubeScreen(self, self.data.volume);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.READY, self.youtubeReadyHandler);
			self.ytb_do.addListener(FWDUVPVideoScreen.ERROR, self.videoScreenErrorHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.STOP, self.videoScreenStopHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY, self.videoScreenPlayHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.PAUSE, self.videoScreenPauseHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE, self.videoScreenUpdateHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.CUED, self.youtubeScreenCuedHandler);
			self.ytb_do.addListener(FWDUVPYoutubeScreen.QUALITY_CHANGE, self.youtubeScreenQualityChangeHandler);
	
			clearTimeout(self.ytb_do);
		};
		
		this.youtubeReadyHandler = function(e){
			
			self.isAPIReady_bl = true;
			if(self.ytb_do.hasBeenCreatedOnce_bl){
				if(self.videoSourcePath_str.indexOf(".") != -1) return;
				if(!self.isMobile_bl){
					self.setPosterSource(self.posterPath_str);
					self.videoPoster_do.show();
				}else{
					self.setPosterSource(undefined);
					self.videoPoster_do.hide();
					self.largePlayButton_do.hide();
				}
				if(self.videoSourcePath_str.indexOf(".") == -1) self.setSource(undefined, true);
				return;
			}
			
			clearInterval(self.hidePreloaderId_to);
			self.hidePreloaderId_to = setTimeout(function(){
				if(self.preloader_do) self.preloader_do.hide(true);}
			, 500);
			self.setupNormalVideoPlayers();
			if(!self.isPlaylistLoadedFirstTime_bl && self.controller_do) self.updatePlaylist();
			self.isPlaylistLoadedFirstTime_bl = true;
		};
		
		this.youtubeScreenCuedHandler = function(){
			if(self.main_do) if(self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
		};
		
		this.youtubeScreenQualityChangeHandler = function(e){
			self.controller_do.updateQuality(e.levels, e.qualityLevel);
		};
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		self.setupContextMenu = function(){
			self.customContextMenu_do = new FWDUVPContextMenu(self.main_do, self.data.rightClickContextMenu_str);
		};
		
		//#############################################//
		/* setup data */
		//#############################################//
		self.setupData = function(){
			FWDUVPData.setPrototype();
			self.data = new FWDUVPData(self.props_obj, self.rootElement_el, self);
			self.data.useYoutube_bl = self.useYoutube_bl;
			self.data.addListener(FWDUVPData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDUVPData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDUVPData.SKIN_PROGRESS, self.dataSkinProgressHandler);
			self.data.addListener(FWDUVPData.SKIN_LOAD_COMPLETE, self.dataSkinLoadComplete);
			self.data.addListener(FWDUVPData.PLAYLIST_LOAD_COMPLETE, self.dataPlayListLoadComplete);
		};
		
		self.onPreloaderLoadDone = function(){
			self.setupPreloader();
			if(!self.isMobile_bl) self.setupContextMenu();
			self.resizeHandler();
		};
		
		self.dataLoadError = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
			if(self.preloader_do) self.preloader_do.hide(false);
			self.resizeHandler();
			self.dispatchEvent(FWDUVPlayer.ERROR, {error:e.text});
		};
		
		self.dataSkinProgressHandler = function(e){};
		
		self.dataSkinLoadComplete = function(){
			if(location.protocol.indexOf("file:") != -1){
				if(FWDUVPUtils.isOpera || FWDUVPUtils.isIEAndLessThen9){
					self.main_do.addChild(self.info_do);
					self.info_do.allowToRemove_bl = false;
					self.info_do.showText("This browser can't play video local, please test online or use a browser like Firefox of Chrome.");
					self.preloader_do.hide();
					return;
				}
			}
			
			self.playlistHeight = self.data.playlistBottomHeight;
			
			if(self.displayType == FWDUVPlayer.FULL_SCREEN  && !FWDUVPUtils.hasFullScreen){
				self.data.showFullScreenButton_bl = false;
			}
			self.setupFacebook();
			
			if(self.isEmbedded_bl){
				self.useDeepLinking_bl = false;
				self.data.playlistPosition_str = "right";
			}
			
			
			if(FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl) self.useDeepLinking_bl = false;
			if(self.useDeepLinking_bl) FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl = true;
			
			if(self.useDeepLinking_bl){
				setTimeout(function(){self.setupDL();}, 200);
			}else{
				if(self.isEmbedded_bl){
					self.catId = self.embeddedPlaylistId;
					self.id = self.embeddedVideoId;
				}else{
					var args = FWDUVPUtils.getHashUrlArgs(window.location.hash);
					if(self.useDeepLinking_bl && args.playlistId !== undefined && args.videoId !== undefined){
						self.catId = args.playlistId;
						self.id = args.videoId;
					}else{
						self.catId = self.data.startAtPlaylist;
						self.id = self.data.startAtVideo;
					}
				}
				self.loadInternalPlaylist();
			}
		};
		
		this.dataPlayListLoadComplete = function(){
			if(!self.isPlaylistLoadedFirstTime_bl){
				if(self.useYoutube_bl){
					self.setupYoutubePlayer();
				}else{
					self.setupNormalVideoPlayers();
					if(!FWDUVPUtils.isIEAndLessThen9) self.updatePlaylist();
				}
			}
	
			if(self.isPlaylistLoadedFirstTime_bl) self.updatePlaylist();	
			self.isPlaylistLoaded_bl = true;
			if(self.preloader_do) self.positionPreloader();
		};
		
		this.updatePlaylist = function(){
			
			if(self.main_do) if(self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
			self.preloader_do.hide(true);
			self.totalVideos = self.data.playlist_ar.length;
			
	    	if(self.id < 0){
				self.id = 0;
			}else if(self.id > self.totalVideos - 1){
				self.id = self.totalVideos - 1;
			}
	    	
			if(self.playlist_do) self.playlist_do.updatePlaylist(self.data.playlist_ar, self.id, self.data.cats_ar[self.catId].playlistName);
			self.hideVideoHider();
			
			
			if(self.data.startAtRandomVideo_bl){
				self.id = parseInt(Math.random() * self.data.playlist_ar.length);
				if(self.useDeepLinking_bl){
					FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
					return;
				}
	    	}
			
	    	self.posterPath_str = self.data.playlist_ar[self.id].posterSource;
			self.setSource(undefined, true);
			if(self.isFirstPlaylistLoaded_bl && !self.isMobile_bl && !self.data.startAtRandomVideo_bl) self.play();
			self.data.startAtRandomVideo_bl = false;
			self.isFirstPlaylistLoaded_bl = true;
			self.dispatchEvent(FWDUVPlayer.LOAD_PLAYLIST_COMPLETE);
		};
		
		//############################################//
		/* Load playlists */
		//############################################//
		this.loadInternalPlaylist = function(){
			
			self.isPlaylistLoaded_bl = false;
			self.isAdd_bl = false;
			if(self.prevCatId == self.catId) return;
			self.prevCatId = self.catId;
			
			self.stop();
			if(self.hider) self.hider.stop();
			self.setPosterSource("none");
			if(self.videoPoster_do) self.videoPoster_do.hide(true);
			self.preloader_do.show(true);
			if(self.largePlayButton_do) self.largePlayButton_do.hide();
			if(self.controller_do) self.controller_do.hide(false, 10);
			self.showVideoHider();
			self.data.loadPlaylist(self.catId);
			if(self.logo_do) self.logo_do.hide(false, true);
			if(self.isAdd_bl){
				self.adsSkip_do.hide(false);
				self.adsStart_do.hide(false);
			}
			if(self.playlist_do) self.playlist_do.destroyPlaylist();
			self.positionPreloader();
			if(self.isAPIReady_bl) self.dispatchEvent(FWDUVPlayer.START_TO_LOAD_PLAYLIST);
		};
		
		//############################################//
		/* update deeplink */
		//############################################//
		this.setupDL = function(){
			FWDAddress.onChange = self.dlChangeHandler;
			if(self.isEmbedded_bl){
				FWDAddress.setValue("?playlistId=" + self.embeddedPlaylistId + "&videoId=" + self.embeddedVideoId);
			}
			self.dlChangeHandler();
		};
		
		this.dlChangeHandler = function(){
			if(self.hasOpenedInPopup_bl) return;
			var mustReset_bl = false;
			
			if(self.categories_do && self.categories_do.isOnDOM_bl){
				self.categories_do.hide();
				return;
			}
			
			self.catId = parseInt(FWDAddress.getParameter("playlistId"));
			self.id = parseInt(FWDAddress.getParameter("videoId"));
			
			if(self.catId == undefined || self.id == undefined || isNaN(self.catId) || isNaN(self.id)){
				self.catId = self.data.startAtPlaylist;
				self.id = self.data.startAtVideo;
				mustReset_bl = true;
			}
			
			if(self.catId < 0 || self.catId > self.data.totalCategories - 1 && !mustReset_bl){
				self.catId = self.data.startAtPlaylist;
				self.id = self.data.startAtVideo;
				mustReset_bl = true;
			}
			
			if(self.data.playlist_ar){
				if(self.id < 0 && !mustReset_bl){
					self.id = self.data.startAtVideo;
					mustReset_bl = true;
				}else if(self.prevCatId == self.catId && self.id > self.data.playlist_ar.length - 1  && !mustReset_bl){
					self.id = self.data.playlist_ar.length - 1;
					mustReset_bl = true;
				}
			}
			
			if(mustReset_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
				return;
			}
			
			if(self.prevCatId != self.catId){
				self.loadInternalPlaylist();
				self.prevCatId = self.catId;
			}else{
				self.setSource(false);
				if(!self.data.startAtRandomVideo_bl) self.play();
				self.data.startAtRandomVideo_bl = false;
			}
		};
		
		//###########################################//
		/* Setup normal video players */
		//###########################################//
		this.setupNormalVideoPlayers = function(){
			if(FWDUVPlayer.hasHTML5Video){
				self.isAPIReady_bl = true;
				self.setupVideoScreen();
				self.setupVideoPoster();
				self.main_do.addChild(self.preloader_do);
				self.setupClickScreen();
				if(self.data.showLogo_bl) self.setupLogo();
				self.addDoubleClickSupport();
				self.setupVideoHider();
				self.setupController();
				self.setupAdsStart();
				if(self.data.showPlaylistButtonAndPlaylist_bl) self.setupPlaylist();
				self.setupLargePlayPauseButton();
				self.setupHider();
				if(self.data.showPlaylistsButtonAndPlaylists_bl) self.setupCategories();
				self.setupDisableClick();
				if(self.data.showEmbedButton_bl) self.setupEmbedWindow();
				self.setupInfoWindow();
				if(FWDUVPlayer.useYoutube == "no") self.isPlaylistLoadedFirstTime_bl = true;
				self.isAPIReady_bl = true;
				self.dispatchEvent(FWDUVPlayer.READY);
			}else{
				self.setupFlashScreen();
			}
			
			if(self.data.addKeyboardSupport_bl) self.addKeyboardSupport();
			self.resizeHandler();
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		this.setupPreloader = function(){
			FWDUVPPreloader.setPrototype();
			self.preloader_do = new FWDUVPPreloader(self.data.mainPreloader_img, 38, 30, 36, 80);
			self.preloader_do.show(true);
			self.main_do.addChild(self.preloader_do);
		};
	
		this.positionPreloader = function(){
			if(self.isAPIReady_bl && self.isPlaylistLoaded_bl){
				self.preloader_do.setX(parseInt((self.tempVidStageWidth - self.preloader_do.w)/2));
				self.preloader_do.setY(parseInt((self.tempVidStageHeight - self.preloader_do.h)/2));
			}else{
				self.preloader_do.setX(parseInt((self.tempStageWidth - self.preloader_do.w)/2));
				self.preloader_do.setY(parseInt((self.tempStageHeight - self.preloader_do.h)/2));
			}
			
		};
		
		//###########################################//
		/* setup categories */
		//###########################################//
		this.setupCategories = function(){
			FWDUVPCategories.setPrototype();
			self.categories_do = new FWDUVPCategories(self.data, self);
			self.categories_do.getStyle().zIndex = "2147483647";
			self.categories_do.addListener(FWDUVPCategories.HIDE_COMPLETE, self.categoriesHideCompleteHandler);
			if(self.data.showPlaylistsByDefault_bl){
				self.showCatWidthDelayId_to = setTimeout(function(){
					self.showCategories();
				}, 1400);
			};
		};
		
		this.categoriesHideCompleteHandler = function(e){
			self.controller_do.setCategoriesButtonState("unselected");
			if(self.customContextMenu_do) self.customContextMenu_do.updateParent(self.main_do);
			
			if(self.useDeepLinking_bl){
				if(self.categories_do.id != self.catId){
					self.catId = self.categories_do.id;
					self.id = 0;
					FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
					return;
				}
			}else{
				if(self.catId == self.categories_do.id) return;
				self.catId = self.categories_do.id;
				self.id = 0;
				self.loadInternalPlaylist(self.catId);
			}
			
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do && !self.videoScreen_do.isStopped_bl) self.videoScreen_do.setX(0);
				if(self.ytb_do && !self.ytb_do.isStopped_bl) self.ytb_do.setX(0);
			}else{
				if(self.isVideoPlayingWhenOpenWindows_bl) self.resume();
			}
		};
		
		//##########################################//
		/* setup video poster */
		//##########################################//
		this.setupVideoPoster = function(){
			FWDUVPPoster.setPrototype();
			self.videoPoster_do = new FWDUVPPoster(self, self.data.posterBackgroundColor_str, self.data.show);
			self.videoHolder_do.addChild(self.videoPoster_do);
		};
		
		//##########################################//
		/* setup video poster */
		//##########################################//
		this.setupInfoWindow = function(){
			FWDUVPInfoWindow.setPrototype();
			self.infoWindow_do = new FWDUVPInfoWindow(self, self.data);
			self.infoWindow_do.addListener(FWDUVPInfoWindow.HIDE_COMPLETE, self.infoWindowHideCompleteHandler);
			self.main_do.addChild(self.infoWindow_do);
		};
		
		this.infoWindowHideCompleteHandler = function(){
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do && !self.videoScreen_do.isStopped_bl) self.videoScreen_do.setX(0);
				if(self.ytb_do && !self.ytb_do.isStopped_bl) self.ytb_do.setX(0);
			}else{
				if(self.isVideoPlayingWhenOpenWindows_bl) self.resume();
			}
		};
		
		//###########################################//
		/* Setup large play / pause button */
		//###########################################//
		this.setupLargePlayPauseButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.largePlayButton_do = new FWDUVPSimpleButton(self.data.largePlayN_img, self.data.largePlayS_str);
			self.largePlayButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.largePlayButtonUpHandler);
			self.largePlayButton_do.setOverflow("visible");
			self.largePlayButton_do.hide(false);
			self.main_do.addChild(self.largePlayButton_do);
		};
		
		this.largePlayButtonUpHandler = function(){
			self.disableClick();
			self.largePlayButton_do.hide();
			self.play();
		};
		
		this.positionLargePlayButton =  function(){
			self.largePlayButton_do.setX(parseInt((self.tempVidStageWidth - self.largePlayButton_do.w)/2));
			self.largePlayButton_do.setY(parseInt((self.tempVidStageHeight - self.largePlayButton_do.h)/2));
		};
		
		//###########################################//
		/* Setup logo */
		//###########################################//
		this.setupLogo = function(){
			FWDUVPLogo.setPrototype();
			self.logo_do = new FWDUVPLogo(self, self.data.logoPath_str, self.data.logoPosition_str, self.data.logoMargins);
			self.main_do.addChild(self.logo_do);
		};
		
		//###########################################//
		/* Setup playlist */
		//###########################################//
		this.setupPlaylist = function(){
			FWDUVPPlaylist.setPrototype();
			self.playlist_do = new FWDUVPPlaylist(self, self.data);
			self.playlist_do.addListener(FWDUVPPlaylist.THUMB_MOUSE_UP, self.playlistThumbMouseUpHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, self.playPrevVideoHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, self.playNextVideoHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.ENABLE_SHUFFLE, self.enableShuffleHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.DISABLE_SHUFFLE, self.disableShuffleHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.ENABLE_LOOP, self.enableLoopHandler);
			self.playlist_do.addListener(FWDUVPPlaylist.DISABLE_LOOP, self.disableLoopHandler);
			self.main_do.addChildAt(self.playlist_do, 0);
		};
		
		this.playlistThumbMouseUpHandler = function(e){
			if(self.disableClick_bl) return;
			if(self.useDeepLinking_bl && self.id != e.id){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + e.id);
				self.id = e.id;
			}else{
				self.id = e.id;
				self.setSource();
				self.play();
			}
		};
		
		this.playPrevVideoHandler = function(){
			if(self.data.shuffle_bl){
				self.playShuffle();
			}else{
				self.playPrev();
			}
		};
		
		this.playNextVideoHandler = function(){
			if(self.data.shuffle_bl){
				self.playShuffle();
			}else{
				self.playNext();
			}
		};
		
		this.enableShuffleHandler = function(e){
			self.data.shuffle_bl = true;
			self.data.loop_bl = false;
			self.playlist_do.setShuffleButtonState("selected");
			self.playlist_do.setLoopStateButton("unselected");
		};
		
		this.disableShuffleHandler = function(e){
			self.data.shuffle_bl = false;
			self.playlist_do.setShuffleButtonState("unselected");
		};
		
		this.enableLoopHandler = function(e){
			self.data.loop_bl = true;
			self.data.shuffle_bl = false;
			self.playlist_do.setLoopStateButton("selected");
			self.playlist_do.setShuffleButtonState("unselected");
		};
		
		this.disableLoopHandler = function(e){
			self.data.loop_bl = false;
			self.playlist_do.setLoopStateButton("unselected");
		};
		
		//###########################################//
		/* setup controller */
		//###########################################//
		this.setupController = function(){
			FWDUVPController.setPrototype();
			self.controller_do = new FWDUVPController(self.data, self);
			self.controller_do.addListener(FWDUVPController.SHOW_CATEGORIES, self.showCategoriesHandler);
			self.controller_do.addListener(FWDUVPController.SHOW_PLAYLIST, self.showPlaylistHandler);
			self.controller_do.addListener(FWDUVPController.HIDE_PLAYLIST, self.hidePlaylistHandler);
			self.controller_do.addListener(FWDUVPController.PLAY, self.controllerOnPlayHandler);
			self.controller_do.addListener(FWDUVPController.PAUSE, self.controllerOnPauseHandler);
			self.controller_do.addListener(FWDUVPController.START_TO_SCRUB, self.controllerStartToScrubbHandler);
			self.controller_do.addListener(FWDUVPController.SCRUB, self.controllerScrubbHandler);
			self.controller_do.addListener(FWDUVPController.STOP_TO_SCRUB, self.controllerStopToScrubbHandler);
			self.controller_do.addListener(FWDUVPController.CHANGE_VOLUME, self.controllerChangeVolumeHandler);
			self.controller_do.addListener(FWDUVPController.DOWNLOAD_VIDEO, self.controllerDownloadVideoHandler);
			self.controller_do.addListener(FWDUVPController.FACEBOOK_SHARE, self.controllerFacebookShareHandler);
			self.controller_do.addListener(FWDUVPController.CHANGE_YOUTUBE_QUALITY, self.controllerChangeYoutubeQualityHandler);
			self.controller_do.addListener(FWDUVPController.FULL_SCREEN, self.controllerFullScreenHandler);
			self.controller_do.addListener(FWDUVPController.NORMAL_SCREEN, self.controllerNormalScreenHandler);
			self.controller_do.addListener(FWDUVPPlaylist.PLAY_PREV_VIDEO, self.playPrevVideoHandler);
			self.controller_do.addListener(FWDUVPPlaylist.PLAY_NEXT_VIDEO, self.playNextVideoHandler);
			self.controller_do.addListener(FWDUVPController.SHOW_EMBED_WINDOW, self.showEmbedWindowHandler);
			self.controller_do.addListener(FWDUVPController.SHOW_INFO_WINDOW, self.showInfoWindowHandler);
			self.videoHolder_do.addChild(self.controller_do);
		};
		
		this.showCategoriesHandler = function(e){
			self.showCategories();
			self.controller_do.setCategoriesButtonState("selected");
		};
		
		this.showPlaylistHandler = function(e){
			self.disableClick();
			self.showPlaylist();
		};
		
		this.hidePlaylistHandler = function(e){
			self.disableClick();
			self.hidePlaylist();	
		};
		
		this.controllerOnPlayHandler = function(e){
			self.play();
		};
		
		this.controllerOnPauseHandler = function(e){
			self.pause();
		};
		
		this.controllerStartToScrubbHandler = function(e){
			self.startToScrub();
		};
		
		this.controllerScrubbHandler = function(e){
			self.scrub(e.percent);
		};
		
		this.controllerStopToScrubbHandler = function(e){
			self.stopToScrub();
		};
		
		this.controllerChangeVolumeHandler = function(e){
			self.setVolume(e.percent);
		};
		
		this.controllerDownloadVideoHandler = function(){
			self.downloadVideo();
		};
		
		this.controllerFacebookShareHandler = function(e){
			
			if(document.location.protocol == "file:"){
				var error = "Facebook is not allowing sharing local, please test online.";
				self.main_do.addChild(self.info_do);
				self.info_do.showText(error);
				self.dispatchEvent(FWDUVPlayer.ERROR, {error:error});
				return;
			}
			
			if(self.useDeepLinking_bl){
				var curItem = self.data.playlist_ar[self.id];
				var thumbSource;
				
				if(curItem.thumbSource && curItem.thumbSource.indexOf("//") !=  -1){
					thumbSource = curItem.thumbSource;
				}else{
					var absolutePath = location.pathname;
					absolutePath = location.protocol + "//" + location.host + absolutePath.substring(0, absolutePath.lastIndexOf("/") + 1);
					thumbSource = absolutePath + curItem.thumbSource;
				}
				
				self.facebookShare.share(location.href, curItem.titleText, thumbSource);
			}else{
				self.facebookShare.share(location.href);
			}
		};
		
		this.controllerChangeYoutubeQualityHandler = function(e){
			self.ytb_do.setQuality(e.quality);
		};
		
		this.controllerFullScreenHandler = function(){
			self.goFullScreen();
		};
		
		this.controllerNormalScreenHandler = function(){
			self.goNormalScreen();
		};
		
		this.showEmbedWindowHandler = function(){
			
			if(location.protocol.indexOf("file:") != -1){
				self.main_do.addChild(self.info_do);
				self.info_do.showText("Embedding video files local is not allowed or possible! To function properly please test online");
				return;
			}
			
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.isVideoPlayingWhenOpenWindows_bl = self.ytb_do.isPlaying_bl;
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.isVideoPlayingWhenOpenWindows_bl = self.videoScreen_do.isPlaying_bl;
			}
			self.pause();
			
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do) self.videoScreen_do.setX(-5000);
				if(self.ytb_do) self.ytb_do.setX(-5000);
			}
			
			if(self.customContextMenu_do) self.customContextMenu_do.disable();
			self.embedWindow_do.show();
		};
		
		this.showInfoWindowHandler = function(){
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.isVideoPlayingWhenOpenWindows_bl = self.ytb_do.isPlaying_bl;
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.isVideoPlayingWhenOpenWindows_bl = self.videoScreen_do.isPlaying_bl;
			}
			self.pause();
			
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do) self.videoScreen_do.setX(-5000);
				if(self.ytb_do) self.ytb_do.setX(-5000);
			}
			
			self.infoWindow_do.show(self.data.playlist_ar[self.id].desc);
		};
		
		//###########################################//
		/* setup FWDUVPVideoScreen */
		//###########################################//
		this.setupVideoScreen = function(){
			FWDUVPVideoScreen.setPrototype();
			self.videoScreen_do = new FWDUVPVideoScreen(self, self.data.volume);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.ERROR, self.videoScreenErrorHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.STOP, self.videoScreenStopHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY, self.videoScreenPlayHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.PAUSE, self.videoScreenPauseHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE, self.videoScreenUpdateHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.START_TO_BUFFER, self.videoScreenStartToBuferHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.STOP_TO_BUFFER, self.videoScreenStopToBuferHandler);
			self.videoScreen_do.addListener(FWDUVPVideoScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler);
			self.videoHolder_do.addChild(self.videoScreen_do);
		};
		
		this.videoScreenErrorHandler = function(e){
			var error;
			self.isPlaying_bl = false;
			if(FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE){
				error = e.text;
				if(window.console) console.log(e.text);
				if(self.main_do) self.main_do.addChild(self.info_do);
				if(self.info_do) self.info_do.showText(error);
				
				if(self.controller_do){
					self.controller_do.disableMainScrubber();
					self.controller_do.disablePlayButton();
					if(!self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.hide(!self.isMobile_bl);
					self.largePlayButton_do.hide();
					self.hideClickScreen();
					self.hider.stop();
				}
			}else{
				error = e;
				if(self.main_do) self.main_do.addChild(self.info_do);
				if(self.info_do) self.info_do.showText(error);
			}
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do) self.videoScreen_do.setX(-5000);
				if(self.ytb_do) self.ytb_do.setX(-5000);
			}
			if(self.logo_do) self.logo_do.hide(false);
			self.preloader_do.hide(false);
			self.showCursor();
			self.dispatchEvent(FWDUVPlayer.ERROR, {error:error});
		};
		
		this.videoScreenSafeToScrubbHandler = function(){
			if(self.controller_do){
				if(self.isAdd_bl){
					self.controller_do.disableMainScrubber();
					if(self.data.playlist_ar[self.id].ads.timeToHoldAds != 0) self.adsStart_do.show(true);
					if(self.data.playlist_ar[self.id].thumbSource) self.adsStart_do.loadThumbnail(self.data.playlist_ar[self.id].thumbSource);
					self.positionAds();
				}else{
					self.controller_do.enableMainScrubber();
				}
				
				self.controller_do.enablePlayButton();
				self.controller_do.show(true);
				self.hider.start();
			}
			
			if(self.isMobile_bl){
				self.adsSkip_do.hide(false);
			}
			self.showClickScreen();
		};
	
		this.videoScreenStopHandler = function(e){
			if(self.main_do) if(self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
			self.videoPoster_do.allowToShow_bl = true;
			self.isPlaying_bl = false;
			
			if(self.controller_do){
				self.controller_do.disableMainScrubber();
				self.controller_do.showPlayButton();
				if(!self.data.showControllerWhenVideoIsStopped_bl){
					self.controller_do.hide(!self.isMobile_bl);
				}else{
					self.controller_do.show(!self.isMobile_bl);
				}
				self.hider.stop();
			}
			
			if(self.useYoutube_bl){
				if(self.isMobile_bl){
					self.ytb_do.destroyYoutube();
				}else{
					self.ytb_do.stopVideo();
				}
			}
			
			if(self.logo_do) self.logo_do.hide(true);
			
			self.hideClickScreen();
			
			if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.videoPoster_do.hide();
				self.largePlayButton_do.hide();
			}
			
			if(self.isMobile_bl){
				self.adsSkip_do.hide(false);
				self.adsStart_do.hide(false);
			}
			
			self.showCursor();
			self.dispatchEvent(FWDUVPlayer.STOP);
		};
		
		this.videoScreenPlayHandler = function(){
			FWDUVPlayer.keyboardCurInstance = self;
			
			if(self.videoType_str == FWDUVPlayer.YOUTUBE
			   && self.ytb_do && self.ytb_do.isStopped_bl) return;
			
			FWDUVPlayer.stopAllVideos(self);
			
			self.isPlaying_bl = true;
			
			if(self.logo_do) self.logo_do.show(true);
			  
			if(self.controller_do){
				self.controller_do.showPauseButton();
				self.controller_do.show(true);
			}
			self.largePlayButton_do.hide();
			self.hider.start();
			self.showCursor();
			self.dispatchEvent(FWDUVPlayer.PLAY);
		};
		
		this.videoScreenPauseHandler = function(){
			if(self.videoType_str == FWDUVPlayer.YOUTUBE
			   && self.ytb_do && self.ytb_do.isStopped_bl) return;
			
			self.isPlaying_bl = false;
			
			if(self.controller_do) self.controller_do.showPlayButton(); 
			if(!FWDUVPUtils.isIphone && !self.isAdd_bl) self.largePlayButton_do.show();
			self.controller_do.show(true);
			self.hider.stop();
			self.showClickScreen();
			self.hider.reset();
			self.showCursor();
			self.dispatchEvent(FWDUVPlayer.PAUSE);
		};
		
		this.videoScreenUpdateHandler = function(e){
			var percent;	
			if(FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE){
				percent = e.percent;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}else{
				percent = e;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}
			self.dispatchEvent(FWDUVPlayer.UPDATE, {percent:percent});
		};
		
		this.videoScreenUpdateTimeHandler = function(e, e2, e3){
			var time;
			var seconds;
			if(FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.curTime = e.curTime;
				self.totalTime = e.totalTime;
				time = self.curTime + "/" + self.totalTime;
				seconds = e.seconds;
				if(self.controller_do) self.controller_do.updateTime(time);
			}else{
				self.curTime = e;
				self.totalTime = e2;
				time = self.curTime + "/" + self.totalTime;
				if(e == undefined || e2 ==  undefined) time = "00:00/00:00";
				seconds = e3;
				if(self.controller_do) self.controller_do.updateTime(time);
			}
		
			if(self.isAdd_bl){
				if(self.data.playlist_ar[self.id].ads.timeToHoldAds > seconds){
					self.adsStart_do.updateText(self.data.skipToVideoText_str + Math.abs(self.data.playlist_ar[self.id].ads.timeToHoldAds - seconds));
					if(self.isMobile_bl) self.adsSkip_do.hide(false);
				}else if(self.isPlaying_bl){
					self.adsStart_do.hide(true);
					self.adsSkip_do.show(true);
				}
			}
			self.dispatchEvent(FWDUVPlayer.UPDATE_TIME, {currentTime:self.curTime, totalTime:self.totalTime});
		};
		
		this.videoScreenLoadProgressHandler = function(e){
			if(FWDUVPlayer.hasHTML5Video || self.videoType_str == FWDUVPlayer.YOUTUBE){
				if(self.controller_do) self.controller_do.updatePreloaderBar(e.percent);
			}else{
				if(self.controller_do) self.controller_do.updatePreloaderBar(e);
			}
		};
		
		this.videoScreenStartToBuferHandler = function(){
			self.preloader_do.show();
		};
		
		this.videoScreenStopToBuferHandler = function(){
			self.preloader_do.hide(true);
		};
		
		this.videoScreenPlayCompleteHandler = function(e, buttonUsedToSkipAds){
			
			if(self.isAdd_bl){
				if(self.data.openNewPageAtTheEndOfTheAds_bl && self.data.playlist_ar[self.id].ads.pageToOpen != "none" && !buttonUsedToSkipAds){
					if(self.data.playlist_ar[self.id].ads.pageTarget == "_self"){
						location.href = self.data.playlist_ar[self.id].ads.pageToOpen;
					}else{
						window.open(self.data.playlist_ar[self.id].ads.pageToOpen, "_blank");
					}
				}
				self.setSource();
				if(buttonUsedToSkipAds && self.isMobile_bl && self.videoType_str != FWDUVPlayer.YOUTUBE) self.play();
				if(!self.isMobile_bl) setTimeout(self.play, 100);
				return;
			}
			
			if(self.data.stopVideoWhenPlayComplete_bl || self.data.playlist_ar.length == 1){
				self.stop();
			}else if(self.data.loop_bl){
				self.scrub(0);
				self.play();
			}else if(self.data.shuffle_bl){
				self.playShuffle();
				if(self.isMobile_bl) self.stop();
			}else{
				self.playNext();
				if(self.isMobile_bl) self.stop();
			}
			self.hider.reset();
			self.dispatchEvent(FWDUVPlayer.PLAY_COMPLETE);
		};
		
		//##########################################//
		/* Setup skip adds buttons */
		//##########################################//
		this.setupAdsStart = function(){
			FWDUVPAdsStart.setPrototype();
			self.adsStart_do = new FWDUVPAdsStart(
					self.data.adsButtonsPosition_str, 
					self.data.adsBorderNormalColor_str, 
					"", 
					self.data.adsBackgroundPath_str,
					self.data.adsTextNormalColor);
			
			FWDUVPAdsButton.setPrototype();
			self.adsSkip_do = new FWDUVPAdsButton(
					self.data.skipIconPath_img,
					self.data.skipIconSPath_str,
					self.data.skipToVideoButtonText_str,
					self.data.adsButtonsPosition_str, 
					self.data.adsBorderNormalColor_str, 
					self.data.adsBorderSelectedColor_str, 
					self.data.adsBackgroundPath_str,
					self.data.adsTextNormalColor,
					self.data.adsTextSelectedColor);
			self.adsSkip_do.addListener(FWDUVPAdsButton.MOUSE_UP, self.skipAdsMouseUpHandler);
			
			
			self.videoHolder_do.addChild(self.adsSkip_do);
			self.videoHolder_do.addChild(self.adsStart_do);
		};
		
		this.skipAdsMouseUpHandler = function(){
			self.videoScreenPlayCompleteHandler(null, true);
		};
		
		this.positionAds = function(animate){
			
			var finalX;
			var finalY;
			//if(self.adsStart_do.isShowed_bl){
				if(self.data.adsButtonsPosition_str == "left"){
					finalX = 0;
				}else{
					finalX = self.tempVidStageWidth;
				}
				
				if(self.controller_do.isShowed_bl){
					finalY = self.tempVidStageHeight - self.adsStart_do.h - self.data.controllerHeight - 30;
				}else{
					finalY = self.tempVidStageHeight - self.adsStart_do.h - self.data.controllerHeight;
				}
				
				FWDUVPTweenMax.killTweensOf(this.adsStart_do);
				if(animate){
					FWDUVPTweenMax.to(this.adsStart_do, .8, {y:finalY, ease:Expo.easeInOut});
				}else{
					this.adsStart_do.setY(finalY);
				}
				
				//logger.log(finalX + " " + finalY)
				//logger.log(self.data.adsButtonsPosition_str)
				
				self.adsStart_do.setX(finalX);
			//}
			
			//if(self.adsSkip_do.isShowed_bl){
				if(self.data.adsButtonsPosition_str == "left"){
					finalX = 0;
				}else{
					finalX = self.tempVidStageWidth;
				}
				
				if(self.controller_do.isShowed_bl){
					finalY = self.tempVidStageHeight - self.adsSkip_do.h - self.data.controllerHeight - 30;
				}else{
					finalY = self.tempVidStageHeight - self.adsSkip_do.h - self.data.controllerHeight;
				}
				
				FWDUVPTweenMax.killTweensOf(this.adsSkip_do);
				if(animate){
					FWDUVPTweenMax.to(this.adsSkip_do, .8, {y:finalY, ease:Expo.easeInOut});
				}else{
					this.adsSkip_do.setY(finalY);
				}
				
				self.adsSkip_do.setX(finalX);
			//}
		};
		
		//##########################################//
		/* Setup embed window */
		//##########################################//
		this.setupEmbedWindow = function(){
			//if(self.isMobile_bl || location.protocol.indexOf("file:") != -1) return;
			FWDUVPEmbedWindow.setPrototype();
			self.embedWindow_do = new FWDUVPEmbedWindow(self.data, self);
			self.embedWindow_do.addListener(FWDUVPEmbedWindow.ERROR, self.embedWindowErrorHandler);
			self.embedWindow_do.addListener(FWDUVPEmbedWindow.HIDE_COMPLETE, self.embedWindowHideCompleteHandler);
		};
		
		this.embedWindowErrorHandler = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.error);
		};
		
		this.embedWindowHideCompleteHandler = function(){
			if(FWDUVPUtils.isIphone){
				if(self.videoScreen_do && !self.videoScreen_do.isStopped_bl) self.videoScreen_do.setX(0);
				if(self.ytb_do && !self.ytb_do.isStopped_bl) self.ytb_do.setX(0);
			}else{
				if(self.isVideoPlayingWhenOpenWindows_bl) self.resume();
			}
		};
		
		this.copyLinkButtonOnMouseOver = function(){
			self.embedWindow_do.copyLinkButton_do.setSelectedState();
		};
		
		this.copyLinkButtonOnMouseOut = function(){
			self.embedWindow_do.copyLinkButton_do.setNormalState();
		};
		
		this.getLinkCopyPath = function(){
			return self.embedWindow_do.linkToVideo_str;
		};
		
		this.embedkButtonOnMouseOver = function(){
			self.embedWindow_do.copyEmbedButton_do.setSelectedState();
		};
		
		this.embedButtonOnMouseOut = function(){
			self.embedWindow_do.copyEmbedButton_do.setNormalState();
		};
		
		this.getEmbedCopyPath = function(){
			return self.embedWindow_do.finalEmbedCode_str;
		};
		
		
		//#############################################//
		/* Flash screen... */
		//#############################################//
		this.setupFlashScreen = function(){
			if(self.flash_do) return;
			if(!FWDUVPFlashTest.hasFlashPlayerVersion("9.0.18")){
				self.main_do.addChild(self.info_do);
				self.info_do.showText("Please install Adobe Flash Player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>");
				if(self.preloader_do) self.preloader_do.hide(false);
				return;
			}
			
			self.flash_do = new FWDUVPDisplayObject("div");
			self.flash_do.setBackfaceVisibility();
			self.flash_do.setResizableSizeAfterParent();	
			self.videoHolder_do.addChild(self.flash_do);
			
			//var wmode = "transparent";
			//if(FWDUVPUtils.isOpera || FWDUVPUtils.isSafari) wmode = "opaque";
			var wmode = "opaque";
				
			self.flashObjectMarkup_str = '<object id="' + self.instanceName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.data.flashPath_str + '"/><param name="wmode" value="' + wmode + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&bkColor_str=' + self.videoBackgroundColor_str + '"/><object type="application/x-shockwave-flash" data="' + self.data.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + self.data.flashPath_str + '"/><param name="wmode" value="' + wmode + '"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&bkColor_str=' + self.videoBackgroundColor_str + '"/></object></object>';
			
			self.flash_do.screen.innerHTML = self.flashObjectMarkup_str;
			
			self.flashObject = self.flash_do.screen.firstChild;
			if(!FWDUVPUtils.isIE) self.flashObject = self.flashObject.getElementsByTagName("object")[0];
		};
	
		this.flashScreenIsReady = function(){
			if(console) console.log("flash is ready " + self.instanceName_str);
			self.isFlashScreenReady_bl = true;
			self.isAPIReady_bl = true;
			self.dispatchEvent(FWDUVPlayer.READY);
			self.setupVideoPoster();
			self.main_do.addChild(self.preloader_do);
			self.setupClickScreen();
			if(self.data.showLogo_bl) self.setupLogo();
			self.addDoubleClickSupport();
			self.setupVideoHider();
			self.setupController();
			self.setupAdsStart();
			if(self.data.showPlaylistButtonAndPlaylist_bl) self.setupPlaylist();
			self.setupLargePlayPauseButton();
			self.setupHider();
			if(self.data.showPlaylistsButtonAndPlaylists_bl) self.setupCategories();
			self.setupDisableClick();
			if(self.data.showEmbedButton_bl) self.setupEmbedWindow();
			self.setupInfoWindow();
			self.updatePlaylist();
			
			
			self.isPlaylistLoadedFirstTime_bl = true;	
		};
		
		this.flashScreenFail = function(){
			self.main_do.addChild(self.info_do);
			self.info_do.showText("External interface error!");
			self.resizeHandler();
		};
		
		//######################################//
		/* Add keyboard support */
		//######################################//
		this.addKeyboardSupport = function(){
			if(document.addEventListener){
				document.addEventListener("keydown",  this.onKeyDownHandler);	
				document.addEventListener("keyup",  this.onKeyUpHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onkeydown",  this.onKeyDownHandler);	
				document.attachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.onKeyDownHandler = function(e){
			if(self.isSpaceDown_bl) return;
			self.isSpaceDown_bl = true;
			if (e.keyCode == 32){
				if(self.videoType_str == FWDUVPlayer.YOUTUBE){
					if(!self.ytb_do.isSafeToBeControlled_bl) return;
					self.ytb_do.togglePlayPause();
				}else if(FWDUVPlayer.hasHTML5Video){
					if(!self.videoScreen_do.isSafeToBeControlled_bl) return;
					self.videoScreen_do.togglePlayPause();
				}else if(self.isFlashScreenReady_bl){
					self.flashObject.togglePlayPause();
				}
				if(e.preventDefault) e.preventDefault();
				return false;
			}
		};
		
		this.onKeyUpHandler = function(e){
			self.isSpaceDown_bl = false;
		};
		
		//####################################//
		/* Setup hider */
		//####################################//
		this.setupHider = function(){
			FWDUVPHider.setPrototype();
			self.hider = new FWDUVPHider(self.main_do, self.controller_do, self.data.controllerHideDelay);
			self.hider.addListener(FWDUVPHider.SHOW, self.hiderShowHandler);
			self.hider.addListener(FWDUVPHider.HIDE, self.hiderHideHandler);
			self.hider.addListener(FWDUVPHider.HIDE_COMPLETE, self.hiderHideCompleteHandler);
		};
		
		this.hiderShowHandler = function(){
			self.controller_do.show(true);
			if(self.logo_do && self.data.hideLogoWithController_bl && self.isPlaying_bl) self.logo_do.show(true);
			self.showCursor();
			if(self.isAdd_bl){
				self.positionAds(true);
				self.adsStart_do.showWithOpacity();
				self.adsSkip_do.showWithOpacity();	
			}
		};
		
		this.hiderHideHandler = function(){
			if(FWDUVPUtils.isIphone) return;
		
			if(self.controller_do.volumeScrubber_do && self.controller_do.isVolumeScrubberShowed_bl){
				self.hider.reset();
				return;
			}
		
			if(self.data.showYoutubeQualityButton_bl && FWDUVPUtils.hitTest(self.controller_do.ytbButtonsHolder_do.screen, self.hider.globalX, self.hider.globalY)){
				self.hider.reset();
				return;
			}
			
			if(FWDUVPUtils.hitTest(self.controller_do.screen, self.hider.globalX, self.hider.globalY)){
				self.hider.reset();
				return;
			}
			
			if(FWDUVPUtils.hitTest(self.controller_do.mainScrubber_do.screen, self.hider.globalX, self.hider.globalY)){
				self.hider.reset();
				return;
			}
			
			self.controller_do.hide(true);
			if(self.logo_do && self.data.hideLogoWithController_bl) self.logo_do.hide(true);
			if(self.isFullScreen_bl) self.hideCursor();
			
			if(self.isAdd_bl){
				self.positionAds(true);
				self.adsStart_do.hideWithOpacity();
				self.adsSkip_do.hideWithOpacity();	
			}
		};
		
		this.hiderHideCompleteHandler = function(){
			self.controller_do.positionScrollBarOnTopOfTheController();
		};
		
		//####################################//
		// API
		//###################################//
		this.play = function(){
			if(!self.isAPIReady_bl) return;
			if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && !self.ytb_do.isSafeToBeControlled_bl) return;
			if(FWDUVPUtils.isIphone) self.videoScreen_do.setX(0);
			FWDUVPlayer.stopAllVideos(self);
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.ytb_do.play();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.play();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.playVideo();
				self.scrub(0);
			}
			
			FWDUVPlayer.keyboardCurInstance = self;
			self.videoPoster_do.allowToShow_bl = false;
			self.largePlayButton_do.hide();
			self.videoPoster_do.hide();
		};
		
		this.pause = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDUVPUtils.isIphone) self.videoScreen_do.setX(0);
			if(self.videoType_str == FWDUVPlayer.YOUTUBE){
				self.ytb_do.pause();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.pause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.pauseVideo();
			}
		};
		
		this.resume = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDUVPUtils.isIphone) self.videoScreen_do.setX(0);
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.ytb_do.resume();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.resume();
			}
		};
		
		this.stop = function(source){
			if(!self.isAPIReady_bl) return;
			if(FWDUVPUtils.isIphone) self.videoScreen_do.setX(-5000);
			if(self.videoType_str == FWDUVPlayer.YOUTUBE){
				if(self.controller_do.ytbQualityButton_do) self.controller_do.ytbQualityButton_do.disable();
				self.controller_do.hideQualityButtons(false);
				self.ytb_do.stop();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.stop();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopVideo();
			}
			
			if(self.isMobile_bl){
				
				if(self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.show(true);
				
				if(!source && self.videoType_str != FWDUVPlayer.YOUTUBE){
					self.videoPoster_do.show();
					self.largePlayButton_do.show();
				}else if(self.useYoutube_bl){
					if(!self.ytb_do.ytb){
						self.ytb_do.setupVideo();
					}
				}
			}else{
				if(self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.show(true);
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
			}
			
			self.hider.reset();
			self.showCursor();
			self.adsStart_do.hide(true);
			self.adsSkip_do.hide(true);
		};
		
		this.startToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl){
				self.ytb_do.startToScrub();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.startToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.startToScrub();
			}
		};
		
		this.stopToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl){
				self.ytb_do.stopToScrub();
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.stopToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopToScrub();
			}
		};
		
		this.scrub = function(percent){
			if(!self.isAPIReady_bl) return;
			if(isNaN(percent)) return;
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do && self.ytb_do.isSafeToBeControlled_bl){
				self.ytb_do.scrub(percent);
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.scrub(percent);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.scrub(percent);
			}
		};
		
		this.setVolume = function(volume){
			if(!self.isAPIReady_bl || self.isMobile_bl) return;
			self.controller_do.updateVolume(volume, true);
			
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.ytb_do.setVolume(volume);
			}
			
			if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.setVolume(volume);
			}
			
			if(self.isFlashScreenReady_bl){
				self.flashObject.setVolume(volume);
			}
			self.dispatchEvent(FWDUVPlayer.VOLUME_SET, {volume:volume});
		};
			
		this.showCategories = function(){
		
			if(!self.isAPIReady_bl) return;
			if(self.videoType_str == FWDUVPlayer.YOUTUBE && self.ytb_do){
				self.isVideoPlayingWhenOpenWindows_bl = self.ytb_do.isPlaying_bl;
			}else if(FWDUVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.isVideoPlayingWhenOpenWindows_bl = self.videoScreen_do.isPlaying_bl;
			}
			
			if(self.categories_do){
				self.categories_do.show(self.catId);
				if(self.customContextMenu_do) self.customContextMenu_do.updateParent(self.categories_do);
				self.controller_do.setCategoriesButtonState("selected");
				if(!FWDUVPUtils.isIphone) self.pause();
			}
		};
		
		this.hideCategories = function(){
			if(!self.isAPIReady_bl) return;
			if(self.categories_do){
				self.categories_do.hide();
				self.controller_do.setCategoriesButtonState("unselected");
			}
		};
		
		this.showPlaylist = function(){
			if(!self.isAPIReady_bl || !self.showPlaylistButtonAndPlaylist_bl) return;
			self.isPlaylistShowed_bl = false;
			self.controller_do.showHidePlaylistButton();
			self.playlist_do.hide(!self.isMobile_bl);
			self.resizeHandler(!self.isMobile_bl);
			
			if(FWDUVPUtils.isSafari && FWDUVPUtils.isWin){
				self.playlist_do.hide(false);
				self.resizeHandler(false);
			}else{
				if(!self.isMobile_bl){
					FWDUVPTweenMax.to(self, .8, {tempStageWidth:self.stageWidth,
												 tempStageHeight:self.stageHeight,
												 tempVidStageWidth:self.vidStageWidth,
												 tempVidStageHeight:self.vidStageHeight,
												 ease:Expo.easeInOut,
												 onUpdate:self.resizeFinal});
				}
			}
		};
		
		this.hidePlaylist = function(){
			if(!self.isAPIReady_bl || !self.showPlaylistButtonAndPlaylist_bl) return;
			self.isPlaylistShowed_bl = true;
			self.controller_do.showShowPlaylistButton();
			self.playlist_do.show(!self.isMobile_bl);
			self.resizeHandler(!self.isMobile_bl);
			
			if(FWDUVPUtils.isSafari && FWDUVPUtils.isWin){
				self.playlist_do.show(false);
				self.resizeHandler(false);
			}else{
				if(!self.isMobile_bl){
					FWDUVPTweenMax.to(self, .8, {tempStageWidth:self.stageWidth,
												 tempStageHeight:self.stageHeight,
												 tempVidStageWidth:self.vidStageWidth,
												 tempVidStageHeight:self.vidStageHeight,
												 ease:Expo.easeInOut,
												 onUpdate:self.resizeFinal});
				}
			}
			
		};
		
		this.setPosterSource = function(path){
			if(!self.isAPIReady_bl || !path) return;
			var path_ar = path.split(",");
				
			if(self.isMobile_bl && path_ar[1] != undefined){
				path = path_ar[1];
			}else{
				path = path_ar[0];
			}
			
			self.posterPath_str = path;
			if(self.videoSourcePath_str.indexOf(".") == -1 && self.useYoutube_bl && self.isMobile_bl){
				self.videoPoster_do.setPoster("youtubemobile");
			}else{
				self.videoPoster_do.setPoster(self.posterPath_str);
				if(self.prevPosterSource_str != path) self.dispatchEvent(FWDUVPlayer.UPDATE_POSTER_SOURCE);
			}
			self.prevPosterSource_str = path;
		};
		
		this.setSource = function(source, overwrite){
		
			if(!self.isAPIReady_bl) return;
			if(self.id < 0){
				self.id = 0;
			}else if(self.id > self.totalVideos - 1){
				self.id = self.totalVideos - 1;
			}
				
			var source;
			
			if(self.data.playlist_ar[self.id].ads && !self.data.playlist_ar[self.id].isAdsPlayed_bl){
				source = self.data.playlist_ar[self.id].ads.source;
				self.isAdd_bl = true;
				self.data.playlist_ar[self.id].isAdsPlayed_bl = true;
			}else{
				source = source || self.data.playlist_ar[self.id].videoSource;
				self.isAdd_bl = false;
			}
			
			for(var i=0; i<self.data.playlist_ar.length; i++){
				if(self.id != i && !self.data.playAdsOnlyOnce_bl) self.data.playlist_ar[i].isAdsPlayed_bl = false;
			}
		
			if(source == self.prevVideoSource_str && !self.isAdd_bl && !overwrite) return;
			
			self.controller_do.enablePlayButton();
			self.prevVideoSource_str = source;
			
			if(!source){
				self.main_do.addChild(self.info_do);
				self.info_do.showText("Video source is not defined!");
				return;
			}
		
			if(self.playlist_do){
				self.playlist_do.curId = self.id;
				self.playlist_do.checkThumbsState();
			}
			
			self.stop(source);
			self.videoSourcePath_str = source;
			self.finalVideoPath_str = source;
			
			if(self.videoSourcePath_str.indexOf(".") == -1 && self.useYoutube_bl){
				self.videoType_str = FWDUVPlayer.YOUTUBE;
			}else{
				self.videoType_str = FWDUVPlayer.VIDEO;
			}
			
			self.posterPath_str = self.data.playlist_ar[self.id].posterSource;
			
			if(self.isAdd_bl && source.indexOf(".") ==  -1){
				setTimeout(function(){
					self.main_do.addChild(self.info_do);
					self.info_do.showText("Advertisment youtube videos are not supported, please make sure you are using a mp4 video file.");
				}, 200);
				return;
			}
		
			if(self.videoType_str == FWDUVPlayer.YOUTUBE){
				
				self.setPosterSource(self.posterPath_str);
				
				if(!self.ytb_do.ytb){
					self.ytb_do.setupVideo();
				}
				
				if(self.ytb_do.ytb && !self.ytb_do.ytb.cueVideoById) return;	
				if(self.ytb_do){
					self.ytb_do.setX(0);
				}
				
				if(self.flash_do){
					self.flash_do.setWidth(0);
					self.flash_do.setHeight(0);
				}else{
					self.videoScreen_do.setVisible(false);
				}
				
				self.ytb_do.setSource(source);
				if(self.isMobile_bl){
					self.videoPoster_do.hide();
					self.largePlayButton_do.hide();
				}else{
					self.videoPoster_do.show();
					self.largePlayButton_do.show();
					if(self.data.autoPlay_bl) self.play();
				}
				
				self.controller_do.addYtbQualityButton();
				self.resizeHandler(false, true);
				if(self.getVideoSource()) self.dispatchEvent(FWDUVPlayer.UPDATE_VIDEO_SOURCE);
				return;
			}
			
			var path_ar = source.split(",");
			
			if(self.isMobile_bl && path_ar[1] != undefined){
				source = path_ar[1];
			}else{
				source = path_ar[0];
			}
		
			self.finalVideoPath_str = source;
			
			if(FWDUVPlayer.hasHTML5Video && self.videoType_str == FWDUVPlayer.VIDEO){
				
				if(self.ytb_do){
					self.ytb_do.setX(-5000);
				}
			
				self.setPosterSource(self.posterPath_str);
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
				
				if(FWDUVPUtils.isIphone) self.videoScreen_do.setX(-5000);
				
				self.videoScreen_do.setVisible(true);
				self.controller_do.hideQualityButtons(false);
				self.controller_do.removeYtbQualityButton();
				if(self.videoScreen_do){
					self.videoScreen_do.setSource(source);
					if(self.data.autoPlay_bl) self.play();
				}
				
			}else if(self.isFlashScreenReady_bl && self.videoType_str == FWDUVPlayer.VIDEO){
				

				if(self.ytb_do){
					self.ytb_do.setX(-5000);
				}
				
				self.controller_do.removeYtbQualityButton();
				self.controller_do.hideQualityButtons(false);
				if(source.indexOf("://") == -1 && source.indexOf("/") != 1){
					source =  source.substr(source.indexOf("/") + 1);
				}
				
				self.setPosterSource(self.posterPath_str);
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
				
				self.flashObject.setSource(source);
				if(self.data.autoPlay_bl) self.play();
			}
			
			self.prevVideoSourcePath_str = self.videoSourcePath_str;
			self.resizeHandler(false, true);
			if(self.getVideoSource()) self.dispatchEvent(FWDUVPlayer.UPDATE_VIDEO_SOURCE);
		};
		
	
		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		this.goFullScreen = function(){
			if(!self.isAPIReady_bl) return;
			self.isFullScreen_bl = true;
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", self.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", self.onFullScreenChange);
				document.addEventListener("MSFullscreenChange", self.onFullScreenChange);
			}
			
			if(FWDUVPUtils.isSafari && FWDUVPUtils.isWin){
				
			}else{
				if(document.documentElement.requestFullScreen) {
					self.main_do.screen.requestFullScreen();
				}else if(document.documentElement.mozRequestFullScreen){ 
					self.main_do.screen.mozRequestFullScreen();
				}else if(document.documentElement.webkitRequestFullScreen){
					self.main_do.screen.webkitRequestFullScreen();
				}else if(document.documentElement.msRequestFullscreen){
					self.main_do.screen.msRequestFullscreen();
				}
			}
			
			self.disableClick();
			
			if(!self.isEmbedded_bl){
				self.main_do.getStyle().position = "fixed";
				document.documentElement.style.overflow = "hidden";
				self.main_do.getStyle().zIndex = 9999999999998;
			}
			
			self.controller_do.showNormalScreenButton();
			self.controller_do.setNormalStateToFullScreenButton();
			var scrollOffsets = FWDUVPUtils.getScrollOffsets();
			self.lastX = scrollOffsets.x;
			self.lastY = scrollOffsets.y;
			window.scrollTo(0,0);
		
			if(self.isMobile_bl) window.addEventListener("touchmove", self.disableFullScreenOnMobileHandler);
			self.dispatchEvent(FWDUVPlayer.GO_FULLSCREEN);
			self.resizeHandler();
		};
		
		this.disableFullScreenOnMobileHandler = function(e){
			if(e.preventDefault) e.preventDefault();
		};
		
		this.goNormalScreen = function(){		
			if(!self.isAPIReady_bl) return;
			
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msExitFullscreen) {  
				document.msExitFullscreen();  
			}
				
			self.disableClick();
			self.addMainDoToTheOriginalParent();
			self.isFullScreen_bl = false;
		};
		
		this.addMainDoToTheOriginalParent = function(){
			if(!self.isFullScreen_bl) return;
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("MSFullscreenChange", self.onFullScreenChange);
			}
				
			self.controller_do.setNormalStateToFullScreenButton();
		
			
			if(!self.isEmbedded_bl){
				if(self.displayType == FWDUVPlayer.RESPONSIVE){
						if(FWDUVPUtils.isIEAndLessThen9){
							document.documentElement.style.overflow = "auto";
						}else{
							document.documentElement.style.overflow = "visible";
						}
					
					self.main_do.getStyle().position = "relative";
					self.main_do.getStyle().zIndex = 0;
				}else{
					self.main_do.getStyle().position = "absolute";
					self.main_do.getStyle().zIndex = 9999999999998;
				}
			}
			
			if(self.displayType != FWDUVPlayer.FULL_SCREEN) self.controller_do.enablePlaylistButton();
			
			
			self.controller_do.showFullScreenButton();
			window.scrollTo(self.lastX, self.lastY);
			self.showCursor();
			self.resizeHandler();
			setTimeout(self.resizeHandler, 500);
			
			window.scrollTo(self.lastX, self.lastY);
			if(!FWDUVPUtils.isIE){
				setTimeout(function(){
					window.scrollTo(self.lastX, self.lastY);
				}, 150);
			}
			
			if(self.isMobile_bl) window.removeEventListener("touchmove", self.disableFullScreenOnMobileHandler);
			self.dispatchEvent(FWDUVPlayer.GO_NORMALSCREEN);
		};
		
		this.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.msFullscreenElement  || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				self.controller_do.showNormalScreenButton();
				self.addMainDoToTheOriginalParent();
				self.isFullScreen_bl = false;
			}
		};
		
		this.loadPlaylist = function(id){
			if(!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
			if(self.data.prevId == id) return;
			self.catId = id;
			self.id = 0;
			
			if(self.catId < 0){
				self.catId = 0;
			}else if(self.catId > self.data.totalPlaylists - 1){
				self.catId = self.data.totalPlaylists - 1;
			};
			
			if(self.useDeepLinking_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
			}else{
				self.loadInternalPlaylist();
			}
		};
		
		this.playNext = function(){	
			if(!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
			self.id ++;
			if(self.id < 0){
				self.id = self.totalVideos - 1;
			}else if(self.id > self.totalVideos - 1){
				self.id = 0;
			}
		
			if(self.useDeepLinking_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
			}else{
				self.setSource();
				if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.VIDEO) self.play();
				if(!self.isMobile_bl) self.play();
			}
		};
		
		this.playPrev = function(){
			if(!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
			self.id --;	
			if(self.id < 0){
				self.id = self.totalVideos - 1;
			}else if(self.id > self.totalVideos - 1){
				self.id = 0;
			}
			
			if(self.useDeepLinking_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
			}else{
				self.setSource();
				if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.VIDEO) self.play();
				if(!self.isMobile_bl) self.play();
			}
		};
		
		this.playShuffle = function(){
			if(!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
			var tempId = parseInt(Math.random() * self.totalVideos);
			while(tempId == self.id) tempId = parseInt(Math.random() * self.totalVideos);
			self.id = tempId;	
			if(self.id < 0){
				self.id = self.totalVideos - 1;
			}else if(self.id > self.totalVideos - 1){
				self.id = 0;
			}
			
			if(self.useDeepLinking_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
			}else{
				self.setSource();
				if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.VIDEO) self.play();
				if(!self.isMobile_bl) self.play();
			}
		};
		
		this.playVideo = function(videoId){	
			if(!self.isAPIReady_bl || !self.isPlaylistLoaded_bl) return;
			
			self.id = videoId;
			
			if(self.id < 0){
				self.id = self.totalVideos - 1;
			}else if(self.id > self.totalVideos - 1){
				self.id = 0;
			}
			
			if(self.useDeepLinking_bl){
				FWDAddress.setValue("?playlistId=" + self.catId + "&videoId=" + self.id);
			}else{
				self.setSource();
				if(self.isMobile_bl && self.videoType_str == FWDUVPlayer.VIDEO) self.play();
				if(!self.isMobile_bl) self.play();
			}
		};
		
		this.setVideoSource =  function(source){
			self.isAdd_bl = false;
			self.setSource(source);
		};
		
		this.downloadVideo = function(pId){
			
			if(pId ==  undefined) pId = self.id;
			
			var source = self.data.playlist_ar[pId].downloadPath;
			var sourceName = self.data.playlist_ar[pId].titleText;
			self.data.downloadVideo(source, sourceName);
		};
		
		this.share = function(){
			if(!self.isAPIReady_bl) return;
			self.controllerFacebookShareHandler();
		};	
		
		this.getVideoSource = function(){
			if(!self.isAPIReady_bl) return;
			return self.finalVideoPath_str;
		};
		
		this.getPosterSource = function(){
			if(!self.isAPIReady_bl) return;
			return self.posterPath_str;
		};
		
		this.getPlaylistId = function(){
			return self.catId;
		};
		
		this.getVideoId = function(){
			return self.id;
		};
		
		this.getCurrentTime = function(){
			var tm;
			if(!self.curTime){
				tm = "00:00";
			}else{
				tm = self.curTime;
			}
			return tm;
		};
		
		this.getTotalTime = function(){
			var tm;
			if(!self.totalTime){
				tm = "00:00";
			}else{
				tm = self.totalTime;
			}
			return tm;
		};
		
		//###########################################//
		/* Hide / show cursor */
		//###########################################//
		this.hideCursor = function(){
			document.documentElement.style.cursor = "none";
			document.getElementsByTagName("body")[0].style.cursor = "none";
			if(!self.isAdd_bl) self.dumyClick_do.getStyle().cursor = "none";
		};
		
		this.showCursor = function(){
			document.documentElement.style.cursor = "auto";
			document.getElementsByTagName("body")[0].style.cursor = "auto";
			if(self.isAdd_bl){
				self.dumyClick_do.setButtonMode(true);
			}else{
				self.dumyClick_do.getStyle().cursor = "auto";
			}
		};
		

		//###########################################//
		/* event dispatcher */
		//###########################################//
		this.addListener = function (type, listener){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	  //#############################################//
		/* clean main events */
		//#############################################//
		self.cleanMainEvents = function(){
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
			}
		
			clearTimeout(self.resizeHandlerId_to);
			clearTimeout(self.resizeHandler2Id_to);
			clearTimeout(self.hidePreloaderId_to);
			clearTimeout(self.orientationChangeId_to);
		};
	
		//#############################################//
		/* Setup main instance */
		//#############################################//
		if(FWDUVPlayer.useYoutube == "yes"){	
			if((location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isIE)
			   || (location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isOpera)){
			   //|| (location.protocol.indexOf("file:") != -1 && FWDUVPUtils.isSafari)
				self.stageContainer = FWDUVPUtils.getChildById(props.parentId);
				self.setupMainDo();
				self.setupInfo();
				self.main_do.addChild(self.info_do);
				self.info_do.allowToRemove_bl = false;
				self.info_do.showText("This browser dosen't allow the Youtube API to run local, please test it online or in another browser like Firefox or Chrome! <br><br> If you don't want to use Youtube set <font color=\"#FFFFFF\">FWDUVPlayer.useYoutube:\"no\"</font> this way it will work local in this browser.");
				self.resizeHandler();
				return;
			}
			setTimeout(FWDUVPlayer.setupYoutubeAPI, 500);
		}else{
			setTimeout(FWDUVPlayer.setupMainInstance, 500);
		}
		
		var args = FWDUVPUtils.getUrlArgs(window.location.search);

		var embedTest = args.RVPInstanceName;
		var instanceName = args.RVPInstanceName;
	
		if(embedTest){
			self.isEmbedded_bl = props.instanceName == instanceName;
		}
		
		if(self.isEmbedded_bl){
			var ws = FWDUVPUtils.getViewportSize();
			
			self.embeddedPlaylistId = parseInt(args.RVPPlaylistId);
			self.embeddedVideoId = parseInt(args.RVPVideoId);
			
			var dumy_do = new FWDUVPDisplayObject("div");
			dumy_do.setBkColor(props.backgroundColor);
			dumy_do.setWidth(ws.w);
			dumy_do.setHeight(ws.h);
			
			document.documentElement.style.overflow = "hidden";
			document.getElementsByTagName("body")[0].style.overflow = "hidden";
			
			if(FWDUVPUtils.isIEAndLessThen9){
				document.getElementsByTagName("body")[0].appendChild(dumy_do.screen);
			}else{
				document.documentElement.appendChild(dumy_do.screen);
			}
		}
	};
	
	//############################################//
	/* setup youtube api */
	//############################################//
	FWDUVPlayer.setupYoutubeAPI = function(){
		if(FWDUVPlayer.isYoutubeAPICreated_bl) return;
		FWDUVPlayer.isYoutubeAPICreated_bl = true;
		
		if(!window.onYouTubeIframeAPIReady){
			window.onYouTubeIframeAPIReady = function(){
				FWDUVPlayer.setupMainInstance();
			};
		};
		
		var tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	};
	
	/* set prototype */
	FWDUVPlayer.setPrototype =  function(){
		FWDUVPlayer.prototype = new FWDUVPEventDispatcher();
	};
		
	self.countInstances = 1;
	FWDUVPlayer.setupMainInstance = function(pVideo){
		setTimeout(function(){
			FWDUVPlayer.instaces_ar[self.countInstances -1].init();
			if(self.countInstances < FWDUVPlayer.instaces_ar.length) FWDUVPlayer.setupMainInstance();
			self.countInstances++;
		}, self.countInstances * 100);
		
	};
	
	FWDUVPlayer.stopAllVideos = function(pVideo){
		var tt = FWDUVPlayer.instaces_ar.length;
		var video;
		for(var i=0; i<tt; i++){
			video = FWDUVPlayer.instaces_ar[i];
			if(video != pVideo){
				video.stop();
			}
		};
	};
	
	FWDUVPlayer.hasHTML5VideoTestIsDone = false;
	if(!FWDUVPlayer.hasHTML5VideoTestIsDone){
		FWDUVPlayer.hasHTML5Video = (function(){
			var videoTest_el = document.createElement("video");
			var flag = false;
			if(videoTest_el.canPlayType){
				flag = Boolean(videoTest_el.canPlayType('video/mp4') == "probably" || videoTest_el.canPlayType('video/mp4') == "maybe");
				FWDUVPlayer.canPlayMp4 = Boolean(videoTest_el.canPlayType('video/mp4') == "probably" || videoTest_el.canPlayType('video/mp4') == "maybe");
				FWDUVPlayer.canPlayOgg = Boolean(videoTest_el.canPlayType('video/ogg') == "probably" || videoTest_el.canPlayType('video/ogg') == "maybe");
				FWDUVPlayer.canPlayWebm = Boolean(videoTest_el.canPlayType('video/webm') == "probably" || videoTest_el.canPlayType('video/webm') == "maybe");
			}
			
			if(self.isMobile_bl) return true;
			//return false;
			FWDUVPlayer.hasHTML5VideoTestIsDone = true;
			return flag;
		}());
	}
	
	FWDUVPlayer.hasCanvas = (function(){
		return Boolean(document.createElement("canvas"));
	})();
	
	FWDUVPlayer.instaces_ar = [];
	
	FWDUVPlayer.curInstance = null;
	FWDUVPlayer.keyboardCurInstance = null;
	FWDUVPlayer.isYoutubeAPICreated_bl = false;
	
	FWDUVPlayer.PAUSE_ALL_VIDEOS = "pause";
	FWDUVPlayer.STOP_ALL_VIDEOS = "stop";
	FWDUVPlayer.DO_NOTHING = "none";
	FWDUVPlayer.YOUTUBE = "youtube";
	FWDUVPlayer.VIDEO = "video";
	FWDUVPlayer.atLeastOnePlayerHasDeeplinking_bl = false;
	
	FWDUVPlayer.START_TO_LOAD_PLAYLIST = "startToLoadPlaylist";
	FWDUVPlayer.LOAD_PLAYLIST_COMPLETE = "loadPlaylistComplete";
	FWDUVPlayer.READY = "ready";
	FWDUVPlayer.STOP = "stop";
	FWDUVPlayer.PLAY = "play";
	FWDUVPlayer.PAUSE = "pause";
	FWDUVPlayer.UPDATE = "update";
	FWDUVPlayer.UPDATE_TIME = "updateTime";
	FWDUVPlayer.UPDATE_VIDEO_SOURCE = "updateVideoSource";
	FWDUVPlayer.UPDATE_POSTER_SOURCE = "udpatePosterSource";
	FWDUVPlayer.ERROR = "error";
	FWDUVPlayer.PLAY_COMPLETE = "playComplete";
	FWDUVPlayer.VOLUME_SET = "volumeSet";
	FWDUVPlayer.GO_FULLSCREEN = "goFullScreen";
	FWDUVPlayer.GO_NORMALSCREEN = "goNormalScreen";
	
	FWDUVPlayer.RESPONSIVE = "responsive";
	FWDUVPlayer.FULL_SCREEN = "fullscreen";
	
	
	window.FWDUVPlayer = FWDUVPlayer;
	
}(window));/* Thumb */
(function (window){
	
	var FWDUVPLogo = function(
			parent, 
			source,
			position,
			margins
		){
		
		var self  = this;
		var prototype = FWDUVPLogo.prototype;
		
		this.img_img = null;
		
		this.logoImage_do = null;
		
		this.position_str = position;
		this.source_str = source;
		this.logoLink_str = parent.data.logoLink_str;
		
		this.margins = margins;
		
		this.isShowed_bl = true;
		this.allowToShow_bl = true;
	
		this.init = function(){
			
			if(self.logoLink_str == "none"){
				self.getStyle().pointerEvents = "none";
			}else{
				self.setButtonMode(true);
				self.screen.onclick = function(){window.open(self.logoLink_str, "_blank");};
			}
			
			self.logoImage_do = new FWDUVPDisplayObject("img");
			
			self.img_img = new Image();
			self.img_img.onerror = null;
			self.img_img.onload = self.loadDone;
			self.img_img.src = self.source_str;
			self.hide();
		};
		
		this.loadDone = function(){
			self.setWidth(self.img_img.width);
			self.setHeight(self.img_img.height);
			
			self.logoImage_do.setScreen(self.img_img);
			self.addChild(self.logoImage_do);
			self.logoImage_do.setWidth(self.img_img.width);
			self.logoImage_do.setHeight(self.img_img.height);
			
			self.positionAndResize();
		};
		
		this.positionAndResize = function(){
			
			if(!parent.tempVidStageWidth) return;
			
			if(self.position_str == "topleft"){
				self.finalX = self.margins;
				self.finalY = self.margins;
			}else if(self.position_str == "topright"){
				self.finalX = parent.tempVidStageWidth - self.w - self.margins;
				self.finalY = self.margins;
			}else if(self.position_str == "bottomright"){
				self.finalX = parent.tempVidStageWidth - self.w - self.margins;
				self.finalY = parent.tempVidStageHeight - self.h - self.margins;
			}else if(self.position_str == "bottomleft"){
				self.finalX = self.margins;
				self.finalY = parent.tempVidStageHeight - self.h - self.margins;
			}
		
			self.setX(self.finalX);
			self.setY(self.finalY);
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.setVisible(true);
			FWDUVPTweenMax.killTweensOf(self);
			if(animate){
				FWDUVPTweenMax.to(self, .8, {alpha:1, ease:Expo.easeInOut});
			}else{
				self.setAlpha(1);
			}
		};
		
		this.hide = function(animate, overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			self.isShowed_bl = false;
			FWDUVPTweenMax.killTweensOf(self);
			if(animate){
				FWDUVPTweenMax.to(self, .8, {alpha:0, ease:Expo.easeInOut, onComplete:function(){
					self.setVisible(false);
				}});
			}else{
				self.setAlpha(0);
				self.setVisible(false);
			}
		};
		
		
		this.init();
	};
	
	/* set prototype */
    FWDUVPLogo.setPrototype = function(){
    	FWDUVPLogo.prototype = new FWDUVPDisplayObject("div");
    };
    
    FWDUVPLogo.prototype = null;
	window.FWDUVPLogo = FWDUVPLogo;
}(window));/* Thumb */
(function (window){
	
	var FWDUVPPlaylist = function(
			parent, 
			data
		){
		
		var self  = this;
		var prototype = FWDUVPPlaylist.prototype;
		
		this.moveEvent = null;
		
		this.image_img = null;
		this.prevN_img = data.prevN_img;
		this.nextN_img = data.nextN_img;
		this.replayN_img = data.replayN_img;
		this.shuffleN_img = data.shuffleN_img;
		this.scrBkTop_img = data.scrBkTop_img;
		this.scrDragTop_img = data.scrDragTop_img;
		this.scrLinesN_img = data.scrLinesN_img;
		
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
		
		this.bkPath_str = data.controllerBkPath_str;
		this.position_str = parent.playlistPosition_str;
		this.playlistBackgroundColor_str = data.playlistBackgroundColor_str;
		this.inputBackgroundColor_str = data.searchInputBackgroundColor_str;
		this.inputColor_str = data.searchInputColor_str;
		this.prevInputValue_str = "none";
		
		this.scrWidth = self.scrBkTop_img.width;
		this.mouseX = 0;
		this.mouseY = 0;
		this.dif = 0;
		this.countLoadedThumbs = 0;
		this.curId = 0;
		this.finalX = 0;
		this.finalY = 0;
		this.controlBarHeight = data.controllerHeight;
		this.totalThumbs = 0;
		this.totalWidth = parent.playlistWidth;
		this.totalHeight = parent.playlistHeight;
		this.thumbImageW = data.thumbnailWidth;
		this.thumbImageH = data.thumbnailHeight;
		this.thumbInPadding = 2;
		this.spaceBetweenThumbnails = data.spaceBetweenThumbnails;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.spaceBetweenButtons = data.spaceBetweenButtons;
		this.totalButtons = 0;
		this.buttonsToolTipHideDelay = data.buttonsToolTipHideDelay;
		this.removeFromThumbsHolderHeight = 0;
		this.totalThumbsHeight = 0;
		this.scrollBarHandlerFinalY = 0;
		this.stageWidth = self.totalWidth;
		this.stageHeight = self.totalHeight;
		this.scrollbarOffestWidth = data.scrollbarOffestWidth;
		this.lastThumbnailFinalY = -1;
		this.thumbnailsFinalY = 0;
		this.scollbarSpeedSensitivity = data.scollbarSpeedSensitivity;
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
		this.showPlaylistName_bl = data.showPlaylistName_bl;
		this.isShowNothingFound_bl = false;
		this.hasInputFocus_bl = false;
		this.showController_bl = data.showSearchInput_bl || data.showNextAndPrevButtons_bl || data.showLoopButton_bl || data.showShuffleButton_bl;
		this.loop_bl = data.loop_bl;
		this.shuffle_bl = data.shuffle_bl;
		this.showSearchInput_bl = data.showSearchInput_bl;
		this.allowToScrollAndScrollBarIsActive_bl = true;
		this.showPlaylistToolTips_bl = data.showPlaylistToolTips_bl;
		this.hasPlaylist_bl = false;
		this.showPlaylistByDefault_bl = data.showPlaylistByDefault_bl;
		this.repeatBackground_bl =  data.repeatBackground_bl;
		this.addMouseWheelSupport_bl = data.addMouseWheelSupport_bl;
		this.showNextAndPrevButtons_bl = data.showNextAndPrevButtons_bl;
		this.showShuffleButton_bl = data.showShuffleButton_bl;
		this.showLoopButton_bl = data.showLoopButton_bl;
		this.showButtonsToolTip_bl = data.showButtonsToolTip_bl;
		this.isShowed_bl = true;
		this.allowToSwipe_bl = false;
		this.disableThumbs_bl = false;
		this.disableMouseWheel_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.isDragging_bl = false;
		this.isSearched_bl = false;
		
		this.init = function(){
			
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			self.mainHolder_do.setBkColor(self.playlistBackgroundColor_str);
			self.mainThumbsHolder_do = new FWDUVPDisplayObject("div");
			
			self.thumbsHolder_do = new FWDUVPDisplayObject("div");
			self.thumbsHolder_do.setOverflow("visible");
			self.mainThumbsHolder_do.addChild(self.thumbsHolder_do);
			self.mainHolder_do.addChild(self.mainThumbsHolder_do);
			self.addChild(self.mainHolder_do);
			
			if(self.showController_bl){
				self.controllBar_do = new FWDUVPDisplayObject("div");
				
				if(self.repeatBackground_bl){
					self.controllerBk_do =  new FWDUVPDisplayObject("div");
					self.controllerBk_do.getStyle().background = "url('" + self.bkPath_str +  "')";
				}else{
					self.controllerBk_do = new FWDUVPDisplayObject("img");
					var imageBk_img = new Image();
					imageBk_img.src = self.bkPath_str;
					self.controllerBk_do.setScreen(imageBk_img);
				}
				self.controllerBk_do.setHeight(self.controlBarHeight);
				self.controllerBk_do.getStyle().width = "100%";
				
				self.controllBar_do.addChild(self.controllerBk_do);
				self.controllBar_do.setHeight(self.controlBarHeight);
				self.mainHolder_do.addChild(self.controllBar_do);
			}
			
			if(self.showShuffleButton_bl) self.setupShuffleButton();
			if(self.showLoopButton_bl) self.setupLoopButton();
			if(self.showNextAndPrevButtons_bl){
				self.setupPrevButton();
				self.setupNextButton();
			}
			
			if(self.showButtonsToolTip_bl) self.setupToolTips();
			self.totalButtons = self.buttons_ar.length;
		
			if(self.showSearchInput_bl && self.showController_bl) self.setupInput();
			
			if(self.showController_bl){
				self.removeFromThumbsHolderHeight = self.controllBar_do.h + self.spaceBetweenThumbnails;
			}
		
			if(self.isMobile_bl){
				self.setupMobileScrollbar();
			}else{
				self.setupScrollbar();
				if(self.addMouseWheelSupport_bl) self.addMouseWheelSupport();
			}
			
			if(self.showPlaylistName_bl){
				self.setupPlaylistName();
				self.removeFromThumbsHolderHeight += self.controlBarHeight + self.spaceBetweenThumbnails;
				self.mainThumbsHolder_do.setY(self.controlBarHeight + self.spaceBetweenThumbnails);
				if(self.scrMainHolder_do) self.scrMainHolder_do.setY(self.mainThumbsHolder_do.y);
			}
			
			if(self.showPlaylistByDefault_bl){
				self.hideAndShow();
			}else{
				self.hide();
			}
		};
		
		//#####################################//
		/* resize and position */
		//#####################################//
		this.resizeAndPosition = function(resizePlaylistWithAnim){
			
			if(!parent.stageWidth) return;

			if(self.position_str == "bottom"){
				self.stageWidth = parent.stageWidth;
				self.stageHeight = parent.playlistHeight;
				self.finalX = 0;
				self.finalY = parent.tempVidStageHeight + parent.spaceBetweenControllerAndPlaylist;
			}else{
				self.stageWidth = self.totalWidth;
				self.stageHeight = parent.stageHeight;
				self.finalX = parent.stageWidth - self.totalWidth;
				self.finalY = 0;
			}
			
			if(self.bk_do){
				self.bk_do.setWidth(self.stageWidth);
				self.bk_do.setHeight(self.stageHeight);
			}
			
			self.positionThumbs(resizePlaylistWithAnim);
			
			if(self.allowToScrollAndScrollBarIsActive_bl && self.scrMainHolder_do){
				self.mainThumbsHolder_do.setWidth(self.stageWidth - self.scrollbarOffestWidth);
			}else{
				self.mainThumbsHolder_do.setWidth(self.stageWidth);
			}
			self.mainThumbsHolder_do.setHeight(self.stageHeight - self.removeFromThumbsHolderHeight);
			if(self.scrHandler_do)  self.updateScrollBarSizeActiveAndDeactivate();
			
			if(self.controllBar_do) self.positionControllBar();
			self.updateScrollBarHandlerAndContent(resizePlaylistWithAnim);
			
			self.setX(self.finalX);
			self.setY(self.finalY);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
		};
		
		//#################################//
		/* update playlist */
		//#################################//
		this.updatePlaylist = function(playlist, id, playlistName){
			
			self.hasPlaylist_bl = true;
			self.curId = id;
			self.playlist_ar = playlist;	
			self.countLoadedThumbs = 0;
			self.allowToScrollAndScrollBarIsActive_bl = false;
				
			if(self.input_do){
				self.hasInputFocus_bl = false;
				self.input_do.screen.value = "search for video";
			}
			
			self.setupThumbnails();
			self.updatePlaylistName(playlistName);
			self.loadImages();
			
			FWDUVPTweenMax.to(self.mainHolder_do, .8, {x:0, y:0, ease:Expo.easeInOut});
			
			self.resizeAndPosition();
			if(self.scrHandler_do){
				self.updateScrollBarSizeActiveAndDeactivate();
				self.updateScrollBarHandlerAndContent(false, true);
			}
		};
		
		this.destroyPlaylist = function(){
			if(!self.thumbs_ar) return;
			var thumb;
			self.hasPlaylist_bl = false;
			self.image_img.onerror = null;
			self.image_img.onload = null;
			
			FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
			if(self.position_str == "bottom"){
				self.mainHolder_do.setY(-self.stageHeight - 5);
			}else{
				self.mainHolder_do.setX(-self.stageWidth - 5);
			}
			
			clearTimeout(self.loadWithDelayId_to);
			for(var i=0; i<self.totalThumbs; i++){
				thumb = self.thumbs_ar[i];
				self.thumbsHolder_do.removeChild(thumb);
				thumb.destroy();
			}
			self.thumbs_ar = null;
		};
		
		//#################################################//
		/* Setup playlist name */
		//#################################################//
		this.setupPlaylistName = function(){
			self.playlistNameHolder_do =  new FWDUVPDisplayObject("div");
			self.playlistNameHolder_do.setHeight(self.controlBarHeight);
			self.playlistNameHolder_do.getStyle().width = "100%";
			
			if(self.repeatBackground_bl){
				self.playlistNameBk_do =  new FWDUVPDisplayObject("div");
				self.playlistNameBk_do.getStyle().background = "url('" + self.bkPath_str +  "')";
			}else{
				self.playlistNameBk_do = new FWDUVPDisplayObject("img");
				var imageBk_img = new Image();
				imageBk_img.src = self.bkPath_str;
				self.playlistNameBk_do.setScreen(imageBk_img);
			}
			self.playlistNameBk_do.setHeight(self.controlBarHeight);
			self.playlistNameBk_do.getStyle().width = "100%";

			self.playlistName_do = new FWDUVPDisplayObject("div");
			self.playlistName_do.getStyle().width = "100%";
			self.playlistName_do.getStyle().textAlign = "center";
			self.playlistName_do.getStyle().fontSmoothing = "antialiased";
			self.playlistName_do.getStyle().webkitFontSmoothing = "antialiased";
			self.playlistName_do.getStyle().textRendering = "optimizeLegibility";
			self.playlistName_do.getStyle().fontFamily = "Arial";
			self.playlistName_do.getStyle().fontSize= "14px";
			
			self.playlistName_do.getStyle().color = data.playlistNameColor_str;
			
			self.playlistNameHolder_do.addChild(self.playlistNameBk_do);
			self.playlistNameHolder_do.addChild(self.playlistName_do);
			self.mainHolder_do.addChild(self.playlistNameHolder_do);
		};
		
		this.updatePlaylistName = function(label){
			if(!self.playlistName_do) return;
			self.playlistName_do.setInnerHTML(label);
			
			setTimeout(function(){
				self.playlistName_do.setY(parseInt((self.playlistNameHolder_do.h - self.playlistName_do.getHeight())/2) + 1);
			}, 50);
		};
		
		//################################################//
		/* setup input */
		//################################################//
		this.setupInput = function(){
			
			self.input_do = new FWDUVPDisplayObject("input");
			self.input_do.screen.maxLength = 20;
			self.input_do.getStyle().textAlign = "left";
			self.input_do.getStyle().outline = "none";
			self.input_do.getStyle().boxShadow  = "none";
			self.input_do.getStyle().fontSmoothing = "antialiased";
			self.input_do.getStyle().webkitFontSmoothing = "antialiased";
			self.input_do.getStyle().textRendering = "optimizeLegibility";
			self.input_do.getStyle().fontFamily = "Arial";
			self.input_do.getStyle().fontSize= "12px";
			self.input_do.getStyle().padding = "6px";
			if(!FWDUVPUtils.isIEAndLessThen9) self.input_do.getStyle().paddingRight = "-6px";
			self.input_do.getStyle().paddingTop = "2px";
			self.input_do.getStyle().paddingBottom = "3px";
			self.input_do.getStyle().backgroundColor = self.inputBackgroundColor_str;
			self.input_do.getStyle().color = self.inputColor_str;
			self.input_do.screen.value = "search for video";
			
			self.noSearchFound_do = new FWDUVPDisplayObject("div");
			self.noSearchFound_do.setX(0);
			self.noSearchFound_do.getStyle().textAlign = "center";
			self.noSearchFound_do.getStyle().width = "100%";
			self.noSearchFound_do.getStyle().fontSmoothing = "antialiased";
			self.noSearchFound_do.getStyle().webkitFontSmoothing = "antialiased";
			self.noSearchFound_do.getStyle().textRendering = "optimizeLegibility";
			self.noSearchFound_do.getStyle().fontFamily = "Arial";
			self.noSearchFound_do.getStyle().fontSize= "12px";
			self.noSearchFound_do.getStyle().color = self.inputColor_str;
			self.noSearchFound_do.setInnerHTML("NOTHING FOUND!");
			self.noSearchFound_do.setVisible(false);
			self.mainHolder_do.addChild(self.noSearchFound_do);
			
			if(self.input_do.screen.addEventListener){
				self.input_do.screen.addEventListener("mousedown", self.inputFocusInHandler);
				self.input_do.screen.addEventListener("keyup", self.keyUpHandler);
			}else if(self.input_do.screen.attachEvent){
				self.input_do.screen.attachEvent("onmousedown", self.inputFocusInHandler);
				self.input_do.screen.attachEvent("onkeyup", self.keyUpHandler);
			}
			
			var inputArrow_img = new Image();
			inputArrow_img.src = data.inputArrowPath_str;
			self.inputArrow_do = new FWDUVPDisplayObject("img"); 
			self.inputArrow_do.setScreen(inputArrow_img);
			self.inputArrow_do.setWidth(9);
			self.inputArrow_do.setHeight(10);
			
			self.controllBar_do.addChild(self.inputArrow_do);
			self.controllBar_do.addChild(self.input_do);
		};
		
		this.inputFocusInHandler = function(){
			if(self.hasInputFocus_bl) return;
			self.hasInputFocus_bl = true;
			
			if(self.input_do.screen.value == "search for video"){
				self.input_do.screen.value = "";
			}
			
			setTimeout(function(){
				if(window.addEventListener){
					window.addEventListener("mousedown", self.inputFocusOutHandler);
				}else if(document.attachEvent){
					document.attachEvent("onmousedown", self.inputFocusOutHandler);
				}
			}, 50);
		};
		
		this.inputFocusOutHandler = function(e){
			if(!self.hasInputFocus_bl) return;
			var vc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(!FWDUVPUtils.hitTest(self.input_do.screen, vc.screenX, vc.screenY)){
				self.hasInputFocus_bl = false;
				if(self.input_do.screen.value == ""){
					self.input_do.screen.value = "search for video";
					if(window.removeEventListener){
						window.removeEventListener("mousedown", self.inputFocusOutHandler);
					}else if(document.detachEvent){
						document.detachEvent("onmousedown", self.inputFocusOutHandler);
					}
				}
				return;
			}
		};
		
		this.keyUpHandler = function(e){
			if(e.stopPropagation) e.stopPropagation();
			if(self.prevInputValue_str != self.input_do.screen.value){
				if(self.isMobile_bl){
					self.positionThumbs(false);
					self.thumbnailsFinalY = Math.round((self.curId/(self.totalThumbs - 1)) * (self.totalThumbsHeight - self.mainThumbsHolder_do.h)) * -1;
				}else{
					self.positionThumbs(true);
				}
			}
			
			self.prevInputValue_str = self.input_do.screen.value;
			
			if(self.scrHandler_do){
				self.updateScrollBarSizeActiveAndDeactivate();
				self.updateScrollBarHandlerAndContent(true, true);
			}
		};
		
		this.showNothingFound = function(){
			if(self.isShowNothingFound_bl) return;
			self.isShowNothingFound_bl = true;
			
			self.noSearchFound_do.setVisible(true);
			self.noSearchFound_do.setY(parseInt((self.stageHeight - self.noSearchFound_do.getHeight())/2));
			self.noSearchFound_do.setAlpha(0);
			FWDUVPTweenMax.to(self.noSearchFound_do, .1, {alpha:1, yoyo:true, repeat:4});
		};
		
		this.hideNothingFound = function(){
			if(!self.isShowNothingFound_bl) return;
			self.isShowNothingFound_bl = false;
			
			FWDUVPTweenMax.killTweensOf(self.noSearchFound_do);
			self.noSearchFound_do.setVisible(false);
		};
		
		//##########################################//
		/* position controllbar */
		//##########################################//
		this.positionControllBar = function(){
			
			var inputWidth;
			var button;
			var prevButton;
			
			if(self.input_do && self.stageWidth <= 340){
				inputWidth = self.stageWidth - (self.startSpaceBetweenButtons * 2) - self.inputArrow_do.w - self.spaceBetweenButtons;
				
				if(self.nextButton_do)inputWidth -= self.nextButton_do.w + self.spaceBetweenButtons;
				if(self.prevButton_do)inputWidth -= self.prevButton_do.w + self.spaceBetweenButtons;
				if(self.shuffleButton_do) inputWidth -= self.shuffleButton_do.w + self.spaceBetweenButtons;
				if(self.loopButton_do) inputWidth -= self.loopButton_do.w + self.spaceBetweenButtons;
				
				for(var i=0; i<self.totalButtons; i++){
					button = self.buttons_ar[self.totalButtons - 1 - i];
					prevButton = self.buttons_ar[self.totalButtons - i];
					if(i == 0){
						button.setX(self.stageWidth - button.w - self.startSpaceBetweenButtons);
					}else{
						button.setX(prevButton.x - prevButton.w - self.spaceBetweenButtons);
					}
					
					button.setY(parseInt((self.controllBar_do.h - button.h)/2));
				}
			}else if(self.input_do && self.stageWidth > 340){
				inputWidth = self.stageWidth - (self.startSpaceBetweenButtons * 2) - self.inputArrow_do.w - 12;
				if(inputWidth > 350) inputWidth = 350;
				
				if(self.nextButton_do)inputWidth -= self.nextButton_do.w + self.spaceBetweenButtons;
				if(self.prevButton_do)inputWidth -= self.prevButton_do.w + self.spaceBetweenButtons;
				if(self.shuffleButton_do) inputWidth -= self.shuffleButton_do.w + self.spaceBetweenButtons;
				if(self.loopButton_do) inputWidth -= self.loopButton_do.w + self.spaceBetweenButtons;
				
				for(var i=0; i<self.totalButtons; i++){
					button = self.buttons_ar[self.totalButtons - 1 - i];
					prevButton = self.buttons_ar[self.totalButtons - i];
					if(i == 0){
						button.setX(self.stageWidth - button.w - self.startSpaceBetweenButtons);
					}else{
						button.setX(prevButton.x - prevButton.w - self.spaceBetweenButtons);
					}
					
					button.setY(parseInt((self.controllBar_do.h - button.h)/2));
				}
			}else{
				if(self.shuffleButton_do){
					self.shuffleButton_do.setX(self.spaceBetweenButtons);
					self.shuffleButton_do.setY(parseInt((self.controllBar_do.h - self.shuffleButton_do.h)/2));
					if(self.loopButton_do){
						self.loopButton_do.setX(self.shuffleButton_do.x + self.shuffleButton_do.w + self.spaceBetweenButtons);
						self.loopButton_do.setY(parseInt((self.controllBar_do.h - self.shuffleButton_do.h)/2));
					}
				}else if(self.loopButton_do){
					self.loopButton_do.setX(self.spaceBetweenButtons);
					self.loopButton_do.setY(parseInt((self.controllBar_do.h - self.loopButton_do.h)/2));
				}
				
				if(self.nextButton_do){
					self.nextButton_do.setX(self.stageWidth - self.nextButton_do.w - self.startSpaceBetweenButtons);
					self.nextButton_do.setY(parseInt((self.controllBar_do.h - self.nextButton_do.h)/2));
					
					self.prevButton_do.setX(self.nextButton_do.x - self.nextButton_do.w - self.spaceBetweenButtons);
					self.prevButton_do.setY(parseInt((self.controllBar_do.h - self.prevButton_do.h)/2));
				}
			}
			
			if(self.input_do){
				self.input_do.setWidth(inputWidth);
				self.input_do.setX(self.startSpaceBetweenButtons);
				self.input_do.setY(parseInt((self.controllBar_do.h - self.input_do.getHeight())/2) + 1);
				self.inputArrow_do.setX(parseInt(self.input_do.x + self.input_do.getWidth()) + 1);
				self.inputArrow_do.setY(parseInt((self.controllBar_do.h - self.inputArrow_do.h)/2) + 1);
			}
		
			self.controllBar_do.setWidth(self.stageWidth);
			self.controllBar_do.setY(self.stageHeight - self.controllBar_do.h);
		};
		
		//################################################//
		/* Setup prev button */
		//################################################//
		this.setupPrevButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.prevButton_do = new FWDUVPSimpleButton(self.prevN_img, data.prevSPath_str);
			self.prevButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.prevButtonShowTooltipHandler);
			self.prevButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.prevButtonOnMouseUpHandler);
			self.buttons_ar.push(self.prevButton_do);
			self.controllBar_do.addChild(self.prevButton_do); 
		};
		
		this.prevButtonShowTooltipHandler = function(e){
			self.showToolTip(self.prevButton_do, self.prevButtonToolTip_do, e.e);
		};
		
		this.prevButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPPlaylist.PLAY_PREV_VIDEO);
		};
		
		//################################################//
		/* Setup next button */
		//################################################//
		this.setupNextButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.nextButton_do = new FWDUVPSimpleButton(self.nextN_img, data.nextSPath_str);
			self.nextButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.nextButtonShowTooltipHandler);
			self.nextButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.nextButtonOnMouseUpHandler);
			self.buttons_ar.push(self.nextButton_do);
			self.controllBar_do.addChild(self.nextButton_do);
		};
		
		this.nextButtonShowTooltipHandler = function(e){
			self.showToolTip(self.nextButton_do, self.nextButtonToolTip_do, e.e);
		};
		
		this.nextButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO);
		};
		
		//##########################################//
		/* Setup shuffle button */
		//#########################################//
		this.setupShuffleButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.shuffleButton_do = new FWDUVPSimpleButton(self.shuffleN_img, data.shufflePathS_str, undefined, true);
			self.shuffleButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.shuffleButtonShowToolTipHandler);
			self.shuffleButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.shuffleButtonOnMouseUpHandler);
			self.buttons_ar.push(self.shuffleButton_do);
			self.controllBar_do.addChild(self.shuffleButton_do); 
			if(!self.loop_bl && self.shuffle_bl) self.setShuffleButtonState("selected");
		};
		
		this.shuffleButtonShowToolTipHandler = function(e){
			self.showToolTip(self.shuffleButton_do, self.shuffleButtonToolTip_do, e.e);
		};
		
		this.shuffleButtonOnMouseUpHandler = function(){
			if(self.shuffleButton_do.isSelectedFinal_bl){
				self.dispatchEvent(FWDUVPPlaylist.DISABLE_SHUFFLE);
			}else{
				self.dispatchEvent(FWDUVPPlaylist.ENABLE_SHUFFLE);
			}
		};
		
		this.setShuffleButtonState = function(state){	
			if(!self.shuffleButton_do) return;
			if(state == "selected"){
				self.shuffleButton_do.setSelected();
			}else if(state == "unselected"){
				self.shuffleButton_do.setUnselected();
			}
		};
		
		//##########################################//
		/* Setup loop button */
		//#########################################//
		this.setupLoopButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.loopButton_do = new FWDUVPSimpleButton(self.replayN_img, data.replaySPath_str, undefined, true);
			self.loopButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.loopButtonShowTooltipHandler);
			self.loopButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.loopButtonOnMouseUpHandler);
			self.buttons_ar.push(self.loopButton_do);
			self.controllBar_do.addChild(self.loopButton_do); 
			if(self.loop_bl) self.setLoopStateButton("selected");
		};
		
		
		this.loopButtonShowTooltipHandler = function(e){
			self.showToolTip(self.loopButton_do, self.loopButtonToolTip_do, e.e);
		};
		
		this.loopButtonOnMouseUpHandler = function(){
			if(self.loopButton_do.isSelectedFinal_bl){
				self.dispatchEvent(FWDUVPPlaylist.DISABLE_LOOP);
			}else{
				self.dispatchEvent(FWDUVPPlaylist.ENABLE_LOOP);
			}
		};
		
		
		this.setLoopStateButton = function(state){
			if(!self.loopButton_do) return;
			if(state == "selected"){
				self.loopButton_do.setSelected();
			}else if(state == "unselected"){
				self.loopButton_do.setUnselected();
			}
		};
		
		//################################//
		/* Setup tooltips */
		//################################//		
		this.setupToolTips = function(){
		
			if(self.showNextAndPrevButtons_bl){
				FWDUVPToolTip.setPrototype();
				self.prevButtonToolTip_do = new FWDUVPToolTip(self.prevButton_do, data.toopTipBk_str, data.toopTipPointer_str, "previous video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.prevButtonToolTip_do.screen);
				
				FWDUVPToolTip.setPrototype();
				self.nextButtonToolTip_do = new FWDUVPToolTip(self.nextButton_do, data.toopTipBk_str, data.toopTipPointer_str, "next video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.nextButtonToolTip_do.screen);
			}
		
			if(self.showShuffleButton_bl){
				FWDUVPToolTip.setPrototype();
				self.shuffleButtonToolTip_do = new FWDUVPToolTip(self.shuffleButton_do, data.toopTipBk_str, data.toopTipPointer_str,  "shuffle", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.shuffleButtonToolTip_do.screen);
			}
			
			if(self.showLoopButton_bl){
				FWDUVPToolTip.setPrototype();
				self.loopButtonToolTip_do = new FWDUVPToolTip(self.loopButton_do, data.toopTipBk_str, data.toopTipPointer_str, "loop", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.loopButtonToolTip_do.screen);
			}
		};
		
		this.showToolTip = function(button, toolTip, e){
			if(!self.showButtonsToolTip_bl) return;
			var ws = FWDUVPUtils.getViewportSize();
			var wc = FWDUVPUtils.getViewportMouseCoordinates(e);
			var localX;
			var localY;
			
			if(button.screen.offsetWidth < 3){
				localX = parseInt(button.getGlobalX() * 100 + button.w/2 - toolTip.w/2);
				localY = parseInt(button.getGlobalY() * 100 - toolTip.h - 8);
			}else{
				localX = parseInt(button.getGlobalX() + button.w/2 - toolTip.w/2);
				localY = parseInt(button.getGlobalY() - toolTip.h - 8);
			}
			
			var offseX = 0;
		
			if(localX < 0){
				offseX = localX;
				localX = 0;
			}else if(localX + toolTip.w > ws.w){
				offseX = (ws.w - (localX + toolTip.w)) * -1;
				localX = localX + (offseX * -1);
			}
			
			toolTip.positionPointer(offseX, false);
			
			toolTip.setX(localX);
			toolTip.setY(localY);
			toolTip.show();
		};
		
		this.setupThumbnails = function(){
			self.totalThumbs = self.playlist_ar.length;
			self.thumbs_ar = [];
			var thumb;
			for(var i=0; i<self.totalThumbs; i++){
				FWDUVPPlaylistThumb.setPrototype();
				thumb = new FWDUVPPlaylistThumb(
						self, 
						i, 
						data.playlistThumbnailsBkPath_str,
						data.thumbnailNormalBackgroundColor_str,
						data.thumbnailHoverBackgroundColor_str,
						data.thumbnailDisabledBackgroundColor_str,
						self.thumbImageW,
						self.thumbImageH,
						self.thumbInPadding,
						self.playlist_ar[i].title,
						self.playlist_ar[i].titleText);
				
				self.thumbs_ar[i] = thumb;
			
				thumb.addListener(FWDUVPPlaylistThumb.MOUSE_UP, self.thumbMouseUpHandler);
				self.thumbsHolder_do.addChild(thumb);
			}
		};
		
		this.thumbMouseUpHandler = function(e){
			if(self.disableThumbs_bl) return;
			self.disableForAWhileAfterThumbClick_bl = true;
			clearTimeout(self.disableForAWhileAfterThumbClickId_to);
			self.disableForAWhileAfterThumbClickId_to = setTimeout(function(){
				self.disableForAWhileAfterThumbClick_bl = false;
			}, 50);
			self.dispatchEvent(FWDUVPPlaylist.THUMB_MOUSE_UP, {id:e.id});
		};
		
		//#############################################//
		/* load thumbnail images */
		//#############################################//
		this.loadImages = function(){
			if(!self.playlist_ar[self.countLoadedThumbs]) return;
			
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
			}
			
			self.image_img = new Image();
			self.image_img.onerror = self.onImageLoadError;
			self.image_img.onload = self.onImageLoadComplete;
			
			self.image_img.src = self.playlist_ar[self.countLoadedThumbs].thumbSource;
		};
		
		this.onImageLoadError = function(e){};
		
		this.onImageLoadComplete = function(e){
			var thumb = self.thumbs_ar[self.countLoadedThumbs];
			thumb.setImage(self.image_img);
			self.countLoadedThumbs++;
			self.loadWithDelayId_to = setTimeout(self.loadImages, 40);	
		};
		
		//#####################################//
		/* enable disable thumbs based on id */
		//#####################################//
		this.checkThumbsState = function(){
			if(!self.thumbs_ar) return;
			var thumb;
			for(var i=0; i< self.totalThumbs; i++){
				thumb = self.thumbs_ar[i];
				if(i == self.curId){
					thumb.disable();
				}else{
					thumb.enable();
				}
			};
		};
		
		this.positionThumbs = function(animate){
			if(!self.thumbs_ar) return;
			var thumb;
			var curX;
			var curY;
			var thumbImageW = self.stageWidth;
			var inputValue;
			var copy_ar = [].concat(self.thumbs_ar);
			self.isSearched_bl = false;
		
			if(self.input_do){
				inputValue = self.input_do.screen.value.toLowerCase();
				if(inputValue != "search for video"){
					for(var i=0; i<copy_ar.length; i++){
						thumb = copy_ar[i];
						if(thumb.htmlText_str.indexOf(inputValue) == -1){
							FWDUVPTweenMax.killTweensOf(thumb);
							thumb.setX(-thumb.w - 20);
							copy_ar.splice(i, 1);
							i--;
						}
					}
				}
			}
		
			var totalThumbs = copy_ar.length;
			if(self.totalThumbs != totalThumbs) self.isSearched_bl = true;
		
			for(var i=0; i<totalThumbs; i++){
				thumb = copy_ar[i];
				thumb.finalW = self.stageWidth;
				thumb.finalX = 0;
				thumb.finalY = i * (thumb.finalH + self.spaceBetweenThumbnails);
				thumb.resizeAndPosition(animate);
			}
			
			if(totalThumbs == 0){
				self.showNothingFound();
			}else{
				self.hideNothingFound();
			}
			
			self.totalThumbsHeight = Math.max(0, totalThumbs * (thumb.h + self.spaceBetweenThumbnails) - self.spaceBetweenThumbnails);
			
			if(self.totalThumbsHeight > self.stageHeight - self.removeFromThumbsHolderHeight){
				self.allowToScrollAndScrollBarIsActive_bl = true;
			}else{
				self.allowToScrollAndScrollBarIsActive_bl = false;
			}
		};
		
		
		//##########################################//
		/* setup mobile scrollbar */
		//##########################################//
		this.setupMobileScrollbar = function(){
			if(self.hasPointerEvent_bl){
				self.mainThumbsHolder_do.screen.addEventListener("MSPointerDown", self.scrollBarTouchStartHandler);
			}else{
				self.mainThumbsHolder_do.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
			}
			//self.mainThumbsHolder_do.screen.addEventListener("mousedown", self.scrollBarTouchStartHandler);
			self.updateMobileScrollBarId_int = setInterval(self.updateMobileScrollBar, 16);
		};
		
		this.scrollBarTouchStartHandler = function(e){
			//if(e.preventDefault) e.preventDefault();
			FWDUVPTweenMax.killTweensOf(self.thumbsHolder_do);
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.lastPresedY = viewportMouseCoordinates.screenY;
	
			if(self.hasPointerEvent_bl){
				window.addEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.addEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", self.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
			//window.addEventListener("mouseup", self.scrollBarTouchEndHandler);
			//window.addEventListener("mousemove", self.scrollBarTouchMoveHandler);
			clearInterval(self.updateMoveMobileScrollbarId_int);
			self.updateMoveMobileScrollbarId_int = setInterval(self.updateMoveMobileScrollbar, 20);
		};
		
		this.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.totalThumbsHeight < self.mainThumbsHolder_do.h) return;
			parent.showDisable();
		
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var toAdd = viewportMouseCoordinates.screenY - self.lastPresedY;
		
			self.thumbnailsFinalY += toAdd;
			self.thumbnailsFinalY = Math.round(self.thumbnailsFinalY);
			
			self.lastPresedY = viewportMouseCoordinates.screenY;
			self.vy = toAdd  * 2;
		};
		
		this.scrollBarTouchEndHandler = function(e){
			self.isDragging_bl = false;
			clearInterval(self.updateMoveMobileScrollbarId_int);
			clearTimeout(self.disableOnMoveId_to);
			self.disableOnMoveId_to = setTimeout(function(){
				parent.hideDisable();
			},100);
			if(self.hasPointerEvent_bl){
				window.removeEventListener("MSPointerUp", self.scrollBarTouchEndHandler);
				window.removeEventListener("MSPointerMove", self.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
			//window.removeEventListener("mousemove", self.scrollBarTouchMoveHandler);
		};
		
		this.updateMoveMobileScrollbar = function(){
			self.thumbsHolder_do.setY(self.thumbnailsFinalY);
		};
		
		this.updateMobileScrollBar = function(animate){
			
			if(!self.isDragging_bl){
			
				//if(self.isSearched_bl){
					//self.thumbnailsFinalY = 0;
					//self.thumbsHolder_do.setY(Math.round(self.thumbnailsFinalY));
					//return;
				//}
				
				if(self.totalThumbsHeight < self.mainThumbsHolder_do.h) self.thumbnailsFinalY = 0.01;
				
				self.vy *= self.friction;
				self.thumbnailsFinalY += self.vy;	
			
				if(self.thumbnailsFinalY > 0){
					self.vy2 = (0 - self.thumbnailsFinalY) * .3;
					self.vy *= self.friction;
					self.thumbnailsFinalY += self.vy2;
				}else if(self.thumbnailsFinalY < self.mainThumbsHolder_do.h - self.totalThumbsHeight){
					self.vy2 = (self.mainThumbsHolder_do.h - self.totalThumbsHeight - self.thumbnailsFinalY) * .3;
					self.vy *= self.friction;
					self.thumbnailsFinalY += self.vy2;
				}
				
				self.thumbsHolder_do.setY(Math.round(self.thumbnailsFinalY));
			}
		};
		
		//#################################//
		/* setup mouse scrollbar */
		//#################################//
		this.setupScrollbar = function(){
			self.scrMainHolder_do = new FWDUVPDisplayObject("div");
			self.scrMainHolder_do.setWidth(self.scrWidth);
			
			//track
			self.scrTrack_do = new FWDUVPDisplayObject("div");
			self.scrTrack_do.setWidth(self.scrWidth);
			self.scrTrackTop_do = new FWDUVPDisplayObject("img");
			self.scrTrackTop_do.setScreen(self.scrBkTop_img);
			self.scrTrackMiddle_do = new FWDUVPDisplayObject("div");
			self.scrTrackMiddle_do.getStyle().background = "url('" + data.scrBkMiddlePath_str + "')";
			self.scrTrackMiddle_do.setWidth(self.scrWidth);
			self.scrTrackMiddle_do.setY(self.scrTrackTop_do.h);
			var scrTrackBottomImage_img = new Image();
			scrTrackBottomImage_img.src = data.scrBkBottomPath_str;
			self.scrTrackBottom_do = new FWDUVPDisplayObject("img");
			self.scrTrackBottom_do.setScreen(scrTrackBottomImage_img);
			self.scrTrackBottom_do.setWidth(self.scrTrackTop_do.w);
			self.scrTrackBottom_do.setHeight(self.scrTrackTop_do.h);
			
			//handler
			self.scrHandler_do = new FWDUVPDisplayObject("div");
			self.scrHandler_do.setWidth(self.scrWidth);
			self.scrHandlerTop_do = new FWDUVPDisplayObject("img");
			self.scrHandlerTop_do.setScreen(self.scrDragTop_img);
			self.scrHandlerMiddle_do = new FWDUVPDisplayObject("div");
			self.scrHandlerMiddle_do.getStyle().background = "url('" + data.scrDragMiddlePath_str + "')";
			self.scrHandlerMiddle_do.setWidth(self.scrWidth);
			self.scrHandlerMiddle_do.setY(self.scrHandlerTop_do.h);
			var scrHandlerBottom_img = new Image();
			scrHandlerBottom_img.src = data.scrDragBottomPath_str;
			self.scrHandlerBottom_do = new FWDUVPDisplayObject("img");
			self.scrHandlerBottom_do.setScreen(scrHandlerBottom_img);
			self.scrHandlerBottom_do.setWidth(self.scrHandlerTop_do.w);
			self.scrHandlerBottom_do.setHeight(self.scrHandlerTop_do.h);
			self.scrHandler_do.setButtonMode(true);
			
			self.scrHandlerLinesN_do = new FWDUVPDisplayObject("img");
			self.scrHandlerLinesN_do.setScreen(self.scrLinesN_img);
			var scrHandlerLinesS_img = new Image();
			scrHandlerLinesS_img.src = data.scrLinesSPath_str;
			self.scrHandlerLinesS_do = new FWDUVPDisplayObject("img");
			self.scrHandlerLinesS_do.setScreen(scrHandlerLinesS_img);
			self.scrHandlerLinesS_do.setWidth(self.scrHandlerLinesN_do.w);
			self.scrHandlerLinesS_do.setHeight(self.scrHandlerLinesN_do.h);
			self.scrHandlerLinesS_do.setAlpha(0);
			self.scrHandlerLines_do = new FWDUVPDisplayObject("div");
			self.scrHandlerLines_do.hasTransform3d_bl = false;
			self.scrHandlerLines_do.hasTransform2d_bl = false;
			self.scrHandlerLines_do.setBackfaceVisibility();
			self.scrHandlerLines_do.setWidth(self.scrHandlerLinesN_do.w);
			self.scrHandlerLines_do.setHeight(self.scrHandlerLinesN_do.h);
			self.scrHandlerLines_do.setButtonMode(true);
				
			self.scrTrack_do.addChild(self.scrTrackTop_do);
			self.scrTrack_do.addChild(self.scrTrackMiddle_do);
			self.scrTrack_do.addChild(self.scrTrackBottom_do);
			self.scrHandler_do.addChild(self.scrHandlerTop_do);
			self.scrHandler_do.addChild(self.scrHandlerMiddle_do);
			self.scrHandler_do.addChild(self.scrHandlerBottom_do);
			self.scrHandlerLines_do.addChild(self.scrHandlerLinesN_do);
			self.scrHandlerLines_do.addChild(self.scrHandlerLinesS_do);
			self.scrMainHolder_do.addChild(self.scrTrack_do);
			self.scrMainHolder_do.addChild(self.scrHandler_do);
			self.scrMainHolder_do.addChild(self.scrHandlerLines_do);
			self.mainHolder_do.addChild(self.scrMainHolder_do);
			
			
			if(self.scrHandler_do.screen.addEventListener){
				self.scrHandler_do.screen.addEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
				self.scrHandler_do.screen.addEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
				self.scrHandler_do.screen.addEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
				self.scrHandlerLines_do.screen.addEventListener("mouseover", self.scrollBarHandlerOnMouseOver);
				self.scrHandlerLines_do.screen.addEventListener("mouseout", self.scrollBarHandlerOnMouseOut);
				self.scrHandlerLines_do.screen.addEventListener("mousedown", self.scrollBarHandlerOnMouseDown);
			}else if(self.scrHandler_do.screen.attachEvent){
				self.scrHandler_do.screen.attachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrHandler_do.screen.attachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrHandler_do.screen.attachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
				self.scrHandlerLines_do.screen.attachEvent("onmouseover", self.scrollBarHandlerOnMouseOver);
				self.scrHandlerLines_do.screen.attachEvent("onmouseout", self.scrollBarHandlerOnMouseOut);
				self.scrHandlerLines_do.screen.attachEvent("onmousedown", self.scrollBarHandlerOnMouseDown);
			}
		};
		
		this.scrollBarHandlerOnMouseOver = function(e){
			if(!self.allowToScrollAndScrollBarIsActive_bl) return; 
			FWDUVPTweenMax.to(self.scrHandlerLinesS_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.scrollBarHandlerOnMouseOut = function(e){
			if(self.isDragging_bl || !self.allowToScrollAndScrollBarIsActive_bl) return;
			FWDUVPTweenMax.to(self.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.scrollBarHandlerOnMouseDown = function(e){
			if(!self.allowToScrollAndScrollBarIsActive_bl) return;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);		
			self.isDragging_bl = true;
			self.yPositionOnPress = self.scrHandler_do.y;
			self.lastPresedY = viewportMouseCoordinates.screenY;
			FWDUVPTweenMax.killTweensOf(self.scrHandler_do);
			parent.showDisable();
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.addEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.attachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		this.scrollBarHandlerMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var linesY = self.scrollBarHandlerFinalY + parseInt((self.scrHandler_do.h - self.scrHandlerLines_do.h)/2);
	
			self.scrollBarHandlerFinalY = Math.round(self.yPositionOnPress + viewportMouseCoordinates.screenY - self.lastPresedY);
			if(self.scrollBarHandlerFinalY >= self.scrTrack_do.h - self.scrHandler_do.h){
				self.scrollBarHandlerFinalY = self.scrTrack_do.h -  self.scrHandler_do.h;
			}else if(self.scrollBarHandlerFinalY <= 0){
				self.scrollBarHandlerFinalY = 0;
			}
			
			self.scrHandler_do.setY(self.scrollBarHandlerFinalY);
			FWDUVPTweenMax.killTweensOf(self.scrHandler_do);
			FWDUVPTweenMax.to(self.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			self.updateScrollBarHandlerAndContent(true);
		};
		
		self.scrollBarHandlerEndHandler = function(e){
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			self.isDragging_bl = false;
			
			if(!FWDUVPUtils.hitTest(self.scrHandler_do.screen, viewportMouseCoordinates.screenX, viewportMouseCoordinates.screenY)){
				FWDUVPTweenMax.to(self.scrHandlerLinesS_do, .8, {alpha:0, ease:Expo.easeOut});
			}
			
			//self.scrollBarHandlerFinalY = parseInt((self.scrTrack_do.h - self.scrHandler_do.h) * (self.thumbnailsFinalY/((self.totalPlayListItems - self.nrOfVisiblePlaylistItems) * self.itemHeight))) * -1;
			
			//if(self.scrollBarHandlerFinalY.y < 0){
			//	self.scrollBarHandlerFinalY = 0;
			//}else if(self.scrollBarHandlerFinalY > self.scrTrack_do.h - self.scrHandler_do.h - 1){
			//	self.scrollBarHandlerFinalY = self.scrTrack_do.h - self.scrHandler_do.h - 1;
			//}
			
			parent.hideDisable();
			FWDUVPTweenMax.killTweensOf(self.scrHandler_do);
			FWDUVPTweenMax.to(self.scrHandler_do, .4, {y:self.scrollBarHandlerFinalY, ease:Quart.easeOut});
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.scrollBarHandlerMoveHandler);
				window.removeEventListener("mouseup", self.scrollBarHandlerEndHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.scrollBarHandlerMoveHandler);
				document.detachEvent("onmouseup", self.scrollBarHandlerEndHandler);
			}
		};
		
		this.updateScrollBarSizeActiveAndDeactivate = function(){
			if(self.disableForAWhileAfterThumbClick_bl) return;
			if(self.allowToScrollAndScrollBarIsActive_bl){
				self.allowToScrollAndScrollBarIsActive_bl = true;
				self.scrMainHolder_do.setX(self.stageWidth - self.scrMainHolder_do.w);
				self.scrMainHolder_do.setHeight(self.stageHeight - self.removeFromThumbsHolderHeight);
				self.scrTrack_do.setHeight(self.scrMainHolder_do.h);
				self.scrTrackMiddle_do.setHeight(self.scrTrack_do.h - (self.scrTrackTop_do.h * 2));
				self.scrTrackBottom_do.setY(self.scrTrackMiddle_do.y + self.scrTrackMiddle_do.h);
				self.scrMainHolder_do.setAlpha(1);
				self.scrHandler_do.setButtonMode(true);
				self.scrHandlerLines_do.setButtonMode(true);
			}else{
				self.allowToScrollAndScrollBarIsActive_bl = false;
				self.scrMainHolder_do.setX(self.stageWidth - self.scrMainHolder_do.w);
				self.scrMainHolder_do.setHeight(self.stageHeight - self.removeFromThumbsHolderHeight);
				self.scrTrack_do.setHeight(self.scrMainHolder_do.h);
				self.scrTrackMiddle_do.setHeight(self.scrTrack_do.h - (self.scrTrackTop_do.h * 2));
				self.scrTrackBottom_do.setY(self.scrTrackMiddle_do.y + self.scrTrackMiddle_do.h);
				self.scrMainHolder_do.setAlpha(.5);
				self.scrHandler_do.setY(0);
				self.scrHandler_do.setButtonMode(false);
				self.scrHandlerLines_do.setButtonMode(false);
			}
			
			self.scrHandler_do.setHeight(Math.max(120, Math.round(Math.min(1,(self.scrMainHolder_do.h/self.totalThumbsHeight)) * self.scrMainHolder_do.h)));
			self.scrHandlerMiddle_do.setHeight(self.scrHandler_do.h - (self.scrHandlerTop_do.h * 2));
			self.scrHandlerBottom_do.setY(self.scrHandlerMiddle_do.y + self.scrHandlerMiddle_do.h);
			FWDUVPTweenMax.killTweensOf(self.scrHandlerLines_do);
			self.scrHandlerLines_do.setY(self.scrollBarHandlerFinalY + parseInt((self.scrHandler_do.h - self.scrHandlerLines_do.h)/2));
			self.scrHandlerBottom_do.setY(self.scrHandler_do.h - self.scrHandlerBottom_do.h);
		};
		
		this.updateScrollBarHandlerAndContent = function(animate, overwrite){
			if(self.disableForAWhileAfterThumbClick_bl) return;
			if(!self.allowToScrollAndScrollBarIsActive_bl && !overwrite) return;
			var percentScrolled = 0;
			var thumb;
			
			if(self.isDragging_bl && !self.isMobile_bl){
				percentScrolled = (self.scrollBarHandlerFinalY/(self.scrMainHolder_do.h - self.scrHandler_do.h));
				if(percentScrolled == "Infinity"){
					percentScrolled = 0;
				}else if(percentScrolled >= 1){
					scrollPercent = 1;
				}
				self.thumbnailsFinalY = Math.round(percentScrolled * (self.totalThumbsHeight - self.mainThumbsHolder_do.h)) * -1;
			}else{
				if(self.isSearched_bl){
					self.percentScrolled = 0;
				}else{
					percentScrolled = self.curId/(self.totalThumbs - 1);
				}
				
				self.thumbnailsFinalY = Math.min(0, Math.round(percentScrolled * (self.totalThumbsHeight - self.mainThumbsHolder_do.h)) * -1);
				
				if(self.scrMainHolder_do){
					self.scrollBarHandlerFinalY = Math.round((self.scrMainHolder_do.h - self.scrHandler_do.h) * percentScrolled);
					
					if(self.scrollBarHandlerFinalY < 0){
						self.scrollBarHandlerFinalY = 0;
					}else if(self.scrollBarHandlerFinalY > self.scrMainHolder_do.h - self.scrHandler_do.h - 1){
						self.scrollBarHandlerFinalY = self.scrMainHolder_do.h - self.scrHandler_do.h - 1;
					}
					
					FWDUVPTweenMax.killTweensOf(self.scrHandler_do);
					FWDUVPTweenMax.killTweensOf(self.scrHandlerLines_do);
					if(animate){
						FWDUVPTweenMax.to(self.scrHandler_do, .4, {y:self.scrollBarHandlerFinalY, ease:Quart.easeOut});
						FWDUVPTweenMax.to(self.scrHandlerLines_do, .8, {y:self.scrollBarHandlerFinalY + parseInt((self.scrHandler_do.h - self.scrHandlerLinesN_do.h)/2), ease:Quart.easeOut});
					}else{
						self.scrHandler_do.setY(self.scrollBarHandlerFinalY);
						self.scrHandlerLines_do.setY(self.scrollBarHandlerFinalY + parseInt((self.scrHandler_do.h - self.scrHandlerLinesN_do.h)/2));
					}
				}
			}
			
			if(self.lastThumbnailFinalY != self.thumbnailsFinalY){
				FWDUVPTweenMax.killTweensOf(self.thumbsHolder_do);
				if(animate){
					FWDUVPTweenMax.to(self.thumbsHolder_do, .5, {y:self.thumbnailsFinalY, ease:Quart.easeOut});
				}else{
					self.thumbsHolder_do.setY(self.thumbnailsFinalY);
				}
			}
			
			self.lastThumbnailFinalY = self.thumbnailsFinalY;
		};
		
		//###########################################//
		/* Add mousewheel support */
		this.addMouseWheelSupport = function(){
			if(self.screen.addEventListener){
				self.screen.addEventListener('DOMMouseScroll', self.mouseWheelHandler);
				self.screen.addEventListener ("mousewheel", self.mouseWheelHandler);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent('onmousewheel', self.mouseWheelHandler);
			}
		};
		
		self.mouseWheelHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.disableMouseWheel_bl || self.isDragging_bl) return false;
			
			var dir = e.detail || e.wheelDelta;	
			if(e.wheelDelta) dir *= -1;
			//if(FWDUVPUtils.isOpera) dir *= -1;
		
			if(dir > 0){
				self.scrollBarHandlerFinalY += Math.round((160 * self.scollbarSpeedSensitivity)  * (self.mainThumbsHolder_do.h/self.totalThumbsHeight));
			}else if(dir < 0){
				self.scrollBarHandlerFinalY -= Math.round((160 * self.scollbarSpeedSensitivity)  * (self.mainThumbsHolder_do.h/self.totalThumbsHeight));
			}
			
			if(self.scrollBarHandlerFinalY >= self.scrTrack_do.h - self.scrHandler_do.h){
				self.scrollBarHandlerFinalY = self.scrTrack_do.h -  self.scrHandler_do.h;
			}else if(self.scrollBarHandlerFinalY <= 0){
				self.scrollBarHandlerFinalY = 0;
			}
			
			var linesY = self.scrollBarHandlerFinalY + parseInt((self.scrHandler_do.h - self.scrHandlerLines_do.h)/2);
			FWDUVPTweenMax.killTweensOf(self.scrHandler_do);
			FWDUVPTweenMax.killTweensOf(self.scrHandlerLines_do);
			FWDUVPTweenMax.to(self.scrHandlerLines_do, .8, {y:linesY, ease:Quart.easeOut});
			FWDUVPTweenMax.to(self.scrHandler_do, .5, {y:self.scrollBarHandlerFinalY, ease:Quart.easeOut});
			self.isDragging_bl = true;
			self.updateScrollBarHandlerAndContent(true);
			self.isDragging_bl = false;
		
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.hideAndShow = function(animate){
			if(self.position_str == "bottom"){
				self.mainHolder_do.setY(-self.stageHeight);
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				self.mainHolder_do.setX(-self.stageWidth);
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {x:0, ease:Expo.easeInOut});
			}
		};
		
		this.hide = function(animate){
			self.isShowed_bl = false;
			if(animate){
				if(self.position_str == "bottom"){
					FWDUVPTweenMax.to(self.mainHolder_do, .8, {y: -self.stageHeight, ease:Expo.easeInOut});
				}
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				if(self.position_str == "bottom"){
					self.mainHolder_do.setY(-self.stageHeight);
				}
			}
		};
		
		this.show = function(animate){
			self.isShowed_bl = true;
			if(!FWDUVPTweenMax.isTweening(self.mainHolder_do)) self.hide(false);
			if(animate){
				if(self.position_str == "bottom"){
					FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
				}else{
					self.mainHolder_do.setY(0);
				}
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setX(0);
				self.mainHolder_do.setY(0);
				clearTimeout(self.disableThumbsId_to);
				self.disableThumbsId_to =  setTimeout(function(){self.disableThumbs_bl = false;}, 200);
				self.disableThumbs_bl = true;
			}
		};
	
		this.init();
	};
	
	/* set prototype */
    FWDUVPPlaylist.setPrototype = function(){
    	FWDUVPPlaylist.prototype = new FWDUVPDisplayObject("div", "absolute", "visible");
    };
    
    FWDUVPPlaylist.THUMB_MOUSE_UP = "thumbMouseOut";
    FWDUVPPlaylist.PLAY_PREV_VIDEO = "playPrevVideo";
	FWDUVPPlaylist.PLAY_NEXT_VIDEO = "playNextVideo";
	FWDUVPPlaylist.DISABLE_LOOP = "disableLoop";
	FWDUVPPlaylist.ENABLE_LOOP = "enableLoop";
	FWDUVPPlaylist.DISABLE_SHUFFLE = "disableShuffle";
	FWDUVPPlaylist.ENABLE_SHUFFLE = "enableShuffle";
    
    FWDUVPPlaylist.prototype = null;
	window.FWDUVPPlaylist = FWDUVPPlaylist;
}(window));/* FWDUVPPlaylistThumb */
(function (window){
	var FWDUVPPlaylistThumb = function(
			parent,
			pId, 
			backgroundImagePath,
			thumbnailNormalBackgroundColor,
			thumbnailHoverBackgroundColor,
			thumbnailDisabledBackgroundColor,
			thumbImageWidth,
			thumbImageHeight,
			padding,
			htmlContent,
			htmlText
		){
		
		var self = this;
		var prototype = FWDUVPPlaylistThumb.prototype;
		
		this.mainImageHolder_do = null;
		this.imageHolder_do = null;
		this.normalImage_do = null;
		this.dumy_do = null;
		this.text_do = null;
		
		this.backgroundImagePath_str = backgroundImagePath;
		this.thumbnailNormalBackgroundColor_str = thumbnailNormalBackgroundColor;
		this.thumbnailHoverBackgroundColor_str = thumbnailHoverBackgroundColor;
		this.thumbnailDisabledBackgroundColor_str = thumbnailDisabledBackgroundColor;
		this.htmlContent_str = htmlContent;
		this.htmlText_str = htmlText.toLowerCase();
		this.curState_str = "none";
	
		this.id = pId;
		this.padding = padding;
		this.imageOriginalW;
		this.imageOriginalH;
		this.finalX;
		this.finalY;
		this.thumbImageWidth = thumbImageWidth;
		this.thumbImageHeight = thumbImageHeight;
		this.finalW;
		this.finalH = self.padding * 2 + self.thumbImageHeight;
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

		this.init = function(){
			self.setupMainContainers();
			
			self.setButtonMode(true);
			self.setNormalState();
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.dumy_do.screen.addEventListener("MSPointerUp", self.onMouseUp);
					self.dumy_do.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.dumy_do.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.dumy_do.screen.addEventListener("click", self.onMouseUp);
				}
			}else if(self.dumy_do.screen.addEventListener){	
				self.dumy_do.screen.addEventListener("mouseover", self.onMouseOver);
				self.dumy_do.screen.addEventListener("mouseout", self.onMouseOut);
				self.dumy_do.screen.addEventListener("click", self.onMouseUp);
			}else if(self.dumy_do.screen.attachEvent){
				self.dumy_do.screen.attachEvent("onmouseover", self.onMouseOver);
				self.dumy_do.screen.attachEvent("onmouseout", self.onMouseOut);
				self.dumy_do.screen.attachEvent("onclick", self.onMouseUp);
			}
		};
		
		this.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDUVPPlaylistThumb.MOUSE_UP, {id:self.id});
		};
		
		this.onMouseOver = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl) return;
				self.setSelectedState(true);
			}
		};
			
		this.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl) return;
				self.setNormalState(true);
			}
		};
		
		//#################################//
		/* set image */
		//#################################//
		this.setupMainContainers = function(){			
			self.mainImageHolder_do = new FWDUVPDisplayObject("div");
			self.mainImageHolder_do.getStyle().background = "url('" + self.backgroundImagePath_str + "')";
			self.mainImageHolder_do.setX(self.padding);
			self.mainImageHolder_do.setY(self.padding);
			self.mainImageHolder_do.setWidth(self.thumbImageWidth);
			self.mainImageHolder_do.setHeight(self.thumbImageHeight);
			self.imageHolder_do = new FWDUVPDisplayObject("div");
			
			self.text_do = new FWDUVPDisplayObject("div");
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.setHeight(self.finalH - 6);
			self.text_do.setBackfaceVisibility();
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.fontColor_str;
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";
			self.text_do.setX((self.padding * 2) + self.thumbImageWidth + 4);

			self.text_do.setInnerHTML(self.htmlContent_str);	
			self.addChild(self.text_do);
			
			self.dumy_do = new FWDUVPDisplayObject("div");
			self.dumy_do.getStyle().width = "100%";
			self.dumy_do.getStyle().height = "100%";
			if(FWDUVPUtils.isIE){
				self.dumy_do.setBkColor("#FF0000");
				self.dumy_do.setAlpha(0.01);
			}
		
			self.addChild(self.mainImageHolder_do); 	
			self.mainImageHolder_do.addChild(self.imageHolder_do);
			self.addChild(self.dumy_do);
		};
	
		//#################################//
		/* set image */
		//#################################//
		this.setImage = function(image){
			self.normalImage_do = new FWDUVPDisplayObject("img");
			self.normalImage_do.setScreen(image);
			
			self.imageOriginalW = self.normalImage_do.w;
			self.imageOriginalH = self.normalImage_do.h;
		
			self.resizeImage();
			
			self.imageHolder_do.setX(parseInt(self.thumbImageWidth/2));
			self.imageHolder_do.setY(parseInt(self.thumbImageHeight/2));
			self.imageHolder_do.setWidth(0);
			self.imageHolder_do.setHeight(0);
			
			self.normalImage_do.setX(- parseInt(self.normalImage_do.w/2));
			self.normalImage_do.setY(- parseInt(self.normalImage_do.h/2));
		
			FWDUVPTweenMax.to(self.imageHolder_do, .8, {
				x:0, 
				y:0,
				w:self.thumbImageWidth,
				h:self.thumbImageHeight, 
				ease:Expo.easeInOut});
			self.normalImage_do.setAlpha(0);
			
			if(self.isMobile_bl){
				var curAlpha;
				if(self.id == parent.curId){
					curAlpha = .3;
				}else{
					curAlpha = 1;
				}
			
				FWDUVPTweenMax.to(self.normalImage_do, .8, {
					alpha:curAlpha,
					x:self.imageFinalX, 
					y:self.imageFinalY, 
					ease:Expo.easeInOut});
				
			}else{
				FWDUVPTweenMax.to(self.normalImage_do, .8, {
					alpha:1,
					x:self.imageFinalX, 
					y:self.imageFinalY, 
					ease:Expo.easeInOut});
			}
			
			self.imageHolder_do.addChild(self.normalImage_do);
			this.hasImage_bl = true;
		};
		
		//#################################//
		/* resize thumbnail*/
		//#################################//
		this.resizeAndPosition = function(animate){
			self.text_do.setWidth(self.finalW - ((self.padding * 2) + self.thumbImageWidth) - 16);
			self.setWidth(self.finalW);
			self.setHeight(self.finalH);
			
			if(animate){
				FWDUVPTweenMax.to(self, .6, {x:self.finalX, y:self.finalY, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self);
				self.setX(self.finalX);
				self.setY(self.finalY);
			}
			
			self.resizeImage();
		};
	
		//#################################//
		/* resize image*/
		//#################################//
		this.resizeImage = function(animate){
			if(!self.normalImage_do) return;
			
			if(self.isMobile_bl){	
				if(self.normalImage_do.alpha != 1 && !self.isDisabled_bl) self.normalImage_do.setAlpha(1);
			}else{
				if(self.imageHolder_do.alpha != 1 && !self.isDisabled_bl) self.imageHolder_do.setAlpha(1);
			}
			
			
			//FWDUVPTweenMax.killTweensOf(self.normalImage_do);
			var scX = self.thumbImageWidth/self.imageOriginalW;
			var scY = self.thumbImageHeight/self.imageOriginalH;
			var ttsc;
			
			if(scX <= scY){
				ttsc = scX;
			}else{
				ttsc = scY;
			}
			
			self.imageFinalW = Math.ceil(ttsc * self.imageOriginalW);
			self.imageFinalH = Math.ceil(ttsc * self.imageOriginalH);
			self.imageFinalX = Math.round((self.thumbImageWidth - self.imageFinalW)/2);
			self.imageFinalY = Math.round((self.thumbImageHeight - self.imageFinalH)/2);
		
			self.normalImage_do.setX(self.imageFinalX);
			self.normalImage_do.setY(self.imageFinalY);
			self.normalImage_do.setWidth(self.imageFinalW);
			self.normalImage_do.setHeight(self.imageFinalH);
		};
		
		//#######################################//
		/* Set selected/normal/disable states */
		//######################################//
		this.setNormalState = function(animate){
			if(self.curState_str == "normal") return;
			self.curState_str = "normal";
			if(animate){
				FWDUVPTweenMax.to(self.screen, .8, {css:{backgroundColor:self.thumbnailNormalBackgroundColor_str},ease:Expo.easeOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.screen);
				self.getStyle().backgroundColor = self.thumbnailNormalBackgroundColor_str;
			}
		};
		
		this.setSelectedState = function(animate){
			if(self.curState_str == "selected") return;
			self.curState_str = "selected";
			if(animate){
				FWDUVPTweenMax.to(self.screen, .8, {css:{backgroundColor:self.thumbnailHoverBackgroundColor_str},ease:Expo.easeOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.screen);
				self.getStyle().backgroundColor = self.thumbnailNormalBackgroundColor_str;
			}
		};
		
		this.setDisabledState = function(animate){
			if(self.curState_str == "disabled") return;
			self.curState_str = "disabled";
			if(animate){
				FWDUVPTweenMax.to(self.screen, .8, {css:{backgroundColor:self.thumbnailDisabledBackgroundColor_str},ease:Expo.easeOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.screen);
				self.getStyle().backgroundColor = self.thumbnailNormalBackgroundColor_str;
			}
		};
		
		//###############################//
		/* enable / disable */
		//##############################//
		this.enable = function(){
			if(!self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			self.setNormalState(true);
			
			if(self.isMobile_bl){
				if(self.normalImage_do) self.normalImage_do.setAlpha(1);
			}else{
				FWDUVPTweenMax.to(self.imageHolder_do, .6, {alpha:1});
			}
		};
		
		this.disable = function(){
			if(self.isDisabled_bl) return;
			self.disableForAWhile_bl = true;
			clearTimeout(self.disableForAWhileId_to);
			self.disableForAWhileId_to = setTimeout(function(){
				self.disableForAWhile_bl = false;
			}, 200);
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			self.setDisabledState(true);
			
			if(self.isMobile_bl){
				if(self.normalImage_do) self.normalImage_do.setAlpha(.3);
			}else{
				FWDUVPTweenMax.to(self.imageHolder_do, .6, {alpha:.3});
			}
			
		};
		
		//################################//
		/* Destroy */
		//################################//
		this.destroy = function(){
			FWDUVPTweenMax.killTweensOf(self);
			if(self.normalImage_do){
				FWDUVPTweenMax.killTweensOf(self.normalImage_do);
				self.normalImage_do.destroy();
			}
			
			FWDUVPTweenMax.killTweensOf(self.imageHolder_do);
			self.imageHolder_do.destroy();
			self.dumy_do.destroy();
			self.text_do.destroy();
			self.backgroundImagePath_str = backgroundImagePath;
			self.imageHolder_do = null;
			self.normalImage_do = null;
			self.dumy_do = null;
			self.text_do = null;
			self.htmlContent_str = null;
			self.htmlText_str = null;
			self.curState_str = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPPlaylistThumb.setPrototype = function(){
		FWDUVPPlaylistThumb.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPPlaylistThumb.SHOW_TOOL_TIP = "showToolTip";
	FWDUVPPlaylistThumb.HIDE_TOOL_TIP = "hideToolTip";
	FWDUVPPlaylistThumb.MOUSE_UP = "onMouseUp";
	
	FWDUVPPlaylistThumb.prototype = null;
	window.FWDUVPPlaylistThumb = FWDUVPPlaylistThumb;
}(window));/* FWDUVPPlaylistToolTip */
(function (window){
var FWDUVPPlaylistToolTip = function(
			bkPath_str,
			pointerPath_str,
			fontColor_str,
			position_str,
			playlistToolTipMaxWidth
		){
		
		var self = this;
		var prototype = FWDUVPPlaylistToolTip.prototype;
		
		this.buttonRef_do = null;
		
		this.bkPath_str = bkPath_str;
		this.pointerPath_str = pointerPath_str;
		
		this.text_do = null;
		this.pointer_do = null;
	
		this.fontColor_str = fontColor_str;
		this.position_str = position_str;
	
		this.id = -1;
		if(this.position_str == "bottom"){
			this.pointerWidth = 7;
			this.pointerHeight = 4;
		}else{
			this.pointerWidth = 4;
			this.pointerHeight = 7;
		}
		this.maxWidth = playlistToolTipMaxWidth;
		
		this.showWithDelayId_to;
		
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.isShowed_bl = true;
	
		//##########################################//
		/* initialize */
		//##########################################//
		this.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
			self.hide();
			self.getStyle().background = "url('" + self.bkPath_str + "')";
			self.getStyle().zIndex = 9999999999999;
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			self.text_do = new FWDUVPDisplayObject("div");
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.setBackfaceVisibility();
			self.text_do.setDisplay("inline-block");
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.fontColor_str;
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";
			self.text_do.getStyle().lineHeight = "16px";
			self.text_do.getStyle().padding = "6px";
			self.text_do.getStyle().paddingTop = "4px";
			self.text_do.getStyle().paddingBottom = "4px";
			self.text_do.getStyle().textAlign = "center";
			self.addChild(self.text_do);
			
			var pointer_img = new Image();
			pointer_img.src = self.pointerPath_str;
			self.pointer_do = new FWDUVPDisplayObject("img");
			self.pointer_do.setScreen(pointer_img);
			self.pointer_do.setWidth(self.pointerWidth);
			self.pointer_do.setHeight(self.pointerHeight);
			self.addChild(self.pointer_do);
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		this.setLabel = function(label, id){
		
			if(self.id != id){
				self.setVisible(false);
				self.text_do.getStyle().whiteSpace = "normal";
				self.setWidth(self.maxWidth);
				self.text_do.setInnerHTML(label);
			}
		
			setTimeout(function(){
				if(self == null) return;
					//if(self.id != id){
						var textW = self.text_do.screen.getBoundingClientRect().width;
						
						if(textW < 8 && textW != undefined){
							self.setHeight(Math.round(self.text_do.screen.getBoundingClientRect().height * 100));
							textW = Math.round(textW * 100);
						}else{
							self.setHeight(self.text_do.screen.offsetHeight);
							textW = Math.round(self.text_do.screen.offsetWidth);
						}
						
						if(textW < self.w - 15) self.setWidth(textW);
					
						if(textW < self.maxWidth){
							self.text_do.getStyle().whiteSpace = "nowrap";
						}
						//}
					self.positionPointer();
					self.id = id;
					
				},60);
		
		};
		
		this.positionPointer = function(offsetX){
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			if(self.position_str == "bottom"){
				finalX = parseInt((self.w - self.pointerWidth)/2) + offsetX;
				finalY = self.h;
			}else{
				finalX = self.w;
				finalY = parseInt((self.h - self.pointerHeight)/2);
			}
			
			self.pointer_do.setX(finalX);
			self.pointer_do.setY(finalY);
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDUVPTweenMax.killTweensOf(self);
			clearTimeout(self.showWithDelayId_to);
			self.showWithDelayId_to = setTimeout(self.showFinal, 100);
		};
		
		this.showFinal = function(){
			self.setVisible(true);
			self.setAlpha(0);
			FWDUVPTweenMax.to(self, .4, {alpha:1, onComplete:function(){self.setVisible(true);}, ease:Quart.easeOut});
		};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			clearTimeout(self.showWithDelayId_to);
			FWDUVPTweenMax.killTweensOf(self);
			self.setVisible(false);
			self.isShowed_bl = false;
		};
		
		this.init();
	};
	
	/* set prototype */
	FWDUVPPlaylistToolTip.setPrototype = function(){
		FWDUVPPlaylistToolTip.prototype = null;
		FWDUVPPlaylistToolTip.prototype = new FWDUVPDisplayObject("div", "fixed");
	};
	
	FWDUVPPlaylistToolTip.CLICK = "onClick";
	FWDUVPPlaylistToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDUVPPlaylistToolTip.prototype = null;
	window.FWDUVPPlaylistToolTip = FWDUVPPlaylistToolTip;
}(window));/* Thumb */
(function (window){
	
	var FWDUVPPoster = function(
			parent,
			showPoster
		){
		
		var self  = this;
		var prototype = FWDUVPPoster.prototype;
		
		
		this.img_img = new Image();
		this.img_do = null;
		this.imgW = 0;
		this.imgH = 0;
		this.finalW = 0;
		this.finalH = 0;
		this.finalX = 0;
		this.finalY = 0;
		
		this.curPath_str;
		
		this.isTransparent_bl = false;
		this.showPoster_bl = showPoster;
		this.showOrLoadOnMobile_bl = false;
		this.isShowed_bl = true;
		this.allowToShow_bl = true;
		this.isMobile_bl = FWDUVPUtils.isMobile;
	
		this.init = function(){
			self.img_img = new Image();
			self.img_do = new FWDUVPDisplayObject("img");
			self.hide();
			self.screen.className = "RVPPosterBackgroundColor";
		};
		
		this.positionAndResize = function(){
			if(!parent.vidStageWidth) return;
			self.setWidth(parent.tempVidStageWidth);
			self.setHeight(parent.tempVidStageHeight);
		
			if(!self.imgW) return;
			var scX = parent.tempVidStageWidth/self.imgW;
			var scY = parent.tempVidStageHeight/self.imgH;
			var ttSc;
			
			if(scX <= scY){
				ttSc = scX;
			}else{
				ttSc = scY;
			}
			
			self.finalW = Math.round(ttSc * self.imgW);
			self.finalH = Math.round(ttSc * self.imgH);
			self.finalX = parseInt((parent.tempVidStageWidth - self.finalW)/2);
			self.finalY = parseInt((parent.tempVidStageHeight - self.finalH)/2);
		
			self.img_do.setX(self.finalX);
			self.img_do.setY(self.finalY);
			self.img_do.setWidth(self.finalW);
			self.img_do.setHeight(self.finalH);		
		};
		
		this.setPoster = function(path){
			
			if(path && (FWDUVPUtils.trim(path) == "") || path =="none"){
				self.showOrLoadOnMobile_bl = true;
				self.isTransparent_bl = true;
				self.show();
				return;
			}else if(path == "youtubemobile"){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = false;
				self.img_img.src = null;
				self.imgW = 0;
				return;
			}else if(path == self.curPath_str){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = true;
			}
			
			self.isTransparent_bl = false;
			self.showOrLoadOnMobile_bl = true;
			self.curPath_str = path;
			if(self.allowToShow_bl) self.isShowed_bl = false;
			if(!path) return;
			if(self.img_do) self.img_do.src = "";
			self.img_img.onload = self.posterLoadHandler;
			self.img_img.src = self.curPath_str;
		};
		
		this.posterLoadHandler = function(e){
			self.imgW = self.img_img.width;
			self.imgH = self.img_img.height;
			self.img_do.setScreen(self.img_img);
			self.addChild(self.img_do);
			self.show();
			self.positionAndResize();
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.show = function(allowToShow_bl){
			if(!self.allowToShow_bl || self.isShowed_bl || !self.showOrLoadOnMobile_bl) return;
			
			self.isShowed_bl = true;
			
			if(self.isTransparent_bl){
				if(self.alpha != 0) self.setAlpha(0);
			}else {
				if(self.alpha != 1) self.setAlpha(1);
			}
			
			self.setVisible(true);
			
			if(!self.isMobile_bl && !self.isTransparent_bl){
				FWDUVPTweenMax.killTweensOf(self);
				self.setAlpha(0);
				FWDUVPTweenMax.to(self, .6, {alpha:1, delay:.4});	
			}
			
			self.positionAndResize();
		};
		
		this.hide = function(overwrite){
			if(!self.isShowed_bl && !overwrite) return;
			FWDUVPTweenMax.killTweensOf(self);
			self.isShowed_bl = false;
			self.setVisible(false);
		};
		
		
		this.init();
	};
	
	/* set prototype */
    FWDUVPPoster.setPrototype = function(){
    	FWDUVPPoster.prototype = new FWDUVPDisplayObject("div");
    };
    
    FWDUVPPoster.prototype = null;
	window.FWDUVPPoster = FWDUVPPoster;
}(window));/* Thumb */
(function (window){
	
	var FWDUVPPreloader = function(imageSource_img, segmentWidth, segmentHeight, totalSegments, animDelay){
		
		var self  = this;
		var prototype = FWDUVPPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_sdo = null;
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.animDelay = animDelay || 300;
		this.count = 0;
		
		this.delayTimerId_int;
		this.isShowed_bl = false;
		
		//###################################//
		/* init */
		//###################################//
		this.init = function(){
			self.setWidth(self.segmentWidth);
			self.setHeight(self.segmentHeight);
		
			self.image_sdo = new FWDUVPDisplayObject("img");
			self.image_sdo.setScreen(self.imageSource_img);
			self.addChild(self.image_sdo);
			
			self.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		this.start = function(){
			if(self == null) return;
			clearInterval(self.delayTimerId_int);
			self.delayTimerId_int = setInterval(self.updatePreloader, self.animDelay);
		};
		
		this.stop = function(){
			clearInterval(self.delayTimerId_int);
		};
		
		this.updatePreloader = function(){
			if(self == null) return;
			self.count++;
			if(self.count > self.totalSegments - 1) self.count = 0;
			var posX = self.count * self.segmentWidth;
			self.image_sdo.setX(-posX);
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.setVisible(true);
			self.start();
			FWDUVPTweenMax.killTweensOf(self);
			FWDUVPTweenMax.to(self, 1, {alpha:1, delay:.2});
			self.isShowed_bl = true;
		};
		
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			FWDUVPTweenMax.killTweensOf(this);
			if(animate){
				FWDUVPTweenMax.to(this, 1, {alpha:0, onComplete:self.onHideComplete});
			}else{
				self.setVisible(false);
				self.setAlpha(0);
			}
			self.isShowed_bl = false;
		};
		
		this.onHideComplete = function(){
			self.setVisible(false);
			self.stop();
			self.dispatchEvent(FWDUVPPreloader.HIDE_COMPLETE);
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDUVPPreloader.setPrototype = function(){
    	FWDUVPPreloader.prototype = new FWDUVPDisplayObject("div");
    };
    
    FWDUVPPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDUVPPreloader.prototype = null;
	window.FWDUVPPreloader = FWDUVPPreloader;
}(window));﻿/* FWDUVPSimpleButton */
(function (window){
var FWDUVPSimpleButton = function(nImg, sPath, dPath, alwaysShowSelectedPath){
		
		var self = this;
		var prototype = FWDUVPSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
	
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
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl || alwaysShowSelectedPath;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.n_sdo = new FWDUVPTransformDisplayObject("img");	
			self.n_sdo.setScreen(self.nImg);
			self.addChild(self.n_sdo);
			
			if(self.allowToCreateSecondButton_bl){
				var img1 = new Image();
				img1.src = self.sPath_str;
				self.s_sdo = new FWDUVPDisplayObject("img");
				self.s_sdo.setScreen(img1);
				self.s_sdo.setWidth(self.totalWidth);
				self.s_sdo.setHeight(self.totalHeight);
				self.s_sdo.setAlpha(0);
				self.addChild(self.s_sdo);
				
				if(self.dPath_str){
					var img2 = new Image();
					img2.src = self.dPath_str;
					self.d_sdo = new FWDUVPDisplayObject("img");
					self.d_sdo.setScreen(img2);
					self.d_sdo.setWidth(self.totalWidth);
					self.d_sdo.setHeight(self.totalHeight);
					self.d_sdo.setX(-100);
					self.addChild(self.d_sdo);
				};
			}
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonMode(true);
			self.screen.style.yellowOverlayPointerEvents = "none";
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerUp", self.onMouseUp);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDUVPSimpleButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPSimpleButton.MOUSE_OVER, {e:e});
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPSimpleButton.MOUSE_OUT, {e:e});
				self.setNormalState();
			}
		};
		
		self.onMouseUp = function(e){
			if(self.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
			self.dispatchEvent(FWDUVPSimpleButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelected = function(){
			self.isSelectedFinal_bl = true;
			if(!self.s_sdo) return;
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			FWDUVPTweenMax.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		self.setUnselected = function(){
			self.isSelectedFinal_bl = false;
			if(!self.s_sdo) return;
			FWDUVPTweenMax.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			FWDUVPTweenMax.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			FWDUVPTweenMax.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.d_sdo) self.d_sdo.setX(0);
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.d_sdo) self.d_sdo.setX(-100);
		};
		
		this.disable = function(){
			if(self.isDisabledForGood_bl  || self.isDisabled_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDUVPTweenMax.to(self, .6, {alpha:.4});
			self.setNormalState();
		};
		
		this.enable = function(){
			if(self.isDisabledForGood_bl || !self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDUVPTweenMax.to(self, .6, {alpha:1});
		};
		
		this.disableForGood = function(){
			self.isDisabledForGood_bl = true;
			self.setButtonMode(false);
		};
		
		this.showDisabledState = function(){
			if(self.d_sdo.x != 0) self.d_sdo.setX(0);
		};
		
		this.hideDisabledState = function(){
			if(self.d_sdo.x != -100) self.d_sdo.setX(-100);
		};
		
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDUVPTweenMax.killTweensOf(self);
			if(!FWDUVPUtils.isIEAndLessThen9 ){
				if(FWDUVPUtils.isIEWebKit){
					FWDUVPTweenMax.killTweensOf(self.n_sdo);
					self.n_sdo.setScale2(0);
					FWDUVPTweenMax.to(self.n_sdo, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}else{
					self.setScale2(0);
					FWDUVPTweenMax.to(self, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}
			}else if(FWDUVPUtils.isIEAndLessThen9){
				self.setVisible(true);
			}else{
				self.setAlpha(0);
				FWDUVPTweenMax.to(self, .4, {alpha:1, delay:.4});
				self.setVisible(true);
			}
		};	
			
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			FWDUVPTweenMax.killTweensOf(self);
			FWDUVPTweenMax.killTweensOf(self.n_sdo);
			self.setVisible(false);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPSimpleButton.setPrototype = function(){
		FWDUVPSimpleButton.prototype = null;
		FWDUVPSimpleButton.prototype = new FWDUVPTransformDisplayObject("div");
	};
	
	FWDUVPSimpleButton.CLICK = "onClick";
	FWDUVPSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDUVPSimpleButton.SHOW_TOOLTIP = "showTooltip";
	FWDUVPSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDUVPSimpleButton.MOUSE_UP = "onMouseDown";
	
	FWDUVPSimpleButton.prototype = null;
	window.FWDUVPSimpleButton = FWDUVPSimpleButton;
}(window));﻿/* FWDUVPSimpleSizeButton */
(function (window){
var FWDUVPSimpleSizeButton = function(
		nImgPath, 
		sImgPath,
		buttonWidth,
		buttonHeight){
		
		var self = this;
		var prototype = FWDUVPSimpleSizeButton.prototype;
		
		this.nImg_img = null;
		this.sImg_img = null;
	
		this.n_do;
		this.s_do;
		
		this.nImgPath_str = nImgPath;
		this.sImgPath_str = sImgPath;
		
		this.buttonWidth = buttonWidth;
		this.buttonHeight = buttonHeight;
		
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
		this.isDisabled_bl = false;
		
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function(){
			self.setupMainContainers();
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setButtonMode(true);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			
			self.n_do = new FWDUVPDisplayObject("img");	
			self.nImg_img = new Image();
			self.nImg_img.src = self.nImgPath_str;
			self.nImg_img.width = self.buttonWidth;
			self.nImg_img.height = self.buttonHeight;
			self.n_do.setScreen(self.nImg_img);
			
			self.s_do = new FWDUVPDisplayObject("img");	
			self.sImg_img = new Image();
			self.sImg_img.src = self.sImgPath_str;
			self.sImg_img.width = self.buttonWidth;
			self.sImg_img.height = self.buttonHeight;
			self.s_do.setScreen(self.sImg_img);
			self.s_do.setAlpha(0);
			
			self.addChild(self.n_do);
			self.addChild(self.s_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerUp", self.onMouseUp);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
			
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPSimpleSizeButton.MOUSE_OVER, {e:e});
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPSimpleSizeButton.MOUSE_OUT, {e:e});
				self.setNormalState();
			}
		};
		
		self.onMouseUp = function(e){
		
			if(self.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
			self.dispatchEvent(FWDUVPSimpleSizeButton.MOUSE_UP, {e:e});
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_do);
			FWDUVPTweenMax.to(self.s_do, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			FWDUVPTweenMax.killTweensOf(self.s_do);
			FWDUVPTweenMax.to(self.s_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		
		//###################################################//
		/* Destory */
		//###################################################//
		this.destroy = function(){
			FWDUVPTweenMax.killTweensOf(self.n_do);
			
			self.n_do.destroy();
			this.s_do.destroy();
		
			self.screen.onmouseover = null;
			self.screen.onmouseout = null;
			self.screen.onclick = null;
			self.nImg_img = null;
			self.sImg_img = null;
			
			self = null;
			prototype = null;
			FWDUVPSimpleSizeButton.prototype = null;
		};
		
	
		self.init();
	};
	
	/* set prototype */
	FWDUVPSimpleSizeButton.setPrototype = function(){
		FWDUVPSimpleSizeButton.prototype = null;
		FWDUVPSimpleSizeButton.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPSimpleSizeButton.CLICK = "onClick";
	FWDUVPSimpleSizeButton.MOUSE_OVER = "onMouseOver";
	FWDUVPSimpleSizeButton.SHOW_TOOLTIP = "showTooltip";
	FWDUVPSimpleSizeButton.MOUSE_OUT = "onMouseOut";
	FWDUVPSimpleSizeButton.MOUSE_UP = "onMouseDown";
	
	FWDUVPSimpleSizeButton.prototype = null;
	window.FWDUVPSimpleSizeButton = FWDUVPSimpleSizeButton;
}(window));/* FWDUVPToolTip */
(function (window){
var FWDUVPToolTip = function(
			buttonRef_do,
			bkPath_str,
			pointerPath_str,
			toolTipLabel_str,
			fontColor_str,
			toolTipsButtonsHideDelay
		){
		
		var self = this;
		var prototype = FWDUVPToolTip.prototype;
		
		this.buttonRef_do = buttonRef_do;
		
		this.bkPath_str = bkPath_str;
		this.pointerPath_str = pointerPath_str;
		
		this.text_do = null;
		this.pointer_do = null;
	
		this.fontColor_str = fontColor_str;
		this.toolTipLabel_str = toolTipLabel_str;
		
		this.toolTipsButtonsHideDelay = toolTipsButtonsHideDelay * 1000;
		this.pointerWidth = 7;
		this.pointerHeight = 4;
		
		this.showWithDelayId_to;
		
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.isShowed_bl = true;
	
		//##########################################//
		/* initialize */
		//##########################################//
		this.init = function(){
			self.setOverflow("visible");
			self.setupMainContainers();
			self.setLabel(self.toolTipLabel_str);
			self.hide();
			self.getStyle().background = "url('" + self.bkPath_str + "')";
			self.getStyle().zIndex = 9999999999999;
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			self.text_do = new FWDUVPDisplayObject("div");
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.setBackfaceVisibility();
			self.text_do.setDisplay("inline");
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.fontColor_str;
			self.text_do.getStyle().whiteSpace= "nowrap";
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";
			self.text_do.getStyle().padding = "6px";
			self.text_do.getStyle().paddingTop = "4px";
			self.text_do.getStyle().paddingBottom = "4px";
			self.setLabel();
			self.addChild(self.text_do);
			
			var pointer_img = new Image();
			pointer_img.src = self.pointerPath_str;
			self.pointer_do = new FWDUVPDisplayObject("img");
			self.pointer_do.setScreen(pointer_img);
			self.pointer_do.setWidth(self.pointerWidth);
			self.pointer_do.setHeight(self.pointerHeight);
			self.addChild(self.pointer_do);
		};
		
		//##########################################//
		/* set label */
		//##########################################//
		this.setLabel = function(label){
			self.text_do.setInnerHTML(toolTipLabel_str);
			setTimeout(function(){
				if(self == null) return;
					self.setWidth(self.text_do.getWidth());
					self.setHeight(self.text_do.getHeight());
					self.positionPointer();
				},50);
		};
		
		this.positionPointer = function(offsetX){
			var finalX;
			var finalY;
			
			if(!offsetX) offsetX = 0;
			
			finalX = parseInt((self.w - self.pointerWidth)/2) + offsetX;
			finalY = self.h;
			self.pointer_do.setX(finalX);
			self.pointer_do.setY(finalY);
		};
		
		//##########################################//
		/* show / hide*/
		//##########################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDUVPTweenMax.killTweensOf(self);
			clearTimeout(self.showWithDelayId_to);
			self.showWithDelayId_to = setTimeout(self.showFinal, self.toolTipsButtonsHideDelay);
			if(window.addEventListener){
				window.addEventListener("mousemove", self.moveHandler);
			}else if(document.attachEvent){
				document.detachEvent("onmousemove", self.moveHandler);
				document.attachEvent("onmousemove", self.moveHandler);
			}
		};
		
		this.showFinal = function(){
			self.setVisible(true);
			self.setAlpha(0);
			FWDUVPTweenMax.to(self, .4, {alpha:1, onComplete:function(){self.setVisible(true);}, ease:Quart.easeOut});
		};
		
		this.moveHandler = function(e){
			var wc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(!FWDUVPUtils.hitTest(self.buttonRef_do.screen, wc.screenX, wc.screenY)) self.hide();
		};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			clearTimeout(self.showWithDelayId_to);
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.moveHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.moveHandler);
			}
			FWDUVPTweenMax.killTweensOf(self);
			self.setVisible(false);
			self.isShowed_bl = false;
		};
		
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPToolTip.setPrototype = function(){
		FWDUVPToolTip.prototype = null;
		FWDUVPToolTip.prototype = new FWDUVPDisplayObject("div", "fixed");
	};
	
	FWDUVPToolTip.CLICK = "onClick";
	FWDUVPToolTip.MOUSE_DOWN = "onMouseDown";
	
	FWDUVPToolTip.prototype = null;
	window.FWDUVPToolTip = FWDUVPToolTip;
}(window));﻿/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDUVPTransformDisplayObject = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
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
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			//this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
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
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setRotation = function(val){
			self.rotation = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
				self.screen.style.width = self.w + "px";
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
				self.screen.style.height = self.h + "px";
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDUVPUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDUVPUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = null;
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
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
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDUVPTransformDisplayObject = FWDUVPTransformDisplayObject;
}(window));/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, FWDUVPTweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

(window._gsQueue || (window._gsQueue = [])).push( function() {

	"use strict";

	window._gsDefine("FWDUVPTweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
		
		var _slice = [].slice,
			FWDUVPTweenMax = function(target, duration, vars) {
				TweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
			},
			_isSelector = function(v) {
				return (v.jquery || (v.length && v[0] && v[0].nodeType && v[0].style));
			},
			p = FWDUVPTweenMax.prototype = TweenLite.to({}, 0.1, {}),
			_blankArray = [];

		FWDUVPTweenMax.version = "1.9.7";
		p.constructor = FWDUVPTweenMax;
		p.kill()._gc = false;
		FWDUVPTweenMax.killTweensOf = FWDUVPTweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
		FWDUVPTweenMax.getTweensOf = TweenLite.getTweensOf;
		FWDUVPTweenMax.ticker = TweenLite.ticker;
	
		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio, p;
			if (resetDuration && this.timeline && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted) {
				if (resetDuration) {
					this._initted = false;
				} else {
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._time;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else if (this._time > 0) {
						this._initted = false;
						this._init();
						var inv = 1 / (1 - curRatio),
							pt = this._firstPT, endValue;
						while (pt) {
							endValue = pt.s + pt.c; 
							pt.c *= inv;
							pt.s = endValue - pt.c;
							pt = pt._next;
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(), 
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle, 
				isComplete, callback, pt, cycleDuration, r, type, pow;
			if (time >= totalDur) {
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = this._duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				
				if (this._repeat !== 0) {
					cycleDuration = this._duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = this._duration - this._time;
					}
					if (this._time > this._duration) {
						this._time = this._duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}
				
				if (this._easeType) {
					r = this._time / this._duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}
					
					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}
					
				} else {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				}
				
			}
				
			if (prevTime === this._time && !force) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			
			if (!this._active) if (!this._paused) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}
			
			pt = this._firstPT;
			
			while (pt) 
			{
				if (pt.f) 
				{
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} 
				else 
				{
					var newVal = pt.c * this.ratio + pt.s;
				
					if (pt.p == "x")
					{
						pt.t.setX(newVal);
					}
					else if (pt.p == "y")
					{
						pt.t.setY(newVal);
					}
					else if (pt.p == "z")
					{
						pt.t.setZ(newVal);
					}
					else if (pt.p == "w")
					{
						pt.t.setWidth(newVal);
					}
					else if (pt.p == "h")
					{
						pt.t.setHeight(newVal);
					}
					else if (pt.p == "alpha")
					{
						pt.t.setAlpha(newVal);
					}
					else if (pt.p == "scale")
					{
						pt.t.setScale2(newVal);
					}
					else
					{
						pt.t[pt.p] = newVal;
					}
				}
				
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
			}
			if (callback) if (!this._gc) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		FWDUVPTweenMax.to = function(target, duration, vars) {
			return new FWDUVPTweenMax(target, duration, vars);
		};
		
		FWDUVPTweenMax.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDUVPTweenMax(target, duration, vars);
		};
		
		FWDUVPTweenMax.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDUVPTweenMax(target, duration, toVars);
		};
		
		FWDUVPTweenMax.staggerTo = FWDUVPTweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = vars.delay || 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, vars.onCompleteParams || _blankArray);
					}
					onCompleteAll.apply(onCompleteAllScope || this, onCompleteAllParams || _blankArray);
				},
				l, copy, i, p;
			if (!(targets instanceof Array)) {
				if (typeof(targets) === "string") {
					targets = TweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice.call(targets, 0);
				}
			}
			l = targets.length;
			for (i = 0; i < l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				copy.delay = delay;
				if (i === l - 1 && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new FWDUVPTweenMax(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		FWDUVPTweenMax.staggerFrom = FWDUVPTweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return FWDUVPTweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		FWDUVPTweenMax.staggerFromTo = FWDUVPTweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return FWDUVPTweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		FWDUVPTweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDUVPTweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		FWDUVPTweenMax.set = function(target, vars) {
			return new FWDUVPTweenMax(target, 0, vars);
		};
		
		FWDUVPTweenMax.isTweening = function(target) {
			var a = TweenLite.getTweensOf(target),
				i = a.length,
				tween;
			while (--i > -1) {
				tween = a[i];
				if (tween._active || (tween._startTime === tween._timeline._time && tween._timeline._active)) {
					return true;
				}
			}
			return false;
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof TweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = FWDUVPTweenMax.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		FWDUVPTweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		FWDUVPTweenMax.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLite._tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = TweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent, 0);
			}
			if (parent instanceof Array) {
				i = parent.length;
				while (--i > -1) {
					FWDUVPTweenMax.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			if (tweens === undefined) {
				tweens = true;
			}
			if (delayedCalls === undefined) {
				delayedCalls = true;
			}
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		FWDUVPTweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		FWDUVPTweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};
		
		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated FWDUVPTweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return FWDUVPTweenMax;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					i = _paramProps.length,
					j, a;
				while (--i > -1) {
					a = v[_paramProps[i]];
					if (a) {
						j = a.length;
						while (--j > -1) {
							if (a[j] === "{self}") {
								a = v[_paramProps[i]] = a.concat(); //copy the array in case the user referenced the same array in multiple timelines/tweens (each {self} should be unique)
								a[j] = this;
							}
						}
					}
				}
				if (v.tweens instanceof Array) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_paramProps = ["onStartParams","onUpdateParams","onCompleteParams","onReverseCompleteParams","onRepeatParams"],
			_blankArray = [],
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_slice = _blankArray.slice,
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.9.7";
		p.constructor = TimelineLite;
		p.kill()._gc = false;

		p.to = function(target, duration, vars, position) {
			return duration ? this.add( new TweenLite(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( TweenLite.from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			return duration ? this.add( TweenLite.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope}),
				i;
			if (typeof(targets) === "string") {
				targets = TweenLite.selector(targets) || targets;
			}
			if (!(targets instanceof Array) && targets.length && targets[0] && targets[0].nodeType && targets[0].style) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice.call(targets, 0);
			}
			stagger = stagger || 0;
			for (i = 0; i < targets.length; i++) {
				if (vars.startAt) {
					vars.startAt = _copy(vars.startAt);
				}
				tl.to(targets[i], duration, _copy(vars), i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new TweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if (value instanceof Array) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if ((child = value[i]) instanceof Array) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = TweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is neither a tween, timeline, function, nor a string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly.
			if (this._gc) if (!this._paused) if (this._time === this._duration) if (this._time < this.duration()) {
				//in case any of the anscestors had completed but should now be enabled...
				tl = this;
				while (tl._gc && tl._timeline) {
					if (tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //also enables them
					} else {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				return this._remove(value, false);
			} else if (value instanceof Array) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore instanceof Array) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce;
			if (time >= totalDur) {
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				time = totalDur + 0.000001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off)

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {

						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof TweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var tweens = TweenLite.getTweensOf(target),
				i = tweens.length,
				a = [],
				cnt = 0;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			return a;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			if (this.totalDuration() !== 0) if (value !== 0) {
				this.timeScale(this._totalDuration / value);
			}
			return this;
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function() {
			return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);
	







	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	window._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_blankArray = [],
			_easeNone = new Ease(null, null, 1, 0),
			_getGlobalPaused = function(tween) {
				while (tween) {
					if (tween._paused) {
						return true;
					}
					tween = tween._timeline;
				}
				return false;
			},
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.9.7";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (position == null) {
				this._kill(null, callback);
			} else {
				var a = this.getTweensOf(callback, false),
					i = a.length,
					time = this._parseTimeOrLabel(position);
				while (--i > -1) {
					if (a[i]._startTime === time) {
						a[i]._enabled(false, false);
					}
				}
			}
			return this;
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, overwrite:2, useFrames:this.usesFrames(), immediateRender:false}, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], onCompleteScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			this._active = !this._paused;
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration;
			if (time >= totalDur) {
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					if (dur === 0) if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time && this._first) { //In order to accommodate zero-duration timelines, we must discern the momentum/direction of time in order to render values properly when the "playhead" goes past 0 in the forward direction or lands directly on it, and also when it moves past it in the backward direction (from a postitive time to a negative time).
						internalForce = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = time;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.000001; //to avoid occasional floating point rounding errors
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && this._rawPrevTime > 0 && !this._locked)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (dur === 0) if (this._rawPrevTime >= 0 && this._first) { //zero-duration timelines are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						internalForce = true;
					}
				} else if (!this._initted) {
					internalForce = true;
				}
				this._rawPrevTime = time;
				time = 0;  //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

			} else {
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.000001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}
			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.00001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
					}
				}
				if (wrap) {
					prevTime = (backwards) ? dur + 0.000001 : -0.000001;
					this.render(prevTime, true, false);
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
				this._locked = false;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
			}

			if (this._time >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}

					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				//note: we cannot just check tween.active because timelines that contain paused children will continue to have "active" set to true even after the playhead passes their end point (technically a timeline can only be considered complete after all of its children have completed too, but paused tweens are...well...just waiting and until they're unpaused we don't know where their end point will be).
				if (!tween._paused) if (tween._timeline._time >= tween._startTime) if (tween._timeline._time < tween._startTime + tween._totalDuration / tween._timeScale) if (!_getGlobalPaused(tween._timeline)) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};

		p.totalProgress = function(value) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_DEG2RAD = Math.PI / 180,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			Segment = function(a, b, c, d) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors. For example, if you set an object's position to 4.945, Flash will make it 4.9
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = a[j+1].da / _r2[j] + a[j].da / _r1[j];
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = window._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					API: 2,
					global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._round = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
							}
						}
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._round[p]) {
								val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0;
							}
							if (func[p]) {
								target[p](val);
							} else {
								if (p == "x")
								{
									target.setX(val);
								}
								else if (p == "y")
								{
									target.setY(val);
								}
								else if (p == "z")
								{
									target.setZ(val);
								}
								else if (p == "angleX")
								{
									target.setAngleX(val);
								}
								else if (p == "angleY")
								{
									target.setAngleY(val);
								}
								else if (p == "angleZ")
								{
									target.setAngleZ(val);
								}
								else if (p == "w")
								{
									target.setWidth(val);
								}
								else if (p == "h")
								{
									target.setHeight(val);
								}
								else if (p == "alpha")
								{
									target.setAlpha(val);
								}
								else if (p == "scale")
								{
									target.setScale2(val);
								}
								else
								{
									target[p] = val;
								}
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = Math.atan2(y2 - y1, x2 - x1) * conv + add;

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = window._gsDefine.globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate) * _DEG2RAD;
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,true]] : (data.end.x != null) ? [["x","y","rotation",i,true]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._roundProps = function(lookup, value) {
			var op = this._overwriteProps,
				i = op.length;
			while (--i > -1) {
				if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {
					this._round[op[i]] = value;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
			},
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.9.7";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p};


		var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			//_clrNumExp = /(?:\b(?:(?:rgb|rgba|hsl|hsla)\(.+?\))|\B#.+?\b)/, //only finds rgb(), rgba(), hsl(), hsla() and # (hexadecimal) values but NOT color names like red, blue, etc.
			//_tinyNumExp = /\b\d+?e\-\d+?\b/g, //finds super small numbers in a string like 1e-20. could be used in matrix3d() to fish out invalid numbers and replace them with 0. After performing speed tests, however, we discovered it was slightly faster to just cut the numbers at 5 decimal places with a particular algorithm.
			_NaNExp = /[^\d\-\.]/g,
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/,
			_opacityValExp = /opacity:([^;]*)/,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_doc = document,
			_tempDiv = _doc.createElement("div"),
			_tempImg = _doc.createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = navigator.userAgent,
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					d = _doc.createElement("div"), a;

				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
				_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);

				(/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent);
				_ieVers = parseFloat( RegExp.$1 );

				d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
				a = d.getElementsByTagName("a")[0];
				return a ? /^0.55/.test(a.style.opacity) : false;
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (window.console) {
					console.log(s);
				}
			},
			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			//@private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t, null))) {
					t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					rv = (t || cs.length) ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (t.currentStyle) {
					cs = t.currentStyle;
					rv = cs[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					pix;
				if (neg) {
					v = -v;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
					if (sfx === "%" || !node.appendChild) {
						node = t.parentNode || _doc.body;
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			//@private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
						}
					} else { //Opera behaves differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							s[i] = cs[i];
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						s[i.replace(_camelExp, _camelFunc)] = cs[i];
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation * _RAD2DEG;
				s.skewX = tr.skewX * _RAD2DEG;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX * _RAD2DEG;
					s.rotationY = tr.rotationY * _RAD2DEG;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			//@private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			//@private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v == null || v === "" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
				if (y == null) {
					y = "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || isNaN(parseFloat(x))) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN().
					x = "50%";
				}
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
				}
				return x + " " + y + ((a.length > 2) ? " " + a[2] : "");
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b);
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) + d : parseFloat(v);
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result;
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v * _DEG2RAD;
				} else {
					cap = Math.PI * 2;
					split = v.split("_");
					dif = Number(split[0].replace(_NaNExp, "")) * ((v.indexOf("rad") === -1) ? _DEG2RAD : 1) - ((v.charAt(1) === "=") ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, or rgb(255,51,153)) into an array with 3 elements for red, green, and blue. Also handles rgba() values (splits into array of 4 elements of course)
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order.
			 */
			_parseColor = function(v) {
				var c1, c2, c3, h, s, l;
				if (!v || v === "") {
					return _colorLookup.black;
				}
				if (typeof(v) === "number") {
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing commma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					return _colorLookup[v];
				}
				if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						c1 = v.charAt(1),
						c2 = v.charAt(2),
						c3 = v.charAt(3);
						v = "#" + c1 + c1 + c2 + c2 + c3 + c3;
					}
					v = parseInt(v.substr(1), 16);
					return [v >> 16, (v >> 8) & 255, v & 255];
				}
				if (v.substr(0, 3) === "hsl") {
					v = v.match(_numExp);
					h = (Number(v[0]) % 360) / 360;
					s = Number(v[1]) / 100;
					l = Number(v[2]) / 100;
					c2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
					c1 = l * 2 - c2;
					if (v.length > 3) {
						v[3] = Number(v[3]);
					}
					v[0] = _hue(h + 1 / 3, c1, c2);
					v[1] = _hue(h, c1, c2);
					v[2] = _hue(h - 1 / 3, c1, c2);
					return v;
				}
				v = v.match(_numExp) || _colorLookup.transparent;
				v[0] = Number(v[0]);
				v[1] = Number(v[1]);
				v[2] = Number(v[2]);
				if (v.length > 3) {
					v[3] = Number(v[3]);
				}
				return v;
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			//@private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens  which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = proxy.rotation;
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method.
				if (v === 1) {
					mpt = d.firstMPT;
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt.e = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.e = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || "css_" + p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, rgba, temp, cv, str;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);

					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && (bv.charAt(0) === "#" || _colorLookup[bv] || _rgbhslExp.test(bv))) {
						str = ev.charAt(ev.length - 1) === "," ? ")," : ")"; //if there's a comma at the end, retain it.
						bv = _parseColor(bv);
						ev = _parseColor(ev);
						rgba = (bv.length + ev.length > 6);
						if (rgba && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								rgba = false;
							}
							pt.appendXtra((rgba ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
								.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
								.appendXtra("", bv[2], ev[2] - bv[2], (rgba ? "," : str), true);
							if (rgba) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += pt.l ? " " + bv : bv;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && l) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = (window.GreenSockGlobals || window).com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							e = (ei === -1) ? ea : ba;
							e[i] += " " + kwd;
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object) t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};








		//transform-related methods and properties
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = function(t, cs, rec) {
				var tm = rec ? t._gsTransform || {skewY:0} : {skewY:0},
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					minPI = -Math.PI + 0.0001,
					maxPI = Math.PI - 0.0001,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					s, m, i, n, dec, scaleX, scaleY, rotation, skewX, difX, difY, difR, difS;
				if (_transformProp) {
					s = _getStyle(t, _transformPropCSS, cs, true);
				} else if (t.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = t.currentStyle.filter.match(_ieGetMatrixExp);
					if (s && s.length === 4) {
						s = [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",");
					} else if (tm.x != null) { //if the element already has a _gsTransform, use that.
						return tm;
					} else {
						s = "";
					}
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				if (m.length === 16) {

					//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
					var a13 = m[8], a23 = m[9], a33 = m[10],
						a14 = m[12], a24 = m[13], a34 = m[14];

					//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
					if (tm.zOrigin) {
						a34 = -tm.zOrigin;
						a14 = a13*a34-m[12];
						a24 = a23*a34-m[13];
						a34 = a33*a34+tm.zOrigin-m[14];
					}

					//only parse from the matrix if we MUST because not only is it usually unnecessary due to the fact that we store the values in the _gsTransform object, but also because it's impossible to accurately interpret rotationX, rotationY, and rotationZ if all are applied, so it's much better to rely on what we store. However, we must parse the first time that an object is tweened. We also assume that if the position has changed, the user must have done some styling changes outside of CSSPlugin, thus we force a parse in that scenario.
					if (!rec || tm.rotationX == null) {
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a43 = m[11],
							angle = tm.rotationX = Math.atan2(a32, a33),
							xFlip = (angle < minPI || angle > maxPI),
							t1, t2, t3, cos, sin, yFlip, zFlip;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							//t4 = a42*cos+a43*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
							//a42 = t4;
						}
						//rotationY
						angle = tm.rotationY = Math.atan2(a13, a11);
						if (angle) {
							yFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							//t4 = a41*cos-a43*sin;
							//a13 = a11*sin+a13*cos;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
							//a41 = t4;
						}
						//rotationZ
						angle = tm.rotation = Math.atan2(a21, a22);
						if (angle) {
							zFlip = (angle < minPI || angle > maxPI);
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							a11 = a11*cos+a12*sin;
							t2 = a21*cos+a22*sin;
							a22 = a21*-sin+a22*cos;
							a32 = a31*-sin+a32*cos;
							a21 = t2;
						}

						if (zFlip && xFlip) {
							tm.rotation = tm.rotationX = 0;
						} else if (zFlip && yFlip) {
							tm.rotation = tm.rotationY = 0;
						} else if (yFlip && xFlip) {
							tm.rotationY = tm.rotationX = 0;
						}

						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						tm.skewX = 0;
						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
					}

				} else if ((!_supports3D || m.length === 0 || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY)) && !(tm.x !== undefined && _getStyle(t, "display", cs) === "none")) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
					var k = (m.length >= 6),
						a = k ? m[0] : 1,
						b = m[1] || 0,
						c = m[2] || 0,
						d = k ? m[3] : 1;

					tm.x = m[4] || 0;
					tm.y = m[5] || 0;
					scaleX = Math.sqrt(a * a + b * b);
					scaleY = Math.sqrt(d * d + c * c);
					rotation = (a || b) ? Math.atan2(b, a) : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
					skewX = (c || d) ? Math.atan2(c, d) + rotation : tm.skewX || 0;
					difX = scaleX - Math.abs(tm.scaleX || 0);
					difY = scaleY - Math.abs(tm.scaleY || 0);
					if (Math.abs(skewX) > Math.PI / 2 && Math.abs(skewX) < Math.PI * 1.5) {
						if (invX) {
							scaleX *= -1;
							skewX += (rotation <= 0) ? Math.PI : -Math.PI;
							rotation += (rotation <= 0) ? Math.PI : -Math.PI;
						} else {
							scaleY *= -1;
							skewX += (skewX <= 0) ? Math.PI : -Math.PI;
						}
					}
					difR = (rotation - tm.rotation) % Math.PI; //note: matching ranges would be very small (+/-0.0001) or very close to Math.PI (+/-3.1415).
					difS = (skewX - tm.skewX) % Math.PI;
					//if there's already a recorded _gsTransform in place for the target, we should leave those values in place unless we know things changed for sure (beyond a super small amount). This gets around ambiguous interpretations, like if scaleX and scaleY are both -1, the matrix would be the same as if the rotation was 180 with normal scaleX/scaleY. If the user tweened to particular values, those must be prioritized to ensure animation is consistent.
					if (tm.skewX === undefined || difX > min || difX < -min || difY > min || difY < -min || (difR > minPI && difR < maxPI && (difR * rnd) | 0 !== 0) || (difS > minPI && difS < maxPI && (difS * rnd) | 0 !== 0)) {
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
					}
					if (_supports3D) {
						tm.rotationX = tm.rotationY = tm.z = 0;
						tm.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
						tm.scaleZ = 1;
					}
				}
				tm.zOrigin = zOrigin;

				//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
				for (i in tm) {
					if (tm[i] < min) if (tm[i] > -min) {
						tm[i] = 0;
					}
				}
				//DEBUG: _log("parsed rotation: "+(tm.rotationX*_RAD2DEG)+", "+(tm.rotationY*_RAD2DEG)+", "+(tm.rotation*_RAD2DEG)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
				}
				return tm;
			},
			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation,
					skew = ang + t.skewX,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x,
					oy = t.y,
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(") === -1) {
					style.removeAttribute("filter");
				}
			},
			_set3DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					perspective = t.perspective,
					a11 = t.scaleX, a12 = 0, a13 = 0, a14 = 0,
					a21 = 0, a22 = t.scaleY, a23 = 0, a24 = 0,
					a31 = 0, a32 = 0, a33 = t.scaleZ, a34 = 0,
					a41 = 0, a42 = 0, a43 = (perspective) ? -1 / perspective : 0,
					angle = t.rotation,
					zOrigin = t.zOrigin,
					rnd = 100000,
					cos, sin, t1, t2, t3, t4, ffProp, n, sfx;

				if (_isFirefox) { //Firefox has a bug that causes 3D elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(this.t, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(this.t, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}

				if (angle || t.skewX) {
					t1 = a11*Math.cos(angle);
					t2 = a22*Math.sin(angle);
					angle -= t.skewX;
					a12 = a11*-Math.sin(angle);
					a22 = a22*Math.cos(angle);
					a11 = t1;
					a21 = t2;
				}
				angle = t.rotationY;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a11*cos;
					t2 = a21*cos;
					t3 = a33*-sin;
					t4 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = a33*cos;
					a43 *= cos;
					a11 = t1;
					a21 = t2;
					a31 = t3;
					a41 = t4;
				}
				angle = t.rotationX;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					t3 = a32*cos+a33*sin;
					t4 = a42*cos+a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a32*-sin+a33*cos;
					a43 = a42*-sin+a43*cos;
					a12 = t1;
					a22 = t2;
					a32 = t3;
					a42 = t4;
				}
				if (zOrigin) {
					a34 -= zOrigin;
					a14 = a13*a34;
					a24 = a23*a34;
					a34 = a33*a34+zOrigin;
				}
				//we round the x, y, and z slightly differently to allow even larger values.
				a14 = (t1 = (a14 += t.x) - (a14 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a14 : a14;
				a24 = (t1 = (a24 += t.y) - (a24 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a24 : a24;
				a34 = (t1 = (a34 += t.z) - (a34 |= 0)) ? ((t1 * rnd + (t1 < 0 ? -0.5 : 0.5)) | 0) / rnd + a34 : a34;
				style[_transformProp] = "matrix3d(" + [ (((a11 * rnd) | 0) / rnd), (((a21 * rnd) | 0) / rnd), (((a31 * rnd) | 0) / rnd), (((a41 * rnd) | 0) / rnd), (((a12 * rnd) | 0) / rnd), (((a22 * rnd) | 0) / rnd), (((a32 * rnd) | 0) / rnd), (((a42 * rnd) | 0) / rnd), (((a13 * rnd) | 0) / rnd), (((a23 * rnd) | 0) / rnd), (((a33 * rnd) | 0) / rnd), (((a43 * rnd) | 0) / rnd), a14, a24, a34, (perspective ? (1 + (-a34 / perspective)) : 1) ].join(",") + ")";
			},
			_set2DTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					targ = this.t,
					style = targ.style,
					ffProp, t1, n, sfx, ang, skew, rnd, sx, sy;
				if (_isFirefox) { //Firefox has a bug that causes elements to randomly disappear during animation unless a repaint is forced. One way to do this is change "top" or "bottom" by 0.05 which is imperceptible, so we go back and forth. Another way is to change the display to "none", read the clientTop, and then revert the display but that is much slower.
					ffProp = style.top ? "top" : style.bottom ? "bottom" : parseFloat(_getStyle(targ, "top", null, false)) ? "bottom" : "top";
					t1 = _getStyle(targ, ffProp, null, false);
					n = parseFloat(t1) || 0;
					sfx = t1.substr((n + "").length) || "px";
					t._ffFix = !t._ffFix;
					style[ffProp] = (t._ffFix ? n + 0.05 : n - 0.05) + sfx;
				}
				if (!t.rotation && !t.skewX) {
					style[_transformProp] = "matrix(" + t.scaleX + ",0,0," + t.scaleY + "," + t.x + "," + t.y + ")";
				} else {
					ang = t.rotation;
					skew = ang - t.skewX;
					rnd = 100000;
					sx = t.scaleX * rnd;
					sy = t.scaleY * rnd;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
					style[_transformProp] = "matrix(" + (((Math.cos(ang) * sx) | 0) / rnd) + "," + (((Math.sin(ang) * sx) | 0) / rnd) + "," + (((Math.sin(skew) * -sy) | 0) / rnd) + "," + (((Math.cos(skew) * sy) | 0) / rnd) + "," + t.x + "," + t.y + ")";
				}
			};

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			if (cssp._transform) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			var m1 = cssp._transform = _getTransform(t, _cs, true),
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				m2, skewY, copy, orig, has3D, hasChange, dr;

			if (typeof(v.transform) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = style.cssText;
				style[_transformProp] = v.transform;
				style.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				m2 = _getTransform(t, null, false);
				style.cssText = copy;
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal((v.scaleZ != null) ? v.scaleZ : v.scale, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : (m1.rotation * _RAD2DEG), m1.rotation, "rotation", endRotations);
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : (m1.rotationX * _RAD2DEG) || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : (m1.rotationY * _RAD2DEG) || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = (v.skewX == null) ? m1.skewX : _parseAngle(v.skewX, m1.skewX);

				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				m2.skewY = (v.skewY == null) ? m1.skewY : _parseAngle(v.skewY, m1.skewY);
				if ((skewY = m2.skewY - m1.skewY)) {
					m2.skewX += skewY;
					m2.rotation += skewY;
				}
			}

			has3D = (m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					p = _transformOriginProp;
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, "css_transformOrigin");
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = style[p] = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = style[p] = orig;
					}

				//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}

			if (hasChange) {
				cssp._transformType = (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1)) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp <img>'s src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition}); //note: backgroundPosition doesn't support interpreting between px and % (start and end values should use the same units) because doing so would require determining the size of the image itself and that can't be done quickly.
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:_parsePosition});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
				return this.parseComplex(t.style, this.format(_getStyle(t, "borderTopWidth", _cs, false, "0px") + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), this.format(e), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter,
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || "alpha(opacity=100)"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("opacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8)
						t.filter += " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				vb;
			e = parseFloat(e);
			if (p === "autoAlpha") {
				vb = _getStyle(t, "visibility", _cs);
				if (b === 1 && vb === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
					b = 0;
				}
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "visible" : "hidden"), ((e === 0) ? "hidden" : "visible"));
				pt.xs0 = "visible";
				cssp._overwriteProps.push(pt.n);
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = (p === "autoAlpha") ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.className = (v === 0) ? this.b : this.e;
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.className !== this.e) {
					this.t.className = this.e;
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.className,
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			if (cssp._tween._duration) { //if it's a zero-duration tween, there's no need to tween anything or parse the data. In fact, if we switch classes temporarily (which we must do for proper parsing) and the class has a transition applied, it could cause a quick flash to the end state and back again initially in some browsers.
				t.className = pt.e;
				difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
				t.className = b;
				pt.data = difData.firstMPT;
				t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
				pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			}
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration) { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that).
				var all = (this.e === "all"),
					s = this.t.style,
					a = all ? s.cssText.split(";") : this.e.split(","),
					i = a.length,
					transformParse = _specialProps.transform.parse,
					p;
				while (--i > -1) {
					p = a[i];
					if (all) {
						p = p.substr(0, p.indexOf(":")).split(" ").join("");
					}
					if (_specialProps[p]) {
						p = (_specialProps[p].parse === transformParse) ? _transformProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
					}
					_removeProp(s, p);
				}
			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = target;
			this._tween = tween;
			this._vars = vars;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;

			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					style.zIndex = 0;
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}
			this._firstPT = pt = this.parse(target, vars, null);

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							style.zIndex = 0;
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						style.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden");
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = (threeD && _supports3D) ? _set3DTransformRatio : _transformProp ? _set2DTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);

				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && (es.indexOf(" ") !== -1 || es.indexOf(",") !== -1)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.substr((en + "").length) || "" : "";
						}

						if (esfx === "") {
							esfx = _suffixMap[p] || bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn || bn === 0) {
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (bn > 100) { //extremely rare
									bn = 100;
								}
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em") {
								bn /= _convertToPixels(target, p, 1, "em");

							//otherwise convert to pixels.
							} else {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, "css_" + p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, "css_" + p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;

			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.e;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = (val > 0) ? (val + 0.5) | 0 : (val - 0.5) | 0;
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transformType = (threeD || this._transformType === 3) ? 3 : 2;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.css_autoAlpha || lookup.css_alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.css_opacity = 1;
				if (copy.css_autoAlpha) {
					copy.css_visibility = 1;
				}
			}
			if (lookup.css_className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};




		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of TweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = TweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = TweenLite._internals.reservedProps,
				i, difs, p;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true);
			_getChildStyles(target, e);
			tween.render(0, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					results.push( TweenLite.to(targets[i], duration, difs) );
				}
			}
			return results;
		};


		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = window._gsDefine.plugin({
				propName: "roundProps",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps instanceof Array) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = 1;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._roundProps(lookup, true);
					} else if (pt.n === prop) {
						this._add(pt.t, prop, pt.s, pt.c);
						//remove from linked list
						if (next) {
							next._prev = pt._prev;
						}
						if (pt._prev) {
							pt._prev._next = next;
						} else if (tween._firstPT === pt) {
							tween._firstPT = next;
						}
						pt._next = pt._prev = null;
						tween._propLookup[prop] = rpt;
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, true);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "attr",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			var p;
			if (typeof(target.setAttribute) !== "function") {
				return false;
			}
			this._target = target;
			this._proxy = {};
			for (p in value) {
				this._addTween(this._proxy, p, parseFloat(target.getAttribute(p)), value[p], p);
				this._overwriteProps.push(p);
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			this._super.setRatio.call(this, ratio);
			var props = this._overwriteProps,
				i = props.length,
				p;
			while (--i > -1) {
				p = props[i];
				this._target.setAttribute(p, this._proxy[p] + "");
			}
		}

	});










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	window._gsDefine.plugin({
		propName: "directionalRotation",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					split = (value[p] + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	window._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (window.GreenSockGlobals || window),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + 1;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return ((this._p2 * p) >> 0) * this._p1;
		};
		p.config = SteppedEase.config = function(steps) {
			return new SteppedEase(steps);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = amplitude || 1;
					this._p2 = period || def;
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * _2PI / this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * _2PI / this._p2 ) *0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


}); 











/*
 * ----------------------------------------------------------------
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window) {

		"use strict";
		var _globals = window.GreenSockGlobals || window,
			_namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_slice = [].slice,
			_emptyFunc = function() {},
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/FWDUVPTweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = null; //reset it back to null so that the next load of FWDUVPTweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/FWDUVPTweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").join("/"), [], function() { return cl; });
							} else if (typeof(module) !== "undefined" && module.exports){ //node
								module.exports = cl;
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener.up) {
						listener.c.call(listener.s || t, {type:type, target:t});
					} else {
						listener.c.call(listener.s || t);
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();};

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame),
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					_self.time = (_getTime() - _startTime) / 1000;
					var id = _id,
						overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						_self.dispatchEvent("tick");
					}
					if (manual !== true && id === _id) { //make sure the ids match in case the "tick" dispatch triggered something that caused the ticker to shut down or change _useRAF or something like that.
						_id = _req(_tick);
					}
				};

			EventDispatcher.call(_self);
			this.time = this.frame = 0;
			this.tick = function() {
				_tick(true);
			};

			this.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			this.wake = function() {
				if (_id !== null) {
					_self.sleep();
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			this.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			this.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF && (!_id || _self.frame < 5)) {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(this.vars.delay) || 0;
				this._timeScale = 1;
				this._active = (this.vars.immediateRender === true);
				this.data = this.vars.data;
				this._reversed = (this.vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) {
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;

		p.play = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (arguments.length) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (arguments.length) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function() {

		};

		p.invalidate = function() {
			return this;
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if (type == null) {
				return null;
			} else if (type.substr(0,2) === "on") {
				var v = this.vars,
					i;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = params;
					v[type + "Scope"] = scope;
					if (params) {
						i = params.length;
						while (--i > -1) {
							if (params[i] === "{self}") {
								params = v[type + "Params"] = params.concat(); //copying the array avoids situations where the same array is passed to multiple tweens/timelines and {self} doesn't correctly point to each individual instance.
								params[i] = this;
							}
						}
					}
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a FWDUVPTweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the anscestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					if (!tl._active) {
						//in case any of the anscestors had completed but should now be enabled...
						while (tl._timeline) {
							tl.totalTime(tl._totalTime, true);
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time) {
					this.render(time, suppressEvents, false);
				}
			}
			return this;
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || 0.000001; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(this._totalTime, true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			if (value != this._paused) if (this._timeline) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				var raw = this._timeline.rawTime(),
					elapsed = raw - this._pauseTime;
				if (!value && this._timeline.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = (!value && this._totalTime > 0 && this._totalTime < this._totalDuration);
				if (!value && elapsed !== 0 && this._duration !== 0) {
					this.render(this._totalTime, true, true);
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}
				tween.timeline = null;

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};


/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target[0] && target[0].nodeType && target[0].style)),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice.call(target, 0);
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ[0] && targ[0].nodeType && targ[0].style) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary...
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice.call(targ, 0));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this.render(-this._delay, false, true);
				}
			}, true),
			_isSelector = function(v) {
				return (v.length && v[0] && v[0].nodeType && v[0].style);
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "x" || p === "y" || p === "width" || p === "height" || p === "className") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = false;

		TweenLite.version = "1.9.7";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = true;
		TweenLite.selector = window.$ || window.jQuery || function(e) { if (window.$) { TweenLite.selector = window.$; return window.$(e); } return window.document ? window.document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e) : e; };

		var _internals = TweenLite._internals = {}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = TweenLite._tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline();

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;

		Animation._updateRoot = function() {
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (!(_ticker.frame % 120)) { //dump garbage every 120 frames...
					var i, a, p;
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},

			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) if (curTween._enabled(false, false)) {
								changed = true;
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + 0.0000000001,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},

			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime,
					min = 0.0000000001; //we use this to protect from rounding errors.
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * min)) ? min : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + min) ? 0 : t - reference - min;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				ease = v.ease,
				i, initPlugins, pt, p;
			if (v.startAt) {
				v.startAt.overwrite = 0;
				v.startAt.immediateRender = true;
				this._startAt = TweenLite.to(this.target, 0, v.startAt);
				if (v.immediateRender) {
					this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					if (this._time === 0 && dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && v.immediateRender && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt = null;
				} else if (this._time === 0) {
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					this._startAt = TweenLite.to(this.target, 0, pt);
					return;
				}
			}
			if (!ease) {
				this._ease = TweenLite.defaultEase;
			} else if (ease instanceof Ease) {
				this._ease = (v.easeParams instanceof Array) ? ease.config.apply(ease, v.easeParams) : ease;
			} else {
				this._ease = (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				i = this._targets.length;
				while (--i > -1) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps) {
			var p, i, initPlugins, plugin, a, pt, v;
			if (target == null) {
				return false;
			}
			if (!this.vars.css) if (target.style) if (target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity)
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				if (_reservedProps[p]) {
					if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams") if ((a = this.vars[p])) {
						i = a.length;
						while (--i > -1) {
							if (a[i] === "{self}") {
								a = this.vars[p] = a.concat(); //copy the array in case the user referenced the same array in multiple tweens/timelines (each {self} should be unique)
								a[i] = this;
							}
						}
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}

				} else {
					this._firstPT = propLookup[p] = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					v = this.vars[p];
					pt.c = (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : (Number(v) - pt.s) || 0;
				}
				if (pt) if (pt._next) {
					pt._next._prev = pt;
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps);
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				isComplete, callback, pt;
			if (time >= this._duration) {
				this._totalTime = this._time = this._duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
				}
				if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (time === 0 || this._rawPrevTime < 0) if (this._rawPrevTime !== time) {
						force = true;
						if (this._rawPrevTime > 0) {
							callback = "onReverseComplete";
							if (suppressEvents) {
								time = -1; //when a callback is placed at the VERY beginning of a timeline and it repeats (or if timeline.seek(0) is called), events are normally suppressed during those behaviors (repeat or seek()) and without adjusting the _rawPrevTime back slightly, the onComplete wouldn't get called on the next render. This only applies to zero-duration tweens/callbacks of course.
							}
						}
					}
					this._rawPrevTime = time;
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._duration === 0) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._rawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = time;
					}
				} else if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}

			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / this._duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / this._duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / this._duration);
				}

			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly.
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / this._duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}

			if (!this._active) if (!this._paused) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || this._duration === 0) if (!suppressEvents) {
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
				}
			}

			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt) {
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) {
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
				}
			}

			if (callback) if (!this._gc) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate) {
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
				}
			}

		};

		p._kill = function(vars, target) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i])) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (vars == null || vars._tempKill !== true)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = null;
			this._overwrittenProps = null;
			this._onUpdate = null;
			this._startAt = null;
			this._initted = this._active = this._notifyPluginsOfEnabled = false;
			this._propLookup = (this._targets) ? {} : [];
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
			var a = TweenLite.getTweensOf(target),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};

		TweenLite.getTweensOf = function(target) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((target instanceof Array || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i]));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another <script> call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.9.1";
		TweenPlugin.API = 2;
		p._firstPT = null;

		p._addTween = function(target, prop, start, end, overwriteProp, round) {
			var c, pt;
			if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0)+"1", 10) * Number(end.substr(2)))) {
				this._firstPT = pt = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) === "function"), n:overwriteProp || prop, r:round};
				if (pt._next) {
					pt._next._prev = pt;
				}
			}
		};

		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.r) {
					val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0; //about 4x faster than Math.round()
				} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
					val = 0;
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
		};

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._roundProps = function(lookup, value) {
			var pt = this._firstPT;
			while (pt) {
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: com.greensock." + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})(window);﻿//FWDUVPUtils
(function (window){
	
	var FWDUVPUtils = function(){};
		
	FWDUVPUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDUVPUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
			
	FWDUVPUtils.trimAndFormatUrl = function(str){
		str = str.toLocaleLowerCase();
		str = str.replace(/ /g, "-");
		return str;
	};
	
	FWDUVPUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDUVPUtils.trim(array[i]);
		};
		return array;
	};

	//#############################################//
	//Array //
	//#############################################//
	FWDUVPUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDUVPUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDUVPUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDUVPUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDUVPUtils.getChildAt = function (e, n){
		var kids = FWDUVPUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDUVPUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDUVPUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDUVPUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDUVPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDUVPUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDUVPUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDUVPUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDUVPUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDUVPUtils.getAttributeValue = function(e, attr){
		if(!FWDUVPUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDUVPUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.attributes[attr];
			return  test ? true : false;
		}
	};
	
	FWDUVPUtils.insertNodeAt = function(parent, child, n){
		var children = FWDUVPUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDUVPUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDUVPUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(parseInt(rect.width) != rect.width && !FWDUVPUtils.isIEAndLessThen9){
			if(x >= (rect.left * 100) 
			   && x <= (rect.left * 100) +((rect.right * 100) - (rect.left* 100))
			   && y >= (rect.top * 100) 
			   && y <= (rect.top * 100) + ((rect.bottom * 100) - (rect.top * 100))) return true;
		}else{
			if(x >= parseInt(rect.left) 
			   && x <= parseInt(rect.left +(rect.right - rect.left)) 
			   && y >= parseInt(rect.top) 
			   && y <= parseInt(rect.top + (rect.bottom - rect.top))) return true;
		}
		
		
		return false;
	};
	
	FWDUVPUtils.hitBuggyTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		
		return false;
	};
	
	FWDUVPUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDUVPUtils.getViewportSize = function(){
		if(FWDUVPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDUVPUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDUVPUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDUVPUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDUVPUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled);
	}());
	
	FWDUVPUtils.isMobile = (function (){
		if(FWDUVPUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(navigator.userAgent.toLowerCase().indexOf(String(agents[i]).toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    return false;
	}());
	
	FWDUVPUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDUVPUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDUVPUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDUVPUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opr') != -1;
	}());
	
	FWDUVPUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDUVPUtils.isIEWebKit = (function(){
		return Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDUVPUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1);
		return isIE || Boolean(document.documentElement.msRequestFullscreen);
	}());
	
	FWDUVPUtils.isIEAndLessThen9 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1);
	}());
	
	FWDUVPUtils.isIEAnd9OrLess = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) 
		|| Boolean(navigator.userAgent.toLowerCase().indexOf("msie 8") != -1)
		|| Boolean(navigator.userAgent.toLowerCase().indexOf("msie 9") != -1);
		}());
	
	FWDUVPUtils.isIE7 = (function(){
		return Boolean(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1);
	}());
	
	FWDUVPUtils.isMac = (function(){
		return Boolean(navigator.appVersion.toLowerCase().indexOf('mac') != -1);
	}());
	
	FWDUVPUtils.isWin = (function(){
		return Boolean(navigator.appVersion.toLowerCase().indexOf('win') != -1);
	}());
	
	FWDUVPUtils.isIOS = (function(){
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	}());
	
	FWDUVPUtils.isIphone = (function(){
		return navigator.userAgent.match(/(iPhone|iPod)/g);
	}());
	
	FWDUVPUtils.hasFullScreen = (function(){
		return FWDUVPUtils.dumy.requestFullScreen || FWDUVPUtils.dumy.mozRequestFullScreen || FWDUVPUtils.dumy.webkitRequestFullScreen || FWDUVPUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDUVPUtils.dumy.style[p] !== 'undefined') {
	    	   FWDUVPUtils.dumy.style.position = "absolute";
	    	   position = FWDUVPUtils.dumy.getBoundingClientRect().left;
	    	   FWDUVPUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDUVPUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDUVPUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDUVPUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDUVPUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDUVPUtils.dumy);}catch(e){}
	    return false;
	};
	
	//###############################################//
	/* Media. */
	//###############################################//
	
	
	FWDUVPUtils.volumeCanBeSet = (function(){
		var soundTest_el = document.createElement("audio");
		if(!soundTest_el) return;
		soundTest_el.volume = 0;
		return soundTest_el.volume == 0 ? true : false;
	}());
	
	
	FWDUVPUtils.getVideoFormat = (function(){
		var video  =  document.createElement("video");
		if(!video.canPlayType) return;
		var extention_str;
		if(video.canPlayType("video/mp4") == "probably" || video.canPlayType("video/mp4") == "maybe"){
			extention_str = ".mp4";
		}else if(video.canPlayType("video/ogg") == "probably" || video.canPlayType("video/ogg") == "maybe"){
			extention_str = ".ogg";
		}else if(video.canPlayType("video/webm") == "probably" || video.canPlayType("video/webm") == "maybe"){
			extention_str = ".webm";
		}
		video = null;
		return extention_str;
	})();
	
	
	//###############################################//
	/* Various utils */
	//###############################################//
	FWDUVPUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			window.addEventListener("DOMContentLoaded", function(){
				FWDUVPUtils.checkIfHasTransofrms();
				FWDUVPUtils.hasFullScreen = FWDUVPUtils.checkIfHasFullscreen();
				setTimeout(callbalk, 100);
			});
		}else{
			document.onreadystatechange = function () {
				FWDUVPUtils.checkIfHasTransofrms();
				FWDUVPUtils.hasFullScreen = FWDUVPUtils.checkIfHasFullscreen();
				if (document.readyState == "complete") setTimeout(callbalk, 100);
			};
		 }
	};
	
	FWDUVPUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDUVPUtils.dumy);
		FWDUVPUtils.hasTransform3d = get3d();
		FWDUVPUtils.hasTransform2d = get2d();
		FWDUVPUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDUVPUtils.checkIfHasFullscreen = function(){
		return Boolean(document.documentElement.requestFullScreen
		|| document.documentElement.mozRequestFullScreen
		|| document.documentElement.webkitRequestFullScreen
		|| document.documentElement.msRequestFullscreen);
	};
	
	FWDUVPUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDUVPUtils.getUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("?") + 1) || location.search.substring(1);
		query = query.replace(/(\?*)(\/*)/g, "");
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDUVPUtils.getHashUrlArgs = function urlArgs(string){
		var args = {};
		var query = string.substr(string.indexOf("#") + 1) || location.search.substring(1);
		query = query.replace(/(\?*)(\/*)/g, "");
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};

	FWDUVPUtils.validateEmail = function(mail){  
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
			return true;  
		}  
		return false;  
    }; 
    
	FWDUVPUtils.isReadyMethodCalled_bl = false;
	
	window.FWDUVPUtils = FWDUVPUtils;
}(window));
/* thumbs manager */
(function(window){
	
	var FWDUVPVideoScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDUVPVideoScreen.prototype;
	
		this.video_el = null;
	
		this.sourcePath_str = null;
		
		this.bk_do = null;
		this.controllerHeight = parent.data.controllerHeight;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.lastPercentPlayed = 0;
		this.volume = volume;
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
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setBkColor(parent.videoBackgroundColor_str);
			self.setupVideo();
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupVideo = function(){
			if(self.video_el == null){
				self.video_el = document.createElement("video");
				self.screen.appendChild(self.video_el);
				self.video_el.controls = false;
				self.video_el.volume = self.volume;
				self.video_el.style.position = "absolute";
				self.video_el.style.pointerEvent = "none";
				self.video_el.style.left = "0px";
				self.video_el.style.top = "0px";
				self.video_el.style.backfaceVisibility = "hidden";
				self.video_el.style.width = "100%";
				self.video_el.style.height = "100%";
				self.video_el.style.margin = "0px";
				self.video_el.style.padding = "0px";
				self.video_el.style.maxWidth = "none";
				self.video_el.style.maxHeight = "none";
				self.video_el.style.border = "none";
				self.video_el.style.lineHeight = "0";
				self.video_el.style.msTouchAction = "none";
				self.screen.appendChild(self.video_el);
			}
			
			self.video_el.addEventListener("error", self.errorHandler);
			self.video_el.addEventListener("canplay", self.safeToBeControlled);
			self.video_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.video_el.addEventListener("progress", self.updateProgress);
			self.video_el.addEventListener("timeupdate", self.updateVideo);
			self.video_el.addEventListener("pause", self.pauseHandler);
			self.video_el.addEventListener("play", self.playHandler);
			if(!FWDUVPUtils.isIE){
				self.video_el.addEventListener("waiting", self.startToBuffer);
			}
			self.video_el.addEventListener("playing", self.stopToBuffer);
			self.video_el.addEventListener("ended", self.endedHandler);
			self.resizeAndPosition();
		};	
		
		
		this.destroyVideo = function(){
			clearTimeout(self.showErrorWithDelayId_to);
			if(self.video_el){
				self.video_el.removeEventListener("error", self.errorHandler);
				self.video_el.removeEventListener("canplay", self.safeToBeControlled);
				self.video_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.video_el.removeEventListener("progress", self.updateProgress);
				self.video_el.removeEventListener("timeupdate", self.updateVideo);
				self.video_el.removeEventListener("pause", self.pauseHandler);
				self.video_el.removeEventListener("play", self.playHandler);
				if(!FWDUVPUtils.isIE){
					self.video_el.removeEventListener("waiting", self.startToBuffer);
				}
				self.video_el.removeEventListener("playing", self.stopToBuffer);
				self.video_el.removeEventListener("ended", self.endedHandler);
				if(self.isMobile_bl){	
					self.screen.removeChild(self.video_el);
					self.video_el = null;
				}else{
					self.video_el.style.visibility = "hidden";
					self.video_el.src = "";
					self.video_el.load();
				}
			}
		};
		
		this.startToBuffer = function(overwrite){
			self.dispatchEvent(FWDUVPVideoScreen.START_TO_BUFFER);
		};
		
		this.stopToBuffer = function(){
			self.dispatchEvent(FWDUVPVideoScreen.STOP_TO_BUFFER);
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			
			var error_str;
			self.hasError_bl = true;
			
			if(self.video_el.networkState == 0){
				error_str = "error 'self.video_el.networkState = 0'";
			}else if(self.video_el.networkState == 1){
				error_str = "error 'self.video_el.networkState = 1'";
			}else if(self.video_el.networkState == 2){
				error_str = "'self.video_el.networkState = 2'";
			}else if(self.video_el.networkState == 3){
				error_str = "source not found <font color='#FFFFFF'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.video_el.networkState);
			
			clearTimeout(self.showErrorWithDelayId_to);
			self.showErrorWithDelayId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPVideoScreen.ERROR, {text:error_str });
			}, 200);
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(width, height){
			if(width){
				self.stageWidth = width;
				self.stageHeight = height;
			}
			
			self.setWidth(self.stageWidth);
			if(FWDUVPUtils.isIphone){	
				self.setHeight(self.stageHeight - self.controllerHeight);
			}else{
				self.setHeight(self.stageHeight);
			}
			
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			self.sourcePath_str = sourcePath;
			if(self.video_el) self.stop();
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			FWDUVPlayer.curInstance = parent;
			if(self.isStopped_bl){
				self.isPlaying_bl = false;
				self.hasError_bl = false;
				self.allowScrubing_bl = false;
				self.isStopped_bl = false;
				self.setupVideo();
				self.setVolume();
				self.video_el.src = self.sourcePath_str;
				self.play();
				self.startToBuffer(true);
				self.isPlaying_bl = true;
			}else if(!self.video_el.ended || overwrite){
				try{
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.video_el.play();
					if(FWDUVPUtils.isIE) self.dispatchEvent(FWDUVPVideoScreen.PLAY);
				}catch(e){};
			}
		};

		this.pause = function(){
			if(self == null || self.isStopped_bl || self.hasError_bl) return;
			if(!self.video_el.ended){
				try{
					self.video_el.pause();
					self.isPlaying_bl = false;
					if(FWDUVPUtils.isIE) self.dispatchEvent(FWDUVPVideoScreen.PAUSE);
				}catch(e){};
			}
		};
		
		this.togglePlayPause = function(){
			if(self == null) return;
			if(!self.isSafeToBeControlled_bl) return;
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			self.dispatchEvent(FWDUVPVideoScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDUVPVideoScreen.START);
				self.isStartEventDispatched_bl = true;
			}
			self.dispatchEvent(FWDUVPVideoScreen.PLAY);
		};
		
		this.endedHandler = function(){
			self.dispatchEvent(FWDUVPVideoScreen.PLAY_COMPLETE);
		};
		
		this.stop = function(overwrite){
			if((self == null || self.video_el == null || self.isStopped_bl) && !overwrite) return;
			//logger.log("# VID stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			self.destroyVideo();
			self.dispatchEvent(FWDUVPVideoScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			self.dispatchEvent(FWDUVPVideoScreen.STOP);
			self.stopToBuffer();
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			self.stopToScrub();
			if(!self.isSafeToBeControlled_bl){
				self.hasHours_bl = Math.floor(self.video_el.duration / (60 * 60)) > 0;
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				self.video_el.style.visibility = "visible";
				self.dispatchEvent(FWDUVPVideoScreen.SAFE_TO_SCRUBB);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(self.video_el.buffered.length > 0){
				buffered = self.video_el.buffered.end(self.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.video_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDUVPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		this.updateVideo = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.video_el.currentTime /self.video_el.duration;
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.video_el.duration);
			var curTime = self.formatTime(self.video_el.currentTime);
			
			
			if(!isNaN(self.video_el.duration)){
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:parseInt(self.video_el.currentTime)});
			}else{
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
			}
			
			self.lastPercentPlayed = percentPlayed;
			self.curDuration = curTime;
		};
		
		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent, e){
			//if(!self.allowScrubing_bl) return;
			if(e) self.startToScrub();
			try{
				self.video_el.currentTime = self.video_el.duration * percent;
				var totalTime = self.formatTime(self.video_el.duration);
				var curTime = self.formatTime(self.video_el.currentTime);
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		this.replay = function(){
			self.scrub(0);
			self.play();
		};
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.video_el) self.video_el.volume = self.volume;
		};
		
		this.formatTime = function(secs){
			var hours = Math.floor(secs / (60 * 60));
			
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    
		    if(isNaN(seconds)) return "00:00";
			if(self.hasHours_bl){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};

	
		this.init();
	};

	/* set prototype */
	FWDUVPVideoScreen.setPrototype = function(){
		FWDUVPVideoScreen.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPVideoScreen.ERROR = "error";
	FWDUVPVideoScreen.UPDATE = "update";
	FWDUVPVideoScreen.UPDATE_TIME = "updateTime";
	FWDUVPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDUVPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDUVPVideoScreen.START = "start";
	FWDUVPVideoScreen.PLAY = "play";
	FWDUVPVideoScreen.PAUSE = "pause";
	FWDUVPVideoScreen.STOP = "stop";
	FWDUVPVideoScreen.PLAY_COMPLETE = "playComplete";
	FWDUVPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDUVPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDUVPVideoScreen = FWDUVPVideoScreen;

}(window));/* FWDUVPVolumeButton */
(function (window){
var FWDUVPVolumeButton = function(nImg, sPath, dPath){
		
		var self = this;
		var prototype = FWDUVPVolumeButton.prototype;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
		
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
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.n_sdo = new FWDUVPDisplayObject("img");	
			self.n_sdo.setScreen(self.nImg);
			self.addChild(self.n_sdo);
			
			if(self.allowToCreateSecondButton_bl){
				var img1 = new Image();
				img1.src = self.sPath_str;
				self.s_sdo = new FWDUVPDisplayObject("img");
				self.s_sdo.setScreen(img1);
				self.s_sdo.setWidth(self.totalWidth);
				self.s_sdo.setHeight(self.totalHeight);
				self.s_sdo.setAlpha(0);
				self.addChild(self.s_sdo);
				
				if(self.dPath_str){
					var img2 = new Image();
					img2.src = self.dPath_str;
					self.d_sdo = new FWDUVPDisplayObject("img");	
					self.d_sdo.setScreen(img2);
					self.d_sdo.setWidth(self.totalWidth);
					self.d_sdo.setHeight(self.totalHeight);
					if(self.isMobile_bl){
						self.d_sdo.setX(-100);
					}else{
						self.d_sdo.setAlpha(0);
					}
					self.addChild(self.d_sdo);
				};
			}
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonMode(true);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("MSPointerDown", self.onMouseUp);
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDUVPVolumeButton.SHOW_TOOLTIP, {e:e});
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPVolumeButton.MOUSE_OVER, {e:e});
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDUVPVolumeButton.MOUSE_OUT, {e:e});
				//self.setNormalState(true);
			}
		};
		
		self.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2 || self.isSelectedFinal_bl) return;
			self.dispatchEvent(FWDUVPVolumeButton.MOUSE_UP, {e:e});
		};
		
		//###################################//
		/* set slected / normal state */
		//##################################//
		this.setNormalState = function(animate){
			if(!self.isSelected_bl) return;
			self.isSelected_bl = false; 
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			if(animate){
				FWDUVPTweenMax.to(self.s_sdo, .5, {alpha:0, delay:.1, ease:Expo.easeOut});
			}else{
				self.s_sdo.setAlpha(0);
			}
		};
		
		this.setSelectedState = function(animate){
			if(self.isSelected_bl) return;
			self.isSelected_bl = true; 
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			if(animate){
				FWDUVPTweenMax.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}else{
				self.s_sdo.setAlpha(1);
			}
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelctedFinal = function(){
			self.isSelectedFinal_bl = true;
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			FWDUVPTweenMax.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
			self.setButtonMode(false);
		};
		
		self.setUnselctedFinal = function(){
			self.isSelectedFinal_bl = false;
			FWDUVPTweenMax.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			self.setButtonMode(true);
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.isMobile_bl){
				self.d_sdo.setX(0);
			}else{
				FWDUVPTweenMax.killTweensOf(self.d_sdo);
				FWDUVPTweenMax.to(self.d_sdo, .8, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.isMobile_bl){
				self.d_sdo.setX(-100);
			}else{
				FWDUVPTweenMax.killTweensOf(self.d_sdo);
				FWDUVPTweenMax.to(self.d_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			}
		};
		
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setButtonMode(true);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("MSPointerDown", self.onMouseUp);
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.screen.removeEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.removeEventListener){	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseUp);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseUp);
			}
		
			FWDUVPTweenMax.killTweensOf(self.s_sdo);
			self.n_sdo.destroy();
			self.s_sdo.destroy();
			
			if(self.d_sdo){
				FWDUVPTweenMax.killTweensOf(self.d_sdo);
				self.d_sdo.destroy();
			}
			
			self.nImg = null;
			self.sImg = null;
			self.dImg = null;
			self.n_sdo = null;
			self.s_sdo = null;
			self.d_sdo = null;
			
			nImg = null;
			sImg = null;
			dImg = null;
			
			self.toolTipLabel_str = null;
			
			self.init = null;
			self.setupMainContainers = null;
			self.onMouseOver = null;
			self.onMouseOut = null;
			self.onClick = null;
			self.onMouseDown = null;  
			self.setSelctedFinal = null;
			self.setUnselctedFinal = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDUVPVolumeButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDUVPVolumeButton.setPrototype = function(){
		FWDUVPVolumeButton.prototype = null;
		FWDUVPVolumeButton.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPVolumeButton.SHOW_TOOLTIP = "showToolTip";
	FWDUVPVolumeButton.CLICK = "onClick";
	FWDUVPVolumeButton.MOUSE_OVER = "onMouseOver";
	FWDUVPVolumeButton.MOUSE_OUT = "onMouseOut";
	FWDUVPVolumeButton.MOUSE_UP = "onMouseDown";
	
	FWDUVPVolumeButton.prototype = null;
	window.FWDUVPVolumeButton = FWDUVPVolumeButton;
}(window));/* thumbs manager */
(function(window){
	
	var FWDUVPYoutubeScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDUVPYoutubeScreen.prototype;
		
		this.videoHolder_do = null;
		this.ytb = null;
		
		this.lastQuality_str = "auto";
		
		this.volume = volume;
		
		this.updateVideoId_int;
		this.updatePreloadId_int;
		
		this.controllerHeight = parent.data.controllerHeight;
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
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.hasTransform3d_bl = false;
			self.hasTransform2d_bl = false;
			self.setBackfaceVisibility();
			parent.videoHolder_do.addChild(self);
			self.resizeAndPosition();
			self.setupVideo();
		};
	
		//###############################################//
		/* Setup youtube video */
		//##############################################//
		this.setupVideo = function(){
			if(self.ytb) return;
			
			self.videoHolder_do = new FWDUVPDisplayObject("div");
			self.videoHolder_do.hasTransform3d_bl = false;
			self.videoHolder_do.hasTransform2d_bl = false;
			self.videoHolder_do.screen.setAttribute("id", parent.instanceName_str + "youtube");
			self.videoHolder_do.getStyle().width = "100%";
			self.videoHolder_do.getStyle().height = "100%";
			self.videoHolder_do.setBackfaceVisibility();
			self.addChild(self.videoHolder_do);
			
			self.ytb = new YT.Player(parent.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0
			  	},
			  	events: {
			  		"onReady":self.playerReadyHandler,
			  		"onError":self.playerErrorHandler,
			  		"onStateChange":self.stateChangeHandler,
			  		"onPlaybackQualityChange":self.qualityChangeHandler
			  	}
		    });
		};
		
		this.playerReadyHandler = function(){
			self.resizeAndPosition();
			self.dispatchEvent(FWDUVPYoutubeScreen.READY);
			self.hasBeenCreatedOnce_bl = true;
		};
		
		this.stateChangeHandler = function(e){
			//logger.log(e.data + " " + parent.instanceName_str + " " + self.isCued_bl)
			if(e.data == -1 && self.isCued_bl && self.isMobile_bl){
				self.isStopped_bl = false;
				FWDUVPlayer.stopAllVideos(parent);
			}
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!self.isSafeToBeControlled_bl){
					self.isStopped_bl = false;
					self.isSafeToBeControlled_bl = true;
					self.isPlaying_bl = true;
					self.hasHours_bl = Math.floor(self.ytb.getDuration() / (60 * 60)) > 0;
					self.setVolume(self.volume);
					self.startToUpdate();
					self.startToPreload();
					self.scrub(0.00001);
					if(!self.isMobile_bl) self.setQuality(self.lastQuality_str);
					
					if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
						self.dispatchEvent(FWDUVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality(), levels:self.ytb.getAvailableQualityLevels()});
					}
				    self.dispatchEvent(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				if(self.isPausedInEvent_bl) self.dispatchEvent(FWDUVPYoutubeScreen.PLAY);
				self.isPausedInEvent_bl = false;
				self.hasError_bl = false;
				
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!self.isSafeToBeControlled_bl) return;
				self.isStopped_bl = false;
				if(!self.isPausedInEvent_bl) self.dispatchEvent(FWDUVPYoutubeScreen.PAUSE);
				self.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(self.ytb.getCurrentTime() && self.ytb.getCurrentTime() > 0){
					self.isStopped_bl = false;
					setTimeout(function(){self.dispatchEvent(FWDUVPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!self.isStopped_bl){
					self.dispatchEvent(FWDUVPYoutubeScreen.CUED);
				}
				self.isCued_bl = true;
			}
		};
		
		this.qualityChangeHandler = function(e){
			if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
				self.dispatchEvent(FWDUVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality()});
			}
		};
		
		this.playerErrorHandler = function(e){
			self.isPausedInEvent_bl = true;
			if(self.isStopped_bl || self.hasError_bl) return;
			var error_str = "";
			self.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			self.dispatchEvent(FWDUVPYoutubeScreen.ERROR, {text:error_str});
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(){
			self.setWidth(parent.tempVidStageWidth);
			if(FWDUVPUtils.isIphone){	
				self.setHeight(parent.tempVidStageHeight - self.controllerHeight);
			}else{
				self.setHeight(parent.tempVidStageHeight);
			}
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			if(sourcePath) self.sourcePath_str = sourcePath;
			self.ytb.cueVideoById(self.sourcePath_str);
			//self.isStopped_bl = false;
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			
			FWDUVPlayer.curInstance = parent;
			self.isPlaying_bl = true;
			self.hasError_bl = false;
			try{
				self.ytb.playVideo();
				self.startToUpdate();
			}catch(e){}
			self.isStopped_bl = false;
		};

		this.pause = function(){
			if(self.isStopped_bl || self.hasError_bl) return;
			self.isPlaying_bl = false;
			try{
				self.ytb.pauseVideo();
			}catch(e){}
			self.stopToUpdate();
		};
		
		this.togglePlayPause = function(){
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		//###########################################//
		/* Updates ... */
		//###########################################//
		this.startToUpdate = function(){
			clearInterval(self.updateVideoId_int);
			self.updateVideoId_int = setInterval(self.updateVideo, 500);
		};
		
		this.stopToUpdate = function(){
			clearInterval(self.updateVideoId_int);
		};
		
		this.updateVideo = function(){
			var percentPlayed; 
			if(!self.ytb){
				stopToUpdate();
				return;
			}
			if (!self.allowScrubing_bl) {
				percentPlayed = self.ytb.getCurrentTime() /self.ytb.getDuration();
				self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.ytb.getDuration());
			var curTime = self.formatTime(self.ytb.getCurrentTime());
			
			self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:parseInt(self.ytb.getCurrentTime())});
		};
		
		this.startToPreload = function(){
			clearInterval(self.preloadVideoId_int);
			self.updatePreloadId_int = setInterval(self.updateProgress, 500);
		};
		
		this.stopToPreload = function(){
			clearInterval(self.updatePreloadId_int);
		};
		
		this.updateProgress = function(){
			if(!self.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = self.ytb.getVideoLoadedFraction();
			
			self.dispatchEvent(FWDUVPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//###########################################//
		/* Event handlers */
		//###########################################//	
		this.stop = function(){
			if(self.isStopped_bl) return;
			//if(logger) logger.log("# YTB stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.isCued_bl = false;
			self.allowScrubing_bl = false;
			self.isSafeToBeControlled_bl = false;
			self.isQualityArrayDisapatched_bl = false;
			self.isPausedInEvent_bl = true;
			self.stopToUpdate();
			self.stopToPreload();
			self.stopVideo();
			self.dispatchEvent(FWDUVPYoutubeScreen.STOP);
			self.dispatchEvent(FWDUVPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		this.destroyYoutube = function(){
			if(self.videoHolder_do){
				self.videoHolder_do.screen.removeAttribute("id", parent.instanceName_str + "youtube");
				self.videoHolder_do.destroy();
				self.videoHolder_do = null;
			}
			if(self.ytb) self.ytb.destroy();
			self.ytb = null;
		};
		
		this.stopVideo = function(){
			if(!self.isMobile_bl) self.ytb.cueVideoById(self.sourcePath_str);
			//self.ytb.seekTo(0);
			//self.ytb.clearVideo();
			//self.ytb.stopVideo();
		};

		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent){
			if(!self.isSafeToBeControlled_bl) return;
			self.ytb.seekTo(percent * self.ytb.getDuration());
		};
	
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.ytb) self.ytb.setVolume(vol * 100);
		};
		
		//###############################################//
		/* set quality */
		//###############################################//
		this.setQuality = function(quality){
			self.lastQuality_str = quality;
			self.ytb.setPlaybackQuality(quality);
		};
		
		this.formatTime = function(secs){
			var hours = Math.floor(secs / (60 * 60));
			
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    
		    if(isNaN(seconds)) return "00:00";
			if(self.hasHours_bl){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};
		
	
		this.init();
	};

	/* set prototype */
	FWDUVPYoutubeScreen.setPrototype = function(){
		FWDUVPYoutubeScreen.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPYoutubeScreen.READY = "ready";
	FWDUVPYoutubeScreen.ERROR = "error";
	FWDUVPYoutubeScreen.UPDATE = "update";
	FWDUVPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDUVPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDUVPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDUVPYoutubeScreen.PLAY = "play";
	FWDUVPYoutubeScreen.PAUSE = "pause";
	FWDUVPYoutubeScreen.STOP = "stop";
	FWDUVPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDUVPYoutubeScreen.CUED = "cued";
	FWDUVPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDUVPYoutubeScreen = FWDUVPYoutubeScreen;

}(window));/* FWDUVPYTBQButton */
(function (){
var FWDUVPYTBQButton = function(
			label,
			normalColor,
			selectedColor,
			hdPath
		){
		
		var self = this;
		var prototype = FWDUVPYTBQButton.prototype;
		
		this.text_do = null;
		this.hd_do = null;
		this.dumy_do = null;
		
		this.label_str = label;
		this.normalColor_str = normalColor;
		this.selectedColor_str = selectedColor;
		this.hdPath_str = hdPath;
		
		this.totalWidth = 0;
		this.totalHeight = 23;
		this.hdWidth = 7;
		this.hdHeight = 5;

		this.hasHd_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.isDisabled_bl = false;

		
		//##########################################//
		/* initialize self */
		//##########################################//
		this.init = function(){
			if(self.label_str == "highres" || self.label_str == "hd1080" || self.label_str == "hd720"){
				self.hasHd_bl = true;
			};
			
			self.setBackfaceVisibility();
			self.setupMainContainers();
			
			self.setHeight(self.totalHeight);
			//self.setBkColor("#FF0000");
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function(){
			self.text_do = new FWDUVPDisplayObject("div");
			self.text_do.setBackfaceVisibility();
			self.text_do.hasTransform3d_bl = false;
			self.text_do.hasTransform2d_bl = false;
			self.text_do.getStyle.whiteSpace = "nowrap";
			self.text_do.getStyle().fontFamily = "Arial";
			self.text_do.getStyle().fontSize= "12px";
			self.text_do.getStyle().color = self.normalColor_str;
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";	
			self.text_do.setInnerHTML(self.label_str);
			self.addChild(self.text_do);
			
			if(self.hasHd_bl){
				var img = new Image();
				img.src = self.hdPath_str;
				self.hd_do = new FWDUVPDisplayObject("img");
				self.hd_do.setScreen(img);
				self.hd_do.setWidth(self.hdWidth);
				self.hd_do.setHeight(self.hdHeight);
				self.addChild(self.hd_do);
			}
				
			self.dumy_do = new FWDUVPDisplayObject("div");
			if(FWDUVPUtils.isIE){
				self.dumy_do.setBkColor("#FF0000");
				self.dumy_do.setAlpha(0.0001);
			};
			
			self.dumy_do.setButtonMode(true);
			self.dumy_do.setHeight(self.totalHeight);
			self.addChild(self.dumy_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.dumy_do.screen.addEventListener("MSPointerUp", self.onMouseUp);
					self.dumy_do.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.dumy_do.screen.addEventListener("MSPointerOut", self.onMouseOut);
				}else{
					self.dumy_do.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.dumy_do.screen.addEventListener){	
				self.dumy_do.screen.addEventListener("mouseover", self.onMouseOver);
				self.dumy_do.screen.addEventListener("mouseout", self.onMouseOut);
				self.dumy_do.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.dumy_do.screen.attachEvent){
				self.dumy_do.screen.attachEvent("onmouseover", self.onMouseOver);
				self.dumy_do.screen.attachEvent("onmouseout", self.onMouseOut);
				self.dumy_do.screen.attachEvent("onmouseup", self.onMouseUp);
			}
		};
		
		this.onMouseOver = function(e){
			if(self.isDisabled_bl) return;
			self.setSelectedState(true);
			self.dispatchEvent(FWDUVPYTBQButton.MOUSE_OVER, {e:e});
		};
			
		this.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			self.seNormalState(true);
			self.dispatchEvent(FWDUVPYTBQButton.MOUSE_OUT, {e:e});
		};
		
		this.onMouseUp = function(e){
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDUVPYTBQButton.CLICK, {e:e});
		};
	
		//###############################//
		/* set final size */
		//###############################//
		this.setFinalSize = function(){
			if(self.text_do.x != 0) return;
			var width = self.text_do.screen.getBoundingClientRect().width;
			if(width < 4 && width != undefined){
				width = parseInt(width * 100) + 34;
			}else{
				width = self.text_do.screen.offsetWidth + 34;
			}
			
			var height = self.text_do.getHeight();
		
			self.text_do.setX(18);
			self.text_do.setY(parseInt((self.totalHeight - height)/2));
			
			if(self.hd_do){
				self.hd_do.setX(width - 12);
				self.hd_do.setY(self.text_do.y + 1);
			}
			
			self.dumy_do.setWidth(width);
			self.setWidth(width);
		};
		
		//################################//
		/* Set states */
		//###############################//
		this.setSelectedState = function(animate){
			FWDUVPTweenMax.killTweensOf(self.text_do);
			if(animate){
				FWDUVPTweenMax.to(self.text_do.screen, .5, {css:{color:self.selectedColor_str}, ease:Expo.easeOut});
			}else{
				self.text_do.getStyle().color = self.selectedColor_str;
			}
		};
		
		this.seNormalState = function(animate){
			FWDUVPTweenMax.killTweensOf(self.text_do);
			if(animate){
				FWDUVPTweenMax.to(self.text_do.screen, .5, {css:{color:self.normalColor_str}, ease:Expo.easeOut});
			}else{
				self.text_do.getStyle().color = self.normalColor_str;
			}
		};
		
		//##############################//
		/* disable /enable button */
		//##############################//
		this.disable = function(){
			self.isDisabled_bl = true;
			FWDUVPTweenMax.killTweensOf(self.text_do);
			self.setSelectedState(true);
			self.dumy_do.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			FWDUVPTweenMax.killTweensOf(self.text_do);
			self.seNormalState(true);
			self.dumy_do.setButtonMode(true);
		};
		

		self.init();
	};
	
	/* set prototype */
	FWDUVPYTBQButton.setPrototype = function(){
		FWDUVPYTBQButton.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPYTBQButton.MOUSE_OVER = "onMouseOver";
	FWDUVPYTBQButton.MOUSE_OUT = "onMouseOut";
	FWDUVPYTBQButton.CLICK = "onClick";
	
	FWDUVPYTBQButton.prototype = null;
	window.FWDUVPYTBQButton = FWDUVPYTBQButton;
}(window));