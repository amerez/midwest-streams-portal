using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;
using Xero.Api.Core;
using Xero.Api.Example.Applications.Partner;
using Xero.Api.Example.Applications.Private;
using Xero.Api.Example.Applications.Public;
using Xero.Api.Infrastructure.OAuth;
using Xero.Api.Serialization;

namespace VideoManager.Controllers
{
    public class AdminController : BaseController
    {
        // GET: Admin
        public ActionResult Index()
        {
            // Private Application Sample
 
     
            //Live.CreateLiveStream(db.Services.Find(4885));
           // LiveCode.StartLiveStream();
            if(User.IsInRole("Admin")|| User.Identity.Name=="DevHome")
            {
                return View();
            }
            return View("NotFound");
        }
        public ActionResult Tools()
        {
            if (User.IsInRole("Admin") || User.Identity.Name == "devHome")
            {
                return View();
            }
            return View("NotFound");

        }
        [HttpPost]
        public ActionResult Fifteen()
        {
            string htmlMail = "";
            DateTime week = DateTime.Now.AddDays(-6);
            List<CRMFuneralHomeHistory> UserLog = db.CRMFuneralHomeHistory.Where(h => h.LastContactedDate > week).OrderByDescending(h => h.LastContactedDate).ToList();
            int ShaneCount = 0;
            int KyleCount = 0;
            string ShaneHomes = "";
            string KylesHomes = "";
            
            foreach (var log in UserLog)
            {
                if(log.LastContactedByUserName=="Shane.P.White")
                {
                    ShaneCount++;
                    if(log.CRMFuneralHome!=null)
                    ShaneHomes = ShaneHomes+ " <li>" + log.CRMFuneralHome.Name+"</li>";
                }
                else
                {
                    if(log.LastContactedByUserName== "kylefogarty")
                    {
                        if (log.CRMFuneralHome != null)
                            KylesHomes = KylesHomes+ " <li>" + log.CRMFuneralHome.Name + "</li>";
                        KyleCount++;
                    }
                }
  
            }
            bool goalMet = false;
            if (UserLog.Count > 14)
                goalMet = true;
            htmlMail = "<table class=\"module\" role=\"module\" data-type=\"wysiwyg\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-attributes='%7B%22dropped%22%3Atrue%2C%22padding%22%3A%220%2C0%2C0%2C0%22%2C%22containerbackground%22%3A%22%23ffffff%22%7D'><tr><td role=\"module-content\" style=\"padding: 0px 0px 0px 0px;\" bgcolor=\"#ffffff\"><h2 style=\"text-align: center;\">Total Contacts: "+UserLog.Count()+"</h2> </td></tr></table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\" role=\"module\" data-type=\"columns\" data-attributes='%7B%22dropped%22%3Atrue%2C%22columns%22%3A2%2C%22padding%22%3A%220%2C0%2C0%2C0%22%2C%22cellpadding%22%3A0%2C%22containerbackground%22%3A%22%22%7D'>  <tr><td style=\"padding: 0px 0px 0px 0px;\" bgcolor=\"\">    <table class=\"columns--container-table\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\">      <tr role=\"module-content\">        <td style=\"padding: 0px 0px 0px 0px\" role=\"column-0\" align=\"center\" valign=\"top\" width=\"50%\" height=\"100%\" class=\"templateColumnContainer column-drop-area \">  <table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  width=\"100%\" style=\"table-layout: fixed;\" data-attributes='%7B%22dropped%22%3Atrue%2C%22child%22%3Afalse%2C%22padding%22%3A%220%2C0%2C0%2C0%22%2C%22containerbackground%22%3A%22%23ffffff%22%7D'><tr>  <td role=\"module-content\"  valign=\"top\" height=\"100%\" style=\"padding: 0px 0px 0px 0px;\" bgcolor=\"#ffffff\"><h3 style=\"text-align: center;\">Shane: "+ShaneCount+"</h3>  <ul> "+ShaneHomes+"</ul> </td></tr></table></td><td style=\"padding: 0px 0px 0px 0px\" role=\"column-1\" align=\"center\" valign=\"top\" width=\"50%\" height=\"100%\" class=\"templateColumnContainer column-drop-area \">  <table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  width=\"100%\" style=\"table-layout: fixed;\" data-attributes='%7B%22dropped%22%3Atrue%2C%22child%22%3Afalse%2C%22padding%22%3A%220%2C0%2C0%2C0%22%2C%22containerbackground%22%3A%22%23ffffff%22%7D'><tr>  <td role=\"module-content\"  valign=\"top\" height=\"100%\" style=\"padding: 0px 0px 0px 0px;\" bgcolor=\"#ffffff\"><h3 style=\"text-align: center;\">Kyle: "+KyleCount+"</h3>  <ul> 	"+KylesHomes+" </ul> </td></tr></table></table>";
            Email.send15PointsOfContactEmail(htmlMail, goalMet);
            return Json(new { result = "bla" });
        }
        [HttpPost]
        public ActionResult CreateRenderVM(string vmName, string resourceGroupName)
        {

            VMmanager vmm = new VMmanager();
            vmm.CreateRenderVMTemplate(vmName, resourceGroupName);


            //string LogFilePath = ConfigurationManager.AppSettings["logFilePath"];
            //var sr = new StreamWriter(LogFilePath + "servicesLeft.txt");
            //sr.WriteLine("Starting to parse data");

            //int counter = 1;
            //double totalFileSizeLeft = 0;
            //List<Service> Services = db.Services.Where(x => x.Video != null && x.FuneralHome.Name != "Dev Home").ToList();
            //foreach (var service in Services)
            //{
            //    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //    PDF pdf = service.PDF;
            //    if (pdf != null && pdf.PDFPath != null)
            //    {
            //        CloudBlobContainer container = blobClient.GetContainerReference("pdfs");
            //        CloudBlockBlob blockBlob = container.GetBlockBlobReference(pdf.PDFPath);
            //        if (!blockBlob.Exists())
            //        {
            //            sr.WriteLine(counter.ToString() + ": " + pdf.PDFPath + " : " + service.FuneralHome.Name);
            //            counter++;
            //        }
            //    }
            //}
            //sr.WriteLine("Total File Size Remaining: " + totalFileSizeLeft.ToString());
            //sr.WriteLine("Parsed through all blobs. Done");
            //sr.Close();


            return Json(new { result = "bla" });
        }
        public ActionResult VertinReport()
        {
            DateTime startDate = DateTime.Now.AddDays(-100);
            List<FuneralHome> Homes = db.FuneralHomes.Where(h => h.Owner.Name == "Vertin").ToList();
            List<VertinReportViewModel> vrvm = new List<VertinReportViewModel>();
            foreach(var home in Homes)
            {
                VertinReportViewModel vrm = new VertinReportViewModel();
                vrm.FuneralHome = home;
                vrm.VideoCount = home.Services.Where(s => s.CreateDate > startDate && s.Video != null).Count();
                vrm.PDFCount = home.Services.Where(s => s.CreateDate > startDate && s.PDF != null).Count();
                vrvm.Add(vrm);
            }
            vrvm = vrvm.OrderBy(a => a.FuneralHome.Name).ToList();
            return View(vrvm);
        }
        [HttpPost]
        public ActionResult nightlyjobs(bool Zapier, string zapKeyWord)
        {
            //Very poor authentication. But it's better than nothing!
            if(zapKeyWord=="zapKey31678")
            {

                Maintenance.DeleteRawVideoFiles();
                Maintenance.DeleteOldPDFs();
                Maintenance.DeleteOldVHDs();
                Email.sendAdminMessage("Performed Nightly Maintance");
            }

            return Json(new { result = "bla" });
        }
    }
 
}