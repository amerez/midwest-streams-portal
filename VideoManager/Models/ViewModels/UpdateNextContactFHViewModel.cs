using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.Data;

namespace VideoManager.Models.ViewModels
{
	//List of relevant info pulled from funeralhome
	public class UpdateNextContactFHViewModel
	{
        public int Id { get; set; }
        public virtual CRMFuneralHome CRMFuneralHome { get; set; }

        public int CRMFuneralHomeId { get; set; }
        public string NextContactByUserName { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "Next Contact Date")]
        public DateTime NextContactDate { get; set; }
        [Display(Name = "Next Contact Notes")]
        public string NextContactNotes { get; set; }
        [Display(Name = "Number of Contacts")]
        public int NumberOfContacts { get; set; }

        [Display(Name = "How should we contact them next")]
        public string NextContactType { get; set; }
      
	
	}
}