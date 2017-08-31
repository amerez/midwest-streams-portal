using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Code
{
    public static class ChunkUploadHelper
    {
        public static string UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
        public static string UploadPDFfilePath = ConfigurationManager.AppSettings["pdfUploadSpot"] + @"\";
        public static string LogFilePath = ConfigurationManager.AppSettings["logFilePath"];

        //public static string UploadfilePath = @"C:\Jeff\MWS\trunk\VideoManager\VideoManager\UploadedFiles\";



        //public static string LogFilePath = @"C:\Jeff\MWS\trunk\VideoManager\VideoManager\UploadedFiles\";

        public static void UploadPDFFileChunk(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses)
        {

            var files = request.Files["files[]"];

            //try
            {

                var requestHeaders = request.Headers;
                //range
                var contentRange = requestHeaders["Content-Range"];
                //fileName
                //var contentDisposition = requestHeaders["Content-Disposition"];
                for (int i = 0; i < request.Files.Count; i++)
                {
                    HttpPostedFileBase file = request.Files[i];
                    if (file != null)
                    {
                        var fileName = files.FileName;
                        //Path.GetFileName(contentDisposition.Replace("attachment; filename=", "").Replace("\"", ""));
                        var fullPath = Path.Combine(UploadPDFfilePath, fileName);

                        if (File.Exists(fullPath))
                        {
                            using (var stream = new FileStream(fullPath, FileMode.Append))
                            {
                                file.InputStream.CopyTo(stream);
                            }
                        }
                        else
                        {
                            file.SaveAs(fullPath);
                        }
                    }

                }
            }
            /*catch (Exception e)
            {
                var srr = new StreamWriter(LogFilePath + "chunckError.log");
                srr.WriteLine("Error = "+e.Message);
                srr.WriteLine("StackTrace = "+ e.StackTrace);
                srr.Close();

            }*/
        }

        public static void UploadFileChunk(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses, string userName, string serviceId)
        {
          
            var files = request.Files["files[]"];
            
            try
            {

                var requestHeaders = request.Headers;
                //range
                var contentRange = requestHeaders["Content-Range"];
                //fileName
                //var contentDisposition = requestHeaders["Content-Disposition"];
                for (int i = 0; i < request.Files.Count; i++)
                {
                    HttpPostedFileBase file = request.Files[i];
                    if (file != null)
                    {
                        
                        //var fileName = userName+"_"+ files.FileName;
                        var fileName = "";
                        if(serviceId!=null)
                        {
                            fileName = serviceId + "_" + userName + "_uploading_" + file.FileName;
                        }
                        else
                        {
                            fileName =  userName + "_" + file.FileName;
                        }
                     
                        fileName = fileName.Replace(" ", "").Replace(",", "");
                            //Path.GetFileName(contentDisposition.Replace("attachment; filename=", "").Replace("\"", ""));
                        var fullPath = Path.Combine(UploadfilePath, fileName);

                        if (File.Exists(fullPath))
                        {
                            using (var stream = new FileStream(fullPath, FileMode.Append))
                            {
                                file.InputStream.CopyTo(stream);
                            }
                        }
                        else
                        {
                            file.SaveAs(fullPath);
                        }
                    }
                    
                }
           
            }
            catch (Exception e)
            {
                var srr = new StreamWriter(LogFilePath + "chunckError.log");
                srr.WriteLine("Error = "+e.Message);
                srr.WriteLine("StackTrace = "+ e.StackTrace);
                srr.Close();
                
            }
           
        }

        public static void UploadLogo(HttpRequestBase request, List<ViewDataUploadFilesResult> statuses, string userName)
        {

            var files = request.Files["files[]"];

            try
            {

                var requestHeaders = request.Headers;
                //range
                var contentRange = requestHeaders["Content-Range"];
                //fileName
                //var contentDisposition = requestHeaders["Content-Disposition"];
                for (int i = 0; i < request.Files.Count; i++)
                {
                    HttpPostedFileBase file = request.Files[i];
                    if (file != null)
                    {

                        //var fileName = userName+"_"+ files.FileName;
                        var fileName = userName + "_" + file.FileName;
                        fileName = fileName.Replace(" ", "").Replace(",", "");
                        //Path.GetFileName(contentDisposition.Replace("attachment; filename=", "").Replace("\"", ""));
                        var fullPath = Path.Combine(UploadfilePath, fileName);

                        if (File.Exists(fullPath))
                        {
                            using (var stream = new FileStream(fullPath, FileMode.Append))
                            {
                                file.InputStream.CopyTo(stream);
                            }
                        }
                        else
                        {
                            file.SaveAs(fullPath);
                        }
                    }

                }
            }
            catch (Exception e)
            {
                var srr = new StreamWriter(LogFilePath + "chunckError.log");
                srr.WriteLine("Error = " + e.Message);
                srr.WriteLine("StackTrace = " + e.StackTrace);
                srr.Close();

            }
        }


    }
}