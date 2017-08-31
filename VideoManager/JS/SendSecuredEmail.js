 
$(document).ready(function () {
    $("#sendSecuredEmail").click(function () {
 
        var emailList = $("#securedEmailList").val();
        var emailValid = emailValidation(emailList);
        if(emailValid==true)
        {
            $("#ShareSecuredErrorMessage").hide();
            var postUrl = "/email/SendSecuredLink";
            var postData = { ServiceId: serviceIdSet, emails: emailList };
          

            //var postData = { username: "us" };
            var posting = $.ajax({
                url: postUrl,
                type: "POST",
                dataType: "json",
                data: postData
            });
            posting.done(function (json, responseText, jsonResponse) {
                $("#sendSecuredEmail").hide();
                $("#ShareSecuredModalFooter").append('<div id="SendSecuredAlert" class="alert alert-success" role="alert"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span><span class="sr-only">Success!</span>An email has been sent to the entered email addresses</div>');
               
                setTimeout(function () {
                    
                    $("#SendSecuredAlert").fadeOut("slow");
                    $("#sendSecuredEmail").show();
                    $("#securedEmailList").val("");
                    $('#ShareSecuredModal').modal('hide');

                }, 2000)
            });
            posting.error(function (jqXHR, textStatus, errorThrown) {
                $("#ShareSecuredModalFooter").append('<div id="SendSecuredAlert" class="alert alert-danger" data-alert="alert">Error Sending Email. Refresh this page and try sending again.</div>');
                console.log(errorThrown)
                // alert(errorThrown);
            });
        }
        else
        {
            $("#ShareSecuredErrorMessage").show();
        }
    });
});
function emailValidation(emails) {
    
    var emailList = emails.toString().replace(/\s/g, '').split(",");
    console.log(emails);
    var valid = true;
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (var i = 0; i < emailList.length; i++) {
        if (emailList[i] == "" || !regex.test(emailList[i])) {
            valid = false;
        }
    }
    return valid;
}