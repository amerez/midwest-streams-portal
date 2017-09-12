using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.ViewModels;

namespace VideoManager.Controllers
{
    public class RenderAPIController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        //Handle all the authentication for this API
        //The key is located in the Web Config
        //This method looks for the key in the http header, and redirects it to Access denied if it doesn't match
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            //Do not redirect to access denied if the request is to "accessdenied", this is to prevent an infinite redirect loop.
            if (filterContext != null && filterContext.ActionDescriptor != null && filterContext.ActionDescriptor.ActionName != null && filterContext.ActionDescriptor.ActionName.ToLower() != "accessdenied")
            {
                if (AuthorizeAPI() == false)
                {
                    filterContext.Result = new RedirectResult(Url.Action("AccessDenied"));
                }
            }
        }

        //public ActionResult GetVideoQ(int id)
        //{
        //    VideoQueue vq = db.VideoQueues.Find(id);
        //    return Json(vq, JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        public ActionResult ReportError(ErrorSeverity severity, string className, string method, string line, string description, string userName, string serviceId, string message, string innerException)
        {
            string errorMessage = "A " + severity.ToString() + " occured on the MWS Platform. Custom Description:" + description + " Message: " + message + " Inner Exception: " + innerException + " Class: " + className + " Method: " + method + " Line: " + line + " UserName:" + userName + " ServiceId: " + serviceId;
            if (severity == ErrorSeverity.Fatal || severity == ErrorSeverity.Severe)
            {
                Email.sendErrorMessage(errorMessage);
            }
            Error.SendErrorToGoogleDoc(severity, className, method, line, description, userName, message, innerException, serviceId);
            return Json(new { Reported = "True" });
        }

        [HttpPost]
        public ActionResult GetRenderData(string machineName)
        {
            VideoQueue vq = db.VideoQueues.Where(q => q.VMName == machineName && q.VideoStatus == VideoQueueStatus.UploadedToAzureRenderFarm).FirstOrDefault();
            RenderViewModel rvm = new RenderViewModel();
            if (vq == null)
            {
                rvm.FoundVideoToRender = false;
                return Json(rvm);
            }
            Service service = db.Services.Where(s => s.Id == vq.VideoId).FirstOrDefault();
            //If any of these conditions are null the database does not contain enough info to render the video
            if (service == null || service.Video == null || !service.Video.Stop.HasValue || !service.Video.Start.HasValue)
            {
                return Json(rvm);
            }
            rvm.FirstName = service.FirstName;
            rvm.LastName = service.LastName;
            rvm.FuneralHomeName = service.FuneralHome.Name;
            rvm.Start = (int)service.Video.Start.Value.TotalSeconds;
            rvm.Duration = (int)service.Video.Stop.Value.TotalSeconds;
            rvm.RawFileNames = vq.BlobPath;
            rvm.ConvertedFileName = service.Video.ConvertedFilePath;
            rvm.VideoQueId = vq.Id;
            rvm.ResourceGroupName = vq.ResourceGroupName;
            rvm.ServiceId = service.Id;
            rvm.ServiceDate = service.ServiceDate;
            rvm.VideoQueType = vq.VideoQueType;

            //If the video is uploaded to azure farm, its ready to be rendered. All other status mean it's either rendering or not ready.
            if(vq.VideoStatus == VideoQueueStatus.UploadedToAzureRenderFarm)
            {
                rvm.FoundVideoToRender = true;
            }
            else
            {
                rvm.FoundVideoToRender = false;
            }

            return Json(rvm);

        }

        [HttpPost]
        public ActionResult GetResourceGroupName(string machineName)
        {
            VideoQueue vq = db.VideoQueues.Where(q => q.VMName == machineName).FirstOrDefault();
            return Json(new { ResourceGroupName = vq.ResourceGroupName });
        }

        [HttpPost]
        public ActionResult UpdateVideoStatus(int id, VideoStatus status)
        {
            Video vid = db.Videos.Find(id);
            if (vid != null)
            {
                vid.Status = status;
                db.Entry(vid).State = EntityState.Modified;
                db.SaveChanges();

                return Json(new { Success = true });
            }

            return Json(new { Error = "Error no video Q found" });
        }

        [HttpPost]
        //Service ID
        public ActionResult NotifyFuneralHome(int id)
        {
            Service service = db.Services.Find(id);
            if (service != null)
            {
                if (service.IsSecured)
                {
                    Email.sendFuneralHomeNotificationSecure(service);
                    if (service.ContactEmail != null)
                    {
                        Email.sendFamilyNotificationSecure(service);
                    }
                }
                else
                {
                    Email.sendStyledEmbedCode(service.FuneralHome.Email, service.FirstName, service.LastName, service.Id.ToString());
                }
                return Json(new { Success = true });
            }
            return Json(new { Error = "Error no video found" });
        }

        [HttpPost]
        public ActionResult SetVideoThumbnail(int id, string thumbnail)
        {
            Video vid = db.Videos.Find(id);
            if (vid != null)
            {
                vid.ImagePath = thumbnail;
                db.Entry(vid).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { Success = true });
            }
            return Json(new { Error = "Error no video found" });
        }


        [HttpPost]
        public ActionResult DeleteVideoQue(int id)
        {
            VideoQueue vq = db.VideoQueues.Find(id);
            if (vq != null)
            {
                db.Entry(vq).State = EntityState.Deleted;
                db.SaveChanges();
                return Json(new { Success = true });
            }
            return Json(new { Error = "Error Video Que Can Not Be Null" });
        }

        [HttpPost]
        public ActionResult SendErrorEmail(string message)
        {
            Email.sendErrorMessage(message);
            return Json(new { Success = true });
        }

        [HttpPost]
        public ActionResult SendAdminEmail(string message)
        {
            Email.sendAdminMessage(message);
            return Json(new { Success = true });
        }

        [HttpPost]
        public ActionResult UpdateVideoQueStatus(int id, VideoQueueStatus status)
        {
            VideoQueue vq = db.VideoQueues.Find(id);
            if (vq != null)
            {
                vq.VideoStatus = status;
                db.Entry(vq).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                return Json(new { Error = "Error no video Q found" });
            }
            return Json(new { Success = true });
        }

   


        public ActionResult AccessDenied()
        {
            Response.StatusCode = 403;
            return View();
        }

        private bool AuthorizeAPI()
        {
            string apikey = System.Web.HttpContext.Current.Request.Headers["api-key"];
            string correctAPIKey = ConfigurationManager.AppSettings["internalAPIKey"];
            if (apikey == correctAPIKey)
            {
                return true;
            }
            return false;
        }
    }

}