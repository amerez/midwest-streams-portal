using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VideoManager.Models;
using VideoManager.Models.Data;

namespace VideoManager.Models.ViewModels
{
    public class IpAddressObject
    {
        public string IpAdd { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string city { get; set; }
        public string country_code { get; set; }
        public string country_name { get; set; }
        public string metro_code { get; set; }

        public string region_code { get; set; }
        public string region_name { get; set; }
        public string time_zone { get; set; }
        public int zip_code { get; set; }
        public Video Video { get; set; }
        public string VideoTitle { get; set; }
        public string Name { get; set; }
        public string FuneralHomeName { get; set; }
        public string Age { get; set; }
        public string ServiceDate { get; set; }
        public string ViewingDate { get; set; }
        public string AmountWatched { get; set; }
        public string DaysAfterService { get; set; }
    }
}