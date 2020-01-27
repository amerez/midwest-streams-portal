using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
	public class Setting
	{

		[Key, ForeignKey("FuneralHome")]

		public int FuneralHomeId { get; set; }
		public string LogoPath { get; set; }
		public WebsiteProvider WebsiteProvider { get; set; }
		public string SlatePath { get; set; }
		public virtual FuneralHome FuneralHome { get; set; }
        public bool DisplayTutorial { get; set; }
        public bool NewTabPdf{ get; set; }
        public bool SEOFriendlyPDF { get; set; }
        public bool WhiteLabel { get; set; }
        public string AzureVMSize { get; set; }
        public bool DVDForSale { get; set; }

    }
	


    
}