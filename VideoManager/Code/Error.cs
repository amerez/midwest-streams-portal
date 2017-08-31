using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace VideoManager.Code
{
    public class Error
    {
        public static void ReportError(ErrorSeverity severity, string className, string method, string line, string userName = "N/A", int serviceId = 0)
        {
            LogError(severity, className, method, line, userName, serviceId);
        }
        public static void ReportError(ErrorSeverity severity, string description, string className, string method, string line, string userName = "N/A", int serviceId = 0)
        {
            LogError(severity, className, method, line, userName, serviceId, description);
        }
        public static void ReportError(ErrorSeverity severity, Exception e, string className, string method, string line, string userName = "N/A", int serviceId = 0)
        {
            LogError(severity, className, method, line, userName, serviceId, null, e);
        }
        public static void ReportError(ErrorSeverity severity, Exception e, string description, string className, string method, string line, string userName = "N/A", int serviceId = 0)
        {
            LogError(severity, className, method, line, userName, serviceId, description, e);
        }

        private static void LogError(ErrorSeverity severity, string className, string method, string line, string userName, int serviceId, string description = null, Exception e = null)
        {
            string errorMessage = "A " + severity.ToString() + " occured on the MWS Platform. Custom Description:" + description +  " Class: " + className + " Method: " + method + " Line: " + line + " UserName:" + userName + " ServiceId: " + serviceId;
            if (e!=null)
            {
                errorMessage = errorMessage + " Message: " + e.Message + " Inner Exception: " + e.InnerException;
            }
     
            if (severity == ErrorSeverity.Fatal || severity == ErrorSeverity.Severe)
            {
                Email.sendErrorMessage(errorMessage);
            }
            string logFilePath = ConfigurationManager.AppSettings["logFilePath"];
            var sr = new StreamWriter(logFilePath + "MWSError.log", true);
            sr.WriteLine(DateTime.Now.ToString()+" : "+errorMessage);
            sr.Flush();
            sr.Close();

            string devEnviroment = ConfigurationManager.AppSettings["dev"];
            if(devEnviroment !="true")
            {
                string message = "";
                string innerException = "";
                if(e!=null)
                {
                    message = e.Message;
                    if(e.InnerException!=null)
                    {
                        innerException = e.InnerException.ToString().Substring(0, 300);
                    }
                }
                SendErrorToGoogleDoc(severity, className, method, line, description, userName, message, innerException, serviceId.ToString());
            }
            
        }
        public static void SendErrorToGoogleDoc(ErrorSeverity severity, string className, string method, string line, string description, string userName, string message, string innerException, string serviceId = "0")
        {
            var client = new RestClient("https://hooks.zapier.com/hooks/catch/1261564/u6xn4k/");
            var request = new RestRequest(Method.POST);
            request.AddParameter("severity", severity.ToString());
            request.AddParameter("className", className);
            request.AddParameter("method", method);
            request.AddParameter("line", line);
            request.AddParameter("description", description);
            request.AddParameter("userName", userName);
            request.AddParameter("message", message);
            request.AddParameter("innerException", innerException);
            request.AddParameter("serviceId", serviceId);
            
            var response = client.Execute(request);
        }
    }
    public enum ErrorSeverity
    {
        Fatal,
        Severe,
        Warning,
        Info
    }
}