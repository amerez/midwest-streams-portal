/* Main */
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
	
}(window));