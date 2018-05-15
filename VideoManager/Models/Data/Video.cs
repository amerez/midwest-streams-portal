using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
    public enum VideoStatus
    {
        Created = 1,
        UploadStarted = 2,
        UploadFinished = 4,
        ConversionStarted = 8,
        ConversionFinished = 16,
        Error = 32,
        WaitingInQue = 64,
        UploadError = 128
    }
	public class Video
	{
		[Key, ForeignKey("Service")]

		public int ServiceId { get; set; }
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
		public DateTime? CreateDate { get; set; }

		public TimeSpan? Duration { get; set; }
		public TimeSpan? Start { get; set; }
		public TimeSpan? Stop { get; set; }
		public string FilePath { get; set; }
		public string ImagePath { get; set; }
		public string ConvertedFilePath { get; set; }
		public virtual VideoStatus? Status { get; set; }
		public bool Deleted { get; set; }
		public int PageHits { get; set; }
		public string ClosedCaptioning { get; set; }
		public string SlatePath { get; set; }
		public virtual ICollection<Analytic> Analytics { get; set; }
		public string DisplayFileName { get; set; }
		public virtual Service Service { get; set; }
        public double TotalRawFileSize { get; set; }
        public double ConvertedFileSize { get; set; }
        public DateTime? UploadStartTime { get; set; }
        public DateTime? UploadEndTime { get; set; }
        public TimeSpan? TimeInQue { get; set; }
        public TimeSpan? TimeUploading { get; set; }
        public TimeSpan? TimeEncoding { get; set; }
        public TimeSpan? TotalProcessTime { get; set; }

        public DateTime? EncodeStartTime { get; set; }

        public DateTime? EncodeEndTime { get; set; }

        public int? OldVideoId { get; set; }
        public bool HasSlate { get; set; }

        //[NotMapped]
        //public string FamilyUsername { get; set; }
        //[NotMapped]
        //public string FamilyEmail { get; set; }
        //[NotMapped]
        //public string FamilyPassword { get; set; }
        //[NotMapped]
        //public string ViewingUsername { get; set; }
        //[NotMapped]
        //public string ViewingPassword { get; set; }

        //Jeff are we using this?
        //public int QueuePosition(ApplicationDbContext db)
        //{
        //    List<int> ids = db.Videos.Where(v => v.Status == VideoStatus.UploadFinished).OrderBy(v => v.CreateDate).Select(v => v.Service.Id).ToList();
        //    if (ids == null)
        //        return -1;
        //    else
        //        return ids.IndexOf(this.Service.Id);
        //}
    }
}