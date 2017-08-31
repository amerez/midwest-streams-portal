using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models.Data;
using VideoManager.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System.Web.Security;
using VideoManager.Code;

namespace VideoManager.Controllers
{
    public class BaseController : Controller
    {
        protected ApplicationDbContext db = new ApplicationDbContext();
        protected RoleManager<IdentityRole> RoleManager;
        protected UserManager<ApplicationUser> UserManager;
        public BaseController()
        {
			RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
			UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

 
      
			//List<string> roles = new List<string> { "Admin", "FuneralHome", "Family", "Viewing" };
			//foreach (var role in roles)
			//{
			//	if (!roleManager.RoleExists(role))
			//	{
			//		var newRole = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
			//		newRole.Name = role;
			//		roleManager.Create(newRole);
			//	}
			//}

			//if (!userManager.IsInRole(db.Users.Where(u => u.UserName=="jeffS").FirstOrDefault().Id,"Admin"))
			//	userManager.AddToRole(db.Users.Where(u => u.UserName=="jeffS").FirstOrDefault().Id,"Admin");
			//if (!userManager.IsInRole(db.Users.Where(u => u.UserName=="Shane.P.White").FirstOrDefault().Id,"Admin"))
			//	userManager.AddToRole(db.Users.Where(u => u.UserName=="Shane.P.White").FirstOrDefault().Id,"Admin");
			//userManager.UserValidator = new UserValidator<ApplicationUser>(userManager) { AllowOnlyAlphanumericUserNames = false };


        }
        //Set User Data
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            if(requestContext.HttpContext!=null && requestContext.HttpContext.User!=null)
            {
                if (requestContext.HttpContext.User.Identity.IsAuthenticated)
                {
                    var ussserr = User;
                    var ussserrIden = ussserr.Identity;
                    var ussserrIDD = ussserrIden.GetUserId();
                    var currentUser = db.Users.Where(f => f.Id == ussserrIDD).FirstOrDefault();
                    if(currentUser!=null)
                    {
                        ViewBag.BaseUserFirstName = currentUser.FirstName;
                        ViewBag.BaseUserLastName = currentUser.LastName;
                        ViewBag.BaseUserFacebookId = currentUser.FacebookId;
                         if(User.IsInRole("Admin"))
                        {
                             if(Admin.IsServerRenderingVideo()==true)
                             {
                                 ViewBag.RenderingVideo = true;
                             }
                             List<FuneralHome> OnlineHomes = Admin.GetOnlineCustomers(db);
                             if(OnlineHomes.Count>0)
                             {
                                 ViewBag.OnlineHomes = OnlineHomes;
                             }
                             List<Service> ServicesInQues = Admin.GetVideosInQue(db);
                             if(ServicesInQues.Count>0)
                             {
                                 ViewBag.ServicesInQue = ServicesInQues;
                             }
                             List<CRMNotification> notifications = new List<CRMNotification>();
                             DateTime tomorrow = DateTime.Now.AddDays(1);
                                List<CRMFuneralHome> homesThatNeedToBeContacted = db.CRMFuneralHome.Where(f=>f.NextContactByUserName==currentUser.UserName &&f.NextContactDate<tomorrow).ToList();
                             foreach(var home in homesThatNeedToBeContacted)
                             {
                                 string iconClass = "fa-phone";
                                 if(home.NextContactType=="Email"||home.NextContactType=="email")
                                 {
                                     iconClass = "fa-envelope";
                                 }
                                 string notificationText = home.NextContactType +" "+home.Name;
                                 CRMNotification notification = new CRMNotification()
                                 {
                                     NotifyDate = home.NextContactDate.AddDays(-1),
                                     UserName = home.NextContactByUserName,
                                     IconClass = iconClass,
                                     Link = "/crm/funeralhomehighlight/" + home.Id,
                                     Text = notificationText
                                 };
                                 notifications.Add(notification);
                             }
                             ViewBag.Notifications = notifications;
                             
                             //float serverUsage = Admin.getServerUsage();
                        }
                    }
                }
            }
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
        }

        public bool Authorize(FuneralHome home)
        {
            if(User.IsInRole("Admin"))
            {
                return true;
            }
            if (User.IsInRole("FuneralHomeOwner"))
            {
                if (home.Owner != null)
                {

                    if (User.Identity.GetUserId() == home.Owner.UserId)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
           string UserId =  User.Identity.GetUserId();
            if(home.UserId==UserId)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }
        public bool Authorize(Service service)
        {
            if (User.IsInRole("Admin"))
            {
                return true;
            }
             string UserId = User.Identity.GetUserId();
             if (User.IsInRole("FuneralHome"))
             {
                 if (service.FuneralHome.UserId == UserId)
                 {
                     return true;
                 }
             }
            if(User.IsInRole("FuneralHomeOwner"))
            {
                if(service.FuneralHome.Owner!=null)
                {
                    if(service.FuneralHome.Owner.UserId==UserId)
                    {
                        return true;
                    }
                }
            }
         
            return false;
        }
        public bool Authorize(Service service, bool AccessibleToViewingUser)
        {
            if (User.IsInRole("Admin"))
            {
                return true;
            }
            string UserId = User.Identity.GetUserId();
            if (User.IsInRole("FuneralHome"))
            {
                if (service.FuneralHome.UserId == UserId)
                {
                    return true;
                }
            }
            if(User.IsInRole("Viewing"))
            {
                if(service.ViewingUserId == UserId)
                {
                    return true;
                }
            }
            if (User.IsInRole("FuneralHomeOwner"))
            {
                if (service.FuneralHome.Owner != null)
                {
                    if (service.FuneralHome.Owner.UserId == UserId)
                    {
                        return true;
                    }
                }
            }

            return false;
        }
        public IEnumerable<ApplicationUser> GetApplicationUsersInRole(string roleName)
        {
            return from role in db.Roles
                   where role.Name == roleName
                   from userRoles in role.Users
                   join user in db.Users
                   on userRoles.UserId equals user.Id
                   select user;
        }
      
    }
}
