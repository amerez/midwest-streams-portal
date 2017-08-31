using RestSharp;
using RestSharp.Serializers;
using RestSharp.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;
using RestSharp.Deserializers;
using VideoManager.Models.ViewModels;
using VideoManager.Code;

namespace VideoManager.Controllers
{
    public class CompetitorWatchController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: CompetitorWatch
        public ActionResult Index()
        {
            var cwFuneralHome = db.CWFuneralHomes.ToList();
            return View(cwFuneralHome);
       
        }
        public ActionResult AddFuneralHome()
        {
            CWFuneralHome cwFuneralHome = new CWFuneralHome();
            return View(cwFuneralHome);
        }
        public ActionResult Compare(int id, int competitorId)
        {
            CWFuneralHome cwYourHome = db.CWFuneralHomes.Find(id);
            CWFuneralHome cwTheirHome = db.CWFuneralHomes.Find(competitorId);

            //DateTime old = DateTime.Now.AddYears(-10);
            //CWObituary toDelete = db.CWObituary.Where(d => d.DeathDate < old).FirstOrDefault();
            //db.Entry(toDelete).State = System.Data.Entity.EntityState.Deleted;
            //db.SaveChanges();
            CompareViewModel cvm = new CompareViewModel();
            if(cwYourHome !=null && cwTheirHome!=null)
            {
                cvm.AvgAge = cwYourHome.CWObituary.Where(o=>o.Age!=0).Average(o => o.Age);
                cvm.CompetitorAvgAge = cwTheirHome.CWObituary.Where(o=>o.Age!=0).Average(o => o.Age);
                CompetitorWatchHelper.GenerateCompetiveLineChart(cwYourHome, cwTheirHome, ref cvm);
            }
            return View(cvm);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddFuneralHome(CWFuneralHome CWFuneralHome)
        {
            db.CWFuneralHomes.Add(CWFuneralHome);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult GetObituaries(int CWFuneralHomeId)
        {
            CWFuneralHome cwHome = db.CWFuneralHomes.Find(CWFuneralHomeId);
            if(cwHome!=null)
            {
                CompetitorWatchHelper cwHelper = new CompetitorWatchHelper();
              int numOfObitsInserted = cwHelper.ScrapeObituaries(cwHome);
             }
                else
                {
                    return Json(new { result = "Error with funeral one api" });
                }
             
            return Json(new { result = "success" });
        }
        public ActionResult Obituaries()
        {
            List<CWObituary> Obituaries = db.CWObituary.ToList();
            return View(Obituaries);
        }
    }

 

}