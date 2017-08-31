//Code to Track video.js events into Google Analytics
//Provided by LunaMetrics http://www.lunametrics.com @lunametrics 
//and Sayf Sharif @sayfsharif
//
//It may not be perfect, but it works
//version 1.0
//
//Don't forget to subscribe to our blog at http://www.lunametrics.com/blog/
//
//wait until the video is loaded and ready to go
//you should not have to modify anything in this file
//so long as you only have one video on your page to track.
//to use this code for a second player, copy it and modify the initial 
//myPlayer.ready(function(){ line to adjust myPlayer to the name of the
//player created on the page
//then adjust the var videoName = videoTitle; line to change
//videoTitle to match the variable established on the page as well
myPlayer.ready(function(){
	//reference the object so we can use it in this function easily
	var myPlayer = this;
	//set the name of the video for the GA trackEvent label from
	//the external variable
	var videoName = videoTitle;
	//play the video automatically on load
	//comment this out to not autoplay
	//myPlayer.play();
	
	/**************************************/
	/****MODIFY NOTHING BELOW THIS LINE****/
	/**************************************/
	
	//instantiate variables
	//these variables are used to determine later whether a user
	//is seeking to another spot in the video. Start them at 0.
	var seekStart = 0;
	var seekEnd = 0;
	//user doesn't start seeking, and the video isn't playing
	//set these as false
	var isUserSeeking = false;
	var isVideoPlaying = false;
	//the % timer flags haven't been hit yet.
	//these will mark how far a user gets through the video
	//and will fire automatically, but only once
	var time5 = false;
	var time10 = false;
	var time25 = false;
	var time50 = false;
	var time75 = false;
	var time95 = false;
 
	/****loadedmetadata Event****/
	
	//event for when the player first loads up
	var firstEvent = function(){
	  var myPlayer = this;
	  //where is the user (should be 0 here)
	  //how long is the total duration of the video
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //the video is now playing
	  isVideoPlaying = true;
	  //track the event
	  //console.log("category:video|action:loaded|label:"+videoName+"|value:"+whereYouAt);
	  _gaq.push(['_trackEvent', 'video', 'loaded', videoName, whereYouAt, true]);
	};
	//this calls the above function based on the event type loadedmetadata
	myPlayer.on("loadedmetadata", firstEvent);

	/****timeupdate Event****/
	
	//event for the timeupdate, which gets fired every 15-250ms automatically while playing
	var timeEvent = function(){
	  var myPlayer = this;
	  //where is the video currently at, and what is it's duration
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //what percent is it at of the total video duration
	  var percentThis = Math.round(whereYouAt/howLongIsThis*100);
	  //if it reaches the 5% mark fire this event
	  if(percentThis>=5&&!time5){
		//console.log("category:video|action:5%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '5%', videoName, whereYouAt, true]);
		time5=true;
	  }
	  //if it reaches 10% of the video
	  if(percentThis>=10&&!time10){
		//console.log("category:video|action:10%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '10%', videoName, whereYouAt, true]);
		time10=true;
	  }
	  //if it reaches 25%
	  if(percentThis>=25&&!time25){
		//console.log("category:video|action:25%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '25%', videoName, whereYouAt, true]);
		time25=true;
	  }
	  //if it reaches 50%
	  if(percentThis>=50&&!time50){
		//console.log("category:video|action:50%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '50%', videoName, whereYouAt, true]);
		time50=true;
	  }
	  //if it reaches 75%
	  if(percentThis>=75&&!time75){
		//console.log("category:video|action:75%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '75%', videoName, whereYouAt, true]);
		time75=true;
	  }
	  //if it reaches 95%
	  if(percentThis>=95&&!time95){
		//console.log("category:video|action:95%|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', '95%', videoName, whereYouAt, true]);
		time95=true;
	  }
	  //this event always gets fired, so we'll use it to detect "seek" behavior
	  //set the start to the previous end value
	  seekStart = seekEnd;
	  //set the end value to the current position
	  seekEnd = whereYouAt;
	  //if the difference between the start and the end are greater than 1 it indicates a seek 
	  //rather than just a regular movement. A seek of less than a second wouldn't be detected here
	  if(Math.abs(seekStart-seekEnd)>1){
		//user is seeking
		isUserSeeking = true;
		//fire events for seek start, and seek end with positions
		//console.log("category:video|action:seek start|label:"+videoName+"|value:"+seekStart);
		_gaq.push(['_trackEvent', 'video', 'seek start', videoName, seekStart, true]);
		//console.log("category:video|action:seek end|label:"+videoName+"|value:"+seekEnd);
		_gaq.push(['_trackEvent', 'video', 'seek end', videoName, seekEnd, true]);
	  }
	};
	//call the timeupdate function when the event fires (every 15-250ms)
	myPlayer.on("timeupdate", timeEvent);

	/****play Event****/
	
	//function for when the user hits play
	var playEvent = function(){
	  var myPlayer = this;
	  //current position of the player, and total duration
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //is the user seeking currently, and the video is not playing?
	  if(isUserSeeking&&!isVideoPlaying){
		//play after seek
		//console.log("category:video|action:play after seek|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', 'play after seek', videoName, whereYouAt, true]);
	  }else if(howLongIsThis>0&&isUserSeeking==false){
		//if the user isn't seeking, and the duration is set (so it's not the very start)
		//console.log("category:video|action:play|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', 'play', videoName, whereYouAt, true]);
	  }else if(whereYouAt==0){
		//console.log("category:video|action:autoplay|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', 'autoplay', videoName, whereYouAt, true]);
	  }
	  //set the video be playing, and the user to not be seeking
	  isVideoPlaying = true;
	  isUserSeeking = false;
	};
	//call the play function
	myPlayer.on("play", playEvent);
	
	/****pause Event****/
	
	//the pause event function
	var pauseEvent = function(){
	  var myPlayer = this;
	  //current position of the player, and total duration
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //set the video to NOT be playing
	  isVideoPlaying = false;
	  if(!isUserSeeking&&whereYouAt!=howLongIsThis){
		//the user is not seeking, and you are not at the very end of the file
		//console.log("category:video|action:pause|label:"+videoName+"|value:"+whereYouAt);
		_gaq.push(['_trackEvent', 'video', 'pause', videoName, whereYouAt, true]);
	  }
	};
	//fire the pause function
	myPlayer.on("pause", pauseEvent);

	/****ended Event****/
	
	//function for the end event
	var endEvent = function(){
	  var myPlayer = this;
	  //current position of the player, and total duration
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //the video is fully played, so it's stopped
	  isVideoPlaying = false;
	  //fire the 100% complete event
	  //console.log("category:video|action:100%|label:"+videoName+"|value:"+whereYouAt);
	  _gaq.push(['_trackEvent', 'video', '100%', videoName, whereYouAt, true]);
	};
	//fire the function above on the ended event
	myPlayer.on("ended", endEvent);

	/****error Event****/
	
	//function for the error event
	var errorEvent = function(){
	  var myPlayer = this;
	  //current position of the player, and total duration
	  var whereYouAt = Math.round(myPlayer.currentTime());
	  var howLongIsThis = Math.round(myPlayer.duration());
	  //record an error having happened in the player
	  //console.log("category:video|action:error|label:"+videoName+"|value:"+whereYouAt);
	  _gaq.push(['_trackEvent', 'video', 'error', videoName, whereYouAt, true]);
	};
	//fire the error function upon the error event
	myPlayer.on("error", errorEvent);

});
