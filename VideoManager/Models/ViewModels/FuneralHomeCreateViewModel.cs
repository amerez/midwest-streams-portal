﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.ViewModels
{
	public class FuneralHomeCreateViewModel
	{

		public int FuneralHomeId { get; set; }
		public string LogoPath { get; set; }
		[Display(Name = "Website Provider")]
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
		[Display(Name = "Login Name"), Required]
		public string UserName { get; set; }
		public int? OwnerId { get; set; }
		[Display(Name = "Funeral Home Owner")]
		public virtual Owner Owner { get; set; }
		public PaymentStatus PaymentStatus { get; set; }
        [Display(Name = "Primary Contact")]
        public string PrimaryContact { get; set; }
        [Display(Name = "Primary Contact Phone Number")]
        public string PrimaryContactPhoneNumber { get; set; }

        [Display(Name = "Primary Contact Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string PrimaryContactEmail { get; set; }
        [Display(Name = "Funeral Home Phone Number")]
        public string FuneralHomeNumber { get; set; }
        [Display(Name="Dev Home(Will be ignored from analyitcs")]
        public bool DevHome { get; set; }


	}
	


    
}