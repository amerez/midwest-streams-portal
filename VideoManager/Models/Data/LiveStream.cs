using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
	public class LiveStream
	{
		[Key, ForeignKey("Service")]
		public int ServiceId { get; set; }
		public bool IsDeleted { get; set; }
		
		public string SourceURL { get; set; }
		public virtual Service Service { get; set; }
        public string StreamId { get; set; }

        public bool Started { get; set; }

        public Guid StartStreamAccessToken { get; set; }
	}
}