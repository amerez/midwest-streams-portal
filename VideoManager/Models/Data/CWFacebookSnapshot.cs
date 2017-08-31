using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CWFacebookSnapshot
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
        public virtual CWFuneralHome CWFuneralHome{ get; set; }
        public int CWFuneralHomeId { get; set; }
        public int NumberOfUSLikes { get; set; }
        public int NumberOfOtherLikes { get; set; }
        public int PageEngagmentScore { get; set; }
        public string MostPopularFacebookPostID { get; set; }
		[Display(Name = "Create Date")]
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime CreateDate { get; set; }


    }
}