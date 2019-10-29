var fileArray = new Array();
var numberOfFiles = 0;
var frontSideFileArray = new Array();

function UpDateFrontsideArray() {


    var selectedAllFileInputs = $('input[type=file]');

    $.each(selectedAllFileInputs, function (inputIndex, inputItem) {
        var fileArrayU = inputItem.files;
        $.each(fileArrayU, function (index, item) {
            frontSideFileArray.push(item.name);
        });
    });
    numberOfFiles = frontSideFileArray.length;
}
$(function () {

    $('#foom').slider();
	var tuser = userName;

	var uploadCounter = 0;
	var chunkFailCount = 0;
	var lastVideoLength = 0;
	var firstVideoLength = 0;
	var totalFileSize = 0;
	var i = 0;
	var totalVideoLength = 0;
	var videoDurationToSendToServer = 0;
	var globalStartTime = 0;
	var modalSortArray = [];
	var isResumable = false;
	var uploadStarted = false;
	var resumableUploadCounter = 0;
	var initializedResumableFileUI = false;
    var resumableUploadFileArray = []

	function UpDateFrontsideArray(e, data) {
		$.each(data.files, function (index, item) {
			frontSideFileArray[i] = item.name;
			i++;
		});
	}

	$('#fileupload').fileupload({
		dataType: 'json',
		url: '/video/chunkTest',
		maxChunkSize: 10000000,
		singleFileUploads: true,
		acceptFileTypes: /^[a-zA-Z0-9_]+\.[mM][pPOo][4Vv]$/,
		formData: { id: serviceIdSet },
		maxRetries: 4,
        retryTimeout: 1000,
        paramName: 'files[]', 
		fail: function (e, data) {
            //Would be cool if this worked! But got to much otherstuff to take care of at the moment.
		    //console.log("Line 56: fail override Code");
		    //// jQuery Widget Factory uses "namespace-widgetname" since version 1.10.0:
		    //var fu = $(this).data('blueimp-fileupload') || $(this).data('fileupload'),
            //    retries = data.context.data('retries') || 0,
            //    retry = function () {
            //        $.getJSON('/video/ResumeFileUpload', { file: data.files[0].name, id: serviceIdSet })
            //            .done(function (result) {
            //                var file = result.file;
            //                data.uploadedBytes = file && file.size;
            //                // clear the previous data:
            //                data.data = null;
            //                data.submit();
            //            })
            //            .fail(function () {
            //                fu._trigger('fail', e, data);
            //            });
            //    };
		    //if (data.errorThrown !== 'abort' &&
            //        data.uploadedBytes < data.files[0].size &&
            //        retries < fu.options.maxRetries) {
		    //    alert("Retrying!");
		    //    retries += 1;
		    //    data.context.data('retries', retries);
		    //    window.setTimeout(retry, retries * fu.options.retryTimeout);
		    //    return;
		    //}
		    //else
		    //{
		    //    if (data.errorThrown == 'abort')
		    //    {
		    //        failedUpload("User aborted upload", data);
		    //    }
		    //    if(data.uploadedBytes > data.files[0].size)
		    //    {
		    //        failedUpload("Failed, Retried Upload but the file on the server was bigger than the file on the client", data);
		    //    }
		    //    if (retries > fu.options.maxRetries)
		    //    {
		    //        failedUpload("Failed and reached maximum upload retries", data);
		    //    }
		       
		    //}
		    //data.context.removeData('retries');
		    //$.blueimp.fileupload.prototype
            //    .options.fail.call(this, e, data);
		}
	}).on('fileuploadchunksend', function (e, data) {
	    //send chunk
	
	}).on('fileuploadadded', function (e, data) {
	
	    totalFileSize = totalFileSize + data.files[0].size;
	    nextVideoUiChange();
	    if (totalFileSize > 3600000000)
	    {
	        sendFileSizeWarning()
	    }

        //Resumable file upload code
	        $.getJSON('/video/ResumeFileUpload', { file: data.files[0].name, id: serviceIdSet }, function (result) {
	            
	            var file = result.file;
	       
	            if (file != false)
	            {
	                
	                var clientFileSize = parseInt(data.files[0].size);
	                var currentFilesize = parseInt(file.size);
	                //If the file on the server is smaller than the user uploaded file, start where they left off.
	                var fileNameArrayLength = parseInt(file.fileNames.length)
	                if (clientFileSize > currentFilesize)
	                {
	                   
	                    if (file.fileNames.length > 0)
	                    {
	                       
	                        var clientFileNameFormatted = serviceIdSet+"_"+ tuser +"_uploading_"+ data.files[0].name;
	                        var locationOfFileInIndex = file.fileNames.indexOf(clientFileNameFormatted);
	                        //If the counter = length of filename array all files have been uploaded
	                     
	                        console.log("resume counter: " + resumableUploadCounter)
	                        if (fileNameArrayLength == resumableUploadCounter+1)
	                        {
                                //when calling this method and not passing anything it tells the method that we are done adding files
	                            showResumableUploadMessage();
	                           
	                        }
	                        else
	                        {
	                            //If there are multiple files this gets called, and passes the name of the next file the user should upload
	                            if (locationOfFileInIndex +1 < fileNameArrayLength)
	                            {
	                               
	                                var nextFile = file.fileNames[locationOfFileInIndex + 1];
	                                console.log("NExt File: " + nextFile);
	                                showResumableUploadMessage(nextFile);
	                                resumableUploadFileArray.push(locationOfFileInIndex)
	                            }
	                            else
	                            {
	                                //This only happens if the user doesn't upload the files in the correct order.
	                                if(resumableUploadFileArray.length<file.fileNames.length)
	                                {
                                        //If this happens there is only two files, and they uploaded the second one first.
	                                    if (resumableUploadFileArray.length == 0)
	                                    {
	                                        var nextFile = file.fileNames[0];
	                                        showResumableUploadMessage(nextFile, true);
	                                        resumableUploadFileArray.push(0);
	                                    }
	                                    else {
	                                        Array.min = function (array) {
	                                            return Math.min.apply(Math, array);
	                                        };
	                                        var minimum = Array.min(resumableUploadFileArray);

	                                        if (minimum > 0) {
	                                          
	                                            var nextFile = file.fileNames[minimum - 1];
	                                            showResumableUploadMessage(nextFile, true);
	                                            resumableUploadFileArray.push(minimum - 1);
	                                        }
	                                    }
	                                 
	                                }
	                            }
	                          
	                        }
	                       
	                        resumableUploadCounter++;
	                    }
	                    else
	                    {
	                    
	                        showResumableUploadMessage();
	                    }
	                   
	                    isResumable = true;


	                    data.uploadedBytes = currentFilesize;
	                    videoDurationToSendToServer = file.duration;
	                    globalStartTime = file.startPoint;

	              
	                    var currentFiles = setModalArray();

	                    $("#dismissResumable").click(function () {
	                        data.uploadedBytes = 0;
	                    });
	                }
	         
	            }
	        });
	}).on('fileuploadprocessfail', function (e, data) {
	    //remove video from preview
	    //Hacky way of finding it, being the preview has no unique id
	    var fileNameContainer = $('.videoContainer:contains("' + data.files[0].name + '")');
	    fileNameContainer.remove();
	    //tell user what's going on
	    var errorText = data.files[0].error;
	    $('#instruction-header').text("Unsupported File Type");
	    $('#instruction-text').text(errorText);
	    $('.alert-info').addClass('alert-danger').removeClass('alert-info');
	    $("#instruction-header").css("border-bottom", "2px solid black");
	    $('.alert-danger').hide().delay(400).fadeIn();
	}).on('fileuploadchunkdone', function (e, data) {
	    //chunk done
	var ariaVal = $("#blueimp-progress-bar-container").attr("aria-valuenow");
	var percent = ariaVal.toString() + "%";
	$("#custom-progress-bar").css("width", percent);
})
.on('fileuploadchunkfail', function (e, data, status) {
	//chunk fail
	chunkFailCount++;
	if(chunkFailCount >1000)
	{
	    failedUpload("chunk upload fail 1000 times", data);
	}
}).on('fileuploaddone', function (e, data) {
	var returnedFile = userName + "_" + data.result.files;
	uploadCounter++;
	//This File Upload Done method fires every time that a file finishes uploading we only want this to fire once all the files have been uploaded 
    //So this code below gets the number of files on the page and matches it with the number of times this method has been executed
	var videoIn = parseInt($("#videoIn").val());
	if (videoIn === "")
	{
		videoIn = 0;
	}
	if (uploadCounter == numberOfFiles)
	{
	    sendInfoToServer(modalSortArray, globalStartTime, videoDurationToSendToServer);
		applyCompletedStyles();
	}
}).on('fileuploadfail', function (e, data) {
    console.log("Line 250: fileuploadfail Code");
    failedUpload("file upload fail", data);
}).on('fileuploadchange', function (e, data) {
	$.each(data.files, function (index, item) {
		frontSideFileArray[i] = item.name;
		i++;
	});
	

}).on('fileuploadstart', function (e, data) {
    console.log("start data ");
    console.log(data);
	numberOfFiles = $(".name").length;
	var middleVideos = 0;
	//Loop through all the videos to get the duration.
	var len = $('video').length;
	$.each($('video'), function (vidIndex, val) {

		//Get last video length
	    if (vidIndex == len - 1 && len>1) {
			lastVideoLength = parseInt(val.duration);
		}
		else {   //Get First Video Length
	        if (vidIndex == 0) {

				firstVideoLength = parseInt(val.duration-1);
			}
				//get middle videos length
			else {
				middleVideos = middleVideos + parseInt(val.duration);
			}
		}
	});
	var videoIn = parseInt($("#videoIn").val());
	if (videoIn === "") {
		videoIn = 0;
	}
	var videoEnd = parseInt($("#videoOut").val());
	if (videoEnd === ""||videoEnd==0) {
	    videoEnd = lastVideoLength - 1;
	}
    modalSortArray = setModalArray();

    console.log("Video In: " + videoIn);
    console.log("Video End: " + videoEnd);
    if (modalSortArray.length > 1)
    {
       
        var remainingDurationOfFirstVideo = firstVideoLength - videoIn;
        var duration = videoEnd + remainingDurationOfFirstVideo + middleVideos;
    }
    else {
        
        duration = videoEnd - videoIn;
    }
    console.log("Video Duration: " + duration);

	if (videoDurationToSendToServer == 0)
	{
	   
	    videoDurationToSendToServer = duration;
	}
	
	if (globalStartTime == 0)
	{
	    globalStartTime = videoIn;
	}
	
	sendFileInfoToServer(videoIn, duration, modalSortArray);

});
	function applyCompletedStyles()
	{
		$("#custom-progress-bar").removeClass("active");
		$("#custom-progress-bar").removeClass("progress-bar-striped");
		$(".alert-danger").remove();
		$('a').off('click.myDisable');
		$(".save-button").show();
		$('.upload-done-circle').show();
		$(".custom-progress-bar-wrap").html('<span class="glyphicon glyphicon-ok-circle"></span><div class="progress"><div class="progress-bar progress-bar-success" id="custom-progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>');
	}
	function nextVideoUiChange() {
	    $('.alert-danger').addClass('alert-info').removeClass('alert-danger');
	    $("#instruction-header").css("border-bottom", "2px solid #31708f");
	    var currentWidth = $(".video-modal-dialog").width();
	    modalWidth = 0;

	    $("video").each(function (index) {
	       // $(this).addClass("dynamic-video");
	        modalWidth = $(this).width() + modalWidth + 310;
	    });

	    var windowWidth = $(window).width() - 50;
	    $(".alert-info").css("max-width", windowWidth);
	    //Prevent modal width from getting really small in certain circumstances
	    if (modalWidth > 500)
	    {
	        $(".video-modal-dialog").css("width", modalWidth);
	    }
	    $(".video-modal-body").css("overflow", "scroll");
	    var windowWidth = $(window).width();
	    $(".video-modal-footer").css("max-width", windowWidth - 25);
	    $("#videoFinish").text("Done Adding Videos");
	    $('#next-video-text').text("Upload Next Video");
	    $('#instruction-header').text("Upload Next Video");
	    $('#instruction-text').text('If your service is contained in two or more videos click "Upload Next Video"');
        $("#videoFinish").show();

	
	}
	function showResumableUploadMessage(nextFileName, showFileArrangmentWarning)
	{
	    $("#videoFinish").hide();
	    $('#instruction-header').text("We have detected you have tried to upload this video before");
	    $('#instruction-text').html('We will begin uploading the files where you left off. If you would like to start over, or if you have not uploaded a video to this service click "Cancel Resumable Upload"');
	    if (initializedResumableFileUI == false)
	    {

	        $('.bootstrapAlertToggle').addClass('alert-warning').removeClass('alert-info');
	        $("#UiReset").hide();
	        $("#videoFinish").hide();
	        $("<span class=\"btn btn-lg btn-danger\" id=\"dismissResumable\" style=\"float:left\">Cancel Resumable Upload</button>").insertBefore(".upload-next");
	        //Ignore resumable upload if chosen by the user
	        $("#dismissResumable").click(function () {
	            $('#fileupload').fileupload({ uploadedBytes: 0 });
	            isResumable = false;
	            $('.bootstrapAlertToggle').addClass('alert-info').removeClass('alert-warning');
	            $('#instruction-header').text("Upload Next Video");
	            $('#instruction-text').text('If your service is contained in two or more videos click "Upload Next Video"');
	            $(".startUpload").hide();
	            $(".startUpload").text("Start Upload");
	            $(".upload-next").show();
	            $("#dismissResumable").hide();
	            $("#FileArrangmentWarning").hide();
	            $("#videoFinish").show();
	            $("#UiReset").show();
	        });
	        initializedResumableFileUI = true;
	    }
	 
	    if (showFileArrangmentWarning == true)
	    {
	        $("<p class=\"text-danger\" id=\"FileArrangmentWarning\" style=\"margin-top:-8px; display: none;\">*The files are not in the orignal upload order. Please confirm the files are in the correct order. If they are not in the correct order, double click on a video and drag it to the correct position.</p>").insertBefore("#startUpload");
	    }

	    if (nextFileName == null)
	    {
	        $("#FileArrangmentWarning").show();
	        $(".startUpload").show();
	        $(".startUpload").text("Resume Upload");
	        $(".startUpload").addClass("btn-lg");
	        $(".startUpload").css("margin-bottom", "15px");
	        $(".upload-next").hide();
	    }
	    else
	    {
	        var clientFileName = nextFileName.substring(nextFileName.indexOf("uploading_")+10)
	        $("#next-video-text").text("Upload " + clientFileName);

	    }
	
	}
	function sendFileSizeWarning()
	{
	    $('.alert-info').addClass('alert-danger').removeClass('alert-info');
	    $('#instruction-header').text("Very Large File Warning");
	   // $('#instruction-text').html('Warning you are attempting to upload a very large file. Currently the only browser that supports an upload this big is Google Chrome. If you are using Chrome please continue, if not <a href="https://www.google.com/chrome/browser/desktop/"> click here</a> to download. Then navigate back to this page using the Google Chrome Browser');
	}

	$(".simulateFail").click(function () {
	    failedUpload("simulated", null);
	});
    function updateServerProgress()
	{

    }
    function sendFileInfoToServer(startTime, endTime, fileArray)
    {
        var postUrl = "/video/SetStartPoint";
        console.log("Sending file info to the server");
        console.log(fileArray);
        var postData = { id: serviceIdSet, startPoint: startTime, endPoint: endTime, fileurls: fileArray };

            var posting = $.ajax({
                url: postUrl,
                type: "POST",
                dataType: "json",
                traditional: true,
                data: postData
        });
            posting.done(function (json, responseText, jsonResponse) {

            });
            posting.error(function (jqXHR, textStatus, errorThrown) {

            });
            return;

    }
	function failedUpload(orgin, data)
	{
	    $("#custom-progress-bar").removeClass("active");
	    $("#custom-progress-bar").removeClass("progress-bar-striped");
	    $(".alert-danger").remove();
	    $("video").remove();
	    $(".video-upload-container:first").html('<div class="alert alert-danger" role="alert"><h2>Service Upload Failed!</h2>Check your internet connection, refresh this page, and try uploading again. If you have tried this three times please contact support.</span></div>');
	    $('a').off('click.myDisable');
	    $("#blueimpCancel").click();
	    $('#fileupload').fileupload('destroy');
	    var jsonData = "No Json Data";
	    if (data != null)
	    {
	        try{
	            jsonData = JSON.stringify(data);
	        }
	        catch(e)
	        {
	            jsonData = data;
	        }
	      
	    }
	    var serviceId = "notSet";
	    if (serviceIdSet != null)
	    {
	        serviceId = serviceIdSet;
	    }

		sendErrorToServer("Error uploading service:" + serviceId + " Orgin of Error:" + orgin + " UserName:" + userName + " Json Data:" + jsonData);
		renameFailFiles(frontSideFileArray);
	}

	//******processing
    function setModalArray() {
        var modalSort = $(".name");
        modalSortArray.length = 0;
        $.each(modalSort, function (i, videoNames) {
            var videoName = videoNames.textContent;
            modalSortArray.push(serviceIdSet + "_" + userName + "_uploading_" + videoName);
        });
        return modalSortArray;
	}
 
    //function getUniqueFileNames(fileNameArray) {
    //    var postUrl = "/video/MakeUniqueFileNames";
    //    var postData = { fileNames: fileNameArray };

    //    var posting = $.ajax({
    //        url: postUrl,
    //        type: "POST",
    //        dataType: "json",
    //        traditional: true,
    //        data: postData
    //});
    //    posting.done(function (json, responseText, jsonResponse) {
    //        var returnedFileArray = jsonResponse.responseJSON.files;
    //        $('.fileinput-button').hide();
    //        sendInfoToServer(returnedFileArray, globalStartTime, videoDurationToSendToServer);
    //    });
    //    posting.error(function (jqXHR, textStatus, errorThrown) {


 
    //    });
    //    return;
    //}
    function renameFailFiles(fileNameArray) {
        var postUrl = "/video/FailFileUploadNames";
        var postData = { fileNames: fileNameArray };

        var posting = $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            traditional: true,
            data: postData
        });
        posting.done(function (json, responseText, jsonResponse) {

        });
        posting.error(function (jqXHR, textStatus, errorThrown) {
            failedUpload("rename Failed Files Post", errorThrown);

        });
        return;
    }

    function checkForDuplicateFiles(fileNameArray) {
        var postUrl = "/video/PreventDulicateFiles";
        var postData = { fileNames: fileNameArray, id: serviceIdSet, isResumable: isResumable };

        var posting = $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            traditional: true,
            data: postData
        });
        posting.done(function (json, responseText, jsonResponse) {
            $("#custom-progress-bar-container").show();
            $(".add-files-group").hide();
            $(".save-button").hide();
            $('#basicModal').modal('hide');
            $("body").prepend('<div id="upload-warning" class="alert alert-danger navbar-fixed-top" id="uploading-alert" role="alert" style="z-index: 10000;"><h4>Video Upload in Progress!</h4>Do not navigate away from this page, and ensure your computer is connected to the internet, and will not fall asleep.</div>');
            $(".start").click();
            $('a').on('click.myDisable', function (e) { e.preventDefault(); });
        });
        posting.error(function (jqXHR, textStatus, errorThrown) {
            failedUpload("rename Failed Files Post", errorThrown);

        });
        return;
    }

	$('#setIn').click(function () {
		var roundedTime = Math.round($('video:first').get(0).currentTime);
		$('#videoIn').val(roundedTime);
		$('#inHours').val(0);
		$('#inMinutes').val(0);
		$('#inSeconds').val(roundedTime).change();
		$("#setInDone").show();
		if($("video").length==1)
		{
		    $("#setInDone").text("Done")
		}
		else {
		    $("#setInDone").text("Done with first video")
		}
	});

	$('#setOut').click(function () {
		var roundedTime = Math.round($('video:last').get(0).currentTime);
		$('#videoOut').val(roundedTime);
		$('#outHours').val(0);
		$('#outMinutes').val(0);
		$('#outSeconds').val(roundedTime).change();
		if ($("video").length == 1)
		{
		    $("#setOutDone").text("Done")
		}
		else
		{
		    $("#setOutDone").text("Done with last video")
		}
		var videoCount = $("video").length;
		if (videoCount == 1) {
			var inpoint = $("#videoIn").val();
			var outpoint = $("#videoOut").val()
			inpoint = parseFloat(inpoint);
			outpoint = parseFloat(outpoint);
			if (inpoint > outpoint) {
				alert("Start point Can't be greater than end point");
			}
			else {
				$("#setOutDone").show();
			}
		}
		else {
			$("#setOutDone").show();
		}
	});

	$('#getLastVideo').click(function () {
		var roundedTime = Math.round($('video:last').get(0).currentTime);
		$('#videoOut').val(roundedTime);
		$('#outSeconds').val(roundedTime).change();
	});

	$('#getFirstVideo').click(function () {
		var roundedTime = Math.round($('video:first').get(0).currentTime);
		$('#videoIn').val(roundedTime);
		$('#inSeconds').val(roundedTime).change();
	});

	$("#inSeconds, #inMinutes, #inHours").change(function () {

	    var seconds = $("#inSeconds").val();
	    var minutes = 0;
	    var hours = 0;

	    if (seconds < 3600 && seconds > 60) {
	        minutes = seconds / 60;
	        seconds = seconds % 60;
	        minutes = Math.floor(minutes);
	        $("#inSeconds").val(seconds);
	        $("#inMinutes").val(minutes);
	        $("#inHours").val(0);
	    }
	    if (seconds >= 3600) {
	        minutes = seconds / 60;
	        seconds = seconds % 60;
	        minutes = Math.floor(minutes);

	        hours = minutes / 60;
	        minutes = minutes % 60;
	        hours = Math.floor(hours);

	        $("#inSeconds").val(seconds);
	        $("#inMinutes").val(minutes);
	        $("#inHours").val(hours);
	    }
	});
	$("#outSeconds, #outMinutes, #outHours").change(function () {
	    var seconds = $("#outSeconds").val();
	    var minutes = 0;
	    var hours = 0;

	    if (seconds < 3600 && seconds > 60) {
	        minutes = seconds / 60;
	        seconds = seconds % 60;
	        minutes = Math.floor(minutes);

	        $("#outSeconds").val(seconds);
	        $("#outMinutes").val(minutes);
	        $("#outHours").val(0);

	    }
	    if (seconds >= 3600) {
	        minutes = seconds / 60;
	        seconds = seconds % 60;
	        minutes = Math.floor(minutes);

	        hours = minutes / 60;
	        minutes = minutes % 60;
	        hours = Math.floor(hours);

	        $("#outSeconds").val(seconds);
	        $("#outMinutes").val(minutes);
	        $("#outHours").val(hours);
	    }
	});

	$("#inHours, #inMinutes, #inSeconds, #outHours, #outMinutes #outSeconds").keydown(function (e) {
	    // Allow: backspace, delete, tab, escape, enter and .
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	        // Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
	        // Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
	        // let it happen, don't do anything
	        return;
	    }
	    // Ensure that it is a number and stop the keypress
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	});

    //UI Data Modal Code
    //Select first file and open modal
	$(".time-container-end").hide();
	$(".time-container-start").hide();

    //Initializie jquery scroll

	var isIE = CheckForIE();
    if (isIE == true) {
        
	    //.mousemove is a really weird IE work around
	    $(".videoRow").draggable({ axis: 'x' }).mousemove(function (e) {
	        var yAxis = e.pageY - this.offsetTop;
	        if (yAxis > 300) {
	            $(this).draggable("option", "disabled", true);
	            $(this).removeClass("ui-draggable-disabled");
	            $(this).removeClass("ui-state-disabled");
	        }
	        else {
	            $(this).draggable("option", "disabled", false);
	        }
	    });
	}
	else {
	 // 
	}
    

    //When Clicking on Next video it opens a file picker, binds it to the file upload and makes the videos play nice with the jquery scroll
	$('#nextVideo').bind('change', function (e) {
	    $('#fileupload').fileupload('add', {
	        files: e.target.files || [{ name: this.value }],
	        fileInput: $(this)
        });
       
	});

	var OrderHasBeenSet = false;

    //Remove video on X click
	$(".video-modal-body").on("click", ".delete-circle", function () {
	    $(this).parent().remove();
	});

    //Walk through setting the order of the video
	$(".video-modal-body").on("click", "#videoFinish", function () {
	    $('.alert-danger').addClass('alert-info').removeClass('alert-danger');
	    $("#videoOrder").show();
	    $("#videoFinish").hide();
	    $(".upload-next").hide();
	    var isIe = CheckForIE();
	    //If only one video skip the video order functionality
        //Intiate sortable functionality
        //And draggable video
        if ($("video").length > 1 && isIe == false) {
            EnableDragAndDrop();
            $(".videoRow").draggable({ axis: 'x' });
	        $("#videoOrder").show();
	        $('#instruction-header').text("Ensure Videos Are in Correct Order");
	        $('#instruction-text').text('If the order is in correct, double click on a video and drag and drop the video into the correct order. If you have an extra video click the red X to remove it.');
	    }
	    else {
	        $("#videoOrder").hide();
	        $(".delete-circle").hide();
	        $(".time-container-start").show();
	        $('#instruction-header').text("Set Start Time");
	        $('#instruction-text').text('Play through the video, find the ideal start time, pause the video, and click "Set Start". ');
	        $("video:first").addClass("highlighted-video-item-active");
	        $("video:not(:first)").addClass("highlighted-video-item-disable");
	    }
	});
    //Walk through the set end and set beginning. 
	$(".video-modal-body").on("click", "#videoOrder", function () {
	    $(".videoContainer").removeClass("highlighted-video-item-active");
	    $(".videoContainer").removeClass("highlighted-video-item-disable");
	    $(".videoRow").sortable("disable");
	    $(".files").removeClass("ui-state-disabled");
	   // $(".videoRow").draggable('enable');
	    OrderHasBeenSet = true;
	    $("#videoOrder").hide();
	    $("#videoFinish").hide();
	    $(".upload-next").hide();
	    $(".delete-circle").hide();
	    $(".time-container-start").show();
	    $('#instruction-header').text("Set Start Time");
	    $('#instruction-text').text('Play through the first video, find the ideal start time, pause the video, and click "Set Start". ');
	    $("video:first").addClass("highlighted-video-item-active");
        $("video:not(:first)").addClass("highlighted-video-item-disable");
        $(".video-controls-container").show();
	});

	$(".video-modal-body").on("click", "#setInDone", function () {
	    $('#instruction-header').text("Set End Time");
	    if ($("video").length > 1) {
	        $('#instruction-text').text('Play through the last video, find the ideal end time, pause the video, and click "Set End". ');
	    }
	    else {
	        $('#instruction-text').text('Play through the video, find the ideal end time, pause the video, and click "Set End". ');
	    }
	    $(".time-container-end").show();
	    $(".time-container-start").hide();

	    $("video:first").removeClass("highlighted-video-item-active");
	    $("video:last").removeClass("highlighted-video-item-disable");
	    $("video:not(:last)").addClass("highlighted-video-item-disable");
	    $("video:last").addClass("highlighted-video-item-active");
	});
	$(".video-modal-body").on("click", "#setOutDone", function () {
	    $('#instruction-header').text("Begin Upload");
	    $('#instruction-text').text('We are ready to start the upload, please ensure your computer is plugged in and remain on this webpage until the video is done uploading.');
	    $(".time-container-end").hide();
	    $(".time-container-start").hide();
	    $("#setOutDone").hide();
	    $(".startUpload").show();
	    $("video:first").removeClass("highlighted-video-item-disable");
        $("video:last").removeClass("highlighted-video-item-active");
        $(".video-controls-container").hide();
	});
	$("body").on("click", "#testButton", function () {

	    var postUrl = "/video/sendemail";
	    var postData = { emailad:"email", subject:"subj", emailbod:"test button clicked"};

	    var posting = $.ajax({
	        url: postUrl,
	        type: "POST",
	        dataType: "json",
	        traditional: true,
	        data: postData
	    });
	    posting.done(function (json, responseText, jsonResponse) {

	    });
	});

    //Start Upload
	$(".video-modal-body").on("click", "#startUpload", function () {
	    var displayCounter = 0;
	    frontSideFileArray.forEach(function (file) {
	        if (displayCounter == 0) {
	            $("#display-file-names").append(file);
	        }
	        else {
	            $("#display-file-names").append("<br/>" + file);
	        }
	        displayCounter++;
	    });
	    checkForDuplicateFiles(frontSideFileArray);
	});
    //Reset Upload Modal
	$(".video-modal-body").on("click", "#UiReset", function () {
	    frontSideFileArray = [];
	    OrderHasBeenSet = false;
	    $("video").remove();
	    $(".videoContainer").remove();
	    $(".time-container-end").hide();
	    $(".time-container-start").hide();
	    $("#videoFinish").hide();
	    $("#videoOrder").hide();
	    $(".video-modal-dialog").css("width", 600);
	    $(".upload-next").show();
	    $('#instruction-header').text("Select Video Files:");
	    $('#instruction-text').text('Click the "Choose Video" button, and navigate to the video file of this service.');
	    $("#startUpload").hide();
	    $("#upload-next-text").text("Choose Video File");
	    $("#inSeconds").val(0);
	    $("#inMinutes").val(0);
	    $("#inHours").val(0);
	    $("#outSeconds").val(0);
	    $("#outMinutes").val(0);
	    $("#outHours").val(0);
	});

    //Video seek Buttons
    $("#video-previous-five").click(function () {
        currentTime = $('.highlighted-video-item-active').get(0).currentTime;
        if (currentTime > 4) {
            currentTime = currentTime - 4;
        }
        else {
            currentTime = 0;
        }
        $('.highlighted-video-item-active').get(0).currentTime = currentTime;
    });
    $("#video-previous-one").click(function () {
        currentTime = $('.highlighted-video-item-active').get(0).currentTime;
        if (currentTime > 1) {
            currentTime = currentTime - 1;
        }
        else {
            currentTime = 0;
        }
        $('.highlighted-video-item-active').get(0).currentTime = currentTime;
    });
    $("#video-next-one").click(function () {
        currentTime = $('.highlighted-video-item-active').get(0).currentTime;
        $('.highlighted-video-item-active').get(0).currentTime = currentTime+1;
    });
    $("#video-next-five").click(function () {
        currentTime = $('.highlighted-video-item-active').get(0).currentTime;
        $('.highlighted-video-item-active').get(0).currentTime = currentTime+5;
    });
    function EnableDragAndDrop()
    {
        if (!isIE) {
            var $ul = $(".videoRow"),
                $li = $ul.children();
            $ul.sortable({
                cancel: ".item-disabled"
            });
            var $ul = $(".videoRow"),
                $li = $ul.children();
            $ul.sortable({
                cancel: ".item-disabled",
                stop: function (event, ui) {
                    var start_pos = ui.item.data('start_pos');
                    if (start_pos != ui.item.index()) {
                        $(ui.item[0]).removeClass("highlighted-video-item-active")
                        // $(".videoRow").draggable('enable');
                        $ul.sortable('disable');
                    } else {
                        // the item was returned to the same position
                    }
                },
                start: function (event, ui) {
                    ui.item.data('start_pos', ui.item.index());
                }
            });
            $li.addClass('highlighted-video-item-disabled');

            //Drag and drop stuff
            $(".video-modal-body").on("dblclick", ".videoContainer", function () {
                //Only implement this functionality if user has NOT confirmed the order of the videos
                if (OrderHasBeenSet == false) {
                    if ($(this).hasClass("highlighted-video-item-active")) {
                        $(this).removeClass("highlighted-video-item-active")
                        // $(".videoRow").draggable('enable');
                        $ul.sortable('disable');
                    }
                    else {
                        if ($ul.find('.highlighted-video-item-active').length > 0) {
                            $ul.find('.highlighted-video-item-active').toggleClass("highlighted-video-item-active highlighted-video-item-disable");
                            $(this).addClass('highlighted-video-item-active');
                        }
                        else {
                            //$(".videoRow").draggable('disable');
                            $ul.sortable('enable');
                            $(this).addClass('highlighted-video-item-active');
                        }
                    }
                }
            });

        }
    };

	function CheckForIE() {

	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE ");

	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
	        return true;
	    else                 // If another browser, return 

	        return false;
	}
});

function sendInfoToServer(fileNames, videoIn, videoEnd) {
    if (isNaN(videoIn))
    {
		videoIn = 0;
	}
    if (isNaN(videoEnd))
    {
		videoEnd = 0;
    }
  
	var serviceId = serviceIdSet;
	var postUrl = "/video/uploaddetailsmulti/" + serviceId;
	fileNames = JSON.stringify(fileNames);
	$token = $('input[name="__RequestVerificationToken"]').val();
	var test = $('THolder');

	var postData = { fileurls: fileNames, inpoint: videoIn, outpoint: videoEnd };

	var posting = $.ajax({
		url: postUrl,
		type: "POST",
		dataType: "json",
		data: postData
	});
	posting.done(function (json, responseText, jsonResponse) {
		$("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
		$("#filePlaceHolder").addClass("col-lg-12");
		$("#filePlaceHolder").html("<div class=\"jumbotron\" style=\"border-radius:10px; color:black;\"><h1>Funeral successfully uploaded</h1><br>Our servers are now going to process the video, the viewing page should be ready in a few hours</p></div>");
		$('.color-container').hide();
	});
	posting.error(function (jqXHR, textStatus, errorThrown) {
		sendErrorToServer("An error occured when posting to videouploaddetails multi. Service ID:" + serviceId + " Video In:" + videoIn + " Video Out:" + videoEnd + " Error Thrown: " + errorThrown);
		$("video").remove();
		$(".color-container").remove();
		$(".btn").remove();
		$("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
		$("#filePlaceHolder").addClass("col-lg-12");
		$("#files").html("<div class=\"jumbotron\" style=\"border-radius:10px;\"><h1 style=\"color: #b94a48;\">Funeral failed to upload!</h1><br>Ensure you are connected to the internet, refresh the page, and retry the upload. If you have tried this three times please contact support@@midweststreams.com</p></div>");
		$('.color-container').hide();
	});
	return false;
};
function sendErrorToServer(emailbod) {
    var postUrl = "/video/sendErrorEmail/";
    emailbod = emailbod.toString();
	var postData = { emailbod: emailbod };
	//$token = $('input[name="__RequestVerificationToken"]').val();
	//var test = $('THolder');
	var posting = $.ajax({
	    url: postUrl,
	    type: "POST",
	    dataType: "json",
	    data: postData
	});
	posting.done(function (json, responseText, jsonResponse) {

	});
	posting.error(function (jqXHR, textStatus, errorThrown) {

	});
};


