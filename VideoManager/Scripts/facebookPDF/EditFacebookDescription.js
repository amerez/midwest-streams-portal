$(document).ready(function () {
    var oldText = "";
    $('.facebook-modal-edit-title').editable(function (value, settings) {
        sendToServer(value, "title");
        return (value);
    }, {
        submit: 'Save',
        indicator: 'Saving...',
        tooltip: 'Click to edit...',
        onblur: 'submit'
    });

    $('.facebook-modal-edit-description').editable(function (value, settings) {
        sendToServer(value,"description");
        return (value);
    }, {
        submit: 'Save',
        indicator: 'Saving...',
        tooltip: 'Click to edit...',
        type: 'textarea',
        onblur: 'submit'
    });
    $("#GetPDFFacebookLink").click(function () {
        if (!$(".pdf-modal-body").has("input").length && !$(".pdf-modal-body").has("textarea").length)
        {

            $(".modal-title-pdf").text("Copy and paste the code below into a facebook status.")
            $(".pdf-modal-instruction").hide();
            $("#GetPDFFacebookLink").hide();
            $("#ResetPDFFacebookModal").show();
            oldText = $(".pdf-modal-body").html();
            $(".pdf-modal-body").html('<h4>' + PDFFacebookLink + '</h4>')
        }
     
    });
    $("#ResetPDFFacebookModal").click(function () {
        $("#ResetPDFFacebookModal").hide();
        $(".modal-title-pdf").text("Share Memorial Folder On Facebook");
        $(".pdf-modal-instruction").show();
        $(".pdf-modal-body").html(oldText);
        $("#GetPDFFacebookLink").show();
        $("#GetPDFFacebookLink").click(function () {
            if (!$(".pdf-modal-body").has("input").length && !$(".pdf-modal-body").has("textarea").length)
            {
                $(".modal-title-pdf").text("Copy and paste the code below into a facebook status.")
                $(".pdf-modal-instruction").hide();
                $("#GetPDFFacebookLink").hide();
                $("#ResetPDFFacebookModal").show();
                oldText = $(".pdf-modal-body").html();
                $(".pdf-modal-body").html('<h4>' + PDFFacebookLink + '</h4>')
            }
        });
        $('.facebook-modal-edit-title').editable(function (value, settings) {
            sendToServer(value, "title");
            return (value);
        }, {
            submit: 'Save',
            indicator: 'Saving...',
            tooltip: 'Click to edit...',
            onblur: 'submit'
        });

        $('.facebook-modal-edit-description').editable(function (value, settings) {
            sendToServer(value, "description");
            return (value);
        }, {
            submit: 'Save',
            indicator: 'Saving...',
            tooltip: 'Click to edit...',
            type: 'textarea',
            onblur: 'submit'
        });
    });

    function sendToServer(newText, type)
    {
        var postUrl = "/PDFs/EditFacebookPDFTitle";
        if (type == "description")
        {
            var postUrl = "/PDFs/EditFacebookPDFDescription";
        }
       
        var postData = { id: serviceIdSet, text: newText }
        var posting = $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            data: postData
        });
        posting.done(function (json, responseText, jsonResponse) {

        });
        posting.error(function (jqXHR, textStatus, errorThrown) {

            $(".facebook-modal-edit").append('<p class="error-text">Error Submiting Data to Server.')
        });
    }
});