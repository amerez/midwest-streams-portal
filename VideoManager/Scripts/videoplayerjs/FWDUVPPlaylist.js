/* Thumb */
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
}(window));