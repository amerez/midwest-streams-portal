using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{

	public class VideoQueue
	{
		public int Id { get; set; }
        public int VideoId { get; set; }
    
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
		public DateTime? CreateDate { get; set; }

        public string BlobPath { get; set; }
        public int AssignedVM { get; set; }
        public string VMName { get; set; }

        public string ResourceGroupName { get; set; }
 
        public virtual VideoQueueStatus? VideoStatus { get; set; }

        public VideoQueType VideoQueType { get; set; }
    }
}