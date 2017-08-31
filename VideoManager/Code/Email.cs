using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using SendGrid.SmtpApi;
using SendGrid;
using System.Net;
using System.Configuration;
using HtmlAgilityPack;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;
using System.IO;
using System.Threading.Tasks;


namespace VideoManager
{
    public class Email
    {
        public string emailMessage { get; set; }
        public string emailSubject { get; set; }

        public string emailAddress { get; set; }
        public static void sendErrorMessage(string errorMessage)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
     * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo("Shane.P.White@gmail.com");
            myMessage.AddTo("0ul3psow@robot.zapier.com");
            myMessage.From = new MailAddress("error@midweststreams.com");
            myMessage.Subject = "An error occured on the MWS platform";
            myMessage.Text = errorMessage;
            myMessage.Html = "";


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
            
        }
        public static void sendLiveStreamingCode(string EmbedCodeHTML)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
     * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo("Shane.P.White@gmail.com");
            myMessage.From = new MailAddress("live@midweststreams.com");
            myMessage.Subject = "Live Embed Code";
            myMessage.Text = "";
            myMessage.Html = EmbedCodeHTML;


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        public static void sendAdminMessage(string adminMessage, string subject="MWS Admin Message")
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
     * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo("Shane.P.White@gmail.com");
            myMessage.From = new MailAddress("admin@midweststreams.com");
            myMessage.Subject = subject;
            myMessage.Text = adminMessage;
            myMessage.Html = "";


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);

        }

        //SMTP Way of sending mail. Currently not used
        public static void sendMessageSMTP(string emailMessage, string subject, string reciepentEmail)
        {
            SmtpClient smtpClient = new SmtpClient("mail.glendenilson.com", 25);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new System.Net.NetworkCredential("webcasting@glendenilson.com", "Midwetp1");

            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = false;
            MailMessage mail = new MailMessage();

            //Setting From , To and CC
            mail.To.Add(new MailAddress(reciepentEmail));
            mail.From = new MailAddress("webcasting@glendenilson.com", "Webcasting");
            mail.Subject = subject;
            mail.Body = emailMessage;

            smtpClient.Send(mail);
        }

        //SendGrid Mail
        public static void sendMail(string fromAddress, string recipients, string subject, string text, string html)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
     * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo(recipients);
            myMessage.From = new MailAddress(fromAddress);
            myMessage.Subject = subject;
            myMessage.Text = text;
            myMessage.Html = html;


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        public static void send15PointsOfContactEmail(string body, bool Goal)
        {
            string template = "a31537a9-e178-42d9-aaa2-2fc5d2342ba1"; //Success template
            if(Goal==false)
                template = "a96ef8a0-eb2a-4c9b-948d-5f140bcc3880";
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
	 * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo("shane.p.white@gmail.com");
            myMessage.AddTo("kylefogarty7@gmail.com");
            myMessage.From = new MailAddress("admin@midweststreams.com");
            myMessage.Subject = "15 Points of Contact Report";
            myMessage.Html = body;
            myMessage.EnableTemplateEngine(template);


            /* SEND THE MESSAGE
			 * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
		public static void sendHtmlMail(string fromAddress, string recipient, string subject, string html)
		{
			string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
			string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
			/* CREATE THE MAIL MESSAGE
	 * ===================================================*/
			var myMessage = new SendGridMessage();
			myMessage.AddTo(recipient);
			myMessage.From = new MailAddress(fromAddress);
			myMessage.Subject = subject;
			myMessage.Html = html;


			/* SEND THE MESSAGE
			 * ===================================================*/
			var credentials = new NetworkCredential(sgUsername, sgPassword);
			// Create a Web transport for sending email.
			var transportWeb = new Web(credentials);

			// Send the email.
			SendAsync(myMessage);
		}
        public static void sendHtmlMail(string fromAddress, List<string> recipients, string subject, string html)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            /* CREATE THE MAIL MESSAGE
     * ===================================================*/
            var myMessage = new SendGridMessage();
            myMessage.AddTo(recipients);
            myMessage.From = new MailAddress(fromAddress);
            myMessage.Subject = subject;
            myMessage.Html = html;


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        public static void sendFamilyNotification(Service service, NotifyViewModel notification)
        {
            
            try
            {
                string serviceUrl = HttpUtility.UrlEncode(notification.ServiceUrl);
                
                string message = HttpUtility.UrlEncode(notification.Message);
                string templatepath = ConfigurationManager.AppSettings["portalPath"] + "/Email/NotifyFamily/" + service.Id + "?message=" + message + "&link=" + serviceUrl;
                
                HtmlDocument page = new HtmlWeb().Load(templatepath);
                
                string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
                string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

                var myMessage = new SendGridMessage();
                myMessage.AddTo(notification.ContactEmail);
                myMessage.From = new MailAddress(notification.FromEmail);
                string subject = "Service now available";
                if (service.FuneralHome != null)
                {
                    subject = "New Message From " + service.FuneralHome.Name;
                }
                myMessage.Subject = subject;
                string html = page.DocumentNode.OuterHtml;
                myMessage.Html = html;
                

                /* SEND THE MESSAGE
                 * ===================================================*/
                var credentials = new NetworkCredential(sgUsername, sgPassword);
                // Create a Web transport for sending email.
                var transportWeb = new Web(credentials);

                // Send the email.
                SendAsync(myMessage); 

            }
            catch(Exception e)
            {
                string LogFilePath = ConfigurationManager.AppSettings["logFilePath"];
                var sr = new StreamWriter(LogFilePath + "familyNotification"+DateTime.Now.ToString()+".log");
                sr.WriteLine("start");
                sr.WriteLine("not sent");
                sr.WriteLine(e.StackTrace);
                sr.WriteLine(e.Message);
                sr.WriteLine(e.InnerException);
                sr.Close();
            }
          
            
           
        }
        public static void sendWelcomeEmail(FuneralHome home)
        {

            string templatepath = ConfigurationManager.AppSettings["portalPath"] + "/Email/WelcomeAboard/" + home.Id + "?authcode=" + home.TempAccessToken;
            HtmlDocument page = new HtmlWeb().Load(templatepath);

            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

            var myMessage = new SendGridMessage();
            myMessage.AddTo(home.Email);
            myMessage.From = new MailAddress("midweststreams@midweststreams.com");
            myMessage.Subject = "Welcome to Midwest Streams";
            string html = page.DocumentNode.OuterHtml;
            myMessage.Html = html;


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        public static void sendFamilyNotificationSecure(Service service)
        {

            if(service.ViewingUser!=null)
            {
                string templatepath = ConfigurationManager.AppSettings["portalPath"] + "/Email/NotifyFamilySecured/" + service.Id + "?username=" + service.ViewingUser.UserName + "&password=" + service.ViewingPassword;
                HtmlDocument page = new HtmlWeb().Load(templatepath);

                string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
                string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

                var myMessage = new SendGridMessage();
                myMessage.AddTo(service.ContactEmail);
                myMessage.From = new MailAddress(service.FuneralHome.Email);
                myMessage.Subject = "New Message From " + service.FuneralHome.Name;
                string html = page.DocumentNode.OuterHtml;
                myMessage.Html = html;


                /* SEND THE MESSAGE
                 * ===================================================*/
                var credentials = new NetworkCredential(sgUsername, sgPassword);
                // Create a Web transport for sending email.
                var transportWeb = new Web(credentials);

                // Send the email.
                SendAsync(myMessage);
            }
    
        }
        public static void sendFamilyNotificationSecure(Service service, string email)
        {

            if(service.ViewingUser!=null)
            {
                string templatepath = ConfigurationManager.AppSettings["portalPath"] + "/Email/NotifyFamilySecured/" + service.Id + "?username=" + service.ViewingUser.UserName + "&password=" + service.ViewingPassword;
                HtmlDocument page = new HtmlWeb().Load(templatepath);

                string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
                string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

                var myMessage = new SendGridMessage();
                myMessage.AddTo(email);
                myMessage.From = new MailAddress(service.FuneralHome.Email);
                myMessage.Subject = "New Message From " + service.FuneralHome.Name;
                string html = page.DocumentNode.OuterHtml;
                myMessage.Html = html;


                /* SEND THE MESSAGE
                 * ===================================================*/
                var credentials = new NetworkCredential(sgUsername, sgPassword);
                // Create a Web transport for sending email.
                var transportWeb = new Web(credentials);

                // Send the email.
                SendAsync(myMessage);
            }
         
        }
        public static void sendFuneralHomeNotificationSecure(Service service)
        {

            if(service.ViewingUser!=null && service.ViewingPassword!=null)
            {
                string templatepath = ConfigurationManager.AppSettings["portalPath"] + "/Email/NotifyFamilySecured/" + service.Id + "?username=" + service.ViewingUser.UserName + "&password=" + service.ViewingPassword;
                HtmlDocument page = new HtmlWeb().Load(templatepath);

                string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
                string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

                var myMessage = new SendGridMessage();
                myMessage.AddTo(service.FuneralHome.Email);
                myMessage.From = new MailAddress("videos@midweststreams.com");
                myMessage.Subject = service.FirstName + " " + service.LastName + "'s service is available";
                string html = page.DocumentNode.OuterHtml;
                myMessage.Html = html;


                /* SEND THE MESSAGE
                 * ===================================================*/
                var credentials = new NetworkCredential(sgUsername, sgPassword);
                // Create a Web transport for sending email.
                var transportWeb = new Web(credentials);

                // Send the email.
                SendAsync(myMessage);
            }
      
        }
        public static void sendEmbedCode(string toAddress, string convertedFileName, string firstName, string lastName, string id)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

            string funeralNetCode = "<iframe src="+System.Configuration.ConfigurationManager.AppSettings["portalPath"] + "/video/iframe/" + id+" scrolling=\"no\" width=\"648\" height=\"400\" frameborder=\"0\"  webkitallowfullscreen mozallowfullscreen allowfullscreen style=\"margin-left:auto; margin-right:auto; display:block;\"> </iframe>";
			string othersCode = System.Configuration.ConfigurationManager.AppSettings["videoCDN"] + "/videos/" + convertedFileName;
            string message = "The service has been succesfully uploaded to our system. Funeral Net Site's copy and paste this code into your system: " + funeralNetCode + "\r\n \r\n If you are using a different provider use this code: " + othersCode;
            var myMessage = new SendGridMessage();
            myMessage.AddTo(toAddress);
            myMessage.From = new MailAddress("videos@midweststreams.com");
            myMessage.Subject = firstName+" "+lastName+" Service Has Uploaded";
            myMessage.Text = message;
            myMessage.Html = "";


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        public static void sendStyledEmbedCode(string toAddress, string firstName, string lastName, string id, string templatePath = null)
        {
         
            if(templatePath==null)
            {
                templatePath = ConfigurationManager.AppSettings["portalPath"] + "/Email/UploadFinished/" + id;
            }

            HtmlDocument page = new HtmlWeb().Load(templatePath);

            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];

            var myMessage = new SendGridMessage();
            myMessage.AddTo(toAddress);
            myMessage.From = new MailAddress("videos@midweststreams.com");
            myMessage.Subject = firstName + " " + lastName + " Service Has Uploaded";
            string html = page.DocumentNode.OuterHtml;
            myMessage.Html = html;


            /* SEND THE MESSAGE
             * ===================================================*/
            var credentials = new NetworkCredential(sgUsername, sgPassword);
            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            SendAsync(myMessage);
        }
        private static async Task SendAsync(SendGridMessage message)
        {
            string sgUsername = ConfigurationManager.AppSettings["sendGridUsername"];
            string sgPassword = ConfigurationManager.AppSettings["sendGridPassword"];
            // Create credentials, specifying your user name and password.
            var credentials = new NetworkCredential(sgUsername, sgPassword);

            // Create a Web transport for sending email.
            var transportWeb = new Web(credentials);

            // Send the email.
            try
            {
                await transportWeb.DeliverAsync(message);
                Console.WriteLine("Sent!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}