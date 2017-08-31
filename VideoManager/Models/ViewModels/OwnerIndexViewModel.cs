using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.ViewModels
{
	//List of relevant info pulled from funeralhome
	public class OwnerIndexViewModel
	{

		public int Id { get; set; }
		public string HomeName { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public string LastName { get; set; }
		public int TotalServices { get; set; }
		public int MonthlyServices { get; set; }
		public int VideoViews { get; set; }
		public int PDFViews { get; set; }
        public int PageViews { get; set; }

        public int NumberOfPdfs { get; set; }

        public int NumberOfVideos { get; set; }
		public PaymentStatus HasPaid { get; set; }

	
	}
}