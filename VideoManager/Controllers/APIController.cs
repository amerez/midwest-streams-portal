using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Controllers
{
    public class APIController : BaseController
    {
        [HttpPost]
        [AllowAnonymous]
        // GET: API
        public ActionResult CreateHome(string funeralHomeName, string email, bool hasCamera, string address1,
            string address2, string city, string state, int zip, string phoneNumber)
        {
            FuneralHome funeralHome = new FuneralHome()
            {
                UserName = funeralHomeName,
                Name = funeralHomeName,
                Email = email,
                Address1 = address1,
                Address2 = address2,
                City = city,
                State = state,
                ZipCode = zip,
                PaymentStatus = PaymentStatus.TrialPeriod,
                OwnerId = 1
            };

            //add to DB
            db.FuneralHomes.Add(funeralHome);
            db.SaveChanges();

            // set username for funeral home
            funeralHome.UserName = funeralHomeName.Replace(" ", "");

            //check too see if the username already exists 
            if (db.Users.Where(u => u.UserName == funeralHome.UserName).Count() > 1)
            {
                //Change User Name to UserName + ID
                funeralHome.UserName = funeralHome.UserName + funeralHome.Id;
            }

            // create a new application user for the funeral home
            ApplicationUser newUser = new ApplicationUser();
            newUser.UserName = funeralHome.UserName;
            newUser.Name = funeralHome.Name;
            newUser.Email = funeralHome.Email;
            var result = UserManager.Create(newUser);

            // upon succesful creation
            if (result.Succeeded)
            {
                // create a user manager for the funeral home
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                var currentUserId = db.Users.Where(u => u.UserName == funeralHome.UserName).FirstOrDefault().Id;

                // assign the funeral home the role of a funeral home
                userManager.AddToRole(currentUserId, "FuneralHome");

                // assign userId to funeral home
                funeralHome.UserId = currentUserId;

                db.FuneralHomes.Add(funeralHome);
                db.SaveChanges();

                Setting settings = new Setting()
                {
                    FuneralHomeId = funeralHome.Id,
                    DisplayTutorial = true,
                };

                funeralHome.Setting = settings;
                //var code = UserManager.GeneratePasswordResetToken(funeralHome.UserId);
                //funeralHome.TempAccessToken = code;
                db.Entry(funeralHome).State = EntityState.Modified;
                db.SaveChanges();

                // add a dummy service
                Service service = new Service
                {
                    ServiceDate = DateTime.Now,
                    FuneralHome = funeralHome,
                    IsSecured = false,
                    Birthday = DateTime.Now,
                    DeathDay = DateTime.Now,
                    FirstName = "Thomas",
                    LastName = "Jefferson"
                };

                db.Entry(service).State = EntityState.Added;
                db.SaveChanges();

                string succeess = "Successful";
                string messageBody = "A New User has signed up for a trial. \n Name: "
                    + funeralHome.Name + "\n UserName: " + funeralHome.UserName + "\n Email: " + funeralHome.Email + "\n HasCamera: " + hasCamera
                    + "\n Phone Number " + phoneNumber + "\n" + funeralHome.Address1 + "\n" + funeralHome.Address2 + "\n" + funeralHome.City
                    + " " + funeralHome.State + ", " + funeralHome.ZipCode;
                string html = "";
                Email.sendMail("admin@midweststreams.com", "shane.p.white@gmail.com", "New User Signed Up For Trial", messageBody, html);
                SendWelcomeEmail(funeralHome.Id);
                return Json(succeess);
            }
            else
            {
                StringBuilder errors = new StringBuilder();
                foreach (var error in result.Errors)
                {
                    errors.Append(error);
                }
                ViewBag.ErrorText = errors.ToString();
                
                return Json(errors);
            }
        }
        /* ------------------ End Create Home ------------------ */

        public void SendWelcomeEmail(int id)
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
        }
    }
}
