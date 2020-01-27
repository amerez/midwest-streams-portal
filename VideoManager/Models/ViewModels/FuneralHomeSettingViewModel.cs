using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.ViewModels
{
	public class FuneralHomeSettingViewModel
	{

		public int FuneralHomeId { get; set; }
		public string LogoPath { get; set; }
		public WebsiteProvider WebsiteProvider { get; set; }
		public string SlatePath { get; set; }

		[Display(Name = "Funeral Home Name"), Required]
		public string Name { get; set; }
		[Display(Name = "Address 1")]
		public string Address1 { get; set; }
		[Display(Name = "Address 2")]
		public string Address2 { get; set; }
		[UIHint("City"), Required]
		public string City { get; set; }
		[UIHint("State"), Required]
		public string State { get; set; }
		[Display(Name = "Zip Code"), RegularExpression(@"(?:\d{5}-\d{4})|(?:\d{5})", ErrorMessage = "Not a valid zip code"), Required]
		public int ZipCode { get; set; }
		[Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
		public string Email { get; set; }
        public bool DisplayTutorials { get; set; }
        [Display(Name = "Display PDF In New Tab")]
        public bool NewTabPdf { get; set; }
        [Display(Name = "Primary Contact")]
        public string PrimaryContact { get; set; }
        [Display(Name = "Primary Contact Phone Number")]
        public string PrimaryContactPhoneNumber { get; set; }
        [Display(Name = "Primary Contact Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string PrimaryContactEmail { get; set; }
        [Display(Name = "Funeral Home Phone Number")]
        public string FuneralHomeNumber { get; set; }
        [Display(Name="Search Engine Friendly PDFs")]
        public bool SearchEngineFriendlyPDF { get; set; }
        
        [Display(Name = "Hide Logo on Video Player")]
        public bool WhiteLabel { get; set; }

        [Display(Name = "Azure VM Size")]
        public Dictionary<string, string> AzureVMSize { get; set; }

        public string SelectedAzureVM { get; set; }

        public bool DVDForSale { get; set; }
    }
	


    
}