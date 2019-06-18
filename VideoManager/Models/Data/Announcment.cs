using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data
{
    public class Announcment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Header { get; set; }
        [DataType(DataType.MultilineText)]
        public string Body { get; set; }
        public DateTime ExpirationDate { get; set; }

    }
}