/* FWDUVPFlashButton */
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
}(window));