using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;
using VideoManager.Controllers;

namespace VideoManager.Models.ViewModels
{
	public class MassEmailViewModel
	{

        [Display(Name = "From Email"), EmailAddress(ErrorMessage = "Not a valid email address."), Required]
		public string FromEmail { get; set; }
		[Required]
		public string Subject { get; set; }
		[Required]
		public string Html { get; set; }

        public IList<VideoManager.Controllers.EmailController.FuneralHomeMail> Homes { get; set; }


	
	}
}