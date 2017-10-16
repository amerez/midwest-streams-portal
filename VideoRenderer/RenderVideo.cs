using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VideoManager.Code;
using VideoManager.Models.ViewModels;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.Data;

namespace VideoRenderer
{
    class RenderVideo
    {

        DataAccess da = new DataAccess();
        RenderViewModel _renderParameters = new RenderViewModel();

        int _videoQid = 0;
        string[] _videoFiles = null;
        bool _isAzureVm = false;
        public string AzureStorageAccount = ConfigurationManager.AppSettings["StorageConnectionString"];
        public string RawFileArchivePath = ConfigurationManager.AppSettings["rawArchive"];
        public string TempEditFolder = ConfigurationManager.AppSettings["tempEditFolder"];
        public string ConvertedFolder = ConfigurationManager.AppSettings["convertedArchive"];
        public string ThumbnailFolder = ConfigurationManager.AppSettings["videoThumbnailArchive"];
        public string BatchFilePath = ConfigurationManager.AppSettings["logFilePath"];
        public string FfMpegPathAndExecuteable = ConfigurationManager.AppSettings["ffmpeg"];
      


        public RenderVideo(RenderViewModel RenderParameters)
        {
            _renderParameters = RenderParameters;
            _videoQid = _renderParameters.VideoQueId;
            _videoFiles = _renderParameters.RawFileNames.Split(',');
            if (ConfigurationManager.AppSettings["IsAzureVM"] != "false")
                _isAzureVm = true;
         }
        public async void StartRender(bool includeSlate)
        {
            //TODO
            //Implement all of the azure vm stuff.

            InitiateRenderProcess();
            var success = await DownloadVideosFromBlob();
            if (success == false)
                return;

            //If there is multiple video files we need to concatenate the video files
            string concatenatedVideoFile = _videoFiles[0];
            if (_videoFiles.Count() > 1)
            {
                concatenatedVideoFile = ConcatenateVideoFiles(_videoFiles.ToList(), true);
                if (concatenatedVideoFile == "false")
                    return;
            }
            else
            {
                if (!MoveFileFromRawFolderToTempEdit(_videoFiles[0]))
                    return;
            }

            //Trim The Video
            string trimVideodName = TrimVideo(concatenatedVideoFile);

            //Compress the video
            string compressedFileName = CompressVideo(trimVideodName);


            if(includeSlate==true)
            {
                //Create opening slate
                CreateSlideShow(_renderParameters.FirstName, _renderParameters.LastName, _renderParameters.ServiceDate, _renderParameters.FuneralHomeName, "opener.mp4");

                //Merge slideshow and service
                List<string> openerAndService = new List<string>();
                openerAndService.Add("opener.mp4");
                openerAndService.Add(compressedFileName);
                compressedFileName = ConcatenateVideoFiles(openerAndService, false);
            }
         

            ////Move the file to Converted folder
            if (!MoveFinishedVideoFromTempToConvertedFolder(compressedFileName, _renderParameters.ConvertedFileName))
                return;

            //Extract Thumbnail
            //When implementing slideshow increase this to 23 so the pic isn't a pic of the slideshow
            string thumbnailName = ExtractThumbnail(_renderParameters.ConvertedFileName, 3);

            //Upload Thumbnail to Azure
            UploadThumbnailToAzure(thumbnailName);

            //Upload Converted Video to Azure
            if (!UploadConvertedVideoToAzure(_renderParameters.ConvertedFileName))
                return;

            //Update Q Status
            da.DeleteVideoQue(_renderParameters.VideoQueId);
            da.UpdateVideoStatus(_renderParameters.ServiceId, VideoStatus.ConversionFinished);

            //Send Notification Email to Funeral Home
            da.NotifyFuneralHome(_renderParameters.ServiceId);

            //Delete files from video-que container
            DeleteVideoFilesFromQue();

            if (_isAzureVm)
            {
                DeleteRenderMachine();
            }
            else
            {
                //Delete temp video files. And set rendering var to false
                CleanUpRenderEnviroment();
            }
                

        }

        private void DeleteRenderMachine()
        {
            ManageResourceGroup.DeleteResourceGroupAsync(_renderParameters.ResourceGroupName);
        }

        private string ConcatenateVideoFiles(List<string> videoFiles, bool filesLocatedInRawDirectory)
        {
            Library.WriteServiceLog("Creating Temp Files");
            List<string> tempFiles = new List<string>();
            foreach(var video in videoFiles)
            {
                string tempFileName = TempEditFolder +"\\"+ video.Substring(0, video.Length-4)+"_temp.ts";
                tempFiles.Add(tempFileName);
                string fileName = RawFileArchivePath + "\\" + video;
                if(filesLocatedInRawDirectory!=true)
                {
                    fileName = TempEditFolder + "\\" + video;
                }
                string argumentsString = FfMpegPathAndExecuteable + " " + fileName + " " + tempFileName;
                var p = new Process
                {
                    StartInfo =
                    {
                        FileName = BatchFilePath + "CreateTempConcatFile.bat",
                        Arguments = argumentsString
                    }
                };
                p.Start();
                p.WaitForExit();
                if (p.ExitCode != 0)
                {
                    Library.WriteServiceLog("FAILED TO CREATE TEMP FILE.");
                    string errorDescription = "Batch file 'CreateTempConcatFile' failed. Temp Name: " + tempFileName + " Video File Name: " + video;
                    Library.WriteServiceLog(errorDescription);
                    Error.ReportError(ErrorSeverity.Severe, errorDescription, "RenderVideo", "ConcateVideoFiles", "73", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                }
                else
                {
                    Library.WriteServiceLog("Succesfully Created Temp File: " + tempFileName);
                }
            }
            //Batch files require files to be in a pipedelimited string
            string pipeDelimitedTempFiles = "";
            foreach (var tempString in tempFiles)
            {
                pipeDelimitedTempFiles = pipeDelimitedTempFiles + tempString+"|";
            }
            //remove the last pipe
            pipeDelimitedTempFiles = pipeDelimitedTempFiles.Substring(0, pipeDelimitedTempFiles.Length - 1);

            string concatVideoFileName = videoFiles[0].Substring(0, videoFiles[0].Length-4) + "_concat.mp4";
            
            string argumentString = FfMpegPathAndExecuteable + " " + "\""+ pipeDelimitedTempFiles + "\"" + " " + TempEditFolder+"\\"+ concatVideoFileName;

            //string argumentString = "argument1 \""+ pipeDelimitedTempFiles+"\" "+ TempEditFolder + "\\" + concatVideoFileName;
            Library.WriteServiceLog("Beggining to Concatenate Videos");
            var proc = new Process
            {
                StartInfo =
                    {
                        FileName = BatchFilePath + "ConcatVideos.bat",
                        Arguments = argumentString
                    }
            };
            proc.Start();
            proc.WaitForExit();
            if (proc.ExitCode == 0)
            {
                Library.WriteServiceLog("Succesfully Concatenated Videos");
                return concatVideoFileName;
            }
            else
            {
                Library.WriteServiceLog("FAILED CONCATENATING VIDEOS");
                string errorDescription = "Batch file 'ConcatVideos.bat' failed. Argument String: " + argumentString;
                Library.WriteServiceLog(errorDescription);
                HandleErrors();
                Error.ReportError(ErrorSeverity.Severe, errorDescription, "RenderVideo", "ConcateVideoFiles", "73", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
            }
            return "false";
        }
        private string TrimVideo(string inputFileName)
        {
            
            da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoQueueStatus.Rendering);
            string outputFileName = inputFileName.Substring(0, inputFileName.Length - 4) + "_trimmed.mp4";
            string inputFileNameAndPath = TempEditFolder + "\\" + inputFileName;
            string outputFileNameAndPath = TempEditFolder + "\\" + outputFileName;
            string formattedInputTime = TimeSpan.FromSeconds(_renderParameters.Start).ToString();
            string formattedDuration = TimeSpan.FromSeconds(_renderParameters.Duration).ToString();

            Library.WriteServiceLog("Beginning to trim video.");
            Library.WriteServiceLog("StartTime: " + formattedInputTime);
            Library.WriteServiceLog("Duration: " + formattedDuration);

            //if the video is less than 5 seconds long, it's probably a mistake and shouldn't be trimmed at all
            if(_renderParameters.Duration<5)
            {
                Library.WriteServiceLog("Duration less than 5 seconds. Not trimming video");
                File.Move(inputFileNameAndPath, outputFileNameAndPath);
                return outputFileName;
            }

            string argumentString = String.Format(@"{0} {1} {2} {3} {4}", FfMpegPathAndExecuteable, inputFileNameAndPath, outputFileNameAndPath, formattedInputTime, formattedDuration );
            Library.WriteServiceLog("Beggining to trim video");
            var proc = new Process
            {
                StartInfo =
                    {
                        FileName = BatchFilePath + "Trim.bat",
                        Arguments = argumentString
                    }
            };
            proc.Start();
            proc.WaitForExit();
            if (proc.ExitCode == 0)
            {
                Library.WriteServiceLog("Succesfully trimmed video!");
                return outputFileName;
            }
            else
            {
                Library.WriteServiceLog("Error trimming video!");
                string errorDescription = "Batch file 'Trim.bat' failed. Argument String: " + argumentString;
                Error.ReportError(ErrorSeverity.Severe, errorDescription, "RenderVideo", "TrimVideo", "132", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                HandleErrors();
            }
            return "false";
        }
        private string CompressVideo(string inputFileName)
        {
            //Involves re-encoding video. Very CPU intensive. Will take a considerable amount of time with larger videos

            //Get filenames situated, and format the arguments.
            string inputFileNameAndPath = TempEditFolder + "\\" + inputFileName;
            string outputFileName = inputFileName.Substring(0, inputFileName.Length - 4) + "_compressed.mp4";
            string outputFileNameAndPath = TempEditFolder + "\\" + outputFileName;
            string ffmpegLogPath = BatchFilePath + "ffmpegLog.txt";
            string argumentString = String.Format(@"{0} {1} {2} {3}", FfMpegPathAndExecuteable, inputFileNameAndPath, outputFileNameAndPath, ffmpegLogPath);

            //Declare the process
            var proc = new Process
            {
                StartInfo =
                    {
                        FileName = BatchFilePath + "Compress.bat",
                        Arguments = argumentString
                    }
            };

            Library.WriteServiceLog("Starting Compression Process");
            proc.Start();
            proc.WaitForExit();
            if (proc.ExitCode == 0)
            {
                Library.WriteServiceLog("Succefully compressed video");
                da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoQueueStatus.Finished);
                return outputFileName;
            }
            else
            {
                Library.WriteServiceLog("FAILED TO COMPRESS VIDEO! SEE ffmpeglog.txt FOR MORE DETAILS");
                string errorDescription = "Batch file 'Compress.bat' failed. Argument String: " + argumentString;
                Error.ReportError(ErrorSeverity.Severe, errorDescription, "RenderVideo", "Compress Video", "160", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                HandleErrors();
            }
            return "false";

        }

        private async Task<bool> DownloadVideosFromBlob()
        {
            da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoQueueStatus.Downloading);
            try
            {
                foreach (var file in _videoFiles.AsParallel())
                {
                    Library.WriteServiceLog("Downloading File From Azure. File Name: " + file);
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(AzureStorageAccount);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("videos-in-queue");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(file);
                    await blockBlob.DownloadToFileAsync(RawFileArchivePath + "\\" + file, FileMode.Create);
                }
                da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoQueueStatus.Downloaded);
                return true;
            }
            catch (Exception e)
            {
                Library.WriteServiceLog("Failed to download azure blobs!");
                Library.WriteServiceLog("Exception: " + e.Message);
                
                RenderErrors.ReportError(ErrorSeverity.Fatal, e, "RenderVideo", "DownloadVideosFromBlob", "63", _renderParameters.ServiceId, _renderParameters.FuneralHomeName);
                HandleErrors();
                return false;
            }

          
        }
        private bool InitiateRenderProcess()
        {
            Library.WriteServiceLog("////////////////////////////////////////////");
            Library.WriteServiceLog("Initiating Render Process. Setting Global Variables, Logging Render Params, and creating SEM file.");

            Library.WriteServiceLog("Service Id: " + _renderParameters.ServiceId);
            Library.WriteServiceLog("Funeral Home Name: " + _renderParameters.FuneralHomeName);
            Library.WriteServiceLog("Raw File Names: " + _renderParameters.ServiceId);
            Library.WriteServiceLog("Converted File Name: " + _renderParameters.ServiceId);
            Library.WriteServiceLog("Start: " + _renderParameters.ServiceId);
            Library.WriteServiceLog("Duration: " + _renderParameters.ServiceId);
            

            GlobalVariables.IsRendering = true;

            //Clear previous video to help server not get filled up
            ClearRawFileDirectory();

            //Clear Temp Folder for any leftovers
            CleanTempEditFolder();

            //Create a file so system admins can easily see if we are rendering or not.
            var semFile = new StreamWriter(BatchFilePath + "Converting.SEM");
            semFile.Close();
            return true;
        }
        private void ClearRawFileDirectory()
        {
            System.IO.DirectoryInfo di = new DirectoryInfo(RawFileArchivePath);

            foreach (FileInfo file in di.GetFiles())
            {
                try
                {
                    file.Delete();
                }
                catch (Exception e)
                {
                    Library.WriteServiceLog("Failed to delete file: " + file.Name);
                    Error.ReportError(ErrorSeverity.Warning, e, "RenderVideo", "ClearRawFileDirectory", "294", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                }
                
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
        }
        private bool FinishRenderProcess()
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
                RenderErrors.ReportError(ErrorSeverity.Warning, e, "Error deleting Semi File", "RenderVideo", "FinishRenderProcess", "105", _renderParameters.ServiceId, _renderParameters.FuneralHomeName);
            }
            return true;
        }
        public bool CreateSlideShow(string firstName, string lastName, DateTime serviceDate, string funeralHomeName, string outputFileName)
        {

            Library.WriteServiceLog("Beginning to create slide show");
            //ffmpeg has some weird escape rules. Double quotes don't show, and : break the entire thing even when escaped.
            string ffmpegEscapedNameString = firstName + " " + lastName;

            ffmpegEscapedNameString = ffmpegEscapedNameString.Replace("'", "\'").Replace("\"", "\'").Replace("\\", "\\\\\\\"").Replace(":", " ");
            Library.WriteServiceLog("Name Parameters: " + ffmpegEscapedNameString);

            string ffmpegEscapedDateString = serviceDate.ToString("MMMM dd, yyyy");
            Library.WriteServiceLog("Date Parameter: " + ffmpegEscapedDateString);

            string ffmpegEscapedFuneralHomeNameString = funeralHomeName.Replace("'", "\'").Replace("\"", "\'").Replace("\\", "\\\\\\\"").Replace(":", " ");
            Library.WriteServiceLog("FuneralHomeName Parameter: " + ffmpegEscapedFuneralHomeNameString);

            outputFileName = TempEditFolder + "\\" + outputFileName;

            string argumentsString = FfMpegPathAndExecuteable + " " + BatchFilePath + "open.mp4" + " " + outputFileName + " \"" + ffmpegEscapedNameString + "\"" + " \"" + ffmpegEscapedDateString + "\" \"" + ffmpegEscapedFuneralHomeNameString + "\"";

            var p = new Process
            {
                StartInfo =
                    {
                        FileName = BatchFilePath + "CreateSlideShow.bat",
                        Arguments = argumentsString
                    }
            };
            p.Start();
            p.WaitForExit();
            if (p.ExitCode == 0)
            {
                Library.WriteServiceLog("Succesfully created slideshow");
                return true;
            }
            else
            {
                Library.WriteServiceLog("FAILED TO CREATE SLIDE SHOW!");
                string errorDescription = "Batch file 'CreateSlideShow.bat' failed. ArgumentString: " + argumentsString;
                Library.WriteServiceLog(errorDescription);
                Error.ReportError(ErrorSeverity.Severe, errorDescription, "RenderVideo", "CreateSlideshow", "178", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                HandleErrors();
            }
            return false;

        }
        private bool UploadConvertedVideoToAzure(string convertedFileName)
        {
      
            da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoQueueStatus.UploadingConvertedFile);
            Library.WriteServiceLog("Uploading converted file to azure");
            Library.WriteServiceLog("Converted File Name: " + convertedFileName);
            
            if (convertedFileName.Length > 1)
            {
                string convertedFileNameAndPath = ConvertedFolder + "\\" + convertedFileName;
                try
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference("videos");
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(convertedFileName);
                    blockBlob.UploadFromFile(convertedFileNameAndPath);
                    blockBlob.Properties.ContentType = "video/mp4";
                    blockBlob.SetProperties();
                }
                catch (Exception e)
                {
                    Library.WriteServiceLog("FAILED TO UPLOAD CONVERTED FILE TO AZURE!");
                    Library.WriteServiceLog("Exception Message: " + e.Message);
                    Library.WriteServiceLog("Inner Exception: " + e.InnerException);
                    Error.ReportError(ErrorSeverity.Severe, e, "RenderVideo", "UploadConvertedVideoToAzure", "429", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                    HandleErrors();
                    return false;
                }

            }
            Library.WriteServiceLog("Succesfully uploaded converted file to Azure");
            return true;
        }
        private string ExtractThumbnail(string videoName, int seconds)
        {
            Library.WriteServiceLog("Extracting Thumbnail");
            string thumbnailName = videoName.Substring(0, videoName.Length - 4) + "_thumb.png";
            string videoPath = ConvertedFolder + "\\" + videoName;
            string thumbnailPathAndName = ThumbnailFolder + "\\" + thumbnailName;
            bool success = false;
            if (File.Exists(thumbnailPathAndName))
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
                Library.WriteServiceLog("Succesfully extracted thumbnail");
                success = true;
            }
            da.SetVideoThumbnail(_renderParameters.ServiceId, thumbnailName);
                return thumbnailName;
           
        }
        private bool UploadThumbnailToAzure(string thumbnailName)
        {
            Library.WriteServiceLog("Uploading thumbnail to azure");
            string thumbnailNameAndPath = ThumbnailFolder + "\\" + thumbnailName;
            if(!File.Exists(thumbnailNameAndPath))
            {
                Library.WriteServiceLog("Could not find Thumbnail.");
                Error.ReportError(ErrorSeverity.Warning, "Could not find thumbnail", "RenderVideo", "UploadThumbnailToAzure", "475", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                return false;
            }
            try
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("video-thumbnails");
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(thumbnailName);
                blockBlob.UploadFromFile(thumbnailNameAndPath);
                blockBlob.Properties.ContentType = "application/png";
                blockBlob.SetProperties();
            }
            catch (Exception e)
            {
                Library.WriteServiceLog("Failed to upload thumbnail to Azure!");
                Library.WriteServiceLog("Exception: " + e.Message);
                Error.ReportError(ErrorSeverity.Severe, e.Message, "RenderVideo", "UploadThumbnailToAzure", "475", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                return false;
            }
            try
            {
                File.Delete(thumbnailNameAndPath);
            }
            catch (Exception e)
            {
                Library.WriteServiceLog("Failed to delete Thumbnail!");
                Library.WriteServiceLog("Exception: " + e.Message);
                Error.ReportError(ErrorSeverity.Severe, e.Message, "RenderVideo", "UploadThumbnailToAzure", "508", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                return false;
            }
           
            return true;
        }

        private bool MoveFinishedVideoFromTempToConvertedFolder(string fileName, string convertedName)
        {
            Library.WriteServiceLog("Moving finished video to converted archive");
            string fileNameAndLocation = TempEditFolder + "\\" + fileName;
            string convertedNameAndLocation = ConvertedFolder + "\\" + convertedName;
            if(File.Exists(convertedNameAndLocation))
            {
                Library.WriteServiceLog(convertedNameAndLocation + " Already Exists. Attempting to delete!");
                try
                {
                    File.Delete(convertedNameAndLocation);
                    Library.WriteServiceLog("File Deleted!");
                }
                catch (Exception ex)
                {
                    Library.WriteServiceLog("Failed to Delete file!");
                    Library.WriteServiceLog("Error: " + ex.Message);
                    Error.ReportError(ErrorSeverity.Severe, ex, "RenderVideo", "MoveFinishedVideoFromTempToConvertedFolder", "326", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                    HandleErrors();
                }
            }
            try
            {
                File.Move(fileNameAndLocation, convertedNameAndLocation); // Try to move
                Library.WriteServiceLog("Succefully moved video to converted archive");
                return true;
            }
            catch (Exception ex)
            {
                Library.WriteServiceLog("Failed to move file!");
                Library.WriteServiceLog("Error: " + ex.Message);
                Error.ReportError(ErrorSeverity.Severe, ex, "RenderVideo", "MoveFinishedVideoFromTempToConvertedFolder", "303", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
            }
            return false;
        }
        private bool MoveFileFromRawFolderToTempEdit(string fileName)
        {
            Library.WriteServiceLog("Only one Video file was found. Moving file from Raw Archive to Temp Edit Folder");
            string fileNameAndLocation = RawFileArchivePath + "\\" + fileName;
            string tempEditNameAndLocation = TempEditFolder + "\\" + fileName;

            //If file exists delete it.
            if(File.Exists(tempEditNameAndLocation))
            {
                try
                {
                    Library.WriteServiceLog("File already exists! Deleting file in tempedit folder");
                    File.Delete(tempEditNameAndLocation);
                    Library.WriteServiceLog("Succesfully moved file");
                    return true;
                }
                catch (Exception ex)
                {
                    Library.WriteServiceLog("Failed to move file!");
                    Library.WriteServiceLog("Error: " + ex.Message);
                    Error.ReportError(ErrorSeverity.Severe, ex, "RenderVideo", "MoveFileFromRawFolderToTempEdit", "326", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                    HandleErrors();
                }
                return false;
            }
            try
            {
                File.Move(fileNameAndLocation, tempEditNameAndLocation); // Try to move
                Library.WriteServiceLog("Succesfully moved file");
                return true;
            }
            catch (Exception ex)
            {
                Library.WriteServiceLog("Failed to move file!");
                Library.WriteServiceLog("Error: "+ex.Message);
    
                Error.ReportError(ErrorSeverity.Severe, ex, "RenderVideo", "MoveFileFromRawFolderToTempEdit", "326", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                HandleErrors();
            }
            return false;
        }

        private void DeleteVideoFilesFromQue()
        {
                foreach (var file in _videoFiles)
                {
                    try
                    {
                        Library.WriteServiceLog("Deleting Video File: " + file + " From Azure Que Container");
                        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(AzureStorageAccount);
                        CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                        CloudBlobContainer container = blobClient.GetContainerReference("videos-in-queue");
                        CloudBlockBlob blockBlob = container.GetBlockBlobReference(file);
                        blockBlob.Delete();
                        Library.WriteServiceLog("Sucessfully deleted file!");
                    }
                    catch (Exception e)
                    {
                        string errorDescrip = "Failed to delete azure blobs from videos-in-queue container!";
                        RenderErrors.ReportError(ErrorSeverity.Warning, e, errorDescrip, "RenderVideo", "DeleteVideoFilesFromQue", "565", _renderParameters.ServiceId, _renderParameters.FuneralHomeName);
                    }
                }
        }

        private bool CleanUpRenderEnviroment()
        {
            Library.WriteServiceLog("Cleaning up render enviroment.");
            GlobalVariables.IsRendering = false;
            try
            {
                if (File.Exists(BatchFilePath + "Converting.SEM"))
                {
                    File.Delete(BatchFilePath + "Converting.SEM");
                }
            }
            catch (Exception e)
            {
                Library.WriteServiceLog("Error deleting semi file");
                Library.WriteServiceLog("Error: " + e.Message);
                Error.ReportError(ErrorSeverity.Warning, e, "RenderVideo", "CleanUpRenderEnviroment", "660", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
            }
          
            //Delete All Raw and temp videos
            ClearRawFileDirectory();
            CleanTempEditFolder();

            return true;
        }

        private void CleanTempEditFolder()
        {
            DirectoryInfo tempArchive = new DirectoryInfo(TempEditFolder);
            foreach (FileInfo file in tempArchive.GetFiles())
            {
                try
                {
                    file.Delete();
                }
                catch(Exception e)
                {
                    Library.WriteServiceLog("Failed to delete file: " + file.Name);
                    Error.ReportError(ErrorSeverity.Warning, e, "RenderVideo", "CleanTempEditFolder", "682", _renderParameters.FuneralHomeName, _renderParameters.ServiceId);
                }
            }
        }

        ///<summary>
        ///Log error in config file. If errored out 3 times in a row shutdown machine
        ///</summary>
        private void HandleErrors()
        {
            string vmMachineName = System.Environment.MachineName;
            RenderErrors.ReportError(ErrorSeverity.Severe, "Video Failed To Render. Machine Name: " + vmMachineName, "RenderVideo", "HandleErrors", "693", _renderParameters.ServiceId, _renderParameters.FuneralHomeName);

            int errorCount = GlobalVariables.ErrorCount;
            da.UpdateVideoQueStatus(_renderParameters.VideoQueId, VideoManager.Models.Data.Enums.VideoQueueStatus.Error);

            var isAzureVM = ConfigurationManager.AppSettings["IsAzureVM"];
            if (isAzureVM != "false")
            {
                ManageResourceGroup.StopVirtualMachine(_renderParameters.ResourceGroupName, vmMachineName);
            }
            else
            {
                CleanUpRenderEnviroment();
            }

        }
    }
}
