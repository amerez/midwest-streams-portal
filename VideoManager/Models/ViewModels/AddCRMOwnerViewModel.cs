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
	public class AddCRMOwnerViewModel
	{

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
        public int FirstFuneralHomeId { get; set; }
         [Display(Name = "First Name"), Required]
        public string PrimaryContactFirstName { get; set; }
        [Display(Name = "Last Name"), Required]
        public string PrimaryContactLastName { get; set; }
        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string PrimaryContactEmail { get; set; }
        [Display(Name = "Position")]
        public ContactPosition ContactPosition { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "First Contact Date")]
        public DateTime FirstContactedDate { get; set; }
        [Display(Name = "Estiamted # of Homes")]
        public int EstimatedNumberOfHomes { get; set; }
       
	
	}
}