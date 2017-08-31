using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CRMSatelliteLocation
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
        public virtual CRMFuneralHome CRMFuneralHome { get; set; }
        public int CRMFuneralHomeId { get; set; }

		[Display(Name = "Satellite Location Name")]
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

        [Display(Name = "Satellite Location Phone Number"), Phone(ErrorMessage="Please enter a valid phone number")]
        public string FuneralHomeNumber { get; set; }
		
      
        [Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }

        public bool DevHome { get; set; }


    }
}