/* Data */
(function(window){
	
	var FWDUVPData = function(props, playListElement, parent){
		
		var self = this;
		var prototype = FWDUVPData.prototype;
		
		this.xhr = null;
		this.ytb = null;
		this.scs_el = null;
		
		this.dumy_img = null;
		this.mainPreloader_img = null;
		this.bkLeft_img = null;
		this.bkMiddle_img = null;
		this.bkRight_img = null;
		this.nextN_img = null;
		this.prevN_img = null;
		this.playN_img = null;
		this.pauseN_img = null;
		this.mainScrubberBkLeft_img = null;
		this.mainScrubberDragLeft_img = null;
		this.mainScrubberLine_img = null;
		this.volumeScrubberBkLeft_img = null;
		this.volumeScrubberDragLeft_img = null;
		this.volumeScrubberLine_img = null;
		this.volumeN_img = null;
		this.progressLeft_img = null;
		this.largePlayN_img = null;
		this.categoriesN_img = null;
		this.replayN_img = null;
		this.shuffleN_img = null;
		this.fullScreenN_img = null;
		this.ytbQualityN_img = null;
		this.ytbQualityD_img = null;
		this.facebookN_img = null;
		this.infoN_img = null;
		this.downloadN_img = null;
		this.normalScreenN_img = null;
		this.catNextN_img = null;
		this.catPrevN_img = null;
		this.catPrevD_img = null;
		this.hidePlaylistN_img = null;
		this.showPlaylistN_img = null;
		this.prevThumbsSetN_img = null;
		this.nextThumbsSetN_img = null;
		this.embedN_img = null;
		this.embedColoseN_img = null;
		this.scrLinesN_img = null;
		this.scrDragTop_img = null;
		this.scrLinesN_img = null;
		
		this.prevSPath_str = null;
		this.nextSPath_str = null;

	
		this.props_obj = props;
		this.skinPaths_ar = [];
		this.images_ar = [];
		this.cats_ar = [];
		this.catsRef_ar = [];
		this.youtubeObject_ar = null;
	
		this.skinPath_str = null;
		this.flashPath_str = null;
		this.flashCopyToCBPath_str = null;
		this.proxyPath_str = null;
		this.proxyFolderPath_str = null;
		this.mailPath_str = null;
		this.sendToAFriendPath_str = null;
		this.videoDownloaderPath_str = null;
		this.mainFolderPath_str = null;
		this.bkMiddlePath_str = null;
		this.hdPath_str = null;
		this.youtubeQualityArrowPath_str = null;
		this.mainScrubberBkMiddlePath_str = null;
		this.volumeScrubberBkMiddlePath_str = null;
		this.mainScrubberDragMiddlePath_str = null;
		this.volumeScrubberDragMiddlePath_str = null;
		this.timeColor_str = null;
		this.playlistPosition_str = null;
		this.progressMiddlePath_str = null;
		this.facebookAppId_str = null;
		this.ytbQualityButtonPointerPath_str = null;
		this.youtubeQualityButtonNormalColor_str = null;
		this.youtubeQualityButtonSelectedColor_str = null;
		this.controllerBkPath_str = null;
		this.logoPosition_str = null;
		this.logoPath_str = null;
		this.pauseSPath_str = null;
		this.playSPath_str = null;
		this.volumeSPath_str = null;
		this.volumeDPath_str = null;
		this.categoriesSPath_str = null;
		this.replaySPath_str = null;
		this.toopTipBk_str = null;
		this.toolTipsButtonFontColor_str = null;
		this.toopTipPointer_str = null;
		this.hidePlaylistSPath_str = null;
		this.showPlaylistSPath_str = null;
		this.prevThumbsSetSPath_str = null;
		this.nextThumbsSetSPath_str = null;
		this.playlistThumbnailsBackgroundPath_str = null;
		this.playlistToolTipPointerPath_str = null;
		this.playlistToolTipBackgroundPath_str = null;
		this.folderVideoLabel_str = null;
		this.embedPathS_str = null;
		this.embedCopyButtonNPath_str = null;
		this.embedWindowPathS_str = null;
		this.embedCopyButtonSPath_str = null;
		this.embedWindowBackground_str = null;
		this.sendButtonNPath_str = null;
		this.sendButtonSPath_str = null;
		this.shareAndEmbedTextColor_str = null;
		this.searchInputBackgroundColor_str = null;
		this.borderColor_str = null;
		this.searchInputColor_str = null;
		this.secondaryLabelsColor_str = null;
		this.mainLabelsColor_str = null;
	
		this.controllerHeight = 0;
		this.countLoadedSkinImages = 0;
		this.volume = 1;
		this.controllerHideDelay = 0;
		this.startSpaceBetweenButtons = 0;
		this.spaceBetweenButtons = 0;
		this.scrubbersOffsetWidth = 0;
		this.volumeScrubberOffsetTopWidth = 0;
		this.timeOffsetLeftWidth = 0;
		this.timeOffsetTop = 0;
		this.logoMargins = 0;
		this.startAtPlaylist = 0;
		this.startAtVideo = 0;
		this.playlistBottomHeight = 0;
		this.maxPlaylistItems = 0;
		this.totalPlaylists = 0;
		this.thumbnailMaxWidth = 0; 
		this.buttonsMargins = 0;
		this.nextAndPrevSetButtonsMargins = 0;
		this.thumbnailMaxHeight = 0;
		this.horizontalSpaceBetweenThumbnails = 0;
		this.verticalSpaceBetweenThumbnails = 0;
		this.buttonsToolTipHideDelay = 0;
		this.thumbnailWidth = 0;
		this.thumbnailHeight = 0;
		this.timeOffsetTop = 0;
		this.embedWindowCloseButtonMargins = 0;
		
		this.loadImageId_to;
		this.dispatchLoadSkinCompleteWithDelayId_to;
		this.dispatchPlaylistLoadCompleteWidthDelayId_to;
		this.JSONPRequestTimeoutId_to;
		
		this.isYoutbe_bl = false;
		this.showPlaylistsButtonAndPlaylists_bl = false;
		this.showEmbedButton_bl = false;
		this.showPlaylistButtonAndPlaylist_bl = false;
		this.showPlaylistByDefault_bl = false;
		this.showSearchInput_bl = false;
		this.forceDisableDownloadButtonForFolder_bl = false;
		this.allowToChangeVolume_bl = true;
		this.showContextMenu_bl = false;
		this.showButtonsToolTip_bl = false;
		this.addMouseWheelSupport_bl = false;
		this.addKeyboardSupport_bl = false;
		this.autoPlay_bl = false;
		this.showPoster_bl = false;
		this.loop_bl = false;
		this.shuffle_bl = false;
		this.showLoopButton_bl = false;
		this.showDownloadVideoButton_bl = false;
		this.showInfoButton_bl = false;
		this.showVolumeScrubber_bl = false;
		this.showVolumeButton_bl = false;
		this.showControllerWhenVideoIsStopped_bl = false;
		this.showNextAndPrevButtonsInController_bl = false;
		this.showLogo_bl = false;
		this.hideLogoWithController_bl = false;
		this.isPlaylistDispatchingError_bl = false;
		this.useYoutube_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		this.hasPointerEvent_bl = FWDUVPUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.parseProperties();
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(parent){
			
			self.categoriesId_str = self.props_obj.playlistsId;
			if(!self.categoriesId_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>playlistsId</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
				
			
			self.mainFolderPath_str = self.props_obj.mainFolderPath;
			if(!self.mainFolderPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>mainFolderPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
				self.mainFolderPath_str += "/";
			}
			
			self.skinPath_str = self.props_obj.skinPath;
			if(!self.skinPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FFFFFF'>skinPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			if((self.skinPath_str.lastIndexOf("/") + 1) != self.skinPath_str.length){
				self.skinPath_str += "/";
			}
			
			self.skinPath_str = self.mainFolderPath_str + self.skinPath_str;
			self.flashPath_str = self.mainFolderPath_str + "swf.swf";
			self.flashCopyToCBPath_str = self.mainFolderPath_str + "cb.swf";
			self.proxyPath_str =  self.mainFolderPath_str + "proxy.php";
			self.proxyFolderPath_str = self.mainFolderPath_str  + "proxyFolder.php";
			self.mailPath_str = self.mainFolderPath_str  + "sendMail.php";
			self.sendToAFriendPath_str = self.mainFolderPath_str  + "sendMailToAFriend.php";
			self.videoDownloaderPath_str = self.mainFolderPath_str  + "downloader.php";
			
		
			self.categories_el = document.getElementById(self.categoriesId_str);
			
			if(!self.categories_el){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The playlist with the id <font color='#FFFFFF'>" + self.categoriesId_str + "</font> is not found!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			var catsChildren_ar = FWDUVPUtils.getChildren(self.categories_el);
			self.totalCats = catsChildren_ar.length;	
			
			if(self.totalCats == 0){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "At least one playlist is required!";
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:errorMessage_str});
				}, 50);
				return;
			}
			
			
			for(var i=0; i<self.totalCats; i++){
				var obj = {};
				
				var cat_el = null;
				child = catsChildren_ar[i];
				
				if(!FWDUVPUtils.hasAttribute(child, "data-source")){
					setTimeout(function(){
						if(self == null) return;
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-source</font> is required in the plalists html element at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDUVPUtils.hasAttribute(child, "data-thumbnail-path")){
					setTimeout(function(){
						if(self == null) return;
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-thumbnail-path</font> is required in the playlists html element at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				obj.source = FWDUVPUtils.getAttributeValue(child, "data-source");
				
				if(obj.source.indexOf("=") == -1 && obj.source.indexOf(".xml") == -1){
					cat_el = document.getElementById(obj.source);
				}else{
					cat_el = obj.source;
				}
				
				self.catsRef_ar.push(cat_el);
				obj.thumbnailPath = FWDUVPUtils.getAttributeValue(child, "data-thumbnail-path");
			
				obj.htmlContent = child.innerHTML;
				if(FWDUVPUtils.hasAttribute(child, "data-playlist-name")){
					obj.playlistName =  FWDUVPUtils.getAttributeValue(child, "data-playlist-name");
				}else{
					obj.playlistName = "not defined!";
				};
				
				self.cats_ar[i] = obj;
			}
			
			for(var i=0; i<self.totalCats; i++){
				var obj = {};
				var cat_el = null;
				child = catsChildren_ar[i];	
				cat_el = document.getElementById(FWDUVPUtils.getAttributeValue(child, "data-source"));
				
				try{
					cat_el.parentNode.removeChild(cat_el);
				}catch(e){};
			}
			
			try{self.categories_el.parentNode.removeChild(self.categories_el);}catch(e){};
			
			self.startAtPlaylist = self.props_obj.startAtPlaylist || 0;
			if(isNaN(self.startAtPlaylist)) self.startAtPlaylist = 0;
			//if(self.startAtPlaylist != 0) self.startAtPlaylist -= 1;
			if(self.startAtPlaylist < 0){
				self.startAtPlaylist = 0;
			}else if(self.startAtPlaylist > self.totalCats - 1){
				self.startAtPlaylist = self.totalCats - 1;
			}
			
			self.startAtVideo = self.props_obj.startAtVideo || 0; 
			self.playlistBottomHeight = self.props_obj.playlistBottomHeight || 0;
			self.playlistBottomHeight = Math.min(800, self.playlistBottomHeight);
		
			self.videoSourcePath_str = self.props_obj.videoSourcePath || undefined;
			self.timeColor_str = self.props_obj.timeColor || "#FF0000";
			
			self.youtubeQualityButtonNormalColor_str = self.props_obj.youtubeQualityButtonNormalColor || "#FF0000";
			self.youtubeQualityButtonSelectedColor_str = self.props_obj.youtubeQualityButtonSelectedColor || "#FF0000";
			self.posterBackgroundColor_str = self.props_obj.posterBackgroundColor || "transparent";
			
			self.showPlaylistButtonAndPlaylist_bl = self.props_obj.showPlaylistButtonAndPlaylist;
			self.showPlaylistButtonAndPlaylist_bl = self.showPlaylistButtonAndPlaylist_bl == "no" ? false : true;
			
			self.showPlaylistByDefault_bl = self.props_obj.showPlaylistByDefault;
			self.showPlaylistByDefault_bl = self.showPlaylistByDefault_bl == "no" ? false : true;
			
			self.showPlaylistName_bl = self.props_obj.showPlaylistName;
			self.showPlaylistName_bl = self.showPlaylistName_bl == "no" ? false : true;
			
			self.showSearchInput_bl = self.props_obj.showSearchInput;
			self.showSearchInput_bl = self.showSearchInput_bl == "no" ? false : true;
			
			self.forceDisableDownloadButtonForFolder_bl = self.props_obj.forceDisableDownloadButtonForFolder; 
			self.forceDisableDownloadButtonForFolder_bl = self.forceDisableDownloadButtonForFolder_bl == "yes" ? true : false;
				
			self.playlistPosition_str = self.props_obj.playlistPosition || "bottom";
			test = self.playlistPosition_str == "bottom" || self.playlistPosition_str == "right";		   
			if(!test) self.playlistPosition_str = "right";		
			
			self.folderVideoLabel_str = self.props_obj.folderVideoLabel || "Video ";
			
			self.logoPosition_str = self.props_obj.logoPosition || "topleft";
			self.logoPosition_str = String(self.logoPosition_str).toLowerCase();
			test = self.logoPosition_str == "topleft" 
					   || self.logoPosition_str == "topright"
					   || self.logoPosition_str == "bottomleft"
					   || self.logoPosition_str == "bottomright"; 
			if(!test) self.logoPosition_str = "topleft";
			
			self.thumbnailSelectedType_str = self.props_obj.thumbnailSelectedType || "opacity";
			if(self.thumbnailSelectedType_str != "blackAndWhite"  
				&& self.thumbnailSelectedType_str != "threshold" 
				&& self.thumbnailSelectedType_str != "opacity"){
				self.thumbnailSelectedType_str = "opacity";
			}
			if(self.isMobile_bl || FWDUVPUtils.isIEAndLessThen9)  self.thumbnailSelectedType_str = "opacity";
			if(document.location.protocol == "file:") self.thumbnailSelectedType_str = "opacity";
			
			self.adsButtonsPosition_str = self.props_obj.adsButtonsPosition || "left";
			self.adsButtonsPosition_str = String(self.adsButtonsPosition_str).toLowerCase();
			test = self.adsButtonsPosition_str == "left" 
					   || self.adsButtonsPosition_str == "right";
					 	   
			if(!test) self.adsButtonsPosition_str = "left";
			
			self.skipToVideoButtonText_str = self.props_obj.skipToVideoButtonText || "not defined";
			self.skipToVideoText_str = self.props_obj.skipToVideoText;
			
			self.adsTextNormalColor = self.props_obj.adsTextNormalColor || "#FF0000";
			self.adsTextSelectedColor = self.props_obj.adsTextSelectedColor || "#FF0000";
			self.adsBorderNormalColor_str = self.props_obj.adsBorderNormalColor || "#FF0000";
			self.adsBorderSelectedColor_str = self.props_obj.adsBorderSelectedColor || "#FF0000";
				
			self.volume = self.props_obj.volume;
			if(!self.volume) self.volume = 1;
			if(isNaN(self.volume)) volume = 1;
			if(self.volume > 1 || self.isMobile_bl){
				self.volume = 1;
			}else if(self.volume <0){
				self.volume = 0;
			}
			
			self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
			test = self.rightClickContextMenu_str == "developer" 
				   || self.rightClickContextMenu_str == "disabled"
				   || self.rightClickContextMenu_str == "default";
			if(!test) self.rightClickContextMenu_str = "developer";
			
			self.buttonsToolTipFontColor_str = self.props_obj.buttonsToolTipFontColor || "#FF0000";
			self.toolTipsButtonFontColor_str = self.props_obj.toolTipsButtonFontColor || "#FF0000";
			self.shareAndEmbedTextColor_str = self.props_obj.shareAndEmbedTextColor || "#FF0000";
			self.inputBackgroundColor_str = self.props_obj.inputBackgroundColor || "#FF0000";
			self.inputColor_str = self.props_obj.inputColor || "#FF0000";
			self.searchInputBackgroundColor_str = self.props_obj.searchInputBackgroundColor || "#FF0000";
			self.borderColor_str = self.props_obj.borderColor || "#FF0000";
			self.searchInputColor_str = self.props_obj.searchInputColor || "#FF0000";
			self.youtubeAndFolderVideoTitleColor_str = self.props_obj.youtubeAndFolderVideoTitleColor || "#FF0000";
			self.youtubeDescriptionColor_str = self.props_obj.youtubeDescriptionColor || "#FF0000"; 
			self.youtubeOwnerColor_str = self.props_obj.youtubeOwnerColor || "#FF0000";
			self.secondaryLabelsColor_str = self.props_obj.secondaryLabelsColor || "#FF0000"; 
			self.mainLabelsColor_str = self.props_obj.mainLabelsColor || "#FF0000"; 
			self.playlistBackgroundColor_str = self.props_obj.playlistBackgroundColor || "#FF0000"; 
			self.thumbnailNormalBackgroundColor_str = self.props_obj.thumbnailNormalBackgroundColor || "#FF0000"; 
			self.playlistNameColor_str = self.props_obj.playlistNameColor || "#FF0000"; 
			self.thumbnailHoverBackgroundColor_str = self.props_obj.thumbnailHoverBackgroundColor || "#FF0000"; 
			self.thumbnailDisabledBackgroundColor_str = self.props_obj.thumbnailDisabledBackgroundColor || "#FF0000"; 
			self.logoLink_str = self.props_obj.logoLink || "none"; 
			
			self.nextAndPrevSetButtonsMargins = self.props_obj.nextAndPrevSetButtonsMargins || 0;
			self.buttonsMargins = self.props_obj.buttonsMargins || 0; 
			self.thumbnailMaxWidth = self.props_obj.thumbnailMaxWidth || 330; 
			self.thumbnailMaxHeight = self.props_obj.thumbnailMaxHeight || 330;
			self.horizontalSpaceBetweenThumbnails = self.props_obj.horizontalSpaceBetweenThumbnails;
			self.verticalSpaceBetweenThumbnails = self.props_obj.verticalSpaceBetweenThumbnails;
			self.totalPlaylists = self.cats_ar.length;
			self.controllerHeight = self.props_obj.controllerHeight || 50;
			self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
			self.controllerHideDelay = self.props_obj.controllerHideDelay || 2;
			self.controllerHideDelay *= 1000;
			self.spaceBetweenButtons = self.props_obj.spaceBetweenButtons || 0;
			self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0;
			self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0;
			self.volumeScrubberOffsetTopWidth = self.props_obj.volumeScrubberOffsetTopWidth || 0;
			self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0;
			self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0;
			self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
			self.embedWindowCloseButtonMargins = self.props_obj.embedAndInfoWindowCloseButtonMargins || 0;
			self.logoMargins = self.props_obj.logoMargins || 0;
			self.maxPlaylistItems = self.props_obj.maxPlaylistItems || 50;
			self.volumeScrubberHeight = self.props_obj.volumeScrubberHeight || 10;
			self.volumeScrubberOfsetHeight = self.props_obj.volumeScrubberOfsetHeight || 0;
			if(self.volumeScrubberHeight > 200) self.volumeScrubberHeight = 200;
			self.buttonsToolTipHideDelay = self.props_obj.buttonsToolTipHideDelay || 1.5;
			self.thumbnailWidth = self.props_obj.thumbnailWidth || 80;
			self.thumbnailWidth = Math.min(150, self.thumbnailWidth);
			self.thumbnailHeight = self.props_obj.thumbnailHeight || 80;
			self.spaceBetweenThumbnails = self.props_obj.spaceBetweenThumbnails || 0;
			self.thumbnailHeight = Math.min(150, self.thumbnailHeight);
			self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
			self.scrollbarOffestWidth = self.props_obj.scrollbarOffestWidth || 0;
			self.scollbarSpeedSensitivity = self.props_obj.scollbarSpeedSensitivity || .5;
			self.facebookAppId_str = self.props_obj.facebookAppId;
			
			if(self.isMobile_bl) self.allowToChangeVolume_bl = false;
			
			self.showContextMenu_bl = self.props_obj.showContextMenu; 
			self.showContextMenu_bl = self.showContextMenu_bl == "no" ? false : true;
			
			self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTips; 
			self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
			if(self.isMobile_bl) self.showButtonsToolTip_bl = false;
			
			self.showButtonsToolTip_bl = self.props_obj.showButtonsToolTip; 
			self.showButtonsToolTip_bl = self.showButtonsToolTip_bl == "no" ? false : true;
			if(self.isMobile_bl) self.showButtonsToolTip_bl = false;
			
			self.addKeyboardSupport_bl = self.props_obj.addKeyboardSupport; 
			self.addKeyboardSupport_bl = self.addKeyboardSupport_bl == "no" ? false : true;
			
			self.addMouseWheelSupport_bl = self.props_obj.addMouseWheelSupport; 
			self.addMouseWheelSupport_bl = self.addMouseWheelSupport_bl == "no" ? false : true;
		
			self.autoPlay_bl = self.props_obj.autoPlay; 
			self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
			if(FWDUVPUtils.isMobile) self.autoPlay_bl = false;
			
			self.showNextAndPrevButtons_bl = self.props_obj.showNextAndPrevButtons; 
			self.showNextAndPrevButtons_bl = self.showNextAndPrevButtons_bl == "no" ? false : true;
			
			self.showPlaylistsButtonAndPlaylists_bl = self.props_obj.showPlaylistsButtonAndPlaylists;
			self.showPlaylistsButtonAndPlaylists_bl = self.showPlaylistsButtonAndPlaylists_bl == "no" ? false : true;
			
			self.showEmbedButton_bl = self.props_obj.showEmbedButton;
			self.showEmbedButton_bl = self.showEmbedButton_bl == "no" ? false : true;
			
			self.showPlaylistsByDefault_bl = self.props_obj.showPlaylistsByDefault; 
			self.showPlaylistsByDefault_bl = self.showPlaylistsByDefault_bl == "yes" ? true : false;
			
			self.loop_bl = self.props_obj.loop; 
			self.loop_bl = self.loop_bl == "yes" ? true : false;
			
			self.shuffle_bl = self.props_obj.shuffle; 
			self.shuffle_bl = self.shuffle_bl == "yes" ? true : false;
			
			self.showLoopButton_bl = self.props_obj.showLoopButton; 
			self.showLoopButton_bl = self.props_obj.showLoopButton == "no" ? false : true;
			
			self.showShuffleButton_bl = self.props_obj.showShuffleButton; 
			self.showShuffleButton_bl = self.props_obj.showShuffleButton == "no" ? false : true;
			
			self.showDownloadVideoButton_bl = self.props_obj.showDownloadButton; 
			self.showDownloadVideoButton_bl = self.showDownloadVideoButton_bl == "no" ? false : true;
			
			self.showInfoButton_bl = self.props_obj.showInfoButton; 
			self.showInfoButton_bl = self.showInfoButton_bl == "no" ? false : true;
		
			self.showLogo_bl = self.props_obj.showLogo; 
			self.showLogo_bl = self.showLogo_bl == "yes" ? true : false;
			
			self.hideLogoWithController_bl = self.props_obj.hideLogoWithController;
			self.hideLogoWithController_bl = self.hideLogoWithController_bl == "yes" ? true : false;
			
			self.showPoster_bl = self.props_obj.showPoster; 
			self.showPoster_bl = self.showPoster_bl == "yes" ? true : false;
			
			self.showVolumeButton_bl = self.props_obj.showVolumeButton; 
			self.showVolumeButton_bl = self.showVolumeButton_bl == "no" ? false : true;
			if(self.isMobile_bl) self.showVolumeButton_bl = false;
			
			self.showVolumeScrubber_bl = self.showVolumeButton_bl;
			
			self.showControllerWhenVideoIsStopped_bl = self.props_obj.showControllerWhenVideoIsStopped; 
			self.showControllerWhenVideoIsStopped_bl = self.showControllerWhenVideoIsStopped_bl == "yes" ? true : false;
			
			self.showNextAndPrevButtonsInController_bl = self.props_obj.showNextAndPrevButtonsInController; 
			self.showNextAndPrevButtonsInController_bl = self.showNextAndPrevButtonsInController_bl == "yes" ? true : false;
			
			self.showTime_bl = self.props_obj.showTime; 
			self.showTime_bl = self.showTime_bl == "no" ? false : true;
			
			self.showFullScreenButton_bl = self.props_obj.showFullScreenButton; 
			self.showFullScreenButton_bl = self.showFullScreenButton_bl == "no" ? false : true;
			
			self.showFullScreenButton_bl = self.props_obj.showFullScreenButton; 
			self.showFullScreenButton_bl = self.showFullScreenButton_bl == "no" ? false : true;
			
			self.repeatBackground_bl = self.props_obj.repeatBackground; 
			self.repeatBackground_bl = self.repeatBackground_bl == "no" ? false : true;
			
			self.showFacebookButton_bl = self.props_obj.showFacebookButton; 
			self.showFacebookButton_bl = self.showFacebookButton_bl == "no" ? false : true;
			
			self.openNewPageAtTheEndOfTheAds_bl =  self.props_obj.openNewPageAtTheEndOfTheAds;
			self.openNewPageAtTheEndOfTheAds_bl = self.openNewPageAtTheEndOfTheAds_bl == "yes" ? true : false;
			
			self.playAdsOnlyOnce_bl =  self.props_obj.playAdsOnlyOnce;
			self.playAdsOnlyOnce_bl = self.playAdsOnlyOnce_bl == "yes" ? true : false;
			
			self.startAtRandomVideo_bl =  self.props_obj.startAtRandomVideo;
			self.startAtRandomVideo_bl = self.startAtRandomVideo_bl == "yes" ? true : false;
			
			self.stopVideoWhenPlayComplete_bl =  self.props_obj.stopVideoWhenPlayComplete;
			self.stopVideoWhenPlayComplete_bl = self.stopVideoWhenPlayComplete_bl == "yes" ? true : false;
			
			
			if(self.showFacebookButton_bl && !self.facebookAppId_str){
				setTimeout(function(){
					if(self == null) return;
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Parameter <font color='#FFFFFF'>facebookAppId</font> is required in the constructor, this represents the facebook app id, for more info read the documetation"});
				}, 50);
				return;
			}
			
			self.showYoutubeQualityButton_bl = self.props_obj.showYoutubeQualityButton; 
			self.showYoutubeQualityButton_bl = self.showYoutubeQualityButton_bl == "no" ? false : true;
			if(FWDUVPlayer.useYoutube == "no" || self.isMobile_bl) self.showYoutubeQualityButton_bl = false;
			
			self.logoPath_str = self.skinPath_str + "logo.png";
			if(self.props_obj.logoPath) self.logoPath_str = self.props_obj.logoPath;
			
			self.mainPreloader_img = new Image();
			self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler;
			self.mainPreloader_img.onload = self.onPreloaderLoadHandler;
			self.mainPreloader_img.src = self.skinPath_str + "preloader.jpg";
			
			self.skinPaths_ar = [
			     {img:self.prevN_img = new Image(), src:self.skinPath_str + "prev-video.png"},
                 {img:self.nextN_img = new Image(), src:self.skinPath_str + "next-video.png"},
                 {img:self.playN_img = new Image(), src:self.skinPath_str + "play.png"},
                 {img:self.pauseN_img = new Image(), src:self.skinPath_str + "pause.png"},
                 {img:self.mainScrubberBkLeft_img = new Image(), src:self.skinPath_str + "scrubber-left-background.png"},
                 {img:self.mainScrubberDragLeft_img = new Image(), src:self.skinPath_str + "scrubber-left-drag.png"},
                 {img:self.mainScrubberLine_img = new Image(), src:self.skinPath_str + "scrubber-line.png"},
                 {img:self.volumeN_img = new Image(), src:self.skinPath_str + "volume.png"},
                 {img:self.progressLeft_img = new Image(), src:self.skinPath_str + "progress-left.png"},
                 {img:self.largePlayN_img = new Image(), src:self.skinPath_str + "large-play.png"},
                 {img:self.categoriesN_img = new Image(), src:self.skinPath_str + "categories-button.png"},
                 {img:self.replayN_img = new Image(), src:self.skinPath_str + "replay-button.png"},
                 {img:self.shuffleN_img = new Image(), src:self.skinPath_str + "shuffle-button.png"},
                 {img:self.fullScreenN_img = new Image(), src:self.skinPath_str + "full-screen.png"},
                 {img:self.ytbQualityN_img = new Image(), src:self.skinPath_str + "youtube-quality.png"},
                 {img:self.facebookN_img = new Image(), src:self.skinPath_str + "facebook.png"},
                 {img:self.infoN_img = new Image(), src:self.skinPath_str + "info-button.png"},
                 {img:self.downloadN_img = new Image(), src:self.skinPath_str + "download-button.png"},
                 {img:self.normalScreenN_img = new Image(), src:self.skinPath_str + "normal-screen.png"},
                 {img:self.embedN_img = new Image(), src:self.skinPath_str + "embed.png"},
                 {img:self.embedColoseN_img = new Image(), src:self.skinPath_str + "embed-close-button.png"},
                 {img:self.skipIconPath_img = new Image(), src:self.skinPath_str + "skip-icon.png"}
			];
			
			//setup skin paths
			self.prevSPath_str = self.skinPath_str + "prev-video-over.png"; 
			self.nextSPath_str = self.skinPath_str + "next-video-over.png"; 
			self.playSPath_str = self.skinPath_str + "play-over.png"; 
			self.pauseSPath_str = self.skinPath_str + "pause-over.png";
			self.bkMiddlePath_str = self.skinPath_str + "controller-middle.png";
			self.hdPath_str = self.skinPath_str + "hd.png";
			self.youtubeQualityArrowPath_str = self.skinPath_str + "youtube-quality-arrow.png";
			self.ytbQualityButtonPointerPath_str = self.skinPath_str + "youtube-quality-pointer.png";
			self.controllerBkPath_str = self.skinPath_str + "controller-background.png";
			self.skipIconSPath_str = self.skinPath_str + "skip-icon-over.png";
			self.adsBackgroundPath_str = self.skinPath_str + "ads-background.png";

			self.mainScrubberBkRightPath_str = self.skinPath_str + "scrubber-right-background.png";
			self.mainScrubberBkMiddlePath_str = self.skinPath_str + "scrubber-middle-background.png";
			self.mainScrubberDragMiddlePath_str = self.skinPath_str + "scrubber-middle-drag.png";
		
			self.volumeScrubberBkBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-background.png"; 
			self.volumeScrubberBkMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-background.png";
			self.volumeScrubberBkTopPath_str = self.skinPath_str + "volume-scrubber-top-background.png";
			self.volumeScrubberDragBottomPath_str = self.skinPath_str + "volume-scrubber-bottom-drag.png";
			self.volumeScrubberLinePath_str = self.skinPath_str + "volume-scrubber-line.png";
			self.volumeScrubberDragMiddlePath_str = self.skinPath_str + "volume-scrubber-middle-drag.png";	
		
			self.volumeSPath_str = self.skinPath_str + "volume-over.png";
			self.volumeDPath_str = self.skinPath_str + "volume-disabled.png";
			self.categoriesSPath_str = self.skinPath_str + "categories-button-over.png";
			self.replaySPath_str = self.skinPath_str + "replay-button-over.png";
			self.toopTipBk_str = self.skinPath_str + "tooltip-background.png"; 
			self.toopTipPointer_str = self.skinPath_str + "tooltip-pointer.png"; 
			self.shufflePathS_str = self.skinPath_str + "shuffle-button-over.png";
			
			self.largePlayS_str = self.skinPath_str + "large-play-over.png";
			self.fullScreenSPath_str = self.skinPath_str + "full-screen-over.png";
			self.ytbQualitySPath_str = self.skinPath_str + "youtube-quality-over.png";
			self.ytbQualityDPath_str = self.skinPath_str + "youtube-quality-hd.png";
			self.facebookSPath_str = self.skinPath_str + "facebook-over.png";
			self.infoSPath_str = self.skinPath_str + "info-button-over.png";
			self.downloadSPath_str = self.skinPath_str + "download-button-over.png";
			self.normalScreenSPath_str = self.skinPath_str + "normal-screen-over.png";
			self.progressMiddlePath_str = self.skinPath_str + "progress-middle.png";
			self.embedPathS_str = self.skinPath_str + "embed-over.png";
			self.embedWindowClosePathS_str = self.skinPath_str + "embed-close-button-over.png"; 
			self.embedWindowInputBackgroundPath_str = self.skinPath_str + "embed-window-input-background.png";
			self.embedCopyButtonNPath_str = self.skinPath_str + "embed-copy-button.png";
			self.embedCopyButtonSPath_str = self.skinPath_str + "embed-copy-button-over.png";
			self.sendButtonNPath_str = self.skinPath_str + "send-button.png";
			self.sendButtonSPath_str = self.skinPath_str + "send-button-over.png";
			self.embedWindowBackground_str = self.skinPath_str + "embed-window-background.png";
			
			if(self.showPlaylistsButtonAndPlaylists_bl){
				self.skinPaths_ar.push(
				    {img:self.catNextN_img = new Image(), src:self.skinPath_str + "categories-next-button.png"},
				    {img:self.catPrevN_img = new Image(), src:self.skinPath_str + "categories-prev-button.png"},
				    {img:self.catCloseN_img = new Image(), src:self.skinPath_str + "categories-close-button.png"},
				    {img:new Image(), src:self.skinPath_str + "categories-background.png"}
				);
				self.catBkPath_str = self.skinPath_str + "categories-background.png"; 
				self.catThumbBkPath_str = self.skinPath_str + "categories-thumbnail-background.png"; 
				self.catThumbBkTextPath_str = self.skinPath_str + "categories-thumbnail-text-backgorund.png"; 
				self.catNextSPath_str = self.skinPath_str + "categories-next-button-over.png"; 
				self.catPrevSPath_str = self.skinPath_str + "categories-prev-button-over.png"; 
				self.catCloseSPath_str = self.skinPath_str + "categories-close-button-over.png"; 
			}
			
			if(self.showPlaylistButtonAndPlaylist_bl){
				var prevThumbsSetNPath_str;
				
				self.playlistThumbnailsBkPath_str = self.skinPath_str + "playlist-thumbnail-background.png";
				self.playlistBkPath_str = self.skinPath_str + "playlist-background.png";
				
				if(self.playlistPosition_str == "bottom"){
					self.skinPaths_ar.push(
					    {img:self.hidePlaylistN_img = new Image(), src:self.skinPath_str + "hide-horizontal-playlist.png"},
					    {img:self.showPlaylistN_img = new Image(), src:self.skinPath_str + "show-horizontal-playlist.png"}
					);
					self.hidePlaylistSPath_str = self.skinPath_str + "hide-horizontal-playlist-over.png"; 
					self.showPlaylistSPath_str = self.skinPath_str + "show-horizontal-playlist-over.png"; 
				}else{
					self.skinPaths_ar.push(
					    {img:self.hidePlaylistN_img = new Image(), src:self.skinPath_str + "hide-vertical-playlist.png"},
					    {img:self.showPlaylistN_img = new Image(), src:self.skinPath_str + "show-vertical-playlist.png"}
					);
					self.hidePlaylistSPath_str = self.skinPath_str + "hide-vertical-playlist-over.png"; 
					self.showPlaylistSPath_str = self.skinPath_str + "show-vertical-playlist-over.png"; 
				}
				
				self.skinPaths_ar.push(
				    {img:self.scrBkTop_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-background-top.png"},
				    {img:self.scrDragTop_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-drag-top.png"},
				    {img:self.scrLinesN_img = new Image(), src:self.skinPath_str + "playlist-scrollbar-lines.png"}
				);
				
				self.scrBkMiddlePath_str = self.skinPath_str + "playlist-scrollbar-background-middle.png";
				self.scrBkBottomPath_str = self.skinPath_str + "playlist-scrollbar-background-bottom.png";
				self.scrDragMiddlePath_str = self.skinPath_str + "playlist-scrollbar-drag-middle.png";
				self.scrDragBottomPath_str = self.skinPath_str + "playlist-scrollbar-drag-bottom.png";
				self.scrLinesSPath_str = self.skinPath_str + "playlist-scrollbar-lines-over.png";
				self.inputArrowPath_str = self.skinPath_str + "input-arrow.png";
			}
			
			self.totalGraphics = self.skinPaths_ar.length;
			self.loadSkin();
		};
		
		//####################################//
		/* Preloader load done! */
		//###################################//
		this.onPreloaderLoadHandler = function(){
			setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PRELOADER_LOAD_DONE);
			}, 50);
		};
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<self.totalGraphics; i++){
				img = self.skinPaths_ar[i].img;
				src = self.skinPaths_ar[i].src;
				img.onload = self.onSkinLoadHandler;
				img.onerror = self.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		this.onSkinLoadHandler = function(e){
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages == self.totalGraphics){
				setTimeout(function(){
					self.dispatchEvent(FWDUVPData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		self.onSkinLoadErrorHandler = function(e){
			if (FWDUVPUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FFFFFF'>" + e.target.src + "</font> can't be loaded, check path!";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, err);
			}, 50);
		};
		
		//##########################################//
		/* Download video */
		//##########################################//
		this.downloadVideo = function(sourcePath, pName){
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Downloading video files local is not allowed or possible! To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(!sourcePath){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Not allowed to download this video!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(String(sourcePath.indexOf(".mp4")) == -1){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Only mp4 video files hosted on your server can be downloaded."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			pName = pName.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
			if(pName.length > 40) pName = pName.substr(0, 40) + "...";
			if(!(/\.(video)$/i).test(pName)) pName+='.mp4';
		
			if(sourcePath.indexOf("http:") == -1){
				
				var path_ar = sourcePath.split(",");
				sourcePath = path_ar[0];
		
				sourcePath = sourcePath.substr(sourcePath.indexOf("/") + 1);
				sourcePath = encodeURIComponent(sourcePath);
			};
			
			var url = self.videoDownloaderPath_str;
			if(!self.dlIframe){
				self.dlIframe = document.createElement("IFRAME");
				self.dlIframe.style.display = "none";
				document.documentElement.appendChild(self.dlIframe);
			}
			
			if(self.isMobile_bl){
			
				var email = self.getValidEmail();
				if(!email) return;
				
				if(self.emailXHR != null){
					try{self.emailXHR.abort();}catch(e){}
					self.emailXHR.onreadystatechange = null;
					self.emailXHR.onerror = null;
					self.emailXHR = null;
				}
				
				self.emailXHR = new XMLHttpRequest();
				
				self.emailXHR.onreadystatechange = function(e){
					if(self.emailXHR.readyState == 4){
						if(self.emailXHR.status == 200){
							if(self.emailXHR.responseText == "sent"){
								alert("Email sent.");
							}else{
								alert("Error sending email, this is a server side error, the php file can't send the email!");
							}
							
						}else{
							alert("Error sending email: " + self.emailXHR.status + ": " + self.emailXHR.statusText);
						}
					}
				};
				
				self.emailXHR.onerror = function(e){
					try{
						if(window.console) console.log(e);
						if(window.console) console.log(e.message);
					}catch(e){};
					alert("Error sending email: " + e.message);
				};

				self.emailXHR.open("get", self.mailPath_str + "?mail=" + email + "&name=" + pName + "&path=" + sourcePath, true);
				self.emailXHR.send();
				return;
			}
		
			self.dlIframe.src = url + "?path="+ sourcePath +"&name=" + pName;
		};
		
		this.getValidEmail = function(){
			var email = prompt("Please enter your email address where the video download link will be sent:");
			var emailRegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
			while(!emailRegExp.test(email) || email == ""){
				if(email === null) return;
				email = prompt("Please enter a valid email address:");
			}
			return email;
		};
		
		//####################################//
		/* load playlist */
		//####################################//
		this.loadPlaylist = function(id){
			self.stopToLoadPlaylist();
			
			if(self.isPlaylistDispatchingError_bl) return;
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			var source = self.catsRef_ar[id];
		
			if(source === undefined){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"<font color='#FFFFFF'>loadPlaylist()</font> - Please specify a DOM playlist id or youtube playlist id!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			if(source === null){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"The playlist with id <font color='#FFFFFF'>" + self.cats_ar[id].source + "</font> is not found in the DOM."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
		
			if(!isNaN(source)){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"<font color='#FFFFFF'>loadPlaylist()</font> - The parameter must be of type string!"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			self.resetYoutubePlaylistLoader();
			self.isYoutbe_bl = false;
			
			if(!source.length){
				self.parseDOMPlaylist(source, self.cats_ar[id].source);	
			}else if(source.indexOf("list=") != -1 && self.useYoutube_bl){
				self.isYoutbe_bl = true;
				self.loadYoutubePlaylist(source);
			}else if(source.indexOf("list=") != -1 && !self.useYoutube_bl){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Loading youtube playlist is only possible if <font color='#FFFFFF'>FWDUVPlayer.useYoutube=\"yes\"</font>."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}else if(source.indexOf("folder=") != -1){
				self.loadFolderPlaylist(source);
			}else if(source.indexOf(".xml") != -1
			  || source.indexOf("http:") != -1
			  || source.indexOf("https:") != -1
			  || source.indexOf("www.") != -1
			){
				self.loadXMLPlaylist(source);
			}
		};
		
		//#######################################//
		/* load XML playlist (warning this will will work only online on a web server,
		 * it is not working local!) */
		//######################################//
		this.loadXMLPlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Loading XML files local is not allowed or possible!. To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			
			self.loadFromFolder_bl = false;
			self.sourceURL_str = url;
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.proxyPath_str + "?url=" +  self.sourceURL_str + "&rand=" + parseInt(Math.random() * 99999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"XML file can't be loaded! <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. " + message });
			}
		};
		
		//#######################################//
		/* load folder */
		//######################################//
		this.loadFolderPlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl) return;
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Creating a video playlist from a folder is not allowed or possible local! To function properly please test online."});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}	
			
			
			self.loadFromFolder_bl = true;
			self.sourceURL_str = url.substr(url.indexOf("=") + 1);
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.ajaxOnLoadHandler;
			self.xhr.onerror = self.ajaxOnErrorHandler;
			
			try{
				self.xhr.open("get", self.proxyFolderPath_str + "?dir=" +  encodeURIComponent(self.sourceURL_str) + "&videoLabel=" + self.folderVideoLabel_str  + "&rand=" + parseInt(Math.random() * 9999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"});
			}
		};
		
		//##########################################//
		/* load youtube list */
		//##########################################//
		this.loadYoutubePlaylist = function(url){
			if(self.isPlaylistDispatchingError_bl && !self.isYoutbe_bl) return;
			
			if(!self.youtubeUrl_str){
				url = url.substr(url.indexOf("=") + 1);
				self.youtubeUrl_str = url;
			}
		
			
			self.loadFromFolder_bl = true;
			
			if(self.nextPageToken_str){
				self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist";
			}else{
				self.sourceURL_str = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=" + parent.instanceName_str + ".data.parseYoutubePlaylist";
			}
			
			if(self.scs_el == null){
				try{
					self.scs_el = document.createElement('script');
					self.scs_el.src = self.sourceURL_str;
					self.scs_el.id = parent.instanceName_str + ".data.parseYoutubePlaylist";
					document.documentElement.appendChild(self.scs_el);
				}catch(e){}
			}
			self.JSONPRequestTimeoutId_to = setTimeout(self.JSONPRequestTimeoutError, 6000);
		
		};
		
		this.JSONPRequestTimeoutError = function(){
			self.stopToLoadPlaylist();
			self.isPlaylistDispatchingError_bl = true;
			showLoadPlaylistErrorId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading youtube playlist!<font color='#FFFFFF'>" + self.youtubeUrl_str + "</font>"});
				self.isPlaylistDispatchingError_bl = false;
			}, 50);
			return;
		};
		
		this.resetYoutubePlaylistLoader = function(){
			self.isYoutbe_bl = false;
			self.youtubeObject_ar = null;
			self.nextPageToken_str = null;
			self.youtubeUrl_str = null;
		};
		
		//######################################//
		/* Handle ajax response */
		//######################################//
		this.ajaxOnErrorHandler = function(e){
			try{
				if(window.console) console.log(e);
				if(window.console) console.log(e.message);
			}catch(e){};
			if(self.loadFromFolder_bl){
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file : <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>. Make sure the path is correct"});
			}else{
				self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file : <font color='#FFFFFF'>" + self.proxyPath_str + "</font>. Make sure the path is correct"});
			}
		};
		
		this.ajaxOnLoadHandler = function(e){
			var response;
			var isXML = false;
			
			if(self.xhr.readyState == 4){
				if(self.xhr.status == 404){
					if(self.loadFromFolder_bl){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Folder proxy file path is not found: <font color='#FFFFFF'>" + self.proxyFolderPath_str + "</font>"});
					}else{
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Proxy file path is not found: <font color='#FFFFFF'>" + self.proxyPath_str + "</font>"});
					}
					
				}else if(self.xhr.status == 408){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Proxy file request load timeout!"});
				}else if(self.xhr.status == 200){
					if(self.xhr.responseText.indexOf("<b>Warning</b>:") != -1){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading folder: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure that the folder path is correct!"});
						return;
					}
					
					if(window.JSON){
						response = JSON.parse(self.xhr.responseText);
					}else{
						response = eval('('+ self.xhr.responseText +')');
					}
					
					if(response.folder){
						self.parseFolderJSON(response);
					}else if(response.li){
						self.parseXML(response);
					}else if(response.error){//this applies only with proxy (xml and poscast)
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Error loading file: <font color='#FFFFFF'>" + self.sourceURL_str + "</font>. Make sure the file path (xml or podcast) is correct and well formatted!"});
					}
				}
			}
		};
		
		this.parseYoutubePlaylist = function(object){
			
			if(self.isPlaylistDispatchingError_bl || !self.isYoutbe_bl) return;
			
			if(object.error){
				self.JSONPRequestTimeoutError();
				if(console) console.dir(object);
				return;
			}
			
			self.playlist_ar = [];
			var tt;
			var item;
			var videoSource;
			
			if(!self.youtubeObject_ar){
				self.youtubeObject_ar = [];
			}
			
			for(var i=0; i<object.items.length; i++){
				self.youtubeObject_ar.push(object.items[i]);
			}
			
			tt = self.youtubeObject_ar.length;
			
			self.stopToLoadPlaylist();
			
			if(object.nextPageToken && tt < self.maxPlaylistItems){
				self.nextPageToken_str = object.nextPageToken;
				self.loadYoutubePlaylist();
				return;
			}
			
			for(var i=0; i< tt; i++){
				if(i > self.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = self.youtubeObject_ar[i];
				obj.videoSource = item.snippet.resourceId.videoId;
				obj.owner = item.snippet.channelTitle;
		
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + item.snippet.title + "</p>";
				obj.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + obj.owner + "</p>";
				
				obj.titleText = item.snippet.title;
				obj.desc = undefined;
				
				obj.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + item.snippet.title + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + item.snippet.description + "</p>";
			
				obj.downloadable = false;
				try{
					obj.thumbSource = item.snippet.thumbnails["default"].url;
				}catch(e){}
				obj.posterSource =  "none";
				
				if(item.snippet.title.indexOf("eleted video") == -1 && item.snippet.title.indexOf("his video is unavailable") == -1){
					self.playlist_ar.push(obj);
				}
			}
			
			/*
			for(var i=0; i< tt; i++){
				if(i > self.maxPlaylistItems - 1) break;
				
				var obj = {};
				item = object[i];
				
				videoSource = item.link[1].href.split("/");
				videoSource = videoSource[videoSource.length - 2];
				obj.videoSource = videoSource;
				try{obj.owner = item.media$group.media$credit[0].yt$display;}catch(e){};
				
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + item.title.$t + "</p>";
				if(obj.owner) obj.title += "<p style='color:" + self.youtubeOwnerColor_str + ";margin:0px;padding:0px;margin-top:6px;margin-bottom:4x;line-height:16px;'>by " + obj.owner + "</p>";
				
				obj.titleText = item.title.$t;
				obj.desc = undefined;
				
				try{
					obj.desc = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:10px;margin-top:12px;margin-bottom:0px;padding:0px;'>" + obj.titleText + "</p><p style='color:" + self.youtubeDescriptionColor_str + ";margin:0;padding:10px;padding-top:8px;line-height:16px;'>" + item.media$group.media$description.$t + "</p>";
				}catch(e){};
				
				
				obj.downloadable = false;
				obj.thumbSource = "http://img.youtube.com/vi/"+ videoSource +"/default.jpg";
				obj.posterSource =  "none";
				
				if(item.link[1].href.indexOf("related") != -1 
				   && item.yt$accessControl[5].permission != "denied"){
					self.playlist_ar.push(obj);
				}
			}
			*/
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		this.closeJsonPLoader = function(){
			clearTimeout(self.JSONPRequestTimeoutId_to);
		};
		
		//##########################################//
		/* parse DOM playlist */
		//##########################################//
		this.parseDOMPlaylist = function(element, id){
			if(self.isPlaylistDispatchingError_bl) return;
		
			var children_ar = FWDUVPUtils.getChildren(element);
			var totalChildren = children_ar.length;
			var child;
			self.playlist_ar = [];
			
			if(totalChildren == 0){
				showLoadPlaylistErrorId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"At least one video is required in the playlist with id: <font color='#FFFFFF'>" + id + "</font>"});
					self.isPlaylistDispatchingError_bl = false;
				}, 50);
				return;
			}
			
			for(var i=0; i<totalChildren; i++){
				var obj = {};
				var adsObj;
				child = children_ar[i];
				
				if(!FWDUVPUtils.hasAttribute(child, "data-thumb-source")){
					self.isPlaylistDispatchingError_bl = true;
					showLoadPlaylistErrorId_to = setTimeout(function(){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-thumb-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(!FWDUVPUtils.hasAttribute(child, "data-video-source")){
					self.isPlaylistDispatchingError_bl = true;
					showLoadPlaylistErrorId_to = setTimeout(function(){
						self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"Attribute <font color='#FFFFFF'>data-video-source</font> is required in the playlist at position <font color='#FFFFFF'>" + (i + 1)});
					}, 50);
					return;
				}
				
				if(i > self.maxPlaylistItems - 1) break;
				
				obj.thumbSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-thumb-source"));
				obj.videoSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-video-source"));
				if(FWDUVPUtils.hasAttribute(child, "data-poster-source")){
					obj.posterSource = encodeURI(FWDUVPUtils.getAttributeValue(child, "data-poster-source"));
				}else{
					obj.posterSource = "none";
				}

				obj.downloadPath = obj.videoSource;
				
				if(FWDUVPUtils.hasAttribute(child, "data-downloadable") && self.showDownloadVideoButton_bl){
					obj.downloadable = FWDUVPUtils.getAttributeValue(child, "data-downloadable") == "yes" ? true : false;
					if(obj.videoSource.indexOf(".") ==  -1)  obj.downloadable = false;
				}else{
					obj.downloadable = false;
				}
			
				var descChidren_ar = FWDUVPUtils.getChildren(child);
				var descChild;
				obj.title = "not defined!";
				obj.titleText = "not defined!";
				
				for(var k=0; k<descChidren_ar.length; k++){
					descChild = descChidren_ar[k];	
					if(FWDUVPUtils.hasAttribute(descChild, "data-video-short-description")){
						obj.title =  descChild.innerHTML;
						if(FWDUVPUtils.isIEAndLessThen9){
							obj.titleText = descChild.innerText;
						}else{
							obj.titleText = descChild.textContent;
						}
						
					}else if(FWDUVPUtils.hasAttribute(descChild, "data-video-long-description")){
						obj.desc = descChild.innerHTML;
					}
				}
				
				if(FWDUVPUtils.hasAttribute(child, "data-ads-source")){
					adsObj = {};
					adsObj.source = FWDUVPUtils.getAttributeValue(child, "data-ads-source");
					adsObj.pageToOpen = FWDUVPUtils.getAttributeValue(child, "data-ads-page-to-open-url");
					adsObj.pageTarget = FWDUVPUtils.getAttributeValue(child, "data-ads-page-target") || "_blank";
					adsObj.timeToHoldAds = parseInt(FWDUVPUtils.getAttributeValue(child, "data-time-to-hold-ads")) || 0;
					obj.ads = adsObj;
				}
			
				self.playlist_ar[i] = obj;
			}
					
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* parse folder JSON */
		//####################################//
		this.parseFolderJSON = function(response){
			self.playlist_ar = [];
			var obj;
			var obj_ar = response.folder;
			var counter = 0;
		
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				obj.videoSource = encodeURI(obj_ar[i]["@attributes"]["data-video-path"]);
				obj.thumbSource = encodeURI(obj_ar[i]["@attributes"]["data-thumb-path"]);
				obj.posterSource = encodeURI(obj_ar[i]["@attributes"]["data-poster-path"]);
				obj.downloadPath = encodeURIComponent(obj_ar[i]["@attributes"]["download-path"]);
				
				obj.downloadable = self.showDownloadVideoButton_bl;
				if(self.forceDisableDownloadButtonForFolder_bl) obj.downloadable = false;
				
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.title = "<p style='color:" + self.youtubeAndFolderVideoTitleColor_str + ";margin:0px;padding:0px;margin-top:2px;margin-bottom:4x;line-height:16px;'>" + obj_ar[i]["@attributes"]["data-title"] + "</p>";
				
				obj.desc = undefined;
				
				self.playlist_ar[i] = obj;
				if(i > self.maxPlaylistItems - 1) break;
			}
			
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* parse xml JSON */
		//####################################//
		this.parseXML = function(response){
			self.playlist_ar = [];
			var obj;
			var obj_ar = response.li;
			
			if(!obj_ar.length) obj_ar = [obj_ar];
			
			for(var i=0; i<obj_ar.length; i++){
				obj = {};
				
				obj.videoSource = encodeURI(obj_ar[i]["@attributes"]["data-video-source"]);
				obj.downloadPath = obj.videoSource;
				obj.downloadable = obj_ar[i]["@attributes"]["data-downloadable"] == "yes" ? true : false;
				if(obj.videoSource.indexOf(".") == -1) obj.downloadable = false;
				obj.posterSource = encodeURI(obj_ar[i]["@attributes"]["data-poster-source"]);
				obj.thumbSource = obj_ar[i]["@attributes"]["data-thumb-source"];
				obj.title = obj_ar[i]["@attributes"]["data-title"];
				obj.titleText = obj_ar[i]["@attributes"]["data-title"];
				obj.desc = obj_ar[i]["@attributes"]["data-desc"];
				
				if(obj_ar[i]["@attributes"]["data-ads-source"]){
					adsObj = {};
					adsObj.source = obj_ar[i]["@attributes"]["data-ads-source"];
					adsObj.pageToOpen = obj_ar[i]["@attributes"]["data-ads-page-to-open-url"];
					adsObj.pageTarget = obj_ar[i]["@attributes"]["data-ads-page-target"] || "_blank";
					adsObj.timeToHoldAds = obj_ar[i]["@attributes"]["data-time-to-hold-ads"]  || 0;
					obj.ads = adsObj;
				}
			
				self.playlist_ar[i] = obj;
				if(i > self.maxPlaylistItems - 1) break;
			}
			
			clearTimeout(self.dispatchPlaylistLoadCompleteWidthDelayId_to);
			self.dispatchPlaylistLoadCompleteWidthDelayId_to = setTimeout(function(){
				self.dispatchEvent(FWDUVPData.PLAYLIST_LOAD_COMPLETE);
			}, 50);
	
			self.isDataLoaded_bl = true;
		};
		
		//####################################//
		/* stop to load current playlist... */
		//####################################//
		this.stopToLoadPlaylist = function(){
			self.closeJsonPLoader();
			try{
				self.scs_el.src = null;
				document.documentElement.removeChild(self.scs_el);
				self.scs_el = null;
			}catch(e){}
			
			if(self.xhr != null){
				try{self.xhr.abort();}catch(e){}
				self.xhr.onreadystatechange = null;
				self.xhr.onerror = null;
				self.xhr = null;
			}
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			self.dispatchEvent(FWDUVPData.LOAD_ERROR, {text:"The property called <font color='#FFFFFF'>" + error + "</font> is not defined."});
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDUVPData.setPrototype = function(){
		FWDUVPData.prototype = new FWDUVPEventDispatcher();
	};
	
	FWDUVPData.prototype = null;
	
	FWDUVPData.PLAYLIST_LOAD_COMPLETE = "playlistLoadComplete";
	FWDUVPData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDUVPData.LOAD_DONE = "onLoadDone";
	FWDUVPData.LOAD_ERROR = "onLoadError";
	FWDUVPData.IMAGE_LOADED = "onImageLoaded";
	FWDUVPData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDUVPData.SKIN_PROGRESS = "onSkinProgress";
	FWDUVPData.IMAGES_PROGRESS = "onImagesPogress";
	
	window.FWDUVPData = FWDUVPData;
}(window));