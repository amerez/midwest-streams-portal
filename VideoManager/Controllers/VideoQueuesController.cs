using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Controllers
{
    public class VideoQueuesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: VideoQueues
        public ActionResult Index()
        {
            AzureControlCenterViewModel accvm = new AzureControlCenterViewModel();
            //AzureRender.TurnOnAzureVM("1");
            List<VideoQueue> vq = db.VideoQueues.ToList();
            accvm.VideosInQue = vq;
            return View(accvm);
        }

        // GET: VideoQueues/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VideoQueue videoQueue = db.VideoQueues.Find(id);
            if (videoQueue == null)
            {
                return HttpNotFound();
            }
            return View(videoQueue);
        }

        // GET: VideoQueues/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: VideoQueues/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(VideoQueue videoQueue)
        {
            if (ModelState.IsValid)
            {
                videoQueue.CreateDate = DateTime.Now;
                db.VideoQueues.Add(videoQueue);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(videoQueue);
        }

        // GET: VideoQueues/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VideoQueue videoQueue = db.VideoQueues.Find(id);
            if (videoQueue == null)
            {
                return HttpNotFound();
            }
            return View(videoQueue);
        }
        [HttpPost]
       public ActionResult UploadFilesToAzure(string[] fileNames, string container)
        {
     
            AzureRender.UploadFilesToAzure(fileNames, container);
     
            return Json(new { result = "bla" });
        }
        // POST: VideoQueues/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(VideoQueue videoQueue)
        {
            if (ModelState.IsValid)
            {
                db.Entry(videoQueue).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(videoQueue);
        }

        // GET: VideoQueues/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VideoQueue videoQueue = db.VideoQueues.Find(id);
            if (videoQueue == null)
            {
                return HttpNotFound();
            }
            return View(videoQueue);
        }

        // POST: VideoQueues/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            VideoQueue videoQueue = db.VideoQueues.Find(id);
            db.VideoQueues.Remove(videoQueue);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
