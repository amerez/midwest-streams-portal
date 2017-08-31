using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VideoManager.Code;

namespace VideoRenderer
{
    class RenderErrors
    {
        public static void ReportError(ErrorSeverity severity, string className, string method, string line, int serviceId, string userName = "N/A")
        {
            LogError(severity, className, method, line, userName, serviceId);
        }
        public static void ReportError(ErrorSeverity severity, string description, string className, string method, string line, int serviceId, string userName = "N/A")
        {
            LogError(severity, className, method, line, userName, serviceId, description);
        }
        public static void ReportError(ErrorSeverity severity, Exception e, string className, string method, string line, int serviceId, string userName = "N/A")
        {
            LogError(severity, className, method, line, userName, serviceId, null, e);
        }
        public static void ReportError(ErrorSeverity severity, Exception e, string description, string className, string method, string line, int serviceId, string userName = "N/A")
        {
            LogError(severity, className, method, line, userName, serviceId, description, e);
        }
        

        private static void LogError(ErrorSeverity severity, string className, string method, string line, string userName, int serviceId, string description = null, Exception e = null)
        {
            if (e == null)
            {
                e = new Exception();
            }

            string errorMessage = "A " + severity.ToString() + " occured on the MWS Platform. Custom Description:" + description + " Message: " + e.Message + " Inner Exception: " + e.InnerException + " Class: " + className + " Method: " + method + " Line: " + line + " Service Id: "+serviceId.ToString()+" UserName:" + userName;
            string logFilePath = ConfigurationManager.AppSettings["logFilePath"];
            var sr = new StreamWriter(logFilePath + "MWSError.log", true);
            sr.WriteLine(DateTime.Now.ToString() + " : " + errorMessage);
            sr.Flush();
            sr.Close();
            string devEnviroment = ConfigurationManager.AppSettings["dev"];
            if (devEnviroment == "true")
            {
                SendErrorToServer(severity, className, method, line, description, e, userName, serviceId);
            }
        }
        private static void SendErrorToServer(ErrorSeverity severity, string className, string method, string line, string description, Exception e, string userName, int serviceId)
        {

            var client = new RestClient("");
            var request = new RestRequest(Method.POST);
            request.AddParameter("severity", severity.ToString());
            request.AddParameter("className", className);
            request.AddParameter("method", method);
            request.AddParameter("line", line);
            request.AddParameter("description", description);
            request.AddParameter("userName", userName);
            request.AddParameter("serviceId", serviceId);
            if (e != null)
            {
                if(e.Message!=null)
                {
                    request.AddParameter("message", e.Message);
                }
                else
                {
                    request.AddParameter("message", "null");

                }
                if (e.InnerException != null)
                {
                    request.AddParameter("innerException", e.InnerException.ToString().Substring(0, 300));
                }
                else
                {
                    request.AddParameter("innerException", "null");
                }
            }
            else
            {
                request.AddParameter("message", "null");
                request.AddParameter("innerException", "null");
            }
            var response = client.Execute(request);
        }
    }
}
