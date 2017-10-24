using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.ViewModels;
using HtmlAgilityPack;
using VideoManager.Code;

namespace VideoManager.Controllers
{
    [Authorize(Roles = "Admin,CRMUser")]
    public class CRMController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: CRM
        public ActionResult Index()
        {
            var cRMFuneralHome = db.CRMFuneralHome.Where(f=>f.Name!="Do Not Delete").Include(c => c.FuneralHome).Include(c => c.PrimaryCRMContact);
            return View(cRMFuneralHome.ToList());
        }

        public ActionResult Scraper(int? id, bool? rescrape)
        {
            List<CRMContact> currentContacts = db.CRMContact.Where(f => f.CRMFuneralHome != null && f.CRMFuneralHome.Id == id).ToList();
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(id);
            if (cfh == null)
            {
                return View("NotFound");
            }
            if (rescrape == true)
            {
                List<CRMContact> contacts = CRMWebsiteMiner.GetFuneralHomeContacts(cfh);
                if(contacts!=null)
                {
                    List<CRMContact> contactsToReturnToView = new List<CRMContact>();
                    foreach (var contact in contacts)
                    {
                        //Ensuring Contact doesn't already exist
                        var ContactsWithFirstName = currentContacts.Where(c => c.FirstName == contact.FirstName).ToList();
                        var ContactsWithExactName = currentContacts.Where(c => c.LastName == contact.LastName).ToList();
                        if (ContactsWithExactName.Count == 0)
                        {
                            contact.FirstContactedByUserName = User.Identity.GetUserName();
                            contact.FirstContactedDate = new DateTime(1990, 8, 12);
                            contact.NextContactDate = DateTime.Now.AddDays(45);
                            contact.ContactCategory = ContactCategory.FuneralHome;
                            contact.NumberOfContacts = 0;
                            db.CRMContact.Add(contact);
                            db.SaveChanges();
                            currentContacts.Add(contact);
                            contactsToReturnToView.Add(contact);
                        }

                    }
                    if (currentContacts.Count() > 0)
                    {
                        if (cfh.PrimaryCRMContactId == null && currentContacts.Count() > 0)
                        {
                            cfh.PrimaryCRMContactId = currentContacts.FirstOrDefault().Id;
                        }
                        db.Entry(cfh).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                    return View(contactsToReturnToView);
                }
                }

            ViewBag.ProfileList = true;
            return View(currentContacts);
        }
        // GET: CRM/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CRMFuneralHome cRMFuneralHome = db.CRMFuneralHome.Find(id);
            if (cRMFuneralHome == null)
            {
                return HttpNotFound();
            }
            return View(cRMFuneralHome);
        }
        public ActionResult AddOwner(int? id)
        {
            AddCRMOwnerViewModel ovm = new AddCRMOwnerViewModel();
            if (id != null)
            {
                ovm.FirstFuneralHomeId = (int)id;
                ovm.FirstContactedDate = DateTime.Now.AddDays(-1);
            }
            return View(ovm);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOwner(AddCRMOwnerViewModel CRMOwnerVM)
        {
            if (ModelState.IsValid)
            {
                CRMFuneralHome fh = db.CRMFuneralHome.Find(CRMOwnerVM.FirstFuneralHomeId);

                CRMOwner CRMOwner = new CRMOwner()
                {
                    Address1 = CRMOwnerVM.Address1,
                    Address2 = CRMOwnerVM.Address2,
                    City = CRMOwnerVM.City,
                    Name = CRMOwnerVM.Name,
                    PhoneNumber = CRMOwnerVM.PhoneNumber,
                    State = CRMOwnerVM.State,
                    ZipCode = CRMOwnerVM.ZipCode
                };
                CRMOwnerContact crmOwnerContact = new CRMOwnerContact()
                {
                    FirstName = CRMOwnerVM.PrimaryContactFirstName,
                    LastName = CRMOwnerVM.PrimaryContactLastName,
                    Email = CRMOwnerVM.PrimaryContactEmail,
                    ContactPosition = CRMOwnerVM.ContactPosition,
                    FirstContactedDate = CRMOwnerVM.FirstContactedDate,
                    NextContactDate = DateTime.Now.AddDays(365)
                };

                db.CRMOwnerContact.Add(crmOwnerContact);
                db.CRMOwner.Add(CRMOwner);
                db.SaveChanges();

                fh.CRMOwnerId = CRMOwner.Id;
                db.Entry(fh).State = EntityState.Modified;
                db.SaveChanges();

                if (CRMOwner.CRMFuneralHomes != null)
                {
                    if (CRMOwner.CRMFuneralHomes.Count == 1)
                    {
                        return RedirectToAction("AddFuneralHomeContact", new { id = fh.Id });
                    }
                }
                return RedirectToAction("Index");
            }

            return View(CRMOwnerVM);
        }
        // GET: CRM/Create
        public ActionResult Create()
        {
        
            List<CRMOwner> owners = new List<CRMOwner>();
            owners = db.CRMOwner.Where(h => h.Id != null).ToList();
            ViewBag.OwnerList = owners;
            return View();
        }
        public ActionResult ContactList()
        {
            List<CRMContact> contacts = db.CRMContact.Where(c => c.ContactCategory == ContactCategory.FuneralHome).OrderBy(c=>c.NextContactDate).ToList();
            return View(contacts);
        }
        public ActionResult ContactListByHome(int? id)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(id);
            if (cfh == null)
            {
                return View("NotFound");
            }
            List<CRMContact> contacts = cfh.CRMContact.ToList();
            return View("ContactList", contacts);
        }
        public ActionResult ContactListPrimaryContacts()
        {
            List<CRMFuneralHome> fhs = db.CRMFuneralHome.ToList();
            List<CRMContact> contacts = new List<CRMContact>();
            foreach (var fh in fhs)
            {
                if (fh.PrimaryCRMContact != null)
                {
                    var contact = fh.PrimaryCRMContact;
                    contacts.Add(contact);
                }
            }

            return View("ContactList", contacts);
        }
        public ActionResult ContactListCurrentClients()
        {
            List<CRMContact> contacts = db.CRMContact.ToList();
            List<CRMContact> PayingContacts = new List<CRMContact>();
            foreach (var contact in contacts)
            {
                if (contact.CRMFuneralHome.FuneralHomeId != null)
                {
                    PayingContacts.Add(contact);
                }
            }

            return View("ContactList", PayingContacts);
        }
        public ActionResult ContactListNeedsToBeContacted()
        {
            List<CRMContact> contacts = db.CRMContact.ToList();
            List<CRMContact> OverDueContacts = new List<CRMContact>();
            foreach (var contact in contacts)
            {
                if (contact.NextContactDate < DateTime.Now)
                {
                    OverDueContacts.Add(contact);
                }
            }

            return View("ContactList", OverDueContacts);
        }
        public ActionResult ContactListHotLeads()
        {
            List<CRMContact> contacts = db.CRMContact.ToList();
            List<CRMContact> HotLeads = new List<CRMContact>();
            foreach (var contact in contacts)
            {
                if (contact.CRMFuneralHome.FuneralHomeId == null || contact.CRMFuneralHome.FuneralHomeId == 0)
                {
                    if (contact.LeadWarmth == LeadWarmth.RedHot)
                    {
                        HotLeads.Add(contact);
                    }
                }

            }

            return View("ContactList", HotLeads);
        }
        public ActionResult HomeListCurrent()
        {
            List<CRMFuneralHome> fhs = db.CRMFuneralHome.ToList();
            List<CRMFuneralHome> PayingFhs = new List<CRMFuneralHome>();
            foreach (var fh in fhs)
            {
                if (fh.FuneralHomeId != null && fh.FuneralHomeId != 0)
                {
                    PayingFhs.Add(fh);
                }
            }
            return View("Index", PayingFhs);
        }

        public ActionResult GetLeadPagesFuneralHome()
        {
            List<CRMFuneralHome> fhs = db.CRMFuneralHome.ToList();
            List<CRMFuneralHome> LeadPagesHomes = new List<CRMFuneralHome>();
            foreach (var fh in fhs)
            {
                if (fh.City == "LeadPages")
                {
                    LeadPagesHomes.Add(fh);
                }
            }
            return View("Index", LeadPagesHomes);
        }

        public ActionResult BusinessList()
        {
            List<CRMContact> contacts = db.CRMContact.Where(c => c.ContactCategory == ContactCategory.Business).ToList();
            return View(contacts);
        }
        public ActionResult OwnerContactList()
        {
            return View(db.CRMOwnerContact.ToList());
        }
        public ActionResult OwnerList()
        {
            return View(db.CRMOwner.ToList());
        }
        public ActionResult EditOwner(int? id)
        {
            CRMOwner crmO = db.CRMOwner.Find(id);
            if (crmO == null)
            {
                return View("NotFound");
            }
            List<CRMOwnerContact> contacts = new List<CRMOwnerContact>();
            contacts = db.CRMOwnerContact.Where(h => h.CRMOwnerId == id).ToList();
            ViewBag.PrimaryContactList = contacts;
            return View(crmO);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditOwner(CRMOwner crmOwner)
        {
            if (ModelState.IsValid)
            {
                db.Entry(crmOwner).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("OwnerList");
            }
            List<CRMOwnerContact> contacts = new List<CRMOwnerContact>();
            contacts = db.CRMOwnerContact.Where(h => h.CRMOwnerId == crmOwner.Id).ToList();
            ViewBag.PrimaryContactList = contacts;
            return View(crmOwner);
        }
        public ActionResult ProfileHighlight(int? id)
        {

            if (id != null)
            {
                IEnumerable<ApplicationUser> AdminUsers = GetApplicationUsersInRole("Admin");
                ViewBag.AdminComments = AdminUsers.ToList();
                CRMContact crmContact = db.CRMContact.Find(id);
                if (crmContact.CRMContactHistory != null)
                {
                    List<CRMContactHistory> histories = new List<CRMContactHistory>();
                    histories = crmContact.CRMContactHistory;
                    histories = histories.OrderByDescending(f => f.LastContactedDate).ToList(); ;
                    crmContact.CRMContactHistory = histories;
                }
                CRMFuneralHome fh = db.CRMFuneralHome.Find(crmContact.CRMFuneralHomeId);
                if (fh != null)
                {
                    if (fh.PrimaryCRMContactId == id)
                    {
                        ViewBag.IsCurrentlyPrimaryContact = true;
                    }
                }
                return View(crmContact);
            }


            return View("NotFound");
        }
        public ActionResult FuneralHomeHighlight(int? id)
        {

            if (id != null)
            {
                IEnumerable<ApplicationUser> AdminUsers = GetApplicationUsersInRole("Admin");
                ViewBag.AdminComments = AdminUsers.ToList();
                CRMFuneralHome CRMfh = db.CRMFuneralHome.Find(id);
                if (CRMfh.CRMFuneralHomeHistory != null)
                {
                    List<CRMFuneralHomeHistory> histories = new List<CRMFuneralHomeHistory>();
                    histories = CRMfh.CRMFuneralHomeHistory;

                    histories = histories.OrderByDescending(f => f.LastContactedDate).ToList();

                    //THis is a horrible mistake that needs to get fixed!
                    //The FuneralHomeHistory is expecting a ContactHistory and NOT a FuneralHomeHistory
                    //A temp hack was to just morph the FuneralHomeHistory into a contacthistory. But this is very inneficient.
                    //Once you have the time to change the database, it should be changed to funeralhomehistory
                    foreach(var history in histories)
                    {
                       List<CRMFuneralHomeHistoryComment> comms = db.CRMFuneralHomeHistoryComment.Where(c => c.CRMFuneralHomeHistoryId == history.Id).ToList();
                        List<CRMContactHistoryComment> cch = new List<CRMContactHistoryComment>();
                        foreach(var com in comms)
                        {
                            CRMContactHistoryComment ch = new CRMContactHistoryComment()
                            {
                                Comment = com.Comment,
                                CommentDate = com.CommentDate,
                                UserName = com.UserName,
                                Id = com.Id
                            };
                            cch.Add(ch);
                        }
                        history.CRMContactHistoryComments = cch;
                    }

                    CRMfh.CRMFuneralHomeHistory = histories;
                }

                List<CRMContact> Contacts = db.CRMContact.Where(f => f.CRMFuneralHome != null && f.CRMFuneralHome.Id == id).ToList();
                CRMfh.CRMContact = Contacts;
                int servicesCount = 0;
                int servicesThisMonth = 0;
                DateTime lastService = new DateTime();
                if(CRMfh.FuneralHomeId!=null)
                {
                    FuneralHome fh = db.FuneralHomes.Find(CRMfh.FuneralHomeId);
                    if(fh!=null)
                    {
                       servicesCount = fh.Services.Count();
                        DateTime lastMonth = DateTime.Now.AddMonths(-1);
                        servicesThisMonth = fh.Services.Where(s => s.CreateDate > lastMonth).Count();
                        lastService = fh.Services.OrderByDescending(x => x.CreateDate).First().CreateDate;
                    }
                }
               decimal amountDue = Accounting.GetDollarsOwed(CRMfh.Email);
               string paymentString = amountDue.ToString();
                if(amountDue == -1)
                {
                    paymentString = "N/A";
                }
                FuneralHomeHighlightViewModel fhvm = new FuneralHomeHighlightViewModel()
                {
                    Address1 = CRMfh.Address1,
                    Address2 = CRMfh.Address2,
                    AddressConfirmed = CRMfh.AddressConfirmed,
                    BannerImage = CRMfh.BannerImage,
                    City = CRMfh.City,
                    CreateDate = CRMfh.CreateDate,
                    CRMContact = CRMfh.CRMContact,
                    CRMFuneralHomeHistory = CRMfh.CRMFuneralHomeHistory,
                    CRMOwner = CRMfh.CRMOwner,
                    CRMOwnerId = CRMfh.CRMOwnerId,
                    DevHome = CRMfh.DevHome,
                    Email = CRMfh.Email,
                    EstimatedCallsPerYear = CRMfh.EstimatedCallsPerYear,
                    FuneralHome = CRMfh.FuneralHome,
                    FuneralHomeId = CRMfh.FuneralHomeId,
                    FuneralHomeNumber = CRMfh.FuneralHomeNumber,
                    HasAUserLogin = CRMfh.HasAUserLogin,
                    HasCamera = CRMfh.HasCamera,
                    HasMemorialFolders = CRMfh.HasMemorialFolders,
                    Id = CRMfh.Id,
                    IsDeleted = CRMfh.IsDeleted,
                    IsRecording = CRMfh.IsRecording,
                    LeadWarmth = CRMfh.LeadWarmth,
                    Name = CRMfh.Name,
                    NextContactByUserName = CRMfh.NextContactByUserName,
                    NextContactDate = CRMfh.NextContactDate,
                    NextContactNotes = CRMfh.NextContactNotes,
                    NextContactType = CRMfh.NextContactType,
                    NumberOfContacts = CRMfh.NumberOfContacts,
                    OwnerFirstName = CRMfh.OwnerFirstName,
                    OwnerLastName = CRMfh.OwnerLastName,
                    OwnershipType = CRMfh.OwnershipType,
                    PDFNotes = CRMfh.PDFNotes,
                    PDFPublishingSoftware = CRMfh.PDFPublishingSoftware,
                    PrimaryCRMContact = CRMfh.PrimaryCRMContact,
                    PrimaryCRMContactId = CRMfh.PrimaryCRMContactId,
                    SatelliteLocations = CRMfh.SatelliteLocations,
                    State = CRMfh.State,
                    WebcastingHistoryNotes = CRMfh.WebcastingHistoryNotes,
                    Website = CRMfh.Website,
                    WebsiteProvider = CRMfh.WebsiteProvider,
                    ZipCode = CRMfh.ZipCode,
                    LastService = lastService,
                    ServicesThisMonth = servicesThisMonth,
                    TotalServices = servicesCount,
                    PaymentStatus = paymentString
                    
                };
                return View(fhvm);
            }


            return View("NotFound");
        }
        public ActionResult OwnerHighlight(int? id)
        {
            if (id != null)
            {
                IEnumerable<ApplicationUser> AdminUsers = GetApplicationUsersInRole("Admin");
                ViewBag.AdminComments = AdminUsers.ToList();
                CRMOwnerContact crmOwner = db.CRMOwnerContact.Find(id);
                if (crmOwner.CRMContactHistory != null)
                {
                    List<CRMContactHistory> histories = new List<CRMContactHistory>();
                    histories = crmOwner.CRMContactHistory;
                    histories = histories.OrderByDescending(f => f.LastContactedDate).ToList(); ;
                    crmOwner.CRMContactHistory = histories;
                }
                return View(crmOwner);
            }


            return View("NotFound");
        }

        public ActionResult UserLog()
        {
            IEnumerable<ApplicationUser> AdminUsers = GetApplicationUsersInRole("Admin");
            ViewBag.AdminComments = AdminUsers.ToList();
            DateTime NintyDaysAgo= DateTime.Now.AddDays(-90);
            List<CRMFuneralHomeHistory> UserLog = db.CRMFuneralHomeHistory.Where(h => h.LastContactedDate > NintyDaysAgo).OrderByDescending(h => h.LastContactedDate).ToList();
            return View(UserLog);
        }

        //Id is for funeral home
        public ActionResult AddBusinessContact(int? id)
        {
            CRMFuneralHome businessContainer = db.CRMFuneralHome.Where(f => f.Name == "DO NOT DELETE").FirstOrDefault();
            if (businessContainer == null)
            {
                return View("NotFound");
            }
            AddCRMContactViewModel businessContact = new AddCRMContactViewModel()
            {
                CRMFuneralHomeId = businessContainer.Id,
                ContactCategory = ContactCategory.Business
            };
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");
            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            ViewBag.IsBusinessContact = true;
            return View("AddCRMContact", businessContact);
        }

        //Id is for funeral home
        public ActionResult AddOwnerContact(int? id)
        {

            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;

            List<CRMOwner> Owners = new List<CRMOwner>();
            Owners = db.CRMOwner.Where(c => c.Id != null).ToList();
            //If Funeral Home Id is Passed Remove dropdown and the page becomes a add contact for specific owner
            CRMOwner defaultOwner = Owners.Where(f => f.Id == id).FirstOrDefault();
            if (defaultOwner != null)
            {
                ViewBag.OwnerName = defaultOwner.Name;
                Owners = Owners.Where(f => f.Id == defaultOwner.Id).ToList();
            }

            ViewBag.OwnerList = Owners;
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOwnerContact(AddCRMownerContactViewModel CRMContactVM)
        {
            CRMOwnerContact crmOwnerContact = new CRMOwnerContact()
            {
                City = CRMContactVM.City,
                ContactPosition = CRMContactVM.ContactPosition,
                Email = CRMContactVM.Email,
                FacebookId = CRMContactVM.FacebookId,
                CRMOwnerId = (int)CRMContactVM.CRMOwnerId,
                FamilyInfo = CRMContactVM.FamilyInfo,
                GeneralNotes = CRMContactVM.GeneralNotes,
                FirstName = CRMContactVM.FirstName,
                Interests = CRMContactVM.Interests,
                FirstContactedByUserName = CRMContactVM.FirstContactedByUserName,
                FirstContactNotes = CRMContactVM.FirstContactNotes,
                LastName = CRMContactVM.LastName,
                NextContactByUserName = CRMContactVM.NextContactByUserName,
                NextContactDate = CRMContactVM.NextContactDate,
                NextContactNotes = CRMContactVM.NextContactNotes,
                NumberOfContacts = CRMContactVM.NumberOfContacts,
                NextContactType = CRMContactVM.NextContactType,
                OrginOfContact = CRMContactVM.OrginOfContact,
                PhoneNumber = CRMContactVM.PhoneNumber,
                PictureFileName = CRMContactVM.PictureFileName,
                SnapchatUserId = CRMContactVM.SnapchatUserId,
                SpotifyUserId = CRMContactVM.SpotifyUserId,
                TwitterHandle = CRMContactVM.TwitterHandle,

            };
            if (CRMContactVM.FirstContactedDate == null)
            {
                //If the date is my Birthdate they haven't been contacted
                crmOwnerContact.FirstContactedDate = new DateTime(1990, 8, 12);
            }
            else
            {
                crmOwnerContact.FirstContactedDate = (DateTime)CRMContactVM.FirstContactedDate;
            }

            if (ModelState.IsValid)
            {
                db.CRMOwnerContact.Add(crmOwnerContact);
                db.SaveChanges();
                return RedirectToAction("ownercontactlist");
            }
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;

            List<CRMOwner> Owners = new List<CRMOwner>();
            Owners = db.CRMOwner.Where(c => c.Id != null).ToList();
            //If Funeral Home Id is Passed Remove dropdown and the page becomes a add contact for specific owner
            CRMOwner defaultOwner = Owners.Where(f => f.Id == crmOwnerContact.CRMOwnerId).FirstOrDefault();
            if (defaultOwner != null)
            {
                ViewBag.FuneralHomeName = defaultOwner.Name;
                Owners = Owners.Where(f => f.Id == defaultOwner.Id).ToList();
            }

            ViewBag.FuneralHomeList = Owners;
            return View();

        }
        //Id is for funeral home
        public ActionResult AddFuneralHomeContact(int? id)
        {

            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;



            List<CRMFuneralHome> FuneralHomes = new List<CRMFuneralHome>();
            FuneralHomes = db.CRMFuneralHome.Where(c => c.Id != null).ToList();
            //If Funeral Home Id is Passed Remove dropdown and the page becomes a add contact for specific home
            CRMFuneralHome defaultHome = FuneralHomes.Where(f => f.Id == id).FirstOrDefault();
            if (defaultHome != null)
            {
                ViewBag.FuneralHomeName = defaultHome.Name;
                ViewBag.FuneralHomeId = defaultHome.Id;
                FuneralHomes = FuneralHomes.Where(f => f.Id == defaultHome.Id).ToList();
            }

            ViewBag.FuneralHomeList = FuneralHomes;
            return View("AddCRMContact");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddCRMontact(AddCRMContactViewModel CRMContactVM)
        {
            CRMContact crmContact = new CRMContact()
            {
                City = CRMContactVM.City,
                ContactPosition = CRMContactVM.ContactPosition,
                CRMFuneralHomeId = (int)CRMContactVM.CRMFuneralHomeId,
                Email = CRMContactVM.Email,
                FacebookId = CRMContactVM.FacebookId,
                FamilyInfo = CRMContactVM.FamilyInfo,
                GeneralNotes = CRMContactVM.GeneralNotes,
                FirstName = CRMContactVM.FirstName,
                Interests = CRMContactVM.Interests,
                FirstContactedByUserName = CRMContactVM.FirstContactedByUserName,
                FirstContactNotes = CRMContactVM.FirstContactNotes,
                LastName = CRMContactVM.LastName,
                LeadWarmth = CRMContactVM.LeadWarmth,
                NextContactByUserName = CRMContactVM.NextContactByUserName,
                NextContactDate = CRMContactVM.NextContactDate,
                NextContactNotes = CRMContactVM.NextContactNotes,
                NumberOfContacts = CRMContactVM.NumberOfContacts,
                NextContactType = CRMContactVM.NextContactType,
                OrginOfContact = CRMContactVM.OrginOfContact,
                PhoneNumber = CRMContactVM.PhoneNumber,
                PictureFileName = CRMContactVM.PictureFileName,
                SnapchatUserId = CRMContactVM.SnapchatUserId,
                SpotifyUserId = CRMContactVM.SpotifyUserId,
                TwitterHandle = CRMContactVM.TwitterHandle,
                BusinessName = CRMContactVM.BusinessName,
            };
            if (CRMContactVM.ContactCategory == ContactCategory.Business)
            {
                crmContact.ContactCategory = ContactCategory.Business;
            }
            else
            {
                crmContact.ContactCategory = ContactCategory.FuneralHome;
                try
                {
                    crmContact.ScreenScrappedImage = CRMWebsiteMiner.GetProfileImage(crmContact);
                    crmContact.ScreenScrappedBio = CRMWebsiteMiner.GetDescription(crmContact);
                }
                catch
                {
                    //They really should make just a try block
                }
            }
            if (CRMContactVM.FirstContactedDate == null)
            {
                //If the date is my Birthdate they haven't been contacted
                crmContact.FirstContactedDate = new DateTime(1990, 8, 12);
            }
            else
            {
                crmContact.FirstContactedDate = (DateTime)CRMContactVM.FirstContactedDate;
            }
            //For some reason my hiddenfor is throwing model errors
            ModelState.Remove("ContactCategory");
            if (ModelState.IsValid)
            {
                CRMFuneralHome fh = db.CRMFuneralHome.Find(crmContact.CRMFuneralHomeId);
                if (fh != null)
                {
                    List<CRMContact> contacts = fh.CRMContact.ToList();
                    contacts.Add(crmContact);
                    fh.CRMContact = contacts;
                    if (fh.PrimaryCRMContact == null)
                    {
                        fh.PrimaryCRMContact = crmContact;
                    }
                    db.Entry(fh).State = EntityState.Modified;
                }

                db.CRMContact.Add(crmContact);
                db.SaveChanges();
                return RedirectToAction("contactlist");
            }
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            List<CRMFuneralHome> FuneralHomes = new List<CRMFuneralHome>();
            FuneralHomes = db.CRMFuneralHome.Where(c => c.Id != null).ToList();
            //If Funeral Home Id is Passed Remove dropdown and the page becomes a add contact for specific home
            if (CRMContactVM.CRMFuneralHome != null)
            {
                CRMFuneralHome defaultHome = FuneralHomes.Where(f => f.Id == CRMContactVM.CRMFuneralHome.Id).FirstOrDefault();
                if (defaultHome != null)
                {
                    ViewBag.FuneralHomeName = defaultHome.Name;
                    FuneralHomes = FuneralHomes.Where(f => f.Id == defaultHome.Id).ToList();
                }
            }
            ViewBag.FuneralHomeList = FuneralHomes;

            crmContact.ContactCategory = ContactCategory.FuneralHome;
            return View("AddCRMContact", CRMContactVM);
        }

        public ActionResult UpdateNextContact(int? id)
        {
            CRMContact crmCon = db.CRMContact.Find(id);
            if (crmCon == null)
            {
                return RedirectToAction("NotFound");
            }
            AddCRMContactViewModel cvm = new AddCRMContactViewModel()
            {
                CRMFuneralHomeId = id,
                NextContactDate = DateTime.Now.AddDays(45),
                FirstName = crmCon.FirstName,
                LastName = crmCon.LastName,
                CRMFuneralHome = crmCon.CRMFuneralHome,
                LeadWarmth = crmCon.LeadWarmth
            };
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null && c.Deleted!=true),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            return View(cvm);
        }
        public ActionResult UpdateNextContactFH(int? id)
        {
            CRMFuneralHome crmFH = db.CRMFuneralHome.Find(id);
            if (crmFH == null)
            {
                return RedirectToAction("NotFound");
            }

            UpdateNextContactFHViewModel uncfh = new UpdateNextContactFHViewModel()
            {
                CRMFuneralHomeId = crmFH.Id,
                CRMFuneralHome = crmFH,
                NextContactByUserName = crmFH.NextContactByUserName,
                NextContactDate = crmFH.NextContactDate,
                NextContactType = crmFH.NextContactType,
                NextContactNotes = crmFH.NextContactNotes
            };
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null && c.Deleted != true),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            return View(uncfh);
        }
        public ActionResult UpdateFirstContact(int? id)
        {
            CRMContact crmCon = db.CRMContact.Find(id);
            if (crmCon == null)
            {
                return RedirectToAction("NotFound");
            }
            AddCRMContactViewModel cvm = new AddCRMContactViewModel()
            {
                CRMFuneralHomeId = id,
                FirstContactedDate = crmCon.FirstContactedDate,
                FirstContactedByUserName = crmCon.FirstContactedByUserName,
                FirstContactNotes = crmCon.FirstContactNotes,
                FirstName = crmCon.FirstName,
                LastName = crmCon.LastName
            };
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            return View(cvm);
        }
        public ActionResult EditContact(int? id)
        {
            CRMContact CRMContact = db.CRMContact.Find(id);
            if (CRMContact == null)
            {
                return View("NotFound");
            }
            List<CRMFuneralHome> FuneralHomes = new List<CRMFuneralHome>();
            FuneralHomes = db.CRMFuneralHome.Where(c => c.Id != null).ToList();
            ViewBag.FuneralHomeList = FuneralHomes;
            EditContactViewModel ccvm = new EditContactViewModel()
            {
                Id = CRMContact.Id,
                City = CRMContact.City,
                ContactPosition = CRMContact.ContactPosition,
                CRMFuneralHomeId = (int)CRMContact.CRMFuneralHomeId,
                Email = CRMContact.Email,
                FacebookId = CRMContact.FacebookId,
                FamilyInfo = CRMContact.FamilyInfo,
                GeneralNotes = CRMContact.GeneralNotes,
                FirstName = CRMContact.FirstName,
                Interests = CRMContact.Interests,
                LastName = CRMContact.LastName,
                LeadWarmth = CRMContact.LeadWarmth,
                PhoneNumber = CRMContact.PhoneNumber,
                PictureFileName = CRMContact.PictureFileName,
                SnapchatUserId = CRMContact.SnapchatUserId,
                SpotifyUserId = CRMContact.SpotifyUserId,
                TwitterHandle = CRMContact.TwitterHandle,
                BannerPictureFileName = CRMContact.BannerImage,
                oldFuneralHomeId=(int)CRMContact.CRMFuneralHomeId
            };
            return View(ccvm);
        }

        [HttpPost]
        public ActionResult EditContact(EditContactViewModel CRMContactVM)
        {

            if (ModelState.IsValid)
            {
                CRMContact crmContact = db.CRMContact.Find(CRMContactVM.Id);
                crmContact.City = CRMContactVM.City;
                crmContact.ContactPosition = CRMContactVM.ContactPosition;
                crmContact.CRMFuneralHomeId = CRMContactVM.CRMFuneralHomeId;
                crmContact.Email = CRMContactVM.Email;
                crmContact.FacebookId = CRMContactVM.FacebookId;
                crmContact.FamilyInfo = CRMContactVM.FamilyInfo;
                crmContact.GeneralNotes = CRMContactVM.GeneralNotes;
                crmContact.FirstName = CRMContactVM.FirstName;
                crmContact.Interests = CRMContactVM.Interests;
                crmContact.LastName = CRMContactVM.LastName;
                crmContact.LeadWarmth = CRMContactVM.LeadWarmth;
                crmContact.PhoneNumber = CRMContactVM.PhoneNumber;
                crmContact.PictureFileName = CRMContactVM.PictureFileName;
                crmContact.SnapchatUserId = CRMContactVM.SnapchatUserId;
                crmContact.SpotifyUserId = CRMContactVM.SpotifyUserId;
                crmContact.TwitterHandle = CRMContactVM.TwitterHandle;
                crmContact.BannerImage = CRMContactVM.BannerPictureFileName;

                db.Entry(crmContact).State = EntityState.Modified;
                db.SaveChanges();
                //Update funeral home too if change
                if(CRMContactVM.oldFuneralHomeId!= CRMContactVM.CRMFuneralHomeId)
                {
                    var nfh = db.CRMFuneralHome.Find(CRMContactVM.CRMFuneralHomeId);
                    var ofh = db.CRMFuneralHome.Find(CRMContactVM.oldFuneralHomeId);
                    if (nfh != null)
                    {
                        var nfhOldCons = nfh.CRMContact.ToList();
                        nfhOldCons.Add(crmContact);
                        nfh.CRMContact = nfhOldCons;
                        db.Entry(nfh).State = EntityState.Modified;
                        if(ofh!=null)
                        {
                            var ofhOldCons = nfh.CRMContact.ToList();
                            ofhOldCons.Remove(crmContact);
                            ofh.CRMContact = ofhOldCons;
                            db.Entry(nfh).State = EntityState.Modified;
                        }
                        db.SaveChanges();
                    }
                }
            
                return RedirectToAction("ProfileHighlight", new { id = CRMContactVM.Id });
            }
            return View(CRMContactVM);
        }

        [HttpPost]
        public ActionResult UpdateNextContact(AddCRMContactViewModel AcCvM)
        {

            CRMContact crmCon = db.CRMContact.Find(AcCvM.CRMFuneralHomeId);
            if (crmCon != null)
            {
               
                    crmCon.NextContactByUserName = AcCvM.NextContactByUserName;
                    crmCon.NextContactDate = AcCvM.NextContactDate;
                    crmCon.NextContactNotes = AcCvM.NextContactNotes;
                    crmCon.NextContactType = AcCvM.NextContactType;
                    crmCon.LeadWarmth = AcCvM.LeadWarmth;
                    crmCon.NoFutureContact = AcCvM.NoFutureContact;
             
                db.Entry(crmCon).State = EntityState.Modified;
                db.SaveChanges();
                var fh = db.CRMFuneralHome.Find(crmCon.CRMFuneralHomeId);
                if (fh != null)
                {
                    if (fh.FuneralHomeId == null || fh.FuneralHomeId == 0)
                    {
                        fh.LeadWarmth = crmCon.LeadWarmth;
                        db.Entry(fh).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
                return RedirectToAction("ProfileHighlight", new { id = AcCvM.CRMFuneralHomeId });
            }


            return View(AcCvM);
        }

        [HttpPost]
        public ActionResult UpdateFirstContact(AddCRMContactViewModel AcCvM)
        {

            CRMContact crmCon = db.CRMContact.Find(AcCvM.CRMFuneralHomeId);
            if (crmCon != null)
            {
                crmCon.FirstContactedDate = (DateTime)AcCvM.FirstContactedDate;
                crmCon.FirstContactNotes = AcCvM.FirstContactNotes;
                crmCon.FirstContactedByUserName = AcCvM.FirstContactedByUserName;

                db.Entry(crmCon).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("ProfileHighlight", new { id = AcCvM.CRMFuneralHomeId });
            }


            return View(AcCvM);
        }
   
        [HttpPost]
        public ActionResult AddContactHistory(int ContactId, string notes, ContactType contactType, int postRating, string isOwner, string type)
        {
            if(type=="funeralHome")
            {
                CRMFuneralHomeHistory fhhistory = new CRMFuneralHomeHistory()
                {
                    LastContactedByUserName = User.Identity.Name,
                    LastContactNotes = notes,
                    LastContactedDate = DateTime.Now,
                    ContactType = contactType,
                    PostRating = postRating
                };
                CRMFuneralHome crmFh = db.CRMFuneralHome.Find(ContactId);
                if (crmFh == null)
                {
                    return Json(new { result = "Error: could not find contact with an id of" + ContactId.ToString(), Error = "true" });
                }
                fhhistory.CRMFuneralHomeId = ContactId;
                db.CRMFuneralHomeHistory.Add(fhhistory);
                db.SaveChanges();
                string contactTypeStringfh = ((ContactType)contactType).ToString();
                return Json(new { result = "Success", comment = notes, commentId = fhhistory.Id, contactType = contactTypeStringfh });
            }
            CRMContactHistory history = new CRMContactHistory()
            {
                LastContactedByUserName = User.Identity.Name,
                LastContactNotes = notes,
                LastContactedDate = DateTime.Now,
                ContactType = contactType,
                PostRating = postRating
            };
            if (isOwner == "true")
            {
                CRMOwnerContact crmOwn = db.CRMOwnerContact.Find(ContactId);
                if (crmOwn == null)
                {
                    return Json(new { result = "Error: could not find owner with an id of" + ContactId.ToString(), Error = "true" });
                }
                history.CRMOwnerContactId = ContactId;
                crmOwn.NumberOfContacts = crmOwn.NumberOfContacts + 1;
                List<CRMContactHistory> posts = crmOwn.CRMContactHistory.ToList();
                posts.Add(history);
                crmOwn.CRMContactHistory = posts;
                db.Entry(crmOwn).State = EntityState.Modified;
            }
            else
            {
                CRMContact crmCon = db.CRMContact.Find(ContactId);
                if (crmCon == null)
                {
                    return Json(new { result = "Error: could not find contact with an id of" + ContactId.ToString(), Error = "true" });
                }
                history.CRMContactId = ContactId;
                crmCon.NumberOfContacts = crmCon.NumberOfContacts + 1;
                db.Entry(crmCon).State = EntityState.Modified;
            }


            db.CRMContactHistory.Add(history);

            db.SaveChanges();
            string contactTypeString = ((ContactType)contactType).ToString();
            return Json(new { result = "Success", comment = notes, commentId = history.Id, contactType = contactTypeString });

        }
        [HttpPost]
        public ActionResult AddContactComment(int CommentId, string Comment)
        {
            CRMContactHistory cch = db.CRMContactHistory.Find(CommentId);
            if (cch == null)
            {
                return Json(new { result = "Error: could not find contact with an id of" + CommentId.ToString(), Error = "true" });
            }
            CRMContactHistoryComment cchm = new CRMContactHistoryComment()
            {
                Comment = Comment,
                CommentDate = DateTime.Now,
                UserName = User.Identity.Name,
                CRMContactHistoryId = cch.Id,
                CRMContactHistory = cch
            };
            db.CRMContactHistoryComment.Add(cchm);
            db.SaveChanges();
            return Json(new { result = "success" });

        }
        [HttpPost]
        public ActionResult ContactSnooze(int ContactId)
        {
            CRMContact contact = db.CRMContact.Find(ContactId);
            contact.NextContactDate = DateTime.Now.AddDays(7);
            db.Entry(contact).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { result = "success" });
        }
        [HttpPost]
        public ActionResult SetPrimaryContact(int ContactId)
        {
            CRMContact crmCon = db.CRMContact.Find(ContactId);
            if (crmCon == null)
            {
                return Json(new { result = "Error: could not find contact with an id of" + ContactId.ToString(), Error = "true" });
            }
            CRMFuneralHome fh = db.CRMFuneralHome.Find(crmCon.CRMFuneralHomeId);
            fh.PrimaryCRMContactId = ContactId;
            db.Entry(fh).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { result = "success" });
        }
        [HttpPost]
        public ActionResult DeleteComment(int CommentId)
        {
            CRMContactHistoryComment cch = db.CRMContactHistoryComment.Find(CommentId);
            if (cch == null)
            {
                return Json(new { result = "Error: could not find contact with an id of" + CommentId.ToString(), Error = "true" });
            }
            db.Entry(cch).State = EntityState.Deleted;
            db.SaveChanges();
            return Json(new { result = "success" });
        }
        [HttpPost]
        public ActionResult DeletePost(int CommentId)
        {
            CRMContactHistory cch = db.CRMContactHistory.Find(CommentId);
            if (cch == null)
            {
                return Json(new { result = "Error: could not find contact with an id of" + CommentId.ToString(), Error = "true" });
            }
            db.Entry(cch).State = EntityState.Deleted;
            db.SaveChanges();
            return Json(new { result = "success" });
        }
        [HttpPost]
        public ActionResult AddCommentLike(int CommentHistoryId)
        {
            //Maybe someday I will add users who liked
            // CRMContactHistoryComment cchm = db.CRMContactHistoryComment.Find(CommentHistoryId);
            // if(cchm==null)
            // {
            //     return Json(new { result = "Error: could not find comment with an id of" + CommentHistoryId.ToString(), Error = "true" });
            // }
            // var userId = User.Identity.GetUserId();
            // ApplicationUser user = db.Users.Where(u => u.Id == userId).FirstOrDefault();
            // List<ApplicationUser> users = new List<ApplicationUser>();
            // if(cchm.UsersWhoLiked==null)
            //   {
            //       users.Add(user);
            //       cchm.UsersWhoLiked=users;
            //   }
            // else
            // {
            //     users = cchm.UsersWhoLiked.ToList();
            //     //If true user has already liked, and wishes to unlike
            //     if(users.Where(u=>u.Id==userId).Count()==1)
            //     {
            //         users.Remove(user);
            //     }
            //     else
            //     {
            //         users.Add(user);
            //     }
            //     cchm.UsersWhoLiked = users;
            // }

            // db.Entry(cchm).State = EntityState.Modified;
            //int records = db.SaveChanges();
            return Json(new { result = "success" });
        }
        // POST: CRM/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(CRMFuneralHome cRMFuneralHome)
        {
            if (ModelState.IsValid)
            {
                //Hack for weird datetime issue. If null it throws an error.
                cRMFuneralHome.NextContactDate = DateTime.Now;
                db.CRMFuneralHome.Add(cRMFuneralHome);
                db.SaveChanges();

                if (cRMFuneralHome.OwnershipType == Models.Data.Enums.OwnershipType.Chain)
                {
                    int? ownerId = cRMFuneralHome.CRMOwnerId;
                    if (ownerId != null)
                    {
                        CRMOwner ownerObj = db.CRMOwner.Find(ownerId);
                        if (ownerObj.Name == "Not Entered Yet")
                        {
                            return RedirectToAction("addOwner", new { id = cRMFuneralHome.Id });
                        }
                    }
                }
                return RedirectToAction("funeralhomehighlight", new { id = cRMFuneralHome.Id });
            }

            List<CRMOwner> owners = new List<CRMOwner>();
            owners = db.CRMOwner.Where(h => h.Id != null).ToList();
            ViewBag.OwnerList = owners;
            ViewBag.FuneralHomeId = new SelectList(db.FuneralHomes, "Id", "Name", cRMFuneralHome.FuneralHomeId);
            ViewBag.PrimaryCRMContactId = new SelectList(db.CRMContact, "Id", "FirstName", cRMFuneralHome.PrimaryCRMContactId);
            return View(cRMFuneralHome);
        }
        public ActionResult LinkCRMtoFH(int? id)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(id);
            if (cfh == null)
            {
                return View("NotFound");
            }
            LinkCRMtoFHViewModel fhvm = new LinkCRMtoFHViewModel()
            {
                CRMFuneralHomeId = (int)id,
            };
            if (cfh.FuneralHomeId != null)
            {
                fhvm.PortalFuneralHomeId = (int)cfh.FuneralHomeId;
            }
            return View(fhvm);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LinkCRMtoFH(LinkCRMtoFHViewModel fhvm)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(fhvm.CRMFuneralHomeId);
            if (fhvm.PortalFuneralHomeId == 0)
            {
                cfh.HasAUserLogin = false;
                cfh.FuneralHomeId = null;
            }
            else
            {
                cfh.HasAUserLogin = true;
                cfh.FuneralHomeId = fhvm.PortalFuneralHomeId;
            }
            db.Entry(cfh).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("index");

        }
        // GET: CRM/Edit/5
        public ActionResult EditFuneralHome(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CRMFuneralHome cRMFuneralHome = db.CRMFuneralHome.Find(id);
            if (cRMFuneralHome == null)
            {
                return HttpNotFound();
            }
            EditCRMFuneralHomeViewModel fhViewModel = new EditCRMFuneralHomeViewModel()
            {
                Address1 = cRMFuneralHome.Address1,
                Address2 = cRMFuneralHome.Address2,
                BannerImage = cRMFuneralHome.BannerImage,
                City = cRMFuneralHome.City,
                CRMOwner = cRMFuneralHome.CRMOwner,
                CRMOwnerId = cRMFuneralHome.CRMOwnerId,
                Email = cRMFuneralHome.Email,
                EstimatedCallsPerYear = cRMFuneralHome.EstimatedCallsPerYear,
                FuneralHomeNumber = cRMFuneralHome.FuneralHomeNumber,
                HasAUserLogin = cRMFuneralHome.HasAUserLogin,
                HasCamera = cRMFuneralHome.HasCamera,
                HasMemorialFolders = cRMFuneralHome.HasMemorialFolders,
                Id = cRMFuneralHome.Id,
                IsRecording = cRMFuneralHome.IsRecording,
                LeadWarmth = cRMFuneralHome.LeadWarmth,
                Name = cRMFuneralHome.Name,
                OwnerFirstName = cRMFuneralHome.OwnerFirstName,
                OwnerLastName = cRMFuneralHome.OwnerLastName,
                OwnershipType = cRMFuneralHome.OwnershipType,
                PDFNotes = cRMFuneralHome.PDFNotes,
                PDFPublishingSoftware = cRMFuneralHome.PDFPublishingSoftware,
                State = cRMFuneralHome.State,
                WebcastingHistoryNotes = cRMFuneralHome.WebcastingHistoryNotes,
                Website = cRMFuneralHome.Website,
                WebsiteProvider = cRMFuneralHome.WebsiteProvider,
                ZipCode = cRMFuneralHome.ZipCode

            };
            List<CRMOwner> owners = new List<CRMOwner>();
            owners = db.CRMOwner.Where(h => h.Id != null).ToList();
            ViewBag.OwnerList = owners;
            ViewBag.FuneralHomeId = new SelectList(db.FuneralHomes, "Id", "Name", cRMFuneralHome.FuneralHomeId);
            ViewBag.PrimaryCRMContactId = new SelectList(db.CRMContact, "Id", "FirstName", cRMFuneralHome.PrimaryCRMContactId);
            return View(fhViewModel);
        }

        // POST: CRM/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(EditCRMFuneralHomeViewModel cRMFuneralHome)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(cRMFuneralHome.Id);
                cfh.Address1 = cRMFuneralHome.Address1;
                cfh.Address2 = cRMFuneralHome.Address2;
                cfh.BannerImage = cRMFuneralHome.BannerImage;
                cfh.City = cRMFuneralHome.City;
                cfh.CRMOwner = cRMFuneralHome.CRMOwner;
                cfh.CRMOwnerId = cRMFuneralHome.CRMOwnerId;
                cfh.Email = cRMFuneralHome.Email;
                cfh.EstimatedCallsPerYear = cRMFuneralHome.EstimatedCallsPerYear;
                cfh.FuneralHomeNumber = cRMFuneralHome.FuneralHomeNumber;
                cfh.HasAUserLogin = cRMFuneralHome.HasAUserLogin;
                cfh.HasCamera = cRMFuneralHome.HasCamera;
                cfh.HasMemorialFolders = cRMFuneralHome.HasMemorialFolders;
                cfh.Id = cRMFuneralHome.Id;
                cfh.IsRecording = cRMFuneralHome.IsRecording;
                cfh.LeadWarmth = cRMFuneralHome.LeadWarmth;
                cfh.Name = cRMFuneralHome.Name;
                cfh.OwnerFirstName = cRMFuneralHome.OwnerFirstName;
                cfh.OwnerLastName = cRMFuneralHome.OwnerLastName;
                cfh.OwnershipType = cRMFuneralHome.OwnershipType;
                cfh.PDFNotes = cRMFuneralHome.PDFNotes;
                cfh.PDFPublishingSoftware = cRMFuneralHome.PDFPublishingSoftware;
                cfh.State = cRMFuneralHome.State;
                cfh.WebcastingHistoryNotes = cRMFuneralHome.WebcastingHistoryNotes;
                cfh.Website = cRMFuneralHome.Website;
                cfh.WebsiteProvider = cRMFuneralHome.WebsiteProvider;
                cfh.ZipCode = cRMFuneralHome.ZipCode;
            if (ModelState.IsValid)
            {
                db.Entry(cfh).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.FuneralHomeId = new SelectList(db.FuneralHomes, "Id", "Name", cRMFuneralHome.Id);
            ViewBag.PrimaryCRMContactId = new SelectList(db.CRMContact, "Id", "FirstName", cRMFuneralHome.PrimaryCRMContactId);
            return View("EditFuneralHome", cRMFuneralHome);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult UpdateNextContactFH(UpdateNextContactFHViewModel upncfh)
        {
            if(ModelState.IsValid)
            {
                CRMFuneralHome cfh = db.CRMFuneralHome.Find(upncfh.CRMFuneralHomeId);
                if(cfh!=null)
                {
                    //Notification table population
                    //Figured it's just easier to query the database
                    //string iconClass = "fa-phone";
                    //if(upncfh.NextContactType=="Email"||upncfh.NextContactType=="email")
                    //{
                    //    iconClass = "fa-envelope";
                    //}
                    //string notificationText = upncfh.NextContactType +" "+upncfh.CRMFuneralHome.Name;
                    //CRMNotification notification = new CRMNotification()
                    //{
                    //    NotifyDate = upncfh.NextContactDate.AddDays(-1),
                    //    UserName = upncfh.NextContactByUserName,
                    //    IconClass = iconClass,
                    //    Link ="/crm/funeralhomehighlight/"+upncfh.CRMFuneralHomeId,
                    //    Text = "
                    //}
                    cfh.NextContactNotes = upncfh.NextContactNotes;
                    cfh.NextContactType = upncfh.NextContactType;
                    cfh.NextContactDate = upncfh.NextContactDate;
                    cfh.NextContactByUserName = upncfh.NextContactByUserName;
                    db.Entry(cfh).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("FuneralHomeHighlight", new { id = cfh.Id });
                }
               
            }
            IEnumerable<ApplicationUser> Users = GetApplicationUsersInRole("Admin");

            IEnumerable<SelectListItem> selectList =
            from c in Users
            select new SelectListItem
            {
                Selected = (c.UserName != null && c.Deleted != true),
                Text = c.UserName,
                Value = c.UserName
            };
            ViewBag.UserList = selectList;
            return View(upncfh);
        }

        [HttpPost]
        public ActionResult clearreminder(int id)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(id);
            if(cfh!=null)
            {
                cfh.NextContactNotes = null;
                cfh.NextContactByUserName = null;
                cfh.NextContactType = null;
                db.Entry(cfh).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { result = "success" });
            }
            return Json(new { result = "fail" });
        }

        [HttpPost]
        public ActionResult changeleadwarmth(int id, LeadWarmth lead)
        {
            CRMFuneralHome cfh = db.CRMFuneralHome.Find(id);
            if (cfh != null)
            {
                cfh.LeadWarmth = lead;
                db.Entry(cfh).State = EntityState.Modified;
                db.SaveChanges();
                return Json(new { result = "success" });
            }
            return Json(new { result = "fail" });
        }
        // GET: CRM/Delete/5
        public ActionResult DeleteContact(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            CRMContact crmContact = db.CRMContact.Find(id);
            if (crmContact == null)
            {
                return View("NotFound");
            }
            return View(crmContact);
        }

        [HttpPost]
        public ActionResult Rescrape(int id)
        {
            CRMContact crmCon = db.CRMContact.Find(id);
            if (crmCon != null)
            {
                string description = CRMWebsiteMiner.GetDescription(crmCon);
                string profileImage = CRMWebsiteMiner.GetProfileImage(crmCon);
                if (description != "")
                {
                    crmCon.ScreenScrappedBio = description;
                    db.Entry(crmCon).State = EntityState.Modified;
                }
                if (profileImage != "")
                {
                    crmCon.ScreenScrappedImage = profileImage;
                    db.Entry(crmCon).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
            return Json(new { result = "success" });
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult notificationtrigger()
        {
            //List<CRMFuneralHome> homesWithNotification = db.CRMFuneralHome.Where(c => c.NextContactByUserName != null).ToList();
            //List<CRMNotification> notifications = new List<CRMNotification>();
            //foreach(var home in homesWithNotification)
            //{
            //    CRMNotification note = new CRMNotification()
            //    {
                    
            //    }
            //}
            return Json(new { result = "success" });
        }
        // POST: CRM/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteContact(int id)
        {

            CRMContact crmCOntact = db.CRMContact.Find(id);
            CRMFuneralHome fh = db.CRMFuneralHome.Find(crmCOntact.CRMFuneralHomeId);
            if (fh != null && fh.PrimaryCRMContactId == id)
            {
                fh.PrimaryCRMContactId = null;
                fh.PrimaryCRMContact = null;
                db.Entry(fh).State = EntityState.Modified;
            }
            db.CRMContact.Remove(crmCOntact);
            db.SaveChanges();
            return RedirectToAction("ContactList");
        }
        [HttpPost]
        public ActionResult DeleteContactScraper(int id)
        {

            CRMContact crmCOntact = db.CRMContact.Find(id);

            CRMFuneralHome fh = db.CRMFuneralHome.Find(crmCOntact.CRMFuneralHomeId);
            if (fh != null && fh.PrimaryCRMContactId == id)
            {
                fh.PrimaryCRMContactId = null;
                fh.PrimaryCRMContact = null;
                db.Entry(fh).State = EntityState.Modified;
            }
            db.CRMContact.Remove(crmCOntact);
            db.SaveChanges();
            return Json(new { result = "success" });
        }
        public ActionResult DeleteOwner(int? id)
        {
            CRMOwner crmOwn = db.CRMOwner.Find(id);
            if (crmOwn == null)
            {
                return View("NotFound");
            }
            return View(crmOwn);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteOwner(int id)
        {
            CRMOwner crmOwner = db.CRMOwner.Find(id);
            List<CRMFuneralHome> homes = db.CRMFuneralHome.Where(h => h.CRMOwnerId == id).ToList();
            foreach (var home in homes)
            {
                home.CRMOwnerId = null;
                home.OwnerFirstName = "Unknown";
                home.OwnerLastName = "Unknown";
                home.OwnershipType = OwnershipType.Unknown;
                db.Entry(home).State = EntityState.Modified;
                db.SaveChanges();
            }
            db.CRMOwner.Remove(crmOwner);
            db.SaveChanges();
            return RedirectToAction("OwnerList");
        }

        public ActionResult DeleteOwnerContact(int? id)
        {
            CRMOwnerContact crmOwnCon = db.CRMOwnerContact.Find(id);
            if (crmOwnCon == null)
            {
                return View("NotFound");
            }
            return View(crmOwnCon);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteOwnerContact(int id)
        {
            CRMOwnerContact crmOwner = db.CRMOwnerContact.Find(id);

            db.CRMOwnerContact.Remove(crmOwner);
            db.SaveChanges();
            return RedirectToAction("OwnerContactList");
        }

        // GET: CRM/Delete/5
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CRMFuneralHome cRMFuneralHome = db.CRMFuneralHome.Find(id);
            if (cRMFuneralHome == null)
            {
                return HttpNotFound();
            }
            return View(cRMFuneralHome);
        }

        // POST: CRM/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CRMFuneralHome cRMFuneralHome = db.CRMFuneralHome.Find(id);
            db.CRMFuneralHome.Remove(cRMFuneralHome);
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
