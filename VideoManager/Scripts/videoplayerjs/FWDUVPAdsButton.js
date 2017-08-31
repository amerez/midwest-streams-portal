/* FWDUVPAdsButton */
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
}(window));