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
	public class CompareViewModel
	{
        public decimal AvgMonthlyCalls { get; set; }
        public decimal CompetitorMonthlyCalls { get; set; }
        public double AvgAge { get; set; }
        public double CompetitorAvgAge { get; set; }
        public string CompetiveLineChartMonthly { get; set; }

	}
}