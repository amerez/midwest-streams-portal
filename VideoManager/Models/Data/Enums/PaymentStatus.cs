using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoManager.Models.Data.Enums
{
    public enum PaymentStatus
    {
        HasPaid,
        HasNotPaid,
        Unsubscribed,
        TrialPeriod,
        SassySubscriber,
        SassyExpired
    }
}