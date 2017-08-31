/* Info screen */
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
}(window));