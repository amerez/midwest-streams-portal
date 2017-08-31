/* FWDUVPPlaylistToolTip */
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
}(window));