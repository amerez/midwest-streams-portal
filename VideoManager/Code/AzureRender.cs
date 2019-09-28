using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;
using Microsoft.AspNet.Identity;
using System.Web.Configuration;
using System.Configuration;
using VideoManager.Models.Data.Enums;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Xml;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure;
using System.Text.RegularExpressions;


namespace VideoManager.Code
{
    public class AzureRender
    {
        public static async Task<bool> AssigningVideosToQueue(int id, string fileNames, VideoQueType type)
        {
            //int VMsAvailable = 4;
            //creating local context to avoid threading issues
            using (ApplicationDbContext context = new ApplicationDbContext())
            {

                Service serv = context.Services.Find(id);
                VideoQueue q = new VideoQueue();
                q.VideoId = id;
                q.BlobPath = fileNames;


                q.CreateDate = DateTime.Now;
                q.VideoQueType = type;
                q.VideoStatus = VideoQueueStatus.UploadingToAzureRenderFarm;
                //Use free server located in Wahpeton to Render videos if avaliable
                //Look into purchasing a render server for the house
                //var wahpRenderQ = context.VideoQueues.Where(x => x.VMName == "WIN-8GJ4I6440BF").FirstOrDefault();
                //if (wahpRenderQ == null)
                //{
                //    q.VMName = "WIN-8GJ4I6440BF";
                //    q.VideoStatus = VideoQueueStatus.UploadingToAzureRenderFarm;
                //    context.VideoQueues.Add(q);
                //    context.SaveChanges();
                //}
                //else
                //{
                string timeStamp = DateTime.Now.ToString("hhmm");
                    string PrefixName = serv.Id + "-" + serv.FuneralHome.Name;
                    PrefixName = Regex.Replace(PrefixName, "[^A-Za-z0-9-_]", "");
                    var groupName = PrefixName + "-RenderGroup";
                    groupName = Regex.Replace(groupName, "[^A-Za-z0-9-_]", "")+"-"+timeStamp;
                    var vmName = serv.Id + "vm";
                    q.VMName = vmName;
                    q.VideoStatus = VideoQueueStatus.Created;
                    q.ResourceGroupName = groupName;
                    context.VideoQueues.Add(q);
                    context.SaveChanges();

                    VMmanager man = new VMmanager();
                    man.CreateAndDeployRenderVM(serv, groupName, vmName);
                // }

                q.VideoStatus = VideoQueueStatus.UploadingToAzureRenderFarm;
                context.Entry(q).State = EntityState.Modified;
                context.SaveChanges();

                //LOCAL RENDER CODE
                //q.VMName = "MSI";
                //q.VideoStatus = VideoQueueStatus.UploadingToAzureRenderFarm;
                //q.VideoQueType = type;
                //context.VideoQueues.Add(q);
                //context.SaveChanges();
                //Turn on azure VM


                //var StartAzureVMResult = await TurnOnAzureVM(q.AssignedVM.ToString()).ConfigureAwait(false);

                string[] videoFiles = fileNames.Split(',');

                //Upload files to Azure
                bool UploadFilesResult = true;
                if(type==VideoQueType.FullNoSlate || type== VideoQueType.FullWithSlate)
                {
                     UploadFilesResult = await UploadFilesToAzure(videoFiles, "videos-in-queue").ConfigureAwait(false);
                }

                //Signal Render Machine everything is done
                if (UploadFilesResult)
                {
                    q.VideoStatus = VideoQueueStatus.UploadedToAzureRenderFarm;
                }
                else
                {
                    q.VideoStatus = VideoQueueStatus.Error;
                    context.Entry(q).State = EntityState.Modified;
                    Error.ReportError(ErrorSeverity.Severe, "AzureRender", "AssignVideosToQue", "105");
                }
                context.SaveChanges();
               Task.Yield();
                return false;
            }

        }
        
        public static async Task<bool> UploadFilesToAzure(string[] fileNames, string containerName)
        {
            string UploadfilePath = ConfigurationManager.AppSettings["rawArchive"];

            //Skyline Technology async code. Supposed to upload multiple files at once. Doesn't work.
            //foreach (var file in fileNames.AsParallel())
            foreach (var file in fileNames)
            {
                try
                {
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(file);
                    //The async method returns a 404??
                   // blockBlob.UploadFromFileAsync(UploadfilePath + "\\" + file, FileMode.Open);
                   
                    blockBlob.UploadFromFile(UploadfilePath + "\\" + file);
                    blockBlob.Properties.ContentType = "video/mp4";
                    blockBlob.SetProperties();
                }
                catch (AggregateException e)
                {
                    //Enter ID and stuff here..
                    string description = "Upload To Azure Failed. File Name: "+file+" Container Name: "+containerName+"  Error: " + e.Flatten();
                    Error.ReportError(ErrorSeverity.Severe, description, "AzureRender", "UploadFilesToAzure");
                }
                catch (Exception e)
                {
                    string description = "Upload To Azure Failed. File Name: " + file + " Container Name: " + containerName;
                    Error.ReportError(ErrorSeverity.Severe, e, description, "AzureRender", "UploadFilesToAzure");
                }
            }

            return true;
        }
        public static async Task<bool> TurnOnAzureVMArm(string AzureVMNumber)
        {
      
            //var result = VirtualMachinesOperationsExtensions
            return true;
        }

        public static async Task<bool> CopyProductionVideoToQueContainer(string fileName)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer sourceContainer = blobClient.GetContainerReference("videos");
            CloudBlobContainer targetContainer = blobClient.GetContainerReference("videos-in-queue");
            CloudBlockBlob sourceBlob = sourceContainer.GetBlockBlobReference(fileName);
            CloudBlockBlob targetBlob = targetContainer.GetBlockBlobReference(fileName);
            targetBlob.StartCopyAsync(sourceBlob);
            return true;
        }
        //public static async Task<bool> TurnOnAzureVM(string AzureVMNumber)
        //{
        //    //SSL stuff, not really sure what's going on here, just found some posts on stackoverflow and went for it

        //    string certPath = ConfigurationManager.AppSettings["rootPath"] + "\\FreeSSL.pfx";
        //    X509Certificate2 cert = new X509Certificate2(certPath, "go");
        //    string serviceName = "notset";
        //    string deploymentName = "notSet";
        //    string vmName = "notset";
        //    switch (AzureVMNumber)
        //    {
        //        case "1":
        //            serviceName = "mwsrender11660";
        //            deploymentName = "MWSRender11660";
        //            vmName = "mwsrender1";
        //            break;
        //        case "2":
        //            serviceName = "mwsrender29859";
        //            deploymentName = "MWSRender29859";
        //            vmName = "mwsrender2";
        //            break;
        //        case "3":
        //            serviceName = "mwsrender36270";
        //            deploymentName = "MWSRender36270";
        //            vmName = "mwsrender3";
        //            break;
        //        case "4":
        //            serviceName = "mwsrender41667";
        //            deploymentName = "MWSRender41667";
        //            vmName = "mwsrender4";
        //            break;
        //    }
        //    //Actually starts the Virtual Machine
        //   return await StartVirtualMachine("b77561f7-eb44-46d0-af75-fa61114f3255", cert, serviceName, deploymentName, vmName);
            
        //}


        ////static async Task<bool> StartVirtualMachine(string subscriptionID, X509Certificate2 cer, string serviceName, string deploymentsName, string vmName)
        //static async Task<bool> StartVirtualMachine(string subscriptionID, X509Certificate2 cer, string serviceName, string deploymentsName, string vmName)
        //{
        //    HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri("https://management.core.windows.net/" + subscriptionID
        //    + "/services/hostedservices/" + serviceName + "/deployments/" + deploymentsName + "/roleinstances/" + vmName + "/Operations"));

        //    request.Method = "POST";
        //    request.ClientCertificates.Add(cer);
        //    request.ContentType = "application/xml";
        //    request.Headers.Add("x-ms-version", "2013-06-01");

        //    // Add body to the request 
        //    XmlDocument xmlDoc = new XmlDocument();
        //    xmlDoc.Load(ConfigurationManager.AppSettings["rootPath"] + "\\StartVM.xml");

        //    using (Stream requestStream = request.GetRequestStream())
        //    {
        //       using( StreamWriter streamWriter = new StreamWriter(requestStream, System.Text.UTF8Encoding.UTF8))
        //       {
        //           xmlDoc.Save(streamWriter);
        //           streamWriter.Close();
        //           requestStream.Close();
        //       }
        //    }

        //    try
        //    {
        //        //This usually works but sometimes I get the error below
        //        //Could not create SSL/TLS secure channel
        //        var response = request.GetResponse();
        //        //var response = request.GetResponse();
        //        HttpWebResponse responsee = (HttpWebResponse)response;
        //        if (responsee.StatusCode != HttpStatusCode.OK && responsee.StatusCode != HttpStatusCode.Accepted)
        //       {
        //           Email.sendErrorMessage("VM Didn't start. Returned an HTTPStatusCode: "+responsee.StatusCode.ToString());
        //       }
               
        //        response.Close();

        //    }
        //    catch (WebException ex)
        //    {
        //        Email.sendErrorMessage("Failed to start azure rendering machine:" + vmName + "<br/> Error Message: " + ex.Message + "<br/> Inner Exception: " + ex.InnerException);
        //        return false;
        //    }
        //    return true;

        //}
    }
    public class VMWorkLoadProp
    {
        public int VMNumber { get; set; }
        public int VideosInQue { get; set; }
    }
}