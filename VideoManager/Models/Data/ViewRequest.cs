using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
    public class ViewRequest
    {
        public int Id { get; set; }
        //public virtual Video RequestedVideo { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public DateTime Created { get; set; }
        public Boolean? Approved { get; set; }
    }
}