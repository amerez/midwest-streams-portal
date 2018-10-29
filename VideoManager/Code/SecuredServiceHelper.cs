using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Code
{
       
    public class SecuredServiceHelper
    {
        protected UserManager<ApplicationUser> UserManager;
        public void MakeServiceSecure(Service service, ApplicationDbContext db)
        {
            UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            string userName = service.FirstName + service.LastName + service.Id.ToString();
            userName = userName.Replace(" ", "");
            var currentUser = UserManager.FindByName(userName);
            if(service.ViewingUser==null)
            {
                ApplicationUser viewingUser = new ApplicationUser();

                var rawPW = GeneratePassword();
                userName = RemoveSpecialCharacters(userName);
                viewingUser.UserName = userName;
                viewingUser.Name = service.FirstName +"'s Family";
                if(currentUser==null)
                {
                    var result = UserManager.Create(viewingUser, rawPW);
                }
                else
                {
                    viewingUser = currentUser;
                    UserManager.RemovePassword(viewingUser.Id);
                    UserManager.AddPassword(viewingUser.Id, rawPW);
                }
              
                UserManager.AddToRole(viewingUser.Id, "Viewing");
                service.ViewingUserId = viewingUser.Id;
                service.ViewingPassword = rawPW;
                db.Entry(service).State = EntityState.Modified;
                db.SaveChanges();

            }
        }

        public string ChangeServicePassword(Service service, ApplicationDbContext db)
        {
            string password = "";
            if(service.ViewingUser!=null)
            {
                UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
         
                var userId = service.ViewingUserId;
                UserManager.RemovePassword(userId);
                password = GeneratePassword();
                UserManager.AddPassword(userId, password);
                service.ViewingPassword = password;
                db.Entry(service).State = EntityState.Modified;
                db.SaveChanges();
            }
            return password;

        }

        private static string GeneratePassword()
        {
            var rndNum = new Random(DateTime.Now.Second);
            string password = System.Web.Security.Membership.GeneratePassword(6, 0);
            password = Regex.Replace(password, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());
            //Replace hard to read characters
            password = password.Replace("l", "");
            password = password.Replace("I", "J");
            password = password.Replace("1", "4");

            return password;

        }
        public static string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
    }
}