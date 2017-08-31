using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class EditCRMFuneralHomeViewModel
    {
		public int Id { get; set; }

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
		public string ZipCode { get; set; }
		
        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
		public string Email { get; set; }

        [Display(Name = "Funeral Home Phone Number"), Phone(ErrorMessage="Please enter a valid phone number")]
        public string FuneralHomeNumber { get; set; }
		
        [Display(Name = "Website Address"), Required]
		public string Website { get; set; }
        [Display(Name = "Currently Has A Camera")]
        public bool HasCamera { get; set; }
        [Display(Name = "Currently Is Recording Services")]
        public bool IsRecording { get; set; }
        [Display(Name="Notes about previous webcasting")]
        public string WebcastingHistoryNotes { get; set; }
        [Display(Name="Website Provider")]
        public WebsiteProvider WebsiteProvider { get; set; }

        [Display(Name="Currently Has Memorial Folders")]
        public bool HasMemorialFolders { get; set; }
        [Display(Name="Pdf Publishing Software")]
        public PDFPublishingSoftware PDFPublishingSoftware { get; set; }
        [Display(Name="PDF Notes")]
        public string PDFNotes { get; set; }
        public LeadWarmth LeadWarmth { get; set; }
        [Display(Name="Ownership Type")]
        public OwnershipType OwnershipType { get; set; }
        //Only filled out for single or family ownership, so that way we dont have to create an owner for everyhome
        [Display(Name="Owners First Name")]
        public string OwnerFirstName { get; set; }
        [Display(Name = "Owners Last Name")]
        public string OwnerLastName { get; set; }
        public int? CRMOwnerId { get; set; }
        public virtual CRMOwner CRMOwner { get; set; }

        [Display(Name="Estimated Calls Per Year")]
        public int EstimatedCallsPerYear { get; set; }
        [Display(Name="Has A User Login")]
        public bool HasAUserLogin { get; set; }
        public string BannerImage { get; set; }
        public int? PrimaryCRMContactId { get; set; }

    }
}