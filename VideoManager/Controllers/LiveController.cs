using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models.Data;

namespace VideoManager.Controllers
{
    public class LiveController : BaseController
    {
        // GET: Live
        public ActionResult Index(int? id)
        {
            Service service = db.Services.Find(id);
            if (service == null)
            {
                return View("NotFound");
            }
            return View(service);
        }

        [HttpPost]
        public ActionResult Create(int serviceId)
        {
            Service service = db.Services.Find(serviceId);
            if (service != null)
            {
                if (service.LiveStream == null)
                {
                    service.LiveStream = LiveCode.CreateLiveStream(service);

                }
            }
            return Json(new { result = "bla" });
        }
        [HttpPost]
        public ActionResult Start(int serviceId)
        {
            Service service = db.Services.Find(serviceId);
            if (service != null)
            {
                if (service.LiveStream != null)
                {

                    bool response = LiveCode.StartLiveStream(service.LiveStream.StreamId);

                    service.LiveStream.Started = response;
                    if (response)
                    {
                        string key = LiveCode.RegenerateStreamKey(service.LiveStream.StreamId);
                        service.LiveStream.ConnectionCode = key;
                        db.SaveChanges();
                        return Json(new { success = response, connectionKey = key });
                    }

                }
            }
            return Json(new { success = "false" });
        }

        [HttpPost]
        public ActionResult EmailStream(int serviceId)
        {
            Service service = db.Services.Find(serviceId);
            if (service != null)
            {
                if (service.LiveStream != null)
                {
                    LiveCode.SendEmail(service.Id, service.LiveStream.StartStreamAccessToken);
                    return Json(new { success = "true" });
                }
            }
            return Json(new { success = "false" });
        }
        public ActionResult StartFromEmail(int id, Guid? token)
        {
            Service service = db.Services.Find(id);
            if (service != null)
            {
                if (service.LiveStream != null)
                {
                    if (service.LiveStream.StartStreamAccessToken != token)
                    {
                        ViewBag.Status = "Invalid Access Token!";
                        return View();
                    }
                    bool response = LiveCode.StartLiveStream(service.LiveStream.StreamId);
                    service.LiveStream.Started = response;
                    if (response)
                    {
                        string key = LiveCode.RegenerateStreamKey(service.LiveStream.StreamId);
                        service.LiveStream.ConnectionCode = key;
                        db.SaveChanges();
                        ViewBag.Status = "Stream Started!";
                        ViewBag.ConnectionKey = key;
                        return View();
                    }

                }
            }
            ViewBag.Status = "Unable to Start Stream.";
            return View();
        }

        public ActionResult iframe(int id)
        {
            Service service = db.Services.Find(id);
            if (service != null)
            {
                if (service.LiveStream != null)
                {
                    return View(service);
                }
            }
            return View("NotFound");
        }
    }
}