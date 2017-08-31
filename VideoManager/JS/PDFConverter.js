
var upperLeftX = 0;
var upperLeftY = 0;
var imageWidth = 0;
var imageHeight = 0;
var pdfTitle = "";
var ImageArray = [];

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

        changeInstructions("Afteruploading");
      

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
        
        var imageSource = $('.border-active').attr('src');

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
  
        $('#titleTextBoxContainer').hide();
        changeInstructions("done");
    });

});


function changeInstructions(instruction) {


    if (instruction == "cropInstructions") {
        $("#instructions").html('<p>Type the title of the memorial folder into the text-box. Drag the mouse over the image, to crop the selection. Your selection will be displayed on the webpage.</p>');
    }
    if (instruction == "Afteruploading") {
        $("#instructions").html('<p>Select the image you wish to crop for your thumbnail.</p> ');
    }
    if (instruction == "done") {
        $("#instructions").html('<p>Your thumbnail is ready for your Website!</p> ');
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


  
    var postUrl = "/PDFs/pdftoimage";
    var columnWidth = $("#instructionContainer").width()-350;
    $token = $('input[name="__RequestVerificationToken"]').val();

    var postData = { fileurl: fileName, maxWidth: columnWidth };

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
        var imageSource = responseObject.PathedArray;
        console.log(imageSource);
        ImageArray = imageSource;
        var pdfPath = responseObject.timestampedPDF;
       
        for (var i = 0; i < imageSource.length; i++) {
            var col = "col-sm-4";
            switch(imageSource.length)
            {
                case 1:
                    col = "col-sm-12"
                    break;
                case 2:
                    col = "col-sm-6"
                    break;
                case 3:
                    col = "col-sm-4"
                    break;
                case 4:
                    col = "col-sm-3"
                    break;
    
            }
            $("#imagePlaceHolder").append('<a href="#" class="' + col + '"><img src="' + imageSource[i] + '" class="img-responsive thumbnail-image"></a>');
            

        }
        $(".thumbnail-image").click(function () {
            $("#choose-image-button").show();
            $(".border-active").removeClass("border-active");
            if (!$(this).hasClass("border-active")) {
                $(this).addClass("border-active");
            }
        });
        $("#choose-image-button").click(function () {
            $("#choose-image-button").remove();
            $(".thumbnail-image").each(function (i, obj) {
                if ($(this).hasClass("border-active")) {
                    //make it not so small 
                    $(this).parent().removeClass("col-sm-6");
                    $(this).parent().removeClass("col-sm-4");
                    $(this).parent().removeClass("col-sm-3");
                    //and make it big
                    $(this).parent().addClass("col-sm-12");
                    $(this).parent().addClass("crosshair-css");
                    $(this).removeClass("thumbnail-image");
                 
                    changeInstructions("cropInstructions")
                }
                else {
                    $(this).parent().remove();
                }
            });
           
            $("#imagePlaceHolder").append('<p id="pdfFileName"></p>');
            $('.border-active').imgAreaSelect({ handles: true, onSelectEnd: cropImage });
            $("#cropButton").show();
            $("#choose-image-button").hide();
            $("#pdfFileName").text(pdfPath);
            $('#titleTextBoxContainer').show();
        });
    });

    posting.error(function (jqXHR, textStatus, errorThrown) {
        alert("error");
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

    var postUrl = "/PDFs/cropimage";
    pdfTitle = $("#pdfTitle").val();
    var currentPdfPath = $('#pdfFileName').text();

    
    $token = $('input[name="__RequestVerificationToken"]').val();
    var test = $('THolder');

    var postData = { imagePath: imageSource, pdfPath: currentPdfPath, leftX: upperLeftX, leftY: upperLeftY, width: imageWidth, height: imageHeight, serviceId: serviceIdSet, title: pdfTitle, allImagePaths: JSON.stringify(ImageArray) };

    var posting = $.ajax({
        url: postUrl,
        type: "POST",
        dataType: "json",
        data: postData
    })
    posting.done(function (json, responseText, jsonResponse) {
        responseObject = JSON.parse(jsonResponse.responseText);
        console.log()
        var pdfPath = responseObject.outwardPdfPath;
        var thumbnailPath = responseObject.outwardThumbnail;
        var success = responseObject.success;
        if (success == true) {
            $("#embedCodePlaceHolder").html('<div class="jumbotron"><h2>Copy and Paste the code below into your website</h2>&lt;center&gt;&lt;a href="' + pdfPath + '"&gt;<br>&lt;img style="border:10px outset silver;width: 220px;" src="' + thumbnailPath + '"/&gt;<br>&lt;br&gt;'+pdfTitle+'&lt;/a&gt;&lt;/center&gt</div>');
            callExtractText();
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

function callExtractText() {
    var postURL = "/PDFs/callExtraxtText";
    var postData = {serviceId: serviceIdSet }
    var posting = $.ajax({
        url: postURL,
        type: "POST",
        dataType: "json",
        data: postData
    })
    posting.done();
}

