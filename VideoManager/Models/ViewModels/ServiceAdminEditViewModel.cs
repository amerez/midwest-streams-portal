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
	public class ServiceAdminEditViewModel
	{
        public int ServiceId { get; set; }
        [Required]
		public string FirstName { get; set; }
        [Required]
		public string LastName { get; set; }
		[Display(Name = "Obituary")]
		public string Obituary { get; set; }
		[Display(Name = "Contact Email")]
		public string ContactEmail { get; set; }
		[Display(Name = "Address 2")]
		public DateTime Birthday { get; set; }
		public DateTime DeathDay { get; set; }
        public bool IsSecured { get; set; }
        public DateTime ServiceDate { get; set; }
        public string ConvertedFilePath { get; set; }
		public VideoStatus? Status { get; set; }
        public int? OldVideoId { get; set; }
	}
	


    
}