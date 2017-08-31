using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CWFuneralHome
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
		
        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
		public string Email { get; set; }

        [Display(Name = "Funeral Home Phone Number"), Phone(ErrorMessage="Please enter a valid phone number")]
        public string FuneralHomeNumber { get; set; }
		
        [Display(Name = "Website Address"), Required]
		public string Website { get; set; }

        [Display(Name="Website Provider")]
        public WebsiteProviderCW WebsiteProvider { get; set; }

        [Display(Name="Estimated Calls Per Year")]
        public int EstimatedCallsPerYear { get; set; }
        public string FacebookPage { get; set; }
        public string StaffPageURL { get; set; }
        public double CityPopulation { get; set; }
        [Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }
        public virtual ICollection<CWStaff> CWStaff { get; set; }
        public virtual ICollection<CWObituary> CWObituary { get; set; }
        public int? FuneralHomeId { get; set; }
        public virtual FuneralHome FuneralHome { get; set; }
        public string BannerImage { get; set; }

    }
}