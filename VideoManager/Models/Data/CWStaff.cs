using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CWStaff
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public virtual CWFuneralHome CWFuneralHome { get; set; }
        public int CWFuneralHomeId { get; set; }

        [Display(Name = "First Name"), Required]
        public string FirstName { get; set; }
        [Display(Name = "Last Name"), Required]
        public string LastName { get; set; }

        [Display(Name = "Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string Email { get; set; }

        public string PictureURL { get; set; }

        [Display(Name = "Twitter Handle")]
        public string TwitterHandle { get; set; }
        [Display(Name = "Facebook ID")]
        public string FacebookId { get; set; }
        [Display(Name = "Create Date")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }
        public string Bio { get; set; }
        public ContactPosition ContactPosition { get; set; }

    }
}