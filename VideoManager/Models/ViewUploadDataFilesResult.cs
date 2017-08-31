using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Models
{
    public class ViewDataUploadFilesResult
    {
        public string Url { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Size { get; set; }
        public string DeleteUrl { get; set; }
        public string DeleteType { get; set; }
    }
}
