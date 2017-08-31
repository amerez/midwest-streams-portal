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
	public class OrderDownloadViewModel
	{
        public int ServiceId { get; set; }
        [Required]
		public string FirstName { get; set; }
        [Required]
		public string LastName { get; set; }
        public string StripeId { get; set; }
        public string Errors { get; set; }

    }
	


    
}