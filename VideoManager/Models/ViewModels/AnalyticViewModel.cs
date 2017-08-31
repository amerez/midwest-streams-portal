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
	public class AnalyticViewModel
	{
        [Display(Name = "Today's Views")]
        public int TodayViews { get; set; }

        [Display(Name = "Week Views")]
        public int WeekViews { get; set; }
        
        [Display(Name = "Month Views")]
        public int MonthViews { get; set; }

        public double AverageAge { get; set; }

        [Display(Name = "Average Minutes Watched")]
        public double AverageMinWatched { get; set; }

        [Display(Name = "Total Minutes Watched")]
        public double TotalMinWatched { get; set; }

        public int TotalAverageMin { get; set; }

        public int MajorTick { get; set; }

        public int MinorTick { get; set; }

        [Display(Name = "Average Duration")]
        public double AverageDuration { get; set; }

        [Display(Name = "Total Video Views")]
        public int TotalVideoViews { get; set; }

        [Display(Name = "Total Funeral Videos")]
        public int TotalFuneralVideos { get; set; }

        [Display(Name = "Total Funeral PDFs")]
        public int TotalFuneralPDFs { get; set; }

        [Display(Name = "Services With Videos")]
        public double FuneralsWithVideos { get; set; }

        [Display(Name = "Services With PDFs")]
        public double FuneralsWithPDFs { get; set; }

        [Display(Name = "Services With Both")]
        public double FuneralsWithBoth { get; set; }

        public string DayTimeRange { get; set; }

        public string DayViewsArray { get; set; }

        public string MonthTimeRange { get; set; }

        public string MonthViewsArray { get; set; }

        public string YearTimeRange { get; set; }

        public string YearViewsArray { get; set; }


        public double AverageDistanceFromFuneral { get; set; }
        public List<string> IpAddresses { get; set; }
        public List<IpAddressObject> Details { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

	}
    public class AnalyticDashboardViewModel
    {
        [Display(Name = "Today's Views")]
        public int TodayViews { get; set; }

        [Display(Name = "Week Views")]
        public int WeekViews { get; set; }

        [Display(Name = "Month Views")]
        public int MonthViews { get; set; }

        public double AverageAge { get; set; }

        [Display(Name = "Average Minutes Watched")]
        public double AverageMinWatched { get; set; }

        [Display(Name = "Total Minutes Watched")]
        public double TotalMinWatched { get; set; }

        public int TotalAverageMin { get; set; }

        public int MajorTick { get; set; }

        public int MinorTick { get; set; }

        [Display(Name = "Average Duration")]
        public double AverageDuration { get; set; }

        [Display(Name = "Total Video Views")]
        public int TotalVideoViews { get; set; }

        [Display(Name = "Total Funeral Videos")]
        public int TotalFuneralVideos { get; set; }

        [Display(Name = "Total Funeral PDFs")]
        public int TotalFuneralPDFs { get; set; }

        [Display(Name = "Services With Videos")]
        public double TotalFuneralsWithVideos { get; set; }
        public double MonthlyFuneralsWithVideos { get; set; }

        [Display(Name = "Services With PDFs")]
        public double FuneralsWithPDFs { get; set; }

        [Display(Name = "Services With Both")]
        public double FuneralsWithBoth { get; set; }

        public string DailySeries { get; set; }

        public string MonthlySeries { get; set; }

        public string YearlySeries { get; set; }

        public List<FuneralHome> LowUsageHomes { get; set; }

        public double AverageDistanceFromFuneral { get; set; }
        public List<string> IpAddresses { get; set; }
        public List<IpAddressObject> Details { get; set; }
        public string ServicesBarChartArray { get; set; }
        public List<CRMContact> NeedsToBeContacted { get; set; }
        public string PopularHomeOfTheWeek { get; set; }
        public string PopularHomeOfTheWeekImage { get; set; }

        public int PopularHomeNumOfViews { get; set; }
    }
}