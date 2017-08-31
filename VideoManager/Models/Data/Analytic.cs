using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
    public class Analytic
    {
        //[Key, ForeignKey("Video")]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Video Video { get; set; }
        public string IPAddress { get; set; }
        public int Start { get; set; }
        public int Stop { get; set; }
        public int VideoId { get; set; }
        public double Duration { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string City { get; set; }
        public string CountryCode { get; set; }
        public string MetroCode { get; set; }
        public string RegionCode { get; set; }
        public string RegionName { get; set; }
        public string TimeZone { get; set; }
        public int? ZipCode { get; set; }   

        public int PlayCount { get; set; }
        public bool Completed { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }
    }
}