using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;

namespace VideoManager.Models.ViewModels
{
	public class RenderViewModel
	{
        public bool FoundVideoToRender { get; set; }
        public int ServiceId { get; set; }
        public string FuneralHomeName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Start { get; set; }
        public int Duration { get; set; }
        public string RawFileNames { get; set; }
        public string  ConvertedFileName { get; set; }
        public int VideoQueId { get; set; }

        public DateTime ServiceDate { get; set; }

        public string ResourceGroupName { get; set; }



    }
}