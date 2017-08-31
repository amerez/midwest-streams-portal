/* FWDUVPPlaylistThumb */
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
}(window));