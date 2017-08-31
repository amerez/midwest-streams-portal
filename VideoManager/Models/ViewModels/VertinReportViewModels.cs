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
	public class VertinReportViewModel
	{
        public FuneralHome FuneralHome { get; set; }
        public int VideoCount { get; set; }
        public int PDFCount { get; set; }

        public int TotalPDFViews { get; set; }

    }
}