using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data.Enums
{
    public enum VideoQueueStatus
    {
        Created,
        VMStarted,
        UploadingToAzureRenderFarm,
        UploadedToAzureRenderFarm,
        InVMQueue,
        Downloading,
        Downloaded,
        Rendering,
        UploadingConvertedFile,
        Finished,
        Error

    }
}