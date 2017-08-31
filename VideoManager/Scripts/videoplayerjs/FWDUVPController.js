/* FWDUVPController */
(function(){
var FWDUVPController = function(
			data,
			parent
		){
	
		var self = this;
		var prototype = FWDUVPController.prototype;
		
		this.bkLeft_img = data.bkLeft_img;
		this.bkRight_img = data.bkRight_img;
		this.playN_img = data.playN_img;
		this.pauseN_img = data.pauseN_img;
		this.mainScrubberBkLeft_img = data.mainScrubberBkLeft_img;
		this.mainScrubberDragLeft_img = data.mainScrubberDragLeft_img;
		this.mainScrubberLine_img = data.mainScrubberLine_img;
		this.volumeScrubberBkLeft_img = data.volumeScrubberBkLeft_img;
		this.volumeScrubberDragLeft_img = data.volumeScrubberDragLeft_img;
		this.volumeScrubberLine_img = data.volumeScrubberLine_img;
		this.volumeN_img = data.volumeN_img;
		this.progressLeft_img = data.progressLeft_img;
		this.categoriesN_img = data.categoriesN_img;
		
		this.playlistN_img = data.playlistN_img;
		
		this.ytbQualityN_img = data.ytbQualityN_img;
		this.infoN_img = data.infoN_img;
		this.downloadN_img = data.downloadN_img;
		this.facebookN_img = data.facebookN_img;
		this.fullScreenN_img = data.fullScreenN_img;
		this.normalScreenN_img = data.normalScreenN_img;
		this.hidePlaylistN_img = data.hidePlaylistN_img;
		this.showPlaylistN_img = data.showPlaylistN_img;
		this.embedN_img = data.embedN_img;
	
		this.buttons_ar = [];
		this.ytbQuality_ar = null;
		this.ytbButtons_ar = null;
		
		this.prevButton_do = null;
		this.nextButton_do = null;
		this.pointer_do;
		this.ytbDisabledButton_do = null;
		this.disable_do = null;
		this.mainHolder_do = null;
		this.ytbButtonsHolder_do = null;
		this.playPauseButton_do = null;
		this.mainScrubber_do = null;
		this.mainScrubberBkLeft_do = null;
		this.mainScrubberBkMiddle_do = null;
		this.mainScrubberBkRight_do = null;
		this.mainScrubberDrag_do = null;
		this.mainScrubberDragLeft_do = null;
		this.mainScrubberDragMiddle_do = null;
		this.mainScrubberBarLine_do = null;
		this.mainProgress_do = null;
		this.progressLeft_do = null;
		this.progressMiddle_do = null;
		this.time_do = null;
		this.volumeButton_do = null;
		this.volumeScrubber_do = null;
		this.volumeScrubberBkBottom_do = null;
		this.volumeScrubberBkMiddle_do = null;
		this.volumeScrubberBkTop_do = null;
		this.volumeScrubberDrag_do = null;
		this.volumeScrubberDragBottom_do = null;
		this.volumeScrubberDragMiddle_do = null;
		this.volumeScrubberBarLine_do = null;
		this.ytbQualityButton_do = null;
		this.facebookButton_do = null;
		this.fullScreenButton_do = null;
		this.ytbQualityArrow_do = null;
		this.bk_do = null;
		this.playlistButton_do = null;
		this.embedButton_do = null;
	
		this.playPauseToolTip_do = null;
		this.playlistsButtonToolTip_do = null;
		this.volumeButtonToolTip_do = null;
		this.playlistsButtonToolTip_do = null;
		this.playlistButtonToolTip_do = null;
		this.embedButtonToolTip_do = null;
		this.infoButtonToolTip_do = null;
		this.downloadButtonToolTip_do = null;
		this.facebookButtonToolTip_do = null;
		this.fullscreenButtonToolTip_do = null;
		
		this.bkMiddlePath_str = data.bkMiddlePath_str;
		this.mainScrubberBkMiddlePath_str = data.mainScrubberBkMiddlePath_str;
		this.volumeScrubberBkMiddlePath_str = data.volumeScrubberBkMiddlePath_str;
		this.mainScrubberDragMiddlePath_str = data.mainScrubberDragMiddlePath_str;
		this.volumeScrubberDragMiddlePath_str = data.volumeScrubberDragMiddlePath_str;
		this.timeColor_str = data.timeColor_str;
		this.progressMiddlePath_str = data.progressMiddlePath_str;
		this.youtubeQualityButtonNormalColor_str = data.youtubeQualityButtonNormalColor_str;
		this.youtubeQualityButtonSelectedColor_str = data.youtubeQualityButtonSelectedColor_str;
		this.youtubeQualityArrowPath_str = data.youtubeQualityArrowPath_str;
		this.controllerBkPath_str = data.controllerBkPath_str;
		this.ytbQualityButtonPointerPath_str = data.ytbQualityButtonPointerPath_str;
		this.buttonsToolTipFontColor_str = data.buttonsToolTipFontColor_str;
		
		this.buttonsToolTipHideDelay = data.buttonsToolTipHideDelay;
		this.totalYtbButtons = 0;
		this.stageWidth = 0;
		this.stageHeight = data.controllerHeight;
		this.scrubbersBkLeftAndRightWidth = this.mainScrubberBkLeft_img.width;
		this.mainScrubberWidth = 0;
		this.mainScrubberMinWidth = 100;
		this.volumeScrubberOfsetHeight = data.volumeScrubberOfsetHeight;
		this.volumeScrubberHeight = data.volumeScrubberHeight + self.volumeScrubberOfsetHeight;
		this.volumeScrubberWidth = self.mainScrubberBkLeft_img.height;
		this.mainScrubberHeight = this.mainScrubberBkLeft_img.height;
		this.mainScrubberDragLeftWidth = self.mainScrubberDragLeft_img.width;
		this.scrubbersOffsetWidth = data.scrubbersOffsetWidth;
		this.volume = data.volume;
		this.lastVolume = self.volume;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.spaceBetweenButtons = data.spaceBetweenButtons;
		this.percentPlayed = 0;
		this.percentLoaded = 0;
		this.lastTimeLength = 0;
		this.prevYtbQualityButtonsLength = 0;
		this.pointerWidth = 8;
		this.pointerHeight = 5;
		this.timeOffsetLeftWidth = data.timeOffsetLeftWidth;
		this.timeOffsetRightWidth = data.timeOffsetRightWidth;
		this.timeOffsetTop = data.timeOffsetTop;
		this.mainScrubberOffestTop = data.mainScrubberOffestTop;
		
		this.isVolumeScrubberShowed_bl = true;
		this.volumeScrubberIsDragging_bl = false;
		this.showButtonsToolTip_bl = data.showButtonsToolTip_bl;
		this.showPlaylistsButtonAndPlaylists_bl = data.showPlaylistsButtonAndPlaylists_bl;
		this.showPlaylistButtonAndPlaylist_bl = data.showPlaylistButtonAndPlaylist_bl;
		this.showEmbedButton_bl = data.showEmbedButton_bl;
		this.showPlaylistByDefault_bl = data.showPlaylistByDefault_bl;
		this.showShuffleButton_bl = data.showShuffleButton_bl;
		this.showLoopButton_bl = data.showLoopButton_bl;
		
		this.showNP_bl = parent.data.showNextAndPrevButtonsInController_bl;
		if(parent.isEmbedded_bl) parent.data.showNextAndPrevButtonsInController_bl = true;
		this.showNextAndPrevButtonsInController_bl = data.showNextAndPrevButtonsInController_bl;
		this.showFullScreenButton_bl = data.showFullScreenButton_bl;
		this.showYoutubeQualityButton_bl = data.showYoutubeQualityButton_bl;
		this.showFacebookButton_bl = data.showFacebookButton_bl;
		this.showInfoButton_bl = data.showInfoButton_bl;
		this.showDownloadVideoButton_bl = data.showDownloadVideoButton_bl;
		this.showVolumeScrubber_bl = data.showVolumeScrubber_bl;
		this.allowToChangeVolume_bl = data.allowToChangeVolume_bl;
		this.showTime_bl = data.showTime_bl;
		this.showVolumeButton_bl = data.showVolumeButton_bl;
		this.showControllerWhenVideoIsStopped_bl = data.showControllerWhenVideoIsStopped_bl;
		this.isMainScrubberScrubbing_bl = false;
		this.isMainScrubberDisabled_bl = false;
		this.isVolumeScrubberDisabled_bl = false;
		this.isMainScrubberLineVisible_bl = false;
		this.isVolumeScrubberLineVisible_bl = false;
		this.hasYtbButton_bl = false;
		this.isMute_bl = false;
		this.isShowed_bl = true;
		this.forceToShowMainScrubberOverCotroller_bl = false;
		this.isMainScrubberOnTop_bl = false;
		this.showNextAndPrevButtons_bl = data.showNextAndPrevButtons_bl;
		this.isPlaylistShowed_bl = data.isPlaylistShowed_bl;
		this.areYtbQualityButtonsShowed_bl = true;
		this.repeatBackground_bl = data.repeatBackground_bl;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDUVPDisplayObject("div");
			if(self.repeatBackground_bl){
				self.mainHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.bk_do = new FWDUVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.bk_do.setScreen(img);
				self.mainHolder_do.addChild(self.bk_do);
			}
			
			self.mainHolder_do.setOverflow("visible");
			self.mainHolder_do.getStyle().zIndex = 1;
		
			self.addChild(self.mainHolder_do);
			
			if(self.showYoutubeQualityButton_bl){
				self.ytbQuality_ar = ["highres", "hd1080", "hd720", "large", "medium", "small", "tiny"];
				self.ytbButtons_ar = [];
				self.totalYtbButtons = self.ytbQuality_ar.length;
				self.setupYtbButtons();
			}
			
			if(self.showNextAndPrevButtonsInController_bl) self.setupPrevButton();
			self.setupPlayPauseButton();
			if(self.showNextAndPrevButtonsInController_bl) self.setupNextButton();
			self.setupMainScrubber();
			if(self.showTime_bl) self.setupTime();
			
			if(self.showVolumeButton_bl) self.setupVolumeButton();
			
			if(self.showPlaylistsButtonAndPlaylists_bl) self.setupCategoriesButton();
			if(self.showPlaylistButtonAndPlaylist_bl) self.setupPlaylistButton();
			if(self.showYoutubeQualityButton_bl) self.setupYoutubeQualityButton();
			if(self.showInfoButton_bl) self.setupInfoButton();
			if(self.showDownloadVideoButton_bl) self.setupDownloadButton();
			if(self.showEmbedButton_bl) self.setupEmbedButton();
			if(self.showFacebookButton_bl) self.setupFacebookButton();
			if(self.showFullScreenButton_bl) self.setupFullscreenButton();
			if(self.showButtonsToolTip_bl) self.setupToolTips();
			
			
			if(self.showVolumeScrubber_bl){
				self.setupVolumeScrubber();
				self.hideVolumeScrubber();
			}
			self.hide(false);
			//if(self.showControllerWhenVideoIsStopped_bl) self.show(true);
		};
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.tempVidStageWidth;
			self.positionButtons();
			self.setY(parent.tempVidStageHeight - self.stageHeight);
			self.hideQualityButtons(false);
			if(self.ytbButtonsHolder_do){
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(parent.tempStageHeight);
			}
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			if(!self.stageWidth) return;
			var button;
			var prevButton;
			var totalButtons = 0;
			var totalButtonsWidth = 0;
			var spaceBetweenButtons = 0;
			var hasTime_bl = self.showTime_bl;
			
			if(self.showDownloadVideoButton_bl){
				if(data.playlist_ar[parent.id].downloadable){
					if(FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do) == -1){
						if(self.fullScreenButton_do){
							if(self.embedButton_do && self.facebookButton_do){
								self.buttons_ar.splice(self.buttons_ar.length - 3,0, self.downloadButton_do);
							}else{
								self.buttons_ar.splice(self.buttons_ar.length - 2,0, self.downloadButton_do);
							}
						}else if(self.facebookButton_do){
							if(self.embedButton_do){
								self.buttons_ar.splice(self.buttons_ar.length - 2,0, self.downloadButton_do);
							}else{
								self.buttons_ar.splice(self.buttons_ar.length - 1,0, self.downloadButton_do);
							}
						}else if(self.embedButton_do){
							self.buttons_ar.splice(self.buttons_ar.length - 1,0, self.downloadButton_do);
						}else{
							self.buttons_ar.splice(self.buttons_ar.length,0, self.downloadButton_do);
						}
						self.downloadButton_do.setVisible(true);
					}
				}else{
					var downloadButtonIndex = FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do);
					if(downloadButtonIndex != -1){
						self.buttons_ar.splice(downloadButtonIndex,1);
						self.downloadButton_do.setVisible(false);
					}
				}
			};
			
			if(self.showInfoButton_bl){
				var indexToAdd;
				if(data.playlist_ar[parent.id].desc){
					if(FWDUVPUtils.indexOfArray(self.buttons_ar, self.infoButton_do) == -1){
						indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.downloadButton_do);
						if(self.downloadButton_do && downloadButtonIndex != -1){
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.embedButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.facebookButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.fullScreenButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else if(self.fullScreenButton_do){
							indexToAdd = FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do);
							self.buttons_ar.splice(indexToAdd, 0, self.infoButton_do);
						}else{
							self.buttons_ar.splice(self.buttons_ar.length,0, self.infoButton_do);
						}
					}
					self.infoButton_do.setVisible(true);
				}else{
					var infoButtonIndex = FWDUVPUtils.indexOfArray(self.buttons_ar, self.infoButton_do);
					if(infoButtonIndex != -1){
						self.buttons_ar.splice(infoButtonIndex,1);
						self.infoButton_do.setVisible(false);
					}
				}
			};
			
			
			var buttonsCopy_ar = [];
			for (var i=0; i < self.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = self.buttons_ar[i];
			}
			
			if(parent.tempPlaylistPosition_str == "right" 
				&& self.showNextAndPrevButtonsInController_bl
				&& !self.showNP_bl){
				if(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.nextButton_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.nextButton_do), 1);
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.prevButton_do), 1);
					self.nextButton_do.setX(-1000);
					self.prevButton_do.setX(-1000);
				}
			}
			
			self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != self.mainScrubber_do){
					self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
				}
			};
		
			if(self.mainScrubberWidth <= 120){
				if(self.mainScrubber_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do), 1);
					self.positionScrollBarOnTopOfTheController();
				}
				
				if(self.time_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
					buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
					self.time_do.setX(-1000);
				}
				
				totalButtons = buttonsCopy_ar.length;
				for(var i=0; i<totalButtons; i++){
					totalButtonsWidth += buttonsCopy_ar[i].w;
				}
			
				spaceBetweenButtons = parseInt((self.stageWidth - totalButtonsWidth - self.startSpaceBetweenButtons * 2)/(totalButtons - 1));
				var leftWidth = parseInt((self.stageWidth - totalButtonsWidth - ((totalButtons - 1) * spaceBetweenButtons))/2);
				
				for (var i=0; i < totalButtons; i++) {
					button = buttonsCopy_ar[i];
					if(i == 0){
						button.setX(leftWidth);
					}else{
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + spaceBetweenButtons);	
					}
				}
			}else{
				while(self.mainScrubberWidth < self.mainScrubberMinWidth){
					self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
					if(self.time_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
						self.time_do.setX(-1000);
						hasTime_bl = false;
					}else if(self.facebookButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.facebookButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.facebookButton_do), 1);
						self.facebookButton_do.setX(-1000);
					}else if(self.downloadButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.downloadButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.downloadButton_do), 1);
						self.downloadButton_do.setX(-1000);
					}else if(self.embedButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.embedButton_do), 1);
						self.embedButton_do.setX(-1000);
					}else if(self.volumeButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do), 1);
						self.volumeButton_do.setX(-1000);
					}else if(self.ytbQualityButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.ytbQualityButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.ytbQualityButton_do), 1);
						self.ytbQualityButton_do.setX(-1000);
					}else if(self.playlistButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.playlistButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.playlistButton_do), 1);
						self.playlistButton_do.setX(-1000);
					}else if(self.infoButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.infoButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.infoButton_do), 1);
						self.infoButton_do.setX(-1000);
					}else if(self.categoriesButton_do && FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.categoriesButton_do) != -1){
						buttonsCopy_ar.splice(FWDUVPUtils.indexOfArray(buttonsCopy_ar, self.categoriesButton_do), 1);
						self.categoriesButton_do.setX(-1000);
					}
							
					totalButtons = buttonsCopy_ar.length;
					for (var i=0; i < totalButtons; i++) {
						button = buttonsCopy_ar[i];
						if(button != self.mainScrubber_do){
							self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
						}
					};
				};
				
				if(self.showNextAndPrevButtonsInController_bl
					&& self.mainScrubberWidth > 120){
					//self.mainScrubberWidth += self.nextButton_do.w + self.spaceBetweenButtons;
					//self.mainScrubberWidth += self.prevButton_do.w + self.spaceBetweenButtons;				
				}
				
				if(hasTime_bl) self.mainScrubberWidth -= self.timeOffsetLeftWidth * 2;
				totalButtons = buttonsCopy_ar.length;
				
				for (var i=0; i < totalButtons; i++) {
					button = buttonsCopy_ar[i];
					
					if(i == 0){
						button.setX(self.startSpaceBetweenButtons);
					}else if(button == self.mainScrubber_do){
						prevButton = buttonsCopy_ar[i - 1];
						FWDUVPTweenMax.killTweensOf(self.mainScrubber_do);
						self.mainScrubber_do.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
						self.mainScrubber_do.setY(parseInt((self.stageHeight - self.mainScrubberHeight)/2));
						self.mainScrubber_do.setWidth(self.mainScrubberWidth);
						self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
						self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
						self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
					}else if(button == self.time_do){
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetLeftWidth);
					}else if(button == self.volumeButton_do && hasTime_bl){
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons + self.timeOffsetRightWidth);
					}else{
						prevButton = buttonsCopy_ar[i - 1];
						button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
					}
				}
				
				if(self.isShowed_bl){
					self.isMainScrubberOnTop_bl = false;
				}else{
					self.isMainScrubberOnTop_bl = true;
					self.positionScrollBarOnTopOfTheController();
				}
			}
		
			if(self.bk_do){
				self.bk_do.setWidth(self.stageWidth);
				self.bk_do.setHeight(self.stageHeight);
			}
			
			if(self.progressMiddle_do) self.progressMiddle_do.setWidth(Math.max(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth, 0));
			self.updateMainScrubber(self.percentPlayed);
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
		};
		
		this.positionScrollBarOnTopOfTheController = function(){
			//if(self.mainScrubber_do.x == 0) return;
			
			self.mainScrubberWidth = self.stageWidth;
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainScrubber_do.setWidth(self.mainScrubberWidth);
			self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			FWDUVPTweenMax.killTweensOf(self.mainScrubber_do);
			self.mainScrubber_do.setX(0);
			self.mainScrubber_do.setAlpha(1);
			if(self.isMainScrubberOnTop_bl || self.isShowed_bl){
				self.mainScrubber_do.setY(- self.mainScrubberOffestTop);
			}else{
				self.mainScrubber_do.setY(self.mainScrubber_do.h);
				FWDUVPTweenMax.to(self.mainScrubber_do, .8, {y:- self.mainScrubberOffestTop, ease:Expo.easeOut});
			}
			self.isMainScrubberOnTop_bl = true;
		};
	
			
		//################################//
		/* Setup tooltips */
		//################################//		
		this.setupToolTips = function(){
			FWDUVPToolTip.setPrototype();
			self.playPauseToolTip_do = new FWDUVPToolTip(self.playPauseButton_do, data.toopTipBk_str, data.toopTipPointer_str, "play / pause", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
			document.documentElement.appendChild(self.playPauseToolTip_do.screen);
			
			if(self.showControllerWhenVideoIsStopped_bl){
				FWDUVPToolTip.setPrototype();
				self.prevButtonToolTip_do = new FWDUVPToolTip(self.prevButton_do, data.toopTipBk_str, data.toopTipPointer_str, "previous video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.prevButtonToolTip_do.screen);
				
				FWDUVPToolTip.setPrototype();
				self.nextButtonToolTip_do = new FWDUVPToolTip(self.nextButton_do, data.toopTipBk_str, data.toopTipPointer_str, "next video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.nextButtonToolTip_do.screen);
			}
			
			if(self.showPlaylistsButtonAndPlaylists_bl){
				FWDUVPToolTip.setPrototype();
				self.playlistsButtonToolTip_do = new FWDUVPToolTip(self.categoriesButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show playlists", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.playlistsButtonToolTip_do.screen);
			}
			
			if(self.showPlaylistButtonAndPlaylist_bl){
				FWDUVPToolTip.setPrototype();
				self.playlistButtonToolTip_do = new FWDUVPToolTip(self.playlistButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show / hide playlist", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.playlistButtonToolTip_do.screen);
			}
			
			if(self.showEmbedButton_bl){
				FWDUVPToolTip.setPrototype();
				self.embedButtonToolTip_do = new FWDUVPToolTip(self.embedButton_do, data.toopTipBk_str, data.toopTipPointer_str, "show embed window", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.embedButtonToolTip_do.screen);
			}
			
			//FWDUVPToolTip.setPrototype();
			//self.volumeButtonToolTip_do = new FWDUVPToolTip(self.volumeButton_do, data.toopTipBk_str, data.toopTipPointer_str, "mute / unmute", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
			//document.documentElement.appendChild(self.volumeButtonToolTip_do.screen);
			
			if(self.showFacebookButton_bl){
				FWDUVPToolTip.setPrototype();
				self.facebookButtonToolTip_do = new FWDUVPToolTip(self.facebookButton_do, data.toopTipBk_str, data.toopTipPointer_str, "share on facebook", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.facebookButtonToolTip_do.screen);
			}
			
			
			if(self.showInfoButton_bl){
				FWDUVPToolTip.setPrototype();
				self.infoButtonToolTip_do = new FWDUVPToolTip(self.infoButton_do, data.toopTipBk_str, data.toopTipPointer_str, "more info", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.infoButtonToolTip_do.screen);
			}
			
			if(self.showDownloadVideoButton_bl){
				FWDUVPToolTip.setPrototype();
				self.downloadButtonToolTip_do = new FWDUVPToolTip(self.downloadButton_do, data.toopTipBk_str, data.toopTipPointer_str, "download video", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.downloadButtonToolTip_do.screen);
			}
			
			if(self.fullScreenButton_do){
				FWDUVPToolTip.setPrototype();
				self.fullscreenButtonToolTip_do = new FWDUVPToolTip(self.fullScreenButton_do, data.toopTipBk_str, data.toopTipPointer_str, "fullscreen / normalscreen", self.buttonsToolTipFontColor_str, self.buttonsToolTipHideDelay);
				document.documentElement.appendChild(self.fullscreenButtonToolTip_do.screen);
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
		
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){
			//setup background bar
			self.mainScrubber_do = new FWDUVPDisplayObject("div");
			self.mainScrubber_do.setY(parseInt((self.stageHeight - self.mainScrubberHeight)/2));
			self.mainScrubber_do.setHeight(self.mainScrubberHeight);
			
			self.mainScrubberBkLeft_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBkLeft_do.setScreen(self.mainScrubberBkLeft_img);
			
			var rightImage = new Image();
			rightImage.src = data.mainScrubberBkRightPath_str;
			self.mainScrubberBkRight_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBkRight_do.setScreen(rightImage);
			self.mainScrubberBkRight_do.setWidth(self.mainScrubberBkLeft_do.w);
			self.mainScrubberBkRight_do.setHeight(self.mainScrubberBkLeft_do.h);
		
			var middleImage = new Image();
			middleImage.src = self.mainScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("div");	
				self.mainScrubberBkMiddle_do.getStyle().background = "url('" + self.mainScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
				self.mainScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.mainScrubberBkMiddle_do.setHeight(self.mainScrubberHeight);
			self.mainScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			self.mainProgress_do = new FWDUVPDisplayObject("div");
			self.mainProgress_do.setHeight(self.mainScrubberHeight);
		
			self.progressLeft_do = new FWDUVPDisplayObject("img");
			self.progressLeft_do.setScreen(self.progress);
			
			middleImage = new Image();
			middleImage.src = self.progressMiddlePath_str;
			
			self.progressMiddle_do = new FWDUVPDisplayObject("div");	
			self.progressMiddle_do.getStyle().background = "url('" + self.progressMiddlePath_str + "') repeat-x";
		
			self.progressMiddle_do.setHeight(self.mainScrubberHeight);
			self.progressMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			self.mainScrubberDrag_do = new FWDUVPDisplayObject("div");
			self.mainScrubberDrag_do.setHeight(self.mainScrubberHeight);
		
			self.mainScrubberDragLeft_do = new FWDUVPDisplayObject("img");
			self.mainScrubberDragLeft_do.setScreen(self.mainScrubberDragLeft_img);
			
			middleImage = new Image();
			middleImage.src = self.mainScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("div");	
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
				self.mainScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.mainScrubberDragMiddle_do.setHeight(self.mainScrubberHeight);
			self.mainScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			self.mainScrubberBarLine_do = new FWDUVPDisplayObject("img");
			self.mainScrubberBarLine_do.setScreen(self.mainScrubberLine_img);
			self.mainScrubberBarLine_do.setAlpha(0);
			self.mainScrubberBarLine_do.hasTransform3d_bl = false;
			self.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.buttons_ar.push(self.mainScrubber_do);
			
			//add all children
			self.mainScrubber_do.addChild(self.mainScrubberBkLeft_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkMiddle_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkRight_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragLeft_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragMiddle_do);
			self.mainProgress_do.addChild(self.progressLeft_do);
			self.mainProgress_do.addChild(self.progressMiddle_do);
			self.mainScrubber_do.addChild(self.mainProgress_do);
			self.mainScrubber_do.addChild(self.mainScrubberDrag_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainHolder_do.addChild(self.mainScrubber_do);
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.mainScrubber_do.screen.addEventListener("MSPointerOver", self.mainScrubberOnOverHandler);
					self.mainScrubber_do.screen.addEventListener("MSPointerOut", self.mainScrubberOnOutHandler);
					self.mainScrubber_do.screen.addEventListener("MSPointerDown", self.mainScrubberOnDownHandler);
				}else{
					self.mainScrubber_do.screen.addEventListener("touchstart", self.mainScrubberOnDownHandler);
				}
			}else if(self.screen.addEventListener){	
				self.mainScrubber_do.screen.addEventListener("mouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.addEventListener("mouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.addEventListener("mousedown", self.mainScrubberOnDownHandler);
			}else if(self.screen.attachEvent){
				self.mainScrubber_do.screen.attachEvent("onmouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.attachEvent("onmouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.attachEvent("onmousedown", self.mainScrubberOnDownHandler);
			}
			
			self.disableMainScrubber();
			self.updateMainScrubber(0);
		};
		
		this.mainScrubberOnOverHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnOutHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnDownHandler =  function(e){
			if(self.isMainScrubberDisabled_bl || e.button == 2) return;
			parent.showDisable();
			if(e.preventDefault) e.preventDefault();
			self.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
		
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.mainScrubberWidth;
		
			self.updateMainScrubber(percentScrubbed);
			
			self.dispatchEvent(FWDUVPController.START_TO_SCRUB);
			self.dispatchEvent(FWDUVPController.SCRUB, {percent:percentScrubbed});
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.mainScrubberMoveHandler);
					window.addEventListener("MSPointerUp", self.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.mainScrubberMoveHandler);
					window.addEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.mainScrubberMoveHandler);
					window.addEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.attachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/self.mainScrubberWidth;
			self.updateMainScrubber(percentScrubbed);
			self.dispatchEvent(FWDUVPController.SCRUB, {percent:percentScrubbed});
		};
		
		this.mainScrubberEndHandler = function(e){
			parent.hideDisable();
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				self.mainScrubberMoveHandler(e);
			}
			*/
			self.dispatchEvent(FWDUVPController.STOP_TO_SCRUB);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.mainScrubberMoveHandler);
					window.removeEventListener("MSPointerUp", self.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.mainScrubberMoveHandler);
					window.removeEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.disableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = true;
			self.mainScrubber_do.setButtonMode(false);
			self.mainScrubberEndHandler();
			self.updateMainScrubber(0);
			self.updatePreloaderBar(0);
		};
		
		this.enableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = false;
			self.mainScrubber_do.setButtonMode(true);
		};
		
		this.updateMainScrubber = function(percent){
			if(!self.mainScrubber_do) return;
			var finalWidth = parseInt(percent * self.mainScrubberWidth);
			if(isNaN(finalWidth) || finalWidth == undefined) return;
			if(finalWidth < 0) finalWidth = 0;
			
			self.percentPlayed = percent;
			if(!FWDUVPlayer.hasHTML5Video && finalWidth >= self.mainProgress_do.w) finalWidth = self.mainProgress_do.w;
			
			if(finalWidth < 1 && self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = false;
				FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = true;
				FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .5, {alpha:1});
			}
			
			self.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			FWDUVPTweenMax.to(self.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updatePreloaderBar = function(percent){
			if(!self.mainProgress_do) return;
			self.percentLoaded = percent;
			var finalWidth = parseInt(self.percentLoaded * self.mainScrubberWidth); 
			if(isNaN(finalWidth) || finalWidth == undefined) return;
			if(finalWidth < 0) finalWidth = 0;
			
			if(self.percentLoaded >= 0.98){
				self.percentLoaded = 1;
				self.mainProgress_do.setY(-30);
			}else if(self.mainProgress_do.y != 0 && self.percentLoaded!= 1){
				self.mainProgress_do.setY(0);
			}
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			if(finalWidth < 0) finalWidth = 0;
			self.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup prev button */
		//################################################//
		this.setupPrevButton = function(){
			FWDUVPSimpleSizeButton.setPrototype();
			self.prevButton_do = new FWDUVPSimpleSizeButton(data.prevN_img.src, data.prevSPath_str, data.prevN_img.width, data.prevN_img.height);
			self.prevButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, self.prevButtonShowTooltipHandler);
			self.prevButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.prevButtonOnMouseUpHandler);
			self.prevButton_do.setY(parseInt((self.stageHeight - self.prevButton_do.h)/2));
			self.buttons_ar.push(self.prevButton_do);
			self.mainHolder_do.addChild(self.prevButton_do); 
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
			FWDUVPSimpleSizeButton.setPrototype();
			self.nextButton_do = new FWDUVPSimpleSizeButton(data.nextN_img.src, data.nextSPath_str, data.nextN_img.width, data.nextN_img.height);
			self.nextButton_do.addListener(FWDUVPSimpleSizeButton.SHOW_TOOLTIP, self.nextButtonShowTooltipHandler);
			self.nextButton_do.addListener(FWDUVPSimpleSizeButton.MOUSE_UP, self.nextButtonOnMouseUpHandler);
			self.nextButton_do.setY(parseInt((self.stageHeight - self.nextButton_do.h)/2));
			self.buttons_ar.push(self.nextButton_do);
			self.mainHolder_do.addChild(self.nextButton_do);
		};
		
		this.nextButtonShowTooltipHandler = function(e){
			self.showToolTip(self.nextButton_do, self.nextButtonToolTip_do, e.e);
		};
		
		this.nextButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPPlaylist.PLAY_NEXT_VIDEO);
		};
	
		//################################################//
		/* Setup play button */
		//################################################//
		this.setupPlayPauseButton = function(){
			FWDUVPComplexButton.setPrototype();
			self.playPauseButton_do = new FWDUVPComplexButton(
					self.playN_img,
					data.playSPath_str,
					self.pauseN_img,
					data.pauseSPath_str,
					true
			);
			
			self.buttons_ar.push(self.playPauseButton_do);
			self.playPauseButton_do.setY(parseInt((self.stageHeight - self.playPauseButton_do.buttonHeight)/2));
			self.playPauseButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.playButtonShowTooltipHandler);
			self.playPauseButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.playButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playPauseButton_do);
		};
		
		
		this.playButtonShowTooltipHandler = function(e){
			self.showToolTip(self.playPauseButton_do, self.playPauseToolTip_do, e.e);
		};
		
		this.showPlayButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(1);
		};
		
		this.showPauseButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(0);
		};
		
		this.playButtonMouseUpHandler = function(){
			if(self.playPauseButton_do.currentState == 0){
				self.dispatchEvent(FWDUVPController.PAUSE);
			}else{
				self.dispatchEvent(FWDUVPController.PLAY);
			}
		};
		
		this.disablePlayButton = function(){
			self.playPauseButton_do.disable();
			self.playPauseButton_do.setNormalState();
			self.showPlayButton();
		};
		
		this.enablePlayButton = function(){
			self.playPauseButton_do.enable();
		};
		
		//##########################################//
		/* Setup categories buttons */
		//##########################################//
		this.setupCategoriesButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.categoriesButton_do = new FWDUVPSimpleButton(self.categoriesN_img, data.categoriesSPath_str);
			self.categoriesButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.categoriesButtonShowTooltipHandler);
			self.categoriesButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.categoriesButtonOnMouseUpHandler);
			self.categoriesButton_do.setY(parseInt((self.stageHeight - self.categoriesButton_do.h)/2));
			self.buttons_ar.push(self.categoriesButton_do);
			self.mainHolder_do.addChild(self.categoriesButton_do); 
		};
		
		this.categoriesButtonShowTooltipHandler = function(e){
			self.showToolTip(self.categoriesButton_do, self.playlistsButtonToolTip_do, e.e);
		};
		
		this.categoriesButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_CATEGORIES);
		};
		
		this.setCategoriesButtonState = function(state){	
			if(!self.categoriesButton_do) return;
			if(state == "selected"){
				self.categoriesButton_do.setSelected();
			}else if(state == "unselected"){
				self.categoriesButton_do.setUnselected();
			}
		};
		
		//##########################################//
		/* Setup playlist button */
		//##########################################//
		this.setupPlaylistButton = function(){
			FWDUVPComplexButton.setPrototype();
			self.playlistButton_do = new FWDUVPComplexButton(
					self.hidePlaylistN_img,
					data.hidePlaylistSPath_str,
					self.showPlaylistN_img,
					data.showPlaylistSPath_str,
					true
			);
			
			
			self.buttons_ar.push(self.playlistButton_do);
			self.playlistButton_do.setY(parseInt((self.stageHeight - self.playlistButton_do.buttonHeight)/2));
			self.playlistButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.playlistButtonShowToolTipHandler);
			self.playlistButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.playlistButtonMouseUpHandler);
			if(!self.showPlaylistByDefault_bl) self.playlistButton_do.setButtonState(0);
			self.mainHolder_do.addChild(self.playlistButton_do);
			
		};
		
		this.playlistButtonShowToolTipHandler = function(e){
			self.showToolTip(self.playlistButton_do, self.playlistButtonToolTip_do, e.e);
		};
		
		this.showShowPlaylistButton = function(){
			if(!self.playlistButton_do) return;
			self.playlistButton_do.setButtonState(1);
		};
		
		this.showHidePlaylistButton = function(){
			if(!self.playlistButton_do) return;
			self.playlistButton_do.setButtonState(0);
		};
		
		this.playlistButtonMouseUpHandler = function(){
			if(self.playlistButton_do.currentState == 1){
				self.dispatchEvent(FWDUVPController.SHOW_PLAYLIST);
			}else{
				self.dispatchEvent(FWDUVPController.HIDE_PLAYLIST);
			}
			self.playlistButton_do.setNormalState();
			if(self.playlistButtonToolTip_do) self.playlistButtonToolTip_do.hide();
		};
		
		this.disablePlaylistButton = function(){
			if(self.playlistButton_do){
				self.playlistButton_do.disable();
				self.playlistButton_do.setAlpha(.4);
			}
		};
		
		this.enablePlaylistButton = function(){
			if(self.playlistButton_do){
				self.playlistButton_do.enable();
				self.playlistButton_do.setAlpha(1);
			}
		};
		
		//##########################################//
		/* Setup embed button */
		//#########################################//
		this.setupEmbedButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.embedButton_do = new FWDUVPSimpleButton(self.embedN_img, data.embedPathS_str, undefined, true);
			self.embedButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.embedButtonShowToolTipHandler);
			self.embedButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.embedButtonOnMouseUpHandler);
			self.embedButton_do.setY(parseInt((self.stageHeight - self.embedButton_do.h)/2));
			self.buttons_ar.push(self.embedButton_do);
			self.mainHolder_do.addChild(self.embedButton_do);
		};
		
		this.embedButtonShowToolTipHandler = function(e){
			self.showToolTip(self.embedButton_do, self.embedButtonToolTip_do, e.e);
		};
		
		this.embedButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_EMBED_WINDOW);
			if(self.embedButtonToolTip_do) self.embedButtonToolTip_do.hide();
		};
		
		//###################################################//
		/* Setup youtube quality buttons */
		//###################################################//
		this.setupYtbButtons = function(){
			self.ytbButtonsHolder_do = new FWDUVPDisplayObject("div");
			self.ytbButtonsHolder_do.setOverflow("visible");
			if(self.repeatBackground_bl){
				self.ytbButtonsHolder_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.ytbButtonBackground_do = new FWDUVPDisplayObject("img");
				var img = new Image();
				img.src = self.controllerBkPath_str;
				self.ytbButtonBackground_do.setScreen(img);
				self.ytbButtonsHolder_do.addChild(self.ytbButtonBackground_do);
			}
			
			self.ytbButtonsHolder_do.setX(300);
			self.ytbButtonsHolder_do.setY(-300);
			parent.videoHolder_do.addChild(self.ytbButtonsHolder_do, 0);
			
			var img = new Image();
			img.src = self.ytbQualityButtonPointerPath_str;
			self.pointer_do = new FWDUVPDisplayObject("img");
			self.pointer_do.setScreen(img);
			self.pointer_do.setWidth(self.pointerWidth);
			self.pointer_do.setHeight(self.pointerHeight);
			self.ytbButtonsHolder_do.addChild(self.pointer_do);
	
			
			var img = new Image();
			img.src = self.youtubeQualityArrowPath_str;
			self.ytbQualityArrow_do = new FWDUVPDisplayObject("img");
			self.ytbQualityArrow_do.setScreen(img);
			self.ytbQualityArrow_do.setX(7);
			self.ytbQualityArrow_do.setWidth(5);
			self.ytbQualityArrow_do.setHeight(7);
			self.ytbButtonsHolder_do.addChild(self.ytbQualityArrow_do);
			
			var btn;
			for(var i=0; i<self.totalYtbButtons; i++){
				FWDUVPYTBQButton.setPrototype();
				btn = new FWDUVPYTBQButton(self.ytbQuality_ar[i], 
						self.youtubeQualityButtonNormalColor_str, 
						self.youtubeQualityButtonSelectedColor_str,
						data.hdPath_str);
				btn.addListener(FWDUVPYTBQButton.MOUSE_OVER, self.ytbQualityOver);
				btn.addListener(FWDUVPYTBQButton.MOUSE_OUT, self.ytbQualityOut);
				btn.addListener(FWDUVPYTBQButton.CLICK, self.ytbQualityClick);
				self.ytbButtons_ar[i] = btn;
				self.ytbButtonsHolder_do.addChild(btn);
			}
			self.hideQualityButtons(false);
		};
		
		this.ytbQualityOver = function(e){
			self.setYtbQualityArrowPosition(e.target);
		};
		
		this.ytbQualityOut = function(e){
			self.setYtbQualityArrowPosition(undefined);
		};
		
		this.ytbQualityClick = function(e){
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
			self.dispatchEvent(FWDUVPController.CHANGE_YOUTUBE_QUALITY, {quality:e.target.label_str});
		};
		
		this.positionAndResizeYtbQualityButtons = function(ar){
			if(!ar) return;
			var totalButtons = ar.length + 1;
			if(self.prevYtbQualityButtonsLength == totalButtons) return;
			this.prevYtbQualityButtonsLength = totalButtons;
			var btn;
			var startY = 5;
			var totalWidth = 0;
			var totalHeight = 0;
			
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				btn.setFinalSize();
				for(var k=0; k<totalButtons; k++){
					if(btn.label_str == ar[k]){
						if(btn.x != 0) btn.setX(0);
						if(btn.w > totalWidth) totalWidth = btn.w;
						btn.setY(startY);
						startY += btn.h;
						break;
					}else{
						if(btn.x != -3000) btn.setX(-3000);
					}
				}
			}
			
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				if(btn.dumy_do.w < totalWidth){
					btn.setWidth(totalWidth);
					btn.dumy_do.setWidth(totalWidth);
				}
			}
			
			totalHeight = startY + 5;
			self.pointer_do.setX(parseInt((totalWidth - self.pointer_do.w)/2));
			self.pointer_do.setY(totalHeight);
			if(self.ytbButtonBackground_do){
				self.ytbButtonBackground_do.setWidth(totalWidth);
				self.ytbButtonBackground_do.setHeight(totalHeight);
			}
			self.ytbButtonsHolder_do.setWidth(totalWidth);
			self.ytbButtonsHolder_do.setHeight(totalHeight);
		};
		
		this.disableQualityButtons = function(curQualityLevel){
			for(var i=0; i<self.totalYtbButtons; i++){
				btn = self.ytbButtons_ar[i];
				if(btn.label_str == curQualityLevel){
					FWDUVPTweenMax.killTweensOf(self.ytbQualityArrow_do);
					self.ytbQualityArrow_do.setY(btn.y + parseInt((btn.h - self.ytbQualityArrow_do.h)/2) + 1);
					btn.disable();
					self.ytbDisabledButton_do = btn;
				}else{
					btn.enable();
				}
			}
			
			if(curQualityLevel == "highres" || curQualityLevel == "hd1080" || curQualityLevel == "hd720"){
				self.ytbQualityButton_do.showDisabledState();
			}else{
				self.ytbQualityButton_do.hideDisabledState();
			}
		};
		
		this.setYtbQualityArrowPosition = function(target){
			var curY = 0;
			if(!target){
				curY = self.ytbDisabledButton_do.y + parseInt((self.ytbDisabledButton_do.h - self.ytbQualityArrow_do.h)/2);
			}else{
				curY = target.y + parseInt((target.h - self.ytbQualityArrow_do.h)/2);
			}
			FWDUVPTweenMax.killTweensOf(self.ytbQualityArrow_do);
			FWDUVPTweenMax.to(self.ytbQualityArrow_do, .6, {y:curY, delay:.1, ease:Expo.easeInOut});
		};
		
		this.showQualityButtons = function(animate){
			if(self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			
			self.areYtbQualityButtonsShowed_bl = true;
			//var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			//var finalY = parseInt(- self.ytbButtonsHolder_do.h - 6);
			var finalX = parseInt(self.ytbQualityButton_do.x + (parseInt(self.ytbQualityButton_do.w - self.ytbButtonsHolder_do.w)/2));
			var finalY = parseInt(parent.tempVidStageHeight - self.stageHeight - self.ytbButtonsHolder_do.h - 6);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.hideQualityButtonsHandler);
			}else if(document.attachEvent){
				document.detachEvent("onmousedown", self.hideQualityButtonsHandler);
				document.attachEvent("onmousedown", self.hideQualityButtonsHandler);
			}
			
			self.ytbButtonsHolder_do.setX(finalX);
			
			if(self.isMainScrubberOnTop_bl){
				FWDUVPTweenMax.to(self.mainScrubber_do, .4, {alpha:0, onComplete:function(){self.mainScrubber_do.setX(-5000);}});
			}
		
			if(animate){
				FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.ytbButtonsHolder_do.setY(finalY);
			}
		};
	
		this.hideQualityButtons = function(animate){
			if(!self.areYtbQualityButtonsShowed_bl || !self.showYoutubeQualityButton_bl) return;
			self.areYtbQualityButtonsShowed_bl = false;
			if(animate){
				//FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:self.stageHeight, ease:Expo.easeInOut});
				FWDUVPTweenMax.to(self.ytbButtonsHolder_do, .6, {y:parent.tempVidStageHeight, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				//self.ytbButtonsHolder_do.setY(self.stageHeight);
				self.ytbButtonsHolder_do.setY(parent.tempVidStageHeight);
			}
			
			if(window.removeEventListener){
				window.removeEventListener("mousedown", self.hideQualityButtonsHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousedown", self.hideQualityButtonsHandler);
			}
		};
		
		//##########################################//
		/* Setup youtube quality button */
		//##########################################//
		this.setupYoutubeQualityButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.ytbQualityButton_do = new FWDUVPSimpleButton(
					self.ytbQualityN_img,
					data.ytbQualitySPath_str,
					data.ytbQualityDPath_str
			);
		
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.setY(parseInt((self.stageHeight - self.ytbQualityButton_do.h)/2));
			self.ytbQualityButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.ytbQualityMouseUpHandler);
			self.mainHolder_do.addChild(self.ytbQualityButton_do);
		};
		
		this.ytbQualityMouseUpHandler = function(){
			if(self.areYtbQualityButtonsShowed_bl){
				self.hideQualityButtons(true);
				if(self.isMainScrubberOnTop_bl){
					self.mainScrubber_do.setX(0);
					FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
				}
			}else{
				self.showQualityButtons(true);
			}
		};
		
		this.hideQualityButtonsHandler = function(e){
			var vc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(FWDUVPUtils.hitTest(self.ytbQualityButton_do.screen, vc.screenX, vc.screenY)
			   || FWDUVPUtils.hitTest(self.ytbButtonsHolder_do.screen, vc.screenX, vc.screenY)){
				return;
			}
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
		};
		
		this.addYtbQualityButton = function(){
			if(self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = true;
			
			if(self.embedButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.embedButton_do), 0, self.ytbQualityButton_do);
			}else if(self.facebookButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.facebookButton_do), 0, self.ytbQualityButton_do);
			}else if(self.fullScreenButton_do && FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do) != -1){
				self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.fullScreenButton_do), 0, self.ytbQualityButton_do);
			}else{
				self.buttons_ar.splice(self.buttons_ar.length, 0, self.ytbQualityButton_do);
			}
			
			self.ytbQualityButton_do.disable();
			self.ytbQualityButton_do.rotation = 0;
			self.ytbQualityButton_do.setRotation(self.ytbQualityButton_do.rotation);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			
			self.positionButtons();
		};
		
		this.removeYtbQualityButton = function(){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.hasYtbButton_bl = false;
			self.buttons_ar.splice(FWDUVPUtils.indexOfArray(self.buttons_ar, self.ytbQualityButton_do), 1);
			
			self.ytbQualityButton_do.setX(-300);
			self.ytbQualityButton_do.hideDisabledState();
			self.hideQualityButtons(false);
			self.positionButtons();
		};
		
		this.updateQuality = function(qualityLevels, curQualityLevel){
			if(!self.hasYtbButton_bl || !self.showYoutubeQualityButton_bl) return;
			self.ytbQualityButton_do.enable();
			self.positionAndResizeYtbQualityButtons(qualityLevels);
			self.disableQualityButtons(curQualityLevel);
		};	
		
		//##########################################//
		/* Setup info  button */
		//#########################################//
		this.setupInfoButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.infoButton_do = new FWDUVPSimpleButton(self.infoN_img, data.infoSPath_str);
			self.infoButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.infoButtonShowToolTipHandler);
			self.infoButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.infoButtonOnMouseUpHandler);
			self.infoButton_do.setX(-300);
			self.infoButton_do.setY(parseInt((self.stageHeight - self.infoButton_do.h)/2));
			self.mainHolder_do.addChild(self.infoButton_do);
		};
		
		this.infoButtonShowToolTipHandler = function(e){
			self.showToolTip(self.infoButton_do, self.infoButtonToolTip_do, e.e);
		};
		
		this.infoButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.SHOW_INFO_WINDOW);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		this.setupDownloadButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.downloadButton_do = new FWDUVPSimpleButton(self.downloadN_img, data.downloadSPath_str);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.downloadButtonShowToolTipHandler);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.downloadButtonOnMouseUpHandler);
			self.downloadButton_do.setX(-300);
			self.downloadButton_do.setY(parseInt((self.stageHeight - self.downloadButton_do.h)/2));
			self.mainHolder_do.addChild(self.downloadButton_do);
		};
		
		this.downloadButtonShowToolTipHandler = function(e){
			self.showToolTip(self.downloadButton_do, self.downloadButtonToolTip_do, e.e);
		};
		
		this.downloadButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.DOWNLOAD_VIDEO);
		};
		
		//##########################################//
		/* Setup download button */
		//#########################################//
		this.setupDownloadButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.downloadButton_do = new FWDUVPSimpleButton(self.downloadN_img, data.downloadSPath_str);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.downloadButtonShowToolTipHandler);
			self.downloadButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.downloadButtonOnMouseUpHandler);
			self.downloadButton_do.setX(-300);
			self.downloadButton_do.setY(parseInt((self.stageHeight - self.downloadButton_do.h)/2));
			self.mainHolder_do.addChild(self.downloadButton_do); 
		};
		
		this.downloadButtonShowToolTipHandler = function(e){
			self.showToolTip(self.downloadButton_do, self.downloadButtonToolTip_do, e.e);
		};
		
		this.downloadButtonOnMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.DOWNLOAD_VIDEO);
		};
		
		//##########################################//
		/* Setup facebook button */
		//##########################################//
		this.setupFacebookButton = function(){
			FWDUVPSimpleButton.setPrototype();
			self.facebookButton_do = new FWDUVPSimpleButton(
					self.facebookN_img,
					data.facebookSPath_str
			);
			
			self.buttons_ar.push(self.facebookButton_do);
			self.facebookButton_do.setY(parseInt((self.stageHeight - self.facebookButton_do.h)/2));
			self.facebookButton_do.addListener(FWDUVPSimpleButton.SHOW_TOOLTIP, self.facebookButtonShowTooltipHandler);
			self.facebookButton_do.addListener(FWDUVPSimpleButton.MOUSE_UP, self.facebookButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.facebookButton_do);
		};
		
		this.facebookButtonShowTooltipHandler = function(e){
			self.showToolTip(self.facebookButton_do, self.facebookButtonToolTip_do, e.e);
		};
		
	
		this.facebookButtonMouseUpHandler = function(){
			self.dispatchEvent(FWDUVPController.FACEBOOK_SHARE);
		};

		//##########################################//
		/* Setup fullscreen button */
		//##########################################//
		this.setupFullscreenButton = function(){
			
			FWDUVPComplexButton.setPrototype();
			self.fullScreenButton_do = new FWDUVPComplexButton(
					self.fullScreenN_img,
					data.fullScreenSPath_str,
					self.normalScreenN_img,
					data.normalScreenSPath_str,
					true
			);
			
			self.buttons_ar.push(self.fullScreenButton_do);
			self.fullScreenButton_do.setY(parseInt((self.stageHeight - self.fullScreenButton_do.buttonHeight)/2));
			self.fullScreenButton_do.addListener(FWDUVPComplexButton.SHOW_TOOLTIP, self.fullscreenButtonShowToolTipHandler);
			self.fullScreenButton_do.addListener(FWDUVPComplexButton.MOUSE_UP, self.fullScreenButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.fullScreenButton_do);
		};
		
		this.fullscreenButtonShowToolTipHandler = function(e){
			self.showToolTip(self.fullScreenButton_do, self.fullscreenButtonToolTip_do, e.e);
		};
		
		this.showFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(1);
		};
		
		this.showNormalScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(0);
		};
		
		this.setNormalStateToFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setNormalState();
			self.hideQualityButtons(false);
		};
		
		this.fullScreenButtonMouseUpHandler = function(){
			if(self.fullscreenButtonToolTip_do) self.fullscreenButtonToolTip_do.hide();
			if(self.fullScreenButton_do.currentState == 1){
				self.dispatchEvent(FWDUVPController.FULL_SCREEN);
			}else{
				self.dispatchEvent(FWDUVPController.NORMAL_SCREEN);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		this.setupTime = function(){
			self.time_do = new FWDUVPDisplayObject("div");
			self.time_do.hasTransform3d_bl = false;
			self.time_do.hasTransform2d_bl = false;
			self.time_do.setBackfaceVisibility();
			self.time_do.getStyle().fontFamily = "Arial";
			self.time_do.getStyle().fontSize= "12px";
			self.time_do.getStyle().whiteSpace= "nowrap";
			self.time_do.getStyle().textAlign = "center";
			self.time_do.getStyle().color = self.timeColor_str;
			self.time_do.getStyle().fontSmoothing = "antialiased";
			self.time_do.getStyle().webkitFontSmoothing = "antialiased";
			self.time_do.getStyle().textRendering = "optimizeLegibility";	
			self.mainHolder_do.addChild(self.time_do);
			self.updateTime("00:00/00:00");
			self.buttons_ar.push(self.time_do);
		};
		
		this.updateTime = function(time){
			if(!self.time_do) return;
			self.time_do.setInnerHTML(time);
			
			if(self.lastTimeLength != time.length){
				self.time_do.w = self.time_do.getWidth();
				self.positionButtons();
				
				setTimeout(function(){
					self.time_do.w = self.time_do.getWidth();
					self.time_do.h = self.time_do.getHeight();
					self.time_do.setY(parseInt((self.stageHeight - self.time_do.h)/2) + 1 + self.timeOffsetTop);
					self.positionButtons();
				}, 50);
				self.lastTimeLength = time.length;
			}
		};
		
		//##########################################//
		/* Setup volume button */
		//#########################################//
		this.setupVolumeButton = function(){
			FWDUVPVolumeButton.setPrototype();
			self.volumeButton_do = new FWDUVPVolumeButton(self.volumeN_img, data.volumeSPath_str, data.volumeDPath_str);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.SHOW_TOOLTIP, self.volumeButtonShowTooltipHandler);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_OVER, self.volumeOnMouseOverHandler);
			self.volumeButton_do.addListener(FWDUVPVolumeButton.MOUSE_UP, self.volumeOnMouseUpHandler);
			self.volumeButton_do.setY(parseInt((self.stageHeight - self.volumeButton_do.h)/2));
			self.buttons_ar.push(self.volumeButton_do);
			self.mainHolder_do.addChild(self.volumeButton_do); 
			if(!self.allowToChangeVolume_bl) self.volumeButton_do.disable();
		};
		
		this.volumeButtonShowTooltipHandler = function(e){
			//self.showToolTip(self.volumeButton_do, self.volumeButtonToolTip_do, e.e);
		};
		
		this.volumeOnMouseOverHandler = function(){
			self.showVolumeScrubber(true);
			self.hideQualityButtons(true);
			if(self.isMainScrubberOnTop_bl){
				FWDUVPTweenMax.to(self.mainScrubber_do, .4, {alpha:0, onComplete:function(){self.mainScrubber_do.setX(-5000);}});
			}
		};
		
		this.volumeOnMouseUpHandler = function(){
			var vol = self.lastVolume;
			
			if(self.isMute_bl){
				vol = self.lastVolume;
				self.isMute_bl = false;
			}else{
				vol = 0.000001;
				self.isMute_bl = true;
			};
			self.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		this.setupVolumeScrubber = function(){
			
			//setup background bar
			self.volumeScrubberHolder_do = new FWDUVPDisplayObject("div");
			
			if(self.repeatBackground_bl){
				self.volumeBk_do = new FWDUVPDisplayObject("div");
				self.volumeBk_do.getStyle().background = "url('" + self.controllerBkPath_str +  "')";
			}else{
				self.volumeBk_do = new FWDUVPDisplayObject("img");
				var volumeBk_img = new Image();
				volumeBk_img.src = self.controllerBkPath_str;
				self.volumeBk_do.setScreen(volumeBk_img);
			}
			self.volumeScrubberHolder_do.addChild(self.volumeBk_do);

			self.volumeScrubber_do = new FWDUVPDisplayObject("div");
			self.volumeScrubber_do.setHeight(self.mainScrubberHeight);
			self.volumeScrubber_do.setY(parseInt(self.volumeScrubberOfsetHeight/2));
			
			var volumeScrubberBkBottom_img = new Image();
			volumeScrubberBkBottom_img.src = data.volumeScrubberBkBottomPath_str;
			self.volumeScrubberBkBottom_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberBkBottom_do.setScreen(volumeScrubberBkBottom_img);
			self.volumeScrubberBkBottom_do.setWidth(self.mainScrubberBkLeft_img.height);
			self.volumeScrubberBkBottom_do.setHeight(self.mainScrubberBkLeft_img.width);
			self.volumeScrubberBkBottom_do.setY(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight - self.volumeScrubberBkBottom_do.h);
		
			var volumeScrubberBkTop_img = new Image();
			volumeScrubberBkTop_img.src = data.volumeScrubberBkTopPath_str;
			self.volumeScrubberBkTop_do = new FWDUVPDisplayObject("img");
			
			self.volumeScrubberBkTop_do.setScreen(volumeScrubberBkTop_img);
			self.volumeScrubberBkTop_do.setWidth(self.volumeScrubberBkBottom_do.w);
			self.volumeScrubberBkTop_do.setHeight(self.volumeScrubberBkBottom_do.h);
			
			var middleImage = new Image();
			middleImage.src = data.volumeScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("div");	
				self.volumeScrubberBkMiddle_do.getStyle().background = "url('" + self.volumeScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberBkMiddle_do = new FWDUVPDisplayObject("img");
				self.volumeScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.volumeScrubberBkMiddle_do.setWidth(self.volumeScrubberBkBottom_do.w);
			self.volumeScrubberBkMiddle_do.setHeight((self.volumeScrubberHeight - self.volumeScrubberOfsetHeight) - self.volumeScrubberBkTop_do.h * 2);
			self.volumeScrubberBkMiddle_do.setY(self.volumeScrubberBkTop_do.h);
			
			//setup darg bar.
			self.volumeScrubberDrag_do = new FWDUVPDisplayObject("div");
			self.volumeScrubberDrag_do.setWidth(self.volumeScrubberBkBottom_do.w);
		
			var volumeScrubberDragBottom_img = new Image();
			volumeScrubberDragBottom_img.src = data.volumeScrubberDragBottomPath_str;
			self.volumeScrubberDragBottom_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberDragBottom_do.setScreen(volumeScrubberDragBottom_img);
			self.volumeScrubberDragBottom_do.setWidth(self.mainScrubberDragLeft_img.height);
			self.volumeScrubberDragBottom_do.setHeight(self.mainScrubberDragLeft_img.width);
			self.volumeScrubberDragBottom_do.setY(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight - self.volumeScrubberDragBottom_do.h);
			
			middleImage = new Image();
			middleImage.src = self.volumeScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("div");	
				self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberDragMiddle_do = new FWDUVPDisplayObject("img");
				self.volumeScrubberDragMiddle_do.setScreen(middleImage);
			}
			
			self.volumeScrubberDragMiddle_do.setWidth(self.volumeScrubberDragBottom_do.w);
			self.volumeScrubberDragMiddle_do.setHeight(self.volumeScrubberHeight);
			
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = data.volumeScrubberLinePath_str;
			self.volumeScrubberBarLine_do = new FWDUVPDisplayObject("img");
			self.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			self.volumeScrubberBarLine_do.setWidth(self.mainScrubberLine_img.height);
			self.volumeScrubberBarLine_do.setHeight(self.mainScrubberLine_img.width);
			self.volumeScrubberBarLine_do.setAlpha(0);
			self.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			self.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			self.volumeScrubberHolder_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubberHolder_do.setHeight(self.volumeScrubberHeight + self.stageHeight);
			self.volumeBk_do.setWidth(self.volumeScrubberWidth);
			self.volumeBk_do.setHeight(self.volumeScrubberHeight + self.stageHeight);
			self.volumeScrubber_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubber_do.setHeight(self.volumeScrubberHeight - self.volumeScrubberOfsetHeight);
			
			//add all children
			self.volumeScrubber_do.addChild(self.volumeScrubberBkBottom_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkTop_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDragBottom_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDrag_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubberHolder_do.addChild(self.volumeScrubber_do);
		
			//parent.videoHolder_do.addChild(self.volumeScrubberHolder_do);
			self.addChild(self.volumeScrubberHolder_do);
		
			if(self.allowToChangeVolume_bl){
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.volumeScrubber_do.screen.addEventListener("MSPointerOver", self.volumeScrubberOnOverHandler);
						self.volumeScrubber_do.screen.addEventListener("MSPointerOut", self.volumeScrubberOnOutHandler);
						self.volumeScrubber_do.screen.addEventListener("MSPointerDown", self.volumeScrubberOnDownHandler);
					}else{
						self.volumeScrubber_do.screen.addEventListener("touchstart", self.volumeScrubberOnDownHandler);
					}
				}else if(self.screen.addEventListener){	
					self.volumeScrubber_do.screen.addEventListener("mouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.addEventListener("mouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.addEventListener("mousedown", self.volumeScrubberOnDownHandler);
				}else if(self.screen.attachEvent){
					self.volumeScrubber_do.screen.attachEvent("onmouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.attachEvent("onmouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.attachEvent("onmousedown", self.volumeScrubberOnDownHandler);
				}
			}
			
			self.enableVolumeScrubber();
			self.updateVolumeScrubber(self.volume);
		};
		
		this.volumeScrubberOnOverHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnOutHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnDownHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.volumeScrubberIsDragging_bl = true;
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localY = viewportMouseCoordinates.screenY - self.volumeScrubber_do.getGlobalY();
			parent.showDisable();
			if(localY < 0){
				localY = 0;
			}else if(localY > self.volumeScrubber_do.h - self.scrubbersOffsetWidth){
				localY = self.volumeScrubber_do.h - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = 1 - localY/self.volumeScrubber_do.h;

			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("MSPointerMove", self.volumeScrubberMoveHandler);
					window.addEventListener("MSPointerUp", self.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.addEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.addEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.attachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.volumeScrubberMoveHandler = function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDUVPUtils.getViewportMouseCoordinates(e);	
			var localY = viewportMouseCoordinates.screenY - self.volumeScrubber_do.getGlobalY();
			
			if(localY < self.scrubbersOffsetWidth){
				localY = self.scrubbersOffsetWidth;
			}else if(localY > self.volumeScrubber_do.h){
				localY = self.volumeScrubber_do.h;
			}
			var percentScrubbed = 1 - localY/self.volumeScrubber_do.h;
		
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
		};
		
		this.volumeScrubberEndHandler = function(){
			parent.hideDisable();
			self.volumeScrubberIsDragging_bl = false;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("MSPointerMove", self.volumeScrubberMoveHandler);
					window.removeEventListener("MSPointerUp", self.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.removeEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.detachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.disableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = true;
			self.volumeScrubber_do.setButtonMode(false);
			self.volumeScrubberEndHandler();
		};
		
		this.enableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = false;
			self.volumeScrubber_do.setButtonMode(true);
		};
		
		this.updateVolumeScrubber = function(percent){
			var totalHeight = self.volumeScrubberHeight - self.volumeScrubberOfsetHeight;
			var finalHeight = Math.round(percent * totalHeight); 
			
			self.volumeScrubberDrag_do.setHeight(Math.max(0,finalHeight - self.volumeScrubberDragBottom_do.h));
			self.volumeScrubberDrag_do.setY(totalHeight - finalHeight);
		
			if(finalHeight < 1 && self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = false;
				FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .5, {alpha:0});
				FWDUVPTweenMax.to(self.volumeScrubberDragBottom_do, .5, {alpha:0});
			}else if(finalHeight > 1 && !self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = true;
				FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .5, {alpha:1});
				FWDUVPTweenMax.to(self.volumeScrubberDragBottom_do, .5, {alpha:1});
			}
			
			if(finalHeight > totalHeight) finalHeight = totalHeight;
			
			FWDUVPTweenMax.to(self.volumeScrubberBarLine_do, .8, {y:totalHeight - finalHeight - 2, ease:Expo.easeOut});
		};
		
		this.updateVolume = function(volume, preventEvent){
			if(!self.showVolumeScrubber_bl) return;
			self.volume = volume;
			if(self.volume <= 0.000001){
				self.isMute_bl = true;
				self.volume = 0.000001;
			}else if(self.voume >= 1){
				self.isMute_bl = false;
				self.volume = 1;
			}else{
				self.isMute_bl = false;
			}
			
			if(self.volume == 0.000001){
				if(self.volumeButton_do) self.volumeButton_do.setDisabledState();
			}else{
				if(self.volumeButton_do) self.volumeButton_do.setEnabledState();
			}
			
			if(self.volumeScrubberBarLine_do) self.updateVolumeScrubber(self.volume);
			if(!preventEvent) self.dispatchEvent(FWDUVPController.CHANGE_VOLUME, {percent:self.volume});
		};
		
		this.showVolumeScrubber = function(animate){
			if(self.isVolumeScrubberShowed_bl) return;
			self.isVolumeScrubberShowed_bl = true;
			var finalY = - self.volumeScrubberHolder_do.h + self.h;
			self.volumeScrubberHolder_do.setVisible(true);
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.hideVolumeSchubberOnMoveHandler);
			}else if(document.attachEvent){
				document.detachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
				document.attachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
			}
			
			self.volumeScrubberHolder_do.setX(parseInt(self.volumeButton_do.x + (self.volumeButton_do.w - self.volumeScrubberHolder_do.w)/2));
			
			if(animate){
				FWDUVPTweenMax.to(self.volumeScrubberHolder_do, .6, {y:finalY, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.volumeScrubberHolder_do);
				self.volumeScrubberHolder_do.setY(finalY);
			}
		};
		
		this.hideVolumeSchubberOnMoveHandler = function(e){
			var vc = FWDUVPUtils.getViewportMouseCoordinates(e);	
			if(FWDUVPUtils.hitTest(self.volumeScrubberHolder_do.screen, vc.screenX, vc.screenY)
			   || FWDUVPUtils.hitTest(self.volumeButton_do.screen, vc.screenX, vc.screenY)
			   || self.volumeScrubberIsDragging_bl){
				return;
			}
			self.hideVolumeScrubber(true);
			if(self.isMainScrubberOnTop_bl){
				self.mainScrubber_do.setX(0);
				FWDUVPTweenMax.to(self.mainScrubber_do, .6, {alpha:1});
			}
		};
	
		this.hideVolumeScrubber = function(animate){
			if(!self.isVolumeScrubberShowed_bl) return;
			self.isVolumeScrubberShowed_bl = false;
			
			self.volumeButton_do.setNormalState(true);
			if(animate){
				FWDUVPTweenMax.to(self.volumeScrubberHolder_do, .6, {y:parent.stageHeight, ease:Expo.easeInOut, onComplete:function(){self.volumeScrubberHolder_do.setVisible(false);}});
			}else{
				FWDUVPTweenMax.killTweensOf(self.ytbButtonsHolder_do);
				self.volumeScrubberHolder_do.setY(parent.stageHeight);
				self.volumeScrubberHolder_do.setVisible(false);
			}
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.hideVolumeSchubberOnMoveHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.hideVolumeSchubberOnMoveHandler);
			}
		};
		
		//###################################//
		/* show / hide */
		//###################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			self.setX(0);
			if(animate){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			setTimeout(self.positionButtons, 200);
		};
		
		this.hide = function(animate, offset){
			if(!self.isShowed_bl) return;
			if(!offset) offset = 0;
			self.isShowed_bl = false;
			if(animate){
				FWDUVPTweenMax.to(self.mainHolder_do, .8, {y:self.stageHeight + offset, ease:Expo.easeInOut, onComplete:function(){
						if(offset) self.setX(-5000);
					}});
			}else{
				FWDUVPTweenMax.killTweensOf(self.mainHolder_do);
				if(offset) self.setX(-5000);
				self.mainHolder_do.setY(self.stageHeight + offset);
			}
			self.hideQualityButtons(true);
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDUVPController.setPrototype = function(){
		FWDUVPController.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPController.SHOW_PLAYLIST = "showPlaylist";
	FWDUVPController.HIDE_PLAYLIST = "hidePlaylist";
	FWDUVPController.SHOW_CATEGORIES = "showCategories";
	FWDUVPController.DOWNLOAD_VIDEO = "downloadVideo";
	FWDUVPController.FACEBOOK_SHARE = "share";
	FWDUVPController.FULL_SCREEN = "fullScreen";
	FWDUVPController.NORMAL_SCREEN = "normalScreen";
	FWDUVPController.PLAY = "play";
	FWDUVPController.PAUSE = "pause";
	FWDUVPController.START_TO_SCRUB = "startToScrub";
	FWDUVPController.SCRUB = "scrub";
	FWDUVPController.STOP_TO_SCRUB = "stopToScrub";
	FWDUVPController.CHANGE_VOLUME = "changeVolume";
	FWDUVPController.CHANGE_YOUTUBE_QUALITY = "changeYoutubeQuality";
	FWDUVPController.SHOW_EMBED_WINDOW = "showEmbedWindow";
	FWDUVPController.SHOW_INFO_WINDOW = "showInfoWindow";
	
	
	FWDUVPController.prototype = null;
	window.FWDUVPController = FWDUVPController;
	
}());