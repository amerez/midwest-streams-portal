using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Controllers
{
    public class AnnouncmentsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Announcments
        public ActionResult Index()
        {
            return View(db.Announcments.ToList());
        }

        // GET: Announcments/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Announcment announcment = db.Announcments.Find(id);
            if (announcment == null)
            {
                return HttpNotFound();
            }
            return View(announcment);
        }

        // GET: Announcments/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Announcments/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create([Bind(Include = "Id,Name,Header,Body,ExpirationDate")] Announcment announcment)
        {
            if (ModelState.IsValid)
            {
                db.Announcments.Add(announcment);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(announcment);
        }

        // GET: Announcments/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Announcment announcment = db.Announcments.Find(id);
            if (announcment == null)
            {
                return HttpNotFound();
            }
            return View(announcment);
        }

        // POST: Announcments/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "Id,Name,Header,Body,ExpirationDate")] Announcment announcment)
        {
            if (ModelState.IsValid)
            {
                db.Entry(announcment).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(announcment);
        }

        // GET: Announcments/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Announcment announcment = db.Announcments.Find(id);
            if (announcment == null)
            {
                return HttpNotFound();
            }
            return View(announcment);
        }

        // POST: Announcments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Announcment announcment = db.Announcments.Find(id);
            db.Announcments.Remove(announcment);
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
