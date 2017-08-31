using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CRMContactHistoryComment
    {
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
        public virtual CRMContactHistory CRMContactHistory{ get; set; }
        public int? CRMContactHistoryId { get; set; }

        public string Comment { get; set; }

        public DateTime CommentDate { get; set; }
        [Display(Name = "Last Contacted By")]
        public string UserName { get; set; }
        //public ICollection<ApplicationUser> UsersWhoLiked { get; set; }
        

    }
}