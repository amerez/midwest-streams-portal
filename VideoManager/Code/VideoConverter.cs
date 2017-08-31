using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using VideoManager.Controllers;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Code
{
    public class VideoConverter
    {
        public string BatchFileName = "combineFiles.bat";
        public string StageBatchFile = "MakeStageFile.Bat";
        public string MovToMp4BatchFile = "MovToMp4.bat";

        public string FfMpegPathAndExecuteable = ConfigurationManager.AppSettings["ffmpeg"];
        public string BatchFilePath =  ConfigurationManager.AppSettings["logFilePath"];
        public string UploadfilePath = ConfigurationManager.AppSettings["rawArchive"];
        public string RawFileArchivePath = ConfigurationManager.AppSettings["rawArchive"];
        public string ConvertedFileArchivePath = ConfigurationManager.AppSettings["convertedArchive"];
        public string tempEditFolder = ConfigurationManager.AppSettings["tempEditFolder"];
        public string ThumbnailPath = ConfigurationManager.AppSettings["videoThumbnailArchive"];
        public string OpenSlateName = "open.mp4"; 
        public int videoCount = 1;

        public string azureDestinationConvertedFileNameAndPath = "";
        public string azureFileURLNameConverted = "";
        //public string FfMpegPathAndExecuteable = @"C:\Jeff\FFMpeg\bin\ffmpeg.exe";
        //public string BatchFilePath = @"C:\Jeff\FFMpeg\bin\";
        //public string UploadfilePath = @"C:\Jeff\MWS\trunk\VideoManager\VideoManager\UploadedFiles\";
        //public string ConvertedFileArchivePath = @"C:\Jeff\VideoArchive\Converted";
        //public string RawFileArchivePath = @"C:\Jeff\VideoArchive\Raw";

        //public string UploadfilePath = @"C:\inetpub\portal\server\php\files\"; //Old PHP

        public void uploadVideosToAzureBlob(int id, string fileNames)
        {
            var videoFiles = fileNames.Split(',');
            foreach(var video in videoFiles)
            {
                try
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("videos-in-queue");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(UploadfilePath +"\\"+video);
                    blockBlob.UploadFromFile(azureDestinationConvertedFileNameAndPath);
                    blockBlob.Properties.ContentType = "application/mp4";
                    blockBlob.SetProperties();
                }
                catch (Exception e)
                {
                    //Email.sendErrorMessage("Upload To Azure Failed " + userName + "Service Id: " + id.ToString() + " Error: " + e.Message);
                }
            }
            
        }

        public string ExtractThumbnail(Video vid, int seconds = 1)
        {
            if(vid.ConvertedFilePath!=null)
            {
                string thumbnailName = vid.ConvertedFilePath.Substring(0, vid.ConvertedFilePath.Length - 4)+"_thumb.png";
                string videoPath = ConvertedFileArchivePath + "\\" + vid.ConvertedFilePath;
                string thumbnailPathAndName = ThumbnailPath + "\\" + thumbnailName;
                bool success = false;
                if(File.Exists(thumbnailPathAndName))
                {
                    File.Delete(thumbnailPathAndName);
                }
                TimeSpan ts = TimeSpan.FromSeconds(seconds);
                string thumbnailTime = ts.ToString(@"hh\:mm\:ss");
                var p = new Process
                {
                    StartInfo =
                    {
                        //UseShellExecute = true,
                        //RedirectStandardOutput = true,
                        FileName = BatchFilePath + "GetVideoThumbnail.bat",
                        Arguments =
                            string.Format("{0} {1} {2} {3}", FfMpegPathAndExecuteable, videoPath, thumbnailPathAndName, thumbnailTime)
                    }
                };
                p.Start();
                p.WaitForExit();
                if (p.ExitCode == 0)
                {
                    success = true;
                }
                try
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("video-thumbnails");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(thumbnailName);
                    blockBlob.UploadFromFile(thumbnailPathAndName);
                    blockBlob.Properties.ContentType = "application/png";
                    blockBlob.SetProperties();
                }
                catch (Exception e)
                {
                   
                }
             
                return thumbnailName;
            }
            return "";
        }

        public async Task<bool> CombineVideos(int id, string fileNames, string combinedFileNameAndPathNoUser, string startTime, string endTime, string userName)
        {
  
            //string combinedFileNameAndPath = id.ToString()+"_"+ userName +"_"+ combinedFileNameAndPathNoUser;
            string combinedFileNameAndPath = combinedFileNameAndPathNoUser;
            combinedFileNameAndPath = UploadfilePath + "\\" + combinedFileNameAndPath;
            var sr = new StreamWriter(BatchFilePath + "testAsync.log");
            sr.WriteLine("before call combined filenamepath= "+ combinedFileNameAndPath);
            sr.WriteLine("Current Time: " + DateTime.Now);
            sr.Close();
            
            await Task.Run(() => CombineVideosTask(id,fileNames, combinedFileNameAndPath, startTime, endTime, userName));
            return true;
        }

        public bool CombineVideosTask(int id, string fileNames, string combinedFileNameAndPath, string startTime, string endTime, string userName)
        {
           
            CreateSemiforeFile();


            var sr = new StreamWriter(BatchFilePath + "testAsync2.log");
            sr.AutoFlush = true;
            sr.WriteLine("in task fileNames = " + fileNames);
            sr.WriteLine("combinedfilename and path = " + combinedFileNameAndPath);
            sr.WriteLine("id = " + id.ToString());
            sr.WriteLine("starttime = " + startTime + "   Endtime = " + endTime);
            
                //creating local context to avoid threading issues
                var dbContext = new ApplicationDbContext();
                sr.WriteLine("new context");
            var video = dbContext.Videos.Find(id);
                try
                {
                    
                    if (video.UploadEndTime != null)
                    {
                        TimeSpan inQue = DateTime.Now - video.UploadEndTime.Value;
                        TimeSpan zeroTime = new TimeSpan(1);
                       //Getting negative time errors. This should solve that
                        if(inQue < zeroTime)
                        {
                            inQue = zeroTime;
                        }
                        video.TimeInQue = inQue;
                    }
                   
                    video.Status = VideoStatus.ConversionStarted;
                    dbContext.Entry(video).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
                catch(Exception e)
                {
                    Email.sendErrorMessage("LINE 88 DEBUG: Service: "+id.ToString() +" Most likely video is processing but here is the error cuaght while measuring the performance:  " + e.InnerException);
                }
           

                var videoFiles = fileNames.Split(',');
                var stageFiles = new StringBuilder();
                var success = false;
                var destinationFileNamePath = "";
            try
            {
                
                foreach (var partialVideoNoPathNoUser in videoFiles)
                {
                
                    if (partialVideoNoPathNoUser.Trim() != "")
                    {
                        File.Move(UploadfilePath +"\\"+ partialVideoNoPathNoUser.Trim(), tempEditFolder +"\\"+id.ToString()+"_"+ partialVideoNoPathNoUser.Trim());
                        var partialVideoNoPath = id.ToString() + "_" + partialVideoNoPathNoUser.Trim();
                        var partialVideo = tempEditFolder +"\\"+ partialVideoNoPath.Trim();
                        sr.WriteLine("stagefile params, filename = " + partialVideo + "   StageBatchFile = " +
                                    StageBatchFile);
                        var stageFile = CreateStageVideo(partialVideo, StageBatchFile, id.ToString(), userName);
                        if (stageFile != "ERROR")
                        {
                            stageFiles.Append(stageFile + "+");
                        }
                        else
                        {
                            sr.WriteLine("Error making stage file!");
                        }
                        //var timeStamp = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                        // destinationFileNamePath = tempEditFolder+"\\"+ partialVideoNoPath.Trim().ToLower().Replace(".mp4",timeStamp+".mp4");
                        //File.Move(tempEditFolder + "\\" + partialVideoNoPath.Trim(), destinationFileNamePath);
                    }
                }
                if (stageFiles.Length > 0)
                {
                    var stageFilesParameterForBatch = stageFiles.ToString()
                        .Substring(0, stageFiles.ToString().Length - 1);

                    sr.WriteLine("stagefileparams for batch = " + stageFilesParameterForBatch);
                    sr.WriteLine("batchfile name = " + BatchFilePath + BatchFileName);
                    sr.WriteLine("ffmpeg =" + FfMpegPathAndExecuteable);
                    sr.WriteLine("starttime = " + startTime + "  endtime = " + endTime);
                  
                    var p = new Process
                    {
                        StartInfo =
                        {
                            //UseShellExecute = true,
                            //RedirectStandardOutput = true,
                            FileName = BatchFilePath + BatchFileName,
                            Arguments =
                                string.Format("{0} {1} {2} {3} {4}", stageFilesParameterForBatch,
                                    combinedFileNameAndPath, FfMpegPathAndExecuteable, startTime, endTime)
                        }
                    };
                    p.Start();
                    p.WaitForExit();
                    if (p.ExitCode == 0)
                    {
                        success = true;
                    }
                    DeleteStageFiles(stageFilesParameterForBatch);
                }
                var fileURLNameConverted = "";
                var destinationConvertedFileNameAndPath = "";
                if (success)
                {
            
                    video.Status = VideoStatus.ConversionFinished;
                    //calculate time processing
                    if(video.TimeInQue!=null && video.UploadEndTime!=null)
                    {
                        DateTime UploadEndTime = video.UploadEndTime.Value;
                        TimeSpan timeInQue = video.TimeInQue.Value;
                        DateTime ConversionStartTime = UploadEndTime.Add(timeInQue);
                        DateTime ConversionEndTime = DateTime.Now;
                        if(ConversionEndTime>ConversionStartTime)
                        {
                            TimeSpan ptime = ConversionEndTime.Subtract(ConversionStartTime);
                            video.TimeEncoding = ptime;
                        }
                    }
                    
                    
                   
                    fileURLNameConverted = combinedFileNameAndPath.Substring(combinedFileNameAndPath.LastIndexOf("\\")+1);
                    video.ConvertedFilePath = fileURLNameConverted;
                    azureFileURLNameConverted = fileURLNameConverted;
                    // next 4 lines will move the combined file to different folder 
                    var combinedFileNameNoPath = combinedFileNameAndPath.Replace(UploadfilePath, "");
                     destinationConvertedFileNameAndPath = ConvertedFileArchivePath +combinedFileNameNoPath;
                 
                    //MOV support
                     if (destinationConvertedFileNameAndPath.Substring(destinationConvertedFileNameAndPath.Length - 3) == "mov" || destinationConvertedFileNameAndPath.Substring(destinationConvertedFileNameAndPath.Length - 3) == "MOV")
                     {
                    
                         string finalName = destinationConvertedFileNameAndPath.Substring(0, destinationConvertedFileNameAndPath.Length - 4) + "_converted.mp4";
                         var proc = new Process
                         {
                             StartInfo =
                             {
                                 FileName = BatchFilePath + BatchFileName,
                                 Arguments =
                                     string.Format("{0} {1} {2}", FfMpegPathAndExecuteable, destinationConvertedFileNameAndPath, finalName)
                             }
                         };

                         proc.Start();
                         proc.WaitForExit();
                         if (proc.ExitCode == 0)
                         {
                             success = true;
                         }
                         destinationConvertedFileNameAndPath = finalName;
                     }
                    File.Move(combinedFileNameAndPath, destinationConvertedFileNameAndPath);
                    //if (video.UploadEndTime != null && video.TimeInQue != null)
                    //{
                    //    DateTime uploadEndTime = video.UploadEndTime.Value;
                    //    uploadEndTime.Add(video.TimeInQue.Value);
                    //    TimeSpan processing = DateTime.Now - uploadEndTime;

                    //}
                    //if (video.UploadStartTime != null)
                    //{
                    //    TimeSpan UploadToEmbedCodeTime = DateTime.Now - video.UploadStartTime.Value;
                    //    video.TotalProcessTime = UploadToEmbedCodeTime;

                    //}

                    //Get thumbnail from video and upload it to Azure
                   video.ImagePath = ExtractThumbnail(video);

                    FileInfo convertedFileInfo = new FileInfo(destinationConvertedFileNameAndPath);
                    video.ConvertedFileSize = convertedFileInfo.Length;
                    azureDestinationConvertedFileNameAndPath = destinationConvertedFileNameAndPath;
                    int slashPos = destinationConvertedFileNameAndPath.LastIndexOf("\\") + 1;
                    var noPathVideoFile = destinationConvertedFileNameAndPath.Substring(slashPos, destinationConvertedFileNameAndPath.Length - slashPos);
                    video.ConvertedFilePath = noPathVideoFile;
                    dbContext.Entry(video).State = EntityState.Modified;
                    dbContext.SaveChanges();
                    if(video.Service.IsSecured==true)
                    {
                        if(video.Service.ViewingPassword==null)
                        {
                            SecuredServiceHelper service = new SecuredServiceHelper();
                            service.MakeServiceSecure(video.Service, dbContext);
                        }
                        
                        Email.sendFuneralHomeNotificationSecure(video.Service);
                     
                    }
                    else
                    {
                        Email.sendStyledEmbedCode(video.Service.FuneralHome.Email, video.Service.FirstName, video.Service.LastName, video.Service.Id.ToString());
                    }
                    
                }
                
                ReleaseSemiforeFile();

                sr.WriteLine("End of Conversion Time: " + DateTime.Now);
                sr.Close();
            
            }
            catch (Exception e)
            {
                ReleaseSemiforeFile();
                video.Status = VideoStatus.Error;
                dbContext.Entry(video).State = EntityState.Modified;
                dbContext.SaveChanges();
                var logFile =
                    new LogFile(BatchFilePath + "log" + DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() +
                                DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() +
                                DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() +userName+ ".txt");
                logFile.MyLogFile("video conversion error:", e.Message);
                sr.Close();
                Email.sendErrorMessage("Video Conversion Error for " + userName + "Service Id: "+id.ToString()+" Error: " + e.Message);
                
            
            }
       
            if (azureDestinationConvertedFileNameAndPath.Length > 1)
            {
                try
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("videos");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(azureFileURLNameConverted);
                    blockBlob.UploadFromFile(azureDestinationConvertedFileNameAndPath);
                    blockBlob.Properties.ContentType = "video/mp4";
                    blockBlob.SetProperties();
                }
                catch(Exception e)
                {
                    Email.sendErrorMessage("Upload To Azure Failed " + userName + "Service Id: " + id.ToString() + " Error: " + e.Message);
                }
               
            }
       
            return success;
        }


        public void DeleteStageFiles(string stageFileParamaters)
        {
            var stageFilesToCleanup = stageFileParamaters.Split('+');
            foreach (var cleanUpFile in stageFilesToCleanup)
            {
                File.Delete(cleanUpFile);
            }
        }

        public string CreateStageVideo(string fileName, string stageBatchFileName, string id, string username)
        {
            //Compression Code Still in Progress
            //var outputPath = fileName.Substring(fileName.Length-4) + "_compressed.mp4";
            //var p = new Process
            //{
            //    StartInfo =
            //    {
            //        //UseShellExecute = false,
            //        //RedirectStandardOutput = true,
            //        FileName = BatchFilePath + "Compress.bat",
            //        Arguments = string.Format("{0} {1} {2} {3}", fileName, outputPath, FfMpegPathAndExecuteable)

            //    }
            //};
            //p.Start();
            //p.WaitForExit();
            //if (p.ExitCode != 0)
            //{
            //    outputPath = "ERROR";
            //}


            //Make Staging file
            var stageFileName = fileName + "i.mpg";
            var p = new Process
            {
                StartInfo =
                {
                    //UseShellExecute = false,
                    //RedirectStandardOutput = true,
                    FileName = BatchFilePath + stageBatchFileName,
                    Arguments = string.Format("{0} {1}", fileName, FfMpegPathAndExecuteable)

                }
            };
            p.Start();
            p.WaitForExit();
            if (p.ExitCode != 0)
            {
                stageFileName = "ERROR";
            }
            File.Move(fileName, RawFileArchivePath+"\\"+id+"-"+username+"-"+videoCount+".mp4");
            videoCount++;
            return stageFileName;
        }

        private void CreateSemiforeFile()
        {

            //Check for semifore file if it exists wait
            while (File.Exists(BatchFilePath+"Converting.SEM"))
            {
                //Sleep for one minute and check again
                //Thread.Sleep(60000);
                Thread.Sleep(12000);
            }
        
            var semFile = new StreamWriter(BatchFilePath + "Converting.SEM");
            semFile.Close();
          
        }

        private void ReleaseSemiforeFile()
        {
            try
            {
                if (File.Exists(BatchFilePath + "Converting.SEM"))
                {
                    File.Delete(BatchFilePath + "Converting.SEM");
                }
            }
            catch (Exception e)
            {
                Email.sendErrorMessage("Error deleting semifor file! Error: " + e.Message);
            }
        }


    }


}