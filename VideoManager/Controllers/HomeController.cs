using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Net;
using Microsoft.Owin.Security;
using VideoManager.Models.Data;
using VideoManager.Models;

namespace VideoManager.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
			
            if (User.Identity.IsAuthenticated)
            {
                string Id = User.Identity.GetUserId();

                if (db.Users.Where(u => u.Id == Id).Count() <= 0)
                {
                    AuthenticationManager.SignOut();
					ViewBag.login = true;
                    return RedirectToAction("LogIn", "Account", null);
                }

                if (User.IsInRole("Admin"))
                {
                    return RedirectToAction("Dashboard", "Analytics", null);
                }
                else if (User.IsInRole("FuneralHome"))
                {
                    //Moved to account controller
                        //string userId = User.Identity.GetUserId();
                        //FuneralHome home = db.FuneralHomes.Where(u => u.UserId == userId).FirstOrDefault();
                        //home.LastLogin = DateTime.Now;
                        //db.Entry(home).State = System.Data.Entity.EntityState.Modified;
                        //db.SaveChanges();
                    
                    return RedirectToAction("Index", "Services", null);
                }
				else if(User.IsInRole("FuneralHomeOwner"))
				{
					var userId = User.Identity.GetUserId();
					var ownerId = db.Owners.Where(o => o.UserId == userId);
					return RedirectToAction("Home", "Owners", ownerId);
				}
                else if (User.IsInRole("CRMUser"))
                {
                    return RedirectToAction("Index", "CRM");
                }
                else if (User.IsInRole("Family"))
                {
                    ApplicationUser user = db.Users.Find(Id);

                    Service serv = db.Services.Where(v => v.ViewingUserId == Id).FirstOrDefault();
                    if (serv == null)
                    {
                        ModelState.AddModelError("Username", "This user is invalid. Contact support.");
                        return RedirectToAction("Index", "Home", null);
                    }
                    return RedirectToAction("Edit", "Video", new { Id = serv.Id });
                }
                else if (User.IsInRole("Viewing"))
                {
					ApplicationUser user = db.Users.Find(Id);

					Service serv = db.Services.Where(v => v.ViewingUserId == Id).FirstOrDefault();
					if (serv == null)
					{
						ModelState.AddModelError("Username", "This user is invalid. Contact support.");
						return RedirectToAction("Index", "Home", null);
					}
					return RedirectToAction("View", "Services", new { Id = serv.Id });

                }
            }
			ViewBag.login = true;
            return View("Login");
            //return RedirectToAction("LogIn", "Account", null);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            var userId = User.Identity.GetUserId();
            FuneralHome home = db.FuneralHomes.Where(f => f.UserId == userId).FirstOrDefault();
                if (home != null)
                {
                    if (home.Setting != null)
                    {
                     ViewBag.DisplayTutorialCheckbox = home.Setting.DisplayTutorial;  
                    }
                }
            
            return View();
        }

        #region Helpers
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        #endregion
    }
}