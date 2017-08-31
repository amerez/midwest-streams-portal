using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;
using VideoManager.Models.ViewModels;

namespace VideoManager.Code
{
    public class Admin
    {
        public static void dashboardlinechart(ref AnalyticDashboardViewModel avm, List<Analytic> analytics)
        {
            if(analytics.Count>1)
            {
                //Figure the Time Range for Days
                List<DateTime> dayTimeRange = new List<DateTime>();
                List<int> dayViews = new List<int>();
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
                // *************end the time range for DAYS************* //

                // figure the time range for months
                List<DateTime> monthTimeRange = new List<DateTime>();
                List<int> monthViews = new List<int>();
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

                // figure the time range for year
                List<DateTime> yearTimeRange = new List<DateTime>();
                List<int> yearViews = new List<int>();
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
                // *************end the time range for YEAR************* //

                StringBuilder daySeries = new StringBuilder();
                StringBuilder monthSeries = new StringBuilder();
                StringBuilder yearSeries = new StringBuilder();


                List<FuneralHome> homes = analytics.GroupBy(a => a.Video.Service.FuneralHome).Select(f => f.FirstOrDefault().Video.Service.FuneralHome).Distinct().ToList();
                foreach (var home in homes)
                {

                    //Get Daily Views for Funeral home
                    int todayViews = 0;
                    StringBuilder dayViewString = new StringBuilder();
                    dayViewString.Append("[");
                    foreach (var d in dayTimeRange)
                    {
                        todayViews = analytics.Where(a => a.CreateDate > d.AddDays(-1) && a.CreateDate < d && a.Video.Service.FuneralHome.Id == home.Id).Count();
                        dayViewString.Append(todayViews.ToString() + ",");
                        dayViews.Add(todayViews);
                    }
                    string dayViewsArray = dayViewString.ToString();
                    dayViewsArray = dayViewsArray.Substring(0, dayViewsArray.Length - 1) + "]";
                    daySeries.Append("{label: \"" + home.Name + "\",legendEntry:true, data: {x: " + dayTimeRangeArray + ", y: " + dayViewsArray + "},markers: {visible:true, type:\"circle\"}},");


                    //Get Monthly Views for Funeral Home
                    int mViews = 0;
                    StringBuilder monthViewString = new StringBuilder();
                    monthViewString.Append("[");
                    foreach (var d in monthTimeRange)
                    {
                        mViews = analytics.Where(a => a.CreateDate > d.AddMonths(-1) && a.CreateDate < d && a.Video.Service.FuneralHome.Id == home.Id).Count();
                        monthViewString.Append(mViews.ToString() + ",");
                        monthViews.Add(mViews);
                    }
                    string monthViewsArray = monthViewString.ToString();
                    monthViewsArray = monthViewsArray.Substring(0, monthViewsArray.Length - 1) + "]";
                    monthSeries.Append("{label: \"" + home.Name + "\",legendEntry:true, data: {x: " + monthTimeRangeArray + ", y: " + monthViewsArray + "},markers: {visible:true, type:\"circle\"}},");

                    //Get Yearly Views for Funeral Home
                    int yViews = 0;
                    StringBuilder yearViewString = new StringBuilder();
                    yearViewString.Append("[");
                    foreach (var d in yearTimeRange)
                    {
                        yViews = analytics.Where(a => a.CreateDate > d.AddYears(-1) && a.CreateDate < d && a.Video.Service.FuneralHome.Id == home.Id).Count();
                        yearViewString.Append(yViews.ToString() + ",");
                        yearViews.Add(yViews);
                    }
                    string yearViewsArray = yearViewString.ToString();
                    yearViewsArray = yearViewsArray.Substring(0, yearViewsArray.Length - 1) + "]";
                    yearSeries.Append("{label: \"" + home.Name + "\",legendEntry:true, data: {x: " + yearTimeRangeArray + ", y: " + yearViewsArray + "},markers: {visible:true, type:\"circle\"}},");
                }

                string daySeriesString = daySeries.ToString().Substring(0, daySeries.Length - 1);
                string monthSeriesString = monthSeries.ToString().Substring(0, monthSeries.Length - 1);
                string yearSeriesString = yearSeries.ToString().Substring(0, yearSeries.Length - 1);

                avm.DailySeries = daySeriesString;
                avm.MonthlySeries = monthSeriesString;
                avm.YearlySeries = yearSeriesString;
               

             
            }
            else
            {
                avm.DailySeries = "No Data";
            }
           
           
        }

        public static double GetServicesThisMonthWithVideo(List<Service>Services)
        {
            double serviceCount = Services.Where(s => s.Video != null && s.FuneralHome.DevHome == false && s.CreateDate > DateTime.Now.AddDays(-30)).Count();
            return serviceCount;
        }
        public static double GetTotalServicesWithVideo(List<Service> Services)
        {
            double serviceCount = Services.Where(s => s.Video != null && s.FuneralHome.DevHome == false).Count();
            return serviceCount;
        }
        public static bool IsServerRenderingVideo()
        {
             string BatchFilePath =  ConfigurationManager.AppSettings["logFilePath"];
             if (File.Exists(BatchFilePath + "Converting.SEM"))
             {
                 return true;
             }
             else
             {
                 return false;
             }
        }

        //Get's all customers that have logged in, in the past 30 mins
        public static List<FuneralHome> GetOnlineCustomers(ApplicationDbContext db)
        {
            DateTime FortyFiveMinutesAgo = DateTime.Now.AddMinutes(-45);
            List<FuneralHome> homes = db.FuneralHomes.Where(f => f.LastLogin > FortyFiveMinutesAgo).ToList();
            return homes;
        }
        public static List<Service> GetVideosInQue(ApplicationDbContext db)
        {
            List<Service> Services = db.Services.Where(s => s.Video != null && s.Video.Status == VideoStatus.UploadFinished).ToList();
            return Services;
        }
        public static float getServerUsage()
        {
            //Apparently this is more for a real time comparison needs some more work to get working properly.
            PerformanceCounter theCPUCounter = new PerformanceCounter();
            theCPUCounter.CategoryName = "Processor";
            theCPUCounter.CounterName = "% Processor Time";
            theCPUCounter.InstanceName = "_Total";
           float cpuPercent = theCPUCounter.NextValue();
           return cpuPercent;
        }
        public static string GetServicesBarChart(List<Service>Services, DateTime startDate, DateTime endDate)
        {
        //    { 
        //    label: "Pedersen", 
        //    legendEntry: true, 
        //    data: { 
        //        x: ['May', 'June', 'July', 'August'], 
        //        y: [3.64, 4.46, 4.22, 4.66] 
        //    } 
        //}, { 
        //    label: "Dobmeier", 
        //    legendEntry: true, 
        //    data: { 
        //        x: ['May', 'June', 'July', 'August'],
        //        y: [3.70, 4.42, 4.92, 5.20] 
        //    } 
        //}, 

            StringBuilder dataArray = new StringBuilder();
            dataArray.Append("[");
            List<FuneralHome> homes = Services.GroupBy(s => s.FuneralHome).Select(f => f.FirstOrDefault().FuneralHome).Distinct().Where(f=>f.DevHome==false && f.PaymentStatus!= Models.Data.Enums.PaymentStatus.TrialPeriod && f.PaymentStatus!= Models.Data.Enums.PaymentStatus.Unsubscribed).ToList();
             
                foreach (var home in homes)
                {
                    dataArray.Append("{label: \"" + home.Name + "\", legendEntry: true,");
                    
                    string yArray = "[";
                    string xMonthArray = "[";
                    DateTime loopingCounterDate = startDate;
                    //foreach month in the timerange
                    while (loopingCounterDate < endDate)
                    {
                        double monthServices = home.Services.Where(s => s.CreateDate.Month == loopingCounterDate.Month).Count();
                      
                        //dont chart 0s to save space on the cluster bar chart
                        //Not sure why this screws up the bar chart
                        //if(monthServices!=0)
                        //{
                            yArray = yArray + monthServices + ", ";
                            xMonthArray = xMonthArray + "'" + loopingCounterDate.ToString("MMM") + "', ";
                        //}
                        loopingCounterDate = loopingCounterDate.AddMonths(1);
                    }
                    if(yArray.Length>3)
                    {
                        yArray = yArray.Substring(0, yArray.Length - 2) + "]";
                    }
                    else
                    {
                        yArray = "[]";
                    }
                    if(xMonthArray.Length>3)
                    {
                        xMonthArray = xMonthArray.Substring(0, xMonthArray.Length - 2) + "]";
                    }
                    else
                    {
                        xMonthArray = "[]";
                    }
                    dataArray.Append("data:{ x: " + xMonthArray + ", y:");
                    dataArray.Append(yArray + "}}, ");
                }
            if(dataArray.Length>4)
            {
                string stringDataArray = dataArray.ToString();
                stringDataArray = stringDataArray.Substring(0, stringDataArray.Length - 2) + "];";
                return stringDataArray;
            }
            else
            {
                return "[]";
            }
            
        }

        public static List<CRMContact> GetContactsThatNeedToBeContacted(ApplicationDbContext db)
        {
            DateTime NextWeek = DateTime.Now.AddDays(7);
            List<CRMContact> NeedsToBeContacted = db.CRMContact.Where(c => c.NextContactDate < NextWeek && c.NoFutureContact==false).OrderBy(c => c.NextContactDate).ToList();
            return NeedsToBeContacted;
        }
    }
}