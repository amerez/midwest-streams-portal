using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using RestSharp;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.ViewModels;
using Newtonsoft.Json.Linq;

namespace VideoRenderer
{
    class DataAccess
    {
        string APIPath = ConfigurationManager.AppSettings["portalPath"] + "/renderapi/";
        string ApiKey = ConfigurationManager.AppSettings["internalAPIKey"];

        public RenderViewModel GetRenderData(string vmName)
        {
      
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("getrenderdata", Method.POST);
            request.AddParameter("machineName", vmName);

            var response = client.Execute(request);

            try
            {
                RenderViewModel renderData = JsonConvert.DeserializeObject<RenderViewModel>(response.Content);
                Library.WriteServiceLog("Found video to render!");
                Library.WriteServiceLog("Render Data: Group Name: " + renderData.ResourceGroupName);
                return renderData;
            }
            catch(Exception e)
            {
                RenderViewModel rvm = new RenderViewModel()
                {
                    FoundVideoToRender = false
                };
                return rvm;
            }
        
        }
        public VideoQueue GetVideoQ(int id)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);

            var request = new RestRequest("getvideoq/" + id, Method.GET);
            var response = client.Execute(request);

            VideoQueue vq = JsonConvert.DeserializeObject<VideoQueue>(response.Content);
            return vq;
        }
        public VideoQueue GetVideoQ(string machineName)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("getvideoq", Method.POST);
            request.AddParameter("machineName", machineName);

            var response = client.Execute(request);

            VideoQueue vq = JsonConvert.DeserializeObject<VideoQueue>(response.Content);
            return vq;
        }

        public Service GetService(int id)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);

            var request = new RestRequest("getservice/" + id, Method.GET);
            var response = client.Execute(request);

            Service service = JsonConvert.DeserializeObject<Service>(response.Content);
            return service;
        }

        public bool UpdateVideoStatus(int id, VideoQueueStatus status)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("updatevideoquestatus", Method.POST);
            request.AddParameter("id", id);
            request.AddParameter("status", status);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}") 
                {
                    return true;
                }
                Library.WriteErrorLog("Error Getting Video Q Status.");
                Library.WriteErrorLog(response.StatusCode.ToString());
                Library.WriteErrorLog(response.Content);
            }
            return false;
        }
        public void GetVideoStartDuration(int id, out double start, out double duration)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);

            var request = new RestRequest("getvideostartduration/" + id, Method.GET);
            var response = client.Execute(request);

            var output = JsonConvert.DeserializeObject<StartStopResponse>(response.Content);
            start = output.start;
            duration = output.duration;
        }
        public string GetResourceGroupName(string vmName)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("getresourcegroupname", Method.POST);
            request.AddParameter("machineName", vmName);
            var response = client.Execute(request);

            var json = JObject.Parse(response.Content);
            string group = json["ResourceGroupName"].ToObject<string>();
            return group;
        }
        public bool UpdateVideoStatus(int id, VideoStatus status)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("updatevideostatus", Method.POST);
            request.AddParameter("id", id);
            request.AddParameter("status", status);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                Library.WriteErrorLog("Error Getting Video Q Status.");
                Library.WriteErrorLog(response.StatusCode.ToString());
                Library.WriteErrorLog(response.Content);
            }
            return false;
        }

        public bool NotifyFuneralHome(int serviceId)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("notifyfuneralhome", Method.POST);
            request.AddParameter("id", serviceId);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                string errorDescription = "Error calling NotifyFuneralHome from API! Status Code: " + response.StatusCode.ToString();
                RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Severe, errorDescription, "DataAccess", "SetVideoThumbnail", "147", serviceId);
            }
            return false;
        }

        public bool SendErrorEmail(string message)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("senderroremail", Method.POST);
            request.AddParameter("message", message);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                string errorDescription = "Error setting video status from API Status Code: " + response.StatusCode.ToString();
                RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Severe, errorDescription, "DataAccess", "SendErrorEmail", "173", 0);
            }
            return false;
        }

        public bool SendAdminEmail(string message)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("sendadminemail", Method.POST);
            request.AddParameter("message", message);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                string errorDescription = "Error setting video status from API Status Code: " + response.StatusCode.ToString();
                RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Severe, errorDescription, "DataAccess", "SendAdminEmail", "210", 0);
            }
            return false;
        }

        public bool SetVideoThumbnail(int videoId, string thumbnail)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("setvideothumbnail", Method.POST);
            request.AddParameter("id", videoId);
            request.AddParameter("thumbnail", thumbnail);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                string errorDescription = "Error setting video status from API Status Code: "+response.StatusCode.ToString();
                RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Severe, errorDescription, "DataAccess", "SetVideoThumbnail", "147", videoId);
            }
            return false;
        }
        //Gets a video object with only the essential properties
        //Start Stop
        public Video GetMinimizedVideo(int id)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);

            var request = new RestRequest("getminimizedvideo/" + id, Method.GET);
            var response = client.Execute(request);

            Video video = JsonConvert.DeserializeObject<Video>(response.Content);
            return video;

        }



        public bool DeleteVideoQue(int id)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("DeleteVideoQue", Method.POST);
            request.AddParameter("id", id);
   

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                Library.WriteErrorLog("Error Deleting Video Q.");
                Library.WriteErrorLog(response.StatusCode.ToString());
                Library.WriteErrorLog(response.Content);
            }
            return false;
        }


        public bool UpdateVideoQueStatus(int id, VideoQueueStatus status)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("updatevideoquestatus", Method.POST);
            request.AddParameter("id", id);
            request.AddParameter("status", status);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                string errorDescription = "Error setting video que status from API! Status Code: " + response.StatusCode.ToString();
                RenderErrors.ReportError(VideoManager.Code.ErrorSeverity.Warning, errorDescription, "DataAccess", "UpdateVideoQueStatus", "228", id);
            }
            return false;
        }
        public bool UpdateVideo(Video video)
        {
            var client = new RestClient(APIPath);
            client.AddDefaultHeader("api-key", ApiKey);
            var request = new RestRequest("DeleteVideoQue", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddBody(video);

            var response = client.Execute(request);

            if (response != null && response.Content != null)
            {
                if (response.Content == "{\"Success\":true}")
                {
                    return true;
                }
                Library.WriteErrorLog("Error Updating Video.");
                Library.WriteErrorLog(response.StatusCode.ToString());
                Library.WriteErrorLog(response.Content);
            }
            return false;
        }
    
        public class StartStopResponse
        {
            public double start { get; set; }
            public double duration { get; set; }
        }

    }
}
