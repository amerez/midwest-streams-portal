using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Code
{
    public class FuneralHomeHelper
    {
        protected ApplicationDbContext db = new ApplicationDbContext();
        protected RoleManager<IdentityRole> RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
        protected UserManager<ApplicationUser> UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

      
        public CreateFuneralHomeResponse CreateFuneralHome(FuneralHome fh, string UserName, WebsiteProvider wp, string password=null)
        {
            CreateFuneralHomeResponse cfhr = new CreateFuneralHomeResponse();
            ApplicationUser newUser = new ApplicationUser();
            newUser.UserName = fh.UserName;
            newUser.Name = fh.Name;
            newUser.Email = fh.Email;
            var result = UserManager.Create(newUser);
            if(result.Succeeded)
            {
              
                cfhr.CreateUserSuccess = true;
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                var currentUserId = db.Users.Where(u => u.UserName == fh.UserName).FirstOrDefault().Id;
                userManager.AddToRole(currentUserId, "FuneralHome");
                fh.UserId = currentUserId;
                if (password != null)
                {
                    userManager.AddPassword(currentUserId, password);
                }
                db.FuneralHomes.Add(fh);
                db.SaveChanges();
                Setting settings = new Setting()
                {
                    FuneralHomeId = fh.Id,
                    WebsiteProvider = wp,
                    DisplayTutorial = true,
                    AzureVMSize = "Standard_D4_v2"
                };
                fh.Setting = settings;
                db.Entry(fh).State = EntityState.Modified;
                db.SaveChanges();
                cfhr.CreateFuneralHomeSuccess = true;
                Service service = new Service
                {
                    ServiceDate = DateTime.Now,
                    FuneralHome = fh,
                    IsSecured = false,
                    Birthday = DateTime.Now,
                    DeathDay = DateTime.Now,
                    FirstName = "Thomas",
                    LastName = "Jefferson"
                };
                db.Entry(service).State = EntityState.Added;
                db.SaveChanges();
                cfhr.Success = true;
                cfhr.FuneralHome = fh;
                return cfhr;
            }
            else
            {
                cfhr.CreateUserSuccess = false;
                StringBuilder errors = new StringBuilder();
                foreach (var error in result.Errors)
                {
                    errors.Append(error);
                }
                cfhr.UserErrors = cfhr.UserErrors;
                cfhr.Success = false;
                return cfhr;
            }
           
        }
        
    }
    public class CreateFuneralHomeResponse
    {
        public bool Success { get; set; }
        public bool CreateFuneralHomeSuccess { get; set; }
        public bool CreateUserSuccess { get; set; }
        public string FuneralHomeErrors { get; set; }
        public string UserErrors { get; set; }
        public FuneralHome FuneralHome { get; set; }
    }
}