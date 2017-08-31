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
		//acceptFileTypes:  /\.mp4$/,
	}).on('fileuploadchunksend', function (e, data) {
		//send chunk
	
	}).on('fileuploadadded', function (e, data) {

	    nextVideoUIChange();
	    totalFileSize = totalFileSize + data.files[0].size;
	   
	  
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
	$(".alert-danger").remove();
	if (uploadCounter == numberOfFiles)
	{
	    console.log(frontSideFileArray)
	    sendInfoToServer(frontSideFileArray);
	}
	$(".content-container").html('<div><h1>Video Upload Completed</h1>We ard now going to do some processing on the video. You will recieve an email when the video is ready</div>')
}).on('fileuploadfail', function (e, data) {
    failedUpload("file upload fail", data);
}).on('fileuploadchange', function (e, data) {
	$.each(data.files, function (index, item) {
		frontSideFileArray[i] = item.name;
		i++;
	});
}).on('fileuploadstart', function (e, data) {


});


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

    function nextVideoUIChange()
	{
    
        $(".startUpload").show();
        $(".upload-next").hide();
	}

	//******processing
    function setModalArray() {
        var modalSort = $(".name");
        $.each(modalSort, function (i, videoNames) {
            var videoName = videoNames.textContent;
            modalSortArray.push(userName + "_" +videoName);
        });
        return modalSortArray;
	}
 

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
        var postData = { fileNames: fileNameArray };

        var posting = $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            traditional: true,
            data: postData
        });
        posting.done(function (json, responseText, jsonResponse) {
            $(".startUpload").hide();
            $("body").prepend('<div id="upload-warning" class="alert alert-danger navbar-fixed-top" id="uploading-alert" role="alert" style="z-index: 10000;"><h4>Video Upload in Progress!</h4>Do not navigate away from this page, and ensure your computer is connected to the internet, and will not fall asleep.</div>');
            $(".start").click();
            $('a').on('click.myDisable', function (e) { e.preventDefault(); });
        });
        posting.error(function (jqXHR, textStatus, errorThrown) {
            failedUpload("rename Failed Files Post", errorThrown);

        });
        return;
    }




    

    //When Clicking on Next video it opens a file picker, binds it to the file upload and makes the videos play nice with the jquery scroll
	$('#nextVideo').bind('change', function (e) {
	    $('#fileupload').fileupload('add', {
	        files: e.target.files || [{ name: this.value }],
	        fileInput: $(this)
	    });
	});

	




    //Start Upload
	$("#startUpload").click(function () {
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
  


});

function sendInfoToServer(fileNames) {

    console.log(fileNames);
	var serviceId = serviceIdSet;
	var postUrl = "/video/startmobileconversion/" + serviceId;
	fileNames = JSON.stringify(fileNames);
	$token = $('input[name="__RequestVerificationToken"]').val();
	var test = $('THolder');

	var postData = { fileurls: fileNames};

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
		sendErrorToServer("An error occured when posting to videouploaddetails multi. Service ID:" + serviceId + " Error Thrown: " + errorThrown);
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


