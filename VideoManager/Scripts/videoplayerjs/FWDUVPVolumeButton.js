/* FWDUVPVolumeButton */
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
}(window));