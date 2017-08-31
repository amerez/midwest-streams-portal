using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using VideoManager.Models.Data;
using VideoManager.Models;
using VideoManager.Code;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.IO;
using DotNetOpenAuth.OAuth.ChannelElements;
using DotNetOpenAuth.OAuth.Messages;
using DotNetOpenAuth.OpenId.Extensions.OAuth;
using DotNetOpenAuth.Messaging;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Mail;
using System.Drawing;
using System.Configuration;
using VideoManager.Models.ViewModels;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace VideoManager.Controllers
{
    // TODO this is the first controller ever written. This code was written before we even had clients. Time to clean a lot of this shit up! 6/18/17
    [Authorize]
    public class VideoController : BaseController
    {

        public ActionResult test()
        {
            /*
            Video v = new Video();
            TimeSpan t = new TimeSpan(0, 0, 0);
            v.Start = t;
            Service service = db.Services.Find(6);
            service.Video = v;
            db.SaveChanges();
            */

            VideoConverter vc = new VideoConverter();
            // vc.CombineVideos(6, "guy.mp4", "bbb.mp4", "0:0:0", "0:1:18", "userName");

            return View("NotFound");
        }



        // GET: /Video/ViewStream/5
        //[Authorize(Roles = "Admin,FuneralHome,Family,Viewing")]
        //public ActionResult ViewStream(int? id)
        //{
        //	if (id == null)
        //	{
        //		return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //	}
        //	Video video = db.Videos.Find(id);
        //	if (video == null)
        //	{
        //		return HttpNotFound();
        //	}
        //	if (User.IsInRole("Family") || User.IsInRole("Viewing"))
        //	{

        //		if ((video.ViewingUser == null || video.ViewingUser.Id != User.Identity.GetUserId()) && (video.FamilyUser == null || video.FamilyUser.Id != User.Identity.GetUserId()))
        //		{
        //			return new HttpStatusCodeResult(HttpStatusCode.NotFound);
        //		}
        //	}
        //	try
        //	{
        //		DirectoryInfo di = new DirectoryInfo(Server.MapPath("/Files/" + id));
        //		FileSystemInfo[] files = di.GetFileSystemInfos();
        //		var orderedFiles = files.OrderBy(f => f.CreationTime);
        //		var imageFile = files.Where(f => f.Extension == ".jpg");
        //		var videoFile = files.Where(f => f.Extension == ".mp4");
        //		if (imageFile != null && imageFile.Count() > 0)
        //			video.ImagePath = "/Files/" + id + "/" + imageFile.FirstOrDefault().Name;
        //		if (videoFile != null && videoFile.Count() > 0)
        //			video.FilePath = "/Files/" + id + "/" + videoFile.FirstOrDefault().Name;
        //		db.Entry(video).State = EntityState.Modified;

        //		db.SaveChanges();

        //	}
        //	catch (Exception e)
        //	{
        //		//not sure what's happening here.
        //	}
        //	return PartialView(video);
        //}

        [Authorize(Roles = "Admin")]
        public ActionResult loadTest(int? id)
        {
            Video video = db.Videos.Find(id);
            return PartialView(video);
        }
        [AllowAnonymous]
        public ActionResult getIframe(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return HttpNotFound();
            }
            try
            {
                DirectoryInfo di = new DirectoryInfo(Server.MapPath("/Files/" + id));
                FileSystemInfo[] files = di.GetFileSystemInfos();
                var orderedFiles = files.OrderBy(f => f.CreationTime);
                var imageFile = files.Where(f => f.Extension == ".jpg");
                var videoFile = files.Where(f => f.Extension == ".mp4");
                if (imageFile != null && imageFile.Count() > 0)
                    video.ImagePath = "/Files/" + id + "/" + imageFile.FirstOrDefault().Name;
                if (videoFile != null && videoFile.Count() > 0)
                    video.FilePath = "/Files/" + id + "/" + videoFile.FirstOrDefault().Name;
                db.Entry(video).State = EntityState.Modified;

                db.SaveChanges();

            }
            catch (Exception e)
            {
                //not sure what's happening here.
            }
            return PartialView(video);
        }
        //Backsup all converted videos to azure
        //Parameter weeks is how many days back the backup will search videos for
        [HttpPost]
        public ActionResult backupVideos(double days)
        {

            //TODO Turn this into backups to AWS

            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            //CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //CloudBlobContainer container = blobClient.GetContainerReference("videos");

            //List<Video> vids = new List<Video>();
            //DateTime BackupStartDate = DateTime.Now.AddDays(-days);
            //vids = db.Videos.Where(v => v.Service.CreateDate > BackupStartDate).ToList();
            //string ConvertedFileArchivePath = ConfigurationManager.AppSettings["convertedArchive"];
            //bool uploadSuccess = true;
            //string uploadedFiles = "";
            //string failedFiles = "";
            //int failedVideos = 0;
            //int uploadedVideos = 0;
            //foreach(Video vid in vids)
            //{
            //    if(vid.ConvertedFilePath!=null)
            //    {
            //        var blob = container.GetBlockBlobReference(vid.ConvertedFilePath);

            //        if (!blob.Exists())
            //        {
            //            try
            //            {
            //                blob.UploadFromFile(ConvertedFileArchivePath + "\\"+vid.ConvertedFilePath);
            //                blob.Properties.ContentType = "application/mp4";
            //                blob.SetProperties();
            //                uploadedFiles = uploadedFiles+"FILE: name: " + vid.ConvertedFilePath + " Service ID: " + vid.ServiceId+" ";
            //                uploadedVideos++;
            //            }
            //            catch(Exception e)
            //            {
            //                uploadSuccess = false;
            //                failedFiles = failedFiles+ "FILE: name: " + vid.ConvertedFilePath + " Service ID: " + vid.ServiceId + " error Message: "+e.Message;
            //                failedVideos++;
            //            }
            //        }
            //    }

            //}
            //string CompletedMessage = "Backup of converted videos to azure completed! Number of videos backed up: "+uploadedVideos+" number of videos that failed: "+failedVideos;
            //if(uploadedVideos>0)
            //{
            //    CompletedMessage = CompletedMessage+" Uplaoded Details: "+uploadedFiles;
            //}
            // if(failedVideos>0)
            //{
            //    CompletedMessage = CompletedMessage+" Failed Details: "+failedFiles;
            //}
            // Email.sendAdminMessage(CompletedMessage, "Backup Up files to Azure completed");
            var result = new ContentResult
            {
                Content = "{\"success\":\"true\"}",
            };
            return result;
        }
        //Pass the old video Id, support for the old site
        [AllowAnonymous]
        public ActionResult iframe(int? id)
        {
            if (id == null)
            {
                return View("NotFound");
            }
            Video video = db.Videos.Where(v => v.OldVideoId == id).FirstOrDefault();
            if (video == null)
            {
                return HttpNotFound();
            }

            int currentPageHits = 0;
            try
            {
                Random rand = new Random();
                if (video.PageHits != null)
                {
                    if (rand.Next(0, 2) == 0)
                    {
                        currentPageHits = video.PageHits + 1;
                    }
                    else
                    {
                        currentPageHits = video.PageHits + 2;
                    }
                }
                else
                {
                    currentPageHits = 1;
                }
                video.PageHits = currentPageHits;

                db.SaveChanges();
            }
            //The above code should always work, but just to be safe
            catch
            {
                return PartialView(video);
            }
            return PartialView(video);
        }


        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        // GET: /Video/Create
        [Authorize(Roles = "FuneralHome, Admin")]
        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Analytics()
        {
            List<Analytic> Analytics = db.Analytics.ToList();
            return View(Analytics);
        }

        // POST: /Video/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> Create([Bind(Include = "Id,VimeoId,Created,ServiceDate,Duration,Start,Stop,FilePath,ConvertedFilePath,Status,FirstName,LastName,Birthday,Deathday,Obituary,FamilyUsername,FamilyEmail,FamilyPassword,ViewingUsername,ViewingPassword,file")]Video video, string FamilyUsername = "", string FamilyEmail = "", string FamilyPassword = "", string ViewingUsername = "", string ViewingPassword = "")
        //{
        //	bool error = false;
        //	bool securityEnabled = false;
        //	bool familyUserExists = false;
        //	bool viewingUserExists = false;
        //	if (!string.IsNullOrEmpty(FamilyEmail))
        //	{
        //		securityEnabled = true;
        //	}

        //	if (securityEnabled == true)
        //	{
        //		//Set username and generate passwords
        //		FamilyUsername = FamilyEmail;

        //		var rndNum = new Random(DateTime.Now.Second);
        //		var rawPW = System.Web.Security.Membership.GeneratePassword(8, 0);
        //		rawPW = Regex.Replace(rawPW, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());
        //		FamilyPassword = rawPW;

        //		rawPW = System.Web.Security.Membership.GeneratePassword(8, 0);
        //		rawPW = Regex.Replace(rawPW, @"[^a-zA-Z0-9]", m => rndNum.Next(0, 10).ToString());

        //		ViewingUsername = "MWS."+FamilyEmail;
        //		ViewingPassword = rawPW;


        //		if (db.Users.Where(u => u.UserName == FamilyUsername).FirstOrDefault() != null)
        //		{
        //			familyUserExists = true;
        //			error = true;
        //			ModelState.AddModelError("FamilyEmail", "This email already has a service associated with it");
        //		}


        //		//Viwing user info
        //		/*if (string.IsNullOrEmpty(ViewingUsername))
        //		{
        //			ModelState.AddModelError("ViewingUsername", "Must have viewing username");
        //			error = true;
        //		}
        //		else if (db.Users.Where(u => u.UserName == ViewingUsername).FirstOrDefault() != null)
        //		{
        //			ModelState.AddModelError("ViewingUsername", "Username Already Exists");
        //			error = true;
        //		}
        //		if (ViewingPassword.Length < 6)
        //		{
        //			ModelState.AddModelError("ViewingPassword", "Password must be at least 6 character");
        //			error = true;
        //		}
        //		if (string.IsNullOrEmpty(ViewingPassword))
        //		{

        //			ModelState.AddModelError("ViewingPassword", "Must have Viewing Password");
        //			error = true;
        //		}
        //		 */
        //		if (db.Users.Where(u => u.UserName == ViewingUsername).FirstOrDefault() != null)
        //		{
        //			viewingUserExists = true;
        //		}

        //	}
        //		if (ModelState.IsValid && error == false)
        //		{
        //			video.Created = DateTime.Now;
        //			if(securityEnabled==true)
        //			{
        //				if (familyUserExists == false)
        //				{
        //					video.FamilyUser = new ApplicationUser();
        //					video.FamilyUser.UserName = FamilyUsername;
        //					video.FamilyUser.Email = FamilyEmail;
        //				}
        //				if (viewingUserExists == false)
        //				{
        //					video.ViewingUser = new ApplicationUser();
        //					video.ViewingUser.UserName = ViewingUsername;
        //				}
        //				//var fUserTest = video.FamilyUser;
        //				//fUserTest.
        //			}

        //			var id = User.Identity.GetUserId();
        //			video.Creator = db.Users.Where(u => u.Id == id).FirstOrDefault();
        //			video = db.Videos.Add(video);
        //			db.SaveChanges();

        //			if(securityEnabled==true)
        //			{
        //				SendFamilyAndViewingUsersCredentials(FamilyUsername, FamilyPassword, ViewingUsername, ViewingPassword,FamilyEmail);
        //			}


        //			//if (file.ContentLength > 0)
        //			//{
        //			//    // extract only the fielname
        //			//    var fileName = Path.GetFileName(file.FileName);
        //			//    // store the file inside ~/App_Data/uploads folder
        //			//    var path = Path.Combine(Server.MapPath("~/server/php/files"), fileName);
        //			//    file.SaveAs(path);
        //			//}

        //			return RedirectToAction("Index");
        //		}


        //	return View(video);
        //}

        private void SendFamilyAndViewingUsersCredentials(string FamilyUsername, string FamilyPassword, string ViewingUsername, string ViewingPassword, string FamilyEmail)
        {
            string familyId = db.Users.Where(u => u.UserName == FamilyUsername).FirstOrDefault().Id;
            string viewingId = db.Users.Where(u => u.UserName == ViewingUsername).FirstOrDefault().Id;

            UserManager.RemovePassword(familyId);
            UserManager.AddPassword(familyId, FamilyPassword);
            UserManager.AddToRole(familyId, "Family");
            UserManager.RemovePassword(viewingId);
            UserManager.AddPassword(viewingId, ViewingPassword);
            UserManager.AddToRole(viewingId, "Viewing");
            var eMailMessageBody = new StringBuilder();
            eMailMessageBody.AppendLine("Welcome to Midweset Streams.  ");
            eMailMessageBody.AppendLine("Your user Name = " + FamilyUsername + "   Password = " + FamilyPassword + "  ");
            eMailMessageBody.AppendLine("Public viewing user name = " + ViewingUsername + " Public viewing password = " +
                                    ViewingPassword);
            // Email.sendMessage(eMailMessageBody.ToString(), "Midwest Streams viewing accounts", FamilyEmail);
            Email.sendMail("webcasting@midweststreams.com", FamilyEmail, "Service Webcast will be available shortly", eMailMessageBody.ToString(), "");
            db.SaveChanges();
        }

        // GET: /Video/Edit/5

        //[Authorize(Roles = "Admin,FuneralHome,Family")]
        //public ActionResult Edit(int? id)
        //{
        //	if (id == null)
        //	{
        //		return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //	}

        //	Video video = db.Videos.Find(id);

        //	if (video == null)
        //	{
        //		return HttpNotFound();
        //	}
        //	if (User.IsInRole("FuneralHome"))
        //	{

        //		if (video.Creator.Id != User.Identity.GetUserId())
        //		{
        //			return new HttpStatusCodeResult(HttpStatusCode.NotFound);
        //		}
        //	}
        //	if (User.IsInRole("Family"))
        //	{

        //		if ((video.ViewingUser == null || video.ViewingUser.Id != User.Identity.GetUserId()) && (video.FamilyUser == null || video.FamilyUser.Id != User.Identity.GetUserId()))
        //		{
        //			return new HttpStatusCodeResult(HttpStatusCode.NotFound);
        //		}
        //	}
        //	return View(video);
        //}

        // POST: /Video/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin,FuneralHome,Family")]
        public ActionResult Edit([Bind(Include = "Id,VimeoId,Created,ServiceDate,Duration,Start,Stop,FilePath,ConvertedFilePath,Status,FirstName,LastName,Birthday,Deathday,Obituary")] Video video)
        {
            if (ModelState.IsValid)
            {
                db.Entry(video).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(video);
        }

        public ActionResult Upload(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return HttpNotFound();
            }
            return View(video);
        }
        [Authorize(Roles="Admin")]
        [HttpPost]
        public ActionResult GenerateThumbnail(int? id, int seconds)
        {
            Video vid = db.Videos.Find(id);
            if(vid!=null)
            {
                VideoConverter vc = new VideoConverter();
               vid.ImagePath = vc.ExtractThumbnail(vid, seconds);
               db.Entry(vid).State = EntityState.Modified;
               db.SaveChanges();
               return Json(new { result = true });
            }
            return Json(new { result = false });
        }
        [Authorize(Roles = "FuneralHome, Admin")]
        public ActionResult Service(int? id)
        {
            if (id == null)
            {
                return View();
            }
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return HttpNotFound();
            }
            return View(video);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Service(Service service)
        {
            if (ModelState.IsValid)
            {
                if (service.Id == 0)
                {
                    //service.
                    //var id = User.Identity.GetUserId();
                    //service.Creator = db.Users.Where(u => u.Id == id).FirstOrDefault();
                    //service = db.Videos.Add(service);
                    //db.SaveChanges();
                }
                else
                {
                    db.Entry(service).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            return View(service);
        }


        [HttpPost]
        public ActionResult ChunkUpload()
        {
            var fileData = new List<ViewDataUploadFilesResult>();

            foreach (string file in Request.Files)
            {
                ChunkUploadHelper.UploadFileChunk(Request, fileData, User.Identity.GetUserName().Replace(" ", ""), null);
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            var result = new ContentResult
            {
                Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
            };
            return result;
        }


        [HttpPost]
        public ActionResult MakeUniqueFileNames(List<string> fileNames)
        {

            var UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
            //var UploadfilePath = ConfigurationManager.AppSettings["rootPath"]+@"\UploadedFiles\";
            //var UploadfilePath = @"C:\Jeff\MWS\trunk\VideoManager\VideoManager\UploadedFiles\";
            var uniqueFileNames = new List<string>();
            foreach (var fileName in fileNames)
            {

                var uniqueName = fileName;
                if (System.IO.File.Exists(UploadfilePath + fileName))
                {
                    var userName = User.Identity.GetUserName().Replace(" ", "");
                    var fileExtension = fileName.Substring(fileName.LastIndexOf("."));
                    uniqueName = fileName.Substring(0, fileName.LastIndexOf(".")) + "_" + userName +
                                 DateTime.Now.ToString("yyyyMMddHHmmssfff") + fileExtension;
                    System.IO.File.Move(UploadfilePath + fileName, UploadfilePath + uniqueName);
                    uniqueFileNames.Add(uniqueName);
                }
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var result = new ContentResult
            {
                Content = "{\"files\":" + serializer.Serialize(uniqueFileNames) + "}",
            };
            return result;
        }



        [HttpPost]
        public ActionResult MakeUniqueFileName(string fileName)
        {

            var UploadfilePath = ConfigurationManager.AppSettings["rootPath"] + @"\UploadedFiles\";
            //var UploadfilePath = @"C:\Jeff\MWS\trunk\VideoManager\VideoManager\UploadedFiles\";

            var uniqueName = fileName;
            if (System.IO.File.Exists(UploadfilePath + fileName))
            {
                var userName = User.Identity.GetUserName().Replace(" ", "");
                var fileExtension = fileName.Substring(fileName.LastIndexOf("."));
                uniqueName = fileName.Substring(0, fileName.LastIndexOf(".")) + "_" + userName + DateTime.Now.ToString("yyyyMMddHHmmssfff") + fileExtension;
                System.IO.File.Move(UploadfilePath + fileName, UploadfilePath + uniqueName);
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var result = new ContentResult
            {
                Content = "{\"files\":" + serializer.Serialize(uniqueName) + "}",
            };
            return result;
        }

        [HttpPost]
        public ActionResult FailFileUploadNames(List<string> fileNames)
        {

            var UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
            var FailedFilePath = ConfigurationManager.AppSettings["failArchive"] + @"\";
            var uniqueFileNames = new List<string>();
            foreach (var fileName in fileNames)
            {

                var uniqueName = fileName;
                if (System.IO.File.Exists(UploadfilePath + User.Identity.GetUserName() + "_" + fileName))
                {
                    var userName = User.Identity.GetUserName().Replace(" ", "");
                    var fileExtension = fileName.Substring(fileName.LastIndexOf("."));
                    uniqueName = fileName.Substring(0, fileName.LastIndexOf(".")) + "_" + userName + "_FAIL_" +
                                 DateTime.Now.ToString("yyyyMMddHHmmssfff") + fileExtension;
                    System.IO.File.Move(UploadfilePath + User.Identity.GetUserName() + "_" + fileName, FailedFilePath + uniqueName);
                    uniqueFileNames.Add(uniqueName);
                }
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var result = new ContentResult
            {
                Content = "{\"files\":" + serializer.Serialize(uniqueFileNames) + "}",
            };
            return result;
        }
        [HttpPost]
        public ActionResult PreventDulicateFiles(List<string> fileNames, string id, bool isResumable)
        {

            var UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
            var DuplicateFilePath = ConfigurationManager.AppSettings["duplicateArchive"] + @"\";
            var uniqueFileNames = new List<string>();
            foreach (var fileName in fileNames)
            {
                string serverFormattedFileName = UploadfilePath + id + "_" + User.Identity.GetUserName() + "_uploading_" + fileName;
                var uniqueName = fileName;
                //Move the file if the file exists, and the user has choosen not to resume the upload
                if (System.IO.File.Exists(serverFormattedFileName) && isResumable == false)
                {
                    var userName = User.Identity.GetUserName().Replace(" ", "");
                    var fileExtension = fileName.Substring(fileName.LastIndexOf("."));
                    uniqueName = fileName.Substring(0, fileName.LastIndexOf(".")) + id + "_" + userName + "_Duplicate_" +
                                 DateTime.Now.ToString("yyyyMMddHHmmssfff") + fileExtension;
                    System.IO.File.Move(serverFormattedFileName, DuplicateFilePath + uniqueName);
                    uniqueFileNames.Add(uniqueName);
                }
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var result = new ContentResult
            {
                Content = "{\"files\":" + serializer.Serialize(uniqueFileNames) + "}",
            };
            return result;
        }
        [HttpPost]
        public ActionResult SetStartPoint(int id, int startPoint, int endPoint, string[] fileurls)
        {
            Service service = db.Services.Find(id);
            if (service != null)
            {
                //Don't allow randoms to set startpoints
                if (Authorize(service))
                {
                    string filenames = "";
                    string firstFileName = "";


                    foreach (string fileurl in fileurls)
                    {
                        if (firstFileName == "")
                        {
                            firstFileName = fileurl.Replace("\"", "").Replace("[", "").Replace("]", "").ToLower();
                            if (firstFileName.IndexOf(",") > 0)
                            {
                                firstFileName = firstFileName.Substring(0, firstFileName.IndexOf(","));
                            }
                        }
                        filenames = filenames + "," + fileurl.Replace("\"", "").Replace("[", "").Replace("]", "");
                    }

                    filenames = filenames.Substring(1);

                    TimeSpan ts = TimeSpan.FromSeconds(startPoint);
                    TimeSpan duration = TimeSpan.FromSeconds(endPoint);
                    if (service.Video == null)
                    {
                        Video vid = new Video();
                        vid.ServiceId = service.Id;
                        vid.Start = ts;
                        vid.Duration = duration;
                        vid.UploadStartTime = DateTime.Now;
                        vid.FilePath = filenames;
                        vid.Status = VideoStatus.UploadStarted;
                        service.Video = vid;
                    }
                    else
                    {
                        service.Video.Start = ts;
                        service.Video.Duration = duration;
                        service.Video.FilePath = filenames;
                        service.Video.Status = VideoStatus.UploadStarted;
                    }

                    db.Entry(service).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            var results = new ContentResult
            {
                Content = "{\"success\":" + "true" + "}",
            };
            return results;
        }

        //If file is 
        public ActionResult ResumeFileUpload(string file, int id)
        {

            var UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
            var DuplicateFilePath = ConfigurationManager.AppSettings["duplicateArchive"] + @"\";
            string userName = User.Identity.GetUserName();
            string fileNameandPath = UploadfilePath + id + "_" + userName + "_uploading_" + file;
            string fileName = "";
            string fileSize = "";
            string lastModified = "";
            string type = "";
            double startPoint = 0;
            double videoDuration = 1;
            List<string> fileNames = new List<string>();

            if (System.IO.File.Exists(fileNameandPath))
            {
                FileInfo serverFile = new FileInfo(fileNameandPath);
                fileName = serverFile.Name;
                fileSize = serverFile.Length.ToString();
                lastModified = serverFile.LastWriteTime.ToShortTimeString();
                type = serverFile.Extension;

                Service serv = db.Services.Find(id);
                if (serv != null)
                {
                    Video vid = serv.Video;
                    if (vid != null)
                    {
                        if (vid.Start != null)
                        {
                            startPoint = TimeSpan.Parse(vid.Start.ToString()).TotalSeconds;
                        }
                        if (vid.Duration != null)
                        {
                            videoDuration = TimeSpan.Parse(vid.Duration.ToString()).TotalSeconds;
                        }
                        if (vid.FilePath != null)
                        {
                            fileNames = vid.FilePath.Split(',').ToList<string>(); ;
                        }
                    }
                }
            }
            else
            {
                var results = new ContentResult
                {
                    Content = "{\"file\":" + "false" + "}",
                };
                return results;
            }

            var draftJson = new
            {
                file =
                new
                {
                    name = fileName,
                    size = fileSize,
                    type = "mp4",
                    url = "/Home/Download/" + fileName,
                    duration = videoDuration,
                    startPoint = startPoint,
                    fileNames = fileNames
                },
            };

            return Json(draftJson, JsonRequestBehavior.AllowGet);
            //var serializer = new JavaScriptSerializer();
            //serializer.MaxJsonLength = Int32.MaxValue;
            ////var result = new ContentResult
            ////{
            ////    //Content = "{\"file\":{lastModified:" +lastModified+ ", name:"+fileName+", size:"+fileSize+",type:"+type+"}}",
            ////    Content = "{\"files\":" + serializer.Serialize(Request.Files["files[]"].FileName) + "}",
            ////    //Content = "{\"file\":" + "true" + "}",
            ////};
            //return Json(new { file = "{name=\"hi\"}", baz = "Blech" });

        }
        [HttpPost]
        public ActionResult chunkTest(int? id)
        {

            if (id != null)
            {
                Service service = db.Services.Find(id);
                Video uploadedVid = new Video();
                if (service != null)
                {
                    if (service.Video == null)
                    {
                        uploadedVid.ServiceId = service.Id;
                        uploadedVid.CreateDate = DateTime.Now;
                        uploadedVid.UploadStartTime = DateTime.Now;
                        uploadedVid.Status = VideoStatus.UploadStarted;
                        try
                        {
                            db.Videos.Add(uploadedVid);
                            db.SaveChanges();
                        }
                        catch
                        {
                            //Most likely if this failed its because a video was created between the null check and the db.savechanges
                        }

                    }

                    var fileData = new List<ViewDataUploadFilesResult>();

                    foreach (string file in Request.Files)
                    {
                        ChunkUploadHelper.UploadFileChunk(Request, fileData, User.Identity.GetUserName().Replace(" ", ""), id.ToString());
                    }

                    var serializer = new JavaScriptSerializer();
                    serializer.MaxJsonLength = Int32.MaxValue;

                    var result = new ContentResult
                    {
                        //Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
                        Content = "{\"files\":" + serializer.Serialize(Request.Files["files[]"].FileName) + "}",
                    };
                    return result;
                }

            }
            var fileDataa = new List<ViewDataUploadFilesResult>();

            foreach (string file in Request.Files)
            {

                ChunkUploadHelper.UploadFileChunk(Request, fileDataa, User.Identity.GetUserName().Replace(" ", ""), null);
            }

            var serializerr = new JavaScriptSerializer();
            serializerr.MaxJsonLength = Int32.MaxValue;

            var resultt = new ContentResult
            {
                //Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
                Content = "{\"files\":" + serializerr.Serialize(Request.Files["files[]"].FileName) + "}",
            };
            return resultt;

        }

        [HttpPost]
        public ActionResult MobileUpload()
        {
            var fileData = new List<ViewDataUploadFilesResult>();
            if (fileData.Count > 1)
            {
                var resultError = new ContentResult
                {
                    //Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
                    Content = "{\"files\":null}",
                };
                return resultError;
            }
            foreach (string file in Request.Files)
            {
                ChunkUploadHelper.UploadFileChunk(Request, fileData, User.Identity.GetUserName().Replace(" ", ""), null);
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            var result = new ContentResult
            {
                //Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
                Content = "{\"files\":" + serializer.Serialize(Request.Files["files[]"].FileName) + "}",
            };
            return result;
        }

        [HttpPost]
        public ActionResult ChunkPDFs()
        {
            var fileData = new List<ViewDataUploadFilesResult>();

            foreach (string file in Request.Files)
            {
                ChunkUploadHelper.UploadPDFFileChunk(Request, fileData);
            }

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            var result = new ContentResult
            {
                //Content = "{\"files\":" + serializer.Serialize(fileData) + "}",
                Content = "{\"files\":" + serializer.Serialize(Request.Files["files[]"].FileName) + "}",
            };
            return result;
        }


        [HttpPost]
        public ActionResult chunkTest1(string fileName, HttpRequestBase request, List<object> statuses)
        {
            if (request.Files.Count != 1) throw new HttpRequestValidationException("Attempt to upload chunked file containing more than one fragment per request");
            var file = request.Files[0];
            var inputStream = file.InputStream;

            var fullName = Path.GetFileName(fileName);

            using (var fs = new FileStream(fullName, FileMode.Append, FileAccess.Write))
            {
                var buffer = new byte[1024];

                var l = inputStream.Read(buffer, 0, 1024);
                while (l > 0)
                {
                    fs.Write(buffer, 0, l);
                    l = inputStream.Read(buffer, 0, 1024);
                }
                fs.Flush();
                fs.Close();
            }
            return new EmptyResult();
        }

        public ActionResult MultiUpload(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return HttpNotFound();
            }
            return View("MultiUpload", video);
        }


        //TODO: Move this into it's own controller
        public ActionResult PDFConverter(int? id)
        {

            return View("PDFConverter");
        }


        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {

            /* if (file.ContentLength > 0)
             {
                 var fileName = Path.GetFileName(file.FileName);
                 var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                 file.SaveAs(path);
             }
             */
            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult StartMobileConversion(int? id, string[] fileurls)
        {
            var UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\";
            foreach (var file in fileurls)
            {
                string fileName = file.Replace("[", "");
                fileName = fileName.Replace("]", "");
                fileName = fileName.Replace("\"", "");
                string oldFilePath = UploadfilePath + User.Identity.GetUserName() + "_" + fileName;
                string newFilePath = UploadfilePath + id.ToString() + "-" + User.Identity.GetUserName() + "-" + fileName;
                System.IO.File.Move(oldFilePath, newFilePath);
            }

            return Json(new { result = "Success" });
        }


        [HttpPost]
        public ActionResult UploadDetailsMulti(int? id, string[] fileurls, int inpoint, int outpoint)
        {
            //Never let this go into production!!! Just here to stop video processing when testing front end
            //return Json(new { result = "bla" });
           
            if (inpoint < 0)
            {
                inpoint = 0;
            }
            if(outpoint <0)
            {
                outpoint = 0;
            }

            string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
            var sr = new StreamWriter(BatchFilePath + "test1.log");
            try
            {
                sr.AutoFlush = true;
                sr.WriteLine("Start");
                sr.WriteLine("Passed params from JS = inpoint = " + inpoint.ToString() + "  outpoint = " + outpoint.ToString());
 

                if (id == null)
                {
                    return new EmptyResult();
                }

                Service service = db.Services.Find(id);
                if (service == null)
                {
                    Error.ReportError(ErrorSeverity.Severe, "Could not find service for uploaded video", "VideoController", "UploadDetailsMulti", User.Identity.GetUserName(), id.ToString());
                    return new EmptyResult();
                }
                Video video = new Video();
                if (service.Video != null)
                {
                    video = service.Video;
                }

                video.Status = VideoStatus.UploadFinished;

                TimeSpan startTime = new TimeSpan(0, 0, inpoint);
                TimeSpan stopTime = new TimeSpan(0, 0, outpoint);

                video.Start = startTime;
                video.Stop = stopTime;
                video.Service = service;

                //set name of converted file from original url
                string convertedFileNameAndPath = "Converted_" + DateTime.Now.Year.ToString().PadLeft(4, '0') +
                                                  DateTime.Now.Month.ToString().PadLeft(2, '0') +
                                                  DateTime.Now.Month.ToString().PadLeft(2, '0') +
                                                  DateTime.Now.Day.ToString().PadLeft(2, '0') +
                                                  DateTime.Now.Hour.ToString().PadLeft(2, '0') +
                                                  DateTime.Now.Second.ToString().PadLeft(2, '0') +
                                                  DateTime.Now.Millisecond.ToString().PadLeft(2, '0') + ".mp4";


                //Turn the files into a comma sepperated array so they can be put back into an array later. 
                string filenames = "";
                string firstFileName = "";


                foreach (string fileurl in fileurls)
                {
                    if (firstFileName == "")
                    {
                        firstFileName = fileurl.Replace("\"", "").Replace("[", "").Replace("]", "").ToLower();
                        if (firstFileName.IndexOf(",") > 0)
                        {
                            firstFileName = firstFileName.Substring(0, firstFileName.IndexOf(","));
                        }
                    }
                    filenames = filenames + ", " + fileurl.Replace("\"", "").Replace("[", "").Replace("]", "") + ", ";
                }

                TimeSpan startPoint = TimeSpan.FromSeconds(inpoint);
                TimeSpan duration = TimeSpan.FromSeconds(outpoint);

                //File name to display to user
                string displayFileName = firstFileName.Substring(service.FuneralHome.UserName.Length + 1);
                string firstFileNameRemoveUpload = firstFileName.Replace("_uploading", "");
                convertedFileNameAndPath = firstFileNameRemoveUpload.Replace(".mp4", "_converted.mp4");
                filenames = filenames.Substring(2);
                filenames = filenames.Substring(0, filenames.Length - 2);
                video.DisplayFileName = displayFileName;
                video.FilePath = filenames;
                video.ConvertedFilePath = convertedFileNameAndPath;
                video.UploadEndTime = DateTime.Now;
                video.Status = VideoStatus.UploadFinished;
                video.Start = startPoint;
                video.Duration = duration;
                video.Stop = duration;


                if (service.Video == null)
                {
                    db.Entry(video).State = EntityState.Added;
                }
                else
                {
                    db.Entry(video).State = EntityState.Modified;
                }
                string[] filesArray = filenames.Split(',');
                double rawFileLength = 0;
                foreach (string file in filesArray)
                {
                    string UploadfilePath = ConfigurationManager.AppSettings["rawArchive"] + @"\" + file;
                    FileInfo rawFile = new FileInfo(UploadfilePath);
                    rawFileLength = rawFile.Length + rawFileLength;
                }
                video.TotalRawFileSize = rawFileLength;
                db.SaveChanges();


                int passedId = id ?? default(int);
                //Create conversion class and begin async conversion
                var videoConverter = new VideoConverter();
                sr.WriteLine(passedId);
                sr.WriteLine(filenames);
                sr.WriteLine(convertedFileNameAndPath);
                //sr.WriteLine("video start time:" + video.Start.ToString());
                //sr.WriteLine("number of seconds after end time: " + video.Stop.ToString());
                sr.WriteLine("video start time:" + startTime.ToString());
                sr.WriteLine("number of seconds after end time: " + stopTime.ToString());
                sr.Close();

                //Local Video Conversion
               // videoConverter.CombineVideos(passedId, filenames, convertedFileNameAndPath, startTime.ToString(),
                 //  stopTime.ToString(), User.Identity.GetUserName().Replace(" ", ""));

                //Azure Video Conversion
                AzureRender.AssigningVideosToQueue(passedId, filenames);

            }
            catch (Exception upEx)
            {
                sr.WriteLine("Error in uploaddetailsmulti!  ");
                sr.WriteLine("error = " + upEx.Message);
                sr.WriteLine("trace = " + upEx.StackTrace);
                sr.Close();

                throw upEx;
            }
            return Json(new { result = "bla" });
        }

        [HttpPost]
        public ActionResult loadtest(string filename)
        {
            vid vi = new vid();
            string fileLoc = @"C:\inetpub\portal\server\php\files\";
            string hardCodedName = filename;
            if (filename == null)
            {
                hardCodedName = "smallest11MB.mp4";
            }

            //Converted File Names shouldnt have the same name, so this is a lazy method of ensuring that
            Random random = new Random();
            int randomNumber = random.Next(0, 1000000);
            string toFilename = "test_" + hardCodedName.Remove(hardCodedName.Length - 3) + randomNumber.ToString() + ".mp4";

            TimeSpan start = TimeSpan.FromSeconds(10);
            TimeSpan end = TimeSpan.FromSeconds(100);
            vi.CropVid(fileLoc + hardCodedName, fileLoc + toFilename, start, end);
            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult sendemail(string emailad, string subject, string emailbod)
        {

            //Email.sendStyledEmbedCode("shane.p.white@gmail.com", "jeff", "jim", "jake", "22");
            Email.sendErrorMessage(emailbod);
            return new EmptyResult();
        }
        [HttpPost]
        public ActionResult sendErrorEmail(string emailbod)
        {
            Email.sendErrorMessage(emailbod);
            return new EmptyResult();
        }
        [Authorize(Roles = "Admin")]
        // GET: /Video/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Video video = db.Videos.Find(id);
            if (video == null)
            {
                return HttpNotFound();
            }
            return View(video);
        }

        // POST: /Video/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Video video = db.Videos.Find(id);

            List<Analytic> analytics = new List<Analytic>();
            analytics = video.Analytics.ToList();
            foreach (var analytic in analytics)
            {
                db.Analytics.Remove(analytic);
            }

            db.Videos.Remove(video);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }

    public static class UniqueNames
    {
        public static String GetTimestamp(this DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }
    }
    public class LogFile
    {
        private string fileName;
        public LogFile()
        {
            fileName = "D:\\errorlog.txt";
        }
        public LogFile(string fileName)
        {
            this.fileName = fileName;
        }
        ////Use LogFile to document the test run results
        /// <summary>
        /// The MyLogFile method is used to document details of each test run.
        /// </summary>
        public void MyLogFile(string strCategory, string strMessage)
        {
            // Store the script names and test results in a output text file.
            using (StreamWriter writer = new StreamWriter(new FileStream(fileName, FileMode.Append)))
            {
                writer.WriteLine("{0}{1}", strCategory, strMessage);
            }
        }
    }

    public class vid
    {
        public class vSetting
        {
            public string ConsumerKey;
            public string ConsumerSecret;
            public string AccessToken;
            public string AccessTokenSecret;
        }
        public vSetting vimeoSettings;
        public InMemoryTokenManager tokenManager;
        DotNetOpenAuth.OAuth.WebConsumer consumer;
        WebClient client;
        MessageReceivingEndpoint getTicketPoint;
        MessageReceivingEndpoint completeTicketPoint;
        MessageReceivingEndpoint putVideoPoint;

        public vid()
        {
            vimeoSettings = new vSetting() { ConsumerKey = "13e7751f29653709d3db32cb64c3214a21669ebe", ConsumerSecret = "7abeffc1e9fd36473121a9b8212e4a865f5cf92d", AccessToken = "be38b3fc36214bddfd5d54cb7f09297b", AccessTokenSecret = "327638ff2ed8034ce99be8adccf78cb168c99739" };
            tokenManager = new InMemoryTokenManager(vimeoSettings.ConsumerKey, vimeoSettings.ConsumerSecret);

            var desc = new DotNetOpenAuth.OAuth.ServiceProviderDescription()
            {
                AccessTokenEndpoint = new DotNetOpenAuth.Messaging.MessageReceivingEndpoint("https://vimeo.com/oauth/access_token", DotNetOpenAuth.Messaging.HttpDeliveryMethods.GetRequest),
                ProtocolVersion = DotNetOpenAuth.OAuth.ProtocolVersion.V10,
                RequestTokenEndpoint = new DotNetOpenAuth.Messaging.MessageReceivingEndpoint("https://vimeo.com/oauth/request_token", DotNetOpenAuth.Messaging.HttpDeliveryMethods.GetRequest | DotNetOpenAuth.Messaging.HttpDeliveryMethods.PostRequest),
                UserAuthorizationEndpoint = new DotNetOpenAuth.Messaging.MessageReceivingEndpoint("https://vimeo.com/oauth/authorize", DotNetOpenAuth.Messaging.HttpDeliveryMethods.GetRequest | DotNetOpenAuth.Messaging.HttpDeliveryMethods.PostRequest),
                TamperProtectionElements = new ITamperProtectionChannelBindingElement[] { new HmacSha1SigningBindingElement() }
            };

            consumer = new DotNetOpenAuth.OAuth.WebConsumer(desc, tokenManager);
            tokenManager.addToken(vimeoSettings.AccessToken, vimeoSettings.AccessTokenSecret);
        }

        public void CropVid(string path, string convertpath, TimeSpan start, TimeSpan end)
        {
            // Start the child process.
            Process p = new Process();
            // Redirect the output stream of the child process.
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.FileName = @"d:\ffmpeg\bin\ffmpeg.exe";
            string textEx = string.Format("-i \"{0}\" -ss {1:hh}:{1:mm}:{1:ss} -t {2:hh}:{2:mm}:{2:ss} -async 1 \"{3}\"", path, start, end - start, convertpath);
            p.StartInfo.Arguments = string.Format("-i \"{0}\" -ss {1:hh}:{1:mm}:{1:ss} -t {2:hh}:{2:mm}:{2:ss} -async 1 \"{3}\"", path, start, end - start, convertpath);
            p.Start();
            // Do not wait for the child process to exit before
            // reading to the end of its redirected stream.
            // p.WaitForExit();
            // Read the output stream first and then wait.
            string output = p.StandardOutput.ReadToEnd();
            p.WaitForExit();
        }

        public string UploadVid(string path)
        {
            getTicketPoint = new MessageReceivingEndpoint("http://vimeo.com/api/rest/v2?method=vimeo.videos.upload.getTicket&format=json", HttpDeliveryMethods.GetRequest);
            var ticketRequest = consumer.PrepareAuthorizedRequest(getTicketPoint, vimeoSettings.AccessToken);
            var ticketResponse = ticketRequest.GetResponse();
            StreamReader ticketResponseStream = new StreamReader(ticketResponse.GetResponseStream());
            Status ticketStat = JsonConvert.DeserializeObject<Status>(ticketResponseStream.ReadToEnd());

            WebClient wc = new WebClient();
            var file = File.ReadAllBytes(path);
            wc.Headers.Add("Content-Type", "video/mp4");

            var res = wc.UploadData(ticketStat.ticket.endpoint, "PUT", file);

            completeTicketPoint = new MessageReceivingEndpoint("http://vimeo.com/api/rest/v2?method=vimeo.videos.upload.complete&filename=" + path + "&ticket_id=" + ticketStat.ticket.id + "&format=json", HttpDeliveryMethods.GetRequest);
            var completeRequest = consumer.PrepareAuthorizedRequest(completeTicketPoint, vimeoSettings.AccessToken);
            var completeResponse = completeRequest.GetResponse();
            StreamReader completeReader = new StreamReader(completeResponse.GetResponseStream());
            CompleteStatus cStat = JsonConvert.DeserializeObject<CompleteStatus>(completeReader.ReadToEnd());
            return cStat.ticket.video_id;
        }


    }

    public class CompleteStatus
    {
        public string generated_id { get; set; }
        public string stat { get; set; }
        public CompleteTicket ticket { get; set; }
    }

    public class CompleteTicket
    {
        public string id { get; set; }
        public string video_id { get; set; }
    }

    public class Status
    {
        public string generated_id { get; set; }
        public string stat { get; set; }
        public Ticket ticket { get; set; }
    }

    public class Ticket
    {
        public string endpoint { get; set; }
        public string endpoint_secure { get; set; }
        public string host { get; set; }
        public string id { get; set; }
        public string max_file_size { get; set; }
    }

    /// <summary>
    /// A token manager that only retains tokens in memory. 
    /// Meant for SHORT TERM USE TOKENS ONLY.
    /// </summary>
    /// <remarks>
    /// A likely application of this class is for "Sign In With Twitter",
    /// where the user only signs in without providing any authorization to access
    /// Twitter APIs except to authenticate, since that access token is only useful once.
    /// </remarks>
    public class InMemoryTokenManager : IConsumerTokenManager, IOpenIdOAuthTokenManager
    {
        public Dictionary<string, string> tokensAndSecrets = new Dictionary<string, string>();

        /// <summary>
        /// Initializes a new instance of the <see cref="InMemoryTokenManager"/> class.
        /// </summary>
        /// <param name="consumerKey">The consumer key.</param>
        /// <param name="consumerSecret">The consumer secret.</param>
        public InMemoryTokenManager(string consumerKey, string consumerSecret)
        {
            if (string.IsNullOrEmpty(consumerKey))
            {
                throw new ArgumentNullException("consumerKey");
            }

            this.ConsumerKey = consumerKey;
            this.ConsumerSecret = consumerSecret;
        }

        public void addToken(string token, string secret)
        {
            this.tokensAndSecrets.Add(token, secret);
        }

        /// <summary>
        /// Gets the consumer key.
        /// </summary>
        /// <value>The consumer key.</value>
        public string ConsumerKey { get; private set; }

        /// <summary>
        /// Gets the consumer secret.
        /// </summary>
        /// <value>The consumer secret.</value>
        public string ConsumerSecret { get; private set; }

        #region ITokenManager Members

        /// <summary>
        /// Gets the Token Secret given a request or access token.
        /// </summary>
        /// <param name="token">The request or access token.</param>
        /// <returns>
        /// The secret associated with the given token.
        /// </returns>
        /// <exception cref="ArgumentException">Thrown if the secret cannot be found for the given token.</exception>
        public string GetTokenSecret(string token)
        {
            return this.tokensAndSecrets[token];
        }

        /// <summary>
        /// Stores a newly generated unauthorized request token, secret, and optional
        /// application-specific parameters for later recall.
        /// </summary>
        /// <param name="request">The request message that resulted in the generation of a new unauthorized request token.</param>
        /// <param name="response">The response message that includes the unauthorized request token.</param>
        /// <exception cref="ArgumentException">Thrown if the consumer key is not registered, or a required parameter was not found in the parameters collection.</exception>
        /// <remarks>
        /// Request tokens stored by this method SHOULD NOT associate any user account with this token.
        /// It usually opens up security holes in your application to do so.  Instead, you associate a user
        /// account with access tokens (not request tokens) in the <see cref="ExpireRequestTokenAndStoreNewAccessToken"/>
        /// method.
        /// </remarks>
        public void StoreNewRequestToken(UnauthorizedTokenRequest request, ITokenSecretContainingMessage response)
        {
            this.tokensAndSecrets[response.Token] = response.TokenSecret;
        }

        /// <summary>
        /// Deletes a request token and its associated secret and stores a new access token and secret.
        /// </summary>
        /// <param name="consumerKey">The Consumer that is exchanging its request token for an access token.</param>
        /// <param name="requestToken">The Consumer's request token that should be deleted/expired.</param>
        /// <param name="accessToken">The new access token that is being issued to the Consumer.</param>
        /// <param name="accessTokenSecret">The secret associated with the newly issued access token.</param>
        /// <remarks>
        /// 	<para>
        /// Any scope of granted privileges associated with the request token from the
        /// original call to <see cref="StoreNewRequestToken"/> should be carried over
        /// to the new Access Token.
        /// </para>
        /// 	<para>
        /// To associate a user account with the new access token,
        /// <see cref="System.Web.HttpContext.User">HttpContext.Current.User</see> may be
        /// useful in an ASP.NET web application within the implementation of this method.
        /// Alternatively you may store the access token here without associating with a user account,
        /// and wait until <see cref="WebConsumer.ProcessUserAuthorization()"/> or
        /// <see cref="DesktopConsumer.ProcessUserAuthorization(string, string)"/> return the access
        /// token to associate the access token with a user account at that point.
        /// </para>
        /// </remarks>
        public void ExpireRequestTokenAndStoreNewAccessToken(string consumerKey, string requestToken, string accessToken, string accessTokenSecret)
        {
            this.tokensAndSecrets.Remove(requestToken);
            this.tokensAndSecrets[accessToken] = accessTokenSecret;
        }

        /// <summary>
        /// Classifies a token as a request token or an access token.
        /// </summary>
        /// <param name="token">The token to classify.</param>
        /// <returns>Request or Access token, or invalid if the token is not recognized.</returns>
        public TokenType GetTokenType(string token)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region IOpenIdOAuthTokenManager Members

        /// <summary>
        /// Stores a new request token obtained over an OpenID request.
        /// </summary>
        /// <param name="consumerKey">The consumer key.</param>
        /// <param name="authorization">The authorization message carrying the request token and authorized access scope.</param>
        /// <remarks>
        /// 	<para>The token secret is the empty string.</para>
        /// 	<para>Tokens stored by this method should be short-lived to mitigate
        /// possible security threats.  Their lifetime should be sufficient for the
        /// relying party to receive the positive authentication assertion and immediately
        /// send a follow-up request for the access token.</para>
        /// </remarks>
        public void StoreOpenIdAuthorizedRequestToken(string consumerKey, AuthorizationApprovedResponse authorization)
        {
            this.tokensAndSecrets[authorization.RequestToken] = string.Empty;
        }

        #endregion
    }


}
