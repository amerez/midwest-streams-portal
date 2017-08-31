using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.ViewModels
{
    public class FuneralHomeHighlightViewModel
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }

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
        [Display(Name = "Address Confirmed"), UIHint("We don't want to send physical to an adress that isn't 100% Correct. Only check this box if you are sure the mailing address is corect")]
        public bool AddressConfirmed { get; set; }
		
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
		
        [Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }
        public virtual ICollection<CRMContact> CRMContact { get; set; }
        public virtual CRMContact PrimaryCRMContact { get; set; }
        public int? PrimaryCRMContactId { get; set; }
        public virtual ICollection<CRMSatelliteLocation> SatelliteLocations { get; set; }
        public bool DevHome { get; set; }
        public int? FuneralHomeId { get; set; }
        public virtual FuneralHome FuneralHome { get; set; }
        public string BannerImage { get; set; }

        public string NextContactByUserName { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "Next Contact Date")]
        public DateTime NextContactDate { get; set; }
        [Display(Name = "Next Contact Notes")]
        public string NextContactNotes { get; set; }
        [Display(Name = "Number of Contacts")]
        public int NumberOfContacts { get; set; }

        [Display(Name = "How should we contact them next")]
        public string NextContactType { get; set; }
        public virtual List<CRMFuneralHomeHistory> CRMFuneralHomeHistory { get; set; }

        public int ServicesThisMonth { get; set; }

        public int TotalServices { get; set; }
        public DateTime LastService { get; set; }

        public string PaymentStatus { get; set; }
    }
}