using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
	public class PDF
	{
		[Key, ForeignKey("Service")]
		public int ServiceId { get; set; }
		public bool IsDeleted { get; set; }
		
		public string PDFPath { get; set; }
		public string ThumbnailPath { get; set; }
		public string TitleText { get; set; }
		public string Style { get; set; }
		public string GoogleAnalytics { get; set; }
		public int PageHits { get; set; }
		public virtual Service Service { get; set; }

        public string FacebookTitle { get; set; }
        public string FacebookDescription { get; set; }

	}
}