/* thumbs manager */
(function(window){
	
	var FWDUVPVideoScreen = function(parent, volume){
		
		var self = this;
		var prototype = FWDUVPVideoScreen.prototype;
	
		this.video_el = null;
	
		this.sourcePath_str = null;
		
		this.bk_do = null;
		this.controllerHeight = parent.data.controllerHeight;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.lastPercentPlayed = 0;
		this.volume = volume;
		this.curDuration = 0;
		this.countNormalMp3Errors = 0;
		this.countShoutCastErrors = 0;
		this.maxShoutCastCountErrors = 5;
		this.maxNormalCountErrors = 1;
		
		this.disableClickForAWhileId_to;
		this.showErrorWithDelayId_to;
		
		this.disableClick_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = true;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.hasPlayedOnce_bl = false;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isMobile_bl = FWDUVPUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setBkColor(parent.videoBackgroundColor_str);
			self.setupVideo();
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupVideo = function(){
			if(self.video_el == null){
				self.video_el = document.createElement("video");
				self.screen.appendChild(self.video_el);
				self.video_el.controls = false;
				self.video_el.volume = self.volume;
				self.video_el.style.position = "absolute";
				self.video_el.style.pointerEvent = "none";
				self.video_el.style.left = "0px";
				self.video_el.style.top = "0px";
				self.video_el.style.backfaceVisibility = "hidden";
				self.video_el.style.width = "100%";
				self.video_el.style.height = "100%";
				self.video_el.style.margin = "0px";
				self.video_el.style.padding = "0px";
				self.video_el.style.maxWidth = "none";
				self.video_el.style.maxHeight = "none";
				self.video_el.style.border = "none";
				self.video_el.style.lineHeight = "0";
				self.video_el.style.msTouchAction = "none";
				self.screen.appendChild(self.video_el);
			}
			
			self.video_el.addEventListener("error", self.errorHandler);
			self.video_el.addEventListener("canplay", self.safeToBeControlled);
			self.video_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.video_el.addEventListener("progress", self.updateProgress);
			self.video_el.addEventListener("timeupdate", self.updateVideo);
			self.video_el.addEventListener("pause", self.pauseHandler);
			self.video_el.addEventListener("play", self.playHandler);
			if(!FWDUVPUtils.isIE){
				self.video_el.addEventListener("waiting", self.startToBuffer);
			}
			self.video_el.addEventListener("playing", self.stopToBuffer);
			self.video_el.addEventListener("ended", self.endedHandler);
			self.resizeAndPosition();
		};	
		
		
		this.destroyVideo = function(){
			clearTimeout(self.showErrorWithDelayId_to);
			if(self.video_el){
				self.video_el.removeEventListener("error", self.errorHandler);
				self.video_el.removeEventListener("canplay", self.safeToBeControlled);
				self.video_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.video_el.removeEventListener("progress", self.updateProgress);
				self.video_el.removeEventListener("timeupdate", self.updateVideo);
				self.video_el.removeEventListener("pause", self.pauseHandler);
				self.video_el.removeEventListener("play", self.playHandler);
				if(!FWDUVPUtils.isIE){
					self.video_el.removeEventListener("waiting", self.startToBuffer);
				}
				self.video_el.removeEventListener("playing", self.stopToBuffer);
				self.video_el.removeEventListener("ended", self.endedHandler);
				if(self.isMobile_bl){	
					self.screen.removeChild(self.video_el);
					self.video_el = null;
				}else{
					self.video_el.style.visibility = "hidden";
					self.video_el.src = "";
					self.video_el.load();
				}
			}
		};
		
		this.startToBuffer = function(overwrite){
			self.dispatchEvent(FWDUVPVideoScreen.START_TO_BUFFER);
		};
		
		this.stopToBuffer = function(){
			self.dispatchEvent(FWDUVPVideoScreen.STOP_TO_BUFFER);
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			
			var error_str;
			self.hasError_bl = true;
			
			if(self.video_el.networkState == 0){
				error_str = "error 'self.video_el.networkState = 0'";
			}else if(self.video_el.networkState == 1){
				error_str = "error 'self.video_el.networkState = 1'";
			}else if(self.video_el.networkState == 2){
				error_str = "'self.video_el.networkState = 2'";
			}else if(self.video_el.networkState == 3){
				error_str = "source not found <font color='#FFFFFF'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.video_el.networkState);
			
			clearTimeout(self.showErrorWithDelayId_to);
			self.showErrorWithDelayId_to = setTimeout(function(){
					self.dispatchEvent(FWDUVPVideoScreen.ERROR, {text:error_str });
			}, 200);
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(width, height){
			if(width){
				self.stageWidth = width;
				self.stageHeight = height;
			}
			
			self.setWidth(self.stageWidth);
			if(FWDUVPUtils.isIphone){	
				self.setHeight(self.stageHeight - self.controllerHeight);
			}else{
				self.setHeight(self.stageHeight);
			}
			
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			self.sourcePath_str = sourcePath;
			if(self.video_el) self.stop();
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			FWDUVPlayer.curInstance = parent;
			if(self.isStopped_bl){
				self.isPlaying_bl = false;
				self.hasError_bl = false;
				self.allowScrubing_bl = false;
				self.isStopped_bl = false;
				self.setupVideo();
				self.setVolume();
				self.video_el.src = self.sourcePath_str;
				self.play();
				self.startToBuffer(true);
				self.isPlaying_bl = true;
			}else if(!self.video_el.ended || overwrite){
				try{
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.video_el.play();
					if(FWDUVPUtils.isIE) self.dispatchEvent(FWDUVPVideoScreen.PLAY);
				}catch(e){};
			}
		};

		this.pause = function(){
			if(self == null || self.isStopped_bl || self.hasError_bl) return;
			if(!self.video_el.ended){
				try{
					self.video_el.pause();
					self.isPlaying_bl = false;
					if(FWDUVPUtils.isIE) self.dispatchEvent(FWDUVPVideoScreen.PAUSE);
				}catch(e){};
			}
		};
		
		this.togglePlayPause = function(){
			if(self == null) return;
			if(!self.isSafeToBeControlled_bl) return;
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
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			self.dispatchEvent(FWDUVPVideoScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDUVPVideoScreen.START);
				self.isStartEventDispatched_bl = true;
			}
			self.dispatchEvent(FWDUVPVideoScreen.PLAY);
		};
		
		this.endedHandler = function(){
			self.dispatchEvent(FWDUVPVideoScreen.PLAY_COMPLETE);
		};
		
		this.stop = function(overwrite){
			if((self == null || self.video_el == null || self.isStopped_bl) && !overwrite) return;
			//logger.log("# VID stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			self.destroyVideo();
			self.dispatchEvent(FWDUVPVideoScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			self.dispatchEvent(FWDUVPVideoScreen.STOP);
			self.stopToBuffer();
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			self.stopToScrub();
			if(!self.isSafeToBeControlled_bl){
				self.hasHours_bl = Math.floor(self.video_el.duration / (60 * 60)) > 0;
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				self.video_el.style.visibility = "visible";
				self.dispatchEvent(FWDUVPVideoScreen.SAFE_TO_SCRUBB);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(self.video_el.buffered.length > 0){
				buffered = self.video_el.buffered.end(self.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.video_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDUVPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		this.updateVideo = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.video_el.currentTime /self.video_el.duration;
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.video_el.duration);
			var curTime = self.formatTime(self.video_el.currentTime);
			
			
			if(!isNaN(self.video_el.duration)){
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime, seconds:parseInt(self.video_el.currentTime)});
			}else{
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00", seconds:0});
			}
			
			self.lastPercentPlayed = percentPlayed;
			self.curDuration = curTime;
		};
		
		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent, e){
			//if(!self.allowScrubing_bl) return;
			if(e) self.startToScrub();
			try{
				self.video_el.currentTime = self.video_el.duration * percent;
				var totalTime = self.formatTime(self.video_el.duration);
				var curTime = self.formatTime(self.video_el.currentTime);
				self.dispatchEvent(FWDUVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		this.replay = function(){
			self.scrub(0);
			self.play();
		};
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.video_el) self.video_el.volume = self.volume;
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
	FWDUVPVideoScreen.setPrototype = function(){
		FWDUVPVideoScreen.prototype = new FWDUVPDisplayObject("div");
	};
	
	FWDUVPVideoScreen.ERROR = "error";
	FWDUVPVideoScreen.UPDATE = "update";
	FWDUVPVideoScreen.UPDATE_TIME = "updateTime";
	FWDUVPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDUVPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDUVPVideoScreen.START = "start";
	FWDUVPVideoScreen.PLAY = "play";
	FWDUVPVideoScreen.PAUSE = "pause";
	FWDUVPVideoScreen.STOP = "stop";
	FWDUVPVideoScreen.PLAY_COMPLETE = "playComplete";
	FWDUVPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDUVPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDUVPVideoScreen = FWDUVPVideoScreen;

}(window));