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
            if(service==null)
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
    }
}