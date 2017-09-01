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
using Microsoft.AspNet.Identity;
using VideoManager.Models.ViewModels;
using System.Text.RegularExpressions;
using System.Web.Configuration;
using AutoMapper;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using VideoManager.Code;
using Microsoft.Owin.Security;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Stripe;

namespace VideoManager.Controllers
{
    public class ServicesController : BaseController
    {
        
        private IAuthenticationManager AuthenticationManager { get { return HttpContext.GetOwinContext().Authentication; } }
        private ApplicationDbContext db = new ApplicationDbContext();

        [Authorize(Roles = "Admin,FuneralHome, FuneralHomeOwner")]
        public ActionResult Index(int? id)
        {

            List<Service> services = null;
            if (User.IsInRole("FuneralHomeOwner") || User.IsInRole("Admin") && id != null)
            {
                services = db.Services.Where(h => h.FuneralHomeId == id).ToList();
                setViewBagAnalytics(services);
                return View(services);
            }

            var userId = User.Identity.GetUserId();
            if (UserManager.GetRoles(userId).Contains("FuneralHome"))
            {
                services = db.Services.Where(s => s.FuneralHome.UserId == userId && s.IsDeleted != true).OrderByDescending(y => y.ServiceDate).ToList();
            }
            else
            {
                services = db.Services.Where(v => v.IsDeleted != true).OrderByDescending(y => y.ServiceDate).ToList();
            }
            if (services.Count > 0 && !User.IsInRole("Admin"))
            {
                FuneralHome home = services.FirstOrDefault().FuneralHome;
                if (home != null)
                {
                    if (home.Setting != null)
                    {
                        if (home.Setting.DisplayTutorial == true)
                        {
                            ViewBag.DisplayTutorial = true;
                        }
                    }
                }
            }
            setViewBagAnalytics(services);
            return View(services);
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
                var nonDevServices = services.Where(s => s.FuneralHome.Owner.Name != "DevHomes").FirstOrDefault();
                if (nonDevServices != null)
                {
                    if (nonDevServices.FuneralHome.Setting.WebsiteProvider == Models.Data.Enums.WebsiteProvider.FuneralNet)
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
        }
  
        public ActionResult golive(int? ServiceId)
        {
            Service service = db.Services.Find(ServiceId);
            if(service!=null)
            {
                if(service.LiveStream==null)
                {
                   service.LiveStream = LiveCode.CreateLiveStream(service);

                }
                else
                {
                   var ls = LiveCode.GetLiveStream(service.LiveStream.StreamId);
                    if(ls==null)
                    {
                        LiveCode.CreateLiveStream(service);
                    }
                }
                
            }
            return View("Live", service);
        }

        public ActionResult startlivestream(int? id, string token)
        {
            StartLiveStreamViewModel slsvm = new StartLiveStreamViewModel();

            VideoManager.Models.Data.LiveStream ls = db.LiveStreams.Find(id);
            if(ls.StartStreamAccessToken.ToString()==token)
            {
                string wowzaId = ls.StreamId;
                LiveCode.StartLiveStream(wowzaId);
                slsvm.FirstName = ls.Service.FirstName;
                slsvm.LastName = ls.Service.LastName;
                return View(slsvm);
            }
            slsvm.StartedLiveStream = false;
            slsvm.ErrorMessage = "Invalid Access Token";
            return View(slsvm);
        }
        [Authorize(Roles = "FuneralHome, Admin, FuneralHomeOwner")]
        public ActionResult Manage(int? id)
        {
          
            if (id == null)
            {
                if (User.IsInRole("Admin"))
                {
                    ViewBag.FuneralHomeId = new SelectList(db.FuneralHomes, "Id", "Name");
                    return View();
                }
                var userId = User.Identity.GetUserId();
                FuneralHome home = db.FuneralHomes.Where(f => f.UserId == userId).FirstOrDefault();
                Service service = new Service
                {
                    FuneralHomeId = home.Id,
                    ServiceDate = DateTime.Now,
                    DeathDay = DateTime.Now.AddDays(-3),
                    Birthday = DateTime.Now.AddYears(-80)

                };


                return View(service);
            }

            Service prevService = db.Services.Find(id);

            if (prevService == null || !Authorize(prevService.FuneralHome))
            {
                return View("NotFound");
            }

            return View(prevService);
        }

        [Authorize(Roles = "FuneralHome, Admin, FuneralHomeOwner")]
        public ActionResult NoModal(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }

            Service prevService = db.Services.Find(id);
            if (!Authorize(prevService.FuneralHome))
            {
                return View("NotFound");
            }

            return View(prevService);
        }

        [Authorize(Roles = "FuneralHome, Admin, FuneralHomeOwner")]
        public ActionResult MobileUpload(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }

            Service prevService = db.Services.Find(id);
            if (!Authorize(prevService.FuneralHome))
            {
                return View("NotFound");
            }

            return View(prevService);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Manage(Service service)
        {
            var errors = ModelState
    .Where(x => x.Value.Errors.Count > 0)
    .Select(x => new { x.Key, x.Value.Errors })
    .ToArray();
            if (ModelState.IsValid)
            {
                if (service.Id == 0)
                {
                    var loggedInUserId = User.Identity.GetUserId();
                    FuneralHome home = db.FuneralHomes.Where(f => f.UserId == loggedInUserId).FirstOrDefault();
                    service.FuneralHome = home;
                    service = db.Services.Add(service);
                    db.SaveChanges();
                }
                else
                {
                    //Not sure why lazy load isn't working here
                    Video vid = db.Videos.Find(service.Id);
                    if (vid != null)
                    {
                       if(service.Video !=null && User.IsInRole("Admin"))
                       {
                           if (service.Video.Status != null)
                           {
                               Video serviceVid = db.Videos.Find(service.Id);
                               serviceVid.Status = service.Video.Status;
                               serviceVid.ConvertedFilePath = service.Video.ConvertedFilePath;
                               db.Entry(serviceVid).State = EntityState.Modified;
                               service.Video = serviceVid;
                            
                           }
                       }
                       if (service.IsSecured && service.ViewingUserId == null)
                       {
                           SecuredServiceHelper servHelp = new SecuredServiceHelper();
                           servHelp.MakeServiceSecure(service, db);
                       }
                    }


                    db.Entry(service).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return RedirectToAction("Manage", new { id = service.Id });
            }
            return View(service);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult AdminCreate()
        {
            List<FuneralHome> homes = new List<FuneralHome>();
            homes = db.FuneralHomes.Where(h => h.Id != null).ToList();
            ViewBag.HomeList = homes;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdminCreate(Service service)
        {

            if (ModelState.IsValid)
            {
                //service.Video = new Video();
                service = db.Services.Add(service);
                db.SaveChanges();
                ViewBag.ServiceName = service.FirstName + " " + service.LastName;
                return RedirectToAction("AdminAddVideo", new { id = service.Id });

            }
            List<FuneralHome> homes = new List<FuneralHome>();
            homes = db.FuneralHomes.Where(h => h.Id != null).ToList();
            ViewBag.HomeList = homes;
            return View(service);

        }
        [Authorize(Roles = "Admin")]
        //Id is actually service Id
        public ActionResult AdminAddVideo(int? id)
        {
            ViewBag.ServiceId = new SelectList(db.Services, "Id", "FirstName", id);
            return View();
        }
        [Authorize]
        public ActionResult ManualConvert(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            if (service == null)
            {
                return View("NotFound");
            }
            return View(service);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdminAddVideo(Video video)
        {
            if (ModelState.IsValid)
            {
                Service service = db.Services.Find(video.ServiceId);
                if (service.Video == null)
                {
                    db.Entry(video).State = EntityState.Added;
                }
                else
                {
                    db.Entry(video).State = EntityState.Modified;
                }

                var result = db.SaveChanges();
                if (result > 0)
                {
                    return RedirectToAction("Index");
                }
            }
            return View(video);
        }
        //ID is for service
        [Authorize(Roles = "FuneralHome, Admin")]
        public ActionResult CreatePDF(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);

            if (service == null)
            {
                return View("NotFound");
            }
            return View(service);
        }
        [Authorize(Roles = "Admin")]
        // GET: Services/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            ServiceAdminEditViewModel editViewModel = new ServiceAdminEditViewModel()
            {
                FirstName = service.FirstName,
                LastName = service.LastName,
                Obituary = service.Obituary,
                Birthday = service.Birthday,
                DeathDay = service.DeathDay,
                ServiceDate = service.ServiceDate,
                ServiceId = service.Id,
                ContactEmail = service.ContactEmail,
            };

            if (service.Video != null)
            {
                editViewModel.Status = service.Video.Status;
                editViewModel.ConvertedFilePath = service.Video.ConvertedFilePath;
                editViewModel.OldVideoId = service.Video.OldVideoId;
            }
            //Mapper.CreateMap(service, )
            if (service == null)
            {
                return HttpNotFound();
            }
            return View(editViewModel);
        }

        // POST: Services/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(ServiceAdminEditViewModel service)
        {

            if (ModelState.IsValid)
            {
                Service dBService = db.Services.Find(service.ServiceId);

                dBService.FirstName = service.FirstName;
                dBService.LastName = service.LastName;
                dBService.Obituary = service.Obituary;
                dBService.Birthday = service.Birthday;
                dBService.DeathDay = service.DeathDay;
                dBService.ServiceDate = service.ServiceDate;
                dBService.ContactEmail = service.ContactEmail;
                if (dBService.Video != null)
                {
                    dBService.Video.ConvertedFilePath = service.ConvertedFilePath;
                    dBService.Video.Status = service.Status;
                    dBService.Video.OldVideoId = service.OldVideoId;
                }
                db.Entry(dBService).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(service);
        }
        [HttpPost]
        public async Task<ActionResult> TrackVideoViews(int? id)
        {
            if(!User.IsInRole("FuneralHome"))
            {
                if (id == null)
                {
                    return Json(new { foo = "fail" });
                }
                Random rand = new Random();
                Service service = db.Services.Find(id);
                if (service == null)
                {
                    return Json(new { foo = "fail" });
                }
                Video video = service.Video;
                if (video == null)
                {
                    return Json(new { foo = "fail" });
                }
                int currentPageHits = video.PageHits;
                if (currentPageHits != null)
                {
                    if (rand.Next(0, 2) == 0)
                    {
                        currentPageHits = video.PageHits + 1;
                    }
                    else
                    {
                        currentPageHits = video.PageHits + 2;
                    }
                }
                else
                {
                    currentPageHits = 1;
                }
                string strIpAddress = string.Empty;
                strIpAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (strIpAddress == "" || strIpAddress == null)
                {
                    strIpAddress = Request.ServerVariables["REMOTE_ADDR"];
                }

                //Don't record analytics coming from garbage IP addresses
                if (strIpAddress != "::1")
                {
                    Analytic analyitic = new Analytic();
                    analyitic.IPAddress = strIpAddress;
                    analyitic.VideoId = video.ServiceId;
                    video.Analytics.Add(analyitic);
                    video.PageHits = currentPageHits;
                    db.SaveChanges();
                    await PopulateAnalyticObject(analyitic);
                    return Json(new { Id = analyitic.Id });
                }
            }
       
            return Json(new { Id = 0 });

        }
        public async Task<bool> PopulateAnalyticObject(Analytic analytic)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://freegeoip.net/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // New code:
                HttpResponseMessage response = await client.GetAsync("json/" + analytic.IPAddress);
                if (response.IsSuccessStatusCode)
                {
                    IpAddressObject ips = new IpAddressObject();
                    try
                    {
                        ips = await response.Content.ReadAsAsync<IpAddressObject>();

                    }
                    catch
                    {
                        return false; ;
                    }

                    analytic.Latitude = ips.latitude;
                    analytic.Longitude = ips.longitude;
                    analytic.City = ips.city;
                    analytic.CountryCode = ips.country_code;
                    analytic.MetroCode = ips.metro_code;
                    analytic.RegionCode = ips.region_code;
                    analytic.RegionName = ips.region_name;
                    analytic.TimeZone = ips.time_zone;
                    analytic.ZipCode = ips.zip_code;
                    db.Entry(analytic).State = EntityState.Modified;
                    int records = db.SaveChanges();
                    if (records > 0)
                    {
                        return true;
                    }
                    // Console.WriteLine("{0}\t${1}\t{2}", ips.Name, product.Price, product.Category);
                }

            }
            return false;

        }
        public async Task<bool> PopulateDownloadAnalyticObject(DownloadAnalytic analytic)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://freegeoip.net/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // New code:
                HttpResponseMessage response = await client.GetAsync("json/" + analytic.IPAddress);
                if (response.IsSuccessStatusCode)
                {
                    IpAddressObject ips = new IpAddressObject();
                    try
                    {
                        ips = await response.Content.ReadAsAsync<IpAddressObject>();

                    }
                    catch
                    {
                        return false; ;
                    }

                    analytic.Latitude = ips.latitude;
                    analytic.Longitude = ips.longitude;
                    analytic.City = ips.city;
                    analytic.CountryCode = ips.country_code;
                    analytic.MetroCode = ips.metro_code;
                    analytic.RegionCode = ips.region_code;
                    analytic.RegionName = ips.region_name;
                    analytic.TimeZone = ips.time_zone;
                    analytic.ZipCode = ips.zip_code;
                    db.Entry(analytic).State = EntityState.Modified;
                    int records = db.SaveChanges();
                    if (records > 0)
                    {
                        return true;
                    }
                    // Console.WriteLine("{0}\t${1}\t{2}", ips.Name, product.Price, product.Category);
                }

            }
            return false;

        }
        [HttpPost]
        public ActionResult UpdateAnalytics(int id, int stopTime, int duration, bool completed)
        {
            Analytic analytic = db.Analytics.Find(id);
            if (analytic == null)
            {
                return Json(new { foo = "fail" });
            }
            analytic.Completed = completed;
            analytic.Duration = duration;
            //Take the longest duration and record it
            if (stopTime > analytic.Stop && stopTime < duration)
            {
                analytic.Stop = stopTime;
            }
            analytic.PlayCount = analytic.PlayCount + 1;
            db.SaveChanges();
            return Json(new { analyticId = analytic.Id });


        }

        [AllowAnonymous]
        public ActionResult View(int? id)
        {
           
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);

            if (service == null)
            {
                return View("NotFound");
            }
            //VideoConverter conv = new VideoConverter();
            //Video vid = service.Video;
            //vid.ImagePath = conv.ExtractThumbnail(service.Video);
            //db.Entry(vid).State = EntityState.Modified;
            //db.SaveChanges();
           
            if (service.IsSecured == false)
            {
                return View(service);
            }
            if (!Authorize(service, true))
            {
                if(User.Identity.IsAuthenticated)
                {
                    AuthenticationManager.SignOut();
                }
                string returnUrl = "/services/view/" + id.ToString();
                return RedirectToAction("Login", "Account", new { ReturnUrl = returnUrl });
            }
           
            return View(service);
        }

        [Authorize(Roles = "FuneralHome,FuneralHomeOwner, Admin")]
        // GET: Services/Edit/5
        public ActionResult Notify(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            if (service == null)
            {
                return View("NotFound");
            }

            if (!Authorize(service.FuneralHome))
            {
                return View("NotFound");
            }


            NotifyViewModel notify = new NotifyViewModel();
            notify.Id = service.Id;
            notify.IsSecured = service.IsSecured;
            notify.ContactEmail = service.ContactEmail;
            notify.FirstName = service.FirstName;
            notify.LastName = service.LastName;
            return View(notify);
        }

        [AllowAnonymous]
        public ActionResult iframe(int? id)
        {
            if (id == null)
            {
                return View("Blank");
            }
            Video video = db.Videos.Find(id);
            if (video == null || video.Service.IsSecured == true)
            {
                return View("Blank");
            }
            Service service = video.Service;
            if (service.FuneralHome.PaymentStatus == Models.Data.Enums.PaymentStatus.Unsubscribed)
            {
                return View("Blank");
            }
            if (service == null)
            {
                return View("Blank");
            }
            int currentPageHits = 0;
            try
            {
                Random rand = new Random();
                if (service.PageHits != null)
                {
                    if (rand.Next(0, 2) == 0)
                    {
                        currentPageHits = service.PageHits + 1;
                    }
                    else
                    {
                        currentPageHits = service.PageHits + 2;
                    }
                }
                else
                {
                    currentPageHits = 1;
                }
                service.PageHits = currentPageHits;
                db.SaveChanges();
            }
            //The above code should always work, but just to be safe
            catch
            {
                return PartialView(service);
            }
            return PartialView(service);
        }

        [AllowAnonymous]
        public ActionResult iframed(int? id)
        {
            if (id == null)
            {
                return View("Blank");
            }
            Video video = db.Videos.Find(id);
            if (video == null || video.Service.IsSecured == true)
            {
                return View("Blank");
            }
            Service service = video.Service;
            if (service.FuneralHome.PaymentStatus == Models.Data.Enums.PaymentStatus.Unsubscribed)
            {
                return View("Blank");
            }
            if (service == null)
            {
                return View("Blank");
            }
      
            return PartialView(service);
        }

        [AllowAnonymous]
        public ActionResult Live(int? id)
        {
            Service serv = db.Services.Find(id);
            if(serv==null)
            {
                return View("NotFound");
            }
            return View(serv);
        }
        [AllowAnonymous]
        public ActionResult DisplayVideo(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            if (service == null || service.Video == null)
            {
                return View("NotFound");
            }
            string videoLink = ConfigurationManager.AppSettings["videoCDN"] + "/videos/" + service.Video.ConvertedFilePath;
            Video video = service.Video;
            int currentPageHits = 0;
            try
            {
                Random rand = new Random();
                if (video.PageHits != null)
                {
                    if (rand.Next(0, 2) == 0)
                    {
                        currentPageHits = video.PageHits + 1;
                    }
                    else
                    {
                        currentPageHits = video.PageHits + 2;
                    }
                }
                else
                {
                    currentPageHits = 1;
                }
                video.PageHits = currentPageHits;
                db.SaveChanges();
            }
            //The above code should always work, but just to be safe
            catch
            {
                return Redirect(videoLink);
            }
            return Redirect(videoLink);
        }
        // POST: Services/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Notify(NotifyViewModel notify)
        {
            if (ModelState.IsValid)
            {
                Service service = db.Services.Find(notify.Id);

                if (notify.IsSecured == true)
                {
                    string userName = service.FirstName + service.LastName + service.Id.ToString();
                    userName = userName.Replace(" ", "");
                    var currentUser = UserManager.FindByName(userName);
                    //Delete user if already exists
                    if (currentUser != null)
                    {
                        service.ViewingUserId = null;
                        service.ViewingUser = null;
                        db.Entry(service).State = EntityState.Modified;
                        db.SaveChanges();
                        UserManager.Delete(currentUser);
                    }
                    ApplicationUser viewingUser = new ApplicationUser();
                    var rndNum = new Random(DateTime.Now.Second);
                    var rawPW = System.Web.Security.Membership.GeneratePassword(8, 0);
                    rawPW = Regex.Replace(rawPW, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());

                    viewingUser.UserName = userName;
                    viewingUser.Name = notify.ContactName;
                    UserManager.Create(viewingUser, rawPW);
                    UserManager.AddToRole(viewingUser.Id, "Viewing");
                    service.ViewingUserId = viewingUser.Id;
                    if (service.Video != null)
                    {
                        //Email.sendFamilyNotificationSecure(service, notify, userName, rawPW);
                    }

                }
                else
                {
                    Email.sendFamilyNotification(service, notify);
                }

                service.ContactEmail = notify.ContactEmail;
                service.IsSecured = notify.IsSecured;
                db.Entry(service).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(notify);
        }
        [AllowAnonymous]
        public async Task<ActionResult> Download(int? id, bool? bought, string stripeId)
        {
            Service service = db.Services.Find(id);
            if (id == null)
            {
                return View("NotFound");
            }
            if (service.Video != null)
            {
           if(bought==true && stripeId !=null)
           {
               int nonNullId =  id.Value;
               
               string strIpAddress = string.Empty;
               strIpAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

               if (strIpAddress == "" || strIpAddress == null)
               {
                   strIpAddress = Request.ServerVariables["REMOTE_ADDR"];
               }

               //Don't record analytics coming from garbage IP addresses
               if (strIpAddress != "::1")
               {
                   DownloadAnalytic analyitic = new DownloadAnalytic();
                   analyitic.IPAddress = strIpAddress;
                   analyitic.ServiceId = nonNullId;
                   service.DownloadAnalytics.Add(analyitic);
                   db.SaveChanges();
                   await PopulateDownloadAnalyticObject(analyitic);
               }
                    try
                    {
                        var chargeService = new StripeChargeService();
                        StripeCharge stripeCharge = chargeService.Get(stripeId);
                        if (stripeCharge.Status == "succeeded")
                        {
                            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                            CloudBlobContainer container = blobClient.GetContainerReference("videos");
                            string userFileName = service.FirstName + service.LastName + "Video.mp4";
                            Response.AddHeader("Content-Disposition", "attachment; filename=" + userFileName); // force download
                            container.GetBlobReference(service.Video.ConvertedFilePath).DownloadToStream(Response.OutputStream);
                            return new EmptyResult();
                        }
                    }
                    catch
                    {
                        return View("NotFound");
                    }
                  
                }
            if(Authorize(service))
                {
                    if (service.Video != null)
                    {

                        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                        CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                        CloudBlobContainer container = blobClient.GetContainerReference("videos");
                        string userFileName = service.FirstName +"_"+ service.LastName + "_Video.mp4";
                        CloudBlockBlob blob = container.GetBlockBlobReference(service.Video.ConvertedFilePath);
                        SharedAccessBlobPolicy policy = new SharedAccessBlobPolicy()
                        {
                            Permissions = SharedAccessBlobPermissions.Read,
                            SharedAccessExpiryTime = DateTime.Now.AddYears(100)
                        };
                        SharedAccessBlobHeaders blobHeaders = new SharedAccessBlobHeaders()
                        {
                            ContentDisposition = "attachment; filename=" + userFileName
                        };
                        string sasToken = blob.GetSharedAccessSignature(policy, blobHeaders);
                        var sasUrl = blob.Uri.AbsoluteUri + sasToken;//This is the URL you will use. It will force the user to download the vi
                        return Redirect(sasUrl);
                    }
                }
          

            }
            return View("NotFound");
        }
        // GET: Services/Delete/5
        [Authorize(Roles = "Admin, FuneralHomeOwner, FuneralHome")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            if (service == null)
            {
                return View("NotFound");
            }

            if (!Authorize(service.FuneralHome))
            {
                return View("NotFound");
            }
            return View(service);
        }

        // POST: Services/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {

            
            Service service = db.Services.Find(id);
      
            Video video = service.Video;
            if (video != null)
            {
               
                if(video.ConvertedFilePath!=null)
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("videos");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(video.ConvertedFilePath);
                    if (blockBlob.Exists())
                    {
                        blockBlob.Delete();
                    }
                }
                if(video.Analytics!=null)
                {
                    List<Analytic> anly = video.Analytics.ToList();
                    if(anly.Count>0)
                    {
                        try
                        {
                            db.Entry(anly).State = EntityState.Deleted;
                        }
                        catch
                        {
                            foreach(var an in anly)
                            {
                                an.VideoId = 5850;
                                db.Entry(an).State = EntityState.Modified;
                            }
                        }
                          
                        
                    }
                }
                
                db.Entry(video).State = EntityState.Deleted;
          
             
            }
            
            if (service.PDF != null)
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("pdfs");
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(service.PDF.PDFPath);
                if (blockBlob.Exists())
                {
                    blockBlob.Delete();
                }
                PDF pdf = service.PDF;
                db.Entry(pdf).State = EntityState.Deleted;
            }
         
            if(service.LiveStream !=null)
            {
               Models.Data.LiveStream ls = service.LiveStream;
                db.Entry(ls).State = EntityState.Deleted;
              
            }
            service.LiveStream = null;
            service.LiveStreamId = null;
            db.Entry(service).State = EntityState.Deleted;
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
