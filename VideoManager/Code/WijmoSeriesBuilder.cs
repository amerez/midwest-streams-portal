using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Code
{
    public class WijmoSeriesBuilder
    {
        public static string StringfyDateTimeLineChartSeries(string Label, bool DisplayLabel, List<DateTime> xDataPoints, List<int> yDataPoints, bool visibleMarkers, string markerType)
        {
            string wijmoSeries = "{label:\""+Label+"\", legendEntry:"+DisplayLabel.ToString().ToLower()+", data:{";
            string xSeries = "x:[";
            string ySeries = "y:[";
            foreach(var date in xDataPoints)
            {
                xSeries = xSeries+"new Date(\""+date.ToShortDateString()+"\"),";
            }
            foreach(var dataPoint in yDataPoints)
            {
                ySeries = ySeries+dataPoint.ToString()+",";
            }
            xSeries = xSeries.Substring(0, xSeries.Length-1)+"]";
            ySeries = ySeries.Substring(0, ySeries.Length-1)+"]";
            wijmoSeries = wijmoSeries+xSeries+", "+ySeries+"}, markers: {visible:"+visibleMarkers.ToString().ToLower()+", type:\""+markerType+"\"}}";
            return wijmoSeries;
        }
    }
    
}