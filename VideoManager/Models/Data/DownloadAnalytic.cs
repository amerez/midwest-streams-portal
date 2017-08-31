using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;

namespace VideoManager.Models.Data
{
    public class DownloadAnalytic
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Service Service { get; set; }
        public int ServiceId { get; set; }
        public string IPAddress { get; set; }
       
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string CountryCode { get; set; }
        public string MetroCode { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string TimeZone { get; set; }
        public int? ZipCode { get; set; }
        public PurchaseAnalyticTracking AnalyticTracking { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }
    }
}