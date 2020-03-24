using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using VideoManager.Models;
using VideoManager.Code;
using System.Net;
using System.Web.Security;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using Stripe;


namespace VideoManager.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {
        public AccountController()
            : this(new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext())))
        {
			
        }

        public AccountController(UserManager<ApplicationUser> userManager)
        {
            UserManager = userManager;
        }

        public UserManager<ApplicationUser> UserManager { get; private set; }

        [Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            var dbroles = db.Roles.OrderBy(x => x.Name);
            List<RoleDictionary> roleLookUp = new List<RoleDictionary>();
            foreach(var mwsrole in dbroles)
            {
                RoleDictionary roledic = new RoleDictionary();
                roledic.RoleName = mwsrole.Name;
                roledic.RoleId = mwsrole.Id;
                roleLookUp.Add(roledic);
            }
            ViewBag.RoleDictionary = roleLookUp;
            return View(db.Users.Where(u => u.Deleted == false).ToList());
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindAsync(model.UserName, model.Password);
                if (user != null)
                {
                    await SignInAsync(user, model.RememberMe);
                    this.Session.Add("UserId", user.Id.ToString());

                    string userId = user.Id.ToString();
                    FuneralHome home = db.FuneralHomes.Where(u => u.UserId == userId).FirstOrDefault();
                    if(home!=null)
                    {
                        home.LastLogin = DateTime.Now;
                        db.Entry(home).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }

                    return RedirectToLocal(returnUrl);
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                }
            }

			ViewBag.login = true;
            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public  ActionResult SignUp(string returnUrl)
        {
            ViewBag.IsCharged = false;
            ViewBag.ReturnUrl = returnUrl;
            var stripePublishKey = ConfigurationManager.AppSettings["StripeApiKeyPublic"];
            ViewBag.StripePublishKey = stripePublishKey;

            var owners = db.Owners.Where(h => true).ToList();
            ViewBag.OwnerList = owners;


            if (Request.Url != null && !string.IsNullOrEmpty(Request.Url.Query))
            {
                int zip = 0;
                int.TryParse(Request.QueryString["zip"], out zip);
                int price = 150;
                int.TryParse(Request.QueryString["price"], out price);
                price = price * 100;
                if(price<9800)
                {
                    price = 15000;
                }
                var xm = new SignUpViewModel
                {
                    Name = Request.QueryString["fh-name"],
                    City = Request.QueryString["city"],
                    State = Request.QueryString["state"],
                    ZipCode = zip,
                    Email = Request.QueryString["email"],
                    Price = price
                };



                return View(xm);
            }
    
            var viewModel = new SignUpViewModel
            {
                Price = 15000
            };
            return View(viewModel);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult SignUp(SignUpViewModel viewModel, string stripeEmail, string stripeToken)
        {
            if (!string.IsNullOrEmpty(stripeEmail) && !string.IsNullOrEmpty(stripeToken))
            {
                var customers = new StripeCustomerService();
                var charges = new StripeChargeService();
                if(viewModel.Price==0)
                {
                    viewModel.Price = 15000;
                }
                var customer = customers.Create(new StripeCustomerCreateOptions
                {
                    Email = stripeEmail,
                    SourceToken = stripeToken
                });
                var charge = charges.Create(new StripeChargeCreateOptions
                {
                    Amount = viewModel.Price,//charge in cents
                    Description = "MWS - Funeral Webcasting",
                    Currency = "usd",
                    CustomerId = customer.Id
                });

                ViewBag.IsCharged = true;
                viewModel.IsCharged = true;
                return View(viewModel);
            }

            ViewBag.IsCharged = false;
            var funeralHome = new FuneralHome()
            {
                City = viewModel.City,
                ZipCode = viewModel.ZipCode,
                Email = viewModel.Email,
                UserName = viewModel.UserName,
                OwnerId = 1,
                PaymentStatus = PaymentStatus.HasPaid,
                Name = viewModel.Name,
                DevHome = true,
                State = viewModel.State
            };
            if (db.Users.Count(u => u.UserName == viewModel.UserName) > 1)
            {
                ViewBag.ErrorText = "Login name already in use";
                return View(viewModel);
            }



            if (ModelState.IsValid)
            {
                var fhh = new FuneralHomeHelper();
                var fhresult = fhh.CreateFuneralHome(funeralHome, viewModel.Email, WebsiteProvider.Other, viewModel.Password);
                if (fhresult.Success == true)
                {
                    var user = UserManager.Find(viewModel.UserName, viewModel.Password);
                    SignInAsync(user, false);
                    this.Session.Add("UserId", user.Id.ToString());
                    Email.sendWelcomeEmail(funeralHome);
                    return RedirectToAction("Index", "Services");
                }
                else
                {
                    Error.ReportError(ErrorSeverity.Fatal, "AccountController", "SignUp", "204");
                    ViewBag.ErrorText = fhresult.UserErrors;
                }
            }
            return View(viewModel);
        }


        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public ActionResult AdminCreate()
        {
            return View();
        }
        public ActionResult Details(int id)
        {
           ApplicationUser user = db.Users.Find(id);
            return View(user);

        }
        
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(CreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser newUser = new ApplicationUser();
                newUser.UserName = model.UserName;
                newUser.Name = model.Name;
                newUser.Email = model.Email;
                var result = await UserManager.CreateAsync(newUser, model.PlainPassword);
                if (result.Succeeded)
                {
                    //EmailHelper.sendMessage(newUser.Email, "Your new account", "An account has been created for you. Your username is " + model.UserName + " and your password is " + model.PlainPassword);
                    var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
					var currentUserId = db.Users.Where(u => u.UserName == model.UserName).FirstOrDefault().Id; 
                    userManager.AddToRole(currentUserId, model.MainRole);
		
                    return RedirectToAction("Index");
                }
                else
                {
                    AddErrors(result);
                }
            }
            else
            {
            }
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AdminCreate(AdminCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser newUser = new ApplicationUser();
                newUser.UserName = model.UserName;
                newUser.Name = model.Name;
                newUser.Email = model.Email;
                newUser.FacebookId = model.FacebookId;
                newUser.FirstName = model.FirstName;
                newUser.LastName = model.LastName;
                newUser.TwitterHandle = model.TwitterHandle;
                newUser.SpotifyUserId = model.SpotifyUserId;
                newUser.SnapchatUserId = model.SnapchatUserId;
                newUser.PhoneNumber = model.PhoneNumber;
                var result = await UserManager.CreateAsync(newUser, model.PlainPassword);
                if (result.Succeeded)
                {
                    //EmailHelper.sendMessage(newUser.Email, "Your new account", "An account has been created for you. Your username is " + model.UserName + " and your password is " + model.PlainPassword);
                    var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                    var currentUserId = db.Users.Where(u => u.UserName == model.UserName).FirstOrDefault().Id;
                    userManager.AddToRole(currentUserId, "Admin");


                    return RedirectToAction("Index");

                }
                else
                {
                    AddErrors(result);
                }
            }
            return View();
        }
        public ActionResult Edit(string Id)
        {
            ApplicationUser user = db.Users.Where(u => u.Id == Id).FirstOrDefault();
            if (user == null)
            {
                return RedirectToAction("Edit", new { Id = User.Identity.GetUserId() });
            }

            return View(new EditViewModel { Roles = user.Roles, Name = user.Name ?? "", UserName = user.UserName ?? "", Email = user.Email ?? "" });
        }
        [Authorize(Roles="Admin")]
        public ActionResult AdminEdit(string Id)
        {
            ApplicationUser user = db.Users.Where(u => u.Id == Id).FirstOrDefault();
            if (user == null)
            {
                var userId = User.Identity.GetUserId();
                user = db.Users.Where(u => u.Id == userId).FirstOrDefault();
            }
            AdminEditViewModel aevm = new AdminEditViewModel()
            {
                UserName = user.Name,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FacebookId = user.FacebookId,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                PictureFileName = user.PictureFileName,
                SnapchatUserId = user.SnapchatUserId,
                SpotifyUserId = user.SpotifyUserId,
                TwitterHandle = user.TwitterHandle,
                UserId = user.Id
            };
            return View(aevm);
        }
        [HttpPost]
        public ActionResult AdminEdit(AdminEditViewModel model)
        {
            bool error = false;
            if (model.PlainPassword!=null && model.PlainPassword.Length < 6)
            {
                ModelState.AddModelError("PlainPassword", "Password must be at least 6 characters");
                error = true;
            }
            if (ModelState.IsValid && error == false)
            {
                ApplicationUser user = db.Users.Where(u => u.Id == model.UserId).FirstOrDefault();
                if (user != null)
                {
                    user.Name = model.Name;
                    user.Email = model.Email;
                    user.LastName = model.LastName;
                    user.FacebookId = model.FacebookId;
                    user.TwitterHandle = model.TwitterHandle;
                    user.SpotifyUserId = model.SpotifyUserId;
                    user.SnapchatUserId = model.SnapchatUserId;
                    user.PictureFileName = model.PictureFileName;
                    user.PhoneNumber = model.PhoneNumber;
                    user.FirstName = model.FirstName;

                    db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));


                    if (!string.IsNullOrEmpty(model.PlainPassword))
                    {
                        userManager.RemovePassword(model.UserId);
                        userManager.AddPassword(model.UserId, model.PlainPassword);
                    }
                    return RedirectToAction("Index", "CRM");
                }
            }
            else
            {
                foreach (var state in ModelState)
                {
                    if (state.Value.Errors.Count > 0)
                    {
                        Console.WriteLine(state.Value.Errors);
                    }
                }
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult Edit(EditViewModel model, string Id)
        {
            bool error = false;
            if (model.PlainPassword.Length < 6)
            {
                ModelState.AddModelError("PlainPassword", "Password must be at least 6 characters");
                error = true;
            }
            if (ModelState.IsValid && error==false)
            {
                ApplicationUser user = db.Users.Where(u => u.Id == Id).FirstOrDefault();
                if (user != null)
                {
                    user.UserName = model.UserName;
                    user.Name = model.Name;
                    user.Email = model.Email;

                    var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                    //TODO: Don't edit roles for now!
                    //foreach (var role in userManager.GetRoles(Id))
                    //{
                    //    userManager.RemoveFromRole(Id, role);
                    //}
                    //userManager.AddToRole(Id, model.MainRole);

                    if (!string.IsNullOrEmpty(model.PlainPassword))
                    {
                        userManager.RemovePassword(Id);
                        userManager.AddPassword(Id, model.PlainPassword);
                    }
                    //db.SaveChanges();
                    return RedirectToAction("Edit", "Video");
                }
            }
			else
			{
				foreach (var state in ModelState)
				{
					if (state.Value.Errors.Count > 0)
					{
						Console.WriteLine(state.Value.Errors);
					}
				}
			}
            return View(model);
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser() { UserName = model.UserName };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInAsync(user, isPersistent: false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    AddErrors(result);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }
        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code, string userName)
        {
            if (code == null)
            {
                return View("Error");
            }
            ResetPasswordViewModel pvm = new ResetPasswordViewModel
            {
                UserName = userName
            };
            return View(pvm);
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var provider = new DpapiDataProtectionProvider("VideoManager");
            UserManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(
                provider.Create("EmailConfirmation"));
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.UserName);
                if (user == null)
                {
                    ModelState.AddModelError("", "No user found.");
                    return View(model);
                }
                IdentityResult result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("ResetPasswordConfirmation", "Account");
                }
                else
                {
                    AddErrors(result);
                    return View(model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }
        //
        // POST: /Account/Disassociate
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Disassociate(string loginProvider, string providerKey)
        {
            ManageMessageId? message = null;
            IdentityResult result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(), new UserLoginInfo(loginProvider, providerKey));
            if (result.Succeeded)
            {
                message = ManageMessageId.RemoveLoginSuccess;
            }
            else
            {
                message = ManageMessageId.Error;
            }
            return RedirectToAction("Manage", new { Message = message });
        }

        //
        // GET: /Account/Manage
        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Your password has been changed."
                : message == ManageMessageId.SetPasswordSuccess ? "Your password has been set."
                : message == ManageMessageId.RemoveLoginSuccess ? "The external login was removed."
                : message == ManageMessageId.Error ? "An error has occurred."
                : "";
            ViewBag.HasLocalPassword = HasPassword();
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }

        //
        // POST: /Account/Manage
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Manage(ManageUserViewModel model)
        {
            bool hasPassword = HasPassword();
            ViewBag.HasLocalPassword = hasPassword;
            ViewBag.ReturnUrl = Url.Action("Manage");
            if (hasPassword)
            {
                if (ModelState.IsValid)
                {
					
                    IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.ChangePasswordSuccess });
                    }
                    else
                    {
                        AddErrors(result);
                    }
                }
            }
            else
            {
                // User does not have a password so remove any validation errors caused by a missing OldPassword field
                ModelState state = ModelState["OldPassword"];
                if (state != null)
                {
                    state.Errors.Clear();
                }

                if (ModelState.IsValid)
                {
                    IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.SetPasswordSuccess });
                    }
                    else
                    {
                        AddErrors(result);
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


		
        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var user = await UserManager.FindAsync(loginInfo.Login);
            if (user != null)
            {
                await SignInAsync(user, isPersistent: false);
                return RedirectToLocal(returnUrl);
            }
            else
            {
                // If the user does not have an account, then prompt the user to create an account
                ViewBag.ReturnUrl = returnUrl;
                ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { UserName = loginInfo.DefaultUserName });
            }
        }

        //
        // POST: /Account/LinkLogin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LinkLogin(string provider)
        {
            // Request a redirect to the external login provider to link a login for the current user
            return new ChallengeResult(provider, Url.Action("LinkLoginCallback", "Account"), User.Identity.GetUserId());
        }

        //
        // GET: /Account/LinkLoginCallback
        public async Task<ActionResult> LinkLoginCallback()
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync(XsrfKey, User.Identity.GetUserId());
            if (loginInfo == null)
            {
                return RedirectToAction("Manage", new { Message = ManageMessageId.Error });
            }
            var result = await UserManager.AddLoginAsync(User.Identity.GetUserId(), loginInfo.Login);
            if (result.Succeeded)
            {
                return RedirectToAction("Manage");
            }
            return RedirectToAction("Manage", new { Message = ManageMessageId.Error });
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser() { UserName = model.UserName };
                var result =  UserManager.Create(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInAsync(user, isPersistent: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult RemoveAccountList()
        {
            var linkedAccounts = UserManager.GetLogins(User.Identity.GetUserId());
            ViewBag.ShowRemoveButton = HasPassword() || linkedAccounts.Count > 1;
            return (ActionResult)PartialView("_RemoveAccountPartial", linkedAccounts);
        }

        // GET: /Account/Delete/5
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ApplicationUser user = db.Users.Where(u => u.Id == id).FirstOrDefault();
            if (db.Services.Where(v => v.IsDeleted != true && (v.ViewingUserId == user.Id || v.ViewingUser.Id == user.Id)).Count() > 0)
            {
                ModelState.AddModelError("", "This user is used with a service and cannot be deleted.");
                return View(user);
            }
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: /Account/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            ApplicationUser user = db.Users.Where(u => u.Id == id).FirstOrDefault();
			if (db.Services.Where(v => v.IsDeleted != true && (v.ViewingUserId == user.Id || v.ViewingUser.Id == user.Id)).Count() > 0)
            {
                ModelState.AddModelError("", "This user is used with a video and cannot be deleted.");
                return View(user);
            }
            user.Deleted = true;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && UserManager != null)
            {
                UserManager.Dispose();
                UserManager = null;
            }
            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private bool HasPassword()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PasswordHash != null;
            }
            return false;
        }

    

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        private class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties() { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
    public class RoleDictionary
    {
        public string RoleName { get; set; }
        public string RoleId { get; set; }

    }
}