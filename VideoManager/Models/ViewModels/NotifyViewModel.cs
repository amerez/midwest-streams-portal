using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;

namespace VideoManager.Models.ViewModels
{
	public class NotifyViewModel
	{
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		public int ServiceId { get; set; }

		public bool IsSecured { get; set; }
		[Display(Name = "Family Contact Email"), EmailAddress(ErrorMessage = "Not a valid email address."), Required]
		public string ContactEmail { get; set; }
		[Display(Name = "Your Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
		public string FromEmail { get; set; }
		[Required]
		public string ContactName { get; set; }

		[StringLength(1500, MinimumLength = 0)]
		public string Message { get; set; }
        [Required, Display(Name = "Service Link")]
        public string ServiceUrl { get; set; }
	
	}
}