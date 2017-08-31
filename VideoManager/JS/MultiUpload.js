
$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        //url: '/server/php/',
        //url: '/Backload/UploadHandler',
        url: '/video/chunkTest',
        maxChunkSize: 10000000,
        //multipart: false,
        singleFileUploads: true,
        //acceptFileTypes:  /\.mp4$/,
    }).on('fileuploadchunksend', function (e, data) {
        //send chunk

    })
.on('fileuploadchunkdone', function (e, data) {
    //chunk done

})
.on('fileuploadchunkfail', function (e, data, status) {
    //chunk fail

}).on('fileuploaddone', function (e, data) {
        var returnedFile = userName + $("#files .name").text();
        returnedFile = returnedFile.replace(/ /g, "");

        $.each(data.result.files, function (index, item) {
        returnedFile = item.name;
            alert('Mult!');
        });

    var videoIn = $("#videoIn").val();
    var videoEnd = $("#videoOut").val();

    $("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
    $("#filePlaceHolder").addClass("col-lg-12");
    $("#files").html("<div class=\"jumbotron\" style=\"border-radius:10px;\"><h1>Funeral successfully uploaded</h1><br>Our servers are now going to process the video, the viewing page should be ready in a few hours</p></div>");
    $('.color-container').hide();
 
    sendInfoToServer(returnedFile, videoIn, videoEnd);

}).on('fileuploadfail', function (e, data) {

    var videoIn = $("#videoIn").val();
    var videoEnd = $("#videoOut").val();
    var fileurl = $("#files .name").text();

    var userName = "@Model.Creator.UserName";
    var emailMessage = "File upload failed for " + userName;

    sendErrorToServer(emailMessage);



    $("video").remove();
    $(".color-container").remove();
    $(".btn").remove();
    $("#filePlaceHolder").removeClass("col-lg-6 col-lg-offset-3");
    $("#filePlaceHolder").addClass("col-lg-12");
    $("#files").html("<div class=\"jumbotron\" style=\"border-radius:10px;\"><h1 style=\"color: #b94a48;\">Funeral failed to upload!</h1><br>Ensure you are connected to the internet, refresh the page, and retry the upload. If you have tried this three times please contact support@@midweststreams.com</p></div>");
    $('.color-container').hide();
    $.each(data.files, function (index, file) {
        var error = $('<span class="text-danger"/>').text('File upload failed.');
        $(data.context.children()[index])
            .append('<br>')
            .append(error);
    });
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

    /* // Load existing files:
     $('#fileupload').addClass('fileupload-processing');
     $.ajax({
         // Uncomment the following to send cross-domain cookies:
         //xhrFields: {withCredentials: true},
         url: $('#fileupload').fileupload('option', 'url'),
         dataType: 'json',
         context: $('#fileupload')[0]
     }).always(function () {
         $(this).removeClass('fileupload-processing');
     }).done(function (result) {
         $(this).fileupload('option', 'done')
             .call(this, $.Event('done'), {result: result});
     });

     */
});
//TODO replace this code with something more elegant to show the cancel button. I just did this cause I couldn't figure out how to wire up an event on dynamically added elements
$('body').click(function () {

    $('.start').click(function() {
        $('.cancel').css("visibility", "visible");

    });
});
$('#setIn').click(function () {

	alert("click");


    if ($("#manualCheckBox").is(':checked') == false) {
        var roundedTime = Math.round($('video').get(0).currentTime);
        $('#videoIn').val(roundedTime);
        $('#inSeconds').val(roundedTime).change();

    }
    else {
        var secsec = parseInt($('#inSeconds').val());
        var minutessec = parseInt($('#inMinutes').val() * 60);
        var hoursec = parseInt($('#inHours').val() * 3600);
        var totalSeconds = secsec + minutessec + hoursec;
        if (isNaN(totalSeconds) == true) {
            totalSeconds = 0;
        }
        $('#videoIn').val(totalSeconds);

    }
    if (parseInt($('#videoOut').val()) > parseInt($('#videoIn').val())) {

        $(".start").prop("disabled", false);
    }
    else {

        $(".start").prop("disabled", true);
    }

    $("#start-checkmark").removeClass("hidden");

});

$('#setOut').click(function () {
    if ($("#manualCheckBox").is(':checked') == false) {
        var roundedTime = Math.round($('video').get(0).currentTime);
        $('#videoOut').val(roundedTime);
        $('#outSeconds').val(roundedTime).change();
    }

    else {
        var secsec = parseInt($('#outSeconds').val());
        var minutessec = parseInt($('#outMinutes').val() * 60);
        var hoursec = parseInt($('#outHours').val() * 3600);

        var totalSeconds = secsec + minutessec + hoursec;
        if (isNaN(totalSeconds) == true) {
            totalSeconds = 0;
        }
        $('#videoOut').val(totalSeconds);

    }



    if (parseInt($('#videoIn').val()) < parseInt($('#videoOut').val())) {

        $(".start").prop("disabled", false);
    }
    else {

        $(".start").prop("disabled", true);
    }
    $("#end-checkmark").removeClass("hidden");

});
$('#fileupload').click(function () {

    $('.color-container').show();
    $('#setIn').css("visibility", "visible");
    $('#setOut').css("visibility", "visible");
    $('.fileupload-buttonbar').css("display", "none");

});