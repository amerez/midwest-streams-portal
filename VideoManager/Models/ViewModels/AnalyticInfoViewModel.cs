using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.ViewModels
{
	public class AnalyticInfoViewModel
	{
        public double AllServiceAvgViews { get; set; }
        public double AvgViews30 { get; set; }
        public double AvgViews40 { get; set; }
        public double AvgViews50 { get; set; }
        public double AvgViews60 { get; set; }
        public double AvgViews70 { get; set; }

        public string PopularDeathDay { get; set; }
        public string PopularServiceDay { get; set; }
        public double AvgAge { get; set; }
        public double DaysBetweenDeathAndService { get; set; }

        
	}
}