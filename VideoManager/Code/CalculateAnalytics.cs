using iTextSharp.text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Code
{

    public class CalculateAnalytics
    {
        public AnalyticInfoViewModel GetAverageViewsPerService(List<Analytic> Analytics, List<Service> Services)
        {
            List<int> ServiceIds = new List<int>();
            int devServices = 0;
            List<ServiceAnalytic> sa = new List<ServiceAnalytic>();
            foreach (Analytic analytic in Analytics)
            {
                if (sa.Where(a => a.ServiceId == analytic.VideoId).Count() == 0)
                {
                    ServiceAnalytic serva = new ServiceAnalytic();

                    if (analytic.VideoId != null)
                    {
                        Service dbService = Services.Where(s => s.Id == analytic.VideoId).FirstOrDefault();
                        double lifeSpan = 0;
                        if (dbService != null)
                        {
                            if (dbService.FuneralHome.DevHome == true)
                            {
                                devServices++;
                            }
                            lifeSpan = dbService.DeathDay.Year - dbService.Birthday.Year;
                            double totaldays = (dbService.Birthday - dbService.DeathDay).TotalDays;

                            //Could've been a baby, but most likely bad data
                            if (lifeSpan > 1)
                            {
                                serva.Age = lifeSpan;
                            }
                            else
                            {
                                serva.Age = 0;
                            }

                        }
                        serva.ServiceId = analytic.VideoId;
                        serva.Views = 1;

                        sa.Add(serva);
                    }

                }
                else
                {
                    ServiceAnalytic service = sa.Where(s => s.ServiceId == analytic.VideoId).FirstOrDefault();
                    if (service != null)
                    {
                        service.Views = service.Views + 1;
                    }

                }

            }
            double totalViews = sa.Sum(s => s.Views);

            double totalService = sa.Count();
            double averageServiceViews = Math.Round(totalViews / totalService, 0);
            double bla = devServices;
            List<ServiceAnalytic> ServicesUnder30 = sa.Where(a => a.Age < 30 && a.Age != 0).ToList();
            List<ServiceAnalytic> ServicesUnder40 = sa.Where(a => a.Age < 40 && a.Age != 0).ToList();
            List<ServiceAnalytic> ServicesUnder50 = sa.Where(a => a.Age < 50 && a.Age != 0 && a.Age > 40).ToList();
            List<ServiceAnalytic> ServicesUnder60 = sa.Where(a => a.Age < 60 && a.Age != 0 && a.Age > 50).ToList();
            List<ServiceAnalytic> ServicesOver60 = sa.Where(a => a.Age != 0 && a.Age > 60).ToList();

            AnalyticInfoViewModel avim = new AnalyticInfoViewModel();
            avim.AllServiceAvgViews = Math.Round(totalViews / totalService, 0);
            avim.AvgViews30 = Math.Round(ServicesUnder30.Sum(s => s.Views) / (double)ServicesUnder30.Count());
            avim.AvgViews40 = Math.Round(ServicesUnder40.Sum(s => s.Views) / (double)ServicesUnder40.Count());
            avim.AvgViews50 = Math.Round(ServicesUnder50.Sum(s => s.Views) / (double)ServicesUnder50.Count());
            avim.AvgViews60 = Math.Round(ServicesUnder60.Sum(s => s.Views) / (double)ServicesUnder60.Count());
            avim.AvgViews70 = Math.Round(ServicesOver60.Sum(s => s.Views) / (double)ServicesOver60.Count());
            return avim;

        }
        public AnalyticInfoViewModel GetServiceStats(List<Service> Services)
        {
            AnalyticInfoViewModel avim = new AnalyticInfoViewModel();
            List<ServiceDetails> details = new List<ServiceDetails>();
            int serviceCount = 0;
            foreach (Service service in Services)
            {
                if (service.FuneralHome.DevHome == false)
                {
                    ServiceDetails detail = new ServiceDetails();
                    detail.Age = getYearsWithDecimalPrecision(service.Birthday, service.DeathDay);
                    detail.DaysDeathToService = (service.ServiceDate - service.DeathDay).TotalDays;
                    detail.DeathDay = service.DeathDay.DayOfWeek.ToString();
                    detail.ServiceDay = service.ServiceDate.DayOfWeek.ToString();
                    details.Add(detail);
                    serviceCount++;
                }
            }

            avim.DaysBetweenDeathAndService = Math.Round(details.Average(a => a.DaysDeathToService),0);
            avim.AvgAge = Math.Round(details.Average(a => a.Age),2);
            avim.PopularDeathDay = details.GroupBy(d => d.DeathDay).Select(d => new
                {
                    DeathDay = d.Key,
                    Count = d.Count()
                })
                .OrderByDescending(d => d.Count)
                .Select(d => d.DeathDay).First();
            avim.PopularServiceDay = details.GroupBy(d => d.ServiceDay).Select(d => new
            {
                ServiceDay = d.Key,
                Count = d.Count()
            })
            .OrderByDescending(d => d.Count)
            .Select(d => d.ServiceDay).First();


            return avim;
        }
        private double getYearsWithDecimalPrecision(DateTime Birthday, DateTime DeathDay)
        {
               
                // get the last birthday
                int years = DeathDay.Year - Birthday.Year;
                DateTime last = Birthday.AddYears(years);
                if (last > DeathDay) {
	                last = last.AddYears(-1);
	                years--;
                }
                // get the next birthday
                DateTime next = last.AddYears(1);
                // calculate the number of days between them
                double yearDays = (next - last).Days;
                // calcluate the number of days since last birthday
                double days = (DeathDay - last).Days;
                // calculate exaxt age
                double exactAge = (double)years + (days / yearDays);
            return exactAge;
        }

        public static void PageViews(ref AnalyticViewModel avm, List<Analytic> analytics, List<FuneralHome> homes)
        {
            List<Service> services = new List<Service>();
            //List<string> owernames = new List<string>();
            foreach (var home in homes)
            {
                foreach (var s in home.Services.ToList())
                {
                    services.Add(s);
                    //owernames.Add(s.FuneralHome.Owner.Name);
                }
            }

            DateTime today = DateTime.Now;

            int totalViews = analytics.Count();
            int todayViews = analytics.Where(a => a.CreateDate > today.AddDays(-1) && a.CreateDate < today).Count();
            int weekViews = analytics.Where(a => a.CreateDate > today.AddDays(-7) && a.CreateDate < today).Count();
            int monthViews = analytics.Where(a => a.CreateDate > today.AddMonths(-1) && a.CreateDate < today).Count();

            int VideoCount = 0;
            int PDFCount = 0;
            int VideoAndPdf = 0;
            int totalServices = 0;

            foreach (var s in services)
            {
                if (s.FuneralHome.Owner!=null && s.FuneralHome.Owner.Name != "DevHome")
                {
                    totalServices++;
                    if (s.Video != null)
                    {
                        VideoCount++;
                    }
                    if (s.PDF != null)
                    {
                        PDFCount++;
                    }
                    if (s.Video != null && s.PDF != null)
                    {
                        VideoAndPdf++;
                    }
                }
            }

            double percentWithVideos = Math.Round(((double)VideoCount / (double)totalServices) * 100, 0);
            double percentWithPdf = Math.Round(((double)PDFCount / (double)totalServices) * 100, 0);
            double percentWithBoth = Math.Round(((double)VideoAndPdf / (double)totalServices) * 100, 0);

            avm.TotalVideoViews = totalViews;
            avm.TotalFuneralVideos = VideoCount;
            avm.TotalFuneralPDFs = PDFCount;

            avm.FuneralsWithVideos = percentWithVideos;
            avm.FuneralsWithPDFs = percentWithPdf;
            avm.FuneralsWithBoth = percentWithBoth;

            avm.TodayViews = todayViews;
            avm.WeekViews = weekViews;
            avm.MonthViews = monthViews;
        }

        public static void PageViews(ref AnalyticDashboardViewModel avm, List<Analytic> analytics, List<FuneralHome> homes)
        {
            List<Service> services = new List<Service>();
            //List<string> owernames = new List<string>();
            foreach (var home in homes)
            {
                foreach (var s in home.Services.ToList())
                {
                    services.Add(s);
                    //owernames.Add(s.FuneralHome.Owner.Name);
                }
            }

            DateTime today = DateTime.Now;

            int totalViews = analytics.Count();
            int todayViews = analytics.Where(a => a.CreateDate > today.AddDays(-1) && a.CreateDate < today).Count();
            int weekViews = analytics.Where(a => a.CreateDate > today.AddDays(-7) && a.CreateDate < today).Count();
            int monthViews = analytics.Where(a => a.CreateDate > today.AddMonths(-1) && a.CreateDate < today).Count();

            int VideoCount = 0;
            int PDFCount = 0;
            int VideoAndPdf = 0;
            int totalServices = 0;

            foreach (var s in services)
            {
                
                if (s.FuneralHome.Owner!=null && s.FuneralHome.Owner.Name != "DevHome")
                {
                    totalServices++;
                    if (s.Video != null)
                    {
                        VideoCount++;
                    }
                    if (s.PDF != null)
                    {
                        PDFCount++;
                    }
                    if (s.Video != null && s.PDF != null)
                    {
                        VideoAndPdf++;
                    }
                }
            }

            double percentWithVideos = Math.Round(((double)VideoCount / (double)totalServices) * 100, 0);
            double percentWithPdf = Math.Round(((double)PDFCount / (double)totalServices) * 100, 0);
            double percentWithBoth = Math.Round(((double)VideoAndPdf / (double)totalServices) * 100, 0);

            avm.TotalVideoViews = totalViews;
            avm.TotalFuneralVideos = VideoCount;
            avm.TotalFuneralPDFs = PDFCount;

            //avm.FuneralsWithVideos = percentWithVideos;
            avm.FuneralsWithPDFs = percentWithPdf;
            avm.FuneralsWithBoth = percentWithBoth;

            avm.TodayViews = todayViews;
            avm.WeekViews = weekViews;
            avm.MonthViews = monthViews;
        }

        public static void PageViewsForService(ref AnalyticViewModel avm, List<Analytic> analytics)
        {

            DateTime today = DateTime.Now;

            int totalViews = analytics.Count();
            int todayViews = analytics.Where(a => a.CreateDate > today.AddDays(-1) && a.CreateDate < today).Count();
            int weekViews = analytics.Where(a => a.CreateDate > today.AddDays(-7) && a.CreateDate < today).Count();
            int monthViews = analytics.Where(a => a.CreateDate > today.AddMonths(-1) && a.CreateDate < today).Count();

            avm.TodayViews = todayViews;
            avm.WeekViews = weekViews;
            avm.MonthViews = monthViews;
        }

        public static void AverageTime(ref AnalyticViewModel avm, List<Analytic> analytics)
        {
            double totalTimeWatched = 0.0;
            double totalTime = 0.0;
            int count = 0;

            foreach (var record in analytics)
            {
                if (record.Start != null && record.Stop != null)
                {
                    if (record.Stop != 0 && record.Stop != 1)
                    {
                        totalTimeWatched += (record.Stop - record.Start);
                        count++;
                    }
                }
                if (record.Duration != null)
                {
                    if (record.Duration != 0)
                    {
                        totalTime += record.Duration;
                    }
                }
            }

            avm.AverageMinWatched = Math.Round(((totalTimeWatched / count) / 60), 2);
            avm.AverageDuration = Math.Round(((totalTimeWatched / totalTime) * 100), 2);
            avm.TotalMinWatched = Math.Round((totalTimeWatched / 60), 2);
            totalTime /= count;
            avm.TotalAverageMin = (int)Math.Round(totalTime / 60);

            avm.MajorTick = (int)(avm.TotalAverageMin / 10);
            avm.MinorTick = (int)((avm.TotalAverageMin / 10) / 2);
        }

        public static void linechart(ref AnalyticViewModel avm, List<Analytic> analytics, bool pad = false)
        {
            List<DateTime> dayTimeRange = new List<DateTime>();
            List<double> dayViews = new List<double>();

            List<DateTime> monthTimeRange = new List<DateTime>();
            List<double> monthViews = new List<double>();

            List<DateTime> yearTimeRange = new List<DateTime>();
            List<double> yearViews = new List<double>();

            // figure the time range for days
            DateTime day = DateTime.Now;
            StringBuilder dayTimeRangeString = new StringBuilder();
            string quote = "\"";
            dayTimeRangeString.Append("[");
            for (int i = 0; i < 10; i++)
            {
                dayTimeRange.Add(day);
                dayTimeRangeString.Append("new Date(" + quote + day.ToShortDateString() + quote + "),");
                day = day.AddDays(-1);
            }
            string dayTimeRangeArray = dayTimeRangeString.ToString();
            dayTimeRangeArray = dayTimeRangeArray.Substring(0, dayTimeRangeArray.Length - 1) + "]";
            // ************* end the time range for DAYS *************//

            //figure out the views for the day range 
            double todayViews = 0;
            StringBuilder dayViewString = new StringBuilder();
            dayViewString.Append("[");
            foreach (var d in dayTimeRange)
            {
                todayViews = analytics.Where(a => a.CreateDate > d.AddDays(-1) && a.CreateDate < d).Count();
                if (pad == true)
                {
                    todayViews = todayViews * 1.5;
                    todayViews = Math.Round(todayViews);
                }
                dayViewString.Append(todayViews.ToString() + ",");
                dayViews.Add(todayViews);
            }
            string dayViewsArray = dayViewString.ToString();
            dayViewsArray = dayViewsArray.Substring(0, dayViewsArray.Length - 1) + "]";
            // *************end the views for DAYS************* //

            // figure the time range for months
            DateTime month = DateTime.Now;
            StringBuilder monthTimeRangeString = new StringBuilder();
            monthTimeRangeString.Append("[");
            for (int i = 0; i < 10; i++)
            {
                monthTimeRange.Add(month);
                monthTimeRangeString.Append("new Date(" + quote + month.ToShortDateString() + quote + "),");
                month = month.AddMonths(-1);

            }
            string monthTimeRangeArray = monthTimeRangeString.ToString();
            monthTimeRangeArray = monthTimeRangeArray.Substring(0, monthTimeRangeArray.Length - 1) + "]";
            // *************end the time range for MONTHS************* //

            //figure out the views for the month range 
            double mViews = 0;
            StringBuilder monthViewString = new StringBuilder();
            monthViewString.Append("[");
            foreach (var d in monthTimeRange)
            {
                mViews = analytics.Where(a => a.CreateDate > d.AddMonths(-1) && a.CreateDate < d).Count();
                if (pad == true)
                {
                    mViews = mViews * 1.5;
                    mViews = Math.Round(mViews);
                }
                monthViewString.Append(mViews.ToString() + ",");
                monthViews.Add(mViews);
            }
            string monthViewsArray = monthViewString.ToString();
            monthViewsArray = monthViewsArray.Substring(0, monthViewsArray.Length - 1) + "]";
            // *************end the views for month************* //

            // figure the time range for year
            DateTime year = DateTime.Now;
            StringBuilder yearTimeRangeString = new StringBuilder();
            yearTimeRangeString.Append("[");
            for (int i = 0; i < 10; i++)
            {
                yearTimeRange.Add(year);
                yearTimeRangeString.Append("new Date(" + quote + year.ToShortDateString() + quote + "),");
                year = year.AddYears(-1);
            }
            string yearTimeRangeArray = yearTimeRangeString.ToString();
            yearTimeRangeArray = yearTimeRangeArray.Substring(0, yearTimeRangeArray.Length - 1) + "]";
            // *************end the time range for year************* //

            //figure out the views for the year range 
            double yViews = 0;
            StringBuilder yearViewString = new StringBuilder();
            yearViewString.Append("[");
            foreach (var d in yearTimeRange)
            {
                yViews = analytics.Where(a => a.CreateDate > d.AddYears(-1) && a.CreateDate < d).Count();
                if (pad == true)
                {
                    yViews = yViews * 1.5;
                    yViews = Math.Round(yViews);
                }
                yearViewString.Append(yViews.ToString() + ",");
                yearViews.Add(yViews);

            }
            string yearViewsArray = yearViewString.ToString();
            yearViewsArray = yearViewsArray.Substring(0, yearViewsArray.Length - 1) + "]";
            // *************end the views for year************* //


            avm.MonthTimeRange = monthTimeRangeArray;
            avm.MonthViewsArray = monthViewsArray;
            avm.DayTimeRange = dayTimeRangeArray;
            avm.DayViewsArray = dayViewsArray;
            avm.YearTimeRange = yearTimeRangeArray;
            avm.YearViewsArray = yearViewsArray;
        }


        //Returns homes that haven't uploaded a service in the past 45 days, but are not in trial period
        public static List<FuneralHome> LowUsageHomes(List<FuneralHome> passedHomes)
        {
            List<FuneralHome> homes = passedHomes.Where(f => f.PaymentStatus != Models.Data.Enums.PaymentStatus.TrialPeriod && f.PaymentStatus != Models.Data.Enums.PaymentStatus.Unsubscribed && f.DevHome == false).ToList();
            List<FuneralHome> LowUsageHomes = new List<FuneralHome>();
            foreach (var home in homes)
            {
                if (home.Services != null)
                {
                    List<Service> services = home.Services.ToList();
                    services = services.Where(s => s.CreateDate > DateTime.Now.AddDays(-30)).ToList();
                    if (services.Count() == 0)
                    {
                        LowUsageHomes.Add(home);
                    }
                }
            }
            LowUsageHomes = LowUsageHomes.OrderByDescending(l => l.CreateDate).ToList();
            return LowUsageHomes;
        }
    
    }
    public class ServiceAnalytic
    {
        public int ServiceId { get; set; }
        public int Views { get; set; }
        public double Age { get; set; }
    }
    public class ServiceDetails
    {
        public string DeathDay { get; set; }
        public double DaysDeathToService { get; set; }
        public string ServiceDay { get; set; }
        public double Age { get; set; }
    }
}