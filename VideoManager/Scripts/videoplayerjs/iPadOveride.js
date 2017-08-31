$(document).ready(function()
{
    var mejs = document.createElement("script");
    mejs.type = "text/javascript";
    mejs.src = portalPath+"/Content/videoplayer/iframe/mediaelement-and-player.js";
    // Use any selector
    $("head").append(mejs);

    // Use any selector
    $("head").append('<link rel="stylesheet" href="'+portalPath+'/Content/videoplayer/iframe/mediaelementplayer.min.css" /><link rel="stylesheet" href="@(System.Configuration.ConfigurationManager.AppSettings["portalPath"])/Content/videoplayer/iframe/mejs-skins.css" />');



    $("#videoPlayer").append('<div id="vidContainer"><video id="video" src="' + videoPath + '" width="640" height="360" controls="controls"></video><div id="custom-message">'+videoTitle+'</div></div>');
    $('video').mediaelementplayer({
        alwaysShowControls: false,
        success: function (player, node) {
            $('#' + node.id + '-mode').html('mode: ' + player.pluginType);

            player.addEventListener('playing', function () {
                if (playCount == 0)
                {
                    setTimeout(trackView, 500)
                }
            });
            player.addEventListener('pause', function () {
                trackPause(player.currentTime, player.duration, false)
            });
            player.addEventListener('ended', function () {
                //Pass duration as current time to signal 100% watched
                trackPause(player.duration, player.duration, true)
            });

        }
    });
    $("video").on('play', function () {
        $('#custom-message').hide();
        $('#custom-message-aurora').hide();
            
    });


    var $vid = $('video', '#vidContainer');
    var $msg = $('#custom-message');
    $msg.css({
        top: $vid.offset().top + (($vid.height() / 1.5) - ($msg.height() / 2)),
        left: $vid.offset().left + (($vid.width() / 2) - ($msg.width() / 2))
    });
});