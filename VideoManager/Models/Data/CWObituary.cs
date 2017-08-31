using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CWObituary
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public virtual CWFuneralHome CWFuneralHome { get; set; }
        public int CWFuneralHomeId { get; set; }

        [Display(Name = "First Name"), Required]
        public string FirstName { get; set; }
        [Display(Name = "Middle Name")]
        public string MiddleName { get; set; }

        [Display(Name = "Last Name"), Required]
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string ObitURL { get; set; }
        public int Age { get; set; }
        public string ServiceDay { get; set; }
        public DateTime? BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }
        public DateTime? ServiceDate { get; set; }

        [Display(Name = "Obit Text")]
        public string ObituaryText { get; set; }

        [Display(Name = "Picture URL")]
        public string PictureURL { get; set; }

        [Display(Name = "Create Date")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }



    }
}