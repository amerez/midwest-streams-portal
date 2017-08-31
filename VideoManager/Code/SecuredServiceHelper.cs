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
                var rndNum = new Random(DateTime.Now.Second);
                var rawPW = System.Web.Security.Membership.GeneratePassword(8, 0);
                rawPW = Regex.Replace(rawPW, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());

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