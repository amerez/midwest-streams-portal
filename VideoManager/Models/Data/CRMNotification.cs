using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class CRMNotification
    {
		public int Id { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public string Link { get; set; }
        public string IconClass { get; set; }
        public string SpanClass { get; set; }

        public DateTime NotifyDate { get; set; }

    }
}