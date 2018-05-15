using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
    public class Service
    {
        //[Key, ForeignKey("FuneralHome")]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }

        public virtual FuneralHome FuneralHome { get; set; }
        public int FuneralHomeId { get; set; }
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime Birthday { get; set; }
        [Required]
        [Display(Name = "Date of Death")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime DeathDay { get; set; }
        [Required]
        [Display(Name = "Service Date")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime ServiceDate { get; set; }
		[Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }
        public bool IsSecured { get; set; }
    
        [MaxLength(50)]
        public string VideoTitle { get; set; }   
        [Display(Name = "Family Contact Email"), EmailAddress(ErrorMessage = "Not a valid email address.")]
        public string ContactEmail { get; set; }
		public virtual ApplicationUser ViewingUser { get; set; }
        public string ViewingUserId { get; set; }
        [StringLength(8192, MinimumLength = 0)]
        public string Obituary { get; set; }
       
        public string PhotoPath { get; set; }

        //Yes I know this is a horrible way to keep a password.
        //But we are emailing out the password anyways, and the content it's protecting is already
        //accessible via videos.midweststreams.com 
        public string ViewingPassword { get; set; }
        public int PageHits { get; set; }
		public int? PDFId { get; set; }
        public virtual PDF PDF { get; set; }
		public int? VideoId { get; set; }
        public virtual Video Video { get; set; }
        public virtual ICollection<DownloadAnalytic> DownloadAnalytics { get; set; }

        public int? LiveStreamId { get; set; }

        public virtual LiveStream LiveStream { get; set; }
        public bool HasSlate { get; set; }


    }
}