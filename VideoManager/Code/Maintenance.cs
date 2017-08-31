using Amazon.Glacier;
using Amazon.Glacier.Transfer;
using Amazon.Runtime;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace VideoManager.Code
{
    public class Maintenance
    {

        public static void BackUpFuneralsToGlacier()
        {
            string vaultName = "examplevault";
            string archiveToUpload = "C:\\Users\\Shane\\Videos\\bigbuck.mp4";
            try
            {
                var manager = new ArchiveTransferManager(Amazon.RegionEndpoint.USEast1);
                // Upload an archive.
                string archiveId = manager.Upload(vaultName, "getting started archive test", archiveToUpload).ArchiveId;
                Console.WriteLine("Copy and save the following Archive ID for the next step.");
                Console.WriteLine("Archive ID: {0}", archiveId);
                Console.WriteLine("To continue, press Enter");
                Console.ReadKey();
            }
            catch (AmazonGlacierException e) { Console.WriteLine(e.Message); }
            catch (AmazonServiceException e) { Console.WriteLine(e.Message); }
            catch (Exception e) { Console.WriteLine(e.Message); }
            Console.WriteLine("To continue, press Enter");
            Console.ReadKey();
        }
        public static void DeleteOldPDFs()
        {
            string pdfs = ConfigurationManager.AppSettings["rootPath"] + @"\UploadedPDFs\" ;
            string[] files = Directory.GetFiles(pdfs);
            foreach (var file in files)
            {

                DateTime LastUsed = File.GetCreationTime(file);
                if (LastUsed < DateTime.Now.AddDays(-15))
                {
                    File.Delete(file);
                }
            }
        }
        public static void DeleteRawVideoFiles()
        {
            //Delete all videos older than 10 days
            string rawArchiveLocation = ConfigurationManager.AppSettings["rawArchive"];
            string[] files = Directory.GetFiles(rawArchiveLocation);
            foreach(var file in files)
            {
                try
                {
                    DateTime LastUsed = File.GetCreationTime(file);
                    if (LastUsed < DateTime.Now.AddDays(-10))
                    {
                        string ext = Path.GetExtension(file);
                        if(ext.ToLower()==".mp4")
                        {
                            File.Delete(file);
                        }
                        
                    }
                }
                catch(Exception e)
                {
                    Email.sendErrorMessage(e.Message + " INNER EXCEPTION: " + e.InnerException);
                }
            
            }
        }

        public static void DeleteOldVHDs()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["ARMRenderStorageKey"]);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("vhds");
            var properties = blobClient.GetServiceProperties();
            properties.DefaultServiceVersion = "2016-05-31";
            blobClient.SetServiceProperties(properties);
            var images = container.ListBlobs();
            foreach (var image in images)
            {
                string blobName = image.Uri.Segments[2];
                //CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);

                //Intended to check if Blob is older than 3 days and delete it.
                //However there is a known Azure bug that prevents the fetchattributes from returning the attributes.
                //I have no other ideas on how to get the last modified date. So for now I'm just deleting all blobs.
                //This should be fine because the VHDs being used have a lease on them preventing them from deletion.
                //blockBlob.FetchAttributes();
                //DateTimeOffset threeDaysAgo = DateTimeOffset.Now.AddDays(-3);
                //blockBlob.FetchAttributes();
                //DateTimeOffset? lastModified = blockBlob.Properties.LastModified;
                //if(lastModified!=null)
                //{
                //    if(threeDaysAgo>lastModified)
                //    {
                //        blockBlob.Delete();
                //    }
                //}

                //Even though there is a lease on it. Not a good idea to try and delete our production server.
                if (!blobName.Contains("Prod") && !blobName.Contains("prod"))
                {
                    try
                    {
                        blockBlob.Delete();
                    }
                    catch
                    {
                        //there was a lease on the blob
                    }

                }

            }

        }

    }
}