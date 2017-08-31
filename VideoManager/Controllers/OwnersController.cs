using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Controllers
{
    public class OwnersController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
        // GET: Owners
        public ActionResult Index()
        {
            return View(db.Owners.ToList());
        }
        public ActionResult Dashboard()
        {
            if (!User.IsInRole("Admin"))
            {
                return View("NotFound");
            }
            //TODO: write logic to derive the owner id based on user that is logged in
            int ownerId = 2;
            List<FuneralHome> Homes = db.FuneralHomes.Where(f => f.DevHome == false && f.OwnerId==ownerId).ToList();
            List<Analytic> Analytics = new List<Analytic>();
            AnalyticViewModel AVM = new AnalyticViewModel();
            AnalyticDashboardViewModel ADVM = new AnalyticDashboardViewModel();
            List<Service> Services = new List<Service>();

            Analytics = db.Analytics.Where(a => a.Video.Service.FuneralHome.DevHome == false && a.Video.Service.FuneralHome.OwnerId == ownerId).ToList();
            Services = db.Services.Where(s => s.FuneralHome.DevHome == false && s.FuneralHome.OwnerId == ownerId).ToList();
        
            List<IpAddressObject> addresses = new List<IpAddressObject>();
            foreach (var an in Analytics)
            {
                if (an.Latitude != 0 && an.Longitude != 0)
                {
                    //Database got mucked up with a bunch of hard coded values
                    //So lets exclude those IP addresses from the heat map
                    if (an.IPAddress != "174.17.56.90")
                    {
                        IpAddressObject add = new IpAddressObject();
                        add.IpAdd = an.IPAddress;
                        add.latitude = an.Latitude;
                        add.longitude = an.Longitude;
                        addresses.Add(add);
                    }
                }
            }

            DateTime LastWeek = DateTime.Now.AddDays(-7);
            List<Analytic> thisWeekAnalytics = Analytics.Where(a => a.CreateDate > LastWeek).ToList();
            string mostViewedHome = "";
            int HighestVIews = 0;
            int popularhomeId = 0;
            foreach (var home in Homes)
            {
                int homeViews = thisWeekAnalytics.Where(a => a.Video.Service.FuneralHome.Id == home.Id).Count();
                if (homeViews > HighestVIews)
                {
                    mostViewedHome = home.Name;
                    HighestVIews = homeViews;
                    popularhomeId = home.Id;
                }
            }
            CRMFuneralHome popFH = db.CRMFuneralHome.Where(f => f.FuneralHomeId == popularhomeId).FirstOrDefault();
            CRMContact PopularHomePicCont = null;
            if (popFH != null)
            {
                PopularHomePicCont = popFH.PrimaryCRMContact;
            }

            if (PopularHomePicCont != null)
            {
                ADVM.PopularHomeOfTheWeekImage = PopularHomePicCont.PictureFileName;
            }
            ADVM.PopularHomeOfTheWeek = mostViewedHome;
            ADVM.PopularHomeNumOfViews = HighestVIews;
            ADVM.ServicesBarChartArray = Admin.GetServicesBarChart(Services, DateTime.Now.AddMonths(-3), DateTime.Now);
            AVM.Details = addresses;
            CalculateAnalytics.PageViews(ref ADVM, Analytics, Homes);
            CalculateAnalytics.AverageTime(ref AVM, Analytics);
            Admin.dashboardlinechart(ref ADVM, Analytics);
            CalculateAnalytics.linechart(ref AVM, Analytics);
            ADVM.TotalFuneralsWithVideos = Admin.GetTotalServicesWithVideo(Services);
            ADVM.MonthlyFuneralsWithVideos = Admin.GetServicesThisMonthWithVideo(Services);
            ADVM.LowUsageHomes = CalculateAnalytics.LowUsageHomes(Homes);

            return View(ADVM);
        }
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
		public ActionResult Home(int? id)
		{
			if(id==null)
			{
				string userId = User.Identity.GetUserId();
				id = db.Owners.Where(o => o.UserId == userId).FirstOrDefault().Id;
				if(id==null)
				{
					return View("NotFound");
				}
			}
			List<FuneralHome> homes =  db.FuneralHomes.Where(h => h.Owner.Id == id).ToList();
			List<OwnerIndexViewModel> indexs = new List<OwnerIndexViewModel>();
            List<Service> services = new List<Service>();
			foreach(var home in homes)
			{
                int PDFCount = home.Services.Where(h => h.PDF != null).Count();
                int VidCount = home.Services.Where(h => h.Video != null).Count();
				OwnerIndexViewModel index = new OwnerIndexViewModel
				{
					TotalServices = home.Services.Count(),
					MonthlyServices = home.Services.Where(s=>s.ServiceDate > DateTime.Now.AddDays(-30)).Count(),
					HomeName = home.Name,
					City = home.City,
					State = home.State,
					PDFViews = 0,
					VideoViews = 0,
					HasPaid = home.PaymentStatus,
					Id = home.Id,
                    PageViews = 0,
                    NumberOfPdfs = PDFCount,
                    NumberOfVideos = VidCount
				};
                var pdfViews = 0;
                var pageViews = 0;
                var videoViews = 0;
                foreach(var service in home.Services)
                {
                    if(service.PDF != null)
                    {
                        pdfViews = pdfViews + service.PDF.PageHits;
                    }
                    if(service.Video !=null)
                    {
                        videoViews = videoViews + service.Video.PageHits;
                    }
                    pageViews = pageViews + service.PageHits;
                    services.Add(service);
                }
                //Page Views is very innacurate do to only being calculated on sites with video embedded
                index.PageViews = pageViews;
                index.PDFViews = pdfViews;
                index.VideoViews = videoViews;
                indexs.Add(index);
			}
            setViewBagAnalytics(services);
			return View(indexs);
		}
        private void setViewBagAnalytics(List<Service> services)
        {
            DateTime month = DateTime.Now.AddDays(-30);
            ViewBag.totalPDFViews = services.Where(s => s.PDF != null).Sum(s => s.PDF.PageHits);
            ViewBag.monthPDFViews = services.Where(s => s.ServiceDate > month && s.PDF != null).Sum(s => s.PDF.PageHits);
            ViewBag.totalVideoViews = services.Where(s => s.Video != null).Sum(s => s.Video.PageHits);
            ViewBag.monthVideoViews = services.Where(s => s.ServiceDate > month && s.Video != null).Sum(s => s.Video.PageHits);
            ViewBag.totalServices = services.Count;
            ViewBag.monthServices = services.Where(s => s.ServiceDate > month).Count();
            if (User.IsInRole("Admin"))
            {
                int videoPageHits = 0;
                int pdfPageHits = 0;
                int videoViews = 0;
                int pdfViews = 0;

                if (services.Where(s => s.Id != null).FirstOrDefault().FuneralHome.Setting.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralNet)
                {
                    foreach (var service in services)
                    {
                        if (service.Video != null)
                        {
                            //The service page hits is derived from every time the iframe is loaded. So if the video has 0 views lets assume it's not embedded on the video page
                            if (service.Video.PageHits > 0)
                            {
                                if (service.PageHits > 0)
                                {
                                    videoPageHits = videoPageHits + service.PageHits;
                                    videoViews = videoViews + service.Video.PageHits;
                                    if (service.PDF != null)
                                    {
                                        if (service.PDF.PageHits > 0)
                                        {
                                            pdfPageHits = pdfPageHits + service.PageHits;
                                            pdfViews = pdfViews + service.PDF.PageHits;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (pdfPageHits != 0)
                    {
                        double pdfConversionRate = (double)pdfViews / pdfPageHits;
                        ViewBag.PdfConversion = Math.Round(pdfConversionRate, 2) * 100;
                    }
                    if (videoPageHits != 0)
                    {
                        double videoConversionRate = (double)videoViews / videoPageHits;
                        ViewBag.VideoConversion = Math.Round(videoConversionRate, 2) * 100;
                    }

                }
            }
        }

        // GET: Owners/Details/5
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Owner owner = db.Owners.Find(id);
            if (owner == null)
            {
                return HttpNotFound();
            }
            return View(owner);
        }

        // GET: Owners/Create
        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Owners/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Owner owner)
        {
			if (ModelState.IsValid)
			{
				ApplicationUser newUser = new ApplicationUser();
				newUser.UserName = owner.UserName;
				newUser.Name = owner.Name;
				newUser.Email = owner.Email;
				var result = UserManager.Create(newUser);
				if (result.Succeeded)
				{
					var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
					var currentUserId = db.Users.Where(u => u.UserName == owner.UserName).FirstOrDefault().Id;
					userManager.AddToRole(currentUserId, "FuneralHomeOwner");
					owner.UserId = currentUserId;
					db.Owners.Add(owner);
					db.SaveChanges();
					return RedirectToAction("Index");
				}
				else
				{
					StringBuilder errors = new StringBuilder();
					foreach (var error in result.Errors)
					{
						errors.Append(error);
					}
					ViewBag.ErrorText = errors.ToString();
				}
			}

            return View(owner);
        }

        // GET: Owners/Edit/5
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Owner owner = db.Owners.Find(id);
            if (owner == null)
            {
                return HttpNotFound();
            }
            return View(owner);
        }

        // POST: Owners/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,IsDeleted,Name,Address1,Address2,City,State,ZipCode,Email,PhoneNumber,UserName,UserId,CreateDate")] Owner owner)
        {
            if (ModelState.IsValid)
            {
                db.Entry(owner).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(owner);
        }

        // GET: Owners/Delete/5
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Owner owner = db.Owners.Find(id);
            if (owner == null)
            {
                return HttpNotFound();
            }
            return View(owner);
        }

        // POST: Owners/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Owner owner = db.Owners.Find(id);
            db.Owners.Remove(owner);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
		public ActionResult SetPassword(int? id)
		{
			if (!User.IsInRole("Admin"))
			{
				return View("NotFound");
			}
			if (id == null)
			{
				return View("NotFound");
			}
			Owner owner = db.Owners.Find(id);
			if (owner == null)
			{
				return View("NotFound");
			}
			if (owner.UserId == null)
			{
				return View("Error");
			}
			ViewBag.StatusMessage = "";
			ViewBag.OwnerName = owner.Name;
			ViewBag.ReturnUrl = Url.Action("SetPassword");
			ManageUserViewModel model = new ManageUserViewModel();
			model.UserId = owner.UserId;
			model.FuneralHomeId = id;
			return View(model);
		}
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult SetPassword(ManageUserViewModel model)
		{

			// User does not have a password so remove any validation errors caused by a missing OldPassword field
			ModelState state = ModelState["OldPassword"];
			if (state != null)
			{
				state.Errors.Clear();
			}

			if (ModelState.IsValid)
			{
				UserManager.RemovePassword(model.UserId);
				IdentityResult result = UserManager.AddPassword(model.UserId, model.NewPassword);
				if (result.Succeeded)
				{
					ViewBag.StatusMessage = "Password has been set";
					return View(model);
				}
				else
				{
					ViewBag.StatusMessage = "There was an error setting the password";
					return View(model);
				}
			}


			// If we got this far, something failed, redisplay form
			return View(model);
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
