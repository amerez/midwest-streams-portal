using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Helpers;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;
using Microsoft.AspNet.Identity;

namespace VideoManager.Controllers
{
    public class AnalyticsController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Download()
        {
            List<DownloadAnalytic> Analytics = db.DownloadAnalytics.ToList();
            return View(Analytics);
        }
        public async Task<ActionResult> Dashboard(int? OwnerId, int? HomeId, int? ServiceId)
        {
            if (!User.IsInRole("Admin"))
            {
                return View("NotFound");
            }
            List<FuneralHome> Homes = db.FuneralHomes.Where(f=>f.DevHome==false).ToList();
            List<Analytic> Analytics = new List<Analytic>();
            AnalyticViewModel AVM = new AnalyticViewModel();
            AnalyticDashboardViewModel ADVM = new AnalyticDashboardViewModel();
            List<Service> Services = new List<Service>();
            ADVM.TotalVideoViews = db.Analytics.Count();
            DateTime OneMonth = DateTime.Now.AddDays(-30);
            ADVM.MonthViews = db.Analytics.Where(a => a.CreateDate > OneMonth).Count();
            if(OwnerId==null && HomeId==null && ServiceId==null)
            {
             //   Analytics = db.Analytics.Where(a=>a.Video.Service.FuneralHome.DevHome==false).ToList();
                Services = db.Services.Where(s=>s.FuneralHome.DevHome==false).ToList();
            }
            else
            {
                if(OwnerId!=null)
                {
                  //  Analytics = db.Analytics.Where(a=>a.Video.Service.FuneralHome.OwnerId==OwnerId).ToList();
                    Services = db.Services.Where(a => a.FuneralHome.OwnerId == OwnerId).ToList();
                }
                else
                {
                    if(HomeId!=null)
                    {
                       // Analytics = db.Analytics.Where(a => a.Video.Service.FuneralHome.Id == HomeId).ToList();
                        Services = db.Services.Where(a => a.FuneralHome.Id == HomeId).ToList();
                    }
                    else
                    {
                       // Analytics = db.Analytics.Where(a => a.Video.ServiceId == ServiceId).ToList();
                    }
                }
            }
           
            //List<IpAddressObject> addresses = new List<IpAddressObject>();
            //foreach (var an in Analytics)
            //{
            //    if (an.Latitude != 0 && an.Longitude != 0)
            //    {
            //        //Database got mucked up with a bunch of hard coded values
            //        //So lets exclude those IP addresses from the heat map
            //        if (an.IPAddress != "174.17.56.90")
            //        {
            //            IpAddressObject add = new IpAddressObject();
            //            add.IpAdd = an.IPAddress;
            //            add.latitude = an.Latitude;
            //            add.longitude = an.Longitude;
            //            addresses.Add(add);
            //        }
            //    }
            //}

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
            //CRMFuneralHome popFH = db.CRMFuneralHome.Where(f => f.FuneralHomeId == popularhomeId).FirstOrDefault();
            //CRMContact PopularHomePicCont = null;
           //if(popFH !=null)
           //{
           //     PopularHomePicCont = popFH.PrimaryCRMContact;
           //}
            
           // if(PopularHomePicCont!=null)
           // {
           //     ADVM.PopularHomeOfTheWeekImage = PopularHomePicCont.PictureFileName;
           // }
           // ADVM.PopularHomeOfTheWeek = mostViewedHome;
            //ADVM.PopularHomeNumOfViews = HighestVIews;
            //ADVM.ServicesBarChartArray = Admin.GetServicesBarChart(Services, DateTime.Now.AddMonths(-3), DateTime.Now);
            //AVM.Details = addresses;
            //CalculateAnalytics.PageViews(ref ADVM, Analytics, Homes);
           // CalculateAnalytics.AverageTime(ref AVM, Analytics);
            //ADVM.NeedsToBeContacted = Admin.GetContactsThatNeedToBeContacted(db);
            //Admin.dashboardlinechart(ref ADVM, Analytics);
            //CalculateAnalytics.linechart(ref AVM, Analytics);
            ADVM.TotalFuneralsWithVideos = Admin.GetTotalServicesWithVideo(Services);
            ADVM.MonthlyFuneralsWithVideos = Admin.GetServicesThisMonthWithVideo(Services);
            ADVM.LowUsageHomes = CalculateAnalytics.LowUsageHomes(Homes);

            return View(ADVM);
        }

        // GET: Analytics
        // id is for service
        public async Task<ActionResult> Index(int? id)
        {
            //if (!User.IsInRole("Admin"))
            //{
            //    return View("NotFound");
            //}
            List<FuneralHome> homes = new List<FuneralHome>();
            List<Analytic> Analytics = new List<Analytic>();
            AnalyticViewModel AVM = new AnalyticViewModel();
            if(id==null)
            {
              
                if (User.IsInRole("FuneralHome"))
                {
                    var userId = User.Identity.GetUserId();
                    FuneralHome fh = db.FuneralHomes.Where(u => u.UserId == userId).FirstOrDefault();
                    Analytics.AddRange(db.Analytics.Where(a => a.Video.Service.FuneralHome.Id == fh.Id).ToList());
                    homes.Add(fh);
                }
                else
                {
                    homes.AddRange(db.FuneralHomes.Where(f => f.DevHome == false).ToList());
                    Analytics.AddRange(db.Analytics.ToList());
                }
            }
            else
            {
                Service serv = db.Services.Where(s=>s.Id==id).FirstOrDefault();
                if(!Authorize(serv))
                {
                    return View("NotFound");
                }
                AVM.FirstName = serv.FirstName;
                AVM.LastName = serv.LastName;
                homes.Add(db.FuneralHomes.Where(f=>f.Id==serv.FuneralHome.Id).FirstOrDefault());
                Analytics.AddRange(db.Analytics.Where(a => a.Video.Service.Id==serv.Id).ToList());
            }
            
          
           
           
            List<IpAddressObject> addresses = new List<IpAddressObject>();
            foreach(var an in Analytics)
            {
                if(an.Video!=null)
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
                            if (an.Video != null && an.Video.Service != null && an.Video.Service.VideoTitle == null)
                            {
                                add.VideoTitle = an.Video.Service.FirstName + " " + an.Video.Service.LastName + "'s Service";
                            }
                            else
                            {
                                add.VideoTitle = an.Video.Service.VideoTitle;
                            }
                            add.ViewingDate = an.CreateDate.ToShortDateString();
                            add.Name = an.Video.Service.FirstName + " " + an.Video.Service.LastName;
                            int age = an.Video.Service.DeathDay.Year - an.Video.Service.Birthday.Year;
                            add.Age = age.ToString();
                            add.FuneralHomeName = an.Video.Service.FuneralHome.Name;
                            add.ServiceDate = an.Video.Service.ServiceDate.ToShortDateString();
                            add.DaysAfterService = (an.CreateDate - an.Video.Service.ServiceDate).Days.ToString();
                            add.city = an.City;
                            if (an.Stop < 280)
                            {
                                add.AmountWatched = "NA";
                            }
                            else
                            {
                                add.AmountWatched = Math.Round(((double)an.Stop / 60), 0).ToString();
                            }


                            addresses.Add(add);
                        }

                    }

                }
            }

            AVM.Details = addresses;
            CalculateAnalytics.PageViews(ref AVM, Analytics, homes);
            CalculateAnalytics.AverageTime(ref AVM, Analytics);
            CalculateAnalytics.linechart(ref AVM, Analytics, false);
            return View(AVM);
        }
        public async Task<ActionResult> Info()
        {
        
            CalculateAnalytics analyticsClass = new CalculateAnalytics();
            AnalyticInfoViewModel avim = new AnalyticInfoViewModel();

            List<Service> services = new List<Service>();
            List<Analytic> Analytics = new List<Analytic>();
            if (User.IsInRole("FuneralHome"))
            {
                var userId = User.Identity.GetUserId();
                services.AddRange(db.Services.Where(s => s.FuneralHome.UserId == userId).ToList());
                Analytics.AddRange(db.Analytics.Where(a => a.Video.Service.FuneralHome.UserId == userId).ToList());
            }
            else
            {
                services.AddRange(db.Services.Where(h=>h.FuneralHome.DevHome==false).ToList());
                Analytics.AddRange(db.Analytics.ToList());
            }
            
             avim = analyticsClass.GetAverageViewsPerService(Analytics, services);
             AnalyticInfoViewModel serviceInfo = new AnalyticInfoViewModel();
             
            serviceInfo = analyticsClass.GetServiceStats(services);
             avim.DaysBetweenDeathAndService = serviceInfo.DaysBetweenDeathAndService;
             avim.PopularServiceDay = serviceInfo.PopularServiceDay;
             avim.PopularDeathDay = serviceInfo.PopularDeathDay;
             avim.AvgAge = serviceInfo.AvgAge;
            return View(avim);
        }

        [HttpGet]
        public async Task<ActionResult> UpdateAnalyticsTable()
        {
            List<Analytic> Analytics = db.Analytics.ToList();
            int recordsUpdated = 0;
            foreach (var an in Analytics)
            {
                if (an.City == null)
                {
                 bool success = await PopulateAnalyticObject(an);
                    if(success==true)
                    {
                        recordsUpdated++;
                    }
                }
            }
            return Json(new {recordsUpdated});
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
                    if(records>0)
                    {
                        return true;
                    }
                }
              
            }
            return false;
            
        }


        [AllowAnonymous]
        [AllowCrossSiteJson]
        [HttpGet]
        public ActionResult AnalyticAPI()
        {
            DateTime today = DateTime.Today;
            DateTime week = DateTime.Today.AddDays(-7);
            /* UNCOMMENT WHEN THE NULL PROBLEM IS FIXED */
            //List<Analytic> Analytics = db.Analytics.Where(a => a.CreateDate < today && a.CreateDate > week).ToList();
            List<Analytic> Analytics = db.Analytics.ToList();
            
            // get the number of families taht we have conected this week
            int numFamilies = db.Analytics.Where(a => a.CreateDate < today && a.CreateDate > week).Count();

            List<String> countryCodesTEST = new List<String>();
            List<String> regionsTEST = new List<String>();

            List<String> countryCodes = new List<String>();
            //get the number of countries
            foreach (var a in Analytics)
            {
                countryCodesTEST.Add(a.CountryCode);
                if (a.CountryCode != null)
                {
                    var match = countryCodes.FirstOrDefault(c => c.Contains(a.CountryCode));
                    if (match == null)
                    {
                        countryCodes.Add(a.CountryCode);
                    }
                    else 
                        if(countryCodes.Count == 0)
                        {
                            countryCodes.Add(a.CountryCode);
                        }
                }
            }
            List<string> regions = new List<string>();
            
            foreach (var s in Analytics)
            {
                regionsTEST.Add(s.RegionName);
                if (s.RegionName != null)
                {
                    var match = regions.FirstOrDefault(c => c.Contains(s.RegionName));
                    if (match == null)
                    {
                        regions.Add(s.RegionName);
                    }
                    else
                        if (regions.Count == 0)
                        {
                            regions.Add(s.RegionName);
                        }
                }
            }
            int numCountries = countryCodes.Count;
            int numStates = regions.Count;
            return Json(new { numFamilies, numStates, numCountries }, JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        [AllowCrossSiteJson]
        [HttpGet]
        public ActionResult GetViewCount(DateTime StartDate, DateTime EndDate)
        {
            if(EndDate==null)
            {
                EndDate = DateTime.Now;
            }
            int ViewCount = db.Analytics.Where(a => a.CreateDate < EndDate && a.CreateDate > StartDate).Count();
            return Json(new {ViewCount}, JsonRequestBehavior.AllowGet);
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
