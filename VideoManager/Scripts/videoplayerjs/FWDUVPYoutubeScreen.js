/* thumbs manager */
(function(window){
	
	var FWDUVPYoutubeScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDUVPYoutubeScreen.prototype;
		
		this.videoHolder_do = null;
		this.ytb = null;
		
		this.lastQuality_str = "auto";
		
		this.volume = volume;
		
		this.updateVideoId_int;
		this.updatePreloadId_int;
		
		this.controllerHeight = parent.data.controllerHeight;
		this.hasHours_bl = false;
		this.hasBeenCreatedOnce_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = false;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isPausedInEvent_bl = true;
		this.isShowed_bl = true;
		this.isQualityArrayDisapatched_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.hasTransform3d_bl = false;
			self.hasTransform2d_bl = false;
			self.setBackfaceVisibility();
			parent.videoHolder_do.addChild(self);
			self.resizeAndPosition();
			self.setupVideo();
		};
	
		//###############################################//
		/* Setup youtube video */
		//##############################################//
		this.setupVideo = function(){
			if(self.ytb) return;
			
			self.videoHolder_do = new FWDUVPDisplayObject("div");
			self.videoHolder_do.hasTransform3d_bl = false;
			self.videoHolder_do.hasTransform2d_bl = false;
			self.videoHolder_do.screen.setAttribute("id", parent.instanceName_str + "youtube");
			self.videoHolder_do.getStyle().width = "100%";
			self.videoHolder_do.getStyle().height = "100%";
			self.videoHolder_do.setBackfaceVisibility();
			self.addChild(self.videoHolder_do);
			
			self.ytb = new YT.Player(parent.instanceName_str + "youtube", {
				width:"100%",
				height:"100%",
				playerVars:{
					controls:0,
					disablekb:0,
					loop:0,
					autoplay:0,
					wmode:"opaque",
					showinfo:0,
					rel:0,
					modestbranding:1,
					iv_load_policy:3,
					cc_load_policy :0,
					fs:0,
					html5:0
			  	},
			  	events: {
			  		"onReady":self.playerReadyHandler,
			  		"onError":self.playerErrorHandler,
			  		"onStateChange":self.stateChangeHandler,
			  		"onPlaybackQualityChange":self.qualityChangeHandler
			  	}
		    });
		};
		
		this.playerReadyHandler = function(){
			self.resizeAndPosition();
			self.dispatchEvent(FWDUVPYoutubeScreen.READY);
			self.hasBeenCreatedOnce_bl = true;
		};
		
		this.stateChangeHandler = function(e){
			//logger.log(e.data + " " + parent.instanceName_str + " " + self.isCued_bl)
			if(e.data == -1 && self.isCued_bl && self.isMobile_bl){
				self.isStopped_bl = false;
				FWDUVPlayer.stopAllVideos(parent);
			}
			
			if(e.data == YT.PlayerState.PLAYING){
				if(!self.isSafeToBeControlled_bl){
					self.isStopped_bl = false;
					self.isSafeToBeControlled_bl = true;
					self.isPlaying_bl = true;
					self.hasHours_bl = Math.floor(self.ytb.getDuration() / (60 * 60)) > 0;
					self.setVolume(self.volume);
					self.startToUpdate();
					self.startToPreload();
					self.scrub(0.00001);
					if(!self.isMobile_bl) self.setQuality(self.lastQuality_str);
					
					if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
						self.dispatchEvent(FWDUVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality(), levels:self.ytb.getAvailableQualityLevels()});
					}
				    self.dispatchEvent(FWDUVPYoutubeScreen.SAFE_TO_SCRUBB);
				}
				if(self.isPausedInEvent_bl) self.dispatchEvent(FWDUVPYoutubeScreen.PLAY);
				self.isPausedInEvent_bl = false;
				self.hasError_bl = false;
				
			}else if(e.data == YT.PlayerState.PAUSED){
				if(!self.isSafeToBeControlled_bl) return;
				self.isStopped_bl = false;
				if(!self.isPausedInEvent_bl) self.dispatchEvent(FWDUVPYoutubeScreen.PAUSE);
				self.isPausedInEvent_bl = true;
			}else if(e.data == YT.PlayerState.ENDED){
				if(self.ytb.getCurrentTime() && self.ytb.getCurrentTime() > 0){
					self.isStopped_bl = false;
					setTimeout(function(){self.dispatchEvent(FWDUVPYoutubeScreen.PLAY_COMPLETE);}, 100);
				}
			}else if(e.data == YT.PlayerState.CUED){
				if(!self.isStopped_bl){
					self.dispatchEvent(FWDUVPYoutubeScreen.CUED);
				}
				self.isCued_bl = true;
			}
		};
		
		this.qualityChangeHandler = function(e){
			if(self.ytb.getAvailableQualityLevels() && self.ytb.getAvailableQualityLevels().length != 0){
				self.dispatchEvent(FWDUVPYoutubeScreen.QUALITY_CHANGE, {qualityLevel:self.ytb.getPlaybackQuality()});
			}
		};
		
		this.playerErrorHandler = function(e){
			self.isPausedInEvent_bl = true;
			if(self.isStopped_bl || self.hasError_bl) return;
			var error_str = "";
			self.hasError_bl = true;
			if(e.data == 2){
				error_str = "The youtube id is not well formatted, make sure it has exactly 11 characters and that it dosn't contain invalid characters such as exclamation points or asterisks.";
			}else if(e.data == 5){
				error_str = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
			}else if(e.data == 100){
				error_str = "The youtube video request was not found, probably the video ID is incorrect.";
			}else if(e.data == 101 || e.data == 150){
				error_str = "The owner of the requested video does not allow it to be played in embedded players.";
			}
			self.dispatchEvent(FWDUVPYoutubeScreen.ERROR, {text:error_str});
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(){
			self.setWidth(parent.tempVidStageWidth);
			if(FWDUVPUtils.isIphone){	
				self.setHeight(parent.tempVidStageHeight - self.controllerHeight);
			}else{
				self.setHeight(parent.tempVidStageHeight);
			}
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			if(sourcePath) self.sourcePath_str = sourcePath;
			self.ytb.cueVideoById(self.sourcePath_str);
			//self.isStopped_bl = false;
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			
			FWDUVPlayer.curInstance = parent;
			self.isPlaying_bl = true;
			self.hasError_bl = false;
			try{
				self.ytb.playVideo();
				self.startToUpdate();
			}catch(e){}
			self.isStopped_bl = false;
		};

		this.pause = function(){
			if(self.isStopped_bl || self.hasError_bl) return;
			self.isPlaying_bl = false;
			try{
				self.ytb.pauseVideo();
			}catch(e){}
			self.stopToUpdate();
		};
		
		this.togglePlayPause = function(){
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		//###########################################//
		/* Updates ... */
		//###########################################//
		this.startToUpdate = function(){
			clearInterval(self.updateVideoId_int);
			self.updateVideoId_int = setInterval(self.updateVideo, 500);
		};
		
		this.stopToUpdate = function(){
			clearInterval(self.updateVideoId_int);
		};
		
		this.updateVideo = function(){
			var percentPlayed; 
			if(!self.ytb){
				stopToUpdate();
				return;
			}
			if (!self.allowScrubing_bl) {
				percentPlayed = self.ytb.getCurrentTime() /self.ytb.getDuration();
				self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.ytb.getDuration());
			var curTime = self.formatTime(self.ytb.getCurrentTime());
			
			self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE_TIME, {curTime:curTime , totalTime:totalTime, seconds:parseInt(self.ytb.getCurrentTime())});
		};
		
		this.startToPreload = function(){
			clearInterval(self.preloadVideoId_int);
			self.updatePreloadId_int = setInterval(self.updateProgress, 500);
		};
		
		this.stopToPreload = function(){
			clearInterval(self.updatePreloadId_int);
		};
		
		this.updateProgress = function(){
			if(!self.ytb){
				stopToPreload();
				return;
			}
			var buffered;
			var percentLoaded = self.ytb.getVideoLoadedFraction();
			
			self.dispatchEvent(FWDUVPYoutubeScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//###########################################//
		/* Event handlers */
		//###########################################//	
		this.stop = function(){
			if(self.isStopped_bl) return;
			//if(logger) logger.log("# YTB stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.isCued_bl = false;
			self.allowScrubing_bl = false;
			self.isSafeToBeControlled_bl = false;
			self.isQualityArrayDisapatched_bl = false;
			self.isPausedInEvent_bl = true;
			self.stopToUpdate();
			self.stopToPreload();
			self.stopVideo();
			self.dispatchEvent(FWDUVPYoutubeScreen.STOP);
			self.dispatchEvent(FWDUVPYoutubeScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDUVPYoutubeScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
		};
		
		this.destroyYoutube = function(){
			if(self.videoHolder_do){
				self.videoHolder_do.screen.removeAttribute("id", parent.instanceName_str + "youtube");
				self.videoHolder_do.destroy();
				self.videoHolder_do = null;
			}
			if(self.ytb) self.ytb.destroy();
			self.ytb = null;
		};
		
		this.stopVideo = function(){
			if(!self.isMobile_bl) self.ytb.cueVideoById(self.sourcePath_str);
			//self.ytb.seekTo(0);
			//self.ytb.clearVideo();
			//self.ytb.stopVideo();
		};

		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			if(!self.isSafeToBeControlled_bl) return;
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent){
			if(!self.isSafeToBeControlled_bl) return;
			self.ytb.seekTo(percent * self.ytb.getDuration());
		};
	
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.ytb) self.ytb.setVolume(vol * 100);
		};
		
		//###############################################//
		/* set quality */
		//###############################################//
		this.setQuality = function(quality){
			self.lastQuality_str = quality;
			self.ytb.setPlaybackQuality(quality);
		};
		
		this.formatTime = function(secs){
			var hours = Math.floor(secs / (60 * 60));
			
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    
		    if(isNaN(seconds)) return "00:00";
			if(self.hasHours_bl){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};
		
	
		this.init();
	};

	/* set prototype */
	FWDUVPYoutubeScreen.setPrototype = function(){
		FWDUVPYoutubeScreen.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPYoutubeScreen.READY = "ready";
	FWDUVPYoutubeScreen.ERROR = "error";
	FWDUVPYoutubeScreen.UPDATE = "update";
	FWDUVPYoutubeScreen.UPDATE_TIME = "updateTime";
	FWDUVPYoutubeScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDUVPYoutubeScreen.LOAD_PROGRESS = "loadProgress";
	FWDUVPYoutubeScreen.PLAY = "play";
	FWDUVPYoutubeScreen.PAUSE = "pause";
	FWDUVPYoutubeScreen.STOP = "stop";
	FWDUVPYoutubeScreen.PLAY_COMPLETE = "playComplete";
	FWDUVPYoutubeScreen.CUED = "cued";
	FWDUVPYoutubeScreen.QUALITY_CHANGE = "qualityChange";


	window.FWDUVPYoutubeScreen = FWDUVPYoutubeScreen;

}(window));