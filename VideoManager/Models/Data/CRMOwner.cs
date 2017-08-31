using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CRMOwner
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }

		[Display(Name = "Company Name"), Required]
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

		[Display(Name = "Corporate Office Phone"), RegularExpression(@"\b(?:\d{3}[-.]?)?\d{3}[-.]?\d{4}\b", ErrorMessage = "Not a valid phone number."), Phone(ErrorMessage = "Not a valid phone number.")]
		public string PhoneNumber { get; set; }

        public virtual ICollection<CRMFuneralHome> CRMFuneralHomes { get; set; }

        public virtual ICollection<CRMOwnerContact> CRMOwnerContacts { get; set; }
        public virtual CRMOwnerContact PrimaryCRMOwnerContact { get; set; }
        public int? PrimaryCRMOwnerContactId { get; set; }
		[Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }
        [Display(Name="Estiamted # of Homes")]
        public int EstimatedNumberOfHomes { get; set; }
	

    }
}