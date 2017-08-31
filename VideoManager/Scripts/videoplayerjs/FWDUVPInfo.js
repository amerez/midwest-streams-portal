/* Info screen */
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
}(window));