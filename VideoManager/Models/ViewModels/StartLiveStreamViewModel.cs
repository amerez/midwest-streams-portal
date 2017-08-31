using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VideoManager.Models;
using System.Linq;
using System.Web;
using VideoManager.Models.Data;
using VideoManager.Controllers;

namespace VideoManager.Models.ViewModels
{
	public class StartLiveStreamViewModel
	{

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public bool StartedLiveStream { get; set; }
        public string ErrorMessage { get; set; }

	
	}
}