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
	public class HeatMapPinsViewModel
	{
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Weight { get; set; }
	}
}