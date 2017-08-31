﻿using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Code
{
    public class LiveCode
    {
        public static Models.Data.LiveStream CreateLiveStream(Service service)
        {
            string wscapikey = ConfigurationManager.AppSettings["wowzaApiKey"];
            string wscaccesskey = ConfigurationManager.AppSettings["wowzaAccessKey"];
            string name = service.FirstName + " " + service.LastName + " " + service.FuneralHome.UserName + service.Id;
            LiveStreamPost ls = new LiveStreamPost()
                {
                    aspect_ratio_height = 720,
                    aspect_ratio_width = 1280,
                    billing_mode = "pay_as_you_go",
                    broadcast_location = "us_west_california",
                    closed_caption_type = "none",
                    encoder = "wowza_gocoder",
                    hosted_page = false,
                    name = name,
                    player_countdown = false,
                    player_responsive = true,
                    player_type = "wowza_player",
                    player_width = 0,
                    recording = false,
                    target_delivery_protocol = "hls",
                    transcoder_type = "transcoded",
                    use_stream_source = false
                };
            var client = new RestClient("https://cloud.wowza.com/api/v1/live_streams");
            client.AddDefaultHeader("wsc-api-key", wscapikey);
            client.AddDefaultHeader("wsc-access-key", wscaccesskey);

            var request = new RestRequest(Method.POST);
            WowzaPost root = new WowzaPost()
            {
                live_stream = ls
            };
            request.RequestFormat = DataFormat.Json;
            request.AddBody(root);
           var response =  client.Execute(request);
           WowzaResponse wr = JsonConvert.DeserializeObject<WowzaResponse>(response.Content);
            if(wr!=null && wr.live_stream!=null)
            {
                Models.Data.LiveStream liveStream = CreateAndStoreLiveStream(service, wr.live_stream.id, wr.live_stream.player_hds_playback_url);
               SendEmailWithStreamCode(liveStream.ServiceId, wr, liveStream.StartStreamAccessToken);
                return liveStream;
            }
            return null;
           
   
        }
        public static WowzaResponse GetLiveStream(string WowzaLiveStreamId)
        {
            string wscapikey = ConfigurationManager.AppSettings["wowzaApiKey"];
            string wscaccesskey = ConfigurationManager.AppSettings["wowzaAccessKey"];
            var client = new RestClient("https://cloud.wowza.com/api/v1/live_streams/"+WowzaLiveStreamId);
            client.AddDefaultHeader("wsc-api-key", wscapikey);
            client.AddDefaultHeader("wsc-access-key", wscaccesskey);

            var request = new RestRequest(Method.GET);
    
            request.RequestFormat = DataFormat.Json;

            var response = client.Execute(request);
            WowzaResponse wr = JsonConvert.DeserializeObject<WowzaResponse>(response.Content);
            return wr;
        }
        public static void StartLiveStream(string streamId)
        {
            string wscapikey = ConfigurationManager.AppSettings["wowzaApiKey"];
            string wscaccesskey = ConfigurationManager.AppSettings["wowzaAccessKey"];

            var client = new RestClient("https://cloud.wowza.com/api/v1/live_streams");
            client.AddDefaultHeader("wsc-api-key", wscapikey);
            client.AddDefaultHeader("wsc-access-key", wscaccesskey);
            string id = streamId;
            var status = 1;
            var request = new RestRequest(id+"/start", Method.PUT);
            request.AddJsonBody(new { status = status });
            var response = client.Execute(request);

            
        }

        private static Models.Data.LiveStream CreateAndStoreLiveStream(Service service, string streamId, string playbackUrl)
        {
            Guid guidid = Guid.NewGuid();
            Models.Data.LiveStream ls = new Models.Data.LiveStream()
            {
                ServiceId = service.Id,
                StreamId = streamId,
                SourceURL = playbackUrl,
                StartStreamAccessToken = guidid
            };
            ApplicationDbContext db = new ApplicationDbContext();
            db.LiveStreams.Add(ls);
            db.SaveChanges();
            return ls;
        }
        private static bool SendEmailWithStreamCode(int? mwsLiveStreamId, WowzaResponse wowza, Guid accessToken )
        {
            string IOSCode = BuildAppOpenCode(wowza);
            string EmailText = "You have created a live stream. First you need to start the stream. To start the stream please click the following link:" + ConfigurationManager.AppSettings["portalPath"] + "/services/startlivestream/" + mwsLiveStreamId.ToString() +"?token=" + accessToken.ToString() + "<br/><br/> IOS Code <br/>" + IOSCode;
            Email.sendLiveStreamingCode(EmailText);
            return true;
        }

        private static string BuildAppOpenCode(WowzaResponse streamObject)
        {
            string publishHost = streamObject.live_stream.source_connection_information.primary_server;
            string publishPort = streamObject.live_stream.source_connection_information.host_port.ToString();
            string publishApplication = streamObject.live_stream.source_connection_information.application;
            string publishStream = streamObject.live_stream.source_connection_information.stream_name;
            string publishUser = streamObject.live_stream.source_connection_information.username;
            string publishPassword = streamObject.live_stream.source_connection_information.password;
            string publishAutoRestart = "YES";
            string publishBroadCastType = "2";
            string publishFPS = "25";
            string publishKeyFrameInterval = "50";
            string publishFrameSizeIndex = "7";
            string publishFilterType = "0";
            string publishURL = "https://player.cloud.wowza.com/";
            string publishBitrateIndex = "1";
           // streamObject.live_stream.source_connection_information.
            string code = "gocoder://configure/?publishUseTCP=YES&publishHost=" + publishHost + "&publishPort=" + publishPort + "&publishApplication="+publishApplication+"&publishStream="+publishStream+"&publishUser="+publishUser+"&publishPassword="+publishPassword+"&publishAutoRestart="+publishAutoRestart+"&publishBroadcastType="+publishBroadCastType+"&publishFPS="+publishFPS+"&publishKeyFrameInterval="+publishKeyFrameInterval+"&publishBitrateIndex="+publishBitrateIndex+"&publishFrameSizeIndex="+publishFrameSizeIndex+"&publishFilterType="+publishFilterType+"&publishURL="+publishURL;
            code = "gocoder://configure/?publishUseTCP=YES&publishHost=" + publishHost + "&publishPort=" + publishPort + "&publishApplication=" + publishApplication + "&publishStream=" + publishStream + "&publishUser=" + publishUser + "&publishPassword=" + publishPassword;
            return code;
        }
    }
  
    public class LiveStreamPost
    {
        public int aspect_ratio_height { get; set; }
        public int aspect_ratio_width { get; set; }
        public string billing_mode { get; set; }
        public string broadcast_location { get; set; }
        public string closed_caption_type { get; set; }
        public string delivery_method { get; set; }
        public string encoder { get; set; }
        public bool hosted_page { get; set; }
        public bool hosted_page_sharing_icons { get; set; }
        public string name { get; set; }
        public bool player_countdown { get; set; }
        public bool player_responsive { get; set; }
        public string player_type { get; set; }
        public int player_width { get; set; }
        public bool recording { get; set; }
        public string target_delivery_protocol { get; set; }
        public string transcoder_type { get; set; }
        public bool use_stream_source { get; set; }
    }
    public class WowzaPost
    {
        public LiveStreamPost live_stream { get; set; }
    }

    public class SourceConnectionInformation
    {
        public string primary_server { get; set; }
        public int host_port { get; set; }
        public string application { get; set; }
        public string stream_name { get; set; }
        public bool disable_authentication { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }

    public class Rtmp
    {
        public string name { get; set; }
        public string url { get; set; }
        public string output_id { get; set; }
    }

    public class Rtsp
    {
        public string name { get; set; }
        public string url { get; set; }
        public string output_id { get; set; }
    }

    public class Wowz
    {
        public string name { get; set; }
        public string url { get; set; }
        public string output_id { get; set; }
    }

    public class DirectPlaybackUrls
    {
        public List<Rtmp> rtmp { get; set; }
        public List<Rtsp> rtsp { get; set; }
        public List<Wowz> wowz { get; set; }
    }

    public class Link
    {
        public string rel { get; set; }
        public string method { get; set; }
        public string href { get; set; }
    }

    public class LiveStream
    {
        public string id { get; set; }
        public string name { get; set; }
        public string transcoder_type { get; set; }
        public string billing_mode { get; set; }
        public string broadcast_location { get; set; }
        public bool recording { get; set; }
        public string closed_caption_type { get; set; }
        public bool low_latency { get; set; }
        public string encoder { get; set; }
        public string delivery_method { get; set; }
        public string delivery_protocol { get; set; }
        public string target_delivery_protocol { get; set; }
        public bool use_stream_source { get; set; }
        public int aspect_ratio_width { get; set; }
        public int aspect_ratio_height { get; set; }
        public string connection_code { get; set; }
        public string connection_code_expires_at { get; set; }
        public List<string> delivery_protocols { get; set; }
        public SourceConnectionInformation source_connection_information { get; set; }
        public bool video_fallback { get; set; }

        public string player_id { get; set; }
        public string player_type { get; set; }
        public bool player_responsive { get; set; }
        public bool player_countdown { get; set; }
        public string player_embed_code { get; set; }
        public string player_hds_playback_url { get; set; }
        public string player_hls_playback_url { get; set; }
        public bool hosted_page { get; set; }
        public bool hosted_page_logo_image_url { get; set; }
        public List<object> stream_targets { get; set; }
        public DirectPlaybackUrls direct_playback_urls { get; set; }
        public string created_at { get; set; }
        public string updated_at { get; set; }
        public List<Link> links { get; set; }
    }

    public class WowzaResponse
    {
        public LiveStream live_stream { get; set; }
    }
}