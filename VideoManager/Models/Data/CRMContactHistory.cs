using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CRMContactHistory
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
        public virtual CRMContact CRMContact{ get; set; }
        public int? CRMContactId { get; set; }
        public virtual CRMOwnerContact CRMOwnerContact { get; set; }
        public int? CRMOwnerContactId { get; set; }
        public string LastContactNotes { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}"), Display(Name = "Last Contact Date")]
        public DateTime LastContactedDate { get; set; }
        [Display(Name = "Last Contacted By")]
        public string LastContactedByUserName { get; set; }
        public ContactType ContactType { get; set; }
        public virtual ICollection<CRMContactHistoryComment> CRMContactHistoryComments { get; set; }
        public int PostRating { get; set; }
        public bool IsNote { get; set; }


    }
}