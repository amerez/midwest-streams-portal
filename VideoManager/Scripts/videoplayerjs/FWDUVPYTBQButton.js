/* FWDUVPYTBQButton */
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