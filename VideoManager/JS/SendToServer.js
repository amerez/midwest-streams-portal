function sendInfoToServer(fileName, videoIn, videoEnd, serviceId) {
	alert("sending to server");

	if (isNaN(videoIn)) {

		videoIn = 0;
	}
	if (isNaN(videoEnd)) {

		videoEnd = 0;
	}

    //var postUrl = "/video/uploaddetails/"+serviceId;
    var postUrl = "/video/uploaddetailsmulti/"+serviceId;
		     
    var fileNames = new Array();
    fileNames.push(fileName);
    fileNames = JSON.stringify(fileNames);
    $token = $('input[name="__RequestVerificationToken"]').val();
    var test = $('THolder');

    //var postData = { fileurl: fileName, inpoint: videoIn, outpoint: videoEnd };
    var postData = { fileurls: fileNames, inpoint: videoIn, outpoint: videoEnd };


    //var postData = { username: "us" };
    var posting = $.ajax({
        url: postUrl,
        //url: 'http://demo.midweststreams.com/api/serviceUpload',
        type: "POST",
        dataType: "json",
        //crossDomain:true,
        //timeout:3000,
        //contentType: "application/json: charset=utf-8",
        //headers: { __RequestVerificationToken: $token },
        data: postData
    });
    posting.done(function (json, responseText, jsonResponse) {

    });
    posting.error(function (jqXHR, textStatus, errorThrown) {
    	sendErrorToServer("An error occured when posting to videouploaddetails multi. Service ID:" + serviceId + " Video In:" + videoIn + " Video Out:" + videoEnd+" Error Thrown: "+errorThrown);
    	$("video").remove();
    	$(".color-container").remove();
    	$(".btn").remove();
    	$("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
    	$("#filePlaceHolder").addClass("col-lg-12");
    	$("#files").html("<div class=\"jumbotron\" style=\"border-radius:10px;\"><h1 style=\"color: #b94a48;\">Funeral failed to upload!</h1><br>Ensure you are connected to the internet, refresh the page, and retry the upload. If you have tried this three times please contact support@@midweststreams.com</p></div>");
    	$('.color-container').hide();
    	
        // alert(errorThrown);
    });

    return false;
};
function sendErrorToServer(emailbod)
{
   
    //var postUrl = "/video/uploaddetails/"+serviceId;
    var postUrl = "/video/sendErrorEmail";
    var postData = { emailBod: emailbod };
    $token = $('input[name="__RequestVerificationToken"]').val();
    var test = $('THolder');

    //var postData = { username: "us" };
    var posting = $.ajax({
        url: postUrl,
        type: "POST",
        dataType: "json",
        data: postData
    });
    posting.done(function (json, responseText, jsonResponse) {

    });
    posting.error(function (jqXHR, textStatus, errorThrown) {
        alert("error");

        // alert(errorThrown);
    });
}