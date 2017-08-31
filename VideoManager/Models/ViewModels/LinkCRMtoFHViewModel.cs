using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data.Enums;
using VideoManager.Models.Data;

namespace VideoManager.Models.ViewModels
{
	//List of relevant info pulled from funeralhome
	public class LinkCRMtoFHViewModel
	{
        public int CRMFuneralHomeId { get; set; }

        public int PortalFuneralHomeId { get; set; }
	
	}
}