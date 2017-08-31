using RestSharp;
using Stripe;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VideoManager.Code;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Controllers
{
    public class BillingController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        // GET: Billing
        [HttpPost]

        public ActionResult Activate(string SubscriptionReference, string SubscriptionReferrer, string SubscriptionSourceKey)
        {
            string Params = "Subscription Refrence: "+SubscriptionReference + "<br/> Subscription Referrer: "+SubscriptionReferrer+"</br> Subscription Source Key:"+SubscriptionSourceKey;

            Email.sendMail("Shane@midweststreams.com", "Shane.P.White@gmail.com", "Sassy Debug", null, Params);
            return Json(("Success"));
        }
        public string GetMD5Hash(string input)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider x =
            new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] bs = System.Text.Encoding.UTF8.GetBytes(input);
            bs = x.ComputeHash(bs);
            System.Text.StringBuilder s = new System.Text.StringBuilder();
            foreach (byte b in bs) { s.Append(b.ToString("x2").ToLower()); }
            return s.ToString();
        }
        public ActionResult OrderDownload(int? id)
        {
            Service serv = db.Services.Find(id);
            if(serv!=null)
            {
                OrderDownloadViewModel odvm = new OrderDownloadViewModel()
                          {
                              ServiceId=serv.Id,
                              FirstName = serv.FirstName,
                              LastName = serv.LastName
                          };
                return View(odvm);
            }
          
            return View("NotFound");
        }

        public ActionResult StripeResult(string stripeToken, int? serviceId, string firstName, string lastName, string stripeEmail)
        {
            OrderDownloadViewModel odvm = new OrderDownloadViewModel()
            {
                FirstName = firstName,
                LastName = lastName
            };
            if (serviceId!=null)
            {
                odvm.ServiceId = (int)serviceId;
                var charge = new StripeChargeCreateOptions
                {
                    Amount = 999,
                    Currency = "usd",
                    Description = "Midwest Streams Funeral Download",
                    SourceTokenOrExistingSourceId = stripeToken
                };
                var chargeService = new StripeChargeService();
                var stripeCharge = chargeService.Create(charge);
                if (stripeCharge.Status == "succeeded")
                {
                    Email.sendAdminMessage("An order was succefully placed! Email: " + stripeEmail +" First Name: "+firstName+" Last Name: "+lastName+" ServiceId: "+serviceId, "An order was sucesfully placed!");
                    string downloadCode = ConfigurationManager.AppSettings["portalPath"] + Url.Action("Download", "Services", new { id = serviceId, bought = true, stripeId = stripeCharge.Id});
                   
                   string emailTemplateHtml =  EmailHelper.GetOrderConfirmationEmailHTML(firstName, lastName, downloadCode);
                    Email.sendHtmlMail("orders@midweststreams.com", stripeEmail, "Order Confirmation: Video Download", emailTemplateHtml);
                    odvm.StripeId = stripeCharge.Id;
                    return View("OrderConfirmed", odvm);
                }
                else
                {
                    odvm.Errors = stripeCharge.FailureMessage;
                    Email.sendAdminMessage("An ordered was placed and stripe failed. Error Message:" + stripeCharge.FailureMessage + " Email: " + stripeEmail + " First Name: " + firstName + " Last Name: " + lastName + " ServiceId: " + serviceId, "Download Order Failed:");
                    return View("OrderDownload", odvm);
                }
            }


            odvm.Errors = "Unable to find service Id";
            
            return View("OrderDownload", odvm);
        }
    }
 
}