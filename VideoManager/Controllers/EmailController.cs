using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.IO;
using VideoManager.Code;
using VideoManager.Models.Data.Enums;
using System.Text.RegularExpressions;

namespace VideoManager.Controllers
{

    public class EmailController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Email
        [Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult UploadFinished(int? id)
        {
            if (id == null)
            {
                Email.sendAdminMessage("Upload Finished ID is Null");
                return View("NotFound");
            }
            Service service = db.Services.Find(id);
            if (service == null)
            {
                Email.sendAdminMessage("Upload Finished Service is Null. Id=" + id.ToString());
                return View("NotFound");
            }
            string path = ConfigurationManager.AppSettings["portalPath"];


            string videoEmbedCode = ConfigurationManager.AppSettings["portalPath"] + "/services/displayvideo/" + id.ToString();
            if (service.FuneralHome.Setting != null)
            {
                switch (service.FuneralHome.Setting.WebsiteProvider)
                {

                    case WebsiteProvider.FuneralOne:
                        {
                            videoEmbedCode = ConfigurationManager.AppSettings["portalPath"] + "/services/displayvideo/" + id.ToString();
                            break;
                        }
                    case WebsiteProvider.AzureRawLink:
                        {
                            videoEmbedCode = ConfigurationManager.AppSettings["portalPath"] + "/services/displayvideo/" + id.ToString();
                            break;
                        }
                    case WebsiteProvider.Aurora:
                        {
                            videoEmbedCode = "<iframe src=\"" + ConfigurationManager.AppSettings["portalPath"] + "/services/iframe/" + id.ToString() + "\" scrolling=\"no\" width=\"360\" height=\"250\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"margin-left:auto; margin-right:auto; display:block;\"> </iframe>";
                            break;
                        }
                    case WebsiteProvider.Frazer:
                        {
                            videoEmbedCode = "<iframe src=\"" + ConfigurationManager.AppSettings["portalPath"] + "/services/iframe/" + id.ToString() + "\" scrolling=\"no\" style=\"width: 103%; height: 400px;\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"margin-left:auto; margin-right:auto; display:block;\"> </iframe>";
                            break;
                        }
                    case WebsiteProvider.CFS:
                        {
                            videoEmbedCode = "<div class=\"embed-responsive embed-responsive-16by9\"><iframe class=\"embed-responsive-item\" src=\"" + ConfigurationManager.AppSettings["portalPath"] + "/services/iframe/" + id.ToString() + "\" scrolling=\"no\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen \"> </iframe></div>";
                            break;
                        }
                    case WebsiteProvider.Batesville:
                        {
                            videoEmbedCode = "<iframe  src=\"" + ConfigurationManager.AppSettings["portalPath"] + "/services/iframe/" + id.ToString() + "\" scrolling=\"no\" frameborder=\"0\" style=\"margin-left: auto; margin-right: auto; display: block; width: 100%;\" height=\"400\" webkitallowfullscreen mozallowfullscreen allowfullscreen \"> </iframe>";
                            break;
                        }
                    default:
                        {
                            videoEmbedCode = "<iframe src=\"" + ConfigurationManager.AppSettings["portalPath"] + "/services/iframe/" + id.ToString() + "\" scrolling=\"no\" width=\"648\" height=\"400\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"margin-left:auto; margin-right:auto; display:block;\"> </iframe>";
                            break;
                        }
                }

            }

            ViewBag.EmbedCode = videoEmbedCode;
            ViewBag.PortalPath = path;
            return View(service);
        }
        [HttpPost]
        public ActionResult LeadPagesEmailCollector(string email, string funeralhomename, string promocode)
        {
            //Email.sendAdminMessage("Received a post. Email: " + email + "funeralhomename: " + funeralhomename);
            //For some reason if promocode is null it takes the value of funeralhome name.
            string webcastingNotes = "Auto Created Via Leadpages. No promo code was entered.";
            if (promocode != funeralhomename)
            {
                webcastingNotes = "Auto Created Via Leadpages. Promo Code: " + promocode;
            }
            if (db.Users.Where(u => u.UserName == email).Count() > 1)
            {
                Email.sendMail("admin@midweststreams.com", email, "Welcome to Midwest streams ", "Looks like you have already signed up for Midwest Streams", null);
                Email.sendAdminMessage("Someone filled out a leadpages with an already existing user account. Email: " + email + " funeral home name: " + funeralhomename + " promo code: " + promocode);

            }
            string leadPagesFlag = "LeadPages";

            FuneralHome fh = new FuneralHome()
            {
                Name = funeralhomename,
                City = leadPagesFlag,
                State = "ND",
                ZipCode = 58040,
                Email = email,
                UserName = email,
                PrimaryContactEmail = email
            };
            FuneralHomeHelper fhh = new FuneralHomeHelper();
            var rndNum = new Random(DateTime.Now.Second);
            var rawPW = System.Web.Security.Membership.GeneratePassword(8, 0);
            rawPW = Regex.Replace(rawPW, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());
            var result = fhh.CreateFuneralHome(fh, fh.Email, WebsiteProvider.GenericIframe, rawPW);
            if (result.Success == true && result.FuneralHome != null)
            {
                CRMFuneralHome crmFh = new CRMFuneralHome()
                {
                    Email = email,
                    Name = funeralhomename,
                    City = leadPagesFlag,
                    ZipCode = "58040",
                    State = "ND",
                    AddressConfirmed = false,
                    Website = leadPagesFlag,
                    HasCamera = false,
                    IsRecording = false,
                    HasMemorialFolders = false,
                    LeadWarmth = LeadWarmth.Cold,
                    OwnershipType = OwnershipType.Unknown,
                    EstimatedCallsPerYear = 0,
                    NextContactDate = DateTime.Now.AddDays(30),
                    NumberOfContacts = 0,
                    WebcastingHistoryNotes = webcastingNotes,
                    FuneralHomeId = result.FuneralHome.Id

                };
                db.CRMFuneralHome.Add(crmFh);
                db.SaveChanges();
                Email.sendMail("admin@midweststreams.com", email, "Welcome To Midwest Streams", "You can access the portal at portal.midweststreams.com Your username is " + email + " Your password is " + rawPW, null);
            }
            else
            {
                Email.sendErrorMessage("Someone signed up on lead pages and something went wrong creating their account. Email: " + email + " Funeral Home Name: " + funeralhomename + " Promo Code: " + promocode + " Errors: " + result.FuneralHomeErrors + " " + result.UserErrors);
                Email.sendMail("admin@midweststreams.com", email, "Welcome To Midwest Streams", "Welcome to Midwest Streams. A representative will be contacting you soon!", null);
            }

            return Json(new { foo = "success" });
        }
        public ActionResult NotifyFamily(int? id, string message, string link)
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
            string path = ConfigurationManager.AppSettings["portalPath"];
            ViewBag.PortalPath = path;
            ViewBag.Link = link;
            ViewBag.CustomMessage = message;
            return View(service);
        }
        //FuneralHomeId
        public ActionResult WelcomeAboard(int? id, string authcode)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            FuneralHome home = db.FuneralHomes.Find(id);
            if (home == null)
            {
                return View("NotFound");
            }
            string path = ConfigurationManager.AppSettings["portalPath"];
            ViewBag.PortalPath = path;
            if (home.TempAccessToken != null)
            {
                ViewBag.code = Url.Action("ResetPassword", "Account", new { code = authcode, userName = home.UserName }, protocol: Request.Url.Scheme);
            }
            else
            {
                ViewBag.code = path;
            }


            return View(home);
        }

        public ActionResult NotifyFamilySecured(int? id, string username, string password)
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
            string path = ConfigurationManager.AppSettings["portalPath"];
            string viewingLink = path;
            string headerText = service.FirstName + service.LastName + "'s funeral service is now available online";

            //We don't want to send an email with a header of only 4 charachters
            if (service.VideoTitle != null && service.VideoTitle.Length > 4)
            {
                if (service.VideoTitle.Contains(service.FirstName) || service.VideoTitle.Contains(service.LastName))
                {
                    headerText = service.VideoTitle + " is now available online";
                }
            }

            ViewBag.EmailHeader = headerText;
            ViewBag.UserName = username;
            ViewBag.Password = password;
            ViewBag.Header = headerText;
            ViewBag.ViewingLink = viewingLink;
            return View(service);
        }
        [Authorize(Roles = "Admin")]
        public ActionResult SendMassEmail()
        {
            List<FuneralHome> homes = db.FuneralHomes.Where(s => s.Id != null).ToList();
            List<FuneralHomeMail> mailer = new List<FuneralHomeMail>();
            foreach (var home in homes)
            {
                FuneralHomeMail mail = new FuneralHomeMail();
                mail.EmailAddress = home.Email;
                mail.Name = home.Name;
                mailer.Add(mail);
            }
            MassEmailViewModel mev = new MassEmailViewModel
            {
                FromEmail = "Shane@midweststreams.com",
                Homes = mailer
            };
            return View(mev);
        }
        [Authorize(Roles = "Admin")]
        public ActionResult EditGenericTemplate()
        {
            string path = ConfigurationManager.AppSettings["portalPath"];
            ViewBag.PortalPath = path;
            return View();
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SendMassEmail(MassEmailViewModel mev)
        {
            if (ModelState.IsValid)
            {
                List<FuneralHome> homes = db.FuneralHomes.Where(s => s.Id != null).ToList();
                //List<string> reciepents = new List<string>();
                foreach (var home in homes)
                {
                    //reciepents.Add(home.Email);
                    Email.sendHtmlMail(mev.FromEmail, home.Email, mev.Subject, mev.Html);
                }

                return RedirectToAction("Index", "Home");
            }
            return View(mev);
        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SendTestEmail(string toInput, string html)
        {

            Email.sendHtmlMail("testemail@midweststreams.com", toInput, "Test Email From MWS", html);

            return Json(new { foo = "success" });

        }
        [HttpPost, ValidateInput(false)]
        public ActionResult SendTemplate(string subject, string html)
        {
            List<FuneralHome> homes = db.FuneralHomes.Where(s => s.Id != null).ToList();
            //List<string> reciepents = new List<string>();
            foreach (var home in homes)
            {
                Email.sendHtmlMail("MidwestStreams@midweststreams.com", home.Email, subject, html);
            }

            return Json(new { foo = "success" });

        }
        [HttpPost]
        [Authorize]
        public ActionResult SendSecuredLink(int serviceId, string emails)
        {
            List<string> emailList = emails.Split(',').ToList<string>();
            Service service = db.Services.Find(serviceId);
            if (service != null)
            {
                if (service.ViewingPassword == null)
                {
                    SecuredServiceHelper secured = new SecuredServiceHelper();
                    secured.MakeServiceSecure(service, db);
                }
                foreach (string email in emailList)
                {
                    var noSpaceEmail = email.Replace(" ", "");
                    Email.sendFamilyNotificationSecure(service, noSpaceEmail);
                }
            }
            return Json(new { foo = "success" });
        }

        [HttpPost]
        public ActionResult UploadEmailImages()
        {
            var r = new List<ViewDataUploadFilesResult>();
            foreach (string file in Request.Files)
            {
                var statuses = new List<ViewDataUploadFilesResult>();
                var headers = Request.Headers;

                if (string.IsNullOrEmpty(headers["X-File-Name"]))
                {
                    UploadWholeEmailImage(Request, statuses);
                }

                JsonResult result = Json(statuses);
                result.ContentType = "text/plain";

                return result;
            }

            return Json(r);
        }

        private void UploadWholeEmailImage(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses)
        {
            for (int i = 0; i < request.Files.Count; i++)
            {
                // setup file information
                var file = request.Files[i];
                var fullPath = Path.Combine(ConfigurationManager.AppSettings["EmailImagePath"] + Path.GetFileName(file.FileName));
                var filename = file.FileName;
                filename = filename.Replace(" ", "");
                fullPath = Path.Combine(ConfigurationManager.AppSettings["EmailImagePath"], filename);

                //check to see if the file exist
                string logoFolder = ConfigurationManager.AppSettings["EmailImagePath"];

                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }

                file.SaveAs(fullPath);
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

        public class FuneralHomeMail
        {
            public string Name { get; set; }
            public string EmailAddress { get; set; }
            public bool isSelected { get; set; }

        }
    }
}