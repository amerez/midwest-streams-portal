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
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using VideoManager.Models.Data.Enums;
using System.Text;
using VideoManager.Models.ViewModels;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.AspNet.Identity.Owin;
using System.IO;
using System.Configuration;
using VideoManager.Code;


namespace VideoManager.Controllers
{
    [Authorize]
    public class FuneralHomesController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();



        [Authorize(Roles = "Admin")]
		// GET: FuneralHomes
        public ActionResult Index()
        {

			if(!User.IsInRole("Admin"))
			{
				return View("NotFound");
			}
            return View(db.FuneralHomes.ToList());
        }
        [Authorize(Roles = "Admin")]
		public ActionResult SetPassword(int? id)
		{
            if (id == null)
            {
                return View("NotFound");
            }
            //Sensitive page don't let anyone access it
            bool hasAccess = false;
            FuneralHome home = db.FuneralHomes.Find(id);
            if (home == null)
            {
                return View("NotFound");
            }
            if (home.UserId == null)
            {
                return View("Error");
            }
            
            if(home.UserId== User.Identity.GetUserId())
            {
                hasAccess = true;
            }
            if(User.IsInRole("Admin"))
            {
                hasAccess = true;
            }
            if (hasAccess == false)
            {
                return View("NotFound");
            }
		
			ViewBag.StatusMessage = "";
			ViewBag.FuneralHomeName = home.Name;
			ViewBag.ReturnUrl = Url.Action("SetPassword");
			ManageUserViewModel model = new ManageUserViewModel();
			model.UserId = home.UserId;
			model.FuneralHomeId = id;
			return View(model);
		}
		[HttpPost]
        [Authorize]
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
        [Authorize(Roles="Admin")]
        public ActionResult SendWelcomeMessage(int? id)
        {
            if(id==null)
            {
                return View("NotFound");
            }
            FuneralHome home = db.FuneralHomes.Find(id);
            return View(home);

        }
        [HttpPost]
        public ActionResult SendWelcomeEmail(int id)
        {
            var provider = new DpapiDataProtectionProvider("VideoManager");

            UserManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(
                provider.Create("EmailConfirmation"));
            FuneralHome home = db.FuneralHomes.Find(id);
            var code = UserManager.GeneratePasswordResetToken(home.UserId);
            home.TempAccessToken = code;
            db.Entry(home).State = EntityState.Modified;
            db.SaveChanges();

            Email.sendWelcomeEmail(home);
            return RedirectToAction("Index");

        }
		[Authorize (Roles = "Admin, FuneralHome, FuneralHomeOwner")]
		public ActionResult Settings(int? id)
		{
            if(id==null)
            {
                return View("NotFound");
            }
			FuneralHome home = db.FuneralHomes.Find(id);
			FuneralHomeSettingViewModel svm = new FuneralHomeSettingViewModel
			{
				FuneralHomeId = home.Id,
				Address1 = home.Address1,
				Address2 = home.Address2,
				City = home.City,
				Email = home.Email,
				LogoPath = home.Setting.LogoPath,
				SlatePath = home.Setting.SlatePath,
				Name = home.Name,
				State = home.State,
				WebsiteProvider = home.Setting.WebsiteProvider,
				ZipCode = home.ZipCode,
                FuneralHomeNumber = home.FuneralHomeNumber,
                PrimaryContact = home.PrimaryContact,
                PrimaryContactEmail = home.PrimaryContactEmail,
                PrimaryContactPhoneNumber = home.PrimaryContactPhoneNumber,
                SearchEngineFriendlyPDF = home.Setting.SEOFriendlyPDF,
                NewTabPdf = home.Setting.NewTabPdf,
                DisplayTutorials = home.Setting.DisplayTutorial,
                WhiteLabel = home.Setting.WhiteLabel,
                SelectedAzureVM = home.Setting.AzureVMSize,
                AzureVMSize = VMSizeDictionary.GetAzureVMSize()

			};
			return View(svm);
		}
        [Authorize(Roles="Admin, FuneralHome, FuneralHomeOwner")]
        public ActionResult HomeSettings(string id)
        {
            FuneralHome home = db.FuneralHomes.Where(f => f.UserId == id).FirstOrDefault();
            if(home!=null)
            {
                FuneralHomeSettingViewModel svm = new FuneralHomeSettingViewModel
                {
                    FuneralHomeId = home.Id,
                    Address1 = home.Address1,
                    Address2 = home.Address2,
                    City = home.City,
                    Email = home.Email,
                    LogoPath = home.Setting.LogoPath,
                    SlatePath = home.Setting.SlatePath,
                    Name = home.Name,
                    State = home.State,
                    WebsiteProvider = home.Setting.WebsiteProvider,
                    ZipCode = home.ZipCode,
                    DisplayTutorials = home.Setting.DisplayTutorial,
                    NewTabPdf = home.Setting.NewTabPdf,
                    FuneralHomeNumber = home.FuneralHomeNumber,
                    PrimaryContact = home.PrimaryContact,
                    PrimaryContactEmail = home.PrimaryContactEmail,
                    PrimaryContactPhoneNumber = home.PrimaryContactPhoneNumber,
                    SearchEngineFriendlyPDF = home.Setting.SEOFriendlyPDF,
                    WhiteLabel = home.Setting.WhiteLabel,
                    SelectedAzureVM = home.Setting.AzureVMSize,
                    AzureVMSize = VMSizeDictionary.GetAzureVMSize()
                };
                return View("Settings", svm);
            }
            else
            {
                return View("NotFound");
            }
  
        }
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Settings(FuneralHomeSettingViewModel svm)
		{

			
			if(ModelState.IsValid)
			{
	            
				FuneralHome dbHome = db.FuneralHomes.Find(svm.FuneralHomeId);

				dbHome.Address1 = svm.Address1;
				dbHome.Address2 = svm.Address2;
				dbHome.City = svm.City;
				dbHome.Email = svm.Email;
				dbHome.Name = svm.Name;
				dbHome.Setting.LogoPath = svm.LogoPath;
				dbHome.Setting.SlatePath = svm.SlatePath;
				dbHome.Setting.WebsiteProvider = svm.WebsiteProvider;
                dbHome.Setting.DisplayTutorial = svm.DisplayTutorials;
                dbHome.Setting.NewTabPdf = svm.NewTabPdf;
                dbHome.FuneralHomeNumber = svm.FuneralHomeNumber;
                dbHome.PrimaryContact = svm.PrimaryContact;
                dbHome.PrimaryContactPhoneNumber = svm.PrimaryContactPhoneNumber;
                dbHome.PrimaryContactEmail = svm.PrimaryContactEmail;
                dbHome.Setting.SEOFriendlyPDF = svm.SearchEngineFriendlyPDF;
                dbHome.Setting.WhiteLabel = svm.WhiteLabel;
                if(svm.AzureVMSize!=null)
                {
                    dbHome.Setting.AzureVMSize = svm.SelectedAzureVM;
                }
                
				db.SaveChanges();
				
			}
            var errors = ModelState.Select(x => x.Value.Errors)
                         .Where(y => y.Count > 0)
                         .ToList();
            if (User.IsInRole("Admin"))
            {
                return RedirectToAction("Index");
            }
            else
            {
                return RedirectToAction("Index", "Services");
            }
			
		}
	    [Authorize(Roles="Admin")]
		// GET: FuneralHomes/Create
        public ActionResult Create()
        {
			if (!User.IsInRole("Admin"))
			{
				return View("NotFound");
			}
			List<Owner> owners = new List<Owner>();
			owners = db.Owners.Where(h => h.Id != null).ToList();
			ViewBag.OwnerList = owners;
            return View();
        }

        // POST: FuneralHomes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(FuneralHomeCreateViewModel funeralHomeView)
        {
			FuneralHome funeralHome = new FuneralHome()
			{
				Address1 = funeralHomeView.Address1,
				Address2 = funeralHomeView.Address2,
				City = funeralHomeView.City,
				State = funeralHomeView.State,
				ZipCode = funeralHomeView.ZipCode,
				Email = funeralHomeView.Email,
				UserName = funeralHomeView.UserName,
				OwnerId = funeralHomeView.OwnerId,
				PaymentStatus = funeralHomeView.PaymentStatus,
				Name = funeralHomeView.Name,
                FuneralHomeNumber = funeralHomeView.FuneralHomeNumber,
                PrimaryContact = funeralHomeView.PrimaryContact,
                PrimaryContactEmail = funeralHomeView.PrimaryContactEmail,
                PrimaryContactPhoneNumber = funeralHomeView.PrimaryContactPhoneNumber,
                DevHome = funeralHomeView.DevHome
			};
      
			if(db.Users.Where(u=>u.UserName == funeralHomeView.UserName).Count()>1)
			{
				ViewBag.ErrorText = "Login name already in use";
				return View(funeralHomeView);
			}
            if (ModelState.IsValid)
            {
                FuneralHomeHelper fhh = new FuneralHomeHelper();
                var fhresult = fhh.CreateFuneralHome(funeralHome, funeralHomeView.UserName, funeralHomeView.WebsiteProvider);
                if(fhresult.Success==true)
                {
                    return RedirectToAction("Index");
                }
				else
				{
					ViewBag.ErrorText = fhresult.UserErrors;
				}
            }
			List<Owner> owners = new List<Owner>();
			owners = db.Owners.Where(h => h.Id != null).ToList();
			ViewBag.OwnerList = owners;
            return View(funeralHomeView);
        }
        [Authorize(Roles = "Admin, FuneralHomeOwner")]
        // GET: FuneralHomes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (!User.IsInRole("Admin"))
            {
                if (!User.IsInRole("FuneralHomeOwner"))
                {
                    return View("NotFound");
                }
            }
            
            if (id == null)
            {
                return View("NotFound");
            }
            FuneralHome funeralHome = db.FuneralHomes.Find(id);
            if (funeralHome == null)
            {
                return HttpNotFound();
            }
			List<Owner> owners = new List<Owner>();
			owners = db.Owners.Where(h => h.Id != null).ToList();
			ViewBag.OwnerList = owners;
            return View(funeralHome);
        }

        // POST: FuneralHomes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(FuneralHome funeralHome)
        {
            if (ModelState.IsValid)
            {
                db.Entry(funeralHome).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
			List<Owner> owners = new List<Owner>();
			owners = db.Owners.Where(h => h.Id != null).ToList();
			ViewBag.OwnerList = owners;
            return View(funeralHome);
        }

        [Authorize(Roles = "Admin, FuneralHomeOwner")]
        // GET: FuneralHomes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (!User.IsInRole("Admin"))
            {
                if (!User.IsInRole("FuneralHomeOwner"))
                {
                    return View("NotFound");
                }
            }
            if (id == null)
            {
                return View("NotFound");
            }
            FuneralHome funeralHome = db.FuneralHomes.Find(id);
            if (funeralHome == null)
            {
                return View("NotFound");
            }
            return View(funeralHome);
        }
        [HttpPost]
        public ActionResult ToggleTutorial(bool displayTutorial)
        {
            var userId = User.Identity.GetUserId();
            FuneralHome home = db.FuneralHomes.Where(h => h.UserId == userId).FirstOrDefault();
            if(home.Setting !=null)
            {
                home.Setting.DisplayTutorial = displayTutorial;
                db.Entry(home).State = EntityState.Modified;
                db.SaveChanges();
             

            }
            return Json(new { foo = "bar", baz = "Blech" });
        }

        // POST: FuneralHomes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            FuneralHome funeralHome = db.FuneralHomes.Find(id);
            db.FuneralHomes.Remove(funeralHome);
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

        //DONT USE THIS IF YOU NEED TO ALLOW LARGE FILES UPLOADS
        [HttpPost]
        public ActionResult UploadFiles()
        {
            var r = new List<ViewDataUploadFilesResult>();
            var userId = User.Identity.GetUserId();
            foreach (string file in Request.Files)
            {
                var statuses = new List<ViewDataUploadFilesResult>();
                var headers = Request.Headers;

                if (string.IsNullOrEmpty(headers["X-File-Name"]))
                {
                    UploadWholeFile(Request, statuses, userId);
                }

                JsonResult result = Json(statuses);
                result.ContentType = "text/plain";

                return result;
            }

            return Json(r);
        }

         //DONT USE THIS IF YOU NEED TO ALLOW LARGE FILES UPLOADS
        //Credit to i-e-b and his ASP.Net uploader for the bulk of the upload helper methods - https://github.com/i-e-b/jQueryFileUpload.Net
        private void UploadWholeFile(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses, string userId)
        {
            for (int i = 0; i < request.Files.Count; i++)
            {
                FuneralHome home = db.FuneralHomes.Where(u => u.UserId == userId).FirstOrDefault();
                // setup file information
                /*test variable*/ string testPath = Path.Combine(home.Id + "_" + home.Name + ".*");
                testPath = testPath.Replace(" ", ""); 
                var file = request.Files[i];
                var fullPath = Path.Combine(ConfigurationManager.AppSettings["LogoPath"], userId + Path.GetFileName(file.FileName));
                var filename = home.Id + "_" + home.Name + Path.GetExtension(file.FileName);
                filename = filename.Replace(" ", ""); 
                fullPath = Path.Combine(ConfigurationManager.AppSettings["LogoPath"], filename);

                //check to see if the file exist
                string logoFolder = ConfigurationManager.AppSettings["LogoPath"];
                string[] fileList = Directory.GetFiles(logoFolder, testPath);
                int filenum = fileList.Length;
                if (fileList.Length > 0)
                {
                    foreach (string f in fileList)
                    {
                        System.IO.File.Delete(f);
                    }
                    
                }
               
                file.SaveAs(fullPath);
                home.Setting.LogoPath = filename;
 
                db.SaveChanges();
                statuses.Add(new ViewDataUploadFilesResult()
                {
                  Name = file.FileName,
                  Size = file.ContentLength,
                  Type = file.ContentType,
                  Url = "/Home/Download/" + file.FileName,
                  DeleteUrl = "/Home/Delete/" + file.FileName,
                  ThumbnailUrl = @"data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(fullPath)),
                  DeleteType = "GET",
                });
            }
        }
        [AllowAnonymous]
        public FileResult getLogo(int? id)
        {
            FuneralHome home = db.FuneralHomes.Where(u => u.Id == id).FirstOrDefault();

            string logopath = home.Setting.LogoPath;
            var FullLogoPath = ConfigurationManager.AppSettings["LogoPath"] + @"\" + logopath;
            return File(FullLogoPath, "application/jpg");
        }
    }
}
