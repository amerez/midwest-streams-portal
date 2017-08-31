using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VideoRenderer
{
    public static class Library
    {
        public static void WriteErrorLog(Exception ex)
        {
           string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];

            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(BatchFilePath +"RenderServiceLog.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + ex.Source.ToString().Trim() + ": " + ex.Message.ToString().Trim());
                sw.Flush();
                sw.Close();
            }
            catch
            {

            }
        }
        public static void WriteErrorLog(string Message)
        {
            string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(BatchFilePath + "RenderServiceLog.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + Message);
                sw.Flush();
                sw.Close();
            }
            catch
            {

            }
        }

        public static void WriteServiceLog(string Message)
        {
            string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(BatchFilePath + "RenderServiceLog.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + Message);
                sw.Flush();
                sw.Close();
            }
            catch
            {

            }
        }
    }
}
