using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VideoManager.Models;
using VideoManager.Models.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using PdfToText;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Threading.Tasks;
using System.Threading;
using GhostscriptSharp;

namespace VideoManager.Controllers
{
    public class PDFsController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

         //GET: PDFs
        [Authorize(Roles = "Admin")]
		public ActionResult Index()
		{
            
			var pDFs = db.PDFs.Include(p => p.Service).ToList();
         
			return View(pDFs.ToList());
		}

		// GET: PDFs/Details/5
        [Authorize(Roles = "Admin, FuneralHomeOwner, FuneralHome")]
		public ActionResult Details(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			PDF pDF = db.PDFs.Find(id);
			if (pDF == null)
			{
				return HttpNotFound();
			}
			return View(pDF);
		}
        [Authorize(Roles = "Admin, FuneralHomeOwner, FuneralHome")]
        //Home ID
        public ActionResult PDFViewer(int? id, int?SinglePDFId)
        {
            FuneralHome home = new FuneralHome();
            if(id!=null)
            {
                home = db.FuneralHomes.Where(f => f.Id == id).FirstOrDefault();
                if (home == null)
                {
                    return View("NotFound");
                } 
            }

            List<PDF> Pdfs = new List<PDF>();
            if (SinglePDFId != null)
            {
                PDF pdf = db.PDFs.Find(SinglePDFId);
                Pdfs.Add(pdf);
                ViewBag.DisplaySingle = true;
                return View(Pdfs);
            }

            var userID = User.Identity.GetUserId();
            home = db.FuneralHomes.Where(f => f.UserId == userID).FirstOrDefault();
            if (home != null)
            {
                foreach (var service in home.Services)
                {
                    if (service.CreateDate > DateTime.Now.AddDays(-30))
                    {
                        if (service.PDF != null)
                        {
                            Pdfs.Add(service.PDF);
                        }
                    }

                }

                if (Pdfs.Count > 1)
                {
                    return View(Pdfs);
                }
                else
                {
                    List<Service> services = new List<Service>();
                    services = home.Services.Where(s => s.PDF != null).OrderBy(f => f.CreateDate).ToList();
                    var i = 0;
                    foreach (var service in services)
                    {
                        if (i < 7)
                        {
                            Pdfs.Add(service.PDF);
                        }
                        i++;
                    }
                    if (Pdfs.Count == 0)
                    {
                        return View("NoPdf");
                    }
                    return View(Pdfs);
                }
            }
            else
            {
                return View("NotFound");
            }
        }
        //Expecting the Service ID Here
        [AllowAnonymous]
        public ActionResult MemorialFolder(int? id)
        {
            Service service = db.Services.Find(id);
            if(service==null)
            {
                return View("NotFound");
            }
            return View(service);
        }

        public ActionResult ServePDF(int? id, bool? IgnoreCount)
        {
            PDF pdf = db.PDFs.Find(id);

            var pdfFilePath = pdf.PDFPath;
            //Analytics 
            if (IgnoreCount != true)
            {
                int currentPageHits = 0;
                try
                {
                    Random rand = new Random();
                    if (pdf.PageHits != null)
                    {
                        if (rand.Next(0, 2) == 0)
                        {
                            currentPageHits = pdf.PageHits + 1;
                        }
                        else
                        {
                            currentPageHits = pdf.PageHits + 2;
                        }
                    }
                    else
                    {
                        currentPageHits = 1;
                    }
                    pdf.PageHits = currentPageHits;

                    db.SaveChanges();
                }
                //The above code should always work, but just to be safe
                catch
                {
                    // var fullPdfPath = ConfigurationManager.AppSettings["pdfArchive"] + "/pdfs/" + pdfFilePath;
                    pdfFilePath = Uri.EscapeDataString(pdfFilePath);
                    //pdfFilePath = pdfFilePath.Replace(" ", "%20");
                    var fullPdfPath = ConfigurationManager.AppSettings["videoCDN"] + "/pdfs/" + pdfFilePath;
                    return Redirect(fullPdfPath);
                }
            }
            pdfFilePath = Uri.EscapeDataString(pdfFilePath);
            var FullPdfPath = ConfigurationManager.AppSettings["videoCDN"] + "/pdfs/" + pdfFilePath;
          
            return Redirect(FullPdfPath);

        }
		public ActionResult DisplayPDF(int? id, bool? IgnoreCount)
		{
			PDF pdf = db.PDFs.Find(id);
            if(pdf==null)
            {
                return View("NotFound");
            }
            string pdfFilePath = pdf.PDFPath;
            pdfFilePath = Uri.EscapeDataString(pdfFilePath);;
            var fullPdfPath = ConfigurationManager.AppSettings["videoCDN"] + "/pdfs/" + pdfFilePath;
            if (IgnoreCount != true)
            {
                int currentPageHits = 0;
                try
                {
                    Random rand = new Random();
                    if (pdf.PageHits != null)
                    {
                        if (rand.Next(0, 2) == 0)
                        {
                            currentPageHits = pdf.PageHits + 1;
                        }
                        else
                        {
                            currentPageHits = pdf.PageHits + 2;
                        }
                    }
                    else
                    {
                        currentPageHits = 1;
                    }
                    pdf.PageHits = currentPageHits;

                    db.SaveChanges();
                }
                //The above code should always work, but just to be safe
                catch
                {
              
          
                    ViewBag.PdfPath = fullPdfPath;
                    return View("MemorialFolder", pdf.Service);
             
                }
            }

            ViewBag.PdfPath = fullPdfPath;
            return View("MemorialFolder",  pdf.Service );
		}
        //Service ID
        public ActionResult iframe(int?id)
        {
            if(id==null)
            {
                return View("NotFound");
            }
            Service serv = db.Services.Find(id);
            if (serv == null)
            {
                return View("NotFound");
            }
            return View(serv);
        }

        [HttpPost]
        public ActionResult callExtraxtText(int serviceId)
        {
            Service service = db.Services.Find(serviceId);

            if (service != null)
            {
                if (service.PDF != null)
                {
                    string inFileName = service.PDF.PDFPath;

                    if (inFileName != null)
                    {
                        inFileName = ConfigurationManager.AppSettings["pdfArchive"] + @"\PDFs\" + inFileName;
                        PDFParser reader = new PDFParser();
                        string text = reader.ExtractText(serviceId, inFileName);
                        PDF pdf = service.PDF;
                        if (text != "false")
                        {
                            pdf.FacebookDescription = text;
                            pdf.FacebookTitle = service.FirstName + " " + service.LastName + "'s Memorial Folder";
                            db.SaveChanges();
                            return Json("success");
                        }
                    }
                }
            }

            return Json("Error");
        }

        public ActionResult DisplayThumbnail(int? id)
        {
            PDF pdf = db.PDFs.Find(id);
            var thumbnail = pdf.ThumbnailPath;

            var FullPdfPath = ConfigurationManager.AppSettings["videoCDN"] + "/pdf-thumbnails/" + thumbnail;
            return Redirect(FullPdfPath);
        }
		// GET: PDFs/Create
        [Authorize(Roles = "Admin, FuneralHome")]
		public ActionResult Create()
		{
			ViewBag.ServiceId = new SelectList(db.Services, "Id", "FirstName");
			return View();
		}

		// POST: PDFs/Create
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Create(PDF pDF)
		{
			if (ModelState.IsValid)
			{
				db.PDFs.Add(pDF);
				db.SaveChanges();
				return RedirectToAction("Index");
			}

			ViewBag.ServiceId = new SelectList(db.Services, "Id", "FirstName", pDF.ServiceId);
			return View(pDF);
		}

		// GET: PDFs/Edit/5
        [Authorize(Roles = "Admin, FuneralHome")]
		public ActionResult Edit(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			
			PDF pDF = db.PDFs.Find(id);
			if (pDF == null)
			{
				return HttpNotFound();
			}
			ViewBag.ServiceId = new SelectList(db.Services, "Id", "FirstName", pDF.ServiceId);
			return View(pDF);
		}

		// POST: PDFs/Edit/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
		// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Edit([Bind(Include = "Id,IsDeleted,ServiceId,Style,GoogleAnalytics")] PDF pDF)
		{
			if (ModelState.IsValid)
			{
				db.Entry(pDF).State = EntityState.Modified;
				db.SaveChanges();
				return RedirectToAction("Index");
			}
			ViewBag.ServiceId = new SelectList(db.Services, "Id", "FirstName", pDF.ServiceId);
			return View(pDF);
		}

		// GET: PDFs/Delete/5
        [Authorize(Roles = "Admin, FuneralHome")]
		public ActionResult Delete(int? id)
		{
			if (id == null)
			{
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			}
			PDF pDF = db.PDFs.Find(id);
			if (pDF == null)
			{
				return HttpNotFound();
			}
			return View(pDF);
		}

		// POST: PDFs/Delete/5
		[HttpPost, ActionName("Delete")]
		[ValidateAntiForgeryToken]
		public ActionResult DeleteConfirmed(int id)
		{
			PDF pDF = db.PDFs.Find(id);
			db.PDFs.Remove(pDF);
			db.SaveChanges();
			return RedirectToAction("Index");
		}
        [HttpPost]
        public ActionResult EditFacebookPDFTitle(int id, string text)
        {
            PDF pdf = db.PDFs.Find(id);
            pdf.FacebookTitle = text;
            db.SaveChanges();
            return Json("success");
        }
        [HttpPost]
        public ActionResult EditFacebookPDFDescription(int id, string text)
        {
            PDF pdf = db.PDFs.Find(id);
            pdf.FacebookDescription = text;
            db.SaveChanges();
            return Json("success");
        }

        public ActionResult GetTempPic(string id)
        {
            var dir = ConfigurationManager.AppSettings["pdfUploadSpot"] + @"\tempPics\";
            var path = Path.Combine(dir, id); //validate the path for security or use other means to generate the path.
            return File(path, "image/png");
        }

        [HttpPost]
		public async Task<ActionResult> PDFtoImage(string fileurl, int maxWidth)
		{
			string websitePath = ConfigurationManager.AppSettings["portalPath"];
			string LogFilePath = ConfigurationManager.AppSettings["logFilePath"];
			var sr = new StreamWriter(LogFilePath + "pdfToImage.log");
            string timestampedPDF = "error.pdf";
			sr.AutoFlush = true;
			string outwardPath = "";
            string currentPDFPath = "";
            List<string> PathedArray = new List<string>();
			try
			{

				sr.WriteLine("fileurl = " + fileurl);

				sr.WriteLine("beforeInput");
				string inputPath = ConfigurationManager.AppSettings["pdfUploadSpot"] + @"\" + fileurl;


				sr.WriteLine("beforeoutput");
				string filename = "tempImage" + UniqueNames.GetTimestamp(DateTime.Now) + ".jpg";
				string outputPath = ConfigurationManager.AppSettings["pdfUploadSpot"] + @"\tempPics\" + filename;

				sr.WriteLine("inputpath = " + inputPath);
				sr.WriteLine("outputpath = " + outputPath);
                
                List<string> outwardPaths = new List<string>();
                for (int i = 1; i < 4; i++)
                {
                    outputPath = outputPath.Replace(".jpg", i + ".jpg");
                    GhostscriptWrapper.GeneratePageThumb(inputPath, outputPath, i, 120, 120);
                    if(!System.IO.File.Exists(outputPath))
                    {
                        break;
                    }
                    
                    outwardPaths.Add(outputPath);
                }

                foreach(var path in outwardPaths)
                {
                    ScaleImage(path, maxWidth, 3000);
                
                    string newPath = path.Substring(path.LastIndexOf('\\') + 1);
                    newPath = ConfigurationManager.AppSettings["portalPath"] + @"/pdfs/gettemppic/" + newPath;
                    PathedArray.Add(newPath);
                }

                currentPDFPath = inputPath;
                timestampedPDF = DateTime.Now.GetTimestamp() + fileurl;
                string archivePath = ConfigurationManager.AppSettings["pdfArchive"] + @"\PDFs\" + timestampedPDF;

                //PDFParser parser = new PDFParser();
                //string result = parser.ExtractText(currentPDFPath);
                //moving file
                sr.WriteLine("Current PDF Path:"+currentPDFPath);
                sr.WriteLine("Archive PDF Path:" + archivePath);
                //System.IO.File.Move(currentPDFPath, archivePath);
                
            }
			catch (Exception e)
			{
				sr.WriteLine("message = " + e.Message);
				sr.WriteLine("stacktrace = " + e.StackTrace);
			}
            sr.Close();

            Task.Factory.StartNew(() =>
            {
                UploadPDFToAzure(currentPDFPath, timestampedPDF);
            });
          
            return Json(new { PathedArray, timestampedPDF });
            
		}

       public void UploadPDFToAzure(string PDFPath, string pdfName)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("pdfs");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(pdfName);
            blockBlob.UploadFromFile(PDFPath);
            blockBlob.Properties.ContentType = "application/pdf";
            blockBlob.SetProperties();
        }

		[HttpPost]
		public ActionResult cropImage(string imagePath, string pdfPath, int leftX, int leftY, int width, int height, int serviceId, string title, string allImagePaths)
		{
			// TODO: Pathing!
			string uniqueName = "";
			string LogFilePath = ConfigurationManager.AppSettings["logFilePath"];
			var sr = new StreamWriter(LogFilePath + "pdfconvert.log");
			sr.AutoFlush = true;
			bool success = true;
        
			try
			{

				sr.WriteLine("Orignal Image Path: " + imagePath);
				int lastSlash = imagePath.LastIndexOf('/');
				string serverImagePath = ConfigurationManager.AppSettings["pdfUploadSpot"] + @"\tempPics\" + imagePath.Substring(lastSlash + 1);
				sr.WriteLine("SeverImagePath = " + serverImagePath);
				sr.WriteLine("leftx = " + leftX.ToString());
				sr.WriteLine("lefty = " + leftY.ToString());
				sr.WriteLine("width = " + width.ToString());
				sr.WriteLine("height = " + height.ToString());
				sr.WriteLine("Before src");
				Bitmap src = Image.FromFile(serverImagePath) as Bitmap;
				if (leftX == 0 && leftY == 0 && width == 0 && height == 0)
				{
					//Do nothing but set width and height
					width = src.Width;
					height = src.Height;
				}

				Rectangle cropRect = new Rectangle(leftX, leftY, width, height);


				sr.WriteLine("after src");
				Bitmap target = new Bitmap(cropRect.Width, cropRect.Height);
				//Bitmap target = new Bitmap(10, 20);

				sr.WriteLine("Before using graphics");

				using (Graphics g = Graphics.FromImage(target))
				{
					sr.WriteLine("Before draw");

					g.DrawImage(src, new Rectangle(0, 0, target.Width, target.Height), cropRect, GraphicsUnit.Pixel);

				}
				sr.WriteLine("Before save");

				uniqueName = UniqueNames.GetTimestamp(DateTime.Now) + ".jpg";
				string savePath = ConfigurationManager.AppSettings["pdfArchive"] + @"\Thumbnails\" + uniqueName;
				sr.WriteLine("Save Path: " + savePath);
              
                target.Save(savePath);
                src.Dispose();
                
                target.Dispose();

                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConfigurationManager.AppSettings["StorageConnectionString"]);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("pdf-thumbnails");
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(uniqueName);
                blockBlob.UploadFromFile(savePath);
                blockBlob.Properties.ContentType = "image/jpeg";
                blockBlob.SetProperties();
              
                
			}
			catch (Exception e)
			{
				sr.WriteLine("Error message= " + e.Message);
				//sr.WriteLine("INNER message = " + e.InnerException.Message);
				sr.WriteLine("Stacktrace = " + e.StackTrace);
				success = false;

			}
			sr.Close();
			Service service = db.Services.Find(serviceId);
			PDF dbPdf = new PDF();
			if(service.PDF == null)
			{
				dbPdf.ServiceId = serviceId;
			    dbPdf.ThumbnailPath = uniqueName;
			    dbPdf.PDFPath = pdfPath;
			    dbPdf.TitleText = title;
				db.Entry(dbPdf).State = EntityState.Added;
				db.SaveChanges();
			}
			else
			{
				service.PDF.ThumbnailPath = uniqueName;
				service.PDF.PDFPath = pdfPath;
				service.PDF.TitleText = title;
                db.Entry(service.PDF).State = EntityState.Modified;
				db.SaveChanges();
			}
			string safePdf = pdfPath.Replace(" ", "%20");
			string safeUniqueName = uniqueName.Replace('\\', '/');
			string outwardPdfPath = ConfigurationManager.AppSettings["portalPath"] + @"/pdfs/displaypdf/" + serviceId;
            var userId = User.Identity.GetUserId();
            if(userId!=null)
            {
                FuneralHome fh = db.FuneralHomes.Where(x => x.UserId == userId).FirstOrDefault();
                if(fh!=null)
                {
                    if(fh.Setting.SEOFriendlyPDF==false)
                    {
                        outwardPdfPath = ConfigurationManager.AppSettings["portalPath"] + @"/pdfs/servepdf/" + serviceId;
                    }
                }
            }
			string outwardThumbnail = ConfigurationManager.AppSettings["portalPath"] + @"/pdfs/displaythumbnail/"+ serviceId;

            allImagePaths = allImagePaths.Substring(2);
            allImagePaths = allImagePaths.Remove(allImagePaths.Length - 2);
            allImagePaths = allImagePaths.Replace("]", "");
            allImagePaths = allImagePaths.Replace(@"\", "");
            allImagePaths = allImagePaths.Replace("\"", "");
            string[] allPaths = allImagePaths.Split(',');
            
            
            

            if (allPaths != null)
            {
                foreach (string imageToBeDeleted in allPaths)
                {
                    int slashPos = imagePath.LastIndexOf('/');
                    string serverImagePath = ConfigurationManager.AppSettings["rootPath"] + @"\UploadedPDFs\tempPics\" + imageToBeDeleted.Substring(slashPos + 1);
                    if (System.IO.File.Exists(serverImagePath))
                    {
                        
                        System.IO.File.Delete(serverImagePath);
                    }

                }
            }
			//Save to DB
	
			return Json(new { outwardPdfPath, outwardThumbnail, success });
		}
        //Scale's the image 
        public static void ScaleImage(string imagePath, int maxWidth, int maxHeight)
        {
            var image = Image.FromFile(imagePath);
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);
            Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);
           string tempImage = imagePath.Substring(0, imagePath.Length -4)+"scaled.jpg";
            newImage.Save(tempImage);
            image.Dispose();
            
            System.IO.File.Delete(imagePath);
            System.IO.File.Move(tempImage, imagePath);
            System.IO.File.Delete(tempImage);
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
}
