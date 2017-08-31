
var upperLeftX = 0;
var upperLeftY = 0;
var imageWidth = 0;
var imageHeight = 0;
var pdfTitle = "";
$(function () {
    'use strict';
    $('#cropButton').hide();
    $('#titleTextBoxContainer').hide();
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: '/video/ChunkPDFs',
        maxChunkSize: 10000000,
        singleFileUploads: true,
        autoUpload: true,
        acceptFileTypes: /\.pdf$/,
    }).on('fileuploaddone', function (e, data) {

        var returnedFile = $("#files .name").text();
           returnedFile = data.result.files;
        $('.fileinput-button').hide();


        getUniqueFileName(returnedFile);

        //sendInfoToServer(returnedFile);

    }).on('fileuploadfail', function (e, data) {


        $("video").remove();
        $(".color-container").remove();
        $(".btn").remove();
        $("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
        $("#filePlaceHolder").addClass("col-lg-12");
        $("#files").html("<div class=\"jumbotron\" style=\"border-radius:10px;\"><h1 style=\"color: #b94a48;\">PDF failed to upload!</h1><br>Ensure you are connected to the internet, refresh the page, and retry the upload. If you have tried this three times please contact support@@midweststreams.com</p></div>");
        $('.color-container').hide();
        $.each(data.files, function (index, file) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).on('fileuploadstart', function (e, data) {

        changeInstructions("uploading");
        $("#pageSelectorContainer").hide();

    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );




    $("#testButton").click(function () {
        sendInfoToServer("don.pdf");
    })
    $('#cropButton').click(function () {
        var imageSource = $('#serverResponseImage').attr('src');
        sendCropDatatoServer(imageSource);

        $('#cropButton').hide();
        $('#imagePlaceHolder').remove();
        $('.imgareaselect-outer').remove();
        $('.imgareaselect-selection').remove();
        $('.imgareaselect-border1').remove();
        $('.imgareaselect-border2').remove();
        $('.imgareaselect-border3').remove();
        $('.imgareaselect-border4').remove();
        $('.imgareaselect-handle').remove();
        $('body div:last').remove();
        $('#pdfFileName').remove();
        pdfTitle = $("#pdfTitle").val();
        $('#titleTextBoxContainer').hide();

    });

});


function changeInstructions(instruction) {


    if (instruction == "uploading") {
        var pageNum = $("#pageSelector").val();
        pageText = "2nd";
        if (pageNum == 1) {
            pageText = "1st";
        }
        $("#instructions").append('<p>The file is now uploading and will return an image of the ' + pageText + ' page shortly.</p>');
    }
    if (instruction == "image") {
        $("#instructions").html('<p>Type the title of the PDF into the text-box. Now use your mouse to crop the image. What you select is what the link will be that is viewable on your website.</p>');
    }

}

function getUniqueFileName(fileName) {


   var postUrl = "/video/MakeUniqueFileName";




    var postData = { fileName: fileName };

    var posting = $.ajax({
        url: postUrl,
        type: "POST",
        dataType: "json",
        //crossDomain:true,
        //timeout:3000,
        //contentType: "application/json: charset=utf-8",
        //headers: { __RequestVerificationToken: $token },
        data: postData
    });
    posting.done(function(json, responseText, jsonResponse) {
        var returnedFile = jsonResponse.responseJSON.files;
        $('.fileinput-button').hide();
        sendInfoToServer(returnedFile);
    });
    posting.error(function(jqXHR, textStatus, errorThrown) {
        alert("error");

        // alert(errorThrown);
    });

    return;
}

function sendInfoToServer(fileName) {


    var pageNum = $("#pageSelector").val();


    var postUrl = "/video/pdftoimage";

    $token = $('input[name="__RequestVerificationToken"]').val();
    var test = $('THolder');

    var postData = { fileurl: fileName, page: pageNum };

    //var postData = { username: "us" };
    var posting = $.ajax({
        url: postUrl,
        type: "POST",
        dataType: "json",
        //crossDomain:true,
        //timeout:3000,
        //contentType: "application/json: charset=utf-8",
        //headers: { __RequestVerificationToken: $token },
        data: postData
    })
    posting.done(function (json, responseText, jsonResponse) {
        responseObject = JSON.parse(jsonResponse.responseText);
        var imageSource = responseObject.outwardPath;
        var pdfPath = responseObject.fileurl;

        ///$("#imagePlaceHolder").append('<img src="' + responseText + '"/>');
        $("#imagePlaceHolder").append('<img id="serverResponseImage" src="' + imageSource + '"/>');
        changeInstructions("image");
        $("#imagePlaceHolder").append('<p id="pdfFileName"></p>');
        $('#serverResponseImage').imgAreaSelect({ handles: true, onSelectEnd: cropImage });
        $("#cropButton").show();
        $("#pdfFileName").text(pdfPath);
        $('#titleTextBoxContainer').show();
    });
    posting.error(function (jqXHR, textStatus, errorThrown) {
        alert("error");

        // alert(errorThrown);
    });

    return false;
};

function cropImage(img, selection) {

    upperLeftX = selection.x1;
    upperLeftY = selection.y1;
    imageWidth = selection.width;
    imageHeight = selection.height;

}

function sendCropDatatoServer(imageSource) {

    var postUrl = "/video/cropimage";

    var currentPdfPath = $('#pdfFileName').text();

    $token = $('input[name="__RequestVerificationToken"]').val();
    var test = $('THolder');

    //var postData = { imagePath: 'C:\\Dev\\MidwestStreams\\VideoManager\\Content\\images\\thumbnail.jpg', leftX: upperLeftX, leftY: upperLeftY, width: imageWidth, height: imageHeight };
    var postData = { imagePath: imageSource, pdfPath: currentPdfPath, leftX: upperLeftX, leftY: upperLeftY, width: imageWidth, height: imageHeight };
    //var postData = { imagePath: 'C:\\batchfiles\\thumbnail.jpg', leftX: upperLeftX, leftY: upperLeftY, width: imageWidth, height: imageHeight };

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
    })
    posting.done(function (json, responseText, jsonResponse) {

        responseObject = JSON.parse(jsonResponse.responseText);
        var pdfPath = responseObject.outwardPdfPath;
        var thumbnailPath = responseObject.outwardThumbnail;
        var success = responseObject.success;
        if (success == true) {
            $("#embedCodePlaceHolder").html('<div class="jumbotron"><h2>Copy and Paste the code below into your website</h2>&lt;center&gt;&lt;a href="' + pdfPath + '"&gt;<br>&lt;img style="border:10px outset silver;width: 220px;" src="' + thumbnailPath + '"/&gt;<br>&lt;br&gt;'+pdfTitle+'&lt;/a&gt;&lt;/center&gt</div>');
        }
        else {
            // TODO: Error Handling
            $("#embedCodePlaceHolder").html('<div class="jumbotron"><h2>Error Converting File</h2><p>Try renaming the file, and uploading it again. If this fails please contact <a href="mailto:support@@midweststreams.com?Subject=PDF%20File%20Error" target="_top">support@midweststreams.com</a></div>');
        }
        ;
        $('#embedCodePlaceHolder').show();

    });
    posting.error(function (jqXHR, textStatus, errorThrown) {
        // TODO: Error Handling
    });

    return false;
}

